// =============================================================
// Website chat → Telegram  (Vercel serverless function)
// =============================================================
//
// Forwards a visitor's free-text chat message to the @AxiusDispatch_Bot
// supergroup so Andrés sees real leads typed into the on-page chat
// (the canned replies stay client-side; this is the capture path).
//
// Reuses the same env vars as the Stripe bridge:
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TELEGRAM_THREAD_ID (optional)
//
// Basic abuse guards: POST only, 10 KB body cap, 1500-char message cap,
// honeypot field, silent drop on bots / missing message.
// =============================================================

const https = require('https');

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function sendTelegram(text) {
  return new Promise((resolve) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat = process.env.TELEGRAM_CHAT_ID;
    const thread = process.env.TELEGRAM_THREAD_ID;
    if (!token || !chat) return resolve({ skipped: 'missing env' });

    const payload = JSON.stringify({
      chat_id: chat,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      ...(thread ? { message_thread_id: Number(thread) } : {}),
    });

    const req = https.request({
      method: 'POST',
      hostname: 'api.telegram.org',
      path: `/bot${token}/sendMessage`,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
      timeout: 6000,
    }, (res) => { res.on('data', () => {}); res.on('end', () => resolve({ status: res.statusCode })); });
    req.on('error', (err) => resolve({ error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ error: 'timeout' }); });
    req.write(payload);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') { res.statusCode = 405; return res.end(JSON.stringify({ ok: false })); }

  // read the body (cap at 10 KB)
  let raw = '';
  try {
    raw = await new Promise((resolve, reject) => {
      let d = '';
      req.on('data', (c) => { d += c; if (d.length > 10240) { req.destroy(); reject(new Error('too large')); } });
      req.on('end', () => resolve(d));
      req.on('error', reject);
    });
  } catch (e) { res.statusCode = 413; return res.end(JSON.stringify({ ok: false })); }

  let data = {};
  try { data = JSON.parse(raw || '{}'); } catch (e) { data = {}; }

  // honeypot: if a bot fills the hidden field, pretend success and drop
  if (data.website) { res.statusCode = 200; return res.end(JSON.stringify({ ok: true })); }

  const msg = String(data.message || '').trim().slice(0, 1500);
  if (!msg) { res.statusCode = 200; return res.end(JSON.stringify({ ok: true, dropped: 'empty' })); }

  const path = data.path ? esc(String(data.path).slice(0, 120)) : '/';
  const text = `💬 <b>Website chat lead</b>\n\n${esc(msg)}\n\n<i>from axius.tech${path}</i>`;
  const r = await sendTelegram(text);

  res.statusCode = 200;
  return res.end(JSON.stringify({ ok: !r.error }));
};

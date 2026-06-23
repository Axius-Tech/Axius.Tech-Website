// =============================================================
// Website signals → Telegram dispatch  (Vercel serverless function)
// =============================================================
//
// Fires a real-time Telegram ping for high-signal moments on the site:
//   • visit          — a new visitor lands (deduped client-side per session)
//   • checkout_start — a visitor clicks through to Stripe / books a call
//
// Each ping is optionally enriched by Gemini with a one-line "read" of
// what the visitor likely wants and the best next move.
//
// Cookieless: no cookies are set or read. Geo comes from Vercel's edge
// headers; the visitor only sends the path + referrer. Consistent with
// the site's "deliberately minimal, no tracking cookies" privacy stance.
//
// Env vars (reuses the same Telegram bot as the chat + Stripe flows):
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TELEGRAM_THREAD_ID (optional)
//   GEMINI_API_KEY  (optional — without it, pings still send, just no AI line)
//
// Zero external dependencies — built-in `https` only.
// =============================================================

const https = require('https');

// gemini-2.5-flash with thinking disabled: fast, cheap, and returns a
// complete one-liner (2.5/3.x "thinking" otherwise eats the token budget)
const GEMINI_MODEL = 'gemini-2.5-flash';

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = (s) => String(s == null ? '' : s).replace(/[<>]/g, '').slice(0, 220);

function postJSON(hostname, path, payloadObj, timeoutMs) {
  return new Promise((resolve) => {
    const payload = JSON.stringify(payloadObj);
    const req = https.request({
      method: 'POST', hostname, path,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
      timeout: timeoutMs || 7000,
    }, (res) => { let b = ''; res.on('data', (c) => b += c); res.on('end', () => resolve({ status: res.statusCode, body: b })); });
    req.on('error', (e) => resolve({ error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ error: 'timeout' }); });
    req.write(payload); req.end();
  });
}

function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  const thread = process.env.TELEGRAM_THREAD_ID;
  if (!token || !chat) return Promise.resolve({ skipped: 'missing telegram env' });
  return postJSON('api.telegram.org', `/bot${token}/sendMessage`, {
    chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true,
    ...(thread ? { message_thread_id: Number(thread) } : {}),
  }, 6000);
}

// A distilled brief so Gemini can reason about intent without the full docs.
const AXIUS_CONTEXT =
  'Axius is a one-operator Technology Ownership Practice ("Run your business. Not your technology."). ' +
  'It becomes a growing SMB\'s outsourced technology department: one accountable operator owns the systems, ' +
  'AI handles repetitive work, and vetted specialists are engaged on demand. ' +
  'Tiers: Team $2,500/mo, Department $5,000/mo, Enterprise (custom). ' +
  'Typical buyers are SMB owners tired of juggling tools, vendors, and freelancers with no one accountable.';

async function geminiRead(eventLabel, facts) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return '';
  const prompt =
    `${AXIUS_CONTEXT}\n\n` +
    `A live signal just fired on the axius.tech website.\n` +
    `Event: ${eventLabel}\n${facts}\n\n` +
    `In ONE concise sentence (max 24 words, no preamble, no emojis), give the operator a sharp read: ` +
    `what this visitor likely wants and the single best next move. If the signal is thin, say so plainly.`;
  const r = await postJSON(
    'generativelanguage.googleapis.com',
    `/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.5, maxOutputTokens: 100, thinkingConfig: { thinkingBudget: 0 } },
    },
    7000,
  );
  if (r.error || !r.body) return '';
  try {
    const d = JSON.parse(r.body);
    const parts = d && d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts;
    const t = Array.isArray(parts) ? parts.map((p) => p && p.text ? p.text : '').join('') : '';
    return (t || '').trim().replace(/\s+/g, ' ');
  } catch (e) { return ''; }
}

function readBody(req, cap) {
  return new Promise((resolve, reject) => {
    let d = '';
    req.on('data', (c) => { d += c; if (d.length > cap) { req.destroy(); reject(new Error('too large')); } });
    req.on('end', () => resolve(d));
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') { res.statusCode = 405; return res.end(JSON.stringify({ ok: false })); }

  let raw = '';
  try { raw = await readBody(req, 8192); }
  catch (e) { res.statusCode = 413; return res.end(JSON.stringify({ ok: false })); }

  let data = {};
  try { data = JSON.parse(raw || '{}'); } catch (e) { data = {}; }
  if (data.website) { res.statusCode = 200; return res.end(JSON.stringify({ ok: true })); } // honeypot

  const type = String(data.type || '').slice(0, 40);
  const dec = (v) => { try { return decodeURIComponent(v); } catch (e) { return v; } };
  const geo = [req.headers['x-vercel-ip-city'], req.headers['x-vercel-ip-country-region'], req.headers['x-vercel-ip-country']]
    .filter(Boolean).map(dec).join(', ') || 'unknown location';
  const path = plain(data.path || '/').slice(0, 160);
  const ref = data.ref ? plain(data.ref) : 'direct';
  const utm = data.utm ? plain(data.utm).slice(0, 160) : '';

  let header, label, facts;
  if (type === 'checkout_start') {
    const tier = plain(data.tier || 'a plan').slice(0, 80);
    header = `🟢 <b>High-intent click — ${esc(tier)}</b>`;
    label = `Visitor clicked through to buy / book: "${tier}"`;
    facts = `Action: ${tier}\nLocation: ${geo}\nPage: ${path}\nReferrer: ${ref}${utm ? `\nUTM: ${utm}` : ''}`;
  } else if (type === 'visit') {
    header = `👀 <b>New visitor</b>`;
    label = 'A new visitor landed on the site';
    facts = `Location: ${geo}\nLanded on: ${path}\nReferrer: ${ref}${utm ? `\nUTM: ${utm}` : ''}`;
  } else {
    res.statusCode = 200; return res.end(JSON.stringify({ ok: true, dropped: 'unknown type' }));
  }

  const ai = await geminiRead(label, facts);

  const lines = [header, '', `📍 ${esc(geo)}`, `🔗 ${esc(ref)}`, `📄 ${esc(path)}`];
  if (utm) lines.push(`🏷️ ${esc(utm)}`);
  if (ai) lines.push('', `🤖 <i>${esc(ai)}</i>`);

  await sendTelegram(lines.join('\n'));
  res.statusCode = 200; return res.end(JSON.stringify({ ok: true }));
};

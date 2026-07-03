// =============================================================
// Website signals → Telegram dispatch  (Vercel serverless function)
// =============================================================
//
// Fires a Telegram ping for genuine, ENGAGED visits only — the client sends
// nothing until the visitor actually scrolls / interacts, and this function
// drops bots, monitors, crawlers, prefetches, and empty user-agents. Events:
//   • visit          — an engaged visitor (real-time; new vs returning)
//   • checkout_start — a visitor clicks through to Stripe / books a call
//   • visit_summary  — on leave: ACTIVE time, visit #, sections viewed,
//                      scroll depth, and behaviour (chat / pricing / intent)
//
// Each ping is optionally enriched by Gemini with a one-line "read" of what
// the visitor likely wants and the best next move. This is real-time
// operational insight for the team only — it goes to Telegram, NOT the CRM.
// (The CRM only hears from the site on an actual purchase, via the Stripe
// webhook, where real identity + payment exist.)
//
// No cookies are set. Visit count / behaviour rides on the anonymous id the
// client keeps in localStorage (first-party only, never shared). Geo comes
// from Vercel's edge headers.
//
// Env vars (reuses the same Telegram bot as the chat + Stripe flows):
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TELEGRAM_THREAD_ID (optional)
//   GEMINI_API_KEY       (optional — without it, pings still send, no AI line)
//   NOTIFY_EXCLUDE_IPS   (optional — comma-separated IPs to mute, e.g. operator)
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

// ── Source hygiene: a messy referrer / UTM → one clean bucket ──
function classifySource(ref, utm) {
  let params; try { params = new URLSearchParams(utm || ''); } catch (e) { params = new URLSearchParams(); }
  const us = (params.get('utm_source') || '').toLowerCase();
  const um = (params.get('utm_medium') || '').toLowerCase();
  if (um === 'cpc' || um === 'ppc' || /paid|^ads?$/.test(um) || /ads|adwords/.test(us)) return { source: 'Paid', detail: us || um };
  if (um === 'email' || /mail|newsletter/.test(us)) return { source: 'Email', detail: us || 'email' };
  if (us) {
    if (/linkedin|facebook|instagram|twitter|tiktok|youtube|reddit|threads|pinterest/.test(us)) return { source: 'Social', detail: us };
    if (/google|bing|duckduck|yahoo|ecosia/.test(us)) return { source: 'Search', detail: us };
    return { source: 'Referral', detail: us };
  }
  const raw = String(ref || '').toLowerCase();
  if (!raw || raw === 'direct') return { source: 'Direct', detail: '' };
  let host = raw; try { host = new URL(ref).hostname.replace(/^www\./, ''); } catch (e) {}
  if (/axius\.tech$/.test(host)) return { source: 'Direct', detail: 'internal' };
  if (/google\.|bing\.|duckduckgo|yahoo\.|ecosia|brave\./.test(host)) return { source: 'Search', detail: host };
  if (/linkedin|facebook|fb\.|instagram|t\.co|twitter|x\.com|tiktok|youtu|reddit|pinterest|threads/.test(host)) return { source: 'Social', detail: host };
  if (/mail\.|gmail|outlook|proton\.me/.test(host) || host.indexOf('com.google.android.gm') === 0) return { source: 'Email', detail: host };
  return { source: 'Referral', detail: host };
}

// ── Visit grade: Hot (chat / buy-book intent) · Interested (pricing or 30s+) · Engaged ──
function gradeFor(type, data) {
  if (type === 'checkout_start' || data.openedChat || data.clickedIntent) return 'Hot';
  if (data.viewedPricing || (Number(data.seconds) || 0) >= 30) return 'Interested';
  return 'Engaged';
}

// ── Datacenter / hosting-network check (real buyers rarely browse from cloud
//    IPs). Free ip-api.com lookup; graceful — any failure returns false. ──
function isHostingIp(ip) {
  return new Promise((resolve) => {
    const http = require('http');
    const r = http.request({ hostname: 'ip-api.com', path: '/json/' + encodeURIComponent(ip) + '?fields=status,hosting,proxy', method: 'GET', timeout: 1500 },
      (res) => { let b = ''; res.on('data', (c) => b += c); res.on('end', () => { try { const d = JSON.parse(b); resolve(d.status === 'success' && (d.hosting === true || d.proxy === true)); } catch (e) { resolve(false); } }); });
    r.on('error', () => resolve(false));
    r.on('timeout', () => { r.destroy(); resolve(false); });
    r.end();
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

  // Optional IP mute — drop signals from excluded IPs (e.g. the operator's own
  // machine) so testing never skews the data. Set NOTIFY_EXCLUDE_IPS on Vercel
  // to a comma-separated list; inert if unset.
  const clientIp = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || String(req.headers['x-real-ip'] || '');
  const excludedIps = (process.env.NOTIFY_EXCLUDE_IPS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (clientIp && excludedIps.includes(clientIp)) { res.statusCode = 200; return res.end(JSON.stringify({ ok: true, muted: true })); }

  // Bot / monitor / crawler / prefetch backstop (on top of the client "must
  // scroll" gate — catches headless agents that do scroll, and empty UAs).
  const ua = String(req.headers['user-agent'] || '').toLowerCase();
  const isBot = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|quora|whatsapp|telegram|slackbot|discord|linkedin|headless|phantom|puppeteer|playwright|selenium|lighthouse|gtmetrix|pingdom|uptime|statuscake|monitor|vercel|prerender|scan|http-client|curl|wget|python|axios|okhttp|go-http|java\/|libwww|apache-httpclient/i.test(ua);
  const isPrefetch = req.headers.purpose === 'prefetch' || req.headers['sec-purpose'] === 'prefetch' || !!req.headers['x-purpose'] || req.headers['x-moz'] === 'prefetch' || !!req.headers['x-middleware-prefetch'];
  if (!ua || isBot || isPrefetch) { res.statusCode = 200; return res.end(JSON.stringify({ ok: true, filtered: 'bot/prefetch' })); }

  // Datacenter / hosting-IP backstop — catches cloud-based bots with real UAs.
  if (clientIp && await isHostingIp(clientIp)) { res.statusCode = 200; return res.end(JSON.stringify({ ok: true, filtered: 'datacenter' })); }

  const type = String(data.type || '').slice(0, 40);
  const dec = (v) => { try { return decodeURIComponent(v); } catch (e) { return v; } };
  const geo = [req.headers['x-vercel-ip-city'], req.headers['x-vercel-ip-country-region'], req.headers['x-vercel-ip-country']]
    .filter(Boolean).map(dec).join(', ') || 'unknown location';
  const path = plain(data.path || '/').slice(0, 160);
  const ref = data.ref ? plain(data.ref) : 'direct';
  const utm = data.utm ? plain(data.utm).slice(0, 160) : '';
  const visit = Math.max(1, parseInt(data.visit, 10) || 1);
  const returning = visit > 1;
  const firstSeen = data.firstSeen ? plain(data.firstSeen).slice(0, 12) : '';
  const vidShort = data.visitorId ? plain(data.visitorId).slice(0, 24) : '';

  // source hygiene + visit grade
  const src = classifySource(data.ref, data.utm);
  const grade = gradeFor(type, data);
  const gIcon = grade === 'Hot' ? '🔥' : grade === 'Interested' ? '🟠' : '🟢';
  const srcLine = `🧭 ${esc(src.source)}${src.detail ? ` · ${esc(src.detail)}` : ''}`;

  let header, label, facts, lines;

  if (type === 'checkout_start') {
    const tier = plain(data.tier || 'a plan').slice(0, 80);
    header = `🔥 <b>Hot · clicked ${esc(tier)}</b>`;
    label = `A visitor (visit #${visit}${returning ? ', returning' : ''}, source: ${src.source}) clicked through to buy / book: "${tier}".`;
    facts = `Action: ${tier}\nVisit #: ${visit}${returning ? ' (returning)' : ''}\nSource: ${src.source}${src.detail ? ' (' + src.detail + ')' : ''}\nLocation: ${geo}\nPage: ${path}`;
    lines = [header, '', `🔢 Visit #${visit}${returning ? ' · returning' : ''}`, srcLine, `📍 ${esc(geo)}`, `📄 ${esc(path)}`];
  } else if (type === 'visit') {
    header = returning ? `🔁 <b>Returning visitor · visit #${visit}</b>` : `👀 <b>New visitor</b>`;
    label = returning
      ? `A returning visitor (visit #${visit}, first seen ${firstSeen || 'unknown'}, source: ${src.source}) just engaged.`
      : `A new visitor (source: ${src.source}) just engaged with the site.`;
    facts = `Visit #: ${visit}${returning ? ` (first seen ${firstSeen})` : ' (first visit)'}\nSource: ${src.source}${src.detail ? ' (' + src.detail + ')' : ''}\nLocation: ${geo}\nLanded on: ${path}`;
    lines = [header, ''];
    if (returning) lines.push(`🔢 Visit #${visit} · first seen ${esc(firstSeen || '?')}`);
    lines.push(srcLine, `📍 ${esc(geo)}`, `📄 ${esc(path)}`);
  } else if (type === 'visit_summary') {
    const seconds = Math.max(0, parseInt(data.seconds, 10) || 0);
    const mmss = `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const depth = Math.max(0, Math.min(100, parseInt(data.scrollDepth, 10) || 0));
    const sections = Array.isArray(data.sections) ? data.sections.map((s) => plain(s).slice(0, 20)).slice(0, 8) : [];
    const beh = [];
    if (data.viewedPricing) beh.push('viewed Pricing');
    if (data.openedChat) beh.push('opened chat');
    if (data.clickedIntent) beh.push('clicked to buy/book');
    const behText = beh.length ? beh.join(', ') : 'passive browse';
    header = `📋 <b>Visit summary · ${gIcon} ${grade}${returning ? ` · #${visit}` : ''}</b>`;
    label = `A visitor just left. Grade ${grade}; source ${src.source}; ${mmss} active; scrolled ${depth}%; sections: ${sections.join(', ') || 'none'}; behaviour: ${behText}; visit #${visit}${returning ? ' (returning)' : ''}.`;
    facts = label;
    lines = [header, '',
      `${gIcon} ${grade}`,
      `⏱️ Active: ${mmss}`,
      `📜 Scrolled: ${depth}%`,
      `🧭 Sections: ${esc(sections.join(' · ') || '—')}`,
      `⚡ ${esc(behText)}`,
      srcLine,
      `🔢 Visit #${visit}`,
      `📍 ${esc(geo)}`,
    ];
  } else {
    res.statusCode = 200; return res.end(JSON.stringify({ ok: true, dropped: 'unknown type' }));
  }

  const ai = await geminiRead(label, facts);
  if (vidShort) lines.push(`🆔 ${esc(vidShort)}`);
  if (ai) lines.push('', `🤖 <i>${esc(ai)}</i>`);

  // send the heads-up to the team (Telegram only — no CRM)
  await sendTelegram(lines.join('\n'));
  res.statusCode = 200; return res.end(JSON.stringify({ ok: true }));
};

// =============================================================
// Booking router  (Vercel serverless function)  — GET /api/book
// =============================================================
//
// One canonical booking URL for the whole site. Every "book a call"
// CTA points here. Behaviour by number of active sales closers:
//   • 0 closers → redirect to CAL_FALLBACK (never dead-ends).
//   • 1 closer  → redirect straight to that closer (no chooser).
//   • 2+        → serve a small on-brand page: pick a specific closer,
//                 OR "next available / anyone" (random).
//   • ?closer=any        → random pick, redirect.
//   • ?closer=<handle>   → that closer, redirect (falls back to any).
//
// Closer source: the CRM's Team sheet, via GET {CRM_EXEC_URL}?action=closers&_s={CRM_SECRET}
// → active role=closer members that have a calUrl. Short-cached in-memory.
//
// Query: ?plan=Team|Department|Executive (optional) pre-fills Cal notes.
//
// Env: CRM_EXEC_URL (Apps Script exec URL), CRM_SECRET (server-side only),
//      CAL_FALLBACK (default https://cal.com/andrestoro/discovery-call).
// =============================================================

const CRM_EXEC_URL = process.env.CRM_EXEC_URL || '';   // Apps Script exec URL of the CRM backend
const CRM_SECRET   = process.env.CRM_SECRET || '';     // CRM _s secret (server-side env only, never sent to the browser)
const FALLBACK = process.env.CAL_FALLBACK || 'https://cal.com/andrestoro/discovery-call';

const PLAN_NOTES = {
  Team:       'Interested in the Team plan ($2,500/mo)',
  Department: 'Interested in the Department plan ($5,000/mo)',
  Executive:  'Interested in the Executive plan (custom)',
};

let _cache = { at: 0, closers: [] };
const CACHE_MS = 60 * 1000;

async function getClosers() {
  if (Date.now() - _cache.at < CACHE_MS) return _cache.closers;
  if (!CRM_EXEC_URL || !CRM_SECRET) return [];
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 2500); // Apps Script can be slow + follows a redirect
  try {
    const sep = CRM_EXEC_URL.includes('?') ? '&' : '?';
    const r = await fetch(`${CRM_EXEC_URL}${sep}action=closers&_s=${encodeURIComponent(CRM_SECRET)}`, {
      signal: ctrl.signal,
    });
    if (!r.ok) return _cache.closers;
    const data = await r.json();
    const list = Array.isArray(data && data.closers) ? data.closers : Array.isArray(data) ? data : [];
    const closers = list
      .map((c) => ({ name: String(c.name || 'Axius'), calUrl: String(c.calUrl || c.calLink || '').trim() }))
      .filter((c) => c.calUrl);
    _cache = { at: Date.now(), closers };
    return closers;
  } catch (_) {
    return _cache.closers;
  } finally {
    clearTimeout(t);
  }
}

function toCalUrl(v) {
  const s = String(v || '').trim();
  if (!s) return FALLBACK;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.includes('cal.com/')) return `https://${s.replace(/^\/+/, '')}`;
  return `https://cal.com/${s.replace(/^\/+/, '')}/discovery-call`;
}

function withParams(calUrl, plan) {
  let u;
  try { u = new URL(calUrl); } catch (_) { u = new URL(FALLBACK); }
  if (!u.searchParams.has('overlayCalendar')) u.searchParams.set('overlayCalendar', 'true');
  if (plan && PLAN_NOTES[plan]) {
    u.searchParams.set('notes', PLAN_NOTES[plan]);
    u.searchParams.set('metadata[plan]', plan);
  }
  return u.toString();
}

function normalizePlan(q) {
  return Object.keys(PLAN_NOTES).find((p) => p.toLowerCase() === String(q || '').toLowerCase()) || '';
}

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function redirect(res, location) {
  res.setHeader('Cache-Control', 'no-store');
  res.statusCode = 302;
  res.setHeader('Location', location);
  return res.end();
}

// On-brand chooser page (Axius tokens: bone / ink / green; Fraunces + Instrument Sans).
function renderPage(closers, plan) {
  const anyHref = `/api/book?closer=any${plan ? `&plan=${plan}` : ''}`;
  const planLine = plan ? `<p class="plan">${esc(plan)} plan</p>` : '';
  const cards = closers.map((c) => `
      <a class="closer" href="${esc(withParams(toCalUrl(c.calUrl), plan))}" target="_blank" rel="noopener">
        <span class="nm">${esc(c.name)}</span><span class="go">Book &rarr;</span>
      </a>`).join('');
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Book your audit · Axius</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Instrument+Sans:wght@400..700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  /* Foundation mirrored 1:1 from axius.tech index.html */
  :root{
    --ivory:#F4F1EA;--ivory-2:#EDE9DF;--ink:#16140F;
    --ink-55:rgba(22,20,15,.55);--ink-40:rgba(22,20,15,.40);--ink-24:rgba(22,20,15,.24);--rule:rgba(22,20,15,.14);
    --green:#173B2D;--green-2:#122E23;--on-green:#EFEAE0;
    --surface:#FBF9F4;
    --serif:"Fraunces",Georgia,serif;--sans:"Instrument Sans",system-ui,sans-serif;--mono:"Geist Mono",ui-monospace,monospace;
    --ease:cubic-bezier(.19,1,.22,1);
  }
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;background:var(--ivory);color:var(--ink);
    font-family:var(--sans);font-size:16px;line-height:1.6;
    -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
    display:flex;align-items:center;justify-content:center;padding:48px 20px}
  .wrap{width:100%;max-width:452px}
  .wm{font-family:var(--serif);font-weight:600;font-size:19px;letter-spacing:.3px;margin:0 0 30px;display:flex;align-items:center;gap:9px}
  .dot{width:8px;height:8px;border-radius:50%;background:var(--green);display:inline-block}
  h1{font-family:var(--serif);font-variation-settings:"opsz" 144;font-weight:500;font-size:33px;line-height:1.1;letter-spacing:-.01em;margin:0 0 10px}
  h1 em{font-style:normal;color:var(--green)}
  .sub{color:var(--ink-55);font-size:15px;line-height:1.6;margin:0 0 26px}
  .plan{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--green);margin:0 0 18px}
  .closer{display:flex;align-items:center;justify-content:space-between;gap:14px;text-decoration:none;color:var(--ink);
    background:var(--surface);border:1px solid var(--rule);border-radius:14px;padding:17px 19px;margin-bottom:11px;
    box-shadow:0 6px 18px rgba(22,20,15,.06);transition:transform .4s var(--ease),border-color .4s var(--ease),box-shadow .4s var(--ease)}
  .closer:hover{border-color:var(--ink-24);transform:translateY(-2px);box-shadow:0 14px 32px rgba(22,20,15,.12)}
  .nm{font-weight:500;font-size:16px}
  .go{color:var(--green);font-weight:600;font-size:14px;white-space:nowrap}
  .any{display:flex;align-items:center;justify-content:center;text-decoration:none;margin-top:9px;
    background:var(--green);color:var(--on-green);border-radius:14px;padding:17px 19px;font-weight:600;font-size:15px;
    box-shadow:0 8px 22px rgba(22,20,15,.14);transition:transform .4s var(--ease),box-shadow .4s var(--ease)}
  .any:hover{transform:translateY(-2px);box-shadow:0 16px 36px rgba(22,20,15,.2)}
  .foot{margin-top:24px;font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-40)}
</style></head>
<body><div class="wrap">
  <p class="wm"><span class="dot"></span>AXIUS</p>
  <h1>Book your <em>audit</em>.</h1>
  <p class="sub">A thirty-minute look and a one-page read. No pitch. Choose who you'd like to meet, or let us route you to whoever's next available.</p>
  ${planLine}
  ${cards}
  <a class="any" href="${esc(anyHref)}">No preference &mdash; next available</a>
  <p class="foot">A technology ownership practice · axius.tech</p>
</div></body></html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    return res.end('Method Not Allowed');
  }

  const q = new URL(req.url, 'https://axius.tech').searchParams;
  const plan = normalizePlan(q.get('plan'));
  const sel = String(q.get('closer') || '').trim();
  let closers = await getClosers();

  // ?preview=1 — render the chooser with sample closers so the page can be
  // viewed before any real closer is captured. Does not affect real redirects.
  if (q.get('preview') && closers.length < 2) {
    closers = [
      { name: 'Andrés Toro', calUrl: 'https://cal.com/andrestoro/discovery-call' },
      { name: 'Sample Closer', calUrl: 'https://cal.com/andrestoro/discovery-call' },
    ];
  }
  const pickRandom = () => (closers.length ? closers[Math.floor(Math.random() * closers.length)].calUrl : FALLBACK);

  // Explicit selection (from the chooser page or a deep link).
  if (sel) {
    if (sel.toLowerCase() === 'any' || !closers.length) {
      return redirect(res, withParams(toCalUrl(pickRandom()), plan));
    }
    const key = sel.toLowerCase();
    const found = closers.find((c) => toCalUrl(c.calUrl).toLowerCase().includes(`/${key}`) || c.name.toLowerCase() === key);
    return redirect(res, withParams(toCalUrl(found ? found.calUrl : pickRandom()), plan));
  }

  // No selection: 0 or 1 closer → straight through; 2+ → chooser page.
  if (closers.length <= 1) {
    const only = closers.length ? closers[0].calUrl : FALLBACK;
    return redirect(res, withParams(toCalUrl(only), plan));
  }
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.statusCode = 200;
  return res.end(renderPage(closers, plan));
};

// =============================================================
// Stripe → Telegram bridge  (Vercel serverless function)
// =============================================================
//
// Receives Stripe webhook events, verifies the signature, and pings
// the @AxiusDispatch_Bot supergroup so Andrés gets a real-time
// notification the moment a customer subscribes / pays / cancels.
//
// Dormant until the site deploys to Vercel.  Once deployed, register
// the URL `https://<your-domain>/api/stripe-webhook` with Stripe and
// set three env vars on the Vercel project:
//
//   STRIPE_WEBHOOK_SECRET   whsec_…   from Stripe → Developers → Webhooks
//   TELEGRAM_BOT_TOKEN      8851…     same bot as the visitor-chat flow
//   TELEGRAM_CHAT_ID        -10039…   same Axius Dispatch supergroup
//
// Optional:
//   TELEGRAM_THREAD_ID      (forum topic id; omit to post to root)
//
// Zero external dependencies — uses built-in `crypto` + `https`.
// =============================================================

const crypto = require('crypto');
const https = require('https');

const TIER_NAME = {
  operador:     'Operator',
  equipo:       'Team',
  departamento: 'Department',
};
const TIER_EMOJI = {
  operador:     '🟢',
  equipo:       '🟠',
  departamento: '🔵',
};

// ── Vercel: disable body parser so we can verify the raw signature
module.exports.config = { api: { bodyParser: false } };

function readRaw(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end',  () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// Stripe signature header format:  t=<ts>,v1=<hex>
// Recompute HMAC-SHA256 of `<ts>.<raw>` with the webhook secret and
// timing-safe compare.  Reject anything older than 5 minutes.
function verifyStripeSignature(rawBody, sigHeader, secret) {
  if (!sigHeader || !secret) return false;
  const parts = Object.fromEntries(
    sigHeader.split(',').map(p => p.split('=').slice(0, 2))
  );
  const ts = parts.t;
  const expected = parts.v1;
  if (!ts || !expected) return false;
  if (Math.abs(Math.floor(Date.now() / 1000) - Number(ts)) > 300) return false;

  const computed = crypto
    .createHmac('sha256', secret)
    .update(`${ts}.${rawBody}`, 'utf8')
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(computed, 'hex'),
      Buffer.from(expected, 'hex'),
    );
  } catch (_) {
    return false;
  }
}

function sendTelegram(html) {
  return new Promise((resolve) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat  = process.env.TELEGRAM_CHAT_ID;
    const thread = process.env.TELEGRAM_THREAD_ID;
    if (!token || !chat) return resolve({ skipped: 'missing env' });

    const payload = JSON.stringify({
      chat_id: chat,
      text: html,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      ...(thread ? { message_thread_id: Number(thread) } : {}),
    });

    const req = https.request({
      method: 'POST',
      hostname: 'api.telegram.org',
      path: `/bot${token}/sendMessage`,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 6000,
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end',  () => resolve({
        status: res.statusCode,
        body: Buffer.concat(chunks).toString('utf8'),
      }));
    });
    req.on('error', err => resolve({ error: err.message }));
    req.write(payload);
    req.end();
  });
}

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const money = (cents, currency = 'usd') => {
  if (cents == null) return '';
  const v = (cents / 100).toLocaleString('en-US', {
    style: 'currency', currency: (currency || 'usd').toUpperCase(),
    maximumFractionDigits: 0,
  });
  return v;
};

// ── Event formatters ───────────────────────────────────────────

function tierFromMetadata(meta) {
  const id = meta && meta.tier_id;
  return {
    id,
    name: TIER_NAME[id] || id || 'Unknown tier',
    emoji: TIER_EMOJI[id] || '⚪️',
  };
}

function fmtCheckoutCompleted(s) {
  const t = tierFromMetadata(s.metadata || {});
  const company = (s.custom_fields || [])
    .find(f => f.key === 'company_name');
  const companyText = company && company.text && company.text.value;
  const total = money(s.amount_total, s.currency);
  return (
    `${t.emoji} <b>New subscriber</b> — Axius <b>${esc(t.name)}</b>\n\n` +
    (companyText ? `<b>Company:</b> ${esc(companyText)}\n` : '') +
    (s.customer_email ? `<b>Email:</b> ${esc(s.customer_email)}\n` : '') +
    (s.customer_details && s.customer_details.phone
      ? `<b>Phone:</b> ${esc(s.customer_details.phone)}\n` : '') +
    (total ? `<b>First invoice:</b> ${esc(total)} (subscription + setup)\n` : '') +
    `\n↪ Onboarding window starts now. Tier SLA applies.`
  );
}

function fmtInvoicePaid(inv) {
  const t = tierFromMetadata((inv.subscription_details || {}).metadata || inv.metadata || {});
  const total = money(inv.amount_paid, inv.currency);
  const customer = inv.customer_email || (inv.customer_name) || (inv.customer);
  // Skip the very first invoice (already covered by checkout.session.completed)
  const isRenewal = inv.billing_reason === 'subscription_cycle';
  if (!isRenewal) return null;
  return (
    `💸 <b>Renewal paid</b> — Axius <b>${esc(t.name)}</b>\n` +
    `<b>Customer:</b> ${esc(customer)}\n` +
    `<b>Amount:</b> ${esc(total)}\n` +
    `Next billing cycle armed.`
  );
}

function fmtPaymentFailed(inv) {
  const t = tierFromMetadata((inv.subscription_details || {}).metadata || inv.metadata || {});
  const total = money(inv.amount_due, inv.currency);
  const customer = inv.customer_email || inv.customer;
  return (
    `⚠️ <b>Payment failed</b> — Axius <b>${esc(t.name)}</b>\n` +
    `<b>Customer:</b> ${esc(customer)}\n` +
    `<b>Amount due:</b> ${esc(total)}\n` +
    `Stripe will retry automatically (smart retries). Reach out within 24h to keep the relationship warm.`
  );
}

function fmtSubscriptionDeleted(sub) {
  const t = tierFromMetadata(sub.metadata || {});
  return (
    `🔴 <b>Subscription canceled</b> — Axius <b>${esc(t.name)}</b>\n` +
    `Customer: <code>${esc(sub.customer)}</code>\n` +
    `Last billing period ends: <code>${esc(new Date((sub.current_period_end || 0) * 1000).toISOString().slice(0, 10))}</code>`
  );
}

// ── Handler ────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const raw = await readRaw(req);
  const sig = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!verifyStripeSignature(raw, sig, secret)) {
    return res.status(400).json({ error: 'invalid_signature' });
  }

  let event;
  try { event = JSON.parse(raw); }
  catch (_) { return res.status(400).json({ error: 'bad_json' }); }

  // Always respond 200 fast so Stripe doesn't retry — we'll fire the
  // Telegram ping asynchronously after the response is queued.
  let message = null;
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        message = fmtCheckoutCompleted(event.data.object);
        break;
      case 'invoice.paid':
        message = fmtInvoicePaid(event.data.object);
        break;
      case 'invoice.payment_failed':
        message = fmtPaymentFailed(event.data.object);
        break;
      case 'customer.subscription.deleted':
        message = fmtSubscriptionDeleted(event.data.object);
        break;
      default:
        // Ignored event types — still return 200 so Stripe stops retrying
        break;
    }
  } catch (err) {
    console.error('format error', err);
  }

  // Fire-and-forget Telegram send
  if (message) {
    sendTelegram(message).catch(err => console.error('telegram error', err));
  }

  return res.status(200).json({ received: true, forwarded: !!message });
};

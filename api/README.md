# Serverless functions

Vercel runs anything in this folder as a serverless function at `/api/<filename>` automatically — no `vercel.json` config needed. The static site keeps working unchanged.

Three functions, all cookieless, all dispatching to the same @AxiusDispatch_Bot supergroup:

| File | Trigger | Does |
|---|---|---|
| `stripe-webhook.js` | Stripe webhook events | Telegram alert + (on checkout) notifies the CRM by Engagement ID |
| `lead.js` | on-page chat submit (`POST /api/lead`) | Forwards the message to Telegram (honeypot + size guards) |
| `notify.js` | client beacons (`POST /api/notify`) | `visit` + `checkout_start` pings to Telegram, each enriched with a one-line **Gemini 2.5 Flash** read |

Env vars across the three: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TELEGRAM_THREAD_ID` (opt.), `STRIPE_WEBHOOK_SECRET`, `GEMINI_API_KEY`, `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET`, `CRM_WEBHOOK_ACTION` (opt.). See the root `README.md` for the full table.

## `stripe-webhook.js`

Receives Stripe webhook events, verifies the signature, posts a notification to the @AxiusDispatch_Bot supergroup, and — on `checkout.session.completed` — notifies the CRM (Engagement Spine). Dormant until the site is deployed.

### One-time setup (when you deploy)

1. **Push to Vercel** — once the repo is connected to a Vercel project, the next push deploys this endpoint to `https://<your-domain>/api/stripe-webhook`.

2. **Set environment variables** in the Vercel project (Settings → Environment Variables):

   | Var | Where to get it |
   |---|---|
   | `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → click your webhook → Signing secret (`whsec_…`) |
   | `TELEGRAM_BOT_TOKEN` | Same bot token you already use for the visitor-chat flow |
   | `TELEGRAM_CHAT_ID` | `-1003929214805` (Axius Dispatch supergroup) |
   | `TELEGRAM_THREAD_ID` *(optional)* | The forum topic id if you want pings routed to a dedicated "Subscriptions" topic instead of the supergroup root |

3. **Register the webhook in Stripe** — Developers → Webhooks → "Add endpoint"
   - URL: `https://<your-domain>/api/stripe-webhook`
   - Events: select
     - `checkout.session.completed`
     - `invoice.paid`
     - `invoice.payment_failed`
     - `customer.subscription.deleted`
   - Stripe will reveal the signing secret — paste it into the `STRIPE_WEBHOOK_SECRET` Vercel env var

4. **Test it** — Stripe → Webhooks → your endpoint → "Send test event" → pick `checkout.session.completed`. Telegram should ping within a second or two.

### What lands in Telegram

| Stripe event | Telegram message |
|---|---|
| `checkout.session.completed` | 🟢 **New subscriber** — Axius **Team**, Engagement ID (if present), company, email, phone, first-invoice amount, onboarding cue |
| `invoice.paid` (renewals only) | 💸 **Renewal paid** — tier, customer, amount |
| `invoice.payment_failed` | ⚠️ **Payment failed** — tier, customer, amount due, reach-out reminder |
| `customer.subscription.deleted` | 🔴 **Subscription canceled** — tier, customer id, last billing date |

The first invoice fires `checkout.session.completed` *and* `invoice.paid`, but the handler filters renewal pings to `billing_reason === 'subscription_cycle'` to avoid double-notifying on the initial purchase.

### CRM notify (Engagement Spine)

On `checkout.session.completed` the webhook also POSTs to the CRM so the matching lead advances toward Gate A — **matched by Engagement ID, not company name.**

- **Engagement ID** comes from Stripe's `client_reference_id` (the CRM appends `?client_reference_id=<engagementId>` to the checkout link it sends a won lead).
- **CRM contract** (Apps Script): action in the **query** (`?action=stripePaid`), shared secret in the JSON **body** as `_secret`. The function POSTs to `/exec`, then follows the 302 with a **GET** to read the `doPost` result (re-POSTing the redirect 405s).
- **Payload**: `{ engagementId, paid:'yes', paidAt, tier ('team'|'department'), company, stripeCustomerId, stripeSubscriptionId, amountTotal, currency, eventId }` — fields mirror the CRM Engagement record so `upsertEngagement_` can set the paid signal. `eventId` lets the CRM dedupe Stripe retries.
- **Env**: `CRM_WEBHOOK_URL` (bare `/exec`), `CRM_WEBHOOK_SECRET` (→ body `_secret`), `CRM_WEBHOOK_ACTION` (default `stripePaid`). Inert until set.
- The CRM needs a **non-admin, secret-authed** `stripePaid` handler; its `saveEngagement` is admin-only so the site (shared secret only) can't use it.

### Security

- HMAC-SHA256 signature verification with timing-safe comparison
- Events older than 5 minutes are rejected (replay protection)
- 200 returned promptly so Stripe doesn't retry; Telegram send is fire-and-forget, CRM notify is awaited (so it completes before the function freezes)
- Zero external dependencies (uses Node built-in `crypto` + `https`)

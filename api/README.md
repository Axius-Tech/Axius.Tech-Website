# Serverless functions

Vercel runs anything in this folder as a serverless function at `/api/<filename>` automatically — no `vercel.json` config needed. The static prototype keeps working unchanged.

## `stripe-webhook.js`

Receives Stripe webhook events, verifies the signature, and posts a notification to the @AxiusDispatch_Bot supergroup. Dormant until the site is deployed.

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
| `checkout.session.completed` | 🟢 **New subscriber** — Axius **Team**, company, email, phone, first-invoice amount, onboarding cue |
| `invoice.paid` (renewals only) | 💸 **Renewal paid** — tier, customer, amount |
| `invoice.payment_failed` | ⚠️ **Payment failed** — tier, customer, amount due, reach-out reminder |
| `customer.subscription.deleted` | 🔴 **Subscription canceled** — tier, customer id, last billing date |

The first invoice fires `checkout.session.completed` *and* `invoice.paid`, but the handler filters renewal pings to `billing_reason === 'subscription_cycle'` to avoid double-notifying on the initial purchase.

### Security

- HMAC-SHA256 signature verification with timing-safe comparison
- Events older than 5 minutes are rejected (replay protection)
- 200 returned promptly so Stripe doesn't retry; Telegram send is fire-and-forget after the response
- Zero external dependencies (uses Node built-in `crypto` + `https`)

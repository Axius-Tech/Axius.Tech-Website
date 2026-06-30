# Axius — axius.tech

Production site for [axius.tech](https://axius.tech): a **self-contained static `index.html`** (inline CSS + JS, no build step) plus a few Vercel serverless functions in `api/`. **Push to `main` → Vercel auto-deploys.**

> The live homepage is the single `index.html`. The `reference/` React-via-Babel directions (Quiet 0.5 / E05) are **archived** and are not loaded by the live site.

## Run locally

```sh
python3 -m http.server 4321
# open http://127.0.0.1:4321/   (append ?skipEntry=1 to skip the intro)
```

The `api/` functions don't run under `python http.server` (POSTs return 501) — expected locally; they run on Vercel.

## Structure

```
Axius.Tech-Website/
├── index.html              the live site (hero · catalog · method · pricing · operator · begin)
├── privacy/ , terms/       legal pages
├── 404.html · robots.txt · sitemap.xml · favicon*
├── assets/
│   ├── og-share.jpg        link-preview card
│   ├── andres-toro*.jpg    operator photos (operator section; -square is for the email signature)
│   └── trail/              hero portfolio shots
├── api/                    Vercel serverless functions (see api/README.md)
│   ├── stripe-webhook.js   Stripe events → Telegram + CRM notify (Engagement Spine)
│   ├── lead.js             on-page chat → Telegram
│   └── notify.js           new-visitor + checkout-click pings → Telegram (Gemini-enriched)
└── reference/              archived React directions + gitignored *.local.* secret files
```

## Secrets — Vercel env vars

Live secrets are **Vercel Environment Variables (Production)**, never committed. One-off local API work uses gitignored `reference/*.local.txt` files (`*.local.*` is gitignored).

| Env var | Used by | What |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | all 3 fns | @AxiusDispatch_Bot token |
| `TELEGRAM_CHAT_ID` | all 3 fns | Axius Dispatch supergroup (`-1003929214805`) |
| `TELEGRAM_THREAD_ID` | optional | forum topic id (omit → posts to root) |
| `STRIPE_WEBHOOK_SECRET` | stripe-webhook | Stripe signing secret (`whsec_…`) |
| `GEMINI_API_KEY` | notify | Google AI Studio key (`AQ.…`); model `gemini-2.5-flash` |
| `CRM_WEBHOOK_URL` | stripe-webhook | CRM Apps Script bare `/exec` URL (Engagement Spine) |
| `CRM_WEBHOOK_SECRET` | stripe-webhook | CRM secret — sent in the POST **body** as `_secret` |
| `CRM_WEBHOOK_ACTION` | optional | CRM action name (default `stripePaid`) |

Env-var changes require a **redeploy** to take effect on the live functions.

## Engagement Spine (website's role)

On `checkout.session.completed`, `stripe-webhook.js` reads the **Engagement ID** from Stripe's `client_reference_id` and POSTs it to the CRM (`?action=stripePaid`, secret in the body as `_secret`) so the matching lead advances toward Gate A — **matched by ID; company name is only a human label.** The CRM must (a) expose a non-admin, secret-authed `stripePaid` handler, and (b) append `?client_reference_id=<engagementId>` to the checkout link it sends a won lead. Stripe Payment Links / Prices / coupons are catalogued separately (Stripe infra notes).

## Deploy

Direct commits to `main` are fine; **push to `main` = production deploy** via Vercel's GitHub integration.

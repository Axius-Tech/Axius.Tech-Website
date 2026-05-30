# Axius Landing

Production landing page for [axius.tech](https://axius.tech). Static React-via-Babel — no build step required. The live direction is **Quiet 0.5**.

## Running it locally

The site is plain HTML + JSX + CDN React. Any static server works.

```sh
python3 -m http.server 4321
```

Then open <http://127.0.0.1:4321/>.

## Project structure

```
Axius.Tech-Website/
├── README.md                          this file
├── QUIET-05-COPY.md                   full Quiet 0.5 site copy (EN + ES)
├── .gitignore                         keeps secrets, .DS_Store, node_modules out
├── index.html                         entry — loads Quiet 0.5
├── api/
│   └── stripe-webhook.js              Vercel Function for Stripe events
├── assets/
│   └── andres-toro.jpg                founder photo
└── reference/
    ├── axius-shared.jsx               design tokens · data · atoms · AxiusConfig
    ├── axius-direction-E05.jsx        Quiet 0.5 — the live direction
    ├── axius-secrets.local.jsx        ⚠️ gitignored — real Telegram / WhatsApp credentials
    └── axius-secrets.example.jsx      template for the file above
```

## Secrets / credentials

The Ring-Andrés flow posts to a Telegram bot. The bot token, chat ID, phone numbers, and Stripe payment-link URLs **never** go in the committed code.

To set them up locally:

```sh
cp reference/axius-secrets.example.jsx reference/axius-secrets.local.jsx
# edit reference/axius-secrets.local.jsx and fill in your real values
```

`index.html` loads `axius-secrets.local.jsx` BEFORE `axius-shared.jsx`. The merge block at the bottom of `axius-shared.jsx` copies the values from `window.AxiusSecrets` into `window.AxiusConfig` at runtime.

If `axius-secrets.local.jsx` is missing the page still loads — the Telegram integration just stays inert (placeholder credentials in `AxiusConfig`).

## Telegram setup (one-time)

The Ring flow assumes a forum-style supergroup with `@AxiusDispatch_Bot` promoted to admin and "Manage Topics" enabled. Each visitor's ring creates a fresh topic in the group.

For full setup notes (group creation, bot promotion, topics enablement), see the conversation history with the design assistant.

## Copy

The full Quiet 0.5 site copy — every visible string in both English and Spanish — lives in `QUIET-05-COPY.md`, organized in the order a visitor reads the page.

## Branch / commit conventions

Direct commits to `main` are fine. Production is deployed automatically on push to `main` via Vercel's GitHub integration.

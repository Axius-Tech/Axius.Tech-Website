# Axius Landing

Working prototype for the [axius.tech](https://axius.tech) landing page. Static React-via-Babel — no build step required.

The live direction is **Quiet 0.5** (`reference/axius-direction-E05.jsx`). Earlier explorations (A, B, C, D, E, E06, E075, E090) are kept in `reference/` for visual reference; the switcher harness at `reference/Axius Compare.html` toggles between them.

## Running it locally

The prototype is plain HTML + JSX + CDN React. Any static server works.

```sh
cd "Axius Landing"
python3 -m http.server 4321
```

Then open:

```
http://127.0.0.1:4321/reference/Axius%20Compare.html#v=quiet05
```

The `#v=` fragment selects the direction. `quiet05` is the canonical one.

## Project structure

```
Axius Landing/
├── README.md                          this file
├── QUIET-05-COPY.md                   full Quiet 0.5 site copy (EN + ES)
├── .gitignore                         keeps secrets, .DS_Store, node_modules out
├── assets/                            shared static assets
└── reference/
    ├── Axius Compare.html             switcher harness (entry point)
    ├── andres-toro.jpg                founder photo
    ├── axius-shared.jsx               design tokens · data · atoms · AxiusConfig
    ├── axius-secrets.local.jsx        ⚠️ gitignored — real Telegram / WhatsApp credentials
    ├── axius-secrets.example.jsx      template for the file above
    ├── axius-direction-E05.jsx        ← the live direction (Quiet 0.5)
    ├── axius-direction-E06.jsx        Quiet 0.6 — operator-card hero variant
    ├── axius-direction-E090.jsx       Quiet 0.90 — alternate hero treatment
    ├── axius-direction-E075.jsx       intermediate iteration
    ├── axius-direction-{A,B,C,D,E,G}.jsx
    │                                  earlier explorations · kept for reference
    └── axius-direction-{E2,E3}.jsx    revisions of direction E
```

## Secrets / credentials

The Ring-Andrés flow posts to a Telegram bot. The bot token, chat ID, phone numbers, and Stripe payment-link URLs **never** go in the committed code.

To set them up locally:

```sh
cp reference/axius-secrets.example.jsx reference/axius-secrets.local.jsx
# edit reference/axius-secrets.local.jsx and fill in your real values
```

`reference/Axius Compare.html` loads `axius-secrets.local.jsx` BEFORE `axius-shared.jsx`. The merge block at the bottom of `axius-shared.jsx` copies the values from `window.AxiusSecrets` into `window.AxiusConfig` at runtime.

If `axius-secrets.local.jsx` is missing the prototype still loads — the Telegram integration just stays inert (placeholder credentials in `AxiusConfig`).

## Telegram setup (one-time)

The Ring flow assumes a forum-style supergroup with `@AxiusDispatch_Bot` promoted to admin and "Manage Topics" enabled. Each visitor's ring creates a fresh topic in the group.

For full setup notes (group creation, bot promotion, topics enablement), see the conversation history with the design assistant.

## Hero direction toggle

`reference/Axius Compare.html#v=<id>` selects the direction:

| `#v=` value   | File                          | Notes                                     |
| ------------- | ----------------------------- | ----------------------------------------- |
| `quiet05`     | `axius-direction-E05.jsx`     | **Live direction**                        |
| `quiet06`     | `axius-direction-E06.jsx`     | Operator-card hero                        |
| `quiet090`    | `axius-direction-E090.jsx`    | Alternate hero                            |

Other directions (A, B, C, D, E, G) are reachable through the in-page nav at the top of the harness.

## Copy

The full Quiet 0.5 site copy — every visible string in both English and Spanish — lives in `QUIET-05-COPY.md`, organized in the order a visitor reads the page.

## Branch / commit conventions

Direct commits to `main` are fine for prototype-stage changes. When the project moves to production (Next.js migration), switch to PRs.

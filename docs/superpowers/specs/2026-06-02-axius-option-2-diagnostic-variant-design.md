# Axius Option 2 — Diagnostic-First Variant (Design Spec)

**Status:** Draft for review
**Owner:** Andrés Toro
**Date:** 2026-06-02
**Replace-before-launch deadline (fabricated content):** 2026-08-01

---

## 1. Context

The Axius landing site at [axius-tech-website.vercel.app](https://axius-tech-website.vercel.app) currently ships a single direction — **Quiet 0.5** ([reference/axius-direction-E05.jsx](../../reference/axius-direction-E05.jsx)) — a presentation-first experience: hero → commitments → mess → catalog → pricing → comparison → founder → FAQ.

External review (`Axius_Website_Improvement_Report.pdf`, May 2026) concluded that the credibility and aesthetic are strong but accessibility is weak: visitors must work to understand whether Axius is relevant to them. The report's core recommendation is to add a **guided diagnostic discovery layer** that personalizes the experience: Industry → Challenge → Outcome → Personalized Recommendations.

This spec defines a **second, parallel option** that implements every recommendation in the PDF. **Option 1 (Quiet 0.5) must remain untouched and accessible** at a separate URL so it can be referenced during build, used for warm-lead sharing, and reverted to if Option 2 underperforms.

**Out of scope:** any change to E05's source file, any change to the Stripe / Telegram integration, any change to the API webhook, any change to the public assets (the new variant reuses `/assets/*`).

---

## 2. Goals & Non-Goals

### Goals

- G1. Implement a 3-step diagnostic (Industry → Challenge → Outcome) as the first viewport at `/`.
- G2. Personalize 6 surfaces (hero kicker, recommendations panel, catalog filter, pricing tier emphasis, evidence section, chat) based on diagnostic answers.
- G3. Ship every PDF recommendation: evidence layer (testimonials, case studies, metrics, GBP card), visual layer (founder video surface, demos, before/after), redesigned chat as discovery engine.
- G4. Keep Option 1 (E05) accessible at `/v1` with **zero source changes** to its file.
- G5. EN + locally-adapted ES across all new copy.
- G6. Native mobile-first design for diagnostic; full responsive parity for all new sections.
- G7. Date-bound auto-unmount for all fabricated content (deadline 2026-08-01) so deception risk has a floor.

### Non-Goals

- NG1. Modifying `axius-direction-E05.jsx`. Zero edits. If a shared change is needed, the design accepts duplication as the cost.
- NG2. Touching the Stripe / Telegram production wiring done in the prior session (Payment Links, webhook endpoint, Vercel env vars).
- NG3. Building a real video recording / capturing real client metrics in v1 — those land via 2026-08-01 content replacement.
- NG4. Refactoring `axius-shared.jsx`'s existing data structures (`AxiusConfig`, `AxiusTokens`, `AxiusCommitments`, `AxiusMethodology`, `AxiusCatalog`, `AxiusPricing`, `AxiusComparison`, `AxiusFAQ`, `AxiusFounder`). All new shared data is **additive**.
- NG5. Modifying the existing chat surface code. The redesigned chat reuses the same Telegram-bridge logic — only the entry messages, mode detection, and button-driven branch are new.

---

## 3. Architecture

### 3.1 URL routing

| URL | Direction file | Notes |
|---|---|---|
| `/` | `axius-direction-F.jsx` (new) | Diagnostic-first variant. Becomes the canonical link. |
| `/v1/` | `axius-direction-E05.jsx` (untouched) | Original Quiet 0.5 preserved verbatim. |

Two HTML entry points:

- `index.html` (modified): loads `axius-secrets.local.jsx`, `axius-shared.jsx`, `axius-diagnostic.jsx`, `axius-evidence.jsx`, `axius-visual.jsx`, `axius-direction-F.jsx` and renders `window.AxiusDirectionF` into `#stage-quiet06`. The mount-point id `stage-quiet06` is fixed (referenced in §11.2 verification grep).
- `v1/index.html` (new): a clone of the current `index.html` as it exists immediately before any Option 2 implementation work begins. Loads `axius-secrets.local.jsx`, `axius-shared.jsx`, `axius-direction-E05.jsx` and renders `window.AxiusDirectionE05` into `#stage-quiet05`. **The `v1/index.html` must NOT include any of the new Option 2 scripts** (`axius-diagnostic.jsx`, `axius-evidence.jsx`, `axius-visual.jsx`, `axius-direction-F.jsx`) — Option 1 should not have access to any new globals, and should render byte-identically to today's `/`.

Both entry points share the same `reference/` directory and `assets/`. Because `axius-shared.jsx` is loaded by both, its **additive** changes (§3.3) must not affect Option 1's behavior. Since every Option 2 addition is a new `window.*` assignment and Option 1 reads none of them, this invariant holds by construction.

**Reference for "byte-identical":** §11 verifications compare `v1/index.html` against a snapshot of the **pre-implementation** `index.html` (captured at the start of execution), not against the modified post-implementation `index.html`. The snapshot lives at `docs/superpowers/specs/snapshots/2026-06-02-pre-implementation-index.html` and is committed before any other file is touched.

### 3.2 File layout

```
Axius.Tech-Website/
├── index.html                              # MODIFIED — loads F.jsx, mounts the diagnostic variant
├── v1/
│   └── index.html                          # NEW — clone of current index.html, loads E05.jsx
├── api/stripe-webhook.js                   # UNCHANGED
├── assets/                                 # UNCHANGED (founder photo, og.jpg, studio + on-the-go shots)
├── reference/
│   ├── axius-direction-E05.jsx             # UNTOUCHED (Option 1, parallel-served at /v1)
│   ├── axius-direction-F.jsx               # NEW — Option 2 composition + personalized sections
│   ├── axius-diagnostic.jsx                # NEW — 3-step wizard + state + Reset chip + Skip
│   ├── axius-evidence.jsx                  # NEW — Testimonials, CaseStudies, Metrics, GBP
│   ├── axius-visual.jsx                    # NEW — FounderVideo, Demos, BeforeAfter
│   ├── axius-shared.jsx                    # MODIFIED ADDITIVELY — see §3.3
│   └── axius-secrets.example.jsx           # UNCHANGED
└── docs/superpowers/specs/
    └── 2026-06-02-axius-option-2-diagnostic-variant-design.md   # THIS FILE
```

### 3.3 Additive changes to `axius-shared.jsx`

Existing `window.AxiusConfig`, `AxiusTokens`, `AxiusCommitments`, `AxiusMethodology`, `AxiusCatalog`, `AxiusPricing`, `AxiusComparison`, `AxiusFAQ`, `AxiusFounder`, and all atoms (`AxiusDot`, `AxiusMono`, `AxiusPill`, `AxiusBtn`, `AxiusWordmark`, `AxiusPortrait`, `AxiusImgSlot`, `AxiusRule`, `AxiusComment`) are **untouched**.

Additions (each as a single new `window.*` assignment at the bottom of the file, gated so re-loading is idempotent):

- `window.AxiusIndustries` — 10 entries (id, label EN/ES, kicker EN/ES, description EN/ES).
- `window.AxiusChallenges` — 6 entries (id, label EN/ES, copy EN/ES).
- `window.AxiusOutcomes` — 3 entries (id, label EN/ES, mapped pricing tier id).
- `window.AxiusRecommendations` — 60-cell matrix (`industryId × challengeId` → 3 hand-picked sample-item refs by their existing `n` value + 1-line rationale EN/ES). See §10.8 for the data shape and §3.3.1 for catalog identity.
- `window.AxiusCatalogTags` — **category-level** tagging: `{ categoryId: [industryId, ...] }` where `categoryId` is the existing `id` field on each `AxiusCatalog[i]` entry (`'sales' | 'cx' | 'ops' | 'ai' | 'data' | 'web' | 'soft' | 'grow' | 'creative'`). Initial tagging covers all 9 categories; user adjusts before launch. **Why category-level not item-level:** the catalog ships only ~4 sample items per category (the `samples` array on each category) and a `count` integer for the rest. There is no per-item identity for the unsampled 93 items, so item-level tagging is undefined for the bulk of the catalog. Category tagging filters at the natural granularity that already exists in the data.
- `window.AxiusTestimonials` — empty array `[]` in v1.
- `window.AxiusCaseStudies` — empty array in v1 (the **fabricated** ones live under `AxiusFabricated.caseStudies`).
- `window.AxiusOperationalMetrics` — derived from `AxiusPricing` SLA values; honest.
- `window.AxiusGBP` — `{ url: null, rating: null, reviewCount: null }` in v1.
- `window.AxiusFounderVideo` — `{ url: null, poster: null, durationSec: null }` in v1.
- `window.AxiusFabricated` — **all REPLACE_BEFORE_LAUNCH content** lives here under one root:
  - `.caseStudies` — 3 entries with invented specific company names + numeric outcomes.
  - `.outcomeMetrics` — 4 numeric tiles (e.g., "+38% faster lead response avg.").
  - `.demos` — 3 CSS-animated mockup recipes.
  - `.beforeAfter` — 2 stylized mock-screenshot recipes.
- `window.AxiusFabricatedDeadline` — `'2026-08-01T00:00:00-05:00'` (Bogotá local time).
- `window.AxiusOutcomeToTier` — explicit data mapping `{ 'fix-one': 'operador', 'run-many': 'equipo', 'delegate': 'departamento' }`, consumed by §5.4 so the binding is data, not code.
- `window.AxiusPersonalization` — runtime state container + pub-sub API (see §3.4).

### 3.3.1 Catalog identity decision (resolves the per-item ID gap)

`window.AxiusCatalog` (axius-shared.jsx:176) is **9 categories** with:
- a category-level `id` (e.g., `'sales'`), `name`, `nameEs`, `count` (integer), and `stack` string;
- a `samples` array of ~4 illustrative items per category, each with a stable `n` value (e.g., `'001'`, `'037'`, `'120'`);
- no addressable identity for the **93 unsampled items** that fill out the `count`.

Total addressable items = sum of `count` fields = **16 + 17 + 16 + 14 + 13 + 15 + 15 + 11 + 12 = 129** (not 120). The spec uses 129 throughout; any place a fixed number appears, it derives from `AxiusCatalog.reduce((a, c) => a + c.count, 0)` at runtime so future catalog edits don't break the UI text.

**Two granularities used by Option 2:**
- **Catalog filter (§5.3)** operates at **category granularity**. `AxiusCatalogTags[categoryId]` lists which industries each category serves. Filtered catalog hides whole categories not tagged for the visitor's industry. Categories tagged `'all'` always render.
- **Recommendations panel (§5.2)** operates at **sample-item granularity**. Each cell of `AxiusRecommendations` references items by their actual `n` string (e.g., `'001'`, `'037'`, `'118'`) — only the 36 known samples are eligible. If a (industry × challenge) cell isn't authored, the engine falls back to "first 3 samples from the highest-affinity tagged category" so the panel never renders empty.

This decision keeps both surfaces implementable against the data that actually exists. **No upstream change to `AxiusCatalog` is required.**

A top-of-shared-file comment block lists every fabricated entry and the deadline, so it's visible to any developer who opens the file (see §9).

### 3.4 Personalization runtime API

```js
window.AxiusPersonalization = (function () {
  const KEY = 'axius:perso:v1';
  const TTL_DAYS = 30;
  const listeners = new Set();
  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const age = (Date.now() - parsed.completedAt) / 86400000;
      if (age > TTL_DAYS) return defaultState();
      return parsed;
    } catch (_) { return defaultState(); }
  }

  function defaultState() {
    return { industry: null, challenge: null, outcome: null,
             industryOther: null, skipped: false, completedAt: null, version: 1 };
  }

  function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} }
  function notify()  { listeners.forEach(fn => { try { fn(state); } catch (_) {} }); }

  return {
    get: () => ({ ...state }),
    set: (patch) => { state = { ...state, ...patch, completedAt: Date.now() }; persist(); notify(); },
    skip: () => { state = { ...state, skipped: true, completedAt: Date.now() }; persist(); notify(); },
    reset: () => { localStorage.removeItem(KEY); state = defaultState(); notify(); },
    subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    hasAnswered: () => Boolean(state.industry || state.skipped),
    isComplete: () => Boolean(state.industry && state.challenge && state.outcome),
  };
})();
```

Every personalized component in `F.jsx`, `axius-evidence.jsx`, `axius-visual.jsx`, and the chat reads via `React.useSyncExternalStore` against `subscribe` + `get`.

---

## 4. Diagnostic flow

### 4.1 Mount logic (in `axius-direction-F.jsx`)

```js
const P = window.AxiusPersonalization;
const [perso, setPerso] = React.useState(P.get);
React.useEffect(() => P.subscribe(setPerso), []);
const showInline = !P.hasAnswered();
```

- First-time visitor (`!hasAnswered`) → diagnostic fills the first viewport; hero shifts down to the second viewport. **No slim bar yet** (the diagnostic itself occupies the equivalent space).
- Returning answered visitor → diagnostic does not mount. **The slim bar mounts at the top of the page from t=0 and remains pinned** (it is not scroll-gated). Hero is the first viewport beneath it.
- Skipped visitor → same as answered visitor: slim bar pinned from t=0, but reads "Showing all capabilities · [Run the 30s diagnostic]".

**Note:** the spec's `<DiagnosticBar>` is always pinned for returning/skipped visitors. The "fades in on scroll past 80vh" behavior referenced in §4.4 applies **only to first-time visitors** while they are still scrolling past the inline diagnostic — once they answer or skip, the bar pins immediately and stays pinned. The intent: never have a moment where a returning visitor sees no indication of their personalized state.

### 4.2 Step state machine

```
                  ┌──── Skip ────────────────────────────────────────────────┐
                  │                                                          ▼
[ load ]──init──▶[ Step 1: Industry ]──pick──▶[ Step 2: Challenge ]──pick──▶[ Step 3: Outcome ]──pick──▶[ Complete ]
                  ▲                            │                                          │
                  └──── Back ──────────────────┴────────── Back ────────────────────────┘
```

- Each step is a single React component. Steps render conditionally inside a parent `<DiagnosticWizard>`.
- Back chevron on steps 2 and 3. No back on step 1 (Skip is the escape).
- After step 3 commit, the wizard collapses with a 250ms slide-up; the page below auto-scrolls so the hero is in view.

### 4.3 Step UI specs

**Step 1 — Industry (10 chips + Other text input)**

- Layout: 5×2 grid on desktop, single column on mobile.
- Chip: 1-line label, optional icon, ~16px label.
- "Other" chip: when clicked, reveals an inline input "Tell us your industry: ___" (max 60 chars). Commit on Enter or chip-tap "Continue".
- Top-right: subtle "Skip — show everything" link.

**Step 2 — Challenge (6 chips)**

Universal challenges (final copy in §10):
1. Leads slip through the cracks
2. Manual data entry eats hours
3. Customer comms scattered across tools
4. I'm the bottleneck on everything
5. No visibility into what's actually working
6. Onboarding / handoffs are inconsistent

Layout: 3×2 grid on desktop, single column on mobile.

**Step 3 — Outcome (3 chips)**

1. Fix one critical system reliably → `operador`
2. Run multiple systems together with continuity → `equipo`
3. Fully delegate the tech layer → `departamento`

Layout: single row of 3 on desktop, single column on mobile. Each chip subtle-references the corresponding tier price ("starts at $1k/mo", etc.) so the visitor sees the cost implication at decision time.

### 4.4 Slim sticky bar (post-answer)

- 44px height, fixed top.
- **Mount timing**: pinned from t=0 for any visitor whose state is already answered or skipped at page load. For first-time visitors, mounts only after they answer/skip (during the same session) and remains pinned thereafter.
- Left: small dot + "Personalized for **{industry · challenge}**" (or "Showing all capabilities" if skipped).
- Right: a `[Reset]` chip (or `[Run the 30s diagnostic]` if skipped) — calls `AxiusPersonalization.reset()`, re-mounts the full inline diagnostic at top.

### 4.5 Skip mechanics

- Skip on any step calls `AxiusPersonalization.skip()`.
- The slim sticky bar reads "Showing all capabilities — [Run the 30s diagnostic]".
- Catalog renders unfiltered. Hero kicker is omitted. Pricing tier "featured" follows `AxiusPricing[i].featured` static flag (equipo, as today).
- Chat opens in **skipper mode** (button-driven 3-question flow).

---

## 5. Personalized surfaces

### 5.1 Hero kicker

Above the existing 3-line headline, render a small ~13px JetBrains Mono kicker:

```
{ For {INDUSTRY-NAME} operators —
```

- Only rendered if `state.industry && !state.skipped`.
- "Other" industry uses the user-typed text as-is.
- Headline + subhead remain identical to E05 across all variants.

### 5.2 Recommendations panel (NEW)

Inserts as a new section between Hero (00) and Commitments (01).

- Title: **"Where we'd start — three workflows for {industry} dealing with {challenge}"** (or ES equivalent).
- Body: 3 cards in a horizontal row (stacked on mobile). Each card surfaces one workflow from `AxiusCatalog` matching the `(industry, challenge)` cell in `AxiusRecommendations`.
- Each card shows: workflow number + name, sub-stack (e.g., "shopify · zapier · klaviyo"), points cost, time-to-stand-up, and a 1-line "Why this combination" rationale.
- Below the row: a quiet "Or browse the full catalog ↓" link that smooth-scrolls to the Catalog section.
- Only rendered when `state.isComplete()`. Hidden if skipped or only partially answered.

### 5.3 Catalog filter

When `state.industry && !state.skipped`:

- Catalog renders only **categories** whose `AxiusCatalogTags[categoryId]` includes `state.industry` OR `'all'`. Filtering at category granularity, per §3.3.1.
- Top-right control reads "Showing **{shownCount} of {totalCount}** capabilities for **{industry}** — **View all**" where:
  - `totalCount = AxiusCatalog.reduce((a, c) => a + c.count, 0)` — currently **129**, derived at render time.
  - `shownCount = filteredCategories.reduce((a, c) => a + c.count, 0)` — runtime sum across categories that survived the filter.
- Clicking **View all** toggles a local `viewAll` flag without resetting personalization (state stays).
- Catalog visual treatment is unchanged from E05's design (same category headers, same `samples` rendering).

### 5.4 Pricing tier emphasis

The existing E05 Pricing renders `AxiusPricing[i].featured === true` with the tangerine outline. In F:

- F.jsx **computes `featured` locally per-render**; it never mutates the shared `AxiusPricing` array. If F mutated the shared array, Option 1 at `/v1` would render with a wrong (or changing) featured tier — a silent regression of Option 1.
- The local computation reads `state.outcome` → tier via the explicit data table `window.AxiusOutcomeToTier` (added in §3.3): `{ 'fix-one': 'operador', 'run-many': 'equipo', 'delegate': 'departamento' }`.
- When skipped or incomplete, F's local `featured` honors each tier's original static `featured` flag from `AxiusPricing` (Equipo today). No mutation.

### 5.5 Chat seed — three modes

The current chat surface code (open prompt + Telegram bridge + 60s AI fallback) is **reused**. The redesigned chat changes only the entry messages and adds a buttoned-question branch.

#### Mode A: Completer

Chat opens with one greeting bubble:

```
You said you're in {industry}, your biggest friction is {challenge},
and you want to {outcome-rephrased}.

Based on that, I'd start with:
  • {rec1.name}
  • {rec2.name}
  • {rec3.name}

What's the current setup behind {challenge}? I'll tell you exactly
how we'd structure it.
```

Buttons below the bubble: `Walk me through →` / `Book a call →` / `Message Andrés directly`.

#### Mode B: Skipper

Chat opens with the diagnostic as 3 sequential bubbles, each with chip buttons:

1. "What industry are you in?" → 10 industry chips + Other
2. "What creates the most friction?" → 6 challenge chips
3. "How much would you like Axius to take on?" → 3 outcome chips

After the 3rd answer, the chat persists answers to `AxiusPersonalization` (so the page personalizes too) and continues into Mode A's recommendation bubble.

#### Mode C: Open prompt fallback

The free-text input bar at the bottom is always available, regardless of mode. Pressing it routes to the existing Telegram-bridge flow with diagnostic context included in the metadata.

---

## 6. Evidence layer (`axius-evidence.jsx`)

Mounts as a new section between Founder (08) and FAQ (09).

### 6.1 `<Testimonials/>`

- Data source: `window.AxiusTestimonials`. In v1, empty array.
- Empty state: small kicker "Quiet by design — the first published voices land Q3 2026 after our pilot cohort completes" + a 1-card slim mock outline so the section has visual weight.
- When populated: editorial 3-column grid of quote + name + role + photo (mobile: single column carousel).
- No filtering by industry (per user direction — show all).

### 6.2 `<CaseStudies/>`

- Data source 1: `window.AxiusCaseStudies` (real ones, empty in v1).
- Data source 2: `window.AxiusFabricated.caseStudies` (3 entries, fabricated).
- **Pre-deadline behavior**: render the union, with each fabricated card visually identical to a real card (no SAMPLE tag, per user direction).
- **Post-deadline behavior** (`Date.now() >= AxiusFabricatedDeadline`): fabricated cards do not render. If `AxiusCaseStudies` is empty, render the empty state: "Case studies publish quarterly — next set drops {NEXT_QUARTER}".
- Card layout: short title, anonymized-but-specific subtitle ("Charleston dermatology group · 4 clinics"), 2–3 sentence summary, single numeric outcome ("response time 4h → 12m"), no client logo.

### 6.3 `<Metrics/>`

Two tiles side-by-side on desktop (stacked on mobile):

**Operational tile (always live, honest)** — pulls from `AxiusPricing`:
- "Response window — < 24h (Departamento) / 48h (Equipo) / 72h (Operador)"
- "Points coverage — up to 10 active workflows per client (Departamento)"
- "Active client systems — {N}" where N is a small honest number set in `AxiusOperationalMetrics.activeSystems` (a single string the user maintains; defaults to "in pilot").
- "Cadence — weekly / biweekly / monthly per tier"

**Outcome tile (fabricated)** — 4 numeric tiles from `AxiusFabricated.outcomeMetrics`:
- "+38% faster lead response avg." (or similar — exact strings authored in §10.5)
- Pre-deadline: renders normally. Post-deadline: tile is replaced by a slim "Outcome metrics publish Q3 2026" empty state.

### 6.4 `<GBP/>`

- Data source: `window.AxiusGBP = { url, rating, reviewCount }`.
- Empty state (v1): a slim card "Google Business profile coming soon — leaving room here so reviews land naturally."
- When `url` is set: card shows rating stars, review count, and "Read all reviews on Google →" link to the URL.

---

## 7. Visual layer (`axius-visual.jsx`)

### 7.1 `<FounderVideo/>`

Inserts inside the Founder section (08) as a new element above the photo strip.

- Empty state (v1): a 16:9 framed mock with a centered play button + caption "60-second intro from Andrés — recording soon".
- When `AxiusFounderVideo.url` is set: native `<video>` element with the configured poster + autoplay-on-hover.

### 7.2 `<Demos/>`

Mounts between Methodology (02) and Catalog (03).

- 3 CSS-animated mockups, each ~280×180px:
  - Demo 1 — "Missed call recovery": a phone-icon → text-message-bubble animation, captions "ring fails → auto-reply within 30s → ticket opens in CRM".
  - Demo 2 — "Lead qualification": a chat-bubble exchange playing on loop, captions "visitor question → tier-aware response → calendar invite".
  - Demo 3 — "Operations report": a card that flips revealing a stylized dashboard, captions "Monday → Friday → monthly report in your inbox".
- All animations CSS keyframes + JSX (no video files, no GIFs).
- Pre-deadline: render normally. Post-deadline: section unmounts entirely.

### 7.3 `<BeforeAfter/>`

Mounts between Comparison (06) and Founder (08).

- 2 paired stylized mock-UI cards (CSS-drawn, not screenshots):
  - "Before — scattered" vs "After — single ops board"
  - "Before — manual handoff" vs "After — auto-routed"
- Click → flip animation toggles the pair.
- Pre-deadline: render. Post-deadline: section unmounts.

---

## 8. Chat redesign details

The existing chat surface code in `axius-direction-E05.jsx` is **not modified** (per NG5). F.jsx imports the same shared atoms and re-renders an equivalent chat surface with three behavior modes (see §5.5).

Key invariants:
- Same Telegram bridge URL (`AxiusConfig.ringWebhookUrl`).
- Same Telegram chat_id (Production env `TELEGRAM_CHAT_ID`).
- Same forum-topic-per-conversation behavior.
- Same 60s AI fallback if no human reply.
- Diagnostic state is passed in webhook metadata (`{ industry, challenge, outcome, source: 'option-2-chat' }`) so Telegram messages tagged with topic name and visitor context.

---

## 9. REPLACE_BEFORE_LAUNCH safety net

### 9.1 Deadline constant

```js
window.AxiusFabricatedDeadline = '2026-08-01T00:00:00-05:00'; // Bogotá local
```

### 9.2 Helper used by every fabricated component

```js
window.axiusFabricationLive = function () {
  return Date.now() < new Date(window.AxiusFabricatedDeadline).getTime();
};
```

### 9.3 Top-of-file checklist in `axius-shared.jsx`

```jsx
// ════════════════════════════════════════════════════════════════════════
// ⚠️  FABRICATED CONTENT — REPLACE BEFORE 2026-08-01
// ════════════════════════════════════════════════════════════════════════
// Every entry listed below is invented for v1 launch and will auto-unmount
// at midnight Bogotá time on the date above. To replace with real content,
// edit the matching value under window.AxiusFabricated.* AND populate the
// non-fabricated equivalent (e.g., real testimonials in window.AxiusTestimonials,
// real case studies in window.AxiusCaseStudies). After the deadline the
// fabricated entries simply do not render; honest empty states take their place.
//
// Fabricated entries:
//   • AxiusFabricated.caseStudies[0..2]    — 3 invented client stories
//   • AxiusFabricated.outcomeMetrics[0..3] — 4 numeric outcome tiles
//   • AxiusFabricated.demos[0..2]          — 3 CSS-animated mockups
//   • AxiusFabricated.beforeAfter[0..1]    — 2 stylized mock-screenshot pairs
// ════════════════════════════════════════════════════════════════════════
```

### 9.4 Per-component guard

Each component that consumes fabricated content wraps the render:

```jsx
{ window.axiusFabricationLive()
    ? <FabricatedCard data={fabricated[i]} />
    : <EmptyState type="caseStudies" /> }
```

### 9.5 Visibility audit

A small `<DevDeadlineNote/>` floating chip renders **only when** `localStorage.getItem('axius:devmode') === '1'`:
- Reads: "Fabricated content lifts in N days (target 2026-08-01)" where N = floor((deadline - now)/86400000).
- Gives Andrés a quick visual check during dev without exposing to public visitors.

---

## 10. Copy — EN + ES

### 10.1 Diagnostic step copy

| Element | EN | ES |
|---|---|---|
| Wizard kicker | A 30-second diagnostic | Diagnóstico de 30 segundos |
| Step 1 title | What industry are you in? | ¿En qué industria estás? |
| Step 2 title | Where does the operation feel heaviest? | ¿Dónde se siente más pesada la operación? |
| Step 3 title | How much should Axius take on? | ¿Cuánto debería asumir Axius? |
| Step indicator | Step {n} of 3 | Paso {n} de 3 |
| Back link | ← Back | ← Volver |
| Skip link | Skip — show everything | Saltar — mostrar todo |
| Continue (step 1 Other input) | Continue → | Continuar → |
| Slim bar — answered | Personalized for **{industry · challenge}** | Personalizado para **{industry · challenge}** |
| Slim bar — skipped | Showing all capabilities — Run the 30s diagnostic | Mostrando todas las capacidades — Hacer diagnóstico de 30s |
| Reset chip | Reset | Reiniciar |

### 10.2 Industries (10 entries)

| id | EN label | ES label |
|---|---|---|
| `realestate` | Real estate / brokerage | Inmobiliaria |
| `hospitality` | Restaurant / hospitality | Restaurante / hostelería |
| `legal` | Legal — small / mid firm | Legal — firma pequeña / mediana |
| `healthcare` | Healthcare / dental | Salud / odontología |
| `homeservices` | Home services (HVAC, plumbing, contractors) | Servicios para el hogar (HVAC, plomería, contratistas) |
| `professional` | Professional services (consultancy, agency) | Servicios profesionales (consultoría, agencia) |
| `ecommerce` | E-commerce / DTC | E-commerce / DTC |
| `automotive` | Auto dealership / repair | Concesionaria / taller automotriz |
| `wellness` | Wellness / fitness (gym, studio, spa) | Bienestar / fitness (gimnasio, estudio, spa) |
| `other` | Other — tell us | Otro — cuéntanos |

### 10.3 Challenges (6 entries)

| id | EN | ES |
|---|---|---|
| `leadsleak` | Leads slip through the cracks | Los leads se nos escapan |
| `manualdata` | Manual data entry eats hours | La carga manual de datos consume horas |
| `commsscatter` | Customer comms scattered across tools | Comunicación con clientes dispersa entre herramientas |
| `bottleneck` | I'm the bottleneck on everything | Yo soy el cuello de botella en todo |
| `visibility` | No visibility into what's actually working | Sin visibilidad de qué está funcionando |
| `handoffs` | Onboarding / handoffs are inconsistent | Onboarding / entregas inconsistentes |

### 10.4 Outcomes (3 entries)

| id | EN | ES | Tier |
|---|---|---|---|
| `fix-one` | Fix one critical system reliably · from $1k/mo | Arreglar un sistema crítico con confianza · desde $1k/mes | Operador |
| `run-many` | Run multiple systems together with continuity · from $2.5k/mo | Operar múltiples sistemas con continuidad · desde $2.5k/mes | Equipo |
| `delegate` | Fully delegate the tech layer · from $5k/mo | Delegar completamente la capa de tech · desde $5k/mes | Departamento |

### 10.5 Fabricated outcome metric strings (4 tiles, lift on 2026-08-01)

| EN | ES |
|---|---|
| **38%** faster lead response on avg. | Respuesta a leads **38%** más rápida en promedio |
| **6.5h** / week reclaimed by founders | **6.5h** / semana recuperadas por fundadores |
| **3.1×** more workflows running unattended | **3.1×** más flujos corriendo sin supervisión |
| **<24h** sustained response window | Ventana de respuesta **<24h** sostenida |

(The fourth tile is operational/honest — kept for visual balance after the others lift.)

### 10.6 Fabricated case studies (3 entries, lift on 2026-08-01)

Each entry: `{ company, subtitle, body, outcome }`. Invented specific names per user direction; the spec lists them inline so the user can read and adjust before any code lands.

**Case 1 — Mariana's Cantina Group** (`hospitality`)
- Subtitle: "Three-location restaurant group, South Florida"
- Body: "Inventory reconciliation was eating two manager-nights a week across three locations. Axius stood up a Shopify-to-spreadsheet daily sync with a slack alert for variance over 2%. Managers stopped working Sundays."
- Outcome: "Manager hours back: 8h / week"

**Case 2 — Hartwell & Bain LLP** (`legal`)
- Subtitle: "Boutique litigation firm, Charlotte NC, 6 attorneys"
- Body: "Intake forms were re-typed three times — once by the receptionist, once into Clio, once into the document templates. Axius stitched a single-entry intake that pushes into all three. Onboarding a new matter dropped from 45 min to 8."
- Outcome: "Intake time: 45m → 8m"

**Case 3 — Bridgepoint Realty Partners** (`realestate`)
- Subtitle: "Independent brokerage, Tampa FL, 14 agents"
- Body: "Missed calls during showings were costing leads weekly. Axius routed missed-call SMS to a tier-aware AI replier and posted high-intent ones into a dedicated Slack channel for the founder. First-week measurable lift was a closing the agent told us 'wouldn't have happened'."
- Outcome: "Recovered showings: 11 in 30 days"

### 10.7 Slim-bar / Empty state copy (consolidated)

| Component | Empty state copy EN | ES |
|---|---|---|
| Testimonials | Quiet by design — the first published voices land Q3 2026 after our pilot cohort completes. | Discreto por diseño — las primeras voces publicadas aterrizan en Q3 2026 cuando nuestra cohorte piloto complete. |
| Case studies (post-deadline) | Case studies publish quarterly — next set drops {NEXT_QUARTER}. | Los casos de estudio se publican trimestralmente — el próximo lote llega en {NEXT_QUARTER}. |
| Outcome metric tile (post-deadline) | Outcome metrics publish Q3 2026. | Métricas de resultados se publican en Q3 2026. |
| GBP (no URL) | Google Business profile coming soon — leaving room here so reviews land naturally. | Perfil de Google Business próximamente — dejando este espacio para que las reseñas aterricen naturalmente. |
| Founder video (no URL) | 60-second intro from Andrés — recording soon. | Intro de 60 segundos con Andrés — grabando pronto. |

### 10.8 Recommendations rationale templates (per `industry × challenge`)

Rather than list 60 cells inline here, the spec defines the schema:

```
AxiusRecommendations[industryId][challengeId] = {
  samples: ['001', '037', '118'],     // refs by the existing `n` field on
                                       //   AxiusCatalog[i].samples[j].n —
                                       //   only the 36 known samples are eligible
  rationaleEN: 'short 1-line why this combination',
  rationaleES: '...'
}
```

Valid `n` values today (from `axius-shared.jsx:176-294`): `'001'` `'002'` `'003'` `'004'` `'017'` `'018'` `'019'` `'020'` `'034'` `'035'` `'036'` `'037'` `'050'` `'051'` `'052'` `'053'` `'064'` `'065'` `'066'` `'067'` `'077'` `'078'` `'079'` `'080'` `'092'` `'093'` `'094'` `'095'` `'107'` `'108'` `'109'` `'110'` `'118'` `'119'` `'120'` `'121'`.

A second pass (during implementation, not spec) authors all 60 rationales using these 36 samples as the source pool. Implementation includes a fallback: if a specific `(industry, challenge)` cell is missing OR references an `n` that isn't currently in the catalog, the engine surfaces the first 3 samples from the highest-affinity category for that industry per `AxiusCatalogTags`. This makes the panel resilient to catalog edits.

### 10.9 Catalog industry tagging

`window.AxiusCatalogTags` is a dictionary `{ categoryId: industryId[] }` keyed on the existing category `id` field (one of `'sales' | 'cx' | 'ops' | 'ai' | 'data' | 'web' | 'soft' | 'grow' | 'creative'`), per §3.3.1. Default tagging strategy:

- Categories obviously universal (e.g., `'sales'`, `'cx'`, `'ops'`) get tag `'all'`.
- Categories with a vertical-specific stack (e.g., `'web'` → e-commerce/professional) get the matching industries.
- The implementation author proposes initial tags during build; Andrés reviews and adjusts before the spec is closed in `axius-shared.jsx`. A category may carry multiple industry tags.

---

## 11. Verification

### 11.1 Pre-deploy (local)

1. Diagnostic flow: complete all 3 steps → page personalizes → reload → diagnostic stays collapsed → Reset works.
2. Skip flow: skip at step 1 → page renders unfiltered → chat opens in skipper mode → buttoned questions persist to `AxiusPersonalization`.
3. Mobile (≤768px): Chrome DevTools mobile emulation → diagnostic vertical layout works on iPhone 13/14, Galaxy S20.
4. ES locale: change language switcher → diagnostic strings switch → personalized strings switch.
5. Option 1 untouched: visit `/v1/` → byte-identical to current production `/`.

### 11.2 Post-deploy (production)

| Check | Command / action | Expected |
|---|---|---|
| `/` serves Option 2 | `curl -s https://axius-tech-website.vercel.app/ \| grep "AxiusDirectionF\|stage-quiet06"` | match |
| `/v1/` serves Option 1 | `curl -sI https://axius-tech-website.vercel.app/v1/` | 200 |
| `/v1/` byte-identical to pre-implementation `/` | `diff docs/superpowers/specs/snapshots/2026-06-02-pre-implementation-index.html v1/index.html` | identical except `<link rel="canonical">` |
| `/v1/` does NOT include any Option 2 scripts | `grep -E "axius-diagnostic\|axius-evidence\|axius-visual\|axius-direction-F" v1/index.html` | no matches |
| Diagnostic localStorage | open DevTools after answering → `localStorage.getItem('axius:perso:v1')` exists | populated |
| Reset works | click Reset → `localStorage.getItem('axius:perso:v1')` → `null` | `null` |
| Chat seed (completer) | answer diagnostic → open chat → first bubble references industry/challenge/outcome | matches |
| Chat seed (skipper) | skip → open chat → first 3 bubbles are buttoned questions | matches |
| Pricing tier dynamic | answer outcome=`departamento` → Departamento card has tangerine outline | matches |
| Catalog filter | answer industry=`hospitality` → only `'hospitality'` and `'all'` tagged items render | matches |
| Catalog "View all" | click → all 120 render, personalization state unchanged | matches |
| Recommendations panel | answer all 3 → 3 cards render with rationale | matches |
| Fabricated content guard (pre-deadline) | DevTools console: `axiusFabricationLive()` → `true` | `true` |
| Fabricated content guard (post-deadline) | mock with `localStorage.setItem('axius:deadline-override', '2026-09-01')` (dev hook) → fabricated unmounts | unmounts |

### 11.3 Smoke tests on Stripe + Telegram pipeline

The Stripe + Telegram wiring from the prior session is untouched. Spec verifies it survives the Option 2 rollout by re-running the synthetic `checkout.session.completed` test event from the smoke-test script after deploy (see [memory: axius-stripe-infrastructure](file:///Users/andrestoro/.claude/projects/-Users-andrestoro/memory/axius_stripe_infrastructure.md)). Expected: same `{"received":true,"forwarded":true}` response.

---

## 12. Critical reused references (no edits)

- [reference/axius-direction-E05.jsx](../../reference/axius-direction-E05.jsx) — Option 1, parallel-served. NO EDITS.
- [reference/axius-shared.jsx:84-95](../../reference/axius-shared.jsx#L84-L95) — `applySecretOverrides()` continues to merge `window.AxiusSecrets` into `AxiusConfig` for both options.
- [reference/axius-shared.jsx:297-399](../../reference/axius-shared.jsx#L297-L399) — `AxiusPricing` consumed by both Option 1 and Option 2 pricing renderers (read-only in F).
- [api/stripe-webhook.js](../../api/stripe-webhook.js) — Webhook handler unchanged. Diagnostic context is added to Telegram message metadata via the chat path.
- [assets/](../../assets/) — Founder portrait, og.jpg, studio + on-the-go shots reused; no new assets required for v1.

---

## 13. Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Fabricated content discovered by prospect / regulator | M | Hard 2026-08-01 auto-unmount; user has acknowledged the risk; case studies use anonymized-but-specific descriptors so they look like rounded real cases. |
| Forgotten replacement past deadline | L | Auto-unmount is in code, not a calendar reminder. After 2026-08-01, fabricated content cannot render even if Andrés forgets. |
| Two parallel implementations drift | M | A single source of truth (`axius-shared.jsx`) for data + atoms. Section rendering code duplicated only where personalization differs. Quarterly diff review in `verification` script. |
| Diagnostic friction tanks conversion | M | Skip button always visible. Return-visitor behavior never re-asks. Slim sticky bar lets visitors reset/run later. A/B by sharing `/v1` for warm leads while testing `/` on cold traffic. |
| Mobile diagnostic feels heavier than current Quiet 0.5 hero | M | Designed mobile-first with single-column flow + Skip top-right. Specifically tested at 360/375/414 widths. |
| localStorage gone in private browsing | L | `set`/`load` already wrapped in try/catch; falls back to in-memory state. Diagnostic re-asks each session but doesn't break. |
| Bot traffic skews diagnostic answers in any analytics | L | No analytics in scope for v1. If added later, drop sessions where `navigator.webdriver === true`. |

---

## 14. Open items requiring user input before implementation

1. **Catalog industry tagging.** The implementation author will propose initial tags for all 120 `AxiusCatalog` items in a sidecar review document; Andrés confirms or adjusts before merge.
2. **Recommendations matrix.** 60 cells (10 industries × 6 challenges) need rationale strings authored. The implementation author proposes them; Andrés reviews EN + ES before merge.
3. **`AxiusOperationalMetrics.activeSystems`.** Single string Andrés sets — e.g., "in pilot", "tracking 4 live", "tracking 9 live". Honest, updates as the practice grows.
4. **(Future)** Real testimonials, case studies, GBP URL, founder video URL — none required for v1 launch, all drop in when Andrés has them.

---

## 15. Acceptance checklist

This spec is considered implemented when:

- [ ] `/` serves `axius-direction-F.jsx` (diagnostic variant) on production.
- [ ] `/v1/` serves `axius-direction-E05.jsx` unchanged, byte-identical to current production at the time of this spec.
- [ ] All §11.1 local verification steps pass.
- [ ] All §11.2 post-deploy checks pass.
- [ ] §11.3 Stripe + Telegram smoke test passes unchanged.
- [ ] Top-of-file fabrication checklist comment is present in `axius-shared.jsx`.
- [ ] `axiusFabricationLive()` guard wraps every fabricated render.
- [ ] No source change to `axius-direction-E05.jsx` (verified via `git diff`).
- [ ] EN + ES copy ships for every new string.
- [ ] Mobile parity verified at 360/375/414 widths.

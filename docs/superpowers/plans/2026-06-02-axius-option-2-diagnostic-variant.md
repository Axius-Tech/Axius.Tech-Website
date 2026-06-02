# Axius Option 2 — Diagnostic-First Variant — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a parallel diagnostic-first landing variant at `/` (Industry → Challenge → Outcome → personalized page + evidence + visual + redesigned chat) while preserving the current Quiet 0.5 site byte-identically at `/v1`.

**Architecture:** Two HTML entry points share `reference/` and `assets/`. `index.html` mounts the new `axius-direction-F.jsx`; `v1/index.html` is a frozen clone of pre-implementation `index.html` that mounts the untouched `axius-direction-E05.jsx`. State lives on `window.AxiusPersonalization` (pub-sub, localStorage 30-day TTL). New shared data is additive. Fabricated content is date-bound (auto-unmount 2026-08-01).

**Tech Stack:** Static HTML + JSX compiled by `@babel/standalone` in the browser. No build step. React 18 via CDN. Vercel serverless functions in `api/`. Playwright for e2e tests (already in `node_modules`, exposed via a new minimal `package.json`).

**Color/typography convention:** `window.AxiusTokens` (defined in [reference/axius-shared.jsx:96-121](../../reference/axius-shared.jsx#L96-L121)) is **dark-mode oriented** (e.g. `bg: '#0F0E0C'`, `ink: '#F5F1EA'`). The Quiet 0.5 user-facing surfaces — including this entire Option 2 variant — render on a **light cream canvas**. Throughout this plan, use these literals instead of `T.*` references:
- Canvas: `'#F7F6F2'`
- Display serif: `"'Source Serif 4', serif"`
- Dim ink on light: `'rgba(10,9,7,0.55)'`
- Primary ink on light: `'#0F0E0C'`
- Hairline borders on light: `'1px solid rgba(10,9,7,0.16)'` (or `0.08` for softer)
- Tangerine accent (matches `T.copper`): `'#B8743C'`
Do NOT reference `T.canvas`, `T.serif`, or `T.dim` — those names do not exist on the tokens object.

**Spec:** [docs/superpowers/specs/2026-06-02-axius-option-2-diagnostic-variant-design.md](../specs/2026-06-02-axius-option-2-diagnostic-variant-design.md)

**Replace-before-launch deadline:** `2026-08-01T00:00:00-05:00` (Bogotá local). Fabricated content auto-unmounts after this.

---

## Phase 0 — Preflight

### Task 0.1: Snapshot pre-implementation `index.html`

**Files:**
- Create: `docs/superpowers/specs/snapshots/2026-06-02-pre-implementation-index.html`

- [ ] **Step 1: Copy current index.html into the snapshots dir**

```bash
cp index.html docs/superpowers/specs/snapshots/2026-06-02-pre-implementation-index.html
```

- [ ] **Step 2: Sanity-check it matches the live deployed copy**

```bash
diff <(curl -s https://axius-tech-website.vercel.app/) docs/superpowers/specs/snapshots/2026-06-02-pre-implementation-index.html
```
Expected: no differences (or only whitespace/HTTP-injected differences). If diffs are substantive, stop and resolve before proceeding — the snapshot must represent the actual production Option 1 surface.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/snapshots/2026-06-02-pre-implementation-index.html
git commit -m "Snapshot pre-implementation index.html for /v1 byte-identical reference"
```

### Task 0.2: Wire Playwright via a minimal `package.json`

**Files:**
- Create: `package.json`
- Create: `playwright.config.ts`
- Test: existing `e2e/` directory

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "axius-tech-website",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "python3 -m http.server 4321",
    "e2e": "playwright test",
    "e2e:headed": "playwright test --headed",
    "e2e:ui": "playwright test --ui"
  },
  "devDependencies": {
    "@playwright/test": "^1.60.0"
  }
}
```

- [ ] **Step 2: Write `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: process.env.AXIUS_BASE_URL ?? 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
  },
  webServer: process.env.AXIUS_BASE_URL ? undefined : {
    command: 'python3 -m http.server 4321',
    port: 4321,
    reuseExistingServer: true,
    timeout: 15_000,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-iphone',    use: { ...devices['iPhone 13'] } },
  ],
});
```

- [ ] **Step 3: Verify the runner starts**

```bash
node_modules/.bin/playwright test --list
```
Expected: prints "0 tests in 0 files" without errors. If it errors on missing browsers, run `node_modules/.bin/playwright install chromium` and re-run.

- [ ] **Step 4: Commit**

```bash
git add package.json playwright.config.ts
git commit -m "Wire Playwright runner via minimal package.json"
```

### Task 0.3: Baseline e2e test — Option 1 today still works

**Files:**
- Create: `e2e/option-1-baseline.spec.ts`

- [ ] **Step 1: Write the test**

```ts
import { test, expect } from '@playwright/test';

test.describe('Option 1 baseline (current site at /)', () => {
  test('hero renders the Quiet 0.5 tagline', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Run')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=your business.')).toBeVisible();
    await expect(page.locator('text=Not your tech.')).toBeVisible();
  });

  test('founder section shows the three figures', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Fig. 01')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=Fig. 02')).toBeVisible();
    await expect(page.locator('text=Fig. 03')).toBeVisible();
  });
});
```

- [ ] **Step 2: Run it and confirm green**

```bash
node_modules/.bin/playwright test e2e/option-1-baseline.spec.ts --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add e2e/option-1-baseline.spec.ts
git commit -m "Baseline e2e: Option 1 at / renders Quiet 0.5 surfaces"
```

---

## Phase 1 — Preserve Option 1 at `/v1`

This phase ships Option 1 at `/v1` BEFORE any cutover work. After this phase, the site still serves Option 1 at `/` (unchanged) AND a working copy at `/v1`.

### Task 1.1: Clone snapshot into `v1/index.html`

**Files:**
- Create: `v1/index.html`

- [ ] **Step 1: Copy the snapshot into place**

```bash
mkdir -p v1
cp docs/superpowers/specs/snapshots/2026-06-02-pre-implementation-index.html v1/index.html
```

- [ ] **Step 2: Update the `<link rel="canonical">` to `/v1/`**

Find the line `<link rel="canonical" href="https://axius-tech-website.vercel.app/">` and change it to `<link rel="canonical" href="https://axius-tech-website.vercel.app/v1/">`. Use Edit tool against `v1/index.html`.

- [ ] **Step 3: Verify it loads locally**

```bash
node_modules/.bin/playwright test e2e/option-1-baseline.spec.ts --project=desktop-chromium
```
This still tests `/`. Now also fetch `/v1/`:

```bash
python3 -m http.server 4321 &
SERVER=$!
sleep 1
curl -sI http://127.0.0.1:4321/v1/index.html | head -2
kill $SERVER
```
Expected: `HTTP/1.0 200 OK`.

- [ ] **Step 4: Verify script tags identical**

```bash
diff \
  <(grep -E 'script.*src=|stage-quiet|AxiusDirection' docs/superpowers/specs/snapshots/2026-06-02-pre-implementation-index.html) \
  <(grep -E 'script.*src=|stage-quiet|AxiusDirection' v1/index.html)
```
Expected: no diff. Same scripts, same mount point.

- [ ] **Step 5: Commit**

```bash
git add v1/index.html
git commit -m "Add /v1 entry point serving Option 1 unchanged"
```

### Task 1.2: e2e test — `/v1` serves Option 1 identically

**Files:**
- Create: `e2e/option-1-at-v1.spec.ts`

- [ ] **Step 1: Write the test**

```ts
import { test, expect } from '@playwright/test';

test.describe('Option 1 at /v1', () => {
  test('renders the Quiet 0.5 tagline', async ({ page }) => {
    await page.goto('/v1/');
    await expect(page.locator('text=Run')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=your business.')).toBeVisible();
    await expect(page.locator('text=Not your tech.')).toBeVisible();
  });

  test('loads NO Option 2 scripts', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', r => requests.push(r.url()));
    await page.goto('/v1/');
    await page.waitForLoadState('networkidle');
    const banned = [
      'axius-diagnostic.jsx',
      'axius-evidence.jsx',
      'axius-visual.jsx',
      'axius-direction-F.jsx',
    ];
    for (const b of banned) {
      expect(requests.find(u => u.includes(b)), `must not load ${b}`).toBeUndefined();
    }
  });
});
```

- [ ] **Step 2: Run**

```bash
node_modules/.bin/playwright test e2e/option-1-at-v1.spec.ts --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add e2e/option-1-at-v1.spec.ts
git commit -m "e2e: /v1 renders Option 1 unchanged and loads no Option 2 scripts"
```

---

## Phase 2 — Additive shared data + `AxiusPersonalization` runtime

All additions go at the **end** of `reference/axius-shared.jsx`, after the existing atoms. Nothing above is touched. Spec §3.3.

### Task 2.1: Add `AxiusFabricated` + deadline + fabrication-live helper

**Files:**
- Modify: `reference/axius-shared.jsx` (append only)

- [ ] **Step 1: Append the deadline constant + helper**

At the very end of `axius-shared.jsx`, add:

```jsx
// ════════════════════════════════════════════════════════════════════════
// ⚠️  FABRICATED CONTENT — REPLACE BEFORE 2026-08-01
// ════════════════════════════════════════════════════════════════════════
// Every entry under window.AxiusFabricated.* is invented for v1 launch and
// will auto-unmount at midnight Bogotá time on the date above. To replace
// with real content, edit the matching value under window.AxiusFabricated.*
// AND populate the non-fabricated equivalent (e.g., real testimonials in
// window.AxiusTestimonials, real case studies in window.AxiusCaseStudies).
// After the deadline the fabricated entries simply do not render; honest
// empty states take their place.
//
// Fabricated entries:
//   • AxiusFabricated.caseStudies[0..2]    — 3 invented client stories
//   • AxiusFabricated.outcomeMetrics[0..3] — 4 numeric outcome tiles
//   • AxiusFabricated.demos[0..2]          — 3 CSS-animated mockups
//   • AxiusFabricated.beforeAfter[0..1]    — 2 stylized mock-screenshot pairs
// ════════════════════════════════════════════════════════════════════════

window.AxiusFabricatedDeadline = '2026-08-01T00:00:00-05:00';

window.axiusFabricationLive = function () {
  if (typeof localStorage !== 'undefined' &&
      localStorage.getItem('axius:devmode') === '1') {
    const override = localStorage.getItem('axius:deadline-override');
    if (override) return Date.now() < new Date(override).getTime();
  }
  return Date.now() < new Date(window.AxiusFabricatedDeadline).getTime();
};
```

- [ ] **Step 2: Smoke test the helper from Node**

```bash
node -e "
global.window = {};
global.localStorage = undefined;
require('fs').readFileSync('reference/axius-shared.jsx', 'utf8'); // sanity: file is readable
// We can't eval the full file (it's JSX) but we can confirm the helper text is in place
const txt = require('fs').readFileSync('reference/axius-shared.jsx', 'utf8');
if (!txt.includes('axiusFabricationLive')) { console.error('helper missing'); process.exit(1); }
if (!txt.includes('AxiusFabricatedDeadline')) { console.error('deadline missing'); process.exit(1); }
if (!txt.includes('2026-08-01T00:00:00-05:00')) { console.error('deadline value wrong'); process.exit(1); }
console.log('OK');
"
```
Expected: `OK`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-shared.jsx
git commit -m "Add AxiusFabricatedDeadline + axiusFabricationLive() guard with devmode override"
```

### Task 2.2: Add `AxiusFabricated.caseStudies` (3 invented entries)

**Files:**
- Modify: `reference/axius-shared.jsx` (append)

- [ ] **Step 1: Append**

```jsx
window.AxiusFabricated = window.AxiusFabricated || {};
window.AxiusFabricated.caseStudies = [
  {
    id: 'cs-marianas-cantina',
    company: "Mariana's Cantina Group",
    subtitle:   'Three-location restaurant group, South Florida',
    subtitleEs: 'Grupo de restaurantes de tres locaciones, sur de Florida',
    body:   "Inventory reconciliation was eating two manager-nights a week across three locations. Axius stood up a Shopify-to-spreadsheet daily sync with a Slack alert for variance over 2%. Managers stopped working Sundays.",
    bodyEs: "La reconciliación de inventario consumía dos noches de gerencia por semana en tres locaciones. Axius armó un sync diario de Shopify a planilla con alerta de Slack si la varianza superaba 2%. Los gerentes dejaron de trabajar los domingos.",
    outcome:   'Manager hours back: 8h / week',
    outcomeEs: 'Horas de gerencia recuperadas: 8h / semana',
    industry: 'hospitality',
  },
  {
    id: 'cs-hartwell-bain',
    company: 'Hartwell & Bain LLP',
    subtitle:   'Boutique litigation firm, Charlotte NC, 6 attorneys',
    subtitleEs: 'Bufete boutique de litigios, Charlotte NC, 6 abogados',
    body:   "Intake forms were re-typed three times — once by the receptionist, once into Clio, once into the document templates. Axius stitched a single-entry intake that pushes into all three. Onboarding a new matter dropped from 45 min to 8.",
    bodyEs: "Los formularios de intake se retecleaban tres veces — uno la recepcionista, uno en Clio, uno en las plantillas. Axius armó un intake de una sola entrada que empuja a los tres. Abrir un caso pasó de 45 min a 8.",
    outcome:   'Intake time: 45m → 8m',
    outcomeEs: 'Tiempo de intake: 45m → 8m',
    industry: 'legal',
  },
  {
    id: 'cs-bridgepoint',
    company: 'Bridgepoint Realty Partners',
    subtitle:   'Independent brokerage, Tampa FL, 14 agents',
    subtitleEs: 'Inmobiliaria independiente, Tampa FL, 14 agentes',
    body:   "Missed calls during showings were costing leads weekly. Axius routed missed-call SMS to a tier-aware AI replier and posted high-intent ones into a dedicated Slack channel for the founder. First-week measurable lift was a closing the agent told us 'wouldn't have happened'.",
    bodyEs: "Las llamadas perdidas durante visitas costaban leads semanalmente. Axius enrutó el SMS de llamada perdida a un respondedor IA por tier y publicó las de alta intención en un canal de Slack dedicado para el fundador. El primer cierre medible fue uno que el agente dijo 'no habría pasado'.",
    outcome:   'Recovered showings: 11 in 30 days',
    outcomeEs: 'Visitas recuperadas: 11 en 30 días',
    industry: 'realestate',
  },
];
```

- [ ] **Step 2: Sanity check via grep**

```bash
grep -c "Mariana's Cantina\|Hartwell & Bain\|Bridgepoint Realty" reference/axius-shared.jsx
```
Expected: `3`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-shared.jsx
git commit -m "Fabricated case studies: 3 invented entries under AxiusFabricated.caseStudies"
```

### Task 2.3: Add `AxiusFabricated.outcomeMetrics` (4 tiles)

**Files:**
- Modify: `reference/axius-shared.jsx` (append)

- [ ] **Step 1: Append**

```jsx
window.AxiusFabricated.outcomeMetrics = [
  { id: 'om-leadresp',  value: '38%',   label:   'faster lead response on avg.',
                                        labelEs: 'respuesta a leads más rápida en promedio' },
  { id: 'om-hoursback', value: '6.5h',  label:   '/ week reclaimed by founders',
                                        labelEs: '/ semana recuperadas por fundadores' },
  { id: 'om-unattend',  value: '3.1×',  label:   'more workflows running unattended',
                                        labelEs: 'más flujos corriendo sin supervisión' },
  { id: 'om-window',    value: '<24h',  label:   'sustained response window',
                                        labelEs: 'ventana de respuesta sostenida' },
];
```

- [ ] **Step 2: Sanity check**

```bash
grep -c "om-leadresp\|om-hoursback\|om-unattend\|om-window" reference/axius-shared.jsx
```
Expected: `4`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-shared.jsx
git commit -m "Fabricated outcome metrics: 4 tiles under AxiusFabricated.outcomeMetrics"
```

### Task 2.4: Add `AxiusFabricated.demos` and `.beforeAfter` (recipes, not images)

**Files:**
- Modify: `reference/axius-shared.jsx` (append)

- [ ] **Step 1: Append**

```jsx
window.AxiusFabricated.demos = [
  { id: 'demo-missedcall',
    title:   'Missed call recovery',
    titleEs: 'Recuperación de llamadas perdidas',
    captions:   ['ring fails', 'auto-reply within 30s', 'ticket opens in CRM'],
    captionsEs: ['llamada cae', 'auto-respuesta en 30s', 'ticket abre en CRM'] },
  { id: 'demo-leadqual',
    title:   'Lead qualification',
    titleEs: 'Calificación de leads',
    captions:   ['visitor question', 'tier-aware response', 'calendar invite'],
    captionsEs: ['pregunta del visitante', 'respuesta por tier', 'invitación de calendario'] },
  { id: 'demo-opreport',
    title:   'Operations report',
    titleEs: 'Reporte de operaciones',
    captions:   ['Monday → Friday', 'monthly summary', 'in your inbox'],
    captionsEs: ['Lunes → Viernes', 'resumen mensual', 'en tu inbox'] },
];

window.AxiusFabricated.beforeAfter = [
  { id: 'ba-scattered',
    before:   'scattered spreadsheets',
    beforeEs: 'planillas dispersas',
    after:   'single ops board',
    afterEs: 'panel de ops único' },
  { id: 'ba-handoff',
    before:   'manual handoff between tools',
    beforeEs: 'entrega manual entre herramientas',
    after:   'auto-routed with audit trail',
    afterEs: 'enrutado automático con auditoría' },
];
```

- [ ] **Step 2: Sanity**

```bash
grep -c "demo-missedcall\|demo-leadqual\|demo-opreport\|ba-scattered\|ba-handoff" reference/axius-shared.jsx
```
Expected: `5`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-shared.jsx
git commit -m "Fabricated demos + beforeAfter recipes under AxiusFabricated"
```

### Task 2.5: Add `AxiusIndustries`, `AxiusChallenges`, `AxiusOutcomes`, `AxiusOutcomeToTier`

**Files:**
- Modify: `reference/axius-shared.jsx` (append)

- [ ] **Step 1: Append**

```jsx
window.AxiusIndustries = [
  { id: 'realestate',   label: 'Real estate / brokerage',           labelEs: 'Inmobiliaria',
                        kicker:   'For real-estate operators —',    kickerEs: 'Para operadores inmobiliarios —' },
  { id: 'hospitality',  label: 'Restaurant / hospitality',          labelEs: 'Restaurante / hostelería',
                        kicker:   'For hospitality operators —',    kickerEs: 'Para operadores de hostelería —' },
  { id: 'legal',        label: 'Legal — small / mid firm',          labelEs: 'Legal — firma pequeña / mediana',
                        kicker:   'For legal operators —',          kickerEs: 'Para operadores legales —' },
  { id: 'healthcare',   label: 'Healthcare / dental',               labelEs: 'Salud / odontología',
                        kicker:   'For healthcare operators —',     kickerEs: 'Para operadores de salud —' },
  { id: 'homeservices', label: 'Home services (HVAC, plumbing, contractors)',
                        labelEs: 'Servicios para el hogar (HVAC, plomería, contratistas)',
                        kicker:   'For home-services operators —',  kickerEs: 'Para operadores de servicios para el hogar —' },
  { id: 'professional', label: 'Professional services (consultancy, agency)',
                        labelEs: 'Servicios profesionales (consultoría, agencia)',
                        kicker:   'For professional-services operators —', kickerEs: 'Para operadores de servicios profesionales —' },
  { id: 'ecommerce',    label: 'E-commerce / DTC',                  labelEs: 'E-commerce / DTC',
                        kicker:   'For e-commerce operators —',     kickerEs: 'Para operadores de e-commerce —' },
  { id: 'automotive',   label: 'Auto dealership / repair',          labelEs: 'Concesionaria / taller automotriz',
                        kicker:   'For automotive operators —',     kickerEs: 'Para operadores automotrices —' },
  { id: 'wellness',     label: 'Wellness / fitness (gym, studio, spa)',
                        labelEs: 'Bienestar / fitness (gimnasio, estudio, spa)',
                        kicker:   'For wellness operators —',       kickerEs: 'Para operadores de bienestar —' },
  { id: 'other',        label: 'Other — tell us',                   labelEs: 'Otro — cuéntanos',
                        kicker:   'For {free-text} operators —',    kickerEs: 'Para operadores de {free-text} —' },
];

window.AxiusChallenges = [
  { id: 'leadsleak',    label: 'Leads slip through the cracks',                  labelEs: 'Los leads se nos escapan' },
  { id: 'manualdata',   label: 'Manual data entry eats hours',                   labelEs: 'La carga manual de datos consume horas' },
  { id: 'commsscatter', label: 'Customer comms scattered across tools',          labelEs: 'Comunicación con clientes dispersa entre herramientas' },
  { id: 'bottleneck',   label: "I'm the bottleneck on everything",               labelEs: 'Yo soy el cuello de botella en todo' },
  { id: 'visibility',   label: "No visibility into what's actually working",     labelEs: 'Sin visibilidad de qué está funcionando' },
  { id: 'handoffs',     label: 'Onboarding / handoffs are inconsistent',         labelEs: 'Onboarding / entregas inconsistentes' },
];

window.AxiusOutcomes = [
  { id: 'fix-one',  tier: 'operador',
    labelTemplate:   'Fix one critical system reliably · from {price}/mo',
    labelTemplateEs: 'Arreglar un sistema crítico con confianza · desde {price}/mes' },
  { id: 'run-many', tier: 'equipo',
    labelTemplate:   'Run multiple systems together with continuity · from {price}/mo',
    labelTemplateEs: 'Operar múltiples sistemas con continuidad · desde {price}/mes' },
  { id: 'delegate', tier: 'departamento',
    labelTemplate:   'Fully delegate the tech layer · from {price}/mo',
    labelTemplateEs: 'Delegar completamente la capa de tech · desde {price}/mes' },
];

window.AxiusOutcomeToTier = { 'fix-one': 'operador', 'run-many': 'equipo', 'delegate': 'departamento' };
```

- [ ] **Step 2: Sanity-count**

```bash
node -e "
const txt = require('fs').readFileSync('reference/axius-shared.jsx', 'utf8');
const matches = (re) => (txt.match(re) || []).length;
const industries = matches(/window\.AxiusIndustries\b/);
const challenges = matches(/window\.AxiusChallenges\b/);
const outcomes   = matches(/window\.AxiusOutcomes\b/);
const mapping    = matches(/window\.AxiusOutcomeToTier\b/);
if (industries !== 1 || challenges !== 1 || outcomes !== 1 || mapping !== 1) {
  console.error({industries, challenges, outcomes, mapping}); process.exit(1);
}
console.log('OK');
"
```
Expected: `OK`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-shared.jsx
git commit -m "Diagnostic taxonomies: 10 industries, 6 challenges, 3 outcomes, outcome→tier map"
```

### Task 2.6: Add `AxiusCatalogTags` (category-level industry tagging — proposed defaults)

**Files:**
- Modify: `reference/axius-shared.jsx` (append)

- [ ] **Step 1: Append**

```jsx
// Initial category → industries tagging. Maintainers: adjust freely.
// Categories tagged 'all' surface for every industry.
window.AxiusCatalogTags = {
  sales:    ['all'],
  cx:       ['all'],
  ops:      ['all'],
  ai:       ['all'],
  data:     ['all'],
  web:      ['ecommerce', 'professional', 'wellness', 'realestate', 'hospitality'],
  soft:     ['professional', 'legal', 'healthcare', 'homeservices'],
  grow:     ['ecommerce', 'wellness', 'professional', 'hospitality', 'automotive', 'realestate'],
  creative: ['ecommerce', 'wellness', 'hospitality', 'professional'],
};
```

- [ ] **Step 2: Sanity — all 9 category ids present**

```bash
node -e "
const txt = require('fs').readFileSync('reference/axius-shared.jsx', 'utf8');
const cats = ['sales','cx','ops','ai','data','web','soft','grow','creative'];
const m = txt.match(/window\.AxiusCatalogTags\s*=\s*\{[\s\S]*?\};/);
if (!m) { console.error('not found'); process.exit(1); }
for (const c of cats) {
  if (!new RegExp('\\\\b' + c + '\\\\s*:').test(m[0])) {
    console.error('missing tag for', c); process.exit(1);
  }
}
console.log('OK');
"
```
Expected: `OK`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-shared.jsx
git commit -m "AxiusCatalogTags: category-level industry tagging for all 9 categories"
```

### Task 2.7: Add `AxiusRecommendations` (60-cell matrix, with safe fallback)

**Files:**
- Modify: `reference/axius-shared.jsx` (append)

- [ ] **Step 1: Append shape + a few representative cells**

```jsx
// AxiusRecommendations[industryId][challengeId] = { samples: ['001', ...], rationaleEN, rationaleES }
// Implementation note: omitted cells fall back to "first 3 samples from the
// highest-affinity category tagged for the industry" — see F.jsx render code.
window.AxiusRecommendations = {
  realestate: {
    leadsleak:   { samples: ['001','002','017'], rationaleEN: 'Stop bleeding the warm pipeline before scaling acquisition.',
                                                 rationaleES: 'Frenar la fuga del pipeline tibio antes de escalar adquisición.' },
    manualdata:  { samples: ['035','037','107'], rationaleEN: 'Cross-tool sync + SaaS audit get the operational layer clean.',
                                                 rationaleES: 'Sync entre herramientas + auditoría SaaS limpian la capa operativa.' },
    commsscatter:{ samples: ['019','017','107'], rationaleEN: 'Unify inbound channels before adding new ones.',
                                                 rationaleES: 'Unificar canales entrantes antes de sumar nuevos.' },
    bottleneck:  { samples: ['004','003','053'], rationaleEN: 'Voice + DM AI agents take the founder out of the hot loop.',
                                                 rationaleES: 'Agentes IA de voz y DM sacan al fundador del loop caliente.' },
    visibility:  { samples: ['064','052','065'], rationaleEN: 'Operational dashboards + scoring make next-step obvious.',
                                                 rationaleES: 'Dashboards operativos + scoring vuelven obvia la siguiente acción.' },
    handoffs:    { samples: ['018','034','019'], rationaleEN: 'Triage and document automation make every handoff identical.',
                                                 rationaleES: 'Triage y automatización de documentos hacen idéntica cada entrega.' },
  },
  // Additional industry cells filled in Task 10.2 (data fill).
};
```

- [ ] **Step 2: Sanity — at least one industry present**

```bash
grep -c "window.AxiusRecommendations" reference/axius-shared.jsx
```
Expected: ≥ `1`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-shared.jsx
git commit -m "AxiusRecommendations: matrix shape + realestate cells (rest filled in 10.2)"
```

### Task 2.8: Add evidence/visual placeholder shells + operational metrics

**Files:**
- Modify: `reference/axius-shared.jsx` (append)

- [ ] **Step 1: Append**

```jsx
window.AxiusTestimonials      = [];   // populated when real testimonials arrive
window.AxiusCaseStudies       = [];   // real case studies (fabricated ones live under AxiusFabricated.caseStudies)
window.AxiusGBP               = { url: null, rating: null, reviewCount: null };
window.AxiusFounderVideo      = { url: null, poster: null, durationSec: null };

window.AxiusOperationalMetrics = {
  // Honest values, sourced from the practice itself. Andrés maintains.
  activeSystems: 'in pilot',  // e.g. 'tracking 9 live'
  responseWindow: {
    operador:     '72h',
    equipo:       '48h',
    departamento: '< 24h',
  },
  cadence: {
    operador:     'monthly',
    equipo:       'biweekly',
    departamento: 'weekly',
  },
};
```

- [ ] **Step 2: Sanity**

```bash
grep -c "AxiusTestimonials\|AxiusCaseStudies\|AxiusGBP\|AxiusFounderVideo\|AxiusOperationalMetrics" reference/axius-shared.jsx
```
Expected: ≥ `5`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-shared.jsx
git commit -m "Evidence/visual placeholder shells + honest operational metrics"
```

### Task 2.9: Add `AxiusPersonalization` runtime + pub-sub

**Files:**
- Modify: `reference/axius-shared.jsx` (append)

- [ ] **Step 1: Append**

```jsx
window.AxiusPersonalization = (function () {
  const KEY = 'axius:perso:v1';
  const TTL_DAYS = 30;
  const listeners = new Set();

  function defaultState() {
    return { industry: null, challenge: null, outcome: null,
             industryOther: null, skipped: false, completedAt: null, version: 1 };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const ageDays = (Date.now() - parsed.completedAt) / 86400000;
      if (ageDays > TTL_DAYS) return defaultState();
      return parsed;
    } catch (_) { return defaultState(); }
  }
  function persist(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} }
  function notify(state)  { listeners.forEach(fn => { try { fn(state); } catch (_) {} }); }

  let state = load();

  return {
    get: () => ({ ...state }),
    set: (patch) => {
      state = { ...state, ...patch, completedAt: Date.now() };
      persist(state); notify(state);
    },
    skip: () => {
      state = { ...state, skipped: true, completedAt: Date.now() };
      persist(state); notify(state);
    },
    reset: () => {
      try { localStorage.removeItem(KEY); } catch (_) {}
      state = defaultState(); notify(state);
    },
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    hasAnswered: () => Boolean(state.industry || state.skipped),
    isComplete:  () => Boolean(state.industry && state.challenge && state.outcome),
  };
})();
```

- [ ] **Step 2: Sanity — write a Playwright test that asserts the API exists**

Create `e2e/personalization-runtime.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('AxiusPersonalization API is present and functional', async ({ page }) => {
  await page.goto('/v1/');  // loads axius-shared.jsx, which now carries the new globals
  await page.waitForFunction(() => typeof window.AxiusPersonalization?.get === 'function');
  const initial = await page.evaluate(() => window.AxiusPersonalization.get());
  expect(initial.industry).toBeNull();
  expect(initial.skipped).toBe(false);

  await page.evaluate(() => window.AxiusPersonalization.set({ industry: 'hospitality' }));
  const after = await page.evaluate(() => window.AxiusPersonalization.get());
  expect(after.industry).toBe('hospitality');

  await page.evaluate(() => window.AxiusPersonalization.reset());
  const reset = await page.evaluate(() => window.AxiusPersonalization.get());
  expect(reset.industry).toBeNull();
});
```

- [ ] **Step 3: Run**

```bash
node_modules/.bin/playwright test e2e/personalization-runtime.spec.ts --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 4: Confirm Option 1 still works (the new globals are additive, must not regress)**

```bash
node_modules/.bin/playwright test e2e/option-1-baseline.spec.ts e2e/option-1-at-v1.spec.ts --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add reference/axius-shared.jsx e2e/personalization-runtime.spec.ts
git commit -m "AxiusPersonalization runtime: pub-sub state w/ 30-day TTL + e2e test"
```

---

## Phase 3 — Build `axius-diagnostic.jsx` (3-step wizard)

The wizard is a single self-contained JSX file that registers `window.AxiusDiagnostic` (a React component) and `window.AxiusDiagnosticBar` (the slim sticky bar component). Spec §4.

### Task 3.1: Wizard skeleton + Step 1 (Industry)

**Files:**
- Create: `reference/axius-diagnostic.jsx`

- [ ] **Step 1: Create the file with the skeleton**

```jsx
// Axius diagnostic wizard — 3 steps: Industry → Challenge → Outcome.
// Reads/writes window.AxiusPersonalization. Localized via window.AxiusConfig.lang.
window.AxiusDiagnostic = function (props) {
  const T = window.AxiusTokens;
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const tr = (key, fallback) => {
    const tableEN = window.AxiusDiagnosticCopyEN;
    const tableES = window.AxiusDiagnosticCopyES;
    const t = (lang === 'es' ? tableES : tableEN) || {};
    return t[key] || fallback || key;
  };

  const [step, setStep] = React.useState(1);
  const [industry, setIndustry] = React.useState(null);
  const [industryOther, setIndustryOther] = React.useState('');
  const [challenge, setChallenge] = React.useState(null);
  const [outcome, setOutcome] = React.useState(null);

  // Step 1 — Industry chips
  if (step === 1) {
    return React.createElement(
      'section',
      { 'data-axius-diagnostic-step': 1,
        style: { minHeight: '100vh', padding: '64px 32px', background: '#F7F6F2' } },
      React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
        React.createElement(SkipLink, { onSkip: () => window.AxiusPersonalization.skip() }),
        React.createElement('h2', { style: { fontFamily: "'Source Serif 4', serif", fontSize: 44, marginBottom: 12 } }, tr('step1Title')),
        React.createElement('p',  { style: { color: 'rgba(10,9,7,0.55)', marginBottom: 32 } }, tr('kicker')),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 } },
          (window.AxiusIndustries || []).map(i =>
            React.createElement('button', {
              key: i.id, type: 'button',
              onClick: () => {
                if (i.id === 'other') return; // handled by inline input
                setIndustry(i.id); setStep(2);
              },
              style: chipStyle(industry === i.id) },
              lang === 'es' ? i.labelEs : i.label)
          ),
        ),
        // Inline 'Other' input revealed when the Other chip is focused
        React.createElement(OtherInput, {
          value: industryOther,
          onCommit: (val) => { setIndustry('other'); setIndustryOther(val); setStep(2); },
        }),
      ),
    );
  }
  // Steps 2 + 3 added in Tasks 3.2 + 3.3
  return null;
};

// Tiny helpers (kept inside the file to avoid extra script loads)
function chipStyle(active) {
  return {
    appearance: 'none', cursor: 'pointer',
    background: active ? '#0F0E0C' : 'transparent',
    color: active ? '#F7F6F2' : '#0F0E0C',
    border: '1px solid rgba(10,9,7,0.16)',
    padding: '18px 20px', textAlign: 'left',
    fontFamily: 'Inter, system-ui, sans-serif', fontSize: 15,
    lineHeight: 1.25, borderRadius: 0,
  };
}
function SkipLink({ onSkip }) {
  return React.createElement('button', {
    type: 'button', onClick: onSkip,
    style: { position: 'absolute', top: 24, right: 32, background: 'transparent',
             border: 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
             fontSize: 11, letterSpacing: '0.18em', color: 'rgba(10,9,7,0.55)' } },
    'SKIP — SHOW EVERYTHING');
}
function OtherInput({ value, onCommit }) {
  const [v, setV] = React.useState(value || '');
  return React.createElement('div', { style: { marginTop: 24 } },
    React.createElement('input', {
      placeholder: 'Other — type your industry',
      value: v, onChange: (e) => setV(e.target.value),
      onKeyDown: (e) => { if (e.key === 'Enter' && v.trim().length > 1) onCommit(v.trim()); },
      maxLength: 60,
      style: { width: 320, padding: '12px 14px', border: '1px solid rgba(10,9,7,0.16)',
               background: 'transparent', fontFamily: 'Inter', fontSize: 15 } }),
    React.createElement('button', {
      type: 'button', onClick: () => v.trim().length > 1 && onCommit(v.trim()),
      style: { marginLeft: 8, padding: '12px 16px', background: '#0F0E0C',
               color: '#F7F6F2', border: 'none', cursor: 'pointer',
               fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em' } },
      'CONTINUE →'),
  );
}

// Copy tables (separate so they can be edited without touching wizard logic)
window.AxiusDiagnosticCopyEN = {
  kicker:     'A 30-second diagnostic',
  step1Title: 'What industry are you in?',
  step2Title: 'Where does the operation feel heaviest?',
  step3Title: 'How much should Axius take on?',
  back:       '← Back',
  skipLink:   'Skip — show everything',
  continue:   'Continue →',
};
window.AxiusDiagnosticCopyES = {
  kicker:     'Diagnóstico de 30 segundos',
  step1Title: '¿En qué industria estás?',
  step2Title: '¿Dónde se siente más pesada la operación?',
  step3Title: '¿Cuánto debería asumir Axius?',
  back:       '← Volver',
  skipLink:   'Saltar — mostrar todo',
  continue:   'Continuar →',
};
```

- [ ] **Step 2: Sanity-check file parses**

```bash
node_modules/.bin/babel reference/axius-diagnostic.jsx --presets=@babel/preset-react 2>&1 | head -5
```
If `@babel/cli` isn't installed locally, fall back to a sanity grep:
```bash
grep -c "window.AxiusDiagnostic\b" reference/axius-diagnostic.jsx
```
Expected: `≥ 1`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-diagnostic.jsx
git commit -m "Diagnostic wizard skeleton + Step 1 (Industry chips + Other input)"
```

### Task 3.2: Wizard Step 2 (Challenge) + Step 3 (Outcome) + Back chevron

**Files:**
- Modify: `reference/axius-diagnostic.jsx`

- [ ] **Step 1: Replace the trailing `return null` with the step-2 + step-3 branches**

Inside `window.AxiusDiagnostic`, between Step 1 and `return null`, add:

```jsx
  if (step === 2) {
    return React.createElement('section', {
      'data-axius-diagnostic-step': 2,
      style: { minHeight: '100vh', padding: '64px 32px', background: '#F7F6F2' } },
      React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
        React.createElement(BackChevron, { onClick: () => setStep(1) }),
        React.createElement(SkipLink, { onSkip: () => window.AxiusPersonalization.skip() }),
        React.createElement('h2', { style: { fontFamily: "'Source Serif 4', serif", fontSize: 44, marginBottom: 32 } }, tr('step2Title')),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 } },
          (window.AxiusChallenges || []).map(c =>
            React.createElement('button', {
              key: c.id, type: 'button',
              onClick: () => { setChallenge(c.id); setStep(3); },
              style: chipStyle(challenge === c.id) },
              lang === 'es' ? c.labelEs : c.label)
          ),
        ),
      ),
    );
  }

  if (step === 3) {
    const fmt = (price) => '$' + (price / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    const tierPrice = (tier) => {
      const p = (window.AxiusPricing || []).find(x => x.id === tier);
      return p ? fmt(p.price) : '';
    };
    return React.createElement('section', {
      'data-axius-diagnostic-step': 3,
      style: { minHeight: '100vh', padding: '64px 32px', background: '#F7F6F2' } },
      React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
        React.createElement(BackChevron, { onClick: () => setStep(2) }),
        React.createElement(SkipLink, { onSkip: () => window.AxiusPersonalization.skip() }),
        React.createElement('h2', { style: { fontFamily: "'Source Serif 4', serif", fontSize: 44, marginBottom: 32 } }, tr('step3Title')),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 } },
          (window.AxiusOutcomes || []).map(o => {
            const tpl = lang === 'es' ? o.labelTemplateEs : o.labelTemplate;
            const label = tpl.replace('{price}', tierPrice(o.tier));
            return React.createElement('button', {
              key: o.id, type: 'button',
              onClick: () => {
                setOutcome(o.id);
                window.AxiusPersonalization.set({
                  industry, industryOther: industry === 'other' ? industryOther : null,
                  challenge, outcome: o.id, skipped: false,
                });
              },
              style: chipStyle(outcome === o.id) }, label);
          }),
        ),
      ),
    );
  }
```

Also add the `BackChevron` helper next to `SkipLink`:

```jsx
function BackChevron({ onClick }) {
  return React.createElement('button', {
    type: 'button', onClick: onClick,
    style: { position: 'absolute', top: 24, left: 32, background: 'transparent',
             border: 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
             fontSize: 11, letterSpacing: '0.18em', color: 'rgba(10,9,7,0.55)' } },
    '← BACK');
}
```

- [ ] **Step 2: Sanity**

```bash
grep -c "data-axius-diagnostic-step" reference/axius-diagnostic.jsx
```
Expected: `3`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-diagnostic.jsx
git commit -m "Diagnostic Steps 2 + 3 + Back chevron + outcome commit to AxiusPersonalization"
```

### Task 3.3: Mobile responsive — single column, vertical step indicator

**Files:**
- Modify: `reference/axius-diagnostic.jsx`

- [ ] **Step 1: Add an injected style block + media-query rules**

At the top of the file, after the `window.AxiusDiagnostic = ...` declaration, add a small effect that injects styles once:

```jsx
window.AxiusDiagnostic.installStyles = function () {
  if (document.getElementById('axius-diagnostic-styles')) return;
  const el = document.createElement('style');
  el.id = 'axius-diagnostic-styles';
  el.textContent = `
    [data-axius-diagnostic-step] { position: relative; }
    @media (max-width: 768px) {
      [data-axius-diagnostic-step] { padding: 24px 16px !important; }
      [data-axius-diagnostic-step] h2 { font-size: 28px !important; }
      [data-axius-diagnostic-step] div[style*='grid'] {
        grid-template-columns: 1fr !important;
        gap: 8px !important;
      }
      [data-axius-diagnostic-step] button[style*='padding: 18px'] {
        padding: 16px !important;
      }
    }
  `;
  document.head.appendChild(el);
};
```

In F.jsx (Phase 4), the diagnostic mount call will invoke `window.AxiusDiagnostic.installStyles()` once at startup.

- [ ] **Step 2: Sanity**

```bash
grep -c "installStyles\|max-width: 768px" reference/axius-diagnostic.jsx
```
Expected: `≥ 2`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-diagnostic.jsx
git commit -m "Diagnostic mobile responsive — single column under 768px, styles injected once"
```

### Task 3.4: Slim sticky bar — `window.AxiusDiagnosticBar`

**Files:**
- Modify: `reference/axius-diagnostic.jsx`

- [ ] **Step 1: Append**

```jsx
window.AxiusDiagnosticBar = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const [state, setState] = React.useState(window.AxiusPersonalization.get());
  React.useEffect(() => window.AxiusPersonalization.subscribe(setState), []);

  if (!state.industry && !state.skipped) return null; // nothing to surface

  const industryLabel = (() => {
    if (state.industry === 'other') return state.industryOther || '—';
    const i = (window.AxiusIndustries || []).find(x => x.id === state.industry);
    return i ? (lang === 'es' ? i.labelEs : i.label) : '—';
  })();
  const challengeLabel = (() => {
    if (!state.challenge) return null;
    const c = (window.AxiusChallenges || []).find(x => x.id === state.challenge);
    return c ? (lang === 'es' ? c.labelEs : c.label) : null;
  })();

  const isSkipped = state.skipped;
  const text = isSkipped
    ? (lang === 'es' ? 'Mostrando todas las capacidades' : 'Showing all capabilities')
    : (lang === 'es' ? 'Personalizado para ' : 'Personalized for ') +
      (challengeLabel ? industryLabel + ' · ' + challengeLabel : industryLabel);
  const cta = isSkipped
    ? (lang === 'es' ? 'Hacer diagnóstico de 30s' : 'Run the 30s diagnostic')
    : (lang === 'es' ? 'Reiniciar' : 'Reset');

  return React.createElement('div', {
    style: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
             height: 44, background: 'rgba(247,246,242,0.92)',
             backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
             borderBottom: '1px solid rgba(10,9,7,0.08)',
             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
             padding: '0 24px', fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13 } },
    React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
      React.createElement('span', { style: { width: 6, height: 6, borderRadius: '50%',
                                              background: '#B8743C' } }),
      React.createElement('span', { dangerouslySetInnerHTML: { __html: text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') } }),
    ),
    React.createElement('button', {
      type: 'button',
      onClick: () => window.AxiusPersonalization.reset(),
      style: { background: 'transparent', border: 'none', cursor: 'pointer',
               fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
               letterSpacing: '0.18em', color: 'rgba(10,9,7,0.55)' } },
      cta.toUpperCase()),
  );
};
```

- [ ] **Step 2: Sanity**

```bash
grep -c "window.AxiusDiagnosticBar" reference/axius-diagnostic.jsx
```
Expected: `≥ 1`.

- [ ] **Step 3: Commit**

```bash
git add reference/axius-diagnostic.jsx
git commit -m "Slim sticky AxiusDiagnosticBar — surfaces personalized/skipped state with Reset"
```

---

## Phase 4 — `axius-direction-F.jsx` shell

F is the composition root for Option 2. It mounts: sticky bar, diagnostic (if not answered), hero w/ kicker, recommendations panel (if complete), then the rest of the Quiet 0.5 sections (rendered locally with personalized data where applicable), then evidence + visual + chat. Spec §3 + §5.

### Task 4.1: F.jsx shell with diagnostic gating + sticky bar

**Files:**
- Create: `reference/axius-direction-F.jsx`

- [ ] **Step 1: Create the skeleton**

```jsx
window.AxiusDirectionF = function () {
  const P = window.AxiusPersonalization;
  const [perso, setPerso] = React.useState(P.get);
  React.useEffect(() => P.subscribe(setPerso), []);
  React.useEffect(() => {
    if (window.AxiusDiagnostic && window.AxiusDiagnostic.installStyles)
      window.AxiusDiagnostic.installStyles();
  }, []);

  const showInline = !P.hasAnswered();

  return React.createElement(React.Fragment, null,
    !showInline && React.createElement(window.AxiusDiagnosticBar),
    showInline && React.createElement(window.AxiusDiagnostic),
    // Hero, sections, evidence, visual, chat added in later tasks.
    React.createElement('div', { id: 'axius-direction-F-body',
      style: { paddingTop: !showInline ? 44 : 0 } }, /* placeholder for body */),
  );
};
```

- [ ] **Step 2: Smoke test — F renders the diagnostic when no state**

Create `e2e/F-diagnostic-on-first-visit.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  // Open a fresh storage state each test
  await context.clearCookies();
});

test('F renders the diagnostic on first visit', async ({ page }) => {
  // We mount F via /v1/... NO — F isn't wired in yet. Use a local harness instead.
  await page.setContent(`
    <!doctype html><html><head><meta charset="utf-8"></head>
    <body>
      <div id="root"></div>
      <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
      <script type="text/babel" src="/reference/axius-shared.jsx"></script>
      <script type="text/babel" src="/reference/axius-diagnostic.jsx"></script>
      <script type="text/babel" src="/reference/axius-direction-F.jsx"></script>
      <script type="text/babel">
        function boot(){ if (!window.AxiusDirectionF) return setTimeout(boot, 50);
          ReactDOM.createRoot(document.getElementById('root'))
            .render(React.createElement(window.AxiusDirectionF));
        } boot();
      </script>
    </body></html>
  `, { waitUntil: 'networkidle' });

  await expect(page.locator('[data-axius-diagnostic-step="1"]')).toBeVisible({ timeout: 10_000 });
  await expect(page.locator('text=What industry are you in?')).toBeVisible();
});
```

- [ ] **Step 3: Run**

```bash
node_modules/.bin/playwright test e2e/F-diagnostic-on-first-visit.spec.ts --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add reference/axius-direction-F.jsx e2e/F-diagnostic-on-first-visit.spec.ts
git commit -m "F.jsx shell: mounts diagnostic on first visit, sticky bar after answer"
```

### Task 4.2: F mounts the Hero section (with personalized kicker)

**Files:**
- Modify: `reference/axius-direction-F.jsx`

- [ ] **Step 1: Replace the placeholder `<div id="axius-direction-F-body">` with a Hero section local to F**

Inside F.jsx, define a `<Hero/>` component and call it in the body. The hero is a faithful re-render of E05's hero (tagline, subhead, operator card) plus a small kicker above the tagline that reads from `AxiusPersonalization`.

Use the existing E05 hero as the visual reference: read `reference/axius-direction-E05.jsx` lines ~620–950 to extract the exact tagline + subhead + operator-card structure and copy them into F's `<Hero/>`. Do NOT import — duplicate, per spec NG1.

```jsx
function HeroF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const industry = perso.industry && perso.industry !== 'other'
    ? (window.AxiusIndustries || []).find(x => x.id === perso.industry)
    : null;
  const kicker = industry
    ? (lang === 'es' ? industry.kickerEs : industry.kicker)
    : (perso.industry === 'other' && perso.industryOther
       ? (lang === 'es' ? `Para operadores de ${perso.industryOther} —` : `For ${perso.industryOther} operators —`)
       : null);

  return React.createElement('section', { id: 'hero', /* …same outer styles as E05 hero… */ },
    kicker && React.createElement('div', {
      style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
               letterSpacing: '0.16em', color: 'rgba(10,9,7,0.55)',
               marginBottom: 20 } }, kicker),
    // Duplicate the E05 hero JSX inline here — tagline, subhead, operator card.
    // [Implementation: read reference/axius-direction-E05.jsx and copy the JSX
    //  for the hero section verbatim, then drop in the kicker above the headline.]
  );
}
```

**Implementation guidance:** Read `reference/axius-direction-E05.jsx` around the function that renders `<section id="hero">` and copy the structure (3-line headline, 2-line subhead, hero CTAs, stat row, "How we work" rail, operator card). Drop the kicker above the headline.

- [ ] **Step 2: Wire Hero into F's render**

In `window.AxiusDirectionF`, replace the placeholder body div with:
```jsx
React.createElement('div', { id: 'axius-direction-F-body',
  style: { paddingTop: !showInline ? 44 : 0 } },
  React.createElement(HeroF, { perso })),
```

- [ ] **Step 3: e2e — kicker renders when industry is set**

Add to `e2e/F-diagnostic-on-first-visit.spec.ts`:
```ts
test('Hero kicker appears after answering industry', async ({ page }) => {
  await page.setContent(/* same harness as above */);
  // Click the realestate chip
  await page.click('text=Real estate / brokerage');
  // Now Step 2 is showing — pick a challenge then an outcome to fully commit
  await page.click('text=Leads slip through');
  await page.click('text=Fix one critical system');
  await expect(page.locator('text=For real-estate operators —')).toBeVisible();
});
```

- [ ] **Step 4: Run all e2e**

```bash
node_modules/.bin/playwright test --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add reference/axius-direction-F.jsx e2e/F-diagnostic-on-first-visit.spec.ts
git commit -m "F.jsx Hero with personalized industry kicker"
```

### Task 4.3: Recommendations panel + catalog filter + dynamic pricing tier

**Files:**
- Modify: `reference/axius-direction-F.jsx`

- [ ] **Step 1: Define a `<Recommendations/>` component**

```jsx
function RecommendationsPanel({ perso }) {
  if (!window.AxiusPersonalization.isComplete()) return null;
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const rec = (window.AxiusRecommendations || {})[perso.industry] || {};
  const cell = rec[perso.challenge];
  // Resolve sample workflows from AxiusCatalog by `n` field
  const allSamples = (window.AxiusCatalog || []).flatMap(c => (c.samples || []).map(s => ({ ...s, categoryId: c.id, categoryName: lang === 'es' ? c.nameEs : c.name })));
  let picks = (cell && cell.samples ? cell.samples : [])
    .map(n => allSamples.find(s => s.n === n))
    .filter(Boolean);
  if (picks.length < 3) {
    // Fallback: top 3 samples from the highest-affinity category for this industry
    const cats = (window.AxiusCatalog || []).filter(c => {
      const tags = (window.AxiusCatalogTags || {})[c.id] || [];
      return tags.includes(perso.industry) || tags.includes('all');
    });
    const fallback = cats.flatMap(c => (c.samples || []).map(s => ({ ...s, categoryId: c.id, categoryName: lang === 'es' ? c.nameEs : c.name })));
    picks = fallback.slice(0, 3);
  }
  const rationale = cell && (lang === 'es' ? cell.rationaleES : cell.rationaleEN);

  return React.createElement('section', { id: 'recommendations',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('h2', { style: { fontFamily: 'Source Serif 4, serif', fontSize: 44, marginBottom: 32 } },
        lang === 'es'
          ? `Por dónde empezaríamos — tres flujos para ${perso.industry} enfrentando ${perso.challenge}`
          : `Where we'd start — three workflows for ${perso.industry} dealing with ${perso.challenge}`),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 } },
        picks.map(p => React.createElement('div', { key: p.n,
          style: { padding: 24, border: '1px solid rgba(10,9,7,0.16)' } },
          React.createElement('div', { style: { fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em', color: 'rgba(10,9,7,0.55)' } },
            `N ${p.n} · ${p.categoryName}`),
          React.createElement('h3', { style: { fontSize: 22, margin: '8px 0' } }, p.name),
          React.createElement('p',  { style: { color: 'rgba(10,9,7,0.65)', fontSize: 14 } }, p.sub),
          React.createElement('div', { style: { marginTop: 16, fontSize: 12, color: 'rgba(10,9,7,0.55)' } },
            `${p.pts} pts · ${p.time}`),
        )),
      ),
      rationale && React.createElement('p', {
        style: { marginTop: 24, fontStyle: 'italic', color: 'rgba(10,9,7,0.65)' } },
        rationale),
      React.createElement('a', { href: '#catalog',
        style: { display: 'inline-block', marginTop: 24, fontFamily: 'JetBrains Mono',
                 fontSize: 11, letterSpacing: '0.18em', textDecoration: 'none',
                 color: 'rgba(10,9,7,0.55)' } },
        lang === 'es' ? 'O explorar el catálogo completo ↓' : 'Or browse the full catalog ↓'),
    ),
  );
}
```

- [ ] **Step 2: Define `<CatalogF/>` with category-level filter + View all toggle**

```jsx
function CatalogF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const [viewAll, setViewAll] = React.useState(false);
  const cats = window.AxiusCatalog || [];
  const tags = window.AxiusCatalogTags || {};
  const ind = perso.industry;
  const totalCount = cats.reduce((a, c) => a + (c.count || 0), 0);
  const filterOn = ind && !perso.skipped && !viewAll;
  const shown = filterOn
    ? cats.filter(c => {
        const t = tags[c.id] || [];
        return t.includes(ind) || t.includes('all');
      })
    : cats;
  const shownCount = shown.reduce((a, c) => a + (c.count || 0), 0);

  return React.createElement('section', { id: 'catalog',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      filterOn && React.createElement('div', { style: { display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
        fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em',
        color: 'rgba(10,9,7,0.55)' } },
        React.createElement('span', null, lang === 'es'
          ? `Mostrando ${shownCount} de ${totalCount} capacidades para ${ind}`
          : `Showing ${shownCount} of ${totalCount} capabilities for ${ind}`),
        React.createElement('button', {
          type: 'button', onClick: () => setViewAll(true),
          style: { background: 'transparent', border: 'none', cursor: 'pointer',
                   fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em',
                   color: '#B8743C' } },
          lang === 'es' ? 'VER TODO →' : 'VIEW ALL →'),
      ),
      // Re-render the catalog visually as E05 does. Implementation: copy E05's
      // catalog rendering for each category in `shown`, using each category's
      // `samples` array and `count` to show the same compact card layout.
      shown.map(c => React.createElement('div', { key: c.id,
        style: { marginBottom: 56 } },
        React.createElement('h3', null, lang === 'es' ? c.nameEs : c.name),
        React.createElement('div', { style: { fontSize: 12, color: 'rgba(10,9,7,0.55)' } }, c.stack),
        React.createElement('ul', null,
          (c.samples || []).map(s => React.createElement('li', { key: s.n },
            `N ${s.n} · ${s.name} — ${s.sub} (${s.pts} pts · ${s.time})`)),
        ),
        React.createElement('p', { style: { fontSize: 13, fontStyle: 'italic' } },
          lang === 'es' ? `+ ${c.count - (c.samples||[]).length} más` : `+ ${c.count - (c.samples||[]).length} more`),
      )),
    ),
  );
}
```

**Implementation note:** the actual visual treatment of the catalog cards should match E05's. In `reference/axius-direction-E05.jsx`, find the section that renders the catalog by searching for `id="catalog"` (or `data-screen-label="04 Catalog"`) and copy its JSX into the loop body so the look matches.

- [ ] **Step 3: Define `<PricingF/>` with locally-computed `featured`**

```jsx
function PricingF({ perso }) {
  const tierFromOutcome = perso.outcome
    ? (window.AxiusOutcomeToTier || {})[perso.outcome]
    : null;
  const tiers = (window.AxiusPricing || []).map(p => ({
    ...p,
    featured: tierFromOutcome ? p.id === tierFromOutcome : p.featured,
  }));
  // Render the same visual as E05's pricing using `tiers` (NOT mutating AxiusPricing).
  // Copy from reference/axius-direction-E05.jsx section "04 · PRICING".
  return React.createElement('section', { id: 'pricing',
    style: { padding: '96px 32px' } },
    tiers.map(t => React.createElement('div', { key: t.id,
      style: { border: t.featured ? '2px solid #B8743C' : '1px solid rgba(10,9,7,0.16)',
               padding: 24, marginBottom: 16 } },
      React.createElement('h3', null, t.name),
      React.createElement('div', null, `$${t.price}/mo · $${t.setup} setup`),
    )),
  );
}
```

**Implementation note:** as with CatalogF, faithfully duplicate the visual layout from E05's Pricing section. Find it in E05 via `id="pricing"` (or `data-screen-label="06 Pricing"`).

- [ ] **Step 4: Wire into F's render**

Update `window.AxiusDirectionF` body to mount Hero → Recommendations → Catalog → Pricing in order. Other sections (Commitments, Mess, Comparison, Founder, FAQ) come in Task 4.4.

- [ ] **Step 5: e2e — catalog filter is active when industry is set**

Add to `e2e/F-diagnostic-on-first-visit.spec.ts`:
```ts
test('Catalog shows filter banner when industry is set', async ({ page }) => {
  await page.setContent(/* same harness, but with /reference/axius-direction-F.jsx loaded */);
  await page.click('text=Real estate / brokerage');
  await page.click('text=Leads slip through');
  await page.click('text=Fix one critical system');
  await expect(page.locator('text=/Showing \\d+ of 129 capabilities for realestate/')).toBeVisible();
  await expect(page.locator('text=VIEW ALL →')).toBeVisible();
});
```

- [ ] **Step 6: Run**
```bash
node_modules/.bin/playwright test --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 7: Commit**
```bash
git add reference/axius-direction-F.jsx e2e/F-diagnostic-on-first-visit.spec.ts
git commit -m "F.jsx: Recommendations panel, catalog filter, pricing dynamic featured"
```

### Task 4.4: F duplicates the remaining E05 sections verbatim

**Files:**
- Modify: `reference/axius-direction-F.jsx`

- [ ] **Step 1: Identify the sections to duplicate**

In `reference/axius-direction-E05.jsx` the canonical section ids and labels are:

| section `id` | `data-screen-label`        | F component        |
|--------------|----------------------------|--------------------|
| `commitments`| `01 Commitments`           | `<CommitmentsF/>`  |
| `mess`       | `02 The Mess`              | `<MessF/>`         |
| `method`     | `03 Method`                | `<MethodologyF/>`  |
| `comparison` | `05 Comparison`            | `<ComparisonF/>`   |
| `model`      | `07 The Model`             | `<ModelF/>`        |
| `founder`    | `08 The Operator`          | `<FounderF/>` (also hosts `<FounderVideoF/>` from axius-visual.jsx) |
| `faq`        | `09 Appendix`              | `<FAQF/>`          |
| `cta`        | `10 CTA` (final CTA strip) | `<CTAF/>`          |

For each: open E05, find by `id` (use Read tool with grep for `id="<id>"`), copy that section's JSX verbatim into F as a function named with the `F` suffix. Keep the section ids identical so `<a href="#catalog">` and similar in-page anchors still work. Inside F these are children of the main composition.

**Implementation guidance:** keep the visual treatment identical to E05. Do NOT change section ids — they're used by in-page anchor links throughout E05's hero CTAs and the chat surface.

- [ ] **Step 2: Wire into F's render in the order**

```
HeroF
RecommendationsPanel (if isComplete)
CommitmentsF
MessF
MethodologyF
DemosF                 (from axius-visual.jsx — Phase 6)
CatalogF
PricingF
ComparisonF
ModelF
BeforeAfterF           (from axius-visual.jsx — Phase 6)
FounderF + FounderVideoF
EvidenceF              (from axius-evidence.jsx — Phase 5)
FAQF
ChatF                  (from Phase 7)
CTAF
```

For tasks in this phase, leave Phase 5/6/7 components stubbed as `null` placeholders. They get wired in their respective phases.

- [ ] **Step 3: Smoke test — F renders all sections after diagnostic completion**

Add to `e2e/F-diagnostic-on-first-visit.spec.ts`:
```ts
test('Full F page renders all sections after diagnostic', async ({ page }) => {
  await page.setContent(/* harness with F */);
  await page.click('text=Real estate / brokerage');
  await page.click('text=Leads slip through');
  await page.click('text=Fix one critical system');
  for (const id of ['hero','recommendations','catalog','pricing','founder','faq']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});
```

- [ ] **Step 4: Run all e2e**
```bash
node_modules/.bin/playwright test --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 5: Commit**
```bash
git add reference/axius-direction-F.jsx e2e/F-diagnostic-on-first-visit.spec.ts
git commit -m "F.jsx: full page composition with all sections duplicated from E05"
```

---

## Phase 5 — Evidence layer (`axius-evidence.jsx`)

Spec §6.

### Task 5.1: `<TestimonialsEmpty/>`

**Files:**
- Create: `reference/axius-evidence.jsx`

- [ ] **Step 1: Create the file with TestimonialsF**

```jsx
window.AxiusEvidence = window.AxiusEvidence || {};

window.AxiusEvidence.TestimonialsF = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const list = window.AxiusTestimonials || [];
  if (list.length === 0) {
    return React.createElement('section', { id: 'testimonials',
      style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)' } },
      React.createElement('div', { style: { maxWidth: 800, margin: '0 auto', textAlign: 'center' } },
        React.createElement('p', { style: { fontFamily: 'JetBrains Mono', fontSize: 11,
                                              letterSpacing: '0.18em', color: 'rgba(10,9,7,0.55)' } },
          lang === 'es' ? 'TESTIMONIOS' : 'TESTIMONIALS'),
        React.createElement('p', { style: { fontFamily: 'Source Serif 4', fontStyle: 'italic',
                                              fontSize: 22, color: 'rgba(10,9,7,0.65)', marginTop: 12 } },
          lang === 'es'
            ? 'Discreto por diseño — las primeras voces publicadas aterrizan en Q3 2026 cuando nuestra cohorte piloto complete.'
            : 'Quiet by design — the first published voices land Q3 2026 after our pilot cohort completes.'),
      ),
    );
  }
  // Filled when real testimonials arrive (Phase 5.5).
  return null;
};
```

- [ ] **Step 2: Commit**

```bash
git add reference/axius-evidence.jsx
git commit -m "Evidence: TestimonialsF empty-state component"
```

### Task 5.2: `<CaseStudiesF/>` with fabricated content + auto-unmount

**Files:**
- Modify: `reference/axius-evidence.jsx`

- [ ] **Step 1: Append**

```jsx
window.AxiusEvidence.CaseStudiesF = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const real = window.AxiusCaseStudies || [];
  const fab  = window.axiusFabricationLive() ? (window.AxiusFabricated.caseStudies || []) : [];
  const all  = [...real, ...fab];

  if (all.length === 0) {
    return React.createElement('section', { id: 'case-studies',
      style: { padding: '96px 32px' } },
      React.createElement('p', { style: { textAlign: 'center', fontStyle: 'italic',
                                            color: 'rgba(10,9,7,0.55)' } },
        lang === 'es'
          ? `Los casos de estudio se publican trimestralmente — el próximo lote llega en ${nextQuarter(lang)}.`
          : `Case studies publish quarterly — next set drops ${nextQuarter(lang)}.`),
    );
  }

  return React.createElement('section', { id: 'case-studies',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('h2', { style: { fontSize: 36, marginBottom: 32 } },
        lang === 'es' ? 'Casos de estudio' : 'Case studies'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 } },
        all.map(c => React.createElement('article', { key: c.id,
          style: { padding: 24, border: '1px solid rgba(10,9,7,0.16)' } },
          React.createElement('h3', null, c.company),
          React.createElement('p',  { style: { fontSize: 12, color: 'rgba(10,9,7,0.55)' } },
            lang === 'es' ? c.subtitleEs : c.subtitle),
          React.createElement('p',  { style: { fontSize: 14, marginTop: 12 } },
            lang === 'es' ? c.bodyEs : c.body),
          React.createElement('p',  { style: { fontSize: 13, fontWeight: 600, marginTop: 16 } },
            lang === 'es' ? c.outcomeEs : c.outcome),
        )),
      ),
    ),
  );
};

function nextQuarter(lang) {
  const now = new Date();
  const month = now.getMonth(); // 0–11
  const year = now.getFullYear();
  const q = Math.floor(month / 3) + 2; // next quarter
  const adjQ = q > 4 ? q - 4 : q;
  const adjY = q > 4 ? year + 1 : year;
  return `Q${adjQ} ${adjY}`;
}
```

- [ ] **Step 2: e2e — fabricated content shows when pre-deadline, unmounts post-deadline (via devmode override)**

Create `e2e/evidence-deadline-guard.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

const harness = `
  <!doctype html><html><head></head><body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
    <script type="text/babel" src="/reference/axius-shared.jsx"></script>
    <script type="text/babel" src="/reference/axius-evidence.jsx"></script>
    <script type="text/babel">
      function boot(){ if (!window.AxiusEvidence?.CaseStudiesF) return setTimeout(boot, 50);
        ReactDOM.createRoot(document.getElementById('root'))
          .render(React.createElement(window.AxiusEvidence.CaseStudiesF));
      } boot();
    </script>
  </body></html>`;

test('fabricated case studies render before deadline', async ({ page }) => {
  await page.setContent(harness, { waitUntil: 'networkidle' });
  await expect(page.locator("text=Mariana's Cantina Group")).toBeVisible({ timeout: 5000 });
  await expect(page.locator('text=Hartwell & Bain LLP')).toBeVisible();
  await expect(page.locator('text=Bridgepoint Realty Partners')).toBeVisible();
});

test('fabricated case studies unmount when post-deadline override is set', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('axius:devmode', '1');
    localStorage.setItem('axius:deadline-override', '2000-01-01');
  });
  await page.setContent(harness, { waitUntil: 'networkidle' });
  await expect(page.locator("text=Mariana's Cantina Group")).not.toBeVisible({ timeout: 3000 });
  await expect(page.locator('text=/Case studies publish quarterly/')).toBeVisible();
});
```

- [ ] **Step 3: Run**

```bash
node_modules/.bin/playwright test e2e/evidence-deadline-guard.spec.ts --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add reference/axius-evidence.jsx e2e/evidence-deadline-guard.spec.ts
git commit -m "Evidence: CaseStudiesF + auto-unmount past 2026-08-01 (with devmode override + tests)"
```

### Task 5.3: `<MetricsF/>` (operational tile always; outcome tile date-bound)

**Files:**
- Modify: `reference/axius-evidence.jsx`

- [ ] **Step 1: Append**

```jsx
window.AxiusEvidence.MetricsF = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const op = window.AxiusOperationalMetrics || {};
  const fabLive = window.axiusFabricationLive();
  const outcomes = fabLive ? (window.AxiusFabricated.outcomeMetrics || []) : [];

  return React.createElement('section', { id: 'metrics',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto',
                                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 } },
      React.createElement('div', null,
        React.createElement('p', { style: { fontFamily: 'JetBrains Mono', fontSize: 11,
                                              letterSpacing: '0.18em', color: 'rgba(10,9,7,0.55)' } },
          lang === 'es' ? 'OPERACIONAL' : 'OPERATIONAL'),
        React.createElement('ul', null,
          React.createElement('li', null,
            `${lang === 'es' ? 'Ventana de respuesta' : 'Response window'}: < 24h (Departamento) / 48h (Equipo) / 72h (Operador)`),
          React.createElement('li', null,
            `${lang === 'es' ? 'Sistemas activos' : 'Active systems'}: ${op.activeSystems || 'in pilot'}`),
          React.createElement('li', null,
            `${lang === 'es' ? 'Cadencia' : 'Cadence'}: ${lang === 'es' ? 'semanal / quincenal / mensual' : 'weekly / biweekly / monthly'}`),
        ),
      ),
      React.createElement('div', null,
        React.createElement('p', { style: { fontFamily: 'JetBrains Mono', fontSize: 11,
                                              letterSpacing: '0.18em', color: 'rgba(10,9,7,0.55)' } },
          lang === 'es' ? 'RESULTADOS' : 'OUTCOMES'),
        fabLive
          ? React.createElement('div', { style: { display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 8 } },
              outcomes.map(o => React.createElement('div', { key: o.id,
                style: { padding: 16, border: '1px solid rgba(10,9,7,0.16)' } },
                React.createElement('div', { style: { fontSize: 28, fontWeight: 600 } }, o.value),
                React.createElement('div', { style: { fontSize: 13, color: 'rgba(10,9,7,0.65)' } },
                  lang === 'es' ? o.labelEs : o.label),
              )),
            )
          : React.createElement('p', { style: { fontStyle: 'italic', color: 'rgba(10,9,7,0.55)', marginTop: 8 } },
              lang === 'es' ? 'Métricas de resultados se publican en Q3 2026.' : 'Outcome metrics publish Q3 2026.'),
      ),
    ),
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add reference/axius-evidence.jsx
git commit -m "Evidence: MetricsF — operational always-live, outcomes date-bound"
```

### Task 5.4: `<GBPCardF/>`

**Files:**
- Modify: `reference/axius-evidence.jsx`

- [ ] **Step 1: Append**

```jsx
window.AxiusEvidence.GBPCardF = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const g = window.AxiusGBP || {};
  if (!g.url) {
    return React.createElement('section', { id: 'gbp',
      style: { padding: '64px 32px', textAlign: 'center', borderTop: '1px solid rgba(10,9,7,0.08)' } },
      React.createElement('p', { style: { fontStyle: 'italic', color: 'rgba(10,9,7,0.55)', maxWidth: 600, margin: '0 auto' } },
        lang === 'es'
          ? 'Perfil de Google Business próximamente — dejando este espacio para que las reseñas aterricen naturalmente.'
          : 'Google Business profile coming soon — leaving room here so reviews land naturally.'),
    );
  }
  return React.createElement('section', { id: 'gbp', style: { padding: '64px 32px', textAlign: 'center' } },
    React.createElement('div', null,
      React.createElement('span', { style: { fontSize: 28, fontWeight: 600 } }, g.rating + '★'),
      React.createElement('span', { style: { marginLeft: 12, color: 'rgba(10,9,7,0.65)' } },
        `${g.reviewCount} ${lang === 'es' ? 'reseñas' : 'reviews'}`),
    ),
    React.createElement('a', { href: g.url, target: '_blank', rel: 'noopener noreferrer',
      style: { display: 'inline-block', marginTop: 12 } },
      lang === 'es' ? 'Leer todas las reseñas en Google →' : 'Read all reviews on Google →'),
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add reference/axius-evidence.jsx
git commit -m "Evidence: GBPCardF — empty state until AxiusGBP.url is set"
```

### Task 5.5: Wire evidence components into F

**Files:**
- Modify: `reference/axius-direction-F.jsx`

- [ ] **Step 1: Replace `EvidenceF` placeholder with a fragment that mounts all four evidence components**

```jsx
function EvidenceF() {
  const E = window.AxiusEvidence || {};
  return React.createElement(React.Fragment, null,
    E.TestimonialsF && React.createElement(E.TestimonialsF),
    E.CaseStudiesF  && React.createElement(E.CaseStudiesF),
    E.MetricsF      && React.createElement(E.MetricsF),
    E.GBPCardF      && React.createElement(E.GBPCardF),
  );
}
```

- [ ] **Step 2: e2e — all evidence sections render under F**

Add to `e2e/F-diagnostic-on-first-visit.spec.ts`:
```ts
test('Evidence sections all render under F', async ({ page }) => {
  await page.setContent(/* harness with shared + evidence + F */);
  await page.click('text=Real estate / brokerage');
  await page.click('text=Leads slip through');
  await page.click('text=Fix one critical system');
  for (const id of ['testimonials','case-studies','metrics','gbp']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});
```

- [ ] **Step 3: Run**

```bash
node_modules/.bin/playwright test --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add reference/axius-direction-F.jsx e2e/F-diagnostic-on-first-visit.spec.ts
git commit -m "F.jsx wires AxiusEvidence.* into the composition"
```

---

## Phase 6 — Visual layer (`axius-visual.jsx`)

Spec §7.

### Task 6.1: `<FounderVideoF/>`

**Files:**
- Create: `reference/axius-visual.jsx`

- [ ] **Step 1: Create**

```jsx
window.AxiusVisual = window.AxiusVisual || {};

window.AxiusVisual.FounderVideoF = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const fv = window.AxiusFounderVideo || {};
  if (!fv.url) {
    return React.createElement('div', { id: 'founder-video',
      style: { aspectRatio: '16/9', maxWidth: 720, margin: '0 auto 48px',
               border: '1px dashed rgba(10,9,7,0.32)',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               color: 'rgba(10,9,7,0.55)', fontStyle: 'italic' } },
      React.createElement('span', null, '▶'),
      React.createElement('p', { style: { marginLeft: 12 } },
        lang === 'es' ? 'Intro de 60 segundos con Andrés — grabando pronto.'
                      : '60-second intro from Andrés — recording soon.'));
  }
  return React.createElement('video', { id: 'founder-video',
    src: fv.url, poster: fv.poster, controls: true,
    style: { width: '100%', maxWidth: 720, margin: '0 auto 48px' } });
};
```

- [ ] **Step 2: Commit**

```bash
git add reference/axius-visual.jsx
git commit -m "Visual: FounderVideoF — empty state until AxiusFounderVideo.url is set"
```

### Task 6.2: `<DemosF/>` — CSS-animated mockups

**Files:**
- Modify: `reference/axius-visual.jsx`

- [ ] **Step 1: Append**

```jsx
window.AxiusVisual.DemosF = function () {
  if (!window.axiusFabricationLive()) return null;
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const demos = (window.AxiusFabricated && window.AxiusFabricated.demos) || [];

  return React.createElement('section', { id: 'demos',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('h2', { style: { fontSize: 36, marginBottom: 32 } },
        lang === 'es' ? 'Cómo se ve en vivo' : 'How it runs'),
      React.createElement('div', { style: { display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 } },
        demos.map(d => React.createElement('article', { key: d.id,
          style: { padding: 24, border: '1px solid rgba(10,9,7,0.16)',
                   minHeight: 200, position: 'relative', overflow: 'hidden' } },
          React.createElement('h3', { style: { fontSize: 18 } },
            lang === 'es' ? d.titleEs : d.title),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column',
                                                 gap: 8, marginTop: 16 } },
            (lang === 'es' ? d.captionsEs : d.captions).map((cap, i) =>
              React.createElement('div', { key: i,
                style: { padding: '6px 10px', background: 'rgba(184,116,60,0.08)',
                         border: '1px solid rgba(184,116,60,0.24)',
                         opacity: 0, animation: `axiusDemoFade 4s ${i * 1.2}s infinite` } },
                cap)),
          ),
        )),
      ),
    ),
  );
};

// Inject the keyframes once
(function injectDemoKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('axius-demo-keyframes')) return;
  const el = document.createElement('style');
  el.id = 'axius-demo-keyframes';
  el.textContent = `
    @keyframes axiusDemoFade {
      0%, 20% { opacity: 0; transform: translateY(4px); }
      30%, 90% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-4px); }
    }
  `;
  document.head.appendChild(el);
})();
```

- [ ] **Step 2: Commit**

```bash
git add reference/axius-visual.jsx
git commit -m "Visual: DemosF — CSS-animated workflow mockups, date-bound"
```

### Task 6.3: `<BeforeAfterF/>` — stylized mock pairs

**Files:**
- Modify: `reference/axius-visual.jsx`

- [ ] **Step 1: Append**

```jsx
window.AxiusVisual.BeforeAfterF = function () {
  if (!window.axiusFabricationLive()) return null;
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const pairs = (window.AxiusFabricated && window.AxiusFabricated.beforeAfter) || [];
  const [flipped, setFlipped] = React.useState({});

  return React.createElement('section', { id: 'before-after',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('h2', { style: { fontSize: 36, marginBottom: 32 } },
        lang === 'es' ? 'Antes / después' : 'Before / after'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 } },
        pairs.map(p => React.createElement('div', { key: p.id,
          onClick: () => setFlipped(f => ({ ...f, [p.id]: !f[p.id] })),
          style: { cursor: 'pointer', display: 'flex', gap: 16 } },
          React.createElement('div', { style: { flex: 1, padding: 24, background: '#FEF3E8',
                                                 minHeight: 160, opacity: flipped[p.id] ? 0.3 : 1,
                                                 transition: 'opacity .3s' } },
            React.createElement('div', { style: { fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.18em' } },
              lang === 'es' ? 'ANTES' : 'BEFORE'),
            React.createElement('p', { style: { marginTop: 8 } },
              lang === 'es' ? p.beforeEs : p.before)),
          React.createElement('div', { style: { flex: 1, padding: 24, background: '#E8F4EC',
                                                 minHeight: 160, opacity: flipped[p.id] ? 1 : 0.3,
                                                 transition: 'opacity .3s' } },
            React.createElement('div', { style: { fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.18em' } },
              lang === 'es' ? 'DESPUÉS' : 'AFTER'),
            React.createElement('p', { style: { marginTop: 8 } },
              lang === 'es' ? p.afterEs : p.after)),
        )),
      ),
    ),
  );
};
```

- [ ] **Step 2: Wire DemosF + BeforeAfterF + FounderVideoF into F.jsx**

In F.jsx, replace the visual stubs (between MessF and CatalogF for Demos; between ComparisonF and FounderF for BeforeAfter; inside FounderF for FounderVideo):

```jsx
window.AxiusVisual?.DemosF && React.createElement(window.AxiusVisual.DemosF),
window.AxiusVisual?.BeforeAfterF && React.createElement(window.AxiusVisual.BeforeAfterF),
```

For FounderVideoF, insert at the top of `<FounderF/>` body.

- [ ] **Step 3: e2e — visual sections present**

Add to `e2e/F-diagnostic-on-first-visit.spec.ts`:
```ts
test('Visual sections render under F before deadline', async ({ page }) => {
  await page.setContent(/* harness with visual */);
  await page.click('text=Real estate / brokerage');
  await page.click('text=Leads slip through');
  await page.click('text=Fix one critical system');
  await expect(page.locator('#demos')).toBeVisible();
  await expect(page.locator('#before-after')).toBeVisible();
});
```

- [ ] **Step 4: Run**

```bash
node_modules/.bin/playwright test --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add reference/axius-visual.jsx reference/axius-direction-F.jsx e2e/F-diagnostic-on-first-visit.spec.ts
git commit -m "Visual: BeforeAfterF + wire DemosF/BeforeAfterF/FounderVideoF into F.jsx"
```

---

## Phase 7 — Chat redesign (3 modes)

Spec §5.5 + §8. The chat surface VISUAL is duplicated from E05 (per NG1). Only the entry messages and the buttoned-question branch differ.

### Task 7.1: Identify chat surface code in E05 and copy structure into F

**Files:**
- Modify: `reference/axius-direction-F.jsx`

- [ ] **Step 1: Read E05's chat surface**

Read `reference/axius-direction-E05.jsx` and locate the chat surface (search for `chatHeader`, `chatBack`, `chatDirectLine`, `chatAskAndres` — these are the chat translation keys; the chat surface JSX renders them). Note the structure: header → messages container → input bar.

- [ ] **Step 2: Add `<ChatF/>` component to F.jsx**

```jsx
function ChatF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const mode = perso.skipped ? 'skipper'
              : window.AxiusPersonalization.isComplete() ? 'completer'
              : 'open';

  // Duplicate the E05 chat surface JSX here (header, messages container,
  // input bar). The differences are only in the initial message + buttons.
  return React.createElement('section', { id: 'chat-surface',
    style: { /* match E05 chat surface styling */ } },
    React.createElement(ChatHeader, { lang }),
    React.createElement(ChatMessages, { mode, perso, lang }),
    React.createElement(ChatInputBar, { lang }),
  );
}
```

- [ ] **Step 3: Implement ChatMessages with mode-specific opening bubbles**

```jsx
function ChatMessages({ mode, perso, lang }) {
  if (mode === 'completer') {
    return renderCompleterIntro(perso, lang);
  }
  if (mode === 'skipper') {
    return renderSkipperFlow(perso, lang);
  }
  return renderOpenIntro(lang);  // matches current E05 open-prompt greeting
}

function renderCompleterIntro(perso, lang) {
  const rec = (window.AxiusRecommendations[perso.industry] || {})[perso.challenge];
  const picks = (rec?.samples || []).map(n =>
    (window.AxiusCatalog.flatMap(c => c.samples || []).find(s => s.n === n))
  ).filter(Boolean);
  const greeting = lang === 'es'
    ? `Dijiste que estás en ${perso.industry}, tu mayor fricción es ${perso.challenge}, y quieres ${perso.outcome}.\n\nBasado en eso, empezaría con:\n${picks.map(p => '  • ' + p.name).join('\n')}\n\n¿Cuál es la configuración actual? Te muestro cómo lo estructuraríamos.`
    : `You said you're in ${perso.industry}, your biggest friction is ${perso.challenge}, and you want ${perso.outcome}.\n\nBased on that, I'd start with:\n${picks.map(p => '  • ' + p.name).join('\n')}\n\nWhat's the current setup? I'll tell you exactly how we'd structure it.`;
  // Render with the same visual treatment as E05's chat greeting bubble.
  return React.createElement('div', { className: 'chat-greeting' }, greeting);
  // + 3 buttons: Walk me through / Book a call / Message Andrés directly
}

function renderSkipperFlow(perso, lang) {
  // Three sequential buttoned-question bubbles. Each commits to
  // AxiusPersonalization on click; once all three are answered, the chat
  // re-renders in completer mode (driven by AxiusPersonalization.isComplete()).
  const stage = !perso.industry ? 'industry'
              : !perso.challenge ? 'challenge'
              : !perso.outcome   ? 'outcome'
              : 'done';

  if (stage === 'industry') {
    return React.createElement('div', { className: 'chat-bubble' },
      React.createElement('p', null,
        lang === 'es' ? '¿En qué industria estás?' : 'What industry are you in?'),
      React.createElement('div', { className: 'chat-chips' },
        (window.AxiusIndustries || []).map(i =>
          React.createElement('button', {
            key: i.id, type: 'button',
            onClick: () => window.AxiusPersonalization.set({ industry: i.id }) },
            lang === 'es' ? i.labelEs : i.label))));
  }
  if (stage === 'challenge') {
    return React.createElement('div', { className: 'chat-bubble' },
      React.createElement('p', null,
        lang === 'es' ? '¿Dónde se siente más pesada la operación?' : 'Where does the operation feel heaviest?'),
      React.createElement('div', { className: 'chat-chips' },
        (window.AxiusChallenges || []).map(c =>
          React.createElement('button', {
            key: c.id, type: 'button',
            onClick: () => window.AxiusPersonalization.set({ challenge: c.id }) },
            lang === 'es' ? c.labelEs : c.label))));
  }
  if (stage === 'outcome') {
    return React.createElement('div', { className: 'chat-bubble' },
      React.createElement('p', null,
        lang === 'es' ? '¿Cuánto debería asumir Axius?' : 'How much should Axius take on?'),
      React.createElement('div', { className: 'chat-chips' },
        (window.AxiusOutcomes || []).map(o =>
          React.createElement('button', {
            key: o.id, type: 'button',
            onClick: () => window.AxiusPersonalization.set({ outcome: o.id }) },
            (lang === 'es' ? o.labelTemplateEs : o.labelTemplate).replace('{price}', '')))));
  }
  // stage === 'done' — fall through to completer intro on next render
  return renderCompleterIntro(perso, lang);
}
```

- [ ] **Step 4: Sanity — file still parses**

```bash
grep -c "ChatF\|renderCompleterIntro\|renderSkipperFlow" reference/axius-direction-F.jsx
```
Expected: ≥ `3`.

- [ ] **Step 5: Commit**

```bash
git add reference/axius-direction-F.jsx
git commit -m "Chat redesign: ChatF with three modes (completer / skipper / open)"
```

### Task 7.2: e2e — completer mode chat greeting references the diagnostic answers

**Files:**
- Create: `e2e/F-chat-modes.spec.ts`

- [ ] **Step 1: Write the test**

```ts
import { test, expect } from '@playwright/test';

const harness = (extraInit = '') => `
  <!doctype html><html><head></head><body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
    <script type="text/babel" src="/reference/axius-shared.jsx"></script>
    <script type="text/babel" src="/reference/axius-diagnostic.jsx"></script>
    <script type="text/babel" src="/reference/axius-evidence.jsx"></script>
    <script type="text/babel" src="/reference/axius-visual.jsx"></script>
    <script type="text/babel" src="/reference/axius-direction-F.jsx"></script>
    <script type="text/babel">
      ${extraInit}
      function boot(){ if (!window.AxiusDirectionF) return setTimeout(boot, 50);
        ReactDOM.createRoot(document.getElementById('root'))
          .render(React.createElement(window.AxiusDirectionF));
      } boot();
    </script>
  </body></html>`;

test('Completer mode chat greeting references diagnostic answers', async ({ page }) => {
  await page.setContent(harness(`
    window.addEventListener('load', () => {
      window.AxiusPersonalization.set({ industry: 'realestate',
        challenge: 'leadsleak', outcome: 'fix-one' });
    });
  `), { waitUntil: 'networkidle' });
  await expect(page.locator('text=/you.re in realestate/i')).toBeVisible({ timeout: 5000 });
});

test('Skipper mode chat opens buttoned flow', async ({ page }) => {
  await page.setContent(harness(`
    window.addEventListener('load', () => {
      window.AxiusPersonalization.skip();
    });
  `), { waitUntil: 'networkidle' });
  await expect(page.locator('text=/industry/i')).toBeVisible({ timeout: 5000 });
});
```

- [ ] **Step 2: Run**

```bash
node_modules/.bin/playwright test e2e/F-chat-modes.spec.ts --project=desktop-chromium
```
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add e2e/F-chat-modes.spec.ts
git commit -m "e2e: chat mode auto-detection (completer / skipper) verified"
```

---

## Phase 8 — Cutover: modify `index.html` to serve Option 2

This is the **single irreversible step**. After this, `/` serves Option 2; `/v1/` still serves Option 1.

### Task 8.1: Update `index.html` to load Option 2 scripts and mount F

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update the `<title>`, scripts, and mount point**

Use Edit to change:

1. `<title>Axius — Run your business. Not your tech.</title>` (already there — keep)
2. Add new scripts in this order **before** the closing `</body>`, replacing the current Quiet 0.5 boot block:

```html
<div id="stage-quiet06"></div>

<script>
  window.__AXIUS_FOUNDER_PHOTO = '/assets/andres-toro.jpg';
</script>

<!-- Local-only secrets (gitignored). Production loads with placeholder credentials if missing. -->
<script type="text/babel" src="/reference/axius-secrets.local.jsx"></script>

<!-- Shared tokens, data, atoms, AxiusConfig, AxiusPersonalization, new globals -->
<script type="text/babel" src="/reference/axius-shared.jsx"></script>

<!-- Diagnostic wizard + sticky bar -->
<script type="text/babel" src="/reference/axius-diagnostic.jsx"></script>

<!-- Evidence + Visual layers -->
<script type="text/babel" src="/reference/axius-evidence.jsx"></script>
<script type="text/babel" src="/reference/axius-visual.jsx"></script>

<!-- Direction F — Quiet 0.5 evolved (Option 2) -->
<script type="text/babel" src="/reference/axius-direction-F.jsx"></script>

<script type="text/babel">
  function waitForGlobals(cb) {
    if (window.AxiusTokens && window.AxiusDirectionF && window.AxiusPersonalization) cb();
    else setTimeout(function () { waitForGlobals(cb); }, 40);
  }
  waitForGlobals(function () {
    ReactDOM.createRoot(document.getElementById('stage-quiet06'))
      .render(React.createElement(window.AxiusDirectionF));
  });
</script>
```

Remove the old `<div id="stage-quiet05"></div>` and its associated boot block (mounting `window.AxiusDirectionE05`).

- [ ] **Step 2: Verify the file**

```bash
grep -E "stage-quiet0[56]|AxiusDirection[EF]" index.html
```
Expected: only `stage-quiet06` and `AxiusDirectionF` appear; no `stage-quiet05` or `AxiusDirectionE05`.

- [ ] **Step 3: e2e — `/` serves Option 2**

Create `e2e/option-2-at-root.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('/ serves Option 2 with the diagnostic for a fresh visitor', async ({ page, context }) => {
  await context.clearCookies();
  await page.goto('/');
  await expect(page.locator('[data-axius-diagnostic-step="1"]')).toBeVisible({ timeout: 10_000 });
});

test('/v1/ still serves Option 1', async ({ page }) => {
  await page.goto('/v1/');
  await expect(page.locator('text=Run')).toBeVisible({ timeout: 10_000 });
  await expect(page.locator('text=your business.')).toBeVisible();
  await expect(page.locator('text=Not your tech.')).toBeVisible();
});
```

- [ ] **Step 4: Run the full e2e suite**

```bash
node_modules/.bin/playwright test --project=desktop-chromium
```
Expected: PASS (all suites, including option-1-baseline running against `/v1/`).

**Note:** `e2e/option-1-baseline.spec.ts` was written against `/`. After cutover, that suite must be **updated to point at `/v1/`** OR deleted because `e2e/option-1-at-v1.spec.ts` already covers it. Delete it:

```bash
git rm e2e/option-1-baseline.spec.ts
```

- [ ] **Step 5: Commit**

```bash
git add index.html e2e/option-2-at-root.spec.ts
git rm e2e/option-1-baseline.spec.ts || true
git commit -m "Cutover: / serves Option 2 (axius-direction-F), /v1/ keeps Option 1"
```

---

## Phase 9 — Data fill: catalog tagging review + 60-cell recommendations matrix

### Task 9.1: Author the remaining 9 industries × 6 challenges = 54 recommendation cells

**Files:**
- Modify: `reference/axius-shared.jsx`

- [ ] **Step 1: Extend `window.AxiusRecommendations` with the remaining 54 cells**

Add cells for `hospitality, legal, healthcare, homeservices, professional, ecommerce, automotive, wellness, other` × 6 challenges each. Use the same shape:

```jsx
hospitality: {
  leadsleak:    { samples: ['001', '017', '003'], rationaleEN: '…', rationaleES: '…' },
  manualdata:   { samples: ['035', '037', '019'], rationaleEN: '…', rationaleES: '…' },
  // … 4 more
},
// … 8 more industries
```

Selection criteria for each cell:
- Pick 3 sample `n` values from the 36 known samples (Task 2.7 lists them).
- Prefer samples from categories tagged for the industry (per `AxiusCatalogTags`).
- Rationale is a single sentence, EN + ES, that ties the 3 picks to the (industry, challenge) pair.

This is repetitive content authoring — the implementer should write it once, get user review, then commit.

- [ ] **Step 2: Sanity — 10 industries × 6 challenges = 60 cells**

```bash
node -e "
const fs = require('fs');
const txt = fs.readFileSync('reference/axius-shared.jsx', 'utf8');
// Count occurrences of 'samples:' inside the AxiusRecommendations block
const block = txt.match(/window\.AxiusRecommendations\s*=\s*\{[\s\S]*?\n\};/);
if (!block) { console.error('not found'); process.exit(1); }
const count = (block[0].match(/samples\s*:/g) || []).length;
console.log('cells:', count);
if (count < 60) { console.error('expected 60, got', count); process.exit(1); }
"
```
Expected: `cells: 60` (or higher if other-industry cells are also authored).

- [ ] **Step 3: Commit**

```bash
git add reference/axius-shared.jsx
git commit -m "Recommendations matrix: full 60-cell content + EN/ES rationales"
```

### Task 9.2: Review-and-confirm catalog tagging with the user

This task is a human-in-the-loop checkpoint. The implementing agent should pause, summarize the current `AxiusCatalogTags`, and ask Andrés to confirm or adjust before continuing to Phase 10.

- [ ] **Step 1: Summarize current tagging**

```bash
node -e "
const fs = require('fs');
const txt = fs.readFileSync('reference/axius-shared.jsx', 'utf8');
const block = txt.match(/window\.AxiusCatalogTags\s*=\s*\{[\s\S]*?\};/);
if (!block) { console.error('not found'); process.exit(1); }
console.log(block[0]);
"
```

- [ ] **Step 2: Present to the user, accept adjustments**

Reply with the rendered block and: "Confirm or adjust the category→industries tags. After your confirm, I'll fold any changes in and move to deploy."

- [ ] **Step 3 (after user confirm): Commit if changes were made**

```bash
git add reference/axius-shared.jsx
git commit -m "Catalog tagging: confirmed/adjusted by user"
```

---

## Phase 10 — Deploy + verify

### Task 10.1: Local final smoke

**Files:** none

- [ ] **Step 1: Run the full e2e suite on both desktop and mobile**

```bash
node_modules/.bin/playwright test
```
Expected: PASS across `desktop-chromium` and `mobile-iphone` projects.

- [ ] **Step 2: Manual visual check on http://127.0.0.1:4321**

Open in a browser and walk through:
- Fresh visit shows diagnostic ✓
- Pick Real estate → Leads slip → Fix one ✓
- Hero kicker reads "For real-estate operators —" ✓
- Recommendations panel shows 3 cards ✓
- Catalog shows "Showing N of 129 capabilities for realestate — VIEW ALL" ✓
- Pricing has Operador tier highlighted ✓
- Case studies show the 3 fabricated entries ✓
- Slim bar visible at top with Reset ✓
- Click Reset → diagnostic re-mounts ✓
- /v1/ shows the original Quiet 0.5 ✓

- [ ] **Step 3: Commit nothing — this task is verification only**

### Task 10.2: Deploy to production

**Files:** none

- [ ] **Step 1: Push to origin**

```bash
git push origin main
```

- [ ] **Step 2: Wait for Vercel auto-deploy**

```bash
vercel ls 2>&1 | head -5
```
Wait until the topmost row reads `● Ready`.

- [ ] **Step 3: Post-deploy structural checks**

```bash
echo "=== / serves Option 2 ==="
curl -s https://axius-tech-website.vercel.app/ | grep -E "AxiusDirectionF|stage-quiet06" | head -3

echo "=== /v1/ serves Option 1 ==="
curl -sI https://axius-tech-website.vercel.app/v1/ | head -3

echo "=== /v1/ does NOT load Option 2 scripts ==="
curl -s https://axius-tech-website.vercel.app/v1/ | grep -E "axius-diagnostic|axius-evidence|axius-visual|axius-direction-F" || echo "(none — good)"

echo "=== /v1/ byte-identical to pre-implementation snapshot (except canonical) ==="
diff \
  <(grep -v 'rel="canonical"' docs/superpowers/specs/snapshots/2026-06-02-pre-implementation-index.html) \
  <(curl -s https://axius-tech-website.vercel.app/v1/ | grep -v 'rel="canonical"')
```

Expected: matches printed for the first two; the diff is empty.

- [ ] **Step 4: Stripe + Telegram smoke test (regression check)**

```bash
python3 <<'PY'
import json, time, hmac, hashlib, urllib.request, os
# This step assumes Andrés has the whsec_ value handy from Vercel env or re-create.
# If not available, skip — the production webhook hasn't changed.
print("SKIP: STRIPE_WEBHOOK_SECRET not in plan inputs. Re-run smoke from memory or"
      " manually via Stripe Dashboard → Webhooks → Send test event if needed.")
PY
```

If the previous session's `/tmp/.axius_whsec` was removed (per the prior turn's cleanup), this step is a manual verification: in Stripe Dashboard → Developers → Webhooks → `we_1Tcv5iD7QdyAY19BFSZGLEw2` → Send Test Webhook (`checkout.session.completed`). Expected: 200 response in the dashboard, message lands in Axius Dispatch supergroup.

- [ ] **Step 5: Commit nothing — this is verification**

### Task 10.3: Mark plan complete, prepare handoff

**Files:** none

- [ ] **Step 1: Confirm `docs/superpowers/specs/2026-06-02-axius-option-2-diagnostic-variant-design.md` §15 Acceptance Checklist all items are met**

Walk down the checklist. Anything not met → file a follow-up task (do NOT mark plan complete with open items).

- [ ] **Step 2: Tell Andrés:**

```
Plan complete. Option 2 is live at https://axius-tech-website.vercel.app/.
Option 1 preserved at https://axius-tech-website.vercel.app/v1/.

Fabricated content live until 2026-08-01 then auto-unmounts:
  - 3 case studies (Mariana's Cantina, Hartwell & Bain, Bridgepoint Realty)
  - 4 outcome metrics
  - 3 CSS-animated demos
  - 2 before/after pairs

Open items (per spec §14):
  - Replace fabricated content with real before 2026-08-01
  - Provide real testimonials when available → window.AxiusTestimonials
  - Set window.AxiusGBP.url once Google Business profile exists
  - Set window.AxiusFounderVideo.url after recording
  - Update window.AxiusOperationalMetrics.activeSystems string over time
```

---

## Notes on testing strategy

This project is a static React-via-Babel prototype with no build step. Traditional unit tests (Jest, Vitest) don't fit — the JSX is compiled by the browser at load time. Playwright e2e tests are the natural fit:

- They run against the same browser environment users see.
- They verify behavior, not just structure.
- They can assert against personalization state, animations, deadline-bound rendering, etc.
- They're already in `node_modules` from prior work.

Coverage targets:
- State machine: AxiusPersonalization API (Task 2.9)
- Diagnostic flow: Steps 1–3 + Skip + Back (Tasks 4.x)
- Personalization wiring: kicker, recommendations, catalog filter, pricing (Tasks 4.x)
- Date-bound rendering: evidence + visual deadline guard (Tasks 5.x, 6.x)
- Option 1 preservation: byte-identical at `/v1/` (Task 1.2 + Task 10.2 step 3)
- Cutover regression: Option 1 unchanged at `/v1/` after Option 2 ships at `/` (Task 8.1)

Manual checks (kept lightweight, see Task 10.1 step 2) cover the visual/UX polish that automated tests can't catch.

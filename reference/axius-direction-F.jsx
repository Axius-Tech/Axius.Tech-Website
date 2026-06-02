// axius-direction-F.jsx — Composition root for Option 2 (diagnostic-first variant).
// Mounted at / by Phase 8's index.html cutover. /v1 keeps mounting E05 unchanged.

// ─── Section components ─────────────────────────────────────

// Hero — simplified Quiet 0.5 hero w/ personalized industry kicker.
// Brand essentials: kicker (optional) + 3-line headline + 2-line subhead + primary CTA.
// Full E05-fidelity hero (How-we-work rail, operator card, collage artifacts, hero stat
// row, copper hairline) is intentionally deferred — Phase 4's goal is composition +
// personalization wiring, not pixel parity with E05.
function HeroF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const ind = perso.industry && perso.industry !== 'other'
    ? (window.AxiusIndustries || []).find(x => x.id === perso.industry)
    : null;
  const kicker = perso.skipped ? null : (ind
    ? (lang === 'es' ? ind.kickerEs : ind.kicker)
    : (perso.industry === 'other' && perso.industryOther
       ? (lang === 'es' ? `Para operadores de ${perso.industryOther} —` : `For ${perso.industryOther} operators —`)
       : null));

  const heroLine1 = lang === 'es' ? 'Dirige' : 'Run';
  const heroLine2 = lang === 'es' ? 'tu negocio.' : 'your business.';
  const heroLine3 = lang === 'es' ? 'No tu tech.' : 'Not your tech.';
  const subA = lang === 'es' ? 'Nosotros operamos el lado tecnológico de tu negocio —' : 'We run the tech side of your business —';
  const subB = lang === 'es' ? 'todo, por ' : 'all of it — for ';
  const subBold = lang === 'es' ? 'una sola cuota mensual.' : 'one monthly fee.';
  const ctaPrimary = lang === 'es' ? 'Reservar llamada' : 'Book a discovery call';
  const ctaSecondary = lang === 'es' ? 'Ver el catálogo' : 'See the catalog';
  const bookingHref = (window.AxiusConfig && window.AxiusConfig.bookingUrl) || '#cta';

  return React.createElement('section', { id: 'hero',
    style: { padding: '104px 32px 108px', background: '#F7F6F2', color: '#0F0E0C',
             position: 'relative', overflow: 'hidden' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      kicker && React.createElement('div', {
        className: 'kicker',
        style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
                 letterSpacing: '0.16em', color: 'rgba(10,9,7,0.55)',
                 marginBottom: 20, textTransform: 'uppercase' } },
        kicker),
      React.createElement('h1', {
        style: { margin: 0, fontFamily: "'Source Serif 4', serif",
                 fontWeight: 600, fontSize: 96, lineHeight: 1.02,
                 letterSpacing: '-0.045em', color: '#0F0E0C',
                 maxWidth: 920 } },
        heroLine1, React.createElement('br'),
        heroLine2, React.createElement('br'),
        React.createElement('span', { style: { color: 'rgba(10,9,7,0.45)' } }, heroLine3),
      ),
      React.createElement('p', {
        style: { marginTop: 40, maxWidth: 560,
                 fontFamily: "Inter, system-ui, sans-serif", fontWeight: 400,
                 fontSize: 19, color: 'rgba(10,9,7,0.65)', lineHeight: 1.55,
                 letterSpacing: '-0.003em' } },
        subA, React.createElement('br'),
        subB,
        React.createElement('span', { style: { color: '#0F0E0C' } }, subBold),
      ),
      React.createElement('div', {
        style: { marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' } },
        React.createElement('a', {
          href: bookingHref, target: '_blank', rel: 'noopener noreferrer',
          style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                   background: '#0F0E0C', color: '#F7F6F2',
                   border: '1px solid #0F0E0C', padding: '14px 24px',
                   fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, fontWeight: 500,
                   textDecoration: 'none', letterSpacing: '-0.005em' } },
          ctaPrimary,
          React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace',
                                                   color: '#B8743C', fontSize: 13 } }, '→')),
        React.createElement('a', {
          href: '#catalog',
          style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                   background: 'transparent', color: '#0F0E0C',
                   border: '1px solid rgba(10,9,7,0.16)', padding: '14px 24px',
                   fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, fontWeight: 500,
                   textDecoration: 'none', letterSpacing: '-0.005em' } },
          ctaSecondary,
          React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace',
                                                   color: '#B8743C', fontSize: 13 } }, '↓')),
      ),
    ),
  );
}

// Recommendations panel — only renders when the diagnostic is fully answered.
// Picks 3 sample workflows from the AxiusRecommendations matrix; falls back to
// the top 3 samples from the highest-affinity catalog category when the matrix
// cell is empty.
function RecommendationsPanel({ perso }) {
  if (!window.AxiusPersonalization.isComplete()) return null;
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const rec = (window.AxiusRecommendations || {})[perso.industry] || {};
  const cell = rec[perso.challenge];

  const allSamples = (window.AxiusCatalog || []).flatMap(c =>
    (c.samples || []).map(s => ({ ...s, categoryId: c.id,
                                      categoryName: lang === 'es' ? c.nameEs : c.name }))
  );
  let picks = (cell && cell.samples ? cell.samples : [])
    .map(n => allSamples.find(s => s.n === n))
    .filter(Boolean);

  if (picks.length < 3) {
    const cats = (window.AxiusCatalog || []).filter(c => {
      const tags = (window.AxiusCatalogTags || {})[c.id] || [];
      return tags.includes(perso.industry) || tags.includes('all');
    });
    const fallback = cats.flatMap(c => (c.samples || []).map(s =>
      ({ ...s, categoryId: c.id, categoryName: lang === 'es' ? c.nameEs : c.name })
    ));
    picks = fallback.slice(0, 3);
  }
  const rationale = cell && (lang === 'es' ? cell.rationaleES : cell.rationaleEN);
  const industryLabel = perso.industry === 'other'
    ? perso.industryOther
    : ((window.AxiusIndustries || []).find(x => x.id === perso.industry) || {})[lang === 'es' ? 'labelEs' : 'label'];
  const challengeLabel = ((window.AxiusChallenges || []).find(x => x.id === perso.challenge) || {})[lang === 'es' ? 'labelEs' : 'label'];

  return React.createElement('section', { id: 'recommendations',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('h2', { style: { fontFamily: "'Source Serif 4', serif",
                                            fontSize: 36, marginBottom: 24, color: '#0F0E0C' } },
        lang === 'es'
          ? `Por dónde empezaríamos — tres flujos para ${industryLabel || perso.industry} con ${challengeLabel || perso.challenge}`
          : `Where we'd start — three workflows for ${industryLabel || perso.industry} dealing with ${challengeLabel || perso.challenge}`),
      React.createElement('div', { style: { display: 'grid',
                                              gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 } },
        picks.map(p => React.createElement('div', { key: p.n,
          style: { padding: 24, border: '1px solid rgba(10,9,7,0.16)', color: '#0F0E0C' } },
          React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace',
                                                  fontSize: 11, letterSpacing: '0.18em',
                                                  color: 'rgba(10,9,7,0.55)' } },
            `N ${p.n} · ${p.categoryName}`),
          React.createElement('h3', { style: { fontSize: 20, margin: '8px 0' } }, p.name),
          React.createElement('p',  { style: { color: 'rgba(10,9,7,0.65)', fontSize: 14 } }, p.sub),
          React.createElement('div', { style: { marginTop: 16, fontSize: 12,
                                                  color: 'rgba(10,9,7,0.55)' } },
            `${p.pts} pts · ${p.time}`),
        )),
      ),
      rationale && React.createElement('p', { style: { marginTop: 24, fontStyle: 'italic',
                                                          color: 'rgba(10,9,7,0.65)' } },
        rationale),
      React.createElement('a', { href: '#catalog',
        style: { display: 'inline-block', marginTop: 24,
                 fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                 letterSpacing: '0.18em', textDecoration: 'none',
                 color: 'rgba(10,9,7,0.55)' } },
        lang === 'es' ? 'O explorar el catálogo completo ↓' : 'Or browse the full catalog ↓'),
    ),
  );
}

// CatalogF — when an industry is set, filters the 9 categories down to the
// ones tagged for it (or tagged 'all'). Shows a "Showing X of Y" filter banner
// with a "VIEW ALL" reveal. Never mutates AxiusCatalog.
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
  const indLabel = ind === 'other'
    ? perso.industryOther
    : ((window.AxiusIndustries || []).find(x => x.id === ind) || {})[lang === 'es' ? 'labelEs' : 'label'];

  return React.createElement('section', { id: 'catalog',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)', color: '#0F0E0C' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      filterOn && React.createElement('div', { style: { display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em',
        color: 'rgba(10,9,7,0.55)' } },
        React.createElement('span', null, lang === 'es'
          ? `Mostrando ${shownCount} de ${totalCount} capacidades para ${indLabel || ind}`
          : `Showing ${shownCount} of ${totalCount} capabilities for ${indLabel || ind}`),
        React.createElement('button', {
          type: 'button', onClick: () => setViewAll(true),
          style: { background: 'transparent', border: 'none', cursor: 'pointer',
                   fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                   letterSpacing: '0.18em', color: '#B8743C' } },
          lang === 'es' ? 'VER TODO →' : 'VIEW ALL →'),
      ),
      shown.map(c => React.createElement('div', { key: c.id,
        style: { marginBottom: 48 } },
        React.createElement('h3', { style: { fontSize: 22, marginBottom: 4 } },
          lang === 'es' ? c.nameEs : c.name),
        React.createElement('div', { style: { fontSize: 12, color: 'rgba(10,9,7,0.55)',
                                                fontFamily: 'JetBrains Mono, monospace',
                                                letterSpacing: '0.16em', marginBottom: 12 } },
          c.stack),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
          (c.samples || []).map(s => React.createElement('li', { key: s.n,
            style: { padding: '8px 0', borderTop: '1px solid rgba(10,9,7,0.06)' } },
            React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace',
                                                     fontSize: 11, letterSpacing: '0.18em',
                                                     color: 'rgba(10,9,7,0.55)' } },
              `N ${s.n}`),
            ` · ${s.name} — `,
            React.createElement('span', { style: { color: 'rgba(10,9,7,0.65)' } }, s.sub),
            ` (${s.pts} pts · ${s.time})`)),
        ),
        React.createElement('p', { style: { fontSize: 13, fontStyle: 'italic',
                                              color: 'rgba(10,9,7,0.55)', marginTop: 8 } },
          lang === 'es'
            ? `+ ${c.count - (c.samples||[]).length} más`
            : `+ ${c.count - (c.samples||[]).length} more`),
      )),
    ),
  );
}

// PricingF — renders the 3 tiers with featured override driven by the
// visitor's outcome choice. Never mutates AxiusPricing (we remap locally).
// Checkout URLs are sourced from AxiusConfig.checkoutUrls[tierId].
function PricingF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const tierFromOutcome = perso.outcome
    ? (window.AxiusOutcomeToTier || {})[perso.outcome]
    : null;
  const checkoutUrls = (window.AxiusConfig && window.AxiusConfig.checkoutUrls) || {};
  const tiers = (window.AxiusPricing || []).map(p => ({
    ...p,
    featured: tierFromOutcome ? p.id === tierFromOutcome : p.featured,
    checkoutUrl: checkoutUrls[p.id] || null,
  }));

  return React.createElement('section', { id: 'pricing',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)', color: '#0F0E0C' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto',
                                            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
      tiers.map(t => React.createElement('div', { key: t.id,
        style: { border: t.featured ? '2px solid #B8743C' : '1px solid rgba(10,9,7,0.16)',
                 padding: 32, background: '#F7F6F2' } },
        React.createElement('h3', { style: { fontFamily: "'Source Serif 4', serif",
                                                fontSize: 32, marginBottom: 4 } }, t.name),
        React.createElement('div', { style: { fontSize: 14, color: 'rgba(10,9,7,0.65)',
                                                marginBottom: 20 } },
          lang === 'es' ? t.subEs : t.sub),
        React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace',
                                                fontSize: 16, color: '#0F0E0C', marginBottom: 4 } },
          `$${t.price}/mo`),
        React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace',
                                                fontSize: 12, color: 'rgba(10,9,7,0.55)', marginBottom: 24 } },
          `+ $${t.setup} ${lang === 'es' ? 'setup' : 'setup'}`),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
          ((lang === 'es' ? t.featuresEs : t.features) || []).map((f, i) =>
            React.createElement('li', { key: i, style: { padding: '6px 0', fontSize: 14 } }, '• ' + f)
          ),
        ),
        t.checkoutUrl && React.createElement('a', { href: t.checkoutUrl, target: '_blank', rel: 'noopener noreferrer',
          style: { display: 'inline-block', marginTop: 24, padding: '12px 20px',
                   background: t.featured ? '#B8743C' : '#0F0E0C', color: '#F7F6F2',
                   textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace',
                   fontSize: 11, letterSpacing: '0.18em' } },
          (lang === 'es' ? 'EMPEZAR →' : 'GET STARTED →')),
      )),
    ),
  );
}

// ─── Quiet 0.5 style helpers (light canvas) ─────────────────

const F_INK     = '#0F0E0C';
const F_DIM     = 'rgba(10,9,7,0.65)';
const F_MUTE    = 'rgba(10,9,7,0.55)';
const F_FAINT   = 'rgba(10,9,7,0.32)';
const F_LINE    = '1px solid rgba(10,9,7,0.16)';
const F_LINE_LO = '1px solid rgba(10,9,7,0.08)';
const F_CANVAS  = '#F7F6F2';
const F_TANGER  = '#B8743C';
const F_SERIF   = "'Source Serif 4', serif";
const F_SANS    = "Inter, system-ui, sans-serif";
const F_MONO    = "JetBrains Mono, monospace";

function sectionWrap(id, children, opts = {}) {
  return React.createElement('section', { id,
    style: { padding: '96px 32px', borderTop: F_LINE_LO,
             background: opts.background || F_CANVAS, color: F_INK } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      children),
  );
}

function eyebrow(text) {
  return React.createElement('div', {
    style: { fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em',
             color: F_MUTE, marginBottom: 16, textTransform: 'uppercase' } },
    text);
}

// ─── 01 · Commitments ───────────────────────────────────────
function CommitmentsF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const commitments = window.AxiusCommitments || [];
  return sectionWrap('commitments', [
    eyebrow(lang === 'es' ? '01 · Promesa Axius' : '01 · Our commitments'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: F_SERIF, fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.025em', margin: '0 0 48px', maxWidth: 880 } },
      lang === 'es' ? 'Cinco promesas. Sin asteriscos.' : 'Five commitments. No asterisks.'),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40 } },
      commitments.map(c => React.createElement('div', { key: c.n,
        style: { borderTop: F_LINE, paddingTop: 24 } },
        React.createElement('div', {
          style: { fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: F_TANGER, marginBottom: 8 } }, c.n),
        React.createElement('h3', {
          style: { fontFamily: F_SERIF, fontSize: 24, margin: '0 0 12px',
                   letterSpacing: '-0.02em' } },
          lang === 'es' ? c.titleEs : c.title),
        React.createElement('p', {
          style: { fontSize: 15, color: F_DIM, lineHeight: 1.6,
                   whiteSpace: 'pre-line', margin: 0 } },
          lang === 'es' ? c.bodyEs : c.body),
        c.metric && React.createElement('div', {
          style: { marginTop: 16, fontFamily: F_MONO, fontSize: 11,
                   letterSpacing: '0.12em', color: F_MUTE } },
          (lang === 'es' ? (c.metric.labelEs || c.metric.label) : c.metric.label)
          + ' · ' +
          (lang === 'es' ? (c.metric.valueEs || c.metric.value) : c.metric.value)),
      )),
    ),
  ]);
}

// ─── 02 · The Mess ──────────────────────────────────────────
function MessF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const cols = lang === 'es'
    ? [
        { n: '01', label: 'El síntoma',
          body: 'Cinco contratistas. Tres hilos de Slack. El sitio se cae el viernes. El CRM nunca se conectó como debía.' },
        { n: '02', label: 'El costo',
          body: 'Cada herramienta se compró con optimismo. La mayoría queda sin usar. Nada se acumula operativamente.' },
        { n: '03', label: 'La resolución',
          body: 'Un equipo responsable gestionando los sistemas detrás del negocio. Una sola línea de comunicación. Una sola factura mensual. Documentado, mantenido y operado de forma continua.' },
      ]
    : [
        { n: '01', label: 'The symptom',
          body: 'Five contractors. Three Slack threads. The site breaks Friday. The CRM never got connected properly.' },
        { n: '02', label: 'The cost',
          body: 'Every tool was bought with optimism. Most sit unused. Nothing compounds operationally.' },
        { n: '03', label: 'The resolution',
          body: 'One accountable team managing the systems behind the business. One line of communication. One monthly bill. Documented, maintained, and operated continuously.' },
      ];
  return sectionWrap('mess', [
    eyebrow(lang === 'es'
      ? '02 · Los problemas operativos con los que la mayoría de empresas vive en silencio'
      : '02 · The operational problems most businesses quietly live with'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: F_SERIF, fontSize: 56, lineHeight: 1.02,
               letterSpacing: '-0.04em', margin: '0 0 64px', maxWidth: 980 } },
      lang === 'es'
        ? 'Empezaste esto para construir un negocio, no mantener sus sistemas.'
        : 'You started this to build a business, not maintain its systems.'),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40,
               borderTop: F_LINE_LO, paddingTop: 32 } },
      cols.map(c => React.createElement('div', { key: c.n,
        style: { paddingLeft: 16, borderLeft: F_LINE_LO } },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 } },
          React.createElement('span', {
            style: { fontFamily: F_MONO, fontSize: 13, letterSpacing: '0.18em',
                     color: F_INK } }, c.n + '.'),
          React.createElement('span', {
            style: { fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em',
                     color: F_MUTE, textTransform: 'uppercase' } }, c.label),
        ),
        React.createElement('p', {
          style: { fontSize: 15, color: F_DIM, lineHeight: 1.65, margin: 0 } },
          c.body),
      )),
    ),
  ]);
}

// ─── 03 · Methodology ───────────────────────────────────────
function MethodologyF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const stages = window.AxiusMethodology || [];
  return sectionWrap('method', [
    eyebrow(lang === 'es' ? '03 · Método' : '03 · Method'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: F_SERIF, fontSize: 56, lineHeight: 1.02,
               letterSpacing: '-0.04em', margin: '0 0 56px' } },
      lang === 'es'
        ? 'Cuatro etapas. Cada una nombrada. Cada una entregada.'
        : 'Four stages. Each one named. Each one delivered.'),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 } },
      stages.map(s => React.createElement('div', { key: s.n,
        style: { borderTop: F_LINE, paddingTop: 20 } },
        React.createElement('div', {
          style: { fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: F_TANGER, marginBottom: 8 } },
          (lang === 'es' ? 'Etapa ' : 'Stage ') + s.n),
        React.createElement('h3', {
          style: { fontFamily: F_SERIF, fontSize: 26, margin: '0 0 14px',
                   letterSpacing: '-0.025em' } },
          lang === 'es' ? s.nameEs : s.name),
        React.createElement('p', {
          style: { fontSize: 14, color: F_DIM, lineHeight: 1.6,
                   whiteSpace: 'pre-line', margin: '0 0 16px' } },
          lang === 'es' ? s.bodyEs : s.body),
        React.createElement('div', {
          style: { fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.12em',
                   color: F_MUTE } },
          (lang === 'es' ? 'artefacto · ' : 'artifact · ') + s.artifact),
        React.createElement('div', {
          style: { fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.12em',
                   color: F_MUTE, marginTop: 4 } },
          lang === 'es' ? s.timingEs : s.timing),
      )),
    ),
  ]);
}

// ─── 05 · Comparison ────────────────────────────────────────
function ComparisonF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const rows = window.AxiusComparison || [];
  const headers = lang === 'es'
    ? ['Dimensión', 'Múltiples freelancers', 'Un empleado interno', 'Axius']
    : ['Dimension', 'Multiple freelancers', 'Single in-house hire', 'Axius'];
  return sectionWrap('comparison', [
    eyebrow(lang === 'es' ? '05 · Comparación' : '05 · Comparison'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: F_SERIF, fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 48px', maxWidth: 880 } },
      lang === 'es'
        ? 'Cómo nos comparamos con las dos alternativas habituales.'
        : 'How we compare with the two usual alternatives.'),
    React.createElement('div', { key: 'table',
      style: { overflowX: 'auto' } },
      React.createElement('table', {
        style: { width: '100%', borderCollapse: 'collapse',
                 fontFamily: F_SANS, fontSize: 14, color: F_INK } },
        React.createElement('thead', null,
          React.createElement('tr', null,
            headers.map((h, i) => React.createElement('th', { key: i,
              style: { textAlign: 'left', padding: '12px 16px',
                       borderBottom: F_LINE,
                       fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em',
                       color: i === 3 ? F_TANGER : F_MUTE,
                       textTransform: 'uppercase' } }, h)),
          ),
        ),
        React.createElement('tbody', null,
          rows.map((r, i) => React.createElement('tr', { key: i,
            style: { borderBottom: F_LINE_LO } },
            React.createElement('td', {
              style: { padding: '14px 16px', color: F_DIM,
                       fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.12em',
                       textTransform: 'uppercase' } },
              lang === 'es' ? r.rowEs : r.row),
            React.createElement('td', { style: { padding: '14px 16px', color: F_DIM } },
              lang === 'es' ? r.fEs : r.f),
            React.createElement('td', { style: { padding: '14px 16px', color: F_DIM } },
              lang === 'es' ? r.hEs : r.h),
            React.createElement('td', { style: { padding: '14px 16px', color: F_INK, fontWeight: 500 } },
              lang === 'es' ? r.aEs : r.a),
          )),
        ),
      ),
    ),
  ]);
}

// ─── 07 · The Model ─────────────────────────────────────────
function ModelF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const pillars = lang === 'es'
    ? [
        { eyebrow: 'Operador', title: 'Es dueño de la dirección y la responsabilidad.', bullets: [
          'Un solo punto de contacto', 'Define la dirección operativa',
          'Responsable de los resultados y la ejecución',
          'Sigue respondiendo cuando hay cambios', 'La misma mano sobre tus sistemas',
        ] },
        { eyebrow: 'Sistemas de IA', title: 'Aumentan velocidad y continuidad.', bullets: [
          'Mantienen contexto del workflow', 'Manejan el trabajo operativo repetitivo',
          'Mejoran los tiempos de respuesta', 'Monitorean los sistemas en segundo plano',
          'Mantienen la documentación al día',
        ] },
        { eyebrow: 'Especialistas', title: 'Integrados cuando se necesita profundidad.', bullets: [
          'Especialistas verificados', 'Engineering, automatización, diseño, infraestructura',
          'Gestionados por el operador', 'Sin coordinación de proveedores',
          'Calidad controlada antes de la entrega',
        ] },
        { eyebrow: 'Lo que experimentas', title: 'Una sola capa operativa responsable.', bullets: [
          'Una sola línea de comunicación', 'Un solo equipo responsable',
          'Una sola capa operativa mensual', 'Ejecución organizada y discreta',
          'Tecnología que sigue moviéndose sin que tú la operes',
        ] },
      ]
    : [
        { eyebrow: 'Operator', title: 'Owns direction and accountability.', bullets: [
          'Single point of contact', 'Sets operational direction',
          'Owns outcomes and execution', 'Accountable when systems change',
          'Same hand on your systems',
        ] },
        { eyebrow: 'AI systems', title: 'Increase speed and continuity.', bullets: [
          'Maintain workflow context', 'Handle repetitive operational work',
          'Improve response times', 'Monitor systems quietly in the background',
          'Keep documentation current',
        ] },
        { eyebrow: 'Specialists', title: 'Integrated when depth is needed.', bullets: [
          'Vetted specialists across the work',
          'Engineering, automation, design, infrastructure',
          'Managed entirely by the operator', 'No vendor coordination on your side',
          'Quality controlled before delivery',
        ] },
        { eyebrow: 'What you experience', title: 'One accountable operational layer.', bullets: [
          'One line of communication', 'One accountable team',
          'One monthly operating layer', 'Quiet, organized execution',
          'Technology that keeps moving without you managing it',
        ] },
      ];
  return sectionWrap('model', [
    eyebrow(lang === 'es' ? '07 · El modelo' : '07 · The model'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: F_SERIF, fontSize: 56, lineHeight: 1.02,
               letterSpacing: '-0.04em', margin: '0 0 56px', maxWidth: 760 } },
      lang === 'es'
        ? 'Tres roles, una sola capa responsable.'
        : 'Three roles, one accountable layer.'),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 } },
      pillars.map((p, i) => React.createElement('div', { key: i,
        style: { padding: 24, border: F_LINE, minHeight: 380,
                 display: 'flex', flexDirection: 'column', gap: 16 } },
        React.createElement('div', {
          style: { fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: F_MUTE, textTransform: 'uppercase' } }, p.eyebrow),
        React.createElement('h3', {
          style: { fontFamily: F_SERIF, fontSize: 22, margin: 0,
                   letterSpacing: '-0.02em' } }, p.title),
        React.createElement('ul', {
          style: { margin: 0, padding: 0, listStyle: 'none',
                   display: 'flex', flexDirection: 'column', gap: 8, flex: 1 } },
          p.bullets.map((b, j) => React.createElement('li', { key: j,
            style: { display: 'flex', alignItems: 'baseline', gap: 8,
                     fontSize: 13, color: F_DIM, lineHeight: 1.55 } },
            React.createElement('span', {
              style: { color: F_TANGER, fontFamily: F_MONO, fontSize: 11 } }, '+'),
            React.createElement('span', null, b),
          )),
        ),
      )),
    ),
  ]);
}

// ─── 08 · Founder ───────────────────────────────────────────
function FounderF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const f = window.AxiusFounder || {};
  return sectionWrap('founder', [
    eyebrow(lang === 'es' ? '08 · El Operador' : '08 · The Operator'),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56,
               alignItems: 'start' } },
      React.createElement('div', { key: 'photo' },
        React.createElement('div', {
          style: { aspectRatio: '3/4', width: '100%',
                   border: F_LINE, overflow: 'hidden', background: '#E9E6DF' } },
          React.createElement('img', {
            src: f.photo, alt: f.name || 'Founder',
            onError: (e) => { e.target.style.display = 'none'; },
            style: { width: '100%', height: '100%', objectFit: 'cover',
                     filter: 'grayscale(.15) contrast(1.04)' } }),
        ),
        React.createElement('div', {
          style: { fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: F_MUTE, marginTop: 12, textTransform: 'uppercase' } },
          'Fig. 01 · ' + (lang === 'es' ? 'Operador' : 'Operator')),
      ),
      React.createElement('div', { key: 'bio' },
        React.createElement('h2', {
          style: { fontFamily: F_SERIF, fontSize: 48, lineHeight: 1.05,
                   letterSpacing: '-0.03em', margin: '0 0 24px' } },
          lang === 'es' ? 'La mano sobre tus operaciones.' : 'The hand on your operations.'),
        React.createElement('p', {
          style: { fontSize: 16, color: F_DIM, lineHeight: 1.7,
                   whiteSpace: 'pre-line', margin: '0 0 32px' } },
          lang === 'es' ? (f.bioEs || '') : (f.bio || '')),
        React.createElement('blockquote', {
          style: { fontFamily: F_SERIF, fontStyle: 'italic', fontSize: 20,
                   lineHeight: 1.45, color: F_INK, margin: '0 0 32px',
                   borderLeft: '2px solid ' + F_TANGER, paddingLeft: 20 } },
          lang === 'es' ? (f.quoteEs || '') : (f.quote || '')),
        React.createElement('div', {
          style: { fontFamily: F_MONO, fontSize: 12, letterSpacing: '0.12em',
                   color: F_MUTE, display: 'flex', flexWrap: 'wrap', gap: 16 } },
          (f.facts || []).map((fact, i) => React.createElement('span', { key: i },
            fact.k.toUpperCase() + ' · ' + fact.v)),
        ),
      ),
    ),
  ]);
}

// ─── 09 · FAQ ───────────────────────────────────────────────
function FAQF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const faqs = window.AxiusFAQ || [];
  const [openIdx, setOpenIdx] = React.useState(0);
  return sectionWrap('faq', [
    eyebrow(lang === 'es' ? '09 · Apéndice' : '09 · Appendix'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: F_SERIF, fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 48px' } },
      lang === 'es' ? 'Preguntas, en simple.' : 'Questions, asked simply.'),
    React.createElement('div', { key: 'list' },
      faqs.map((item, i) => React.createElement('div', { key: i,
        style: { borderTop: F_LINE_LO, padding: '20px 0' } },
        React.createElement('button', {
          type: 'button',
          onClick: () => setOpenIdx(openIdx === i ? -1 : i),
          style: { all: 'unset', cursor: 'pointer', display: 'flex',
                   justifyContent: 'space-between', alignItems: 'baseline',
                   width: '100%' } },
          React.createElement('span', {
            style: { fontFamily: F_SERIF, fontSize: 22,
                     letterSpacing: '-0.02em', color: F_INK } },
            lang === 'es' ? item.qEs : item.q),
          React.createElement('span', {
            style: { fontFamily: F_MONO, fontSize: 13, color: F_TANGER,
                     marginLeft: 16 } },
            openIdx === i ? '−' : '+'),
        ),
        openIdx === i && React.createElement('p', {
          style: { fontSize: 15, color: F_DIM, lineHeight: 1.65,
                   margin: '16px 0 0', maxWidth: 760 } },
          lang === 'es' ? item.aEs : item.a),
      )),
    ),
  ]);
}

// ─── 10 · CTA ───────────────────────────────────────────────
function CTAF({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const bookingHref = (window.AxiusConfig && window.AxiusConfig.bookingUrl) || '#';
  return sectionWrap('cta', [
    React.createElement('div', { key: 'eyebrow',
      style: { fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em',
               color: F_TANGER, marginBottom: 24, textTransform: 'uppercase' } },
      lang === 'es' ? '— Empezar —' : '— Begin —'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: F_SERIF, fontSize: 72, lineHeight: 1.02,
               letterSpacing: '-0.04em', margin: '0 0 32px', maxWidth: 920 } },
      lang === 'es' ? 'Inicia una conversación.' : 'Begin a conversation.'),
    React.createElement('p', { key: 'body',
      style: { fontSize: 18, color: F_DIM, lineHeight: 1.55,
               maxWidth: 640, margin: '0 0 40px' } },
      lang === 'es'
        ? 'Treinta minutos. Sales con una auditoría de una página, pase lo que pase. Sin pitch, sin presión — solo una imagen clara de tus sistemas.'
        : 'Thirty minutes. You leave with a one-page audit either way. No pitch, no pressure — just a clear picture of your systems.'),
    React.createElement('a', { key: 'cta',
      href: bookingHref, target: '_blank', rel: 'noopener noreferrer',
      style: { display: 'inline-flex', alignItems: 'center', gap: 12,
               background: F_INK, color: F_CANVAS, border: '1px solid ' + F_INK,
               padding: '16px 28px', fontFamily: F_SANS, fontSize: 14,
               fontWeight: 500, textDecoration: 'none' } },
      lang === 'es' ? 'Reservar llamada de descubrimiento' : 'Book a discovery call',
      React.createElement('span', {
        style: { fontFamily: F_MONO, color: F_TANGER, fontSize: 13 } }, '→')),
  ], { background: F_CANVAS });
}

// ─── Evidence wiring (Phase 5) ──────────────────────────────
// EvidenceF mounts the four evidence sections — Testimonials, CaseStudies,
// Metrics, GBP — between Founder and FAQ in the composition root.
function EvidenceF() {
  const E = window.AxiusEvidence || {};
  return React.createElement(React.Fragment, null,
    E.TestimonialsF && React.createElement(E.TestimonialsF),
    E.CaseStudiesF  && React.createElement(E.CaseStudiesF),
    E.MetricsF      && React.createElement(E.MetricsF),
    E.GBPCardF      && React.createElement(E.GBPCardF),
  );
}

// ─── Composition root ────────────────────────────────────────

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
    React.createElement('div', { id: 'axius-direction-F-body',
      style: { paddingTop: !showInline ? 44 : 0,
               background: '#F7F6F2', minHeight: '100vh' } },
      React.createElement(HeroF, { perso }),
      React.createElement(RecommendationsPanel, { perso }),
      React.createElement(CommitmentsF, { perso }),
      React.createElement(MessF, { perso }),
      React.createElement(MethodologyF, { perso }),
      // DemosF will be wired in Phase 6
      React.createElement(CatalogF, { perso }),
      React.createElement(PricingF, { perso }),
      React.createElement(ComparisonF, { perso }),
      React.createElement(ModelF, { perso }),
      // BeforeAfterF will be wired in Phase 6
      React.createElement(FounderF, { perso }),
      React.createElement(EvidenceF),
      React.createElement(FAQF, { perso }),
      // ChatF will be wired in Phase 7
      React.createElement(CTAF, { perso }),
    ),
  );
};

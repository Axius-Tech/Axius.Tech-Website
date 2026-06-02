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
      React.createElement(CatalogF, { perso }),
      React.createElement(PricingF, { perso }),
    ),
  );
};

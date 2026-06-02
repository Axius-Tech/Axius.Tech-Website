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
    ),
  );
};

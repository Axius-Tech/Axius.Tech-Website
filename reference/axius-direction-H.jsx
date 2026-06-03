// axius-direction-H.jsx — Composition root for Option 4 (commercial-ready variant).
// Mounted at /v4 by v4/index.html. Coexists with Option 2 at /, Option 1 at /v1,
// and Option 3 at /v3.
//
// Architecture notes:
//   • Synthesis of Option 3's editorial architecture and Option 2's personalization
//     runtime + filtered catalog + recommendations panel + Telegram contact form.
//   • Preserves Quiet 0.5's visual identity (cream canvas #F7F6F2, ink #0F0E0C,
//     tangerine accent #B8743C, Source Serif 4 / Inter / JetBrains Mono).
//   • Adds commercial-ready chrome: sticky scroll CTA, comprehensive footer,
//     skip-to-content link, focus-visible styles, prefers-reduced-motion respect,
//     and inline contact form posting to the Telegram bridge.
//   • REUSES window.AxiusPersonalization (same store Options 2 and 3 use).
//     Writes V3-taxonomy ids back into that store.
//   • React.createElement only (no JSX).
//   • Fabricated outcome/proof metrics are wrapped in window.axiusFabricationLive()
//     so they auto-unmount past 2026-08-01, matching Option 2/3's discipline.

// ─── Light-canvas style constants ─────────────────────────────
const H_INK     = '#0F0E0C';
const H_DIM     = 'rgba(10,9,7,0.65)';
const H_MUTE    = 'rgba(10,9,7,0.55)';
const H_FAINT   = 'rgba(10,9,7,0.32)';
const H_LINE    = '1px solid rgba(10,9,7,0.16)';
const H_LINE_LO = '1px solid rgba(10,9,7,0.08)';
const H_CANVAS  = '#F7F6F2';
const H_CANVAS_LO = '#EDECE6';
const H_TANGER  = '#B8743C';
const H_SERIF   = "'Source Serif 4', serif";
const H_SANS    = "Inter, system-ui, sans-serif";
const H_MONO    = "JetBrains Mono, monospace";

// ─── Style injection helper ───────────────────────────────────
function installH4Styles() {
  if (document.getElementById('axius-direction-H-styles')) return;
  const el = document.createElement('style');
  el.id = 'axius-direction-H-styles';
  el.textContent = [
    '/* Focus visible — keyboard nav clarity */',
    '.axius-h-btn:focus-visible,',
    '.axius-h-input:focus-visible,',
    '.axius-h-link:focus-visible {',
    '  outline: 2px solid #B8743C;',
    '  outline-offset: 2px;',
    '}',
    '/* Skip-to-main link */',
    '.axius-skip-link {',
    '  position: absolute; top: -40px; left: 8px;',
    '  background: #0F0E0C; color: #F7F6F2;',
    '  padding: 8px 12px; z-index: 9999;',
    '  text-decoration: none;',
    '  font-family: JetBrains Mono, monospace; font-size: 12px;',
    '  letter-spacing: 0.12em; text-transform: uppercase;',
    '  transition: top 0.2s;',
    '}',
    '.axius-skip-link:focus { top: 8px; }',
    '/* Mobile reset for sticky CTA + responsive grids */',
    '@media (max-width: 768px) {',
    '  [data-axius-h-grid="3col"] { grid-template-columns: 1fr !important; }',
    '  [data-axius-h-grid="2col"] { grid-template-columns: 1fr !important; }',
    '  [data-axius-h-grid="4col"] { grid-template-columns: 1fr 1fr !important; }',
    '  [data-axius-h-section] { padding: 64px 20px !important; }',
    '  [data-axius-h-section] h1 { font-size: 48px !important; }',
    '  [data-axius-h-section] h2 { font-size: 32px !important; }',
    '  [data-axius-h-sticky] { padding: 8px 12px !important; }',
    '  [data-axius-h-sticky] .axius-h-sticky-brand { display: none !important; }',
    '  [data-axius-h-footer-grid] { grid-template-columns: 1fr !important; }',
    '}',
    '@media (prefers-reduced-motion: reduce) {',
    '  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }',
    '}',
    '/* Sticky CTA transition */',
    '.axius-h-sticky-cta {',
    '  transition: transform 0.24s ease, opacity 0.24s ease;',
    '}',
  ].join('\n');
  document.head.appendChild(el);
}

// ─── Section wrapper helper ───────────────────────────────────
function hSection(id, children, opts) {
  opts = opts || {};
  return React.createElement('section', { id,
    'data-axius-h-section': true,
    style: { padding: opts.pad || '96px 32px',
             borderTop: opts.noTop ? 'none' : H_LINE_LO,
             background: opts.background || H_CANVAS, color: H_INK } },
    React.createElement('div', { style: { maxWidth: opts.maxWidth || 1100, margin: '0 auto' } },
      children),
  );
}

function hEyebrow(text, copper) {
  return React.createElement('div', {
    style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
             color: copper ? H_TANGER : H_MUTE, marginBottom: 20,
             textTransform: 'uppercase' } },
    text);
}

// ════════════════════════════════════════════════════════════════════════
// 00 · STICKY SCROLL CTA
// ════════════════════════════════════════════════════════════════════════
function StickyCTAH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const cfg = window.AxiusStickyCTAV4 || {};
  const [visible, setVisible] = React.useState(false);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    const threshold = ((cfg.scrollThresholdVh || 90) / 100) * window.innerHeight;
    function check() {
      const should = window.scrollY > threshold;
      setVisible(prev => prev === should ? prev : should);
      rafRef.current = null;
    }
    function onScroll() {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(check);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    check();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [cfg.scrollThresholdVh]);

  const primary   = cfg.primary   || {};
  const secondary = cfg.secondary || {};
  const brand     = cfg.brand     || {};
  const primaryLabel   = lang === 'es' ? (primary.labelEs || primary.labelEn) : primary.labelEn;
  const secondaryLabel = lang === 'es' ? (secondary.labelEs || secondary.labelEn) : secondary.labelEn;
  const brandLabel     = lang === 'es' ? (brand.labelEs || brand.labelEn) : brand.labelEn;

  const handleSecondary = (e) => {
    if (secondary.href && secondary.href.charAt(0) === '#') {
      e.preventDefault();
      const el = document.getElementById(secondary.href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return React.createElement('div', {
    role: 'status', 'aria-live': 'polite',
    'data-axius-h-sticky': true,
    className: 'axius-h-sticky-cta',
    style: {
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 56, zIndex: 100,
      background: 'rgba(247,246,242,0.92)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: H_LINE_LO,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px',
      transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
    } },
    React.createElement('div', {
      className: 'axius-h-sticky-brand',
      style: { fontFamily: H_MONO, fontSize: 12, letterSpacing: '0.22em',
               color: H_INK, fontWeight: 600 } },
      brandLabel || 'AXIUS',
      React.createElement('span', { style: { color: H_TANGER } }, '.')),
    React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
      React.createElement('a', {
        className: 'axius-h-link',
        href: secondary.href || '#pricing',
        onClick: handleSecondary,
        'aria-label': secondaryLabel,
        style: {
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'transparent', color: H_INK,
          border: '1px solid rgba(10,9,7,0.32)',
          padding: '8px 14px', fontFamily: H_SANS, fontSize: 12,
          fontWeight: 500, textDecoration: 'none',
          letterSpacing: '-0.005em',
        } },
        secondaryLabel,
        React.createElement('span', { style: { fontFamily: H_MONO,
                                                  color: H_TANGER, fontSize: 11 } }, '→')),
      React.createElement('a', {
        className: 'axius-h-link',
        href: primary.href || '#',
        target: '_blank', rel: 'noopener noreferrer',
        'aria-label': primaryLabel,
        style: {
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: H_TANGER, color: H_CANVAS,
          border: '1px solid ' + H_TANGER,
          padding: '8px 14px', fontFamily: H_SANS, fontSize: 12,
          fontWeight: 500, textDecoration: 'none',
          letterSpacing: '-0.005em',
        } },
        primaryLabel,
        React.createElement('span', { style: { fontFamily: H_MONO,
                                                  color: H_CANVAS, fontSize: 11 } }, '→')),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 01 · HERO (ported from HeroV3)
// ════════════════════════════════════════════════════════════════════════
function HeroH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const bookingHref = (window.AxiusConfig && window.AxiusConfig.bookingUrl) || 'mailto:andres@axius.tech';

  const kickerEN = 'AXIUS — TECHNOLOGY OPERATING PARTNER · ONLY ACCEPTING 3 NEW CLIENTS / MONTH';
  const kickerES = 'AXIUS — PARTNER OPERATIVO DE TECNOLOGÍA · SOLO 3 NUEVOS CLIENTES / MES';

  const heroLine1 = lang === 'es' ? 'Dirige' : 'Run';
  const heroLine2 = lang === 'es' ? 'tu negocio.' : 'your business.';
  const heroLine3 = lang === 'es' ? 'No tu tech.' : 'Not your tech.';

  const subLines = lang === 'es'
    ? [
        'La mayoría de los negocios en crecimiento no necesitan más software.',
        'Necesitan que alguien sea dueño.',
        'Axius se convierte en el partner operativo de tecnología detrás de tu negocio.',
        'Un equipo responsable. Un punto de contacto.\nMejora, ejecución y propiedad continuas.',
      ]
    : [
        "Most growing businesses don't need more software.",
        'They need someone to own it.',
        'Axius becomes the technology operating partner behind your business.',
        'One accountable team. One point of contact.\nContinuous improvement, execution, and ownership.',
      ];

  const ctaPrimary   = lang === 'es' ? 'Reservar llamada estratégica' : 'Book a Strategic Call';
  const ctaSecondary = lang === 'es' ? 'Ver cómo funciona' : 'See How It Works';
  const ctaSecondaryAria = lang === 'es' ? 'Ver cómo funciona — desplazar a la sección de diagnóstico' : 'See how it works — scroll to diagnostic section';

  const scrollToDispatch = (e) => {
    e.preventDefault();
    const el = document.getElementById('dispatch');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return React.createElement('section', { id: 'hero',
    'data-axius-h-section': true,
    style: { padding: '120px 32px 96px', background: H_CANVAS, color: H_INK,
             position: 'relative', overflow: 'hidden' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('div', {
        style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                 color: H_MUTE, marginBottom: 32, textTransform: 'uppercase' } },
        lang === 'es' ? kickerES : kickerEN),
      React.createElement('h1', {
        style: { margin: 0, fontFamily: H_SERIF, fontStyle: 'italic',
                 fontWeight: 500, fontSize: 80, lineHeight: 1.02,
                 letterSpacing: '-0.04em', color: H_INK, maxWidth: 920 } },
        heroLine1, React.createElement('br'),
        heroLine2, React.createElement('br'),
        React.createElement('span', { style: { color: H_TANGER } }, heroLine3),
      ),
      React.createElement('div', {
        style: { marginTop: 40, maxWidth: 620, fontFamily: H_SANS,
                 fontSize: 17, lineHeight: 1.6, color: H_DIM,
                 letterSpacing: '-0.003em' } },
        subLines.map((line, i) => React.createElement('p', { key: i,
          style: { margin: i === 0 ? 0 : '14px 0 0', whiteSpace: 'pre-line' } },
          line)),
      ),
      React.createElement('div', {
        style: { marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' } },
        React.createElement('a', {
          className: 'axius-h-link',
          href: bookingHref, target: '_blank', rel: 'noopener noreferrer',
          'aria-label': ctaPrimary,
          style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                   background: H_INK, color: H_CANVAS,
                   border: '1px solid ' + H_INK, padding: '14px 24px',
                   fontFamily: H_SANS, fontSize: 14, fontWeight: 500,
                   textDecoration: 'none', letterSpacing: '-0.005em' } },
          ctaPrimary,
          React.createElement('span', { style: { fontFamily: H_MONO,
                                                    color: H_TANGER, fontSize: 13 } }, '→')),
        React.createElement('a', {
          className: 'axius-h-link',
          href: '#dispatch', onClick: scrollToDispatch,
          'aria-label': ctaSecondaryAria,
          style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                   background: 'transparent', color: H_INK,
                   border: '1px solid rgba(10,9,7,0.32)', padding: '14px 24px',
                   fontFamily: H_SANS, fontSize: 14, fontWeight: 500,
                   textDecoration: 'none', letterSpacing: '-0.005em' } },
          ctaSecondary,
          React.createElement('span', { style: { fontFamily: H_MONO,
                                                    color: H_TANGER, fontSize: 13 } }, '→')),
      ),
      // Metrics strip
      React.createElement('div', {
        'data-axius-h-grid': '4col',
        style: { marginTop: 72, display: 'grid',
                 gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
                 borderTop: H_LINE, borderBottom: H_LINE_LO } },
        [
          { label: lang === 'es' ? 'SISTEMAS ACTIVOS' : 'ACTIVE SYSTEMS', value: '129' },
          { label: lang === 'es' ? 'RESPUESTA IA' : 'AI RESPONSE', value: lang === 'es' ? 'Inmediata' : 'Immediate' },
          { label: lang === 'es' ? 'RESPUESTA HUMANA' : 'HUMAN RESPONSE', value: lang === 'es' ? 'Mismo día' : 'Same Day' },
          { label: lang === 'es' ? 'ESTADO DE INTAKE' : 'INTAKE STATUS', value: lang === 'es' ? 'Limitado' : 'Limited' },
        ].map((m, i) => React.createElement('div', { key: i,
          style: { padding: '24px 20px',
                   borderLeft: i === 0 ? 'none' : H_LINE_LO } },
          React.createElement('div', { style: { fontFamily: H_MONO,
                                                  fontSize: 10, letterSpacing: '0.18em',
                                                  color: H_MUTE, marginBottom: 10 } },
            m.label),
          React.createElement('div', { style: { fontFamily: H_SERIF,
                                                  fontSize: 28, letterSpacing: '-0.02em',
                                                  color: H_INK } },
            m.value),
        )),
      ),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 02 · DISPATCH — 3-question diagnostic on one screen (ported from DispatchV3)
// ════════════════════════════════════════════════════════════════════════
function DispatchH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const P = window.AxiusPersonalization;

  const industries = window.AxiusIndustriesV3 || [];
  const challenges = window.AxiusChallengesV3 || [];
  const outcomes   = window.AxiusOutcomesV3   || [];

  const [otherText, setOtherText] = React.useState(perso.industryOther || '');
  const [generating, setGenerating] = React.useState(false);
  const [dots, setDots] = React.useState('');
  const previouslyComplete = React.useRef(
    Boolean(perso.industry && perso.challenge && perso.outcome));

  const pickIndustry = (id) => {
    P.set({ industry: id, industryOther: id === 'other' ? otherText : null });
  };
  const pickChallenge = (id) => P.set({ challenge: id });
  const pickOutcome   = (id) => P.set({ outcome: id });

  React.useEffect(() => {
    const complete = Boolean(perso.industry && perso.challenge && perso.outcome);
    if (complete && !previouslyComplete.current) {
      previouslyComplete.current = true;
      setGenerating(true);
      let frames = 0;
      const id = setInterval(() => {
        frames = (frames + 1) % 4;
        setDots('.'.repeat(frames));
      }, 280);
      const finish = setTimeout(() => {
        clearInterval(id);
        setGenerating(false);
        setDots('');
        const el = document.getElementById('problem');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1200);
      return () => { clearInterval(id); clearTimeout(finish); };
    }
  }, [perso.industry, perso.challenge, perso.outcome]);

  const renderChip = (option, selected, onClick) => {
    const label = lang === 'es' ? (option.labelEs || option.label) : option.label;
    return React.createElement('button', {
      key: option.id,
      type: 'button',
      role: 'radio',
      className: 'axius-h-btn',
      'aria-checked': selected,
      'aria-label': label,
      onClick,
      style: {
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 16px',
        border: selected ? '1px solid ' + H_TANGER : H_LINE,
        background: selected ? 'rgba(184,116,60,0.08)' : H_CANVAS,
        color: H_INK, fontFamily: H_SANS, fontSize: 14,
        cursor: 'pointer', textAlign: 'left',
        transition: 'all .12s ease',
      } },
      React.createElement('span', {
        style: { width: 8, height: 8, borderRadius: '50%',
                 background: selected ? H_TANGER : 'transparent',
                 border: '1px solid ' + (selected ? H_TANGER : H_FAINT) } }),
      label);
  };

  const qIndustry = lang === 'es' ? '01 · Industria' : '01 · Industry';
  const qChallenge = lang === 'es' ? '02 · Fricción' : '02 · Friction';
  const qOutcome = lang === 'es' ? '03 · Impacto' : '03 · Impact';

  return hSection('dispatch', [
    hEyebrow(lang === 'es' ? 'DISPATCH · 3 PREGUNTAS' : 'DISPATCH · 3 QUESTIONS'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: H_SERIF, fontStyle: 'italic',
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 56px', maxWidth: 880 } },
      lang === 'es' ? '¿Qué tipo de negocio es este?' : 'What kind of business is this?'),

    React.createElement('div', { key: 'q1',
      style: { marginBottom: 40 }, role: 'radiogroup', 'aria-label': qIndustry },
      React.createElement('div', {
        style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                 color: H_MUTE, marginBottom: 14, textTransform: 'uppercase' } },
        qIndustry),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
        industries.map(opt =>
          renderChip(opt, perso.industry === opt.id, () => pickIndustry(opt.id)))),
      perso.industry === 'other' && React.createElement('input', {
        type: 'text', value: otherText, autoFocus: true,
        className: 'axius-h-input',
        id: 'dispatch-industry-other',
        onChange: (e) => {
          setOtherText(e.target.value);
          P.set({ industry: 'other', industryOther: e.target.value });
        },
        placeholder: lang === 'es' ? 'Cuéntanos en una palabra…' : 'Tell us in one word…',
        'aria-label': lang === 'es' ? 'Otra industria' : 'Other industry',
        style: { marginTop: 14, padding: '10px 14px', width: '100%', maxWidth: 360,
                 fontFamily: H_SANS, fontSize: 14, border: H_LINE,
                 background: H_CANVAS, color: H_INK, outline: 'none' } }),
    ),

    React.createElement('div', { key: 'q2',
      style: { marginBottom: 40 }, role: 'radiogroup', 'aria-label': qChallenge },
      React.createElement('div', {
        style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                 color: H_MUTE, marginBottom: 14, textTransform: 'uppercase' } },
        qChallenge),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
        challenges.map(opt =>
          renderChip(opt, perso.challenge === opt.id, () => pickChallenge(opt.id)))),
    ),

    React.createElement('div', { key: 'q3',
      style: { marginBottom: 32 }, role: 'radiogroup', 'aria-label': qOutcome },
      React.createElement('div', {
        style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                 color: H_MUTE, marginBottom: 14, textTransform: 'uppercase' } },
        qOutcome),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
        outcomes.map(opt =>
          renderChip(opt, perso.outcome === opt.id, () => pickOutcome(opt.id)))),
    ),

    generating && React.createElement('div', { key: 'gen', role: 'status', 'aria-live': 'polite',
      style: { fontFamily: H_MONO, fontSize: 13, letterSpacing: '0.18em',
               color: H_TANGER, marginTop: 16, textTransform: 'uppercase' } },
      (lang === 'es' ? 'GENERANDO PERFIL OPERATIVO' : 'GENERATING OPERATIONAL PROFILE') + dots),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 03 · PROBLEM
// ════════════════════════════════════════════════════════════════════════
function ProblemH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const cols = lang === 'es'
    ? [
        { label: 'El síntoma', body: 'Cinco contratistas.\nTres suscripciones.\nOcho herramientas inconexas.\nNadie es dueño del sistema completo.' },
        { label: 'El costo',   body: 'Cada herramienta se compró con optimismo.\nLa mayoría queda sub-utilizada.\nNada se acumula operativamente.' },
        { label: 'La resolución', body: 'Un partner operativo responsable.\nUn canal de comunicación.\nUn roadmap.\nUna relación mensual.' },
      ]
    : [
        { label: 'Symptom',    body: 'Five contractors.\nThree subscriptions.\nEight disconnected tools.\nNobody owns the whole system.' },
        { label: 'Cost',       body: 'Every tool was purchased with optimism.\nMost are underutilized.\nNothing compounds operationally.' },
        { label: 'Resolution', body: 'One accountable operating partner.\nOne communication channel.\nOne roadmap.\nOne monthly relationship.' },
      ];
  const headline1 = lang === 'es' ? 'Iniciaste un negocio.' : 'You started a business.';
  const headline2 = lang === 'es' ? 'No un departamento de tecnología.' : 'Not a technology department.';
  return hSection('problem', [
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: H_SERIF, fontStyle: 'italic',
               fontSize: 56, lineHeight: 1.05,
               letterSpacing: '-0.035em', margin: '0 0 64px', maxWidth: 880 } },
      headline1, React.createElement('br'),
      React.createElement('span', { style: { color: H_TANGER } }, headline2)),
    React.createElement('div', { key: 'grid',
      'data-axius-h-grid': '3col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40,
               borderTop: H_LINE_LO, paddingTop: 32 } },
      cols.map((c, i) => React.createElement('div', { key: i,
        style: { paddingLeft: 16, borderLeft: H_LINE_LO } },
        React.createElement('div', {
          style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: H_TANGER, marginBottom: 16, textTransform: 'uppercase' } },
          c.label),
        React.createElement('p', {
          style: { fontSize: 15, color: H_DIM, lineHeight: 1.65,
                   whiteSpace: 'pre-line', margin: 0 } },
          c.body),
      ))),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 04 · WHAT CHANGES
// ════════════════════════════════════════════════════════════════════════
function WhatChangesH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const data = window.AxiusBeforeAfterV3 || { before: [], after: [], outcomeMetrics: [] };
  const beforeList = lang === 'es' ? (data.beforeEs || data.before) : data.before;
  const afterList  = lang === 'es' ? (data.afterEs  || data.after)  : data.after;

  return hSection('what-changes', [
    hEyebrow(lang === 'es' ? 'QUÉ CAMBIA' : 'WHAT CHANGES'),
    React.createElement('div', { key: 'grid',
      'data-axius-h-grid': '2col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24,
               marginBottom: 56 } },
      React.createElement('div', { key: 'before',
        style: { padding: 32, border: H_LINE, background: H_CANVAS } },
        React.createElement('div', {
          style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: H_MUTE, marginBottom: 8, textTransform: 'uppercase' } },
          lang === 'es' ? 'ANTES' : 'BEFORE'),
        React.createElement('h3', {
          style: { fontFamily: H_SERIF, fontSize: 22, margin: '0 0 20px',
                   letterSpacing: '-0.02em' } },
          lang === 'es' ? 'El fundador gestiona:' : 'Founder manages:'),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
          beforeList.map((item, i) => React.createElement('li', { key: i,
            style: { padding: '8px 0', borderTop: i === 0 ? 'none' : H_LINE_LO,
                     fontSize: 15, color: H_DIM } },
            React.createElement('span', { style: { color: H_FAINT, marginRight: 10,
                                                     fontFamily: H_MONO, fontSize: 12 } }, '—'),
            item))),
      ),
      React.createElement('div', { key: 'after',
        style: { padding: 32, border: '2px solid ' + H_TANGER,
                 background: 'rgba(184,116,60,0.04)' } },
        React.createElement('div', {
          style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: H_TANGER, marginBottom: 8, textTransform: 'uppercase' } },
          lang === 'es' ? 'DESPUÉS' : 'AFTER'),
        React.createElement('h3', {
          style: { fontFamily: H_SERIF, fontSize: 22, margin: '0 0 20px',
                   letterSpacing: '-0.02em' } },
          lang === 'es' ? 'Axius es dueño de:' : 'Axius owns:'),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
          afterList.map((item, i) => React.createElement('li', { key: i,
            style: { padding: '8px 0', borderTop: i === 0 ? 'none' : H_LINE_LO,
                     fontSize: 15, color: H_INK } },
            React.createElement('span', { style: { color: H_TANGER, marginRight: 10,
                                                     fontFamily: H_MONO, fontSize: 12 } }, '+'),
            item))),
      ),
    ),
    window.axiusFabricationLive() && React.createElement('div', { key: 'metrics',
      'data-axius-h-grid': '4col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
               borderTop: H_LINE, borderBottom: H_LINE_LO } },
      (data.outcomeMetrics || []).map((m, i) => React.createElement('div', { key: i,
        style: { padding: '24px 20px',
                 borderLeft: i === 0 ? 'none' : H_LINE_LO } },
        React.createElement('div', { style: { fontFamily: H_MONO,
                                                fontSize: 10, letterSpacing: '0.18em',
                                                color: H_MUTE, marginBottom: 10 } },
          m.label),
        React.createElement('div', { style: { fontFamily: H_SERIF,
                                                fontSize: 24, letterSpacing: '-0.02em',
                                                color: H_INK } },
          m.value),
      )),
    ),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 05 · THE AXIUS METHOD
// ════════════════════════════════════════════════════════════════════════
function AxiusMethodHSection({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const stages = window.AxiusMethodV3 || [];
  return hSection('method', [
    hEyebrow(lang === 'es' ? 'EL MÉTODO AXIUS' : 'THE AXIUS METHOD'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: H_SERIF, fontStyle: 'italic',
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 56px', maxWidth: 880 } },
      lang === 'es' ? 'Cuatro etapas. Una sola línea de propiedad.' : 'Four stages. One line of ownership.'),
    React.createElement('div', { key: 'grid',
      'data-axius-h-grid': '4col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 } },
      stages.map(s => React.createElement('div', { key: s.n,
        style: { borderTop: H_LINE, paddingTop: 20 } },
        React.createElement('div', {
          style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: H_TANGER, marginBottom: 10 } },
          (lang === 'es' ? 'Etapa ' : 'Stage ') + s.n),
        React.createElement('h3', {
          style: { fontFamily: H_SERIF, fontSize: 24, margin: '0 0 16px',
                   letterSpacing: '-0.02em' } },
          s.name),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0,
                                                display: 'flex', flexDirection: 'column',
                                                gap: 8 } },
          (lang === 'es' ? s.bulletsEs : s.bullets).map((b, i) =>
            React.createElement('li', { key: i,
              style: { display: 'flex', alignItems: 'baseline', gap: 8,
                       fontSize: 14, color: H_DIM, lineHeight: 1.55 } },
              React.createElement('span', { style: { color: H_TANGER,
                                                       fontFamily: H_MONO,
                                                       fontSize: 11 } }, '+'),
              React.createElement('span', null, b)))),
      ))),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 06 · INDUSTRY MODULE
// ════════════════════════════════════════════════════════════════════════
function IndustryModuleH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const recs = window.AxiusRecommendationsV3 || {};
  const ind = perso.industry;

  const titles = {
    realestate:  lang === 'es' ? 'LO MÁS PEDIDO POR FIRMAS INMOBILIARIAS' : 'MOST REQUESTED BY REAL ESTATE FIRMS',
    healthcare:  lang === 'es' ? 'LO MÁS PEDIDO POR OPERADORES DE SALUD' : 'MOST REQUESTED BY HEALTHCARE OPERATORS',
    professional:lang === 'es' ? 'LO MÁS PEDIDO POR SERVICIOS PROFESIONALES' : 'MOST REQUESTED BY PROFESSIONAL SERVICES',
    ecommerce:   lang === 'es' ? 'LO MÁS PEDIDO POR OPERADORES DE ECOMMERCE' : 'MOST REQUESTED BY ECOMMERCE OPERATORS',
    education:   lang === 'es' ? 'LO MÁS PEDIDO POR OPERADORES DE EDUCACIÓN' : 'MOST REQUESTED BY EDUCATION OPERATORS',
    other:       lang === 'es' ? 'LO MÁS PEDIDO POR OPERADORES SMB' : 'MOST REQUESTED BY SMALL TO MID-MARKET OPERATORS',
  };
  const title = (ind && titles[ind]) ||
    (lang === 'es' ? 'LO MÁS PEDIDO POR OPERADORES SMB' : 'MOST REQUESTED BY SMALL TO MID-MARKET OPERATORS');

  function fallbackList(catId) {
    const cat = (window.AxiusCatalog || []).find(c => c.id === catId);
    if (!cat) return [];
    return (cat.samples || []).slice(0, 3).map(s => s.name);
  }
  const cell = recs[ind] || null;
  const sales = (cell && cell.sales) || fallbackList('sales');
  const operations = (cell && cell.operations) || fallbackList('ops');
  const aiList = (cell && cell.ai) || fallbackList('ai');

  const colDef = [
    { id: 'sales', heading: lang === 'es' ? 'Ventas' : 'Sales', items: sales },
    { id: 'ops',   heading: lang === 'es' ? 'Operaciones' : 'Operations', items: operations },
    { id: 'ai',    heading: 'AI', items: aiList },
  ];

  const scrollToCatalog = (e) => {
    e.preventDefault();
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return hSection('industry-module', [
    hEyebrow(title, true),
    React.createElement('div', { key: 'grid',
      'data-axius-h-grid': '3col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
               marginBottom: 32 } },
      colDef.map(col => React.createElement('div', { key: col.id,
        style: { padding: 28, border: H_LINE, background: H_CANVAS,
                 minHeight: 220 } },
        React.createElement('h3', {
          style: { fontFamily: H_SERIF, fontSize: 24, margin: '0 0 16px',
                   letterSpacing: '-0.02em' } }, col.heading),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
          col.items.map((item, i) => React.createElement('li', { key: i,
            style: { padding: '10px 0', borderTop: i === 0 ? 'none' : H_LINE_LO,
                     fontSize: 14, color: H_DIM,
                     display: 'flex', alignItems: 'baseline', gap: 10 } },
            React.createElement('span', { style: { color: H_TANGER,
                                                     fontFamily: H_MONO, fontSize: 11 } }, '+'),
            React.createElement('span', null, item)))),
      ))),
    React.createElement('a', { key: 'cta',
      className: 'axius-h-link',
      href: '#catalog', onClick: scrollToCatalog,
      'aria-label': lang === 'es' ? 'Ver catálogo completo' : 'View full capabilities catalog',
      style: { display: 'inline-flex', alignItems: 'center', gap: 10,
               fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
               color: H_TANGER, textDecoration: 'none', textTransform: 'uppercase' } },
      lang === 'es' ? 'Ver catálogo completo' : 'View Full Catalog',
      React.createElement('span', { style: { fontFamily: H_MONO } }, '→')),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 07 · RECOMMENDATIONS PANEL (NEW — ported from Option 2's RecommendationsPanel)
// Only renders when perso has both industry + challenge.
// Uses V3 perso (which uses V3 challenge ids — 'manual'/'sales'/etc.) — these
// won't be in Option 2's AxiusRecommendations matrix, so the panel falls back
// to the highest-affinity catalog category samples (acceptable per spec).
// ════════════════════════════════════════════════════════════════════════
function RecommendationsH({ perso }) {
  if (!perso || !perso.industry || !perso.challenge) return null;
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const rec = (window.AxiusRecommendations || {})[perso.industry] || {};
  const cell = rec[perso.challenge];

  const allSamples = (window.AxiusCatalog || []).flatMap(c =>
    (c.samples || []).map(s => Object.assign({}, s, { categoryId: c.id,
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
      Object.assign({}, s, { categoryId: c.id,
        categoryName: lang === 'es' ? c.nameEs : c.name })
    ));
    const seen = new Set(picks.map(p => p.n));
    for (const f of fallback) {
      if (picks.length >= 3) break;
      if (!seen.has(f.n)) { picks.push(f); seen.add(f.n); }
    }
  }
  if (picks.length === 0) return null;

  const rationale = cell && (lang === 'es' ? cell.rationaleES : cell.rationaleEN);
  // Resolve labels — try V3 taxonomies first (since DispatchH writes V3 ids).
  const indListV3 = window.AxiusIndustriesV3 || [];
  const challListV3 = window.AxiusChallengesV3 || [];
  const indRec = indListV3.find(x => x.id === perso.industry) ||
                 (window.AxiusIndustries || []).find(x => x.id === perso.industry);
  const challRec = challListV3.find(x => x.id === perso.challenge) ||
                   (window.AxiusChallenges || []).find(x => x.id === perso.challenge);
  const industryLabel = perso.industry === 'other'
    ? perso.industryOther
    : (indRec ? (lang === 'es' ? (indRec.labelEs || indRec.label) : indRec.label) : perso.industry);
  const challengeLabel = challRec
    ? (lang === 'es' ? (challRec.labelEs || challRec.label) : challRec.label)
    : perso.challenge;

  return React.createElement('section', { id: 'recommendations',
    'data-axius-h-section': true,
    style: { padding: '96px 32px', borderTop: H_LINE_LO,
             background: H_CANVAS, color: H_INK } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      hEyebrow(lang === 'es' ? 'TUS RECOMENDACIONES' : 'YOUR RECOMMENDATIONS', true),
      React.createElement('h2', {
        style: { fontFamily: H_SERIF, fontStyle: 'italic',
                 fontSize: 36, lineHeight: 1.1, margin: '0 0 32px',
                 letterSpacing: '-0.025em', color: H_INK, maxWidth: 880 } },
        lang === 'es'
          ? `Por dónde empezaríamos — tres flujos para ${industryLabel} con ${challengeLabel}.`
          : `Where we'd start — three workflows for ${industryLabel} dealing with ${challengeLabel}.`),
      React.createElement('div', {
        'data-axius-h-grid': '3col',
        style: { display: 'grid',
                 gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 } },
        picks.map(p => React.createElement('div', { key: p.n,
          style: { padding: 24, border: H_LINE, color: H_INK,
                   background: H_CANVAS } },
          React.createElement('div', { style: { fontFamily: H_MONO,
                                                  fontSize: 11, letterSpacing: '0.18em',
                                                  color: H_MUTE, textTransform: 'uppercase' } },
            `N ${p.n} · ${p.categoryName}`),
          React.createElement('h3', { style: { fontSize: 20, margin: '8px 0',
                                                 fontFamily: H_SERIF, letterSpacing: '-0.02em' } }, p.name),
          React.createElement('p',  { style: { color: H_DIM, fontSize: 14, margin: 0, lineHeight: 1.5 } }, p.sub),
          React.createElement('div', { style: { marginTop: 16, fontSize: 12,
                                                  color: H_MUTE, fontFamily: H_MONO,
                                                  letterSpacing: '0.08em' } },
            `${p.pts} pts · ${p.time}`),
        )),
      ),
      rationale && React.createElement('p', {
        style: { marginTop: 24, fontStyle: 'italic',
                 fontFamily: H_SERIF, fontSize: 16,
                 color: H_DIM, maxWidth: 720 } },
        rationale),
      React.createElement('a', {
        className: 'axius-h-link',
        href: '#catalog',
        onClick: (e) => {
          e.preventDefault();
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        'aria-label': lang === 'es' ? 'Explorar catálogo completo' : 'Browse the full catalog',
        style: { display: 'inline-flex', alignItems: 'center', gap: 8,
                 marginTop: 24,
                 fontFamily: H_MONO, fontSize: 11,
                 letterSpacing: '0.18em', textDecoration: 'none',
                 color: H_TANGER, textTransform: 'uppercase' } },
        lang === 'es' ? 'O explorar el catálogo completo' : 'Or browse the full catalog',
        React.createElement('span', null, '↓')),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 08 · CATALOG (NEW — ported from Option 2's CatalogF)
// ════════════════════════════════════════════════════════════════════════
function CatalogH({ perso }) {
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
  const indListV3 = window.AxiusIndustriesV3 || [];
  const indRec = indListV3.find(x => x.id === ind) ||
                 (window.AxiusIndustries || []).find(x => x.id === ind);
  const indLabel = ind === 'other'
    ? perso.industryOther
    : (indRec ? (lang === 'es' ? (indRec.labelEs || indRec.label) : indRec.label) : ind);

  return React.createElement('section', { id: 'catalog',
    'data-axius-h-section': true,
    style: { padding: '96px 32px', borderTop: H_LINE_LO,
             background: H_CANVAS, color: H_INK } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      hEyebrow(lang === 'es' ? 'CATÁLOGO DE CAPACIDADES' : 'CAPABILITIES CATALOG'),
      React.createElement('h2', {
        style: { fontFamily: H_SERIF, fontStyle: 'italic',
                 fontSize: 48, lineHeight: 1.05,
                 letterSpacing: '-0.03em', margin: '0 0 32px', maxWidth: 880 } },
        lang === 'es' ? 'Nueve categorías. Una sola capa operativa.' : 'Nine categories. One operating layer.'),
      filterOn && React.createElement('div', { role: 'status', 'aria-live': 'polite',
        style: { display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', marginBottom: 32,
        padding: '12px 16px', border: H_LINE_LO,
        background: 'rgba(184,116,60,0.04)',
        fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
        color: H_MUTE, flexWrap: 'wrap', gap: 8 } },
        React.createElement('span', null, lang === 'es'
          ? `Mostrando ${shownCount} de ${totalCount} capacidades para ${indLabel || ind}`
          : `Showing ${shownCount} of ${totalCount} capabilities for ${indLabel || ind}`),
        React.createElement('button', {
          type: 'button', onClick: () => setViewAll(true),
          className: 'axius-h-btn',
          'aria-label': lang === 'es' ? 'Mostrar todas las categorías del catálogo' : 'Show all catalog categories',
          style: { background: 'transparent', border: 'none', cursor: 'pointer',
                   fontFamily: H_MONO, fontSize: 11,
                   letterSpacing: '0.18em', color: H_TANGER } },
          lang === 'es' ? 'VER TODO →' : 'VIEW ALL →'),
      ),
      shown.map(c => React.createElement('div', { key: c.id,
        style: { marginBottom: 48, paddingTop: 16, borderTop: H_LINE_LO } },
        React.createElement('h3', { style: { fontSize: 24, margin: '0 0 4px',
                                                fontFamily: H_SERIF, letterSpacing: '-0.02em' } },
          lang === 'es' ? c.nameEs : c.name),
        React.createElement('div', { style: { fontSize: 12, color: H_MUTE,
                                                fontFamily: H_MONO,
                                                letterSpacing: '0.16em', marginBottom: 16 } },
          c.stack),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
          (c.samples || []).map(s => React.createElement('li', { key: s.n,
            style: { padding: '10px 0', borderTop: H_LINE_LO, fontSize: 14,
                     color: H_DIM, lineHeight: 1.55 } },
            React.createElement('span', { style: { fontFamily: H_MONO,
                                                     fontSize: 11, letterSpacing: '0.18em',
                                                     color: H_MUTE } },
              `N ${s.n}`),
            ' · ',
            React.createElement('span', { style: { color: H_INK, fontWeight: 500 } }, s.name),
            ' — ',
            React.createElement('span', { style: { color: H_DIM } }, s.sub),
            React.createElement('span', { style: { fontFamily: H_MONO,
                                                     color: H_MUTE, fontSize: 11,
                                                     letterSpacing: '0.08em', marginLeft: 6 } },
              `(${s.pts} pts · ${s.time})`))),
        ),
        React.createElement('p', { style: { fontSize: 13, fontStyle: 'italic',
                                              color: H_MUTE, marginTop: 8 } },
          lang === 'es'
            ? `+ ${c.count - (c.samples||[]).length} más`
            : `+ ${c.count - (c.samples||[]).length} more`),
      )),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 09 · WHY AXIUS — comparison table
// ════════════════════════════════════════════════════════════════════════
function WhyAxiusH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const rows = window.AxiusComparisonV3 || [];
  const headers = lang === 'es'
    ? ['', 'Freelancer', 'Empleado', 'Axius']
    : ['', 'Freelancer', 'Employee', 'Axius'];

  return hSection('why-axius', [
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: H_SERIF, fontStyle: 'italic',
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 48px', maxWidth: 880 } },
      lang === 'es' ? 'La mayoría ofrece experticia.' : 'Most providers offer expertise.',
      React.createElement('br'),
      React.createElement('span', { style: { color: H_TANGER } },
        lang === 'es' ? 'Axius ofrece propiedad.' : 'Axius provides ownership.')),
    React.createElement('div', { key: 'table', style: { overflowX: 'auto' } },
      React.createElement('table', {
        style: { width: '100%', borderCollapse: 'collapse',
                 fontFamily: H_SANS, fontSize: 14, color: H_INK } },
        React.createElement('thead', null,
          React.createElement('tr', null,
            headers.map((h, i) => React.createElement('th', { key: i,
              style: { textAlign: 'left', padding: '14px 16px',
                       borderBottom: H_LINE,
                       fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                       color: i === 3 ? H_TANGER : H_MUTE,
                       textTransform: 'uppercase' } }, h)))),
        React.createElement('tbody', null,
          rows.map((r, i) => React.createElement('tr', { key: i,
            style: { borderBottom: H_LINE_LO } },
            React.createElement('td', {
              style: { padding: '14px 16px', color: H_FAINT,
                       fontFamily: H_MONO, fontSize: 10, letterSpacing: '0.12em' } },
              String(i + 1).padStart(2, '0')),
            React.createElement('td', { style: { padding: '14px 16px', color: H_DIM } },
              lang === 'es' ? r.freelancerEs : r.freelancer),
            React.createElement('td', { style: { padding: '14px 16px', color: H_DIM } },
              lang === 'es' ? r.employeeEs : r.employee),
            React.createElement('td', { style: { padding: '14px 16px',
                                                    color: H_TANGER, fontWeight: 600 } },
              lang === 'es' ? r.axiusEs : r.axius),
          )),
        ),
      ),
    ),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 10 · THE MODEL — 3 pillars
// ════════════════════════════════════════════════════════════════════════
function AxiusModelHSection({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const pillars = window.AxiusModelV3 || [];
  return hSection('model', [
    hEyebrow(lang === 'es' ? 'UNA SOLA CAPA RESPONSABLE' : 'ONE ACCOUNTABLE LAYER'),
    React.createElement('div', { key: 'grid',
      'data-axius-h-grid': '3col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
      pillars.map(p => React.createElement('div', { key: p.id,
        style: { padding: 32, border: H_LINE, background: H_CANVAS,
                 minHeight: 320 } },
        React.createElement('div', {
          style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: H_TANGER, marginBottom: 24, textTransform: 'uppercase' } },
          p.name),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0,
                                                display: 'flex', flexDirection: 'column',
                                                gap: 10 } },
          (lang === 'es' ? p.bulletsEs : p.bullets).map((b, i) =>
            React.createElement('li', { key: i,
              style: { padding: '8px 0', borderTop: i === 0 ? 'none' : H_LINE_LO,
                       display: 'flex', alignItems: 'baseline', gap: 10,
                       fontSize: 15, color: H_INK } },
              React.createElement('span', { style: { color: H_TANGER,
                                                       fontFamily: H_MONO, fontSize: 11 } }, '+'),
              React.createElement('span', null, b)))),
      )),
    ),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 11 · PRICING — 3 tiles
// ════════════════════════════════════════════════════════════════════════
function PricingH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const tiers = window.AxiusPricingV3 || [];
  const bookingHref = (window.AxiusConfig && window.AxiusConfig.bookingUrl)
                       || 'mailto:andres@axius.tech?subject=Axius Department engagement';

  return hSection('pricing', [
    hEyebrow(lang === 'es' ? 'PRECIOS' : 'PRICING'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: H_SERIF, fontStyle: 'italic',
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 48px', maxWidth: 880 } },
      lang === 'es' ? 'Tres maneras de empezar.' : 'Three ways to begin.'),
    React.createElement('div', { key: 'grid',
      'data-axius-h-grid': '3col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
      tiers.map(t => {
        const featured = t.featured;
        const sub  = lang === 'es' ? (t.subEs || t.sub) : t.sub;
        const body = lang === 'es' ? (t.bodyEs || t.body) : t.body;
        const priceLine = lang === 'es' ? (t.priceLineEs || t.priceLine) : t.priceLine;
        const ctaText = t.checkoutUrl
          ? (lang === 'es' ? 'Empezar' : 'Get Started')
          : (lang === 'es' ? 'Iniciar conversación' : 'Begin a Conversation');
        const ctaHref = t.checkoutUrl || bookingHref;

        return React.createElement('div', { key: t.id,
          style: { border: featured ? '2px solid ' + H_TANGER : H_LINE,
                   padding: 32, background: H_CANVAS,
                   display: 'flex', flexDirection: 'column', minHeight: 280,
                   position: 'relative' } },
          featured && React.createElement('div', {
            style: { position: 'absolute', top: -12, left: 24,
                     background: H_TANGER, color: H_CANVAS,
                     fontFamily: H_MONO, fontSize: 10, letterSpacing: '0.18em',
                     padding: '4px 10px', textTransform: 'uppercase' } },
            lang === 'es' ? 'Más Popular' : 'Most Popular'),
          React.createElement('h3', {
            style: { fontFamily: H_SERIF, fontSize: 32, margin: '0 0 12px',
                     letterSpacing: '-0.025em' } }, t.name),
          React.createElement('div', {
            style: { fontSize: 15, color: H_DIM, marginBottom: 20, lineHeight: 1.5 } },
            sub),
          body && React.createElement('div', {
            style: { fontSize: 14, color: H_DIM, marginBottom: 20,
                     lineHeight: 1.55, fontStyle: 'italic' } },
            body),
          priceLine && React.createElement('div', {
            style: { fontFamily: H_MONO, fontSize: 14, color: H_INK,
                     marginBottom: 24, letterSpacing: '0.04em' } },
            priceLine),
          React.createElement('div', { style: { marginTop: 'auto' } },
            React.createElement('a', {
              className: 'axius-h-link',
              href: ctaHref, target: '_blank', rel: 'noopener noreferrer',
              'aria-label': ctaText + ' — ' + t.name,
              style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                       background: featured ? H_TANGER : H_INK,
                       color: H_CANVAS, border: '1px solid ' + (featured ? H_TANGER : H_INK),
                       padding: '12px 20px',
                       fontFamily: H_SANS, fontSize: 13, fontWeight: 500,
                       textDecoration: 'none', letterSpacing: '-0.005em' } },
              ctaText,
              React.createElement('span', { style: { fontFamily: H_MONO,
                                                        color: featured ? H_CANVAS : H_TANGER,
                                                        fontSize: 12 } }, '→')),
          ),
        );
      })),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 12 · FOUNDER
// ════════════════════════════════════════════════════════════════════════
function FounderH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const f = window.AxiusFounder || {};
  const [photoFailed, setPhotoFailed] = React.useState(false);
  const fallbackCaption = (f.name || 'Andrés Toro') + ' · ' +
    (lang === 'es' ? 'foto no disponible' : 'photo unavailable');
  return hSection('founder', [
    hEyebrow(lang === 'es' ? 'POR QUÉ EXISTE AXIUS' : 'WHY AXIUS EXISTS'),
    window.AxiusVisual && window.AxiusVisual.FounderVideoF
      && React.createElement(window.AxiusVisual.FounderVideoF, { key: 'fv' }),
    React.createElement('div', { key: 'grid',
      'data-axius-h-grid': '2col',
      style: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56,
               alignItems: 'start' } },
      React.createElement('div', { key: 'photo' },
        React.createElement('div', {
          style: { aspectRatio: '3/4', width: '100%',
                   border: H_LINE, overflow: 'hidden', background: '#E9E6DF',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   padding: photoFailed ? 24 : 0 } },
          !photoFailed && React.createElement('img', {
            src: f.photo, alt: f.name || 'Andrés Toro, founder of Axius',
            onError: () => setPhotoFailed(true),
            style: { width: '100%', height: '100%', objectFit: 'cover',
                     filter: 'grayscale(.15) contrast(1.04)' } }),
          photoFailed && React.createElement('div', {
            role: 'img', 'aria-label': fallbackCaption,
            style: { fontFamily: H_MONO, fontSize: 12, letterSpacing: '0.12em',
                     color: H_MUTE, textAlign: 'center', textTransform: 'uppercase' } },
            fallbackCaption),
        ),
        React.createElement('div', {
          style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: H_MUTE, marginTop: 12, textTransform: 'uppercase' } },
          'Fig. 01 · ' + (lang === 'es' ? 'Fundador' : 'Founder')),
      ),
      React.createElement('div', { key: 'bio' },
        React.createElement('h2', {
          style: { fontFamily: H_SERIF, fontStyle: 'italic',
                   fontSize: 40, lineHeight: 1.05,
                   letterSpacing: '-0.03em', margin: '0 0 24px' } },
          lang === 'es' ? 'La mano sobre tus operaciones.' : 'The hand on your operations.'),
        React.createElement('p', {
          style: { fontSize: 16, color: H_DIM, lineHeight: 1.7,
                   whiteSpace: 'pre-line', margin: '0 0 32px' } },
          lang === 'es' ? (f.bioEs || '') : (f.bio || '')),
        React.createElement('blockquote', {
          style: { fontFamily: H_SERIF, fontStyle: 'italic', fontSize: 20,
                   lineHeight: 1.45, color: H_INK, margin: '0 0 32px',
                   borderLeft: '2px solid ' + H_TANGER, paddingLeft: 20 } },
          lang === 'es' ? (f.quoteEs || '') : (f.quote || '')),
        React.createElement('div', {
          style: { fontFamily: H_MONO, fontSize: 12, letterSpacing: '0.12em',
                   color: H_MUTE, display: 'flex', flexWrap: 'wrap', gap: 16 } },
          (f.facts || []).map((fact, i) => React.createElement('span', { key: i },
            fact.k.toUpperCase() + ' · ' + fact.v))),
      ),
    ),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 13 · PROOF — operational results by industry (fabricated, guarded)
// ════════════════════════════════════════════════════════════════════════
function ProofH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const live = window.axiusFabricationLive();
  const proof = window.AxiusProofV3 || [];

  return hSection('proof', [
    hEyebrow(lang === 'es' ? 'RESULTADOS OPERATIVOS' : 'OPERATIONAL RESULTS'),
    live
      ? React.createElement('div', { key: 'grid',
          'data-axius-h-grid': '3col',
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
          proof.map((p, i) => React.createElement('div', { key: i,
            style: { padding: 32, border: H_LINE, background: H_CANVAS,
                     minHeight: 180,
                     display: 'flex', flexDirection: 'column',
                     justifyContent: 'space-between' } },
            React.createElement('div', null,
              React.createElement('div', {
                style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                         color: H_TANGER, marginBottom: 10, textTransform: 'uppercase' } },
                lang === 'es' ? p.industryEs : p.industry),
              React.createElement('div', {
                style: { fontFamily: H_SANS, fontSize: 14, color: H_DIM,
                         marginBottom: 16 } },
                lang === 'es' ? (p.metricEs || p.metric) : p.metric)),
            React.createElement('div', {
              style: { fontFamily: H_SERIF, fontSize: 36, letterSpacing: '-0.025em',
                       color: H_INK } },
              p.value),
          )))
      : React.createElement('p', { key: 'empty',
          style: { fontFamily: H_SANS, fontSize: 15,
                   fontStyle: 'italic', maxWidth: 600, color: H_INK } },
          lang === 'es'
            ? 'Resultados verificados en revisión — los publicaremos cuando los clientes los firmen.'
            : 'Verified results in review — we will publish them once clients sign off.'),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 14 · CONTACT FORM (NEW)
// Posts to Telegram bridge fire-and-forget; falls back to mailto link when
// the webhook is missing/placeholder.
// ════════════════════════════════════════════════════════════════════════
function ContactFormH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const cfg = window.AxiusConfig || {};

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Telegram bridge live? (Same gating as postToTelegram in Option 2.)
  const bridgeLive = Boolean(
    cfg.ringWebhookUrl &&
    cfg.ringWebhookChatId &&
    cfg.ringWebhookUrl.indexOf('YOUR_TELEGRAM_BOT_TOKEN') === -1 &&
    cfg.ringWebhookChatId !== 'YOUR_TELEGRAM_CHAT_ID');

  const mailtoFallback = (n, e, m) => {
    const subject = encodeURIComponent('Axius — new inquiry from ' + (n || 'web form'));
    const body = encodeURIComponent(
      'Name: ' + (n || '-') + '\n' +
      'Email: ' + (e || '-') + '\n\n' +
      'Message:\n' + (m || '-') + '\n\n' +
      '---\n' +
      'industry=' + (perso.industry || '-') +
      ' challenge=' + (perso.challenge || '-') +
      ' outcome=' + (perso.outcome || '-'));
    window.location.href = 'mailto:andres@axius.tech?subject=' + subject + '&body=' + body;
  };

  const postToBridge = (n, e, m) => {
    if (!bridgeLive) return false;
    const ctx = `[axius option4 ${lang.toUpperCase()}] industry=${perso.industry || '-'} challenge=${perso.challenge || '-'} outcome=${perso.outcome || '-'}`;
    const text = `${ctx}\n\nNAME: ${n}\nEMAIL: ${e}\n\n${m || '(no message)'}`;
    const payload = {
      chat_id: cfg.ringWebhookChatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    };
    try {
      fetch(cfg.ringWebhookUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
      return true;
    } catch (_) { return false; }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const n = name.trim();
    const em = email.trim();
    const m = message.trim();
    if (!n || !em) {
      setError(lang === 'es' ? 'Por favor completa nombre y email.' : 'Please add your name and email.');
      return;
    }
    if (bridgeLive) {
      postToBridge(n, em, m);
      setSent(true);
    } else {
      mailtoFallback(n, em, m);
      setSent(true);
    }
  };

  const heading = lang === 'es' ? 'Empieza una conversación.' : 'Start a conversation.';
  const sub = lang === 'es'
    ? 'Cuéntanos brevemente qué quieres operar diferente — Andrés responde personalmente en menos de 24 horas.'
    : "Tell us briefly what you'd like to run differently — Andrés replies personally within 24 hours.";
  const labelName = lang === 'es' ? 'Nombre' : 'Name';
  const labelEmail = lang === 'es' ? 'Email' : 'Email';
  const labelMessage = lang === 'es' ? 'Mensaje (opcional)' : 'Message (optional)';
  const submitText = lang === 'es' ? 'Iniciar conversación' : 'Start a conversation';
  const successText = lang === 'es'
    ? 'Gracias — Andrés te escribirá en menos de 24h.'
    : "Got it — Andrés will be in touch within 24h.";
  const orBook = lang === 'es' ? 'o agenda una llamada de 30 min' : 'or book a 30-min call';

  const bookingHref = cfg.bookingUrl || 'mailto:andres@axius.tech';

  return React.createElement('section', { id: 'contact',
    'data-axius-h-section': true,
    style: { padding: '96px 32px', borderTop: H_LINE_LO,
             background: H_CANVAS, color: H_INK } },
    React.createElement('div', { style: { maxWidth: 720, margin: '0 auto' } },
      hEyebrow(lang === 'es' ? 'CONTACTO DIRECTO' : 'DIRECT LINE'),
      React.createElement('h2', {
        style: { fontFamily: H_SERIF, fontStyle: 'italic',
                 fontSize: 40, lineHeight: 1.05,
                 letterSpacing: '-0.03em', margin: '0 0 16px' } },
        heading),
      React.createElement('p', {
        style: { fontFamily: H_SANS, fontSize: 16, color: H_DIM,
                 lineHeight: 1.6, margin: '0 0 32px', maxWidth: 600 } },
        sub),

      sent
        ? React.createElement('div', { role: 'status', 'aria-live': 'polite',
            style: { padding: 24, border: '2px solid ' + H_TANGER,
                     background: 'rgba(184,116,60,0.06)' } },
            React.createElement('div', {
              style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                       color: H_TANGER, marginBottom: 8, textTransform: 'uppercase' } },
              lang === 'es' ? 'ENVIADO' : 'SENT'),
            React.createElement('p', {
              style: { fontFamily: H_SERIF, fontSize: 20, lineHeight: 1.4,
                       margin: 0, color: H_INK } },
              successText))
        : React.createElement('form', {
            onSubmit, noValidate: true,
            style: { display: 'flex', flexDirection: 'column', gap: 16 } },
            React.createElement('div', {
              'data-axius-h-grid': '2col',
              style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 } },
              React.createElement('div', null,
                React.createElement('label', {
                  htmlFor: 'contact-name',
                  style: { display: 'block', fontFamily: H_MONO, fontSize: 11,
                           letterSpacing: '0.18em', color: H_MUTE,
                           marginBottom: 8, textTransform: 'uppercase' } },
                  labelName + ' *'),
                React.createElement('input', {
                  id: 'contact-name', name: 'name', type: 'text',
                  className: 'axius-h-input',
                  required: true, autoComplete: 'name',
                  value: name, onChange: (e) => setName(e.target.value),
                  'aria-label': labelName, 'aria-required': true,
                  style: { width: '100%', padding: '10px 14px',
                           fontFamily: H_SANS, fontSize: 15,
                           border: H_LINE, background: H_CANVAS,
                           color: H_INK, outline: 'none',
                           boxSizing: 'border-box' } }),
              ),
              React.createElement('div', null,
                React.createElement('label', {
                  htmlFor: 'contact-email',
                  style: { display: 'block', fontFamily: H_MONO, fontSize: 11,
                           letterSpacing: '0.18em', color: H_MUTE,
                           marginBottom: 8, textTransform: 'uppercase' } },
                  labelEmail + ' *'),
                React.createElement('input', {
                  id: 'contact-email', name: 'email', type: 'email',
                  className: 'axius-h-input',
                  required: true, autoComplete: 'email',
                  value: email, onChange: (e) => setEmail(e.target.value),
                  'aria-label': labelEmail, 'aria-required': true,
                  style: { width: '100%', padding: '10px 14px',
                           fontFamily: H_SANS, fontSize: 15,
                           border: H_LINE, background: H_CANVAS,
                           color: H_INK, outline: 'none',
                           boxSizing: 'border-box' } }),
              ),
            ),
            React.createElement('div', null,
              React.createElement('label', {
                htmlFor: 'contact-message',
                style: { display: 'block', fontFamily: H_MONO, fontSize: 11,
                         letterSpacing: '0.18em', color: H_MUTE,
                         marginBottom: 8, textTransform: 'uppercase' } },
                labelMessage),
              React.createElement('textarea', {
                id: 'contact-message', name: 'message',
                className: 'axius-h-input',
                rows: 4,
                value: message, onChange: (e) => setMessage(e.target.value),
                'aria-label': labelMessage,
                style: { width: '100%', padding: '10px 14px',
                         fontFamily: H_SANS, fontSize: 15,
                         border: H_LINE, background: H_CANVAS,
                         color: H_INK, outline: 'none',
                         resize: 'vertical', boxSizing: 'border-box' } }),
            ),
            error && React.createElement('div', {
              role: 'alert', 'aria-live': 'polite',
              style: { fontFamily: H_MONO, fontSize: 12,
                       letterSpacing: '0.12em', color: '#A36B62' } },
              error),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center',
                       gap: 24, flexWrap: 'wrap', marginTop: 8 } },
              React.createElement('button', {
                type: 'submit',
                className: 'axius-h-btn',
                'aria-label': submitText,
                style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                         background: H_INK, color: H_CANVAS,
                         border: '1px solid ' + H_INK, padding: '12px 22px',
                         fontFamily: H_SANS, fontSize: 14, fontWeight: 500,
                         cursor: 'pointer', letterSpacing: '-0.005em' } },
                submitText,
                React.createElement('span', { style: { fontFamily: H_MONO,
                                                          color: H_TANGER, fontSize: 13 } }, '→')),
              React.createElement('a', {
                className: 'axius-h-link',
                href: bookingHref, target: '_blank', rel: 'noopener noreferrer',
                'aria-label': orBook,
                style: { fontFamily: H_MONO, fontSize: 11,
                         letterSpacing: '0.18em', color: H_TANGER,
                         textDecoration: 'none', textTransform: 'uppercase' } },
                orBook + ' →'),
            ),
          ),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 15 · FINAL CTA
// ════════════════════════════════════════════════════════════════════════
function FinalCTAH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const bookingHref = (window.AxiusConfig && window.AxiusConfig.bookingUrl)
                       || 'mailto:andres@axius.tech';
  const items = lang === 'es'
    ? ['Cuellos de botella identificados', 'Oportunidades priorizadas',
       'Recomendaciones inmediatas', 'Roadmap incluido']
    : ['Bottlenecks identified', 'Opportunities prioritized',
       'Immediate recommendations', 'Roadmap included'];
  return hSection('cta', [
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: H_SERIF, fontStyle: 'italic',
               fontSize: 72, lineHeight: 1.02,
               letterSpacing: '-0.04em', margin: '0 0 40px', maxWidth: 920 } },
      lang === 'es' ? 'Treinta minutos.' : 'Thirty minutes.',
      React.createElement('br'),
      React.createElement('span', { style: { color: H_TANGER } },
        lang === 'es' ? 'Claridad completa.' : 'Complete clarity.')),
    React.createElement('ul', { key: 'list',
      'data-axius-h-grid': '2col',
      style: { listStyle: 'none', padding: 0, margin: '0 0 40px',
               display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12,
               maxWidth: 680 } },
      items.map((item, i) => React.createElement('li', { key: i,
        style: { display: 'flex', alignItems: 'baseline', gap: 12,
                 fontSize: 16, color: H_INK, fontFamily: H_SANS } },
        React.createElement('span', { style: { color: H_TANGER, fontSize: 16 } }, '✓'),
        React.createElement('span', null, item)))),
    React.createElement('a', { key: 'btn',
      className: 'axius-h-link',
      href: bookingHref, target: '_blank', rel: 'noopener noreferrer',
      'aria-label': lang === 'es' ? 'Iniciar una conversación — agendar llamada' : 'Begin a conversation — book a call',
      style: { display: 'inline-flex', alignItems: 'center', gap: 12,
               background: H_INK, color: H_CANVAS,
               border: '1px solid ' + H_INK, padding: '16px 28px',
               fontFamily: H_SANS, fontSize: 14, fontWeight: 500,
               textDecoration: 'none' } },
      lang === 'es' ? 'Iniciar una conversación' : 'Begin a Conversation',
      React.createElement('span', { style: { fontFamily: H_MONO,
                                                color: H_TANGER, fontSize: 13 } }, '→')),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 16 · FOOTER (NEW)
// ════════════════════════════════════════════════════════════════════════
function FooterH({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const fcfg = window.AxiusFooterV4 || {};
  const cols = fcfg.columns || [];
  const legalEntity = lang === 'es' ? (fcfg.legalEntityEs || fcfg.legalEntity) : fcfg.legalEntity;
  const basedLine = lang === 'es' ? (fcfg.basedLineEs || fcfg.basedLine) : fcfg.basedLine;
  const email = fcfg.email || 'andres@axius.tech';
  const year = fcfg.copyrightYear || 2026;
  const madeWith = lang === 'es' ? 'Hecho con intención en Medellín' : 'Made with intent in Medellín';

  const handleAnchor = (href) => (e) => {
    if (href.charAt(0) === '#') {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return React.createElement('footer', { id: 'footer', role: 'contentinfo',
    'data-axius-h-section': true,
    style: { padding: '72px 32px 48px',
             background: H_CANVAS_LO,
             color: H_INK, borderTop: H_LINE_LO } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('div', {
        'data-axius-h-footer-grid': true,
        style: { display: 'grid',
                 gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: 40,
                 marginBottom: 48 } },
        // Brand column
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontFamily: H_MONO, fontSize: 14, letterSpacing: '0.22em',
                     color: H_INK, fontWeight: 600, marginBottom: 16 } },
            'AXIUS', React.createElement('span', { style: { color: H_TANGER } }, '.')),
          React.createElement('p', {
            style: { fontFamily: H_SERIF, fontSize: 15, lineHeight: 1.55,
                     color: H_DIM, margin: '0 0 16px', maxWidth: 320 } },
            legalEntity),
          React.createElement('div', {
            style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.12em',
                     color: H_MUTE, marginBottom: 8 } },
            basedLine),
          React.createElement('a', {
            className: 'axius-h-link',
            href: 'mailto:' + email,
            'aria-label': lang === 'es' ? 'Enviar email a Andrés' : 'Email Andrés directly',
            style: { fontFamily: H_MONO, fontSize: 12, letterSpacing: '0.12em',
                     color: H_INK, textDecoration: 'none',
                     borderBottom: '1px solid ' + H_TANGER, paddingBottom: 1 } },
            email),
        ),
        // 3 link columns
        cols.map((col, i) => React.createElement('div', { key: i },
          React.createElement('div', {
            style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.18em',
                     color: H_MUTE, marginBottom: 16, textTransform: 'uppercase' } },
            lang === 'es' ? (col.headEs || col.headEn) : col.headEn),
          React.createElement('ul', {
            style: { listStyle: 'none', padding: 0, margin: 0,
                     display: 'flex', flexDirection: 'column', gap: 12 } },
            (col.links || []).map((lnk, j) => {
              const label = lang === 'es' ? (lnk.labelEs || lnk.labelEn) : lnk.labelEn;
              const isExternal = /^https?:|^mailto:|^tel:/.test(lnk.href);
              const isAnchor = lnk.href.charAt(0) === '#';
              const props = {
                className: 'axius-h-link',
                href: lnk.href,
                'aria-label': label,
                style: { fontFamily: H_SANS, fontSize: 14,
                         color: H_INK, textDecoration: 'none',
                         lineHeight: 1.4,
                         borderBottom: '1px solid transparent',
                         transition: 'border-color 0.12s ease' },
              };
              if (isExternal) {
                props.target = '_blank';
                props.rel = 'noopener noreferrer';
              }
              if (isAnchor) {
                props.onClick = handleAnchor(lnk.href);
              }
              return React.createElement('li', { key: j },
                React.createElement('a', props, label));
            })),
        )),
      ),
      // Bottom row
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between',
                 alignItems: 'center', borderTop: H_LINE_LO,
                 paddingTop: 24, flexWrap: 'wrap', gap: 12 } },
        React.createElement('div', {
          style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.12em',
                   color: H_MUTE } },
          '© ' + year + ' Axius · ' + email),
        React.createElement('div', {
          style: { fontFamily: H_MONO, fontSize: 11, letterSpacing: '0.12em',
                   color: H_MUTE, fontStyle: 'italic' } },
          madeWith),
      ),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// Composition root
// ════════════════════════════════════════════════════════════════════════
window.AxiusDirectionH = function () {
  const P = window.AxiusPersonalization;
  const [perso, setPerso] = React.useState(P.get);
  React.useEffect(() => P.subscribe(setPerso), []);
  React.useEffect(() => {
    if (window.AxiusVisual && window.AxiusVisual.installStyles)
      window.AxiusVisual.installStyles();
    installH4Styles();
  }, []);

  return React.createElement('div', {
    id: 'axius-direction-H-body',
    style: { background: H_CANVAS, color: H_INK, minHeight: '100vh' } },
    React.createElement('a', { className: 'axius-skip-link', href: '#hero',
      'aria-label': 'Skip to main content' }, 'Skip to content'),
    React.createElement(StickyCTAH, { perso }),
    React.createElement(HeroH, { perso }),
    React.createElement(DispatchH, { perso }),
    React.createElement(ProblemH, { perso }),
    React.createElement(WhatChangesH, { perso }),
    React.createElement(AxiusMethodHSection, { perso }),
    React.createElement(IndustryModuleH, { perso }),
    React.createElement(RecommendationsH, { perso }),
    React.createElement(CatalogH, { perso }),
    React.createElement(WhyAxiusH, { perso }),
    React.createElement(AxiusModelHSection, { perso }),
    React.createElement(PricingH, { perso }),
    React.createElement(FounderH, { perso }),
    React.createElement(ProofH, { perso }),
    React.createElement(ContactFormH, { perso }),
    React.createElement(FinalCTAH, { perso }),
    React.createElement(FooterH, { perso }),
  );
};

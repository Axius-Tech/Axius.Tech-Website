// axius-direction-G.jsx — Composition root for Option 3 (technology-operating-partner variant).
// Mounted at /v3 by v3/index.html. Coexists with Option 2 at / and Option 1 at /v1.
//
// Architecture notes:
//   • Preserves Quiet 0.5's visual identity (cream canvas #F7F6F2, ink #0F0E0C,
//     tangerine accent #B8743C, Source Serif 4 / Inter / JetBrains Mono).
//   • Reorganizes the page flow per the Option 3 brief: hero → dispatch (3-question
//     diagnostic on one screen) → problem → what changes → method → industry module
//     → why axius → model → pricing → founder → proof → final CTA.
//   • REUSES window.AxiusPersonalization (same store Option 2 uses). Option 3 writes
//     V3-taxonomy ids back into that store. If a visitor then visits /, Option 2's
//     filter sees ids it doesn't recognize and falls back to its generic catalog
//     state — acceptable per the spec.
//   • React.createElement only (no JSX).
//   • Fabricated outcome/proof metrics are wrapped in window.axiusFabricationLive()
//     so they auto-unmount past 2026-08-01, matching Option 2's discipline.

// ─── Light-canvas style constants ─────────────────────────────
const G_INK     = '#0F0E0C';
const G_DIM     = 'rgba(10,9,7,0.65)';
const G_MUTE    = 'rgba(10,9,7,0.55)';
const G_FAINT   = 'rgba(10,9,7,0.32)';
const G_LINE    = '1px solid rgba(10,9,7,0.16)';
const G_LINE_LO = '1px solid rgba(10,9,7,0.08)';
const G_CANVAS  = '#F7F6F2';
const G_TANGER  = '#B8743C';
const G_SERIF   = "'Source Serif 4', serif";
const G_SANS    = "Inter, system-ui, sans-serif";
const G_MONO    = "JetBrains Mono, monospace";

// ─── Section wrapper helper ───────────────────────────────────
function gSection(id, children, opts) {
  opts = opts || {};
  return React.createElement('section', { id,
    style: { padding: opts.pad || '96px 32px',
             borderTop: opts.noTop ? 'none' : G_LINE_LO,
             background: opts.background || G_CANVAS, color: G_INK } },
    React.createElement('div', { style: { maxWidth: opts.maxWidth || 1100, margin: '0 auto' } },
      children),
  );
}

function gEyebrow(text, copper) {
  return React.createElement('div', {
    style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
             color: copper ? G_TANGER : G_MUTE, marginBottom: 20,
             textTransform: 'uppercase' } },
    text);
}

// ════════════════════════════════════════════════════════════════════════
// 01 · HERO
// ════════════════════════════════════════════════════════════════════════
function HeroV3({ perso }) {
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

  const scrollToDispatch = (e) => {
    e.preventDefault();
    const el = document.getElementById('dispatch');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return React.createElement('section', { id: 'hero',
    style: { padding: '88px 32px 96px', background: G_CANVAS, color: G_INK,
             position: 'relative', overflow: 'hidden' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('div', {
        style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                 color: G_MUTE, marginBottom: 32, textTransform: 'uppercase' } },
        lang === 'es' ? kickerES : kickerEN),
      React.createElement('h1', {
        style: { margin: 0, fontFamily: G_SERIF, fontStyle: 'italic',
                 fontWeight: 500, fontSize: 80, lineHeight: 1.02,
                 letterSpacing: '-0.04em', color: G_INK, maxWidth: 920 } },
        heroLine1, React.createElement('br'),
        heroLine2, React.createElement('br'),
        React.createElement('span', { style: { color: G_TANGER } }, heroLine3),
      ),
      React.createElement('div', {
        style: { marginTop: 40, maxWidth: 620, fontFamily: G_SANS,
                 fontSize: 17, lineHeight: 1.6, color: G_DIM,
                 letterSpacing: '-0.003em' } },
        subLines.map((line, i) => React.createElement('p', { key: i,
          style: { margin: i === 0 ? 0 : '14px 0 0', whiteSpace: 'pre-line' } },
          line)),
      ),
      React.createElement('div', {
        style: { marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' } },
        React.createElement('a', {
          href: bookingHref, target: '_blank', rel: 'noopener noreferrer',
          style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                   background: G_INK, color: G_CANVAS,
                   border: '1px solid ' + G_INK, padding: '14px 24px',
                   fontFamily: G_SANS, fontSize: 14, fontWeight: 500,
                   textDecoration: 'none', letterSpacing: '-0.005em' } },
          ctaPrimary,
          React.createElement('span', { style: { fontFamily: G_MONO,
                                                    color: G_TANGER, fontSize: 13 } }, '→')),
        React.createElement('a', {
          href: '#dispatch', onClick: scrollToDispatch,
          style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                   background: 'transparent', color: G_INK,
                   border: '1px solid rgba(10,9,7,0.32)', padding: '14px 24px',
                   fontFamily: G_SANS, fontSize: 14, fontWeight: 500,
                   textDecoration: 'none', letterSpacing: '-0.005em' } },
          ctaSecondary,
          React.createElement('span', { style: { fontFamily: G_MONO,
                                                    color: G_TANGER, fontSize: 13 } }, '→')),
      ),
      // Metrics strip
      React.createElement('div', {
        style: { marginTop: 72, display: 'grid',
                 gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
                 borderTop: G_LINE, borderBottom: G_LINE_LO } },
        [
          { label: lang === 'es' ? 'SISTEMAS ACTIVOS' : 'ACTIVE SYSTEMS', value: '129' },
          { label: lang === 'es' ? 'RESPUESTA IA' : 'AI RESPONSE', value: lang === 'es' ? 'Inmediata' : 'Immediate' },
          { label: lang === 'es' ? 'RESPUESTA HUMANA' : 'HUMAN RESPONSE', value: lang === 'es' ? 'Mismo día' : 'Same Day' },
          { label: lang === 'es' ? 'ESTADO DE INTAKE' : 'INTAKE STATUS', value: lang === 'es' ? 'Limitado' : 'Limited' },
        ].map((m, i) => React.createElement('div', { key: i,
          style: { padding: '24px 20px',
                   borderLeft: i === 0 ? 'none' : G_LINE_LO } },
          React.createElement('div', { style: { fontFamily: G_MONO,
                                                  fontSize: 10, letterSpacing: '0.18em',
                                                  color: G_MUTE, marginBottom: 10 } },
            m.label),
          React.createElement('div', { style: { fontFamily: G_SERIF,
                                                  fontSize: 28, letterSpacing: '-0.02em',
                                                  color: G_INK } },
            m.value),
        )),
      ),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 02 · DISPATCH — 3-question diagnostic on one screen
// ════════════════════════════════════════════════════════════════════════
function DispatchV3({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const P = window.AxiusPersonalization;

  // Local mirror of the perso state (industry/challenge/outcome).
  // We use V3 ids; writes go straight into AxiusPersonalization.
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

  // When all 3 are answered (and weren't before), show "GENERATING…" and scroll
  // to #problem.
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
      'aria-checked': selected,
      'aria-label': label,
      onClick,
      style: {
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 16px',
        border: selected ? '1px solid ' + G_TANGER : G_LINE,
        background: selected ? 'rgba(184,116,60,0.08)' : G_CANVAS,
        color: G_INK, fontFamily: G_SANS, fontSize: 14,
        cursor: 'pointer', textAlign: 'left',
        transition: 'all .12s ease',
      } },
      React.createElement('span', {
        style: { width: 8, height: 8, borderRadius: '50%',
                 background: selected ? G_TANGER : 'transparent',
                 border: '1px solid ' + (selected ? G_TANGER : G_FAINT) } }),
      label);
  };

  const qIndustry = lang === 'es' ? '01 · Industria' : '01 · Industry';
  const qChallenge = lang === 'es' ? '02 · Fricción' : '02 · Friction';
  const qOutcome = lang === 'es' ? '03 · Impacto' : '03 · Impact';

  return gSection('dispatch', [
    gEyebrow(lang === 'es' ? 'DISPATCH · 3 PREGUNTAS' : 'DISPATCH · 3 QUESTIONS'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: G_SERIF, fontStyle: 'italic',
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 56px', maxWidth: 880 } },
      lang === 'es' ? '¿Qué tipo de negocio es este?' : 'What kind of business is this?'),

    // Q1 — Industry
    React.createElement('div', { key: 'q1',
      style: { marginBottom: 40 }, role: 'radiogroup', 'aria-label': qIndustry },
      React.createElement('div', {
        style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                 color: G_MUTE, marginBottom: 14, textTransform: 'uppercase' } },
        qIndustry),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
        industries.map(opt =>
          renderChip(opt, perso.industry === opt.id, () => pickIndustry(opt.id)))),
      perso.industry === 'other' && React.createElement('input', {
        type: 'text', value: otherText, autoFocus: true,
        onChange: (e) => {
          setOtherText(e.target.value);
          P.set({ industry: 'other', industryOther: e.target.value });
        },
        placeholder: lang === 'es' ? 'Cuéntanos en una palabra…' : 'Tell us in one word…',
        'aria-label': lang === 'es' ? 'Otra industria' : 'Other industry',
        style: { marginTop: 14, padding: '10px 14px', width: '100%', maxWidth: 360,
                 fontFamily: G_SANS, fontSize: 14, border: G_LINE,
                 background: G_CANVAS, color: G_INK, outline: 'none' } }),
    ),

    // Q2 — Friction
    React.createElement('div', { key: 'q2',
      style: { marginBottom: 40 }, role: 'radiogroup', 'aria-label': qChallenge },
      React.createElement('div', {
        style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                 color: G_MUTE, marginBottom: 14, textTransform: 'uppercase' } },
        qChallenge),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
        challenges.map(opt =>
          renderChip(opt, perso.challenge === opt.id, () => pickChallenge(opt.id)))),
    ),

    // Q3 — Impact
    React.createElement('div', { key: 'q3',
      style: { marginBottom: 32 }, role: 'radiogroup', 'aria-label': qOutcome },
      React.createElement('div', {
        style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                 color: G_MUTE, marginBottom: 14, textTransform: 'uppercase' } },
        qOutcome),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
        outcomes.map(opt =>
          renderChip(opt, perso.outcome === opt.id, () => pickOutcome(opt.id)))),
    ),

    generating && React.createElement('div', { key: 'gen', role: 'status', 'aria-live': 'polite',
      style: { fontFamily: G_MONO, fontSize: 13, letterSpacing: '0.18em',
               color: G_TANGER, marginTop: 16, textTransform: 'uppercase' } },
      (lang === 'es' ? 'GENERANDO PERFIL OPERATIVO' : 'GENERATING OPERATIONAL PROFILE') + dots),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 03 · PROBLEM
// ════════════════════════════════════════════════════════════════════════
function ProblemV3({ perso }) {
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
  return gSection('problem', [
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: G_SERIF, fontStyle: 'italic',
               fontSize: 56, lineHeight: 1.05,
               letterSpacing: '-0.035em', margin: '0 0 64px', maxWidth: 880 } },
      headline1, React.createElement('br'),
      React.createElement('span', { style: { color: G_TANGER } }, headline2)),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40,
               borderTop: G_LINE_LO, paddingTop: 32 } },
      cols.map((c, i) => React.createElement('div', { key: i,
        style: { paddingLeft: 16, borderLeft: G_LINE_LO } },
        React.createElement('div', {
          style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: G_TANGER, marginBottom: 16, textTransform: 'uppercase' } },
          c.label),
        React.createElement('p', {
          style: { fontSize: 15, color: G_DIM, lineHeight: 1.65,
                   whiteSpace: 'pre-line', margin: 0 } },
          c.body),
      ))),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 04 · WHAT CHANGES — before / after + outcome metric tiles
// ════════════════════════════════════════════════════════════════════════
function WhatChangesV3({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const data = window.AxiusBeforeAfterV3 || { before: [], after: [], outcomeMetrics: [] };
  const beforeList = lang === 'es' ? (data.beforeEs || data.before) : data.before;
  const afterList  = lang === 'es' ? (data.afterEs  || data.after)  : data.after;

  return gSection('what-changes', [
    gEyebrow(lang === 'es' ? 'QUÉ CAMBIA' : 'WHAT CHANGES'),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24,
               marginBottom: 56 } },
      // Before
      React.createElement('div', { key: 'before',
        style: { padding: 32, border: G_LINE, background: G_CANVAS } },
        React.createElement('div', {
          style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: G_MUTE, marginBottom: 8, textTransform: 'uppercase' } },
          lang === 'es' ? 'ANTES' : 'BEFORE'),
        React.createElement('h3', {
          style: { fontFamily: G_SERIF, fontSize: 22, margin: '0 0 20px',
                   letterSpacing: '-0.02em' } },
          lang === 'es' ? 'El fundador gestiona:' : 'Founder manages:'),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
          beforeList.map((item, i) => React.createElement('li', { key: i,
            style: { padding: '8px 0', borderTop: i === 0 ? 'none' : G_LINE_LO,
                     fontSize: 15, color: G_DIM } },
            React.createElement('span', { style: { color: G_FAINT, marginRight: 10,
                                                     fontFamily: G_MONO, fontSize: 12 } }, '—'),
            item))),
      ),
      // After
      React.createElement('div', { key: 'after',
        style: { padding: 32, border: '2px solid ' + G_TANGER,
                 background: 'rgba(184,116,60,0.04)' } },
        React.createElement('div', {
          style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: G_TANGER, marginBottom: 8, textTransform: 'uppercase' } },
          lang === 'es' ? 'DESPUÉS' : 'AFTER'),
        React.createElement('h3', {
          style: { fontFamily: G_SERIF, fontSize: 22, margin: '0 0 20px',
                   letterSpacing: '-0.02em' } },
          lang === 'es' ? 'Axius es dueño de:' : 'Axius owns:'),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
          afterList.map((item, i) => React.createElement('li', { key: i,
            style: { padding: '8px 0', borderTop: i === 0 ? 'none' : G_LINE_LO,
                     fontSize: 15, color: G_INK } },
            React.createElement('span', { style: { color: G_TANGER, marginRight: 10,
                                                     fontFamily: G_MONO, fontSize: 12 } }, '+'),
            item))),
      ),
    ),
    // Outcome metric tiles — fabricated, guarded
    window.axiusFabricationLive() && React.createElement('div', { key: 'metrics',
      style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
               borderTop: G_LINE, borderBottom: G_LINE_LO } },
      (data.outcomeMetrics || []).map((m, i) => React.createElement('div', { key: i,
        style: { padding: '24px 20px',
                 borderLeft: i === 0 ? 'none' : G_LINE_LO } },
        React.createElement('div', { style: { fontFamily: G_MONO,
                                                fontSize: 10, letterSpacing: '0.18em',
                                                color: G_MUTE, marginBottom: 10 } },
          m.label),
        React.createElement('div', { style: { fontFamily: G_SERIF,
                                                fontSize: 24, letterSpacing: '-0.02em',
                                                color: G_INK } },
          m.value),
      )),
    ),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 05 · THE AXIUS METHOD
// ════════════════════════════════════════════════════════════════════════
function AxiusMethodV3Section({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const stages = window.AxiusMethodV3 || [];
  return gSection('method', [
    gEyebrow(lang === 'es' ? 'EL MÉTODO AXIUS' : 'THE AXIUS METHOD'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: G_SERIF, fontStyle: 'italic',
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 56px', maxWidth: 880 } },
      lang === 'es' ? 'Cuatro etapas. Una sola línea de propiedad.' : 'Four stages. One line of ownership.'),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 } },
      stages.map(s => React.createElement('div', { key: s.n,
        style: { borderTop: G_LINE, paddingTop: 20 } },
        React.createElement('div', {
          style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: G_TANGER, marginBottom: 10 } },
          (lang === 'es' ? 'Etapa ' : 'Stage ') + s.n),
        React.createElement('h3', {
          style: { fontFamily: G_SERIF, fontSize: 24, margin: '0 0 16px',
                   letterSpacing: '-0.02em' } },
          s.name),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0,
                                                display: 'flex', flexDirection: 'column',
                                                gap: 8 } },
          (lang === 'es' ? s.bulletsEs : s.bullets).map((b, i) =>
            React.createElement('li', { key: i,
              style: { display: 'flex', alignItems: 'baseline', gap: 8,
                       fontSize: 14, color: G_DIM, lineHeight: 1.55 } },
              React.createElement('span', { style: { color: G_TANGER,
                                                       fontFamily: G_MONO,
                                                       fontSize: 11 } }, '+'),
              React.createElement('span', null, b)))),
      ))),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 06 · INDUSTRY MODULE — most-requested workflows
// ════════════════════════════════════════════════════════════════════════
function IndustryModuleV3({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const recs = window.AxiusRecommendationsV3 || {};
  const ind = perso.industry;

  // Industry-specific title.
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

  // Resolve sales/operations/ai per industry.
  // realestate is authored; other industries fall back to the first 3
  // sample names of the matching AxiusCatalog category.
  function fallbackList(catId) {
    const cat = (window.AxiusCatalog || []).find(c => c.id === catId);
    if (!cat) return [];
    return (cat.samples || []).slice(0, 3).map(s => s.name);
  }
  const cell = recs[ind] || null;
  const sales = (cell && cell.sales)
    || fallbackList('sales');
  const operations = (cell && cell.operations)
    || fallbackList('ops');
  const aiList = (cell && cell.ai)
    || fallbackList('ai');

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

  return gSection('industry-module', [
    gEyebrow(title, true),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
               marginBottom: 32 } },
      colDef.map(col => React.createElement('div', { key: col.id,
        style: { padding: 28, border: G_LINE, background: G_CANVAS,
                 minHeight: 220 } },
        React.createElement('h3', {
          style: { fontFamily: G_SERIF, fontSize: 24, margin: '0 0 16px',
                   letterSpacing: '-0.02em' } }, col.heading),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
          col.items.map((item, i) => React.createElement('li', { key: i,
            style: { padding: '10px 0', borderTop: i === 0 ? 'none' : G_LINE_LO,
                     fontSize: 14, color: G_DIM,
                     display: 'flex', alignItems: 'baseline', gap: 10 } },
            React.createElement('span', { style: { color: G_TANGER,
                                                     fontFamily: G_MONO, fontSize: 11 } }, '+'),
            React.createElement('span', null, item)))),
      ))),
    React.createElement('a', { key: 'cta',
      href: '#catalog', onClick: scrollToCatalog,
      style: { display: 'inline-flex', alignItems: 'center', gap: 10,
               fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
               color: G_TANGER, textDecoration: 'none', textTransform: 'uppercase' } },
      lang === 'es' ? 'Ver catálogo completo' : 'View Full Catalog',
      React.createElement('span', { style: { fontFamily: G_MONO } }, '→')),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 07 · WHY AXIUS — comparison table
// ════════════════════════════════════════════════════════════════════════
function WhyAxiusV3({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const rows = window.AxiusComparisonV3 || [];
  const headers = lang === 'es'
    ? ['', 'Freelancer', 'Empleado', 'Axius']
    : ['', 'Freelancer', 'Employee', 'Axius'];

  return gSection('why-axius', [
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: G_SERIF, fontStyle: 'italic',
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 48px', maxWidth: 880 } },
      lang === 'es' ? 'La mayoría ofrece experticia.' : 'Most providers offer expertise.',
      React.createElement('br'),
      React.createElement('span', { style: { color: G_TANGER } },
        lang === 'es' ? 'Axius ofrece propiedad.' : 'Axius provides ownership.')),
    React.createElement('div', { key: 'table', style: { overflowX: 'auto' } },
      React.createElement('table', {
        style: { width: '100%', borderCollapse: 'collapse',
                 fontFamily: G_SANS, fontSize: 14, color: G_INK } },
        React.createElement('thead', null,
          React.createElement('tr', null,
            headers.map((h, i) => React.createElement('th', { key: i,
              style: { textAlign: 'left', padding: '14px 16px',
                       borderBottom: G_LINE,
                       fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                       color: i === 3 ? G_TANGER : G_MUTE,
                       textTransform: 'uppercase' } }, h)))),
        React.createElement('tbody', null,
          rows.map((r, i) => React.createElement('tr', { key: i,
            style: { borderBottom: G_LINE_LO } },
            React.createElement('td', {
              style: { padding: '14px 16px', color: G_FAINT,
                       fontFamily: G_MONO, fontSize: 10, letterSpacing: '0.12em' } },
              String(i + 1).padStart(2, '0')),
            React.createElement('td', { style: { padding: '14px 16px', color: G_DIM } },
              lang === 'es' ? r.freelancerEs : r.freelancer),
            React.createElement('td', { style: { padding: '14px 16px', color: G_DIM } },
              lang === 'es' ? r.employeeEs : r.employee),
            React.createElement('td', { style: { padding: '14px 16px',
                                                    color: G_TANGER, fontWeight: 600 } },
              lang === 'es' ? r.axiusEs : r.axius),
          )),
        ),
      ),
    ),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 08 · THE MODEL — 3 pillars
// ════════════════════════════════════════════════════════════════════════
function AxiusModelV3Section({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const pillars = window.AxiusModelV3 || [];
  return gSection('model', [
    gEyebrow(lang === 'es' ? 'UNA SOLA CAPA RESPONSABLE' : 'ONE ACCOUNTABLE LAYER'),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
      pillars.map(p => React.createElement('div', { key: p.id,
        style: { padding: 32, border: G_LINE, background: G_CANVAS,
                 minHeight: 320 } },
        React.createElement('div', {
          style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: G_TANGER, marginBottom: 24, textTransform: 'uppercase' } },
          p.name),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0,
                                                display: 'flex', flexDirection: 'column',
                                                gap: 10 } },
          (lang === 'es' ? p.bulletsEs : p.bullets).map((b, i) =>
            React.createElement('li', { key: i,
              style: { padding: '8px 0', borderTop: i === 0 ? 'none' : G_LINE_LO,
                       display: 'flex', alignItems: 'baseline', gap: 10,
                       fontSize: 15, color: G_INK } },
              React.createElement('span', { style: { color: G_TANGER,
                                                       fontFamily: G_MONO, fontSize: 11 } }, '+'),
              React.createElement('span', null, b)))),
      )),
    ),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 09 · PRICING — 3 tiles, brief structure
// ════════════════════════════════════════════════════════════════════════
function PricingV3({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const tiers = window.AxiusPricingV3 || [];
  const bookingHref = (window.AxiusConfig && window.AxiusConfig.bookingUrl)
                       || 'mailto:andres@axius.tech?subject=Axius Department engagement';

  return gSection('pricing', [
    React.createElement('div', { key: 'grid',
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
          style: { border: featured ? '2px solid ' + G_TANGER : G_LINE,
                   padding: 32, background: G_CANVAS,
                   display: 'flex', flexDirection: 'column', minHeight: 280 } },
          React.createElement('h3', {
            style: { fontFamily: G_SERIF, fontSize: 32, margin: '0 0 12px',
                     letterSpacing: '-0.025em' } }, t.name),
          React.createElement('div', {
            style: { fontSize: 15, color: G_DIM, marginBottom: 20, lineHeight: 1.5 } },
            sub),
          body && React.createElement('div', {
            style: { fontSize: 14, color: G_DIM, marginBottom: 20,
                     lineHeight: 1.55, fontStyle: 'italic' } },
            body),
          priceLine && React.createElement('div', {
            style: { fontFamily: G_MONO, fontSize: 14, color: G_INK,
                     marginBottom: 24, letterSpacing: '0.04em' } },
            priceLine),
          React.createElement('div', { style: { marginTop: 'auto' } },
            React.createElement('a', {
              href: ctaHref, target: '_blank', rel: 'noopener noreferrer',
              style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                       background: featured ? G_TANGER : G_INK,
                       color: G_CANVAS, border: '1px solid ' + (featured ? G_TANGER : G_INK),
                       padding: '12px 20px',
                       fontFamily: G_SANS, fontSize: 13, fontWeight: 500,
                       textDecoration: 'none', letterSpacing: '-0.005em' } },
              ctaText,
              React.createElement('span', { style: { fontFamily: G_MONO,
                                                        color: featured ? G_CANVAS : G_TANGER,
                                                        fontSize: 12 } }, '→')),
          ),
        );
      })),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 10 · FOUNDER
// ════════════════════════════════════════════════════════════════════════
function FounderV3({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const f = window.AxiusFounder || {};
  const [photoFailed, setPhotoFailed] = React.useState(false);
  const fallbackCaption = (f.name || 'Andrés Toro') + ' · ' +
    (lang === 'es' ? 'foto no disponible' : 'photo unavailable');
  return gSection('founder', [
    gEyebrow(lang === 'es' ? 'POR QUÉ EXISTE AXIUS' : 'WHY AXIUS EXISTS'),
    // Top: founder video empty-state from Phase 6
    window.AxiusVisual && window.AxiusVisual.FounderVideoF
      && React.createElement(window.AxiusVisual.FounderVideoF, { key: 'fv' }),
    React.createElement('div', { key: 'grid',
      style: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56,
               alignItems: 'start' } },
      React.createElement('div', { key: 'photo' },
        React.createElement('div', {
          style: { aspectRatio: '3/4', width: '100%',
                   border: G_LINE, overflow: 'hidden', background: '#E9E6DF',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   padding: photoFailed ? 24 : 0 } },
          !photoFailed && React.createElement('img', {
            src: f.photo, alt: f.name || 'Founder',
            onError: () => setPhotoFailed(true),
            style: { width: '100%', height: '100%', objectFit: 'cover',
                     filter: 'grayscale(.15) contrast(1.04)' } }),
          photoFailed && React.createElement('div', {
            role: 'img', 'aria-label': fallbackCaption,
            style: { fontFamily: G_MONO, fontSize: 12, letterSpacing: '0.12em',
                     color: G_MUTE, textAlign: 'center', textTransform: 'uppercase' } },
            fallbackCaption),
        ),
        React.createElement('div', {
          style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: G_MUTE, marginTop: 12, textTransform: 'uppercase' } },
          'Fig. 01 · ' + (lang === 'es' ? 'Fundador' : 'Founder')),
      ),
      React.createElement('div', { key: 'bio' },
        React.createElement('h2', {
          style: { fontFamily: G_SERIF, fontStyle: 'italic',
                   fontSize: 40, lineHeight: 1.05,
                   letterSpacing: '-0.03em', margin: '0 0 24px' } },
          lang === 'es' ? 'La mano sobre tus operaciones.' : 'The hand on your operations.'),
        React.createElement('p', {
          style: { fontSize: 16, color: G_DIM, lineHeight: 1.7,
                   whiteSpace: 'pre-line', margin: '0 0 32px' } },
          lang === 'es' ? (f.bioEs || '') : (f.bio || '')),
        React.createElement('blockquote', {
          style: { fontFamily: G_SERIF, fontStyle: 'italic', fontSize: 20,
                   lineHeight: 1.45, color: G_INK, margin: '0 0 32px',
                   borderLeft: '2px solid ' + G_TANGER, paddingLeft: 20 } },
          lang === 'es' ? (f.quoteEs || '') : (f.quote || '')),
        React.createElement('div', {
          style: { fontFamily: G_MONO, fontSize: 12, letterSpacing: '0.12em',
                   color: G_MUTE, display: 'flex', flexWrap: 'wrap', gap: 16 } },
          (f.facts || []).map((fact, i) => React.createElement('span', { key: i },
            fact.k.toUpperCase() + ' · ' + fact.v))),
      ),
    ),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 11 · PROOF — operational results by industry (fabricated, guarded)
// ════════════════════════════════════════════════════════════════════════
function ProofV3({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const live = window.axiusFabricationLive();
  const proof = window.AxiusProofV3 || [];

  return gSection('proof', [
    gEyebrow(lang === 'es' ? 'RESULTADOS OPERATIVOS' : 'OPERATIONAL RESULTS'),
    live
      ? React.createElement('div', { key: 'grid',
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
          proof.map((p, i) => React.createElement('div', { key: i,
            style: { padding: 32, border: G_LINE, background: G_CANVAS,
                     minHeight: 180,
                     display: 'flex', flexDirection: 'column',
                     justifyContent: 'space-between' } },
            React.createElement('div', null,
              React.createElement('div', {
                style: { fontFamily: G_MONO, fontSize: 11, letterSpacing: '0.18em',
                         color: G_TANGER, marginBottom: 10, textTransform: 'uppercase' } },
                lang === 'es' ? p.industryEs : p.industry),
              React.createElement('div', {
                style: { fontFamily: G_SANS, fontSize: 14, color: G_DIM,
                         marginBottom: 16 } },
                lang === 'es' ? (p.metricEs || p.metric) : p.metric)),
            React.createElement('div', {
              style: { fontFamily: G_SERIF, fontSize: 36, letterSpacing: '-0.025em',
                       color: G_INK } },
              p.value),
          )))
      : React.createElement('p', { key: 'empty',
          style: { fontFamily: G_SANS, fontSize: 15, color: G_MUTE,
                   fontStyle: 'italic', maxWidth: 600, color: G_INK } },
          lang === 'es'
            ? 'Resultados verificados en revisión — los publicaremos cuando los clientes los firmen.'
            : 'Verified results in review — we will publish them once clients sign off.'),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 12 · FINAL CTA
// ════════════════════════════════════════════════════════════════════════
function FinalCTAV3({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const bookingHref = (window.AxiusConfig && window.AxiusConfig.bookingUrl)
                       || 'mailto:andres@axius.tech';
  const items = lang === 'es'
    ? ['Cuellos de botella identificados', 'Oportunidades priorizadas',
       'Recomendaciones inmediatas', 'Roadmap incluido']
    : ['Bottlenecks identified', 'Opportunities prioritized',
       'Immediate recommendations', 'Roadmap included'];
  return gSection('cta', [
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: G_SERIF, fontStyle: 'italic',
               fontSize: 72, lineHeight: 1.02,
               letterSpacing: '-0.04em', margin: '0 0 40px', maxWidth: 920 } },
      lang === 'es' ? 'Treinta minutos.' : 'Thirty minutes.',
      React.createElement('br'),
      React.createElement('span', { style: { color: G_TANGER } },
        lang === 'es' ? 'Claridad completa.' : 'Complete clarity.')),
    React.createElement('ul', { key: 'list',
      style: { listStyle: 'none', padding: 0, margin: '0 0 40px',
               display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12,
               maxWidth: 680 } },
      items.map((item, i) => React.createElement('li', { key: i,
        style: { display: 'flex', alignItems: 'baseline', gap: 12,
                 fontSize: 16, color: G_INK, fontFamily: G_SANS } },
        React.createElement('span', { style: { color: G_TANGER, fontSize: 16 } }, '✓'),
        React.createElement('span', null, item)))),
    React.createElement('a', { key: 'btn',
      href: bookingHref, target: '_blank', rel: 'noopener noreferrer',
      style: { display: 'inline-flex', alignItems: 'center', gap: 12,
               background: G_INK, color: G_CANVAS,
               border: '1px solid ' + G_INK, padding: '16px 28px',
               fontFamily: G_SANS, fontSize: 14, fontWeight: 500,
               textDecoration: 'none' } },
      lang === 'es' ? 'Iniciar una conversación' : 'Begin a Conversation',
      React.createElement('span', { style: { fontFamily: G_MONO,
                                                color: G_TANGER, fontSize: 13 } }, '→')),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// Composition root
// ════════════════════════════════════════════════════════════════════════
window.AxiusDirectionG = function () {
  const P = window.AxiusPersonalization;
  const [perso, setPerso] = React.useState(P.get);
  React.useEffect(() => P.subscribe(setPerso), []);
  React.useEffect(() => {
    if (window.AxiusVisual && window.AxiusVisual.installStyles)
      window.AxiusVisual.installStyles();
  }, []);

  return React.createElement('div', {
    id: 'axius-direction-G-body',
    style: { background: G_CANVAS, color: G_INK, minHeight: '100vh' } },
    React.createElement(HeroV3, { perso }),
    React.createElement(DispatchV3, { perso }),
    React.createElement(ProblemV3, { perso }),
    React.createElement(WhatChangesV3, { perso }),
    React.createElement(AxiusMethodV3Section, { perso }),
    React.createElement(IndustryModuleV3, { perso }),
    React.createElement(WhyAxiusV3, { perso }),
    React.createElement(AxiusModelV3Section, { perso }),
    React.createElement(PricingV3, { perso }),
    React.createElement(FounderV3, { perso }),
    React.createElement(ProofV3, { perso }),
    React.createElement(FinalCTAV3, { perso }),
  );
};

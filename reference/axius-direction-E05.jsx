// ============================================================
// AXIUS · DIRECTION E05 — QUIET 0.5 (LIVE DIRECTION)
//
// Single-page editorial landing for axius.tech.  Hero ships with
// the OperatorCard variant (`heroStyle === 'B'`) — directory-style
// founder card that flips into the chat surface on demand.
//
// Sections in render order:
//   Nav · Hero (00) · Commitments (01) · The Mess (02) ·
//   Method (03) · Catalog (04) · Comparison (05) · Pricing (06) ·
//   The Model (07) · The Operator [Founder] (08) · Appendix [FAQ]
//   (09) · CTA (10) · Footer · FloatingDispatch (live ops log).
//
// Chat surface (opens from OperatorCard "Message directly"):
//   AI-first.  Visitor sees an operational-diagnosis prompt and
//   chips pointed at pain.  "Bring Andrés in" escalates to the
//   human via Telegram (forum-topic per visitor); replies relay
//   back into the chat with a 60s-per-message AI fallback.  After
//   3+ distinct pain signals, an Operational Snapshot appears with
//   a soft Walk-me-through CTA → discovery call.
//
// Tokens, data, and AxiusConfig live in axius-shared.jsx.  Live
// Telegram bot token + WhatsApp number live in axius-secrets.local
// .jsx (gitignored) and override AxiusConfig at runtime.
// ============================================================

window.AxiusDirectionE05 = function () {
  // ─── Font + global animation injection ─────────────────────
  React.useEffect(() => {
    if (!document.getElementById('axius-quiet-fonts')) {
      const link = document.createElement('link');
      link.id = 'axius-quiet-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap';
      document.head.appendChild(link);
    }
    if (!document.getElementById('axius-quiet05-styles')) {
      const style = document.createElement('style');
      style.id = 'axius-quiet05-styles';
      style.textContent = `
        @keyframes axQ05Breathe {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50%      { transform: scale(1.12); opacity: 0.85; }
        }
        @keyframes axQ05Pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,186,168,0.55); }
          50%      { box-shadow: 0 0 0 6px rgba(79,186,168,0); }
        }
        @keyframes axQ05Glow {
          0%, 100% { opacity: 0.45; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.65; transform: translate(-50%, -50%) scale(1.06); }
        }
        @keyframes axQ05FadeUp {
          0%   { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .ax-quiet05-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,91,42,0.4) transparent; }
        .ax-quiet05-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .ax-quiet05-scroll::-webkit-scrollbar-track { background: transparent; }
        .ax-quiet05-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,91,42,0.35);
          border-radius: 0;
        }
        .ax-quiet05-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255,91,42,0.6);
        }
        /* Multi-color cycle — each colour holds for ~70% of its
           slice before fading into the next, so the orange (and every
           other shade) gets a real beat to be noticed.  Starts and
           ends on tangerine so the loop reads as orange-anchored. */
        @keyframes axQ05Rainbow {
          0%,   12%  { color: #FF5B2A; border-color: #FF5B2A; }
          17%,  29%  { color: #6F5BFF; border-color: #6F5BFF; }
          34%,  46%  { color: #4FBAA8; border-color: #4FBAA8; }
          51%,  63%  { color: #F4D26A; border-color: #F4D26A; }
          68%,  80%  { color: #FF6FA0; border-color: #FF6FA0; }
          85%,  95%  { color: #5AC0E8; border-color: #5AC0E8; }
          100%       { color: #FF5B2A; border-color: #FF5B2A; }
        }
        .ax-q05-multi:hover {
          animation: axQ05Rainbow 9s ease-in-out infinite;
        }
        /* Anchored sections sit below the sticky nav (~58px) when scrolled to */
        #stage-quiet05 section[id], #stage-quiet05 header[id] { scroll-margin-top: 72px; }
        html { scroll-behavior: smooth; }
        /* Site-wide zoom-out — gives the page a "one-step-zoomed-out"
           feel so layout breathes more.  Uses the non-standard \`zoom\`
           property (supported in Chrome / Safari / Edge, and Firefox
           v126+) because unlike CSS transforms it also shrinks the
           layout box, so no empty space appears around the stage. */
        #stage-quiet05 { zoom: 0.8; }
        @-moz-document url-prefix() {
          /* Firefox < 126 fallback: scale via transform on the inner
             content, with origin top-center so the stage stays aligned
             under the nav while everything inside shrinks. */
          #stage-quiet05 { transform: scale(0.8); transform-origin: 50% 0; }
        }
        /* ─── Responsive overrides ────────────────────────────
           First responsive pass.  The prototype is built around a
           1800-px design width with a 128-px gutter; the rules below
           progressively collapse padding, headline sizes, and the
           worst multi-column grids so the layout survives narrow
           viewports.  Not a full mobile design — just enough that the
           site is readable down to ~360 px instead of overflowing. */
        @media (max-width: 1440px) {
          #stage-quiet05 { zoom: 0.78; }
          #stage-quiet05 section, #stage-quiet05 header {
            padding-left: 80px !important; padding-right: 80px !important;
          }
        }
        @media (max-width: 1024px) {
          #stage-quiet05 { zoom: 0.75; }
          #stage-quiet05 section, #stage-quiet05 header {
            padding-left: 48px !important; padding-right: 48px !important;
          }
          #stage-quiet05 h1 { font-size: 64px !important; line-height: 1.02 !important; white-space: normal !important; }
          #stage-quiet05 h2 { font-size: 44px !important; white-space: normal !important; }
        }
        @media (max-width: 768px) {
          #stage-quiet05 { zoom: 0.95; }
          #stage-quiet05 section, #stage-quiet05 header {
            padding-left: 24px !important; padding-right: 24px !important;
            padding-top: 64px !important; padding-bottom: 64px !important;
          }
          #stage-quiet05 h1 { font-size: 44px !important; }
          #stage-quiet05 h2 { font-size: 30px !important; }
          /* Collapse the worst multi-column grids to a single column.
             Inline styles win specificity wars only with !important +
             [style*=] attribute matching.  Crude but effective. */
          #stage-quiet05 [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          /* Hide the nav links + EN/ES toggle on phones; keep the CTA */
          #stage-quiet05 nav a { display: none !important; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // ─── Palette ───────────────────────────────────────────────
  const C = {
    bg:        '#F7F6F2',
    surface:   '#FFFFFF',
    panel:     '#FCFBF7',
    ink:       '#0A0907',
    dim:       'rgba(10,9,7,0.62)',
    mute:      'rgba(10,9,7,0.42)',
    faint:     'rgba(10,9,7,0.24)',
    ghost:     'rgba(10,9,7,0.10)',
    line:      'rgba(10,9,7,0.08)',
    lineHi:    'rgba(10,9,7,0.18)',
    // latent accents — reveal on interaction only
    tangerine: '#FF5B2A',
    lavender:  '#6F5BFF',
    mint:      '#4FBAA8',
    amber:     '#F4D26A',
    pink:      '#FF6FA0',
    sky:       '#5AC0E8',
  };

  // ─── Booking endpoint ──────────────────────────────────────
  // Set this to a real Cal.com / Calendly URL when ready; until
  // then we fall back to a structured mailto so leads still reach
  // the founder.
  const BOOKING_URL = (window.AxiusConfig && window.AxiusConfig.bookingUrl) || '';
  const EMAIL = 'andres@axius.tech';
  const openBooking = (subject, body) => {
    if (BOOKING_URL) {
      window.open(BOOKING_URL, '_blank', 'noopener');
      return;
    }
    const params = new URLSearchParams();
    if (subject) params.set('subject', subject);
    if (body) params.set('body', body);
    const qs = params.toString();
    window.location.href = `mailto:${EMAIL}${qs ? `?${qs}` : ''}`;
  };
  const openEmail = (subject) => {
    const qs = subject ? `?subject=${encodeURIComponent(subject)}` : '';
    window.location.href = `mailto:${EMAIL}${qs}`;
  };
  const scrollToId = (id) => {
    // Multiple stages render the same anchor IDs — restrict to this stage.
    const root = document.getElementById('stage-quiet05') || document;
    const el = root.querySelector('#' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ─── Language (EN default, ES toggle) ──────────────────────
  const [lang, setLang] = React.useState('en');
  // Hero layout toggle: 'A' = current chat-card + 4-piece collage,
  // 'B' = operator card + workflow sheet variant.  Lets you A/B
  // compare the two hero treatments live from the nav.
  // Quiet 0.5 ships with Option B (operator card) as the only hero.
  const [heroStyle] = React.useState('B');

  // Tier-name translations by AxiusPricing.id
  const TIER_NAMES = {
    en: { operador: 'Operator', equipo: 'Team', departamento: 'Department' },
    es: { operador: 'Operador', equipo: 'Equipo', departamento: 'Departamento' },
  };
  const tierName = (id) => (TIER_NAMES[lang] && TIER_NAMES[lang][id]) || id;

  // ─── Copy by language ──────────────────────────────────────
  // We translate the user-facing chrome (nav, hero, CTAs, dispatch,
  // FAQ heading, CTA section). Section bodies that pull from the
  // shared catalog/methodology/FAQ data stay in English for now.
  const COPY = {
    en: {
      navLinks: ['Work', 'Method', 'Catalog', 'Pricing', 'Founder'],
      navBookCall: 'Book a call',
      eyebrowPractice: 'Axius — An independent technology operations practice',
      eyebrowAcceptingPre: 'Only Accepting',
      eyebrowAcceptingAccent: '3 New Clients / Month',
      heroLine1: 'Run',
      heroLine2: 'your business.',
      heroLine3: 'Not your tech.',
      heroSubL1: 'We run the tech side of your business —',
      heroSubL3a: 'all of it — for ',
      heroSubL3b: 'one monthly fee.',
      heroCta1: 'Book a discovery call',
      heroCta2: 'See the catalog',
      directLineTitle: 'Direct line.',
      directLineAvailable: 'available',
      directLineRole: 'Operator · Altamonte Springs, FL · in Medellín now',
      directLineBody1: 'Direct line to the operator doing the work. ',
      directLineBody2: 'No account managers. No ticket queues.',
      directLineCta: 'Talk now',
      askAndresOpen: 'Open desk · Andrés is online',
      askAndresGreeting: "Most companies don't actually need more software. They need someone operating the systems they already have.\n\nTell me what's currently slowing the business down, breaking repeatedly, or depending too much on you. I'll show you how we'd structure it operationally.",
      askAndresPlaceholder: 'Describe what\'s operationally frustrating…',
      askAndresReplying: 'Andrés is replying…',
      askAndresAiBadge: 'AI twin',
      // Bring-Andrés-in flow (escalation from the default AI conversation)
      chatRingAction: 'Bring Andrés in',
      chatRinging: 'Bringing Andrés into the conversation',
      chatRingMeanwhile: 'Standby continues meanwhile',
      chatRingSeconds: (n) => `${n}s`,
      chatRingNoAnswer: "Caught on a call — I'll reply here personally as soon as I'm free, usually within the day. The standby has full context and can keep moving in the meantime.",
      chatRingMessageSent: 'Andrés notified · transcript on its way',
      chatRingNoWebhook:   'standby · response window applies',
      // Operator-card variant (Hero B)
      opCardOperator:    'Operator',
      opCardOnline:      'Online',
      opCardRole:        'Operator · Medellín',
      opCardDirectLine:  'Direct line',
      opCardHours:       'Hours (MDE)',
      opCardHoursValue:  '09:00 — 18:00',
      opCardBased:       'Based',
      opCardNow:         'Currently',
      chatAndresLive:    'Live',
      chatAndresHere:    'Andrés is here — typing a reply',
      opCardMessage:     'Message directly',
      opCardLeaveNote:   'Leave a note',
      askAndresSuggestions: [
        'What\'s currently breaking operationally?',
        'We\'re drowning in tools',
        'Leads slip through the cracks',
        'Everything depends on me',
        'We need better systems',
        'Show me what you\'d improve',
        'How does onboarding work?',
        'What would you automate first?',
      ],
      askAndresSend: 'Send ↵',
      dispatchLabel: 'Dispatch',
      dispatchIdleHelp: 'need help? · direct line available',
      ctaSchedule: 'Schedule the conversation',
      bookingSubject: 'Axius — discovery call',
      bookingTierSubject: (t) => `Axius — ${t} tier inquiry`,
      pricingRecommended: 'Recommended',
      pricingCapacity: 'capacity',
      pricingResponse: 'response',
      pricingCadence: 'cadence',
      pricingCapacityInfo: (pts) =>
        `1 point ≈ 1 operated workflow. ${pts} pts = up to ${pts} concurrent workflows.`,
      pricingTypicalWorkloadsLabel: 'Typical workloads',
      pricingMo: '/ mo',
      pricingSetupNote: (n) => `+ $${n.toLocaleString()} one-time setup`,
      pricingTierLabel: 'TIER',
      pricingFounderTrackLabel: 'Founder Track',
      pricingFounderTrackQuestion: 'Building instead of operating?',
      pricingFounderTrackItems:   ['MVPs', 'internal platforms', 'AI products', 'customer tools'],
      pricingFounderTrackBuilder: 'Builder → MVP in 1–3 months',
      pricingFounderTrackPartner: 'Partner → substantial product in 4–6 months',
      pricingFounderTrackCta: 'Talk about the Founder Track',
      pricingFounderTrackSubject: 'Axius — Founder Track inquiry',
      pricingGetStarted: 'Get started',
      pricingBookCallSecondary: 'Or book a call first →',
      pricingCheckoutSubject: (tier) => `Axius — start ${tier} subscription`,
      // Hero — stat row
      statActiveSystems: 'Active systems',
      statLast90: 'Last 90 days',
      statResponseWindow: 'Response window',
      statTier3: 'Tier 3',
      statStartsAt: 'Starts at',
      statStartsValue: '1k / mo',
      statSetupApplies: 'Setup fees apply',
      statIntakeStatus: 'Intake status',
      statLimited: 'Limited',
      statQ2_2026: 'Q2 · 2026',
      // Hero — How we work
      howWeWorkLabel: 'How we work',
      howWeWorkBullets: ['Systems that scale', 'Clear operations', 'More time to focus'],
      // Sections (eyebrows + headlines + hover descriptions)
      sec01Eyebrow:     '01 · Commitments',
      sec01TitlePrefix: 'Five standards we ',
      sec01TitleItalic: 'operate',
      sec01TitleSuffix: ' by.',
      sec02Eyebrow:     '02 · The operational problems most businesses quietly live with',
      sec02TitleP1:     'You started this to ',
      sec02TitleBuild:  'build',
      sec02TitleP2:     ' a business, ',
      sec02TitleNot:    'not',
      sec02TitleP3:     ' maintain its systems.',
      sec02ColLabels:   ['The symptom', 'The cost', 'The resolution'],
      sec02ColBodies:   [
        'Five contractors. Three Slack threads. The site breaks Friday. The CRM never got connected properly.',
        'Every tool was bought with optimism. Most sit unused. Nothing compounds operationally.',
        'One accountable team managing the systems behind the business. One line of communication. One monthly bill. Documented, maintained, and operated continuously.',
      ],
      sec03Eyebrow:     '03 · Method',
      sec03TitlePrefix: 'Four ',
      sec03TitleItalic: 'stages',
      sec03TitleSuffix: <>.<br/>Each one named.<br/>Each one delivered.</>,
      sec03StageLabel:  'Stage',
      sec03ArtifactLabel: 'artifact',
      sec04Eyebrow:     '04 · Catalog',
      sec04TitlePrefix: 'An ',
      sec04TitleItalic: 'index',
      sec04TitleSuffix: ' of the work.',
      // Workflow Capacity intro block (sits below the catalog title,
      // primes visitors on how points work BEFORE they reach pricing).
      sec04CapacityTitle:    'Workflow Capacity',
      sec04CapacityBody:     'Each workflow carries a point value based on complexity, integrations, maintenance, and operational load. This keeps operational capacity predictable and scalable across every tier.',
      sec04CapacityWeightLabel: 'typical weight',
      sec04CapacityExamples: [
        { name: 'AI chatbot',         pts: 1 },
        { name: 'CRM automation',     pts: 2 },
        { name: 'Internal dashboard', pts: 3 },
        { name: 'Custom application', pts: 5 },
      ],
      sec04CapacityFooter:   'Most businesses start with 2–5 active operational workflows.',
      // AI Recommendation Mode — describe your business, the catalog
      // auto-pivots to the most relevant category and surfaces it.
      sec04RecommendLabel:       'AI Powered',
      sec04RecommendPlaceholder: 'Describe your business…',
      sec04RecommendButton:      'Recommend',
      sec04RecommendBadge:       'Recommended for you',
      sec04RecommendNote:        (cat) => `Based on what you described, we'd usually start with ${cat}. The samples below match.`,
      sec04WorkflowsLabel:   'workflows',
      sec04CategoriesLabel:  'categories',
      sec04SampleEntries:    'sample entries',
      sec04ScrollMore:       'scroll for more',
      sec04MoreOnRequest:    (n) => `${n} more on request`,
      sec04RequestFullIndex: 'Request the full index →',
      sec04CatLabel:         'CAT',
      sec05Eyebrow:     '05 · Comparison',
      sec05TitlePrefix: 'A different ',
      sec05TitleItalic: 'shape',
      sec05TitleSuffix: ' of help.',
      sec05OptionLabel: 'Option',
      sec05ColF:        'Freelancer',
      sec05ColH:        'In-House',
      sec05ColA:        'Axius',
      sec06Eyebrow:     '06 · Pricing',
      sec06TitlePrefix: 'Three sizes of ',
      sec06TitleItalic: 'operating',
      sec06TitleSuffix: ' layer.',
      // — Section 07: The Model —
      sec07Eyebrow:     '07 · The model',
      sec07TitlePrefix: 'Three roles, ',
      sec07TitleItalic: 'one',
      sec07TitleSuffix: ' accountable layer.',
      modelPillars: [
        { eyebrow: 'Operator',         title: 'Owns direction and accountability.', bullets: [
          'Single point of contact',
          'Sets operational direction',
          'Owns outcomes and execution',
          'Accountable when systems change',
          'Same hand on your systems',
        ] },
        { eyebrow: 'AI systems',       title: 'Increase speed and continuity.', bullets: [
          'Maintain workflow context',
          'Handle repetitive operational work',
          'Improve response times',
          'Monitor systems quietly in the background',
          'Keep documentation current',
        ] },
        { eyebrow: 'Specialists',      title: 'Integrated when depth is needed.', bullets: [
          'Vetted specialists across the work',
          'Engineering, automation, design, infrastructure',
          'Managed entirely by the operator',
          'No vendor coordination on your side',
          'Quality controlled before delivery',
        ] },
        { eyebrow: 'What you experience', title: 'One accountable operational layer.', bullets: [
          'One line of communication',
          'One accountable team',
          'One monthly operating layer',
          'Quiet, organized execution',
          'Technology that keeps moving without you managing it',
        ] },
      ],
      // — Section 08: Founder (was 07) —
      sec08Eyebrow:     '08 · The Operator',
      sec08TitlePrefix: 'The hand on ',
      sec08TitleItalic: 'your operations',
      sec08TitleSuffix: '.',
      sec08VerifyLinkedin: 'LinkedIn',
      sec08TalkToMe:       'Talk to me',
      sec08FigCaptions: ['Operator', 'In studio', 'On the go'],
      // — Section 09: FAQ (was 08) —
      sec09Eyebrow:     '09 · Appendix',
      sec09TitlePrefix: 'Questions, ',
      sec09TitleItalic: 'asked simply',
      sec09TitleSuffix: '.',
      ctaEyebrow:       '— Begin —',
      ctaTitlePrefix:   'Begin a',
      ctaTitleItalic:   'conversation',
      ctaTitleSuffix:   '.',
      ctaBody:          'Thirty minutes. You leave with a one-page audit either way. No pitch, no pressure — just a clear picture of your systems.',
      footerCity:       'altamonte springs, fl · remote · in medellín now',
      footerCopy:       '© 2026',
      // Chat header
      chatBack:         'Back',
      chatOpen:         'open',
      chatDirectLine:   'direct line',
      chatAskAndres:    'Ask Andrés.',
      // Venn diagram
      vennPeople:       'PEOPLE',
      vennProcess:      'PROCESS',
      vennTechnology:   'TECHNOLOGY',
    },
    es: {
      navLinks: ['Trabajo', 'Método', 'Catálogo', 'Precios', 'Fundador'],
      navBookCall: 'Agendar llamada',
      eyebrowPractice: 'Axius — Una práctica independiente de operaciones tecnológicas',
      eyebrowAcceptingPre: 'Solo Aceptando',
      eyebrowAcceptingAccent: '3 Clientes Nuevos / Mes',
      heroLine1: 'Dirige',
      heroLine2: 'tu negocio.',
      heroLine3: 'No tu tech.',
      heroSubL1: 'Nosotros operamos el lado tecnológico de tu negocio —',
      heroSubL3a: 'todo, por ',
      heroSubL3b: 'una sola cuota mensual.',
      heroCta1: 'Agendar una llamada inicial',
      heroCta2: 'Ver el catálogo',
      directLineTitle: 'Línea directa.',
      directLineAvailable: 'disponible',
      directLineRole: 'Operador · Altamonte Springs, FL · en Medellín ahora',
      directLineBody1: 'Habla directo con quien hace el trabajo. ',
      directLineBody2: 'Sin gerentes de cuenta. Sin filas de tickets.',
      directLineCta: 'Conversemos',
      askAndresOpen: 'Escritorio abierto · Andrés está en línea',
      askAndresGreeting: 'La mayoría de empresas no necesitan más software. Necesitan a alguien operando los sistemas que ya tienen.\n\nCuéntame qué está frenando el negocio, qué se rompe constantemente, o qué depende demasiado de ti. Te muestro cómo lo estructuraríamos operativamente.',
      askAndresPlaceholder: 'Cuéntame qué te frustra operativamente…',
      askAndresReplying: 'Andrés está respondiendo…',
      askAndresAiBadge: 'gemelo IA',
      // Flujo "Hablar con Andrés" (escalación desde la conversación por defecto)
      chatRingAction: 'Hablar con Andrés',
      chatRinging: 'Conectando con Andrés',
      chatRingMeanwhile: 'La IA continúa mientras tanto',
      chatRingSeconds: (n) => `${n}s`,
      chatRingNoAnswer: 'Estoy en una llamada — te respondo aquí personalmente apenas me libere, normalmente dentro del día. La IA tiene contexto completo y puede seguir avanzando mientras tanto.',
      chatRingMessageSent: 'Andrés notificado · ya le llega la transcripción',
      chatRingNoWebhook:   'aplica ventana de respuesta',
      // Variante Operator Card (Hero B)
      opCardOperator:    'Operador',
      opCardOnline:      'En línea',
      opCardRole:        'Operador · Medellín',
      opCardDirectLine:  'Línea directa',
      opCardHours:       'Horario (MDE)',
      opCardHoursValue:  '09:00 — 18:00',
      opCardBased:       'Desde',
      opCardNow:         'Actualmente',
      chatAndresLive:    'En vivo',
      chatAndresHere:    'Andrés está aquí — escribiendo respuesta',
      opCardMessage:     'Enviar mensaje',
      opCardLeaveNote:   'Dejar una nota',
      askAndresSuggestions: [
        '¿Qué se está rompiendo operativamente?',
        'Estamos ahogados en herramientas',
        'Se nos escapan leads',
        'Todo depende de mí',
        'Necesitamos mejores sistemas',
        '¿Qué mejorarías tú primero?',
        '¿Cómo funciona el onboarding?',
        '¿Qué automatizarías primero?',
      ],
      askAndresSend: 'Enviar ↵',
      dispatchLabel: 'Despacho',
      dispatchIdleHelp: '¿necesitas ayuda? · línea directa disponible',
      ctaSchedule: 'Agendar la conversación',
      bookingSubject: 'Axius — llamada de descubrimiento',
      bookingTierSubject: (t) => `Axius — consulta del tier ${t}`,
      pricingRecommended: 'Recomendado',
      pricingCapacity: 'capacidad',
      pricingResponse: 'respuesta',
      pricingCadence: 'cadencia',
      pricingCapacityInfo: (pts) =>
        `1 punto ≈ 1 workflow operado. ${pts} pts = hasta ${pts} workflows simultáneos.`,
      pricingTypicalWorkloadsLabel: 'Cargas de trabajo típicas',
      pricingMo: '/ mes',
      pricingSetupNote: (n) => `+ $${n.toLocaleString()} setup único`,
      pricingTierLabel: 'TIER',
      pricingFounderTrackLabel: 'Founder Track',
      pricingFounderTrackQuestion: '¿Construyendo en lugar de operar?',
      pricingFounderTrackItems:   ['MVPs', 'plataformas internas', 'productos de IA', 'herramientas de cliente'],
      pricingFounderTrackBuilder: 'Builder → MVP en 1–3 meses',
      pricingFounderTrackPartner: 'Partner → producto sustancial en 4–6 meses',
      pricingFounderTrackCta: 'Hablar sobre el Founder Track',
      pricingFounderTrackSubject: 'Axius — consulta Founder Track',
      pricingGetStarted: 'Empezar ahora',
      pricingBookCallSecondary: 'O agenda una llamada primero →',
      pricingCheckoutSubject: (tier) => `Axius — iniciar suscripción ${tier}`,
      // Hero — stat row
      statActiveSystems: 'Sistemas activos',
      statLast90: 'Últimos 90 días',
      statResponseWindow: 'Ventana de respuesta',
      statTier3: 'Tier 3',
      statStartsAt: 'Desde',
      statStartsValue: '1k / mes',
      statSetupApplies: 'Aplica setup',
      statIntakeStatus: 'Estado de admisión',
      statLimited: 'Limitado',
      statQ2_2026: 'T2 · 2026',
      // Hero — How we work
      howWeWorkLabel: 'Cómo trabajamos',
      howWeWorkBullets: ['Sistemas que escalan', 'Operaciones claras', 'Más tiempo para enfocarte'],
      // Sections
      sec01Eyebrow:     '01 · Compromisos',
      sec01TitlePrefix: 'Cinco estándares por los que ',
      sec01TitleItalic: 'operamos',
      sec01TitleSuffix: '.',
      sec02Eyebrow:     '02 · Los problemas operativos con los que la mayoría de empresas vive en silencio',
      sec02TitleP1:     'Empezaste esto para ',
      sec02TitleBuild:  'construir',
      sec02TitleP2:     ' un negocio, ',
      sec02TitleNot:    'no',
      sec02TitleP3:     ' mantener sus sistemas.',
      sec02ColLabels:   ['El síntoma', 'El costo', 'La resolución'],
      sec02ColBodies:   [
        'Cinco contratistas. Tres hilos de Slack. El sitio se cae el viernes. El CRM nunca se conectó como debía.',
        'Cada herramienta se compró con optimismo. La mayoría queda sin usar. Nada se acumula operativamente.',
        'Un equipo responsable gestionando los sistemas detrás del negocio. Una sola línea de comunicación. Una sola factura mensual. Documentado, mantenido y operado de forma continua.',
      ],
      sec03Eyebrow:     '03 · Método',
      sec03TitlePrefix: 'Cuatro ',
      sec03TitleItalic: 'etapas',
      sec03TitleSuffix: <>.<br/>Cada una nombrada.<br/>Cada una entregada.</>,
      sec03StageLabel:  'Etapa',
      sec03ArtifactLabel: 'artefacto',
      sec04Eyebrow:     '04 · Catálogo',
      sec04TitlePrefix: 'Un ',
      sec04TitleItalic: 'índice',
      sec04TitleSuffix: ' del trabajo.',
      sec04CapacityTitle:    'Capacidad de Workflows',
      sec04CapacityBody:     'Cada workflow tiene un valor en puntos según su complejidad, integraciones, mantenimiento y carga operativa. Así, la capacidad operativa queda predecible y escalable en cada tier.',
      sec04CapacityWeightLabel: 'peso típico',
      sec04CapacityExamples: [
        { name: 'Chatbot de IA',          pts: 1 },
        { name: 'Automatización de CRM',  pts: 2 },
        { name: 'Dashboard interno',      pts: 3 },
        { name: 'Aplicación a medida',    pts: 5 },
      ],
      sec04CapacityFooter:   'La mayoría de empresas empieza con 2–5 workflows operativos activos.',
      sec04RecommendLabel:       'Con IA',
      sec04RecommendPlaceholder: 'Cuéntame sobre tu negocio…',
      sec04RecommendButton:      'Recomendar',
      sec04RecommendBadge:       'Recomendado para ti',
      sec04RecommendNote:        (cat) => `Por lo que cuentas, normalmente empezaríamos con ${cat}. Las muestras de abajo aplican.`,
      sec04WorkflowsLabel:   'workflows',
      sec04CategoriesLabel:  'categorías',
      sec04SampleEntries:    'entradas de muestra',
      sec04ScrollMore:       'desplaza para ver más',
      sec04MoreOnRequest:    (n) => `${n} más bajo solicitud`,
      sec04RequestFullIndex: 'Solicitar el índice completo →',
      sec04CatLabel:         'CAT',
      sec05Eyebrow:     '05 · Comparativa',
      sec05TitlePrefix: 'Otra ',
      sec05TitleItalic: 'forma',
      sec05TitleSuffix: ' de ayuda.',
      sec05OptionLabel: 'Opción',
      sec05ColF:        'Freelancer',
      sec05ColH:        'Interno',
      sec05ColA:        'Axius',
      sec06Eyebrow:     '06 · Precios',
      sec06TitlePrefix: 'Tres tamaños de capa ',
      sec06TitleItalic: 'operativa',
      sec06TitleSuffix: '.',
      // — Sección 07: El Modelo —
      sec07Eyebrow:     '07 · El modelo',
      sec07TitlePrefix: 'Tres roles, ',
      sec07TitleItalic: 'una',
      sec07TitleSuffix: ' sola capa responsable.',
      modelPillars: [
        { eyebrow: 'Operador',     title: 'Es dueño de la dirección y la responsabilidad.', bullets: [
          'Un solo punto de contacto',
          'Define la dirección operativa',
          'Responsable de los resultados y la ejecución',
          'Sigue respondiendo cuando hay cambios',
          'La misma mano sobre tus sistemas',
        ] },
        { eyebrow: 'Sistemas de IA', title: 'Aumentan velocidad y continuidad.', bullets: [
          'Mantienen contexto del workflow',
          'Manejan el trabajo operativo repetitivo',
          'Mejoran los tiempos de respuesta',
          'Monitorean los sistemas en silencio en segundo plano',
          'Mantienen la documentación al día',
        ] },
        { eyebrow: 'Especialistas', title: 'Integrados cuando se necesita profundidad.', bullets: [
          'Especialistas verificados en todo el trabajo',
          'Engineering, automatización, diseño, infraestructura',
          'Gestionados completamente por el operador',
          'Sin coordinación de proveedores de tu lado',
          'Calidad controlada antes de la entrega',
        ] },
        { eyebrow: 'Lo que experimentas', title: 'Una sola capa operativa responsable.', bullets: [
          'Una sola línea de comunicación',
          'Un solo equipo responsable',
          'Una sola capa operativa mensual',
          'Ejecución organizada y discreta',
          'Tecnología que sigue moviéndose sin que tú la operes',
        ] },
      ],
      // — Sección 08: Fundador (era 07) —
      sec08Eyebrow:     '08 · El Operador',
      sec08TitlePrefix: 'La mano sobre ',
      sec08TitleItalic: 'tus operaciones',
      sec08TitleSuffix: '.',
      sec08VerifyLinkedin: 'LinkedIn',
      sec08TalkToMe:       'Hablemos',
      sec08FigCaptions: ['Operador', 'En estudio', 'En movimiento'],
      // — Sección 09: FAQ (era 08) —
      sec09Eyebrow:     '09 · Apéndice',
      sec09TitlePrefix: 'Preguntas, ',
      sec09TitleItalic: 'simplemente',
      sec09TitleSuffix: '.',
      ctaEyebrow:       '— Empezar —',
      ctaTitlePrefix:   'Comencemos una',
      ctaTitleItalic:   'conversación',
      ctaTitleSuffix:   '.',
      ctaBody:          'Treinta minutos. Te llevas una auditoría de una página, pase lo que pase. Sin pitch, sin presión — solo una imagen clara de tus sistemas.',
      footerCity:       'altamonte springs, fl · remoto · en medellín ahora',
      footerCopy:       '© 2026',
      chatBack:         'Volver',
      chatOpen:         'abierto',
      chatDirectLine:   'línea directa',
      chatAskAndres:    'Pregúntale a Andrés.',
      vennPeople:       'PERSONAS',
      vennProcess:      'PROCESO',
      vennTechnology:   'TECNOLOGÍA',
    },
  };
  const t = (key) => {
    const dict = COPY[lang] || COPY.en;
    return dict[key] !== undefined ? dict[key] : COPY.en[key];
  };

  // Translate a data field on a record. When lang is 'es', returns
  // obj[key + 'Es'] if it exists, otherwise falls back to obj[key].
  // Use for fields on window.AxiusCommitments / Methodology / Pricing /
  // Comparison / FAQ / Founder / Catalog where ES variants are stored
  // as parallel keys ({ body, bodyEs }, { title, titleEs }, etc).
  const tr = (obj, key) => {
    if (!obj) return '';
    if (lang === 'es' && obj[key + 'Es'] !== undefined) return obj[key + 'Es'];
    return obj[key];
  };

  const DISPLAY = '"Geist", "Inter", system-ui, sans-serif';
  const MONO    = '"Geist Mono", ui-monospace, monospace';
  const SERIF   = '"Instrument Serif", "Times New Roman", serif';

  const pad = 128;

  // ─── Scroll progress hairline ──────────────────────────────
  const ScrollProgress = () => {
    const [p, setP] = React.useState(0);
    React.useEffect(() => {
      const onScroll = () => {
        const h = document.documentElement;
        const total = h.scrollHeight - h.clientHeight;
        setP(total > 0 ? (h.scrollTop / total) : 0);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 2,
        background: 'transparent', zIndex: 100, pointerEvents: 'none',
      }}>
        <div style={{
          width: `${p * 100}%`, height: '100%',
          background: C.tangerine,
          transition: 'width 90ms linear',
        }}/>
      </div>
    );
  };

  // ─── Animated counter (counts when in viewport) ────────────
  const CountUp = ({ to, duration = 1400, style = {} }) => {
    const [v, setV] = React.useState(0);
    const ref = React.useRef(null);
    React.useEffect(() => {
      if (!ref.current) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          const t0 = performance.now();
          const tick = (t) => {
            const k = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - k, 3); // easeOutCubic
            setV(Math.round(eased * to));
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      }, { threshold: 0.4 });
      io.observe(ref.current);
      return () => io.disconnect();
    }, [to, duration]);
    return <span ref={ref} style={style}>{v}</span>;
  };

  // ─── Wordmark — 'axius.tech' (tech after the period) ───────
  const Wordmark = ({ size = 18, color }) => {
    const [h, setH] = React.useState(false);
    return (
      <span
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          display: 'inline-flex', alignItems: 'baseline',
          fontFamily: DISPLAY, fontWeight: 600, fontSize: size,
          letterSpacing: '-0.04em', color: color || C.ink,
          cursor: 'default', userSelect: 'none',
        }}>
        <span style={{
          display: 'inline-flex',
          letterSpacing: h ? '0.06em' : '-0.04em',
          transition: 'letter-spacing .55s cubic-bezier(.2,.8,.2,1)',
        }}>axius</span>
        <span style={{
          color: h ? C.tangerine : C.ink,
          transition: 'color .55s cubic-bezier(.2,.8,.2,1)',
        }}>.</span>
        <span style={{
          color: h ? C.tangerine : C.mute,
          fontWeight: 500,
          transition: 'color .55s cubic-bezier(.2,.8,.2,1)',
        }}>tech</span>
      </span>
    );
  };

  // ─── Live Medellín clock — small surgical detail ───────────
  const LiveClock = ({ style = {} }) => {
    const [time, setTime] = React.useState('');
    React.useEffect(() => {
      const fmt = () => {
        try {
          const t = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hourCycle: 'h23', timeZone: 'America/Bogota',
          }).format(new Date());
          setTime(t);
        } catch { setTime(new Date().toLocaleTimeString()); }
      };
      fmt();
      const id = setInterval(fmt, 1000);
      return () => clearInterval(id);
    }, []);
    return (
      <span style={{
        fontFamily: MONO, fontSize: 10, fontWeight: 500,
        color: C.mute, letterSpacing: '0.18em', textTransform: 'uppercase',
        fontVariantNumeric: 'tabular-nums', ...style,
      }}>{time} · MDE</span>
    );
  };


  // ─── Eyebrow ───────────────────────────────────────────────
  const Eyebrow = ({ children, color, style = {} }) => (
    <div style={{
      fontFamily: MONO, fontSize: 11, fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: color || C.mute, ...style,
    }}>{children}</div>
  );

  // ─── HoverHead — italic accent permanently orange, gentle
  // scale-on-hover matching the hero title's enlarge gesture
  const HoverHead = ({ style = {}, prefix, italic, suffix, italicStyle = {}, italicSweep }) => {
    const [h, setH] = React.useState(false);
    // The CTA's headline is centered inside the section, so the scale
    // grows from its centre (origin 50% 50%) instead of left-anchored
    // — otherwise "Begin a" would drift right on hover.  Section
    // titles still use the left-anchored grammar.
    const scaleStyle = {
      display: 'inline-block',
      transformOrigin: italicSweep ? '50% 50%' : '0% 50%',
      transform: h ? 'scale(1.035)' : 'scale(1)',
      transition: 'transform .55s cubic-bezier(.2,.8,.2,1)',
    };
    return (
      <h2
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          margin: 0, fontFamily: DISPLAY, fontWeight: 600,
          fontSize: 72, letterSpacing: '-0.04em', lineHeight: 1.0,
          color: C.ink, cursor: 'default',
          ...style,
        }}>
        {italicSweep ? (
          /* CTA-only sweep mode:
             · prefix sits in a BLOCK scaling span — gently zooms on
               hover, forces the italic to fall on the next line
             · italic word is OUTSIDE the scaling span (no zoom),
               instead gets the orange-sweep + white-text treatment
             · suffix flows after the italic on that lower line */
          <>
            <span style={{...scaleStyle, display: 'block'}}>{prefix}</span>
            <span style={{
              position: 'relative', display: 'inline-block',
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              color: h ? '#FFFFFF' : C.tangerine,
              padding: '0.04em 0.18em 0.10em',
              whiteSpace: 'nowrap',
              transition: 'color .45s cubic-bezier(.2,.8,.2,1)',
              ...italicStyle,
            }}>
              <span aria-hidden style={{
                position: 'absolute', inset: 0,
                background: C.tangerine,
                opacity: h ? 1 : 0,
                transform: h ? 'scaleX(1)' : 'scaleX(0.94)',
                transformOrigin: '0% 50%',
                transition: 'opacity .5s cubic-bezier(.2,.8,.2,1), transform .55s cubic-bezier(.2,.8,.2,1)',
                zIndex: 0,
              }}/>
              <span style={{position: 'relative', zIndex: 1}}>{italic}</span>
            </span>
            {suffix}
          </>
        ) : (
          <span style={scaleStyle}>
            {prefix}
            <span style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              color: C.tangerine,
              ...italicStyle,
            }}>{italic}</span>
            {suffix}
          </span>
        )}
      </h2>
    );
  };

  // ─── Quiet underline link (color reveal on hover) ──────────
  const QuietLink = ({ children, accent = C.tangerine, style = {}, ...rest }) => {
    const [h, setH] = React.useState(false);
    return (
      <a {...rest}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', display: 'inline-flex', alignItems: 'baseline', gap: 6,
          color: h ? accent : C.ink,
          fontFamily: DISPLAY, fontWeight: 500,
          textDecoration: 'none', cursor: 'pointer',
          transition: 'color .25s ease',
          ...style,
        }}>
        {children}
        <span style={{
          position: 'absolute', left: 0, right: 0, bottom: -3, height: 1,
          background: accent,
          transformOrigin: 'left',
          transform: `scaleX(${h ? 1 : 0})`,
          transition: 'transform .35s cubic-bezier(.2,.8,.2,1)',
        }}/>
      </a>
    );
  };

  // ─── Quiet button — accent reveals on hover ────────────────
  const QuietBtn = ({ children, primary, accent = C.tangerine, size = 'md', onClick, style = {}, multiColor }) => {
    const [h, setH] = React.useState(false);
    const sizes = {
      sm: { pad: '10px 16px', fs: 13 },
      md: { pad: '14px 22px', fs: 14 },
      lg: { pad: '18px 30px', fs: 15 },
    };
    const s = sizes[size];
    const bg = primary
      ? (h ? accent : C.ink)
      : 'transparent';
    // For multi-color secondary buttons, let the CSS animation drive
    // both color and border-color; otherwise use the inline accent.
    const border = primary ? bg : ((multiColor && h) ? 'currentColor' : (h ? accent : C.lineHi));
    const ink = primary ? '#FFFFFF' : ((multiColor && h) ? undefined : (h ? accent : C.ink));
    return (
      <button
        onClick={onClick}
        className={multiColor ? 'ax-q05-multi' : undefined}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: bg, color: ink,
          border: `1px solid ${border}`,
          padding: s.pad,
          fontFamily: DISPLAY, fontWeight: 500, fontSize: s.fs,
          letterSpacing: '-0.005em', cursor: 'pointer',
          transition: multiColor && h ? 'none' : 'all .25s cubic-bezier(.2,.8,.2,1)',
          ...style,
        }}>
        {children}
        <span style={{
          fontFamily: MONO, fontSize: s.fs - 1, transform: h ? 'translateX(2px)' : 'translateX(0)',
          transition: 'transform .25s ease',
        }}>→</span>
      </button>
    );
  };

  // ─── Quiet card with latent accent ─────────────────────────
  const QuietCard = React.forwardRef(({ accent = C.tangerine, children, style = {}, padding = 28, onClick, fillOnHover, locked }, ref) => {
    const [h, setH] = React.useState(false);
    const on = locked || h;
    return (
      <div
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative',
          padding,
          background: fillOnHover && on ? accent : C.surface,
          color: fillOnHover && on ? '#FFFFFF' : C.ink,
          border: `1px solid ${on ? accent : C.line}`,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'border-color .35s ease, transform .35s cubic-bezier(.2,.8,.2,1), background .35s ease, color .35s ease',
          transform: on ? 'translateY(-3px)' : 'translateY(0)',
          ...style,
        }}>
        {/* latent accent strip — top, expands on hover/locked */}
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: on ? 'calc(100% + 2px)' : 0,
          background: accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
          pointerEvents: 'none',
        }}/>
        {children}
      </div>
    );
  });

  // ─── NAV ───────────────────────────────────────────────────
  const Nav = () => (
    <>
      <ScrollProgress/>
      <nav style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center', gap: 36,
        padding: `18px ${pad}px`,
        background: 'rgba(247,246,242,0.86)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${C.line}`,
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Wordmark size={18}/>

        <div style={{display: 'flex', justifyContent: 'center', gap: 32}}>
          {t('navLinks').map((label, i) => {
            const id = ['work', 'method', 'catalog', 'pricing', 'founder'][i];
            return (
              <QuietLink key={id}
                href={'#' + id}
                onClick={(e) => { e.preventDefault(); scrollToId(id); }}
                style={{
                  fontFamily: MONO, fontSize: 11, fontWeight: 500,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: C.dim,
                }}>{label}</QuietLink>
            );
          })}
        </div>

        <div style={{display: 'inline-flex', alignItems: 'center', gap: 18}}>
          {/* EN / ES — minimalist text toggle.  Slash separator, tight
              spacing.  Active code = ink + bold; inactive = mute,
              brightening to ink on hover.  No underlines, no fills. */}
          <span style={{
            display: 'inline-flex', alignItems: 'baseline', gap: 4,
            fontFamily: MONO, fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            {['en', 'es'].map((code, i) => {
              const isActive = lang === code;
              return (
                <React.Fragment key={code}>
                  {i > 0 && <span style={{color: C.faint, fontWeight: 400}}>/</span>}
                  <button
                    onClick={() => setLang(code)}
                    type="button"
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = C.ink; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = C.mute; }}
                    style={{
                      appearance: 'none', border: 'none', cursor: 'pointer',
                      background: 'transparent', padding: 0,
                      fontFamily: 'inherit', fontSize: 'inherit',
                      letterSpacing: 'inherit', textTransform: 'inherit',
                      color: isActive ? C.ink : C.mute,
                      fontWeight: isActive ? 700 : 500,
                      transition: 'color .25s cubic-bezier(.2,.8,.2,1)',
                    }}>
                    {code}
                  </button>
                </React.Fragment>
              );
            })}
          </span>
          <QuietBtn primary size="sm" onClick={() => openBooking(t('bookingSubject'))}>{t('navBookCall')}</QuietBtn>
        </div>
      </nav>
    </>
  );

  // ─── Ask Andrés — compact chat docked in the hero right column
  // Real keyword-matched, character-streamed assistant. Styled to
  // sit quietly inside Quiet's cream world: hairline borders, mono
  // headers, ink body, tangerine accents only.
  const AskAndres = ({ onBack, autofocus, operatorChrome }) => {
    // ─── Session persistence ───────────────────────────────────
    // The full chat state (messages + Conv/ring/thread/humanMode)
    // is mirrored to localStorage on every change and rehydrated on
    // mount.  After 24h the saved blob is treated as expired and
    // discarded, so the visitor gets a fresh chat the next day.
    const STORAGE_KEY = 'axius:chat:quiet05';
    const STORAGE_TTL_MS = 24 * 60 * 60 * 1000;
    const loadSaved = () => {
      if (typeof localStorage === 'undefined') return null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const blob = JSON.parse(raw);
        if (!blob || !blob.savedAt) return null;
        if (Date.now() - blob.savedAt > STORAGE_TTL_MS) {
          localStorage.removeItem(STORAGE_KEY);
          return null;
        }
        return blob;
      } catch (_) { return null; }
    };
    const saved = React.useMemo(() => loadSaved(), []);

    const initial = saved && Array.isArray(saved.messages) && saved.messages.length
      ? saved.messages
      : [
        { role: 'sys', text: t('askAndresOpen') },
        { role: 'bot', text: t('askAndresGreeting') },
      ];
    const [messages, setMessages] = React.useState(initial);
    const [input, setInput] = React.useState('');
    const [streaming, setStreaming] = React.useState(null);
    const [streamingRole, setStreamingRole] = React.useState('bot-ai');
    // AI is the default chat surface — every visitor message gets an
    // AI reply immediately.  "Ring Andrés" is an opt-in escape hatch:
    // when triggered, ringSeconds counts down from 60; if it reaches
    // zero with no live answer, Andrés's "I'll get back to you" reply
    // drops into the thread and the AI conversation continues.
    const [ringSeconds, setRingSeconds] = React.useState(null);
    const [hasRung, setHasRung] = React.useState(saved ? !!saved.hasRung : false);
    // When Ring fires on the Telegram path, sendMessage returns a
    // message_id; we save it so the polling loop below can filter
    // getUpdates for replies to *that* specific message (i.e. Andrés
    // tapping Telegram's Reply on the Ring notification).
    const [ringMessageId, setRingMessageId] = React.useState(saved ? saved.ringMessageId || null : null);
    // Forum-topic mode: when AxiusConfig.ringUseForumTopics is true,
    // each Ring creates a fresh topic in the supergroup and we keep
    // the thread_id here so replies/callbacks are scoped to it.
    const [ringThreadId, setRingThreadId] = React.useState(saved ? saved.ringThreadId || null : null);
    // Relay mode flips on the moment Andrés accepts the ring or sends
    // his first reply.  In relay mode every visitor message is posted
    // into the Telegram topic AND starts a 60-second fallback timer;
    // if Andrés doesn't reply within 60s, the AI answers that message
    // so the visitor never waits longer than a minute.  Andrés remains
    // on the line for subsequent messages — the timer arms per-message.
    const [humanMode, setHumanMode] = React.useState(saved ? !!saved.humanMode : false);
    // Pain signals collected across the conversation.  After three or
    // more distinct signals appear, the chat surfaces an Operational
    // Snapshot — a one-time diagnostic summary that names what we're
    // seeing, the likely impact, and which tier usually fits.
    const [painSignals, setPainSignals] = React.useState(
      saved && Array.isArray(saved.painSignals) ? saved.painSignals : []
    );
    const [snapshotShown, setSnapshotShown] = React.useState(saved ? !!saved.snapshotShown : false);
    const pendingTimersRef = React.useRef({});   // msgId → timeout handle
    const ringFiredAtRef = React.useRef(saved ? saved.ringFiredAt || null : null); // unix s
    const seenUpdatesRef = React.useRef(new Set()); // per-browser de-dupe
    // Short conversation tag so concurrent visitors are visually
    // distinct in Telegram (and the Accept inline button can scope
    // its callback_data to this ring).  Restored across refresh so a
    // resumed session reconnects to the same Telegram topic.
    const convoId = React.useMemo(
      () => (saved && saved.convoId) || Math.random().toString(36).slice(2, 8).toUpperCase(),
      []
    );
    const scrollRef = React.useRef(null);
    const inputRef = React.useRef(null);

    React.useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, streaming]);

    React.useEffect(() => {
      if (autofocus && inputRef.current) {
        const tid = setTimeout(() => inputRef.current && inputRef.current.focus(), 360);
        return () => clearTimeout(tid);
      }
    }, [autofocus]);

    // Persist on every meaningful state change.  The full message
    // array can grow, so we trim to the last 200 entries before save
    // — generous for the chat surface, bounded for localStorage.
    React.useEffect(() => {
      if (typeof localStorage === 'undefined') return;
      try {
        const blob = {
          savedAt: Date.now(),
          convoId,
          messages: messages.slice(-200),
          hasRung,
          ringMessageId,
          ringThreadId,
          humanMode,
          ringFiredAt: ringFiredAtRef.current,
          painSignals,
          snapshotShown,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(blob));
      } catch (_) { /* quota / serialise — ignore */ }
    }, [messages, hasRung, ringMessageId, ringThreadId, humanMode, convoId, painSignals, snapshotShown]);

    // Operational-diagnosis library.  Each reply leads with what's
    // happening operationally, names the pattern, and proposes how
    // we'd structure it — not what tools to buy.  No self-promotion;
    // tier mentions arrive only when the diagnosis points there.
    const responsesByLang = {
      en: {
        // Opening / generic — never claim AI; mirror the operator voice
        greet: "Tell me what's currently slowing the business down, breaking repeatedly, or depending too much on you. I'll show you how we'd structure it operationally.",

        // Pain-chip diagnoses (return operational picture, not product pitch)
        painTools:     "Tool sprawl usually isn't a software problem — it's an ownership problem. When nobody is operating the systems, each new tool quietly becomes another tab.\n\nFirst move: stack audit + workflow consolidation map. Most stacks shrink 30–40% in the first 90 days because half the tools were doing the same job for different people.\n\nThis usually sits in the Team layer.",
        painLeads:     "Lead leakage is the most expensive operational failure in any SMB. Usually three causes: missed-call recovery, no routing, no follow-up sequence.\n\nWhat we'd do: instrument the funnel end-to-end, plug the missed-call gap (typically recovers 20–30% of inbound), and put automatic follow-up on dormant leads.\n\nThis usually sits in the Team layer.",
        painDepends:   "Founder-as-bottleneck is the most common pattern we see. The fix isn't more headcount — it's documented systems and one accountable layer running them.\n\nWhat we'd do: map the workflows currently living in your head, document them inside your stack, then operate them on your behalf.\n\nThis usually sits in the Department layer.",
        painSystems:   "\"Better systems\" is a diagnosis, not a solution. We'd start by listing the operational moments where work currently stalls — usually 4–6 specific places — and rebuild those first. Systems that compound, not systems that exist.\n\nMost stacks need 5–7 workflows to feel fully operated. That's the Team layer.",
        painImprove:   "Three things usually show up in the first audit:\n\n  · One workflow that's manual but should be automatic (typically pulls 4–8 hrs/week from someone)\n  · One tool you pay for but nobody owns (kill or wire it)\n  · One handoff between systems that breaks silently (usually CRM ↔ calendar or billing ↔ CRM)\n\nThose three alone typically pay for the first month.",
        painAutomate:  "First two automations are almost always:\n\n  1. Missed-call → text-back + callback queue (recovers 20–30% of inbound leads)\n  2. Lead → CRM → calendar handoff (kills the most common drop-off in the funnel)\n\nNeither is glamorous. Both compound monthly.",
        painBreaking:  "If something is breaking repeatedly, it's almost never the tool — it's a missing operational owner. The same fix run by the same hand month after month is what stabilises it.\n\nThat's exactly what we do. One operator on your stack. Documented, accountable, same hand every month.",

        // Practical (what / how)
        method: "How we work:\n\n  I  · Audit       (Days 1–7)   → written stack audit\n  II · Configure  (Days 8–14)  → workflow map you sign off on\n  III · Operate   (Month 1+)   → monthly operations report\n  IV · Evolve     (Quarterly)  → roadmap review\n\nEvery artifact lives in your accounts.",
        onboard: "Onboarding runs 7–14 days by tier.\n\n  · Days 1–7   — stack audit, leak report, recommended order of operations\n  · Days 8–14  — workflow map, you sign off in writing\n  · Day 14+    — operations begin, monthly billing starts after sign-off\n\nNothing is built until you've approved what we're building.",
        guarantee: "First-month outcome guarantee on Team and Department. We agree to one operationally meaningful win at kickoff. If we don't deliver it in the agreed timeline, we keep working at no additional cost.",

        // Light reference (asked directly)
        pricing: "Three operating layers, sized by capacity and response:\n\n  $1,000 / mo · Operator     · 2 pts  · 72h\n  $2,500 / mo · Team         · 5 pts  · 48h\n  $5,000 / mo · Department   · 10 pts · 24h\n\nMonth-to-month after 90 days. One-time setup per tier. Capacity is measured in points — a point is roughly one operated workflow.",
        catalog: "129 operational workflows across 9 categories — Sales, CX, Operations, AI, Data, Web, Software, Marketing, Content. Ask which categories matter most for your current bottlenecks and I'll show you where we'd start.",
        response: "Guaranteed response windows by tier.\n\n  72h · Operator\n  48h · Team\n  24h · Department\n\nUS business hours, MDE timezone.",
        vsAgency: "Agencies rent you account managers, slide decks, and a ticket queue. Axius is one operator running your stack month over month — same hand on it every month, with a vetted specialist bench underneath. One line. One bill. One accountable layer.",
        founder: "Andrés Toro — ten years inside SMB operations across the US and Latin America. Based in Altamonte Springs, FL · currently operating from Medellín. Available on US business hours, EN/ES.",
        contact: "Schedule a 30-minute conversation from the button at the top of the page, or write to andres@axius.tech. Either way you leave with a one-page audit of where your stack is leaking.",

        // Fallback — still operational, never "I don't know"
        default: "Tell me a little more about what's slowing the business down — what's breaking, what depends on you, or what feels manual. I'll show you operationally how we'd structure it.",
      },
      es: {
        greet: "Cuéntame qué está frenando al negocio, qué se rompe seguido, o qué depende demasiado de ti. Te muestro cómo lo estructuraríamos operativamente.",

        painTools:     "El exceso de herramientas casi nunca es un problema de software — es un problema de propiedad. Cuando nadie opera los sistemas, cada herramienta nueva se vuelve otra pestaña.\n\nPrimer paso: auditoría de stack + mapa de consolidación de workflows. La mayoría de stacks se reducen 30–40% en los primeros 90 días.\n\nNormalmente cae en la capa Equipo.",
        painLeads:     "La fuga de leads es la falla operativa más cara en cualquier PyME. Suele tener tres causas: recuperación de llamadas perdidas, ausencia de routing, sin follow-up.\n\nLo que haríamos: instrumentar el funnel completo, tapar el missed-call (recupera 20–30% del inbound), y poner follow-up automático sobre leads dormidos.\n\nNormalmente cae en la capa Equipo.",
        painDepends:   "El fundador-como-cuello-de-botella es el patrón más común que vemos. La solución no es más headcount — es sistemas documentados y una capa responsable que los opera.\n\nLo que haríamos: mapear los workflows que viven en tu cabeza, documentarlos dentro de tu stack, y operarlos por ti.\n\nNormalmente cae en la capa Departamento.",
        painSystems:   "\"Mejores sistemas\" es un diagnóstico, no una solución. Empezaríamos listando los momentos operativos donde el trabajo se detiene — usualmente 4–6 puntos — y reconstruimos esos primero. Sistemas que se acumulan, no sistemas que existen.\n\nLa mayoría de stacks necesitan 5–7 workflows para sentirse plenamente operados. Esa es la capa Equipo.",
        painImprove:   "Tres cosas aparecen casi siempre en la primera auditoría:\n\n  · Un workflow manual que debería ser automático (típicamente quita 4–8 hrs/sem a alguien)\n  · Una herramienta que pagas pero nadie opera (matarla o conectarla)\n  · Un handoff entre sistemas que se rompe en silencio (usualmente CRM ↔ calendario o billing ↔ CRM)\n\nSolo esas tres pagan el primer mes.",
        painAutomate:  "Las dos primeras automatizaciones casi siempre son:\n\n  1. Missed-call → text-back + cola de callback (recupera 20–30% del inbound)\n  2. Lead → CRM → handoff a calendario (mata el drop-off más común del funnel)\n\nNinguna es glamorosa. Ambas se acumulan mes a mes.",
        painBreaking:  "Si algo se rompe seguido, casi nunca es la herramienta — es la falta de un dueño operativo. El mismo fix corrido por la misma mano mes tras mes es lo que estabiliza.\n\nEso es exactamente lo que hacemos. Un operador en tu stack. Documentado, responsable, la misma mano cada mes.",

        method: "Cómo trabajamos:\n\n  I  · Auditoría    (Días 1–7)   → auditoría escrita del stack\n  II · Configurar  (Días 8–14)  → mapa de workflows que apruebas por escrito\n  III · Operar     (Mes 1+)     → reporte mensual de operaciones\n  IV · Evolucionar (Trimestral) → revisión del roadmap\n\nCada artefacto vive en tus cuentas.",
        onboard: "El onboarding toma 7–14 días según el tier.\n\n  · Días 1–7   — auditoría de stack, reporte de fugas, orden de operaciones\n  · Días 8–14  — mapa de workflows, lo apruebas por escrito\n  · Día 14+    — empieza la operación, el cobro mensual arranca tras la aprobación\n\nNada se construye hasta que apruebas qué se construye.",
        guarantee: "Garantía de resultado el primer mes en Equipo y Departamento. Acordamos juntos un resultado operativo significativo. Si no lo entregamos en el plazo acordado, seguimos trabajando sin costo adicional.",

        pricing: "Tres capas operativas, dimensionadas por capacidad y respuesta:\n\n  $1,000 / mes · Operador     · 2 pts  · 72h\n  $2,500 / mes · Equipo       · 5 pts  · 48h\n  $5,000 / mes · Departamento · 10 pts · 24h\n\nMes a mes después de 90 días. Setup único por tier. La capacidad se mide en puntos — un punto es aproximadamente un workflow operado.",
        catalog: "129 workflows operativos en 9 categorías — Ventas, CX, Operaciones, IA, Datos, Web, Software, Marketing, Contenido. Dime qué categorías importan más para tus cuellos de botella actuales y te muestro por dónde empezaríamos.",
        response: "Ventanas de respuesta garantizadas por tier.\n\n  72h · Operador\n  48h · Equipo\n  24h · Departamento\n\nHorario laboral EE.UU., zona MDE.",
        vsAgency: "Las agencias te rentan account managers, mazos de slides, y una fila de tickets. Axius es un operador corriendo tu stack mes tras mes — la misma mano cada mes, con un banco de especialistas verificado debajo. Una línea. Una factura. Una capa responsable.",
        founder: "Andrés Toro — diez años dentro de operaciones de PyMEs en EE.UU. y América Latina. Basado en Altamonte Springs, FL · operando actualmente desde Medellín. Disponible en horario laboral EE.UU., EN/ES.",
        contact: "Agenda una conversación de 30 minutos desde el botón arriba, o escribe a andres@axius.tech. En cualquier caso te llevas una auditoría de una página de dónde tu stack está perdiendo.",

        default: "Cuéntame un poco más sobre qué está frenando al negocio — qué se rompe, qué depende de ti, o qué se siente manual. Te muestro operativamente cómo lo estructuraríamos.",
      },
    };
    const responses = responsesByLang[lang] || responsesByLang.en;

    const match = (q) => {
      const s = q.toLowerCase();
      // Pain-chip / pain-language matchers — checked FIRST so the chat
      // leads with operational diagnosis instead of product reference.
      if (/drown|too many tools|tool sprawl|ahogad|demasiadas herramientas|exceso de herramientas/.test(s)) return responses.painTools;
      if (/leads? (slip|leak|escap|caen|drop)|missed call|llamadas perdidas|se nos escapa/.test(s)) return responses.painLeads;
      if (/depend.+(on me|on the founder|on us)|todo depende|cuello de botella|bottleneck/.test(s)) return responses.painDepends;
      if (/(better|need|necesit).+system|mejores? sistema|necesitamos sistema/.test(s)) return responses.painSystems;
      if (/what (would|could) you (improve|automate|fix)|qu[ée] (mejorar|automatizar|arreglar)|show me what|mu[eé]strame qu[ée]/.test(s)) {
        if (/automat/.test(s)) return responses.painAutomate;
        return responses.painImprove;
      }
      if (/breaking|breaks|romp|se rompe|se cae|broken|fails/.test(s)) return responses.painBreaking;

      // Greetings — short, no AI talk
      if (/^\s*(hi|hello|hey|hola|buen)/.test(s) && s.length < 20) return responses.greet;

      // Practical references (only when asked directly)
      if (/onboard|kickoff|start|empez|arranc|primeros (d[ií]as|d[ií]as)/.test(s)) return responses.onboard;
      if (/method|stage|process|how.+work|m[ée]todo|funciona/.test(s)) return responses.method;
      if (/guarantee|refund|risk|garant[ií]a|qu[ée] pasa si/.test(s)) return responses.guarantee;
      if (/response|tiempo|cu[áa]nto.+tarda|how.+fast|24h|48h|72h/.test(s)) return responses.response;
      if (/agency|agencia|different|diferen/.test(s)) return responses.vsAgency;
      if (/pric|cost|tier|fee|month|how much|precio|cu[áa]nto cuesta/.test(s)) return responses.pricing;
      if (/catalog|workflow|index|what.+do|cat[áa]logo/.test(s)) return responses.catalog;
      if (/founder|andr[eé]s|operator|who|qui[ée]n/.test(s)) return responses.founder;
      if (/contact|reach|email|book|schedule|agenda/.test(s)) return responses.contact;
      return responses.default;
    };

    // Stream a reply character-by-character.  `ai === true` tags the
    // resulting message as coming from the AI twin (used for styling
    // the "AI." gutter mark + lavender accent on the message).
    // streamReply (reply, ai, opts?)
    //   ai === true  → 'bot-ai' (lavender AI. glyph)
    //   ai === false → 'bot'    (tangerine A. glyph)
    //   opts.asAndres === true   → render as 'andres' role but without
    //     the LIVE badge (so canned chip answers look like Andrés
    //     typed them once he's on the line, without misrepresenting
    //     the answer as a live human reply).
    const streamReply = (reply, ai, opts) => {
      const asAndres = opts && opts.asAndres;
      const role = asAndres ? 'andres' : (ai ? 'bot-ai' : 'bot');
      setStreamingRole(role);
      setStreaming('');
      let i = 0;
      const speed = Math.max(10, Math.min(22, 1100 / reply.length));
      const id = setInterval(() => {
        i += 2;
        if (i >= reply.length) {
          clearInterval(id);
          setMessages(m => [...m, { role, text: reply, live: asAndres ? false : undefined }]);
          setStreaming(null);
        } else {
          setStreaming(reply.slice(0, i));
        }
      }, speed);
    };

    // Ring Andrés: opt-in escalation to the human, in-chat by default.
    //   - Drops a "ring sent" system line into the thread, starts the
    //     60s countdown banner.  AI keeps responding to any messages
    //     typed during the ring.  At zero, Andrés's "I'll get back to
    //     you" reply lands in the thread.
    //   - Fires AxiusConfig.ringWebhookUrl in the background with the
    //     full transcript so Andrés gets a live phone notification
    //     (Telegram / Pushover / Discord / email-via-Formspree / etc).
    //   - If AxiusConfig.ringBehavior === 'whatsapp', opens wa.me
    //     instead of staying in-chat (legacy redirect path).
    const startRing = () => {
      if (ringSeconds !== null) return;
      const cfg = window.AxiusConfig || {};
      const behavior = cfg.ringBehavior || 'inChat';
      const wa = cfg.whatsappNumber || '';
      const webhook = cfg.ringWebhookUrl || '';
      const transcript = messages
        .map(m => `[${m.role}] ${m.text}`)
        .join('\n');
      const recent = messages
        .filter(m => m.role === 'user')
        .slice(-3)
        .map(m => `• ${m.text}`)
        .join('\n');

      // Legacy WhatsApp redirect path (only if explicitly opted in).
      if (behavior === 'whatsapp' && wa) {
        const intro = `Hi Andrés — I'm on axius.tech and would like to speak with you directly.`;
        const body = recent ? `${intro}\n\nRecent questions:\n${recent}` : intro;
        window.open(`https://wa.me/${wa}?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
        setHasRung(true);
        setMessages(m => [...m, { role: 'sys-ring', text: t('chatRingMessageSent') }]);
        return;
      }

      // In-chat default: stay in the conversation.  Only claim the
      // notification was sent when there's actually a webhook to
      // receive it; otherwise we'd lie to the visitor.
      setHasRung(true);
      setMessages(m => [...m, {
        role: 'sys-ring',
        text: webhook ? t('chatRingMessageSent') : t('chatRingNoWebhook'),
      }]);
      setRingSeconds(60);
      if (webhook) {
        try {
          const page = typeof location !== 'undefined' ? location.href : '';
          const firstQ = (messages.find(m => m.role === 'user') || {}).text || '';
          // Visitor language flag — the site's active locale at ring
          // time.  We surface this prominently (header + topic name)
          // so Andrés can switch register before tapping Reply.
          const langTag      = lang === 'es' ? 'ES' : 'EN';
          const langFlag     = lang === 'es' ? '🇪🇸' : '🇺🇸';
          const langName     = lang === 'es' ? 'Spanish' : 'English';
          // Lightweight visitor metadata — browser locale + timezone +
          // referrer.  No fingerprinting; just enough to set context.
          let tz = '', browserLocale = '', ref = '';
          try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (_) {}
          try { browserLocale = (navigator.language || '').toString(); } catch (_) {}
          try { ref = (document.referrer || '').toString(); } catch (_) {}
          // HTML mode (not Markdown) — visitor-supplied strings and
          // metadata can contain underscores, asterisks etc. that
          // would break the Markdown parser.  HTML escape user text.
          const esc = (s) => String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const messageText =
            `🔔 <b>Ring from axius.tech</b> — Conv <code>${esc(convoId)}</code>\n` +
            `${langFlag} <b>Language:</b> ${langName} (<code>${langTag}</code>)\n\n` +
            (recent ? `<b>Recent questions:</b>\n${esc(recent)}\n\n` : '') +
            `<b>Full transcript:</b>\n${esc(transcript || '(no transcript)')}\n\n` +
            `↪ <b>To reply:</b> long-press this message → Reply. Your text appears live in the visitor's chat.\n\n` +
            `<b>Page:</b> ${esc(page)}\n` +
            (ref ? `<b>Referrer:</b> ${esc(ref)}\n` : '') +
            `<b>Timezone:</b> ${esc(tz || 'unknown')} · <b>Browser:</b> ${esc(browserLocale || 'unknown')}\n` +
            `<b>Time:</b> ${new Date().toISOString()}`;

          if (/api\.telegram\.org\/bot/.test(webhook)) {
            // Telegram path — supports two modes:
            //   · ringUseForumTopics === true: createForumTopic first
            //     so each visitor gets their own thread in the group.
            //     sendMessage carries message_thread_id; the polling
            //     loop later filters replies/callbacks by that thread.
            //   · false: post directly to the chat (1:1 DM mode).
            const tokenMatch = webhook.match(/api\.telegram\.org\/bot([^/]+)\//);
            const base = tokenMatch ? `https://api.telegram.org/bot${tokenMatch[1]}` : '';
            const chatId = (cfg.ringWebhookChatId || '').toString();
            const useTopics = !!cfg.ringUseForumTopics;
            ringFiredAtRef.current = Math.floor(Date.now() / 1000);

            (async () => {
              try {
                let threadId = null;
                if (useTopics && base) {
                  // Topic name encodes language up front so Andrés can
                  // sort EN vs ES from Telegram's topic list at a glance.
                  // Icon colour also forks by language (Telegram only
                  // accepts a fixed palette of 6): coral for EN, blue
                  // for ES.
                  const topicName = (firstQ
                    ? `[${langTag}] Conv ${convoId} · ${firstQ}`
                    : `[${langTag}] Conv ${convoId}`).slice(0, 124);
                  const iconColor = lang === 'es' ? 7322096 : 16478047;
                  const topicRes = await fetch(`${base}/createForumTopic`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      chat_id: chatId,
                      name: topicName,
                      icon_color: iconColor,
                    }),
                  }).then(r => r.json()).catch(() => null);
                  if (topicRes && topicRes.ok && topicRes.result) {
                    threadId = topicRes.result.message_thread_id;
                    setRingThreadId(threadId);
                  }
                  // If createForumTopic failed (perms revoked, etc.)
                  // we silently fall back to root-of-chat posting so
                  // the Ring still gets through.
                }
                const sendPayload = {
                  chat_id: chatId,
                  text: messageText,
                  parse_mode: 'HTML',
                  disable_web_page_preview: true,
                  reply_markup: {
                    inline_keyboard: [[
                      { text: '✓ I\'m here — accept', callback_data: `accept:${convoId}` },
                    ]],
                  },
                };
                if (threadId) sendPayload.message_thread_id = threadId;
                const sendRes = await fetch(`${base}/sendMessage`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(sendPayload),
                }).then(r => r.json()).catch(() => null);
                if (sendRes && sendRes.ok && sendRes.result && sendRes.result.message_id) {
                  setRingMessageId(sendRes.result.message_id);
                }
              } catch (_) { /* silent — UX must not depend on this */ }
            })();
          } else if (/discord\.com\/api\/webhooks\//.test(webhook)) {
            fetch(webhook, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: messageText }),
              mode: 'cors', keepalive: true,
            }).catch(() => {});
          } else {
            fetch(webhook, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                source: 'axius.tech',
                event: 'ring_andres',
                timestamp: new Date().toISOString(),
                page,
                recent_questions: recent,
                transcript,
              }),
              mode: 'cors', keepalive: true,
            }).catch(() => {});
          }
        } catch (_) { /* no-op */ }
      }
    };

    React.useEffect(() => {
      if (ringSeconds === null) return;
      if (ringSeconds <= 0) {
        setRingSeconds(null);
        setMessages(m => [...m, { role: 'bot', text: t('chatRingNoAnswer') }]);
        return;
      }
      const id = setTimeout(() => setRingSeconds(c => (c === null ? null : c - 1)), 1000);
      return () => clearTimeout(id);
    }, [ringSeconds]);

    // ─── Two-way Telegram bridge ───────────────────────────────
    // Once a Ring fires on the Telegram path, poll getUpdates every
    // 4s for two kinds of inbound activity tied to *this* ring:
    //   1. Replies (Andrés long-presses our Ring message → Reply):
    //      `update.message.reply_to_message.message_id === ringMessageId`
    //      → injected as a live 'andres' bubble.
    //   2. Accept button taps (Andrés clicks the inline ✓ button):
    //      `update.callback_query.data === 'accept:<convoId>'`
    //      → a 'sys-ring' "Andrés is here" notice, the countdown stops.
    //
    // Multi-visitor safety: we DON'T advance Telegram's offset on
    // each poll, because getUpdates is single-consumer (advancing
    // offset deletes updates for every concurrent client).  Instead
    // we read with no offset and de-dupe locally via seenUpdatesRef,
    // and date-filter by ringFiredAtRef so older queue entries are
    // ignored.  Telegram expires unconfirmed updates after ~24h, so
    // the per-browser queue stays bounded for low-volume sites.
    React.useEffect(() => {
      if (!ringMessageId) return;
      const cfg = window.AxiusConfig || {};
      const webhook = cfg.ringWebhookUrl || '';
      const m = webhook.match(/api\.telegram\.org\/bot([^/]+)\//);
      if (!m) return;
      const base = `https://api.telegram.org/bot${m[1]}`;
      const chatId = String(cfg.ringWebhookChatId || '');
      let stopped = false;
      let timer = null;
      const firedAt = ringFiredAtRef.current || 0;
      const poll = async () => {
        if (stopped) return;
        try {
          const r = await fetch(`${base}/getUpdates?timeout=0&allowed_updates=` +
            encodeURIComponent(JSON.stringify(['message', 'callback_query'])));
          const data = await r.json();
          if (data && data.ok && Array.isArray(data.result)) {
            for (const u of data.result) {
              if (seenUpdatesRef.current.has(u.update_id)) continue;
              seenUpdatesRef.current.add(u.update_id);

              // Reply path — when forum topics are in use we ALSO
              // require the reply to be inside this visitor's thread.
              // ANY reply in the topic from Andrés (not just replies to
              // the initial Ring) flips humanMode on and is delivered,
              // so the operator can speak freely after the first turn.
              const msg = u.message;
              const isInScope = msg
                && String(msg.chat.id) === chatId
                && (msg.date || 0) >= firedAt
                && (!ringThreadId || msg.message_thread_id === ringThreadId);
              const isRingReply = msg && msg.reply_to_message
                && msg.reply_to_message.message_id === ringMessageId;
              // In topic mode: any operator message in the thread is a
              // reply to the visitor (excluding our own visitor-relay
              // echoes, which start with the 💬 marker).
              const isThreadMessage = msg && ringThreadId
                && msg.message_thread_id === ringThreadId
                && msg.from && !msg.from.is_bot
                && !(msg.text || '').startsWith('💬 ');
              if (isInScope && (isRingReply || isThreadMessage)) {
                const text = (msg.text || '').trim();
                if (text) {
                  Object.values(pendingTimersRef.current).forEach(clearTimeout);
                  pendingTimersRef.current = {};
                  setMessages(prev => [...prev, { role: 'andres', text }]);
                  setRingSeconds(null);
                  setHumanMode(true);
                }
              }

              // Accept button path — same thread scoping
              const cq = u.callback_query;
              if (cq && cq.data === `accept:${convoId}`
                  && cq.message && cq.message.message_id === ringMessageId
                  && (!ringThreadId || cq.message.message_thread_id === ringThreadId)) {
                // 1) Acknowledge the tap (toast on operator's device)
                fetch(`${base}/answerCallbackQuery`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    callback_query_id: cq.id,
                    text: '✓ You\'re in — visitor notified',
                  }),
                }).catch(() => {});
                // 2) Morph the inline button so it reflects the state
                //    ("✓ Accepted at HH:MM") — Telegram has no native
                //    disabled style for inline buttons, so we replace
                //    the keyboard with a single visibly-accepted entry
                //    whose callback is a no-op.
                const hh = String(new Date().getHours()).padStart(2, '0');
                const mm = String(new Date().getMinutes()).padStart(2, '0');
                fetch(`${base}/editMessageReplyMarkup`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    message_id: ringMessageId,
                    reply_markup: {
                      inline_keyboard: [[
                        { text: `✓ Accepted at ${hh}:${mm}`, callback_data: `noop:${convoId}` },
                      ]],
                    },
                  }),
                }).catch(() => {});
                // 3) Drop an explicit "you're connected" confirmation
                //    into the topic so the operator has a clear signal
                //    in the conversation thread, not just a toast.
                const connectPayload = {
                  chat_id: chatId,
                  text: `✅ <b>You're connected to Conv <code>${convoId}</code></b>\n` +
                        `Type anything in this topic and it appears live in the visitor's chat.\n` +
                        `If you go quiet for 60s on any single message, the AI answers that one so the visitor isn't left waiting.`,
                  parse_mode: 'HTML',
                  disable_web_page_preview: true,
                };
                if (ringThreadId) connectPayload.message_thread_id = ringThreadId;
                fetch(`${base}/sendMessage`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(connectPayload),
                }).catch(() => {});
                setMessages(prev => [...prev, { role: 'sys-ring', text: t('chatAndresHere') }]);
                setRingSeconds(null);
                setHumanMode(true);
              }
            }
          }
        } catch (_) { /* silent */ }
        if (!stopped) timer = setTimeout(poll, 4000);
      };
      poll();
      return () => {
        stopped = true;
        if (timer) clearTimeout(timer);
        // Clear any pending per-message fallback timers
        Object.values(pendingTimersRef.current).forEach(clearTimeout);
        pendingTimersRef.current = {};
      };
    }, [ringMessageId, ringThreadId, convoId]);

    // Relay a visitor message into the active Telegram topic so Andrés
    // can read and respond from his Telegram client.
    const relayVisitorToTopic = (text) => {
      const cfg = window.AxiusConfig || {};
      const webhook = cfg.ringWebhookUrl || '';
      const tokenMatch = webhook.match(/api\.telegram\.org\/bot([^/]+)\//);
      if (!tokenMatch) return;
      const base = `https://api.telegram.org/bot${tokenMatch[1]}`;
      const chatId = (cfg.ringWebhookChatId || '').toString();
      const esc = (s) => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const payload = {
        chat_id: chatId,
        text: `💬 <b>Visitor:</b> ${esc(text)}`,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      };
      if (ringThreadId) payload.message_thread_id = ringThreadId;
      fetch(`${base}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => { /* silent */ });
    };

    // Detect operational pain signals in a visitor message.  Returns
    // an array of distinct signal keys present (tools/leads/depends/
    // systems/breaking/improve).  Used to decide when to surface the
    // Operational Snapshot diagnostic.
    const detectPainSignals = (s) => {
      const text = s.toLowerCase();
      const hits = [];
      if (/drown|too many tools|tool sprawl|ahogad|demasiadas herramientas|exceso de herramientas/.test(text)) hits.push('tools');
      if (/leads? (slip|leak|escap|caen|drop)|missed call|llamadas perdidas|se nos escapa/.test(text)) hits.push('leads');
      if (/depend.+(on me|on the founder|on us)|todo depende|cuello de botella|bottleneck/.test(text)) hits.push('depends');
      if (/(better|need|necesit).+system|mejores? sistema|necesitamos sistema/.test(text)) hits.push('systems');
      if (/breaking|breaks|romp|se rompe|se cae|broken|fails/.test(text)) hits.push('breaking');
      if (/manual|hours? a week|by hand|repetitive|tedio|repetitiv/.test(text)) hits.push('manual');
      if (/disorganized|chaotic|chaos|no owner|nobody owns|desorganiz|ca[óo]tic/.test(text)) hits.push('chaos');
      return hits;
    };

    const ask = (q, opts) => {
      const fromChip = !!(opts && opts.fromChip);
      const text = (q || '').trim();
      if (!text || streaming !== null) return;
      const msgId = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setMessages(m => [...m, { role: 'user', text, id: msgId }]);
      setInput('');

      // Track distinct pain signals across the conversation
      const hits = detectPainSignals(text);
      let nextSignals = painSignals;
      if (hits.length) {
        nextSignals = Array.from(new Set([...painSignals, ...hits]));
        if (nextSignals.length !== painSignals.length) setPainSignals(nextSignals);
      }
      // After 3+ distinct pain signals, surface the Operational
      // Snapshot once (after the AI reply has finished streaming).
      const shouldSurfaceSnapshot = !snapshotShown && nextSignals.length >= 3 && !humanMode;

      if (humanMode && fromChip) {
        const delay = 1500 + Math.floor(Math.random() * 1000);
        setStreamingRole('andres');
        setStreaming('');
        setTimeout(() => {
          setStreaming(null);
          streamReply(match(text), true, { asAndres: true });
        }, delay);
        return;
      }

      if (humanMode) {
        relayVisitorToTopic(text);
        pendingTimersRef.current[msgId] = setTimeout(() => {
          delete pendingTimersRef.current[msgId];
          streamReply(match(text), true);
        }, 60000);
        return;
      }

      // AI-first default — every message gets an immediate AI reply.
      streamReply(match(text), true);

      // If the threshold was just crossed, schedule the snapshot to
      // drop in shortly after the AI reply lands (a beat of breathing
      // room — feels diagnostic rather than reflexive).
      if (shouldSurfaceSnapshot) {
        // 'depends' (founder-as-bottleneck) or ≥ 5 distinct pain
        // signals → Department.  Otherwise default to Team.  Operator
        // tier is too small for visitors who've named 3+ pain points.
        const tier = nextSignals.includes('depends') || nextSignals.length >= 5
          ? 'department'
          : 'team';
        const snapshotMsg = {
          role: 'sys-snapshot',
          id: `snap-${Date.now()}`,
          signals: nextSignals,
          tier,
        };
        setTimeout(() => {
          setMessages(m => [...m, snapshotMsg]);
          setSnapshotShown(true);
        }, 5000);
      }
    };

    const suggestions = t('askAndresSuggestions');

    return (
      <div style={{
        position: 'relative',
        background: C.surface,
        display: 'flex', flexDirection: 'column',
        flex: 1, width: '100%', maxWidth: '100%', minWidth: 0, minHeight: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: operatorChrome ? '14px 22px' : '7px 14px',
          borderBottom: `1px solid ${C.line}`,
          background: operatorChrome ? 'transparent' : C.panel,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: operatorChrome ? 14 : 14}}>
            {onBack && (
              <button type="button" onClick={onBack}
                aria-label="Back to direct line"
                style={{
                  appearance: 'none', cursor: 'pointer',
                  background: C.ink,
                  border: `1px solid ${C.ink}`,
                  fontFamily: MONO, fontSize: 11, fontWeight: 700,
                  color: C.bg,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  padding: '5px 12px',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'all .2s ease',
                  zIndex: 2, position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = C.tangerine;
                  e.currentTarget.style.borderColor = C.tangerine;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = C.ink;
                  e.currentTarget.style.borderColor = C.ink;
                }}>
                <span aria-hidden style={{fontSize: 14, lineHeight: 1, marginTop: -1}}>←</span>
                <span>{t('chatBack')}</span>
              </button>
            )}
            {operatorChrome ? (
              <Eyebrow color={C.tangerine}>{t('opCardOperator')}</Eyebrow>
            ) : (
              <>
                <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 16, color: C.tangerine}}>
                  {t('chatAskAndres')}
                </span>
                <Eyebrow color={C.mute}>{t('chatDirectLine')}</Eyebrow>
              </>
            )}
          </div>
          {operatorChrome ? (
            <div style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
              <span aria-hidden style={{
                display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                background: C.mint,
                animation: 'axQ05Pulse 2.4s ease-out infinite',
              }}/>
              <Eyebrow color={C.dim}>{t('opCardOnline')}</Eyebrow>
            </div>
          ) : (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: MONO, fontSize: 9, color: C.dim,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
              <span style={{
                display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                background: C.tangerine,
                animation: 'axQ05Pulse 2.4s ease-out infinite',
              }}/>
              {t('chatOpen')}
            </span>
          )}
        </div>

        <div ref={scrollRef} className="ax-quiet05-scroll" style={{
          padding: '12px 16px',
          flex: 1, minHeight: 0, overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {messages.map((m, i) => <AndresLine key={i} m={m}/>)}
          {streaming !== null && (
            <AndresLine m={{ role: streamingRole, text: streaming + '▍' }}/>
          )}
          {ringSeconds !== null && (
            <div style={{
              padding: '10px 12px',
              background: C.panel,
              borderLeft: `2px solid ${C.tangerine}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
                <span aria-hidden style={{
                  display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                  background: C.tangerine,
                  animation: 'axQ05Pulse 2.4s ease-out infinite',
                }}/>
                <span style={{
                  fontFamily: DISPLAY, fontSize: 12, color: C.ink,
                }}>{t('chatRinging')}</span>
              </div>
              <div style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
                <span style={{
                  fontFamily: MONO, fontSize: 10, color: C.mute,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                }}>
                  {t('chatRingMeanwhile')} · <span style={{
                    color: C.tangerine, fontWeight: 500, fontVariantNumeric: 'tabular-nums',
                  }}>{t('chatRingSeconds')(ringSeconds)}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions row — chip grammar shifts in operator chrome:
            mono uppercase, square hairline border, no italic serif. */}
        <div className="ax-quiet05-scroll" style={{
          padding: operatorChrome ? '10px 22px' : '7px 14px',
          borderTop: `1px solid ${C.line}`,
          display: 'flex', gap: operatorChrome ? 8 : 6, background: C.bg,
          overflowX: 'auto', overflowY: 'hidden',
          scrollbarWidth: 'thin',
          flexShrink: 0,
          minWidth: 0, width: '100%', boxSizing: 'border-box',
        }}>
          {/* Ring Andrés — first chip, ink-filled escalation in operator
              chrome (matches OperatorCard's MESSAGE DIRECTLY button), or
              tangerine-filled in the default chat surface. */}
          <button type="button" onClick={startRing}
            disabled={ringSeconds !== null || hasRung}
            style={{
              appearance: 'none',
              border: `1px solid ${
                (ringSeconds !== null || hasRung)
                  ? C.lineHi
                  : (operatorChrome ? C.ink : C.tangerine)
              }`,
              background: (ringSeconds !== null || hasRung)
                ? 'transparent'
                : (operatorChrome ? C.ink : C.tangerine),
              padding: operatorChrome ? '6px 12px' : '4px 10px',
              cursor: (ringSeconds !== null || hasRung) ? 'not-allowed' : 'pointer',
              fontFamily: MONO, fontSize: 10, fontWeight: 500,
              color: (ringSeconds !== null || hasRung)
                ? C.mute
                : (operatorChrome ? C.bg : '#FFFFFF'),
              letterSpacing: '0.18em', textTransform: 'uppercase',
              transition: 'all .2s ease',
              whiteSpace: 'nowrap', flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
            onMouseEnter={operatorChrome ? (e) => {
              if (ringSeconds !== null || hasRung) return;
              e.currentTarget.style.background = C.tangerine;
              e.currentTarget.style.borderColor = C.tangerine;
            } : undefined}
            onMouseLeave={operatorChrome ? (e) => {
              if (ringSeconds !== null || hasRung) return;
              e.currentTarget.style.background = C.ink;
              e.currentTarget.style.borderColor = C.ink;
            } : undefined}>
            <span aria-hidden style={{
              display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
              background: (ringSeconds !== null || hasRung)
                ? C.mute
                : (operatorChrome ? C.bg : '#FFFFFF'),
              animation: ringSeconds !== null ? 'axQ05Pulse 1.2s ease-out infinite' : 'none',
            }}/>
            {t('chatRingAction')}
          </button>
          {suggestions.map(s => (
            <button key={s} type="button" onClick={() => ask(s, { fromChip: true })} style={{
              appearance: 'none',
              border: `1px solid ${operatorChrome ? C.lineHi : C.line}`,
              background: operatorChrome ? 'transparent' : C.surface,
              padding: operatorChrome ? '6px 12px' : '4px 10px', cursor: 'pointer',
              fontFamily: operatorChrome ? MONO : SERIF,
              fontStyle: operatorChrome ? 'normal' : 'italic',
              fontSize: operatorChrome ? 10 : 12,
              fontWeight: operatorChrome ? 500 : 400,
              color: operatorChrome ? C.dim : C.dim,
              letterSpacing: operatorChrome ? '0.18em' : 'normal',
              textTransform: operatorChrome ? 'uppercase' : 'none',
              transition: 'all .2s ease',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = operatorChrome ? C.ink : C.tangerine;
              e.currentTarget.style.color       = operatorChrome ? C.ink : C.tangerine;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = operatorChrome ? C.lineHi : C.line;
              e.currentTarget.style.color       = C.dim;
            }}>
              {s}
            </button>
          ))}
        </div>

        {/* Hairline divider above the type bar in operator chrome; the
            standalone chat surface keeps the catalog-dimension tangerine
            slide-bar that signals "send" affordance. */}
        <span aria-hidden style={{
          display: 'block', height: operatorChrome ? 1 : 2, width: '100%',
          background: operatorChrome ? C.line : C.tangerine,
          flexShrink: 0,
        }}/>
        <form onSubmit={(e) => { e.preventDefault(); ask(input); }} style={{
          padding: operatorChrome ? '12px 22px' : '8px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          background: C.bg,
          flexShrink: 0,
        }}>
          {operatorChrome ? (
            <Eyebrow color={C.mute}>{t('opCardDirectLine')}</Eyebrow>
          ) : (
            <span style={{fontFamily: SERIF, fontWeight: 500, fontSize: 16, color: C.tangerine}}>›</span>
          )}
          <input ref={inputRef} value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              streaming !== null ? t('askAndresReplying') :
              t('askAndresPlaceholder')
            }
            disabled={streaming !== null}
            style={{
              flex: 1, appearance: 'none', border: 'none', outline: 'none', background: 'transparent',
              fontFamily: operatorChrome ? MONO : DISPLAY,
              color: C.ink,
              fontSize: operatorChrome ? 13 : 13,
              letterSpacing: operatorChrome ? '-0.003em' : '-0.005em',
              padding: 2,
            }}/>
          <button type="submit"
            disabled={streaming !== null || !input.trim()}
            style={{
              appearance: 'none',
              border: `1px solid ${
                input.trim() && streaming === null
                  ? (operatorChrome ? C.ink : C.tangerine)
                  : C.line
              }`,
              background: operatorChrome && input.trim() && streaming === null ? C.ink : 'transparent',
              color: input.trim() && streaming === null
                ? (operatorChrome ? C.bg : C.tangerine)
                : C.faint,
              cursor: input.trim() && streaming === null ? 'pointer' : 'not-allowed',
              padding: operatorChrome ? '7px 14px' : '5px 9px',
              fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              fontWeight: 600, transition: 'all .2s ease',
            }}
            onMouseEnter={operatorChrome ? (e) => {
              if (!input.trim() || streaming !== null) return;
              e.currentTarget.style.background = C.tangerine;
              e.currentTarget.style.borderColor = C.tangerine;
            } : undefined}
            onMouseLeave={operatorChrome ? (e) => {
              if (!input.trim() || streaming !== null) return;
              e.currentTarget.style.background = C.ink;
              e.currentTarget.style.borderColor = C.ink;
            } : undefined}>{t('askAndresSend')}</button>
        </form>
      </div>
    );
  };

  const AndresLine = ({ m }) => {
    if (m.role === 'sys') return (
      <div style={{
        fontFamily: MONO, fontSize: 9, color: C.mute,
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>— {m.text} —</div>
    );
    if (m.role === 'sys-ring') return (
      <div style={{
        padding: '6px 10px',
        background: C.panel,
        borderLeft: `2px solid ${C.tangerine}`,
        fontFamily: MONO, fontSize: 10, color: C.dim,
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        {m.text}
      </div>
    );
    // Operational Snapshot — surfaces after the visitor has shared 3+
    // distinct pain signals.  Diagnostic block: what we're seeing,
    // likely impact, likely tier fit, soft CTA to book.
    if (m.role === 'sys-snapshot') {
      const snapData = (() => {
        const SIGNAL_MAP_EN = {
          tools:    'Tool sprawl — multiple systems, no clear owner',
          leads:    'Lead handling fragmented — leakage in the funnel',
          depends:  'Founder-dependent workflows — bus-factor of one',
          systems:  'Operational systems missing or under-built',
          breaking: 'Recurring breakage — same problems, no permanent owner',
          manual:   'Manual coordination overhead — hours spent on routine',
          chaos:    'No centralised operational ownership',
        };
        const SIGNAL_MAP_ES = {
          tools:    'Exceso de herramientas — múltiples sistemas, sin dueño claro',
          leads:    'Manejo de leads fragmentado — fuga en el funnel',
          depends:  'Workflows dependientes del fundador — bus-factor de uno',
          systems:  'Sistemas operativos faltantes o sub-construidos',
          breaking: 'Roturas recurrentes — mismos problemas, sin dueño permanente',
          manual:   'Coordinación manual — horas gastadas en lo rutinario',
          chaos:    'Sin propiedad operativa centralizada',
        };
        const IMPACT_EN = [
          'Slower response times',
          'Lost follow-up opportunities',
          'Operational inconsistency',
          'Team dependency on founder',
        ];
        const IMPACT_ES = [
          'Tiempos de respuesta más lentos',
          'Oportunidades de seguimiento perdidas',
          'Inconsistencia operativa',
          'Dependencia del equipo en el fundador',
        ];
        const TIER_LABEL = {
          operator:   { en: 'Operator · 2-point capacity',     es: 'Operador · 2 puntos de capacidad' },
          team:       { en: 'Team · 5-point capacity',         es: 'Equipo · 5 puntos de capacidad' },
          department: { en: 'Department · 10-point capacity',  es: 'Departamento · 10 puntos de capacidad' },
        };
        const isEs = lang === 'es';
        return {
          isEs,
          title:       isEs ? 'Esto es lo que estoy viendo' : 'Here\'s what I\'m seeing',
          sigsLabel:   isEs ? 'Snapshot operativo'           : 'Operational Snapshot',
          impactLabel: isEs ? 'Impacto probable'             : 'Likely Impact',
          fitLabel:    isEs ? 'Encaje probable'              : 'Likely Fit',
          ctaLabel:    isEs ? 'Hablemos 30 minutos'          : 'Walk me through it · 30 min',
          tierLine:    TIER_LABEL[m.tier][isEs ? 'es' : 'en'],
          sigsList:    m.signals.map(k => (isEs ? SIGNAL_MAP_ES : SIGNAL_MAP_EN)[k]).filter(Boolean),
          impactList:  isEs ? IMPACT_ES : IMPACT_EN,
        };
      })();
      return (
        <div style={{
          margin: '4px 0',
          background: C.surface,
          border: `1px solid ${C.lineHi}`,
          borderLeft: `2px solid ${C.tangerine}`,
          padding: '14px 16px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <span style={{
              fontFamily: SERIF, fontStyle: 'italic', fontSize: 16, color: C.ink,
              lineHeight: 1.2,
            }}>{snapData.title}</span>
            <span style={{
              fontFamily: MONO, fontSize: 8, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: C.tangerine,
            }}>{snapData.sigsLabel}</span>
          </div>
          <div>
            {snapData.sigsList.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 8,
                fontFamily: DISPLAY, fontSize: 12, color: C.ink, lineHeight: 1.5,
              }}>
                <span style={{color: C.tangerine, fontFamily: MONO, fontWeight: 600, fontSize: 10}}>·</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div style={{height: 1, background: C.line}}/>
          <div>
            <span style={{
              fontFamily: MONO, fontSize: 8, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: C.mute,
              display: 'block', marginBottom: 6,
            }}>{snapData.impactLabel}</span>
            {snapData.impactList.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 8,
                fontFamily: DISPLAY, fontSize: 12, color: C.dim, lineHeight: 1.5,
              }}>
                <span style={{color: C.mute, fontFamily: MONO, fontSize: 10}}>·</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div style={{height: 1, background: C.line}}/>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap'}}>
            <div>
              <span style={{
                fontFamily: MONO, fontSize: 8, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase', color: C.mute,
                display: 'block', marginBottom: 4,
              }}>{snapData.fitLabel}</span>
              <span style={{
                fontFamily: DISPLAY, fontWeight: 500, fontSize: 14, color: C.ink,
              }}>{snapData.tierLine}</span>
            </div>
            <button type="button"
              onClick={() => openBooking(t('bookingSubject'))}
              style={{
                appearance: 'none', cursor: 'pointer',
                background: C.ink, color: C.bg, border: `1px solid ${C.ink}`,
                padding: '9px 14px',
                fontFamily: MONO, fontSize: 10, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                transition: 'all .25s ease',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.tangerine; e.currentTarget.style.borderColor = C.tangerine; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.ink; e.currentTarget.style.borderColor = C.ink; }}>
              {snapData.ctaLabel}
              <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 14}}>→</span>
            </button>
          </div>
        </div>
      );
    }
    if (m.role === 'user') return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{
          display: 'inline-block', maxWidth: '85%',
          padding: '7px 11px',
          background: C.panel, border: `1px solid ${C.line}`,
          color: C.ink, fontFamily: DISPLAY, fontSize: 12.5, lineHeight: 1.5,
        }}>{m.text}</div>
      </div>
    );
    // 'andres' role — tangerine A. glyph.  Live replies from Telegram
    // get a small LIVE badge; canned chip answers (m.live === false)
    // render without it so they read as a natural human typing.
    if (m.role === 'andres') return (
      <div style={{display: 'flex', gap: 10, alignItems: 'flex-start'}}>
        <span style={{
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 14,
          color: C.tangerine, flexShrink: 0, lineHeight: 1, paddingTop: 2,
        }}>A.</span>
        <div style={{flex: 1}}>
          {m.live !== false && (
            <span style={{
              display: 'inline-block', marginRight: 8,
              padding: '2px 6px',
              background: C.tangerine, color: '#FFFFFF',
              fontFamily: MONO, fontSize: 8, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              verticalAlign: 'middle',
            }}>{t('chatAndresLive') || 'Live'}</span>
          )}
          <span style={{
            fontFamily: DISPLAY, fontSize: 13, color: C.ink, lineHeight: 1.55,
            whiteSpace: 'pre-wrap',
          }}>{m.text}</span>
        </div>
      </div>
    );
    const isAi = m.role === 'bot-ai';
    return (
      <div style={{display: 'flex', gap: 10, alignItems: 'flex-start'}}>
        <span style={{
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 14,
          color: isAi ? C.lavender : C.tangerine,
          flexShrink: 0, lineHeight: 1, paddingTop: 2,
        }}>{isAi ? 'AI.' : 'A.'}</span>
        <div style={{
          fontFamily: DISPLAY, fontSize: 13, color: C.ink, lineHeight: 1.55,
          whiteSpace: 'pre-wrap', flex: 1,
        }}>{m.text}</div>
      </div>
    );
  };

  // ─── Editorial collage atoms — workflow / code / rack / Venn
  // Tactile SVG artifacts that sit BEHIND the Direct Line card,
  // peeking out from its edges. Positioned with small offsets so
  // they never reach the eyebrow row above the title or exceed
  // the page padding on the right.
  const WorkflowDiagram = ({ style = {}, ...rest }) => (
    <div {...rest} style={{
      position: 'absolute',
      width: 196, height: 256,
      background: C.surface,
      border: `1px solid ${C.lineHi}`,
      padding: 13,
      boxShadow: '0 1px 0 rgba(10,9,7,0.04)',
      ...style,
    }}>
      <svg viewBox="0 0 196 256" width="100%" height="100%" style={{display: 'block'}}>
        <defs>
          <pattern id="axQ05gridA" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M12 0H0V12" stroke="rgba(10,9,7,0.12)" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="196" height="256" fill="url(#axQ05gridA)"/>
        <g stroke={C.ink} strokeWidth="1.2" fill="none" strokeLinecap="round">
          <rect x="14" y="16" width="54" height="26"/>
          <rect x="86" y="16" width="54" height="26"/>
          <rect x="14" y="76" width="54" height="26"/>
          <rect x="86" y="76" width="54" height="26"/>
          <rect x="14" y="136" width="126" height="26"/>
          <rect x="44" y="194" width="68" height="38" stroke={C.tangerine} strokeWidth="1.4"/>
          <path d="M68 29 L86 29"/>
          <path d="M40 42 L40 76"/>
          <path d="M112 42 L112 76"/>
          <path d="M40 102 L40 136"/>
          <path d="M112 102 L112 136"/>
          <path d="M78 162 L78 194" stroke={C.tangerine} strokeWidth="1.4"/>
        </g>
        <rect x="102" y="54" width="11" height="11" fill={C.tangerine}/>
      </svg>
    </div>
  );

  const CodePanel = ({ style = {}, ...rest }) => (
    <div {...rest} style={{
      position: 'absolute',
      width: 244, padding: '16px 18px 18px',
      background: C.ink, color: C.bg,
      fontFamily: MONO, fontSize: 11.5, lineHeight: 1.7,
      ...style,
    }}>
      <div style={{color: 'rgba(247,246,242,0.45)'}}>// systems work</div>
      <div style={{color: 'rgba(247,246,242,0.45)'}}>// people grow</div>
      <div style={{color: 'rgba(247,246,242,0.45)'}}>// businesses scale</div>
      <div style={{height: 6}}/>
      <div><span style={{color: C.tangerine}}>function</span> operational(system) {`{`}</div>
      <div style={{paddingLeft: 12}}>align(people);</div>
      <div style={{paddingLeft: 12}}>automate(work);</div>
      <div style={{paddingLeft: 12}}>optimize(flow);</div>
      <div style={{paddingLeft: 12}}><span style={{color: C.tangerine}}>return</span> <span style={{color: C.tangerine}}>freedom</span>;</div>
      <div>{`}`}</div>
    </div>
  );

  const ServerRack = ({ style = {}, ...rest }) => (
    <div {...rest} style={{
      position: 'absolute',
      width: 90, height: 340,
      background: C.ink, padding: 6,
      overflow: 'hidden',
      ...style,
    }}>
      <svg viewBox="0 0 78 328" width="100%" height="100%" style={{display: 'block'}}>
        <rect x="1" y="1" width="76" height="326" fill="none" stroke="rgba(247,246,242,0.22)" strokeWidth="0.5"/>
        {Array.from({length: 18}).map((_, i) => {
          const y = 6 + i * 17.6;
          return (
            <g key={i}>
              <rect x="5" y={y} width="68" height="15.5" fill={i % 4 === 2 ? '#1B1916' : '#161412'} stroke="rgba(247,246,242,0.12)" strokeWidth="0.3"/>
              <circle cx="11" cy={y + 7.8} r="1.3" fill={i === 5 ? C.mint : 'rgba(247,246,242,0.16)'}/>
              <circle cx="16" cy={y + 7.8} r="1.3" fill={i === 9 ? C.tangerine : 'rgba(247,246,242,0.10)'}/>
              <rect x="24" y={y + 5} width="44" height="6" fill="rgba(247,246,242,0.08)"/>
            </g>
          );
        })}
      </svg>
    </div>
  );

  const VennDiagram = ({ style = {}, ...rest }) => (
    <div {...rest} style={{
      position: 'absolute',
      width: 216, height: 196,
      background: C.surface,
      border: `1px solid ${C.lineHi}`,
      padding: 14,
      ...style,
    }}>
      <svg viewBox="0 0 216 196" width="100%" height="100%" style={{display: 'block'}}>
        <defs>
          <pattern id="axQ05vgrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0V10" stroke="rgba(10,9,7,0.10)" strokeWidth="0.4" fill="none"/>
          </pattern>
        </defs>
        <rect width="216" height="196" fill="url(#axQ05vgrid)"/>
        <path d="M108 88 A 46 46 0 0 1 108 130 A 46 46 0 0 1 108 88 Z" fill={C.tangerine} opacity="0.88"/>
        <circle cx="88"  cy="88"  r="46" fill="none" stroke={C.ink} strokeWidth="1.2"/>
        <circle cx="128" cy="88"  r="46" fill="none" stroke={C.ink} strokeWidth="1.2"/>
        <circle cx="108" cy="130" r="46" fill="none" stroke={C.ink} strokeWidth="1.2"/>
        <text x="84"  y="40"  fontFamily="Geist Mono" fontSize="10" fontWeight="600" letterSpacing="1.2" fill={C.ink}>{t('vennPeople')}</text>
        <text x="14"  y="178" fontFamily="Geist Mono" fontSize="10" fontWeight="600" letterSpacing="1.2" fill={C.ink}>{t('vennProcess')}</text>
        <text x="148" y="178" fontFamily="Geist Mono" fontSize="10" fontWeight="600" letterSpacing="1.2" fill={C.ink}>{t('vennTechnology')}</text>
      </svg>
    </div>
  );

  // ─── WorkflowSheet — Hero B background sheet ───────────────
  // A graph-paper sketch of the operating pipeline (INTAKE →
  // REVIEW → SCOPE → BUILD → DEPLOY) with italic-serif annotations
  // (clarify / prioritize / architect / operate) coming off the
  // REVIEW and BUILD boxes.  Sits absolutely positioned BEHIND the
  // OperatorCard so its right edge peeks out from the left of the
  // foreground card, slightly rotated.
  const WorkflowSheet = ({ style = {}, ...rest }) => (
    <div {...rest} style={{
      position: 'absolute',
      width: 300, height: 400,
      background: C.surface,
      border: `1px solid ${C.line}`,
      padding: '18px 20px',
      boxShadow: '0 8px 24px rgba(10,9,7,0.06)',
      ...style,
    }}>
      <svg viewBox="0 0 260 360" width="100%" height="100%" style={{display: 'block'}}>
        <defs>
          <pattern id="axQ05wkSheet" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" stroke="rgba(10,9,7,0.07)" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="260" height="360" fill="url(#axQ05wkSheet)"/>

        {/* INTAKE */}
        <rect x="40" y="22" width="92" height="34" fill={C.surface} stroke={C.ink} strokeWidth="1"/>
        <text x="86" y="43" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1" fill={C.ink}>INTAKE</text>
        <line x1="86" y1="56" x2="86" y2="78" stroke={C.ink} strokeWidth="0.8"/>

        {/* REVIEW (with three annotations to the right) */}
        <rect x="40" y="78" width="92" height="34" fill={C.surface} stroke={C.ink} strokeWidth="1"/>
        <text x="86" y="99" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1" fill={C.ink}>REVIEW</text>

        {/* connector + three side-branches with italic serif labels */}
        <path d="M132 80 L150 70 L160 70" stroke={C.ink} strokeWidth="0.7" fill="none"/>
        <path d="M132 95 L150 95 L160 95" stroke={C.ink} strokeWidth="0.7" fill="none"/>
        <path d="M132 110 L150 120 L160 120" stroke={C.ink} strokeWidth="0.7" fill="none"/>
        <circle cx="148" cy="95" r="3.5" fill={C.tangerine}/>
        <text x="166" y="73" fontFamily="Instrument Serif" fontStyle="italic" fontSize="13" fill={C.dim}>clarify</text>
        <text x="166" y="98" fontFamily="Instrument Serif" fontStyle="italic" fontSize="13" fill={C.dim}>prioritize</text>
        <text x="166" y="123" fontFamily="Instrument Serif" fontStyle="italic" fontSize="13" fill={C.dim}>architect</text>

        <line x1="86" y1="112" x2="86" y2="138" stroke={C.ink} strokeWidth="0.8"/>

        {/* SCOPE */}
        <rect x="40" y="138" width="92" height="34" fill={C.surface} stroke={C.ink} strokeWidth="1"/>
        <text x="86" y="159" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1" fill={C.ink}>SCOPE</text>
        <line x1="86" y1="172" x2="86" y2="208" stroke={C.ink} strokeWidth="0.8"/>

        {/* BUILD — tangerine outline + tangerine fill text */}
        <rect x="40" y="208" width="92" height="34" fill={C.surface} stroke={C.tangerine} strokeWidth="1.6"/>
        <text x="86" y="229" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1" fill={C.tangerine}>BUILD</text>
        <path d="M132 225 L150 225 L160 225" stroke={C.tangerine} strokeWidth="0.8" fill="none"/>
        <text x="166" y="229" fontFamily="Instrument Serif" fontStyle="italic" fontSize="13" fill={C.tangerine}>operate</text>

        <line x1="86" y1="242" x2="86" y2="278" stroke={C.ink} strokeWidth="0.8"/>

        {/* DEPLOY */}
        <rect x="40" y="278" width="92" height="34" fill={C.surface} stroke={C.ink} strokeWidth="1"/>
        <text x="86" y="299" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1" fill={C.ink}>DEPLOY</text>
      </svg>
    </div>
  );

  // ─── OperatorCard — Hero B foreground card ─────────────────
  // Cleaner "directory listing" treatment per the alt reference:
  // OPERATOR / ONLINE header, portrait + name + role, direct line,
  // hours (MDE), and two CTAs.  Card → chat toggle reuses AskAndres
  // for the conversation surface so Ring Andrés / AI twin etc. all
  // still work from this layout.
  const OperatorCard = () => {
    const [mode, setMode] = React.useState('card');
    const photo = (window.AxiusFounder && window.AxiusFounder.photo) || 'andres-toro.jpg';
    // External "open the hero chat" trigger — any component on the
    // page (e.g. the Founder "Talk to me" button) can dispatch this
    // event and the OperatorCard flips into chat mode.
    React.useEffect(() => {
      const handler = () => setMode('chat');
      window.addEventListener('axius:openHeroChat', handler);
      return () => window.removeEventListener('axius:openHeroChat', handler);
    }, []);
    const onMessage = () => {
      const cfg = window.AxiusConfig || {};
      const behavior = cfg.ringBehavior || 'inChat';
      const wa = cfg.whatsappNumber || '';
      if (behavior === 'whatsapp' && wa) {
        const intro = `Hi Andrés — I'm on axius.tech and would like to message you directly.`;
        window.open(`https://wa.me/${wa}?text=${encodeURIComponent(intro)}`, '_blank', 'noopener');
        return;
      }
      setMode('chat');
    };
    return (
      <div style={{
        position: 'relative',
        background: C.surface,
        border: `1px solid ${C.lineHi}`,
        width: '100%',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        minHeight: 440,
      }}>
        {mode === 'chat' ? (
          <AskAndres onBack={() => setMode('card')} autofocus operatorChrome/>
        ) : (
          <>
            {/* Header: OPERATOR (tangerine) · ONLINE (mint pulse) */}
            <div style={{
              padding: '14px 22px',
              borderBottom: `1px solid ${C.line}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <Eyebrow color={C.tangerine}>{t('opCardOperator')}</Eyebrow>
              <div style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
                <span aria-hidden style={{
                  display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                  background: C.mint,
                  animation: 'axQ05Pulse 2.4s ease-out infinite',
                }}/>
                <Eyebrow color={C.dim}>{t('opCardOnline')}</Eyebrow>
              </div>
            </div>

            {/* Identity row */}
            <div style={{
              padding: '22px 22px',
              display: 'grid', gridTemplateColumns: '108px 1fr', gap: 22,
              alignItems: 'center',
            }}>
              <div
                onMouseEnter={(e) => { const img = e.currentTarget.firstChild; if (img) img.style.filter = 'grayscale(0) saturate(1.05) contrast(1.02)'; }}
                onMouseLeave={(e) => { const img = e.currentTarget.firstChild; if (img) img.style.filter = 'grayscale(1) contrast(1.04)'; }}
                style={{
                  width: 108, height: 108,
                  border: `1px solid ${C.line}`,
                  background: C.panel,
                  overflow: 'hidden',
                  cursor: 'default',
                }}>
                <img src={photo} alt="Andrés Toro" style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  objectPosition: '50% 30%',
                  filter: 'grayscale(1) contrast(1.04)',
                  display: 'block',
                  transition: 'filter 1.4s cubic-bezier(.2,.8,.2,1)',
                }}/>
              </div>
              <div>
                <div style={{
                  fontFamily: DISPLAY, fontWeight: 600, fontSize: 32,
                  letterSpacing: '-0.025em', color: C.ink, lineHeight: 1.05,
                }}>Andrés Toro</div>
                <div style={{
                  marginTop: 10,
                  fontFamily: MONO, fontSize: 11, fontWeight: 500,
                  color: C.mute, letterSpacing: '0.18em', textTransform: 'uppercase',
                }}>{t('opCardRole')}</div>
              </div>
            </div>

            <div style={{height: 1, background: C.line}}/>

            {/* Direct line */}
            <div style={{padding: '20px 22px 8px'}}>
              <Eyebrow color={C.mute}>{t('opCardDirectLine')}</Eyebrow>
              <a href="mailto:andres@axius.tech" style={{
                display: 'inline-block', marginTop: 8,
                fontFamily: MONO, fontSize: 18, color: C.ink,
                letterSpacing: '-0.005em', textDecoration: 'none',
                transition: 'color .25s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.tangerine}
              onMouseLeave={(e) => e.currentTarget.style.color = C.ink}>
                andres@axius.tech
              </a>
            </div>

            {/* Hours */}
            <div style={{padding: '12px 22px 20px'}}>
              <Eyebrow color={C.mute}>{t('opCardHours')}</Eyebrow>
              <div style={{
                marginTop: 8,
                fontFamily: MONO, fontSize: 20, color: C.ink,
                letterSpacing: '-0.005em', fontVariantNumeric: 'tabular-nums',
              }}>{t('opCardHoursValue')}</div>
            </div>

            <div style={{height: 1, background: C.line}}/>

            {/* CTAs — message directly (chat) + leave a note (mailto) */}
            <div style={{padding: '18px 22px', display: 'flex', gap: 10, flexWrap: 'wrap'}}>
              <button type="button" onClick={onMessage} style={{
                appearance: 'none', cursor: 'pointer',
                background: C.ink, color: C.bg, border: `1px solid ${C.ink}`,
                padding: '12px 18px',
                fontFamily: MONO, fontSize: 11, fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                transition: 'all .25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.tangerine; e.currentTarget.style.borderColor = C.tangerine; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.ink; e.currentTarget.style.borderColor = C.ink; }}>
                {t('opCardMessage')}
                <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 14}}>→</span>
              </button>
              <a href={`mailto:${EMAIL}`} style={{
                appearance: 'none', cursor: 'pointer',
                background: 'transparent', color: C.ink, border: `1px solid ${C.lineHi}`,
                padding: '12px 18px',
                fontFamily: MONO, fontSize: 11, fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all .25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.tangerine; e.currentTarget.style.borderColor = C.tangerine; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = C.lineHi; }}>
                {t('opCardLeaveNote')}
              </a>
            </div>
          </>
        )}
      </div>
    );
  };

  // ─── DirectLine — founder card that opens the chat ─────────
  // Single-mode rendering keeps the layout simple and the back
  // button reliably visible: when mode === 'card' we render the
  // card, when mode === 'chat' we render the chat. The container
  // has a fixed height so swapping modes never resizes anything.
  const DirectLine = () => {
    const [mode, setMode] = React.useState('card');
    const photo = (window.AxiusFounder && window.AxiusFounder.photo) || 'andres-toro.jpg';

    const openChat = () => setMode('chat');
    const backToCard = () => setMode('card');

    // External "open the hero chat" trigger — any component on the
    // page can dispatch this custom event (e.g. the Founder section's
    // Talk-to-me button) and the hero DirectLine flips into chat mode.
    React.useEffect(() => {
      const handler = () => setMode('chat');
      window.addEventListener('axius:openHeroChat', handler);
      return () => window.removeEventListener('axius:openHeroChat', handler);
    }, []);

    return (
      <div style={{
        position: 'relative',
        background: C.surface,
        border: `1px solid ${C.lineHi}`,
        width: '100%',
        height: 380,            // fixed: chat and card both occupy this
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {mode === 'chat' ? (
          <AskAndres onBack={backToCard} autofocus/>
        ) : (
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
        }}>
          {/* header strip matches Ask Andrés so the transition is seamless */}
          <div style={{
            padding: '10px 14px',
            borderBottom: `1px solid ${C.line}`,
            background: C.panel,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{display: 'inline-flex', alignItems: 'baseline', gap: 12}}>
              <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 16, color: C.tangerine}}>
                {t('directLineTitle')}
              </span>
              <Eyebrow color={C.mute}>Andrés Toro</Eyebrow>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: MONO, fontSize: 9, color: C.dim,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
              <span style={{
                display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                background: C.mint,
                animation: 'axQ05Pulse 2.4s ease-out infinite',
              }}/>
              {t('directLineAvailable')}
            </span>
          </div>

          <div style={{
            padding: '18px 18px 16px',
            display: 'grid', gridTemplateColumns: '92px 1fr', gap: 16,
            alignItems: 'center',
          }}>
            {/* portrait */}
            <div style={{
              position: 'relative', width: 92, height: 92,
              borderRadius: '50%', overflow: 'hidden',
              border: `1px solid ${C.lineHi}`,
              background: C.panel,
            }}>
              <img src={photo} alt="Andrés Toro" style={{
                width: '100%', height: '100%', objectFit: 'cover',
                objectPosition: '50% 30%',
                filter: 'saturate(0.92) contrast(1.02)',
                display: 'block',
              }}/>
              {/* live ring */}
              <span aria-hidden style={{
                position: 'absolute', inset: -3,
                borderRadius: '50%',
                border: `1px solid ${C.mint}`,
                opacity: 0.55,
                animation: 'axQ05Pulse 2.4s ease-out infinite',
                pointerEvents: 'none',
              }}/>
              {/* presence dot */}
              <span aria-hidden style={{
                position: 'absolute', right: 4, bottom: 4,
                width: 14, height: 14, borderRadius: '50%',
                background: C.mint,
                boxShadow: `0 0 0 2px ${C.surface}`,
              }}/>
            </div>

            <div>
              <div style={{
                fontFamily: DISPLAY, fontWeight: 600, fontSize: 22,
                letterSpacing: '-0.025em', color: C.ink, lineHeight: 1.1,
              }}>Andrés Toro</div>
              <div style={{
                marginTop: 4,
                fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: C.dim,
                lineHeight: 1.4,
              }}>{t('directLineRole')}</div>
              <div style={{
                marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: MONO, fontSize: 10, color: C.mute,
                letterSpacing: '0.18em', textTransform: 'uppercase',
              }}>
                <LiveClock/>
                <span style={{color: C.faint}}>·</span>
                <span>EN / ES</span>
              </div>
            </div>
          </div>

          <div style={{
            padding: '0 18px 14px',
            fontFamily: DISPLAY, fontSize: 14, color: C.dim, lineHeight: 1.55,
            flex: 1, display: 'flex', alignItems: 'flex-start',
          }}>
            <span>
              {t('directLineBody1')}
              <span style={{color: C.ink}}>{t('directLineBody2')}</span>
            </span>
          </div>

          <div style={{
            padding: '0 18px 18px',
            display: 'flex', gap: 10, flexWrap: 'wrap',
          }}>
            <button type="button" onClick={openChat} style={{
              appearance: 'none', cursor: 'pointer',
              background: C.ink, color: C.bg, border: `1px solid ${C.ink}`,
              padding: '10px 16px',
              fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em',
              textTransform: 'uppercase', fontWeight: 600,
              transition: 'all .25s ease',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.tangerine; e.currentTarget.style.borderColor = C.tangerine; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.ink; e.currentTarget.style.borderColor = C.ink; }}>
              {t('directLineCta')}
              <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'inherit'}}>→</span>
            </button>
            <a href="mailto:andres@axius.tech" style={{
              appearance: 'none', cursor: 'pointer',
              background: 'transparent', color: C.dim, border: `1px solid ${C.lineHi}`,
              padding: '10px 14px',
              fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em',
              textTransform: 'uppercase', fontWeight: 600,
              textDecoration: 'none',
              transition: 'all .25s ease',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.tangerine; e.currentTarget.style.borderColor = C.tangerine; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.dim; e.currentTarget.style.borderColor = C.lineHi; }}>
              andres@axius.tech
            </a>
          </div>
        </div>
        )}
      </div>
    );
  };

  // ─── HERO ──────────────────────────────────────────────────
  const Hero = () => {
    const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });
    const [titleHover, setTitleHover] = React.useState(false);
    const [eyebrowHover, setEyebrowHover] = React.useState(false);
    const [practiceHover, setPracticeHover] = React.useState(false);
    const [howWeWorkHover, setHowWeWorkHover] = React.useState(false);
    // Per-element hover state for the editorial collage — each
    // artifact peeks a small amount by default and slides out to its
    // full extension only when hovered individually.
    const [collage, setCollage] = React.useState({ wf: false, cp: false, sr: false, vn: false });
    const setCollageHover = (key) => ({
      onMouseEnter: () => setCollage(s => ({ ...s, [key]: true })),
      onMouseLeave: () => setCollage(s => ({ ...s, [key]: false })),
    });
    const heroRef = React.useRef(null);

    React.useEffect(() => {
      const onMove = (e) => {
        const r = heroRef.current && heroRef.current.getBoundingClientRect();
        if (!r) return;
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top)  / r.height;
        setMouse({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // Orb leans gently toward the cursor — tranquil, not chasing
    const orbX = (mouse.x - 0.5) * 70;
    const orbY = (mouse.y - 0.5) * 50;

    return (
      <header id="hero" ref={heroRef} data-screen-label="00 Hero" style={{
        position: 'relative', overflow: 'hidden',
        padding: `104px ${pad}px 108px`,
      }}>
        {/* breathing warm-light orb — subtle ambient that leans with the cursor */}
        <div aria-hidden style={{
          position: 'absolute', top: '40%', right: '8%',
          width: 460, height: 460, borderRadius: '50%',
          background: `radial-gradient(closest-side, rgba(255,91,42,0.20), rgba(255,91,42,0) 70%)`,
          animation: 'axQ05Glow 9s ease-in-out infinite',
          transform: `translate(${orbX}px, ${orbY}px)`,
          transition: 'transform 1.2s cubic-bezier(.2,.8,.2,1)',
          pointerEvents: 'none', zIndex: 0,
          willChange: 'transform',
        }}/>

        {/* paper-grain texture — tactile warmth */}
        <svg aria-hidden width="0" height="0" style={{position: 'absolute'}}>
          <filter id="axQ05Grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.92" numOctaves="2" stitchTiles="stitch"/>
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"/>
          </filter>
        </svg>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          filter: 'url(#axQ05Grain)',
          opacity: 0.7, pointerEvents: 'none', zIndex: 0,
          mixBlendMode: 'multiply',
        }}/>

        <div style={{position: 'relative', zIndex: 1}}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 56,
        }}>
          <div
            onMouseEnter={() => setPracticeHover(true)}
            onMouseLeave={() => setPracticeHover(false)}
            style={{cursor: 'default'}}>
            <Eyebrow color={practiceHover ? C.tangerine : undefined} style={{
              transition: 'color .35s cubic-bezier(.2,.8,.2,1)',
            }}>
              {t('eyebrowPractice')}
            </Eyebrow>
          </div>
          {/* Pill — two halves, both gray by default.
              On title hover OR pill hover:
                · "ONLY ACCEPTING"        → ink (black)
                · "3 NEW CLIENTS / MONTH" → tangerine + scaleX(1) underline
              Both halves share the same color transition; the underline
              animates in from the right with the same easing as before. */}
          <div
            onMouseEnter={() => setEyebrowHover(true)}
            onMouseLeave={() => setEyebrowHover(false)}
            style={{cursor: 'default', position: 'relative', display: 'inline-block'}}>
            <div style={{
              fontFamily: MONO, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
              <span style={{
                color: (titleHover || eyebrowHover) ? C.ink : C.dim,
                transition: 'color .35s cubic-bezier(.2,.8,.2,1)',
              }}>{t('eyebrowAcceptingPre')}</span>
              <span style={{color: C.mute, margin: '0 0.5em'}}>·</span>
              <span style={{
                position: 'relative', display: 'inline-block',
                color: (titleHover || eyebrowHover) ? C.tangerine : C.dim,
                transition: 'color .35s cubic-bezier(.2,.8,.2,1)',
              }}>
                {t('eyebrowAcceptingAccent')}
                <span aria-hidden style={{
                  position: 'absolute', left: 0, right: 0, bottom: -4, height: 1,
                  background: C.tangerine,
                  transformOrigin: 'right',
                  transform: `scaleX(${(titleHover || eyebrowHover) ? 1 : 0})`,
                  transition: 'transform .4s cubic-bezier(.2,.8,.2,1)',
                }}/>
              </span>
            </div>
          </div>
        </div>

        {/* Hero grid: H1 in row 1 (left), DirectLine spans both rows on the
            right so collage artifacts have room below the card to remain
            visible (Quiet 0.90 framing). Subhead+CTAs sit below H1 in row 2.
            rowGap is matched to the hairline marginBottom below so the
            orange hairline sits visually centered between title and copy. */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.25fr 1fr',
          columnGap: 120, rowGap: 28, alignItems: 'stretch',
        }}>
          {/* H1 ─── row 1, col 1 */}
          <h1
            onMouseEnter={() => setTitleHover(true)}
            onMouseLeave={() => setTitleHover(false)}
            style={{
              gridColumn: 1, gridRow: 1,
              margin: 0, fontFamily: DISPLAY, fontWeight: 600,
              fontSize: 104, lineHeight: 1.0, letterSpacing: '-0.045em',
              color: C.ink,
              fontFeatureSettings: '"ss03", "calt", "kern"',
              cursor: 'default',
            }}>
            <span style={{
              display: 'inline-block',
              transformOrigin: '0% 50%',
              transform: titleHover ? 'scale(1.035)' : 'scale(1)',
              transition: 'transform .55s cubic-bezier(.2,.8,.2,1)',
            }}>{t('heroLine1')}<br/>{t('heroLine2')}</span><br/>
            {/* "Not your tech." — gray by default; orange background + white
                text sweep in only while the H1 is hovered. */}
            <span style={{
              position: 'relative', display: 'inline-block',
              color: titleHover ? '#FFFFFF' : '#9C9690',
              padding: '0.04em 0.14em 0.08em',
              whiteSpace: 'nowrap',
              transition: 'color .45s cubic-bezier(.2,.8,.2,1)',
            }}>
              <span aria-hidden style={{
                position: 'absolute', inset: 0,
                background: C.tangerine,
                opacity: titleHover ? 1 : 0,
                transform: titleHover ? 'scaleX(1)' : 'scaleX(0.94)',
                transformOrigin: '0% 50%',
                transition: 'opacity .5s cubic-bezier(.2,.8,.2,1), transform .55s cubic-bezier(.2,.8,.2,1)',
                zIndex: 0,
              }}/>
              <span style={{position: 'relative', zIndex: 1}}>{t('heroLine3')}</span>
            </span>
          </h1>

          {/* DirectLine ─── spans both rows on the right so the editorial
              collage (WorkflowDiagram, CodePanel, ServerRack, Venn) has room
              below the card to peek out. Pushed further outside the column
              than before (Quiet 0.90 framing) so they read clearly.
              `minWidth: 0` on this and the inner DirectLine wrapper prevents
              long no-wrap content inside the chat (e.g. the suggestion-chip
              strip) from forcing the grid column wider. */}
          <div style={{
            gridColumn: 2, gridRow: '1 / span 2',
            position: 'relative', minHeight: 540, minWidth: 0,
            display: 'flex', flexDirection: 'column',
          }}>
            {heroStyle === 'A' ? (
              <>
                {/* Each artifact peeks ~36 px by default (subtle hint) and
                    slides out to its full extension on its own hover. */}
                <WorkflowDiagram {...setCollageHover('wf')}
                  style={{
                    top: -30, left: collage.wf ? -120 : -36,
                    transform: 'rotate(-4.5deg)', zIndex: 1,
                    transition: 'left .55s cubic-bezier(.2,.8,.2,1)',
                  }}/>
                <CodePanel       {...setCollageHover('cp')}
                  style={{
                    top: 318, left: collage.cp ? -148 : -36,
                    transform: 'rotate(-2deg)', zIndex: 1,
                    transition: 'left .55s cubic-bezier(.2,.8,.2,1)',
                  }}/>
                <ServerRack      {...setCollageHover('sr')}
                  style={{
                    top: 8, right: collage.sr ? -148 : -36,
                    transform: 'rotate(1.5deg)', zIndex: 1,
                    transition: 'right .55s cubic-bezier(.2,.8,.2,1)',
                  }}/>
                {/* People/Process/Technology — vertical pop. */}
                <VennDiagram     {...setCollageHover('vn')}
                  style={{
                    top: collage.vn ? 356 : 216, right: -130,
                    transform: 'rotate(2.5deg)', zIndex: 1,
                    transition: 'top .55s cubic-bezier(.2,.8,.2,1)',
                  }}/>
                <div style={{position: 'relative', zIndex: 10, minWidth: 0, display: 'flex', flexDirection: 'column'}}>
                  <DirectLine/>
                </div>
              </>
            ) : (
              <>
                {/* Hero B — operator card with workflow sheet peeking
                    out behind it from the left, slightly rotated. */}
                <WorkflowSheet style={{
                  top: 40, left: -180,
                  transform: 'rotate(-3.5deg)',
                  zIndex: 1,
                }}/>
                <div style={{
                  position: 'relative', zIndex: 10, minWidth: 0,
                  display: 'flex', flexDirection: 'column',
                  marginTop: 20,
                }}>
                  <OperatorCard/>
                </div>
              </>
            )}
          </div>

          {/* Subhead + HOW WE WORK list + CTAs ─── row 2, col 1 (under H1) */}
          <div style={{gridColumn: 1, gridRow: 2}}>
            <p style={{
              margin: 0, maxWidth: 540,
              fontFamily: DISPLAY, fontWeight: 400,
              fontSize: 19, color: C.dim, lineHeight: 1.55,
              letterSpacing: '-0.003em',
            }}>
              {t('heroSubL1')}<br/>
              {t('heroSubL3a')}<span style={{color: C.ink}}>{t('heroSubL3b')}</span>
            </p>

            {/* HOW WE WORK — eyebrow is always visible; the 3 bullets reveal on hover */}
            <div
              onMouseEnter={() => setHowWeWorkHover(true)}
              onMouseLeave={() => setHowWeWorkHover(false)}
              style={{
                marginTop: 32,
                cursor: 'default',
              }}>
              <Eyebrow color={howWeWorkHover ? C.tangerine : C.mute} style={{
                transition: 'color .3s ease',
                display: 'inline-block',
              }}>{t('howWeWorkLabel')}</Eyebrow>
              <div style={{
                overflow: 'hidden',
                maxHeight: howWeWorkHover ? 140 : 0,
                opacity: howWeWorkHover ? 1 : 0,
                marginTop: howWeWorkHover ? 14 : 0,
                transition: 'max-height .45s cubic-bezier(.2,.8,.2,1), opacity .35s ease, margin-top .35s ease',
              }}>
                {t('howWeWorkBullets').map((label, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'baseline', gap: 16,
                    fontFamily: MONO, fontSize: 12, fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: C.ink, padding: '3px 0',
                  }}>
                    <span style={{color: C.tangerine, fontWeight: 600}}>+</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display: 'flex', gap: 12, marginTop: 32}}>
              <QuietBtn primary size="lg" onClick={() => openBooking(t('bookingSubject'))}>{t('heroCta1')}</QuietBtn>
              <QuietBtn size="lg" multiColor onClick={() => scrollToId('catalog')}>{t('heroCta2')}</QuietBtn>
            </div>
          </div>
        </div>

        {/* subtle stat row — eyebrow (uppercase) · value · subtitle (mixed case) */}
        <div style={{
          marginTop: 72,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
        }}>
          {[
            { v: <CountUp to={129}/>,  k: t('statActiveSystems'),  sub: t('statLast90'),     accent: C.tangerine },
            { v: '< 24h',              k: t('statResponseWindow'), sub: t('statTier3'),      accent: C.mint      },
            { v: t('statStartsValue'), k: t('statStartsAt'),       sub: t('statSetupApplies'),accent: C.amber     },
            { v: t('statLimited'),     k: t('statIntakeStatus'),   sub: t('statQ2_2026'),    accent: C.lavender  },
          ].map((s, i, arr) => (
            <HoverCell key={i} accent={s.accent}
              style={{
                padding: '32px 28px',
                borderRight: i < arr.length - 1 ? `1px solid ${C.line}` : 'none',
              }}>
              <Eyebrow color={C.mute}>{s.k}</Eyebrow>
              <div style={{
                marginTop: 14,
                fontFamily: DISPLAY, fontWeight: 600, fontSize: 56,
                letterSpacing: '-0.045em', lineHeight: 1, color: C.ink,
              }}>{s.v}</div>
              <div style={{
                marginTop: 12,
                fontFamily: MONO, fontWeight: 500, fontSize: 10,
                color: C.mute, letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}>{s.sub}</div>
            </HoverCell>
          ))}
        </div>
      </div>
    </header>
    );
  };

  // Hover cell — background hairline accent reveals
  const HoverCell = ({ accent, children, style = {} }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative',
          background: h ? `linear-gradient(180deg, ${accent}10, transparent 60%)` : 'transparent',
          transition: 'background .4s ease',
          ...style,
        }}>
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: h ? 'calc(100% + 2px)' : 0,
          background: accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
        }}/>
        {children}
      </div>
    );
  };

  // ─── COMMITMENTS — 5 cards, latent accents reveal on hover ─
  const Commitments = () => {
    // Per-tile accent for the latent stroke + numeral color.
    // 03 is locked-highlighted in orange, 02 numeral is yellow.
    const accents = [C.mint, C.amber, C.tangerine, C.lavender, C.sky];
    const [headH, setHeadH] = React.useState(false);
    const items = window.AxiusCommitments;
    return (
      <section id="work" data-screen-label="01 Commitments" style={{
        padding: `108px ${pad}px`,
      }}>
        <div
          onMouseEnter={() => setHeadH(true)}
          onMouseLeave={() => setHeadH(false)}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
            alignItems: 'flex-end', marginBottom: 80,
          }}>
          <div>
            <Eyebrow style={{marginBottom: 28}}>{t('sec01Eyebrow')}</Eyebrow>
            <HoverHead
              style={{whiteSpace: 'nowrap'}}
              prefix={t('sec01TitlePrefix')}
              italic={t('sec01TitleItalic')}
              suffix={t('sec01TitleSuffix')}/>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16,
        }}>
          {items.map((c, i) => {
            // Hover-only: no locked tile.  Every commitment reveals
            // its accent strip + border tint only on hover, matching
            // the rest of the tiles.
            const numeralColor = C.ink;
            const titleColor = C.ink;
            return (
              <QuietCard key={c.n}
                accent={accents[i]} padding={28}
                style={{minHeight: 360, display: 'flex', flexDirection: 'column', gap: 18}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                  <span style={{
                    fontFamily: DISPLAY, fontWeight: 500, fontSize: 36,
                    letterSpacing: '-0.04em', lineHeight: 1, color: numeralColor,
                    transition: 'color .35s ease',
                  }}>{c.n}</span>
                  {/* coloured dot removed per spec */}
                </div>
                <h3 style={{
                  margin: 0, fontFamily: DISPLAY, fontWeight: 500, fontSize: 19,
                  letterSpacing: '-0.02em', lineHeight: 1.25, color: titleColor,
                  transition: 'color .35s ease',
                }}>{tr(c, 'title')}</h3>
                <p style={{
                  margin: 0, fontSize: 13, color: C.dim, lineHeight: 1.65, flex: 1,
                  letterSpacing: '-0.003em', whiteSpace: 'pre-line',
                }}>{tr(c, 'body')}</p>
                <div style={{paddingTop: 14, borderTop: `1px solid ${C.line}`}}>
                  <Eyebrow color={C.mute} style={{marginBottom: 4}}>{tr(c.metric, 'label')}</Eyebrow>
                  <div style={{
                    fontFamily: DISPLAY, fontWeight: 500, fontSize: 19, color: C.ink,
                    letterSpacing: '-0.018em',
                  }}>{tr(c.metric, 'value')}</div>
                </div>
              </QuietCard>
            );
          })}
        </div>
      </section>
    );
  };

  // ─── 02 · MESS ─────────────────────────────────────────────
  const Mess = () => {
    const [titleH, setTitleH] = React.useState(false);
    return (
      <section data-screen-label="02 The Mess" style={{
        padding: `108px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
        <Eyebrow style={{marginBottom: 28}}>{t('sec02Eyebrow')}</Eyebrow>

        {/* Mess H2 with two italic accents: "build" in orange (no glow),
            "not" in regular black ink. Enlarges subtly on hover, matching
            the hero and other section titles. */}
        <h2
          onMouseEnter={() => setTitleH(true)}
          onMouseLeave={() => setTitleH(false)}
          style={{
            margin: 0, fontFamily: DISPLAY, fontWeight: 600, fontSize: 84,
            letterSpacing: '-0.045em', lineHeight: 1.0, color: C.ink, maxWidth: 1080,
            cursor: 'default',
          }}>
          <span style={{
            display: 'inline-block',
            transformOrigin: '0% 50%',
            transform: titleH ? 'scale(1.035)' : 'scale(1)',
            transition: 'transform .55s cubic-bezier(.2,.8,.2,1)',
          }}>
            {t('sec02TitleP1')}
            <span style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              color: C.tangerine,
            }}>{t('sec02TitleBuild')}</span>
            {t('sec02TitleP2')}
            <span style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.ink,
            }}>{t('sec02TitleNot')}</span>
            {t('sec02TitleP3')}
          </span>
        </h2>

        <div style={{
          marginTop: 96, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 56, borderTop: `1px solid ${C.line}`, paddingTop: 48,
        }}>
          {[
            { n: '01', label: t('sec02ColLabels')[0], accent: C.amber,
              body: t('sec02ColBodies')[0] },
            { n: '02', label: t('sec02ColLabels')[1], accent: C.lavender,
              body: t('sec02ColBodies')[1] },
            { n: '03', label: t('sec02ColLabels')[2], accent: C.tangerine,
              body: t('sec02ColBodies')[2] },
          ].map((c, i) => {
            const labelColor = c.locked ? C.ink : C.mute;
            const numeralColor = c.locked ? C.tangerine : C.ink;
            return (
              <HoverColumn key={i} accent={c.accent} locked={c.locked}>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24}}>
                  <span style={{
                    fontFamily: MONO, fontWeight: 500, fontSize: 13,
                    letterSpacing: '0.18em', color: numeralColor,
                    transition: 'color .35s ease',
                  }}>{c.n}.</span>
                  <Eyebrow color={labelColor} style={{
                    color: labelColor, fontWeight: c.locked ? 700 : 500,
                    transition: 'color .35s ease',
                  }}>{c.label}</Eyebrow>
                </div>
                <p style={{
                  margin: 0, fontSize: 16, color: C.dim, lineHeight: 1.7, letterSpacing: '-0.003em',
                }}>{c.body}</p>
              </HoverColumn>
            );
          })}
        </div>
      </section>
    );
  };

  // Hover-column for the Mess — left bar reveal (now also lockable).
  const HoverColumn = ({ accent, children, locked }) => {
    const [h, setH] = React.useState(false);
    const on = locked || h;
    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', paddingLeft: 24,
          transition: 'transform .35s ease',
          transform: on ? 'translateX(2px)' : 'translateX(0)',
        }}>
        <span style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: on ? 2 : 1,
          background: on ? accent : C.line,
          transition: 'background .35s ease, width .35s ease',
        }}/>
        {children}
      </div>
    );
  };

  // ─── 03 · METHOD ───────────────────────────────────────────
  const Method = () => {
    // Stage 01 (Audit) locked in orange. Others retain their variety accents.
    const accents = [C.tangerine, C.lavender, C.mint, C.amber];
    const [headH, setHeadH] = React.useState(false);
    return (
      <section id="method" data-screen-label="03 Method" style={{
        padding: `108px ${pad}px`,
        background: C.panel, borderTop: `1px solid ${C.line}`,
      }}>
        <div
          onMouseEnter={() => setHeadH(true)}
          onMouseLeave={() => setHeadH(false)}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
            alignItems: 'flex-end', marginBottom: 80,
          }}>
          <div>
            <Eyebrow style={{marginBottom: 28}}>{t('sec03Eyebrow')}</Eyebrow>
            <HoverHead
              style={{maxWidth: 760}}
              prefix={t('sec03TitlePrefix')}
              italic={t('sec03TitleItalic')}
              suffix={t('sec03TitleSuffix')}/>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        }}>
          {window.AxiusMethodology.map((m, i) => (
            <MethodCard key={m.n}
              m={m} accent={accents[i]} index={i}/>
          ))}
        </div>
      </section>
    );
  };

  const MethodCard = React.forwardRef(({ m, accent, index, locked }, ref) => {
    const [h, setH] = React.useState(false);
    const on = locked || h;
    const stageColor = locked ? C.tangerine : (on ? C.ink : C.mute);
    const nameColor = C.ink;
    return (
      <div
        ref={ref}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative',
          padding: '32px 28px',
          background: C.surface,
          border: `1px solid ${on ? accent : C.line}`,
          transition: 'border-color .35s ease, transform .35s cubic-bezier(.2,.8,.2,1)',
          transform: on ? 'translateY(-3px)' : 'translateY(0)',
          minHeight: 360, display: 'flex', flexDirection: 'column', gap: 20,
        }}>
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: on ? 'calc(100% + 2px)' : 0, background: accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
        }}/>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <span style={{
            fontFamily: DISPLAY, fontWeight: locked ? 600 : 500, fontSize: 18,
            color: stageColor,
            letterSpacing: '-0.005em',
            transition: 'color .35s ease',
          }}>{t('sec03StageLabel')} {m.n}</span>
          <Eyebrow color={C.faint}>{tr(m, 'timing')}</Eyebrow>
        </div>
        <h3 style={{
          margin: 0, fontFamily: DISPLAY, fontWeight: 500, fontSize: 32,
          letterSpacing: '-0.028em', lineHeight: 1.05, color: nameColor,
          transition: 'color .35s ease',
        }}>{tr(m, 'name')}.</h3>
        <p style={{margin: 0, fontSize: 14, color: C.dim, lineHeight: 1.65, flex: 1, whiteSpace: 'pre-line'}}>{tr(m, 'body')}</p>
        <div style={{
          padding: '12px 14px',
          background: on ? `${accent}0F` : 'transparent',
          border: `1px solid ${C.line}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          transition: 'background .35s ease',
        }}>
          <span style={{
            fontFamily: MONO, fontSize: 11, color: on ? accent : C.dim,
            letterSpacing: '0.04em', transition: 'color .35s ease',
          }}>{m.artifact}</span>
          <Eyebrow color={C.faint}>{t('sec03ArtifactLabel')}</Eyebrow>
        </div>
      </div>
    );
  });


  // Per-category pools of additional plausible workflows — used to pad
  // each category's sample list up toward its real `count`. The first
  // few rows are always the canonical samples from AxiusCatalog; these
  // are appended so the scroll panel actually has content to scroll.
  const EXTRA_SAMPLES = {
    sales: [
      ['Cold outreach sequences',           'smartlead · multi-step'],
      ['LinkedIn auto-engage',              'sequencing + signals'],
      ['Lead enrichment & ICP scoring',     'clay · apollo'],
      ['Demo booking router',               'cal.com · qualify-first'],
      ['Quote → proposal pipeline',         'pandadoc · auto-versioned'],
      ['Renewal & upsell automation',       'lifecycle triggers'],
      ['Win-back for churned customers',    'sequence + offer'],
      ['Sales call recap → CRM',            'gong · fathom'],
      ['Trial activation triggers',         'time + behavior'],
      ['Forecast & pipeline reporting',     'weekly digest'],
      ['Multi-channel prospecting',         'email · LinkedIn · phone'],
      ['Inbound lead router',               'route by intent + region'],
    ],
    cx: [
      ['Refund / cancel workflows',         'reason capture + offer'],
      ['NPS & feedback collection',         'in-product · post-resolve'],
      ['SLA monitoring & alerts',           'breach signal · routing'],
      ['VoC reporting roll-up',             'tags → weekly digest'],
      ['Status page & incident posts',      'statuspage.io · slack hooks'],
      ['Macro response library',            'multilingual templates'],
      ['Onboarding email pipeline',         'cohort-aware drip'],
      ['Post-purchase nurture',             '60d lifecycle'],
      ['Re-engagement campaigns',           'risk-tier triggered'],
      ['Help center search tuning',         'ranking + synonyms'],
      ['Live-chat handoff to human',        'context handoff packet'],
      ['Health-score signals',              'churn alerting'],
      ['Refund decisioning matrix',         'policy + tiering'],
    ],
    ops: [
      ['Expense automation',                'ramp · brex sync'],
      ['Vendor onboarding flow',            'w-9 · contract · access'],
      ['Hiring & ATS plumbing',             'ashby / greenhouse'],
      ['Payroll & contractor ops',          'gusto · deel'],
      ['IT provisioning',                   'okta · 1password · grants'],
      ['Time-off & calendar sync',          'shared availability'],
      ['Procurement guardrails',            'approval chain by amount'],
      ['Inventory reconciliation',          'shopify · stripe · csv'],
      ['Internal request portal',           'retool · linear'],
      ['QBR pack generator',                'auto-roll from data'],
      ['Compliance check automation',       'gdpr · ccpa · audits'],
      ['SaaS subscription audit',           'kill ghost spend'],
    ],
    ai: [
      ['Internal copilot for ops',          'ground in your docs'],
      ['Email summarisation & triage',      'priority + draft'],
      ['Meeting agent',                     'calendar + prep + recap'],
      ['Document understanding',            'invoices · contracts'],
      ['Voice qualification (inbound)',     'vapi · twilio'],
      ['Customer sentiment scoring',        'tickets + calls'],
      ['Image / asset tagging',             'product photos at scale'],
      ['Translation pipeline',              'docs · marketing · support'],
      ['Resume + applicant ranking',        'ATS-grounded'],
      ['Forecasting assistant',             'sales · ops · cash'],
    ],
    data: [
      ['Dashboard automation',              'metabase · supabase'],
      ['Multi-touch attribution',           'cross-channel'],
      ['LTV / churn modeling',              'cohort + survival'],
      ['Custom data warehouse',             'snowflake / bigquery'],
      ['Self-serve analytics layer',        'looker / metabase models'],
      ['Event tracking plumbing',           'segment · posthog'],
      ['Daily ops digest',                  'email + slack'],
      ['Anomaly detection',                 'revenue · pipeline'],
      ['North-star reporting',              'one number, written'],
    ],
    web: [
      ['Marketing site (Next.js)',          'editorial / studio'],
      ['E-commerce setup',                  'shopify · woocommerce'],
      ['Multi-language site',               'localized routing'],
      ['A/B test framework',                'growthbook · vercel'],
      ['Landing page system',               'reusable section library'],
      ['Headless CMS plumbing',             'sanity · contentful'],
      ['Webflow → custom migration',        'preserve url shape'],
      ['Web performance tuning',            'core web vitals'],
      ['Privacy & cookie compliance',       'banner + audit'],
      ['Site search',                       'algolia / typesense'],
      ['Schema & SEO plumbing',             'metadata + sitemap'],
    ],
    soft: [
      ['Internal admin tool',               'retool · react custom'],
      ['Customer-facing app',               'react native · flutter'],
      ['Custom CRM build',                  'multi-tenant'],
      ['API integration plane',             'webhooks · queues'],
      ['Slack / Teams bot',                 'commands + workflows'],
      ['Customer portal',                   'auth + billing + docs'],
      ['Mobile push & in-app',              'one.signal · customer.io'],
      ['Background job system',             'inngest · trigger.dev'],
      ['File / document store',             's3 · supabase storage'],
      ['Single sign-on rollout',            'workOS · azure ad'],
      ['Feature-flag rollout',              'growthbook · launchdarkly'],
    ],
    grow: [
      ['Email marketing automation',        'transactional + segmented'],
      ['Paid ads management',               'meta · google · LinkedIn'],
      ['SEO content workflow',              'briefs · publish · distribute'],
      ['Affiliate program management',      'partner ops'],
      ['Newsletter system',                 'beehiiv · loops'],
      ['Webinar funnel',                    'lifecycle + replay'],
      ['Referral & invite loops',           'incentive logic'],
    ],
    creative: [
      ['Video repurposing pipeline',        'long → shorts / reels'],
      ['Podcast production',                'edit · chapters · distribute'],
      ['AI voice generation',               'elevenlabs · dubbing'],
      ['AI image generation pipeline',      'midjourney · batch'],
      ['Brand-kit asset system',            'figma · drive'],
      ['Photoshoot pipeline',               'brief · select · retouch'],
      ['Social calendar automation',        'cross-platform queue'],
      ['UGC review & rights workflow',      'tags · approvals'],
    ],
  };

  // Returns up to N entries for this category — real samples first,
  // then plausible extras from the pool. Capped at the category count.
  const expandedSamples = (cat) => {
    const wanted = Math.min(cat.count, cat.samples.length + (EXTRA_SAMPLES[cat.id] || []).length);
    const out = [...cat.samples];
    const pool = EXTRA_SAMPLES[cat.id] || [];
    let lastN = cat.samples.length ? parseInt(cat.samples[cat.samples.length - 1].n, 10) : 0;
    for (let i = 0; i < pool.length && out.length < wanted; i++) {
      lastN += 1;
      const [name, sub] = pool[i];
      out.push({
        n: String(lastN).padStart(3, '0'),
        name, sub,
        pts: i % 5 === 4 ? 2 : 1,
        time: i % 3 === 0 ? '~ 1 wk' : i % 3 === 1 ? '~ 2 wks' : '~ 4 days',
      });
    }
    return out;
  };

  // ─── 04 · CATALOG ──────────────────────────────────────────
  // Light keyword → category recommender for the AI Recommendation
  // Mode.  Maps free-text descriptions of a business to the most
  // relevant catalog category id.  Deterministic; no LLM.
  const recommendCategory = (text) => {
    const s = (text || '').toLowerCase();
    const score = {};
    const hit = (cat, weight) => { score[cat] = (score[cat] || 0) + weight; };
    if (/real\s*estate|broker|property|listing|tenant|landlord/.test(s)) { hit('sales', 4); hit('ops', 2); }
    if (/restaurant|clinic|dentist|dental|salon|spa|appointment/.test(s))    { hit('cx', 4);    hit('sales', 2); }
    if (/agency|consult|client work|deliverable|contract|sow/.test(s))       { hit('ops', 4);   hit('soft', 2); }
    if (/ecom|shopify|store|inventory|fulfil|sku|d2c/.test(s))               { hit('web', 4);   hit('data', 2); }
    if (/saas|product|startup|engineer|platform|micro\s*service/.test(s))    { hit('soft', 4);  hit('ai', 2); }
    if (/marketing|growth|ads|paid|seo|funnel|acquisition/.test(s))          { hit('grow', 4);  hit('data', 1); }
    if (/creator|content|podcast|video|youtube|tiktok|short|edit/.test(s))   { hit('creative', 4); hit('grow', 1); }
    if (/data|analytic|dashboard|warehouse|report|metric|attribution/.test(s)) { hit('data', 4); hit('ai', 1); }
    if (/ai|llm|gpt|chatbot|automation|workflow|integrat/.test(s))           { hit('ai', 4);    hit('ops', 1); }
    if (/support|ticket|inbox|wa|whatsapp|customer service/.test(s))         { hit('cx', 4);    hit('ai', 1); }
    if (/lead|outreach|cold|prospect|crm/.test(s))                           { hit('sales', 4); hit('ops', 1); }
    if (/website|landing|next\.?js|webflow|framer|wordpress/.test(s))        { hit('web', 4); }
    // Pick the highest-scoring category; tie-break by catalog order.
    // No keyword match? Fall back to Internal Operations — it's the
    // broadest catalog and the most generally useful starting point,
    // so every visitor walks away with a relevant pivot.
    const ranked = Object.entries(score).sort((a, b) => b[1] - a[1]);
    if (!ranked.length) return 'ops';
    return ranked[0][0];
  };

  const Catalog = () => {
    const accents = [C.tangerine, C.mint, C.amber, C.lavender, C.sky, C.pink, C.mint, C.tangerine, C.lavender];
    const [active, setActive] = React.useState(0);
    const [recoText, setRecoText] = React.useState('');
    const [recoFor, setRecoFor]   = React.useState(null);
    const [capacityHover, setCapacityHover] = React.useState(false);
    const cat = window.AxiusCatalog[active];
    const activeAccent = accents[active % accents.length];
    const total = window.AxiusCatalog.reduce((s, c) => s + c.count, 0);
    const examples = t('sec04CapacityExamples');

    const runRecommend = () => {
      const id = recommendCategory(recoText);
      if (!id) return;
      const idx = window.AxiusCatalog.findIndex(c => c.id === id);
      if (idx >= 0) {
        setActive(idx);
        setRecoFor(id);
      }
    };

    return (
      <section id="catalog" data-screen-label="04 Catalog" style={{
        padding: `108px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 80,
          alignItems: 'flex-end', marginBottom: 48,
        }}>
          <div>
            <Eyebrow style={{marginBottom: 28}}>{t('sec04Eyebrow')}</Eyebrow>
            <HoverHead
              accent={C.tangerine}
              prefix={t('sec04TitlePrefix')}
              italic={t('sec04TitleItalic')}
              suffix={t('sec04TitleSuffix')}/>
          </div>
          <div style={{textAlign: 'right'}}>
            <div style={{
              fontFamily: DISPLAY, fontWeight: 600, fontSize: 88,
              letterSpacing: '-0.05em', lineHeight: 0.9, color: C.ink,
            }}>
              <CountUp to={total} duration={1800}/>
            </div>
            <Eyebrow color={C.mute} style={{marginTop: 10}}>
              {t('sec04WorkflowsLabel')} · {window.AxiusCatalog.length} {t('sec04CategoriesLabel')}
            </Eyebrow>
          </div>
        </div>

        {/* Workflow Capacity intro — hover to expand.  Fully transparent
            (no surface card, no enclosing border) so the section reads
            as inline section copy.  Eyebrow color shifts on hover to
            signal that the body, weight table, and footer line are
            revealable; everything else lives flush with the page. */}
        <div
          onMouseEnter={() => setCapacityHover(true)}
          onMouseLeave={() => setCapacityHover(false)}
          style={{
            marginBottom: 36,
            cursor: 'default',
          }}>
          <div style={{
            padding: capacityHover ? '20px 0' : '14px 0',
            transition: 'padding .35s ease',
          }}>
            <Eyebrow color={capacityHover ? C.tangerine : C.mute} style={{
              transition: 'color .3s ease',
              display: 'inline-block',
            }}>{t('sec04CapacityTitle')}</Eyebrow>
            <div style={{
              overflow: 'hidden',
              maxHeight: capacityHover ? 360 : 0,
              opacity: capacityHover ? 1 : 0,
              marginTop: capacityHover ? 16 : 0,
              transition: 'max-height .5s cubic-bezier(.2,.8,.2,1), opacity .35s ease, margin-top .35s ease',
            }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40,
                alignItems: 'flex-start',
              }}>
                <p style={{
                  margin: 0, maxWidth: 520,
                  fontFamily: DISPLAY, fontSize: 15, color: C.dim, lineHeight: 1.6,
                  letterSpacing: '-0.003em',
                }}>{t('sec04CapacityBody')}</p>
                <div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${C.line}`,
                  }}>
                    <Eyebrow color={C.mute}>{t('sec04WorkflowsLabel')}</Eyebrow>
                    <Eyebrow color={C.mute}>{t('sec04CapacityWeightLabel')}</Eyebrow>
                  </div>
                  {examples.map((ex, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                      padding: '6px 0',
                      borderBottom: i === examples.length - 1 ? 'none' : `1px solid ${C.line}`,
                    }}>
                      <span style={{
                        fontFamily: DISPLAY, fontSize: 13, color: C.ink, letterSpacing: '-0.003em',
                      }}>{ex.name}</span>
                      <span style={{
                        fontFamily: MONO, fontSize: 11, color: C.tangerine,
                        letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums',
                      }}>{ex.pts} {ex.pts === 1 ? 'pt' : 'pts'}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                marginTop: 16, paddingTop: 12,
                borderTop: `1px solid ${C.line}`,
              }}>
                <Eyebrow color={C.mute}>{t('sec04CapacityFooter')}</Eyebrow>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendation Mode — describe your business, the catalog
            auto-pivots to the most relevant category.  Quiet inline bar:
            transparent background with a single bottom rule so it reads
            like a search field, not a competing card.  Lavender accent
            on the label + CTA keeps the "AI surface" cue without the
            heavy filled panel. */}
        <div style={{
          marginBottom: 28, padding: '10px 0',
          borderBottom: `1px solid ${C.line}`,
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 18,
          alignItems: 'center',
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, minWidth: 0}}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: MONO, fontSize: 9, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: C.lavender, flexShrink: 0,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: C.lavender, display: 'inline-block',
              }}/>
              {t('sec04RecommendLabel')}
            </span>
            <input
              type="text"
              value={recoText}
              onChange={(e) => setRecoText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') runRecommend(); }}
              placeholder={t('sec04RecommendPlaceholder')}
              style={{
                flex: 1, minWidth: 0,
                appearance: 'none', border: 'none', outline: 'none', background: 'transparent',
                fontFamily: DISPLAY, fontSize: 14, color: C.ink, letterSpacing: '-0.003em',
                padding: '6px 4px',
              }}/>
          </div>
          <button
            type="button"
            onClick={runRecommend}
            disabled={!recoText.trim()}
            style={{
              appearance: 'none', cursor: recoText.trim() ? 'pointer' : 'not-allowed',
              background: 'transparent',
              color: recoText.trim() ? C.lavender : C.mute,
              border: 'none',
              padding: '6px 4px',
              fontFamily: MONO, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              transition: 'color .25s ease',
            }}>{t('sec04RecommendButton')} →</button>
        </div>

        {/* Categories left, samples right — same card style, stacked vertically.
            Categories column scrolls inside the same height as the samples panel
            so the section stays as compact as Commitments / Method / Mess. */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 24,
          alignItems: 'flex-start',
        }}>
          <div className="ax-quiet05-scroll" style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            maxHeight: 520, overflowY: 'auto',
            paddingRight: 8,
          }}>
            {window.AxiusCatalog.map((c, i) => (
              <CatalogCard key={c.id} c={c} accent={accents[i]} isActive={active === i}
                onClick={() => { setActive(i); setRecoFor(null); }} index={i}/>
            ))}
          </div>

          {/* sample entries for active category — scrollable */}
          {(() => {
            const rows = expandedSamples(cat);
            return (
              <div style={{
                background: C.surface,
                border: `1px solid ${recoFor === cat.id ? C.lavender : C.line}`,
                position: 'sticky', top: 80,
                transition: 'border-color .3s ease',
              }}>
                {/* RECOMMENDED FOR YOU — slim lavender strip across the
                    top of the panel.  Lives outside the regular header
                    row so it can't compete with the category name and
                    count for space.  Appears only when the AI pivot
                    points at this category. */}
                {recoFor === cat.id && (
                  <div style={{
                    padding: '6px 24px',
                    background: C.lavender,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#FFFFFF', display: 'inline-block',
                    }}/>
                    <span style={{
                      fontFamily: MONO, fontSize: 9, fontWeight: 600,
                      color: '#FFFFFF',
                      letterSpacing: '0.22em', textTransform: 'uppercase',
                    }}>{t('sec04RecommendBadge')}</span>
                  </div>
                )}
                <div style={{
                  padding: '16px 24px', borderBottom: `1px solid ${C.line}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: C.panel,
                }}>
                  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12}}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: activeAccent,
                    }}/>
                    <Eyebrow color={C.ink}>{tr(cat, 'name')} — {t('sec04SampleEntries')}</Eyebrow>
                  </div>
                  <Eyebrow color={C.mute}>{rows.length} / {cat.count} · {t('sec04ScrollMore')}</Eyebrow>
                </div>
                <div className="ax-quiet05-scroll" style={{
                  maxHeight: 420, overflowY: 'auto',
                }}>
                  {rows.map((s, i) => (
                    <SampleRow key={s.n} s={s} last={i === rows.length - 1} accent={activeAccent}/>
                  ))}
                </div>
                {rows.length < cat.count && (
                  <div style={{
                    padding: '12px 24px', borderTop: `1px solid ${C.line}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: C.panel,
                  }}>
                    <Eyebrow color={C.mute}>
                      {t('sec04MoreOnRequest')(cat.count - rows.length)}
                    </Eyebrow>
                    <a href="mailto:andres@axius.tech" style={{
                      fontFamily: MONO, fontSize: 11, fontWeight: 500,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: activeAccent, textDecoration: 'none',
                    }}>{t('sec04RequestFullIndex')}</a>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>
    );
  };

  const CatalogCard = ({ c, accent, isActive, onClick, index, badge }) => {
    const [h, setH] = React.useState(false);
    const on = isActive || h;
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', padding: '26px 24px',
          background: isActive ? `${accent}0D` : C.surface,
          border: `1px solid ${on ? accent : C.line}`,
          cursor: 'pointer',
          transition: 'border-color .35s ease, background .35s ease, transform .35s cubic-bezier(.2,.8,.2,1)',
          transform: h && !isActive ? 'translateY(-3px)' : 'translateY(0)',
          minHeight: 130, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: on ? 'calc(100% + 2px)' : 0, background: accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
        }}/>
        {badge && (
          <span style={{
            position: 'absolute', top: 8, right: 10,
            fontFamily: MONO, fontSize: 8, fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: accent,
          }}>{badge}</span>
        )}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
            {/* Pulsing dot on the active category — same accent strip
                pattern as the right panel's "live" indicator. */}
            <span aria-hidden style={{
              display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: isActive ? accent : 'transparent',
              border: isActive ? 'none' : `1px solid ${on ? accent : C.faint}`,
              animation: isActive ? 'axQ05Pulse 2.4s ease-out infinite' : 'none',
              transition: 'background .35s ease, border-color .35s ease',
            }}/>
            <Eyebrow color={on ? accent : C.mute}>
              {t('sec04CatLabel')}.{String(index+1).padStart(2, '0')}
            </Eyebrow>
          </div>
          <span style={{
            fontFamily: MONO, fontSize: 11, color: C.mute, letterSpacing: '0.06em',
          }}>{c.count}</span>
        </div>
        <div>
          <h3 style={{
            margin: '0 0 6px', fontFamily: DISPLAY, fontWeight: 500, fontSize: 20,
            letterSpacing: '-0.022em', color: C.ink,
          }}>{tr(c, 'name')}</h3>
          <span style={{
            fontFamily: MONO, fontSize: 11, color: C.mute, letterSpacing: '0.04em',
          }}>{c.stack}</span>
        </div>
      </div>
    );
  };

  const SampleRow = ({ s, last, accent }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          display: 'grid', gridTemplateColumns: '80px 1fr 80px 40px',
          gap: 20, padding: '18px 24px',
          borderBottom: last ? 'none' : `1px solid ${C.line}`,
          background: h ? `${accent}08` : 'transparent',
          transition: 'background .25s ease',
          alignItems: 'baseline', cursor: 'default',
        }}>
        <span style={{
          fontFamily: MONO, fontSize: 11, fontWeight: 500,
          color: h ? accent : C.mute, letterSpacing: '0.06em',
          transition: 'color .25s ease',
        }}>{s.n}</span>
        <div>
          <div style={{
            fontFamily: DISPLAY, fontWeight: 500, fontSize: 16, color: C.ink,
            letterSpacing: '-0.012em',
          }}>{s.name}</div>
          <div style={{
            fontFamily: MONO, fontSize: 11, color: C.mute,
            letterSpacing: '0.04em', marginTop: 4,
          }}>{s.sub}</div>
        </div>
        <span style={{
          fontFamily: MONO, fontSize: 12, color: h ? accent : C.dim,
          letterSpacing: '0.04em', textAlign: 'right', transition: 'color .25s ease',
        }}>{s.pts} pt{s.pts > 1 ? 's' : ''}</span>
        <span style={{
          fontFamily: MONO, fontSize: 14, color: h ? accent : C.faint,
          textAlign: 'right', transition: 'color .25s ease, transform .25s ease',
          transform: h ? 'translateX(2px)' : 'translateX(0)',
        }}>→</span>
      </div>
    );
  };

  // ─── 05 · COMPARISON — rendered as an editorial table using the
  // AxiusComparison row data.  Denser + more authoritative than the
  // 3-card layout, and visually distinct from the Pricing tier row
  // and Model pillar row that flank it.
  const Comparison = () => {
    const rows = window.AxiusComparison || [];
    const cols = [
      { key: 'f', label: t('sec05ColF'), accent: C.amber    },
      { key: 'h', label: t('sec05ColH'), accent: C.lavender },
      { key: 'a', label: t('sec05ColA'), accent: C.tangerine, featured: true },
    ];
    return (
      <section data-screen-label="05 Comparison" style={{
        padding: `108px ${pad}px`,
        background: C.panel, borderTop: `1px solid ${C.line}`,
      }}>
        <Eyebrow style={{marginBottom: 28}}>{t('sec05Eyebrow')}</Eyebrow>
        <HoverHead
          accent={C.mint}
          style={{maxWidth: 1080, marginBottom: 72}}
          prefix={t('sec05TitlePrefix')}
          italic={t('sec05TitleItalic')}
          suffix={t('sec05TitleSuffix')}/>

        <div style={{
          background: C.surface,
          border: `1px solid ${C.line}`,
          overflow: 'hidden',
        }}>
          {/* Header row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr repeat(3, 1fr)',
            background: C.bg,
            borderBottom: `1px solid ${C.line}`,
          }}>
            <div style={{padding: '18px 24px'}}>
              <Eyebrow color={C.mute}>{t('sec05OptionLabel')}</Eyebrow>
            </div>
            {cols.map((col, i) => (
              <div key={col.key} style={{
                padding: '18px 24px',
                borderLeft: `1px solid ${C.line}`,
                background: col.featured ? `${col.accent}0D` : 'transparent',
                position: 'relative',
              }}>
                {col.featured && (
                  <span aria-hidden style={{
                    position: 'absolute', top: -1, left: -1, height: 2,
                    width: 'calc(100% + 2px)',
                    background: col.accent,
                  }}/>
                )}
                <div style={{
                  fontFamily: DISPLAY, fontWeight: 600, fontSize: 20,
                  letterSpacing: '-0.025em', color: C.ink,
                }}>{col.label}</div>
              </div>
            ))}
          </div>

          {/* Data rows — header stays pinned above.  Visible window
              shows the first 5 rows; the remaining rows are reachable
              by scrolling within the panel.  A soft fade hint at the
              bottom signals there's more content below. */}
          <div style={{position: 'relative'}}>
            <div className="ax-quiet05-scroll" style={{
              maxHeight: 5 * 60 + 4, overflowY: 'auto',
            }}>
              {rows.map((r, i) => {
                const last = i === rows.length - 1;
                return (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr repeat(3, 1fr)',
                    borderBottom: last ? 'none' : `1px solid ${C.line}`,
                  }}>
                    <div style={{
                      padding: '18px 24px',
                      fontFamily: MONO, fontSize: 11, fontWeight: 500,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: C.mute,
                      display: 'flex', alignItems: 'center',
                    }}>{tr(r, 'row')}</div>
                    {cols.map((col) => (
                      <div key={col.key} style={{
                        padding: '18px 24px',
                        borderLeft: `1px solid ${C.line}`,
                        background: col.featured ? `${col.accent}0D` : 'transparent',
                        fontFamily: DISPLAY, fontSize: 14, lineHeight: 1.55,
                        color: col.featured ? C.ink : C.dim,
                        fontWeight: col.featured ? 500 : 400,
                      }}>{tr(r, col.key)}</div>
                    ))}
                  </div>
                );
              })}
            </div>
            {rows.length > 5 && (
              <div aria-hidden style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                height: 40, pointerEvents: 'none',
                background: `linear-gradient(180deg, ${C.surface}00, ${C.surface} 88%)`,
              }}/>
            )}
          </div>
        </div>
      </section>
    );
  };

  // ─── 06 · PRICING ──────────────────────────────────────────
  // Middle tier (featured) gets a pulse animation each time the
  // section re-enters the viewport — pops out for ~1.8s, returns
  // to baseline so all 3 tiers read identical at rest.  Going up
  // and back down re-arms the pulse.
  const Pricing = () => {
    const accents = [C.mint, C.tangerine, C.lavender];
    const [headH, setHeadH] = React.useState(false);
    const [pulse, setPulse] = React.useState(false);
    const sectionRef = React.useRef(null);
    const featuredIndex = React.useMemo(
      () => window.AxiusPricing.findIndex((p) => p.featured),
      []
    );
    React.useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;
      let timer = null;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPulse(true);
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => setPulse(false), 1800);
          } else {
            if (timer) clearTimeout(timer);
            setPulse(false);
          }
        });
      }, { threshold: 0.35 });
      io.observe(node);
      return () => {
        io.disconnect();
        if (timer) clearTimeout(timer);
      };
    }, []);
    return (
      <section ref={sectionRef} id="pricing" data-screen-label="06 Pricing" style={{
        padding: `108px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
        <div
          onMouseEnter={() => setHeadH(true)}
          onMouseLeave={() => setHeadH(false)}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
            alignItems: 'flex-end', marginBottom: 64,
          }}>
          <div>
            <Eyebrow style={{marginBottom: 28}}>{t('sec06Eyebrow')}</Eyebrow>
            <HoverHead
              accent={C.mint}
              style={{whiteSpace: 'nowrap'}}
              prefix={t('sec06TitlePrefix')}
              italic={t('sec06TitleItalic')}
              suffix={t('sec06TitleSuffix')}/>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16,
          alignItems: 'stretch',
        }}>
          {window.AxiusPricing.map((p, i) => (
            <PricingCard
              key={p.id}
              p={p}
              accent={accents[i]}
              index={i}
              pulse={pulse && i === featuredIndex}/>
          ))}
        </div>

        {/* Founder Track — quiet footer block under the tier row.
            Transparent (no surface card, no enclosing border); the
            uppercase chips on the right of the question keep enough
            visual structure on their own.  Horizontal layout: label /
            question / chip row on the left, CTA on the right. */}
        <div style={{
          marginTop: 24, padding: '28px 0',
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 40,
          alignItems: 'center',
        }}>
          <div style={{maxWidth: 740, display: 'flex', flexDirection: 'column', gap: 12}}>
            <Eyebrow color={C.mute}>{t('pricingFounderTrackLabel')}</Eyebrow>
            <div style={{
              fontFamily: DISPLAY, fontWeight: 500, fontSize: 22,
              color: C.ink, letterSpacing: '-0.022em', lineHeight: 1.2,
            }}>{t('pricingFounderTrackQuestion')}</div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
              {t('pricingFounderTrackItems').map((item, i) => (
                <span key={i} style={{
                  padding: '4px 10px',
                  border: `1px solid ${C.lineHi}`,
                  fontFamily: MONO, fontSize: 10, fontWeight: 500,
                  color: C.dim, letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>{item}</span>
              ))}
            </div>
          </div>
          <QuietBtn primary size="md"
            onClick={() => openBooking(t('pricingFounderTrackSubject'))}>
            {t('pricingFounderTrackCta')}
          </QuietBtn>
        </div>
      </section>
    );
  };

  // ─── PricingBar — labeled capacity/response bar that animates fill.
  // Optional `info` prop renders a small (i) icon next to the value;
  // hovering or focusing it pops a small tooltip with the supplied
  // content (used on the Capacity bar to explain what 1 point means
  // and to show the tier's comms channels in one place).
  const PricingBar = ({ label, value, pct, accent, on, info, infoWorkloads, infoWorkloadsLabel }) => {
    const [infoH, setInfoH] = React.useState(false);
    return (
      <div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 6,
        }}>
          <Eyebrow color={C.mute}>{label}</Eyebrow>
          <div style={{
            display: 'inline-flex', alignItems: 'baseline', gap: 6,
            fontFamily: DISPLAY, fontSize: 13, color: C.ink,
            letterSpacing: '-0.005em', fontVariantNumeric: 'tabular-nums',
          }}>
            <span>{value}</span>
            {info && (
              <span
                tabIndex={0}
                aria-label="More info"
                onMouseEnter={() => setInfoH(true)}
                onMouseLeave={() => setInfoH(false)}
                onFocus={() => setInfoH(true)}
                onBlur={() => setInfoH(false)}
                style={{
                  position: 'relative',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 14, height: 14, borderRadius: '50%',
                  border: `1px solid ${infoH ? accent : C.lineHi}`,
                  fontFamily: MONO, fontSize: 9, fontWeight: 600,
                  color: infoH ? accent : C.mute,
                  cursor: 'help', outline: 'none', userSelect: 'none',
                  transition: 'color .2s ease, border-color .2s ease',
                }}>
                i
                {infoH && (
                  <span style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: -6,
                    width: 260, padding: '10px 12px',
                    background: C.surface,
                    border: `1px solid ${C.lineHi}`,
                    boxShadow: '0 8px 18px rgba(10,9,7,0.10), 0 1px 3px rgba(10,9,7,0.06)',
                    fontFamily: DISPLAY, fontSize: 11.5, color: C.ink,
                    letterSpacing: '-0.003em', lineHeight: 1.5,
                    textAlign: 'left', cursor: 'default',
                    whiteSpace: 'pre-line',
                    zIndex: 40,
                    display: 'block',
                  }}>
                    {info}
                    {Array.isArray(infoWorkloads) && infoWorkloads.length > 0 && (
                      <span style={{display: 'block', marginTop: 10, paddingTop: 8, borderTop: `1px solid ${C.line}`}}>
                        <span style={{
                          display: 'block', marginBottom: 4,
                          fontFamily: MONO, fontSize: 8, fontWeight: 600,
                          letterSpacing: '0.18em', textTransform: 'uppercase', color: C.mute,
                        }}>{infoWorkloadsLabel}</span>
                        {infoWorkloads.map((w, i) => (
                          <span key={i} style={{
                            display: 'block',
                            fontFamily: DISPLAY, fontSize: 11, color: C.ink, lineHeight: 1.55,
                          }}>· {w}</span>
                        ))}
                      </span>
                    )}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
        <div style={{
          position: 'relative',
          height: 3, background: C.ghost, overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: on ? `${pct}%` : '0%',
            background: accent,
            transition: 'width .9s cubic-bezier(.2,.8,.2,1)',
          }}/>
        </div>
      </div>
    );
  };

  const PricingCard = ({ p, accent, index, pulse }) => {
    const [h, setH] = React.useState(false);
    const on = pulse || h;

    // Progress-bar percentages
    // Capacity: points out of a 10pt ceiling (Operator 2, Team 5, Department 10)
    const capacityPct = Math.min(100, Math.round((p.points / 10) * 100));
    // Response: faster = fuller. 24h → 100%, 48h → 67%, 72h → 33%
    const respHours = parseInt(String(p.response).replace(/[^0-9]/g, ''), 10) || 72;
    const responsePct = Math.max(15, Math.min(100, Math.round(((96 - respHours) / 96) * 100)));

    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', padding: '32px 28px 28px',
          background: C.surface,
          border: `1px solid ${on ? accent : C.line}`,
          transition: 'transform .7s cubic-bezier(.2,.8,.2,1), border-color .4s ease',
          transform: pulse ? 'translateY(-6px)' : (h ? 'translateY(-3px)' : 'translateY(0)'),
          display: 'flex', flexDirection: 'column', gap: 22,
        }}>
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: on ? 'calc(100% + 2px)' : 0, background: accent,
          transition: 'width .7s cubic-bezier(.2,.8,.2,1)',
        }}/>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Eyebrow color={on ? accent : C.mute}>{t('pricingTierLabel')} {String(index+1).padStart(2, '0')}</Eyebrow>
          {!!p.featured && (
            <span style={{
              fontFamily: MONO, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: accent,
              opacity: (pulse || h) ? 1 : 0,
              transition: 'opacity .4s ease',
            }}>{t('pricingRecommended')}</span>
          )}
        </div>

        <h3 style={{
          margin: 0, fontFamily: DISPLAY, fontWeight: 600,
          fontSize: 38,
          letterSpacing: '-0.034em', lineHeight: 0.95, color: C.ink,
        }}>{tierName(p.id)}</h3>

        <p style={{margin: 0, fontSize: 14, color: C.dim, lineHeight: 1.55, minHeight: 60}}>{tr(p, 'sub')}</p>

        <div style={{paddingTop: 22, borderTop: `1px solid ${C.line}`, display: 'flex', alignItems: 'baseline', gap: 8}}>
          <span style={{
            fontFamily: DISPLAY, fontWeight: 600, fontSize: 52,
            color: C.ink, letterSpacing: '-0.04em', lineHeight: 0.92,
          }}>${p.price.toLocaleString()}</span>
          <span style={{fontFamily: MONO, fontSize: 12, color: C.mute, letterSpacing: '0.08em'}}>{t('pricingMo')}</span>
        </div>
        <div style={{
          fontFamily: MONO, fontSize: 10, color: C.mute,
          letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: -10,
        }}>{t('pricingSetupNote')(p.setup)}</div>

        {/* Capacity + response progress bars — fill animates on pulse/hover.
            The Capacity bar carries an (i) info icon next to its value
            that explains what a point represents. */}
        <div style={{
          padding: '18px 0',
          borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <PricingBar
            label={t('pricingCapacity')}
            value={`${p.points} pts`}
            pct={capacityPct}
            accent={accent}
            on={on}
            info={t('pricingCapacityInfo')(p.points)}
            infoWorkloads={tr(p, 'workloads')}
            infoWorkloadsLabel={t('pricingTypicalWorkloadsLabel')}/>
          <PricingBar
            label={t('pricingResponse')}
            value={p.response}
            pct={responsePct}
            accent={accent}
            on={on}/>
          <div style={{paddingTop: 6}}>
            <Eyebrow color={C.mute} style={{marginBottom: 4}}>{t('pricingCadence')}</Eyebrow>
            <div style={{fontFamily: DISPLAY, fontSize: 14, color: C.ink, letterSpacing: '-0.005em'}}>{tr(p, 'cadence')}</div>
          </div>
        </div>

        {/* Primary: direct subscribe via Stripe Payment Link.  Falls back
            to the discovery-call mailto+Cal flow when no checkout URL is
            configured.  Secondary: a quiet "Or book a call first" link
            so cautious buyers still have an obvious off-ramp. */}
        {(() => {
          const checkoutUrl = (window.AxiusConfig && window.AxiusConfig.checkoutUrls && window.AxiusConfig.checkoutUrls[p.id]) || '';
          const onStart = () => {
            if (checkoutUrl) {
              window.open(checkoutUrl, '_blank', 'noopener');
              return;
            }
            openEmail(t('pricingCheckoutSubject')(tierName(p.id)));
          };
          return (
            <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
              <QuietBtn primary accent={accent} size="md"
                onClick={onStart}
                style={{justifyContent: 'center'}}>
                {t('pricingGetStarted')}
              </QuietBtn>
              <button type="button"
                onClick={() => openBooking(t('bookingTierSubject')(tierName(p.id)))}
                style={{
                  appearance: 'none', cursor: 'pointer',
                  background: 'transparent', border: 'none', padding: '4px 0',
                  fontFamily: MONO, fontSize: 10, fontWeight: 500,
                  color: C.mute, letterSpacing: '0.18em', textTransform: 'uppercase',
                  textAlign: 'center', transition: 'color .25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = C.mute; }}>
                {t('pricingBookCallSecondary')}
              </button>
            </div>
          );
        })()}
      </div>
    );
  };

  // ─── 07 · THE MODEL ────────────────────────────────────────
  // Four-pillar positioning: YOU operate · AI keeps continuity ·
  // SPECIALISTS bring depth (invisibly) · CLIENT EXPERIENCE is a
  // single accountable layer.  Visualised as four QuietCard tiles
  // in a row, accent colours rotating through the brand palette,
  // header treatment matching every other numbered section.
  const Model = () => {
    const accents = [C.tangerine, C.mint, C.lavender, C.amber];
    const [headH, setHeadH] = React.useState(false);
    const pillars = t('modelPillars');
    return (
      <section id="model" data-screen-label="07 The Model" style={{
        padding: `108px ${pad}px`,
        background: C.panel, borderTop: `1px solid ${C.line}`,
      }}>
        <div
          onMouseEnter={() => setHeadH(true)}
          onMouseLeave={() => setHeadH(false)}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
            alignItems: 'flex-end', marginBottom: 80,
          }}>
          <div>
            <Eyebrow style={{marginBottom: 28}}>{t('sec07Eyebrow')}</Eyebrow>
            <HoverHead
              style={{maxWidth: 760}}
              prefix={t('sec07TitlePrefix')}
              italic={t('sec07TitleItalic')}
              suffix={t('sec07TitleSuffix')}/>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        }}>
          {pillars.map((p, i) => (
            <QuietCard key={i} accent={accents[i]} padding={28}
              style={{minHeight: 440, display: 'flex', flexDirection: 'column', gap: 18}}>
              <Eyebrow color={C.mute}>{p.eyebrow}</Eyebrow>
              <h3 style={{
                margin: 0, fontFamily: DISPLAY, fontWeight: 500, fontSize: 22,
                letterSpacing: '-0.025em', lineHeight: 1.2, color: C.ink,
              }}>{p.title}</h3>
              <ul style={{
                margin: 0, padding: 0, listStyle: 'none',
                display: 'flex', flexDirection: 'column', gap: 9,
                flex: 1,
              }}>
                {p.bullets.map((b, j) => (
                  <li key={j} style={{
                    display: 'flex', alignItems: 'baseline', gap: 10,
                    fontSize: 13, color: C.dim, lineHeight: 1.55,
                    letterSpacing: '-0.003em',
                  }}>
                    <span style={{
                      color: accents[i], fontFamily: MONO, fontWeight: 600,
                      fontSize: 11, flexShrink: 0,
                    }}>+</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </QuietCard>
          ))}
        </div>
      </section>
    );
  };

  // ─── 08 · FOUNDER — three editorial frames (Operator · In studio
  // · On the go) sitting in a row, with a serif pull-quote overlaid
  // on the bottom-right of the rightmost frame. Bio + facts flow
  // below in plain page style — no big surface card.
  const Founder = () => {
    const [headH, setHeadH] = React.useState(false);

    // Three frames — same source photo, different crops + filters.
    // Idle is desaturated; hover brings each frame into full colour
    // (and tints its eyebrow caption tangerine), matching the prior
    // single-photo hover behaviour but spread across three frames.
    const captions = t('sec08FigCaptions');
    const frames = [
      { fig: 'Fig. 01', caption: captions[0],  crop: '50% 30%',
        idle:   'grayscale(1) contrast(1.02)',
        active: 'grayscale(0) saturate(1.05) contrast(1.02)' },
      { fig: 'Fig. 02', caption: captions[1], crop: '50% 20%',
        idle:   'grayscale(0.92) sepia(0.18) contrast(1.06)',
        active: 'grayscale(0) saturate(1.05) contrast(1.02)' },
      { fig: 'Fig. 03', caption: captions[2], crop: '40% 35%',
        idle:   'grayscale(0.95) sepia(0.06) contrast(1.06) brightness(0.98)',
        active: 'grayscale(0) saturate(1.06) contrast(1.02)' },
    ];

    return (
      <section id="founder" data-screen-label="08 The Operator" style={{
        padding: `108px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
        {/* Header row — matches sections 01–05 */}
        <div
          onMouseEnter={() => setHeadH(true)}
          onMouseLeave={() => setHeadH(false)}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
            alignItems: 'flex-end', marginBottom: 80,
          }}>
          <div>
            <Eyebrow style={{marginBottom: 28}}>{t('sec08Eyebrow')}</Eyebrow>
            <HoverHead
              style={{whiteSpace: 'nowrap'}}
              prefix={t('sec08TitlePrefix')}
              italic={t('sec08TitleItalic')}
              suffix={t('sec08TitleSuffix')}/>
          </div>
        </div>

        {/* Three-image strip — each frame desaturates by default and
            blooms into colour on hover (eyebrow caption flips to
            tangerine), matching the prior single-photo treatment. */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
        }}>
          {frames.map((f, i) => <FounderFrame key={i} f={f} C={C}/>)}
        </div>

        {/* Bio (left, scrolling) and CTAs (right, fixed) share a single
            row below the images.  The bio is the new long-form 5-para
            version; the scroll panel deliberately ends at "Axius was
            built to solve that." so the third paragraph reads as a
            natural landing line — the rest is revealed when the visitor
            scrolls within the panel.  Right column CTAs stay anchored
            in place while the bio scrolls. */}
        <div style={{
          marginTop: 28,
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80,
          alignItems: 'start',
        }}>
          <div style={{position: 'relative', maxWidth: 560}}>
            <div className="ax-quiet05-scroll" style={{
              maxHeight: 188, overflowY: 'auto', paddingRight: 14,
              scrollbarGutter: 'stable',
            }}>
              {String(tr(window.AxiusFounder, 'bio') || '')
                .split(/\n\n+/)
                .map((para, i) => (
                  <p key={i} style={{
                    margin: i === 0 ? '0 0 14px' : '14px 0',
                    fontSize: 18, color: C.dim, lineHeight: 1.55,
                    letterSpacing: '-0.003em',
                  }}>{para}</p>
                ))}
            </div>
            {/* Soft fade hint at the bottom of the scroll panel so the
                visitor sees there's more below "Axius was built to
                solve that." — the visible area ends right at that line. */}
            <div aria-hidden style={{
              position: 'absolute', left: 0, right: 14, bottom: 0,
              height: 42, pointerEvents: 'none',
              background: `linear-gradient(180deg, ${C.bg}00, ${C.bg} 88%)`,
            }}/>
          </div>
          {/* Right column — LinkedIn pill + Talk-to-me CTA, anchored
              to the TOP of the row so the buttons sit right under the
              image strip, in line with where the bio description
              begins.  Clicking Talk-to-me smooth-scrolls back to the
              hero and fires the openHeroChat event. */}
          <div style={{
            justifySelf: 'end', alignSelf: 'start',
            display: 'flex', alignItems: 'center', gap: 12,
            flexWrap: 'wrap',
          }}>
            {window.AxiusConfig && window.AxiusConfig.linkedinUrl && (
              <a href={window.AxiusConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{
                appearance: 'none', cursor: 'pointer',
                background: 'transparent', color: C.ink, border: `1px solid ${C.lineHi}`,
                padding: '13px 18px',
                fontFamily: MONO, fontSize: 11, fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                transition: 'all .25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.tangerine; e.currentTarget.style.borderColor = C.tangerine; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = C.lineHi; }}>
                {t('sec08VerifyLinkedin')}
                <span aria-hidden>↗</span>
              </a>
            )}
            <button type="button"
              onClick={() => {
                scrollToId('hero');
                setTimeout(() => window.dispatchEvent(new CustomEvent('axius:openHeroChat')), 650);
              }}
              style={{
                appearance: 'none', cursor: 'pointer',
                background: C.ink, color: C.bg, border: `1px solid ${C.ink}`,
                padding: '13px 22px',
                fontFamily: MONO, fontSize: 11, fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                transition: 'all .25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.tangerine; e.currentTarget.style.borderColor = C.tangerine; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.ink; e.currentTarget.style.borderColor = C.ink; }}>
              {t('sec08TalkToMe')}
              <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 14}}>→</span>
            </button>
          </div>
        </div>
      </section>
    );
  };

  // Single founder frame — desaturated by default, blooms into colour
  // on hover, and tints its eyebrow caption tangerine while hovered.
  const FounderFrame = ({ f, C }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', overflow: 'hidden',
          aspectRatio: '4 / 5',
          border: `1px solid ${C.line}`,
          background: C.panel,
          cursor: 'default',
        }}>
        <img src={window.AxiusFounder.photo} alt={`Andrés Toro · ${f.caption}`} style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: f.crop,
          filter: h ? f.active : f.idle,
          transition: 'filter 1.4s cubic-bezier(.2,.8,.2,1)',
          display: 'block',
        }}/>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(247,246,242,0) 60%, rgba(247,246,242,0.72) 100%)',
        }}/>
        <div style={{
          position: 'absolute', bottom: 16, left: 18,
          transition: 'color .35s ease',
        }}>
          <Eyebrow color={h ? C.tangerine : C.dim}>{f.fig} · {f.caption}</Eyebrow>
        </div>
      </div>
    );
  };

  // ─── 08 · FAQ ──────────────────────────────────────────────
  const FAQ = () => {
    const [open, setOpen] = React.useState(-1);
    return (
      <section id="faq" data-screen-label="09 Appendix" style={{
        padding: `96px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
        <Eyebrow style={{marginBottom: 24}}>{t('sec09Eyebrow')}</Eyebrow>
        <HoverHead
          style={{maxWidth: 1000, marginBottom: 44}}
          prefix={t('sec09TitlePrefix')}
          italic={t('sec09TitleItalic')}
          suffix={t('sec09TitleSuffix')}/>

        <div style={{borderTop: `1px solid ${C.line}`}}>
          {window.AxiusFAQ.map((f, i) => (
            <FAQRow key={i} f={f} i={i}
              isOpen={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}/>
          ))}
        </div>
      </section>
    );
  };

  const FAQRow = ({ f, i, isOpen, onClick }) => {
    const [h, setH] = React.useState(false);
    const accent = C.tangerine;
    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          borderBottom: `1px solid ${C.line}`,
          background: isOpen ? `${accent}07` : (h ? C.panel : 'transparent'),
          transition: 'background .25s ease',
          position: 'relative',
        }}>
        <span style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 1, background: isOpen ? accent : 'transparent',
          transition: 'background .35s ease',
        }}/>
        <button onClick={onClick} style={{
          all: 'unset', cursor: 'pointer', width: '100%',
          display: 'grid', gridTemplateColumns: '70px 1fr 40px',
          gap: 24, padding: '18px 24px', alignItems: 'baseline',
        }}>
          <span style={{
            fontFamily: MONO, fontSize: 11, fontWeight: 500,
            color: isOpen ? accent : C.mute, letterSpacing: '0.18em',
            transition: 'color .25s ease',
          }}>Q.{String(i+1).padStart(2, '0')}</span>
          <span style={{
            fontFamily: DISPLAY, fontWeight: 500, fontSize: 19,
            color: isOpen ? C.ink : (h ? C.ink : C.dim),
            letterSpacing: '-0.02em', lineHeight: 1.3,
            transition: 'color .25s ease',
          }}>{tr(f, 'q')}</span>
          <span style={{
            fontFamily: MONO, fontSize: 18, color: isOpen ? accent : C.dim,
            textAlign: 'right', transition: 'transform .25s ease, color .25s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}>+</span>
        </button>
        {isOpen && (
          <div style={{
            display: 'grid', gridTemplateColumns: '70px 1fr 40px',
            gap: 24, padding: '0 24px 20px',
          }}>
            <span/>
            <p style={{
              margin: 0, fontSize: 15, color: C.dim, lineHeight: 1.75,
              maxWidth: 760, letterSpacing: '-0.003em',
            }}>{tr(f, 'a')}</p>
            <span/>
          </div>
        )}
      </div>
    );
  };

  // ─── 10 · CTA ──────────────────────────────────────────────
  const CTA = () => (
    <section data-screen-label="10 CTA" style={{
      position: 'relative', overflow: 'hidden',
      padding: `180px ${pad}px 80px`,
      borderTop: `1px solid ${C.line}`,
      background: C.bg, textAlign: 'center',
    }}>
      <div style={{position: 'relative', zIndex: 1}}>
        <Eyebrow color={C.mute} style={{marginBottom: 32}}>{t('ctaEyebrow')}</Eyebrow>
        <HoverHead
          accent={C.tangerine}
          italicSweep
          style={{fontSize: 128, letterSpacing: '-0.055em', lineHeight: 0.92}}
          prefix={t('ctaTitlePrefix')}
          italic={t('ctaTitleItalic')}
          suffix={t('ctaTitleSuffix')}/>

        <p style={{
          margin: '40px auto 0', maxWidth: 500,
          fontSize: 18, color: C.dim, lineHeight: 1.6,
        }}>
          {t('ctaBody')}
        </p>

        <div style={{display: 'flex', gap: 14, justifyContent: 'center', marginTop: 48}}>
          <QuietBtn primary size="lg" onClick={() => openBooking(t('bookingSubject'))}>{t('ctaSchedule')}</QuietBtn>
          <QuietBtn size="lg" multiColor onClick={() => openEmail(t('bookingSubject'))}>andres@axius.tech</QuietBtn>
        </div>

        <div style={{
          marginTop: 132, paddingTop: 28,
          borderTop: `1px solid ${C.line}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <Wordmark size={16}/>
          <div style={{
            display: 'flex', gap: 24, alignItems: 'center',
            fontFamily: MONO, fontSize: 10, color: C.mute,
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            <span>axius.tech</span>
            <span style={{color: C.faint}}>·</span>
            <span>{t('footerCity')}</span>
            <span style={{color: C.faint}}>·</span>
            <span>{t('footerCopy')}</span>
          </div>
        </div>
      </div>
    </section>
  );

  // ─── FloatingDispatch — expandable operations event log,
  // styled like the Matrix EventLog but in Quiet 0.5's palette.
  // Streams live workflow events. No timestamps (per spec).
  const FloatingDispatch = () => {
    // Collapsed by default — nothing runs until the visitor opens the
    // panel.  On first open: 4 boot events stream in (staggered), then
    // section-aware events + background pool start streaming.
    const [collapsed, setCollapsed] = React.useState(true);
    const [events, setEvents] = React.useState([]);
    // streamingActive = true once the boot sequence has finished on
    // first open.  Gates Layer 2 (section observer), Layer 3 (background
    // pool), and the idle prompt — so all of those wait for boot.
    const [streamingActive, setStreamingActive] = React.useState(false);
    const hasBootedRef = React.useRef(false);
    const scrollRef = React.useRef(null);
    const seenSectionsRef = React.useRef(new Set());
    const idleFiredRef = React.useRef(false);
    const idleTimerRef = React.useRef(null);

    const tagColor = (tag) => (
      tag === 'WARN'  ? C.amber :
      tag === 'INFO'  ? C.lavender :
      tag === 'READY' ? C.tangerine :
      tag === 'BOOT'  ? C.tangerine :
      C.mint
    );
    const push = (tag, msg) =>
      setEvents(e => [...e.slice(-60), { tag, msg, color: tagColor(tag) }]);

    // ── Layer 1: boot sequence — fires on first open, 4 events ──
    React.useEffect(() => {
      if (collapsed) return;
      if (hasBootedRef.current) return;
      hasBootedRef.current = true;
      const boot = [
        ['BOOT', 'dispatch initialized',                                     0],
        ['OK',   '129 workflows indexed',                                  400],
        ['OK',   'operator.online · altamonte springs · in medellín now',  800],
        ['OK',   'response windows active',                               1200],
      ];
      const timers = boot.map(([tag, msg, delay]) =>
        setTimeout(() => push(tag, msg), delay)
      );
      // Once the last boot event has landed, open the floodgates for
      // section events, background pool, and idle prompt.
      timers.push(setTimeout(() => setStreamingActive(true), 1700));
      return () => timers.forEach(clearTimeout);
    }, [collapsed]);

    // ── Layer 2: section-aware events — only after boot completes ─
    React.useEffect(() => {
      if (!streamingActive) return;
      const sectionMap = {
        '00 Hero':         { tag: 'INFO',  msg: 'operator.available · direct line open' },
        '01 Commitments':  { tag: 'OK',    msg: 'commitments loaded · 5 defaults active' },
        '02 The Mess':     { tag: 'INFO',  msg: 'symptom inventory · reference loaded' },
        '03 Method':       { tag: 'OK',    msg: 'stack.audit protocol loaded' },
        '04 Catalog':      { tag: 'OK',    msg: 'catalog.opened · 129 workflows indexed' },
        '05 Comparison':   { tag: 'INFO',  msg: 'comparison.review · agency vs axius' },
        '06 Pricing':      { tag: 'INFO',  msg: 'capacity calculator active' },
        '07 The Model':    { tag: 'OK',    msg: 'operating layer · 4 roles loaded' },
        '08 The Operator': { tag: 'OK',    msg: 'operator context loaded' },
        '09 Appendix':     { tag: 'OK',    msg: 'faq.opened · onboarding process' },
        '10 CTA':          { tag: 'READY', msg: 'discovery.call intake available' },
      };
      const targets = document.querySelectorAll('#stage-quiet05 [data-screen-label]');
      if (!targets.length) return;
      const seen = seenSectionsRef.current;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const label = e.target.getAttribute('data-screen-label');
          if (seen.has(label)) return;
          const ev = sectionMap[label];
          if (!ev) return;
          seen.add(label);
          push(ev.tag, ev.msg);
        });
      }, { threshold: 0.35 });
      targets.forEach(target => io.observe(target));
      return () => io.disconnect();
    }, [streamingActive]);

    // ── Idle prompt (one-shot, 35 s without any event) ───────
    React.useEffect(() => {
      if (!streamingActive) return;
      if (idleFiredRef.current) return;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (idleFiredRef.current) return;
        idleFiredRef.current = true;
        push('INFO', t('dispatchIdleHelp'));
      }, 35000);
      return () => idleTimerRef.current && clearTimeout(idleTimerRef.current);
    }, [events.length, streamingActive]);

    // ── Layer 3: background ops pool — expanded AND post-boot ───
    React.useEffect(() => {
      if (collapsed || !streamingActive) return;
      const pool = [
        ['OK',   'missed_call.recovery · lead routed'],
        ['INFO', 'monthly.report generated'],
        ['OK',   'inbox.unification · 3 channels synced'],
        ['INFO', 'proposal.sent · awaiting signature'],
        ['OK',   'crm.sync · records updated'],
        ['WARN', 'response window approaching · team tier'],
        ['INFO', 'onboarding.audit delivered'],
        ['OK',   'knowledge base updated'],
        ['INFO', 'quarterly roadmap prepared'],
        ['OK',   'config_map.json updated'],
        ['INFO', 'stack.audit · client review pending'],
        ['OK',   'sub-sow drafted · awaiting sign-off'],
        ['INFO', 'strategy call · scheduled'],
        ['OK',   'dashboard.refresh · monthly review'],
      ];
      let last = -1;
      const tick = () => {
        let i = (Math.random() * pool.length) | 0;
        if (i === last) i = (i + 1) % pool.length;
        last = i;
        push(pool[i][0], pool[i][1]);
      };
      const id = setInterval(tick, 7000 + Math.random() * 5000);
      return () => clearInterval(id);
    }, [collapsed, streamingActive]);

    React.useEffect(() => {
      if (scrollRef.current && !collapsed) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [events, collapsed]);

    return (
      <div style={{
        position: 'fixed',
        // Anchor to the stage's visual right edge — not the viewport
        // edge — so the floating dispatch panel doesn't drift hundreds
        // of pixels into the cream margin on ultrawide displays.  The
        // stage has zoom: 0.8 (max-width 1800px), so its visual width
        // caps at 1440px; the calc compensates for the centered margin
        // and divides by zoom so the visual offset stays at 20px.
        right: 'max(20px, calc(((100vw - 1440px) / 2 + 20px) / 0.8))',
        bottom: 20, zIndex: 60,
        width: collapsed ? 'auto' : 360,
        background: C.surface,
        border: `1px solid ${C.lineHi}`,
        boxShadow: '0 1px 0 rgba(10,9,7,0.04)',
        transition: 'width .3s cubic-bezier(.2,.8,.2,1)',
      }}>
        <div style={{
          padding: '10px 14px',
          borderBottom: collapsed ? 'none' : `1px solid ${C.line}`,
          background: C.panel,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 14,
        }}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
            <span style={{
              display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
              background: C.tangerine,
              animation: 'axQ05Pulse 2.4s ease-out infinite',
            }}/>
            <span style={{
              fontFamily: MONO, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: C.ink,
            }}>{t('dispatchLabel')}</span>
            {!collapsed && (
              <span style={{
                fontFamily: MONO, fontSize: 9, color: C.mute,
                letterSpacing: '0.18em', textTransform: 'uppercase',
              }}>{events.length} events</span>
            )}
          </div>
          <button onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? 'Expand dispatch' : 'Collapse dispatch'}
            style={{
              appearance: 'none', border: 'none', background: 'transparent',
              cursor: 'pointer', padding: '0 4px',
              fontFamily: MONO, fontSize: 12, color: C.tangerine,
              transition: 'color .2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = C.ink}
            onMouseLeave={(e) => e.currentTarget.style.color = C.tangerine}>
            {collapsed ? '+' : '−'}
          </button>
        </div>
        {!collapsed && (
          <div ref={scrollRef} className="ax-quiet05-scroll" style={{
            padding: '10px 14px',
            height: 200, overflowY: 'auto',
            fontFamily: MONO, fontSize: 11, lineHeight: 1.75,
            background: C.surface,
          }}>
            {events.map((e, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '52px 1fr', gap: 10,
                alignItems: 'baseline',
              }}>
                <span style={{
                  color: e.color, fontWeight: 600,
                  letterSpacing: '0.06em', fontSize: 10,
                }}>[{e.tag}]</span>
                <span style={{color: C.dim, letterSpacing: '-0.005em'}}>{e.msg}</span>
              </div>
            ))}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginTop: 6, color: C.tangerine,
            }}>
              <span style={{fontWeight: 600}}>▸</span>
              <span style={{
                display: 'inline-block', width: 7, height: 13,
                background: C.tangerine,
                animation: 'axQ05Pulse 1.1s ease-out infinite',
              }}/>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      background: C.bg, color: C.ink,
      fontFamily: DISPLAY,
      minHeight: '100vh',
    }}>
      <Nav/>
      <Hero/>
      <Commitments/>
      <Mess/>
      <Method/>
      <Catalog/>
      <Comparison/>
      <Pricing/>
      <Model/>
      <Founder/>
      <FAQ/>
      <CTA/>
      <FloatingDispatch/>
    </div>
  );
};

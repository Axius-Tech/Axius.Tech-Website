// ============================================================
// AXIUS · DIRECTION E06 — QUIET 0.6 (REFINED EDITION)
// Quiet, with adjustments per spec:
//   • Wordmark: 'axius.tech' (tech after the period)
//   • Hero: gray 'Not your tech.', vertically-centered orange
//     hover-line, 'Run your business' enlarges subtly on hover
//   • 'ONLY ACCEPTING · 3 NEW CLIENTS / MONTH' with attention pulse
//   • Italic title accents are orange and gradually glow on hover
//   • Commitments: latent dot removed; 03 locked-highlighted in
//     orange; 02 numeral yellow; 03 numeral + text orange
//   • Section descriptions right-aligned
//   • Mess: 'move' column locked-highlighted in orange; roman
//     numerals replaced with 01/02/03; 'build' italic orange
//   • Method: Audit (stage 01) locked-highlighted in orange
//   • Catalog: Sales & Prospecting pre-selected; build·time
//     caption removed from sample rows
//   • Tier names in English; EN/ES toggle in the nav rolls them
//     back to Operador/Equipo/Departamento for Spanish
//   • MVP timing in Founder Track copy: 1–3 mo Equipo · 4–6 Dept.
//   • Field Notes: one philosophical entry active, rest 'Soon'
//   • Founder contact sheet integrated inside section 07
// ============================================================

window.AxiusDirectionE06 = function () {
  // ─── Font + global animation injection ─────────────────────
  React.useEffect(() => {
    if (!document.getElementById('axius-quiet-fonts')) {
      const link = document.createElement('link');
      link.id = 'axius-quiet-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap';
      document.head.appendChild(link);
    }
    if (!document.getElementById('axius-quiet06-styles')) {
      const style = document.createElement('style');
      style.id = 'axius-quiet06-styles';
      style.textContent = `
        @keyframes axQ06Breathe {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50%      { transform: scale(1.12); opacity: 0.85; }
        }
        @keyframes axQ06Pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,186,168,0.55); }
          50%      { box-shadow: 0 0 0 6px rgba(79,186,168,0); }
        }
        @keyframes axQ06Glow {
          0%, 100% { opacity: 0.45; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.65; transform: translate(-50%, -50%) scale(1.06); }
        }
        .ax-quiet06-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,91,42,0.4) transparent; }
        .ax-quiet06-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .ax-quiet06-scroll::-webkit-scrollbar-track { background: transparent; }
        .ax-quiet06-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,91,42,0.35);
          border-radius: 0;
        }
        .ax-quiet06-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255,91,42,0.6);
        }
        /* Multi-color cycle — used on the secondary CTA on hover */
        @keyframes axQ06Rainbow {
          0%   { color: #FF5B2A; border-color: #FF5B2A; }
          16%  { color: #6F5BFF; border-color: #6F5BFF; }
          33%  { color: #4FBAA8; border-color: #4FBAA8; }
          50%  { color: #F4D26A; border-color: #F4D26A; }
          66%  { color: #FF6FA0; border-color: #FF6FA0; }
          83%  { color: #5AC0E8; border-color: #5AC0E8; }
          100% { color: #FF5B2A; border-color: #FF5B2A; }
        }
        .ax-q06-multi:hover {
          animation: axQ06Rainbow 4s linear infinite;
        }
        /* Anchored sections sit below the sticky nav (~58px) when scrolled to */
        #stage-quiet06 section[id], #stage-quiet06 header[id] { scroll-margin-top: 72px; }
        html { scroll-behavior: smooth; }
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
    const root = document.getElementById('stage-quiet06') || document;
    const el = root.querySelector('#' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Trim descriptions to ~one to two sentences for the more compact layout.
  // Cuts at the first sentence boundary after the soft cap so we never strand
  // a long trailing clause.
  const trim = (text, cap = 130) => {
    if (!text || text.length <= cap) return text;
    const after = text.slice(cap);
    const m = after.match(/[\.!?]\s/);
    if (!m) return text.slice(0, cap).trim() + '…';
    return text.slice(0, cap + m.index + 1).trim();
  };

  // ─── Language (EN default, ES toggle) ──────────────────────
  const [lang, setLang] = React.useState('en');
  // Quiet 0.6 defaults to the operator-card variant (B).  The A/B
  // chip in the nav still lets you flip back to Quiet 0.5's chat-card
  // + collage for comparison.
  const [heroStyle, setHeroStyle] = React.useState('B');

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
      navOnDuty: 'On duty',
      eyebrowPractice: 'Axius — An independent technology operations practice',
      eyebrowAccepting: 'Only Accepting · 3 New Clients / Month',
      eyebrowAcceptingPre: 'Only Accepting',
      eyebrowAcceptingAccent: '3 New Clients / Month',
      heroLine1: 'Run',
      heroLine2: 'your business.',
      heroLine3: 'Not your tech.',
      heroSubL1: 'We run the tech side of your business —',
      heroSubL2: 'websites, automations, AI tools, integrations,',
      heroSubL3a: 'all of it — for ',
      heroSubL3b: 'one monthly fee.',
      heroCta1: 'Book a discovery call',
      heroCta2: 'See the catalog',
      directLineTitle: 'Direct line.',
      directLineAvailable: 'available',
      directLineRole: 'Operator · Altamonte Springs, FL · in Medellín now',
      directLineBody1: 'Direct line to the operator doing the work.',
      directLineBody2: ' No account managers. No ticket queues.',
      directLineCta: 'Talk now',
      askAndresOpen: 'Open desk · Andrés is at the office',
      askAndresGreeting: "Hi. My AI twin is on by default — trained on our workflows, operating standards, active systems, and the way I run client operations. If you'd rather speak with me directly, hit \"Ring Andrés\" and I'll reply on call or chat within the minute.",
      askAndresPlaceholder: 'Write a quick question…',
      askAndresReplying: 'Andrés is replying…',
      askAndresWaiting: 'Andrés is checking the line',
      askAndresAiIn: 'AI twin takes over in',
      askAndresAiNow: 'Switch to AI now →',
      askAndresAiTakeover: "I'm Andrés's AI twin — trained on our workflows, operating standards, active systems, and the way he runs client operations. He'll get the transcript when he's back. Here's the answer:",
      askAndresAiBadge: 'AI twin',
      // Ring-Andrés flow (escape hatch from the default AI conversation)
      chatRingAction: 'Ring Andrés',
      chatRinging: 'Ringing Andrés on call + chat',
      chatRingMeanwhile: 'AI continues meanwhile',
      chatRingSeconds: (n) => `${n}s`,
      chatRingNoAnswer: "Sorry, tied up on a call — I'll reply here personally as soon as I'm free (usually within the day). Meanwhile my AI twin has full context and can usually answer.",
      chatRingMessageSent: 'rang andrés · transcript will reach him',
      // Operator-card variant (Hero B)
      opCardOperator:    'Operator',
      opCardOnline:      'Online',
      opCardRole:        'Operator · Medellín',
      opCardDirectLine:  'Direct line',
      opCardHours:       'Hours (MDE)',
      opCardHoursValue:  '09:00 — 18:00',
      opCardMessage:     'Message directly',
      opCardLeaveNote:   'Leave a note',
      askAndresSuggestions: [
        'Pricing?',
        'Show me the catalog',
        'How does it work?',
        'What\'s included in Team?',
        'Response times by tier?',
        'Is there a guarantee?',
        'How are you different from an agency?',
        'Can I see a workflow sample?',
      ],
      askAndresSend: 'Send ↵',
      askAndresBack: '← back',
      dispatchLabel: 'Dispatch',
      dispatchIdleHelp: 'need help? · direct line available',
      operatingLabel: 'Operating now',
      ctaSchedule: 'Schedule the conversation',
      bookingSubject: 'Axius — discovery call',
      bookingTierSubject: (t) => `Axius — ${t} tier inquiry`,
      pricingRecommended: 'Recommended',
      pricingMostChosen: 'Most chosen',
      pricingCapacity: 'capacity',
      pricingResponse: 'response',
      pricingCadence: 'cadence',
      pricingComms: 'comms',
      pricingMo: '/ mo',
      pricingSetupNote: (n) => `+ $${n.toLocaleString()} one-time setup`,
      pricingTierLabel: 'TIER',
      pricingFounderTrackLabel: 'Founder Track',
      pricingFounderTrackBody: (equipo, departamento) => (
        <>Same retention, different framing. If you're shipping a product from scratch, the same point capacity goes toward one bigger build plus the workflows around it. <strong>Builder</strong> inside {equipo} — MVP in 1–3 months. <strong>Partner</strong> inside {departamento} — substantial product in 4–6 months.</>
      ),
      pricingFounderTrackQuote: 'Building, not running.',
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
      statSetupWaived: 'Setup fees apply',
      statIntakeStatus: 'Intake status',
      statLimited: 'Limited',
      statQ2_2026: 'Q2 · 2026',
      // Hero — How we work
      howWeWorkLabel: 'How we work',
      howWeWorkBullets: ['Systems that scale', 'Freedom that lasts', 'Clarity in the chaos'],
      // Sections (eyebrows + headlines + hover descriptions)
      sec01Eyebrow:     '01 · Commitments',
      sec01TitlePrefix: 'Five things we ',
      sec01TitleItalic: 'always',
      sec01TitleSuffix: ' do.',
      sec01Desc:        'Defaults on every retainer, every tier. Not the kickoff slide.',
      sec02Eyebrow:     '02 · The mess most founders inherit',
      sec02TitleP1:     'You started this to ',
      sec02TitleBuild:  'build',
      sec02TitleP2:     ' a business, ',
      sec02TitleNot:    'not',
      sec02TitleP3:     ' maintain a stack.',
      sec02ColLabels:   ['The symptom', 'The cost', 'The move'],
      sec02ColBodies:   [
        'Five contractors. Three Slack threads. The site breaks Friday. The CRM never got wired to the calendar.',
        '"Every tool was bought with optimism." Most sit in a tab nobody opens. The work doesn\'t compound.',
        'One operator overseeing the systems and specialists behind the work. One bill. One inbox. Documented. Same hand month over month.',
      ],
      sec03Eyebrow:     '03 · Method',
      sec03TitlePrefix: 'Four ',
      sec03TitleItalic: 'stages',
      sec03TitleSuffix: <>.<br/>Each one named.<br/>Each one delivered.</>,
      sec03Desc:        'One pipeline. Four checkpoints. A written artifact you own at every stage.',
      sec03StageLabel:  'Stage',
      sec03ArtifactLabel: 'artifact',
      sec04Eyebrow:     '04 · Catalog',
      sec04TitlePrefix: 'An ',
      sec04TitleItalic: 'index',
      sec04TitleSuffix: ' of the work.',
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
      sec05Cards: [
        { name: 'Freelancer',     body: 'Specialist coverage, engaged per project. Hand-offs between providers. Knowledge resets each engagement.', price: '$3.5k – $8k',   sub: 'per month, variable' },
        { name: 'In-house hire',  body: 'Single hire, single skillset. Months to fill. Bandwidth bound to one person. Long-term commitment plus benefits.', price: '$10k – $14k', sub: 'per month + benefits' },
        { name: 'Axius',          body: 'Full stack, retained. One bill, month-to-month. Documented by default. Same hand on it month after month.',        price: 'From $1,000',  sub: 'per month · three tiers' },
      ],
      sec06Eyebrow:     '06 · Pricing',
      sec06TitlePrefix: 'Three sizes of ',
      sec06TitleItalic: 'operating',
      sec06TitleSuffix: ' layer.',
      sec06Desc:        'One team, one bill. Month-to-month after 90 days. One-time setup per tier.',
      // — Section 07: The Model —
      sec07Eyebrow:     '07 · The model',
      sec07TitlePrefix: 'Four roles, ',
      sec07TitleItalic: 'one',
      sec07TitleSuffix: ' accountable layer.',
      sec07Desc:        'YOU operate. AI keeps the lights on. Specialists bring depth. The client sees one line, one bill, one accountable layer.',
      modelPillars: [
        { eyebrow: 'Operator',    title: 'Andrés.',           bullets: ['Owns the relationship', 'Oversees the systems', 'Manages execution', 'Remains accountable'] },
        { eyebrow: 'AI',          title: 'Continuity layer.', bullets: ['Maintains continuity', 'Handles coverage', 'Preserves operational context', 'Supports response times'] },
        { eyebrow: 'Specialists', title: 'Invisible bench.',  bullets: ['Exist behind the scenes', 'Curated by the operator', 'Managed by the operator', 'Invisible to you operationally'] },
        { eyebrow: 'You',         title: 'What you see.',     bullets: ['One line', 'One operator', 'One bill', 'One system', 'One accountable layer'] },
      ],
      // — Section 08: Founder (was 07) —
      sec08Eyebrow:     '08 · The Operator',
      sec08TitlePrefix: 'The hand on ',
      sec08TitleItalic: 'your stack',
      sec08TitleSuffix: '.',
      sec08Desc:        'One operator on your stack. A vetted bench of specialists I hire and supervise. A swarm of AI agents we run internally for speed, accuracy, and cost. You hire one accountable hand — never a roster to vet.',
      sec08Quote:       '"I won\'t make you the bottleneck in your own company."',
      sec08VerifyLinkedin: 'Verify on LinkedIn',
      sec08FigCaptions: ['Operator', 'In studio', 'On the go'],
      // — Section 09: FAQ (was 08) —
      sec09Eyebrow:     '09 · Appendix',
      sec09TitlePrefix: 'Questions, ',
      sec09TitleItalic: 'asked simply',
      sec09TitleSuffix: '.',
      ctaEyebrow:       '— Begin —',
      ctaTitlePrefix:   <>Begin a<br/></>,
      ctaTitleItalic:   'conversation',
      ctaTitleSuffix:   '.',
      ctaBody:          'Thirty minutes. You leave with a one-page audit either way. No pitch, no pressure — just a clear picture of your stack.',
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
      navOnDuty: 'En oficina',
      eyebrowPractice: 'Axius — Una práctica independiente de operaciones tecnológicas',
      eyebrowAccepting: 'Solo Aceptando · 3 Clientes Nuevos / Mes',
      eyebrowAcceptingPre: 'Solo Aceptando',
      eyebrowAcceptingAccent: '3 Clientes Nuevos / Mes',
      heroLine1: 'Tú llevas',
      heroLine2: 'tu negocio.',
      heroLine3: 'No tu tech.',
      heroSubL1: 'Operamos el lado tech de tu negocio —',
      heroSubL2: 'sitios web, automatizaciones, herramientas de IA, integraciones,',
      heroSubL3a: 'todo — por ',
      heroSubL3b: 'una sola cuota mensual.',
      heroCta1: 'Agendar llamada de descubrimiento',
      heroCta2: 'Ver el catálogo',
      directLineTitle: 'Línea directa.',
      directLineAvailable: 'disponible',
      directLineRole: 'Operador · Altamonte Springs, FL · en Medellín ahora',
      directLineBody1: 'Una línea directa con quien hace el trabajo — sin gerentes de cuenta, sin filas de tickets.',
      directLineBody2: ' Pregunta lo que sea; respondo en esta ventana.',
      directLineCta: 'Hablar ahora',
      askAndresOpen: 'Escritorio abierto · Andrés está en la oficina',
      askAndresGreeting: 'Hola. Mi gemelo de IA está activo por defecto — entrenado con nuestros workflows, estándares operativos, sistemas activos y la forma en que opero a los clientes. Si prefieres hablar conmigo directamente, presiona "Llamar a Andrés" y respondo por llamada o chat dentro del minuto.',
      askAndresPlaceholder: 'Escribe una pregunta rápida…',
      askAndresReplying: 'Andrés está respondiendo…',
      askAndresWaiting: 'Andrés está revisando la línea',
      askAndresAiIn: 'La IA toma el control en',
      askAndresAiNow: 'Cambiar a IA ahora →',
      askAndresAiTakeover: 'Soy el gemelo de IA de Andrés — entrenado con nuestros workflows, estándares operativos, sistemas activos y la forma en que él opera a los clientes. Le pasaré la transcripción cuando vuelva. Esta es la respuesta:',
      askAndresAiBadge: 'gemelo IA',
      // Flujo "Llamar a Andrés" (escape humano del chat con IA por defecto)
      chatRingAction: 'Llamar a Andrés',
      chatRinging: 'Llamando a Andrés por llamada + chat',
      chatRingMeanwhile: 'La IA continúa mientras tanto',
      chatRingSeconds: (n) => `${n}s`,
      chatRingNoAnswer: 'Perdón, estoy en una llamada — te respondo aquí personalmente apenas me libere (normalmente dentro del día). Mientras tanto mi gemelo de IA tiene contexto completo y suele tener la respuesta.',
      chatRingMessageSent: 'llamada enviada a andrés · le llega la transcripción',
      // Variante Operator Card (Hero B)
      opCardOperator:    'Operador',
      opCardOnline:      'En línea',
      opCardRole:        'Operador · Medellín',
      opCardDirectLine:  'Línea directa',
      opCardHours:       'Horario (MDE)',
      opCardHoursValue:  '09:00 — 18:00',
      opCardMessage:     'Enviar mensaje',
      opCardLeaveNote:   'Dejar una nota',
      askAndresSuggestions: [
        '¿Precios?',
        'Muéstrame el catálogo',
        '¿Cómo funciona?',
        '¿Qué incluye el tier Equipo?',
        '¿Tiempos de respuesta por tier?',
        '¿Hay garantía?',
        '¿En qué se diferencian de una agencia?',
        '¿Me enseñas un workflow de muestra?',
      ],
      askAndresSend: 'Enviar ↵',
      askAndresBack: '← volver',
      dispatchLabel: 'Despacho',
      dispatchIdleHelp: '¿necesitas ayuda? · línea directa disponible',
      operatingLabel: 'Operando ahora',
      ctaSchedule: 'Agendar la conversación',
      bookingSubject: 'Axius — llamada de descubrimiento',
      bookingTierSubject: (t) => `Axius — consulta tier ${t}`,
      pricingRecommended: 'Recomendado',
      pricingMostChosen: 'el más elegido',
      pricingCapacity: 'capacidad',
      pricingResponse: 'respuesta',
      pricingCadence: 'cadencia',
      pricingComms: 'comunicación',
      pricingMo: '/ mes',
      pricingSetupNote: (n) => `+ $${n.toLocaleString()} setup único`,
      pricingTierLabel: 'TIER',
      pricingFounderTrackLabel: 'Founder Track',
      pricingFounderTrackBody: (equipo, departamento) => (
        <>Misma retención, distinto encuadre. Si estás construyendo un producto desde cero, la misma capacidad de puntos va a un build más grande más los workflows que lo rodean. <strong>Builder</strong> dentro de {equipo} — MVP en 1–3 meses. <strong>Partner</strong> dentro de {departamento} — producto sustancial en 4–6 meses.</>
      ),
      pricingFounderTrackQuote: 'Construyendo, no operando.',
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
      statSetupWaived: 'Aplica setup',
      statIntakeStatus: 'Estado de admisión',
      statLimited: 'Limitado',
      statQ2_2026: 'T2 · 2026',
      // Hero — How we work
      howWeWorkLabel: 'Cómo trabajamos',
      howWeWorkBullets: ['Sistemas que escalan', 'Libertad que dura', 'Claridad en el caos'],
      // Sections
      sec01Eyebrow:     '01 · Compromisos',
      sec01TitlePrefix: 'Cinco cosas que ',
      sec01TitleItalic: 'siempre',
      sec01TitleSuffix: ' hacemos.',
      sec01Desc:        'Por defecto en cada retainer, cada tier. No la slide de arranque.',
      sec02Eyebrow:     '02 · El caos que la mayoría de fundadores heredan',
      sec02TitleP1:     'Empezaste esto para ',
      sec02TitleBuild:  'construir',
      sec02TitleP2:     ' un negocio, ',
      sec02TitleNot:    'no',
      sec02TitleP3:     ' mantener un stack.',
      sec02ColLabels:   ['El síntoma', 'El costo', 'La jugada'],
      sec02ColBodies:   [
        'Cinco contratistas. Tres hilos de Slack. El sitio se cae el viernes. El CRM nunca se conectó al calendario.',
        '"Cada herramienta se compró con optimismo." La mayoría vive en una pestaña que nadie abre. El trabajo no se acumula.',
        'Un operador supervisando los sistemas y especialistas detrás del trabajo. Una factura. Una bandeja. Documentado. La misma mano mes tras mes.',
      ],
      sec03Eyebrow:     '03 · Método',
      sec03TitlePrefix: 'Cuatro ',
      sec03TitleItalic: 'etapas',
      sec03TitleSuffix: <>.<br/>Cada una nombrada.<br/>Cada una entregada.</>,
      sec03Desc:        'Una pipeline. Cuatro checkpoints. Un artefacto escrito tuyo en cada etapa.',
      sec03StageLabel:  'Etapa',
      sec03ArtifactLabel: 'artefacto',
      sec04Eyebrow:     '04 · Catálogo',
      sec04TitlePrefix: 'Un ',
      sec04TitleItalic: 'índice',
      sec04TitleSuffix: ' del trabajo.',
      sec04WorkflowsLabel:   'workflows',
      sec04CategoriesLabel:  'categorías',
      sec04SampleEntries:    'entradas de muestra',
      sec04ScrollMore:       'desplaza para ver más',
      sec04MoreOnRequest:    (n) => `${n} más a petición`,
      sec04RequestFullIndex: 'Solicitar el índice completo →',
      sec04CatLabel:         'CAT',
      sec05Eyebrow:     '05 · Comparativa',
      sec05TitlePrefix: 'Otra ',
      sec05TitleItalic: 'forma',
      sec05TitleSuffix: ' de ayuda.',
      sec05OptionLabel: 'Opción',
      sec05Cards: [
        { name: 'Freelancer',            body: 'Cobertura especializada, contratada por proyecto. Traspasos entre proveedores. El conocimiento se reinicia cada vez.', price: '$3.5k – $8k',   sub: 'al mes, variable' },
        { name: 'Contratación interna',  body: 'Una contratación, un set de habilidades. Meses para llenarla. Capacidad limitada a una persona. Compromiso largo plazo más beneficios.', price: '$10k – $14k', sub: 'al mes + beneficios' },
        { name: 'Axius',                 body: 'Stack completo, retenido. Una factura, mes a mes. Documentado por defecto. La misma mano, mes tras mes.',                price: 'Desde $1,000', sub: 'al mes · tres tiers' },
      ],
      sec06Eyebrow:     '06 · Precios',
      sec06TitlePrefix: 'Tres tamaños de capa ',
      sec06TitleItalic: 'operativa',
      sec06TitleSuffix: '.',
      sec06Desc:        'Un equipo, una factura. Mes a mes después de 90 días. Setup único por tier.',
      // — Sección 07: El Modelo —
      sec07Eyebrow:     '07 · El modelo',
      sec07TitlePrefix: 'Cuatro roles, ',
      sec07TitleItalic: 'una',
      sec07TitleSuffix: ' sola capa responsable.',
      sec07Desc:        'TÚ operas. La IA mantiene la continuidad. Los especialistas aportan profundidad. El cliente ve una línea, una factura, una sola capa responsable.',
      modelPillars: [
        { eyebrow: 'Operador',     title: 'Andrés.',              bullets: ['Posee la relación', 'Supervisa los sistemas', 'Gestiona la ejecución', 'Mantiene la responsabilidad'] },
        { eyebrow: 'IA',           title: 'Capa de continuidad.', bullets: ['Mantiene continuidad', 'Maneja cobertura', 'Preserva contexto operacional', 'Apoya tiempos de respuesta'] },
        { eyebrow: 'Especialistas',title: 'Banco invisible.',     bullets: ['Existen tras bastidores', 'Curados por el operador', 'Gestionados por el operador', 'Invisibles operacionalmente para ti'] },
        { eyebrow: 'Tú',           title: 'Lo que ves.',          bullets: ['Una línea', 'Un operador', 'Una factura', 'Un sistema', 'Una sola capa responsable'] },
      ],
      // — Sección 08: Fundador (era 07) —
      sec08Eyebrow:     '08 · El Operador',
      sec08TitlePrefix: 'La mano sobre ',
      sec08TitleItalic: 'tu stack',
      sec08TitleSuffix: '.',
      sec08Desc:        'Un operador sobre tu stack. Un banco de especialistas verificados que contrato y superviso. Un enjambre de agentes de IA que corremos internamente para velocidad, precisión y costo. Contratas una sola mano — nunca una lista que verificar.',
      sec08Quote:       '"No te haré el cuello de botella de tu propia empresa."',
      sec08VerifyLinkedin: 'Verificar en LinkedIn',
      sec08FigCaptions: ['Operador', 'En estudio', 'En movimiento'],
      // — Sección 09: FAQ (era 08) —
      sec09Eyebrow:     '09 · Apéndice',
      sec09TitlePrefix: 'Preguntas, ',
      sec09TitleItalic: 'simplemente',
      sec09TitleSuffix: '.',
      ctaEyebrow:       '— Empezar —',
      ctaTitlePrefix:   <>Comencemos una<br/></>,
      ctaTitleItalic:   'conversación',
      ctaTitleSuffix:   '.',
      ctaBody:          'Treinta minutos. Te llevas un audit de una página, en cualquier caso. Sin pitch, sin presión — solo una imagen clara de tu stack.',
      footerCity:       'altamonte springs, fl · remoto · en medellín ahora',
      footerCopy:       '© 2026',
      chatBack:         'Volver',
      chatOpen:         'abierto',
      chatDirectLine:   'línea directa',
      chatAskAndres:    'Pregunta a Andrés.',
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

  // ─── Operating Now — fades through real workflow names ─────
  const OperatingNow = ({ style = {}, compact }) => {
    const all = React.useMemo(() => (
      window.AxiusCatalog.flatMap(c => c.samples.map(s => ({ name: s.name, cat: c.name })))
    ), []);
    const [i, setI] = React.useState(0);
    const [fade, setFade] = React.useState(true);
    React.useEffect(() => {
      const id = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setI(prev => (prev + 1) % all.length);
          setFade(true);
        }, 280);
      }, 3200);
      return () => clearInterval(id);
    }, [all.length]);
    const item = all[i];
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: compact ? 8 : 14,
        padding: compact ? 0 : '10px 16px',
        background: compact ? 'transparent' : C.surface,
        border: compact ? 'none' : `1px solid ${C.line}`,
        fontFamily: MONO, fontSize: 11, letterSpacing: '0.04em',
        color: C.dim, ...style,
      }}>
        {!compact && (
          <span style={{
            display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
            background: C.mint,
            animation: 'axQ06Pulse 2.4s ease-out infinite',
          }}/>
        )}
        {!compact && (
          <span style={{
            fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: C.mute,
          }}>{t('operatingLabel')}</span>
        )}
        <span style={{
          opacity: fade ? 1 : 0,
          transition: 'opacity .28s ease',
          color: C.ink, fontWeight: 500,
          textTransform: 'none', letterSpacing: '-0.005em',
          fontFamily: DISPLAY, fontSize: compact ? 12 : 11,
          maxWidth: compact ? 220 : 'none',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{item.name}</span>
        <span style={{color: C.faint, fontFamily: MONO}}>·</span>
        <span style={{
          opacity: fade ? 1 : 0,
          transition: 'opacity .28s ease',
          color: C.mute, textTransform: 'uppercase',
          letterSpacing: '0.16em', fontSize: compact ? 9 : 10,
          maxWidth: compact ? 130 : 'none',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{item.cat}</span>
      </div>
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
  const HoverHead = ({ style = {}, prefix, italic, suffix, italicStyle = {} }) => {
    const [h, setH] = React.useState(false);
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
        <span style={{
          display: 'inline-block',
          transformOrigin: '0% 50%',
          transform: h ? 'scale(1.035)' : 'scale(1)',
          transition: 'transform .55s cubic-bezier(.2,.8,.2,1)',
        }}>
          {prefix}
          <span style={{
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
            color: C.tangerine,
            ...italicStyle,
          }}>{italic}</span>
          {suffix}
        </span>
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
        className={multiColor ? 'ax-q06-multi' : undefined}
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
  // QuietCard (Quiet 0.6) — no lift, no border-color swap on hover.
  // Hairline border at rest; tangerine top accent strip whenever the
  // card is locked or hovered.  Cleaner spec-sheet feel.
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
          border: `1px solid ${C.lineHi}`,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'background .35s ease, color .35s ease',
          ...style,
        }}>
        {/* Accent strip — exact catalog grammar: 2 px tall, overlaps
            the 1 px border on top + both sides (top: -1, left: -1,
            calc(100% + 2px)) for harmony across every "active surface"
            on the page. */}
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
          <LiveClock/>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: MONO, fontSize: 10, color: C.dim,
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            <span style={{
              display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
              background: C.mint,
              animation: 'axQ06Pulse 2.4s ease-out infinite',
            }}/>
            {t('navOnDuty')}
          </span>
          {/* Hero layout A/B toggle — A = chat-card + collage, B = operator
              card + workflow sheet.  Same chip grammar as EN/ES so it
              reads as a sibling control. */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 0,
            fontFamily: MONO, fontSize: 10, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            border: `1px solid ${C.lineHi}`,
          }}>
            {['A', 'B'].map((code, i) => (
              <button key={code} onClick={() => setHeroStyle(code)} type="button" style={{
                appearance: 'none', border: 'none', cursor: 'pointer',
                padding: '5px 9px',
                background: heroStyle === code ? C.ink : 'transparent',
                color: heroStyle === code ? C.bg : C.dim,
                fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
                letterSpacing: 'inherit', textTransform: 'inherit',
                borderLeft: i === 1 ? `1px solid ${C.lineHi}` : 'none',
                transition: 'all .25s ease',
              }}>{code}</button>
            ))}
          </span>
          {/* EN / ES language toggle — switches the tier names + the
              MVP timing copy. Keeps the rest of the page in English. */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 0,
            fontFamily: MONO, fontSize: 10, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            border: `1px solid ${C.lineHi}`,
          }}>
            {['en', 'es'].map((code, i) => (
              <button key={code} onClick={() => setLang(code)} type="button" style={{
                appearance: 'none', border: 'none', cursor: 'pointer',
                padding: '5px 9px',
                background: lang === code ? C.tangerine : 'transparent',
                color: lang === code ? '#FFFFFF' : C.dim,
                fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
                letterSpacing: 'inherit', textTransform: 'inherit',
                borderLeft: i === 1 ? `1px solid ${C.lineHi}` : 'none',
                transition: 'all .25s ease',
              }}>{code}</button>
            ))}
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
  const AskAndres = ({ onBack, autofocus }) => {
    const initial = [
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
    const [hasRung, setHasRung] = React.useState(false);
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

    const responsesByLang = {
      en: {
        greet: "Welcome. Ask me anything about how Axius operates — I won't invent.",
        pricing: "Three editions:\n\n  $1,000 / mo · Operator   · 2 pts  · 72h\n  $2,500 / mo · Team       · 5 pts  · 48h  (most chosen)\n  $5,000 / mo · Department · 10 pts · 24h\n\nMonth-to-month after 90 days. One-time setup per tier.",
        catalog: "129 workflows across 9 categories — Sales, CX, Operations, AI, Data, Web, Software, Marketing, Content. Ask me for a sample from any category and I'll quote it.",
        founder: "I'm Andrés Toro — ten years inside operations at startups and SMBs across the US and Latin America. Based in Medellín, available on US business hours, EN/ES.",
        method: "Four stages:\n\n  I  · Audit       (Days 1–7)   → stack_audit.pdf\n  II · Configure  (Days 8–14)  → config_map.json\n  III · Operate   (Month 1+)   → monthly_report.md\n  IV · Evolve     (Quarterly)  → roadmap.notion",
        contact: "Write to andres@axius.tech, or use the schedule button at the top. Response windows by tier: 24h (Department), 48h (Team), 72h (Operator).",
        guarantee: "First-month outcome guarantee on Team and Department. We agree to a quick win at kickoff. If we don't ship it in thirty days, that month is on us.",
        team: "Team — $2,500/mo · 5 pts · 48h response · biweekly cadence · Discord + email. Most chosen tier. First-month outcome guarantee. Includes the Builder track for product-shipping engagements (MVP 1–3 months).",
        response: "Guaranteed response windows by tier.\n\n  72h · Operator\n  48h · Team\n  24h · Department\n\nBusiness hours (US, MDE timezone).",
        vsAgency: "An agency rents you account managers, ticket queues and slide decks. Axius is one operator — me — owning the stack month over month. One bill, one inbox, one accountable hand. The work compounds.",
        sample: "Sample workflows by category — try Sales (cold outreach · smartlead), CX (live-chat handoff · context packet), Ops (Stripe webhook router), AI (voice-agent qualification), Data (pipeline reporting). Ask me for any category for the full sample list.",
        default: "I track a narrow domain: pricing, catalog, methodology, founder, guarantees, contact. Try 'pricing', 'catalog', or 'how does it work'.",
      },
      es: {
        greet: "Bienvenido. Pregúntame lo que sea sobre cómo opera Axius — no invento.",
        pricing: "Tres ediciones:\n\n  $1,000 / mes · Operador     · 2 pts  · 72h\n  $2,500 / mes · Equipo       · 5 pts  · 48h  (el más elegido)\n  $5,000 / mes · Departamento · 10 pts · 24h\n\nMes a mes después de 90 días. Setup único por tier.",
        catalog: "129 workflows en 9 categorías — Ventas, CX, Operaciones, IA, Datos, Web, Software, Marketing, Contenido. Pídeme una muestra de cualquier categoría y te la cuento.",
        founder: "Soy Andrés Toro — diez años dentro de operaciones en startups y PyMEs de EE.UU. y América Latina. Basado en Medellín, disponible en horario laboral de EE.UU., EN/ES.",
        method: "Cuatro etapas:\n\n  I  · Auditoría   (Días 1–7)   → stack_audit.pdf\n  II · Configurar (Días 8–14)  → config_map.json\n  III · Operar    (Mes 1+)     → monthly_report.md\n  IV · Evolucionar (Trimestral) → roadmap.notion",
        contact: "Escribe a andres@axius.tech, o usa el botón de agendar arriba. Ventanas de respuesta por tier: 24h (Departamento), 48h (Equipo), 72h (Operador).",
        guarantee: "Garantía de resultado el primer mes en Equipo y Departamento. Acordamos una victoria rápida al arrancar. Si no la entregamos en 30 días, ese mes va por nuestra cuenta.",
        team: "Equipo — $2,500/mes · 5 pts · respuesta 48h · cadencia quincenal · Discord + email. El tier más elegido. Garantía de resultado el primer mes. Incluye el Builder track para engagements de producto (MVP en 1–3 meses).",
        response: "Ventanas de respuesta garantizadas por tier.\n\n  72h · Operador\n  48h · Equipo\n  24h · Departamento\n\nHorario laboral (EE.UU., zona MDE).",
        vsAgency: "Una agencia te renta gerentes de cuenta, filas de tickets y mazos de slides. Axius es un solo operador — yo — operando el stack mes tras mes. Una factura, una bandeja, una mano responsable. El trabajo se acumula.",
        sample: "Workflows de muestra por categoría — prueba Ventas (cold outreach · smartlead), CX (handoff de chat en vivo · paquete de contexto), Ops (router de webhooks de Stripe), IA (calificación de voice agent), Datos (reportería de pipeline). Pídeme cualquier categoría para la lista completa.",
        default: "Manejo un dominio acotado: precios, catálogo, metodología, fundador, garantías, contacto. Prueba 'precios', 'catálogo' o '¿cómo funciona?'.",
      },
    };
    const responses = responsesByLang[lang] || responsesByLang.en;

    const match = (q) => {
      const s = q.toLowerCase();
      if (/^\s*(hi|hello|hey|hola)/.test(s)) return responses.greet;
      if (/team|equipo/.test(s) && /(tier|incl|what)/.test(s)) return responses.team;
      if (/response|tiempo|cu[áa]nto.+tarda|how.+fast|24h|48h|72h/.test(s)) return responses.response;
      if (/agency|agencia|different|diferen/.test(s)) return responses.vsAgency;
      if (/sample|workflow|muestra|ejemplo/.test(s)) return responses.sample;
      if (/pric|cost|tier|fee|month|how much|precio|cu[áa]nto/.test(s)) return responses.pricing;
      if (/catalog|workflow|index|what.+do|cat[áa]logo/.test(s)) return responses.catalog;
      if (/founder|andr[eé]s|operator|who|qui[ée]n/.test(s)) return responses.founder;
      if (/method|stage|process|how.+work|onboard|m[ée]todo|funciona/.test(s)) return responses.method;
      if (/contact|reach|email|book|schedule|contact|agenda/.test(s)) return responses.contact;
      if (/guarantee|refund|risk|garant[ií]a/.test(s)) return responses.guarantee;
      return responses.default;
    };

    // Stream a reply character-by-character.  `ai === true` tags the
    // resulting message as coming from the AI twin (used for styling
    // the "AI." gutter mark + lavender accent on the message).
    const streamReply = (reply, ai) => {
      const role = ai ? 'bot-ai' : 'bot';
      setStreamingRole(role);
      setStreaming('');
      let i = 0;
      const speed = Math.max(10, Math.min(22, 1100 / reply.length));
      const id = setInterval(() => {
        i += 2;
        if (i >= reply.length) {
          clearInterval(id);
          setMessages(m => [...m, { role, text: reply }]);
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

      if (behavior === 'whatsapp' && wa) {
        const intro = `Hi Andrés — I'm on axius.tech and would like to speak with you directly.`;
        const body = recent ? `${intro}\n\nRecent questions:\n${recent}` : intro;
        window.open(`https://wa.me/${wa}?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
        setHasRung(true);
        setMessages(m => [...m, { role: 'sys-ring', text: t('chatRingMessageSent') }]);
        return;
      }

      setHasRung(true);
      setMessages(m => [...m, { role: 'sys-ring', text: t('chatRingMessageSent') }]);
      setRingSeconds(60);
      if (webhook) {
        try {
          const page = typeof location !== 'undefined' ? location.href : '';
          const messageText =
            `🔔 Ring from axius.tech\n\n` +
            (recent ? `Recent questions:\n${recent}\n\n` : '') +
            `Full transcript:\n${transcript || '(no transcript)'}\n\n` +
            `Page: ${page}\nTime: ${new Date().toISOString()}`;
          let body;
          if (/api\.telegram\.org\/bot/.test(webhook)) {
            const chatId = (cfg.ringWebhookChatId || '').toString();
            body = JSON.stringify({
              chat_id: chatId,
              text: messageText,
              parse_mode: 'Markdown',
              disable_web_page_preview: true,
            });
          } else if (/discord\.com\/api\/webhooks\//.test(webhook)) {
            body = JSON.stringify({ content: messageText });
          } else {
            body = JSON.stringify({
              source: 'axius.tech',
              event: 'ring_andres',
              timestamp: new Date().toISOString(),
              page,
              recent_questions: recent,
              transcript,
            });
          }
          fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
            mode: 'cors',
            keepalive: true,
          }).catch(() => {});
        } catch (_) {}
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

    const ask = (q) => {
      const text = (q || '').trim();
      if (!text || streaming !== null) return;
      setMessages(m => [...m, { role: 'user', text }]);
      setInput('');
      // AI handles every message immediately; ringing the human is a
      // parallel action and does not block the conversation.
      streamReply(match(text), true);
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
        {/* Chat header in Quiet 0.6 matches the OperatorCard header padding
            (14px 22px) so the visual jump from card → chat reads as one
            continuous surface, not two different panels. */}
        <div style={{
          padding: '14px 22px',
          borderBottom: `1px solid ${C.line}`,
          background: C.panel,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 14}}>
            {onBack && (
              <button type="button" onClick={onBack}
                aria-label="Back to direct line"
                style={{
                  appearance: 'none', cursor: 'pointer',
                  background: C.ink,
                  border: `1px solid ${C.ink}`,
                  fontFamily: MONO, fontSize: 10, fontWeight: 500,
                  color: C.bg,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  padding: '6px 10px',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
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
                <span aria-hidden style={{fontSize: 12, lineHeight: 1, marginTop: -1}}>←</span>
                <span>{t('chatBack')}</span>
              </button>
            )}
            {/* Quiet 0.6 chat header — operator-card grammar: tangerine
                OPERATOR eyebrow on the left, mint pulse + ONLINE eyebrow
                on the right, no serif italic. */}
            <Eyebrow color={C.tangerine}>{t('opCardOperator')}</Eyebrow>
            <Eyebrow color={C.mute}>{t('chatDirectLine')}</Eyebrow>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: MONO, fontSize: 10, color: C.dim,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            <span style={{
              display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
              background: C.mint,
              animation: 'axQ06Pulse 2.4s ease-out infinite',
            }}/>
            {t('opCardOnline')}
          </span>
        </div>

        <div ref={scrollRef} className="ax-quiet06-scroll" style={{
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
                  animation: 'axQ06Pulse 2.4s ease-out infinite',
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

        {/* Suggestions are a single horizontal row with overflow scroll so
            the new (longer) set of chips never pushes the form input out
            of the fixed 380 px card height. */}
        <div className="ax-quiet06-scroll" style={{
          padding: '7px 14px', borderTop: `1px solid ${C.line}`,
          display: 'flex', gap: 6, background: C.bg,
          overflowX: 'auto', overflowY: 'hidden',
          scrollbarWidth: 'thin',
          flexShrink: 0,
          minWidth: 0, width: '100%', boxSizing: 'border-box',
        }}>
          {/* Ring Andrés — first chip, primary tangerine treatment so
              it reads as the escalation path out of the AI conversation. */}
          {/* Ring Andrés + suggestion chips both styled to match the
              OperatorCard CTA proportions: mono uppercase 11px,
              padding 12px 18px (matches MESSAGE DIRECTLY / LEAVE A NOTE
              buttons). */}
          <button type="button" onClick={startRing}
            disabled={ringSeconds !== null || hasRung}
            style={{
              appearance: 'none',
              border: `1px solid ${(ringSeconds !== null || hasRung) ? C.lineHi : C.tangerine}`,
              background: (ringSeconds !== null || hasRung) ? 'transparent' : C.tangerine,
              padding: '10px 14px',
              cursor: (ringSeconds !== null || hasRung) ? 'not-allowed' : 'pointer',
              fontFamily: MONO, fontSize: 11, fontWeight: 500,
              color: (ringSeconds !== null || hasRung) ? C.mute : '#FFFFFF',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              transition: 'all .2s ease',
              whiteSpace: 'nowrap', flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
            <span aria-hidden style={{
              display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: (ringSeconds !== null || hasRung) ? C.mute : '#FFFFFF',
              animation: ringSeconds !== null ? 'axQ06Pulse 1.2s ease-out infinite' : 'none',
            }}/>
            {t('chatRingAction')}
          </button>
          {suggestions.map(s => (
            <button key={s} type="button" onClick={() => ask(s)} style={{
              appearance: 'none', border: `1px solid ${C.lineHi}`, background: C.surface,
              padding: '10px 14px', cursor: 'pointer',
              fontFamily: MONO, fontSize: 11, fontWeight: 500, color: C.ink,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              transition: 'all .2s ease',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.tangerine; e.currentTarget.style.color = C.tangerine; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.lineHi; e.currentTarget.style.color = C.ink; }}>
              {s}
            </button>
          ))}
        </div>

        {/* Catalog-dimension tangerine slide just above the type bar
            (2 px tall, full chat width).  Same accent grammar as the
            catalog/commitments card strips. */}
        <span aria-hidden style={{
          display: 'block', height: 2, width: '100%',
          background: C.tangerine,
          flexShrink: 0,
        }}/>
        <form onSubmit={(e) => { e.preventDefault(); ask(input); }} style={{
          padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 8,
          background: C.bg,
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: MONO, fontWeight: 600, fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: C.tangerine,
          }}>›</span>
          <input ref={inputRef} value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              streaming !== null ? t('askAndresReplying') :
              t('askAndresPlaceholder')
            }
            disabled={streaming !== null}
            style={{
              flex: 1, appearance: 'none', border: 'none', outline: 'none', background: 'transparent',
              fontFamily: DISPLAY, color: C.ink, fontSize: 13, letterSpacing: '-0.005em',
              padding: 2,
            }}/>
          <button type="submit"
            disabled={streaming !== null || !input.trim()}
            style={{
              appearance: 'none',
              border: `1px solid ${input.trim() && streaming === null ? C.tangerine : C.line}`,
              color: input.trim() && streaming === null ? C.tangerine : C.faint,
              background: 'transparent',
              cursor: input.trim() && streaming === null ? 'pointer' : 'not-allowed',
              padding: '5px 9px',
              fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              fontWeight: 600,
            }}>{t('askAndresSend')}</button>
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
    if (m.role === 'sys-ai') return (
      <div style={{
        padding: '8px 10px',
        background: C.panel,
        borderLeft: `2px solid ${C.lavender}`,
        fontFamily: DISPLAY, fontSize: 12, color: C.dim, lineHeight: 1.55,
      }}>
        <span style={{
          display: 'inline-block', marginRight: 8,
          padding: '2px 6px',
          background: C.lavender, color: '#FFFFFF',
          fontFamily: MONO, fontSize: 8, fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          verticalAlign: 'middle',
        }}>{t('askAndresAiBadge')}</span>
        {m.text}
      </div>
    );
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
    const isAi = m.role === 'bot-ai';
    return (
      <div style={{display: 'flex', gap: 10, alignItems: 'flex-start'}}>
        {/* Gutter mark in mono uppercase to match the OperatorCard
            label grammar (OPERATOR / ONLINE / DIRECT LINE / HOURS). */}
        <span style={{
          fontFamily: MONO, fontWeight: 600, fontSize: 9,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: isAi ? C.lavender : C.tangerine,
          flexShrink: 0, lineHeight: 1, paddingTop: 4,
          minWidth: 22,
        }}>{isAi ? 'AI' : 'A'}</span>
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
          <pattern id="axQ06gridA" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M12 0H0V12" stroke="rgba(10,9,7,0.12)" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="196" height="256" fill="url(#axQ06gridA)"/>
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
          <pattern id="axQ06vgrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0V10" stroke="rgba(10,9,7,0.10)" strokeWidth="0.4" fill="none"/>
          </pattern>
        </defs>
        <rect width="216" height="196" fill="url(#axQ06vgrid)"/>
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
          <pattern id="axQ06wkSheet" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" stroke="rgba(10,9,7,0.07)" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="260" height="360" fill="url(#axQ06wkSheet)"/>

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
    // Message directly: opens the in-page AskAndres chat by default
    // so the visitor stays on the site.  Only opens wa.me if
    // AxiusConfig.ringBehavior === 'whatsapp' (legacy redirect path).
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
          <AskAndres onBack={() => setMode('card')} autofocus/>
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
                  animation: 'axQ06Pulse 2.4s ease-out infinite',
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
                  cursor: 'crosshair',
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
                animation: 'axQ06Pulse 2.4s ease-out infinite',
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
                animation: 'axQ06Pulse 2.4s ease-out infinite',
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
      <header ref={heroRef} data-screen-label="00 Hero" style={{
        position: 'relative', overflow: 'hidden',
        padding: `104px ${pad}px 108px`,
      }}>
        {/* breathing warm-light orb — subtle ambient that leans with the cursor */}
        <div aria-hidden style={{
          position: 'absolute', top: '40%', right: '8%',
          width: 460, height: 460, borderRadius: '50%',
          background: `radial-gradient(closest-side, rgba(255,91,42,0.20), rgba(255,91,42,0) 70%)`,
          animation: 'axQ06Glow 9s ease-in-out infinite',
          transform: `translate(${orbX}px, ${orbY}px)`,
          transition: 'transform 1.2s cubic-bezier(.2,.8,.2,1)',
          pointerEvents: 'none', zIndex: 0,
          willChange: 'transform',
        }}/>

        {/* paper-grain texture — tactile warmth */}
        <svg aria-hidden width="0" height="0" style={{position: 'absolute'}}>
          <filter id="axQ06Grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.92" numOctaves="2" stitchTiles="stitch"/>
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"/>
          </filter>
        </svg>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          filter: 'url(#axQ06Grain)',
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
              {t('heroSubL2')}<br/>
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
            { v: t('statStartsValue'), k: t('statStartsAt'),       sub: t('statSetupWaived'),accent: C.amber     },
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
    const accents = [C.mint, C.amber, C.tangerine, C.lavender, C.mint];
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
            const isLocked = i === 2; // tile 03 stays highlighted
            const numeralColor = isLocked ? C.tangerine : C.ink;
            const titleColor = C.ink;
            return (
              <QuietCard key={c.n}
                accent={accents[i]} padding={28} locked={isLocked}
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
            { n: '03', label: t('sec02ColLabels')[2], accent: C.tangerine, locked: true,
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

  // ─── 03 · METHOD (Quiet 0.6) — horizontal pipeline echoing the
  // WorkflowSheet from the hero.  4 stage boxes connected by hairline
  // connectors; AUDIT highlighted in tangerine.  Each box carries
  // mono uppercase stage label + timing, italic-serif name, body,
  // and the artifact filename below.
  const Method = () => {
    const [headH, setHeadH] = React.useState(false);
    const stages = window.AxiusMethodology;
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

        {/* Pipeline — bordered surface containing 4 stage boxes joined
            by a hairline.  AUDIT (stage 00) is tangerine-bordered. */}
        <div style={{
          background: C.surface,
          border: `1px solid ${C.lineHi}`,
          padding: '36px 32px 32px',
        }}>
          <div style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `repeat(${stages.length}, 1fr)`,
            gap: 0,
          }}>
            {/* connector line behind the boxes */}
            <span aria-hidden style={{
              position: 'absolute',
              top: 22, left: '12.5%', right: '12.5%',
              height: 1, background: C.lineHi,
              zIndex: 0,
            }}/>
            {stages.map((m, i) => {
              const locked = i === 0;
              return (
                <div key={m.n} style={{
                  position: 'relative', zIndex: 1,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '0 12px',
                }}>
                  {/* Stage box */}
                  <div style={{
                    width: 88, height: 44,
                    border: `1.5px solid ${locked ? C.tangerine : C.ink}`,
                    background: C.surface,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: MONO, fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: locked ? C.tangerine : C.ink,
                  }}>{tr(m, 'name')}</div>

                  {/* Stage label + timing */}
                  <div style={{marginTop: 22, textAlign: 'center'}}>
                    <Eyebrow color={locked ? C.tangerine : C.mute}>
                      {t('sec03StageLabel')} {m.n}
                    </Eyebrow>
                    <div style={{
                      marginTop: 6,
                      fontFamily: MONO, fontSize: 11,
                      color: C.dim, letterSpacing: '0.04em',
                    }}>{tr(m, 'timing')}</div>
                  </div>

                  {/* Body */}
                  <p style={{
                    margin: '18px 0 0', textAlign: 'center',
                    fontSize: 13, color: C.dim, lineHeight: 1.65,
                    letterSpacing: '-0.003em', whiteSpace: 'pre-line',
                    maxWidth: 220,
                  }}>{tr(m, 'body')}</p>

                  {/* Artifact filename — italic serif annotation */}
                  <div style={{
                    marginTop: 18, paddingTop: 14,
                    borderTop: `1px solid ${C.line}`,
                    width: '100%', textAlign: 'center',
                  }}>
                    <span style={{
                      fontFamily: SERIF, fontStyle: 'italic',
                      fontSize: 14, color: locked ? C.tangerine : C.dim,
                      letterSpacing: '-0.005em',
                    }}>{m.artifact}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

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
  const Catalog = () => {
    const accents = [C.tangerine, C.mint, C.amber, C.lavender, C.sky, C.pink, C.mint, C.tangerine, C.lavender];
    const [active, setActive] = React.useState(0);
    const cat = window.AxiusCatalog[active];
    const total = window.AxiusCatalog.reduce((s, c) => s + c.count, 0);
    return (
      <section id="catalog" data-screen-label="04 Catalog" style={{
        padding: `108px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 80,
          alignItems: 'flex-end', marginBottom: 80,
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

        {/* Categories left, samples right — same card style, stacked vertically.
            Categories column scrolls inside the same height as the samples panel
            so the section stays as compact as Commitments / Method / Mess. */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 24,
          alignItems: 'flex-start',
        }}>
          <div className="ax-quiet06-scroll" style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            maxHeight: 520, overflowY: 'auto',
            paddingRight: 8,
          }}>
            {window.AxiusCatalog.map((c, i) => (
              <CatalogCard key={c.id} c={c} accent={accents[i]} isActive={active === i}
                onClick={() => setActive(i)} index={i}/>
            ))}
          </div>

          {/* sample entries for active category — scrollable */}
          {(() => {
            const rows = expandedSamples(cat);
            return (
              <div style={{
                background: C.surface, border: `1px solid ${C.line}`,
                position: 'sticky', top: 80,
              }}>
                <div style={{
                  padding: '16px 24px', borderBottom: `1px solid ${C.line}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: C.panel,
                }}>
                  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12}}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: accents[active],
                    }}/>
                    <Eyebrow color={C.ink}>{tr(cat, 'name')} — {t('sec04SampleEntries')}</Eyebrow>
                  </div>
                  <Eyebrow color={C.mute}>{rows.length} / {cat.count} · {t('sec04ScrollMore')}</Eyebrow>
                </div>
                <div className="ax-quiet06-scroll" style={{
                  maxHeight: 420, overflowY: 'auto',
                }}>
                  {rows.map((s, i) => (
                    <SampleRow key={s.n} s={s} last={i === rows.length - 1} accent={accents[active]}/>
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
                      color: accents[active], textDecoration: 'none',
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

  const CatalogCard = ({ c, accent, isActive, onClick, index }) => {
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
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
            {/* Pulsing dot on the active category — same accent strip
                pattern as the right panel's "live" indicator. */}
            <span aria-hidden style={{
              display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: isActive ? accent : 'transparent',
              border: isActive ? 'none' : `1px solid ${on ? accent : C.faint}`,
              animation: isActive ? 'axQ06Pulse 2.4s ease-out infinite' : 'none',
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
      { key: 'f', label: 'Freelancer',     accent: C.amber    },
      { key: 'h', label: 'In-house hire',  accent: C.lavender },
      { key: 'a', label: 'Axius',          accent: C.tangerine, featured: true },
    ];
    return (
      <section data-screen-label="05 Comparison" style={{
        padding: `108px ${pad}px`,
        background: C.panel, borderTop: `1px solid ${C.line}`,
      }}>
        <Eyebrow style={{marginBottom: 28}}>{t('sec05Eyebrow')}</Eyebrow>
        <HoverHead
          accent={C.mint}
          style={{fontSize: 84, letterSpacing: '-0.045em', maxWidth: 1080, marginBottom: 72}}
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
                <Eyebrow color={col.featured ? col.accent : C.mute}>
                  {t('sec05OptionLabel')} 0{i + 1}
                </Eyebrow>
                <div style={{
                  marginTop: 6,
                  fontFamily: DISPLAY, fontWeight: 600, fontSize: 20,
                  letterSpacing: '-0.025em', color: C.ink,
                }}>{col.label}</div>
              </div>
            ))}
          </div>

          {/* Data rows */}
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

        {/* Founder Track — a quiet footer panel under the tier row.
            Same surface/border grammar as the tier cards so it reads
            as a continuation of Pricing, not a separate section.
            Eyebrow + body + CTA on one horizontal line — no quote. */}
        <div style={{
          marginTop: 24, padding: '28px 32px',
          background: C.surface, border: `1px solid ${C.line}`,
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 40,
          alignItems: 'center',
        }}>
          <div style={{maxWidth: 740}}>
            <Eyebrow color={C.mute} style={{marginBottom: 10}}>{t('pricingFounderTrackLabel')}</Eyebrow>
            <p style={{
              margin: 0,
              fontSize: 15, color: C.dim, lineHeight: 1.6,
              letterSpacing: '-0.003em',
            }}>
              {t('pricingFounderTrackBody')(tierName('equipo'), tierName('departamento'))}
            </p>
          </div>
          <QuietBtn primary size="md"
            onClick={() => openBooking(t('pricingFounderTrackSubject'))}>
            {t('pricingFounderTrackCta')}
          </QuietBtn>
        </div>
      </section>
    );
  };

  // ─── PricingBar — labeled capacity/response bar that animates fill ──
  const PricingBar = ({ label, value, pct, accent, on }) => {
    return (
      <div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 6,
        }}>
          <Eyebrow color={C.mute}>{label}</Eyebrow>
          <div style={{
            fontFamily: DISPLAY, fontSize: 13, color: C.ink,
            letterSpacing: '-0.005em', fontVariantNumeric: 'tabular-nums',
          }}>{value}</div>
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

  // PricingCard (Quiet 0.6) — all tiers render identical at rest.
  // The featured tier receives a `pulse` prop driven by the parent
  // section's IntersectionObserver, animating lift + accent border
  // + strip + bar fill + "Recommended" label, then settling back.
  const PricingCard = ({ p, accent, index, pulse }) => {
    const [h, setH] = React.useState(false);
    const on = pulse || h;
    const capacityPct = Math.min(100, Math.round((p.points / 10) * 100));
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
          transition: 'transform .55s cubic-bezier(.2,.8,.2,1), border-color .35s ease',
          transform: pulse ? 'translateY(-12px)' : (h ? 'translateY(-3px)' : 'translateY(0)'),
          display: 'flex', flexDirection: 'column', gap: 22,
        }}>
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: on ? 'calc(100% + 2px)' : 0, background: accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
        }}/>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Eyebrow color={on ? accent : C.mute}>{t('pricingTierLabel')} {String(index+1).padStart(2, '0')}</Eyebrow>
          {!!p.featured && (
            <span style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              fontSize: 13, color: accent,
              opacity: pulse ? 1 : 0,
              transition: 'opacity .35s ease',
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

        {/* Capacity + response progress bars + cadence/comms grid */}
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
            on={on}/>
          <PricingBar
            label={t('pricingResponse')}
            value={p.response}
            pct={responsePct}
            accent={accent}
            on={on}/>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
            paddingTop: 6,
          }}>
            <div>
              <Eyebrow color={C.mute} style={{marginBottom: 4}}>{t('pricingCadence')}</Eyebrow>
              <div style={{fontFamily: DISPLAY, fontSize: 14, color: C.ink, letterSpacing: '-0.005em'}}>{tr(p, 'cadence')}</div>
            </div>
            <div>
              <Eyebrow color={C.mute} style={{marginBottom: 4}}>{t('pricingComms')}</Eyebrow>
              <div style={{fontFamily: DISPLAY, fontSize: 14, color: C.ink, letterSpacing: '-0.005em'}}>{tr(p, 'comms')}</div>
            </div>
          </div>
        </div>

        {/* Primary: direct subscribe via Stripe Payment Link.  Falls back
            to the discovery-call mailto+Cal flow when no checkout URL is
            configured.  Secondary: a quiet "Or book a call first" link. */}
        {(() => {
          const checkoutUrl = (window.AxiusConfig && window.AxiusConfig.checkoutUrls && window.AxiusConfig.checkoutUrls[p.id]) || '';
          const onStart = () => {
            if (checkoutUrl) { window.open(checkoutUrl, '_blank', 'noopener'); return; }
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
              style={{minHeight: 360, display: 'flex', flexDirection: 'column', gap: 18}}>
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

  // ─── 08 · FOUNDER (Quiet 0.6) — operator-card style.  Single large
  // portrait + a directory-listing fact panel beside it (matching the
  // OperatorCard grammar from the hero).  Quote and LinkedIn stitched
  // into the same bordered surface, no editorial frame strip.
  const Founder = () => {
    const [headH, setHeadH] = React.useState(false);
    const photo = (window.AxiusFounder && window.AxiusFounder.photo) || 'andres-toro.jpg';
    return (
      <section id="founder" data-screen-label="08 Founder" style={{
        padding: `108px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
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
              style={{maxWidth: 720}}
              prefix={t('sec08TitlePrefix')}
              italic={t('sec08TitleItalic')}
              suffix={t('sec08TitleSuffix')}/>
          </div>
        </div>

        {/* Surface card — same hairline / OPERATOR-ONLINE grammar as the
            hero card.  Left: large portrait + name + role.  Right: a
            stack of mono-uppercase / value rows (BASED · CURRENTLY ·
            HOURS · LANGUAGES · DIRECT LINE · LINKEDIN) terminated by
            the serif italic quote. */}
        <div style={{
          background: C.surface,
          border: `1px solid ${C.lineHi}`,
          display: 'grid', gridTemplateColumns: '1fr 1.1fr',
        }}>
          {/* LEFT — portrait pane */}
          <div style={{
            position: 'relative',
            borderRight: `1px solid ${C.line}`,
            background: C.panel,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              padding: '18px 22px',
              borderBottom: `1px solid ${C.line}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <Eyebrow color={C.tangerine}>{t('opCardOperator')}</Eyebrow>
              <div style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
                <span aria-hidden style={{
                  display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                  background: C.mint,
                  animation: 'axQ06Pulse 2.4s ease-out infinite',
                }}/>
                <Eyebrow color={C.dim}>{t('opCardOnline')}</Eyebrow>
              </div>
            </div>
            <div style={{
              padding: '32px 32px 28px',
              display: 'flex', flexDirection: 'column', gap: 24,
              flex: 1,
            }}>
              <div
                onMouseEnter={(e) => { const img = e.currentTarget.firstChild; if (img) img.style.filter = 'grayscale(0) saturate(1.05) contrast(1.02)'; }}
                onMouseLeave={(e) => { const img = e.currentTarget.firstChild; if (img) img.style.filter = 'grayscale(1) contrast(1.04)'; }}
                style={{
                  width: '100%', aspectRatio: '4 / 5',
                  border: `1px solid ${C.line}`,
                  background: C.surface,
                  overflow: 'hidden',
                  cursor: 'crosshair',
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
                  fontFamily: DISPLAY, fontWeight: 600, fontSize: 36,
                  letterSpacing: '-0.025em', color: C.ink, lineHeight: 1.05,
                }}>Andrés Toro</div>
                <div style={{
                  marginTop: 10,
                  fontFamily: MONO, fontSize: 11, fontWeight: 500,
                  color: C.mute, letterSpacing: '0.18em', textTransform: 'uppercase',
                }}>{t('opCardRole')}</div>
              </div>
            </div>
          </div>

          {/* RIGHT — directory listing + bio + quote */}
          <div style={{
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              padding: '18px 24px',
              borderBottom: `1px solid ${C.line}`,
              background: C.panel,
            }}>
              <Eyebrow color={C.mute}>{tr(window.AxiusFounder, 'role') || 'Operator profile'}</Eyebrow>
            </div>

            {/* Bio block */}
            <div style={{
              padding: '28px 32px 20px',
              borderBottom: `1px solid ${C.line}`,
            }}>
              <p style={{
                margin: 0,
                fontSize: 17, color: C.dim, lineHeight: 1.6,
                letterSpacing: '-0.003em',
              }}>{tr(window.AxiusFounder, 'bio')}</p>
            </div>

            {/* Directory rows — label · value, mono uppercase eyebrow + display value */}
            {(() => {
              const rows = [
                { k: 'Based',     v: 'Altamonte Springs, FL' },
                { k: 'Currently', v: 'In Medellín' },
                { k: 'Hours',     v: '09:00 — 18:00  MDE / ET' },
                { k: 'Languages', v: 'EN · ES' },
                { k: 'Direct',    v: 'andres@axius.tech', href: 'mailto:andres@axius.tech' },
              ];
              return (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  {rows.map((r, i) => (
                    <div key={i} style={{
                      padding: '14px 32px',
                      display: 'grid', gridTemplateColumns: '160px 1fr',
                      gap: 24, alignItems: 'center',
                      borderBottom: `1px solid ${C.line}`,
                    }}>
                      <Eyebrow color={C.mute}>{r.k}</Eyebrow>
                      {r.href ? (
                        <a href={r.href} style={{
                          fontFamily: MONO, fontSize: 14, color: C.ink,
                          letterSpacing: '-0.005em', textDecoration: 'none',
                          transition: 'color .25s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = C.tangerine}
                        onMouseLeave={(e) => e.currentTarget.style.color = C.ink}>
                          {r.v}
                        </a>
                      ) : (
                        <div style={{
                          fontFamily: DISPLAY, fontSize: 15, color: C.ink,
                          letterSpacing: '-0.005em',
                        }}>{r.v}</div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Pull-quote + LinkedIn — bottom of the card */}
            <div style={{
              padding: '28px 32px 32px',
              display: 'flex', flexDirection: 'column', gap: 20,
              flex: 1,
            }}>
              <p style={{
                margin: 0,
                fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
                fontSize: 24, color: C.ink, lineHeight: 1.3,
                letterSpacing: '-0.012em',
              }}>
                {t('sec08Quote')}
              </p>
              {window.AxiusConfig && window.AxiusConfig.linkedinUrl && (
                <a href={window.AxiusConfig.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    alignSelf: 'flex-start',
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    fontFamily: MONO, fontSize: 10, fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: C.ink, textDecoration: 'none',
                    padding: '10px 14px',
                    border: `1px solid ${C.lineHi}`,
                    transition: 'all .25s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.tangerine; e.currentTarget.style.borderColor = C.tangerine; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = C.lineHi; }}>
                  {t('sec08VerifyLinkedin')}
                  <span aria-hidden>↗</span>
                </a>
              )}
            </div>
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
          cursor: 'crosshair',
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
      <section data-screen-label="09 FAQ" style={{
        padding: `96px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
        <Eyebrow style={{marginBottom: 24}}>{t('sec09Eyebrow')}</Eyebrow>
        <HoverHead
          style={{maxWidth: 1000, marginBottom: 44, fontSize: 60, letterSpacing: '-0.038em', lineHeight: 1.05}}
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
          style={{fontSize: 104, letterSpacing: '-0.048em', lineHeight: 0.95}}
          prefix={t('ctaTitlePrefix')}
          italic={t('ctaTitleItalic')}
          suffix={t('ctaTitleSuffix')}/>

        <p style={{
          margin: '40px auto 0', maxWidth: 500,
          fontSize: 17, color: C.dim, lineHeight: 1.6,
        }}>
          {t('ctaBody')}
        </p>

        {/* Mono uppercase CTAs matching the OperatorCard button grammar. */}
        <div style={{display: 'flex', gap: 12, justifyContent: 'center', marginTop: 48, flexWrap: 'wrap'}}>
          <button type="button" onClick={() => openBooking(t('bookingSubject'))} style={{
            appearance: 'none', cursor: 'pointer',
            background: C.ink, color: C.bg, border: `1px solid ${C.ink}`,
            padding: '15px 22px',
            fontFamily: MONO, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            transition: 'all .25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = C.tangerine; e.currentTarget.style.borderColor = C.tangerine; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = C.ink; e.currentTarget.style.borderColor = C.ink; }}>
            {t('ctaSchedule')}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 14}}>→</span>
          </button>
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(t('bookingSubject'))}`} style={{
            appearance: 'none', cursor: 'pointer',
            background: 'transparent', color: C.ink, border: `1px solid ${C.lineHi}`,
            padding: '15px 22px',
            fontFamily: MONO, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            transition: 'all .25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.tangerine; e.currentTarget.style.borderColor = C.tangerine; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = C.lineHi; }}>
            andres@axius.tech
          </a>
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
  // styled like the Matrix EventLog but in Quiet 0.6's palette.
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
        '08 Founder':      { tag: 'OK',    msg: 'operator context loaded' },
        '09 FAQ':          { tag: 'OK',    msg: 'faq.opened · onboarding process' },
        '10 CTA':          { tag: 'READY', msg: 'discovery.call intake available' },
      };
      const targets = document.querySelectorAll('#stage-quiet06 [data-screen-label]');
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
        position: 'fixed', right: 20, bottom: 20, zIndex: 60,
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
              animation: 'axQ06Pulse 2.4s ease-out infinite',
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
          <div ref={scrollRef} className="ax-quiet06-scroll" style={{
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
                animation: 'axQ06Pulse 1.1s ease-out infinite',
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

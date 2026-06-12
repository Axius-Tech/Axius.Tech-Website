// ⚠️ ARCHIVE — Spanish copy preserved for the future /es route.
// This file is NOT loaded by the site. It is a frozen copy of reference/axius-shared.jsx
// (the last bilingual data file) kept so the ES translations survive the EN-only rebuild.
// Date archived: 2026-06-11

// ============================================================
// AXIUS DESIGN SYSTEM — shared tokens + data + atoms
// Used by all 4 direction components (A/B/C/D)
// ============================================================

// ─── ENDPOINTS / EXTERNAL LINKS ─────────────────────────────
// Single source of truth for the live booking URL + verification
// links. All directions read from window.AxiusConfig — when this
// is set, openBooking() opens Cal.com instead of falling back to
// mailto, and the Founder/DirectLine surfaces link to LinkedIn.
window.AxiusConfig = {
  bookingUrl:  'https://cal.com/andrestoro/discovery-call',
  linkedinUrl: 'https://www.linkedin.com/in/followrace/',
  // WhatsApp + phone routing for "Ring Andrés" / "Message directly".
  // whatsappNumber must be the full international format with NO + or
  // spaces (e.g. '14075551234' for a Florida cell, '573001234567' for
  // a Colombian cell).  When set, both CTAs open a wa.me chat in a
  // new tab with a transcript-aware prefilled message.  Leave empty
  // to fall back to the in-page ring countdown + AI takeover flow.
  // PLACEHOLDER — real number lives in axius-secrets.local.jsx.
  whatsappNumber: '',
  // Optional tel: link target.  Same E.164-without-plus format.
  // When set, surfaces a "Call instead" link inside the ring banner.
  // PLACEHOLDER — real number lives in axius-secrets.local.jsx.
  phoneNumber: '',
  // Ring-Andrés behavior:
  //   'inChat'   = visitor stays in the on-page chat; a webhook (below)
  //                fires in the background to notify Andrés with the
  //                transcript.  The chat shows a "ring sent" banner +
  //                AI continues.  DEFAULT.
  //   'whatsapp' = clicking Ring Andrés opens wa.me in a new tab with
  //                a prefilled message.  Visitor leaves the page.
  ringBehavior: 'inChat',
  // Optional webhook URL that receives a POST when Ring Andrés fires.
  // Compatible with: Telegram bot, Pushover, Discord webhook, Slack
  // webhook, Formspree/Web3Forms (forwards to email), Zapier hooks,
  // or any custom endpoint.  Leave empty until you set one up — the
  // in-chat experience still works (just no live phone notification).
  //
  // Format detection:
  //   · URLs containing 'api.telegram.org/bot' get a Telegram payload
  //     ({ chat_id, text, parse_mode: 'Markdown' }) so the message
  //     renders cleanly in your Telegram client.  Set the bot token
  //     in the URL (https://api.telegram.org/bot<TOKEN>/sendMessage)
  //     and the chat ID in ringWebhookChatId below.
  //   · URLs containing 'discord.com/api/webhooks/' get { content }
  //     (Discord webhook format).
  //   · Everything else receives the generic JSON envelope:
  //     { source, event, timestamp, transcript, page, recent_questions }.
  // PLACEHOLDER — the real Telegram bot token lives in
  // `axius-secrets.local.jsx` (gitignored) and is merged into this
  // config by the override block at the bottom of this file.  See
  // axius-secrets.example.jsx for the expected shape.
  ringWebhookUrl: 'https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/sendMessage',
  // Telegram chat ID — "Axius Dispatch" forum supergroup.  Each Ring
  // first calls createForumTopic to spawn a per-visitor topic, then
  // posts the Ring inside it with message_thread_id; replies are
  // scoped to the same thread so concurrent visitors stay isolated.
  // PLACEHOLDER — real value lives in axius-secrets.local.jsx.
  ringWebhookChatId: 'YOUR_TELEGRAM_CHAT_ID',
  // When true (default for the forum supergroup), each Ring opens a
  // fresh topic named "Conv <id> · <first question>".  When false,
  // all Rings post to the root of ringWebhookChatId.
  ringUseForumTopics: true,
  // Stripe Payment Links (or any subscribe URL) per tier ID.  When
  // present, the Pricing card shows a primary "Get started" CTA that
  // routes here directly; when null/empty, the card falls back to the
  // discovery-call booking flow.  Replace with real URLs from Stripe.
  checkoutUrls: {
    operador:      'https://buy.stripe.com/7sY8wOcMEe7B6nWbT1cbC00',
    equipo:        'https://buy.stripe.com/4gM14m13W4x1dQo7CLcbC01',
    departamento:  'https://buy.stripe.com/3cIdR86oge7BbIg0ajcbC02',
  },
};

// ─── SECRET OVERRIDES ───────────────────────────────────────
// Local-only secrets file (gitignored) defines window.AxiusSecrets
// before this script loads.  Its values override the placeholders
// above so the public repo never carries live tokens / chat IDs.
// See axius-secrets.example.jsx for the expected shape.
(function applySecretOverrides() {
  var s = (typeof window !== 'undefined' && window.AxiusSecrets) || null;
  if (!s) return;
  var cfg = window.AxiusConfig;
  if (s.telegramBotToken) {
    cfg.ringWebhookUrl =
      'https://api.telegram.org/bot' + s.telegramBotToken + '/sendMessage';
  }
  if (s.telegramChatId) cfg.ringWebhookChatId = String(s.telegramChatId);
  if (s.whatsappNumber) cfg.whatsappNumber    = s.whatsappNumber;
  if (s.phoneNumber)    cfg.phoneNumber       = s.phoneNumber;
  if (s.checkoutUrls)   cfg.checkoutUrls      = Object.assign({}, cfg.checkoutUrls, s.checkoutUrls);
})();

// ─── DESIGN TOKENS ──────────────────────────────────────────
window.AxiusTokens = {
  // canvas
  bg: '#0F0E0C',
  surface: '#151311',
  surfaceHi: '#1C1A17',
  border: 'rgba(245,241,234,0.08)',
  borderHi: 'rgba(245,241,234,0.16)',
  borderLo: 'rgba(245,241,234,0.04)',
  // ink
  ink: '#F5F1EA',
  inkDim: 'rgba(245,241,234,0.72)',
  inkMute: 'rgba(245,241,234,0.48)',
  inkFaint: 'rgba(245,241,234,0.32)',
  // accents
  copper: '#B8743C',
  copperSoft: '#C89B67',
  copperFaint: 'rgba(184,116,60,0.15)',
  // ops state colors (muted)
  stateGreen: '#7A9272',
  stateBlue: '#6A8194',
  stateAmber: '#C89B67',
  stateRed: '#A36B62',
  // type
  fontDisplay: '"Inter", system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, monospace',
};

// ─── DATA: 5 COMMITMENTS (Promesa Axius) ─────────────────────
window.AxiusCommitments = [
  {
    n: '01',
    title: 'Always reachable.',
    titleEs: 'Siempre disponibles.',
    body: 'Guaranteed response windows by tier.\n72h · Operator\n48h · Team\n24h · Department',
    bodyEs: 'Ventanas de respuesta garantizadas por tier.\n72h · Operador\n48h · Equipo\n24h · Departamento',
    metric: { label: 'response · department', labelEs: 'respuesta · departamento', value: '< 24h' },
  },
  {
    n: '02',
    title: 'Outcomes, not hours.',
    titleEs: 'Resultados, no horas.',
    body: 'We define a meaningful operational outcome together. If we don\'t deliver it within the agreed timeline, we keep working at no additional cost.',
    bodyEs: 'Definimos juntos un resultado operativo significativo. Si no lo entregamos en el plazo acordado, seguimos trabajando sin costo adicional.',
    metric: { label: 'first-month', labelEs: 'primer mes', value: 'guaranteed', valueEs: 'garantizado' },
  },
  {
    n: '03',
    title: 'A fraction of the cost.',
    titleEs: 'Una fracción del costo.',
    body: 'Operator replaces a freelance contractor. Team replaces multiple operational hires. Division replaces an internal tech department.',
    bodyEs: 'Operador reemplaza un contratista freelance. Equipo reemplaza múltiples contrataciones operativas. División reemplaza un departamento tech interno.',
    metric: { label: 'starts at', labelEs: 'desde', value: '$1,000 / mo', valueEs: '$1,000 / mes' },
  },
  {
    n: '04',
    title: 'We improve before we rebuild.',
    titleEs: 'Mejoramos antes de reconstruir.',
    body: 'We optimize the systems you already use before recommending expensive rebuilds.',
    bodyEs: 'Optimizamos los sistemas que ya usas antes de recomendar reconstrucciones costosas.',
    metric: { label: 'configured first', labelEs: 'optimizado primero', value: '~90%', valueEs: '~90%' },
  },
  {
    n: '05',
    title: 'Organized from day one.',
    titleEs: 'Organizados desde el día uno.',
    body: 'Clear documentation, monthly reporting, and structured operational oversight built into every engagement.',
    bodyEs: 'Documentación clara, reportería mensual y supervisión operativa estructurada, todo incorporado desde el primer día.',
    metric: { label: 'cadence', labelEs: 'cadencia', value: 'monthly + Q', valueEs: 'mensual + T' },
  },
];

// ─── DATA: METHODOLOGY ──────────────────────────────────────
window.AxiusMethodology = [
  { n: '01', name: 'Audit',     nameEs: 'Auditoría', body: 'Inventory the systems.\nFind the leaks.\nDeliver the report.', bodyEs: 'Inventariar los sistemas.\nEncontrar las fugas.\nEntregar el reporte.', artifact: 'stack_audit.pdf',    timing: 'Days 1–7',  timingEs: 'Días 1–7' },
  { n: '02', name: 'Configure', nameEs: 'Configurar', body: 'Map workflows to your business.\nYou sign off in writing.', bodyEs: 'Mapear workflows a tu negocio.\nFirmas la aprobación por escrito.', artifact: 'config_map.json',    timing: 'Days 8–14', timingEs: 'Días 8–14' },
  { n: '03', name: 'Operate',   nameEs: 'Operar',     body: 'Run it.\nLog tickets. Ship fixes.\nReport monthly.',         bodyEs: 'Operarlo.\nRegistrar tickets. Lanzar fixes.\nReportar cada mes.',     artifact: 'monthly_report.md',  timing: 'Month 1+',  timingEs: 'Mes 1+' },
  { n: '04', name: 'Evolve',    nameEs: 'Evolucionar', body: 'Review quarterly.\nThe roadmap stays yours.',               bodyEs: 'Revisar cada trimestre.\nEl roadmap sigue siendo tuyo.',              artifact: 'roadmap.notion',     timing: 'Quarterly', timingEs: 'Trimestral' },
];

// ─── DATA: WORKFLOW CATALOG (9 categories, ~129) ────────────
window.AxiusCatalog = [
  {
    id: 'sales',
    name: 'Sales & Prospecting',
    nameEs: 'Ventas y Prospección',
    count: 16,
    stack: 'apollo · smartlead · hubspot · cal.com',
    samples: [
      { n: '001', name: 'Missed-call recovery', sub: 'auto-text + callback queue', pts: 1, time: '~ 3 days' },
      { n: '002', name: 'Dormant lead reactivation', sub: 'sequence + scoring', pts: 1, time: '~ 4 days' },
      { n: '003', name: 'DM auto-qualification', sub: 'IG · FB · WhatsApp', pts: 1, time: '~ 5 days' },
      { n: '004', name: 'Voice agent inbound qualification', sub: 'Twilio · Vapi', pts: 2, time: '~ 2 wks' },
    ],
  },
  {
    id: 'cx',
    name: 'Customer Experience & Support',
    nameEs: 'Experiencia y Soporte',
    count: 17,
    stack: 'zendesk · intercom · claude · whatsapp',
    samples: [
      { n: '017', name: 'AI FAQ chatbot', sub: 'web + WhatsApp', pts: 1, time: '~ 3 days' },
      { n: '018', name: 'Ticket triage & routing', sub: 'sentiment + escalation', pts: 2, time: '~ 1 wk' },
      { n: '019', name: 'Multi-channel inbox unification', sub: 'email · SMS · IG · WhatsApp', pts: 2, time: '~ 2 wks' },
      { n: '020', name: 'Customer health scoring', sub: 'real-time, operational', pts: 2, time: '~ 2 wks' },
    ],
  },
  {
    id: 'ops',
    name: 'Internal Operations',
    nameEs: 'Operaciones Internas',
    count: 16,
    stack: 'notion · linear · stripe · gsuite',
    samples: [
      { n: '034', name: 'Document automation', sub: 'proposals · SOWs · contracts', pts: 1, time: '~ 4 days' },
      { n: '035', name: 'Cross-tool sync', sub: 'CRM ↔ accounting ↔ projects', pts: 2, time: '~ 2 wks' },
      { n: '036', name: 'Compliance check automation', sub: 'GDPR · CCPA · audits', pts: 2, time: '~ 2 wks' },
      { n: '037', name: 'SaaS subscription audit', sub: 'kill ghost spend', pts: 1, time: '~ 2 days' },
    ],
  },
  {
    id: 'ai',
    name: 'AI Implementation',
    nameEs: 'Implementación de IA',
    count: 14,
    stack: 'claude · openai · vector dbs',
    samples: [
      { n: '050', name: 'Knowledge-base agent', sub: 'RAG over your docs', pts: 2, time: '~ 2 wks' },
      { n: '051', name: 'Sales call analyzer', sub: 'transcripts → insights', pts: 2, time: '~ 1 wk' },
      { n: '052', name: 'Predictive lead scoring', sub: 'CRM-grounded', pts: 2, time: '~ 2 wks' },
      { n: '053', name: 'Custom multi-step agents', sub: 'decision workflows', pts: 2, time: '~ 2 wks' },
    ],
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    nameEs: 'Datos y Analítica',
    count: 13,
    stack: 'supabase · metabase · postgres',
    samples: [
      { n: '064', name: 'Dashboard automation', sub: 'revenue · ops · sales', pts: 1, time: '~ 1 wk' },
      { n: '065', name: 'Multi-touch revenue attribution', sub: 'cross-channel', pts: 2, time: '~ 2 wks' },
      { n: '066', name: 'LTV / churn modeling', sub: 'predictive', pts: 2, time: '~ 3 wks' },
      { n: '067', name: 'Custom data warehouse', sub: 'Snowflake / BigQuery', pts: 3, time: '~ 4 wks' },
    ],
  },
  {
    id: 'web',
    name: 'Website & Digital Storefront',
    nameEs: 'Web y Tienda Digital',
    count: 15,
    stack: 'next.js · framer · shopify · webflow',
    samples: [
      { n: '077', name: 'Marketing site', sub: 'next.js · framer · webflow', pts: 3, time: '~ 4 wks' },
      { n: '078', name: 'E-commerce setup', sub: 'shopify · woocommerce', pts: 3, time: '~ 4 wks' },
      { n: '079', name: 'Multi-language site', sub: 'localized routing', pts: 2, time: '~ 2 wks' },
      { n: '080', name: 'Conversion optimization & A/B', sub: 'test framework', pts: 1, time: '~ 1 wk' },
    ],
  },
  {
    id: 'soft',
    name: 'Custom Software & Apps',
    nameEs: 'Software y Apps a Medida',
    count: 15,
    stack: 'react · react native · retool · postgres',
    samples: [
      { n: '092', name: 'Internal admin tool', sub: 'retool · react custom', pts: 2, time: '~ 3 wks' },
      { n: '093', name: 'Customer-facing app', sub: 'react native · flutter', pts: 5, time: '~ 3 mo' },
      { n: '094', name: 'Custom CRM build', sub: 'multi-tenant', pts: 5, time: '~ 3 mo' },
      { n: '095', name: 'API integration between dispar systems', sub: 'webhooks · queues', pts: 2, time: '~ 2 wks' },
    ],
  },
  {
    id: 'grow',
    name: 'Marketing & Growth',
    nameEs: 'Marketing y Crecimiento',
    count: 11,
    stack: 'meta · google · loops · beehiiv',
    samples: [
      { n: '107', name: 'Email marketing automation', sub: 'transactional + segmented', pts: 1, time: '~ 1 wk' },
      { n: '108', name: 'Acquisition system operations', sub: 'meta · google · LinkedIn', pts: 2, time: '~ 2 wks' },
      { n: '109', name: 'Search distribution system', sub: 'briefs · publish · distribute', pts: 2, time: '~ 3 wks' },
      { n: '110', name: 'Affiliate program management', sub: 'partner ops', pts: 2, time: '~ 2 wks' },
    ],
  },
  {
    id: 'creative',
    name: 'Content & Creative Production',
    nameEs: 'Contenido y Producción Creativa',
    count: 12,
    stack: 'capcut · davinci · elevenlabs · midjourney',
    samples: [
      { n: '118', name: 'Video repurposing pipeline', sub: 'long → shorts/reels/tiktok', pts: 2, time: '~ 2 wks' },
      { n: '119', name: 'Multi-channel media operations', sub: 'edit · chapters · distribute', pts: 2, time: '~ 2 wks' },
      { n: '120', name: 'AI voice generation', sub: 'elevenlabs · dubbing', pts: 1, time: '~ 1 wk' },
      { n: '121', name: 'AI image generation pipeline', sub: 'midjourney · batch', pts: 2, time: '~ 2 wks' },
    ],
  },
];

// ─── DATA: PRICING (3 tiers) ────────────────────────────────
window.AxiusPricing = [
  {
    id: 'operador',
    name: 'Operador',
    price: 1000,
    setup: 500,
    points: 2,
    sub: 'For businesses that need one or two critical operational systems handled reliably.',
    subEs: 'Para empresas que necesitan uno o dos sistemas operativos críticos manejados con confiabilidad.',
    workloads:   ['AI FAQ chatbot', 'Missed-call recovery'],
    workloadsEs: ['Chatbot de FAQ con IA', 'Recuperación de llamadas perdidas'],
    promoCode:   'BYEOPFEE',
    response: '72h',
    comms: 'Email',
    commsEs: 'Email',
    cadence: 'Monthly operational review',
    cadenceEs: 'Revisión operativa mensual',
    bestFor: 'One critical system. One operator.',
    replaces: 'A $3–5k freelance contractor',
    features: [
      'Up to 2 points of active workflows',
      'Email support · 72h response',
      'Monthly 30-min strategy call',
      'Monthly operations report (2–4 pages)',
      'Pause anytime after 90 days',
    ],
    featuresEs: [
      'Hasta 2 puntos de workflows activos',
      'Soporte por email · respuesta 72h',
      'Llamada de estrategia mensual de 30 min',
      'Reporte mensual de operaciones (2–4 páginas)',
      'Pausa en cualquier momento después de 90 días',
    ],
  },
  {
    id: 'equipo',
    name: 'Equipo',
    price: 2500,
    setup: 1250,
    points: 5,
    featured: true,
    sub: 'For businesses running multiple systems that need coordination, continuity, and ongoing optimization.',
    subEs: 'Para empresas que operan múltiples sistemas y necesitan coordinación, continuidad y optimización constante.',
    workloads:   ['AI lead qualification', 'CRM automation', 'Reporting dashboard', 'Inbox unification'],
    workloadsEs: ['Calificación de leads con IA', 'Automatización de CRM', 'Dashboard de reportería', 'Inbox unificado'],
    promoCode:   'BYETEAMFEE',
    response: '48h',
    comms: 'Email + dedicated Discord',
    commsEs: 'Email + Discord dedicado',
    cadence: 'Biweekly operational oversight',
    cadenceEs: 'Supervisión operativa quincenal',
    bestFor: 'Multi-system operations.',
    replaces: 'A $4.5k junior hire + benefits + management',
    features: [
      'Up to 5 points of active workflows',
      'Dedicated Discord channel · 48h response',
      'Biweekly call + quarterly strategy (60 min)',
      'Monthly operations report (4–6 pages)',
      'First-month outcome guarantee',
    ],
    featuresEs: [
      'Hasta 5 puntos de workflows activos',
      'Canal de Discord dedicado · respuesta 48h',
      'Llamada quincenal + estrategia trimestral (60 min)',
      'Reporte mensual de operaciones (4–6 páginas)',
      'Garantía de resultado el primer mes',
    ],
  },
  {
    id: 'departamento',
    name: 'Departamento',
    price: 5000,
    setup: 2500,
    points: 10,
    sub: 'For businesses ready to offload the operational tech layer entirely.',
    subEs: 'Para empresas listas para delegar por completo la capa operativa de tech.',
    workloads:   ['Multi-touch attribution', 'Internal admin tool', 'Knowledge-base AI agent', 'Cross-tool sync', 'Operational dashboards', 'AI ticket routing'],
    workloadsEs: ['Atribución multi-touch', 'Herramienta admin interna', 'Agente IA de knowledge base', 'Sync entre herramientas', 'Dashboards operativos', 'Routing de tickets con IA'],
    promoCode:   'BYEDEPTFEE',
    response: '24h',
    comms: 'Email + Discord + named operator',
    commsEs: 'Email + Discord + operador asignado',
    cadence: 'Weekly operational leadership',
    cadenceEs: 'Liderazgo operativo semanal',
    bestFor: 'Your entire tech function.',
    replaces: 'An ops manager + part-time dev + agency · $12–18k combined',
    features: [
      'Up to 10 points of active workflows',
      'Named operator · 24h response',
      'Weekly call + quarterly exec review (90 min)',
      'Monthly operations report (6–10 pages)',
      'Roadmap, risk register, full system documentation',
    ],
    featuresEs: [
      'Hasta 10 puntos de workflows activos',
      'Operador asignado · respuesta 24h',
      'Llamada semanal + revisión ejecutiva trimestral (90 min)',
      'Reporte mensual de operaciones (6–10 páginas)',
      'Roadmap, registro de riesgos, documentación completa del sistema',
    ],
  },
];

// ─── DATA: COMPARISON ROWS ──────────────────────────────────
window.AxiusComparison = [
  { row: 'Structure',           rowEs: 'Estructura',                 f: 'Multiple vendors',          fEs: 'Múltiples proveedores',         h: 'One employee',                  hEs: 'Un empleado',                       a: 'One accountable layer',                  aEs: 'Una capa responsable' },
  { row: 'Continuity',          rowEs: 'Continuidad',                f: 'Knowledge resets',          fEs: 'El conocimiento se reinicia',   h: 'Single-threaded capacity',      hEs: 'Capacidad single-thread',            a: 'Documented continuity',                  aEs: 'Continuidad documentada' },
  { row: 'Coordination',        rowEs: 'Coordinación',               f: 'Coordination overhead',     fEs: 'Sobrecarga de coordinación',    h: 'Hiring overhead',               hEs: 'Sobrecarga de contratación',         a: 'One operational system',                 aEs: 'Un solo sistema operativo' },
  { row: 'Ownership',           rowEs: 'Propiedad',                  f: 'Reactive fixes',            fEs: 'Arreglos reactivos',            h: 'Internal dependency',           hEs: 'Dependencia interna',                a: 'Ongoing system ownership',               aEs: 'Propiedad continua del sistema' },
  { row: 'Coverage',            rowEs: 'Cobertura',                  f: 'One specialty at a time',   fEs: 'Una especialidad a la vez',     h: 'Limited to internal bandwidth', hEs: 'Limitado al bandwidth interno',      a: 'Multi-disciplinary operational coverage', aEs: 'Cobertura operativa multidisciplinaria' },
  { row: 'Documentation',       rowEs: 'Documentación',              f: 'Usually fragmented',        fEs: 'Usualmente fragmentada',        h: 'Depends on the hire',           hEs: 'Depende de la contratación',         a: 'Structured by default',                  aEs: 'Estructurada por defecto' },
  { row: 'Communication',       rowEs: 'Comunicación',               f: 'Multiple inboxes',          fEs: 'Múltiples inboxes',             h: 'Internal management required',  hEs: 'Requiere gestión interna',           a: 'One line of communication',              aEs: 'Una sola línea de comunicación' },
  { row: 'Monthly cost',        rowEs: 'Costo mensual',              f: '$3.5k – $8k',               fEs: '$3.5k – $8k',                   h: '$10k – $14k + benefits',        hEs: '$10k – $14k + beneficios',           a: 'From $1,000',                            aEs: 'Desde $1,000' },
  { row: 'Time to start',       rowEs: 'Tiempo para arrancar',       f: '2 – 4 weeks',               fEs: '2 – 4 semanas',                 h: '2 – 4 months',                  hEs: '2 – 4 meses',                        a: '7 – 14 days',                            aEs: '7 – 14 días' },
  { row: 'Long-term stability', rowEs: 'Estabilidad a largo plazo',  f: 'Vendor turnover',           fEs: 'Rotación de proveedores',       h: 'Employee turnover',             hEs: 'Rotación de empleados',              a: 'Same system month to month',             aEs: 'El mismo sistema mes a mes' },
];

// ─── DATA: FAQ ──────────────────────────────────────────────
window.AxiusFAQ = [
  { q: 'Are you an AI agency?',
    qEs: '¿Son una agencia de IA?',
    a: 'No. AI is one of nine workflow categories — alongside websites, automations, integrations, reporting, custom software, and content. Most of our work is plumbing, not prompts.',
    aEs: 'No. La IA es una de nueve categorías de workflows — junto con sitios web, automatizaciones, integraciones, reportería, software a medida y contenido. La mayor parte del trabajo es plomería, no prompts.' },
  { q: 'What\'s included in the monthly fee?',
    qEs: '¿Qué incluye la cuota mensual?',
    a: 'Capacity of active workflows (measured in points, by tier), guaranteed response windows, scheduled strategy calls, a monthly operations report, and a quarterly roadmap review.',
    aEs: 'Capacidad de workflows activos (medida en puntos, por tier), ventanas de respuesta garantizadas, llamadas de estrategia programadas, un reporte mensual de operaciones y una revisión trimestral del roadmap.' },
  { q: 'How do you onboard a new business?',
    qEs: '¿Cómo hacen el onboarding?',
    a: 'Setup runs 7–14 days by tier. You get a systems audit, a configuration map, and a 30-day plan. Monthly billing starts after sign-off.',
    aEs: 'El setup toma 7–14 días según el tier. Recibes una auditoría de sistemas, un mapa de configuración y un plan a 30 días. El cobro mensual empieza después de la aprobación.' },
  { q: 'Who owns the work, the code, the accounts?',
    qEs: '¿Quién es dueño del trabajo, el código, las cuentas?',
    a: 'You do. Every artifact lives in your accounts. We work inside your tools. If you ever leave, everything stays documented and operational.',
    aEs: 'Tú. Cada artefacto vive en tus cuentas. Trabajamos dentro de tus herramientas. Si en algún momento te vas, todo queda documentado y operativo.' },
  { q: 'What if we want to pause?',
    qEs: '¿Qué pasa si queremos pausar?',
    a: 'Month-to-month after the first 90 days. Pause with two weeks\' notice — or drop to Maintenance Mode at half price to keep workflows live.',
    aEs: 'Mes a mes después de los primeros 90 días. Pausa con dos semanas de aviso — o baja a Modo Mantenimiento a mitad de precio para mantener los workflows activos.' },
  { q: 'What if we\'re building a product, not running one?',
    qEs: '¿Y si estamos construyendo un producto, en vez de operar uno?',
    a: 'Founder Track inside Team or Department, same retention structure. Builder ships an MVP in 1–3 months. Partner ships a substantial product in 4–6 months.',
    aEs: 'Founder Track dentro de Equipo o Departamento, misma estructura de retención. Builder entrega un MVP en 1–3 meses. Partner entrega un producto sustancial en 4–6 meses.' },
  { q: 'Where are you based?',
    qEs: '¿Dónde están ubicados?',
    a: 'Medellín, Colombia. Remote-first. Available on US business hours.',
    aEs: 'Medellín, Colombia. Trabajamos 100% remoto. Disponibles en horario laboral de EE.UU.' },
];

// ─── DATA: FOUNDER ──────────────────────────────────────────
window.AxiusFounder = {
  name: 'Andrés Toro',
  role: 'Founder · Operator',
  based: 'Altamonte Springs, FL',
  currentlyIn: 'Medellín, Colombia',
  email: 'andres@axius.tech',
  photo: '/assets/andres-toro.jpg',
  bio: "Hi, I'm Andrés.\n\nAfter years working inside SMB operations, I kept seeing the same issue: fragmented systems, scattered contractors, and founders stuck managing operational complexity themselves.\n\nAxius was built to solve that.\n\nWe oversee the operational side of your business's tech through one accountable layer, combining structured systems, AI-assisted execution, and specialist support when needed.\n\nThe goal is simple: your business keeps moving without you managing the tech side of it.",
  bioEs: "Hola, soy Andrés.\n\nDespués de años trabajando en operaciones de PyMEs, vi el mismo patrón una y otra vez: sistemas fragmentados, contratistas dispersos, y fundadores atrapados gestionando ellos mismos toda la complejidad operativa.\n\nAxius nació para resolver eso.\n\nOperamos el lado tecnológico de tu negocio a través de una sola capa responsable, combinando sistemas estructurados, ejecución asistida por IA y especialistas cuando hace falta.\n\nEl objetivo es simple: tu negocio sigue avanzando sin que tú tengas que operar la tech.",
  quote: '"Most SMBs don\'t need a CTO. They need someone who quietly handles the systems behind the business so the founder can stop being IT."',
  quoteEs: '"La mayoría de PyMEs no necesitan un CTO. Necesitan a alguien que opere en silencio los sistemas detrás del negocio para que el fundador deje de ser el de IT."',
  facts: [
    { k: 'based', v: 'Altamonte Springs, FL · in Medellín now' },
    { k: 'available', v: 'US business hours' },
    { k: 'languages', v: 'EN · ES' },
    { k: 'reachable', v: 'andres@axius.tech' },
  ],
};

// ─── COMMON ATOMS ───────────────────────────────────────────

// Status dot (operational green)
window.AxiusDot = function ({ color, pulse }) {
  const T = window.AxiusTokens;
  return (
    <span style={{
      display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
      background: color || T.stateGreen, marginRight: 8, position: 'relative',
      boxShadow: pulse ? `0 0 0 0 ${color || T.stateGreen}` : 'none',
    }}/>
  );
};

// Mono kicker / label / value
window.AxiusMono = function ({ children, kicker, dim, copper, size = 11, style = {} }) {
  const T = window.AxiusTokens;
  return (
    <span style={{
      fontFamily: T.fontMono,
      fontSize: size,
      letterSpacing: kicker ? '0.18em' : '0.08em',
      textTransform: kicker || size <= 11 ? 'uppercase' : 'none',
      color: copper ? T.copper : dim ? T.inkMute : T.inkDim,
      ...style,
    }}>{children}</span>
  );
};

// Pill (status / category indicator)
window.AxiusPill = function ({ children, color, dim }) {
  const T = window.AxiusTokens;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      border: `1px solid ${dim ? T.borderLo : T.border}`,
      borderRadius: 99, padding: '4px 10px',
      fontFamily: T.fontMono, fontSize: 10, letterSpacing: '0.08em',
      color: T.inkDim, background: T.surfaceHi,
    }}>
      {color && <span style={{width: 6, height: 6, borderRadius: '50%', background: color}}/>}
      {children}
    </span>
  );
};

// CTA button
window.AxiusBtn = function ({ children, primary, dark, copper, size = 'md', onClick, style = {} }) {
  const T = window.AxiusTokens;
  const sizes = {
    sm: { pad: '8px 14px', fs: 12 },
    md: { pad: '12px 20px', fs: 13 },
    lg: { pad: '14px 24px', fs: 14 },
  };
  const s = sizes[size];
  let bg, border, color;
  if (copper) { bg = T.copper; border = T.copper; color = T.bg; }
  else if (primary) { bg = T.ink; border = T.ink; color = T.bg; }
  else if (dark) { bg = T.surface; border = T.borderHi; color = T.ink; }
  else { bg = 'transparent'; border = T.borderHi; color = T.ink; }
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: bg, border: `1px solid ${border}`, color,
      padding: s.pad, fontSize: s.fs, fontFamily: T.fontDisplay, fontWeight: 500,
      letterSpacing: '-0.005em', cursor: 'pointer',
      transition: 'all .15s ease',
      ...style,
    }}>
      {children}
      <span style={{fontFamily: T.fontMono, color: copper ? T.bg : T.copperSoft, fontSize: s.fs - 1}}>→</span>
    </button>
  );
};

// AXIUS WORDMARK (3 options)
window.AxiusWordmark = function ({ variant = 'A', size = 18, color }) {
  const T = window.AxiusTokens;
  const c = color || T.ink;
  if (variant === 'A') {
    // Geometric grotesk with tabular metric
    return (
      <span style={{
        fontFamily: T.fontDisplay, fontWeight: 700, fontSize: size,
        letterSpacing: '-0.02em', color: c, fontFeatureSettings: '"tnum" 1',
        display: 'inline-flex', alignItems: 'center', gap: size * 0.4,
      }}>
        <span style={{
          display: 'inline-block', width: size * 0.42, height: size * 0.42,
          background: T.copper, transform: 'rotate(45deg)',
        }}/>
        AXIUS
      </span>
    );
  }
  if (variant === 'B') {
    // Mono-tracked editorial
    return (
      <span style={{
        fontFamily: T.fontMono, fontWeight: 600, fontSize: size * 0.85,
        letterSpacing: '0.22em', color: c,
      }}>
        AXIUS<span style={{color: T.copper}}>.</span>
      </span>
    );
  }
  // C — slab divider, more architectural
  return (
    <span style={{
      fontFamily: T.fontDisplay, fontWeight: 800, fontSize: size,
      letterSpacing: '-0.04em', color: c,
      display: 'inline-flex', alignItems: 'baseline', gap: 0,
    }}>
      <span>ax</span>
      <span style={{
        display: 'inline-block', width: 1, height: size * 0.7,
        background: T.copper, margin: `0 ${size * 0.08}px`,
        transform: 'translateY(2px)',
      }}/>
      <span style={{color: T.inkDim}}>ius</span>
    </span>
  );
};

// Founder portrait — uses real photo with tasteful frame
window.AxiusPortrait = function ({ aspect = '3/4', cropY = '50%', cropX = '50%', desat = false, style = {} }) {
  const T = window.AxiusTokens;
  return (
    <div style={{
      aspectRatio: aspect, width: '100%', overflow: 'hidden',
      background: T.surfaceHi, position: 'relative',
      ...style,
    }}>
      <img src={window.AxiusFounder.photo} alt="Andrés Toro"
        onError={(e) => { e.target.style.display = 'none'; }}
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: `${cropX} ${cropY}`,
          filter: desat ? 'grayscale(.3) contrast(1.05)' : 'contrast(1.02)',
        }}/>
      {/* subtle warm overlay to tie to palette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, transparent 60%, rgba(15,14,12,0.35) 100%)',
        mixBlendMode: 'multiply',
      }}/>
    </div>
  );
};

// Image placeholder for non-founder imagery
window.AxiusImgSlot = function ({ label, sub, h = 200, style = {} }) {
  const T = window.AxiusTokens;
  return (
    <div style={{
      height: h, position: 'relative',
      background: `
        repeating-linear-gradient(135deg, transparent 0 10px, rgba(245,241,234,0.04) 10px 11px),
        ${T.surfaceHi}`,
      border: `1px solid ${T.border}`,
      ...style,
    }}>
      <div style={{
        position: 'absolute', top: 10, left: 12,
        fontFamily: T.fontMono, fontSize: 10, color: T.inkMute, letterSpacing: '0.08em',
      }}>[{label}]</div>
      {sub && <div style={{
        position: 'absolute', bottom: 10, left: 12,
        fontFamily: T.fontMono, fontSize: 10, color: T.inkFaint, letterSpacing: '0.06em',
      }}>{sub}</div>}
    </div>
  );
};

// Rule (divider)
window.AxiusRule = function ({ heavy, dotted, copper, style = {} }) {
  const T = window.AxiusTokens;
  return <hr style={{
    border: 'none',
    borderTop: `${heavy ? 2 : 1}px ${dotted ? 'dotted' : 'solid'} ${copper ? T.copper : T.border}`,
    margin: 0,
    ...style,
  }}/>;
};

// Code-comment divider e.g. "// section name"
window.AxiusComment = function ({ children, copper }) {
  const T = window.AxiusTokens;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: T.fontMono, fontSize: 11, color: copper ? T.copper : T.inkMute,
      letterSpacing: '0.12em', textTransform: 'uppercase',
    }}>
      <span style={{color: T.copper}}>//</span>
      <span>{children}</span>
    </div>
  );
};

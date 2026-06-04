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
  // Additional industry cells filled in Phase 9 Task 9.1.
};

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

// ════════════════════════════════════════════════════════════════════════
// OPTION 3 — V3 TAXONOMIES + DATA
// ════════════════════════════════════════════════════════════════════════
// Used exclusively by axius-direction-G.jsx (served at /v3). Option 2's
// existing AxiusIndustries/AxiusChallenges/AxiusOutcomes remain untouched.
// Note: Option 3's diagnostic writes V3 ids back into the same
// window.AxiusPersonalization store Option 2 uses. When a visitor lands
// on /v3 first and then visits /, Option 2's filter sees V3 ids it does
// not recognize and falls back to its generic catalog state — acceptable.

window.AxiusIndustriesV3 = [
  { id: 'realestate',  label: 'Real Estate',          labelEs: 'Inmobiliaria' },
  { id: 'healthcare',  label: 'Healthcare',           labelEs: 'Salud' },
  { id: 'professional',label: 'Professional Services',labelEs: 'Servicios Profesionales' },
  { id: 'ecommerce',   label: 'Ecommerce',            labelEs: 'Ecommerce' },
  { id: 'education',   label: 'Education',            labelEs: 'Educación' },
  { id: 'other',       label: 'Other',                labelEs: 'Otro' },
];

window.AxiusChallengesV3 = [
  { id: 'manual',    label: 'Manual Work',          labelEs: 'Trabajo Manual' },
  { id: 'sales',     label: 'Sales',                labelEs: 'Ventas' },
  { id: 'support',   label: 'Customer Support',     labelEs: 'Soporte al Cliente' },
  { id: 'ops',       label: 'Internal Operations',  labelEs: 'Operaciones Internas' },
  { id: 'reporting', label: 'Reporting',            labelEs: 'Reportería' },
  { id: 'scaling',   label: 'Scaling',              labelEs: 'Escalamiento' },
];

window.AxiusOutcomesV3 = [
  { id: 'revenue',     label: 'More Revenue',     labelEs: 'Más Ingresos' },
  { id: 'execution',   label: 'Faster Execution', labelEs: 'Ejecución más Rápida' },
  { id: 'visibility',  label: 'Better Visibility',labelEs: 'Más Visibilidad' },
  { id: 'costs',       label: 'Lower Costs',      labelEs: 'Menores Costos' },
  { id: 'chaos',       label: 'Less Chaos',       labelEs: 'Menos Caos' },
];

// Stage definitions for "THE AXIUS METHOD" (4 stages)
window.AxiusMethodV3 = [
  { n: '01', name: 'ASSESS',    bullets: ['Understand the business.', 'Identify bottlenecks.', 'Find opportunities.'],
                                bulletsEs: ['Entender el negocio.', 'Identificar cuellos de botella.', 'Encontrar oportunidades.'] },
  { n: '02', name: 'ARCHITECT', bullets: ['Design systems.', 'Prioritize initiatives.', 'Build the roadmap.'],
                                bulletsEs: ['Diseñar sistemas.', 'Priorizar iniciativas.', 'Construir el roadmap.'] },
  { n: '03', name: 'OPERATE',   bullets: ['Implement.', 'Maintain.', 'Optimize.', 'Own execution.'],
                                bulletsEs: ['Implementar.', 'Mantener.', 'Optimizar.', 'Ser dueños de la ejecución.'] },
  { n: '04', name: 'EVOLVE',    bullets: ['Improve continuously.', 'Increase leverage.', 'Expand capacity.'],
                                bulletsEs: ['Mejorar continuamente.', 'Aumentar el apalancamiento.', 'Expandir capacidad.'] },
];

// 3 model pillars
window.AxiusModelV3 = [
  { id: 'human',  name: 'HUMAN LEADERSHIP',
    bullets: ['Direction', 'Ownership', 'Decision-Making', 'Accountability'],
    bulletsEs: ['Dirección', 'Propiedad', 'Toma de decisiones', 'Responsabilidad'] },
  { id: 'ai',     name: 'AI WORKFORCE',
    bullets: ['Immediate Response', 'Monitoring', 'Documentation', 'Execution Support', 'Operational Continuity'],
    bulletsEs: ['Respuesta inmediata', 'Monitoreo', 'Documentación', 'Soporte de ejecución', 'Continuidad operativa'] },
  { id: 'specialist', name: 'SPECIALIST NETWORK',
    bullets: ['Engineering', 'Automation', 'Design', 'Infrastructure', 'Advanced Implementation'],
    bulletsEs: ['Ingeniería', 'Automatización', 'Diseño', 'Infraestructura', 'Implementación avanzada'] },
];

// Comparison table for "WHY AXIUS"
window.AxiusComparisonV3 = [
  { freelancer: 'Expertise',         employee: 'Time',                axius: 'Ownership',
    freelancerEs: 'Experticia',      employeeEs: 'Tiempo',            axiusEs: 'Propiedad' },
  { freelancer: 'Limited Capacity',  employee: 'Internal Dependency', axius: 'Continuous Coverage',
    freelancerEs: 'Capacidad Limitada', employeeEs: 'Dependencia Interna', axiusEs: 'Cobertura Continua' },
  { freelancer: 'Multiple Vendors',  employee: 'Single Hire',         axius: 'Full Operating Layer',
    freelancerEs: 'Múltiples Proveedores', employeeEs: 'Una Sola Contratación', axiusEs: 'Capa Operativa Completa' },
  { freelancer: 'Reactive Work',     employee: 'Internal Management', axius: 'Ongoing Improvement',
    freelancerEs: 'Trabajo Reactivo', employeeEs: 'Gestión Interna',   axiusEs: 'Mejora Continua' },
];

// "What Changes" before/after for WhatChangesV3
window.AxiusBeforeAfterV3 = {
  before: ['Developers', 'Automations', 'CRM', 'Website', 'AI tools', 'Support systems', 'Integrations'],
  beforeEs: ['Desarrolladores', 'Automatizaciones', 'CRM', 'Sitio web', 'Herramientas de IA', 'Sistemas de soporte', 'Integraciones'],
  after: ['Technology operations', 'System performance', 'Workflow optimization', 'AI implementation', 'Vendor coordination', 'Operational continuity'],
  afterEs: ['Operaciones tecnológicas', 'Rendimiento de sistemas', 'Optimización de flujos', 'Implementación de IA', 'Coordinación de proveedores', 'Continuidad operativa'],
  // Outcome metric tiles (fabricated — auto-unmount past 2026-08-01)
  outcomeMetrics: [
    { label: 'FASTER EXECUTION',  value: '10×' },
    { label: 'OPERATIONAL COST',  value: '3× LOWER' },
    { label: 'RESPONSE SPEED',    value: 'IMMEDIATE AI' },
    { label: 'VISIBILITY',        value: 'FULL REPORTING' },
  ],
};

// Industry-specific workflow recommendations for V3 (only realestate authored)
window.AxiusRecommendationsV3 = {
  realestate: {
    sales:      ['Lead Qualification', 'Missed Call Recovery', 'Appointment Scheduling'],
    operations: ['CRM Management', 'Document Workflows', 'Reporting Systems'],
    ai:         ['Voice Agents', 'Follow-up Automation', 'Lead Routing'],
  },
  // Other industries: G.jsx falls back to a generic 3×3 from AxiusCatalog samples
};

// V3 pricing tile definitions (price strings only — wired to existing Stripe Payment Links)
window.AxiusPricingV3 = [
  { id: 'operator',   name: 'Operator',
    sub:   'Technology ownership for a few critical systems.',
    subEs: 'Propiedad tecnológica para algunos sistemas críticos.',
    priceLine:   'Starting at $2,500/mo',
    priceLineEs: 'Desde $2,500/mes',
    checkoutUrl: 'https://buy.stripe.com/4gM14m13W4x1dQo7CLcbC01',
    featured: false },
  { id: 'team',       name: 'Team',
    sub:   'Continuous operational improvement.',
    subEs: 'Mejora operativa continua.',
    priceLine:   'Starting at $5,000/mo',
    priceLineEs: 'Desde $5,000/mes',
    checkoutUrl: 'https://buy.stripe.com/3cIdR86oge7BbIg0ajcbC02',
    featured: true },
  { id: 'department', name: 'Department',
    sub:   'Custom Engagement',
    subEs: 'Engagement Personalizado',
    body:   'Technology leadership. Operational ownership. Dedicated capacity.',
    bodyEs: 'Liderazgo tecnológico. Propiedad operativa. Capacidad dedicada.',
    priceLine:   null,
    priceLineEs: null,
    checkoutUrl: null, // Triggers booking-conversation CTA instead
    featured: false },
];

// Proof results by industry (fabricated — auto-unmount past 2026-08-01)
window.AxiusProofV3 = [
  { industry: 'Real Estate',          industryEs: 'Inmobiliaria',
    metric: 'Lead Response Time',     metricEs: 'Tiempo de Respuesta a Leads',
    value:  '4h → 3m' },
  { industry: 'Healthcare',           industryEs: 'Salud',
    metric: 'No-Shows',               metricEs: 'No-Shows',
    value:  '-65%' },
  { industry: 'Professional Services',industryEs: 'Servicios Profesionales',
    metric: 'Administrative Work',    metricEs: 'Trabajo Administrativo',
    value:  '-70%' },
];

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

// ════════════════════════════════════════════════════════════════════════
// OPTION 4 — COMMERCIAL-READY VARIANT (served at /v4)
// ════════════════════════════════════════════════════════════════════════
// Used exclusively by axius-direction-H.jsx. Reuses V3 taxonomies and most
// V3 content data. Adds commercial-specific structures: footer, sticky CTA,
// structured data for SEO.

// Update AxiusConfig with the live booking URL (additive — does NOT mutate
// existing fields). If AxiusConfig.bookingUrl was already set elsewhere,
// preserve it; otherwise set to the discovery-call Cal link.
if (window.AxiusConfig && !window.AxiusConfig.bookingUrl) {
  window.AxiusConfig.bookingUrl = 'https://cal.com/andrestoro/discovery-call';
}

window.AxiusFooterV4 = {
  legalEntity: 'Axius — Independent Technology Operations Practice',
  legalEntityEs: 'Axius — Práctica Independiente de Operaciones Tecnológicas',
  basedLine:    'Operating from Medellín, Colombia · Altamonte Springs, FL',
  basedLineEs:  'Operando desde Medellín, Colombia · Altamonte Springs, FL',
  email:        'andres@axius.tech',
  copyrightYear: 2026,
  columns: [
    { headEn: 'Practice',   headEs: 'Práctica',
      links: [
        { labelEn: 'Capabilities',   labelEs: 'Capacidades',  href: '#catalog' },
        { labelEn: 'The Method',     labelEs: 'El Método',    href: '#method' },
        { labelEn: 'The Model',      labelEs: 'El Modelo',    href: '#model' },
        { labelEn: 'Pricing',        labelEs: 'Precios',      href: '#pricing' },
      ],
    },
    { headEn: 'About',       headEs: 'Acerca',
      links: [
        { labelEn: 'Founder',        labelEs: 'Fundador',     href: '#founder' },
        { labelEn: 'Proof',          labelEs: 'Pruebas',      href: '#proof' },
        { labelEn: 'Contact',        labelEs: 'Contacto',     href: 'mailto:andres@axius.tech' },
        { labelEn: 'Book a Call',    labelEs: 'Agendar Llamada', href: 'https://cal.com/andrestoro/discovery-call' },
      ],
    },
    { headEn: 'Legal',       headEs: 'Legal',
      links: [
        { labelEn: 'Privacy Policy', labelEs: 'Política de Privacidad', href: '/v4/privacy.html' },
        { labelEn: 'Terms of Service', labelEs: 'Términos de Servicio', href: '/v4/terms.html' },
      ],
    },
  ],
};

// Sticky scroll CTA bar — appears after hero scrolls out of view
window.AxiusStickyCTAV4 = {
  scrollThresholdVh: 90,  // appears after scrolling past ~one viewport
  primary: {
    labelEn: 'Book a Call', labelEs: 'Agendar Llamada',
    href:    'https://cal.com/andrestoro/discovery-call',
  },
  secondary: {
    labelEn: 'See Pricing', labelEs: 'Ver Precios',
    href: '#pricing',
  },
  brand: { labelEn: 'AXIUS', labelEs: 'AXIUS' },
};

// Structured data (JSON-LD) for SEO. Rendered as a <script type="application/ld+json">
// in v4/index.html — defined here so future updates land in one place.
window.AxiusJsonLdV4 = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Axius',
  description: 'Independent technology operations practice. We run the tech side of your business so you can focus on growing it.',
  url: 'https://axius-tech-website.vercel.app/v4/',
  image: 'https://axius-tech-website.vercel.app/assets/og.jpg',
  email: 'andres@axius.tech',
  founder: { '@type': 'Person', name: 'Andrés Toro' },
  address: [
    { '@type': 'PostalAddress', addressLocality: 'Medellín', addressCountry: 'CO' },
    { '@type': 'PostalAddress', addressLocality: 'Altamonte Springs', addressRegion: 'FL', addressCountry: 'US' },
  ],
  serviceType: ['Technology Operations', 'Business Process Automation', 'AI Implementation', 'CRM Integration'],
  priceRange: '$2,500 - $5,000 per month',
  offers: [
    { '@type': 'Offer', name: 'Operator', priceCurrency: 'USD', price: '2500',
      description: 'Technology ownership for a few critical systems' },
    { '@type': 'Offer', name: 'Team', priceCurrency: 'USD', price: '5000',
      description: 'Continuous operational improvement' },
    { '@type': 'Offer', name: 'Department',
      description: 'Custom engagement — technology leadership and operational ownership' },
  ],
  sameAs: [
    'https://cal.com/andrestoro/discovery-call',
  ],
};

// ════════════════════════════════════════════════════════════════════════
// OPTION 5 — FINAL VARIANT (served at /v5)
// ════════════════════════════════════════════════════════════════════════
// Restores Option 1 (E05) premium micro-interactions on top of Option 3
// architecture + Option 4 commercial polish.

window.AxiusVideoIntroV5 = {
  // Editorial typographic motion: 20-30s sequence, skippable
  durationSec: 24,
  frames: [
    { atMs: 0,    en: 'Run',                       es: 'Tú llevas' },
    { atMs: 1200, en: 'your business.',            es: 'tu negocio.' },
    { atMs: 2400, en: 'Not your tech.',            es: 'No tu tech.' },
    { atMs: 5500, en: 'For real-estate operators —', es: 'Para operadores inmobiliarios —' },
    { atMs: 8000, en: 'For agency founders —',     es: 'Para fundadores de agencia —' },
    { atMs: 10500, en: 'For wellness operators —', es: 'Para operadores de bienestar —' },
    { atMs: 13000, en: 'For hospitality operators —', es: 'Para operadores de hostelería —' },
    { atMs: 15500, en: 'For ecommerce operators —', es: 'Para operadores de ecommerce —' },
    { atMs: 18000, en: 'For healthcare operators —', es: 'Para operadores de salud —' },
    { atMs: 21000, en: 'Run by Andrés Toro · Medellín · Florida', es: 'Operado por Andrés Toro · Medellín · Florida' },
  ],
};

// Hero badge per industry — surfaced ABOVE the H1 when personalized
window.AxiusHeroBadgeV5 = {
  realestate:   { en: 'FOR REAL ESTATE OPERATORS',         es: 'PARA OPERADORES INMOBILIARIOS' },
  healthcare:   { en: 'FOR HEALTHCARE OPERATORS',          es: 'PARA OPERADORES DE SALUD' },
  professional: { en: 'FOR PROFESSIONAL SERVICES',         es: 'PARA SERVICIOS PROFESIONALES' },
  ecommerce:    { en: 'FOR ECOMMERCE OPERATORS',           es: 'PARA OPERADORES DE ECOMMERCE' },
  education:    { en: 'FOR EDUCATION OPERATORS',           es: 'PARA OPERADORES DE EDUCACIÓN' },
  other:        { en: 'FOR INDEPENDENT OPERATORS',         es: 'PARA OPERADORES INDEPENDIENTES' },
};

// 'Most Requested' cross-category top 6 workflows
window.AxiusMostRequestedV5 = [
  { n: '001', category: 'sales',    name: 'Missed-call recovery',         metric: '11 leads recovered / mo avg' },
  { n: '017', category: 'cx',       name: 'AI FAQ chatbot',               metric: '60-80% support deflection' },
  { n: '035', category: 'ops',      name: 'Cross-tool sync',              metric: 'CRM ↔ accounting ↔ projects' },
  { n: '050', category: 'ai',       name: 'Knowledge-base agent',         metric: 'RAG over your docs' },
  { n: '064', category: 'data',     name: 'Dashboard automation',         metric: 'Revenue · ops · sales' },
  { n: '107', category: 'grow',     name: 'Email marketing automation',   metric: 'Transactional + segmented' },
];

// Per-workflow operational metrics (fabricated, gated by axiusFabricationLive)
// Used inside Catalog rows to give each capability a numeric handle
window.AxiusWorkflowMetricsV5 = {
  '001': '4h → 3m response',     '002': '47% reactivation rate',  '003': '3× faster qualification',
  '017': '~70% deflection',      '018': '8h SLA → <1h',           '019': '5 inboxes → 1',
  '034': '45min → 8min onboard', '035': 'eliminates 12 manual hops','037': '$1.4k/mo SaaS savings',
  '050': '90s answer vs 12min search', '052': '2.3× pipeline accuracy', '064': 'live ops board',
  '077': '4-week prod ship',     '107': '38% open rate avg',       '120': 'sub-day audio output',
};

// FAQ — refreshed for Option 5 positioning
window.AxiusFAQV5 = [
  { q: 'Is this an agency, or a contractor, or what exactly?',
    a: 'Neither. Axius is a small operating practice — one accountable operator (Andrés) running your technology layer, with a vetted specialist bench underneath when work needs depth. Same hand on your stack month after month.',
    qEs: '¿Esto es una agencia, un contratista, o qué exactamente?',
    aEs: 'Ninguno. Axius es una práctica operativa pequeña — un operador responsable (Andrés) llevando tu capa de tecnología, con un banco de especialistas verificados debajo cuando el trabajo necesita profundidad. La misma mano en tu stack mes a mes.' },
  { q: 'What if I already have a developer / agency / contractor?',
    a: 'We work alongside them where it makes sense. Axius is the layer that coordinates, documents, and ensures things compound — not necessarily a replacement. Most clients keep specialists on contract and use Axius for ownership.',
    qEs: '¿Qué pasa si ya tengo un desarrollador / agencia / contratista?',
    aEs: 'Trabajamos en paralelo con ellos donde tiene sentido. Axius es la capa que coordina, documenta y asegura que las cosas compongan — no necesariamente un reemplazo. La mayoría de clientes mantienen especialistas y usan Axius para propiedad operativa.' },
  { q: 'How do you handle confidentiality?',
    a: 'NDA on every engagement, before access. We use access-scoped credentials with rotation. Everything lives in your accounts, not ours — Axius operates inside your stack, not in a black box.',
    qEs: '¿Cómo manejan la confidencialidad?',
    aEs: 'NDA en cada engagement, antes del acceso. Usamos credenciales con scope limitado y rotación. Todo vive en tus cuentas, no en las nuestras — Axius opera dentro de tu stack, no en una caja negra.' },
  { q: 'What does the first 30 days actually look like?',
    a: 'Week 1: discovery + audit of current stack. Week 2: roadmap + priorities + first win identified. Week 3-4: first system stood up + monitored + documented. You get a written ops report monthly thereafter.',
    qEs: '¿Cómo se ven realmente los primeros 30 días?',
    aEs: 'Semana 1: descubrimiento + auditoría del stack actual. Semana 2: roadmap + prioridades + primera win identificada. Semana 3-4: primer sistema implementado + monitoreado + documentado. Recibes un reporte operativo escrito mensual a partir de ahí.' },
  { q: 'Can I pause or cancel?',
    a: 'Pause anytime after 90 days. Cancel with 30 days notice. We give you full documentation of every system on the way out — nothing locks you in.',
    qEs: '¿Puedo pausar o cancelar?',
    aEs: 'Pausa en cualquier momento después de 90 días. Cancelar con 30 días de aviso. Te entregamos documentación completa de cada sistema al salir — nada te ata.' },
  { q: 'Where are you based?',
    a: 'Medellín, Colombia. Remote-first. US business hours by default. Available in EN and ES.',
    qEs: '¿Dónde están ubicados?',
    aEs: 'Medellín, Colombia. Trabajamos 100% remoto. Horario laboral de EE.UU. por defecto. Disponibles en EN y ES.' },
  { q: 'What is the Founder Track?',
    a: 'For founders running multiple businesses or building a portfolio — one Axius operator across all of them, shared monthly fee, with continuity. Reach out for details.',
    qEs: '¿Qué es el Founder Track?',
    aEs: 'Para fundadores que operan múltiples negocios o construyen un portafolio — un solo operador de Axius en todos, cuota mensual compartida, con continuidad. Contáctanos para detalles.' },
];

// Nav links for the new Option 5 top bar
window.AxiusNavV5 = [
  { labelEn: 'Catalog',     labelEs: 'Catálogo',     href: '#catalog' },
  { labelEn: 'How it Runs', labelEs: 'Cómo Opera',   href: '#how-it-runs' },
  { labelEn: 'Pricing',     labelEs: 'Precios',      href: '#pricing' },
  { labelEn: 'Founder',     labelEs: 'Fundador',     href: '#founder' },
];

// Updated pricing for V5 (setup fee restored, Founder Track badge added)
window.AxiusPricingV5 = [
  { id: 'operator', name: 'Operator',
    sub:   'Technology ownership for a few critical systems.',
    subEs: 'Propiedad tecnológica para algunos sistemas críticos.',
    priceMonthly:   '$2,500/mo',
    priceMonthlyEs: '$2,500/mes',
    priceSetup:     '+ $1,250 setup',
    priceSetupEs:   '+ $1,250 configuración',
    founderTrackBadge: { en: 'FOUNDER TRACK', es: 'FOUNDER TRACK' },
    founderTrackNote: { en: 'For founders running multiple businesses — one operator across all of them.',
                         es: 'Para fundadores que operan múltiples negocios — un solo operador para todos.' },
    checkoutUrl: 'https://buy.stripe.com/4gM14m13W4x1dQo7CLcbC01',
    featured: false,
    features: [
      'One critical system, owned end to end',
      'Email + Slack · same-day response on issues',
      'Monthly operations report',
      'Pause anytime after 90 days',
    ],
    featuresEs: [
      'Un sistema crítico, propiedad de punta a punta',
      'Email + Slack · respuesta el mismo día',
      'Reporte operativo mensual',
      'Pausa en cualquier momento después de 90 días',
    ],
  },
  { id: 'team', name: 'Team',
    sub:   'Continuous operational improvement.',
    subEs: 'Mejora operativa continua.',
    priceMonthly:   '$5,000/mo',
    priceMonthlyEs: '$5,000/mes',
    priceSetup:     '+ $2,500 setup',
    priceSetupEs:   '+ $2,500 configuración',
    checkoutUrl: 'https://buy.stripe.com/3cIdR86oge7BbIg0ajcbC02',
    featured: true,
    features: [
      'Multiple coordinated systems',
      'Biweekly ops call · <24h response window',
      'Monthly written report + quarterly strategy',
      'First-month outcome guarantee',
    ],
    featuresEs: [
      'Múltiples sistemas coordinados',
      'Llamada operativa quincenal · respuesta <24h',
      'Reporte mensual + estrategia trimestral',
      'Garantía de resultado el primer mes',
    ],
  },
  { id: 'department', name: 'Department',
    sub:   'Custom Engagement',
    subEs: 'Engagement Personalizado',
    body:   'Technology leadership. Operational ownership. Dedicated capacity.',
    bodyEs: 'Liderazgo tecnológico. Propiedad operativa. Capacidad dedicada.',
    priceMonthly:   null,
    priceMonthlyEs: null,
    priceSetup:     null,
    priceSetupEs:   null,
    checkoutUrl: null,
    featured: false,
    features: [
      'Named operator dedicated to your business',
      '24/7 access · same-hour response on critical',
      'Quarterly executive review + roadmap',
      'Full system documentation + risk register',
    ],
    featuresEs: [
      'Operador asignado dedicado a tu negocio',
      'Acceso 24/7 · respuesta en la hora en críticos',
      'Revisión ejecutiva trimestral + roadmap',
      'Documentación completa del sistema + registro de riesgos',
    ],
  },
];

// "Before and after Axius" — the replacement for What Changes
// (uses AxiusBeforeAfterV3 for the lists, adds metrics + intro copy)
window.AxiusBeforeAndAfterV5 = {
  eyebrow:   { en: 'BEFORE AND AFTER AXIUS', es: 'ANTES Y DESPUÉS DE AXIUS' },
  title:     { en: 'You started a business. Not a technology department.',
               es: 'Empezaste un negocio. No un departamento de tecnología.' },
  // Conditional "before" copy keyed by friction id (V3 challenge id)
  frictionBefore: {
    manual:    { en: "Twelve manual hops between tools, every week.", es: "Doce saltos manuales entre herramientas, cada semana." },
    sales:     { en: "Leads slipping through, follow-up depending on memory.", es: "Leads escapándose, seguimiento dependiendo de la memoria." },
    support:   { en: "Five inboxes, no triage, customers waiting hours.", es: "Cinco inboxes, sin triage, clientes esperando horas." },
    ops:       { en: "Three contractors, eight tools, nobody owning the stack.", es: "Tres contratistas, ocho herramientas, nadie dueño del stack." },
    reporting: { en: "Reports take days. By the time they're done they're stale.", es: "Los reportes toman días. Para cuando están listos, ya están desactualizados." },
    scaling:   { en: "Growing means hiring. Hiring means hiring problems.", es: "Crecer significa contratar. Contratar significa contratar problemas." },
  },
  afterUniversal: {
    en: 'One accountable operator running the layer, every month, with documented systems.',
    es: 'Un operador responsable llevando la capa, cada mes, con sistemas documentados.',
  },
  metrics: [  // Fabricated, gated by axiusFabricationLive
    { label: 'FASTER EXECUTION',  value: '10×' },
    { label: 'OPERATIONAL COST',  value: '3× LOWER' },
    { label: 'RESPONSE SPEED',    value: 'IMMEDIATE AI' },
    { label: 'VISIBILITY',        value: 'FULL REPORTING' },
  ],
};

// ─── ADDITIVE: Option 5 branding pass (Option 1 parity) ──────────
// Overwrite frictionBefore with editorial period-separated poems
// matching Option 1's "Mess" cadence (4-5 short lines per friction).
window.AxiusBeforeAndAfterV5.frictionBefore = {
  manual: {
    en: 'Twelve manual hops.\nThree CRMs.\nTwo spreadsheets.\nDifferent numbers each time.\nNobody owns the chain.',
    es: 'Doce saltos manuales.\nTres CRMs.\nDos planillas.\nNúmeros distintos cada vez.\nNadie es dueño de la cadena.',
  },
  sales: {
    en: 'Leads come in.\nLeads get lost.\nFollow-up depends on memory.\nPipeline depends on Monday.\nNobody owns the chase.',
    es: 'Los leads entran.\nLos leads se pierden.\nEl follow-up depende de la memoria.\nEl pipeline depende del lunes.\nNadie es dueño del seguimiento.',
  },
  support: {
    en: 'Five inboxes.\nNo triage.\nCustomers waiting hours.\nThe same question, every week.\nNobody owns the queue.',
    es: 'Cinco inboxes.\nSin triage.\nClientes esperando horas.\nLa misma pregunta, cada semana.\nNadie es dueño de la cola.',
  },
  ops: {
    en: 'Three contractors.\nEight tools.\nThree paid for the same problem.\nNobody talking to anybody.\nNobody owns the stack.',
    es: 'Tres contratistas.\nOcho herramientas.\nTres pagadas por el mismo problema.\nNadie hablando con nadie.\nNadie es dueño del stack.',
  },
  reporting: {
    en: 'Reports take days.\nNumbers change overnight.\nDecisions wait on email threads.\nThe board asks the wrong questions.\nNobody owns the truth.',
    es: 'Los reportes toman días.\nLos números cambian de noche a la mañana.\nLas decisiones esperan en hilos de email.\nLa junta hace las preguntas equivocadas.\nNadie es dueño de la verdad.',
  },
  scaling: {
    en: 'Growth means hiring.\nHiring means hiring problems.\nNew people. New tools. New process.\nThe old chaos, larger.\nNobody owns the scale.',
    es: 'Crecer significa contratar.\nContratar significa contratar problemas.\nNueva gente. Nuevas herramientas. Nuevo proceso.\nEl mismo caos, más grande.\nNadie es dueño de la escala.',
  },
};

// Hero eyebrow strings — practice line (left) + ONLY ACCEPTING pill (right).
window.AxiusHeroEyebrowsV5 = {
  practiceLine:    { en: 'Axius — An independent technology operations practice',
                     es: 'Axius — Una práctica independiente de operaciones tecnológicas' },
  acceptingPre:    { en: 'ONLY ACCEPTING', es: 'SOLO ACEPTANDO' },
  acceptingAccent: { en: '3 NEW CLIENTS / MONTH', es: '3 CLIENTES NUEVOS / MES' },
};

// ════════════════════════════════════════════════════════════════════════
// OPTION 5 REBUILD — additional data for the E05-forked direction-J
// ════════════════════════════════════════════════════════════════════════

// Founder Track program (rendered as a separate callout below pricing, not
// as a tier badge). Sky-blue accent distinguishes it from the regular tiers.
window.AxiusFounderTrackV5 = {
  eyebrow:   { en: 'FOUNDER TRACK',                          es: 'FOUNDER TRACK' },
  title:     { en: 'A separate program for founders.',       es: 'Un programa aparte para fundadores.' },
  body:      { en: 'For founders running multiple businesses or building a portfolio — one Axius operator across all of them, shared monthly engagement, with continuity. By application only.',
               es: 'Para fundadores que operan múltiples negocios o construyen un portafolio — un solo operador de Axius en todos, engagement mensual compartido, con continuidad. Solo por aplicación.' },
  ctaLabel:  { en: 'Apply for Founder Track →',              es: 'Aplicar al Founder Track →' },
  ctaHref:   'mailto:andres@axius.tech?subject=Founder Track inquiry',
  accent:    '#6A8194',
};

// Strings for the entry experience (video + industry dispatch)
window.AxiusEntryV5 = {
  videoSkipLabel: { en: 'SKIP →',                            es: 'SALTAR →' },
  questionTitle:  { en: 'What kind of business are you running?', es: '¿Qué tipo de negocio operas?' },
  questionEyebrow:{ en: '00 · DISPATCH',                     es: '00 · DESPACHO' },
  skipQuestion:   { en: 'Skip — show me everything →',       es: 'Saltar — muéstrame todo →' },
  industryBadgeTemplate: { en: 'AXIUS — TECHNOLOGY OPERATING PARTNER FOR {INDUSTRY}',
                           es: 'AXIUS — PARTNER DE OPERACIONES TECNOLÓGICAS PARA {INDUSTRY}' },
  industryBadgeOther:    { en: 'AXIUS — TECHNOLOGY OPERATING PARTNER FOR INDEPENDENT OPERATORS',
                           es: 'AXIUS — PARTNER DE OPERACIONES TECNOLÓGICAS PARA OPERADORES INDEPENDIENTES' },
  industryOtherPlaceholder: { en: 'Tell us — one word',      es: 'Cuéntanos — una palabra' },
};

// Replace afterUniversal with the concise version + add afterSecondary line
window.AxiusBeforeAndAfterV5.afterUniversal = {
  en: 'One operator. One layer. Documented systems that compound monthly.',
  es: 'Un operador. Una capa. Sistemas documentados que componen cada mes.',
};
window.AxiusBeforeAndAfterV5.afterSecondary = {
  en: 'Same hand on the work, month after month.',
  es: 'La misma mano en el trabajo, mes tras mes.',
};

// 5 metric tiles (added OPERATIONAL PRECISION; "IMMEDIATE AI" → "IMMEDIATE")
window.AxiusBeforeAndAfterV5.metrics = [
  { label: { en: 'FASTER EXECUTION',      es: 'EJECUCIÓN MÁS RÁPIDA' },     value: '10×' },
  { label: { en: 'OPERATIONAL COST',      es: 'COSTO OPERATIVO' },          value: '3× LOWER' },
  { label: { en: 'OPERATIONAL PRECISION', es: 'PRECISIÓN OPERATIVA' },      value: 'DOCUMENTED' },
  { label: { en: 'RESPONSE SPEED',        es: 'VELOCIDAD DE RESPUESTA' },   value: 'IMMEDIATE' },
  { label: { en: 'VISIBILITY',            es: 'VISIBILIDAD' },              value: 'FULL REPORTING' },
];

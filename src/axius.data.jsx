// ════════════════════════════════════════════════════════════════
// AXIUS DATA — English-only content for the 2026 rebuild.
// Spanish copy is preserved in reference/_es-archive.jsx for the
// future /es route. Integration endpoints keep the AxiusConfig +
// AxiusSecrets pattern so the existing Telegram / Stripe / Cal.com
// wiring carries over unchanged.
// ════════════════════════════════════════════════════════════════

// ─── ENDPOINTS / EXTERNAL LINKS ─────────────────────────────────
window.AxiusConfig = {
  bookingUrl:  'https://cal.com/andrestoro/discovery-call',
  linkedinUrl: 'https://www.linkedin.com/in/followrace/',
  whatsappNumber: '',
  phoneNumber: '',
  ringBehavior: 'inChat',
  // PLACEHOLDERS — real credentials live in reference/axius-secrets.local.jsx
  ringWebhookUrl: 'https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/sendMessage',
  ringWebhookChatId: 'YOUR_TELEGRAM_CHAT_ID',
  ringUseForumTopics: true,
  // Stripe Payment Links per tier (department is a custom engagement)
  checkoutUrls: {
    operator: 'https://buy.stripe.com/4gM14m13W4x1dQo7CLcbC01',
    team:     'https://buy.stripe.com/3cIdR86oge7BbIg0ajcbC02',
  },
};

// Secret overrides (gitignored file defines window.AxiusSecrets first)
(function applySecretOverrides() {
  var s = (typeof window !== 'undefined' && window.AxiusSecrets) || null;
  if (!s) return;
  var cfg = window.AxiusConfig;
  if (s.telegramBotToken) cfg.ringWebhookUrl = 'https://api.telegram.org/bot' + s.telegramBotToken + '/sendMessage';
  if (s.telegramChatId)   cfg.ringWebhookChatId = String(s.telegramChatId);
  if (s.whatsappNumber)   cfg.whatsappNumber = s.whatsappNumber;
  if (s.phoneNumber)      cfg.phoneNumber = s.phoneNumber;
  if (s.checkoutUrls)     cfg.checkoutUrls = Object.assign({}, cfg.checkoutUrls, s.checkoutUrls);
})();

window.AXD = {

  // ─── NAV ────────────────────────────────────────────────────
  nav: {
    links: [
      { label: 'Method',   id: 'method' },
      { label: 'Catalog',  id: 'catalog' },
      { label: 'Pricing',  id: 'pricing' },
      { label: 'Operator', id: 'operator' },
      { label: 'Stories',  id: 'stories' },
    ],
    cta: 'Begin',
  },

  // ─── INTRO (typographic entry — industries removed) ─────────
  intro: {
    frames: [
      { atMs: 0,    text: 'Run' },
      { atMs: 1100, text: 'your business.' },
      { atMs: 2300, text: 'Not your tech.' },
      { atMs: 4800, text: 'One operator. One accountable layer.' },
      { atMs: 7200, text: 'Axius · Andrés Toro · Medellín · Florida' },
    ],
    holdMs: 1900,         // hold on the last frame before resolving
    loading: 'AXIUS · LOADING',
    skip: 'SKIP →',
  },

  // ─── HERO ───────────────────────────────────────────────────
  hero: {
    practiceLine: 'Axius — An independent technology operations practice',
    acceptingPre: 'Only Accepting',
    acceptingAccent: '3 New Clients / Month',
    h1Line1: 'Run',
    h1Line2: 'your business.',
    h1Line3: 'Not your tech.',
    subPre: 'We take relentless ownership of your technology — managing every execution — through ',
    subEm:  'a single point of contact.',
    cta1: 'Begin',
    cta2: 'See the catalog',
    opLabel: 'Operator',
    opOnline: 'AI Online',
    opName: 'Andrés Toro',
    opRole: 'Founder · Operator · Medellín',
  },

  // ─── CHAT ───────────────────────────────────────────────────
  chat: {
    open: 'Standby chat · transcripts route to Andrés',
    greeting: "Most companies don't actually need more software. They need someone operating the systems they already have.\n\nTell me what's currently slowing the business down, breaking repeatedly, or depending too much on you. I'll show you how we'd structure it operationally.",
    placeholder: "Describe what's operationally frustrating…",
    replying: 'Andrés is replying…',
    send: 'Send ↵',
    ringSent: 'Andrés notified · transcript on its way',
    ringNoWebhook: 'standby · response window applies',
    ringNoAnswer: "Caught on a call — I'll reply here personally as soon as I'm free, usually within the day. The standby has full context and can keep moving in the meantime.",
    andresHere: 'Andrés got the transcript',
    suggestions: [
      'Everything depends on me',
      "We're drowning in tools",
      'Leads slip through the cracks',
      'Things keep breaking',
      'We need better systems',
      "Show me what you'd improve",
    ],
  },

  // ─── 01 · DIAGNOSTIC (form after the hero) ──────────────────
  diagnostic: {
    eyebrow: '01 · DIAGNOSTIC',
    titlePrefix: 'Thirty seconds. ',
    titleAccent: 'Three',
    titleSuffix: ' questions.',
    sub: 'Tell us where the operation hurts. You get a recommended starting point — and Andrés gets the context before you ever book a call.',
    q1: 'Where does the operation feel heaviest?',
    challenges: [
      { id: 'leadsleak',    label: 'Leads slip through the cracks' },
      { id: 'manualdata',   label: 'Manual data entry eats hours' },
      { id: 'commsscatter', label: 'Customer comms scattered across tools' },
      { id: 'bottleneck',   label: "I'm the bottleneck on everything" },
      { id: 'visibility',   label: "No visibility into what's working" },
      { id: 'handoffs',     label: 'Onboarding / handoffs are inconsistent' },
    ],
    q2: 'How much should Axius take on?',
    outcomes: [
      { id: 'fix-one',  tier: 'operator',   label: 'Fix one critical system reliably',     sub: 'Operator · from $2,500/mo' },
      { id: 'run-many', tier: 'team',       label: 'Run multiple systems with continuity', sub: 'Team · from $5,000/mo' },
      { id: 'delegate', tier: 'department', label: 'Fully delegate the technology layer',  sub: 'Department · custom engagement' },
    ],
    q3: 'Where should the audit go?',
    fields: {
      name:    { label: 'Name',     placeholder: 'Your name' },
      company: { label: 'Business', placeholder: 'Company / what you run' },
      email:   { label: 'Email',    placeholder: 'you@company.com' },
      note:    { label: 'Anything else', placeholder: 'Optional — context, tools, urgency…' },
    },
    submit: 'Send the diagnostic',
    back: '← Back',
    successTitle: 'Received.',
    successBody: "You'll hear from Andrés within one business day — with a one-page read on where your operation is leaking.",
    recommendLabel: 'Recommended starting point',
    bookCta: 'Book the 30-min call',
  },

  // ─── 02 · THE METHOD ────────────────────────────────────────
  method: {
    eyebrow: '02 · THE METHOD',
    titlePrefix: 'Four ',
    titleAccent: 'stages',
    titleSuffix: '. Each one named. Each one delivered.',
    stageLabel: 'Stage',
    artifactLabel: 'artifact',
    stages: [
      { n: '01', name: 'Audit',     body: 'Inventory the systems.\nFind the leaks.\nDeliver the report.',          artifact: 'stack_audit.pdf',   timing: 'Days 1–7' },
      { n: '02', name: 'Configure', body: 'Map workflows to your business.\nYou sign off in writing.',             artifact: 'config_map.json',   timing: 'Days 8–14' },
      { n: '03', name: 'Operate',   body: 'Run it.\nLog tickets. Ship fixes.\nReport monthly.',                    artifact: 'monthly_report.md', timing: 'Month 1+' },
      { n: '04', name: 'Evolve',    body: 'Review quarterly.\nThe roadmap stays yours.',                           artifact: 'roadmap.notion',    timing: 'Quarterly' },
    ],
  },

  // ─── 03 · HOW IT RUNS ───────────────────────────────────────
  howItRuns: {
    eyebrow: '03 · HOW IT RUNS',
    titlePrefix: 'Three roles. ',
    titleAccent: 'One',
    titleSuffix: ' accountable layer.',
    pillars: [
      { eyebrow: 'Operator', title: 'Owns direction and accountability.', bullets: [
        'Single point of contact',
        'Sets operational direction',
        'Owns outcomes and execution',
        'Accountable when systems change',
        'Same hand on your systems',
      ]},
      { eyebrow: 'AI systems', title: 'Increase speed and continuity.', bullets: [
        'Maintain workflow context',
        'Handle repetitive operational work',
        'Improve response times',
        'Monitor systems quietly in the background',
        'Keep documentation current',
      ]},
      { eyebrow: 'Specialists', title: 'Integrated when depth is needed.', bullets: [
        'Vetted specialists across the work',
        'Engineering, automation, design, infrastructure',
        'Managed entirely by the operator',
        'No vendor coordination on your side',
        'Quality controlled before delivery',
      ]},
    ],
  },

  // ─── 04 · THE CATALOG ───────────────────────────────────────
  catalog: {
    eyebrow: '04 · THE CATALOG',
    titlePrefix: 'An ',
    titleAccent: 'index',
    titleSuffix: ' of the work.',
    totalWorkflows: 129,
    workflowsLabel: 'workflows',
    categoriesLabel: '9 categories',
    capacityTitle: 'How capacity works',
    capacityBody: 'Each workflow carries a point value based on complexity, integrations, maintenance, and operational load — it\'s how we size an engagement. Most businesses start with 2–5 active workflows.',
    capacityExamples: [
      { name: 'AI chatbot', pts: 1 },
      { name: 'CRM automation', pts: 2 },
      { name: 'Internal dashboard', pts: 3 },
      { name: 'Custom application', pts: 5 },
    ],
    impactLabel: 'impact',
    moreOnRequest: (n) => `${n} more in this category — full index on request`,
    requestIndex: 'Request the full index',
    categories: [
      { id: 'sales', name: 'Sales & Prospecting', count: 16, stack: 'apollo · smartlead · hubspot · cal.com',
        samples: [
          { n: '001', name: 'Missed-call recovery',            sub: 'auto-text + callback queue',   pts: 1, time: '~ 3 days', impact: '4h → 3m response' },
          { n: '002', name: 'Dormant lead reactivation',       sub: 'sequence + scoring',           pts: 1, time: '~ 4 days', impact: '47% reactivation rate' },
          { n: '003', name: 'DM auto-qualification',           sub: 'IG · FB · WhatsApp',           pts: 1, time: '~ 5 days', impact: '3× faster qualification' },
          { n: '004', name: 'Voice agent inbound qualification', sub: 'Twilio · Vapi',              pts: 2, time: '~ 2 wks' },
        ]},
      { id: 'cx', name: 'Customer Experience & Support', count: 17, stack: 'zendesk · intercom · claude · whatsapp',
        samples: [
          { n: '017', name: 'AI FAQ chatbot',                  sub: 'web + WhatsApp',               pts: 1, time: '~ 3 days', impact: '~70% deflection' },
          { n: '018', name: 'Ticket triage & routing',         sub: 'sentiment + escalation',       pts: 2, time: '~ 1 wk',   impact: '8h SLA → <1h' },
          { n: '019', name: 'Multi-channel inbox unification', sub: 'email · SMS · IG · WhatsApp',  pts: 2, time: '~ 2 wks',  impact: '5 inboxes → 1' },
          { n: '020', name: 'Customer health scoring',         sub: 'real-time, operational',       pts: 2, time: '~ 2 wks' },
        ]},
      { id: 'ops', name: 'Internal Operations', count: 16, stack: 'notion · linear · stripe · gsuite',
        samples: [
          { n: '034', name: 'Document automation',             sub: 'proposals · SOWs · contracts', pts: 1, time: '~ 4 days', impact: '45min → 8min onboard' },
          { n: '035', name: 'Cross-tool sync',                 sub: 'CRM ↔ accounting ↔ projects',  pts: 2, time: '~ 2 wks',  impact: 'eliminates 12 manual hops' },
          { n: '036', name: 'Compliance check automation',     sub: 'GDPR · CCPA · audits',         pts: 2, time: '~ 2 wks' },
          { n: '037', name: 'SaaS subscription audit',         sub: 'kill ghost spend',             pts: 1, time: '~ 2 days', impact: '$1.4k/mo SaaS savings' },
        ]},
      { id: 'ai', name: 'AI Implementation', count: 14, stack: 'claude · openai · vector dbs',
        samples: [
          { n: '050', name: 'Knowledge-base agent',            sub: 'RAG over your docs',           pts: 2, time: '~ 2 wks', impact: '90s answer vs 12min search' },
          { n: '051', name: 'Sales call analyzer',             sub: 'transcripts → insights',       pts: 2, time: '~ 1 wk' },
          { n: '052', name: 'Predictive lead scoring',         sub: 'CRM-grounded',                 pts: 2, time: '~ 2 wks', impact: '2.3× pipeline accuracy' },
          { n: '053', name: 'Custom multi-step agents',        sub: 'decision workflows',           pts: 2, time: '~ 2 wks' },
        ]},
      { id: 'data', name: 'Data & Analytics', count: 13, stack: 'supabase · metabase · postgres',
        samples: [
          { n: '064', name: 'Dashboard automation',            sub: 'revenue · ops · sales',        pts: 1, time: '~ 1 wk', impact: 'live ops board' },
          { n: '065', name: 'Multi-touch revenue attribution', sub: 'cross-channel',                pts: 2, time: '~ 2 wks' },
          { n: '066', name: 'LTV / churn modeling',            sub: 'predictive',                   pts: 2, time: '~ 3 wks' },
          { n: '067', name: 'Custom data warehouse',           sub: 'Snowflake / BigQuery',         pts: 3, time: '~ 4 wks' },
        ]},
      { id: 'web', name: 'Website & Digital Storefront', count: 15, stack: 'next.js · framer · shopify · webflow',
        samples: [
          { n: '077', name: 'Marketing site',                  sub: 'next.js · framer · webflow',   pts: 3, time: '~ 4 wks', impact: '4-week prod ship' },
          { n: '078', name: 'E-commerce setup',                sub: 'shopify · woocommerce',        pts: 3, time: '~ 4 wks' },
          { n: '079', name: 'Multi-language site',             sub: 'localized routing',            pts: 2, time: '~ 2 wks' },
          { n: '080', name: 'Conversion optimization & A/B',   sub: 'test framework',               pts: 1, time: '~ 1 wk' },
        ]},
      { id: 'soft', name: 'Custom Software & Apps', count: 15, stack: 'react · react native · retool · postgres',
        samples: [
          { n: '092', name: 'Internal admin tool',             sub: 'retool · react custom',        pts: 2, time: '~ 3 wks' },
          { n: '093', name: 'Customer-facing app',             sub: 'react native · flutter',       pts: 5, time: '~ 3 mo' },
          { n: '094', name: 'Custom CRM build',                sub: 'multi-tenant',                 pts: 5, time: '~ 3 mo' },
          { n: '095', name: 'API integration between disparate systems', sub: 'webhooks · queues',  pts: 2, time: '~ 2 wks' },
        ]},
      { id: 'grow', name: 'Marketing & Growth', count: 11, stack: 'meta · google · loops · beehiiv',
        samples: [
          { n: '107', name: 'Email marketing automation',      sub: 'transactional + segmented',    pts: 1, time: '~ 1 wk', impact: '38% open rate avg' },
          { n: '108', name: 'Acquisition system operations',   sub: 'meta · google · LinkedIn',     pts: 2, time: '~ 2 wks' },
          { n: '109', name: 'Search distribution system',      sub: 'briefs · publish · distribute', pts: 2, time: '~ 3 wks' },
          { n: '110', name: 'Affiliate program management',    sub: 'partner ops',                  pts: 2, time: '~ 2 wks' },
        ]},
      { id: 'creative', name: 'Content & Creative Production', count: 12, stack: 'capcut · davinci · elevenlabs · midjourney',
        samples: [
          { n: '118', name: 'Video repurposing pipeline',      sub: 'long → shorts/reels/tiktok',   pts: 2, time: '~ 2 wks' },
          { n: '119', name: 'Multi-channel media operations',  sub: 'edit · chapters · distribute', pts: 2, time: '~ 2 wks' },
          { n: '120', name: 'AI voice generation',             sub: 'elevenlabs · dubbing',         pts: 1, time: '~ 1 wk', impact: 'sub-day audio output' },
          { n: '121', name: 'AI image generation pipeline',    sub: 'midjourney · batch',           pts: 2, time: '~ 2 wks' },
        ]},
    ],
  },

  // ─── 05 · PRICING ($2,500 floor) ────────────────────────────
  pricing: {
    eyebrow: '05 · PRICING',
    titlePrefix: 'Pick the layer that ',
    titleAccent: 'fits',
    titleSuffix: '.',
    tiers: [
      { id: 'operator', name: 'Operator',
        sub: 'Technology ownership for a few critical systems.',
        priceMonthly: '$2,500', priceUnit: '/ mo', priceSetup: '+ $1,250 one-time setup',
        featured: false,
        features: [
          'One critical system, owned end to end',
          'Email + Slack · same-day response on issues',
          'Monthly operations report',
          'Pause anytime after 90 days',
        ]},
      { id: 'team', name: 'Team',
        sub: 'Continuous operational improvement.',
        priceMonthly: '$5,000', priceUnit: '/ mo', priceSetup: '+ $2,500 one-time setup',
        featured: true,
        features: [
          'Multiple coordinated systems',
          'Biweekly ops call · <24h response window',
          'Monthly written report + quarterly strategy',
          'First-month outcome guarantee',
        ]},
      { id: 'department', name: 'Department',
        sub: 'Custom engagement.',
        priceMonthly: 'Custom', priceUnit: '', priceSetup: 'Scoped together',
        body: 'Technology leadership. Operational ownership. Dedicated capacity.',
        featured: false,
        features: [
          'Named operator dedicated to your business',
          '24/7 access · same-hour response on critical',
          'Quarterly executive review + roadmap',
          'Full system documentation + risk register',
        ]},
    ],
    getStarted: 'Get started',
    bookCustom: 'Book a call',
    bookFirst: 'Or book a call first →',
    tierSubject: (t) => `Axius — ${t} tier inquiry`,
    checkoutSubject: (t) => `Axius — start ${t} subscription`,
  },

  // Founder Track — quiet strip below pricing
  founderTrack: {
    eyebrow: 'Founder Track',
    title: 'A separate program for founders.',
    body: 'Running multiple businesses or building a portfolio — one Axius operator across all of them, shared monthly engagement, with continuity. By application only.',
    chips: ['multiple businesses', 'one operator', 'shared engagement', 'by application'],
    cta: 'Apply for Founder Track',
    href: 'mailto:andres@axius.tech?subject=Founder%20Track%20inquiry',
  },

  // ─── 06 · THE OPERATOR ──────────────────────────────────────
  operator: {
    eyebrow: '06 · THE OPERATOR',
    titlePrefix: 'The hand on ',
    titleAccent: 'your operations',
    titleSuffix: '.',
    frames: [
      { fig: 'Fig. 01', caption: 'Operator',  photo: '/assets/andres-toro.jpg',           crop: '50% 30%',
        idle: 'grayscale(1) contrast(1.02)',                              active: 'grayscale(0) saturate(1.05) contrast(1.02)' },
      { fig: 'Fig. 02', caption: 'In studio', photo: '/assets/andres-toro-studio.jpg',    crop: '50% 45%',
        idle: 'grayscale(0.92) sepia(0.18) contrast(1.06)',               active: 'grayscale(0) saturate(1.05) contrast(1.02)' },
      { fig: 'Fig. 03', caption: 'On the go', photo: '/assets/andres-toro-on-the-go.jpg', crop: '50% 35%',
        idle: 'grayscale(0.95) sepia(0.06) contrast(1.06) brightness(0.98)', active: 'grayscale(0) saturate(1.06) contrast(1.02)' },
    ],
    name: 'Andrés Toro',
    bio: "Hi, I'm Andrés.\n\nAfter years working inside SMB operations, I kept seeing the same issue: fragmented systems, scattered contractors, and founders stuck managing operational complexity themselves.\n\nAxius was built to solve that.\n\nWe oversee the operational side of your business's tech through one accountable layer, combining structured systems, AI-assisted execution, and specialist support when needed.\n\nThe goal is simple: your business keeps moving without you managing the tech side of it.",
    quote: "Most SMBs don't need a CTO. They need someone who quietly handles the systems behind the business so the founder can stop being IT.",
    facts: 'BASED · Altamonte Springs, FL · in Medellín now    ·    AVAILABLE · US business hours    ·    LANGUAGES · EN · ES',
    linkedin: 'LinkedIn',
    talk: 'Get in touch',
  },

  // ─── 07 · CLIENT STORIES ────────────────────────────────────
  stories: {
    eyebrow: '07 · CLIENT STORIES',
    titlePrefix: 'Operational ',
    titleAccent: 'results',
    titleSuffix: '.',
    emptyTemplate: 'Case studies publish quarterly — next set drops {next}.',
    // Fabricated until real case studies arrive — gated by the same
    // deadline switch the previous versions used.
    fabricatedDeadline: '2026-08-01T00:00:00-05:00',
    cases: [
      { id: 'cs-marianas', company: "Mariana's Cantina Group",
        subtitle: 'Three-location restaurant group, South Florida',
        body: "Inventory reconciliation was eating two manager-nights a week across three locations. Axius stood up a Shopify-to-spreadsheet daily sync with a Slack alert for variance over 2%. Managers stopped working Sundays.",
        outcome: 'Manager hours back: 8h / week', stars: 5 },
      { id: 'cs-hartwell', company: 'Hartwell & Bain LLP',
        subtitle: 'Boutique litigation firm, Charlotte NC, 6 attorneys',
        body: "Intake forms were re-typed three times — once by the receptionist, once into Clio, once into the document templates. Axius stitched a single-entry intake that pushes into all three. Onboarding a new matter dropped from 45 min to 8.",
        outcome: 'Intake time: 45m → 8m', stars: 5 },
      { id: 'cs-bridgepoint', company: 'Bridgepoint Realty Partners',
        subtitle: 'Independent brokerage, Tampa FL, 14 agents',
        body: "Missed calls during showings were costing leads weekly. Axius routed missed-call SMS to a tier-aware AI replier and posted high-intent ones into a dedicated Slack channel for the founder. First-week measurable lift was a closing the agent told us 'wouldn't have happened'.",
        outcome: 'Recovered showings: 11 in 30 days', stars: 5 },
    ],
  },

  // ─── 08 · QUESTIONS (updated FAQ — no $1k references) ───────
  faq: {
    eyebrow: '08 · QUESTIONS',
    titlePrefix: 'Questions, ',
    titleAccent: 'asked simply',
    titleSuffix: '.',
    items: [
      { q: 'Is this an agency, or a contractor, or what exactly?',
        a: 'Neither. Axius is a small operating practice — one accountable operator (Andrés) running your technology layer, with a vetted specialist bench underneath when work needs depth. Same hand on your stack month after month.' },
      { q: 'What if I already have a developer / agency / contractor?',
        a: 'We work alongside them where it makes sense. Axius is the layer that coordinates, documents, and ensures things compound — not necessarily a replacement. Most clients keep specialists on contract and use Axius for ownership.' },
      { q: 'How do you handle confidentiality?',
        a: 'NDA on every engagement, before access. We use access-scoped credentials with rotation. Everything lives in your accounts, not ours — Axius operates inside your stack, not in a black box.' },
      { q: 'What does the first 30 days actually look like?',
        a: 'Week 1: discovery + audit of current stack. Week 2: roadmap + priorities + first win identified. Week 3–4: first system stood up + monitored + documented. You get a written ops report monthly thereafter.' },
      { q: 'Can I pause or cancel?',
        a: 'Pause anytime after 90 days. Cancel with 30 days notice. We give you full documentation of every system on the way out — nothing locks you in.' },
      { q: 'Where are you based?',
        a: 'Medellín, Colombia. Remote-first. US business hours by default. Available in EN and ES.' },
      { q: 'What is the Founder Track?',
        a: 'For founders running multiple businesses or building a portfolio — one Axius operator across all of them, shared monthly fee, with continuity. Reach out for details.' },
    ],
  },

  // ─── 09 · BEGIN ─────────────────────────────────────────────
  begin: {
    eyebrow: '09 · BEGIN',
    titlePrefix: 'Begin a ',
    titleAccent: 'conversation',
    titleSuffix: '.',
    body: 'Thirty minutes. You leave with a one-page audit either way. No pitch, no pressure — just a clear picture of your systems.',
    cta: 'Begin',
    bookingSubject: 'Axius — discovery call',
  },

  // ─── FOOTER ─────────────────────────────────────────────────
  footer: {
    tagline: 'An independent technology operations practice. Same hand on the work, month after month.',
    practice: [
      { label: 'Method',   id: 'method' },
      { label: 'Catalog',  id: 'catalog' },
      { label: 'Pricing',  id: 'pricing' },
      { label: 'Operator', id: 'operator' },
    ],
    connect: [
      { label: 'andres@axius.tech', href: 'mailto:andres@axius.tech' },
      { label: 'Book a call',       href: 'https://cal.com/andrestoro/discovery-call' },
      { label: 'LinkedIn',          href: 'https://www.linkedin.com/in/followrace/' },
    ],
    bottom: '© 2026 Axius · andres@axius.tech · Made with intent in Medellín',
  },

  // ─── DISPATCH (floating ops log) ────────────────────────────
  dispatch: {
    label: 'Dispatch',
    idleHelp: 'need help? · direct line available',
    boot: [
      ['BOOT', 'dispatch initialized'],
      ['OK',   '129 workflows indexed'],
      ['OK',   'operator.online · altamonte springs · in medellín now'],
      ['OK',   'response windows active'],
    ],
    sections: {
      'hero':       { tag: 'INFO',  msg: 'operator.available · direct line open' },
      'diagnostic': { tag: 'INFO',  msg: 'diagnostic.ready · 30s intake' },
      'method':     { tag: 'OK',    msg: 'stack.audit protocol loaded' },
      'how':        { tag: 'OK',    msg: 'operating layer · 3 roles loaded' },
      'catalog':    { tag: 'OK',    msg: 'catalog.opened · 129 workflows indexed' },
      'pricing':    { tag: 'INFO',  msg: 'capacity calculator active' },
      'operator':   { tag: 'OK',    msg: 'operator context loaded' },
      'stories':    { tag: 'OK',    msg: 'case files · quarterly cadence' },
      'faq':        { tag: 'OK',    msg: 'faq.opened · onboarding process' },
      'begin':      { tag: 'READY', msg: 'discovery.call intake available' },
    },
    pool: [
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
      ['OK',   'dashboard.refresh · monthly review'],
    ],
  },
};

// Fabrication gate — fabricated case studies show until the deadline
// (or a devmode override), then the honest empty state takes over.
window.axiusFabricationLive = function () {
  try {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('axius:devmode') === '1') {
      const override = localStorage.getItem('axius:deadline-override');
      if (override) return Date.now() < new Date(override).getTime();
    }
  } catch (_) {}
  return Date.now() < new Date(window.AXD.stories.fabricatedDeadline).getTime();
};

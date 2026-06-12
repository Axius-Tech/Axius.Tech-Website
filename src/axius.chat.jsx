// ════════════════════════════════════════════════════════════════
// AXIUS CHAT + DISPATCH — interactive surfaces.
// AskAndres is a faithful port of the production chat (AI standby,
// Telegram ring escalation with forum topics, two-way relay,
// operational snapshot) restyled to the fresh design system and
// stripped to English. Dispatch is the floating ops log, now
// anchored to the page container instead of a zoom-compensated calc.
// ════════════════════════════════════════════════════════════════

window.AXChat = (function () {
  const { T, TYPE, MONO, DISPLAY, EASE } = AX;
  const D = () => window.AXD.chat;

  // ─── Operational-diagnosis reply library (EN) ────────────────
  const RESPONSES = {
    greet: "Tell me what's currently slowing the business down, breaking repeatedly, or depending too much on you. I'll show you how we'd structure it operationally.",
    painTools: "Tool sprawl usually isn't a software problem — it's an ownership problem. When nobody is operating the systems, each new tool quietly becomes another tab.\n\nFirst move: stack audit + workflow consolidation map. Most stacks shrink 30–40% in the first 90 days because half the tools were doing the same job for different people.\n\nThis usually sits in the Operator layer.",
    painLeads: "Lead leakage is the most expensive operational failure in any SMB. Usually three causes: missed-call recovery, no routing, no follow-up sequence.\n\nWhat we'd do: instrument the funnel end-to-end, plug the missed-call gap (typically recovers 20–30% of inbound), and put automatic follow-up on dormant leads.\n\nThis usually sits in the Team layer.",
    painDepends: "Founder-as-bottleneck is the most common pattern we see. The fix isn't more headcount — it's documented systems and one accountable layer running them.\n\nWhat we'd do: map the workflows currently living in your head, document them inside your stack, then operate them on your behalf.\n\nThis usually sits in the Department layer.",
    painSystems: "\"Better systems\" is a diagnosis, not a solution. We'd start by listing the operational moments where work currently stalls — usually 4–6 specific places — and rebuild those first. Systems that compound, not systems that exist.\n\nMost stacks need 5–7 workflows to feel fully operated. That's the Team layer.",
    painImprove: "Three things usually show up in the first audit:\n\n  · One workflow that's manual but should be automatic (typically pulls 4–8 hrs/week from someone)\n  · One tool you pay for but nobody owns (kill or wire it)\n  · One handoff between systems that breaks silently (usually CRM ↔ calendar or billing ↔ CRM)\n\nThose three alone typically pay for the first month.",
    painAutomate: "First two automations are almost always:\n\n  1. Missed-call → text-back + callback queue (recovers 20–30% of inbound leads)\n  2. Lead → CRM → calendar handoff (kills the most common drop-off in the funnel)\n\nNeither is glamorous. Both compound monthly.",
    painBreaking: "If something is breaking repeatedly, it's almost never the tool — it's a missing operational owner. The same fix run by the same hand month after month is what stabilises it.\n\nThat's exactly what we do. One operator on your stack. Documented, accountable, same hand every month.",
    method: "How we work:\n\n  I   · Audit      (Days 1–7)   → written stack audit\n  II  · Configure  (Days 8–14)  → workflow map you sign off on\n  III · Operate    (Month 1+)   → monthly operations report\n  IV  · Evolve     (Quarterly)  → roadmap review\n\nEvery artifact lives in your accounts.",
    onboard: "Onboarding runs 7–14 days by tier.\n\n  · Days 1–7   — stack audit, leak report, recommended order of operations\n  · Days 8–14  — workflow map, you sign off in writing\n  · Day 14+    — operations begin, monthly billing starts after sign-off\n\nNothing is built until you've approved what we're building.",
    guarantee: "First-month outcome guarantee on Team. We agree to one operationally meaningful win at kickoff. If we don't deliver it in the agreed timeline, we keep working at no additional cost.",
    pricing: "Two operating layers, plus a custom engagement:\n\n  $2,500 / mo · Operator    · one critical system · same-day response\n  $5,000 / mo · Team        · multiple coordinated systems · <24h window\n  Custom      · Department  · dedicated capacity · same-hour on critical\n\nMonth-to-month after 90 days. One-time setup per tier.",
    catalog: "129 operational workflows across 9 categories — Sales, CX, Operations, AI, Data, Web, Software, Marketing, Content. Ask which categories matter most for your current bottlenecks and I'll show you where we'd start.",
    response: "Response windows by tier.\n\n  same-day  · Operator (on issues)\n  <24h      · Team\n  same-hour · Department (on critical)\n\nUS business hours, MDE timezone.",
    vsAgency: "Agencies rent you account managers, slide decks, and a ticket queue. Axius is one operator running your stack month over month — same hand on it every month, with a vetted specialist bench underneath. One line. One bill. One accountable layer.",
    founder: "Andrés Toro — ten years inside SMB operations across the US and Latin America. Based in Altamonte Springs, FL · currently operating from Medellín. Available on US business hours, EN/ES.",
    contact: "Schedule a 30-minute conversation from the Begin button, or write to andres@axius.tech. Either way you leave with a one-page audit of where your stack is leaking.",
    default: "Tell me a little more about what's slowing the business down — what's breaking, what depends on you, or what feels manual. I'll show you operationally how we'd structure it.",
  };

  const match = (q) => {
    const s = q.toLowerCase();
    if (/drown|too many tools|tool sprawl/.test(s)) return RESPONSES.painTools;
    if (/leads? (slip|leak|escap|drop)|missed call/.test(s)) return RESPONSES.painLeads;
    if (/depend.+(on me|on the founder|on us)|bottleneck/.test(s)) return RESPONSES.painDepends;
    if (/(better|need).+system/.test(s)) return RESPONSES.painSystems;
    if (/what (would|could) you (improve|automate|fix)|show me what/.test(s)) {
      if (/automat/.test(s)) return RESPONSES.painAutomate;
      return RESPONSES.painImprove;
    }
    if (/breaking|breaks|broken|fails/.test(s)) return RESPONSES.painBreaking;
    if (/^\s*(hi|hello|hey)/.test(s) && s.length < 20) return RESPONSES.greet;
    if (/onboard|kickoff|start|first (days|month|30)/.test(s)) return RESPONSES.onboard;
    if (/method|stage|process|how.+work/.test(s)) return RESPONSES.method;
    if (/guarantee|refund|risk/.test(s)) return RESPONSES.guarantee;
    if (/response|how.+fast|24h|window/.test(s)) return RESPONSES.response;
    if (/agency|different/.test(s)) return RESPONSES.vsAgency;
    if (/pric|cost|tier|fee|month|how much/.test(s)) return RESPONSES.pricing;
    if (/catalog|workflow|index|what.+do/.test(s)) return RESPONSES.catalog;
    if (/founder|andr[eé]s|operator|who/.test(s)) return RESPONSES.founder;
    if (/contact|reach|email|book|schedule/.test(s)) return RESPONSES.contact;
    return RESPONSES.default;
  };

  const detectPainSignals = (s) => {
    const text = s.toLowerCase();
    const hits = [];
    if (/drown|too many tools|tool sprawl/.test(text)) hits.push('tools');
    if (/leads? (slip|leak|escap|drop)|missed call/.test(text)) hits.push('leads');
    if (/depend.+(on me|on the founder|on us)|bottleneck/.test(text)) hits.push('depends');
    if (/(better|need).+system/.test(text)) hits.push('systems');
    if (/breaking|breaks|broken|fails/.test(text)) hits.push('breaking');
    if (/manual|hours? a week|by hand|repetitive/.test(text)) hits.push('manual');
    if (/disorganized|chaotic|chaos|no owner|nobody owns/.test(text)) hits.push('chaos');
    return hits;
  };

  const SIGNAL_MAP = {
    tools:    'Tool sprawl — multiple systems, no clear owner',
    leads:    'Lead handling fragmented — leakage in the funnel',
    depends:  'Founder-dependent workflows — bus-factor of one',
    systems:  'Operational systems missing or under-built',
    breaking: 'Recurring breakage — same problems, no permanent owner',
    manual:   'Manual coordination overhead — hours spent on routine',
    chaos:    'No centralised operational ownership',
  };
  const IMPACT_LIST = [
    'Slower response times',
    'Lost follow-up opportunities',
    'Operational inconsistency',
    'Team dependency on founder',
  ];
  const TIER_LABEL = {
    operator:   'Operator — one critical system, owned end to end',
    team:       'Team — multiple coordinated systems',
    department: 'Department — dedicated capacity',
  };

  // ─── Message line renderer ───────────────────────────────────
  const Line = ({ m }) => {
    if (m.role === 'sys') return (
      <div style={{ ...TYPE.micro, fontSize: 9, color: T.inkMute }}>— {m.text} —</div>
    );
    if (m.role === 'sys-ring') return (
      <div style={{
        padding: '6px 10px', background: T.panel,
        borderLeft: `2px solid ${T.ember}`,
        ...TYPE.micro, color: T.inkDim,
      }}>{m.text}</div>
    );
    if (m.role === 'sys-snapshot') {
      const sigs = (m.signals || []).map(k => SIGNAL_MAP[k]).filter(Boolean);
      return (
        <div style={{
          margin: '4px 0', background: T.surface,
          border: `1px solid ${T.lineHi}`, borderLeft: `2px solid ${T.ember}`,
          padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 15, color: T.ink }}>Here's what I'm seeing</span>
            <span style={{ ...TYPE.micro, fontSize: 8, color: T.ember }}>Operational snapshot</span>
          </div>
          <div>
            {sigs.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, ...TYPE.small, color: T.ink, fontSize: 12 }}>
                <span style={{ color: T.ember }}>·</span><span>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: T.line }}/>
          <div>
            <span style={{ ...TYPE.micro, fontSize: 8, color: T.inkMute, display: 'block', marginBottom: 6 }}>Likely impact</span>
            {IMPACT_LIST.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, ...TYPE.small, color: T.inkDim, fontSize: 12 }}>
                <span style={{ color: T.inkMute }}>·</span><span>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: T.line }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <span style={{ ...TYPE.micro, fontSize: 8, color: T.inkMute, display: 'block', marginBottom: 4 }}>Likely fit</span>
              <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 13, color: T.ink }}>{TIER_LABEL[m.tier] || TIER_LABEL.team}</span>
            </div>
            <button type="button" onClick={() => AX.openBooking('Axius — discovery call')}
              style={{
                appearance: 'none', cursor: 'pointer',
                background: T.ink, color: '#FFF', border: `1px solid ${T.ink}`,
                padding: '8px 13px', ...TYPE.micro, fontWeight: 600,
                transition: `all .2s ${EASE}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = T.ember; e.currentTarget.style.borderColor = T.ember; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = T.ink; e.currentTarget.style.borderColor = T.ink; }}>
              Walk me through it · 30 min →
            </button>
          </div>
        </div>
      );
    }
    if (m.role === 'user') return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          display: 'inline-block', maxWidth: '85%', padding: '7px 11px',
          background: T.panel, border: `1px solid ${T.line}`,
          color: T.ink, fontFamily: DISPLAY, fontSize: 12.5, lineHeight: 1.5,
        }}>{m.text}</div>
      </div>
    );
    // bot / bot-ai / andres — one quiet register
    return (
      <div style={{
        fontFamily: DISPLAY, fontSize: 13, color: T.ink, lineHeight: 1.55,
        whiteSpace: 'pre-wrap',
      }}>{m.text}</div>
    );
  };

  // ─── AskAndres — the chat surface ────────────────────────────
  const AskAndres = ({ autofocus }) => {
    const C = D();
    const STORAGE_KEY = 'axius:chat:fresh:v1';
    const STORAGE_TTL_MS = 24 * 60 * 60 * 1000;
    const loadSaved = () => {
      if (typeof localStorage === 'undefined') return null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const blob = JSON.parse(raw);
        if (!blob || !blob.savedAt) return null;
        if (Date.now() - blob.savedAt > STORAGE_TTL_MS) { localStorage.removeItem(STORAGE_KEY); return null; }
        return blob;
      } catch (_) { return null; }
    };
    const saved = React.useMemo(() => loadSaved(), []);

    const initial = saved && Array.isArray(saved.messages) && saved.messages.length
      ? saved.messages
      : [{ role: 'sys', text: C.open }, { role: 'bot', text: C.greeting }];
    const [messages, setMessages] = React.useState(initial);
    const [input, setInput] = React.useState('');
    const [streaming, setStreaming] = React.useState(null);
    const [streamingRole, setStreamingRole] = React.useState('bot-ai');
    const [ringSeconds, setRingSeconds] = React.useState(null);
    const [ringMessageId, setRingMessageId] = React.useState(saved ? saved.ringMessageId || null : null);
    const [ringThreadId, setRingThreadId] = React.useState(saved ? saved.ringThreadId || null : null);
    const [humanMode, setHumanMode] = React.useState(saved ? !!saved.humanMode : false);
    const [painSignals, setPainSignals] = React.useState(saved && Array.isArray(saved.painSignals) ? saved.painSignals : []);
    const [snapshotShown, setSnapshotShown] = React.useState(saved ? !!saved.snapshotShown : false);
    const pendingTimersRef = React.useRef({});
    const ringFiredAtRef = React.useRef(saved ? saved.ringFiredAt || null : null);
    const seenUpdatesRef = React.useRef(new Set());
    const convoId = React.useMemo(
      () => (saved && saved.convoId) || Math.random().toString(36).slice(2, 8).toUpperCase(), []);
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

    React.useEffect(() => {
      if (typeof localStorage === 'undefined') return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          savedAt: Date.now(), convoId,
          messages: messages.slice(-200),
          ringMessageId, ringThreadId, humanMode,
          ringFiredAt: ringFiredAtRef.current,
          painSignals, snapshotShown,
        }));
      } catch (_) {}
    }, [messages, ringMessageId, ringThreadId, humanMode, convoId, painSignals, snapshotShown]);

    const streamReply = (reply, opts) => {
      const asAndres = opts && opts.asAndres;
      const role = asAndres ? 'andres' : 'bot-ai';
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

    // Ring escalation — fires the Telegram webhook with the full
    // transcript; forum-topic mode spawns a per-visitor thread.
    const startRing = (firstUserText) => {
      const cfg = window.AxiusConfig || {};
      const webhook = cfg.ringWebhookUrl || '';
      if (!webhook || /YOUR_TELEGRAM/.test(webhook)) {
        setMessages(m => [...m, { role: 'sys-ring', text: C.ringNoWebhook }]);
        return;
      }
      const transcript = messages.map(m => `[${m.role}] ${m.text}`).join('\n');
      const recent = messages.filter(m => m.role === 'user').slice(-3).map(m => `• ${m.text}`).join('\n');
      setMessages(m => [...m, { role: 'sys-ring', text: C.ringSent }]);
      setRingSeconds(60);
      try {
        const page = typeof location !== 'undefined' ? location.href : '';
        const firstQ = firstUserText || (messages.find(m => m.role === 'user') || {}).text || '';
        let tz = '', browserLocale = '', ref = '';
        try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (_) {}
        try { browserLocale = (navigator.language || '').toString(); } catch (_) {}
        try { ref = (document.referrer || '').toString(); } catch (_) {}
        const esc = AX.escHtml;
        const messageText =
          `🔔 <b>Ring from axius.tech</b> — Conv <code>${esc(convoId)}</code>\n` +
          `🇺🇸 <b>Language:</b> English (<code>EN</code>)\n\n` +
          (recent ? `<b>Recent questions:</b>\n${esc(recent)}\n\n` : '') +
          `<b>Full transcript:</b>\n${esc(transcript || '(no transcript)')}\n\n` +
          `↪ <b>To reply:</b> long-press this message → Reply. Your text appears live in the visitor's chat.\n\n` +
          `<b>Page:</b> ${esc(page)}\n` +
          (ref ? `<b>Referrer:</b> ${esc(ref)}\n` : '') +
          `<b>Timezone:</b> ${esc(tz || 'unknown')} · <b>Browser:</b> ${esc(browserLocale || 'unknown')}\n` +
          `<b>Time:</b> ${new Date().toISOString()}`;

        const tokenMatch = webhook.match(/api\.telegram\.org\/bot([^/]+)\//);
        if (!tokenMatch) return;
        const base = `https://api.telegram.org/bot${tokenMatch[1]}`;
        const chatId = (cfg.ringWebhookChatId || '').toString();
        const useTopics = !!cfg.ringUseForumTopics;
        ringFiredAtRef.current = Math.floor(Date.now() / 1000);

        (async () => {
          try {
            let threadId = null;
            if (useTopics && base) {
              const topicName = (firstQ ? `[EN] Conv ${convoId} · ${firstQ}` : `[EN] Conv ${convoId}`).slice(0, 124);
              const topicRes = await fetch(`${base}/createForumTopic`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, name: topicName, icon_color: 16478047 }),
              }).then(r => r.json()).catch(() => null);
              if (topicRes && topicRes.ok && topicRes.result) {
                threadId = topicRes.result.message_thread_id;
                setRingThreadId(threadId);
              }
            }
            const sendPayload = {
              chat_id: chatId, text: messageText,
              parse_mode: 'HTML', disable_web_page_preview: true,
              reply_markup: { inline_keyboard: [[{ text: "✓ I'm here — accept", callback_data: `accept:${convoId}` }]] },
            };
            if (threadId) sendPayload.message_thread_id = threadId;
            const sendRes = await fetch(`${base}/sendMessage`, {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(sendPayload),
            }).then(r => r.json()).catch(() => null);
            if (sendRes && sendRes.ok && sendRes.result && sendRes.result.message_id) {
              setRingMessageId(sendRes.result.message_id);
            }
          } catch (_) {}
        })();
      } catch (_) {}
    };

    React.useEffect(() => {
      if (ringSeconds === null) return;
      if (ringSeconds <= 0) {
        setRingSeconds(null);
        setMessages(m => [...m, { role: 'bot', text: C.ringNoAnswer }]);
        return;
      }
      const id = setTimeout(() => setRingSeconds(c => (c === null ? null : c - 1)), 1000);
      return () => clearTimeout(id);
    }, [ringSeconds]);

    // Two-way Telegram bridge — poll getUpdates for replies / accepts.
    React.useEffect(() => {
      if (!ringMessageId) return;
      const cfg = window.AxiusConfig || {};
      const webhook = cfg.ringWebhookUrl || '';
      const m = webhook.match(/api\.telegram\.org\/bot([^/]+)\//);
      if (!m) return;
      const base = `https://api.telegram.org/bot${m[1]}`;
      const chatId = String(cfg.ringWebhookChatId || '');
      let stopped = false, timer = null;
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
              const msg = u.message;
              const isInScope = msg && String(msg.chat.id) === chatId
                && (msg.date || 0) >= firedAt
                && (!ringThreadId || msg.message_thread_id === ringThreadId);
              const isRingReply = msg && msg.reply_to_message
                && msg.reply_to_message.message_id === ringMessageId;
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
              const cq = u.callback_query;
              if (cq && cq.data === `accept:${convoId}`
                  && cq.message && cq.message.message_id === ringMessageId
                  && (!ringThreadId || cq.message.message_thread_id === ringThreadId)) {
                fetch(`${base}/answerCallbackQuery`, {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ callback_query_id: cq.id, text: "✓ You're in — visitor notified" }),
                }).catch(() => {});
                const hh = String(new Date().getHours()).padStart(2, '0');
                const mm = String(new Date().getMinutes()).padStart(2, '0');
                fetch(`${base}/editMessageReplyMarkup`, {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId, message_id: ringMessageId,
                    reply_markup: { inline_keyboard: [[{ text: `✓ Accepted at ${hh}:${mm}`, callback_data: `noop:${convoId}` }]] },
                  }),
                }).catch(() => {});
                const connectPayload = {
                  chat_id: chatId,
                  text: `✅ <b>You're connected to Conv <code>${convoId}</code></b>\n` +
                        `Type anything in this topic and it appears live in the visitor's chat.\n` +
                        `If you go quiet for 60s on any single message, the AI answers that one so the visitor isn't left waiting.`,
                  parse_mode: 'HTML', disable_web_page_preview: true,
                };
                if (ringThreadId) connectPayload.message_thread_id = ringThreadId;
                fetch(`${base}/sendMessage`, {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(connectPayload),
                }).catch(() => {});
                setMessages(prev => [...prev, { role: 'sys-ring', text: C.andresHere }]);
                setRingSeconds(null);
                setHumanMode(true);
              }
            }
          }
        } catch (_) {}
        if (!stopped) timer = setTimeout(poll, 4000);
      };
      poll();
      return () => {
        stopped = true;
        if (timer) clearTimeout(timer);
        Object.values(pendingTimersRef.current).forEach(clearTimeout);
        pendingTimersRef.current = {};
      };
    }, [ringMessageId, ringThreadId, convoId]);

    const relayVisitorToTopic = (text) => {
      const cfg = window.AxiusConfig || {};
      const webhook = cfg.ringWebhookUrl || '';
      const tokenMatch = webhook.match(/api\.telegram\.org\/bot([^/]+)\//);
      if (!tokenMatch) return;
      const base = `https://api.telegram.org/bot${tokenMatch[1]}`;
      const chatId = (cfg.ringWebhookChatId || '').toString();
      const payload = {
        chat_id: chatId,
        text: `💬 <b>Visitor:</b> ${AX.escHtml(text)}`,
        parse_mode: 'HTML', disable_web_page_preview: true,
      };
      if (ringThreadId) payload.message_thread_id = ringThreadId;
      fetch(`${base}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    };

    const ask = (q, opts) => {
      const fromChip = !!(opts && opts.fromChip);
      const text = (q || '').trim();
      if (!text || streaming !== null) return;
      const msgId = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setMessages(m => [...m, { role: 'user', text, id: msgId }]);
      setInput('');

      const hits = detectPainSignals(text);
      let nextSignals = painSignals;
      if (hits.length) {
        nextSignals = Array.from(new Set([...painSignals, ...hits]));
        if (nextSignals.length !== painSignals.length) setPainSignals(nextSignals);
      }
      const shouldSurfaceSnapshot = !snapshotShown && nextSignals.length >= 3 && !humanMode;

      // First user message quietly routes the transcript to Telegram so
      // Andrés has context even without an explicit "ring" trigger.
      const isFirstUserMsg = !messages.some(m => m.role === 'user');
      if (isFirstUserMsg && !ringMessageId) {
        setTimeout(() => startRing(text), 800);
      }

      if (humanMode && fromChip) {
        const delay = 1500 + Math.floor(Math.random() * 1000);
        setStreamingRole('andres');
        setStreaming('');
        setTimeout(() => { setStreaming(null); streamReply(match(text), { asAndres: true }); }, delay);
        return;
      }
      if (humanMode) {
        relayVisitorToTopic(text);
        pendingTimersRef.current[msgId] = setTimeout(() => {
          delete pendingTimersRef.current[msgId];
          streamReply(match(text));
        }, 60000);
        return;
      }

      streamReply(match(text));

      if (shouldSurfaceSnapshot) {
        const tier = nextSignals.includes('depends') || nextSignals.length >= 5 ? 'department' : 'team';
        setTimeout(() => {
          setMessages(m => [...m, { role: 'sys-snapshot', id: `snap-${Date.now()}`, signals: nextSignals, tier }]);
          setSnapshotShown(true);
        }, 5000);
      }
    };

    return (
      <div style={{
        position: 'relative', background: T.surface,
        display: 'flex', flexDirection: 'column',
        flex: 1, width: '100%', maxWidth: '100%', minWidth: 0, minHeight: 0,
        overflow: 'hidden',
      }}>
        {/* Messages */}
        <div ref={scrollRef} className="ax-scroll" style={{
          padding: '14px 18px', flex: 1, minHeight: 0, overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {messages.map((m, i) => <Line key={i} m={m}/>)}
          {streaming !== null && <Line m={{ role: streamingRole, text: streaming + '▍' }}/>}
        </div>

        {/* Suggestion chips */}
        <div className="ax-scroll" style={{
          padding: '10px 18px', borderTop: `1px solid ${T.line}`,
          display: 'flex', gap: 8, background: T.panel,
          overflowX: 'auto', overflowY: 'hidden',
          flexShrink: 0, minWidth: 0, width: '100%',
        }}>
          {D().suggestions.map(s => (
            <button key={s} type="button" onClick={() => ask(s, { fromChip: true })}
              style={{
                appearance: 'none', cursor: 'pointer',
                border: `1px solid ${T.lineHi}`, background: 'transparent',
                padding: '6px 12px', ...TYPE.micro, color: T.inkDim,
                transition: `all .2s ${EASE}`, whiteSpace: 'nowrap', flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.ember; e.currentTarget.style.color = T.ember; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.lineHi; e.currentTarget.style.color = T.inkDim; }}>
              {s}
            </button>
          ))}
        </div>

        {/* Compose */}
        <span aria-hidden style={{ display: 'block', height: 1, width: '100%', background: T.line, flexShrink: 0 }}/>
        <form onSubmit={(e) => { e.preventDefault(); ask(input); }} style={{
          padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10,
          background: T.panel, flexShrink: 0,
        }}>
          <span aria-hidden style={{ fontFamily: MONO, fontSize: 13, color: T.inkMute }}>›</span>
          <input ref={inputRef} value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={streaming !== null ? D().replying : D().placeholder}
            disabled={streaming !== null}
            aria-label="Message Andrés"
            style={{
              flex: 1, appearance: 'none', border: 'none', outline: 'none', background: 'transparent',
              fontFamily: DISPLAY, color: T.ink, fontSize: 13, letterSpacing: '-0.003em', padding: 2,
            }}/>
          <button type="submit"
            disabled={streaming !== null || !input.trim()}
            style={{
              appearance: 'none',
              border: `1px solid ${input.trim() && streaming === null ? T.ink : T.line}`,
              background: input.trim() && streaming === null ? T.ink : 'transparent',
              color: input.trim() && streaming === null ? '#FFF' : T.inkFaint,
              cursor: input.trim() && streaming === null ? 'pointer' : 'not-allowed',
              padding: '7px 14px', ...TYPE.micro, fontWeight: 600,
              transition: `all .2s ${EASE}`,
            }}
            onMouseEnter={(e) => {
              if (!input.trim() || streaming !== null) return;
              e.currentTarget.style.background = T.ember; e.currentTarget.style.borderColor = T.ember;
            }}
            onMouseLeave={(e) => {
              if (!input.trim() || streaming !== null) return;
              e.currentTarget.style.background = T.ink; e.currentTarget.style.borderColor = T.ink;
            }}>{D().send}</button>
        </form>
      </div>
    );
  };

  // ─── Dispatch — floating operations log ──────────────────────
  // Anchored to the page container's right content edge (no zoom math).
  const Dispatch = () => {
    const DD = window.AXD.dispatch;
    const [collapsed, setCollapsed] = React.useState(true);
    const [events, setEvents] = React.useState([]);
    const [streamingActive, setStreamingActive] = React.useState(false);
    const hasBootedRef = React.useRef(false);
    const scrollRef = React.useRef(null);
    const seenSectionsRef = React.useRef(new Set());
    const idleFiredRef = React.useRef(false);
    const idleTimerRef = React.useRef(null);

    const tagColor = (tag) => (
      tag === 'WARN' ? T.stAmber :
      tag === 'INFO' ? T.slate :
      tag === 'READY' ? T.ember :
      tag === 'BOOT' ? T.ember :
      T.stGreen
    );
    const push = (tag, msg) =>
      setEvents(e => [...e.slice(-60), { tag, msg, color: tagColor(tag) }]);

    React.useEffect(() => {
      if (collapsed || hasBootedRef.current) return;
      hasBootedRef.current = true;
      const timers = DD.boot.map(([tag, msg], i) => setTimeout(() => push(tag, msg), i * 400));
      timers.push(setTimeout(() => setStreamingActive(true), DD.boot.length * 400 + 500));
      return () => timers.forEach(clearTimeout);
    }, [collapsed]);

    React.useEffect(() => {
      if (!streamingActive) return;
      const targets = document.querySelectorAll('[data-dispatch-id]');
      if (!targets.length) return;
      const seen = seenSectionsRef.current;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const id = e.target.getAttribute('data-dispatch-id');
          if (seen.has(id)) return;
          const ev = DD.sections[id];
          if (!ev) return;
          seen.add(id);
          push(ev.tag, ev.msg);
        });
      }, { threshold: 0.35 });
      targets.forEach(target => io.observe(target));
      return () => io.disconnect();
    }, [streamingActive]);

    React.useEffect(() => {
      if (!streamingActive || idleFiredRef.current) return;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (idleFiredRef.current) return;
        idleFiredRef.current = true;
        push('INFO', DD.idleHelp);
      }, 35000);
      return () => idleTimerRef.current && clearTimeout(idleTimerRef.current);
    }, [events.length, streamingActive]);

    React.useEffect(() => {
      if (collapsed || !streamingActive) return;
      let last = -1;
      const tick = () => {
        let i = (Math.random() * DD.pool.length) | 0;
        if (i === last) i = (i + 1) % DD.pool.length;
        last = i;
        push(DD.pool[i][0], DD.pool[i][1]);
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
        // Align the panel's right edge with the container's content edge.
        right: `max(24px, calc((100vw - ${AX.L.container}px) / 2 + ${AX.L.gutter}px))`,
        bottom: 24, zIndex: 60,
        width: collapsed ? 'auto' : 360,
        background: T.surface,
        border: `1px solid ${T.lineHi}`,
        boxShadow: '0 1px 0 rgba(21,19,14,0.04)',
        transition: `width .3s ${EASE}`,
      }}>
        <div style={{
          padding: '10px 14px',
          borderBottom: collapsed ? 'none' : `1px solid ${T.line}`,
          background: T.panel,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span aria-hidden style={{
              display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
              background: T.ember, animation: 'axPulse 2.4s ease-out infinite',
            }}/>
            <span style={{ ...TYPE.micro, fontWeight: 700, color: T.ink }}>{DD.label}</span>
            {!collapsed && (
              <span style={{ ...TYPE.micro, fontSize: 9, color: T.inkMute }}>{events.length} events</span>
            )}
          </div>
          <button onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? 'Expand dispatch' : 'Collapse dispatch'}
            style={{
              appearance: 'none', border: 'none', background: 'transparent',
              cursor: 'pointer', padding: '0 4px',
              fontFamily: MONO, fontSize: 12, color: T.ember,
              transition: `color .2s ${EASE}`,
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = T.ink}
            onMouseLeave={(e) => e.currentTarget.style.color = T.ember}>
            {collapsed ? '+' : '−'}
          </button>
        </div>
        {!collapsed && (
          <div ref={scrollRef} className="ax-scroll" style={{
            padding: '10px 14px', height: 200, overflowY: 'auto',
            fontFamily: MONO, fontSize: 11, lineHeight: 1.75,
            background: T.surface,
          }}>
            {events.map((e, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '52px 1fr', gap: 10,
                alignItems: 'baseline',
              }}>
                <span style={{ color: e.color, fontWeight: 600, letterSpacing: '0.06em', fontSize: 10 }}>[{e.tag}]</span>
                <span style={{ color: T.inkDim, letterSpacing: '-0.005em' }}>{e.msg}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, color: T.ember }}>
              <span style={{ fontWeight: 600 }}>▸</span>
              <span aria-hidden style={{
                display: 'inline-block', width: 7, height: 13,
                background: T.ember, animation: 'axBlink 1.1s step-end infinite',
              }}/>
            </div>
          </div>
        )}
      </div>
    );
  };

  return { AskAndres, Dispatch };
})();

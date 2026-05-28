// ─── Direction E090 — Quiet 0.90 ──────────────────────────
// Same brand language as Quiet 0.5 (tangerine + cream + ink),
// but framed as a "gallery composition": a 1px hairline border
// runs around the whole canvas, a centered OPERATOR ONLINE
// status sits in the top bar, and the Direct Line card lives
// inside a small editorial collage (workflow diagram, code
// fragment, server rack, Venn). The page below the hero reuses
// Quiet 0.5 patterns/copy with the same outer frame.

window.AxiusDirectionE090 = function AxiusDirectionE090() {
  React.useEffect(() => {
    if (!document.getElementById('axius-q090-fonts')) {
      const link = document.createElement('link');
      link.id = 'axius-q090-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap';
      document.head.appendChild(link);
    }
    if (!document.getElementById('axius-q090-styles')) {
      const style = document.createElement('style');
      style.id = 'axius-q090-styles';
      style.textContent = `
        @keyframes axQ090Pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,91,42,0.55); }
          50%      { box-shadow: 0 0 0 6px rgba(255,91,42,0); }
        }
        @keyframes axQ090Mint {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,186,168,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(79,186,168,0); }
        }
        #stage-quiet090 section[id], #stage-quiet090 header[id] { scroll-margin-top: 80px; }
        #stage-quiet090 a { color: inherit; }
        .ax-q090-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,91,42,0.4) transparent; }
        .ax-q090-scroll::-webkit-scrollbar { width: 8px; }
        .ax-q090-scroll::-webkit-scrollbar-thumb { background: rgba(255,91,42,0.35); }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // ─── Palette (Quiet 0.5 — tangerine + cream + ink) ─────────
  const C = {
    bg:        '#EFEAE0',
    surface:   '#FFFFFF',
    panel:     '#FCFBF7',
    paper:     '#FAF6EE',
    ink:       '#0A0907',
    dim:       'rgba(10,9,7,0.62)',
    mute:      'rgba(10,9,7,0.42)',
    faint:     'rgba(10,9,7,0.24)',
    ghost:     'rgba(10,9,7,0.10)',
    line:      'rgba(10,9,7,0.10)',
    lineHi:    'rgba(10,9,7,0.22)',
    lineFrame: 'rgba(10,9,7,0.32)',
    tangerine: '#FF5B2A',
    mint:      '#4FBAA8',
    mutedText: '#9C9690',
  };

  const DISPLAY = '"Geist", "Inter Tight", system-ui, sans-serif';
  const MONO    = '"Geist Mono", "IBM Plex Mono", ui-monospace, monospace';
  const SERIF   = '"Instrument Serif", "Cormorant Garamond", serif';

  const pad = 64;       // padding inside the frame
  const framePad = 32;  // distance from canvas edge to frame border

  // ─── Helpers ───────────────────────────────────────────────
  const BOOKING_URL = (window.AxiusConfig && window.AxiusConfig.bookingUrl) || '';
  const EMAIL = 'andres@axius.tech';
  const openBooking = (subject) => {
    if (BOOKING_URL) { window.open(BOOKING_URL, '_blank', 'noopener'); return; }
    window.location.href = `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
  };
  const openEmail = (subject) => {
    window.location.href = `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
  };
  const scrollToId = (id) => {
    const root = document.getElementById('stage-quiet090') || document;
    const el = root.querySelector('#' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ─── Atoms ─────────────────────────────────────────────────
  const Eyebrow = ({ children, color, style = {} }) => (
    <div style={{
      fontFamily: MONO, fontSize: 11, fontWeight: 500,
      letterSpacing: '0.22em', textTransform: 'uppercase',
      color: color || C.mute, ...style,
    }}>{children}</div>
  );

  const LiveClock = ({ style = {} }) => {
    const [time, setTime] = React.useState('16:02:49');
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
        fontFamily: MONO, fontSize: 12, fontWeight: 500,
        color: C.ink, letterSpacing: '0.18em',
        fontVariantNumeric: 'tabular-nums', ...style,
      }}>{time}</span>
    );
  };

  // ─── Stylized AXIUS wordmark — letter "A" with tangerine accent
  const AxiusMark = () => (
    <div style={{display: 'inline-flex', alignItems: 'baseline', gap: 0}}>
      <span style={{
        fontFamily: DISPLAY, fontWeight: 700, fontSize: 30,
        letterSpacing: '0.18em', color: C.ink, lineHeight: 1,
      }}>AXIUS</span>
    </div>
  );

  // ─── Quiet button (Quiet 0.5 grammar, primary/secondary) ──
  const Btn = ({ children, primary, onClick, size = 'md', style = {} }) => {
    const [h, setH] = React.useState(false);
    const sizes = {
      sm: { pad: '10px 16px', fs: 11 },
      md: { pad: '14px 22px', fs: 12 },
      lg: { pad: '18px 28px', fs: 13 },
    };
    const s = sizes[size];
    const bg = primary ? (h ? C.tangerine : C.ink) : 'transparent';
    const ink = primary ? '#FFFFFF' : (h ? C.tangerine : C.ink);
    const border = primary ? bg : (h ? C.tangerine : C.lineHi);
    return (
      <button onClick={onClick}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          appearance: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: bg, color: ink,
          border: `1px solid ${border}`,
          padding: s.pad,
          fontFamily: MONO, fontWeight: 600, fontSize: s.fs,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          transition: 'all .25s cubic-bezier(.2,.8,.2,1)',
          ...style,
        }}>
        {children}
        <span style={{transform: h ? 'translateX(3px)' : 'translateX(0)', transition: 'transform .25s ease'}}>→</span>
      </button>
    );
  };

  // ─── Collage SVG atoms (reused from Quiet 0.75) ───────────
  const WorkflowDiagram = ({ style = {} }) => (
    <div style={{
      position: 'absolute',
      width: 168, height: 230,
      background: C.paper,
      border: `1px solid ${C.line}`,
      padding: 12,
      ...style,
    }}>
      <svg viewBox="0 0 168 230" width="100%" height="100%" style={{display: 'block'}}>
        <defs>
          <pattern id="q090grid" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M12 0H0V12" stroke="rgba(10,9,7,0.10)" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="168" height="230" fill="url(#q090grid)"/>
        <g stroke={C.ink} strokeWidth="1.1" fill="none" strokeLinecap="round">
          <rect x="12" y="14" width="46" height="22"/>
          <rect x="74" y="14" width="46" height="22"/>
          <rect x="12" y="66" width="46" height="22"/>
          <rect x="74" y="66" width="46" height="22"/>
          <rect x="12" y="118" width="108" height="22"/>
          <rect x="40" y="170" width="58" height="34" stroke={C.tangerine}/>
          <path d="M58 25 L74 25"/>
          <path d="M36 36 L36 66"/>
          <path d="M96 36 L96 66"/>
          <path d="M36 88 L36 118"/>
          <path d="M96 88 L96 118"/>
          <path d="M68 140 L68 170" stroke={C.tangerine}/>
        </g>
        <rect x="88" y="48" width="9" height="9" fill={C.tangerine}/>
      </svg>
    </div>
  );

  const CodePanel = ({ style = {} }) => (
    <div style={{
      position: 'absolute',
      width: 214, padding: '16px 18px 18px',
      background: C.ink, color: C.bg,
      fontFamily: MONO, fontSize: 11, lineHeight: 1.7,
      ...style,
    }}>
      <div style={{color: 'rgba(239,234,224,0.5)'}}>// systems work</div>
      <div style={{color: 'rgba(239,234,224,0.5)'}}>// people grow</div>
      <div style={{color: 'rgba(239,234,224,0.5)'}}>// businesses scale</div>
      <div style={{height: 8}}/>
      <div><span style={{color: C.tangerine}}>function</span> operational(system) {`{`}</div>
      <div style={{paddingLeft: 14}}>align(people);</div>
      <div style={{paddingLeft: 14}}>automate(work);</div>
      <div style={{paddingLeft: 14}}>optimize(flow);</div>
      <div style={{paddingLeft: 14}}><span style={{color: C.tangerine}}>return</span> <span style={{color: C.tangerine}}>freedom</span>;</div>
      <div>{`}`}</div>
    </div>
  );

  const ServerRack = ({ style = {} }) => (
    <div style={{
      position: 'absolute',
      width: 80, height: 320,
      background: C.ink, padding: 5,
      overflow: 'hidden',
      ...style,
    }}>
      <svg viewBox="0 0 70 310" width="100%" height="100%" style={{display: 'block'}}>
        <rect x="1" y="1" width="68" height="308" fill="none" stroke="rgba(239,234,224,0.22)" strokeWidth="0.5"/>
        {Array.from({length: 18}).map((_, i) => {
          const y = 6 + i * 16.5;
          return (
            <g key={i}>
              <rect x="5" y={y} width="60" height="14" fill={i % 4 === 2 ? '#1B1916' : '#161412'} stroke="rgba(239,234,224,0.10)" strokeWidth="0.3"/>
              <circle cx="10" cy={y + 7} r="1.1" fill={i === 6 ? C.mint : 'rgba(239,234,224,0.16)'}/>
              <circle cx="14" cy={y + 7} r="1.1" fill={i === 9 ? C.tangerine : 'rgba(239,234,224,0.10)'}/>
              <rect x="22" y={y + 5} width="38" height="4" fill="rgba(239,234,224,0.06)"/>
            </g>
          );
        })}
      </svg>
    </div>
  );

  const VennDiagram = ({ style = {} }) => (
    <div style={{
      position: 'absolute',
      width: 200, height: 180,
      background: C.paper,
      border: `1px solid ${C.line}`,
      padding: 14,
      ...style,
    }}>
      <svg viewBox="0 0 200 180" width="100%" height="100%" style={{display: 'block'}}>
        <defs>
          <pattern id="q090vgrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0V10" stroke="rgba(10,9,7,0.08)" strokeWidth="0.4" fill="none"/>
          </pattern>
        </defs>
        <rect width="200" height="180" fill="url(#q090vgrid)"/>
        <path d="M100 80 A 42 42 0 0 1 100 118 A 42 42 0 0 1 100 80 Z" fill={C.tangerine} opacity="0.85"/>
        <circle cx="80"  cy="80"  r="42" fill="none" stroke={C.ink} strokeWidth="1.1"/>
        <circle cx="120" cy="80"  r="42" fill="none" stroke={C.ink} strokeWidth="1.1"/>
        <circle cx="100" cy="118" r="42" fill="none" stroke={C.ink} strokeWidth="1.1"/>
        <text x="78" y="36" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1.2" fill={C.ink}>PEOPLE</text>
        <text x="16" y="158" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1.2" fill={C.ink}>PROCESS</text>
        <text x="138" y="158" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1.2" fill={C.ink}>TECHNOLOGY</text>
      </svg>
    </div>
  );

  // ─── DirectLine ───────────────────────────────────────────
  const DirectLine = () => {
    const [mode, setMode] = React.useState('card');
    const [transitioning, setTransitioning] = React.useState(false);
    const photo = (window.AxiusFounder && window.AxiusFounder.photo) || 'andres-toro.jpg';
    const openChat = () => {
      if (mode === 'chat') return;
      setTransitioning(true);
      setTimeout(() => { setMode('chat'); setTransitioning(false); }, 320);
    };
    const backToCard = () => {
      if (mode === 'card') return;
      setTransitioning(true);
      setTimeout(() => { setMode('card'); setTransitioning(false); }, 320);
    };
    return (
      <div style={{
        position: 'relative',
        background: C.surface,
        border: `1px solid ${C.lineHi}`,
        minHeight: 380,
        overflow: 'hidden',
        zIndex: 10,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* CARD */}
        <div style={{
          opacity: mode === 'card' && !transitioning ? 1 : 0,
          pointerEvents: mode === 'card' && !transitioning ? 'auto' : 'none',
          transition: 'opacity .32s cubic-bezier(.2,.8,.2,1)',
          display: mode === 'card' ? 'flex' : 'none',
          flexDirection: 'column', flex: 1,
        }}>
          {/* header */}
          <div style={{
            padding: '14px 20px',
            borderBottom: `1px solid ${C.line}`,
            background: C.panel,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{display: 'inline-flex', alignItems: 'baseline', gap: 14}}>
              <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 20, color: C.tangerine}}>Direct line.</span>
              <Eyebrow color={C.mute}>Andrés Toro</Eyebrow>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: MONO, fontSize: 10, color: C.dim,
              letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>
              <span style={{display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: C.mint, animation: 'axQ090Mint 2.4s ease-out infinite'}}/>
              available
            </span>
          </div>

          {/* identity row */}
          <div style={{
            padding: '20px 22px 16px',
            display: 'grid', gridTemplateColumns: '92px 1fr', gap: 18,
            alignItems: 'center',
          }}>
            <div style={{
              position: 'relative', width: 92, height: 92,
              borderRadius: '50%', overflow: 'hidden',
              border: `1px solid ${C.lineHi}`,
              background: C.panel,
            }}>
              <img src={photo} alt="Andrés Toro" style={{
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%',
                filter: 'saturate(0.9) contrast(1.02)',
                display: 'block',
              }}/>
              <span aria-hidden style={{
                position: 'absolute', right: 4, bottom: 4,
                width: 13, height: 13, borderRadius: '50%',
                background: C.mint, boxShadow: `0 0 0 2px ${C.surface}`,
              }}/>
            </div>
            <div>
              <div style={{fontFamily: DISPLAY, fontWeight: 600, fontSize: 24, letterSpacing: '-0.025em', color: C.ink, lineHeight: 1.1}}>Andrés Toro</div>
              <div style={{marginTop: 4, fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: C.dim}}>Operator · Medellín, in office now</div>
              <div style={{
                marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: MONO, fontSize: 10, color: C.mute,
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                <LiveClock style={{fontSize: 10}}/>
                <span style={{color: C.faint}}>·</span><span>MDE</span>
                <span style={{color: C.faint}}>·</span><span>EN / ES</span>
              </div>
            </div>
          </div>

          <div style={{
            padding: '0 22px 18px', flex: 1,
            fontFamily: DISPLAY, fontSize: 14, color: C.dim, lineHeight: 1.65,
          }}>
            A direct line to whoever does the work — no account managers, no ticket queues.<br/>
            <span style={{color: C.ink, fontWeight: 500}}>Ask anything; I answer in this window.</span>
          </div>

          <div style={{padding: '0 22px 22px', display: 'flex', gap: 10, flexWrap: 'wrap'}}>
            <Btn primary size="md" onClick={openChat}>Talk now</Btn>
            <a href={`mailto:${EMAIL}`} style={{
              appearance: 'none', cursor: 'pointer',
              background: 'transparent', color: C.dim, border: `1px solid ${C.lineHi}`,
              padding: '14px 18px',
              fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em',
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

        {/* CHAT */}
        <div style={{
          opacity: mode === 'chat' && !transitioning ? 1 : 0,
          pointerEvents: mode === 'chat' && !transitioning ? 'auto' : 'none',
          transition: 'opacity .32s cubic-bezier(.2,.8,.2,1)',
          display: mode === 'chat' ? 'flex' : 'none',
          flexDirection: 'column', flex: 1, minHeight: 0,
        }}>
          {mode === 'chat' && <AskAndres onBack={backToCard}/>}
        </div>
      </div>
    );
  };

  const AskAndres = ({ onBack }) => {
    const initial = [
      { role: 'sys', text: 'Open desk · Andrés is at the office' },
      { role: 'bot', text: 'Hi. Ask me about pricing, the catalog, or how we work — I keep my answers direct.' },
    ];
    const [messages, setMessages] = React.useState(initial);
    const [input, setInput] = React.useState('');
    const [streaming, setStreaming] = React.useState(null);
    const scrollRef = React.useRef(null);
    const inputRef = React.useRef(null);
    React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, streaming]);
    React.useEffect(() => { setTimeout(() => inputRef.current && inputRef.current.focus(), 360); }, []);
    const responses = {
      greet: "Welcome. Ask anything about how Axius operates — I won't invent.",
      pricing: "Three editions:\n\n  · Operator · $1,000/mo · 2 pts · 72h\n  · Team · $2,500/mo · 5 pts · 48h (recommended)\n  · Department · $5,000/mo · 10 pts · 24h",
      catalog: "129 workflows across 9 categories — Sales, CX, Operations, AI, Data, Web, Software, Marketing, Content.",
      method: "Four stages: Audit (1–7d), Configure (8–14d), Operate (month 1+), Evolve (quarterly).",
      contact: "Write to andres@axius.tech, or use Book a call up top. Tier response times apply.",
      default: "I track a narrow domain: pricing, catalog, methodology, founder, contact.",
    };
    const match = (q) => {
      const s = q.toLowerCase();
      if (/^\s*(hi|hello|hey)/.test(s)) return responses.greet;
      if (/pric|cost|tier|fee|month/.test(s)) return responses.pricing;
      if (/catalog|workflow|sample/.test(s)) return responses.catalog;
      if (/method|stage|how.+work|onboard/.test(s)) return responses.method;
      if (/contact|reach|email|book/.test(s)) return responses.contact;
      return responses.default;
    };
    const ask = (q) => {
      const t = (q || '').trim();
      if (!t || streaming !== null) return;
      setMessages(m => [...m, { role: 'user', text: t }]);
      setInput('');
      const reply = match(t);
      setStreaming('');
      let i = 0;
      const speed = Math.max(10, Math.min(22, 1100 / reply.length));
      const id = setInterval(() => {
        i += 2;
        if (i >= reply.length) { clearInterval(id); setMessages(m => [...m, { role: 'bot', text: reply }]); setStreaming(null); }
        else setStreaming(reply.slice(0, i));
      }, speed);
    };
    return (
      <>
        <div style={{padding: '12px 18px', borderBottom: `1px solid ${C.line}`, background: C.panel, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'inline-flex', alignItems: 'baseline', gap: 12}}>
            <button onClick={onBack} type="button" style={{appearance: 'none', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, fontFamily: MONO, fontSize: 10, color: C.mute, letterSpacing: '0.22em', textTransform: 'uppercase'}}
              onMouseEnter={(e) => e.currentTarget.style.color = C.tangerine} onMouseLeave={(e) => e.currentTarget.style.color = C.mute}>← back</button>
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: C.tangerine}}>Ask Andrés.</span>
            <Eyebrow color={C.mute}>direct line</Eyebrow>
          </div>
          <span style={{display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 10, color: C.dim, letterSpacing: '0.22em', textTransform: 'uppercase'}}>
            <span style={{display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: C.tangerine, animation: 'axQ090Pulse 2.4s ease-out infinite'}}/>
            open
          </span>
        </div>
        <div ref={scrollRef} className="ax-q090-scroll" style={{padding: '14px 18px', flex: 1, minHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12}}>
          {messages.map((m, i) => <ChatLine key={i} m={m}/>)}
          {streaming !== null && <ChatLine m={{ role: 'bot', text: streaming + '▍' }}/>}
        </div>
        <div style={{padding: '8px 14px', borderTop: `1px solid ${C.line}`, display: 'flex', gap: 6, flexWrap: 'wrap', background: C.bg}}>
          {['Pricing?', 'Show me the catalog', 'How does it work?'].map(s => (
            <button key={s} type="button" onClick={() => ask(s)} style={{appearance: 'none', border: `1px solid ${C.line}`, background: C.surface, padding: '5px 10px', cursor: 'pointer', fontFamily: SERIF, fontStyle: 'italic', fontSize: 12, color: C.dim, transition: 'all .2s ease'}}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.tangerine; e.currentTarget.style.color = C.tangerine; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.color = C.dim; }}>
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); ask(input); }} style={{padding: '10px 18px', borderTop: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 8, background: C.bg}}>
          <span style={{fontFamily: SERIF, fontWeight: 500, fontSize: 18, color: C.tangerine}}>›</span>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={streaming !== null ? 'Andrés is replying…' : 'Write a quick question…'}
            disabled={streaming !== null}
            style={{flex: 1, appearance: 'none', border: 'none', outline: 'none', background: 'transparent', fontFamily: DISPLAY, color: C.ink, fontSize: 13, letterSpacing: '-0.005em', padding: 2}}/>
          <button type="submit" disabled={streaming !== null || !input.trim()} style={{appearance: 'none', border: `1px solid ${input.trim() && streaming === null ? C.tangerine : C.line}`, color: input.trim() && streaming === null ? C.tangerine : C.faint, background: 'transparent', cursor: input.trim() && streaming === null ? 'pointer' : 'not-allowed', padding: '5px 9px', fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600}}>Send ↵</button>
        </form>
      </>
    );
  };
  const ChatLine = ({ m }) => {
    if (m.role === 'sys') return <div style={{fontFamily: MONO, fontSize: 9, color: C.mute, letterSpacing: '0.22em', textTransform: 'uppercase'}}>— {m.text} —</div>;
    if (m.role === 'user') return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{display: 'inline-block', maxWidth: '85%', padding: '7px 11px', background: C.panel, border: `1px solid ${C.line}`, color: C.ink, fontFamily: DISPLAY, fontSize: 12.5, lineHeight: 1.5}}>{m.text}</div>
      </div>
    );
    return (
      <div style={{display: 'flex', gap: 10, alignItems: 'flex-start'}}>
        <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: C.tangerine, flexShrink: 0, lineHeight: 1, paddingTop: 2}}>A.</span>
        <div style={{fontFamily: DISPLAY, fontSize: 13, color: C.ink, lineHeight: 1.6, whiteSpace: 'pre-wrap', flex: 1}}>{m.text}</div>
      </div>
    );
  };

  // ─── TOP BAR — AXIUS wordmark + center status + accepting eyebrow
  const TopBar = () => (
    <header style={{
      display: 'grid', gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center', columnGap: 36,
      padding: `36px ${pad}px 28px`,
      borderBottom: `1px solid ${C.line}`,
    }}>
      {/* LEFT — AXIUS + two-line tagline */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        <AxiusMark/>
        <div style={{
          fontFamily: MONO, fontSize: 10, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: C.mute, lineHeight: 1.7, maxWidth: 280,
        }}>An independent technology<br/>operations practice</div>
      </div>

      {/* CENTER — operator online badge */}
      <div style={{
        display: 'inline-flex', flexDirection: 'column', gap: 6,
        padding: '14px 22px',
        border: `1px solid ${C.lineHi}`,
        background: 'transparent',
        minWidth: 240,
      }}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
          <span style={{display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: C.tangerine, animation: 'axQ090Pulse 2.4s ease-out infinite'}}/>
          <Eyebrow color={C.ink}>Operator Online</Eyebrow>
        </div>
        <div style={{display: 'inline-flex', alignItems: 'baseline', gap: 10, paddingLeft: 18}}>
          <LiveClock/>
          <span style={{color: C.faint}}>·</span>
          <span style={{fontFamily: MONO, fontSize: 11, color: C.mute, letterSpacing: '0.2em'}}>MDE</span>
        </div>
      </div>

      {/* RIGHT — only accepting */}
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{display: 'inline-flex', alignItems: 'stretch', border: `1px solid ${C.lineHi}`}}>
          <span style={{
            padding: '8px 14px',
            fontFamily: MONO, fontSize: 10, fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: C.mute,
          }}>Only Accepting</span>
          <span style={{
            padding: '8px 14px',
            fontFamily: MONO, fontSize: 10, fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: C.ink,
            borderLeft: `1px solid ${C.lineHi}`,
          }}>3 New Clients / Month</span>
        </div>
      </div>
    </header>
  );

  // ─── HERO ──────────────────────────────────────────────────
  const Hero = () => {
    const [titleHover, setTitleHover] = React.useState(false);
    return (
      <section id="hero" style={{padding: `72px ${pad}px 64px`, position: 'relative'}}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr',
          columnGap: 120, rowGap: 56, alignItems: 'stretch',
        }}>
          {/* LEFT — H1 */}
          <h1
            onMouseEnter={() => setTitleHover(true)}
            onMouseLeave={() => setTitleHover(false)}
            style={{
              gridColumn: 1, gridRow: 1,
              margin: 0, fontFamily: DISPLAY, fontWeight: 600,
              fontSize: 96, lineHeight: 1.0, letterSpacing: '-0.045em',
              color: C.ink, cursor: 'default',
            }}>
            <span style={{display: 'inline-block'}}>Run your business.</span><br/>
            <span style={{
              position: 'relative', display: 'inline-block',
              color: titleHover ? '#FFFFFF' : C.mutedText,
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
              <span style={{position: 'relative', zIndex: 1}}>Not your tech.</span>
            </span>
          </h1>

          {/* RIGHT — Direct Line card + collage */}
          <div style={{
            gridColumn: 2, gridRow: '1 / span 2',
            position: 'relative', minHeight: 520,
          }}>
            <WorkflowDiagram style={{top: -30, left: -148, transform: 'rotate(-4.5deg)', zIndex: 1}}/>
            <CodePanel style={{left: -118, top: 280, transform: 'rotate(-2deg)', zIndex: 1}}/>
            <ServerRack style={{right: -100, top: 8, transform: 'rotate(1.5deg)', zIndex: 1}}/>
            <VennDiagram style={{right: -130, top: 340, transform: 'rotate(2.5deg)', zIndex: 1}}/>
            <div style={{position: 'relative', zIndex: 10, marginTop: 0}}>
              <DirectLine/>
            </div>
          </div>

          {/* LEFT — copper hairline + subhead + bullets + CTAs */}
          <div style={{gridColumn: 1, gridRow: 2}}>
            <div style={{height: 2, width: 96, background: C.tangerine, marginBottom: 26}}/>
            <p style={{
              margin: 0, maxWidth: 520,
              fontFamily: MONO, fontWeight: 400,
              fontSize: 13, color: C.dim, lineHeight: 1.85,
              letterSpacing: '0.04em',
            }}>
              We run the tech side of your business —<br/>
              websites, automations, AI tools, integrations,<br/>
              all of it — for one monthly fee.<br/>
              <span style={{color: C.ink}}>The team you'd hire if you knew where to look.</span>
            </p>

            {/* HOW WE WORK bullets */}
            <div style={{marginTop: 44}}>
              <Eyebrow color={C.mute} style={{marginBottom: 14}}>How we work</Eyebrow>
              {['Systems that scale', 'Freedom that lasts', 'Clarity in the chaos'].map((label, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'baseline', gap: 16,
                  fontFamily: MONO, fontSize: 12, fontWeight: 500,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: C.ink, padding: '3px 0',
                  width: '100%',
                }}>
                  <span style={{color: C.tangerine}}>+</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div style={{display: 'flex', gap: 14, marginTop: 40}}>
              <Btn primary size="lg" onClick={() => openBooking('Axius — discovery call')}>Book a discovery call</Btn>
              <Btn size="lg" onClick={() => scrollToId('catalog')}>See the catalog</Btn>
            </div>
          </div>
        </div>

        {/* stats bar */}
        <div style={{
          marginTop: 84,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
        }}>
          {[
            { v: '129',  k: 'Workflows operated' },
            { v: '9',    k: 'Categories' },
            { v: '< 24h', k: 'Response · Tier 3' },
            { v: '$1k',  k: 'Starts at, per month' },
          ].map((s, i, arr) => (
            <div key={i} style={{
              padding: '26px 28px',
              paddingLeft: i === 0 ? 0 : 28,
              borderRight: i < arr.length - 1 ? `1px solid ${C.line}` : 'none',
            }}>
              <Eyebrow color={C.mute} style={{marginBottom: 14}}>{s.k}</Eyebrow>
              <div style={{fontFamily: DISPLAY, fontWeight: 600, fontSize: 56, letterSpacing: '-0.04em', color: C.ink, lineHeight: 1}}>{s.v}</div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // ─── Section atoms ─────────────────────────────────────────
  const SectionHead = ({ prefix, italic, suffix }) => (
    <h2 style={{margin: 0, fontFamily: DISPLAY, fontWeight: 600, fontSize: 64, lineHeight: 1.03, letterSpacing: '-0.04em', color: C.ink, maxWidth: 880}}>
      {prefix}<span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.tangerine}}>{italic}</span>{suffix}
    </h2>
  );

  const Section = ({ id, eyebrow, children, style = {} }) => (
    <section id={id} style={{padding: `108px ${pad}px`, borderTop: `1px solid ${C.line}`, ...style}}>
      <Eyebrow color={C.mute} style={{marginBottom: 32}}>{eyebrow}</Eyebrow>
      {children}
    </section>
  );

  // ─── Commitments (Work) ────────────────────────────────────
  const Work = () => {
    const items = (window.AxiusCommitments || []).slice(0, 3);
    return (
      <Section id="work" eyebrow="01 · Commitments">
        <SectionHead prefix="A small team, " italic="committed" suffix=" to your stack."/>
        <div style={{marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22}}>
          {items.map((c, i) => (
            <div key={i} style={{padding: 28, background: C.surface, border: `1px solid ${C.line}`}}>
              <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 32, color: C.tangerine, lineHeight: 1}}>{String(i+1).padStart(2,'0')}</div>
              <h3 style={{margin: '12px 0 10px', fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, letterSpacing: '-0.025em', color: C.ink}}>{c.title}</h3>
              <p style={{margin: 0, fontSize: 14, color: C.dim, lineHeight: 1.65}}>{c.body}</p>
              {c.metric && (
                <div style={{marginTop: 18, paddingTop: 12, borderTop: `1px solid ${C.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                  <Eyebrow color={C.mute}>{c.metric.label}</Eyebrow>
                  <span style={{fontFamily: DISPLAY, fontWeight: 600, fontSize: 17, color: C.tangerine}}>{c.metric.value}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    );
  };

  // ─── Method ────────────────────────────────────────────────
  const Method = () => {
    const stages = (window.AxiusMethodology || []).slice(0, 4);
    return (
      <Section id="method" eyebrow="03 · Method" style={{background: C.bg}}>
        <SectionHead prefix="Four " italic="stages" suffix=", repeating."/>
        <div style={{marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22}}>
          {stages.map((s, i) => (
            <div key={i} style={{padding: 22, background: C.surface, border: `1px solid ${C.line}`, borderTop: i === 0 ? `2px solid ${C.tangerine}` : `1px solid ${C.line}`}}>
              <Eyebrow color={i === 0 ? C.tangerine : C.mute}>Stage {String(i+1).padStart(2,'0')}</Eyebrow>
              <h3 style={{margin: '12px 0 10px', fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, letterSpacing: '-0.025em', color: C.ink}}>{s.name || s.title}.</h3>
              <p style={{margin: 0, fontSize: 13, color: C.dim, lineHeight: 1.6}}>{s.body || s.description}</p>
            </div>
          ))}
        </div>
      </Section>
    );
  };

  // ─── Catalog ───────────────────────────────────────────────
  const Catalog = () => {
    const cats = window.AxiusCatalog || [];
    const [active, setActive] = React.useState(0);
    const c = cats[active];
    if (!c) return null;
    return (
      <Section id="catalog" eyebrow="04 · Catalog">
        <SectionHead prefix="Nine " italic="categories" suffix=", 129 workflows."/>
        <div style={{marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 28}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
            {cats.map((cat, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                appearance: 'none', cursor: 'pointer', textAlign: 'left',
                padding: '14px 18px',
                background: i === active ? C.ink : 'transparent',
                color: i === active ? C.bg : C.ink,
                border: `1px solid ${i === active ? C.ink : C.line}`,
                fontFamily: MONO, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all .2s ease',
              }}>
                <span>{cat.name}</span>
                <span style={{color: i === active ? C.tangerine : C.tangerine}}>{cat.samples.length}</span>
              </button>
            ))}
          </div>
          <div style={{background: C.surface, border: `1px solid ${C.line}`, padding: 28}}>
            <h3 style={{margin: 0, fontFamily: DISPLAY, fontWeight: 600, fontSize: 30, letterSpacing: '-0.03em', color: C.ink}}>{c.name}.</h3>
            <p style={{margin: '10px 0 20px', fontSize: 14, color: C.dim, lineHeight: 1.65}}>{c.description}</p>
            <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
              {c.samples.slice(0, 6).map((s, i) => (
                <li key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0', borderBottom: `1px solid ${C.line}`, fontFamily: DISPLAY, fontSize: 14, color: C.ink}}>
                  <span>{s.name}</span>
                  <span style={{fontFamily: MONO, fontSize: 11, color: C.mute, letterSpacing: '0.12em'}}>{s.points} pts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    );
  };

  // ─── Pricing ───────────────────────────────────────────────
  const Pricing = () => {
    const tiers = window.AxiusPricing || [];
    return (
      <Section id="pricing" eyebrow="05 · Pricing" style={{background: C.bg}}>
        <SectionHead prefix="Three " italic="sizes" suffix=" of operating layer."/>
        <div style={{marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22}}>
          {tiers.map((p, i) => {
            const featured = !!p.featured;
            return (
              <div key={i} style={{position: 'relative', padding: 30, background: C.surface, border: `1px solid ${featured ? C.tangerine : C.line}`, transform: featured ? 'translateY(-10px)' : 'translateY(0)', display: 'flex', flexDirection: 'column', gap: 16}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                  <Eyebrow color={featured ? C.tangerine : C.mute}>TIER {String(i+1).padStart(2,'0')}</Eyebrow>
                  {featured && <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: C.tangerine}}>Recommended</span>}
                </div>
                <h3 style={{margin: 0, fontFamily: DISPLAY, fontWeight: 600, fontSize: 40, letterSpacing: '-0.034em', color: C.ink}}>{p.name || p.id}.</h3>
                <p style={{margin: 0, fontSize: 14, color: C.dim, lineHeight: 1.55, minHeight: 44}}>{p.sub}</p>
                <div style={{paddingTop: 14, borderTop: `1px solid ${C.line}`, display: 'flex', alignItems: 'baseline', gap: 8}}>
                  <span style={{fontFamily: DISPLAY, fontWeight: 600, fontSize: 44, color: C.ink, letterSpacing: '-0.04em'}}>${p.price.toLocaleString()}</span>
                  <span style={{fontFamily: MONO, fontSize: 11, color: C.mute, letterSpacing: '0.1em'}}>/ mo</span>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '14px 0', borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`}}>
                  {[['capacity', `${p.points} pts`], ['response', p.response], ['cadence', p.cadence], ['comms', p.comms]].map(([k, v]) => (
                    <div key={k}>
                      <Eyebrow color={C.mute} style={{marginBottom: 4}}>{k}</Eyebrow>
                      <div style={{fontFamily: DISPLAY, fontSize: 13, color: C.ink}}>{v}</div>
                    </div>
                  ))}
                </div>
                <Btn primary size="md" onClick={() => openBooking(`Axius — ${p.name || p.id} tier inquiry`)} style={{justifyContent: 'center'}}>Book a call</Btn>
              </div>
            );
          })}
        </div>
      </Section>
    );
  };

  // ─── Founder ───────────────────────────────────────────────
  const Founder = () => {
    const f = window.AxiusFounder || {};
    return (
      <Section id="founder" eyebrow="06 · Founder">
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center'}}>
          <img src={f.photo || 'andres-toro.jpg'} alt="Andrés Toro" style={{width: '100%', display: 'block', filter: 'saturate(0.88) contrast(1.04)', border: `1px solid ${C.line}`}}/>
          <div>
            <SectionHead prefix="One " italic="operator" suffix=", a decade in."/>
            <p style={{margin: '28px 0 0', maxWidth: 540, fontFamily: DISPLAY, fontSize: 17, color: C.dim, lineHeight: 1.7}}>
              Ten years inside operations at startups and SMBs across the US and Latin America.
              Based in Medellín, available on US business hours, in English and Spanish.{' '}
              <span style={{color: C.ink}}>You hire me — not an account.</span>
            </p>
          </div>
        </div>
      </Section>
    );
  };

  // ─── FAQ ───────────────────────────────────────────────────
  const FAQ = () => {
    const faqs = (window.AxiusFAQ || []).slice(0, 6);
    const [open, setOpen] = React.useState(-1);
    return (
      <Section id="faq" eyebrow="07 · FAQ" style={{background: C.bg}}>
        <SectionHead prefix="Questions, " italic="asked simply" suffix="."/>
        <div style={{marginTop: 44, maxWidth: 920}}>
          {faqs.map((f, i) => (
            <div key={i} style={{borderTop: `1px solid ${C.line}`}}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{width: '100%', textAlign: 'left', appearance: 'none', cursor: 'pointer', background: 'transparent', border: 'none', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24}}>
                <span style={{fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, color: C.ink, letterSpacing: '-0.01em'}}>{f.q}</span>
                <span style={{fontFamily: MONO, fontSize: 16, color: C.tangerine, fontWeight: 600}}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <div style={{paddingBottom: 22, fontSize: 14, color: C.dim, lineHeight: 1.7, maxWidth: 700}}>{f.a}</div>}
            </div>
          ))}
          <div style={{borderTop: `1px solid ${C.line}`}}/>
        </div>
      </Section>
    );
  };

  // ─── CTA ───────────────────────────────────────────────────
  const CTA = () => (
    <section style={{padding: `120px ${pad}px 108px`, textAlign: 'center', borderTop: `1px solid ${C.line}`}}>
      <Eyebrow color={C.mute} style={{marginBottom: 26}}>08 · Open conversation</Eyebrow>
      <h2 style={{margin: '0 auto', fontFamily: DISPLAY, fontWeight: 600, fontSize: 76, lineHeight: 1.0, letterSpacing: '-0.045em', color: C.ink, maxWidth: 820}}>
        Let's have <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.tangerine}}>a conversation</span>.
      </h2>
      <p style={{margin: '30px auto 0', maxWidth: 520, fontSize: 17, color: C.dim, lineHeight: 1.7}}>Thirty minutes. You leave with a one-page audit either way. No pitch, no pressure — just a clear picture of your stack.</p>
      <div style={{display: 'flex', gap: 14, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap'}}>
        <Btn primary size="lg" onClick={() => openBooking('Axius — discovery call')}>Schedule the conversation</Btn>
        <Btn size="lg" onClick={() => openEmail('Axius — discovery call')}>andres@axius.tech</Btn>
      </div>
    </section>
  );

  // ─── Compose the framed page ──────────────────────────────
  return (
    <div style={{
      background: C.bg, color: C.ink,
      fontFamily: DISPLAY, minHeight: '100vh',
      padding: framePad,
    }}>
      <div style={{
        border: `1px solid ${C.lineFrame}`,
        background: C.bg,
      }}>
        <TopBar/>
        <Hero/>
        <Work/>
        <Method/>
        <Catalog/>
        <Pricing/>
        <Founder/>
        <FAQ/>
        <CTA/>
      </div>
    </div>
  );
};

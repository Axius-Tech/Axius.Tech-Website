// ─── Direction E075 — Quiet 0.75 ───────────────────────────
// An editorial collage direction. Bone canvas, charcoal ink,
// copper accents. The Direct Line card is treated as the closed
// state of an operational identity panel — not a hero image but
// the interface itself, surrounded by tactile editorial artifacts:
// a hand-drawn workflow diagram, a monospace code fragment, a
// server-rack illustration, a Venn diagram, and torn paper.
//
// English-only by design. Intentionally restrained: no gradients,
// no shadows, no glow. Texture comes from paper grain + halftone.

window.AxiusDirectionE075 = function AxiusDirectionE075() {
  // ─── Font + global style injection ─────────────────────────
  React.useEffect(() => {
    if (!document.getElementById('axius-q075-fonts')) {
      const link = document.createElement('link');
      link.id = 'axius-q075-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap';
      document.head.appendChild(link);
    }
    if (!document.getElementById('axius-q075-styles')) {
      const style = document.createElement('style');
      style.id = 'axius-q075-styles';
      style.textContent = `
        @keyframes axQ075Pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139,184,162,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(139,184,162,0); }
        }
        @keyframes axQ075DrawIn {
          0%   { stroke-dashoffset: 360; }
          100% { stroke-dashoffset: 0; }
        }
        .ax-q075-grain {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(rgba(15,14,12,0.06) 1px, transparent 1px),
            radial-gradient(rgba(15,14,12,0.04) 1px, transparent 1px);
          background-size: 3px 3px, 7px 7px;
          background-position: 0 0, 1px 1px;
          mix-blend-mode: multiply;
          pointer-events: none;
        }
        .ax-q075-stage section[id], .ax-q075-stage header[id] { scroll-margin-top: 80px; }
        #stage-quiet075 a { color: inherit; }
        .ax-q075-scroll { scrollbar-width: thin; scrollbar-color: rgba(184,116,60,0.4) transparent; }
        .ax-q075-scroll::-webkit-scrollbar { width: 8px; }
        .ax-q075-scroll::-webkit-scrollbar-thumb {
          background: rgba(184,116,60,0.35);
        }
        .ax-q075-rotate-l { transform: rotate(-3.5deg); transform-origin: center center; }
        .ax-q075-rotate-r { transform: rotate(2.5deg); transform-origin: center center; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // ─── Palette (per spec) ────────────────────────────────────
  const C = {
    bone:        '#F5F1EA',
    boneMuted:   'rgba(245,241,234,0.72)',
    boneDeeper:  '#EDE7DC',
    paper:       '#FAF6EE',
    charcoal:    '#0F0E0C',
    slate:       '#151311',
    copper:      '#B8743C',
    burnishedGold: '#C89B67',
    mutedText:   '#8E877F',
    line:        'rgba(15,14,12,0.12)',
    lineHi:      'rgba(15,14,12,0.22)',
    successDot:  '#8BB8A2',
    ink:         '#0F0E0C',
    dim:         'rgba(15,14,12,0.62)',
    mute:        'rgba(15,14,12,0.42)',
    faint:       'rgba(15,14,12,0.22)',
    ghost:       'rgba(15,14,12,0.06)',
  };

  const DISPLAY = '"Geist", "Inter Tight", "Neue Montreal", "Helvetica Now", system-ui, sans-serif';
  const MONO    = '"Geist Mono", "IBM Plex Mono", ui-monospace, monospace';
  const SERIF   = '"Instrument Serif", "Canela", "Cormorant Garamond", serif';

  const pad = 120;

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
    const root = document.getElementById('stage-quiet075') || document;
    const el = root.querySelector('#' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ─── Atoms ─────────────────────────────────────────────────
  const Eyebrow = ({ children, color, style = {} }) => (
    <div style={{
      fontFamily: MONO, fontSize: 11, fontWeight: 500,
      letterSpacing: '0.22em', textTransform: 'uppercase',
      color: color || C.mutedText, ...style,
    }}>{children}</div>
  );

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
        fontFamily: MONO, fontSize: 11, fontWeight: 500,
        color: C.dim, letterSpacing: '0.18em', textTransform: 'uppercase',
        fontVariantNumeric: 'tabular-nums', ...style,
      }}>{time} · MDE</span>
    );
  };

  // ─── Quiet-style nav link with underline reveal on hover ──
  const Q075Link = ({ children, accent = C.copper, style = {}, ...rest }) => {
    const [h, setH] = React.useState(false);
    return (
      <a {...rest}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', display: 'inline-flex', alignItems: 'baseline', gap: 6,
          color: h ? accent : C.mutedText,
          fontFamily: MONO, fontWeight: 500,
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

  // ─── CTA button ────────────────────────────────────────────
  const Btn = ({ children, primary, onClick, size = 'md', style = {} }) => {
    const [h, setH] = React.useState(false);
    const sizes = {
      sm: { pad: '10px 16px', fs: 12 },
      md: { pad: '14px 22px', fs: 13 },
      lg: { pad: '18px 28px', fs: 14 },
    };
    const s = sizes[size];
    const bg = primary ? (h ? C.copper : C.charcoal) : 'transparent';
    const ink = primary ? C.bone : (h ? C.copper : C.charcoal);
    const border = primary ? bg : (h ? C.copper : C.lineHi);
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
          letterSpacing: '0.18em', textTransform: 'uppercase',
          transition: 'all .25s cubic-bezier(.2,.8,.2,1)',
          ...style,
        }}>
        {children}
        <span style={{transform: h ? 'translateX(3px)' : 'translateX(0)', transition: 'transform .25s ease'}}>→</span>
      </button>
    );
  };

  // ─── Wordmark — axius.tech (bold black + muted .tech) ──────
  const Wordmark = ({ size = 22 }) => (
    <div style={{
      fontFamily: DISPLAY, fontWeight: 700,
      fontSize: size, letterSpacing: '-0.035em',
      color: C.charcoal, lineHeight: 1,
      display: 'inline-flex', alignItems: 'baseline',
    }}>
      axius<span style={{color: C.mutedText, fontWeight: 500}}>.tech</span>
    </div>
  );

  // ─── Collage SVG artifacts ─────────────────────────────────

  // A. Workflow diagram — hand-drawn boxes on grid paper, rotated
  const WorkflowDiagram = ({ style = {} }) => (
    <div style={{
      position: 'absolute',
      width: 180, height: 220,
      background: C.paper,
      border: `1px solid ${C.line}`,
      padding: 14,
      ...style,
    }}>
      <div className="ax-q075-grain"/>
      {/* grid paper */}
      <svg viewBox="0 0 180 220" width="100%" height="100%" style={{display: 'block'}}>
        <defs>
          <pattern id="q075gridA" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" stroke="rgba(15,14,12,0.08)" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="180" height="220" fill="url(#q075gridA)"/>
        {/* hand-drawn boxes */}
        <g stroke={C.charcoal} strokeWidth="1.1" fill="none" strokeLinecap="round">
          <rect x="14" y="14" width="48" height="22"/>
          <rect x="76" y="14" width="48" height="22"/>
          <rect x="14" y="64" width="48" height="22"/>
          <rect x="76" y="64" width="48" height="22"/>
          <rect x="14" y="114" width="110" height="22"/>
          <rect x="40" y="160" width="60" height="34" stroke={C.copper}/>
          {/* connectors */}
          <path d="M62 25 L76 25" />
          <path d="M38 36 L38 64" />
          <path d="M100 36 L100 64" />
          <path d="M38 86 L38 114" />
          <path d="M100 86 L100 114" />
          <path d="M70 136 L70 160" stroke={C.copper}/>
        </g>
        {/* tiny copper square — focal */}
        <rect x="92" y="46" width="8" height="8" fill={C.copper}/>
      </svg>
    </div>
  );

  // B. Code fragment — black panel with monospace JS
  const CodePanel = ({ style = {} }) => (
    <div style={{
      position: 'absolute',
      width: 218, padding: '16px 16px 18px',
      background: C.slate, color: C.bone,
      border: `1px solid ${C.charcoal}`,
      fontFamily: MONO, fontSize: 10.5, lineHeight: 1.65,
      letterSpacing: '0.01em',
      ...style,
    }}>
      <div className="ax-q075-grain" style={{opacity: 0.4}}/>
      <div style={{color: 'rgba(245,241,234,0.45)'}}>// systems work</div>
      <div style={{color: 'rgba(245,241,234,0.45)'}}>// people grow</div>
      <div style={{color: 'rgba(245,241,234,0.45)'}}>// businesses scale</div>
      <div style={{height: 10}}/>
      <div><span style={{color: C.burnishedGold}}>function</span> operational(system) {`{`}</div>
      <div style={{paddingLeft: 14}}>align(people);</div>
      <div style={{paddingLeft: 14}}>automate(work);</div>
      <div style={{paddingLeft: 14}}>optimize(flow);</div>
      <div style={{paddingLeft: 14}}><span style={{color: C.burnishedGold}}>return</span> <span style={{color: C.copper}}>freedom</span>;</div>
      <div>{`}`}</div>
    </div>
  );

  // C. Server rack — vertical SVG, monochrome
  const ServerRack = ({ style = {} }) => (
    <div style={{
      position: 'absolute',
      width: 92, height: 280,
      background: C.charcoal,
      border: `1px solid ${C.charcoal}`,
      padding: 6,
      overflow: 'hidden',
      ...style,
    }}>
      <div className="ax-q075-grain" style={{opacity: 0.55}}/>
      <svg viewBox="0 0 80 268" width="100%" height="100%" style={{display: 'block'}}>
        {/* rack frame */}
        <rect x="1" y="1" width="78" height="266" fill="none" stroke="rgba(245,241,234,0.22)" strokeWidth="0.5"/>
        {/* 16 rack units */}
        {Array.from({length: 16}).map((_, i) => {
          const y = 8 + i * 16;
          return (
            <g key={i}>
              <rect x="6" y={y} width="68" height="13" fill={i % 4 === 2 ? '#1B1916' : '#161412'} stroke="rgba(245,241,234,0.10)" strokeWidth="0.3"/>
              {/* indicator LEDs */}
              <circle cx="11" cy={y + 6.5} r="1.1" fill={i === 5 ? C.successDot : 'rgba(245,241,234,0.18)'}/>
              <circle cx="15" cy={y + 6.5} r="1.1" fill={i === 9 ? C.copper : 'rgba(245,241,234,0.10)'}/>
              {/* vent strip */}
              <rect x="22" y={y + 5} width="42" height="3" fill="rgba(245,241,234,0.06)"/>
              <rect x="22" y={y + 5} width="42" height="3" fill="none" stroke="rgba(245,241,234,0.05)" strokeWidth="0.2"/>
            </g>
          );
        })}
      </svg>
    </div>
  );

  // D. Venn diagram — three overlapping circles + labels
  const VennDiagram = ({ style = {} }) => (
    <div style={{
      position: 'absolute',
      width: 200, height: 180,
      background: C.paper,
      border: `1px solid ${C.line}`,
      padding: 14,
      ...style,
    }}>
      <div className="ax-q075-grain"/>
      <svg viewBox="0 0 200 180" width="100%" height="100%" style={{display: 'block'}}>
        {/* grid backdrop */}
        <defs>
          <pattern id="q075gridV" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0V10" stroke="rgba(15,14,12,0.06)" strokeWidth="0.4" fill="none"/>
          </pattern>
          <clipPath id="q075vennCenter">
            <circle cx="80" cy="80" r="42"/>
            <circle cx="120" cy="80" r="42"/>
            <circle cx="100" cy="118" r="42"/>
          </clipPath>
        </defs>
        <rect width="200" height="180" fill="url(#q075gridV)"/>
        {/* center fill (where all three overlap) */}
        <g>
          <path d="
            M100 80
            A 42 42 0 0 1 100 118
            A 42 42 0 0 1 100 80 Z
          " fill={C.copper} opacity="0.85"/>
        </g>
        {/* three rings */}
        <circle cx="80"  cy="80"  r="42" fill="none" stroke={C.charcoal} strokeWidth="1.1"/>
        <circle cx="120" cy="80"  r="42" fill="none" stroke={C.charcoal} strokeWidth="1.1"/>
        <circle cx="100" cy="118" r="42" fill="none" stroke={C.charcoal} strokeWidth="1.1"/>
        {/* labels */}
        <text x="78" y="36" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1.2" fill={C.charcoal}>PEOPLE</text>
        <text x="16" y="158" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1.2" fill={C.charcoal}>PROCESS</text>
        <text x="138" y="158" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1.2" fill={C.charcoal}>TECHNOLOGY</text>
      </svg>
    </div>
  );

  // E. Grid paper fragment — torn-edge, copper square accent
  const PaperFragment = ({ style = {}, size = 'sm' }) => (
    <div style={{
      position: 'absolute',
      width: size === 'lg' ? 160 : 110,
      height: size === 'lg' ? 110 : 80,
      background: C.paper,
      border: `1px solid ${C.line}`,
      ...style,
    }}>
      <div className="ax-q075-grain"/>
      <svg viewBox="0 0 110 80" width="100%" height="100%" style={{display: 'block'}}>
        <defs>
          <pattern id="q075gridP" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0V10" stroke="rgba(15,14,12,0.08)" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="110" height="80" fill="url(#q075gridP)"/>
        <rect x="40" y="32" width="14" height="14" fill={C.copper}/>
      </svg>
    </div>
  );

  // ─── DirectLine — card → chat transition ───────────────────
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
        background: C.paper,
        border: `1px solid ${C.lineHi}`,
        width: '100%',
        display: 'flex', flexDirection: 'column',
        minHeight: 384,
        overflow: 'hidden',
        zIndex: 10,
      }}>
        {/* CARD MODE */}
        <div style={{
          position: 'relative',
          opacity: mode === 'card' && !transitioning ? 1 : 0,
          pointerEvents: mode === 'card' && !transitioning ? 'auto' : 'none',
          transition: 'opacity .32s cubic-bezier(.2,.8,.2,1)',
          display: mode === 'card' ? 'flex' : 'none',
          flexDirection: 'column',
        }}>
          {/* header */}
          <div style={{
            padding: '16px 22px',
            borderBottom: `1px solid ${C.line}`,
            background: C.bone,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{display: 'inline-flex', alignItems: 'baseline', gap: 16}}>
              <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, color: C.copper, letterSpacing: '-0.005em'}}>
                Direct line.
              </span>
              <Eyebrow color={C.mutedText}>Andrés Toro</Eyebrow>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: MONO, fontSize: 10, color: C.dim,
              letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>
              <span style={{
                display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                background: C.successDot,
                animation: 'axQ075Pulse 2.4s ease-out infinite',
              }}/>
              available
            </span>
          </div>

          {/* portrait + identity */}
          <div style={{
            padding: '22px 22px 18px',
            display: 'grid', gridTemplateColumns: '88px 1fr', gap: 18,
            alignItems: 'center',
          }}>
            <div style={{
              position: 'relative', width: 88, height: 88,
              borderRadius: '50%', overflow: 'hidden',
              border: `1px solid ${C.lineHi}`,
              background: C.boneDeeper,
            }}>
              <img src={photo} alt="Andrés Toro" style={{
                width: '100%', height: '100%', objectFit: 'cover',
                objectPosition: '50% 30%',
                filter: 'saturate(0.85) contrast(1.04) brightness(0.97)',
                display: 'block',
              }}/>
              <span aria-hidden style={{
                position: 'absolute', right: 3, bottom: 3,
                width: 13, height: 13, borderRadius: '50%',
                background: C.successDot,
                boxShadow: `0 0 0 2px ${C.paper}`,
              }}/>
            </div>

            <div>
              <div style={{
                fontFamily: DISPLAY, fontWeight: 600, fontSize: 22,
                letterSpacing: '-0.025em', color: C.charcoal, lineHeight: 1.05,
              }}>Andrés Toro</div>
              <div style={{
                marginTop: 4,
                fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: C.dim,
                lineHeight: 1.4,
              }}>Operator · Medellín, in office now</div>
              <div style={{
                marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: MONO, fontSize: 10, color: C.mutedText,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                fontVariantNumeric: 'tabular-nums',
              }}>
                <LiveClock/>
                <span style={{color: C.faint}}>·</span>
                <span>EN / ES</span>
              </div>
            </div>
          </div>

          <div style={{
            padding: '0 22px 18px',
            fontFamily: DISPLAY, fontSize: 14, color: C.dim, lineHeight: 1.6,
            flex: 1,
          }}>
            A direct line to whoever does the work — no account
            managers, no ticket queues. <span style={{color: C.charcoal}}>Ask anything; I answer in this window.</span>
          </div>

          <div style={{
            padding: '0 22px 22px',
            display: 'flex', gap: 10, flexWrap: 'wrap',
          }}>
            <Btn primary size="md" onClick={openChat}>Talk now</Btn>
            <a href={`mailto:${EMAIL}`} style={{
              appearance: 'none', cursor: 'pointer',
              background: 'transparent', color: C.dim, border: `1px solid ${C.lineHi}`,
              padding: '14px 18px',
              fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em',
              textTransform: 'uppercase', fontWeight: 600,
              textDecoration: 'none',
              transition: 'all .25s ease',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.copper; e.currentTarget.style.borderColor = C.copper; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.dim; e.currentTarget.style.borderColor = C.lineHi; }}>
              andres@axius.tech
            </a>
          </div>
        </div>

        {/* CHAT MODE */}
        <div style={{
          position: 'relative',
          opacity: mode === 'chat' && !transitioning ? 1 : 0,
          pointerEvents: mode === 'chat' && !transitioning ? 'auto' : 'none',
          transition: 'opacity .32s cubic-bezier(.2,.8,.2,1)',
          display: mode === 'chat' ? 'flex' : 'none',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
        }}>
          {mode === 'chat' && <AskAndres onBack={backToCard}/>}
        </div>
      </div>
    );
  };

  // ─── Ask Andrés — pared-down keyword chat ──────────────────
  const AskAndres = ({ onBack }) => {
    const initial = [
      { role: 'sys', text: 'Open desk · Andrés is at the office' },
      { role: 'bot', text: 'Hi. Ask me about pricing, the catalog, or how we work — direct answers, no fluff.' },
    ];
    const [messages, setMessages] = React.useState(initial);
    const [input, setInput] = React.useState('');
    const [streaming, setStreaming] = React.useState(null);
    const scrollRef = React.useRef(null);
    const inputRef = React.useRef(null);

    React.useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, streaming]);

    React.useEffect(() => {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 380);
    }, []);

    const responses = {
      greet: "Welcome. Ask me anything about how Axius operates — I won't invent.",
      pricing: "Three editions:\n\n  · Operator · $1,000/mo · 2 pts · 72h response\n  · Team · $2,500/mo · 5 pts · 48h response (recommended)\n  · Department · $5,000/mo · 10 pts · 24h response\n\nSetup waived on same-day close. Month-to-month after 90 days.",
      catalog: "129 workflows across 9 categories — Sales, CX, Operations, AI, Data, Web, Software, Marketing, Content.",
      method: "Four stages:\n  I  · Audit (Days 1–7)\n  II · Configure (Days 8–14)\n  III · Operate (Month 1+)\n  IV · Evolve (Quarterly)",
      contact: "Write to andres@axius.tech, or use Book a call up top. Response times: 24h (Department), 48h (Team), 72h (Operator).",
      default: "I track a narrow domain: pricing, catalog, methodology, founder, contact. Try 'pricing' or 'how does it work'.",
    };
    const match = (q) => {
      const s = q.toLowerCase();
      if (/^\s*(hi|hello|hey)/.test(s)) return responses.greet;
      if (/pric|cost|tier|fee|month/.test(s)) return responses.pricing;
      if (/catalog|workflow|sample/.test(s)) return responses.catalog;
      if (/method|stage|how.+work|process/.test(s)) return responses.method;
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
        if (i >= reply.length) {
          clearInterval(id);
          setMessages(m => [...m, { role: 'bot', text: reply }]);
          setStreaming(null);
        } else {
          setStreaming(reply.slice(0, i));
        }
      }, speed);
    };

    return (
      <>
        <div style={{
          padding: '14px 20px',
          borderBottom: `1px solid ${C.line}`,
          background: C.bone,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{display: 'inline-flex', alignItems: 'baseline', gap: 12}}>
            <button onClick={onBack} type="button" style={{
              appearance: 'none', border: 'none', background: 'transparent',
              cursor: 'pointer', padding: 0,
              fontFamily: MONO, fontSize: 10, color: C.mutedText,
              letterSpacing: '0.2em', textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = C.copper}
            onMouseLeave={(e) => e.currentTarget.style.color = C.mutedText}>← back</button>
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: C.copper}}>Ask Andrés.</span>
            <Eyebrow color={C.mutedText}>direct line</Eyebrow>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: MONO, fontSize: 10, color: C.dim,
            letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>
            <span style={{
              display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
              background: C.successDot,
              animation: 'axQ075Pulse 2.4s ease-out infinite',
            }}/>
            open
          </span>
        </div>

        <div ref={scrollRef} className="ax-q075-scroll" style={{
          padding: '16px 20px',
          flex: 1, minHeight: 200, overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {messages.map((m, i) => <Line key={i} m={m}/>)}
          {streaming !== null && <Line m={{ role: 'bot', text: streaming + '▍' }}/>}
        </div>

        <div style={{
          padding: '8px 16px', borderTop: `1px solid ${C.line}`,
          display: 'flex', gap: 6, flexWrap: 'wrap', background: C.bone,
        }}>
          {['Pricing?', 'Show me the catalog', 'How does it work?'].map(s => (
            <button key={s} type="button" onClick={() => ask(s)} style={{
              appearance: 'none', border: `1px solid ${C.line}`, background: C.paper,
              padding: '5px 10px', cursor: 'pointer',
              fontFamily: SERIF, fontStyle: 'italic', fontSize: 12, color: C.dim,
              transition: 'all .2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.copper; e.currentTarget.style.color = C.copper; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.color = C.dim; }}>
              {s}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); ask(input); }} style={{
          padding: '12px 20px', borderTop: `1px solid ${C.line}`,
          display: 'flex', alignItems: 'center', gap: 8, background: C.bone,
        }}>
          <span style={{fontFamily: SERIF, fontWeight: 500, fontSize: 18, color: C.copper}}>›</span>
          <input ref={inputRef} value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={streaming !== null ? 'Andrés is replying…' : 'Write a quick question…'}
            disabled={streaming !== null}
            style={{
              flex: 1, appearance: 'none', border: 'none', outline: 'none', background: 'transparent',
              fontFamily: DISPLAY, color: C.charcoal, fontSize: 13, letterSpacing: '-0.005em',
              padding: 2,
            }}/>
          <button type="submit" disabled={streaming !== null || !input.trim()} style={{
            appearance: 'none', border: `1px solid ${input.trim() && streaming === null ? C.copper : C.line}`,
            color: input.trim() && streaming === null ? C.copper : C.faint,
            background: 'transparent',
            cursor: input.trim() && streaming === null ? 'pointer' : 'not-allowed',
            padding: '5px 9px',
            fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600,
          }}>Send ↵</button>
        </form>
      </>
    );
  };

  const Line = ({ m }) => {
    if (m.role === 'sys') return (
      <div style={{
        fontFamily: MONO, fontSize: 9, color: C.mutedText,
        letterSpacing: '0.22em', textTransform: 'uppercase',
      }}>— {m.text} —</div>
    );
    if (m.role === 'user') return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{
          display: 'inline-block', maxWidth: '85%',
          padding: '7px 11px',
          background: C.boneDeeper, border: `1px solid ${C.line}`,
          color: C.charcoal, fontFamily: DISPLAY, fontSize: 12.5, lineHeight: 1.5,
        }}>{m.text}</div>
      </div>
    );
    return (
      <div style={{display: 'flex', gap: 10, alignItems: 'flex-start'}}>
        <span style={{
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 15, color: C.copper,
          flexShrink: 0, lineHeight: 1, paddingTop: 2,
        }}>A.</span>
        <div style={{
          fontFamily: DISPLAY, fontSize: 13, color: C.charcoal, lineHeight: 1.6,
          whiteSpace: 'pre-wrap', flex: 1,
        }}>{m.text}</div>
      </div>
    );
  };

  // ─── Nav ───────────────────────────────────────────────────
  const Nav = () => (
    <nav style={{
      display: 'grid', gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center', columnGap: 36,
      padding: `22px ${pad}px`,
      background: C.boneMuted,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${C.line}`,
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <Wordmark size={22}/>

      <div style={{display: 'flex', justifyContent: 'center', gap: 38}}>
        {['Work', 'Method', 'Catalog', 'Pricing', 'Founder'].map((label) => {
          const id = label.toLowerCase();
          return (
            <Q075Link key={id} href={'#' + id}
              onClick={(e) => { e.preventDefault(); scrollToId(id); }}
              style={{
                fontSize: 11,
                letterSpacing: '0.24em', textTransform: 'uppercase',
              }}>
              {label}
            </Q075Link>
          );
        })}
      </div>

      <div style={{display: 'inline-flex', alignItems: 'center', gap: 22}}>
        <LiveClock/>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: MONO, fontSize: 10, color: C.dim,
          letterSpacing: '0.22em', textTransform: 'uppercase',
        }}>
          <span style={{
            display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
            background: C.successDot,
            animation: 'axQ075Pulse 2.4s ease-out infinite',
          }}/>
          On duty
        </span>
        {/* EN / ES disabled toggle (visual parity with reference) */}
        <span style={{
          display: 'inline-flex', alignItems: 'stretch',
          border: `1px solid ${C.lineHi}`,
          fontFamily: MONO, fontSize: 10, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
        }}>
          <span style={{padding: '6px 10px', background: C.copper, color: C.bone}}>EN</span>
          <span style={{padding: '6px 10px', color: C.mutedText, borderLeft: `1px solid ${C.lineHi}`}}>ES</span>
        </span>
        <Btn primary size="sm" onClick={() => openBooking('Axius — discovery call')}>Book a call</Btn>
      </div>
    </nav>
  );

  // ─── Hero ──────────────────────────────────────────────────
  const Hero = () => {
    const [practiceHover, setPracticeHover] = React.useState(false);
    const [eyebrowHover, setEyebrowHover] = React.useState(false);
    const [titleHover, setTitleHover] = React.useState(false);

    return (
      <header id="hero" style={{
        position: 'relative', overflow: 'hidden',
        padding: `96px ${pad}px 96px`,
      }}>
        <div style={{position: 'relative', zIndex: 1}}>
          {/* eyebrows */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: 56,
          }}>
            <div
              onMouseEnter={() => setPracticeHover(true)}
              onMouseLeave={() => setPracticeHover(false)}
              style={{cursor: 'default'}}>
              <Eyebrow color={practiceHover ? C.copper : C.mutedText} style={{
                transition: 'color .35s ease',
              }}>Axius — An independent technology operations practice</Eyebrow>
            </div>
            <div
              onMouseEnter={() => setEyebrowHover(true)}
              onMouseLeave={() => setEyebrowHover(false)}
              style={{cursor: 'default'}}>
              <Eyebrow color={titleHover || eyebrowHover ? C.copper : C.mutedText} style={{
                transition: 'color .35s ease',
              }}>
                Only Accepting · 3 New Clients / Month
              </Eyebrow>
            </div>
          </div>

          {/* Two-column hero. Wide column gap gives the title room to
              breathe; the collage sits around the Direct Line card on the
              right with deeper offsets so artifacts don't crowd the card. */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1.2fr 1fr',
            columnGap: 160, rowGap: 56, alignItems: 'stretch',
          }}>
            {/* LEFT — H1 */}
            <h1
              onMouseEnter={() => setTitleHover(true)}
              onMouseLeave={() => setTitleHover(false)}
              style={{
                gridColumn: 1, gridRow: 1,
                margin: 0, fontFamily: DISPLAY, fontWeight: 600,
                fontSize: 104, lineHeight: 0.98, letterSpacing: '-0.045em',
                color: C.charcoal,
                cursor: 'default',
              }}>
              <span style={{display: 'inline-block'}}>Run<br/>your business.</span><br/>
              {/* "Not your tech." — copper rectangle + bone text reveal on hover */}
              <span style={{
                position: 'relative', display: 'inline-block',
                color: titleHover ? C.bone : C.mutedText,
                padding: '0.04em 0.14em 0.08em',
                whiteSpace: 'nowrap',
                transition: 'color .45s cubic-bezier(.2,.8,.2,1)',
              }}>
                <span aria-hidden style={{
                  position: 'absolute', inset: 0,
                  background: C.copper,
                  opacity: titleHover ? 1 : 0,
                  transform: titleHover ? 'scaleX(1)' : 'scaleX(0.94)',
                  transformOrigin: '0% 50%',
                  transition: 'opacity .5s cubic-bezier(.2,.8,.2,1), transform .55s cubic-bezier(.2,.8,.2,1)',
                  zIndex: 0,
                }}/>
                <span style={{position: 'relative', zIndex: 1}}>Not your tech.</span>
              </span>
            </h1>

            {/* RIGHT — Direct Line card with editorial collage around it */}
            <div style={{
              gridColumn: 2, gridRow: 1,
              position: 'relative',
              display: 'flex', flexDirection: 'column',
              minHeight: 460,
            }}>
              {/* Collage back layer — pushed further out from the card on
                  every side so each artifact reads as a separate printed piece */}
              <WorkflowDiagram style={{
                top: -56, left: -168,
                transform: 'rotate(-4.5deg)',
                zIndex: 1,
              }}/>
              <CodePanel style={{
                left: -138, top: 310,
                transform: 'rotate(-2.2deg)',
                zIndex: 1,
              }}/>
              <ServerRack style={{
                right: -118, top: 12,
                transform: 'rotate(1.5deg)',
                zIndex: 1,
              }}/>
              <VennDiagram style={{
                right: -150, top: 340,
                transform: 'rotate(3deg)',
                zIndex: 1,
              }}/>
              <PaperFragment style={{
                right: -8, top: -72,
                transform: 'rotate(-2.5deg)',
                zIndex: 1,
              }}/>

              {/* Card stays on top */}
              <div style={{position: 'relative', zIndex: 10}}>
                <DirectLine/>
              </div>
            </div>

            {/* LEFT — subhead + CTAs (row 2) */}
            <div style={{gridColumn: 1, gridRow: 2}}>
              <p style={{
                margin: 0, maxWidth: 560,
                fontFamily: DISPLAY, fontWeight: 400,
                fontSize: 18, color: C.dim, lineHeight: 1.65,
                letterSpacing: '-0.003em',
              }}>
                We run the tech side of your business — websites, automations,
                AI tools, integrations, all of it — for one monthly fee.<br/>
                <span style={{color: C.charcoal}}>The team you'd hire if you knew where to look.</span>
              </p>
              {/* copper hairline */}
              <div style={{height: 2, width: 80, background: C.copper, marginTop: 22}}/>
              <div style={{display: 'flex', gap: 12, marginTop: 28}}>
                <Btn primary size="lg" onClick={() => openBooking('Axius — discovery call')}>Book a discovery call</Btn>
                <Btn size="lg" onClick={() => scrollToId('catalog')}>See the catalog</Btn>
              </div>
            </div>
          </div>

          {/* stats bar */}
          <div style={{
            marginTop: 96,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
          }}>
            {[
              { v: '129', k: 'workflows operated', accent: C.copper },
              { v: '9',   k: 'categories',         accent: C.mutedText },
              { v: '< 24h', k: 'response · tier 3', accent: C.mutedText },
              { v: '$1k', k: 'starts at, per month', accent: C.mutedText },
            ].map((s, i, arr) => (
              <div key={i} style={{
                padding: '28px 28px 28px 0',
                borderRight: i < arr.length - 1 ? `1px solid ${C.line}` : 'none',
                paddingLeft: i === 0 ? 0 : 28,
              }}>
                <Eyebrow color={C.mutedText} style={{marginBottom: 14}}>{s.k}</Eyebrow>
                <div style={{
                  fontFamily: DISPLAY, fontWeight: 600, fontSize: 56,
                  letterSpacing: '-0.04em', color: C.charcoal, lineHeight: 1,
                }}>{s.v}</div>
                {i === 0 && <div style={{height: 2, width: 32, background: C.copper, marginTop: 14}}/>}
              </div>
            ))}
          </div>
        </div>
      </header>
    );
  };

  // ─── Section divider with eyebrow + heading ────────────────
  const Section = ({ id, eyebrow, children, style = {} }) => (
    <section id={id} style={{padding: `120px ${pad}px`, position: 'relative', ...style}}>
      <Eyebrow color={C.mutedText} style={{marginBottom: 36}}>{eyebrow}</Eyebrow>
      {children}
    </section>
  );

  const SectionHead = ({ prefix, italic, suffix }) => (
    <h2 style={{
      margin: 0, fontFamily: DISPLAY, fontWeight: 600,
      fontSize: 72, lineHeight: 1.02, letterSpacing: '-0.04em',
      color: C.charcoal, maxWidth: 920,
    }}>
      {prefix}
      <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.copper}}>{italic}</span>
      {suffix}
    </h2>
  );

  // ─── Commitments (Work) ────────────────────────────────────
  const Work = () => {
    const items = (window.AxiusCommitments || []).slice(0, 3);
    return (
      <Section id="work" eyebrow="01 · Commitments">
        <SectionHead prefix="A small team, " italic="committed" suffix=" to your stack."/>
        <div style={{
          marginTop: 64,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28,
        }}>
          {items.map((c, i) => (
            <div key={i} style={{
              padding: 28, background: C.paper, border: `1px solid ${C.line}`,
              position: 'relative',
            }}>
              <div style={{
                fontFamily: SERIF, fontStyle: 'italic', fontSize: 36, color: C.copper, lineHeight: 1,
              }}>{String(i+1).padStart(2,'0')}</div>
              <h3 style={{
                margin: '14px 0 12px', fontFamily: DISPLAY, fontWeight: 600,
                fontSize: 22, letterSpacing: '-0.025em', color: C.charcoal, lineHeight: 1.15,
              }}>{c.title}</h3>
              <p style={{margin: 0, fontSize: 14, color: C.dim, lineHeight: 1.65}}>{c.body}</p>
              {c.metric && (
                <div style={{
                  marginTop: 20, paddingTop: 14, borderTop: `1px solid ${C.line}`,
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                }}>
                  <Eyebrow color={C.mutedText}>{c.metric.label}</Eyebrow>
                  <span style={{fontFamily: DISPLAY, fontWeight: 600, fontSize: 18, color: C.copper, letterSpacing: '-0.02em'}}>{c.metric.value}</span>
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
      <Section id="method" eyebrow="03 · Method" style={{background: C.boneDeeper, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`}}>
        <SectionHead prefix="Four " italic="stages" suffix=", repeating."/>
        <div style={{
          marginTop: 64,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28,
        }}>
          {stages.map((s, i) => (
            <div key={i} style={{
              padding: 24, background: C.paper, border: `1px solid ${C.line}`,
              position: 'relative',
              borderTop: i === 0 ? `2px solid ${C.copper}` : `1px solid ${C.line}`,
            }}>
              <Eyebrow color={i === 0 ? C.copper : C.mutedText}>Stage {String(i+1).padStart(2,'0')}</Eyebrow>
              <h3 style={{
                margin: '12px 0 10px', fontFamily: DISPLAY, fontWeight: 600,
                fontSize: 22, letterSpacing: '-0.025em', color: C.charcoal,
              }}>{s.name || s.title}.</h3>
              <p style={{margin: 0, fontSize: 13, color: C.dim, lineHeight: 1.6}}>{s.body || s.description}</p>
              {s.artifact && (
                <div style={{
                  marginTop: 18, paddingTop: 12, borderTop: `1px solid ${C.line}`,
                  fontFamily: MONO, fontSize: 10, color: C.mutedText, letterSpacing: '0.16em', textTransform: 'uppercase',
                }}>→ {s.artifact}</div>
              )}
            </div>
          ))}
        </div>
      </Section>
    );
  };

  // ─── Catalog (lightweight) ─────────────────────────────────
  const Catalog = () => {
    const cats = window.AxiusCatalog || [];
    const [active, setActive] = React.useState(0);
    const c = cats[active];
    if (!c) return null;
    return (
      <Section id="catalog" eyebrow="04 · Catalog">
        <SectionHead prefix="Nine " italic="categories" suffix=", 129 workflows."/>
        <div style={{
          marginTop: 56,
          display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32,
        }}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            {cats.map((cat, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                appearance: 'none', cursor: 'pointer',
                textAlign: 'left',
                padding: '14px 18px',
                background: i === active ? C.charcoal : 'transparent',
                color: i === active ? C.bone : C.charcoal,
                border: `1px solid ${i === active ? C.charcoal : C.line}`,
                fontFamily: MONO, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all .2s ease',
              }}>
                <span>{cat.name}</span>
                <span style={{color: i === active ? C.burnishedGold : C.copper}}>{cat.samples.length}</span>
              </button>
            ))}
          </div>
          <div style={{background: C.paper, border: `1px solid ${C.line}`, padding: 28, position: 'relative'}}>
            <h3 style={{
              margin: 0, fontFamily: DISPLAY, fontWeight: 600,
              fontSize: 32, letterSpacing: '-0.03em', color: C.charcoal,
            }}>{c.name}.</h3>
            <p style={{margin: '12px 0 22px', fontSize: 14, color: C.dim, lineHeight: 1.65}}>{c.description}</p>
            <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10}}>
              {c.samples.slice(0, 6).map((s, i) => (
                <li key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '10px 0', borderBottom: `1px solid ${C.line}`,
                  fontFamily: DISPLAY, fontSize: 14, color: C.charcoal,
                }}>
                  <span>{s.name}</span>
                  <span style={{fontFamily: MONO, fontSize: 11, color: C.mutedText, letterSpacing: '0.12em'}}>{s.points} pts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    );
  };

  // ─── Pricing (lightweight) ─────────────────────────────────
  const Pricing = () => {
    const tiers = window.AxiusPricing || [];
    return (
      <Section id="pricing" eyebrow="05 · Pricing" style={{background: C.boneDeeper, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`}}>
        <SectionHead prefix="Three " italic="sizes" suffix=" of operating layer."/>
        <div style={{
          marginTop: 56,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22,
        }}>
          {tiers.map((p, i) => {
            const featured = !!p.featured;
            return (
              <div key={i} style={{
                position: 'relative', padding: 32,
                background: C.paper,
                border: `1px solid ${featured ? C.copper : C.line}`,
                transform: featured ? 'translateY(-12px)' : 'translateY(0)',
                transition: 'all .25s ease',
                display: 'flex', flexDirection: 'column', gap: 18,
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                  <Eyebrow color={featured ? C.copper : C.mutedText}>TIER {String(i+1).padStart(2,'0')}</Eyebrow>
                  {featured && (
                    <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: C.copper}}>Recommended</span>
                  )}
                </div>
                <h3 style={{
                  margin: 0, fontFamily: DISPLAY, fontWeight: 600,
                  fontSize: 42, letterSpacing: '-0.034em', color: C.charcoal, lineHeight: 1,
                }}>{p.name || p.id}.</h3>
                <p style={{margin: 0, fontSize: 14, color: C.dim, lineHeight: 1.55, minHeight: 48}}>{p.sub}</p>
                <div style={{paddingTop: 18, borderTop: `1px solid ${C.line}`, display: 'flex', alignItems: 'baseline', gap: 8}}>
                  <span style={{fontFamily: DISPLAY, fontWeight: 600, fontSize: 46, color: C.charcoal, letterSpacing: '-0.04em'}}>${p.price.toLocaleString()}</span>
                  <span style={{fontFamily: MONO, fontSize: 11, color: C.mutedText, letterSpacing: '0.1em'}}>/ mo</span>
                </div>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                  padding: '14px 0', borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
                }}>
                  {[['capacity', `${p.points} pts`], ['response', p.response], ['cadence', p.cadence], ['comms', p.comms]].map(([k, v]) => (
                    <div key={k}>
                      <Eyebrow color={C.mutedText} style={{marginBottom: 4}}>{k}</Eyebrow>
                      <div style={{fontFamily: DISPLAY, fontSize: 13, color: C.charcoal}}>{v}</div>
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
          <div style={{position: 'relative'}}>
            <img src={f.photo || 'andres-toro.jpg'} alt="Andrés Toro"
              style={{
                width: '100%', display: 'block',
                filter: 'saturate(0.86) contrast(1.04)',
                border: `1px solid ${C.line}`,
              }}/>
          </div>
          <div>
            <SectionHead prefix="One " italic="operator" suffix=", a decade in."/>
            <p style={{
              margin: '32px 0 0', maxWidth: 540,
              fontFamily: DISPLAY, fontSize: 18, color: C.dim, lineHeight: 1.7,
            }}>
              Ten years inside operations at startups and SMBs across the US and Latin
              America. Based in Medellín, available on US business hours, in English
              and Spanish. <span style={{color: C.charcoal}}>You hire me — not an account.</span>
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
      <Section id="faq" eyebrow="07 · FAQ" style={{background: C.boneDeeper, borderTop: `1px solid ${C.line}`}}>
        <SectionHead prefix="Questions, " italic="asked simply" suffix="."/>
        <div style={{marginTop: 48, maxWidth: 920}}>
          {faqs.map((f, i) => (
            <div key={i} style={{borderTop: `1px solid ${C.line}`}}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: '100%', textAlign: 'left', appearance: 'none', cursor: 'pointer',
                background: 'transparent', border: 'none',
                padding: '20px 0',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24,
              }}>
                <span style={{
                  fontFamily: DISPLAY, fontWeight: 500, fontSize: 18,
                  color: C.charcoal, letterSpacing: '-0.01em',
                }}>{f.q}</span>
                <span style={{
                  fontFamily: MONO, fontSize: 16, color: C.copper, fontWeight: 600,
                }}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div style={{paddingBottom: 22, fontSize: 14, color: C.dim, lineHeight: 1.7, maxWidth: 700}}>{f.a}</div>
              )}
            </div>
          ))}
          <div style={{borderTop: `1px solid ${C.line}`}}/>
        </div>
      </Section>
    );
  };

  // ─── CTA ───────────────────────────────────────────────────
  const CTA = () => (
    <section style={{
      padding: `136px ${pad}px 120px`, textAlign: 'center', position: 'relative',
    }}>
      <div style={{position: 'relative'}}>
        <Eyebrow color={C.mutedText} style={{marginBottom: 28}}>08 · Open conversation</Eyebrow>
        <h2 style={{
          margin: '0 auto', fontFamily: DISPLAY, fontWeight: 600,
          fontSize: 80, lineHeight: 1.0, letterSpacing: '-0.045em',
          color: C.charcoal, maxWidth: 820,
        }}>
          Let's have <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.copper}}>a conversation</span>.
        </h2>
        <p style={{
          margin: '36px auto 0', maxWidth: 520,
          fontSize: 17, color: C.dim, lineHeight: 1.7,
        }}>Thirty minutes. You leave with a one-page audit either way. No pitch, no pressure — just a clear picture of your stack.</p>
        <div style={{display: 'flex', gap: 14, justifyContent: 'center', marginTop: 44, flexWrap: 'wrap'}}>
          <Btn primary size="lg" onClick={() => openBooking('Axius — discovery call')}>Schedule the conversation</Btn>
          <Btn size="lg" onClick={() => openEmail('Axius — discovery call')}>andres@axius.tech</Btn>
        </div>
      </div>
    </section>
  );

  return (
    <div className="ax-q075-stage" style={{
      background: C.bone, color: C.charcoal,
      fontFamily: DISPLAY,
      minHeight: '100vh',
    }}>
      <Nav/>
      <Hero/>
      <Work/>
      <Method/>
      <Catalog/>
      <Pricing/>
      <Founder/>
      <FAQ/>
      <CTA/>
    </div>
  );
};

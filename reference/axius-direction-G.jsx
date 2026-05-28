// ============================================================
// AXIUS · DIRECTION G — MATRIX (terminal / AI / inside the sim)
// Full-bleed code rain, ASCII frames, phosphor glow,
// real working AI agent with streaming responses,
// live operations console. Inside the simulation.
// ============================================================

window.AxiusDirectionG = function () {

  // ─── Fonts + global keyframes ──────────────────────────────
  React.useEffect(() => {
    if (!document.getElementById('axius-matrix-fonts')) {
      const l = document.createElement('link');
      l.id = 'axius-matrix-fonts';
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Geist:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    }
    if (!document.getElementById('axius-matrix-styles')) {
      const s = document.createElement('style');
      s.id = 'axius-matrix-styles';
      s.textContent = `
        @keyframes axMxCursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes axMxPulse {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        @keyframes axMxTickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes axMxScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes axMxBoot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes axMxFlicker {
          0%, 95%, 100% { opacity: 1; }
          96%   { opacity: 0.85; }
          97%   { opacity: 1; }
          98%   { opacity: 0.92; }
        }
        @keyframes axMxRise {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ax-mx-rise { animation: axMxRise .6s ease both; }
        .ax-mx-glow { text-shadow: 0 0 10px rgba(34,255,136,0.55), 0 0 22px rgba(34,255,136,0.22); }
        .ax-mx-glow-amber { text-shadow: 0 0 10px rgba(255,178,61,0.55), 0 0 22px rgba(255,178,61,0.22); }

        /* Custom scrollbar inside the chat */
        .ax-mx-chat::-webkit-scrollbar { width: 6px; height: 6px; }
        .ax-mx-chat::-webkit-scrollbar-track { background: transparent; }
        .ax-mx-chat::-webkit-scrollbar-thumb { background: rgba(34,255,136,0.35); }

        .ax-mx-flicker { animation: axMxFlicker 6s infinite steps(1); }
      `;
      document.head.appendChild(s);
    }
  }, []);

  // ─── Palette ───────────────────────────────────────────────
  const C = {
    bg:          '#020503',
    panel:       '#06100A',
    raised:      '#0A1810',
    higher:      '#0F2418',
    ink:         '#A8FFCB',
    inkBright:   '#D4FFE0',
    dim:         'rgba(168,255,203,0.62)',
    mute:        'rgba(168,255,203,0.40)',
    faint:       'rgba(168,255,203,0.22)',
    line:        'rgba(168,255,203,0.12)',
    lineHi:      'rgba(168,255,203,0.28)',
    phosphor:    '#22FF88',
    phosphorHi:  '#7FFFB8',
    phosphorDeep:'#0F8C4A',
    amber:       '#FFB23D',
    cobalt:      '#4DC4FF',
    crimson:     '#FF4D4D',
  };

  const MONO  = '"JetBrains Mono", ui-monospace, monospace';
  const SANS  = '"Geist", "Inter", system-ui, sans-serif';

  const pad = 56;

  // ─── Matrix rain canvas — full viewport, sticky ────────────
  const MatrixRain = () => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const cvs = ref.current;
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const setSize = () => {
        cvs.width  = cvs.offsetWidth  * dpr;
        cvs.height = cvs.offsetHeight * dpr;
        ctx.scale(dpr, dpr);
      };
      setSize();
      const cs = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ#@$%&*+-=:;<>{}[]/\\?ﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓ';
      const cell = 14;
      const cols = Math.ceil(cvs.offsetWidth / cell);
      const drops = Array(cols).fill(0).map(() => Math.random() * cvs.offsetHeight / cell);
      const speeds = drops.map(() => 0.4 + Math.random() * 0.7);
      const heads  = drops.map(() => Math.random());

      let raf;
      let last = performance.now();
      const tick = (t) => {
        const dt = Math.min(40, t - last) / 16.67;
        last = t;
        ctx.fillStyle = 'rgba(2,5,3,0.07)';
        ctx.fillRect(0, 0, cvs.offsetWidth, cvs.offsetHeight);
        ctx.font = `${cell}px ${MONO}`;
        for (let i = 0; i < cols; i++) {
          const y = drops[i] * cell;
          const ch = cs[(Math.random() * cs.length) | 0];
          const head = heads[i] < 0.04;
          ctx.fillStyle = head ? 'rgba(212,255,224,0.95)' : 'rgba(34,255,136,0.55)';
          ctx.fillText(ch, i * cell, y);
          if (y > cvs.offsetHeight && Math.random() > 0.975) drops[i] = 0;
          else drops[i] += speeds[i] * dt;
          heads[i] = Math.random();
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const onResize = () => setSize();
      window.addEventListener('resize', onResize);
      return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
    }, []);
    return (
      <canvas ref={ref} style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.22, pointerEvents: 'none', zIndex: 0,
      }}/>
    );
  };

  // ─── Scan-line overlay ─────────────────────────────────────
  const ScanLines = () => (
    <>
      <div aria-hidden style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2,
        backgroundImage: `repeating-linear-gradient(180deg, rgba(34,255,136,0.045) 0px, rgba(34,255,136,0.045) 1px, transparent 1px, transparent 3px)`,
      }}/>
      <div aria-hidden style={{
        position: 'fixed', left: 0, right: 0, height: 80, pointerEvents: 'none', zIndex: 3,
        background: 'linear-gradient(180deg, rgba(34,255,136,0.06), transparent)',
        animation: 'axMxScan 9s linear infinite',
      }}/>
      {/* corner vignettes */}
      <div aria-hidden style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(2,5,3,0.55) 100%)',
      }}/>
    </>
  );

  // ─── Atoms ─────────────────────────────────────────────────

  // Mono label
  const Mono = ({ children, color, size = 11, weight = 500, style = {} }) => (
    <span style={{
      fontFamily: MONO, fontSize: size, fontWeight: weight,
      letterSpacing: '0.06em', color: color || C.dim,
      ...style,
    }}>{children}</span>
  );

  // Phosphor glow text
  const Phos = ({ children, size, weight = 500, style = {}, hi }) => (
    <span className="ax-mx-glow" style={{
      fontFamily: MONO, fontSize: size, fontWeight: weight,
      color: hi ? C.phosphorHi : C.phosphor,
      letterSpacing: '0.04em',
      ...style,
    }}>{children}</span>
  );

  // Blinking cursor
  const Caret = ({ color, size = 14, style = {} }) => (
    <span style={{
      display: 'inline-block', width: size * 0.55, height: size,
      background: color || C.phosphor,
      animation: 'axMxCursor 1s steps(1) infinite',
      transform: 'translateY(2px)',
      ...style,
    }}/>
  );

  // Status dot
  const Dot = ({ color = C.phosphor, pulse, style = {} }) => (
    <span style={{
      display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
      background: color,
      boxShadow: `0 0 8px ${color}`,
      animation: pulse ? 'axMxPulse 1.6s ease-in-out infinite' : 'none',
      ...style,
    }}/>
  );

  // Bracketed mono button — [ DO THE THING → ]
  const CmdBtn = ({ children, fill, color, size = 'md', onClick, style = {} }) => {
    const [h, setH] = React.useState(false);
    const sizes = { sm: { p: '8px 14px', f: 11 }, md: { p: '12px 18px', f: 13 }, lg: { p: '16px 24px', f: 14 } };
    const s = sizes[size];
    const accent = color || C.phosphor;
    const isFill = !!fill;
    return (
      <button onClick={onClick}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: isFill ? (h ? C.phosphorHi : accent) : 'transparent',
          color: isFill ? C.bg : (h ? accent : C.ink),
          border: `1px solid ${isFill ? accent : (h ? accent : C.lineHi)}`,
          padding: s.p, cursor: 'pointer',
          fontFamily: MONO, fontWeight: 600, fontSize: s.f,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          transition: 'all .2s ease',
          textShadow: !isFill && h ? `0 0 8px ${accent}66` : 'none',
          ...style,
        }}>
        <span style={{opacity: 0.6}}>[</span>
        {children}
        <span style={{marginLeft: -4}}>{h ? '◀' : '▶'}</span>
        <span style={{opacity: 0.6}}>]</span>
      </button>
    );
  };

  // Bordered panel with ASCII chrome
  const Panel = ({ title, status, statusColor, statusPulse, accent, children, style = {}, dense, glow }) => (
    <div style={{
      border: `1px solid ${glow ? C.phosphorDeep : C.line}`,
      background: C.panel,
      boxShadow: glow ? `0 0 0 1px rgba(34,255,136,0.1), inset 0 0 24px rgba(34,255,136,0.04)` : 'none',
      ...style,
    }}>
      {title && (
        <div style={{
          padding: dense ? '8px 12px' : '12px 16px',
          borderBottom: `1px solid ${C.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          background: C.raised,
        }}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
            <span style={{color: accent || C.phosphor, fontFamily: MONO, fontSize: 12, fontWeight: 600}}>┃</span>
            <Mono color={C.ink} size={11} weight={600} style={{letterSpacing: '0.18em', textTransform: 'uppercase'}}>
              {title}
            </Mono>
          </div>
          {status && (
            <div style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
              <Dot color={statusColor || C.phosphor} pulse={statusPulse}/>
              <Mono size={10} color={C.dim} style={{letterSpacing: '0.2em', textTransform: 'uppercase'}}>{status}</Mono>
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );

  // Bracketed mono frame e.g. ┌─ title ─┐
  const SectionFrame = ({ id, title, status, children, accent = C.phosphor, style = {} }) => (
    <section id={id} style={{
      position: 'relative', zIndex: 4,
      padding: `64px ${pad}px`,
      borderTop: `1px solid ${C.line}`,
      ...style,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32,
      }}>
        <span style={{fontFamily: MONO, color: accent, fontSize: 12, letterSpacing: '0.12em'}}>
          ╭─[
        </span>
        <Mono color={accent} size={11} weight={600} style={{letterSpacing: '0.24em', textTransform: 'uppercase'}}>
          § {id} · {title}
        </Mono>
        <span style={{fontFamily: MONO, color: accent, fontSize: 12, letterSpacing: '0.12em'}}>
          ]─
        </span>
        <span style={{flex: 1, height: 1, background: C.line}}/>
        {status && (
          <>
            <Dot color={C.phosphor} pulse/>
            <Mono size={10} color={C.dim} style={{letterSpacing: '0.22em', textTransform: 'uppercase'}}>{status}</Mono>
          </>
        )}
        <span style={{fontFamily: MONO, color: accent, fontSize: 12, letterSpacing: '0.12em'}}>─╮</span>
      </div>
      {children}
    </section>
  );

  // Sparkline
  const Sparkline = ({ data, width = 120, height = 32, color = C.phosphor }) => {
    if (!data || !data.length) return null;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = (max - min) || 1;
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 2) - 1;
      return `${x},${y}`;
    }).join(' ');
    return (
      <svg width={width} height={height} style={{display: 'block'}}>
        <polyline points={pts} fill="none" stroke={color} strokeWidth={1.2}
          style={{filter: `drop-shadow(0 0 4px ${color})`}}/>
        <circle cx={width} cy={height - ((data[data.length - 1] - min) / range) * (height - 2) - 1} r={2.5} fill={color}/>
      </svg>
    );
  };

  // Capacity meter
  const Meter = ({ value = 0.6, color = C.phosphor, width = '100%', label }) => (
    <div style={{width}}>
      {label && (
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
          <Mono size={10} color={C.mute} style={{textTransform: 'uppercase', letterSpacing: '0.18em'}}>{label}</Mono>
          <Mono size={10} color={color}>{Math.round(value * 100)}%</Mono>
        </div>
      )}
      <div style={{position: 'relative', height: 4, background: C.higher, border: `1px solid ${C.line}`}}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${value * 100}%`, background: color,
          boxShadow: `0 0 6px ${color}`,
        }}/>
      </div>
    </div>
  );

  // ─── Streaming Event Log — fixed bottom-right ──────────────
  const EventLog = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [events, setEvents] = React.useState(() => {
      const t = new Date();
      const fmt = (d) => d.toTimeString().slice(0, 8);
      return [
        { time: fmt(t), tag: 'BOOT', msg: 'axius.os v1.0 ready', color: C.phosphor },
        { time: fmt(new Date(t - 1000)), tag: 'OK',   msg: 'andres.ai · model warm', color: C.phosphor },
        { time: fmt(new Date(t - 4000)), tag: 'OK',   msg: '129 modules linked', color: C.phosphor },
      ];
    });

    React.useEffect(() => {
      const pool = [
        ['OK',   'stripe.webhook routed'],
        ['OK',   'missed_call.recovery triggered'],
        ['OK',   'monthly_report.md regenerated'],
        ['OK',   'config_map.json synced'],
        ['OK',   'voice.agent.qualification · 1 lead'],
        ['INFO', 'doc.automation · proposal sent'],
        ['OK',   'crm.sync · 12 records updated'],
        ['OK',   'dashboard.refresh · revenue +4.2%'],
        ['INFO', 'lead.score model · retrained'],
        ['OK',   'inbox.unification · 3 channels merged'],
        ['WARN', 'ticket #41 escalated · 6m old'],
        ['OK',   'ai.faq.bot · 2 questions answered'],
        ['OK',   'churn.signal · early warning logged'],
        ['INFO', 'workflow.complete · #007 onboarding pipeline'],
        ['OK',   'kb.agent · indexed 14 new docs'],
        ['OK',   'a/b.test · variant B winning · +18% CR'],
        ['INFO', 'compliance.audit · GDPR check passed'],
        ['OK',   'video.repurpose · 4 reels shipped'],
        ['OK',   'ltv.model · 12.4mo avg'],
        ['INFO', 'partner.report · sent to founder'],
      ];
      const id = setInterval(() => {
        const [tag, msg] = pool[(Math.random() * pool.length) | 0];
        const color = tag === 'WARN' ? C.amber : tag === 'INFO' ? C.cobalt : C.phosphor;
        const t = new Date();
        const time = t.toTimeString().slice(0, 8);
        setEvents(e => [...e.slice(-40), { time, tag, msg, color }]);
      }, 1700 + Math.random() * 1100);
      return () => clearInterval(id);
    }, []);

    const scrollRef = React.useRef(null);
    React.useEffect(() => {
      if (scrollRef.current && !collapsed) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [events, collapsed]);

    return (
      <div style={{
        position: 'fixed', bottom: 16, right: 16, zIndex: 70,
        width: 380,
        background: 'rgba(2,5,3,0.92)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        border: `1px solid ${C.phosphorDeep}`,
        boxShadow: `0 0 0 1px rgba(34,255,136,0.18), 0 0 30px rgba(34,255,136,0.12)`,
      }}>
        <div style={{
          padding: '8px 12px',
          borderBottom: `1px solid ${C.line}`,
          background: C.raised,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
            <Dot color={C.phosphor} pulse/>
            <Mono color={C.inkBright} size={10} weight={700} style={{letterSpacing: '0.24em', textTransform: 'uppercase'}}>EVENT.LOG</Mono>
            <Mono color={C.mute} size={9} style={{letterSpacing: '0.2em'}}>{events.length} EVENTS</Mono>
          </div>
          <button onClick={() => setCollapsed(c => !c)} style={{
            all: 'unset', cursor: 'pointer',
            color: C.phosphor, fontFamily: MONO, fontSize: 12,
          }}>{collapsed ? '◢' : '◤'}</button>
        </div>
        {!collapsed && (
          <div ref={scrollRef} className="ax-mx-chat" style={{
            padding: '8px 12px',
            height: 200, overflowY: 'auto',
            fontFamily: MONO, fontSize: 10.5, lineHeight: 1.7,
          }}>
            {events.map((e, i) => (
              <div key={i} style={{display: 'grid', gridTemplateColumns: '64px 44px 1fr', gap: 8}}>
                <span style={{color: C.faint, fontVariantNumeric: 'tabular-nums'}}>{e.time}</span>
                <span style={{color: e.color, fontWeight: 600}}>[{e.tag}]</span>
                <span style={{color: C.dim}}>{e.msg}</span>
              </div>
            ))}
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, color: C.phosphor}}>
              <span>▸</span><Caret size={10}/>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── Command Palette · ⌘K ──────────────────────────────────
  const CommandPalette = () => {
    const [open, setOpen] = React.useState(false);
    const [q, setQ] = React.useState('');
    const [idx, setIdx] = React.useState(0);
    const inputRef = React.useRef(null);

    const commands = [
      { icon: '▸', label: 'Jump to · Hero',          tag: 'nav',  action: () => { setOpen(false); } },
      { icon: '▸', label: 'Jump to · Commitments',   tag: 'nav',  action: () => { jump('01'); setOpen(false); } },
      { icon: '▸', label: 'Jump to · Diagnostic',    tag: 'nav',  action: () => { jump('02'); setOpen(false); } },
      { icon: '▸', label: 'Jump to · Method',        tag: 'nav',  action: () => { jump('03'); setOpen(false); } },
      { icon: '▸', label: 'Jump to · Catalog',       tag: 'nav',  action: () => { jump('04'); setOpen(false); } },
      { icon: '▸', label: 'Jump to · Comparison',    tag: 'nav',  action: () => { jump('05'); setOpen(false); } },
      { icon: '▸', label: 'Jump to · Pricing',       tag: 'nav',  action: () => { jump('06'); setOpen(false); } },
      { icon: '▸', label: 'Jump to · Operator',      tag: 'nav',  action: () => { jump('07'); setOpen(false); } },
      { icon: '▸', label: 'Jump to · Field Notes',   tag: 'nav',  action: () => { jump('08'); setOpen(false); } },
      { icon: '▸', label: 'Jump to · Letters / FAQ', tag: 'nav',  action: () => { jump('09'); setOpen(false); } },
      { icon: '★', label: 'Talk to Andrés.ai',       tag: 'act',  action: () => { setOpen(false); } },
      { icon: '✦', label: 'Book a discovery call',   tag: 'act',  action: () => { setOpen(false); } },
      { icon: '✉', label: 'Email · andres@axius.tech', tag: 'act', action: () => { window.location.href = 'mailto:andres@axius.tech'; setOpen(false); } },
      { icon: '⊕', label: 'About the operator',      tag: 'info', action: () => { jump('07'); setOpen(false); } },
      { icon: '◌', label: 'Print issue colophon',    tag: 'info', action: () => { window.print(); } },
    ];

    const jump = (id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const filtered = q ? commands.filter(c => c.label.toLowerCase().includes(q.toLowerCase())) : commands;

    React.useEffect(() => {
      const onKey = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          setOpen(o => !o);
        } else if (open && e.key === 'Escape') {
          setOpen(false);
        } else if (open && e.key === 'ArrowDown') {
          e.preventDefault();
          setIdx(i => Math.min(i + 1, filtered.length - 1));
        } else if (open && e.key === 'ArrowUp') {
          e.preventDefault();
          setIdx(i => Math.max(0, i - 1));
        } else if (open && e.key === 'Enter') {
          e.preventDefault();
          const c = filtered[idx];
          if (c) c.action();
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [open, idx, filtered]);

    React.useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
    React.useEffect(() => { setIdx(0); }, [q]);

    if (!open) return (
      <button onClick={() => setOpen(true)} style={{
        position: 'fixed', bottom: 248, right: 16, zIndex: 65,
        all: 'unset', cursor: 'pointer',
        padding: '8px 14px',
        background: 'rgba(2,5,3,0.92)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        border: `1px solid ${C.line}`,
        fontFamily: MONO, fontSize: 10, color: C.dim,
        letterSpacing: '0.22em', textTransform: 'uppercase',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.phosphor; e.currentTarget.style.color = C.phosphor; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.color = C.dim; }}>
        ⌘K · open palette
      </button>
    );

    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 90,
        background: 'rgba(2,5,3,0.78)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '14vh',
      }} onClick={() => setOpen(false)}>
        <div onClick={(e) => e.stopPropagation()} style={{
          width: 620,
          background: C.bg,
          border: `1px solid ${C.phosphor}`,
          boxShadow: `0 0 0 1px rgba(34,255,136,0.2), 0 30px 80px rgba(0,0,0,0.6)`,
        }}>
          <div style={{
            padding: '14px 18px', borderBottom: `1px solid ${C.line}`,
            display: 'flex', alignItems: 'center', gap: 12, background: C.raised,
          }}>
            <Mono color={C.phosphor} size={14} weight={600}>⌘K</Mono>
            <span style={{flex: 1, display: 'flex', alignItems: 'center', gap: 10}}>
              <Mono color={C.phosphor} size={14} weight={600}>›</Mono>
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="type to filter commands..."
                style={{
                  flex: 1, all: 'unset',
                  fontFamily: MONO, color: C.inkBright, fontSize: 14, letterSpacing: '0.02em',
                }}/>
              <Caret/>
            </span>
            <Mono color={C.mute} size={9} style={{letterSpacing: '0.22em'}}>{filtered.length} RESULTS</Mono>
          </div>
          <div style={{maxHeight: 380, overflowY: 'auto'}} className="ax-mx-chat">
            {filtered.length === 0 && (
              <div style={{padding: '40px', textAlign: 'center'}}>
                <Mono color={C.mute} size={11} style={{letterSpacing: '0.18em'}}>no matches</Mono>
              </div>
            )}
            {filtered.map((c, i) => (
              <button key={i} onClick={() => c.action()}
                onMouseEnter={() => setIdx(i)}
                style={{
                  all: 'unset', cursor: 'pointer', display: 'block', width: '100%', boxSizing: 'border-box',
                  padding: '12px 18px',
                  borderBottom: i < filtered.length - 1 ? `1px solid ${C.line}` : 'none',
                  background: idx === i ? 'rgba(34,255,136,0.08)' : 'transparent',
                  display: 'grid', gridTemplateColumns: '24px 1fr 60px', gap: 14, alignItems: 'center',
                }}>
                <span style={{color: idx === i ? C.phosphor : C.mute, fontFamily: MONO, fontSize: 14}}>{c.icon}</span>
                <span style={{fontFamily: MONO, fontSize: 13, color: idx === i ? C.inkBright : C.ink, letterSpacing: '-0.005em'}}>{c.label}</span>
                <Mono color={idx === i ? C.phosphor : C.faint} size={9} style={{letterSpacing: '0.22em', textAlign: 'right', textTransform: 'uppercase'}}>{c.tag}</Mono>
              </button>
            ))}
          </div>
          <div style={{
            padding: '8px 18px', borderTop: `1px solid ${C.line}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: C.raised,
          }}>
            <Mono color={C.mute} size={9} style={{letterSpacing: '0.22em', textTransform: 'uppercase'}}>↑↓ NAVIGATE · ↵ EXECUTE · ESC CLOSE</Mono>
            <Mono color={C.phosphor} size={9} style={{letterSpacing: '0.22em'}}>● andres.ai available</Mono>
          </div>
        </div>
      </div>
    );
  };

  // ─── Activity Heatmap · 90 days of operations ──────────────
  const Heatmap = () => {
    const cols = 14;
    const rows = 7;
    // Deterministic pseudo-random
    const seed = (n) => {
      const x = Math.sin(n) * 10000;
      return x - Math.floor(x);
    };
    const cells = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const i = c * rows + r;
        const isWeekend = r === 5 || r === 6;
        const base = isWeekend ? 0.15 : 0.55;
        const v = Math.max(0, Math.min(1, base + (seed(i * 7.13) - 0.5) * 0.9));
        cells.push({ c, r, v, i });
      }
    }
    const [hover, setHover] = React.useState(null);
    const cellSize = 14;
    const gap = 4;
    const w = cols * (cellSize + gap) - gap;
    const h = rows * (cellSize + gap) - gap;
    const totalOps = cells.reduce((s, c) => s + Math.round(c.v * 18), 0);

    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    return (
      <Panel title="ACTIVITY MATRIX · last 90 days · ops/day" status="LIVE" statusPulse>
        <div style={{padding: '18px 22px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: 24, alignItems: 'flex-start'}}>
          <div>
            <div style={{display: 'flex', gap: 8, alignItems: 'flex-start'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap, paddingTop: 0}}>
                {days.map((d, i) => (
                  <div key={d} style={{
                    height: cellSize, display: 'flex', alignItems: 'center',
                    fontFamily: MONO, fontSize: 9, color: i % 2 ? 'transparent' : C.mute,
                    letterSpacing: '0.18em',
                  }}>{d}</div>
                ))}
              </div>
              <svg width={w} height={h} style={{overflow: 'visible'}}>
                {cells.map(cell => {
                  const isHover = hover === cell.i;
                  return (
                    <rect key={cell.i}
                      x={cell.c * (cellSize + gap)} y={cell.r * (cellSize + gap)}
                      width={cellSize} height={cellSize}
                      fill={`rgba(34,255,136,${Math.max(0.06, cell.v)})`}
                      stroke={isHover ? C.phosphorHi : (cell.v > 0.85 ? C.phosphor : 'transparent')}
                      strokeWidth={isHover ? 1.5 : 1}
                      onMouseEnter={() => setHover(cell.i)}
                      onMouseLeave={() => setHover(null)}
                      style={{cursor: 'pointer', filter: cell.v > 0.85 ? `drop-shadow(0 0 4px rgba(34,255,136,0.5))` : 'none'}}/>
                  );
                })}
              </svg>
            </div>
            <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 12}}>
              <Mono size={9} color={C.mute} style={{letterSpacing: '0.18em', textTransform: 'uppercase'}}>less</Mono>
              {[0.1, 0.3, 0.5, 0.7, 0.9].map(v => (
                <span key={v} style={{
                  display: 'inline-block', width: cellSize, height: cellSize,
                  background: `rgba(34,255,136,${v})`,
                }}/>
              ))}
              <Mono size={9} color={C.mute} style={{letterSpacing: '0.18em', textTransform: 'uppercase'}}>more</Mono>
            </div>
          </div>

          <div>
            <Mono size={10} color={C.mute} style={{letterSpacing: '0.2em', textTransform: 'uppercase'}}>total ops · 90d</Mono>
            <div className="ax-mx-glow" style={{
              marginTop: 8,
              fontFamily: MONO, fontWeight: 800, fontSize: 48,
              letterSpacing: '-0.03em', lineHeight: 1, color: C.phosphor,
              fontVariantNumeric: 'tabular-nums',
            }}>{totalOps}</div>

            <div style={{marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.line}`}}>
              {hover != null ? (
                <>
                  <Mono size={10} color={C.mute} style={{letterSpacing: '0.18em', textTransform: 'uppercase'}}>selection</Mono>
                  <div style={{
                    marginTop: 4, fontFamily: MONO, fontSize: 14, color: C.inkBright,
                  }}>Day {hover + 1} · {Math.round(cells[hover].v * 18)} ops</div>
                  <Mono size={10} color={C.dim} style={{marginTop: 4}}>
                    {cells[hover].v > 0.85 ? '↗ unusual activity' : cells[hover].v > 0.5 ? '↗ steady ops' : '· quiet day'}
                  </Mono>
                </>
              ) : (
                <Mono size={10} color={C.faint} style={{letterSpacing: '0.18em'}}>hover a cell for detail</Mono>
              )}
            </div>

            <div style={{marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.line}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10}}>
              <div>
                <Mono size={9} color={C.mute} style={{letterSpacing: '0.18em', textTransform: 'uppercase'}}>peak</Mono>
                <Mono size={13} color={C.phosphor} weight={600} style={{display: 'block', marginTop: 4}}>18 ops</Mono>
              </div>
              <div>
                <Mono size={9} color={C.mute} style={{letterSpacing: '0.18em', textTransform: 'uppercase'}}>avg</Mono>
                <Mono size={13} color={C.inkBright} weight={600} style={{display: 'block', marginTop: 4}}>9.2 ops</Mono>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    );
  };

  // ─── Top status bar — live ─────────────────────────────────
  const TopBar = () => {
    const [time, setTime] = React.useState('');
    const [ping, setPing] = React.useState(34);
    const [cpu, setCpu] = React.useState(12);
    const [ram, setRam] = React.useState(48);
    React.useEffect(() => {
      const t = () => {
        try {
          const d = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hourCycle: 'h23', timeZone: 'America/Bogota',
          }).format(new Date());
          setTime(d);
        } catch { setTime(''); }
        setPing(p => Math.max(18, Math.min(58, p + (Math.random() - 0.5) * 6)));
        setCpu(c => Math.max(4, Math.min(38, c + (Math.random() - 0.5) * 4)));
        setRam(r => Math.max(36, Math.min(72, r + (Math.random() - 0.5) * 3)));
      };
      t();
      const id = setInterval(t, 1000);
      return () => clearInterval(id);
    }, []);
    return (
      <div style={{
        position: 'sticky', top: 0, zIndex: 60,
        padding: '8px 16px',
        borderBottom: `1px solid ${C.line}`,
        background: 'rgba(2,5,3,0.92)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        gap: 16, alignItems: 'center',
      }}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 16}}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: MONO, fontWeight: 700, fontSize: 12,
          }} className="ax-mx-glow">
            <span style={{color: C.phosphor}}>▮▯▮</span>
            <span style={{color: C.phosphorHi, letterSpacing: '0.2em'}}>AXIUS.OS</span>
            <span style={{color: C.mute, fontSize: 10}}>v1.0.0</span>
          </span>
          <span style={{color: C.faint, fontFamily: MONO}}>│</span>
          <Mono color={C.dim} size={10} style={{letterSpacing: '0.2em'}}>session {Math.floor(Math.random() * 9000 + 1000)}</Mono>
        </div>

        <div style={{display: 'inline-flex', alignItems: 'center', gap: 16}}>
          {[
            ['PING', `${ping.toFixed(0)}ms`, C.phosphor],
            ['CPU',  `${cpu.toFixed(0)}%`,    C.phosphor],
            ['RAM',  `${ram.toFixed(0)}%`,    C.phosphor],
            ['OPS',  '129/129',               C.phosphor],
            ['NET',  'CONN',                  C.phosphorHi],
          ].map(([k, v, c]) => (
            <div key={k} style={{display: 'inline-flex', alignItems: 'baseline', gap: 6}}>
              <Mono size={9} color={C.faint} style={{letterSpacing: '0.2em'}}>{k}</Mono>
              <Mono size={11} color={c} weight={600} style={{fontVariantNumeric: 'tabular-nums'}}>{v}</Mono>
            </div>
          ))}
        </div>

        <div style={{display: 'inline-flex', alignItems: 'center', gap: 14, justifyContent: 'flex-end'}}>
          <span style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
            <Dot color={C.phosphor} pulse/>
            <Mono size={10} color={C.dim} style={{letterSpacing: '0.2em'}}>OPERATOR ON DUTY</Mono>
          </span>
          <span style={{color: C.faint, fontFamily: MONO}}>│</span>
          <Mono size={10} color={C.dim} style={{letterSpacing: '0.18em', fontVariantNumeric: 'tabular-nums'}}>{time} · MDE</Mono>
          <span style={{color: C.faint, fontFamily: MONO}}>│</span>
          <Mono size={10} color={C.mute} style={{letterSpacing: '0.2em'}}>[?] HELP · [/] SEARCH · [ESC] EXIT</Mono>
        </div>
      </div>
    );
  };

  // ─── Live workflow ticker ──────────────────────────────────
  const Ticker = () => {
    const names = React.useMemo(() => {
      const all = (window.AxiusCatalog || []).flatMap(c => c.samples.map(s => `${s.n} ${s.name}`));
      return [...all, ...all];
    }, []);
    return (
      <div style={{
        position: 'sticky', top: 41, zIndex: 59,
        padding: '8px 0',
        background: 'rgba(2,5,3,0.92)',
        borderBottom: `1px solid ${C.line}`,
        overflow: 'hidden', whiteSpace: 'nowrap',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <span style={{
          padding: '0 14px', fontFamily: MONO, fontSize: 10, color: C.phosphor,
          letterSpacing: '0.22em', textTransform: 'uppercase', flexShrink: 0,
        }}>▌ LIVE FEED · OPERATING NOW</span>
        <div style={{flex: 1, overflow: 'hidden', position: 'relative'}}>
          <div style={{
            display: 'inline-flex', whiteSpace: 'nowrap', gap: 32,
            animation: 'axMxTickerScroll 80s linear infinite',
            willChange: 'transform',
          }}>
            {names.map((n, i) => (
              <span key={i} style={{fontFamily: MONO, fontSize: 11, color: C.dim, letterSpacing: '0.04em'}}>
                <span style={{color: C.phosphor}}>▸</span> {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── AI agent — terminal chat ──────────────────────────────
  const AIChat = () => {
    const initial = [
      { role: 'sys', text: 'CONNECTED · andres.ai v1.0 · trained on the axius practice' },
      { role: 'sys', text: 'session initiated · public read · ASK QUESTIONS' },
      { role: 'bot', text: "Hi. I'm Andrés.ai — I run the technology side of small businesses.\nAsk me about pricing, the catalog, the founder, or how we work." },
    ];
    const [messages, setMessages] = React.useState(initial);
    const [input, setInput] = React.useState('');
    const [streaming, setStreaming] = React.useState(null);
    const scrollRef = React.useRef(null);

    React.useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, streaming]);

    const responses = {
      greet: "Welcome. Ask me anything about how Axius operates — pricing, catalog, methodology, founder. I won't make anything up.",
      what: "Axius runs the technology side of your business — websites, automations, AI tools, integrations — for one monthly fee.\n\nOne operator. One bill. One inbox.\nThe team you'd hire if you knew where to look.",
      pricing: "Three editions:\n\n  ▸ OPERADOR · $1,000/mo · 2 pts active · 72h response\n  ▸ EQUIPO   · $2,500/mo · 5 pts active · 48h response · most chosen\n  ▸ DEPARTAMENTO · $5,000/mo · 10 pts · 24h response\n\nSetup waived on same-day close. Month-to-month after 90 days.\nPause anytime with two weeks' notice.",
      catalog: "129 workflows across 9 categories:\n\n  01 · Sales & Prospecting        (16)\n  02 · Customer Experience        (17)\n  03 · Internal Operations        (16)\n  04 · AI Implementation          (14)\n  05 · Data & Analytics           (13)\n  06 · Website & Storefront       (15)\n  07 · Custom Software            (15)\n  08 · Marketing & Growth         (11)\n  09 · Content & Creative         (12)\n\nWant a sample workflow from any category? Just ask.",
      founder: "Andrés Toro · founder & operator.\n\nTen years inside operations at startups and SMBs in the US and LatAm. Based in Medellín · available on US business hours · EN/ES.\n\nHe's the only operator you'll deal with — no account managers in the way.\n\nReach him directly: andres@axius.tech",
      method: "Four stages, each named, each delivered:\n\n  I   · AUDIT      (Days 1–7)   → stack_audit.pdf\n  II  · CONFIGURE  (Days 8–14)  → config_map.json\n  III · OPERATE    (Month 1+)   → monthly_report.md\n  IV  · EVOLVE     (Quarterly)  → roadmap.notion\n\nEach artifact is yours. If we ever part ways, you keep everything documented and operational.",
      contact: "Direct line: andres@axius.tech\n\nResponse times by tier:\n  ▸ Departamento · within 24h\n  ▸ Equipo       · within 48h\n  ▸ Operador     · within 72h\n\nOr book a discovery call from the buttons up top.",
      guarantee: "First-month outcome guarantee on Equipo & Departamento:\n\nWe agree to a quick win at kickoff. If we don't ship it inside 30 days, that month is on us.\n\nThe goal is to make the first call worth its own price by the end of week four.",
      ai: "AI is one workflow category among nine — alongside websites, automations, integrations, reporting, custom software, content production, and ops.\n\nMost of our work is plumbing, not prompts. We deploy AI when it earns its keep:\n  ▸ Knowledge-base agents\n  ▸ Sales call analysis\n  ▸ Predictive lead scoring\n  ▸ Multi-step internal agents\n  ▸ Voice qualification\n  ▸ FAQ chatbots",
      pause: "Month-to-month after the first 90 days.\n\nPause anytime with two weeks' notice.\nOr drop to Maintenance Mode at half your tier price to keep workflows live without active iteration.",
      default: "I track a narrow domain: pricing, catalog, methodology, founder, guarantees, contact, AI work, pausing.\n\nTry: 'pricing', 'catalog', 'founder', 'how does it work', or 'guarantee'.",
    };

    const match = (q) => {
      const s = q.toLowerCase();
      if (/^\s*(hi|hello|hey|sup|what'?s up)/.test(s)) return responses.greet;
      if (/pric|cost|tier|edition|how much|fee|month/.test(s)) return responses.pricing;
      if (/catalog|workflow|index|list|examples|what.+do|samples?/.test(s)) return responses.catalog;
      if (/founder|andr[eé]s|operator|who.+run|who.+behind/.test(s)) return responses.founder;
      if (/method|stage|process|how.+work|onboard|setup/.test(s)) return responses.method;
      if (/contact|reach|email|book|call|schedule/.test(s)) return responses.contact;
      if (/guarantee|refund|risk|trial/.test(s)) return responses.guarantee;
      if (/\bai\b|chatbot|gpt|llm|ml/.test(s)) return responses.ai;
      if (/pause|cancel|stop|leave|quit/.test(s)) return responses.pause;
      if (/what|axius|service|offer|business/.test(s)) return responses.what;
      return responses.default;
    };

    const ask = (q) => {
      const trimmed = (q || '').trim();
      if (!trimmed || streaming) return;
      setMessages(m => [...m, { role: 'user', text: trimmed }]);
      setInput('');
      const reply = match(trimmed);
      setStreaming('');
      let i = 0;
      const speed = Math.max(8, Math.min(20, 1100 / reply.length));
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

    const suggestions = ['pricing?', 'show me the catalog', 'who runs this?', 'how does it work?', 'is there a guarantee?'];

    return (
      <Panel
        title="ANDRES.AI · OPERATOR ASSISTANT"
        status="ONLINE"
        statusColor={C.phosphor}
        statusPulse
        glow
        style={{display: 'flex', flexDirection: 'column'}}>

        {/* model strip */}
        <div style={{
          padding: '8px 16px', borderBottom: `1px solid ${C.line}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: C.bg,
        }}>
          <Mono size={9} color={C.mute} style={{letterSpacing: '0.22em', textTransform: 'uppercase'}}>
            model: andres-net-v1.0 · context: axius.kb · temperature: 0.2
          </Mono>
          <Mono size={9} color={C.phosphor} style={{letterSpacing: '0.22em'}}>● 0.34s</Mono>
        </div>

        {/* messages */}
        <div ref={scrollRef} className="ax-mx-chat" style={{
          padding: 18,
          height: 340, overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 14,
          background: 'rgba(6,16,10,0.6)',
        }}>
          {messages.map((m, i) => <ChatLine key={i} m={m}/>)}
          {streaming !== null && (
            <ChatLine m={{role: 'bot', text: streaming + '▍'}}/>
          )}
        </div>

        {/* suggestions */}
        <div style={{
          padding: '10px 14px', borderTop: `1px solid ${C.line}`,
          display: 'flex', gap: 6, flexWrap: 'wrap', background: C.bg,
        }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => ask(s)} style={{
              all: 'unset', cursor: 'pointer',
              padding: '5px 10px',
              border: `1px solid ${C.line}`,
              fontFamily: MONO, fontSize: 10, color: C.dim,
              letterSpacing: '0.04em',
              transition: 'all .15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.phosphor; e.currentTarget.style.color = C.phosphor; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.color = C.dim; }}>
              ▸ {s}
            </button>
          ))}
        </div>

        {/* input */}
        <form onSubmit={(e) => { e.preventDefault(); ask(input); }} style={{
          padding: '10px 14px', borderTop: `1px solid ${C.lineHi}`,
          display: 'flex', alignItems: 'center', gap: 10,
          background: C.bg,
        }}>
          <span style={{
            color: C.phosphor, fontFamily: MONO, fontSize: 14, fontWeight: 600,
          }} className="ax-mx-glow">›</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={streaming !== null ? 'andres.ai is typing...' : 'ask anything...'}
            disabled={streaming !== null}
            style={{
              flex: 1, all: 'unset',
              fontFamily: MONO, color: C.inkBright, fontSize: 13,
              letterSpacing: '0.02em',
            }}/>
          <button type="submit" disabled={streaming !== null || !input.trim()} style={{
            all: 'unset', cursor: input.trim() && !streaming ? 'pointer' : 'not-allowed',
            padding: '6px 12px',
            border: `1px solid ${input.trim() && !streaming ? C.phosphor : C.line}`,
            color: input.trim() && !streaming ? C.phosphor : C.faint,
            fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            fontWeight: 600,
          }}>SEND ↵</button>
        </form>
      </Panel>
    );
  };

  const ChatLine = ({ m }) => {
    if (m.role === 'sys') return (
      <div style={{
        fontFamily: MONO, fontSize: 10, color: C.mute,
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        ▮ {m.text}
      </div>
    );
    if (m.role === 'user') return (
      <div style={{
        display: 'flex', justifyContent: 'flex-end',
      }}>
        <div style={{
          display: 'inline-block', maxWidth: '85%',
          padding: '8px 12px',
          border: `1px solid ${C.line}`,
          background: 'rgba(168,255,203,0.06)',
          color: C.inkBright,
          fontFamily: MONO, fontSize: 12, letterSpacing: '0.02em',
        }}>
          <span style={{color: C.amber, marginRight: 8}}>›</span>{m.text}
        </div>
      </div>
    );
    return (
      <div style={{display: 'flex', gap: 10, alignItems: 'flex-start'}}>
        <Mono color={C.phosphor} size={12} weight={600} style={{flexShrink: 0, paddingTop: 1}}>‹‹</Mono>
        <div style={{
          fontFamily: MONO, fontSize: 12.5, color: C.inkBright,
          lineHeight: 1.65, whiteSpace: 'pre-wrap', letterSpacing: '0.01em',
        }}>{m.text}</div>
      </div>
    );
  };

  // ─── HERO ──────────────────────────────────────────────────
  const Hero = () => (
    <section style={{
      position: 'relative', zIndex: 4,
      padding: `60px ${pad}px 56px`,
    }}>
      {/* ASCII boot banner */}
      <pre className="ax-mx-rise" style={{
        margin: 0, fontFamily: MONO, fontSize: 11, color: C.phosphor,
        letterSpacing: '0.04em', lineHeight: 1.2,
        whiteSpace: 'pre',
      }}>
{`  ╔═══════════════════════════════════════════════════════════════════════╗
  ║   AXIUS.OS · INAUGURAL BOOT · 129 MODULES LOADED · ALL SYSTEMS NOMINAL ║
  ╚═══════════════════════════════════════════════════════════════════════╝`}
      </pre>

      <div style={{
        marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28,
        alignItems: 'flex-start',
      }}>
        {/* LEFT — hero title */}
        <div className="ax-mx-rise">
          <div style={{display: 'flex', gap: 10, marginBottom: 24}}>
            <Mono color={C.phosphor} size={10} style={{letterSpacing: '0.24em'}}>$ axius.connect --as guest</Mono>
            <Caret size={10}/>
          </div>

          <h1 style={{
            margin: 0, fontFamily: MONO, fontWeight: 800,
            fontSize: 88, lineHeight: 0.95, letterSpacing: '-0.04em',
            color: C.inkBright,
          }}>
            <span className="ax-mx-glow" style={{color: C.phosphorHi}}>RUN</span><br/>
            YOUR BUSINESS.<br/>
            <span style={{color: C.dim}}>NOT YOUR TECH.</span>
          </h1>

          <div style={{
            marginTop: 36, padding: '14px 16px',
            border: `1px solid ${C.line}`, background: C.panel,
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <Mono color={C.phosphor} size={14} weight={600}>$</Mono>
            <div>
              <p style={{
                margin: 0, fontFamily: MONO, fontSize: 14, color: C.ink, lineHeight: 1.6,
                letterSpacing: '0.01em',
              }}>
                <span style={{color: C.phosphor}}>axius.run</span>(<span style={{color: C.amber}}>"your_business"</span>)
                <br/>
                <span style={{color: C.mute}}>// </span>websites · automations · AI · integrations · all of it · one monthly fee
                <br/>
                <span style={{color: C.mute}}>// </span>the team you'd hire if you knew where to look<Caret style={{marginLeft: 6}}/>
              </p>
            </div>
          </div>

          <div style={{display: 'flex', gap: 12, marginTop: 28}}>
            <CmdBtn fill size="lg">BOOK A CALL</CmdBtn>
            <CmdBtn size="lg">SEE CATALOG</CmdBtn>
            <CmdBtn size="lg" color={C.amber}>./run --demo</CmdBtn>
          </div>

          {/* live console output */}
          <div style={{marginTop: 36}}>
            <Panel title="BOOT LOG" status="LIVE" statusPulse dense>
              <div style={{
                padding: '14px 16px', maxHeight: 200, overflow: 'hidden',
                fontFamily: MONO, fontSize: 11, lineHeight: 1.7,
              }}>
                {[
                  ['[OK]', 'mounting operator hand-on-stack mode', C.phosphor],
                  ['[OK]', 'loaded 129 workflows across 9 categories', C.phosphor],
                  ['[OK]', 'authenticated as: axius / operator / medellin', C.phosphor],
                  ['[OK]', 'ai assistant andres.ai online · streaming enabled', C.phosphor],
                  ['[..]', 'awaiting first input from the visitor', C.amber],
                  ['[››]', 'try asking the agent on the right →', C.cobalt],
                ].map(([tag, msg, color], i) => (
                  <div key={i} style={{display: 'flex', gap: 12, color: C.dim}}>
                    <Mono color={C.faint} size={10}>{String(i + 1).padStart(2, '0')}</Mono>
                    <span style={{color, fontFamily: MONO, fontWeight: 600}}>{tag}</span>
                    <span style={{color: C.dim}}>{msg}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        {/* RIGHT — AI agent */}
        <div className="ax-mx-rise">
          <AIChat/>
        </div>
      </div>

      {/* OPERATIONS CONSOLE — 4-up */}
      <div style={{
        marginTop: 36,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        border: `1px solid ${C.line}`, background: C.panel,
      }}>
        {[
          { k: 'workflows.operated',     v: '129',     spark: [40,55,48,60,72,80,90,102,110,118,124,129], accent: C.phosphor },
          { k: 'avg.response.h',         v: '38h',     spark: [72,68,60,55,52,48,46,44,42,40,39,38], accent: C.phosphor },
          { k: 'replacements.completed', v: '47',      spark: [10,14,18,22,26,30,33,36,38,41,44,47], accent: C.phosphorHi },
          { k: 'uptime.pct',             v: '99.97',   spark: [99.91,99.95,99.92,99.97,99.94,99.96,99.97,99.95,99.97,99.98,99.97,99.97], accent: C.phosphor },
        ].map((s, i, arr) => (
          <div key={i} style={{
            padding: '16px 18px',
            borderRight: i < arr.length - 1 ? `1px solid ${C.line}` : 'none',
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
              <Mono size={10} color={C.mute} style={{letterSpacing: '0.16em', textTransform: 'uppercase'}}>{s.k}</Mono>
              <Mono size={9} color={C.faint}>↗ +12%</Mono>
            </div>
            <div style={{
              marginTop: 10, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12,
            }}>
              <span className="ax-mx-glow" style={{
                fontFamily: MONO, fontWeight: 700, fontSize: 36, color: s.accent,
                letterSpacing: '-0.02em', lineHeight: 1, fontVariantNumeric: 'tabular-nums',
              }}>{s.v}</span>
              <Sparkline data={s.spark} color={s.accent} width={120} height={36}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // ─── COMMITMENTS ───────────────────────────────────────────
  const Commitments = () => {
    const meta = [
      { code: 'COM.01', spark: [22,28,24,30,26,32,28,30,29,30,28,30], sla: '24/72H', accent: C.phosphor },
      { code: 'COM.02', spark: [10,18,22,28,30,32,28,30,32,28,30,32], sla: '30D',    accent: C.amber },
      { code: 'COM.03', spark: [40,38,36,30,28,24,20,18,16,14,12,10], sla: 'COST',   accent: C.phosphor },
      { code: 'COM.04', spark: [70,72,75,80,82,86,88,89,90,90,90,90], sla: '~90%',   accent: C.phosphor },
      { code: 'COM.05', spark: [4,5,5,6,6,7,7,8,8,8,9,9],             sla: 'Q+M',    accent: C.cobalt },
    ];
    return (
      <SectionFrame id="01" title="COMMITMENTS · STATUS BOARD" status="ALL GREEN">
        <Mono size={11} color={C.dim} style={{display: 'block', marginBottom: 24, letterSpacing: '0.04em'}}>
          // five guarantees that fire on every retainer, every month — automated checks
        </Mono>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0,
          border: `1px solid ${C.line}`,
        }}>
          {window.AxiusCommitments.map((c, i) => (
            <CommitCell key={c.n} c={c} m={meta[i]} index={i} isLast={i === 4}/>
          ))}
        </div>
      </SectionFrame>
    );
  };

  const CommitCell = ({ c, m, index, isLast }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          padding: '18px 18px',
          borderRight: !isLast ? `1px solid ${C.line}` : 'none',
          background: h ? 'rgba(34,255,136,0.04)' : C.panel,
          transition: 'background .2s ease',
          display: 'flex', flexDirection: 'column', gap: 14,
          minHeight: 320,
        }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Mono size={10} color={m.accent} style={{letterSpacing: '0.18em'}}>{m.code}</Mono>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
            <Dot color={m.accent} pulse={h}/>
            <Mono size={9} color={C.mute} style={{letterSpacing: '0.18em', textTransform: 'uppercase'}}>OK</Mono>
          </div>
        </div>

        <Sparkline data={m.spark} color={m.accent} width={170} height={36}/>

        <h3 style={{
          margin: 0, fontFamily: MONO, fontWeight: 700, fontSize: 16,
          color: C.inkBright, letterSpacing: '-0.005em', lineHeight: 1.25,
        }} className={h ? 'ax-mx-glow' : ''}>{c.title}</h3>

        <p style={{
          margin: 0, fontFamily: MONO, fontSize: 11, color: C.dim, lineHeight: 1.65, flex: 1,
        }}>{c.body}</p>

        <div style={{paddingTop: 12, borderTop: `1px solid ${C.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Mono size={9} color={C.mute} style={{letterSpacing: '0.18em', textTransform: 'uppercase'}}>{c.metric.label}</Mono>
          <Mono size={14} color={m.accent} weight={600}>{c.metric.value}</Mono>
        </div>
      </div>
    );
  };

  // ─── DIAGNOSTIC (the mess) ────────────────────────────────
  const Diagnostic = () => (
    <SectionFrame id="02" title="DIAGNOSTIC · $ axius scan --stack" status="ALERT · 8 FINDINGS" accent={C.amber}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
        <div>
          <h2 style={{
            margin: 0, fontFamily: MONO, fontWeight: 800, fontSize: 56,
            letterSpacing: '-0.035em', lineHeight: 1, color: C.inkBright,
          }}>
            <span style={{color: C.amber}} className="ax-mx-glow-amber">YOU STARTED THIS</span><br/>
            TO BUILD A BUSINESS,<br/>
            <span style={{color: C.dim}}>NOT MAINTAIN A STACK.</span>
          </h2>
          <p style={{
            margin: '28px 0 0', maxWidth: 480,
            fontFamily: MONO, fontSize: 12.5, color: C.dim, lineHeight: 1.7,
          }}>
            <span style={{color: C.mute}}>{'>'}</span> Most operators we meet are running their tech function by accident.
            Five contractors. Three Slack threads. A website that breaks on Friday afternoon.
            <br/><br/>
            <span style={{color: C.mute}}>{'>'}</span> Axius is one team that owns it. <span style={{color: C.phosphor}}>The work compounds because the same hand is on it month over month.</span>
          </p>
        </div>

        <Panel title="DIAGNOSTIC REPORT" status="STACK SCAN" statusColor={C.amber}>
          <div style={{padding: '14px 16px', fontFamily: MONO, fontSize: 11.5, lineHeight: 1.8}}>
            {[
              ['SYM-01', 'Five contractors. Three Slack threads.',                C.amber],
              ['SYM-02', 'Website breaks Friday. No one to call.',                 C.crimson],
              ['SYM-03', 'CRM never wired to the calendar.',                       C.amber],
              ['SYM-04', '"AI thing" still doesn\'t quite work.',                  C.crimson],
              ['SYM-05', 'Tools sit in tabs nobody opens.',                        C.amber],
              ['SYM-06', 'Work doesn\'t compound. Cycle restarts.',                C.crimson],
              ['SYM-07', 'No documentation. No one accountable.',                  C.amber],
              ['SYM-08', 'Founder is in the loop on every fix.',                   C.crimson],
              [null, null, null],
              ['DX-01',  'Diagnosis: no single owner of the stack.',               C.amber],
              ['RX-01',  'Prescribed: one operator · documented · monthly.',       C.phosphor],
            ].map(([code, msg, c], i) => {
              if (!code) return <div key={i} style={{height: 8, borderTop: `1px dashed ${C.line}`, margin: '6px 0'}}/>;
              return (
                <div key={i} style={{display: 'grid', gridTemplateColumns: '60px 1fr 16px', gap: 10}}>
                  <Mono size={11} color={c} weight={600}>{code}</Mono>
                  <span style={{color: C.dim}}>{msg}</span>
                  <Dot color={c} pulse={code.startsWith('RX')}/>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </SectionFrame>
  );

  // ─── METHOD · ASCII pipeline ───────────────────────────────
  const Method = () => (
    <SectionFrame id="03" title="METHOD · 4-STAGE PIPELINE" status="ASCII BLUEPRINT">
      <pre style={{
        margin: 0, fontFamily: MONO, fontSize: 12, color: C.phosphor,
        lineHeight: 1.4, letterSpacing: '0.01em',
        background: C.panel, border: `1px solid ${C.line}`,
        padding: '24px 28px', overflowX: 'auto', whiteSpace: 'pre',
      }}>
{`     ┌──────────┐      ┌──────────────┐      ┌───────────┐      ┌──────────┐
 IN ─▶│  AUDIT   │─────▶│  CONFIGURE   │─────▶│  OPERATE  │─────▶│  EVOLVE  │─▶ OUT
     │  d.1-7   │      │   d.8-14     │      │  month 1+ │      │  quarter │
     └────┬─────┘      └──────┬───────┘      └─────┬─────┘      └────┬─────┘
          │                   │                    │                  │
          ▼                   ▼                    ▼                  ▼
      stack_audit         config_map         monthly_report      roadmap.notion
        .pdf                 .json                 .md`}
      </pre>

      <div style={{marginTop: 28}}>
        <Heatmap/>
      </div>

      <div style={{
        marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        border: `1px solid ${C.line}`,
      }}>
        {window.AxiusMethodology.map((m, i, arr) => (
          <div key={m.n} style={{
            padding: '20px 20px',
            borderRight: i < arr.length - 1 ? `1px solid ${C.line}` : 'none',
            display: 'flex', flexDirection: 'column', gap: 14, minHeight: 240,
            background: C.panel,
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
              <span className="ax-mx-glow" style={{
                fontFamily: MONO, fontSize: 40, fontWeight: 800, color: C.phosphor,
                letterSpacing: '-0.04em', lineHeight: 0.9,
              }}>{m.n}</span>
              <Mono size={9} color={C.mute} style={{letterSpacing: '0.16em', textTransform: 'uppercase'}}>{m.timing}</Mono>
            </div>
            <h3 style={{margin: 0, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: C.inkBright, letterSpacing: '-0.015em'}}>
              {m.name.toUpperCase()}
            </h3>
            <p style={{margin: 0, fontFamily: MONO, fontSize: 11, color: C.dim, lineHeight: 1.65, flex: 1}}>{m.body}</p>
            <div style={{padding: '8px 10px', background: C.bg, border: `1px solid ${C.lineHi}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Mono size={10} color={C.phosphor}>{m.artifact}</Mono>
              <Mono size={9} color={C.faint}>OUT</Mono>
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );

  // ─── CATALOG · grep + distribution ─────────────────────────
  const Catalog = () => {
    const [q, setQ] = React.useState('');
    const [active, setActive] = React.useState(0);
    const total = window.AxiusCatalog.reduce((s, c) => s + c.count, 0);
    const max = Math.max(...window.AxiusCatalog.map(c => c.count));
    const filtered = window.AxiusCatalog
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.stack.toLowerCase().includes(q.toLowerCase()));
    const cat = window.AxiusCatalog[active];

    return (
      <SectionFrame id="04" title="CATALOG · grep -n workflows" status={`${total} INDEXED · 9 CATEGORIES`}>
        {/* search prompt */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', border: `1px solid ${C.lineHi}`, background: C.panel, marginBottom: 24,
        }}>
          <Mono size={13} color={C.phosphor} weight={600}>$ grep -i</Mono>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="filter by category or stack..."
            style={{
              flex: 1, all: 'unset',
              fontFamily: MONO, color: C.inkBright, fontSize: 13, letterSpacing: '0.02em',
            }}/>
          <Mono size={10} color={C.mute}>{filtered.length}/{window.AxiusCatalog.length} match</Mono>
          <Caret/>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1.05fr 1.05fr', gap: 24}}>
          {/* LEFT — category list with bars */}
          <Panel title="DISTRIBUTION" dense>
            <div style={{padding: '4px 0'}}>
              {filtered.map(({ c, i }) => {
                const isActive = i === active;
                return (
                  <button key={c.id} onClick={() => setActive(i)} style={{
                    all: 'unset', cursor: 'pointer', display: 'block', width: '100%',
                    padding: '12px 16px',
                    borderBottom: `1px solid ${C.line}`,
                    background: isActive ? 'rgba(34,255,136,0.08)' : 'transparent',
                  }}>
                    <div style={{display: 'grid', gridTemplateColumns: '40px 1fr 80px 40px', gap: 14, alignItems: 'center'}}>
                      <Mono size={11} color={isActive ? C.phosphor : C.mute}>{String(i+1).padStart(2, '0')}</Mono>
                      <div>
                        <div style={{
                          fontFamily: MONO, fontSize: 13, color: isActive ? C.inkBright : C.ink,
                          fontWeight: isActive ? 600 : 500, letterSpacing: '-0.005em',
                        }}>{c.name}</div>
                        <div style={{fontFamily: MONO, fontSize: 10, color: C.mute, marginTop: 2}}>{c.stack}</div>
                      </div>
                      <Meter value={c.count / max} color={isActive ? C.phosphor : C.phosphorDeep}/>
                      <Mono size={11} color={isActive ? C.phosphor : C.dim} style={{textAlign: 'right', fontVariantNumeric: 'tabular-nums'}}>{c.count}</Mono>
                    </div>
                  </button>
                );
              })}
            </div>
          </Panel>

          {/* RIGHT — active category sample entries */}
          <Panel title={`OUTPUT · CAT.${String(active+1).padStart(2, '0')} · ${cat.name.toUpperCase()}`} dense>
            <div style={{padding: 0}}>
              <div style={{padding: '12px 16px', borderBottom: `1px solid ${C.line}`, background: C.bg}}>
                <Mono size={10} color={C.mute} style={{letterSpacing: '0.18em', textTransform: 'uppercase'}}>
                  showing {cat.samples.length} of {cat.count} · sorted by id
                </Mono>
              </div>
              {cat.samples.map((s, i) => (
                <div key={s.n} style={{
                  padding: '14px 16px',
                  borderBottom: i < cat.samples.length - 1 ? `1px solid ${C.line}` : 'none',
                  display: 'grid', gridTemplateColumns: '50px 1fr 70px 60px',
                  gap: 14, alignItems: 'baseline',
                }}>
                  <Mono size={11} color={C.phosphor} weight={600}>{s.n}</Mono>
                  <div>
                    <div style={{fontFamily: MONO, fontSize: 13, color: C.inkBright, fontWeight: 500}}>{s.name}</div>
                    <div style={{fontFamily: MONO, fontSize: 10, color: C.mute, marginTop: 4}}>{s.sub}</div>
                  </div>
                  <Mono size={10} color={C.faint} style={{textAlign: 'right'}}>{s.time}</Mono>
                  <Mono size={12} color={C.amber} style={{textAlign: 'right'}}>{s.pts}pt</Mono>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </SectionFrame>
    );
  };

  // ─── COMPARISON · table ────────────────────────────────────
  const Comparison = () => (
    <SectionFrame id="05" title="COMPARISON · diff freelancer hire axius" status="3 OPTIONS">
      <h2 style={{
        margin: '0 0 32px', fontFamily: MONO, fontWeight: 800, fontSize: 48,
        letterSpacing: '-0.03em', lineHeight: 1, color: C.inkBright,
      }}>
        A DIFFERENT <span className="ax-mx-glow" style={{color: C.phosphor}}>SHAPE</span> OF HELP.
      </h2>

      <Panel>
        <div style={{display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1.1fr', gap: 0, borderBottom: `1px solid ${C.line}`, background: C.raised}}>
          <div style={{padding: '14px 16px'}}>
            <Mono size={10} color={C.mute} style={{letterSpacing: '0.2em', textTransform: 'uppercase'}}>field</Mono>
          </div>
          {[
            ['OPT.01', 'FREELANCER', false],
            ['OPT.02', 'IN-HOUSE HIRE', false],
            ['OPT.03', 'AXIUS', true],
          ].map(([k, name, on], i) => (
            <div key={i} style={{
              padding: '14px 18px', borderLeft: `1px solid ${C.line}`,
              background: on ? 'rgba(34,255,136,0.06)' : 'transparent',
            }}>
              <Mono size={10} color={on ? C.phosphor : C.mute} style={{letterSpacing: '0.2em', textTransform: 'uppercase'}}>{k}</Mono>
              <div style={{
                marginTop: 6, fontFamily: MONO, fontSize: 18, color: C.inkBright,
                fontWeight: 700, letterSpacing: '-0.01em',
              }} className={on ? 'ax-mx-glow' : ''}>{name}</div>
            </div>
          ))}
        </div>
        {window.AxiusComparison.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1.1fr', gap: 0,
            borderBottom: i < window.AxiusComparison.length - 1 ? `1px solid ${C.line}` : 'none',
          }}>
            <div style={{padding: '14px 16px'}}>
              <Mono size={10} color={C.dim} style={{letterSpacing: '0.16em', textTransform: 'uppercase'}}>{r.row}</Mono>
            </div>
            {[r.f, r.h, r.a].map((v, j) => (
              <div key={j} style={{
                padding: '14px 18px', borderLeft: `1px solid ${C.line}`,
                background: j === 2 ? 'rgba(34,255,136,0.04)' : 'transparent',
                fontFamily: MONO, fontSize: 12, color: j === 2 ? C.inkBright : C.dim, lineHeight: 1.5,
              }}>{v}</div>
            ))}
          </div>
        ))}
      </Panel>
    </SectionFrame>
  );

  // ─── PRICING · loadouts ────────────────────────────────────
  const Pricing = () => (
    <SectionFrame id="06" title="PRICING · 3 LOADOUTS" status="MO-TO-MO AFTER 90D">
      <h2 style={{
        margin: '0 0 32px', fontFamily: MONO, fontWeight: 800, fontSize: 48,
        letterSpacing: '-0.03em', lineHeight: 1, color: C.inkBright,
      }}>
        THREE SIZES OF <span style={{color: C.phosphor}} className="ax-mx-glow">OPERATING LAYER</span>.
      </h2>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1.06fr 1fr', gap: 16, alignItems: 'stretch'}}>
        {window.AxiusPricing.map((p, i) => <PricingLoadout key={p.id} p={p} index={i}/>)}
      </div>

      {/* Founder Track */}
      <div style={{
        marginTop: 16, padding: '20px 22px',
        border: `1px solid ${C.line}`, borderLeft: `2px solid ${C.amber}`,
        background: C.panel,
        display: 'grid', gridTemplateColumns: '200px 1fr', gap: 28,
      }}>
        <div>
          <Mono color={C.amber} size={10} style={{letterSpacing: '0.22em'}}>FOUNDER.TRACK</Mono>
          <div style={{
            marginTop: 8, fontFamily: MONO, fontWeight: 700, fontSize: 18, color: C.inkBright,
            letterSpacing: '-0.01em',
          }}>building, not running</div>
        </div>
        <p style={{margin: 0, fontFamily: MONO, fontSize: 12, color: C.dim, lineHeight: 1.7}}>
          Same retention, different framing. Shipping a product from scratch? Same point capacity goes
          toward one bigger build plus the workflows around it.
          <br/><span style={{color: C.amber}}>BUILDER</span> inside Equipo · MVP in 3–4 months.
          <span style={{color: C.amber}}> PARTNER</span> inside Departamento · substantial product in 4–6 months.
        </p>
      </div>
    </SectionFrame>
  );

  const PricingLoadout = ({ p, index }) => {
    const [h, setH] = React.useState(false);
    const featured = !!p.featured;
    return (
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          position: 'relative',
          padding: featured ? '24px' : '22px',
          background: featured ? 'rgba(34,255,136,0.06)' : C.panel,
          border: `1px solid ${featured ? C.phosphor : (h ? C.lineHi : C.line)}`,
          boxShadow: featured ? `0 0 0 1px rgba(34,255,136,0.2), inset 0 0 20px rgba(34,255,136,0.05)` : 'none',
          transition: 'all .2s ease',
          display: 'flex', flexDirection: 'column', gap: 16,
          transform: featured ? 'translateY(-8px)' : 'translateY(0)',
        }}>
        {/* header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Mono color={featured ? C.phosphor : C.dim} size={10} style={{letterSpacing: '0.22em'}}>TIER.{String(index+1).padStart(2,'0')}</Mono>
          {featured && (
            <Mono color={C.phosphor} size={10} style={{letterSpacing: '0.22em', textTransform: 'uppercase'}}>
              ★ recommended
            </Mono>
          )}
        </div>

        {/* name */}
        <h3 style={{
          margin: 0, fontFamily: MONO, fontWeight: 800,
          fontSize: featured ? 36 : 28,
          letterSpacing: '-0.03em', lineHeight: 0.95, color: C.inkBright,
        }} className={featured ? 'ax-mx-glow' : ''}>
          {p.name.toUpperCase()}
        </h3>

        <p style={{margin: 0, fontFamily: MONO, fontSize: 11.5, color: C.dim, lineHeight: 1.55, minHeight: 56}}>{p.sub}</p>

        {/* price */}
        <div style={{display: 'flex', alignItems: 'baseline', gap: 8, paddingTop: 14, borderTop: `1px solid ${C.line}`}}>
          <span className={featured ? 'ax-mx-glow' : ''} style={{
            fontFamily: MONO, fontWeight: 800, fontSize: featured ? 56 : 44,
            color: featured ? C.phosphor : C.inkBright, letterSpacing: '-0.04em', lineHeight: 0.95,
          }}>${p.price.toLocaleString()}</span>
          <Mono size={11} color={C.mute}>/MO</Mono>
        </div>
        <Mono size={9} color={C.mute} style={{letterSpacing: '0.16em', marginTop: -6, textTransform: 'uppercase'}}>
          + ${p.setup.toLocaleString()} SETUP · WAIVED ON CLOSE
        </Mono>

        {/* capacity meters */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '14px 0', borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`}}>
          <Meter value={p.points / 10} label="CAPACITY" color={featured ? C.phosphor : C.phosphorDeep}/>
          <Meter value={
            p.response === '24h' ? 1 : p.response === '48h' ? 0.66 : 0.33
          } label="RESPONSE" color={featured ? C.phosphor : C.phosphorDeep}/>
          <div>
            <Mono size={9} color={C.mute} style={{letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 4}}>POINTS</Mono>
            <Mono size={14} color={C.inkBright} weight={600}>{p.points} pts active</Mono>
          </div>
          <div>
            <Mono size={9} color={C.mute} style={{letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 4}}>SLA</Mono>
            <Mono size={14} color={C.inkBright} weight={600}>{p.response}</Mono>
          </div>
        </div>

        <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, flex: 1}}>
          {p.features.map((f, j) => (
            <li key={j} style={{display: 'flex', gap: 10, fontFamily: MONO, fontSize: 11.5, color: C.dim, lineHeight: 1.55}}>
              <span style={{color: featured ? C.phosphor : C.phosphorDeep}}>▸</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <CmdBtn fill={featured} size="md" style={{justifyContent: 'center'}}>
          {featured ? 'RESERVE' : 'BOOK CALL'}
        </CmdBtn>
      </div>
    );
  };

  // ─── FOUNDER · terminal portrait ───────────────────────────
  const Founder = () => {
    const [h, setH] = React.useState(false);
    return (
      <SectionFrame id="07" title="OPERATOR · andres.toro" status="ONLINE">
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 24, alignItems: 'stretch'}}>
          {/* Photo terminal */}
          <Panel title="FIG.01 · PORTRAIT" dense>
            <div
              onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
              style={{position: 'relative', overflow: 'hidden', height: 540}}>
              <img src={window.AxiusFounder.photo} alt="Andrés Toro" style={{
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%',
                filter: h
                  ? 'sepia(0.2) hue-rotate(60deg) saturate(1.4) contrast(1.1) brightness(0.95)'
                  : 'grayscale(1) sepia(0.4) hue-rotate(60deg) saturate(8) contrast(1.2) brightness(0.85)',
                transition: 'filter 1.4s cubic-bezier(.2,.8,.2,1)',
                mixBlendMode: 'screen',
                opacity: 0.86,
              }}/>
              {/* scan lines + tint */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(180deg, rgba(34,255,136,0.18), rgba(2,5,3,0.4) 100%)',
                mixBlendMode: 'multiply',
              }}/>
              <div aria-hidden style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(34,255,136,0.06) 0 1px, transparent 1px 3px)',
              }}/>
              {/* corner reticules */}
              {[
                { top: 12, left: 12, t: '▛' },
                { top: 12, right: 12, t: '▜' },
                { bottom: 12, left: 12, t: '▙' },
                { bottom: 12, right: 12, t: '▟' },
              ].map((p, i) => (
                <span key={i} style={{
                  position: 'absolute', ...p, color: C.phosphor, fontFamily: MONO, fontSize: 18,
                  textShadow: '0 0 6px rgba(34,255,136,0.7)',
                }}>{p.t}</span>
              ))}
              {/* nameplate */}
              <div style={{
                position: 'absolute', bottom: 24, left: 24, right: 24,
                padding: '10px 14px', background: 'rgba(2,5,3,0.78)',
                border: `1px solid ${C.phosphor}`,
              }}>
                <Mono size={9} color={C.phosphor} style={{letterSpacing: '0.22em'}}>SUBJECT // operator.0001</Mono>
                <div style={{
                  fontFamily: MONO, fontWeight: 700, fontSize: 32, color: C.inkBright,
                  letterSpacing: '-0.02em', marginTop: 4,
                }} className="ax-mx-glow">ANDRÉS TORO</div>
                <Mono size={10} color={C.dim} style={{marginTop: 6}}>
                  {h ? '> visual confirmation · IDENTITY MATCH' : '> hover to clarify · DEGRADED SIGNAL'}
                </Mono>
              </div>
            </div>
          </Panel>

          {/* Bio terminal */}
          <Panel title="OPERATOR DOSSIER" status="VERIFIED" statusColor={C.phosphor} statusPulse>
            <div style={{padding: '20px 22px'}}>
              <Mono size={10} color={C.mute} style={{letterSpacing: '0.2em', textTransform: 'uppercase'}}>$ cat /home/operator/bio.md</Mono>
              <h3 style={{
                margin: '14px 0 18px', fontFamily: MONO, fontWeight: 800, fontSize: 30,
                color: C.inkBright, letterSpacing: '-0.02em', lineHeight: 1,
              }}>THE HAND ON YOUR STACK.</h3>
              <p style={{margin: 0, fontFamily: MONO, fontSize: 12.5, color: C.dim, lineHeight: 1.75}}>
                {window.AxiusFounder.bio}
              </p>

              <div style={{
                marginTop: 24, padding: '14px 16px',
                background: C.raised, border: `1px solid ${C.lineHi}`, borderLeft: `2px solid ${C.phosphor}`,
              }}>
                <Mono size={9} color={C.phosphor} style={{letterSpacing: '0.22em'}}>// quote</Mono>
                <p style={{
                  margin: '8px 0 0', fontFamily: MONO, fontSize: 14, color: C.inkBright,
                  lineHeight: 1.55, letterSpacing: '-0.005em',
                }}>"I won't make you the bottleneck in your own company."</p>
                <Mono size={9} color={C.mute} style={{marginTop: 10, letterSpacing: '0.22em', display: 'block'}}>— signed, A.T.</Mono>
              </div>

              <div style={{
                marginTop: 24, paddingTop: 16, borderTop: `1px solid ${C.line}`,
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14,
              }}>
                {window.AxiusFounder.facts.map((f, i) => (
                  <div key={i}>
                    <Mono size={9} color={C.mute} style={{letterSpacing: '0.2em', textTransform: 'uppercase'}}>{f.k}</Mono>
                    <Mono size={12} color={C.inkBright} weight={500} style={{display: 'block', marginTop: 4}}>{f.v}</Mono>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>
      </SectionFrame>
    );
  };

  // ─── FIELD NOTES · man pages ───────────────────────────────
  const Notes = () => {
    const notes = [
      { n: 'I',   t: 'stacks accumulate. they do not arrive.',     s: 'On the fossil record of decisions made under time pressure.' },
      { n: 'II',  t: 'the right SaaS is the cheaper build.',       s: 'On the cost of custom software vs the discipline of configuration.' },
      { n: 'III', t: 'onboarding is the engagement.',              s: 'On the consequence of the first thirty days.' },
      { n: 'IV',  t: 'cancellations precede churn by ninety days.', s: 'On signals that arrive long before the email.' },
      { n: 'V',   t: 'what you measure, you find.',                s: 'On reporting infrastructure as a precondition for noticing.' },
      { n: 'VI',  t: 'AI saves the operator, not the customer.',   s: 'On the quiet wins, and the loud ones that fail.' },
    ];
    return (
      <SectionFrame id="08" title="FIELD NOTES · man axius" status="6 ENTRIES">
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>
          {notes.map(n => (
            <a key={n.n} href="#" style={{
              textDecoration: 'none', color: C.ink,
              padding: '20px 22px', background: C.panel,
              border: `1px solid ${C.line}`,
              display: 'flex', flexDirection: 'column', gap: 12, minHeight: 220,
              transition: 'all .2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.phosphor; e.currentTarget.style.background = 'rgba(34,255,136,0.04)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.background = C.panel; }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <Mono color={C.phosphor} size={14} weight={700} style={{letterSpacing: '0.06em'}}>NOTE.{n.n}</Mono>
                <Mono color={C.faint} size={9} style={{letterSpacing: '0.18em'}}>$ man axius.{n.n.toLowerCase()}</Mono>
              </div>
              <h3 style={{
                margin: 0, fontFamily: MONO, fontWeight: 700, fontSize: 18,
                color: C.inkBright, letterSpacing: '-0.01em', lineHeight: 1.2,
              }}>{n.t}</h3>
              <p style={{margin: 0, fontFamily: MONO, fontSize: 11.5, color: C.dim, lineHeight: 1.65, flex: 1}}>{n.s}</p>
              <Mono color={C.phosphor} size={10} style={{letterSpacing: '0.22em'}}>READ →</Mono>
            </a>
          ))}
        </div>
      </SectionFrame>
    );
  };

  // ─── FAQ · terminal ────────────────────────────────────────
  const FAQ = () => {
    const [open, setOpen] = React.useState(0);
    return (
      <SectionFrame id="09" title="LETTERS · faq.exe" status={`${window.AxiusFAQ.length} ENTRIES`}>
        <Panel>
          {window.AxiusFAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                borderBottom: i < window.AxiusFAQ.length - 1 ? `1px solid ${C.line}` : 'none',
                background: isOpen ? 'rgba(34,255,136,0.05)' : 'transparent',
                transition: 'background .2s ease',
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  all: 'unset', cursor: 'pointer', width: '100%',
                  display: 'grid', gridTemplateColumns: '80px 1fr 36px',
                  gap: 18, padding: '18px 20px', alignItems: 'baseline',
                }}>
                  <Mono color={isOpen ? C.phosphor : C.dim} size={11} weight={600}>Q.{String(i+1).padStart(2, '0')}</Mono>
                  <span style={{
                    fontFamily: MONO, fontWeight: isOpen ? 600 : 500, fontSize: 15,
                    color: isOpen ? C.inkBright : C.ink, letterSpacing: '-0.005em', lineHeight: 1.3,
                  }}>{f.q}</span>
                  <Mono color={C.phosphor} size={14} style={{textAlign: 'right'}}>{isOpen ? '▾' : '▸'}</Mono>
                </button>
                {isOpen && (
                  <div style={{display: 'grid', gridTemplateColumns: '80px 1fr 36px', gap: 18, padding: '0 20px 20px'}}>
                    <Mono color={C.phosphorDeep} size={10}>A.{String(i+1).padStart(2, '0')}</Mono>
                    <p style={{margin: 0, fontFamily: MONO, fontSize: 12.5, color: C.dim, lineHeight: 1.75, maxWidth: 820}}>{f.a}</p>
                    <span/>
                  </div>
                )}
              </div>
            );
          })}
        </Panel>
      </SectionFrame>
    );
  };

  // ─── CTA · final terminal ──────────────────────────────────
  const CTA = () => (
    <section style={{
      position: 'relative', zIndex: 4,
      padding: `96px ${pad}px 56px`,
      borderTop: `1px solid ${C.line}`,
      textAlign: 'center',
    }}>
      <pre style={{
        margin: '0 auto', fontFamily: MONO, fontSize: 11, color: C.phosphor,
        lineHeight: 1.2, letterSpacing: '0.04em',
      }}>
{`  ╔═════════════════════════════════════════╗
  ║   END OF TRANSMISSION · SESSION ACTIVE   ║
  ╚═════════════════════════════════════════╝`}
      </pre>

      <h2 style={{
        margin: '40px 0 0', fontFamily: MONO, fontWeight: 800, fontSize: 112,
        letterSpacing: '-0.045em', lineHeight: 0.92, color: C.inkBright,
      }}>
        <span className="ax-mx-glow" style={{color: C.phosphor}}>{'>'}</span> CONNECT.<br/>
        <span style={{color: C.dim}}>(<span style={{color: C.amber}}>"andres@axius.tech"</span>)</span><Caret/>
      </h2>

      <p style={{
        margin: '32px auto 0', maxWidth: 540,
        fontFamily: MONO, fontSize: 13, color: C.dim, lineHeight: 1.65,
      }}>
        <span style={{color: C.mute}}>// </span>thirty minutes · you leave with a one-page audit either way
        <br/>
        <span style={{color: C.mute}}>// </span>no pitch · no pressure · just a clear read of your stack
      </p>

      <div style={{display: 'flex', gap: 14, justifyContent: 'center', marginTop: 40}}>
        <CmdBtn fill size="lg">SCHEDULE CONVERSATION</CmdBtn>
        <CmdBtn size="lg" color={C.amber}>./email --subject="run my stack"</CmdBtn>
      </div>

      {/* colophon */}
      <div style={{
        marginTop: 80, paddingTop: 24, borderTop: `1px solid ${C.line}`,
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16,
      }}>
        <Mono color={C.phosphor} size={12} weight={700} style={{letterSpacing: '0.22em'}} className="ax-mx-glow">▮▯▮ AXIUS.OS v1.0</Mono>
        <Mono color={C.mute} size={10} style={{letterSpacing: '0.22em', textTransform: 'uppercase'}}>
          medellín · remote · andres@axius.tech · © 2026
        </Mono>
        <Mono color={C.dim} size={10} style={{letterSpacing: '0.18em'}}>
          [Q] QUIT · [/] SEARCH · [?] HELP
        </Mono>
      </div>
    </section>
  );

  // ─── PAGE ASSEMBLY ─────────────────────────────────────────
  return (
    <div className="ax-mx-flicker" style={{
      background: C.bg, color: C.ink, fontFamily: MONO,
      minHeight: '100vh', position: 'relative',
    }}>
      <MatrixRain/>
      <ScanLines/>
      <CommandPalette/>
      <EventLog/>
      <TopBar/>
      <Ticker/>
      <Hero/>
      <Commitments/>
      <Diagnostic/>
      <Method/>
      <Catalog/>
      <Comparison/>
      <Pricing/>
      <Founder/>
      <Notes/>
      <FAQ/>
      <CTA/>
    </div>
  );
};

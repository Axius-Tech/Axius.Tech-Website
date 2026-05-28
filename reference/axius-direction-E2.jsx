// ============================================================
// AXIUS · DIRECTION E2 — QUIET TWO (DARK · SUBTLE MATRIX)
//
// Quiet's tranquility, in the dark. Same restraint, same latent
// color revealed on hover, same founder photo dev/colour, same
// cursor-responsive ambient orb, same Operating Now ticker —
// on a warm-dark canvas, with a few subtle Matrix borrowings:
//   • Faint scan-line overlay (8% opacity)
//   • Mono-leaning section eyebrows
//   • Phosphor "● operational" pulse on the nav status pill
//   • Subtle phosphor halo on primary buttons (hover)
//   • Founder photo gets a soft phosphor-green hue when idle,
//     then lifts to natural colour on hover (Matrix → Quiet)
// Restraint is the rule. The Matrix lives at ≤10% opacity.
// ============================================================

window.AxiusDirectionE2 = function () {
  // ─── Font + global animation injection ─────────────────────
  React.useEffect(() => {
    if (!document.getElementById('axius-quiet-fonts')) {
      const link = document.createElement('link');
      link.id = 'axius-quiet-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap';
      document.head.appendChild(link);
    }
    if (!document.getElementById('axius-quiet2-styles')) {
      const style = document.createElement('style');
      style.id = 'axius-quiet2-styles';
      style.textContent = `
        @keyframes axQ2Breathe {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50%      { transform: scale(1.12); opacity: 0.85; }
        }
        @keyframes axQ2Pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(80,255,170,0.55); }
          50%      { box-shadow: 0 0 0 7px rgba(80,255,170,0); }
        }
        @keyframes axQ2Glow {
          0%, 100% { opacity: 0.40; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.62; transform: translate(-50%, -50%) scale(1.06); }
        }
        .ax-quiet2-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,91,42,0.55) transparent; }
        .ax-quiet2-scroll::-webkit-scrollbar { width: 8px; }
        .ax-quiet2-scroll::-webkit-scrollbar-track { background: transparent; }
        .ax-quiet2-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,91,42,0.45);
          border-radius: 0;
        }
        .ax-quiet2-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255,91,42,0.72);
        }
        /* Subtle scan-line overlay — Matrix borrowing at ~8% opacity */
        .ax-quiet2-scan {
          background-image: repeating-linear-gradient(
            180deg,
            rgba(245,241,234,0.04) 0px,
            rgba(245,241,234,0.04) 1px,
            transparent 1px,
            transparent 4px
          );
        }
        /* Phosphor halo on hover for primary buttons */
        .ax-quiet2-halo:hover {
          box-shadow: 0 0 0 1px rgba(80,255,170,0.35), 0 0 24px rgba(80,255,170,0.18);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // ─── Palette (dark) ────────────────────────────────────────
  const C = {
    bg:        '#0E0C0A',
    surface:   '#15120F',
    panel:     '#11100D',
    ink:       '#F5F1EA',
    dim:       'rgba(245,241,234,0.68)',
    mute:      'rgba(245,241,234,0.44)',
    faint:     'rgba(245,241,234,0.26)',
    ghost:     'rgba(245,241,234,0.12)',
    line:      'rgba(245,241,234,0.08)',
    lineHi:    'rgba(245,241,234,0.18)',
    // latent accents — same hues as Quiet, slightly more saturated
    // since they have to read against a dark canvas
    tangerine: '#FF6E45',
    lavender:  '#8B7AFF',
    mint:      '#5BD5BB',
    amber:     '#FFD68A',
    pink:      '#FF8FBA',
    sky:       '#6FCAEC',
    // phosphor — the single Matrix accent, used only for live signals
    phosphor:  '#50FFAA',
  };

  const DISPLAY = '"Geist", "Inter", system-ui, sans-serif';
  const MONO    = '"Geist Mono", ui-monospace, monospace';
  const SERIF   = '"Instrument Serif", "Times New Roman", serif';

  const pad = 96;

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

  // ─── Wordmark — quiet futuristic, spells out on hover ──────
  // (Dot removed per direction — wordmark is the letters alone.)
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
          letterSpacing: h ? '0.18em' : '-0.04em',
          transition: 'letter-spacing .55s cubic-bezier(.2,.8,.2,1)',
        }}>axius</span>
        <span style={{
          color: h ? C.tangerine : C.ink,
          transition: 'color .55s cubic-bezier(.2,.8,.2,1)',
        }}>.</span>
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
        color: C.mute, letterSpacing: '0.16em', textTransform: 'uppercase',
        fontVariantNumeric: 'tabular-nums', ...style,
      }}>{time} · MDE</span>
    );
  };

  // ─── Operating Now — fades through real workflow names ─────
  const OperatingNow = ({ style = {} }) => {
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
        display: 'inline-flex', alignItems: 'center', gap: 14,
        padding: '10px 16px',
        background: C.surface, border: `1px solid ${C.line}`,
        fontFamily: MONO, fontSize: 11, letterSpacing: '0.04em',
        color: C.dim, ...style,
      }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
          background: C.mint,
          animation: 'axQ2Pulse 2.4s ease-out infinite',
        }}/>
        <span style={{
          fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: C.mute,
        }}>Operating now</span>
        <span style={{
          opacity: fade ? 1 : 0,
          transition: 'opacity .28s ease',
          color: C.ink, fontWeight: 500,
        }}>{item.name}</span>
        <span style={{color: C.faint}}>·</span>
        <span style={{
          opacity: fade ? 1 : 0,
          transition: 'opacity .28s ease',
          color: C.mute,
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

  // ─── HoverHead — section heading with hoverable italic accent
  // On hover, the italic accent word warms to the section's accent
  // color — small bursts of warmth/curiosity, one per section.
  const HoverHead = ({ accent = C.tangerine, style = {}, prefix, italic, suffix, italicStyle = {} }) => {
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
        {prefix}
        <span style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
          color: h ? accent : (italicStyle.color || C.ink),
          transition: 'color .35s cubic-bezier(.2,.8,.2,1)',
          ...italicStyle,
        }}>{italic}</span>
        {suffix}
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
  const QuietBtn = ({ children, primary, accent = C.tangerine, size = 'md', onClick, style = {} }) => {
    const [h, setH] = React.useState(false);
    const sizes = {
      sm: { pad: '10px 16px', fs: 13 },
      md: { pad: '14px 22px', fs: 14 },
      lg: { pad: '18px 30px', fs: 15 },
    };
    const s = sizes[size];
    // Dark-mode contrast: primary buttons ride a cream-light surface
    // so they pop on the dark canvas, then warm to the accent on hover.
    const bg = primary
      ? (h ? accent : C.ink)
      : 'transparent';
    const border = primary ? bg : (h ? accent : C.lineHi);
    const ink = primary
      ? (h ? '#0E0C0A' : C.bg)
      : (h ? accent : C.ink);
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: primary ? (h ? accent : C.ink) : 'transparent',
          color: primary ? (h ? '#0E0C0A' : C.bg) : ink,
          border: `1px solid ${border}`,
          padding: s.pad,
          fontFamily: DISPLAY, fontWeight: 500, fontSize: s.fs,
          letterSpacing: '-0.005em', cursor: 'pointer',
          transition: 'all .25s cubic-bezier(.2,.8,.2,1)',
          // Phosphor halo on primary hover — the single Matrix touch
          // that lets the CTA feel like it's broadcasting.
          boxShadow: (primary && h)
            ? `0 0 0 1px rgba(80,255,170,0.30), 0 0 24px rgba(80,255,170,0.18)`
            : 'none',
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
  const QuietCard = ({ accent = C.tangerine, children, style = {}, padding = 28, onClick, fillOnHover }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative',
          padding,
          background: fillOnHover && h ? accent : C.surface,
          color: fillOnHover && h ? '#FFFFFF' : C.ink,
          border: `1px solid ${h ? accent : C.line}`,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'border-color .35s ease, transform .35s cubic-bezier(.2,.8,.2,1), background .35s ease, color .35s ease',
          transform: h ? 'translateY(-3px)' : 'translateY(0)',
          ...style,
        }}>
        {/* latent accent strip — top, expands on hover */}
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: h ? 'calc(100% + 2px)' : 0,
          background: accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
          pointerEvents: 'none',
        }}/>
        {children}
      </div>
    );
  };

  // ─── NAV ───────────────────────────────────────────────────
  const Nav = () => (
    <>
      <ScrollProgress/>
      {/* Subtle scan-line overlay (Matrix borrowing, ≤8% opacity) */}
      <div aria-hidden className="ax-quiet2-scan" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99,
      }}/>
      <nav style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center', gap: 36,
        padding: `18px ${pad}px`,
        background: 'rgba(14,12,10,0.82)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${C.line}`,
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Wordmark size={18}/>

        <div style={{display: 'flex', justifyContent: 'center', gap: 32}}>
          {['Work', 'Method', 'Catalog', 'Pricing', 'Founder', 'Notes'].map((n) => (
            <QuietLink key={n} href={'#' + n.toLowerCase()} style={{
              fontFamily: MONO, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: C.dim,
            }}>{n}</QuietLink>
          ))}
        </div>

        <div style={{display: 'inline-flex', alignItems: 'center', gap: 18}}>
          <LiveClock/>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: MONO, fontSize: 10, color: C.dim,
            letterSpacing: '0.16em', textTransform: 'uppercase',
          }}>
            <span style={{
              display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
              background: C.phosphor,
              boxShadow: `0 0 8px ${C.phosphor}`,
              animation: 'axQ2Pulse 2.4s ease-out infinite',
            }}/>
            ● Operational
          </span>
          <QuietBtn primary size="sm">Book a call</QuietBtn>
        </div>
      </nav>
    </>
  );

  // ─── HERO ──────────────────────────────────────────────────
  const Hero = () => {
    const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });
    const [titleHover, setTitleHover] = React.useState(false);
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
        padding: `120px ${pad}px 132px`,
      }}>
        {/* breathing warm-light orb — subtle ambient that leans with the cursor */}
        <div aria-hidden style={{
          position: 'absolute', top: '40%', right: '8%',
          width: 460, height: 460, borderRadius: '50%',
          background: `radial-gradient(closest-side, rgba(255,91,42,0.20), rgba(255,91,42,0) 70%)`,
          animation: 'axQ2Glow 9s ease-in-out infinite',
          transform: `translate(${orbX}px, ${orbY}px)`,
          transition: 'transform 1.2s cubic-bezier(.2,.8,.2,1)',
          pointerEvents: 'none', zIndex: 0,
          willChange: 'transform',
        }}/>

        {/* paper-grain texture — tactile warmth */}
        <svg aria-hidden width="0" height="0" style={{position: 'absolute'}}>
          <filter id="axQ2Grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.92" numOctaves="2" stitchTiles="stitch"/>
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"/>
          </filter>
        </svg>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          filter: 'url(#axQ2Grain)',
          opacity: 0.7, pointerEvents: 'none', zIndex: 0,
          mixBlendMode: 'multiply',
        }}/>

        <div style={{position: 'relative', zIndex: 1}}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 88,
        }}>
          <Eyebrow>Axius — An independent technology operations practice</Eyebrow>
          <Eyebrow color={C.dim}>Accepting · 3 new clients / month</Eyebrow>
        </div>

        <h1
          onMouseEnter={() => setTitleHover(true)}
          onMouseLeave={() => setTitleHover(false)}
          style={{
            margin: 0, fontFamily: DISPLAY, fontWeight: 600,
            fontSize: 104, lineHeight: 1.0, letterSpacing: '-0.045em',
            maxWidth: 1080, color: C.ink,
            fontFeatureSettings: '"ss03", "calt", "kern"',
            cursor: 'default',
          }}>
          Run<br/>
          your business.<br/>
          <span style={{position: 'relative', display: 'inline-block', color: C.dim}}>
            {/* tangerine line animation — slides in from the left on title hover */}
            <span aria-hidden style={{
              position: 'absolute',
              left: '-1.4%', right: '-2.8%',
              bottom: '12%', height: '0.22em',
              background: `linear-gradient(180deg, ${C.tangerine} 0%, #FF8050 100%)`,
              transformOrigin: 'left',
              transform: titleHover ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform .7s cubic-bezier(.2,.8,.2,1)',
              opacity: 0.82, zIndex: 0, pointerEvents: 'none',
            }}/>
            <span style={{position: 'relative', zIndex: 1}}>Not your tech.</span>
          </span>
        </h1>

        {/* operating-now ticker — quietly cycles real workflow names */}
        <div style={{marginTop: 40}}>
          <OperatingNow/>
        </div>

        <div style={{
          marginTop: 88, display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: 64,
          alignItems: 'flex-end',
          paddingTop: 36, borderTop: `1px solid ${C.line}`,
        }}>
          <p style={{
            margin: 0, maxWidth: 540,
            fontFamily: DISPLAY, fontWeight: 400,
            fontSize: 19, color: C.dim, lineHeight: 1.55,
            letterSpacing: '-0.003em',
          }}>
            We run the tech side of your business — websites, automations,
            AI tools, integrations, all of it — for one monthly fee.
            <span style={{color: C.ink}}> The team you'd hire if you knew where to look.</span>
          </p>
          <div style={{display: 'flex', gap: 12, justifySelf: 'end'}}>
            <QuietBtn primary size="lg">Book a discovery call</QuietBtn>
            <QuietBtn size="lg">See the catalog</QuietBtn>
          </div>
        </div>

        {/* subtle stat row */}
        <div style={{
          marginTop: 88,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
        }}>
          {[
            { v: <><CountUp to={129}/></>,         k: 'workflows operated',   accent: C.tangerine },
            { v: '9',                              k: 'categories',           accent: C.lavender  },
            { v: '< 24h',                          k: 'response · tier 3',    accent: C.mint      },
            { v: '$1k',                            k: 'starts at, per month', accent: C.amber     },
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
          position: 'absolute', top: -1, left: 0,
          height: 2, width: h ? '100%' : 0,
          background: accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
        }}/>
        {children}
      </div>
    );
  };

  // ─── COMMITMENTS — 5 cards, latent accents reveal on hover ─
  const Commitments = () => {
    const accents = [C.mint, C.tangerine, C.amber, C.lavender, C.mint];
    return (
      <section id="work" data-screen-label="01 Commitments" style={{
        padding: `160px ${pad}px`,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          alignItems: 'flex-end', marginBottom: 80,
        }}>
          <div>
            <Eyebrow style={{marginBottom: 28}}>01 · Commitments</Eyebrow>
            <HoverHead
              accent={C.tangerine}
              style={{maxWidth: 720}}
              prefix="Five things we "
              italic="always"
              suffix=" do."/>
          </div>
          <p style={{
            margin: 0, maxWidth: 380,
            fontSize: 16, color: C.dim, lineHeight: 1.65, letterSpacing: '-0.003em',
          }}>
            Defaults that apply on every retainer, every tier, every month —
            not just the kickoff slide. Hover to read each.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16,
        }}>
          {window.AxiusCommitments.map((c, i) => (
            <QuietCard key={c.n} accent={accents[i]} padding={28}
              style={{minHeight: 360, display: 'flex', flexDirection: 'column', gap: 18}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <span style={{
                  fontFamily: DISPLAY, fontWeight: 500, fontSize: 36,
                  letterSpacing: '-0.04em', lineHeight: 1, color: C.ink,
                }}>{c.n}</span>
                <span style={{
                  display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                  background: accents[i],
                  opacity: 0.4,
                }}/>
              </div>
              <h3 style={{
                margin: 0, fontFamily: DISPLAY, fontWeight: 500, fontSize: 19,
                letterSpacing: '-0.02em', lineHeight: 1.25, color: C.ink,
              }}>{c.title}</h3>
              <p style={{
                margin: 0, fontSize: 13, color: C.dim, lineHeight: 1.65, flex: 1,
                letterSpacing: '-0.003em',
              }}>{c.body}</p>
              <div style={{paddingTop: 14, borderTop: `1px solid ${C.line}`}}>
                <Eyebrow color={C.mute} style={{marginBottom: 4}}>{c.metric.label}</Eyebrow>
                <div style={{
                  fontFamily: DISPLAY, fontWeight: 500, fontSize: 19, color: C.ink,
                  letterSpacing: '-0.018em',
                }}>{c.metric.value}</div>
              </div>
            </QuietCard>
          ))}
        </div>
      </section>
    );
  };

  // ─── 02 · MESS — quiet split ───────────────────────────────
  const Mess = () => (
    <section data-screen-label="02 The Mess" style={{
      padding: `160px ${pad}px`,
      borderTop: `1px solid ${C.line}`,
    }}>
      <Eyebrow style={{marginBottom: 28}}>02 · The mess most founders inherit</Eyebrow>
      <HoverHead
        accent={C.amber}
        style={{fontSize: 84, letterSpacing: '-0.045em', maxWidth: 1080}}
        prefix="You started this to build a business, "
        italic="not"
        suffix=" maintain a stack."
        italicStyle={{color: C.dim}}/>

      <div style={{
        marginTop: 96, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 56, borderTop: `1px solid ${C.line}`, paddingTop: 48,
      }}>
        {[
          { roman: 'i.',   label: 'The symptom', accent: C.tangerine,
            body: 'Five contractors. Three Slack threads. A website that breaks on Friday afternoon with no one to call. The CRM never got wired to the calendar.' },
          { roman: 'ii.',  label: 'The cost', accent: C.amber,
            body: 'Every tool was bought with optimism. Most sit in a tab nobody opens. The work doesn\'t compound — every cycle is a fresh start.' },
          { roman: 'iii.', label: 'The move', accent: C.mint,
            body: 'Axius is one operator who owns it. One team, one bill, one inbox. The stack is documented. The work compounds because the same hand is on it month over month.' },
        ].map((c, i) => (
          <HoverColumn key={i} accent={c.accent}>
            <div style={{display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24}}>
              <span style={{
                fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 22, color: C.ink,
              }}>{c.roman}</span>
              <Eyebrow color={C.mute}>{c.label}</Eyebrow>
            </div>
            <p style={{
              margin: 0, fontSize: 16, color: C.dim, lineHeight: 1.7, letterSpacing: '-0.003em',
            }}>{c.body}</p>
          </HoverColumn>
        ))}
      </div>
    </section>
  );

  // Hover-column for the Mess — quiet left bar reveal
  const HoverColumn = ({ accent, children }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', paddingLeft: 24,
          transition: 'transform .35s ease',
          transform: h ? 'translateX(2px)' : 'translateX(0)',
        }}>
        <span style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 1,
          background: h ? accent : C.line,
          transition: 'background .35s ease, width .35s ease',
        }}/>
        {children}
      </div>
    );
  };

  // ─── 03 · METHOD ───────────────────────────────────────────
  const Method = () => {
    const accents = [C.tangerine, C.lavender, C.mint, C.amber];
    return (
      <section id="method" data-screen-label="03 Method" style={{
        padding: `160px ${pad}px`,
        background: C.panel, borderTop: `1px solid ${C.line}`,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          alignItems: 'flex-end', marginBottom: 80,
        }}>
          <div>
            <Eyebrow style={{marginBottom: 28}}>03 · Method</Eyebrow>
            <HoverHead
              accent={C.lavender}
              style={{maxWidth: 760}}
              prefix="Four "
              italic="stages"
              suffix={<>.<br/>Each one named.<br/>Each one delivered.</>}/>
          </div>
          <p style={{margin: 0, maxWidth: 340, fontSize: 16, color: C.dim, lineHeight: 1.65}}>
            One pipeline, four checkpoints. Each produces a written artifact you own.
            The same artifacts you'd hand to the next operator if we ever parted ways.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        }}>
          {window.AxiusMethodology.map((m, i) => (
            <MethodCard key={m.n} m={m} accent={accents[i]} index={i}/>
          ))}
        </div>
      </section>
    );
  };

  const MethodCard = ({ m, accent, index }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative',
          padding: '32px 28px',
          background: C.surface,
          border: `1px solid ${h ? accent : C.line}`,
          transition: 'border-color .35s ease, transform .35s cubic-bezier(.2,.8,.2,1)',
          transform: h ? 'translateY(-3px)' : 'translateY(0)',
          minHeight: 360, display: 'flex', flexDirection: 'column', gap: 20,
        }}>
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: h ? 'calc(100% + 2px)' : 0, background: accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
        }}/>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <span style={{
            fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, color: C.mute,
            letterSpacing: '-0.005em',
          }}>Stage {m.n}</span>
          <Eyebrow color={C.faint}>{m.timing}</Eyebrow>
        </div>
        <h3 style={{
          margin: 0, fontFamily: DISPLAY, fontWeight: 500, fontSize: 32,
          letterSpacing: '-0.028em', lineHeight: 1.05, color: C.ink,
        }}>{m.name}.</h3>
        <p style={{margin: 0, fontSize: 14, color: C.dim, lineHeight: 1.65, flex: 1}}>{m.body}</p>
        <div style={{
          padding: '12px 14px',
          background: h ? `${accent}0F` : 'transparent',
          border: `1px solid ${C.line}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          transition: 'background .35s ease',
        }}>
          <span style={{
            fontFamily: MONO, fontSize: 11, color: h ? accent : C.dim,
            letterSpacing: '0.04em', transition: 'color .35s ease',
          }}>{m.artifact}</span>
          <Eyebrow color={C.faint}>artifact</Eyebrow>
        </div>
      </div>
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
        padding: `160px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 80,
          alignItems: 'flex-end', marginBottom: 80,
        }}>
          <div>
            <Eyebrow style={{marginBottom: 28}}>04 · Catalog</Eyebrow>
            <HoverHead
              accent={C.tangerine}
              prefix="An "
              italic="index"
              suffix=" of the work."/>
          </div>
          <div style={{textAlign: 'right'}}>
            <div style={{
              fontFamily: DISPLAY, fontWeight: 600, fontSize: 88,
              letterSpacing: '-0.05em', lineHeight: 0.9, color: C.ink,
            }}>
              <CountUp to={total} duration={1800}/>
            </div>
            <Eyebrow color={C.mute} style={{marginTop: 10}}>
              workflows · {window.AxiusCatalog.length} categories
            </Eyebrow>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          marginBottom: 32,
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
                  <Eyebrow color={C.ink}>{cat.name} — sample entries</Eyebrow>
                </div>
                <Eyebrow color={C.mute}>{rows.length} of {cat.count} · scroll for more</Eyebrow>
              </div>
              <div className="ax-quiet2-scroll" style={{
                maxHeight: 380, overflowY: 'auto',
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
                    {cat.count - rows.length} more on request
                  </Eyebrow>
                  <a href="mailto:andres@axius.tech" style={{
                    fontFamily: MONO, fontSize: 11, fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: accents[active], textDecoration: 'none',
                  }}>Request the full index →</a>
                </div>
              )}
            </div>
          );
        })()}
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
          <Eyebrow color={on ? accent : C.mute}>
            CAT.{String(index+1).padStart(2, '0')}
          </Eyebrow>
          <span style={{
            fontFamily: MONO, fontSize: 11, color: C.mute, letterSpacing: '0.06em',
          }}>{c.count}</span>
        </div>
        <div>
          <h3 style={{
            margin: '0 0 6px', fontFamily: DISPLAY, fontWeight: 500, fontSize: 20,
            letterSpacing: '-0.022em', color: C.ink,
          }}>{c.name}</h3>
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
          display: 'grid', gridTemplateColumns: '80px 1fr 200px 80px 40px',
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
        <Eyebrow color={C.faint}>build · {s.time}</Eyebrow>
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

  // ─── 05 · COMPARISON ───────────────────────────────────────
  const Comparison = () => (
    <section data-screen-label="05 Comparison" style={{
      padding: `160px ${pad}px`,
      background: C.panel, borderTop: `1px solid ${C.line}`,
    }}>
      <Eyebrow style={{marginBottom: 28}}>05 · Comparison</Eyebrow>
      <HoverHead
        accent={C.mint}
        style={{fontSize: 84, letterSpacing: '-0.045em', maxWidth: 1080, marginBottom: 96}}
        prefix="A different "
        italic="shape"
        suffix=" of help."/>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
      }}>
        {[
          { kicker: 'Option 01', name: 'Freelancer', accent: C.amber,
            body: 'Patch by patch. One skill, no ownership. When something breaks, you find a new one. The work doesn\'t compound.',
            price: '$3.5k – $8k', sub: 'per month, variable' },
          { kicker: 'Option 02', name: 'In-house hire', accent: C.lavender,
            body: 'One person, one skill, salaried. A four-month search. Out sick on the day the website breaks. Loyal, expensive, single-threaded.',
            price: '$10k – $14k', sub: 'per month + benefits' },
          { kicker: 'Option 03', name: 'Axius', accent: C.tangerine,
            body: 'Full stack, owned. One bill, month-to-month. Documented. Always reachable. The same hand on it month after month.',
            price: 'From $1,000', sub: 'per month · three tiers', featured: true },
        ].map((c, i) => (
          <ComparisonCard key={i} c={c}/>
        ))}
      </div>
    </section>
  );

  const ComparisonCard = ({ c }) => {
    const [h, setH] = React.useState(false);
    const on = c.featured || h;
    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', padding: '36px 32px',
          background: C.surface,
          border: `1px solid ${on ? c.accent : C.line}`,
          transition: 'all .35s ease',
          transform: h ? 'translateY(-3px)' : 'translateY(0)',
          minHeight: 440, display: 'flex', flexDirection: 'column', gap: 22,
        }}>
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: on ? 'calc(100% + 2px)' : 0, background: c.accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
        }}/>
        <Eyebrow color={on ? c.accent : C.mute}>{c.kicker}</Eyebrow>
        <h3 style={{
          margin: 0, fontFamily: DISPLAY, fontWeight: 600, fontSize: 36,
          letterSpacing: '-0.03em', lineHeight: 1, color: C.ink,
        }}>{c.name}</h3>
        <p style={{margin: 0, fontSize: 15, color: C.dim, lineHeight: 1.65, flex: 1}}>{c.body}</p>
        <div style={{paddingTop: 22, borderTop: `1px solid ${C.line}`}}>
          <div style={{
            fontFamily: DISPLAY, fontWeight: 600, fontSize: 28,
            letterSpacing: '-0.024em', color: C.ink,
          }}>{c.price}</div>
          <Eyebrow color={C.mute} style={{marginTop: 8}}>{c.sub}</Eyebrow>
        </div>
      </div>
    );
  };

  // ─── 06 · PRICING ──────────────────────────────────────────
  const Pricing = () => {
    const accents = [C.mint, C.tangerine, C.lavender];
    return (
      <section id="pricing" data-screen-label="06 Pricing" style={{
        padding: `160px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          alignItems: 'flex-end', marginBottom: 80,
        }}>
          <div>
            <Eyebrow style={{marginBottom: 28}}>06 · Pricing</Eyebrow>
            <HoverHead
              accent={C.mint}
              style={{maxWidth: 720}}
              prefix="Three sizes of "
              italic="operating"
              suffix=" layer."/>
          </div>
          <p style={{margin: 0, maxWidth: 380, fontSize: 16, color: C.dim, lineHeight: 1.65}}>
            One team, one bill. Month-to-month after 90 days. Setup waived on same-day close.
            Capacity measured in points — each workflow's cost is listed in the catalog.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.06fr 1fr', gap: 16,
          alignItems: 'stretch',
        }}>
          {window.AxiusPricing.map((p, i) => (
            <PricingCard key={p.id} p={p} accent={accents[i]} index={i}/>
          ))}
        </div>

        {/* Founder Track inline */}
        <div style={{
          marginTop: 24, padding: '28px 32px',
          background: C.surface, border: `1px solid ${C.line}`,
          display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'center',
        }}>
          <div>
            <Eyebrow color={C.lavender}>Founder Track</Eyebrow>
            <div style={{
              marginTop: 8, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              fontSize: 24, color: C.ink, letterSpacing: '-0.012em',
            }}>building, not running</div>
          </div>
          <p style={{margin: 0, fontSize: 15, color: C.dim, lineHeight: 1.65}}>
            Same retention, different framing. If you're shipping a product from scratch,
            the same point capacity goes toward one bigger build plus the workflows that surround it.{' '}
            <strong style={{color: C.ink, fontWeight: 500}}>Builder</strong> inside Equipo — MVP in 3–4 months.{' '}
            <strong style={{color: C.ink, fontWeight: 500}}>Partner</strong> inside Departamento — substantial product in 4–6 months.
          </p>
        </div>
      </section>
    );
  };

  const PricingCard = ({ p, accent, index }) => {
    const [h, setH] = React.useState(false);
    const featured = !!p.featured;
    const on = featured || h;
    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', padding: featured ? '40px 32px 32px' : '32px 28px 28px',
          background: C.surface,
          border: `1px solid ${on ? accent : C.line}`,
          transition: 'all .35s ease',
          transform: featured ? 'translateY(-12px)' : (h ? 'translateY(-3px)' : 'translateY(0)'),
          display: 'flex', flexDirection: 'column', gap: 22,
        }}>
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: on ? 'calc(100% + 2px)' : 0, background: accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
        }}/>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Eyebrow color={on ? accent : C.mute}>TIER {String(index+1).padStart(2, '0')}</Eyebrow>
          {featured && (
            <span style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              fontSize: 13, color: accent,
            }}>most chosen</span>
          )}
        </div>

        <h3 style={{
          margin: 0, fontFamily: DISPLAY, fontWeight: 600,
          fontSize: featured ? 48 : 38,
          letterSpacing: '-0.034em', lineHeight: 0.95, color: C.ink,
        }}>{p.name}.</h3>

        <p style={{margin: 0, fontSize: 14, color: C.dim, lineHeight: 1.55, minHeight: 60}}>{p.sub}</p>

        <div style={{paddingTop: 22, borderTop: `1px solid ${C.line}`, display: 'flex', alignItems: 'baseline', gap: 8}}>
          <span style={{
            fontFamily: DISPLAY, fontWeight: 600, fontSize: 52,
            color: C.ink, letterSpacing: '-0.04em', lineHeight: 0.92,
          }}>${p.price.toLocaleString()}</span>
          <span style={{fontFamily: MONO, fontSize: 12, color: C.mute, letterSpacing: '0.08em'}}>/ mo</span>
        </div>
        <div style={{
          fontFamily: MONO, fontSize: 10, color: C.mute,
          letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: -10,
        }}>+ ${p.setup.toLocaleString()} setup · waived on close</div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
          padding: '18px 0',
          borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
        }}>
          {[
            ['capacity', `${p.points} pts active`],
            ['response', p.response],
            ['cadence', p.cadence],
            ['comms', p.comms],
          ].map(([k, v]) => (
            <div key={k}>
              <Eyebrow color={C.mute} style={{marginBottom: 4}}>{k}</Eyebrow>
              <div style={{fontFamily: DISPLAY, fontSize: 14, color: C.ink, letterSpacing: '-0.005em'}}>{v}</div>
            </div>
          ))}
        </div>

        <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1}}>
          {p.features.map((f, j) => (
            <li key={j} style={{
              display: 'flex', gap: 10, fontSize: 13, color: C.dim, lineHeight: 1.5,
            }}>
              <span style={{color: accent, fontFamily: MONO}}>→</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <QuietBtn primary accent={accent} size="md" style={{justifyContent: 'center'}}>
          Book a call
        </QuietBtn>
      </div>
    );
  };

  // ─── 07 · FOUNDER (multi-image spread) ─────────────────────
  // Magazine-portfolio layout: hero portrait on the left with the
  // grayscale → colour hover, then bio + quote on the right, then a
  // contact-sheet row of three additional framed shots below. The
  // additional shots are cropped + filtered variants of the same
  // photograph so the spread reads as a small portfolio.
  const Founder = () => {
    const [heroH, setHeroH] = React.useState(false);

    // Treatments for the contact-sheet thumbnails. Each is a different
    // crop (objectPosition) + filter to give the sense of three
    // separate shots: in the studio, at the desk, on call.
    const thumbs = [
      {
        fig: 'Fig. 02',
        caption: 'In studio · Medellín',
        crop: '50% 20%',
        filterIdle: 'grayscale(0.85) sepia(0.30) hue-rotate(75deg) saturate(1.3) contrast(1.06) brightness(0.82)',
        filterHover: 'grayscale(0) saturate(1.05) contrast(1.04) brightness(0.96)',
      },
      {
        fig: 'Fig. 03',
        caption: 'At the desk · documented',
        crop: '60% 38%',
        filterIdle: 'grayscale(0.9) sepia(0.32) hue-rotate(80deg) saturate(1.4) contrast(1.10) brightness(0.80)',
        filterHover: 'grayscale(0) saturate(1.06) contrast(1.04) brightness(0.96)',
      },
      {
        fig: 'Fig. 04',
        caption: 'On duty · US business hours',
        crop: '40% 35%',
        filterIdle: 'grayscale(0.92) sepia(0.30) hue-rotate(70deg) saturate(1.3) contrast(1.08) brightness(0.80)',
        filterHover: 'grayscale(0) saturate(1.06) contrast(1.04) brightness(0.96)',
      },
    ];

    return (
      <section id="founder" data-screen-label="07 Founder" style={{
        borderTop: `1px solid ${C.line}`, background: C.bg,
      }}>
        {/* Top row — hero portrait + bio */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          minHeight: 720,
        }}>
          <div
            onMouseEnter={() => setHeroH(true)}
            onMouseLeave={() => setHeroH(false)}
            style={{position: 'relative', overflow: 'hidden', cursor: 'crosshair'}}>
            <img src={window.AxiusFounder.photo} alt="Andrés Toro" style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: '50% 30%',
              filter: heroH
                ? 'grayscale(0) saturate(1.06) contrast(1.04) brightness(0.96)'
                : 'grayscale(0.85) sepia(0.35) hue-rotate(75deg) saturate(1.4) contrast(1.08) brightness(0.78)',
              transition: 'filter 1.6s cubic-bezier(.2,.8,.2,1)',
            }}/>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(180deg, rgba(247,246,242,0.0) 50%, rgba(247,246,242,0.7) 100%)',
            }}/>
            <div style={{position: 'absolute', bottom: 36, left: 36, right: 36}}>
              <Eyebrow color={heroH ? C.tangerine : C.dim}>Fig. 01 · Operator</Eyebrow>
              <div style={{
                marginTop: 10, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
                fontSize: 56, letterSpacing: '-0.02em', lineHeight: 1.0, color: C.ink,
              }}>Andrés Toro</div>
              <Eyebrow color={C.mute} style={{marginTop: 10}}>
                Hover to bring him into colour
              </Eyebrow>
            </div>
          </div>

          <div style={{
            padding: '120px 80px', display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <Eyebrow style={{marginBottom: 28}}>07 · The Operator</Eyebrow>
            <HoverHead
              accent={C.amber}
              style={{fontSize: 56, letterSpacing: '-0.038em', lineHeight: 1.02, marginBottom: 28}}
              prefix="The hand on "
              italic="your stack"
              suffix="."/>
            <p style={{margin: '0 0 28px', fontSize: 17, color: C.dim, lineHeight: 1.7, maxWidth: 480}}>
              {window.AxiusFounder.bio}
            </p>
            <p style={{
              margin: 0, maxWidth: 460,
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              fontSize: 22, color: C.ink, lineHeight: 1.4,
              paddingLeft: 22, borderLeft: `1px solid ${C.lineHi}`,
              letterSpacing: '-0.01em',
            }}>
              "I won't make you the bottleneck in your own company."
            </p>
            <div style={{
              marginTop: 44, paddingTop: 24,
              borderTop: `1px solid ${C.line}`,
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18,
              maxWidth: 480,
            }}>
              {window.AxiusFounder.facts.map((f, i) => (
                <div key={i}>
                  <Eyebrow color={C.mute}>{f.k}</Eyebrow>
                  <div style={{marginTop: 4, fontFamily: DISPLAY, fontSize: 14, color: C.ink, letterSpacing: '-0.005em'}}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact sheet — three additional framed shots */}
        <div style={{
          padding: '64px 80px 96px',
          borderTop: `1px solid ${C.line}`,
          background: C.panel,
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 28, gap: 60,
          }}>
            <div>
              <Eyebrow color={C.mute}>Contact sheet · additional frames</Eyebrow>
              <div style={{
                marginTop: 8, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
                fontSize: 20, color: C.dim, letterSpacing: '-0.005em',
              }}>Three more from the inaugural shoot.</div>
            </div>
            <Eyebrow color={C.faint}>shot in Medellín · 2026</Eyebrow>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
          }}>
            {thumbs.map((t, i) => (
              <FounderThumb key={i} t={t}/>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const FounderThumb = ({ t }) => {
    const [h, setH] = React.useState(false);
    return (
      <figure
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          margin: 0, position: 'relative',
          background: C.surface, border: `1px solid ${h ? C.lineHi : C.line}`,
          transition: 'border-color .35s ease, transform .35s cubic-bezier(.2,.8,.2,1)',
          transform: h ? 'translateY(-3px)' : 'translateY(0)',
          cursor: 'crosshair',
        }}>
        <div style={{
          aspectRatio: '5 / 6', overflow: 'hidden', position: 'relative',
        }}>
          <img src={window.AxiusFounder.photo} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: t.crop,
            filter: h ? t.filterHover : t.filterIdle,
            transition: 'filter 1.4s cubic-bezier(.2,.8,.2,1)',
          }}/>
          <span aria-hidden style={{
            position: 'absolute', top: -1, left: -1, height: 2,
            width: h ? 'calc(100% + 2px)' : 0,
            background: C.tangerine,
            transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
          }}/>
        </div>
        <figcaption style={{
          padding: '14px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          borderTop: `1px solid ${C.line}`,
        }}>
          <span style={{
            fontFamily: MONO, fontSize: 10, color: h ? C.tangerine : C.mute,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            transition: 'color .35s ease',
          }}>{t.fig}</span>
          <span style={{
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 14,
            color: C.dim, letterSpacing: '-0.005em',
          }}>{t.caption}</span>
        </figcaption>
      </figure>
    );
  };

  // ─── 08 · FIELD NOTES ──────────────────────────────────────
  const fieldNotes = [
    { n: '01', t: 'Stacks accumulate. They do not arrive.', b: 'No founder ever sat down and chose their stack. It accumulates — one optimistic purchase at a time, until what runs the business is a fossil record of decisions made under time pressure.', accent: C.tangerine },
    { n: '02', t: 'The right SaaS is the cheaper build.',   b: 'Custom software is the expensive default. Most of the time, somebody already built what you need — better tested, better integrated — and rents it for less than a monthly coffee budget.', accent: C.lavender },
    { n: '03', t: 'Onboarding is the engagement.',          b: 'Most retainer relationships are lost in the first thirty days, not the twelfth. The shape of the onboarding is the shape of the entire engagement afterwards.', accent: C.mint },
    { n: '04', t: 'Cancellations precede churn by ninety days.', b: 'By the time a customer cancels, the decision is months old. The signal was present in their behavior long before the email arrived.', accent: C.amber },
    { n: '05', t: 'What you measure, you find.',            b: 'Reporting infrastructure determines what a company knows about itself. Half the work of operating well is making the situation visible.', accent: C.sky },
    { n: '06', t: 'AI saves the operator, not the customer.', b: 'Almost every useful AI deployment we ship saves time inside the company, not for the customer. The quiet wins are in triage and transcription.', accent: C.pink },
  ];

  const FieldNotes = () => (
    <section id="notes" data-screen-label="08 Field Notes" style={{
      padding: `160px ${pad}px`,
      background: C.panel, borderTop: `1px solid ${C.line}`,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
        alignItems: 'flex-end', marginBottom: 80,
      }}>
        <div>
          <Eyebrow style={{marginBottom: 28}}>08 · Field Notes</Eyebrow>
          <HoverHead
            accent={C.lavender}
            style={{fontSize: 64, maxWidth: 720}}
            prefix="Six "
            italic="field notes"
            suffix=" from running technology inside small businesses."/>
        </div>
        <p style={{margin: 0, maxWidth: 320, fontSize: 14, color: C.dim, lineHeight: 1.65}}>
          Full essays published quarterly. Updated as observation accumulates.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
      }}>
        {fieldNotes.map((n) => <FieldNote key={n.n} n={n}/>)}
      </div>
    </section>
  );

  const FieldNote = ({ n }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', padding: '32px 28px',
          background: C.surface,
          border: `1px solid ${h ? n.accent : C.line}`,
          transition: 'all .35s ease',
          transform: h ? 'translateY(-3px)' : 'translateY(0)',
          minHeight: 320, display: 'flex', flexDirection: 'column', gap: 18,
        }}>
        <span style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: h ? 'calc(100% + 2px)' : 0, background: n.accent,
          transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
        }}/>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <span style={{
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 22,
            color: h ? n.accent : C.ink, transition: 'color .35s ease',
          }}>№ {n.n}</span>
          <Eyebrow color={C.faint}>field note</Eyebrow>
        </div>
        <h3 style={{
          margin: 0, fontFamily: DISPLAY, fontWeight: 500, fontSize: 22,
          letterSpacing: '-0.022em', lineHeight: 1.25, color: C.ink,
        }}>{n.t}</h3>
        <p style={{margin: 0, fontSize: 14, color: C.dim, lineHeight: 1.7, flex: 1}}>{n.b}</p>
        <QuietLink href="#" accent={n.accent} style={{
          fontFamily: MONO, fontSize: 11, fontWeight: 500,
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>Read in full</QuietLink>
      </div>
    );
  };

  // ─── 09 · FAQ ──────────────────────────────────────────────
  const FAQ = () => {
    const [open, setOpen] = React.useState(0);
    return (
      <section data-screen-label="09 FAQ" style={{
        padding: `160px ${pad}px`,
        borderTop: `1px solid ${C.line}`,
      }}>
        <Eyebrow style={{marginBottom: 28}}>09 · Appendix</Eyebrow>
        <HoverHead
          accent={C.tangerine}
          style={{maxWidth: 1000, marginBottom: 64}}
          prefix="Questions, "
          italic="asked plainly"
          suffix="."/>

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
          gap: 24, padding: '26px 24px', alignItems: 'baseline',
        }}>
          <span style={{
            fontFamily: MONO, fontSize: 11, fontWeight: 500,
            color: isOpen ? accent : C.mute, letterSpacing: '0.18em',
            transition: 'color .25s ease',
          }}>Q.{String(i+1).padStart(2, '0')}</span>
          <span style={{
            fontFamily: DISPLAY, fontWeight: 500, fontSize: 22,
            color: isOpen ? C.ink : (h ? C.ink : C.dim),
            letterSpacing: '-0.02em', lineHeight: 1.3,
            transition: 'color .25s ease',
          }}>{f.q}</span>
          <span style={{
            fontFamily: MONO, fontSize: 20, color: isOpen ? accent : C.dim,
            textAlign: 'right', transition: 'transform .25s ease, color .25s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}>+</span>
        </button>
        {isOpen && (
          <div style={{
            display: 'grid', gridTemplateColumns: '70px 1fr 40px',
            gap: 24, padding: '0 24px 28px',
          }}>
            <span/>
            <p style={{
              margin: 0, fontSize: 15, color: C.dim, lineHeight: 1.75,
              maxWidth: 760, letterSpacing: '-0.003em',
            }}>{f.a}</p>
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
      {/* breathing orb */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 680, height: 680, borderRadius: '50%',
        background: `radial-gradient(closest-side, rgba(255,91,42,0.13), rgba(255,91,42,0) 70%)`,
        animation: 'axQ2Glow 11s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>

      <div style={{position: 'relative', zIndex: 1}}>
        <Eyebrow color={C.mute} style={{marginBottom: 32}}>— Begin —</Eyebrow>
        <HoverHead
          accent={C.tangerine}
          style={{fontSize: 128, letterSpacing: '-0.055em', lineHeight: 0.92}}
          prefix={<>Begin a<br/></>}
          italic="conversation"
          suffix="."/>

        <p style={{
          margin: '40px auto 0', maxWidth: 500,
          fontSize: 18, color: C.dim, lineHeight: 1.6,
        }}>
          Thirty minutes. You leave with a one-page audit either way.
          No pitch, no pressure — just a clear picture of your stack.
        </p>

        <div style={{display: 'flex', gap: 14, justifyContent: 'center', marginTop: 48}}>
          <QuietBtn primary size="lg">Schedule the conversation</QuietBtn>
          <QuietBtn size="lg">andres@axius.tech</QuietBtn>
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
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            <span>axius.tech</span>
            <span style={{color: C.faint}}>·</span>
            <span>medellín · remote</span>
            <span style={{color: C.faint}}>·</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </section>
  );

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
      <Founder/>
      <FieldNotes/>
      <FAQ/>
      <CTA/>
    </div>
  );
};

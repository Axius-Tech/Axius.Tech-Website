// ============================================================
// AXIUS · DIRECTION D — VIVID (MAGAZINE / POSTER)
// A clean break from warm-dark/copper. Cream paper canvas,
// four loud accents (coral / electric blue / lemon / pink),
// Bricolage Grotesque display + Instrument Serif poster
// moments. Magazine-cover scale type, sticker-like cards with
// chunky black borders, full-bleed color blocks, an alive feel.
// ============================================================

window.AxiusDirectionD = function () {
  // Load Bricolage Grotesque + Instrument Serif on mount
  React.useEffect(() => {
    if (document.getElementById('axius-vivid-fonts')) return;
    const link = document.createElement('link');
    link.id = 'axius-vivid-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&display=swap';
    document.head.appendChild(link);
  }, []);

  // VIVID palette
  const C = {
    bg:       '#F4EFE6',   // warm cream paper
    paper:    '#FFFAF0',   // lighter panel
    surface:  '#FFFFFF',
    ink:      '#0A0A0A',
    dim:      'rgba(10,10,10,0.72)',
    mute:     'rgba(10,10,10,0.5)',
    faint:    'rgba(10,10,10,0.32)',
    line:     'rgba(10,10,10,0.12)',
    coral:    '#FF4D2E',
    coralDeep:'#D63C1F',
    blue:     '#1147FF',
    blueDeep: '#0B30C2',
    lemon:    '#FFD43B',
    lemonDeep:'#F4B400',
    pink:     '#FF7BAC',
    sage:     '#5BAA72',
    cream:    '#FFEFD5',
  };

  const DISPLAY = '"Bricolage Grotesque", "Inter", system-ui, sans-serif';
  const SERIF   = '"Instrument Serif", "Times New Roman", serif';
  const SANS    = '"Inter", system-ui, sans-serif';
  const MONO    = '"JetBrains Mono", ui-monospace, monospace';

  const pad = 64;

  // ─── Sticker button ────────────────────────────────────────
  const Sticker = ({ children, fill = 'coral', size = 'md', style = {}, onClick }) => {
    const fills = {
      coral: { bg: C.coral, ink: '#FFFFFF', shadow: C.ink },
      blue:  { bg: C.blue,  ink: '#FFFFFF', shadow: C.ink },
      lemon: { bg: C.lemon, ink: C.ink,     shadow: C.ink },
      dark:  { bg: C.ink,   ink: '#FFFAF0', shadow: C.coral },
      cream: { bg: C.cream, ink: C.ink,     shadow: C.ink },
      paper: { bg: C.paper, ink: C.ink,     shadow: C.ink },
    };
    const sizes = {
      sm: { pad: '10px 18px', fs: 13 },
      md: { pad: '14px 24px', fs: 15 },
      lg: { pad: '20px 32px', fs: 18 },
      xl: { pad: '26px 44px', fs: 20 },
    };
    const f = fills[fill];
    const s = sizes[size];
    return (
      <button onClick={onClick} style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        background: f.bg, color: f.ink,
        border: `2px solid ${C.ink}`,
        boxShadow: `4px 4px 0 0 ${f.shadow}`,
        padding: s.pad,
        fontFamily: DISPLAY, fontWeight: 600, fontSize: s.fs,
        letterSpacing: '-0.01em', cursor: 'pointer',
        transition: 'transform .12s ease, box-shadow .12s ease',
        textTransform: 'none',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)';
        e.currentTarget.style.boxShadow = `6px 6px 0 0 ${f.shadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = `4px 4px 0 0 ${f.shadow}`;
      }}>
        {children}
        <span style={{fontFamily: MONO, fontSize: s.fs - 2}}>↗</span>
      </button>
    );
  };

  // ─── Chip pill ─────────────────────────────────────────────
  const Chip = ({ children, color = 'coral', style = {} }) => {
    const map = { coral: C.coral, blue: C.blue, lemon: C.lemon, ink: C.ink, sage: C.sage, pink: C.pink };
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: '#FFFAF0',
        border: `2px solid ${C.ink}`,
        padding: '6px 12px',
        fontFamily: MONO, fontSize: 10, fontWeight: 600,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: C.ink,
        ...style,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: map[color], border: `1.5px solid ${C.ink}`,
        }}/>
        {children}
      </span>
    );
  };

  // ─── Sticker card with chunky border + offset shadow ───────
  const Card = ({ tone = 'paper', children, style = {}, shadow = true, hover = true, onClick }) => {
    const tones = {
      paper: { bg: C.paper,  ink: C.ink },
      cream: { bg: C.cream,  ink: C.ink },
      coral: { bg: C.coral,  ink: '#FFFAF0' },
      blue:  { bg: C.blue,   ink: '#FFFAF0' },
      lemon: { bg: C.lemon,  ink: C.ink },
      pink:  { bg: C.pink,   ink: C.ink },
      sage:  { bg: C.sage,   ink: '#FFFAF0' },
      dark:  { bg: C.ink,    ink: '#FFFAF0' },
      white: { bg: C.surface,ink: C.ink },
    };
    const t = tones[tone];
    return (
      <div onClick={onClick} style={{
        background: t.bg, color: t.ink,
        border: `2px solid ${C.ink}`,
        boxShadow: shadow ? `6px 6px 0 0 ${C.ink}` : 'none',
        transition: 'transform .15s ease, box-shadow .15s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={hover && shadow ? (e) => {
        e.currentTarget.style.transform = 'translate(-3px, -3px)';
        e.currentTarget.style.boxShadow = `9px 9px 0 0 ${C.ink}`;
      } : undefined}
      onMouseLeave={hover && shadow ? (e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = `6px 6px 0 0 ${C.ink}`;
      } : undefined}>
        {children}
      </div>
    );
  };

  // ─── Section eyebrow ───────────────────────────────────────
  const Eyebrow = ({ children, color, style = {} }) => (
    <div style={{
      fontFamily: MONO, fontSize: 11, fontWeight: 600,
      letterSpacing: '0.22em', textTransform: 'uppercase',
      color: color || C.ink,
      ...style,
    }}>{children}</div>
  );

  // ─── Wordmark — fresh take ─────────────────────────────────
  const Wordmark = ({ size = 22, color }) => (
    <span style={{
      display: 'inline-flex', alignItems: 'baseline', gap: size * 0.18,
      fontFamily: DISPLAY, fontWeight: 700, fontSize: size,
      letterSpacing: '-0.04em', color: color || C.ink,
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size * 1.1, height: size * 1.1,
        background: C.coral, color: '#FFFAF0',
        border: `2px solid ${C.ink}`,
        fontSize: size * 0.65, fontWeight: 800,
      }}>A</span>
      <span>xius<span style={{color: C.coral}}>.</span></span>
    </span>
  );

  // ─── NAV ───────────────────────────────────────────────────
  const Nav = () => (
    <nav style={{
      display: 'grid', gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center', gap: 32,
      padding: `22px ${pad}px`,
      background: C.bg,
      borderBottom: `2px solid ${C.ink}`,
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <Wordmark size={24}/>
      <div style={{display: 'flex', justifyContent: 'center', gap: 28}}>
        {['Work', 'Method', 'Catalog', 'Pricing', 'Founder'].map((n, i) => (
          <span key={n} style={{
            fontFamily: DISPLAY, fontSize: 16, fontWeight: 500,
            color: C.ink, letterSpacing: '-0.012em',
            cursor: 'pointer',
            borderBottom: i === 0 ? `2px solid ${C.coral}` : '2px solid transparent',
            paddingBottom: 2,
            transition: 'border-color .15s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = C.coral}
          onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = i === 0 ? C.coral : 'transparent'}>
            {n}
          </span>
        ))}
      </div>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 14}}>
        <Chip color="sage">on duty</Chip>
        <Sticker fill="coral" size="sm">Book a call</Sticker>
      </div>
    </nav>
  );

  // ─── HERO ──────────────────────────────────────────────────
  const Hero = () => (
    <header data-screen-label="00 Hero" style={{
      padding: `72px ${pad}px 88px`, position: 'relative', overflow: 'hidden',
    }}>
      {/* decorative giant asterisk in background */}
      <div aria-hidden style={{
        position: 'absolute', top: 80, right: -120,
        fontFamily: DISPLAY, fontWeight: 800, fontSize: 560,
        color: C.coral, lineHeight: 0.7, letterSpacing: '-0.08em',
        opacity: 0.95, pointerEvents: 'none',
        transform: 'rotate(-12deg)',
      }}>※</div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 56, position: 'relative', zIndex: 1,
      }}>
        <Eyebrow>Axius · Issue 01 · 2026</Eyebrow>
        <div style={{display: 'flex', gap: 10}}>
          <Chip color="coral">accepting · 3 / month</Chip>
        </div>
      </div>

      <h1 style={{
        margin: 0, fontFamily: DISPLAY, fontWeight: 800,
        fontSize: 192, lineHeight: 0.88, letterSpacing: '-0.055em',
        color: C.ink, position: 'relative', zIndex: 1,
      }}>
        <span style={{color: C.coral}}>Run</span><br/>
        your business.<br/>
        <span style={{
          position: 'relative', display: 'inline-block',
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
          letterSpacing: '-0.04em',
        }}>
          Not your tech.
          <span aria-hidden style={{
            position: 'absolute',
            left: '2%', right: '4%', top: '60%', height: 14,
            background: C.lemon, zIndex: -1,
          }}/>
        </span>
      </h1>

      <div style={{
        marginTop: 56, display: 'grid', gridTemplateColumns: '1fr auto',
        gap: 56, alignItems: 'flex-end',
        paddingTop: 32, borderTop: `2px solid ${C.ink}`,
        position: 'relative', zIndex: 1,
      }}>
        <p style={{
          margin: 0, maxWidth: 560,
          fontFamily: SANS, fontSize: 19, color: C.dim, lineHeight: 1.5,
          letterSpacing: '-0.003em',
        }}>
          We run the tech side of your business — websites, automations,
          AI tools, integrations, all of it — for one monthly fee.{' '}
          <span style={{color: C.ink, fontWeight: 500}}>The team you'd hire if you knew where to look.</span>
        </p>
        <div style={{display: 'flex', gap: 14}}>
          <Sticker fill="coral" size="lg">Book a discovery call</Sticker>
          <Sticker fill="paper" size="lg">See the catalog</Sticker>
        </div>
      </div>

      {/* hero stat strip */}
      <div style={{
        marginTop: 56,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        position: 'relative', zIndex: 1,
      }}>
        {[
          { v: '129',     k: 'workflows operated',  tone: 'coral' },
          { v: '9',       k: 'categories',          tone: 'paper' },
          { v: '< 24h',   k: 'response, tier 3',    tone: 'blue'  },
          { v: '$1k/mo',  k: 'starts at',           tone: 'lemon' },
        ].map((s, i) => (
          <Card key={i} tone={s.tone} style={{padding: '22px 22px'}}>
            <Eyebrow color={s.tone === 'coral' || s.tone === 'blue' ? 'rgba(255,250,240,0.7)' : C.faint}>{s.k}</Eyebrow>
            <div style={{
              marginTop: 12,
              fontFamily: DISPLAY, fontWeight: 800, fontSize: 56,
              letterSpacing: '-0.04em', lineHeight: 0.95,
            }}>{s.v}</div>
          </Card>
        ))}
      </div>
    </header>
  );

  // ─── COMMITMENTS — five sticker cards in vivid colors ──────
  const Commitments = () => {
    const tones = ['coral', 'paper', 'lemon', 'blue', 'pink'];
    return (
      <section data-screen-label="01 Commitments" style={{
        padding: `120px ${pad}px`, borderTop: `2px solid ${C.ink}`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 64, gap: 60,
        }}>
          <div>
            <Eyebrow color={C.coral} style={{marginBottom: 18}}>§ 01 · Commitments</Eyebrow>
            <h2 style={{
              margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 104,
              letterSpacing: '-0.045em', lineHeight: 0.92, color: C.ink,
              maxWidth: 880,
            }}>
              Five things we<br/>
              <span style={{
                fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.coral,
              }}>always</span> do.
            </h2>
          </div>
          <p style={{
            margin: 0, maxWidth: 320,
            fontFamily: SANS, fontSize: 15, color: C.dim, lineHeight: 1.6,
          }}>
            Defaults that apply on every retainer, every tier — not just the kickoff slide.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20,
        }}>
          {window.AxiusCommitments.map((c, i) => {
            const tone = tones[i];
            const onDark = tone === 'coral' || tone === 'blue';
            const ink = onDark ? '#FFFAF0' : C.ink;
            const dim = onDark ? 'rgba(255,250,240,0.78)' : C.dim;
            const faint = onDark ? 'rgba(255,250,240,0.55)' : C.faint;
            return (
              <Card key={c.n} tone={tone} style={{
                padding: '26px 22px',
                display: 'flex', flexDirection: 'column', gap: 18,
                minHeight: 380,
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                  <span style={{
                    fontFamily: DISPLAY, fontWeight: 800, fontSize: 64,
                    letterSpacing: '-0.05em', lineHeight: 0.85, color: ink,
                  }}>{c.n}</span>
                  <Eyebrow color={faint}>C.0{i+1}</Eyebrow>
                </div>
                <h3 style={{
                  margin: 0, fontFamily: DISPLAY, fontWeight: 700, fontSize: 24,
                  letterSpacing: '-0.028em', lineHeight: 1.1, color: ink,
                }}>{c.title}</h3>
                <p style={{
                  margin: 0, fontFamily: SANS, fontSize: 13, color: dim,
                  lineHeight: 1.6, flex: 1,
                }}>{c.body}</p>
                <div style={{
                  paddingTop: 14,
                  borderTop: `1.5px solid ${onDark ? 'rgba(255,250,240,0.3)' : C.line}`,
                }}>
                  <Eyebrow color={faint} style={{marginBottom: 4}}>{c.metric.label}</Eyebrow>
                  <div style={{
                    fontFamily: DISPLAY, fontWeight: 700, fontSize: 22,
                    letterSpacing: '-0.018em', color: ink,
                  }}>{c.metric.value}</div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    );
  };

  // ─── THE MESS — full-bleed electric blue ───────────────────
  const Mess = () => (
    <section data-screen-label="02 The Mess" style={{
      padding: `120px ${pad}px`, background: C.blue, color: '#FFFAF0',
      borderTop: `2px solid ${C.ink}`, position: 'relative', overflow: 'hidden',
    }}>
      {/* big lemon circle decoration */}
      <div aria-hidden style={{
        position: 'absolute', top: -120, right: -120,
        width: 460, height: 460, borderRadius: '50%',
        background: C.lemon, border: `4px solid ${C.ink}`,
      }}/>
      {/* coral arrow decoration */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 80, right: 100, zIndex: 1,
        fontFamily: DISPLAY, fontWeight: 800, fontSize: 220,
        color: C.coral, lineHeight: 0.7,
      }}>↘</div>

      <div style={{position: 'relative', zIndex: 2}}>
        <Eyebrow color="rgba(255,250,240,0.85)" style={{marginBottom: 18}}>§ 02 · The Mess</Eyebrow>
        <h2 style={{
          margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 112,
          letterSpacing: '-0.05em', lineHeight: 0.92, color: '#FFFAF0',
          maxWidth: 900,
        }}>
          You started this to<br/>
          <span style={{
            background: C.lemon, color: C.ink, padding: '0 18px',
            border: `3px solid ${C.ink}`, display: 'inline-block',
          }}>build a business</span>,<br/>
          not maintain a stack.
        </h2>

        <div style={{
          marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        }}>
          {[
            { roman: 'i.',   label: 'The symptom',
              body: 'Five contractors. Three Slack threads. A website that breaks on Friday afternoon with no one to call. The CRM never got wired to the calendar. The "AI thing" the last consultant set up still doesn\'t quite work.',
              tone: 'paper' },
            { roman: 'ii.',  label: 'The cost',
              body: 'Every tool was bought with optimism. Most sit in a tab nobody opens. The real cost of running tech across the business has quietly become the cost of having no one own it. The work doesn\'t compound.',
              tone: 'paper' },
            { roman: 'iii.', label: 'The move',
              body: 'Axius is one operator who owns it. One team, one bill, one inbox. The stack is documented. The tickets are routed. The roadmap is written down. The same hand on it month over month.',
              tone: 'coral' },
          ].map((c, i) => {
            const onDark = c.tone === 'coral';
            const ink = onDark ? '#FFFAF0' : C.ink;
            const dim = onDark ? 'rgba(255,250,240,0.85)' : C.dim;
            const faint = onDark ? 'rgba(255,250,240,0.6)' : C.faint;
            return (
              <Card key={i} tone={c.tone} style={{padding: '28px 24px', minHeight: 320}}>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
                  <span style={{
                    fontFamily: SERIF, fontStyle: 'italic', fontSize: 48,
                    color: ink, lineHeight: 1,
                  }}>{c.roman}</span>
                  <Eyebrow color={faint}>{c.label}</Eyebrow>
                </div>
                <p style={{
                  margin: '20px 0 0', fontFamily: SANS, fontSize: 15,
                  color: dim, lineHeight: 1.65,
                }}>{c.body}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );

  // ─── METHOD — 4 horizontal cards with chunky numeral badges
  const Method = () => {
    const badges = [
      { bg: C.coral, ink: '#FFFAF0' },
      { bg: C.blue,  ink: '#FFFAF0' },
      { bg: C.lemon, ink: C.ink },
      { bg: C.pink,  ink: C.ink },
    ];
    return (
      <section data-screen-label="03 Method" style={{
        padding: `120px ${pad}px`, borderTop: `2px solid ${C.ink}`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 64, gap: 60,
        }}>
          <div>
            <Eyebrow color={C.coral} style={{marginBottom: 18}}>§ 03 · Method</Eyebrow>
            <h2 style={{
              margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 104,
              letterSpacing: '-0.045em', lineHeight: 0.92, maxWidth: 920,
            }}>
              Four <span style={{
                fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.blue,
              }}>stages</span>.<br/>
              Each one named.<br/>
              Each one delivered.
            </h2>
          </div>
          <p style={{margin: 0, maxWidth: 280, fontFamily: SANS, fontSize: 15, color: C.dim, lineHeight: 1.6}}>
            One pipeline, four checkpoints. Each produces a written artifact you own.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
        }}>
          {window.AxiusMethodology.map((m, i) => {
            const b = badges[i];
            return (
              <Card key={m.n} tone="paper" style={{
                padding: '28px 24px', minHeight: 400,
                display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <div style={{
                  width: 84, height: 84,
                  background: b.bg, color: b.ink,
                  border: `2.5px solid ${C.ink}`, boxShadow: `4px 4px 0 0 ${C.ink}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: DISPLAY, fontWeight: 800, fontSize: 38,
                  letterSpacing: '-0.04em',
                }}>{m.n}</div>
                <div>
                  <Eyebrow color={C.faint} style={{marginBottom: 8}}>Stage {m.n} · {m.timing}</Eyebrow>
                  <h3 style={{
                    margin: 0, fontFamily: DISPLAY, fontWeight: 700, fontSize: 32,
                    letterSpacing: '-0.03em', lineHeight: 1.05,
                  }}>{m.name}.</h3>
                </div>
                <p style={{margin: 0, fontFamily: SANS, fontSize: 14, color: C.dim, lineHeight: 1.6, flex: 1}}>{m.body}</p>
                <div style={{
                  padding: '10px 12px', background: '#FFFFFF',
                  border: `1.5px solid ${C.ink}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{fontFamily: MONO, fontSize: 11, color: C.ink, letterSpacing: '0.04em'}}>{m.artifact}</span>
                  <Eyebrow color={C.faint}>artifact</Eyebrow>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    );
  };

  // ─── CATALOG — bento of 9 categories in vivid colors ───────
  const Catalog = () => {
    const [active, setActive] = React.useState(0);
    const cat = window.AxiusCatalog[active];
    const tones = ['coral', 'paper', 'lemon', 'blue', 'pink', 'paper', 'sage', 'cream', 'paper'];
    const spans = [
      { col: 'span 2', row: 'span 2' },
      { col: 'span 1', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
      { col: 'span 2', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
    ];
    return (
      <section data-screen-label="04 Catalog" style={{
        padding: `120px ${pad}px`, background: C.paper,
        borderTop: `2px solid ${C.ink}`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 56, gap: 60,
        }}>
          <div>
            <Eyebrow color={C.coral} style={{marginBottom: 18}}>§ 04 · Catalog</Eyebrow>
            <h2 style={{
              margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 104,
              letterSpacing: '-0.045em', lineHeight: 0.92,
            }}>
              An <span style={{
                fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.coral,
              }}>index</span><br/>
              of the work.
            </h2>
          </div>
          <Card tone="coral" style={{padding: '24px 32px', minWidth: 220}}>
            <div style={{
              fontFamily: DISPLAY, fontWeight: 800, fontSize: 96, color: '#FFFAF0',
              letterSpacing: '-0.05em', lineHeight: 0.9,
            }}>{window.AxiusCatalog.reduce((s, c) => s + c.count, 0)}</div>
            <Eyebrow color="rgba(255,250,240,0.85)" style={{marginTop: 8}}>
              workflows · {window.AxiusCatalog.length} categories
            </Eyebrow>
          </Card>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '200px', gap: 20,
        }}>
          {window.AxiusCatalog.map((c, i) => {
            const tone = tones[i];
            const onDark = tone === 'coral' || tone === 'blue' || tone === 'sage';
            const ink = onDark ? '#FFFAF0' : C.ink;
            const faint = onDark ? 'rgba(255,250,240,0.65)' : C.faint;
            const isActive = active === i;
            return (
              <Card key={c.id} tone={isActive ? 'dark' : tone}
                hover onClick={() => setActive(i)}
                style={{
                  padding: '22px 22px',
                  gridColumn: spans[i].col, gridRow: spans[i].row,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                  <Eyebrow color={isActive ? C.lemon : (onDark ? 'rgba(255,250,240,0.9)' : C.coral)}>
                    CAT.{String(i+1).padStart(2, '0')}
                  </Eyebrow>
                  <span style={{
                    fontFamily: MONO, fontSize: 11,
                    color: isActive ? 'rgba(255,250,240,0.7)' : faint,
                    letterSpacing: '0.04em',
                  }}>{c.count}</span>
                </div>
                <div>
                  <h3 style={{
                    margin: '0 0 8px', fontFamily: DISPLAY, fontWeight: 700,
                    fontSize: i === 0 ? 36 : 22,
                    letterSpacing: '-0.028em', lineHeight: 1.1,
                    color: isActive ? '#FFFAF0' : ink,
                  }}>{c.name}</h3>
                  <span style={{
                    fontFamily: MONO, fontSize: 10,
                    color: isActive ? 'rgba(255,250,240,0.6)' : faint,
                    letterSpacing: '0.04em',
                  }}>{c.stack}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* sample entries for active category */}
        <Card tone="white" style={{marginTop: 28}}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 22px', borderBottom: `2px solid ${C.ink}`,
            background: C.cream,
          }}>
            <Eyebrow color={C.coral}>{cat.name} — sample entries</Eyebrow>
            <Eyebrow color={C.faint}>{cat.samples.length} of {cat.count}</Eyebrow>
          </div>
          {cat.samples.map((s, i) => (
            <div key={s.n} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr 200px 80px 40px',
              gap: 20, padding: '18px 22px',
              borderBottom: i < cat.samples.length - 1 ? `1px solid ${C.line}` : 'none',
              alignItems: 'baseline',
            }}>
              <span style={{fontFamily: MONO, fontSize: 11, color: C.coral, letterSpacing: '0.06em', fontWeight: 600}}>{s.n}</span>
              <div>
                <div style={{fontFamily: DISPLAY, fontWeight: 600, fontSize: 17, color: C.ink, letterSpacing: '-0.012em'}}>{s.name}</div>
                <div style={{fontFamily: MONO, fontSize: 11, color: C.mute, letterSpacing: '0.04em', marginTop: 4}}>{s.sub}</div>
              </div>
              <Eyebrow color={C.faint}>build · {s.time}</Eyebrow>
              <span style={{fontFamily: MONO, fontSize: 12, color: C.coral, letterSpacing: '0.04em', textAlign: 'right', fontWeight: 600}}>{s.pts} pt{s.pts > 1 ? 's' : ''}</span>
              <span style={{fontFamily: MONO, fontSize: 16, color: C.coral, textAlign: 'right'}}>→</span>
            </div>
          ))}
        </Card>
      </section>
    );
  };

  // ─── COMPARISON — three sticker cards ──────────────────────
  const Comparison = () => (
    <section data-screen-label="05 Comparison" style={{
      padding: `120px ${pad}px`, borderTop: `2px solid ${C.ink}`,
    }}>
      <Eyebrow color={C.coral} style={{marginBottom: 18}}>§ 05 · Comparison</Eyebrow>
      <h2 style={{
        margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 112,
        letterSpacing: '-0.05em', lineHeight: 0.92, marginBottom: 64,
        maxWidth: 1100,
      }}>
        A different <span style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.coral,
        }}>shape</span> of help.
      </h2>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 20,
      }}>
        {[
          { tone: 'paper', kicker: 'Option 01', name: 'Freelancer',
            body: 'Patch by patch. One skill, no ownership. When something breaks, you find a new one. The work doesn\'t compound.',
            price: '$3.5k – $8k', sub: 'per month, variable' },
          { tone: 'paper', kicker: 'Option 02', name: 'In-house hire',
            body: 'One person, one skill, salaried. A four-month search. Out sick on the day the website breaks. Loyal, expensive, single-threaded.',
            price: '$10k – $14k', sub: 'per month + benefits' },
          { tone: 'coral', kicker: 'Option 03', name: 'Axius',
            body: 'Full stack, owned. One bill, month-to-month. Documented. Always reachable. The same hand on it month after month.',
            price: 'From $1,000', sub: 'per month · three tiers', featured: true },
        ].map((c, i) => {
          const onDark = c.tone === 'coral';
          const ink = onDark ? '#FFFAF0' : C.ink;
          const dim = onDark ? 'rgba(255,250,240,0.85)' : C.dim;
          const faint = onDark ? 'rgba(255,250,240,0.6)' : C.faint;
          return (
            <Card key={i} tone={c.tone} style={{padding: '32px 28px', minHeight: 440, display: 'flex', flexDirection: 'column', gap: 22}}>
              <Eyebrow color={faint}>{c.kicker}</Eyebrow>
              <h3 style={{
                margin: 0, fontFamily: DISPLAY, fontWeight: 800,
                fontSize: c.featured ? 56 : 40,
                letterSpacing: '-0.035em', lineHeight: 1, color: ink,
              }}>{c.name}</h3>
              <p style={{margin: 0, fontFamily: SANS, fontSize: 15, color: dim, lineHeight: 1.6, flex: 1}}>{c.body}</p>
              <div style={{
                paddingTop: 22,
                borderTop: `1.5px solid ${onDark ? 'rgba(255,250,240,0.3)' : C.line}`,
              }}>
                <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, color: ink, letterSpacing: '-0.025em'}}>{c.price}</div>
                <Eyebrow color={faint} style={{marginTop: 8}}>{c.sub}</Eyebrow>
              </div>
              {c.featured && <Sticker fill="lemon" size="sm" style={{alignSelf: 'flex-start'}}>Pick me</Sticker>}
            </Card>
          );
        })}
      </div>
    </section>
  );

  // ─── PRICING ───────────────────────────────────────────────
  const Pricing = () => (
    <section data-screen-label="06 Pricing" style={{
      padding: `120px ${pad}px`, background: C.lemon, color: C.ink,
      borderTop: `2px solid ${C.ink}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        marginBottom: 56, gap: 60,
      }}>
        <div>
          <Eyebrow color={C.ink} style={{marginBottom: 18}}>§ 06 · Pricing</Eyebrow>
          <h2 style={{
            margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 112,
            letterSpacing: '-0.05em', lineHeight: 0.92, maxWidth: 880,
          }}>
            Three sizes of<br/>
            <span style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.coral,
            }}>operating</span> layer.
          </h2>
        </div>
        <Chip color="ink">month-to-month after 90d</Chip>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1.1fr 1fr', gap: 20,
        alignItems: 'stretch',
      }}>
        {window.AxiusPricing.map((p, i) => {
          const featured = !!p.featured;
          const tone = featured ? 'coral' : 'paper';
          const ink = featured ? '#FFFAF0' : C.ink;
          const dim = featured ? 'rgba(255,250,240,0.85)' : C.dim;
          const faint = featured ? 'rgba(255,250,240,0.6)' : C.faint;
          return (
            <Card key={p.id} tone={tone} style={{
              padding: featured ? '40px 32px 32px' : '32px 28px 28px',
              display: 'flex', flexDirection: 'column', gap: 22,
              transform: featured ? 'translateY(-12px)' : 'translateY(0)',
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <Eyebrow color={faint}>TIER {String(i+1).padStart(2, '0')}</Eyebrow>
                {featured && (
                  <Sticker fill="lemon" size="sm" style={{boxShadow: `3px 3px 0 0 ${C.ink}`}}>most chosen</Sticker>
                )}
              </div>

              <h3 style={{
                margin: 0, fontFamily: DISPLAY, fontWeight: 800,
                fontSize: featured ? 56 : 44,
                letterSpacing: '-0.035em', lineHeight: 0.95, color: ink,
              }}>{p.name}.</h3>

              <p style={{margin: 0, fontFamily: SANS, fontSize: 14, color: dim, lineHeight: 1.55, minHeight: 60}}>{p.sub}</p>

              <div style={{
                paddingTop: 22,
                borderTop: `2px solid ${featured ? 'rgba(255,250,240,0.3)' : C.line}`,
                display: 'flex', alignItems: 'baseline', gap: 8,
              }}>
                <span style={{
                  fontFamily: DISPLAY, fontWeight: 800, fontSize: 64,
                  color: ink, letterSpacing: '-0.045em', lineHeight: 0.92,
                }}>${p.price.toLocaleString()}</span>
                <span style={{fontFamily: MONO, fontSize: 12, color: faint, letterSpacing: '0.08em', fontWeight: 600}}>/ mo</span>
              </div>
              <div style={{
                fontFamily: MONO, fontSize: 10, color: faint,
                letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: -10,
              }}>+ ${p.setup.toLocaleString()} setup · waived on close</div>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
                padding: '18px 0',
                borderTop: `1.5px solid ${featured ? 'rgba(255,250,240,0.2)' : C.line}`,
                borderBottom: `1.5px solid ${featured ? 'rgba(255,250,240,0.2)' : C.line}`,
              }}>
                {[
                  ['capacity', `${p.points} pts active`],
                  ['response', p.response],
                  ['cadence', p.cadence],
                  ['comms', p.comms],
                ].map(([k, v]) => (
                  <div key={k}>
                    <Eyebrow color={faint} style={{marginBottom: 4}}>{k}</Eyebrow>
                    <div style={{fontFamily: DISPLAY, fontSize: 14, fontWeight: 500, color: ink, letterSpacing: '-0.008em'}}>{v}</div>
                  </div>
                ))}
              </div>

              <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1}}>
                {p.features.map((f, j) => (
                  <li key={j} style={{display: 'flex', gap: 10, fontFamily: SANS, fontSize: 13, color: dim, lineHeight: 1.5}}>
                    <span style={{color: featured ? C.lemon : C.coral, fontFamily: MONO, fontWeight: 700}}>→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Sticker fill={featured ? 'paper' : 'coral'} size="md" style={{justifyContent: 'center'}}>
                Book a call
              </Sticker>
            </Card>
          );
        })}
      </div>

      {/* Founder Track */}
      <Card tone="white" style={{
        marginTop: 32, padding: '28px 32px',
        display: 'grid', gridTemplateColumns: '220px 1fr auto', gap: 32,
        alignItems: 'center',
      }}>
        <div>
          <Eyebrow color={C.blue}>Founder Track</Eyebrow>
          <div style={{
            marginTop: 8, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
            fontSize: 22, color: C.ink, letterSpacing: '-0.012em',
          }}>building, not running</div>
        </div>
        <p style={{margin: 0, fontFamily: SANS, fontSize: 14, color: C.dim, lineHeight: 1.65}}>
          Same retention, different framing. If you're shipping a product from scratch, the same point capacity goes toward one bigger build plus the workflows that surround it.{' '}
          <strong style={{color: C.ink, fontWeight: 600}}>Builder</strong> inside Equipo · MVP in 3–4 months. <strong style={{color: C.ink, fontWeight: 600}}>Partner</strong> inside Departamento · substantial product in 4–6 months.
        </p>
        <Sticker fill="blue" size="sm">Learn more</Sticker>
      </Card>
    </section>
  );

  // ─── FOUNDER — full bleed photo + cream poster panel ───────
  const Founder = () => (
    <section data-screen-label="07 Founder" style={{
      borderTop: `2px solid ${C.ink}`, background: C.bg,
      display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 680,
      position: 'relative',
    }}>
      <div style={{position: 'relative', overflow: 'hidden', borderRight: `2px solid ${C.ink}`}}>
        <img src={window.AxiusFounder.photo} alt="Andrés Toro" style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%',
        }}/>
        {/* coral chip floating */}
        <div style={{position: 'absolute', top: 24, left: 24}}>
          <Chip color="coral" style={{background: '#FFFAF0'}}>on duty · medellín</Chip>
        </div>
        {/* lemon nameplate sticker */}
        <Card tone="lemon" style={{
          position: 'absolute', bottom: 32, right: -32,
          padding: '20px 24px', maxWidth: 280,
        }}>
          <Eyebrow color={C.faint}>Profile · Operator 01</Eyebrow>
          <div style={{
            marginTop: 6, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
            fontSize: 40, color: C.ink, letterSpacing: '-0.018em', lineHeight: 1,
          }}>Andrés Toro</div>
        </Card>
      </div>

      <div style={{
        padding: '88px 80px', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', background: C.paper, position: 'relative',
      }}>
        <Eyebrow color={C.coral} style={{marginBottom: 18}}>§ 07 · The Operator</Eyebrow>
        <h2 style={{
          margin: '0 0 28px', fontFamily: DISPLAY, fontWeight: 800, fontSize: 64,
          letterSpacing: '-0.04em', lineHeight: 0.95,
        }}>
          The hand<br/>
          on <span style={{
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.coral,
          }}>your stack</span>.
        </h2>
        <p style={{margin: '0 0 28px', fontFamily: SANS, fontSize: 17, color: C.dim, lineHeight: 1.65, maxWidth: 480}}>
          {window.AxiusFounder.bio}
        </p>
        <Card tone="white" style={{padding: '24px 28px', maxWidth: 500}}>
          <p style={{
            margin: 0, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
            fontSize: 24, color: C.ink, lineHeight: 1.35, letterSpacing: '-0.012em',
          }}>
            "I won't make you the bottleneck in your own company."
          </p>
          <Eyebrow color={C.coral} style={{marginTop: 14}}>— A.T.</Eyebrow>
        </Card>
        <div style={{
          marginTop: 36, paddingTop: 24,
          borderTop: `1.5px solid ${C.line}`,
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18,
          maxWidth: 500,
        }}>
          {window.AxiusFounder.facts.map((f, i) => (
            <div key={i}>
              <Eyebrow color={C.faint}>{f.k}</Eyebrow>
              <div style={{marginTop: 4, fontFamily: DISPLAY, fontSize: 15, fontWeight: 500, color: C.ink, letterSpacing: '-0.005em'}}>{f.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ─── FIELD NOTES — six poster cards ────────────────────────
  const fieldNotes = [
    { n: '01', title: 'Stacks accumulate. They do not arrive.', body: 'No founder ever sat down and chose their stack — it accumulates, one optimistic purchase at a time, until what runs the business is whichever consultant was loudest.', tone: 'coral' },
    { n: '02', title: 'The right SaaS is the cheaper build.',   body: 'Custom software is the expensive default. Most of the time, somebody already built what you need — better tested, better integrated, rented for less than a coffee budget.', tone: 'blue' },
    { n: '03', title: 'Onboarding is the engagement.',          body: 'Most retainer relationships are lost in the first thirty days, not the twelfth. The shape of the onboarding is the shape of the entire engagement.', tone: 'lemon' },
    { n: '04', title: 'Cancellations precede churn by 90 days.', body: 'By the time a customer cancels, the decision is months old. The signal was present in their behavior long before the email arrived.', tone: 'pink' },
    { n: '05', title: 'What you measure, you find.',            body: 'Reporting infrastructure determines what a company knows about itself. A business that ships a weekly dashboard finds different problems than one that doesn\'t.', tone: 'paper' },
    { n: '06', title: 'AI saves the operator, not the customer.', body: 'Almost every useful AI deployment we ship saves time inside the company, not for the customer. The customer-facing chatbot is almost never the most useful application.', tone: 'sage' },
  ];

  const FieldNotes = () => (
    <section data-screen-label="08 Field Notes" style={{
      padding: `120px ${pad}px`, background: C.bg,
      borderTop: `2px solid ${C.ink}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        marginBottom: 56, gap: 60,
      }}>
        <div>
          <Eyebrow color={C.coral} style={{marginBottom: 18}}>§ 08 · Field Notes</Eyebrow>
          <h2 style={{
            margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 96,
            letterSpacing: '-0.045em', lineHeight: 0.92, maxWidth: 1000,
          }}>
            Six <span style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.blue,
            }}>field notes</span> from<br/>
            running technology inside<br/>
            small businesses.
          </h2>
        </div>
        <p style={{margin: 0, maxWidth: 280, fontFamily: SANS, fontSize: 14, color: C.dim, lineHeight: 1.55}}>
          Full essays published quarterly. Updated as observation accumulates.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
      }}>
        {fieldNotes.map((n) => {
          const onDark = n.tone === 'coral' || n.tone === 'blue' || n.tone === 'sage';
          const ink = onDark ? '#FFFAF0' : C.ink;
          const dim = onDark ? 'rgba(255,250,240,0.85)' : C.dim;
          const faint = onDark ? 'rgba(255,250,240,0.6)' : C.faint;
          return (
            <Card key={n.n} tone={n.tone} style={{padding: '28px 24px', minHeight: 320, display: 'flex', flexDirection: 'column', gap: 18}}>
              <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                <span style={{
                  fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
                  fontSize: 36, color: ink, lineHeight: 1,
                }}>№ {n.n}</span>
                <Eyebrow color={faint}>field note</Eyebrow>
              </div>
              <h3 style={{
                margin: 0, fontFamily: DISPLAY, fontWeight: 700, fontSize: 24,
                letterSpacing: '-0.025em', lineHeight: 1.15, color: ink,
              }}>{n.title}</h3>
              <p style={{margin: 0, fontFamily: SANS, fontSize: 14, color: dim, lineHeight: 1.65, flex: 1}}>{n.body}</p>
              <a href="#" style={{
                fontFamily: MONO, fontSize: 11, fontWeight: 600, color: onDark ? C.lemon : C.coral,
                letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
              }}>Read in full →</a>
            </Card>
          );
        })}
      </div>
    </section>
  );

  // ─── FAQ ───────────────────────────────────────────────────
  const FAQ = () => {
    const [open, setOpen] = React.useState(0);
    return (
      <section data-screen-label="09 FAQ" style={{
        padding: `120px ${pad}px`, borderTop: `2px solid ${C.ink}`,
      }}>
        <Eyebrow color={C.coral} style={{marginBottom: 18}}>§ 09 · Appendix</Eyebrow>
        <h2 style={{
          margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 104,
          letterSpacing: '-0.045em', lineHeight: 0.92, marginBottom: 56, maxWidth: 1000,
        }}>
          Questions, <span style={{
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.coral,
          }}>asked plainly</span>.
        </h2>

        <div style={{
          border: `2px solid ${C.ink}`, background: C.paper,
          boxShadow: `6px 6px 0 0 ${C.ink}`,
        }}>
          {window.AxiusFAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                borderBottom: i < window.AxiusFAQ.length - 1 ? `2px solid ${C.ink}` : 'none',
                background: isOpen ? C.cream : C.paper,
                transition: 'background .15s ease',
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  all: 'unset', cursor: 'pointer', width: '100%',
                  display: 'grid', gridTemplateColumns: '70px 1fr 80px',
                  gap: 20, padding: '26px 28px', alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: MONO, fontSize: 12, fontWeight: 600, color: C.coral,
                    letterSpacing: '0.18em',
                  }}>Q.{String(i+1).padStart(2, '0')}</span>
                  <span style={{
                    fontFamily: DISPLAY, fontWeight: 600, fontSize: 22,
                    color: C.ink, letterSpacing: '-0.02em', lineHeight: 1.3,
                  }}>{f.q}</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 36, height: 36, marginLeft: 'auto',
                    background: isOpen ? C.ink : C.coral, color: '#FFFAF0',
                    border: `2px solid ${C.ink}`,
                    fontFamily: MONO, fontSize: 18, fontWeight: 700,
                    transition: 'transform .15s ease, background .15s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </button>
                {isOpen && (
                  <div style={{
                    display: 'grid', gridTemplateColumns: '70px 1fr 80px',
                    gap: 20, padding: '0 28px 28px',
                  }}>
                    <span/>
                    <p style={{
                      margin: 0, fontFamily: SANS, fontSize: 15, color: C.dim, lineHeight: 1.7,
                      maxWidth: 720,
                    }}>{f.a}</p>
                    <span/>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // ─── CTA — full bleed CORAL ────────────────────────────────
  const CTA = () => (
    <section data-screen-label="10 CTA" style={{
      padding: `132px ${pad}px 100px`, background: C.coral, color: '#FFFAF0',
      borderTop: `2px solid ${C.ink}`, position: 'relative', overflow: 'hidden',
      textAlign: 'center',
    }}>
      {/* lemon decoration */}
      <div aria-hidden style={{
        position: 'absolute', top: -160, left: -160,
        width: 480, height: 480, borderRadius: '50%',
        background: C.lemon, border: `4px solid ${C.ink}`,
      }}/>
      {/* blue decoration */}
      <div aria-hidden style={{
        position: 'absolute', bottom: -120, right: -120,
        width: 360, height: 360, borderRadius: '50%',
        background: C.blue, border: `4px solid ${C.ink}`,
      }}/>

      <div style={{position: 'relative', zIndex: 2}}>
        <Eyebrow color="rgba(255,250,240,0.85)" style={{marginBottom: 28}}>— Begin —</Eyebrow>
        <h2 style={{
          margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 224,
          letterSpacing: '-0.06em', lineHeight: 0.86, color: '#FFFAF0',
        }}>
          Let's<br/>
          <span style={{
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: C.lemon,
          }}>go</span>.
        </h2>

        <p style={{
          margin: '40px auto 0', maxWidth: 540,
          fontFamily: SANS, fontSize: 19, color: 'rgba(255,250,240,0.9)', lineHeight: 1.55,
        }}>
          Thirty minutes. You leave with a one-page audit either way.
        </p>

        <div style={{display: 'flex', gap: 16, justifyContent: 'center', marginTop: 48}}>
          <Sticker fill="paper" size="xl">Book a discovery call</Sticker>
          <Sticker fill="dark" size="xl">andres@axius.tech</Sticker>
        </div>

        <div style={{
          marginTop: 96, paddingTop: 24,
          borderTop: `2px solid rgba(255,250,240,0.25)`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <Wordmark size={20} color="#FFFAF0"/>
          <div style={{
            display: 'flex', gap: 24, alignItems: 'center',
            fontFamily: MONO, fontSize: 10, color: 'rgba(255,250,240,0.65)',
            letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
          }}>
            <span>axius.tech</span>
            <span style={{color: C.lemon}}>·</span>
            <span>medellín · remote</span>
            <span style={{color: C.lemon}}>·</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div style={{
      background: C.bg, color: C.ink, fontFamily: SANS,
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

// ============================================================
// AXIUS · DIRECTION C — STUDIO (MODERN MODULAR)
// Same brand, more dynamic stance. Modular bento layouts,
// inverted accent blocks, sage as a secondary accent alongside
// copper. No gradients, no shadows, no AI-startup tropes.
// ============================================================

window.AxiusDirectionC = function ({ wordmark = 'C' }) {
  const T = window.AxiusTokens;
  const { AxiusBtn, AxiusWordmark, AxiusDot } = window;

  const FONT = T.fontDisplay;
  const MONO = T.fontMono;

  // Brand-coherent secondary palette. Sage is already in the tokens as
  // `stateGreen` (#7A9272) — we just promote it to editorial use here.
  const SAGE = T.stateGreen;
  const SAGE_FAINT = 'rgba(122,146,114,0.15)';
  const SAGE_INK = '#0F1A0E';
  const BRASS = T.brass || '#C49B5E';

  const pad = 80;
  const colGap = 24;

  // ─── Reusable bits ─────────────────────────────────────────

  // Section eyebrow row — copper id + label
  const SectionMark = ({ id, label, status, statusColor }) => (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      paddingBottom: 16, marginBottom: 56,
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{display: 'inline-flex', alignItems: 'baseline', gap: 14}}>
        <span style={{
          fontFamily: MONO, fontSize: 11, color: T.copper,
          letterSpacing: '0.22em', textTransform: 'uppercase',
        }}>§ {id}</span>
        <span style={{
          fontFamily: MONO, fontSize: 11, color: T.ink,
          letterSpacing: '0.22em', textTransform: 'uppercase',
        }}>{label}</span>
      </div>
      {status && (
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          fontFamily: MONO, fontSize: 10, color: T.inkMute,
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          <AxiusDot color={statusColor || SAGE}/>{status}
        </span>
      )}
    </div>
  );

  // Modular block — varying tone (default / copper / sage / cream)
  const Block = ({ tone = 'default', children, style = {}, hover, onClick }) => {
    const tones = {
      default: {bg: 'transparent', ink: T.ink, border: T.border},
      surface: {bg: T.surface, ink: T.ink, border: T.border},
      copper:  {bg: T.copper, ink: '#1A1207', border: T.copper},
      sage:    {bg: SAGE, ink: SAGE_INK, border: SAGE},
      cream:   {bg: '#E9E1CF', ink: '#1A1207', border: '#E9E1CF'},
    };
    const t = tones[tone] || tones.default;
    return (
      <div onClick={onClick} style={{
        border: `1px solid ${t.border}`,
        background: t.bg, color: t.ink,
        transition: 'transform .2s ease, border-color .2s ease, background .2s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={hover ? (e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        if (tone === 'default' || tone === 'surface') {
          e.currentTarget.style.borderColor = T.copper;
        }
      } : undefined}
      onMouseLeave={hover ? (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = t.border;
      } : undefined}>
        {children}
      </div>
    );
  };

  // Tone-aware micro labels
  const Eyebrow = ({ children, tone, style = {} }) => {
    const colors = {
      default: T.inkMute,
      copper: T.copper,
      sage: SAGE,
      onCopper: 'rgba(26,18,7,0.65)',
      onSage: 'rgba(15,26,14,0.65)',
      faint: T.inkFaint,
    };
    return (
      <div style={{
        fontFamily: MONO, fontSize: 10, fontWeight: 500,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: colors[tone] || colors.default,
        ...style,
      }}>{children}</div>
    );
  };

  // ─── NAV ───────────────────────────────────────────────────
  const Nav = () => (
    <nav style={{
      display: 'grid', gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center', gap: 36,
      padding: `22px ${pad}px`,
      borderBottom: `1px solid ${T.border}`,
      background: T.bg, position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 16}}>
        <AxiusWordmark variant={wordmark} size={22}/>
        <span style={{
          paddingLeft: 16, borderLeft: `1px solid ${T.borderLo}`,
          fontFamily: MONO, fontSize: 10, color: T.inkFaint,
          letterSpacing: '0.22em', textTransform: 'uppercase',
        }}>studio · 2026</span>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 32}}>
        {['Work', 'Method', 'Catalog', 'Pricing', 'Notes'].map((n, i) => (
          <span key={n} style={{
            fontFamily: MONO, fontSize: 11,
            color: i === 0 ? T.ink : T.inkDim,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'color .15s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = T.copper}
          onMouseLeave={(e) => e.currentTarget.style.color = i === 0 ? T.ink : T.inkDim}>
            {n}
          </span>
        ))}
      </div>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 14}}>
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '6px 12px',
          border: `1px solid ${T.borderLo}`,
          fontFamily: MONO, fontSize: 10, color: T.inkDim,
          letterSpacing: '0.16em', textTransform: 'uppercase',
        }}>
          <AxiusDot color={SAGE}/>on duty
        </span>
        <AxiusBtn copper size="sm">Book a call</AxiusBtn>
      </div>
    </nav>
  );

  // ─── HERO — bento split: title left · sage stat block right
  const Hero = () => (
    <header data-screen-label="00 Hero" style={{
      padding: `64px ${pad}px 72px`,
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: colGap,
      }}>
        {/* Title cell */}
        <div style={{padding: '20px 8px 4px'}}>
          <Eyebrow tone="copper">// the operating layer for small business tech</Eyebrow>
          <h1 style={{
            margin: '36px 0 0', fontFamily: FONT, fontWeight: 800,
            fontSize: 112, lineHeight: 0.92, letterSpacing: '-0.05em',
          }}>
            Run<br/>
            your business.<br/>
            <span style={{color: T.inkMute}}>Not your tech.</span>
          </h1>
        </div>

        {/* Sage stat block */}
        <Block tone="sage" style={{
          padding: '40px 40px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: 480,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          }}>
            <Eyebrow tone="onSage">Operations snapshot</Eyebrow>
            <Eyebrow tone="onSage">05:18 GMT-5</Eyebrow>
          </div>
          <div>
            <div style={{
              fontFamily: FONT, fontWeight: 800, fontSize: 152,
              letterSpacing: '-0.055em', lineHeight: 0.85, color: SAGE_INK,
            }}>129</div>
            <div style={{
              fontFamily: FONT, fontSize: 18, fontWeight: 500,
              color: SAGE_INK, letterSpacing: '-0.008em', marginTop: 14,
              opacity: 0.85,
            }}>workflows operated across nine categories — websites, automations, integrations, AI, data, content production.</div>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
            paddingTop: 24, borderTop: `1px solid rgba(15,26,14,0.18)`,
          }}>
            {[
              ['max response', '24h'],
              ['starts at', '$1k/mo'],
              ['client cap', '3 / mo'],
            ].map(([k, v]) => (
              <div key={k}>
                <Eyebrow tone="onSage" style={{marginBottom: 6}}>{k}</Eyebrow>
                <div style={{
                  fontFamily: FONT, fontWeight: 700, fontSize: 22, color: SAGE_INK,
                  letterSpacing: '-0.015em',
                }}>{v}</div>
              </div>
            ))}
          </div>
        </Block>
      </div>

      {/* CTA row */}
      <div style={{
        marginTop: 48, display: 'grid',
        gridTemplateColumns: '1fr auto', gap: 56,
        alignItems: 'flex-end', paddingTop: 36,
        borderTop: `1px solid ${T.border}`,
      }}>
        <p style={{
          margin: 0, maxWidth: 600,
          fontSize: 19, color: T.inkDim, lineHeight: 1.5,
          letterSpacing: '-0.003em',
        }}>
          We run the tech side of your business — websites, automations, AI tools, integrations,
          all of it — for one monthly fee. <span style={{color: T.ink}}>The team you'd hire if you knew where to look.</span>
        </p>
        <div style={{display: 'flex', gap: 12}}>
          <AxiusBtn copper size="lg">Book a discovery call</AxiusBtn>
          <AxiusBtn size="lg">See the catalog</AxiusBtn>
        </div>
      </div>
    </header>
  );

  // ─── 01 · COMMITMENTS — bento row with one inverted accent
  const Commitments = () => (
    <section data-screen-label="01 Commitments" style={{padding: `104px ${pad}px`}}>
      <SectionMark id="01" label="Commitments" status="default · always"/>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        gap: 60, marginBottom: 56,
      }}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
          letterSpacing: '-0.04em', lineHeight: 0.98, maxWidth: 760,
        }}>
          Five things we<br/>
          <span style={{color: T.copper}}>always</span> do.
        </h2>
        <p style={{
          margin: 0, maxWidth: 320, fontSize: 14, color: T.inkMute, lineHeight: 1.6,
        }}>
          Defaults that apply on every retainer, every tier — not just the kickoff slide.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: colGap,
      }}>
        {window.AxiusCommitments.map((c, i) => {
          const featured = i === 2; // "A fraction of the cost" — the one the buyer cares most about
          return (
            <Block key={c.n} tone={featured ? 'copper' : 'surface'} hover
              style={{
                padding: '28px 24px 28px',
                display: 'flex', flexDirection: 'column', gap: 18,
                minHeight: 360,
              }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              }}>
                <span style={{
                  fontFamily: FONT, fontWeight: 800, fontSize: 44,
                  letterSpacing: '-0.04em', lineHeight: 1,
                  color: featured ? '#1A1207' : T.copper,
                }}>{c.n}</span>
                <Eyebrow tone={featured ? 'onCopper' : 'faint'}>C.0{i+1}</Eyebrow>
              </div>
              <h3 style={{
                margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 22,
                letterSpacing: '-0.022em', lineHeight: 1.15,
                color: featured ? '#1A1207' : T.ink,
              }}>{c.title}</h3>
              <p style={{
                margin: 0, fontSize: 13, lineHeight: 1.6, flex: 1,
                color: featured ? 'rgba(26,18,7,0.78)' : T.inkDim,
              }}>{c.body}</p>
              <div style={{
                paddingTop: 16,
                borderTop: featured ? '1px solid rgba(26,18,7,0.2)' : `1px solid ${T.borderLo}`,
              }}>
                <Eyebrow tone={featured ? 'onCopper' : 'faint'} style={{marginBottom: 6}}>
                  {c.metric.label}
                </Eyebrow>
                <div style={{
                  fontFamily: FONT, fontWeight: 700, fontSize: 20,
                  letterSpacing: '-0.012em',
                  color: featured ? '#1A1207' : T.copper,
                }}>{c.metric.value}</div>
              </div>
            </Block>
          );
        })}
      </div>
    </section>
  );

  // ─── 02 · PAIN — split with sage answer block
  const Mess = () => (
    <section data-screen-label="02 Mess" style={{
      padding: `104px ${pad}px`,
      background: T.surface, borderTop: `1px solid ${T.border}`,
    }}>
      <SectionMark id="02" label="Diagnostic" status="most-asked"/>

      <div style={{
        display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: colGap,
        alignItems: 'stretch',
      }}>
        <div style={{padding: '12px 8px 0'}}>
          <h2 style={{
            margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
            letterSpacing: '-0.04em', lineHeight: 0.98,
          }}>
            You started this to<br/>
            <span style={{color: T.copper}}>build a business</span>,<br/>
            not maintain a stack.
          </h2>
          <p style={{
            margin: '32px 0 0', fontSize: 16, color: T.inkDim, lineHeight: 1.65,
            maxWidth: 520, letterSpacing: '-0.003em',
          }}>
            Most operators we meet are running their tech function by accident.
            Five contractors. Three Slack threads. A website that breaks on Friday afternoon —
            and nobody owning the whole thing.
          </p>

          {/* symptoms list */}
          <div style={{
            marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
            maxWidth: 560,
          }}>
            {[
              'Five contractors. Three threads.',
              'Website breaks Friday. No one to call.',
              'CRM never wired to the calendar.',
              '"AI thing" still doesn\'t quite work.',
              'Tools sit in tabs nobody opens.',
              'Work doesn\'t compound. Cycle restarts.',
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 10,
                padding: '10px 0', borderBottom: `1px solid ${T.borderLo}`,
                fontFamily: FONT, fontSize: 13, color: T.inkDim,
                letterSpacing: '-0.003em',
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 10, color: T.inkFaint,
                  letterSpacing: '0.14em',
                }}>{String(i+1).padStart(2, '0')}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* sage answer card */}
        <Block tone="sage" style={{
          padding: '40px 40px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: 480,
        }}>
          <div>
            <Eyebrow tone="onSage">The move</Eyebrow>
            <h3 style={{
              margin: '20px 0 0', fontFamily: FONT, fontWeight: 700, fontSize: 38,
              letterSpacing: '-0.028em', lineHeight: 1.05, color: SAGE_INK,
            }}>
              Axius is one operator who <em style={{fontStyle: 'normal', textDecoration: 'underline', textDecorationThickness: 2, textUnderlineOffset: 6, textDecorationColor: T.copper}}>owns it</em>.
            </h3>
          </div>
          <p style={{
            margin: 0, fontSize: 16, color: 'rgba(15,26,14,0.85)', lineHeight: 1.65,
            letterSpacing: '-0.003em',
          }}>
            One team. One bill. One inbox. The stack is documented. The tickets are routed.
            The roadmap is written down. The work compounds because the same hand is on it
            month over month.
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
            paddingTop: 24, borderTop: `1px solid rgba(15,26,14,0.2)`,
          }}>
            <div>
              <Eyebrow tone="onSage" style={{marginBottom: 6}}>Status</Eyebrow>
              <div style={{
                fontFamily: FONT, fontWeight: 700, fontSize: 17, color: SAGE_INK,
                letterSpacing: '-0.012em',
              }}>One owner</div>
            </div>
            <div>
              <Eyebrow tone="onSage" style={{marginBottom: 6}}>Cadence</Eyebrow>
              <div style={{
                fontFamily: FONT, fontWeight: 700, fontSize: 17, color: SAGE_INK,
                letterSpacing: '-0.012em',
              }}>Monthly + Q</div>
            </div>
          </div>
        </Block>
      </div>
    </section>
  );

  // ─── 03 · METHODOLOGY — horizontal pipeline with color badges
  const Method = () => (
    <section data-screen-label="03 Method" style={{padding: `104px ${pad}px`}}>
      <SectionMark id="03" label="Method" status="audit → configure → operate → evolve"/>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        gap: 60, marginBottom: 56,
      }}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
          letterSpacing: '-0.04em', lineHeight: 0.98, maxWidth: 720,
        }}>
          Four stages.<br/>
          Each one <span style={{color: SAGE}}>named</span>. Each one delivered.
        </h2>
        <p style={{
          margin: 0, maxWidth: 280, fontSize: 14, color: T.inkMute, lineHeight: 1.6,
        }}>
          One pipeline, four checkpoints. Each produces a written artifact you own.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: colGap,
      }}>
        {window.AxiusMethodology.map((m, i) => {
          const colors = [T.copper, SAGE, BRASS, T.copper];
          const bg = colors[i];
          return (
            <Block key={m.n} tone="surface" hover style={{
              padding: '32px 28px 28px',
              display: 'flex', flexDirection: 'column', gap: 22,
              minHeight: 360,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: bg, color: '#1A1207',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT, fontWeight: 700, fontSize: 22,
                letterSpacing: '-0.02em',
              }}>{m.n}</div>
              <div>
                <Eyebrow tone="faint" style={{marginBottom: 8}}>Stage {m.n} · {m.timing}</Eyebrow>
                <h3 style={{
                  margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 28,
                  letterSpacing: '-0.024em', lineHeight: 1.05,
                }}>{m.name}.</h3>
              </div>
              <p style={{
                margin: 0, fontSize: 13, color: T.inkDim, lineHeight: 1.6, flex: 1,
              }}>{m.body}</p>
              <div style={{
                padding: '10px 12px',
                border: `1px solid ${T.borderLo}`, background: T.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 11, color: T.copperSoft,
                  letterSpacing: '0.04em',
                }}>{m.artifact}</span>
                <Eyebrow tone="faint">artifact</Eyebrow>
              </div>
            </Block>
          );
        })}
      </div>
    </section>
  );

  // ─── 04 · CATALOG — bento of 9 categories, varied sizes
  const Catalog = () => {
    const [active, setActive] = React.useState(0);
    const cat = window.AxiusCatalog[active];

    // Bento sizing: 3 columns, varied vertical span — first cell is larger.
    const spans = [
      { col: 'span 2', row: 'span 2' }, // big
      { col: 'span 1', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
      { col: 'span 2', row: 'span 1' }, // wide
      { col: 'span 1', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
      { col: 'span 1', row: 'span 1' },
    ];

    return (
      <section data-screen-label="04 Catalog" style={{
        padding: `104px ${pad}px`,
        background: T.surface, borderTop: `1px solid ${T.border}`,
      }}>
        <SectionMark id="04" label="Catalog" status={`${window.AxiusCatalog.reduce((s,c)=>s+c.count,0)} workflows · ${window.AxiusCatalog.length} categories`}/>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          gap: 60, marginBottom: 56,
        }}>
          <h2 style={{
            margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
            letterSpacing: '-0.04em', lineHeight: 0.98, maxWidth: 700,
          }}>
            An <span style={{color: T.copper}}>index</span><br/>of the work.
          </h2>
          <div style={{textAlign: 'right'}}>
            <div style={{
              fontFamily: FONT, fontWeight: 800, fontSize: 96, color: T.copper,
              letterSpacing: '-0.04em', lineHeight: 0.9,
            }}>{window.AxiusCatalog.reduce((s,c)=>s+c.count,0)}</div>
            <Eyebrow tone="faint" style={{marginTop: 8}}>
              workflows · {window.AxiusCatalog.length} categories
            </Eyebrow>
          </div>
        </div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '180px',
          gap: colGap,
        }}>
          {window.AxiusCatalog.map((c, i) => {
            const isActive = active === i;
            return (
              <Block
                key={c.id}
                tone={isActive ? 'copper' : 'default'}
                hover
                onClick={() => setActive(i)}
                style={{
                  padding: '22px 22px',
                  gridColumn: spans[i].col,
                  gridRow: spans[i].row,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                }}>
                  <Eyebrow tone={isActive ? 'onCopper' : 'copper'}>
                    CAT.{String(i+1).padStart(2, '0')}
                  </Eyebrow>
                  <span style={{
                    fontFamily: MONO, fontSize: 11,
                    color: isActive ? 'rgba(26,18,7,0.7)' : T.inkMute,
                    letterSpacing: '0.04em',
                  }}>{c.count}</span>
                </div>
                <div>
                  <h3 style={{
                    margin: '0 0 10px', fontFamily: FONT, fontWeight: 700,
                    fontSize: i === 0 ? 32 : 20,
                    letterSpacing: '-0.022em', lineHeight: 1.1,
                    color: isActive ? '#1A1207' : T.ink,
                  }}>{c.name}</h3>
                  <span style={{
                    fontFamily: MONO, fontSize: 10,
                    color: isActive ? 'rgba(26,18,7,0.65)' : T.inkFaint,
                    letterSpacing: '0.04em',
                  }}>{c.stack}</span>
                </div>
              </Block>
            );
          })}
        </div>

        {/* sample entries panel for active category */}
        <div style={{
          marginTop: 32, border: `1px solid ${T.border}`, background: T.bg,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 22px', borderBottom: `1px solid ${T.border}`,
          }}>
            <Eyebrow tone="copper">{cat.name} — sample entries</Eyebrow>
            <Eyebrow tone="faint">{cat.samples.length} of {cat.count}</Eyebrow>
          </div>
          {cat.samples.map((s, i) => (
            <div key={s.n} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr 200px 80px 40px',
              gap: 20, padding: '18px 22px',
              borderBottom: i < cat.samples.length - 1 ? `1px solid ${T.borderLo}` : 'none',
              alignItems: 'baseline',
            }}>
              <span style={{fontFamily: MONO, fontSize: 11, color: T.copper, letterSpacing: '0.06em'}}>{s.n}</span>
              <div>
                <div style={{fontFamily: FONT, fontWeight: 500, fontSize: 16, color: T.ink, letterSpacing: '-0.008em'}}>{s.name}</div>
                <div style={{fontFamily: MONO, fontSize: 11, color: T.inkMute, letterSpacing: '0.04em', marginTop: 4}}>{s.sub}</div>
              </div>
              <Eyebrow tone="faint">build · {s.time}</Eyebrow>
              <span style={{fontFamily: MONO, fontSize: 12, color: T.copperSoft, letterSpacing: '0.04em', textAlign: 'right'}}>{s.pts} pt{s.pts > 1 ? 's' : ''}</span>
              <span style={{fontFamily: MONO, fontSize: 14, color: T.copper, textAlign: 'right'}}>→</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // ─── 05 · COMPARISON — three cards, axius inverted
  const Comparison = () => (
    <section data-screen-label="05 Comparison" style={{padding: `104px ${pad}px`}}>
      <SectionMark id="05" label="Comparison" status="freelancer · hire · axius"/>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        gap: 60, marginBottom: 56,
      }}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
          letterSpacing: '-0.04em', lineHeight: 0.98,
        }}>
          A different<br/>
          <span style={{color: T.copper}}>shape</span> of help.
        </h2>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: colGap,
      }}>
        {[
          { tone: 'surface', kicker: 'Option 01', name: 'Freelancer',
            body: 'Patch by patch. One skill, no ownership. When something breaks, you find a new one. The work doesn\'t compound.',
            price: '$3.5k – $8k', sub: 'per month, variable' },
          { tone: 'surface', kicker: 'Option 02', name: 'In-house hire',
            body: 'One person, one skill, salaried. A four-month search. Out sick on the day the website breaks. Loyal, expensive, single-threaded.',
            price: '$10k – $14k', sub: 'per month + benefits' },
          { tone: 'copper', kicker: 'Option 03', name: 'Axius',
            body: 'Full stack, owned. One bill, month-to-month. Documented. Always reachable. The same hand on it month after month.',
            price: 'From $1,000', sub: 'per month · three tiers', featured: true },
        ].map((c, i) => (
          <Block key={i} tone={c.tone} hover style={{
            padding: '32px 28px 28px',
            display: 'flex', flexDirection: 'column', gap: 22, minHeight: 380,
          }}>
            <Eyebrow tone={c.featured ? 'onCopper' : 'faint'}>{c.kicker}</Eyebrow>
            <h3 style={{
              margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 36,
              letterSpacing: '-0.028em', lineHeight: 1,
              color: c.featured ? '#1A1207' : T.ink,
            }}>{c.name}</h3>
            <p style={{
              margin: 0, fontSize: 14, lineHeight: 1.6, flex: 1,
              color: c.featured ? 'rgba(26,18,7,0.78)' : T.inkDim,
              letterSpacing: '-0.003em',
            }}>{c.body}</p>
            <div style={{
              paddingTop: 20,
              borderTop: c.featured ? '1px solid rgba(26,18,7,0.2)' : `1px solid ${T.borderLo}`,
            }}>
              <div style={{
                fontFamily: FONT, fontWeight: 700, fontSize: 26,
                letterSpacing: '-0.02em',
                color: c.featured ? '#1A1207' : T.ink,
              }}>{c.price}</div>
              <Eyebrow tone={c.featured ? 'onCopper' : 'faint'} style={{marginTop: 6}}>
                {c.sub}
              </Eyebrow>
            </div>
          </Block>
        ))}
      </div>
    </section>
  );

  // ─── 06 · PRICING — three cards, featured tier fully inverted copper
  const Pricing = () => (
    <section data-screen-label="06 Pricing" style={{
      padding: `104px ${pad}px`,
      background: T.surface, borderTop: `1px solid ${T.border}`,
    }}>
      <SectionMark id="06" label="Pricing" status="month-to-month after 90d"/>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        gap: 60, marginBottom: 56,
      }}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
          letterSpacing: '-0.04em', lineHeight: 0.98, maxWidth: 680,
        }}>
          Three sizes of<br/>
          <span style={{color: T.copper}}>operating</span> layer.
        </h2>
        <p style={{
          margin: 0, maxWidth: 320, fontSize: 14, color: T.inkMute, lineHeight: 1.6,
        }}>
          Capacity measured in points — each workflow's cost is listed in the catalog.
          Setup waived on same-day close.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1.1fr 1fr', gap: colGap,
        alignItems: 'stretch',
      }}>
        {window.AxiusPricing.map((p, i) => {
          const inv = !!p.featured;
          const ink = inv ? '#1A1207' : T.ink;
          const dim = inv ? 'rgba(26,18,7,0.78)' : T.inkDim;
          const faint = inv ? 'rgba(26,18,7,0.55)' : T.inkFaint;
          const border = inv ? 'rgba(26,18,7,0.2)' : T.border;
          return (
            <Block key={p.id} tone={inv ? 'copper' : 'default'} hover style={{
              padding: inv ? '40px 32px 32px' : '32px 28px 28px',
              display: 'flex', flexDirection: 'column', gap: 22,
              transform: inv ? 'translateY(-8px)' : 'translateY(0)',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              }}>
                <Eyebrow tone={inv ? 'onCopper' : 'copper'}>
                  TIER {String(i+1).padStart(2, '0')}
                </Eyebrow>
                {inv && (
                  <span style={{
                    fontFamily: MONO, fontSize: 10, color: '#1A1207',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    border: `1px solid rgba(26,18,7,0.3)`, padding: '4px 8px',
                  }}>most chosen</span>
                )}
              </div>

              <h3 style={{
                margin: 0, fontFamily: FONT, fontWeight: 800,
                fontSize: inv ? 48 : 40,
                letterSpacing: '-0.032em', lineHeight: 0.95, color: ink,
              }}>{p.name}.</h3>

              <p style={{
                margin: 0, fontSize: 13, lineHeight: 1.55, color: dim,
                minHeight: 70,
              }}>{p.sub}</p>

              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 8,
                paddingTop: 20, borderTop: `1px solid ${border}`,
              }}>
                <span style={{
                  fontFamily: FONT, fontWeight: 800, fontSize: 56,
                  color: ink, letterSpacing: '-0.04em', lineHeight: 0.92,
                }}>${p.price.toLocaleString()}</span>
                <span style={{
                  fontFamily: MONO, fontSize: 11, color: faint,
                  letterSpacing: '0.08em',
                }}>/ mo</span>
              </div>
              <div style={{
                fontFamily: MONO, fontSize: 10, color: faint,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                marginTop: -10,
              }}>+ ${p.setup.toLocaleString()} setup · waived on close</div>

              {/* capacity grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
                padding: '18px 0', borderTop: `1px solid ${inv ? 'rgba(26,18,7,0.15)' : T.borderLo}`,
                borderBottom: `1px solid ${inv ? 'rgba(26,18,7,0.15)' : T.borderLo}`,
              }}>
                {[
                  ['capacity', `${p.points} pts active`],
                  ['response', p.response],
                  ['cadence', p.cadence],
                  ['comms', p.comms],
                ].map(([k, v]) => (
                  <div key={k}>
                    <Eyebrow tone={inv ? 'onCopper' : 'faint'} style={{marginBottom: 4}}>{k}</Eyebrow>
                    <div style={{
                      fontFamily: FONT, fontSize: 13, color: ink, letterSpacing: '-0.005em',
                    }}>{v}</div>
                  </div>
                ))}
              </div>

              <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1}}>
                {p.features.map((f, j) => (
                  <li key={j} style={{
                    display: 'flex', gap: 10, fontSize: 13, lineHeight: 1.5,
                    color: dim, letterSpacing: '-0.003em',
                  }}>
                    <span style={{color: inv ? '#1A1207' : T.copper, fontFamily: MONO}}>→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <AxiusBtn copper={!inv} primary={inv} size="md" style={{justifyContent: 'center'}}>
                Book a call
              </AxiusBtn>
            </Block>
          );
        })}
      </div>

      {/* Founder Track inline */}
      <Block tone="surface" style={{
        marginTop: 32, padding: '28px 32px',
        borderLeft: `2px solid ${SAGE}`,
        display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32,
      }}>
        <div>
          <Eyebrow tone="sage" style={{color: SAGE}}>Founder Track</Eyebrow>
          <div style={{
            marginTop: 8, fontFamily: FONT, fontWeight: 600, fontSize: 17,
            color: T.ink, letterSpacing: '-0.012em',
          }}>building, not running</div>
        </div>
        <p style={{margin: 0, fontSize: 14, color: T.inkDim, lineHeight: 1.65}}>
          Same retention, different framing. If you're shipping a product from scratch, the same point capacity goes toward one bigger build plus the workflows that surround it.
          {' '}<strong style={{color: T.ink, fontWeight: 600}}>Builder</strong> inside Equipo · MVP in 3–4 months. <strong style={{color: T.ink, fontWeight: 600}}>Partner</strong> inside Departamento · substantial product in 4–6 months.
        </p>
      </Block>
    </section>
  );

  // ─── 07 · FOUNDER — full bleed with overlapping sage card
  const Founder = () => (
    <section data-screen-label="07 Founder" style={{
      borderTop: `1px solid ${T.border}`,
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      minHeight: 680, position: 'relative',
    }}>
      <div style={{position: 'relative', borderRight: `1px solid ${T.border}`, overflow: 'hidden'}}>
        <img src={window.AxiusFounder.photo} alt="Andrés Toro" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: '50% 30%',
          filter: 'contrast(1.05) saturate(0.95)',
        }}/>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(15,14,12,0.05) 0%, transparent 35%, rgba(15,14,12,0.55) 100%)',
        }}/>

        {/* overlapping sage card — bottom right of photo, extends slightly */}
        <Block tone="sage" style={{
          position: 'absolute', bottom: 32, right: -40, width: 220,
          padding: '18px 20px', zIndex: 2,
        }}>
          <Eyebrow tone="onSage">On duty</Eyebrow>
          <div style={{
            marginTop: 8, fontFamily: FONT, fontSize: 13, color: SAGE_INK,
            letterSpacing: '-0.005em',
          }}>Medellín · US business hours · EN / ES</div>
        </Block>

        {/* nameplate */}
        <div style={{position: 'absolute', bottom: 32, left: 32, color: '#F5F1EA'}}>
          <Eyebrow style={{color: T.copperSoft}}>Profile · Operator 01</Eyebrow>
          <div style={{
            marginTop: 10, fontFamily: FONT, fontWeight: 800, fontSize: 54,
            letterSpacing: '-0.03em', lineHeight: 0.95,
          }}>Andrés Toro</div>
        </div>
      </div>

      <div style={{
        padding: '88px 80px', display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <SectionMark id="07" label="The Operator" status="single point of contact"/>
        <h2 style={{
          margin: '0 0 24px', fontFamily: FONT, fontWeight: 700, fontSize: 48,
          letterSpacing: '-0.034em', lineHeight: 1.0,
        }}>
          The hand on<br/>
          <span style={{color: T.copper}}>your stack</span>.
        </h2>
        <p style={{margin: '0 0 28px', fontSize: 17, color: T.inkDim, lineHeight: 1.65, maxWidth: 480}}>
          {window.AxiusFounder.bio}
        </p>
        <p style={{
          margin: 0, fontSize: 17, color: T.ink, lineHeight: 1.5,
          fontStyle: 'italic', borderLeft: `2px solid ${T.copper}`,
          paddingLeft: 18, maxWidth: 460,
        }}>
          {window.AxiusFounder.quote}
        </p>
        <div style={{
          marginTop: 36, paddingTop: 24,
          borderTop: `1px solid ${T.border}`,
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18,
          maxWidth: 460,
        }}>
          {window.AxiusFounder.facts.map((f, i) => (
            <div key={i}>
              <Eyebrow tone="faint">{f.k}</Eyebrow>
              <div style={{marginTop: 4, fontFamily: FONT, fontSize: 14, color: T.ink}}>{f.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ─── 08 · FAQ — modern accordion with copper hover
  const FAQ = () => {
    const [open, setOpen] = React.useState(0);
    return (
      <section data-screen-label="08 FAQ" style={{padding: `104px ${pad}px`}}>
        <SectionMark id="08" label="FAQ" status="six questions"/>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          gap: 60, marginBottom: 56,
        }}>
          <h2 style={{
            margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
            letterSpacing: '-0.04em', lineHeight: 0.98,
          }}>
            Questions,<br/>
            <span style={{color: T.copper}}>asked plainly</span>.
          </h2>
        </div>

        <div style={{borderTop: `1px solid ${T.border}`}}>
          {window.AxiusFAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                borderBottom: `1px solid ${T.border}`,
                transition: 'background .15s ease',
              }}
              onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = T.surface; }}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  all: 'unset', cursor: 'pointer', width: '100%',
                  display: 'grid', gridTemplateColumns: '60px 1fr 40px',
                  gap: 24, padding: '24px 16px', alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: MONO, fontSize: 11, color: T.copper,
                    letterSpacing: '0.18em',
                  }}>Q.{String(i+1).padStart(2, '0')}</span>
                  <span style={{
                    fontFamily: FONT, fontWeight: 600, fontSize: 22,
                    color: isOpen ? T.ink : T.inkDim,
                    letterSpacing: '-0.02em', lineHeight: 1.3,
                  }}>{f.q}</span>
                  <span style={{
                    fontFamily: MONO, fontSize: 20, color: T.copper,
                    textAlign: 'right', transition: 'transform .2s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                  }}>+</span>
                </button>
                {isOpen && (
                  <div style={{
                    display: 'grid', gridTemplateColumns: '60px 1fr 40px',
                    gap: 24, padding: '0 16px 28px',
                  }}>
                    <span/>
                    <p style={{
                      margin: 0, fontSize: 15, color: T.inkDim, lineHeight: 1.7,
                      maxWidth: 720, letterSpacing: '-0.003em',
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

  // ─── 09 · CTA — bold inverted block
  const CTA = () => (
    <section data-screen-label="09 CTA" style={{padding: `64px ${pad}px 56px`, background: T.bg}}>
      <Block tone="copper" style={{padding: '88px 64px 80px'}}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56,
          alignItems: 'flex-end',
        }}>
          <div>
            <Eyebrow tone="onCopper">— Begin —</Eyebrow>
            <h2 style={{
              margin: '24px 0 0', fontFamily: FONT, fontWeight: 800, fontSize: 132,
              letterSpacing: '-0.05em', lineHeight: 0.88, color: '#1A1207',
            }}>
              Start<br/>
              the project.
            </h2>
            <p style={{
              margin: '32px 0 0', maxWidth: 460, fontSize: 17,
              color: 'rgba(26,18,7,0.8)', lineHeight: 1.5,
            }}>
              Thirty minutes. You leave with a one-page audit either way.
            </p>
          </div>
          <Block tone="default" style={{
            background: T.bg, padding: '32px 28px',
          }}>
            <Eyebrow tone="copper">Direct line</Eyebrow>
            <div style={{
              marginTop: 16, fontFamily: FONT, fontWeight: 600, fontSize: 24,
              color: T.ink, letterSpacing: '-0.02em',
            }}>andres@axius.tech</div>
            <div style={{
              marginTop: 6, fontFamily: MONO, fontSize: 11, color: T.inkMute,
              letterSpacing: '0.1em',
            }}>response within 24 hours · M–F</div>
            <div style={{
              marginTop: 28, paddingTop: 20,
              borderTop: `1px solid ${T.border}`,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <AxiusBtn copper size="md" style={{justifyContent: 'center'}}>
                Book a discovery call
              </AxiusBtn>
              <AxiusBtn size="md" style={{justifyContent: 'center'}}>
                See the catalog
              </AxiusBtn>
            </div>
          </Block>
        </div>
      </Block>

      {/* colophon */}
      <div style={{
        marginTop: 40, paddingTop: 24,
        borderTop: `1px solid ${T.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <AxiusWordmark variant={wordmark} size={16}/>
        <div style={{
          display: 'flex', gap: 24, alignItems: 'center',
          fontFamily: MONO, fontSize: 10, color: T.inkFaint,
          letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>
          <span>axius.tech</span>
          <span style={{color: T.copperSoft}}>·</span>
          <span>andres@axius.tech</span>
          <span style={{color: T.copperSoft}}>·</span>
          <span>medellín · remote</span>
          <span style={{color: T.copperSoft}}>·</span>
          <span>© 2026</span>
        </div>
      </div>
    </section>
  );

  return (
    <div style={{
      background: T.bg, color: T.ink, fontFamily: FONT,
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
      <FAQ/>
      <CTA/>
    </div>
  );
};

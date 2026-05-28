// ============================================================
// AXIUS · DIRECTION A — OPERATOR'S WORKSTATION
// Mono leads. Dense system grids. Console-style readouts.
// The opposing pole of Direction B: the actual operating layer,
// not a journal about it. Same brand, same content, different
// visual stance — for side-by-side selection against B.
// ============================================================

window.AxiusDirectionA = function ({ wordmark = 'A' }) {
  const T = window.AxiusTokens;
  const { AxiusBtn, AxiusWordmark, AxiusDot, AxiusMono, AxiusPill, AxiusRule } = window;
  const FONT = T.fontDisplay;
  const MONO = T.fontMono;

  const pad = 96;

  const page = {
    background: T.bg, color: T.ink, fontFamily: FONT,
    minHeight: 7200, position: 'relative',
  };

  // ─── Reusable atoms specific to A ──────────────────────────

  // A small section header in the workstation style:
  // [MONO id]  /  [INTER name]   ─────────────  [MONO status]
  const SectionHead = ({ id, name, status, statusColor }) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '80px auto 1fr auto',
      gap: 20,
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: `1px solid ${T.border}`,
    }}>
      <span style={{
        fontFamily: MONO, fontSize: 11, color: T.copper,
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>{id}</span>
      <span style={{
        fontFamily: MONO, fontSize: 11, color: T.ink,
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>/  {name}</span>
      <span style={{ height: 1, background: T.borderLo, marginLeft: 12 }}/>
      <span style={{
        display: 'inline-flex', alignItems: 'center',
        fontFamily: MONO, fontSize: 10, color: T.inkMute,
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        <AxiusDot color={statusColor || T.stateGreen}/>
        {status || 'live'}
      </span>
    </div>
  );

  // Console-style key/value cell
  const KV = ({ k, v, copper, mono }) => (
    <div>
      <div style={{
        fontFamily: MONO, fontSize: 9, color: T.inkFaint,
        letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6,
      }}>{k}</div>
      <div style={{
        fontFamily: mono ? MONO : FONT,
        fontSize: mono ? 13 : 15, fontWeight: mono ? 500 : 500,
        color: copper ? T.copper : T.ink,
        letterSpacing: mono ? '0.04em' : '-0.008em',
      }}>{v}</div>
    </div>
  );

  // Bordered panel
  const Panel = ({ children, dark, style = {} }) => (
    <div style={{
      border: `1px solid ${T.border}`,
      background: dark ? T.bg : T.surface,
      ...style,
    }}>{children}</div>
  );

  // Section wrapper — workstation cadence (tighter than B's chapters)
  const Section = ({ id, name, status, statusColor, children, dark, style = {} }) => (
    <section data-screen-label={`${id} ${name}`} style={{
      padding: `72px ${pad}px 88px`,
      background: dark ? T.surface : 'transparent',
      borderTop: `1px solid ${T.border}`,
      ...style,
    }}>
      <SectionHead id={id} name={name} status={status} statusColor={statusColor}/>
      <div style={{ marginTop: 56 }}>{children}</div>
    </section>
  );

  // ─── 00 · MASTHEAD / NAV ───────────────────────────────────
  const Nav = () => (
    <nav style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center',
      gap: 36,
      padding: `20px ${pad}px`,
      borderBottom: `1px solid ${T.border}`,
      background: T.bg,
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 14}}>
        <AxiusWordmark variant={wordmark} size={20}/>
        <span style={{
          fontFamily: MONO, fontSize: 10, color: T.inkFaint,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          paddingLeft: 14, borderLeft: `1px solid ${T.borderLo}`,
        }}>operations console · v2026.05</span>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 28,
      }}>
        {[
          ['00', 'Overview'],
          ['01', 'Commitments'],
          ['02', 'Method'],
          ['03', 'Catalog'],
          ['04', 'Pricing'],
          ['05', 'Founder'],
        ].map(([n, label], i) => (
          <span key={n} style={{
            display: 'inline-flex', alignItems: 'baseline', gap: 6,
            fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em',
            color: i === 0 ? T.copper : T.inkDim,
            textTransform: 'uppercase', cursor: 'pointer',
          }}>
            <span style={{color: T.inkFaint}}>{n}</span>
            <span>{label}</span>
          </span>
        ))}
      </div>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 14}}>
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          fontFamily: MONO, fontSize: 10, color: T.inkMute,
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          <AxiusDot color={T.stateGreen}/>
          accepting · 3 / mo
        </span>
        <AxiusBtn copper size="sm">Book a call</AxiusBtn>
      </div>
    </nav>
  );

  // ─── 00 · HERO ─────────────────────────────────────────────
  const Hero = () => (
    <header data-screen-label="00 Hero" style={{
      padding: `80px ${pad}px 88px`,
      borderBottom: `1px solid ${T.border}`,
    }}>
      {/* preamble strip */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', marginBottom: 56,
        fontFamily: MONO, fontSize: 10,
        letterSpacing: '0.22em', textTransform: 'uppercase',
      }}>
        <span style={{color: T.inkFaint}}>
          AXIUS · operations console · /home
        </span>
        <span style={{color: T.copper}}>
          ▌ session 0001 · idle
        </span>
      </div>

      {/* main split: title left · console panel right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: 72,
        alignItems: 'flex-end',
      }}>
        <div>
          <div style={{
            fontFamily: MONO, fontSize: 11, color: T.copper,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            marginBottom: 28,
          }}>// the operating layer for small business technology</div>

          <h1 style={{
            margin: 0, fontFamily: FONT, fontWeight: 800,
            fontSize: 116, lineHeight: 0.95, letterSpacing: '-0.05em',
          }}>
            Run<br/>
            your business.<br/>
            <span style={{color: T.inkMute}}>Not your tech.</span>
          </h1>

          <p style={{
            margin: '36px 0 0', maxWidth: 560,
            fontSize: 18, color: T.inkDim, lineHeight: 1.55,
          }}>
            We run the tech side of your business — websites, automations,
            AI tools, integrations, all of it — for one monthly fee.
            The team you'd hire if you knew where to look.
          </p>

          <div style={{display: 'flex', gap: 14, marginTop: 36}}>
            <AxiusBtn copper size="lg">Book a discovery call</AxiusBtn>
            <AxiusBtn size="lg">See the catalog</AxiusBtn>
          </div>
        </div>

        {/* console panel */}
        <Panel style={{padding: 0}}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 18px', borderBottom: `1px solid ${T.border}`,
            background: T.bg,
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              fontFamily: MONO, fontSize: 10, color: T.ink,
              letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>
              <AxiusDot color={T.stateGreen}/>
              live · operator on duty
            </span>
            <span style={{
              fontFamily: MONO, fontSize: 10, color: T.inkFaint,
              letterSpacing: '0.16em',
            }}>05:18 GMT-5</span>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 0,
          }}>
            {[
              ['workflows operated', '129', { mono: true, copper: true }],
              ['categories', '9'],
              ['response · tier 03', '< 24h'],
              ['response · tier 01', '< 72h'],
              ['build · configured', '~90%'],
              ['build · custom', '~10%'],
              ['starts at', '$1,000 / mo'],
              ['client cap · monthly', '3 new'],
            ].map(([k, v, opts], i) => (
              <div key={i} style={{
                padding: '18px 18px',
                borderRight: i % 2 === 0 ? `1px solid ${T.border}` : 'none',
                borderBottom: i < 6 ? `1px solid ${T.border}` : 'none',
              }}>
                <div style={{
                  fontFamily: MONO, fontSize: 9, color: T.inkFaint,
                  letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8,
                }}>{k}</div>
                <div style={{
                  fontFamily: opts && opts.mono ? MONO : FONT,
                  fontSize: opts && opts.mono ? 28 : 17,
                  fontWeight: opts && opts.mono ? 500 : 600,
                  color: opts && opts.copper ? T.copper : T.ink,
                  letterSpacing: opts && opts.mono ? '-0.01em' : '-0.005em',
                  lineHeight: 1,
                }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{
            padding: '12px 18px', borderTop: `1px solid ${T.border}`,
            fontFamily: MONO, fontSize: 10, color: T.copperSoft,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            background: T.bg,
          }}>
            <span>$ axius status</span>
            <span style={{color: T.inkFaint}}> → all systems nominal</span>
          </div>
        </Panel>
      </div>
    </header>
  );

  // ─── 01 · COMMITMENTS ──────────────────────────────────────
  const Commitments = () => (
    <Section id="01" name="Commitments" status="default · always">
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', marginBottom: 48, gap: 60,
      }}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 56,
          letterSpacing: '-0.035em', lineHeight: 1, maxWidth: 720,
        }}>
          Five things we always do.
        </h2>
        <p style={{
          margin: 0, maxWidth: 320, fontSize: 14, color: T.inkMute,
          lineHeight: 1.6,
        }}>
          Defaults that apply on every retainer, every tier,
          every month — not just the kickoff slide.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0,
        border: `1px solid ${T.border}`,
      }}>
        {window.AxiusCommitments.map((c, i) => (
          <div key={c.n} style={{
            padding: '28px 24px',
            borderRight: i < 4 ? `1px solid ${T.border}` : 'none',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: MONO, fontSize: 11, color: T.copper,
                letterSpacing: '0.2em',
              }}>C.{c.n}</span>
              <AxiusDot color={T.stateGreen}/>
            </div>
            <h3 style={{
              margin: 0, fontFamily: FONT, fontWeight: 600, fontSize: 19,
              letterSpacing: '-0.018em', lineHeight: 1.2,
            }}>{c.title}</h3>
            <p style={{
              margin: 0, fontSize: 13, color: T.inkDim, lineHeight: 1.6,
              flex: 1,
            }}>{c.body}</p>
            <div style={{
              borderTop: `1px solid ${T.borderLo}`, paddingTop: 14,
            }}>
              <div style={{
                fontFamily: MONO, fontSize: 9, color: T.inkFaint,
                letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4,
              }}>{c.metric.label}</div>
              <div style={{
                fontFamily: MONO, fontSize: 16, color: T.copper,
                letterSpacing: '0.02em',
              }}>{c.metric.value}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );

  // ─── 02 · PAIN ─────────────────────────────────────────────
  const Pain = () => (
    <Section id="02" name="Diagnostic" status="6 / 9 systems degraded" statusColor={T.stateAmber} dark>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
        alignItems: 'flex-start',
      }}>
        <div>
          <h2 style={{
            margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 60,
            letterSpacing: '-0.038em', lineHeight: 1,
          }}>
            You started this<br/>
            to <span style={{color: T.copper}}>build a business</span>,<br/>
            not maintain a stack.
          </h2>
          <p style={{
            margin: '36px 0 0', fontSize: 16, color: T.inkDim, lineHeight: 1.65,
            maxWidth: 460,
          }}>
            Most operators we meet are running their tech function by accident.
            Five contractors, three Slack threads, a website that breaks on Friday
            afternoon — and no one's owning the whole thing. Axius is one team
            that does.
          </p>
        </div>

        <Panel>
          <div style={{
            padding: '14px 18px', borderBottom: `1px solid ${T.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: MONO, fontSize: 10, color: T.copperSoft,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            background: T.bg,
          }}>
            <span>$ axius diagnose --stack</span>
            <span style={{color: T.inkFaint}}>output · truncated</span>
          </div>
          <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
            {[
              ['SYM-01', 'Five contractors. Three Slack threads.', T.stateAmber],
              ['SYM-02', 'Website breaks Friday. No one to call.', T.stateRed],
              ['SYM-03', 'CRM never wired to the calendar.', T.stateAmber],
              ['SYM-04', '"AI thing" still doesn\'t quite work.', T.stateRed],
              ['SYM-05', 'Tools sit in tabs nobody opens.', T.stateAmber],
              ['SYM-06', 'Work doesn\'t compound. Cycle restarts.', T.stateRed],
              ['DX-01',  'Diagnosis · no single owner of the stack.', T.copper],
              ['RX-01',  'Prescribed · one operator, documented, monthly.', T.stateGreen],
            ].map(([code, body, color], i, arr) => (
              <li key={i} style={{
                display: 'grid', gridTemplateColumns: '90px 1fr 24px',
                gap: 18, padding: '14px 18px',
                borderBottom: i < arr.length - 1 ? `1px solid ${T.borderLo}` : 'none',
                alignItems: 'center',
                background: i === arr.length - 1 ? T.copperFaint : 'transparent',
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 11, color: T.inkMute,
                  letterSpacing: '0.16em',
                }}>{code}</span>
                <span style={{
                  fontFamily: FONT, fontSize: 14,
                  color: i === arr.length - 1 ? T.ink : T.inkDim,
                  lineHeight: 1.5,
                }}>{body}</span>
                <AxiusDot color={color}/>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  );

  // ─── 03 · METHODOLOGY ──────────────────────────────────────
  const Methodology = () => (
    <Section id="03" name="Method" status="audit → configure → operate → evolve">
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', marginBottom: 48, gap: 60,
      }}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 56,
          letterSpacing: '-0.035em', lineHeight: 1, maxWidth: 660,
        }}>
          Four stages. Each one named. Each one delivered.
        </h2>
        <p style={{
          margin: 0, maxWidth: 300, fontSize: 14, color: T.inkMute, lineHeight: 1.6,
        }}>
          One pipeline, four checkpoints. Each produces a written artifact
          you own and can hand to the next operator if we ever part ways.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        border: `1px solid ${T.border}`,
      }}>
        {window.AxiusMethodology.map((m, i) => (
          <div key={m.n} style={{
            padding: '28px 24px 32px',
            borderRight: i < 3 ? `1px solid ${T.border}` : 'none',
            display: 'flex', flexDirection: 'column', gap: 20,
            minHeight: 320,
          }}>
            <div style={{
              display: 'flex', alignItems: 'baseline',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontFamily: MONO, fontSize: 11, color: T.copper,
                letterSpacing: '0.22em',
              }}>STAGE {m.n}</span>
              <span style={{
                fontFamily: MONO, fontSize: 10, color: T.inkFaint,
                letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>{m.timing}</span>
            </div>
            <div style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 56,
              color: T.ink, letterSpacing: '-0.04em', lineHeight: 1,
            }}>{m.n}</div>
            <h3 style={{
              margin: 0, fontFamily: FONT, fontWeight: 600, fontSize: 24,
              letterSpacing: '-0.022em', lineHeight: 1.1,
            }}>{m.name}.</h3>
            <p style={{
              margin: 0, fontSize: 13, color: T.inkDim, lineHeight: 1.6,
              flex: 1,
            }}>{m.body}</p>
            <div style={{
              padding: '10px 12px', background: T.bg,
              border: `1px solid ${T.borderLo}`,
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontFamily: MONO, fontSize: 11, color: T.copperSoft,
                letterSpacing: '0.04em',
              }}>{m.artifact}</span>
              <span style={{
                fontFamily: MONO, fontSize: 10, color: T.inkFaint,
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>artifact</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );

  // ─── 04 · CATALOG ──────────────────────────────────────────
  const Catalog = () => {
    const [active, setActive] = React.useState(0);
    const cat = window.AxiusCatalog[active];
    return (
      <Section id="04" name="Catalog" status="129 workflows · 9 categories" dark>
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', marginBottom: 48, gap: 60,
        }}>
          <h2 style={{
            margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 56,
            letterSpacing: '-0.035em', lineHeight: 1,
          }}>
            An index of the work.
          </h2>
          <div style={{textAlign: 'right'}}>
            <div style={{
              fontFamily: MONO, fontWeight: 500, fontSize: 56, color: T.copper,
              letterSpacing: '-0.01em', lineHeight: 1,
            }}>129</div>
            <div style={{
              fontFamily: MONO, fontSize: 10, color: T.inkMute,
              letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 8,
            }}>workflows · 9 categories</div>
          </div>
        </div>

        {/* category index */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
          border: `1px solid ${T.border}`, marginBottom: 32,
        }}>
          {window.AxiusCatalog.map((c, i) => (
            <button key={c.id} onClick={() => setActive(i)} style={{
              all: 'unset', cursor: 'pointer',
              padding: '22px 22px',
              borderRight: (i + 1) % 3 !== 0 ? `1px solid ${T.border}` : 'none',
              borderBottom: i < 6 ? `1px solid ${T.border}` : 'none',
              background: i === active ? T.bg : 'transparent',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 11,
                  color: i === active ? T.copper : T.inkMute,
                  letterSpacing: '0.18em',
                }}>CAT.{String(i+1).padStart(2, '0')}</span>
                <span style={{
                  fontFamily: MONO, fontSize: 11,
                  color: i === active ? T.copperSoft : T.inkFaint,
                  letterSpacing: '0.12em',
                }}>{c.count} entries</span>
              </div>
              <h3 style={{
                margin: 0, fontFamily: FONT, fontWeight: 600, fontSize: 19,
                letterSpacing: '-0.018em',
                color: i === active ? T.ink : T.inkDim,
              }}>{c.name}</h3>
              <span style={{
                fontFamily: MONO, fontSize: 10, color: T.inkFaint,
                letterSpacing: '0.04em',
              }}>{c.stack}</span>
            </button>
          ))}
        </div>

        {/* active category — sample entries */}
        <Panel>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 18px', borderBottom: `1px solid ${T.border}`, background: T.surface,
          }}>
            <span style={{
              fontFamily: MONO, fontSize: 10, color: T.copperSoft,
              letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>$ axius catalog --category={cat.id}</span>
            <span style={{
              fontFamily: MONO, fontSize: 10, color: T.inkFaint,
              letterSpacing: '0.14em',
            }}>showing 4 of {cat.count}</span>
          </div>
          {cat.samples.map((s, i) => (
            <div key={s.n} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr 200px 80px 60px',
              gap: 20, padding: '18px 18px', alignItems: 'baseline',
              borderBottom: i < cat.samples.length - 1 ? `1px solid ${T.borderLo}` : 'none',
            }}>
              <span style={{fontFamily: MONO, fontSize: 11, color: T.copper, letterSpacing: '0.06em'}}>{s.n}</span>
              <div>
                <div style={{fontFamily: FONT, fontWeight: 500, fontSize: 16, color: T.ink, letterSpacing: '-0.008em'}}>{s.name}</div>
                <div style={{fontFamily: MONO, fontSize: 11, color: T.inkMute, letterSpacing: '0.04em', marginTop: 4}}>{s.sub}</div>
              </div>
              <span style={{fontFamily: MONO, fontSize: 11, color: T.inkDim, letterSpacing: '0.08em', textTransform: 'uppercase'}}>build · {s.time}</span>
              <span style={{fontFamily: MONO, fontSize: 12, color: T.copperSoft, letterSpacing: '0.04em', textAlign: 'right'}}>{s.pts} pt{s.pts > 1 ? 's' : ''}</span>
              <span style={{fontFamily: MONO, fontSize: 14, color: T.copper, textAlign: 'right'}}>→</span>
            </div>
          ))}
        </Panel>
      </Section>
    );
  };

  // ─── 05 · COMPARISON ───────────────────────────────────────
  const Comparison = () => (
    <Section id="05" name="Comparison" status="freelancer · hire · axius">
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', marginBottom: 48, gap: 60,
      }}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 60,
          letterSpacing: '-0.038em', lineHeight: 1,
        }}>
          A different <span style={{color: T.copper}}>shape</span> of help.
        </h2>
        <p style={{
          margin: 0, maxWidth: 320, fontSize: 14, color: T.inkMute, lineHeight: 1.6,
        }}>
          Side-by-side against the three alternatives an operator typically
          considers when they decide they can't keep running tech themselves.
        </p>
      </div>

      <Panel>
        {/* header row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '220px 1fr 1fr 1fr',
          gap: 0, borderBottom: `1px solid ${T.border}`, background: T.surface,
        }}>
          <div style={{padding: '20px 24px'}}>
            <div style={{fontFamily: MONO, fontSize: 10, color: T.inkFaint, letterSpacing: '0.2em', textTransform: 'uppercase'}}>row</div>
          </div>
          {[
            ['Option 01', 'Freelancer', false],
            ['Option 02', 'In-house hire', false],
            ['Option 03', 'Axius', true],
          ].map(([k, name, hi], i) => (
            <div key={i} style={{
              padding: '20px 24px',
              borderLeft: `1px solid ${T.border}`,
              background: hi ? T.copperFaint : 'transparent',
            }}>
              <div style={{
                fontFamily: MONO, fontSize: 10,
                color: hi ? T.copper : T.inkFaint,
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>{k}</div>
              <div style={{
                fontFamily: FONT, fontWeight: 600, fontSize: 22,
                color: hi ? T.ink : T.inkDim,
                letterSpacing: '-0.018em', marginTop: 6,
              }}>{name}</div>
            </div>
          ))}
        </div>
        {/* rows */}
        {window.AxiusComparison.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '220px 1fr 1fr 1fr',
            gap: 0, borderBottom: i < window.AxiusComparison.length - 1 ? `1px solid ${T.borderLo}` : 'none',
          }}>
            <div style={{
              padding: '18px 24px',
              fontFamily: MONO, fontSize: 11, color: T.inkMute,
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>{r.row}</div>
            {[r.f, r.h, r.a].map((val, j) => (
              <div key={j} style={{
                padding: '18px 24px',
                borderLeft: `1px solid ${T.border}`,
                background: j === 2 ? T.copperFaint : 'transparent',
                fontFamily: FONT, fontSize: 14,
                color: j === 2 ? T.ink : T.inkDim,
                lineHeight: 1.45, letterSpacing: '-0.005em',
              }}>{val}</div>
            ))}
          </div>
        ))}
      </Panel>
    </Section>
  );

  // ─── 06 · PRICING ──────────────────────────────────────────
  const Pricing = () => (
    <Section id="06" name="Pricing" status="month-to-month after 90d" dark>
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', marginBottom: 48, gap: 60,
      }}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 56,
          letterSpacing: '-0.035em', lineHeight: 1,
        }}>
          Three sizes of operating layer.
        </h2>
        <p style={{
          margin: 0, maxWidth: 320, fontSize: 14, color: T.inkMute, lineHeight: 1.6,
        }}>
          One team, one bill. Setup waived on same-day close.
          Capacity measured in points — each workflow's cost is shown in the catalog.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
        border: `1px solid ${T.border}`,
      }}>
        {window.AxiusPricing.map((p, i) => (
          <div key={p.id} style={{
            padding: '32px 28px 28px',
            borderRight: i < 2 ? `1px solid ${T.border}` : 'none',
            background: p.featured ? T.copperFaint : 'transparent',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: MONO, fontSize: 11, color: T.copper,
                letterSpacing: '0.22em',
              }}>TIER {String(i+1).padStart(2, '0')}</span>
              {p.featured && (
                <span style={{
                  fontFamily: MONO, fontSize: 10, color: T.copper,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  border: `1px solid ${T.copper}`, padding: '3px 8px',
                }}>recommended</span>
              )}
            </div>

            <h3 style={{
              margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 40,
              letterSpacing: '-0.028em', lineHeight: 1,
            }}>{p.name}.</h3>

            <p style={{
              margin: 0, fontSize: 13, color: T.inkDim, lineHeight: 1.55,
              minHeight: 60,
            }}>{p.sub}</p>

            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 8,
              borderTop: `1px solid ${T.border}`, paddingTop: 22,
            }}>
              <span style={{
                fontFamily: FONT, fontWeight: 700, fontSize: 48, color: T.copper,
                letterSpacing: '-0.03em', lineHeight: 0.95,
              }}>${p.price.toLocaleString()}</span>
              <span style={{
                fontFamily: MONO, fontSize: 11, color: T.inkMute,
                letterSpacing: '0.08em',
              }}>/ mo</span>
            </div>
            <div style={{
              fontFamily: MONO, fontSize: 10, color: T.inkFaint,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              marginTop: -10,
            }}>+ ${p.setup.toLocaleString()} setup · waived on close</div>

            {/* capacity readouts */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
              padding: '16px 0', borderTop: `1px solid ${T.borderLo}`,
              borderBottom: `1px solid ${T.borderLo}`,
            }}>
              <KV k="capacity" v={
                <a href="#catalog" style={{
                  color: T.copper, textDecoration: 'underline',
                  textUnderlineOffset: 3, textDecorationStyle: 'dashed',
                }}>{p.points} pts active</a>
              }/>
              <KV k="response" v={p.response}/>
              <KV k="cadence" v={p.cadence}/>
              <KV k="comms" v={p.comms}/>
            </div>

            <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1}}>
              {p.features.map((f, j) => (
                <li key={j} style={{
                  display: 'flex', gap: 10, fontSize: 13, color: T.inkDim,
                  lineHeight: 1.5,
                }}>
                  <span style={{color: T.copper, fontFamily: MONO}}>→</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <AxiusBtn copper={p.featured} primary={!p.featured} size="md" style={{marginTop: 4, justifyContent: 'center'}}>
              Book a call
            </AxiusBtn>
          </div>
        ))}
      </div>

      {/* founder track footer */}
      <div style={{
        marginTop: 32, display: 'grid', gridTemplateColumns: '200px 1fr',
        gap: 32, padding: '24px 28px',
        border: `1px solid ${T.border}`, borderLeft: `2px solid ${T.copper}`,
      }}>
        <div>
          <div style={{
            fontFamily: MONO, fontSize: 10, color: T.copper,
            letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>Founder Track</div>
          <div style={{
            fontFamily: FONT, fontWeight: 600, fontSize: 17,
            color: T.ink, marginTop: 6, letterSpacing: '-0.012em',
          }}>building, not running</div>
        </div>
        <p style={{
          margin: 0, fontSize: 14, color: T.inkDim, lineHeight: 1.6,
        }}>
          Same retention, different framing. If you're shipping a product
          from scratch, the same point capacity goes toward one bigger build
          plus the workflows that surround it. <strong style={{color: T.ink}}>Builder</strong> inside Equipo · MVP
          in 3–4 months. <strong style={{color: T.ink}}>Partner</strong> inside Departamento · substantial product
          in 4–6 months.
        </p>
      </div>
    </Section>
  );

  // ─── 07 · FOUNDER ──────────────────────────────────────────
  const Founder = () => (
    <section data-screen-label="07 Founder" style={{
      borderTop: `1px solid ${T.border}`,
      display: 'grid', gridTemplateColumns: '1fr 1.1fr',
      minHeight: 640,
    }}>
      <div style={{
        padding: `72px ${pad / 2}px 72px ${pad}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        borderRight: `1px solid ${T.border}`,
      }}>
        <SectionHead id="07" name="Operator" status="single point of contact"/>
        <h2 style={{
          margin: '48px 0 0', fontFamily: FONT, fontWeight: 700, fontSize: 52,
          letterSpacing: '-0.035em', lineHeight: 1,
        }}>
          The hand on<br/>your stack.
        </h2>
        <p style={{
          margin: '28px 0 0', fontSize: 16, color: T.inkDim, lineHeight: 1.65,
          maxWidth: 520,
        }}>
          {window.AxiusFounder.bio}
        </p>
        <p style={{
          margin: '32px 0 0', fontSize: 16, color: T.ink, lineHeight: 1.5,
          fontStyle: 'italic', borderLeft: `2px solid ${T.copper}`,
          paddingLeft: 16, maxWidth: 480,
        }}>
          {window.AxiusFounder.quote}
        </p>
        <div style={{
          marginTop: 36, paddingTop: 24,
          borderTop: `1px solid ${T.border}`,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18,
        }}>
          {window.AxiusFounder.facts.map((f, i) => (
            <KV key={i} k={f.k} v={f.v}/>
          ))}
        </div>
      </div>

      <div style={{position: 'relative', background: T.surface, overflow: 'hidden'}}>
        <img src={window.AxiusFounder.photo} alt="Andrés Toro" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: '50% 30%',
          filter: 'contrast(1.05) saturate(0.92)',
        }}/>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(15,14,12,0.05) 0%, transparent 30%, rgba(15,14,12,0.55) 100%)',
        }}/>
        {/* metadata corner — top right */}
        <div style={{
          position: 'absolute', top: 24, right: 24,
          padding: '10px 14px',
          background: 'rgba(15,14,12,0.65)',
          border: `1px solid ${T.borderHi}`,
          backdropFilter: 'blur(6px)',
          fontFamily: MONO, fontSize: 10, color: T.inkDim,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <AxiusDot color={T.stateGreen}/>
          on duty · medellín
        </div>
        {/* name plate — bottom left */}
        <div style={{
          position: 'absolute', bottom: 28, left: 28, right: 28,
        }}>
          <div style={{
            fontFamily: MONO, fontSize: 10, color: T.copperSoft,
            letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>Profile · Operator 01</div>
          <div style={{
            fontFamily: FONT, fontWeight: 700, fontSize: 52,
            letterSpacing: '-0.03em', lineHeight: 1,
            color: '#F5F1EA', marginTop: 8,
          }}>Andrés Toro</div>
          <div style={{
            marginTop: 10, fontFamily: MONO, fontSize: 11, color: T.copperSoft,
            letterSpacing: '0.16em',
          }}>—— signed, A.T.</div>
        </div>
      </div>
    </section>
  );

  // ─── 08 · FAQ ──────────────────────────────────────────────
  const FAQ = () => {
    const [open, setOpen] = React.useState(0);
    return (
      <Section id="08" name="FAQ" status="asked plainly">
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', marginBottom: 32, gap: 60,
        }}>
          <h2 style={{
            margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 56,
            letterSpacing: '-0.035em', lineHeight: 1,
          }}>
            Questions, asked plainly.
          </h2>
          <span style={{
            fontFamily: MONO, fontSize: 11, color: T.inkMute,
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>{window.AxiusFAQ.length} entries</span>
        </div>
        <div style={{borderTop: `1px solid ${T.border}`}}>
          {window.AxiusFAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                borderBottom: `1px solid ${T.border}`,
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  all: 'unset', cursor: 'pointer', width: '100%',
                  display: 'grid', gridTemplateColumns: '80px 1fr 40px',
                  gap: 24, padding: '22px 0', alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: MONO, fontSize: 11, color: T.copper,
                    letterSpacing: '0.18em',
                  }}>Q.{String(i+1).padStart(2, '0')}</span>
                  <span style={{
                    fontFamily: FONT, fontWeight: 600, fontSize: 21,
                    color: isOpen ? T.ink : T.inkDim,
                    letterSpacing: '-0.018em', lineHeight: 1.3,
                  }}>{f.q}</span>
                  <span style={{
                    fontFamily: MONO, fontSize: 18, color: T.copper,
                    textAlign: 'right',
                  }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div style={{
                    display: 'grid', gridTemplateColumns: '80px 1fr 40px',
                    gap: 24, paddingBottom: 28,
                  }}>
                    <span/>
                    <p style={{
                      margin: 0, fontSize: 15, color: T.inkDim, lineHeight: 1.65,
                      maxWidth: 720,
                    }}>{f.a}</p>
                    <span/>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>
    );
  };

  // ─── 09 · CTA / COLOPHON ───────────────────────────────────
  const CTA = () => (
    <section data-screen-label="09 CTA" style={{
      borderTop: `2px solid ${T.ink}`,
      padding: `108px ${pad}px 56px`,
      background: T.surface,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, alignItems: 'center',
      }}>
        <div>
          <div style={{
            fontFamily: MONO, fontSize: 10, color: T.copperSoft,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            marginBottom: 24,
          }}>—— end of console · v2026.05 ——</div>
          <h2 style={{
            margin: 0, fontFamily: FONT, fontWeight: 800, fontSize: 112,
            letterSpacing: '-0.05em', lineHeight: 0.92,
          }}>
            Start<br/><span style={{color: T.copper}}>the call.</span>
          </h2>
          <p style={{
            margin: '32px 0 0', fontSize: 17, color: T.inkDim, lineHeight: 1.55,
            maxWidth: 460,
          }}>
            Thirty minutes. You leave with a one-page audit either way.
          </p>
          <div style={{display: 'flex', gap: 14, marginTop: 32}}>
            <AxiusBtn copper size="lg">Book a discovery call</AxiusBtn>
            <AxiusBtn size="lg">See the catalog</AxiusBtn>
          </div>
        </div>

        <Panel>
          <div style={{
            padding: '14px 18px', borderBottom: `1px solid ${T.border}`,
            display: 'flex', justifyContent: 'space-between',
            background: T.bg,
            fontFamily: MONO, fontSize: 10, color: T.inkMute,
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            <span><AxiusDot color={T.stateGreen}/>direct line</span>
            <span style={{color: T.copperSoft}}>operator on duty</span>
          </div>
          <div style={{padding: '24px 24px'}}>
            <KV k="reachable at" v={window.AxiusFounder.email}/>
            <div style={{height: 18}}/>
            <KV k="response" v="within 24 hours · M–F"/>
            <div style={{height: 18}}/>
            <KV k="available" v="US business hours"/>
            <div style={{height: 18}}/>
            <KV k="languages" v="EN · ES"/>
            <div style={{
              marginTop: 24, paddingTop: 18,
              borderTop: `1px solid ${T.borderLo}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <AxiusWordmark variant={wordmark} size={16}/>
              <span style={{
                fontFamily: MONO, fontSize: 10, color: T.inkFaint,
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>axius.tech · © 2026</span>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );

  return (
    <div style={page}>
      <Nav/>
      <Hero/>
      <Commitments/>
      <Pain/>
      <Methodology/>
      <Catalog/>
      <Comparison/>
      <Pricing/>
      <Founder/>
      <FAQ/>
      <CTA/>
    </div>
  );
};

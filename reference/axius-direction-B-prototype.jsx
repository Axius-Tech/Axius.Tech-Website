// ============================================================
// AXIUS · DIRECTION B — EDITORIAL DOCUMENT (ORIGINAL PROTOTYPE)
// Type leads. Architectural whitespace. Asymmetrical spreads.
// Lean: Dark Operator 55 / Wide Sans 35 / Warm Med 10
//
// This file restores the original Editorial prototype shared at
// the start of the conversation — the version with the Chapter
// wrapper (chapter gutter on the left of each section).
// ============================================================

window.AxiusDirectionBPrototype = function ({ wordmark = 'A', accent }) {
  const T = window.AxiusTokens;
  const { AxiusMono, AxiusPill, AxiusBtn, AxiusWordmark, AxiusPortrait, AxiusImgSlot, AxiusRule } = window;
  const FONT = T.fontDisplay;
  const MONO = T.fontMono;

  const page = {
    background: T.bg, color: T.ink, fontFamily: FONT,
    minHeight: 7200, position: 'relative',
  };

  const pad = 96;

  // Chapter-style section wrapper
  const Chapter = ({ ch, dek, children, dark, noPad, style = {} }) => (
    <section data-screen-label={ch + ' ' + (dek || '')} style={{
      padding: noPad ? 0 : `100px ${pad}px 100px`,
      background: dark ? T.surface : 'transparent',
      borderTop: `1px solid ${T.border}`,
      position: 'relative',
      ...style,
    }}>
      {!noPad && (
        <div style={{
          display: 'flex', gap: 60, alignItems: 'flex-start',
          marginBottom: 0,
        }}>
          <div style={{flex: '0 0 140px', paddingTop: 6}}>
            <div style={{
              fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em',
              color: T.copper, textTransform: 'uppercase',
            }}>{ch}</div>
            {dek && (
              <div style={{
                marginTop: 12, fontFamily: FONT, fontSize: 13, color: T.inkMute,
                lineHeight: 1.5, letterSpacing: '-0.005em',
              }}>{dek}</div>
            )}
          </div>
          <div style={{flex: 1, minWidth: 0}}>{children}</div>
        </div>
      )}
      {noPad && children}
    </section>
  );

  // ─── MASTHEAD / NAV ────────────────────────────────────────
  const Nav = () => (
    <nav style={{
      display: 'flex', alignItems: 'center', padding: `28px ${pad}px`,
      borderBottom: `1px solid ${T.border}`,
    }}>
      <AxiusWordmark variant={wordmark} size={18}/>
      <div style={{
        marginLeft: 'auto', display: 'flex', gap: 36, alignItems: 'center',
      }}>
        {['Manifesto', 'Method', 'Catalog', 'Pricing', 'Founder'].map((n, i) => (
          <span key={i} style={{
            fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em',
            color: i === 0 ? T.copper : T.inkDim, textTransform: 'uppercase',
            cursor: 'pointer',
          }}>{n}</span>
        ))}
        <AxiusBtn size="sm">Book a call</AxiusBtn>
      </div>
    </nav>
  );

  // ─── HERO ──────────────────────────────────────────────────
  const Hero = () => (
    <header data-screen-label="01 Hero" style={{padding: `120px ${pad}px 80px`}}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 64,
      }}>
        <div style={{fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', color: T.inkFaint, textTransform: 'uppercase'}}>
          Issue 01 · 2026 · The Operator's Manual
        </div>
        <div style={{fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: T.copper, textTransform: 'uppercase'}}>
          ↘ accepting · 3 / month
        </div>
      </div>

      <h1 style={{
        margin: 0, fontFamily: FONT, fontWeight: 800,
        fontSize: 148, lineHeight: 0.92, letterSpacing: '-0.055em',
      }}>
        Run<br/>
        your business.<br/>
        <span style={{color: T.inkMute}}>Not your tech.</span>
      </h1>

      <div style={{
        marginTop: 64, display: 'flex', alignItems: 'flex-end', gap: 60,
        borderTop: `1px solid ${T.border}`, paddingTop: 40,
      }}>
        <p style={{margin: 0, flex: '0 0 520px', fontSize: 19, color: T.inkDim, lineHeight: 1.5}}>
          We run the tech side of your business — websites, automations, AI tools, integrations, all of it — for one monthly fee. The team you'd hire if you knew where to look.
        </p>
        <div style={{flex: 1}}/>
        <div style={{display: 'flex', gap: 14, flex: '0 0 auto'}}>
          <AxiusBtn copper size="lg">Book a discovery call</AxiusBtn>
          <AxiusBtn size="lg">See the catalog</AxiusBtn>
        </div>
      </div>
    </header>
  );

  // ─── COMMITMENTS ───────────────────────────────────────────
  const Commitments = () => (
    <Chapter ch="Chapter 01" dek="In which we say what we will always do, every month, without exception.">
      <h2 style={{
        margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
        letterSpacing: '-0.035em', lineHeight: 1, maxWidth: 800,
      }}>
        Five things we<br/>
        always do.
      </h2>

      <ol style={{margin: '72px 0 0', padding: 0, listStyle: 'none'}}>
        {window.AxiusCommitments.map((c, i) => (
          <li key={c.n} style={{
            display: 'grid', gridTemplateColumns: '120px 1fr 220px',
            gap: 60, padding: '40px 0',
            borderTop: `1px solid ${T.border}`,
            alignItems: 'flex-start',
          }}>
            <span style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 54, color: T.copper,
              letterSpacing: '-0.03em', lineHeight: 1,
            }}>{c.n}</span>
            <div>
              <h3 style={{margin: '8px 0 14px', fontFamily: FONT, fontWeight: 700, fontSize: 30, letterSpacing: '-0.02em', lineHeight: 1.1}}>
                {c.title}
              </h3>
              <p style={{margin: 0, fontSize: 16, color: T.inkDim, lineHeight: 1.55, maxWidth: 520}}>
                {c.body}
              </p>
            </div>
            <div style={{paddingTop: 16, borderLeft: `1px solid ${T.border}`, paddingLeft: 24}}>
              <div style={{fontFamily: MONO, fontSize: 10, color: T.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6}}>{c.metric.label}</div>
              <div style={{fontFamily: FONT, fontWeight: 600, fontSize: 28, color: T.copper, letterSpacing: '-0.015em'}}>{c.metric.value}</div>
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  );

  // ─── PAIN ──────────────────────────────────────────────────
  const Pain = () => (
    <Chapter ch="Chapter 02" dek="On the mess most founders inherit from running their own tech function." dark>
      <h2 style={{
        margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 72,
        letterSpacing: '-0.04em', lineHeight: 0.98, maxWidth: 760,
      }}>
        You started this to<br/>
        build a business,<br/>
        not maintain a stack.
      </h2>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 56, marginTop: 72,
        borderTop: `1px solid ${T.border}`, paddingTop: 40,
      }}>
        <div>
          <div style={{fontFamily: MONO, fontSize: 10, color: T.copper, letterSpacing: '0.2em', marginBottom: 14, textTransform: 'uppercase'}}>i. the symptom</div>
          <p style={{margin: 0, fontSize: 16, color: T.inkDim, lineHeight: 1.65}}>
            Five contractors. Three Slack threads. A website that breaks on Friday afternoon with no one to call. The CRM never got wired to the calendar. The "AI thing" the last consultant set up still doesn't quite work — and you're not sure who knows what it does.
          </p>
        </div>
        <div>
          <div style={{fontFamily: MONO, fontSize: 10, color: T.copper, letterSpacing: '0.2em', marginBottom: 14, textTransform: 'uppercase'}}>ii. the cost</div>
          <p style={{margin: 0, fontSize: 16, color: T.inkDim, lineHeight: 1.65}}>
            Every tool was bought with optimism. Most of them sit in a tab nobody opens. The real cost of running tech across the business has quietly become the cost of having no one own it. The work doesn't compound — every cycle is a fresh start.
          </p>
        </div>
        <div>
          <div style={{fontFamily: MONO, fontSize: 10, color: T.copper, letterSpacing: '0.2em', marginBottom: 14, textTransform: 'uppercase'}}>iii. the move</div>
          <p style={{margin: 0, fontSize: 16, color: T.ink, lineHeight: 1.65}}>
            Axius is one operator who owns it. One team, one bill, one inbox. The stack is documented. The tickets are routed. The roadmap is written down. The work compounds because the same hand is on it month over month.
          </p>
        </div>
      </div>

      <div style={{marginTop: 36, fontFamily: MONO, fontSize: 11, color: T.inkFaint, letterSpacing: '0.06em'}}>
        ¹ See Chapter 03 for the four stages of how we operate.
      </div>
    </Chapter>
  );

  // ─── METHODOLOGY ───────────────────────────────────────────
  const Methodology = () => (
    <Chapter ch="Chapter 03" dek="In which we configure before we build.">
      <h2 style={{
        margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
        letterSpacing: '-0.035em', lineHeight: 1, maxWidth: 720,
      }}>
        Four stages.<br/>
        Each one named.<br/>
        Each one delivered.
      </h2>

      <div style={{marginTop: 64, borderTop: `2px solid ${T.ink}`}}>
        {window.AxiusMethodology.map((m, i) => (
          <div key={m.n} style={{
            display: 'grid', gridTemplateColumns: '90px 1fr 220px',
            gap: 60, padding: '40px 0', alignItems: 'baseline',
            borderBottom: `1px solid ${T.border}`,
          }}>
            <span style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 64, color: T.copper,
              letterSpacing: '-0.03em', lineHeight: 0.9,
            }}>{m.n}</span>
            <div>
              <h3 style={{margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 34, letterSpacing: '-0.022em', lineHeight: 1.05}}>{m.name}.</h3>
              <p style={{margin: '12px 0 0', fontSize: 17, color: T.inkDim, lineHeight: 1.55, maxWidth: 540}}>{m.body}</p>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{fontFamily: MONO, fontSize: 11, color: T.copper, letterSpacing: '0.06em'}}>{m.artifact}</div>
              <div style={{fontFamily: MONO, fontSize: 10, color: T.inkFaint, letterSpacing: '0.1em', marginTop: 6, textTransform: 'uppercase'}}>{m.timing}</div>
            </div>
          </div>
        ))}
      </div>
    </Chapter>
  );

  // ─── CATALOG ───────────────────────────────────────────────
  const Catalog = () => (
    <Chapter ch="Chapter 04" dek="A growing index of the work we operate. Updated monthly." dark>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64}}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
          letterSpacing: '-0.035em', lineHeight: 1, maxWidth: 600,
        }}>
          An index<br/>of the work.
        </h2>
        <div style={{textAlign: 'right'}}>
          <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 64, color: T.copper, letterSpacing: '-0.03em', lineHeight: 1}}>129</div>
          <div style={{fontFamily: MONO, fontSize: 11, color: T.inkMute, letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 8}}>workflows · nine categories</div>
        </div>
      </div>

      <div style={{borderTop: `2px solid ${T.ink}`}}>
        {window.AxiusCatalog.map((c, i) => (
          <div key={c.id} style={{
            display: 'grid', gridTemplateColumns: '70px 1fr 240px 80px 80px',
            gap: 32, padding: '28px 0', alignItems: 'baseline',
            borderBottom: `1px solid ${T.border}`,
          }}>
            <span style={{fontFamily: MONO, fontSize: 12, color: T.copper, letterSpacing: '0.06em'}}>{String(i+1).padStart(2, '0')}</span>
            <h3 style={{margin: 0, fontFamily: FONT, fontWeight: 600, fontSize: 28, letterSpacing: '-0.02em'}}>{c.name}</h3>
            <span style={{fontFamily: MONO, fontSize: 11, color: T.inkMute, letterSpacing: '0.04em'}}>{c.stack}</span>
            <span style={{fontFamily: MONO, fontSize: 12, color: T.inkDim, textAlign: 'right'}}>{c.count} entries</span>
            <span style={{fontFamily: MONO, fontSize: 14, color: T.copper, textAlign: 'right'}}>→</span>
          </div>
        ))}
      </div>

      {/* a few sample entries below */}
      <div style={{
        marginTop: 48, padding: 28, border: `1px solid ${T.border}`, background: T.bg,
      }}>
        <div style={{fontFamily: MONO, fontSize: 10, color: T.inkMute, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 18}}>
          Sample entries · automations
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 36px'}}>
          {[
            '001 · Stripe → Notion CRM sync',
            '002 · Inbound lead → calendar router',
            '003 · Missed-call recovery (auto-text)',
            '004 · DM auto-qualification',
            '005 · Quote → proposal pipeline',
            '006 · Onboarding email pipeline',
            '007 · Renewal & upsell automation',
            '008 · Win-back for churned customers',
          ].map((s, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              borderBottom: `1px dotted ${T.borderLo}`, paddingBottom: 8,
              fontFamily: MONO, fontSize: 12, color: T.inkDim,
            }}>
              <span>{s}</span>
              <span style={{color: T.copperSoft}}>1pt</span>
            </div>
          ))}
        </div>
      </div>
    </Chapter>
  );

  // ─── COMPARISON ────────────────────────────────────────────
  const Comparison = () => (
    <Chapter ch="Chapter 05" dek="Not a freelancer. Not a hire. A different shape entirely.">
      <h2 style={{
        margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 72,
        letterSpacing: '-0.04em', lineHeight: 0.98, maxWidth: 760,
      }}>
        A different<br/>
        <span style={{color: T.copper}}>shape</span> of help.
      </h2>

      <div style={{
        marginTop: 72, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48,
        borderTop: `1px solid ${T.border}`, paddingTop: 48,
      }}>
        {[
          { kicker: 'Option 01', name: 'Freelancer', body: 'Patch by patch. One skill, no ownership. When something breaks, you find a new one. The work doesn\'t compound.', price: '$3.5k – $8k', sub: 'per month, variable', dim: true },
          { kicker: 'Option 02', name: 'In-house hire', body: 'One person, one skill, salaried. A four-month search. Out sick on the day the website breaks. Loyal, expensive, single-threaded.', price: '$10k – $14k', sub: 'per month, plus benefits', dim: true },
          { kicker: 'Option 03', name: 'Axius', body: 'Full stack, owned. One bill, month-to-month. Documented. Always reachable. The same hand on it month after month.', price: 'From $1,000', sub: 'per month, three tiers' },
        ].map((c, i) => (
          <div key={i} style={{
            paddingLeft: i === 2 ? 24 : 0,
            borderLeft: i === 2 ? `2px solid ${T.copper}` : 'none',
          }}>
            <div style={{fontFamily: MONO, fontSize: 10, color: c.dim ? T.inkFaint : T.copper, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12}}>
              {c.kicker}
            </div>
            <h3 style={{margin: '0 0 18px', fontFamily: FONT, fontWeight: 700, fontSize: 36, letterSpacing: '-0.025em', color: c.dim ? T.inkDim : T.ink}}>
              {c.name}
            </h3>
            <p style={{margin: '0 0 28px', fontSize: 15, color: c.dim ? T.inkMute : T.inkDim, lineHeight: 1.6}}>{c.body}</p>
            <div style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 30, letterSpacing: '-0.02em',
              color: c.dim ? T.inkMute : T.copper,
            }}>{c.price}</div>
            <div style={{fontFamily: MONO, fontSize: 10, color: T.inkFaint, letterSpacing: '0.12em', marginTop: 6, textTransform: 'uppercase'}}>{c.sub}</div>
          </div>
        ))}
      </div>
    </Chapter>
  );

  // ─── PRICING ───────────────────────────────────────────────
  const Pricing = () => (
    <Chapter ch="Chapter 06" dek="Terms. One team. One bill. Month-to-month after 90 days." dark>
      <h2 style={{
        margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 64,
        letterSpacing: '-0.035em', lineHeight: 1, maxWidth: 760,
      }}>
        Three sizes of<br/>
        operating layer.
      </h2>

      <div style={{marginTop: 72}}>
        {window.AxiusPricing.map((p, i) => (
          <div key={p.id} style={{
            display: 'grid', gridTemplateColumns: '120px 1fr 1fr 240px',
            gap: 60, padding: '48px 0', alignItems: 'flex-start',
            borderTop: `1px solid ${T.border}`,
          }}>
            <span style={{
              fontFamily: MONO, fontSize: 10, color: T.copper, letterSpacing: '0.24em',
              textTransform: 'uppercase', paddingTop: 14,
            }}>Tier 0{i+1}</span>
            <div>
              <h3 style={{margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 48, letterSpacing: '-0.03em', lineHeight: 1}}>
                {p.name}.
              </h3>
              <p style={{margin: '14px 0 0', fontSize: 15, color: T.inkDim, lineHeight: 1.55, maxWidth: 420}}>{p.sub}</p>
              <div style={{marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 420}}>
                {[['capacity', `${p.points} pts active`], ['response', p.response], ['comms', p.comms], ['cadence', p.cadence]].map((r, j) => (
                  <div key={j}>
                    <div style={{fontFamily: MONO, fontSize: 9, color: T.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4}}>{r[0]}</div>
                    <div style={{fontFamily: FONT, fontSize: 13, color: T.ink}}>{r[1]}</div>
                  </div>
                ))}
              </div>
            </div>
            <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 6}}>
              {p.features.map((f, j) => (
                <li key={j} style={{display: 'flex', gap: 12, fontSize: 14, color: T.inkDim, lineHeight: 1.5}}>
                  <span style={{color: T.copper, fontFamily: MONO}}>→</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div style={{textAlign: 'right'}}>
              <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 56, color: T.copper, letterSpacing: '-0.035em', lineHeight: 0.95}}>${p.price.toLocaleString()}</div>
              <div style={{fontFamily: MONO, fontSize: 11, color: T.inkMute, marginTop: 6, letterSpacing: '0.08em'}}>per month</div>
              <div style={{fontFamily: MONO, fontSize: 10, color: T.inkFaint, marginTop: 14, letterSpacing: '0.08em'}}>+ ${p.setup.toLocaleString()} setup<br/>waived on close</div>
              <AxiusBtn copper={p.featured} primary={!p.featured} size="sm" style={{marginTop: 22}}>Book a call</AxiusBtn>
            </div>
          </div>
        ))}
      </div>
    </Chapter>
  );

  // ─── FOUNDER ───────────────────────────────────────────────
  const Founder = () => (
    <section data-screen-label="08 Founder" style={{
      borderTop: `1px solid ${T.border}`, display: 'grid', gridTemplateColumns: '1.1fr 1fr', minHeight: 700,
    }}>
      <div style={{position: 'relative', borderRight: `1px solid ${T.border}`}}>
        <img src={window.AxiusFounder.photo} alt="Andrés Toro" style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%',
          filter: 'contrast(1.05) saturate(0.9)',
        }}/>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(15,14,12,0.1) 0%, transparent 30%, rgba(15,14,12,0.6) 100%)',
        }}/>
        <div style={{position: 'absolute', bottom: 32, left: 32, right: 32}}>
          <div style={{fontFamily: MONO, fontSize: 10, color: T.copperSoft, letterSpacing: '0.2em', textTransform: 'uppercase'}}>Profile · Issue 01</div>
          <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 54, letterSpacing: '-0.03em', marginTop: 8, color: '#F5F1EA'}}>Andrés Toro</div>
        </div>
      </div>
      <div style={{padding: '88px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{fontFamily: MONO, fontSize: 10, color: T.copper, letterSpacing: '0.24em', textTransform: 'uppercase'}}>Chapter 07 · The Operator</div>
        <h2 style={{margin: '24px 0 22px', fontFamily: FONT, fontWeight: 700, fontSize: 56, letterSpacing: '-0.035em', lineHeight: 0.98}}>
          A note from<br/>
          the operator.
        </h2>
        <p style={{margin: '0 0 32px', fontSize: 18, color: T.inkDim, lineHeight: 1.6}}>
          {window.AxiusFounder.bio}
        </p>
        <p style={{margin: 0, fontSize: 17, color: T.ink, lineHeight: 1.5, fontStyle: 'italic', borderLeft: `2px solid ${T.copper}`, paddingLeft: 18, maxWidth: 460}}>
          {window.AxiusFounder.quote}
        </p>
        <div style={{marginTop: 40, paddingTop: 24, borderTop: `1px solid ${T.border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
          {window.AxiusFounder.facts.map((f, i) => (
            <div key={i}>
              <div style={{fontFamily: MONO, fontSize: 9, color: T.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4}}>{f.k}</div>
              <div style={{fontFamily: FONT, fontSize: 13, color: T.ink}}>{f.v}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop: 36, fontFamily: MONO, fontSize: 11, color: T.copperSoft, letterSpacing: '0.16em'}}>— Signed, A.T.</div>
      </div>
    </section>
  );

  // ─── FAQ ───────────────────────────────────────────────────
  const FAQ = () => (
    <Chapter ch="Appendix" dek="Common questions, answered plainly.">
      <h2 style={{margin: '0 0 12px', fontFamily: FONT, fontWeight: 700, fontSize: 56, letterSpacing: '-0.035em', lineHeight: 1}}>
        Questions, asked plainly.
      </h2>
      <div style={{marginTop: 56, borderTop: `2px solid ${T.ink}`}}>
        {window.AxiusFAQ.map((f, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '80px 1fr 1fr',
            gap: 32, padding: '28px 0', borderBottom: `1px solid ${T.border}`,
            alignItems: 'flex-start',
          }}>
            <span style={{fontFamily: MONO, fontSize: 11, color: T.copper, letterSpacing: '0.16em', paddingTop: 4}}>Q.{String(i+1).padStart(2, '0')}</span>
            <h3 style={{margin: 0, fontFamily: FONT, fontWeight: 600, fontSize: 22, letterSpacing: '-0.018em', lineHeight: 1.25}}>{f.q}</h3>
            <p style={{margin: 0, fontSize: 14, color: T.inkDim, lineHeight: 1.65}}>{f.a}</p>
          </div>
        ))}
      </div>
    </Chapter>
  );

  // ─── COLOPHON / CTA ────────────────────────────────────────
  const CTA = () => (
    <section data-screen-label="10 Colophon" style={{
      borderTop: `2px solid ${T.ink}`, padding: `120px ${pad}px 64px`,
      textAlign: 'center', background: T.surface,
    }}>
      <div style={{fontFamily: MONO, fontSize: 10, color: T.copperSoft, letterSpacing: '0.36em', textTransform: 'uppercase'}}>
        — End of Issue 01 —
      </div>
      <h2 style={{
        margin: '36px 0 24px', fontFamily: FONT, fontWeight: 800, fontSize: 144,
        letterSpacing: '-0.05em', lineHeight: 0.9,
      }}>
        Start<br/>
        <span style={{color: T.copper}}>the call.</span>
      </h2>
      <p style={{margin: '0 auto 36px', maxWidth: 500, fontSize: 17, color: T.inkDim, lineHeight: 1.55}}>
        Thirty minutes. You leave with a one-page audit either way.
      </p>
      <div style={{display: 'flex', gap: 14, justifyContent: 'center'}}>
        <AxiusBtn copper size="lg">Book a discovery call</AxiusBtn>
        <AxiusBtn size="lg">See the catalog</AxiusBtn>
      </div>
      <AxiusRule style={{margin: '80px auto 24px', maxWidth: 480, borderColor: T.borderLo}}/>
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap',
        fontFamily: MONO, fontSize: 10, color: T.inkFaint, letterSpacing: '0.2em', textTransform: 'uppercase',
      }}>
        <AxiusWordmark variant={wordmark} size={14}/>
        <span>axius.tech</span>
        <span>andres@axius.tech</span>
        <span>medellín · remote</span>
        <span>© 2026</span>
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

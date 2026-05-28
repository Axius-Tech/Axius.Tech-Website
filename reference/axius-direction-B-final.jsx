// ============================================================
// AXIUS · DIRECTION B · FINAL — EDITORIAL DOCUMENT (POLISHED)
// Same direction as B, executed to the README spec:
//   • Inter (chapter rhythm) + Source Serif 4 (institutional accents)
//   • Hero H1 at 96px, not 148
//   • Sticky 200px left nav rail with active-section tracking
//   • Italic Source Serif 4 on "the operator", "asked plainly",
//     "field notes", "conversation"
//   • Field Notes section (the institutional thought-leadership signal)
//   • Closing CTA: "Begin a / conversation." with ornament rules
//   • 128px section padding · refined micro-typography · proper colophon
// ============================================================

window.AxiusDirectionBFinal = function ({ wordmark = 'B' }) {
  const T = window.AxiusTokens;
  const { AxiusBtn, AxiusWordmark, AxiusRule } = window;

  const FONT = T.fontDisplay;
  const SERIF = '"Source Serif 4", "Source Serif Pro", Georgia, serif';
  const MONO = T.fontMono;

  // Layout: sticky 200px nav rail · 1240px main content area (1440 total)
  const RAIL = 200;
  const MAIN_PAD = 88;

  // ─── INLINE: Field Notes data ──────────────────────────────
  // (The README references window.AxiusFieldNotes but it isn't defined
  //  in axius-shared.jsx, so the polished version carries its own.)
  const fieldNotes = [
    {
      n: '01',
      title: 'Stacks accumulate. They do not arrive.',
      body: 'No founder ever sat down and chose their tech stack. It accumulates — one optimistic purchase at a time, until what runs the business is whichever consultant was loudest and whichever tab nobody had the energy to close. The stack you have right now is mostly a fossil record of decisions made under time pressure.',
    },
    {
      n: '02',
      title: 'The right SaaS is almost always the cheaper build.',
      body: 'Custom software is the expensive default. Most of the time, somebody already built what you need — better tested, better integrated, better documented — and rents it for less than a monthly coffee budget. The configuration discipline matters more than the building discipline.',
    },
    {
      n: '03',
      title: 'Onboarding is the engagement.',
      body: 'Most retainer relationships are lost in the first thirty days, not the twelfth. The shape of the onboarding — what gets named, what gets written down, what gets shipped quickly — is the shape the entire engagement will take afterwards. Days 1–14 are the most consequential weeks of the year.',
    },
    {
      n: '04',
      title: 'Cancellations precede churn by ninety days.',
      body: 'By the time a customer cancels, the decision is months old. The signal that they were leaving was present in their behavior — silent tickets, declining usage, a single skipped renewal — long before the email arrived. Most companies don\'t watch for it because nothing in their stack is shaped to notice.',
    },
    {
      n: '05',
      title: 'What you measure, you find.',
      body: 'Reporting infrastructure determines what a company knows about itself. A business that ships a weekly dashboard finds different problems than one that doesn\'t. Half the work of operating well is making the situation visible — once visible, the response usually picks itself.',
    },
    {
      n: '06',
      title: 'AI saves the operator, not the customer.',
      body: 'Almost every useful AI deployment we ship saves time inside the company, not for the customer. The customer-facing chatbot is the loudest application and almost never the most useful one. The quiet wins are in triage, transcription, and the dull internal work that used to fall through.',
    },
  ];

  // ─── Micro-helpers ─────────────────────────────────────────

  // Source Serif 4 italic accent (used on specific words per README spec)
  const Sigil = ({ children, size, color }) => (
    <span style={{
      fontFamily: SERIF,
      fontStyle: 'italic',
      fontWeight: 500,
      fontSize: size || 'inherit',
      color: color || 'inherit',
      letterSpacing: '-0.005em',
    }}>{children}</span>
  );

  // Eyebrow line — small-caps Inter, 11px, copper or ink-mute
  const Eyebrow = ({ children, copper, faint, style = {} }) => (
    <div style={{
      fontFamily: FONT,
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: faint ? T.inkFaint : copper ? T.copper : T.inkMute,
      ...style,
    }}>{children}</div>
  );

  // Chapter kicker (mono, copper) — sits above each chapter H2
  const ChapterKicker = ({ chapter, dek, style = {} }) => (
    <div style={{display: 'flex', alignItems: 'baseline', gap: 18, ...style}}>
      <span style={{
        fontFamily: MONO, fontSize: 11, color: T.copper,
        letterSpacing: '0.24em', textTransform: 'uppercase',
      }}>{chapter}</span>
      {dek && (
        <span style={{
          fontFamily: FONT, fontSize: 13, color: T.inkMute,
          lineHeight: 1.5, letterSpacing: '-0.005em',
        }}>{dek}</span>
      )}
    </div>
  );

  // Section wrapper — 128px padding rhythm per README spec
  const Section = ({ id, screen, children, dark, noTopBorder, style = {} }) => (
    <section
      id={id}
      data-screen-label={screen}
      style={{
        padding: `128px ${MAIN_PAD}px`,
        background: dark ? T.surface : 'transparent',
        borderTop: noTopBorder ? 'none' : `1px solid ${T.border}`,
        ...style,
      }}>
      {children}
    </section>
  );

  // Section nav data (drives the rail + IntersectionObserver)
  const sections = [
    { id: 'overview',   chapter: '00', label: 'Overview' },
    { id: 'commitments',chapter: '01', label: 'Commitments' },
    { id: 'mess',       chapter: '02', label: 'The Mess' },
    { id: 'method',     chapter: '03', label: 'Method' },
    { id: 'catalog',    chapter: '04', label: 'Catalog' },
    { id: 'comparison', chapter: '05', label: 'Comparison' },
    { id: 'pricing',    chapter: '06', label: 'Pricing' },
    { id: 'founder',    chapter: '07', label: 'Founder' },
    { id: 'fieldnotes', chapter: '08', label: 'Field Notes' },
    { id: 'faq',        chapter: '—',  label: 'Appendix' },
  ];

  // ─── NAV RAIL ──────────────────────────────────────────────
  const NavRail = () => {
    const [active, setActive] = React.useState('overview');

    React.useEffect(() => {
      const els = sections
        .map(s => document.getElementById(s.id))
        .filter(Boolean);
      if (!els.length) return;
      const io = new IntersectionObserver((entries) => {
        // Pick the entry whose center is closest to the top third of the viewport
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.5] });
      els.forEach(el => io.observe(el));
      return () => io.disconnect();
    }, []);

    return (
      <aside style={{
        gridColumn: '1', gridRow: '1',
        position: 'sticky', top: 0,
        height: '100vh',
        padding: '32px 24px 32px 32px',
        borderRight: `1px solid ${T.border}`,
        background: T.bg,
        display: 'flex', flexDirection: 'column',
        zIndex: 5,
      }}>
        <a href="#overview" style={{textDecoration: 'none'}}>
          <AxiusWordmark variant={wordmark} size={16}/>
        </a>

        <div style={{
          marginTop: 28, paddingTop: 0,
        }}>
          <Eyebrow faint>Issue 01 · 2026</Eyebrow>
          <div style={{
            marginTop: 6,
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
            fontSize: 13, color: T.inkMute, letterSpacing: '-0.005em',
          }}>Practice Note</div>
        </div>

        <nav style={{
          marginTop: 36,
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          <Eyebrow faint style={{marginBottom: 16}}>— Contents —</Eyebrow>
          {sections.map(s => {
            const isActive = active === s.id;
            return (
              <a key={s.id} href={`#${s.id}`} style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr',
                gap: 10,
                alignItems: 'baseline',
                padding: '7px 0',
                textDecoration: 'none',
                color: isActive ? T.copper : T.inkDim,
                transition: 'color .15s ease',
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 10,
                  color: isActive ? T.copper : T.inkFaint,
                  letterSpacing: '0.16em',
                }}>{s.chapter}</span>
                <span style={{
                  fontFamily: FONT, fontSize: 13, fontWeight: 500,
                  letterSpacing: '-0.005em',
                  color: isActive ? T.copper : T.inkDim,
                }}>{s.label}</span>
              </a>
            );
          })}
        </nav>

        <div style={{marginTop: 'auto', paddingTop: 32}}>
          <a href="#cta" style={{textDecoration: 'none'}}>
            <Eyebrow copper>
              → Book a call
            </Eyebrow>
          </a>
        </div>
      </aside>
    );
  };

  // ─── 00 · HERO ─────────────────────────────────────────────
  const Hero = () => (
    <section id="overview" data-screen-label="00 Hero" style={{
      padding: `132px ${MAIN_PAD}px 96px`,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 72,
      }}>
        <Eyebrow>Axius — An Independent Technology Operations Practice</Eyebrow>
        <Eyebrow copper>Practice Note №01 · 2026</Eyebrow>
      </div>

      <h1 style={{
        margin: 0, fontFamily: FONT, fontWeight: 800,
        fontSize: 96, lineHeight: 1.0, letterSpacing: '-0.04em',
        maxWidth: 980,
      }}>
        Run<br/>
        your business.<br/>
        <span style={{color: T.inkMute}}>Not your tech.</span>
      </h1>

      <div style={{
        marginTop: 64,
        borderTop: `1px solid ${T.border}`,
        paddingTop: 36,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 56,
        alignItems: 'flex-end',
      }}>
        <p style={{
          margin: 0, maxWidth: 560,
          fontSize: 18, color: T.inkDim, lineHeight: 1.55,
          letterSpacing: '-0.003em',
        }}>
          We run the tech side of your business — websites, automations,
          AI tools, integrations, all of it — for one monthly fee.{' '}
          <Sigil>The team you'd hire if you knew where to look.</Sigil>
        </p>
        <div style={{display: 'flex', gap: 14, flexShrink: 0}}>
          <AxiusBtn copper size="lg">Book a discovery call</AxiusBtn>
          <AxiusBtn size="lg">See the catalog</AxiusBtn>
        </div>
      </div>
    </section>
  );

  // ─── 01 · COMMITMENTS ──────────────────────────────────────
  const Commitments = () => (
    <Section id="commitments" screen="01 Commitments">
      <ChapterKicker chapter="— Commitments —"
        dek="What we say we will always do, every month, without exception."/>
      <h2 style={{
        margin: '32px 0 0', fontFamily: FONT, fontWeight: 700,
        fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.0,
        maxWidth: 760,
      }}>
        Five things we<br/>always do.
      </h2>

      <ol style={{margin: '72px 0 0', padding: 0, listStyle: 'none'}}>
        {window.AxiusCommitments.map((c, i) => (
          <li key={c.n} style={{
            display: 'grid', gridTemplateColumns: '88px 1fr 200px',
            columnGap: 48, padding: '32px 0',
            borderTop: i === 0 ? `2px solid ${T.ink}` : `1px solid ${T.border}`,
            alignItems: 'baseline',
          }}>
            <span style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 44,
              color: T.copper, letterSpacing: '-0.028em', lineHeight: 1,
            }}>{c.n}</span>
            <div>
              <h3 style={{
                margin: '0 0 12px', fontFamily: FONT, fontWeight: 600,
                fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.2,
              }}>{c.title}</h3>
              <p style={{
                margin: 0, fontSize: 15, color: T.inkDim,
                lineHeight: 1.6, maxWidth: 520, letterSpacing: '-0.003em',
              }}>{c.body}</p>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{
                fontFamily: MONO, fontSize: 10, color: T.inkFaint,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                marginBottom: 6,
              }}>{c.metric.label}</div>
              <div style={{
                fontFamily: FONT, fontWeight: 600, fontSize: 22,
                color: T.copper, letterSpacing: '-0.012em',
              }}>{c.metric.value}</div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );

  // ─── 02 · THE MESS ─────────────────────────────────────────
  const Mess = () => (
    <Section id="mess" screen="02 The Mess" dark>
      <ChapterKicker chapter="— Diagnostic —"
        dek="On the mess most founders inherit from running their own tech function."/>
      <h2 style={{
        margin: '32px 0 0', fontFamily: FONT, fontWeight: 700,
        fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.05,
        maxWidth: 880,
      }}>
        You started this to{' '}
        <span style={{
          background: `linear-gradient(transparent 64%, ${T.copperFaint} 64%)`,
          paddingBottom: 2,
        }}>build a business</span>,<br/>
        not maintain a stack.
      </h2>

      <div style={{
        marginTop: 64,
        borderTop: `1px solid ${T.border}`,
        paddingTop: 40,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 56,
      }}>
        {[
          ['i.',   'The symptom',
            'Five contractors. Three Slack threads. A website that breaks on Friday afternoon with no one to call. The CRM never got wired to the calendar. The "AI thing" the last consultant set up still doesn\'t quite work — and you\'re not sure who knows what it does.'],
          ['ii.',  'The cost',
            'Every tool was bought with optimism. Most of them sit in a tab nobody opens. The real cost of running tech across the business has quietly become the cost of having no one own it. The work doesn\'t compound — every cycle is a fresh start.'],
          ['iii.', 'The move',
            'Axius is one operator who owns it. One team, one bill, one inbox. The stack is documented. The tickets are routed. The roadmap is written down. The work compounds because the same hand is on it month over month.',
            true],
        ].map(([n, label, body, emphasis], idx) => (
          <div key={idx}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 12,
              marginBottom: 18,
            }}>
              <span style={{
                fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
                fontSize: 16, color: T.copper,
              }}>{n}</span>
              <span style={{
                fontFamily: MONO, fontSize: 10, color: T.inkMute,
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>{label}</span>
            </div>
            <p style={{
              margin: 0, fontSize: 15,
              color: emphasis ? T.ink : T.inkDim,
              lineHeight: 1.65, letterSpacing: '-0.003em',
            }}>{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );

  // ─── 03 · METHODOLOGY ──────────────────────────────────────
  const Method = () => (
    <Section id="method" screen="03 Method">
      <ChapterKicker chapter="— Method —"
        dek="We configure before we build, and write down what we did."/>
      <h2 style={{
        margin: '32px 0 0', fontFamily: FONT, fontWeight: 700,
        fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.05,
        maxWidth: 760,
      }}>
        Four stages. Each one named.<br/>Each one delivered.
      </h2>

      <div style={{marginTop: 72, borderTop: `2px solid ${T.ink}`}}>
        {window.AxiusMethodology.map((m, i) => (
          <div key={m.n} style={{
            display: 'grid', gridTemplateColumns: '72px 1fr 200px',
            columnGap: 48, padding: '36px 0',
            borderBottom: `1px solid ${T.border}`,
            alignItems: 'baseline',
          }}>
            <span style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 44,
              color: T.copper, letterSpacing: '-0.028em', lineHeight: 1,
            }}>{m.n}</span>
            <div>
              <h3 style={{
                margin: 0, fontFamily: FONT, fontWeight: 600,
                fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1.1,
              }}>{m.name}.</h3>
              <p style={{
                margin: '12px 0 0', fontSize: 16, color: T.inkDim,
                lineHeight: 1.55, maxWidth: 520, letterSpacing: '-0.003em',
              }}>{m.body}</p>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{
                fontFamily: MONO, fontSize: 11, color: T.copperSoft,
                letterSpacing: '0.04em',
              }}>{m.artifact}</div>
              <div style={{
                fontFamily: MONO, fontSize: 10, color: T.inkFaint,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                marginTop: 6,
              }}>{m.timing}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );

  // ─── 04 · CATALOG ──────────────────────────────────────────
  const Catalog = () => (
    <Section id="catalog" screen="04 Catalog" dark>
      <ChapterKicker chapter="— Catalog —"
        dek="A growing index of the work we operate. Updated monthly."/>
      <div style={{
        marginTop: 32, display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', gap: 60,
      }}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700,
          fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.0,
          maxWidth: 540,
        }}>
          An index<br/>of the work.
        </h2>
        <div style={{textAlign: 'right'}}>
          <div style={{
            fontFamily: FONT, fontWeight: 700, fontSize: 64,
            color: T.copper, letterSpacing: '-0.03em', lineHeight: 0.95,
          }}>{window.AxiusCatalog.reduce((s, c) => s + c.count, 0)}</div>
          <Eyebrow faint style={{marginTop: 10}}>
            workflows · {window.AxiusCatalog.length} categories
          </Eyebrow>
        </div>
      </div>

      <div style={{marginTop: 64, borderTop: `2px solid ${T.ink}`}}>
        {window.AxiusCatalog.map((c, i) => (
          <div key={c.id} style={{
            display: 'grid',
            gridTemplateColumns: '56px 1fr 280px 100px 40px',
            columnGap: 32, padding: '26px 0',
            borderBottom: `1px solid ${T.border}`,
            alignItems: 'baseline',
          }}>
            <span style={{
              fontFamily: MONO, fontSize: 11, color: T.copper,
              letterSpacing: '0.04em',
            }}>{String(i+1).padStart(2, '0')}</span>
            <h3 style={{
              margin: 0, fontFamily: FONT, fontWeight: 600, fontSize: 22,
              letterSpacing: '-0.018em', color: T.ink,
            }}>{c.name}</h3>
            <span style={{
              fontFamily: MONO, fontSize: 11, color: T.inkMute,
              letterSpacing: '0.04em',
            }}>{c.stack}</span>
            <span style={{
              fontFamily: MONO, fontSize: 11, color: T.inkDim,
              letterSpacing: '0.06em', textAlign: 'right',
            }}>{c.count} entries</span>
            <span style={{
              fontFamily: MONO, fontSize: 14, color: T.copper,
              textAlign: 'right',
            }}>→</span>
          </div>
        ))}
      </div>

      {/* sample entries from the real data — first three categories' first sample */}
      <div style={{marginTop: 48}}>
        <Eyebrow style={{marginBottom: 18}}>— A few sample entries —</Eyebrow>
        <div style={{
          border: `1px solid ${T.border}`, background: T.bg,
        }}>
          {window.AxiusCatalog.slice(0, 6).map((c, i) => {
            const s = c.samples[0];
            return (
              <div key={c.id} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 220px 80px',
                gap: 24, padding: '18px 24px',
                borderBottom: i < 5 ? `1px solid ${T.borderLo}` : 'none',
                alignItems: 'baseline',
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 11, color: T.copper,
                  letterSpacing: '0.04em',
                }}>{s.n}</span>
                <div>
                  <div style={{
                    fontFamily: FONT, fontSize: 15, fontWeight: 500,
                    color: T.ink, letterSpacing: '-0.008em',
                  }}>{s.name}</div>
                  <div style={{
                    fontFamily: MONO, fontSize: 11, color: T.inkMute,
                    letterSpacing: '0.04em', marginTop: 4,
                  }}>{s.sub}</div>
                </div>
                <span style={{
                  fontFamily: MONO, fontSize: 10, color: T.inkFaint,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                }}>{c.name}</span>
                <span style={{
                  fontFamily: MONO, fontSize: 12, color: T.copperSoft,
                  letterSpacing: '0.04em', textAlign: 'right',
                }}>{s.pts} pt{s.pts > 1 ? 's' : ''}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );

  // ─── 05 · COMPARISON ───────────────────────────────────────
  const Comparison = () => (
    <Section id="comparison" screen="05 Comparison">
      <ChapterKicker chapter="— Comparison —"
        dek="Not a freelancer. Not a hire. A different shape entirely."/>
      <h2 style={{
        margin: '32px 0 0', fontFamily: FONT, fontWeight: 700,
        fontSize: 56, letterSpacing: '-0.035em', lineHeight: 1.0,
        maxWidth: 780,
      }}>
        A different{' '}
        <span style={{color: T.copper}}>shape</span> of help.
      </h2>

      <div style={{
        marginTop: 72,
        borderTop: `1px solid ${T.border}`,
        paddingTop: 48,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48,
      }}>
        {[
          {
            kicker: 'Option 01',
            name: 'Freelancer',
            body: 'Patch by patch. One skill, no ownership. When something breaks, you find a new one. The work doesn\'t compound.',
            price: '$3.5k – $8k',
            sub: 'per month, variable',
            dim: true,
          },
          {
            kicker: 'Option 02',
            name: 'In-house hire',
            body: 'One person, one skill, salaried. A four-month search. Out sick on the day the website breaks. Loyal, expensive, single-threaded.',
            price: '$10k – $14k',
            sub: 'per month, plus benefits',
            dim: true,
          },
          {
            kicker: 'Option 03',
            name: 'Axius',
            body: 'Full stack, owned. One bill, month-to-month. Documented. Always reachable. The same hand on it, month after month.',
            price: 'From $1,000',
            sub: 'per month, three tiers',
            featured: true,
          },
        ].map((c, i) => (
          <div key={i} style={{
            paddingLeft: c.featured ? 24 : 0,
            borderLeft: c.featured ? `2px solid ${T.copper}` : 'none',
          }}>
            <Eyebrow copper={c.featured} faint={c.dim}>{c.kicker}</Eyebrow>
            <h3 style={{
              margin: '14px 0 16px', fontFamily: FONT, fontWeight: 700,
              fontSize: 32, letterSpacing: '-0.025em',
              color: c.dim ? T.inkDim : T.ink,
            }}>{c.name}</h3>
            <p style={{
              margin: '0 0 28px', fontSize: 15,
              color: c.dim ? T.inkMute : T.inkDim,
              lineHeight: 1.6, letterSpacing: '-0.003em',
            }}>{c.body}</p>
            <div style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 28,
              letterSpacing: '-0.02em',
              color: c.featured ? T.copper : T.inkMute,
            }}>{c.price}</div>
            <Eyebrow faint style={{marginTop: 8}}>{c.sub}</Eyebrow>
          </div>
        ))}
      </div>
    </Section>
  );

  // ─── 06 · PRICING ──────────────────────────────────────────
  const Pricing = () => (
    <Section id="pricing" screen="06 Pricing" dark>
      <ChapterKicker chapter="— Pricing —"
        dek="Terms. One team. One bill. Month-to-month after 90 days."/>
      <h2 style={{
        margin: '32px 0 0', fontFamily: FONT, fontWeight: 700,
        fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.0,
        maxWidth: 760,
      }}>
        Three sizes of<br/>operating layer.
      </h2>

      <p style={{
        margin: '24px 0 0', maxWidth: 580,
        fontSize: 15, color: T.inkMute, lineHeight: 1.6,
      }}>
        Capacity measured in points — each workflow's cost is listed in the catalog.
        Setup fee waived on same-day close.
      </p>

      <div style={{marginTop: 64, borderTop: `2px solid ${T.ink}`}}>
        {window.AxiusPricing.map((p, i) => (
          <div key={p.id} style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr 1fr 220px',
            columnGap: 40, padding: '40px 0',
            borderBottom: `1px solid ${T.border}`,
            background: p.featured ? T.copperFaint : 'transparent',
            paddingLeft: p.featured ? 24 : 0,
            paddingRight: p.featured ? 24 : 0,
            alignItems: 'flex-start',
          }}>
            <div>
              <div style={{
                fontFamily: MONO, fontSize: 10, color: T.copper,
                letterSpacing: '0.22em', textTransform: 'uppercase',
              }}>Tier {String(i+1).padStart(2, '0')}</div>
              {p.featured && (
                <div style={{
                  marginTop: 8,
                  fontFamily: SERIF, fontStyle: 'italic', fontSize: 12,
                  color: T.copperSoft, letterSpacing: '-0.003em',
                }}>most chosen</div>
              )}
            </div>

            <div>
              <h3 style={{
                margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 36,
                letterSpacing: '-0.025em', lineHeight: 1,
              }}>{p.name}.</h3>
              <p style={{
                margin: '12px 0 22px', fontSize: 14, color: T.inkDim,
                lineHeight: 1.55, maxWidth: 380,
              }}>{p.sub}</p>

              {/* capacity + response + comms + cadence */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
                maxWidth: 380,
              }}>
                <div>
                  <Eyebrow faint style={{marginBottom: 4}}>Capacity</Eyebrow>
                  <a href="#catalog" style={{
                    fontFamily: FONT, fontSize: 14, color: T.ink,
                    textDecoration: 'underline',
                    textUnderlineOffset: 4,
                    textDecorationStyle: 'dashed',
                    textDecorationColor: T.copper,
                    letterSpacing: '-0.005em',
                  }}>{p.points} pts active</a>
                  <div style={{marginTop: 2}}>
                    <a href="#catalog" style={{
                      fontFamily: MONO, fontSize: 10, color: T.copper,
                      letterSpacing: '0.12em', textDecoration: 'none',
                    }}>see catalog →</a>
                  </div>
                </div>
                <div>
                  <Eyebrow faint style={{marginBottom: 4}}>Response</Eyebrow>
                  <div style={{fontFamily: FONT, fontSize: 14, color: T.ink}}>{p.response}</div>
                </div>
                <div>
                  <Eyebrow faint style={{marginBottom: 4}}>Comms</Eyebrow>
                  <div style={{fontFamily: FONT, fontSize: 14, color: T.ink}}>{p.comms}</div>
                </div>
                <div>
                  <Eyebrow faint style={{marginBottom: 4}}>Cadence</Eyebrow>
                  <div style={{fontFamily: FONT, fontSize: 14, color: T.ink}}>{p.cadence}</div>
                </div>
              </div>
            </div>

            <ul style={{
              margin: 0, padding: '4px 0 0', listStyle: 'none',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              {p.features.map((f, j) => (
                <li key={j} style={{
                  display: 'flex', gap: 12,
                  fontSize: 14, color: T.inkDim, lineHeight: 1.5,
                  letterSpacing: '-0.003em',
                }}>
                  <span style={{color: T.copper, fontFamily: MONO}}>→</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div style={{textAlign: 'right'}}>
              <div style={{
                fontFamily: FONT, fontWeight: 700, fontSize: 40,
                color: T.copper, letterSpacing: '-0.03em', lineHeight: 1,
              }}>${p.price.toLocaleString()}</div>
              <Eyebrow faint style={{marginTop: 6}}>per month</Eyebrow>
              <div style={{
                marginTop: 14,
                fontFamily: MONO, fontSize: 10, color: T.inkFaint,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                lineHeight: 1.5,
              }}>+ ${p.setup.toLocaleString()} setup<br/>waived on close</div>
              <AxiusBtn copper={p.featured} primary={!p.featured} size="sm" style={{marginTop: 22}}>
                Book a call
              </AxiusBtn>
            </div>
          </div>
        ))}
      </div>

      {/* Founder Track — inline callout, not a separate section */}
      <div style={{
        marginTop: 56,
        display: 'grid', gridTemplateColumns: '180px 1fr', gap: 36,
        padding: '32px 32px',
        border: `1px solid ${T.border}`,
        borderLeft: `2px solid ${T.copper}`,
      }}>
        <div>
          <Eyebrow copper>Founder Track</Eyebrow>
          <div style={{
            marginTop: 8,
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
            fontSize: 16, color: T.ink, letterSpacing: '-0.005em',
          }}>building, not running</div>
        </div>
        <p style={{
          margin: 0, fontSize: 15, color: T.inkDim, lineHeight: 1.65,
          letterSpacing: '-0.003em',
        }}>
          Same retention, different framing. If you're shipping a product
          from scratch — SaaS, app, platform — the same point capacity goes
          toward one bigger build plus the workflows that surround it.{' '}
          <strong style={{color: T.ink, fontWeight: 600}}>Builder</strong>{' '}
          <span style={{color: T.inkMute}}>·</span>{' '}
          inside Equipo — MVP in 3–4 months.{' '}
          <strong style={{color: T.ink, fontWeight: 600}}>Partner</strong>{' '}
          <span style={{color: T.inkMute}}>·</span>{' '}
          inside Departamento — substantial product in 4–6 months.
        </p>
      </div>
    </Section>
  );

  // ─── 07 · FOUNDER (full-bleed) ─────────────────────────────
  const Founder = () => (
    <section id="founder" data-screen-label="07 Founder" style={{
      borderTop: `1px solid ${T.border}`,
      display: 'grid', gridTemplateColumns: '1.1fr 1fr',
      minHeight: 660,
    }}>
      <div style={{position: 'relative', overflow: 'hidden'}}>
        <img src={window.AxiusFounder.photo} alt="Andrés Toro" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: '50% 30%',
          filter: 'contrast(1.05) saturate(0.92)',
        }}/>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(15,14,12,0.05) 0%, transparent 35%, rgba(15,14,12,0.62) 100%)',
        }}/>
        <div style={{position: 'absolute', bottom: 36, left: 36, right: 36}}>
          <Eyebrow copper style={{color: T.copperSoft}}>Profile · Issue 01</Eyebrow>
          <div style={{
            marginTop: 10,
            fontFamily: SERIF, fontWeight: 500, fontSize: 44,
            letterSpacing: '-0.008em', lineHeight: 1.0,
            color: '#F5F1EA',
          }}>Andrés Toro</div>
        </div>
      </div>

      <div style={{
        padding: '100px 80px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <Eyebrow copper>— The Operator —</Eyebrow>
        <h2 style={{
          margin: '22px 0 24px',
          fontFamily: FONT, fontWeight: 700, fontSize: 44,
          letterSpacing: '-0.028em', lineHeight: 1.05,
        }}>
          A note from<br/>
          <Sigil size={44} color={T.ink}>the operator</Sigil>.
        </h2>
        <p style={{
          margin: '0 0 32px', fontSize: 17, color: T.inkDim, lineHeight: 1.65,
          letterSpacing: '-0.003em', maxWidth: 480,
        }}>
          {window.AxiusFounder.bio}
        </p>
        <p style={{
          margin: 0, maxWidth: 460,
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
          fontSize: 18, color: T.ink, lineHeight: 1.5,
          borderLeft: `2px solid ${T.copper}`, paddingLeft: 18,
          letterSpacing: '-0.005em',
        }}>
          I won't make you the bottleneck in your own company.
        </p>
        <div style={{
          marginTop: 44, paddingTop: 24,
          borderTop: `1px solid ${T.border}`,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
          maxWidth: 540,
        }}>
          {window.AxiusFounder.facts.map((f, i) => (
            <div key={i}>
              <Eyebrow faint>{f.k}</Eyebrow>
              <div style={{
                marginTop: 4,
                fontFamily: FONT, fontSize: 13, color: T.ink,
                letterSpacing: '-0.003em',
              }}>{f.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ─── 08 · FIELD NOTES ──────────────────────────────────────
  const FieldNotes = () => (
    <Section id="fieldnotes" screen="08 Field Notes">
      <ChapterKicker chapter="— Field Notes —"
        dek="Observations from running technology inside small businesses."/>
      <div style={{
        marginTop: 32,
        display: 'grid', gridTemplateColumns: '1fr auto',
        gap: 60, alignItems: 'flex-end',
      }}>
        <h2 style={{
          margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: 50,
          letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: 760,
        }}>
          Six <Sigil size={50}>field notes</Sigil><br/>
          from running technology<br/>
          inside small businesses.
        </h2>
        <p style={{
          margin: 0, maxWidth: 240,
          fontSize: 13, color: T.inkMute, lineHeight: 1.55,
          letterSpacing: '-0.003em',
        }}>
          Full essays published quarterly. Updated as observation accumulates.
        </p>
      </div>

      <div style={{
        marginTop: 72,
        borderTop: `2px solid ${T.ink}`,
        display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 0,
      }}>
        {(() => {
          const cells = [];
          for (let i = 0; i < fieldNotes.length; i += 2) {
            const left = fieldNotes[i];
            const right = fieldNotes[i + 1];
            const isLast = i + 2 >= fieldNotes.length;
            cells.push(
              <React.Fragment key={i}>
                {/* left cell */}
                <NoteCell n={left} isLast={isLast}/>
                {/* divider */}
                <div style={{
                  background: T.border,
                  borderBottom: isLast ? 'none' : 'none',
                }}/>
                {/* right cell */}
                <NoteCell n={right} isLast={isLast}/>
              </React.Fragment>
            );
          }
          return cells;
        })()}
      </div>
    </Section>
  );

  const NoteCell = ({ n, isLast }) => (
    <div style={{
      padding: '40px 40px 44px 0',
      borderBottom: isLast ? 'none' : `1px solid ${T.border}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 14,
        marginBottom: 14,
      }}>
        <span style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
          fontSize: 18, color: T.copper, letterSpacing: '-0.005em',
        }}>№ {n.n}</span>
        <span style={{flex: 1, height: 1, background: T.borderLo}}/>
      </div>
      <h3 style={{
        margin: '0 0 18px',
        fontFamily: SERIF, fontWeight: 500, fontSize: 24,
        letterSpacing: '-0.005em', lineHeight: 1.25,
        color: T.ink,
      }}>{n.title}</h3>
      <p style={{
        margin: '0 0 24px',
        fontFamily: SERIF, fontWeight: 400, fontSize: 15,
        color: T.inkDim, lineHeight: 1.7, letterSpacing: 0,
        maxWidth: 540,
      }}>{n.body}</p>
      <a href="#" style={{
        fontFamily: FONT, fontSize: 11, fontWeight: 500,
        color: T.copper, letterSpacing: '0.22em', textTransform: 'uppercase',
        textDecoration: 'none',
      }}>Read in full →</a>
    </div>
  );

  // ─── APPENDIX · FAQ ────────────────────────────────────────
  const FAQ = () => {
    const [open, setOpen] = React.useState(0);
    return (
      <Section id="faq" screen="Appendix FAQ" dark>
        <ChapterKicker chapter="— Letters & Replies —"
          dek="The six questions an operator asks first."/>
        <h2 style={{
          margin: '32px 0 0', fontFamily: FONT, fontWeight: 700, fontSize: 48,
          letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: 760,
        }}>
          Questions, <Sigil size={48}>asked plainly</Sigil>.
        </h2>

        <div style={{
          marginTop: 64,
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '0 56px',
          borderTop: `2px solid ${T.ink}`,
        }}>
          {window.AxiusFAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                borderBottom: `1px solid ${T.border}`,
                padding: '24px 0',
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  all: 'unset', cursor: 'pointer', width: '100%',
                  display: 'grid', gridTemplateColumns: '40px 1fr 24px',
                  gap: 16, alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: MONO, fontSize: 11, color: T.copper,
                    letterSpacing: '0.16em',
                  }}>Q.{String(i+1).padStart(2, '0')}</span>
                  <span style={{
                    fontFamily: FONT, fontWeight: 600, fontSize: 18,
                    color: isOpen ? T.ink : T.inkDim,
                    letterSpacing: '-0.018em', lineHeight: 1.3,
                  }}>{f.q}</span>
                  <span style={{
                    fontFamily: MONO, fontSize: 16, color: T.copper,
                    textAlign: 'right',
                  }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div style={{
                    display: 'grid', gridTemplateColumns: '40px 1fr 24px',
                    gap: 16, marginTop: 16,
                  }}>
                    <span/>
                    <p style={{
                      margin: 0,
                      fontFamily: SERIF, fontSize: 15, color: T.inkDim,
                      lineHeight: 1.7, letterSpacing: 0, maxWidth: 480,
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

  // ─── CTA · COLOPHON ────────────────────────────────────────
  const CTA = () => (
    <section id="cta" data-screen-label="Colophon CTA" style={{
      borderTop: `1px solid ${T.border}`,
      padding: `132px ${MAIN_PAD}px 64px`,
      background: T.bg,
      textAlign: 'center',
    }}>
      {/* ornament row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 14, marginBottom: 48,
      }}>
        <span style={{
          width: 28, height: 1, background: T.copperSoft,
        }}/>
        <Eyebrow copper style={{color: T.copperSoft}}>
          End of Practice Note №01
        </Eyebrow>
        <span style={{
          width: 28, height: 1, background: T.copperSoft,
        }}/>
      </div>

      <h2 style={{
        margin: 0, fontFamily: FONT, fontWeight: 800, fontSize: 96,
        letterSpacing: '-0.045em', lineHeight: 0.92,
      }}>
        Begin a<br/>
        <Sigil size={96} color={T.copper}>conversation</Sigil>.
      </h2>

      <p style={{
        margin: '36px auto 0', maxWidth: 480,
        fontSize: 17, color: T.inkDim, lineHeight: 1.55,
        letterSpacing: '-0.003em',
      }}>
        Thirty minutes. You leave with a one-page audit either way.
      </p>

      <div style={{
        display: 'flex', gap: 14, justifyContent: 'center', marginTop: 40,
      }}>
        <AxiusBtn copper size="lg">Schedule the conversation →</AxiusBtn>
      </div>

      {/* divider */}
      <div style={{
        margin: '96px auto 28px', maxWidth: 480,
        borderTop: `1px solid ${T.borderLo}`,
      }}/>

      {/* utility row */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 28, flexWrap: 'wrap',
        fontFamily: MONO, fontSize: 10, color: T.inkFaint,
        letterSpacing: '0.2em', textTransform: 'uppercase',
      }}>
        <AxiusWordmark variant={wordmark} size={13}/>
        <span>axius.tech</span>
        <span style={{color: T.copperSoft}}>·</span>
        <span>andres@axius.tech</span>
        <span style={{color: T.copperSoft}}>·</span>
        <span>medellín · remote</span>
        <span style={{color: T.copperSoft}}>·</span>
        <span>© 2026</span>
      </div>
    </section>
  );

  // ─── PAGE ASSEMBLY ─────────────────────────────────────────
  return (
    <div style={{
      background: T.bg, color: T.ink, fontFamily: FONT,
      minHeight: '100vh',
    }}>
      <main style={{minWidth: 0}}>
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
      </main>
    </div>
  );
};

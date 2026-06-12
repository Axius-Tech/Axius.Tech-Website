// ════════════════════════════════════════════════════════════════
// AXIUS APP — sections + composition root for the 2026 rebuild.
// Every section is built from AX primitives (tokens file) and AXD
// data. One container, one type scale, one motion language.
//
// Section order:
//   Intro (typographic entry) → Nav → Hero(+chat) → 01 Diagnostic →
//   02 Method → 03 How It Runs → 04 Catalog → 05 Pricing(+Founder
//   Track) → 06 Operator → 07 Client Stories → 08 Questions →
//   09 Begin → Footer · floating Dispatch
// ════════════════════════════════════════════════════════════════

(function () {
  const { T, TYPE, L, DISPLAY, MONO, EASE } = AX;
  const {
    Container, Eyebrow, SectionHead, Btn, Card, Dot, Reveal, CountUp,
    Wordmark, Orb, Grain,
  } = AX;
  const AXD = window.AXD;

  // Section shell — identical vertical rhythm everywhere.
  const Section = ({ id, dispatchId, band, children, style = {} }) => (
    <section id={id} data-dispatch-id={dispatchId || id} style={{
      padding: `${L.sectionY}px 0`,
      borderTop: `1px solid ${T.line}`,
      background: band ? T.panel : 'transparent',
      ...style,
    }}>
      <Container>{children}</Container>
    </section>
  );

  // ─── INTRO — typographic entry (no industries) ───────────────
  const Intro = ({ onDone }) => {
    const I = AXD.intro;
    const frames = I.frames;
    const totalMs = frames[frames.length - 1].atMs + I.holdMs;
    const [now, setNow] = React.useState(0);

    React.useEffect(() => {
      let raf;
      const start = performance.now();
      const tick = (t) => {
        const elapsed = t - start;
        setNow(elapsed);
        if (elapsed < totalMs) raf = requestAnimationFrame(tick);
        else onDone();
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [totalMs, onDone]);

    React.useEffect(() => {
      const onKey = (e) => { if (e.key === 'Escape') onDone(); };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [onDone]);

    const active = frames.reduce((acc, f) => (now >= f.atMs ? f : acc), frames[0]);

    return (
      <div role="dialog" aria-label="Axius intro" style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: T.paper, color: T.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <Orb top="50%" right="auto" size={720} style={{ left: '50%', transform: 'translate(-50%, -50%)' }}/>
        <Grain id="axGrainIntro" opacity={0.65}/>

        <div style={{
          position: 'absolute', top: 28, left: 32, zIndex: 1,
          ...TYPE.label, color: T.inkDim,
        }}>{I.loading}</div>

        <button type="button" aria-label="Skip intro" onClick={onDone}
          style={{
            position: 'absolute', top: 22, right: 32, zIndex: 1,
            appearance: 'none', cursor: 'pointer',
            background: 'transparent', border: `1px solid ${T.lineHi}`,
            padding: '10px 16px', ...TYPE.label, color: T.inkDim,
            transition: `all .2s ${EASE}`,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = T.ember; e.currentTarget.style.borderColor = T.ember; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = T.inkDim; e.currentTarget.style.borderColor = T.lineHi; }}>
          {I.skip}
        </button>

        <div key={active.atMs} style={{
          position: 'relative', zIndex: 1,
          maxWidth: 980, padding: '0 32px', textAlign: 'center',
          ...TYPE.h1, color: T.ink,
          animation: `axFadeUp .5s ${EASE}`,
        }}>
          {active.text}
        </div>

        <div aria-hidden style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          height: 2, background: T.line, zIndex: 1,
        }}>
          <div style={{
            height: '100%', width: `${Math.min(100, (now / totalMs) * 100)}%`,
            background: T.ember, transition: 'width .08s linear',
          }}/>
        </div>
      </div>
    );
  };

  // ─── NAV ─────────────────────────────────────────────────────
  const NavLink = ({ label, id }) => {
    const [h, setH] = React.useState(false);
    return (
      <a href={`#${id}`}
        onClick={(e) => { e.preventDefault(); AX.scrollToId(id); }}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', textDecoration: 'none',
          fontFamily: DISPLAY, fontWeight: 500, fontSize: 14,
          letterSpacing: '-0.005em',
          color: h ? T.ink : T.inkDim,
          transition: `color .2s ${EASE}`,
          padding: '4px 0',
        }}>
        {label}
        <span aria-hidden style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 1,
          background: T.ember, transformOrigin: 'left',
          transform: `scaleX(${h ? 1 : 0})`,
          transition: `transform .25s ${EASE}`,
        }}/>
      </a>
    );
  };

  const Nav = () => (
    <nav aria-label="Primary" style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(245,243,238,0.86)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${T.line}`,
    }}>
      <Container>
        <div style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center', gap: 32, padding: '16px 0',
        }}>
          <a href="#" aria-label="Axius — home"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ textDecoration: 'none' }}>
            <Wordmark size={18}/>
          </a>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
            {AXD.nav.links.map(l => <NavLink key={l.id} {...l}/>)}
          </div>
          <Btn primary size="sm" onClick={() => AX.openBooking(AXD.begin.bookingSubject)}>{AXD.nav.cta}</Btn>
        </div>
      </Container>
    </nav>
  );

  // ─── HERO — H1 + subhead + in-hero operator chat ─────────────
  // WorkflowSheet — graph-paper pipeline sketch peeking behind the
  // operator card. Mono annotations (the italic serif is gone).
  const WorkflowSheet = ({ style = {} }) => (
    <div aria-hidden style={{
      position: 'absolute', width: 290, height: 392,
      background: T.surface, border: `1px solid ${T.line}`,
      padding: '18px 20px',
      boxShadow: '0 8px 24px rgba(21,19,14,0.06)',
      ...style,
    }}>
      <svg viewBox="0 0 260 360" width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          <pattern id="axSheetGrid" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" stroke="rgba(21,19,14,0.07)" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="260" height="360" fill="url(#axSheetGrid)"/>
        <rect x="40" y="22" width="92" height="34" fill={T.surface} stroke={T.ink} strokeWidth="1"/>
        <text x="86" y="43" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1" fill={T.ink}>INTAKE</text>
        <line x1="86" y1="56" x2="86" y2="78" stroke={T.ink} strokeWidth="0.8"/>
        <rect x="40" y="78" width="92" height="34" fill={T.surface} stroke={T.ink} strokeWidth="1"/>
        <text x="86" y="99" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1" fill={T.ink}>REVIEW</text>
        <path d="M132 80 L150 70 L160 70" stroke={T.ink} strokeWidth="0.7" fill="none"/>
        <path d="M132 95 L150 95 L160 95" stroke={T.ink} strokeWidth="0.7" fill="none"/>
        <path d="M132 110 L150 120 L160 120" stroke={T.ink} strokeWidth="0.7" fill="none"/>
        <circle cx="148" cy="95" r="3.5" fill={T.ember}/>
        <text x="166" y="73"  fontFamily="Geist Mono" fontSize="10" letterSpacing="0.5" fill={T.inkDim}>clarify</text>
        <text x="166" y="98"  fontFamily="Geist Mono" fontSize="10" letterSpacing="0.5" fill={T.inkDim}>prioritize</text>
        <text x="166" y="123" fontFamily="Geist Mono" fontSize="10" letterSpacing="0.5" fill={T.inkDim}>architect</text>
        <line x1="86" y1="112" x2="86" y2="138" stroke={T.ink} strokeWidth="0.8"/>
        <rect x="40" y="138" width="92" height="34" fill={T.surface} stroke={T.ink} strokeWidth="1"/>
        <text x="86" y="159" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1" fill={T.ink}>SCOPE</text>
        <line x1="86" y1="172" x2="86" y2="208" stroke={T.ink} strokeWidth="0.8"/>
        <rect x="40" y="208" width="92" height="34" fill={T.surface} stroke={T.ember} strokeWidth="1.6"/>
        <text x="86" y="229" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1" fill={T.ember}>BUILD</text>
        <path d="M132 225 L150 225 L160 225" stroke={T.ember} strokeWidth="0.8" fill="none"/>
        <text x="166" y="229" fontFamily="Geist Mono" fontSize="10" letterSpacing="0.5" fill={T.ember}>operate</text>
        <line x1="86" y1="242" x2="86" y2="278" stroke={T.ink} strokeWidth="0.8"/>
        <rect x="40" y="278" width="92" height="34" fill={T.surface} stroke={T.ink} strokeWidth="1"/>
        <text x="86" y="299" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="600" letterSpacing="1" fill={T.ink}>DEPLOY</text>
      </svg>
    </div>
  );

  const OperatorChatCard = () => {
    const H = AXD.hero;
    const photo = '/assets/andres-toro.jpg';
    return (
      <div style={{
        position: 'relative', background: T.surface,
        border: `1px solid ${T.lineHi}`,
        width: '100%', height: 560,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        <div style={{
          padding: '13px 18px', borderBottom: `1px solid ${T.line}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0,
        }}>
          <Eyebrow color={T.ember}>{H.opLabel}</Eyebrow>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Dot pulse/>
            <Eyebrow color={T.inkDim}>{H.opOnline}</Eyebrow>
          </div>
        </div>
        <div style={{
          padding: '14px 18px', borderBottom: `1px solid ${T.line}`,
          display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0,
        }}>
          <div style={{
            width: 44, height: 44, overflow: 'hidden', flexShrink: 0,
            border: `1px solid ${T.line}`, background: T.panel,
          }}>
            <img src={photo} alt="Andrés Toro" width="44" height="44" style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%',
              filter: 'grayscale(1) contrast(1.04)', display: 'block',
            }}/>
          </div>
          <div>
            <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 17, letterSpacing: '-0.015em', color: T.ink }}>{H.opName}</div>
            <div style={{ ...TYPE.micro, color: T.inkMute, marginTop: 3 }}>{H.opRole}</div>
          </div>
        </div>
        <AXChat.AskAndres/>
      </div>
    );
  };

  const Hero = () => {
    const H = AXD.hero;
    const [titleHover, setTitleHover] = React.useState(false);
    const [mouseReady, setMouseReady] = React.useState(false);
    React.useEffect(() => {
      const onMove = () => setMouseReady(true);
      window.addEventListener('mousemove', onMove, { once: true });
      return () => window.removeEventListener('mousemove', onMove);
    }, []);
    const hov = mouseReady && titleHover;

    return (
      <header id="hero" data-dispatch-id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <Orb top="36%" right="6%" size={520}/>
        <Grain id="axGrainHero" opacity={0.7}/>
        <Container style={{ position: 'relative', zIndex: 1, paddingTop: 88, paddingBottom: 112 }}>

          {/* Practice line · accepting pill */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: 56, gap: 24, flexWrap: 'wrap',
          }}>
            <Eyebrow>{H.practiceLine}</Eyebrow>
            <div style={{ ...TYPE.label }}>
              <span style={{ color: hov ? T.ink : T.inkMute, transition: `color .35s ${EASE}` }}>{H.acceptingPre}</span>
              <span style={{ color: T.inkFaint, margin: '0 0.5em' }}>·</span>
              <span style={{
                position: 'relative', display: 'inline-block',
                color: hov ? T.ember : T.inkMute, transition: `color .35s ${EASE}`,
              }}>
                {H.acceptingAccent}
                <span aria-hidden style={{
                  position: 'absolute', left: 0, right: 0, bottom: -4, height: 1,
                  background: T.ember, transformOrigin: 'right',
                  transform: `scaleX(${hov ? 1 : 0})`,
                  transition: `transform .4s ${EASE}`,
                }}/>
              </span>
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1.12fr 1fr',
            columnGap: 72, rowGap: 32, alignItems: 'start',
          }}>
            {/* H1 */}
            <h1
              onMouseEnter={() => setTitleHover(true)}
              onMouseLeave={() => setTitleHover(false)}
              style={{
                gridColumn: 1, gridRow: 1, margin: 0,
                ...TYPE.h1, color: T.ink, cursor: 'default',
              }}>
              <span style={{
                display: 'inline-block', transformOrigin: '0% 50%',
                transform: hov ? 'scale(1.03)' : 'scale(1)',
                transition: `transform .55s ${EASE}`,
              }}>{H.h1Line1}<br/>{H.h1Line2}</span><br/>
              <span style={{
                position: 'relative', display: 'inline-block',
                color: hov ? '#FFFFFF' : T.inkMute,
                padding: '0.04em 0.14em 0.08em', marginLeft: '-0.14em',
                whiteSpace: 'nowrap',
                transition: `color .45s ${EASE}`,
              }}>
                <span aria-hidden style={{
                  position: 'absolute', inset: 0, background: T.ember,
                  opacity: hov ? 1 : 0,
                  transform: hov ? 'scaleX(1)' : 'scaleX(0.94)',
                  transformOrigin: '0% 50%',
                  transition: `opacity .5s ${EASE}, transform .55s ${EASE}`,
                  zIndex: 0,
                }}/>
                <span style={{ position: 'relative', zIndex: 1 }}>{H.h1Line3}</span>
              </span>
            </h1>

            {/* Right column — sheet peeking behind the operator chat */}
            <div style={{
              gridColumn: 2, gridRow: '1 / span 2',
              position: 'relative', minWidth: 0,
            }}>
              <WorkflowSheet style={{ top: 56, left: -52, transform: 'rotate(-3.5deg)', zIndex: 1 }}/>
              <div style={{ position: 'relative', zIndex: 10, minWidth: 0 }}>
                <OperatorChatCard/>
              </div>
            </div>

            {/* Subhead + CTAs */}
            <div style={{ gridColumn: 1, gridRow: 2 }}>
              <p style={{ margin: 0, maxWidth: 540, ...TYPE.bodyL, color: T.inkDim }}>
                {H.subPre}<span style={{ color: T.ink, fontWeight: 500 }}>{H.subEm}</span>
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <Btn primary size="lg" onClick={() => AX.openBooking(AXD.begin.bookingSubject)}>{H.cta1}</Btn>
                <Btn size="lg" onClick={() => AX.scrollToId('catalog')}>{H.cta2}</Btn>
              </div>
            </div>
          </div>
        </Container>
      </header>
    );
  };

  // ─── 01 · DIAGNOSTIC — three questions, then contact ─────────
  const Chip = ({ label, sub, active, onClick }) => {
    const [h, setH] = React.useState(false);
    return (
      <button type="button" onClick={onClick} aria-pressed={!!active}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          appearance: 'none', cursor: 'pointer', textAlign: 'left',
          background: active ? T.ink : T.surface,
          color: active ? '#FFFFFF' : T.ink,
          border: `1px solid ${active ? T.ink : (h ? T.ember : T.line)}`,
          padding: '18px 20px',
          transition: `all .25s ${EASE}`,
          transform: h && !active ? 'translateY(-2px)' : 'translateY(0)',
        }}>
        <span style={{ display: 'block', fontFamily: DISPLAY, fontWeight: 500, fontSize: 15, lineHeight: 1.35, letterSpacing: '-0.008em' }}>{label}</span>
        {sub && <span style={{
          display: 'block', marginTop: 8, ...TYPE.micro,
          color: active ? 'rgba(255,255,255,0.7)' : (h ? T.ember : T.inkMute),
          transition: `color .25s ${EASE}`,
        }}>{sub}</span>}
      </button>
    );
  };

  const Field = ({ label, placeholder, value, onChange, type = 'text', invalid }) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
      <span style={{ ...TYPE.micro, color: invalid ? T.stRed : T.inkMute }}>{label}{invalid ? ' — required' : ''}</span>
      <input type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: 'none', background: T.surface,
          border: `1px solid ${invalid ? T.stRed : T.lineHi}`,
          padding: '13px 14px', fontFamily: DISPLAY, fontSize: 15,
          color: T.ink, letterSpacing: '-0.005em', outline: 'none', width: '100%',
        }}/>
    </label>
  );

  const Diagnostic = () => {
    const DG = AXD.diagnostic;
    const [challenge, setChallenge] = React.useState(null);
    const [outcome, setOutcome] = React.useState(null);
    const [name, setName] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [note, setNote] = React.useState('');
    const [tried, setTried] = React.useState(false);
    const [state, setState] = React.useState('idle'); // idle | sending | done

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const valid = name.trim().length > 1 && company.trim().length > 1 && emailOk;
    const picked = (list, id) => (list.find(x => x.id === id) || {});

    const submit = async (e) => {
      e.preventDefault();
      setTried(true);
      if (!valid || state === 'sending') return;
      setState('sending');
      const ch = picked(DG.challenges, challenge).label || '—';
      const oc = picked(DG.outcomes, outcome);
      const esc = AX.escHtml;
      const html =
        `📋 <b>Diagnostic from axius.tech</b>\n\n` +
        `<b>Name:</b> ${esc(name)}\n` +
        `<b>Business:</b> ${esc(company)}\n` +
        `<b>Email:</b> ${esc(email)}\n\n` +
        `<b>Heaviest:</b> ${esc(ch)}\n` +
        `<b>Scope:</b> ${esc(oc.label || '—')}${oc.sub ? ` (${esc(oc.sub)})` : ''}\n` +
        (note.trim() ? `<b>Note:</b> ${esc(note.trim())}\n` : '') +
        `\n<b>Time:</b> ${new Date().toISOString()}`;
      const sent = await AX.notifyTelegram(html);
      if (!sent) {
        const body =
          `Name: ${name}\nBusiness: ${company}\nEmail: ${email}\n` +
          `Heaviest: ${ch}\nScope: ${oc.label || '—'}\n` +
          (note.trim() ? `Note: ${note.trim()}\n` : '');
        AX.openEmail('Axius — diagnostic', body);
      }
      setState('done');
    };

    const recommended = outcome ? picked(DG.outcomes, outcome) : null;

    return (
      <Section id="diagnostic" band>
        <SectionHead eyebrow={DG.eyebrow}
          prefix={DG.titlePrefix} accent={DG.titleAccent} suffix={DG.titleSuffix}
          sub={DG.sub}/>

        {state === 'done' ? (
          <Reveal>
            <div style={{
              background: T.surface, border: `1px solid ${T.line}`,
              borderLeft: `2px solid ${T.ember}`,
              padding: 40, maxWidth: 720,
            }}>
              <h3 style={{ margin: 0, ...TYPE.h3, color: T.ink }}>{DG.successTitle}</h3>
              <p style={{ margin: '14px 0 0', ...TYPE.body, color: T.inkDim, maxWidth: 520 }}>{DG.successBody}</p>
              {recommended && recommended.sub && (
                <div style={{ marginTop: 28, paddingTop: 22, borderTop: `1px solid ${T.line}` }}>
                  <Eyebrow style={{ marginBottom: 8 }}>{DG.recommendLabel}</Eyebrow>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 19, color: T.ember, letterSpacing: '-0.015em' }}>
                    {recommended.sub}
                  </div>
                </div>
              )}
              <div style={{ marginTop: 28 }}>
                <Btn primary onClick={() => AX.openBooking(AXD.begin.bookingSubject)}>{DG.bookCta}</Btn>
              </div>
            </div>
          </Reveal>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {/* Q1 */}
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
                <span style={{ ...TYPE.label, color: T.ember }}>Q.01</span>
                <h3 style={{ margin: 0, ...TYPE.h3, color: T.ink }}>{DG.q1}</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: L.gap }}>
                {DG.challenges.map(c => (
                  <Chip key={c.id} label={c.label} active={challenge === c.id}
                    onClick={() => setChallenge(c.id)}/>
                ))}
              </div>
            </Reveal>

            {/* Q2 */}
            {challenge && (
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
                  <span style={{ ...TYPE.label, color: T.ember }}>Q.02</span>
                  <h3 style={{ margin: 0, ...TYPE.h3, color: T.ink }}>{DG.q2}</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: L.gap }}>
                  {DG.outcomes.map(o => (
                    <Chip key={o.id} label={o.label} sub={o.sub} active={outcome === o.id}
                      onClick={() => setOutcome(o.id)}/>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Q3 — contact */}
            {challenge && outcome && (
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
                  <span style={{ ...TYPE.label, color: T.ember }}>Q.03</span>
                  <h3 style={{ margin: 0, ...TYPE.h3, color: T.ink }}>{DG.q3}</h3>
                </div>
                <div style={{
                  background: T.surface, border: `1px solid ${T.line}`, padding: 32,
                  display: 'flex', flexDirection: 'column', gap: 20,
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: L.gap }}>
                    <Field label={DG.fields.name.label} placeholder={DG.fields.name.placeholder}
                      value={name} onChange={setName} invalid={tried && name.trim().length <= 1}/>
                    <Field label={DG.fields.company.label} placeholder={DG.fields.company.placeholder}
                      value={company} onChange={setCompany} invalid={tried && company.trim().length <= 1}/>
                    <Field label={DG.fields.email.label} placeholder={DG.fields.email.placeholder}
                      value={email} onChange={setEmail} type="email" invalid={tried && !emailOk}/>
                  </div>
                  <Field label={DG.fields.note.label} placeholder={DG.fields.note.placeholder}
                    value={note} onChange={setNote}/>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 4 }}>
                    <Btn primary onClick={submit}>{state === 'sending' ? 'Sending…' : DG.submit}</Btn>
                    <span style={{ ...TYPE.micro, color: T.inkMute }}>Replies within one business day</span>
                  </div>
                </div>
              </Reveal>
            )}
          </form>
        )}
      </Section>
    );
  };

  // ─── 02 · THE METHOD — four stages with artifact chips ───────
  const MethodCard = ({ m, i }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', background: T.surface,
          border: `1px solid ${h ? T.ember : T.line}`,
          padding: L.cardPad,
          display: 'flex', flexDirection: 'column', gap: 18, minHeight: 320,
          transform: h ? 'translateY(-3px)' : 'translateY(0)',
          transition: `all .35s ${EASE}`,
        }}>
        <span aria-hidden style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: h ? 'calc(100% + 2px)' : 0,
          background: T.ember, transition: `width .45s ${EASE}`,
        }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ ...TYPE.label, color: T.ember }}>{AXD.method.stageLabel} {m.n}</span>
          <span style={{ ...TYPE.micro, color: T.inkMute }}>{m.timing}</span>
        </div>
        <h3 style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 600, fontSize: 30, letterSpacing: '-0.028em', color: T.ink }}>
          {m.name}<span style={{ color: T.ember }}>.</span>
        </h3>
        <p style={{ margin: 0, flex: 1, ...TYPE.small, color: T.inkDim, whiteSpace: 'pre-line', lineHeight: 1.7 }}>{m.body}</p>
        <div style={{
          background: h ? T.emberSoft : T.panel,
          border: `1px solid ${h ? T.ember : T.line}`,
          padding: '11px 14px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          transition: `all .3s ${EASE}`,
        }}>
          <span style={{
            fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: '0.04em',
            color: h ? T.ember : T.ink, transition: `color .3s ${EASE}`,
          }}>{m.artifact}</span>
          <span style={{ ...TYPE.micro, fontSize: 9, color: T.inkMute }}>{AXD.method.artifactLabel}</span>
        </div>
      </div>
    );
  };

  const Method = () => (
    <Section id="method">
      <SectionHead eyebrow={AXD.method.eyebrow}
        prefix={AXD.method.titlePrefix} accent={AXD.method.titleAccent} suffix={AXD.method.titleSuffix}/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: L.gap }}>
        {AXD.method.stages.map((m, i) => (
          <Reveal key={m.n} delay={i * 90}><MethodCard m={m} i={i}/></Reveal>
        ))}
      </div>
    </Section>
  );

  // ─── 03 · HOW IT RUNS — three pillars ────────────────────────
  const HowItRuns = () => (
    <Section id="how" band>
      <SectionHead eyebrow={AXD.howItRuns.eyebrow}
        prefix={AXD.howItRuns.titlePrefix} accent={AXD.howItRuns.titleAccent} suffix={AXD.howItRuns.titleSuffix}/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: L.gap }}>
        {AXD.howItRuns.pillars.map((p, i) => (
          <Reveal key={p.eyebrow} delay={i * 90}>
            <Card style={{ minHeight: 340, display: 'flex', flexDirection: 'column', gap: 18, height: '100%' }}>
              <Eyebrow color={T.inkMute}>{p.eyebrow}</Eyebrow>
              <h3 style={{ margin: 0, ...TYPE.h3, color: T.ink }}>{p.title}</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {p.bullets.map(b => (
                  <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                    <span aria-hidden style={{ fontFamily: MONO, fontSize: 11, color: T.ember }}>+</span>
                    <span style={{ ...TYPE.small, color: T.inkDim }}>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );

  // ─── 04 · THE CATALOG — calm two-panel index ─────────────────
  const CatRow = ({ c, i, active, onClick }) => {
    const [h, setH] = React.useState(false);
    return (
      <button type="button" onClick={onClick}
        aria-pressed={active}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          appearance: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
          position: 'relative',
          background: active ? T.surface : 'transparent',
          border: `1px solid ${active ? T.line : 'transparent'}`,
          borderBottom: `1px solid ${T.line}`,
          padding: '16px 18px 16px 22px',
          transition: `all .25s ${EASE}`,
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
        <span aria-hidden style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
          background: T.ember,
          transform: `scaleY(${active ? 1 : 0})`, transformOrigin: 'top',
          transition: `transform .3s ${EASE}`,
        }}/>
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <span style={{ ...TYPE.micro, color: active || h ? T.ember : T.inkMute, transition: `color .25s ${EASE}` }}>
            CAT.{String(i + 1).padStart(2, '0')}
          </span>
          <span style={{ ...TYPE.micro, color: T.inkMute }}>{c.count}</span>
        </span>
        <span style={{
          fontFamily: DISPLAY, fontWeight: 500, fontSize: 17, letterSpacing: '-0.012em',
          color: active || h ? T.ink : T.inkDim, transition: `color .25s ${EASE}`,
        }}>{c.name}</span>
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.04em', color: T.inkMute }}>{c.stack}</span>
      </button>
    );
  };

  const SampleRow = ({ s, last }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          display: 'grid', gridTemplateColumns: '48px 1.3fr 1fr 122px',
          gap: 18, alignItems: 'center',
          padding: '15px 22px',
          borderBottom: last ? 'none' : `1px solid ${T.line}`,
          background: h ? T.emberSoft : 'transparent',
          transition: `background .25s ${EASE}`,
        }}>
        <span style={{ fontFamily: MONO, fontSize: 11, color: h ? T.ember : T.inkMute, transition: `color .25s ${EASE}` }}>{s.n}</span>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', fontFamily: DISPLAY, fontWeight: 500, fontSize: 15, letterSpacing: '-0.008em', color: T.ink }}>{s.name}</span>
          <span style={{ display: 'block', marginTop: 3, fontFamily: MONO, fontSize: 10, letterSpacing: '0.04em', color: T.inkMute }}>{s.sub}</span>
        </span>
        <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 13, letterSpacing: '-0.005em', color: s.impact ? T.ember : T.inkFaint }}>
          {s.impact || '—'}
        </span>
        <span style={{ ...TYPE.micro, fontSize: 9, color: T.inkMute, textAlign: 'right', whiteSpace: 'nowrap' }}>
          {s.pts} pt{s.pts > 1 ? 's' : ''} · {s.time.replace('~ ', '')}
        </span>
      </div>
    );
  };

  const Catalog = () => {
    const CG = AXD.catalog;
    const [activeId, setActiveId] = React.useState(CG.categories[0].id);
    const active = CG.categories.find(c => c.id === activeId) || CG.categories[0];
    const remaining = Math.max(0, active.count - active.samples.length);

    return (
      <Section id="catalog">
        {/* Head row: title left · counter right */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 48,
          alignItems: 'end', marginBottom: L.headGap,
        }}>
          <div>
            <Eyebrow style={{ marginBottom: 24 }}>{CG.eyebrow}</Eyebrow>
            <h2 style={{ margin: 0, ...TYPE.h2, color: T.ink }}>
              {CG.titlePrefix}<span style={{ color: T.ember }}>{CG.titleAccent}</span>{CG.titleSuffix}
            </h2>
          </div>
          <div style={{ textAlign: 'right', paddingBottom: 6 }}>
            <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 64, letterSpacing: '-0.05em', lineHeight: 1, color: T.ink }}>
              <CountUp to={CG.totalWorkflows}/>
            </div>
            <div style={{ ...TYPE.label, color: T.inkMute, marginTop: 8 }}>
              {CG.workflowsLabel} · {CG.categoriesLabel}
            </div>
          </div>
        </div>

        {/* Capacity explainer — calm, always visible */}
        <Reveal>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48,
            padding: '24px 0 28px', borderTop: `1px solid ${T.line}`, marginBottom: 40,
          }}>
            <div>
              <Eyebrow color={T.ember} style={{ marginBottom: 12 }}>{CG.capacityTitle}</Eyebrow>
              <p style={{ margin: 0, ...TYPE.body, color: T.inkDim, maxWidth: 560 }}>{CG.capacityBody}</p>
            </div>
            <div style={{ alignSelf: 'end' }}>
              {CG.capacityExamples.map((ex, i) => (
                <div key={ex.name} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '7px 0',
                  borderBottom: i < CG.capacityExamples.length - 1 ? `1px solid ${T.line}` : 'none',
                }}>
                  <span style={{ ...TYPE.small, color: T.inkDim }}>{ex.name}</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: T.ink }}>{ex.pts} pt{ex.pts > 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Two-panel index */}
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: L.gap, alignItems: 'start' }}>
          <div role="tablist" aria-label="Workflow categories" style={{ borderTop: `1px solid ${T.line}` }}>
            {CG.categories.map((c, i) => (
              <CatRow key={c.id} c={c} i={i} active={c.id === activeId} onClick={() => setActiveId(c.id)}/>
            ))}
          </div>

          <div style={{
            position: 'sticky', top: 96,
            background: T.surface, border: `1px solid ${T.line}`,
          }}>
            <div style={{
              padding: '16px 22px', borderBottom: `1px solid ${T.line}`, background: T.panel,
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16,
            }}>
              <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 17, letterSpacing: '-0.012em', color: T.ink }}>
                {active.name}
              </span>
              <span style={{ ...TYPE.micro, color: T.inkMute }}>{active.samples.length} of {active.count} shown</span>
            </div>
            {/* Column heads */}
            <div aria-hidden style={{
              display: 'grid', gridTemplateColumns: '48px 1.3fr 1fr 122px', gap: 18,
              padding: '9px 22px', borderBottom: `1px solid ${T.line}`,
            }}>
              <span style={{ ...TYPE.micro, fontSize: 9, color: T.inkFaint }}>#</span>
              <span style={{ ...TYPE.micro, fontSize: 9, color: T.inkFaint }}>workflow</span>
              <span style={{ ...TYPE.micro, fontSize: 9, color: T.inkFaint }}>{CG.impactLabel}</span>
              <span style={{ ...TYPE.micro, fontSize: 9, color: T.inkFaint, textAlign: 'right' }}>weight · setup</span>
            </div>
            <div key={active.id} style={{ animation: `axFadeUp .4s ${EASE}` }}>
              {active.samples.map((s, i) => (
                <SampleRow key={s.n} s={s} last={i === active.samples.length - 1}/>
              ))}
            </div>
            <div style={{
              padding: '14px 22px', borderTop: `1px solid ${T.line}`, background: T.panel,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
            }}>
              <span style={{ ...TYPE.micro, color: T.inkMute }}>{CG.moreOnRequest(remaining)}</span>
              <a href={`mailto:${AX.EMAIL}?subject=${encodeURIComponent('Axius — full catalog index')}`}
                style={{
                  ...TYPE.micro, color: T.ember, textDecoration: 'none', fontWeight: 600,
                }}>{CG.requestIndex} →</a>
            </div>
          </div>
        </div>
      </Section>
    );
  };

  // ─── 05 · PRICING — $2,500 floor + Founder Track strip ───────
  const PricingCard = ({ p }) => {
    const [h, setH] = React.useState(false);
    const cfg = window.AxiusConfig || {};
    const checkout = (cfg.checkoutUrls || {})[p.id] || null;
    const PR = AXD.pricing;
    const onPrimary = () => {
      if (checkout) window.open(checkout, '_blank', 'noopener');
      else AX.openBooking(PR.tierSubject(p.name));
    };
    return (
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', background: T.surface,
          border: `1px solid ${p.featured ? T.ink : (h ? T.ember : T.line)}`,
          padding: 32,
          display: 'flex', flexDirection: 'column', gap: 20,
          transform: h ? 'translateY(-3px)' : 'translateY(0)',
          transition: `all .35s ${EASE}`,
        }}>
        <span aria-hidden style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: (h || p.featured) ? 'calc(100% + 2px)' : 0,
          background: T.ember, transition: `width .45s ${EASE}`,
        }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Eyebrow color={T.inkMute}>Tier</Eyebrow>
          {p.featured && <span style={{ ...TYPE.micro, color: T.ember, fontWeight: 600 }}>Recommended</span>}
        </div>
        <div>
          <h3 style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 600, fontSize: 28, letterSpacing: '-0.025em', color: T.ink }}>{p.name}</h3>
          <p style={{ margin: '8px 0 0', ...TYPE.small, color: T.inkDim }}>{p.sub}</p>
        </div>
        <div style={{ paddingBottom: 20, borderBottom: `1px solid ${T.line}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 40, letterSpacing: '-0.04em', color: T.ink }}>{p.priceMonthly}</span>
            {p.priceUnit && <span style={{ ...TYPE.label, color: T.inkMute }}>{p.priceUnit}</span>}
          </div>
          <div style={{ marginTop: 6, ...TYPE.micro, color: T.inkMute }}>{p.priceSetup}</div>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
          {p.features.map(f => (
            <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
              <span aria-hidden style={{ fontFamily: MONO, fontSize: 11, color: T.ember }}>+</span>
              <span style={{ ...TYPE.small, color: T.inkDim }}>{f}</span>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn primary={p.featured} onClick={onPrimary} style={{ justifyContent: 'center' }}>
            {checkout ? PR.getStarted : PR.bookCustom}
          </Btn>
          {checkout && (
            <button type="button" onClick={() => AX.openBooking(PR.tierSubject(p.name))}
              style={{
                appearance: 'none', background: 'transparent', border: 'none',
                cursor: 'pointer', padding: 0, ...TYPE.micro, color: T.inkMute,
                transition: `color .2s ${EASE}`, textAlign: 'center',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = T.ember}
              onMouseLeave={(e) => e.currentTarget.style.color = T.inkMute}>
              {PR.bookFirst}
            </button>
          )}
        </div>
      </div>
    );
  };

  const FounderTrack = () => {
    const FT = AXD.founderTrack;
    return (
      <div style={{
        marginTop: 56, paddingTop: 40, borderTop: `1px solid ${T.line}`,
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center',
      }}>
        <div>
          <Eyebrow color={T.inkMute} style={{ marginBottom: 14 }}>{FT.eyebrow}</Eyebrow>
          <h3 style={{ margin: 0, ...TYPE.h3, color: T.ink }}>{FT.title}</h3>
          <p style={{ margin: '12px 0 0', ...TYPE.body, color: T.inkDim, maxWidth: 560 }}>{FT.body}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
            {FT.chips.map(c => (
              <span key={c} style={{
                border: `1px solid ${T.lineHi}`, padding: '4px 10px',
                ...TYPE.micro, color: T.inkDim,
              }}>{c}</span>
            ))}
          </div>
        </div>
        <Btn href={FT.href}>{FT.cta}</Btn>
      </div>
    );
  };

  const Pricing = () => (
    <Section id="pricing" band>
      <SectionHead eyebrow={AXD.pricing.eyebrow}
        prefix={AXD.pricing.titlePrefix} accent={AXD.pricing.titleAccent} suffix={AXD.pricing.titleSuffix}/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: L.gap, alignItems: 'stretch' }}>
        {AXD.pricing.tiers.map((p, i) => (
          <Reveal key={p.id} delay={i * 90} style={{ display: 'flex' }}>
            <PricingCard p={p}/>
          </Reveal>
        ))}
      </div>
      <FounderTrack/>
    </Section>
  );

  // ─── 06 · THE OPERATOR — three-frame editorial strip ─────────
  const OperatorFrame = ({ f }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          position: 'relative', overflow: 'hidden',
          aspectRatio: '4 / 5',
          border: `1px solid ${T.line}`, background: T.panel,
          cursor: 'default',
        }}>
        <img src={f.photo} alt={`Andrés Toro · ${f.caption}`} style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: f.crop,
          filter: h ? f.active : f.idle,
          transition: `filter 1.2s ${EASE}`,
          display: 'block',
        }}/>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(245,243,238,0) 60%, rgba(245,243,238,0.72) 100%)',
        }}/>
        <div style={{ position: 'absolute', bottom: 16, left: 18 }}>
          <Eyebrow color={h ? T.ember : T.inkDim} style={{ transition: `color .35s ${EASE}` }}>
            {f.fig} · {f.caption}
          </Eyebrow>
        </div>
      </div>
    );
  };

  const Operator = () => {
    const OP = AXD.operator;
    const paragraphs = OP.bio.split('\n\n');
    return (
      <Section id="operator">
        <SectionHead eyebrow={OP.eyebrow}
          prefix={OP.titlePrefix} accent={OP.titleAccent} suffix={OP.titleSuffix}/>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: L.gap, marginBottom: 56 }}>
          {OP.frames.map((f, i) => (
            <Reveal key={f.fig} delay={i * 90}><OperatorFrame f={f}/></Reveal>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            {paragraphs.map((p, i) => (
              <p key={i} style={{
                margin: i === 0 ? 0 : '14px 0 0',
                ...TYPE.bodyL, color: i === 0 ? T.ink : T.inkDim,
                fontWeight: i === 0 ? 500 : 400,
              }}>{p}</p>
            ))}
          </div>
          <div>
            <blockquote style={{
              margin: 0, padding: '4px 0 4px 22px',
              borderLeft: `2px solid ${T.ember}`,
              fontFamily: DISPLAY, fontWeight: 500, fontSize: 21,
              lineHeight: 1.45, letterSpacing: '-0.015em', color: T.ink,
            }}>“{OP.quote}”</blockquote>
            <div style={{
              marginTop: 28, paddingTop: 22, borderTop: `1px solid ${T.line}`,
              ...TYPE.micro, color: T.inkDim, lineHeight: 1.9, whiteSpace: 'pre-wrap',
            }}>{OP.facts}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 26 }}>
              <Btn href={(window.AxiusConfig || {}).linkedinUrl || '#'}>{OP.linkedin}</Btn>
              <Btn primary onClick={() => AX.openEmail('Axius — hello')}>{OP.talk}</Btn>
            </div>
          </div>
        </div>
      </Section>
    );
  };

  // ─── 07 · CLIENT STORIES ─────────────────────────────────────
  const StoryCard = ({ cs }) => {
    const firstSentence = (cs.body || '').split(/(?<=[.!?])\s+/)[0];
    return (
      <Card style={{ display: 'flex', flexDirection: 'column', gap: 18, minHeight: 380, height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span aria-label={`${cs.stars} star review`} style={{ color: T.ember, fontSize: 13, letterSpacing: 2 }}>
            {'★'.repeat(cs.stars || 5)}
          </span>
          <span style={{ ...TYPE.micro, fontSize: 9, color: T.inkFaint }}>case file</span>
        </div>
        <div>
          <h3 style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 600, fontSize: 21, letterSpacing: '-0.018em', lineHeight: 1.2, color: T.ink }}>{cs.company}</h3>
          <div style={{ marginTop: 6, ...TYPE.micro, color: T.inkMute }}>{cs.subtitle}</div>
        </div>
        <p style={{ margin: 0, flex: 1, fontFamily: DISPLAY, fontWeight: 400, fontSize: 15, color: T.inkDim, lineHeight: 1.6, letterSpacing: '-0.005em' }}>
          “{firstSentence}”
        </p>
        <div style={{
          paddingTop: 14, borderTop: `1px solid ${T.line}`,
          fontFamily: DISPLAY, fontWeight: 600, fontSize: 16,
          color: T.ember, letterSpacing: '-0.012em',
        }}>{cs.outcome}</div>
      </Card>
    );
  };

  const Stories = () => {
    const ST = AXD.stories;
    const live = (window.axiusFabricationLive || (() => true))();
    const nextQuarter = (() => {
      const d = new Date();
      const q = Math.floor(d.getMonth() / 3) + 1;
      const nextQ = q === 4 ? 1 : q + 1;
      const yr = q === 4 ? d.getFullYear() + 1 : d.getFullYear();
      return `Q${nextQ} · ${yr}`;
    })();

    return (
      <Section id="stories" band>
        <SectionHead eyebrow={ST.eyebrow}
          prefix={ST.titlePrefix} accent={ST.titleAccent} suffix={ST.titleSuffix}/>
        {live && ST.cases.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: L.gap, alignItems: 'stretch' }}>
            {ST.cases.map((cs, i) => (
              <Reveal key={cs.id} delay={i * 90} style={{ display: 'flex' }}><StoryCard cs={cs}/></Reveal>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, maxWidth: 560, ...TYPE.bodyL, color: T.inkDim }}>
            {ST.emptyTemplate.replace('{next}', nextQuarter)}
          </p>
        )}
      </Section>
    );
  };

  // ─── 08 · QUESTIONS — accordion ──────────────────────────────
  const FAQRow = ({ f, i, isOpen, onClick }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          borderBottom: `1px solid ${T.line}`,
          background: isOpen ? T.emberSoft : (h ? T.panel : 'transparent'),
          transition: `background .25s ${EASE}`,
          position: 'relative',
        }}>
        <span aria-hidden style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
          background: isOpen ? T.ember : 'transparent',
          transition: `background .3s ${EASE}`,
        }}/>
        <button onClick={onClick} aria-expanded={isOpen}
          style={{
            appearance: 'none', background: 'transparent', border: 'none',
            cursor: 'pointer', width: '100%', textAlign: 'left',
            display: 'grid', gridTemplateColumns: '64px 1fr 40px',
            gap: 24, padding: '19px 24px', alignItems: 'baseline',
          }}>
          <span style={{ ...TYPE.label, color: isOpen ? T.ember : T.inkMute, transition: `color .25s ${EASE}` }}>
            Q.{String(i + 1).padStart(2, '0')}
          </span>
          <span style={{
            fontFamily: DISPLAY, fontWeight: 500, fontSize: 18,
            color: isOpen || h ? T.ink : T.inkDim,
            letterSpacing: '-0.015em', lineHeight: 1.3,
            transition: `color .25s ${EASE}`,
          }}>{f.q}</span>
          <span aria-hidden style={{
            fontFamily: MONO, fontSize: 18, color: isOpen ? T.ember : T.inkDim,
            textAlign: 'right',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: `transform .25s ${EASE}, color .25s ${EASE}`,
            display: 'inline-block',
          }}>+</span>
        </button>
        {isOpen && (
          <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 40px', gap: 24, padding: '0 24px 22px' }}>
            <span/>
            <p style={{ margin: 0, ...TYPE.body, color: T.inkDim, maxWidth: 720, lineHeight: 1.75 }}>{f.a}</p>
            <span/>
          </div>
        )}
      </div>
    );
  };

  const FAQ = () => {
    const [open, setOpen] = React.useState(0);
    return (
      <Section id="faq">
        <SectionHead eyebrow={AXD.faq.eyebrow}
          prefix={AXD.faq.titlePrefix} accent={AXD.faq.titleAccent} suffix={AXD.faq.titleSuffix}/>
        <div style={{ borderTop: `1px solid ${T.line}` }}>
          {AXD.faq.items.map((f, i) => (
            <FAQRow key={i} f={f} i={i} isOpen={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}/>
          ))}
        </div>
      </Section>
    );
  };

  // ─── 09 · BEGIN ──────────────────────────────────────────────
  const Begin = () => {
    const B = AXD.begin;
    return (
      <Section id="begin" style={{ position: 'relative', overflow: 'hidden' }} band>
        <Orb top="20%" right="auto" size={560} style={{ left: '50%', transform: 'translateX(-50%)' }}/>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Eyebrow style={{ marginBottom: 24 }}>{B.eyebrow}</Eyebrow>
          <h2 style={{ margin: 0, ...TYPE.h2, color: T.ink }}>
            {B.titlePrefix}<span style={{ color: T.ember }}>{B.titleAccent}</span>{B.titleSuffix}
          </h2>
          <p style={{ margin: '32px auto 0', maxWidth: 500, ...TYPE.bodyL, color: T.inkDim }}>{B.body}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 44 }}>
            <Btn primary size="lg" onClick={() => AX.openBooking(B.bookingSubject)}>{B.cta}</Btn>
            <Btn size="lg" onClick={() => AX.openEmail(B.bookingSubject)}>{AX.EMAIL}</Btn>
          </div>
        </div>
      </Section>
    );
  };

  // ─── FOOTER ──────────────────────────────────────────────────
  const FooterLink = ({ label, href, id }) => {
    const [h, setH] = React.useState(false);
    return (
      <a href={href || `#${id}`}
        target={href && /^https?:/.test(href) ? '_blank' : undefined}
        rel={href && /^https?:/.test(href) ? 'noopener noreferrer' : undefined}
        onClick={id ? (e) => { e.preventDefault(); AX.scrollToId(id); } : undefined}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          fontFamily: DISPLAY, fontWeight: 500, fontSize: 14,
          color: h ? T.ember : T.ink, letterSpacing: '-0.005em',
          textDecoration: 'none', transition: `color .2s ${EASE}`,
        }}>{label}</a>
    );
  };

  const Footer = () => {
    const F = AXD.footer;
    return (
      <footer style={{ borderTop: `1px solid ${T.line}`, padding: '72px 0 48px' }}>
        <Container>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 64,
            alignItems: 'start', marginBottom: 64,
          }}>
            <div>
              <Wordmark size={20}/>
              <p style={{ margin: '18px 0 0', maxWidth: 320, ...TYPE.body, color: T.inkDim }}>{F.tagline}</p>
            </div>
            <div>
              <Eyebrow style={{ marginBottom: 16 }}>Practice</Eyebrow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {F.practice.map(l => <FooterLink key={l.label} {...l}/>)}
              </div>
            </div>
            <div>
              <Eyebrow style={{ marginBottom: 16 }}>Connect</Eyebrow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {F.connect.map(l => <FooterLink key={l.label} {...l}/>)}
              </div>
            </div>
          </div>
          <div style={{
            paddingTop: 24, borderTop: `1px solid ${T.line}`,
            ...TYPE.micro, color: T.inkDim,
          }}>{F.bottom}</div>
        </Container>
      </footer>
    );
  };

  // ─── APP ─────────────────────────────────────────────────────
  const App = () => {
    const initialEntry = (() => {
      try {
        if (typeof location !== 'undefined' && /[?&]skipEntry=1/.test(location.search)) return 'site';
      } catch (_) {}
      return 'intro';
    })();
    const [stage, setStage] = React.useState(initialEntry);

    React.useEffect(() => { AX.installGlobalStyles(); }, []);

    if (stage === 'intro') {
      return <Intro onDone={() => setStage('site')}/>;
    }

    return (
      <div style={{ animation: `axFadeUp .6s ${EASE}` }}>
        <a href="#main" style={{
          position: 'absolute', left: -9999, top: 0, zIndex: 999,
          background: T.ink, color: '#FFF', padding: '10px 16px',
          ...TYPE.label, textDecoration: 'none',
        }}
        onFocus={(e) => { e.currentTarget.style.left = '16px'; e.currentTarget.style.top = '12px'; }}
        onBlur={(e) => { e.currentTarget.style.left = '-9999px'; }}>
          Skip to content
        </a>
        <Nav/>
        <main id="main">
          <Hero/>
          <Diagnostic/>
          <Method/>
          <HowItRuns/>
          <Catalog/>
          <Pricing/>
          <Operator/>
          <Stories/>
          <FAQ/>
          <Begin/>
        </main>
        <Footer/>
        <AXChat.Dispatch/>
      </div>
    );
  };

  AX.installGlobalStyles();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App/>);
})();

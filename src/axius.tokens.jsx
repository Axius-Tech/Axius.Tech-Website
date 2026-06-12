// ════════════════════════════════════════════════════════════════
// AXIUS DESIGN SYSTEM — "Operator's Instrument"
// Fresh foundation for the 2026 rebuild. One palette, one type
// scale, one spacing rhythm, one motion language. Everything the
// sections render is built from the primitives in this file.
//
//   paper / ink     warm editorial canvas
//   ember           the single warm accent — CTAs, key numerals,
//                   one earned highlight per section
//   slate           the single cool note — AI / chat / dispatch
//                   "live system" moments ONLY
//   states          muted status colors for dots & log tags only
// ════════════════════════════════════════════════════════════════

window.AX = (function () {
  const T = {
    // canvas
    paper:    '#F5F3EE',
    panel:    '#FBFAF6',
    surface:  '#FFFFFF',
    // ink
    ink:      '#15130E',
    inkDim:   'rgba(21,19,14,0.64)',
    inkMute:  'rgba(21,19,14,0.42)',
    inkFaint: 'rgba(21,19,14,0.22)',
    // hairlines
    line:     'rgba(21,19,14,0.10)',
    lineHi:   'rgba(21,19,14,0.20)',
    // accents
    ember:     '#C0551E',
    emberSoft: 'rgba(192,85,30,0.08)',
    emberGlow: 'rgba(192,85,30,0.16)',
    slate:     '#3E5C6B',
    slateSoft: 'rgba(62,92,107,0.08)',
    // states (dots / log tags only — never decoration)
    stGreen:  '#5E7A5A',
    stAmber:  '#B68A3C',
    stRed:    '#9E5A4F',
  };

  const DISPLAY = '"Geist", "Inter", system-ui, sans-serif';
  const MONO    = '"Geist Mono", ui-monospace, monospace';
  const EASE    = 'cubic-bezier(.2,.8,.2,1)';

  // Type scale (desktop)
  const TYPE = {
    h1:    { fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(54px, 5.6vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.042em' },
    h2:    { fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(42px, 4.4vw, 56px)', lineHeight: 1.04, letterSpacing: '-0.035em' },
    h3:    { fontFamily: DISPLAY, fontWeight: 500, fontSize: 24, lineHeight: 1.2,  letterSpacing: '-0.02em' },
    h4:    { fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, lineHeight: 1.3,  letterSpacing: '-0.012em' },
    bodyL: { fontFamily: DISPLAY, fontWeight: 400, fontSize: 18, lineHeight: 1.6,  letterSpacing: '-0.005em' },
    body:  { fontFamily: DISPLAY, fontWeight: 400, fontSize: 15, lineHeight: 1.6,  letterSpacing: '-0.003em' },
    small: { fontFamily: DISPLAY, fontWeight: 400, fontSize: 13, lineHeight: 1.55, letterSpacing: '-0.003em' },
    label: { fontFamily: MONO, fontWeight: 500, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' },
    micro: { fontFamily: MONO, fontWeight: 500, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' },
  };

  // Layout rhythm
  const L = {
    container: 1200,   // max content width
    gutter: 32,        // side padding inside the container
    sectionY: 120,     // vertical padding — identical for every section
    headGap: 64,       // section-head → content
    gap: 20,           // grid gap
    cardPad: 28,       // card padding
  };

  // ─── Global stylesheet (keyframes, resets, focus, reduced-motion) ─
  function installGlobalStyles() {
    if (document.getElementById('ax-global-styles')) return;
    const el = document.createElement('style');
    el.id = 'ax-global-styles';
    el.textContent = `
      html { scroll-behavior: smooth; }
      body {
        margin: 0; background: ${T.paper}; color: ${T.ink};
        font-family: ${DISPLAY};
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
      *, *::before, *::after { box-sizing: border-box; }
      ::selection { background: ${T.ember}; color: #FFFFFF; }
      a { color: inherit; }
      button { font: inherit; }
      :focus-visible {
        outline: 2px solid ${T.ember};
        outline-offset: 2px;
      }
      .ax-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
      .ax-scroll::-webkit-scrollbar-track { background: transparent; }
      .ax-scroll::-webkit-scrollbar-thumb { background: ${T.lineHi}; }
      .ax-scroll::-webkit-scrollbar-thumb:hover { background: ${T.ember}; }

      @keyframes axPulse {
        0%   { box-shadow: 0 0 0 0 ${T.emberGlow}; }
        70%  { box-shadow: 0 0 0 9px rgba(192,85,30,0); }
        100% { box-shadow: 0 0 0 0 rgba(192,85,30,0); }
      }
      @keyframes axPulseGreen {
        0%   { box-shadow: 0 0 0 0 rgba(94,122,90,0.35); }
        70%  { box-shadow: 0 0 0 8px rgba(94,122,90,0); }
        100% { box-shadow: 0 0 0 0 rgba(94,122,90,0); }
      }
      @keyframes axGlow {
        0%, 100% { transform: scale(1);    opacity: 0.5; }
        50%      { transform: scale(1.07); opacity: 0.7; }
      }
      @keyframes axFadeUp {
        from { transform: translateY(14px); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }
      @keyframes axBlink {
        0%, 55% { opacity: 1; } 56%, 100% { opacity: 0.15; }
      }
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(el);
  }

  // ─── Helpers ─────────────────────────────────────────────────
  const EMAIL = 'andres@axius.tech';

  const openBooking = (subject) => {
    const url = (window.AxiusConfig && window.AxiusConfig.bookingUrl) || '';
    if (url) window.open(url, '_blank', 'noopener');
    else openEmail(subject);
  };
  const openEmail = (subject, body) => {
    let href = `mailto:${EMAIL}`;
    const q = [];
    if (subject) q.push(`subject=${encodeURIComponent(subject)}`);
    if (body)    q.push(`body=${encodeURIComponent(body)}`);
    if (q.length) href += `?${q.join('&')}`;
    window.location.href = href;
  };
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Generic Telegram notify — used by the diagnostic form (and any
  // future surface). Returns a promise resolving true when a real
  // webhook accepted the message, false otherwise (placeholder creds,
  // network failure) so callers can fall back to mailto.
  const notifyTelegram = async (html) => {
    try {
      const cfg = window.AxiusConfig || {};
      const webhook = cfg.ringWebhookUrl || '';
      if (!webhook || /YOUR_TELEGRAM/.test(webhook)) return false;
      const m = webhook.match(/api\.telegram\.org\/bot([^/]+)\//);
      if (!m) return false;
      const base = `https://api.telegram.org/bot${m[1]}`;
      const chatId = String(cfg.ringWebhookChatId || '');
      if (!chatId || /YOUR_TELEGRAM/.test(chatId)) return false;
      const res = await fetch(`${base}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId, text: html,
          parse_mode: 'HTML', disable_web_page_preview: true,
        }),
      }).then(r => r.json()).catch(() => null);
      return !!(res && res.ok);
    } catch (_) { return false; }
  };
  const escHtml = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // ─── Primitives ──────────────────────────────────────────────

  const Container = ({ children, style = {} }) => (
    <div style={{
      maxWidth: L.container, margin: '0 auto',
      padding: `0 ${L.gutter}px`, ...style,
    }}>{children}</div>
  );

  const Eyebrow = ({ children, color, style = {} }) => (
    <div style={{ ...TYPE.label, color: color || T.inkMute, ...style }}>{children}</div>
  );

  // The one canonical section head: mono eyebrow + H2 with a single
  // ember-colored word. Identical margins in every section.
  const SectionHead = ({ eyebrow, prefix, accent, suffix, sub, style = {} }) => (
    <div style={{ marginBottom: L.headGap, maxWidth: 880, ...style }}>
      <Eyebrow style={{ marginBottom: 24 }}>{eyebrow}</Eyebrow>
      <h2 style={{ margin: 0, ...TYPE.h2, color: T.ink }}>
        {prefix}{accent && <span style={{ color: T.ember }}>{accent}</span>}{suffix}
      </h2>
      {sub && (
        <p style={{ margin: '24px 0 0', maxWidth: 620, ...TYPE.bodyL, color: T.inkDim }}>{sub}</p>
      )}
    </div>
  );

  const Btn = ({ children, primary, size = 'md', onClick, href, style = {} }) => {
    const [h, setH] = React.useState(false);
    const sizes = {
      sm: { pad: '9px 16px',  fs: 13 },
      md: { pad: '13px 22px', fs: 14 },
      lg: { pad: '15px 28px', fs: 15 },
    };
    const s = sizes[size];
    const base = {
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: s.pad, cursor: 'pointer',
      fontFamily: DISPLAY, fontWeight: 500, fontSize: s.fs,
      letterSpacing: '-0.005em', textDecoration: 'none',
      transition: `all .2s ${EASE}`,
      background: primary ? (h ? T.ember : T.ink) : 'transparent',
      color:      primary ? '#FFFFFF' : (h ? T.ember : T.ink),
      border: `1px solid ${primary ? (h ? T.ember : T.ink) : (h ? T.ember : T.lineHi)}`,
      ...style,
    };
    const arrow = <span aria-hidden style={{
      fontFamily: MONO, fontSize: s.fs - 2,
      color: primary ? '#FFFFFF' : (h ? T.ember : T.inkMute),
      transform: h ? 'translateX(3px)' : 'translateX(0)',
      transition: `transform .2s ${EASE}, color .2s ${EASE}`,
    }}>→</span>;
    const evts = { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) };
    if (href) return <a href={href} target={/^https?:/.test(href) ? '_blank' : undefined}
      rel={/^https?:/.test(href) ? 'noopener noreferrer' : undefined}
      style={base} {...evts}>{children}{arrow}</a>;
    return <button type="button" onClick={onClick} style={{ appearance: 'none', ...base }} {...evts}>{children}{arrow}</button>;
  };

  // Card with the system hover: hairline border → ember, lift -3px,
  // 2px ember strip sweeping across the top.
  const Card = ({ children, pad = L.cardPad, hover = true, style = {} }) => {
    const [h, setH] = React.useState(false);
    return (
      <div
        onMouseEnter={() => hover && setH(true)}
        onMouseLeave={() => hover && setH(false)}
        style={{
          position: 'relative', background: T.surface,
          border: `1px solid ${h ? T.ember : T.line}`,
          padding: pad,
          transform: h ? 'translateY(-3px)' : 'translateY(0)',
          transition: `all .35s ${EASE}`,
          ...style,
        }}>
        <span aria-hidden style={{
          position: 'absolute', top: -1, left: -1, height: 2,
          width: h ? 'calc(100% + 2px)' : 0,
          background: T.ember,
          transition: `width .45s ${EASE}`,
        }}/>
        {children}
      </div>
    );
  };

  const Dot = ({ color, pulse, size = 7 }) => (
    <span aria-hidden style={{
      display: 'inline-block', width: size, height: size, borderRadius: '50%',
      background: color || T.stGreen, flexShrink: 0,
      animation: pulse ? 'axPulseGreen 2.4s ease-out infinite' : 'none',
    }}/>
  );

  // Scroll reveal — IO-based fade-up, one easing for the whole site.
  // rootMargin extends far above the viewport so anchor jumps and
  // fast programmatic scrolls can't leave passed-over content hidden.
  const Reveal = ({ children, delay = 0, style = {} }) => {
    const ref = React.useRef(null);
    const [on, setOn] = React.useState(false);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight) { setOn(true); return; }
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setOn(true); io.disconnect(); }
      }, { threshold: 0, rootMargin: '4000px 0px 0px 0px' });
      io.observe(el);
      return () => io.disconnect();
    }, []);
    return (
      <div ref={ref} style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity .6s ${EASE} ${delay}ms, transform .6s ${EASE} ${delay}ms`,
        ...style,
      }}>{children}</div>
    );
  };

  const CountUp = ({ to, duration = 1600, style = {} }) => {
    const [val, setVal] = React.useState(0);
    const ref = React.useRef(null);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let raf;
      const animate = () => {
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      };
      // Already at/above the fold (anchor jump, restored scroll) → run now.
      if (el.getBoundingClientRect().top < window.innerHeight) {
        animate();
        return () => { if (raf) cancelAnimationFrame(raf); };
      }
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        animate();
      }, { threshold: 0, rootMargin: '4000px 0px 0px 0px' });
      io.observe(el);
      return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
    }, [to, duration]);
    return <span ref={ref} style={style}>{val}</span>;
  };

  const Wordmark = ({ size = 18 }) => (
    <span style={{
      fontFamily: DISPLAY, fontWeight: 700, fontSize: size,
      letterSpacing: '-0.02em', color: T.ink,
      display: 'inline-flex', alignItems: 'center', gap: size * 0.45,
    }}>
      <span aria-hidden style={{
        display: 'inline-block', width: size * 0.42, height: size * 0.42,
        background: T.ember, transform: 'rotate(45deg)', flexShrink: 0,
      }}/>
      AXIUS
    </span>
  );

  // Atmosphere — breathing warm orb + paper grain. Shared by the
  // intro and the hero so the transition between them feels seamless.
  // Outer div owns position (any transform), inner div owns the
  // breathing animation — keyframe transforms can't clobber placement.
  const Orb = ({ top = '40%', right = '8%', size = 460, style = {} }) => (
    <div aria-hidden style={{
      position: 'absolute', top, right,
      width: size, height: size,
      pointerEvents: 'none', zIndex: 0,
      ...style,
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%',
        background: `radial-gradient(closest-side, ${T.emberGlow}, rgba(192,85,30,0) 70%)`,
        animation: 'axGlow 9s ease-in-out infinite',
      }}/>
    </div>
  );
  const Grain = ({ id, opacity = 0.6 }) => (
    <>
      <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.92" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/>
        </filter>
      </svg>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, filter: `url(#${id})`,
        opacity, pointerEvents: 'none', zIndex: 0, mixBlendMode: 'multiply',
      }}/>
    </>
  );

  return {
    T, TYPE, L, DISPLAY, MONO, EASE, EMAIL,
    installGlobalStyles,
    openBooking, openEmail, scrollToId, notifyTelegram, escHtml,
    Container, Eyebrow, SectionHead, Btn, Card, Dot, Reveal, CountUp,
    Wordmark, Orb, Grain,
  };
})();

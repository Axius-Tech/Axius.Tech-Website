// axius-direction-J.jsx — Composition root for Option 5 (final variant).
// Mounted at /v5 by v5/index.html. Coexists with Options 1/2/3/4.
//
// Architecture notes:
//   • Synthesizes Option 3's editorial commercial architecture and Option 4's
//     polish, then RESTORES Option 1 (E05)'s premium micro-interactions:
//       — cursor-following warm-light orb (axJGlow keyframe)
//       — paper-grain SVG filter for tactile warmth
//       — hover-scale on H1 + tangerine accent sweep on "Not your tech."
//       — <CountUpJ> animated numerals with IntersectionObserver
//       — <HoverCellJ> reusable latent-accent reveal (top hairline + gradient)
//       — hover-revealed "How we work" bullets
//   • Quiet 0.5 LIGHT canvas: #F7F6F2 / ink #0F0E0C / tangerine #B8743C
//   • Source Serif 4 (display) · Inter (body) · JetBrains Mono (chrome)
//   • Diagnostic is INLINE (reactive, skippable) — NOT a hard gate
//   • Chat bubble renders ONLY after AxiusPersonalization.hasAnswered()
//   • React.createElement everywhere — no JSX
//   • Fabricated content gated by axiusFabricationLive() (auto-unmount 2026-08-01)

// ─── Light-canvas style constants ─────────────────────────────
const J_INK     = '#0F0E0C';
const J_DIM     = 'rgba(10,9,7,0.65)';
const J_MUTE    = 'rgba(10,9,7,0.55)';
const J_FAINT   = 'rgba(10,9,7,0.32)';
const J_LINE    = '1px solid rgba(10,9,7,0.16)';
const J_LINE_LO = '1px solid rgba(10,9,7,0.08)';
const J_CANVAS  = '#F7F6F2';
const J_CANVAS_LO = '#EDECE6';
const J_TANGER  = '#B8743C';
const J_MINT    = '#7A9272';
const J_LAVENDER = '#8B7AA0';
const J_COPPER  = '#B8743C';
const J_SKY     = '#6A8194';
const J_AMBER   = '#C89B67';
const J_SERIF   = "'Source Serif 4', Georgia, serif";
const J_SANS    = "Inter, system-ui, sans-serif";
const J_MONO    = "JetBrains Mono, ui-monospace, monospace";

// Category accent map for HoverCellJ usage in MostRequested / Catalog
const J_CATEGORY_ACCENT = {
  sales: J_MINT,
  cx: J_LAVENDER,
  ops: J_TANGER,
  ai: J_COPPER,
  data: J_SKY,
  grow: J_AMBER,
  web: J_TANGER,
  soft: J_LAVENDER,
  creative: J_MINT,
};

// ─── Style installer ──────────────────────────────────────────
function installJStyles() {
  if (document.getElementById('axius-direction-J-styles')) return;
  const el = document.createElement('style');
  el.id = 'axius-direction-J-styles';
  el.textContent = [
    '/* Focus visible — keyboard nav clarity */',
    '.axius-j-btn:focus-visible,',
    '.axius-j-input:focus-visible,',
    '.axius-j-link:focus-visible {',
    '  outline: 2px solid #B8743C;',
    '  outline-offset: 2px;',
    '}',
    '/* Skip-to-main link */',
    '.axius-skip-link {',
    '  position: absolute; top: -40px; left: 8px;',
    '  background: #0F0E0C; color: #F7F6F2;',
    '  padding: 8px 12px; z-index: 9999;',
    '  text-decoration: none;',
    '  font-family: JetBrains Mono, monospace; font-size: 12px;',
    '  letter-spacing: 0.12em; text-transform: uppercase;',
    '  transition: top 0.2s;',
    '}',
    '.axius-skip-link:focus { top: 8px; }',
    '/* Premium Option 1 keyframes ported */',
    '@keyframes axJGlow {',
    '  0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 1; }',
    '  50% { transform: scale(1.06) translate(2%, -1%); opacity: 0.94; }',
    '}',
    '@keyframes axJTextIn {',
    '  from { opacity: 0; transform: translateY(8px); }',
    '  to { opacity: 1; transform: translateY(0); }',
    '}',
    '@keyframes axJMintPulse {',
    '  0%, 100% { box-shadow: 0 0 0 0 rgba(122,146,114,0.55); }',
    '  50% { box-shadow: 0 0 0 6px rgba(122,146,114,0); }',
    '}',
    '@keyframes axJFadeIn {',
    '  from { opacity: 0; }',
    '  to { opacity: 1; }',
    '}',
    '/* Smooth scroll for anchors */',
    'html { scroll-behavior: smooth; }',
    '#axius-direction-J-body section[id], #axius-direction-J-body header[id] {',
    '  scroll-margin-top: 80px;',
    '}',
    '/* Mobile responsive grid collapse */',
    '@media (max-width: 900px) {',
    '  [data-axius-j-grid="3col"] { grid-template-columns: 1fr !important; }',
    '  [data-axius-j-grid="2col"] { grid-template-columns: 1fr !important; }',
    '  [data-axius-j-grid="4col"] { grid-template-columns: 1fr 1fr !important; }',
    '  [data-axius-j-section] { padding: 64px 20px !important; }',
    '  [data-axius-j-section] h1 { font-size: 48px !important; line-height: 1.05 !important; }',
    '  [data-axius-j-section] h2 { font-size: 32px !important; line-height: 1.1 !important; }',
    '  [data-axius-j-nav-links] { display: none !important; }',
    '  [data-axius-j-mobile-toggle] { display: inline-flex !important; }',
    '  [data-axius-j-hero-stat] { display: none !important; }',
    '  [data-axius-j-footer-grid] { grid-template-columns: 1fr !important; }',
    '  [data-axius-j-chat-panel] { width: calc(100vw - 24px) !important; right: 12px !important; left: 12px !important; }',
    '}',
    '@media (prefers-reduced-motion: reduce) {',
    '  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }',
    '}',
    '/* HoverCell reveal animation surfaces */',
    '.axius-j-hover-cell { position: relative; transition: background 0.4s ease; }',
    '.axius-j-hover-cell::after {',
    '  content: ""; position: absolute; top: -1px; left: -1px; height: 2px;',
    '  width: 0; background: currentColor;',
    '  transition: width 0.55s cubic-bezier(.2,.8,.2,1);',
    '  pointer-events: none;',
    '}',
    '/* Sticky nav transitions */',
    '.axius-j-nav { transition: background 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease; }',
    '/* Chat bubble entrance */',
    '.axius-j-chat-bubble { animation: axJFadeIn 0.4s ease both; }',
  ].join('\n');
  document.head.appendChild(el);
}

// ─── Section wrapper helper ───────────────────────────────────
function jSection(id, children, opts) {
  opts = opts || {};
  return React.createElement('section', { id,
    'data-axius-j-section': true,
    style: { padding: opts.pad || '108px 32px',
             borderTop: opts.noTop ? 'none' : J_LINE_LO,
             background: opts.background || J_CANVAS, color: J_INK,
             position: 'relative', overflow: opts.overflow || 'visible' } },
    React.createElement('div', { style: { maxWidth: opts.maxWidth || 1180, margin: '0 auto' } },
      children),
  );
}

function jEyebrow(text, copper, style) {
  return React.createElement('div', {
    style: Object.assign({
      fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
      color: copper ? J_TANGER : J_MUTE, marginBottom: 20,
      textTransform: 'uppercase', fontWeight: 500,
    }, style || {}) },
    text);
}

// EyebrowJ — typed component variant matching E05's <Eyebrow>.
// Used for ALL numbered section eyebrows ("00 Dispatch · 3 Questions",
// "01 Before · After", ...). JetBrains Mono 11px / 0.18em / uppercase.
function EyebrowJ({ children, color, style }) {
  return React.createElement('div', {
    style: Object.assign({
      fontFamily: J_MONO, fontSize: 11, fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: color || J_MUTE,
    }, style || {}),
  }, children);
}

// ════════════════════════════════════════════════════════════════════════
// PREMIUM PRIMITIVES — ported from Option 1 (E05)
// ════════════════════════════════════════════════════════════════════════

// HoverCellJ — accent gradient + animated top-edge underline reveal
function HoverCellJ({ accent, children, style, as, onClick, href, target, rel, role, ariaLabel }) {
  const [h, setH] = React.useState(false);
  const Tag = as || 'div';
  const baseAccent = accent || J_TANGER;
  return React.createElement(Tag, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    onFocus: () => setH(true),
    onBlur: () => setH(false),
    onClick,
    href,
    target,
    rel,
    role,
    'aria-label': ariaLabel,
    style: Object.assign({
      position: 'relative',
      background: h ? `linear-gradient(180deg, ${baseAccent}10, transparent 60%)` : 'transparent',
      transition: 'background .4s ease',
      color: J_INK,
      textDecoration: 'none',
    }, style || {}),
  },
    React.createElement('span', { 'aria-hidden': true, style: {
      position: 'absolute', top: -1, left: -1, height: 2,
      width: h ? 'calc(100% + 2px)' : 0,
      background: baseAccent,
      transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
      pointerEvents: 'none',
    } }),
    children,
  );
}

// CountUpJ — counts from 0 to target when scrolled into view
function CountUpJ({ to, duration, suffix, style }) {
  const dur = duration || 1300;
  const [v, setV] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === 'undefined') { setV(to); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const t0 = performance.now();
        const tick = (t) => {
          const k = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 3); // easeOutCubic
          setV(Math.round(eased * to));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, dur]);
  return React.createElement('span', { ref, style: style || null },
    v, suffix || '');
}

// ════════════════════════════════════════════════════════════════════════
// 00 · VIDEO INTRO — editorial typographic motion (skippable, session-gated)
// ════════════════════════════════════════════════════════════════════════
function VideoIntroJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const P = window.AxiusPersonalization;
  const intro = window.AxiusVideoIntroV5 || { durationSec: 24, frames: [] };

  // Session-gated: stays dismissed for the rest of the tab session
  const initialDismissed = React.useMemo(() => {
    try {
      if (sessionStorage.getItem('axius:v5-video-seen') === '1') return true;
    } catch (_) {}
    // Skip when visitor already answered the diagnostic from a prior visit
    try { if (P && P.hasAnswered && P.hasAnswered()) return true; } catch (_) {}
    return false;
  }, []);

  const [visible, setVisible] = React.useState(!initialDismissed);
  const [now, setNow] = React.useState(0);
  const startRef = React.useRef(null);
  const rafRef = React.useRef(null);

  const dismiss = React.useCallback(() => {
    try { sessionStorage.setItem('axius:v5-video-seen', '1'); } catch (_) {}
    setVisible(false);
  }, []);

  React.useEffect(() => {
    if (!visible) return;
    startRef.current = performance.now();
    const tick = (t) => {
      const elapsed = t - startRef.current;
      setNow(elapsed);
      if (elapsed >= intro.durationSec * 1000) {
        dismiss();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [visible, dismiss, intro.durationSec]);

  // ESC to skip
  React.useEffect(() => {
    if (!visible) return;
    const onKey = (e) => { if (e.key === 'Escape') dismiss(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, dismiss]);

  if (!visible) return null;

  // Determine current frame: the most recent frame whose atMs <= now
  const frames = intro.frames || [];
  let activeIdx = 0;
  for (let i = 0; i < frames.length; i += 1) {
    if (frames[i].atMs <= now) activeIdx = i;
  }
  const active = frames[activeIdx] || { en: '', es: '' };
  const text = lang === 'es' ? active.es : active.en;

  return React.createElement('div', {
    role: 'dialog',
    'aria-label': lang === 'es' ? 'Intro de Axius' : 'Axius intro',
    style: {
      position: 'fixed', inset: 0, zIndex: 9000,
      background: J_CANVAS, color: J_INK,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    } },
    // Grain texture
    React.createElement('svg', { 'aria-hidden': true, width: 0, height: 0,
      style: { position: 'absolute' } },
      React.createElement('filter', { id: 'axJGrainIntro' },
        React.createElement('feTurbulence', { type: 'fractalNoise',
          baseFrequency: '0.92', numOctaves: '2', stitchTiles: 'stitch' }),
        React.createElement('feColorMatrix', { values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0' }),
      ),
    ),
    React.createElement('div', { 'aria-hidden': true, style: {
      position: 'absolute', inset: 0, filter: 'url(#axJGrainIntro)',
      opacity: 0.7, mixBlendMode: 'multiply', pointerEvents: 'none',
    } }),
    // Orb
    React.createElement('div', { 'aria-hidden': true, style: {
      position: 'absolute', top: '50%', left: '50%',
      width: 720, height: 720, borderRadius: '50%',
      background: 'radial-gradient(closest-side, rgba(184,116,60,0.18), rgba(184,116,60,0) 70%)',
      animation: 'axJGlow 9s ease-in-out infinite',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
    } }),
    // Skip button
    React.createElement('button', {
      type: 'button',
      className: 'axius-j-btn',
      onClick: dismiss,
      'aria-label': lang === 'es' ? 'Saltar intro' : 'Skip intro',
      style: {
        position: 'absolute', top: 24, right: 24, zIndex: 2,
        background: 'transparent', border: J_LINE,
        padding: '10px 16px',
        fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
        color: J_INK, cursor: 'pointer',
        textTransform: 'uppercase',
      } },
      (lang === 'es' ? 'SALTAR' : 'SKIP'),
      React.createElement('span', { style: { marginLeft: 8, color: J_TANGER } }, '→')),
    // Frame text
    React.createElement('div', { style: {
      position: 'relative', zIndex: 1,
      maxWidth: 980, padding: '0 32px', textAlign: 'center',
    } },
      React.createElement('div', { key: activeIdx,
        style: {
          fontFamily: J_SERIF, fontStyle: 'italic',
          fontWeight: 500, fontSize: 96, lineHeight: 1.02,
          letterSpacing: '-0.04em', color: J_INK,
          animation: 'axJTextIn 0.55s cubic-bezier(.2,.8,.2,1) both',
        } }, text),
    ),
    // Progress strip bottom
    React.createElement('div', { 'aria-hidden': true, style: {
      position: 'absolute', bottom: 24, left: 24, right: 24, zIndex: 2,
      height: 1, background: 'rgba(10,9,7,0.08)',
    } },
      React.createElement('div', { style: {
        height: '100%', width: Math.min(100, (now / (intro.durationSec * 1000)) * 100) + '%',
        background: J_TANGER, transition: 'width 0.1s linear',
      } }),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 01 · TOP NAV — sticky wordmark + nav + EN/ES toggle
// ════════════════════════════════════════════════════════════════════════
function NavJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const cfg = window.AxiusConfig || {};
  const navItems = window.AxiusNavV5 || [];
  const [stuck, setStuck] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    function check() {
      const should = window.scrollY > 80;
      setStuck(prev => prev === should ? prev : should);
      rafRef.current = null;
    }
    function onScroll() {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(check);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    check();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const setLang = (l) => {
    cfg.lang = l;
    try { localStorage.setItem('axius:lang', l); } catch (_) {}
    // Force re-render of subscribers via personalization no-op
    if (window.AxiusPersonalization) {
      const cur = window.AxiusPersonalization.get();
      window.AxiusPersonalization.set({ ...cur });
    }
  };

  const handleAnchor = (href) => (e) => {
    if (href && href.charAt(0) === '#') {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  return React.createElement(React.Fragment, null,
    React.createElement('nav', {
      className: 'axius-j-nav',
      'aria-label': lang === 'es' ? 'Navegación principal' : 'Primary navigation',
      style: {
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 64, zIndex: 200,
        background: stuck ? 'rgba(247,246,242,0.92)' : 'rgba(247,246,242,0.0)',
        backdropFilter: stuck ? 'blur(12px) saturate(140%)' : 'none',
        WebkitBackdropFilter: stuck ? 'blur(12px) saturate(140%)' : 'none',
        borderBottom: stuck ? J_LINE_LO : '1px solid transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
      } },
      // Wordmark
      React.createElement('a', {
        href: '#hero',
        className: 'axius-j-link',
        onClick: handleAnchor('#hero'),
        'aria-label': 'Axius — back to top',
        style: {
          display: 'inline-flex', alignItems: 'baseline', gap: 1,
          fontFamily: J_SERIF, fontWeight: 600, fontSize: 20,
          letterSpacing: '-0.04em', color: J_INK, textDecoration: 'none',
        } },
        React.createElement('span', null, 'axius'),
        React.createElement('span', { style: { color: J_TANGER } }, '.')),
      // Desktop nav
      React.createElement('div', {
        'data-axius-j-nav-links': true,
        style: { display: 'flex', alignItems: 'center', gap: 32 } },
        navItems.map((item, i) =>
          React.createElement('a', {
            key: i,
            className: 'axius-j-link',
            href: item.href,
            onClick: handleAnchor(item.href),
            style: {
              fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
              color: J_INK, textDecoration: 'none', textTransform: 'uppercase',
              fontWeight: 500,
              borderBottom: '1px solid transparent',
              paddingBottom: 2, transition: 'border-color 0.2s ease',
            },
            onMouseEnter: (e) => e.currentTarget.style.borderBottomColor = J_TANGER,
            onMouseLeave: (e) => e.currentTarget.style.borderBottomColor = 'transparent',
          }, lang === 'es' ? item.labelEs : item.labelEn)),
      ),
      // Right cluster: lang + Begin
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('div', { 'data-axius-j-nav-links': true,
          role: 'group', 'aria-label': lang === 'es' ? 'Idioma' : 'Language',
          style: { display: 'inline-flex', alignItems: 'center', gap: 6,
                   fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: J_MUTE } },
          React.createElement('button', {
            type: 'button',
            className: 'axius-j-btn',
            onClick: () => setLang('en'),
            'aria-pressed': lang === 'en',
            'aria-label': 'English',
            style: { background: 'transparent', border: 'none', cursor: 'pointer',
                     padding: '4px 6px', fontFamily: J_MONO, fontSize: 11,
                     letterSpacing: '0.18em', textTransform: 'uppercase',
                     color: lang === 'en' ? J_INK : J_MUTE,
                     fontWeight: lang === 'en' ? 600 : 500 } }, 'EN'),
          React.createElement('span', { 'aria-hidden': true }, '/'),
          React.createElement('button', {
            type: 'button',
            className: 'axius-j-btn',
            onClick: () => setLang('es'),
            'aria-pressed': lang === 'es',
            'aria-label': 'Español',
            style: { background: 'transparent', border: 'none', cursor: 'pointer',
                     padding: '4px 6px', fontFamily: J_MONO, fontSize: 11,
                     letterSpacing: '0.18em', textTransform: 'uppercase',
                     color: lang === 'es' ? J_INK : J_MUTE,
                     fontWeight: lang === 'es' ? 600 : 500 } }, 'ES'),
        ),
        React.createElement('a', {
          className: 'axius-j-link',
          href: cfg.bookingUrl || '#cta-begin',
          target: cfg.bookingUrl ? '_blank' : undefined,
          rel: cfg.bookingUrl ? 'noopener noreferrer' : undefined,
          'data-axius-j-nav-links': true,
          'aria-label': lang === 'es' ? 'Comenzar — reservar llamada' : 'Begin — book a call',
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: J_TANGER, color: J_CANVAS,
            border: '1px solid ' + J_TANGER,
            padding: '8px 16px',
            fontFamily: J_SANS, fontSize: 12, fontWeight: 500,
            textDecoration: 'none', letterSpacing: '-0.005em',
          } },
          lang === 'es' ? 'Empezar' : 'Begin',
          React.createElement('span', { style: { fontFamily: J_MONO, color: J_CANVAS, fontSize: 11 } }, '→')),
        // Mobile hamburger
        React.createElement('button', {
          type: 'button',
          className: 'axius-j-btn',
          'data-axius-j-mobile-toggle': true,
          'aria-label': lang === 'es' ? 'Abrir menú' : 'Open menu',
          'aria-expanded': mobileOpen,
          onClick: () => setMobileOpen(true),
          style: {
            display: 'none', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: J_LINE,
            width: 40, height: 40, cursor: 'pointer',
          } },
          React.createElement('span', { 'aria-hidden': true, style: {
            display: 'block', width: 18, height: 1.5, background: J_INK,
            boxShadow: '0 6px 0 ' + J_INK + ', 0 -6px 0 ' + J_INK,
          } }),
        ),
      ),
    ),
    // Mobile menu overlay
    mobileOpen && React.createElement('div', {
      role: 'dialog', 'aria-modal': 'true',
      'aria-label': lang === 'es' ? 'Menú' : 'Menu',
      style: {
        position: 'fixed', inset: 0, zIndex: 250,
        background: J_CANVAS, color: J_INK,
        padding: '32px 24px',
        animation: 'axJFadeIn 0.2s ease both',
      } },
      React.createElement('div', { style: { display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 } },
        React.createElement('span', { style: { fontFamily: J_SERIF, fontWeight: 600,
          fontSize: 20, letterSpacing: '-0.04em' } },
          'axius', React.createElement('span', { style: { color: J_TANGER } }, '.')),
        React.createElement('button', {
          type: 'button',
          onClick: () => setMobileOpen(false),
          'aria-label': lang === 'es' ? 'Cerrar menú' : 'Close menu',
          style: { background: 'transparent', border: 'none', cursor: 'pointer',
                   fontFamily: J_MONO, fontSize: 14, color: J_INK, padding: 8 } },
          '✕'),
      ),
      React.createElement('div', { style: { display: 'flex',
        flexDirection: 'column', gap: 24 } },
        navItems.map((item, i) =>
          React.createElement('a', {
            key: i,
            href: item.href,
            onClick: handleAnchor(item.href),
            style: {
              fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
              fontSize: 36, letterSpacing: '-0.03em',
              color: J_INK, textDecoration: 'none',
            } }, lang === 'es' ? item.labelEs : item.labelEn)),
      ),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 02 · HERO — ports Option 1's premium micro-interactions
// ════════════════════════════════════════════════════════════════════════
function HeroJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const cfg = window.AxiusConfig || {};
  const bookingHref = cfg.bookingUrl || 'mailto:andres@axius.tech';
  const heroBadge = window.AxiusHeroBadgeV5 || {};
  const heroEy = window.AxiusHeroEyebrowsV5 || {};

  const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });
  const [titleHover, setTitleHover] = React.useState(false);
  const [howWeWorkHover, setHowWeWorkHover] = React.useState(false);
  const [practiceHover, setPracticeHover] = React.useState(false);
  const [pillHover, setPillHover] = React.useState(false);
  const heroRef = React.useRef(null);
  const rafMouse = React.useRef(null);

  React.useEffect(() => {
    const onMove = (e) => {
      if (rafMouse.current != null) return;
      rafMouse.current = window.requestAnimationFrame(() => {
        const r = heroRef.current && heroRef.current.getBoundingClientRect();
        if (r) {
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          setMouse({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
        }
        rafMouse.current = null;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafMouse.current != null) window.cancelAnimationFrame(rafMouse.current);
    };
  }, []);

  const orbX = (mouse.x - 0.5) * 70;
  const orbY = (mouse.y - 0.5) * 50;

  const practiceLine = (heroEy.practiceLine && (lang === 'es' ? heroEy.practiceLine.es : heroEy.practiceLine.en))
    || (lang === 'es' ? 'Axius — Una práctica independiente de operaciones tecnológicas'
                      : 'Axius — An independent technology operations practice');
  const acceptingPre = (heroEy.acceptingPre && (lang === 'es' ? heroEy.acceptingPre.es : heroEy.acceptingPre.en))
    || (lang === 'es' ? 'SOLO ACEPTANDO' : 'ONLY ACCEPTING');
  const acceptingAccent = (heroEy.acceptingAccent && (lang === 'es' ? heroEy.acceptingAccent.es : heroEy.acceptingAccent.en))
    || (lang === 'es' ? '3 CLIENTES NUEVOS / MES' : '3 NEW CLIENTS / MONTH');

  const heroLine1 = lang === 'es' ? 'Dirige' : 'Run';
  const heroLine2 = lang === 'es' ? 'tu negocio.' : 'your business.';
  const heroLine3 = lang === 'es' ? 'No tu tech.' : 'Not your tech.';

  const subLines = lang === 'es'
    ? [
        'La mayoría de los negocios en crecimiento no necesitan más software.',
        'Necesitan que alguien sea dueño.',
        'Axius se convierte en el partner operativo de tecnología detrás de tu negocio.',
      ]
    : [
        "Most growing businesses don't need more software.",
        'They need someone to own it.',
        'Axius becomes the technology operating partner behind your business.',
      ];

  const ctaPrimary   = lang === 'es' ? 'Reservar llamada estratégica' : 'Book a Strategic Call';
  const ctaSecondary = lang === 'es' ? 'Ver cómo funciona' : 'See How It Works';

  const scrollToDispatch = (e) => {
    e.preventDefault();
    const el = document.getElementById('dispatch');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const howWeWorkLabel = lang === 'es' ? 'CÓMO TRABAJAMOS' : 'HOW WE WORK';
  const howBullets = lang === 'es'
    ? ['UNA MANO RESPONSABLE', 'UN SISTEMA OPERATIVO MENSUAL', 'PROPIEDAD DOCUMENTADA, NO DEPENDENCIA']
    : ['ONE ACCOUNTABLE HAND', 'ONE OPERATING SYSTEM MONTHLY', 'DOCUMENTED OWNERSHIP, NOT DEPENDENCY'];

  // Industry badge text (when personalized)
  const ind = perso && perso.industry;
  const badgeEntry = ind && heroBadge[ind];
  const badgeText = badgeEntry
    ? (lang === 'es' ? badgeEntry.es : badgeEntry.en)
    : null;

  return React.createElement('header', { id: 'hero', ref: heroRef,
    'data-axius-j-section': true,
    style: { padding: '160px 32px 108px', background: J_CANVAS, color: J_INK,
             position: 'relative', overflow: 'hidden' } },
    // Breathing warm-light orb — cursor-following
    React.createElement('div', { 'aria-hidden': true, style: {
      position: 'absolute', top: '40%', right: '8%',
      width: 460, height: 460, borderRadius: '50%',
      background: 'radial-gradient(closest-side, rgba(184,116,60,0.20), rgba(184,116,60,0) 70%)',
      animation: 'axJGlow 9s ease-in-out infinite',
      transform: `translate(${orbX}px, ${orbY}px)`,
      transition: 'transform 1.2s cubic-bezier(.2,.8,.2,1)',
      pointerEvents: 'none', zIndex: 0,
      willChange: 'transform',
    } }),
    // Paper-grain SVG filter
    React.createElement('svg', { 'aria-hidden': true, width: 0, height: 0,
      style: { position: 'absolute' } },
      React.createElement('filter', { id: 'axJGrainHero' },
        React.createElement('feTurbulence', { type: 'fractalNoise',
          baseFrequency: '0.92', numOctaves: '2', stitchTiles: 'stitch' }),
        React.createElement('feColorMatrix', { values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0' }),
      ),
    ),
    React.createElement('div', { 'aria-hidden': true, style: {
      position: 'absolute', inset: 0,
      filter: 'url(#axJGrainHero)',
      opacity: 0.7, pointerEvents: 'none', zIndex: 0,
      mixBlendMode: 'multiply',
    } }),
    // Content
    React.createElement('div', { style: { position: 'relative', zIndex: 1,
      maxWidth: 1180, margin: '0 auto' } },
      // ─── Row 1: practice line (LEFT) · ONLY ACCEPTING pill (RIGHT) ───
      // Hover on either eyebrow OR the H1 synchronises all three
      // micro-interactions, exactly as in E05.
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between',
                 alignItems: 'baseline', gap: 24, marginBottom: 48,
                 flexWrap: 'wrap' } },
        React.createElement('div', {
          onMouseEnter: () => setPracticeHover(true),
          onMouseLeave: () => setPracticeHover(false),
          style: { cursor: 'default' } },
          React.createElement('span', { style: {
            fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', fontWeight: 500,
            color: practiceHover ? J_TANGER : J_MUTE,
            transition: 'color .35s cubic-bezier(.2,.8,.2,1)',
          } }, practiceLine)),
        React.createElement('div', {
          onMouseEnter: () => setPillHover(true),
          onMouseLeave: () => setPillHover(false),
          style: { cursor: 'default', position: 'relative',
                   display: 'inline-block' } },
          React.createElement('div', { style: {
            fontFamily: J_MONO, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
          } },
            React.createElement('span', { style: {
              color: (titleHover || pillHover) ? J_INK : J_MUTE,
              transition: 'color .35s cubic-bezier(.2,.8,.2,1)',
            } }, acceptingPre),
            React.createElement('span', { style: { color: J_FAINT, margin: '0 0.5em' } }, '·'),
            React.createElement('span', { style: {
              position: 'relative', display: 'inline-block',
              color: (titleHover || pillHover) ? J_TANGER : J_MUTE,
              transition: 'color .35s cubic-bezier(.2,.8,.2,1)',
            } },
              acceptingAccent,
              React.createElement('span', { 'aria-hidden': true, style: {
                position: 'absolute', left: 0, right: 0, bottom: -4, height: 1,
                background: J_TANGER,
                transformOrigin: 'right',
                transform: 'scaleX(' + ((titleHover || pillHover) ? 1 : 0) + ')',
                transition: 'transform .4s cubic-bezier(.2,.8,.2,1)',
              } }),
            ),
          ),
        ),
      ),
      // ─── Row 2: 2-col hero — H1+sub+CTAs LEFT, OperatorCardJ RIGHT ───
      React.createElement('div', {
        'data-axius-j-grid': '2col',
        style: { display: 'grid', gridTemplateColumns: '1.55fr 1fr',
                 columnGap: 80, rowGap: 32, alignItems: 'start' } },
      React.createElement('div', { key: 'left',
        style: { minWidth: 0 } },
      // Industry badge (above H1, when personalized)
      badgeText && React.createElement('div', {
        style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                 marginBottom: 28,
                 fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                 color: J_MUTE, textTransform: 'uppercase', fontWeight: 500 } },
        React.createElement('span', { 'aria-hidden': true, style: {
          display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
          background: J_MINT,
          boxShadow: '0 0 0 4px rgba(122,146,114,0.16)',
          animation: 'axJMintPulse 2.2s ease-in-out infinite',
        } }),
        badgeText),
      // H1
      React.createElement('h1', {
        onMouseEnter: () => setTitleHover(true),
        onMouseLeave: () => setTitleHover(false),
        style: { margin: 0, fontFamily: J_SERIF, fontStyle: 'italic',
                 fontWeight: 500, fontSize: 88, lineHeight: 1.0,
                 letterSpacing: '-0.045em', color: J_INK,
                 cursor: 'default' } },
        React.createElement('span', { style: {
          display: 'inline-block',
          transformOrigin: '0% 50%',
          transform: titleHover ? 'scale(1.035)' : 'scale(1)',
          transition: 'transform .55s cubic-bezier(.2,.8,.2,1)',
        } }, heroLine1, React.createElement('br'), heroLine2),
        React.createElement('br'),
        React.createElement('span', { style: {
          position: 'relative', display: 'inline-block',
          color: titleHover ? '#FFFFFF' : '#9C9690',
          padding: '0.04em 0.14em 0.08em',
          whiteSpace: 'nowrap',
          transition: 'color .45s cubic-bezier(.2,.8,.2,1)',
        } },
          React.createElement('span', { 'aria-hidden': true, style: {
            position: 'absolute', inset: 0,
            background: J_TANGER,
            opacity: titleHover ? 1 : 0,
            transform: titleHover ? 'scaleX(1)' : 'scaleX(0.94)',
            transformOrigin: '0% 50%',
            transition: 'opacity .5s cubic-bezier(.2,.8,.2,1), transform .55s cubic-bezier(.2,.8,.2,1)',
            zIndex: 0,
          } }),
          React.createElement('span', { style: { position: 'relative', zIndex: 1 } }, heroLine3),
        ),
      ),
      // Sub-copy
      React.createElement('div', {
        style: { marginTop: 40, maxWidth: 620, fontFamily: J_SANS,
                 fontSize: 18, lineHeight: 1.6, color: J_DIM,
                 letterSpacing: '-0.003em' } },
        subLines.map((line, i) => React.createElement('p', { key: i,
          style: { margin: i === 0 ? 0 : '10px 0 0' } }, line)),
      ),
      // HOW WE WORK — hover-reveal bullets
      React.createElement('div', {
        onMouseEnter: () => setHowWeWorkHover(true),
        onMouseLeave: () => setHowWeWorkHover(false),
        style: { marginTop: 36, cursor: 'default' } },
        React.createElement('div', { style: {
          display: 'inline-block',
          fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
          color: howWeWorkHover ? J_TANGER : J_MUTE,
          textTransform: 'uppercase', fontWeight: 500,
          transition: 'color .3s ease',
        } }, howWeWorkLabel),
        React.createElement('div', { style: {
          overflow: 'hidden',
          maxHeight: howWeWorkHover ? 140 : 0,
          opacity: howWeWorkHover ? 1 : 0,
          marginTop: howWeWorkHover ? 14 : 0,
          transition: 'max-height .45s cubic-bezier(.2,.8,.2,1), opacity .35s ease, margin-top .35s ease',
        } },
          howBullets.map((label, i) => React.createElement('div', { key: i,
            style: {
              display: 'flex', alignItems: 'baseline', gap: 14,
              fontFamily: J_MONO, fontSize: 12, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: J_INK, padding: '4px 0',
            } },
            React.createElement('span', { style: { color: J_TANGER, fontWeight: 600 } }, '+'),
            React.createElement('span', null, label))),
        ),
      ),
      // CTAs
      React.createElement('div', {
        style: { marginTop: 44, display: 'flex', gap: 14, flexWrap: 'wrap' } },
        React.createElement('a', {
          className: 'axius-j-link',
          href: bookingHref, target: '_blank', rel: 'noopener noreferrer',
          'aria-label': ctaPrimary,
          style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                   background: J_TANGER, color: J_CANVAS,
                   border: '1px solid ' + J_TANGER, padding: '14px 24px',
                   fontFamily: J_SANS, fontSize: 14, fontWeight: 500,
                   textDecoration: 'none', letterSpacing: '-0.005em' } },
          ctaPrimary,
          React.createElement('span', { style: { fontFamily: J_MONO,
                                                    color: J_CANVAS, fontSize: 13 } }, '→')),
        React.createElement('a', {
          className: 'axius-j-link',
          href: '#dispatch', onClick: scrollToDispatch,
          'aria-label': ctaSecondary + ' — ' + (lang === 'es' ? 'desplazar al diagnóstico' : 'scroll to diagnostic'),
          style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                   background: 'transparent', color: J_INK,
                   border: '1px solid rgba(10,9,7,0.32)', padding: '14px 24px',
                   fontFamily: J_SANS, fontSize: 14, fontWeight: 500,
                   textDecoration: 'none', letterSpacing: '-0.005em' } },
          ctaSecondary,
          React.createElement('span', { style: { fontFamily: J_MONO,
                                                    color: J_TANGER, fontSize: 13 } }, '→')),
      ),
      ), // end LEFT column wrapper
      // RIGHT column — Operator Card (E05's "DIRECT LINE TO OPERATOR")
      React.createElement('div', { key: 'right', style: { minWidth: 0 } },
        React.createElement(OperatorCardJ, { lang }),
      ),
      ), // end 2-col grid wrapper
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// OperatorCardJ — hero right-column card with photo + identity + CTAs.
// Ported VIBE from E05's OperatorCard: chrome eyebrow "DIRECT LINE TO
// OPERATOR" (tangerine) + mint AI-ONLINE dot, desaturated photo that
// blooms to colour on hover, "Andrés Toro" name, role line, email line,
// "Message directly" primary button (dispatches axius:openHeroChat) and
// "Leave a note" mailto secondary.
// ════════════════════════════════════════════════════════════════════════
function OperatorCardJ({ lang }) {
  const f = window.AxiusFounder || {};
  const cfg = window.AxiusConfig || {};
  const photo = f.photo || '/assets/andres-toro.jpg';
  const email = f.email || 'andres@axius.tech';
  const [photoHover, setPhotoHover] = React.useState(false);

  const eyebrowOp = 'DIRECT LINE TO OPERATOR';
  const eyebrowOpEs = 'CONTACTO DIRECTO CON EL OPERADOR';
  const eyebrowAi = lang === 'es' ? 'IA EN LÍNEA' : 'AI ONLINE';
  const roleLine = lang === 'es'
    ? 'Operador · Altamonte Springs, FL · ahora en Medellín'
    : 'Operator · Altamonte Springs, FL · in Medellín now';
  const labelEmail = lang === 'es' ? 'CORREO DIRECTO' : 'DIRECT EMAIL';
  const labelHours = lang === 'es' ? 'HORARIO' : 'HOURS';
  const hoursVal = lang === 'es' ? 'Lun–Vie · 9:00–18:00 EST' : 'Mon–Fri · 9am–6pm EST';
  const ctaMsg = lang === 'es' ? 'CONVERSAR AHORA' : 'MESSAGE DIRECTLY';
  const ctaNote = lang === 'es' ? 'DEJAR UNA NOTA' : 'LEAVE A NOTE';

  const onMessage = () => {
    const behavior = cfg.ringBehavior || 'inChat';
    const wa = cfg.whatsappNumber || '';
    if (behavior === 'whatsapp' && wa) {
      const intro = lang === 'es'
        ? "Hola Andrés — estoy en axius.tech y me gustaría escribirte directo."
        : "Hi Andrés — I'm on axius.tech and would like to message you directly.";
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(intro),
        '_blank', 'noopener');
      return;
    }
    try { window.dispatchEvent(new CustomEvent('axius:openHeroChat')); } catch (_) {}
    // Soft fallback — scroll to dispatch if the diagnostic hasn't been
    // answered yet (this is what unlocks ChatBubbleJ in Option 5).
    const P = window.AxiusPersonalization;
    if (!P || !P.hasAnswered || !P.hasAnswered()) {
      const ds = document.getElementById('dispatch');
      if (ds) ds.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return React.createElement('div', {
    'data-axius-j-operator-card': true,
    style: {
      position: 'relative', background: J_CANVAS,
      border: J_LINE, width: '100%',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    } },
    React.createElement('div', { style: {
      padding: '14px 22px', borderBottom: J_LINE_LO,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    } },
      React.createElement('span', { style: {
        fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
        textTransform: 'uppercase', fontWeight: 500, color: J_TANGER,
      } }, lang === 'es' ? eyebrowOpEs : eyebrowOp),
      React.createElement('span', { style: {
        display: 'inline-flex', alignItems: 'center', gap: 8,
      } },
        React.createElement('span', { 'aria-hidden': true, style: {
          display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
          background: J_MINT,
          boxShadow: '0 0 0 3px rgba(122,146,114,0.18)',
          animation: 'axJMintPulse 2.4s ease-out infinite',
        } }),
        React.createElement('span', { style: {
          fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase', fontWeight: 500, color: J_MUTE,
        } }, eyebrowAi),
      ),
    ),
    React.createElement('div', { style: {
      padding: '22px 22px',
      display: 'grid', gridTemplateColumns: '108px 1fr', gap: 22,
      alignItems: 'center',
    } },
      React.createElement('div', {
        onMouseEnter: () => setPhotoHover(true),
        onMouseLeave: () => setPhotoHover(false),
        style: {
          width: 108, height: 108, border: J_LINE_LO,
          background: J_CANVAS_LO, overflow: 'hidden', cursor: 'default',
        } },
        React.createElement('img', {
          src: photo, alt: 'Andrés Toro',
          style: {
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: '50% 30%',
            filter: photoHover
              ? 'grayscale(0) saturate(1.05) contrast(1.02)'
              : 'grayscale(1) contrast(1.04)',
            display: 'block',
            transition: 'filter 1.4s cubic-bezier(.2,.8,.2,1)',
          } }),
      ),
      React.createElement('div', null,
        React.createElement('div', { style: {
          fontFamily: J_SERIF, fontWeight: 600, fontSize: 28,
          letterSpacing: '-0.025em', color: J_INK, lineHeight: 1.05,
        } }, f.name || 'Andrés Toro'),
        React.createElement('div', { style: {
          marginTop: 10,
          fontFamily: J_MONO, fontSize: 11, fontWeight: 500,
          color: J_MUTE, letterSpacing: '0.18em', textTransform: 'uppercase',
        } }, roleLine),
      ),
    ),
    React.createElement('div', { style: { height: 1, background: 'rgba(10,9,7,0.08)' } }),
    React.createElement('div', { style: { padding: '18px 22px 6px' } },
      React.createElement('div', { style: {
        fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
        textTransform: 'uppercase', fontWeight: 500, color: J_MUTE,
      } }, labelEmail),
      React.createElement('a', {
        href: 'mailto:' + email,
        className: 'axius-j-link',
        style: {
          display: 'inline-block', marginTop: 6,
          fontFamily: J_MONO, fontSize: 16, color: J_INK,
          letterSpacing: '-0.005em', textDecoration: 'none',
          transition: 'color .25s ease',
        },
        onMouseEnter: (e) => { e.currentTarget.style.color = J_TANGER; },
        onMouseLeave: (e) => { e.currentTarget.style.color = J_INK; },
      }, email),
    ),
    React.createElement('div', { style: { padding: '10px 22px 18px' } },
      React.createElement('div', { style: {
        fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
        textTransform: 'uppercase', fontWeight: 500, color: J_MUTE,
      } }, labelHours),
      React.createElement('div', { style: {
        marginTop: 6, fontFamily: J_MONO, fontSize: 16, color: J_INK,
        letterSpacing: '-0.005em', fontVariantNumeric: 'tabular-nums',
      } }, hoursVal),
    ),
    React.createElement('div', { style: { height: 1, background: 'rgba(10,9,7,0.08)' } }),
    React.createElement('div', { style: {
      padding: '16px 22px', display: 'flex', gap: 10, flexWrap: 'wrap',
    } },
      React.createElement('button', {
        type: 'button', onClick: onMessage,
        className: 'axius-j-btn',
        style: {
          appearance: 'none', cursor: 'pointer',
          background: J_INK, color: J_CANVAS, border: '1px solid ' + J_INK,
          padding: '11px 18px',
          fontFamily: J_MONO, fontSize: 11, fontWeight: 500,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: 10,
          transition: 'all .25s ease',
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = J_TANGER;
          e.currentTarget.style.borderColor = J_TANGER;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = J_INK;
          e.currentTarget.style.borderColor = J_INK;
        },
      },
        ctaMsg,
        React.createElement('span', { style: { fontFamily: J_SERIF,
                                                fontStyle: 'italic',
                                                fontSize: 14 } }, '→'),
      ),
      React.createElement('a', {
        href: 'mailto:' + email,
        className: 'axius-j-link',
        style: {
          appearance: 'none', cursor: 'pointer',
          background: 'transparent', color: J_INK,
          border: '1px solid rgba(10,9,7,0.20)',
          padding: '11px 18px',
          fontFamily: J_MONO, fontSize: 11, fontWeight: 500,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'all .25s ease',
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.color = J_TANGER;
          e.currentTarget.style.borderColor = J_TANGER;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.color = J_INK;
          e.currentTarget.style.borderColor = 'rgba(10,9,7,0.20)';
        },
      }, ctaNote),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 03 · DISPATCH — inline diagnostic (skippable, scrolls to before-and-after when done)
// ════════════════════════════════════════════════════════════════════════
function DispatchJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const P = window.AxiusPersonalization;

  const industries = window.AxiusIndustriesV3 || [];
  const challenges = window.AxiusChallengesV3 || [];
  const outcomes   = window.AxiusOutcomesV3   || [];

  const [otherText, setOtherText] = React.useState(perso.industryOther || '');
  const [generating, setGenerating] = React.useState(false);
  const [dots, setDots] = React.useState('');
  const previouslyComplete = React.useRef(
    Boolean(perso.industry && perso.challenge && perso.outcome));

  const pickIndustry = (id) => P.set({ industry: id,
    industryOther: id === 'other' ? otherText : null });
  const pickChallenge = (id) => P.set({ challenge: id });
  const pickOutcome   = (id) => P.set({ outcome: id });

  React.useEffect(() => {
    const complete = Boolean(perso.industry && perso.challenge && perso.outcome);
    if (complete && !previouslyComplete.current) {
      previouslyComplete.current = true;
      setGenerating(true);
      let frames = 0;
      const id = setInterval(() => {
        frames = (frames + 1) % 4;
        setDots('.'.repeat(frames));
      }, 280);
      const finish = setTimeout(() => {
        clearInterval(id);
        setGenerating(false);
        setDots('');
        const el = document.getElementById('before-and-after');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1200);
      return () => { clearInterval(id); clearTimeout(finish); };
    }
  }, [perso.industry, perso.challenge, perso.outcome]);

  const skipDiagnostic = () => P.skip();

  const renderChip = (option, selected, onClick) => {
    const label = lang === 'es' ? (option.labelEs || option.label) : option.label;
    return React.createElement('button', {
      key: option.id,
      type: 'button',
      role: 'radio',
      className: 'axius-j-btn',
      'aria-checked': selected,
      'aria-label': label,
      onClick,
      style: {
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 16px',
        border: selected ? '1px solid ' + J_TANGER : J_LINE,
        background: selected ? 'rgba(184,116,60,0.08)' : J_CANVAS,
        color: J_INK, fontFamily: J_SANS, fontSize: 14,
        cursor: 'pointer', textAlign: 'left',
        transition: 'all .12s ease',
      } },
      React.createElement('span', {
        style: { width: 8, height: 8, borderRadius: '50%',
                 background: selected ? J_TANGER : 'transparent',
                 border: '1px solid ' + (selected ? J_TANGER : J_FAINT) } }),
      label);
  };

  const qIndustry = lang === 'es' ? '01 · Industria' : '01 · Industry';
  const qChallenge = lang === 'es' ? '02 · Fricción' : '02 · Friction';
  const qOutcome = lang === 'es' ? '03 · Impacto' : '03 · Impact';

  return React.createElement('section', { id: 'dispatch',
    'data-axius-j-section': true,
    style: { padding: '108px 32px', borderTop: J_LINE_LO,
             background: J_CANVAS, color: J_INK, position: 'relative' } },
    React.createElement('div', { style: { maxWidth: 1180, margin: '0 auto' } },
      // Top row: eyebrow + skip
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between',
                 alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap',
                 gap: 12 } },
        React.createElement(EyebrowJ, null,
          lang === 'es' ? '00 DISPATCH · 3 PREGUNTAS' : '00 DISPATCH · 3 QUESTIONS'),
        React.createElement('button', {
          type: 'button',
          className: 'axius-j-btn',
          onClick: skipDiagnostic,
          'aria-label': lang === 'es' ? 'Saltar diagnóstico — ver todo' : 'Skip diagnostic — show everything',
          style: { background: 'transparent', border: 'none', cursor: 'pointer',
                   fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: J_TANGER, textTransform: 'uppercase' } },
          lang === 'es' ? 'Saltar — mostrarme todo →' : 'Skip — show me everything →'),
      ),
      React.createElement('h2', {
        style: { fontFamily: J_SERIF, fontStyle: 'italic',
                 fontWeight: 500, fontSize: 48, lineHeight: 1.05,
                 letterSpacing: '-0.03em', margin: '0 0 56px', maxWidth: 880 } },
        lang === 'es' ? '¿Qué tipo de negocio es este?' : 'What kind of business is this?'),

      // Q1
      React.createElement('div', {
        style: { marginBottom: 40 }, role: 'radiogroup', 'aria-label': qIndustry },
        React.createElement('div', {
          style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: J_MUTE, marginBottom: 14, textTransform: 'uppercase' } },
          qIndustry),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
          industries.map(opt =>
            renderChip(opt, perso.industry === opt.id, () => pickIndustry(opt.id)))),
        perso.industry === 'other' && React.createElement('input', {
          type: 'text', value: otherText, autoFocus: true,
          className: 'axius-j-input',
          onChange: (e) => {
            setOtherText(e.target.value);
            P.set({ industry: 'other', industryOther: e.target.value });
          },
          placeholder: lang === 'es' ? 'Cuéntanos en una palabra…' : 'Tell us in one word…',
          'aria-label': lang === 'es' ? 'Otra industria' : 'Other industry',
          style: { marginTop: 14, padding: '10px 14px', width: '100%', maxWidth: 360,
                   fontFamily: J_SANS, fontSize: 14, border: J_LINE,
                   background: J_CANVAS, color: J_INK, outline: 'none' } }),
      ),

      // Q2
      React.createElement('div', {
        style: { marginBottom: 40 }, role: 'radiogroup', 'aria-label': qChallenge },
        React.createElement('div', {
          style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: J_MUTE, marginBottom: 14, textTransform: 'uppercase' } },
          qChallenge),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
          challenges.map(opt =>
            renderChip(opt, perso.challenge === opt.id, () => pickChallenge(opt.id)))),
      ),

      // Q3
      React.createElement('div', {
        style: { marginBottom: 32 }, role: 'radiogroup', 'aria-label': qOutcome },
        React.createElement('div', {
          style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: J_MUTE, marginBottom: 14, textTransform: 'uppercase' } },
          qOutcome),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
          outcomes.map(opt =>
            renderChip(opt, perso.outcome === opt.id, () => pickOutcome(opt.id)))),
      ),

      generating && React.createElement('div', { role: 'status', 'aria-live': 'polite',
        style: { fontFamily: J_MONO, fontSize: 13, letterSpacing: '0.18em',
                 color: J_TANGER, marginTop: 16, textTransform: 'uppercase' } },
        (lang === 'es' ? 'GENERANDO PERFIL OPERATIVO' : 'GENERATING OPERATIONAL PROFILE') + dots),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 04 · BEFORE AND AFTER AXIUS — replaces What Changes (section 03)
// ════════════════════════════════════════════════════════════════════════
function BeforeAndAfterJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const ba = window.AxiusBeforeAndAfterV5 || {};
  const v3 = window.AxiusBeforeAfterV3 || { after: [], afterEs: [] };
  const afterList = lang === 'es' ? (v3.afterEs || v3.after) : v3.after;
  const fricBefore = ba.frictionBefore || {};
  const chall = perso && perso.challenge;
  const beforeCopy = chall && fricBefore[chall]
    ? (lang === 'es' ? fricBefore[chall].es : fricBefore[chall].en)
    : (lang === 'es'
        ? 'Cinco contratistas. Tres suscripciones. Ocho herramientas inconexas. Nadie es dueño del sistema completo.'
        : 'Five contractors. Three subscriptions. Eight disconnected tools. Nobody owns the whole system.');
  const afterUni = ba.afterUniversal || {};
  const afterIntro = lang === 'es' ? (afterUni.es || '') : (afterUni.en || '');

  const title = ba.title || {};
  const eyebrow = ba.eyebrow || {};
  const metrics = ba.metrics || [];

  return React.createElement('section', { id: 'before-and-after',
    'data-axius-j-section': true,
    style: { padding: '108px 32px', borderTop: J_LINE_LO,
             background: J_CANVAS, color: J_INK } },
    React.createElement('div', { style: { maxWidth: 1180, margin: '0 auto' } },
      React.createElement(EyebrowJ, { style: { marginBottom: 20 } },
        lang === 'es' ? '01 ANTES · DESPUÉS' : '01 BEFORE · AFTER'),
      React.createElement('h2', {
        style: { fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
                 fontSize: 56, lineHeight: 1.05,
                 letterSpacing: '-0.035em', margin: '0 0 64px', maxWidth: 920 } },
        lang === 'es' ? (title.es || '') : (title.en || '')),
      // Two columns
      React.createElement('div', {
        'data-axius-j-grid': '2col',
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
                 marginBottom: metrics.length ? 64 : 0 } },
        // Before
        React.createElement(HoverCellJ, { accent: J_MUTE,
          style: { padding: 32, border: J_LINE, background: J_CANVAS } },
          React.createElement('div', {
            style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                     color: J_MUTE, marginBottom: 12, textTransform: 'uppercase' } },
            lang === 'es' ? 'ANTES' : 'BEFORE'),
          React.createElement('p', {
            style: { fontFamily: J_SERIF, fontStyle: 'italic',
                     fontSize: 20, lineHeight: 1.5, margin: '0 0 24px',
                     letterSpacing: '-0.02em', color: J_INK,
                     whiteSpace: 'pre-line' } },
            beforeCopy),
          React.createElement('div', {
            style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                     color: J_MUTE, marginBottom: 8, textTransform: 'uppercase' } },
            lang === 'es' ? 'El fundador gestiona —' : 'Founder manages —'),
          React.createElement('ul', {
            style: { listStyle: 'none', padding: 0, margin: 0 } },
            ((lang === 'es' ? v3.beforeEs : v3.before) || []).map((item, i) =>
              React.createElement('li', { key: i,
                style: { padding: '8px 0', borderTop: i === 0 ? 'none' : J_LINE_LO,
                         fontSize: 14, color: J_DIM } },
                React.createElement('span', { style: { color: J_FAINT, marginRight: 10,
                                                         fontFamily: J_MONO, fontSize: 12 } }, '—'),
                item))),
        ),
        // After
        React.createElement(HoverCellJ, { accent: J_TANGER,
          style: { padding: 32, border: '2px solid ' + J_TANGER,
                   background: 'rgba(184,116,60,0.04)' } },
          React.createElement('div', {
            style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                     color: J_TANGER, marginBottom: 12, textTransform: 'uppercase' } },
            lang === 'es' ? 'DESPUÉS' : 'AFTER'),
          React.createElement('p', {
            style: { fontFamily: J_SERIF, fontStyle: 'italic',
                     fontSize: 22, lineHeight: 1.4, margin: '0 0 24px',
                     letterSpacing: '-0.02em', color: J_INK } },
            afterIntro),
          React.createElement('div', {
            style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                     color: J_TANGER, marginBottom: 8, textTransform: 'uppercase' } },
            lang === 'es' ? 'Axius es dueño de —' : 'Axius owns —'),
          React.createElement('ul', {
            style: { listStyle: 'none', padding: 0, margin: 0 } },
            (afterList || []).map((item, i) =>
              React.createElement('li', { key: i,
                style: { padding: '8px 0', borderTop: i === 0 ? 'none' : J_LINE_LO,
                         fontSize: 14, color: J_INK } },
                React.createElement('span', { style: { color: J_TANGER, marginRight: 10,
                                                         fontFamily: J_MONO, fontSize: 12 } }, '+'),
                item))),
        ),
      ),
      // Metrics tiles (relocated from hero, gated)
      window.axiusFabricationLive() && metrics.length > 0 && React.createElement('div', {
        'data-axius-j-grid': '4col',
        style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
                 borderTop: J_LINE, borderBottom: J_LINE_LO } },
        metrics.map((m, i) => React.createElement(HoverCellJ, { key: i,
          accent: [J_MINT, J_AMBER, J_TANGER, J_LAVENDER][i % 4],
          style: { padding: '32px 24px',
                   borderLeft: i === 0 ? 'none' : J_LINE_LO } },
          React.createElement('div', { style: {
            fontFamily: J_MONO, fontSize: 10, letterSpacing: '0.18em',
            color: J_MUTE, marginBottom: 14, textTransform: 'uppercase' } },
            m.label),
          React.createElement('div', { style: {
            fontFamily: J_SERIF, fontWeight: 500, fontSize: 36,
            letterSpacing: '-0.025em', color: J_INK, lineHeight: 1 } },
            // For purely-numeric values we use CountUpJ; otherwise verbatim
            (/^\d+×?$/.test(m.value))
              ? React.createElement(CountUpJ, {
                  to: parseInt(m.value, 10),
                  suffix: m.value.includes('×') ? '×' : '',
                })
              : m.value),
        )),
      ),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 05 · THE AXIUS METHOD — 4 stages
// ════════════════════════════════════════════════════════════════════════
function MethodJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const stages = window.AxiusMethodV3 || [];
  return jSection('method', [
    React.createElement(EyebrowJ, { key: 'eyb', style: { marginBottom: 20 } },
      lang === 'es' ? '02 EL MÉTODO' : '02 THE METHOD'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 56px', maxWidth: 880 } },
      lang === 'es' ? 'Cuatro etapas. Una sola línea de propiedad.' : 'Four stages. One line of ownership.'),
    React.createElement('div', { key: 'grid',
      'data-axius-j-grid': '4col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 } },
      stages.map((s, i) => {
        const acc = [J_MINT, J_AMBER, J_TANGER, J_LAVENDER][i % 4];
        return React.createElement(HoverCellJ, { key: s.n,
        accent: acc,
        style: { padding: '24px 20px',
                 borderTop: J_LINE,
                 borderLeft: i === 0 ? 'none' : J_LINE_LO } },
        React.createElement('div', {
          style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: acc, marginBottom: 10 } },
          (lang === 'es' ? 'Etapa ' : 'Stage ') + s.n),
        React.createElement('h3', {
          style: { fontFamily: J_SERIF, fontWeight: 500, fontSize: 28,
                   margin: '0 0 16px', letterSpacing: '-0.02em' } },
          s.name),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0,
                                                display: 'flex', flexDirection: 'column',
                                                gap: 8 } },
          (lang === 'es' ? s.bulletsEs : s.bullets).map((b, j) =>
            React.createElement('li', { key: j,
              style: { display: 'flex', alignItems: 'baseline', gap: 8,
                       fontSize: 14, color: J_DIM, lineHeight: 1.55 } },
              React.createElement('span', { style: { color: J_TANGER,
                                                       fontFamily: J_MONO, fontSize: 11 } }, '+'),
              React.createElement('span', null, b)))),
      );
      })),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 06 · MOST REQUESTED — cross-category top 6
// ════════════════════════════════════════════════════════════════════════
function MostRequestedJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const items = window.AxiusMostRequestedV5 || [];

  const scrollToCatalog = (e, n) => {
    e.preventDefault();
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return jSection('most-requested', [
    React.createElement(EyebrowJ, { key: 'eyb', style: { marginBottom: 20 } },
      lang === 'es' ? '03 LO MÁS PEDIDO' : '03 MOST REQUESTED'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 56px', maxWidth: 920 } },
      lang === 'es'
        ? 'Seis sistemas que la mayoría de negocios nos pide operar.'
        : 'Six systems most growing businesses ask us to run.'),
    React.createElement('div', { key: 'grid',
      'data-axius-j-grid': '3col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
      items.map((item, i) => React.createElement(HoverCellJ, { key: item.n,
        accent: [J_MINT, J_AMBER, J_TANGER, J_LAVENDER, J_SKY, J_COPPER][i % 6],
        style: { padding: 28, border: J_LINE, background: J_CANVAS,
                 display: 'flex', flexDirection: 'column', minHeight: 200 } },
        React.createElement('div', {
          style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: J_MUTE, marginBottom: 12, textTransform: 'uppercase' } },
          'N ' + item.n + ' · ' + item.category),
        React.createElement('h3', {
          style: { fontFamily: J_SERIF, fontWeight: 500, fontSize: 24,
                   margin: '0 0 12px', letterSpacing: '-0.02em' } },
          item.name),
        React.createElement('div', {
          style: { fontFamily: J_SANS, fontSize: 14, color: J_DIM,
                   lineHeight: 1.5, marginBottom: 16 } },
          item.metric),
        React.createElement('a', {
          className: 'axius-j-link',
          href: '#catalog',
          onClick: (e) => scrollToCatalog(e, item.n),
          'aria-label': (lang === 'es' ? 'Leer cómo funciona ' : 'Read how it works ') + item.name,
          style: { marginTop: 'auto', alignSelf: 'flex-start',
                   fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: J_TANGER, textDecoration: 'none',
                   textTransform: 'uppercase' } },
          (lang === 'es' ? 'Leer cómo funciona' : 'Read how it works'),
          React.createElement('span', { style: { marginLeft: 8 } }, '→')),
      ))),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 07 · CATALOG — industry-filtered, with per-workflow metrics inline
// ════════════════════════════════════════════════════════════════════════
function CatalogJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const [viewAll, setViewAll] = React.useState(false);
  const cats = window.AxiusCatalog || [];
  const tags = window.AxiusCatalogTags || {};
  const metrics = window.AxiusWorkflowMetricsV5 || {};
  const live = window.axiusFabricationLive();
  const ind = perso && perso.industry;
  const totalCount = cats.reduce((a, c) => a + (c.count || 0), 0);
  const filterOn = ind && !perso.skipped && !viewAll;
  const shown = filterOn
    ? cats.filter(c => {
        const t = tags[c.id] || [];
        return t.includes(ind) || t.includes('all');
      })
    : cats;
  const shownCount = shown.reduce((a, c) => a + (c.count || 0), 0);
  const indListV3 = window.AxiusIndustriesV3 || [];
  const indRec = indListV3.find(x => x.id === ind) ||
                 (window.AxiusIndustries || []).find(x => x.id === ind);
  const indLabel = ind === 'other'
    ? perso.industryOther
    : (indRec ? (lang === 'es' ? (indRec.labelEs || indRec.label) : indRec.label) : ind);

  return React.createElement('section', { id: 'catalog',
    'data-axius-j-section': true,
    style: { padding: '108px 32px', borderTop: J_LINE_LO,
             background: J_CANVAS, color: J_INK } },
    React.createElement('div', { style: { maxWidth: 1180, margin: '0 auto' } },
      React.createElement(EyebrowJ, { style: { marginBottom: 20 } },
        lang === 'es' ? '04 CATÁLOGO' : '04 CATALOG'),
      React.createElement('h2', {
        style: { fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
                 fontSize: 48, lineHeight: 1.05,
                 letterSpacing: '-0.03em', margin: '0 0 32px', maxWidth: 920 } },
        lang === 'es' ? 'Nueve categorías. Una sola capa operativa.' : 'Nine categories. One operating layer.'),
      filterOn && React.createElement('div', { role: 'status', 'aria-live': 'polite',
        style: { display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', marginBottom: 32,
        padding: '12px 16px', border: J_LINE_LO,
        background: 'rgba(184,116,60,0.04)',
        fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
        color: J_MUTE, flexWrap: 'wrap', gap: 8 } },
        React.createElement('span', null, lang === 'es'
          ? `Mostrando ${shownCount} de ${totalCount} capacidades para ${indLabel || ind}`
          : `Showing ${shownCount} of ${totalCount} capabilities for ${indLabel || ind}`),
        React.createElement('button', {
          type: 'button', onClick: () => setViewAll(true),
          className: 'axius-j-btn',
          'aria-label': lang === 'es' ? 'Ver todas las categorías' : 'Show all categories',
          style: { background: 'transparent', border: 'none', cursor: 'pointer',
                   fontFamily: J_MONO, fontSize: 11,
                   letterSpacing: '0.18em', color: J_TANGER } },
          lang === 'es' ? 'VER TODO →' : 'VIEW ALL →'),
      ),
      shown.map(c => React.createElement('div', { key: c.id,
        style: { marginBottom: 48 } },
        React.createElement(HoverCellJ, {
          accent: J_CATEGORY_ACCENT[c.id] || J_TANGER,
          style: { paddingTop: 20, paddingBottom: 12, borderTop: J_LINE_LO } },
          React.createElement('h3', {
            style: { fontSize: 28, margin: '0 0 4px',
                     fontFamily: J_SERIF, fontWeight: 500, letterSpacing: '-0.02em' } },
            lang === 'es' ? c.nameEs : c.name),
          React.createElement('div', {
            style: { fontSize: 12, color: J_MUTE,
                     fontFamily: J_MONO,
                     letterSpacing: '0.16em', marginBottom: 16 } },
            c.stack),
        ),
        React.createElement('ul', {
          style: { listStyle: 'none', padding: 0, margin: 0 } },
          (c.samples || []).map(s => {
            const metric = live && metrics[s.n];
            return React.createElement('li', { key: s.n,
              style: { padding: '12px 0', borderTop: J_LINE_LO, fontSize: 14,
                       color: J_DIM, lineHeight: 1.55 } },
              React.createElement('span', { style: { fontFamily: J_MONO,
                                                       fontSize: 11, letterSpacing: '0.18em',
                                                       color: J_MUTE } },
                `N ${s.n}`),
              ' · ',
              React.createElement('span', { style: { color: J_INK, fontWeight: 500 } }, s.name),
              ' — ',
              React.createElement('span', { style: { color: J_DIM } }, s.sub),
              metric && React.createElement('span', { style: {
                fontFamily: J_MONO, color: J_TANGER, fontSize: 11,
                letterSpacing: '0.08em', marginLeft: 8 } },
                '· ' + metric),
              React.createElement('span', { style: {
                fontFamily: J_MONO, color: J_MUTE, fontSize: 11,
                letterSpacing: '0.08em', marginLeft: 6 } },
                `(${s.pts} pts · ${s.time})`),
            );
          }),
        ),
        React.createElement('p', { style: { fontSize: 13, fontStyle: 'italic',
                                              color: J_MUTE, marginTop: 12 } },
          lang === 'es'
            ? `+ ${c.count - (c.samples||[]).length} más`
            : `+ ${c.count - (c.samples||[]).length} more`),
      )),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 08 · HOW IT RUNS — merged The Model (3 pillars) + How it Runs
// ════════════════════════════════════════════════════════════════════════
function HowItRunsJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const pillars = window.AxiusModelV3 || [];
  return jSection('how-it-runs', [
    React.createElement(EyebrowJ, { key: 'eyb', style: { marginBottom: 20 } },
      lang === 'es' ? '05 CÓMO OPERA' : '05 HOW IT RUNS'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 56px', maxWidth: 920 } },
      lang === 'es' ? 'Una sola capa responsable. Tres pilares que la sostienen.' : 'One accountable layer. Three pillars that hold it up.'),
    React.createElement('div', { key: 'grid',
      'data-axius-j-grid': '3col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
      pillars.map((p, i) => React.createElement(HoverCellJ, { key: p.id,
        accent: [J_MINT, J_TANGER, J_LAVENDER][i % 3],
        style: { padding: 32, border: J_LINE, background: J_CANVAS,
                 minHeight: 320 } },
        React.createElement('div', {
          style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: [J_MINT, J_TANGER, J_LAVENDER][i % 3],
                   marginBottom: 24, textTransform: 'uppercase' } },
          p.name),
        React.createElement('ul', {
          style: { listStyle: 'none', padding: 0, margin: 0,
                   display: 'flex', flexDirection: 'column', gap: 10 } },
          (lang === 'es' ? p.bulletsEs : p.bullets).map((b, j) =>
            React.createElement('li', { key: j,
              style: { padding: '8px 0', borderTop: j === 0 ? 'none' : J_LINE_LO,
                       display: 'flex', alignItems: 'baseline', gap: 10,
                       fontSize: 15, color: J_INK } },
              React.createElement('span', { style: { color: J_TANGER,
                                                       fontFamily: J_MONO, fontSize: 11 } }, '+'),
              React.createElement('span', null, b)))),
      ))),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 09 · PRICING — 3 tiles with Founder Track badge + setup fee
// ════════════════════════════════════════════════════════════════════════
function PricingJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const tiers = window.AxiusPricingV5 || [];
  const bookingHref = (window.AxiusConfig && window.AxiusConfig.bookingUrl)
                     || 'mailto:andres@axius.tech?subject=Axius Department engagement';

  return jSection('pricing', [
    React.createElement(EyebrowJ, { key: 'eyb', style: { marginBottom: 20 } },
      lang === 'es' ? '06 COMPROMISO' : '06 ENGAGEMENT'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 48px', maxWidth: 920 } },
      lang === 'es' ? 'Elige la capa que te queda.' : 'Pick the layer that fits.'),
    React.createElement('div', { key: 'grid',
      'data-axius-j-grid': '3col',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
      tiers.map((t, i) => {
        const featured = t.featured;
        // Cycle per-tile accent: Operator (mint) · Team featured (tangerine) ·
        // Department (lavender). Featured tile always takes tangerine so the
        // border + badge stay coherent with the existing 'Most Popular' chrome.
        const accentCycle = [J_MINT, J_TANGER, J_LAVENDER];
        const tileAccent = featured ? J_TANGER : accentCycle[i % accentCycle.length];
        const sub  = lang === 'es' ? (t.subEs || t.sub) : t.sub;
        const body = lang === 'es' ? (t.bodyEs || t.body) : t.body;
        const monthly = lang === 'es' ? (t.priceMonthlyEs || t.priceMonthly) : t.priceMonthly;
        const setup = lang === 'es' ? (t.priceSetupEs || t.priceSetup) : t.priceSetup;
        const features = lang === 'es' ? (t.featuresEs || t.features) : t.features;
        const ctaText = t.checkoutUrl
          ? (lang === 'es' ? 'Empezar' : 'Get Started')
          : (lang === 'es' ? 'Iniciar conversación' : 'Begin a Conversation');
        const ctaHref = t.checkoutUrl || bookingHref;
        const founderBadge = t.founderTrackBadge
          ? (lang === 'es' ? t.founderTrackBadge.es : t.founderTrackBadge.en)
          : null;
        const founderNote = t.founderTrackNote
          ? (lang === 'es' ? t.founderTrackNote.es : t.founderTrackNote.en)
          : null;

        return React.createElement(HoverCellJ, { key: t.id,
          accent: tileAccent,
          style: { border: featured ? '2px solid ' + J_TANGER : J_LINE,
                   padding: 32, background: J_CANVAS,
                   display: 'flex', flexDirection: 'column', minHeight: 480,
                   position: 'relative' } },
          featured && React.createElement('div', {
            style: { position: 'absolute', top: -12, left: 24,
                     background: J_TANGER, color: J_CANVAS,
                     fontFamily: J_MONO, fontSize: 10, letterSpacing: '0.18em',
                     padding: '4px 10px', textTransform: 'uppercase' } },
            lang === 'es' ? 'Más Popular' : 'Most Popular'),
          founderBadge && React.createElement('div', {
            style: { position: 'absolute', top: 16, right: 16,
                     background: 'rgba(184,116,60,0.12)',
                     color: J_TANGER, border: '1px solid ' + J_TANGER,
                     fontFamily: J_MONO, fontSize: 9, letterSpacing: '0.18em',
                     padding: '3px 8px', textTransform: 'uppercase',
                     fontWeight: 600 } },
            founderBadge),
          React.createElement('h3', {
            style: { fontFamily: J_SERIF, fontSize: 32, fontWeight: 500,
                     margin: '0 0 12px',
                     letterSpacing: '-0.025em' } }, t.name),
          React.createElement('div', {
            style: { fontSize: 15, color: J_DIM, marginBottom: 20, lineHeight: 1.5 } },
            sub),
          body && React.createElement('div', {
            style: { fontSize: 14, color: J_DIM, marginBottom: 20,
                     lineHeight: 1.55, fontStyle: 'italic' } },
            body),
          monthly && React.createElement('div', { style: { marginBottom: 20 } },
            React.createElement('div', {
              style: { fontFamily: J_MONO, fontSize: 16, color: J_INK,
                       letterSpacing: '0.02em', fontWeight: 500 } },
              monthly),
            setup && React.createElement('div', {
              style: { fontFamily: J_MONO, fontSize: 12, color: J_MUTE,
                       letterSpacing: '0.04em', marginTop: 4 } },
              setup),
          ),
          features && React.createElement('ul', {
            style: { listStyle: 'none', padding: 0, margin: '0 0 24px',
                     display: 'flex', flexDirection: 'column', gap: 8 } },
            features.map((f, i) => React.createElement('li', { key: i,
              style: { display: 'flex', alignItems: 'baseline', gap: 10,
                       fontSize: 14, color: J_DIM, lineHeight: 1.5 } },
              React.createElement('span', { style: { color: J_TANGER,
                                                       fontFamily: J_MONO, fontSize: 11 } }, '+'),
              React.createElement('span', null, f)))),
          founderNote && React.createElement('p', {
            style: { fontSize: 12, fontStyle: 'italic', color: J_TANGER,
                     margin: '0 0 24px', lineHeight: 1.5 } },
            founderNote),
          React.createElement('div', { style: { marginTop: 'auto' } },
            React.createElement('a', {
              className: 'axius-j-link',
              href: ctaHref,
              target: ctaHref.indexOf('mailto:') === 0 ? undefined : '_blank',
              rel: ctaHref.indexOf('mailto:') === 0 ? undefined : 'noopener noreferrer',
              'aria-label': ctaText + ' — ' + t.name,
              style: { display: 'inline-flex', alignItems: 'center', gap: 10,
                       background: featured ? J_TANGER : J_INK,
                       color: J_CANVAS, border: '1px solid ' + (featured ? J_TANGER : J_INK),
                       padding: '12px 20px',
                       fontFamily: J_SANS, fontSize: 13, fontWeight: 500,
                       textDecoration: 'none', letterSpacing: '-0.005em' } },
              ctaText,
              React.createElement('span', { style: { fontFamily: J_MONO,
                                                        color: J_CANVAS, fontSize: 12 } }, '→')),
          ),
        );
      })),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 10 · TESTIMONIALS — fabricated case studies w/ metrics + star rating link
// ════════════════════════════════════════════════════════════════════════
function TestimonialsJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const live = window.axiusFabricationLive();
  const cases = (window.AxiusFabricated && window.AxiusFabricated.caseStudies) || [];
  const gbp = window.AxiusGBP || {};

  return jSection('testimonials', [
    React.createElement(EyebrowJ, { key: 'eyb', style: { marginBottom: 20 } },
      lang === 'es' ? '07 RESULTADOS' : '07 RESULTS'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 56px', maxWidth: 920 } },
      lang === 'es' ? 'Lo que ha pasado dentro de los stacks de clientes.' : "What's happened inside client stacks."),
    live && cases.length > 0
      ? React.createElement('div', { key: 'grid',
          'data-axius-j-grid': '3col',
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
          cases.map((cs, i) => {
            const acc = [J_MINT, J_TANGER, J_LAVENDER, J_AMBER, J_SKY][i % 5];
            return React.createElement(HoverCellJ, { key: cs.id,
            accent: acc,
            style: { padding: 28, border: J_LINE, background: J_CANVAS,
                     display: 'flex', flexDirection: 'column', minHeight: 320 } },
            React.createElement('div', {
              style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                       color: acc, marginBottom: 12, textTransform: 'uppercase' } },
              cs.industry),
            React.createElement('h3', {
              style: { fontFamily: J_SERIF, fontWeight: 500, fontSize: 22,
                       margin: '0 0 4px', letterSpacing: '-0.02em' } },
              cs.company),
            React.createElement('div', {
              style: { fontFamily: J_SANS, fontSize: 13, color: J_MUTE,
                       marginBottom: 16, fontStyle: 'italic' } },
              lang === 'es' ? (cs.subtitleEs || cs.subtitle) : cs.subtitle),
            React.createElement('p', {
              style: { fontFamily: J_SERIF, fontSize: 15, lineHeight: 1.55,
                       color: J_DIM, margin: '0 0 20px' } },
              lang === 'es' ? (cs.bodyEs || cs.body) : cs.body),
            React.createElement('div', { style: {
              marginTop: 'auto', padding: '12px 0',
              borderTop: J_LINE_LO, fontFamily: J_MONO, fontSize: 12,
              color: acc, letterSpacing: '0.04em', fontWeight: 500 } },
              lang === 'es' ? (cs.outcomeEs || cs.outcome) : cs.outcome),
            );
          }))
      : React.createElement('p', { key: 'empty',
          style: { fontFamily: J_SANS, fontSize: 16,
                   fontStyle: 'italic', maxWidth: 600, color: J_INK,
                   lineHeight: 1.55 } },
          lang === 'es'
            ? 'Resultados verificados en revisión — los publicaremos cuando los clientes los firmen.'
            : 'Verified results in review — we will publish them once clients sign off.'),
    // Google review link
    React.createElement('div', { key: 'gbp',
      style: { marginTop: 48, paddingTop: 24, borderTop: J_LINE_LO,
               display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' } },
      React.createElement('div', {
        style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                 color: J_MUTE, textTransform: 'uppercase' } },
        '★★★★★'),
      gbp.url
        ? React.createElement('a', {
            className: 'axius-j-link',
            href: gbp.url, target: '_blank', rel: 'noopener noreferrer',
            'aria-label': lang === 'es' ? 'Ver reseñas en Google' : 'See reviews on Google',
            style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                     color: J_TANGER, textDecoration: 'none', textTransform: 'uppercase' } },
            (lang === 'es' ? 'VER EN GOOGLE BUSINESS' : 'SEE ON GOOGLE BUSINESS') + ' →')
        : React.createElement('span', {
            style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                     color: J_MUTE, textTransform: 'uppercase' } },
            lang === 'es'
              ? 'Reseñas recolectándose en Google Business — próximamente'
              : 'Reviews collected at Google Business — coming soon'),
    ),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 11 · OPERATOR (Founder) — drops "WHY AXIUS EXISTS" eyebrow
// ════════════════════════════════════════════════════════════════════════
function OperatorJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const f = window.AxiusFounder || {};
  const [photoFailed, setPhotoFailed] = React.useState(false);
  const fallbackCaption = (f.name || 'Andrés Toro') + ' · ' +
    (lang === 'es' ? 'foto no disponible' : 'photo unavailable');
  return jSection('founder', [
    React.createElement(EyebrowJ, { key: 'eyb', style: { marginBottom: 20 } },
      lang === 'es' ? '08 EL OPERADOR' : '08 THE OPERATOR'),
    React.createElement('div', { key: 'grid',
      'data-axius-j-grid': '2col',
      style: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56,
               alignItems: 'start' } },
      React.createElement('div', { key: 'photo' },
        React.createElement('div', {
          style: { aspectRatio: '3/4', width: '100%',
                   border: J_LINE, overflow: 'hidden', background: '#E9E6DF',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   padding: photoFailed ? 24 : 0 } },
          !photoFailed && React.createElement('img', {
            src: f.photo, alt: f.name || 'Andrés Toro, founder of Axius',
            onError: () => setPhotoFailed(true),
            style: { width: '100%', height: '100%', objectFit: 'cover',
                     filter: 'grayscale(.15) contrast(1.04)' } }),
          photoFailed && React.createElement('div', {
            role: 'img', 'aria-label': fallbackCaption,
            style: { fontFamily: J_MONO, fontSize: 12, letterSpacing: '0.12em',
                     color: J_MUTE, textAlign: 'center', textTransform: 'uppercase' } },
            fallbackCaption),
        ),
        React.createElement('div', {
          style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                   color: J_MUTE, marginTop: 12, textTransform: 'uppercase' } },
          'Fig. 01 · ' + (lang === 'es' ? 'Operador' : 'Operator')),
      ),
      React.createElement('div', { key: 'bio' },
        React.createElement('h2', {
          style: { fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
                   fontSize: 44, lineHeight: 1.05,
                   letterSpacing: '-0.03em', margin: '0 0 24px' } },
          lang === 'es' ? 'La mano sobre tus operaciones.' : 'The hand on your operations.'),
        React.createElement('p', {
          style: { fontSize: 16, color: J_DIM, lineHeight: 1.7,
                   whiteSpace: 'pre-line', margin: '0 0 32px' } },
          lang === 'es' ? (f.bioEs || '') : (f.bio || '')),
        React.createElement('blockquote', {
          style: { fontFamily: J_SERIF, fontStyle: 'italic', fontSize: 22,
                   lineHeight: 1.45, color: J_INK, margin: '0 0 32px',
                   borderLeft: '2px solid ' + J_TANGER, paddingLeft: 20 } },
          lang === 'es' ? (f.quoteEs || '') : (f.quote || '')),
        React.createElement('div', {
          style: { fontFamily: J_MONO, fontSize: 12, letterSpacing: '0.12em',
                   color: J_MUTE, display: 'flex', flexWrap: 'wrap', gap: 16 } },
          (f.facts || []).map((fact, i) => React.createElement('span', { key: i },
            fact.k.toUpperCase() + ' · ' + fact.v))),
      ),
    ),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 12 · QUESTIONS (FAQ) — accordion, V5 refreshed copy
// ════════════════════════════════════════════════════════════════════════
function QuestionsJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const items = window.AxiusFAQV5 || [];
  const [open, setOpen] = React.useState(0);

  return jSection('questions', [
    React.createElement(EyebrowJ, { key: 'eyb', style: { marginBottom: 20 } },
      lang === 'es' ? '09 APÉNDICE' : '09 APPENDIX'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
               fontSize: 48, lineHeight: 1.05,
               letterSpacing: '-0.03em', margin: '0 0 56px', maxWidth: 920 } },
      lang === 'es' ? 'Lo que la gente suele preguntar.' : 'What people usually ask.'),
    React.createElement('div', { key: 'list',
      style: { borderTop: J_LINE_LO } },
      items.map((it, i) => {
        const isOpen = open === i;
        const q = lang === 'es' ? (it.qEs || it.q) : it.q;
        const a = lang === 'es' ? (it.aEs || it.a) : it.a;
        return React.createElement('div', { key: i,
          style: { borderBottom: J_LINE_LO } },
          React.createElement('button', {
            type: 'button',
            className: 'axius-j-btn',
            onClick: () => setOpen(isOpen ? -1 : i),
            'aria-expanded': isOpen,
            'aria-controls': 'faq-answer-' + i,
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                     width: '100%', padding: '24px 0',
                     background: 'transparent', border: 'none',
                     cursor: 'pointer', textAlign: 'left',
                     fontFamily: J_SERIF, fontWeight: 500, fontSize: 22,
                     letterSpacing: '-0.02em', color: J_INK,
                     lineHeight: 1.4 } },
            React.createElement('span', null, q),
            React.createElement('span', {
              'aria-hidden': true,
              style: { fontFamily: J_MONO, fontSize: 18, color: J_TANGER,
                       marginLeft: 16, transition: 'transform 0.3s ease',
                       transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' } },
              '+'),
          ),
          React.createElement('div', {
            id: 'faq-answer-' + i,
            role: 'region',
            'aria-hidden': !isOpen,
            style: { maxHeight: isOpen ? 400 : 0, overflow: 'hidden',
                     transition: 'max-height 0.4s cubic-bezier(.2,.8,.2,1), padding 0.3s ease',
                     paddingBottom: isOpen ? 24 : 0 } },
            React.createElement('p', {
              style: { fontFamily: J_SANS, fontSize: 16, color: J_DIM,
                       lineHeight: 1.65, margin: 0, maxWidth: 760 } },
              a),
          ),
        );
      })),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 13 · CTA BEGIN — final CTA
// ════════════════════════════════════════════════════════════════════════
function CTABeginJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const bookingHref = (window.AxiusConfig && window.AxiusConfig.bookingUrl)
                     || 'mailto:andres@axius.tech';
  const items = lang === 'es'
    ? ['Cuellos de botella identificados', 'Oportunidades priorizadas',
       'Recomendaciones inmediatas', 'Roadmap incluido']
    : ['Bottlenecks identified', 'Opportunities prioritized',
       'Immediate recommendations', 'Roadmap included'];
  return jSection('cta-begin', [
    React.createElement(EyebrowJ, { key: 'eyb', style: { marginBottom: 24 } },
      lang === 'es' ? '10 EMPEZAR' : '10 BEGIN'),
    React.createElement('h2', { key: 'h2',
      style: { fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 500,
               fontSize: 80, lineHeight: 1.02,
               letterSpacing: '-0.04em', margin: '0 0 40px', maxWidth: 980 } },
      lang === 'es' ? 'Treinta minutos.' : 'Thirty minutes.',
      React.createElement('br'),
      React.createElement('span', { style: { color: J_TANGER } },
        lang === 'es' ? 'Claridad completa.' : 'Complete clarity.')),
    React.createElement('ul', { key: 'list',
      'data-axius-j-grid': '2col',
      style: { listStyle: 'none', padding: 0, margin: '0 0 40px',
               display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12,
               maxWidth: 680 } },
      items.map((item, i) => React.createElement('li', { key: i,
        style: { display: 'flex', alignItems: 'baseline', gap: 12,
                 fontSize: 16, color: J_INK, fontFamily: J_SANS } },
        React.createElement('span', { style: { color: J_TANGER, fontSize: 16 } }, '✓'),
        React.createElement('span', null, item)))),
    React.createElement('a', { key: 'btn',
      className: 'axius-j-link',
      href: bookingHref, target: '_blank', rel: 'noopener noreferrer',
      'aria-label': lang === 'es' ? 'Iniciar una conversación — agendar llamada' : 'Begin a conversation — book a call',
      style: { display: 'inline-flex', alignItems: 'center', gap: 12,
               background: J_INK, color: J_CANVAS,
               border: '1px solid ' + J_INK, padding: '16px 28px',
               fontFamily: J_SANS, fontSize: 14, fontWeight: 500,
               textDecoration: 'none' } },
      lang === 'es' ? 'Iniciar una conversación' : 'Begin a Conversation',
      React.createElement('span', { style: { fontFamily: J_MONO,
                                                color: J_TANGER, fontSize: 13 } }, '→')),
  ]);
}

// ════════════════════════════════════════════════════════════════════════
// 14 · FOOTER — ported from Option 4
// ════════════════════════════════════════════════════════════════════════
function FooterJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const fcfg = window.AxiusFooterV4 || {};
  const cols = fcfg.columns || [];
  const legalEntity = lang === 'es' ? (fcfg.legalEntityEs || fcfg.legalEntity) : fcfg.legalEntity;
  const basedLine = lang === 'es' ? (fcfg.basedLineEs || fcfg.basedLine) : fcfg.basedLine;
  const email = fcfg.email || 'andres@axius.tech';
  const year = fcfg.copyrightYear || 2026;
  const madeWith = lang === 'es' ? 'Hecho con intención en Medellín' : 'Made with intent in Medellín';

  // Replace /v4/ links with /v5/ counterparts for Option 5
  const v5Cols = cols.map(col => Object.assign({}, col, {
    links: (col.links || []).map(lnk => Object.assign({}, lnk, {
      href: lnk.href && lnk.href.indexOf('/v4/') === 0
        ? lnk.href.replace('/v4/', '/v5/')
        : lnk.href,
    })),
  }));

  const handleAnchor = (href) => (e) => {
    if (href.charAt(0) === '#') {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return React.createElement('footer', { id: 'footer', role: 'contentinfo',
    'data-axius-j-section': true,
    style: { padding: '72px 32px 48px',
             background: J_CANVAS_LO,
             color: J_INK, borderTop: J_LINE_LO } },
    React.createElement('div', { style: { maxWidth: 1180, margin: '0 auto' } },
      React.createElement('div', {
        'data-axius-j-footer-grid': true,
        style: { display: 'grid',
                 gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: 40,
                 marginBottom: 48 } },
        // Brand column
        React.createElement('div', null,
          React.createElement('div', {
            style: { display: 'inline-flex', alignItems: 'baseline', gap: 1,
                     fontFamily: J_SERIF, fontWeight: 600, fontSize: 24,
                     letterSpacing: '-0.04em', color: J_INK, marginBottom: 16 } },
            React.createElement('span', null, 'axius'),
            React.createElement('span', { style: { color: J_TANGER } }, '.')),
          React.createElement('p', {
            style: { fontFamily: J_SERIF, fontSize: 15, lineHeight: 1.55,
                     color: J_DIM, margin: '0 0 16px', maxWidth: 320 } },
            legalEntity),
          React.createElement('div', {
            style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.12em',
                     color: J_MUTE, marginBottom: 8 } },
            basedLine),
          React.createElement('a', {
            className: 'axius-j-link',
            href: 'mailto:' + email,
            'aria-label': lang === 'es' ? 'Enviar email a Andrés' : 'Email Andrés directly',
            style: { fontFamily: J_MONO, fontSize: 12, letterSpacing: '0.12em',
                     color: J_INK, textDecoration: 'none',
                     borderBottom: '1px solid ' + J_TANGER, paddingBottom: 1 } },
            email),
        ),
        // 3 link columns
        v5Cols.map((col, i) => React.createElement('div', { key: i },
          React.createElement('div', {
            style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
                     color: J_MUTE, marginBottom: 16, textTransform: 'uppercase' } },
            lang === 'es' ? (col.headEs || col.headEn) : col.headEn),
          React.createElement('ul', {
            style: { listStyle: 'none', padding: 0, margin: 0,
                     display: 'flex', flexDirection: 'column', gap: 12 } },
            (col.links || []).map((lnk, j) => {
              const label = lang === 'es' ? (lnk.labelEs || lnk.labelEn) : lnk.labelEn;
              const isExternal = /^https?:|^mailto:|^tel:/.test(lnk.href);
              const isAnchor = lnk.href.charAt(0) === '#';
              const props = {
                className: 'axius-j-link',
                href: lnk.href,
                'aria-label': label,
                style: { fontFamily: J_SANS, fontSize: 14,
                         color: J_INK, textDecoration: 'none',
                         lineHeight: 1.4 },
              };
              if (isExternal) {
                props.target = '_blank';
                props.rel = 'noopener noreferrer';
              }
              if (isAnchor) {
                props.onClick = handleAnchor(lnk.href);
              }
              return React.createElement('li', { key: j },
                React.createElement('a', props, label));
            })),
        )),
      ),
      // Bottom row
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between',
                 alignItems: 'center', borderTop: J_LINE_LO,
                 paddingTop: 24, flexWrap: 'wrap', gap: 12 } },
        React.createElement('div', {
          style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.12em',
                   color: J_MUTE } },
          '© ' + year + ' Axius · ' + email),
        React.createElement('div', {
          style: { fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.12em',
                   color: J_MUTE, fontStyle: 'italic' } },
          madeWith),
      ),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// 15 · CHAT BUBBLE — operator-vibe floating widget (post-diagnostic only)
// ════════════════════════════════════════════════════════════════════════
function ChatBubbleJ({ perso }) {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const P = window.AxiusPersonalization;
  const cfg = window.AxiusConfig || {};
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const visible = P && P.hasAnswered && P.hasAnswered();
  if (!visible) return null;

  const bridgeLive = Boolean(
    cfg.ringWebhookUrl &&
    cfg.ringWebhookChatId &&
    cfg.ringWebhookUrl.indexOf('YOUR_TELEGRAM_BOT_TOKEN') === -1 &&
    cfg.ringWebhookChatId !== 'YOUR_TELEGRAM_CHAT_ID');

  const greeting = lang === 'es'
    ? '¿Qué está frenando las cosas? Te digo exactamente cómo lo armaríamos.'
    : "What's slowing things down? I'll tell you exactly how we'd structure it.";

  const placeholder = lang === 'es' ? 'Cuéntame en una línea…' : 'Tell me in one line…';
  const operatorLabel = lang === 'es' ? 'OPERADOR · EN LÍNEA' : 'OPERATOR · ONLINE';
  const sendLabel = lang === 'es' ? 'Enviar' : 'Send';
  const successText = lang === 'es'
    ? 'Listo — Andrés te escribe en menos de 24h.'
    : "Got it — Andrés will be back in touch within 24h.";

  const submit = (e) => {
    e.preventDefault();
    const m = msg.trim();
    if (!m) return;
    if (bridgeLive) {
      const ctx = `[axius v5 chat ${lang.toUpperCase()}] industry=${perso.industry || '-'} challenge=${perso.challenge || '-'} outcome=${perso.outcome || '-'}`;
      const text = `${ctx}\n\n${m}`;
      try {
        fetch(cfg.ringWebhookUrl, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: cfg.ringWebhookChatId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        }).catch(() => {});
      } catch (_) {}
    }
    setSent(true);
  };

  if (!open) {
    return React.createElement('button', {
      type: 'button',
      className: 'axius-j-btn axius-j-chat-bubble',
      'data-axius-j-chat-closed': true,
      'aria-label': lang === 'es' ? 'Hablar con el operador' : 'Talk to the operator',
      onClick: () => setOpen(true),
      style: {
        position: 'fixed', right: 24, bottom: 24, zIndex: 150,
        width: 64, height: 64, borderRadius: '50%',
        background: J_TANGER, color: J_CANVAS,
        border: '1px solid ' + J_TANGER,
        cursor: 'pointer', boxShadow: '0 8px 32px rgba(184,116,60,0.32)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: J_SERIF, fontStyle: 'italic', fontWeight: 600, fontSize: 22,
      } },
      React.createElement('span', { 'aria-hidden': true, style: {
        position: 'absolute', top: 8, right: 8,
        width: 10, height: 10, borderRadius: '50%',
        background: J_MINT, border: '2px solid ' + J_CANVAS,
        animation: 'axJMintPulse 2.2s ease-in-out infinite',
      } }),
      'A');
  }

  return React.createElement('div', {
    role: 'dialog', 'aria-modal': 'false',
    'aria-label': lang === 'es' ? 'Chat con el operador' : 'Operator chat',
    'data-axius-j-chat-panel': true,
    className: 'axius-j-chat-bubble',
    style: {
      position: 'fixed', right: 24, bottom: 24, zIndex: 150,
      width: 360, maxHeight: 480,
      background: J_CANVAS, color: J_INK,
      border: J_LINE, boxShadow: '0 16px 48px rgba(10,9,7,0.18)',
      display: 'flex', flexDirection: 'column',
    } },
    // Header
    React.createElement('div', { style: {
      padding: '16px 20px', borderBottom: J_LINE_LO,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        React.createElement('span', { 'aria-hidden': true, style: {
          display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
          background: J_MINT,
          boxShadow: '0 0 0 4px rgba(122,146,114,0.16)',
          animation: 'axJMintPulse 2.2s ease-in-out infinite',
        } }),
        React.createElement('span', { style: {
          fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.18em',
          color: J_INK, fontWeight: 600, textTransform: 'uppercase' } },
          operatorLabel),
      ),
      React.createElement('button', {
        type: 'button',
        className: 'axius-j-btn',
        onClick: () => setOpen(false),
        'aria-label': lang === 'es' ? 'Cerrar chat' : 'Close chat',
        style: { background: 'transparent', border: 'none', cursor: 'pointer',
                 padding: 4, fontFamily: J_MONO, fontSize: 14, color: J_MUTE } },
        '✕'),
    ),
    // Body
    React.createElement('div', { style: {
      flex: 1, padding: 20, overflowY: 'auto',
      display: 'flex', flexDirection: 'column', gap: 16 } },
      // Operator greeting bubble
      React.createElement('div', { style: {
        alignSelf: 'flex-start', maxWidth: '85%',
        background: '#EDECE6', padding: '12px 16px',
        fontFamily: J_SERIF, fontSize: 15, lineHeight: 1.5,
        color: J_INK } },
        greeting),
      sent && React.createElement('div', { role: 'status', 'aria-live': 'polite',
        style: { alignSelf: 'flex-start', maxWidth: '85%',
                 background: 'rgba(184,116,60,0.08)',
                 borderLeft: '2px solid ' + J_TANGER, padding: '12px 16px',
                 fontFamily: J_SERIF, fontSize: 14, lineHeight: 1.5,
                 color: J_INK } },
        successText),
    ),
    // Input
    !sent && React.createElement('form', { onSubmit: submit,
      style: { borderTop: J_LINE_LO, padding: 12,
               display: 'flex', alignItems: 'center', gap: 8 } },
      React.createElement('input', {
        type: 'text', value: msg,
        className: 'axius-j-input',
        onChange: (e) => setMsg(e.target.value),
        placeholder: placeholder,
        'aria-label': placeholder,
        style: { flex: 1, padding: '10px 12px',
                 fontFamily: J_SANS, fontSize: 14,
                 border: J_LINE_LO, background: J_CANVAS,
                 color: J_INK, outline: 'none' } }),
      React.createElement('button', {
        type: 'submit',
        className: 'axius-j-btn',
        'aria-label': sendLabel,
        style: { background: J_TANGER, color: J_CANVAS,
                 border: '1px solid ' + J_TANGER,
                 padding: '10px 14px',
                 fontFamily: J_MONO, fontSize: 11, letterSpacing: '0.12em',
                 cursor: 'pointer', textTransform: 'uppercase',
                 fontWeight: 500 } },
        '→'),
    ),
  );
}

// ════════════════════════════════════════════════════════════════════════
// Composition root
// ════════════════════════════════════════════════════════════════════════
window.AxiusDirectionJ = function () {
  const P = window.AxiusPersonalization;
  const [perso, setPerso] = React.useState(P.get);

  React.useEffect(() => P.subscribe(setPerso), []);

  React.useEffect(() => {
    installJStyles();
    // Read saved language preference at boot
    try {
      const saved = localStorage.getItem('axius:lang');
      if (saved && window.AxiusConfig && !window.AxiusConfig.lang) {
        window.AxiusConfig.lang = saved;
      }
    } catch (_) {}
  }, []);

  return React.createElement('div', {
    id: 'axius-direction-J-body',
    style: { background: J_CANVAS, color: J_INK, minHeight: '100vh' } },
    React.createElement('a', { className: 'axius-skip-link', href: '#hero',
      'aria-label': 'Skip to main content' }, 'Skip to content'),
    React.createElement(VideoIntroJ, { perso }),
    React.createElement(NavJ, { perso }),
    React.createElement(HeroJ, { perso }),
    React.createElement(DispatchJ, { perso }),
    React.createElement(BeforeAndAfterJ, { perso }),
    React.createElement(MethodJ, { perso }),
    React.createElement(MostRequestedJ, { perso }),
    React.createElement(CatalogJ, { perso }),
    React.createElement(HowItRunsJ, { perso }),
    React.createElement(PricingJ, { perso }),
    React.createElement(TestimonialsJ, { perso }),
    React.createElement(OperatorJ, { perso }),
    React.createElement(QuestionsJ, { perso }),
    React.createElement(CTABeginJ, { perso }),
    React.createElement(FooterJ, { perso }),
    React.createElement(ChatBubbleJ, { perso }),
  );
};

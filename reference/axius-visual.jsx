// axius-visual.jsx — Visual layer for Option 2.
// Registers FounderVideoF / DemosF / BeforeAfterF under window.AxiusVisual.

window.AxiusVisual = window.AxiusVisual || {};

window.AxiusVisual.FounderVideoF = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const fv = window.AxiusFounderVideo || {};
  if (!fv.url) {
    return React.createElement('div', { id: 'founder-video',
      style: { aspectRatio: '16/9', maxWidth: 720, margin: '0 auto 48px',
               border: '1px dashed rgba(10,9,7,0.32)',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               color: 'rgba(10,9,7,0.55)', fontStyle: 'italic',
               background: '#F7F6F2', padding: '24px', textAlign: 'center' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 36, color: 'rgba(10,9,7,0.32)',
                                                 marginBottom: 12 } }, '▶'),
        React.createElement('p', { style: { margin: 0 } },
          lang === 'es' ? 'Intro de 60 segundos con Andrés — grabando pronto.'
                        : '60-second intro from Andrés — recording soon.'),
      ),
    );
  }
  return React.createElement('video', { id: 'founder-video',
    src: fv.url, poster: fv.poster, controls: true, playsInline: true,
    style: { width: '100%', maxWidth: 720, margin: '0 auto 48px', display: 'block' },
  });
};

window.AxiusVisual.DemosF = function () {
  if (!window.axiusFabricationLive()) return null;
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const demos = (window.AxiusFabricated && window.AxiusFabricated.demos) || [];
  if (demos.length === 0) return null;

  return React.createElement('section', { id: 'demos',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)',
             background: '#F7F6F2', color: '#0F0E0C' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('h2', { style: { fontFamily: "'Source Serif 4', serif",
                                            fontSize: 36, marginBottom: 32 } },
        lang === 'es' ? 'Cómo se ve en vivo' : 'How it runs'),
      React.createElement('div', { style: { display: 'grid',
                                              gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 } },
        demos.map(d => React.createElement('article', { key: d.id,
          style: { padding: 24, border: '1px solid rgba(10,9,7,0.16)',
                   minHeight: 200, position: 'relative', overflow: 'hidden',
                   background: '#F7F6F2' } },
          React.createElement('h3', { style: { fontFamily: "'Source Serif 4', serif",
                                                 fontSize: 20, marginBottom: 16 } },
            lang === 'es' ? d.titleEs : d.title),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column',
                                                  gap: 8 } },
            (lang === 'es' ? d.captionsEs : d.captions).map((cap, i) =>
              React.createElement('div', { key: i,
                style: { padding: '8px 12px', background: 'rgba(184,116,60,0.08)',
                         border: '1px solid rgba(184,116,60,0.24)',
                         fontSize: 13, color: '#0F0E0C',
                         opacity: 0, animation: `axiusDemoFade 4s ${i * 1.2}s infinite` } },
                cap)),
          ),
        )),
      ),
    ),
  );
};

window.AxiusVisual.BeforeAfterF = function () {
  if (!window.axiusFabricationLive()) return null;
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const pairs = (window.AxiusFabricated && window.AxiusFabricated.beforeAfter) || [];
  if (pairs.length === 0) return null;

  const [flipped, setFlipped] = React.useState({});

  return React.createElement('section', { id: 'before-after',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)',
             background: '#F7F6F2', color: '#0F0E0C' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('h2', { style: { fontFamily: "'Source Serif 4', serif",
                                            fontSize: 36, marginBottom: 32 } },
        lang === 'es' ? 'Antes / después' : 'Before / after'),
      React.createElement('div', { style: { display: 'grid',
                                              gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 } },
        pairs.map(p => {
          const isFlipped = !!flipped[p.id];
          return React.createElement('div', { key: p.id,
            onClick: () => setFlipped(f => ({ ...f, [p.id]: !f[p.id] })),
            style: { cursor: 'pointer', display: 'flex', gap: 16 } },
            React.createElement('div', { style: { flex: 1, padding: 24,
                                                     background: '#FEF3E8',
                                                     border: '1px solid rgba(10,9,7,0.08)',
                                                     minHeight: 160, opacity: isFlipped ? 0.3 : 1,
                                                     transition: 'opacity .3s' } },
              React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace',
                                                       fontSize: 10, letterSpacing: '0.18em',
                                                       color: 'rgba(10,9,7,0.55)', marginBottom: 8 } },
                lang === 'es' ? 'ANTES' : 'BEFORE'),
              React.createElement('p', { style: { margin: 0, fontSize: 15 } },
                lang === 'es' ? (p.beforeEs || p.before) : p.before)),
            React.createElement('div', { style: { flex: 1, padding: 24,
                                                     background: '#E8F4EC',
                                                     border: '1px solid rgba(10,9,7,0.08)',
                                                     minHeight: 160, opacity: isFlipped ? 1 : 0.3,
                                                     transition: 'opacity .3s' } },
              React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace',
                                                       fontSize: 10, letterSpacing: '0.18em',
                                                       color: 'rgba(10,9,7,0.55)', marginBottom: 8 } },
                lang === 'es' ? 'DESPUÉS' : 'AFTER'),
              React.createElement('p', { style: { margin: 0, fontSize: 15 } },
                lang === 'es' ? (p.afterEs || p.after) : p.after)),
          );
        }),
      ),
    ),
  );
};

// Inject the demo keyframes once (idempotent)
window.AxiusVisual.installStyles = function () {
  if (typeof document === 'undefined') return;
  if (document.getElementById('axius-visual-keyframes')) return;
  const el = document.createElement('style');
  el.id = 'axius-visual-keyframes';
  el.textContent = `
    @keyframes axiusDemoFade {
      0%, 20% { opacity: 0; transform: translateY(4px); }
      30%, 90% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-4px); }
    }
    [data-axius-faq-button]:focus-visible {
      outline: 2px solid #B8743C;
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(el);
};

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

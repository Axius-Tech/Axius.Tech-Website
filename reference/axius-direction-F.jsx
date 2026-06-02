// axius-direction-F.jsx — Composition root for Option 2 (diagnostic-first variant).
// Mounted at / by Phase 8's index.html cutover. /v1 keeps mounting E05 unchanged.

window.AxiusDirectionF = function () {
  const P = window.AxiusPersonalization;
  const [perso, setPerso] = React.useState(P.get);
  React.useEffect(() => P.subscribe(setPerso), []);
  React.useEffect(() => {
    if (window.AxiusDiagnostic && window.AxiusDiagnostic.installStyles)
      window.AxiusDiagnostic.installStyles();
  }, []);

  const showInline = !P.hasAnswered();

  return React.createElement(React.Fragment, null,
    !showInline && React.createElement(window.AxiusDiagnosticBar),
    showInline && React.createElement(window.AxiusDiagnostic),
    React.createElement('div', { id: 'axius-direction-F-body',
      style: { paddingTop: !showInline ? 44 : 0,
               background: '#F7F6F2', minHeight: '100vh' } },
      // Sections added in Tasks 4.2, 4.3, 4.4
    ),
  );
};

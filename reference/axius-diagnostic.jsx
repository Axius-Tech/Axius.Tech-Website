// Axius diagnostic wizard — 3 steps: Industry → Challenge → Outcome.
// Reads/writes window.AxiusPersonalization. Localized via window.AxiusConfig.lang.
window.AxiusDiagnostic = function (props) {
  const T = window.AxiusTokens;
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const tr = (key, fallback) => {
    const tableEN = window.AxiusDiagnosticCopyEN;
    const tableES = window.AxiusDiagnosticCopyES;
    const t = (lang === 'es' ? tableES : tableEN) || {};
    return t[key] || fallback || key;
  };

  const [step, setStep] = React.useState(1);
  const [industry, setIndustry] = React.useState(null);
  const [industryOther, setIndustryOther] = React.useState('');
  const [challenge, setChallenge] = React.useState(null);
  const [outcome, setOutcome] = React.useState(null);

  // Step 1 — Industry chips
  if (step === 1) {
    return React.createElement(
      'section',
      { 'data-axius-diagnostic-step': 1,
        style: { minHeight: '100vh', padding: '64px 32px', background: T.canvas } },
      React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
        React.createElement(SkipLink, { onSkip: () => window.AxiusPersonalization.skip() }),
        React.createElement('h2', { style: { fontFamily: T.serif, fontSize: 44, marginBottom: 12 } }, tr('step1Title')),
        React.createElement('p',  { style: { color: T.dim, marginBottom: 32 } }, tr('kicker')),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 } },
          (window.AxiusIndustries || []).map(i =>
            React.createElement('button', {
              key: i.id, type: 'button',
              onClick: () => {
                if (i.id === 'other') return; // handled by inline input
                setIndustry(i.id); setStep(2);
              },
              style: chipStyle(industry === i.id) },
              lang === 'es' ? i.labelEs : i.label)
          ),
        ),
        // Inline 'Other' input revealed when the Other chip is focused
        React.createElement(OtherInput, {
          value: industryOther,
          onCommit: (val) => { setIndustry('other'); setIndustryOther(val); setStep(2); },
        }),
      ),
    );
  }
  // Steps 2 + 3 added in Task 3.2.
  return null;
};

// Tiny helpers (kept inside the file to avoid extra script loads)
function chipStyle(active) {
  return {
    appearance: 'none', cursor: 'pointer',
    background: active ? '#0F0E0C' : 'transparent',
    color: active ? '#F7F6F2' : '#0F0E0C',
    border: '1px solid rgba(10,9,7,0.16)',
    padding: '18px 20px', textAlign: 'left',
    fontFamily: 'Inter, system-ui, sans-serif', fontSize: 15,
    lineHeight: 1.25, borderRadius: 0,
  };
}
function SkipLink({ onSkip }) {
  return React.createElement('button', {
    type: 'button', onClick: onSkip,
    style: { position: 'absolute', top: 24, right: 32, background: 'transparent',
             border: 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
             fontSize: 11, letterSpacing: '0.18em', color: 'rgba(10,9,7,0.55)' } },
    'SKIP — SHOW EVERYTHING');
}
function OtherInput({ value, onCommit }) {
  const [v, setV] = React.useState(value || '');
  return React.createElement('div', { style: { marginTop: 24 } },
    React.createElement('input', {
      placeholder: 'Other — type your industry',
      value: v, onChange: (e) => setV(e.target.value),
      onKeyDown: (e) => { if (e.key === 'Enter' && v.trim().length > 1) onCommit(v.trim()); },
      maxLength: 60,
      style: { width: 320, padding: '12px 14px', border: '1px solid rgba(10,9,7,0.16)',
               background: 'transparent', fontFamily: 'Inter', fontSize: 15 } }),
    React.createElement('button', {
      type: 'button', onClick: () => v.trim().length > 1 && onCommit(v.trim()),
      style: { marginLeft: 8, padding: '12px 16px', background: '#0F0E0C',
               color: '#F7F6F2', border: 'none', cursor: 'pointer',
               fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em' } },
      'CONTINUE →'),
  );
}

// Copy tables (separate so they can be edited without touching wizard logic)
window.AxiusDiagnosticCopyEN = {
  kicker:     'A 30-second diagnostic',
  step1Title: 'What industry are you in?',
  step2Title: 'Where does the operation feel heaviest?',
  step3Title: 'How much should Axius take on?',
  back:       '← Back',
  skipLink:   'Skip — show everything',
  continue:   'Continue →',
};
window.AxiusDiagnosticCopyES = {
  kicker:     'Diagnóstico de 30 segundos',
  step1Title: '¿En qué industria estás?',
  step2Title: '¿Dónde se siente más pesada la operación?',
  step3Title: '¿Cuánto debería asumir Axius?',
  back:       '← Volver',
  skipLink:   'Saltar — mostrar todo',
  continue:   'Continuar →',
};

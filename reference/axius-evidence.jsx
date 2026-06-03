// axius-evidence.jsx — Evidence layer for Option 2.
// Mounts Testimonials, CaseStudies, Metrics, GBP under <EvidenceF/> in F.jsx.

window.AxiusEvidence = window.AxiusEvidence || {};

window.AxiusEvidence.TestimonialsF = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const list = window.AxiusTestimonials || [];
  if (list.length === 0) {
    return React.createElement('section', { id: 'testimonials',
      style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)',
               background: '#F7F6F2', color: '#0F0E0C' } },
      React.createElement('div', { style: { maxWidth: 800, margin: '0 auto', textAlign: 'center' } },
        React.createElement('p', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                                              letterSpacing: '0.18em', color: 'rgba(10,9,7,0.55)' } },
          lang === 'es' ? 'TESTIMONIOS' : 'TESTIMONIALS'),
        React.createElement('p', { style: { fontFamily: "'Source Serif 4', serif", fontStyle: 'italic',
                                              fontSize: 22, color: 'rgba(10,9,7,0.65)', marginTop: 12,
                                              lineHeight: 1.45 } },
          lang === 'es'
            ? 'Discreto por diseño — las primeras voces publicadas aterrizan en Q3 2026 cuando nuestra cohorte piloto complete.'
            : 'Quiet by design — the first published voices land Q3 2026 after our pilot cohort completes.'),
      ),
    );
  }
  // Populated case: render real testimonials when AxiusTestimonials has entries.
  return React.createElement('section', { id: 'testimonials',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)',
             background: '#F7F6F2', color: '#0F0E0C' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('h2', { style: { fontFamily: "'Source Serif 4', serif",
                                            fontSize: 36, marginBottom: 32 } },
        lang === 'es' ? 'Voces de operadores' : 'Operator voices'),
      React.createElement('div', { style: { display: 'grid',
                                              gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } },
        list.map((t, i) => React.createElement('blockquote', { key: t.id || i,
          style: { padding: 24, margin: 0, border: '1px solid rgba(10,9,7,0.16)' } },
          React.createElement('p', { style: { fontFamily: "'Source Serif 4', serif",
                                                fontStyle: 'italic', fontSize: 18, marginBottom: 16 } },
            '"' + (lang === 'es' ? (t.quoteEs || t.quote) : t.quote) + '"'),
          React.createElement('footer', { style: { fontSize: 13, color: 'rgba(10,9,7,0.65)' } },
            React.createElement('strong', null, t.name || ''),
            t.role ? ' · ' + (lang === 'es' ? (t.roleEs || t.role) : t.role) : null,
            t.company ? ' · ' + t.company : null),
        )),
      ),
    ),
  );
};

window.AxiusEvidence.CaseStudiesF = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const real = window.AxiusCaseStudies || [];
  const fab  = window.axiusFabricationLive()
    ? ((window.AxiusFabricated && window.AxiusFabricated.caseStudies) || [])
    : [];
  const all  = [...real, ...fab];

  if (all.length === 0) {
    return React.createElement('section', { id: 'case-studies',
      style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)',
               background: '#F7F6F2', color: '#0F0E0C' } },
      React.createElement('div', { style: { maxWidth: 800, margin: '0 auto', textAlign: 'center' } },
        React.createElement('p', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                                              letterSpacing: '0.18em', color: 'rgba(10,9,7,0.55)' } },
          lang === 'es' ? 'CASOS DE ESTUDIO' : 'CASE STUDIES'),
        React.createElement('p', { style: { fontStyle: 'italic', fontSize: 18, marginTop: 12,
                                              color: 'rgba(10,9,7,0.65)' } },
          lang === 'es'
            ? `Los casos de estudio se publican trimestralmente — el próximo lote llega en ${window.AxiusEvidence.nextQuarter(lang)}.`
            : `Case studies publish quarterly — next set drops ${window.AxiusEvidence.nextQuarter(lang)}.`),
      ),
    );
  }

  return React.createElement('section', { id: 'case-studies',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)',
             background: '#F7F6F2', color: '#0F0E0C' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto' } },
      React.createElement('h2', { style: { fontFamily: "'Source Serif 4', serif",
                                            fontSize: 36, marginBottom: 32 } },
        lang === 'es' ? 'Casos de estudio' : 'Case studies'),
      React.createElement('div', { style: { display: 'grid',
                                              gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 } },
        all.map(c => React.createElement('article', { key: c.id,
          style: { padding: 24, border: '1px solid rgba(10,9,7,0.16)' } },
          React.createElement('h3', { style: { fontFamily: "'Source Serif 4', serif",
                                                 fontSize: 22, marginBottom: 4 } }, c.company),
          React.createElement('p',  { style: { fontFamily: 'JetBrains Mono, monospace',
                                                 fontSize: 11, letterSpacing: '0.16em',
                                                 color: 'rgba(10,9,7,0.55)', marginBottom: 16 } },
            lang === 'es' ? (c.subtitleEs || c.subtitle) : c.subtitle),
          React.createElement('p',  { style: { fontSize: 14, lineHeight: 1.6,
                                                 color: 'rgba(10,9,7,0.85)', marginBottom: 16 } },
            lang === 'es' ? (c.bodyEs || c.body) : c.body),
          React.createElement('p',  { style: { fontFamily: 'JetBrains Mono, monospace',
                                                 fontSize: 13, fontWeight: 600,
                                                 color: '#B8743C' } },
            lang === 'es' ? (c.outcomeEs || c.outcome) : c.outcome),
        )),
      ),
    ),
  );
};

// Helper — used by both CaseStudiesF post-deadline and elsewhere.
window.AxiusEvidence.nextQuarter = function (lang) {
  const now = new Date();
  const month = now.getMonth(); // 0–11
  const year = now.getFullYear();
  const q = Math.floor(month / 3) + 2; // next quarter
  const adjQ = q > 4 ? q - 4 : q;
  const adjY = q > 4 ? year + 1 : year;
  return `Q${adjQ} ${adjY}`;
};

window.AxiusEvidence.MetricsF = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const op = window.AxiusOperationalMetrics || {};
  const fabLive = window.axiusFabricationLive();
  const outcomes = fabLive
    ? ((window.AxiusFabricated && window.AxiusFabricated.outcomeMetrics) || [])
    : [];

  return React.createElement('section', { id: 'metrics',
    style: { padding: '96px 32px', borderTop: '1px solid rgba(10,9,7,0.08)',
             background: '#F7F6F2', color: '#0F0E0C' } },
    React.createElement('div', { style: { maxWidth: 1100, margin: '0 auto',
                                            display: 'grid', gridTemplateColumns: '1fr 1fr',
                                            gap: 32 } },
      React.createElement('div', null,
        React.createElement('p', { style: { fontFamily: 'JetBrains Mono, monospace',
                                              fontSize: 11, letterSpacing: '0.18em',
                                              color: 'rgba(10,9,7,0.55)', marginBottom: 16 } },
          lang === 'es' ? 'OPERACIONAL' : 'OPERATIONAL'),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0,
                                                lineHeight: 1.7 } },
          React.createElement('li', null, lang === 'es'
            ? `Ventana de respuesta: ${op.responseWindow?.departamento || '< 24h'} (Departamento) / ${op.responseWindow?.equipo || '48h'} (Equipo) / ${op.responseWindow?.operador || '72h'} (Operador)`
            : `Response window: ${op.responseWindow?.departamento || '< 24h'} (Departamento) / ${op.responseWindow?.equipo || '48h'} (Equipo) / ${op.responseWindow?.operador || '72h'} (Operador)`),
          React.createElement('li', null, lang === 'es'
            ? `Sistemas activos: ${op.activeSystems || 'in pilot'}`
            : `Active systems: ${op.activeSystems || 'in pilot'}`),
          React.createElement('li', null, lang === 'es'
            ? `Cadencia: semanal / quincenal / mensual`
            : `Cadence: weekly / biweekly / monthly`),
        ),
      ),
      React.createElement('div', null,
        React.createElement('p', { style: { fontFamily: 'JetBrains Mono, monospace',
                                              fontSize: 11, letterSpacing: '0.18em',
                                              color: 'rgba(10,9,7,0.55)', marginBottom: 16 } },
          lang === 'es' ? 'RESULTADOS' : 'OUTCOMES'),
        fabLive
          ? React.createElement('div', { style: { display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 } },
              outcomes.map(o => React.createElement('div', { key: o.id,
                style: { padding: 16, border: '1px solid rgba(10,9,7,0.16)' } },
                React.createElement('div', { style: { fontFamily: "'Source Serif 4', serif",
                                                        fontSize: 28, fontWeight: 600,
                                                        color: '#0F0E0C' } }, o.value),
                React.createElement('div', { style: { fontSize: 13,
                                                        color: 'rgba(10,9,7,0.65)',
                                                        marginTop: 4 } },
                  lang === 'es' ? (o.labelEs || o.label) : o.label),
              )),
            )
          : React.createElement('p', { style: { fontStyle: 'italic',
                                                  color: 'rgba(10,9,7,0.55)' } },
              lang === 'es' ? 'Métricas de resultados se publican en Q3 2026.'
                            : 'Outcome metrics publish Q3 2026.'),
      ),
    ),
  );
};

window.AxiusEvidence.GBPCardF = function () {
  const lang = (window.AxiusConfig && window.AxiusConfig.lang) || 'en';
  const g = window.AxiusGBP || {};
  if (!g.url || g.rating == null || g.reviewCount == null) {
    return React.createElement('section', { id: 'gbp',
      style: { padding: '64px 32px', borderTop: '1px solid rgba(10,9,7,0.08)',
               background: '#F7F6F2', textAlign: 'center', color: '#0F0E0C' } },
      React.createElement('p', { style: { fontStyle: 'italic', color: 'rgba(10,9,7,0.55)',
                                            maxWidth: 600, margin: '0 auto' } },
        lang === 'es'
          ? 'Perfil de Google Business próximamente — dejando este espacio para que las reseñas aterricen naturalmente.'
          : 'Google Business profile coming soon — leaving room here so reviews land naturally.'),
    );
  }
  return React.createElement('section', { id: 'gbp',
    style: { padding: '64px 32px', borderTop: '1px solid rgba(10,9,7,0.08)',
             background: '#F7F6F2', textAlign: 'center', color: '#0F0E0C' } },
    React.createElement('div', { style: { display: 'inline-block' } },
      React.createElement('span', { style: { fontFamily: "'Source Serif 4', serif",
                                               fontSize: 28, fontWeight: 600 } },
        g.rating + '★'),
      React.createElement('span', { style: { marginLeft: 12, color: 'rgba(10,9,7,0.65)' } },
        `${g.reviewCount} ${lang === 'es' ? 'reseñas' : 'reviews'}`),
    ),
    React.createElement('div', { style: { marginTop: 8 } },
      React.createElement('a', { href: g.url, target: '_blank', rel: 'noopener noreferrer',
        style: { color: '#B8743C', textDecoration: 'none', fontSize: 13 } },
        lang === 'es' ? 'Leer todas las reseñas en Google →' : 'Read all reviews on Google →'),
    ),
  );
};

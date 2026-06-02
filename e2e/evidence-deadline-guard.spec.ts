import { test, expect } from '@playwright/test';

const harness = `
  <!doctype html><html><head><meta charset="utf-8"></head>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
    <script type="text/babel" src="/reference/axius-shared.jsx"></script>
    <script type="text/babel" src="/reference/axius-evidence.jsx"></script>
    <script type="text/babel">
      function boot(){ if (!window.AxiusEvidence?.CaseStudiesF) return setTimeout(boot, 50);
        ReactDOM.createRoot(document.getElementById('root'))
          .render(React.createElement(window.AxiusEvidence.CaseStudiesF));
      } boot();
    </script>
  </body></html>`;

test.describe('Evidence deadline guard', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (_) {} });
  });

  test('fabricated case studies render before deadline', async ({ page }) => {
    await page.goto('/'); // any served page so the harness's relative <script src> resolves
    await page.setContent(harness, { waitUntil: 'networkidle' });
    await expect(page.locator("text=Mariana's Cantina Group")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=Hartwell & Bain LLP')).toBeVisible();
    await expect(page.locator('text=Bridgepoint Realty Partners')).toBeVisible();
  });

  test('fabricated case studies unmount when post-deadline override is set', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('axius:devmode', '1');
      localStorage.setItem('axius:deadline-override', '2000-01-01');
    });
    await page.goto('/');
    await page.setContent(harness, { waitUntil: 'networkidle' });
    await expect(page.locator("text=Mariana's Cantina Group")).not.toBeVisible({ timeout: 5_000 });
    await expect(page.locator('text=/Case studies publish quarterly/')).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

const harness = (extraInit = '') => `
  <!doctype html><html><head><meta charset="utf-8"></head>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
    <script type="text/babel" src="/reference/axius-shared.jsx"></script>
    <script type="text/babel" src="/reference/axius-diagnostic.jsx"></script>
    <script type="text/babel" src="/reference/axius-direction-F.jsx"></script>
    <script type="text/babel">
      function boot(){
        if (!window.AxiusDirectionF || !window.AxiusPersonalization)
          return setTimeout(boot, 50);
        ${extraInit}
        ReactDOM.createRoot(document.getElementById('root'))
          .render(React.createElement(window.AxiusDirectionF));
      } boot();
    </script>
  </body></html>`;

test.describe('AxiusDirectionF', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (_) {} });
  });

  test('F renders the diagnostic on first visit', async ({ page }) => {
    // Navigate to baseURL first so the page has a real origin —
    // relative <script src="/reference/..."> URLs in setContent resolve against it.
    await page.goto('/');
    await page.setContent(harness(), { waitUntil: 'networkidle' });
    await expect(page.locator('[data-axius-diagnostic-step="1"]')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('text=What industry are you in?')).toBeVisible();
  });

  test('Hero kicker appears after answering industry', async ({ page }) => {
    await page.goto('/');
    await page.setContent(harness(`
      // Seed personalization to "complete" state BEFORE the React root mounts
      // so HeroF renders with the kicker on first render.
      window.AxiusPersonalization.set({
        industry: 'realestate', challenge: 'leadsleak', outcome: 'fix-one',
        skipped: false,
      });
    `), { waitUntil: 'networkidle' });
    await expect(page.locator('text=/For real-estate operators —/')).toBeVisible({ timeout: 15_000 });
  });
});

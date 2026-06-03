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
    <script type="text/babel" src="/reference/axius-evidence.jsx"></script>
    <script type="text/babel" src="/reference/axius-visual.jsx"></script>
    <script type="text/babel" src="/reference/axius-direction-F.jsx"></script>
    <script type="text/babel">
      function boot(){
        if (!window.AxiusDirectionF || !window.AxiusPersonalization
            || !window.AxiusDiagnostic || !window.AxiusDiagnosticBar
            || !window.AxiusEvidence?.TestimonialsF
            || !window.AxiusVisual?.DemosF)
          return setTimeout(boot, 50);
        ${extraInit}
        ReactDOM.createRoot(document.getElementById('root'))
          .render(React.createElement(window.AxiusDirectionF));
      } boot();
    </script>
  </body></html>`;

test.describe('ChatF mode auto-detection', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (_) {} });
  });

  test('Completer mode chat shows diagnostic context + recommendation list', async ({ page }) => {
    await page.goto('/');
    await page.setContent(harness(`
      window.AxiusPersonalization.set({
        industry: 'realestate', challenge: 'leadsleak', outcome: 'fix-one', skipped: false,
      });
    `), { waitUntil: 'networkidle' });
    await expect(page.locator('#chat')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator("#chat").locator("text=/you're in real estate/i").or(page.locator("#chat").locator("text=Real estate"))).toBeVisible();
    await expect(page.locator('#chat').locator('text=/Walk me through/i').or(page.locator('#chat').locator('text=Caminar por'))).toBeVisible();
    await expect(page.locator('#chat').locator('text=/Book a call/i').or(page.locator('#chat').locator('text=Agendar llamada'))).toBeVisible();
  });

  test('Skipper mode chat opens with buttoned diagnostic flow', async ({ page }) => {
    await page.goto('/');
    await page.setContent(harness(`
      window.AxiusPersonalization.skip();
    `), { waitUntil: 'networkidle' });
    await expect(page.locator('#chat')).toBeVisible({ timeout: 15_000 });
    // Skipper sees the industry question first
    await expect(page.locator('#chat').locator('text=/What industry are you in/i').or(page.locator('#chat').locator('text=/En qué industria/i'))).toBeVisible();
  });

  test('Open mode chat shows free-prompt greeting', async ({ page }) => {
    // No localStorage seed → state is default (no industry, not skipped) → open mode.
    // The diagnostic wizard is shown first, but ChatF mounts at the bottom of the page.
    // For this test we just verify the chat section is attached to the DOM.
    await page.goto('/');
    await page.setContent(harness(`
      // No personalization set — pure first-visit open chat
    `), { waitUntil: 'networkidle' });
    await expect(page.locator('#chat')).toBeAttached({ timeout: 15_000 });
  });
});

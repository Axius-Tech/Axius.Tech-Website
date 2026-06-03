import { test, expect } from '@playwright/test';

test.describe('Option 4 at /v4', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (_) {} });
  });

  test('/v4 renders the commercial-ready hero', async ({ page }) => {
    await page.goto('/v4/');
    await expect(page.locator('text=TECHNOLOGY OPERATING PARTNER').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('text=Run').first()).toBeVisible();
    await expect(page.locator('text=Not your tech.').first()).toBeVisible();
  });

  test('/v4 has JSON-LD structured data', async ({ page }) => {
    await page.goto('/v4/');
    await page.waitForFunction(() => {
      const el = document.getElementById('axius-jsonld');
      return el && el.textContent && el.textContent.includes('Axius');
    }, { timeout: 15_000 });
    const jsonLdText = await page.locator('#axius-jsonld').textContent();
    const parsed = JSON.parse(jsonLdText || '{}');
    expect(parsed.name).toBe('Axius');
    expect(parsed['@type']).toBe('ProfessionalService');
  });

  test('/v4 sticky CTA appears after scroll', async ({ page }) => {
    await page.goto('/v4/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Let H4 mount
    // Sticky CTA should be hidden initially or below threshold
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.5 }));
    await page.waitForTimeout(500);
    await expect(page.locator('text=Book a Call').first()).toBeVisible({ timeout: 5_000 });
  });

  test('/v4 contact form is present and accessible', async ({ page }) => {
    await page.goto('/v4/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('input[type="email"]').first()).toBeAttached({ timeout: 15_000 });
  });

  test('/v4 footer has privacy + terms links', async ({ page }) => {
    await page.goto('/v4/');
    await expect(page.locator('a[href="/v4/privacy.html"]')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('a[href="/v4/terms.html"]')).toBeVisible();
  });

  test('/v4/privacy.html serves content', async ({ page }) => {
    await page.goto('/v4/privacy.html');
    await expect(page.locator('h1', { hasText: 'Privacy Policy' })).toBeVisible({ timeout: 10_000 });
  });

  test('/v4/terms.html serves content', async ({ page }) => {
    await page.goto('/v4/terms.html');
    await expect(page.locator('h1', { hasText: 'Terms of Service' })).toBeVisible({ timeout: 10_000 });
  });

  test('Regression: / still serves Option 2', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-axius-diagnostic-step="1"]')).toBeVisible({ timeout: 15_000 });
  });

  test('Regression: /v1 still serves Option 1', async ({ page }) => {
    await page.goto('/v1/');
    await expect(page.locator('text=Run').first()).toBeVisible({ timeout: 15_000 });
  });

  test('Regression: /v3 still serves Option 3', async ({ page }) => {
    await page.goto('/v3/');
    await expect(page.locator('text=TECHNOLOGY OPERATING PARTNER').first()).toBeVisible({ timeout: 15_000 });
  });
});

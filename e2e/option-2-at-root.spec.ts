import { test, expect } from '@playwright/test';

test.describe('Option 2 at /', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (_) {} });
  });

  test('/ serves Option 2 with the diagnostic for a fresh visitor', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-axius-diagnostic-step="1"]')).toBeVisible({ timeout: 15_000 });
  });

  test('/ does NOT load axius-direction-E05.jsx', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', r => requests.push(r.url()));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(requests.find(u => u.includes('axius-direction-E05.jsx')), 'must not load E05').toBeUndefined();
  });
});

test.describe('Option 1 still at /v1', () => {
  test('/v1/ still serves Option 1', async ({ page }) => {
    await page.goto('/v1/');
    await expect(page.locator('text=Run').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('text=your business.').first()).toBeVisible();
    await expect(page.locator('text=Not your tech.').first()).toBeVisible();
  });
});

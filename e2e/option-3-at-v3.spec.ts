import { test, expect } from '@playwright/test';

test.describe('Option 3 at /v3', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (_) {} });
  });

  test('/v3 renders the Option 3 hero', async ({ page }) => {
    await page.goto('/v3/');
    await expect(page.locator('text=TECHNOLOGY OPERATING PARTNER').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('text=Run').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('text=Not your tech.').first()).toBeVisible({ timeout: 15_000 });
  });

  test('/v3 renders the DISPATCH diagnostic + AXIUS METHOD', async ({ page }) => {
    await page.goto('/v3/');
    await expect(page.locator('text=DISPATCH').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('text=THE AXIUS METHOD')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('text=ASSESS')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('text=EVOLVE')).toBeVisible({ timeout: 15_000 });
  });

  test('/v3 pricing tiles: Operator $2,500, Team $5,000, Department custom', async ({ page }) => {
    await page.goto('/v3/');
    await expect(page.locator('text=Starting at $2,500/mo')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('text=Starting at $5,000/mo')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('text=Custom Engagement')).toBeVisible({ timeout: 15_000 });
  });

  test('/v3 does NOT load Option 2 scripts (F / diagnostic / evidence)', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', r => requests.push(r.url()));
    await page.goto('/v3/');
    await page.waitForLoadState('networkidle');
    expect(requests.find(u => u.includes('axius-direction-F.jsx'))).toBeUndefined();
    expect(requests.find(u => u.includes('axius-diagnostic.jsx'))).toBeUndefined();
    expect(requests.find(u => u.includes('axius-evidence.jsx'))).toBeUndefined();
  });

  test('/ still serves Option 2', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-axius-diagnostic-step="1"]')).toBeVisible({ timeout: 15_000 });
  });

  test('/v1/ still serves Option 1', async ({ page }) => {
    await page.goto('/v1/');
    await expect(page.locator('text=Run').first()).toBeVisible({ timeout: 15_000 });
  });
});

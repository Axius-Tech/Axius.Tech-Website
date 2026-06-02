import { test, expect } from '@playwright/test';

test.describe('Option 1 baseline (current site at /)', () => {
  test('hero renders the Quiet 0.5 tagline', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Run').first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=your business.').first()).toBeVisible();
    await expect(page.locator('text=Not your tech.').first()).toBeVisible();
  });

  test('founder section shows the three figures', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Fig. 01')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=Fig. 02')).toBeVisible();
    await expect(page.locator('text=Fig. 03')).toBeVisible();
  });
});

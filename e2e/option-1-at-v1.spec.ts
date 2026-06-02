import { test, expect } from '@playwright/test';

test.describe('Option 1 at /v1', () => {
  test('renders the Quiet 0.5 tagline', async ({ page }) => {
    await page.goto('/v1/');
    await expect(page.locator('text=Run').first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=your business.').first()).toBeVisible();
    await expect(page.locator('text=Not your tech.').first()).toBeVisible();
  });

  test('loads NO Option 2 scripts', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', r => requests.push(r.url()));
    await page.goto('/v1/');
    await page.waitForLoadState('networkidle');
    const banned = [
      'axius-diagnostic.jsx',
      'axius-evidence.jsx',
      'axius-visual.jsx',
      'axius-direction-F.jsx',
    ];
    for (const b of banned) {
      expect(requests.find(u => u.includes(b)), `must not load ${b}`).toBeUndefined();
    }
  });
});

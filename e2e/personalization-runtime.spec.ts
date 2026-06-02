import { test, expect } from '@playwright/test';

test('AxiusPersonalization API is present and functional', async ({ page }) => {
  await page.goto('/v1/');  // loads axius-shared.jsx, which now carries the new globals
  await page.waitForFunction(() => typeof window.AxiusPersonalization?.get === 'function');
  const initial = await page.evaluate(() => window.AxiusPersonalization.get());
  expect(initial.industry).toBeNull();
  expect(initial.skipped).toBe(false);

  await page.evaluate(() => window.AxiusPersonalization.set({ industry: 'hospitality' }));
  const after = await page.evaluate(() => window.AxiusPersonalization.get());
  expect(after.industry).toBe('hospitality');

  await page.evaluate(() => window.AxiusPersonalization.reset());
  const reset = await page.evaluate(() => window.AxiusPersonalization.get());
  expect(reset.industry).toBeNull();
});

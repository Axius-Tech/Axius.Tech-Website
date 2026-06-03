import { test, expect } from '@playwright/test';

test.describe('AxiusPersonalization', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.clear(); } catch (_) {} });
  });

  test('API is present and functional', async ({ page }) => {
    await page.goto('/v1/');
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

  test('subscribe fires on set, stops after unsubscribe', async ({ page }) => {
    await page.goto('/v1/');
    await page.waitForFunction(() => typeof window.AxiusPersonalization?.subscribe === 'function');
    const result = await page.evaluate(() => {
      const events: (string | null)[] = [];
      const off = window.AxiusPersonalization.subscribe((s: any) => events.push(s.industry));
      window.AxiusPersonalization.set({ industry: 'wellness' });
      off();
      window.AxiusPersonalization.set({ industry: 'legal' });
      return events;
    });
    expect(result).toEqual(['wellness']);
  });

  test('30-day TTL expires stale state on load', async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem('axius:perso:v1', JSON.stringify({
          industry: 'wellness',
          challenge: null,
          outcome: null,
          industryOther: null,
          skipped: false,
          completedAt: Date.now() - 31 * 86400000,
          version: 1,
        }));
      } catch (_) {}
    });
    await page.goto('/v1/');
    await page.waitForFunction(() => typeof window.AxiusPersonalization?.get === 'function');
    const state = await page.evaluate(() => window.AxiusPersonalization.get());
    expect(state.industry).toBeNull();
  });

  test('corrupted localStorage falls back to default state without throwing', async ({ page }) => {
    await page.addInitScript(() => {
      try { localStorage.setItem('axius:perso:v1', 'not-json'); } catch (_) {}
    });
    await page.goto('/v1/');
    await page.waitForFunction(() => typeof window.AxiusPersonalization?.get === 'function');
    const state = await page.evaluate(() => window.AxiusPersonalization.get());
    expect(state.industry).toBeNull();
    expect(state.skipped).toBe(false);
  });
});

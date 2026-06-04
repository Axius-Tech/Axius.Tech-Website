import { test, expect } from '@playwright/test';

test.describe('Option 5 at /v5', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try { localStorage.clear(); } catch (_) {}
      try { sessionStorage.clear(); } catch (_) {}
    });
  });

  test('/v5 renders the premium hero with Run / your business. / Not your tech.', async ({ page }) => {
    await page.goto('/v5/');
    // Skip the video intro programmatically to reveal the hero
    await page.evaluate(() => {
      try { sessionStorage.setItem('axius:v5-video-seen', '1'); } catch (_) {}
    });
    await page.reload();
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 });
    const heroText = await page.locator('h1').first().innerText();
    expect(heroText).toContain('Run');
    expect(heroText).toContain('your business.');
    expect(heroText).toContain('Not your tech.');
  });

  test('/v5 shows the video intro with skip button', async ({ page }) => {
    await page.goto('/v5/');
    // Video intro should be visible (dialog with skip button)
    await expect(page.getByRole('dialog', { name: /Axius intro|Intro de Axius/i })
      .or(page.locator('button[aria-label*="Skip"]').first())
      .first()).toBeVisible({ timeout: 15_000 });
  });

  test('/v5 Dispatch diagnostic renders 3 question groups', async ({ page }) => {
    await page.goto('/v5/');
    await page.evaluate(() => {
      try { sessionStorage.setItem('axius:v5-video-seen', '1'); } catch (_) {}
    });
    await page.reload();
    await expect(page.locator('text=DISPATCH').first()).toBeVisible({ timeout: 15_000 });
    // Three radiogroups: Industry, Friction, Impact
    const groups = page.locator('[role="radiogroup"]');
    await expect(groups).toHaveCount(3, { timeout: 10_000 });
  });

  test('/v5 chat bubble appears after diagnostic is answered', async ({ page }) => {
    await page.goto('/v5/');
    await page.evaluate(() => {
      try { sessionStorage.setItem('axius:v5-video-seen', '1'); } catch (_) {}
    });
    await page.reload();
    // Initially: no chat bubble
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-axius-j-chat-closed]')).toHaveCount(0);
    // Force-set personalization to "answered"
    await page.evaluate(() => {
      if (window.AxiusPersonalization) {
        window.AxiusPersonalization.set({
          industry: 'realestate',
          challenge: 'sales',
          outcome: 'revenue',
        });
      }
    });
    await expect(page.locator('[data-axius-j-chat-closed]')).toBeVisible({ timeout: 5_000 });
  });

  test('/v5 Before and After section is present', async ({ page }) => {
    await page.goto('/v5/');
    await page.evaluate(() => {
      try { sessionStorage.setItem('axius:v5-video-seen', '1'); } catch (_) {}
    });
    await page.reload();
    await expect(page.locator('text=BEFORE AND AFTER AXIUS').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#before-and-after')).toBeAttached();
  });

  test('/v5 Most Requested shows the 6 cross-category workflows', async ({ page }) => {
    await page.goto('/v5/');
    await page.evaluate(() => {
      try { sessionStorage.setItem('axius:v5-video-seen', '1'); } catch (_) {}
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#most-requested')).toBeAttached({ timeout: 15_000 });
    await expect(page.locator('text=Missed-call recovery').first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=AI FAQ chatbot').first()).toBeVisible();
    await expect(page.locator('text=Knowledge-base agent').first()).toBeVisible();
  });

  test('/v5 Pricing shows Operator + Founder Track badge + Team featured + Department', async ({ page }) => {
    await page.goto('/v5/');
    await page.evaluate(() => {
      try { sessionStorage.setItem('axius:v5-video-seen', '1'); } catch (_) {}
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#pricing')).toBeAttached({ timeout: 15_000 });
    await expect(page.locator('#pricing >> text=Operator').first()).toBeVisible();
    await expect(page.locator('text=FOUNDER TRACK').first()).toBeVisible();
    await expect(page.locator('#pricing >> text=Team').first()).toBeVisible();
    await expect(page.locator('#pricing >> text=Department').first()).toBeVisible();
    await expect(page.locator('text=Most Popular').first()).toBeVisible();
  });

  test('/v5 Footer privacy + terms links work', async ({ page }) => {
    await page.goto('/v5/');
    await page.evaluate(() => {
      try { sessionStorage.setItem('axius:v5-video-seen', '1'); } catch (_) {}
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('a[href="/v5/privacy.html"]')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('a[href="/v5/terms.html"]')).toBeVisible();
  });

  test('/v5/privacy.html serves content with /v5/ back link', async ({ page }) => {
    await page.goto('/v5/privacy.html');
    await expect(page.locator('h1', { hasText: 'Privacy Policy' })).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('a.legal-back[href="/v5/"]')).toBeVisible();
  });

  test('/v5/terms.html serves content with /v5/ back link', async ({ page }) => {
    await page.goto('/v5/terms.html');
    await expect(page.locator('h1', { hasText: 'Terms of Service' })).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('a.legal-back[href="/v5/"]')).toBeVisible();
  });

  test('/v5 has JSON-LD structured data', async ({ page }) => {
    await page.goto('/v5/');
    await page.waitForFunction(() => {
      const el = document.getElementById('axius-jsonld');
      return el && el.textContent && el.textContent.includes('Axius');
    }, { timeout: 15_000 });
    const jsonLdText = await page.locator('#axius-jsonld').textContent();
    const parsed = JSON.parse(jsonLdText || '{}');
    expect(parsed.name).toBe('Axius');
    expect(parsed.url).toContain('/v5/');
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

  test('Regression: /v4 still serves Option 4', async ({ page }) => {
    await page.goto('/v4/');
    await expect(page.locator('text=TECHNOLOGY OPERATING PARTNER').first()).toBeVisible({ timeout: 15_000 });
  });
});

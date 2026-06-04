import { test, expect } from '@playwright/test';

// Option 5 (Quiet 0.9 — E05-forked) renders an entry stage by default
// (video → industry dispatch → site). Tests bypass the entry stage by
// appending `?skipEntry=1` to the URL so the full site renders.
const SITE = '/v5/?skipEntry=1';

test.describe('Option 5 at /v5', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try { localStorage.clear(); } catch (_) {}
      try { sessionStorage.clear(); } catch (_) {}
    });
  });

  test('/v5 renders the premium hero with Run / your business. / Not your tech.', async ({ page }) => {
    await page.goto(SITE);
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 });
    const heroText = await page.locator('h1').first().innerText();
    expect(heroText).toContain('Run');
    expect(heroText).toContain('your business.');
    expect(heroText).toContain('Not your tech.');
  });

  test('/v5 shows the entry video on first load (no skipEntry param)', async ({ page }) => {
    await page.goto('/v5/');
    await expect(page.getByRole('dialog', { name: /Axius intro|Intro de Axius/i })
      .or(page.locator('button[aria-label*="SKIP"]').first())
      .first()).toBeVisible({ timeout: 15_000 });
  });

  test('/v5 entry video has a SKIP button that advances to industry dispatch', async ({ page }) => {
    await page.goto('/v5/');
    const skipBtn = page.locator('button[aria-label="SKIP →"]').first();
    await expect(skipBtn).toBeVisible({ timeout: 15_000 });
    await skipBtn.click();
    // After skip: industry dispatch screen shows "DISPATCH" eyebrow
    await expect(page.locator('text=DISPATCH').first()).toBeVisible({ timeout: 10_000 });
  });

  test('/v5 industry dispatch shows the 6 industry chips', async ({ page }) => {
    await page.goto('/v5/');
    const skipBtn = page.locator('button[aria-label="SKIP →"]').first();
    await expect(skipBtn).toBeVisible({ timeout: 15_000 });
    await skipBtn.click();
    await expect(page.locator('[role="radiogroup"]').first()).toBeVisible({ timeout: 10_000 });
    // 6 chips (5 industries + Other) in one radiogroup
    const radios = page.locator('[role="radio"]');
    await expect(radios).toHaveCount(6, { timeout: 5_000 });
  });

  test('/v5 chat bubble is always available (closed by default)', async ({ page }) => {
    await page.goto(SITE);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-axius-j-chat-closed]')).toBeVisible({ timeout: 5_000 });
  });

  test('/v5 chat bubble opens on click and shows close button', async ({ page }) => {
    await page.goto(SITE);
    await page.waitForLoadState('networkidle');
    await page.locator('[data-axius-j-chat-closed]').click();
    await expect(page.locator('[data-axius-j-chat-open]')).toBeVisible({ timeout: 3_000 });
  });

  test('/v5 BEFORE AND AFTER section is present', async ({ page }) => {
    await page.goto(SITE);
    await expect(page.locator('text=BEFORE AND AFTER AXIUS').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#work')).toBeAttached();
  });

  test('/v5 catalog renders with MOST RECOMMENDED eyebrow', async ({ page }) => {
    await page.goto(SITE);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#catalog')).toBeAttached({ timeout: 15_000 });
    await expect(page.locator('text=MOST RECOMMENDED').first()).toBeVisible({ timeout: 10_000 });
  });

  test('/v5 Pricing shows Operator + Team + Department + Founder Track callout', async ({ page }) => {
    await page.goto(SITE);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#pricing')).toBeAttached({ timeout: 15_000 });
    await expect(page.locator('#pricing >> text=Operator').first()).toBeVisible();
    await expect(page.locator('#pricing >> text=Team').first()).toBeVisible();
    await expect(page.locator('#pricing >> text=Department').first()).toBeVisible();
    // Founder Track is now a separate program callout BELOW the tier row
    await expect(page.locator('text=FOUNDER TRACK').first()).toBeVisible();
    await expect(page.locator('a[href*="Founder Track inquiry"]').first()).toBeAttached();
  });

  test('/v5 How it Runs section renders with section id', async ({ page }) => {
    await page.goto(SITE);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#how-it-runs')).toBeAttached({ timeout: 15_000 });
    await expect(page.locator('text=HOW IT RUNS').first()).toBeVisible();
  });

  test('/v5 Operator carousel renders inside #founder', async ({ page }) => {
    await page.goto(SITE);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#founder')).toBeAttached({ timeout: 15_000 });
    // 3 dot controls (one per frame)
    const dots = page.locator('#founder [aria-label^="Frame"]');
    await expect(dots).toHaveCount(3);
  });

  test('/v5 Testimonials section renders with 3 case studies (or empty state past 2026-08-01)', async ({ page }) => {
    await page.goto(SITE);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#testimonials')).toBeAttached({ timeout: 15_000 });
    await expect(page.locator('text=CLIENT STORIES').first()).toBeVisible();
  });

  test('/v5 Footer privacy + terms links work', async ({ page }) => {
    await page.goto(SITE);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('a[href="/v5/privacy.html"]').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('a[href="/v5/terms.html"]').first()).toBeVisible();
  });

  test('/v5 CTA Begin section has the Begin button', async ({ page }) => {
    await page.goto(SITE);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#cta-begin')).toBeAttached({ timeout: 15_000 });
    await expect(page.locator('text=Begin →').first()).toBeVisible();
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

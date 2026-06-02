// Playwright config for the Axius landing.
// - AXIUS_BASE_URL lets you point tests at a deployed preview URL.
//   When unset, a local python3 http server boots automatically.
// - The mobile project uses Chromium with iPhone 13 viewport/UA so
//   no WebKit install is required (only Chromium is provisioned).
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: process.env.AXIUS_BASE_URL ?? 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
  },
  webServer: process.env.AXIUS_BASE_URL ? undefined : {
    command: 'python3 -m http.server 4321',
    port: 4321,
    reuseExistingServer: true,
    timeout: 15_000,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-iphone',    use: { ...devices['iPhone 13'], browserName: 'chromium' } },
  ],
});

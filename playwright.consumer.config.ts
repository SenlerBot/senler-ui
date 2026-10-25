import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './scripts/browser',
  testMatch: 'consumer.spec.ts',
  outputDir: './.cache/consumer-browser',
  workers: 1,
  retries: 0,
  timeout: 30_000,
  reporter: 'list',
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 900 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'tailwind' }, { name: 'standalone' }],
});

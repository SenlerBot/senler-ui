import path from 'node:path';
import { test, expect } from '@playwright/test';
import { preview, type PreviewServer } from 'vite';

let server: PreviewServer;
let baseURL: string;
let pageErrors: string[];

test.beforeAll(async ({}, testInfo) => {
  const consumer = process.env.SENLER_UI_CONSUMER_DIR;
  if (!consumer) throw new Error('Run npm run test:consumer to test the installed package');
  server = await preview({
    root: consumer,
    configFile: false,
    envFile: false,
    build: { outDir: path.join(consumer, `dist-${testInfo.project.name}`) },
    preview: { host: '127.0.0.1', port: 0, open: false },
    logLevel: 'silent',
  });
  const url = server.resolvedUrls?.local[0];
  if (!url) throw new Error('Consumer preview did not expose a local URL');
  baseURL = url;
});

test.afterAll(async () => {
  await server?.close();
});

test.beforeEach(async ({ page }) => {
  pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.route('**/*', (route) => {
    if (new URL(route.request().url()).origin === new URL(baseURL).origin) return route.continue();
    return route.abort();
  });
  await page.goto(baseURL);
});

test.afterEach(() => {
  expect(pageErrors).toEqual([]);
});

test('the product palette and neutral notifications follow light, dark and light again', async ({ page }) => {
  const card = page.getByTestId('palette-card');
  await expect(card).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await page.getByRole('button', { name: 'Toast', exact: true }).click();
  const toast = page.locator('[data-sonner-toast]').filter({ hasText: 'Smoke toast' });
  await expect(toast).toBeVisible();
  await expect(toast).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click();
  await expect(card).toHaveCSS('background-color', 'rgb(31, 41, 55)');
  await expect(toast).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(toast).toHaveCSS('color', 'rgb(252, 252, 252)');
  await expect(toast).toHaveCSS('border-top-color', 'rgb(51, 51, 51)');
  await expect(page.getByTestId('error-text')).toHaveCSS('color', 'rgb(252, 165, 165)');
  await page.getByRole('button', { name: 'Light theme', exact: true }).click();
  await expect(card).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(toast).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await page.getByRole('button', { name: 'Switch language', exact: true }).click();
  await toast.getByRole('button', { name: 'Закрыть уведомление', exact: true }).click();
  await expect(toast).toHaveCount(0);
});

test('dialog and sheet translate live and restore focus after Escape or close', async ({ page }) => {
  const dialogTrigger = page.getByRole('button', { name: 'Open dialog', exact: true });
  await dialogTrigger.click();
  const dialog = page.getByRole('dialog', { name: 'Smoke dialog', exact: true });
  await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeVisible();
  await expect(dialog.getByRole('textbox', { name: 'Name', exact: true })).toBeFocused();
  await dialog.getByRole('button', { name: 'Switch language', exact: true }).click();
  await expect(dialog.getByRole('button', { name: 'Закрыть', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(dialogTrigger).toBeFocused();
  await dialogTrigger.click();
  await dialog.getByRole('button', { name: 'Закрыть', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(dialogTrigger).toBeFocused();

  const sheetTrigger = page.getByRole('button', { name: 'Open sheet', exact: true });
  await sheetTrigger.click();
  const sheet = page.getByRole('dialog', { name: 'Smoke sheet', exact: true });
  await expect(sheet.getByRole('button', { name: 'Закрыть', exact: true })).toBeVisible();
  await sheet.getByRole('button', { name: 'Switch language', exact: true }).click();
  await sheet.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(sheet).toHaveCount(0);
  await expect(sheetTrigger).toBeFocused();
});

test('preview descriptions translate and decorative images keep an empty alt', async ({ page }) => {
  await expect(page.getByRole('img', { name: 'Preview', exact: true })).toBeVisible();
  await expect(page.getByTestId('decorative-preview').locator('img')).toHaveAttribute('alt', '');
  await page.getByRole('button', { name: 'Switch language', exact: true }).click();
  await expect(page.getByRole('img', { name: 'Предпросмотр изображения', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Preview', exact: true })).toHaveCount(0);
  await expect(page.getByTestId('decorative-preview').locator('img')).toHaveAttribute('alt', '');
});

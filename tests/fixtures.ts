import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('https://example.com'); // Открываем страницу перед тестами
    await use(page);
  },
});

export { expect } from '@playwright/test';
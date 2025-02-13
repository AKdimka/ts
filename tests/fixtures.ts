import { test as base } from '@playwright/test';
import { SearchPage } from './searchPage';

export const test = base.extend<{ searchPage: SearchPage }>({
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
});
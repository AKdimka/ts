import { test } from './fixtures';
import { expect } from '@playwright/test';

test('Проверка поиска на militarist.ua', async ({ searchPage }) => {
  const page = searchPage.getPage();
  await page.goto('https://militarist.ua/ua/');
  
  await searchPage.searchForItem('рюкзак');
  
  const items = await searchPage.getSearchResultsCount();
  expect(items).toBeGreaterThan(0);
});
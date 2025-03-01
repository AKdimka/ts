import { test } from './fixtures';
import { expect } from '@playwright/test';

test.use({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
});

test('Проверка фильтра на Comfy', async ({ searchPage }) => {
  const page = searchPage.getPage(); // Получаем доступ к page через getPage()
  await page.goto('https://www.ctrs.com.ua/');

  await page.fill('input.search-input', 'смартфон');

	await page.waitForTimeout(1000); 
	
  await page.press('input.search-input', 'Enter');

	await page.waitForSelector('.pr', { timeout: 5000 });
	
	await page.waitForSelector('label:has-text("Apple")');
	await page.locator('.Collapse-module__content___2Qixd label:has-text("Apple")').click();

	await page.waitForLoadState('networkidle');

  const productTitles = await page.locator('.pr .title').allTextContents();

  expect(productTitles.length).toBeGreaterThan(0);

  const allTitlesContainIphone = productTitles.every(title =>
    title.toLowerCase().includes('iphone')
  );

  expect(allTitlesContainIphone).toBe(true);
});
import { test, expect } from '@playwright/test';

test.use({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
});

test('Проверка фильтра на Comfy', async ({ page }) => {
  await page.goto('https://www.ctrs.com.ua/');

  await page.fill('input.search-input', 'iphone');

	await page.waitForTimeout(1000); 
	
  await page.press('input.search-input', 'Enter');

  await page.waitForSelector('.pr', { timeout: 5000 });

  const items = await page.locator('.pr').count();
  expect(items).toBeGreaterThan(0);
});

import { test, expect } from '@playwright/test';

test('Проверка поиска на militarist.ua', async ({ page }) => {

  await page.goto('https://militarist.ua/ua/');

  await page.fill('input[name="q"]', 'рюкзак');

  await page.press('input[name="q"]', 'Enter');

	await page.waitForSelector('.card_product'); 
	
  const items = await page.locator('.card_product').count();
  expect(items).toBeGreaterThan(0);
});
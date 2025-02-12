import { test, expect } from '@playwright/test';

test('Покупка товара на Rozetka', async ({ page }) => {
  await page.goto('https://rozetka.com.ua/ua/bang-olufsen-1240600/p350661714/');

	await page.click('button.buy-button');
	
	await page.click('button.header-cart__button');

	await page.waitForSelector('div.cart-product__body');

	const quantity = await page.locator('input.cart-counter__input').inputValue();
	expect(quantity).toBe('1');
	
	const price = await page.locator('p.cart-product__price').textContent();
	expect(price).not.toBeNull();
	
	await page.click('a.cart-receipt__submit')
});

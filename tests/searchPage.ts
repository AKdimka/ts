import { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  async searchForItem(item: string) {
    await this.page.fill('input[name="q"]', item);
    await this.page.press('input[name="q"]', 'Enter');
  }

  async getSearchResultsCount() {
    await this.page.waitForSelector('.card_product');
    return await this.page.locator('.card_product').count();
  }
  
  public getPage() {
    return this.page;
  }
}
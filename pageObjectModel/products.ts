import { Locator, Page } from "playwright/test";

export class Products {
  readonly productTitles: Locator;

  constructor(page: Page) {
    this.productTitles = page.locator(".product-thumb h4 a");
  }
}

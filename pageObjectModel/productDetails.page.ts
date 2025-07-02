import { Locator, Page } from "playwright/test";

export class ProductDetailsPage {
  readonly header: Locator;
  readonly breadcrumbText: Locator;
  constructor(page: Page) {
    this.header = page.locator("#entry_216816 h1");
    this.breadcrumbText = page
      .getByLabel("breadcrumb")
      .getByText("HTC Touch HD");
  }
}

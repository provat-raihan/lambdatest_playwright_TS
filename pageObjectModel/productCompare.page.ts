import { Locator, Page } from "playwright/test";

export class ProductComparePage {
  readonly breadcrumbText: Locator;
  readonly header: Locator;
  readonly noProductToCompareMessage: Locator;
  readonly continueButton: Locator;
  constructor(page: Page) {
    this.breadcrumbText = page
      .getByLabel("breadcrumb")
      .getByText("Product Comparison");
    this.header = page.getByRole("heading", { name: "Product Comparison" });
    this.noProductToCompareMessage = page.getByText("You have not chosen any");
    this.continueButton = page.getByRole("link", { name: "Continue" });
  }
}

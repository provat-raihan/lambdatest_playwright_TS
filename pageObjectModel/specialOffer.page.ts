import { Page, Locator } from "playwright/test";

export class SpecialOfferPage {
  readonly headerText: Locator;
  readonly breadcrumbText: Locator;

  constructor(page: Page) {
    this.headerText = page.getByRole("heading", { name: "Special Offers" });
    this.breadcrumbText = page
      .getByLabel("breadcrumb")
      .getByText("Special Offers");
  }
}

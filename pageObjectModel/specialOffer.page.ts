import { Page, Locator } from "playwright/test";

export class SpecialOfferPage {
  readonly headerText: Locator;

  constructor(page: Page) {
    this.headerText = page.getByRole("heading", { name: "Special Offers" });
  }
}

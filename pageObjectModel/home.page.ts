import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly headerLogo: Locator;

  readonly navbarItems: {
    shopByCategory: Locator;
    home: Locator;
  };

  constructor(page: Page) {
    this.headerLogo = page.locator(`css=div[id='entry_217821'] img`);

    this.navbarItems = {
      shopByCategory: page.getByRole("button", { name: "Shop by Category" }),
      home: page.getByRole("link", { name: "Home" }),
    };
  }
}

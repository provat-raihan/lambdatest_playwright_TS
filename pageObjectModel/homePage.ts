import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly logo: Locator;

  constructor(page: Page) {
    this.logo = page.locator(`css=div[id='entry_217821'] img`);
  }
}

import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly loginFormHeader: Locator;

  constructor(page: Page) {
    this.loginFormHeader = page.getByRole("heading", {
      name: "Returning Customer",
      exact: true,
    });
  }
}

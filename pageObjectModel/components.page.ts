import { Locator, Page } from "playwright/test";

export class ComponentsPage {
  readonly header: Locator;

  constructor(page: Page) {
    this.header = page.getByRole("link", { name: "Components" });
  }
}

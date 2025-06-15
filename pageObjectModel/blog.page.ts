import { Page, Locator } from "@playwright/test";

export class BlogPage {
  readonly latestArticleHeader: Locator;
  readonly mostViewedHeader: Locator;

  constructor(page: Page) {
    this.latestArticleHeader = page.getByRole("heading", {
      name: "Latest Articles",
    });
    this.mostViewedHeader = page.getByRole("heading", { name: "Most viewed" });
  }
}

// pageObjectModel/searchResult.ts
import { Page, Locator } from "@playwright/test";

export class SearchResultPage {
  private readonly page: Page;
  readonly breadcrumb: Locator;

  constructor(page: Page) {
    this.page = page;
    this.breadcrumb = page.getByLabel("breadcrumb").getByText("Search");
  }

  /**
   * Returns the dynamic “Search - …” heading locator.
   * Pass "" for an empty‐search case (“Search -” only).
   */
  header(searchValue: string): Locator {
    const pattern =
      searchValue.trim() === ""
        ? /^Search\s*-\s*$/i
        : new RegExp(`^Search\\s*-\\s*${searchValue}\\s*$`, "i");

    return this.page.getByRole("heading", { name: pattern });
  }
}

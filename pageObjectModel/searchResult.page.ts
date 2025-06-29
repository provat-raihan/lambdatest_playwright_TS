// pageObjectModel/searchResult.ts
import { Page, Locator, expect } from "@playwright/test";

export class SearchResultPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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

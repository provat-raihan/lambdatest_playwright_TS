import { Utils } from "../utils";
import { HomePage } from "../../pageObjectModel/home.page";
import { SearchResultPage } from "../../pageObjectModel/searchResult.page";
import { expect, Locator, Page } from "playwright/test";

export class SearchHelper {
  private page: Page;
  private utils: Utils;
  private homePage: HomePage;
  private searchResultsPage: SearchResultPage;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);
    this.homePage = new HomePage(page);
    this.searchResultsPage = new SearchResultPage(page);
  }

  /**
   * Runs a search and checks the basics.
   *
   * @param searchValue    The word you type, e.g. "iPhone"
   * @param expectedUrl    The URL you must land on
   * @param expectedText   A word that should appear in the first item title
   */

  async search(
    searchValue: string,
    expectedUrl: string,
    expectedHeaderText: string
  ): Promise<void> {
    try {
      this.utils.logMessage(`Searching for "${searchValue}"`);
      await this.utils.verifyElementIsVisible(
        this.homePage.searchBar.inputField
      );
      await this.utils.verifyElementIsEnabled(
        this.homePage.searchBar.inputField
      );
      await this.utils.fillInputBox(
        this.homePage.searchBar.inputField,
        searchValue
      );
      await this.utils.verifyElementIsVisible(this.homePage.searchBar.button);
      await this.utils.verifyElementIsEnabled(this.homePage.searchBar.button);
      await this.utils.clickOnElement(this.homePage.searchBar.button);

      await this.utils.verifyUrlContains(expectedUrl);

      await this.utils.verifyElementIsVisible(
        this.searchResultsPage.header(searchValue)
      );
      await this.utils.verifyContainText(
        this.searchResultsPage.header(searchValue),
        expectedHeaderText
      );
    } catch (error) {
      const msg = `❌ Search failed for "${searchValue}": ${error.message}`;
      this.utils.logMessage(msg, "error");
      await this.utils.captureScreenshotOnFailure(
        `search_error_${searchValue.replace(/\s+/g, "_")}`
      );
      throw new Error(msg);
    }
  }

  async searchWithCategory(
    category: string,
    searchValue: string,
    expectedUrl: string,
    expectedHeaderText: string
  ): Promise<void> {
    try {
      this.utils.logMessage(
        `🔎 Searching "${searchValue}" in category "${category}"`
      );

      /* 1️⃣  Open the dropdown */
      await this.utils.clickOnElement(
        this.homePage.searchBar.allCategoriesDropdownButton
      );

      await this.utils.wait(500);

      /* 2️⃣  Locate the correct menu item (ignore whitespace / case) */
      const categoryOption: Locator = this.homePage.searchBar.allCategoriesLinks
        .filter({ hasText: category })
        .first();

      /* 4️⃣  Click the category */
      await this.utils.clickOnElement(categoryOption);

      /* 5️⃣  Perform the search itself */
      await this.search(searchValue, expectedUrl, expectedHeaderText);
    } catch (error) {
      const msg = `❌ Failed search with category "${category}": ${
        (error as Error).message
      }`;
      this.utils.logMessage(msg, "error");
      await this.utils.captureScreenshotOnFailure(
        `search_with_category_error_${category.replace(/\s+/g, "_")}`
      );
      throw new Error(msg);
    }
  }
}

import { Utils } from "../utils";
import { HomePage } from "../../pageObjectModel/home.page";
import { SearchResultPage } from "../../pageObjectModel/searchResult.page";
import { Locator, Page } from "playwright/test";
import { EnvData } from "../envData";
import searchResultPageData from "../../testData/searchResult.json";

export class SearchHelper {
  private page: Page;
  private utils: Utils;
  private homePage: HomePage;
  private searchResultsPage: SearchResultPage;
  private envData: EnvData;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);
    this.homePage = new HomePage(page);
    this.searchResultsPage = new SearchResultPage(page);
    this.envData = new EnvData(page);
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
      await this.utils.navigateTo(this.envData.baseUrl);
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

      await this.utils.clickOnElement(this.homePage.searchBar.button),
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

  async verifySearchResults(
    searchValue: string,
    expectedUrl: string,
    expectedHeaderText: string,
    productTitleLocator: Locator
  ): Promise<void> {
    try {
      this.utils.logMessage(`🔍 Verifying search results for "${searchValue}"`);

      await this.search(searchValue, expectedUrl, expectedHeaderText);
      this.utils.logMessage(`✅ Search page loaded for "${searchValue}"`);

      const count = await productTitleLocator.count();

      if (count > 1) {
        await this.utils.verifyElementsIsExist(productTitleLocator);
        this.utils.logMessage(`✅ Product titles found for "${searchValue}"`);

        await this.utils.verifyProductTitlesContain(
          productTitleLocator,
          searchValue
        );
        this.utils.logMessage(`✅ All product titles contain "${searchValue}"`);
      } else {
        const noResultsMessageLocator = this.searchResultsPage.noResultText;
        const expectedMessage = searchResultPageData.expectedNoResultText;

        await this.utils.verifyElementIsVisible(noResultsMessageLocator);
        await this.utils.verifyContainText(
          noResultsMessageLocator,
          expectedMessage
        );

        this.utils.logMessage(
          `✅ Verified no results message for "${searchValue}"`
        );
      }
    } catch (error) {
      const msg = `❌ Failed to verify search results for "${searchValue}": ${error.message}`;
      this.utils.logMessage(msg, "error");
      await this.utils.captureScreenshotOnFailure(
        `verify_search_results_error_${searchValue.replace(/\s+/g, "_")}`
      );
      throw new Error(msg);
    }
  }
}

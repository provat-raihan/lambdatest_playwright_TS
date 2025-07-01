import { Locator, Page } from "@playwright/test";
import { Utils } from "../utils";

export interface NavigationDetails {
  navbarLocator: Locator;
  expectedUrl: string;
  headerLogoLocator: Locator;
  breadcrumbLocator: Locator;
  expectedBreadcrumbText: string;
  headerTextLocator: Locator;
  expectedHeaderText: string;
  stepDescription?: string;
}

export class NavigationHelper {
  private utils: Utils;

  constructor(page: Page) {
    this.utils = new Utils(page);
  }

  /**
   * Verifies navigation from a navbar item to the expected page, including:
   * - Clicking the navbar item
   * - Verifying the URL
   * - Verifying logo, breadcrumb, and header texts
   */
  async verifyNavigation(details: NavigationDetails): Promise<void> {
    const {
      navbarLocator,
      expectedUrl,
      headerLogoLocator,
      breadcrumbLocator,
      expectedBreadcrumbText,
      headerTextLocator,
      expectedHeaderText,
      stepDescription = "Navigation Step",
    } = details;

    try {
      this.utils.logMessage(`Starting: ${stepDescription}`);

      await this.utils.verifyElementIsVisible(navbarLocator);
      await Promise.all([
        this.utils.wait(10, { waitForLoadState: "load" }),
        this.utils.clickOnElement(navbarLocator),
      ]);
      await this.utils.verifyUrlContains(expectedUrl);
      await this.utils.verifyElementIsVisible(headerLogoLocator);

      await this.utils.verifyElementIsVisible(breadcrumbLocator);
      await this.utils.verifyContainText(
        breadcrumbLocator,
        expectedBreadcrumbText
      );

      await this.utils.verifyElementIsVisible(headerTextLocator);
      await this.utils.verifyToHaveExactText(
        headerTextLocator,
        expectedHeaderText
      );

      this.utils.logMessage(`✅ Completed: ${stepDescription}`);
    } catch (error) {
      const errorMsg = `❌ Failed navigation for step "${stepDescription}". Error: ${error.message}`;
      this.utils.logMessage(errorMsg, "error");
      await this.utils.captureScreenshotOnFailure(
        `navigation_failure_${stepDescription
          .replace(/\s+/g, "_")
          .toLowerCase()}`
      );
      throw new Error(errorMsg);
    }
  }
}

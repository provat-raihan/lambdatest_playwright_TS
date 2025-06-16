import {
  expect,
  Page,
  Locator,
  APIRequestContext,
  request,
} from "@playwright/test";
import logger from "./logger";
// import { allure } from "allure-playwright";
import { ExpectedValueProvider } from "./valueProvider";

export class Utils {
  private page: Page;
  private expected: ExpectedValueProvider;

  constructor(page: Page) {
    this.page = page;
    this.expected = new ExpectedValueProvider();
  }

  public async captureScreenshotOnFailure(testName: string): Promise<void> {
    try {
      const screenshot = await this.page.screenshot();
      logger.error(`${testName} failed. Screenshot captured.`);
    } catch (error) {
      logger.error("Error capturing screenshot:", error);
    }
  }

  public logMessage(
    message: string,
    level: "info" | "error" | "warn" = "info"
  ): void {
    switch (level) {
      case "info":
        logger.info(message);
        break;
      case "warn":
        logger.warn(message);
        break;
      case "error":
        logger.error(message);
        break;
      default:
        logger.info(message); // fallback
    }
  }

  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 12000,
      });
      this.logMessage(`Navigated to ${url} successfully.`);
    } catch (error) {
      const errorMsg = `Failed to navigate to ${url}: ${error}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("navigateTo");
      throw new Error(errorMsg);
    }
  }

  async goBack(): Promise<void> {
    try {
      await this.page.goBack();
      this.logMessage(`Navigated back to previous page`);
    } catch (error) {
      const errorMsg = `Failed to navigate back to the previous page`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("goBack");
      throw new Error(errorMsg);
    }
  }

  async verifyElementIsVisible(
    locator: Locator,
    timeout: number = 15000
  ): Promise<void> {
    try {
      // Wait for network to be idle before checking visibility
      await this.page.waitForLoadState("networkidle", { timeout });

      // Poll the visibility using .toPass()
      await expect(async () => {
        const isVisible = await locator.isVisible();
        expect(isVisible).toBeTruthy();
      }).toPass({ timeout });

      this.logMessage(`✅ Element is visible as expected.`);
    } catch (error: any) {
      const errorMsg = `❌ Element was not visible within timeout (${timeout}ms).`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsVisible");
      throw new Error(`${errorMsg}\nDetails: ${error.message}`);
    }
  }

  async verifyElementIsNotVisible(identifier: Locator): Promise<void> {
    try {
      await expect.soft(identifier).not.toBeVisible();
      this.logMessage(
        `Verified element with identifier ${identifier} is not visible`
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} is not visible`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsNotVisible");
      throw new Error(errorMsg);
    }
  }

  async verifyElementIsHidden(identifier: Locator): Promise<void> {
    try {
      await expect.soft(identifier).toBeHidden();
      this.logMessage(
        `Verified element with identifier ${identifier} is hidden`
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} is hidden`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsHidden");
      throw new Error(errorMsg);
    }
  }

  async clickOnElement(identifier: Locator): Promise<void> {
    try {
      await identifier.isVisible();
      await identifier.click();
      this.logMessage(`Clicked on element with identifier: ${identifier}`);
    } catch (error) {
      const errorMsg = `Failed to click on element with identifier: ${identifier}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("clickOnElement");
      throw new Error(errorMsg);
    }
  }

  async validateAndClick(
    buttonLocator: Locator,
    expectedText: string
  ): Promise<void> {
    const logIdentifier = `button located by "${buttonLocator}"`;
    this.logMessage(
      `[INFO] Validating and attempting to click ${logIdentifier}.`
    );

    try {
      // ✅ Only verify expected text
      await expect(buttonLocator).toHaveText(expectedText, { timeout: 5000 });
      this.logMessage(
        `✅ ${logIdentifier} has expected text: "${expectedText}".`
      );

      // ✅ Perform click
      await buttonLocator.click();
      this.logMessage(`✅ Successfully clicked ${logIdentifier}.`);
    } catch (error: any) {
      const errorMsg = `❌ Failed to validate or click ${logIdentifier}: ${error.message}`;
      this.logMessage(errorMsg, "error");

      // Use the locator's string representation for the screenshot name
      const locatorString = buttonLocator.toString();
      const screenshotName = `Fail_${locatorString.replace(
        /[^a-zA-Z0-9_]/g,
        "_"
      )}`;
      await this.captureScreenshotOnFailure(screenshotName);

      throw new Error(errorMsg);
    }
  }

  async fillInputBox(identifier: Locator, text: string): Promise<void> {
    try {
      const currentValue = await identifier.inputValue();

      if (currentValue.trim() !== "") {
        await identifier.clear();
      }
      await identifier.fill(text);
      this.logMessage(`Filled input box (${identifier}) with text: "${text}"`);
    } catch (error) {
      const errorMsg = `Failed to fill input box (${identifier}) with text: "${text}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("fillInputBox");
      throw new Error(errorMsg);
    }
  }

  async verifyToHaveValue(
    identifier: Locator,
    inputFieldText: string
  ): Promise<void> {
    try {
      await expect.soft(identifier).toHaveValue(inputFieldText);
      this.logMessage(
        `Verified element (${identifier}) has value: "${inputFieldText}"`
      );
    } catch (error) {
      const errorMsg = `Failed to verify element (${identifier}) has value: "${inputFieldText}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyToHaveValue");
      throw new Error(errorMsg);
    }
  }

  async selectDropdownByValue(selector: Locator, value: string): Promise<void> {
    try {
      await selector.selectOption({ value });
      this.logMessage(`Selected dropdown (${selector}) value: "${value}"`);
    } catch (error) {
      const errorMsg = `Failed to select value "${value}" in dropdown: ${selector}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("selectDropdownByValue");
      throw new Error(errorMsg);
    }
  }

  async verifyContainText(
    identifier: Locator,
    expectedText: string,
    dynamicExpectedText?: string
  ): Promise<void> {
    try {
      const fullExpectedText = dynamicExpectedText
        ? `${expectedText} ${dynamicExpectedText}`
        : expectedText;

      await expect.soft(identifier).toContainText(fullExpectedText);

      const logMessage = dynamicExpectedText
        ? `Verified element with identifier ${identifier} contains text: "${expectedText} ${dynamicExpectedText}"`
        : `Verified element with identifier ${identifier} contains text: "${expectedText}"`;

      this.logMessage(logMessage);
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} contains text: "${expectedText}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyContainText");
      throw new Error(errorMsg);
    }
  }

  async verifyToHaveExactText(
    identifier: Locator,
    expectedText: string,
    dynamicExpectedText?: string
  ): Promise<void> {
    try {
      const fullExpectedText = dynamicExpectedText
        ? `${expectedText} ${dynamicExpectedText}`
        : expectedText;

      await expect.soft(identifier).toHaveText(fullExpectedText);

      const logMessage = dynamicExpectedText
        ? `Verified element with identifier ${identifier} contains text: "${expectedText} ${dynamicExpectedText}"`
        : `Verified element with identifier ${identifier} contains text: "${expectedText}"`;

      this.logMessage(logMessage);
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} contains text: "${expectedText}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyContainText");
      throw new Error(errorMsg);
    }
  }

  async wait(
    time: number,
    options: {
      waitForSelector?: Locator;
      waitForNetworkIdle?: boolean;
      waitForLoadState?: "load" | "domcontentloaded" | "networkidle";
    } = {}
  ): Promise<void> {
    const { waitForSelector, waitForNetworkIdle, waitForLoadState } = options;

    try {
      if (waitForSelector) {
        await waitForSelector.waitFor({
          state: "visible",
          timeout: time * 1000,
        });
        this.logMessage(`Waited for selector: ${waitForSelector}`);
      }

      if (waitForNetworkIdle) {
        await this.page.waitForLoadState("networkidle", {
          timeout: time * 1000,
        });
        this.logMessage("Waited for network idle");
      }

      if (waitForLoadState) {
        await this.page.waitForLoadState(waitForLoadState, {
          timeout: time * 1000,
        });
        this.logMessage(`Waited for page load state: ${waitForLoadState}`);
      }

      if (!waitForSelector && !waitForNetworkIdle && !waitForLoadState) {
        await this.page.waitForTimeout(time * 1000);
        this.logMessage(`Waited for ${time} seconds.`);
      }
    } catch (error) {
      const errorMsg = "Failed to wait for the specified conditions";
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("wait");
      throw new Error(errorMsg);
    }
  }

  async verifyUrlContains(text: string): Promise<void> {
    try {
      const currentUrl = this.page.url();
      expect(currentUrl).toContain(text);
      this.logMessage(`Verified URL contains text: "${text}"`);
    } catch (error) {
      const errorMsg = `Current URL does not contain expected text: "${text}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyUrlContains");
      throw new Error(errorMsg);
    }
  }

  async scrollToFooter(): Promise<void> {
    try {
      const footerElement = this.page.locator("#footer");
      await footerElement.scrollIntoViewIfNeeded();
      this.logMessage("Scrolled to the footer");
    } catch (error) {
      const errorMsg = "Failed to scroll to the footer";
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("scrollToFooter");
      throw new Error(errorMsg);
    }
  }

  async scrollToElement(selector: Locator): Promise<void> {
    try {
      await selector.scrollIntoViewIfNeeded();
      this.logMessage(`Scrolled to the element with selector: ${selector}`);
    } catch (error) {
      const errorMsg = `Failed to scroll to the element with selector: ${selector}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("scrollToElement");
      throw new Error(errorMsg);
    }
  }

  async mouseHover(identifier: Locator): Promise<void> {
    try {
      await identifier.hover();
      this.logMessage(`Hovered over element with identifier: ${identifier}`);
    } catch (error) {
      const errorMsg = `Failed to hover over element with identifier: ${identifier}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("mouseHover");
      throw new Error(errorMsg);
    }
  }

  async verifyElementToHaveCSSProperty(
    locatorOrArray: Locator | Locator[],
    property: string,
    expectedValue: string,
    isHover: boolean = false,
    timeout = 3000
  ): Promise<void> {
    const locators = Array.isArray(locatorOrArray)
      ? locatorOrArray
      : [locatorOrArray];

    for (const locator of locators) {
      try {
        await locator.first().waitFor({ state: "visible", timeout });

        const count = await locator.count();
        if (count === 0) {
          throw new Error(`❌ No elements found for provided locator.`);
        }

        for (let i = 0; i < count; i++) {
          const element = locator.nth(i);
          await element.waitFor({ state: "visible", timeout });

          if (isHover) {
            await element.hover();
            this.logMessage(`🖱️ Hovered over element at index ${i}`);
            await this.page.waitForTimeout(300); // allow time for hover styles to apply
          }

          try {
            await expect(element).toHaveCSS(property, expectedValue, {
              timeout,
            });

            this.logMessage(
              `✅ CSS "${property}" at index ${i} is as expected: "${expectedValue}".`
            );
          } catch {
            const actualValue = await element.evaluate(
              (el, prop) =>
                window.getComputedStyle(el).getPropertyValue(prop).trim(),
              property
            );

            if (actualValue !== expectedValue.trim()) {
              const errorMsg = `❌ CSS mismatch at index ${i}: Expected "${property}" = "${expectedValue}", got "${actualValue}"`;
              this.logMessage(errorMsg, "error");
              await this.captureScreenshotOnFailure(
                `CSSMismatch_${property}_${i}`
              );
              throw new Error(errorMsg);
            }

            this.logMessage(
              `✅ CSS "${property}" at index ${i} matched via fallback: "${actualValue}".`
            );
          }
        }
      } catch (error) {
        const errorMsg = `❌ Failed CSS verification for property "${property}" | Reason: ${
          error instanceof Error ? error.message : error
        }`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("verifyElementToHaveCSSProperty");
        throw error instanceof Error ? error : new Error(String(error));
      }
    }
  }

  async validateAttribute(
    selector: Locator,
    attribute: string | "src" | "href" | "alt" | "data-test",
    expectedValue: string
  ): Promise<void> {
    try {
      const actualValue = await selector.getAttribute(attribute);

      if (actualValue !== expectedValue) {
        const errorMsg = `Attribute "${attribute}" value mismatch. Expected: "${expectedValue}", Got: "${actualValue}"`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("validateAttribute");
        throw new Error(errorMsg);
      }
      this.logMessage(
        `Validated attribute "${attribute}" with value "${expectedValue}" on selector "${selector}"`
      );
    } catch (error) {
      const errorMsg = `Failed to validate attribute "${attribute}" on selector "${selector}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateAttribute");
      throw new Error(errorMsg);
    }
  }

  async validateAttributes(
    selector: Locator,
    attribute: string | "src" | "href" | "alt" | "data-test",
    expectedValues: string[]
  ): Promise<void> {
    try {
      const elementsCount = await selector.count();
      if (elementsCount !== expectedValues.length) {
        const errorMsg = `Elements count (${elementsCount}) does not match expected values count (${expectedValues.length})`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("validateAttributes");
        throw new Error(errorMsg);
      }

      for (let i = 0; i < elementsCount; i++) {
        const element = selector.nth(i);
        const actualValue = await element.getAttribute(attribute);
        if (actualValue !== expectedValues[i]) {
          const errorMsg = `Attribute "${attribute}" mismatch at index ${i}. Expected: "${expectedValues[i]}", Got: "${actualValue}"`;
          this.logMessage(errorMsg, "error");
          await this.captureScreenshotOnFailure("validateAttributes");
          throw new Error(errorMsg);
        }
        this.logMessage(
          `Validated attribute "${attribute}" with value "${expectedValues[i]}" on element index ${i}`
        );
      }
    } catch (error) {
      const errorMsg = `Failed to validate attributes "${attribute}" on selector "${selector}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateAttributes");
      throw new Error(errorMsg);
    }
  }

  async verifyElementsIsExist(
    selector: Locator,
    isImage: boolean = false
  ): Promise<void> {
    try {
      const elementCount = await selector.count();

      if (elementCount === 0) {
        const errorMsg = `❌ No element selector displayed in: "${selector}"`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("verifyElementIsExist");
        throw new Error(errorMsg);
      }

      this.logMessage(
        `✅ ${elementCount} element(s) found under selector: "${selector}"`
      );

      for (let i = 0; i < elementCount; i++) {
        let target: string | null;

        if (!isImage) {
          target = await selector.nth(i).textContent();
        } else {
          target = await selector.nth(i).getAttribute("src");
        }

        if (!target?.trim()) {
          const errorMsg = `❌ Element ${
            i + 1
          } missing or empty in selector: "${selector}"`;
          this.logMessage(errorMsg, "error");
          await this.captureScreenshotOnFailure("verifyElementIsExist");
          throw new Error(errorMsg);
        }

        this.logMessage(`✅ Element ${i + 1} content information: "${target}"`);
      }
    } catch (error) {
      const errorMsg = `Failed to verify elements for selector: "${selector}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsExist");
      throw new Error(errorMsg);
    }
  }

  async verifyMultipleTexts(
    locator: Locator,
    expectedTexts: string[]
  ): Promise<void> {
    const actualText = (await locator.textContent())?.trim() || "";
    const missingTexts: string[] = [];

    for (const expected of expectedTexts) {
      if (actualText.includes(expected)) {
        this.logMessage(
          `✅ Expected: "${expected}" — Found in: "${
            actualText.match(expected)?.[0]
          }"`
        );
      } else {
        this.logMessage(
          `❌ Expected: "${expected}" — But not found in actual content`,
          "error"
        );
        missingTexts.push(expected);
      }
    }

    // console.log(`Actual content: "${actualText}, "`); -> working fine

    if (missingTexts.length > 0) {
      const errorMsg = `❌ Text verification failed. Missing: ${missingTexts.join(
        ", "
      )}`;
      await this.captureScreenshotOnFailure("verifyMultipleTexts");
      throw new Error(errorMsg);
    }
  }

  // To Test Utils
  // ---------------------------------------------------------------------------------------------------------------------------------
  // here you can add any utility methods that you want to test

  async verifyNavigationForLink(
    clickableElement: Locator,
    expectedUrlPart: string,
    expectedHeader: Locator,
    expectedHeaderText: string
  ): Promise<void> {
    try {
      await this.logMessage(`🔍 Clicking on element to validate navigation...`);

      await clickableElement.isVisible();
      await clickableElement.click();
      const currentUrl = this.page.url();
      expect(currentUrl).toContain(expectedUrlPart);
      await expectedHeader.isVisible();
      await expect(expectedHeader).toContainText(expectedHeaderText);

      this.logMessage(`✅ Navigation and header text verified successfully.`);
    } catch (error) {
      await this.captureScreenshotOnFailure("verifyNavigationForLink");
      this.logMessage(
        `❌ Navigation verification failed: ${error.message}`,
        "error"
      );
      throw new Error(`Navigation failed: ${error.message}`);
    }
  }

  async validateUrlStatus(
    url: string,
    expectedStatus: number = 200
  ): Promise<void> {
    const apiContext = await request.newContext();
    const response = await apiContext.get(url);
    const actualStatus = response.status();

    this.logMessage(
      `URL: ${url} | Expected: ${expectedStatus} | Received: ${actualStatus}`
    );

    expect(actualStatus).toBe(expectedStatus);
  }
  // ---------------------------------------------------------------------------------------------------------------------------------
}

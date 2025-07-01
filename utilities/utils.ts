import { expect, Page, Locator, request } from "@playwright/test";
import logger from "./logger";

const normalize = (value?: string | null): string | undefined => {
  return value?.trim() ? value.trim() : undefined;
};

export class Utils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
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
        logger.info(message);
    }
  }

  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
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

  async verifyElementIsVisible(identifier: Locator): Promise<void> {
    try {
      await expect(identifier).toBeVisible({ timeout: 60000 });
      this.logMessage(
        `Verified element with identifier ${identifier} is visible`
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} is visible`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsVisible");
      throw new Error(errorMsg);
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
      await expect
        .soft(buttonLocator)
        .toHaveText(expectedText, { timeout: 5000 });
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
            await this.page.waitForTimeout(300);
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
    attribute: string,
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
        const rawActual = await element.getAttribute(attribute);
        const actualValue = normalize(rawActual);
        const expectedValue = normalize(expectedValues[i]);

        if (expectedValue === undefined) {
          this.logMessage(
            `⚠️ Warning: No expected value provided for attribute "${attribute}" at index ${
              i + 1
            }`,
            "warn"
          );
          continue;
        }

        if (rawActual !== null && actualValue === undefined) {
          this.logMessage(
            `⚠️ Warning: Attribute "${attribute}" is present but empty at index ${
              i + 1
            }`,
            "warn"
          );
          continue;
        }

        if (actualValue !== expectedValue) {
          const errorMsg = `❌ Attribute "${attribute}" mismatch at index ${
            i + 1
          }. Expected: "${expectedValue}", Got: "${actualValue}"`;
          this.logMessage(errorMsg, "error");
          await this.captureScreenshotOnFailure("validateAttributes");
          throw new Error(errorMsg);
        }

        this.logMessage(
          `✅ Validated attribute "${attribute}" with value "${expectedValue}" on element index ${
            i + 1
          }`
        );
      }
    } catch (error) {
      const errorMsg = `❗ Failed to validate attributes "${attribute}" on selector "${selector}"`;
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
    try {
      const elementCount = await locator.count();
      const foundTexts: string[] = [];
      const missingTexts: string[] = [];

      for (let i = 0; i < elementCount; i++) {
        const text = (await locator.nth(i).innerText())?.trim() || "";

        if (text) {
          foundTexts.push(text);
          this.logMessage(`🔍 Element ${i + 1} visible text: "${text}"`);
        }
      }

      for (const expected of expectedTexts) {
        const match = foundTexts.find((actual) => actual.includes(expected));

        if (match) {
          this.logMessage(`✅ Expected: "${expected}" — Found in: "${match}"`);
        } else {
          this.logMessage(
            `❌ Expected: "${expected}" — Not found in any of the ${elementCount} elements`,
            "error"
          );
          missingTexts.push(expected);
        }
      }

      if (missingTexts.length > 0) {
        throw new Error(`Missing expected texts: ${missingTexts.join(", ")}`);
      }
    } catch (error) {
      const errorMsg = `❌ Failed to verify multiple texts in elements: ${
        (error as Error).message
      }`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyMultipleTexts");
      throw error;
    }
  }

  async validateUrlStatus(
    url: string,
    expectedStatus: number = 200
  ): Promise<void> {
    try {
      const apiContext = await request.newContext();
      const response = await apiContext.get(url);
      const actualStatus = response.status();

      if (actualStatus === expectedStatus) {
        this.logMessage(
          `✅ URL check passed — ${url} | Status: ${actualStatus}`
        );
      } else {
        const errorMsg = `❌ URL check failed — ${url} | Expected: ${expectedStatus}, Received: ${actualStatus}`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("validateUrlStatus");
        throw new Error(errorMsg);
      }
    } catch (error) {
      const errorMsg = `❌ Failed to validate URL status for: ${url} | ${
        (error as Error).message
      }`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateUrlStatus");
      throw error;
    }
  }

  async assertNativeValidationMessage(
    locator: Locator,
    expectedMessageSubstring: string // Renamed for clarity to indicate it's a substring
  ): Promise<void> {
    try {
      // 1. Ensure the element is focused and then blurred to trigger native validation
      //    This is crucial if the validation message only appears on blur.
      await locator.focus();
      // Click body or another element to cause the input to blur
      await this.page.locator("body").click();

      // 2. Get the native validation message from the element
      const actualMessage = await locator.evaluate(
        (el: HTMLInputElement) => el.validationMessage
      );

      // 3. Perform partial match
      const trimmedActual = actualMessage.trim();
      const trimmedExpected = expectedMessageSubstring.trim();

      if (!trimmedActual.includes(trimmedExpected)) {
        const msg = `❌ Native validation message mismatch (partial match failed).
Expected to contain: "${trimmedExpected}"
Actual message:      "${trimmedActual}"`;
        this.logMessage(msg, "error");
        await this.captureScreenshotOnFailure("assertNativeValidationMessage");
        throw new Error(msg);
      }

      this.logMessage(
        `✅ Native validation message partially matched: "${trimmedActual}" contains "${trimmedExpected}"`
      );
    } catch (error) {
      const errorMsg = `❌ Failed to assert native validation message: ${error}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("assertNativeValidationMessage");
      throw new Error(errorMsg);
    }
  }

  async validateMultipleUrlStatuses(
    locator: Locator,
    expectedStatus: number = 200
  ): Promise<void> {
    const logs: string[] = [];
    const apiContext = await request.newContext();
    const totalLinks = await locator.count();

    const log = (msg: string, level: "info" | "warn" | "error" = "info") => {
      const prefix = {
        info: "ℹ️",
        warn: "⚠️",
        error: "❌",
      }[level];
      logs.push(`${prefix}  ${msg}`);
    };

    const flushLogs = () => {
      for (const line of logs) {
        this.logMessage(line); // Send to your actual logger here
      }
    };

    if (totalLinks === 0) {
      const errorMsg = `No links found in selector: "${locator}"`;
      log(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateAllLinkStatuses");
      flushLogs();
      throw new Error(errorMsg);
    }

    log(`Found ${totalLinks} link(s) in selector: "${locator}"`);

    for (let i = 0; i < totalLinks; i++) {
      const element = locator.nth(i);
      const href = await element.getAttribute("href");

      if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
        log(`Skipping invalid href at index ${i + 1}: "${href}"`, "warn");
        continue;
      }

      const url = href.startsWith("http")
        ? href
        : new URL(href, this.page.url()).href;

      try {
        const response = await apiContext.get(url, { timeout: 60000 });
        const actualStatus = response.status();

        log(
          `Link ${
            i + 1
          } checked → URL: "${url}" | Expected: ${expectedStatus} | Received: ${actualStatus}`
        );

        expect(actualStatus).toBe(expectedStatus);
      } catch (innerError) {
        const errorMsg = `Link ${
          i + 1
        } failed → URL: "${url}" | Error: ${innerError}`;
        log(errorMsg, "error");
        await this.captureScreenshotOnFailure(`Link_${i + 1}_Failure`);
        flushLogs(); // Log before throwing
        throw new Error(errorMsg);
      }
    }

    flushLogs(); // Print all logs at the end in one go
  }

  async focusOnElement(identifier: Locator): Promise<void> {
    try {
      await identifier.focus();
      this.logMessage(`Focused on element with identifier: ${identifier}`);
    } catch (error) {
      const errorMsg = `Failed to focus on element with identifier: ${identifier}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("focusOnElement");
      throw new Error(errorMsg);
    }
  }

  async keyboardEnterPress(): Promise<void> {
    try {
      await this.page.keyboard.press("Enter");
      this.logMessage(`Pressed Enter key on the page`);
    } catch (error) {
      const errorMsg = `Failed to press Enter key on the page`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("keyboardEnterPress");
      throw new Error(errorMsg);
    }
  }

  async verifyElementIsEnabled(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeVisible();

      await expect.soft(locator).toBeEnabled();

      this.logMessage(`Verified element: ${locator} is enabled`);
    } catch (err: any) {
      const msg = `Failed to verify element is enabled: ${err.message}`;
      this.logMessage(msg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsEnabled");
      throw new Error(msg);
    }
  }

  async assertExpectedTextsInLocator(
    locator: Locator,
    expectedTexts: Record<string, string> | string[],
    limit: number = 15
  ): Promise<void> {
    try {
      // Wait for 15 elements to be rendered before continuing
      await expect(locator).toHaveCount(15, { timeout: 5000 });

      const expected = Array.isArray(expectedTexts)
        ? expectedTexts
        : Object.values(expectedTexts);

      const actual = await locator.allTextContents();
      const topResults = actual.slice(0, limit).map((t) => t.trim());

      for (const text of expected) {
        if (!topResults.some((actualText) => actualText.includes(text))) {
          const errorMsg = `Expected text "${text}" not found in top ${limit} results: [${topResults.join(
            ", "
          )}]`;
          this.logMessage(errorMsg, "error");
          await this.captureScreenshotOnFailure("assertExpectedTextsInLocator");
          throw new Error(errorMsg);
        }
      }

      this.logMessage(
        `Verified expected texts ${JSON.stringify(
          expected
        )} are present in top ${limit} results`
      );
    } catch (error) {
      const fallbackMsg = `Error while asserting expected texts in locator: ${
        (error as Error).message
      }`;
      this.logMessage(fallbackMsg, "error");
      await this.captureScreenshotOnFailure("assertExpectedTextsInLocator");
      throw new Error(fallbackMsg);
    }
  }

  // <------------------------------------------------------------ X ------------------------------------------------------------>
  // To Test Utils
  // ---------------------------------------------------------------------------------------------------------------------------------
  // here you can add any utility methods that you want to test
  async highlightLocator(locator: Locator) {
    await locator.highlight();
  }

  async escapeRegExp(text: string): Promise<string> {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // ---------------------------------------------------------------------------------------------------------------------------------
}

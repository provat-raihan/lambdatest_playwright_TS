import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";

class HeaderTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Header functionality test", () => {
      test.beforeEach(async ({ runner, envData, homePage }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyUrlContains(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.headerLogo);
        await runner.validateAttribute(
          homePage.headerLogo,
          "src",
          homeData.header.logoSrc
        );
        await runner.validateAttribute(
          homePage.headerLogo,
          "alt",
          homeData.header.logoAlt
        );
      });

      test("Verify that navbar items visible properly and contain expected texts", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(
          homePage.navbarItems.shopByCategory
        );
        await runner.verifyContainText(
          homePage.navbarItems.shopByCategory,
          "Shop by Category"
        );
        await runner.verifyElementIsVisible(homePage.navbarItems.home);
        await runner.verifyContainText(homePage.navbarItems.home, "Home ");
        await runner.verifyElementIsVisible(homePage.navbarItems.home);
        // await runner.verifyElementIsVisible();
      });
    });
  }
}

new HeaderTest().runTest();

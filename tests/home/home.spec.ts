import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";

// message: after complete the header, we will work on homepage functionality

class HomePageTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Homepage functionality test", () => {
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

      test("Verify something", async ({ runner, homePage }) => {
        await runner.verifyElementIsVisible(homePage.headerLogo);
      });
    });
  }
}

new HomePageTest().runTest();

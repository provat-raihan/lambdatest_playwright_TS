import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";

class HomePageTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Homepage functionality test", () => {
      test.beforeEach(async ({ runner, envData }) => {
        await runner.navigateTo(envData.baseUrl);
      });

      test("Verify something", async ({ runner, homePage }) => {
        await runner.verifyElementIsVisible(homePage.homePageLogo);
      });
    });
  }
}

new HomePageTest().runTest();

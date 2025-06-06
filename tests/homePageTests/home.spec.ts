import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";

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
        // Check the logo's src attribute using runner
        await runner.validateAttribute(homePage.homePageLogo, "src","https://ecommerce-playground.lambdatest.io/image/catalog/maza/svg/image2vector.svg");
      });
    });
  }
}

new HomePageTest().runTest();

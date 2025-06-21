import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import registerData from "../../testData/register.json";
import loginData from "../../testData/login.json";
import myAccountData from "../../testData/myAccount.json";

class loginPageTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("LoginPage functionality test", () => {
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

      test("Verify login is done with valid credentials", async ({
        runner,
        homePage,
        myAccountPage,
        authHelper,
        envData,
      }) => {
        await runner.clickOnElement(homePage.navbarItems.myAccount);
        await runner.clickOnElement(homePage.navbarItems.myAccountLogin);

        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageHeader
        );
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountBreadcrumbActive
        );
        await runner.verifyToHaveExactText(
          myAccountPage.myAccount.myAccountBreadcrumbActive,
          myAccountData.loginBreadcrumbText
        );
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.registerSectionHeader
        );
        await authHelper.login(envData.baseUrl, {
          email: envData.email,
          password: envData.password,
        });
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountBreadcrumb
        );
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountBreadcrumbActive
        );
        await runner.verifyToHaveExactText(
          myAccountPage.myAccount.myAccountBreadcrumbActive,
          myAccountData.accountBreadcrumbText
        );
      });
    });
  }
}
new loginPageTest().runTest();

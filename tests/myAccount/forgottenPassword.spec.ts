import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import myAccountData from "../../testData/myAccount.json";

class forgottenPasswordTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("forgotten password functionality test", () => {
      test.beforeEach(async ({ runner, envData, homePage, myAccountPage }) => {
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
        await runner.mouseHover(homePage.navbarItems.myAccount);
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
        await runner.clickOnElement(
          myAccountPage.loginPage.loginPageForgottenPasswordButton
        );
        await runner.verifyUrlContains(
          envData.forgotPasswordUrl
        );

        await runner.verifyElementIsVisible(
          myAccountPage.forgottenPasswordPage.forgottenPasswordPageHeader
        );
        await runner.verifyElementIsVisible(
          myAccountPage.forgottenPasswordPage.forgottenPasswordPageEmailLegend
        );
        await runner.verifyToHaveExactText(
          myAccountPage.forgottenPasswordPage.forgottenPasswordPageHeader,
          myAccountData.forgottenPassword.forgottenPasswordHeaderText
        );
        await runner.verifyToHaveExactText(
          myAccountPage.forgottenPasswordPage.forgottenPasswordPageEmailLegend,
          myAccountData.forgottenPassword.forgottenPasswordEmailLegendText
        );
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountBreadcrumbActive
        );
        await runner.verifyToHaveExactText(
          myAccountPage.myAccount.myAccountBreadcrumbActive,
          myAccountData.forgottenPasswordBreadcrumbText
        );
      });
      test("Verify forgotten password sends email with confirmation link", async ({
        runner,
        myAccountPage,
        envData,
      }) => {
        await runner.fillInputBox(
          myAccountPage.forgottenPasswordPage.forgottenPasswordPageEmailField,
          envData.email
        );
        await runner.clickOnElement(
          myAccountPage.forgottenPasswordPage
            .forgottenPasswordPageContinueButton
        );
        await runner.verifyUrlContains(envData.loginUrl)
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
          myAccountPage.loginPage.loginPageSuccessWarningSection
        );
        await runner.verifyToHaveExactText(
          myAccountPage.loginPage.loginPageSuccessWarningSection,
          myAccountData.forgottenPassword.forgottenPasswordSuccessText
        );
      });
      test("Verify forgotten password sends warning message for invalid email", async ({
        runner,
        myAccountPage,
        fakeUser,
      }) => {
        await runner.fillInputBox(
          myAccountPage.forgottenPasswordPage.forgottenPasswordPageEmailField,
          fakeUser.email
        );
        await runner.clickOnElement(
          myAccountPage.forgottenPasswordPage
            .forgottenPasswordPageContinueButton
        );
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageDangerWarningSection
        );
        await runner.verifyToHaveExactText(
          myAccountPage.loginPage.loginPageDangerWarningSection,
          myAccountData.forgottenPassword.forgottenPasswordInvalidEmailText
        );
      });
      test("Verify forgotten password sends warning message for blank email", async ({
        runner,
        myAccountPage,
        
      }) => {
        await runner.fillInputBox(
          myAccountPage.forgottenPasswordPage.forgottenPasswordPageEmailField,
          ""
        );
        await runner.clickOnElement(
          myAccountPage.forgottenPasswordPage
            .forgottenPasswordPageContinueButton
        );
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageDangerWarningSection
        );
        await runner.verifyToHaveExactText(
          myAccountPage.loginPage.loginPageDangerWarningSection,
          myAccountData.forgottenPassword.forgottenPasswordInvalidEmailText
        );
      });
      test("Verify forgotten password back button directs to login page", async ({
        runner,
        myAccountPage,
        
      }) => {
    
        await runner.clickOnElement(
          myAccountPage.forgottenPasswordPage
            .forgottenPasswordPageBackButton
        );
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
        
      });
    });
  }
}
new forgottenPasswordTest().runTest();

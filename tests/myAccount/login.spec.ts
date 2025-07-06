import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import myAccountData from "../../testData/myAccount.json";

class loginPageTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("LoginPage functionality test", () => {
      test.beforeEach(async ({ runner, envData, homePage,myAccountPage }) => {
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
      });

      test("Verify login is done with valid credentials", async ({
        runner,
        myAccountPage,
        authHelper,
        envData,
      }) => {
        await authHelper.login(envData.baseUrl, {
          email: envData.email,
          password: envData.password,
        });
        await runner.verifyUrlContains(envData.myAccountItems.myAccount)
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

      test("Verify login can't be done with invalid email", async ({
        runner,
        myAccountPage,
        authHelper,
        envData,
        fakeUser,
      }) => {
        await authHelper.login(envData.baseUrl, {
          email: fakeUser.email,
          password: envData.password,
        });
        await runner.verifyUrlContains(envData.myAccountItems.myAccount)
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageDangerWarningSection
        );
        await runner.verifyToHaveExactText(
          myAccountPage.loginPage.loginPageDangerWarningSection,
          myAccountData.login.loginPageInvalidCredentialWarningText
        );
      });

      test("Verify login can't be done with invalid password", async ({
        runner,
        myAccountPage,
        authHelper,
        envData,
        fakeUser,
      }) => {
        await authHelper.login(envData.baseUrl, {
          email: envData.email,
          password: fakeUser.password,
        });
        await runner.verifyUrlContains(envData.myAccountItems.myAccount)
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageDangerWarningSection
        );
        await runner.verifyToHaveExactText(
          myAccountPage.loginPage.loginPageDangerWarningSection,
          myAccountData.login.loginPageInvalidCredentialWarningText
        );
      });

      test("Verify login can't be done with proper warning with empty fields", async ({
        runner,
        myAccountPage,
        authHelper,
        envData,
      }) => {
        await authHelper.login(envData.baseUrl, {
          email: "",
          password: "",
        });
        await runner.verifyUrlContains(envData.myAccountItems.myAccount)
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageDangerWarningSection
        );
        await runner.verifyToHaveExactText(
          myAccountPage.loginPage.loginPageDangerWarningSection,
          myAccountData.login.loginPageRetryLimitWarningText
        );
      });

      test("Verify warning message when login attempted more than 5 times", async ({
        runner,
        myAccountPage,
        authHelper,
        envData,
        fakeUser,
      }) => {
        await authHelper.login(envData.baseUrl, {
          email: fakeUser.email,
          password: fakeUser.password,
        });
        
        await authHelper.login(envData.baseUrl, {
          email: fakeUser.email,
          password: fakeUser.password,
        });
        await authHelper.login(envData.baseUrl, {
          email: fakeUser.email,
          password: fakeUser.password,
        });
        await authHelper.login(envData.baseUrl, {
          email: fakeUser.email,
          password: fakeUser.password,
        });
        await authHelper.login(envData.baseUrl, {
          email: fakeUser.email,
          password: fakeUser.password,
        });
        await authHelper.login(envData.baseUrl, {
          email: fakeUser.email,
          password: fakeUser.password,
        });
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageDangerWarningSection
        );
        await runner.verifyToHaveExactText(
          myAccountPage.loginPage.loginPageDangerWarningSection,
          myAccountData.login.loginPageRetryLimitWarningText
        );
      });
      test("Verify forgotten password button directs to the correct page", async ({
        runner,
        myAccountPage,
        envData
      }) => {
        await runner.clickOnElement(myAccountPage.loginPage.loginPageForgottenPasswordButton)
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
      test("Verify logout button successfully logs out the user", async ({
        runner,
        homePage,
        myAccountPage,
        envData,
        authHelper
      }) => {
        
        await authHelper.login(envData.baseUrl, {
          email: envData.email,
          password: envData.password,
        });
        await runner.verifyUrlContains(envData.myAccountItems.myAccount)
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
        await runner.clickOnElement(myAccountPage.sidebarOptions.logout)
        await runner.verifyElementIsVisible(myAccountPage.logoutPage.logoutPageHeader)
        await runner.clickOnElement(myAccountPage.logoutPage.continueButton)
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
    });
  }
}
new loginPageTest().runTest();

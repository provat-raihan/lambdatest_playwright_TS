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

      test("Verify login can't be done with invalid email", async ({
        runner,
        homePage,
        myAccountPage,
        authHelper,
        envData,
        fakeUser,
      }) => {
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
        await authHelper.login(envData.baseUrl, {
          email: fakeUser.email,
          password: envData.password,
        });
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
        homePage,
        myAccountPage,
        authHelper,
        envData,
        fakeUser,
      }) => {
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
        await authHelper.login(envData.baseUrl, {
          email: envData.email,
          password: fakeUser.password,
        });
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
        homePage,
        myAccountPage,
        authHelper,
        envData,
      }) => {
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
        await authHelper.login(envData.baseUrl, {
          email: "",
          password: "",
        });
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
        homePage,
        myAccountPage,
        authHelper,
        envData,
        fakeUser,
      }) => {
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
        homePage,
        myAccountPage,
      }) => {
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
        await runner.clickOnElement(myAccountPage.loginPage.loginPageForgottenPasswordButton)

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
    });
  }
}
new loginPageTest().runTest();

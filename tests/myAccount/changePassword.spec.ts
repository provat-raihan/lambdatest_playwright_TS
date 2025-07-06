import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import myAccountData from "../../testData/myAccount.json";

class changePasswordTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("change password functionality test", () => {
      test.beforeEach(
        async ({
          runner,
          envData,
          homePage,
          myAccountPage,
          fakeUser,
          authHelper,
        }) => {
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
          await runner.clickOnElement(homePage.navbarItems.myAccountRegister);
          await runner.verifyUrlContains(envData.registerUrl);
          await runner.verifyElementIsVisible(
            myAccountPage.registerPage.registerPageHeader
          );
          await runner.verifyElementIsVisible(
            myAccountPage.myAccount.myAccountBreadcrumbActive
          );
          await runner.verifyToHaveExactText(
            myAccountPage.myAccount.myAccountBreadcrumbActive,
            myAccountData.registerBreadcrumbText
          );
          await authHelper.register(envData.baseUrl, {
            firstName: fakeUser.firstName,
            lastName: fakeUser.lastName,
            telephone: fakeUser.telephone,
            email: fakeUser.email,
            password: fakeUser.password,
            passwordConfirm: fakeUser.password,
            newsletterSubscribe: fakeUser.newsletterSubscribe,
          });
          await runner.verifyUrlContains(envData.successUrl);
          await runner.verifyElementIsVisible(
            myAccountPage.myAccount.myAccountBreadcrumbActive
          );
          await runner.verifyToHaveExactText(
            myAccountPage.myAccount.myAccountBreadcrumbActive,
            myAccountData.successBreadcrumbText
          );
          await runner.verifyElementIsVisible(
            myAccountPage.successPage.successPageHeader
          );
          await runner.verifyToHaveExactText(
            myAccountPage.successPage.successPageHeader,
            myAccountData.register.successOfAccountCreation
          );
          await runner.clickOnElement(
            myAccountPage.successPage.successPageContinueButton
          );
          await runner.verifyUrlContains(envData.myAccountItems.myAccount);
          await runner.clickOnElement(myAccountPage.sidebarOptions.password);
          await runner.verifyElementIsVisible(
            myAccountPage.changePasswordPage.changePasswordPageHeader
          );
          await runner.verifyElementIsVisible(
            myAccountPage.myAccount.myAccountBreadcrumbActive
          );
          await runner.verifyToHaveExactText(
            myAccountPage.myAccount.myAccountBreadcrumbActive,
            myAccountData.changePasswordBreadcrumbText
          );
        }
      );
      test("Verify  password changing can be done properly", async ({
        runner,
        myAccountPage,
        fakeUser,
        envData,
      }) => {
        await runner.fillInputBox(
          myAccountPage.changePasswordPage.passwordInputField,
          fakeUser.changedPassword
        );
        await runner.fillInputBox(
          myAccountPage.changePasswordPage.confirmPasswordInputField,
          fakeUser.changedPasswordConfirm
        );
        await runner.clickOnElement(
          myAccountPage.changePasswordPage.continueButton
        );
        await runner.verifyUrlContains(envData.myAccountItems.myAccount);
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountHeader
        );
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountBreadcrumbActive
        );
        await runner.verifyToHaveExactText(
          myAccountPage.myAccount.myAccountBreadcrumbActive,
          myAccountData.accountBreadcrumbText
        );
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageSuccessWarningSection
        );
        await runner.verifyToHaveExactText(
          myAccountPage.loginPage.loginPageSuccessWarningSection,
          myAccountData.changePasswordPage.passwordUpdateWarningText
        );
      });
      test("Verify  back button works properly", async ({
        runner,
        myAccountPage,
        envData,
      }) => {
        await runner.clickOnElement(
          myAccountPage.changePasswordPage.backButton
        );
        await runner.verifyUrlContains(envData.myAccountItems.myAccount);
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountHeader
        );
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountBreadcrumbActive
        );
        await runner.verifyToHaveExactText(
          myAccountPage.myAccount.myAccountBreadcrumbActive,
          myAccountData.accountBreadcrumbText
        );
      });
      test("Verify  password fields show proper warning message", async ({
        runner,
        myAccountPage,
      }) => {
        await runner.clickOnElement(
          myAccountPage.changePasswordPage.continueButton
        );
        await runner.verifyElementIsVisible(
          myAccountPage.changePasswordPage.passwordFieldWarning
        );
        await runner.verifyToHaveExactText(
          myAccountPage.changePasswordPage.passwordFieldWarning,
          myAccountData.changePasswordPage.passwordFieldWarningText
        );
      });
      test("Verify confirm password field show proper warning message", async ({
        runner,
        myAccountPage,
        fakeUser,
      }) => {
        await runner.fillInputBox(
          myAccountPage.changePasswordPage.passwordInputField,
          fakeUser.changedPassword
        );
        await runner.fillInputBox(
          myAccountPage.changePasswordPage.confirmPasswordInputField,
          ""
        );
        await runner.clickOnElement(
          myAccountPage.changePasswordPage.continueButton
        );
        await runner.verifyElementIsVisible(
          myAccountPage.changePasswordPage.confirmPasswordFieldWarning
        );
        await runner.verifyToHaveExactText(
          myAccountPage.changePasswordPage.confirmPasswordFieldWarning,
          myAccountData.changePasswordPage.confirmPasswordFieldWarningText
        );
      });
    });
  }
}
new changePasswordTest().runTest();

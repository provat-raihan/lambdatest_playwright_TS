import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import myAccountData from "../../testData/myAccount.json";
import { MyAccountPage } from "../../pageObjectModel/myAccount";


class editAccountPageTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Edit account sidebar functionality test", () => {
      test.describe("Edit account functionality testing", () => {
        test.beforeEach(
          async ({ runner, envData, homePage, myAccountPage, authHelper }) => {
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
              myAccountPage.loginPage.registerSectionHeader
            );
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
            await runner.clickOnElement(
              myAccountPage.sidebarOptions.editAccount
            );
            await runner.verifyUrlContains(envData.myAccountItems.editAccount)
            await runner.verifyElementIsVisible(
              myAccountPage.editAccountPage.editAccountPageHeader
            );
            await runner.verifyElementIsVisible(
              myAccountPage.myAccount.myAccountBreadcrumbActive
            );
            await runner.verifyToHaveExactText(
              myAccountPage.myAccount.myAccountBreadcrumbActive,
              myAccountData.editAccountBreadcrumbText
            );
          }
        );
        test("verify that all the registered details are showed here", async ({
          runner,
          myAccountPage,
          envData,
        }) => {
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.firstNameInputBox,
            envData.firstName
          );
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.lastNameInputBox,
            envData.lastName
          );
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.emailInputBox,
            envData.email
          );
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.telephoneInputBox,
            envData.telephone
          );
        });
        test("verify that continue button directs to my account page with confirmation", async ({
          runner,
          myAccountPage,
          envData,
        }) => {
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.firstNameInputBox,
            envData.firstName
          );
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.lastNameInputBox,
            envData.lastName
          );
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.emailInputBox,
            envData.email
          );
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.telephoneInputBox,
            envData.telephone
          );
          await runner.clickOnElement(
            myAccountPage.editAccountPage.continueButton
          );
          await runner.verifyUrlContains(envData.myAccountItems.myAccount)
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
            myAccountData.editAccountPage.accountUpdateWarningText
          );
        });
        test("verify that back button directs to my account page ", async ({
          runner,
          myAccountPage,
          envData,
        }) => {
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.firstNameInputBox,
            envData.firstName
          );
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.lastNameInputBox,
            envData.lastName
          );
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.emailInputBox,
            envData.email
          );
          await runner.verifyToHaveValue(
            myAccountPage.editAccountPage.telephoneInputBox,
            envData.telephone
          );
          await runner.clickOnElement(myAccountPage.editAccountPage.backButton);
          await runner.verifyUrlContains(envData.myAccountItems.myAccount)
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
          await runner.verifyElementIsNotVisible(
            myAccountPage.loginPage.loginPageSuccessWarningSection
          );
        });
        test("verify that all the input fields show proper warning messages", async ({
          runner,
          myAccountPage,
          envData,
          homePage,
        }) => {
          await runner.fillInputBox(
            myAccountPage.editAccountPage.firstNameInputBox,
            ""
          );
          await runner.fillInputBox(
            myAccountPage.editAccountPage.lastNameInputBox,
            ""
          );
          await runner.fillInputBox(
            myAccountPage.editAccountPage.emailInputBox,
            ""
          );
          await runner.fillInputBox(
            myAccountPage.editAccountPage.telephoneInputBox,
            ""
          );
          await runner.clickOnElement(
            myAccountPage.editAccountPage.continueButton
          );
          await runner.verifyElementIsVisible(
            myAccountPage.editAccountPage.firstNameWarning
          );
          await runner.verifyElementIsVisible(
            myAccountPage.editAccountPage.lastNameWarning
          );
          await runner.verifyElementIsVisible(
            myAccountPage.editAccountPage.emailWarning
          );
          await runner.verifyElementIsVisible(
            myAccountPage.editAccountPage.telephoneWarning
          );
          await runner.verifyElementIsVisible(
            myAccountPage.editAccountPage.telephoneGuideMessage
          );
        });
      });
      test.describe("Edit account info changed", () => {
        test.beforeEach(
          async ({
            runner,
            envData,
            homePage,
            myAccountPage,
            authHelper,
            fakeUser,
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
            await runner.verifyUrlContains(envData.registerUrl)
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
            await runner.verifyUrlContains(envData.successUrl)
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
            await runner.verifyUrlContains(envData.myAccountItems.myAccount)
            await runner.clickOnElement(
              myAccountPage.sidebarOptions.editAccount
            );
            await runner.verifyUrlContains(envData.myAccountItems.editAccount)
            await runner.verifyElementIsVisible(
              myAccountPage.editAccountPage.editAccountPageHeader
            );
            await runner.verifyElementIsVisible(
              myAccountPage.myAccount.myAccountBreadcrumbActive
            );
            await runner.verifyToHaveExactText(
              myAccountPage.myAccount.myAccountBreadcrumbActive,
              myAccountData.editAccountBreadcrumbText
            );
            await runner.verifyToHaveValue(
              myAccountPage.editAccountPage.firstNameInputBox,
              fakeUser.firstName
            );
            await runner.verifyToHaveValue(
              myAccountPage.editAccountPage.lastNameInputBox,
              fakeUser.lastName
            );
            await runner.verifyToHaveValue(
              myAccountPage.editAccountPage.emailInputBox,
              fakeUser.email
            );
            await runner.verifyToHaveValue(
              myAccountPage.editAccountPage.telephoneInputBox,
              fakeUser.telephone
            );
          }
        );

        test("verifying to update first name successfully ", async ({
          runner,
          myAccountPage,
          fakeUser,
          envData
        }) => {
          await runner.fillInputBox(
            myAccountPage.editAccountPage.firstNameInputBox,
            `${fakeUser.firstName}+"update"`
          );
          await runner.clickOnElement(
            myAccountPage.editAccountPage.continueButton
          );
          await runner.verifyUrlContains(envData.myAccountItems.myAccount)
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
            myAccountData.editAccountPage.accountUpdateWarningText
          );
        });
        test("verifying to update last name successfully ", async ({
          runner,
          myAccountPage,
          envData,
          fakeUser,
        }) => {
          await runner.fillInputBox(
            myAccountPage.editAccountPage.lastNameInputBox,
            `${fakeUser.lastName}+"update"`
          );
          await runner.clickOnElement(
            myAccountPage.editAccountPage.continueButton
          );
          await runner.verifyUrlContains(envData.myAccountItems.myAccount)
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
            myAccountData.editAccountPage.accountUpdateWarningText
          );
        });
        test("verifying to update email successfully ", async ({
          runner,
          myAccountPage,
          envData,
          fakeUser,
        }) => {
          await runner.fillInputBox(
            myAccountPage.editAccountPage.emailInputBox,
            `update+${fakeUser.email}`
          );
          await runner.clickOnElement(
            myAccountPage.editAccountPage.continueButton
          );
          await runner.verifyUrlContains(envData.myAccountItems.myAccount)
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
            myAccountData.editAccountPage.accountUpdateWarningText
          );
        });
        test("verifying to update telephone successfully ", async ({
          runner,
          myAccountPage,
          envData,
          fakeUser,
        }) => {
          await runner.fillInputBox(
            myAccountPage.editAccountPage.telephoneInputBox,
            `${fakeUser.telephone}+update`
          );
          await runner.clickOnElement(
            myAccountPage.editAccountPage.continueButton
          );
          await runner.verifyUrlContains(envData.myAccountItems.myAccount)
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
            myAccountData.editAccountPage.accountUpdateWarningText
          );
        });
      

        //some more tests to be done later
      });
    });
  }
}
new editAccountPageTest().runTest();

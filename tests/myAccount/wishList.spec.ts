import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import myAccountData from "../../testData/myAccount.json";
import { MyAccountPage } from "../../pageObjectModel/myAccount";

class wishListPageTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("wish list  functionality test", () => {
      test.describe("wish list functionality testing from the sidebar without login", () => {
        test("verify that login is mandatory for wish list ", async ({
          runner,
          envData,
          homePage,
          myAccountPage,
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
          await runner.clickOnElement(homePage.navbarItems.myAccountLogin);
          await runner.verifyUrlContains(envData.loginUrl);

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

          await runner.clickOnElement(myAccountPage.sidebarOptions.wishList);
          await runner.verifyUrlContains(envData.loginUrl);

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
        // test("verify that all the registered details are showed here", async ({
        //   runner,
        //   myAccountPage,
        //   envData,
        // }) => {
        //   await runner.verifyToHaveValue(
        //     myAccountPage.editAccountPage.firstNameInputBox,
        //     envData.firstName
        //   );
        //   await runner.verifyToHaveValue(
        //     myAccountPage.editAccountPage.lastNameInputBox,
        //     envData.lastName
        //   );
        //   await runner.verifyToHaveValue(
        //     myAccountPage.editAccountPage.emailInputBox,
        //     envData.email
        //   );
        //   await runner.verifyToHaveValue(
        //     myAccountPage.editAccountPage.telephoneInputBox,
        //     envData.telephone
        //   );
        // });
      });
      test.describe("wish list functionality testing from the sidebar with log in", () => {
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
              email: fakeUser.email,
              telephone: fakeUser.telephone,
              password: fakeUser.password,
              passwordConfirm: fakeUser.passwordConfirm,
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

            await runner.clickOnElement(myAccountPage.sidebarOptions.wishList);
            await runner.verifyUrlContains(envData.myAccountItems.wishList);
            await runner.verifyElementIsVisible(
              myAccountPage.wishListPage.wishListPageHeader
            );
            await runner.verifyElementIsVisible(
              myAccountPage.myAccount.myAccountBreadcrumbActive
            );
            await runner.verifyToHaveExactText(
              myAccountPage.myAccount.myAccountBreadcrumbActive,
              myAccountData.wishListBreadcrumbText
            );
          }
        );
        test("verify that wish list is empty when no product has been added", async ({
          runner,
          myAccountPage,
          envData,
        }) => {
          await runner.verifyElementIsVisible(
            myAccountPage.wishListPage.emptyCartMessage
          );
        });
        test("verify that wish list shows a product when it has been added", async ({
          runner,
          myAccountPage,
            homePage,
          envData
        }) => {
            await runner.clickOnElement(homePage.navbarItems.home)
            await runner.verifyUrlContains(envData.homeUrl)
        });
          
      });
      //   test.describe("Edit account info changed", () => {
      //     test.beforeEach(
      //       async ({
      //         runner,
      //         envData,
      //         homePage,
      //         myAccountPage,
      //         authHelper,
      //         fakeUser,
      //       }) => {
      //         await runner.navigateTo(envData.baseUrl);
      //         await runner.verifyUrlContains(envData.baseUrl);
      //         await runner.verifyElementIsVisible(homePage.headerLogo);
      //         await runner.validateAttribute(
      //           homePage.headerLogo,
      //           "src",
      //           homeData.header.logoSrc
      //         );
      //         await runner.validateAttribute(
      //           homePage.headerLogo,
      //           "alt",
      //           homeData.header.logoAlt
      //         );
      //         await runner.mouseHover(homePage.navbarItems.myAccount);
      //         await runner.clickOnElement(homePage.navbarItems.myAccountRegister);
      //         await runner.verifyUrlContains(envData.registerUrl)
      //         await runner.verifyElementIsVisible(
      //           myAccountPage.registerPage.registerPageHeader
      //         );
      //         await runner.verifyElementIsVisible(
      //           myAccountPage.myAccount.myAccountBreadcrumbActive
      //         );
      //         await runner.verifyToHaveExactText(
      //           myAccountPage.myAccount.myAccountBreadcrumbActive,
      //           myAccountData.registerBreadcrumbText
      //         );
      //         await authHelper.register(envData.baseUrl, {
      //           firstName: fakeUser.firstName,
      //           lastName: fakeUser.lastName,
      //           telephone: fakeUser.telephone,
      //           email: fakeUser.email,
      //           password: fakeUser.password,
      //           passwordConfirm: fakeUser.password,
      //           newsletterSubscribe: fakeUser.newsletterSubscribe,
      //         });
      //         await runner.verifyUrlContains(envData.successUrl)
      //         await runner.verifyElementIsVisible(
      //           myAccountPage.myAccount.myAccountBreadcrumbActive
      //         );
      //         await runner.verifyToHaveExactText(
      //           myAccountPage.myAccount.myAccountBreadcrumbActive,
      //           myAccountData.successBreadcrumbText
      //         );
      //         await runner.verifyElementIsVisible(
      //           myAccountPage.successPage.successPageHeader
      //         );
      //         await runner.verifyToHaveExactText(
      //           myAccountPage.successPage.successPageHeader,
      //           myAccountData.register.successOfAccountCreation
      //         );
      //         await runner.clickOnElement(
      //           myAccountPage.successPage.successPageContinueButton
      //         );
      //         await runner.verifyUrlContains(envData.myAccountItems.myAccount)
      //         await runner.clickOnElement(
      //           myAccountPage.sidebarOptions.editAccount
      //         );
      //         await runner.verifyUrlContains(envData.myAccountItems.editAccount)
      //         await runner.verifyElementIsVisible(
      //           myAccountPage.editAccountPage.editAccountPageHeader
      //         );
      //         await runner.verifyElementIsVisible(
      //           myAccountPage.myAccount.myAccountBreadcrumbActive
      //         );
      //         await runner.verifyToHaveExactText(
      //           myAccountPage.myAccount.myAccountBreadcrumbActive,
      //           myAccountData.editAccountBreadcrumbText
      //         );
      //         await runner.verifyToHaveValue(
      //           myAccountPage.editAccountPage.firstNameInputBox,
      //           fakeUser.firstName
      //         );
      //         await runner.verifyToHaveValue(
      //           myAccountPage.editAccountPage.lastNameInputBox,
      //           fakeUser.lastName
      //         );
      //         await runner.verifyToHaveValue(
      //           myAccountPage.editAccountPage.emailInputBox,
      //           fakeUser.email
      //         );
      //         await runner.verifyToHaveValue(
      //           myAccountPage.editAccountPage.telephoneInputBox,
      //           fakeUser.telephone
      //         );
      //       }
      //     );

      //     test("verifying to update first name successfully ", async ({
      //       runner,
      //       myAccountPage,
      //       fakeUser,
      //       envData
      //     }) => {
      //       await runner.fillInputBox(
      //         myAccountPage.editAccountPage.firstNameInputBox,
      //         `${fakeUser.firstName}+"update"`
      //       );
      //       await runner.clickOnElement(
      //         myAccountPage.editAccountPage.continueButton
      //       );
      //       await runner.verifyUrlContains(envData.myAccountItems.myAccount)
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.myAccount.myAccountHeader
      //       );
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.myAccount.myAccountBreadcrumbActive
      //       );
      //       await runner.verifyToHaveExactText(
      //         myAccountPage.myAccount.myAccountBreadcrumbActive,
      //         myAccountData.accountBreadcrumbText
      //       );
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.loginPage.loginPageSuccessWarningSection
      //       );
      //       await runner.verifyToHaveExactText(
      //         myAccountPage.loginPage.loginPageSuccessWarningSection,
      //         myAccountData.editAccountPage.accountUpdateWarningText
      //       );
      //     });
      //     test("verifying to update last name successfully ", async ({
      //       runner,
      //       myAccountPage,
      //       envData,
      //       fakeUser,
      //     }) => {
      //       await runner.fillInputBox(
      //         myAccountPage.editAccountPage.lastNameInputBox,
      //         `${fakeUser.lastName}+"update"`
      //       );
      //       await runner.clickOnElement(
      //         myAccountPage.editAccountPage.continueButton
      //       );
      //       await runner.verifyUrlContains(envData.myAccountItems.myAccount)
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.myAccount.myAccountHeader
      //       );
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.myAccount.myAccountBreadcrumbActive
      //       );
      //       await runner.verifyToHaveExactText(
      //         myAccountPage.myAccount.myAccountBreadcrumbActive,
      //         myAccountData.accountBreadcrumbText
      //       );
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.loginPage.loginPageSuccessWarningSection
      //       );
      //       await runner.verifyToHaveExactText(
      //         myAccountPage.loginPage.loginPageSuccessWarningSection,
      //         myAccountData.editAccountPage.accountUpdateWarningText
      //       );
      //     });
      //     test("verifying to update email successfully ", async ({
      //       runner,
      //       myAccountPage,
      //       envData,
      //       fakeUser,
      //     }) => {
      //       await runner.fillInputBox(
      //         myAccountPage.editAccountPage.emailInputBox,
      //         `update+${fakeUser.email}`
      //       );
      //       await runner.clickOnElement(
      //         myAccountPage.editAccountPage.continueButton
      //       );
      //       await runner.verifyUrlContains(envData.myAccountItems.myAccount)
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.myAccount.myAccountHeader
      //       );
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.myAccount.myAccountBreadcrumbActive
      //       );
      //       await runner.verifyToHaveExactText(
      //         myAccountPage.myAccount.myAccountBreadcrumbActive,
      //         myAccountData.accountBreadcrumbText
      //       );
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.loginPage.loginPageSuccessWarningSection
      //       );
      //       await runner.verifyToHaveExactText(
      //         myAccountPage.loginPage.loginPageSuccessWarningSection,
      //         myAccountData.editAccountPage.accountUpdateWarningText
      //       );
      //     });
      //     test("verifying to update telephone successfully ", async ({
      //       runner,
      //       myAccountPage,
      //       envData,
      //       fakeUser,
      //     }) => {
      //       await runner.fillInputBox(
      //         myAccountPage.editAccountPage.telephoneInputBox,
      //         `${fakeUser.telephone}+update`
      //       );
      //       await runner.clickOnElement(
      //         myAccountPage.editAccountPage.continueButton
      //       );
      //       await runner.verifyUrlContains(envData.myAccountItems.myAccount)
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.myAccount.myAccountHeader
      //       );
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.myAccount.myAccountBreadcrumbActive
      //       );
      //       await runner.verifyToHaveExactText(
      //         myAccountPage.myAccount.myAccountBreadcrumbActive,
      //         myAccountData.accountBreadcrumbText
      //       );
      //       await runner.verifyElementIsVisible(
      //         myAccountPage.loginPage.loginPageSuccessWarningSection
      //       );
      //       await runner.verifyToHaveExactText(
      //         myAccountPage.loginPage.loginPageSuccessWarningSection,
      //         myAccountData.editAccountPage.accountUpdateWarningText
      //       );
      //     });

      //     //some more tests to be done later
      //   });
    });
  }
}
new wishListPageTest().runTest();

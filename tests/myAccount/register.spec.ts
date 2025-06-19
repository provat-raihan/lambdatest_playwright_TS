import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import registerData from "../../testData/register.json";
import homeData from "../../testData/home.json";




class registerTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    // The function passed to test.describe DOES NOT need to be 'async'
    // unless you plan to put 'await' calls directly here (which is uncommon).
    test.describe("RegisterPage functionality test", () => {

      // The function passed to test.beforeEach MUST be 'async' if it uses 'await'.
      test.beforeEach(async ({ runner, envData, homePage }) => {
        // All 'await' calls here are valid because beforeEach's function is 'async'.
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

      }); // This closing brace ends the 'beforeEach' function.


      test("Verify that clicking on register directs to register page", async ({ runner, homePage, envData, myAccountPage, }) => {
        await runner.mouseHover(homePage.navbarItems.myAccount);
        await runner.clickOnElement(homePage.navbarItems.myAccountRegister);
        await runner.verifyUrlContains(envData.registerUrl);
        await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageHeader);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.registerPageHeader, registerData.registerFormHeader);
      }); // This closing brace ends the 'test' function.
      test("Verify that clicking on my account then clicking new customer  directs to register page", async ({ runner, homePage, envData, myAccountPage, }) => {
        await runner.clickOnElement(homePage.navbarItems.myAccount);
        await runner.verifyUrlContains(envData.loginUrl);
        await runner.verifyElementIsVisible(myAccountPage.loginPage.loginPageBreadcrumbText)
        await runner.verifyElementIsVisible(myAccountPage.loginPage.registerSectionHeader)
        await runner.clickOnElement(myAccountPage.loginPage.registerSectionContinueButton)
        await runner.verifyUrlContains(envData.registerUrl);
        await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageBreadcrumbText);
        await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageHeader);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.registerPageHeader, registerData.registerFormHeader);





      }); // This closing brace ends the 'test' function.
      test("Verify that clicking on my account then clicking the register button directs to register page", async ({ runner, homePage, envData, myAccountPage, }) => {
        await runner.clickOnElement(homePage.navbarItems.myAccount);
        await runner.verifyUrlContains(envData.loginUrl);
        await runner.verifyElementIsVisible(myAccountPage.loginPage.loginPageBreadcrumbText)
        await runner.clickOnElement(myAccountPage.sidebarOptions.register)
        await runner.verifyUrlContains(envData.registerUrl);
        await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageBreadcrumbText);
        await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageHeader);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.registerPageHeader, registerData.registerFormHeader);
      }); // This closing brace ends the 'test' function.
      test("Verify the warning message without all the fields provided ", async ({ runner, homePage, envData, myAccountPage }) => {
        await runner.mouseHover(homePage.navbarItems.myAccount);
        await runner.clickOnElement(homePage.navbarItems.myAccountRegister);
        await runner.verifyUrlContains(envData.registerUrl);
        await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageBreadcrumbText);
        await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageHeader);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.registerPageHeader, registerData.registerFormHeader);
        await runner.clickOnElement(myAccountPage.registerPage.continueButton)
        await runner.verifyElementIsVisible(myAccountPage.registerPage.warningTextToAgreePolicy)
        await runner.verifyToHaveExactText(myAccountPage.registerPage.warningTextToAgreePolicy, registerData.warningTextToAgreePolicy)



      }); // This closing brace ends the 'test' function.
      test("Verify registration is complete with valid credentials ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: fakeUser.lastName,
          email: fakeUser.email,
          telephone: fakeUser.telephone,
          password: fakeUser.password,
          passwordConfirm: fakeUser.passwordConfirm,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.successPage.successPageBreadcrumbText);
        await runner.verifyElementIsVisible(myAccountPage.successPage.successPageHeader);
        await runner.verifyToHaveExactText(myAccountPage.successPage.successPageHeader, registerData.successOfAccountCreation);
        

      }); // This closing brace ends the 'test' function.
      test("Verify warning is shown when first name is empty ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: '',
          lastName: fakeUser.lastName,
          email: fakeUser.email,
          telephone: fakeUser.telephone,
          password: fakeUser.password,
          passwordConfirm: fakeUser.passwordConfirm,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.firstNameWarning);

        await runner.verifyToHaveExactText(myAccountPage.registerPage.firstNameWarning, registerData.firstNameWarningText);
      });// This closing brace ends the 'test' function.
      test("Verify warning is shown when last name is empty ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: '',
          email: fakeUser.email,
          telephone: fakeUser.telephone,
          password: fakeUser.password,
          passwordConfirm: fakeUser.passwordConfirm,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.lastNameWarning);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.lastNameWarning, registerData.lastNameWarningText);
      });// This closing brace ends the 'test' function.
      test("Verify warning is shown when email is empty ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: fakeUser.lastName,
          email: '',
          telephone: fakeUser.telephone,
          password: fakeUser.password,
          passwordConfirm: fakeUser.passwordConfirm,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.emailWarning);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.emailWarning, registerData.emailWarningText);
      });// This closing brace ends the 'test' function.
      test("Verify warning is shown when telephone is empty ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: fakeUser.lastName,
          email: fakeUser.email,
          telephone: '',
          password: fakeUser.password,
          passwordConfirm: fakeUser.passwordConfirm,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.telephoneWarning);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.telephoneGuideMessage, registerData.telephoneGuideMessageText);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.telephoneWarning, registerData.telephoneWarningText);
      });// This closing brace ends the 'test' function.
      test("Verify warning is shown when password is empty ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: fakeUser.lastName,
          email: fakeUser.email,
          telephone: fakeUser.telephone,
          password: '',
          passwordConfirm: fakeUser.passwordConfirm,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.passwordWarning);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.passwordWarning, registerData.passwordWarningText);
      });// This closing brace ends the 'test' function.
      test("Verify warning is shown when confirm password is empty ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: fakeUser.lastName,
          email: fakeUser.email,
          telephone: fakeUser.telephone,
          password: fakeUser.password,
          passwordConfirm: '',
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.passwordConfirmWarning);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.passwordConfirmWarning, registerData.passwordConfirmationWarningText);
      }); // This closing brace ends the 'test' function.
      test("Verify warning is shown when first name exceeds 32 characters ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: "fake".repeat(10), // This will exceed 32 characters
          lastName: fakeUser.lastName,
          email: fakeUser.email,
          telephone: fakeUser.telephone,
          password: fakeUser.password,
          passwordConfirm: fakeUser.passwordConfirm,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.firstNameWarning);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.firstNameWarning, registerData.firstNameWarningText);
      }); // This closing brace ends the 'test' function.
      test("Verify warning is shown when last name exceeds 32 characters ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: "fake".repeat(10), // This will exceed 32 characters
          email: fakeUser.email,
          telephone: fakeUser.telephone,
          password: fakeUser.password,
          passwordConfirm: fakeUser.passwordConfirm,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.lastNameWarning);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.lastNameWarning, registerData.lastNameWarningText);
      }); // This closing brace ends the 'test' function.

      test("Verify warning is shown when telephone exceeds 32 characters ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: fakeUser.lastName,
          email: fakeUser.email,
          telephone: "1234567890123456789012345678901234567890", // 40 characters
          password: fakeUser.password,
          passwordConfirm: fakeUser.passwordConfirm,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.telephoneWarning);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.telephoneGuideMessage, registerData.telephoneGuideMessageText);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.telephoneWarning, registerData.telephoneWarningText);
      }); // This closing brace ends the 'test' function.

      test("Verify warning is shown when password exceeds 20 characters ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: fakeUser.lastName,
          email: fakeUser.email,
          telephone: fakeUser.telephone,
          password: "a".repeat(21), // 21 characters
          passwordConfirm: "a".repeat(21),
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.passwordWarning);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.passwordWarning, registerData.passwordWarningText);
      }); // This closing brace ends the 'test' function.
      test("Verify warning is shown when email is without @ ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: fakeUser.lastName,
          email: fakeUser.invalidEmail,
          telephone: fakeUser.telephone,
          password: fakeUser.password,
          passwordConfirm: fakeUser.passwordConfirm,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.assertNativeValidationMessage(myAccountPage.registerPage.emailInputBox,registerData.invalidEmailWarning);

      });// This closing brace ends the 'test' function.
      test("Verify warning is shown when confirm password doesn't match password typed ", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: fakeUser.lastName,
          email: fakeUser.email,
          telephone: fakeUser.telephone,
          password: fakeUser.password,
          passwordConfirm: "b".repeat(11), // 11 characters
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.passwordConfirmWarning);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.passwordConfirmWarning, registerData.passwordConfirmationWarningText);
      }); // This closing brace ends the 'test' function.
      test("Verify that while registering with existing email it shows warning", async ({ runner, envData, myAccountPage, registerAuthHelper, fakeUser }) => {
        await registerAuthHelper.register(envData.baseUrl, {
          firstName: fakeUser.firstName,
          lastName: fakeUser.lastName,
          email:envData.email ,
          telephone: fakeUser.telephone,
          password: envData.password,
          passwordConfirm: envData.password,
          newsletterSubscribe: fakeUser.newsletterSubscribe
        });
        await runner.verifyElementIsVisible(myAccountPage.registerPage.warningTextAlreadyRegistered);
        await runner.verifyToHaveExactText(myAccountPage.registerPage.warningTextAlreadyRegistered, registerData.warningTextAlreadyRegistered);
      }); // This closing brace ends the 'test' function.

      }); // This closes the 'describe' block for "RegisterPage functionality test".
  } // This closes the 'runTest' method.
} 

new registerTest().runTest();
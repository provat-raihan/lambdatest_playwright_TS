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


        test("Verify that clicking on register directs to register page", async ({ runner, homePage,envData, myAccountPage, }) => {
            await runner.mouseHover(homePage.navbarItems.myAccount);
          await runner.clickOnElement(homePage.navbarItems.myAccountRegister);
          await runner.verifyUrlContains(envData.registerUrl);
          await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageHeader);
          await runner.verifyToHaveExactText(myAccountPage.registerPage.registerPageHeader, registerData.registerFormHeader);
        }); // This closing brace ends the 'test' function.
        test("Verify that clicking on my account then clicking new customer  directs to register page", async ({ runner, homePage,envData, myAccountPage, }) => {
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
        test("Verify that clicking on my account then clicking the register button directs to register page", async ({ runner, homePage,envData, myAccountPage, }) => {
          await runner.clickOnElement(homePage.navbarItems.myAccount);
          await runner.verifyUrlContains(envData.loginUrl);
          await runner.verifyElementIsVisible(myAccountPage.loginPage.loginPageBreadcrumbText)
          await runner.clickOnElement(myAccountPage.sidebarOptions.register)
          await runner.verifyUrlContains(envData.registerUrl);
          await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageBreadcrumbText);
          await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageHeader);
          await runner.verifyToHaveExactText(myAccountPage.registerPage.registerPageHeader, registerData.registerFormHeader);
        }); // This closing brace ends the 'test' function.
        test("Verify the warning message without all the fields provided ", async ({ runner, homePage,envData, myAccountPage}) => {
          await runner.mouseHover(homePage.navbarItems.myAccount);
          await runner.clickOnElement(homePage.navbarItems.myAccountRegister);
          await runner.verifyUrlContains(envData.registerUrl);
          await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageBreadcrumbText);
          await runner.verifyElementIsVisible(myAccountPage.registerPage.registerPageHeader);
          await runner.verifyToHaveExactText(myAccountPage.registerPage.registerPageHeader, registerData.registerFormHeader);
          await runner.clickOnElement(myAccountPage.registerPage.continueButton)
          await runner.verifyElementIsVisible(myAccountPage.registerPage.warningTextToAgreePolicy)
          await runner.verifyToHaveExactText(myAccountPage.registerPage.warningTextToAgreePolicy,registerData.warningTextToAgreePolicy)



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
      

    }); // <--- THIS IS THE CRUCIAL CLOSING BRACE for the test.describe's function.
  } // This closes the 'runTest' method.
} // This closes the 'registerTest' class.

new registerTest().runTest();
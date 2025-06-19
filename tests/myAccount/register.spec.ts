import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import registerData from "../../testData/register.json";
import homeData from "../../testData/home.json";

// message: after complete the header, we will work on homepage functionality

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

    }); // <--- THIS IS THE CRUCIAL CLOSING BRACE for the test.describe's function.
  } // This closes the 'runTest' method.
} // This closes the 'registerTest' class.

new registerTest().runTest();
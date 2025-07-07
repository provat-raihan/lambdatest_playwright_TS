import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import myAccountData from "../../testData/myAccount.json";
import productCompareData from "../../testData/productsCompare.json";

class HeaderActionsTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Validation of Compare, Wishlist and Cart button's navigation in header", () => {
      test.beforeEach(async ({ homePageNavigationHelper }) => {
        await homePageNavigationHelper.navigateToHomePage();
      });

      test("Verify clicking on compare button navigates to the compare products page and no products to compare message should visible", async ({
        runner,
        envData,
        homePage,
        productComparePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.compareButton);
        await runner.clickOnElement(homePage.compareButton);
        await runner.verifyUrlContains(envData.productCompareUrl);
        await runner.verifyElementIsVisible(productComparePage.breadcrumbText);
        await runner.verifyContainText(
          productComparePage.breadcrumbText,
          productCompareData.expectedBreadCrumbText
        );
        await runner.verifyElementIsVisible(productComparePage.header);
        await runner.verifyContainText(
          productComparePage.header,
          productCompareData.expectedHeaderText
        );
        await runner.verifyElementIsVisible(
          productComparePage.noProductToCompareMessage
        );
        await runner.verifyContainText(
          productComparePage.noProductToCompareMessage,
          productCompareData.noProductToCompareText
        );
        await runner.verifyElementIsVisible(productComparePage.continueButton);
        await runner.verifyElementIsEnabled(productComparePage.continueButton);
        await runner.clickOnElement(productComparePage.continueButton);
        await runner.verifyUrlContains(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.headerLogo);
      });

      test("Verify clicking on wishlist button requires login to navigate to the wishlist page", async ({
        runner,
        homePage,
        envData,
        myAccountPage,
      }) => {
        await runner.verifyElementIsVisible(homePage.wishlistButton);
        await runner.clickOnElement(homePage.wishlistButton);
        await runner.verifyUrlContains(envData.loginUrl);
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageHeader
        );
      });

      test("Verify clicking on cart button opens a modal and cart empty message should be shown", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.cartButton);
        await runner.clickOnElement(homePage.cartButton);
        await runner.verifyElementIsVisible(homePage.cartModal.header);
        await runner.verifyContainText(
          homePage.cartModal.header,
          homeData.header.cartModalItems.headerText
        );
        await runner.verifyElementIsVisible(
          homePage.cartModal.emptyMessageText
        );
        await runner.verifyContainText(
          homePage.cartModal.emptyMessageText,
          homeData.header.cartModalItems.emptyMessageText
        );
        await runner.clickOnElement(homePage.cartModal.crossButton);
      });
    });
  }
}

new HeaderActionsTest().runTest();

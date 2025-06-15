import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import globalData from "../../testData/global.json";
import blogData from "../../testData/blog.json";

class HeaderTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Header functionality test", () => {
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

      // Done
      test("Verify that navbar items visible properly and contain expected links", async ({
        runner,
        homePage,
      }) => {
        // Shop by category
        await runner.verifyElementIsVisible(
          homePage.navbarItems.shopByCategory
        );
        await runner.validateAttribute(
          homePage.navbarItems.shopByCategory,
          "href",
          homeData.header.navbarItemsHrefValues.shopByCategory
        );
        await runner.verifyContainText(
          homePage.navbarItems.shopByCategory,
          homeData.header.navbarItemsText.shopByCategory
        );

        // Home
        await runner.verifyElementIsVisible(homePage.navbarItems.home);
        await runner.validateAttribute(
          homePage.navbarItems.home,
          "href",
          homeData.header.navbarItemsHrefValues.home
        );
        await runner.verifyContainText(
          homePage.navbarItems.home,
          homeData.header.navbarItemsText.home
        );

        // Special Hot
        await runner.verifyElementIsVisible(homePage.navbarItems.specialHot);
        await runner.validateAttribute(
          homePage.navbarItems.specialHot,
          "href",
          homeData.header.navbarItemsHrefValues.specialHot
        );
        await runner.verifyContainText(
          homePage.navbarItems.specialHot,
          homeData.header.navbarItemsText.specialHot
        );

        // Blog
        await runner.verifyElementIsVisible(homePage.navbarItems.blog);
        await runner.validateAttribute(
          homePage.navbarItems.blog,
          "href",
          homeData.header.navbarItemsHrefValues.blog
        );
        await runner.verifyContainText(
          homePage.navbarItems.blog,
          homeData.header.navbarItemsText.blog
        );

        // Mega Menu
        await runner.verifyElementIsVisible(homePage.navbarItems.megaMenu);
        await runner.validateAttribute(
          homePage.navbarItems.megaMenu,
          "href",
          homeData.header.navbarItemsHrefValues.megaMenu
        );
        await runner.verifyContainText(
          homePage.navbarItems.megaMenu,
          homeData.header.navbarItemsText.megaMenu
        );

        // AddOns Featured
        await runner.verifyElementIsVisible(
          homePage.navbarItems.addOnsFeatured
        );
        await runner.verifyContainText(
          homePage.navbarItems.addOnsFeatured,
          homeData.header.navbarItemsText.addOnsFeatured
        );

        // My Account
        await runner.verifyElementIsVisible(homePage.navbarItems.myAccount);
        await runner.validateAttribute(
          homePage.navbarItems.myAccount,
          "href",
          homeData.header.navbarItemsHrefValues.myAccount
        );
        await runner.verifyContainText(
          homePage.navbarItems.myAccount,
          homeData.header.navbarItemsText.myAccount
        );
      });

      // Done
      test("Verify that clicking on shop by category opens modal and contains expected items", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(
          homePage.navbarItems.shopByCategory
        );
        await runner.clickOnElement(homePage.navbarItems.shopByCategory);
        await runner.verifyElementIsVisible(
          homePage.shopByCategoryModalItems.headerText
        );
        await runner.verifyContainText(
          homePage.shopByCategoryModalItems.headerText,
          homeData.header.shopByCategoryModalTexts.header
        );

        await runner.verifyElementIsVisible(
          homePage.shopByCategoryModalItems.itemList
        );

        await runner.verifyMultipleTexts(
          homePage.shopByCategoryModalItems.itemList,
          [
            homeData.header.shopByCategoryModalTexts.components,
            homeData.header.shopByCategoryModalTexts.cameras,
            homeData.header.shopByCategoryModalTexts.phonesTabletAndIpod,
            homeData.header.shopByCategoryModalTexts.software,
            homeData.header.shopByCategoryModalTexts.mp3Players,
            homeData.header.shopByCategoryModalTexts.laptopsAndNotebooks,
            homeData.header.shopByCategoryModalTexts.desktopsAndMonitors,
            homeData.header.shopByCategoryModalTexts.printersAndScanners,
            homeData.header.shopByCategoryModalTexts.miceAndTrackballs,
            homeData.header.shopByCategoryModalTexts.fashionAndAccessories,
            homeData.header.shopByCategoryModalTexts.beautyAndSaloon,
            homeData.header.shopByCategoryModalTexts.autopartsAndAccessories,
            homeData.header.shopByCategoryModalTexts.washingMachine,
            homeData.header.shopByCategoryModalTexts.gamingConsoles,
            homeData.header.shopByCategoryModalTexts.airConditioner,
            homeData.header.shopByCategoryModalTexts.webCameras,
          ]
        );
      });

      // Working
      test("Verify that clicking on navbar's items navigates to expected pages", async ({
        runner,
        envData,
        homePage,
        specialOfferPage,
        blogPage,
      }) => {
        // Home -> Should navigate to home page
        await runner.verifyElementIsVisible(homePage.navbarItems.home);
        await runner.clickOnElement(homePage.navbarItems.home);
        await runner.verifyUrlContains(envData.homeUrl);
        await runner.verifyElementIsVisible(homePage.headerLogo);

        // Special Hot -> Should navigate to Special Offers page
        await runner.verifyElementIsVisible(homePage.navbarItems.specialHot);
        await runner.clickOnElement(homePage.navbarItems.specialHot);
        await runner.verifyUrlContains(envData.specialOfferUrl);
        await runner.verifyElementIsVisible(homePage.headerLogo);
        await runner.verifyElementIsVisible(specialOfferPage.headerText);
        await runner.verifyContainText(
          specialOfferPage.headerText,
          globalData.specialOfferText
        );

        // Blog -> Should navigate to blog page
        await runner.verifyElementIsVisible(homePage.navbarItems.blog);
        await runner.clickOnElement(homePage.navbarItems.blog);
        await runner.verifyUrlContains(envData.blogUrl);
        await runner.verifyElementIsVisible(homePage.headerLogo);
        await runner.verifyElementIsVisible(blogPage.latestArticleHeader);
        await runner.verifyContainText(
          blogPage.latestArticleHeader,
          blogData.latestArticleHeaderText
        );
        await runner.verifyElementIsVisible(blogPage.mostViewedHeader);
        await runner.verifyContainText(
          blogPage.mostViewedHeader,
          blogData.mostViewedHeaderText
        );

        // Mega Menu -> Should navigate to Mega Menu page (It navigates to about us page in website but it should be Mega Menu page)
        // AddOns is not clickable, so we skip it

        // todo: Keep the login elements organized
        // My Account -> Should navigate to the Login page
        await runner.verifyElementIsVisible(homePage.navbarItems.myAccount);
        await runner.clickOnElement(homePage.navbarItems.myAccount);
        await runner.verifyUrlContains(envData.loginUrl);
        await runner.verifyElementIsVisible(homePage.headerLogo);
      });
    }); // End of describe block
  }
}

new HeaderTest().runTest();

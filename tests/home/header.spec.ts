import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import { NavbarKeys } from "../../constants/navbarKeys";
import globalData from "../../testData/global.json";
import blogData from "../../testData/blog.json";
import myAccountData from "../../testData/myAccount.json";

const navbarKeys = new NavbarKeys();

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
      });

      // Done
      test("Verify that header logo renders correctly", async ({
        runner,
        homePage,
      }) => {
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

      // Done -> An example of data driven testing technique
      test("Verify navbar items are visible and contain expected links and texts", async ({
        runner,
        homePage,
      }) => {
        const navbarItems = [
          {
            key: navbarKeys.shopByCategory,
            locator: homePage.navbarItems.shopByCategory,
          },
          {
            key: navbarKeys.home,
            locator: homePage.navbarItems.home,
          },
          {
            key: navbarKeys.specialHot,
            locator: homePage.navbarItems.specialHot,
          },
          {
            key: navbarKeys.blog,
            locator: homePage.navbarItems.blog,
          },
          {
            key: navbarKeys.megaMenu,
            locator: homePage.navbarItems.megaMenu,
          },
          {
            key: navbarKeys.addOnsFeatured,
            locator: homePage.navbarItems.addOnsFeatured,
            hasHref: false,
          },
          {
            key: navbarKeys.myAccount,
            locator: homePage.navbarItems.myAccount,
          },
        ];

        for (const item of navbarItems) {
          await runner.verifyElementIsVisible(item.locator);

          if (item.hasHref !== false) {
            await runner.validateAttribute(
              item.locator,
              "href",
              homeData.header.navbarItemsHrefValues[item.key]
            );
          }

          await runner.verifyToHaveExactText(
            item.locator,
            homeData.header.navbarItemsText[item.key]
          );
        }
      });

      // Done
      // Message: Using test.step inside test function for better reporting and debugging (For checking only)
      test("Should display a modal when 'Shop by Category' is clicked", async ({
        runner,
        homePage,
      }) => {
        await test.step("Open modal by clicking 'Shop by Category'", async () => {
          await runner.verifyElementIsVisible(
            homePage.navbarItems.shopByCategory
          );
          await runner.clickOnElement(homePage.navbarItems.shopByCategory);
        });

        await test.step("Verify modal header is correct", async () => {
          await runner.verifyElementIsVisible(
            homePage.shopByCategoryModalItems.headerText
          );
          await runner.verifyToHaveExactText(
            homePage.shopByCategoryModalItems.headerText,
            homeData.header.shopByCategoryModalHeaderText
          );
        });

        await test.step("Verify modal item list contains expected items", async () => {
          await runner.verifyMultipleTexts(
            homePage.shopByCategoryModalItems.itemList,
            Object.values(homeData.header.shopByCategoryModalTexts).filter(
              (item, i) => item
            )
          );
        });
      });

      // Done: API response checking
      test("Verify each 'Shop by Category' modal link returns a 200 OK response", async ({
        runner,
        envData,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(
          homePage.navbarItems.shopByCategory
        );
        await runner.clickOnElement(homePage.navbarItems.shopByCategory);
        await runner.verifyElementIsVisible(
          homePage.shopByCategoryModalItems.headerText
        );
        await runner.verifyToHaveExactText(
          homePage.shopByCategoryModalItems.headerText,
          homeData.header.shopByCategoryModalHeaderText
        );

        await runner.validateMultipleUrlStatuses(
          homePage.shopByCategoryModalItems.itemList
        );
      });

      // Done
      test("Verify that clicking on navbar's items navigates to expected pages", async ({
        runner,
        envData,
        homePage,
        specialOfferPage,
        blogPage,
        myAccountPage,
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
        await runner.verifyToHaveExactText(
          specialOfferPage.headerText,
          globalData.specialOfferText
        );

        // Blog -> Should navigate to blog page
        await runner.verifyElementIsVisible(homePage.navbarItems.blog);
        await runner.clickOnElement(homePage.navbarItems.blog);
        await runner.verifyUrlContains(envData.blogUrl);
        await runner.verifyElementIsVisible(homePage.headerLogo);
        await runner.verifyElementIsVisible(blogPage.latestArticleHeader);
        await runner.verifyToHaveExactText(
          blogPage.latestArticleHeader,
          blogData.latestArticleHeaderText
        );
        await runner.verifyElementIsVisible(blogPage.mostViewedHeader);
        await runner.verifyToHaveExactText(
          blogPage.mostViewedHeader,
          blogData.mostViewedHeaderText
        );

        // Mega Menu -> Should navigate to Mega Menu page (It navigates to about us page in website but it should be Mega Menu page)
        // AddOns is not clickable, so we skip it

        // My Account -> Should navigate to the Login page
        await runner.verifyElementIsVisible(homePage.navbarItems.myAccount);
        await runner.clickOnElement(homePage.navbarItems.myAccount);
        await runner.verifyUrlContains(envData.loginUrl);
        await runner.verifyElementIsVisible(homePage.headerLogo);
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageHeader
        );
        await runner.verifyToHaveExactText(
          myAccountPage.loginPage.loginPageHeader,
          myAccountData.login.loginFormHeader
        );
      });

      // Done: warning: API response is slow
      test("Verify that hovering over 'Mega Menu' on navbar displays a dropdown and all dropdown links return a 200 OK response", async ({
        runner,
        homePage,
        page,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarItems.megaMenu);
        await runner.mouseHover(homePage.navbarItems.megaMenu);
        await runner.verifyElementIsVisible(homePage.megaMenuItems.container);

        await runner.validateMultipleUrlStatuses(homePage.megaMenuItems.links);
      });

      test("Verify that hovering over 'AddOns Featured' on navbar displays a dropdown and all dropdown links return a 200 OK response", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(
          homePage.navbarItems.addOnsFeatured
        );
        await runner.mouseHover(homePage.navbarItems.addOnsFeatured);
        await runner.validateMultipleUrlStatuses(homePage.addOnItems.links);
      });
    }); // End of describe block
  }
}

new HeaderTest().runTest();

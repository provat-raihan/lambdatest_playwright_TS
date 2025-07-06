import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import { NavbarKeys } from "../../constants/navbarKeys";
import specialOfferData from "../../testData/specialOffer.json";
import blogData from "../../testData/blog.json";
import myAccountData from "../../testData/myAccount.json";

const navbarKeys = new NavbarKeys();

class NavbarTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Validation of navbar functionality", () => {
      test.beforeEach(async ({ homePageNavigationHelper }) => {
        await homePageNavigationHelper.navigateToHomePage();
      });

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
              (item) => item
            )
          );
        });
      });

      test("Verify each 'Shop by Category' modal link returns a 200 OK response", async ({
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
        await runner.verifyToHaveExactText(
          homePage.shopByCategoryModalItems.headerText,
          homeData.header.shopByCategoryModalHeaderText
        );

        await runner.validateMultipleUrlStatuses(
          homePage.shopByCategoryModalItems.itemList
        );
      });

      test("Verify that clicking on navbar's items navigates to expected pages", async ({
        runner,
        envData,
        homePage,
        specialOfferPage,
        blogPage,
        myAccountPage,
        navbarNavigationHelper,
      }) => {
        await test.step("Home → Should navigate to Home page", async () => {
          await runner.verifyElementIsVisible(homePage.navbarItems.home);
          await runner.clickOnElement(homePage.navbarItems.home);
          await runner.verifyUrlContains(envData.homeUrl);
          await runner.verifyElementIsVisible(homePage.headerLogo);
        });

        await test.step("Special Hot → Should navigate to Special Offers page", async () => {
          await navbarNavigationHelper.verifyNavigation({
            navbarLocator: homePage.navbarItems.specialHot,
            expectedUrl: envData.specialOfferUrl,
            headerLogoLocator: homePage.headerLogo,
            breadcrumbLocator: specialOfferPage.breadcrumbText,
            expectedBreadcrumbText: specialOfferData.specialOfferBreadcrumbText,
            headerTextLocator: specialOfferPage.headerText,
            expectedHeaderText: specialOfferData.specialOfferHeaderText,
            stepDescription: "Special Offers Navigation",
          });
        });

        await test.step("Blog → Should navigate to Blog page", async () => {
          await navbarNavigationHelper.verifyNavigation({
            navbarLocator: homePage.navbarItems.blog,
            expectedUrl: envData.blogUrl,
            headerLogoLocator: homePage.headerLogo,
            breadcrumbLocator: blogPage.latestArticleHeader,
            expectedBreadcrumbText: blogData.latestArticleHeaderText,
            headerTextLocator: blogPage.mostViewedHeader,
            expectedHeaderText: blogData.mostViewedHeaderText,
            stepDescription: "Blog Navigation",
          });
        });

        await test.step("My Account → Should navigate to Login page", async () => {
          await navbarNavigationHelper.verifyNavigation({
            navbarLocator: homePage.navbarItems.myAccount,
            expectedUrl: envData.loginUrl,
            headerLogoLocator: homePage.headerLogo,
            breadcrumbLocator: myAccountPage.loginPage.loginPageBreadcrumbText,
            expectedBreadcrumbText: myAccountData.login.loginBreadcrumbText,
            headerTextLocator: myAccountPage.loginPage.loginPageHeader,
            expectedHeaderText: myAccountData.login.loginFormHeader,
            stepDescription: "Login Navigation",
          });
        });

        await test.step("Mega Menu → Skipped (navigates to incorrect page)", async () => {
          test.info().annotations.push({
            type: "skip",
            description:
              "Mega Menu currently routes to About Us page. Expected: Mega Menu page.",
          });
        });
      });

      test("Verify that hovering over 'Mega Menu' on navbar displays a dropdown and all dropdown links return a 200 OK response", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarItems.megaMenu);
        await runner.mouseHover(homePage.navbarItems.megaMenu);
        await runner.verifyElementsIsExist(homePage.megaMenuItems.links);
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
        await runner.verifyElementsIsExist(homePage.addOnItems.links);
        await runner.validateMultipleUrlStatuses(homePage.addOnItems.links);
      });

      test("Verify that hovering over 'My account' on navbar displays a dropdown and all dropdown links return a 200 OK response", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarItems.myAccount);
        await runner.mouseHover(homePage.navbarItems.myAccount);
        await runner.verifyElementsIsExist(homePage.myAccountItems.links);
        await runner.validateMultipleUrlStatuses(homePage.myAccountItems.links);
      });
    });
  }
}

new NavbarTest().runTest();

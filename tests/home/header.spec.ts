import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import { NavbarKeys } from "../../constants/navbarKeys";
import specialOfferData from "../../testData/specialOffer.json";
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

      test.describe("Navbar tests", () => {
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
          await test.step("Home → Should navigate to Home page", async () => {
            await runner.verifyElementIsVisible(homePage.navbarItems.home);
            await runner.clickOnElement(homePage.navbarItems.home);
            await runner.verifyUrlContains(envData.homeUrl);
            await runner.verifyElementIsVisible(homePage.headerLogo);
          });

          await test.step("Special Hot → Should navigate to Special Offers page", async () => {
            await runner.verifyElementIsVisible(
              homePage.navbarItems.specialHot
            );
            await runner.clickOnElement(homePage.navbarItems.specialHot);
            await runner.verifyUrlContains(envData.specialOfferUrl);
            await runner.verifyElementIsVisible(homePage.headerLogo);
            await runner.verifyElementIsVisible(
              specialOfferPage.breadcrumbText
            );
            await runner.verifyContainText(
              specialOfferPage.breadcrumbText,
              specialOfferData.specialOfferBreadcrumbText
            );
            await runner.verifyElementIsVisible(specialOfferPage.headerText);
            await runner.verifyToHaveExactText(
              specialOfferPage.headerText,
              specialOfferData.specialOfferHeaderText
            );
          });

          await test.step("Blog → Should navigate to Blog page", async () => {
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
          });

          await test.step("My Account → Should navigate to Login page", async () => {
            await runner.verifyElementIsVisible(homePage.navbarItems.myAccount);
            await runner.clickOnElement(homePage.navbarItems.myAccount);
            await runner.verifyUrlContains(envData.loginUrl);
            await runner.verifyElementIsVisible(homePage.headerLogo);
            await runner.verifyElementIsVisible(
              myAccountPage.loginPage.loginPageBreadcrumbText
            );
            await runner.verifyContainText(
              myAccountPage.loginPage.loginPageBreadcrumbText,
              myAccountData.login.loginBreadcrumbText
            );
            await runner.verifyElementIsVisible(
              myAccountPage.loginPage.loginPageHeader
            );
            await runner.verifyToHaveExactText(
              myAccountPage.loginPage.loginPageHeader,
              myAccountData.login.loginFormHeader
            );
          });

          await test.step("Mega Menu → Skipped (navigates to incorrect page)", async () => {
            test.info().annotations.push({
              type: "skip",
              description:
                "Mega Menu currently routes to About Us page. Expected: Mega Menu page.",
            });
          });

          // AddOns is not clickable; no step needed unless you want to document it
        });

        // Done
        test("Verify that hovering over 'Mega Menu' on navbar displays a dropdown and all dropdown links return a 200 OK response", async ({
          runner,
          homePage,
        }) => {
          await runner.verifyElementIsVisible(homePage.navbarItems.megaMenu);
          await runner.mouseHover(homePage.navbarItems.megaMenu);
          await runner.verifyElementsIsExist(homePage.megaMenuItems.links);
          await runner.validateMultipleUrlStatuses(
            homePage.megaMenuItems.links
          );
        });

        // Done
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

        // Done
        test("Verify that hovering over 'My account' on navbar displays a dropdown and all dropdown links return a 200 OK response", async ({
          runner,
          homePage,
        }) => {
          await runner.verifyElementIsVisible(homePage.navbarItems.myAccount);
          await runner.mouseHover(homePage.navbarItems.myAccount);
          await runner.verifyElementsIsExist(homePage.myAccountItems.links);
          await runner.validateMultipleUrlStatuses(
            homePage.myAccountItems.links
          );
        });
      }); // End of navbar test describe block

      test.describe("Search bar tests", () => {
        test("Verify that clicking on 'All Categories' should open a dropdown", async ({
          runner,
          homePage,
        }) => {
          await runner.verifyElementIsVisible(
            homePage.searchBar.allCategoriesDropdownButton
          );
          await runner.clickOnElement(
            homePage.searchBar.allCategoriesDropdownButton
          );
          await runner.verifyElementIsVisible(
            homePage.searchBar.dropdownContainer
          );
          await runner.verifyElementsIsExist(
            homePage.searchBar.allCategoriesLinks
          );
        });

        test("Verify that user can select each link with mouse and keyboard navigation", async ({
          runner,
          page,
          homePage,
        }) => {
          const categoryOptions = [
            homeData.header.searchBar.allCategoriesText.allCategories,
            homeData.header.searchBar.allCategoriesText.desktops,
            homeData.header.searchBar.allCategoriesText.laptops,
            homeData.header.searchBar.allCategoriesText.components,
            homeData.header.searchBar.allCategoriesText.tables,
            homeData.header.searchBar.allCategoriesText.software,
            homeData.header.searchBar.allCategoriesText.phonesAndPdas,
            homeData.header.searchBar.allCategoriesText.cameras,
            homeData.header.searchBar.allCategoriesText.mp3Players,
          ];

          for (const category of categoryOptions) {
            // Message: normal selection
            await runner.verifyElementIsVisible(
              homePage.searchBar.allCategoriesDropdownButton
            );
            await runner.clickOnElement(
              homePage.searchBar.allCategoriesDropdownButton
            );
            const categoryLink = homePage.searchBar.allCategoriesLinks.filter({
              hasText: category,
            });
            await runner.verifyElementIsVisible(categoryLink);
            await runner.clickOnElement(categoryLink);

            const escapedCategory = await runner.escapeRegExp(category);
            const updatedButton = page.getByRole("button", {
              name: new RegExp(`${escapedCategory}.*`, "i"), // i means 'case-insensitive here' and '.*' means any char after category
            });
            await runner.verifyElementIsVisible(updatedButton);
            await runner.verifyContainText(updatedButton, category);

            // message: keyboard selection
            await runner.clickOnElement(
              homePage.searchBar.allCategoriesDropdownButton
            );
            const options = homePage.searchBar.allCategoriesLinks;
            const count = await options.count();

            for (let i = 0; i < count; i++) {
              const currentOption = options.nth(i);
              const text = (await currentOption.innerText()).trim();

              if (text === category) {
                await runner.focusOnElement(currentOption);
                await runner.keyboardEnterPress();
                break;
              }
            }

            const updatedButtonKeyboard = page.getByRole("button", {
              name: new RegExp(`${escapedCategory}.*`, "i"),
            });
            await runner.verifyElementIsVisible(updatedButtonKeyboard);
            await runner.verifyContainText(updatedButtonKeyboard, category);
          }
        });

        test("Verify that the search input field is enabled and user can type anything into it", async ({
          runner,
          homePage,
        }) => {
          await runner.verifyElementIsVisible(homePage.searchBar.inputField);
          await runner.verifyElementIsEnabled(homePage.searchBar.inputField);
          await runner.validateAttribute(
            homePage.searchBar.inputField,
            "placeholder",
            homeData.header.searchBar.placeholderText
          );
          await runner.fillInputBox(homePage.searchBar.inputField, "anything");
        });

        // Working
        test("Match exact value", async ({ searchHelper }) => {
          // Message: search helper is working fine
          const value = "iPhone";
          await searchHelper.search(
            value,
            `https://ecommerce-playground.lambdatest.io/index.php?route=product%2Fsearch&search=${value}`,
            `Search - ${value}`
          );
        });
      }); // End of search bar test describe block
    }); // End of describe block
  }
}

new HeaderTest().runTest();

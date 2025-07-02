import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import { NavbarKeys } from "../../constants/navbarKeys";
import specialOfferData from "../../testData/specialOffer.json";
import blogData from "../../testData/blog.json";
import myAccountData from "../../testData/myAccount.json";
import searchResultData from "../../testData/searchResult.json";
import { NavigationHelper } from "../../utilities/helper/navigationHelper";

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

        test("Verify that clicking on navbar's items navigates to expected pages", async ({
          page,
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

          const navigationHelper = new NavigationHelper(page);

          await test.step("Special Hot → Should navigate to Special Offers page", async () => {
            await navigationHelper.verifyNavigation({
              navbarLocator: homePage.navbarItems.specialHot,
              expectedUrl: envData.specialOfferUrl,
              headerLogoLocator: homePage.headerLogo,
              breadcrumbLocator: specialOfferPage.breadcrumbText,
              expectedBreadcrumbText:
                specialOfferData.specialOfferBreadcrumbText,
              headerTextLocator: specialOfferPage.headerText,
              expectedHeaderText: specialOfferData.specialOfferHeaderText,
              stepDescription: "Special Offers Navigation",
            });
          });

          await test.step("Blog → Should navigate to Blog page", async () => {
            await navigationHelper.verifyNavigation({
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
            await navigationHelper.verifyNavigation({
              navbarLocator: homePage.navbarItems.myAccount,
              expectedUrl: envData.loginUrl,
              headerLogoLocator: homePage.headerLogo,
              breadcrumbLocator:
                myAccountPage.loginPage.loginPageBreadcrumbText,
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
          await runner.validateMultipleUrlStatuses(
            homePage.megaMenuItems.links
          );
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
          await runner.validateMultipleUrlStatuses(
            homePage.myAccountItems.links
          );
        });
      }); // End of navbar test describe block

      test.describe("Search bar tests", () => {
        test("Verify that 'All Categories' are the default category and clicking on 'All Categories' should open a dropdown", async ({
          runner,
          homePage,
        }) => {
          await runner.verifyElementIsVisible(
            homePage.searchBar.allCategoriesDropdownButton
          );
          await runner.verifyContainText(
            homePage.searchBar.allCategoriesDropdownButton,
            homeData.header.searchBar.allCategoriesText.allCategories
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

        test("Verify that user can select each dropdown element", async ({
          runner,
          page,
          homePage,
        }) => {
          const categoryOptions = [
            homeData.header.searchBar.allCategoriesText.allCategories,
            homeData.header.searchBar.allCategoriesText.desktops,
            homeData.header.searchBar.allCategoriesText.laptops,
            homeData.header.searchBar.allCategoriesText.components,
            homeData.header.searchBar.allCategoriesText.tablets,
            homeData.header.searchBar.allCategoriesText.software,
            homeData.header.searchBar.allCategoriesText.phonesAndPDAs,
            homeData.header.searchBar.allCategoriesText.cameras,
            homeData.header.searchBar.allCategoriesText.mp3Players,
          ];

          for (const category of categoryOptions) {
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
              name: new RegExp(`${escapedCategory}.*`, "i"),
            });
            await runner.verifyElementIsVisible(updatedButton);
            await runner.verifyContainText(updatedButton, category);
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
        test("Verify empty search navigates to search results page and displays all products for each category", async ({
          runner,
          homePage,
          envData,
          products,
          searchHelper,
        }) => {
          const value =
            searchResultData.searchResultProducts.valueEmptyResults.value;
          const expectedTexts =
            searchResultData.searchResultProducts.valueEmptyResults
              .expectedTextsOfPaginationOne;
          const expectedHeader = searchResultData.searchResultPageHeaderText;
          const expectedUrl = envData.searchResultUrl + value;

          const categoryLabels = homeData.header.searchBar.allCategoriesText;

          const categories = [
            { name: "All Categories", label: categoryLabels.allCategories },
            { name: "Desktops", label: categoryLabels.desktops },
            { name: "Laptops", label: categoryLabels.laptops },
            { name: "Components", label: categoryLabels.components },
            { name: "Tablets", label: categoryLabels.tablets },
            { name: "Software", label: categoryLabels.software },
            { name: "Phones & PDAs", label: categoryLabels.phonesAndPDAs },
            { name: "Cameras", label: categoryLabels.cameras },
            { name: "MP3 Players", label: categoryLabels.mp3Players },
          ];

          for (const category of categories) {
            await test.step(`🔎 Search for "${value}" in "${category.name}"`, async () => {
              if (category.name === "All Categories") {
                await runner.verifyElementIsVisible(
                  homePage.searchBar.allCategoriesDropdownButton
                );
                await runner.verifyContainText(
                  homePage.searchBar.allCategoriesDropdownButton,
                  category.label
                );

                await searchHelper.search(value, expectedUrl, expectedHeader);
              } else {
                await searchHelper.searchWithCategory(
                  category.label,
                  value,
                  expectedUrl,
                  expectedHeader
                );
              }

              await runner.verifyElementsIsExist(products.productTitles);
              await runner.assertExpectedTextsInLocator(
                products.productTitles,
                expectedTexts,
                15
              );

              await runner.navigateTo(envData.baseUrl);
            });
          }
        });

        test("Verify valid search 'ipod' returns relevant results", async ({
          runner,
          envData,
          searchHelper,
          products,
        }) => {
          const value =
            searchResultData.searchResultProducts.validResultSearchOne.value;
          const expectedTexts =
            searchResultData.searchResultProducts.validResultSearchOne
              .expectedTextsOfPaginationOne;
          const expectedHeader =
            searchResultData.searchResultPageHeaderText + value;
          const expectedUrl = envData.searchResultUrl + value;

          await test.step(`🔎 Search for "${value}"`, async () => {
            await searchHelper.search(value, expectedUrl, expectedHeader);
            await runner.verifyElementsIsExist(products.productTitles);

            const count = await products.productTitles.count();

            await runner.assertExpectedTextsInLocator(
              products.productTitles,
              expectedTexts,
              count
            );
          });
        });

        test("Verify valid search 'iphone' return relevant results", async ({
          runner,
          envData,
          searchHelper,
          products,
        }) => {
          const value =
            searchResultData.searchResultProducts.validResultSearchTwo.value;
          const expectedTexts =
            searchResultData.searchResultProducts.validResultSearchTwo
              .expectedTextsOfPaginationOne;
          const expectedHeader =
            searchResultData.searchResultPageHeaderText + value;
          const expectedUrl = envData.searchResultUrl + value;

          await test.step(`🔎 Search for "${value}"`, async () => {
            await searchHelper.search(value, expectedUrl, expectedHeader);
            await runner.verifyElementsIsExist(products.productTitles);

            const count = await products.productTitles.count();

            await runner.assertExpectedTextsInLocator(
              products.productTitles,
              expectedTexts,
              count
            );
          });
        });

        test("Verify valid search 'macbook' returns relevant results", async ({
          runner,
          envData,
          searchHelper,
          products,
        }) => {
          const value =
            searchResultData.searchResultProducts.validResultSearchThree.value;

          const expectedTexts =
            searchResultData.searchResultProducts.validResultSearchThree
              .expectedTextsOfPaginationOne;

          const expectedHeader =
            searchResultData.searchResultPageHeaderText + value;

          const expectedUrl = envData.searchResultUrl + value;

          await test.step(`🔎 Search for "${value}"`, async () => {
            await searchHelper.search(value, expectedUrl, expectedHeader);
            await runner.verifyElementsIsExist(products.productTitles);

            const count = await products.productTitles.count();

            await runner.assertExpectedTextsInLocator(
              products.productTitles,
              expectedTexts,
              count
            );
          });
        });
      }); // End of search bar test describe block
    }); // end of main describe block
  }
}

new HeaderTest().runTest();

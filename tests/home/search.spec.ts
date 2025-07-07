import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import searchResultData from "../../testData/searchResult.json";
import productDetailsData from "../../testData/productDetails.json";

class SearchbarTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Validation of search bar functionality", () => {
      test.beforeEach(async ({ homePageNavigationHelper }) => {
        await homePageNavigationHelper.navigateToHomePage();
      });

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
          const updatedButton =
            homePage.getAllCategoriesDropdownButtonWithText(category);
          await runner.verifyElementIsVisible(updatedButton);
          await runner.verifyContainText(updatedButton, category);
        }
      });

      test("Verify that the search box accepts input from the user.", async ({
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
        await runner.fillInputBox(
          homePage.searchBar.inputField,
          homeData.header.searchBar.userAcceptValue
        );
        await runner.verifyToHaveValue(
          homePage.searchBar.inputField,
          homeData.header.searchBar.userAcceptValue
        );
      });

      // Message: Empty search validation here

      test("Verify that the search results are relevant to the search query.", async ({
        envData,
        searchHelper,
        products,
      }) => {
        const expectedHeader = searchResultData.searchResultPageHeaderText;
        const expectedUrl = envData.searchResultUrl;

        const validValues = searchResultData.searchResultProducts.validValues;

        const searchTerms = [
          validValues.valueIpod,
          validValues.valueIphone,
          validValues.valueMacbook,
        ];

        for (const searchTerm of searchTerms) {
          await test.step(`🔎 Search for "${searchTerm}" and expect relevant results`, async () => {
            await searchHelper.verifySearchResults(
              searchTerm,
              expectedUrl + searchTerm,
              expectedHeader + searchTerm,
              products.productTitles
            );
          });
        }
      });

      test("Displays appropriate message for invalid search terms", async ({
        envData,
        searchHelper,
        products,
      }) => {
        const expectedHeader = searchResultData.searchResultPageHeaderText;
        const expectedUrl = envData.searchResultUrl;
        const { valueComputer, valueLaptop } =
          searchResultData.searchResultProducts.invalidValues;

        for (const value of [valueComputer, valueLaptop]) {
          await test.step(`🔎 Search for "${value}" and expect no results`, async () => {
            await searchHelper.verifySearchResults(
              value,
              expectedUrl + value,
              expectedHeader + value,
              products.productTitles
            );
          });
        }
      });

      test("Verify that the search functionality works correctly when multiple search terms are used", async ({
        envData,
        searchHelper,
        products,
      }) => {
        const { macbookPro, palmTreo } =
          searchResultData.searchResultProducts.multipleTerm;
        const { randomJunk, xyz123abc } =
          searchResultData.searchResultProducts.multipleTerm;

        const expectedHeader = searchResultData.searchResultPageHeaderText;
        const expectedUrl = envData.searchResultUrl;

        const validSearches = [
          {
            value: macbookPro,
            description:
              'Search for "macbook pro" should return relevant results',
          },
          {
            value: palmTreo,
            description:
              'Search for "palm treo" should return relevant results',
          },
        ];

        for (const { value, description } of validSearches) {
          const encoded = value.replace(/\s+/g, "+");
          await test.step(`✅ ${description}`, async () => {
            await searchHelper.verifySearchResults(
              value,
              expectedUrl + encoded,
              expectedHeader + value,
              products.productTitles
            );
          });
        }

        const invalidSearches = [
          {
            value: randomJunk,
            description:
              'Search for "random junk" should show no results message',
          },
          {
            value: xyz123abc,
            description:
              'Search for "xyz 123 abc" should show no results message',
          },
        ];

        for (const { value, description } of invalidSearches) {
          const encoded = value.replace(/\s+/g, "+");
          await test.step(`❌ ${description}`, async () => {
            await searchHelper.verifySearchResults(
              value,
              expectedUrl + encoded,
              expectedHeader + value,
              products.productTitles
            );
          });
        }
      });

      test("Verify while typing on searchbar should have the expected suggestions and user can navigate to that product details page by clicking on that product", async ({
        runner,
        homePage,
        productDetailsPage,
      }) => {
        await runner.verifyElementIsVisible(homePage.searchBar.inputField);
        await runner.fillInputBox(homePage.searchBar.inputField, "ht");
        await runner.verifySearchSuggestionsContain(
          homePage.searchBar.searchResultSuggestionsContainer,
          "ht"
        );
        await runner.clickOnElement(
          homePage.searchBar.searchResultSuggestionsContainer.first()
        );
        await runner.verifyElementIsVisible(productDetailsPage.breadcrumbText);
        await runner.verifyContainText(
          productDetailsPage.breadcrumbText,
          productDetailsData.expectedProductText
        );
        await runner.wait(10, { waitForSelector: productDetailsPage.header });
        await runner.verifyContainText(
          productDetailsPage.header,
          productDetailsData.expectedProductText
        );
      });
    });
  }
}

new SearchbarTest().runTest();

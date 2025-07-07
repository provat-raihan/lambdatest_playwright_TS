import { test as base, Page } from "@playwright/test";
import { Utils } from "./utils";
import { FakeUser } from "./fakeData.ts";
import { EnvData } from "./envData.ts";
import { HomePage } from "../pageObjectModel/home.page.ts";
import { SpecialOfferPage } from "../pageObjectModel/specialOffer.page.ts";
import { BlogPage } from "../pageObjectModel/blog.page.ts";
import { MyAccountPage } from "../pageObjectModel/myAccount.ts";
import { AuthHelper } from "./helper/authHelper.ts";
import { SearchResultPage } from "../pageObjectModel/searchResult.page.ts";
import { SearchHelper } from "./helper/searchHelper.ts";
import { Products } from "../pageObjectModel/products.ts";
import { ProductDetailsPage } from "../pageObjectModel/productDetails.page.ts";
import { ProductComparePage } from "../pageObjectModel/productCompare.page.ts";
import { NavbarNavigationHelper } from "../utilities/helper/navbarNavigationHelper.ts";
import { HomePageNavigationHelper } from "./helper/homepageNavigationHelper.ts";

const test = base.extend<{
  runner: Utils;
  envData: EnvData;
  fakeUser: FakeUser;
  homePage: HomePage;
  specialOfferPage: SpecialOfferPage;
  blogPage: BlogPage;
  myAccountPage: MyAccountPage;
  authHelper: AuthHelper;
  searchResultPage: SearchResultPage;
  searchHelper: SearchHelper;
  products: Products;
  productDetailsPage: ProductDetailsPage;
  productComparePage: ProductComparePage;
  navbarNavigationHelper: NavbarNavigationHelper;
  homePageNavigationHelper: HomePageNavigationHelper;
}>({
  runner: async ({ page }: { page: Page }, use) => {
    const utilsInstance = new Utils(page);
    await use(utilsInstance);
  },

  fakeUser: async ({ page }: { page: Page }, use) => {
    const fakeUserInstance = new FakeUser(page);
    await use(fakeUserInstance);
  },

  envData: async ({ page }: { page: Page }, use) => {
    const envDataInstance = new EnvData(page);
    await use(envDataInstance);
  },

  homePage: async ({ page }: { page: Page }, use) => {
    const homePageInstance = new HomePage(page);
    await use(homePageInstance);
  },

  specialOfferPage: async ({ page }: { page: Page }, use) => {
    const specialOfferPageInstance = new SpecialOfferPage(page);
    await use(specialOfferPageInstance);
  },

  blogPage: async ({ page }: { page: Page }, use) => {
    const blogPageInstance = new BlogPage(page);
    await use(blogPageInstance);
  },

  myAccountPage: async ({ page }: { page: Page }, use) => {
    const myAccountPageInstance = new MyAccountPage(page);
    await use(myAccountPageInstance);
  },

  authHelper: async ({ page }: { page: Page }, use) => {
    const authHelperInstance = new AuthHelper(page);
    await use(authHelperInstance);
  },

  searchResultPage: async ({ page }: { page: Page }, use) => {
    const searchResultPageInstance = new SearchResultPage(page);
    await use(searchResultPageInstance);
  },

  searchHelper: async ({ page }: { page: Page }, use) => {
    const searchHelperInstance = new SearchHelper(page);
    await use(searchHelperInstance);
  },

  products: async ({ page }: { page: Page }, use) => {
    const productsInstance = new Products(page);
    await use(productsInstance);
  },
  productDetailsPage: async ({ page }: { page: Page }, use) => {
    const productDetailsPageInstance = new ProductDetailsPage(page);
    await use(productDetailsPageInstance);
  },
  productComparePage: async ({ page }: { page: Page }, use) => {
    const productComparePageInstance = new ProductComparePage(page);
    await use(productComparePageInstance);
  },
  navbarNavigationHelper: async ({ page }: { page: Page }, use) => {
    const navbarNavigationHelperInstance = new NavbarNavigationHelper(page);
    await use(navbarNavigationHelperInstance);
  },
  homePageNavigationHelper: async ({ page }: { page: Page }, use) => {
    const homePageHelperInstance = new HomePageNavigationHelper(page);
    await use(homePageHelperInstance);
  },
});

export { test };

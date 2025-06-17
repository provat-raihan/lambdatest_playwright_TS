import { test as base, Page } from "@playwright/test";
import { Utils } from "./utils";
import { FakeUser } from "./fakeData.ts";
import { EnvData } from "./envData.ts";
import { HomePage } from "../pageObjectModel/home.page.ts";
import { SpecialOfferPage } from "../pageObjectModel/specialOffer.page.ts";
import { BlogPage } from "../pageObjectModel/blog.page.ts";
import { LoginPage } from "../pageObjectModel/login.page.ts";

const test = base.extend<{
  runner: Utils;
  envData: EnvData;
  fakeUser: FakeUser;
  homePage: HomePage;
  specialOfferPage: SpecialOfferPage;
  blogPage: BlogPage;
  loginPage: LoginPage;
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

  loginPage: async ({ page }: { page: Page }, use) => {
    const loginPageInstance = new LoginPage(page);
    await use(loginPageInstance);
  },
});

export { test };

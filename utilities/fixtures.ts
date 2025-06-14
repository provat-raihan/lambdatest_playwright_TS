import { test as base, Page } from "@playwright/test";
import { Utils } from "./utils";
import { FakeUser } from "./fakeData.ts";
import { EnvData } from "./envData.ts";
import { HomePage } from "../pageObjectModel/home.page.ts";

const test = base.extend<{
  runner: Utils;
  envData: EnvData;
  fakeUser: FakeUser;
  homePage: HomePage;
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
});

export { test };

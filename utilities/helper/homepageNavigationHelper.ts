import { Utils } from "../utils";
import { EnvData } from "../envData";
import { HomePage } from "../../pageObjectModel/home.page";
import homeData from "../../testData/home.json";
import { Page } from "playwright/test";

export class HomePageNavigationHelper {
  private utils: Utils;
  private envData: EnvData;
  private homePage: HomePage;

  constructor(page: Page) {
    this.utils = new Utils(page);
    this.envData = new EnvData(page);
    this.homePage = new HomePage(page);
  }

  async navigateToHomePage() {
    await this.utils.navigateTo(this.envData.baseUrl);
    await this.utils.verifyUrlContains(this.envData.baseUrl);
    await this.utils.verifyElementIsVisible(this.homePage.headerLogo);
    await this.utils.validateAttribute(
      this.homePage.headerLogo,
      "src",
      homeData.header.logoSrc
    );
  }
}

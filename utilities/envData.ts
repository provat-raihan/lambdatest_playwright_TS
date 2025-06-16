import { Page } from "@playwright/test";

export class EnvData {
  readonly baseUrl: string;
  readonly homeUrl: string;
  readonly specialOfferUrl: string;
  readonly blogUrl: string;
  readonly loginUrl: string;
  readonly componentsUrl: string;

  constructor(page: Page) {
    this.baseUrl = `${process.env.BASE_URL}`;
    this.homeUrl = `${process.env.HOME_URL}`;
    this.specialOfferUrl = `${process.env.SPECIAL_OFFERS_URL}`;
    this.blogUrl = `${process.env.BLOG_URL}`;
    this.loginUrl = `${process.env.LOGIN_URL}`;
    this.componentsUrl = `${process.env.COMPONENTS_URL}`;
  }
}

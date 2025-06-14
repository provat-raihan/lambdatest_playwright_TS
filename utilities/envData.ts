import { Page } from "@playwright/test";

export class EnvData {
  readonly baseUrl: string;
  readonly demoUrl: string;

  constructor(page: Page) {
    this.baseUrl = `${process.env.BASE_URL}`;
    this.demoUrl = `${process.env.DEMO_URL}`;
  }
}

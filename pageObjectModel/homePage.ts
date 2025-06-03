import { Page } from "@playwright/test";

export class HomePage {
  readonly homePageLogo: string;
  

  constructor(page: Page) {
    this.homePageLogo = `css=`;
    
  }
}

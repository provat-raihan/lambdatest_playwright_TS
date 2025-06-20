import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly headerLogo: Locator;

  readonly navbarItems: {
    shopByCategory: Locator;
    home: Locator;
    specialHot: Locator;
    blog: Locator;
    megaMenu: Locator;
    addOnsFeatured: Locator;
    myAccount: Locator;
    myAccountLogin: Locator;
    myAccountRegister: Locator;
  };

  readonly shopByCategoryModalItems: {
    headerText: Locator;
    itemList: Locator;
  };

  constructor(page: Page) {
    this.headerLogo = page.locator(`css=div[id='entry_217821'] img`);
    // this.headerLogo = page.getByRole("img", { name: "Poco Electro" });

    this.navbarItems = {
      shopByCategory: page.getByRole("button", { name: "Shop by Category" }),
      home: page.getByRole("link", { name: "Home" }),
      specialHot: page.getByRole("link", { name: "Special Hot", exact: true }),
      blog: page.getByRole("link", { name: "Blog", exact: true }),
      megaMenu: page.getByRole("button", { name: "Mega Menu" }),
      addOnsFeatured: page.getByRole("button", { name: "AddOns Featured" }),
      myAccount: page.getByRole("button", { name: " My account" }),
      myAccountLogin: page.getByRole('link', { name: 'Login' }),
      myAccountRegister: page.getByRole('link', { name: 'Register' }),

    };

    this.shopByCategoryModalItems = {
      headerText: page.getByRole("heading", { name: "Top categories" }),
      itemList: page.locator(`css=[id='widget-navbar-217841'] a[href]`),
    };
  }
}

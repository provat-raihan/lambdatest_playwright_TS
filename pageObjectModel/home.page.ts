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

  readonly megaMenuItems: {
    links: Locator;
  };

  readonly addOnItems: {
    links: Locator;
  };

  readonly myAccountItems: {
    links: Locator;
  };

  readonly searchBar: {
    allCategoryDropdownButton: Locator;
  };

  constructor(page: Page) {
    this.headerLogo = page.locator("#entry_217821 img");

    this.navbarItems = {
      shopByCategory: page.getByRole("button", { name: "Shop by Category" }),
      home: page.getByRole("link", { name: "Home" }),
      specialHot: page
        .locator("#widget-navbar-217834")
        .getByRole("link", { name: "Special Hot" }),
      blog: page.getByRole("link", { name: "Blog", exact: true }),
      megaMenu: page.getByRole("button", { name: "Mega Menu" }),
      addOnsFeatured: page.getByRole("button", { name: "AddOns Featured" }),
      myAccount: page.getByRole("button", { name: " My account" }),
      myAccountLogin: page.getByRole("link", { name: "Login" }),
      myAccountRegister: page.getByRole("link", { name: "Register" }),
    };

    this.shopByCategoryModalItems = {
      headerText: page.getByRole("heading", { name: "Top categories" }),
      itemList: page.locator("#widget-navbar-217841 a[href]"),
    };

    this.megaMenuItems = {
      links: page.locator("#entry281_216475 li a"),
    };

    this.addOnItems = {
      links: page.locator("ul.mz-sub-menu-25.dropdown-menu li a"),
    };

    this.myAccountItems = {
      links: page.locator("ul.mz-sub-menu-96.dropdown-menu a"),
    };

    this.searchBar = {
      allCategoryDropdownButton: page.getByRole("button", {
        name: "All Categories",
      }),
    };
  }
}

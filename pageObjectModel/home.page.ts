import { Page, Locator } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  readonly headerLogo: Locator;
  readonly compareButton: Locator;
  readonly wishlistButton: Locator;

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
    allCategoriesDropdownButton: Locator;
    dropdownContainer: Locator;
    allCategoriesLinks: Locator;
    inputField: Locator;
    button: Locator;
    searchResultSuggestionsContainer: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.headerLogo = page.locator("#entry_217821 img");
    this.compareButton = page.getByRole("link", {
      name: "Compare",
      exact: true,
    });
    this.wishlistButton = page.getByRole("link", {
      name: "Wishlist",
      exact: true,
    });

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
      allCategoriesDropdownButton: page
        .locator(".dropdown.search-category button[data-toggle='dropdown']")
        .first(),
      dropdownContainer: page
        .locator("#entry_217822")
        .getByText("All Categories Desktops"),
      allCategoriesLinks: page.locator(
        "#entry_217822 div.dropdown-menu.dropdown-menu-left a"
      ),
      inputField: page.getByRole("textbox", { name: "Search For Products" }),
      button: page.getByRole("button", { name: "Search" }),
      searchResultSuggestionsContainer: page.locator(
        "#entry_217822 .dropdown-menu.autocomplete.w-100 h4"
      ),
    };
  }
}

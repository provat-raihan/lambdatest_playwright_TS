import { Page, Locator } from "@playwright/test";

export class MyAccountPage {

  readonly sidebarOptions: {
    login: Locator;
    register: Locator;
    forgottenPassword: Locator;
    myAccount: Locator;
    addressBook: Locator;
    wishList: Locator;
    orderHistory: Locator;
    downloads: Locator;
    recurringPayments: Locator;
    rewardPoints: Locator;
    returns: Locator;
    transactions: Locator;
    newsletter: Locator;


  };
  readonly registerPage: {
    registerPageHeader: Locator;
      registerPageBreadcrumbText: Locator;

  };
  readonly loginPage: {
    loginPageHeader: Locator;
      loginPageBreadcrumbText: Locator;
    registerSectionHeader: Locator;
    registerSectionContinueButton: Locator;

  };


  constructor(page: Page) {

    this.sidebarOptions= {
      login: page.getByRole('link', { name: ' Login' }),
      register: page.getByRole('link', { name: ' Register' }),
      forgottenPassword: page.getByRole('link', { name: ' Forgotten Password' }),
      myAccount: page.getByRole('link', { name: ' My Account' }),
      addressBook: page.getByRole('link', { name: ' Address Book' }),
      wishList: page.getByRole('link', { name: ' Wish List' }),
      orderHistory: page.getByRole('link', { name: ' Order History' }),
      downloads: page.getByRole('link', { name: ' Downloads' }),
      recurringPayments: page.getByRole('link', { name: ' Recurring payments' }),
      rewardPoints: page.getByRole('link', { name: ' Reward Points' }),
      returns: page.getByRole('link', { name: ' Returns' }),
      transactions: page.getByRole('link', { name: ' Transactions' }),
      newsletter: page.getByRole('link', { name: ' Newsletter' }),

    };
    this.registerPage = {
      registerPageHeader: page.getByRole('heading', { name: 'Register Account' }),
      registerPageBreadcrumbText: page.getByLabel('breadcrumb').getByText('Register'),

    };
    this.loginPage = {
      loginPageHeader: page.getByRole('heading', { name: 'Returning Customer' }),
      loginPageBreadcrumbText: page.getByLabel('breadcrumb').getByText('Login'),
      registerSectionHeader: page.getByRole('heading', { name: 'New Customer' }),
      registerSectionContinueButton: page.getByRole('link', { name: 'Continue' }),

    };

    
  }
}

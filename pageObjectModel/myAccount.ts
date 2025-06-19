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
      warningTextToAgreePolicy: Locator;
      warningTextAlreadyRegistered: Locator;
      firstNameInputBox: Locator;
      lastNameInputBox: Locator;
      emailInputBox: Locator;
      telephoneInputBox: Locator;
      passwordInputBox: Locator;
      confirmPasswordInputBox: Locator;
      newsletterYesButton: Locator;
      newsletterNoButton: Locator;
      privacyPolicyCheckbox: Locator;
      continueButton: Locator;

  };
  readonly loginPage: {
    loginPageHeader: Locator;
      loginPageBreadcrumbText: Locator;
    registerSectionHeader: Locator;
    registerSectionContinueButton: Locator;

  };
  readonly successPage: {
    successPageBreadcrumbText: Locator;
    successPageHeader: Locator;
    successPageContinueButton: Locator;

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
        warningTextToAgreePolicy: page.getByText('Warning: You must agree to'),
        warningTextAlreadyRegistered: page.getByText('Warning: E-Mail Address is already'),
        firstNameInputBox: page.getByRole('textbox', { name: 'First Name*' }),
        lastNameInputBox: page.getByRole('textbox', { name: 'Last Name*' }),
        emailInputBox: page.getByRole('textbox', { name: 'E-Mail*' }),
        telephoneInputBox: page.getByRole('textbox', { name: 'Telephone*' }),
        passwordInputBox: page.getByRole('textbox', { name: 'Password*' }),
        confirmPasswordInputBox: page.getByRole('textbox', { name: 'Password Confirm*' }),
        newsletterYesButton: page.getByText('Yes'),
        newsletterNoButton: page.getByText('No', { exact: true }),
        privacyPolicyCheckbox: page.getByText('I have read and agree to the'),
        continueButton: page.getByRole('button', { name: 'Continue' }),

    };
    this.loginPage = {
      loginPageHeader: page.getByRole('heading', { name: 'Returning Customer' }),
      loginPageBreadcrumbText: page.getByLabel('breadcrumb').getByText('Login'),
      registerSectionHeader: page.getByRole('heading', { name: 'New Customer' }),
      registerSectionContinueButton: page.getByRole('link', { name: 'Continue' }),

    };
    this.successPage = {
      successPageHeader: page.getByRole('heading', { name: ' Your Account Has Been' }),
      successPageBreadcrumbText: page.getByText('Success', { exact: true }),
      successPageContinueButton: page.getByRole('link', { name: 'Continue' }),

    };
  }
}

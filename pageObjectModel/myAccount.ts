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
      // registerPageBreadcrumbText: Locator;
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
      firstNameWarning: Locator;
      lastNameWarning: Locator;
      emailWarning: Locator;
      telephoneGuideMessage: Locator;
      telephoneWarning: Locator;
      passwordWarning: Locator;
      passwordConfirmWarning: Locator;

  };
  readonly loginPage: {
    loginPageHeader: Locator;
    // loginPageBreadcrumbText: Locator;
    registerSectionHeader: Locator;
    registerSectionContinueButton: Locator;
    loginPageEmailField: Locator;
    loginPagePasswordField: Locator;
    loginPageForgottenPasswordButton: Locator;
    loginPageLoginButton: Locator;
    loginPageWarningSection: Locator;

  };
  readonly successPage: {
    // successPageBreadcrumbText: Locator;
    successPageHeader: Locator;
    successPageContinueButton: Locator;

  };
  readonly myAccount: {
    myAccountBreadcrumb: Locator;
    myAccountBreadcrumbActive: Locator;

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
      // registerPageBreadcrumbText: page.getByLabel('breadcrumb').getByText('Register'),
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
        firstNameWarning: page.getByText('First Name must be between 1'),
        lastNameWarning: page.getByText('Last Name must be between 1'),
        emailWarning: page.getByText('E-Mail Address does not'),
        telephoneGuideMessage: page.getByText('Enter valid phone number with'),
        telephoneWarning: page.getByText('Telephone must be between 3'),
        passwordWarning: page.getByText('Password must be between 4'),
        passwordConfirmWarning: page.getByText('Password confirmation does'),

    };
    this.loginPage = {
      loginPageHeader: page.getByRole('heading', { name: 'Returning Customer' }),
      // loginPageBreadcrumbText: page.getByLabel('breadcrumb').getByText('Login'),
      registerSectionHeader: page.getByRole('heading', { name: 'New Customer' }),
      registerSectionContinueButton: page.getByRole('link', { name: 'Continue' }),
      loginPageEmailField: page.getByRole('textbox', { name: 'E-Mail Address' }),
      loginPagePasswordField: page.getByRole('textbox', { name: 'Password' }),
      loginPageForgottenPasswordButton: page.getByRole('link', { name: 'Forgotten Password', exact: true }),
      loginPageLoginButton: page.getByRole('button', { name: 'Login' }),
      loginPageWarningSection: page.locator(`css=div[class="alert alert-danger alert-dismissible"]`),

    };
    this.successPage = {
      successPageHeader: page.getByRole('heading', { name: ' Your Account Has Been' }),
      // successPageBreadcrumbText: page.getByText('Success', { exact: true }),
      successPageContinueButton: page.getByRole('link', { name: 'Continue' }),

    };
    this.myAccount = {
      myAccountBreadcrumb: page.locator(`css=ol[class="breadcrumb"]`),
      myAccountBreadcrumbActive: page.locator(`css=li[class="breadcrumb-item active"]`),

    };
  }
}

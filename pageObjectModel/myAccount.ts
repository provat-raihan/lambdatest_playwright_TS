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
    editAccount: Locator;
    password: Locator;
    notification: Locator;
    logout: Locator;
  };
  readonly registerPage: {
    registerPageHeader: Locator;
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
    loginPageBreadcrumbText: Locator;
    registerSectionHeader: Locator;
    registerSectionContinueButton: Locator;
    loginPageEmailField: Locator;
    loginPagePasswordField: Locator;
    loginPageForgottenPasswordButton: Locator;
    loginPageLoginButton: Locator;
    loginPageSuccessWarningSection: Locator;
    loginPageDangerWarningSection: Locator;
  };
  readonly successPage: {
    
    successPageHeader: Locator;
    successPageContinueButton: Locator;
  };
  readonly forgottenPasswordPage: {
    forgottenPasswordPageHeader: Locator;
    forgottenPasswordPageEmailLegend: Locator;
    forgottenPasswordPageEmailField: Locator;
    forgottenPasswordPageContinueButton: Locator;
    forgottenPasswordPageBackButton: Locator;
  };
  readonly myAccount: {
    myAccountBreadcrumb: Locator;
    myAccountBreadcrumbActive: Locator;
    myAccountHeader: Locator;
    myAccountItems: Locator;
    myOrdersHeader: Locator;
    myOrdersItems: Locator;
    myAffiliateAccountHeader: Locator;
    myAffiliateAccountItems: Locator;
    registerAffiliateAccount: Locator;
  };
  readonly registerAffiliateAccountPage: {
    AffiliateAccountPageHeader: Locator;
    AffiliateAccountLegend: Locator;
    AffiliateAccountPageCompanyField: Locator;
    AffiliateAccountPageWebsiteField: Locator;
    paymentInfoLegend: Locator;
    paymentInfoTaxIdInputField: Locator;
    paymentMethodRadioInput: Locator;
    checkPayeeNameInputField: Locator;
    aboutUsCheckboxInput: Locator;
    continueButton: Locator;
  };
  readonly editAccountPage: {
    editAccountPageHeader: Locator;
    personalInfoLegend: Locator;
    firstNameInputBox: Locator;
    lastNameInputBox: Locator;
    emailInputBox: Locator;
    telephoneInputBox: Locator;
    continueButton: Locator;
    backButton: Locator;
    telephoneGuideMessage: Locator;
    telephoneWarning: Locator;
    firstNameWarning: Locator;
    lastNameWarning: Locator;
    emailWarning: Locator;
  };
  readonly changePasswordPage: {
    changePasswordPageHeader: Locator;
    passwordInputField: Locator;
    confirmPasswordInputField: Locator;
    continueButton: Locator;
    backButton: Locator;
    passwordFieldWarning: Locator;
    confirmPasswordFieldWarning: Locator;

  };
  readonly logoutPage: {
    logoutPageHeader: Locator;
    continueButton: Locator;

  };

  constructor(page: Page) {
    this.sidebarOptions = {
      login: page.getByRole("link", { name: " Login" }),
      register: page.getByRole("link", { name: " Register" }),
      forgottenPassword: page.getByRole("link", {
        name: " Forgotten Password",
      }),
      myAccount: page.getByRole("link", { name: " My Account" }),
      addressBook: page.getByRole("link", { name: " Address Book" }),
      wishList: page.getByRole("link", { name: " Wish List" }),
      orderHistory: page.getByRole("link", { name: " Order History" }),
      downloads: page.getByRole("link", { name: " Downloads" }),
      recurringPayments: page.getByRole("link", {
        name: " Recurring payments",
      }),
      rewardPoints: page.getByRole("link", { name: " Reward Points" }),
      returns: page.getByRole("link", { name: " Returns" }),
      transactions: page.getByRole("link", { name: " Transactions" }),
      newsletter: page.getByRole("link", { name: " Newsletter" }),
      editAccount: page.getByRole("link", { name: " Edit Account" }),
      password: page.getByRole("link", { name: " Password" }),
      notification: page.getByRole("link", { name: " Notification" }),
      logout: page.getByRole("link", { name: " Logout" }),
    };
    this.registerPage = {
      registerPageHeader: page.getByRole("heading", {
        name: "Register Account",
      }),
      // registerPageBreadcrumbText: page.getByLabel('breadcrumb').getByText('Register'),
      warningTextToAgreePolicy: page.getByText("Warning: You must agree to"),
      warningTextAlreadyRegistered: page.getByText(
        "Warning: E-Mail Address is already"
      ),
      firstNameInputBox: page.getByRole("textbox", { name: "First Name*" }),
      lastNameInputBox: page.getByRole("textbox", { name: "Last Name*" }),
      emailInputBox: page.getByRole("textbox", { name: "E-Mail*" }),
      telephoneInputBox: page.getByRole("textbox", { name: "Telephone*" }),
      passwordInputBox: page.getByRole("textbox", { name: "Password*" }),
      confirmPasswordInputBox: page.getByRole("textbox", {
        name: "Password Confirm*",
      }),
      newsletterYesButton: page.getByText("Yes"),
      newsletterNoButton: page.getByText("No", { exact: true }),
      privacyPolicyCheckbox: page.getByText("I have read and agree to the"),
      continueButton: page.getByRole("button", { name: "Continue" }),
      firstNameWarning: page.getByText("First Name must be between 1"),
      lastNameWarning: page.getByText("Last Name must be between 1"),
      emailWarning: page.getByText("E-Mail Address does not"),
      telephoneGuideMessage: page.getByText("Enter valid phone number with"),
      telephoneWarning: page.getByText("Telephone must be between 3"),
      passwordWarning: page.getByText("Password must be between 4"),
      passwordConfirmWarning: page.getByText("Password confirmation does"),
    };
    this.loginPage = {
      loginPageHeader: page.getByRole("heading", {
        name: "Returning Customer",
      }),
      loginPageBreadcrumbText: page.getByLabel("breadcrumb").getByText("Login"),
      registerSectionHeader: page.getByRole("heading", {
        name: "New Customer",
      }),
      registerSectionContinueButton: page.getByRole("link", {
        name: "Continue",
      }),
      loginPageEmailField: page.getByRole("textbox", {
        name: "E-Mail Address",
      }),
      loginPagePasswordField: page.getByRole("textbox", { name: "Password" }),
      loginPageForgottenPasswordButton: page.getByRole("link", {
        name: "Forgotten Password",
        exact: true,
      }),
      loginPageLoginButton: page.getByRole("button", { name: "Login" }),
      loginPageSuccessWarningSection: page.locator(
        `css=div[class="alert alert-success alert-dismissible"]`
      ),
      loginPageDangerWarningSection: page.locator(
        `css=div[class="alert alert-danger alert-dismissible"]`
      ),
    };
    this.successPage = {
      successPageHeader: page.getByRole("heading", {
        name: " Your Account Has Been",
      }),
      // successPageBreadcrumbText: page.getByText('Success', { exact: true }),
      successPageContinueButton: page.getByRole("link", { name: "Continue" }),
    };
    this.forgottenPasswordPage = {
      forgottenPasswordPageHeader: page.getByRole("heading", {
        name: "Forgot Your Password?",
      }),
      forgottenPasswordPageEmailField: page.getByRole("textbox", {
        name: "E-Mail Address*",
      }),
      forgottenPasswordPageEmailLegend: page.getByText("Your E-Mail Address"),
      forgottenPasswordPageContinueButton: page.getByRole("button", {
        name: "Continue",
      }),
      forgottenPasswordPageBackButton: page.getByRole("link", {
        name: "Back",
      }),
    };
    this.myAccount = {
      myAccountBreadcrumb: page.locator(`css=ol[class="breadcrumb"]`),
      myAccountBreadcrumbActive: page.locator(
        `css=li[class="breadcrumb-item active"]`
      ),
      myAccountHeader: page.getByRole("heading", { name: "My Account" }),
      myAccountItems: page.locator(
        `css=div[class="row"] div[class="col-6 col-sm-4 col-lg-2_4"]`
      ),

      myOrdersHeader: page.getByRole("heading", { name: "My Orders" }),
      myOrdersItems: page.locator(
        `css=div[class="row"] div[class="col-6 col-sm-4 col-lg-2"]`
      ),

      myAffiliateAccountHeader: page.getByRole("heading", {
        name: "My Affiliate Account",
      }),
      myAffiliateAccountItems: page.locator(
        `css=div[class="card-body text-center text-sm-left"] a`
      ),
      registerAffiliateAccount: page
        .locator(`css=div[class="card-body text-center text-sm-left"] a`)
        .first(),
    };
    this.registerAffiliateAccountPage = {
      AffiliateAccountPageHeader: page.getByRole("heading", {
        name: "Your Affiliate Information",
      }),
      AffiliateAccountLegend: page.getByText("My Affiliate Account"),
      AffiliateAccountPageCompanyField: page.getByRole("textbox", {
        name: "Company",
      }),
      AffiliateAccountPageWebsiteField: page.getByRole("textbox", {
        name: "Web Site",
      }),
      paymentInfoLegend: page.getByText("Payment Information"),
      paymentInfoTaxIdInputField: page.getByRole("textbox", { name: "Tax ID" }),
      paymentMethodRadioInput: page.locator(`css=input[type = "radio"]`),
      checkPayeeNameInputField: page.getByRole("textbox", {
        name: "Cheque Payee Name*",
      }),
      aboutUsCheckboxInput: page.getByRole("checkbox"),
      continueButton: page.getByRole("button", { name: "Continue" }),
    };
    this.editAccountPage = {
      editAccountPageHeader: page.getByRole("heading", {
        name: "My Account Information",
      }),
      personalInfoLegend: page.getByText("Your Personal Details"),
      firstNameInputBox: page.getByRole("textbox", { name: "First Name *" }),
      lastNameInputBox: page.getByRole("textbox", { name: "Last Name*" }),
      emailInputBox: page.getByRole("textbox", { name: "E-Mail*" }),
      telephoneInputBox: page.getByRole("textbox", { name: "Telephone*" }),
      continueButton: page.getByRole("button", { name: "Continue" }),
      backButton: page.getByRole("link", { name: " Back" }),
      telephoneGuideMessage: page.getByText("Enter valid phone number with"),
      telephoneWarning: page.getByText("Telephone must be between 3"),
      firstNameWarning: page.getByText("First Name must be between 1"),
      lastNameWarning: page.getByText("Last Name must be between 1"),
      emailWarning: page.getByText("E-Mail Address does not"),
    };
<<<<<<< HEAD
    this.changePasswordPage = {
      changePasswordPageHeader: page.getByRole('heading', { name: 'Change Password' }),
      passwordInputField: page.getByRole('textbox', { name: 'Password*' }),
      confirmPasswordInputField: page.getByRole('textbox', { name: 'Password Confirm*' }),
      continueButton: page.getByRole('button', { name: 'Continue' }),
      backButton: page.getByRole('link', { name: ' Back' }),
      passwordFieldWarning: page.getByText('Password must be between 4'),
      confirmPasswordFieldWarning: page.getByText('Password confirmation does'),

    };
    this.logoutPage = {
      logoutPageHeader: page.getByRole('heading', { name: ' Account Logout' }),
      continueButton: page.getByRole('link', { name: 'Continue' }),

    };
    
=======
>>>>>>> 1f53113 (fixed code)
  }
}

import { Page } from "@playwright/test";
import { Utils } from "../utils";
import { MyAccountPage } from "../../pageObjectModel/myAccount";
export interface RegistrationDetails {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
  passwordConfirm: string;
  newsletterSubscribe: boolean;
}
export interface LoginDetails {
  email: string;
  password: string;
}

export class AuthHelper {
  private utils: Utils;
  private myAccountPage: MyAccountPage; // Or a specific LoginPage if you have one

  constructor(page: Page) {
    this.utils = new Utils(page);
    this.myAccountPage = new MyAccountPage(page); // Initialize with your page object model
  }

  async login(baseUrl: string, details: LoginDetails): Promise<void> {
    const { email, password } = details;
    try {
      this.utils.logMessage(`Attempting to log in user: "${email}"`);

      // 1. Navigate to the login page
      // Based on your screenshot, it seems the login form is at '/account/login'
      await this.utils.navigateTo(baseUrl + "/index.php?route=account/login");
      this.utils.logMessage("Navigated to login page.");

      // 2. Fill in email and password
      // Assuming you have locators for email and password input boxes in your MyAccountPage
      await this.utils.fillInputBox(
        this.myAccountPage.loginPage.loginPageEmailField,
        email
      );
      await this.utils.fillInputBox(
        this.myAccountPage.loginPage.loginPagePasswordField,
        password
      );
      this.utils.logMessage("Filled in login credentials.");

      // 3. Click the Login button
      // Assuming you have a locator for the login button
      await this.utils.clickOnElement(
        this.myAccountPage.loginPage.loginPageLoginButton
      );
      this.utils.logMessage(`Clicked 'Login' button for user: "${email}"`);
    } catch (error) {
      const errorMsg = `Failed to perform login for user: "${email}". Error: ${error.message}`;
      this.utils.logMessage(errorMsg, "error");
      await this.utils.captureScreenshotOnFailure(
        "login_failure_" + email.split("@")[0]
      );
      throw new Error(errorMsg);
    }
  }

  // Register

  async register(baseUrl: string, details: RegistrationDetails): Promise<void> {
    const {
      firstName,
      lastName,
      email,
      telephone,
      password,
      passwordConfirm,
      newsletterSubscribe,
    } = details;
    try {
      this.utils.logMessage(`Attempting to register user: "${email}"`);

      // 1. Navigate to the registration page
      await this.utils.navigateTo(
        baseUrl + "/index.php?route=account/register"
      );
      this.utils.logMessage("Navigated to registration page.");

      // 2. Fill in all personal details
      await this.utils.fillInputBox(
        this.myAccountPage.registerPage.firstNameInputBox,
        firstName
      );
      await this.utils.fillInputBox(
        this.myAccountPage.registerPage.lastNameInputBox,
        lastName
      );
      await this.utils.fillInputBox(
        this.myAccountPage.registerPage.emailInputBox,
        email
      );
      await this.utils.fillInputBox(
        this.myAccountPage.registerPage.telephoneInputBox,
        telephone
      );

      // 3. Fill in password details
      await this.utils.fillInputBox(
        this.myAccountPage.registerPage.passwordInputBox,
        password
      );
      await this.utils.fillInputBox(
        this.myAccountPage.registerPage.confirmPasswordInputBox,
        passwordConfirm
      );

      // 4. Always accept the privacy policy (as per your preference)
      await this.utils.clickOnElement(
        this.myAccountPage.registerPage.privacyPolicyCheckbox
      );
      this.utils.logMessage("Agreed to Privacy Policy.");

      // 5. Handle Newsletter subscription (Yes/No radio buttons)
      if (newsletterSubscribe) {
        await this.utils.clickOnElement(
          this.myAccountPage.registerPage.newsletterYesButton
        );
        this.utils.logMessage("Selected Newsletter: Yes.");
      } else {
        await this.utils.clickOnElement(
          this.myAccountPage.registerPage.newsletterNoButton
        );
        this.utils.logMessage("Selected Newsletter: No.");
      }

      // 6. Click the Continue button to submit the form
      await this.utils.clickOnElement(
        this.myAccountPage.registerPage.continueButton
      );
      this.utils.logMessage(`Clicked 'Continue' button for user: "${email}"`);
    } catch (error) {
      const errorMsg = `Failed to perform registration for user: "${email}". Error: ${error.message}`;
      this.utils.logMessage(errorMsg, "error");
      await this.utils.captureScreenshotOnFailure(
        "registration_failure_" + email.split("@")[0]
      );
      throw new Error(errorMsg);
    }
  }
}
// Add other optional fields like newsletter if needed
// newsletterSubscribe?: boolean;

// export class LoginHelper {
//   private page: Page;
//   private utils: Utils;
//   private myAccountPage: MyAccountPage;

//   constructor(page: Page) {
//     this.page = page;
//     this.utils = new Utils(page);
//     this.myAccountPage = new MyAccountPage(page);
//   }

//   async login(username: string, password: string): Promise<void> {
//     try {
//       await this.utils.fillInputBox(
//         this.myAccountPage.userNameInputField,
//         username
//       );
//       await this.utils.fillInputBox(
//         this.myAccountPage.passwordInputField,
//         password
//       );
//       await this.page.locator(this.myAccountPage.loginButton).click();
//       this.utils.logMessage(`Login attempted with username: "${username}"`);
//     } catch (error) {
//       const errorMsg = `Failed to perform login with username: "${username}"`;
//       this.utils.logMessage(errorMsg, "error");
//       await this.utils.captureScreenshotOnFailure("login");
//       throw new Error(errorMsg);
//     }
//   }
// }

// export class SignupHelper {
// //   private page: Page;
//   private utils: Utils;
//   private myAccountPage: MyAccountPage;

//   constructor(page: Page) {
//     // this.page = page;
//     this.utils = new Utils(page);
//     this.myAccountPage = new MyAccountPage(page);
//   }

//   async register(username: string, password: string): Promise<void> {
//     try {
//       await this.utils.fillInputBox(
//         this.myAccountPage.userNameInputField,
//         username
//       );
//       await this.utils.fillInputBox(
//         this.myAccountPage.passwordInputField,
//         password
//       );
//       await this.utils.clickOnElement(this.myAccountPage.signUpButton);
//       this.utils.logMessage(`Signup attempted with username: "${username}"`);
//     } catch (error) {
//       const errorMsg = `Failed to perform signup with username: "${username}"`;
//       this.utils.logMessage(errorMsg, "error");
//       await this.utils.captureScreenshotOnFailure("signup");
//       throw new Error(errorMsg);
//     }
//   }
// }

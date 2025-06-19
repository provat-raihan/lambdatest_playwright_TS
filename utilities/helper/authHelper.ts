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
  // removed agreeToPrivacy as per previous instruction
}

export class RegisterAuthHelper {
  private utils: Utils;
  private myAccountPage: MyAccountPage;

  constructor(page: Page) {
    this.utils = new Utils(page);
    this.myAccountPage = new MyAccountPage(page);
  }

  async register(baseUrl: string, details: RegistrationDetails): Promise<void> {
    try {
      this.utils.logMessage(`Attempting to register user: "${details.email}"`);

      // 1. Navigate to the registration page
      await this.utils.navigateTo(baseUrl + '/index.php?route=account/register');
      this.utils.logMessage('Navigated to registration page.');

      // 2. Fill in all personal details
      await this.utils.fillInputBox(this.myAccountPage.registerPage.firstNameInputBox, details.firstName);
      await this.utils.fillInputBox(this.myAccountPage.registerPage.lastNameInputBox, details.lastName);
      await this.utils.fillInputBox(this.myAccountPage.registerPage.emailInputBox, details.email);
      await this.utils.fillInputBox(this.myAccountPage.registerPage.telephoneInputBox, details.telephone);

      // 3. Fill in password details
      await this.utils.fillInputBox(this.myAccountPage.registerPage.passwordInputBox, details.password);
      await this.utils.fillInputBox(this.myAccountPage.registerPage.confirmPasswordInputBox, details.passwordConfirm);

      // 4. Always accept the privacy policy (as per your preference)
      await this.utils.clickOnElement(this.myAccountPage.registerPage.privacyPolicyCheckbox);
      this.utils.logMessage('Agreed to Privacy Policy.');

      // 5. Handle Newsletter subscription (Yes/No radio buttons)
      if (details.newsletterSubscribe) {
        await this.utils.clickOnElement(this.myAccountPage.registerPage.newsletterYesButton);
        this.utils.logMessage('Selected Newsletter: Yes.');
      } else {
        await this.utils.clickOnElement(this.myAccountPage.registerPage.newsletterNoButton);
        this.utils.logMessage('Selected Newsletter: No.');
      }

      // 6. Click the Continue button to submit the form
      await this.utils.clickOnElement(this.myAccountPage.registerPage.continueButton);
      this.utils.logMessage(`Clicked 'Continue' button for user: "${details.email}"`);

    } catch (error) {
      const errorMsg = `Failed to perform registration for user: "${details.email}". Error: ${error.message}`;
      this.utils.logMessage(errorMsg, "error");
      await this.utils.captureScreenshotOnFailure("registration_failure_" + details.email.split('@')[0]);
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
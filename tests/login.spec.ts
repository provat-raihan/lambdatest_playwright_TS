import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";

class LoginPage extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Login Page Tests", () => {
      test.beforeEach(async ({ runner }) => {
        await runner.navigateTo("/login");
      });
    });
  }
}

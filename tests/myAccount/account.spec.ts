import { test } from "../../utilities/fixtures";
import { ExpectedValueProvider } from "../../utilities/valueProvider";
import homeData from "../../testData/home.json";
import myAccountData from "../../testData/myAccount.json";
import { MyAccountPage } from "../../pageObjectModel/myAccount";

class accountPageTest extends ExpectedValueProvider {
    constructor() {
        super();
    }

    runTest() {
        test.describe("My account sidebar functionality test", () => {
            test.describe("My account functionality testing while logged out", () => {
                test.beforeEach(async ({ runner, envData, homePage, myAccountPage,authHelper }) => {
                    await runner.navigateTo(envData.baseUrl);
                    await runner.verifyUrlContains(envData.baseUrl);
                    await runner.verifyElementIsVisible(homePage.headerLogo);
                    await runner.validateAttribute(
                        homePage.headerLogo,
                        "src",
                        homeData.header.logoSrc
                    );
                    await runner.validateAttribute(
                        homePage.headerLogo,
                        "alt",
                        homeData.header.logoAlt
                    );
                    await runner.mouseHover(homePage.navbarItems.myAccount);
                    await runner.clickOnElement(homePage.navbarItems.myAccountLogin);

                    await runner.verifyElementIsVisible(
                        myAccountPage.loginPage.loginPageHeader
                    );
                    await runner.verifyElementIsVisible(
                        myAccountPage.myAccount.myAccountBreadcrumbActive
                    );
                    await runner.verifyToHaveExactText(
                        myAccountPage.myAccount.myAccountBreadcrumbActive,
                        myAccountData.loginBreadcrumbText
                    );
                    await runner.verifyElementIsVisible(
                        myAccountPage.loginPage.registerSectionHeader
                    );
                });
                test("Verify clicking on my account directs to login while the account is not logged in", async ({
                    runner,
                    myAccountPage,
                    envData,
                    homePage
                }) => {
                    
                    await runner.clickOnElement(
                        myAccountPage.sidebarOptions.myAccount
                    );
                    await runner.verifyElementIsVisible(
                        myAccountPage.loginPage.loginPageHeader
                    );
                    await runner.verifyElementIsVisible(
                        myAccountPage.myAccount.myAccountBreadcrumbActive
                    );
                    await runner.verifyToHaveExactText(
                        myAccountPage.myAccount.myAccountBreadcrumbActive,
                        myAccountData.loginBreadcrumbText
                    );
                    await runner.verifyElementIsVisible(
                        myAccountPage.loginPage.registerSectionHeader
                    );

                });
            });
            test.describe("My account tests while logged in", () => {
                test.beforeEach(async ({ runner, envData, homePage, myAccountPage,authHelper }) => {
                    await runner.navigateTo(envData.baseUrl);
        await runner.verifyUrlContains(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.headerLogo);
        await runner.validateAttribute(
          homePage.headerLogo,
          "src",
          homeData.header.logoSrc
        );
        await runner.validateAttribute(
          homePage.headerLogo,
          "alt",
          homeData.header.logoAlt
        );
        await runner.mouseHover(homePage.navbarItems.myAccount);
        await runner.clickOnElement(homePage.navbarItems.myAccountLogin);

        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.loginPageHeader
        );
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountBreadcrumbActive
        );
        await runner.verifyToHaveExactText(
          myAccountPage.myAccount.myAccountBreadcrumbActive,
          myAccountData.loginBreadcrumbText
        );
        await runner.verifyElementIsVisible(
          myAccountPage.loginPage.registerSectionHeader
        );
          await authHelper.login(envData.baseUrl, {
          email: envData.email,
          password: envData.password,
        });
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountBreadcrumb
        );
        await runner.verifyElementIsVisible(
          myAccountPage.myAccount.myAccountBreadcrumbActive
        );
        await runner.verifyToHaveExactText(
          myAccountPage.myAccount.myAccountBreadcrumbActive,
          myAccountData.accountBreadcrumbText
        );
                });

                test("verifying my Account items redirect to respective pages ", async ({ runner, myAccountPage,envData }) => {
                    await runner.verifyElementIsVisible(myAccountPage.myAccount.myAccountHeader)
                    await runner.verifyToHaveExactText(myAccountPage.myAccount.myAccountHeader,myAccountData.myAccount.myAccountHeaderText)
                    await runner.verifyAnchorLinks(myAccountPage.myAccount.myAccountItems, [
                        envData.myAccountItems.editAccount,
                        envData.myAccountItems.password,
                        envData.myAccountItems.addressBook,
                        envData.myAccountItems.wishList,
                        envData.myAccountItems.newsletter
                    ])
                });
                test("verifying my orders items redirect to respective pages ", async ({ runner, myAccountPage,envData }) => {
                    await runner.verifyElementIsVisible(myAccountPage.myAccount.myOrdersHeader)
                    await runner.verifyToHaveExactText(myAccountPage.myAccount.myOrdersHeader,myAccountData.myAccount.myOrdersHeaderText)
                    await runner.verifyAnchorLinks(myAccountPage.myAccount.myOrdersItems, [
                        envData.myOrdersItems.orderHistory,
                        envData.myOrdersItems.downloads,
                        envData.myOrdersItems.rewardPoints,
                        envData.myOrdersItems.returns,
                        envData.myOrdersItems.transactions,
                        envData.myOrdersItems.recurringPayments
                    ])
                });
                test("verifying my affiliated account items redirect to respective pages ", async ({ runner, myAccountPage,envData }) => {
                    await runner.verifyElementIsVisible(myAccountPage.myAccount.myAffiliateAccountHeader)
                    await runner.verifyToHaveExactText(myAccountPage.myAccount.myAffiliateAccountHeader,myAccountData.myAccount.myAffiliateAccountHeaderText)
                    await runner.verifyAnchorLinks(myAccountPage.myAccount.myAffiliateAccountItems, [
                        envData.myAffiliateAccountItems.registerAffiliateAccount
                        
                    ])
                });
                test("verifying register affiliate account directs to respective pages ", async ({ runner, myAccountPage,envData }) => {
                    await runner.verifyElementIsVisible(myAccountPage.myAccount.myAffiliateAccountHeader)
                    await runner.verifyToHaveExactText(myAccountPage.myAccount.myAffiliateAccountHeader, myAccountData.myAccount.myAffiliateAccountHeaderText)
                    await runner.clickOnElement(myAccountPage.myAccount.registerAffiliateAccount);
                    await runner.verifyUrlContains(envData.myAffiliateAccountItems.registerAffiliateAccount);
                    await runner.verifyElementIsVisible(myAccountPage.myAccount.myAccountBreadcrumbActive)
                    await runner.verifyToHaveExactText(myAccountPage.myAccount.myAccountBreadcrumbActive, myAccountData.affiliateBreadcrumbText)
                    
                });
            });
        });
    }
}
new accountPageTest().runTest();

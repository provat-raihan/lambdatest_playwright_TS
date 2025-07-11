import { Page } from "playwright/test";
export class EnvData {
  readonly baseUrl: string;
  readonly homeUrl: string;
  readonly specialOfferUrl: string;
  readonly blogUrl: string;
  readonly loginUrl: string;
  readonly registerUrl: string;
  readonly forgotPasswordUrl: string;
  readonly successUrl: string;
  readonly wishlistUrl: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly telephone: string;
  readonly email: string;
  readonly password: string;
  readonly searchResultUrl: string;
  readonly productCompareUrl: string;

  readonly shopByCategoryItemsHrefValues: {
    components: string;
    camera: string;
    phoneTabletsIpod: string;
    software: string;
    mp3Player: string;
    laptopsAndNotebooks: string;
    desktopsAndMonitors: string;
    printersAndScanners: string;
    miceAndTrackballs: string;
    fashionAndAccessories: string;
    beautyAndSaloon: string;
    autopartsAndAccessories: string;
    washingMachine: string;
    gamingConsole: string;
    airConditioner: string;
    webCameras: string;
  };
  readonly myAccountItems: {
    myAccount: string;
    editAccount: string;
    password: string;
    wishList: string;
    addressBook: string;
    newsletter: string;
  };
  readonly myOrdersItems: {
    orderHistory: string;
    downloads: string;
    rewardPoints: string;
    returns: string;
    transactions: string;
    recurringPayments: string;
  };
  readonly myAffiliateAccountItems: {
    registerAffiliateAccount: string;
    trackingAffiliateAccount: string;
  };

  constructor(page: Page) {
    this.baseUrl = `${process.env.BASE_URL}`;
    this.homeUrl = `${process.env.HOME_URL}`;
    this.specialOfferUrl = `${process.env.SPECIAL_OFFERS_URL}`;
    this.blogUrl = `${process.env.BLOG_URL}`;
    this.loginUrl = `${process.env.LOGIN_URL}`;
    this.registerUrl = `${process.env.REGISTER_URL}`;
    this.forgotPasswordUrl = `${process.env.FORGOT_PASSWORD_URL}`;
    this.successUrl = `${process.env.SUCCESS_URL}`;
    this.wishlistUrl = `${process.env.WISHLIST_URL}`;
    this.firstName = `${process.env.FIRST_NAME}`;
    this.lastName = `${process.env.LAST_NAME}`;
    this.telephone = `${process.env.TELEPHONE}`;
    this.email = `${process.env.EMAIL}`;
    this.password = `${process.env.PASSWORD}`;
    this.searchResultUrl = `${process.env.SEARCH_RESULT_URL}`;
    this.productCompareUrl = `${process.env.PRODUCT_COMPARE_URL}`;

    this.shopByCategoryItemsHrefValues = {
      components: `${process.env.COMPONENTS_URL}`,
      camera: `${process.env.CAMERAS_URL}`,
      phoneTabletsIpod: `${process.env.PHONES_TABS_IPOD_URL}`,
      software: `${process.env.SOFTWARE_URL}`,
      mp3Player: `${process.env.MP3PLAYER_URL}`,
      laptopsAndNotebooks: `${process.env.LAPTOPS_AND_NOTEBOOKS_URL}`,
      desktopsAndMonitors: `${process.env.DESKTOP_AND_MONITOR_URL}`,
      printersAndScanners: `${process.env.PRINTERS_AND_SCANNERS_URL}`,
      miceAndTrackballs: `${process.env.MICE_AND_TRACKBALLS_URL}`,
      fashionAndAccessories: `${process.env.FASHION_AND_ACCESSORIES_URL}`,
      beautyAndSaloon: `${process.env.BEAUTY_AND_SALOON_URL}`,
      autopartsAndAccessories: `${process.env.AUTOPARTS_AND_ACCESSORIES_URL}`,
      washingMachine: `${process.env.WASHING_MACHINE_URL}`,
      gamingConsole: `${process.env.GAMING_CONSOLE_URL}`,
      airConditioner: `${process.env.AIR_CONDITIONER_URL}`,
      webCameras: `${process.env.WEB_CAMERAS}`,
    };
    this.myAccountItems = {
      myAccount: `${process.env.MY_ACCOUNT_URL}`,
      editAccount: `${process.env.EDIT_ACCOUNT_URL}`,
      password: `${process.env.PASSWORD_URL}`,
      wishList: `${process.env.WISHLIST_URL}`,
      addressBook: `${process.env.ADDRESS_BOOK_URL}`,
      newsletter: `${process.env.NEWSLETTER_URL}`,
    };
    this.myOrdersItems = {
  
      orderHistory: `${process.env.ORDER_HISTORY_URL}`,
      downloads: `${process.env.DOWNLOADS_URL}`,
      rewardPoints: `${process.env.REWARD_POINTS_URL}`,
      returns: `${process.env.RETURNS_URL}`,
      transactions: `${process.env.TRANSACTIONS_URL}`,
      recurringPayments: `${process.env.RECURRING_PAYMENTS_URL}`,
    };
    this.myAffiliateAccountItems = {

      registerAffiliateAccount: `${process.env.AFFILIATE_ACCOUNT_URL}`,
      trackingAffiliateAccount: `${process.env.TRACKING_ACCOUNT_URL}`,

    };
  }
}

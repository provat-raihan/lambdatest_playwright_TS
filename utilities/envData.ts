import { Page } from "playwright/test";
export class EnvData {
  readonly baseUrl: string;
  readonly homeUrl: string;
  readonly specialOfferUrl: string;
  readonly blogUrl: string;
  readonly loginUrl: string;
  readonly registerUrl: string;

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

  constructor(page: Page) {
    this.baseUrl = `${process.env.BASE_URL}`;
    this.homeUrl = `${process.env.HOME_URL}`;
    this.specialOfferUrl = `${process.env.SPECIAL_OFFERS_URL}`;
    this.blogUrl = `${process.env.BLOG_URL}`;
    this.loginUrl = `${process.env.LOGIN_URL}`;
    this.registerUrl = `${process.env.REGISTER_URL}`;

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
  }
}

import * as fs from "fs";
import * as path from "path";

interface HomeData {
  baseUrl: string;
  loginPageUrl: string;
}

export class ExpectedValueProvider {
  readonly baseUrl: string;


  constructor() {
    const data = this.loadHomeData();
    this.baseUrl = data.baseUrl;
    
  }

  private loadHomeData(): HomeData {
    const jsonFilePath = path.resolve(__dirname, "../testData/home.json");

    try {
      const data = fs.readFileSync(jsonFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error reading or parsing the file: ${jsonFilePath}`);
    }
  }
}

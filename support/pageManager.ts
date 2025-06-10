import { expect, Locator, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ConnexionPage } from "../pages/ConnexionPage"; 
import { WelcomePage } from "../pages/WelcomePage";


export class PageManager {
  static page: Page;
  static homePage: HomePage;
  static connexionPage: ConnexionPage;
  static welcomePage: WelcomePage;


  static getLocatorOptionSelected(option: string): Locator {
    return this.page
      .getByRole("option", { name: option })
      .locator("div")
      .first();
  }

  static getLocatorByTextSelected(option: string): Locator {
    return this.page.getByText(new RegExp(option, "i"));
  }

  static async clickOn(
    typeButton: "button" | "link" | "checkbox",
    nameButton: string
  ) {
    await this.page
      .getByRole(typeButton, { name: nameButton })
      .click();
  }

  static async selectFirstDynamicDropdown() {
    this.page.locator("div.suggestionlist").selectOption({ index: 1 });
  }

//   static async isElementEnabled(
//     elementType: "button" | "link" | "checkbox",
//     name: string
//   ): Promise<boolean> {
//     const selector =
//       elementType === "button"
//         ?button:has-text("${name}")
//         : elementType === "link"
//         ? a:has-text("${name}")
//         : input[type="checkbox"][name="${name}"];

//     const element = this.page.locator(selector);
//     await expect(element).toBeVisible();
//     return await element.isEnabled();
//   }

  static initialize(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.connexionPage = new ConnexionPage(page);
    this.welcomePage = new WelcomePage(page);

  }
}
import { Locator, Page, expect } from "@playwright/test";

export class WelcomePage {
  
  private page: Page;
  private welcomeText: Locator;


 
  
  //Constructeur par defaut de la page
  constructor(page: Page) {
    this.page = page;
    this.welcomeText = page.getByText('Trouvez les ressources dont vous avez besoin pour mieux vous préparer au concours');

  }


  async verifyConnexionWelcomeText() {
    await expect(this.welcomeText).toBeVisible();
  }

}

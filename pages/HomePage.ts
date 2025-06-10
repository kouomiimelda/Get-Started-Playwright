import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  
  readonly page: Page;
  readonly welcomeText: Locator;

 
  
  //Constructeur par defaut de la page
  constructor(page: Page) {
    this.page = page;
    this.welcomeText = page.getByRole('heading', { name: 'Bienvenue sur votre espace d\'' });

  }
  //Fonction de navigation
  async navigate() {
    await this.page.goto('http://test.icam-afrique.com');
  }
  //Verification de la page d'acceuil
  async verifyHomePage() {
    expect(this.page).toHaveTitle(/Inscription au Concours UCAC-ICAM : Devenez Ingénieur| UCAC-ICAM/);
  }

  async verifyWelcomeText() {
    await expect(this.welcomeText).toBeVisible();
  }
 

  //Click sur la page d'inscription
  async Register() {
    await this.page.click("text=Inscrivez-vous maintenant");
  }

  //Click sur le bouton de connexion 
  async login(loginButtonText: string) {
    await this.page.getByRole('button', { name: loginButtonText }).click();
  }
}


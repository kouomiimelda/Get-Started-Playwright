import { Locator, Page, expect } from "@playwright/test";

export class ConnexionPage {
  
  readonly page: Page;
  readonly connexionWelcomeText: Locator;
  readonly emailField: Locator;
  readonly passwordField : Locator;

  //Constructeur par defaut de la page
  constructor(page: Page) {
    this.page = page;
    this.connexionWelcomeText = page.getByText('Connectez-vous à votre compte');
    this.emailField = page.getByRole('textbox', { name: 'Email' })
    this.passwordField = page.getByRole('textbox', { name: 'Mot de passe' }) 

  }

  // async verifyConnexionWelcomeText() {
  //   await expect(this.connexionWelcomeText).toBeVisible();
  // }

//Fonction pour le remplissage de l'adresse email
  async fillEmail(email:string) {
    await this.emailField.fill(email)
  }

 //Fonction pour le remplissage de l'adresse email
  async fillPassword(password:string) {
    await this.passwordField.fill(password)
  }

    //Click sur la page d'inscription
  async connexion() {
    await this.page.getByRole('button', { name: 'Connectez-vous' }).click();
  }
}

import { Locator, Page, expect } from "@playwright/test";

export class ConnexionPage {
  
  readonly page: Page;
  readonly connexionWelcomeText: Locator;
  readonly emailField: Locator;
  readonly emailwarningText: Locator;
  readonly passwordwarningText: Locator;
  readonly passwordField : Locator;
  readonly connexionButton: Locator;

  //Constructeur par defaut de la page
  constructor(page: Page) {
    this.page = page;
    this.connexionWelcomeText = page.getByText('Connectez-vous à votre compte');
    this.emailwarningText = page.getByText('Email is required and must be valid.');
    this.passwordwarningText = page.getByText('Password is required.');
    this.emailField = page.getByRole('textbox', { name: 'Email' })
    this.passwordField = page.getByRole('textbox', { name: 'Mot de passe' }) 
    this.connexionButton = page.getByRole('button', { name: 'Connectez-vous' });

  }

  async verifyConnexionWelcomeText() {
    await expect(this.connexionWelcomeText).toBeVisible();
  }

//Fonction pour le remplissage de l'adresse email
  async fillEmail(email:string) {
    await this.emailField.fill(email)
  }

 //Fonction pour le remplissage de l'adresse email
  async fillPassword(password:string) {
    await this.passwordField.fill(password)
  }

  //Fonction pour verifier si le message d'avertissement de l'email est visible
  async verifyEmailWarningText() {
    await expect(this.emailwarningText).toBeVisible();
  }
//Fonction pour verifier si le message d'avertissement du mot de passe est visible
  async verifyPasswordWarningText() {
    await expect(this.passwordwarningText).toBeVisible();
  }
    //Click sur la page d'inscription
  async connexion() {
    await this.connexionButton.click();
  }

    async connexionButtonDisabled() {
    await expect(this.connexionButton).toBeDisabled();
  }
}

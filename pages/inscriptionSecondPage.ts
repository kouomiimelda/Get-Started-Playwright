
import { Locator, Page, expect } from "@playwright/test";

export class InscriptionSecondPage{

    private page : Page;
    readonly emailField : Locator;
    readonly levelCheck : Locator;
    readonly getwelcomeText : Locator;
    readonly validationText : Locator;

    
    constructor(page:Page){
        this.page = page;
        this.emailField = this.page.locator("#email");
        this.levelCheck = this.page.getByRole('radio');
        this.getwelcomeText = this.page.getByRole("heading", {name : "Bienvenue sur notre espace"});
        this.validationText = this.page.getByText('C\'est bon!');
    }

    async verifyWelcomeText(){
        await expect(this.getwelcomeText).toBeVisible();
    }

    async verifyValidationText(){
        await expect(this.validationText).toBeVisible();
    }

    async fillEmail(email:string){
        this.emailField.fill(email);
    }

    async checkLevel(){
        this.levelCheck.first().check();
    }

    async PressContinueButton() {
        await this.page.getByRole("button", { name: 'Continuer' }).click();
    }

}
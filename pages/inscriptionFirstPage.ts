import { Locator, Page, expect } from "@playwright/test";
import * as fs from "fs";

export class InscriptionFirstPage{
    readonly page: Page;
    readonly getCountry: Locator;
    readonly getExamCenter : Locator;
    readonly getCountryHeading : Locator;
    readonly getExamCenterHeading : Locator;
    


    constructor(page:Page){

        this.page = page;
        this.getCountry = page.locator('div').filter({ hasText: "Cameroun" });
        this.getCountryHeading = page.getByRole('heading', { name: "Choisissez votre pays"});
        this.getExamCenter = page.getByRole('radio');
        this.getExamCenterHeading = page.getByRole('heading', { name: 'Choisissez votre centre d’examen' });
    }

    async setCountryLocator(country:string){
        const Country = this.page.locator('div').filter({ hasText: country });
        return Country;
    }


    async verifyCountryHeading(){
        await expect(this.getCountryHeading).toBeVisible()
        
    }

    async verifyExamCenterHeading(){
      
        await expect(this.getExamCenterHeading).toBeVisible(); 
     }


    async selectCountry() {
        await this.getCountry.nth(3).click();   
      }
    
    async selectExamCenter() {
            await this.getExamCenter.first().check();   
        }

    async PressContinueButton() {
            await this.page.getByRole("button", { name: 'Continuer' }).click();
        }

}

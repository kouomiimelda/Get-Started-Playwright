import { Locator, Page, expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export class InscriptionThirdPage {

    private page: Page;
    readonly getPersonalInfoText : Locator;
    readonly lnameField : Locator;
    readonly fnameField : Locator;
    readonly telephone : Locator;
    readonly telephoneCountryCode : Locator;
    readonly dob : Locator;
    readonly checkGender : Locator;
    readonly originCountry : Locator;
    readonly pob : Locator;
    readonly residenceCity : Locator;
    readonly validationText : Locator;


    constructor(page:Page){

        this.page = page;
        this.getPersonalInfoText = this.page.getByRole('heading',{name : " Informations personnelles "}) ;
        this.lnameField = this.page.getByRole('textbox', { name: 'Noms (*) Prénoms (*)' });
        this.fnameField = this.page.locator("#prenom");
        this.telephone = this.page.getByRole('textbox', { name: '+XX XX XXX XXXX' })
        this.telephoneCountryCode = this.page.getByPlaceholder('Search Country');
        this.dob = this.page.getByRole('textbox', { name: 'Date de naissance (*)' });
        this.checkGender = this.page.getByRole("radio");
        this.originCountry = this.page.locator('div').filter({ hasText: /^Pays d'origine\(\*\)$/ }).getByRole('searchbox');
        this.pob = this.page.locator("#birthCity");
        this.residenceCity = this.page.locator('div').filter({ hasText: /^Ville de résidence \(\*\)$/ }).getByRole('searchbox');
        this.validationText = this.page.getByText('C\'est bon!', { exact: false });

    }



    async checkPersonalInfoText(){
        await expect(this.getPersonalInfoText).toBeVisible();
    }

    async fillLname(lname: string){
        await this.lnameField.fill(lname);
    }
    async fillFname(fname: string){
        this.fnameField.fill(fname);
    }

    async fillDob(dob: string){
        this.dob.fill(dob);
    }

    async CheckGender(gender: string){
        this.page.locator('div').filter({ hasText: gender}).getByRole('radio').first().check();
    }


    async fillTelephoneNumber( telCountryCode: string, telephone:string){



        await this.page.locator('uci-personnal-information-form img').click();
        //this.telephoneCountryCode.click();
        this.telephoneCountryCode.pressSequentially(telCountryCode);
        await this.page.getByText(telCountryCode).click();
        this.telephone.fill(telephone);
    }

    async fillOriginCountry(country:string){
         await this.originCountry.pressSequentially(country);
         this.page.getByRole('option', { name: country }).click();
    }

    async fillpob(pobName: string){
        this.pob.fill(pobName);
    }

    async fillResidenceCity(city:string){
         await this.residenceCity.fill(city);
         this.page.getByRole('option', { name: city }).click();
    }

    async verifyValidationText(){
        await expect(this.validationText).toBeVisible();
    }

}
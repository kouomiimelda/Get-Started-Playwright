import { Locator, Page, expect } from "@playwright/test";

export class Inscription{

    private readonly page: Page;
    constructor(page:Page){
        this.page = page;
        
    }

    async verifySession(){
    const SessionPeriodTextElement = this.page.getByRole('heading', { name: 'Session de : de Mai' });
    const isSessionPeriodVisible = await SessionPeriodTextElement.isVisible;
    expect(isSessionPeriodVisible).toBe(true);
    }

    async verifyDeadline(){
    const deadlineTextElement = this.page.getByRole('heading',{name : 'Date limite des inscriptions'});
    const isDeadlineTextVisible = await deadlineTextElement.isVisible;
    expect(isDeadlineTextVisible).toBe(true);
        
    }

    async verifyExamDate(){
        const examDateTextElement = this.page.getByRole('heading',{name : 'Date limite des inscriptions'});
        const isExamDateTextVisible = await examDateTextElement.isVisible;
        expect(isExamDateTextVisible).toBe(true);
        
    }

    async selectCountryAndRegion(){
    // selectionner le pays
    await this.page.locator('div').filter({ hasText: 'Cameroun' }).nth(3).click();
    //selectionner la ville 
    await this.page.locator('.form-input').first().check();
    // cliquer sur le bouton continuer
    await this.page.getByRole('button', { name: 'Continuer' }).click();
    }

    async continueButton(){
        await this.page.getByRole('button', { name: 'Continuer' }).click();
    }


    async emailAndCycle(email : string){

    await this.page.getByText('Centre selectionné : Douala').isVisible();
    await this.page.getByRole('textbox', { name: 'Adresse mail (*) :' }).fill(email);
    await this.page.locator('div').filter({ hasText: /^2ème Cycle$/ }).getByRole('radio').check();

    }

    async verifyPersonalInfoText(){

        // verifie la présence du texte informations personnelles dans l'entete
        const personalInfoTextElement = this.page.getByRole('heading', { name: 'Informations personnelles' });
        const isPersonalInfoTextVisible = await personalInfoTextElement.isVisible;
        expect(isPersonalInfoTextVisible).toBe(true);    
        }
    
    async PersonalInfo(personalinfo : any){

    //remplir le nom et le prenom
    await this.page.locator('#prenom').fill(personalinfo.firstname);
    await this.page.locator('#nom').fill(personalinfo.lastname);

    // selectionner le pays pour le code et remplir le numéro de téléphone
    await this.page.getByRole('textbox', { name: 'Search Country' }).fill(personalinfo.phoneCountry);
    await this.page.getByText('Cameroon (Cameroun)').click();
    await this.page.getByRole('textbox', { name: '+XXX X XX XX XX XX' }).fill(personalinfo.tel);

    //selectionner le genre
    await this.page.locator('div').filter({ hasText: /^Féminin$/ }).getByRole('radio').check();

    // remplir la date de naissance
    await this.page.getByRole('textbox', { name: 'Date de naissance (*)' }).fill(personalinfo.dob);

    //selectionner le pays d'origine 
    await this.page.locator('div').filter({ hasText: /^Pays d'origine\(\*\)$/ }).getByRole('searchbox').fill(personalinfo.country);
    await this.page.getByText(personalinfo.country).click();

    // remplir le lieu de naissance 
    await this.page.locator('#birthCity').fill(personalinfo.placeOfBirth);

    //selectionner la ville de residence
    await this.page.locator('div').filter({ hasText: /^Ville de résidence \(\*\)$/ }).getByRole('searchbox').fill(personalinfo.city);
    await this.page.getByRole('option', { name: personalinfo.city }).click();

}

    async complementaryInfoText(){
        const complementaryInfoText = this.page.getByRole('heading', { name: 'Informations complémentaires' });
        const complementaryInfoTextVisible = await complementaryInfoText.isVisible;
        expect(complementaryInfoTextVisible).toBe(true);
    }

    
    async fatherInfoText(){

        const fatherInfoText = this.page.locator('div').filter({ hasText: /^Informations du père$/ });
        const fatherInfoTextVisible = await fatherInfoText.isVisible;
        expect(fatherInfoTextVisible).toBe(true);
    }

    
    async motherInfoText(){

        const motherInfoText = this.page.locator('div').filter({ hasText: /^Informations de la mère$/ });
        const motherInfoTextVisible = await motherInfoText.isVisible;
        expect(motherInfoTextVisible).toBe(true);

    }

    async tutorInfoText(){
        const tutorInfoText = this.page.locator('div').filter({ hasText: /^Informations du tuteur$/ });
        const tutorInfoTextVisible = await tutorInfoText.isVisible;
        expect(tutorInfoTextVisible).toBe(true);
    }

    async fillFatherInfo(fatherName : string, fatherEmail : string, fatherTel : string, fatherCountry : string){

    await this.page.locator('#nom_pere').fill(fatherName);
    await this.page.getByRole('textbox', { name: 'Adresse mail(*)' }).fill(fatherEmail);
    await this.page.getByRole('textbox', { name: 'Search Country' }).fill(fatherCountry);
    await this.page.getByText(fatherCountry).click();
    await this.page.getByRole('textbox', { name: '+XXX X XX XX XX XX' }).fill(fatherTel);
    
    }

    async fillMotherInfo(motherName : string, motherEmail : string, motherTel : string, motherCountry : string){

        await this.page.locator('#nom_mere ,').fill(motherName);
        await this.page.getByRole('textbox', { name: 'Adresse mail(*)' }).fill(motherEmail);
        await this.page.getByRole('textbox', { name: 'Search Country' }).fill(motherCountry);
        await this.page.getByText(motherCountry).click();
        await this.page.getByRole('textbox', { name: '+XXX X XX XX XX XX' }).fill(motherTel);
        
        }



}
import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { InscriptionFirstPage} from "../pages/inscriptionFirstPage";
import { InscriptionSecondPage} from "../pages/inscriptionSecondPage";
import { InscriptionThirdPage} from "../pages/inscriptionThirdPage";

import  data from "../data/datasets.json";
import  personalData from "../data/personalInfo.json";

// import * as fs from "fs";

test("select country and exam for inscription", async ({ page }) => {
    // const testDataFilePath = "./data/datasets.json";
    // const data = fs.readFileSync(testDataFilePath, "utf-8");

    test.setTimeout(120_000);

    const homePage = new HomePage(page);
    const inscriptionFirstPage = new InscriptionFirstPage(page);
    const inscriptionSecondPage = new InscriptionSecondPage(page);
    const inscriptionThirdPage = new InscriptionThirdPage(page);


// navigation et verification des éléments sur la page d'accueil 
    await homePage.navigate();
    await page.waitForLoadState("load");
    await homePage.verifyHomePage();
    await homePage.verifyWelcomeText();
    await homePage.Register();

// Selection du pays et du centre d'examen  

    await inscriptionFirstPage.verifyCountryHeading();
    await inscriptionFirstPage.selectCountry();
    await inscriptionFirstPage.verifyExamCenterHeading();
    await inscriptionFirstPage.selectExamCenter();
    await inscriptionFirstPage.PressContinueButton();

// remplissage de l'email et choix du niveau 

    await inscriptionSecondPage.verifyWelcomeText();
    await inscriptionSecondPage.fillEmail(data.email);
    // await inscriptionSecondPage.verifyValidationText();
    await inscriptionSecondPage.checkLevel();
    // await inscriptionSecondPage.verifyValidationText();
    await inscriptionSecondPage.PressContinueButton();

// remplissage des informations personnelles 

    //validation de texte 
    await inscriptionThirdPage.checkPersonalInfoText();
    // await inscriptionThirdPage.verifyValidationText();
    //remplissage du prenom
    await inscriptionThirdPage.fillFname(personalData.firstname);
    // await inscriptionThirdPage.verifyValidationText();
    //remplissage du nom
    await inscriptionThirdPage.fillLname(personalData.lastname);
    // await inscriptionThirdPage.verifyValidationText();
    // choix du genre 
    await inscriptionThirdPage.CheckGender(personalData.gender);
    // await inscriptionThirdPage.verifyValidationText();

    //remplissage du numero de telephone
    await inscriptionThirdPage.fillTelephoneNumber(personalData.phoneCountry, personalData.tel);
    // await inscriptionThirdPage.verifyValidationText();

    // Remplissage de la date de naissance 
    await inscriptionThirdPage.fillDob(personalData.dob);
    // await inscriptionThirdPage.verifyValidationText();

    // remplissage du pays d'origine 
    await inscriptionThirdPage.fillOriginCountry(personalData.origincountry);
    // await inscriptionThirdPage.verifyValidationText();

    //remplissage du lieu de naissance
    await inscriptionThirdPage.fillpob(personalData.placeOfBirth);
    // await inscriptionThirdPage.verifyValidationText();

    //remplissage de la ville d'origine 
    await inscriptionThirdPage.fillOriginCountry(personalData.residenceCity);
    // await inscriptionThirdPage.verifyValidationText();

})






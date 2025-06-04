import { test } from "../fixtures/base.ts";
import  data from "../data/ConnexionData.json"; 
import * as allure from "allure-js-commons"; 
import { Severity } from "allure-js-commons";

// ...existing code...


test.describe.configure({ mode: 'parallel' });


test("Connexion reussi", async ({ HomePage,ConnexionPage,WelcomePage }) => {
    await allure.description("Ceci est un test de connexion réussi avec des données valides pour un étudiant.");
    await allure.label("testType", "E2E");
    await allure.severity(Severity.CRITICAL);
    await allure.feature("Connexion");
    await allure.epic("Authentification");
    await allure.label("author", "KOUOMI YAMDJEU Imelda");
    await allure.label("status", "done");
    // Navigation vers la page d'accueil et clique 
    await HomePage.login();
    // remplissage des informations de connexion et connexion
    await ConnexionPage.verifyConnexionWelcomeText();
    await ConnexionPage.fillEmail(data.student[0].email);
    await ConnexionPage.fillPassword(data.student[0].password);
    await ConnexionPage.connexion();
    // Vérification de la page d'accueil après connexion
    await WelcomePage.verifyConnexionWelcomeText();

})


test("Affichage des messages d'avertissement lors de la soumission du formulaire avec les champs vides", async ({ HomePage,ConnexionPage,WelcomePage }) => {
    await allure.description("Ceci est un test de connexion avec des champs vides pour un étudiant, vérifiant l'affichage des messages d'avertissement.");
    await allure.label("testType", "E2E");
    await allure.severity(Severity.NORMAL);
    await allure.feature("Connexion");
    await allure.epic("Authentification");
    // Navigation vers la page d'accueil et clique 
    await HomePage.login();
    // remplissage des informations de connexion et connexion
    await ConnexionPage.verifyConnexionWelcomeText();
    await ConnexionPage.fillEmail(data.student[1].email);
    await ConnexionPage.fillPassword(data.student[1].password);
    await ConnexionPage.verifyEmailWarningText();
    await ConnexionPage.verifyPasswordWarningText();  
    await ConnexionPage.connexionButtonDisabled();
})


import { test } from "../fixtures/base.ts";
import  data from "../data/ConnexionData.json";


test("Connexion process", async ({ HomePage,ConnexionPage,WelcomePage }) => {
 
    test.setTimeout(120_000);
    // Navigation vers la page d'accueil et clique 
    await HomePage.login();
    // remplissage des informations de connexion et connexion
    await ConnexionPage.fillEmail(data.email);
    await ConnexionPage.fillPassword(data.password);
    await ConnexionPage.connexion();
    // Vérification de la page d'accueil après connexion
    await WelcomePage.verifyConnexionWelcomeText();

})
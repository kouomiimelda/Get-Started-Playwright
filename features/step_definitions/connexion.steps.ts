import { Given, When, Then } from '@cucumber/cucumber'; 
import { expect } from '@playwright/test'; 
import { ConnexionPage } from '../../pages/ConnexionPage'; 
import { HomePage } from '../../pages/HomePage';
import { PageManager } from '../../support/pageManager';
import { WelcomePage } from '../../pages/WelcomePage';


let homePage: HomePage;
let connexionPage: ConnexionPage;
let welcomePage: WelcomePage;

// Background
// ---------------------------------

Given('l\'utilisateur accède à la page d\'accueil de l\'application', async function (){ 
  homePage = PageManager.homePage; 
  await homePage.navigate(); 
}); 

Given('il clique sur le bouton {string}', async function (buttonText: string) { 
   homePage = PageManager.homePage; 
   await homePage.login(buttonText);
});


Given('il est redirigé vers la page de connexion', async function () { 
  connexionPage = PageManager.connexionPage; 
  await connexionPage.verifyConnexionWelcomeText(); 
});


// Scénarios de connexion
// ---------------------------------
// Scenario 1

When('il remplit le champ email avec {string}', async function (email: string) { 
    connexionPage = PageManager.connexionPage; 
    await connexionPage.fillEmail(email); 
}); 

 
When('il remplit le champ mot de passe avec {string}', async function ( password: string) { 
    connexionPage = PageManager.connexionPage; 
    await connexionPage.fillPassword(password); 
}); 
 
 
 When('il clique sur le bouton de connexion {string}', async function (connexionButtonText: string) { 
    connexionPage = PageManager.connexionPage; 
    await connexionPage.connexion(connexionButtonText);
}); 
 
Then('il voit le message {string}', async function (expectedMessage: string) { 
    welcomePage = PageManager.welcomePage; 
    const message = await welcomePage.verifyConnexionWelcomeText(); 
    await expect(message).toHaveText(expectedMessage); 
});



// Scenario 2 

When('il laisse le champ {string} vide {string}', async function (champ: string, value: string) {
  connexionPage = PageManager.connexionPage;
  if (champ === 'email') {
    await connexionPage.fillEmail(value);
  } else if (champ === 'mot de passe') {
    await connexionPage.fillPassword(value);
  } else {
    throw new Error(`Champ non reconnu : ${champ}`);
  }
});


Then('il voit le message d\'erreur {string}', async function (expectedMessage: string) {
   connexionPage = PageManager.connexionPage;
  if (expectedMessage.includes('Email')) {
    const warningMessage = await connexionPage.verifyEmailWarningText();
    await expect(warningMessage).toHaveText(expectedMessage);
  } else {
      const warningMessage = await connexionPage.verifyPasswordWarningText();
      await expect(warningMessage).toHaveText(expectedMessage);
}
});


Then('le bouton de connexion est désactivé', async function () {
  connexionPage = PageManager.connexionPage;
  await connexionPage.connexionButtonDisabled();
})
;



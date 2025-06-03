import {test as base} from '@playwright/test';
import { ConnexionPage } from '../pages/ConnexionPage';
import { HomePage } from '../pages/HomePage';
import { WelcomePage } from '../pages/WelcomePage';

type MyFixtures = {
  ConnexionPage: ConnexionPage;
  HomePage: HomePage; 
  WelcomePage: WelcomePage; 
}

export const test = base.extend<MyFixtures>({
    // Define fixtures for ConnexionPage, HomePage, and WelcomePage
    // Define fixtures for the pages  


    HomePage: async ({ page }, use) => {
         test.setTimeout(120_000);
        // Initialize HomePage with the current page context
        const homePage = new HomePage(page);
        await homePage.navigate();
        await page.waitForLoadState("load");
        await homePage.verifyHomePage();
        await homePage.verifyWelcomeText();
        // Use the HomePage instance in tests
        await use(new HomePage(page));
    },

    ConnexionPage: async ({ page }, use) => {
        // Initialize ConnexionPage with the current page context
        // const connexionPage = new ConnexionPage(page);
        // await connexionPage.verifyConnexionWelcomeText();
        await use(new ConnexionPage(page));
    },

    WelcomePage: async ({ page }, use) => {
        await use(new WelcomePage(page));
    }
});
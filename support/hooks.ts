import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber'; 
import { chromium, Browser, Page, BrowserContext } from '@playwright/test'; 
import { CustomWorld } from './custom-world'; 
import { Context } from 'vm';
import { PageManager } from './pageManager';
 
let browser: Browser;
let page: Page;
let context: BrowserContext;
setDefaultTimeout(2 * 360 * 1000); // Définit le timeout par défaut à 60 secondes
 
BeforeAll(async () => { 
  console.log('[BeforeAll] Lancement du navigateur global Chromium...'); 
  browser = await chromium.launch({ headless: false }  );
  context = await browser.newContext(); // Création d'un contexte global
  page = await context.newPage(); // Création d'une page globale 
  PageManager.initialize(page); // Initialisation de PageManager avec le navigateur global

}); 
 
Before(async function (this: CustomWorld) { 
  console.log('[Before] Création d’un nouveau contexte et d’une page...'); 
  this.context = context; 
  this.page = page; 
}); 
 
// After(async function (this: CustomWorld) { 
//   console.log('[After] Fermeture de la page et du contexte...'); 
//   await this.page?.close(); 
//   // await this.context?.close(); 
// });

AfterAll(async () => { 
  console.log('[AfterAll] Fermeture du navigateur global Chromium...'); 
  browser.close();
});
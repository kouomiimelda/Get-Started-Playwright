// features/support/custom-world.ts 
import { Browser, BrowserContext, Page, chromium } from '@playwright/test'; 
import { IWorldOptions, setWorldConstructor, World } from 
'@cucumber/cucumber'; 
 
export class CustomWorld extends World { 
  browser!: Browser; 
  context!: BrowserContext; 
  page!: Page; 
  token?: string; // facultatif, on le remplira dans un hook ou une étape 
 
  constructor(options: IWorldOptions) { 
    super(options); 
  } 
 
  async initBrowser() { 
    this.browser = await chromium.launch({ headless: true }); 
    this.context = await this.browser.newContext(); 
    this.page = await this.context.newPage(); 
  } 
 
  async closeBrowser() { 
    await this.page?.close(); 
    await this.context?.close(); 
    await this.browser?.close(); 
  } 
} 

setWorldConstructor(CustomWorld); 
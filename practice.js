
const {chrome, chromium} = require('playwright');
const APP_URL = 'https://demo.playwright.dev/todomvc/';

async function runTest() {
    const browser = await chromium.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto(APP_URL);
    console.log('✓ Opened app');


    await page.fill('.new-todo', 'My todo');
    await page.press('.new-todo','Enter')
    console.log('✓ Added todo');
    await page.screenshot({path:'result.png'});
    console.log('✓ Screenshot saved');
    await browser.close();
}

runTest();
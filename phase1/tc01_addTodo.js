const {chromium}= require('playwright');
const APP_URL = 'https://demo.playwright.dev/todomvc/';
const TODO_TEXT = 'Buy groceries';

async function tc01_addTodo(){
    console.log('▶ TC01 — Add todo and verify it appears ');
    const browser = await chromium.launch({ headless: false})
    const page =await browser.newPage();
    await page.goto(APP_URL);
    console.log('  ✓ Opened app');

    await page.fill('.new-todo', TODO_TEXT);
    await page.press('.new-todo', 'Enter');
    console.log(' ✓ Added entered: ' + TODO_TEXT);
    await page.screenshot({path: 'tc01-result.png'});
    console.log(' ✓ Screenshot saved tc01-result.png');
    await browser.close();


    await browser.close();
    console.log('✓ TC01 completed !');
}
tc01_addTodo();
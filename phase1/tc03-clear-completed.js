const {chromium} = require('playwright');
const APP_URL = 'https://demo.playwright.dev/todomvc/';
const FIRST_TODO = 'Buy groceries';
const SECOND_TODO = 'Walk the dog';


async function tc03_clearCompleted() {
    console.log('▶ Verify "Clear completed" removes completed todos from the list');
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(APP_URL);
    console.log('  ✓ Opened app');

    await page.fill('.new-todo', FIRST_TODO);
    await page.press('.new-todo', 'Enter');
    await page.fill('.new-todo', SECOND_TODO);
    await page.press('.new-todo', 'Enter');
    console.log('  ✓ Added two todos');
    await page.screenshot({ path: 'tc03-twotodosadded.png' });
    console.log('  ✓ Screenshot saved: tc03-twotodosadded.png');

    await page.click('.todo-list li:first-child .toggle');
    console.log('  ✓ Marked first todo as completed');
    
    await page.screenshot({ path: 'tc03-firstcompleted.png' });
    console.log('  ✓ Screenshot saved: tc03-firstcompleted.png');

    await page.click('.clear-completed');
    console.log('  ✓ Clicked "Clear completed"');
    await page.screenshot({ path: 'tc03-result.png' });
    console.log('  ✓ Screenshot saved: tc03-result.png');

    await browser.close();
    console.log('✓ TC03 completed !');
}
tc03_clearCompleted();
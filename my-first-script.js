const { chromium } = require('playwright');

// Test data — stored as variables (not hardcoded in steps)
const APP_URL = 'https://demo.playwright.dev/todomvc/';
const TODO_ONE = 'Sprint planning';
const TODO_TWO = 'Code review';
const TODO_THREE = 'Deploy to staging';

// async = this function contains steps that take time
async function todoTest() {
  // Step 1: Open browser
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Step 2: Navigate to app
  await page.goto(APP_URL);
  console.log('✓ Opened app');

  // Step 3: Add two todos using our variables
  await page.fill('.new-todo', TODO_ONE);
  await page.press('.new-todo', 'Enter');
  await page.fill('.new-todo', TODO_TWO);
  await page.press('.new-todo', 'Enter');
  await page.fill('.new-todo', TODO_THREE);
  await page.press('.new-todo', 'Enter');
  console.log('✓ Added 3 todos');

  // Step 4: Take screenshot as evidence
  await page.screenshot({ path: 'challenge-all-todos.png' });
  console.log('✓ Screenshot saved');

  await page.click('.todo-list li:first-child .toggle');
  
  await page.screenshot({ path: 'challenge-one-done.png' });
  console.log('✓ Screenshot saved');
  //await browser.close();
  console.log('✓ Done!');
}

todoTest();

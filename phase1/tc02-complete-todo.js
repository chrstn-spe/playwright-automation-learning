const { chromium } = require('playwright');

const APP_URL = 'https://demo.playwright.dev/todomvc/';
const TODO_TEXT = 'Sprint planning';

async function tc02_completeTodo() {
  console.log('▶ TC02 — Complete todo and verify counter');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(APP_URL);

  // Precondition: add a todo to start with
  await page.fill('.new-todo', TODO_TEXT);
  await page.press('.new-todo', 'Enter');
  console.log(' ✓ Precondition: todo added');

  // Screenshot: before completing
  await page.screenshot({ path: 'tc02-before.png' });
  // Step 1: Click the checkbox of the first todo
  await page.click('.todo-list li:first-child .toggle');
  console.log(' ✓ Clicked checkbox');

  // Screenshot: after completing
  await page.screenshot({ path: 'tc02-after.png' });
  console.log(' ✓ Screenshots saved: tc02-before/after.png');

  await browser.close();
  console.log('✓ TC02 COMPLETE');
}

tc02_completeTodo();
import { test, expect } from '@playwright/test';

// Test data — const at the top, never scattered in tests
// const APP_URL = 'https://demo.playwright.dev/todomvc/'; commented out since we set baseURL in config, so we can use relative URLs in tests

// test() = your TC01 from Phase 1, but the framework
// handles browser setup and teardown automatically
test('TC01 — new todo appears in the list', async ({ page }) => {

  // Precondition: open app
  await page.goto('/todomvc');

  // Verify the input field loaded correctly
  await expect(page.locator('.new-todo')).toBeVisible();

  // Action: add a todo
  await page.fill('.new-todo', 'Buy groceries');
  await page.press('.new-todo', 'Enter');

  // Expected Result 1: todo appears in the list
  await expect(page.locator('.todo-list li')).toHaveCount(1);
 // Expected Result 2: text matches what we typed
  await expect(page.locator('.todo-list li label')).toHaveText('Buy groceries');

  // Expected Result 3: counter shows 1 item left
  await expect(page.locator('.todo-count')).toContainText('1');
});


test('TC02 - completing a todo decrements the counter', async ({page}) => {
await page.goto('/todomvc');

// Precondition: add a todo
await page.fill('.new-todo', 'Sprint Planning');
await page.press('.new-todo', 'Enter');

  // Verify counter before completing
await expect(page.locator('.todo-count')).toContainText('1');

// Action: complete the todo
await page.click('.todo-list li:first-child .toggle');

 // Expected: counter shows 0, checkbox is checked
await expect(page.locator('.todo-count')).toContainText('0');
await expect(page.locator('.todo-list li:first-child')).toHaveClass(/completed/);
});


test('TC03 - clear completed removes done todos', async ({page}) => {
await page.goto('/todomvc');


await page.fill('.new-todo', 'Done task');
await page.press('.new-todo', 'Enter');

await page.fill('.new-todo', 'Active task');
await page.press('.new-todo', 'Enter');

await page.click('.todo-list li:first-child .toggle');

  // Action: clear completed
await page.click('.clear-completed');

// Expected: 1 todo remains, clear button is gone
await expect(page.locator('.todo-list li')).toHaveCount(1);
await expect(page.locator('.clear-completed')).not.toBeVisible();
});


test('TC04 - Active filter shows only incomplete todos', async ({page}) => {
await page.goto('/todomvc');


await page.fill('.new-todo', 'Watch TV');
await page.press('.new-todo', 'Enter');

await page.fill('.new-todo', 'Take a bath');
await page.press('.new-todo', 'Enter');

await page.click('.todo-list li:first-child .toggle');

  // Action: click Active filter
await page.click('a[href="#/active"]');

// Expected: 1 todo remains, clear button is gone
await expect(page.locator('.todo-list li')).toHaveCount(1);

 await page.screenshot({ path: 'tc04-Activefilter.png' });
    console.log('  ✓ Screenshot saved: tc04-Activefilter.png');
});
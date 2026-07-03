import { test, expect } from '@playwright/test';

test('demo: toBeVisible', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Verify the input field is visible on load
  await expect(page.locator('.new-todo')).toBeVisible();
  console.log('✓ Input field is visible');

  // Add a todo and verify it appears
  await page.fill('.new-todo', 'Buy groceries');
  await page.press('.new-todo', 'Enter');

  await expect(page.locator('.todo-list li')).toHaveCount(1);
  console.log('✓ Todo list has 1 item');

  await expect(page.locator('.todo-list li')).toHaveText('Buy groceries');
  console.log('✓ Todo text matches expected');
});
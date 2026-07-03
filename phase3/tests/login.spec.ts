import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test('TC01 — successful login redirects to inventory (sauce_demo)', async ({ page }) => {
    // Precondition: open app
    await page.goto('/');

    // Verify the input field loaded correctly
    await expect(page.locator('#user-name')).toBeVisible();

    // Action: Fill in the username and password fields and click the login button
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await expect(page.locator('#login-button')).toBeEnabled();
    await page.click('#login-button');

    // Expected Result 1: Verify that the user is redirected to the inventory page
    await expect(page).toHaveURL(/inventory/);

    // Expected Result 2: Verify that the page contains Swag Labs
    await expect(page.locator('.app_logo')).toContainText('Swag Labs');

    // Expected Result 3: Verify that the page contains the inventory items
    await expect(page.locator('.inventory_item')).toHaveCount(6);
});

test('TC02 — wrong password shows error message', async ({ page }) => {

  await page.goto('/');

  await page.fill('#user-name', USERNAME);
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');

  // Expected: still on login page
  await expect(page).not.toHaveURL(/inventory/);

  // Expected: error message is shown
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});
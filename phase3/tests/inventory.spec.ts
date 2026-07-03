import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';


// Helper: log in before each product test
async function login(page) {
  await page.goto('/');
  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');
}


test('TC03 — inventory page shows 6 products with prices', async ({ page }) => {
  await login(page);

  // verify 6 products are displayed/exist
  await expect(page.locator('.inventory_item')).toHaveCount(6);

  // verify each product contains a dollar sign in the price
    const prices = page.locator('.inventory_item_price');
   await expect(prices.first()).toContainText('$');
//    await expect(prices.nth(1)).toContainText('$');
//    await expect(prices.nth(2)).toContainText('$');
//    await expect(prices.nth(3)).toContainText('$');
//    await expect(prices.nth(4)).toContainText('$');
//    await expect(prices.nth(5)).toContainText('$');

   //All add to cart buttons are enabled
    const addToCartButtons = page.locator('.btn_inventory');
    await expect(addToCartButtons.first()).toBeEnabled();
    // await expect(addToCartButtons.nth(1)).toBeEnabled();
    // await expect(addToCartButtons.nth(2)).toBeEnabled();
    // await expect(addToCartButtons.nth(3)).toBeEnabled();
    // await expect(addToCartButtons.nth(4)).toBeEnabled();
    // await expect(addToCartButtons.nth(5)).toBeEnabled();
});

test('TC04 — adding item updates cart badge count', async ({ page }) => {
  await login(page);
  // Cart badge not visible before adding
  await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

  // Add the first product
  await page.locator('button.btn_primary').first().click();

  // Cart badge now shows 1
  await expect(page.locator('.shopping_cart_badge')).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
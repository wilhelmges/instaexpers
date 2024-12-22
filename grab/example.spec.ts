import { test, expect } from '@playwright/test';

test('is insta', async ({ page }) => {
  await page.goto('https://www.instagram.com/accounts/login/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Login/);
});

test('go insta account', async ({ page }) => {
  await page.goto('https://www.instagram.com/accounts/login/');

  // Step 2: Log in with your credentials
  console.log('Logging into Instagram...');
  await page.fill('input[name="username"]', 'your_instagram_username'); // Replace
  await page.fill('input[name="password"]', 'your_instagram_password'); // Replace
  await page.click('button[type="submit"]');

  // Wait for navigation after login
  await page.waitForNavigation({ waitUntil: 'networkidle' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Login/);
});


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

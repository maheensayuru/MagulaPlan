const { test, expect } = require('@playwright/test');

// NOTE: All tests start pre-authenticated via storageState set in playwright.config.js
// The globalSetup logs in once and saves localStorage token to auth-state.json

test.describe('User Account Module', () => {

  test('TC-AUTH-01: Login page loads correctly (unauthenticated)', async ({ browser }) => {
    // Use a fresh context WITHOUT storageState to test unauthenticated login page
    const ctx = await browser.newContext({ storageState: undefined });
    const page = await ctx.newPage();
    await page.goto('http://localhost:5174/login');
    await expect(page.locator('form')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await ctx.close();
  });

  test('TC-AUTH-02: Valid credentials login redirects away from /login', async ({ browser }) => {
    const ctx = await browser.newContext({ storageState: undefined });
    const page = await ctx.newPage();
    await page.goto('http://localhost:5174/login');
    await page.waitForSelector('input[type="email"]', { timeout: 8000 });
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForFunction(() => !window.location.pathname.includes('/login'), { timeout: 12000 });
    expect(page.url()).not.toContain('/login');
    await ctx.storageState({ path: require('path').join(__dirname, '..', 'auth-state.json') });
    await ctx.close();
  });

  test('TC-AUTH-03: Wrong password shows error toast', async ({ browser }) => {
    const ctx = await browser.newContext({ storageState: undefined });
    const page = await ctx.newPage();
    await page.goto('http://localhost:5174/login');
    await page.waitForSelector('input[type="email"]', { timeout: 8000 });
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'wrongpassword999');
    await page.click('button[type="submit"]');
    // Toast appears with error message
    await expect(page.locator('body')).toContainText(/failed|invalid|wrong|error|incorrect/i, { timeout: 8000 });
    await ctx.close();
  });

  test('TC-AUTH-04: Session persists on reload (pre-authenticated)', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForTimeout(1500);
    await page.reload();
    await page.waitForTimeout(1500);
    expect(page.url()).not.toContain('/login');
  });

  test('TC-AUTH-05: Registration link on login page works', async ({ browser }) => {
    const ctx = await browser.newContext({ storageState: undefined });
    const page = await ctx.newPage();
    await page.goto('http://localhost:5174/login');
    await page.click('a[href="/register"]');
    await expect(page).toHaveURL(/register/, { timeout: 5000 });
    await ctx.close();
  });

  test('TC-AUTH-06: Registration page form loads', async ({ browser }) => {
    const ctx = await browser.newContext({ storageState: undefined });
    const page = await ctx.newPage();
    await page.goto('http://localhost:5174/register');
    await expect(page.locator('form')).toBeVisible({ timeout: 8000 });
    await ctx.close();
  });

  test('TC-AUTH-07: Profile page loads when authenticated', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForTimeout(1500);
    expect(page.url()).not.toContain('/login');
    await expect(page.locator('body')).not.toContainText('404', { timeout: 5000 });
  });

  test('TC-AUTH-08: Dashboard accessible when authenticated', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForTimeout(1500);
    expect(page.url()).not.toContain('/login');
  });

  test('TC-AUTH-09: No horizontal scroll at 375px on login page', async ({ browser }) => {
    const ctx = await browser.newContext({ storageState: undefined, viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    await page.goto('http://localhost:5174/login');
    await page.waitForTimeout(500);
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(380);
    await ctx.close();
  });

  test('TC-AUTH-10: No horizontal scroll at 768px on login page', async ({ browser }) => {
    const ctx = await browser.newContext({ storageState: undefined, viewport: { width: 768, height: 1024 } });
    const page = await ctx.newPage();
    await page.goto('http://localhost:5174/login');
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(773);
    await ctx.close();
  });

});

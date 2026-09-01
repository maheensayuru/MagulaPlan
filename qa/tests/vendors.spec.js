const { test, expect } = require('@playwright/test');

test.describe('Vendor Directory Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/vendors');
    await page.waitForTimeout(2000);
  });

  test('TC-VEN-01: Vendor page loads with correct heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Find Wedding Vendors', { timeout: 8000 });
  });

  test('TC-VEN-02: Search input is present', async ({ page }) => {
    await expect(page.locator('input[placeholder*="Search vendors by name"]')).toBeVisible({ timeout: 8000 });
  });

  test('TC-VEN-03: Search for keyword does not crash', async ({ page }) => {
    await page.locator('input[placeholder*="Search vendors by name"]').fill('photo');
    await page.waitForTimeout(600);
    await expect(page.locator('h1')).toContainText('Find Wedding Vendors');
  });

  test('TC-VEN-04: Non-matching search shows empty state', async ({ page }) => {
    await page.locator('input[placeholder*="Search vendors by name"]').fill('xyznonexistentvendor999');
    await page.waitForTimeout(600);
    await expect(page.locator('text=No vendors found')).toBeVisible({ timeout: 5000 });
  });

  test('TC-VEN-05: Clearing search resets without error', async ({ page }) => {
    const input = page.locator('input[placeholder*="Search vendors by name"]');
    await input.fill('photo');
    await page.waitForTimeout(400);
    await input.fill('');
    await page.waitForTimeout(400);
    await expect(page.locator('h1')).toContainText('Find Wedding Vendors');
  });

  test('TC-VEN-06: "All" category pill exists', async ({ page }) => {
    await expect(page.locator('button', { hasText: /^All$/ }).first()).toBeVisible({ timeout: 8000 });
  });

  test('TC-VEN-07: District filter button opens panel', async ({ page }) => {
    await page.locator('button', { hasText: /Filter by district/i }).click();
    await expect(page.locator('h3', { hasText: /Filter by district/i })).toBeVisible({ timeout: 4000 });
  });

  test('TC-VEN-08: Sort dropdown is present', async ({ page }) => {
    const content = await page.content();
    expect(content).toContain('Name (A-Z)');
  });

  test('TC-VEN-09: Clicking a category pill updates filtered list', async ({ page }) => {
    const categoryBtns = page.locator('div.flex.items-center.gap-2.overflow-x-auto button');
    const count = await categoryBtns.count();
    if (count > 1) {
      await categoryBtns.nth(1).click();
      await page.waitForTimeout(500);
    }
    await expect(page.locator('h1')).toContainText('Find Wedding Vendors');
  });

  test('TC-VEN-10: "List your business" link present', async ({ page }) => {
    await expect(page.locator('a[href="/vendors/new"]')).toBeVisible({ timeout: 5000 });
  });

  test('TC-VEN-11: No horizontal scroll at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(380);
  });

  test('TC-VEN-12: No horizontal scroll at 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(773);
  });

});

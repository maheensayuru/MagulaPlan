const { test, expect } = require('@playwright/test');

// All tests start pre-authenticated via storageState from playwright.config.js

test.describe('Budget Tracker Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/budget');
    await page.waitForTimeout(2000);
  });

  test('TC-BUD-01: Budget page loads with correct heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Budget Tracker', { timeout: 8000 });
  });

  test('TC-BUD-02: Add Item button is visible', async ({ page }) => {
    await expect(page.locator('button', { hasText: /Add Item/i })).toBeVisible({ timeout: 8000 });
  });

  test('TC-BUD-03: Can open Add Budget Item modal', async ({ page }) => {
    await page.locator('button', { hasText: /Add Item/i }).first().click();
    await expect(page.locator('text=Add Budget Item')).toBeVisible({ timeout: 5000 });
  });

  test('TC-BUD-04: Can add a budget item with all fields and it appears in list', async ({ page }) => {
    const itemName = 'QA Venue ' + Date.now();
    await page.locator('button', { hasText: /Add Item/i }).first().click();
    await page.waitForSelector('#itemName', { timeout: 5000 });
    await page.fill('#itemName', itemName);
    await page.fill('#category', 'Venue');
    await page.fill('#estimatedCost', '150000');
    await page.fill('#actualCost', '140000');
    await page.fill('#depositPaid', '50000');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator(`text=${itemName}`).first()).toBeVisible({ timeout: 8000 });
  });

  test('TC-BUD-05: Summary totals section visible (Estimated, Actual, Remaining)', async ({ page }) => {
    await expect(page.locator('text=Total Estimated')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('text=Total Actual')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('text=Remaining')).toBeVisible({ timeout: 8000 });
  });

  test('TC-BUD-06: Can delete a budget item', async ({ page }) => {
    const itemName = 'QA Del ' + Date.now();
    await page.locator('button', { hasText: /Add Item/i }).first().click();
    await page.waitForSelector('#itemName', { timeout: 5000 });
    await page.fill('#itemName', itemName);
    await page.fill('#category', 'Test');
    await page.locator('button[type="submit"]').click();
    await page.waitForSelector(`text=${itemName}`, { timeout: 8000 });
    const row = page.locator('tr', { hasText: itemName });
    await row.locator('button[aria-label="Delete"]').first().click();
    await page.waitForSelector('text=/cannot be undone|Delete/i', { timeout: 4000 });
    await page.locator('button', { hasText: /Delete|Confirm|Yes/i }).last().click();
    await expect(page.locator(`text=${itemName}`)).not.toBeVisible({ timeout: 8000 });
  });

  test('TC-BUD-07: Can edit a budget item', async ({ page }) => {
    const itemName = 'QA Edit ' + Date.now();
    const editedName = 'QA Edited ' + Date.now();
    await page.locator('button', { hasText: /Add Item/i }).first().click();
    await page.waitForSelector('#itemName', { timeout: 5000 });
    await page.fill('#itemName', itemName);
    await page.fill('#category', 'Test');
    await page.locator('button[type="submit"]').click();
    await page.waitForSelector(`text=${itemName}`, { timeout: 8000 });
    const row = page.locator('tr', { hasText: itemName });
    await row.locator('button[aria-label="Edit"]').first().click();
    await page.waitForSelector('#itemName', { timeout: 5000 });
    await page.fill('#itemName', editedName);
    await page.locator('button[type="submit"]').click();
    await expect(page.locator(`text=${editedName}`).first()).toBeVisible({ timeout: 8000 });
  });

  test('TC-BUD-08: Status options exist in form', async ({ page }) => {
    await page.locator('button', { hasText: /Add Item/i }).first().click();
    await page.waitForSelector('#itemName', { timeout: 5000 });
    const content = await page.content();
    expect(content).toContain('Planned');
    expect(content).toContain('Deposit Paid');
    expect(content).toContain('Fully Paid');
  });

  test('TC-BUD-09: No horizontal scroll at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/budget');
    await page.waitForTimeout(1000);
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(380);
  });

  test('TC-BUD-10: No horizontal scroll at 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/budget');
    await page.waitForTimeout(1000);
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(773);
  });

});

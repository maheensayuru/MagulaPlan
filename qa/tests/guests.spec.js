const { test, expect } = require('@playwright/test');

test.describe('Guest List Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/guests');
    await page.waitForTimeout(2000);
  });

  test('TC-GST-01: Guest list page loads with correct heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Guest List', { timeout: 8000 });
  });

  test('TC-GST-02: Add Guest button is visible', async ({ page }) => {
    await expect(page.locator('button', { hasText: /Add Guest/i }).first()).toBeVisible({ timeout: 8000 });
  });

  test('TC-GST-03: Can open Add Guest modal', async ({ page }) => {
    await page.locator('button', { hasText: /Add Guest/i }).first().click();
    await expect(page.locator('#guestName')).toBeVisible({ timeout: 5000 });
  });

  test('TC-GST-04: Can add a guest with all fields and verify in list', async ({ page }) => {
    const guestName = 'QA Guest ' + Date.now();
    await page.locator('button', { hasText: /Add Guest/i }).first().click();
    await page.waitForSelector('#guestName', { timeout: 5000 });
    await page.fill('#guestName', guestName);
    await page.fill('#contactNumber', '0771234567');
    await page.fill('#plusOnes', '1');
    await page.fill('#mealPreference', 'Vegetarian');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator(`text=${guestName}`).first()).toBeVisible({ timeout: 8000 });
  });

  test('TC-GST-05: Can edit a guest', async ({ page }) => {
    const guestName = 'QA Edit ' + Date.now();
    const editedName = 'QA Edited ' + Date.now();
    await page.locator('button', { hasText: /Add Guest/i }).first().click();
    await page.waitForSelector('#guestName', { timeout: 5000 });
    await page.fill('#guestName', guestName);
    await page.locator('button[type="submit"]').click();
    await page.waitForSelector(`text=${guestName}`, { timeout: 8000 });
    const row = page.locator('tr', { hasText: guestName });
    await row.locator('button[aria-label="Edit"]').first().click();
    await page.waitForSelector('#guestName', { timeout: 5000 });
    await page.fill('#guestName', editedName);
    await page.locator('button[type="submit"]').click();
    await expect(page.locator(`text=${editedName}`).first()).toBeVisible({ timeout: 8000 });
  });

  test('TC-GST-06: Can delete a guest', async ({ page }) => {
    const guestName = 'QA Del ' + Date.now();
    await page.locator('button', { hasText: /Add Guest/i }).first().click();
    await page.waitForSelector('#guestName', { timeout: 5000 });
    await page.fill('#guestName', guestName);
    await page.locator('button[type="submit"]').click();
    await page.waitForSelector(`text=${guestName}`, { timeout: 8000 });
    const row = page.locator('tr', { hasText: guestName });
    await row.locator('button[aria-label="Delete"]').first().click();
    await page.waitForSelector('text=/guest list|cannot be undone|Remove/i', { timeout: 4000 });
    await page.locator('button', { hasText: /Delete|Confirm|Yes|Remove/i }).last().click();
    await expect(page.locator(`text=${guestName}`)).not.toBeVisible({ timeout: 8000 });
  });

  test('TC-GST-07: Search guests input present', async ({ page }) => {
    await expect(page.locator('input[placeholder*="Search guests"]')).toBeVisible({ timeout: 8000 });
  });

  test('TC-GST-08: RSVP filter tabs present (All, Attending, Pending, Declined)', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'All' }).first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator('button', { hasText: 'Attending' }).first()).toBeVisible();
    await expect(page.locator('button', { hasText: 'Pending' }).first()).toBeVisible();
    await expect(page.locator('button', { hasText: 'Declined' }).first()).toBeVisible();
  });

  test('TC-GST-09: Share button visible in guest row', async ({ page }) => {
    const guestName = 'QA Shr ' + Date.now();
    await page.locator('button', { hasText: /Add Guest/i }).first().click();
    await page.waitForSelector('#guestName', { timeout: 5000 });
    await page.fill('#guestName', guestName);
    await page.locator('button[type="submit"]').click();
    await page.waitForSelector(`text=${guestName}`, { timeout: 8000 });
    await expect(page.locator('button', { hasText: /Share/i }).first()).toBeVisible({ timeout: 5000 });
  });

  test('TC-GST-10: Stat cards visible when guests exist', async ({ page }) => {
    const guestName = 'QA Stat ' + Date.now();
    await page.locator('button', { hasText: /Add Guest/i }).first().click();
    await page.waitForSelector('#guestName', { timeout: 5000 });
    await page.fill('#guestName', guestName);
    await page.locator('button[type="submit"]').click();
    await page.waitForSelector(`text=${guestName}`, { timeout: 8000 });
    await expect(page.locator('text=Total Guests')).toBeVisible({ timeout: 5000 });
  });

  test('TC-GST-11: No horizontal scroll at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(380);
  });

  test('TC-GST-12: No horizontal scroll at 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(773);
  });

});

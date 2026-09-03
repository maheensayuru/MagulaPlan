// Shared login helper — inject token directly into localStorage to avoid
// re-running the full login UI flow on every beforeEach
async function loginViaUI(page) {
  await page.goto('/login');
  await page.waitForSelector('input[type="email"]', { timeout: 10000 });
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForFunction(() => !window.location.pathname.includes('/login'), { timeout: 12000 });
  await page.waitForTimeout(500);
}

module.exports = { loginViaUI };

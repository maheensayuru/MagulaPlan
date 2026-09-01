const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 30000,
  globalSetup: './global-setup.js',
  reporter: [['list'], ['json', { outputFile: './test-results.json' }]],
  use: {
    baseURL: 'http://localhost:5174',
    // All tests start with the saved auth state — already logged in
    storageState: './auth-state.json',
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  outputDir: './screenshots',
  projects: [
    {
      name: 'desktop-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        storageState: './auth-state.json',
      },
    },
    {
      name: 'tablet-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 768, height: 1024 },
        storageState: './auth-state.json',
      },
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 812 },
        storageState: './auth-state.json',
      },
    },
  ],
});

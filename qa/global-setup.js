// global-setup.js — acquires a real auth token from the backend API directly
// (avoids headless browser UI login issues) and saves a storageState JSON
// that Playwright injects into localStorage before each test.
const { chromium } = require('@playwright/test');
const http = require('http');
const path = require('path');
const fs = require('fs');

function apiLogin() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ email: 'test@example.com', password: 'password123' });
    const req = http.request(
      {
        hostname: 'localhost',
        port: 8080,
        path: '/api/v1/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`Login failed: ${res.statusCode} ${data}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

module.exports = async function globalSetup() {
  console.log('[global-setup] Logging in via API...');
  const authData = await apiLogin();
  console.log(`[global-setup] Got token for userId=${authData.userId}`);

  // Build the storageState JSON that Playwright uses to pre-populate localStorage
  const storageState = {
    cookies: [],
    origins: [
      {
        origin: 'http://localhost:5174',
        localStorage: [
          { name: 'magulaplan_token', value: authData.token },
          { name: 'magulaplan_user', value: String(authData.userId) },
        ],
      },
    ],
  };

  const outPath = path.join(__dirname, 'auth-state.json');
  fs.writeFileSync(outPath, JSON.stringify(storageState, null, 2));
  console.log(`[global-setup] Auth state written to ${outPath}`);
};

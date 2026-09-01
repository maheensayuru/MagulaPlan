# MagulaPlan (Magula.lk) — InfinityFree Migration Guide

## 1. Hosting Architecture Overview
InfinityFree provides free web hosting powered by Apache, PHP 8.x, and MySQL/MariaDB with **no credit limits and unlimited bandwidth**.

Because **Spring Boot runs on a Java Virtual Machine (JVM)** (which shared PHP hosts like InfinityFree do not execute), the recommended deployment strategy is:
1. **Frontend (React 19 SPA):** Hosted on **InfinityFree** via static file upload into `htdocs/`.
2. **Backend API (Spring Boot 4.1):** Hosted on **Render / Railway / Oracle Cloud Free Tier** (or a free cloud VPS).
3. **Database:** Can connect to **InfinityFree MySQL** or **Aiven Cloud MySQL 8.4**.

---

## 2. Step-by-Step Frontend Migration to InfinityFree

### Step 1: Generate Optimized Production Build
From the `Magula.lk/frontend` directory, run:
```bash
npm run build
```
This produces a compiled, minified bundle inside `Magula.lk/frontend/dist/`.

---

### Step 2: Add `.htaccess` for Single Page Application (SPA) Routing
Inside `Magula.lk/frontend/dist/`, ensure an `.htaccess` file exists with the following configuration:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
*Why this is needed:* Without this `.htaccess` file, refreshing on child routes (such as `/vendors`, `/budget`, `/guests`) will result in a 404 error on Apache servers.

---

### Step 3: Upload Files to InfinityFree `htdocs/`
1. Log in to your [InfinityFree Dashboard](https://app.infinityfree.net/).
2. Select your hosting account and click **File Manager** (or connect via FileZilla FTP using the FTP Host, Username, and Password displayed on your account page).
3. Open the `htdocs/` directory.
4. Upload all files and folders located inside your local `Magula.lk/frontend/dist/` directly into `htdocs/`.
   - `index.html`
   - `assets/` (CSS, JS, images)
   - `favicon.png`
   - `.htaccess`

---

### Step 4: Configure Backend CORS Whitelist
In `Magula.lk/backend/src/main/java/com/zerostate/magulaplan/config/SecurityConfig.java`, ensure your InfinityFree domain is included in the allowed CORS origins:
```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",
    "https://magulaplan.netlify.app",
    "http://your-subdomain.infinityfreeapp.com",
    "https://your-subdomain.infinityfreeapp.com"
));
```
Deploy the updated backend to Render or restart the instance.

---

### Step 5: Verification & Testing
1. Visit your InfinityFree URL in the browser (e.g., `http://your-subdomain.infinityfreeapp.com`).
2. Verify that the landing page renders smoothly.
3. Test logging in with `admin@magulaplan.lk` / `Admin@123` or `test@magulaplan.lk` / `Password@123`.
4. Test navigating between `/vendors`, `/budget`, and `/guests`.

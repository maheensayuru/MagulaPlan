# Session Handover — MagulaPlan

> Handover for continuing in a new session. Last updated: 01 Sep 2026.

## 1. Project Identity

- **Repo:** `maheensayuru/MagulaPlan` (private, monorepo)
- **Product:** MagulaPlan — wedding planning platform (scope: **wedding-only**, Sri Lanka)
- **Stack:** React 19 + Vite 8 + Tailwind 3.4 (frontend) · Java 17 + Spring Boot 4.1 + Spring Security + MySQL (backend) · package `com.zerostate.magulaplan`
- **Theme:** Storybook Romance & Modern Editorial (Deep Rose Quartz / Velvet Maroon `#721F3A`, Blush Pink `#F9E3E7`, Muted Sage Green `#5F856D`, Crisp White `#FFFFFF`)
- **Auth (actual):** UUID session tokens in `users.session_token`, validated by `SessionTokenAuthenticationFilter`; passwords **BCrypt-hashed**. **Not JWT** (the PM plan says "JWT" — it's session tokens; be ready to explain that).
- **Team:** Maheen (PM/deploy/docs) · Amanda (backend) · Dileepa (frontend) · Sammani/Ruhini (DB) · Ruchira (QA)

---

## 2. Live URLs & Credentials

- **Frontend (Live):** `https://magulaplan.netlify.app` (backend CORS allows `https://magulaplan.netlify.app` and `http://localhost:5173`)
- **Frontend (Local Dev):** `http://localhost:5173` (with persistent background runner & 0.0.0.0 host binding)
- **Backend (Live):** `https://magulaplan-api.onrender.com`
- **Admin login:** `admin@magulaplan.lk` / `Admin@123` (role=ADMIN; seeded plain-text, upgraded to BCrypt on first login)
- **Test login:** `deploytest@example.com` / `pw12345` (userId = 1) or `test@magulaplan.lk` / `Password@123` (TestAccountInitializer)
- **MySQL (Aiven):** host `mysql-219a3283-m4h33n.aivencloud.com`, port `27680`, user `avnadmin`, db **`defaultdb`** (NOT `magulaplan_db`), SSL required. **Free tier powers off on inactivity — power it on before any demo, or the backend 500s.**
- **Jira Board:** `https://magulaplan.atlassian.net/jira/software/projects/MAG/boards/1` (Auth: `maheen.sayuru21@gmail.com`)

---

## 3. Git & Branch State

- **`main`**: Up to date with previous Sprint 3 backend enhancements and initial frontend features.
- **`refactor/ui-redesign-storybook-romance`**: Complete UI/UX redesign featuring:
  - Storybook Romance & Modern Editorial design tokens in Tailwind.
  - Zero EM dashes across all copy, meta, and code.
  - Resilient seed fallback dataset (`src/data/seedVendors.js` with 13 real Sri Lankan vendors & 8 categories) so pages never render empty when offline.
  - High-res curated wedding photography (`hero-traditional.jpg`, `login-editorial.jpg`).
  - Hardened Context providers & hook exports (`CartContext`, `AuthContext`, `ToastContext`).
  - Clean modular commits (7 commits pushed to remote).
- **`fix/MAG-17-critical-defects` (Ruchira Nimnaka / PR #37)**:
  - QA system testing artifacts (`qa/` Playwright test suite, defect register, test summary).
  - Bug fixes: `SessionTokenAuthenticationFilter` role prefixing, `TestAccountInitializer`, `api.js` login 401 handling, `userId` payload association on budget/guests.
  - **MAG-34** E2E share invitation test suite (`qa/tests/share-invitation.spec.js`).
  - Tested: **100% clean merge into main with 0 conflicts, 139 backend tests passing, 13 frontend tests passing**.

---

## 4. Completed Work

- **Backend CRUD:** User, Guest, Budget, Vendor, VendorCategory (Spring Boot 4.1).
- **Auth:** Register/login + session-token filter (MAG-27) + BCrypt hashing (MAG-32).
- **Vendor System:** Rich fields (`imageUrl`, `rating`, `reviewCount`, `verified`, `featured`), approval workflow (`status=PENDING/APPROVED/REJECTED`), and fallback seeding.
- **Wedding Planning Features:** Budget tracking with Recharts spend breakdown, Guest list with RSVP & digital WhatsApp invitation sharing, Poruwa ceremony checklist, Wedding day run-of-show timeline.
- **Frontend Architecture:** Clean React 19 + Tailwind 3.4 SPA, route-level code splitting, accessible ARIA modals/tabs/dropdowns, responsive mobile bottom app bar.
- **Quality Assurance (MAG-17 & MAG-34):** 
  - 132 automated test runs across 3 viewports (375px, 768px, 1280px) ➜ 100% PASS.
  - Defect Register with 5/5 defects resolved and verified.
  - Dedicated E2E share invitation test suite.
- **Test Suite Status:** 
  - **Backend:** 139/139 JUnit tests passing (`BUILD SUCCESS`).
  - **Frontend:** 13/13 Vitest tests passing.

---

## 5. Jira Project Status (30 / 31 Tickets Done)

| Ticket | Summary | Owner | Status |
|---|---|---|---|
| **MAG-1** to **MAG-11** | Sprint 1 & 2 Core Backend, Database, Auth, and Initial UI | Various | ✅ **Done** |
| **MAG-15** | Deploy React Frontend to Netlify/Vercel | Maheen | ✅ **Done** |
| **MAG-16** | Deploy Backend to Render + Aiven MySQL | Maheen | ✅ **Done** |
| **MAG-17** | System Testing & Defect Management (QA) | Ruchira | ✅ **Done** |
| **MAG-19** | Spring Security & Token Authentication | Amanda | ✅ **Done** |
| **MAG-20** | Frontend-Backend API Integration | Dileepa | ✅ **Done** |
| **MAG-21** | Database Verification on Production | Ruhini | ✅ **Done** |
| **MAG-22** to **MAG-26** | Budget Tracker, Auth UI, Guest UI, Vendor Rich Models, UI Polish | Dileepa / Amanda | ✅ **Done** |
| **MAG-27** to **MAG-33** | Bearer Token Validation, Summary Endpoints, Booking Cart, Password Hashing, Data Seed | Various | ✅ **Done** |
| **MAG-34** | E2E Share Invitation Test Suite (Link Gen, Clipboard, Mobile Trigger) | Ruchira | ✅ **Done** |
| **MAG-18** | Final Documentation Compilation & Presentation Slides | Maheen | ⏳ **To Do** (Only remaining ticket) |

---

## 6. Next Steps for Next Session

1. **Merge PR #37 (`fix/MAG-17-critical-defects`)** and **`refactor/ui-redesign-storybook-romance`** into `main` via GitHub pull requests.
2. **Execute MAG-18 (Project Management Deliverables):**
   - Finalize Sprint 2 & Sprint 3 Review Reports with velocity metrics.
   - Finalize System Design Report (Architecture, ER Diagram, API Spec).
   - Generate End-of-Semester Presentation Slides (10-15 slides).
   - Export PM Plan and Documentation as PDF for submission.
   - Move **MAG-18** to **Done** to achieve 100% project completion.

---

## 7. Useful Verification Commands

```bash
# 1. Frontend verification
cd frontend
npm test                # 13 Vitest tests
npm run build           # Vite production build (0 errors)

# 2. Backend verification
cd ../backend
cmd.exe /c mvnw.cmd test   # 139 JUnit tests (100% pass)

# 3. Live API smoke tests
curl https://magulaplan-api.onrender.com/api/v1/vendor-categories
curl https://magulaplan-api.onrender.com/api/v1/vendors
```

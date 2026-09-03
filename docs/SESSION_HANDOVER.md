# Session Handover — MagulaPlan (Project Complete)

> Final Project Completion Handover. Last updated: 01 Sep 2026.

## 1. Project Identity

- **Repo:** `maheensayuru/MagulaPlan` (monorepo)
- **Product:** MagulaPlan — wedding planning platform (scope: **wedding-only**, Sri Lanka)
- **Stack:** React 19 + Vite 8 + Tailwind 3.4 (frontend) · Java 17 + Spring Boot 4.1 + Spring Security + MySQL 8.4 (backend) · package `com.zerostate.magulaplan`
- **Theme:** Storybook Romance & Modern Editorial (Deep Rose Quartz / Velvet Maroon `#721F3A`, Blush Pink `#F9E3E7`, Muted Sage Green `#5F856D`, Crisp White `#FFFFFF`)
- **Auth:** UUID session tokens in `users.session_token`, validated by `SessionTokenAuthenticationFilter`; passwords **BCrypt-hashed**.
- **Team & Holistic Contributions:** 
  - Maheen Ranasinghe (Project Manager / Full-Stack & DevOps): **21.0%**
  - Amanda Lakmal (Backend Lead Developer): **21.0%**
  - Dileepa Ranathunga (UI/UX Lead & Frontend Developer): **20.0%**
  - K.A. Ruhini Dayanjalee Sammani (Database Engineer & Business Analyst): **19.0%**
  - V.G. Ruchira Nimnaka (Quality Assurance Lead Engineer): **19.0%**

---

## 2. Live URLs & Verification Credentials

- **Frontend (Primary Live Mirror):** `https://magulaplan.infinityfreeapp.com/?i=1`
- **Frontend (Edge CDN):** `https://magulaplan.netlify.app`
- **Frontend (Local Dev):** `http://localhost:5173`
- **Backend (Live Production API):** `https://magulaplan-api.onrender.com`
- **Admin Login:** `admin@magulaplan.lk` / `Admin@123` (role=ADMIN)
- **Couple Demo Login:** `test@magulaplan.lk` / `Password@123` (role=USER)
- **Vendor Demo Login:** `vendor@magulaplan.lk` / `Vendor@123` (role=VENDOR)
- **MySQL Cloud (Aiven):** host `mysql-219a3283-m4h33n.aivencloud.com`, port `27680`, user `avnadmin`, db `defaultdb`
- **Jira Board:** `https://magulaplan.atlassian.net/jira/software/projects/MAG/boards/1` (Viewer access granted to `chamathkara.k@sltc.ac.lk`)
- **Automated Tests:** 142 JUnit 5 backend tests (100% pass) · 13 Vitest frontend tests (100% pass)
---

## 3. Project Status (31 / 31 Jira Tickets Completed — 100% Done)

| Ticket | Summary | Owner | Status |
|---|---|---|:---:|
| **MAG-1** | Design MySQL ER Diagram | Ruhini | ✅ **Done** |
| **MAG-2** | Map REST API Routes | Amanda | ✅ **Done** |
| **MAG-3** | Design UI Wireframes in Figma | Dileepa | ✅ **Done** |
| **MAG-4** | Set up GitHub Monorepo | Maheen | ✅ **Done** |
| **MAG-5** | Draft Project Management Plan & Sprint Schedule | Maheen | ✅ **Done** |
| **MAG-6** | Dashboard & Countdown UI | Dileepa | ✅ **Done** |
| **MAG-7** | Categorized Vendor Directory UI | Dileepa | ✅ **Done** |
| **MAG-8** | Create MySQL Database Tables & Constraints | Ruhini | ✅ **Done** |
| **MAG-9** | Budget and Guest List REST APIs | Amanda | ✅ **Done** |
| **MAG-10** | Automated JUnit Tests for Backend Services | Ruchira | ✅ **Done** |
| **MAG-11** | Share Digital Invitations via Web Share API | Maheen | ✅ **Done** |
| **MAG-15** | Deploy React Frontend to Netlify | Maheen | ✅ **Done** |
| **MAG-16** | Deploy Backend to Render + Aiven MySQL | Maheen | ✅ **Done** |
| **MAG-17** | System Testing & Defect Management (QA) | Ruchira | ✅ **Done** |
| **MAG-18** | Final Documentation Compilation & Presentation Slides | Maheen | ✅ **Done** |
| **MAG-19** | Spring Security & Session Token Filter | Amanda | ✅ **Done** |
| **MAG-20** | Frontend-Backend API Integration | Dileepa | ✅ **Done** |
| **MAG-21** | Production Database Schema Verification | Ruhini | ✅ **Done** |
| **MAG-22** | Budget Tracker Page & Recharts Visualizations | Dileepa | ✅ **Done** |
| **MAG-23** | Authentication UI & Protected Routes | Dileepa | ✅ **Done** |
| **MAG-24** | Guest List CRUD UI & Modals | Dileepa | ✅ **Done** |
| **MAG-25** | Vendor Data Model Enrichment (Ratings/Reviews) | Amanda | ✅ **Done** |
| **MAG-26** | Storybook Romance UI Redesign & Cart Drawer | Dileepa | ✅ **Done** |
| **MAG-27** | Bearer Token Filter on Protected Endpoints | Amanda | ✅ **Done** |
| **MAG-28** | Budget Summary Aggregation Endpoint | Maheen | ✅ **Done** |
| **MAG-29** | Vendor Multi-District Filter & Search Endpoints | Maheen | ✅ **Done** |
| **MAG-30** | Multi-Vendor Cart Booking Checkout | Amanda | ✅ **Done** |
| **MAG-31** | Guest RSVP Status PATCH Endpoint | Maheen | ✅ **Done** |
| **MAG-32** | BCrypt Password Cryptography | Amanda | ✅ **Done** |
| **MAG-33** | Production Data Seeding with Real Vendor Images | Ruhini | ✅ **Done** |
| **MAG-34** | E2E Share Invitation Test Suite Execution | Ruchira | ✅ **Done** |

---

## 4. Completed Feature & Bug Fix Highlights

1. **Commercial Vendor Portal & Monetization:** Implemented public vendor self-registration, 3-tier commercial plan selection (Free LKR 0, Pro LKR 2,500/mo, Featured LKR 5,000/mo), interactive simulated payment sandbox modal, and dedicated `/vendor/dashboard` with incoming couple cart leads and profile editor.
2. **Public Invitee Digital RSVP Portal:** Created standalone public guest portal (`/rsvp/:guestId`) with attendance and dietary meal preference submission. Updated `GuestServiceImpl` to dynamically generate active domain links.
3. **IDOR & Cross-Tenant Access Protection:** Gated budget items, guest lists, and vendor profiles so authenticated users cannot access or tamper with other tenants' records; added unit tests proving 403 Forbidden denial.
4. **Guest & Budget Association Fix:** Resilient user resolution in `GuestServiceImpl` and `BudgetItemServiceImpl` prevents null user exceptions; added `PUT /api/v1/users/me` endpoint.
## 5. Verification Commands

```bash
# 1. Frontend Test Suite
cd frontend
npm test                # 13 Vitest tests (100% pass)
npm run build           # Vite production build (0 errors)

# 2. Backend Test Suite
cd ../backend
cmd.exe /c mvnw.cmd test   # 139 JUnit tests (100% pass)
```

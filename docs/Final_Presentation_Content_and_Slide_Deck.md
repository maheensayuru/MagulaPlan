# MagulaPlan (Magula.lk) — Final Presentation Slide Deck Guide

## Slide Overview (12–15 Slide Master Outline)

---

### Slide 1: Title & Team Introduction
- **Title:** MagulaPlan (Magula.lk)
- **Subtitle:** All-in-One Digital Wedding Planning Platform for Sri Lanka
- **Module:** CCS2313 - Software Engineering & Project Management
- **Group:** Group 04
- **Team Members:**
  - M.S. Ranasinghe (Project Manager / Full-Stack & DevOps) — CIT-24-02-0189
  - S.A.A. Lakmal (Backend Lead Developer) — CIT-24-02-0007
  - A.G.D.N. Ranathunga (UI/UX Lead & Frontend Developer) — CIT-24-02-0046
  - K.A.R.D. Sammani (Database Engineer & Business Analyst) — CIT-24-02-0058
  - V.G. Ruchira Nimnaka (Quality Assurance Lead Engineer) — CIT-24-02-0029

---

### Slide 2: Project Proposal (Problem & Market Need)
- **Core Real-World Problems:**
  - 6–12 months of uncoordinated manual planning across 15+ disconnected vendor categories.
  - Opaque pricing, word-of-mouth reliance, and hidden wedding costs.
  - Manual Excel budget calculation errors and chaotic Poruwa/family guest coordination.
- **Market Opportunity:**
  - Over 100,000+ weddings annually in Sri Lanka.
  - Rapid shift toward mobile-first digital solutions with zero existing localized wedding platforms.

---

### Slide 3: The Proposed Solution — MagulaPlan
- **Core Value Proposition (3-Role B2B2C Marketplace):**
  - **Couples:** Centralized marketplace for verified Sri Lankan wedding vendors across 25 districts, real-time budget analytics, Poruwa ceremony checklists, and digital WhatsApp RSVP sharing.
  - **Commercial Vendors:** Self-service registration, 3-tier commercial hosting plans (Free / Pro / Featured), sandbox payment gateway, customer booking leads tracking, and business profile management.
  - **Administrators:** Centralized platform overview, vendor listing approvals/rejections, badge governance, and user safety moderation.
  - Multi-vendor shopping cart and booking checkout engine connecting couples with vendors.

---

### Slide 4: High-Level 3-Tier System Architecture (MANDATORY)
*(Visual Reference: `docs/High_Level_Architecture_Diagram.png` & Slide 5/9)*
- **Client Tier:** React 19 SPA, Tailwind CSS 3.4, Recharts, Event Countdown Timer, Commercial Vendor Portal (`/vendor/dashboard`), Admin Moderation Suite (`/admin`).
- **Application Tier:** Spring Boot 4.1, Spring Security 6 RBAC (`ROLE_USER`, `ROLE_VENDOR`, `ROLE_ADMIN`), IDOR Tenant Ownership Protection, Session Token Filter, BCrypt Cryptography.
- **Data Tier:** MySQL 8.4 Relational Database, Spring Data JPA 3.4 / Hibernate 7.4, 7 Normalized Relational Tables, Self-Healing Startup Seeding.
---

### Slide 5: System Features & UI Highlights
- **Couple Planning Suite:** Real-time budget tracker, countdown timer, digital RSVP manager, and WhatsApp invitation generator.
- **Vendor Commercial Portal:** Dedicated `/vendor/dashboard` with customer inquiry leads, listing profile editor, and interactive plan tier upgrade modal.
- **Commercial Monetization Gateway:** 3-tier plan selector (Free LKR 0, Pro LKR 2,500/mo, Featured LKR 5,000/mo) with simulated card payment sandbox.
- **Vendor Directory & Rich Filters:** Search by name, category, district, and starting price with verified checkmark and gold badges.
- **Admin Moderation Portal:** Vendor approval queue, platform KPI metrics, and user safety suspension controls.
---

### Slide 6: Agile Project Management & Jira Sprint Execution
- **Methodology:** 3 two-week Agile sprints managed via Atlassian Jira Kanban board.
- **Sprint 1:** Architecture, MySQL Relational DB Modeling, Base Auth, Wireframes (100% Done).
- **Sprint 2:** Core Feature CRUD, Budget Tracker, Guest List, Vendor Marketplace (100% Done).
- **Sprint 3:** Security Hardening (BCrypt), Web Share API, UI Redesign, QA Testing (100% Done).
- **Jira Status:** 31 / 31 Tickets completed.

---

### Slide 7: Risk Management & Technical Decisions
- **Strategic Pivot 1 (WhatsApp):** Avoided Meta Business API costs ($0.05/msg) by utilizing native Web Share API + Click-to-Chat deep links.
- **Strategic Pivot 2 (Auth & Security):** Upgraded from plain-text tokens to cryptographically secure UUID session tokens + BCrypt password hashing.
- **Strategic Pivot 3 (Cloud DB):** Deployed resilient connection pooling and fallback seed datasets to mitigate free-tier database sleep timeouts.

---

### Slide 8: Cost Estimation & Project Budget (Planned vs. Actual)
*(Insert summary from `Cost_Estimation_and_Budget.md`)*
- **Planned Development Budget:** LKR 861,500
- **Actual Development Cost:** LKR 720,000 *(100% Human Resource Effort)*
- **Overall Project Savings:** **LKR 141,500 (16.4% Savings)** achieved via lean free-tier cloud architecture.
- **Business Model:** Freemium Pro Vendor Badges (LKR 2,500–5,000/mo) + 2.5%–5% booking commissions.

---

### Slide 9: Quality Assurance & Testing Verification
- **Automated Backend Tests:** **142 / 142 JUnit 5 Tests Passing (100% Pass Rate)**, including dedicated VendorSecurityIntegrationTest suite.
- **Frontend Unit Tests:** **13 / 13 Vitest Tests Passing (100% Pass Rate)**.
- **System Test Plan:** 55 manual and end-to-end test scenarios documented in `MagulaPlan_Test_Cases.md`.
- **E2E Automation:** Playwright regression suite testing mobile and desktop viewports, link generation, and clipboard copying.
---

### Slide 10: Individual Member Contributions (25 Marks)
*(Insert table and pie chart from `Individual_Member_Contributions.md`)*
- **Maheen Ranasinghe (21.0%):** Project Management, Cloud DevOps, Budget/RSVP APIs.
- **Amanda Lakmal (21.0%):** Spring Boot Architecture, Spring Security, BCrypt Hashing.
- **Dileepa Ranathunga (20.0%):** UI/UX Design, React 19 Frontend SPA, Countdown Timer.
- **Ruhini Dananjali (19.0%):** MySQL Relational DB Schema, ER Modeling, Data Seeding, BA Specs.
- **Ruchira Nimnaka (19.0%):** 139 JUnit Tests, 46 System Test Cases, QA Defect Management.

---

### Slide 11: Future Upgrades & Product Roadmap
- **Phase 1 (Q4 2026):** PayHere / Stripe Online Payment Gateway & advance booking deposits.
- **Phase 2 (Q1 2027):** Dedicated Vendor Management Portal with availability calendars & direct chat.
- **Phase 3 (Q2 2027):** AI Astrological Nekath Ceremony Generator & 2D Banquet Seating Chart.

---

### Slide 12: Conclusion & Q&A
- **Live Deployments:**
  - Primary Live Frontend (InfinityFree): `https://magulaplan.infinityfreeapp.com/?i=1`
  - Edge CDN Frontend (Netlify): `https://magulaplan.netlify.app`
  - Backend REST API (Render): `https://magulaplan-api.onrender.com`
  - GitHub Repository: `https://github.com/maheensayuru/MagulaPlan`
- **Demo Credentials:**
  - Admin: `admin@magulaplan.lk` / `Admin@123` (Role: `ADMIN`)
  - Couple: `test@magulaplan.lk` / `Password@123` (Role: `USER`)
  - Vendor: `vendor@magulaplan.lk` / `Vendor@123` (Role: `VENDOR`)
- **Summary:** MagulaPlan delivers a fully demonstrable, multi-role B2B2C wedding commerce platform with operational customer discovery, commercial vendor monetization, and administrative governance.

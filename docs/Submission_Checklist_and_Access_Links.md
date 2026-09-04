# MagulaPlan (Magula.lk) — Submission Checklist & Access Links

In accordance with the **CCS2313 Project Management — Additional Submission Guidelines**, this document compiles all required external links, repository access, and verification credentials into a single reference document.

---

## 1. Required Links & Access Configuration

### 1.1 Figma File
- **Link:** `https://www.figma.com/design/Mqc0NW1ampHiNFoExxsvo1/MagulaPlan-%E2%80%94-Wedding-Planning-Platform?node-id=0-1&t=6fczkcZM1hWyjF52-1`
- **Access Level:** Configured as **"Anyone with the link can view"** (No invite or account needed).
- **Repository Backups:** Also available in repository at `docs/MagulaPlan Wireframes.pdf` and `docs/MagulaPlan Wireframes(Mobile).pdf`.
---

### 1.2 GitHub Repository
- **Link:** `https://github.com/maheensayuru/MagulaPlan`
- **Visibility:** Set to **Public**.
- **Branches:** `main` (Production release), `refactor/ui-redesign-storybook-romance` (Active feature branch).
- **Sanitization Audit:** Verified that all `.env` secrets, database root passwords, and private API keys have been removed from tracking.

---

### 1.3 Jira Project Direct Access
- **Project URL:** `https://magulaplan.atlassian.net/jira/software/projects/MAG/boards/1`
- **Assigned Evaluator Email:** `chamathkara.k@sltc.ac.lk`
- **Access Granted:** Added as **Viewer** under Jira Cloud $\rightarrow$ *Project Settings* $\rightarrow$ *People* $\rightarrow$ *Add People*.

---

### 1.4 Test Cases Documentation
- **Source Artifact:** `Magula.lk/docs/MagulaPlan_Test_Cases.md` & `qa/test-summary.md`
- **Coverage:** **142 automated JUnit backend tests (100% pass)** + **13 automated Vitest frontend tests (100% pass)** + 46 comprehensive system test scenarios across 7 functional modules.
- **Online Link:** `[Insert Google Docs / Sheets View Link here]` (Set to *"Anyone with the link can view"*).

---

### 1.5 Functional & Non-Functional Requirements Document
- **Source Artifact:** `MagulaPlan_Complete_Project_Development_Documentation.docx` (Sections 3, 4, 16, 17).
- **Online Link:** `[Insert Google Doc View Link here]` (Set to *"Anyone with the link can view"*).

---

### 1.6 High-Level Architecture Diagram
- **Source Artifacts:** `Magula.lk/docs/High_Level_Architecture_Diagram.png` (High-Res 300 DPI Rendering), `Magula.lk/docs/High_Level_Architecture_Diagram.md`, and `MagulaPlan_Presentation.pptx` (Slide 5 & Slide 9).
- **Online Link:** `[Insert Google Drive / Figma / Miro Architecture View Link here]` (Set to *"Anyone with the link can view"*).

---

## 2. Live Deployment Endpoints & Demo Credentials

| Endpoint / Resource | Live URL | Notes / Configuration |
|---|---|---|
| **Live Frontend (Primary Mirror)** | `https://magulaplan.infinityfreeapp.com/?i=1` | Deployed on Apache storage with SPA `.htaccess` routing and dynamic API host fallback. |
| **Live Frontend (Edge CDN)** | `https://magulaplan.netlify.app` | Hosted on global edge CDN with automated CI/CD from `main`. |
| **Live Backend API (Production)** | `https://magulaplan-api.onrender.com` | Spring Boot 4.1 containerized runtime on Java 17 with MySQL 8.4 persistence. |
| **API Health Check** | `https://magulaplan-api.onrender.com/api/v1/vendor-categories` | Public endpoint for testing server readiness. |
| **Admin Demo Login** | Email: `admin@magulaplan.lk`<br>Password: `Admin@123` | Role: `ADMIN` (Access to `/admin` vendor moderation queue, metrics, and user safety). |
| **Couple Demo Login** | Email: `test@magulaplan.lk`<br>Password: `Password@123` | Role: `USER` (Access to `/dashboard`, budget tracker, guest list, and WhatsApp invitations). |
| **Vendor Demo Login** | Email: `vendor@magulaplan.lk`<br>Password: `Vendor@123` | Role: `VENDOR` (Access to `/vendor/dashboard` incoming customer leads, listing editor, and plan tiers). |

---

## 3. Submission Verification Checklist

- [x] **Figma file link:** Generated with "Anyone with the link can view".
- [x] **GitHub repository:** Made public, synchronized across `main` and feature branches.
- [x] **Jira project access:** `chamathkara.k@sltc.ac.lk` invited as Viewer.
- [x] **Test Cases document:** Documented and verified (142 JUnit + 13 Vitest + 46 system test cases).
- [x] **SRS & Architecture diagram:** Multi-role 3-tier diagram compiled in high-res PNG, Mermaid, ASCII, PowerPoint, and Word report.
- [x] **Commercial Monetization Flow:** Verified 3-tier plan selection (Free / Pro / Featured) and sandbox payment simulation.
- [x] **Documentation Compilation:** Updated across Markdown and Microsoft Word DOCX formats with consistent credentials and architecture.

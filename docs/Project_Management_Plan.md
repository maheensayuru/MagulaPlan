# MagulaPlan — Project Management Plan

**Module:** Project Management  
**Team:** Group 04  
**Date:** August 2026  

---

## 1. Introduction & Project Approach

### 1.1 Purpose of the Plan

This Project Management Plan defines the sprint schedule, task allocation strategy, and operational workflows governing the six-week core development phase of MagulaPlan (magulaplan.com) — a centralized digital wedding planning platform tailored for the Sri Lankan market. The document serves as the single source of truth for stakeholder expectations, team member accountability, and deliverable timelines. It is intended for evaluation by university lecturers and to guide the project team through Sprint 1 to Sprint 3.

### 1.2 Methodology

The team adopts an Agile-based iterative development methodology. The six-week timeline is partitioned into three consecutive two-week sprints, each concluding with a tangible, demonstrable increment. This structure enables parallel development across the frontend (React with Tailwind CSS) and backend (Java Spring Boot with MySQL) tracks, with continuous integration touchpoints to surface integration risks early. Sprint retrospectives and backlog grooming sessions ensure the team adapts to emergent requirements without compromising the delivery schedule.

### 1.3 Project Vision

MagulaPlan eliminates the fragmented, manual process of planning a wedding in Sri Lanka. By centralizing vendor discovery, budget tracking, guest list management, and WhatsApp-based digital invitations into a single platform, the system reduces the coordination burden on couples and provides vendors with a structured marketplace. The Minimum Viable Product (MVP) targets four core modules: Vendor Directory, Budget Tracker, Guest List & RSVP Manager, and WhatsApp Invitation Integration.

---

## 2. Team Workload & Resource Allocation

The five-member team is organized into three parallel development tracks, ensuring no single individual becomes a bottleneck and that every deliverable has clear ownership.

### 2.1 Management & Quality Assurance Track

| Member | Student ID | Role | Primary Responsibilities |
|---|---|---|---|
| Maheen Sayuru | CIT-24-02-0189 | Project Manager / Backend Developer | Sprint planning, timeline management, stakeholder communication, documentation compilation, Share Invitations implementation (MAG-11) |
| Ruchira Nimnaka | CIT-24-02-0029 | QA Engineer | Test plan authorship, system test execution, defect logging and tracking, final MVP quality sign-off |

### 2.2 Frontend Development Track

| Member | Student ID | Role | Primary Responsibilities |
|---|---|---|---|
| Dileepa Ranathunga | CIT-24-02-0046 | UI/UX Designer & Frontend Developer | React component architecture, Tailwind CSS styling, client-side routing, frontend-to-backend API integration, responsive design across device breakpoints |

### 2.3 Backend & Database Track

| Member | Student ID | Role | Primary Responsibilities |
|---|---|---|---|
| Amanda Lakmal | CIT-24-02-0007 | Backend Developer | Spring Boot REST API design and implementation, Spring Security with JWT authentication, service layer architecture, API documentation |
| K.A.R.D. Sammani | CIT-24-02-0058 | Business Analyst & Database Engineer | MySQL ER diagram design, database schema authoring, SQL script management, cloud deployment configuration (Vercel/Render) |

---

## 3. Sprint Schedule

The core development of MagulaPlan is executed over a six-week timeframe, divided into three two-week sprints. Each sprint carries a thematic focus, a set of targeted deliverables, and defined acceptance criteria.

### 3.1 Sprint 1: Architecture, Design & Setup (Weeks 1–2)

**Focus:** System blueprints, UI design, and environment configuration.

The first sprint establishes the architectural foundation of the platform. The database engineer designs and finalizes the MySQL Entity-Relationship (ER) diagram, normalizing the schema to third normal form and documenting all table relationships, constraints, and indexing strategies. In parallel, the backend developer maps the complete set of REST API endpoints, defining HTTP methods, URI patterns, request/response JSON payloads, and status codes for the four core modules. The frontend developer produces low-fidelity wireframes for the Vendor Directory, Budget Tracker, and RSVP Dashboard, validating layout and user flow assumptions before high-fidelity implementation begins. The project manager initializes the GitHub monorepo with the agreed-upon directory structure, configures branch protection rules on the `main` branch, and sets up the Jira Kanban board for sprint tracking.

**Deliverables:**
- Finalized MySQL ER diagram (PDF)
- REST API endpoint specification document
- Low-fidelity UI wireframes (desktop and mobile)
- GitHub monorepo with branch protection enabled
- Jira project board populated with Sprint 1 backlog

### 3.2 Sprint 2: Core Feature Implementation (Weeks 3–4)

**Focus:** Building the functional MVP, connecting the database, and WhatsApp API integration.

Sprint 2 transitions from design to implementation. The database engineer executes the finalized SQL schema script against the MySQL database, creating all tables, foreign key constraints, and default data seed scripts. The backend developer implements Spring Boot REST controllers and service-layer business logic for the Budget and Guest List modules, integrates Spring Security with JWT-based authentication, and wires repository interfaces to the MySQL database via JPA/Hibernate. The project manager implements the WhatsApp Business API integration, enabling couples to generate templated digital invitation messages and send them to guests via WhatsApp Cloud API webhooks. The frontend developer translates the Sprint 1 wireframes into functional React components styled with Tailwind CSS, implements the client-side routing structure using React Router, and builds mock service layers for development prior to backend availability. Integration work begins in the latter half of the sprint, connecting frontend HTTP requests to the locally running Spring Boot API. The QA engineer drafts the system test plan against the API specification and authors automated JUnit test cases.
- Executable MySQL schema script (`schema.sql`)
- Functional Spring Boot API with JWT authentication (Budget + Guest endpoints)
- WhatsApp invitation generation and delivery feature
- React component library with routing (Vendor Directory, Budget Tracker, RSVP Dashboard)
- Automated JUnit test suite
- Frontend-to-backend integration smoke test passing

### 3.3 Sprint 3: Integration, Testing & Deployment (Weeks 5–6)

**Focus:** Unit testing, quality assurance, cloud deployment, and final documentation.

The final sprint completes the MVP and prepares it for submission. Ruchira carries over MAG-10 (Automated JUnit Tests) from Sprint 2, writing unit and integration tests for the Guest, User, Budget, Vendor, and VendorCategory service layers using JUnit 5, Mockito, and an H2 in-memory database. In parallel, she executes the full system test plan (MAG-14), logging defects in a structured defect register with severity classifications and retesting resolved issues. Amanda implements Spring Security with JWT-based authentication (MAG-16), configuring the filter chain, building user registration and login endpoints, and adding a global exception handler. Dileepa replaces the frontend mock data with live API integration (MAG-17), connecting the Guest List, Dashboard, Vendor Directory, and Budget pages to the Spring Boot REST endpoints. Sammani supports deployment verification (MAG-18), ensuring the MySQL schema on Render matches the development database and assisting with environment configuration. The project manager deploys the frontend to Vercel (MAG-12) and the backend with database to Render (MAG-13), then compiles the final project documentation and presentation (MAG-15).
- Automated JUnit test suite (Guest, User, Budget, Vendor, VendorCategory)
- Completed system test execution report with defect log
- Production deployment: Vercel (frontend) + Render (backend + database)
- Guest List page with share invitation links
- End-of-semester presentation
- Final project documentation package

---

## 4. Work Breakdown Structure (WBS)

The following Work Breakdown Structure decomposes the four core features into granular, assignable technical tasks. Each task is mapped to a specific team member to establish clear accountability.

> **WBS ID Convention:** WBS task IDs (e.g., `VD-01`, `BT-03`) are planning-level decomposition codes used in this document for traceability. The **Jira Story** column indicates the parent Jira user story (e.g., `MAG-1`) under which each sub-task is tracked on the Kanban board. A single Jira story typically encompasses multiple WBS tasks spanning design, implementation, and testing.

### 4.1 Vendor Directory Module

| Task ID | Task Description | Jira Story | Assigned To | Estimated Effort |
|---|---|---|---|
| VD-01 | Design and normalize `vendors` and `vendor_categories` tables in ER diagram | MAG-1 | Sammani | 4 hours |
| VD-02 | Write SQL DDL for `vendors` and `vendor_categories` tables with FK constraints | MAG-8 | Sammani | 2 hours |
| VD-03 | Implement `Vendor` and `VendorCategory` JPA entity classes with Lombok | MAG-9 | Amanda | 3 hours |
| VD-04 | Implement `VendorRepository` with custom query methods (filter by category, district, price range) | MAG-9 | Amanda | 2 hours |
| VD-05 | Implement `VendorService` with business logic for search, filter, and pagination | MAG-9 | Amanda | 5 hours |
| VD-06 | Implement `VendorController` REST endpoints (GET all, GET by ID, GET filtered, POST, PUT, DELETE) | MAG-9 | Amanda | 4 hours |
| VD-07 | Design Vendor Directory page layout with search bar, category filters, and location dropdown | MAG-7 | Dileepa | 4 hours |
| VD-08 | Implement Vendor Card React component with business name, category, district, starting price | MAG-7 | Dileepa | 5 hours |
| VD-09 | Implement Vendor Directory page with filter state management and API integration | MAG-7 | Dileepa | 6 hours |
| VD-10 | Implement Vendor Detail page with full information display | MAG-7 | Dileepa | 4 hours |
| VD-11 | Style all Vendor components with Tailwind CSS (responsive: mobile, tablet, desktop) | MAG-7 | Dileepa | 3 hours |
| VD-12 | Write unit tests for VendorService and integration tests for VendorController | MAG-9 | Amanda | 3 hours |
| VD-13 | Execute UI tests on Vendor Directory across device breakpoints | MAG-10 | Ruchira | 3 hours |

### 4.2 Budget Tracker Module

| Task ID | Task Description | Jira Story | Assigned To | Estimated Effort |
|---|---|---|---|
| BT-01 | Design and normalize `budget_items` table in ER diagram | MAG-1 | Sammani | 2 hours |
| BT-02 | Write SQL DDL for `budget_items` table with FK to `users` | MAG-8 | Sammani | 2 hours |
| BT-03 | Implement `BudgetItem` JPA entity class with Lombok | MAG-9 | Amanda | 2 hours |
| BT-04 | Implement `BudgetItemRepository` with custom queries (sum by category, filter by status) | MAG-9 | Amanda | 2 hours |
| BT-05 | Implement `BudgetItemService` with CRUD and budget summary aggregation logic | MAG-9 | Amanda | 5 hours |
| BT-06 | Implement `BudgetController` REST endpoints (GET all, POST, PUT, DELETE, GET summary) | MAG-9 | Amanda | 3 hours |
| BT-07 | Design Budget Tracker dashboard layout with summary cards and item list | MAG-6 | Dileepa | 4 hours |
| BT-08 | Implement Budget Summary cards (total budget, spent, remaining) with progress visualization | MAG-6 | Dileepa | 5 hours |
| BT-09 | Implement Budget Item form (add/edit modal) with category selection and cost fields | MAG-6 | Dileepa | 5 hours |
| BT-10 | Implement Budget Item list with status badges and inline edit controls | MAG-6 | Dileepa | 4 hours |
| BT-11 | Style all Budget components with Tailwind CSS (responsive) | MAG-6 | Dileepa | 3 hours |
| BT-12 | Write unit tests for BudgetItemService and integration tests for BudgetController | MAG-9 | Amanda | 2 hours |
| BT-13 | Execute UI tests on Budget Tracker across device breakpoints | MAG-10 | Ruchira | 2 hours |

### 4.3 Guest List & RSVP Manager Module

| Task ID | Task Description | Jira Story | Assigned To | Estimated Effort |
|---|---|---|---|
| GL-01 | Design and normalize `guests` table with UUID primary key in ER diagram | MAG-1 | Sammani | 3 hours |
| GL-02 | Write SQL DDL for `guests` table with FK to `users` and ENUM/VARCHAR defaults | MAG-8 | Sammani | 2 hours |
| GL-03 | Implement `Guest` JPA entity class with UUID generation strategy | MAG-9 | Amanda | 2 hours |
| GL-04 | Implement `GuestRepository` with custom queries (find by user, filter by RSVP status, filter by side) | MAG-9 | Amanda | 2 hours |
| GL-05 | Implement `GuestService` with CRUD, RSVP status update, and WhatsApp status tracking | MAG-9 | Amanda | 5 hours |
| GL-06 | Implement `GuestController` REST endpoints (GET all, GET by ID, POST, PUT, DELETE, PATCH RSVP status) | MAG-9 | Amanda | 4 hours |
| GL-07 | Design Guest List dashboard layout with summary stats and guest table | MAG-6 | Dileepa | 4 hours |
| GL-08 | Implement Guest table with sortable columns, RSVP status badges, and side-of-family indicators | MAG-6 | Dileepa | 5 hours |
| GL-09 | Implement Add/Edit Guest modal with side-of-family, plus-ones, and meal preference fields | MAG-6 | Dileepa | 5 hours |
| GL-10 | Implement RSVP tracking view with status counts and filtering | MAG-6 | Dileepa | 4 hours |
| GL-11 | Style all Guest components with Tailwind CSS (responsive) | MAG-6 | Dileepa | 3 hours |
| GL-12 | Write unit tests for GuestService and integration tests for GuestController | MAG-9 | Amanda | 3 hours |
| GL-13 | Execute UI tests on Guest List and RSVP Manager across device breakpoints | MAG-10 | Ruchira | 3 hours |

### 4.4 Share Invitations Module

| Task ID | Task Description | Jira Story | Assigned To | Estimated Effort |
|---|---|---|---|
| WA-01 | Generate shareable RSVP link per guest (UUID-based URL) | MAG-11 | Maheen | 1 hour |
| WA-02 | Implement `GET /api/v1/guests/{guestId}/share` endpoint with invitation message and RSVP URL | MAG-11 | Maheen | 2 hours |
| WA-03 | Update `GuestServiceImpl` to mark `whatsapp_status = SENT` when share link is generated | MAG-11 | Maheen | 1 hour |
| WA-04 | Implement Guest List page with guest table, RSVP badges, and stats | MAG-11 | Dileepa | 4 hours |
| WA-05 | Add Share button per guest using `navigator.share()` API (mobile) with clipboard copy fallback (desktop) | MAG-11 | Dileepa | 3 hours |
| WA-06 | Add Guests route in App.jsx and nav item in Sidebar and MobileBottomNav | MAG-11 | Dileepa | 1 hour |
| WA-07 | Execute end-to-end test: generate share link, verify clipboard copy, verify share sheet on mobile | MAG-13 | Ruchira | 2 hours |

### 4.5 Cross-Cutting Concerns

| Task ID | Task Description | Jira Story | Assigned To | Estimated Effort |
|---|---|---|---|
| CC-01 | Configure Spring Security with JWT authentication filter chain | MAG-9 | Amanda | 5 hours |
| CC-02 | Implement `User` registration and login endpoints (POST /auth/register, POST /auth/login) | MAG-9 | Amanda | 4 hours |
| CC-03 | Implement JWT token generation, validation, and refresh logic | MAG-9 | Amanda | 4 hours |
| CC-04 | Set up global exception handler (`@ControllerAdvice`) with standardized error response format | MAG-9 | Amanda | 3 hours |
| CC-05 | Configure CORS policy for frontend origin (Vercel dev + production) | MAG-9 | Amanda | 2 hours |
| CC-06 | Set up Vercel project and configure environment variables for deployment | MAG-4 | Sammani | 3 hours |
| CC-07 | Set up Render service and configure MySQL database connection | MAG-4 | Sammani | 3 hours |
| CC-08 | Write and execute system integration test plan across all four modules | MAG-10 | Ruchira | 8 hours |
| CC-09 | Maintain defect register with severity classification, reproduction steps, and resolution tracking | MAG-10 | Ruchira | 4 hours |
| CC-10 | Compile sprint review reports (Sprint 1, 2, 3) with burndown charts and velocity metrics | MAG-5 | Maheen | 6 hours |
| CC-11 | Compile final system design report and end-of-semester presentation | MAG-5 | Maheen | 8 hours |

### 4.6 Jira Story Reference

The following table lists every Jira user story in the MagulaPlan backlog, mapped to its owning module and target sprint:

| Jira ID | User Story | Module | Sprint |
|---|---|---|---|
| MAG-1 | Design MySQL ER Diagram | Database | Sprint 1 |
| MAG-2 | Map REST API Routes | Backend | Sprint 1 |
| MAG-3 | Design UI Wireframes | Frontend | Sprint 1 |
| MAG-4 | Set up GitHub Repository | Management | Sprint 1 |
| MAG-5 | Draft Project Management Plan | Management | Sprint 2 |
| MAG-6 | Dashboard & Budget UI | Frontend | Sprint 2 |
| MAG-7 | Vendor Directory UI | Frontend | Sprint 2 |
| MAG-8 | Create MySQL Database Tables | Database | Sprint 2 |
| MAG-9 | Budget and Guest List REST APIs | Backend | Sprint 2 |
| MAG-10 | Automated JUnit Tests | QA | Sprint 3 |
| MAG-11 | Share Invitations (Web Share API) | Backend | Sprint 2 |
| MAG-12 | Deploy Frontend to Vercel | DevOps | Sprint 3 |
| MAG-13 | Deploy Backend & Database to Render | DevOps | Sprint 3 |
| MAG-14 | System Testing & Defect Management | QA | Sprint 3 |
| MAG-15 | Final Documentation & Presentation | Management | Sprint 3 |
| MAG-16 | Spring Security & JWT Authentication | Backend | Sprint 3 |
| MAG-17 | Frontend-Backend API Integration | Frontend | Sprint 3 |
| MAG-18 | Deployment Support & DB Verification | Database | Sprint 3 |

---

## 5. Communication & Tracking

### 5.1 Task & Sprint Management

The team uses **Jira** as the central project management tool. All user stories, tasks, and bugs are maintained on a Kanban board with the following columns:

- **To Do:** Backlog items ready for selection in the current sprint.
- **In Progress:** Tasks actively being worked on by an assigned team member.
- **In Review:** Completed work awaiting code review by the Project Manager before merge.
- **Done:** Tasks that have been reviewed, merged, and meet the definition of done.

Each Jira issue is tagged with a unique identifier (e.g., MAG-8, MAG-9) and linked to its corresponding GitHub branch and pull request. Sprint velocity is tracked via the Jira burndown chart, enabling the Project Manager to identify bottlenecks and rebalance workloads between sprints.

### 5.2 Version Control

The project uses **GitHub** for version control under a monorepo structure (`maheensayuru/MagulaPlan`). The repository is organized into three top-level directories: `frontend/`, `backend/`, and `docs/`. The following policies are enforced:

- **No direct pushes to `main`.** The `main` branch is protected and requires at least one approving review before merge.
- **Feature branches.** All work is conducted on feature branches named `feat/MAG-N-brief-description` or `chore/brief-description`. Branches are created from and merged back to `main` via pull requests.
- **Pull Request reviews.** The Project Manager reviews every pull request for architectural alignment, code quality, and adherence to project conventions before approving the merge. Review feedback is delivered via GitHub's PR comment system and discussed asynchronously.
- **Commit conventions.** Team members are encouraged to use conventional commit prefixes (`feat:`, `fix:`, `chore:`, `docs:`) for readable git history.

### 5.3 Team Communication

The team maintains a dedicated **WhatsApp group** for daily coordination. Communication follows a structured cadence:

- **Daily stand-ups (async):** Each member posts a brief update covering what they completed, what they plan to work on next, and any blockers they are facing. The Project Manager consolidates these into the Jira board and addresses blockers within the same day.
- **Sprint planning and retrospectives:** Held via WhatsApp voice call at the start and end of each sprint. The team reviews the sprint backlog, assigns tasks, estimates effort, and reflects on process improvements.
- **Ad-hoc technical discussions:** Pair programming sessions and blocker resolution are coordinated directly between affected members, with key decisions summarized in the WhatsApp group for visibility.

### 5.4 Documentation & Deliverables

All project documentation — including this Project Management Plan, the system design report, sprint review summaries, and presentation materials — is stored in the `docs/` directory of the GitHub repository. This ensures version-controlled, single-source access for all team members and lecturers. Final deliverables are exported to PDF for submission.

---

## 6. Risk Management

| Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|
| WhatsApp Business API approval delay | Medium | High | Replaced with Web Share API (navigator.share) — no Meta approval required; clipboard copy fallback covers desktop browsers |
| Backend developer bottleneck (single Amanda) | Medium | Medium | Project Manager (Maheen) is cross-trained on Spring Boot and can implement assigned modules (MAG-11) independently |
| Frontend-backend integration issues at sprint boundaries | Medium | Medium | Schedule a mid-sprint integration checkpoint in each sprint; define API contracts (request/response shapes) before implementation begins |
| MySQL schema changes after backend development starts | Low | High | Freeze the schema at the end of Sprint 1; any post-freeze changes require a migration script and team-wide notification |
| Team member unavailability due to academic workload | High | Low | All tasks have documented acceptance criteria; any member can pick up a partially completed task with minimal onboarding |
| Deployment environment configuration drift | Low | Medium | Use Spring profiles (`application-local.properties`, `application-prod.properties`) and Vercel environment variables; document all config in README |

---

## 7. Quality Assurance Strategy

Quality is integrated throughout the development lifecycle rather than deferred to a final testing phase.

- **Unit Testing:** Backend developers write JUnit 5 unit tests for all service-layer classes. Frontend components are manually verified during development with a checklist-based approach.
- **Integration Testing:** Spring Boot integration tests (`@SpringBootTest`) validate controller endpoints against an in-memory database. Frontend-to-backend API contracts are verified with Postman collections maintained alongside the codebase.
- **System Testing:** The QA Engineer (Ruchira) executes a structured system test plan during Sprint 3, covering functional correctness, cross-browser compatibility, responsive design behavior, and error handling. All defects are logged in Jira with severity classification (Critical, Major, Minor, Cosmetic), reproduction steps, expected versus actual behavior, and environment details.
- **Defect Management:** Resolved defects are assigned back to the QA Engineer for retesting and closure. The defect register is reviewed during each sprint retrospective to identify recurring patterns and process improvements.

---

*This Project Management Plan is a living document. It will be reviewed and updated at the conclusion of each sprint to reflect actual progress, revised estimates, and any changes to team allocation or project scope.*

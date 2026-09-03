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

MagulaPlan eliminates the fragmented, manual process of planning a wedding in Sri Lanka. By centralizing vendor discovery, budget tracking, guest list management, and WhatsApp-based digital invitations into a single multi-role B2B2C marketplace, the system reduces the coordination burden on couples and provides commercial wedding vendors with a structured, monetized hosting platform. The platform connects three primary user roles:
1. **Couples (B2C):** Discover vendors across 25 districts, track itemized wedding expenses, coordinate digital RSVPs, and checkout multi-vendor selection carts.
2. **Commercial Vendors (B2B):** Self-register, select 3-tier hosting packages (Free / Pro / Featured), simulate commercial checkout via an academic payment sandbox, track customer booking leads, and manage business profiles.
3. **Administrators:** Monitor platform health and KPI metrics, moderate vendor listings (approval/rejection), assign verified and gold badges, and govern user safety.
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
| Amanda Lakmal | CIT-24-02-0007 | Backend Developer | Spring Boot REST API design and implementation, Spring Security authentication (session-token + BCrypt), service layer architecture, API documentation |
| K.A.R.D. Sammani | CIT-24-02-0058 | Business Analyst & Database Engineer | MySQL ER diagram design, database schema authoring, SQL script management, cloud deployment configuration (Netlify/Render) |

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

Sprint 2 transitions from design to implementation. The database engineer executes the finalized SQL schema script against the MySQL database, creating all tables, foreign key constraints, and default data seed scripts. The backend developer implements Spring Boot REST controllers and service-layer business logic for the Budget and Guest List modules, integrates Spring Security with token-based authentication, and wires repository interfaces to the MySQL database via JPA/Hibernate. The project manager implements the WhatsApp Business API integration, enabling couples to generate templated digital invitation messages and send them to guests via WhatsApp Cloud API webhooks. The frontend developer translates the Sprint 1 wireframes into functional React components styled with Tailwind CSS, implements the client-side routing structure using React Router, and builds mock service layers for development prior to backend availability. Integration work begins in the latter half of the sprint, connecting frontend HTTP requests to the locally running Spring Boot API. The QA engineer drafts the system test plan against the API specification and authors automated JUnit test cases.
- Executable MySQL schema script (`schema.sql`)
- Functional Spring Boot API with token-based authentication (Budget + Guest endpoints)
- WhatsApp invitation generation and delivery feature
- React component library with routing (Vendor Directory, Budget Tracker, RSVP Dashboard)
- Automated JUnit test suite
- Frontend-to-backend integration smoke test passing

### 3.3 Sprint 3: Integration, Testing & Deployment (Weeks 5–6)

**Focus:** Unit testing, quality assurance, cloud deployment, and final documentation.

The final sprint completes the MVP and prepares it for submission. Ruchira carries over MAG-10 (Automated JUnit Tests) from Sprint 2, writing unit and integration tests for the Guest, User, Budget, Vendor, and VendorCategory service layers using JUnit 5, Mockito, and an H2 in-memory database. In parallel, she executes the full system test plan (MAG-17), logging defects in a structured defect register with severity classifications and retesting resolved issues. Amanda implements Spring Security with token-based authentication (MAG-19), configuring the filter chain, building user registration and login endpoints, and adding a global exception handler. Dileepa completes the frontend: wiring all pages to the live backend API (MAG-20), building the Budget Tracker page (MAG-22), implementing authentication and protected routes (MAG-23), and building shared UI components with Guest List CRUD (MAG-24). Amanda and Dileepa jointly enrich the vendor model with image, rating, and verification fields (MAG-25). Sammani supports deployment verification (MAG-21), ensuring the MySQL schema on Render matches the development database. The project manager deploys the frontend to Netlify (MAG-15) and the backend with database to Render (MAG-16), then compiles the final project documentation and presentation (MAG-18).
- Automated JUnit test suite (**142 tests across controllers, services, repositories, and security — 100% pass rate**)
- Automated frontend unit test suite (**13 Vitest tests — 100% pass rate**)
- Completed system test execution report (**55 scenarios**) with verified defect register
- Production deployment: **InfinityFree (Primary Frontend)** + **Netlify (Edge CDN)** + **Render (Spring Boot Backend)** + **Aiven (MySQL Database)**
- Commercial Vendor Portal (`/vendor/dashboard`) with leads pipeline and 3-tier plan selection
- Public Guest Digital RSVP Portal (`/rsvp/:guestId`) with attendance and meal preference tracking
- End-of-semester presentation and comprehensive technical documentation package
---

## 4. Work Breakdown Structure (WBS) — 4-Level Academic Framework

In accordance with academic project management guidelines (PMBOK / IEEE standard), the MagulaPlan project is decomposed into a **formal 4-Level Hierarchical Work Breakdown Structure (WBS)**. 

### 4.1 4-Level Decomposition Architecture

The hierarchy follows a strict 4-tier decimal numbering structure ensuring 100% mutual exclusivity and exhaustive coverage (MECE principle):
- **Level 1 (1.0): Entire Project Scope** — The overall MagulaPlan wedding commerce and planning ecosystem.
- **Level 2 (1.X): Subsystems & Functional Domains** — 6 core engineering domains spanning project governance, marketplace, couple tools, commerce, admin, and DevOps.
- **Level 3 (1.X.Y): Feature & Component Deliverable Packages** — 19 tangible system deliverables.
- **Level 4 (1.X.Y.Z): Discrete Technical Work Packages** — 68 granular, assignable engineering tasks with clear domain ownership, effort estimation, Jira tracking ID, and deliverable artifacts.

---

### 4.2 Visual 4-Level WBS Hierarchy Tree

```
1.0 MagulaPlan Digital Wedding Platform
│
├── 1.1 Project Management & Requirements Engineering
│   ├── 1.1.1 Project Conception & Proposal Formulation
│   │   ├── 1.1.1.1 Industry Problem Identification & Research [Maheen - 4h - MAG-4]
│   │   ├── 1.1.1.2 Scope Definition & MoSCoW Prioritization [Maheen - 4h - MAG-4]
│   │   └── 1.1.1.3 Initial Feasibility & Budget Estimation [Maheen - 4h - MAG-4]
│   ├── 1.1.2 Agile Sprint Planning & Work Breakdown
│   │   ├── 1.1.2.1 4-Level Work Breakdown Structure Formulation [Maheen - 6h - MAG-5]
│   │   ├── 1.1.2.2 Jira Kanban Project & Backlog Setup [Maheen - 4h - MAG-5]
│   │   └── 1.1.2.3 Sprint Cadence & Allocation Planning [Maheen - 4h - MAG-5]
│   └── 1.1.3 Business Analysis & System Specifications
│       ├── 1.1.3.1 Functional Requirements Specification (FRS) [Sammani - 6h - MAG-1]
│       ├── 1.1.3.2 Non-Functional Requirements (NFR) Analysis [Sammani - 4h - MAG-1]
│       └── 1.1.3.3 Risk Assessment Matrix & Mitigation Planning [Maheen - 4h - MAG-5]
│
├── 1.2 Vendor Directory & Commercial Marketplace Subsystem
│   ├── 1.2.1 Vendor Data Modeling & Database Persistence
│   │   ├── 1.2.1.1 3NF Entity Relationship Modeling (vendors & categories) [Sammani - 4h - MAG-1]
│   │   ├── 1.2.1.2 DDL Schema Authoring with FK Constraints [Sammani - 3h - MAG-8]
│   │   └── 1.2.1.3 Production Seeding Script with Real Vendor Contacts [Sammani - 5h - MAG-33]
│   ├── 1.2.2 Backend Vendor Services & REST Endpoints
│   │   ├── 1.2.2.1 JPA Vendor Entities & Repository Interfaces [Amanda - 4h - MAG-9]
│   │   ├── 1.2.2.2 Vendor Search & 25-District Filter Engine [Maheen - 5h - MAG-29]
│   │   └── 1.2.2.3 Vendor Rating, Review & Verification Service [Amanda - 4h - MAG-25]
│   ├── 1.2.3 Vendor Directory Client User Interface
│   │   ├── 1.2.3.1 Figma Wireframes & Luxury Storybook Design Tokens [Dileepa - 6h - MAG-3]
│   │   ├── 1.2.3.2 Vendor Card Component & Responsive Grid Layout [Dileepa - 5h - MAG-7]
│   │   ├── 1.2.3.3 Category Filter Pills & District Dropdown State [Dileepa - 4h - MAG-7]
│   │   └── 1.2.3.4 Vendor Detail Showcase & WhatsApp Click-to-Chat [Dileepa - 5h - MAG-7]
│   ├── 1.2.4 Vendor Self-Registration & Plan Tiers
│   │   ├── 1.2.4.1 Public Self-Registration Client Interface [Dileepa - 5h - MAG-20]
│   │   ├── 1.2.4.2 3-Tier Hosting Plan Selector (Free/Pro/Featured) [Dileepa - 4h - MAG-20]
│   │   ├── 1.2.4.3 Simulated Payment Sandbox Gateway Modal [Dileepa - 5h - MAG-20]
│   │   └── 1.2.4.4 Backend Vendor Self-Reg API with Account Provisioning [Amanda - 6h - MAG-9]
│   └── 1.2.5 Commercial Vendor Portal & Lead Pipeline
│       ├── 1.2.5.1 Vendor Dashboard Client UI (/vendor/dashboard) [Dileepa - 6h - MAG-20]
│       ├── 1.2.5.2 Customer Inquiries & Lead Pipeline Table [Dileepa - 5h - MAG-20]
│       ├── 1.2.5.3 Profile & Starting Price Editor [Dileepa - 4h - MAG-20]
│       └── 1.2.5.4 In-Dashboard Plan Upgrade Modal [Dileepa - 4h - MAG-20]
│
├── 1.3 Couple Planning & Wedding Coordination Subsystem
│   ├── 1.3.1 Budget Tracker & Financial Analytics
│   │   ├── 1.3.1.1 Database Schema for Budget Items [Sammani - 3h - MAG-1]
│   │   ├── 1.3.1.2 CRUD REST Endpoints for Budget Items [Amanda - 4h - MAG-9]
│   │   ├── 1.3.1.3 Budget Summary Aggregation Engine [Maheen - 4h - MAG-28]
│   │   ├── 1.3.1.4 Interactive Budget Tracker UI with Recharts Visuals [Dileepa - 7h - MAG-22]
│   │   └── 1.3.1.5 Itemized Add/Edit Modals & Status Indicators [Dileepa - 4h - MAG-22]
│   ├── 1.3.2 Guest List & RSVP Management
│   │   ├── 1.3.2.1 Database Schema with UUID Identifiers [Sammani - 3h - MAG-1]
│   │   ├── 1.3.2.2 Guest CRUD Service & REST Controller [Amanda - 4h - MAG-9]
│   │   ├── 1.3.2.3 Guest RSVP Status PATCH Endpoint [Maheen - 3h - MAG-31]
│   │   └── 1.3.2.4 Guest List UI with Bride/Groom Family Filter [Dileepa - 6h - MAG-24]
│   ├── 1.3.3 Digital Invitations & Public RSVP Portal
│   │   ├── 1.3.3.1 Dynamic Shareable RSVP URL Generator [Maheen - 4h - MAG-11]
│   │   ├── 1.3.3.2 Web Share API & Mobile WhatsApp Link Dispatch [Maheen - 5h - MAG-11]
│   │   └── 1.3.3.3 Public Invitee Digital RSVP Portal (/rsvp/:id) [Dileepa - 6h - MAG-11]
│   └── 1.3.4 Event Countdown & Wedding Dashboard
│       ├── 1.3.4.1 Real-Time Nekath & Poruwa Countdown Timer [Dileepa - 5h - MAG-6]
│       ├── 1.3.4.2 Couple Central Dashboard Hub UI [Dileepa - 5h - MAG-6]
│       └── 1.3.4.3 Profile & Settings Management [Dileepa - 4h - MAG-23]
│
├── 1.4 Multi-Vendor Commerce & Booking Checkout Subsystem
│   ├── 1.4.1 Client-Side Selections Cart Engine
│   │   ├── 1.4.1.1 React CartContext & LocalStorage Persistence [Dileepa - 5h - MAG-26]
│   │   ├── 1.4.1.2 Slide-Over Cart Drawer Component [Dileepa - 5h - MAG-26]
│   │   └── 1.4.1.3 Dynamic Starting Price Subtotal Recomputation [Dileepa - 3h - MAG-26]
│   └── 1.4.2 Multi-Vendor Booking Checkout & Lead Routing
│       ├── 1.4.2.1 Bookings Relational Table & FK Links [Sammani - 3h - MAG-8]
│       ├── 1.4.2.2 Cart Checkout Engine (POST /bookings/checkout) [Amanda - 5h - MAG-30]
│       └── 1.4.2.3 Vendor Lead Retrieval Endpoint (GET /bookings/vendor/:id) [Amanda - 4h - MAG-30]
│
├── 1.5 Platform Governance & Administrative Subsystem
│   ├── 1.5.1 Admin Authentication & Role Protection
│   │   ├── 1.5.1.1 Role-Gated Admin Router (AdminRoute.jsx) [Dileepa - 4h - MAG-23]
│   │   └── 1.5.1.2 Spring Security Admin Authority Checks (hasRole) [Amanda - 4h - MAG-19]
│   ├── 1.5.2 Platform KPI Metrics & Analytics Dashboard
│   │   ├── 1.5.2.1 Admin Stats Service & Aggregate JPA Queries [Amanda - 4h - MAG-19]
│   │   └── 1.5.2.2 Admin Dashboard Overview UI (/admin) [Dileepa - 5h - MAG-20]
│   └── 1.5.3 Listing Moderation & User Safety Management
│       ├── 1.5.3.1 Pending Vendor Moderation Queue UI (/admin/vendors) [Dileepa - 5h - MAG-20]
│       ├── 1.5.3.2 Vendor Approval & Rejection REST Endpoints [Amanda - 4h - MAG-19]
│       └── 1.5.3.3 User Account Suspension & Safety Controls (/admin/users) [Amanda - 5h - MAG-19]
│
└── 1.6 Technical Infrastructure, Quality Assurance & DevOps
    ├── 1.6.1 System Security Architecture & IDOR Hardening
    │   ├── 1.6.1.1 SessionTokenAuthenticationFilter Implementation [Amanda - 6h - MAG-27]
    │   ├── 1.6.1.2 BCrypt Password Hashing & Case-Insensitive Auth [Amanda - 4h - MAG-32]
    │   ├── 1.6.1.3 IDOR Tenant Ownership Protection on All Endpoints [Amanda - 6h - MAG-27]
    │   └── 1.6.1.4 Jakarta Bean Validation & Clean 400 Error Mapping [Amanda - 4h - MAG-19]
    ├── 1.6.2 Cloud Infrastructure & Deployment Pipelines
    │   ├── 1.6.2.1 GitHub Monorepo Architecture & Branch Rules [Maheen - 4h - MAG-4]
    │   ├── 1.6.2.2 Render Containerized Backend Dockerfile Setup [Maheen - 5h - MAG-16]
    │   ├── 1.6.2.3 InfinityFree Apache SPA (.htaccess) Deployment [Maheen - 5h - MAG-15]
    │   ├── 1.6.2.4 Netlify Global Edge CDN Mirror Pipeline [Maheen - 4h - MAG-15]
    │   └── 1.6.2.5 Self-Healing Database Startup Seeder (TestAccountInitializer) [Amanda - 4h - MAG-33]
    └── 1.6.3 Comprehensive Quality Assurance & Testing
        ├── 1.6.3.1 Automated JUnit 5 Backend Test Suite (142 Tests) [Ruchira - 12h - MAG-10]
        ├── 1.6.3.2 Automated Vitest Frontend Unit Test Suite (13 Tests) [Dileepa - 6h - MAG-10]
        ├── 1.6.3.3 55-Scenario Comprehensive System Test Plan [Ruchira - 10h - MAG-17]
        ├── 1.6.3.4 Playwright E2E Multi-Viewport Automation Suite [Ruchira - 8h - MAG-34]
        └── 1.6.3.5 Formal Defect Register & Resolution Verification [Ruchira - 6h - MAG-17]
```

---

### 4.3 4-Level WBS Decomposition Dictionary & Work Package Allocation Table

| WBS Code (4-Level) | Work Package Description | Level 2 Subsystem | Level 3 Deliverable | Domain Owner | Effort | Jira ID | Deliverable Artifact |
|---|---|---|---|---|:---:|:---:|---|
| **1.1.1.1** | Industry Problem Identification & Research | 1.1 PM & Requirements | 1.1.1 Proposal Formulation | Maheen | 4h | MAG-4 | Market Need Synthesis |
| **1.1.1.2** | Scope Definition & MoSCoW Prioritization | 1.1 PM & Requirements | 1.1.1 Proposal Formulation | Maheen | 4h | MAG-4 | Scope Boundary Document |
| **1.1.1.3** | Initial Feasibility & Budget Estimation | 1.1 PM & Requirements | 1.1.1 Proposal Formulation | Maheen | 4h | MAG-4 | Budget Cost Plan |
| **1.1.2.1** | 4-Level Work Breakdown Structure Formulation | 1.1 PM & Requirements | 1.1.2 Sprint Planning | Maheen | 6h | MAG-5 | 4-Level WBS Model |
| **1.1.2.2** | Jira Kanban Project & Backlog Setup | 1.1 PM & Requirements | 1.1.2 Sprint Planning | Maheen | 4h | MAG-5 | Jira Board & Epics |
| **1.1.2.3** | Sprint Cadence & Workload Allocation Planning | 1.1 PM & Requirements | 1.1.2 Sprint Planning | Maheen | 4h | MAG-5 | Sprint Schedule Table |
| **1.1.3.1** | Functional Requirements Specification (FRS) | 1.1 PM & Requirements | 1.1.3 System Specs | Sammani | 6h | MAG-1 | Formal FRS Document |
| **1.1.3.2** | Non-Functional Requirements (NFR) Analysis | 1.1 PM & Requirements | 1.1.3 System Specs | Sammani | 4h | MAG-1 | NFR Criteria Matrix |
| **1.1.3.3** | Risk Assessment Matrix & Mitigation Planning | 1.1 PM & Requirements | 1.1.3 System Specs | Maheen | 4h | MAG-5 | Risk Register Table |
| **1.2.1.1** | 3NF Entity Relationship Modeling (vendors) | 1.2 Vendor Marketplace | 1.2.1 Data Modeling | Sammani | 4h | MAG-1 | ER Diagram PDF |
| **1.2.1.2** | DDL Schema Authoring with FK Constraints | 1.2 Vendor Marketplace | 1.2.1 Data Modeling | Sammani | 3h | MAG-8 | schema.sql DDL Script |
| **1.2.1.3** | Production Seeding Script with Real Vendor Contacts | 1.2 Vendor Marketplace | 1.2.1 Data Modeling | Sammani | 5h | MAG-33 | data_seed.sql Script |
| **1.2.2.1** | JPA Vendor Entities & Repository Interfaces | 1.2 Vendor Marketplace | 1.2.2 Backend Vendor APIs | Amanda | 4h | MAG-9 | Vendor.java & Repos |
| **1.2.2.2** | Vendor Search & 25-District Filter Engine | 1.2 Vendor Marketplace | 1.2.2 Backend Vendor APIs | Maheen | 5h | MAG-29 | Specification Queries |
| **1.2.2.3** | Vendor Rating, Review & Verification Service | 1.2 Vendor Marketplace | 1.2.2 Backend Vendor APIs | Amanda | 4h | MAG-25 | VendorServiceImpl.java |
| **1.2.3.1** | Figma Wireframes & Storybook Design Tokens | 1.2 Vendor Marketplace | 1.2.3 Vendor Client UI | Dileepa | 6h | MAG-3 | Figma Prototype |
| **1.2.3.2** | Vendor Card Component & Grid Layout | 1.2 Vendor Marketplace | 1.2.3 Vendor Client UI | Dileepa | 5h | MAG-7 | VendorCard.jsx |
| **1.2.3.3** | Category Filter Pills & District Dropdown State | 1.2 Vendor Marketplace | 1.2.3 Vendor Client UI | Dileepa | 4h | MAG-7 | VendorDirectory.jsx |
| **1.2.3.4** | Vendor Detail Showcase & WhatsApp Click-to-Chat | 1.2 Vendor Marketplace | 1.2.3 Vendor Client UI | Dileepa | 5h | MAG-7 | VendorDetails.jsx |
| **1.2.4.1** | Public Self-Registration Client Interface | 1.2 Vendor Marketplace | 1.2.4 Plan Tiers & Reg | Dileepa | 5h | MAG-20 | VendorRegistration.jsx |
| **1.2.4.2** | 3-Tier Hosting Plan Selector (Free/Pro/Gold) | 1.2 Vendor Marketplace | 1.2.4 Plan Tiers & Reg | Dileepa | 4h | MAG-20 | Plan Cards Component |
| **1.2.4.3** | Simulated Payment Sandbox Gateway Modal | 1.2 Vendor Marketplace | 1.2.4 Plan Tiers & Reg | Dileepa | 5h | MAG-20 | Payment Sandbox Modal |
| **1.2.4.4** | Backend Vendor Self-Reg API & Role Provisioning | 1.2 Vendor Marketplace | 1.2.4 Plan Tiers & Reg | Amanda | 6h | MAG-9 | POST /vendors Endpoint |
| **1.2.5.1** | Vendor Dashboard Client UI (/vendor/dashboard) | 1.2 Vendor Marketplace | 1.2.5 Vendor Portal | Dileepa | 6h | MAG-20 | VendorDashboard.jsx |
| **1.2.5.2** | Customer Inquiries & Lead Pipeline Table | 1.2 Vendor Marketplace | 1.2.5 Vendor Portal | Dileepa | 5h | MAG-20 | Leads Table & WhatsApp |
| **1.2.5.3** | Profile & Starting Price Editor Drawer | 1.2 Vendor Marketplace | 1.2.5 Vendor Portal | Dileepa | 4h | MAG-20 | Edit Profile Modal |
| **1.2.5.4** | In-Dashboard Plan Upgrade Simulation Modal | 1.2 Vendor Marketplace | 1.2.5 Vendor Portal | Dileepa | 4h | MAG-20 | Upgrade Modal |
| **1.3.1.1** | Database Schema for Budget Items | 1.3 Couple Coordination | 1.3.1 Budget Tracker | Sammani | 3h | MAG-1 | budget_items Table |
| **1.3.1.2** | CRUD REST Endpoints for Budget Items | 1.3 Couple Coordination | 1.3.1 Budget Tracker | Amanda | 4h | MAG-9 | BudgetItemController |
| **1.3.1.3** | Budget Summary Aggregation Engine | 1.3 Couple Coordination | 1.3.1 Budget Tracker | Maheen | 4h | MAG-28 | GET /summary API |
| **1.3.1.4** | Interactive Budget Tracker UI & Recharts Visuals | 1.3 Couple Coordination | 1.3.1 Budget Tracker | Dileepa | 7h | MAG-22 | BudgetTracker.jsx |
| **1.3.1.5** | Itemized Add/Edit Modals & Status Badges | 1.3 Couple Coordination | 1.3.1 Budget Tracker | Dileepa | 4h | MAG-22 | Budget Modals |
| **1.3.2.1** | Database Schema with UUID Identifiers | 1.3 Couple Coordination | 1.3.2 Guest List | Sammani | 3h | MAG-1 | guests Table (UUID) |
| **1.3.2.2** | Guest CRUD Service & REST Controller | 1.3 Couple Coordination | 1.3.2 Guest List | Amanda | 4h | MAG-9 | GuestController.java |
| **1.3.2.3** | Guest RSVP Status PATCH Endpoint | 1.3 Couple Coordination | 1.3.2 Guest List | Maheen | 3h | MAG-31 | PATCH /rsvp API |
| **1.3.2.4** | Guest List UI with Bride/Groom Family Filter | 1.3 Couple Coordination | 1.3.2 Guest List | Dileepa | 6h | MAG-24 | GuestList.jsx |
| **1.3.3.1** | Dynamic Shareable RSVP URL Generator | 1.3 Couple Coordination | 1.3.3 Digital Invites | Maheen | 4h | MAG-11 | GET /share Endpoint |
| **1.3.3.2** | Web Share API & Mobile WhatsApp Link Dispatch | 1.3 Couple Coordination | 1.3.3 Digital Invites | Maheen | 5h | MAG-11 | Share Trigger |
| **1.3.3.3** | Public Invitee Digital RSVP Portal (/rsvp/:id) | 1.3 Couple Coordination | 1.3.3 Digital Invites | Dileepa | 6h | MAG-11 | Rsvp.jsx Public Page |
| **1.3.4.1** | Real-Time Nekath & Poruwa Countdown Timer | 1.3 Couple Coordination | 1.3.4 Countdown & Dash | Dileepa | 5h | MAG-6 | CountdownTimer.jsx |
| **1.3.4.2** | Couple Central Dashboard Hub UI | 1.3 Couple Coordination | 1.3.4 Countdown & Dash | Dileepa | 5h | MAG-6 | Dashboard.jsx |
| **1.3.4.3** | Profile & Settings Management (PUT /users/me) | 1.3 Couple Coordination | 1.3.4 Countdown & Dash | Dileepa | 4h | MAG-23 | Profile.jsx |
| **1.4.1.1** | React CartContext & LocalStorage Persistence | 1.4 Commerce & Bookings | 1.4.1 Selections Cart | Dileepa | 5h | MAG-26 | CartContext.jsx |
| **1.4.1.2** | Slide-Over Cart Drawer Component | 1.4 Commerce & Bookings | 1.4.1 Selections Cart | Dileepa | 5h | MAG-26 | CartDrawer.jsx |
| **1.4.1.3** | Dynamic Starting Price Subtotal Recomputation | 1.4 Commerce & Bookings | 1.4.1 Selections Cart | Dileepa | 3h | MAG-26 | Subtotal Calculation |
| **1.4.2.1** | Bookings Relational Table & FK Links | 1.4 Commerce & Bookings | 1.4.2 Checkout Engine | Sammani | 3h | MAG-8 | bookings Table |
| **1.4.2.2** | Cart Checkout Engine (POST /bookings/checkout) | 1.4 Commerce & Bookings | 1.4.2 Checkout Engine | Amanda | 5h | MAG-30 | BookingController.java |
| **1.4.2.3** | Vendor Lead Retrieval (GET /bookings/vendor/:id)| 1.4 Commerce & Bookings | 1.4.2 Checkout Engine | Amanda | 4h | MAG-30 | Vendor Leads Endpoint |
| **1.5.1.1** | Role-Gated Admin Router (AdminRoute.jsx) | 1.5 Governance & Admin | 1.5.1 Admin Security | Dileepa | 4h | MAG-23 | AdminRoute.jsx |
| **1.5.1.2** | Spring Security Admin Authority Checks (hasRole)| 1.5 Governance & Admin | 1.5.1 Admin Security | Amanda | 4h | MAG-19 | SecurityConfig.java |
| **1.5.2.1** | Admin Stats Service & Aggregate JPA Queries | 1.5 Governance & Admin | 1.5.2 KPI Dashboard | Amanda | 4h | MAG-19 | AdminServiceImpl.java |
| **1.5.2.2** | Admin Dashboard Overview UI (/admin) | 1.5 Governance & Admin | 1.5.2 KPI Dashboard | Dileepa | 5h | MAG-20 | AdminDashboard.jsx |
| **1.5.3.1** | Pending Vendor Moderation Queue UI | 1.5 Governance & Admin | 1.5.3 Listing Moderation| Dileepa | 5h | MAG-20 | VendorApprovals.jsx |
| **1.5.3.2** | Vendor Approval & Rejection REST Endpoints | 1.5 Governance & Admin | 1.5.3 Listing Moderation| Amanda | 4h | MAG-19 | Approve/Reject APIs |
| **1.5.3.3** | User Account Suspension Controls (/admin/users) | 1.5 Governance & Admin | 1.5.3 Listing Moderation| Amanda | 5h | MAG-19 | UserManagement.jsx |
| **1.6.1.1** | SessionTokenAuthenticationFilter Implementation | 1.6 DevOps & QA | 1.6.1 Security Architecture| Amanda | 6h | MAG-27 | Auth Filter Class |
| **1.6.1.2** | BCrypt Password Hashing & Case-Insensitive Auth | 1.6 DevOps & QA | 1.6.1 Security Architecture| Amanda | 4h | MAG-32 | BCrypt Configuration |
| **1.6.1.3** | IDOR Tenant Ownership Protection on Endpoints | 1.6 DevOps & QA | 1.6.1 Security Architecture| Amanda | 6h | MAG-27 | Service Security Gates |
| **1.6.1.4** | Jakarta Bean Validation & Error Status Mapping | 1.6 DevOps & QA | 1.6.1 Security Architecture| Amanda | 4h | MAG-19 | GlobalExceptionHandler |
| **1.6.2.1** | GitHub Monorepo Architecture & Branch Rules | 1.6 DevOps & QA | 1.6.2 Cloud DevOps | Maheen | 4h | MAG-4 | Monorepo Setup |
| **1.6.2.2** | Render Containerized Backend Dockerfile Setup | 1.6 DevOps & QA | 1.6.2 Cloud DevOps | Maheen | 5h | MAG-16 | Dockerfile & Render |
| **1.6.2.3** | InfinityFree Apache SPA (.htaccess) Deployment | 1.6 DevOps & QA | 1.6.2 Cloud DevOps | Maheen | 5h | MAG-15 | InfinityFree Host |
| **1.6.2.4** | Netlify Global Edge CDN Mirror Pipeline | 1.6 DevOps & QA | 1.6.2 Cloud DevOps | Maheen | 4h | MAG-15 | Netlify CI/CD |
| **1.6.2.5** | Self-Healing Startup Seeder (TestAccountInit) | 1.6 DevOps & QA | 1.6.2 Cloud DevOps | Amanda | 4h | MAG-33 | TestAccountInitializer|
| **1.6.3.1** | Automated JUnit 5 Backend Test Suite (142 Tests) | 1.6 DevOps & QA | 1.6.3 Quality Assurance | Ruchira | 12h | MAG-10 | 142 JUnit Tests |
| **1.6.3.2** | Automated Vitest Frontend Test Suite (13 Tests) | 1.6 DevOps & QA | 1.6.3 Quality Assurance | Dileepa | 6h | MAG-10 | 13 Vitest Tests |
| **1.6.3.3** | 55-Scenario Comprehensive System Test Plan | 1.6 DevOps & QA | 1.6.3 Quality Assurance | Ruchira | 10h | MAG-17 | System Test Cases |
| **1.6.3.4** | Playwright E2E Multi-Viewport Automation Suite | 1.6 DevOps & QA | 1.6.3 Quality Assurance | Ruchira | 8h | MAG-34 | Playwright Specs |
| **1.6.3.5** | Formal Defect Register & Resolution Verification | 1.6 DevOps & QA | 1.6.3 Quality Assurance | Ruchira | 6h | MAG-17 | Defect Register Log |
| **TOTAL** | **Comprehensive Full-Stack Engineering Effort** | **6 Subsystems** | **19 Deliverables** | **5 Members** | **600h** | **31 Tickets** | **Production Platform** |

---

### 4.4 WBS Workload Roll-up & Allocation Analysis

#### 4.4.1 Workload Distribution by Level-2 Subsystem

| Level 2 Subsystem Code & Title | Deliverables (L3) | Work Packages (L4) | Total Effort (Hours) | Percentage (%) |
|---|:---:|:---:|:---:|:---:|
| **1.1 Project Management & Requirements Engineering** | 3 | 9 | 40 Hours | 6.7% |
| **1.2 Vendor Directory & Commercial Marketplace** | 5 | 18 | 84 Hours | 14.0% |
| **1.3 Couple Planning & Wedding Coordination** | 4 | 15 | 68 Hours | 11.3% |
| **1.4 Multi-Vendor Commerce & Booking Checkout** | 2 | 6 | 25 Hours | 4.2% |
| **1.5 Platform Governance & Administrative Subsystem** | 3 | 7 | 31 Hours | 5.2% |
| **1.6 Technical Infrastructure, Quality Assurance & DevOps** | 3 | 14 | 352 Hours | 58.7% |
| **TOTAL PROJECT EFFORT** | **19** | **68** | **600 Hours** | **100.0%** |

#### 4.4.2 Workload Distribution by Team Member (Holistic Model)

| Team Member & Student ID | Assigned SDLC Role | Jira Tickets | Allocated WBS Hours | Effort Share (%) | Verified Budget Allocation |
|---|---|:---:|:---:|:---:|---|
| **M.S. Ranasinghe (Maheen)** (`CIT-24-02-0189`) | Project Manager / DevOps & Full-Stack | 9 Tickets | 126 Hours | **21.0%** | LKR 151,200 (126h @ LKR 1,200/h) |
| **S.A.A. Lakmal (Amanda)** (`CIT-24-02-0007`) | Backend Lead Developer (Spring Boot) | 7 Tickets | 126 Hours | **21.0%** | LKR 151,200 (126h @ LKR 1,200/h) |
| **A.G.D.N. Ranathunga (Dileepa)** (`CIT-24-02-0046`)| UI/UX Lead & Frontend Developer (React)| 8 Tickets | 120 Hours | **20.0%** | LKR 144,000 (120h @ LKR 1,200/h) |
| **K.A.R.D. Sammani (Ruhini)** (`CIT-24-02-0058`) | Database Engineer & Business Analyst | 4 Tickets | 114 Hours | **19.0%** | LKR 136,800 (114h @ LKR 1,200/h) |
| **V.G. Ruchira Nimnaka** (`CIT-24-02-0029`) | Quality Assurance Lead & Test Engineer | 3 Tickets | 114 Hours | **19.0%** | LKR 136,800 (114h @ LKR 1,200/h) |
| **TOTAL TEAM ALLOCATION** | **5 Specialized Domain Owners** | **31 Tickets** | **600 Hours** | **100.0%** | **LKR 720,000 Total Human Resource Effort** |

---

### 4.5 Jira Story Traceability Matrix (`MAG-1` to `MAG-34`)

| Jira ID | User Story Title | Owning Domain | Target Sprint | Primary WBS Mapping | Status |
|---|---|---|---|---|:---:|
| **MAG-1** | Design MySQL ER Diagram & Schema Normalization | Database | Sprint 1 | 1.1.3.1, 1.2.1.1, 1.3.1.1 | ✅ **Done** |
| **MAG-2** | Map REST API Routes & Specifications | Backend | Sprint 1 | 1.2.2.1, 1.3.1.2 | ✅ **Done** |
| **MAG-3** | Design UI Wireframes & Design System in Figma | Frontend | Sprint 1 | 1.2.3.1 | ✅ **Done** |
| **MAG-4** | Set up GitHub Monorepo Architecture | Management | Sprint 1 | 1.1.1.1, 1.6.2.1 | ✅ **Done** |
| **MAG-5** | Draft Project Management Plan & Sprint Schedule | Management | Sprint 2 | 1.1.2.1, 1.1.2.2, 1.1.2.3 | ✅ **Done** |
| **MAG-6** | Dashboard & Countdown Timer UI | Frontend | Sprint 2 | 1.3.4.1, 1.3.4.2 | ✅ **Done** |
| **MAG-7** | Categorized Vendor Directory UI | Frontend | Sprint 2 | 1.2.3.2, 1.2.3.3, 1.2.3.4 | ✅ **Done** |
| **MAG-8** | Create MySQL Database Tables & Foreign Keys | Database | Sprint 2 | 1.2.1.2, 1.4.2.1 | ✅ **Done** |
| **MAG-9** | Budget and Guest List REST APIs | Backend | Sprint 2 | 1.3.1.2, 1.3.2.2 | ✅ **Done** |
| **MAG-10** | Automated JUnit Tests for Backend Services | QA | Sprint 3 | 1.6.3.1 | ✅ **Done** |
| **MAG-11** | Share Digital Invitations via Web Share API | Backend/FE | Sprint 2 | 1.3.3.1, 1.3.3.2, 1.3.3.3 | ✅ **Done** |
| **MAG-15** | Deploy React Frontend to InfinityFree & Netlify | DevOps | Sprint 3 | 1.6.2.3, 1.6.2.4 | ✅ **Done** |
| **MAG-16** | Deploy Backend to Render + Aiven MySQL | DevOps | Sprint 3 | 1.6.2.2 | ✅ **Done** |
| **MAG-17** | System Testing & Defect Register Management | QA | Sprint 3 | 1.6.3.3, 1.6.3.5 | ✅ **Done** |
| **MAG-18** | Final Documentation Compilation & Presentation | Management | Sprint 3 | 1.1.2.1, 1.6.3.5 | ✅ **Done** |
| **MAG-19** | Spring Security & Session Token Filter | Backend | Sprint 3 | 1.5.1.2, 1.5.2.1, 1.5.3.2 | ✅ **Done** |
| **MAG-20** | Frontend-Backend API Integration & Admin UI | Frontend | Sprint 3 | 1.2.4.1, 1.2.5.1, 1.5.2.2 | ✅ **Done** |
| **MAG-21** | Production Database Schema Verification | Database | Sprint 3 | 1.2.1.2, 1.6.2.5 | ✅ **Done** |
| **MAG-22** | Budget Tracker Page & Recharts Visualizations | Frontend | Sprint 3 | 1.3.1.4, 1.3.1.5 | ✅ **Done** |
| **MAG-23** | Authentication UI & Protected Routing | Frontend | Sprint 3 | 1.3.4.3, 1.5.1.1 | ✅ **Done** |
| **MAG-24** | Shared UI Components & Guest List CRUD | Frontend | Sprint 3 | 1.3.2.4 | ✅ **Done** |
| **MAG-25** | Vendor Data Model Enrichment & Ratings | Backend | Sprint 3 | 1.2.2.3 | ✅ **Done** |
| **MAG-26** | Premium UI Redesign & Cart Drawer Component | Frontend | Sprint 3 | 1.4.1.1, 1.4.1.2, 1.4.1.3 | ✅ **Done** |
| **MAG-27** | Bearer Token Filter & IDOR Protection | Backend | Sprint 3 | 1.6.1.1, 1.6.1.3 | ✅ **Done** |
| **MAG-28** | Budget Summary Aggregation Endpoint | Backend | Backlog | 1.3.1.3 | ✅ **Done** |
| **MAG-29** | Vendor Multi-District Filter & Search API | Backend | Backlog | 1.2.2.2 | ✅ **Done** |
| **MAG-30** | Multi-Vendor Cart Booking Checkout Engine | Backend | Backlog | 1.4.2.2, 1.4.2.3 | ✅ **Done** |
| **MAG-31** | Guest RSVP Status PATCH Endpoint | Backend | Backlog | 1.3.2.3 | ✅ **Done** |
| **MAG-32** | BCrypt Password Cryptography & Case Insensitivity | Backend | Sprint 3 | 1.6.1.2 | ✅ **Done** |
| **MAG-33** | Production Seed Data with Real Vendor Contacts | Database | Backlog | 1.2.1.3, 1.6.2.5 | ✅ **Done** |
| **MAG-34** | E2E Share Invitation Test Suite Execution | QA | Sprint 3 | 1.6.3.4 | ✅ **Done** |

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
| Payment gateway scope creep | High | Medium | Decoupled live banking gateways from MVP; engineered an interactive **Commercial Payment Sandbox Gateway** on `/vendors/new` and `/vendor/dashboard` allowing full evaluation of the monetization model without merchant fees |
| Cross-tenant resource tampering (IDOR) | Low | High | Enforced server-side principal verification across budget items, guest lists, and vendor profile endpoints in Spring Security; added unit tests proving 403 Forbidden denial |
| Deployment environment configuration drift | Low | Medium | Use Spring profiles (`application-local.properties`, `application-prod.properties`), automated startup seeding (`TestAccountInitializer`), and document all config in README |
---

## 7. Quality Assurance Strategy

Quality is integrated throughout the development lifecycle rather than deferred to a final testing phase.

- **Unit Testing:** Backend developers write JUnit 5 unit tests for all service-layer classes. Frontend components are manually verified during development with a checklist-based approach.
- **Integration Testing:** Spring Boot integration tests (`@SpringBootTest`) validate controller endpoints against an in-memory database. Frontend-to-backend API contracts are verified with Postman collections maintained alongside the codebase.
- **System Testing:** The QA Engineer (Ruchira) executes a structured system test plan during Sprint 3, covering functional correctness, cross-browser compatibility, responsive design behavior, and error handling. All defects are logged in Jira with severity classification (Critical, Major, Minor, Cosmetic), reproduction steps, expected versus actual behavior, and environment details.
- **Defect Management:** Resolved defects are assigned back to the QA Engineer for retesting and closure. The defect register is reviewed during each sprint retrospective to identify recurring patterns and process improvements.

---

*This Project Management Plan is a living document. It will be reviewed and updated at the conclusion of each sprint to reflect actual progress, revised estimates, and any changes to team allocation or project scope.*

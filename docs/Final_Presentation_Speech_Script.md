# MagulaPlan (Magula.lk) — Final Presentation & Live Demo Master Speech Script

**Course:** CCS2313 — Project Management  
**Project Group:** Group 04  
**Project Title:** MagulaPlan — A Centralized Digital Wedding Planning Platform for Sri Lanka  
**Target Duration:** 14 Minutes 30 Seconds *(15-Minute Hard Deadline)*  
- **Slide Presentation:** ~8 Minutes 30 Seconds  
- **Live System Demonstration:** ~5 Minutes 30 Seconds  
- **Panel Q&A Buffer:** ~30 Seconds  

---

## 1. Presentation Overview & Speaker Schedule

| Segment & Slides | Allocated Speaker | Target Duration | Primary Content Covered |
|---|---|:---:|---|
| **1. Story & Title (Slides 1–2)** | Ruhini (K.A.R.D. Sammani) | 0:45 | Cultural wedding context, industry fragmentation, Group 04 introduction |
| **2. Problem & Market (Slide 3)** | Ruhini | 0:50 | 100K annual weddings, scattered platforms, opaque pricing, Excel errors |
| **3. Solution & Scope (Slide 4)** | Ruhini | 0:50 | 3-Role B2B2C marketplace: Couples, Commercial Vendors, Admin governance |
| **4. Tech Stack (Slide 5)** | Amanda Lakmal | 0:50 | React 19, Spring Boot 4.1, Spring Security 6 RBAC, MySQL 8.4, JPA/Hibernate |
| **5. Architecture (Slide 6)** | Amanda Lakmal | 1:00 | 3-tier high-level architecture diagram, security gateway, IDOR protection |
| **6. Plan & Risks (Slide 7)** | Dileepa Ranathunga | 0:55 | 3 sprints, 31/31 Jira tickets, WhatsApp pivot, sandbox payment risk resolution |
| **7. Business & Budget (Slide 8)** | Dileepa Ranathunga | 0:55 | 3 freemium tiers (LKR 0 / 2.5K / 5K), 16.4% budget savings (LKR 141.5K saved) |
| **8. Individual Contributions** | All 5 Members | 2:30 | Strict 30s per member: role, Jira tickets, work share %, and key deliverables |
| • Slide 9: Maheen Sayuru | Maheen Sayuru | 0:30 | Project Manager / DevOps (21.0%): InfinityFree & Render pipelines, APIs |
| • Slide 10: Sammani | Ruhini (Sammani) | 0:30 | Database / BA (19.0%): 3NF schema, ER diagram, SQL seeds, requirement specs |
| • Slide 11: Amanda Lakmal | Amanda Lakmal | 0:30 | Backend Lead (21.0%): Spring Boot, RBAC, IDOR, BCrypt, vendor lead engine |
| • Slide 12: Dileepa Ranathunga | Dileepa Ranathunga | 0:30 | UI/UX & Frontend (20.0%): Vendor portal, 3-tier selector, sandbox payment, cart |
| • Slide 13: Ruchira Nimnaka | Ruchira Nimnaka | 0:30 | QA Lead (19.0%): 142 JUnit tests (100%), 13 Vitest tests, 55 test scenarios |
| **9. Future Upgrades (Slide 14)** | Ruhini | 0:40 | 3-Phase evolution: Live PayHere/Stripe, availability calendar, AI Nekath |
| **10. Live Demo: Couple Flow** | Maheen Sayuru | 3:00 | Discovery, 25 districts, WhatsApp click-to-chat, cart checkout, budget, guest RSVP |
| **11. Live Demo: Vendor & Admin** | Ruchira Nimnaka | 2:20 | Vendor self-reg, plan tiers, sandbox payment, vendor portal, admin approval |
| **12. Thank You & Conclusion (Slide 16)** | Ruchira Nimnaka | 0:25 | Formal closing, live links summary, handoff to panel Q&A |

---

## 2. Master Presentation Speech Script

### [0:00 – 0:45] Slide 1 & 2: Story & Title
**Speaker:** **Ruhini (K.A.R.D. Sammani)**

> *"Good morning, respected members of the panel and fellow students. Welcome to our presentation.
> 
> Planning a wedding in Sri Lanka is one of the most culturally significant and joyful milestones in a family’s life. But for anyone who has ever tried to coordinate a Poruwa ceremony, book an auspicious Astrological Nekath time, or negotiate with dozens of disconnected vendors, it quickly becomes stressful and overwhelming.
> 
> Couples often spend six to twelve months juggling messy Excel spreadsheets, scattered Facebook pages, and endless phone calls. Today, Group 04 is proud to present **MagulaPlan** — Sri Lanka’s first centralized, boutique digital wedding planning platform and commercial vendor marketplace.
> 
> Our team consists of Maheen, Amanda, Dileepa, Ruchira, and myself, Ruhini. Together, we engineered a production-ready solution to bring modern digital elegance to our rich wedding traditions."*

---

### [0:45 – 1:35] Slide 3: Problem & Research
**Speaker:** **Ruhini**

> *"Let us look at the real-world problem we identified through our industry research.
> 
> Over 100,000 weddings take place in Sri Lanka every single year. Yet, the entire wedding industry remains digitally fragmented. Couples are forced to search across Instagram profiles, Facebook groups, and word-of-mouth recommendations with no standardized pricing, opaque package inclusions, and zero way to compare vendors side-by-side.
> 
> Financially, couples rely on handwritten notebooks or error-prone spreadsheets, meaning deposits, cash balances, and impending overspend alerts are frequently lost. Furthermore, managing guest RSVPs is conducted through tedious individual phone calls, leaving families with inaccurate headcounts right up to the week of the wedding.
> 
> While international platforms like The Knot or Zola exist, they completely fail to accommodate Sri Lankan realities — they have no concept of Kandyan Poruwa rituals, auspicious Nekath timelines, or WhatsApp-first communication.
> 
> This created our clear market opportunity: a culturally tailored, full-stack digital planning platform."*

---

### [1:35 – 2:25] Slide 4: Solution & Target Market
**Speaker:** **Ruhini**

> *"Our solution is **MagulaPlan** — a connected, multi-role B2B2C marketplace uniting three distinct stakeholders:
> 
> First, **Couples**: who receive a centralized workspace to discover verified vendors across all 25 districts, track budget items with dynamic visual breakdowns, organize Bride and Groom guest lists, and send digital invitations directly via WhatsApp.
> 
> Second, **Commercial Vendors**: who can self-register, choose from 3-tier commercial hosting packages (Free, Pro, or Featured Gold), simulate payments via our commercial sandbox, receive verified badges, and track customer booking inquiries in a dedicated vendor portal.
> 
> And third, **Administrators**: who govern marketplace safety, moderate new vendor listings, and monitor live platform KPIs.
> 
> With our core scope delivered, I will now hand over to Amanda to explain our technical implementation and system architecture."*

---

### [2:25 – 3:15] Slide 5: Tech Stack & Architecture
**Speaker:** **Amanda Lakmal**

> *"Thank you, Ruhini. Good morning, panel.
> 
> MagulaPlan is engineered as a high-performance **3-Tier Layered Architecture**, strictly separating presentation, business logic, and data persistence layers.
> 
> At the **Presentation Tier**, we built a responsive Single Page Application using **React 19** and **Vite 8**, styled with **Tailwind CSS 3.4** under our 'Storybook Romance' luxury design tokens. We utilized **Recharts** for real-time budget visualizations and **Framer Motion** for fluid micro-interactions.
> 
> At the **Application Tier**, we deployed **Java 17** with **Spring Boot 4.1 REST microservices**. To secure the platform, we engineered a custom stateless **SessionTokenAuthenticationFilter** paired with **Spring Security 6**, enforcing Role-Based Access Control across our three roles: `ROLE_USER`, `ROLE_VENDOR`, and `ROLE_ADMIN`. Passwords are encrypted using **BCrypt cryptography**.
> 
> At the **Data Persistence Tier**, we utilize **MySQL 8.4** managed via **Spring Data JPA 3.4** and **Hibernate 7.4**. We structured 7 normalized 3NF tables with strict referential integrity and an automated self-healing startup seeding engine."*

---

### [3:15 – 4:15] Slide 6: High-Level Architecture Diagram
**Speaker:** **Amanda Lakmal**

> *"On Slide 6, you see our High-Level System Architecture Diagram.
> 
> Starting from the top, all client traffic flows securely over HTTPS. Our client layer features four modular suites: the Public Discovery suite, the Couple Planning Suite, the Commercial Vendor Portal, and the Admin Moderation Suite.
> 
> Incoming requests pass through our **Security and API Gateway Layer**. Here, dual-origin CORS policies protect against cross-site exploitation. Our custom filter inspects 64-character bearer UUID tokens, validating user identity and enforcing **Insecure Direct Object Reference (IDOR) protection**. This guarantees that couples only see their own budget items and guests, and vendors can only modify their own business listings.
> 
> In our Application layer, specialized services handle authentication, vendor search and district filtering, booking checkout, and digital invitation generation.
> 
> Finally, Hibernate manages secure, TLS-encrypted JDBC transactions to our MySQL database on Aiven Cloud.
> 
> I will now hand over to Dileepa to present our project planning, risk mitigation, and business model."*

---

### [4:15 – 5:10] Slide 7: Project Plan & Risk Management
**Speaker:** **Dileepa Ranathunga**

> *"Thank you, Amanda. Good morning, panel.
> 
> To deliver this platform within our 6-week module timeline, we adopted an **Agile Scrum and Kanban framework**, partitioned into three 2-week sprints.
> 
> All user stories were tracked on our **Atlassian Jira Kanban board**, where our team achieved a **100% completion rate, closing 31 out of 31 Jira tickets**.
> 
> Throughout development, we navigated four critical risks:
> 1. First, **Meta WhatsApp API Bottlenecks**: Official Meta Cloud APIs require lengthy business registration and incur per-message costs. We pivoted strategically to the native **Web Share API** paired with WhatsApp Click-to-Chat deep links, delivering instant, zero-cost invite sharing.
> 2. Second, **Cloud Database Sleep Timeouts**: Free-tier cloud instances sleep after inactivity. We implemented HikariCP retry pooling, startup health checks, and offline frontend fallbacks.
> 3. Third, **Security Gaps**: We upgraded all authentication to salted BCrypt hashing and Bearer session tokens.
> 4. And fourth, **Payment Scope Creep**: To satisfy our commercial monetization requirements without risking banking merchant delays, we engineered an **interactive Simulated Payment Sandbox Gateway**, allowing complete end-to-end commercial testing safely."*

---

### [5:10 – 6:05] Slide 8: Business Model & Budget
**Speaker:** **Dileepa Ranathunga**

> *"Turning to Slide 8, MagulaPlan is designed as a self-sustaining commercial business.
> 
> Our revenue model consists of three streams:
> 1. **Freemium Vendor Subscriptions**: Local vendors can list for free, but upgrade to **Pro Verified at LKR 2,500/month** to receive a blue verification badge, priority contact display, and customer lead tracking. Luxury vendors can upgrade to **Featured Gold at LKR 5,000/month** for top-of-category placement and landing page showcases.
> 2. **Booking Commission**: A 2.5% to 5.0% commission charged on confirmed bookings initiated through our multi-vendor selection cart.
> 3. **Category Sponsorships**: Premium banner placements for leading venues and salons.
> 
> From a project management budget perspective, our planned budget was **LKR 861,500**. Our actual expenditure was **LKR 720,000**, representing purely developer human-resource hours. By leveraging lean cloud free-tiers on InfinityFree, Render, and Netlify, we achieved **LKR 141,500 in direct cost savings (a 16.4% savings)**.
> 
> We will now present our individual member contributions."*

---

### [6:05 – 8:35] Slides 9 – 13: Individual Member Contributions (25 Marks)

#### [6:05 – 6:35] Slide 9: Maheen Sayuru (CIT-24-02-0189)
**Speaker:** **Maheen Sayuru**
> *"Good morning, panel. As Project Manager and Full-Stack DevOps engineer, my overall project share is **21.0%**, covering 9 Jira tickets.
> 
> I authored the Project Management Plan, WBS, and sprint governance in Jira. I architected our GitHub monorepo and established our production deployment pipelines on **InfinityFree** for the React frontend and **Render** for the Spring Boot container.
> 
> On the backend, I engineered the budget-summary aggregation API, the RSVP status PATCH endpoint, and the Web Share API mobile integration. I oversaw cross-functional delivery, ensuring 100% on-time sprint completions."*

---

#### [6:35 – 7:05] Slide 10: K.A.R.D. Sammani (CIT-24-02-0058)
**Speaker:** **Ruhini (Sammani)**
> *"As Database Engineer and Business Analyst, my project share is **19.0%**, covering 4 Jira tickets.
> 
> I designed our normalized 3NF MySQL 8.4 relational schema and authored the official Entity-Relationship diagram. I wrote our idempotent database migration scripts (`schema.sql` and `data_seed.sql`), establishing table constraints, foreign keys, and indexes.
> 
> I verified our Aiven cloud database connection resilience, and authored our Functional and Non-Functional Requirements specifications, ensuring technical models matched our market problem."*

---

#### [7:05 – 7:35] Slide 11: Amanda Lakmal (CIT-24-02-0007)
**Speaker:** **Amanda Lakmal**
> *"As Backend Lead Developer, my overall project share is **21.0%**, covering 7 Jira tickets.
> 
> I engineered our Spring Boot 4.1 REST API architecture across Controller, Service, and Repository patterns. I designed and implemented our custom `SessionTokenAuthenticationFilter`, Spring Security 6 RBAC for three roles, and BCrypt password encryption.
> 
> I built our multi-vendor cart checkout engine, our vendor booking leads pipeline, and enforced tenant-level IDOR security so users cannot tamper with other accounts' data."*

---

#### [7:35 – 8:05] Slide 12: Dileepa Ranathunga (CIT-24-02-0046)
**Speaker:** **Dileepa Ranathunga**
> *"As UI/UX Lead and Lead Frontend Developer, my overall project share is **20.0%**, covering 8 Jira tickets.
> 
> I authored our wireframes in Figma and established the Storybook Romance luxury design tokens. I built the React 19 Single Page Application with route-level code splitting and accessible components.
> 
> I engineered the **Commercial Vendor Portal (`/vendor/dashboard`)**, our 3-tier Plan Selector, the Simulated Payment Sandbox Modal, the Guest RSVP portal (`/rsvp/:id`), the interactive Budget Tracker with Recharts, the multi-vendor Cart Drawer, and the live Nekath Countdown Timer."*

---

#### [8:05 – 8:35] Slide 13: Ruchira Nimnaka (CIT-24-02-0029)
**Speaker:** **Ruchira Nimnaka**
> *"As Quality Assurance Lead and Test Engineer, my overall project share is **19.0%**, covering 3 Jira tickets.
> 
> I automated and verified our backend test suite, achieving **142 out of 142 passing JUnit 5 tests (a 100% pass rate)**, and verified our 13 Vitest frontend unit tests.
> 
> I authored the comprehensive **55-scenario System Test Plan**, developed the Playwright E2E cross-device test suite, and maintained our Defect Register, re-testing and verifying all critical defects prior to submission.
> 
> I will now hand back to Ruhini for future upgrades."*

---

### [8:35 – 9:15] Slide 14: Future Upgrades & Product Roadmap
**Speaker:** **Ruhini**

> *"Looking ahead, our strategic product evolution roadmap is organized into three phases:
> 
> In **Phase 1 (Q4 2026)**, we will commercialize live banking gateways, integrating PayHere and Stripe for Visa, MasterCard, and LankaQR advance payments, along with automated escrow and PDF tax receipts.
> 
> In **Phase 2 (Q1 2027)**, we will expand our vendor portal with an interactive availability calendar to prevent double-booking on popular Nekath dates, and introduce real-time couple-to-vendor chat.
> 
> In **Phase 3 (Q2 2027)**, we will integrate a Generative AI Nekath ceremony itinerary generator, a 2D banquet seating chart, and trilingual support in Sinhala, Tamil, and English.
> 
> We are now excited to demonstrate our live, fully deployed system. Maheen will demonstrate the Couple experience, followed by Ruchira with the Vendor and Admin workflows."*

---

# Part 3: Live System Demonstration (9:15 – 14:45)

### [9:15 – 12:15] Part 1: Couple / Customer Experience Demo
**Presenter:** **Maheen Sayuru**  
*Live URL:* `https://magulaplan.infinityfreeapp.com/?i=1`

#### Action 1: Landing Page & Directory Discovery (0:00 – 0:45)
> *"Thank you, Ruhini. Panel, you are now looking at our live production deployment hosted on InfinityFree, connected to our Spring Boot container on Render.
> 
> As you can see, our landing page welcomes engaged couples with an authentic Sri Lankan bridal aesthetic. Couples can browse our 8 curated vendor categories or explore featured luxury vendors like Cinnamon Grand Colombo and Studio 3000DF.
> 
> Let’s navigate into the **Vendor Directory**. Notice how fast and responsive this is. I can search in real time for 'Studio', filter by district like 'Colombo', or sort by price. Every vendor displays authentic starting prices, verified checkmarks, and location details."*

#### Action 2: Vendor Detail & WhatsApp Click-to-Chat (0:45 – 1:30)
> *(Clicking on Studio 3000DF)*  
> *"Opening a vendor detail page reveals rich imagery, starting packages, and direct interaction channels. Notice our Web Share API integration: if I click Share, desktop copies the link, while mobile launches the native share sheet.
> 
> More importantly, clicking the **'Chat on WhatsApp'** button immediately formats an official Sri Lankan international link (`wa.me/94...`) with a pre-filled inquiry message: 'Hello! I found your services on MagulaPlan and would like to inquire about package details.' This completely eliminates communication friction."*

#### Action 3: Multi-Vendor Cart Checkout (1:30 – 2:15)
> *"Couples don’t book just one vendor; they coordinate several. I will click **'Add to Selections'** on Studio 3000DF, Lassana Flora, and Cinnamon Grand. Opening our slide-over **Cart Drawer**, couples can review their shortlisted vendors, see the starting price subtotal, and click **'Request Bookings'**.
> 
> This sends an authenticated request to `POST /api/v1/bookings/checkout`, creating persistent pending bookings in our database and routing inquiries directly to those vendors."*

#### Action 4: Couple Dashboard, Budget & Guest RSVP (2:15 – 3:00)
> *(Logging in as `test@magulaplan.lk` / `Password@123`)*  
> *"Now let's sign in as a registered couple. Notice our smart role-aware routing immediately directs us to the **Couple Dashboard**.
> 
> Here, couples see their live **Nekath Wedding Countdown Timer**, dynamic KPI cards, and quick planning actions.
> 
> In our **Budget Tracker**, couples track itemized wedding expenses across venues, decor, and attire. Adding an item recalculates our dynamic Recharts spend breakdown in real time. Because of our IDOR security, couples can only view and manage their own financial items.
> 
> In our **Guest List**, we organize guests by Bride or Groom side, track meal preferences, and generate unique digital invitation links. I will click **'Share Invitation'** for our guest Nadeesha. This generates an active RSVP link.
> 
> I will now hand over to Ruchira to demonstrate our Commercial Vendor Portal and Admin moderation workflows."*

---

### [12:15 – 14:35] Part 2: Commercial Vendor & Admin Workflow Demo
**Presenter:** **Ruchira Nimnaka**

#### Action 1: Vendor Registration & Commercial Plan Selection (0:00 – 0:50)
> *"Thank you, Maheen. I will now demonstrate the commercial B2B engine that powers MagulaPlan.
> 
> A wedding vendor visiting our site clicks **'List your business'**. Notice that prospective vendors can register publicly without needing a prior couple account.
> 
> I will enter our business name: 'Royal Ceylon Photography', select category 'Photography', district 'Colombo', enter our contact details, set a starting price of LKR 75,000, and create a portal password.
> 
> Now, notice our **Commercial Listing Plans**: vendors choose between our Free Tier, **Pro Verified at LKR 2,500/month**, or **Featured Gold at LKR 5,000/month**. Watch our submit button: selecting Pro dynamically updates the call to action to: **'Proceed to Payment & Listing (LKR 2,500)'**."*

#### Action 2: Simulated Payment Sandbox & Vendor Dashboard (0:50 – 1:30)
> *(Clicking Proceed to Payment)*  
> *"Clicking submit triggers our **Simulated Commercial Payment Sandbox Gateway**. This proves our business model without incurring live bank merchant fees.
> 
> The modal clearly displays the selected Pro tier, monthly billing cycle, and pre-filled sandbox card details (`4242 •••• •••• 4242`). Clicking **'Simulate Successful Payment'** executes the transaction, auto-provisions a `ROLE_VENDOR` account, logs the vendor in, and redirects straight to the **Vendor Dashboard**.
> 
> Here on the Vendor Dashboard, the vendor sees their **'Awaiting Admin Approval'** status badge and active **Pro Plan**.
> 
> Clicking our **'Customer Inquiries'** tab reveals the real business value: every inquiry sent from couple cart checkouts appears here, displaying the couple's name, email, phone number, and a direct **'WhatsApp Couple'** button.
> 
> In the **'Edit Profile'** tab, the vendor can update their starting price, phone, and portfolio description, protected by our backend IDOR ownership checks."*

#### Action 3: Public Invitee Digital RSVP Portal (1:30 – 2:00)
> *(Opening `/rsvp/:guestId` in a private tab)*  
> *"Now, let's open the digital RSVP link that Maheen generated for guest Nadeesha. An invited guest receives this link on WhatsApp and opens it on their phone without logging in.
> 
> They see a personalized wedding invitation: 'Dear Nadeesha Gunawardena, Kasun & Sandani invite you...' The guest clicks **'Joyfully Accept'**, selects their banquet meal preference, and clicks **'Confirm RSVP'**. The response updates instantly in the couple’s dashboard."*

#### Action 4: Admin Moderation Suite (2:00 – 2:35)
> *(Logging in as `admin@magulaplan.lk` / `Admin@123`)*  
> *"Finally, let’s sign in as the Platform Administrator. Our role-aware router immediately directs us to `/admin`.*
> 
> *The dashboard displays live system KPIs across total vendors, users, bookings, and pending approvals. Opening **'Vendor Approvals'**, we see our newly registered vendor, 'Royal Ceylon Photography', waiting in the queue.
> 
> I inspect the application and click **'Approve'**. The status updates to `APPROVED` and `verified = true`. If we now open the public directory, Royal Ceylon Photography is immediately published live with its blue verified badge.
> 
> In **'User Management'**, administrators can search registered couples and toggle account suspensions with instant security enforcement.
> 
> This concludes our live demonstration."*

---

### [14:35 – 15:00] Slide 16: Thank You & Conclusion
**Speaker:** **Ruchira Nimnaka**

> *"To conclude, Group 04 has delivered an enterprise-grade, culturally tailored, and thoroughly tested digital wedding commerce platform.
> 
> MagulaPlan achieves 100% test passing rates across 142 JUnit and 13 Vitest tests, proves its commercial monetization model through an interactive vendor portal and sandbox gateway, and is fully deployed online for immediate use.
> 
> All source code, Figma wireframes, test matrices, and documentation are available in our public GitHub repository. Thank you for your time and attention. We are now pleased to open the floor to the panel for questions."*

---

## 4. Anticipated Panel Q&A Guide (15 Minutes)

| Anticipated Panel Question | Lead Speaker | Evidence-Backed Answer |
|---|:---:|---|
| **Why Session Tokens instead of JWT?** | Amanda | JWT tokens carry stateless cryptographic signatures that cannot be easily revoked before expiration without a server-side blacklist. In MagulaPlan, we issue cryptographically random 64-character UUID session tokens stored in `users.session_token`. This allows instant invalidation upon logout, immediate revocation if an admin suspends an account, and sub-millisecond database lookups via indexing without cryptographic hashing overhead on every request. |
| **Why a simulated payment sandbox instead of real PayHere/Stripe?** | Maheen / Dileepa | Integrating live merchant gateways like PayHere or Stripe requires formal corporate business registration (BR), active corporate bank merchant approval, and recurring fees, which fall strictly outside our academic mini-project scope. To prove our commercial monetization model authentically, we engineered an interactive sandbox modal that simulates the complete commercial transaction, assigns `paymentStatus = PAID`, upgrades vendor badge tiers, and auto-provisions vendor portal credentials without financial risk. |
| **How does your system prevent IDOR vulnerabilities?** | Amanda | On endpoints like `GET/PUT /api/v1/budget-items` and `GET/PUT /api/v1/guests`, the backend never trusts client-supplied `userId` values. Instead, our `SessionTokenAuthenticationFilter` extracts the verified user ID from the bearer token and injects it into `SecurityContextHolder`. Service implementations enforce that the authenticated user owns the target record before executing any read, update, or delete operation. Non-owners receive an immediate `403 Access Denied`, verified by our `VendorSecurityIntegrationTest` suite. |
| **How did you handle cloud database sleep timeouts?** | Ruhini / Maheen | Cloud MySQL instances on free tiers like Aiven or Render pause connections after inactivity, which previously caused 500 timeouts on initial page load. We mitigated this by configuring HikariCP connection pool validation queries (`SELECT 1`), keeping the pool resilient. Additionally, the frontend features an embedded fallback dataset (`seedVendors.js`) so the public directory remains functional even during cloud container cold starts. |
| **What was your testing strategy and defect resolution process?** | Ruchira | We adopted a multi-layered testing pyramid. At the base, we engineered 142 automated JUnit 5 tests covering controllers, services, and security filters with MockMvc. On the frontend, we ran 13 Vitest tests for components and cart context. For end-to-end testing, we executed a 55-scenario System Test Plan using Playwright across 375px mobile, 768px tablet, and 1280px desktop viewports. All defects (like DEF-001 to DEF-005) were formally logged, tracked, and verified closed in our Defect Register. |

---

## 5. Project Manager (Maheen Sayuru) Defense & Viva Q&A Guide

This section provides direct, evidence-backed answers for the Project Manager when questioned by university examiners on Agile governance, resource allocation, budget variance, DevOps pipelines, risk mitigation, and scope control:

### PM-Q1: "How did you derive the Work Breakdown Structure (WBS), and how did it map to your Jira Kanban board and sprint cycle?"
> **Maheen's Answer:**  
> *"We derived our WBS by decomposing the four foundational modules from our project proposal—Vendor Directory, Budget Tracker, Guest List, and Digital Invitations—down into assignable, deliverable-oriented work packages with discrete 2 to 6-hour estimates. Each WBS code (such as `VD-01`, `BT-03`, `WA-05`) was mapped directly onto a parent Jira user story (`MAG-1` through `MAG-34`).  
> We governed execution across three consecutive two-week Agile sprints in Atlassian Jira Cloud:  
> • **Sprint 1 (Architecture & Setup):** 3NF MySQL modeling, base REST routing, Figma wireframes, and GitHub monorepo CI/CD setup.  
> • **Sprint 2 (Core Feature Build):** Domain services, CRUD controllers, Budget Tracker, Guest List, and initial frontend integration.  
> • **Sprint 3 (Hardening & Deployment):** Spring Security 6 session tokens, BCrypt cryptography, Playwright E2E testing, InfinityFree/Render cloud deployment, and our commercial vendor monetization pipeline.  
> Through daily async standups and sprint retrospectives, we tracked velocity and achieved a **100% completion rate, closing 31 out of 31 Jira tickets** on schedule."*

---

### PM-Q2: "You had a single primary backend developer (Amanda) and one QA engineer (Ruchira). How did you prevent bottlenecks and manage team velocity?"
> **Maheen's Answer:**  
> *"To mitigate single-point-of-failure risks, we established cross-functional secondary ownership early in our Project Management Plan (documented under Risk `RSK-02`).  
> As Project Manager, I am cross-trained in Spring Boot and full-stack development. When Amanda was focused on core security filters, BCrypt hashing, and the cart checkout engine, I independently engineered and shipped the budget summary aggregation endpoint (`GET /api/v1/budget-items/summary/{userId}`) and the guest RSVP status PATCH endpoint (`PATCH /api/v1/guests/{id}/rsvp`), preventing a backend delivery bottleneck.  
> Similarly, in QA, while Ruchira led test case authoring and automated Playwright E2E suites, Dileepa and I wrote component-level Vitest unit tests on the frontend. This parallel track structure prevented developers from waiting on testing sign-offs."*

---

### PM-Q3: "You expanded beyond your initial proposal by building an e-commerce cart, vendor portal, and admin dashboard, yet you deferred live PayHere/Stripe. What framework guided your scope trade-offs?"
> **Maheen's Answer:**  
> *"We utilized the **MoSCoW Prioritization Framework** (Must-Have, Should-Have, Could-Have, Won't-Have) balanced against our strict 6-week academic deadline:  
> • **Must-Haves (Delivered):** The 4 core modules (Directory, Budget, Guests, Invitations) with robust authentication and automated tests.  
> • **Should-Haves (Delivered via Scope Expansion):** The multi-vendor cart drawer (`MAG-26`), customer booking checkout (`MAG-30`), and administrative moderation suite (`MAG-20`) were added because they naturally connected the B2C customer journey with B2B vendor value.  
> • **Scope Governance on Payments:** When evaluating live banking gateways (PayHere / Stripe), we identified significant external blocker risks: corporate business registration (BR) verification delays, merchant KYC, and monthly recurring fees. Attempting live bank integration would have jeopardized our core sprint delivery. Instead, we made the strategic engineering decision to build an **interactive Simulated Payment Sandbox Gateway**. This fully demonstrated our monetization model, plan tiers, and badge provisioning without schedule creep, while deferring live merchant accounts to Phase 1 of our enterprise roadmap."*

---

### PM-Q4: "Explain your budget variance: planned LKR 861,500 vs. actual LKR 720,000. How did you achieve a 16.4% cost saving?"
> **Maheen's Answer:**  
> *"Our planned budget of LKR 861,500 included LKR 720,000 for development human resource effort (600 engineering hours across 5 members @ an academic baseline rate of LKR 1,200/hour) plus LKR 141,500 in contingency for cloud hosting, commercial design tools, and paid messaging APIs.  
> We achieved **LKR 141,500 in direct cash savings (a 16.4% cost saving)** through three strategic operational optimizations:  
> 1. **Zero-Cost Tooling:** Leveraged the Figma Education license (saving LKR 18,000), GitHub Academic monorepo tier (saving LKR 12,000), and Jira Cloud Free tier (saving LKR 20,000).  
> 2. **Lean Cloud Infrastructure:** Replaced paid cloud hosting with an optimized multi-cloud free tier architecture: InfinityFree Apache hosting for the frontend, Render Docker container for Spring Boot, and Aiven Cloud for MySQL 8.4 (saving LKR 36,000).  
> 3. **Architectural WhatsApp Pivot:** Pivoted from Meta WhatsApp Business Cloud API per-message template fees ($0.05/msg) to the native Web Share API with automated Click-to-Chat deep links (saving LKR 40,000 in messaging fees and verification delays).  
> As a result, our actual out-of-pocket operational spend was **LKR 0**, keeping the project 100% within human resource allocation."*

---

### PM-Q5: "Why did you use a dual-frontend deployment (InfinityFree + Netlify) and Render for Spring Boot? How does your DevOps pipeline handle deployment drift?"
> **Maheen's Answer:**  
> *"Our deployment strategy was engineered for high availability and zero single-point-of-failure hosting:  
> • **Backend API:** Containerized on **Render** using a custom Dockerfile with an Eclipse Temurin JRE 17 runtime, connected to an Aiven Cloud MySQL 8.4 instance over TLS-encrypted JDBC. It auto-deploys via continuous integration whenever changes are merged into the `main` branch.  
> • **Primary Frontend:** Deployed on **InfinityFree Apache storage** configured with an `.htaccess` rewrite rule (`mod_rewrite`) to guarantee HTML5 pushState SPA routing without 404 errors on deep subpaths like `/vendors/new` or `/rsvp/:guestId`.  
> • **Edge CDN Mirror:** Mirrored on **Netlify CDN** with automated GitHub commit hooks for high global delivery speed.  
> • **Environment Drift Prevention:** In our frontend `api.js`, we engineered an intelligent dynamic host fallback: when running locally, it binds to `http://localhost:8080`; when running on InfinityFree, Netlify, or any remote domain, it automatically resolves to `https://magulaplan-api.onrender.com`, eliminating hardcoded host bugs across environments."*

---

### PM-Q6: "What were the most severe risks you faced during the project lifecycle, and can you describe a specific time you had to pivot?"
> **Maheen's Answer:**  
> *"Our top risk was **Risk RSK-01: Meta WhatsApp Business API Bottlenecks**, which scored a maximum Critical score of 25 (Likelihood 5 × Impact 5) in our Risk Matrix. In Sprint 2, we discovered that obtaining Meta Cloud API business approval in Sri Lanka required corporate documentation that would have taken 3 to 4 weeks, completely stalling our sprint.  
> I led an **Architectural Pivot**: we replaced the server-side Meta API webhook with the browser's native **Web Share API (`navigator.share`)** on mobile and desktop clipboard copy fallbacks, paired with pre-formatted WhatsApp deep links (`https://wa.me/94...`). This eliminated 100% of the recurring message costs, bypassed Meta approval entirely, and allowed couples to share digital invitations and inquiries directly from their own WhatsApp accounts.  
> A second major risk was **RSK-02: Cloud Database Inactivity Sleep**. We resolved this by configuring HikariCP connection pool validation queries (`SELECT 1`), implementing an automated startup seed engine (`TestAccountInitializer`), and embedding an offline fallback dataset (`seedVendors.js`) on the client."*

---

### PM-Q7: "What was your Definition of Done (DoD) before a Jira ticket could move to 'Done', and how did you govern code reviews on GitHub?"
> **Maheen's Answer:**  
> *"Our team established a strict **Definition of Done (DoD)** enforced across all 31 Jira tickets:  
> 1. **Code Completeness:** Feature implemented according to documented functional acceptance criteria with clean separation of concerns.  
> 2. **Automated Testing:** All unit and integration tests passing with zero regressions across our 142 JUnit backend tests and 13 Vitest frontend tests.  
> 3. **Branch Protection & Code Review:** Direct pushes to `main` were disabled. Developers created feature branches (`feat/MAG-N-description`), opened a GitHub Pull Request, and required at least one peer review approval. I personally reviewed pull requests for architectural alignment, security constraints, and clean cutovers before merging.  
> 4. **Cross-Viewport Responsiveness:** Frontend UI verified across 375px mobile, 768px tablet, and 1280px desktop breakpoints with zero horizontal scrollbar violations.  
> 5. **Documentation Traceability:** Code changes cross-referenced with the corresponding Jira issue ID, API specification, and test case register."*

---

### PM-Q8: "Why is your individual contribution split 21% / 21% / 20% / 19% / 19% instead of being based strictly on raw GitHub code commits?"
> **Maheen's Answer:**  
> *"Evaluating software engineering contributions purely on raw lines of code or commit counts is a well-documented anti-pattern in project management because it completely overlooks critical non-coding engineering deliverables across the SDLC.  
> In MagulaPlan, our **Holistic SDLC Contribution Model** evaluates work across four essential engineering dimensions:  
> • **Project Management & DevOps (Maheen — 21.0%):** WBS, sprint governance, 9 Jira tickets, monorepo CI/CD, multi-cloud hosting, and API development.  
> • **Backend Architecture & Security (Amanda — 21.0%):** Spring Boot 4.1 services, Spring Security 6 RBAC, BCrypt cryptography, IDOR protection, and 7 Jira tickets.  
> • **UI/UX & Design Systems (Dileepa — 20.0%):** Figma wireframes, Storybook Romance design tokens, React 19 SPA, Vendor Dashboard, 8 Jira tickets.  
> • **Database Modeling & Business Analysis (Ruhini/Sammani — 19.0%):** 3NF normalized schema design, ER diagram modeling, idempotent SQL seed scripts, functional requirements specifications, and 4 Jira tickets.  
> • **Quality Assurance & Test Automation (Ruchira — 19.0%):** 142 automated JUnit tests, Playwright E2E cross-device suite, 55-scenario System Test Plan, defect registers, and 3 Jira tickets.  
> Every member owned an indispensable domain of the engineering lifecycle, resulting in an equitable, transparent, and evidence-backed workload distribution."*

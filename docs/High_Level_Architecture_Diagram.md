# MagulaPlan (Magula.lk) — High-Level Architecture Diagram

## 1. System Architecture Overview
MagulaPlan is engineered following a modular **3-Tier Layered Architecture** supporting a **Multi-Role B2B2C Commercial Marketplace**. It connects three distinct primary user actors:
1. **Couples / Customers (`ROLE_USER`):** Discover vendors across 25 Sri Lankan districts, track wedding budgets, coordinate digital RSVPs, and checkout multi-vendor selection carts.
2. **Commercial Vendors (`ROLE_VENDOR`):** Self-register, select commercial hosting tiers (Free / Pro / Featured), simulate commercial checkout via an academic payment sandbox, track incoming couple booking leads, and manage business profiles.
3. **Platform Administrators (`ROLE_ADMIN`):** Monitor platform health and metrics, moderate vendor listings (approval/rejection), assign verified and gold badges, and govern user accounts.

Visual rendering available in: `docs/High_Level_Architecture_Diagram.png`.

---

## 2. High-Level Architecture Diagram (Mermaid)

```mermaid
flowchart TB
    subgraph Ecosystem[User, Vendor & Admin Ecosystem]
        Couple[Couples & Customers\nROLE_USER\n• Discover Vendors • WhatsApp Click-to-Chat\n• Multi-Vendor Cart • Budget & Guest Tools]
        Vendor[Commercial Vendors\nROLE_VENDOR\n• Self-Registration • 3-Tier Hosting Plan\n• Payment Sandbox • Portal Leads & Inquiries]
        Admin[Platform Administrators\nROLE_ADMIN\n• Central Stats KPI • Vendor Moderation\n• Badge Governance • User Suspension]
    end

    subgraph ClientTier[1. Presentation Tier - Client Layer (React 19 SPA)]
        PublicUI[Public Discovery & Landing\n• Hero Video & Editorial Storybook Tokens\n• Dynamic District & Category Filters]
        CoupleUI[Couple Planning Suite\n• Recharts Budget Analytics • Nekath Countdown\n• Guest List Manager & Web Share API]
        VendorUI[Commercial Vendor Portal\n• /vendor/dashboard • Leads & Inquiries Table\n• Profile Editor • Subscription Upgrade Modal]
        AdminUI[Admin Moderation Suite\n• /admin & /admin/vendors • User Management\n• Destructive Action ConfirmDialog Modals]
    end

    subgraph SecurityGateway[Security & API Gateway Layer]
        CORS[CORS Multi-Origin Whitelist\nNetlify • InfinityFree • Localhost]
        AuthFilter[SessionTokenAuthenticationFilter\nBearer 64-Char Cryptographic UUID]
        RBAC[Spring Security 6 Authorization\nROLE_USER • ROLE_VENDOR • ROLE_ADMIN]
        IDOR[IDOR Tenant Ownership Protection\nVendor & Couple Resource Isolation]
        Validation[Jakarta Bean Validation & GlobalExceptionHandler\nStructured 400 Bad Request & Field Mappings]
    end

    subgraph ApplicationTier[2. Application Tier - Spring Boot 4.1 Microservices]
        AuthSvc[AuthService\n• BCrypt Hashing • Case-Insensitive Login\n• Auto-Provisioning on Registration]
        VendorSvc[VendorService & Category Engine\n• Search & 25-District Filter Engine\n• Tier Processing (Free/Pro/Featured)\n• Moderation State: PENDING/APPROVED]
        BookingSvc[BookingService & Lead Engine\n• Cart Checkout (POST /bookings/checkout)\n• Vendor Leads (GET /bookings/vendor/:id)\n• Couple Contact Phone & Email Routing]
        BudgetSvc[BudgetItemService\n• Real-Time Spend Tracking • User Scoping]
        GuestSvc[GuestService\n• WhatsApp Status Tracker • Digital RSVP Generator]
        AdminSvc[AdminService\n• Live KPI Metrics • User Suspension Pipeline]
    end

    subgraph DataTier[3. Data Tier - MySQL 8.4 Relational Database]
        MySQL[(MySQL 8.4 Relational Storage\n7 Normalized Tables)]
        T_Users[users: user_id, email, password_hash, role, session_token]
        T_Vendors[vendors: vendor_id, user_id, category_id, subscription_tier, payment_status, status]
        T_Categories[vendor_categories: category_id, category_name]
        T_Bookings[bookings: booking_id, user_id, vendor_id, status, booked_at]
        T_Budget[budget_items: budget_id, user_id, estimated_cost, actual_cost, deposit_paid]
        T_Guests[guests: guest_id, user_id, rsvp_status, whatsapp_status, meal_preference]
        T_Notif[notifications: notification_id, user_id, message, is_read]
        Seed[Idempotent Startup Seeding Engine\nTestAccountInitializer: Admin, Couple, Vendor & Categories]
    end

    Ecosystem --> ClientTier
    ClientTier -->|HTTPS REST JSON + Bearer Session Token| SecurityGateway
    SecurityGateway --> ApplicationTier
    ApplicationTier -->|Spring Data JPA 3.4 & Hibernate 7.4| DataTier
```

---

## 3. High-Level Architecture Diagram (ASCII for Presentation Slides)

```
+=============================================================================+
|             MAGULAPLAN 3-TIER ECOSYSTEM & SYSTEM ARCHITECTURE               |
+=============================================================================+
| [0. MULTI-ROLE ACTORS / ECOSYSTEM]                                          |
|   • Couples (ROLE_USER): Vendor Discovery, WhatsApp Inquiries, Cart Checkout|
|   • Vendors (ROLE_VENDOR): Self-Registration, Tiers, Sandbox Payment, Portal|
|   • Administrators (ROLE_ADMIN): System Metrics, Moderation, User Safety    |
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
| [1. PRESENTATION TIER - Client Single Page Application]                     |
|   • React 19 SPA (Vite 8, Tailwind CSS 3.4, Framer Motion)                  |
|   • Public Discovery Layer (Category & 25-District Search, WhatsApp Links)  |
|   • Couple Planning Suite (Budget Recharts, Guest RSVP, Nekath Countdown)   |
|   • Vendor Portal (/vendor/dashboard: Leads, Listing Editor, Tier Upgrades) |
|   • Admin Suite (/admin, /admin/vendors: Moderation, /admin/users)          |
+-----------------------------------------------------------------------------+
                                       |
                                       | HTTPS / REST JSON API
                                       | Bearer Session Token Authorization
                                       v
+-----------------------------------------------------------------------------+
| [2. APPLICATION TIER - Spring Boot 4.1 REST Microservices]                 |
|   • Security Gateway: SessionTokenAuthenticationFilter                      |
|   • Access Control: RBAC (ROLE_USER, ROLE_VENDOR, ROLE_ADMIN)               |
|   • Cryptography: BCrypt Password Hashing (BCryptPasswordEncoder)           |
|   • IDOR Protection: Caller scoping on Budget, Guests, Vendors & Leads      |
|   • Server Validation: Jakarta Bean Validation & GlobalExceptionHandler     |
|   • Core Controllers & Services:                                            |
|     - AuthController / UserService (UUID Session Tokens, Profile /me)       |
|     - VendorController / VendorService (Public Self-Reg, Plan Tiers, /me)   |
|     - BookingController / BookingService (Cart Checkout, Vendor Leads API)  |
|     - BudgetItemController / BudgetItemService (Financial Analytics)        |
|     - GuestController / GuestService (RSVP Tracking, WhatsApp Links)        |
|     - AdminController / AdminService (Moderation & Live KPI Metrics)        |
+-----------------------------------------------------------------------------+
                                       |
                                       | Spring Data JPA 3.4 / Hibernate 7.4
                                       | TLS/SSL Encrypted JDBC Connection
                                       v
+-----------------------------------------------------------------------------+
| [3. DATA TIER - MySQL 8.4 Relational Database]                              |
|   • 7 Normalized Relational Tables:                                         |
|     - `users` (user_id, email, password_hash, role, session_token)          |
|     - `vendors` (vendor_id, user_id, category_id, tier, payment_status)    |
|     - `vendor_categories` (8 core domains: Venue, Photography, Catering...)|
|     - `bookings` (booking_id, user_id, vendor_id, status, booked_at)       |
|     - `budget_items` (budget_id, user_id, estimated, actual, deposit)       |
|     - `guests` (guest_id, user_id, rsvp_status, whatsapp_status, meals)   |
|     - `notifications` (notification_id, user_id, message, is_read)         |
|   • Startup Seeding Engine: TestAccountInitializer (Admin, Couple, Vendor)  |
+=============================================================================+
```

---

## 4. Key Architectural Patterns & Technical Decisions
1. **Multi-Role RBAC & IDOR Hardening:** Spring Security enforces role boundaries across `ROLE_USER`, `ROLE_VENDOR`, and `ROLE_ADMIN`. Every mutation and read operation on tenant-specific resources (budget items, guest lists, and vendor profiles) inspects the authenticated principal from `SecurityContextHolder`, preventing cross-account data leaks.
2. **Demo-Safe Commercial Monetization Sandbox:** To satisfy commercial evaluation criteria without requiring a live banking gateway (PayHere / Stripe), the system integrates a clean simulated payment checkout modal. Vendors choose between Free, Pro (LKR 2,500/mo), and Featured (LKR 5,000/mo) tiers and simulate instant verified badge activation.
3. **Self-Healing Startup Seeding:** Rather than relying solely on external SQL scripts that may fail to execute in ephemeral cloud environments, `TestAccountInitializer` automatically provisions default vendor categories and all three ecosystem demo logins (`admin@magulaplan.lk`, `test@magulaplan.lk`, `vendor@magulaplan.lk`) on boot.
4. **Dynamic Host Fallback Client Routing:** The frontend client automatically inspects `window.location.hostname`. When accessed from remote staging or hosting servers (such as InfinityFree or Netlify), it dynamically directs API calls to `https://magulaplan-api.onrender.com`, while routing to `http://localhost:8080` during local development.

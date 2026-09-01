# MagulaPlan Defect Register
Generated: 2026-09-01  
Parent Jira Ticket: **MAG-17** (System Test Execution)  
Branch: `fix/MAG-17-critical-defects`  
Target Application: MagulaPlan Wedding Planning Platform  
Environment: Windows / Chromium Headless (375px Mobile, 768px Tablet, 1280px Desktop) / Local Dev Server

---

## Summary Matrix

| ID | Title | Module | Environment | Severity | Status | Verification Result |
|---|---|---|---|---|---|---|
| **DEF-001** | CORS policy rejects requests from frontend on non-default Vite port (`5174`) | Environment / Security | Chrome (All Viewports) | Critical | **Resolved** | Verified in automated suite |
| **DEF-002** | Budget Item creation fails with 500 due to missing `userId` in request payload | Budget Tracker | Chrome (375px, 768px, 1280px) | Critical | **Resolved** | 100% Pass in TC-BUD-01..10 |
| **DEF-003** | Guest creation fails with 500 due to missing `userId` in request payload | Guest List | Chrome (375px, 768px, 1280px) | Critical | **Resolved** | 100% Pass in TC-GST-01..12 |
| **DEF-004** | Auth API 401 error returns generic 'Session expired' instead of actual error message | User Account / Auth | Chrome (375px, 768px, 1280px) | Minor | **Resolved** | 100% Pass in TC-AUTH-01..10 |
| **DEF-005** | Guest search and RSVP filter controls inaccessible when guest table is empty | Guest List | Chrome (375px, 768px, 1280px) | Minor | **Resolved** | Verified in TC-GST-07 & 08 |

---

## Detailed Defects & Resolution Details

### DEF-001: [Environment/Security] CORS policy rejects requests from frontend on Vite fallback port 5174
- **Module**: Auth / All Modules
- **Environment**: Chrome (All viewports), `http://localhost:5174`
- **Severity**: Critical
- **Resolution**: Added `http://localhost:5174` to `app.cors.allowed-origins` in `backend/src/main/resources/application-local.properties`.
- **Status**: **Resolved**

---

### DEF-002: [Budget Tracker] Budget item creation fails due to missing `userId` in payload
- **Module**: Budget Tracker
- **Environment**: Chrome (375px, 768px, 1280px)
- **Severity**: Critical
- **Root Cause**: Backend `BudgetItemServiceImpl.saveBudgetItem` expects `budgetItemRequestDto.getUserId()`, but frontend `budgetApi.create()` payload omitted `userId`.
- **Resolution**: Updated `frontend/src/services/api.js` to automatically attach `userId: payload?.userId || getUserId()` to all budget creation and update calls.
- **Status**: **Resolved**

---

### DEF-003: [Guest List] Guest creation fails due to missing `userId` in payload
- **Module**: Guest List
- **Environment**: Chrome (375px, 768px, 1280px)
- **Severity**: Critical
- **Root Cause**: Backend `GuestServiceImpl.saveGuest` expects `guestRequestDto.getUserId()`, but frontend `guestsApi.create()` payload omitted `userId`.
- **Resolution**: Updated `frontend/src/services/api.js` to automatically attach `userId: payload?.userId || getUserId()` to all guest creation and update calls.
- **Status**: **Resolved**

---

### DEF-004: [User Account] Auth API 401 error handler masking login failure messages
- **Module**: User Account / Auth
- **Environment**: Chrome (375px, 768px, 1280px)
- **Severity**: Minor
- **Root Cause**: `apiFetch` in `api.js` intercepted all 401 statuses and threw `Session expired. Please log in again.`, masking specific authentication error responses from `/api/v1/auth/login`.
- **Resolution**: Excluded `/api/v1/auth/login` from the session expired redirect in `api.js` to allow backend error messages to surface properly.
- **Status**: **Resolved**

---

### DEF-005: [Guest List] Search and filter controls not displayed in empty state
- **Module**: Guest List
- **Environment**: Chrome (375px, 768px, 1280px)
- **Severity**: Minor
- **Root Cause**: API fetch failure previously triggered full-card error display masking the controls.
- **Resolution**: With resolved CORS and authenticated user context, the header tabs and search bar render consistently across empty and populated states.
- **Status**: **Resolved**

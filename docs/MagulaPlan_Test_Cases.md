# MagulaPlan — Test Cases

> System test case suite for the MagulaPlan MVP (wedding planning platform).
> Format follows the lecturer's sample test case document.

## Test Cases

| Module | Test ID | Test Case | Preconditions | Steps | Expected Result | Priority | Pass/Fail | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Auth & Onboarding | AUTH-01 | New user registers an account | No account with the email exists | 1. Go to /register
2. Enter full name, email, password, phone
3. Submit | Account created; returns 201 with a token; user lands on the dashboard (protected route). | High |  |  |
| Auth & Onboarding | AUTH-02 | Duplicate email is blocked | An account with email X already exists | 1. Go to /register
2. Enter the same email X
3. Submit | Clear error shown (409); no duplicate row created in `users`. | High |  |  |
| Auth & Onboarding | AUTH-03 | Login with correct credentials | Account exists with known password | 1. Go to /login
2. Enter email + correct password
3. Submit | Returns 200 with a token; token stored in localStorage (`magulaplan_token`); user redirected to dashboard. | High |  |  |
| Auth & Onboarding | AUTH-04 | Login with wrong password | Account exists with a known password | 1. Go to /login
2. Enter correct email + wrong password | Returns 401; no token issued; error shown; access denied. | High |  |  |
| Auth & Onboarding | AUTH-05 | Login with unknown email | Email not registered | 1. Go to /login
2. Enter unknown email + any password | Returns 401; no token; access denied. | Medium |  |  |
| Auth & Onboarding | AUTH-06 | Password is stored hashed, not plain text | A registered user | 1. Register a user
2. Inspect the `users.password_hash` column in the DB | Stored value is a BCrypt hash (prefix `$2a$`/`$2b$`), never the raw password. | High |  | Verified via AuthController + BCryptPasswordEncoder. |
| Auth & Onboarding | AUTH-07 | Protected route redirects when signed out | No active session (no token in storage) | 1. Navigate directly to /dashboard (or budget/guests) while signed out | Redirected to /login; no protected data visible. | High |  |  |
| Auth & Onboarding | AUTH-08 | Logout clears the session | A logged-in user | 1. Click Logout
2. Attempt to open a protected page | Token removed from storage; protected routes redirect to /login. | Medium |  |  |
| Vendor Directory | VEND-01 | Directory loads the vendor list | Vendors exist in the DB | 1. Open /vendors | All vendors render as cards with business name, category, district, and starting price. | High |  |  |
| Vendor Directory | VEND-02 | Category filter narrows the list | Vendors span multiple categories | 1. On /vendors, select a category (e.g. Photography) | Only vendors in that category are shown. | High |  |  |
| Vendor Directory | VEND-03 | Price sort orders correctly | Multiple vendors with different starting prices | 1. Sort by Price: Low → High
2. Sort by Price: High → Low | List reorders correctly in both directions. | Medium |  | Client-side sort. |
| Vendor Directory | VEND-04 | Vendor detail page shows full info | A vendor exists | 1. Click a vendor card
2. Review the detail page | Full name, category, district, description, contact details, and starting price render. | High |  |  |
| Vendor Directory | VEND-05 | Verified badge shows only for verified vendors | A mix of verified and unverified vendors | 1. Browse the directory | Verified vendors show the checkmark/Verified badge; unverified do not. | Medium |  |  |
| Vendor Directory | VEND-06 | Featured badge shows only for featured vendors | A mix of featured and non-featured vendors | 1. Browse the directory | Only featured vendors show the "Featured" badge. | Medium |  |  |
| Vendor Directory | VEND-07 | Rating and review count render | A vendor with rating + reviewCount | 1. Open the directory | Star rating (e.g. 4.8) and review count (e.g. 124) display next to the vendor. | Medium |  |  |
| Vendor Directory | VEND-08 | Vendor registration succeeds when authenticated | Logged-in user | 1. Go to vendor registration
2. Fill business details, category, price
3. Submit | Vendor created (201) and appears in the directory. | High |  |  |
| Vendor Directory | VEND-09 | Vendor registration blocked when signed out | Not authenticated | 1. Attempt to POST /api/v1/vendors without a token | Returns 403; vendor not created. | High |  |  |
| Vendor Directory | VEND-10 | Empty state when no vendors match | Filter combination matches nothing | 1. Apply a filter with no matches | A clear empty state is shown (not a blank screen or error). | Low |  |  |
| Budget Tracker | BUDG-01 | Add a budget item | Logged-in user | 1. Open Budget
2. Add an item (name, category, estimated cost)
3. Save | Item appears in the list; totals update. | High |  |  |
| Budget Tracker | BUDG-02 | Edit a budget item | An existing item | 1. Edit the item's cost/category
2. Save | Changes persist and reflect immediately. | High |  |  |
| Budget Tracker | BUDG-03 | Delete a budget item | An existing item | 1. Delete the item
2. Confirm | Item removed; totals update. | High |  |  |
| Budget Tracker | BUDG-04 | Summary reflects the items | Multiple budget items | 1. Open Budget
2. Review total/spent/remaining | Summary figures match the sum of the items. | High |  | Summary currently computed client-side (MAG-28 pending backend endpoint). |
| Budget Tracker | BUDG-05 | Budget items are isolated per user | Two users, A and B, each with items | 1. Sign in as A and view budget
2. Sign in as B and view budget | Each user sees only their own items (server-side `user_id` scoping). | High |  |  |
| Budget Tracker | BUDG-06 | Budget endpoints require auth | No token | 1. Call POST /api/v1/budget-items without a token | Returns 403. | High |  |  |
| Budget Tracker | BUDG-07 | Negative/zero costs handled | — | 1. Try adding an item with a negative cost | App either rejects or normalizes the value; no corrupt data. | Low |  |  |
| Guest List & RSVP | GUEST-01 | Add a guest | Logged-in user | 1. Open Guests
2. Add a guest (name, contact, side, plus-ones)
3. Save | Guest appears in the list. | High |  |  |
| Guest List & RSVP | GUEST-02 | Edit a guest | An existing guest | 1. Edit guest details
2. Save | Changes persist. | High |  |  |
| Guest List & RSVP | GUEST-03 | Delete a guest | An existing guest | 1. Delete the guest | Guest removed from list and DB. | High |  |  |
| Guest List & RSVP | GUEST-04 | Update RSVP status | An existing guest | 1. Change RSVP status (Pending → Accepted/Declined) | Status updates and displays the correct badge. | High |  | Full PUT today; PATCH endpoint tracked as MAG-31. |
| Guest List & RSVP | GUEST-05 | Side-of-family indicator | Guests with Bride/Groom sides | 1. View the guest list | Each guest shows their side-of-family (Bride/Groom). | Medium |  |  |
| Guest List & RSVP | GUEST-06 | Plus-ones and meal preference saved | — | 1. Add a guest with plus-ones and a meal preference
2. Re-open the guest | Both fields are persisted and shown. | Medium |  |  |
| Guest List & RSVP | GUEST-07 | Guests isolated per user | Two users each with guests | 1. Sign in as each user | Each sees only their own guests. | High |  |  |
| Guest List & RSVP | GUEST-08 | Guest endpoints require auth | No token | 1. Call GET/POST /api/v1/guests without a token | Returns 403. | High |  |  |
| Share Invitations | SHARE-01 | Generate a share link | An existing guest | 1. Open a guest
2. Click Share | A shareable invitation message + RSVP URL is generated (`GET /api/v1/guests/{id}/share`). | High |  |  |
| Share Invitations | SHARE-02 | Mobile share sheet opens | A mobile browser with Web Share API | 1. Click Share on a guest | Native share sheet opens via `navigator.share()`. | High |  |  |
| Share Invitations | SHARE-03 | Clipboard copy fallback (desktop) | A desktop browser | 1. Click Share | Invitation text is copied to the clipboard (fallback where share is unavailable). | Medium |  |  |
| Share Invitations | SHARE-04 | WhatsApp status marked as sent | A guest shared via WhatsApp | 1. Generate the share link | `whatsapp_status` is set to SENT for that guest. | Low |  |  |
| Security & Access Control | SEC-01 | Protected endpoints reject unauthenticated requests | No Bearer token | 1. Call any protected endpoint (e.g. POST /api/v1/vendors) without a token | Returns 403. | High |  |  |
| Security & Access Control | SEC-02 | Valid token grants access | A valid session token | 1. Call a protected endpoint with `Authorization: Bearer <token>` | Returns 2xx. | High |  | Verified by SessionTokenAuthenticationFilter integration test. |
| Security & Access Control | SEC-03 | Invalid token is rejected | A bogus/expired token | 1. Call a protected endpoint with `Bearer bogus` | Returns 403; no data exposed. | High |  |  |
| Security & Access Control | SEC-04 | No plain-text passwords anywhere | Production database | 1. Inspect `users.password_hash` | All values are BCrypt hashes; no raw password strings. | High |  |  |
| Security & Access Control | SEC-05 | CORS restricts to the allowed origin | Production frontend + backend | 1. Send an OPTIONS preflight from the Netlify origin
2. Send one from an unknown origin | Netlify origin allowed; unknown origin denied (no `Access-Control-Allow-Origin`). | Medium |  |  |
| Responsive / Cross-Device | RESP-01 | Vendor directory at mobile width | ~375px viewport | 1. Open /vendors
2. Scroll cards | No horizontal scrolling; cards stack and remain tappable. | High |  |  |
| Responsive / Cross-Device | RESP-02 | Budget page at mobile width | ~375px viewport | 1. Open Budget
2. Use the add/edit form | Form and summary cards are readable and usable. | Medium |  |  |
| Responsive / Cross-Device | RESP-03 | Guest list at mobile width | ~375px viewport | 1. Open Guests | Table/list is readable; actions reachable without horizontal scroll. | Medium |  |  |
| Responsive / Cross-Device | RESP-04 | Navigation adapts (sidebar vs bottom nav) | Desktop and mobile | 1. Open the app on desktop
2. Open on mobile | Sidebar on desktop; bottom nav on mobile; all routes reachable. | Medium |  |  |

## Summary

| Module | Test Count |
| --- | --- |
| Auth & Onboarding | 8 |
| Vendor Directory | 10 |
| Budget Tracker | 7 |
| Guest List & RSVP | 8 |
| Share Invitations | 4 |
| Security & Access Control | 5 |
| Responsive / Cross-Device | 4 |
| TOTAL | 46 |

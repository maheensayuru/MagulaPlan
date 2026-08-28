# Session Handover — MagulaPlan

> Handover for continuing in a new session. Last updated: 28 Aug 2026.

## 1. Project Identity

- **Repo:** `maheensayuru/MagulaPlan` (private, monorepo)
- **Product:** MagulaPlan — wedding planning platform (scope: **wedding-only**)
- **Stack:** React 19 + Vite 8 + Tailwind 3.4 (frontend) · Java 17 + Spring Boot 4.1 + Spring Security + MySQL (backend) · package `com.zerostate.magulaplan`
- **Auth (actual):** UUID session tokens in `users.session_token`, validated by `SessionTokenAuthenticationFilter`; passwords **BCrypt-hashed**. **Not JWT** (the PM plan says "JWT" — it's session tokens; be ready to explain that).
- **Team:** Maheen (PM/deploy/docs) · Amanda (backend) · Dileepa (frontend) · Sammani/Ruhini (DB) · Ruchira (QA)

## 2. Live URLs & Credentials

- **Frontend:** `https://gentle-cucurucho-a28226.netlify.app`
- **Backend:** `https://magulaplan-api.onrender.com`
- **Test login:** `deploytest@example.com` / `pw12345` (userId = 1)
- **MySQL (Aiven):** host `mysql-219a3283-m4h33n.aivencloud.com`, port `27680`, user `avnadmin`, db **`defaultdb`** (NOT `magulaplan_db`), SSL required (CA cert from Aiven console). **Free tier powers off on inactivity — power it on before any demo, or the backend 500s.**

## 3. Git / PR State

- **main HEAD:** `c661106` (post merges of PR #28 BCrypt, #29 features, #30 seed).
- **OPEN PR — merge next:** **#31** `chore/cart-checkout-wiring` — wires the cart "Request Bookings" button to `POST /api/v1/bookings/checkout` (MAG-30 frontend).
- ⚠️ **History was rewritten once** (stripped "Claude Sonnet 5" co-author trailers from 4 of Dileepa's commits; force-pushed main; deleted 6 stale branches). Everyone must re-sync: `git fetch && git reset --hard origin/main`.

## 4. DONE (all live & verified)

- Backend CRUD: User, Guest, Budget, Vendor, VendorCategory
- Auth: register/login + session-token filter (MAG-27) + BCrypt (MAG-32)
- Vendor fields `imageUrl`/`rating`/`reviewCount`/`verified`/`featured` (MAG-25)
- **MAG-28** `GET /api/v1/budget-items/summary/{userId}` — aggregates estimated/actual/deposit/remaining
- **MAG-29** `GET /api/v1/vendors/search?search=&district=&minPrice=&maxPrice=&page=&size=` — search/filter/pagination
- **MAG-30** `POST /api/v1/bookings/checkout` + `GET /api/v1/bookings/user/{userId}` — backend + frontend (PR #31)
- **MAG-31** `PATCH /api/v1/guests/{guestId}/rsvp`
- Frontend: all pages, auth, cart, admin (admin/cart/notifications UI-only — no backend)
- Deploy: Netlify (VITE_API_URL set) + Render (Docker, prod profile) + Aiven
- **126 backend tests pass**; frontend builds clean
- docs: PM plan updated, `MagulaPlan_Test_Cases.md` (46 cases), `schema.sql` (6 tables incl. `session_token` + `bookings`), `data_seed.sql` (corrected, merged, **not yet applied**)

## 5. REMAINING (deadline Aug 30, present Sep 6)

| # | Task | Owner | Notes |
|---|---|---|---|
| 1 | **Merge PR #31** (cart checkout) | Maheen | Netlify auto-redeploys |
| 2 | **Apply `docs/data_seed.sql`** to live Aiven DB | Ruhini | Query tool; replaces picsum seed with real Unsplash images + prices |
| 3 | **MAG-21** DB verify | Ruhini | mostly done — just her live `SHOW CREATE TABLE` confirmation |
| 4 | **MAG-17** system testing | Ruchira | 46-case doc ready at `docs/MagulaPlan_Test_Cases.md` |
| 5 | **MAG-18** final docs + presentation | Maheen | docs largely done; **presentation pending** |

## 6. Jira State

- **34 tickets.** Done: all except **MAG-17, MAG-18, MAG-21, MAG-33** (To Do). MAG-28/29/30/31 are "In Review" (PR #29 merged → move them to **Done**).
- Site `magulaplan.atlassian.net`, project `MAG`. API auth = Basic `maheen.sayuru21@gmail.com:<API token>`. Transitions: 11 To Do, 21 In Progress, 31 In Review, 41 Done.

## 7. Gotchas for the Next Session

- **Aiven free tier powers off** on inactivity → power on before demo (backend 500s if off).
- **Render free tier sleeps** ~15 min idle → first hit 30–60 s.
- Auth = **session tokens, not JWT** (PM plan says JWT — flag if asked).
- `data_seed.sql` **overwrites** the existing 13 vendors/8 categories via `ON DUPLICATE KEY UPDATE` (intended).
- This repo's `edit` tool is unreliable on multi-line ops — prefer full-file `write` or Python string-replace for edits.
- The `Sales_Target_App_Test_Cases(Sample).xlsx` in `docs/` is the lecturer's sample (untracked, not committed).

## 8. Useful Commands

```bash
cd "D:/My projects/ZeroState projects/Wedding Planing Platform/Magula.lk"
git checkout main && git pull   # sync (history was rewritten — use reset --hard if divergent)
cd backend && cmd /c "mvnw.cmd test"   # 126 tests
cd frontend && npm run build           # verify frontend

# live smoke tests
curl https://magulaplan-api.onrender.com/api/v1/vendor-categories
curl https://magulaplan-api.onrender.com/api/v1/vendors/search?search=Sunset
```

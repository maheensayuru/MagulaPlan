# Session Handover — MagulaPlan

> Handover for continuing in a new session. Last updated: 28 Aug 2026.

## 1. Project Identity

- **Repo:** `maheensayuru/MagulaPlan` (private, monorepo)
- **Product:** MagulaPlan — wedding planning platform (scope: **wedding-only**)
- **Stack:** React 19 + Vite 8 + Tailwind 3.4 (frontend) · Java 17 + Spring Boot 4.1 + Spring Security + MySQL (backend) · package `com.zerostate.magulaplan`
- **Auth (actual):** UUID session tokens in `users.session_token`, validated by `SessionTokenAuthenticationFilter`; passwords **BCrypt-hashed**. **Not JWT** (the PM plan says "JWT" — it's session tokens; be ready to explain that).
- **Team:** Maheen (PM/deploy/docs) · Amanda (backend) · Dileepa (frontend) · Sammani/Ruhini (DB) · Ruchira (QA)

## 2. Live URLs & Credentials

- **Frontend:** `https://magulaplan.netlify.app` (new permanent site; backend CORS also still allows the old `gentle-cucurucho-a28226.netlify.app`)
- **Backend:** `https://magulaplan-api.onrender.com`
- **Admin login:** `admin@magulaplan.lk` / `Admin@123` (role=ADMIN; seeded plain-text, upgraded to BCrypt on first login — **change the password**)
- **Test login:** `deploytest@example.com` / `pw12345` (userId = 1)
- **MySQL (Aiven):** host `mysql-219a3283-m4h33n.aivencloud.com`, port `27680`, user `avnadmin`, db **`defaultdb`** (NOT `magulaplan_db`), SSL required (CA cert from Aiven console). **Free tier powers off on inactivity — power it on before any demo, or the backend 500s.**

## 3. Git / PR State

- **main HEAD:** `6b47896` (after: enterprise frontend polish, `useAsyncData` hook + tests, `GET /users/me`, admin panel + vendor approvals + notifications, CORS fix for the new frontend URL).
- PR #31 (cart checkout) is **merged**. History was rewritten once (stripped co-author trailers; force-pushed main). Re-sync with `git fetch && git reset --hard origin/main`.

## 4. DONE (all live & verified)

- Backend CRUD: User, Guest, Budget, Vendor, VendorCategory
- Auth: register/login + session-token filter (MAG-27) + BCrypt (MAG-32)
- **MAG-25** vendor fields `imageUrl`/`rating`/`reviewCount`/`verified`/`featured`
- **MAG-28** budget summary · **MAG-29** vendor search · **MAG-30** booking checkout · **MAG-31** guest RSVP
- **NEW** `GET /api/v1/users/me` — authenticated profile (unblocks Profile/Settings/admin role check)
- **NEW** Admin panel backend (`/api/v1/admin/**`, gated on role=ADMIN): stats, pending vendors, approve/reject, user list, suspend/reinstate
- **NEW** Vendor approval `status` (PENDING/APPROVED/REJECTED) — public directory shows **APPROVED only**; new registrations default to PENDING until an admin approves
- **NEW** Notifications: `notifications` table + CRUD (`GET`, `PUT /{id}/read`, `PUT /read-all`, `DELETE /{id}`)
- Frontend: all pages, auth, cart, admin; **13 Vitest tests**; route-level code splitting; a11y fixes; data-fetching hook
- Deploy: Netlify (`magulaplan.netlify.app`) + Render (Docker, prod profile) + Aiven
- **139 backend tests pass** · frontend builds clean + 13 tests pass
- docs: PM plan updated, `MagulaPlan_Test_Cases.md` (46 cases), `schema.sql` (7 tables incl. `vendors.status` + `notifications`), `data_seed.sql` (applied to live DB; MySQL 8.4 alias syntax)

## 5. REMAINING (deadline Aug 30, present Sep 6)

| # | Task | Owner | Notes |
|---|---|---|---|
| 1 | Merge PR #31 (cart checkout) | Maheen | ✅ merged |
| 2 | Apply `docs/data_seed.sql` to live Aiven DB | Ruhini | ✅ applied — **caveat:** Ruhini's branch seed was a stale version (no `status`, no admin user); re-applied from `main` and verified live (13 vendors APPROVED, admin user present, categories aligned) |
| 3 | MAG-21 DB verify | Ruhini | ✅ done |
| 4 | **MAG-17** system testing | Ruchira | 46-case doc ready at `docs/MagulaPlan_Test_Cases.md` |
| 5 | **MAG-18** final docs + presentation | Maheen | docs largely done; **presentation pending** |

## 6. Jira State

- **34 tickets.** Done: all except **MAG-17, MAG-18** (To Do). MAG-21/MAG-33 marked Done by Ruhini (re-verified live). MAG-28/29/30/31 → move to **Done**.

## 7. Gotchas for the Next Session

- **Aiven free tier powers off** on inactivity → power on before demo (backend 500s if off).
- **Render free tier sleeps** ~15 min idle → first hit 30–60 s.
- Auth = **session tokens, not JWT** (PM plan says JWT — flag if asked).
- `data_seed.sql` **overwrites** the existing 13 vendors/8 categories via `ON DUPLICATE KEY UPDATE` (intended); now uses MySQL 8.4 alias syntax (`AS new`) so no deprecation warnings. **Must run AFTER the backend redeploys** (new columns/tables auto-create via `ddl-auto=update`).
- **Vendor approval flow:** new vendor registrations default to `PENDING` and are hidden from the public directory until an admin approves them. The frontend registration toast still says "Your business has been listed!" — should say "submitted for review" (unfixed polish).
- **Frontend moved** to `magulaplan.netlify.app` — CORS updated on the backend (both origins allowed).
- This repo's `edit` tool is unreliable on multi-line ops — prefer full-file `write` or Python string-replace for edits.
- The `Sales_Target_App_Test_Cases(Sample).xlsx` in `docs/` is the lecturer's sample (untracked, not committed).

## 8. Useful Commands

```bash
cd "D:/My projects/ZeroState projects/Wedding Planing Platform/Magula.lk"
git checkout main && git pull   # sync (history was rewritten — use reset --hard if divergent)
cd backend && cmd /c "mvnw.cmd test"   # 139 tests
cd frontend && npm run build           # verify frontend
cd frontend && npm test                # 13 Vitest tests

# live smoke tests
curl https://magulaplan-api.onrender.com/api/v1/vendor-categories
curl https://magulaplan-api.onrender.com/api/v1/vendors
curl -s -o /dev/null -w "%{http_code}" https://magulaplan-api.onrender.com/api/v1/admin/stats   # 403 = admin API live (needs token)
```

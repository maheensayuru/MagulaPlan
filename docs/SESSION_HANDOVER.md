# Session Handover — MagulaPlan

> Handover for continuing work in a new session. Last updated: Aug 2026.

## 1. Project Identity

- **Repo:** `maheensayuru/MagulaPlan` (private, monorepo)
- **Product:** MagulaPlan — wedding planning platform (scope: **wedding-only**, per the proposal PDF)
- **Stack:** React 19 + Vite 8 + Tailwind 3.4 (frontend) · Java 17 + Spring Boot 4.1 + Spring Security + MySQL (backend) · package `com.zerostate.magulaplan`
- **Auth (actual):** UUID session tokens stored in `users.session_token`; bearer filter validates them. **No JWT. Passwords stored plain text** (see §5 debt).
- **Team:** Maheen (PM/lead, MAG-11, deployment, docs) · Amanda (backend) · Dileepa (frontend) · Sammani/Ruhini (DB) · Ruchira (QA)
- **Tools:** Jira (`magulaplan.atlassian.net`, project MAG), GitHub, Netlify (frontend), Render (backend), Aiven (MySQL)

## 2. Git State (as of handover)

- **Branch:** `main`. All work merged via PRs (#23 MAG-25, #24/#25 deploy prep, #26 auth fix).
- **main HEAD:** `de9678a` = merge of PR #25 (Dockerfile). Preceding: MAG-25 (`3f6eb63`), deploy prep (`a9371a3`), auth fix (`b23b4e7`).
- Old merged branches still exist remotely (MAG-9, MAG-11, MAG-6, MAG-7, feature/MAG-25, chore/MAG-16, feat/MAG-27) — harmless, can delete.

## 3. What's DONE (merged to main + live)

| Area | Status |
|---|---|
| Backend CRUD (User, Guest, Budget, Vendor, VendorCategory) | ✅ |
| Auth: register/login + bearer session-token filter (MAG-27) | ✅ live |
| Global exception handler (404/400/409/500) | ✅ |
| Vendor `imageUrl`/`rating`/`reviewCount`/`verified`/`featured` fields (MAG-25) | ✅ |
| JUnit tests — 115 tests, all pass | ✅ |
| Frontend: auth, budget, guest CRUD, vendor pages, registration, dashboard, admin/cart/theme | ✅ |
| Share invitations (Web Share API) | ✅ |
| Netlify frontend deployed | ✅ (`gentle-cucurucho-a28226.netlify.app`) |
| Backend deployed to Render (Docker, prod profile) | ✅ (`magulaplan-api.onrender.com`) |
| MySQL on Aiven (free tier), schema auto-created via ddl-auto | ✅ |
| Seed data: 8 categories, 13 vendors | ✅ |

## 4. What's REMAINING (dependency order + owner)

| # | Task | Owner | Depends on |
|---|---|---|---|
| 1 | Set `VITE_API_URL` on Netlify → rebuild (frontend wiring) | Maheen | backend live ✅ |
| 2 | MAG-17: System testing + defect register | Ruchira | #1 |
| 3 | MAG-21: Verify Render DB matches schema.sql | Sammani | backend live ✅ |
| 4 | MAG-18: Final docs + presentation | Maheen | #2, #3 |
| 5 | Hash passwords (BCrypt) + optionally move to JWT — security debt | Amanda | — |

**Critical path:** #1 → MAG-17 → MAG-18.

## 5. Key Technical Facts the Next Session Needs

- **No JWT secret exists.** Auth = UUID session token in `users.session_token`; `SessionTokenAuthenticationFilter` reads `Authorization: Bearer <token>`. Frontend stores token in `localStorage` key `magulaplan_token`.
- **Passwords are plain text** (`AuthController.java` registers `passwordHash` = raw password; login does `password.equals(...)`). Flagged debt — hash with BCrypt before production.
- **CORS** is externalized: `app.cors.allowed-origins` (default localhost; prod = Netlify URL via `CORS_ALLOWED_ORIGINS`).
- **Render deploy:** Docker (no Java runtime on Render). `backend/Dockerfile` (maven build → temurin-jre). Env vars on Render: `SPRING_PROFILES_ACTIVE=prod`, `DB_URL`, `DB_USER`, `DB_PASSWORD`. `server.port=${PORT:8080}`.
- **MySQL:** Aiven free tier, host `mysql-219a3283-m4h33n.aivencloud.com:27680`, db `defaultdb`. **Free tier powers off on inactivity — power it back on (Aiven console) before demos; backend will fail to connect while off.**
- **Render free web service sleeps** after ~15 min idle; first request after wake takes 30–60 s.
- **Frontend API base:** `VITE_API_URL` (`services/api.js` falls back to `localhost:8080`). Must be set on Netlify to `https://magulaplan-api.onrender.com` (baked in at build time → requires a rebuild).
- **Known gaps:** admin/cart/notifications pages are UI-only (no backend endpoints); bundle ~830 KB (recharts) — code-split later; vendor data uses picsum placeholder images.

## 6. Jira Ticket Map (verified via API)

- MAG-1..11: Sprint 1-2 (ER, API, wireframes, repo, schema, UI, backend, share invites)
- MAG-10: JUnit tests (✅ merged)
- MAG-15..21: Sprint 3 (Netlify, Render, system testing, docs, security, API integration, DB verify)
- MAG-22..25: Budget page, auth, shared UI/guest, vendor fields (MAG-25 ✅)
- MAG-26: UI redesign (✅ merged)
- MAG-27: bearer session-token auth filter (✅ merged, PR #26) — added this session
- MAG-12/13/14: reserved/unused

## 7. Open Decisions

1. Admin/cart/notifications backend — in scope or UI-only? (would need new backend tickets)
2. Netlify site rename (from `gentle-cucurucho-a28226`) — then CORS update
3. Password hashing (BCrypt) vs full JWT — when?
4. Multi-event support — decided NO (wedding-only per proposal)

## 8. Useful Commands

```bash
cd "D:/My projects/ZeroState projects/Wedding Planing Platform/Magula.lk"
git checkout main && git pull   # sync
cd frontend && npm run build     # verify frontend
cd backend && cmd /c "mvnw.cmd test"   # 115 tests

# smoke test the live backend
curl https://magulaplan-api.onrender.com/api/v1/vendors
```

## 9. Live URLs

- Frontend: `https://gentle-cucurucho-a28226.netlify.app`
- Backend: `https://magulaplan-api.onrender.com`
- Test login: `deploytest@example.com` / `pw12345` (seeded user)

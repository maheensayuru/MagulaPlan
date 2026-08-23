# Session Handover — MagulaPlan

> Handover for continuing work in a new session. Last updated: Aug 2026.

## 1. Project Identity

- **Repo:** `maheensayuru/MagulaPlan` (private, monorepo)
- **Product:** MagulaPlan — wedding planning platform (scope: **wedding-only**, per the proposal PDF)
- **Stack:** React 19 + Vite 8 + Tailwind 3.4 (frontend) · Java 17 + Spring Boot + Spring Security + JWT + MySQL (backend) · package `com.zerostate.magulaplan`
- **Team:** Maheen (PM/lead, MAG-11, deployment, docs) · Amanda (backend) · Dileepa (frontend) · Sammani/Ruhini (DB) · Ruchira (QA)
- **Tools:** Jira (`magulaplan.atlassian.net`, project MAG), GitHub, Netlify (frontend), Render (backend — NOT deployed yet)

## 2. Git State (as of handover)

- **Branch:** `main`, clean working tree
- **main HEAD:** `63e6300` = merge of PR #22 (MAG-26 UI redesign)
- All feature branches already merged into main: frontend-completion (#21), MAG-10 tests (#20), MAG-19 security, MAG-26 UI redesign
- Old merged branches still exist remotely (MAG-9, MAG-11, MAG-6, MAG-7) — harmless, can delete

## 3. What's DONE (merged to main)

| Area | Status |
|---|---|
| Backend CRUD (User, Guest, Budget, Vendor, VendorCategory) | ✅ |
| Spring Security + JWT (register/login, BCrypt, externalized secret) | ✅ |
| Global exception handler (404/400/409/500) | ✅ |
| JUnit tests — 111 tests, all pass | ✅ |
| Frontend: auth, budget page, guest CRUD, vendor pages, vendor registration, dashboard | ✅ |
| Frontend: admin panel, cart, profile/settings/notifications, theme redesign (MAG-26) | ✅ |
| Share invitations (Web Share API) | ✅ |
| Netlify frontend deployed | ✅ (`gentle-cucurucho-a28226.netlify.app`) |

## 4. What's REMAINING (dependency order + owner)

| # | Task | Owner | Depends on |
|---|---|---|---|
| 1 | MAG-25: Vendor `imageUrl`/`rating`/`reviewCount`/`verified`/`featured` fields (entity + DTO + schema) | Amanda | — |
| 2 | MAG-16: Deploy backend + MySQL to Render; set env vars (`JWT_SECRET`, DB URL, CORS) | Maheen | #1 |
| 3 | MAG-21: Verify Render DB matches schema.sql | Sammani | #2 |
| 4 | MAG-17: System testing + defect register | Ruchira | frontend+backend deployed |
| 5 | MAG-18: Final docs + presentation | Maheen | all |

**Critical path:** MAG-25 → MAG-16 → MAG-17 → MAG-18.

## 5. Key Technical Facts the Next Session Needs

- **JWT secret** is externalized: `jwt.secret=${JWT_SECRET:devDefault}` in `application.properties`. **Must set `JWT_SECRET` env var on Render** before deploy.
- **CORS** in `SecurityConfig` allows `https://gentle-cucurucho-a28226.netlify.app` + `http://localhost:5173`. If Netlify site renamed, update.
- **Frontend API base:** `VITE_API_URL` (`.env` → localhost:8080 fallback). **Set `VITE_API_URL` on Netlify** to the future Render URL.
- **`application-local.properties` + `.env`** are gitignored (verified) — hold local secrets.
- **Known gaps:** vendor cards use placeholder images/rating (MAG-25 pending); admin/cart/notifications pages are UI-only (backend endpoints don't exist); bundle 830 KB (recharts) — code-split later.
- **Deploy note:** Netlify auto-deploys from `main`. Frontend deploy done; backend Render deploy is the blocker for register/login working live.

## 6. Jira Ticket Map (verified via API)

- MAG-1..11: Sprint 1-2 (ER, API, wireframes, repo, schema, UI, backend, share invites)
- MAG-10: JUnit tests (✅ merged, branch `feature/MAG-10-backend-test-coverage`)
- MAG-15..21: Sprint 3 (Vercel/Netlify, Render, system testing, docs, security, API integration, DB verify)
- MAG-22..25: Budget page, auth, shared UI/guest, vendor fields
- MAG-26: UI redesign (✅ merged)
- MAG-12/13/14: reserved/unused

## 7. Open Decisions

1. Admin/cart/notifications backend — in scope or UI-only? (would need new backend tickets)
2. Netlify site rename (from `gentle-cucurucho-a28226`) — then CORS update
3. Multi-event support — decided NO (wedding-only per proposal)

## 8. Useful Commands

```bash
cd "D:/My projects/ZeroState projects/Wedding Planing Platform/Magula.lk"
git checkout main && git pull   # sync
cd frontend && npm run build     # verify frontend
cd backend && cmd /c "mvnw.cmd test"   # 111 tests
```

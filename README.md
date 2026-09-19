# AdMean — Admin Dashboard

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack user-management dashboard: GitHub OAuth, role-based access control, database-backed search, pagination, and analytics — built with Next.js 14 Server Components + Server Actions.

</div>

![AdMean admin dashboard](https://github.com/user-attachments/assets/32071316-8c81-4281-bcc1-651099d42e9b)

> Screenshot placeholder — replace the image above with a current capture of your deployed app before sharing.

## What it does

- **Sign in with GitHub** — NextAuth v4 wired to Prisma, so sessions and accounts live in Postgres.
- **Role-based access control** — `ADMIN` / `USER` roles. The delete action is authorized **on the server** (Server Action), not just hidden in the UI, and an admin can't delete their own account.
- **Search users** — debounced (300ms) and URL-driven (`?q=...`), matching **name OR email** with case-insensitive Postgres queries. The query string is shareable/bookmarkable.
- **Paginate users** — offset-based pagination (`?page=...`), 8 per page, both params compose together.
- **Analytics** — Tremor charts fed from `MonthlyRevenue` and `PageVisit` tables (seeded sample data), fetched in parallel with `Promise.all`.
- **SEO basics** — metadata API, `sitemap.ts`, `robots.txt`.

## Honest scope notes

This is a portfolio project, so a few things are intentionally simplified:

- "CRUD" here means **R**ead (list + search) and **D**elete. There is no create- or edit-user UI yet.
- Analytics data is **seeded sample data**, not real traffic. Points like "high performance" are earned by bounded queries (pagination), not by claims of a load-tested system.
- No test suite yet — the next milestone. Seed, lint, typecheck, and build scripts are all wired up.

## Tech stack

| Layer          | Choice                                                   |
| -------------- | -------------------------------------------------------- |
| Framework      | Next.js 14 (App Router, React Server Components)         |
| Language       | TypeScript (strict)                                      |
| Styling / UI   | Tailwind CSS, Tremor, Headless UI, Lucide icons          |
| Database / ORM | PostgreSQL (Neon) + Prisma (migrations, seed)            |
| Authentication | NextAuth v4 + `@next-auth/prisma-adapter` (GitHub OAuth) |
| Data fetching  | Server Components, Server Actions, `revalidatePath`      |
| Utilities      | `use-debounce`, `useTransition`, `avvvatars-react`       |

## Running it locally

Prerequisites: Node 18.17+, a Postgres database (e.g. Neon), and a GitHub OAuth app.

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure environment variables

   ```bash
   cp .env.example .env.local
   ```

   Fill in `DATABASE_URL`, `NEXTAUTH_SECRET`, and the GitHub OAuth values.
   - Database: create one at [neon.com](https://neon.com) and paste the pooled connection string.
   - GitHub OAuth app: [GitHub → Settings → Developer settings → OAuth Apps](https://github.com/settings/developers), with callback `http://localhost:3000/api/auth/callback/github`.
   - `NEXTAUTH_SECRET`: `openssl rand -base64 32`

3. Apply migrations and seed sample data

   ```bash
   npx prisma migrate dev
   npm run seed
   ```

4. Start the dev server

   ```bash
   npm run dev
   ```

   Then open [http://localhost:3000](http://localhost:3000) and sign in with GitHub.

## Scripts

```bash
npm run dev        # dev server
npm run build      # prisma generate + production build
npm start          # serve the production build
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
npm run seed       # upsert demo users + analytics sample data
```

> The seed script `upsert`s demo users by email, so re-running it never wipes your GitHub sign-in account.

## Project structure

```
app/
├── layout.tsx                 # Root layout + metadata
├── page.tsx                   # Users list: session guard, search, pagination
├── analytics/page.tsx         # Revenue + page-visit charts
├── actions/user.ts            # Server Action: deleteUser (authz on the server)
└── api/auth/[...nextauth]/    # NextAuth handler
components/
├── Nav.tsx / Navbar.tsx       # Server + client nav, sign-in menu
├── Search.tsx                 # Debounced search input (URL state)
├── UsersTable.tsx             # Table + pagination footer
├── DeleteUserButton.tsx       # Confirm-then-delete UI
└── Chart.tsx                  # Tremor AreaChart
lib/
├── auth.ts                    # NextAuth options (GitHub provider, session callbacks)
└── prisma.ts                  # Single PrismaClient (dev hot-reload safe)
prisma/
├── schema.prisma              # User, Account, Session, MonthlyRevenue, PageVisit
├── seed.ts
└── migrations/
types/next-auth.d.ts           # Session/User type augmentation (id + role)
```

## Notes on decisions worth discussing

- **Server components over client fetch loops.** Every list/chart is rendered on the server; search and delete mutate through Server Actions; pages revalidate on delete so the table reflects changes instantly.
- **Authz lives in the Server Action.** Hiding a button is UX; checking `session.user.role` before the `prisma.user.delete` is security. The action also blocks self-deletion server-side.
- **Search is one SQL `OR`.** `name` and `email` are matched with `mode: "insensitive"`, and pagination is clamped so `?page=99` never renders an empty page.
- **Parallel analytics queries.** `Promise.all` on the two reads means wall-clock ~= slowest query, not the sum.

## Roadmap (gladly discuss at interview)

- Unit/integration tests (Vitest + Testing Library)
- Create / edit / promote-user UI to complete true CRUD
- Cursor-based pagination + full-text search at scale
- Admin audit log for destructive actions

## License

[MIT](./LICENSE) © 2026 Bello Muhammed

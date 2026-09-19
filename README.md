# AdMean — Admin Dashboard

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://prisma.io)

A full-stack user-management dashboard: GitHub OAuth, role-based access control, database-backed search, pagination, and analytics — built with Next.js 14 Server Components + Server Actions.

</div>

![AdMean admin dashboard](https://github.com/user-attachments/assets/32071316-8c81-4281-bcc1-651099d42e9b)

> Screenshot placeholder — replace the image above with a current capture of your deployed app before sharing.

## What it does

- **Sign in with GitHub** — NextAuth v4 wired to Prisma, so sessions and accounts live in Postgres.
- **Full CRUD user management** — create (add user), read (list + search + paginate), update (promote/demote role), delete (two-step confirm). Every mutation is a Server Action authorized **on the server**, not just hidden in the UI.
- **Role-based access control** — `ADMIN` / `USER` roles. Admins manage users; admin-only actions re-check `session.user.role` server-side, you can't delete **or** demote your own account, and a duplicate-email create is caught and surfaced as a friendly error.
- **Search users** — debounced (300ms) and URL-driven (`?q=...`), matching **name OR email** with case-insensitive Postgres queries. The query string is shareable/bookmarkable.
- **Paginate users** — offset-based pagination (`?page=...`), 8 per page, both params compose together.
- **Analytics** — Tremor charts fed from `MonthlyRevenue` and `PageVisit` tables (seeded sample data), fetched in parallel with `Promise.all`.
- **Dark mode** — class-based toggle with a no-flash inline script; dark is the first-load default and your choice is persisted. Tremor's dark tokens are wired in the Tailwind config.
- **Polished routing UX** — loading skeleton (`loading.tsx`) and a styled error boundary (`error.tsx`) + 404.
- **SEO basics** — metadata API, `sitemap.ts`, `robots.txt`.

## Honest scope notes

This is a portfolio project, so a few things are intentionally simplified:

- **Update is role-only.** You can create a user, search/list them, and promote/demote — but there's no UI yet to edit a user's name or email after creation.
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
├── layout.tsx                 # Root layout + metadata + no-flash theme script
├── page.tsx                   # Users list: session guard, search, pagination
├── loading.tsx / error.tsx    # Skeleton + error boundary
├── not-found.tsx              # Styled 404
├── analytics/page.tsx         # Revenue + page-visit charts
├── actions/user.ts            # Server Actions: create, update role, delete (authz on the server)
└── api/auth/[...nextauth]/    # NextAuth handler
components/
├── Nav.tsx / Navbar.tsx       # Server + client nav, sign-in menu, theme toggle
├── Search.tsx                 # Debounced search input (URL state)
├── UsersTable.tsx             # Table + pagination footer + role actions
├── AddUserButton.tsx          # Create-user modal (Headless UI Dialog)
├── PromoteUserButton.tsx      # Promote/demote row action
├── DeleteUserButton.tsx       # Confirm-then-delete UI
├── ThemeToggle.tsx            # Dark/light switcher (localStorage + OS preference)
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

## License

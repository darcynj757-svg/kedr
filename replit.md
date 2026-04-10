# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Кедр-Томск (`artifacts/kedr-tomsk`) — previewPath: `/`
- **Type**: react-vite (frontend only, no backend)
- **Purpose**: Premium landing page for "Кедр-Томск", a wooden house construction company in Tomsk, Russia
- **Brand colors**: Navy #0A2540 (primary), Orange #FF6B00 (accent)
- **Pages**: Home (hero, advantages, projects, stages, about, services, stats with CountUp, testimonials carousel, callback, FAQ), Projects, Services, Stages, About, Production, Contacts, Gallery, Articles, ArticleDetail, Calculator, Comparison, NotFound
- **New features**: Calculator (`/calculator`) — 5-step interactive cost estimator; Comparison (`/comparison`) — material comparison table (9 criteria, expandable rows, highlight mode); Testimonials carousel on Home; Animated CountUp numbers in stats section; Floating WhatsApp/Telegram/Phone buttons (Layout.tsx); FAQ (`/faq`) — 18 questions in 5 categories with search + accordion; Geography (`/geography`) — interactive SVG Russia map with 15 city markers and side detail panel
- **Tech**: React + Vite, Tailwind CSS, shadcn/ui, react-hook-form + zod, lucide-react, react-icons
- **No backend needed** — fully static frontend

# Sprint Ops — Frontend

Next.js frontend for Sprint Ops: sprint and goal tracking, task boards,
standup commitments, attendance, a risk/decision/meeting tracker, task
notes, leadership reports, team management, and an AI assistant grounded
in the current sprint's data. Talks to the companion FastAPI backend.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS
- axios (via `lib/api.ts`) for the API client
- framer-motion, used for one animated drawer
- React Context for app-wide state (`lib/auth-context.tsx`,
  `lib/sprint-context.tsx`)

## Project layout

    app/<feature></feature>/
        page.tsx          # composition root — wires hooks to components
        _components/      # this route's presentational components
        _hooks/            # this route's data-fetching / mutation hooks
        _lib/               # this route's constants, types, and pure functions
    lib/                   # shared across features: API client, types, utilities
    components/            # shared UI primitives, used by multiple features
    hooks/                 # shared hooks, used by multiple features

The underscore-prefixed folders (`_components`, `_hooks`, `_lib`) are
Next.js's private-folder convention: they opt out of routing, so they're
pure organization rather than routes.

### Routes

| Route               | Source                   | Purpose                                                            |
| ------------------- | ------------------------ | ------------------------------------------------------------------ |
| `/sprints`        | `app/sprints/`         | Create/edit/delete sprints, handover, carry-over                   |
| `/board`          | `app/board/`           | Cross-team task table with member/goal/status filters              |
| `/goals`          | `app/goals/`           | Goal alignment: per-goal contributor breakdown, unaligned activity |
| `/standup`        | `app/standup/`         | Standup commitment log, accountability flags, AI day summary       |
| `/attendance`     | `app/attendance/`      | Daily roll call, attendance history and rate                       |
| `/tracking`       | `app/tracking/`        | Tabbed: check-ins, risks/blockers, decisions, meetings             |
| `/notes`          | `app/notes/`           | Filterable, paginated task notes log                               |
| `/reports`        | `app/reports/`         | Generate and view daily, weekly, and sprint reports                |
| `/team`           | `app/team/`            | Team roster grouped by discipline, with health rollups             |
| `/team/:memberId` | `app/team/[memberId]/` | One member's task list, stats, and PDF export                      |
| `/ai`             | `app/ai/`              | Chat assistant grounded in the active sprint's data                |

## Shared modules

### `lib/`

The API client, domain types, app-wide context providers, and a set of
small utilities used across multiple features:

- `api.ts` — the axios-based API client (`api.sprints`, `api.tasks`, etc.)
- `types.ts` — domain types (`Sprint`, `Task`, `Member`, ...)
- `sprint-context.tsx` / `auth-context.tsx` — app-wide React Context
- `form-styles.ts` — shared form field styles (`inputCls`, `inputClsRounded`, `labelCls`)
- `form-styles-zinc.ts` — field styles for the zinc/amber palette (see Design notes)
- `card-styles.ts` — the elevated-card shadow token
- `gradients.ts` — the AI-feature gradient and the dark-button gradient
- `color.ts` — `hexToRgba()`
- `pagination.ts` — shared page-slicing logic
- `download.ts` — triggers a browser download for an already-fetched `Blob`
- `initials.ts` — two-letter avatar initials

### `components/`

Shared presentational primitives:

- `Drawer.tsx` — right-side slide-over shell (backdrop, header, scrollable
  body, optional pinned footer)
- `EmptyMark.tsx` — small "nothing here" icon, colored per page via a
  `borderColor` prop
- `DotGridEmptyState.tsx` — empty-state shell for the zinc/amber pages
- `PaginationControls.tsx` — Prev/Next pagination controls
- `AIAvatar.tsx` — gradient badge marking an AI-powered feature
- `EmptyState.tsx`, `StatCard.tsx`, `StatusBadge.tsx`, `HandoverPanel.tsx`,
  `NewTaskForm.tsx` — additional shared UI used across features

### `hooks/`

- `useBlobDownload.ts` — busy state, browser download, and error handling
  for blob-producing endpoints (PDF exports)
- `useTaskActions.ts` — inline task status-change and delete, with a shared
  busy flag

## Conventions

Every feature follows the same shape:

- `page.tsx` is a composition root: it calls hooks, computes derived
  values, and renders named components. No raw `.map()` calls, business
  logic, or fetch calls at that level.
- Hooks own data and mutations — a hook that fetches a list also owns
  reloading it; a hook backing a form owns that form's fields and submit
  flow. Components don't call `api.*` directly.
- Pure UI state (e.g. "which row is expanded") stays local to the
  component that owns it, not in a data hook.
- Shared code lives in `lib/`, `components/`, or `hooks/` once more than
  one feature needs the same thing.

## Design notes

Two visual languages currently coexist in this codebase:

- Most pages use a hex-token palette (`#0B0C0F` / `#1D2B64` / `#E7E5E2`,
  sentence-case labels).
- Sprints and Team use a zinc/amber Tailwind palette with
  `font-display`/`questrial-regular` type and uppercase tracked labels.

A few smaller stylistic splits also exist and are worth resolving in a
future design pass:

- Notes, Standup, and Ask AI use an elevated card style (`CARD_SHADOW`,
  more rounded corners); the rest use flat bordered cards.
- Notes and Standup each have their own dropdown component, built
  differently (Tailwind hover states vs. JS-tracked hover state).
- Avatar initials are two letters in most places, one letter in Goals and
  Notes.
- Drawers are static everywhere except the team page's add-member drawer,
  which animates in with framer-motion.

None of these affect functionality.

## Running locally

    npm install
    npm run dev

Set `NEXT_PUBLIC_API_URL` to point at the backend (defaults to
`http://localhost:8000`).

## Backend

Consumes the companion Sprint Ops FastAPI backend — see that project's
README for its API surface and setup.

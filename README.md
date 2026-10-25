# Mently Sprint Ops — Frontend

Next.js frontend for Mently Sprint Ops: sprint and goal tracking, task boards,
standup commitments, attendance, a risk/decision/meeting tracker, task
notes, leadership reports, team management, member daily reports, and an AI
assistant grounded in the current sprint's data. Talks to the companion
FastAPI backend (`mspm_be`).

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS v4 with Mently design tokens (`app/globals.css`)
- Montserrat via `next/font/google`
- axios (via `lib/api.ts`) for the API client
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
| `/daily-reports`  | `app/(app)/daily-reports/` | Who filed their end-of-day report, what they said, who is missing |
| `/me`             | `app/(member)/me/`     | Team member portal: file today's report before midnight, history   |
| `/login`          | `app/login/`           | One sign-in for managers and team members                          |
| `/activate`       | `app/activate/`        | Team member sets a password with their one-time access code        |
| `/signup`         | `app/signup/`          | First manager account, or another manager with the invite code     |

## Shared modules

### `lib/`

The API client, domain types, app-wide context providers, and a set of
small utilities used across multiple features:

- `api.ts` — the axios-based API client (`api.sprints`, `api.tasks`, etc.)
- `types.ts` — domain types (`Sprint`, `Task`, `Member`, ...)
- `sprint-context.tsx` / `auth-context.tsx` — app-wide React Context
- `form-styles.ts` — shared form field styles (`inputCls`, `inputClsRounded`, `labelCls`)
- `gradients.ts` — the AI-feature gradient and the dark-button gradient
- `color.ts` — `hexToRgba()`
- `pagination.ts` — shared page-slicing logic
- `download.ts` — triggers a browser download for an already-fetched `Blob`
- `initials.ts` — two-letter avatar initials

### `components/`

Shared presentational primitives:

- `Drawer.tsx` — animated right-side slide-over (backdrop, header, scrollable
  body, optional pinned footer, Escape to close)
- `EmptyMark.tsx` — small "nothing here" icon, colored per page via a
  `borderColor` prop
- `DotGridEmptyState.tsx` — illustrated empty state (sprints, team)
- `PaginationControls.tsx` — Prev/Next pagination controls
- `AIAvatar.tsx` — gradient badge marking an AI-powered feature
- `EmptyState.tsx`, `StatCard.tsx`, `StatusBadge.tsx`, `HandoverPanel.tsx`,
  `NewTaskForm.tsx`, `CustomSelect.tsx`, `AccessCodeCard.tsx` — additional
  shared UI used across features

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

## Roles and daily reports

- **Managers** use everything under `app/(app)/`.
- **Team members** sign in through the same `/login` and land on `/me`
  (`app/(member)/`). A manager gives someone access from their Team page
  (an email is required); that creates a one-time access code the member
  uses on `/activate`. Issuing a new code doubles as a password reset.
- A daily report covers one calendar day and can be filed or edited until
  midnight in the team timezone (`TEAM_TIMEZONE` on the backend, default
  `Africa/Lagos`). After that it is locked and the day shows as missed.

## Design system

Mently branding: indigo `brand` (#1F0954), purple `accent` (#6F01D0) and
gold `gold` (#F19A0D), with cool neutrals (`ink`, `ink-soft`, `ink-mute`,
`ink-faint`, `line`, `line-strong`, `canvas`, `subtle`). Tokens live in
`@theme` in `app/globals.css`, alongside a few component classes:
`card`, `eyebrow`, `btn-primary`, `btn-secondary` and `spinner`.
Shared building blocks: `PageHeader`, `StatCard`, `EmptyState`,
`NoActiveSprint`, `Drawer`, `PageLoader`, `SplashScreen` and the `Toaster`
(trigger it with `notify` from `lib/notify.ts`).

## Running locally

    npm install
    npm run dev

Set `NEXT_PUBLIC_API_URL` to point at the backend (defaults to
`http://localhost:8000`).

## Backend

Consumes the companion Sprint Ops FastAPI backend — see that project's
README for its API surface and setup.

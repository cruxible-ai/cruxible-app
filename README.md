# cruxible-ui

Read-only inspection console for Cruxible project state. One bundle serves
both local daemon instances (same-origin) and future Cruxible Cloud instances —
the difference is data-source configuration only.

## Stack

Vite + React + TypeScript (strict) SPA · React Router (URL is state) ·
TanStack Query · Tailwind CSS · openapi-typescript/openapi-fetch generated from
the pinned daemon contract (`api/openapi.json`, see `api/README.md`) · MSW for
fixtures · Vitest.

## Development

The daemon has no CORS; the Vite dev server proxies `/api` to it and injects
the bearer token from your shell environment.

```sh
# in a shell where CRUXIBLE_SERVER_BEARER_TOKEN is set (cd ~/Git/cruxible-app does this)
cp .env.example .env.local   # sets the default instance id
pnpm install
pnpm dev
```

## Invariants

1. **Data-source boundary** (`src/api/data-source.ts`): base URL + optional
   bearer token as config. Rendering components consume hooks
   (`src/api/hooks.ts`) only — never fetch, never import fixtures.
2. **Generated contract** (`src/api/generated/`): regenerated from the pinned
   spec via `pnpm gen:api`, never hand-edited.
3. **Read-only**: the UI performs GET requests exclusively.

## Commands

| command          | what                                  |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | dev server with daemon proxy          |
| `pnpm build`     | typecheck + production bundle         |
| `pnpm test`      | vitest                                |
| `pnpm gen:api`   | regenerate types from pinned spec     |

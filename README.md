# cruxible-ui

Read-only inspection console for a local [Cruxible](https://github.com/cruxible-ai/cruxible-core)
daemon — the governed state layer for AI agents. The daemon holds the state
(entities, relationships, review queues, receipts, workflows); this app lets
you look at it.

**Status: alpha.** See [caveats](#alpha-caveats).

## Screens

| screen     | what it shows                                                              |
| ---------- | -------------------------------------------------------------------------- |
| Overview   | status meters per entity type; every catalog queue with its top items      |
| Browse     | raw entity listing per type, schema-driven status filters                  |
| Entity     | properties plus every relationship with its trust metadata (provenance, review state, evidence) |
| Graph      | 1-hop neighborhood around an entity; edge color carries review status      |
| Type map   | the instance's ontology: entity types with live counts, relationship types as edges |
| Workflows  | the declared workflow catalog — step pipelines and the providers they call |
| Query view | any named query, with the query definition always visible and a receipt footer |
| Receipt    | the full trust artifact behind a query: operation, node trail, raw envelope |

## Setup

Requires Node ≥ 22, pnpm, and a running cruxible-core daemon (default
`http://127.0.0.1:8119`).

```sh
pnpm install
cp .env.example .env.local        # set your instance id
# in a shell where CRUXIBLE_SERVER_BEARER_TOKEN is set:
pnpm dev
```

Environment for the dev server:

| variable                       | purpose                                              | default                 |
| ------------------------------ | ---------------------------------------------------- | ----------------------- |
| `CRUXIBLE_DAEMON_URL`          | daemon origin the dev proxy targets                  | `http://127.0.0.1:8119` |
| `CRUXIBLE_SERVER_BEARER_TOKEN` | daemon bearer token, injected by the proxy           | unset                   |
| `VITE_CRUXIBLE_INSTANCE_ID`    | instance to land on at `/` (in `.env.local`)         | unset                   |

### How the token is handled

The daemon has no CORS, so the Vite dev server fronts it: `vite.config.ts`
proxies `/api` to `CRUXIBLE_DAEMON_URL` and, on each proxied request, sets
`Authorization: Bearer $CRUXIBLE_SERVER_BEARER_TOKEN` (unless the request
already carries one). The token is read from the shell environment of the
**dev-server process** — it is deliberately not a `VITE_`-prefixed variable,
so Vite never inlines it into client code, and it never appears in the bundle
or the browser. Never put tokens in `.env` files here.

In local production the daemon serves the bundle itself (same-origin `/api`,
no proxy, no token in the client).

### No daemon handy

`VITE_CRUXIBLE_FIXTURES=1 pnpm dev` serves a miniature fixture instance
through an MSW worker at the network layer — same code paths, canned data.

## Screenshots

<!-- Captured against the project-state kit; regenerate before release. -->

![Overview](docs/screenshots/overview.png)
![Entity context](docs/screenshots/entity.png)
![Graph](docs/screenshots/graph.png)
![Receipt](docs/screenshots/receipt.png)

## Alpha caveats

- **Read-only.** The UI performs GET requests exclusively; all writes go
  through the daemon's CLI/MCP surfaces.
- **Localhost.** Built for a daemon on your own machine. There is no login
  screen, no session handling, no multi-user story.
- **Pinned API surface.** Types are generated from `api/openapi.json`, pinned
  to the cruxible-core 0.2 contract (see `api/README.md`). Other daemon
  versions may render incompletely.
- Screens, routes, and visual details will change without notice.

## Architecture invariants

1. **Data-source boundary** (`src/api/data-source.ts`): base URL + optional
   bearer token as config. Rendering components consume hooks
   (`src/api/hooks.ts`) only — never fetch, never import fixtures.
2. **Generated contract** (`src/api/generated/`): regenerated from the pinned
   spec via `pnpm gen:api`, never hand-edited.
3. **Read-only**: the UI performs GET requests exclusively.

## Commands

| command        | what                                          |
| -------------- | --------------------------------------------- |
| `pnpm dev`     | dev server with daemon proxy                  |
| `pnpm build`   | typecheck + production bundle                 |
| `pnpm test`    | vitest                                        |
| `pnpm gen:api` | regenerate types from the pinned spec         |

## License

Apache-2.0. See [LICENSE](LICENSE).

# Cruxible App

Read-only inspection console for a [Cruxible](https://github.com/cruxible-ai/cruxible)
daemon — the hard state layer for AI agents. The daemon holds the state
(entities, relationships, review queues, receipts, workflows, traces); this
app lets you look at it: the state graph, pending judgment, and the evidence
chain behind every answer.

**Status: alpha.** Read-only by design — judgment stays on the attributed
CLI/MCP surface. See [caveats](#alpha-caveats).

## Run

Requires Node ≥ 22 and pnpm, plus a running Cruxible daemon
([quickstart](https://github.com/cruxible-ai/cruxible/blob/main/docs/quickstart.md);
default `http://127.0.0.1:8100`).

```sh
git clone https://github.com/cruxible-ai/cruxible-app.git && cd cruxible-app
pnpm install
cp .env.example .env.local          # set VITE_CRUXIBLE_INSTANCE_ID to your instance id
pnpm dev                            # http://localhost:5173
```

Against an auth-off sandbox daemon no token is needed. With auth on, mint a
read-only credential (`cruxible credential mint --label ui --mode read_only`)
and export it as `CRUXIBLE_SERVER_BEARER_TOKEN` before `pnpm dev` — the dev
proxy injects it server-side; tokens never live in env files. A non-default
daemon URL goes in `CRUXIBLE_DAEMON_URL`.

## Screens

| screen        | what it shows                                                            |
| ------------- | ------------------------------------------------------------------------ |
| Overview      | status meters per entity type, view cards, latest snapshots               |
| State graph   | the whole instance as typed dots and governance-colored edges; search, focus, dual dot/card modes |
| Type map      | the ontology: entity types with live counts, relationship types as edges, base/overlay layers |
| Review groups | pending judgment: signal matrix, proposed edges with evidence, resolution rationale and actor |
| Workflows     | grouped by class (decision proposals first, with pending-judgment counts); each workflow's declarative step pipeline |
| Views         | every named query — standing views in the sidebar, parameterized views with inline forms |
| Entity        | properties, every relationship with its trust metadata, context queries, focus-in-graph |
| Traces        | provider execution records: pinned digests, runtime, input/output payloads |
| Receipt       | the full trust artifact behind a query: operation, node trail, raw envelope |
| Activity      | recent receipts across the instance                                       |
| Sources       | registered source artifacts and their chunked content                     |

## Environment

| variable                       | purpose                                              | default                 |
| ------------------------------ | ---------------------------------------------------- | ----------------------- |
| `CRUXIBLE_DAEMON_URL`          | daemon origin the dev proxy targets                  | `http://127.0.0.1:8100` |
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

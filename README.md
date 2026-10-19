# Cruxible App

Read-only inspection console for a [Cruxible](https://github.com/cruxible-ai/cruxible)
daemon — the hard state layer for AI agents. The daemon holds accepted state
(Subjects, Claims and their evidence, proposals, Lines and runs); this app lets
you look at it at any accepted generation.

**Status: alpha.** Read-only by design — judgment stays on the attributed
CLI/MCP surface. See [caveats](#alpha-caveats).

## Run

Requires Node ≥ 22 and pnpm, plus a running Cruxible daemon
([quickstart](https://github.com/cruxible-ai/cruxible/blob/main/docs/quickstart.md)).

```sh
git clone https://github.com/cruxible-ai/cruxible-app.git && cd cruxible-app
pnpm install
cp .env.example .env.local          # set VITE_CRUXIBLE_INSTANCE_ID to your instance id
pnpm dev                            # http://localhost:5173
```

**Unix socket (local default).** Start the daemon read-only so the console
cannot mutate even by mistake, and point the dev proxy at its socket:

```sh
cruxible server start --socket "$SOCK" --capability-ceiling read_only
CRUXIBLE_SERVER_SOCKET="$SOCK" pnpm dev
```

A socket daemon runs with auth off, so no token is needed.

**TCP.** A TCP daemon requires `--auth`. Mint a read-only credential
(`cruxible credential mint --principal-id <owner> --mode read_only --label console`)
and export it as `CRUXIBLE_SERVER_BEARER_TOKEN` before `pnpm dev`; set
`CRUXIBLE_DAEMON_URL` when the daemon is not on `http://127.0.0.1:8100`.

## Screens

| screen    | what it shows                                                                      |
| --------- | ---------------------------------------------------------------------------------- |
| Overview  | Subjects per kind, the Claim tally, artifact counts, orient's attention summary, the first `next` items, `next` health per component, installed kits |
| Type map  | the ontology: Subject kinds with counts, Subject-valued ClaimTypes as kind links; per kind its identity rule and every ClaimType's cardinality, value type, evidence requirement and staleness; evidence rules per ClaimType |
| Subject   | a Subject's card: every field's value and read flags, each Claim's verdict and contenders, capture admission; per Claim on expand its evidence (Captures, attestations, rationale), admission accounts and revisions; the field history, paged |
| Neighborhood | a Subject's outgoing links (Subject-valued Claims), depth 1 or 2, at most 150 Subjects; incoming links shown as counts per node |
| Next      | the `next` queue, a page of 100 at a time, grouped by severity, filterable by family; each reason renders its own detail fields; repairs show as text with their CLI command |
| Beliefs   | contested, stale and drifted beliefs: tabs over the `next` page in hand |
| Proposals / Ledger | proposals by status; the ledger of accepted proposals (interim, until the daemon serves its generation timeline); each opens its review: members with field deltas and prior refusals, governance, recorded approvals, item reasons. Approving, activating and rejecting stay on the CLI/MCP |
| Reference | any other ref `get` resolves (Claim, Capture, Line, run, …), its card field by field |

**Jump palette** (⌘K): type any ref (`kind/id`, `CLM-…`, `Line:…`,
`ClaimType:…`); it resolves with one read and completes Subject kinds, a
kind's sample ids, ClaimTypes and Lines from orient.

**Generation picker.** The sidebar shows the accepted generation every read is
pinned to. Unpinned, reads follow the head (polled). Enter a generation number
or a git oid prefix to pin `?at=`; every link keeps the pin until "Back to
head". Generations older than the last 64 rebuild their projection on the
daemon, so the picker warns before binding one.

## Environment

| variable                       | purpose                                              | default                 |
| ------------------------------ | ---------------------------------------------------- | ----------------------- |
| `CRUXIBLE_SERVER_SOCKET`       | daemon Unix socket the dev proxy targets             | unset                   |
| `CRUXIBLE_DAEMON_URL`          | daemon origin the dev proxy targets (TCP)            | `http://127.0.0.1:8100` |
| `CRUXIBLE_SERVER_BEARER_TOKEN` | daemon bearer token, injected by the proxy           | unset                   |
| `VITE_CRUXIBLE_INSTANCE_ID`    | instance to land on at `/` (in `.env.local`)         | unset                   |

### How the token is handled

The daemon has no CORS, so the Vite dev server fronts it: `vite.config.ts`
proxies `/api` to the socket or URL and, on each proxied request, sets
`Authorization: Bearer $CRUXIBLE_SERVER_BEARER_TOKEN` (unless the request
already carries one). The token is read from the shell environment of the
**dev-server process** — it is deliberately not a `VITE_`-prefixed variable,
so Vite never inlines it into client code, and it never appears in the bundle
or the browser. Never put tokens in `.env` files here.

In local production the daemon serves the bundle itself (same-origin `/api`,
no proxy, no token in the client).

### No daemon handy

`VITE_CRUXIBLE_FIXTURES=1 pnpm dev` serves the fixture world in
`src/fixtures/recorded/` through an MSW worker at the network layer — same
code paths, canned data. A fixture answers only the exact request it recorded
(method, path, normalized query and body); anything else gets the daemon's
error envelope.

To re-record from a daemon serving a scratch world (never a live state root):
run the dev proxy against it, then
`node scripts/record-fixtures.ts --base http://127.0.0.1:5173 --instance <id>`,
and `pnpm typecheck` (every recorded response is checked against the pinned
contract).

## Alpha caveats

- **Read-only.** The client refuses any route outside a read allow-list
  (`src/api/requests.ts`) before a request is sent. Several reads are POSTs
  (`get`, `query`, `next`, proposal review); the routes that start runs,
  record measurements or evaluate Lines are not on the list.
- **Localhost.** Built for a daemon on your own machine. There is no login
  screen, no session handling, no multi-user story.
- **Pinned API surface.** Types are generated from `api/openapi.json`, pinned
  to a cruxible-core commit (see `api/README.md`). Other daemon versions may
  render incompletely.
- Screens, routes, and visual details will change without notice.

## Architecture invariants

1. **Data-source boundary** (`src/api/data-source.ts`): base URL + optional
   bearer token as config. Rendering components consume hooks
   (`src/api/hooks.ts`) only — never fetch, never import fixtures.
2. **Generated contract** (`src/api/generated/`): regenerated from the pinned
   spec via `pnpm gen:api`, never hand-edited.
3. **One coordinate per page**: the page's `?at=` (or the head) resolves once
   through `GET /head`; every state read carries that full coordinate.
4. **Read-only**: only allow-listed read routes ever leave the app.

## Commands

| command           | what                                                  |
| ----------------- | ----------------------------------------------------- |
| `pnpm dev`        | dev server with daemon proxy                          |
| `pnpm build`      | typecheck + production bundle                         |
| `pnpm test`       | vitest                                                |
| `pnpm test:smoke` | Playwright over the fixture world (offline)           |
| `pnpm gen:api`    | regenerate types from the pinned spec                 |

## License

Apache-2.0. See [LICENSE](LICENSE).

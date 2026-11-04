# Cruxible App

Read-only inspection console for a [Cruxible](https://github.com/cruxible-ai/cruxible)
daemon — the hard state layer for AI agents. The daemon holds accepted state
(Subjects, Claims and their evidence, proposals, Lines and runs); this app lets
you look at it at any accepted generation.

**Status: alpha.** Read-only by design — judgment stays on the attributed
CLI/MCP surface. See [caveats](#alpha-caveats).

## Run

Requires Node ≥ 22 and pnpm, plus a running Cruxible daemon, cruxible-core
0.5.x ([quickstart](https://github.com/cruxible-ai/cruxible/blob/main/docs/quickstart.md));
the contract this build is generated from is pinned in `api/pin.json`.

```sh
git clone https://github.com/cruxible-ai/cruxible-app.git && cd cruxible-app
pnpm install
cp .env.example .env.local          # set VITE_CRUXIBLE_INSTANCE_ID (`cruxible context show` names it)
pnpm dev                            # http://localhost:5173
```

**Unix socket (local default).** Start the daemon read-only so the console
cannot mutate even by mistake, and point the dev proxy at its socket:

```sh
cruxible server start --socket "$SOCK" --capability-ceiling read_only
CRUXIBLE_SERVER_SOCKET="$SOCK" pnpm dev
```

`$SOCK` is a socket path in a directory only you can read (mode 0700), short
enough for the OS limit (about 100 bytes on macOS); without `--socket` the
daemon falls back to `CRUXIBLE_SERVER_SOCKET`, else TCP. A socket daemon runs
with auth off, so no token is needed. The ceiling is fixed for the daemon's
lifetime: to change state (install a kit, approve a proposal) stop it
(`cruxible server stop` needs an admin daemon, so stop a read-only one with
Ctrl-C) and start one without the ceiling.

**TCP.** A TCP daemon requires `--auth`. Mint a read-only credential
(`cruxible credential mint --principal-id <owner> --mode read_only --label console --commit`;
without `--commit` it only previews)
and export it as `CRUXIBLE_SERVER_BEARER_TOKEN` before `pnpm dev`; set
`CRUXIBLE_DAEMON_URL` when the daemon is not on `http://127.0.0.1:8100`.

## Screens

| screen    | what it shows                                                                      |
| --------- | ---------------------------------------------------------------------------------- |
| Dashboard | the landing page: what needs you (proposals, inbox, `next` items, Lines, health), what each enabled Line waits for and when it wakes, the activity feed, installed kits |
| Overview  | what the instance knows: per kind its Subjects, ClaimTypes, live Claims, the Lines that feed it (or entered directly) and its last change; each logical source's contracts, last landing, Captures and reading Lines; recent Claim changes (one `since` read over the newest generations, before → after where the read holds both); coverage per ClaimType (maintained counters); documents |
| Type map  | the ontology overview, laid out left to right (ELK layered, loaded on first use): Subject kinds with counts, Subject-valued ClaimTypes as kind links from the holding kind to the kind it names (field names show on a selected kind's links), unlinked kinds in one column; per kind its identity rule and every ClaimType's cardinality, value type, evidence requirement and staleness; evidence rules per ClaimType |
| Kind      | one Subject kind as the ontology defines it: identity, kit, what points at it; per ClaimType its value or target kind, cardinality, role, evidence contracts, freshness, kit (and local edits), contention policy, format and revision, who may settle it (typed Mandate scope), live Claims and the share of Subjects with a value (maintained counters); a row expands to its evidence rules and the definitions that pin it |
| Contract  | one capture contract, read Input → Contract → Output: under the title, what it is in one sentence; its terms in plain words from the stored contract (`get --detail proof`: shape, who obtains it, replay, size, retention, erasure, selector privacy, grade); grade and source kinds; its logical sources (contracts no longer list them: each comes from the source steps that retain it and the landing Triggers that select it), with who retains and selects each; the Procedures that capture under it (definition pins), with their interfaces and Lines, and which retain Captures and which read its landings; the Triggers on its landings, the logical sources they select and the Lines they start; the ClaimTypes that admit or require it |
| Evidence flow | logical sources → capture contracts → the Triggers their landings fire (and the Lines they start) and the ClaimTypes that admit them, in columns; a source node is a logical source the definitions name (retained by a source step, literally or through a Line parameter, or selected by a landing Trigger); hover traces a node's path (a source lights only the Triggers that select it), focus keeps only it |
| Subject   | a Subject's card: every field's value and read flags, each Claim's verdict and contenders, evidence admitted; per Claim on expand its evidence (each cited Capture as evidence, own words or a passage of its source, with its state: admitted, not admitted or not evidence; each attestation, accepted or recorded, with whether it counts toward the verdict and why; rationale), admission accounts and revisions; the field history, paged |
| Neighborhood | a Subject's outgoing links (Subject-valued Claims), depth 1 or 2, at most 150 Subjects, plus the first page of what points at it; every node pages its incoming links |
| Next      | the `next` queue, a page of 100 at a time, grouped by severity and then by reason (a repair or detail shared by a whole group shows once), filterable by family; each reason renders its own detail fields; repairs show as text with their CLI command |
| Beliefs   | contested, stale and drifted beliefs: tabs over the `next` page in hand; a resurfaced attestation shows its basis and note, and a recorded contradiction with no consequence policy says it does not count toward the verdict |
| Ledger    | accepted generations newest first: sequence (opens the instance pinned there), oid, proposer, approvals, reason, change count; a row expands to its change set |
| Proposals | proposals by state (waiting for review, incomplete, settled); each opens its review: the proposal's words and a summary first, each change marked `+` create, `~` revise, `−` retire (ClaimType, Subject, value before and after) with its raw field deltas behind a disclosure, prior refusals, governance, recorded approvals, item reasons. Approving, activating and rejecting stay on the CLI/MCP |
| Lines     | every Line: Procedure, trigger, max authority, mandates, enablement, last run, inbox unread, `next` rows |
| Line      | triggers, enablements, occurrences, runs (paged); the Line as authored (parameters, trigger input, bindings, what it retains, the logical sources its landing Triggers select) beside its Procedure's definition (slots with their interface and the build that binds each, steps with the contracts, interfaces, queries and ClaimTypes they name); the Procedure's track record, measurement reviews and resolution dispositions, readings (paged), mandate scope and condition query, the Line's inbox (paged) |
| Run       | nodes, the terminal refusal, terminal egress with the proposal produced, Captures read, receipt and attribution (withheld where the credential may not see them) |
| Docs      | the instance's Documents (title, kind, media type, revision), findable by name, title, kind or type, beside a reader: markdown rendered, HTML in a sandboxed frame (no scripts, no same-origin, nothing remote loads), JSON pretty-printed, other text as text, binary as a download; a Raw toggle and a Download on each. Bodies read through `get` detail=body, which takes governed_write (a read_only token gets the CLI command instead) |
| Reference | any other ref `get` resolves (Claim, Capture, Line, run, …), its card field by field; a Procedure leads with its definition (slots, steps), a Trigger with its schedule (contract, logical sources, the Line it starts); a Capture with its contents (markdown and HTML rendered as on Docs, with Raw; governed_write) |

**Color.** Two signals only: an amber dot means waiting on you or someone,
a red dot means wrong or blocked; everything else has no dot. Hover a dot for
what it means and what to do. Status words come from one glossary
(`src/lib/vocabulary.ts`), so a concept reads the same on every screen.

**Jump palette** (⌘K): type any ref (`kind/id`, `CLM-…`, `Line:…`,
`ClaimType:…`); it resolves with one read and completes Subject kinds, a
kind's sample ids, ClaimTypes and Lines from orient.

**Generation box.** The sidebar shows the accepted generation every read is
pinned to. By default every screen follows the head: when a generation is
accepted, reads move to it without a reload (the head is polled). Open the box
for the newest generations (when, who or which Procedure, how many changes);
picking one pins `?at=`, and every link keeps the pin until "Back to head".
Typing a generation number or a git oid prefix in the list reaches older ones;
generations older than the last 64 rebuild their projection on the daemon, so
the box warns before binding one. Under the head, what is waiting to be
accepted ("1 proposal waiting for review", linked): the head moves only on
acceptance. Settings → "Follow the head" (on by default, per browser) off
holds an unpinned page on the head it opened on and offers the newer one.

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

`VITE_CRUXIBLE_FIXTURES=1 pnpm dev` serves the recorded world in
`src/fixtures/recorded/` (read from a security kit 1.3.0 reference instance on
the pinned core: the example automation, an SBOM, OSV, KEV and EPSS runs, the
repository and registry pulls, a contested assessment) through an MSW worker at the network layer — same code paths,
canned data. `VITE_CRUXIBLE_FIXTURES=authored` serves the small hand-authored
world in `src/fixtures/authored/` instead (contested slots, refusals, second
pages; the Playwright smoke runs on it). A fixture answers only the exact
request it recorded (method, path, normalized query and body); anything else
gets the daemon's error envelope.

To re-record, serve a scratch world (never a live state root) from a
read-only daemon on a Unix socket, point the dev proxy at it with no token in
the environment, then run
`node scripts/record-fixtures.ts --base http://127.0.0.1:5173 --instance <id>`
(`--base` is the dev server's origin, whatever port it runs on)
and `pnpm typecheck` (every recorded response is checked against the pinned
contract). The recorder replaces `src/fixtures/recorded/` only.

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

// Record the fixture set from a running daemon, through the dev proxy.
//
//   pnpm dev                       # proxy pointed at the daemon (see README)
//   node scripts/record-fixtures.ts --base http://127.0.0.1:5173 --instance <id>
//
// Replays a fixed list of reads (each built with the app's own request
// builders, so fixture keys match what the app sends), then replaces
// src/fixtures/recorded/ with one typed module per response. Every route is
// checked against the console's read allow-list first; nothing here starts a
// run or writes. Point it at a read-only daemon (--capability-ceiling
// read_only) serving a scratch world, never a live state root.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";
import {
  CLAIM_READ_BATCH_MAX,
  captureReadBody,
  claimReadBatchBody,
  documentBodyRange,
  getBatchBody,
  getBody,
  GET_BATCH_MAX,
  GRAPH_PAGE,
  HISTORY_PAGE,
  INCOMING_PAGE,
  kindQuery,
  LANDING_TRIGGERS_QUERY,
  selectFields,
  LEDGER_PAGE,
  LINE_RUNS_PAGE,
  headQuery,
  inboxQuery,
  isReadRoute,
  NEXT_PAGE,
  nextBody,
  PAIRS_PAGE,
  orientQuery,
  proposalsQuery,
  queryBody,
  readingsBody,
  reviewBody,
} from "../src/api/requests.ts";
import type { AcceptedCoordinate, GetResult, OrientResult } from "../src/api/schemas.ts";
import { digest8, fixtureKey, normalizePath, normalizeQuery } from "../src/fixtures/key.ts";
import { walkNeighborhood, type CardFetcher, type IncomingReader } from "../src/lib/neighborhood.ts";
import { lineName } from "../src/lib/lines.ts";
import { ontologyKinds } from "../src/lib/type-graph.ts";
import { changeSetRun, changeSets } from "../src/lib/change-sets.ts";
import { attestationAccounts } from "../src/lib/attestation-evidence.ts";

/** A Capture's handle, as the app reads it (lib/next-reasons captureHandle). */
const captureHandle = (digest: string) => `CAP-${digest.replace(/^sha256:/, "").slice(0, 12)}`;

/** The page size the Subject page's backlinks read (components/Backlinks BACKLINKS_PAGE). */
const BACKLINKS_PAGE = 50;

const { values: args } = parseArgs({
  options: {
    base: { type: "string", default: "http://127.0.0.1:5173" },
    instance: { type: "string" },
    out: { type: "string", default: "src/fixtures/recorded" },
    // Record one group into the existing set (same coordinate) instead of
    // replacing it: "graph", "ontology" or "about".
    only: { type: "string" },
  },
});
if (!args.instance) throw new Error("--instance <id> is required");
const INSTANCE = args.instance;
const ORIENT_PAGE = 500;
const pin = JSON.parse(readFileSync(new URL("../api/pin.json", import.meta.url), "utf8")) as {
  core_commit: string;
};

interface Recording {
  method: "get" | "post";
  template: string;
  pathParams: Record<string, string>;
  query: Record<string, unknown> | undefined;
  body: unknown;
  status: number;
  response: unknown;
}
const recordings = new Map<string, Recording>();

async function call<T>(
  method: "get" | "post",
  template: string,
  opts: { pathParams?: Record<string, string>; query?: object; body?: unknown } = {},
): Promise<T | null> {
  if (!isReadRoute(method, template)) throw new Error(`not a read route: ${method} ${template}`);
  const pathParams = opts.pathParams ?? {};
  const concrete = template.replace(/\{(\w+)\}/g, (_whole, name: string) =>
    encodeURIComponent(name === "instance_id" ? INSTANCE : pathParams[name]!),
  );
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(normalizeQuery(opts.query as Record<string, unknown>))) {
    for (const item of Array.isArray(value) ? value : [value]) search.append(key, item);
  }
  const url = `${args.base}${concrete}${search.size ? `?${search}` : ""}`;
  const response = await fetch(url, {
    method: method.toUpperCase(),
    headers: { "Content-Type": "application/json" },
    ...(opts.body !== undefined ? { body: JSON.stringify(opts.body) } : {}),
  });
  const json = (await response.json()) as unknown;
  // The host's managed root is the recording machine's own path: keep it out
  // of the fixtures, as core does for an instance-scoped credential.
  if (template === `${P}/host` && json && typeof json === "object") (json as { managed_root?: unknown }).managed_root = null;
  const body = opts.body === undefined ? null : JSON.parse(JSON.stringify(opts.body));
  const key = fixtureKey(
    method,
    normalizePath(concrete),
    normalizeQuery(opts.query as Record<string, unknown>),
    body,
  );
  recordings.set(key, {
    method,
    template,
    pathParams,
    query: opts.query as Record<string, unknown> | undefined,
    body: opts.body,
    status: response.status,
    response: json,
  });
  console.log(`${response.status} ${method.toUpperCase()} ${concrete}`);
  return response.ok ? (json as T) : null;
}

const P = "/api/v1/{instance_id}";

async function orientAll(coordinate: AcceptedCoordinate, section?: "claim_types" | "subject_kinds" | "lines" | "mandates" | "documents" | "runbooks" | "procedures" | "principals") {
  const pages: OrientResult[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < 20; page += 1) {
    const result = await call<OrientResult>("get", `${P}/orient`, {
      query: orientQuery({ coordinate, section, limit: ORIENT_PAGE, cursor }),
    });
    if (!result) break;
    pages.push(result);
    if (!result.next_cursor) break;
    cursor = result.next_cursor;
  }
  return pages;
}

const head = await call<{ coordinate: AcceptedCoordinate }>("get", `${P}/head`, { query: headQuery(null) });
if (!head) throw new Error("head read failed");
const C = head.coordinate;

const fetchCards: CardFetcher = async (refs) => {
  const batch = await call<{ results: GetResult[] }>("post", `${P}/get-batch`, { body: getBatchBody(refs, C) });
  if (!batch) throw new Error(`get-batch refused ${refs.join(", ")}`);
  return batch.results;
};

/** A Mandate's card (typed scope and condition) and its condition query's card. */
async function recordMandate(mandate: string) {
  const name = mandate.replace(/^(Procedure)?Mandate:/, "");
  const [read] = await fetchCards([`Mandate:${name}`]).catch(() => [undefined]);
  const query = (read?.card as { condition?: { query?: string } | null } | undefined)?.condition?.query;
  if (query) await fetchCards([query]).catch(() => null);
}

// The About page: core's version, the host, the caller, the Providers, the
// principals and the approval policy (kits and the next page are read below
// for the whole set; `--only about` reads them here too).
if (!args.only || args.only === "about") {
  await call("get", "/version");
  await call("get", `${P}/host`);
  await call("get", `${P}/whoami`);
  await call("get", `${P}/providers`);
  await orientAll(C, "principals");
  await fetchCards(["ApprovalPolicy:instance"]).catch(() => null);
  if (args.only === "about") {
    await call("get", `${P}/kits`);
    await call("get", `${P}/orient`, { query: orientQuery({ coordinate: C, limit: ORIENT_PAGE }) });
    await call("post", `${P}/next`, { body: nextBody({ coordinate: C, evaluationTime: new Date().toISOString(), limit: NEXT_PAGE }) });
    writeRecordings(false);
    process.exit(0);
  }
}

// The whole-graph screen: every page of orient section=graph, from the first
// page's cursor.
if (!args.only || args.only === "graph") {
  let cursor: string | undefined;
  for (let page = 0; page < 200; page += 1) {
    const result = await call<OrientResult>("get", `${P}/orient`, {
      query: orientQuery({ coordinate: C, section: "graph", limit: GRAPH_PAGE, cursor }),
    });
    if (!result?.next_cursor) break;
    cursor = result.next_cursor;
  }
}
if (args.only === "graph") {
  writeRecordings(false);
  process.exit(0);
}

// The ontology pages: every SubjectKind card and kind detail (kind pages: the
// detail carries the live counts), every ClaimType card (expanded rows), every
// contract card, alone and batched, and the contracts section (contract and
// evidence-flow pages), the pins section
// (producers, who pins a ClaimType), the capture-landing Trigger listing, and
// every Mandate card with its condition query's card (settlers, Line pages).
if (!args.only || args.only === "ontology") {
  const all = async (
    section: "subject_kinds" | "claim_types" | "capture_contracts" | "mandates" | "lines" | "pins" | "procedures",
  ) => {
    const rows: Record<string, unknown>[] = [];
    let cursor: string | undefined;
    for (let page = 0; page < 20; page += 1) {
      const result = await call<OrientResult>("get", `${P}/orient`, {
        query: orientQuery({ coordinate: C, section, limit: ORIENT_PAGE, cursor }),
      });
      rows.push(...(((result?.[section] as unknown[]) ?? []) as Record<string, unknown>[]));
      if (!result?.next_cursor) break;
      cursor = result.next_cursor;
    }
    return rows;
  };
  const bareName = (value: unknown) => String(value).replace(/^[A-Za-z]+:/, "");
  for (const row of await all("subject_kinds")) {
    await fetchCards([`SubjectKind:${row.kind}`]).catch(() => null);
    await call("get", `${P}/orient`, { query: orientQuery({ coordinate: C, kind: String(row.kind) }) });
  }
  const claimTypeRows = await all("claim_types");
  for (const row of claimTypeRows) {
    await call("post", `${P}/get`, { body: getBody({ ref: `ClaimType:${row.predicate}`, coordinate: C }) });
  }
  // The kind pages' Subjects tables: each kind's first query page (claims:
  // true), selecting every ClaimType of the kind, identity keys first.
  for (const row of await all("subject_kinds")) {
    const kind = String(row.kind);
    const predicates = claimTypeRows
      .filter((item) => Array.isArray(item.subject_kinds) && (item.subject_kinds as string[]).includes(kind))
      .map((item) => String(item.predicate))
      .sort();
    const { select } = selectFields(predicates, Array.isArray(row.keys) ? (row.keys as string[]) : []);
    await call("post", `${P}/query`, { body: queryBody(kindQuery({ kind, select }), C) });
  }
  const contractRefs = (await all("capture_contracts")).map((row) => `CaptureContract:${bareName(row.contract)}`);
  for (const ref of contractRefs) await fetchCards([ref]).catch(() => null);
  // The evidence-flow view: every contract card, 64 per batch, in section order.
  for (let i = 0; i < contractRefs.length; i += GET_BATCH_MAX) {
    await fetchCards(contractRefs.slice(i, i + GET_BATCH_MAX)).catch(() => null);
  }
  const lineRows = await all("lines");
  await all("pins");
  for (const row of await all("mandates")) await recordMandate(String(row.mandate));
  await call("post", `${P}/query`, { body: queryBody(LANDING_TRIGGERS_QUERY, C) });
  // The source model (evidence flow, contract pages): every Procedure's card
  // (its authored form) and every Line's envelope (get-batch detail=proof),
  // 64 per batch in section order; the interfaces section (slot builds).
  const procedureRefs = (await all("procedures")).map((row) => `Procedure:${bareName(row.name)}`);
  for (let i = 0; i < procedureRefs.length; i += GET_BATCH_MAX) await fetchCards(procedureRefs.slice(i, i + GET_BATCH_MAX)).catch(() => null);
  const lineProofRefs = lineRows.map((row) => `Line:${lineName(String(row.line))}`);
  for (let i = 0; i < lineProofRefs.length; i += GET_BATCH_MAX) {
    await call("post", `${P}/get-batch`, { body: getBatchBody(lineProofRefs.slice(i, i + GET_BATCH_MAX), C, "proof") });
  }
  if (args.only === "ontology") {
    writeRecordings(false);
    process.exit(0);
  }
}

const [orient] = await orientAll(C);
const claimTypes = (await orientAll(C, "claim_types")).flatMap((page) => page.claim_types ?? []);
await orientAll(C, "subject_kinds");
// The kinds with their ClaimTypes, as the app joins them (useOntologyKinds).
const ontology = ontologyKinds(orient?.kinds ?? [], claimTypes);
const lines = (await orientAll(C, "lines")).flatMap((page) => page.lines ?? []);
await call("get", `${P}/kits`);
await call("post", `${P}/next`, {
  body: nextBody({ coordinate: C, evaluationTime: new Date().toISOString(), limit: NEXT_PAGE }),
});

// Kind details for every kind with Subjects (pair kinds and their ends
// included); for one sample Subject of each, every read the Subject page
// makes, and the neighborhood walk at depth 1 and 2.
const kinds = [...(orient?.kinds ?? [])].filter((k) => k.subjects > 0).sort((a, b) => b.subjects - a.subjects);
const samples: string[] = [];
for (const kind of kinds) {
  const detail = await call<OrientResult>("get", `${P}/orient`, {
    query: orientQuery({ coordinate: C, kind: kind.kind }),
  });
  for (const id of detail?.kind_detail?.sample_subject_ids?.slice(0, 1) ?? []) samples.push(`${kind.kind}/${id}`);
}
const incoming: IncomingReader = async (subject, cursor) => {
  const read = await call<GetResult>("post", `${P}/get`, {
    body: getBody({ ref: subject, coordinate: C, detail: "incoming", limit: INCOMING_PAGE, ...(cursor ? { cursor } : {}) }),
  });
  return { claims: read?.incoming?.claims ?? [], nextCursor: read?.next_cursor ?? null };
};

/** Every read the Subject page and the neighborhood (depth 1 and 2) make for one Subject. */
async function recordSubject(ref: string) {
  const [read] = await fetchCards([ref]).catch(() => [undefined]);
  const history = await call<GetResult>("post", `${P}/get`, { body: getBody({ ref, coordinate: C, detail: "history", limit: HISTORY_PAGE }) });
  // Each change set's author: its run's card, and the run's Line's latest revision.
  const events = history?.history?.kind === "subject" ? history.history.events : [];
  for (const source of new Set(changeSets(events).map((group) => changeSetRun(group)?.run).filter((run): run is string => !!run))) {
    const [run] = await fetchCards([`ProcedureRun:${source}`]).catch(() => [undefined]);
    const line = (run?.card as { triggered_by?: { line?: string } | null } | undefined)?.triggered_by?.line;
    if (line) await call("post", `${P}/get`, { body: getBody({ ref: line, coordinate: C, detail: "history", limit: 1 }) });
  }
  // The incoming list's first page, with the pointing Subjects' cards.
  const pointing = await incoming(ref, null);
  const pointers = [...new Set(pointing.claims.map((claim) => claim.subject))];
  for (let i = 0; i < pointers.length; i += GET_BATCH_MAX) await fetchCards(pointers.slice(i, i + GET_BATCH_MAX)).catch(() => null);
  const card = read?.card as { claims?: { claim: string | string[] }[] } | undefined;
  const ids = (card?.claims ?? []).flatMap((entry) => (Array.isArray(entry.claim) ? entry.claim : [entry.claim]));
  for (let i = 0; i < ids.length; i += GET_BATCH_MAX) await fetchCards(ids.slice(i, i + GET_BATCH_MAX)).catch(() => null);
  const full = ids.filter((id) => /^CLM-[0-9a-f]{32}$/.test(id));
  for (let i = 0; i < full.length; i += CLAIM_READ_BATCH_MAX) {
    await call("post", `${P}/claims/read-batch`, { body: claimReadBatchBody(full.slice(i, i + CLAIM_READ_BATCH_MAX), C) });
  }
  for (const id of ids.slice(0, 12)) {
    const evidence = await call<GetResult>("post", `${P}/get`, { body: getBody({ ref: id, coordinate: C, detail: "evidence" }) });
    await call("post", `${P}/get`, { body: getBody({ ref: id, coordinate: C, detail: "history", limit: HISTORY_PAGE }) });
    // Attestations listed: the Claim's why read (cited Captures), then on expand their cards, proofs and own words.
    if ((evidence?.evidence?.attestations ?? []).length > 0) {
      const why = await call<GetResult>("post", `${P}/get`, { body: getBody({ ref: id, coordinate: C, detail: "why" }) });
      for (const account of attestationAccounts(why?.why)) {
        const refs = account.cited.map((d) => `Capture:${d}`);
        if (refs.length === 0) continue;
        await fetchCards(refs).catch(() => null);
        await call("post", `${P}/get-batch`, { body: getBatchBody(refs, C, "proof") });
        for (const digest of account.cited) await call("post", `${P}/captures/read`, { body: captureReadBody(captureHandle(digest), C) });
      }
    }
  }
  // The Subject page's backlinks, and an end's first page of pairs (its "List every pair").
  await call("post", `${P}/get`, { body: getBody({ ref, coordinate: C, detail: "backlinks", limit: BACKLINKS_PAGE }) });
  if (((read?.card as { pairs?: unknown[] } | undefined)?.pairs ?? []).length > 0) {
    await call("post", `${P}/get`, { body: getBody({ ref, coordinate: C, detail: "pairs", limit: PAIRS_PAGE }) });
  }
  const walked = [];
  for (const depth of [1, 2]) {
    const graph = await walkNeighborhood(ref, depth, ontology, fetchCards, undefined, incoming).catch(() => null);
    if (graph) walked.push(graph);
  }
  return walked;
}

// Sample Subjects, then the most pointed-at Subject their walks reached (a
// hub shows the incoming column and a fuller neighborhood).
const seen = new Map<string, number>();
for (const ref of samples) {
  for (const graph of await recordSubject(ref)) {
    for (const node of graph.nodes) if (node.card) seen.set(node.ref, node.incomingCount ?? 0);
  }
}
const hub = [...seen.entries()].filter(([ref]) => !samples.includes(ref)).sort((a, b) => b[1] - a[1])[0];
if (hub) {
  console.log(`hub ${hub[0]} (${hub[1]} incoming)`);
  await recordSubject(hub[0]);
}

// ClaimType cards (the type map loads one on click), and the Documents that
// guide each (an expanded row's Guided by: its backlinks' first page).
for (const item of claimTypes.slice(0, 40)) {
  await call("post", `${P}/get`, { body: getBody({ ref: `ClaimType:${item.predicate}`, coordinate: C }) });
  await call("post", `${P}/get`, { body: getBody({ ref: `ClaimType:${item.predicate}`, coordinate: C, detail: "backlinks", limit: BACKLINKS_PAGE }) });
}

// Docs: the documents section, the cards, each body's first range and its
// proof (the Document's own links).
{
  const docs = (await orientAll(C, "documents")).flatMap((page) => page.documents ?? []);
  if (docs.length > 0) {
    await call("post", `${P}/get-batch`, { body: getBatchBody(docs.map((doc) => `Document:${doc.name}`), C) });
    for (const doc of docs) {
      await call("post", `${P}/get`, { body: documentBodyRange(doc.name, C, 0) });
      await call("post", `${P}/get`, { body: getBody({ ref: `Document:${doc.name}`, coordinate: C, detail: "proof" }) });
    }
  }
}

// Runbooks: the section (the Lines page), each card, its preview (head-only),
// and the Line runs its recent runs made.
const runbookRuns = new Set<string>();
for (const row of (await orientAll(C, "runbooks")).flatMap((page) => page.runbooks ?? [])) {
  const name = row.runbook.replace(/^Runbook:/, "");
  const [card] = await fetchCards([`Runbook:${name}`]).catch(() => [undefined]);
  await call("get", `${P}/runbooks/{name}/preview`, { pathParams: { name } });
  const recent = (card?.card as { recent_runs?: { steps: { run_id?: string | null }[] }[] } | undefined)?.recent_runs ?? [];
  for (const run of recent) for (const step of run.steps) if (step.run_id) runbookRuns.add(step.run_id);
}

// Ledger: the first two generation pages and the proposals their rows peek.
// Member counts per proposal pick a small accepted proposal to review below:
// a review loads every member (not paged), so a large one makes a huge fixture.
const membersByProposal = new Map<string, number>();
{
  let cursor: string | undefined;
  for (let page = 0; page < 2; page += 1) {
    const result = await call<OrientResult>("get", `${P}/orient`, {
      query: orientQuery({ coordinate: C, section: "generations", limit: LEDGER_PAGE, cursor }),
    });
    const rows = result?.generations ?? [];
    for (const row of rows) if (row.proposal) membersByProposal.set(row.proposal, row.members ?? 0);
    if (page === 0) {
      for (const row of rows.filter((r) => r.proposal).slice(0, 10)) await fetchCards([row.proposal!]).catch(() => null);
    }
    if (!result?.next_cursor) break;
    cursor = result.next_cursor;
  }
}

// Proposals: each status's first page, the cards of up to ten (the ledger's
// peek and the proposal page read them through get-batch), and one review per
// status (preferring an accepted proposal for settled).
for (const status of ["open", "incomplete", "settled"] as const) {
  const list = await call<{ entries: { proposal_id: string; terminal_reason?: string | null }[] }>(
    "get",
    `${P}/proposals`,
    { query: proposalsQuery(status, 50) },
  );
  const entries = list?.entries ?? [];
  for (const entry of entries.slice(0, 10)) await fetchCards([entry.proposal_id]).catch(() => null);
  const small = entries
    .filter((entry) => entry.terminal_reason === "accepted" && (membersByProposal.get(entry.proposal_id) ?? 0) > 0)
    .sort((a, b) => membersByProposal.get(a.proposal_id)! - membersByProposal.get(b.proposal_id)!);
  const first = small[0] ?? entries[0];
  if (first) {
    await call("post", `${P}/proposals/{proposal_id}/review`, {
      pathParams: { proposal_id: first.proposal_id },
      body: reviewBody(),
    });
  }
}

// Lines: the index's card batches (request order), then for every Line
// every read the Line page makes, and one run's card and state.
const lineRefs = lines.map((line) => `Line:${lineName(line.line)}`);
for (let i = 0; i < lineRefs.length; i += GET_BATCH_MAX) await fetchCards(lineRefs.slice(i, i + GET_BATCH_MAX)).catch(() => null);
const mandates = (await orientAll(C, "mandates")).flatMap((page) => page.mandates ?? []);
let runId: string | null = null;
for (const line of lines) {
  const name = lineName(line.line);
  const [card] = await fetchCards([`Line:${name}`]).catch(() => [undefined]);
  await call("post", `${P}/get`, {
    body: getBody({ ref: `Line:${name}`, coordinate: C, detail: "runs", limit: LINE_RUNS_PAGE }),
  });
  // The Line's definition panels: its envelope and its Triggers' cards.
  await call("post", `${P}/get`, { body: getBody({ ref: `Line:${name}`, coordinate: C, detail: "proof" }) });
  const triggerRefs = ((card?.card as { triggers?: { trigger: string }[] } | undefined)?.triggers ?? []).map((t) => t.trigger);
  if (triggerRefs.length) await fetchCards(triggerRefs).catch(() => null);
  const procedure = line.procedure.replace(/^Procedure:/, "");
  await fetchCards([`Procedure:${procedure}`]).catch(() => null);
  await call("post", `${P}/procedures/{name}/readings`, { pathParams: { name: procedure }, body: readingsBody(C, 50) });
  for (const mandate of mandates.filter((m) => lineName(m.line) === name)) {
    await recordMandate(mandate.mandate);
  }
  const inbox = await call<{ entries: { item: { item_id: string } }[] }>("get", `${P}/inbox`, {
    query: inboxQuery(name, undefined, 50),
  });
  const first = inbox?.entries[0]?.item.item_id;
  if (first) await call("get", `${P}/inbox/{item_id}`, { pathParams: { item_id: first } });
  const recent = (card?.card as { recent_runs?: { run: string }[] } | undefined)?.recent_runs ?? [];
  runId ??= recent[0]?.run.replace(/^ProcedureRun:/, "") ?? null;
}
for (const run of new Set([...(runId ? [runId] : []), ...runbookRuns])) {
  await fetchCards([`ProcedureRun:${run}`]).catch(() => null);
  await call("get", `${P}/procedure-runs/{run_id}`, { pathParams: { run_id: run } });
}
// Procedure pages (the reference card) and the Documents that guide each.
for (const row of (await orientAll(C, "procedures")).flatMap((page) => page.procedures ?? [])) {
  const ref = `Procedure:${String(row.name).replace(/^Procedure:/, "")}`;
  await call("post", `${P}/get`, { body: getBody({ ref, coordinate: C, detail: "backlinks", limit: BACKLINKS_PAGE }) });
}

/** Write the recordings: replace the set, or (`--only`) add to it. */
function writeRecordings(replace: boolean) {
  mkdirSync(args.out!, { recursive: true });
  if (replace) for (const file of readdirSync(args.out!)) if (file.endsWith(".ts")) rmSync(`${args.out}/${file}`);
  for (const [key, rec] of recordings) {
    // `--only` adds its group; the head it re-read is already in the set.
    if (!replace && rec.template === `${P}/head`) continue;
    const slug = rec.template.replace(`${P}/`, "").replace(/[{}]/g, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-+/, "");
    const define = rec.status === 200 ? "defineFixture" : "defineErrorFixture";
    const spec = {
      method: rec.method,
      path: rec.template,
      ...(Object.keys(rec.pathParams).length ? { pathParams: rec.pathParams } : {}),
      ...(rec.query !== undefined ? { query: rec.query } : {}),
      ...(rec.body !== undefined ? { body: rec.body } : {}),
      ...(rec.status !== 200 ? { status: rec.status } : {}),
      response: rec.response,
    };
    writeFileSync(
      `${args.out}/${slug}__${digest8(key)}.ts`,
      `// Recorded from cruxible-core ${pin.core_commit} by scripts/record-fixtures.ts; do not edit.\n` +
        `// ${key}\n` +
        `import { ${define} } from "../fixture";\n\n` +
        `export default ${define}(${JSON.stringify(spec, null, 2)});\n`,
    );
  }
  console.log(`wrote ${recordings.size - (replace ? 0 : 1)} fixtures to ${args.out}; run pnpm typecheck`);
}

writeRecordings(true);

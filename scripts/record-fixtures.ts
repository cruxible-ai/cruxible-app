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
  claimReadBatchBody,
  getBatchBody,
  getBody,
  GET_BATCH_MAX,
  HISTORY_PAGE,
  INCOMING_PAGE,
  LEDGER_PAGE,
  LINE_RUNS_PAGE,
  headQuery,
  inboxQuery,
  isReadRoute,
  NEXT_PAGE,
  nextBody,
  orientQuery,
  proposalsQuery,
  readingsBody,
  reviewBody,
} from "../src/api/requests.ts";
import type { AcceptedCoordinate, GetResult, OrientResult } from "../src/api/schemas.ts";
import { digest8, fixtureKey, normalizePath, normalizeQuery } from "../src/fixtures/key.ts";
import { walkNeighborhood, type CardFetcher, type IncomingReader } from "../src/lib/neighborhood.ts";
import { lineName, readMandateProof } from "../src/lib/lines.ts";

const { values: args } = parseArgs({
  options: {
    base: { type: "string", default: "http://127.0.0.1:5173" },
    instance: { type: "string" },
    out: { type: "string", default: "src/fixtures/recorded" },
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

async function orientAll(coordinate: AcceptedCoordinate, section?: "claim_types" | "subject_kinds" | "lines" | "mandates") {
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

const [orient] = await orientAll(C);
const claimTypes = (await orientAll(C, "claim_types")).flatMap((page) => page.claim_types ?? []);
await orientAll(C, "subject_kinds");
const lines = (await orientAll(C, "lines")).flatMap((page) => page.lines ?? []);
await call("get", `${P}/kits`);
await call("post", `${P}/next`, {
  body: nextBody({ coordinate: C, evaluationTime: new Date().toISOString(), limit: NEXT_PAGE }),
});

// Kind details for the three largest kinds; for two sample Subjects, every
// read the Subject page makes, and the neighborhood walk at depth 1 and 2.
const kinds = [...(orient?.kinds ?? [])].sort((a, b) => b.subjects - a.subjects).slice(0, 3);
const samples: string[] = [];
for (const kind of kinds) {
  const detail = await call<OrientResult>("get", `${P}/orient`, {
    query: orientQuery({ coordinate: C, kind: kind.kind }),
  });
  for (const id of detail?.kind_detail?.sample_subject_ids?.slice(0, 1) ?? []) samples.push(`${kind.kind}/${id}`);
}
const fetchCards: CardFetcher = async (refs) => {
  const batch = await call<{ results: GetResult[] }>("post", `${P}/get-batch`, { body: getBatchBody(refs, C) });
  if (!batch) throw new Error(`get-batch refused ${refs.join(", ")}`);
  return batch.results;
};
for (const ref of samples.slice(0, 3)) {
  const [read] = await fetchCards([ref]).catch(() => [undefined]);
  await call("post", `${P}/get`, { body: getBody({ ref, coordinate: C, detail: "history", limit: HISTORY_PAGE }) });
  const card = read?.card as { claims?: { claim: string | string[] }[] } | undefined;
  const ids = (card?.claims ?? []).flatMap((entry) => (Array.isArray(entry.claim) ? entry.claim : [entry.claim]));
  for (let i = 0; i < ids.length; i += GET_BATCH_MAX) await fetchCards(ids.slice(i, i + GET_BATCH_MAX)).catch(() => null);
  const full = ids.filter((id) => /^CLM-[0-9a-f]{32}$/.test(id));
  for (let i = 0; i < full.length; i += CLAIM_READ_BATCH_MAX) {
    await call("post", `${P}/claims/read-batch`, { body: claimReadBatchBody(full.slice(i, i + CLAIM_READ_BATCH_MAX), C) });
  }
  for (const id of ids.slice(0, 6)) {
    await call("post", `${P}/get`, { body: getBody({ ref: id, coordinate: C, detail: "evidence" }) });
    await call("post", `${P}/get`, { body: getBody({ ref: id, coordinate: C, detail: "history", limit: HISTORY_PAGE }) });
  }
  const incoming: IncomingReader = async (subject, cursor) => {
    const read = await call<GetResult>("post", `${P}/get`, {
      body: getBody({ ref: subject, coordinate: C, detail: "incoming", limit: INCOMING_PAGE, ...(cursor ? { cursor } : {}) }),
    });
    return { claims: read?.incoming?.claims ?? [], nextCursor: read?.next_cursor ?? null };
  };
  for (const depth of [1, 2]) {
    await walkNeighborhood(ref, depth, orient?.kinds ?? [], fetchCards, undefined, incoming).catch(() => null);
  }
}

// ClaimType cards (the type map loads one on click).
for (const item of claimTypes.slice(0, 30)) {
  await call("post", `${P}/get`, { body: getBody({ ref: `ClaimType:${item.predicate}`, coordinate: C }) });
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

// Lines: the index's card batches (request order), then for up to five Lines
// every read the Line page makes, and one run's card and state.
const lineRefs = lines.map((line) => `Line:${lineName(line.line)}`);
for (let i = 0; i < lineRefs.length; i += GET_BATCH_MAX) await fetchCards(lineRefs.slice(i, i + GET_BATCH_MAX)).catch(() => null);
const mandates = (await orientAll(C, "mandates")).flatMap((page) => page.mandates ?? []);
let runId: string | null = null;
for (const line of lines.slice(0, 5)) {
  const name = lineName(line.line);
  const [card] = await fetchCards([`Line:${name}`]).catch(() => [undefined]);
  await call("post", `${P}/get`, {
    body: getBody({ ref: `Line:${name}`, coordinate: C, detail: "runs", limit: LINE_RUNS_PAGE }),
  });
  const procedure = line.procedure.replace(/^Procedure:/, "");
  await fetchCards([`Procedure:${procedure}`]).catch(() => null);
  await call("post", `${P}/procedures/{name}/readings`, { pathParams: { name: procedure }, body: readingsBody(C, 50) });
  for (const mandate of mandates.filter((m) => m.procedure.replace(/^Procedure:/, "") === procedure)) {
    const name = mandate.mandate.replace(/^(Procedure)?Mandate:/, "");
    const proofRead = await call<GetResult>("post", `${P}/get`, {
      body: getBody({ ref: `Mandate:${name}`, coordinate: C, detail: "proof" }),
    });
    const query = readMandateProof(proofRead?.proof as Record<string, unknown> | undefined)?.condition?.query;
    if (query) await fetchCards([query]).catch(() => null);
  }
  const inbox = await call<{ entries: { item: { item_id: string } }[] }>("get", `${P}/inbox`, {
    query: inboxQuery(name, undefined, 50),
  });
  const first = inbox?.entries[0]?.item.item_id;
  if (first) await call("get", `${P}/inbox/{item_id}`, { pathParams: { item_id: first } });
  const recent = (card?.card as { recent_runs?: { run: string }[] } | undefined)?.recent_runs ?? [];
  runId ??= recent[0]?.run.replace(/^ProcedureRun:/, "") ?? null;
}
if (runId) {
  await fetchCards([`ProcedureRun:${runId}`]).catch(() => null);
  await call("get", `${P}/procedure-runs/{run_id}`, { pathParams: { run_id: runId } });
}

// Replace the recorded set.
mkdirSync(args.out, { recursive: true });
for (const file of readdirSync(args.out)) if (file.endsWith(".ts")) rmSync(`${args.out}/${file}`);
for (const [key, rec] of recordings) {
  const slug = rec.template.replace(`${P}/`, "").replace(/[{}]/g, "").replace(/[^a-z0-9]+/gi, "-");
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
console.log(`wrote ${recordings.size} fixtures to ${args.out}; run pnpm typecheck`);

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
  getBatchBody,
  getBody,
  GET_BATCH_MAX,
  headQuery,
  inboxQuery,
  isReadRoute,
  NEXT_PAGE,
  nextBody,
  orientQuery,
  proposalsQuery,
  reviewBody,
} from "../src/api/requests.ts";
import type { AcceptedCoordinate, GetResult, OrientResult } from "../src/api/schemas.ts";
import { digest8, fixtureKey, normalizePath, normalizeQuery } from "../src/fixtures/key.ts";

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
await orientAll(C, "mandates");
await call("get", `${P}/kits`);
await call("post", `${P}/next`, {
  body: nextBody({ coordinate: C, evaluationTime: new Date().toISOString(), limit: NEXT_PAGE }),
});

// Kind details for the three largest kinds; two of their sample Subjects with
// history, and one get-batch hop over their Subject-valued Claims.
const kinds = [...(orient?.kinds ?? [])].sort((a, b) => b.subjects - a.subjects).slice(0, 3);
const samples: string[] = [];
for (const kind of kinds) {
  const detail = await call<OrientResult>("get", `${P}/orient`, {
    query: orientQuery({ coordinate: C, kind: kind.kind }),
  });
  for (const id of detail?.kind_detail?.sample_subject_ids?.slice(0, 1) ?? []) samples.push(`${kind.kind}/${id}`);
}
const subjectTypes = new Map(claimTypes.map((item) => [item.predicate, item.type]));
const hop: string[] = [];
for (const ref of samples.slice(0, 2)) {
  const read = await call<GetResult>("post", `${P}/get`, { body: getBody({ ref, coordinate: C }) });
  await call("post", `${P}/get`, { body: getBody({ ref, coordinate: C, detail: "history" }) });
  const card = read?.card as { kind?: string; claims?: { predicate: string; value: unknown }[] } | undefined;
  for (const claim of card?.claims ?? []) {
    const full = `${card?.kind}.${claim.predicate}`;
    const type = subjectTypes.get(full) ?? subjectTypes.get(claim.predicate) ?? "";
    if (type.startsWith("subject") && typeof claim.value === "string") hop.push(claim.value);
  }
}
if (hop.length) await call("post", `${P}/get-batch`, { body: getBatchBody(hop.slice(0, GET_BATCH_MAX), C) });

// ClaimType cards (the type map loads one on click).
for (const item of claimTypes.slice(0, 30)) {
  await call("post", `${P}/get`, { body: getBody({ ref: `ClaimType:${item.predicate}`, coordinate: C }) });
}

// Proposals and one review per status.
for (const status of ["open", "settled"] as const) {
  const list = await call<{ entries: { proposal_id: string }[] }>("get", `${P}/proposals`, {
    query: proposalsQuery(status, 50),
  });
  const first = list?.entries[0];
  if (first) {
    await call("post", `${P}/proposals/{proposal_id}/review`, {
      pathParams: { proposal_id: first.proposal_id },
      body: reviewBody(),
    });
  }
}

// Lines: each card and inbox; one run's card and state.
let runId: string | null = null;
for (const line of lines.slice(0, 5)) {
  const card = await call<GetResult>("post", `${P}/get`, {
    body: getBody({ ref: `Line:${line.line}`, coordinate: C }),
  });
  await call("get", `${P}/inbox`, { query: inboxQuery(line.line, undefined, 50) });
  const recent = (card?.card as { recent_runs?: { run: string }[] } | undefined)?.recent_runs ?? [];
  runId ??= recent[0]?.run.replace(/^ProcedureRun:/, "") ?? null;
}
if (runId) {
  await call("post", `${P}/get`, { body: getBody({ ref: `ProcedureRun:${runId}`, coordinate: C }) });
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

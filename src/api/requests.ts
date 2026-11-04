/**
 * Request builders for every read the console makes, shared by the hooks
 * (src/api/hooks.ts) and the fixture recorder (scripts/record-fixtures.ts) so
 * a recorded fixture is keyed on exactly the request the app sends.
 *
 * Pure module: type-only imports, so Node can load it directly.
 */
import type { paths } from "./generated/schema";
import type { AcceptedCoordinate, GetDetail, InboxStatus, OrientSection, ProposalStatus } from "./schemas";

type Method = "get" | "post";
type Op<P extends keyof paths, M extends Method> = NonNullable<paths[P][M]>;

/** The query-string parameters an operation declares. */
export type QueryParams<P extends keyof paths, M extends Method> =
  Op<P, M> extends { parameters: { query?: infer Q } } ? NonNullable<Q> : never;

/** The JSON request body an operation declares. */
export type RequestBody<P extends keyof paths, M extends Method> =
  Op<P, M> extends { requestBody: { content: { "application/json": infer B } } }
    ? B
    : Op<P, M> extends { requestBody?: { content: { "application/json": infer B } } }
      ? B
      : never;

/** The 200 response an operation declares. */
export type OkResponse<P extends keyof paths, M extends Method> =
  Op<P, M> extends { responses: { 200: { content: { "application/json": infer R } } } }
    ? R
    : never;

/**
 * Every route the console may call. Everything here is READ_ONLY on the
 * daemon and writes nothing (design §6, §7, §10). Run-starting and writing
 * routes are absent on purpose: POST /lines/{line}/runs, POST
 * /procedures/{name}/runs, /measurements, /resolution-dispositions, and
 * /lines/{line}/evaluate (which mutates unless dry_run). POST /captures/read
 * writes nothing but needs GOVERNED_WRITE (bodies can be private): a Capture
 * page reads its contents through it, and says so when the token can't. POST
 * /get with detail="body" (a Document's body, by byte range) is gated the
 * same way, and the Docs page says so the same way.
 */
export const READ_ROUTES = [
  "GET /api/v1/{instance_id}/head",
  "GET /api/v1/{instance_id}/orient",
  "GET /api/v1/{instance_id}/kits",
  "GET /api/v1/{instance_id}/proposals",
  "GET /api/v1/{instance_id}/inbox",
  "GET /api/v1/{instance_id}/inbox/{item_id}",
  "GET /api/v1/{instance_id}/procedure-runs/{run_id}",
  "POST /api/v1/{instance_id}/get",
  "POST /api/v1/{instance_id}/get-batch",
  "POST /api/v1/{instance_id}/query",
  "POST /api/v1/{instance_id}/next",
  "POST /api/v1/{instance_id}/claims/read-batch",
  "POST /api/v1/{instance_id}/since",
  "POST /api/v1/{instance_id}/captures/read",
  "POST /api/v1/{instance_id}/proposals/{proposal_id}/review",
  "POST /api/v1/{instance_id}/procedures/{name}/readings",
] as const satisfies readonly `${"GET" | "POST"} ${keyof paths}`[];

const READ_ROUTE_SET: ReadonlySet<string> = new Set(READ_ROUTES);

export function isReadRoute(method: string, schemaPath: string): boolean {
  return READ_ROUTE_SET.has(`${method.toUpperCase()} ${schemaPath}`);
}

/** The four coordinate fields GET reads take as query parameters. */
function coordinateParams(coordinate: AcceptedCoordinate) {
  return {
    git_oid: coordinate.git_oid,
    semantic_root: coordinate.semantic_root,
    generation_root: coordinate.generation_root,
    compiler_digest: coordinate.compiler_digest,
  };
}

/** `?at=` resolution: a generation number (all digits) or a git oid prefix; null = head. */
export function headQuery(at: string | null): QueryParams<"/api/v1/{instance_id}/head", "get"> {
  return at === null ? {} : { at };
}

export interface OrientArgs {
  coordinate: AcceptedCoordinate;
  section?: OrientSection | undefined;
  kind?: string | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
}

export function orientQuery(args: OrientArgs): QueryParams<"/api/v1/{instance_id}/orient", "get"> {
  return {
    ...coordinateParams(args.coordinate),
    surface: "sdk",
    ...(args.section !== undefined ? { section: args.section } : {}),
    ...(args.kind !== undefined ? { kind: args.kind } : {}),
    ...(args.limit !== undefined ? { limit: args.limit } : {}),
    ...(args.cursor !== undefined ? { cursor: args.cursor } : {}),
  };
}

export interface GetArgs {
  ref: string;
  coordinate: AcceptedCoordinate;
  detail?: GetDetail | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  /** A byte range of a Document body (detail="body" only). */
  range?: { start: number; end: number } | undefined;
}

export function getBody(args: GetArgs): RequestBody<"/api/v1/{instance_id}/get", "post"> {
  return {
    ref: args.ref,
    detail: args.detail ?? "summary",
    at: args.coordinate,
    surface: "sdk",
    ...(args.limit !== undefined ? { limit: args.limit } : {}),
    ...(args.cursor !== undefined ? { cursor: args.cursor } : {}),
    ...(args.range !== undefined ? { range: args.range } : {}),
  };
}

/** The widest byte range one get(detail="body") returns (core's GET_BODY_RANGE_MAX_BYTES). */
export const DOCUMENT_RANGE_BYTES = 256 * 1024;

/** The most of a Document's body the Docs page reads (larger ones point to the CLI). */
export const DOCUMENT_READ_MAX_BYTES = 8 * 1024 * 1024;

/** One range of a Document's body, at the page coordinate. */
export function documentBodyRange(name: string, coordinate: AcceptedCoordinate, start: number) {
  return getBody({ ref: `Document:${name}`, coordinate, detail: "body", range: { start, end: start + DOCUMENT_RANGE_BYTES } });
}

/** Whole-graph page size (orient section=graph; the route's cap). */
export const GRAPH_PAGE = 500;

/** Accepted generations per ledger page. */
export const LEDGER_PAGE = 50;

/** Activity rows per page (orient section=activity; the Dashboard's feed). */
export const ACTIVITY_PAGE = 30;

/** The most of a Capture's body the page reads (larger ones point to the CLI). */
export const CAPTURE_READ_MAX_BYTES = 32 * 1024 * 1024;

export function captureReadBody(capture: string, coordinate: AcceptedCoordinate): RequestBody<"/api/v1/{instance_id}/captures/read", "post"> {
  return { capture_digest: capture, at: coordinate, max_bytes: CAPTURE_READ_MAX_BYTES };
}

/** Incoming links per page (get allows up to 200). */
export const INCOMING_PAGE = 50;

/** Line runs per page (get allows up to 200). */
export const LINE_RUNS_PAGE = 20;

/** History rows per page (get allows up to 200). */
export const HISTORY_PAGE = 20;

/** At most 64 refs per call (the route's cap); summary cards, no name suggestions. */
export const GET_BATCH_MAX = 64;

export function getBatchBody(
  refs: string[],
  coordinate: AcceptedCoordinate,
  detail: "summary" | "proof" = "summary",
): RequestBody<"/api/v1/{instance_id}/get-batch", "post"> {
  return { refs, detail, at: coordinate, surface: "sdk", subject_suggestions: false };
}

export type QueryArgs = Omit<RequestBody<"/api/v1/{instance_id}/query", "post">, "at" | "evaluation_time">;

/** Every live capture-landing Trigger with its contract and target (≤2000, the listing cap). */
export const LANDING_TRIGGERS_QUERY: QueryArgs = {
  kind: "Trigger",
  where: [{ field: "schedule", eq: "capture_landing" }],
  select: ["name", "schedule", "target", "capture_contract", "logical_sources"],
  limit: 500,
};

export function queryBody(
  args: QueryArgs,
  coordinate: AcceptedCoordinate,
): RequestBody<"/api/v1/{instance_id}/query", "post"> {
  return { ...args, at: coordinate };
}

/** Subjects per kind-table page (the kind page's Subjects table). */
export const KIND_PAGE = 100;
/** The most fields one query may select (the route's cap). */
export const SELECT_MAX = 64;

/**
 * The fields a kind's table selects: identity keys first (in key order), then
 * the rest by predicate; at most 64 (the route's cap) — `left` names the rest.
 */
export function selectFields(predicates: readonly string[], keys: readonly string[]): { select: string[]; left: string[] } {
  const known = new Set(predicates);
  const first = keys.filter((key) => known.has(key));
  const rest = [...predicates].filter((p) => !first.includes(p)).sort();
  const all = [...first, ...rest];
  return { select: all.slice(0, SELECT_MAX), left: all.slice(SELECT_MAX) };
}

/** The compact query one kind-table page sends. */
export function kindQuery(args: {
  kind: string;
  select: readonly string[];
  where?: QueryArgs["where"] | undefined;
  orderBy?: readonly string[] | undefined;
  cursor?: string | undefined;
}): QueryArgs {
  return {
    kind: args.kind,
    select: [...args.select],
    claims: true,
    limit: KIND_PAGE,
    ...(args.where && args.where.length > 0 ? { where: args.where } : {}),
    ...(args.orderBy && args.orderBy.length > 0 ? { order_by: [...args.orderBy] } : {}),
    ...(args.cursor !== undefined ? { cursor: args.cursor } : {}),
  };
}

/**
 * The console's coverage access profile for `next`: it may be told about
 * instance and public sources (sorted, as the contract requires).
 */
export const CONSOLE_ACCESS_PROFILE = {
  tag: "playbill-coverage-access-profile-v1",
  profile_id: "console",
  permitted_access_classes: ["instance", "public"],
} as const;

/** The `next` page size every screen reads, so its pages share one cache entry. */
export const NEXT_PAGE = 100;

export interface NextArgs {
  coordinate: AcceptedCoordinate;
  evaluationTime: string;
  limit?: number | undefined;
  cursor?: string | undefined;
}

export function nextBody(args: NextArgs): RequestBody<"/api/v1/{instance_id}/next", "post"> {
  return {
    at: args.coordinate,
    evaluation_time: args.evaluationTime,
    access_profile: { ...CONSOLE_ACCESS_PROFILE, permitted_access_classes: [...CONSOLE_ACCESS_PROFILE.permitted_access_classes] },
    caller_surface: "sdk",
    ...(args.limit !== undefined ? { limit: args.limit } : {}),
    ...(args.cursor !== undefined ? { cursor: args.cursor } : {}),
  };
}

/**
 * The most ChangeSet members one since read takes (the Overview's recent
 * changes): the newest generations whose members fit, from the generations
 * page in hand, so one read covers them whatever the instance's size.
 */
export const SINCE_ROWS = 300;
/** since's byte cap (the route's maximum): the row cap binds first. */
export const SINCE_MAX_BYTES = 1_048_576;

/** since takes the full coverage access profile (every field, sorted classes). */
export function sinceBody(
  lowerGeneration: number,
  coordinate: AcceptedCoordinate,
): RequestBody<"/api/v1/{instance_id}/since", "post"> {
  return {
    generation: lowerGeneration,
    at: coordinate,
    access_profile: {
      ...CONSOLE_ACCESS_PROFILE,
      permitted_access_classes: [...CONSOLE_ACCESS_PROFILE.permitted_access_classes],
      disclose_restricted_existence: true,
    },
    max_rows: SINCE_ROWS,
    max_bytes: SINCE_MAX_BYTES,
  };
}

export function proposalsQuery(
  status: ProposalStatus | undefined,
  limit: number,
  cursor?: string,
): QueryParams<"/api/v1/{instance_id}/proposals", "get"> {
  return {
    limit,
    ...(status !== undefined ? { status } : {}),
    ...(cursor !== undefined ? { cursor } : {}),
  };
}

export function reviewBody(
  itemReasonsAfter?: string,
): RequestBody<"/api/v1/{instance_id}/proposals/{proposal_id}/review", "post"> {
  // detail: the full review (members, attestations); without it the daemon answers the summary form.
  return itemReasonsAfter !== undefined ? { detail: true, item_reasons_after: itemReasonsAfter } : { detail: true };
}

export function inboxQuery(
  line: string | undefined,
  status: InboxStatus | undefined,
  limit: number,
  cursor?: string,
): QueryParams<"/api/v1/{instance_id}/inbox", "get"> {
  return {
    limit,
    ...(line !== undefined ? { line } : {}),
    ...(status !== undefined ? { status } : {}),
    ...(cursor !== undefined ? { cursor } : {}),
  };
}

export function readingsBody(
  coordinate: AcceptedCoordinate,
  limit: number,
  cursor?: string,
): RequestBody<"/api/v1/{instance_id}/procedures/{name}/readings", "post"> {
  return { at: coordinate, limit, ...(cursor !== undefined ? { cursor } : {}) };
}

/** Claim ids per claims/read-batch call (the route's cap). */
export const CLAIM_READ_BATCH_MAX = 256;

export function claimReadBatchBody(
  claimIds: string[],
  coordinate: AcceptedCoordinate,
): RequestBody<"/api/v1/{instance_id}/claims/read-batch", "post"> {
  return { claim_ids: claimIds, at: coordinate };
}

import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useApiClient } from "./DataSourceContext";
import { unwrap } from "./data-source";
import {
  claimReadBatchBody,
  getBatchBody,
  getBody,
  GET_BATCH_MAX,
  HISTORY_PAGE,
  GRAPH_PAGE,
  INCOMING_PAGE,
  LANDING_TRIGGERS_QUERY,
  LEDGER_PAGE,
  ACTIVITY_PAGE,
  captureReadBody,
  documentBodyRange,
  DOCUMENT_READ_MAX_BYTES,
  LINE_RUNS_PAGE,
  CLAIM_READ_BATCH_MAX,
  headQuery,
  inboxQuery,
  nextBody,
  orientQuery,
  proposalsQuery,
  queryBody,
  readingsBody,
  reviewBody,
  type QueryArgs,
} from "./requests";
import type {
  Schemas,
  AcceptedCoordinate,
  ClaimViewRecord,
  GetDetail,
  GetResult,
  Head,
  InboxStatus,
  OrientResult,
  OrientSection,
  ProposalStatus,
} from "./schemas";
import { cardOf } from "./schemas";
import { useAtParam } from "@/lib/at";
import { useSettings } from "@/lib/settings";
import { walkNeighborhood, type IncomingReader } from "@/lib/neighborhood";
import { ontologyKinds } from "@/lib/type-graph";
import {
  interfaceBase,
  logicalSources,
  readLineEnvelope,
  retentions,
  sourceSteps,
  type LandingTrigger,
  type ProcedureSpec,
} from "@/lib/definitions";
import { lineName } from "@/lib/lines";
import { decodeBase64 } from "@/lib/capture-body";

/**
 * Read hooks over the playbill daemon. Every state read is pinned to one
 * accepted coordinate: the page's `?at=` (or the head) is resolved once with
 * GET /head, and each read carries that full coordinate, so one page never
 * mixes generations and every cache entry is keyed on the generation it read.
 * Without `?at=` the head is polled; when it moves, the coordinate (and every
 * key) moves with it.
 */

/** Instance id from the /i/:instanceId route segment. */
export function useInstanceId(): string {
  const { instanceId } = useParams();
  if (!instanceId) throw new Error("Route is missing :instanceId");
  return instanceId;
}

const HEAD_POLL_MS = 30_000;
/** Pages fetched at most when following an orient section's cursor. */
const MAX_SECTION_PAGES = 20;
/** Largest orient page (the route's cap). */
export const ORIENT_PAGE = 500;

/** The accepted head, or the generation `at` names (immutable once resolved). */
export function useHead(at: string | null = null, enabled = true) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["head", instanceId, at],
    enabled,
    staleTime: at === null ? 15_000 : Infinity,
    refetchInterval: at === null ? HEAD_POLL_MS : false,
    queryFn: async (): Promise<Head> =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/head", {
          params: { path: { instance_id: instanceId }, query: headQuery(at) },
        }),
      ),
  });
}

/**
 * The head as first read, held: what an unpinned page reads when the viewer
 * turned "Follow the head" off. It never refetches on its own; the
 * generation box offers the newer head and refreshes it (`HELD_HEAD_KEY`).
 */
function useHeldHead(enabled: boolean) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: [...HELD_HEAD_KEY, instanceId],
    enabled,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryFn: async (): Promise<Head> =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/head", {
          params: { path: { instance_id: instanceId }, query: headQuery(null) },
        }),
      ),
  });
}

export const HELD_HEAD_KEY = ["head-held"] as const;

/**
 * The coordinate this page reads at: `?at=` when pinned; else the head, which
 * every screen follows as new generations are accepted (polled), unless the
 * viewer turned "Follow the head" off: then the head as first read, held.
 */
export function usePin() {
  const at = useAtParam();
  const { settings } = useSettings();
  const hold = at === null && !settings.followHead;
  const followed = useHead(at, !hold);
  const held = useHeldHead(hold);
  const head = hold ? held : followed;
  return { at, head, coordinate: head.data?.coordinate, generation: head.data?.generation };
}

/**
 * A query pinned to the page coordinate; waits for it and keys on its git
 * oid. When the pin itself is refused (an `at` naming no accepted
 * generation), the query fails with that refusal instead of waiting forever.
 */
function usePinnedQuery<T>(
  name: string,
  args: readonly unknown[],
  fetch: (coordinate: AcceptedCoordinate) => Promise<T>,
  enabled = true,
) {
  const instanceId = useInstanceId();
  const { at, coordinate, head } = usePin();
  const pinError = coordinate === undefined ? head.error : null;
  return useQuery({
    queryKey: [name, instanceId, coordinate?.git_oid ?? (pinError ? `refused:${at}` : null), ...args],
    enabled: enabled && (coordinate !== undefined || pinError !== null),
    staleTime: 60_000,
    ...(pinError ? { retry: false } : {}),
    queryFn: () => {
      if (coordinate === undefined) throw pinError;
      return fetch(coordinate);
    },
  });
}

function useOrientFetch() {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return async (
    coordinate: AcceptedCoordinate,
    extra: { section?: OrientSection; kind?: string; limit?: number; cursor?: string },
  ): Promise<OrientResult> =>
    unwrap(
      await client.GET("/api/v1/{instance_id}/orient", {
        params: {
          path: { instance_id: instanceId },
          query: orientQuery({ coordinate, ...extra }),
        },
      }),
    );
}

/**
 * One page of what happened, newest first (orient section=activity): accepted
 * generations, runs, Captures landing, occurrences coming due, inbox posts,
 * Line state changes. Operational state, read live at the latest head
 * whatever the page is pinned to (like the generation box's list).
 */
export function useActivity(cursor?: string) {
  const orient = useOrientFetch();
  const instanceId = useInstanceId();
  const coordinate = useHead(null).data?.coordinate;
  return useQuery({
    queryKey: ["activity", instanceId, coordinate?.git_oid ?? null, cursor ?? null],
    enabled: coordinate !== undefined,
    staleTime: 15_000,
    queryFn: () => orient(coordinate!, { section: "activity", limit: ACTIVITY_PAGE, ...(cursor !== undefined ? { cursor } : {}) }),
  });
}

/** The orient map's first page: kinds with counts, artifact counts, attention, floor, you. */
export function useOrient() {
  const orient = useOrientFetch();
  return usePinnedQuery("orient", [ORIENT_PAGE], (coordinate) =>
    orient(coordinate, { limit: ORIENT_PAGE }),
  );
}

/**
 * Every Subject kind: the orient first page plus its continuation pages
 * (continuations carry kinds only). Kits rarely exceed one 500-row page.
 */
export function useOrientKinds() {
  const first = useOrient();
  const orient = useOrientFetch();
  const cursor = first.data?.next_cursor ?? null;
  const rest = usePinnedQuery(
    "orient-kinds-rest",
    [cursor],
    async (coordinate) => {
      const kinds = [];
      let next: string | null = cursor;
      for (let page = 0; next !== null && page < MAX_SECTION_PAGES; page += 1) {
        const result = await orient(coordinate, { limit: ORIENT_PAGE, cursor: next });
        kinds.push(...(result.kinds ?? []));
        next = result.next_cursor ?? null;
      }
      return { kinds, truncated: next !== null };
    },
    cursor !== null,
  );
  const pending = first.isPending || (cursor !== null && rest.isPending);
  return {
    isPending: pending,
    error: first.error ?? rest.error,
    data:
      first.data && !pending
        ? {
            kinds: [...(first.data.kinds ?? []), ...(rest.data?.kinds ?? [])],
            truncated: rest.data?.truncated ?? false,
          }
        : undefined,
  };
}

/**
 * Every Subject kind with its ClaimTypes: the orient kinds (counts, identity)
 * joined with the claim_types section by each ClaimType's subject_kinds. The
 * default map names only a kind's first fields, so the type map, the Subject
 * page and the neighborhood read the ClaimTypes from the section.
 */
export function useOntologyKinds() {
  const kinds = useOrientKinds();
  const claimTypes = useClaimTypes();
  const data = useMemo(
    () =>
      kinds.data && claimTypes.data
        ? {
            kinds: ontologyKinds(kinds.data.kinds, claimTypes.data.rows),
            truncated: kinds.data.truncated || claimTypes.data.truncated,
          }
        : undefined,
    [kinds.data, claimTypes.data],
  );
  return {
    isPending: kinds.isPending || claimTypes.isPending,
    error: kinds.error ?? claimTypes.error,
    data,
  };
}

/** All rows of one paged orient section, following next_cursor. */
function useOrientSectionAll<
  K extends "claim_types" | "subject_kinds" | "lines" | "mandates" | "capture_contracts" | "pins" | "procedures" | "interfaces" | "documents",
>(
  section: K,
  enabled = true,
) {
  const orient = useOrientFetch();
  return usePinnedQuery(`orient-section-${section}`, [], async (coordinate) => {
    const rows: NonNullable<OrientResult[K]>[number][] = [];
    let cursor: string | undefined;
    for (let page = 0; page < MAX_SECTION_PAGES; page += 1) {
      const result = await orient(coordinate, {
        section,
        limit: ORIENT_PAGE,
        ...(cursor !== undefined ? { cursor } : {}),
      });
      rows.push(...((result[section] ?? []) as NonNullable<OrientResult[K]>));
      if (!result.next_cursor) return { rows, truncated: false };
      cursor = result.next_cursor;
    }
    return { rows, truncated: true };
  }, enabled);
}

/**
 * Each logical source's landings: how many, the latest (its Capture, when,
 * size, the Line or run that landed it, whether its body is still there) and
 * the contracts it lands under. Read live at the head (the section says so),
 * with the landings whose source couldn't be read counted apart.
 */
export function useSourceLandings(enabled = true) {
  const orient = useOrientFetch();
  return usePinnedQuery("orient-section-sources", [], async (coordinate) => {
    const rows: NonNullable<OrientResult["sources"]>[number][] = [];
    let unattributed = 0;
    let cursor: string | undefined;
    for (let page = 0; page < MAX_SECTION_PAGES; page += 1) {
      const result = await orient(coordinate, { section: "sources", limit: ORIENT_PAGE, ...(cursor !== undefined ? { cursor } : {}) });
      rows.push(...(result.sources ?? []));
      if (page === 0) unattributed = result.sources_unattributed ?? 0;
      if (!result.next_cursor) return { rows, unattributed, truncated: false };
      cursor = result.next_cursor;
    }
    return { rows, unattributed, truncated: true };
  }, enabled);
}

/** Every ClaimType with cardinality, value type, evidence and staleness rules. */
export function useClaimTypes(enabled = true) {
  return useOrientSectionAll("claim_types", enabled);
}

/** Every SubjectKind's identity rule. */
export function useSubjectKinds(enabled = true) {
  return useOrientSectionAll("subject_kinds", enabled);
}

/** Every Procedure (name, lifecycle, how it runs). */
export function useProcedures(enabled = true) {
  return useOrientSectionAll("procedures", enabled);
}

/** Every Document (name, title, kind, media type). */
export function useDocuments(enabled = true) {
  return useOrientSectionAll("documents", enabled);
}

/** Every ProviderInterface with its installed Provider builds. */
export function useInterfaces(enabled = true) {
  return useOrientSectionAll("interfaces", enabled);
}

/** Every Line (lifecycle, procedure, authority, trigger, enablement). */
export function useLines(enabled = true) {
  return useOrientSectionAll("lines", enabled);
}

/** Every Mandate (procedure, grants, state, expiry). */
export function useMandates(enabled = true) {
  return useOrientSectionAll("mandates", enabled);
}

/** Every CaptureContract with grade and how many ClaimTypes admit it (ontology-sized). */
export function useCaptureContracts(enabled = true) {
  return useOrientSectionAll("capture_contracts", enabled);
}

/**
 * The required pins of every live definition (orient section=pins): who pins
 * a contract, a ClaimType, a Procedure. Ontology-sized (never a Claim's or a
 * Subject's pins); the gate world has about 650 over two pages.
 */
export function usePins(enabled = true) {
  return useOrientSectionAll("pins", enabled);
}

/**
 * The capture-landing Triggers with the contract each fires on and its target
 * (query kind=Trigger; the schedule detail is read per landing Trigger only).
 */
export function useLandingTriggers() {
  return useStateQuery(LANDING_TRIGGERS_QUERY);
}

const cellText = (value: unknown) => (typeof value === "string" ? value : "");
const cellList = (value: unknown) => (Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []);

/**
 * Where evidence comes from (compiler revision 36): every Procedure's authored
 * form (one get-batch per 64 Procedures), every Line's envelope (get-batch
 * detail=proof: parameters, trigger input, bindings), and the capture-landing
 * Triggers with the logical sources they select, joined into retentions and
 * logical sources (lib/definitions). Ontology-sized: Procedures, Lines,
 * Triggers.
 */
export function useSourceModel(enabled = true) {
  const procedures = useProcedures(enabled);
  const interfaces = useInterfaces(enabled);
  const lines = useLines(enabled);
  const triggers = useStateQuery(enabled ? LANDING_TRIGGERS_QUERY : null);
  const procedureCards = useGetBatch((procedures.data?.rows ?? []).map((row) => `Procedure:${row.name.replace(/^Procedure:/, "")}`));
  const lineProofs = useGetBatch((lines.data?.rows ?? []).map((row) => `Line:${lineName(row.line)}`), "proof");
  const pending =
    procedures.isPending || lines.isPending || triggers.isPending || interfaces.isPending || procedureCards.isPending || lineProofs.isPending;
  const data = useMemo(() => {
    if (pending || !procedures.data || !lines.data || !triggers.data) return undefined;
    const specs = new Map<string, ProcedureSpec>();
    for (const result of procedureCards.results) {
      const card = cardOf(result, "procedure");
      if (card?.authored) specs.set(card.procedure.replace(/^Procedure:/, ""), card.authored);
    }
    const lineDefinitions = lineProofs.results.flatMap((result) => {
      const line = readLineEnvelope(result.proof);
      return line ? [line] : [];
    });
    const landing: LandingTrigger[] = triggers.data.rows.map((row) => ({
      name: cellText(row.name),
      contract: cellText(row.capture_contract).replace(/^CaptureContract:/, ""),
      target: cellText(row.target),
      logicalSources: cellList(row.logical_sources),
    }));
    const runnable = new Map(procedures.data.rows.map((row) => [row.name.replace(/^Procedure:/, ""), row.runnable] as const));
    const produced = new Map((interfaces.data?.rows ?? []).map((row) => [row.name, row.produces ?? []] as const));
    const all = retentions(
      [...specs].flatMap(([name, spec]) => sourceSteps(name, spec)),
      lineDefinitions,
      (iface) => produced.get(interfaceBase(iface)) ?? [],
      (procedure) => runnable.get(procedure) !== "line",
    );
    return {
      specs,
      lines: lineDefinitions,
      triggers: landing,
      retentions: all,
      sources: logicalSources(all, landing),
      truncated:
        procedures.data.truncated || lines.data.truncated || (triggers.data.capped?.length ?? 0) > 0 || triggers.data.truncated === true,
    };
  }, [pending, procedures.data, lines.data, triggers.data, interfaces.data, procedureCards.results, lineProofs.results]);
  return {
    isPending: pending,
    error: procedures.error ?? lines.error ?? triggers.error ?? interfaces.error ?? procedureCards.error ?? lineProofs.error,
    data,
  };
}

/** One kind's detail: incoming predicates and sample Subject ids. */
export function useOrientKind(kind: string | null) {
  const orient = useOrientFetch();
  return usePinnedQuery(
    "orient-kind",
    [kind],
    (coordinate) => orient(coordinate, { kind: kind! }),
    kind !== null,
  );
}

/** Installed kits (head-only: GET /kits takes no coordinate). */
export function useKits() {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["kits", instanceId],
    staleTime: 5 * 60_000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/kits", {
          params: { path: { instance_id: instanceId } },
        }),
      ),
  });
}

/** One reference read (any ref form get accepts) at the page coordinate. */
export function useGet(
  ref: string | null,
  detail: GetDetail = "summary",
  page: { limit?: number; cursor?: string } = {},
) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "get",
    [ref, detail, page.limit ?? null, page.cursor ?? null],
    async (coordinate): Promise<GetResult> =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/get", {
          params: { path: { instance_id: instanceId } },
          body: getBody({ ref: ref!, coordinate, detail, ...page }),
        }),
      ),
    ref !== null && ref !== "",
  );
}

/**
 * Summary cards for many refs, 64 per call, all at the page coordinate (the
 * route also pins every ref to the first result's coordinate). Results keep
 * the order of `refs`.
 */
export function useGetBatch(refs: string[], detail: "summary" | "proof" = "summary") {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const { coordinate } = usePin();
  const chunks: string[][] = [];
  for (let i = 0; i < refs.length; i += GET_BATCH_MAX) chunks.push(refs.slice(i, i + GET_BATCH_MAX));
  return useQueries({
    queries: chunks.map((chunk) => ({
      queryKey: ["get-batch", instanceId, coordinate?.git_oid ?? null, detail, chunk],
      enabled: coordinate !== undefined,
      staleTime: 60_000,
      queryFn: async () =>
        unwrap(
          await client.POST("/api/v1/{instance_id}/get-batch", {
            params: { path: { instance_id: instanceId } },
            body: getBatchBody(chunk, coordinate!, detail),
          }),
        ),
    })),
    combine: (results) => ({
      isPending: results.some((r) => r.isPending),
      error: results.find((r) => r.error)?.error ?? null,
      results: results.flatMap((r) => r.data?.results ?? []),
    }),
  });
}

/** One compact/spec/name query page at the page coordinate. */
export function useStateQuery(args: QueryArgs | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "query",
    [args],
    async (coordinate) =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/query", {
          params: { path: { instance_id: instanceId } },
          body: queryBody(args!, coordinate),
        }),
      ),
    args !== null,
  );
}

/**
 * One page of the `next` queue and its health status, at the page coordinate
 * and evaluated now. `next` has no server-side filter; screens group and
 * filter the page client-side.
 */
export function useNext(page: { limit?: number; cursor?: string } = {}) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery("next", [page.limit ?? null, page.cursor ?? null], async (coordinate) =>
    unwrap(
      await client.POST("/api/v1/{instance_id}/next", {
        params: { path: { instance_id: instanceId } },
        body: nextBody({ coordinate, evaluationTime: new Date().toISOString(), ...page }),
      }),
    ),
  );
}

/** Proposals by status (head-only: the list takes no coordinate). */
export function useProposals(status?: ProposalStatus, limit = 50, cursor?: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["proposals", instanceId, status ?? null, limit, cursor ?? null],
    staleTime: 15_000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/proposals", {
          params: {
            path: { instance_id: instanceId },
            query: proposalsQuery(status, limit, cursor),
          },
        }),
      ),
  });
}

/** One proposal's review (a READ_ONLY POST: members, governance, attestations). */
export function useReview(proposalId: string | null, itemReasonsAfter?: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["review", instanceId, proposalId, itemReasonsAfter ?? null],
    enabled: proposalId !== null,
    staleTime: 15_000,
    queryFn: async () =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/proposals/{proposal_id}/review", {
          params: { path: { instance_id: instanceId, proposal_id: proposalId! } },
          body: reviewBody(itemReasonsAfter),
        }),
      ),
  });
}

/** Line inbox entries (head-only). */
export function useInbox(line?: string, status?: InboxStatus, limit = 50, cursor?: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["inbox", instanceId, line ?? null, status ?? null, limit, cursor ?? null],
    staleTime: 15_000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/inbox", {
          params: {
            path: { instance_id: instanceId },
            query: inboxQuery(line, status, limit, cursor),
          },
        }),
      ),
  });
}

/** One Procedure run's state: Captures read, receipt (head-only). */
export function useRunState(runId: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["run-state", instanceId, runId],
    enabled: runId !== null,
    staleTime: 15_000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/procedure-runs/{run_id}", {
          params: { path: { instance_id: instanceId, run_id: runId! } },
        }),
      ),
  });
}

/** One page of a Procedure's measurement readings at the page coordinate. */
export function useReadings(procedure: string | null, limit = 50, cursor?: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "readings",
    [procedure, limit, cursor ?? null],
    async (coordinate) =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/procedures/{name}/readings", {
          params: { path: { instance_id: instanceId, name: procedure! } },
          body: readingsBody(coordinate, limit, cursor),
        }),
      ),
    procedure !== null,
  );
}

/**
 * One ref's summary card through get-batch with name suggestions off. A
 * missing Subject then refuses from the identity indexes alone: `/get` would
 * compute nearest names over every Subject of the instance first.
 */
export function useCard(ref: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "card",
    [ref],
    async (coordinate): Promise<GetResult> => {
      const batch = unwrap(
        await client.POST("/api/v1/{instance_id}/get-batch", {
          params: { path: { instance_id: instanceId } },
          body: getBatchBody([ref!], coordinate),
        }),
      );
      return batch.results[0]!;
    },
    ref !== null && ref !== "",
  );
}

/**
 * One Capture's retained body (captures/read) at the page coordinate, up to
 * CAPTURE_READ_MAX_BYTES. Bodies never change under a digest, so it is read
 * once; a token below governed_write is refused (the page says so).
 */
export function useCaptureRead(capture: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "capture-read",
    [capture],
    async (coordinate): Promise<Schemas["CaptureRead"]> =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/captures/read", {
          params: { path: { instance_id: instanceId } },
          body: captureReadBody(capture!, coordinate),
        }),
      ),
    capture !== null && capture !== "",
  );
}

/** A Document's whole body, or why the page won't read it all. */
export type DocumentBody =
  | { status: "read"; bytes: Uint8Array; mediaType: string; digest: string }
  | { status: "too_large"; size: number; mediaType: string; digest: string };

/**
 * One Document's body (get detail="body") at the page coordinate, read in
 * DOCUMENT_RANGE_BYTES ranges and joined, up to DOCUMENT_READ_MAX_BYTES; the
 * daemon verifies the bytes against the body digest. A token below
 * governed_write is refused (the page says so).
 */
export function useDocumentBody(name: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "document-body",
    [name],
    async (coordinate): Promise<DocumentBody> => {
      const parts: Uint8Array[] = [];
      let start = 0;
      for (;;) {
        const result = unwrap(
          await client.POST("/api/v1/{instance_id}/get", {
            params: { path: { instance_id: instanceId } },
            body: documentBodyRange(name!, coordinate, start),
          }),
        );
        const body = result.body;
        if (!body) throw new Error(`The daemon returned no body for Document:${name}`);
        if (body.size > DOCUMENT_READ_MAX_BYTES) {
          return { status: "too_large", size: body.size, mediaType: body.media_type, digest: body.body_digest };
        }
        // a range that decodes as UTF-8 comes back as text, any other as base64
        parts.push(body.text != null ? new TextEncoder().encode(body.text) : decodeBase64(body.content_base64 ?? ""));
        start = body.range?.end ?? 0;
        if (body.range == null || start >= body.size) {
          return { status: "read", bytes: joinBytes(parts), mediaType: body.media_type, digest: body.body_digest };
        }
      }
    },
    name !== null && name !== "",
  );
}

function joinBytes(parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

/**
 * Summary cards for several refs, one get-batch each: the same reads (and
 * cache entries) `useCard` makes per ref, gathered for a table that sorts or
 * filters on what the cards say. Results keep the order of `refs`.
 */
export function useCards(refs: readonly string[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const { coordinate } = usePin();
  return useQueries({
    queries: refs.map((ref) => ({
      queryKey: ["card", instanceId, coordinate?.git_oid ?? null, ref],
      enabled: coordinate !== undefined,
      staleTime: 60_000,
      queryFn: async (): Promise<GetResult> => {
        const batch = unwrap(
          await client.POST("/api/v1/{instance_id}/get-batch", {
            params: { path: { instance_id: instanceId } },
            body: getBatchBody([ref], coordinate!),
          }),
        );
        return batch.results[0]!;
      },
    })),
    combine: (results) => results.map((result) => result.data),
  });
}

/** A Subject's field history (stated/changed/reobserved/retired), one page. */
export function useSubjectHistory(ref: string | null, cursor?: string) {
  return useGet(ref, "history", { limit: HISTORY_PAGE, ...(cursor !== undefined ? { cursor } : {}) });
}

/** A Claim's evidence: captures, attestations, rationale (on expand only). */
export function useClaimEvidence(claimId: string | null) {
  return useGet(claimId, "evidence");
}

/** A Claim's revisions (on expand only). */
export function useClaimRevisions(claimId: string | null) {
  return useGet(claimId, "history", { limit: HISTORY_PAGE });
}

/** The Claim id a view record reads (its envelope identity, `Claim:CLM-…`). */
export function claimIdOfView(view: ClaimViewRecord): string | null {
  const identity = (view.envelope as { identity?: unknown }).identity;
  return typeof identity === "string" ? identity.replace(/^Claim:/, "") : null;
}

const FULL_CLAIM_ID = /^CLM-[0-9a-f]{32}$/;

/**
 * Capture admission accounts per Claim through claims/read-batch, 256 ids per
 * call. Only full Claim ids are sent: the route resolves a CLM- prefix by
 * listing every Claim of the instance.
 */
export function useAdmissionAccounts(claimIds: string[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const { coordinate } = usePin();
  const ids = [...new Set(claimIds.filter((id) => FULL_CLAIM_ID.test(id)))];
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += CLAIM_READ_BATCH_MAX) chunks.push(ids.slice(i, i + CLAIM_READ_BATCH_MAX));
  return useQueries({
    queries: chunks.map((chunk) => ({
      queryKey: ["admission", instanceId, coordinate?.git_oid ?? null, chunk],
      enabled: coordinate !== undefined,
      staleTime: 60_000,
      queryFn: async () =>
        unwrap(
          await client.POST("/api/v1/{instance_id}/claims/read-batch", {
            params: { path: { instance_id: instanceId } },
            body: claimReadBatchBody(chunk, coordinate!),
          }),
        ),
    })),
    combine: (results) => {
      const byClaim = new Map<string, ClaimViewRecord["admission_accounts"]>();
      results.forEach((result, i) => {
        result.data?.claims.forEach((view, j) => {
          const id = claimIdOfView(view) ?? chunks[i]![j];
          if (id) byClaim.set(id, view.admission_accounts);
        });
      });
      return {
        isPending: results.some((r) => r.isPending),
        error: results.find((r) => r.error)?.error ?? null,
        byClaim,
      };
    },
  });
}

/**
 * The outgoing neighborhood of one Subject, depth 1 or 2, capped at 150
 * nodes: ⌈frontier/64⌉ get-batch calls per hop at the page coordinate.
 */
export function useNeighborhood(root: string | null, depth: number) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const kinds = useOntologyKinds();
  return usePinnedQuery(
    "neighborhood",
    [root, depth],
    (coordinate) => {
      const incoming: IncomingReader = async (subject, cursor) => {
        const read = unwrap(
          await client.POST("/api/v1/{instance_id}/get", {
            params: { path: { instance_id: instanceId } },
            body: getBody({ ref: subject, coordinate, detail: "incoming", limit: INCOMING_PAGE, ...(cursor ? { cursor } : {}) }),
          }),
        );
        return { claims: read.incoming?.claims ?? [], nextCursor: read.next_cursor ?? null };
      };
      return walkNeighborhood(
        root!,
        depth,
        kinds.data!.kinds,
        async (refs) => {
          const batch = unwrap(
            await client.POST("/api/v1/{instance_id}/get-batch", {
              params: { path: { instance_id: instanceId } },
              body: getBatchBody(refs, coordinate),
            }),
          );
          return [...batch.results];
        },
        undefined,
        incoming,
      );
    },
    root !== null && kinds.data !== undefined,
  );
}

/** One page of the Subject-valued Claims pointing at a Subject (keyset-paged). */
export function useIncoming(ref: string | null, cursor?: string) {
  return useGet(ref, "incoming", { limit: INCOMING_PAGE, ...(cursor !== undefined ? { cursor } : {}) });
}

/** One page of a Line's runs, newest first (keyset-paged). */
export function useLineRuns(line: string | null, cursor?: string) {
  return useGet(line === null ? null : `Line:${line}`, "runs", {
    limit: LINE_RUNS_PAGE,
    ...(cursor !== undefined ? { cursor } : {}),
  });
}

/** One inbox item with its payload (head-only; O(1) by id). */
export function useInboxItem(itemId: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["inbox-item", instanceId, itemId],
    enabled: itemId !== null,
    staleTime: 60_000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/inbox/{item_id}", {
          params: { path: { instance_id: instanceId, item_id: itemId! } },
        }),
      ),
  });
}

/**
 * One page of the generation timeline, newest first from the page's pinned
 * generation (orient section=generations, O(page)).
 */
/**
 * The newest accepted generations as of the latest head, whatever the page is
 * pinned to (the generation box's list). The same read the Ledger makes at
 * the head, so the two share it.
 */
export function useRecentGenerations(enabled: boolean) {
  const orient = useOrientFetch();
  const instanceId = useInstanceId();
  const coordinate = useHead(null).data?.coordinate;
  return useQuery({
    queryKey: ["generations", instanceId, coordinate?.git_oid ?? null, null],
    enabled: enabled && coordinate !== undefined,
    staleTime: 60_000,
    queryFn: () => orient(coordinate!, { section: "generations", limit: LEDGER_PAGE }),
  });
}

export function useGenerations(cursor?: string) {
  const orient = useOrientFetch();
  return usePinnedQuery("generations", [cursor ?? null], (coordinate) =>
    orient(coordinate, { section: "generations", limit: LEDGER_PAGE, ...(cursor !== undefined ? { cursor } : {}) }),
  );
}

/** The whole-graph read's first page (carries totals.subjects); only when asked. */
export function useGraphFirstPage(enabled: boolean) {
  const orient = useOrientFetch();
  return usePinnedQuery(
    "graph-first",
    [],
    async (coordinate) => {
      const started = performance.now();
      const page = await orient(coordinate, { section: "graph", limit: GRAPH_PAGE });
      return { page, elapsedMs: performance.now() - started };
    },
    enabled,
  );
}

export interface WholeGraph {
  nodes: Schemas["OrientGraphNode"][];
  edges: Schemas["OrientGraphEdge"][];
  subjects: number;
  pages: number;
  /** Edges stopped at the edge cap before the read finished. */
  edgesCapped: boolean;
  elapsedMs: number;
}

export interface GraphProgress {
  pages: number;
  nodes: number;
  edges: number;
  subjects: number;
}

/**
 * Every live Subject and every Subject-valued Claim, paged 500 at a time from
 * the first page's cursor (which pins its coordinate): O(Subjects + edges)
 * reads of one maintained index each, nothing else. Starts only when the
 * first page is in and the Subject total is under the caller's cap.
 */
export function useWholeGraph(
  first: { page: OrientResult; elapsedMs: number } | undefined,
  enabled: boolean,
  edgeCap: number,
  onProgress: (progress: GraphProgress) => void,
) {
  const orient = useOrientFetch();
  return usePinnedQuery(
    "graph-all",
    [first?.page.next_cursor ?? null, edgeCap],
    async (coordinate): Promise<WholeGraph> => {
      // The load time counts the first page's read too.
      const started = performance.now() - first!.elapsedMs;
      const nodes = [...(first!.page.graph?.nodes ?? [])];
      const edges = [...(first!.page.graph?.edges ?? [])];
      const subjects = first!.page.graph?.totals.subjects ?? nodes.length;
      let cursor = first!.page.next_cursor ?? null;
      let pages = 1;
      let edgesCapped = false;
      onProgress({ pages, nodes: nodes.length, edges: edges.length, subjects });
      while (cursor) {
        if (edges.length >= edgeCap) {
          edgesCapped = true;
          break;
        }
        const page = await orient(coordinate, { section: "graph", limit: GRAPH_PAGE, cursor });
        nodes.push(...(page.graph?.nodes ?? []));
        edges.push(...(page.graph?.edges ?? []));
        pages += 1;
        cursor = page.next_cursor ?? null;
        onProgress({ pages, nodes: nodes.length, edges: edges.length, subjects });
      }
      return { nodes, edges, subjects, pages, edgesCapped, elapsedMs: performance.now() - started };
    },
    enabled && first !== undefined,
  );
}

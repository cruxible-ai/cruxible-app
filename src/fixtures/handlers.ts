import { http, HttpResponse } from "msw";
import { entityQueryResult, errorEnvelope } from "./envelopes";
import type {
  SourceArtifactListItem,
  SourceArtifactReadChunk,
  SourceArtifactReadResult,
} from "@/api/artifact-types";

/**
 * A coherent miniature instance served entirely through MSW, used by the dev
 * fixtures mode (VITE_CRUXIBLE_FIXTURES=1) and available to tests. Handlers
 * intercept at the network layer, so the app exercises the exact same
 * data-source boundary as against a live daemon — components can't tell the
 * difference, which is the point.
 */

export const FIXTURE_INSTANCE_ID = "inst_fixture";

const WORK_ITEMS = [
  {
    entity_type: "WorkItem",
    entity_id: "wi-fixture-1",
    properties: {
      work_item_id: "wi-fixture-1",
      title: "Fixture work item",
      status: "planned",
      priority: "high",
      type: "feature",
      summary: "A planned fixture work item used by dev fixtures mode.",
    },
    metadata: {},
  },
  {
    entity_type: "WorkItem",
    entity_id: "wi-fixture-2",
    properties: {
      work_item_id: "wi-fixture-2",
      title: "Blocked fixture work item",
      status: "blocked",
      priority: "critical",
      type: "bug",
      summary: "A blocked fixture work item.",
    },
    metadata: {},
  },
];

const ROADMAP_ITEM = {
  entity_type: "RoadmapItem",
  entity_id: "ri-fixture-1",
  properties: {
    roadmap_item_id: "ri-fixture-1",
    title: "Fixture roadmap item",
    status: "active",
    priority: "high",
    summary: "Roadmap item the fixture work items implement.",
  },
  metadata: {},
};

/**
 * Agent-briefing demo note: the body exercises every cruxible:// ref form the
 * UI hydrates (bare + labeled entity refs, a query ref, a receipt ref, and an
 * unresolved ref). Open /e/StateNote/note-briefing-1 in fixtures mode — this
 * is the launch screenshot.
 */
const BRIEFING_BODY = `## Review briefing: unblock the fixture queue

Two items need a decision this morning.

The blocker: [Blocked fixture work item](cruxible://entity/WorkItem/wi-fixture-2) is critical and gates the roadmap slice cruxible://entity/RoadmapItem/ri-fixture-1.

Full queue: [blocked work items](cruxible://query/blocked_work_items). The run that produced this briefing is receipted: cruxible://receipt/RCP-fixture0001.

A ref the state layer no longer knows: cruxible://entity/WorkItem/wi-gone-1 (rendered unresolved, never trusted silently).`;

const BRIEFING_NOTE = {
  entity_type: "StateNote",
  entity_id: "note-briefing-1",
  properties: {
    note_id: "note-briefing-1",
    title: "Morning review briefing",
    body: BRIEFING_BODY,
  },
  metadata: {},
};

const ALL_ENTITIES = [...WORK_ITEMS, ROADMAP_ITEM, BRIEFING_NOTE];

const SCHEMA = {
  name: "fixture",
  enums: {
    lifecycle_status: {
      values: ["planned", "active", "blocked", "deferred", "closed", "superseded"],
      ordered: null,
    },
    priority: { values: ["low", "medium", "high", "critical"], ordered: "low_to_high" },
  },
  entity_types: {
    WorkItem: {
      properties: {
        work_item_id: { type: "string", primary_key: true },
        title: { type: "string" },
        status: { type: "string", enum_ref: "lifecycle_status" },
        priority: { type: "string", enum_ref: "priority" },
      },
    },
    RoadmapItem: {
      properties: {
        roadmap_item_id: { type: "string", primary_key: true },
        title: { type: "string" },
        status: { type: "string", enum_ref: "lifecycle_status" },
      },
    },
    StateNote: {
      properties: {
        note_id: { type: "string", primary_key: true },
        title: { type: "string" },
        body: { type: "string" },
      },
    },
  },
};

/**
 * Source-artifact fixtures. Note the chunk manifest overlaps by construction
 * (matching the core markdown parser): "section" chunks span their whole
 * section while paragraph/list_item/code_fence chunks re-cover the same
 * lines — the viewer reconstructs a non-overlapping document from this.
 */
const RUNBOOK_DOC = [
  "# Deploy runbook",
  "",
  "Every production deploy goes through the pinned pipeline; manual pushes",
  "are prohibited outside a declared incident.",
  "",
  "## Rollback",
  "",
  "- Freeze the deploy queue before rolling back.",
  "- Roll back one release at a time; never skip versions.",
  "",
  "```bash",
  "cruxible deploy rollback --steps 1",
  "```",
].join("\n");

const RUNBOOK_CHUNKS: SourceArtifactReadChunk[] = [
  {
    chunk_id: "mdchunk_5f1e9a2c03b4d876",
    heading_path: ["Deploy runbook"],
    block_selector: "section",
    block_type: "section",
    line_start: 1,
    line_end: 13,
    content_hash: "sha256:runbook-s1",
    text: RUNBOOK_DOC,
  },
  {
    chunk_id: "mdchunk_9a8b7c6d5e4f3a21",
    heading_path: ["Deploy runbook"],
    block_selector: "paragraph:1",
    block_type: "paragraph",
    line_start: 3,
    line_end: 4,
    content_hash: "sha256:runbook-p1",
    text: "Every production deploy goes through the pinned pipeline; manual pushes\nare prohibited outside a declared incident.",
  },
  {
    chunk_id: "mdchunk_2b3c4d5e6f708192",
    heading_path: ["Deploy runbook", "Rollback"],
    block_selector: "section",
    block_type: "section",
    line_start: 6,
    line_end: 13,
    content_hash: "sha256:runbook-s2",
    text: RUNBOOK_DOC.split("\n").slice(5).join("\n"),
  },
  {
    chunk_id: "mdchunk_c1d2e3f405a6b789",
    heading_path: ["Deploy runbook", "Rollback"],
    block_selector: "list_item:1",
    block_type: "list_item",
    line_start: 8,
    line_end: 8,
    content_hash: "sha256:runbook-li1",
    text: "- Freeze the deploy queue before rolling back.",
  },
  {
    chunk_id: "mdchunk_d4e5f60718293a4b",
    heading_path: ["Deploy runbook", "Rollback"],
    block_selector: "list_item:2",
    block_type: "list_item",
    line_start: 9,
    line_end: 9,
    content_hash: "sha256:runbook-li2",
    text: "- Roll back one release at a time; never skip versions.",
  },
  {
    chunk_id: "mdchunk_e7f8091a2b3c4d5e",
    heading_path: ["Deploy runbook", "Rollback"],
    block_selector: "code_fence:1",
    block_type: "code_fence",
    line_start: 11,
    line_end: 13,
    content_hash: "sha256:runbook-cf1",
    text: "```bash\ncruxible deploy rollback --steps 1\n```",
  },
];

const OPINION_CHUNKS: SourceArtifactReadChunk[] = [
  {
    chunk_id: "mdchunk_0a1b2c3d4e5f6071",
    heading_path: ["Smith v. Jones", "Holding"],
    block_selector: "section",
    block_type: "section",
    line_start: 3,
    line_end: 6,
    content_hash: "sha256:opinion-s1",
    text: "## Holding\n\nWe hold that digest-pinned records satisfy the authenticity\nrequirement of Rule 901(b)(9).",
  },
  {
    chunk_id: "mdchunk_1c2d3e4f50617283",
    heading_path: ["Smith v. Jones", "Holding"],
    block_selector: "paragraph:1",
    block_type: "paragraph",
    line_start: 5,
    line_end: 6,
    content_hash: "sha256:opinion-p1",
    text: "We hold that digest-pinned records satisfy the authenticity\nrequirement of Rule 901(b)(9).",
  },
];

const SOURCE_ARTIFACT_ITEMS: SourceArtifactListItem[] = [
  {
    source_artifact_id: "SRC-fixture00001",
    kind: "markdown",
    retention: "archive",
    original_uri: "https://wiki.example.com/ops/deploy-runbook",
    label: "Deploy runbook (ops wiki)",
    content_hash: "sha256:fixture",
    registered_at: "2026-06-12T00:00:00Z",
    chunk_count: RUNBOOK_CHUNKS.length,
    byte_count: RUNBOOK_DOC.length,
  },
  {
    source_artifact_id: "SRC-fixture00002",
    kind: "markdown",
    retention: "manifest_only",
    original_uri: "file:///Users/ops/notes/incident-2026-06.md",
    label: "Incident 2026-06 postmortem",
    content_hash: "sha256:postmortem",
    registered_at: "2026-06-20T14:30:00Z",
    chunk_count: 3,
    byte_count: 2210,
  },
  {
    source_artifact_id: "SRC-fixture00003",
    kind: "markdown",
    retention: "archive",
    original_uri: "https://law.example.com/opinions/smith-v-jones.md",
    label: "Smith v. Jones, No. 24-1837 (9th Cir. 2026)",
    content_hash: "sha256:opinion",
    registered_at: "2026-06-28T09:15:00Z",
    chunk_count: OPINION_CHUNKS.length,
    byte_count: 148,
  },
];

const SOURCE_ARTIFACT_READS: Record<string, SourceArtifactReadResult> = {
  "SRC-fixture00001": {
    ...SOURCE_ARTIFACT_ITEMS[0]!,
    parser_version: "markdown_chunks_v1",
    archived: true,
    archive_content_hash: "sha256:fixture",
    content_available: true,
    body_origin: "archive",
    current_artifact_hash: "sha256:fixture",
    chunks: RUNBOOK_CHUNKS,
  },
  "SRC-fixture00002": {
    ...SOURCE_ARTIFACT_ITEMS[1]!,
    parser_version: "markdown_chunks_v1",
    archived: false,
    content_available: false,
    content_unavailable_reason:
      "manifest_only artifact: original file no longer present at /Users/ops/notes/incident-2026-06.md",
    chunks: [
      {
        chunk_id: "mdchunk_aa11bb22cc33dd44",
        heading_path: ["Incident 2026-06"],
        block_selector: "section",
        block_type: "section",
        line_start: 1,
        line_end: 40,
        content_hash: "sha256:postmortem-s1",
      },
      {
        chunk_id: "mdchunk_ee55ff6607718829",
        heading_path: ["Incident 2026-06", "Timeline"],
        block_selector: "section",
        block_type: "section",
        line_start: 5,
        line_end: 22,
        content_hash: "sha256:postmortem-s2",
      },
      {
        chunk_id: "mdchunk_93a4b5c6d7e8f901",
        heading_path: ["Incident 2026-06", "Timeline"],
        block_selector: "paragraph:1",
        block_type: "paragraph",
        line_start: 7,
        line_end: 9,
        content_hash: "sha256:postmortem-p1",
      },
    ],
  },
  "SRC-fixture00003": {
    ...SOURCE_ARTIFACT_ITEMS[2]!,
    parser_version: "markdown_chunks_v1",
    archived: true,
    archive_content_hash: "sha256:opinion",
    content_available: true,
    body_origin: "archive",
    current_artifact_hash: "sha256:opinion",
    chunks: OPINION_CHUNKS,
  },
};

const CATALOG = {
  total: 2,
  limit: 100,
  offset: 0,
  truncated: false,
  items: [
    {
      name: "blocked_work_items",
      mode: "collection",
      entry_point: null,
      required_params: [],
      returns: "WorkItem",
      result_shape: "entity",
      dedupe: "entity",
      relationship_state: "live",
      description: "Fixture queue of blocked work items.",
      example_ids: [],
    },
    {
      name: "work_item_change_context",
      mode: "context",
      entry_point: "WorkItem",
      required_params: ["work_item_id"],
      returns: "RoadmapItem",
      result_shape: "path",
      dedupe: "path",
      relationship_state: "reviewable",
      description: "Fixture context query from a work item.",
      example_ids: ["wi-fixture-1"],
    },
  ],
};

export function buildHandlers(baseUrl = "") {
  const api = (p: string) => `${baseUrl}/api/v1/:instanceId${p}`;
  return [
    http.get(api("/queries"), () => HttpResponse.json(CATALOG)),
    http.get(api("/stats"), () =>
      HttpResponse.json({
        entity_count: ALL_ENTITIES.length,
        edge_count: 2,
        entity_counts: { WorkItem: WORK_ITEMS.length, RoadmapItem: 1, StateNote: 1 },
        relationship_counts: { work_item_implements_roadmap_item: 2 },
        head_snapshot_id: "snap_fixture",
      }),
    ),
    http.get(api("/schema"), () => HttpResponse.json(SCHEMA)),
    // A kit-composed fixture tracks no upstream release; null is the answer
    // the daemon actually gives there, not a stub for a missing route.
    http.get(api("/state/status"), () => HttpResponse.json({ upstream: null })),
    http.get(api("/views/:queryName"), ({ params }) => {
      if (params.queryName === "blocked_work_items") {
        const items = WORK_ITEMS.filter((w) => w.properties.status === "blocked");
        return HttpResponse.json(entityQueryResult({ items, total: items.length }));
      }
      if (params.queryName === "work_item_change_context") {
        return HttpResponse.json(
          entityQueryResult({
            result_shape: "path",
            items: [
              {
                entry: WORK_ITEMS[0]!,
                result: ROADMAP_ITEM,
                entities: [WORK_ITEMS[0]!, ROADMAP_ITEM],
                path: [
                  {
                    relationship_type: "work_item_implements_roadmap_item",
                    from_type: "WorkItem",
                    from_id: "wi-fixture-1",
                    to_type: "RoadmapItem",
                    to_id: "ri-fixture-1",
                    edge_key: 1,
                  },
                ],
              },
            ],
            total: 1,
          }),
        );
      }
      return HttpResponse.json(
        errorEnvelope("QueryNotFoundError", `Named query '${String(params.queryName)}' not found`),
        { status: 404 },
      );
    }),
    http.get(api("/list/:resourceType"), ({ request }) => {
      const url = new URL(request.url);
      const entityType = url.searchParams.get("entity_type");
      const filterRaw = url.searchParams.get("property_filter");
      const filter = filterRaw ? (JSON.parse(filterRaw) as Record<string, string>) : null;
      let items = ALL_ENTITIES.filter((e) => !entityType || e.entity_type === entityType);
      if (filter) {
        items = items.filter((e) =>
          Object.entries(filter).every(
            ([k, v]) => (e.properties as Record<string, unknown>)[k] === v,
          ),
        );
      }
      const limit = Number(url.searchParams.get("limit") ?? 50);
      return HttpResponse.json({
        total: items.length,
        limit,
        offset: 0,
        truncated: false,
        items: items.slice(0, limit),
      });
    }),
    http.get(api("/inspect/entity/:entityType/:entityId"), ({ params }) => {
      const found = ALL_ENTITIES.find(
        (e) => e.entity_type === params.entityType && e.entity_id === params.entityId,
      );
      if (!found) {
        return HttpResponse.json({
          found: false,
          entity_type: params.entityType,
          entity_id: params.entityId,
          properties: {},
          metadata: {},
          neighbors: [],
          total_neighbors: 0,
        });
      }
      const neighbors =
        found.entity_type === "WorkItem"
          ? [
              {
                direction: "outgoing",
                relationship_type: "work_item_implements_roadmap_item",
                edge_key: 1,
                properties: {},
                metadata: {
                  provenance: {
                    source: "fixture",
                    source_ref: "fixture_seed",
                    created_at: "2026-06-12T00:00:00Z",
                  },
                  assertion: { review: { status: "unreviewed", source: "system" } },
                  evidence: {
                    evidence_refs: [
                      {
                        source: "source_artifact",
                        artifact_id: "SRC-fixture00001",
                        source_record_id: "mdchunk_9a8b7c6d5e4f3a21",
                        metadata: { line_start: 3, line_end: 4 },
                      },
                    ],
                    rationale: "Fixture rationale for the edge.",
                    source_receipt_ids: [],
                  },
                },
                entity: ROADMAP_ITEM,
              },
            ]
          : [];
      return HttpResponse.json({ ...found, found: true, neighbors, total_neighbors: neighbors.length });
    }),
    http.get(api("/source-artifacts"), ({ request }) => {
      const url = new URL(request.url);
      const limitRaw = url.searchParams.get("limit");
      const limit = limitRaw === null ? null : Number(limitRaw);
      const offset = Number(url.searchParams.get("offset") ?? 0);
      const items = SOURCE_ARTIFACT_ITEMS.slice(
        offset,
        limit === null ? undefined : offset + limit,
      );
      return HttpResponse.json({
        total: SOURCE_ARTIFACT_ITEMS.length,
        limit,
        offset,
        truncated: offset + items.length < SOURCE_ARTIFACT_ITEMS.length,
        items,
      });
    }),
    http.get(api("/source-artifacts/:artifactId"), ({ params }) => {
      const read = SOURCE_ARTIFACT_READS[String(params.artifactId)];
      if (!read) {
        return HttpResponse.json(
          errorEnvelope("NotFoundError", `Unknown source artifact ${String(params.artifactId)}`),
          { status: 404 },
        );
      }
      return HttpResponse.json(read);
    }),
    http.post(api("/source-evidence/dereference"), async ({ request }) => {
      const body = (await request.json()) as { source_artifact_id: string; chunk_id?: string };
      if (body.source_artifact_id !== "SRC-fixture00001") {
        return HttpResponse.json(
          errorEnvelope("NotFoundError", `Unknown artifact ${body.source_artifact_id}`),
          { status: 404 },
        );
      }
      return HttpResponse.json({
        status: "available",
        source_artifact_id: body.source_artifact_id,
        chunk_id: body.chunk_id ?? "mdchunk_fixture1",
        content_hash: "sha256:fixture",
        expected_artifact_hash: "sha256:fixture",
        current_artifact_hash: "sha256:fixture",
        body_origin: "local_path",
        body: "Fixture source text:\nthe evidence behind the fixture edge.",
        reason: null,
        chunk: null,
      });
    }),
    http.get(api("/receipts/:receiptId"), ({ params }) =>
      HttpResponse.json({
        receipt_id: params.receiptId,
        query_name: "blocked_work_items",
        parameters: {},
        operation_type: "query",
        head_snapshot_id: "snap_fixture",
        created_at: "2026-06-12T00:00:00Z",
        duration_ms: 0.1,
        committed: false,
        nodes: [
          { node_id: "n1", node_type: "query", detail: {}, timestamp: "2026-06-12T00:00:00Z" },
          { node_id: "n2", node_type: "result", detail: { count: 1 }, timestamp: "2026-06-12T00:00:00Z" },
        ],
        edges: [{ from_node: "n1", to_node: "n2", edge_type: "produced" }],
        results: [],
      }),
    ),
  ];
}

import { http, HttpResponse } from "msw";
import { entityQueryResult, errorEnvelope } from "./envelopes";

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

const ALL_ENTITIES = [...WORK_ITEMS, ROADMAP_ITEM];

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
        entity_counts: { WorkItem: WORK_ITEMS.length, RoadmapItem: 1 },
        relationship_counts: { work_item_implements_roadmap_item: 2 },
        head_snapshot_id: "snap_fixture",
      }),
    ),
    http.get(api("/schema"), () => HttpResponse.json(SCHEMA)),
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
                        metadata: { line_start: 1, line_end: 2 },
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

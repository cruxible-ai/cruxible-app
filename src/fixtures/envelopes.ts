import type { QueryToolResult } from "@/api/data-source";

/**
 * Envelope fixtures mirroring live daemon responses (shape captured from
 * cruxible-core d2d9f8e). Only tests and MSW handlers import this module.
 */
export function entityQueryResult(overrides: Partial<QueryToolResult> = {}): QueryToolResult {
  return {
    items: [
      {
        entity_type: "WorkItem",
        entity_id: "wi-fixture-1",
        properties: {
          title: "Fixture work item",
          status: "planned",
          priority: "high",
          work_item_id: "wi-fixture-1",
        },
        metadata: {},
      },
    ],
    receipt_id: "RCP-fixture0001",
    receipt: { head_snapshot_id: "snap_fixture", duration_ms: 0.2 },
    total: 1,
    limit: 100,
    offset: 0,
    truncated: false,
    limit_truncated: false,
    path_truncated: false,
    truncation_reasons: [],
    steps_executed: 1,
    result_shape: "entity",
    dedupe: "entity",
    relationship_state: "live",
    policy_summary: {},
    ...overrides,
  };
}

export function errorEnvelope(errorType: string, message: string) {
  return {
    error_type: errorType,
    message,
    errors: [],
    context: {},
    mutation_receipt_id: null,
  };
}

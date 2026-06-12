import { describe, expect, it } from "vitest";
import { server } from "@/test/msw-server";
import { createApiClient, unwrap } from "@/api/data-source";
import { buildHandlers, FIXTURE_INSTANCE_ID } from "./handlers";

const BASE = "https://fixtures.example";

/** The dev fixtures mode must serve the same surfaces the app consumes. */
describe("fixture handler set", () => {
  it("serves a coherent instance through the data-source boundary", async () => {
    server.use(...buildHandlers(BASE));
    const client = createApiClient({ baseUrl: BASE });
    const path = { instance_id: FIXTURE_INSTANCE_ID };

    const stats = unwrap(
      await client.GET("/api/v1/{instance_id}/stats", { params: { path } }),
    ) as { entity_count: number };
    expect(stats.entity_count).toBe(3);

    const queue = unwrap(
      await client.GET("/api/v1/{instance_id}/views/{query_name}", {
        params: { path: { ...path, query_name: "blocked_work_items" } },
      }),
    );
    expect(queue.total).toBe(1);
    expect(queue.items[0]).toMatchObject({ entity_id: "wi-fixture-2" });

    const filtered = unwrap(
      await client.GET("/api/v1/{instance_id}/list/{resource_type}", {
        params: {
          path: { ...path, resource_type: "entities" },
          query: {
            entity_type: "WorkItem",
            limit: 1,
            property_filter: JSON.stringify({ status: "planned" }),
          },
        },
      }),
    ) as { total: number };
    expect(filtered.total).toBe(1);

    const inspect = unwrap(
      await client.GET("/api/v1/{instance_id}/inspect/entity/{entity_type}/{entity_id}", {
        params: { path: { ...path, entity_type: "WorkItem", entity_id: "wi-fixture-1" } },
      }),
    ) as { found: boolean; neighbors: unknown[] };
    expect(inspect.found).toBe(true);
    expect(inspect.neighbors).toHaveLength(1);
  });
});

import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw-server";
import { entityQueryResult, errorEnvelope } from "@/test/fixtures";
import { ApiError, createApiClient, unwrap } from "./data-source";

const BASE = "https://cloud.example";

describe("data-source boundary", () => {
  it("sends the configured bearer token against the configured base URL", async () => {
    let seenAuth: string | null = null;
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/views/:queryName`, ({ request }) => {
        seenAuth = request.headers.get("authorization");
        return HttpResponse.json(entityQueryResult());
      }),
    );

    const client = createApiClient({ baseUrl: BASE, token: "tok-123" });
    const result = unwrap(
      await client.GET("/api/v1/{instance_id}/views/{query_name}", {
        params: { path: { instance_id: "inst_x", query_name: "review_queue" } },
      }),
    );

    expect(seenAuth).toBe("Bearer tok-123");
    expect(result.total).toBe(1);
    expect(result.receipt_id).toBe("RCP-fixture0001");
  });

  it("omits the Authorization header when no token is configured", async () => {
    let seenAuth: string | null = "unset";
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/stats`, ({ request }) => {
        seenAuth = request.headers.get("authorization");
        return HttpResponse.json({ entity_count: 0, edge_count: 0 });
      }),
    );

    const client = createApiClient({ baseUrl: BASE });
    await client.GET("/api/v1/{instance_id}/stats", {
      params: { path: { instance_id: "inst_x" } },
    });

    expect(seenAuth).toBeNull();
  });

  it("surfaces the daemon error envelope as ApiError", async () => {
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/views/:queryName`, () =>
        HttpResponse.json(errorEnvelope("QueryNotFoundError", "Named query 'nope' not found"), {
          status: 404,
        }),
      ),
    );

    const client = createApiClient({ baseUrl: BASE, token: "tok-123" });
    const call = async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/views/{query_name}", {
          params: { path: { instance_id: "inst_x", query_name: "nope" } },
        }),
      );

    const err = await call().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).errorType).toBe("QueryNotFoundError");
    expect((err as ApiError).status).toBe(404);
  });
});

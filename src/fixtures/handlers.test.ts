import { describe, expect, it } from "vitest";
import { server } from "@/test/msw-server";
import { ApiError, createApiClient, unwrap } from "@/api/data-source";
import { getBatchBody, headQuery, NEXT_PAGE, nextBody, orientQuery } from "@/api/requests";
import { AUTHORED, buildHandlers, FIXTURE_INSTANCE_ID, RECORDED } from "./handlers";

const BASE = "https://fixtures.example";
const path = { instance_id: FIXTURE_INSTANCE_ID };

/** Fixtures mode must answer the app's own requests, keyed exactly. */
describe("recorded fixture handlers", () => {
  it("serves the head and the reads pinned to its coordinate", async () => {
    server.use(...buildHandlers(BASE, AUTHORED));
    const client = createApiClient({ baseUrl: BASE });

    const head = unwrap(
      await client.GET("/api/v1/{instance_id}/head", { params: { path, query: headQuery(null) } }),
    );
    const orient = unwrap(
      await client.GET("/api/v1/{instance_id}/orient", {
        params: { path, query: orientQuery({ coordinate: head.coordinate, limit: 500 }) },
      }),
    );
    expect(orient.generation).toBe(head.generation);
    expect(orient.kinds?.map((k) => k.kind)).toContain("security.vulnerability");

    // evaluation_time is volatile and excluded from the key.
    const next = unwrap(
      await client.POST("/api/v1/{instance_id}/next", {
        params: { path },
        body: nextBody({
          coordinate: head.coordinate,
          evaluationTime: new Date().toISOString(),
          limit: NEXT_PAGE,
        }),
      }),
    );
    expect(next.total_items).toBe(next.items.length);
  });

  it("serves recorded refusals with their status and envelope", async () => {
    server.use(...buildHandlers(BASE, AUTHORED));
    const client = createApiClient({ baseUrl: BASE });
    const head = unwrap(await client.GET("/api/v1/{instance_id}/head", { params: { path } }));
    const err = await client
      .POST("/api/v1/{instance_id}/get-batch", {
        params: { path },
        body: getBatchBody(["security.vulnerability/cve-1999-0001"], head.coordinate),
      })
      .then(unwrap)
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).errorCode).toBe("cruxible.get.ref_not_found");
  });

  it("answers an unrecorded request with a 404 envelope, never a near match", async () => {
    server.use(...buildHandlers(BASE, AUTHORED));
    const client = createApiClient({ baseUrl: BASE });
    const head = unwrap(await client.GET("/api/v1/{instance_id}/head", { params: { path } }));
    const err = await client
      .GET("/api/v1/{instance_id}/orient", {
        params: { path, query: orientQuery({ coordinate: head.coordinate, limit: 499 }) },
      })
      .then(unwrap)
      .catch((e: unknown) => e);
    expect((err as ApiError).status).toBe(404);
    expect((err as ApiError).errorType).toBe("FixtureNotRecorded");
  });

  it("keys every fixture of each world uniquely", () => {
    for (const world of [AUTHORED, RECORDED]) {
      const keys = world.map((fixture) => fixture.key);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });
});

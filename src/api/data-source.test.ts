import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw-server";
import { errorEnvelope } from "@/fixtures/envelopes";
import { ApiError, createApiClient, unwrap, WriteRouteRefused } from "./data-source";
import { READ_ROUTES } from "./requests";
import { SESSION_HEADER } from "@/lib/console-session";
import type { Head } from "./schemas";

const BASE = "https://cloud.example";

const HEAD: Head = {
  tag: "playbill-head-v1",
  instance: "inst_x",
  generation: 7,
  coordinate: {
    tag: "playbill-accepted-coordinate-v1",
    git_oid: "a".repeat(40),
    semantic_root: "sha256:" + "b".repeat(64),
    generation_root: "sha256:" + "c".repeat(64),
    compiler_digest: "sha256:" + "d".repeat(64),
  },
};

describe("data-source boundary", () => {
  it("sends the configured bearer token against the configured base URL", async () => {
    let seenAuth: string | null = null;
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/head`, ({ request }) => {
        seenAuth = request.headers.get("authorization");
        return HttpResponse.json(HEAD);
      }),
    );

    const client = createApiClient({ baseUrl: BASE, token: "tok-123" });
    const head = unwrap(
      await client.GET("/api/v1/{instance_id}/head", {
        params: { path: { instance_id: "inst_x" } },
      }),
    );

    expect(seenAuth).toBe("Bearer tok-123");
    expect(head.generation).toBe(7);
  });

  it("omits the Authorization header when no token is configured", async () => {
    let seenAuth: string | null = "unset";
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/head`, ({ request }) => {
        seenAuth = request.headers.get("authorization");
        return HttpResponse.json(HEAD);
      }),
    );

    const client = createApiClient({ baseUrl: BASE });
    await client.GET("/api/v1/{instance_id}/head", { params: { path: { instance_id: "inst_x" } } });

    expect(seenAuth).toBeNull();
  });

  it("sends the cruxible console session header when served that way", async () => {
    let seen: string | null = null;
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/head`, ({ request }) => {
        seen = request.headers.get(SESSION_HEADER);
        return HttpResponse.json(HEAD);
      }),
    );
    const client = createApiClient({ baseUrl: BASE, sessionToken: "session-1" });
    await client.GET("/api/v1/{instance_id}/head", { params: { path: { instance_id: "inst_x" } } });
    expect(seen).toBe("session-1");
  });

  it("sends no session header under the dev server (no session)", async () => {
    let seen: string | null = "unset";
    let cookie: string | null = "unset";
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/head`, ({ request }) => {
        seen = request.headers.get(SESSION_HEADER);
        cookie = request.headers.get("cookie");
        return HttpResponse.json(HEAD);
      }),
    );
    const client = createApiClient({ baseUrl: BASE });
    await client.GET("/api/v1/{instance_id}/head", { params: { path: { instance_id: "inst_x" } } });
    expect(seen).toBeNull();
    expect(cookie).toBeNull();
  });

  it("reports a refused console session once, and only that refusal", async () => {
    let code = "console.session_required";
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/head`, () =>
        HttpResponse.json(errorEnvelope("ConsoleSessionRequired", "Open the link", code), { status: 401 }),
      ),
    );
    let rejected = 0;
    const client = createApiClient({ baseUrl: BASE, sessionToken: "old", onSessionRejected: () => rejected++ });
    const read = () =>
      client.GET("/api/v1/{instance_id}/head", { params: { path: { instance_id: "inst_x" } } });
    await read();
    await read();
    expect(rejected).toBe(1);

    code = "auth.missing";
    let other = 0;
    const second = createApiClient({ baseUrl: BASE, sessionToken: "s", onSessionRejected: () => other++ });
    await second.GET("/api/v1/{instance_id}/head", { params: { path: { instance_id: "inst_x" } } });
    expect(other).toBe(0);
  });

  it("surfaces the daemon error envelope as ApiError", async () => {
    server.use(
      http.post(`${BASE}/api/v1/:instanceId/get`, () =>
        HttpResponse.json(
          errorEnvelope("ReadRefusalError", "no accepted Subject 'x/y'", "cruxible.get.ref_not_found"),
          { status: 404 },
        ),
      ),
    );

    const client = createApiClient({ baseUrl: BASE });
    const err = await client
      .POST("/api/v1/{instance_id}/get", {
        params: { path: { instance_id: "inst_x" } },
        body: { ref: "x/y" },
      })
      .then(unwrap)
      .catch((e: unknown) => e);

    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).status).toBe(404);
    expect((err as ApiError).errorCode).toBe("cruxible.get.ref_not_found");
  });

  it("refuses run-starting and writing routes before any request is sent", async () => {
    // No handler is registered: a request that reached the network would fail
    // the suite through onUnhandledRequest: "error".
    const client = createApiClient({ baseUrl: BASE });
    const starts = client.POST("/api/v1/{instance_id}/lines/{line}/runs", {
      params: { path: { instance_id: "inst_x", line: "kev" } },
      body: { line: "kev" },
    });
    await expect(starts).rejects.toBeInstanceOf(WriteRouteRefused);
    const writes = client.POST("/api/v1/{instance_id}/set", {
      params: { path: { instance_id: "inst_x" } },
      body: {} as never,
    });
    await expect(writes).rejects.toBeInstanceOf(WriteRouteRefused);
  });

  it("allows no run-starting, measuring or evaluating route", () => {
    const forbidden = [
      "/lines/{line}/runs",
      "/procedures/{name}/runs",
      "/measurements",
      "/resolution-dispositions",
      "/evaluate",
      "/captures/erase",
      "/runbooks/{name}/runs",
      "/providers/install",
      "/runtime/credentials",
      "/ledger/publish",
    ];
    for (const route of READ_ROUTES) {
      for (const fragment of forbidden) expect(route).not.toContain(fragment);
    }
  });
});

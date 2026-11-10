import { describe, expect, it, vi } from "vitest";
import {
  CONSOLE_CONFIG_PATH,
  resolveServedConsole,
  SESSION_HEADER,
  SESSION_STORAGE_KEY,
} from "./console-session";

const CONFIG = {
  tag: "cruxible-console-config-v1",
  instance_id: "inst_served",
  api_base_url: "",
  core: { version: "0.5.1", sdk_contract_snapshot_digest: "sha256:core" },
  console: { commit: "c".repeat(40), pin: { core_version: "0.5.1" } },
};

function storage(token: string | null) {
  const items = new Map<string, string>(token === null ? [] : [[SESSION_STORAGE_KEY, token]]);
  return {
    items,
    getItem: (key: string) => items.get(key) ?? null,
    removeItem: (key: string) => void items.delete(key),
  };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

describe("resolveServedConsole", () => {
  it("reads the listener's config with the stored session header", async () => {
    const fetchImpl = vi.fn(async (_url: RequestInfo | URL, _init?: RequestInit) => json(CONFIG));
    const served = await resolveServedConsole(fetchImpl as typeof fetch, storage("tok-1"));

    expect(served).toEqual({ kind: "served", token: "tok-1", config: CONFIG });
    const [url, init] = fetchImpl.mock.calls[0]!;
    expect(url).toBe(CONSOLE_CONFIG_PATH);
    expect(new Headers(init?.headers).get(SESSION_HEADER)).toBe("tok-1");
    expect(init?.credentials).toBe("omit");
  });

  it("is the dev server when the config path answers the app's HTML, nothing, or fails", async () => {
    const html = async () => new Response("<!doctype html>", { headers: { "content-type": "text/html" } });
    expect(await resolveServedConsole(html as typeof fetch, storage(null))).toEqual({ kind: "dev" });
    const missing = async () => new Response("", { status: 404 });
    expect(await resolveServedConsole(missing as typeof fetch, storage("tok"))).toEqual({ kind: "dev" });
    const down = async () => {
      throw new TypeError("network");
    };
    expect(await resolveServedConsole(down as typeof fetch, storage(null))).toEqual({ kind: "dev" });
  });

  it("forgets a refused session and reports signed out", async () => {
    const refused = async () =>
      json({ error_type: "ConsoleSessionRequired", message: "Open the link", error_code: "console.session_required" }, 401);
    const stored = storage("stale-token");
    expect(await resolveServedConsole(refused as typeof fetch, stored)).toEqual({ kind: "signed-out" });
    expect(stored.items.has(SESSION_STORAGE_KEY)).toBe(false);

    const none = storage(null);
    expect(await resolveServedConsole(refused as typeof fetch, none)).toEqual({ kind: "signed-out" });
  });

  it("leaves another server's 401 alone", async () => {
    const other = async () => json({ error_code: "auth.missing" }, 401);
    const stored = storage("tok");
    expect(await resolveServedConsole(other as typeof fetch, stored)).toEqual({ kind: "dev" });
    expect(stored.items.get(SESSION_STORAGE_KEY)).toBe("tok");
  });
});

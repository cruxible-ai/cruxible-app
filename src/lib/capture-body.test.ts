import { describe, expect, it } from "vitest";
import { captureFormat, decodeBase64Fields, downloadName, formatSize, unwrapCaptureBody } from "./capture-body";

const b64 = (text: string) => btoa(String.fromCharCode(...new TextEncoder().encode(text)));

describe("capture bodies", () => {
  it("unwraps a web.fetch response to the bytes the server sent, with its url, status and type", () => {
    const wrapper = {
      derived: { kind: "none" },
      input_bucket: "legacy=none",
      retrieved: {
        url: "https://example.test/kev.json",
        final_url: "https://example.test/feeds/kev.json",
        status_code: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body_base64: b64('{"title":"KEV","count":2}'),
      },
    };
    const body = unwrapCaptureBody(b64(JSON.stringify(wrapper)));
    expect(body.format).toBe("web-fetch");
    expect(body.url).toBe("https://example.test/feeds/kev.json");
    expect(body.status).toBe(200);
    expect(body.json).toEqual({ title: "KEV", count: 2 });
    expect(captureFormat(body, "cisa.kev.catalog")).toBe("json");
    expect(downloadName(body, "cisa.kev.catalog", "CAP-1")).toBe("cisa.kev.catalog.json");
  });

  it("unwraps a workspace.file text body and its base64 bytes", () => {
    const text = unwrapCaptureBody(b64(JSON.stringify({ input_bucket: "x", content: { kind: "text", text: "<?xml version='1.0'?><a/>" } })));
    expect(text.format).toBe("workspace-file");
    expect(text.text).toBe("<?xml version='1.0'?><a/>");
    expect(downloadName(text, null, "CAP-abc")).toBe("CAP-abc.xml");

    const bin = unwrapCaptureBody(b64(JSON.stringify({ content: { kind: "bytes", encoding: "base64", bytes: btoa("ÿþ\u0000") } })));
    expect(Array.from(bin.bytes)).toEqual([255, 254, 0]);
    expect(bin.text).toBeNull();
    expect(captureFormat(bin, null)).toBe("binary");
    expect(downloadName(bin, "some source", "CAP-abc")).toBe("some-source.bin");
  });

  it("shows any other body as it is", () => {
    const body = unwrapCaptureBody(b64('{"summary":{"status":200}}'));
    expect(body.format).toBe("raw");
    expect(body.json).toEqual({ summary: { status: 200 } });
    const plain = unwrapCaptureBody(b64("line one\nline two"));
    expect(plain.json).toBeUndefined();
    expect(captureFormat(plain, null)).toBe("text");
  });
});

describe("capture formats", () => {
  it("renders a fetched page by its Content-Type, a fetched file by its URL, a workspace file by its logical source", () => {
    const fetched = (type: string | null, url: string, text: string) =>
      unwrapCaptureBody(
        b64(JSON.stringify({ retrieved: { url, status_code: 200, headers: type ? { "content-type": type } : {}, body_base64: b64(text) } })),
      );
    const page = fetched("text/html; charset=utf-8", "https://example.test/advisory", "<p>Patched</p>");
    expect(captureFormat(page, "vendor.advisories")).toBe("html");
    expect(downloadName(page, "vendor.advisories", "CAP-1")).toBe("vendor.advisories.html");
    // raw.githubusercontent serves markdown as text/plain: the URL's extension decides
    const readme = fetched("text/plain; charset=utf-8", "https://raw.example.test/repo/README.md?ref=main", "Just words.");
    expect(captureFormat(readme, null)).toBe("markdown");
    expect(readme.name).toBe("https://raw.example.test/repo/README.md?ref=main");

    const file = unwrapCaptureBody(
      b64(JSON.stringify({ source: { logical_source: "repo.docs.design.md" }, content: { kind: "text", text: "Plain words." } })),
    );
    expect(file.name).toBe("repo.docs.design.md");
    expect(captureFormat(file, null)).toBe("markdown");
    expect(downloadName(file, "repo.docs.design.md", "CAP-1")).toBe("repo.docs.design.md");
    // the Capture's own source is the fallback hint
    expect(captureFormat(unwrapCaptureBody(b64("Plain words.")), "notes.md")).toBe("markdown");
  });
});

describe("request bundles", () => {
  it("splits a provider's exchanges into requests with decoded responses, and decodes base64 fields in the rest", () => {
    const bundle = {
      exchanges: [
        { method: "POST", path: "/v1/querybatch", request: { purls: ["pkg:pypi/a@1"] }, status: 200, body_base64: b64('{"results":[{}]}') },
        { method: "GET", path: "/v1/vulns/GHSA-1", request: null, status: 404, body_base64: b64("not found") },
      ],
      service: "https://api.osv.dev",
      listing: { body_base64: b64('["PyPI"]'), at: "now" },
    };
    const body = unwrapCaptureBody(b64(JSON.stringify(bundle)));
    expect(body.format).toBe("exchanges");
    expect(body.url).toBe("https://api.osv.dev");
    expect(body.exchanges?.map((e) => [e.method, e.path, e.status])).toEqual([
      ["POST", "/v1/querybatch", 200],
      ["GET", "/v1/vulns/GHSA-1", 404],
    ]);
    expect(body.exchanges?.[0]?.json).toEqual({ results: [{}] });
    expect(body.exchanges?.[1]?.text).toBe("not found");
    expect(body.context).toEqual({ service: "https://api.osv.dev", listing: { body: ["PyPI"], at: "now" } });
    // the stored JSON stays the raw view
    expect(body.json).toEqual(bundle);
  });

  it("leaves a list that is not exchanges, and bytes that are not text, as they are", () => {
    expect(unwrapCaptureBody(b64(JSON.stringify({ exchanges: [{ id: 1 }] }))).format).toBe("raw");
    expect(decodeBase64Fields({ blob_base64: btoa("\xff\xfe") })).toEqual({ blob_base64: btoa("\xff\xfe") });
  });
});

describe("sizes", () => {
  it("reads short", () => {
    expect(formatSize(840)).toBe("840 bytes");
    expect(formatSize(12_700)).toBe("12 KB");
    expect(formatSize(2_415_205)).toBe("2.3 MB");
  });
});

import { describe, expect, it } from "vitest";
import { captureCoordinate, captureFormat, downloadName, formatSize, readCaptureBody } from "./capture-body";

const b64 = (text: string) => btoa(String.fromCharCode(...new TextEncoder().encode(text)));

/** An external source as a Capture's envelope carries it: the typed coordinate of an HTTP response. */
const http = (fields: Record<string, unknown>) => ({
  kind: "external",
  source_identity: "cisa.kev.catalog",
  coordinate_type: "http-response-v1",
  coordinate: fields,
});

describe("capture bodies", () => {
  it("are the payload bytes as stored: a JSON body parses, whatever its keys", () => {
    const body = readCaptureBody(b64('{"title":"KEV","count":2}'));
    expect(body.json).toEqual({ title: "KEV", count: 2 });
    // a body that happens to look like an old wrapper is still just the body
    const looks = readCaptureBody(b64(JSON.stringify({ retrieved: { body_base64: b64("x") } })));
    expect(looks.json).toEqual({ retrieved: { body_base64: b64("x") } });
  });

  it("keeps bytes that are not text, and text that is not JSON", () => {
    const bin = readCaptureBody(btoa("ÿþ\u0000"));
    expect(Array.from(bin.bytes)).toEqual([255, 254, 0]);
    expect(bin.text).toBeNull();
    expect(captureFormat(bin, null, null)).toBe("binary");
    expect(downloadName(bin, null, "some source", "CAP-abc")).toBe("some-source.bin");
    const plain = readCaptureBody(b64("line one\nline two"));
    expect(plain.json).toBeUndefined();
    expect(captureFormat(plain, null, null)).toBe("text");
    const xml = readCaptureBody(b64("<?xml version='1.0'?><a/>"));
    expect(downloadName(xml, null, null, "CAP-abc")).toBe("CAP-abc.xml");
  });
});

describe("capture coordinates", () => {
  it("read an external source's coordinate as stored, with the URL, status and content type it gives", () => {
    const coordinate = captureCoordinate(
      http({ url: "https://example.test/kev.json", final_url: "https://example.test/feeds/kev.json", status: 200, content_type: "application/json" }),
    );
    expect(coordinate).toMatchObject({
      type: "http-response-v1",
      url: "https://example.test/feeds/kev.json",
      status: 200,
      contentType: "application/json",
    });
    expect(Object.keys(coordinate!.fields)).toEqual(["url", "final_url", "status", "content_type"]);
    // ledger and CAS sources have no external coordinate
    expect(captureCoordinate({ kind: "cas" })).toBeNull();
    expect(captureCoordinate(null)).toBeNull();
  });
});

describe("capture formats", () => {
  it("renders a fetched page by its coordinate's content type, a fetched file by its URL, else by the Capture's source", () => {
    const page = readCaptureBody(b64("<p>Patched</p>"));
    const pageAt = captureCoordinate(http({ url: "https://example.test/advisory", content_type: "text/html; charset=utf-8" }));
    expect(captureFormat(page, pageAt, "vendor.advisories")).toBe("html");
    expect(downloadName(page, pageAt, "vendor.advisories", "CAP-1")).toBe("vendor.advisories.html");
    // raw.githubusercontent serves markdown as text/plain: the URL's extension decides
    const readme = readCaptureBody(b64("Just words."));
    const readmeAt = captureCoordinate(http({ url: "https://raw.example.test/repo/README.md?ref=main", content_type: "text/plain; charset=utf-8" }));
    expect(captureFormat(readme, readmeAt, null)).toBe("markdown");
    const json = readCaptureBody(b64('{"count":2}'));
    expect(captureFormat(json, null, "cisa.kev.catalog")).toBe("json");
    expect(downloadName(json, null, "cisa.kev.catalog", "CAP-1")).toBe("cisa.kev.catalog.json");
    // the Capture's own source is the fallback hint
    expect(captureFormat(readCaptureBody(b64("Plain words.")), null, "notes.md")).toBe("markdown");
  });
});

describe("sizes", () => {
  it("reads short", () => {
    expect(formatSize(840)).toBe("840 bytes");
    expect(formatSize(12_700)).toBe("12 KB");
    expect(formatSize(2_415_205)).toBe("2.3 MB");
  });
});

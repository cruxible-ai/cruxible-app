import { describe, expect, it } from "vitest";
import { downloadName, formatSize, previewText, unwrapCaptureBody } from "./capture-body";

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
    expect(previewText(body)).toContain('"title": "KEV"');
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
    expect(previewText(bin)).toBeNull();
    expect(downloadName(bin, "some source", "CAP-abc")).toBe("some-source.bin");
  });

  it("shows any other body as it is", () => {
    const body = unwrapCaptureBody(b64('{"summary":{"status":200}}'));
    expect(body.format).toBe("raw");
    expect(body.json).toEqual({ summary: { status: 200 } });
    const plain = unwrapCaptureBody(b64("line one\nline two"));
    expect(plain.json).toBeUndefined();
    expect(previewText(plain)).toBe("line one\nline two");
  });
});

describe("sizes", () => {
  it("reads short", () => {
    expect(formatSize(840)).toBe("840 bytes");
    expect(formatSize(12_700)).toBe("12 KB");
    expect(formatSize(2_415_205)).toBe("2.3 MB");
  });
});

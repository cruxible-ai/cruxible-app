/**
 * A Capture's retained body, as `captures/read` returns it (base64), unwrapped
 * to what was captured. Core's two built-in provider formats wrap the source's
 * bytes: web.fetch keeps the HTTP response under `retrieved` (body_base64 plus
 * url, status and headers) and workspace.file keeps the file under `content`
 * (text, or base64 bytes). Any other body is shown as it is.
 */

export interface CaptureBody {
  /** What was captured: the response or file bytes, unwrapped. */
  bytes: Uint8Array;
  /** The bytes as UTF-8 text, when they decode cleanly. */
  text: string | null;
  /** The text parsed as JSON, when it parses. */
  json: unknown;
  /** Which wrapper the body came in. */
  format: "web-fetch" | "workspace-file" | "raw";
  /** Where it came from, when the wrapper says. */
  url: string | null;
  status: number | null;
  contentType: string | null;
}

export function decodeBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function utf8(bytes: Uint8Array): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

function parseJson(text: string | null): unknown {
  if (text === null) return undefined;
  const trimmed = text.trimStart();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function header(headers: unknown, name: string): string | null {
  if (!isRecord(headers)) return null;
  const hit = Object.entries(headers).find(([key]) => key.toLowerCase() === name);
  return hit && typeof hit[1] === "string" ? hit[1] : null;
}

function inner(bytes: Uint8Array, format: CaptureBody["format"], extra: Partial<CaptureBody> = {}): CaptureBody {
  const text = utf8(bytes);
  return { bytes, text, json: parseJson(text), format, url: null, status: null, contentType: null, ...extra };
}

export function unwrapCaptureBody(base64: string): CaptureBody {
  const raw = decodeBase64(base64);
  const outer = inner(raw, "raw");
  const wrapper = outer.json;
  if (isRecord(wrapper)) {
    const retrieved = wrapper.retrieved;
    if (isRecord(retrieved) && typeof retrieved.body_base64 === "string") {
      return inner(decodeBase64(retrieved.body_base64), "web-fetch", {
        url: typeof retrieved.final_url === "string" ? retrieved.final_url : typeof retrieved.url === "string" ? retrieved.url : null,
        status: typeof retrieved.status_code === "number" ? retrieved.status_code : null,
        contentType: header(retrieved.headers, "content-type"),
      });
    }
    const content = wrapper.content;
    if (isRecord(content) && content.kind === "text" && typeof content.text === "string") {
      return inner(new TextEncoder().encode(content.text), "workspace-file");
    }
    if (isRecord(content) && content.kind === "bytes" && typeof content.bytes === "string") {
      return inner(decodeBase64(content.bytes), "workspace-file");
    }
  }
  return outer;
}

/** A file name for the download: the source's name and an extension from what the bytes are. */
export function downloadName(body: CaptureBody, source: string | null, capture: string): string {
  const base = (source ?? capture).replace(/[^A-Za-z0-9._-]+/g, "-");
  const type = body.contentType?.split(";")[0]?.trim().toLowerCase() ?? "";
  const ext =
    body.json !== undefined || type.endsWith("json")
      ? "json"
      : type === "text/html"
        ? "html"
        : type.endsWith("xml") || body.text?.trimStart().startsWith("<?xml")
          ? "xml"
          : body.text !== null
            ? "txt"
            : "bin";
  return `${base}.${ext}`;
}

/** The text the panel shows: JSON pretty-printed, other text as it is; null for binary. */
export function previewText(body: CaptureBody): string | null {
  if (body.json !== undefined) return JSON.stringify(body.json, null, 2);
  return body.text;
}

/** A byte count, short: "840 bytes", "12.4 KB", "2.3 MB". */
export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} ${bytes === 1 ? "byte" : "bytes"}`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`;
  const mb = kb / 1024;
  return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
}

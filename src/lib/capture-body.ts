/**
 * A Capture's retained body, as `captures/read` returns it (base64), unwrapped
 * to what was captured. Core's two built-in provider formats wrap the source's
 * bytes: web.fetch keeps the HTTP response under `retrieved` (body_base64 plus
 * url, status and headers) and workspace.file keeps the file under `content`
 * (text, or base64 bytes). A provider's request bundle (an `exchanges` list
 * of HTTP requests, each with its response under body_base64) is split into
 * its exchanges, each body decoded. Any other body is shown as it is.
 */
import { bodyFormat, extensionFor, type BodyFormat } from "./body-format";

export interface CaptureBody {
  /** What was captured: the response or file bytes, unwrapped. */
  bytes: Uint8Array;
  /** The bytes as UTF-8 text, when they decode cleanly. */
  text: string | null;
  /** The text parsed as JSON, when it parses. */
  json: unknown;
  /** Which wrapper the body came in. */
  format: "web-fetch" | "workspace-file" | "exchanges" | "raw";
  /** Where it came from, when the wrapper says. */
  url: string | null;
  status: number | null;
  contentType: string | null;
  /** A name the wrapper gives the bytes (the fetched URL, the file's logical source): a format hint. */
  name: string | null;
  /** A request bundle's exchanges, in order (format "exchanges"). */
  exchanges?: Exchange[];
  /** A request bundle's other top-level fields, base64 fields decoded (format "exchanges"). */
  context?: Record<string, unknown>;
}

/** One HTTP request of a bundle and the response body it got back. */
export interface Exchange {
  index: number;
  method: string | null;
  path: string | null;
  status: number | null;
  /** What was sent (a request body, query or parameters), when the bundle keeps it. */
  request: unknown;
  bytes: Uint8Array;
  text: string | null;
  json: unknown;
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

/** Bytes as UTF-8 text when they decode cleanly, and that text as JSON when it parses. */
export function decodeText(bytes: Uint8Array): { text: string | null; json: unknown } {
  const text = utf8(bytes);
  return { text, json: parseJson(text) };
}

function inner(bytes: Uint8Array, format: CaptureBody["format"], extra: Partial<CaptureBody> = {}): CaptureBody {
  return { bytes, ...decodeText(bytes), format, url: null, status: null, contentType: null, name: null, ...extra };
}

function safeBase64(value: string): Uint8Array | null {
  try {
    return decodeBase64(value);
  } catch {
    return null;
  }
}

/**
 * A JSON value with each `<name>_base64` string field shown decoded under
 * `<name>` (as JSON when it parses, else as text); bytes that are not UTF-8
 * text stay encoded. Nothing kit-specific: any wrapper reads.
 */
export function decodeBase64Fields(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(decodeBase64Fields);
  if (!isRecord(value)) return value;
  const out: Record<string, unknown> = {};
  for (const [key, field] of Object.entries(value)) {
    const bytes = key.endsWith("_base64") && typeof field === "string" ? safeBase64(field) : null;
    const decoded = bytes ? decodeText(bytes) : null;
    if (decoded && decoded.text !== null) {
      out[key.slice(0, -"_base64".length) || key] = decoded.json !== undefined ? decodeBase64Fields(decoded.json) : decoded.text;
    } else {
      out[key] = decodeBase64Fields(field);
    }
  }
  return out;
}

const str = (value: unknown): string | null => (typeof value === "string" ? value : null);

function exchangesOf(wrapper: Record<string, unknown>): Exchange[] | null {
  const list = wrapper.exchanges;
  if (!Array.isArray(list) || list.length === 0) return null;
  const out: Exchange[] = [];
  for (const [index, item] of list.entries()) {
    if (!isRecord(item) || typeof item.body_base64 !== "string") return null;
    const bytes = safeBase64(item.body_base64);
    if (!bytes) return null;
    out.push({
      index,
      method: str(item.method),
      path: str(item.path) ?? str(item.url),
      status: typeof item.status === "number" ? item.status : typeof item.status_code === "number" ? item.status_code : null,
      request: item.request ?? null,
      bytes,
      ...decodeText(bytes),
    });
  }
  return out;
}

export function unwrapCaptureBody(base64: string): CaptureBody {
  const raw = decodeBase64(base64);
  const outer = inner(raw, "raw");
  const wrapper = outer.json;
  if (isRecord(wrapper)) {
    const exchanges = exchangesOf(wrapper);
    if (exchanges) {
      const rest = Object.fromEntries(Object.entries(wrapper).filter(([key]) => key !== "exchanges"));
      const service = str(rest.service);
      return { ...outer, format: "exchanges", url: service, exchanges, context: decodeBase64Fields(rest) as Record<string, unknown> };
    }
    const retrieved = wrapper.retrieved;
    if (isRecord(retrieved) && typeof retrieved.body_base64 === "string") {
      const url = typeof retrieved.final_url === "string" ? retrieved.final_url : typeof retrieved.url === "string" ? retrieved.url : null;
      return inner(decodeBase64(retrieved.body_base64), "web-fetch", {
        url,
        status: typeof retrieved.status_code === "number" ? retrieved.status_code : null,
        contentType: header(retrieved.headers, "content-type"),
        name: url,
      });
    }
    const content = wrapper.content;
    const source = isRecord(wrapper.source) && typeof wrapper.source.logical_source === "string" ? wrapper.source.logical_source : null;
    if (isRecord(content) && content.kind === "text" && typeof content.text === "string") {
      return inner(new TextEncoder().encode(content.text), "workspace-file", { name: source });
    }
    if (isRecord(content) && content.kind === "bytes" && typeof content.bytes === "string") {
      return inner(decodeBase64(content.bytes), "workspace-file", { name: source });
    }
  }
  return outer;
}

/** What the body is (markdown, HTML, JSON, text, binary), by its type, its name, the Capture's source, then a sniff. */
export function captureFormat(body: CaptureBody, source: string | null): BodyFormat {
  return bodyFormat(body, { contentType: body.contentType, name: body.name ?? source });
}

/** A file name for the download: the source's name and an extension from what the bytes are. */
export function downloadName(body: CaptureBody, source: string | null, capture: string): string {
  const base = (source ?? capture).replace(/[^A-Za-z0-9._-]+/g, "-");
  const format = captureFormat(body, source);
  const xml = format === "text" && body.text?.trimStart().startsWith("<?xml");
  const ext = xml ? "xml" : extensionFor(format, body.contentType);
  return base.toLowerCase().endsWith(`.${ext}`) ? base : `${base}.${ext}`;
}

/** A byte count, short: "840 bytes", "12.4 KB", "2.3 MB". */
export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} ${bytes === 1 ? "byte" : "bytes"}`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`;
  const mb = kb / 1024;
  return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
}

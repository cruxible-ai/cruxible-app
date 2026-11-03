/**
 * A Capture's body, as `captures/read` returns it (base64): the payload bytes
 * exactly as stored. A Capture is never a wrapper; where it came from (the
 * URL, the HTTP status and headers, a file path) is the typed coordinate on
 * its envelope's source, read here only for the hints it gives the viewer.
 */
import { bodyFormat, extensionFor, type BodyFormat } from "./body-format";

export interface CaptureBody {
  /** The stored payload bytes. */
  bytes: Uint8Array;
  /** The bytes as UTF-8 text, when they decode cleanly. */
  text: string | null;
  /** The text parsed as JSON, when it parses. */
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

/** Bytes as UTF-8 text when they decode cleanly, and that text as JSON when it parses. */
export function decodeText(bytes: Uint8Array): { text: string | null; json: unknown } {
  const text = utf8(bytes);
  return { text, json: parseJson(text) };
}

/** The stored body, decoded from the read's base64. */
export function readCaptureBody(base64: string): CaptureBody {
  const bytes = decodeBase64(base64);
  return { bytes, ...decodeText(bytes) };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const str = (value: unknown): string | null => (typeof value === "string" && value !== "" ? value : null);

/**
 * An external source's coordinate: its type (`http-response-v1`, …) and its
 * fields as stored, plus the hints a viewer takes from them when present (a
 * content type, the URL fetched, an HTTP status).
 */
export interface CaptureCoordinate {
  type: string;
  fields: Record<string, unknown>;
  contentType: string | null;
  url: string | null;
  status: number | null;
}

export function captureCoordinate(source: { kind: string; coordinate_type?: string; coordinate?: unknown } | null | undefined): CaptureCoordinate | null {
  if (source?.kind !== "external" || !source.coordinate_type) return null;
  const fields = isRecord(source.coordinate) ? source.coordinate : {};
  return {
    type: source.coordinate_type,
    fields,
    contentType: str(fields.content_type),
    url: str(fields.final_url) ?? str(fields.url),
    status: typeof fields.status === "number" ? fields.status : null,
  };
}

/** What the body is (markdown, HTML, JSON, text, binary), by its coordinate's type hints, the Capture's source, then a sniff. */
export function captureFormat(body: CaptureBody, coordinate: CaptureCoordinate | null, source: string | null): BodyFormat {
  return bodyFormat(body, { contentType: coordinate?.contentType ?? null, name: coordinate?.url ?? source });
}

/** A file name for the download: the source's name and an extension from what the bytes are. */
export function downloadName(body: CaptureBody, coordinate: CaptureCoordinate | null, source: string | null, capture: string): string {
  const base = (source ?? capture).replace(/[^A-Za-z0-9._-]+/g, "-");
  const format = captureFormat(body, coordinate, source);
  const xml = format === "text" && body.text?.trimStart().startsWith("<?xml");
  const ext = xml ? "xml" : extensionFor(format, coordinate?.contentType ?? null);
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

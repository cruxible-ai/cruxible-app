/**
 * What a retained body is, for showing it: markdown, HTML, JSON, other text,
 * or binary. Shared by a Capture's Contents panel and the Docs reader.
 *
 * The declared type decides first (a Capture's HTTP Content-Type, a
 * Document's media_type), then a file name's extension (a fetched URL's path,
 * a workspace file's logical source, a Document's name), then JSON that
 * parses; only a body with no type, or a plain-text one, is sniffed, and only
 * a confident sniff renders (an HTML document's own opening; two or more
 * distinct markdown constructs). Anything else shows as text.
 *
 * HTML is never put in the page's DOM: `sandboxSrcDoc` sanitizes it (no
 * scripts, frames, plugins, meta/base/link, event handlers or script URLs) and
 * pins a Content-Security-Policy that loads nothing remote, for an iframe
 * sandboxed with neither scripts nor same-origin.
 */

export type BodyFormat = "markdown" | "html" | "json" | "text" | "binary";

export interface BodyHints {
  /** The declared media type ("text/markdown; charset=utf-8"), when known. */
  contentType: string | null;
  /** A file name or path the body came from, when known ("docs/design.md"). */
  name: string | null;
}

const MARKDOWN_TYPES = new Set(["text/markdown", "text/x-markdown", "text/x-gfm"]);
const HTML_TYPES = new Set(["text/html", "application/xhtml+xml"]);
const MARKDOWN_EXT = /\.(md|markdown|mdown|mkd|mdx)$/i;
const HTML_EXT = /\.(html?|xhtml)$/i;

function mediaType(contentType: string | null): string {
  return contentType?.split(";")[0]?.trim().toLowerCase() ?? "";
}

/** The last path segment of a name or URL, without a query or fragment. */
function baseName(name: string | null): string {
  if (!name) return "";
  return name.split(/[?#]/)[0]!.split("/").pop() ?? "";
}

export function bodyFormat(body: { text: string | null; json: unknown }, hints: BodyHints): BodyFormat {
  if (body.text === null) return "binary";
  const type = mediaType(hints.contentType);
  if (MARKDOWN_TYPES.has(type)) return "markdown";
  if (HTML_TYPES.has(type)) return "html";
  const file = baseName(hints.name);
  if (MARKDOWN_EXT.test(file)) return "markdown";
  if (HTML_EXT.test(file)) return "html";
  if (body.json !== undefined) return "json";
  if (type === "" && looksLikeHtml(body.text)) return "html";
  if ((type === "" || type === "text/plain") && looksLikeMarkdown(body.text)) return "markdown";
  return "text";
}

/** An HTML document's own opening: a doctype or an <html> element first. */
export function looksLikeHtml(text: string): boolean {
  // trimStart drops a byte-order mark too
  const head = text.trimStart().slice(0, 512).toLowerCase();
  return head.startsWith("<!doctype html") || /^<html[\s>]/.test(head);
}

const MARKDOWN_SIGNALS: [string, RegExp][] = [
  ["heading", /^#{1,6}[ \t]+\S/m],
  ["fence", /^(```|~~~)/m],
  ["list", /^[ \t]{0,3}([-*+]|\d{1,3}[.)])[ \t]+\S/m],
  ["link", /\[[^\]\n]+\]\([^)\s]+\)/],
  ["table", /^\|?[ \t]*:?-{3,}:?[ \t]*\|/m],
  ["emphasis", /(\*\*|__)[^\s*_][^*_\n]*\1/],
  ["quote", /^>[ \t]?\S/m],
];

/** Markdown, confidently: at least two distinct constructs, and not markup. */
export function looksLikeMarkdown(text: string): boolean {
  const sample = text.slice(0, 64 * 1024);
  if (/^\s*</.test(sample)) return false;
  let found = 0;
  for (const [, pattern] of MARKDOWN_SIGNALS) {
    if (pattern.test(sample)) found += 1;
    if (found >= 2) return true;
  }
  return false;
}

/** Elements dropped with their contents: anything that runs, embeds, or loads or redirects by itself. */
const DROPPED = "script, iframe, frame, frameset, object, embed, applet, portal, base, link, meta";
const URL_ATTRIBUTES = ["href", "src", "action", "formaction", "xlink:href", "poster", "background", "srcset", "ping"];
const SCRIPT_URL = /^\s*(javascript:|vbscript:|data:(?!image\/(png|gif|jpe?g|webp)[;,]))/i;

/** HTML with everything active removed; the result is a whole document. */
export function sanitizeHtml(html: string): Document {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll(DROPPED).forEach((element) => element.remove());
  for (const element of Array.from(doc.querySelectorAll("*"))) {
    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      // control characters inside a scheme ("java\tscript:") are ignored by URL parsers
      const value = attribute.value.replace(/[\u0000-\u001F\u007F]+/g, "");
      if (name.startsWith("on") || (URL_ATTRIBUTES.includes(name) && SCRIPT_URL.test(value))) {
        element.removeAttribute(attribute.name);
      }
    }
  }
  return doc;
}

/** Nothing remote: inline styles and data: images and fonts only. */
export const SANDBOX_CSP =
  "default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:; form-action 'none'; base-uri 'none'";

/**
 * The srcdoc for a sandboxed iframe: the sanitized document, its policy first
 * in <head>, and a plain base style the document's own styles override.
 */
export function sandboxSrcDoc(html: string): string {
  const doc = sanitizeHtml(html);
  const head = doc.head;
  const style = doc.createElement("style");
  style.textContent = "html{color-scheme:light}body{margin:16px;font:14px/1.5 system-ui,sans-serif;color:#18181b;background:#fff}";
  head.prepend(style);
  const charset = doc.createElement("meta");
  charset.setAttribute("charset", "utf-8");
  head.prepend(charset);
  const policy = doc.createElement("meta");
  policy.setAttribute("http-equiv", "Content-Security-Policy");
  policy.setAttribute("content", SANDBOX_CSP);
  head.prepend(policy);
  return `<!doctype html>${doc.documentElement.outerHTML}`;
}

/** A file extension for a download, from the format and the declared type. */
export function extensionFor(format: BodyFormat, contentType: string | null): string {
  const type = mediaType(contentType);
  if (format === "markdown") return "md";
  if (format === "html") return "html";
  if (format === "json" || type.endsWith("json")) return "json";
  if (type.endsWith("xml")) return "xml";
  if (format === "text") return "txt";
  return "bin";
}

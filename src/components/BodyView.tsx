import { useMemo, useState, type ReactNode } from "react";
import { DocumentProse } from "@/components/DocumentProse";
import { formatSize } from "@/lib/capture-body";
import { sandboxSrcDoc, type BodyFormat } from "@/lib/body-format";

/** The most of a body the page renders inline; the download has the rest. */
export const PREVIEW_CHARS = 200_000;

/**
 * One retained body, shown by what it is: markdown rendered (Prose: GFM,
 * sanitized, cruxible:// chips), HTML sanitized inside an iframe sandboxed
 * with neither scripts nor same-origin, JSON pretty-printed, other text as it
 * is, binary as a note to download it. Rendered markdown and HTML keep a Raw
 * toggle that shows the text as it is.
 */
export function BodyView({
  format,
  text,
  json,
  size,
  title,
  centered = false,
  fill = false,
}: {
  format: BodyFormat;
  text: string | null;
  json: unknown;
  size: number;
  /** Names the HTML frame for assistive tech. */
  title: string;
  /** A wide reader: markdown gets its table of contents beside it, centred. */
  centered?: boolean;
  /** Fill the window: the HTML frame and raw text take the viewport's height. */
  fill?: boolean;
}) {
  const [raw, setRaw] = useState(false);
  if (format === "binary" || text === null) {
    return <BodyNote>Binary ({formatSize(size)}): download it to open.</BodyNote>;
  }
  const rendered = format === "markdown" || format === "html";
  const shown = format === "json" ? JSON.stringify(json, null, 2) : text;
  return (
    <div className="space-y-2">
      {rendered && (
        <div role="group" aria-label="Show as" className="flex gap-px text-[12px]">
          <ToggleButton pressed={!raw} onClick={() => setRaw(false)}>
            {format === "markdown" ? "Markdown" : "HTML"}
          </ToggleButton>
          <ToggleButton pressed={raw} onClick={() => setRaw(true)}>
            Raw
          </ToggleButton>
        </div>
      )}
      {rendered && !raw ? (
        format === "markdown" ? (
          <div className={centered ? "flex justify-center" : undefined}>
            <Cut text={text}>{(cut) => <DocumentProse text={cut} toc={centered} />}</Cut>
          </div>
        ) : (
          <HtmlFrame html={text} title={title} fill={fill} />
        )
      ) : (
        <Cut text={shown}>
          {(cut) => (
            <pre
              className={`${fill ? "max-h-[calc(100vh-9rem)]" : "max-h-[70vh]"} overflow-auto whitespace-pre-wrap break-all bg-zinc-950 p-3 font-mono text-[12px] leading-5 text-zinc-300`}
            >
              {cut}
            </pre>
          )}
        </Cut>
      )}
    </div>
  );
}

function ToggleButton({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`border px-2 py-0.5 ${pressed ? "border-zinc-500 bg-zinc-800 text-zinc-100" : "border-zinc-800 text-zinc-400 hover:text-zinc-200"}`}
    >
      {children}
    </button>
  );
}

/** The first PREVIEW_CHARS of a long text, with a line saying so. */
function Cut({ text, children }: { text: string; children: (text: string) => ReactNode }) {
  const cut = text.length > PREVIEW_CHARS;
  return (
    <div>
      {children(cut ? text.slice(0, PREVIEW_CHARS) : text)}
      {cut && (
        <div className="mt-2 text-[12px] text-zinc-500">
          Showing the first {PREVIEW_CHARS.toLocaleString()} of {text.length.toLocaleString()} characters; download it for the whole body.
        </div>
      )}
    </div>
  );
}

/**
 * HTML in a frame that can run nothing: `sandbox` with no allowances (no
 * scripts, no same-origin, no forms, popups or top navigation), and a srcdoc
 * that is the sanitized document under a policy that loads nothing remote.
 */
function HtmlFrame({ html, title, fill }: { html: string; title: string; fill: boolean }) {
  const srcDoc = useMemo(() => sandboxSrcDoc(html), [html]);
  return (
    <div>
      <iframe
        sandbox=""
        srcDoc={srcDoc}
        title={title}
        referrerPolicy="no-referrer"
        className={`${fill ? "h-[calc(100vh-10rem)]" : "h-[70vh]"} w-full resize-y border border-zinc-800 bg-white`}
      />
      <div className="mt-1 text-[12px] text-zinc-500">Shown sandboxed: scripts don't run and nothing remote loads.</div>
    </div>
  );
}

export function BodyNote({ children }: { children: ReactNode }) {
  return <p className="text-[13px] text-zinc-400">{children}</p>;
}

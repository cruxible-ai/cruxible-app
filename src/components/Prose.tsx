import type { ReactNode } from "react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { CruxibleRefChip } from "./CruxibleRef";
import { CRUXIBLE_SCHEME } from "@/lib/cruxible-ref";
import { remarkCruxibleRefs } from "@/lib/remark-cruxible-refs";

/**
 * Sanitized markdown for prose authored into state (note bodies, descriptions,
 * summaries). react-markdown never injects raw HTML, so agent-authored text is
 * safe to render; styling is inlined per element since the app doesn't use the
 * typography plugin. remark-breaks treats single newlines as hard breaks
 * (GitHub style) — agent-authored bodies are newline-separated plain text far
 * more often than strict markdown, and standard markdown would collapse them
 * into one paragraph.
 *
 * cruxible:// refs (bare or as link destinations) hydrate into live chips via
 * CruxibleRefChip — the agent-briefings primitive. react-markdown's default
 * urlTransform strips unknown schemes, so cruxible: is passed through
 * verbatim; every other URL still goes through the default sanitizer. The
 * cruxible href never reaches a DOM anchor — it is parsed as data and routed
 * through react-router links only.
 */
const urlTransform = (url: string) =>
  url.startsWith(CRUXIBLE_SCHEME) ? url : defaultUrlTransform(url);

/** Flatten a rendered label to text ("[**x**](…)" -> "x") for chip labels. */
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
}

export function Prose({ text }: { text: string }) {
  return (
    <div className="max-w-3xl space-y-2 text-[14px] leading-5 text-zinc-400">
      <Markdown
        remarkPlugins={[remarkGfm, remarkBreaks, remarkCruxibleRefs]}
        urlTransform={urlTransform}
        components={{
          h1: (p) => <h3 className="text-[14px] font-semibold text-zinc-200" {...p} />,
          h2: (p) => <h4 className="text-[14px] font-semibold text-zinc-200" {...p} />,
          h3: (p) => <h5 className="text-[14px] font-medium text-zinc-300" {...p} />,
          p: (p) => <p className="my-1.5" {...p} />,
          ul: (p) => <ul className="my-1.5 list-disc space-y-0.5 pl-5" {...p} />,
          ol: (p) => <ol className="my-1.5 list-decimal space-y-0.5 pl-5" {...p} />,
          code: (p) => (
            <code className="rounded bg-zinc-900 px-1 font-mono text-[13px] text-zinc-300" {...p} />
          ),
          pre: (p) => (
            <pre className="my-1.5 overflow-x-auto rounded border border-zinc-800 bg-zinc-900/60 p-2" {...p} />
          ),
          a: ({ node: _node, href, children, ...rest }) => {
            if (href?.startsWith(CRUXIBLE_SCHEME)) {
              // Bare refs arrive with label === href (the plugin sets the URL
              // as the link text); authored [label](…) forms keep their label.
              const label = textOf(children);
              return (
                <CruxibleRefChip url={href} label={label === href ? undefined : label} />
              );
            }
            return (
              <a className="text-zinc-300 underline decoration-zinc-600" href={href} {...rest}>
                {children}
              </a>
            );
          },
          strong: (p) => <strong className="font-semibold text-zinc-300" {...p} />,
          blockquote: (p) => (
            <blockquote className="my-1.5 border-l-2 border-zinc-700 pl-3 text-zinc-500" {...p} />
          ),
          table: (p) => (
            <div className="my-1.5 overflow-x-auto">
              <table className="w-full text-left text-[13px]" {...p} />
            </div>
          ),
          thead: (p) => <thead className="border-b border-zinc-800 text-[12px] text-zinc-500" {...p} />,
          th: (p) => <th className="py-1 pr-3 font-medium" {...p} />,
          td: (p) => <td className="border-t border-zinc-900 py-1 pr-3 align-top text-zinc-300" {...p} />,
        }}
      >
        {text}
      </Markdown>
    </div>
  );
}

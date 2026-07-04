import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

/**
 * Sanitized markdown for prose authored into state (note bodies, descriptions,
 * summaries). react-markdown never injects raw HTML, so agent-authored text is
 * safe to render; styling is inlined per element since the app doesn't use the
 * typography plugin. remark-breaks treats single newlines as hard breaks
 * (GitHub style) — agent-authored bodies are newline-separated plain text far
 * more often than strict markdown, and standard markdown would collapse them
 * into one paragraph.
 */
export function Prose({ text }: { text: string }) {
  return (
    <div className="max-w-3xl space-y-2 text-[13px] leading-5 text-zinc-400">
      <Markdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          h1: (p) => <h3 className="text-[14px] font-semibold text-zinc-200" {...p} />,
          h2: (p) => <h4 className="text-[13px] font-semibold text-zinc-200" {...p} />,
          h3: (p) => <h5 className="text-[13px] font-medium text-zinc-300" {...p} />,
          p: (p) => <p className="my-1.5" {...p} />,
          ul: (p) => <ul className="my-1.5 list-disc space-y-0.5 pl-5" {...p} />,
          ol: (p) => <ol className="my-1.5 list-decimal space-y-0.5 pl-5" {...p} />,
          code: (p) => (
            <code className="rounded bg-zinc-900 px-1 font-mono text-[12px] text-zinc-300" {...p} />
          ),
          pre: (p) => (
            <pre className="my-1.5 overflow-x-auto rounded border border-zinc-800 bg-zinc-900/60 p-2" {...p} />
          ),
          a: (p) => <a className="text-zinc-300 underline decoration-zinc-600" {...p} />,
          strong: (p) => <strong className="font-semibold text-zinc-300" {...p} />,
          blockquote: (p) => (
            <blockquote className="my-1.5 border-l-2 border-zinc-700 pl-3 text-zinc-500" {...p} />
          ),
          table: (p) => (
            <div className="my-1.5 overflow-x-auto">
              <table className="w-full text-left text-[12px]" {...p} />
            </div>
          ),
          thead: (p) => <thead className="border-b border-zinc-800 text-[11px] text-zinc-500" {...p} />,
          th: (p) => <th className="py-1 pr-3 font-medium" {...p} />,
          td: (p) => <td className="border-t border-zinc-900 py-1 pr-3 align-top text-zinc-300" {...p} />,
        }}
      >
        {text}
      </Markdown>
    </div>
  );
}

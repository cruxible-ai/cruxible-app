import { useEffect, useLayoutEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CruxibleRefChip } from "./CruxibleRef";
import { CRUXIBLE_SCHEME } from "@/lib/cruxible-ref";
import { remarkCruxibleRefs } from "@/lib/remark-cruxible-refs";
import { remarkHeadingIds } from "@/lib/remark-heading-ids";

/**
 * A retained markdown body (a Document, a captured file) set for reading: a
 * real heading scale, linkable sections, comfortable measure, and a table of
 * contents beside it when there is room. Unlike Prose (short agent-authored
 * notes, single newlines as breaks), this is standard markdown. Same safety:
 * react-markdown never injects raw HTML; cruxible:// refs become chips.
 */

const urlTransform = (url: string) => (url.startsWith(CRUXIBLE_SCHEME) ? url : defaultUrlTransform(url));

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

type HeadingProps = ComponentPropsWithoutRef<"h1"> & { node?: unknown };

/** A heading with a hover link to itself. */
function heading(Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", className: string) {
  return function Heading({ node: _node, id, children, ...rest }: HeadingProps) {
    return (
      <Tag id={id} className={`group scroll-mt-16 ${className}`} {...rest}>
        {children}
        {id && (
          <a
            href={`#${id}`}
            aria-hidden="true"
            tabIndex={-1}
            className="ml-2 text-zinc-600 no-underline opacity-0 hover:text-zinc-300 group-hover:opacity-100 focus:opacity-100"
          >
            #
          </a>
        )}
      </Tag>
    );
  };
}

const COMPONENTS = {
  h1: heading("h1", "mt-8 mb-3 text-[24px] font-semibold leading-tight text-zinc-100 first:mt-0"),
  h2: heading("h2", "mt-8 mb-3 border-b border-zinc-800 pb-1.5 text-[19px] font-semibold leading-snug text-zinc-100 first:mt-0"),
  h3: heading("h3", "mt-6 mb-2 text-[16px] font-semibold text-zinc-100"),
  h4: heading("h4", "mt-5 mb-1.5 text-[15px] font-semibold text-zinc-200"),
  h5: heading("h5", "mt-4 mb-1 text-[14px] font-semibold text-zinc-300"),
  h6: heading("h6", "mt-4 mb-1 text-[13px] font-semibold uppercase tracking-wide text-zinc-400"),
  p: (p: ComponentPropsWithoutRef<"p">) => <p className="my-3" {...p} />,
  ul: (p: ComponentPropsWithoutRef<"ul">) => <ul className="my-3 list-disc space-y-1 pl-6 marker:text-zinc-600" {...p} />,
  ol: (p: ComponentPropsWithoutRef<"ol">) => <ol className="my-3 list-decimal space-y-1 pl-6 marker:text-zinc-500" {...p} />,
  li: (p: ComponentPropsWithoutRef<"li">) => <li className="pl-1 [&>ul]:my-1 [&>ol]:my-1" {...p} />,
  hr: () => <hr className="my-8 border-zinc-800" />,
  code: (p: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded-sm bg-zinc-800/70 px-1 py-px font-mono text-[13px] text-zinc-200" {...p} />
  ),
  pre: (p: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-4 overflow-x-auto border border-zinc-800 bg-zinc-900/70 p-3 text-[13px] leading-6 [&_code]:bg-transparent [&_code]:p-0"
      {...p}
    />
  ),
  strong: (p: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-zinc-100" {...p} />,
  em: (p: ComponentPropsWithoutRef<"em">) => <em className="italic text-zinc-200" {...p} />,
  blockquote: (p: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-4 border-l-2 border-zinc-600 pl-4 text-zinc-400 [&>p]:my-1" {...p} />
  ),
  table: (p: ComponentPropsWithoutRef<"table">) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[14px]" {...p} />
    </div>
  ),
  thead: (p: ComponentPropsWithoutRef<"thead">) => (
    <thead className="border-b border-zinc-700 text-[12px] uppercase tracking-wide text-zinc-500" {...p} />
  ),
  th: (p: ComponentPropsWithoutRef<"th">) => <th className="py-1.5 pr-4 font-medium" {...p} />,
  td: (p: ComponentPropsWithoutRef<"td">) => <td className="border-t border-zinc-800/80 py-1.5 pr-4 align-top text-zinc-300" {...p} />,
  img: ({ alt, ...p }: ComponentPropsWithoutRef<"img">) => <img alt={alt ?? ""} className="my-4 max-w-full" {...p} />,
  input: (p: ComponentPropsWithoutRef<"input">) => <input className="mr-1.5 align-middle accent-zinc-400" {...p} />,
  a: ({ node: _node, href, children, ...rest }: ComponentPropsWithoutRef<"a"> & { node?: unknown }) => {
    if (href?.startsWith(CRUXIBLE_SCHEME)) {
      const label = textOf(children);
      return <CruxibleRefChip url={href} label={label === href ? undefined : label} />;
    }
    const external = href !== undefined && /^https?:/i.test(href);
    return (
      <a
        className="text-zinc-100 underline decoration-zinc-600 underline-offset-2 hover:decoration-zinc-300"
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  },
};

export function DocumentProse({ text, toc = false }: { text: string; toc?: boolean }) {
  const body = useRef<HTMLDivElement>(null);
  const [entries, setEntries] = useState<TocEntry[]>([]);
  const [active, setActive] = useState<string | null>(null);

  // The contents come from the rendered headings, so their ids always match.
  useLayoutEffect(() => {
    const nodes = body.current ? [...body.current.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id]")] : [];
    setEntries(nodes.map((el) => ({ id: el.id, text: (el.textContent ?? "").replace(/#$/, "").trim(), level: Number(el.tagName[1]) })));
  }, [text]);

  // The section in view: the last heading above the top fifth of the viewport.
  useEffect(() => {
    if (!toc || entries.length < 2 || typeof IntersectionObserver === "undefined") return;
    const nodes = entries.map((e) => document.getElementById(e.id)).filter((n): n is HTMLElement => n !== null);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting) visible.add(r.target.id);
          else visible.delete(r.target.id);
        }
        const first = entries.find((e) => visible.has(e.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "0px 0px -80% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [toc, entries]);

  const top = Math.min(...entries.map((e) => e.level));
  const showToc = toc && entries.length >= 2;
  const article = (
    <div ref={body} className="min-w-0 max-w-[72ch] text-[15px] leading-7 text-zinc-300">
      <Markdown remarkPlugins={[remarkGfm, remarkCruxibleRefs, remarkHeadingIds]} urlTransform={urlTransform} components={COMPONENTS}>
        {text}
      </Markdown>
    </div>
  );
  if (!showToc) return article;
  return (
    <div className="flex items-start justify-center gap-10">
      <nav
        aria-label="Contents"
        className="sticky top-16 hidden max-h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto text-[13px] xl:block"
      >
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Contents</div>
        <ul className="space-y-1 border-l border-zinc-800">
          {entries.map((e) => (
            <li key={e.id} style={{ paddingLeft: `${(e.level - top) * 12 + 12}px` }} className="-ml-px">
              <a
                href={`#${e.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById(e.id)?.scrollIntoView({ block: "start", behavior: "smooth" });
                  setActive(e.id);
                }}
                aria-current={active === e.id ? "location" : undefined}
                className={`block leading-snug ${active === e.id ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-200"}`}
              >
                {e.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {article}
    </div>
  );
}

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { InfoButton } from "@/components/InfoButton";

/**
 * The page frame every screen uses: the full content width up to a wide cap
 * (so 1920-wide screens are used), one vertical rhythm between blocks. Long
 * prose inside keeps its own measure (the `measure` utility).
 */
export function Page({ children, width = "wide" }: { children: ReactNode; width?: "wide" | "narrow" }) {
  return <div className={`w-full space-y-5 ${width === "wide" ? "max-w-[1760px]" : "max-w-[1100px]"}`}>{children}</div>;
}

/**
 * The standard page header: what this is (kind), the title (with an ⓘ when
 * the page needs the console's own explanation), a subtitle (counts and
 * names, or the thing's authored description as written; never prose the
 * console generates), then the key facts as a labelled strip. Detail follows
 * in cards.
 */
export function PageHeader({
  kind,
  kindHref,
  title,
  mono = false,
  id,
  info,
  infoLabel,
  summary,
  facts,
  actions,
  children,
}: {
  /** What kind of page this is ("Subject", "Line"), sentence case. */
  kind?: ReactNode;
  /** Makes the kind a link (a Subject's kind page). */
  kindHref?: string;
  title: ReactNode;
  /** Title is an identifier: set it in the mono face. */
  mono?: boolean;
  /** A machine id shown under the title when the title is words (with copy). */
  id?: ReactNode;
  /** The console's own explanation of the page or concept: shown behind an ⓘ beside the title. */
  info?: ReactNode;
  /** The ⓘ's accessible name. */
  infoLabel?: string;
  /** The subtitle: counts, state, names, or the author's description as written; never console-generated prose. */
  summary?: ReactNode;
  facts?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-zinc-800 pb-4">
      {(kind || actions) && (
        <div className="mb-1 flex items-center gap-3">
          {kind &&
            (kindHref ? (
              <Link to={kindHref} className="t-meta font-mono hover:text-zinc-200 hover:underline">
                {kind}
              </Link>
            ) : (
              <span className="t-meta">{kind}</span>
            ))}
          {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {info ? (
        <div className="flex items-center">
          <h1 className={`${mono ? "t-title-mono" : "t-title"} min-w-0 break-words`}>{title}</h1>
          <PageInfo label={infoLabel}>{info}</PageInfo>
        </div>
      ) : (
        <h1 className={`${mono ? "t-title-mono" : "t-title"} break-words`}>{title}</h1>
      )}
      {id && <div className="mt-0.5">{id}</div>}
      {summary && <div className="t-lede measure mt-1.5">{summary}</div>}
      {facts && <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-3">{facts}</dl>}
      {children}
    </header>
  );
}

/** The ⓘ beside a page title (PageHeader's, or a hand-built header's `<h1>`): a sibling, so the heading's name stays the title. */
export function PageInfo({ children, label = "About this page" }: { children: ReactNode; label?: string | undefined }) {
  return (
    <span className="ml-2 inline-flex shrink-0 font-sans">
      <InfoButton label={label}>{children}</InfoButton>
    </span>
  );
}

/** One labelled fact in a header strip or a card: label above, value below. */
export function Fact({ label, children, title }: { label: ReactNode; children: ReactNode; title?: string }) {
  return (
    <div className="min-w-0" title={title}>
      <dt className="t-meta">{label}</dt>
      <dd className="mt-0.5 text-[13px] leading-5 text-zinc-200">{children}</dd>
    </div>
  );
}

/**
 * A two-column definition list for card bodies: labels in a fixed column,
 * values aligned on one edge.
 */
export function FactList({ children, labelWidth = "9rem" }: { children: ReactNode; labelWidth?: string }) {
  return (
    <dl className="grid gap-x-4 gap-y-1.5 text-[13px] leading-5" style={{ gridTemplateColumns: `${labelWidth} minmax(0,1fr)` }}>
      {children}
    </dl>
  );
}

export function FactRow({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <>
      <dt className="text-zinc-500">{label}</dt>
      <dd className="min-w-0 break-words text-zinc-200">{children}</dd>
    </>
  );
}

/** A main column with a narrower facts rail on wide screens. */
export function WithRail({ children, rail }: { children: ReactNode; rail: ReactNode }) {
  if (!rail) return <div className="space-y-5">{children}</div>;
  return (
    <div className="grid grid-cols-1 items-start gap-5 2xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="min-w-0 space-y-5">{children}</div>
      <div className="min-w-0 space-y-5">{rail}</div>
    </div>
  );
}

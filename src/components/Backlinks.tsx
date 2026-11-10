import { useMemo } from "react";
import { useGet } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { SignalDot } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { InfoButton } from "@/components/InfoButton";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { publicName } from "@/lib/evidence";
import type { DocumentLink } from "@/lib/document-links";
import { useCursorStack } from "@/lib/usePaging";

type Backlink = Schemas["Backlink"];

/** The page size backlinks read (get detail=backlinks; up to 200). */
export const BACKLINKS_PAGE = 50;

const BACKLINK_INFO =
  "A backlink points into this Subject from elsewhere: a Document or note about it, or a workspace section one of its Claims cites. Notes and Documents are not Claims; they never change a verdict.";

const RELATION: Record<string, string> = { cites: "Cites", about: "About", guides: "Guides" };

/** One page of backlinks into `ref` (a Subject, ClaimType or Procedure), the served cursor continuing it. */
function useBacklinks(ref: string | null, cursor?: string) {
  return useGet(ref, "backlinks", { limit: BACKLINKS_PAGE, ...(cursor !== undefined ? { cursor } : {}) });
}

/** A section's heading path, as the Subject page and the Document page write it. */
function sectionText(link: Pick<Backlink, "file" | "section">): string | null {
  if (!link.file && !(link.section ?? []).length) return null;
  return [link.file ? publicName(link.file) : null, ...(link.section ?? [])].filter(Boolean).join(" › ");
}

/**
 * The backlinks into one Subject: the Documents and notes `about` it and the
 * workspace sections its live Claims cite (each citing Claim's field, the
 * section by file and heading path, whether it moved since it was cited),
 * a page at a time with the served cursor.
 */
export function BacklinksPanel({ subject }: { subject: string }) {
  const [cursors, setCursors] = useCursorStack("backlinks", subject);
  const read = useBacklinks(subject, cursors[cursors.length - 1]);
  const links = read.data?.backlinks?.links ?? [];
  const next = read.data?.next_cursor ?? null;
  const columns = useMemo<Column<Backlink>[]>(
    () => [
      { id: "relation", header: "Relation", className: "whitespace-nowrap text-zinc-300", cell: (l) => <span title={l.role ? `role ${l.role}` : undefined}>{RELATION[l.relation] ?? l.relation}</span> },
      {
        id: "source",
        header: "From",
        className: "break-all",
        cell: (l) =>
          l.source_kind === "Document" ? (
            <RefLink value={l.source}>
              <span className="text-[13px]">{l.title ?? l.source}</span>
            </RefLink>
          ) : (
            <span className="inline-flex flex-wrap items-baseline gap-x-2">
              <RefLink value={l.source} short />
              {l.field && <span className="font-mono text-[12px] text-zinc-400">{l.field.slice(l.field.lastIndexOf(".") + 1)}</span>}
            </span>
          ),
      },
      {
        id: "section",
        header: "Section",
        className: "text-[12px] text-zinc-300",
        cell: (l) => {
          const text = sectionText(l);
          return text ? <span title={l.cited_digest ?? undefined}>{text}</span> : <span className="text-zinc-600">—</span>;
        },
      },
      {
        id: "drift",
        header: "Since cited",
        className: "whitespace-nowrap text-[12px]",
        cell: (l) =>
          l.drift === "changed_since_cited" ? (
            <span className="inline-flex items-baseline gap-1.5 text-zinc-300">
              <SignalDot signal="waiting" title="Accepted state holds a later reading of this section with other bytes: re-read it" />
              Changed
            </span>
          ) : l.drift === "unchanged" ? (
            <span className="text-zinc-400">Unchanged</span>
          ) : l.drift === "unknown" ? (
            <span className="text-zinc-500" title="The daemon sees no later reading of the section; the CLI beside the workspace compares it with the file">
              Not known
            </span>
          ) : null,
      },
    ],
    [],
  );
  // Supplementary: nothing to show, or a daemon that refuses the read (one older than backlinks), leaves no panel.
  if ((read.data && links.length === 0 && cursors.length === 0) || (read.error && cursors.length === 0)) return null;
  return (
    <Panel
      title={
        <span className="inline-flex items-center gap-1.5">
          Backlinks
          <InfoButton label="What a backlink is">{BACKLINK_INFO}</InfoButton>
        </span>
      }
      meta={read.data?.backlinks?.withheld ? <span title="Restricted sources were withheld from this token">Some withheld</span> : undefined}
    >
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {links.length > 0 && <DataTable rows={links} columns={columns} rowKey={(l) => `${l.relation}\n${l.source}\n${(l.section ?? []).join("/")}`} label="Backlinks" toolbar={false} maxHeight="24rem" />}
      {(cursors.length > 0 || next) && (
        <div className="mt-1 flex gap-3 text-[12px] text-zinc-500">
          {cursors.length > 0 && (
            <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
              ← Previous
            </button>
          )}
          <span>Page {cursors.length + 1}</span>
          {next && (
            <button onClick={() => setCursors((c) => [...c, next])} className="hover:text-zinc-200">
              Next →
            </button>
          )}
        </div>
      )}
    </Panel>
  );
}

/**
 * The Documents that `guide` a ClaimType or Procedure (its backlinks' guides
 * rows): each Document's title linked, its name on hover. First page only;
 * more are named as more.
 */
export function GuidedBy({ target }: { target: string }) {
  const read = useBacklinks(target);
  const guides = (read.data?.backlinks?.links ?? []).filter((l) => l.relation === "guides");
  if (read.isPending) return <span className="animate-pulse text-zinc-600">…</span>;
  if (read.error) return <span title={read.error.message}>—</span>;
  if (guides.length === 0) return <span>No Document guides it</span>;
  return (
    <span className="flex flex-col">
      {guides.map((l) => (
        <span key={l.source} title={l.source}>
          <RefLink value={l.source}>
            <span className="text-zinc-200">{l.title ?? l.source}</span>
          </RefLink>
        </span>
      ))}
      {read.data?.next_cursor && <span className="text-zinc-500">and more</span>}
    </span>
  );
}

/** A Document's own links: each relation and its target, linked (a Subject, ClaimType or Procedure). */
export function DocumentLinks({ links, isPending, error }: { links: DocumentLink[]; isPending: boolean; error: Error | null }) {
  const columns = useMemo<Column<DocumentLink>[]>(
    () => [
      { id: "relation", header: "Relation", className: "whitespace-nowrap text-zinc-300", cell: (l) => RELATION[l.relation] ?? l.relation },
      { id: "target", header: "Target", className: "break-all", cell: (l) => <RefLink value={l.target} /> },
    ],
    [],
  );
  if (isPending) return <LoadState />;
  if (error) return <EmptyState><span title={error.message}>Not read</span></EmptyState>;
  if (links.length === 0) return <EmptyState>None</EmptyState>;
  return <DataTable rows={links} columns={columns} rowKey={(l) => `${l.relation}\n${l.target}`} label="Links" toolbar={false} maxHeight="none" />;
}

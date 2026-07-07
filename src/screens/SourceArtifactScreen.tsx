import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSourceArtifact } from "@/api/hooks";
import { Chip } from "@/components/Chip";
import { MonoId } from "@/components/MonoId";
import { EmptyState, Panel, LoadState } from "@/components/Panel";
import { Prose } from "@/components/Prose";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import type { SourceArtifactReadChunk } from "@/api/artifact-types";

interface DocPiece {
  chunk: SourceArtifactReadChunk;
  kind: "heading" | "body";
}

/**
 * The chunk manifest overlaps by construction: a "section" chunk spans its
 * whole section (heading through last line) while block chunks (paragraph,
 * code_fence, list_item, …) re-cover the same lines at finer grain. To render
 * the document once, sections contribute only their heading line (anchored on
 * the section chunk id) and block chunks contribute their text, skipping
 * blocks nested inside an already-rendered block (e.g. a paragraph inside a
 * blockquote).
 */
export function buildDocument(chunks: SourceArtifactReadChunk[]): DocPiece[] {
  const ordered = [...chunks].sort(
    (a, b) => a.line_start - b.line_start || b.line_end - a.line_end,
  );
  const pieces: DocPiece[] = [];
  let coveredTo = 0;
  for (const c of ordered) {
    if (c.block_type === "section") {
      pieces.push({ chunk: c, kind: "heading" });
      continue;
    }
    if (c.line_end <= coveredTo) continue;
    pieces.push({ chunk: c, kind: "body" });
    coveredTo = Math.max(coveredTo, c.line_end);
  }
  return pieces;
}

const HEADING_CLASSES = [
  "text-[16px] font-semibold text-zinc-100",
  "text-[14px] font-semibold text-zinc-200",
  "text-[14px] font-medium text-zinc-300",
];

function SectionHeading({ chunk }: { chunk: SourceArtifactReadChunk }) {
  const depth = Math.min(Math.max(chunk.heading_path.length, 1), HEADING_CLASSES.length);
  const title = chunk.heading_path[chunk.heading_path.length - 1] ?? chunk.block_selector;
  const Tag = (["h2", "h3", "h4"] as const)[depth - 1]!;
  return <Tag className={`mt-4 first:mt-0 ${HEADING_CLASSES[depth - 1]}`}>{title}</Tag>;
}

function ChunkAnchor({ piece, highlighted }: { piece: DocPiece; highlighted: boolean }) {
  const { chunk, kind } = piece;
  return (
    <div
      id={chunk.chunk_id}
      className={`group relative -mx-2 scroll-mt-4 rounded px-2 py-0.5 transition-all duration-700 ${
        highlighted ? "bg-sky-500/10 ring-1 ring-sky-400/40" : ""
      }`}
    >
      <div className="absolute -top-2.5 right-0 z-10 hidden max-w-full items-center gap-2 rounded border border-zinc-800 bg-zinc-900/95 px-1.5 py-0.5 group-hover:flex">
        {chunk.heading_path.length > 0 && (
          <span className="truncate text-[10px] text-zinc-500">
            {chunk.heading_path.join(" › ")}
          </span>
        )}
        <MonoId id={chunk.chunk_id} className="whitespace-nowrap text-[10px]" />
        <span className="whitespace-nowrap font-mono text-[10px] text-zinc-600">
          L{chunk.line_start}–{chunk.line_end}
        </span>
      </div>
      {kind === "heading" ? (
        <SectionHeading chunk={chunk} />
      ) : chunk.text != null ? (
        <Prose text={chunk.text} />
      ) : (
        <div className="text-[13px] italic text-zinc-600">
          (chunk text not captured — {chunk.block_type} at L{chunk.line_start}–{chunk.line_end})
        </div>
      )}
    </div>
  );
}

/**
 * Reader for one digest-pinned source artifact: the chunk manifest rendered
 * in document order, every chunk an anchor. Deep links
 * (/sources/:artifactId#<chunk_id>) scroll to the chunk and flash a highlight
 * that fades — this is where "open in source" from an evidence ref lands.
 */
export function SourceArtifactScreen() {
  const { artifactId = "" } = useParams();
  const location = useLocation();
  const artifact = useSourceArtifact(artifactId);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  usePageTitle(artifact.data?.label ?? artifactId);

  useEffect(() => {
    if (!artifact.data || !location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView?.({ block: "start", behavior: "smooth" });
    setHighlightId(id);
    const timer = setTimeout(() => setHighlightId(null), 2500);
    return () => clearTimeout(timer);
  }, [artifact.data, location.hash]);

  const data = artifact.data;
  const pieces = data ? buildDocument(data.chunks) : [];

  return (
    <div>
      {artifact.isPending && <LoadState />}
      {artifact.error && <LoadState error={artifact.error} />}
      {data && (
        <>
          <header className="mb-4">
            <h1 className="text-[17px] font-semibold text-zinc-100">
              {data.label ?? data.source_artifact_id}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <MonoId id={data.source_artifact_id} />
              <Chip value={data.kind} tone="blue" />
              <Chip
                value={data.retention}
                tone={data.retention === "archive" ? "green" : "zinc"}
              />
              <span className="text-[12px] text-zinc-500">
                registered {formatDateTime(data.registered_at)}
              </span>
            </div>
            {data.original_uri && (
              // Plain text on purpose: original_uri is an unverified claim
              // about where the content came from, not a safe navigation
              // target for a trust console.
              <div className="mt-1 font-mono text-[12px] text-zinc-500">{data.original_uri}</div>
            )}
            <div className="mt-1 font-mono text-[10px] text-zinc-600">{data.content_hash}</div>
          </header>

          {!data.content_available ? (
            <Panel title="Content unavailable" meta={<span>{data.chunks.length} chunks pinned</span>}>
              <div className="py-2 text-[14px] text-zinc-400">
                The source text for this artifact cannot be read right now.
                {data.content_unavailable_reason && (
                  <div className="mt-1 text-[13px] text-zinc-500">
                    {data.content_unavailable_reason}
                  </div>
                )}
              </div>
              {data.chunks.length > 0 && (
                <div className="mt-2 border-t border-zinc-800 pt-2">
                  <div className="mb-1 text-[12px] text-zinc-500">
                    Pinned chunk manifest (hashes remain verifiable):
                  </div>
                  <ul className="space-y-0.5">
                    {data.chunks.map((c) => (
                      <li key={c.chunk_id} className="flex flex-wrap items-center gap-x-2 text-[12px]">
                        <MonoId id={c.chunk_id} className="text-[12px]" />
                        {c.heading_path.length > 0 && (
                          <span className="text-zinc-500">{c.heading_path.join(" › ")}</span>
                        )}
                        <span className="font-mono text-zinc-600">
                          L{c.line_start}–{c.line_end}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Panel>
          ) : (
            <Panel
              title="Document"
              meta={
                <span>
                  {data.chunks.length} chunks
                  {data.body_origin && <> · read from {data.body_origin}</>}
                </span>
              }
            >
              {pieces.length === 0 ? (
                <EmptyState>No chunks in this artifact.</EmptyState>
              ) : (
                <div className="space-y-1 py-1">
                  {pieces.map((piece) => (
                    <ChunkAnchor
                      key={piece.chunk.chunk_id}
                      piece={piece}
                      highlighted={piece.chunk.chunk_id === highlightId}
                    />
                  ))}
                </div>
              )}
            </Panel>
          )}
        </>
      )}
    </div>
  );
}

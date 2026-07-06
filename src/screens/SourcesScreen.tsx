import { Link, useSearchParams } from "react-router-dom";
import { useInstanceId, useSourceArtifacts } from "@/api/hooks";
import { actionChipClass, Chip } from "@/components/Chip";
import { MonoId } from "@/components/MonoId";
import { EmptyState, Panel, LoadState } from "@/components/Panel";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import type { SourceRetention } from "@/api/artifact-types";

const PAGE_SIZE = 50;

// Archive retention means the daemon holds a digest-pinned copy (content is
// guaranteed readable); manifest-only pins hashes but content can go away.
const RETENTION_TONE: Record<SourceRetention, "green" | "zinc"> = {
  archive: "green",
  manifest_only: "zinc",
};

/**
 * Registered source artifacts — the documents governed claims cite. Each row
 * opens the artifact viewer, which renders the chunk manifest as a readable
 * document with per-chunk anchors.
 */
export function SourcesScreen() {
  const instanceId = useInstanceId();
  const [searchParams, setSearchParams] = useSearchParams();
  usePageTitle("Sources");
  const offset = Number(searchParams.get("offset") ?? 0);
  const list = useSourceArtifacts(PAGE_SIZE, offset);

  const items = list.data?.items ?? [];
  const total = list.data?.total ?? 0;

  function setOffset(next: number) {
    const sp = new URLSearchParams(searchParams);
    if (next > 0) sp.set("offset", String(next));
    else sp.delete("offset");
    setSearchParams(sp);
  }

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">Sources</h1>
        <p className="mt-0.5 text-[12px] text-zinc-500">
          Digest-pinned source artifacts backing evidence on governed claims.
        </p>
      </header>
      <Panel
        title="Source artifacts"
        meta={
          <span>
            <span className="font-mono">{total}</span> total
          </span>
        }
      >
        {list.isPending && <LoadState />}
        {list.error && <LoadState error={list.error} />}
        {list.data &&
          (items.length === 0 ? (
            <EmptyState>No source artifacts registered.</EmptyState>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
                      <th className="py-1 pr-3 font-medium">Label</th>
                      <th className="py-1 pr-3 font-medium">Id</th>
                      <th className="py-1 pr-3 font-medium">Kind</th>
                      <th className="py-1 pr-3 font-medium">Retention</th>
                      <th className="py-1 pr-3 font-medium">Chunks</th>
                      <th className="py-1 pr-3 font-medium">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((a) => (
                      <tr
                        key={a.source_artifact_id}
                        className="border-t border-zinc-800/60 align-top hover:bg-zinc-900/40"
                      >
                        <td className="min-w-48 max-w-96 truncate py-1.5 pr-3">
                          <Link
                            to={`/i/${instanceId}/sources/${a.source_artifact_id}`}
                            className="text-zinc-200 hover:underline"
                          >
                            {a.label ?? a.source_artifact_id}
                          </Link>
                        </td>
                        <td className="py-1.5 pr-3">
                          <MonoId id={a.source_artifact_id} />
                        </td>
                        <td className="py-1.5 pr-3">
                          <Chip value={a.kind} tone="blue" />
                        </td>
                        <td className="py-1.5 pr-3">
                          <Chip value={a.retention} tone={RETENTION_TONE[a.retention]} />
                        </td>
                        <td className="py-1.5 pr-3 font-mono text-[12px] text-zinc-400">
                          {a.chunk_count}
                        </td>
                        <td className="whitespace-nowrap py-1.5 pr-3 text-zinc-400">
                          {formatDateTime(a.registered_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {total > PAGE_SIZE && (
                <div className="mt-2 flex items-center gap-2 text-[12px]">
                  <button
                    disabled={offset <= 0}
                    onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
                    className={`${actionChipClass} disabled:pointer-events-none disabled:opacity-40`}
                  >
                    prev
                  </button>
                  <button
                    disabled={offset + PAGE_SIZE >= total}
                    onClick={() => setOffset(offset + PAGE_SIZE)}
                    className={`${actionChipClass} disabled:pointer-events-none disabled:opacity-40`}
                  >
                    next
                  </button>
                  <span className="text-zinc-600">
                    {offset}–{Math.min(offset + PAGE_SIZE, total)} of {total}
                  </span>
                </div>
              )}
            </>
          ))}
      </Panel>
    </div>
  );
}

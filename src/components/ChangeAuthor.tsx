import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useInstanceId, useLatestRevision, useRunAuthor } from "@/api/hooks";
import { HeaderDot as Dot, HeaderLabel } from "@/components/ChangeLog";
import { RefLink } from "@/components/RefLink";
import { useAtLink, withAt } from "@/lib/at";
import { lineName, runId } from "@/lib/lines";

/**
 * Who authored a change, for a ChangeLog header. A run's Line, linked as of
 * the change's generation (and to the Line now, when it has been revised
 * since); a run no Line triggered, as its Procedure and the principal who ran
 * it; otherwise the principal. Approvers follow, leaving out the author.
 * One run read per run (kept once read) and one revision read per Line.
 */
export function ChangeAuthor({
  source,
  sequence,
  actor,
  approvers,
}: {
  source: { run: string; procedure: string } | null;
  sequence: number;
  actor: string | null;
  approvers: string[];
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const run = useRunAuthor(source?.run ?? null);
  const line = run.data?.line ?? null;
  const latest = useLatestRevision(line);
  const changedSince = latest.latest !== null && latest.latest.sequence > sequence;
  const runner = run.data?.actor ?? actor;
  const author = line ? null : runner;
  const approved = approvers.filter((principal) => principal !== author);
  const id = source ? runId(source.run) : null;
  const runLink = id && (
    <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(id)}`)} className="font-mono text-zinc-500 hover:text-zinc-200 hover:underline" title={id}>
      {/^RUN-[0-9a-f]{7,}$/.test(id) ? `${id.slice(4, 10)}…` : id}
    </Link>
  );
  const procedure = (run.data?.procedure ?? source?.procedure ?? "").replace(/^Procedure:/, "");
  return (
    <>
      {source && run.isPending && <span className="t-meta animate-pulse">{procedure}</span>}
      {line && (
        <span className="inline-flex flex-wrap items-baseline gap-x-3">
          <HeaderLabel>Line</HeaderLabel>
          <Link
            to={withAt(`/i/${instanceId}/lines/${encodeURIComponent(lineName(line))}`, String(sequence))}
            className="inline-flex items-baseline gap-0.5 font-mono text-zinc-200 hover:underline"
            title={`${lineName(line)} as it was at g${sequence}`}
          >
            {lineName(line)}
            <ArrowUpRight className="relative top-[1px] h-3 w-3 self-center text-zinc-500" aria-hidden />
          </Link>
          {changedSince && (
            <Link
              to={link(`/i/${instanceId}/lines/${encodeURIComponent(lineName(line))}`)}
              className="t-meta hover:text-zinc-200 hover:underline"
              title={`The Line was revised at g${latest.latest!.sequence}, after this change`}
            >
              changed since
            </Link>
          )}
          <Dot />
          <HeaderLabel>Run</HeaderLabel>
          {runLink}
        </span>
      )}
      {source && !line && !run.isPending && (
        <span className="inline-flex flex-wrap items-baseline gap-x-3">
          <HeaderLabel>Procedure</HeaderLabel>
          <RefLink value={`Procedure:${procedure}`} className="font-mono text-[13px]" />
          <Dot />
          <HeaderLabel>Run</HeaderLabel>
          {runLink}
          {/* a run read refused (pruned, or not recorded) leaves the trigger unknown: the principal alone */}
          {runner &&
            (run.data ? (
              <>
                <Dot />
                <HeaderLabel>Direct run by</HeaderLabel>
                <span className="font-mono text-zinc-300">{runner}</span>
              </>
            ) : (
              <span className="font-mono text-zinc-300">{runner}</span>
            ))}
        </span>
      )}
      {!source && actor && (
        <span className="inline-flex items-baseline gap-x-2">
          <HeaderLabel>Author</HeaderLabel>
          <span className="font-mono text-zinc-300">{actor}</span>
        </span>
      )}
      {approved.length > 0 && (
        <>
          <Dot />
          <HeaderLabel>Approved by</HeaderLabel>
          <span className="text-zinc-300">{approved.join(", ")}</span>
        </>
      )}
    </>
  );
}

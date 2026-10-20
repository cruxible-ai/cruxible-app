import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetBatch, useInstanceId, useLines, useMandates, useNext } from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { lineName, nextRowsByLine, runId, unreadOf } from "@/lib/lines";
import { REASONS } from "@/lib/next-reasons";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

type Mandate = Schemas["OrientMandate"];
type RunRow = Schemas["RunRow"];

/**
 * Every Line at the pinned generation: Procedure, trigger, max authority,
 * the Procedure's mandates, enablement, due/waiting work, the last run, and
 * the Line's `next` rows (inbox unread among them) from the first `next` page.
 * Reads: the orient lines and mandates sections, ⌈Lines/64⌉ get-batch calls
 * for the Line cards (last run), one `next` page.
 */
export function LinesScreen() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const lines = useLines();
  const mandates = useMandates();
  const next = useNext({ limit: NEXT_PAGE });
  usePageTitle("Lines");
  const rows = lines.data?.rows ?? [];
  // orient names Lines `Line:<name>`; the app routes and reads by bare name.
  const cards = useGetBatch(rows.map((row) => `Line:${lineName(row.line)}`));
  const lastRun = useMemo(() => {
    const byLine = new Map<string, RunRow>();
    // get-batch answers in request order: result i is rows[i]'s card.
    cards.results.forEach((result, i) => {
      const run = cardOf(result, "line")?.recent_runs?.[0];
      const line = rows[i]?.line;
      if (run && line) byLine.set(lineName(line), run);
    });
    return byLine;
  }, [cards.results, rows]);
  const mandatesByProcedure = useMemo(() => {
    const out = new Map<string, Mandate[]>();
    for (const mandate of mandates.data?.rows ?? []) {
      const key = mandate.procedure.replace(/^Procedure:/, "");
      out.set(key, [...(out.get(key) ?? []), mandate]);
    }
    return out;
  }, [mandates.data]);
  const nextByLine = useMemo(() => nextRowsByLine(next.data?.items ?? []), [next.data]);

  return (
    <div className="max-w-7xl space-y-3">
      <header className="flex flex-wrap items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">Lines</h1>
        {lines.data && <span className="text-[13px] text-zinc-500">{rows.length} Lines</span>}
      </header>
      {lines.isPending && <LoadState />}
      {lines.error && <LoadState error={lines.error} />}
      {lines.data && (
        <Panel title="Lines" meta={next.data?.next_cursor ? <span>next rows from the first page</span> : undefined}>
          {rows.length === 0 && <EmptyState>No Lines.</EmptyState>}
          {rows.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="text-[12px] text-zinc-500">
                  <tr>
                    {["Line", "Procedure", "Trigger", "Max authority", "Mandate", "Enabled", "Work", "Last run", "Inbox", "Next"].map((h) => (
                      <th key={h} className="py-1 pr-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const name = lineName(row.line);
                    const procedure = row.procedure.replace(/^Procedure:/, "");
                    const run = lastRun.get(name);
                    const nextRows = nextByLine.get(name) ?? [];
                    const unread = unreadOf(nextRows);
                    return (
                      <tr key={name} className="border-t border-zinc-900 align-top">
                        <td className="py-1 pr-3">
                          <Link
                            to={link(`/i/${instanceId}/lines/${encodeURIComponent(name)}`)}
                            className="font-mono text-[12px] text-zinc-200 hover:underline"
                          >
                            {name}
                          </Link>
                          {row.lifecycle === "retired" && <span className="ml-1.5 text-[11px] text-zinc-600">retired</span>}
                        </td>
                        <td className="py-1 pr-3">
                          <RefLink value={`Procedure:${procedure}`}>
                            <span className="font-mono text-[12px]">{procedure}</span>
                          </RefLink>
                        </td>
                        <td className="py-1 pr-3 text-zinc-400">{row.trigger}</td>
                        <td className="py-1 pr-3">
                          <Chip value={row.authority} tone={row.authority === "settle" ? "violet" : row.authority === "propose" ? "blue" : "zinc"} />
                        </td>
                        <td className="py-1 pr-3 text-[12px]">
                          {(mandatesByProcedure.get(procedure) ?? []).map((mandate) => (
                            <div key={mandate.mandate}>
                              <span className="font-mono text-zinc-300">{mandate.mandate.replace(/^(Procedure)?Mandate:/, "")}</span>{" "}
                              <span className="text-zinc-500">
                                {mandate.grants} · {mandate.state}
                              </span>
                            </div>
                          ))}
                          {!mandatesByProcedure.has(procedure) && <span className="text-zinc-600">none</span>}
                        </td>
                        <td className="py-1 pr-3">
                          {row.enablement ? <Chip value={row.enablement} tone={row.enablement === "running" ? "green" : row.enablement === "stalled" ? "red" : "zinc"} /> : <span className="text-[12px] text-zinc-600">not enabled</span>}
                        </td>
                        <td className="py-1 pr-3 font-mono text-[12px] text-zinc-400">
                          {row.due ?? 0} due · {row.waiting ?? 0} waiting
                        </td>
                        <td className="py-1 pr-3 text-[12px]">
                          {run ? (
                            <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(runId(run.run))}`)} className="hover:underline">
                              <Chip value={run.status} tone={run.status === "succeeded" ? "green" : run.status === "running" ? "blue" : "red"} />{" "}
                              <span className="text-zinc-500" title={run.started_at}>
                                {formatDateTime(run.started_at)}
                              </span>
                            </Link>
                          ) : cards.isPending ? (
                            <span className="animate-pulse text-zinc-600">…</span>
                          ) : (
                            <span className="text-zinc-600">none</span>
                          )}
                        </td>
                        <td className="py-1 pr-3 font-mono text-[12px]">
                          {unread !== null ? <span className="text-amber-400/90">{unread} unread</span> : <span className="text-zinc-600">—</span>}
                        </td>
                        <td className="py-1 text-[12px] text-zinc-400">
                          {nextRows.map((item) => (
                            <div key={item.item_id}>{REASONS[item.reason].label}</div>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      )}
    </div>
  );
}

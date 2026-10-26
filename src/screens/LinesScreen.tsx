import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetBatch, useInstanceId, useLines, useMandates, useNext } from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip, SignalDot } from "@/components/Chip";
import { DueCount } from "@/screens/LineScreen";
import { Page, PageHeader } from "@/components/Page";
import { Table, Td, Th, trClass } from "@/components/Table";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { lineName, nextRowsByLine, runId, unreadOf } from "@/lib/lines";
import { reasonMeta } from "@/lib/next-reasons";
import { formatWhen } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { term } from "@/lib/vocabulary";

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
    <Page>
      <PageHeader
        title="Lines"
        summary={
          lines.data ? (
            <>
              {rows.length} Lines: {rows.filter((r) => r.enablement === "running").length} running,{" "}
              {rows.filter((r) => r.enablement === "stalled").length} stalled,{" "}
              {rows.filter((r) => r.enablement === "stopped" || r.enablement === "disabled").length} stopped,{" "}
              {rows.filter((r) => !r.enablement).length} not enabled.
            </>
          ) : undefined
        }
      />
      {lines.isPending && <LoadState />}
      {lines.error && <LoadState error={lines.error} />}
      {lines.data && (
        <Panel title="Lines" meta={next.data?.next_cursor ? <span>next rows from the first page</span> : undefined}>
          {rows.length === 0 && <EmptyState>No Lines.</EmptyState>}
          {rows.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <Th title="The Line, and its Procedure when it has another name">Line</Th>
                  <Th>Trigger</Th>
                  <Th title="Max authority">Authority</Th>
                  <Th>Mandate</Th>
                  <Th>Enabled</Th>
                  <Th numeric title="Occurrences due / scheduled">Due / scheduled</Th>
                  <Th>Last run</Th>
                  <Th>Inbox</Th>
                  <Th>Next</Th>
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
                    <tr key={name} className={trClass}>
                      <Td className="whitespace-nowrap">
                        <Link
                          to={link(`/i/${instanceId}/lines/${encodeURIComponent(name)}`)}
                          className="font-mono text-[12px] text-zinc-100 hover:underline"
                        >
                          {name}
                        </Link>
                        {row.lifecycle === "retired" && <span className="t-meta ml-1.5">retired</span>}
                        {procedure !== name && (
                          <div className="t-meta">
                            runs{" "}
                            <RefLink value={`Procedure:${procedure}`}>
                              <span className="font-mono text-[12px] text-zinc-400">{procedure}</span>
                            </RefLink>
                          </div>
                        )}
                      </Td>
                      <Td className="whitespace-nowrap text-zinc-400">{row.trigger.replaceAll("+", " + ")}</Td>
                      <Td>
                        <span className="text-zinc-300" title={term("authority", row.authority).meaning}>{term("authority", row.authority).word}</span>
                      </Td>
                      <Td className="text-[12px]">
                        {(mandatesByProcedure.get(procedure) ?? []).map((mandate) => (
                          <div key={mandate.mandate} className="whitespace-nowrap">
                            <MandateLabel name={mandate.mandate.replace(/^(Procedure)?Mandate:/, "")} procedure={procedure} grants={mandate.grants} />{" "}
                            <span className="text-zinc-500">{term("mandate", mandate.state).word.toLowerCase()}</span>
                          </div>
                        ))}
                        {!mandatesByProcedure.has(procedure) && <span className="text-zinc-500">none</span>}
                      </Td>
                      <Td className="whitespace-nowrap">
                        <Chip concept="line" value={row.enablement ?? "not_enabled"} />
                      </Td>
                      <Td numeric className="whitespace-nowrap text-zinc-500">
                        <DueCount due={row.due ?? 0} scheduled={row.waiting ?? 0} />
                      </Td>
                      <Td className="whitespace-nowrap text-[12px]">
                        {run ? (
                          <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(runId(run.run))}`)} className="hover:underline">
                            <Chip concept="run" value={run.status} />{" "}
                            <span className="text-zinc-500" title={run.started_at}>
                              {formatWhen(run.started_at)}
                            </span>
                          </Link>
                        ) : cards.isPending ? (
                          <span className="animate-pulse text-zinc-500">…</span>
                        ) : (
                          <span className="text-zinc-500">none</span>
                        )}
                      </Td>
                      <Td className="whitespace-nowrap font-mono text-[12px]">
                        {unread !== null ? (
                          <span className="inline-flex items-baseline gap-1.5 text-zinc-300">
                            <SignalDot signal="waiting" title={term("inbox", "unread").meaning} />
                            {unread} unread
                          </span>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </Td>
                      <Td className="text-[12px] text-zinc-400">
                        {/* "Line not enabled" is the Enabled column's word already. */}
                        {nextRows.filter((item) => item.reason !== "line_not_enabled").map((item) => {
                          const severity = term("severity", item.severity);
                          return (
                            <div key={item.item_id} className="flex min-w-[7rem] items-baseline gap-1.5" title={severity.meaning}>
                              {severity.signal && <SignalDot signal={severity.signal} title={severity.meaning} />}
                              {reasonMeta(item.reason).label}
                            </div>
                          );
                        })}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Panel>
      )}
    </Page>
  );
}

/**
 * A mandate named after its Procedure ("<procedure>-propose") shows only
 * what it adds; the full name is on hover. Other names show whole.
 */
function MandateLabel({ name, procedure, grants }: { name: string; procedure: string; grants: string }) {
  const suffix = name.startsWith(`${procedure}-`) ? name.slice(procedure.length + 1) : null;
  if (suffix === null) {
    return (
      <>
        <span className="font-mono text-zinc-300">{name}</span> <span className="text-zinc-500">{grants},</span>
      </>
    );
  }
  return (
    <span title={name}>
      <span className="text-zinc-300">{suffix === grants ? grants : `…-${suffix}`}</span>
      {suffix !== grants && <span className="text-zinc-500"> {grants}</span>}
      <span className="text-zinc-500">,</span>
    </span>
  );
}

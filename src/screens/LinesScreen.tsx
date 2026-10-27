import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetBatch, useInstanceId, useLines, useMandates, useNext } from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip, SignalDot } from "@/components/Chip";
import { DueCount } from "@/screens/LineScreen";
import { Page, PageHeader } from "@/components/Page";
import { DataTable, useTableState, type Column } from "@/components/DataTable";
import { LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { lineName, nextRowsByLine, runId, unreadOf } from "@/lib/lines";
import { reasonMeta } from "@/lib/next-reasons";
import { formatWhen } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { term } from "@/lib/vocabulary";

type Mandate = Schemas["OrientMandate"];
type RunRow = Schemas["RunRow"];
type LineRow = Schemas["OrientLine"];

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
  const nextPartial = Boolean(next.data?.next_cursor);

  const columns = useMemo<Column<LineRow>[]>(() => {
    const nameOf = (row: LineRow) => lineName(row.line);
    const procedureOf = (row: LineRow) => row.procedure.replace(/^Procedure:/, "");
    const mandatesOf = (row: LineRow) => mandatesByProcedure.get(procedureOf(row)) ?? [];
    // "Line not enabled" is the Enabled column's word already.
    const nextOf = (row: LineRow) => (nextByLine.get(nameOf(row)) ?? []).filter((item) => item.reason !== "line_not_enabled");
    const fromFirstPage = nextPartial ? `\nFrom the first page of next (${NEXT_PAGE} rows); later pages are not read here` : "";
    return [
      {
        id: "line",
        header: "Line",
        title: "The Line, and its Procedure when it has another name",
        hideable: false,
        sortValue: nameOf,
        filter: { kind: "text", text: (row) => `${nameOf(row)} ${procedureOf(row)}` },
        className: "whitespace-nowrap",
        cell: (row) => {
          const name = nameOf(row);
          const procedure = procedureOf(row);
          return (
            <>
              <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(name)}`)} className="font-mono text-[12px] text-zinc-100 hover:underline">
                {name}
              </Link>
              {row.lifecycle === "retired" && <span className="t-meta ml-1.5">Retired</span>}
              {procedure !== name && (
                <div className="t-meta">
                  Runs{" "}
                  <RefLink value={`Procedure:${procedure}`}>
                    <span className="font-mono text-[12px] text-zinc-400">{procedure}</span>
                  </RefLink>
                </div>
              )}
            </>
          );
        },
      },
      {
        id: "trigger",
        header: "Trigger",
        sortValue: (row) => row.trigger,
        filter: { kind: "enum", values: (row) => row.trigger.split("+").filter(Boolean) },
        className: "whitespace-nowrap text-zinc-400",
        cell: (row) => row.trigger.replaceAll("+", " + "),
      },
      {
        id: "authority",
        header: "Authority",
        title: "Max authority",
        sortValue: (row) => ["observe", "propose", "settle"].indexOf(row.authority),
        filter: { kind: "enum", values: (row) => [row.authority] },
        options: ["observe", "propose", "settle"],
        optionLabel: (value) => term("authority", value).word,
        cell: (row) => (
          <span className="text-zinc-300" title={term("authority", row.authority).meaning}>
            {term("authority", row.authority).word}
          </span>
        ),
      },
      {
        id: "mandate",
        header: "Mandate",
        sortValue: (row) => mandatesOf(row)[0]?.mandate ?? null,
        filter: { kind: "text", text: (row) => mandatesOf(row).map((m) => `${m.mandate} ${m.grants} ${term("mandate", m.state).word}`).join(" ") || "none" },
        className: "text-[12px]",
        cell: (row) => {
          const procedure = procedureOf(row);
          const mandates = mandatesOf(row);
          if (mandates.length === 0) return <span className="text-zinc-500">None</span>;
          return mandates.map((mandate) => (
            <div key={mandate.mandate} className="whitespace-nowrap">
              <MandateLabel name={mandate.mandate.replace(/^(Procedure)?Mandate:/, "")} procedure={procedure} grants={mandate.grants} />{" "}
              <span className="text-zinc-500">{term("mandate", mandate.state).word.toLowerCase()}</span>
            </div>
          ));
        },
      },
      {
        id: "enabled",
        header: "Enabled",
        sortValue: (row) => term("line", row.enablement ?? "not_enabled").word,
        filter: { kind: "enum", values: (row) => [row.enablement ?? "not_enabled"] },
        optionLabel: (value) => term("line", value).word,
        className: "whitespace-nowrap",
        cell: (row) => <Chip concept="line" value={row.enablement ?? "not_enabled"} />,
      },
      {
        id: "due",
        header: "Due / scheduled",
        title: "Occurrences due / scheduled",
        numeric: true,
        sortValue: (row) => (row.due ?? 0) * 1_000_000 + (row.waiting ?? 0),
        className: "whitespace-nowrap text-zinc-500",
        cell: (row) => <DueCount due={row.due ?? 0} scheduled={row.waiting ?? 0} />,
      },
      {
        id: "last_run",
        header: "Last run",
        title: "The newest run: its outcome and when it started",
        sortValue: (row) => lastRun.get(nameOf(row))?.started_at ?? null,
        filter: { kind: "enum", values: (row) => { const run = lastRun.get(nameOf(row)); return run ? [term("run", run.status).word] : ["None"]; } },
        className: "whitespace-nowrap text-[12px]",
        cell: (row) => {
          const run = lastRun.get(nameOf(row));
          if (run) {
            return (
              <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(runId(run.run))}`)} className="hover:underline">
                <Chip concept="run" value={run.status} />{" "}
                <span className="text-zinc-500" title={run.started_at}>
                  {formatWhen(run.started_at)}
                </span>
              </Link>
            );
          }
          return cards.isPending ? <span className="animate-pulse text-zinc-500">…</span> : <span className="text-zinc-500">None</span>;
        },
      },
      {
        id: "inbox",
        header: "Inbox",
        title: `Unread inbox items${fromFirstPage}`,
        numeric: true,
        sortValue: (row) => unreadOf(nextByLine.get(nameOf(row))),
        className: "whitespace-nowrap font-mono text-[12px]",
        cell: (row) => {
          const unread = unreadOf(nextByLine.get(nameOf(row)));
          return unread !== null ? (
            <span className="inline-flex items-baseline gap-1.5 text-zinc-300">
              <SignalDot signal="waiting" title={term("inbox", "unread").meaning} />
              {unread} unread
            </span>
          ) : (
            <span className="text-zinc-600">—</span>
          );
        },
      },
      {
        id: "next",
        header: "Next",
        title: `The Line's next rows${fromFirstPage}`,
        sortValue: (row) => nextOf(row).length,
        filter: { kind: "enum", values: (row) => nextOf(row).map((item) => reasonMeta(item.reason).label) },
        className: "text-[12px] text-zinc-400",
        cell: (row) =>
          nextOf(row).map((item) => {
            const severity = term("severity", item.severity);
            return (
              <div key={item.item_id} className="flex min-w-[7rem] items-baseline gap-1.5" title={severity.meaning}>
                {severity.signal && <SignalDot signal={severity.signal} title={severity.meaning} />}
                {reasonMeta(item.reason).label}
              </div>
            );
          }),
      },
    ];
  }, [cards.isPending, instanceId, lastRun, link, mandatesByProcedure, nextByLine, nextPartial]);
  const [state] = useTableState(columns);
  // a sort or filter on the next-derived columns reads only the first next page
  const byNext = nextPartial && (["inbox", "next"].includes(state.sort?.column ?? "") || ["next"].some((id) => state.filters[id]));

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
        <Panel title="Lines" meta={nextPartial ? <span>Next rows from the first page</span> : undefined}>
          <DataTable
            rows={rows}
            columns={columns}
            rowKey={(row) => row.line}
            label="Lines"
            partial={lines.data.truncated ? `the first ${rows.length} Lines the daemon listed` : null}
            note={byNext ? `Inbox and Next come from the first page of next (${NEXT_PAGE} rows), so this order or filter covers only what that page says.` : undefined}
            empty="No Lines."
          />
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

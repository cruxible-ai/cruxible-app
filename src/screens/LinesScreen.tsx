import { useMemo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useGetBatch, useInstanceId, useLines, useMandates, useNext } from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip, SignalDot } from "@/components/Chip";
import { AuthorityBar, AuthorityLegend } from "@/components/AuthorityLegend";
import { Stat, StatsRow } from "@/components/StatsRow";
import { DueCount } from "@/screens/LineScreen";
import { LineStateDot } from "@/components/LineStateDot";
import { Page, PageHeader } from "@/components/Page";
import { DataTable, useTableState, type Column } from "@/components/DataTable";
import { LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { lineName, nextRowsByLine, runId, unreadOf } from "@/lib/lines";
import { reasonMeta } from "@/lib/next-reasons";
import { nodeId, shortNames, type FlowModel } from "@/lib/evidence-flow";
import { formatDateTime, formatRelative } from "@/lib/text";
import { useFlowModel } from "@/lib/useFlowModel";
import { usePageTitle } from "@/lib/usePageTitle";
import { term } from "@/lib/vocabulary";

type Mandate = Schemas["OrientMandate"];
type RunRow = Schemas["RunRow"];
type LineRow = Schemas["OrientLine"];

/** Line states in the order the table groups them: what runs first, what was never enabled last. */
const STATE_ORDER = ["running", "stalled", "stopped", "disabled", "not_enabled"];
const stateOf = (row: LineRow) => row.enablement ?? "not_enabled";
const stateRank = (row: LineRow) => {
  const i = STATE_ORDER.indexOf(stateOf(row));
  return i < 0 ? STATE_ORDER.length - 1 : i;
};

/**
 * Every Line at the pinned generation, read like its Evidence flow card: what
 * starts it, what it ends in (the ClaimTypes it proposes or settles, the
 * sources it lands, its inbox; in its authority's color), its last run, and
 * what needs a person (its `next` rows and unread inbox, from the first `next`
 * page). Running Lines first; Procedure, mandates, max
 * authority and due work are columns to switch on. Reads: the evidence-flow
 * model (useFlowModel), the orient lines and mandates sections, ⌈Lines/64⌉
 * get-batch calls for the Line cards (last run), one `next` page.
 */
export function LinesScreen() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const lines = useLines();
  const mandates = useMandates();
  const flow = useFlowModel();
  const next = useNext({ limit: NEXT_PAGE });
  usePageTitle("Lines");
  const rows = useMemo(
    () => [...(lines.data?.rows ?? [])].sort((a, b) => stateRank(a) - stateRank(b) || (lineName(a.line) < lineName(b.line) ? -1 : 1)),
    [lines.data],
  );
  const short = useMemo(() => shortNames(rows.map((row) => lineName(row.line))), [rows]);
  const ends = useMemo(() => (flow.model ? endsOf(flow.model) : null), [flow.model]);
  // orient names Lines `Line:<name>`; the app routes and reads by bare name.
  // Cards in the daemon's order, not the table's: the same request (and cache entry) as every other reader.
  const listed = useMemo(() => lines.data?.rows ?? [], [lines.data]);
  const cards = useGetBatch(listed.map((row) => `Line:${lineName(row.line)}`));
  const lastRun = useMemo(() => {
    const byLine = new Map<string, RunRow>();
    // get-batch answers in request order: result i is listed[i]'s card.
    cards.results.forEach((result, i) => {
      const run = cardOf(result, "line")?.recent_runs?.[0];
      const line = listed[i]?.line;
      if (run && line) byLine.set(lineName(line), run);
    });
    return byLine;
  }, [cards.results, listed]);
  const inProgress = rows.filter((row) => lastRun.get(lineName(row.line))?.status === "running").length;
  const mandatesByLine = useMemo(() => {
    const out = new Map<string, Mandate[]>();
    for (const mandate of mandates.data?.rows ?? []) {
      const key = lineName(mandate.line);
      out.set(key, [...(out.get(key) ?? []), mandate]);
    }
    return out;
  }, [mandates.data]);
  const nextByLine = useMemo(() => nextRowsByLine(next.data?.items ?? []), [next.data]);
  const triggersOf = useMemo(() => (row: LineRow) => flow.triggerWords.get(lineName(row.line)), [flow.triggerWords]);
  const nextPartial = Boolean(next.data?.next_cursor);

  const columns = useMemo<Column<LineRow>[]>(() => {
    const nameOf = (row: LineRow) => lineName(row.line);
    const procedureOf = (row: LineRow) => row.procedure.replace(/^Procedure:/, "");
    const mandatesOf = (row: LineRow) => mandatesByLine.get(nameOf(row)) ?? [];
    // "Line not enabled" is the Enabled column's word already.
    const nextOf = (row: LineRow) => (nextByLine.get(nameOf(row)) ?? []).filter((item) => item.reason !== "line_not_enabled");
    const fromFirstPage = nextPartial ? `\nFrom the first page of next (${NEXT_PAGE} rows); later pages are not read here` : "";
    const anyNeeds = rows.some((row) => nextOf(row).length > 0 || unreadOf(nextByLine.get(nameOf(row))));
    const columns: (Column<LineRow> | null)[] = [
      {
        id: "line",
        header: "Line",
        title: "The Line, with its state: running, stalled, stopped or not enabled",
        hideable: false,
        sortValue: nameOf,
        filter: { kind: "text", text: (row) => `${nameOf(row)} ${procedureOf(row)}` },
        className: "whitespace-nowrap",
        cell: (row) => {
          const name = nameOf(row);
          return (
            <span className="inline-flex items-baseline gap-2">
              <LineStateDot state={row.enablement ?? null} running={lastRun.get(name)?.status === "running"} />
              <Link
                to={link(`/i/${instanceId}/lines/${encodeURIComponent(name)}`)}
                title={name}
                className="font-mono text-[12px] text-zinc-100 hover:underline"
              >
                {short.label(name)}
              </Link>
              {row.lifecycle === "retired" && <span className="t-meta">Retired</span>}
            </span>
          );
        },
      },
      {
        id: "starts",
        header: "Starts on",
        title: "Its Triggers in words: a source landing, a schedule; none means it runs when someone runs it",
        sortValue: (row) => triggersOf(row)?.[0] ?? row.trigger,
        filter: { kind: "text", text: (row) => (triggersOf(row) ?? [row.trigger]).join(" ") },
        className: "text-[12px] text-zinc-300",
        cell: (row) => <StartsOn words={triggersOf(row)} fallback={row.trigger.replaceAll("+", " + ")} />,
      },
      {
        id: "ends",
        header: "Ends in",
        title: "What a run leaves: the ClaimTypes it proposes or settles, the sources it lands, its inbox; in its authority's color",
        sortValue: (row) => ["observe", "propose", "settle"].indexOf(row.authority),
        filter: {
          kind: "text",
          text: (row) => {
            const end = ends?.get(nameOf(row));
            return end ? [...end.claimTypes.map((c) => c.name), ...end.lands, end.inbox ? "inbox" : ""].join(" ") : "";
          },
        },
        className: "min-w-[14rem] text-[12px]",
        cell: (row) =>
          ends ? (
            <EndsIn end={ends.get(nameOf(row))} authority={row.authority} />
          ) : flow.error ? null : (
            <span className="animate-pulse text-zinc-500">…</span>
          ),
      },
      {
        id: "last_run",
        header: "Last run",
        title: "The newest run: its outcome and when it started",
        sortValue: (row) => lastRun.get(nameOf(row))?.started_at ?? null,
        filter: {
          kind: "enum",
          values: (row) => {
            const run = lastRun.get(nameOf(row));
            return run ? [term("run", run.status).word] : ["Never run"];
          },
        },
        className: "whitespace-nowrap text-[12px]",
        cell: (row) => {
          const run = lastRun.get(nameOf(row));
          if (run) {
            return (
              <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(runId(run.run))}`)} className="hover:underline">
                <Chip concept="run" value={run.status} />{" "}
                <span className="text-zinc-500" title={formatDateTime(run.started_at)}>
                  {formatRelative(run.started_at)}
                </span>
              </Link>
            );
          }
          return cards.isPending ? (
            <span className="animate-pulse text-zinc-500">…</span>
          ) : (
            <span className="text-zinc-500">Never run</span>
          );
        },
      },
      !anyNeeds
        ? null
        : {
            id: "needs",
            header: "Needs you",
            title: `Its next rows and unread inbox items${fromFirstPage}`,
            sortValue: (row) => nextOf(row).length + (unreadOf(nextByLine.get(nameOf(row))) ?? 0),
            filter: { kind: "enum", values: (row) => nextOf(row).map((item) => reasonMeta(item.reason).label) },
            className: "text-[12px] text-zinc-300",
            cell: (row) => {
              const unread = unreadOf(nextByLine.get(nameOf(row)));
              const items = nextOf(row).filter((item) => item.reason !== "line_inbox_unread");
              if (items.length === 0 && !unread) return null;
              return (
                <span className="flex flex-col gap-0.5">
                  {items.map((item) => {
                    const severity = term("severity", item.severity);
                    return (
                      <span key={item.item_id} className="inline-flex items-baseline gap-1.5" title={severity.meaning}>
                        {severity.signal && <SignalDot signal={severity.signal} title={severity.meaning} />}
                        {reasonMeta(item.reason).label}
                      </span>
                    );
                  })}
                  {unread ? (
                    <span className="inline-flex items-baseline gap-1.5">
                      <SignalDot signal="waiting" title={term("inbox", "unread").meaning} />
                      Inbox: {unread} unread
                    </span>
                  ) : null}
                </span>
              );
            },
          },
      {
        id: "procedure",
        header: "Procedure",
        defaultHidden: true,
        sortValue: procedureOf,
        filter: { kind: "text", text: procedureOf },
        className: "whitespace-nowrap",
        cell: (row) => (
          <RefLink value={`Procedure:${procedureOf(row)}`}>
            <span className="font-mono text-[12px] text-zinc-400">{short.label(procedureOf(row))}</span>
          </RefLink>
        ),
      },
      {
        id: "state",
        header: "State",
        defaultHidden: true,
        sortValue: stateRank,
        filter: { kind: "enum", values: (row) => [stateOf(row)] },
        optionLabel: (value) => term("line", value).word,
        className: "whitespace-nowrap",
        cell: (row) => <Chip concept="line" value={stateOf(row)} />,
      },
      {
        id: "authority",
        header: "Authority",
        title: "Max authority",
        defaultHidden: true,
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
        defaultHidden: true,
        sortValue: (row) => mandatesOf(row)[0]?.mandate ?? null,
        filter: {
          kind: "text",
          text: (row) =>
            mandatesOf(row)
              .map((m) => `${m.mandate} ${m.grants} ${term("mandate", m.state).word}`)
              .join(" ") || "none",
        },
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
        id: "due",
        header: "Due / scheduled",
        title: "Occurrences due / scheduled",
        defaultHidden: true,
        numeric: true,
        sortValue: (row) => (row.due ?? 0) * 1_000_000 + (row.waiting ?? 0),
        className: "whitespace-nowrap text-zinc-500",
        cell: (row) => <DueCount due={row.due ?? 0} scheduled={row.waiting ?? 0} />,
      },
    ];
    return columns.filter((column): column is Column<LineRow> => column !== null);
  }, [cards.isPending, ends, flow.error, instanceId, lastRun, link, mandatesByLine, nextByLine, nextPartial, rows, short, triggersOf]);
  const [state] = useTableState(columns);
  // a sort or filter on the next-derived columns reads only the first next page
  const byNext = nextPartial && (state.sort?.column === "needs" || Boolean(state.filters["needs"]));

  return (
    <Page>
      <PageHeader
        title="Lines"
        summary={
          lines.data ? (
            <>
              What starts each Line, what it ends in, and how its last run went.
              <StatsRow>
                <Stat n={rows.length} label={rows.length === 1 ? "Line" : "Lines"} />
                {STATE_ORDER.map((state) => {
                  const n = rows.filter((row) => stateOf(row) === state).length;
                  return n > 0 ? <Stat key={state} n={n} label={term("line", state).word.toLowerCase()} /> : null;
                })}
                {inProgress > 0 && <Stat n={inProgress} label="running now" />}
                {short.prefix && (
                  <span>
                    Names under <span className="font-mono text-zinc-300">{short.prefix}</span>
                  </span>
                )}
              </StatsRow>
              <AuthorityLegend byHand={false} />
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
            note={
              byNext
                ? `Inbox and Next come from the first page of next (${NEXT_PAGE} rows), so this order or filter covers only what that page says.`
                : undefined
            }
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

/** What a Line ends in, read off the evidence flow: the ClaimTypes it writes, the sources it lands, its inbox. */
interface LineEnd {
  claimTypes: { name: string; predicate: string }[];
  lands: string[];
  inbox: boolean;
}

function endsOf(model: FlowModel): Map<string, LineEnd> {
  const byId = new Map(model.nodes.map((node) => [node.id, node] as const));
  const out = new Map<string, LineEnd>();
  const entry = (line: string) => {
    let end = out.get(line);
    if (!end) out.set(line, (end = { claimTypes: [], lands: [], inbox: false }));
    return end;
  };
  for (const edge of model.edges) {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) continue;
    if (from.kind === "source" && to.kind === "line" && edge.lands) entry(to.label).lands.push(from.label);
    if (from.kind === "line" && to.kind === "claim_type")
      entry(from.label).claimTypes.push({ name: to.label, predicate: to.detail ?? to.label });
    if (from.kind === "line" && to.id === nodeId.inbox) entry(from.label).inbox = true;
  }
  return out;
}

const VERB: Record<string, string> = { settle: "settles", propose: "proposes" };

/** A Line's end in its authority's color: "proposes KEV listing +1", "lands cisa.kev.catalog", "inbox". */
function EndsIn({ end, authority }: { end: LineEnd | undefined; authority: string }) {
  const parts: ReactNode[] = [];
  if (end?.claimTypes.length) {
    const [first, ...more] = end.claimTypes;
    parts.push(
      <span key="claims" title={end.claimTypes.map((c) => c.name).join(", ")}>
        <span className="text-zinc-500">{VERB[authority] ?? "writes"}</span>{" "}
        <RefLink value={`ClaimType:${first!.predicate}`}>
          <span className="text-zinc-200">{first!.name}</span>
        </RefLink>
        {more.length > 0 && <span className="text-zinc-500"> +{more.length}</span>}
      </span>,
    );
  }
  if (end?.lands.length) {
    parts.push(
      <span key="lands" title={end.lands.join(", ")}>
        <span className="text-zinc-500">lands</span> <span className="font-mono text-zinc-200">{end.lands[0]}</span>
        {end.lands.length > 1 && <span className="text-zinc-500"> +{end.lands.length - 1}</span>}
      </span>,
    );
  }
  if (end?.inbox) {
    parts.push(
      <span key="inbox" className="text-zinc-200">
        <span className="text-zinc-500">posts to</span> its inbox
      </span>,
    );
  }
  if (parts.length === 0)
    return (
      <span className="text-zinc-600" title="Nothing it writes reaches the evidence flow">
        —
      </span>
    );
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="relative top-[1px]">
        <AuthorityBar authority={authority} />
      </span>
      <span className="flex flex-wrap gap-x-2">
        {parts.map((part, i) => (
          <span key={i}>
            {i > 0 && <span className="text-zinc-600">· </span>}
            {part}
          </span>
        ))}
      </span>
    </span>
  );
}

/** A Line's Triggers in words: the first, and how many more; "none" when nothing starts it but a person. */
function StartsOn({ words, fallback }: { words: readonly string[] | null | undefined; fallback: string }) {
  if (words === undefined || words === null) return <span className="text-zinc-500">{fallback}</span>;
  if (words.length === 0)
    return (
      <span className="text-zinc-500" title="No Trigger: it runs when someone runs it">
        none
      </span>
    );
  return (
    <span title={words.join("; ")}>
      {words[0]}
      {words.length > 1 && <span className="text-zinc-500"> +{words.length - 1}</span>}
    </span>
  );
}

import { Fragment, useCallback, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useCards, useInstanceId, useKits, useLines, useNext, useOrient, useSourceModel } from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import type { NextHealth, NextResult, NextSeverity, OrientResult, Schemas } from "@/api/schemas";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Chip, HealthChip, SignalDot } from "@/components/Chip";
import { Fact, Page, PageHeader } from "@/components/Page";
import { Disclosure, EmptyState, LoadState, Panel } from "@/components/Panel";
import { useAtLink } from "@/lib/at";
import { sharedPrefix } from "@/lib/evidence-flow";
import { lineName, nextRowsByLine, unreadOf } from "@/lib/lines";
import { wakeOf, type Wake } from "@/lib/schedule";
import { formatDateTime, formatRelative, humanize, sentence } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { healthTone, term, type Signal } from "@/lib/vocabulary";

type OrientLine = Schemas["OrientLine"];
type LineCard = Schemas["GetLineCard"];

/**
 * Orientation point at the pinned generation, built around what changes: what
 * needs you now (proposals, inbox, next items, Lines, health), and what each
 * running Line is waiting for and when it next wakes. The state's size is one
 * line in the header; kinds live in the sidebar.
 */
export function OverviewScreen() {
  const orient = useOrient();
  const next = useNext({ limit: NEXT_PAGE });
  const lines = useLines();
  const [showHealth, setShowHealth] = useState(false);
  // Line names without the namespace every Line shares, for the feed and Coming up alike.
  const linePrefix = sharedPrefix((lines.data?.rows ?? []).map((row) => lineName(row.line)));
  const lineLabel = useCallback((name: string) => (name.startsWith(linePrefix) ? name.slice(linePrefix.length) : name), [linePrefix]);
  usePageTitle("Overview");

  if (orient.isPending) return <LoadState />;
  if (orient.error) return <LoadState error={orient.error} />;
  const o = orient.data;

  return (
    <Page>
      <PageHeader
        title="Overview"
        summary={<StateLine orient={o} />}
        facts={
          <>
            <Fact label="Generation">
              <span className="font-mono">{o.generation}</span>
            </Fact>
            <Fact label="Accepted" title={o.accepted_at}>
              {formatDateTime(o.accepted_at)} <span className="text-zinc-500">({formatRelative(o.accepted_at)})</span>
            </Fact>
            {o.floor && (
              <Fact label="Floor">
                <span className="font-mono">{o.floor.at}</span>
                {o.floor.generations_behind != null && ` (${o.floor.generations_behind} behind)`}
              </Fact>
            )}
            {o.you?.actor && <Fact label="Reading as">{o.you.actor}</Fact>}
          </>
        }
      />

      <NeedsYou orient={o} next={next.data} onHealth={() => setShowHealth((v) => !v)} healthOpen={showHealth} />

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,32rem)]">
        <ActivityFeed label={lineLabel} />
        <div className="space-y-5">
          <ComingUp rows={lines.data?.rows} pending={lines.isPending} error={lines.error} />
          {(showHealth || unhealthy(next.data).length > 0) && <HealthPanel next={next.data} pending={next.isPending} error={next.error} />}
          <KitsPanel />
        </div>
      </div>
    </Page>
  );
}

/** The state's size in one line: Claims (conflicts flagged) and what defines it. */
function StateLine({ orient }: { orient: OrientResult }) {
  const a = orient.artifacts;
  const claims = a?.claims;
  const kinds = orient.kinds ?? [];
  const n = (value: number | undefined) => <span className="font-mono text-zinc-100">{value ?? 0}</span>;
  const plural = (value: number | undefined, word: string) => (value === 1 ? word : `${word}s`);
  return (
    <span>
      {n(claims?.accepted)} accepted {plural(claims?.accepted, "Claim")}
      {(claims?.conflicted ?? 0) > 0 && (
        <>
          {" "}
          (<SignalDot signal="wrong" title={term("claim", "conflicted").meaning} /> {n(claims!.conflicted)} conflicted)
        </>
      )}{" "}
      on {n(kinds.filter((k) => k.subjects > 0).length)} of {kinds.length} Subject kinds · {n(a?.claim_types)} ClaimTypes ·{" "}
      {n(a?.lines)} {plural(a?.lines, "Line")} · {n(a?.procedures)} {plural(a?.procedures, "Procedure")} · {n(a?.captures)}{" "}
      {plural(a?.captures, "Capture")}
    </span>
  );
}

// -- needs you ----------------------------------------------------------------

const SEVERITIES: NextSeverity[] = ["blocking", "repair", "warning"];

/** Health rows next reports, in reading order. */
const HEALTH_ROWS = [
  "instance",
  "floor",
  "ledger_mirror",
  "provider_lane",
  "procedure_catalog",
  "compiler",
  "line_dispatch",
  "consumers",
  "triggers",
] as const;

function unhealthy(next: NextResult | undefined) {
  const status = next?.status;
  if (!status) return [];
  return HEALTH_ROWS.filter((row) => {
    const tone = healthTone(status[row].state);
    return tone === "waiting" || tone === "wrong";
  });
}

/**
 * One strip of tiles, each a count and where to act on it. A tile is amber or
 * red only while its count says something needs doing; at zero it is quiet.
 */
function NeedsYou({
  orient,
  next,
  onHealth,
  healthOpen,
}: {
  orient: OrientResult;
  next: NextResult | undefined;
  onHealth: () => void;
  healthOpen: boolean;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const attention = orient.attention;
  const proposals = attention?.open_proposals ?? 0;
  const items = next?.items ?? [];
  const bySeverity = new Map(SEVERITIES.map((s) => [s, items.filter((item) => item.severity === s).length]));
  const unread = [...nextRowsByLine(items).values()].reduce((sum, rows) => sum + (unreadOf(rows) ?? 0), 0);
  const enablements = attention?.enablements;
  const stalled = enablements?.stalled ?? 0;
  const stopped = enablements?.stopped ?? 0;
  const sick = unhealthy(next);
  const nextSignal: Signal | undefined = bySeverity.get("blocking") ? "wrong" : bySeverity.get("repair") ? "waiting" : undefined;
  const severityWords = SEVERITIES.flatMap((s) => {
    const n = bySeverity.get(s) ?? 0;
    return n ? [`${n} ${term("severity", s).word.toLowerCase()}${n === 1 || s === "blocking" ? "" : "s"}`] : [];
  });
  const partial = next && next.total_items > items.length;

  return (
    <section aria-label="Needs you" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      <Tile
        label="Waiting for review"
        count={proposals}
        signal={proposals ? "waiting" : undefined}
        detail={proposals ? "Approve or reject on the CLI or MCP" : "No open proposals"}
        to={link(`/i/${instanceId}/proposals?status=open`)}
      />
      <Tile
        label="Unread inbox"
        count={next ? unread : null}
        signal={unread ? "waiting" : undefined}
        detail={unread ? "Items Lines posted for you" : "Nothing posted"}
        to={link(`/i/${instanceId}/lines`)}
      />
      <Tile
        label="Next"
        count={next ? next.total_items : null}
        signal={nextSignal}
        detail={next ? (severityWords.length ? `${severityWords.join(", ")}${partial ? " on the first page" : ""}` : "Nothing needs attention") : undefined}
        to={link(`/i/${instanceId}/next`)}
      />
      <Tile
        label="Lines"
        // orient omits enablements while no Line is enabled: none running.
        count={enablements?.running ?? 0}
        countWord="running"
        signal={stalled ? "wrong" : stopped ? "waiting" : undefined}
        detail={stalled || stopped ? `${stalled} stalled · ${stopped} stopped` : "None stalled or stopped"}
        to={link(`/i/${instanceId}/lines`)}
      />
      <Tile
        label="Health"
        count={next ? sick.length : null}
        countWord={sick.length ? "need a look" : undefined}
        headline={next && sick.length === 0 ? "Healthy" : undefined}
        signal={sick.some((row) => healthTone(next!.status[row].state) === "wrong") ? "wrong" : sick.length ? "waiting" : undefined}
        healthy={next !== undefined && sick.length === 0}
        detail={sick.length ? sick.map(humanize).join(", ") : `${HEALTH_ROWS.length} checks · ${healthOpen ? "Hide" : "Show"}`}
        onClick={onHealth}
        pressed={healthOpen}
      />
    </section>
  );
}

function Tile({
  label,
  count,
  countWord,
  signal,
  detail,
  to,
  onClick,
  pressed,
  healthy = false,
  headline,
}: {
  label: string;
  count: number | null;
  countWord?: string | undefined;
  signal: Signal | undefined;
  detail: ReactNode;
  to?: string;
  onClick?: () => void;
  pressed?: boolean;
  healthy?: boolean;
  /** A status word in place of the count (Health's "Healthy"), in its tone's color. */
  headline?: string | undefined;
}) {
  const ring = signal === "wrong" ? "border-red-500/50" : signal === "waiting" ? "border-amber-400/50" : "border-zinc-800";
  const body = (
    <>
      <div className="flex items-center gap-1.5 text-[12px] text-zinc-400">
        {signal && <SignalDot signal={signal} title={signal === "wrong" ? "Wrong or blocked" : "Waiting on you"} />}
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        {headline ? (
          <span className={`text-[18px] font-medium leading-none ${healthy ? "text-emerald-400" : "text-zinc-100"}`}>{headline}</span>
        ) : count === null ? (
          <span className="text-zinc-600">…</span>
        ) : (
          <>
            <span className={`font-mono text-[22px] leading-none ${count || signal ? "text-zinc-100" : "text-zinc-500"}`}>{count}</span>
            {countWord && <span className="text-[13px] text-zinc-400">{countWord}</span>}
          </>
        )}
      </div>
      {detail && <div className="mt-1 truncate text-[12px] text-zinc-500">{detail}</div>}
    </>
  );
  const className = `block border ${ring} bg-zinc-900/25 px-3.5 py-2.5 hover:bg-zinc-900/60`;
  return to === undefined ? (
    <button type="button" onClick={onClick} aria-pressed={pressed} className={`${className} w-full text-left`}>
      {body}
    </button>
  ) : (
    <Link to={to} className={className}>
      {body}
    </Link>
  );
}

// -- coming up ----------------------------------------------------------------

interface Upcoming {
  name: string;
  row: OrientLine;
  card: LineCard | undefined;
  wakes: Wake[];
  /** Soonest time something is due: a due occurrence (now), a scheduled one, or the next cron fire. */
  soonest: Date | null;
  due: boolean;
}

const enabled = (row: OrientLine) => row.enablement != null && row.enablement !== "disabled";

/**
 * Each enabled Line: what wakes it, when it next does, and how its last run
 * went, as chains: a Line woken by a landing sits under the enabled Line that
 * retains that source (epss-daily, then epss-triage when first.epss.daily
 * lands), so a schedule and what it sets off read as one timeline. Chains with
 * due work first, then soonest. A Line with a schedule of its own heads its own
 * chain and is listed under its feeders by name. Lines not enabled fold into
 * one line.
 */
function ComingUp({ rows, pending, error }: { rows: OrientLine[] | undefined; pending: boolean; error: Error | null }) {
  const live = (rows ?? []).filter((row) => row.lifecycle === "live");
  const on = live.filter(enabled);
  const off = live.filter((row) => !enabled(row));
  const cards = useCards(on.map((row) => `Line:${lineName(row.line)}`));
  const sourceModel = useSourceModel();
  const prefix = sharedPrefix(live.map((row) => lineName(row.line)));
  const now = new Date();

  const upcoming: Upcoming[] = on.map((row, i) => {
    const card = (cards[i]?.card ?? undefined) as LineCard | undefined;
    const wakes = (card?.triggers ?? []).map((t) => wakeOf(t.fires, now));
    const scheduled = (card?.occurrences ?? []).map((o) => new Date(o.eligible_at));
    const due = (row.due ?? 0) > 0 || (card?.occurrences ?? []).some((o) => o.state === "due");
    const times = [...scheduled, ...wakes.flatMap((w) => (w.next ? [w.next] : []))].sort((a, b) => a.getTime() - b.getTime());
    return { name: lineName(row.line), row, card, wakes, soonest: due ? now : (times[0] ?? null), due };
  });
  const chains = chainUpcoming(upcoming, sourceModel.data?.retentions ?? []);

  return (
    <Panel
      title="Coming up"
      meta={rows ? <span>{on.length} of {live.length} Lines enabled</span> : undefined}
    >
      {pending && <LoadState />}
      {error && <LoadState error={error} />}
      {rows && on.length === 0 && <EmptyState>No Line is enabled, so nothing runs on its own.</EmptyState>}
      {chains.length > 0 && (
        <div className="divide-y divide-zinc-800/60">
          {chains.map((chain) => (
            <ChainRows key={chain.u.name} chain={chain} prefix={prefix} now={now} depth={0} />
          ))}
        </div>
      )}
      {off.length > 0 && (
        <div className="mt-2">
          <Disclosure label={`${off.length} ${off.length === 1 ? "Line is" : "Lines are"} not enabled`}>
            <LineLinks names={off.map((row) => lineName(row.line))} prefix={prefix} />
          </Disclosure>
        </div>
      )}
    </Panel>
  );
}

interface Chain {
  u: Upcoming;
  /** Lines this one's landings wake, in the order they run (soonest first). */
  next: Chain[];
  /** Lines with a schedule of their own that this one also wakes (shown by name, not nested). */
  alsoWakes: string[];
  /** When this Line next runs if it only follows its feeder: the feeder's next time. */
  after: { name: string; at: Date | null } | null;
}

/**
 * Chains of enabled Lines: a Line whose every wake is a landing goes under the
 * enabled Line that retains the first source it waits on; anything else heads
 * a chain. Roots sort due-first (a chain is due when any member is), then by
 * soonest.
 */
function chainUpcoming(upcoming: Upcoming[], retentions: readonly { source: string | null; line: string | null }[]): Chain[] {
  const byName = new Map(upcoming.map((u) => [u.name, u] as const));
  const producers = new Map<string, string[]>();
  for (const r of retentions) {
    if (r.source === null || r.line === null || !byName.has(r.line)) continue;
    const list = producers.get(r.source) ?? [];
    if (!list.includes(r.line)) list.push(r.line);
    producers.set(r.source, list);
  }
  const feedersOf = (u: Upcoming) =>
    [...new Set(u.wakes.flatMap((w) => w.sources.flatMap((source) => producers.get(source) ?? [])))].filter((n) => n !== u.name);
  const onlyLandings = (u: Upcoming) => u.wakes.length > 0 && u.wakes.every((w) => w.landing);

  const parent = new Map<string, string>();
  for (const u of upcoming) {
    if (!onlyLandings(u)) continue;
    const feeder = feedersOf(u).sort(bySoonest(byName))[0];
    if (feeder !== undefined) parent.set(u.name, feeder);
  }
  // A cycle (a Line woken by its own descendant) breaks at its first member: that one heads the chain.
  for (const name of [...parent.keys()]) {
    const seen = new Set<string>([name]);
    let cursor = parent.get(name);
    while (cursor !== undefined && !seen.has(cursor)) {
      seen.add(cursor);
      cursor = parent.get(cursor);
    }
    if (cursor !== undefined) parent.delete(name);
  }

  const build = (u: Upcoming): Chain => {
    const kids = upcoming
      .filter((c) => parent.get(c.name) === u.name)
      .sort((a, b) => bySoonest(byName)(a.name, b.name))
      .map((c) => build(c));
    const alsoWakes = upcoming
      .filter((c) => !parent.has(c.name) && c.name !== u.name && feedersOf(c).includes(u.name))
      .map((c) => c.name)
      .sort();
    const feeder = parent.get(u.name);
    return {
      u,
      next: kids,
      alsoWakes,
      after: feeder === undefined ? null : { name: feeder, at: byName.get(feeder)?.soonest ?? null },
    };
  };
  const dueIn = (c: Chain): boolean => c.u.due || c.next.some(dueIn);
  const roots = upcoming.filter((u) => !parent.has(u.name)).map((u) => build(u));
  return roots.sort((a, b) => {
    const ad = dueIn(a);
    const bd = dueIn(b);
    if (ad !== bd) return ad ? -1 : 1;
    const at = a.u.soonest?.getTime() ?? Infinity;
    const bt = b.u.soonest?.getTime() ?? Infinity;
    return at !== bt ? at - bt : a.u.name.localeCompare(b.u.name);
  });
}

const bySoonest = (byName: Map<string, Upcoming>) => (a: string, b: string) => {
  const at = byName.get(a)?.soonest?.getTime() ?? Infinity;
  const bt = byName.get(b)?.soonest?.getTime() ?? Infinity;
  return at !== bt ? at - bt : a.localeCompare(b);
};

function ChainRows({ chain, prefix, now, depth }: { chain: Chain; prefix: string; now: Date; depth: number }) {
  return (
    <div className={depth === 0 ? "" : "ml-1.5 border-l border-zinc-700 pl-3"}>
      <UpcomingRow
        u={chain.u}
        label={chain.u.name.slice(prefix.length)}
        now={now}
        after={chain.after && { ...chain.after, name: chain.after.name.slice(prefix.length) }}
        alsoWakes={chain.alsoWakes.map((name) => name.slice(prefix.length))}
      />
      {chain.next.map((child) => (
        <Fragment key={child.u.name}>
          <ChainRows chain={child} prefix={prefix} now={now} depth={depth + 1} />
        </Fragment>
      ))}
    </div>
  );
}

function UpcomingRow({
  u,
  label,
  now,
  after = null,
  alsoWakes = [],
}: {
  u: Upcoming;
  label: string;
  now: Date;
  after?: Chain["after"];
  alsoWakes?: string[];
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const last = u.card?.recent_runs?.[0];
  const lastTerm = last ? term("run", last.status) : null;
  const state = u.row.enablement && u.row.enablement !== "running" ? term("line", u.row.enablement) : null;
  return (
    <div className="py-1.5 text-[13px]">
      <div className="flex items-baseline gap-2">
        <Link
          to={link(`/i/${instanceId}/lines/${encodeURIComponent(u.name)}`)}
          className="min-w-0 truncate font-mono text-[12px] text-zinc-100 hover:underline"
          title={u.name}
        >
          {label}
        </Link>
        {state && (
          <span className="inline-flex shrink-0 items-center gap-1 text-[12px] text-zinc-400">
            {state.signal && <SignalDot signal={state.signal} title={state.meaning} />}
            {state.word}
          </span>
        )}
        <span className="ml-auto shrink-0 text-right text-[12px]">
          {u.due ? (
            <span className="inline-flex items-center gap-1 text-zinc-200">
              <SignalDot signal="waiting" title={term("occurrence", "due").meaning} />
              {u.row.due ?? 1} due now
            </span>
          ) : (u.row.waiting ?? 0) > 0 && u.soonest ? (
            <span className="text-zinc-300" title={formatDateTime(u.soonest.toISOString())}>
              {u.row.waiting} scheduled · {formatRelative(u.soonest, now)}
            </span>
          ) : last && lastTerm ? (
            <Link
              to={link(`/i/${instanceId}/runs/${encodeURIComponent(last.run.replace(/^ProcedureRun:/, ""))}`)}
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-200"
              title={`${lastTerm.meaning} · ${formatDateTime(last.started_at)}`}
            >
              {lastTerm.signal && <SignalDot signal={lastTerm.signal} title={lastTerm.meaning} />}
              Last run {formatRelative(last.started_at, now)}
              {last.status !== "succeeded" && ` · ${lastTerm.word.toLowerCase()}`}
            </Link>
          ) : (
            <span className="text-zinc-600">No runs</span>
          )}
        </span>
      </div>
      <div className="min-w-0 text-[12px] text-zinc-400">
        {u.card === undefined ? (
          <span className="text-zinc-600">…</span>
        ) : u.wakes.length === 0 ? (
          <span className="text-zinc-500">Runs when asked</span>
        ) : (
          <ul>
            {u.wakes.map((w) => (
              <li key={w.words} className="truncate" title={w.definedWords !== w.words ? `${w.words} (as defined: ${w.definedWords})` : w.words}>
                {sentence(w.words)}
                {w.next && (
                  <span className="text-zinc-500" title={formatDateTime(w.next.toISOString())}>
                    {" "}
                    · next {formatRelative(w.next, now)}
                  </span>
                )}
                {w.landing && after?.at && !u.due && (
                  <span className="text-zinc-500" title={formatDateTime(after.at.toISOString())}>
                    {" "}
                    · next after {after.name}, {formatRelative(after.at, now)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        {alsoWakes.length > 0 && <div className="truncate text-zinc-500">Also wakes {alsoWakes.join(", ")}</div>}
      </div>
    </div>
  );
}

function LineLinks({ names, prefix }: { names: string[]; prefix: string }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[12px]">
      {[...names].sort().map((name) => (
        <Link
          key={name}
          to={link(`/i/${instanceId}/lines/${encodeURIComponent(name)}`)}
          className="font-mono text-zinc-400 hover:text-zinc-200 hover:underline"
          title={name}
        >
          {name.slice(prefix.length)}
        </Link>
      ))}
    </div>
  );
}

// -- health and kits ------------------------------------------------------------

/** The environment's checks, folded to one line while all are healthy. */
function HealthPanel({ next, pending, error }: { next: NextResult | undefined; pending: boolean; error: Error | null }) {
  const status = next?.status;
  const sick = unhealthy(next);
  return (
    <div id="health">
      <Panel
        title="Health"
        meta={
          status?.blocking ? (
            <Chip concept="severity" value="blocking" />
          ) : status ? (
            <span>{sick.length ? `${sick.length} of ${HEALTH_ROWS.length} need a look` : `all ${HEALTH_ROWS.length} healthy`}</span>
          ) : undefined
        }
      >
        {pending && <LoadState />}
        {error && <LoadState error={error} />}
        {status && (
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[13px]">
            {HEALTH_ROWS.map((row) => {
              const health: NextHealth = status[row];
              return (
                <div key={row} className="contents">
                  <dt className="text-zinc-500">{humanize(row)}</dt>
                  <dd className="flex flex-wrap items-baseline gap-2">
                    <HealthChip state={health.state} />
                    {health.repair && <span className="text-[12px] text-zinc-500">{health.repair.required_change}</span>}
                  </dd>
                </div>
              );
            })}
            {(status.held ?? 0) > 0 && (
              <>
                <dt className="text-zinc-500">Held</dt>
                <dd className="font-mono text-zinc-300">{status.held}</dd>
              </>
            )}
          </dl>
        )}
        {next && next.unobserved_domains.length > 0 && (
          <div className="t-meta mt-2">Not observed from here: {next.unobserved_domains.map(humanize).join(", ")}</div>
        )}
      </Panel>
    </div>
  );
}

function KitsPanel() {
  const kits = useKits();
  const rows = kits.data?.kits ?? [];
  return (
    <Panel title="Kits" meta={kits.data ? <span>{rows.length} installed</span> : undefined}>
      {kits.isPending && <LoadState />}
      {kits.error && <LoadState error={kits.error} />}
      {kits.data && rows.length === 0 && <EmptyState>No kits installed.</EmptyState>}
      <div className="divide-y divide-zinc-800/60">
        {rows.map((kit) => (
          <div key={kit.kit_id} className="py-1 text-[13px]">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-mono text-zinc-200">{kit.kit_id}</span>
              <span className="font-mono text-zinc-500">{kit.version}</span>
              {(kit.drifted?.length ?? 0) > 0 && <span className="text-zinc-400">{kit.drifted!.length} drifted</span>}
              {kit.latest_available && kit.latest_available !== kit.version && (
                <span className="text-zinc-500">latest {kit.latest_available}</span>
              )}
            </div>
            {(kit.providers?.length ?? 0) > 0 && (
              <div className="mt-0.5 flex flex-wrap gap-x-3 text-[12px] text-zinc-500">
                {kit.providers!.map((provider) => (
                  <span key={provider.provider_id}>
                    {provider.provider_id} <Chip concept="provider" value={provider.state} />
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}

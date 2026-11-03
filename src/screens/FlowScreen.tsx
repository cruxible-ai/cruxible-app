import { useCallback, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Crosshair, Inbox as InboxIcon } from "lucide-react";
import { useInbox, useInstanceId, useSourceLandings } from "@/api/hooks";
import { EmptyState, LoadState } from "@/components/Panel";
import { FocusChip, useClearOnEscape } from "@/components/graph/FocusChip";
import { useAtLink } from "@/lib/at";
import {
  edgePath,
  focusFlow,
  layoutFlow,
  related,
  shortNames,
  type FlowModel,
  type FlowNode,
  type Placed,
} from "@/lib/evidence-flow";
import { AUTHORITY_COLOR } from "@/lib/palette";
import { term } from "@/lib/vocabulary";
import { contractName } from "@/lib/ontology";
import { usePageTitle } from "@/lib/usePageTitle";
import { useFlowModel } from "@/lib/useFlowModel";
import { SearchBox, Stat, StatsRow } from "@/components/StatsRow";
import { AuthorityLegend } from "@/components/AuthorityLegend";
import { LineStateDot } from "@/components/LineStateDot";
import { formatRelative } from "@/lib/text";
import { runId } from "@/lib/lines";
import type { Schemas } from "@/api/schemas";

/**
 * Evidence flow, three columns: where data comes from (a source: its host,
 * when it is fetched, when it last landed; and your own statements) -> the
 * Line that fetches it (its authority as a stripe, its state, its last run)
 * -> the ClaimTypes that Line writes, under their Subject kinds. Source cards
 * and Line cards share one shape, each with its kind on top. Reads
 * are ontology-sized: the claim_types and lines sections, the source model
 * (Procedure cards, Line envelopes, landing Triggers), the Line cards, and
 * one get-batch of ClaimType proofs for what each ClaimType's evidence rules
 * accept.
 */
export function FlowScreen() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  usePageTitle("Evidence flow");
  const [params, setParams] = useSearchParams();
  const focus = params.get("focus");
  const [hover, setHover] = useState<string | null>(null);

  const { model, triggerWords, lastRuns, runningLines, proofs, error, capped } = useFlowModel();

  const clearFocus = useCallback(() => {
    const next = new URLSearchParams(params);
    next.delete("focus");
    setParams(next);
  }, [params, setParams]);
  useClearOnEscape(focus !== null, clearFocus);

  const shown = useMemo(() => (model ? focusFlow(model, focus) : null), [model, focus]);
  const layout = useMemo(() => (shown ? layoutFlow(shown) : null), [shown]);
  // Find: the cards whose name or description holds the query stay lit; a hover traces over it.
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!shown || q.length < 2) return null;
    return new Set(
      shown.nodes
        .filter((n) => [n.label, n.host, n.about, n.detail].some((text) => text?.toLowerCase().includes(q)))
        .map((n) => n.id),
    );
  }, [shown, query]);
  const lit = useMemo(() => (shown && hover ? related(shown, hover) : matches), [shown, hover, matches]);
  const unread = useInbox(undefined, "unread", 200);
  // When each source last landed, and how often (read live from the landing records).
  const landings = useSourceLandings();
  const landingsOf = useMemo(() => new Map((landings.data?.rows ?? []).map((row) => [row.logical_source, row] as const)), [landings.data]);
  // Names share the kit namespace ("security."): say it once, drop it from labels.
  // (Line, Procedure and Trigger names only: Subject kinds can come from other namespaces, such as core's semantic.*.)
  const prefix = useMemo(
    () => shortNames((model?.nodes ?? []).filter((n) => n.kind === "line").map((n) => n.label)).prefix,
    [model],
  );

  // ClaimType proofs only sharpen the Line → ClaimType edges: without them, fall back to contracts (and say so).
  if (error) return <LoadState error={error} />;
  if (!model || !layout || !shown) return <LoadState />;

  const setFocus = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set("focus", id);
    else next.delete("focus");
    setParams(next, { replace: false });
    setHover(null);
  };
  const count = (kind: string) => shown.nodes.filter((n) => n.kind === kind && !n.ownWord).length;
  const focused = focus ? layout.byId.get(focus) ?? null : null;

  return (
    <div className="space-y-3">
      <header>
        <h1 className="t-title">Evidence flow</h1>
        <p className="t-lede measure mt-1">
          Where your evidence comes from and what it turns into. A Line fetches each source on its schedule, reads what
          arrives and writes facts (or posts items for review); people and agents add their own statements. Hover a card
          to trace its path.
        </p>
        <StatsRow
          search={
            <SearchBox
              value={query}
              onChange={setQuery}
              onEnter={() => matches && matches.size > 0 && setFocus([...matches][0]!)}
              placeholder="Find a card…"
              label="Find on the evidence flow"
              matches={matches ? matches.size : null}
            />
          }
        >
          <Stat n={count("source")} label={count("source") === 1 ? "source" : "sources"} />
          <Stat n={count("line")} label={count("line") === 1 ? "Line" : "Lines"} />
          <Stat n={count("claim_type")} label={count("claim_type") === 1 ? "ClaimType" : "ClaimTypes"} />
          {prefix && (
            <span>
              Names under <span className="font-mono text-zinc-300">{prefix}</span>
            </span>
          )}
        </StatsRow>
        <AuthorityLegend />
        {capped && <div className="mt-1 text-[12px] text-zinc-500">A listing stopped at its page cap: the flow may be incomplete.</div>}
        {proofs.error && (
          <div className="mt-1 text-[12px] text-zinc-500">
            The ClaimTypes' evidence rules couldn't be read, so what people and agents may write is matched by contract alone.
          </div>
        )}
      </header>

      {focus && (
        // Sticky: the flow is long, and the way out of a focus stays in reach.
        <div className="sticky top-0 z-10 py-1">
          <FocusChip
            label={focused?.node ? (focused.node.host ?? focused.node.label) : focus.startsWith("kind:") ? focus.slice(5) : focus}
            onClear={() => setFocus(null)}
          />
        </div>
      )}

      {shown.nodes.length === 0 ? (
        <EmptyState>No evidence flows at this generation.</EmptyState>
      ) : (
        <div className="overflow-x-auto">
          <div
            className="relative"
            style={{ width: layout.width, height: layout.height }}
            data-testid="flow"
            // A click on the empty canvas clears the focus.
            onClick={(event) => focus && event.target === event.currentTarget && setFocus(null)}
          >
            <svg width={layout.width} height={layout.height} className="pointer-events-none absolute inset-0" aria-hidden>
              {layout.edges.map((edge) => {
                const from = layout.byId.get(edge.from);
                const to = layout.byId.get(edge.to);
                if (!from || !to) return null;
                const on = lit ? lit.has(edge.from) && lit.has(edge.to) : null;
                // Edges stay neutral; a traced edge lights up in the color of the Line it runs through,
                // the same whichever card is hovered.
                const traced = on ? edgeColor(layout.byId.get(edge.from)?.node, layout.byId.get(edge.to)?.node) : null;
                return (
                  <path
                    key={`${edge.from}\n${edge.to}`}
                    d={edgePath(from, to)}
                    fill="none"
                    stroke={traced ?? "rgb(163 160 148)"}
                    strokeDasharray={edge.direct || edge.inbox ? "4 3" : undefined}
                    strokeWidth={on ? 1.5 : 1}
                    strokeOpacity={on === null ? 0.22 : on ? 0.95 : 0.05}
                  />
                );
              })}
            </svg>
            {layout.placed.map((p) => (
              <FlowCell
                key={p.id}
                placed={p}
                prefix={prefix}
                dim={lit !== null && p.kind !== "heading" && !(p.kind === "kind" ? kindLit(shown, p.label ?? "", lit) : lit.has(p.id))}
                onHover={setHover}
                onFocus={setFocus}
                instanceId={instanceId}
                link={link}
                unread={unread.data ? { count: unread.data.entries.length, more: unread.data.truncated === true } : null}
                triggerWords={triggerWords}
                runningLines={runningLines}
                lastRuns={lastRuns}
                landingsOf={landings.data ? landingsOf : null}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function kindLit(model: FlowModel, kind: string, lit: Set<string>): boolean {
  return model.nodes.some((n) => n.kind === "claim_type" && n.group === kind && lit.has(n.id));
}

/** Keep only a node's path. Always shown on a card; on a ClaimType or kind row, on hover (the rows are many). */
function FocusButton({ id, label, onFocus, always = false }: { id: string; label: string; onFocus: (id: string) => void; always?: boolean }) {
  return (
    <button
      onClick={() => onFocus(id)}
      aria-label={`Focus ${label}`}
      title="Keep only this node's path"
      className={`shrink-0 text-zinc-600 hover:text-zinc-200 ${always ? "" : "opacity-0 focus:opacity-100 group-hover:opacity-100"}`}
    >
      <Crosshair className="h-3 w-3" />
    </button>
  );
}

const strip = (name: string, prefix: string) => (prefix && name.startsWith(prefix) ? name.slice(prefix.length) : name);

type RunRow = Schemas["RunRow"];

function FlowCell({
  placed,
  prefix,
  dim,
  onHover,
  onFocus,
  instanceId,
  link,
  unread,
  triggerWords,
  runningLines,
  lastRuns,
  landingsOf,
}: {
  /** Each source's landings (null while the read loads). */
  landingsOf: ReadonlyMap<string, SourceLandings> | null;
  unread: { count: number; more: boolean } | null;
  /** Each Line's Triggers in words (null while its card loads). */
  triggerWords: ReadonlyMap<string, readonly string[] | null>;
  runningLines: ReadonlySet<string>;
  /** Each Line's newest run (null while the cards load). */
  lastRuns: ReadonlyMap<string, RunRow> | null;
  placed: Placed;
  prefix: string;
  dim: boolean;
  onHover: (id: string | null) => void;
  onFocus: (id: string) => void;
  instanceId: string;
  link: (path: string) => string;
}) {
  const style = { left: placed.x, top: placed.y, width: placed.w, height: placed.h };
  const base = `group absolute flex items-center gap-1.5 overflow-hidden transition-opacity ${dim ? "opacity-25" : ""}`;
  const hover = {
    onMouseEnter: () => onHover(placed.kind === "kind" ? `kind:${placed.label ?? ""}` : placed.id),
    onMouseLeave: () => onHover(null),
  };
  const node = placed.node;

  if (placed.kind === "heading") {
    return (
      <div style={style} className="absolute text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {placed.label}
      </div>
    );
  }
  if (placed.kind === "kind") {
    const kind = placed.label ?? "";
    return (
      <div style={style} className={`${base} border-b border-zinc-800 text-[12px]`} {...hover}>
        <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}`)} className="truncate font-mono font-medium text-zinc-200 hover:underline" title={kind}>
          {kind}
        </Link>
        <FocusButton id={`kind:${kind}`} label={kind} onFocus={onFocus} />
      </div>
    );
  }
  if (!node) return null;

  if (node.kind === "inbox") {
    return (
      <div
        style={{ ...style, borderLeft: `3px solid ${AUTHORITY_COLOR.observe}` }}
        className={`group absolute flex items-center gap-2 overflow-hidden border border-dashed border-zinc-700 bg-zinc-900 px-2 transition-opacity ${dim ? "opacity-25" : ""}`}
        title="Items Lines post for an agent or a person to judge: not accepted state"
        {...hover}
      >
        <InboxIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden />
        <Link to={link(`/i/${instanceId}/lines`)} className="truncate text-[12px] font-medium text-zinc-100 hover:underline">
          Inbox
        </Link>
        <span className="text-[11px] text-zinc-500">{unread ? `${unread.count}${unread.more ? "+" : ""} unread` : "…"}</span>
        <span className="ml-auto">
          <FocusButton id={node.id} label="Inbox" onFocus={onFocus} always />
        </span>
      </div>
    );
  }
  if (node.kind === "source") {
    // Outlined: where data comes from. Named in plain words (its host); the logical source id is on hover.
    if (node.ownWord) {
      return (
        <FlowCard
          variant="statements"
          style={style}
          dim={dim}
          hover={hover}
          kindLabel="Source"
          title={["Entered directly", "Facts people or agents enter directly, on their own word, without a source to cite"].join("\n")}
          name={<span className="truncate text-[12.5px] font-medium text-zinc-100">Entered directly</span>}
          about="by people or agents"
          focus={<FocusButton id={node.id} label="Entered directly" onFocus={onFocus} />}
          facts={[]}
        />
      );
    }
    const tags = (node.contracts ?? []).map(contractName);
    return (
      <FlowCard
        variant="source"
        style={style}
        dim={dim}
        hover={hover}
        kindLabel="Source"
        title={[
          node.host ?? node.label,
          `Logical source ${node.label}`,
          node.about,
          node.arrives ? `Arrives by ${node.arrives}` : null,
          node.detail,
          tags.length ? `Captured under ${tags.join(", ")}` : null,
        ]
          .filter(Boolean)
          .join("\n")}
        name={
          node.contracts?.length === 1 ? (
            <Link
              to={link(`/i/${instanceId}/contracts/${encodeURIComponent(node.contracts[0]!)}`)}
              className={`truncate text-[12.5px] font-medium text-zinc-100 hover:underline ${node.host ? "" : "font-mono"}`}
            >
              {node.host ?? node.label}
            </Link>
          ) : (
            <span className={`truncate text-[12.5px] font-medium text-zinc-100 ${node.host ? "" : "font-mono"}`}>{node.host ?? node.label}</span>
          )
        }
        focus={<FocusButton id={node.id} label={node.host ?? node.label} onFocus={onFocus} />}
        facts={[["Fetched", node.when ?? "not on a schedule"], landedFact(landingsOf, node.label, instanceId, link)]}
      />
    );
  }
  if (node.kind === "line") {
    const triggers = triggerWords.get(node.label);
    return (
      <FlowCard
        variant="line"
        accent={authorityColor(node.authority)}
        style={style}
        dim={dim}
        hover={hover}
        kindLabel="Line"
        state={<LineStateDot state={node.enablement} running={runningLines.has(node.label)} />}
        title={[
          node.label,
          node.authority ? `At most ${node.authority}: ${term("authority", node.authority).meaning}` : null,
          node.about,
          triggers?.length ? `Triggers: ${triggers.join("; ")}` : null,
        ]
          .filter(Boolean)
          .join("\n")}
        name={
          <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(node.label)}`)} className="truncate font-mono text-[12.5px] text-zinc-100 hover:underline">
            {strip(node.label, prefix)}
          </Link>
        }
        about={node.about ?? null}
        focus={<FocusButton id={node.id} label={node.label} onFocus={onFocus} />}
        facts={[lastRunFact(lastRuns, node.label, instanceId, link)]}
      />
    );
  }
  // claim_type: tinted by the strongest Line that may write it (neutral: written by people or agents)
  const kind = node.group ?? "";
  return (
    <div
      style={{ ...style, borderLeft: `2px solid ${authorityColor(node.authority)}` }}
      className={`${base} pl-3 text-[12px]`}
      title={[node.detail, node.about, node.key ? "Identifies the Subject; no source writes it" : node.authority ? `Written by Lines that may ${node.authority}` : "Entered directly by people or agents"].filter(Boolean).join("\n")}
      {...hover}
    >
      <Link
        to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?view=claim-types&claim_type=${encodeURIComponent(node.detail ?? "")}`)}
        className="truncate font-mono text-zinc-300 hover:underline"
      >
        {node.label}
      </Link>
      {node.key && (
        <span className="shrink-0 text-[10px] text-zinc-500" title="Identifies the Subject">
          id
        </span>
      )}
      {node.required && !node.key && (
        <span className="shrink-0 text-[10px] text-zinc-500" title="A Capture is required">
          Captured
        </span>
      )}
      <FocusButton id={node.id} label={node.label} onFocus={onFocus} />
    </div>
  );
}

/** The color a traced path takes: the hovered Line's or ClaimType's authority; a bright neutral otherwise. */
/** A traced edge's color: the authority of the Line it runs into or out of; neutral light otherwise. */
function edgeColor(from: FlowNode | undefined, to: FlowNode | undefined): string {
  const line = from?.kind === "line" ? from : to?.kind === "line" ? to : undefined;
  if (line?.authority) return AUTHORITY_COLOR[line.authority];
  return "rgb(222 219 208)";
}

const authorityColor = (authority: string | undefined) =>
  authority === "settle" || authority === "propose" || authority === "observe" ? AUTHORITY_COLOR[authority] : AUTHORITY_COLOR.none;

type Fact = [label: string, value: ReactNode];
type SourceLandings = NonNullable<ReturnType<typeof useSourceLandings>["data"]>["rows"][number];

/** When a source last landed, linked to that Capture, and how many times it has landed. */
function landedFact(landingsOf: ReadonlyMap<string, SourceLandings> | null, source: string, instanceId: string, link: (path: string) => string): Fact {
  if (!landingsOf) return ["Landed", "…"];
  const row = landingsOf.get(source);
  if (!row) return ["Landed", "never"];
  const latest = row.latest;
  const when = formatRelative(latest.landed_at);
  const gone = latest.erased ? " (erased)" : latest.unavailable ? " (unavailable)" : "";
  return [
    "Landed",
    <span key="landed" title={`${row.landings} ${row.landings === 1 ? "landing" : "landings"}; the latest ${latest.landed_at}${latest.line ? ` by ${latest.line}` : ""}`}>
      {latest.ref ? (
        <Link to={link(`/i/${instanceId}/ref/${encodeURIComponent(latest.ref)}`)} className="hover:text-zinc-200 hover:underline">
          {when}
        </Link>
      ) : (
        when
      )}
      {gone} · {row.landings.toLocaleString()} total
    </span>,
  ];
}

/** A Line's newest run: when it started (linked to the run) and how it ended. */
function lastRunFact(lastRuns: ReadonlyMap<string, RunRow> | null, line: string, instanceId: string, link: (path: string) => string): Fact {
  if (!lastRuns) return ["Last run", "…"];
  const run = lastRuns.get(line);
  if (!run) return ["Last run", "never"];
  return [
    "Last run",
    <span key="run" title={`${term("run", run.status).word}, started ${run.started_at}`}>
      <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(runId(run.run))}`)} className="hover:text-zinc-200 hover:underline">
        {formatRelative(run.started_at)}
      </Link>
      {run.status !== "succeeded" && ` · ${term("run", run.status).word.toLowerCase()}`}
    </span>,
  ];
}

/**
 * A source or Line card: its kind on top (with a Line's state), its
 * name, what a Line does, and label/value facts pinned to the bottom. A source
 * is outlined; your statements dashed; a Line filled, with its authority as
 * the left stripe.
 */
function FlowCard({
  variant,
  accent,
  style,
  dim,
  hover,
  kindLabel,
  state = null,
  title,
  name,
  about = null,
  focus,
  facts,
}: {
  variant: "source" | "statements" | "line";
  accent?: string;
  style: CSSProperties;
  dim: boolean;
  hover: { onMouseEnter: () => void; onMouseLeave: () => void };
  kindLabel: string;
  state?: ReactNode;
  title: string;
  name: ReactNode;
  about?: string | null;
  focus: ReactNode;
  facts: Fact[];
}) {
  // One card shape for every kind: the label on top says what it is.
  const shape = variant === "statements" ? "border border-dashed border-zinc-700 bg-zinc-900" : "border border-zinc-700 bg-zinc-900";
  return (
    <div
      style={{ ...style, ...(accent ? { borderLeft: `3px solid ${accent}` } : {}) }}
      className={`group absolute flex flex-col overflow-hidden px-2.5 pb-1.5 pt-1.5 transition-opacity ${shape} ${dim ? "opacity-25" : ""}`}
      title={title}
      {...hover}
    >
      <div className="flex min-w-0 items-center gap-1 text-[9.5px] font-semibold uppercase leading-3 tracking-wider text-zinc-500">
        {kindLabel}
        {state && <span className="ml-auto flex shrink-0 items-center normal-case tracking-normal">{state}</span>}
      </div>
      <div className="mt-1 flex min-w-0 items-center leading-4">{name}</div>
      {about && <div className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-zinc-400">{about}</div>}
      <div className="mt-auto flex min-w-0 items-end gap-2">
        <dl className="flex min-w-0 flex-1 flex-col whitespace-nowrap text-[10.5px] leading-4">
          {facts.map(([label, value]) => (
            <div key={label} className="flex min-w-0 gap-1">
              <dt className="shrink-0 uppercase tracking-wide text-zinc-600">{label}</dt>
              <dd className="min-w-0 truncate text-zinc-400">{value}</dd>
            </div>
          ))}
        </dl>
        <span className="shrink-0">{focus}</span>
      </div>
    </div>
  );
}

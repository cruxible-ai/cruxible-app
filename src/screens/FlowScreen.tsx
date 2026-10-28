import { useCallback, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Crosshair } from "lucide-react";
import { useCards, useClaimTypes, useGetBatch, useInbox, useInstanceId, useLines, useSourceModel } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { EmptyState, LoadState } from "@/components/Panel";
import { FocusChip, useClearOnEscape } from "@/components/graph/FocusChip";
import { useAtLink } from "@/lib/at";
import {
  buildFlow,
  type AcquirerInput,
  edgePath,
  focusFlow,
  layoutFlow,
  readClaimTypeAccepts,
  related,
  shortNames,
  type AcceptedEvidence,
  type FlowModel,
  type FlowNode,
  type Placed,
} from "@/lib/evidence-flow";
import { lineName } from "@/lib/lines";
import { AUTHORITY_COLOR } from "@/lib/palette";
import { HealthDot } from "@/components/Chip";
import { term } from "@/lib/vocabulary";
import { arrivalWords, gist, lineGist, retainedByWords, stepKind, urlWords, type Retention } from "@/lib/definitions";
import { contractName } from "@/lib/ontology";
import { usePageTitle } from "@/lib/usePageTitle";
import { wakeOf } from "@/lib/schedule";
import { sentence } from "@/lib/text";

/**
 * Evidence flow: sources -> the Lines that read their landings -> the
 * ClaimTypes those Lines may write; a source no Line reads, and statements on
 * their author's own word, go straight to the ClaimTypes that accept them.
 * The contract a source is captured under is a tag on the source. Reads are
 * ontology-sized: the claim_types and lines sections, the source model
 * (Procedure cards, Line envelopes, landing Triggers) and one get-batch of
 * ClaimType proofs for what each ClaimType's evidence rules accept.
 */
export function FlowScreen() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  usePageTitle("Evidence flow");
  const [params, setParams] = useSearchParams();
  const focus = params.get("focus");
  const [hover, setHover] = useState<string | null>(null);

  const claimTypes = useClaimTypes();
  const lines = useLines();
  const sources = useSourceModel();
  // Every Line's card, for its Triggers in words (a Line may have several: a schedule and landings).
  const lineNames = useMemo(() => (lines.data?.rows ?? []).map((row) => lineName(row.line)), [lines.data]);
  const lineCards = useCards(lineNames.map((line) => `Line:${line}`));
  const triggerWords = useMemo(
    () =>
      new Map(
        lineNames.map((line, i) => {
          const card = cardOf(lineCards[i], "line");
          return [line, card ? (card.triggers ?? []).map((t) => wakeOf(t.fires).words.replace(/^when /, "")) : null] as const;
        }),
      ),
    [lineNames, lineCards],
  );
  const proofs = useGetBatch(
    (claimTypes.data?.rows ?? []).filter((row) => (row.evidence ?? []).length > 0).map((row) => `ClaimType:${row.predicate}`),
    "proof",
  );

  const model = useMemo<FlowModel | null>(() => {
    if (!claimTypes.data || !lines.data || !sources.data || proofs.isPending) return null;
    const accepts = new Map<string, AcceptedEvidence[]>();
    for (const result of proofs.results) {
      const read = readClaimTypeAccepts((result as { proof?: unknown }).proof);
      if (read) accepts.set(read.predicate, read.accepts);
    }
    const { specs, lines: lineDefinitions, retentions: allRetentions } = sources.data;
    const lineOf = new Map(lineDefinitions.map((line) => [line.line, line] as const));
    // What a source is: a fetch Line's URL, else its retaining Procedure's description; how it arrives: that step's interface.
    const describeSource = (retainedBy: readonly Retention[]) => {
      const retention = retainedBy.find((r) => urlWords(r.line ? lineOf.get(r.line)?.parameters : undefined)) ?? retainedBy[0];
      if (!retention) return { about: null, arrives: null };
      const spec = specs.get(retention.procedure);
      return {
        about: urlWords(retention.line ? lineOf.get(retention.line)?.parameters : undefined) ?? gist(spec?.description),
        // the step that retains this source (a Procedure may fetch several under one contract)
        arrives: arrivalWords({ interface: retention.interface, emitted: retention.emitted }),
      };
    };
    // Where sources come from: a Line that fetches them, or a direct run of the Procedure that retains them.
    const whenOf = new Map(
      [...triggerWords].map(([line, words]) => [line, words?.length ? sentence(words.join("; ")) : "When it is run"] as const),
    );
    const acquirers = new Map<string, AcquirerInput & { sources: string[] }>();
    for (const r of allRetentions) {
      if (r.source === null || r.emitted) continue;
      const runs = r.line ? ("line" as const) : ("direct" as const);
      const name = r.line ?? r.procedure;
      const key = `${runs}:${name}`;
      let entry = acquirers.get(key);
      if (!entry) {
        const description = specs.get(r.procedure)?.description;
        entry = {
          name,
          runs,
          about: (r.line ? urlWords(lineOf.get(r.line)?.parameters) : null) ?? gist(description),
          when: r.line ? (whenOf.get(r.line) ?? null) : "When an agent runs it",
          sources: [],
        };
        acquirers.set(key, entry);
      }
      if (!entry.sources.includes(r.source)) entry.sources.push(r.source);
    }
    return buildFlow({
      acquirers: [...acquirers.values()],
      sources: sources.data.sources.map((source) => ({
        id: source.id,
        contracts: source.contracts,
        retainedBy: source.retainedBy.length ? `Retained by ${retainedByWords(source.retainedBy)}` : "Named by whoever runs the fetch",
        ...describeSource(source.retainedBy),
      })),
      lineAbout: new Map(
        lineDefinitions.flatMap((line) => {
          const about = lineGist(specs.get(line.procedure)?.description);
          return about ? [[line.line, about] as const] : [];
        }),
      ),
      claimTypes: claimTypes.data.rows,
      accepts,
      triggers: sources.data.triggers,
      lineAuthority: new Map(lines.data.rows.map((row) => [lineName(row.line), row.authority] as const)),
      lineEnablement: new Map(lines.data.rows.map((row) => [lineName(row.line), row.enablement ?? null] as const)),
      // A Line posts to the inbox when its Procedure has an inbox step.
      postsInbox: new Set(
        lineDefinitions.filter((line) => specs.get(line.procedure)?.steps.some((step) => stepKind(step) === "inbox")).map((line) => line.line),
      ),
    });
  }, [claimTypes.data, lines.data, sources.data, proofs.isPending, proofs.results, triggerWords]);

  const clearFocus = useCallback(() => {
    const next = new URLSearchParams(params);
    next.delete("focus");
    setParams(next);
  }, [params, setParams]);
  useClearOnEscape(focus !== null, clearFocus);

  const shown = useMemo(() => (model ? focusFlow(model, focus) : null), [model, focus]);
  const layout = useMemo(() => (shown ? layoutFlow(shown) : null), [shown]);
  const lit = useMemo(() => (shown && hover ? related(shown, hover) : null), [shown, hover]);
  const unread = useInbox(undefined, "unread", 200);
  // Names share the kit namespace ("security."): say it once, drop it from labels.
  // (Line, Procedure and Trigger names only: Subject kinds can come from other namespaces, such as core's semantic.*.)
  const prefix = useMemo(
    () => shortNames((model?.nodes ?? []).filter((n) => n.kind === "line" || n.kind === "acquirer").map((n) => n.label)).prefix,
    [model],
  );

  // ClaimType proofs only sharpen the Line → ClaimType edges: without them, fall back to contracts (and say so).
  const error = claimTypes.error ?? lines.error ?? sources.error;
  if (error) return <LoadState error={error} />;
  if (!model || !layout || !shown) return <LoadState />;

  const setFocus = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set("focus", id);
    else next.delete("focus");
    setParams(next, { replace: false });
    setHover(null);
  };
  const count = (kind: string) => shown.nodes.filter((n) => n.kind === kind).length;
  const fetching = shown.nodes.filter((n) => n.kind === "acquirer" && n.runs === "line").length;
  const focused = focus ? layout.byId.get(focus) ?? null : null;
  const capped = sources.data?.truncated || claimTypes.data?.truncated;

  return (
    <div className="space-y-3">
      <header>
        <h1 className="t-title">Evidence flow</h1>
        <p className="t-lede measure mt-1">
          Where your evidence comes from and what it turns into. Each source is fetched on a schedule or added by an agent;
          Lines read what arrives and propose facts or post items for review. Hover a card to trace its path.
        </p>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-zinc-500">
          <span>
            <span className="font-mono text-zinc-200">{count("source")}</span> {count("source") === 1 ? "source" : "sources"}
          </span>
          <span>
            <span className="font-mono text-zinc-200">{fetching}</span> fetching {fetching === 1 ? "Line" : "Lines"}
          </span>
          <span>
            <span className="font-mono text-zinc-200">{count("line")}</span> {count("line") === 1 ? "Line" : "Lines"}
          </span>
          <span>
            <span className="font-mono text-zinc-200">{count("claim_type")}</span> {count("claim_type") === 1 ? "ClaimType" : "ClaimTypes"}
          </span>
          {prefix && (
            <span>
              Names under <span className="font-mono text-zinc-300">{prefix}</span>
            </span>
          )}
        </div>
        <AuthorityLegend />
        {capped && <div className="mt-1 text-[12px] text-zinc-500">A listing stopped at its page cap: the flow may be incomplete.</div>}
        {proofs.error && (
          <div className="mt-1 text-[12px] text-zinc-500">
            The ClaimTypes' evidence rules couldn't be read, so a Line links to every ClaimType that accepts its contract, whatever the source.
          </div>
        )}
      </header>

      {focus && (
        // Sticky: the flow is long, and the way out of a focus stays in reach.
        <div className="sticky top-0 z-10 py-1">
          <FocusChip label={focused?.node ? focused.node.label : focus.startsWith("kind:") ? focus.slice(5) : focus} onClear={() => setFocus(null)} />
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
                // Edges stay neutral; a traced path lights up in the hovered node's color.
                const traced = on ? traceColor(layout.byId.get(hover ?? "")?.node) : null;
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
}: {
  unread: { count: number; more: boolean } | null;
  /** Each Line's Triggers in words (null while its card loads). */
  triggerWords: ReadonlyMap<string, readonly string[] | null>;
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

  // Sources, Lines and what fetches them share one card: name and state on top,
  // what it is in two lines, label/value facts pinned to the bottom.
  if (node.kind === "acquirer") {
    const href = node.runs === "line" ? `/i/${instanceId}/lines/${encodeURIComponent(node.label)}` : `/i/${instanceId}/ref/${encodeURIComponent(`Procedure:${node.label}`)}`;
    return (
      <FlowCard
        style={style}
        dim={dim}
        hover={hover}
        accent={AUTHORITY_COLOR.none}
        title={[node.label, node.about, node.when].filter(Boolean).join("\n")}
        name={
          <Link to={link(href)} className="truncate font-mono text-[12px] text-zinc-100 hover:underline">
            {strip(node.label, prefix)}
          </Link>
        }
        state={node.runs === "line" ? <LineState enablement={node.enablement} /> : null}
        focus={<FocusButton id={node.id} label={node.label} onFocus={onFocus} always />}
        about={node.about ?? null}
        facts={[
          node.runs === "line"
            ? triggerFact(triggerWords.get(node.label), node.when ?? "")
            : ["Trigger", "none"],
        ]}
      />
    );
  }
  if (node.kind === "inbox") {
    return (
      <FlowCard
        style={style}
        dim={dim}
        hover={hover}
        accent={AUTHORITY_COLOR.observe}
        dashed
        title="Items Lines post for an agent or a person to judge: not accepted state"
        name={
          <Link to={link(`/i/${instanceId}/lines`)} className="truncate text-[12px] font-medium text-zinc-100 hover:underline">
            Inbox
          </Link>
        }
        state={null}
        focus={<FocusButton id={node.id} label="Inbox" onFocus={onFocus} always />}
        about={null}
        facts={[["Unread", unread ? `${unread.count}${unread.more ? "+" : ""}` : "…"]]}
      />
    );
  }
  if (node.kind === "source") {
    const tags = (node.contracts ?? []).map(contractName);
    return (
      <FlowCard
        style={style}
        dim={dim}
        hover={hover}
        accent="#3f3f46"
        dashed={node.ownWord === true}
        title={[node.label, node.about, node.detail, tags.length ? `Captured under ${tags.join(", ")}` : null].filter(Boolean).join("\n")}
        name={<span className={`truncate text-[12px] ${node.ownWord ? "font-sans text-zinc-200" : "font-mono text-zinc-100"}`}>{strip(node.label, prefix)}</span>}
        state={null}
        focus={<FocusButton id={node.id} label={node.label} onFocus={onFocus} always />}
        about={node.acquired || node.ownWord ? null : node.about ?? node.detail ?? null}
        aboutLines={1}
        stacked
        facts={
          node.ownWord
            ? [["On", "their author's own word"]]
            : [
                ...(node.arrives ? [["Arrives", node.arrives] as [string, string]] : []),
                [
                  tags.length === 1 ? "Contract" : "Contracts",
                  <span key="c">
                    {tags.map((t, i) => (
                      <span key={t}>
                        {i > 0 && ", "}
                        <Link to={link(`/i/${instanceId}/contracts/${encodeURIComponent(t)}`)} className="hover:text-zinc-200 hover:underline">
                          {strip(t, prefix)}
                        </Link>
                      </span>
                    ))}
                  </span>,
                ],
              ]
        }
      />
    );
  }
  if (node.kind === "line") {
    return (
      <FlowCard
        style={style}
        dim={dim}
        hover={hover}
        accent={authorityColor(node.authority)}
        title={[
          node.label,
          node.authority ? `At most ${node.authority}: ${term("authority", node.authority).meaning}` : null,
          node.about,
          node.detail,
          triggerWords.get(node.label)?.length ? `Triggers: ${triggerWords.get(node.label)!.join("; ")}` : null,
        ]
          .filter(Boolean)
          .join("\n")}
        name={
          <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(node.label)}`)} className="truncate font-mono text-[12px] text-zinc-100 hover:underline">
            {strip(node.label, prefix)}
          </Link>
        }
        state={<LineState enablement={node.enablement} />}
        focus={<FocusButton id={node.id} label={node.label} onFocus={onFocus} always />}
        about={node.about ?? null}
        // Its authority is the card's color (and the tooltip's first line after the name).
        facts={[triggerFact(triggerWords.get(node.label), (node.detail ?? "").replace(/^When /, ""))]}
      />
    );
  }
  // claim_type: tinted by the strongest Line that may write it (neutral: written only by hand)
  const kind = node.group ?? "";
  return (
    <div
      style={{ ...style, borderLeft: `2px solid ${authorityColor(node.authority)}` }}
      className={`${base} pl-3 text-[12px]`}
      title={[node.detail, node.about, node.authority ? `Written by Lines that may ${node.authority}` : "Written by hand only"].filter(Boolean).join("\n")}
      {...hover}
    >
      <Link
        to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?view=claim-types&claim_type=${encodeURIComponent(node.detail ?? "")}`)}
        className="truncate font-mono text-zinc-300 hover:underline"
      >
        {node.label}
      </Link>
      {node.required && (
        <span className="shrink-0 text-[10px] text-zinc-500" title="A Capture is required">
          Captured
        </span>
      )}
      <FocusButton id={node.id} label={node.label} onFocus={onFocus} />
    </div>
  );
}

/** What the colors mean: a Line's max authority (and the ClaimTypes its edges reach); the dot, whether it runs. */
function AuthorityLegend() {
  const swatch = (color: string, label: string, help: string) => (
    <span className="inline-flex items-center gap-1.5" title={help}>
      <span className="inline-block h-2.5 w-[3px]" style={{ background: color }} />
      {label}
    </span>
  );
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-zinc-400">
      {swatch(AUTHORITY_COLOR.settle, "May settle", term("authority", "settle").meaning)}
      {swatch(AUTHORITY_COLOR.propose, "Proposes for review", term("authority", "propose").meaning)}
      {swatch(AUTHORITY_COLOR.observe, "Observes only", "Observe: writes no Claims; posts to its inbox")}
      {swatch(AUTHORITY_COLOR.none, "By hand", "No Line writes it: written by an agent or a person")}
      <span className="inline-flex items-center gap-1.5">
        <HealthDot tone="ok" title="Running" /> Running
      </span>
      <span className="inline-flex items-center gap-1.5">
        <HealthDot tone="off" title="Not enabled" /> Not enabled
      </span>
    </div>
  );
}

/** A Line's Triggers as one fact: the first in words, and how many more ("cisa.kev.catalog lands +1"). */
function triggerFact(words: readonly string[] | null | undefined, fallback: string): Fact {
  if (!words) return ["Trigger", fallback];
  if (words.length === 0) return ["Trigger", "none"];
  return [words.length === 1 ? "Trigger" : "Triggers", `${words[0]}${words.length > 1 ? ` +${words.length - 1}` : ""}`];
}

/** The color a traced path takes: the hovered Line's or ClaimType's authority; a bright neutral otherwise. */
function traceColor(node: FlowNode | undefined): string {
  if (node && (node.kind === "line" || node.kind === "claim_type") && node.authority) return AUTHORITY_COLOR[node.authority];
  return "rgb(222 219 208)";
}

const authorityColor = (authority: string | undefined) =>
  authority === "settle" || authority === "propose" || authority === "observe" ? AUTHORITY_COLOR[authority] : AUTHORITY_COLOR.none;

/** A Line's enablement as the health dot: running green, stalled amber, stopped red, never enabled hollow. */
function LineState({ enablement }: { enablement: string | null | undefined }) {
  if (enablement === undefined) return null;
  const word = enablement ? term("line", enablement).word : "Not enabled";
  const tone = enablement === "running" ? "ok" : enablement ? (term("line", enablement).signal ?? "off") : "off";
  return <HealthDot tone={tone} title={word} />;
}

type Fact = [label: string, value: ReactNode];

function FlowCard({
  style,
  dim,
  hover,
  accent,
  dashed = false,
  title,
  name,
  state,
  focus,
  about,
  aboutLines = 2,
  stacked = false,
  facts,
}: {
  style: CSSProperties;
  dim: boolean;
  hover: { onMouseEnter: () => void; onMouseLeave: () => void };
  accent: string;
  dashed?: boolean;
  title: string;
  name: ReactNode;
  state: ReactNode;
  focus: ReactNode;
  about: string | null;
  aboutLines?: 1 | 2;
  /** One fact per row (sources) instead of one row of facts, the last truncating. */
  stacked?: boolean;
  facts: Fact[];
}) {
  return (
    <div
      style={{ ...style, borderLeft: `3px solid ${accent}` }}
      className={`group absolute flex flex-col overflow-hidden border border-zinc-800 ${dashed ? "border-dashed bg-zinc-950" : "bg-zinc-900"} px-2 pb-1.5 pt-1.5 transition-opacity ${dim ? "opacity-25" : ""}`}
      title={title}
      {...hover}
    >
      {/* The name, with its state at the top right; the focus control at the bottom right, beside the facts. */}
      <div className="flex min-w-0 items-center gap-1.5 leading-4">
        {name}
        {state && <span className="ml-auto flex shrink-0 items-center">{state}</span>}
      </div>
      {about && <div className={`mt-0.5 text-[11px] leading-4 text-zinc-400 ${aboutLines === 1 ? "truncate" : "line-clamp-2"}`}>{about}</div>}
      <div className="mt-auto flex min-w-0 items-end gap-1.5">
        <dl className={`flex min-w-0 flex-1 whitespace-nowrap text-[10.5px] leading-4 ${stacked ? "flex-col" : "gap-x-3"}`}>
          {facts.map(([label, value], i) => (
            <div key={label} className={`flex min-w-0 gap-1 ${stacked || i === facts.length - 1 ? "" : "shrink-0"}`}>
              <dt className="shrink-0 uppercase tracking-wide text-zinc-600">{label}</dt>
              <dd className="min-w-0 truncate text-zinc-400">{value}</dd>
            </div>
          ))}
        </dl>
        <span className="flex shrink-0 items-center pb-0.5">{focus}</span>
      </div>
    </div>
  );
}

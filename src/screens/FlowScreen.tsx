import { useCallback, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Crosshair } from "lucide-react";
import { useClaimTypes, useGetBatch, useInstanceId, useLines, useSourceModel } from "@/api/hooks";
import { EmptyState, LoadState } from "@/components/Panel";
import { FocusChip, useClearOnEscape } from "@/components/graph/FocusChip";
import { useAtLink } from "@/lib/at";
import {
  buildFlow,
  edgePath,
  focusFlow,
  layoutFlow,
  readClaimTypeAccepts,
  related,
  sharedPrefix,
  type AcceptedEvidence,
  type FlowModel,
  type Placed,
} from "@/lib/evidence-flow";
import { lineName } from "@/lib/lines";
import { FLOW_COLOR } from "@/lib/palette";
import { arrivalWords, gist, lineGist, retainedByWords, sourceSteps, urlWords, type Retention } from "@/lib/definitions";
import { contractName } from "@/lib/ontology";
import { usePageTitle } from "@/lib/usePageTitle";

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
    const { specs, lines: lineDefinitions } = sources.data;
    const lineOf = new Map(lineDefinitions.map((line) => [line.line, line] as const));
    // What a source is: a fetch Line's URL, else its retaining Procedure's description; how it arrives: that step's interface.
    const describeSource = (retainedBy: readonly Retention[]) => {
      const retention = retainedBy.find((r) => urlWords(r.line ? lineOf.get(r.line)?.parameters : undefined)) ?? retainedBy[0];
      if (!retention) return { about: null, arrives: null };
      const spec = specs.get(retention.procedure);
      const step = spec ? sourceSteps(retention.procedure, spec).find((st) => st.contract === retention.contract && st.emitted === retention.emitted) : undefined;
      return {
        about: urlWords(retention.line ? lineOf.get(retention.line)?.parameters : undefined) ?? gist(spec?.description),
        arrives: arrivalWords(step ?? null),
      };
    };
    return buildFlow({
      sources: sources.data.sources.map((source) => ({
        id: source.id,
        contracts: source.contracts,
        retainedBy: source.retainedBy.length ? `Retained by ${retainedByWords(source.retainedBy)}` : "Named by its Provider at run time",
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
    });
  }, [claimTypes.data, lines.data, sources.data, proofs.isPending, proofs.results]);

  const clearFocus = useCallback(() => {
    const next = new URLSearchParams(params);
    next.delete("focus");
    setParams(next);
  }, [params, setParams]);
  useClearOnEscape(focus !== null, clearFocus);

  const shown = useMemo(() => (model ? focusFlow(model, focus) : null), [model, focus]);
  const layout = useMemo(() => (shown ? layoutFlow(shown) : null), [shown]);
  const lit = useMemo(() => (shown && hover ? related(shown, hover) : null), [shown, hover]);
  // Names share the kit namespace ("security."): say it once, drop it from labels.
  // (Line and Trigger names only: Subject kinds can come from other namespaces, such as core's semantic.*.)
  const prefix = useMemo(() => sharedPrefix((model?.nodes ?? []).filter((n) => n.kind === "line").map((n) => n.label)), [model]);

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
  const focused = focus ? layout.byId.get(focus) ?? null : null;
  const capped = sources.data?.truncated || claimTypes.data?.truncated;

  return (
    <div className="space-y-3">
      <header>
        <h1 className="t-title">Evidence flow</h1>
        <p className="mt-1 max-w-3xl text-[13px] text-zinc-400">
          How evidence moves: each source, the Lines that read it when it lands, and the ClaimTypes those Lines may write.
          A source no Line reads, and statements on their author's own word, go straight to the ClaimTypes that accept them.
          Hover to trace; focus keeps only a path.
        </p>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-zinc-500">
          <span>
            <span className="font-mono text-zinc-200">{count("source")}</span> {count("source") === 1 ? "source" : "sources"}
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
                return (
                  <path
                    key={`${edge.from}\n${edge.to}`}
                    d={edgePath(from, to)}
                    fill="none"
                    stroke={edge.direct ? FLOW_COLOR.source : edge.required ? "rgb(222 219 208)" : "rgb(163 160 148)"}
                    strokeDasharray={edge.direct ? "4 3" : undefined}
                    strokeWidth={on ? 1.5 : 1}
                    strokeOpacity={on === null ? (edge.required ? 0.4 : 0.22) : on ? 0.9 : 0.05}
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

function FocusButton({ id, label, onFocus }: { id: string; label: string; onFocus: (id: string) => void }) {
  return (
    <button
      onClick={() => onFocus(id)}
      aria-label={`Focus ${label}`}
      title="Keep only this node's path"
      className="shrink-0 text-zinc-600 opacity-0 hover:text-zinc-200 focus:opacity-100 group-hover:opacity-100"
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
}: {
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

  if (node.kind === "source") {
    const tags = (node.contracts ?? []).map(contractName);
    return (
      <div
        style={{ ...style, borderLeft: `3px solid ${FLOW_COLOR.source}` }}
        className={`${base} flex-col items-stretch justify-center gap-0.5 border border-zinc-800 ${node.ownWord ? "border-dashed bg-zinc-950" : "bg-zinc-900/60"} px-2 leading-4`}
        title={[node.label, node.about, node.detail, tags.length ? `Captured under ${tags.join(", ")}` : null].filter(Boolean).join("\n")}
        {...hover}
      >
        <div className="flex items-center gap-1.5">
          <span className={`truncate text-[12px] ${node.ownWord ? "font-sans text-zinc-200" : "font-mono text-zinc-100"}`}>{node.label}</span>
          {node.arrives && <span className="ml-auto shrink-0 text-[10.5px] text-zinc-500">{node.arrives}</span>}
          <FocusButton id={node.id} label={node.label} onFocus={onFocus} />
        </div>
        <div className="truncate text-[11px] text-zinc-400">{node.about ?? node.detail}</div>
        {!node.ownWord && tags.length > 0 && (
          <div className="truncate text-[10.5px] text-zinc-600">
            {tags.map((t, i) => (
              <span key={t}>
                {i > 0 && ", "}
                <Link to={link(`/i/${instanceId}/contracts/${encodeURIComponent(t)}`)} className="hover:text-zinc-300 hover:underline">
                  {t}
                </Link>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
  if (node.kind === "line") {
    return (
      <div
        style={{ ...style, borderLeft: `3px solid ${FLOW_COLOR.line}` }}
        className={`${base} flex-col items-stretch justify-center gap-0.5 border border-zinc-800 bg-zinc-900 px-2 leading-4`}
        title={[node.label, node.about, node.detail, node.triggers?.length ? `Triggers: ${node.triggers.join(", ")}` : null].filter(Boolean).join("\n")}
        {...hover}
      >
        <div className="flex items-center gap-1.5">
          <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(node.label)}`)} className="truncate font-mono text-[12px] text-zinc-100 hover:underline">
            {strip(node.label, prefix)}
          </Link>
          {node.authority && (
            <span className="shrink-0 text-[10.5px] text-zinc-500" title={node.authority === "observe" ? "Capped at observe: it retains evidence and posts inbox items, but writes no Claims" : undefined}>
              {node.authority === "observe" ? "observe · writes no Claims" : `at most ${node.authority}`}
            </span>
          )}
          <FocusButton id={node.id} label={node.label} onFocus={onFocus} />
        </div>
        <div className="truncate text-[11px] text-zinc-400">{node.about ?? node.detail}</div>
        {node.about && <div className="truncate text-[10.5px] text-zinc-600">{node.detail}</div>}
      </div>
    );
  }
  // claim_type
  const kind = node.group ?? "";
  return (
    <div style={{ ...style, borderLeft: `2px solid ${FLOW_COLOR.claimType}` }} className={`${base} pl-3 text-[12px]`} title={[node.detail, node.about].filter(Boolean).join("\n")} {...hover}>
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

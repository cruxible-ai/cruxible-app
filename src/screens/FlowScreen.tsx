import { useCallback, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Crosshair } from "lucide-react";
import { useCaptureContracts, useClaimTypes, useInstanceId, useLines, useSourceModel } from "@/api/hooks";
import { EmptyState, LoadState } from "@/components/Panel";
import { FocusChip, useClearOnEscape } from "@/components/graph/FocusChip";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import {
  buildFlow,
  edgePath,
  focusFlow,
  layoutFlow,
  nodeId,
  related,
  type FlowModel,
  type Placed,
} from "@/lib/evidence-flow";
import { lineName } from "@/lib/lines";
import { retainedByWords } from "@/lib/definitions";
import { contractName } from "@/lib/ontology";
import { usePageTitle } from "@/lib/usePageTitle";

/**
 * Evidence flow: logical sources -> the contracts Captures land under -> the
 * Triggers those landings fire (and the Lines they start) and the ClaimTypes
 * that admit those Captures as evidence. Columns, every node a link to its
 * page; hovering a node lights its upstream and downstream, `?focus=` keeps
 * only that path. A logical source comes from the definitions (contracts no
 * longer list sources): the source steps that retain it and the landing
 * Triggers that select it (useSourceModel). Reads are ontology-sized: the
 * capture_contracts, claim_types, lines and procedures sections, the
 * Procedure cards and Line envelopes (get-batch, 64 a call) and the
 * capture-landing Trigger listing.
 */
export function FlowScreen() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  usePageTitle("Evidence flow");
  const [params, setParams] = useSearchParams();
  const focus = params.get("focus");
  const [hover, setHover] = useState<string | null>(null);

  const contracts = useCaptureContracts();
  const claimTypes = useClaimTypes();
  const lines = useLines();
  const sources = useSourceModel();

  const model = useMemo<FlowModel | null>(() => {
    if (!contracts.data || !claimTypes.data || !lines.data || !sources.data) return null;
    // The Procedures that retain Captures under each contract (a step that reads a landing does not).
    const producers = new Map<string, string[]>();
    for (const retention of sources.data.retentions) {
      const list = producers.get(retention.contract) ?? [];
      const ref = `Procedure:${retention.procedure}`;
      if (!list.includes(ref)) producers.set(retention.contract, [...list, ref].sort());
    }
    return buildFlow({
      contracts: contracts.data.rows.map((row) => ({ name: contractName(row.contract), grade: row.grade })),
      sources: sources.data.sources.map((source) => ({
        id: source.id,
        contracts: source.contracts,
        retainedBy: source.retainedBy.length ? `retained by ${retainedByWords(source.retainedBy)}` : "selected by a Trigger; no step names it",
      })),
      claimTypes: claimTypes.data.rows,
      triggers: sources.data.triggers,
      lineAuthority: new Map(lines.data.rows.map((row) => [lineName(row.line), row.authority] as const)),
      producers,
    });
  }, [contracts.data, claimTypes.data, lines.data, sources.data]);

  const clearFocus = useCallback(() => {
    const next = new URLSearchParams(params);
    next.delete("focus");
    setParams(next);
  }, [params, setParams]);
  useClearOnEscape(focus !== null, clearFocus);

  const shown = useMemo(() => (model ? focusFlow(model, focus) : null), [model, focus]);
  const layout = useMemo(() => (shown ? layoutFlow(shown) : null), [shown]);
  const lit = useMemo(() => (shown && hover ? related(shown, hover) : null), [shown, hover]);

  const error = contracts.error ?? claimTypes.error ?? lines.error ?? sources.error;
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
  const admissions = shown.edges.filter((e) => e.to.startsWith("claim_type:"));
  const focused = focus ? layout.byId.get(focus) ?? null : null;
  const capped = sources.data?.truncated || contracts.data?.truncated || claimTypes.data?.truncated;

  return (
    <div className="space-y-3">
      <header>
        <h1 className="t-title">Evidence flow</h1>
        <p className="mt-1 max-w-3xl text-[13px] text-zinc-400">
          Where evidence comes from, the contracts its Captures land under, and what each contract feeds: the Triggers its
          landings fire and the ClaimTypes that admit it. Hover a node to trace it; focus keeps only its path.
        </p>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-zinc-500">
          <span>
            <span className="font-mono text-zinc-200">{count("source")}</span> {count("source") === 1 ? "source" : "sources"}
          </span>
          <span>
            <span className="font-mono text-zinc-200">{count("contract")}</span> {count("contract") === 1 ? "contract" : "contracts"}
          </span>
          <span>
            <span className="font-mono text-zinc-200">{count("trigger")}</span> {count("trigger") === 1 ? "landing Trigger" : "landing Triggers"}
          </span>
          <span>
            <span className="font-mono text-zinc-200">{count("claim_type")}</span> {count("claim_type") === 1 ? "ClaimType taking Captures" : "ClaimTypes taking Captures"}
          </span>
          <span>
            <span className="font-mono text-zinc-200">{admissions.length}</span> {admissions.length === 1 ? "admission" : "admissions"},{" "}
            <span>{admissions.filter((e) => e.required).length} required</span>
          </span>
        </div>
        {capped && <div className="mt-1 text-[12px] text-zinc-500">A listing stopped at its page cap: the flow may be incomplete.</div>}
      </header>

      {focus && (
        // Sticky: the flow is long, and the way out of a focus stays in reach.
        <div className="sticky top-0 z-10 py-1">
          <FocusChip label={focused?.node ? focused.node.label : focus.startsWith("kind:") ? focus.slice(5) : focus} onClear={() => setFocus(null)} />
        </div>
      )}

      {shown.nodes.length === 0 ? (
        <EmptyState>No capture contracts at this generation.</EmptyState>
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
                    // Required admissions draw brighter, not in a color: color is for waiting and wrong only.
                    stroke={edge.required ? "rgb(222 219 208)" : "rgb(163 160 148)"}
                    strokeWidth={on ? 1.5 : 1}
                    strokeOpacity={on === null ? (edge.required ? 0.4 : 0.2) : on ? 0.9 : 0.05}
                  />
                );
              })}
            </svg>
            {layout.placed.map((p) => (
              <FlowCell
                key={p.id}
                placed={p}
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

function FlowCell({
  placed,
  dim,
  onHover,
  onFocus,
  instanceId,
  link,
}: {
  placed: Placed;
  dim: boolean;
  onHover: (id: string | null) => void;
  onFocus: (id: string) => void;
  instanceId: string;
  link: (path: string) => string;
}) {
  const style = { left: placed.x, top: placed.y, width: placed.w, height: placed.h };
  const base = `group absolute flex items-center gap-1.5 overflow-hidden transition-opacity ${dim ? "opacity-25" : ""}`;
  const hover = {
    onMouseEnter: () => onHover(placed.kind === "kind" ? nodeId.kind(placed.label ?? "") : placed.id),
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
        <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}`)} className="truncate font-mono font-medium text-zinc-300 hover:underline">
          {kind}
        </Link>
        <FocusButton id={nodeId.kind(kind)} label={kind} onFocus={onFocus} />
      </div>
    );
  }
  if (!node) return null;

  if (node.kind === "source") {
    return (
      <div
        style={style}
        className={`${base} flex-col items-stretch justify-center gap-0 border border-zinc-800 bg-zinc-900/60 px-2 leading-4`}
        title={node.detail ? `${node.label}: ${node.detail}` : node.label}
        {...hover}
      >
        <div className="flex items-center gap-1.5">
          <span className="truncate font-mono text-[12px] text-zinc-300">{node.label}</span>
          <FocusButton id={node.id} label={node.label} onFocus={onFocus} />
        </div>
        {node.detail && <div className="truncate text-[11px] text-zinc-500">{node.detail}</div>}
      </div>
    );
  }
  if (node.kind === "contract") {
    const producers = node.producers ?? [];
    return (
      <div style={style} className={`${base} flex-col items-stretch justify-center gap-0 border border-zinc-700 bg-zinc-900 px-2 leading-4`} {...hover}>
        <div className="flex items-center gap-1.5">
          <Link
            to={link(`/i/${instanceId}/contracts/${encodeURIComponent(node.label)}`)}
            className="truncate font-mono text-[12px] font-medium text-zinc-100 hover:underline"
            title={node.label}
          >
            {node.label}
          </Link>
          <FocusButton id={node.id} label={node.label} onFocus={onFocus} />
        </div>
        <div className="truncate text-[11px] text-zinc-500" title={producers.length ? `retained by ${producers.join(", ")}` : undefined}>
          {node.detail ?? "not in the contracts section"}
          {producers.length > 0 && (
            <>
              {" · by "}
              {producers.map((p, i) => (
                <span key={p}>
                  {i > 0 && ", "}
                  <RefLink value={p} className="text-zinc-400">
                    <span className="font-mono text-[11px]">{p.replace(/^[A-Za-z]+:/, "")}</span>
                  </RefLink>
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
  if (node.kind === "trigger") {
    const target = node.detail ?? "";
    return (
      <div
        style={style}
        className={`${base} flex-col items-stretch justify-center gap-0 border-l-2 border-zinc-600 pl-2 leading-4`}
        title={node.sources?.length ? `fires on landings from ${node.sources.join(", ")}` : "fires on any landing under its contract"}
        {...hover}
      >
        <div className="flex items-center gap-1.5">
          <RefLink value={`Trigger:${node.label}`} className="truncate">
            <span className="font-mono text-[12px]">{node.label}</span>
          </RefLink>
          <FocusButton id={node.id} label={node.label} onFocus={onFocus} />
        </div>
        <div className="truncate text-[11px] text-zinc-500">
          starts{" "}
          {target.startsWith("Line:") ? (
            <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(lineName(target))}`)} className="font-mono text-zinc-300 hover:underline">
              {lineName(target)}
            </Link>
          ) : (
            <span className="font-mono">{target || "—"}</span>
          )}
          {node.authority && <span> · at most {node.authority}</span>}
        </div>
      </div>
    );
  }
  // claim_type
  const kind = node.group ?? "";
  return (
    <div style={style} className={`${base} pl-3 text-[12px]`} title={node.detail} {...hover}>
      <Link
        to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?claim_type=${encodeURIComponent(node.detail ?? "")}`)}
        className="truncate font-mono text-zinc-300 hover:underline"
      >
        {node.label}
      </Link>
      {node.required && (
        <span className="shrink-0 text-[10px] text-zinc-400" title="A Capture under one of its contracts is required">
          captured
        </span>
      )}
      <FocusButton id={node.id} label={node.label} onFocus={onFocus} />
    </div>
  );
}

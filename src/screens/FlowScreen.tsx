import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Crosshair, X } from "lucide-react";
import {
  useCaptureContracts,
  useClaimTypes,
  useGetBatch,
  useInstanceId,
  useLandingTriggers,
  useLines,
  usePins,
} from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { EmptyState, LoadState } from "@/components/Panel";
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
import { contractName, contractProducers, readContractDefinition } from "@/lib/ontology";
import { usePageTitle } from "@/lib/usePageTitle";

const cellText = (value: unknown) => (typeof value === "string" ? value : "");

/**
 * Evidence flow: logical sources -> the contracts Captures land under -> the
 * Triggers those landings fire (and the Lines they start) and the ClaimTypes
 * that admit those Captures as evidence. Columns, every node a link to its
 * page; hovering a node lights its upstream and downstream, `?focus=` keeps
 * only that path. Reads are ontology-sized: the capture_contracts,
 * claim_types, lines and pins sections, the contract cards (one get-batch
 * per 64 contracts, for their sources) and the capture-landing Trigger
 * listing.
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
  const triggers = useLandingTriggers();
  const lines = useLines();
  const pins = usePins();
  const names = useMemo(() => (contracts.data?.rows ?? []).map((row) => contractName(row.contract)), [contracts.data]);
  const cards = useGetBatch(names.map((name) => `CaptureContract:${name}`));

  const model = useMemo<FlowModel | null>(() => {
    if (!contracts.data || !claimTypes.data || !triggers.data || !lines.data || cards.isPending) return null;
    const sources = new Map<string, string[]>();
    for (const result of cards.results) {
      const card = cardOf(result, "capture_contract");
      if (card) sources.set(contractName(card.contract), readContractDefinition(card.captures).sources);
    }
    const producers = new Map(
      names.map((name) => [name, pins.data ? contractProducers(pins.data.rows, name).map((p) => p.source) : []] as const),
    );
    return buildFlow({
      contracts: contracts.data.rows.map((row) => ({ name: contractName(row.contract), grade: row.grade })),
      sources,
      claimTypes: claimTypes.data.rows,
      triggers: triggers.data.rows.map((row) => ({
        name: cellText(row.name),
        contract: cellText(row.capture_contract),
        target: cellText(row.target),
      })),
      lineAuthority: new Map(lines.data.rows.map((row) => [lineName(row.line), row.authority] as const)),
      producers,
    });
  }, [contracts.data, claimTypes.data, triggers.data, lines.data, cards.isPending, cards.results, pins.data, names]);

  const shown = useMemo(() => (model ? focusFlow(model, focus) : null), [model, focus]);
  const layout = useMemo(() => (shown ? layoutFlow(shown) : null), [shown]);
  const lit = useMemo(() => (shown && hover ? related(shown, hover) : null), [shown, hover]);

  const error = contracts.error ?? claimTypes.error ?? triggers.error ?? lines.error ?? cards.error;
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
  const capped = (triggers.data?.capped?.length ?? 0) > 0 || contracts.data?.truncated || claimTypes.data?.truncated || pins.data?.truncated;

  return (
    <div className="space-y-3">
      <header>
        <h1 className="text-[17px] font-semibold text-zinc-100">Evidence flow</h1>
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
            <span className="text-amber-400/90">{admissions.filter((e) => e.required).length} required</span>
          </span>
          {focus && (
            <button onClick={() => setFocus(null)} className="inline-flex items-center gap-1 text-zinc-300 hover:text-white">
              <X className="h-3.5 w-3.5" /> clear focus{focused?.node ? ` on ${focused.node.label}` : focus.startsWith("kind:") ? ` on ${focus.slice(5)}` : ""}
            </button>
          )}
        </div>
        {capped && <div className="mt-1 text-[12px] text-amber-400/90">A listing stopped at its page cap: the flow may be incomplete.</div>}
      </header>

      {shown.nodes.length === 0 ? (
        <EmptyState>No capture contracts at this generation.</EmptyState>
      ) : (
        <div className="overflow-x-auto">
          <div className="relative" style={{ width: layout.width, height: layout.height }} data-testid="flow">
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
                    stroke={edge.required ? "rgb(251 191 36)" : "rgb(161 161 170)"}
                    strokeWidth={on ? 1.5 : 1}
                    strokeOpacity={on === null ? (edge.required ? 0.35 : 0.25) : on ? 0.9 : 0.05}
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
      <div style={style} className={`${base} border border-zinc-800 bg-zinc-900/60 px-2 text-[12px]`} title={node.label} {...hover}>
        <span className="truncate font-mono text-zinc-300">{node.label}</span>
        <FocusButton id={node.id} label={node.label} onFocus={onFocus} />
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
        <div className="truncate text-[11px] text-zinc-500" title={producers.length ? `captured by ${producers.join(", ")}` : undefined}>
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
      <div style={style} className={`${base} flex-col items-stretch justify-center gap-0 border-l-2 border-sky-700/70 pl-2 leading-4`} {...hover}>
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
          {node.authority && <span> · max {node.authority}</span>}
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
        <span className="shrink-0 text-[10px] text-amber-400/90" title="A Capture under one of its contracts is required">
          captured
        </span>
      )}
      <FocusButton id={node.id} label={node.label} onFocus={onFocus} />
    </div>
  );
}

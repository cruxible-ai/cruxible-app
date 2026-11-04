import { useMemo } from "react";
import { AUTHORITY_COLOR } from "@/lib/palette";
import { flowHeight, layoutFlow, type EvidenceFlow, type Freshness, type PlacedFlowLink, type PlacedFlowNode } from "@/lib/overview";
import { formatDateTime, formatRelative } from "@/lib/text";
import { counted, Legend, SvgLink, Swatch, Tip, useInstancePath, useTip, useWidth, type TipRow } from "./ChartBits";

/** A source's freshness, as a color: green landed within a day, grey within a week, amber older (re-observe it), dashed never. */
export const FRESHNESS: Record<Freshness, { color: string; word: string }> = {
  fresh: { color: "#30d158", word: "Within a day" },
  aging: { color: "#a3a094", word: "Within a week" },
  stale: { color: "#ffb224", word: "Older" },
  never: { color: "#58554b", word: "Never landed" },
};

export interface SourceFacts {
  freshness: Freshness;
  landedAt: string | null;
  landings: number;
}

const NODE = 12;
/** Room for the labels left of the sources and right of the kinds. */
const LEFT = 168;
const RIGHT = 168;

/**
 * Where the evidence comes from, as a Sankey: sources (colored by when they
 * last landed) → the Lines that read them (in their authority's color) → the
 * kinds whose Claims they write, plus Entered directly. Band width is live
 * Claims. Every node and band links: a source to the Evidence flow, a Line
 * and its bands to the Line, a kind and the bands entered directly to the kind.
 */
export function EvidenceSankey({
  flow,
  sources,
  authority,
  colorOf,
  label,
}: {
  flow: EvidenceFlow;
  sources: ReadonlyMap<string, SourceFacts>;
  /** Each Line's authority (settle / propose / observe). */
  authority: ReadonlyMap<string, string>;
  colorOf: (kind: string) => string;
  label: (kind: string) => string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>(1100);
  const height = flowHeight(flow);
  const inner = Math.max(240, width - LEFT - RIGHT);
  const layout = useMemo(() => layoutFlow(flow, { width: inner, height, nodeWidth: NODE }), [flow, inner, height]);
  const path = useInstancePath();
  const { shown, bind } = useTip();
  const nodes = new Map(layout.nodes.map((n) => [n.id, n]));
  const labelAt = useMemo(() => spreadLabels(layout.nodes, height), [layout.nodes, height]);

  const colorOfNode = (node: PlacedFlowNode | undefined): string => {
    if (!node) return "#58554b";
    if (node.role === "source") return FRESHNESS[sources.get(node.name)?.freshness ?? "never"].color;
    if (node.role === "line") return lineColor(authority.get(node.name));
    if (node.role === "direct") return "#726f63";
    return colorOf(node.name);
  };
  const nameOf = (node: PlacedFlowNode | undefined) =>
    !node ? "" : node.role === "direct" ? "Entered directly" : node.role === "kind" ? label(node.name) : node.name;
  const linkTo = (link: PlacedFlowLink) => {
    const s = nodes.get(link.source);
    const t = nodes.get(link.target);
    if (t?.role === "line") return `/lines/${encodeURIComponent(t.name)}`;
    if (s?.role === "line") return `/lines/${encodeURIComponent(s.name)}`;
    return `/kinds/${encodeURIComponent(t?.name ?? "")}`;
  };
  const nodeTo = (node: PlacedFlowNode) =>
    node.role === "source"
      ? `/flow?focus=${encodeURIComponent(`source:${node.name}`)}`
      : node.role === "line"
        ? `/lines/${encodeURIComponent(node.name)}`
        : node.role === "kind"
          ? `/kinds/${encodeURIComponent(node.name)}`
          : null;
  const usedFreshness = [...new Set(flow.nodes.filter((n) => n.role === "source").map((n) => sources.get(n.name)?.freshness ?? "never"))];
  const usedAuthority = [...new Set(flow.nodes.filter((n) => n.role === "line").map((n) => authority.get(n.name) ?? "none"))];

  return (
    <div>
      <div ref={ref} className="relative">
        <svg width={width} height={height} role="group" aria-label="Evidence flow: sources to Lines to kinds, band width is live Claims" className="block">
          <defs>
            {layout.links.map((link, i) => (
              <linearGradient key={i} id={`sk-band-${i}`} gradientUnits="userSpaceOnUse" x1={(nodes.get(link.source)?.x ?? 0) + NODE} x2={nodes.get(link.target)?.x ?? 0}>
                <stop offset="0%" stopColor={colorOfNode(nodes.get(link.source))} />
                <stop offset="100%" stopColor={colorOfNode(nodes.get(link.target))} />
              </linearGradient>
            ))}
          </defs>
          <g transform={`translate(${LEFT},0)`}>
            {layout.links.map((link, i) => {
              const s = nodes.get(link.source);
              const t = nodes.get(link.target);
              const value = claimsWord(link.value);
              const rows: TipRow[] = [["Claims", value]];
              if (link.claimTypes.length) rows.push(["ClaimTypes", link.claimTypes.map((c) => c.split(".").at(-1)).join(", ")]);
              if (s?.role === "source") {
                const facts = sources.get(s.name);
                if (facts?.landedAt) rows.push(["Last landed", formatRelative(facts.landedAt)]);
              }
              const midX = LEFT + ((s?.x ?? 0) + NODE + (t?.x ?? 0)) / 2;
              return (
                <SvgLink
                  key={`${link.source}\n${link.target}`}
                  to={path(linkTo(link))}
                  label={`${nameOf(s)} to ${nameOf(t)}: ${counted(value, "Claim")}`}
                  className="group"
                  {...bind({ kicker: "Flow", title: `${nameOf(s)} → ${nameOf(t)}`, rows }, { x: midX, y: (link.y0 + link.y1) / 2 })}
                >
                  <path d={link.path} fill={`url(#sk-band-${i})`} className="mark opacity-30 transition-opacity group-hover:opacity-60" stroke="none" />
                </SvgLink>
              );
            })}
            {layout.nodes.map((node) => {
              const color = colorOfNode(node);
              const facts = node.role === "source" ? sources.get(node.name) : undefined;
              const rows: TipRow[] = [["Claims", claimsWord(node.value)]];
              if (facts) {
                rows.push(["Last landed", facts.landedAt ? formatRelative(facts.landedAt) : "never"]);
                if (facts.landedAt) rows.push(["At", formatDateTime(facts.landedAt)]);
                rows.push(["Captures", facts.landings.toLocaleString()]);
              }
              if (node.role === "line") rows.push(["Authority", authority.get(node.name) ?? "—"]);
              const to = nodeTo(node);
              const kicker = node.role === "source" ? "Source" : node.role === "line" ? "Line" : node.role === "kind" ? "Kind" : "No Line";
              const labelRight = node.column !== 0;
              const lx = labelRight ? node.x + NODE + 8 : node.x - 8;
              const ly = labelAt.get(node.id) ?? node.y + node.height / 2;
              const body = (
                <>
                  <rect
                    x={node.x}
                    y={node.y}
                    width={NODE}
                    height={Math.max(2, node.height)}
                    fill={facts?.freshness === "never" ? "transparent" : color}
                    stroke={facts?.freshness === "never" || node.role === "direct" ? color : "none"}
                    strokeDasharray={facts?.freshness === "never" || node.role === "direct" ? "3 2" : undefined}
                    className="mark"
                  />
                  <text
                    x={lx}
                    y={ly}
                    dy="-0.15em"
                    textAnchor={labelRight ? "start" : "end"}
                    className={`text-[12.5px] ${node.role === "direct" ? "fill-zinc-400" : "fill-zinc-100 font-mono"} ${to ? "group-hover:underline" : ""}`}
                  >
                    {nameOf(node)}
                  </text>
                  <text
                    x={lx}
                    y={ly}
                    dy="1.05em"
                    textAnchor={labelRight ? "start" : "end"}
                    className="fill-zinc-500 text-[11px]"
                  >
                    {counted(claimsWord(node.value), "Claim")}
                    {facts ? ` · ${facts.landedAt ? formatRelative(facts.landedAt) : "never landed"}` : ""}
                  </text>
                </>
              );
              const tip = bind({ kicker, title: node.role === "kind" ? node.name : nameOf(node), rows }, { x: LEFT + node.x + NODE, y: node.y });
              return to ? (
                <SvgLink key={node.id} to={path(to)} label={`${kicker} ${nameOf(node)}: ${counted(claimsWord(node.value), "Claim")}`} className="group" {...tip}>
                  {body}
                </SvgLink>
              ) : (
                <g key={node.id} tabIndex={0} aria-label={`${nameOf(node)}: ${counted(claimsWord(node.value), "Claim")}`} className="outline-none [&:focus-visible_.mark]:stroke-zinc-50" {...tip}>
                  {body}
                </g>
              );
            })}
          </g>
        </svg>
        <Tip shown={shown} width={width} />
      </div>
      <Legend label="Source last landed">
        {usedFreshness.map((f) => (
          <Swatch key={f} color={FRESHNESS[f].color} dashed={f === "never"}>
            {FRESHNESS[f].word}
          </Swatch>
        ))}
        <span className="ml-3 text-[10.5px] font-medium uppercase tracking-[0.08em] text-zinc-500">Line</span>
        {usedAuthority.map((a) => (
          <Swatch key={a} color={lineColor(a)}>
            {AUTHORITY_WORD[a] ?? "Written by hand"}
          </Swatch>
        ))}
      </Legend>
    </div>
  );
}

/** A label's height: its name and its count line. */
const LABEL_HEIGHT = 30;

/**
 * Each node's label middle: beside its node, pushed apart within a column so
 * two labels never overlap (small nodes stacked close together), and kept
 * inside the chart.
 */
function spreadLabels(nodes: readonly PlacedFlowNode[], height: number): Map<string, number> {
  const out = new Map<string, number>();
  for (const column of [0, 1, 2]) {
    const list = nodes.filter((n) => n.column === column).sort((a, b) => a.y - b.y);
    const at = list.map((n) => n.y + n.height / 2);
    for (let i = 1; i < at.length; i += 1) at[i] = Math.max(at[i]!, at[i - 1]! + LABEL_HEIGHT);
    for (let i = at.length - 1; i >= 0; i -= 1) {
      const limit = i === at.length - 1 ? height - LABEL_HEIGHT / 2 : at[i + 1]! - LABEL_HEIGHT;
      at[i] = Math.max(LABEL_HEIGHT / 2, Math.min(at[i]!, limit));
    }
    list.forEach((n, i) => out.set(n.id, at[i]!));
  }
  return out;
}

const AUTHORITY_WORD: Record<string, string> = { settle: "May settle", propose: "Proposes for review", observe: "Observes" };

const lineColor = (authority: string | undefined) =>
  authority === "settle" || authority === "propose" || authority === "observe" ? AUTHORITY_COLOR[authority] : AUTHORITY_COLOR.none;

/** A Claim count as shown: whole numbers as they are, a shared split rounded with ≈. */
export const claimsWord = (value: number) => (Number.isInteger(value) ? value.toLocaleString() : `≈${Math.round(value).toLocaleString()}`);

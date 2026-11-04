import { useMemo } from "react";
import { bubbleRadius, layoutKnowledgeMap, mapHeight, type KindClaimType, type MapPlacement } from "@/lib/overview";
import { counted, SvgLink, Tip, useInstancePath, useTip, useWidth, type TipRow } from "./ChartBits";

export interface MapKind {
  kind: string;
  subjects: number;
  /** Live Claims; null until the kind read lands. */
  claims: number | null;
  claimTypes: KindClaimType[];
  referencedOnly: boolean;
}

export interface MapLink {
  id: string;
  source: string;
  target: string;
  predicates: string[];
  label: string;
}

/** ClaimTypes named under a bubble. */
const NAMED = 2;

/**
 * What the instance knows, as a compact live type map: kinds as bubbles in
 * their kind color, sized by Subjects, with their count and main ClaimTypes;
 * arrows are the Subject-valued ClaimTypes between kinds. A bubble opens its
 * kind; an arrow opens its ClaimType.
 */
export function KnowledgeMap({
  kinds,
  links,
  colorOf,
  label,
}: {
  kinds: MapKind[];
  links: MapLink[];
  colorOf: (kind: string) => string;
  label: (kind: string) => string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>(720);
  const height = mapHeight(kinds.length);
  const most = Math.max(0, ...kinds.map((k) => k.subjects));
  const placed = useMemo(
    () =>
      layoutKnowledgeMap(
        // Few kinds draw larger: the map should fill its card either way.
        kinds.map((k) => ({ kind: k.kind, r: bubbleRadius(k.subjects, most, { max: kinds.length <= 4 ? 80 : kinds.length <= 8 ? 64 : 52 }) })),
        links,
        width,
        height,
      ),
    [kinds, links, most, width, height],
  );
  const path = useInstancePath();
  const { shown, bind } = useTip();
  const byKind = new Map(kinds.map((k) => [k.kind, k]));

  return (
    <div ref={ref} className="relative">
      <svg width={width} height={height} role="group" aria-label="Knowledge map: kinds sized by Subjects, arrows are Subject-valued ClaimTypes" className="block">
        <defs>
          <marker id="km-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9 z" fill="#726f63" />
          </marker>
          {kinds.map((k) => (
            <radialGradient key={k.kind} id={gradientId(k.kind)} cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor={colorOf(k.kind)} stopOpacity={0.5} />
              <stop offset="100%" stopColor={colorOf(k.kind)} stopOpacity={0.14} />
            </radialGradient>
          ))}
        </defs>
        {links.map((link) => {
          const a = placed.get(link.source);
          const b = placed.get(link.target);
          if (!a || !b) return null;
          const geometry = edgeGeometry(a, b, link.source === link.target);
          const fromKind = byKind.get(link.source);
          const claims = fromKind?.claimTypes.filter((c) => link.predicates.includes(c.predicate)).reduce((t, c) => t + c.claims, 0) ?? 0;
          const rows: TipRow[] = [
            ["From", label(link.source)],
            ["To", label(link.target)],
            ["Claims", claims.toLocaleString()],
          ];
          const to = link.predicates.length === 1 ? `/claim-types/${encodeURIComponent(link.predicates[0]!)}` : `/map?claim_type=${encodeURIComponent(link.predicates[0] ?? "")}`;
          return (
            <SvgLink
              key={link.id}
              to={path(to)}
              label={`${link.predicates.join(", ")}: ${label(link.source)} to ${label(link.target)}`}
              className="group"
              {...bind({ kicker: link.predicates.length === 1 ? "ClaimType" : "ClaimTypes", title: link.predicates.join("\n"), rows }, geometry.mid)}
            >
              {/* A wide invisible stroke makes the arrow easy to hover. */}
              <path d={geometry.d} fill="none" stroke="transparent" strokeWidth={14} />
              <path d={geometry.d} fill="none" className="mark stroke-zinc-500 group-hover:stroke-zinc-200" strokeWidth={1.4} markerEnd="url(#km-arrow)" />
              {link.label && (
                <text
                  x={geometry.mid.x}
                  y={geometry.mid.y - 5}
                  textAnchor="middle"
                  className="fill-zinc-400 font-mono text-[11px] group-hover:fill-zinc-100"
                  style={{ paintOrder: "stroke", stroke: "#09090b", strokeWidth: 4, strokeLinejoin: "round" }}
                >
                  {link.label}
                </text>
              )}
            </SvgLink>
          );
        })}
        {kinds.map((k) => {
          const at = placed.get(k.kind);
          if (!at) return null;
          const color = colorOf(k.kind);
          const named = k.claimTypes.slice(0, NAMED).map((c) => c.name);
          const more = k.claimTypes.length - named.length;
          const rows: TipRow[] = [
            ["Subjects", k.subjects.toLocaleString()],
            ["Claims", k.claims === null ? "…" : k.claims.toLocaleString()],
            ["ClaimTypes", k.claimTypes.length.toLocaleString()],
            ...k.claimTypes.slice(0, 4).map((c): TipRow => [c.name, c.claims.toLocaleString()]),
          ];
          return (
            <SvgLink
              key={k.kind}
              to={path(`/kinds/${encodeURIComponent(k.kind)}`)}
              label={`${k.kind}: ${counted(k.subjects, "Subject")}`}
              className="group"
              {...bind({ kicker: "Kind", title: k.kind, rows }, { x: at.x + at.r * 0.7, y: at.y - at.r })}
            >
              <circle
                cx={at.x}
                cy={at.y}
                r={at.r}
                fill={`url(#${gradientId(k.kind)})`}
                stroke={color}
                strokeWidth={1.5}
                strokeDasharray={k.referencedOnly ? "4 3" : undefined}
                className="mark transition-[stroke-width] group-hover:[stroke-width:2.5px]"
              />
              <text x={at.x} y={at.y} dy="0.35em" textAnchor="middle" className="font-mono font-semibold" fill="#f7f5f0" style={{ fontSize: Math.max(12, Math.min(26, at.r * 0.48)) }}>
                {k.subjects.toLocaleString()}
              </text>
              <text x={at.x} y={at.y + at.r + 16} textAnchor="middle" className="fill-zinc-100 font-mono text-[12.5px] group-hover:underline">
                {label(k.kind)}
              </text>
              {named.length > 0 && (
                <text x={at.x} y={at.y + at.r + 31} textAnchor="middle" className="fill-zinc-500 font-mono text-[10.5px]">
                  {named.join(" · ")}
                  {more > 0 ? ` +${more}` : ""}
                </text>
              )}
            </SvgLink>
          );
        })}
      </svg>
      <Tip shown={shown} width={width} />
    </div>
  );
}

const gradientId = (kind: string) => `km-${kind.replace(/[^A-Za-z0-9_-]/g, "_")}`;

/** An arrow from bubble edge to bubble edge, bowed slightly so two-way links stay apart; a loop for a kind pointing at itself. */
function edgeGeometry(a: MapPlacement, b: MapPlacement, loop: boolean): { d: string; mid: { x: number; y: number } } {
  if (loop) {
    const x = a.x;
    const y = a.y - a.r;
    const w = Math.max(18, a.r * 0.6);
    return { d: `M${x - w * 0.5},${y + 3} C${x - w},${y - 46} ${x + w},${y - 46} ${x + w * 0.5},${y + 3}`, mid: { x, y: y - 34 } };
  }
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const start = { x: a.x + ux * (a.r + 3), y: a.y + uy * (a.r + 3) };
  const end = { x: b.x - ux * (b.r + 5), y: b.y - uy * (b.r + 5) };
  const bow = Math.min(24, length * 0.08);
  const control = { x: (start.x + end.x) / 2 - uy * bow, y: (start.y + end.y) / 2 + ux * bow };
  const mid = { x: (start.x + 2 * control.x + end.x) / 4, y: (start.y + 2 * control.y + end.y) / 4 };
  return { d: `M${start.x},${start.y} Q${control.x},${control.y} ${end.x},${end.y}`, mid };
}

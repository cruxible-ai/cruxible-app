import { useMemo } from "react";
import { PALETTE } from "@/lib/palette";
import { stackGrowth, type GrowthMarker, type GrowthPoint } from "@/lib/overview";
import { formatDateTime } from "@/lib/text";
import { counted, Legend, SvgLink, Swatch, Tip, useInstancePath, useTip, useWidth, type TipRow } from "./ChartBits";

const HEIGHT = 250;
const M = { top: 14, right: 18, bottom: 54, left: 46 };
const MARKER_Y = HEIGHT - 14;

/** A Line run's mark and a kit change's. */
const RUN_COLOR = "#dedbd0";
const KIT_COLOR = PALETTE.sky;

/**
 * How the instance grew: live Claims by kind, stacked, at the generations
 * read (each holds until the next), with marks under the axis where a Line's
 * run or a kit change was accepted. A generation column opens the Overview as
 * it stood then; a run mark opens the run.
 */
export function GrowthChart({
  points,
  lo,
  head,
  markers,
  colorOf,
  label,
}: {
  points: GrowthPoint[];
  lo: number;
  head: number;
  markers: GrowthMarker[];
  colorOf: (kind: string) => string;
  label: (kind: string) => string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>(1100);
  const path = useInstancePath();
  const { shown, bind } = useTip();
  const { layers, max } = useMemo(() => stackGrowth(points), [points]);
  const top = niceMax(max);
  const plotW = Math.max(120, width - M.left - M.right);
  const plotH = HEIGHT - M.top - M.bottom;
  // Generation N occupies [N, N + 1): the page's own generation gets its width too.
  const span = head + 1 - lo;
  const x = (sequence: number) => M.left + ((sequence - lo) / span) * plotW;
  /** The middle of generation N's slot, where its label, column and marks sit. */
  const xm = (sequence: number) => x(sequence + 0.5);
  const y = (value: number) => M.top + plotH - (top > 0 ? (value / top) * plotH : 0);
  const ticks = [0, top / 2, top].filter((v, i, all) => all.indexOf(v) === i);
  const generationTicks = axisTicks(lo, head, Math.max(2, Math.floor(plotW / 90)));

  /** Step-after outline of one layer: a reading holds until the next one. */
  const area = (values: [number, number][]) => {
    if (points.length === 0) return "";
    const upper: string[] = [];
    const lower: string[] = [];
    points.forEach((p, i) => {
      const x0 = x(p.sequence);
      const x1 = i + 1 < points.length ? x(points[i + 1]!.sequence) : x(head + 1);
      upper.push(`${x0},${y(values[i]![1])}`, `${x1},${y(values[i]![1])}`);
      lower.unshift(`${x1},${y(values[i]![0])}`, `${x0},${y(values[i]![0])}`);
    });
    return `M${upper.join("L")}L${lower.join("L")}Z`;
  };
  const line = (values: [number, number][]) =>
    points.length === 0
      ? ""
      : "M" +
        points
          .flatMap((p, i) => {
            const x0 = x(p.sequence);
            const x1 = i + 1 < points.length ? x(points[i + 1]!.sequence) : x(head + 1);
            return [`${x0},${y(values[i]![1])}`, `${x1},${y(values[i]![1])}`];
          })
          .join("L");

  const totals = points.map((p) => [...p.byKind.values()].reduce((a, b) => a + b, 0));
  const kindsShown = layers.filter((l) => l.values.some(([a, b]) => b > a)).map((l) => l.kind);

  return (
    <div>
      <div ref={ref} className="relative">
        <svg width={width} height={HEIGHT} role="group" aria-label={`Live Claims by kind, generations ${lo} to ${head}`} className="block">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={M.left} x2={M.left + plotW} y1={y(t)} y2={y(t)} className="stroke-zinc-800" strokeDasharray={t === 0 ? undefined : "2 4"} />
              <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-zinc-500 font-mono text-[11px]">
                {compact(t)}
              </text>
            </g>
          ))}
          {layers.map((layer) => (
            <g key={layer.kind}>
              <path d={area(layer.values)} fill={colorOf(layer.kind)} fillOpacity={0.28} />
              <path d={line(layer.values)} fill="none" stroke={colorOf(layer.kind)} strokeWidth={1.75} strokeLinejoin="round" />
            </g>
          ))}
          {generationTicks.map((g) => (
            <text key={g} x={xm(g)} y={M.top + plotH + 16} textAnchor="middle" className="fill-zinc-500 font-mono text-[11px]">
              g{g}
            </text>
          ))}
          {/* One column per generation read: hover or focus for its counts, click for the Overview then. */}
          {points.map((p, i) => {
            const left = x(p.sequence);
            const right = i + 1 < points.length ? x(points[i + 1]!.sequence) : x(head + 1);
            const before = i > 0 ? totals[i - 1]! : null;
            const rows: TipRow[] = [];
            if (p.acceptedAt) rows.push(["Accepted", formatDateTime(p.acceptedAt)]);
            rows.push(["Claims", `${totals[i]!.toLocaleString()}${before !== null ? ` (${delta(totals[i]! - before)})` : ""}`]);
            for (const kind of kindsShown) {
              const now = p.byKind.get(kind) ?? 0;
              const was = i > 0 ? (points[i - 1]!.byKind.get(kind) ?? 0) : null;
              if (now === 0 && !was) continue;
              rows.push([label(kind), `${now.toLocaleString()}${was !== null && now !== was ? ` (${delta(now - was)})` : ""}`]);
            }
            return (
              <SvgLink
                key={p.sequence}
                to={withAt(path("/overview"), p.sequence)}
                label={`Generation ${p.sequence}: ${counted(totals[i]!, "live Claim")}`}
                className="group"
                {...bind({ kicker: "Generation", title: `g${p.sequence}`, rows }, { x: xm(p.sequence), y: y(totals[i]!) })}
              >
                <rect x={left} y={M.top} width={Math.max(1, right - left)} height={plotH} className="mark fill-transparent group-hover:fill-zinc-50/[0.04]" />
                <line x1={xm(p.sequence)} x2={xm(p.sequence)} y1={M.top} y2={M.top + plotH} className="stroke-zinc-400 opacity-0 group-hover:opacity-60 group-focus-visible:opacity-60" strokeDasharray="2 3" />
                <circle cx={x(p.sequence)} cy={y(totals[i]!)} r={2.5} className="fill-zinc-200" />
              </SvgLink>
            );
          })}
          <line x1={M.left} x2={M.left + plotW} y1={MARKER_Y} y2={MARKER_Y} className="stroke-zinc-800" />
          {markers.map((m) => {
            const mx = xm(m.sequence);
            const rows: TipRow[] = [
              ["Generation", `g${m.sequence}`],
              ["Accepted", formatDateTime(m.acceptedAt)],
              ["Changes", m.members.toLocaleString()],
            ];
            if (m.kind === "run") rows.splice(0, 0, ["Run", `${m.run.slice(0, 16)}…`]);
            return (
              <SvgLink
                key={`${m.kind}-${m.sequence}`}
                to={m.kind === "run" ? path(`/runs/${encodeURIComponent(m.run)}`) : withAt(path("/ledger"), m.sequence)}
                label={m.kind === "run" ? `Generation ${m.sequence}: run of ${m.procedure}` : `Generation ${m.sequence}: ${m.words}`}
                className="group"
                {...bind(m.kind === "run" ? { kicker: "Line run", title: m.procedure, rows } : { kicker: "Kit", title: m.words, rows }, { x: mx, y: MARKER_Y - 8 })}
              >
                <rect x={mx - 8} y={MARKER_Y - 9} width={16} height={18} fill="transparent" />
                {m.kind === "run" ? (
                  <circle cx={mx} cy={MARKER_Y} r={4.5} fill={RUN_COLOR} className="mark" stroke="#09090b" strokeWidth={1.5} />
                ) : (
                  <path d={`M${mx},${MARKER_Y - 6} L${mx + 6},${MARKER_Y} L${mx},${MARKER_Y + 6} L${mx - 6},${MARKER_Y} Z`} fill={KIT_COLOR} className="mark" stroke="#09090b" strokeWidth={1.5} />
                )}
              </SvgLink>
            );
          })}
        </svg>
        <Tip shown={shown} width={width} />
      </div>
      <Legend>
        {kindsShown.map((kind) => (
          <Swatch key={kind} color={colorOf(kind)}>
            <span className="font-mono">{label(kind)}</span>
          </Swatch>
        ))}
        {markers.some((m) => m.kind === "run") && (
          <Swatch color={RUN_COLOR} shape="dot">
            Line run
          </Swatch>
        )}
        {markers.some((m) => m.kind === "kit") && (
          <Swatch color={KIT_COLOR} shape="dot">
            Kit change
          </Swatch>
        )}
      </Legend>
    </div>
  );
}

/** `path` pinned to generation `at` (replacing any pin it carries). */
function withAt(path: string, at: number): string {
  const [base, query = ""] = path.split("?", 2) as [string, string?];
  const params = new URLSearchParams(query);
  params.set("at", String(at));
  return `${base}?${params.toString()}`;
}

const delta = (n: number) => (n > 0 ? `+${n.toLocaleString()}` : n < 0 ? `−${(-n).toLocaleString()}` : "±0");

const compact = (n: number) => (n >= 10_000 ? `${Math.round(n / 1000)}k` : n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(Math.round(n)));

/** A round axis top at or above `max`. */
function niceMax(max: number): number {
  if (max <= 0) return 0;
  const step = 10 ** Math.floor(Math.log10(max));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * step >= max) return m * step;
  return 10 * step;
}

/** Up to `count` evenly spaced generation labels over [lo, head], ends included. */
function axisTicks(lo: number, head: number, count: number): number[] {
  if (head <= lo) return [lo];
  const step = Math.max(1, Math.ceil((head - lo) / (count - 1)));
  const out: number[] = [];
  for (let g = lo; g < head; g += step) out.push(g);
  if (head - (out.at(-1) ?? lo) < step / 2 && out.length > 1) out.pop();
  out.push(head);
  return out;
}

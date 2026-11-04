import { Link } from "react-router-dom";
import type { EvidenceMix, EvidencePart } from "@/lib/overview";
import { counted, Legend, Swatch, Tip, useInstancePath, useTip, useWidth, type TipRow } from "./ChartBits";

/** Each evidence rule's color and word (the ClaimType table's words). */
export const EVIDENCE_PART: Record<EvidencePart, { color: string; word: string }> = {
  captured: { color: "#34d399", word: "Captured" },
  ownWords: { color: "#818cf8", word: "Own words" },
  none: { color: "#58554b", word: "None" },
};
const PARTS: EvidencePart[] = ["captured", "ownWords", "none"];

/** The instance's Claims by state (orient's counts), each with its color and list. */
export interface ClaimStateCount {
  key: string;
  word: string;
  count: number;
  color: string;
  /** In-app path of the list it opens. */
  to: string;
}

export interface TrustRow {
  kind: string;
  mix: EvidenceMix | null;
}

const LABEL = 132;
const TOTAL = 56;

/**
 * How the instance stands: per kind, one bar of its live Claims split by the
 * evidence rule of their ClaimTypes (captured evidence, the author's own
 * words, none); under it, the instance's Claims by state, and what waits for
 * review. Every segment opens the list behind it; counts show on hover and
 * focus.
 */
export function TrustBars({
  rows,
  states,
  waiting,
  colorOf,
  label,
}: {
  rows: TrustRow[];
  states: ClaimStateCount[];
  waiting: number | null;
  colorOf: (kind: string) => string;
  label: (kind: string) => string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>(520);
  const path = useInstancePath();
  const { shown, bind } = useTip();
  const bar = Math.max(80, width - LABEL - TOTAL - 16);
  const sorted = [...rows].sort((a, b) => (b.mix?.total ?? 0) - (a.mix?.total ?? 0) || (a.kind < b.kind ? -1 : 1));
  const used = PARTS.filter((part) => rows.some((r) => (r.mix?.parts[part] ?? 0) > 0));
  const stateTotal = states.reduce((sum, s) => sum + s.count, 0);

  return (
    <div>
      <div ref={ref} className="relative">
        <ul className="space-y-2.5" aria-label="Live Claims by evidence rule, per kind">
          {sorted.map((row, index) => {
            const total = row.mix?.total ?? 0;
            let offset = 0;
            return (
              <li key={row.kind} className="flex items-center gap-2">
                <Link
                  to={path(`/kinds/${encodeURIComponent(row.kind)}`)}
                  className="flex min-w-0 shrink-0 items-center gap-2 font-mono text-[12.5px] text-zinc-200 hover:text-zinc-50 hover:underline"
                  style={{ width: LABEL }}
                  title={row.kind}
                >
                  <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: colorOf(row.kind) }} />
                  <span className="truncate">{label(row.kind)}</span>
                </Link>
                <span className="flex h-3.5 gap-px overflow-hidden bg-zinc-900" style={{ width: bar }}>
                  {row.mix === null && <span className="h-full w-full animate-pulse bg-zinc-800" />}
                  {row.mix &&
                    PARTS.filter((part) => row.mix!.parts[part] > 0).map((part) => {
                      const count = row.mix!.parts[part];
                      const share = count / total;
                      const x = LABEL + 8 + (offset + share / 2) * bar;
                      offset += share;
                      const rowsOf: TipRow[] = [
                        ["Claims", `${count.toLocaleString()} of ${total.toLocaleString()}`],
                        ["Share", `${Math.round(share * 100)}%`],
                        ["ClaimTypes", row.mix!.claimTypes[part].map((c) => c.split(".").at(-1)).join(", ")],
                      ];
                      return (
                        <Link
                          key={part}
                          to={path(`/kinds/${encodeURIComponent(row.kind)}?view=claim-types`)}
                          aria-label={`${row.kind}: ${counted(count, "Claim")}, evidence ${EVIDENCE_PART[part].word}`}
                          className="h-full outline-none transition-[filter] hover:brightness-125 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-50"
                          style={{ flexGrow: count, flexBasis: 0, minWidth: 3, backgroundColor: EVIDENCE_PART[part].color }}
                          {...bind({ kicker: `Evidence · ${EVIDENCE_PART[part].word}`, title: row.kind, rows: rowsOf }, { x, y: index * 24 + 14 })}
                        />
                      );
                    })}
                </span>
                <span className="shrink-0 text-right font-mono text-[12.5px] text-zinc-300 tabular-nums" style={{ width: TOTAL }}>
                  {row.mix ? total.toLocaleString() : "…"}
                </span>
              </li>
            );
          })}
        </ul>
        {states.length > 0 && (
          <div className="mt-4 border-t border-zinc-800 pt-3">
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-[12.5px] text-zinc-400" style={{ width: LABEL }}>
                All Claims
              </span>
              <span className="flex h-3.5 gap-px overflow-hidden bg-zinc-900" style={{ width: bar }}>
                {stateTotal > 0 &&
                  (() => {
                    let offset = 0;
                    return states
                      .filter((s) => s.count > 0)
                      .map((s) => {
                        const share = s.count / stateTotal;
                        const x = LABEL + 8 + (offset + share / 2) * bar;
                        offset += share;
                        return (
                          <Link
                            key={s.key}
                            to={path(s.to)}
                            aria-label={`${s.word}: ${counted(s.count, "Claim")}`}
                            className="h-full outline-none hover:brightness-125 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-50"
                            style={{ flexGrow: s.count, flexBasis: 0, minWidth: 3, backgroundColor: s.color }}
                            {...bind(
                              { kicker: "Claims", title: s.word, rows: [["Claims", `${s.count.toLocaleString()} of ${stateTotal.toLocaleString()}`], ["Share", `${Math.round(share * 100)}%`]] },
                              { x, y: sorted.length * 24 + 30 },
                            )}
                          />
                        );
                      });
                  })()}
              </span>
              <span className="shrink-0 text-right font-mono text-[12.5px] text-zinc-300 tabular-nums" style={{ width: TOTAL }}>
                {stateTotal.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-zinc-400" style={{ paddingLeft: LABEL + 8 }}>
              {states.map((s) => (
                <Link key={s.key} to={path(s.to)} className="inline-flex items-center gap-1.5 hover:text-zinc-100">
                  <span aria-hidden className="h-2.5 w-2.5" style={{ backgroundColor: s.color }} />
                  {s.word} <span className="font-mono text-zinc-200">{s.count.toLocaleString()}</span>
                </Link>
              ))}
              {waiting !== null && (
                <Link to={path("/proposals?status=open")} className="inline-flex items-center gap-1.5 hover:text-zinc-100">
                  <span aria-hidden className={`h-2 w-2 rounded-full ${waiting > 0 ? "bg-amber-400" : "bg-zinc-700"}`} />
                  Waiting for review <span className="font-mono text-zinc-200">{waiting.toLocaleString()}</span>
                </Link>
              )}
            </div>
          </div>
        )}
        <Tip shown={shown} width={width} />
      </div>
      <Legend label="Evidence rule">
        {used.map((part) => (
          <Swatch key={part} color={EVIDENCE_PART[part].color}>
            {EVIDENCE_PART[part].word}
          </Swatch>
        ))}
      </Legend>
    </div>
  );
}

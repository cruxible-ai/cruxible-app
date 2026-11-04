import { Link } from "react-router-dom";
import { formatDateTime, formatRelative } from "@/lib/text";
import { useInstancePath } from "./ChartBits";

/** One colored share of a hero number (a kind's Subjects, a source's freshness). */
export interface HeroPart {
  key: string;
  color: string;
  value: number;
  title: string;
}

export interface HeroStat {
  label: string;
  value: number | null;
  /** In-app path under the instance. */
  to: string;
  title?: string;
  /** A thin bar of shares under the number. */
  bar?: HeroPart[];
  /** Dots under the number, one per thing (sources, Lines). */
  dots?: HeroPart[];
  /** A quiet line under the number instead. */
  note?: string;
}

/**
 * The Overview's hero: the instance's size as a few large numbers, each
 * linked to the view that lists it, with a colored strip of what it is made
 * of; under them, the instance, its kits and when it began.
 */
export function Hero({
  stats,
  instance,
  kits,
  since,
}: {
  stats: HeroStat[];
  instance: string;
  kits: { id: string; version: string; source?: string | null | undefined }[];
  since: string | null;
}) {
  const path = useInstancePath();
  return (
    <section aria-label="At a glance">
      <div className="grid grid-cols-2 gap-px overflow-hidden border border-zinc-800 bg-zinc-800 sm:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={path(stat.to)}
            title={stat.title}
            className="group flex min-w-0 flex-col justify-between bg-zinc-950 px-5 pb-4 pt-4 hover:bg-zinc-900/70 focus-visible:bg-zinc-900/70 focus-visible:outline-none"
          >
            <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-500 group-hover:text-zinc-300">{stat.label}</span>
            <span className="mt-2 font-mono text-[40px] font-semibold leading-none tracking-tight text-zinc-50 tabular-nums">
              {stat.value === null ? <span className="animate-pulse text-zinc-700">—</span> : stat.value.toLocaleString()}
            </span>
            <span className="mt-3 block h-4">
              {stat.bar && <ShareBar parts={stat.bar} />}
              {stat.dots && (
                <span className="flex flex-wrap items-center gap-1.5" aria-hidden>
                  {stat.dots.map((dot) => (
                    <span key={dot.key} title={dot.title} className="h-2 w-2 rounded-full" style={{ backgroundColor: dot.color }} />
                  ))}
                </span>
              )}
              {stat.note && <span className="text-[12px] text-zinc-500">{stat.note}</span>}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap items-baseline gap-x-2 text-[13px] text-zinc-400">
        <span className="font-mono text-zinc-200">{instance}</span>
        {kits.map((kit) => (
          <span key={kit.id} title={kit.source ?? undefined}>
            <span className="text-zinc-600">·</span> <span className="text-zinc-500">kit</span> <span className="font-mono text-zinc-200">{kit.id}</span>{" "}
            <span className="font-mono text-zinc-500">{kit.version}</span>
          </span>
        ))}
        {since && (
          <span title={formatDateTime(since)}>
            <span className="text-zinc-600">·</span> <span className="text-zinc-500">since</span> {formatDate(since)}{" "}
            <span className="text-zinc-500">({formatRelative(since)})</span>
          </span>
        )}
      </div>
    </section>
  );
}

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

function ShareBar({ parts }: { parts: HeroPart[] }) {
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  if (total <= 0) return <span className="block h-1.5 w-full bg-zinc-800" aria-hidden />;
  return (
    <span className="flex h-1.5 w-full gap-px overflow-hidden" aria-hidden>
      {parts
        .filter((p) => p.value > 0)
        .map((p) => (
          <span key={p.key} title={p.title} className="h-full" style={{ flexGrow: p.value, flexBasis: 0, minWidth: 3, backgroundColor: p.color }} />
        ))}
    </span>
  );
}

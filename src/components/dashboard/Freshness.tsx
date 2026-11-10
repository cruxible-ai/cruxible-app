import { Link } from "react-router-dom";
import { useCards, useInstanceId, useLines, useSourceLandings, useSourceModel } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { HealthDot } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { useAtLink } from "@/lib/at";
import { intervalWords, sourceFreshness, type FreshMark, type SourceFreshness } from "@/lib/dashboard";
import { lineName } from "@/lib/lines";
import { useRunbookWakes } from "@/lib/useRunbookWakes";
import { formatDateTime, formatRelative } from "@/lib/text";
import type { HealthTone } from "@/lib/vocabulary";

type LineCard = Schemas["GetLineCard"];

const MARK: Record<FreshMark, { word: string; tone: HealthTone; meaning: string }> = {
  fresh: { word: "Fresh", tone: "ok", meaning: "Landed within one expected interval" },
  late: { word: "Late", tone: "waiting", meaning: "Past one expected interval since it last landed" },
  stale: { word: "Stale", tone: "wrong", meaning: "Past two expected intervals since it last landed, or never landed" },
  by_hand: { word: "By hand", tone: "off", meaning: "No enabled Line's Trigger feeds it: it lands when someone runs it" },
  unscheduled: { word: "No interval", tone: "off", meaning: "An enabled Line feeds it, on no Trigger with a fixed interval (its own or a Runbook's)" },
};

const enabled = (row: Schemas["OrientLine"]) => row.lifecycle === "live" && row.enablement != null && row.enablement !== "disabled";

/**
 * When each source last landed against how often its Lines' Triggers expect
 * it: one cell per source, a dot for fresh / late / stale / by hand. Reads the
 * sources section, the source model and one card per enabled Line (the same
 * reads Coming up makes); never a Capture or a Claim.
 */
export function FreshnessPanel({ label }: { label: (line: string) => string }) {
  const landings = useSourceLandings();
  const model = useSourceModel();
  const lines = useLines();
  const on = (lines.data?.rows ?? []).filter(enabled).map((row) => lineName(row.line));
  const cards = useCards(on.map((name) => `Line:${name}`));
  const runbookWakes = useRunbookWakes();
  // Sources, Lines and Triggers are ontology-sized: derived on each render, no memo.
  const byLine = new Map(on.map((name, i) => [name, (cards[i]?.card ?? undefined) as LineCard | undefined] as const));
  const rows: SourceFreshness[] | null =
    landings.data && model.data && lines.data
      ? sourceFreshness({
          sources: model.data.sources,
          landings: landings.data.rows,
          lines: lines.data.rows,
          // its own Triggers and the Runbook Triggers that run it
          triggersOf: (line) => {
            const card = byLine.get(line);
            if (!card || runbookWakes.pending) return undefined;
            return [...(card.triggers ?? []).map((t) => t.fires), ...(runbookWakes.byLine.get(line) ?? []).map((w) => w.fires)];
          },
          now: new Date(),
        })
      : null;

  const late = rows?.filter((r) => r.mark === "late").length ?? 0;
  const stale = rows?.filter((r) => r.mark === "stale").length ?? 0;
  const pending = landings.isPending || model.isPending || lines.isPending;
  const error = landings.error ?? model.error ?? lines.error;
  return (
    <Panel
      title="Freshness"
      description="When each source last landed, against how often its Line's Trigger expects it. Late: past one interval; stale: past two."
      meta={rows ? <span>{late || stale ? [late && `${late} late`, stale && `${stale} stale`].filter(Boolean).join(" · ") : `${rows.length} sources`}</span> : undefined}
    >
      {pending && !error && <LoadState />}
      {error && <LoadState error={error} />}
      {rows && rows.length === 0 && <EmptyState>No sources</EmptyState>}
      {rows && rows.length > 0 && (
        <ul aria-label="Sources" className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-x-5 gap-y-2">
          {rows.map((row) => (
            <SourceCell key={row.source} row={row} label={label} />
          ))}
        </ul>
      )}
    </Panel>
  );
}

function SourceCell({ row, label }: { row: SourceFreshness; label: (line: string) => string }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const mark = row.mark ? MARK[row.mark] : null;
  const landing = row.landing;
  return (
    <li className="min-w-0 text-[13px]">
      <div className="flex items-baseline gap-1.5">
        {mark ? <HealthDot tone={mark.tone} title={`${mark.word}: ${mark.meaning}`} /> : <span className="h-1.5 w-1.5 shrink-0" />}
        <Link
          to={link(`/i/${instanceId}/flow?focus=${encodeURIComponent(`source:${row.source}`)}`)}
          className="min-w-0 truncate font-mono text-[12px] text-zinc-100 hover:underline"
          title={`${row.source}: open in Evidence flow`}
        >
          {row.source}
        </Link>
        <span className="ml-auto shrink-0 text-[12px] text-zinc-400" title={mark?.meaning}>
          {mark?.word ?? "…"}
        </span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-1.5 pl-3 text-[12px] text-zinc-500">
        {landing ? (
          landing.ref ? (
            <Link
              to={link(`/i/${instanceId}/ref/${encodeURIComponent(landing.ref)}`)}
              className="text-zinc-300 hover:underline"
              title={`${landing.capture ?? landing.ref} · landed ${formatDateTime(landing.landed_at)}`}
            >
              {formatRelative(landing.landed_at)}
            </Link>
          ) : (
            <span className="text-zinc-300" title={formatDateTime(landing.landed_at)}>
              {formatRelative(landing.landed_at)}
            </span>
          )
        ) : (
          <span>never landed</span>
        )}
        {row.interval !== null && (
          <>
            <span className="text-zinc-600">·</span>
            <span title="The shortest interval its enabled Lines' Triggers expect, a Runbook's that runs them included">every {intervalWords(row.interval)}</span>
          </>
        )}
        {row.lines.map((line) => (
          <span key={line} className="inline-flex items-baseline gap-x-1.5">
            <span className="text-zinc-600">·</span>
            <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(line)}`)} className="font-mono text-zinc-400 hover:text-zinc-200 hover:underline" title={line}>
              {label(line)}
            </Link>
          </span>
        ))}
      </div>
    </li>
  );
}

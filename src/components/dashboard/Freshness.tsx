import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCards, useInstanceId, useLines, useSourceLandings, useSourceModel } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { HealthDot } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
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
 * it: one row per source (its Lines, schedule, last landing with a fresh /
 * late / stale dot). Reads the
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

  const columns = useFreshnessColumns(label);
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
      {rows && rows.length === 0 && !error && <EmptyState>No sources</EmptyState>}
      {rows && rows.length > 0 && (
        <DataTable rows={rows} columns={columns} rowKey={(row) => row.source} label="Sources" urlKey="freshness" toolbar={false} maxHeight="none" />
      )}
    </Panel>
  );
}

function useFreshnessColumns(label: (line: string) => string): Column<SourceFreshness>[] {
  const instanceId = useInstanceId();
  const link = useAtLink();
  return useMemo<Column<SourceFreshness>[]>(
    () => [
      {
        id: "source",
        header: "Source",
        className: "break-all",
        cell: (row) => (
          <Link
            to={link(`/i/${instanceId}/flow?focus=${encodeURIComponent(`source:${row.source}`)}`)}
            className="font-mono text-[12px] text-zinc-100 hover:underline"
            title={`${row.source}: open in Evidence flow`}
          >
            {row.source}
          </Link>
        ),
      },
      {
        id: "line",
        header: "Line",
        title: "The Lines that land it, enabled first",
        cell: (row) =>
          row.lines.length ? (
            <span className="flex flex-col">
              {row.lines.map((line) => (
                <Link key={line} to={link(`/i/${instanceId}/lines/${encodeURIComponent(line)}`)} className="font-mono text-[12px] text-zinc-300 hover:underline" title={line}>
                  {label(line)}
                </Link>
              ))}
            </span>
          ) : (
            <span className="text-zinc-600">—</span>
          ),
      },
      {
        id: "schedule",
        header: "Schedule",
        title: "The shortest interval its enabled Lines' Triggers expect, a Runbook's that runs them included",
        className: "whitespace-nowrap text-[12px] text-zinc-400",
        cell: (row) =>
          row.interval !== null ? (
            <span>Every {intervalWords(row.interval)}</span>
          ) : row.mark === "by_hand" || row.mark === "unscheduled" ? (
            <span title={MARK[row.mark].meaning}>{MARK[row.mark].word}</span>
          ) : (
            <span className="text-zinc-600">…</span>
          ),
      },
      {
        id: "landed",
        header: "Last landed",
        title: "When it last landed, against its schedule: late past one interval, stale past two",
        className: "whitespace-nowrap text-[12px]",
        cell: (row) => <Landed row={row} />,
      },
    ],
    [instanceId, link, label],
  );
}

/** When the source last landed (linked to the Capture), with its fresh / late / stale mark against the schedule. */
function Landed({ row }: { row: SourceFreshness }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const mark = row.mark === "fresh" || row.mark === "late" || row.mark === "stale" ? MARK[row.mark] : null;
  const landing = row.landing;
  return (
    <span className="inline-flex items-baseline gap-1.5">
      {mark && <HealthDot tone={mark.tone} title={`${mark.word}: ${mark.meaning}`} />}
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
        <span className="text-zinc-500">Never</span>
      )}
      {mark && mark !== MARK.fresh && <span className="text-zinc-400" title={mark.meaning}>{mark.word}</span>}
    </span>
  );
}

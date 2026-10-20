import { Link } from "react-router-dom";
import { useInstanceId, useKits, useNext, useOrient } from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import type { NextHealth, NextResult, OrientResult } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { formatDateTime, humanize } from "@/lib/text";
import { REASONS } from "@/lib/next-reasons";
import { SEVERITY_TONE } from "@/components/next/NextItemRow";
import { usePageTitle } from "@/lib/usePageTitle";

const NEXT_PREVIEW = 8;

/**
 * Orientation point at the pinned generation: what kinds of Subjects exist
 * and how many, how many Claims stand or conflict, what the instance's
 * artifacts are, and what `next` says needs attention now.
 */
export function OverviewScreen() {
  const orient = useOrient();
  const next = useNext({ limit: NEXT_PAGE });
  usePageTitle("Overview");

  if (orient.isPending) return <LoadState />;
  if (orient.error) return <LoadState error={orient.error} />;
  const o = orient.data;

  return (
    <div className="max-w-6xl">
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">Overview</h1>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-zinc-500">
          <span>
            generation <span className="font-mono text-zinc-300">{o.generation}</span>
          </span>
          <span className="font-mono" title={o.coordinate.git_oid}>
            {o.coordinate.git_oid.slice(0, 12)}
          </span>
          <span title={o.accepted_at}>accepted {formatDateTime(o.accepted_at)}</span>
          {o.floor && (
            <span>
              floor at <span className="font-mono">{o.floor.at}</span>
              {o.floor.generations_behind != null && ` (${o.floor.generations_behind} behind)`}
            </span>
          )}
          {o.you?.actor && <span>reading as {o.you.actor}</span>}
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-2">
        <KindsPanel orient={o} />
        <AttentionPanel orient={o} />
        <NextPanel next={next.data} pending={next.isPending} error={next.error} />
        <HealthPanel next={next.data} pending={next.isPending} />
        <CountsPanel orient={o} />
        <KitsPanel />
      </div>
    </div>
  );
}

function KindsPanel({ orient }: { orient: OrientResult }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const kinds = [...(orient.kinds ?? [])].sort((a, b) => b.subjects - a.subjects);
  const max = Math.max(1, ...kinds.map((k) => k.subjects));
  return (
    <Panel
      title="Subjects by kind"
      meta={orient.next_cursor ? <span>first {kinds.length} kinds</span> : <span>{kinds.length} kinds</span>}
    >
      {kinds.length === 0 && <EmptyState>No Subject kinds yet.</EmptyState>}
      <div className="space-y-1.5">
        {kinds.map((kind) => (
          <div key={kind.kind} className="flex items-center gap-3 text-[13px]">
            <Link
              to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind.kind)}`)}
              className="w-56 shrink-0 truncate font-mono text-[12px] text-zinc-300 hover:underline"
              title={kind.kind}
            >
              {kind.kind}
            </Link>
            <div className="flex-1">
              <div
                className="h-2 rounded-full bg-zinc-500"
                style={{ width: `${Math.max((kind.subjects / max) * 100, kind.subjects ? 2 : 0)}%` }}
              />
            </div>
            <span className="w-12 shrink-0 text-right font-mono text-zinc-400">{kind.subjects}</span>
            <span className="w-24 shrink-0 text-right text-[12px] text-zinc-600">
              {kind.predicates.length} ClaimTypes
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AttentionPanel({ orient }: { orient: OrientResult }) {
  const attention = orient.attention;
  if (!attention) return null;
  const enablements = attention.enablements;
  return (
    <Panel title="Attention">
      <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[13px]">
        <dt className="text-zinc-500">Next items</dt>
        <dd className="font-mono text-zinc-200">{attention.next_items}</dd>
        <dt className="text-zinc-500">Open proposals</dt>
        <dd className="font-mono text-zinc-200">{attention.open_proposals}</dd>
        {enablements && (
          <>
            <dt className="text-zinc-500">Lines</dt>
            <dd className="text-zinc-300">
              {enablements.running ?? 0} running · {enablements.stalled ?? 0} stalled ·{" "}
              {enablements.stopped ?? 0} stopped
            </dd>
          </>
        )}
      </dl>
      {(enablements?.needs_attention?.length ?? 0) > 0 && (
        <div className="mt-2 text-[12px] text-amber-400/90">
          Needs attention: {enablements!.needs_attention!.join(", ")}
        </div>
      )}
      {(attention.top?.length ?? 0) > 0 && (
        <ul className="mt-2 space-y-0.5 text-[12px] text-zinc-400">
          {attention.top!.map((line) => (
            <li key={line} className="font-mono">
              {line}
            </li>
          ))}
        </ul>
      )}
      {(attention.notes?.length ?? 0) > 0 && (
        <ul className="mt-2 space-y-0.5 text-[12px] text-zinc-500">
          {attention.notes!.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

function NextPanel({
  next,
  pending,
  error,
}: {
  next: NextResult | undefined;
  pending: boolean;
  error: Error | null;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  return (
    <Panel
      title="Next"
      meta={
        next ? (
          <span>
            {Math.min(next.items.length, NEXT_PREVIEW)} of <span className="font-mono">{next.total_items}</span>
          </span>
        ) : undefined
      }
    >
      {pending && <LoadState />}
      {error && <LoadState error={error} />}
      {next && next.items.length === 0 && <EmptyState>Nothing needs attention.</EmptyState>}
      {next && (
        <div className="divide-y divide-zinc-800/60">
          {next.items.slice(0, NEXT_PREVIEW).map((item) => (
            <div key={item.item_id} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-1 text-[13px]">
              <Chip value={item.severity} tone={SEVERITY_TONE[item.severity]} />
              <span className="text-zinc-300">{REASONS[item.reason].label}</span>
              <RefLink value={item.subject_identity} className="ml-auto" />
              {item.repair && (
                <div className="w-full text-[12px] text-zinc-500">{item.repair.required_change}</div>
              )}
            </div>
          ))}
        </div>
      )}
      {next && next.total_items > 0 && (
        <Link to={link(`/i/${instanceId}/next`)} className="mt-2 inline-block text-[12px] text-zinc-400 hover:text-zinc-200">
          All next items →
        </Link>
      )}
      {next && next.unobserved_domains.length > 0 && (
        <div className="mt-2 text-[12px] text-zinc-600">
          Not observed from here: {next.unobserved_domains.map(humanize).join(", ")}
        </div>
      )}
    </Panel>
  );
}

const HEALTH_ROWS = [
  "instance",
  "floor",
  "ledger_mirror",
  "provider_lane",
  "procedure_catalog",
  "compiler",
  "line_dispatch",
  "consumers",
  "triggers",
] as const;

const GOOD = new Set(["current", "active", "available", "complete", "idle", "running", "scheduled"]);
const BAD = new Set(["stalled", "stale", "invalid", "missing", "unavailable", "gone", "ambiguous"]);
const NEUTRAL_PREFIX = "not_";

function healthTone(state: string) {
  if (GOOD.has(state)) return "green" as const;
  if (BAD.has(state)) return "red" as const;
  if (state.startsWith(NEUTRAL_PREFIX) || state === "decommissioned") return "zinc" as const;
  return "amber" as const;
}

function HealthPanel({ next, pending }: { next: NextResult | undefined; pending: boolean }) {
  const status = next?.status;
  return (
    <Panel
      title="Health"
      meta={status?.blocking ? <span className="text-red-400">blocking</span> : undefined}
    >
      {pending && <LoadState />}
      {status && (
        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[13px]">
          {HEALTH_ROWS.map((row) => {
            const health: NextHealth = status[row];
            return (
              <div key={row} className="contents">
                <dt className="text-zinc-500">{humanize(row)}</dt>
                <dd className="flex flex-wrap items-baseline gap-2">
                  <Chip value={health.state} tone={healthTone(health.state)} />
                  {health.repair && (
                    <span className="text-[12px] text-zinc-500">{health.repair.required_change}</span>
                  )}
                </dd>
              </div>
            );
          })}
          {(status.held ?? 0) > 0 && (
            <>
              <dt className="text-zinc-500">Held</dt>
              <dd className="font-mono text-zinc-300">{status.held}</dd>
            </>
          )}
        </dl>
      )}
    </Panel>
  );
}

function CountsPanel({ orient }: { orient: OrientResult }) {
  const a = orient.artifacts;
  if (!a) return null;
  const claims = a.claims;
  const artifacts: [string, number | undefined][] = [
    ["ClaimTypes", a.claim_types],
    ["Procedures", a.procedures],
    ["Lines", a.lines],
    ["Runs", a.runs],
    ["Running", a.running],
    ["Mandates", a.mandates],
    ["Captures", a.captures],
    ["Capture contracts", a.capture_contracts],
    ["Documents", a.documents],
    ["Queries", a.queries],
    ["Interfaces", a.interfaces],
  ];
  return (
    <Panel title="State">
      {claims && (
        <div className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px]">
          <Count label="accepted Claims" value={claims.accepted} />
          <Count label="conflicted" value={claims.conflicted} tone={claims.conflicted ? "text-red-400" : undefined} />
          <Count label="overturned" value={claims.overturned} />
          <Count label="refused" value={claims.refused} />
          <Count label="retired" value={claims.retired} />
        </div>
      )}
      <dl className="grid grid-cols-[max-content_max-content_max-content_max-content] gap-x-4 gap-y-0.5 text-[13px]">
        {artifacts.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-zinc-500">{label}</dt>
            <dd className="font-mono text-zinc-300">{value ?? 0}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

function Count({ label, value, tone }: { label: string; value: number | undefined; tone?: string | undefined }) {
  return (
    <span>
      <span className={`font-mono ${tone ?? "text-zinc-200"}`}>{value ?? 0}</span>{" "}
      <span className="text-zinc-500">{label}</span>
    </span>
  );
}

function KitsPanel() {
  const kits = useKits();
  const rows = kits.data?.kits ?? [];
  return (
    <Panel title="Kits" meta={kits.data ? <span>{rows.length} installed</span> : undefined}>
      {kits.isPending && <LoadState />}
      {kits.error && <LoadState error={kits.error} />}
      {kits.data && rows.length === 0 && <EmptyState>No kits installed.</EmptyState>}
      <div className="divide-y divide-zinc-800/60">
        {rows.map((kit) => (
          <div key={kit.kit_id} className="py-1 text-[13px]">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-mono text-zinc-200">{kit.kit_id}</span>
              <span className="font-mono text-zinc-500">{kit.version}</span>
              {(kit.drifted?.length ?? 0) > 0 && (
                <span className="text-amber-400/90">{kit.drifted!.length} drifted</span>
              )}
              {kit.latest_available && kit.latest_available !== kit.version && (
                <span className="text-zinc-500">latest {kit.latest_available}</span>
              )}
            </div>
            {(kit.providers?.length ?? 0) > 0 && (
              <div className="mt-0.5 flex flex-wrap gap-x-3 text-[12px] text-zinc-500">
                {kit.providers!.map((provider) => (
                  <span key={provider.provider_id}>
                    {provider.provider_id} <Chip value={provider.state} tone={provider.state === "missing" ? "red" : provider.state === "differs" ? "amber" : "green"} />
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}

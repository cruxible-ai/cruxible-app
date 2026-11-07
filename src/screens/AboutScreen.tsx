import { useInstanceId, useNext } from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import { HealthChip } from "@/components/Chip";
import { FieldList } from "@/components/FieldList";
import { InfoButton } from "@/components/InfoButton";
import { Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { CopyButton, ShortId } from "@/components/ShortId";
import { mirrorStatus, type MirrorStatus } from "@/lib/mirror";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

/**
 * About this instance: what the daemon serving it reports about its own
 * setup. For now the ledger mirror (where the ledger publishes itself, from
 * the `ledger_mirror` facet `next` reports); one `next` page, the same read
 * (and cache entry) as Next and the Dashboard.
 */
export function AboutScreen() {
  const instanceId = useInstanceId();
  const next = useNext({ limit: NEXT_PAGE });
  usePageTitle("About");
  const mirror = mirrorStatus(next.data?.status.ledger_mirror);
  return (
    <Page width="narrow">
      <PageHeader kind="Settings" title="About" description="How this instance is set up, as the daemon serving it reports." summary={<span className="font-mono">{instanceId}</span>} />
      {next.isPending && <LoadState />}
      {next.error && <LoadState error={next.error} />}
      {next.data && <MirrorPanel mirror={mirror} />}
    </Page>
  );
}

const MIRROR_INFO =
  "The ledger mirror is a Git remote the daemon pushes the ledger to after each accepted generation, so a copy of every change and its approvals lives off this host.";

function MirrorPanel({ mirror }: { mirror: MirrorStatus | null }) {
  const title = (
    <span className="inline-flex items-center gap-1.5">
      Ledger mirror
      <InfoButton label="What the ledger mirror is">{MIRROR_INFO}</InfoButton>
    </span>
  );
  if (!mirror) {
    return (
      <Panel title={title}>
        <EmptyState>Not reported by this daemon</EmptyState>
      </Panel>
    );
  }
  if (mirror.state === "not_configured") {
    return (
      <Panel title={title} meta={<HealthChip state={mirror.state} />}>
        <EmptyState>None set: the ledger lives on this host only</EmptyState>
      </Panel>
    );
  }
  const fields = [
    { key: "url", label: "Remote", value: mirror.url ? <span className="break-all font-mono text-[12px] text-zinc-200">{mirror.url}</span> : <span className="text-zinc-500">—</span> },
    ...(mirror.published !== null || mirror.requested !== null
      ? [
          {
            key: "sequence",
            label: "Published",
            value: (
              <span title="Publication requests: the last one published, of those made">
                <span className="font-mono">{mirror.published ?? 0}</span> of <span className="font-mono">{mirror.requested ?? 0}</span> requests
              </span>
            ),
          },
        ]
      : []),
    ...(mirror.publishedOid
      ? [
          {
            key: "oid",
            label: "Remote head",
            value: (
              <span className="inline-flex items-baseline gap-2">
                <ShortId value={mirror.publishedOid} className="text-zinc-200" />
                {mirror.headOid && mirror.headOid !== mirror.publishedOid && (
                  <span className="text-zinc-500">
                    accepted head <ShortId value={mirror.headOid} className="text-zinc-400" />
                  </span>
                )}
              </span>
            ),
          },
        ]
      : []),
    ...(mirror.attemptedAt ? [{ key: "attempted", label: "Last attempt", value: <span title={mirror.attemptedAt}>{formatDateTime(mirror.attemptedAt)}</span> }] : []),
    ...(mirror.message
      ? [
          {
            key: "message",
            label: mirror.state === "behind" ? "Git said" : "Detail",
            value: <pre className="whitespace-pre-wrap break-words font-mono text-[12px] text-zinc-300">{mirror.message}</pre>,
          },
        ]
      : []),
    ...(mirror.repair ? [{ key: "repair", label: "Repair", value: <span className="text-zinc-300">{sentenceCase(mirror.repair)}, off this host</span> }] : []),
    ...(mirror.command
      ? [
          {
            key: "command",
            label: "Publish now",
            value: (
              <span className="inline-flex items-center gap-2">
                <code className="font-mono text-[12px] text-zinc-300">{mirror.command}</code>
                <CopyButton value={mirror.command} label="Copy" />
              </span>
            ),
          },
        ]
      : []),
  ];
  return (
    <Panel title={title} meta={<HealthChip state={mirror.state} />}>
      <FieldList labels="words" label="Ledger mirror" fields={fields} />
    </Panel>
  );
}

const sentenceCase = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

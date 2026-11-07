import { useMemo, type ReactNode } from "react";
import pin from "../../api/pin.json";
import { useCard, useHost, useInstanceId, useKits, useNext, useOrient, usePrincipals, useProviders, useVersion, useWhoAmI } from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip, HealthChip, SignalDot } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { FieldList } from "@/components/FieldList";
import { InfoButton } from "@/components/InfoButton";
import { Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { CopyButton, ShortId } from "@/components/ShortId";
import { healthRows, versionRows, type HealthRow, type PinnedBuild, type VersionRow } from "@/lib/about";
import { mirrorStatus, type MirrorStatus } from "@/lib/mirror";
import { formatDateTime, humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

const PINNED: PinnedBuild = pin;

/**
 * About this instance: how it is set up, as the daemon serving it reports,
 * each section from what core serves and nothing else. Reads: GET /version,
 * GET /host, GET /whoami, GET /providers, GET /kits, orient (retained
 * generations) and its principals section, the ApprovalPolicy card, and one
 * `next` page (the same read and cache entry as Next and the Dashboard) for
 * the ledger mirror and the other health facets.
 */
export function AboutScreen() {
  const instanceId = useInstanceId();
  usePageTitle("About");
  return (
    <Page>
      <PageHeader kind="Settings" title="About" description="How this instance is set up, as the daemon serving it reports." summary={<span className="font-mono">{instanceId}</span>} />
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        <div className="min-w-0 space-y-5">
          <VersionsPanel />
          <HostPanel />
          <YouPanel />
          <PrincipalsPanel />
        </div>
        <div className="min-w-0 space-y-5">
          <NextPanels />
          <KitsPanel />
          <ProvidersPanel />
        </div>
      </div>
    </Page>
  );
}

const yes = (value: boolean) => (value ? "Yes" : "No");
const read = (state: { isPending: boolean; error: Error | null }) =>
  state.isPending ? <LoadState /> : state.error ? <LoadState error={state.error} /> : null;

// -- versions -----------------------------------------------------------------------

const VERSION_WORD: Record<VersionRow["what"], string> = { core_version: "Core", sdk_contract: "SDK contract" };

function VersionsPanel() {
  const version = useVersion();
  const rows = versionRows(version.data, PINNED);
  const differs = rows.some((r) => r.differs);
  const value = (v: string | null, what: VersionRow["what"]) =>
    v === null ? <span className="text-zinc-600">—</span> : what === "sdk_contract" ? <ShortId value={v} className="text-zinc-200" /> : <span className="font-mono text-zinc-200">{v}</span>;
  const columns: Column<VersionRow>[] = [
    { id: "what", header: "", className: "text-zinc-400", cell: (r) => VERSION_WORD[r.what] },
    { id: "daemon", header: "Daemon", cell: (r) => value(r.daemon, r.what) },
    {
      id: "pinned",
      header: <span title={`The contract this console is built from: cruxible-core ${PINNED.core_commit}`}>Console pin</span>,
      label: "Console pin",
      cell: (r) => value(r.pinned, r.what),
    },
    {
      id: "differs",
      header: "",
      label: "Match",
      cell: (r) =>
        r.differs ? (
          <span className="inline-flex items-baseline gap-1.5 text-[12px] text-zinc-300">
            <SignalDot signal="waiting" title="The daemon is not the build this console was pinned to: screens may render incompletely" />
            Differs
          </span>
        ) : r.daemon !== null && r.pinned !== null ? (
          <span className="text-[12px] text-zinc-500">Same</span>
        ) : null,
    },
  ];
  return (
    <Panel title="Versions" meta={differs ? <span>Daemon differs from the pin</span> : undefined}>
      {read({ isPending: version.isPending, error: version.error })}
      {version.data && <DataTable rows={rows} columns={columns} rowKey={(r) => r.what} label="Versions" toolbar={false} maxHeight="none" />}
      <div className="t-meta mt-1.5">
        Pinned to core <ShortId value={PINNED.core_commit} className="text-zinc-400" />
      </div>
    </Panel>
  );
}

// -- host -----------------------------------------------------------------------------

function HostPanel() {
  const host = useHost();
  const orient = useOrient();
  const h = host.data;
  const retention = orient.data?.retention_generations;
  const fields: { key: string; label: ReactNode; value: ReactNode }[] = h
    ? [
        {
          key: "compatibility",
          label: "Compatibility",
          value: (
            <span className="inline-flex items-baseline gap-3">
              <Chip concept="host" value={h.compatibility} />
              {h.reason && <span className="text-[12px] text-zinc-300" title={h.reason.code}>{h.reason.detail}</span>}
            </span>
          ),
        },
        { key: "writable", label: "Writable", value: yes(h.writable) },
        {
          key: "compiler",
          label: "Compiler",
          value: h.compiler_revision ? (
            <span className="font-mono text-[12px] text-zinc-200" title={h.compiler_coordinate ?? undefined}>
              {h.compiler_revision}
            </span>
          ) : h.compiler_coordinate ? (
            <ShortId value={h.compiler_coordinate} className="text-zinc-200" />
          ) : (
            <span className="text-zinc-600">—</span>
          ),
        },
        {
          key: "workspace",
          label: "Workspace",
          value: h.workspace_root ? <span className="break-all font-mono text-[12px] text-zinc-200">{h.workspace_root}</span> : <span className="text-zinc-500">None attached</span>,
        },
        { key: "floor", label: "Floor delivery", value: h.floor_delivery ? "On" : "Off" },
        ...(h.reason?.repair_commands.length
          ? [
              {
                key: "repair",
                label: "Repair",
                value: (
                  <span className="flex flex-col">
                    {h.reason.repair_commands.map((command) => (
                      <span key={command} className="inline-flex items-center gap-2">
                        <code className="font-mono text-[12px] text-zinc-300">{command}</code>
                        <CopyButton value={command} label="Copy" />
                      </span>
                    ))}
                  </span>
                ),
              },
            ]
          : []),
      ]
    : [];
  if (retention != null) {
    fields.push({
      key: "retention",
      label: (
        <span className="inline-flex items-center gap-1.5">
          Retained generations
          <InfoButton label="What retained generations are">
            The newest generations whose projection the daemon keeps ready. Pinning an older one rebuilds its projection, which is slow.
          </InfoButton>
        </span>
      ),
      value: <span className="font-mono">{retention}</span>,
    });
  }
  return (
    <Panel title="Host">
      {read({ isPending: host.isPending, error: host.error })}
      {h && <FieldList labels="words" label="Host" fields={fields} />}
    </Panel>
  );
}

// -- you ------------------------------------------------------------------------------

const SOURCE_WORD: Record<Schemas["WhoAmI"]["actor_id_source"], string> = {
  runtime_credential: "Runtime credential",
  unbound_credential: "Unbound credential",
  principal_claim: "Principal claim",
  local_operator: "Local operator",
};

function YouPanel() {
  const whoami = useWhoAmI();
  const w = whoami.data;
  return (
    <Panel title="You">
      {read({ isPending: whoami.isPending, error: whoami.error })}
      {w && (
        <FieldList
          labels="words"
          label="You"
          fields={[
            { key: "actor", label: "Actor", value: w.actor_id ? <span className="font-mono text-[12px] text-zinc-200">{w.actor_id}</span> : <span className="text-zinc-500">None</span> },
            {
              key: "source",
              label: "Identified by",
              value: (
                <span title={w.credential_label ? `credential ${w.credential_label}` : undefined}>{SOURCE_WORD[w.actor_id_source] ?? humanize(w.actor_id_source)}</span>
              ),
            },
            { key: "authenticated", label: "Authenticated", value: yes(w.authenticated) },
            { key: "tier", label: "Permission tier", value: <span className="font-mono text-[12px] text-zinc-200">{w.credential_permission_mode}</span> },
            {
              key: "principal",
              label: "Registered principal",
              value: w.principal_registration_status ? humanize(w.principal_registration_status) : <span className="text-zinc-500">—</span>,
            },
            {
              key: "author",
              label: "Can author",
              value: w.can_author ? (
                "Yes"
              ) : (
                <span className="inline-flex items-baseline gap-2">
                  No
                  {w.authoring_refusal && (
                    <span className="font-mono text-[12px] text-zinc-500" title={w.authoring_refusal.detail}>
                      {w.authoring_refusal.code}
                    </span>
                  )}
                </span>
              ),
            },
          ]}
        />
      )}
    </Panel>
  );
}

// -- principals and approval -----------------------------------------------------------

type Principal = Schemas["PrincipalRecord"];

const PRINCIPAL_COLUMNS: Column<Principal>[] = [
  { id: "id", header: "Principal", className: "font-mono text-[12px]", cell: (p) => <RefLink value={`Principal:${p.principal_id}`}>{p.principal_id}</RefLink> },
  { id: "kind", header: "Kind", className: "text-zinc-300", cell: (p) => humanize(p.kind) },
  { id: "status", header: "Status", className: "text-zinc-300", cell: (p) => humanize(p.status ?? "active") },
  { id: "key", header: "Key", cell: (p) => <span title={p.algorithm}><ShortId value={p.public_key} className="text-zinc-400" /></span> },
];

const APPROVAL_WORD: Record<Schemas["GetApprovalPolicyCard"]["mode"], string> = {
  self_approval_allowed: "Self-approval allowed",
  independent_approval_required: "Independent approval required",
};

function PrincipalsPanel() {
  const principals = usePrincipals();
  const policy = cardOf(useCard("ApprovalPolicy:instance").data, "approval_policy");
  const rows = (principals.data?.rows ?? []) as Principal[];
  return (
    <Panel title="Principals" meta={principals.data ? <span>{principals.data.truncated ? `first ${rows.length}` : rows.length}</span> : undefined}>
      <div className="mb-2 flex items-baseline gap-2 text-[13px]">
        <span className="text-zinc-500">Approval policy</span>
        {policy ? (
          <RefLink value={policy.policy}>
            <span className="text-zinc-200">{APPROVAL_WORD[policy.mode] ?? humanize(policy.mode)}</span>
          </RefLink>
        ) : (
          <span className="text-zinc-600">…</span>
        )}
      </div>
      {read({ isPending: principals.isPending, error: principals.error })}
      {principals.data && <DataTable rows={rows} columns={PRINCIPAL_COLUMNS} rowKey={(p) => p.principal_id} label="Principals" toolbar={false} maxHeight="none" />}
    </Panel>
  );
}

// -- next: mirror and health -------------------------------------------------------------

function NextPanels() {
  const next = useNext({ limit: NEXT_PAGE });
  const rows = useMemo(() => healthRows(next.data?.status), [next.data]);
  return (
    <>
      {next.isPending && <LoadState />}
      {next.error && <LoadState error={next.error} />}
      {next.data && <MirrorPanel mirror={mirrorStatus(next.data.status.ledger_mirror)} />}
      {next.data && <HealthPanel rows={rows} />}
    </>
  );
}

const HEALTH_COLUMNS: Column<HealthRow>[] = [
  { id: "facet", header: "Facet", className: "text-zinc-300", cell: (r) => <span title={r.detail ?? undefined}>{humanize(r.facet)}</span> },
  { id: "state", header: "State", className: "whitespace-nowrap", cell: (r) => <span title={r.detail ?? undefined}><HealthChip state={r.health.state} /></span> },
  { id: "repair", header: "Repair", className: "text-[12px] text-zinc-300", cell: (r) => (r.repair ? <span title={r.health.repair?.target}>{r.repair}</span> : <span className="text-zinc-600">—</span>) },
];

function HealthPanel({ rows }: { rows: HealthRow[] }) {
  return (
    <Panel title="Health" meta={<span>{rows.length} facets</span>}>
      <DataTable rows={rows} columns={HEALTH_COLUMNS} rowKey={(r) => r.facet} label="Health" toolbar={false} maxHeight="none" />
    </Panel>
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

// -- kits and providers ----------------------------------------------------------------

type Kit = Schemas["InstalledKit"];

const KIT_COLUMNS: Column<Kit>[] = [
  { id: "kit", header: "Kit", className: "font-mono text-[12px] text-zinc-200", cell: (k) => <span title={k.content_digest}>{k.kit_id}</span> },
  { id: "version", header: "Version", className: "font-mono text-[12px] text-zinc-300", cell: (k) => k.version },
  { id: "latest", header: "Latest", className: "font-mono text-[12px] text-zinc-400", cell: (k) => k.latest_available ?? <span title={k.update_check ?? undefined}>—</span> },
  { id: "source", header: "Source", className: "break-all text-[12px] text-zinc-400", cell: (k) => k.source ?? "—" },
  {
    id: "drift",
    header: "Edited here",
    className: "text-[12px] text-zinc-300",
    cell: (k) => ((k.drifted?.length ?? 0) > 0 ? <span title={k.drifted!.join("\n")}>{k.drifted!.length}</span> : <span className="text-zinc-600">—</span>),
  },
  {
    id: "providers",
    header: "Providers",
    className: "text-[12px]",
    cell: (k) =>
      (k.providers ?? []).length ? (
        <span className="flex flex-wrap gap-x-3">
          {k.providers!.map((p) => (
            <span key={p.provider_id} className="inline-flex items-baseline gap-1.5" title={`${p.package} ${p.version}`}>
              <span className="font-mono text-zinc-300">{p.provider_id}</span>
              <Chip concept="provider" value={p.state} />
            </span>
          ))}
        </span>
      ) : (
        <span className="text-zinc-600">—</span>
      ),
  },
];

function KitsPanel() {
  const kits = useKits();
  const rows = kits.data?.kits ?? [];
  return (
    <Panel title="Kits" meta={kits.data ? <span>{rows.length} installed</span> : undefined}>
      {read({ isPending: kits.isPending, error: kits.error })}
      {kits.data && (rows.length === 0 ? <EmptyState>None installed</EmptyState> : <DataTable rows={rows} columns={KIT_COLUMNS} rowKey={(k) => k.kit_id} label="Kits" toolbar={false} maxHeight="none" />)}
    </Panel>
  );
}

type Installed = Schemas["InstalledProvider"];

const PROVIDER_COLUMNS: Column<Installed>[] = [
  {
    id: "provider",
    header: "Provider",
    className: "whitespace-nowrap",
    cell: (p) => (
      <RefLink value={`Provider:${p.build}`}>
        <span className="font-mono text-[12px]" title={p.build}>
          {p.provider}
        </span>
      </RefLink>
    ),
  },
  { id: "version", header: "Version", className: "font-mono text-[12px] text-zinc-300", cell: (p) => p.version ?? "—" },
  {
    id: "operations",
    header: "Operations",
    className: "text-[12px] text-zinc-300",
    cell: (p) => <span title={p.operations.join("\n")}>{p.operations.length}</span>,
  },
  { id: "pinned", header: "Pinned by", numeric: true, className: "font-mono text-[12px]", cell: (p) => p.pinned_by ?? 0 },
  { id: "newest", header: "Newest build", className: "text-[12px] text-zinc-300", cell: (p) => (p.newest === false ? "No" : "Yes") },
];

function ProvidersPanel() {
  const providers = useProviders();
  const installed = providers.data?.installed ?? [];
  const packages = providers.data?.packages ?? [];
  return (
    <Panel title="Providers" meta={providers.data ? <span>{installed.length} installed</span> : undefined}>
      {read({ isPending: providers.isPending, error: providers.error })}
      {providers.data && (
        <>
          {installed.length === 0 ? (
            <EmptyState>None installed</EmptyState>
          ) : (
            <DataTable rows={installed} columns={PROVIDER_COLUMNS} rowKey={(p) => p.build} label="Installed Providers" toolbar={false} maxHeight="none" />
          )}
          {packages.length > 0 && (
            <div className="mt-2 text-[12px] text-zinc-400">
              <span className="text-zinc-500">Repository offers </span>
              {packages.map((p) => (
                <span key={p.name} className="mr-3 font-mono text-zinc-300" title={p.operations.join("\n")}>
                  {p.name} {p.version}
                </span>
              ))}
            </div>
          )}
          {providers.data.detail && <p className="t-meta mt-2">{providers.data.detail}</p>}
        </>
      )}
    </Panel>
  );
}

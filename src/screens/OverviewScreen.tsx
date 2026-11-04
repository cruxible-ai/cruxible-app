import { useMemo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  useClaimTypes,
  useDocuments,
  useGenerations,
  useInstanceId,
  useOrient,
  useOrientKindDetails,
  useOrientKinds,
  useRunAuthor,
  useSince,
  useSourceLandings,
  useSourceModel,
  useSubjectKinds,
} from "@/api/hooks";
import type { OrientPredicate, Schemas } from "@/api/schemas";
import { ChangeMark } from "@/components/Chip";
import { ChangeValue, GenerationLink } from "@/components/ChangeLog";
import { DataTable, type Column } from "@/components/DataTable";
import { Fact, Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { proposalRun, proposalWords } from "@/lib/change-sets";
import type { LogicalSource } from "@/lib/definitions";
import { lineName } from "@/lib/lines";
import { isCoreIdentity, shareLabel } from "@/lib/ontology";
import { beliefChanges, kindFeeds, latestByKind, sinceLower, type BeliefChange, type KindFeed } from "@/lib/overview";
import { formatDateTime, formatRelative } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { changeMark, term } from "@/lib/vocabulary";

type Generation = Schemas["OrientGeneration"];
type SourceLanding = Schemas["OrientSource"];

const ABOUT = {
  page: "What this instance knows: its kinds of Subject and the facts held about them, where the evidence comes from, and how its beliefs changed lately. What needs you is on the Dashboard.",
  kinds: "A kind is a type of thing the instance tracks (a vulnerability, a product). Each Subject is one such thing; each Claim is one fact about a Subject, of one ClaimType (a field). Fed by: the Lines whose runs write its facts; Entered directly: people or agents enter some of it themselves.",
  sources: "Where evidence comes from. Each time a Line reads a source, what it read lands as a Capture: the evidence Claims cite.",
  changes: "The latest Claims stated, changed or retired, read from the newest accepted generations. A Claim whose value is “none of …” states that the Subject holds nothing there.",
  coverage: "For each ClaimType, how many of the kind's Subjects hold a value.",
  documents: "Documents the instance holds: reference text Claims and definitions can cite.",
};

/**
 * What this instance knows, at a glance: its kinds (Subjects, ClaimTypes,
 * Claims, who feeds them), its sources, recent changes to beliefs, coverage
 * per ClaimType and its documents. List and aggregate reads only: orient
 * sections, one orient(kind=K) per kind, the source model, one since read.
 */
export function OverviewScreen() {
  const orient = useOrient();
  usePageTitle("Overview");

  if (orient.isPending) return <LoadState />;
  if (orient.error) return <LoadState error={orient.error} />;
  const o = orient.data;
  const claims = o.artifacts?.claims;
  const kinds = (o.kinds ?? []).filter((k) => !isCoreIdentity(k.kind));
  const subjects = kinds.reduce((total, k) => total + k.subjects, 0);
  const documents = o.artifacts?.documents ?? 0;

  return (
    <Page>
      <PageHeader
        title="Overview"
        description={ABOUT.page}
        facts={
          <>
            <Fact label="Generation" title={o.accepted_at}>
              <span className="font-mono">g{o.generation}</span> <span className="text-zinc-500">{formatRelative(o.accepted_at)}</span>
            </Fact>
            <Fact label="Subjects">
              <Count value={subjects} />
            </Fact>
            <Fact label="Claims accepted" title={term("claim", "accepted").meaning}>
              <Count value={claims?.accepted} />
            </Fact>
            <Fact label="Conflicted" title={term("claim", "conflicted").meaning}>
              <Count value={claims?.conflicted} />
            </Fact>
            <Fact label="Waiting for review" title={term("proposal", "open").meaning}>
              <ToLink to="/proposals?status=open">
                <Count value={o.attention?.open_proposals} />
              </ToLink>
            </Fact>
            {(claims?.retired ?? 0) > 0 && (
              <Fact label="Retired" title={term("claim", "retired").meaning}>
                <Count value={claims?.retired} />
              </Fact>
            )}
            <Fact label="ClaimTypes">
              <Count value={o.artifacts?.claim_types} />
            </Fact>
            <Fact label="Captures">
              <Count value={o.artifacts?.captures} />
            </Fact>
            <Fact label="Documents">
              <ToLink to="/docs">
                <Count value={documents} />
              </ToLink>
            </Fact>
          </>
        }
      />
      <KindsAndChanges />
      <SourcesPanel />
      {documents > 0 && <DocumentsPanel />}
    </Page>
  );
}

const Count = ({ value }: { value: number | undefined }) => <span className="font-mono text-zinc-100">{(value ?? 0).toLocaleString()}</span>;

function ToLink({ to, children }: { to: string; children: ReactNode }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  return (
    <Link to={link(`/i/${instanceId}${to}`)} className="hover:underline">
      {children}
    </Link>
  );
}

function LineLink({ line }: { line: string }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const name = lineName(line);
  return (
    <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(name)}`)} className="font-mono text-zinc-300 hover:text-zinc-100 hover:underline" title={`Line ${name}`}>
      {name}
    </Link>
  );
}

// -- kinds, coverage and recent changes ------------------------------------------

interface KindRow {
  kind: string;
  subjects: number;
  claimTypes: OrientPredicate[];
  detail: Schemas["OrientKindDetail"] | null;
  feed: KindFeed | null;
  latest: number | null;
}

/** The kinds table, coverage and recent changes: they share the kind reads and the since read. */
function KindsAndChanges() {
  const kinds = useOrientKinds();
  const claimTypes = useClaimTypes();
  const subjectKinds = useSubjectKinds();
  const source = useSourceModel();
  const names = useMemo(() => (kinds.data?.kinds ?? []).map((k) => k.kind).filter((k) => !isCoreIdentity(k)), [kinds.data]);
  const details = useOrientKindDetails(names);
  const generations = useGenerations();
  const head = generations.data?.generation ?? null;
  const lower = generations.data && head !== null ? sinceLower(generations.data.generations ?? [], head) : null;
  const since = useSince(lower);
  const changes = useMemo(() => (since.data ? beliefChanges(since.data.rows) : null), [since.data]);
  const byGeneration = useMemo(() => new Map((generations.data?.generations ?? []).map((g) => [g.sequence, g])), [generations.data]);

  const feeds = useMemo(
    () =>
      source.data && subjectKinds.data && claimTypes.data
        ? kindFeeds({ specs: source.data.specs, lines: source.data.lines, kinds: subjectKinds.data.rows, claimTypes: claimTypes.data.rows })
        : null,
    [source.data, subjectKinds.data, claimTypes.data],
  );
  const latest = useMemo(() => (changes ? latestByKind(changes) : null), [changes]);
  const rows = useMemo<KindRow[]>(
    () =>
      (kinds.data?.kinds ?? [])
        .filter((k) => !isCoreIdentity(k.kind))
        .map((k) => ({
          kind: k.kind,
          subjects: k.subjects,
          claimTypes: (claimTypes.data?.rows ?? []).filter((p) => (p.subject_kinds ?? []).includes(k.kind) && !isCoreIdentity(p.predicate)),
          detail: details.data[names.indexOf(k.kind)] ?? null,
          feed: feeds?.get(k.kind) ?? null,
          latest: latest?.get(k.kind) ?? null,
        })),
    [kinds.data, claimTypes.data, details.data, names, feeds, latest],
  );
  const window = lower !== null && head !== null ? { from: lower + 1, to: head } : null;

  return (
    <>
      <Panel title="Kinds" description={ABOUT.kinds} meta={kinds.data ? <span>{rows.length}</span> : undefined}>
        {kinds.isPending && <LoadState />}
        {kinds.error && <LoadState error={kinds.error} />}
        {kinds.data && (
          <KindsTable
            rows={rows}
            pending={{ claims: details.isPending, feeds: source.isPending || subjectKinds.isPending, latest: since.isPending || generations.isPending }}
            window={window}
            byGeneration={byGeneration}
          />
        )}
      </Panel>
      <ChangesPanel
        changes={changes}
        pending={generations.isPending || since.isPending}
        error={generations.error ?? since.error}
        window={window}
        truncated={since.data?.truncated ?? false}
        byGeneration={byGeneration}
        claimTypes={claimTypes.data?.rows ?? []}
      />
      <CoveragePanel rows={rows} pending={details.isPending || claimTypes.isPending} error={details.error ?? claimTypes.error} />
    </>
  );
}

function KindsTable({
  rows,
  pending,
  window,
  byGeneration,
}: {
  rows: KindRow[];
  pending: { claims: boolean; feeds: boolean; latest: boolean };
  window: { from: number; to: number } | null;
  byGeneration: ReadonlyMap<number, Generation>;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const columns = useMemo<Column<KindRow>[]>(
    () => [
      {
        id: "kind",
        header: "Kind",
        hideable: false,
        sortValue: (r) => r.kind,
        filter: { kind: "text", text: (r) => r.kind },
        cell: (r) => (
          <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(r.kind)}`)} className="font-mono text-[13px] text-zinc-100 hover:underline">
            {r.kind}
          </Link>
        ),
      },
      { id: "subjects", header: "Subjects", numeric: true, sortValue: (r) => r.subjects, cell: (r) => r.subjects.toLocaleString() },
      { id: "claim_types", header: "ClaimTypes", numeric: true, sortValue: (r) => r.claimTypes.length, cell: (r) => r.claimTypes.length },
      {
        id: "claims",
        header: "Claims",
        title: "Live Claims about its Subjects",
        numeric: true,
        sortValue: (r) => claimsOf(r),
        cell: (r) => (r.detail ? claimsOf(r)!.toLocaleString() : pending.claims ? "…" : "—"),
      },
      {
        id: "fed_by",
        header: "Fed by",
        title: "The Lines whose runs write its facts; Entered directly: people or agents enter some of it",
        filter: { kind: "text", text: (r) => [...(r.feed?.lines ?? []), r.feed?.direct ? "Entered directly" : ""].join(" ") },
        cell: (r) =>
          r.feed ? (
            <span className="flex flex-wrap gap-x-3 gap-y-0.5 text-[12px]">
              {r.feed.lines.map((line) => (
                <LineLink key={line} line={line} />
              ))}
              {r.feed.direct && <span className="text-zinc-400">Entered directly</span>}
            </span>
          ) : pending.feeds ? (
            "…"
          ) : (
            "—"
          ),
      },
      {
        id: "latest",
        header: "Last change",
        title: "The newest generation that stated, changed or retired a Claim about its Subjects",
        sortValue: (r) => r.latest,
        cell: (r) => {
          if (r.latest !== null) return <GenerationWhen generation={byGeneration.get(r.latest)} sequence={r.latest} />;
          if (pending.latest) return "…";
          if (!window) return "—";
          return (
            <span className="text-zinc-500" title={`No Claim change in g${window.from}–g${window.to}, the generations read`}>
              before g{window.from}
            </span>
          );
        },
      },
    ],
    [instanceId, link, pending.claims, pending.feeds, pending.latest, window, byGeneration],
  );
  return <DataTable rows={rows} columns={columns} rowKey={(r) => r.kind} urlKey="kinds" label="Kinds" toolbar={rows.length > 10} maxHeight="none" />;
}

const claimsOf = (r: KindRow) => (r.detail ? r.detail.predicates.reduce((total, p) => total + (p.live_claims ?? 0), 0) : null);

/** A generation, linked to this page as it stood then, with when it was accepted. */
function GenerationWhen({ generation, sequence }: { generation: Generation | undefined; sequence: number }) {
  return (
    <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
      <GenerationLink sequence={sequence} />
      {generation && (
        <span className="text-[12px] text-zinc-500" title={formatDateTime(generation.accepted_at)}>
          {formatRelative(generation.accepted_at)}
        </span>
      )}
    </span>
  );
}

// -- recent changes ------------------------------------------------------------

function ChangesPanel({
  changes,
  pending,
  error,
  window,
  truncated,
  byGeneration,
  claimTypes,
}: {
  changes: BeliefChange[] | null;
  pending: boolean;
  error: Error | null;
  window: { from: number; to: number } | null;
  truncated: boolean;
  byGeneration: ReadonlyMap<number, Generation>;
  claimTypes: readonly OrientPredicate[];
}) {
  // A statement names its field by short name: the ClaimType is the kind's predicate of that name.
  const predicateOf = useMemo(() => {
    const byName = new Map<string, string>();
    for (const p of claimTypes) for (const kind of p.subject_kinds ?? []) byName.set(`${kind}\n${p.name}`, p.predicate);
    return (c: BeliefChange) => (c.kind && c.field ? (byName.get(`${c.kind}\n${c.field}`) ?? `${c.kind}.${c.field}`) : null);
  }, [claimTypes]);
  const columns = useMemo<Column<BeliefChange>[]>(
    () => [
      {
        id: "when",
        header: "When",
        sortValue: (c) => c.generation,
        cell: (c) => <GenerationWhen generation={byGeneration.get(c.generation)} sequence={c.generation} />,
      },
      {
        id: "subject",
        header: "Subject",
        hideable: false,
        sortValue: (c) => c.subject,
        filter: { kind: "text", text: (c) => c.subject ?? "" },
        cell: (c) =>
          c.subject ? (
            <RefLink value={c.subject}>
              <span className="font-mono text-[12.5px]" title={c.subject}>
                {c.subject.slice(c.subject.indexOf("/") + 1)}
              </span>
            </RefLink>
          ) : (
            "—"
          ),
      },
      {
        id: "claim_type",
        header: "ClaimType",
        sortValue: (c) => predicateOf(c),
        filter: { kind: "enum", values: (c) => (c.field ? [c.field] : []) },
        cell: (c) => {
          const predicate = predicateOf(c);
          if (!predicate) return "—";
          return (
            <RefLink value={`ClaimType:${predicate}`}>
              <span className="font-mono text-[12.5px]" title={predicate}>
                {c.field}
                {c.qualifier ? `[${c.qualifier}]` : ""}
              </span>
            </RefLink>
          );
        },
      },
      {
        id: "change",
        header: "Change",
        sortValue: (c) => c.change,
        filter: { kind: "enum", values: (c) => [changeMark(c.change).word] },
        cell: (c) => (
          <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap text-[12px] text-zinc-400">
            <ChangeMark change={c.change} />
            {changeMark(c.change).word}
          </span>
        ),
      },
      {
        id: "value",
        header: "Value",
        cell: (c) => (
          <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1.5">
            {c.from && (
              <>
                <ChangeValue value={c.from.value} muted />
                <span className="text-zinc-600">→</span>
              </>
            )}
            <ChangeValue value={c.value} muted={c.change === "retired"} />
          </span>
        ),
      },
      {
        id: "by",
        header: "By",
        title: "The Line whose run made the change, or the principal who proposed it",
        cell: (c) => <ChangeBy generation={byGeneration.get(c.generation)} />,
      },
      {
        id: "claim",
        header: "Claim",
        cell: (c) => <RefLink value={c.claim} short className="text-[12px]" />,
      },
    ],
    [byGeneration, predicateOf],
  );
  const meta = window ? <span title="The generations this read covers">{`g${window.from}–g${window.to}${truncated ? " (partial)" : ""}`}</span> : undefined;
  return (
    <Panel title="Recent changes to beliefs" description={ABOUT.changes} meta={meta}>
      {pending && <LoadState />}
      {error && <LoadState error={error} />}
      {changes &&
        (changes.length === 0 ? (
          <EmptyState>{window ? `None in g${window.from}–g${window.to}` : "None"}</EmptyState>
        ) : (
          <DataTable
            rows={changes}
            columns={columns}
            rowKey={(c) => `${c.generation}\n${c.memberPath}`}
            urlKey="chg"
            label="Recent changes to beliefs"
            partial={window && window.from > 1 ? `the changes of g${window.from}–g${window.to}` : null}
            maxHeight="28rem"
          />
        ))}
    </Panel>
  );
}

/**
 * Who made a generation's change: the Line its run ran for (one run read per
 * generation, kept), a direct run's Procedure, or the proposing principal.
 */
function ChangeBy({ generation }: { generation: Generation | undefined }) {
  const source = proposalRun(generation?.because);
  const run = useRunAuthor(source?.run ?? null);
  const approvals = generation?.approvals ?? [];
  const title = [proposalWords(generation?.because, generation?.because_truncated ?? false), approvals.length ? `Approved by ${approvals.join(", ")}` : null]
    .filter(Boolean)
    .join("\n");
  if (!generation) return <span className="text-zinc-600">—</span>;
  if (source && run.isPending) return <span className="t-meta animate-pulse">{source.procedure.replace(/^Procedure:/, "")}</span>;
  if (run.data?.line) return <span title={title || undefined}><LineLink line={run.data.line} /></span>;
  const procedure = (run.data?.procedure ?? source?.procedure ?? "").replace(/^Procedure:/, "");
  if (source && procedure) {
    return (
      <span className="text-[12px]" title={title || undefined}>
        <RefLink value={`Procedure:${procedure}`}>
          <span className="font-mono">{procedure}</span>
        </RefLink>
      </span>
    );
  }
  return (
    <span className="font-mono text-[12px] text-zinc-300" title={title || undefined}>
      {generation.proposer ?? "—"}
    </span>
  );
}

// -- coverage --------------------------------------------------------------------

interface CoverageRow {
  kind: string;
  subjects: number;
  predicate: string;
  name: string;
  liveClaims: number;
  withValue: number;
}

function CoveragePanel({ rows, pending, error }: { rows: KindRow[]; pending: boolean; error: Error | null }) {
  const coverage = useMemo<CoverageRow[]>(
    () =>
      rows.flatMap((r) =>
        (r.detail?.predicates ?? [])
          .filter((p) => !isCoreIdentity(p.predicate))
          .map((p) => ({
            kind: r.kind,
            subjects: r.subjects,
            predicate: p.predicate,
            name: p.name,
            liveClaims: p.live_claims ?? 0,
            withValue: p.subjects_with_value ?? 0,
          })),
      ),
    [rows],
  );
  const columns = useMemo<Column<CoverageRow>[]>(
    () => [
      {
        id: "kind",
        header: "Kind",
        sortValue: (c) => c.kind,
        filter: { kind: "enum", values: (c) => [c.kind] },
        cell: (c) => <RefLink value={`SubjectKind:${c.kind}`}><span className="font-mono text-[12.5px]">{c.kind}</span></RefLink>,
      },
      {
        id: "claim_type",
        header: "ClaimType",
        hideable: false,
        sortValue: (c) => c.name,
        filter: { kind: "text", text: (c) => c.predicate },
        cell: (c) => (
          <RefLink value={`ClaimType:${c.predicate}`}>
            <span className="font-mono text-[12.5px]" title={c.predicate}>
              {c.name}
            </span>
          </RefLink>
        ),
      },
      {
        id: "held",
        header: "Subjects with a value",
        numeric: true,
        sortValue: (c) => c.withValue,
        cell: (c) => (
          <span>
            {c.withValue.toLocaleString()} <span className="text-zinc-500">of {c.subjects.toLocaleString()}</span>
          </span>
        ),
      },
      {
        id: "share",
        header: "Share",
        numeric: true,
        sortValue: (c) => (c.subjects ? c.withValue / c.subjects : 0),
        cell: (c) => <ShareBar withValue={c.withValue} subjects={c.subjects} />,
      },
      { id: "claims", header: "Claims", title: "Live Claims of the ClaimType on the kind", numeric: true, sortValue: (c) => c.liveClaims, cell: (c) => c.liveClaims.toLocaleString() },
    ],
    [],
  );
  return (
    <Panel title="Coverage" description={ABOUT.coverage}>
      {pending && <LoadState />}
      {error && <LoadState error={error} />}
      {!pending && !error && (
        <DataTable
          rows={coverage}
          columns={columns}
          rowKey={(c) => `${c.kind}\n${c.predicate}`}
          urlKey="cov"
          label="Coverage"
          toolbar={coverage.length > 10}
          maxHeight="28rem"
        />
      )}
    </Panel>
  );
}

function ShareBar({ withValue, subjects }: { withValue: number; subjects: number }) {
  const share = subjects ? Math.min(1, withValue / subjects) : 0;
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative inline-block h-1.5 w-16 bg-zinc-800" aria-hidden>
        <span className="absolute inset-y-0 left-0 bg-zinc-400" style={{ width: `${Math.round(share * 100)}%` }} />
      </span>
      <span className="w-9 text-right">{shareLabel(withValue, subjects)}</span>
    </span>
  );
}

// -- sources ---------------------------------------------------------------------

interface SourceRow {
  id: string;
  contracts: string[];
  landing: SourceLanding | null;
  lines: string[];
}

function SourcesPanel() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const landings = useSourceLandings();
  const model = useSourceModel();
  const rows = useMemo<SourceRow[] | null>(() => {
    if (!landings.data && !model.data) return null;
    const byId = new Map<string, SourceRow>();
    const entry = (id: string) => {
      let row = byId.get(id);
      if (!row) byId.set(id, (row = { id, contracts: [], landing: null, lines: [] }));
      return row;
    };
    for (const source of model.data?.sources ?? []) {
      const row = entry(source.id);
      row.contracts = [...source.contracts];
      row.lines = readers(source);
    }
    for (const landing of landings.data?.rows ?? []) {
      const row = entry(landing.logical_source);
      row.landing = landing;
      for (const c of landing.contracts) {
        const name = c.contract.replace(/^CaptureContract:/, "");
        if (!c.contract.startsWith("unresolved:") && !row.contracts.includes(name)) row.contracts.push(name);
      }
      if (landing.latest.line && !row.lines.includes(lineName(landing.latest.line))) row.lines.push(lineName(landing.latest.line));
    }
    return [...byId.values()].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  }, [landings.data, model.data]);
  const columns = useMemo<Column<SourceRow>[]>(
    () => [
      {
        id: "source",
        header: "Source",
        hideable: false,
        sortValue: (s) => s.id,
        filter: { kind: "text", text: (s) => s.id },
        cell: (s) => (
          <Link
            to={link(`/i/${instanceId}/flow?focus=${encodeURIComponent(`source:${s.id}`)}`)}
            className="font-mono text-[13px] text-zinc-100 hover:underline"
            title="Open in Evidence flow"
          >
            {s.id}
          </Link>
        ),
      },
      {
        id: "contracts",
        header: "Captured under",
        cell: (s) =>
          s.contracts.length ? (
            <span className="flex flex-wrap gap-x-3 text-[12px]">
              {s.contracts.map((c) => (
                <RefLink key={c} value={`CaptureContract:${c}`}>
                  <span className="font-mono">{c}</span>
                </RefLink>
              ))}
            </span>
          ) : (
            "—"
          ),
      },
      {
        id: "landed",
        header: "Last landed",
        sortValue: (s) => s.landing?.latest.landed_at ?? null,
        cell: (s) => {
          if (!s.landing) return <span className="text-zinc-500">{landings.isPending ? "…" : "never"}</span>;
          const latest = s.landing.latest;
          const when = <span title={formatDateTime(latest.landed_at)}>{formatRelative(latest.landed_at)}</span>;
          const gone = latest.erased ? " (erased)" : latest.unavailable ? " (unavailable)" : "";
          return (
            <span className="whitespace-nowrap">
              {latest.ref ? (
                <Link to={link(`/i/${instanceId}/ref/${encodeURIComponent(latest.ref)}`)} className="hover:underline" title={latest.ref}>
                  {when}
                </Link>
              ) : (
                when
              )}
              {gone}
            </span>
          );
        },
      },
      {
        id: "captures",
        header: "Captures",
        title: "How many times it has landed",
        numeric: true,
        sortValue: (s) => s.landing?.landings ?? 0,
        cell: (s) => (s.landing?.landings ?? 0).toLocaleString(),
      },
      {
        id: "lines",
        header: "Read by",
        title: "The Lines whose runs read it",
        filter: { kind: "text", text: (s) => s.lines.join(" ") },
        cell: (s) =>
          s.lines.length ? (
            <span className="flex flex-wrap gap-x-3 text-[12px]">
              {s.lines.map((line) => (
                <LineLink key={line} line={line} />
              ))}
            </span>
          ) : (
            "—"
          ),
      },
    ],
    [instanceId, link, landings.isPending],
  );
  const pending = landings.isPending && model.isPending;
  const error = landings.error ?? model.error;
  return (
    <Panel title="Sources" description={ABOUT.sources} meta={rows ? <span>{rows.length}</span> : undefined}>
      {pending && <LoadState />}
      {error && <LoadState error={error} />}
      {rows && <DataTable rows={rows} columns={columns} rowKey={(s) => s.id} urlKey="src" label="Sources" toolbar={rows.length > 10} maxHeight="none" />}
    </Panel>
  );
}

/** The Lines that read a source: those whose runs retain it, and those its landings start. */
function readers(source: LogicalSource): string[] {
  const lines = new Set<string>();
  for (const retention of source.retainedBy) if (retention.line) lines.add(lineName(retention.line));
  for (const trigger of source.selectedBy) if (trigger.target.startsWith("Line:")) lines.add(lineName(trigger.target));
  return [...lines].sort();
}

// -- documents -------------------------------------------------------------------

function DocumentsPanel() {
  const documents = useDocuments();
  const instanceId = useInstanceId();
  const link = useAtLink();
  const rows = documents.data?.rows ?? [];
  const columns = useMemo<Column<(typeof rows)[number]>[]>(
    () => [
      {
        id: "title",
        header: "Document",
        hideable: false,
        sortValue: (d) => d.title,
        filter: { kind: "text", text: (d) => `${d.title} ${d.name}` },
        cell: (d) => (
          <Link to={link(`/i/${instanceId}/docs?doc=${encodeURIComponent(d.name)}`)} className="text-zinc-100 hover:underline" title={d.name}>
            {d.title || d.name}
          </Link>
        ),
      },
      { id: "kind", header: "Kind", sortValue: (d) => d.document_kind, filter: { kind: "enum", values: (d) => [d.document_kind] }, cell: (d) => d.document_kind },
      { id: "media", header: "Media type", className: "font-mono text-[12px] text-zinc-400", cell: (d) => d.media_type },
    ],
    [instanceId, link],
  );
  return (
    <Panel title="Documents" description={ABOUT.documents} meta={documents.data ? <span>{rows.length}</span> : undefined}>
      {documents.isPending && <LoadState />}
      {documents.error && <LoadState error={documents.error} />}
      {documents.data && <DataTable rows={rows} columns={columns} rowKey={(d) => d.name} urlKey="doc" label="Documents" toolbar={rows.length > 10} maxHeight="24rem" />}
    </Panel>
  );
}

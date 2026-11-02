import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCaptureContracts, useCard, useClaimTypes, useGet, useInstanceId, useLines, usePins, useSourceModel } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { FieldList } from "@/components/FieldList";
import { Fact, Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { Pending } from "@/components/ontology/Pending";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { lineName } from "@/lib/lines";
import { retainedByWords, type LandingTrigger, type LogicalSource, type Retention } from "@/lib/definitions";
import { contractName, contractProducers, providerName, readContractDefinition, sourceKindLabel } from "@/lib/ontology";
import { sentence } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { contractSentence, readContractTerms, termRows } from "@/lib/contract-terms";
import { roleWord, term } from "@/lib/vocabulary";

/** Retentions whose step names no logical source, by why: the definitions do not say which source it is. */
const UNNAMED: { test: (r: Retention) => boolean; words: string; title: string }[] = [
  {
    test: (r) => !r.emitted && r.given === null,
    words: "under a source named at run time",
    title: "The source step's request names no logical source: the Provider names it at run time, and the daemon does not serve which",
  },
  {
    test: (r) => r.given !== null,
    words: "under the logical source a direct run is given",
    title: "The source step takes its logical source from the run's input ($input.<field>)",
  },
  { test: (r) => r.emitted, words: "as the run's own output (emitted)", title: "An emit step retains the run's output under this contract" },
];

/**
 * One CaptureContract: what it captures (grade, source kinds) and the logical
 * sources Captures land under it from (the source steps that retain each and
 * the Triggers that select it: contracts no longer list sources), the
 * Procedures that capture under it (their pins: interfaces, Lines), the
 * Triggers that fire on its landings, the logical sources they select and
 * the Lines they start, and the ClaimTypes that admit or require it. Landing
 * and citation numbers are post-v1 (K4). Reads: the contract card, the
 * claim_types, lines and pins sections, and the source model (Procedure
 * cards, Line envelopes, the landing Trigger listing), all ontology-sized.
 */
export function ContractScreen() {
  const { name = "" } = useParams();
  usePageTitle(name);
  const card = useCard(`CaptureContract:${name}`);
  const contract = cardOf(card.data, "capture_contract");
  // The terms are in the stored contract (the proof envelope); the card carries only grade and source kinds.
  const proof = useGet(`CaptureContract:${name}`, "proof");
  const terms = readContractTerms(proof.data?.proof);
  const summaryLine = terms ? contractSentence(terms) : null;
  const claimTypes = useClaimTypes();
  const lines = useLines();
  const pins = usePins();
  const model = useSourceModel();

  const definition = contract ? readContractDefinition(contract.captures) : null;
  const admitting = useMemo(() => {
    const byPredicate = new Map((claimTypes.data?.rows ?? []).map((row) => [row.predicate, row]));
    return (contract?.admitted_by ?? []).map((predicate) => ({ predicate, row: byPredicate.get(predicate) }));
  }, [contract, claimTypes.data]);
  const firing = (model.data?.triggers ?? []).filter((trigger) => trigger.contract === name);
  const sources = (model.data?.sources ?? []).filter((source) => source.contracts.includes(name));
  const unnamed = (model.data?.retentions ?? []).filter((r) => r.contract === name && r.source === null);
  const retaining = new Set((model.data?.retentions ?? []).filter((r) => r.contract === name).map((r) => `Procedure:${r.procedure}`));
  const lineByName = new Map((lines.data?.rows ?? []).map((row) => [lineName(row.line), row]));
  const producers = useMemo(() => (pins.data ? contractProducers(pins.data.rows, name) : null), [pins.data, name]);

  if (card.isPending) return <LoadState />;
  if (card.error) return <LoadState error={card.error} />;
  if (!contract || !definition) return <LoadState error={new Error(`CaptureContract:${name} did not resolve to a contract`)} />;
  const required = admitting.filter((a) => a.row?.evidence_requirement === "captured");

  return (
    <Page>
      <PageHeader
        kind="Capture contract"
        title={name}
        mono
        summary={summaryLine ?? undefined}
        facts={
          <>
            <Fact label="State">
              <Chip concept="lifecycle" value={contract.lifecycle} />
            </Fact>
            <Fact label="Version">
              <span className="font-mono">v{contract.version}</span>
            </Fact>
            {definition.grade && !terms?.grade && <Fact label="Grade">{sentence(definition.grade)}</Fact>}
            <Fact label="Admitted by">{admitting.length} ClaimTypes</Fact>
            <Fact label="Required by">{required.length} ClaimTypes</Fact>
          </>
        }
      />

      <FlowHeading step="Input" words="Where Captures under it come from" />

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        <Panel title="Logical sources" meta={<span title="A Capture is retained under a contract and a logical source: what was read. The steps that name it retain it; a landing Trigger selects it.">{sources.length}</span>}>
          <div className="mb-1.5 text-[12px] text-zinc-500">
            Source: <span className="text-zinc-300">{definition.sourceKinds.map(sourceKindLabel).join(", ") || "—"}</span>
          </div>
          {model.isPending && <LoadState />}
          {model.error && <LoadState error={model.error} />}
          {model.data && sources.length === 0 && unnamed.length === 0 && (
            <div className="text-[12px] text-zinc-600">No definition names a logical source under this contract.</div>
          )}
          {sources.length > 0 && <SourcesTable sources={sources} contract={name} />}
          {UNNAMED.map(({ test, words, title }) => {
            const group = unnamed.filter(test);
            return group.length > 0 ? (
              <div key={words} className="mt-1.5 text-[12px] text-zinc-500" title={title}>
                Also retained by {retainedByWords(group)}, {words}
              </div>
            ) : null;
          })}
        </Panel>
        <Panel
          title="Captured under it by"
          meta={<span title="Procedures with a source or emit step naming this contract. Pins are at Procedure grain.">{producers?.length ?? "…"}</span>}
        >
          {pins.isPending && <LoadState />}
          {pins.error && <LoadState error={pins.error} />}
          {producers && producers.length === 0 && <EmptyState>No Procedure pins this contract.</EmptyState>}
          {producers && producers.length > 0 && <ProducersTable producers={producers} retaining={retaining} />}
          {pins.data?.truncated && <div className="mt-1 text-[12px] text-zinc-500">The pins listing stopped at its page cap.</div>}
          <div className="mt-2 text-[12px] text-zinc-500">
            Landings, cited Captures and citing Claims <Pending gap="K4" />
          </div>
        </Panel>
      </div>

      <FlowHeading step="Contract" words="What a Capture under it is" />
      <Panel title="Terms" meta={terms?.format ? <span className="font-mono">{terms.format}</span> : undefined}>
        {proof.isPending && <LoadState />}
        {!proof.isPending && !terms && (
          <div className="text-[12px] text-zinc-500">
            The stored contract was not served{proof.error ? `: ${proof.error.message}` : ""}.
          </div>
        )}
        {terms && (
          <FieldList
            labels="words"
            label="Terms"
            fields={termRows(terms).map((row) => ({
              key: row.label,
              label: row.label,
              value: (
                <span className="text-zinc-200" title={row.raw}>
                  {row.words}
                </span>
              ),
            }))}
          />
        )}
      </Panel>

      <FlowHeading step="Output" words="What its landings start, and the ClaimTypes that admit it as evidence" />
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
      <Panel title="Triggers on its landings" meta={<span>{firing.length}</span>}>
        {model.isPending && <LoadState />}
        {model.data && firing.length === 0 && <EmptyState>No Trigger fires when a Capture under this contract lands.</EmptyState>}
        {firing.length > 0 && <TriggersTable triggers={firing} lines={lineByName} />}
        {model.data?.truncated && (
          <div className="mt-1 text-[12px] text-zinc-500">A definition listing stopped at its cap.</div>
        )}
      </Panel>

      <Panel title="ClaimTypes that admit it" meta={<span>{admitting.length}</span>}>
        <AdmittingTable admitting={admitting} />
      </Panel>
      </div>
    </Page>
  );
}

/** Tables this short read without the toolbar; longer ones get its sort, filter and Columns. */
const TOOLBAR_AT = 10;

/** The logical sources Captures under the contract land under: who retains each and which Triggers select it. */
function SourcesTable({ sources, contract }: { sources: LogicalSource[]; contract: string }) {
  const columns = useMemo<Column<LogicalSource>[]>(
    () => [
      {
        id: "source",
        header: "Logical source",
        hideable: false,
        sortValue: (s) => s.id,
        filter: { kind: "text", text: (s) => s.id },
        className: "font-mono text-[12px] text-zinc-200",
        cell: (s) => s.id,
      },
      {
        id: "retained",
        header: "Retained by",
        title: "The source steps that name it under this contract",
        className: "text-[12px] text-zinc-400",
        cell: (s) => {
          const own = s.retainedBy.filter((r) => r.contract === contract);
          return own.length ? retainedByWords(own) : <span className="text-zinc-500">No step names it</span>;
        },
      },
      {
        id: "selected",
        header: "Selected by",
        title: "Landing Triggers that select it",
        className: "text-[12px] text-zinc-400",
        cell: (s) => {
          const own = s.selectedBy.filter((t) => t.contract === contract);
          return own.length ? own.map((t) => t.name).join(", ") : <span className="text-zinc-600">—</span>;
        },
      },
    ],
    [contract],
  );
  return (
    <DataTable
      rows={sources}
      columns={columns}
      rowKey={(s) => s.id}
      urlKey="src"
      label="Logical sources"
      toolbar={sources.length > TOOLBAR_AT}
      maxHeight="none"
    />
  );
}

type Producer = ReturnType<typeof contractProducers>[number];

/** What a Procedure does with the contract: retains Captures under it, reads its landings, or both. */
function producerRoles(p: Producer, retaining: ReadonlySet<string>): string[] {
  return [...(retaining.has(p.source) ? ["retains Captures under it"] : []), ...(p.startedByLanding.length > 0 ? ["reads its landings"] : [])];
}

/** The Procedures that capture under the contract (from their pins): what each does with it, its interfaces and Lines. */
function ProducersTable({ producers, retaining }: { producers: Producer[]; retaining: ReadonlySet<string> }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const columns = useMemo<Column<Producer>[]>(
    () => [
      {
        id: "procedure",
        header: "Procedure",
        hideable: false,
        sortValue: (p) => p.source,
        filter: { kind: "text", text: (p) => p.source },
        cell: (p) => (
          <span className="flex flex-wrap items-baseline gap-x-2">
            <RefLink value={p.source} />
            {p.source.startsWith("Blueprint:") && <span className="text-[12px] text-zinc-600">Blueprint</span>}
            {producerRoles(p, retaining).map((role) => (
              <span
                key={role}
                className="text-[12px] text-zinc-500"
                title={role === "reads its landings" ? "Its Lines start on this contract's landings: it reads what landed" : "A source or emit step retains Captures under it"}
              >
                {role}
              </span>
            ))}
          </span>
        ),
      },
      {
        id: "interfaces",
        header: "Interfaces",
        className: "text-[12px]",
        cell: (p) => (
          <span className="flex flex-wrap gap-x-3">
            {p.providers.map((provider) => (
              <RefLink key={provider} value={provider} className="text-zinc-400">
                <span className="font-mono text-[12px]">{providerName(provider)}</span>
              </RefLink>
            ))}
          </span>
        ),
      },
      {
        id: "lines",
        header: "Lines",
        filter: { kind: "enum", values: (p) => p.lines.map(lineName) },
        className: "text-[12px]",
        cell: (p) => (
          <span className="flex flex-wrap gap-x-3">
            {p.lines.map((line) => (
              <Link key={line} to={link(`/i/${instanceId}/lines/${encodeURIComponent(lineName(line))}`)} className="font-mono text-zinc-300 hover:underline">
                {lineName(line)}
              </Link>
            ))}
          </span>
        ),
      },
    ],
    [instanceId, link, retaining],
  );
  return (
    <DataTable
      rows={producers}
      columns={columns}
      rowKey={(p) => p.source}
      urlKey="by"
      label="Captured under it by"
      toolbar={producers.length > TOOLBAR_AT}
      maxHeight="none"
    />
  );
}

type LineRow = Schemas["OrientLine"];

/** The Triggers that fire on the contract's landings: the sources they select and the Line each starts. */
function TriggersTable({ triggers, lines }: { triggers: LandingTrigger[]; lines: ReadonlyMap<string, LineRow> }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const columns = useMemo<Column<LandingTrigger>[]>(
    () => [
      {
        id: "trigger",
        header: "Trigger",
        hideable: false,
        sortValue: (t) => t.name,
        filter: { kind: "text", text: (t) => t.name },
        cell: (t) => (
          <RefLink value={`Trigger:${t.name}`}>
            <span className="font-mono text-[12px] text-zinc-300">{t.name}</span>
          </RefLink>
        ),
      },
      {
        id: "on",
        header: "On",
        title: "The logical sources whose landings fire it",
        filter: { kind: "enum", values: (t) => (t.logicalSources.length ? t.logicalSources : ["any landing"]) },
        className: "text-[12px] text-zinc-500",
        cell: (t) => (t.logicalSources.length ? t.logicalSources.join(", ") : "any landing"),
      },
      {
        id: "starts",
        header: "Starts",
        sortValue: (t) => t.target,
        className: "text-[12px]",
        cell: (t) => {
          const line = t.target.startsWith("Line:") ? lines.get(lineName(t.target)) : undefined;
          return (
            <>
              {t.target.startsWith("Line:") ? (
                <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(lineName(t.target))}`)} className="font-mono text-zinc-200 hover:underline">
                  {lineName(t.target)}
                </Link>
              ) : (
                <span className="font-mono text-zinc-400">{t.target}</span>
              )}
              {line && (
                <div className="text-zinc-500">
                  {line.procedure.replace(/^Procedure:/, "")} · at most {term("authority", line.authority).word.toLowerCase()} ·{" "}
                  {term("line", line.enablement ?? "not_enabled").word.toLowerCase()}
                </div>
              )}
            </>
          );
        },
      },
    ],
    [instanceId, link, lines],
  );
  return (
    <DataTable
      rows={triggers}
      columns={columns}
      rowKey={(t) => t.name}
      urlKey="trg"
      label="Triggers on its landings"
      toolbar={triggers.length > TOOLBAR_AT}
      maxHeight="none"
    />
  );
}

type Admitting = { predicate: string; row: Schemas["OrientPredicate"] | undefined };

/** The ClaimTypes whose evidence rules admit the contract, in the shared table. */
function AdmittingTable({ admitting }: { admitting: Admitting[] }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const columns = useMemo<Column<Admitting>[]>(
    () => [
      {
        id: "claim_type",
        header: "ClaimType",
        hideable: false,
        sortValue: (a) => a.predicate,
        filter: { kind: "text", text: (a) => a.predicate },
        cell: ({ predicate, row }) => {
          const kind = row?.subject_kinds?.[0];
          return kind ? (
            <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?claim_type=${encodeURIComponent(predicate)}`)} className="font-mono text-zinc-200 hover:underline">
              {predicate}
            </Link>
          ) : (
            <span className="font-mono text-zinc-300">{predicate}</span>
          );
        },
      },
      {
        id: "evidence",
        header: "Evidence",
        title: "Required: a Capture is required; admitted: the rule admits one",
        sortValue: (a) => evidenceWord(a.row),
        filter: { kind: "enum", values: (a) => [evidenceWord(a.row)] },
        cell: ({ row }) => <span className={row?.evidence_requirement === "captured" ? "text-zinc-300" : "text-zinc-500"}>{evidenceWord(row)}</span>,
      },
      {
        id: "role",
        header: "Role",
        sortValue: (a) => (a.row?.default_role ? sentence(roleWord(a.row.default_role)) : null),
        filter: { kind: "enum", values: (a) => (a.row?.default_role ? [sentence(roleWord(a.row.default_role))] : []) },
        cell: ({ row }) => <span className="text-zinc-400">{row?.default_role ? sentence(roleWord(row.default_role)) : "—"}</span>,
      },
      {
        id: "fresh",
        header: "Fresh",
        title: "Evidence goes stale after",
        sortValue: (a) => a.row?.stale_after ?? null,
        cell: ({ row }) => <span className="font-mono text-zinc-400">{row?.stale_after ?? "—"}</span>,
      },
      {
        id: "kit",
        header: "Kit",
        sortValue: (a) => a.row?.kit ?? "Here",
        filter: { kind: "enum", values: (a) => [a.row?.kit ?? "Here"] },
        cell: ({ row }) => <span className="font-mono text-zinc-400">{row?.kit ?? "Here"}</span>,
      },
    ],
    [instanceId, link],
  );
  return (
    <DataTable
      rows={admitting}
      columns={columns}
      rowKey={(a) => a.predicate}
      urlKey="ct"
      label="ClaimTypes that admit it"
      empty="No ClaimType admits Captures under this contract."
    />
  );
}

function evidenceWord(row: Schemas["OrientPredicate"] | undefined): string {
  return row?.evidence_requirement === "captured" ? "Required" : "Admitted";
}

/** A step of the page's Input → Contract → Output reading order. */
function FlowHeading({ step, words }: { step: string; words: string }) {
  return (
    <div className="flex items-baseline gap-2 border-b border-zinc-800/70 pb-1 pt-2">
      <h2 className="text-[13px] font-semibold text-zinc-200">{step}</h2>
      <span className="text-[12px] text-zinc-500">{words}</span>
    </div>
  );
}

type ContractRow = Schemas["OrientCaptureContract"];

/** Every CaptureContract (orient capture_contracts section), in the shared table. */
export function ContractsScreen() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const contracts = useCaptureContracts();
  usePageTitle("Contracts");
  const columns = useMemo<Column<ContractRow>[]>(
    () => [
      {
        id: "contract",
        header: "Contract",
        hideable: false,
        sortValue: (row) => contractName(row.contract),
        filter: { kind: "text", text: (row) => contractName(row.contract) },
        cell: (row) => (
          <Link to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(row.contract))}`)} className="font-mono text-zinc-200 hover:underline">
            {contractName(row.contract)}
          </Link>
        ),
      },
      {
        id: "version",
        header: "Version",
        numeric: true,
        sortValue: (row) => row.version,
        cell: (row) => <span className="text-zinc-400">v{row.version}</span>,
      },
      {
        id: "grade",
        header: "Grade",
        title: "Observed, derived or predicted",
        sortValue: (row) => row.grade,
        filter: { kind: "enum", values: (row) => [row.grade] },
        optionLabel: sentence,
        cell: (row) => <span className="text-zinc-400">{sentence(row.grade)}</span>,
      },
      {
        id: "admitted_by",
        header: "Admitted by",
        title: "Live ClaimTypes whose evidence rules admit it",
        numeric: true,
        sortValue: (row) => row.admitted_by,
        cell: (row) => (
          <span className="text-zinc-400">
            {row.admitted_by} ClaimType{row.admitted_by === 1 ? "" : "s"}
          </span>
        ),
      },
    ],
    [instanceId, link],
  );
  return (
    <Page width="narrow">
      <PageHeader title="Capture contracts" summary="What each kind of evidence is, where it comes from, and how many ClaimTypes admit it." />
      {contracts.isPending && <LoadState />}
      {contracts.error && <LoadState error={contracts.error} />}
      {contracts.data && (
        <Panel title="Contracts" meta={<span>{contracts.data.rows.length}</span>}>
          <DataTable
            rows={contracts.data.rows}
            columns={columns}
            rowKey={(row) => row.contract}
            label="Capture contracts"
            partial={contracts.data.truncated ? `the first ${contracts.data.rows.length} the daemon listed` : null}
            empty="No capture contracts."
          />
        </Panel>
      )}
    </Page>
  );
}

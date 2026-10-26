import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCaptureContracts, useCard, useClaimTypes, useGet, useInstanceId, useLines, usePins, useSourceModel } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { Fact, Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { Pending } from "@/components/ontology/Pending";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { lineName } from "@/lib/lines";
import { retainedByWords, type Retention } from "@/lib/definitions";
import { contractName, contractProducers, providerName, readContractDefinition, sourceKindLabel } from "@/lib/ontology";
import { usePageTitle } from "@/lib/usePageTitle";
import { contractSentence, readContractTerms, termRows } from "@/lib/contract-terms";
import { roleWord, term } from "@/lib/vocabulary";

/** Retentions whose step names no logical source, by why: the definitions do not say which source it is. */
const UNNAMED: { test: (r: Retention) => boolean; words: string; title: string }[] = [
  {
    test: (r) => !r.emitted && r.given === null,
    words: "under a logical source its Provider names",
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
  const instanceId = useInstanceId();
  const link = useAtLink();
  usePageTitle(name);
  const card = useCard(`CaptureContract:${name}`);
  const contract = cardOf(card.data, "capture_contract");
  // The terms are in the stored contract (the proof envelope); the card carries only grade and source kinds.
  const proof = useGet(`CaptureContract:${name}`, "proof");
  const terms = readContractTerms(proof.data?.proof);
  const sentence = terms ? contractSentence(terms) : null;
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
        summary={sentence ?? undefined}
        facts={
          <>
            <Fact label="State">
              <Chip concept="lifecycle" value={contract.lifecycle} />
            </Fact>
            <Fact label="Version">
              <span className="font-mono">v{contract.version}</span>
            </Fact>
            {definition.grade && !terms?.grade && <Fact label="Grade">{definition.grade}</Fact>}
            <Fact label="Admitted by">{admitting.length} ClaimTypes</Fact>
            <Fact label="Required by">{required.length} ClaimTypes</Fact>
          </>
        }
      />

      <FlowHeading step="Input" words="where Captures under it come from" />

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        <Panel title="Logical sources" meta={<span title="A Capture is retained under a contract and a logical source: what was read. The steps that name it retain it; a landing Trigger selects it.">{sources.length}</span>}>
          <div className="text-[12px] text-zinc-500">
            Source: <span className="text-zinc-300">{definition.sourceKinds.map(sourceKindLabel).join(", ") || "—"}</span>
          </div>
          {model.isPending && <LoadState />}
          {model.error && <LoadState error={model.error} />}
          {model.data && sources.length === 0 && unnamed.length === 0 && (
            <div className="text-[12px] text-zinc-600">No definition names a logical source under this contract.</div>
          )}
          <div className="mt-1 space-y-1 text-[12px]">
            {sources.map((source) => (
              <div key={source.id}>
                <span className="font-mono text-zinc-200">{source.id}</span>
                <span className="text-zinc-500">
                  {" "}
                  {source.retainedBy.some((r) => r.contract === name)
                    ? `retained by ${retainedByWords(source.retainedBy.filter((r) => r.contract === name))}`
                    : "no step names it"}
                  {source.selectedBy.some((t) => t.contract === name) &&
                    ` · selected by ${source.selectedBy.filter((t) => t.contract === name).map((t) => t.name).join(", ")}`}
                </span>
              </div>
            ))}
            {UNNAMED.map(({ test, words, title }) => {
              const group = unnamed.filter(test);
              return group.length > 0 ? (
                <div key={words} className="text-zinc-500" title={title}>
                  also retained by {retainedByWords(group)}, {words}
                </div>
              ) : null;
            })}
          </div>
        </Panel>
        <Panel
          title="Captured under it by"
          meta={<span title="Procedures with a source or emit step naming this contract. Pins are at Procedure grain.">{producers?.length ?? "…"}</span>}
        >
          {pins.isPending && <LoadState />}
          {pins.error && <LoadState error={pins.error} />}
          {producers && producers.length === 0 && <EmptyState>No Procedure pins this contract.</EmptyState>}
          <div className="space-y-1 text-[12px]">
            {(producers ?? []).map((p) => (
              <div key={p.source}>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <RefLink value={p.source} />
                  <span className="text-zinc-600">{p.source.startsWith("Blueprint:") ? "Blueprint" : "Procedure"}</span>
                  {retaining.has(p.source) && <span className="text-zinc-500">retains Captures under it</span>}
                  {p.startedByLanding.length > 0 && (
                    <span className="text-zinc-500" title="Its Lines start on this contract's landings: it reads what landed">
                      reads its landings
                    </span>
                  )}
                </div>
                {(p.providers.length > 0 || p.lines.length > 0) && (
                  <div className="flex flex-wrap gap-x-3 pl-3 text-zinc-500">
                    {p.providers.map((provider) => (
                      <RefLink key={provider} value={provider} className="text-zinc-400">
                        <span className="font-mono text-[12px]">{providerName(provider)}</span>
                      </RefLink>
                    ))}
                    {p.lines.map((line) => (
                      <Link key={line} to={link(`/i/${instanceId}/lines/${encodeURIComponent(lineName(line))}`)} className="font-mono text-zinc-300 hover:underline">
                        {lineName(line)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {pins.data?.truncated && <div className="mt-1 text-[12px] text-zinc-500">The pins listing stopped at its page cap.</div>}
          <div className="mt-2 text-[12px] text-zinc-500">
            Landings, cited Captures and citing Claims <Pending gap="K4" />
          </div>
        </Panel>
      </div>

      <FlowHeading step="Contract" words="what a Capture under it is" />
      <Panel title="Terms" meta={terms?.format ? <span className="font-mono">{terms.format}</span> : undefined}>
        {proof.isPending && <LoadState />}
        {!proof.isPending && !terms && (
          <div className="text-[12px] text-zinc-500">
            The stored contract was not served{proof.error ? `: ${proof.error.message}` : ""}.
          </div>
        )}
        {terms && (
          <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-6 gap-y-1.5 text-[13px]">
            {termRows(terms).map((row) => (
              <div key={row.label} className="contents">
                <dt className="text-zinc-500">{row.label}</dt>
                <dd className="text-zinc-200" title={row.raw}>
                  {row.words}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Panel>

      <FlowHeading step="Output" words="what its landings start, and the ClaimTypes that admit it as evidence" />
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
      <Panel title="Triggers on its landings" meta={<span>{firing.length}</span>}>
        {model.isPending && <LoadState />}
        {model.data && firing.length === 0 && <EmptyState>No Trigger fires when a Capture under this contract lands.</EmptyState>}
        <div className="space-y-0.5 text-[12px]">
          {firing.map((row) => {
            const target = row.target;
            const line = target.startsWith("Line:") ? lineByName.get(lineName(target)) : undefined;
            return (
              <div key={row.name} className="flex flex-wrap items-baseline gap-x-3">
                <RefLink value={`Trigger:${row.name}`}>
                  <span className="font-mono text-zinc-300">{row.name}</span>
                </RefLink>
                <span className="text-zinc-500" title="The logical sources whose landings fire it">
                  {row.logicalSources.length ? `on ${row.logicalSources.join(", ")}` : "on any landing"}
                </span>
                <span className="text-zinc-600">→</span>
                {target.startsWith("Line:") ? (
                  <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(lineName(target))}`)} className="font-mono text-zinc-200 hover:underline">
                    {lineName(target)}
                  </Link>
                ) : (
                  <span className="font-mono text-zinc-400">{target}</span>
                )}
                {line && (
                  <span className="text-zinc-500">
                    {line.procedure.replace(/^Procedure:/, "")} · at most {term("authority", line.authority).word.toLowerCase()} ·{" "}
                    {term("line", line.enablement ?? "not_enabled").word.toLowerCase()}
                  </span>
                )}
              </div>
            );
          })}
        </div>
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
        title: "required: a Capture is required; admitted: the rule admits one",
        sortValue: (a) => evidenceWord(a.row),
        filter: { kind: "enum", values: (a) => [evidenceWord(a.row)] },
        cell: ({ row }) => <span className={row?.evidence_requirement === "captured" ? "text-zinc-300" : "text-zinc-500"}>{evidenceWord(row)}</span>,
      },
      {
        id: "role",
        header: "Role",
        sortValue: (a) => (a.row?.default_role ? roleWord(a.row.default_role) : null),
        filter: { kind: "enum", values: (a) => (a.row?.default_role ? [roleWord(a.row.default_role)] : []) },
        cell: ({ row }) => <span className="text-zinc-400">{row?.default_role ? roleWord(row.default_role) : "—"}</span>,
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
        sortValue: (a) => a.row?.kit ?? "here",
        filter: { kind: "enum", values: (a) => [a.row?.kit ?? "here"] },
        cell: ({ row }) => <span className="font-mono text-zinc-400">{row?.kit ?? "here"}</span>,
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
  return row?.evidence_requirement === "captured" ? "required" : "admitted";
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
        title: "observed, derived or predicted",
        sortValue: (row) => row.grade,
        filter: { kind: "enum", values: (row) => [row.grade] },
        cell: (row) => <span className="text-zinc-400">{row.grade}</span>,
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

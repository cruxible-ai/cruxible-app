import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCaptureContracts, useCard, useClaimTypes, useInstanceId, useLines, usePins, useSourceModel } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { Fact, Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { Pending } from "@/components/ontology/Pending";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { lineName } from "@/lib/lines";
import { retainedByWords, type Retention } from "@/lib/definitions";
import { contractName, contractProducers, providerName, readContractDefinition, sourceKindLabel } from "@/lib/ontology";
import { usePageTitle } from "@/lib/usePageTitle";

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
        facts={
          <>
            <Fact label="State">
              <Chip value={contract.lifecycle} />
            </Fact>
            <Fact label="Version">
              <span className="font-mono">v{contract.version}</span>
            </Fact>
            {definition.grade && <Fact label="Grade">{definition.grade}</Fact>}
            <Fact label="Admitted by">{admitting.length} ClaimTypes</Fact>
            <Fact label="Required by">{required.length} ClaimTypes</Fact>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        <Panel title="What it captures">
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[13px]">
            <dt className="text-zinc-500">Source kinds</dt>
            <dd className="text-zinc-300">{definition.sourceKinds.map(sourceKindLabel).join(", ") || "—"}</dd>
            <dt className="text-zinc-500">Grade</dt>
            <dd className="text-zinc-300">{definition.grade ?? "—"}</dd>
          </dl>
          <div className="mt-3 text-[12px] font-semibold uppercase tracking-wider text-zinc-500" title="A Capture is retained under a contract and a logical source: what was read. The steps that name it retain it; a landing Trigger selects it.">
            Logical sources
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
          {pins.data?.truncated && <div className="mt-1 text-[12px] text-amber-400/90">The pins listing stopped at its page cap.</div>}
          <div className="mt-2 text-[12px] text-zinc-500">
            Landings, cited Captures and citing Claims <Pending gap="K4" />
          </div>
        </Panel>
      </div>

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
                    {line.procedure.replace(/^Procedure:/, "")} · max {line.authority}
                    {line.enablement ? ` · ${line.enablement}` : " · not enabled"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {model.data?.truncated && (
          <div className="mt-1 text-[12px] text-amber-400/90">A definition listing stopped at its cap.</div>
        )}
      </Panel>

      <Panel title="ClaimTypes that admit it" meta={<span>{admitting.length}</span>}>
        {admitting.length === 0 && <EmptyState>No ClaimType admits Captures under this contract.</EmptyState>}
        <table className="w-full text-left text-[12px]">
          <thead className="text-zinc-500">
            <tr>
              <th className="py-1 pr-3 font-medium">ClaimType</th>
              <th className="py-1 pr-3 font-medium">evidence</th>
              <th className="py-1 pr-3 font-medium">role</th>
              <th className="py-1 pr-3 font-medium">fresh</th>
              <th className="py-1 font-medium">kit</th>
            </tr>
          </thead>
          <tbody>
            {admitting.map(({ predicate, row }) => {
              const kind = row?.subject_kinds?.[0];
              return (
                <tr key={predicate} className="border-t border-zinc-900">
                  <td className="py-1 pr-3">
                    {kind ? (
                      <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?claim_type=${encodeURIComponent(predicate)}`)} className="font-mono text-zinc-200 hover:underline">
                        {predicate}
                      </Link>
                    ) : (
                      <span className="font-mono text-zinc-300">{predicate}</span>
                    )}
                  </td>
                  <td className={`py-1 pr-3 ${row?.evidence_requirement === "captured" ? "text-amber-400/90" : "text-zinc-500"}`}>
                    {row?.evidence_requirement === "captured" ? "required" : "admitted"}
                  </td>
                  <td className="py-1 pr-3 text-zinc-400">{row?.default_role ?? "—"}</td>
                  <td className="py-1 pr-3 font-mono text-zinc-400">{row?.stale_after ?? "—"}</td>
                  <td className="py-1 font-mono text-zinc-400">{row?.kit ?? "here"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </Page>
  );
}

/** Every CaptureContract (orient capture_contracts section). */
export function ContractsScreen() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const contracts = useCaptureContracts();
  usePageTitle("Contracts");
  return (
    <Page width="narrow">
      <PageHeader title="Capture contracts" summary="What each kind of evidence is, where it comes from, and how many ClaimTypes admit it." />
      {contracts.isPending && <LoadState />}
      {contracts.error && <LoadState error={contracts.error} />}
      {contracts.data && (
        <Panel title="Contracts" meta={<span>{contracts.data.rows.length}</span>}>
          <table className="w-full text-left text-[12px]">
            <thead className="text-zinc-500">
              <tr>
                <th className="py-1 pr-3 font-medium">contract</th>
                <th className="py-1 pr-3 font-medium">version</th>
                <th className="py-1 pr-3 font-medium">grade</th>
                <th className="py-1 font-medium">admitted by</th>
              </tr>
            </thead>
            <tbody>
              {contracts.data.rows.map((row) => (
                <tr key={row.contract} className="border-t border-zinc-900">
                  <td className="py-1 pr-3">
                    <Link to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(row.contract))}`)} className="font-mono text-zinc-200 hover:underline">
                      {contractName(row.contract)}
                    </Link>
                  </td>
                  <td className="py-1 pr-3 font-mono text-zinc-400">v{row.version}</td>
                  <td className="py-1 pr-3 text-zinc-400">{row.grade}</td>
                  <td className="py-1 font-mono text-zinc-400">{row.admitted_by} ClaimTypes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}
    </Page>
  );
}

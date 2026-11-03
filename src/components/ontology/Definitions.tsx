import { localCronWords } from "@/lib/schedule";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInstanceId } from "@/api/hooks";
import { Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { DataTable, type Column } from "@/components/DataTable";
import { FieldList, type FieldItem } from "@/components/FieldList";
import { useAtLink } from "@/lib/at";
import {
  contractRefText,
  hostOf,
  logicalSourceText,
  procedureSlots,
  stepView,
  type LandingTrigger,
  type LineDefinition,
  type ProcedureSpec,
  type Retention,
  type StepView,
} from "@/lib/definitions";
import { bytesWords, shortName } from "@/lib/step-words";
import { Parts } from "@/components/Parts";

type Slot = ReturnType<typeof procedureSlots>[number];
import { providerName } from "@/lib/ontology";
import { term } from "@/lib/vocabulary";
import { sentence } from "@/lib/text";
import { ProcedureGraph } from "@/components/graph/ProcedureGraph";

/**
 * Definitions as authored: a slotted Procedure's slots (slot -> the Contracts
 * it takes in and gives out, the build a Line binds it to) and steps, each
 * naming the contracts, queries, ClaimTypes and Procedures it uses; a Line's
 * parameters, trigger input and bindings; a landing Trigger's contract and
 * logical sources. Every named reference is a link.
 */

function NamedRef({ kind, name }: { kind: "contract" | "query" | "claim_type" | "procedure"; name: string }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  if (kind === "contract") {
    return (
      <Link to={link(`/i/${instanceId}/contracts/${encodeURIComponent(name.replace(/^CaptureContract:/, ""))}`)} className="font-mono text-zinc-200 hover:underline">
        {name.replace(/^CaptureContract:/, "")}
      </Link>
    );
  }
  const ref =
    kind === "query"
      ? `QueryDefinition:${name}`
      : kind === "claim_type"
        ? `ClaimType:${name}`
        : `Procedure:${name}`;
  return (
    <RefLink value={ref}>
      <span className="font-mono text-[12px]">{name}</span>
    </RefLink>
  );
}

function LogicalSourceText({ view, parameters }: { view: StepView; parameters?: Record<string, unknown> | undefined }) {
  const ref = view.logicalSource;
  if (!ref) return null;
  if ("literal" in ref) return <span className="font-mono text-zinc-200">{ref.literal}</span>;
  const value = "param" in ref ? parameters?.[ref.param] : undefined;
  return (
    <span>
      <span className="font-mono text-zinc-400">{logicalSourceText(ref)}</span>
      {typeof value === "string" ? (
        <span>
          {" "}
          = <span className="font-mono text-zinc-200">{value}</span>
        </span>
      ) : (
        <span className="text-zinc-500"> (given at run)</span>
      )}
    </span>
  );
}

/**
 * A Procedure's authored form: slots (the Contracts each takes in and gives
 * out, and the build a Line binds it to), and its steps with what each names.
 */
export function ProcedureDefinition({
  spec,
  line,
  selectedStep = null,
}: {
  spec: ProcedureSpec;
  /** The Line running it, for its parameters, trigger input and bindings. */
  line?: LineDefinition | null | undefined;
  /** The step picked on the graph: highlighted and scrolled into view. */
  selectedStep?: string | null | undefined;
}) {
  const rows = useRef(new Map<string, HTMLLIElement>());
  useEffect(() => {
    if (selectedStep === null) return;
    rows.current.get(selectedStep)?.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
  }, [selectedStep]);
  const slots = procedureSlots(spec);
  const slotColumns = useMemo<Column<Slot>[]>(
    () => [
      {
        id: "slot",
        header: "Slot",
        title: "A slot is a Provider seat a call goes through: a Contract in, a Contract out",
        className: "font-mono text-zinc-200",
        cell: (row) => row.slot,
      },
      {
        id: "in",
        header: "Takes",
        title: "The Contract the slot's Provider is given",
        cell: (row) => <span className="font-mono text-[12px] text-zinc-300">{contractRefText(row.in)}</span>,
      },
      {
        id: "out",
        header: "Gives",
        title: "The Contract the slot's Provider returns",
        cell: (row) => <span className="font-mono text-[12px] text-zinc-300">{contractRefText(row.out)}</span>,
      },
      {
        id: "effect",
        header: "Effect",
        className: "text-[12px] text-zinc-400",
        cell: (row) => row.effect.replaceAll("_", " "),
      },
      {
        id: "binds",
        header: "Binds",
        title: "The Provider build the Line binds the slot to",
        className: "text-[12px] text-zinc-400",
        cell: ({ slot }) => {
          const explicit = line?.bindings[slot];
          return explicit ? (
            <RefLink value={`Provider:${explicit}`}>
              <span className="font-mono text-[12px]" title={explicit}>{providerName(explicit)}</span>
            </RefLink>
          ) : (
            <span className="text-zinc-600">—</span>
          );
        },
      },
    ],
    [line],
  );
  const steps = spec.steps.map(stepView);
  const inputs = Object.entries(spec.input ?? {});
  return (
    <Panel title="Definition" meta={<span>{steps.length} steps · {slots.length} slots</span>}>
      {inputs.length > 0 && (
        <div className="mb-3 text-[12px]">
          <span className="text-zinc-500">Input </span>
          {inputs.map(([name, field], i) => (
            <span key={name}>
              {i > 0 && ", "}
              <span className="font-mono text-zinc-300">{name}</span>
              <span className="text-zinc-500">: {field.type.kind}</span>
            </span>
          ))}
        </div>
      )}
      {slots.length > 0 && (
        <DataTable
          rows={slots}
          columns={slotColumns}
          rowKey={(row) => row.slot}
          label="Slots"
          toolbar={false}
          maxHeight="none"
        />
      )}
      <ol className="mt-3 space-y-1 text-[12px]">
        {steps.map((step) => (
          <li
            key={step.id}
            ref={(el) => {
              if (el) rows.current.set(step.id, el);
              else rows.current.delete(step.id);
            }}
            data-step={step.id}
            aria-current={selectedStep === step.id ? "step" : undefined}
            className={`flex flex-wrap items-baseline gap-x-2 border-t border-zinc-900 pt-1 ${
              selectedStep === step.id ? "-mx-1.5 bg-zinc-800/60 px-1.5 outline outline-1 outline-zinc-600" : ""
            }`}
          >
            <span className={`w-24 shrink-0 truncate font-mono ${selectedStep === step.id ? "text-zinc-100" : "text-zinc-500"}`} title={step.id}>
              {step.id}
            </span>
            <span className="w-14 shrink-0 text-zinc-400" title={term("stepKind", step.kind).meaning}>
              {term("stepKind", step.kind).word}
            </span>
            {step.kind === "call" && line?.triggerInput === (step.name ?? step.id) && (
              <span className="text-zinc-300" title="This Line's trigger input: the step reads the Capture whose landing started the run">
                reads the landing
              </span>
            )}
            {step.contracts.map((contract) => (
              <NamedRef key={contract} kind="contract" name={contract} />
            ))}
            {step.logicalSource && (
              <span className="text-zinc-500">
                from <LogicalSourceText view={step} parameters={line?.parameters} />
              </span>
            )}
            {step.slot && <span className="text-zinc-500">slot <span className="font-mono">{step.slot}</span></span>}
            {step.query && <NamedRef kind="query" name={step.query} />}
            {step.claimTypes.map((claimType) => (
              <NamedRef key={claimType} kind="claim_type" name={claimType} />
            ))}
            {step.procedure && <NamedRef kind="procedure" name={step.procedure} />}
            {step.detail && <span className="font-mono text-zinc-400">{step.detail}</span>}
          </li>
        ))}
      </ol>
    </Panel>
  );
}

/** A Line as authored: parameters, trigger input, bindings; what it retains and reads. */
export function LineDefinitionPanel({
  line,
  retains,
  triggers,
}: {
  line: LineDefinition;
  retains: readonly Retention[];
  triggers: readonly LandingTrigger[];
}) {
  const parameters = Object.entries(line.parameters);
  const bindings = Object.values(line.bindings);
  // A landing-fed call reads the Capture that landed: it is a source row too.
  const rows: SourceRow[] = [
    ...(line.triggerInput && line.triggerContract
      ? [{ key: "landing", landing: true, url: null, source: null, given: null, emitted: false, maxBytes: null, contract: line.triggerContract, provider: bindings.length === 1 ? bindings[0]! : null }]
      : []),
    ...retains.map((r, i) => ({ key: String(i), landing: false, ...r })),
  ];
  return (
    <Panel title="Line definition">
      <DataTable rows={rows} columns={SOURCE_COLUMNS} rowKey={(row) => row.key} label="Sources" toolbar={false} maxHeight="none" empty="No source" />
      {triggers.length > 0 && (
        <div className="mt-2 space-y-0.5 text-[12px] text-zinc-400">
          {triggers.map((t) => (
            <div key={t.name}>
              <span className="t-meta mr-2">Starts on</span>
              <RefLink value={`Trigger:${t.name}`}>
                <span className="font-mono">{t.name}</span>
              </RefLink>
              {" · "}
              <ContractShort name={t.contract} />
              {" · "}
              <span className="font-mono">{t.logicalSources.length ? t.logicalSources.join(", ") : "any source"}</span>
            </div>
          ))}
        </div>
      )}
      {parameters.length > 0 && (
        <details className="mt-2 text-[12px]">
          <summary className="cursor-pointer text-zinc-500 hover:text-zinc-300">Parameters ({parameters.length})</summary>
          <dl className="mt-1 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-3 gap-y-0.5">
            {parameters.map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="font-mono text-zinc-500">{key}</dt>
                <dd className="break-all font-mono text-zinc-300">{typeof value === "string" ? value : JSON.stringify(value)}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </Panel>
  );
}

type SourceRow = Pick<Retention, "url" | "source" | "given" | "emitted" | "maxBytes" | "contract" | "provider"> & { key: string; landing: boolean };

/** A CaptureKind by its short name (`kev-catalog`), linking its page; the full name on hover. */
function ContractShort({ name }: { name: string }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const bare = name.replace(/^CaptureContract:/, "");
  return (
    <Link to={link(`/i/${instanceId}/contracts/${encodeURIComponent(bare)}`)} title={`CaptureKind ${bare}`} className="font-mono text-zinc-200 hover:text-white hover:underline">
      {shortName(bare)}
    </Link>
  );
}

const SOURCE_COLUMNS: Column<SourceRow>[] = [
  {
    id: "source",
    header: "Source",
    cell: (r) => {
      const host = hostOf(r.url);
      if (r.landing) return <span title="The Capture whose landing started the run">landing</span>;
      if (r.emitted) return <span title="The run's own output">output</span>;
      if (host && r.url) return <Parts parts={[{ text: host, href: r.url, title: r.url }]} />;
      if (r.source) return <span className="font-mono">{r.source}</span>;
      return <span className="font-mono text-zinc-500">{r.given ? `$params.${r.given}` : "—"}</span>;
    },
  },
  { id: "limit", header: "Limit", className: "whitespace-nowrap", cell: (r) => (r.maxBytes !== null ? <span title={`${r.maxBytes.toLocaleString()} bytes`}>{bytesWords(r.maxBytes)}</span> : <span className="text-zinc-600">—</span>) },
  {
    id: "kept",
    header: "Kept as",
    cell: (r) => (
      <span title={r.source ? `logical source ${r.source}` : undefined}>
        <ContractShort name={r.contract} />
      </span>
    ),
  },
  {
    id: "provider",
    header: "Provider",
    cell: (r) =>
      r.provider ? (
        <RefLink value={`Provider:${r.provider}`}>
          <span className="font-mono text-[12px]" title={r.provider}>
            {providerName(r.provider)}
          </span>
        </RefLink>
      ) : (
        <span className="text-zinc-600">—</span>
      ),
  },
];

type TriggerSchedule = { kind?: unknown; event?: unknown; cron?: unknown; expression?: unknown; every?: unknown };

/** A Trigger card's schedule: a landing's contract and logical sources, or its timing, and the Line it starts. */
export function TriggerDefinition({ schedule, target }: { schedule: Record<string, unknown>; target: string }) {
  const s = schedule as TriggerSchedule;
  const event = (typeof s.event === "object" && s.event !== null ? s.event : {}) as {
    capture_contract_identity?: { name?: unknown };
    logical_sources?: unknown;
  };
  const contract = typeof event.capture_contract_identity?.name === "string" ? event.capture_contract_identity.name : null;
  const sources = Array.isArray(event.logical_sources) ? event.logical_sources.filter((x): x is string => typeof x === "string") : [];
  const cron = typeof s.expression === "string" ? s.expression : typeof s.cron === "string" ? s.cron : null;
  const instanceId = useInstanceId();
  const link = useAtLink();
  const fields: FieldItem[] = [
    { key: "fires", label: "Fires", value: <span className="text-zinc-300">{typeof s.kind === "string" ? sentence(s.kind.replaceAll("_", " ")) : "—"}</span> },
    ...(contract
      ? [
          { key: "contract", label: "On a landing under", value: <NamedRef kind="contract" name={contract} /> },
          {
            key: "sources",
            label: "Logical sources",
            labelTitle: "The logical sources whose landings fire it; none: any landing under the contract",
            value: <span className="font-mono text-zinc-200">{sources.length ? sources.join(", ") : <span className="font-sans text-zinc-500">Any</span>}</span>,
          },
        ]
      : []),
    ...(cron !== null
      ? [
          {
            key: "schedule",
            label: "Schedule",
            value: (
              <span className="text-zinc-300">
                {sentence(localCronWords(cron))} <span className="font-mono text-zinc-500" title="as defined, in UTC">({cron} UTC)</span>
              </span>
            ),
          },
        ]
      : []),
    {
      key: "starts",
      label: "Starts",
      value: target.startsWith("Line:") ? (
        <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(target.slice(5))}`)} className="font-mono text-zinc-200 hover:underline">
          {target.slice(5)}
        </Link>
      ) : (
        <span className="font-mono text-zinc-300">{target}</span>
      ),
    },
  ];
  return (
    <Panel title="Definition">
      <FieldList labels="words" label="Definition" fields={fields} />
    </Panel>
  );
}

/**
 * A Procedure page's definition: its graph, then its definition panel. A
 * step picked on the graph is highlighted (and scrolled to) in the panel.
 */
export function ProcedureWithGraph({ spec }: { spec: ProcedureSpec }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <Panel title="Steps" meta={<span>Arrow: reads · dashed: guard's other branch</span>}>
        <ProcedureGraph spec={spec} onSelectStep={setSelected} />
      </Panel>
      <ProcedureDefinition spec={spec} selectedStep={selected} />
    </>
  );
}

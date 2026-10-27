import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInstanceId, useInterfaces } from "@/api/hooks";
import { SignalDot } from "@/components/Chip";
import { Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { Table, Td, Th, trClass } from "@/components/Table";
import { useAtLink } from "@/lib/at";
import {
  interfaceBase,
  procedureSlots,
  slotInterfaceRef,
  stepView,
  type LandingTrigger,
  type LineDefinition,
  type ProcedureSpec,
  type Retention,
  type StepView,
} from "@/lib/definitions";
import { providerName } from "@/lib/ontology";
import { term } from "@/lib/vocabulary";
import { cronWords } from "@/lib/procedure-graph";
import { sentence } from "@/lib/text";
import { ProcedureGraph } from "@/components/graph/ProcedureGraph";

/**
 * Definitions as authored (compiler revision 36): a slotted Procedure's
 * slots (slot -> interface, the build that binds it) and steps, each naming
 * the contracts, interfaces, queries and ClaimTypes it uses by name; a Line's
 * parameters, trigger input and bindings; a landing Trigger's contract and
 * logical sources. Every named reference is a link.
 */

function NamedRef({ kind, name }: { kind: "contract" | "query" | "interface" | "claim_type" | "procedure"; name: string }) {
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
      : kind === "interface"
        ? `ProviderInterface:${name}`
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
  const value = parameters?.[ref.input];
  return (
    <span>
      <span className="font-mono text-zinc-400">$input.{ref.input}</span>
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
 * A Procedure's authored form: slots and the build each binds (a Line's
 * explicit binding, else the installed builds of the interface: one binds by
 * fit), and its steps with what each names.
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
  const interfaces = useInterfaces();
  const rows = useRef(new Map<string, HTMLLIElement>());
  useEffect(() => {
    if (selectedStep === null) return;
    rows.current.get(selectedStep)?.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
  }, [selectedStep]);
  const builds = new Map((interfaces.data?.rows ?? []).map((row) => [row.name, (row.providers ?? []).map((p) => p.provider)] as const));
  const slots = procedureSlots(spec);
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
              {typeof (field as { type?: unknown })?.type === "string" && (
                <span className="text-zinc-500">: {(field as { type: string }).type}</span>
              )}
            </span>
          ))}
        </div>
      )}
      {slots.length > 0 && (
        <Table>
          <thead>
            <tr>
              <Th title="A slot is a Provider seat a step calls through; it takes an interface at a major version">Slot</Th>
              <Th>Interface</Th>
              <Th title="A Line binds a slot explicitly, or the slot binds by fit to the installed build of its interface">Binds</Th>
            </tr>
          </thead>
          <tbody>
            {slots.map(({ slot, interface: iface }) => {
              const explicit = line?.bindings[slot];
              const installed = builds.get(interfaceBase(iface)) ?? [];
              return (
                <tr key={slot} className={trClass}>
                  <Td className="font-mono text-zinc-200">{slot}</Td>
                  <Td>
                    <RefLink value={slotInterfaceRef(iface)}>
                      <span className="font-mono text-[12px]">{iface}</span>
                    </RefLink>
                  </Td>
                  <Td className="text-[12px] text-zinc-400">
                    {explicit ? (
                      <span>
                        Line binds{" "}
                        <RefLink value={`Provider:${explicit}`}>
                          <span className="font-mono text-[12px]" title={explicit}>{providerName(explicit)}</span>
                        </RefLink>
                      </span>
                    ) : installed.length === 1 ? (
                      <span title="No explicit binding: the slot binds by fit to the one installed build of its interface">
                        By fit:{" "}
                        <RefLink value={installed[0]!.startsWith("Provider:") ? installed[0]! : `Provider:${installed[0]}`}>
                          <span className="font-mono text-[12px]" title={installed[0]}>{providerName(installed[0]!)}</span>
                        </RefLink>
                      </span>
                    ) : installed.length > 1 ? (
                      <span title={installed.join("\n")}>By fit: one of {installed.length} installed builds</span>
                    ) : interfaces.isPending ? (
                      "…"
                    ) : (
                      <span className="inline-flex items-baseline gap-1.5">
                        <SignalDot signal="wrong" title="No installed build fits this slot: install a Provider for its interface" />
                        No installed build
                      </span>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
            {step.kind === "source" && line?.triggerInput === step.name && (
              <span className="text-zinc-300" title="This Line's trigger input: the step reads the Capture whose landing started the run">
                reads the landing
              </span>
            )}
            {step.contract && <NamedRef kind="contract" name={step.contract} />}
            {step.logicalSource && (
              <span className="text-zinc-500">
                from <LogicalSourceText view={step} parameters={line?.parameters} />
              </span>
            )}
            {step.interface && (
              <span className="text-zinc-500">
                via <NamedRef kind="interface" name={step.interface} />
                {step.slot && <span> (slot {step.slot})</span>}
              </span>
            )}
            {step.query && <NamedRef kind="query" name={step.query} />}
            {step.claimType && <NamedRef kind="claim_type" name={step.claimType} />}
            {step.procedure && <NamedRef kind="procedure" name={step.procedure} />}
            {step.detail && <span className="font-mono text-zinc-400">{step.detail}</span>}
          </li>
        ))}
      </ol>
    </Panel>
  );
}

/** A Line as authored: parameters, trigger input, bindings, acquisition policy; what it retains and reads. */
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
  const bindings = Object.entries(line.bindings);
  return (
    <Panel title="Line definition">
      <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1 text-[13px]">
        <dt className="text-zinc-500">Parameters</dt>
        <dd className="min-w-0 break-words text-zinc-300">
          {parameters.length === 0 && <span className="text-zinc-600">None</span>}
          {parameters.map(([key, value]) => (
            <div key={key}>
              <span className="font-mono text-zinc-400">{key}</span> ={" "}
              <span className="font-mono text-zinc-200">{typeof value === "string" ? value : JSON.stringify(value)}</span>
            </div>
          ))}
        </dd>
        <dt className="text-zinc-500" title="The source step that reads the Capture whose landing started the run">
          Trigger input
        </dt>
        <dd className="text-zinc-300">
          {line.triggerInput ? (
            <span>
              Step <span className="font-mono">{line.triggerInput}</span>
              {line.triggerContract && (
                <span>
                  {" "}
                  reads <NamedRef kind="contract" name={line.triggerContract} />
                </span>
              )}
            </span>
          ) : (
            <span className="text-zinc-600">None</span>
          )}
        </dd>
        <dt className="text-zinc-500">Bindings</dt>
        <dd className="text-zinc-300">
          {bindings.length === 0 ? (
            <span className="text-zinc-500">None: every slot binds by fit</span>
          ) : (
            bindings.map(([slot, provider]) => (
              <div key={slot}>
                <span className="font-mono text-zinc-400">{slot}</span> →{" "}
                <RefLink value={`Provider:${provider}`}>
                  <span className="font-mono text-[12px]" title={provider}>{providerName(provider)}</span>
                </RefLink>
              </div>
            ))
          )}
        </dd>
        {line.acquisitionPolicy && (
          <>
            <dt className="text-zinc-500">Acquisition policy</dt>
            <dd className="font-mono text-zinc-300">{line.acquisitionPolicy}</dd>
          </>
        )}
        <dt className="text-zinc-500">Retains</dt>
        <dd className="text-zinc-300">
          {retains.length === 0 && <span className="text-zinc-600">Nothing</span>}
          {retains.map((r, i) => (
            <div key={i}>
              {r.source ? <span className="font-mono text-zinc-200">{r.source}</span> : <span className="text-zinc-500">{r.emitted ? "Its output" : "A source its Provider names"}</span>}{" "}
              <span className="text-zinc-500">under</span> <NamedRef kind="contract" name={r.contract} />
            </div>
          ))}
        </dd>
        {triggers.length > 0 && (
          <>
            <dt className="text-zinc-500">Starts on</dt>
            <dd className="text-zinc-300">
              {triggers.map((t) => (
                <div key={t.name}>
                  <RefLink value={`Trigger:${t.name}`}>
                    <span className="font-mono text-[12px]">{t.name}</span>
                  </RefLink>{" "}
                  <span className="text-zinc-500">a landing under</span> <NamedRef kind="contract" name={t.contract} />{" "}
                  <span className="text-zinc-500">{t.logicalSources.length ? `from ${t.logicalSources.join(", ")}` : "from any source"}</span>
                </div>
              ))}
            </dd>
          </>
        )}
      </dl>
    </Panel>
  );
}

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
  return (
    <Panel title="Definition">
      <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1 text-[13px]">
        <dt className="text-zinc-500">Fires</dt>
        <dd className="text-zinc-300">{typeof s.kind === "string" ? sentence(s.kind.replaceAll("_", " ")) : "—"}</dd>
        {contract && (
          <>
            <dt className="text-zinc-500">On a landing under</dt>
            <dd>
              <NamedRef kind="contract" name={contract} />
            </dd>
            <dt className="text-zinc-500" title="The logical sources whose landings fire it; none: any landing under the contract">
              Logical sources
            </dt>
            <dd className="font-mono text-zinc-200">{sources.length ? sources.join(", ") : <span className="font-sans text-zinc-500">Any</span>}</dd>
          </>
        )}
        {cron !== null && (
          <>
            <dt className="text-zinc-500">Schedule</dt>
            <dd className="text-zinc-300">
              {sentence(cronWords(cron))} <span className="font-mono text-zinc-500">({cron})</span>
            </dd>
          </>
        )}
        <dt className="text-zinc-500">Starts</dt>
        <dd>
          {target.startsWith("Line:") ? (
            <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(target.slice(5))}`)} className="font-mono text-zinc-200 hover:underline">
              {target.slice(5)}
            </Link>
          ) : (
            <span className="font-mono text-zinc-300">{target}</span>
          )}
        </dd>
      </dl>
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
      <Panel title="Steps" meta={<span>Arrows: what each step reads · dashed: where a guard goes otherwise · click a step to follow it</span>}>
        <ProcedureGraph spec={spec} onSelectStep={setSelected} />
      </Panel>
      <ProcedureDefinition spec={spec} selectedStep={selected} />
    </>
  );
}

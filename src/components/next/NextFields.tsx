/** How a `next` row's detail fields and repair read (the Next table's cells and group lines). */
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { NextItem, NextRepair } from "@/api/schemas";
import { useInstanceId } from "@/api/hooks";
import { actionChipClass } from "@/components/Chip";
import { InfoButton } from "@/components/InfoButton";
import { LongText } from "@/components/LongText";
import { RefLink } from "@/components/RefLink";
import { CopyButton } from "@/components/ShortId";
import { useAtLink } from "@/lib/at";
import { parseRef, refRoute } from "@/lib/cruxible-ref";
import { captureHandle, type FieldSpec } from "@/lib/next-reasons";
import { consoleStep, inboxSearch, repairForms, type ConsoleStep } from "@/lib/repair-tools";
import { formatDateTime, formatWhen, humanize } from "@/lib/text";

const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

export function FieldValue({ spec, value }: { spec: FieldSpec; value: unknown }) {
  // core's own sentence, as written (only kept when it adds to the row: see splitDetail)
  if (spec.kind === "prose" && typeof value === "string") return <LongText text={value} lines={2} className="text-zinc-400" />;
  if (spec.kind === "time" && typeof value === "string") {
    return <span title={formatDateTime(value)}>{formatWhen(value)}</span>;
  }
  if (spec.kind === "capture" && typeof value === "string") return <RefLink value={captureHandle(value)} />;
  if (spec.kind === "cause" && typeof value === "object" && value !== null && !Array.isArray(value)) {
    // A failed run's cause: what the Provider said (code, error kind, message) at the node that failed.
    const cause = value as { node_id?: unknown; provider_code?: unknown; kind?: unknown; message?: unknown };
    return (
      <span>
        {typeof cause.node_id === "string" && <span className="font-mono text-zinc-500">{cause.node_id}: </span>}
        {typeof cause.provider_code === "string" && <span className="font-mono">{cause.provider_code}</span>}
        {typeof cause.kind === "string" && <span className="text-zinc-500"> ({cause.kind})</span>}
        {typeof cause.message === "string" && cause.message && <span> {cause.message}</span>}
      </span>
    );
  }
  if ((spec.kind === "claim" || spec.kind === "ref" || spec.kind === "run") && typeof value === "string") {
    return parseRef(value) ? <RefLink value={value} short /> : <span className="font-mono">{value}</span>;
  }
  if (spec.kind === "digest" && typeof value === "string") {
    return (
      <span className="font-mono text-zinc-500" title={value}>
        {value.slice(0, 19)}…
      </span>
    );
  }
  if (spec.kind === "source" && typeof value === "object" && value !== null && typeof (value as { identity?: unknown }).identity === "string") {
    return <span className="font-mono">{(value as { identity: string }).identity}</span>;
  }
  if (spec.kind === "count" && typeof value === "number") return <span className="tabular-nums text-zinc-200">{value.toLocaleString()}</span>;
  if (spec.kind === "words" && typeof value === "string") return <span>{value.replaceAll("_", " ")}</span>;
  if (Array.isArray(value)) {
    return (
      <span className="inline-flex flex-wrap gap-x-2">
        {value.slice(0, 8).map((item, i) => (
          <span key={i}>
            {typeof item === "object" && item !== null && !Array.isArray(item) && typeof (item as { capture_digest?: unknown }).capture_digest !== "string" && identityOf(item as Record<string, unknown>) ? (
              // an entry naming a ref (an input Claim, a backing): the ref, linked; the rest on More detail
              <RefLink value={identityOf(item as Record<string, unknown>)!} short />
            ) : typeof item === "object" && item !== null && typeof (item as { capture_digest?: unknown }).capture_digest === "string" ? (
              <span>
                <RefLink value={captureHandle((item as { capture_digest: string }).capture_digest)} />
                {typeof (item as { expires_at?: unknown }).expires_at === "string" && (
                  <span className="text-zinc-500"> expires {formatWhen((item as { expires_at: string }).expires_at)}</span>
                )}
              </span>
            ) : typeof item === "string" ? (
              spec.key.includes("capture") ? <RefLink value={captureHandle(item)} /> : parseRef(item) ? <RefLink value={item} short /> : <span className="font-mono">{item}</span>
            ) : (
              <code className="font-mono text-[11px] text-zinc-500">{JSON.stringify(item)}</code>
            )}
          </span>
        ))}
        {value.length > 8 && <span className="text-zinc-500">+{value.length - 8}</span>}
      </span>
    );
  }
  // an object of times only (a window: starts_at, ends_at) reads as its range
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const times = Object.values(value);
    if (times.length > 0 && times.every((v) => typeof v === "string" && ISO_TIME.test(v))) {
      return <span title={(times as string[]).map(formatDateTime).join(" – ")}>{(times as string[]).map((v) => formatWhen(v)).join(" – ")}</span>;
    }
  }
  if (typeof value === "object" && value !== null) {
    return <code className="font-mono text-[11px] text-zinc-500">{JSON.stringify(value)}</code>;
  }
  return <span>{String(value)}</span>;
}

type Requirement = NonNullable<NextItem["repair_requires"]>;

/** The ref a list entry names: its first `*_identity` field that reads as a ref. */
function identityOf(entry: Record<string, unknown>): string | null {
  for (const [key, value] of Object.entries(entry)) {
    if ((key === "identity" || key.endsWith("_identity")) && typeof value === "string" && parseRef(value)) return value;
  }
  return null;
}

/**
 * A row's repair. The step the console itself can show comes first (a read:
 * Open in Inbox, Open the ref); else, when the caller cannot run the repair,
 * what running it needs; else the CLI command. The CLI and MCP forms are one
 * line each, mono, cut to the cell with the whole text on hover and a copy
 * button; behind a "CLI / MCP" toggle when something else leads. Other ways
 * to repair (the queue's alternatives) open from "+N other". The console
 * never runs a repair.
 */
export function RepairCell({ item }: { item: NextItem }) {
  const [forms, setForms] = useState(false);
  const [others, setOthers] = useState(false);
  if (!item.repair && !item.repair_requires) return null;
  const step = consoleStep(item.repair);
  const requirement = item.repair_requires ?? null;
  const { cli, served, mcp } = repairForms(item.repair, requirement, item.subject_identity);
  const handEdit = (item.repair?.operation ?? requirement?.operation) === "hand_edit";
  const alternatives = item.repair?.alternatives ?? [];
  const leads = step !== null || requirement !== null;
  const changes = item.repair?.required_change ? <InfoButton label="What the repair changes">{humanize(item.repair.required_change)}</InfoButton> : null;
  const formLines = (
    <>
      {cli && <FormLine label="CLI" text={cli} title={served ? undefined : "The command path; the arguments are the row's"} />}
      {mcp && <FormLine label="MCP" text={mcp} />}
    </>
  );
  return (
    <div className="flex w-full max-w-[20rem] min-w-[11rem] flex-col gap-1 text-[12px] xl:min-w-[15rem]">
      {cli && !leads ? (
        <>
          {/* the CLI leads: its line ends in the ⓘ; the MCP line keeps its copy button in the same column */}
          <FormLine label="CLI" text={cli} title={served ? undefined : "The command path; the arguments are the row's"} trailing={changes} />
          {mcp && <FormLine label="MCP" text={mcp} trailing={changes && <span aria-hidden className="w-3.5 shrink-0" />} />}
        </>
      ) : (
        <>
          <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            {step ? <ConsoleStepLink step={step} /> : requirement ? <RequirementText requirement={requirement} /> : handEdit ? <span className="text-zinc-300">Edit by hand</span> : null}
            {changes}
            {leads && (cli || mcp) && (
              <button type="button" onClick={() => setForms((v) => !v)} aria-expanded={forms} className="whitespace-nowrap text-[11px] text-zinc-500 hover:text-zinc-200">
                CLI / MCP
              </button>
            )}
          </span>
          {forms && formLines}
        </>
      )}
      {alternatives.length > 0 && (
        <span>
          <button type="button" onClick={() => setOthers((v) => !v)} aria-expanded={others} className="text-[11px] text-zinc-500 hover:text-zinc-200">
            +{alternatives.length} other
          </button>
          {others && (
            <span className="mt-1 flex flex-col gap-1 border-l border-zinc-800 pl-2">
              {alternatives.map((alt, i) => (
                <Alternative key={i} alt={alt} subject={item.subject_identity} />
              ))}
            </span>
          )}
        </span>
      )}
    </div>
  );
}

/** One alternative repair: what it changes, then its CLI form. */
function Alternative({ alt, subject }: { alt: NextRepair; subject: string }) {
  const { cli, served } = repairForms(alt, null, subject);
  return (
    <span className="flex min-w-0 flex-col">
      <span className="text-zinc-400">{humanize(alt.required_change)}</span>
      {cli ? <FormLine label="CLI" text={cli} title={served ? undefined : "The command path; the arguments are the row's"} /> : <span className="text-zinc-500">Edit by hand</span>}
    </span>
  );
}

/**
 * One form of a repair on one line: a quiet label, the text cut to the cell
 * (whole on hover), copy. The text has no minimum width of its own (w-0
 * flex-1), so a narrow table cuts it instead of growing past the panel.
 */
function FormLine({ label, text, title, trailing }: { label: string; text: string; title?: string | undefined; trailing?: ReactNode }) {
  return (
    <span className="flex w-full min-w-0 items-center gap-1.5">
      <span className="w-7 shrink-0 text-[11px] text-zinc-600">{label}</span>
      <code className="w-0 min-w-0 flex-1 truncate font-mono text-[11px] text-zinc-300" title={title ? `${text}\n${title}` : text}>
        {text}
      </code>
      <CopyButton value={text} />
      {trailing}
    </span>
  );
}

/** The console page that shows what a read repair reads. */
function ConsoleStepLink({ step }: { step: ConsoleStep }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  if (step.kind === "inbox") {
    return (
      <Link to={link(`/i/${instanceId}/inbox${inboxSearch(step)}`)} className={`whitespace-nowrap ${actionChipClass}`}>
        Open in Inbox
      </Link>
    );
  }
  const ref = parseRef(step.ref);
  const route = ref ? refRoute(instanceId, ref) : null;
  if (!route) return null;
  const colon = step.ref.indexOf(":");
  return (
    <Link to={link(route)} className={`whitespace-nowrap ${actionChipClass}`} title={step.ref}>
      Open {colon > 0 ? step.ref.slice(0, colon) : step.ref}
    </Link>
  );
}

/** What running a withheld repair needs, tersely; the gates in words on the ⓘ. */
function RequirementText({ requirement }: { requirement: Requirement }) {
  const short = requirement.because.includes("author") ? "Author only" : `Needs ${requirement.because.map((gate) => GATE_WORDS[gate](requirement)).join(" and ")}`;
  return (
    <span className="inline-flex items-baseline gap-1.5 text-zinc-400">
      {short}
      <InfoButton label="Why the repair is withheld">
        Running it needs {requirement.because.map((gate) => (gate === "tier" ? `${GATE_WORDS.tier(requirement)} access` : GATE_WORDS[gate](requirement))).join(" and ")}. The console reads without that, so the queue withholds the command; CLI / MCP name the command path and tool.
        {requirement.authoring_refusal && <> {requirement.authoring_refusal.detail}</>}
      </InfoButton>
    </span>
  );
}

const GATE_WORDS: Record<Requirement["because"][number], (r: Requirement) => string> = {
  tier: (r) => humanize(r.tier).toLowerCase(),
  profile: (r) => `the ${r.profile ?? "full"} MCP tool profile`,
  authoring: () => "a principal that can author",
  author: () => "the proposal's author",
};

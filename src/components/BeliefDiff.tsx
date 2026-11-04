import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import type { Schemas } from "@/api/schemas";
import { ChangeMark, SignalDot, toggleChipClass } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { FieldList, type FieldItem } from "@/components/FieldList";
import { PanelGroup, PanelHeading } from "@/components/graph/PanelBits";
import { Disclosure } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { Stat } from "@/components/StatsRow";
import { claimObjectValue, noneOf } from "@/lib/claim-value";
import { parseRef } from "@/lib/cruxible-ref";
import { captureHandle } from "@/lib/next-reasons";
import {
  changeKindOf,
  claimEvidence,
  claimIdOfPath,
  columnLabels,
  fieldName,
  GROUP_BY,
  groupDiff,
  recordKeyText,
  valueText,
  type BeliefCell,
  type BeliefChange,
  type BeliefDiff,
  type ChangeKind,
  type DiffSection,
  type GroupBy,
  type SubjectRow,
} from "@/lib/proposal-diff";
import { formatDateTime, formatWhen } from "@/lib/text";
import { DeltaTable } from "@/components/StoredFields";

type Member = Schemas["ReviewedMember"];
type CaptureCard = Schemas["GetCaptureCard"];
type ItemReason = Schemas["ProposalItemReason"];

/** Subject rows per grid page. */
export const GRID_PAGE = 100;

const GROUP_WORD: Record<GroupBy, string> = { subject: "Subject", capture: "Capture", "claim-type": "ClaimType", change: "Change kind" };
const KIND_WORD: Record<ChangeKind, string> = { new: "new", revised: "revised", retired: "retired" };
const KIND_DISPOSITION: Record<ChangeKind, string> = { new: "create", revised: "revise", retired: "retire" };

/** What the grid and its panel read besides the review: Capture cards by digest, rationales by member path. */
export interface DiffContext {
  captures: ReadonlyMap<string, CaptureCard>;
  reasons: ReadonlyMap<string, ItemReason>;
  /** The proposal was accepted: its Claims have pages. */
  accepted: boolean;
}

const cellKey = (subject: string, claimType: string) => `${subject}|${claimType}`;

/**
 * The belief diff: counts by change kind, a Group by control, then the grid
 * (one row per Subject, one column per ClaimType) in one section or one per
 * Capture, ClaimType or change kind. A cell opens a side panel (the Type map
 * panel's shape) with the change, its evidence and rationale.
 */
export function BeliefDiffView({ diff, context }: { diff: BeliefDiff; context: DiffContext }) {
  const [params, setParams] = useSearchParams();
  const groupParam = params.get("group");
  const by: GroupBy = GROUP_BY.includes(groupParam as GroupBy) ? (groupParam as GroupBy) : "subject";
  const open = params.get("cell");
  const setParam = (name: string, value: string | null) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (value === null) next.delete(name);
        else next.set(name, value);
        return next;
      },
      { replace: true },
    );
  const sections = useMemo(() => groupDiff(diff, by), [diff, by]);
  const labels = useMemo(() => columnLabels(diff.claimTypes, diff.rows), [diff]);
  const selected = useMemo(() => {
    if (!open) return null;
    const [subject, claimType] = [open.slice(0, open.lastIndexOf("|")), open.slice(open.lastIndexOf("|") + 1)];
    const cell = diff.rows.find((r) => r.subject === subject)?.cells[claimType];
    return cell ?? null;
  }, [open, diff]);

  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setParam("cell", null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div className="flex flex-wrap items-baseline gap-x-4 text-[13px] text-zinc-500">
          {(["new", "revised", "retired"] as const)
            .filter((k) => diff.counts[k] > 0)
            .map((k) => (
              <span key={k} className="inline-flex items-baseline gap-1.5">
                <ChangeMark change={KIND_DISPOSITION[k]} />
                <Stat n={diff.counts[k]} label={KIND_WORD[k]} />
              </span>
            ))}
          {diff.subjectCounts.new > 0 && <Stat n={diff.subjectCounts.new} label={diff.subjectCounts.new === 1 ? "new Subject" : "new Subjects"} />}
          {diff.subjectCounts.retired > 0 && (
            <Stat n={diff.subjectCounts.retired} label={diff.subjectCounts.retired === 1 ? "retired Subject" : "retired Subjects"} />
          )}
        </div>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Group by">
          <span className="t-meta mr-1">Group by</span>
          {GROUP_BY.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={by === g}
              onClick={() => setParam("group", g === "subject" ? null : g)}
              className={toggleChipClass(by === g)}
            >
              {GROUP_WORD[g]}
            </button>
          ))}
        </div>
      </div>
      <div className={selected ? "grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_24rem]" : ""}>
        <div className="min-w-0 space-y-5">
          {sections.map((s, i) => (
            <SectionGrid
              key={`${by}:${s.key}`}
              section={s}
              index={i}
              labels={labels}
              captures={context.captures}
              open={open}
              onOpen={(cell) => setParam("cell", open === cellKey(cell.subject, cell.claimType) ? null : cellKey(cell.subject, cell.claimType))}
            />
          ))}
        </div>
        {selected && (
          <aside
            aria-label="Change detail"
            className="relative border border-zinc-700 bg-zinc-950/95 p-3 lg:sticky lg:top-3 lg:max-h-[calc(100vh-1.5rem)] lg:overflow-y-auto"
          >
            <button onClick={() => setParam("cell", null)} title="Close (Esc)" aria-label="Close" className="absolute right-2 top-2 p-0.5 text-zinc-500 hover:text-zinc-200">
              <X className="h-3.5 w-3.5" />
            </button>
            <CellPanel key={open ?? ""} cell={selected} label={labels.get(selected.claimType) ?? selected.claimType} context={context} subjectMember={diff.rows.find((r) => r.subject === selected.subject)?.subjectMember ?? null} />
          </aside>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ section, captures }: { section: DiffSection; captures: ReadonlyMap<string, CaptureCard> }) {
  const count = (
    <span className="t-meta">
      {section.count} {section.count === 1 ? "change" : "changes"}
    </span>
  );
  if (section.by === "capture") {
    if (section.key === "") return <SectionLine>No Capture cited {count}</SectionLine>;
    const card = captures.get(section.key);
    return (
      <SectionLine>
        <span title={section.key}>
          <RefLink value={captureHandle(section.key)} />
        </span>
        {card?.source && (
          <span className="text-zinc-300" title={card.contract}>
            {card.source}
          </span>
        )}
        {card?.observed_at && (
          <span className="t-meta" title={card.observed_at}>
            observed {formatDateTime(card.observed_at)}
          </span>
        )}
        {count}
      </SectionLine>
    );
  }
  if (section.by === "claim-type") {
    return (
      <SectionLine>
        <ClaimTypeLink name={section.key} />
        {count}
      </SectionLine>
    );
  }
  return (
    <SectionLine>
      <ChangeMark change={KIND_DISPOSITION[section.key as ChangeKind]} />
      <span className="text-zinc-200">{section.key.charAt(0).toUpperCase() + section.key.slice(1)}</span>
      {count}
    </SectionLine>
  );
}

function SectionLine({ children }: { children: ReactNode }) {
  return <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 border-b border-zinc-800 pb-1 text-[13px]">{children}</div>;
}

function SectionGrid({
  section,
  index,
  labels,
  captures,
  open,
  onOpen,
}: {
  section: DiffSection;
  index: number;
  labels: ReadonlyMap<string, string>;
  captures: ReadonlyMap<string, CaptureCard>;
  open: string | null;
  onOpen: (cell: BeliefCell) => void;
}) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(section.rows.length / GRID_PAGE));
  const rows = section.rows.slice(page * GRID_PAGE, (page + 1) * GRID_PAGE);
  // One kind throughout: the Subject column names ids (the kind is the column's header, the full ref on hover).
  const kinds = new Set(section.rows.map((r) => r.subject.split("/")[0]));
  const oneKind = kinds.size === 1 ? ([...kinds][0] ?? null) : null;
  const columns = useMemo<Column<SubjectRow>[]>(
    () => [
      {
        id: "subject",
        header: oneKind ? <span title="Subject kind">{oneKind}</span> : "Subject",
        label: "Subject",
        hideable: false,
        className: "whitespace-nowrap",
        sortValue: (r) => r.subject,
        filter: { kind: "text", text: (r) => r.subject },
        cell: (r) => <SubjectName row={r} idOnly={oneKind} />,
      },
      ...section.claimTypes.map(
        (ct): Column<SubjectRow> => ({
          id: `ct:${ct}`,
          header: <span title={ct}>{labels.get(ct) ?? ct}</span>,
          label: labels.get(ct) ?? ct,
          title: ct,
          headerClassName: "font-mono",
          className: "min-w-[7rem]",
          sortValue: (r) => {
            const cell = r.cells[ct];
            return cell ? cell.changes.map((c) => valueText(c.after ?? c.before)).join(", ") : null;
          },
          cell: (r) => {
            const cell = r.cells[ct];
            if (!cell) return null;
            return <CellButton cell={cell} selected={open === cellKey(cell.subject, cell.claimType)} onOpen={() => onOpen(cell)} />;
          },
        }),
      ),
    ],
    [section.claimTypes, labels, open, onOpen, oneKind],
  );
  const grouped = section.by !== "subject";
  return (
    <div>
      {grouped && <SectionHeader section={section} captures={captures} />}
      <DataTable
        rows={rows}
        columns={columns}
        rowKey={(r) => r.subject}
        label={grouped ? `Changes ${index + 1}` : "Changes"}
        urlKey={grouped ? `g${index}` : "changes"}
        partial={pages > 1 ? `the ${rows.length} on this page` : null}
        toolbar={!grouped || pages > 1}
        {...(grouped ? { maxHeight: "none" } : {})}
        count={<span>{section.rows.length} {section.rows.length === 1 ? "Subject" : "Subjects"}</span>}
        actions={
          pages > 1 ? (
            <span className="t-meta flex items-center gap-2">
              <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="hover:text-zinc-200 disabled:opacity-40">
                ← Previous
              </button>
              <span>
                Page {page + 1} of {pages}
              </span>
              <button disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)} className="hover:text-zinc-200 disabled:opacity-40">
                Next →
              </button>
            </span>
          ) : undefined
        }
      />
    </div>
  );
}

function SubjectName({ row, idOnly }: { row: SubjectRow; idOnly: string | null }) {
  const kind = row.subjectMember ? changeKindOf(row.subjectMember.disposition) : null;
  const ref = parseRef(row.subject);
  return (
    <span className="inline-flex items-baseline gap-2">
      {idOnly && ref?.kind === "subject" ? (
        <span title={row.subject}>
          <RefLink value={row.subject}>
            <span className="font-mono text-[13px]">{ref.subjectId}</span>
          </RefLink>
        </span>
      ) : (
        <RefLink value={row.subject} />
      )}
      {kind === "new" && (
        <span className="text-[11px] text-emerald-400/80" title="This proposal creates the Subject">
          new
        </span>
      )}
      {kind === "retired" && (
        <span className="text-[11px] text-red-400/80" title="This proposal retires the Subject">
          retired
        </span>
      )}
    </span>
  );
}

/**
 * A value as the Subject page shows it (ShownValue), without links: inside a
 * cell the click opens the panel, where the value links.
 */
export function PlainValue({ object }: { object: unknown }) {
  const none = noneOf(object);
  if (none) {
    return (
      <span>
        <span className="text-zinc-500">none of </span>
        {none.of === null ? <span className="text-zinc-500">this slot</span> : <PlainValue object={none.of} />}
      </span>
    );
  }
  const value = claimObjectValue(object);
  if (value === null || value === undefined) return <span className="text-zinc-600">null</span>;
  if (typeof value === "string") {
    const ref = parseRef(value);
    if (ref?.kind === "subject") {
      return (
        <span className="font-mono text-[12.5px]" title={value}>
          {ref.subjectId}
        </span>
      );
    }
    return <span className="break-words">{value}</span>;
  }
  if (typeof value === "number" || typeof value === "boolean") return <span className="font-mono">{String(value)}</span>;
  return <code className="font-mono text-[12px] text-zinc-400">{JSON.stringify(value)}</code>;
}

/** One change in a cell: the new value; old (struck, dimmed) -> new; a struck retired value. */
function ChangeValue({ change }: { change: BeliefChange }) {
  if (change.kind === "retired") {
    return (
      <span className="text-zinc-500 line-through decoration-zinc-500">
        <PlainValue object={change.before} />
      </span>
    );
  }
  if (change.kind === "revised" && change.before !== undefined && valueText(change.before) !== valueText(change.after)) {
    return (
      <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
        <span className="text-zinc-500 line-through decoration-zinc-600">
          <PlainValue object={change.before} />
        </span>
        <span className="text-zinc-600">→</span>
        <span className="text-zinc-100">
          <PlainValue object={change.after} />
        </span>
      </span>
    );
  }
  return (
    <span className="text-zinc-100" title={change.kind === "revised" ? "Revised: same value" : undefined}>
      <PlainValue object={change.after} />
    </span>
  );
}

function CellButton({ cell, selected, onOpen }: { cell: BeliefCell; selected: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-pressed={selected}
      aria-label={`${cell.subject} ${cell.claimType}`}
      className={`-ml-1 block w-[calc(100%+0.25rem)] px-1 text-left text-[13px] leading-5 hover:bg-zinc-800/60 ${selected ? "bg-zinc-800 outline outline-1 outline-zinc-500" : ""}`}
    >
      <span className="flex flex-col gap-0.5">
        {cell.changes.map((change) => (
          <span key={change.member.path}>
            <ChangeValue change={change} />
          </span>
        ))}
      </span>
    </button>
  );
}

const CHANGE_WORD: Record<ChangeKind, string> = { new: "New", revised: "Revised", retired: "Retired" };

/** The opened cell: the change, its evidence in plain terms, the rationale, prior refusals, the stored record. */
function CellPanel({
  cell,
  label,
  context,
  subjectMember,
}: {
  cell: BeliefCell;
  label: string;
  context: DiffContext;
  subjectMember: Member | null;
}) {
  const [index, setIndex] = useState(0);
  const change = cell.changes[Math.min(index, cell.changes.length - 1)]!;
  const parsed = parseRef(cell.subject);
  const subjectId = parsed?.kind === "subject" ? parsed.subjectId : cell.subject;
  const evidence = claimEvidence(change.member);
  const capture = evidence.capture ? context.captures.get(evidence.capture) : undefined;
  const reason = context.reasons.get(change.member.path) ?? (change.replaced ? context.reasons.get(change.replaced.path) : undefined);
  const refusals = [...(change.member.prior_refusals ?? []), ...(change.replaced?.prior_refusals ?? [])];
  const claimId = claimIdOfPath(change.member.path);
  const fields: FieldItem[] = [
    { key: "subject", label: "Subject", value: <ShownValue value={cell.subject} />, status: subjectMember && changeKindOf(subjectMember.disposition) === "new" ? <span className="text-[11px] text-emerald-400/80">new</span> : undefined },
    { key: "claim-type", label: "ClaimType", value: <ClaimTypeLink name={cell.claimType} /> },
    {
      key: "value",
      label: "Value",
      value: change.after === undefined ? <span className="text-zinc-600">—</span> : <ShownValue value={change.after} />,
    },
    {
      key: "before",
      label: "Before",
      value:
        change.before === undefined ? (
          <span className="text-zinc-600">—</span>
        ) : (
          <span className={change.kind === "retired" ? "" : "text-zinc-400"}>
            <ShownValue value={change.before} />
          </span>
        ),
    },
    {
      key: "change",
      label: "Change",
      value: (
        <span className="inline-flex items-baseline gap-1.5">
          <ChangeMark change={KIND_DISPOSITION[change.kind]} />
          {CHANGE_WORD[change.kind]}
        </span>
      ),
    },
    { key: "basis", label: "Basis", value: evidence.basis ?? <span className="text-zinc-600">—</span> },
  ];
  const evidenceFields: FieldItem[] = [
    ...(capture?.source ? [{ key: "source", label: "Source", value: <span title={capture.contract}>{capture.source}</span> }] : []),
    ...(evidence.citations.length > 0
      ? [
          {
            key: "capture",
            label: "Capture",
            value: (
              <span className="flex flex-wrap gap-x-2">
                {evidence.citations.map((c) => (
                  <span key={c.digest} title={[c.digest, c.role, c.origin].filter(Boolean).join(" · ")}>
                    <RefLink value={captureHandle(c.digest)} />
                  </span>
                ))}
              </span>
            ),
          },
        ]
      : []),
    ...(evidence.recordKey
      ? [
          {
            key: "record",
            label: "Record",
            value: (
              <span className="font-mono" title={[JSON.stringify(evidence.recordKey), evidence.recordLocator].filter(Boolean).join(" at ")}>
                {recordKeyText(evidence.recordKey)}
              </span>
            ),
          },
        ]
      : []),
    ...(evidence.fieldPath
      ? [{ key: "field", label: "Field read", value: <span className="font-mono" title={evidence.fieldPath}>{fieldName(evidence.fieldPath)}</span> }]
      : []),
    ...((capture?.observed_at ?? evidence.observedAt)
      ? [
          {
            key: "observed",
            label: "Observed",
            value: <span title={capture?.observed_at ?? evidence.observedAt!}>{formatDateTime(capture?.observed_at ?? evidence.observedAt!)}</span>,
          },
        ]
      : []),
  ];
  return (
    <div>
      <PanelHeading kicker="Claim change" title={`${subjectId} · ${label}`} />
      {cell.changes.length > 1 && (
        <div className="mb-2 flex flex-wrap gap-1" role="tablist" aria-label="Values">
          {cell.changes.map((c, i) => (
            <button key={c.member.path} role="tab" aria-selected={i === index} onClick={() => setIndex(i)} className={toggleChipClass(i === index)}>
              <ChangeValue change={c} />
            </button>
          ))}
        </div>
      )}
      <FieldList density="compact" labels="words" fields={fields} label="Change" />
      {evidenceFields.length > 0 && (
        <PanelGroup title="Evidence">
          <FieldList density="compact" labels="words" fields={evidenceFields} label="Evidence" />
        </PanelGroup>
      )}
      {reason && (
        <PanelGroup title="Rationale">
          <p className="whitespace-pre-line text-[12.5px] leading-5 text-zinc-200">
            {reason.reason}
            {reason.truncated ? "…" : ""}
          </p>
        </PanelGroup>
      )}
      {refusals.length > 0 && (
        <PanelGroup title="Refused before">
          <PriorRefusals refusals={refusals} />
        </PanelGroup>
      )}
      <PanelGroup title="Stored record">
        <div className="space-y-1.5 text-[12px]">
          {context.accepted && claimId && (
            <div>
              <RefLink value={claimId} short />
            </div>
          )}
          {change.replaced && context.accepted && claimIdOfPath(change.replaced.path) && (
            <div className="text-zinc-500">
              replaces <RefLink value={claimIdOfPath(change.replaced.path)!} short />
            </div>
          )}
          <Disclosure label="Stored fields">
            <DeltaTable member={change.member} />
            {change.replaced && <DeltaTable member={change.replaced} />}
          </Disclosure>
        </div>
      </PanelGroup>
    </div>
  );
}

export function PriorRefusals({ refusals }: { refusals: readonly Schemas["PriorRefusalReceipt"][] }) {
  return (
    <div className="space-y-1 text-[12px] text-zinc-300">
      {refusals.map((refusal) => (
        <div key={`${refusal.claim_id}\n${refusal.decided_at}`} className="flex flex-wrap items-baseline gap-x-1.5">
          <SignalDot signal="wrong" title="Refused before" />
          <span className="text-zinc-500">{refusal.kind.replaceAll("_", " ")}</span>
          <RefLink value={refusal.claim_id} short />
          <span className="font-mono text-zinc-400">{refusal.decided_by}</span>
          <span className="text-zinc-500" title={refusal.decided_at}>
            {formatWhen(refusal.decided_at)}
          </span>
          {refusal.rationale && <span className="w-full text-zinc-400">{refusal.rationale}</span>}
        </div>
      ))}
    </div>
  );
}

/** A ClaimType by its full name, linked to its page. */
function ClaimTypeLink({ name }: { name: string }) {
  return (
    <RefLink value={`ClaimType:${name}`}>
      <span className="break-all font-mono text-[12.5px]">{name}</span>
    </RefLink>
  );
}

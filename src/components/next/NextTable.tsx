import { useMemo, useState } from "react";
import type { NextItem, NextSeverity } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { CountsMark } from "@/components/CountsMark";
import { DataTable, useTableState, type Column } from "@/components/DataTable";
import { RefLink } from "@/components/RefLink";
import { FAMILY_LABEL, captureHandle, detailRecord, familyOf, reasonMeta, splitDetail, type FieldSpec } from "@/lib/next-reasons";
import { formatDateTime, formatRelative } from "@/lib/text";
import { term } from "@/lib/vocabulary";
import { FieldValue, RepairText, repairKey } from "./NextFields";

const SEVERITY_RANK: Record<NextSeverity, number> = { blocking: 0, repair: 1, warning: 2, setup: 3 };

interface ReasonShare {
  /** Every row of the reason has the same repair: the group line shows it once. */
  sharedRepair: boolean;
  /** Detail fields with one value across the reason's rows: the group line shows them. */
  common: { spec: FieldSpec; value: unknown }[];
  /** Every row of the reason began at the same time: the group line says since when. */
  sharedSince: boolean;
}

/** Per reason, what its rows share (over every row in hand, so filtering never moves it). */
export function reasonShares(items: readonly NextItem[]): Map<string, ReasonShare> {
  const byReason = new Map<string, NextItem[]>();
  for (const item of items) byReason.set(item.reason, [...(byReason.get(item.reason) ?? []), item]);
  const out = new Map<string, ReasonShare>();
  for (const [reason, rows] of byReason) {
    const sharedRepair = rows.every((row) => repairKey(row) === repairKey(rows[0]!));
    const first = splitDetail(rows[0]!.reason, rows[0]!.detail).fields;
    const common =
      rows.length > 1
        ? first.filter(({ spec, value }) =>
            rows.every((row) => {
              const other = splitDetail(row.reason, row.detail).fields.find((f) => f.spec.key === spec.key);
              return other !== undefined && JSON.stringify(other.value) === JSON.stringify(value);
            }),
          )
        : [];
    const sharedSince = rows.every((row) => (row.since ?? null) === (rows[0]!.since ?? null));
    out.set(reason, { sharedRepair, common, sharedSince });
  }
  return out;
}

/**
 * `next` rows in the shared table: severity, reason, family, what the row is
 * about, the reason's named detail fields, and the repair as text. Unsorted,
 * rows group by severity, then reason (the group line carries the label, the
 * count, and the repair and detail every row of the reason shares); a sort
 * flattens the groups and each row then shows everything. The console never
 * runs a repair.
 *
 * `partial` names the rows when the queue has more pages ("this page of
 * 100"): `next` has no server-side filter or order (gap G7).
 */
export function NextTable({
  items,
  urlKey = "",
  family = true,
  partial = null,
  label = "Next",
  empty = "Nothing on this page.",
}: {
  items: readonly NextItem[];
  urlKey?: string;
  /** Show the Family column (the Beliefs tabs are families already). */
  family?: boolean;
  partial?: string | null;
  label?: string;
  empty?: string;
}) {
  const ordered = useMemo(
    () => [...items].sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]),
    [items],
  );
  const shares = useMemo(() => reasonShares(items), [items]);
  // the columns depend on whether rows are grouped (no sort); read the sort first
  const probe = useMemo(() => nextColumns({ grouped: false, shares, family, items }), [shares, family, items]);
  const [state] = useTableState(probe, urlKey);
  const grouped = state.sort === null;
  const columns = useMemo(() => nextColumns({ grouped, shares, family, items }), [grouped, shares, family, items]);
  return (
    <DataTable
      rows={ordered}
      columns={columns}
      rowKey={(item) => item.item_id}
      urlKey={urlKey}
      label={label}
      partial={partial}
      empty={empty}
      group={{
        key: (item) => `${item.severity}\n${item.reason}`,
        header: (rows) => <GroupLine rows={rows} share={shares.get(rows[0]!.reason)} />,
      }}
    />
  );
}

function GroupLine({ rows, share }: { rows: NextItem[]; share: ReasonShare | undefined }) {
  const first = rows[0]!;
  return (
    <div className="flex flex-wrap items-baseline gap-x-3">
      <Chip concept="severity" value={first.severity} />
      <span className="text-[13px] font-semibold text-zinc-100" title={first.reason}>
        {reasonMeta(first.reason).label}
      </span>
      <span className="font-mono text-[12px] text-zinc-500">{rows.length}</span>
      {(share?.common ?? []).map(({ spec, value }) => (
        <span key={spec.key} className="inline-flex items-baseline gap-1.5 text-[12px]">
          {spec.label && <span className="text-zinc-500">{spec.label}</span>}
          <span className="text-zinc-300">
            <FieldValue spec={spec} value={value} />
          </span>
        </span>
      ))}
      {share?.sharedSince && first.since && <Since iso={first.since} />}
      {share?.sharedRepair && <RepairText item={first} />}
    </div>
  );
}

/**
 * The columns a page needs. Grouped (no sort), the group line carries severity,
 * reason and whatever a reason's rows share, so those columns hide and a
 * column no row fills (related refs, own detail, findings, a per-row repair)
 * is left out; Family and the item id are there to switch on.
 */
function nextColumns({
  grouped,
  shares,
  family,
  items,
}: {
  grouped: boolean;
  shares: Map<string, ReasonShare>;
  family: boolean;
  items: readonly NextItem[];
}): Column<NextItem>[] {
  const anyRelated = items.some((item) => (item.related_identities?.length ?? 0) > 0);
  const anyFindings = items.some((item) => (item.findings?.length ?? 0) > 0);
  const anyDetail = items.some((item) => hasOwnDetail(item, grouped ? shares.get(item.reason) : undefined));
  const anySince = items.some((item) => item.since && !(grouped && shares.get(item.reason)?.sharedSince));
  const anyRepair = items.some((item) => (item.repair || item.repair_requires) && !(grouped && shares.get(item.reason)?.sharedRepair));
  const columns: (Column<NextItem> | null)[] = [
    {
      id: "severity",
      header: "Severity",
      sortValue: (item) => SEVERITY_RANK[item.severity],
      filter: { kind: "enum", values: (item) => [item.severity] },
      options: ["blocking", "repair", "warning", "setup"],
      optionLabel: (value) => term("severity", value).word,
      className: "whitespace-nowrap",
      // grouped: the group line says it
      defaultHidden: grouped,
      cell: (item) => (grouped ? null : <Chip concept="severity" value={item.severity} />),
    },
    {
      id: "reason",
      header: "Reason",
      sortValue: (item) => reasonMeta(item.reason).label,
      filter: { kind: "enum", values: (item) => [item.reason] },
      optionLabel: (value) => reasonMeta(value as NextItem["reason"]).label,
      className: "min-w-[8rem]",
      defaultHidden: grouped,
      cell: (item) =>
        grouped ? null : (
          <span className="text-zinc-100" title={item.reason}>
            {reasonMeta(item.reason).label}
          </span>
        ),
    },
    family
      ? {
          id: "family",
          header: "Family",
          sortValue: (item) => FAMILY_LABEL[familyOf(item.reason)],
          filter: { kind: "enum", values: (item) => [familyOf(item.reason)] },
          optionLabel: (value) => FAMILY_LABEL[value as keyof typeof FAMILY_LABEL] ?? value,
          className: "whitespace-nowrap text-[12px] text-zinc-500",
          defaultHidden: true,
          cell: (item) => FAMILY_LABEL[familyOf(item.reason)],
        }
      : null,
    {
      id: "about",
      header: "Subject",
      title: "The Subject, Claim, Line or proposal the row is about",
      hideable: false,
      sortValue: (item) => item.subject_identity,
      filter: { kind: "text", text: (item) => [item.subject_identity, ...(item.related_identities ?? [])].join(" ") },
      className: "min-w-[15rem] max-w-[24rem] break-words",
      cell: (item) => <RefLink value={item.subject_identity} short />,
    },
    anyRelated
      ? {
          id: "related",
          header: "Related",
          title: "What else the row names: the other side of a conflict, the evidence, the Procedure",
          className: "min-w-[10rem] max-w-[22rem] break-words text-[12px]",
          cell: (item) =>
            (item.related_identities ?? []).map((ref, i) => (
              <span key={ref}>
                {i > 0 && ", "}
                <RefLink value={ref.startsWith("Capture:sha256:") ? captureHandle(ref.slice(8)) : ref} short />
              </span>
            )),
        }
      : null,
    anyDetail
      ? {
          id: "detail",
          header: "Detail",
          filter: { kind: "text", text: (item) => JSON.stringify(item.detail ?? "") },
          cell: (item) => <DetailCell item={item} shared={grouped ? shares.get(item.reason) : undefined} />,
        }
      : null,
    anyFindings
      ? {
          id: "findings",
          header: "Findings",
          title: "Other conditions next found on the same row",
          numeric: true,
          sortValue: (item) => item.findings?.length ?? 0,
          cell: (item) => <FindingsCell item={item} />,
        }
      : null,
    anySince
      ? {
          id: "since",
          header: "Since",
          title: "When the row's condition began, from the state that records it",
          className: "whitespace-nowrap text-[12px]",
          sortValue: (item) => item.since ?? "",
          cell: (item) => (item.since && !(grouped && shares.get(item.reason)?.sharedSince) ? <Since iso={item.since} /> : null),
        }
      : null,
    {
      id: "item",
      header: "Item id",
      defaultHidden: true,
      className: "font-mono text-[11px] text-zinc-500",
      cell: (item) => item.item_id,
    },
    !anyRepair
      ? null
      : {
      id: "repair",
      header: "Repair",
      title: "What to change, and the CLI command; run it from the CLI or MCP (the console is read-only)",
      filter: { kind: "text", text: (item) => [item.repair?.operation, item.repair?.required_change, item.repair?.command].filter(Boolean).join(" ") },
      className: "max-w-[28rem]",
      cell: (item) => (grouped && shares.get(item.reason)?.sharedRepair ? null : <RepairText item={item} />),
    },
  ];
  return columns.filter((column): column is Column<NextItem> => column !== null);
}

/** A row's own detail: the fields its group line does not show, what they imply, and the rest on request. */
function ownDetail(item: NextItem, shared: ReasonShare | undefined) {
  const meta = reasonMeta(item.reason);
  const split = splitDetail(item.reason, item.detail);
  const sharedKeys = new Set((shared?.common ?? []).map(({ spec }) => spec.key));
  // A Claim field naming the row's own subject is already the row's link.
  const fields = split.fields.filter(
    ({ spec, value }) => !sharedKeys.has(spec.key) && !(spec.kind === "claim" && `Claim:${String(value)}` === item.subject_identity),
  );
  const record = detailRecord(item.detail);
  const counts = record && meta.counts ? meta.counts(record) : null;
  return { fields, counts, rest: split.rest };
}

function hasOwnDetail(item: NextItem, shared: ReasonShare | undefined): boolean {
  const own = ownDetail(item, shared);
  return own.fields.length > 0 || own.counts !== null || own.rest !== null;
}

/** Since when a condition holds: relative, the exact time on hover. */
function Since({ iso }: { iso: string }) {
  return (
    <span className="text-[12px] text-zinc-500" title={`Since ${formatDateTime(iso)}`}>
      since {formatRelative(iso)}
    </span>
  );
}

/** Other conditions next found on the row: a count, opening to their reasons. */
function FindingsCell({ item }: { item: NextItem }) {
  const [open, setOpen] = useState(false);
  const findings = item.findings ?? [];
  if (findings.length === 0) return null;
  return (
    <div className="text-[12px]">
      <button onClick={() => setOpen((v) => !v)} className="font-mono text-zinc-300 hover:text-zinc-100" aria-expanded={open}>
        {findings.length}
      </button>
      {open && <div className="t-meta mt-0.5">{findings.map((finding) => reasonMeta(finding.reason).label).join("; ")}</div>}
    </div>
  );
}

function DetailCell({ item, shared }: { item: NextItem; shared: ReasonShare | undefined }) {
  const [raw, setRaw] = useState(false);
  const { fields, counts, rest } = ownDetail(item, shared);
  const split = { rest };
  return (
    <div className="min-w-0 text-[12px]">
      <span className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-0.5">
        {fields.map(({ spec, value }) => (
          <span key={spec.key} className="inline-flex items-baseline gap-1.5">
            {spec.label && <span className="text-zinc-500">{spec.label}</span>}
            <span className="text-zinc-300">
              <FieldValue spec={spec} value={value} />
            </span>
          </span>
        ))}
        {counts && <CountsMark counts={counts.counts} reason={counts.reason} />}
        {split.rest !== null && (
          <button onClick={() => setRaw((v) => !v)} className="whitespace-nowrap text-zinc-500 hover:text-zinc-200" aria-expanded={raw}>
            {raw ? "Hide detail" : "More detail"}
          </button>
        )}
      </span>
      {raw && split.rest !== null && (
        <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap border-l border-zinc-800 pl-3 text-[11px] text-zinc-400">
          {JSON.stringify(split.rest, null, 2)}
        </pre>
      )}
    </div>
  );
}

import { useMemo, useState } from "react";
import type { NextItem, NextSeverity } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { CountsMark } from "@/components/CountsMark";
import { DataTable, useTableState, type Column } from "@/components/DataTable";
import { RefLink } from "@/components/RefLink";
import { FAMILY_LABEL, captureHandle, detailRecord, familyOf, reasonMeta, splitDetail, type FieldSpec } from "@/lib/next-reasons";
import { term } from "@/lib/vocabulary";
import { FieldValue, RepairText, repairKey } from "./NextFields";

const SEVERITY_RANK: Record<NextSeverity, number> = { blocking: 0, repair: 1, warning: 2 };

interface ReasonShare {
  /** Every row of the reason has the same repair: the group line shows it once. */
  sharedRepair: boolean;
  /** Detail fields with one value across the reason's rows: the group line shows them. */
  common: { spec: FieldSpec; value: unknown }[];
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
    out.set(reason, { sharedRepair, common });
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
  const probe = useMemo(() => nextColumns({ grouped: false, shares, family }), [shares, family]);
  const [state] = useTableState(probe, urlKey);
  const grouped = state.sort === null;
  const columns = useMemo(() => nextColumns({ grouped, shares, family }), [grouped, shares, family]);
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
      {share?.sharedRepair && <RepairText item={first} />}
    </div>
  );
}

function nextColumns({
  grouped,
  shares,
  family,
}: {
  grouped: boolean;
  shares: Map<string, ReasonShare>;
  family: boolean;
}): Column<NextItem>[] {
  const columns: (Column<NextItem> | null)[] = [
    {
      id: "severity",
      header: "Severity",
      sortValue: (item) => SEVERITY_RANK[item.severity],
      filter: { kind: "enum", values: (item) => [item.severity] },
      options: ["blocking", "repair", "warning"],
      optionLabel: (value) => term("severity", value).word,
      className: "whitespace-nowrap",
      // grouped: the group line says it
      cell: (item) => (grouped ? null : <Chip concept="severity" value={item.severity} />),
    },
    {
      id: "reason",
      header: "Reason",
      sortValue: (item) => reasonMeta(item.reason).label,
      filter: { kind: "enum", values: (item) => [item.reason] },
      optionLabel: (value) => reasonMeta(value as NextItem["reason"]).label,
      className: "min-w-[8rem]",
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
          cell: (item) => FAMILY_LABEL[familyOf(item.reason)],
        }
      : null,
    {
      id: "about",
      header: "About",
      title: "The Subject, Claim, Line or proposal the row is about, and what else it names",
      hideable: false,
      sortValue: (item) => item.subject_identity,
      filter: { kind: "text", text: (item) => [item.subject_identity, ...(item.related_identities ?? [])].join(" ") },
      className: "min-w-[15rem] max-w-[24rem] break-words",
      cell: (item) => {
        const related = item.related_identities ?? [];
        return (
          <>
            <RefLink value={item.subject_identity} short />
            {related.length > 0 && (
              <div className="min-w-0 break-words text-[12px]">
                <span className="t-meta">about </span>
                {related.map((ref, i) => (
                  <span key={ref}>
                    {i > 0 && ", "}
                    <RefLink value={ref.startsWith("Capture:sha256:") ? captureHandle(ref.slice(8)) : ref} short />
                  </span>
                ))}
              </div>
            )}
          </>
        );
      },
    },
    {
      id: "detail",
      header: "Detail",
      filter: { kind: "text", text: (item) => JSON.stringify(item.detail ?? "") },
      cell: (item) => <DetailCell item={item} shared={grouped ? shares.get(item.reason) : undefined} />,
    },
    {
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

/** A row's own detail fields (those its group line does not show), what they imply, and the rest on request. */
function DetailCell({ item, shared }: { item: NextItem; shared: ReasonShare | undefined }) {
  const [raw, setRaw] = useState(false);
  const meta = reasonMeta(item.reason);
  const split = splitDetail(item.reason, item.detail);
  const sharedKeys = new Set((shared?.common ?? []).map(({ spec }) => spec.key));
  // A Claim field naming the row's own subject is already the row's link.
  const fields = split.fields.filter(
    ({ spec, value }) => !sharedKeys.has(spec.key) && !(spec.kind === "claim" && `Claim:${String(value)}` === item.subject_identity),
  );
  const record = detailRecord(item.detail);
  const counts = record && meta.counts ? meta.counts(record) : null;
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
            {raw ? "hide detail" : "more detail"}
          </button>
        )}
      </span>
      {(item.findings?.length ?? 0) > 0 && (
        <div className="t-meta">also: {item.findings!.map((finding) => reasonMeta(finding.reason).label).join("; ")}</div>
      )}
      {raw && split.rest !== null && (
        <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap border-l border-zinc-800 pl-3 text-[11px] text-zinc-400">
          {JSON.stringify(split.rest, null, 2)}
        </pre>
      )}
    </div>
  );
}

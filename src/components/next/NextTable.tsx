import { useMemo, useState } from "react";
import type { NextItem, NextSeverity } from "@/api/schemas";
import { useGet } from "@/api/hooks";
import { AttestationEvidence } from "@/components/AttestationEvidence";
import { Chip } from "@/components/Chip";
import { CountsMark } from "@/components/CountsMark";
import { DataTable, type Column } from "@/components/DataTable";
import { RefLink } from "@/components/RefLink";
import { LoadState } from "@/components/Panel";
import { shortId } from "@/components/ShortId";
import { nextAttestationAccounts, nextAttestationClaim } from "@/lib/attestation-evidence";
import { FAMILY_LABEL, captureHandle, detailRecord, familyOf, reasonMeta, splitDetail } from "@/lib/next-reasons";
import { formatDateTime, formatRelative } from "@/lib/text";
import { term } from "@/lib/vocabulary";
import { FieldValue, RepairCell } from "./NextFields";

const SEVERITY_RANK: Record<NextSeverity, number> = { blocking: 0, repair: 1, warning: 2, setup: 3 };
export const SEVERITIES: readonly NextSeverity[] = ["blocking", "repair", "warning", "setup"];

/** The Severity header's ⓘ: each level's meaning, from the glossary. */
export const SEVERITY_INFO = (
  <span className="flex flex-col gap-1">
    {SEVERITIES.map((severity) => (
      <span key={severity}>{term("severity", severity).meaning}</span>
    ))}
  </span>
);

/** The Repair header's ⓘ. */
export const REPAIR_INFO =
  "What clears the row. A repair that only reads opens here (Open in Inbox); the rest run from the CLI or MCP, shown as text to copy: the console never runs one. When the caller cannot run it, the row says what running it needs.";

/**
 * `next` rows in the shared table, one row per item, each saying one thing
 * once: how bad (severity), what kind of item, what it is about (the ref,
 * linked, its kind as a quiet tag), what is wrong (the reason's typed fields
 * as label and value; core's sentence only when it adds to them), and what to
 * do (the repair). Ordered by item type, then severity; a header sorts.
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
  /** Include the optional Family column. */
  family?: boolean;
  partial?: string | null;
  label?: string;
  empty?: string;
}) {
  const ordered = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          reasonMeta(a.reason).label.localeCompare(reasonMeta(b.reason).label) || SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity],
      ),
    [items],
  );
  const columns = useMemo(() => nextColumns({ family, items }), [family, items]);
  return <DataTable rows={ordered} columns={columns} rowKey={(item) => item.item_id} urlKey={urlKey} label={label} partial={partial} empty={empty} />;
}

/** The columns a page needs: Detail, Findings and Repair only when some row fills them. */
function nextColumns({ family, items }: { family: boolean; items: readonly NextItem[] }): Column<NextItem>[] {
  const anyFindings = items.some((item) => (item.findings?.length ?? 0) > 0);
  const anyDetail = items.some(hasDetail);
  const anyRepair = items.some((item) => item.repair || item.repair_requires);
  const columns: (Column<NextItem> | null)[] = [
    {
      id: "severity",
      header: "Severity",
      info: SEVERITY_INFO,
      sortValue: (item) => SEVERITY_RANK[item.severity],
      filter: { kind: "enum", values: (item) => [item.severity] },
      options: SEVERITIES,
      optionLabel: (value) => term("severity", value).word,
      title: "How bad, and since when the condition holds (when the queue says)",
      className: "whitespace-nowrap",
      // since when, under the severity: how bad and for how long, said once per row
      cell: (item) => (
        <span className="flex flex-col gap-0.5">
          <Chip concept="severity" value={item.severity} />
          {item.since && <Since iso={item.since} />}
        </span>
      ),
    },
    {
      id: "reason",
      header: "Item",
      sortValue: (item) => reasonMeta(item.reason).label,
      filter: { kind: "enum", values: (item) => [item.reason] },
      optionLabel: (value) => reasonMeta(value as NextItem["reason"]).label,
      className: "min-w-[7rem] max-w-[11rem]",
      cell: (item) => (
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
      header: "About",
      title: "The Subject, Claim, Line or proposal the item is about; under it, what else the row names (the other side of a conflict, the evidence)",
      hideable: false,
      sortValue: (item) => item.subject_identity,
      filter: { kind: "text", text: (item) => [item.subject_identity, ...(item.related_identities ?? [])].join(" ") },
      cell: (item) => (
        <span className="flex min-w-0 flex-col gap-0.5">
          <About identity={item.subject_identity} />
          <Related refs={item.related_identities ?? []} />
        </span>
      ),
    },
    anyDetail
      ? {
          id: "detail",
          header: "Detail",
          title: "What is wrong: the item's figures, as the queue serves them",
          filter: { kind: "text", text: (item) => JSON.stringify(item.detail ?? "") },
          cell: (item) => <DetailCell item={item} />,
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
    {
      id: "item",
      header: "Item id",
      defaultHidden: true,
      className: "font-mono text-[11px] text-zinc-500",
      cell: (item) => item.item_id,
    },
    anyRepair
      ? {
          id: "repair",
          header: "Repair",
          info: REPAIR_INFO,
          filter: {
            kind: "text",
            text: (item) => [item.repair?.operation, item.repair?.required_change, item.repair?.command, item.repair_requires?.operation].filter(Boolean).join(" "),
          },
          cell: (item) => <RepairCell item={item} />,
        }
      : null,
  ];
  return columns.filter((column): column is Column<NextItem> => column !== null);
}

/**
 * What the row is about: its kind as a quiet tag, then the ref, linked, on
 * one line (cut to the cell, whole on hover). "Line:security.kev-triage"
 * reads as Line + the name; a Claim id, a proposal digest and a Subject path
 * read as themselves (the link's page says the kind).
 */
export function About({ identity }: { identity: string }) {
  const colon = identity.indexOf(":");
  const prefix = colon > 0 ? identity.slice(0, colon) : null;
  const kind = prefix && prefix !== "Claim" && prefix !== "sha256" ? prefix : null;
  const name = kind ? identity.slice(colon + 1) : null;
  return (
    <span className="flex max-w-[16rem] min-w-[8rem] items-baseline gap-1.5 whitespace-nowrap" title={identity}>
      {kind && <span className="shrink-0 text-[11px] text-zinc-500">{kind}</span>}
      <span className="w-0 min-w-0 flex-1 truncate">
        <RefLink value={identity} short className="hover:underline">
          {name !== null ? <span className="font-mono text-[12.5px]">{shortId(name)}</span> : undefined}
        </RefLink>
      </span>
    </span>
  );
}

const RELATED_SHOWN = 2;

/** What else the row names, quietly under the ref: the first two linked, the count of the rest (all on hover). */
function Related({ refs }: { refs: readonly string[] }) {
  if (refs.length === 0) return null;
  return (
    <span className="flex max-w-[16rem] min-w-[8rem] items-baseline gap-x-2 whitespace-nowrap text-[11px] text-zinc-500" title={refs.join("\n")}>
      {/* no minimum width of its own (w-0 flex-1): a narrow table cuts the refs instead of widening */}
      <span className="w-0 min-w-0 flex-1 truncate [&_*]:text-[11px] [&_a]:text-zinc-400">
        {refs.slice(0, RELATED_SHOWN).map((ref) => (
          <span key={ref} className="mr-2">
            <RefLink value={ref.startsWith("Capture:sha256:") ? captureHandle(ref.slice(8)) : ref} short />
          </span>
        ))}
      </span>
      {refs.length > RELATED_SHOWN && <span className="shrink-0">+{refs.length - RELATED_SHOWN}</span>}
    </span>
  );
}

function hasDetail(item: NextItem): boolean {
  const split = splitDetail(item.reason, item.detail);
  return ownFields(item, split.fields).length > 0 || split.rest !== null || countsOf(item) !== null;
}

/**
 * The fields the row does not already say: a Claim field naming the row's own
 * subject is the row's link; a time the queue also served as `since` is under
 * the severity.
 */
function ownFields(item: NextItem, fields: ReturnType<typeof splitDetail>["fields"]) {
  return fields.filter(
    ({ spec, value }) =>
      !(spec.kind === "claim" && `Claim:${String(value)}` === item.subject_identity) && !(spec.kind === "time" && item.since && value === item.since),
  );
}

function countsOf(item: NextItem) {
  const record = detailRecord(item.detail);
  const meta = reasonMeta(item.reason);
  return record && meta.counts ? meta.counts(record) : null;
}

/** Since when a condition holds, under its severity: relative ("23d 9h ago"), the exact time on hover. */
function Since({ iso }: { iso: string }) {
  return (
    <span className="pl-3 text-[11px] text-zinc-500" title={`Since ${formatDateTime(iso)}`}>
      {formatRelative(iso)}
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
      <button onClick={() => setOpen((v) => !v)} className="tabular-nums text-zinc-300 hover:text-zinc-100" aria-expanded={open}>
        {findings.length}
      </button>
      {open && <div className="t-meta mt-0.5">{findings.map((finding) => reasonMeta(finding.reason).label).join("; ")}</div>}
    </div>
  );
}

/** The reason's typed fields as label and value (prose, unlabelled, under them), what they imply, the rest on request. */
function DetailCell({ item }: { item: NextItem }) {
  const [raw, setRaw] = useState(false);
  const [evidence, setEvidence] = useState(false);
  const claim = nextAttestationClaim(item);
  const split = splitDetail(item.reason, item.detail);
  const fields = ownFields(item, split.fields);
  const figures = fields.filter(({ spec }) => spec.kind !== "prose");
  const prose = fields.filter(({ spec }) => spec.kind === "prose");
  const counts = countsOf(item);
  return (
    <div className="min-w-[10rem] max-w-[14rem] text-[12px] xl:max-w-[22rem]">
      <span className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-0.5">
        {figures.map(({ spec, value }) => (
          <span key={spec.key} className="break-words">
            {spec.label && <span className="mr-1.5 text-zinc-500">{spec.label}</span>}
            <span className="text-zinc-300">
              <FieldValue spec={spec} value={value} />
            </span>
          </span>
        ))}
        {counts && <CountsMark counts={counts.counts} reason={counts.reason} />}
        {claim && (
          <button onClick={() => setEvidence((v) => !v)} className="text-zinc-400 hover:text-zinc-200" aria-expanded={evidence}>
            {evidence ? "Hide evidence" : "Evidence"}
          </button>
        )}
        {split.rest !== null && (
          <button onClick={() => setRaw((v) => !v)} className="whitespace-nowrap text-zinc-500 hover:text-zinc-200" aria-expanded={raw}>
            {raw ? "Hide detail" : "More detail"}
          </button>
        )}
      </span>
      {prose.map(({ spec, value }) => (
        <div key={spec.key} className="mt-0.5">
          <FieldValue spec={spec} value={value} />
        </div>
      ))}
      {evidence && claim && <ReasonAttestationEvidence item={item} claim={claim} />}
      {raw && split.rest !== null && (
        <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap border-l border-zinc-800 pl-3 text-[11px] text-zinc-400">
          {JSON.stringify(split.rest, null, 2)}
        </pre>
      )}
    </div>
  );
}

/** Read only after expansion, at the queue's pinned coordinate. */
function ReasonAttestationEvidence({ item, claim }: { item: NextItem; claim: string }) {
  const why = useGet(claim, "why");
  if (why.isPending) return <LoadState />;
  if (why.error) return <LoadState error={why.error} />;
  const accounts = nextAttestationAccounts(item, why.data?.why);
  return (
    <div className="mt-2">
      {accounts.length === 0 ? (
        <span className="text-zinc-500">No attestation evidence</span>
      ) : (
        accounts.map((account, i) => <AttestationEvidence key={account.event ?? account.attestation ?? i} account={account} />)
      )}
    </div>
  );
}

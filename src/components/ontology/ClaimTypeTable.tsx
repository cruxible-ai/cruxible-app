import { useMemo } from "react";
import { roleWord } from "@/lib/vocabulary";
import { Link } from "react-router-dom";
import { useInstanceId } from "@/api/hooks";
import type { OrientPredicate, Schemas } from "@/api/schemas";
import { useAtLink } from "@/lib/at";
import {
  contentionLabel,
  contentionTitle,
  contractName,
  CURRENT_CLAIM_TYPE_FORMAT,
  driftedLocally,
  evidenceMode,
  shareLabel,
  targetKinds,
  type PredicateCounts,
  type Settler,
} from "@/lib/ontology";
import { DataTable, type Column } from "@/components/DataTable";
import { ClaimTypeDetail } from "./ClaimTypeDetail";
import { Pending } from "./Pending";

const SETTLER_VERB: Record<Settler["kind"], string> = {
  settles: "settles",
  capped: "proposes (Line capped at propose)",
  suspended: "suspended: settles nothing",
};

/** Evidence contracts shown in a row before the rest fold into "+N". */
const EVIDENCE_SHOWN = 2;

/**
 * The kind page's ClaimType table: one row per ClaimType with its definition
 * (claim_types section: value, cardinality, role, evidence, freshness, kit,
 * contention, format and revision), who may settle it (typed Mandate scope),
 * and its live counts on this kind (orient kind=K, maintained counters).
 * Contested and stale wait on post-v1 reads (K2) and show a dash. A row
 * expands to its full descriptor and evidence rules. The shared table: every
 * column sorts and filters (the section is the kind's whole list).
 */
export function ClaimTypeTable({
  kind,
  kindKit,
  rows,
  settlers,
  counts,
  liveSubjects,
  kits,
  open,
  onToggle,
}: {
  kind: string;
  /** The kind's own kit: rows owned by it leave the kit cell blank. */
  kindKit?: string | null | undefined;
  rows: OrientPredicate[];
  settlers: (predicate: string) => Settler[] | null;
  /** Live counts by predicate; null while orient(kind=K) loads, undefined when it failed. */
  counts: ReadonlyMap<string, PredicateCounts> | null | undefined;
  liveSubjects: number | undefined;
  kits: readonly Schemas["InstalledKit"][] | undefined;
  open: string | null;
  onToggle: (predicate: string) => void;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  // the kit column only earns its width when some row's kit differs from the kind's, or is edited
  const showKit = rows.some((row) => (row.kit ?? null) !== (kindKit ?? null) || driftedLocally(row, kits));
  const columns = useMemo<Column<OrientPredicate>[]>(() => {
    const countOf = (row: OrientPredicate) => (counts ? (counts.get(row.predicate) ?? { liveClaims: 0, subjectsWithValue: 0 }) : counts);
    const countPending = (row: OrientPredicate) => {
      const count = countOf(row);
      return <span className={count === null ? "animate-pulse text-zinc-600" : "text-zinc-700"}>{count === null ? "…" : "—"}</span>;
    };
    const valueWords = (row: OrientPredicate) => {
      const targets = targetKinds(row.type);
      return targets.length ? targets.map((t) => `→ ${t}`).join(" ") : row.type === "subject" ? "any Subject" : row.type;
    };
    const modeWord = (row: OrientPredicate) => {
      const mode = evidenceMode(row);
      return mode === "own-words" ? "own words" : mode;
    };
    const kitWord = (row: OrientPredicate) => (row.kit ? (row.kit === kindKit ? "" : row.kit) : kindKit ? "here" : "");
    const settledBy = (row: OrientPredicate) => {
      const who = settlers(row.predicate);
      return who === null ? null : who.length === 0 ? ["review"] : who.map((s) => s.line);
    };
    const all: (Column<OrientPredicate> | null)[] = [
      {
        id: "claim_type",
        header: "ClaimType",
        title: "Name, then its format version and accepted revision",
        hideable: false,
        sortValue: (row) => row.name,
        filter: { kind: "text", text: (row) => `${row.name} ${row.predicate}` },
        cell: (row) => (
          <>
            <span className="font-mono text-zinc-200" title={row.predicate}>
              {row.name}
            </span>
            <span className="ml-2 whitespace-nowrap font-mono text-[11px] text-zinc-500" title={row.path ?? undefined}>
              <span>
                {row.format !== undefined && row.format !== null ? `v${row.format}` : ""}
                {row.revision ? <span className="text-zinc-600"> r{row.revision}</span> : null}
              </span>
              {row.format && row.format < CURRENT_CLAIM_TYPE_FORMAT && (
                <span className="ml-1 font-sans text-zinc-400" title="An upgrade to the current ClaimType format is available">
                  upgrade
                </span>
              )}
            </span>
          </>
        ),
      },
      {
        id: "value",
        header: "value",
        title: "Literal type, or the Subject kinds it points at",
        sortValue: valueWords,
        filter: { kind: "text", text: valueWords },
        cell: (row) => {
          const targets = targetKinds(row.type);
          return targets.length > 0 ? (
            targets.map((target) => (
              <Link key={target} to={link(`/i/${instanceId}/kinds/${encodeURIComponent(target)}`)} className="mr-1.5 font-mono text-zinc-300 hover:underline">
                → {target}
              </Link>
            ))
          ) : (
            <span className="text-zinc-400">
              {row.type === "subject" ? "any Subject" : row.type}
              {row.members && <span className="text-zinc-600"> ({row.members.length})</span>}
            </span>
          );
        },
      },
      {
        id: "card",
        header: "card.",
        title: "one or many values per Subject",
        sortValue: (row) => (row.cardinality === "many" ? "many" : "one"),
        filter: { kind: "enum", values: (row) => [row.cardinality === "many" ? "many" : "one"] },
        options: ["one", "many"],
        className: "font-mono text-zinc-400",
        cell: (row) => (row.cardinality === "many" ? "many" : "one"),
      },
      {
        id: "role",
        header: "role",
        title: "Default role of its Claims",
        sortValue: (row) => (row.default_role ? roleWord(row.default_role) : null),
        filter: { kind: "enum", values: (row) => (row.default_role ? [roleWord(row.default_role)] : []) },
        cell: (row) => (
          <span className="text-zinc-400" title={row.default_role ?? undefined}>
            {row.default_role ? roleWord(row.default_role) : "—"}
          </span>
        ),
      },
      {
        id: "evidence",
        header: "evidence",
        title: "Admitted contracts; captured = a Capture is required, own words = the author's statement may stand",
        sortValue: modeWord,
        filter: { kind: "enum", values: (row) => [modeWord(row)] },
        cell: (row) => {
          const mode = evidenceMode(row);
          return (
            <>
              <span className={mode === "captured" ? "text-zinc-300" : "text-zinc-500"}>{modeWord(row)}</span>
              {(row.evidence ?? []).slice(0, EVIDENCE_SHOWN).map((contract) => (
                <Link
                  key={contract}
                  to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(contract))}`)}
                  className="block whitespace-nowrap font-mono text-[12px] text-zinc-300 hover:underline"
                >
                  {contractName(contract)}
                </Link>
              ))}
              {(row.evidence ?? []).length > EVIDENCE_SHOWN && (
                <button
                  onClick={() => onToggle(row.predicate)}
                  className="text-[12px] text-zinc-500 hover:text-zinc-200"
                  title={(row.evidence ?? []).slice(EVIDENCE_SHOWN).map(contractName).join("\n")}
                >
                  +{(row.evidence ?? []).length - EVIDENCE_SHOWN} more
                </button>
              )}
            </>
          );
        },
      },
      {
        id: "fresh",
        header: "fresh",
        title: "Evidence goes stale after",
        sortValue: (row) => row.stale_after ?? null,
        className: "font-mono text-zinc-400",
        cell: (row) => row.stale_after ?? "—",
      },
      showKit
        ? {
            id: "kit",
            header: "kit",
            title: "Owning kit when it differs from the kind's; edited = the kit reports this ClaimType's path as changed locally",
            sortValue: kitWord,
            filter: { kind: "enum", values: (row) => [kitWord(row) || "the kind's"] },
            className: "font-mono text-[12px] text-zinc-400",
            cell: (row) => (
              <>
                {row.kit ? (row.kit === kindKit ? null : row.kit) : kindKit ? <span className="font-sans text-zinc-500">here</span> : null}
                {driftedLocally(row, kits) && (
                  <span className="ml-1 font-sans text-zinc-400" title={`${row.path} is edited locally`}>
                    edited
                  </span>
                )}
              </>
            ),
          }
        : null,
      {
        id: "settled_by",
        header: "settled by",
        title: "Lines whose live settle Mandate scopes this ClaimType; otherwise changes go to review",
        sortValue: (row) => settledBy(row)?.join(" ") ?? null,
        filter: { kind: "text", text: (row) => settledBy(row)?.join(" ") ?? "" },
        cell: (row) => {
          const who = settlers(row.predicate);
          if (who === null) return <span className="animate-pulse text-zinc-600">…</span>;
          if (who.length === 0) return <span className="text-zinc-500">review</span>;
          return who.map((s) => (
            <Link
              key={`${s.line}\n${s.mandate}`}
              to={link(`/i/${instanceId}/lines/${encodeURIComponent(s.line)}`)}
              className={`block font-mono hover:underline ${s.kind === "settles" ? "text-zinc-200" : s.kind === "suspended" ? "text-zinc-500 line-through" : "text-zinc-400"}`}
              title={`${SETTLER_VERB[s.kind]} under ${s.mandate}`}
            >
              {s.line}
            </Link>
          ));
        },
      },
      {
        id: "contention",
        header: "contention",
        title: "How rival Claims of one slot settle: every eligible Claim answers, or rivals stay conflicted, or a rival is refused",
        sortValue: (row) => (row.contention ? contentionLabel(row.contention) : null),
        filter: { kind: "enum", values: (row) => (row.contention ? [contentionLabel(row.contention)] : []) },
        cell: (row) => (
          <span className="text-zinc-400" title={row.contention ? contentionTitle(row.contention) : undefined}>
            {row.contention ? contentionLabel(row.contention) : "—"}
          </span>
        ),
      },
      {
        id: "claims",
        header: "Claims",
        title: "Live Claims of this ClaimType on this kind",
        numeric: true,
        sortValue: (row) => countOf(row)?.liveClaims ?? null,
        className: "text-zinc-300",
        cell: (row) => {
          const count = countOf(row);
          return count ? count.liveClaims : countPending(row);
        },
      },
      {
        id: "share",
        header: "share",
        title: "Live Subjects of this kind holding a value",
        numeric: true,
        sortValue: (row) => {
          const count = countOf(row);
          return count && liveSubjects ? count.subjectsWithValue / liveSubjects : null;
        },
        className: "text-zinc-400",
        cell: (row) => {
          const count = countOf(row);
          return count ? (
            <span title={`${count.subjectsWithValue} of ${liveSubjects ?? "?"} live Subjects`}>{shareLabel(count.subjectsWithValue, liveSubjects)}</span>
          ) : (
            countPending(row)
          );
        },
      },
      {
        id: "contested_stale",
        header: "contested / stale",
        title: "Claims in conflict, and Claims with expired support (K2, post-v1)",
        headerClassName: "w-20 whitespace-normal!",
        className: "whitespace-nowrap",
        cell: () => (
          <>
            <Pending gap="K2" /> <span className="text-zinc-700">/</span> <Pending gap="K2" />
          </>
        ),
      },
    ];
    return all.filter((column): column is Column<OrientPredicate> => column !== null);
  }, [counts, kindKit, kits, link, instanceId, liveSubjects, onToggle, settlers, showKit]);

  return (
    <DataTable
      rows={rows}
      columns={columns}
      rowKey={(row) => row.predicate}
      rowLabel={(row) => row.name}
      urlKey="ct"
      label={`${kind} ClaimTypes`}
      open={open}
      onToggle={onToggle}
      expanded={(row) => <ClaimTypeDetail descriptor={row} settlers={settlers(row.predicate)} kind={kind} />}
      empty="No ClaimTypes on this kind."
    />
  );
}

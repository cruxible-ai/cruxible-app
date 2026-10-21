import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
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
import { ClaimTypeDetail } from "./ClaimTypeDetail";
import { Pending } from "./Pending";

const SETTLER_VERB: Record<Settler["kind"], string> = {
  settles: "settles",
  capped: "proposes (Line capped at propose)",
  suspended: "suspended: settles nothing",
};

const HEAD = [
  ["", ""],
  ["ClaimType", "Name, then its format version and accepted revision"],
  ["value", "Literal type, or the Subject kinds it points at"],
  ["card.", "one or many values per Subject"],
  ["role", "Default role of its Claims"],
  ["evidence", "Admitted contracts; captured = a Capture is required, own words = the author's statement may stand"],
  ["fresh", "Evidence goes stale after"],
  ["kit", "Owning kit when it differs from the kind's; edited = the kit reports this ClaimType's path as changed locally"],
  ["settled by", "Lines whose live settle Mandate scopes this ClaimType; otherwise changes go to review"],
  ["contention", "How rival Claims of one slot settle: every eligible Claim answers, or rivals stay conflicted, or a rival is refused"],
  ["Claims", "Live Claims of this ClaimType on this kind"],
  ["share", "Live Subjects of this kind holding a value"],
  ["contested / stale", "Claims in conflict, and Claims with expired support (K2, post-v1)"],
] as const;

/** Evidence contracts shown in a row before the rest fold into "+N". */
const EVIDENCE_SHOWN = 2;

/**
 * The kind page's ClaimType table: one row per ClaimType with its definition
 * (claim_types section: value, cardinality, role, evidence, freshness, kit,
 * contention, format and revision), who may settle it (typed Mandate scope),
 * and its live counts on this kind (orient kind=K, maintained counters).
 * Contested and stale wait on post-v1 reads (K2) and show a dash. A row
 * expands to its full descriptor and evidence rules.
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
  const head = HEAD.filter(([label]) => showKit || label !== "kit");
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px] leading-5">
        <thead className="text-zinc-500">
          <tr>
            {head.map(([label, title]) => (
              <th
                key={label || "toggle"}
                title={title || undefined}
                className={`border-b border-zinc-800 py-1.5 pr-3 align-bottom text-[12px] font-medium ${label === "contested / stale" ? "w-20" : "whitespace-nowrap"} ${label === "Claims" || label === "share" ? "text-right" : ""}`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const expanded = open === row.predicate;
            const targets = targetKinds(row.type);
            const mode = evidenceMode(row);
            const who = settlers(row.predicate);
            const count = counts ? (counts.get(row.predicate) ?? { liveClaims: 0, subjectsWithValue: 0 }) : counts;
            const countPending = <span className={count === null ? "animate-pulse text-zinc-600" : "text-zinc-700"}>{count === null ? "…" : "—"}</span>;
            const edited = driftedLocally(row, kits);
            return (
              <Fragment key={row.predicate}>
                <tr className={`border-t border-zinc-800/70 align-top first:border-t-0 ${expanded ? "bg-zinc-900/40" : ""}`}>
                  <td className="py-1.5 pr-2">
                    <button
                      onClick={() => onToggle(row.predicate)}
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${row.name}`}
                      className="text-zinc-500 hover:text-zinc-200"
                    >
                      {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                    </button>
                  </td>
                  <td className="py-1.5 pr-3" title={row.predicate}>
                    <span className="font-mono text-zinc-200">{row.name}</span>
                    <span className="ml-2 whitespace-nowrap font-mono text-[11px] text-zinc-500" title={row.path ?? undefined}>
                      <span>
                        {row.format !== undefined && row.format !== null ? `v${row.format}` : ""}
                        {row.revision ? <span className="text-zinc-600"> r{row.revision}</span> : null}
                      </span>
                      {row.format && row.format < CURRENT_CLAIM_TYPE_FORMAT && (
                        <span className="ml-1 font-sans text-amber-400/90" title="An upgrade to the current ClaimType format is available">
                          upgrade
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-1.5 pr-3">
                    {targets.length > 0 ? (
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
                    )}
                  </td>
                  <td className="py-1.5 pr-3 font-mono text-zinc-400">{row.cardinality === "many" ? "many" : "one"}</td>
                  <td className="py-1.5 pr-3 text-zinc-400">{row.default_role ?? "—"}</td>
                  <td className="py-1.5 pr-3">
                    <span className={mode === "captured" ? "text-amber-400/90" : "text-zinc-500"}>
                      {mode === "own-words" ? "own words" : mode}
                    </span>
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
                  </td>
                  <td className="py-1.5 pr-3 font-mono text-zinc-400">{row.stale_after ?? "—"}</td>
                  {showKit && (
                    <td className="py-1.5 pr-3 font-mono text-[12px] text-zinc-400">
                      {row.kit ? (row.kit === kindKit ? null : row.kit) : kindKit ? <span className="font-sans text-zinc-500">here</span> : null}
                      {edited && (
                        <span className="ml-1 font-sans text-amber-400/90" title={`${row.path} is edited locally`}>
                          edited
                        </span>
                      )}
                    </td>
                  )}
                  <td className="py-1.5 pr-3">
                    {who === null ? (
                      <span className="animate-pulse text-zinc-600">…</span>
                    ) : who.length === 0 ? (
                      <span className="text-zinc-500">review</span>
                    ) : (
                      who.map((s) => (
                        <Link key={`${s.line}\n${s.mandate}`} to={link(`/i/${instanceId}/lines/${encodeURIComponent(s.line)}`)} className={`block font-mono hover:underline ${s.kind === "settles" ? "text-emerald-400/90" : s.kind === "suspended" ? "text-red-400/80 line-through" : "text-zinc-400"}`} title={`${SETTLER_VERB[s.kind]} under ${s.mandate}`}>
                          {s.line}
                        </Link>
                      ))
                    )}
                  </td>
                  <td className="py-1.5 pr-3 text-zinc-400" title={row.contention ? contentionTitle(row.contention) : undefined}>
                    {row.contention ? contentionLabel(row.contention) : "—"}
                  </td>
                  <td className="py-1.5 pr-3 text-right font-mono text-zinc-300">
                    {count ? count.liveClaims : countPending}
                  </td>
                  <td className="py-1.5 pr-3 text-right font-mono text-zinc-400" title={count ? `${count.subjectsWithValue} of ${liveSubjects ?? "?"} live Subjects` : undefined}>
                    {count ? shareLabel(count.subjectsWithValue, liveSubjects) : countPending}
                  </td>
                  <td className="whitespace-nowrap py-1.5">
                    <Pending gap="K2" /> <span className="text-zinc-700">/</span> <Pending gap="K2" />
                  </td>
                </tr>
                {expanded && (
                  <tr className="bg-zinc-900/40">
                    <td />
                    <td colSpan={head.length - 1} className="pb-2 pr-3">
                      <ClaimTypeDetail descriptor={row} settlers={who} kind={kind} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

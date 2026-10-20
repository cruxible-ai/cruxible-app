import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useInstanceId } from "@/api/hooks";
import type { OrientPredicate } from "@/api/schemas";
import { useAtLink } from "@/lib/at";
import {
  claimTypeContention,
  claimTypeVersion,
  contractName,
  evidenceMode,
  predicateCounts,
  targetKinds,
  type Settler,
} from "@/lib/ontology";
import { ClaimTypeDetail } from "./ClaimTypeDetail";
import { Pending } from "./Pending";

const HEAD = [
  ["", ""],
  ["ClaimType", ""],
  ["value", "Literal type, or the Subject kinds it points at"],
  ["card.", "one or many values per Subject"],
  ["role", "Default role of its Claims"],
  ["evidence", "Admitted contracts; captured = a Capture is required, own words = the author's statement may stand"],
  ["fresh", "Evidence goes stale after"],
  ["kit", "Owning kit"],
  ["settled by", "Lines whose live settle Mandate scopes this ClaimType; otherwise changes go to review"],
  ["contention", "Resolution policy on conflict (K5)"],
  ["version", "Format version and revision (K5)"],
  ["Claims", "Live Claims (K1)"],
  ["share", "Subjects of the kind with a value (K1)"],
  ["contested", "Claims in conflict (K2)"],
  ["stale", "Claims with expired support (K2)"],
] as const;

/**
 * The kind page's ClaimType table: one row per ClaimType with every column
 * the existing reads serve, typed placeholders for the columns core is
 * building (K1, K5) and dashes for post-v1 ones (K2). A row expands to its
 * full descriptor and evidence rules.
 */
export function ClaimTypeTable({
  kind,
  rows,
  settlers,
  open,
  onToggle,
}: {
  kind: string;
  rows: OrientPredicate[];
  settlers: (predicate: string) => Settler[] | null;
  open: string | null;
  onToggle: (predicate: string) => void;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[12px]">
        <thead className="text-zinc-500">
          <tr>
            {HEAD.map(([label, title]) => (
              <th key={label || "toggle"} title={title || undefined} className="whitespace-nowrap py-1 pr-3 font-medium">
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
            const contention = claimTypeContention(row);
            const version = claimTypeVersion(row);
            const counts = predicateCounts(row);
            return (
              <Fragment key={row.predicate}>
                <tr className={`border-t border-zinc-900 align-top ${expanded ? "bg-zinc-900/40" : ""}`}>
                  <td className="py-1 pr-2">
                    <button
                      onClick={() => onToggle(row.predicate)}
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${row.name}`}
                      className="text-zinc-500 hover:text-zinc-200"
                    >
                      {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                    </button>
                  </td>
                  <td className="py-1 pr-3 font-mono text-zinc-200" title={row.predicate}>
                    {row.name}
                  </td>
                  <td className="py-1 pr-3">
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
                  <td className="py-1 pr-3 font-mono text-zinc-400">{row.cardinality === "many" ? "many" : "one"}</td>
                  <td className="py-1 pr-3 text-zinc-400">{row.default_role ?? "—"}</td>
                  <td className="py-1 pr-3">
                    <span className={mode === "captured" ? "text-amber-400/90" : "text-zinc-500"}>
                      {mode === "own-words" ? "own words" : mode}
                    </span>
                    {(row.evidence ?? []).map((contract) => (
                      <Link key={contract} to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(contract))}`)} className="block font-mono text-zinc-300 hover:underline">
                        {contractName(contract)}
                      </Link>
                    ))}
                  </td>
                  <td className="py-1 pr-3 font-mono text-zinc-400">{row.stale_after ?? "—"}</td>
                  <td className="py-1 pr-3 font-mono text-zinc-400">{row.kit ?? <span className="font-sans text-zinc-500">here</span>}</td>
                  <td className="py-1 pr-3">
                    {who === null ? (
                      <span className="animate-pulse text-zinc-600">…</span>
                    ) : who.length === 0 ? (
                      <span className="text-zinc-500">review</span>
                    ) : (
                      who.map((s) => (
                        <Link key={`${s.line}\n${s.mandate}`} to={link(`/i/${instanceId}/lines/${encodeURIComponent(s.line)}`)} className={`block font-mono hover:underline ${s.kind === "settles" ? "text-emerald-400/90" : "text-zinc-400"}`} title={`${s.kind === "settles" ? "settles" : "proposes (capped)"} under ${s.mandate}`}>
                          {s.line}
                        </Link>
                      ))
                    )}
                  </td>
                  <td className="py-1 pr-3">{contention ? `${contention.selector} / ${contention.onConflict}` : <Pending gap="K5" />}</td>
                  <td className="py-1 pr-3">{version ? `v${version.format} r${version.revision}` : <Pending gap="K5" />}</td>
                  <td className="py-1 pr-3">{counts ? counts.liveClaims : <Pending gap="K1" />}</td>
                  <td className="py-1 pr-3">{counts ? counts.subjectsWithValue : <Pending gap="K1" />}</td>
                  <td className="py-1 pr-3">
                    <Pending gap="K2" />
                  </td>
                  <td className="py-1">
                    <Pending gap="K2" />
                  </td>
                </tr>
                {expanded && (
                  <tr className="bg-zinc-900/40">
                    <td />
                    <td colSpan={HEAD.length - 1} className="pb-2 pr-3">
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

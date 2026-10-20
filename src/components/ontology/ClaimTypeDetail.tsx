import { Link } from "react-router-dom";
import { useGet, useInstanceId } from "@/api/hooks";
import { cardOf, type OrientPredicate } from "@/api/schemas";
import { useAtLink } from "@/lib/at";
import { contractName, evidenceMode, targetKinds, type Settler } from "@/lib/ontology";

/**
 * One ClaimType in full, on demand: description, value, evidence and its
 * admission rules (one `get ClaimType:` read), freshness, roles, and who may
 * settle it. Moved from the type map panel; the kind page expands rows into it.
 */
export function ClaimTypeDetail({
  descriptor,
  settlers,
  kind,
}: {
  descriptor: OrientPredicate;
  settlers: Settler[] | null;
  kind: string;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const card = useGet(`ClaimType:${descriptor.predicate}`);
  const rules = cardOf(card.data, "claim_type")?.evidence_rules ?? [];
  const targets = targetKinds(descriptor.type);
  const otherKinds = (descriptor.subject_kinds ?? []).filter((k) => k !== kind);
  return (
    <div className="space-y-1 text-[12px] text-zinc-400">
      <div className="break-all font-mono text-[11px] text-zinc-500">{descriptor.predicate}</div>
      {descriptor.description && <div className="text-zinc-300">{descriptor.description}</div>}
      <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5">
        <dt className="text-zinc-600">value</dt>
        <dd className="break-words">
          {targets.length > 0
            ? targets.map((target) => (
                <Link key={target} to={link(`/i/${instanceId}/kinds/${encodeURIComponent(target)}`)} className="mr-1.5 font-mono text-zinc-300 hover:underline">
                  {target}
                </Link>
              ))
            : descriptor.type === "subject"
              ? "any Subject kind"
              : descriptor.type}
          {descriptor.members && ` (${descriptor.members.map(String).join(", ")})`}
        </dd>
        {(descriptor.member_descriptions?.length ?? 0) > 0 && (
          <>
            <dt className="text-zinc-600">members</dt>
            <dd>
              {descriptor.member_descriptions!.map((m) => (
                <div key={String(m.member)}>
                  <span className="font-mono text-zinc-300">{String(m.member)}</span> {m.description}
                </div>
              ))}
            </dd>
          </>
        )}
        <dt className="text-zinc-600">evidence</dt>
        <dd>
          {evidenceMode(descriptor) === "captured"
            ? "a Capture under one of these contracts is required"
            : evidenceMode(descriptor) === "none"
              ? "takes no evidence"
              : "the author's own words may stand; Captures add support"}
          {(descriptor.evidence?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-x-2">
              {descriptor.evidence!.map((contract) => (
                <Link key={contract} to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(contract))}`)} className="font-mono text-zinc-300 hover:underline">
                  {contractName(contract)}
                </Link>
              ))}
            </div>
          )}
        </dd>
        {descriptor.stale_after && (
          <>
            <dt className="text-zinc-600">stale after</dt>
            <dd className="font-mono">{descriptor.stale_after}</dd>
          </>
        )}
        {descriptor.revision_evidence && (
          <>
            <dt className="text-zinc-600">on revision</dt>
            <dd>{descriptor.revision_evidence} evidence</dd>
          </>
        )}
        {(descriptor.roles?.length ?? 0) > 0 && (
          <>
            <dt className="text-zinc-600">roles</dt>
            <dd>
              {descriptor.roles!.join(", ")}
              {descriptor.default_role && ` (default ${descriptor.default_role})`}
            </dd>
          </>
        )}
        {otherKinds.length > 0 && (
          <>
            <dt className="text-zinc-600">also on</dt>
            <dd>
              {otherKinds.map((k) => (
                <Link key={k} to={link(`/i/${instanceId}/kinds/${encodeURIComponent(k)}?claim_type=${encodeURIComponent(descriptor.predicate)}`)} className="mr-1.5 font-mono text-zinc-300 hover:underline">
                  {k}
                </Link>
              ))}
            </dd>
          </>
        )}
        <dt className="text-zinc-600">settled by</dt>
        <dd>
          {settlers === null
            ? "…"
            : settlers.length === 0
              ? "review: no live settle Mandate scopes it"
              : settlers.map((s) => (
                  <div key={`${s.line}\n${s.mandate}`}>
                    <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(s.line)}`)} className="font-mono text-zinc-300 hover:underline">
                      {s.line}
                    </Link>{" "}
                    <span className="text-zinc-500">
                      {s.kind === "settles" ? "settles" : "proposes (Line capped at propose)"} under {s.mandate}
                    </span>
                  </div>
                ))}
        </dd>
      </dl>
      {card.isPending && <div className="animate-pulse text-zinc-600">Loading evidence rules…</div>}
      {card.error && <div className="text-red-400/80">{card.error.message}</div>}
      {rules.length > 0 && (
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Evidence rules</div>
          {rules.map((rule) => (
            <div key={rule.rule_id} className="mt-0.5">
              <span className="font-mono text-zinc-300">{rule.rule_id}</span>{" "}
              <span className="text-zinc-500">
                {rule.admission} · {rule.roles.join(", ")} · {rule.contracts.map(contractName).join(", ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

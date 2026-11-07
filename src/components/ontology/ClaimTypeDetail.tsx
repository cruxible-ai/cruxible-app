import { Link } from "react-router-dom";
import { roleWord } from "@/lib/vocabulary";
import { useGet, useInstanceId, usePins } from "@/api/hooks";
import { RefLink } from "@/components/RefLink";
import { GuidedBy } from "@/components/Backlinks";
import { cardOf, type OrientPredicate } from "@/api/schemas";
import { useAtLink } from "@/lib/at";
import { sentence } from "@/lib/text";
import { contractName, evidenceMode, pinnersOf, refKind, targetKinds, type Settler } from "@/lib/ontology";

/**
 * One ClaimType in full, on demand: description, value, evidence and its
 * admission rules (one `get ClaimType:` read), freshness, roles, who may
 * settle it, and which definitions pin it (the pins section, shared with
 * every page that asks "who uses this"). The kind page expands rows into it.
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
  const pins = usePins();
  const pinners = pins.data ? pinnersOf(pins.data.rows, `ClaimType:${descriptor.predicate}`) : null;
  const pinnerKinds = [...new Set((pinners ?? []).map((p) => refKind(p.source)))].sort();
  return (
    <div className="space-y-1 text-[12px] text-zinc-400">
      <div className="break-all font-mono text-[11px] text-zinc-500">{descriptor.predicate}</div>
      {descriptor.description && <div className="text-zinc-300">{descriptor.description}</div>}
      <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5">
        <dt className="text-zinc-600">Value</dt>
        <dd className="break-words">
          {targets.length > 0
            ? targets.map((target) => (
                <Link key={target} to={link(`/i/${instanceId}/kinds/${encodeURIComponent(target)}`)} className="mr-1.5 font-mono text-zinc-300 hover:underline">
                  {target}
                </Link>
              ))
            : descriptor.type === "subject"
              ? "Any Subject kind"
              : descriptor.type}
          {descriptor.members && ` (${descriptor.members.map(String).join(", ")})`}
        </dd>
        {(descriptor.member_descriptions?.length ?? 0) > 0 && (
          <>
            <dt className="text-zinc-600">Members</dt>
            <dd>
              {descriptor.member_descriptions!.map((m) => (
                <div key={String(m.member)}>
                  <span className="font-mono text-zinc-300">{String(m.member)}</span> {m.description}
                </div>
              ))}
            </dd>
          </>
        )}
        <dt className="text-zinc-600">Evidence</dt>
        <dd>
          {evidenceMode(descriptor) === "captured"
            ? "A Capture under one of these contracts is required"
            : evidenceMode(descriptor) === "none"
              ? "Takes no evidence"
              : "The author's own words may stand; Captures add support"}
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
            <dt className="text-zinc-600">Stale after</dt>
            <dd className="font-mono">{descriptor.stale_after}</dd>
          </>
        )}
        {descriptor.revision_evidence && (
          <>
            <dt className="text-zinc-600">On revision</dt>
            <dd>{descriptor.revision_evidence} evidence</dd>
          </>
        )}
        {(descriptor.roles?.length ?? 0) > 0 && (
          <>
            <dt className="text-zinc-600">Roles</dt>
            <dd>
              {sentence(descriptor.roles!.map(roleWord).join(", "))}
              {descriptor.default_role && ` (default ${roleWord(descriptor.default_role)})`}
            </dd>
          </>
        )}
        {otherKinds.length > 0 && (
          <>
            <dt className="text-zinc-600">Also on</dt>
            <dd>
              {otherKinds.map((k) => (
                <Link key={k} to={link(`/i/${instanceId}/kinds/${encodeURIComponent(k)}?claim_type=${encodeURIComponent(descriptor.predicate)}`)} className="mr-1.5 font-mono text-zinc-300 hover:underline">
                  {k}
                </Link>
              ))}
            </dd>
          </>
        )}
        <dt className="text-zinc-600">Settled by</dt>
        <dd>
          {settlers === null
            ? "…"
            : settlers.length === 0
              ? "Review: no live settle Mandate scopes it"
              : settlers.map((s) => (
                  <div key={`${s.line}\n${s.mandate}`}>
                    <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(s.line)}`)} className="font-mono text-zinc-300 hover:underline">
                      {s.line}
                    </Link>{" "}
                    <span className="text-zinc-500">
                      {s.kind === "settles" ? "settles" : s.kind === "suspended" ? "would settle, but the Mandate is suspended" : "proposes (Line capped at propose)"} under {s.mandate}
                    </span>
                  </div>
                ))}
        </dd>
        <dt className="text-zinc-600">Guided by</dt>
        <dd>
          <GuidedBy target={`ClaimType:${descriptor.predicate}`} />
        </dd>
        <dt className="text-zinc-600">Pinned by</dt>
        <dd>
          {pinners === null ? (
            pins.error ? <span className="text-red-400/80">{pins.error.message}</span> : "…"
          ) : pinners.length === 0 ? (
            "No live definition pins it"
          ) : (
            pinnerKinds.map((k) => {
              const of = [...new Set(pinners.filter((p) => refKind(p.source) === k).map((p) => p.source))].sort();
              return (
                <div key={k}>
                  <span className="text-zinc-500">
                    {k} ({of.length}):
                  </span>{" "}
                  {of.map((source) => (
                    <RefLink key={source} value={source} className="mr-2">
                      <span className="font-mono text-[12px]">{source.slice(k.length + 1)}</span>
                    </RefLink>
                  ))}
                </div>
              );
            })
          )}
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

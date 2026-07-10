import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useInstanceId, useInstanceSchema } from "@/api/hooks";
import { Chip } from "@/components/Chip";
import { EvidenceRef, type EvidenceRefData } from "@/components/EvidenceRef";
import { PanelHeading, PanelSection } from "@/components/graph/PanelBits";
import { formatDateTime, humanize, looksLikeDateTime } from "@/lib/text";

/** The full trust dossier an edge carries on the wire. */
export interface EdgeMetadata {
  provenance?: {
    source?: string | null;
    source_ref?: string | null;
    created_at?: string | null;
    receipt_id?: string | null;
    created_actor_context?: { actor_id?: string | null; actor_type?: string | null } | null;
  } | null;
  assertion?: {
    review?: {
      status?: string | null;
      source?: string | null;
      updated_at?: string | null;
      updated_by?: string | null;
    } | null;
    lifecycle?: {
      status?: string | null;
      reason?: string | null;
      supersedes?: string | null;
      superseded_by?: string | null;
    } | null;
    group_override?: boolean;
  } | null;
  evidence?: {
    rationale?: string | null;
    evidence_refs?: EvidenceRefData[] | null;
    source_receipt_ids?: string[] | null;
  } | null;
}

/**
 * Engine-true stroke taxonomy. Governance is declared per relationship type
 * (write_policy: proposal_only); review state is per assertion. Deterministic
 * edges are grey — review does not apply to them, which is different from
 * "not yet reviewed". Non-active lifecycle renders dashed.
 */
/**
 * Relationship types whose edges exist only through the propose→review
 * lifecycle (write_policy: proposal_only in the composed schema).
 */
export function useGovernedRelationshipTypes(): Set<string> {
  const schema = useInstanceSchema();
  return useMemo(() => {
    const raw = (schema.data as { relationships?: unknown } | undefined)?.relationships;
    const list = Array.isArray(raw) ? raw : raw ? Object.values(raw) : [];
    return new Set(
      (list as Array<{ name?: string; write_policy?: string | null }>)
        .filter((r) => r.write_policy === "proposal_only" && typeof r.name === "string")
        .map((r) => r.name as string),
    );
  }, [schema.data]);
}

/** The authoritative assertion vocabulary is unreviewed|pending|approved|
 * rejected ("accepted" is the read-FILTER name that maps to approved —
 * different layer, verified in core). */
const POSITIVE_REVIEW = new Set(["approved"]);
const NEGATIVE_REVIEW = new Set(["rejected"]);

/** RGBA 0-255 rgb + 0-1 alpha. One table feeds both the SVG strokes (cards,
 * PathGraph) and the WebGL dots renderer, so review-state colors can't
 * drift between the two. */
export type EdgeRgba = readonly [number, number, number, number];
const STROKE_UNGOVERNED: EdgeRgba = [162, 159, 148, 0.5];
const STROKE_APPROVED: EdgeRgba = [48, 209, 88, 0.75];
const STROKE_REJECTED: EdgeRgba = [255, 69, 58, 0.75];
const STROKE_PENDING: EdgeRgba = [255, 178, 36, 0.8];
/** GL lines can't dash; inactive-lifecycle edges drop to this fraction of
 * their base alpha instead (see DECISION.md). */
const INACTIVE_ALPHA_FACTOR = 0.45;

export function edgeStrokeRgba(
  governed: boolean,
  reviewStatus: string | null | undefined,
  lifecycleStatus: string | null | undefined,
): { rgba: EdgeRgba; inactive: boolean } {
  const base = !governed
    ? STROKE_UNGOVERNED
    : POSITIVE_REVIEW.has(reviewStatus ?? "")
      ? STROKE_APPROVED
      : NEGATIVE_REVIEW.has(reviewStatus ?? "")
        ? STROKE_REJECTED
        : STROKE_PENDING;
  const inactive = lifecycleStatus != null && lifecycleStatus !== "active";
  return {
    rgba: inactive
      ? [base[0], base[1], base[2], base[3] * INACTIVE_ALPHA_FACTOR]
      : base,
    inactive,
  };
}

export function edgeStroke(
  governed: boolean,
  reviewStatus: string | null | undefined,
  lifecycleStatus: string | null | undefined,
): { stroke: string; strokeDasharray?: string } {
  // SVG keeps the full base alpha and carries "inactive" as a dash instead.
  const { rgba } = edgeStrokeRgba(governed, reviewStatus, null);
  const stroke = `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`;
  const dashed = lifecycleStatus != null && lifecycleStatus !== "active";
  return dashed ? { stroke, strokeDasharray: "5 4" } : { stroke };
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="contents">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="min-w-0 break-all text-zinc-300">{children}</dd>
    </div>
  );
}

const GROUP_REF_RE = /(GRP-[a-f0-9]+)/;

/**
 * Group references appear in review/provenance as e.g. "group:GRP-…" —
 * the group page is the first-class review surface, so they link there.
 */
function MaybeGroupRef({ value }: { value: string }) {
  const instanceId = useInstanceId();
  const match = GROUP_REF_RE.exec(value);
  if (!match) return <span className="font-mono text-[10px]">{value}</span>;
  return (
    <Link
      to={`/i/${instanceId}/groups/${match[1]}`}
      className="font-mono text-[10px] hover:underline"
    >
      {value}
    </Link>
  );
}

/**
 * The edge context panel: what kind of write this is, its review state and
 * who moved it there, where it came from (with receipt links), its lifecycle,
 * and the evidence backing it — the governance surface Cruxible actually
 * records, not just a two-word summary.
 */
export function EdgeGovernancePanel({
  relationshipType,
  governed,
  properties,
  metadata,
  sourceLabel,
  targetLabel,
  onSelectSource,
  onSelectTarget,
}: {
  relationshipType: string;
  governed: boolean;
  properties?: Record<string, unknown> | null;
  metadata?: EdgeMetadata | null;
  sourceLabel: string;
  targetLabel: string;
  onSelectSource: () => void;
  onSelectTarget: () => void;
}) {
  const instanceId = useInstanceId();
  const review = metadata?.assertion?.review;
  const lifecycle = metadata?.assertion?.lifecycle;
  const provenance = metadata?.provenance;
  const evidence = metadata?.evidence;
  const dl = "grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 text-[12px]";

  return (
    <div>
      <PanelHeading kicker="Relationship" title={relationshipType.replaceAll("_", " ")} />
      <div className="flex flex-col gap-0.5 text-[13px]">
        <button onClick={onSelectSource} className="text-left text-zinc-300 hover:underline">
          {sourceLabel}
        </button>
        <span className="text-zinc-600">↓</span>
        <button onClick={onSelectTarget} className="text-left text-zinc-300 hover:underline">
          {targetLabel}
        </button>
      </div>
      <div className="mt-1.5 text-[12px] text-zinc-500">
        {governed
          ? "Governed relationship — proposal-only writes, review-gated"
          : "Deterministic relationship — direct canonical writes; review does not apply"}
      </div>

      {governed && (
        <PanelSection title="Review">
          <dl className={dl}>
            <Row label="Status">
              <Chip value={review?.status ?? "unreviewed"} />
            </Row>
            {review?.source && <Row label="Via">{humanize(review.source)}</Row>}
            {review?.updated_by && (
              <Row label="By">
                <MaybeGroupRef value={review.updated_by} />
              </Row>
            )}
            {review?.updated_at && (
              <Row label="When">
                <span title={review.updated_at}>{formatDateTime(review.updated_at)}</span>
              </Row>
            )}
            {metadata?.assertion?.group_override && <Row label="Group override">yes</Row>}
          </dl>
        </PanelSection>
      )}

      {provenance && (
        <PanelSection title="Provenance">
          <dl className={dl}>
            {provenance.source && <Row label="Written by">{humanize(provenance.source)}</Row>}
            {provenance.source_ref && (
              <Row label="Ref">
                <MaybeGroupRef value={provenance.source_ref} />
              </Row>
            )}
            {provenance.created_actor_context?.actor_id && (
              <Row label="Actor">
                <span className="font-mono">{provenance.created_actor_context.actor_id}</span>
              </Row>
            )}
            {provenance.created_at && (
              <Row label="Created">
                <span title={provenance.created_at}>{formatDateTime(provenance.created_at)}</span>
              </Row>
            )}
            {provenance.receipt_id && (
              <Row label="Receipt">
                <Link
                  to={`/i/${instanceId}/receipts/${provenance.receipt_id}`}
                  className="font-mono text-[10px] hover:underline"
                >
                  {provenance.receipt_id}
                </Link>
              </Row>
            )}
          </dl>
        </PanelSection>
      )}

      {lifecycle && (lifecycle.status ?? "active") !== "active" && (
        <PanelSection title="Lifecycle">
          <dl className={dl}>
            <Row label="Status">
              <Chip value={lifecycle.status ?? "active"} />
            </Row>
            {lifecycle.reason && <Row label="Reason">{lifecycle.reason}</Row>}
            {lifecycle.supersedes && (
              <Row label="Supersedes">
                <span className="font-mono text-[10px]">{lifecycle.supersedes}</span>
              </Row>
            )}
            {lifecycle.superseded_by && (
              <Row label="Superseded by">
                <span className="font-mono text-[10px]">{lifecycle.superseded_by}</span>
              </Row>
            )}
          </dl>
        </PanelSection>
      )}

      {Object.keys(properties ?? {}).length > 0 && (
        <PanelSection title="Edge properties">
          <dl className={dl}>
            {Object.entries(properties ?? {}).map(([k, v]) => (
              <Row key={k} label={humanize(k)}>
                {looksLikeDateTime(v) ? formatDateTime(v) : String(v)}
              </Row>
            ))}
          </dl>
        </PanelSection>
      )}

      {(evidence?.rationale ||
        (evidence?.evidence_refs ?? []).length > 0 ||
        (evidence?.source_receipt_ids ?? []).length > 0) && (
        <PanelSection title="Evidence">
          {evidence?.rationale && (
            <p className="mb-1 text-[12px] italic leading-4 text-zinc-400">{evidence.rationale}</p>
          )}
          {(evidence?.evidence_refs ?? []).map((ref, i) => (
            <EvidenceRef key={i} refData={ref} />
          ))}
          {(evidence?.source_receipt_ids ?? []).map((rid) => (
            <Link
              key={rid}
              to={`/i/${instanceId}/receipts/${rid}`}
              className="mr-2 font-mono text-[10px] text-zinc-400 hover:underline"
            >
              {rid}
            </Link>
          ))}
        </PanelSection>
      )}
    </div>
  );
}

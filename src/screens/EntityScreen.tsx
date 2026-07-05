import { Link, useParams } from "react-router-dom";
import { useInspectEntity, useInstanceId, useQueryCatalog } from "@/api/hooks";
import { Chip } from "@/components/Chip";
import { EntityLink } from "@/components/EntityLink";
import { EvidenceRef, type EvidenceRefData } from "@/components/EvidenceRef";
import { Panel, LoadState } from "@/components/Panel";
import { Prose } from "@/components/Prose";
import { formatDateTime, humanize, looksLikeDateTime } from "@/lib/text";
import { ArrowRight, Waypoints } from "lucide-react";
import { isEntityRef } from "@/api/items";
import { isColdEntity } from "@/lib/cold";
import { useSettings } from "@/lib/settings";

interface NeighborEdge {
  direction: "incoming" | "outgoing";
  relationship_type: string;
  edge_key: number;
  properties: Record<string, unknown>;
  metadata: {
    provenance?: { source?: string; source_ref?: string; created_at?: string };
    assertion?: { review?: { status?: string; source?: string }; lifecycle?: { status?: string } };
    evidence?: {
      evidence_refs?: EvidenceRefData[];
      rationale?: string;
      source_receipt_ids?: string[];
    };
  };
  entity: unknown;
}

/**
 * Entity context panel: identity + properties, then every relationship with
 * its trust metadata (who wrote it, review state, evidence refs) rendered
 * inline — edges are never unexplained memory.
 */
export function EntityScreen() {
  const { entityType = "", entityId = "" } = useParams();
  const instanceId = useInstanceId();
  const inspect = useInspectEntity(entityType, entityId);
  const catalog = useQueryCatalog();
  const { settings } = useSettings();

  if (inspect.isPending) return <LoadState />;
  if (inspect.error) return <LoadState error={inspect.error} />;
  const data = inspect.data as {
    found: boolean;
    entity_type: string;
    entity_id: string;
    properties: Record<string, unknown>;
    neighbors: NeighborEdge[];
    total_neighbors: number;
  };
  if (!data.found) {
    return <div className="text-[13px] text-zinc-500">Entity not found.</div>;
  }

  const { properties } = data;
  const title = typeof properties.title === "string" ? properties.title : undefined;
  const summary = typeof properties.summary === "string" ? properties.summary : undefined;
  const chipKeys = ["status", "priority", "type"].filter(
    (k) => typeof properties[k] === "string",
  );
  const hidden = ["title", "summary", ...chipKeys];
  const restProps = Object.entries(properties).filter(
    ([k, v]) =>
      !hidden.includes(k) &&
      v !== data.entity_id &&
      (typeof v !== "string" || v.length < 200),
  );
  // Long prose fields (note bodies, descriptions, rationale) get their own
  // markdown blocks instead of being dropped from the panel.
  const proseProps = Object.entries(properties).filter(
    (e): e is [string, string] =>
      !hidden.includes(e[0]) && typeof e[1] === "string" && e[1].length >= 200,
  );

  // Context queries whose entry point is this entity type, e.g.
  // work_item_change_context for a WorkItem — linked, not duplicated here.
  const contextQueries = (catalog.data?.items ?? []).filter(
    (q) => q.entry_point === data.entity_type && (q.required_params ?? []).length > 0,
  );

  const visibleNeighbors = settings.hideCold
    ? data.neighbors.filter((n) => !isColdEntity(n.entity))
    : data.neighbors;
  const hiddenNeighbors = data.neighbors.length - visibleNeighbors.length;

  const grouped = new Map<string, NeighborEdge[]>();
  for (const n of visibleNeighbors) {
    const key = `${n.direction}:${n.relationship_type}`;
    grouped.set(key, [...(grouped.get(key) ?? []), n]);
  }

  return (
    <div className="space-y-3">
      <header>
        <div className="flex items-center gap-3 text-[12px]">
          <span className="text-zinc-400">{humanize(data.entity_type)}</span>
          <span className="font-mono text-[11px] text-zinc-600">{data.entity_id}</span>
          <Link
            to={`/i/${instanceId}/g/${data.entity_type}/${data.entity_id}`}
            className="ml-auto inline-flex items-center gap-1.5 rounded border border-zinc-700 px-2 py-0.5 text-[11px] text-zinc-300 hover:border-zinc-500 hover:bg-zinc-900"
          >
            <Waypoints className="h-3 w-3" />
            View graph
          </Link>
        </div>
        <h1 className="mt-1 text-[17px] font-semibold text-zinc-100">{title ?? data.entity_id}</h1>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {chipKeys.map((k) => (
            <span key={k} className="inline-flex items-center gap-1 text-[11px] text-zinc-600">
              {k !== "status" && k}
              <Chip value={String(properties[k])} />
            </span>
          ))}
        </div>
        {summary && <div className="mt-2"><Prose text={summary} /></div>}
      </header>

      {contextQueries.length > 0 && (
        <div className="flex flex-wrap gap-2 text-[12px]">
          {contextQueries.map((q) => {
            const param = (q.required_params ?? [])[0];
            return (
              <Link
                key={q.name}
                to={`/i/${instanceId}/views/${q.name}?${param}=${encodeURIComponent(data.entity_id)}`}
                className="rounded border border-zinc-800 px-2 py-0.5 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              >
                {humanize(q.name ?? "")}
                <ArrowRight className="ml-1 inline h-3 w-3" />
              </Link>
            );
          })}
        </div>
      )}

      {restProps.length > 0 && (
        <Panel title="Properties">
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[13px]">
            {restProps.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-zinc-500">{k}</dt>
                <dd
                  className="font-mono text-[12px] text-zinc-300 break-all"
                  title={looksLikeDateTime(v) ? String(v) : undefined}
                >
                  {looksLikeDateTime(v) ? formatDateTime(v) : String(v)}
                </dd>
              </div>
            ))}
          </dl>
        </Panel>
      )}

      {proseProps.map(([k, v]) => (
        <Panel key={k} title={k.replaceAll("_", " ")}>
          <Prose text={v} />
        </Panel>
      ))}

      <Panel
        title="Relationships"
        meta={
          <span>
            <span className="font-mono">{data.total_neighbors}</span>
            {hiddenNeighbors > 0 && <> · {hiddenNeighbors} cold hidden</>}
          </span>
        }
      >
        <div className="space-y-3">
          {[...grouped.entries()].map(([key, edges]) => (
            <GroupedEdges key={key} edges={edges} />
          ))}
          {data.neighbors.length === 0 && (
            <div className="text-[13px] text-zinc-600">No relationships.</div>
          )}
          {data.neighbors.length > 0 && visibleNeighbors.length === 0 && (
            <div className="text-[13px] text-zinc-600">
              All {data.neighbors.length} relationships point at cold entities
              (hidden by settings).
            </div>
          )}
        </div>
      </Panel>
    </div>
  );
}

/**
 * One relationship group. When review status and provenance are uniform
 * across the group (the common case for direct-written state), they are
 * stated once in the group header instead of repeated on every row.
 */
function GroupedEdges({ edges }: { edges: NeighborEdge[] }) {
  const reviews = new Set(edges.map((n) => n.metadata.assertion?.review?.status ?? ""));
  const sources = new Set(
    edges.map((n) => n.metadata.provenance?.source_ref ?? n.metadata.provenance?.source ?? ""),
  );
  const uniformReview = reviews.size === 1 ? [...reviews][0] : null;
  const uniformSource = sources.size === 1 ? [...sources][0] : null;
  return (
    <details open={edges.length <= 8}>
      <summary className="mb-1 cursor-pointer list-none text-[11px] uppercase tracking-wide text-zinc-600 hover:text-zinc-400">
        {edges[0]!.direction === "outgoing" ? "→" : "←"}{" "}
        {edges[0]!.relationship_type.replaceAll("_", " ")}{" "}
        <span className="font-mono normal-case">({edges.length})</span>
        {uniformReview && (
          <span className="ml-2 normal-case tracking-normal text-zinc-600">
            {humanize(uniformReview)}
            {uniformSource && ` · via ${uniformSource}`}
          </span>
        )}
      </summary>
      <div className="space-y-1.5">
        {edges.map((n) => (
          <NeighborRow
            key={n.edge_key}
            edge={n}
            hideReview={uniformReview !== null}
            hideProvenance={uniformSource !== null}
          />
        ))}
      </div>
    </details>
  );
}

function NeighborRow({
  edge,
  hideReview = false,
  hideProvenance = false,
}: {
  edge: NeighborEdge;
  hideReview?: boolean;
  hideProvenance?: boolean;
}) {
  const instanceId = useInstanceId();
  const e = edge.entity;
  const review = edge.metadata.assertion?.review?.status;
  const provenance = edge.metadata.provenance;
  const evidence = edge.metadata.evidence;

  return (
    <div className="rounded border border-zinc-800/70 bg-zinc-900/30 px-2.5 py-1.5">
      <div className="flex flex-wrap items-center gap-2 text-[13px]">
        {isEntityRef(e) ? (
          <>
            <span className="text-[11px] text-zinc-600">{e.entity_type}</span>
            <EntityLink entityType={e.entity_type} entityId={e.entity_id}>
              <span>
                {typeof e.properties.title === "string" ? e.properties.title : e.entity_id}
              </span>
            </EntityLink>
            {typeof e.properties.status === "string" && <Chip value={e.properties.status} />}
          </>
        ) : (
          <span className="text-zinc-500">(entity unavailable)</span>
        )}
        <span className="ml-auto flex items-center gap-2 text-[11px] text-zinc-500">
          {review && !hideReview && <Chip value={review} />}
          {provenance?.source && !hideProvenance && (
            <span title={provenance.created_at}>
              via <span className="font-mono">{provenance.source_ref ?? provenance.source}</span>
            </span>
          )}
        </span>
      </div>
      {(evidence?.rationale || (evidence?.evidence_refs ?? []).length > 0) && (
        <div className="mt-1 border-t border-zinc-800/50 pt-1 text-[12px] text-zinc-500">
          {evidence?.rationale && <p className="italic">{evidence.rationale}</p>}
          {(evidence?.evidence_refs ?? []).map((ref, i) => (
            <EvidenceRef key={i} refData={ref} />
          ))}
          {(evidence?.source_receipt_ids ?? []).map((rid) => (
            <Link
              key={rid}
              to={`/i/${instanceId}/receipts/${rid}`}
              className="mr-2 font-mono text-[11px] text-zinc-400 hover:underline"
            >
              {rid}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

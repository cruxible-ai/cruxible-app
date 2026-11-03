import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIncoming, useInstanceId, useOntologyKinds } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { CosmosDots, type GlDotEdge, type GlDotNode } from "@/components/graph/CosmosDots";
import { Panel } from "@/components/Panel";
import { useAtLink } from "@/lib/at";
import { parseRef } from "@/lib/cruxible-ref";
import { buildTypeColors } from "@/lib/type-colors";

/** At most this many neighbors are drawn; the State graph shows the rest. */
const NEIGHBOR_CAP = 60;
const EDGE_RGBA: GlDotEdge["rgba"] = [140, 136, 122, 0.55];

function webglAvailable(): boolean {
  try {
    return !!document.createElement("canvas").getContext("webgl");
  } catch {
    return false;
  }
}

function kindOf(ref: string): string {
  return ref.slice(0, ref.indexOf("/"));
}

function idOf(ref: string): string {
  return ref.slice(ref.indexOf("/") + 1);
}

/**
 * One Subject's links, one hop in and out, drawn in the State graph's dots:
 * the Subject itself plus what it points at (its Subject-valued fields) and
 * what points at it (the first page of incoming Claims). Mounted once
 * scrolled into view, capped, a click walks to the neighbor's page; the State
 * graph (focused here) is for exploring further.
 */
export function ConnectionsPanel({ subject }: { subject: Schemas["GetSubjectCard"] }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const navigate = useNavigate();
  const holder = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = holder.current;
    // No observer (or no WebGL to draw with): the graph is not drawn; the list beside it carries the links.
    if (!el || typeof IntersectionObserver === "undefined" || !webglAvailable()) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const incoming = useIncoming(visible ? subject.subject : null);
  const kinds = useOntologyKinds();
  const colorOf = useMemo(() => buildTypeColors((kinds.data?.kinds ?? []).map((k) => k.kind)), [kinds.data]);

  const drawn = useMemo(() => {
    const links: { claim: string; source: string; target: string; label: string }[] = [];
    for (const claim of subject.claims) {
      const values = Array.isArray(claim.value) ? claim.value : [claim.value];
      const claimIds = Array.isArray(claim.claim) ? claim.claim : [claim.claim];
      values.forEach((value, i) => {
        if (typeof value === "string" && parseRef(value)?.kind === "subject" && value !== subject.subject) {
          links.push({ claim: claimIds[i] ?? claimIds[0]!, source: subject.subject, target: value, label: claim.predicate });
        }
      });
    }
    for (const claim of incoming.data?.incoming?.claims ?? []) {
      links.push({ claim: claim.claim, source: claim.subject, target: subject.subject, label: claim.predicate });
    }
    const neighbors: string[] = [];
    for (const l of links) {
      const other = l.source === subject.subject ? l.target : l.source;
      if (!neighbors.includes(other)) neighbors.push(other);
    }
    const shown = new Set([subject.subject, ...neighbors.slice(0, NEIGHBOR_CAP)]);
    const nodes: GlDotNode[] = [...shown].map((ref) => ({ id: ref, title: idOf(ref) }));
    const colors = nodes.map((n) => colorOf(kindOf(n.id)));
    const edges: GlDotEdge[] = links
      .filter((l) => shown.has(l.source) && shown.has(l.target))
      .map((l) => ({ id: l.claim, source: l.source, target: l.target, rgba: EDGE_RGBA, label: l.label }));
    const hidden = Math.max(0, neighbors.length - NEIGHBOR_CAP);
    return { nodes, colors, edges, neighbors: neighbors.length, hidden };
  }, [subject, incoming.data, colorOf]);

  const more = Math.max(0, subject.incoming_count - (incoming.data?.incoming?.claims?.length ?? 0)) + drawn.hidden;
  const graphHref = link(`/i/${instanceId}/graph?focus=${encodeURIComponent(subject.subject)}`);
  return (
    <Panel
      title="Connections"
      meta={
        <span className="flex gap-3">
          <Link to={graphHref} className="hover:text-zinc-200" title={more > 0 ? `${more} more links are in the State graph` : undefined}>
            Open in State graph →
          </Link>
        </span>
      }
    >
      <div ref={holder} className="min-h-[380px]">
        {visible && drawn.nodes.length > 1 ? (
          <CosmosDots
            nodes={drawn.nodes}
            edges={drawn.edges}
            nodeColors={drawn.colors}
            className="h-[380px]"
            expandable
            expandedHeight="600px"
            compact
            selectRequest={{ id: subject.subject, nonce: 1 }}
            onNodeClick={(ref) => {
              if (ref !== subject.subject) navigate(link(`/i/${instanceId}/s/${encodeURIComponent(ref)}`));
            }}
            renderPanel={() => null}
          />
        ) : (
          visible && <div className="text-[13px] text-zinc-600">None</div>
        )}
      </div>
    </Panel>
  );
}

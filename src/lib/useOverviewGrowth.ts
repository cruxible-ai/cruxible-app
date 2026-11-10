import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { useApiClient } from "@/api/DataSourceContext";
import { unwrap } from "@/api/data-source";
import { useInstanceId } from "@/api/hooks";
import { headQuery, orientQuery } from "@/api/requests";
import type { OrientPredicate } from "@/api/schemas";
import { isCoreIdentity } from "@/lib/ontology";
import type { GrowthPoint } from "@/lib/overview";

/** Largest orient page (the route's cap): one page holds every ClaimType of a kit-sized instance. */
const ORIENT_PAGE = 500;

/** Generations read at once: the chart fills in as they land, and the daemon stays free for the next screen. */
export const GROWTH_CONCURRENCY = 2;

/**
 * Live Claims per kind at one generation, from its claim_types section: each
 * ClaimType's live Claims (its evidence counts, which partition them) added
 * to the kinds it is about. Core identity ClaimTypes are left out, as the
 * kind detail's tally leaves them out.
 */
export function claimsByKind(rows: readonly OrientPredicate[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const row of rows) {
    if (isCoreIdentity(row.predicate) || !row.evidence_counts) continue;
    const live = row.evidence_counts.admitted + row.evidence_counts.own_word + row.evidence_counts.unmet;
    for (const kind of row.subject_kinds ?? []) out.set(kind, (out.get(kind) ?? 0) + live);
  }
  return out;
}

/**
 * Live Claims per kind at earlier generations, for the Overview's growth
 * chart: per generation, GET /head?at=N (its coordinate) and that
 * generation's claim_types section (each ClaimType's live Claims and the
 * kinds it is about; when it was accepted). Two reads a generation,
 * {@link GROWTH_CONCURRENCY} generations at a time, newest first, so the chart
 * draws as points land and a screen opened next is not queued behind it.
 * Requests grow with the generations sampled, never with kinds, Subjects or
 * Claims; a generation's reads never change, so they are cached for good. The
 * page's own generation is not read here (the page already holds it).
 */
export function useGrowthPoints(sequences: readonly number[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  // newest first: the right of the chart, beside the head, fills first
  const order = [...sequences].sort((a, b) => b - a);
  const [admitted, setAdmitted] = useState(GROWTH_CONCURRENCY);
  const results = useQueries({
    queries: order.map((sequence, i) => ({
      queryKey: ["overview-growth", instanceId, sequence],
      staleTime: Infinity,
      enabled: i < admitted,
      queryFn: async (): Promise<GrowthPoint> => {
        const head = unwrap(
          await client.GET("/api/v1/{instance_id}/head", {
            params: { path: { instance_id: instanceId }, query: headQuery(String(sequence)) },
          }),
        );
        const page = unwrap(
          await client.GET("/api/v1/{instance_id}/orient", {
            params: { path: { instance_id: instanceId }, query: orientQuery({ coordinate: head.coordinate, section: "claim_types", limit: ORIENT_PAGE }) },
          }),
        );
        return { sequence, acceptedAt: page.accepted_at, byKind: claimsByKind(page.claim_types ?? []) };
      },
    })),
  });
  // admit the next generation as each one settles (read or failed)
  const settled = results.filter((r) => r.isSuccess || r.isError).length;
  useEffect(() => {
    setAdmitted((current) => Math.max(current, settled + GROWTH_CONCURRENCY));
  }, [settled]);
  const bySequence = new Map(order.map((sequence, i) => [sequence, results[i]!] as const));
  return {
    pending: settled < order.length,
    // in the order asked (oldest first), null until read
    points: sequences.map((sequence) => bySequence.get(sequence)?.data ?? null),
    failed: results.filter((r) => r.error).length,
  };
}

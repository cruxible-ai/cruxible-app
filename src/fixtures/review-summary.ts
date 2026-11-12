/**
 * A review's summary form built from its members, in the shape core serves
 * (service/proposals/summary.py, simplified: every stored field, not only the
 * changed ones; no findings): one group per artifact kind and disposition, a row per member carrying its stored fields, the fields every
 * row of a group shares said once on the group as `after.<field>` /
 * `before.<field>`, the first `rowsLimit` rows of each group served.
 */
import { defineFixture } from "./fixture";
import { reviewSummaryBody } from "@/api/requests";
import type { Schemas } from "@/api/schemas";

type Member = Schemas["ReviewedMember"];
type Summary = Schemas["ProposalReviewSummary"];
type Value = Schemas["ReviewSummaryValue"];

const ACTION = { create: "created", replace: "revised", retire: "retired", delete: "retired" } as const;
type Disposition = keyof typeof ACTION;

const disposition = (raw: string): Disposition =>
  /^(create|created|stated)$/.test(raw) ? "create" : /^(retire|retired)$/.test(raw) ? "retire" : /^delete/.test(raw) ? "delete" : "replace";

const wrap = (fields: Record<string, unknown> | null): Record<string, Value> | null =>
  fields === null ? null : Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, { value: v as Value["value"] }]));

export function reviewSummary(id: string, members: readonly Member[], extra: Partial<Summary> = {}, rowsLimit = 5): Summary {
  const counts = { created: 0, revised: 0, retired: 0 };
  const groups = new Map<string, { group: Schemas["ReviewSummaryGroup"]; columns: Record<string, unknown>[] }>();
  for (const m of members) {
    const d = disposition(m.disposition);
    counts[ACTION[d]] += 1;
    const key = `${m.artifact_kind}\n${d}`;
    let g = groups.get(key);
    if (!g) {
      g = {
        group: {
          group: key,
          subject_kind: m.artifact_kind,
          artifact_kind: m.artifact_kind,
          disposition: d,
          closure_role: m.closure_role,
          counts: { created: 0, revised: 0, retired: 0 },
          shared_fields: {},
          varying_columns: [],
          rows: [],
        },
        columns: [],
      };
      groups.set(key, g);
    }
    g.group.counts[ACTION[d]] = (g.group.counts[ACTION[d]] ?? 0) + 1;
    const after = m.candidate_semantic_artifact;
    const before = d === "create" ? null : m.base_semantic_artifact;
    g.columns.push({
      ...Object.fromEntries(Object.entries(before ?? {}).map(([k, v]) => [`before.${k}`, v])),
      ...Object.fromEntries(Object.entries(after ?? {}).map(([k, v]) => [`after.${k}`, v])),
    });
    g.group.rows.push({ path: m.path, before: wrap(before), after: wrap(after) });
  }
  for (const { group, columns } of groups.values()) {
    const shared = Object.keys(columns[0] ?? {}).filter((k) => columns.every((c) => JSON.stringify(c[k]) === JSON.stringify(columns[0]![k])));
    group.shared_fields = Object.fromEntries(shared.map((k) => [k, { value: columns[0]![k] as Value["value"] }]));
    group.varying_columns = Object.keys(columns[0] ?? {}).filter((k) => !shared.includes(k));
    const drop = (side: "before" | "after", fields: Record<string, Value> | null) =>
      fields === null ? null : Object.fromEntries(Object.entries(fields).filter(([k]) => !shared.includes(`${side}.${k}`)));
    group.rows = group.rows.map((r) => ({ path: r.path, before: drop("before", r.before), after: drop("after", r.after) }));
    if (group.rows.length > rowsLimit) {
      group.rows = group.rows.slice(0, rowsLimit);
      group.next_cursor = `rows-${group.group}`;
    }
  }
  const list = [...groups.values()].map((g) => g.group);
  return {
    tag: "playbill-proposal-review-summary-v1",
    proposal_id: id,
    candidate_digest: "sha256:" + "c".repeat(64),
    settlement_base: { git_oid: "0".repeat(40), semantic_root: "sha256:" + "0".repeat(64), generation_root: "sha256:" + "0".repeat(64), compiler_digest: "sha256:" + "0".repeat(64) },
    counts,
    subject_kinds: {},
    subject_kind_count: 0,
    required_tier: "governed_write",
    activation_policy: "snapshot",
    approval_requirements: [],
    findings: [],
    finding_count: 0,
    groups: list,
    group_count: list.length,
    ...extra,
  };
}

/** The summary review fixture for proposal `id`. */
export const reviewSummaryFixture = (id: string, response: Summary) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/proposals/{proposal_id}/review",
    pathParams: { proposal_id: id },
    body: reviewSummaryBody(),
    response,
  });

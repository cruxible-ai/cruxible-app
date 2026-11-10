/**
 * Hand-authored reads the Overview makes beyond the rest of the world: the
 * product and release kind details, each logical source's landings, and the
 * earlier generations its growth chart samples (each resolved by number, then
 * orient's first page and one orient(kind=K) per kind holding Subjects there).
 */
import { defineFixture, type RecordedFixture } from "../fixture";
import { headQuery, orientQuery } from "@/api/requests";
import type { AcceptedCoordinate } from "@/api/schemas";
import { growthSequences, GROWTH_WINDOW } from "@/lib/overview";
import { FETCHED } from "./captures";
import { ACCEPTED_AT, AT, COORDINATE, kindDescriptors, KIND_ROWS, NOW } from "./world";

const BASE_ORIENT = {
  tag: "playbill-orient-v1" as const,
  instance: "inst_fixture",
  coordinate: COORDINATE,
  generation: AT.generation,
  accepted_at: ACCEPTED_AT,
  evaluation_time: NOW,
};

const kindDetail = (index: number, kind: string, sample: string[]) =>
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, kind }),
    response: { ...BASE_ORIENT, kind_detail: { ...KIND_ROWS[index]!, predicates: kindDescriptors(kind), incoming: [], sample_subject_ids: sample } },
  });

/**
 * The growth chart's earlier generations: each kind arrives by g12 and its
 * live Claims grow to the head's (kind rows' counts, scaled; KIND_ROWS order).
 */
function growthSample(sequence: number): RecordedFixture[] {
  const coordinate: AcceptedCoordinate = { ...COORDINATE, git_oid: sequence.toString(16).padStart(40, "e") };
  const share = (index: number) => (sequence < 4 + index * 2 ? 0 : Math.min(1, (sequence + 6) / (AT.generation + 6)));
  const held = KIND_ROWS.map((row, index) => ({ row: { ...row, subjects: Math.round(row.subjects * share(index)) }, share: share(index) })).filter(({ row }) => row.subjects > 0);
  const base = { ...BASE_ORIENT, coordinate, generation: sequence, accepted_at: new Date(Date.parse("2026-10-17T09:00:00Z") + sequence * 3_600_000).toISOString() };
  return [
    defineFixture({
      method: "get",
      path: "/api/v1/{instance_id}/head",
      query: headQuery(String(sequence)),
      response: { tag: "playbill-head-v1", instance: "inst_fixture", coordinate, generation: sequence },
    }),
    defineFixture({
      method: "get",
      path: "/api/v1/{instance_id}/orient",
      query: orientQuery({ coordinate, limit: 500 }),
      response: { ...base, kinds: held.map(({ row: { kind, subjects, identity } }) => ({ kind, subjects, identity })) },
    }),
    ...held.map(({ row, share }) =>
      defineFixture({
        method: "get",
        path: "/api/v1/{instance_id}/orient",
        query: orientQuery({ coordinate, kind: row.kind }),
        response: {
          ...base,
          kind_detail: {
            ...row,
            predicates: kindDescriptors(row.kind).map((p) => ({ ...p, live_claims: Math.round((p.live_claims ?? 0) * share) })),
          },
        },
      }),
    ),
  ];
}

export default [
  kindDetail(1, "security.product", ["cruxible"]),
  kindDetail(2, "security.release", ["cruxible-0.3.1", "cruxible-0.3.2"]),

  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "sources", limit: 500 }),
    response: {
      ...BASE_ORIENT,
      section: "sources",
      sources: [
        {
          logical_source: "cisa.kev.catalog",
          landings: 3,
          latest: {
            landed_at: "2026-10-19T06:00:04Z",
            run: "RUN-" + "7".repeat(64),
            line: "Line:kev-triage",
            capture: `CAP-${FETCHED.slice(7, 19)}`,
            ref: `Capture:${FETCHED}`,
            observed_at: "2026-10-19T06:00:03Z",
            size: 1_826_755,
            status: "available",
          },
          contracts: [{ contract: "CaptureContract:security.kev-http-v1", version: 1, landings: 3 }],
        },
      ],
      sources_unattributed: 0,
    },
  }),

  ...growthSequences(Math.max(0, AT.generation - GROWTH_WINDOW + 1), AT.generation)
    .filter((sequence) => sequence !== AT.generation)
    .flatMap(growthSample),
];

import { getBatchBody, orientQuery } from "@/api/requests";
import { AUTHORED } from "@/fixtures/handlers";
import { defineFixture, type RecordedFixture } from "@/fixtures/fixture";
import { AT, COORDINATE, NOW } from "@/fixtures/authored/world";

/**
 * The authored world plus one live Runbook, `demo.maintain`, whose daily
 * Trigger (14:00 UTC) runs cve-applicability (a Line with no Trigger of its
 * own) as step 1: the orient runbooks section and the Runbook's card.
 */
export const RUNBOOK_WAKES: RecordedFixture[] = [
  ...AUTHORED,
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "runbooks", limit: 500 }),
    response: {
      tag: "playbill-orient-v1",
      instance: "inst_fixture",
      coordinate: COORDINATE,
      generation: AT.generation,
      accepted_at: "2026-10-19T09:30:00Z",
      evaluation_time: NOW,
      section: "runbooks",
      runbooks: [{ runbook: "Runbook:demo.maintain", lifecycle: "live", steps: 1, triggers_total: 1, last_run: null }],
    },
  }),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(["Runbook:demo.maintain"], COORDINATE),
    response: {
      tag: "playbill-get-batch-result-v1",
      coordinate: COORDINATE,
      results: [
        {
          tag: "playbill-get-result-v1",
          ref: "Runbook:demo.maintain",
          kind: "runbook",
          detail: "summary",
          coordinate: AT,
          accepted_coordinate: COORDINATE,
          evaluation_time: NOW,
          card: {
            runbook: "Runbook:demo.maintain",
            lifecycle: "live",
            steps: [{ step: 1, target: "Line:cve-applicability", availability: "available" }],
            triggers: [{ trigger: "Trigger:demo.maintain-daily", version: 1, fires: "on cron 0 14 * * * (UTC)" }],
            triggers_total: 1,
            recent_runs: [],
            runs_more: false,
          },
        },
      ],
    },
  }),
];

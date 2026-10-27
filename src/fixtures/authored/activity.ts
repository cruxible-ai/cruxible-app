/**
 * Hand-authored activity feed (orient section=activity) for the fixture
 * world: one page across every family, newest first, with a run whose start
 * and finish are both on the page, a refused run, a stopped Line and a
 * second page behind a cursor.
 */
import { defineFixture } from "../fixture";
import { ACTIVITY_PAGE, orientQuery } from "@/api/requests";
import type { OrientActivity } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";

const BASE_ORIENT = {
  tag: "playbill-orient-v1" as const,
  instance: "inst_fixture",
  coordinate: COORDINATE,
  generation: AT.generation,
  accepted_at: "2026-10-19T09:30:00Z",
  evaluation_time: NOW,
};

const RUN_OK = "RUN-" + "a1".repeat(16);
const RUN_REFUSED = "RUN-" + "b2".repeat(16);
const PROPOSAL = "a".repeat(64);
const CAPTURE_DIGEST = "sha256:" + "c".repeat(64);

export const ACTIVITY: OrientActivity[] = [
  {
    event: "generation_accepted",
    at: "2026-10-19T11:40:00Z",
    ref: `Proposal:${PROPOSAL}`,
    sequence: 42,
    git_oid: COORDINATE.git_oid,
    proposal: PROPOSAL,
    proposer: "release-owner",
    approvals: ["security-lead"],
    because: "Vendor advisory says rel-1 never shipped the build.",
    because_truncated: false,
    members: 1,
  },
  { event: "run_finished", at: "2026-10-19T11:30:00Z", ref: `ProcedureRun:${RUN_OK}`, run: RUN_OK, procedure: "Procedure:security.kev-triage", line: "Line:kev-triage", status: "succeeded", unavailable: false },
  {
    event: "capture_landed",
    at: "2026-10-19T11:30:00Z",
    ref: `Capture:${CAPTURE_DIGEST}`,
    capture: "CAP-cccccccccccc",
    contract: "CaptureContract:security.fetched-v1",
    logical_source: "cisa.kev.catalog",
    run: RUN_OK,
    line: "Line:kev-triage",
    unavailable: false,
  },
  { event: "run_started", at: "2026-10-19T11:30:00Z", ref: `ProcedureRun:${RUN_OK}`, run: RUN_OK, procedure: "Procedure:security.kev-triage", line: "Line:kev-triage", unavailable: false },
  { event: "inbox_posted", at: "2026-10-19T11:20:00Z", ref: "INB-" + "7".repeat(64), line: "Line:kev-triage", procedure: "Procedure:security.kev-triage", run: RUN_OK },
  { event: "run_finished", at: "2026-10-19T10:00:00Z", ref: `ProcedureRun:${RUN_REFUSED}`, run: RUN_REFUSED, procedure: "Procedure:security.cve-applicability", line: "Line:cve-applicability", status: "admission_refused", unavailable: false },
  { event: "line_state_changed", at: "2026-10-19T09:50:00Z", ref: "Line:cve-applicability", line: "Line:cve-applicability", previous: "running", state: "stopped", reason: "line_changed", detail: null },
  { event: "occurrence_due", at: "2026-10-18T06:00:00Z", ref: "Line:kev-triage", line: "Line:kev-triage", trigger: "Trigger:security.kev-daily", occurrence: "occ-2026-10-18", eligible_at: "2026-10-18T06:00:00Z" },
];

const OLDER: OrientActivity[] = [
  { event: "occurrence_lapsed", at: "2026-10-17T06:00:00Z", ref: "Line:kev-triage", line: "Line:kev-triage", occurrence: "occ-2026-10-17" },
];

const NEXT = "cursor-activity-2";

export default [
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "activity", limit: ACTIVITY_PAGE }),
    response: { ...BASE_ORIENT, section: "activity", activity: ACTIVITY, next_cursor: NEXT },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "activity", limit: ACTIVITY_PAGE, cursor: NEXT }),
    response: { ...BASE_ORIENT, section: "activity", activity: OLDER, next_cursor: null },
  }),
];

// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 1f02169c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
    "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
    "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
    "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
    "surface": "sdk",
    "kind": "security.signal"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_bff87e924cbb4f7f",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "generation": 12,
    "accepted_at": "2026-10-26T19:00:09.706610Z",
    "evaluation_time": "2026-10-26T19:04:58.675343Z",
    "kind_detail": {
      "kind": "security.signal",
      "subjects": 0,
      "identity": "keys: security.signal.detector, security.signal.fingerprint (unique)",
      "predicates": [
        {
          "name": "detector",
          "predicate": "security.signal.detector",
          "cardinality": "one",
          "type": "string",
          "description": "What observed the signal (a question such as security.hq5, or manual); with fingerprint, the signal's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.signal"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.signal/detector.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "explained_by",
          "predicate": "security.signal.explained_by",
          "cardinality": "one",
          "type": "subject:security.change,security.finding,security.job,security.target,security.workflow",
          "description": "A hypothesis for the signal: what is responsible (a finding: the anomaly is exploitation of that weakness). Competing hypotheses contend (set --contend); the slot resolves when one remains.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-large-v1",
            "security.fetched-v1"
          ],
          "subject_kinds": [
            "security.signal"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.signal/explained_by.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "fingerprint",
          "predicate": "security.signal.fingerprint",
          "cardinality": "one",
          "type": "string",
          "description": "What identifies the observation; with detector, the signal's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.signal"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.signal/fingerprint.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "observed",
          "predicate": "security.signal.observed",
          "cardinality": "many",
          "type": "subject:security.artifact,security.job,security.target,security.workflow",
          "description": "What the signal was observed on: a source's observation, or someone's own words.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-large-v1",
            "security.fetched-v1",
            "security.file-v1",
            "security.observation-output-v1"
          ],
          "subject_kinds": [
            "security.signal"
          ],
          "roles": [
            "normative",
            "observation"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.signal/observed.json",
          "live_claims": 0,
          "subjects_with_value": 0
        }
      ],
      "sample_subject_ids": []
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.signal\", select=[\"detector\", \"explained_by\", \"fingerprint\"], limit=10)"
    ]
  }
});

// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient df04760e
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
    "kind": "security.incident"
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
    "evaluation_time": "2026-10-26T19:04:58.294287Z",
    "kind_detail": {
      "kind": "security.incident",
      "subjects": 0,
      "identity": "keys: security.incident.name (unique)",
      "predicates": [
        {
          "name": "name",
          "predicate": "security.incident.name",
          "cardinality": "one",
          "type": "string",
          "description": "The incident's name (PHP2Shell); its key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.incident"
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
          "path": "claim-types/security.incident/name.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "rotation_policy",
          "predicate": "security.incident.rotation_policy",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "all_exposed",
            "on_found_or_unknown"
          ],
          "description": "What raises a rotation: on_found_or_unknown (a service's audit found or cannot rule out exploitation) or all_exposed.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.incident"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "member_descriptions": [
            {
              "member": "all_exposed",
              "description": "Rotate every credential a service of an exposed asset uses."
            },
            {
              "member": "on_found_or_unknown",
              "description": "Rotate the credentials of a service whose audit found exploitation or cannot rule it out (unknown)."
            }
          ],
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.incident/rotation_policy.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "status",
          "predicate": "security.incident.status",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "closed",
            "open"
          ],
          "description": "Whether the incident is open; close it only after its respond Line posts ready_to_close.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.incident"
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
          "path": "claim-types/security.incident/status.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "vulnerability",
          "predicate": "security.incident.vulnerability",
          "cardinality": "many",
          "type": "subject:security.vulnerability",
          "description": "A CVE this incident responds to: one response, one audit per service, however many CVEs.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.incident"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.incident/vulnerability.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "window_start",
          "predicate": "security.incident.window_start",
          "cardinality": "one",
          "type": "datetime",
          "description": "The start of the exposure window (the lead's call, e.g. the earliest known exploitation minus a margin): audits read from it, rotations must post-date it.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.incident"
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
          "path": "claim-types/security.incident/window_start.json",
          "live_claims": 0,
          "subjects_with_value": 0
        }
      ],
      "incoming": [
        "security.audit.incident"
      ],
      "sample_subject_ids": []
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.incident\", select=[\"name\", \"rotation_policy\", \"status\"], limit=10)",
      "cx.query(kind=\"security.incident\", where=[{\"field\": \"rotation_policy\", \"eq\": \"all_exposed\"}])",
      "cx.query(kind=\"security.incident\", follow=[{\"field\": \"security.audit.incident\", \"as\": \"audit\", \"direction\": \"reverse\"}], select=[\"audit\"], limit=10)"
    ]
  }
});

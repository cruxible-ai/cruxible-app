// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient cca031c3
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
    "kind": "security.audit"
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
    "evaluation_time": "2026-10-26T19:04:57.783371Z",
    "kind_detail": {
      "kind": "security.audit",
      "subjects": 0,
      "identity": "keys: security.audit.incident_ref, security.audit.service_ref (unique)",
      "predicates": [
        {
          "name": "incident",
          "predicate": "security.audit.incident",
          "cardinality": "one",
          "type": "subject:security.incident",
          "description": "The incident the audit answers (the key's incident_ref as a Subject).",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.file-erasable-v1"
          ],
          "subject_kinds": [
            "security.audit"
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
          "path": "claim-types/security.audit/incident.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "incident_ref",
          "predicate": "security.audit.incident_ref",
          "cardinality": "one",
          "type": "string",
          "description": "The incident's name; with service_ref, the audit's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.audit"
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
          "path": "claim-types/security.audit/incident_ref.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "log_source",
          "predicate": "security.audit.log_source",
          "cardinality": "many",
          "type": "string",
          "description": "A log source this incident's audit reads in full over the window (storefront/nginx-access). Stating it is what asks the question. Start from the service's service.log_source list (the respond Line names it): a source the service lists and the audit does not state leaves the answer unknown.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.audit"
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
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.audit/log_source.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "read",
          "predicate": "security.audit.read",
          "cardinality": "many",
          "type": "string",
          "description": "One complete read of a log source, as SOURCE FROM/TO (ISO 8601, Z): the tool searched every record in the interval. Only the log import writes these; an incomplete read is posted, never recorded.",
          "evidence": [
            "security.file-erasable-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.audit"
          ],
          "roles": [
            "observation"
          ],
          "default_role": "observation",
          "revision_evidence": "replace",
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.audit/read.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "result",
          "predicate": "security.audit.result",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "exploited",
            "inconclusive",
            "not_exploited"
          ],
          "description": "The auditor's judgment: exploited, not_exploited or inconclusive, citing the decisive log read (security.file-erasable-v1) or a workspace file (security.file-v1); own words are refused. Reasoning goes in a section of the incident's note. A disagreeing auditor contends (set --contend): while the slot reads conflict the answer is unknown. Never settled by a Mandate.",
          "evidence": [
            "security.file-erasable-v1",
            "security.file-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.audit"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "member_descriptions": [
            {
              "member": "exploited",
              "description": "The window's logs show exploitation: cite the decisive read."
            },
            {
              "member": "inconclusive",
              "description": "The logs cannot decide it (a gap, a missing source, ambiguous matches)."
            },
            {
              "member": "not_exploited",
              "description": "Every stated log source (the audit's, which must include every source the service lists) was read in full over the window and shows no exploitation; counts as none only when the reads cover [window_start, window_end]."
            }
          ],
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.audit/result.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "service",
          "predicate": "security.audit.service",
          "cardinality": "one",
          "type": "subject:security.service",
          "description": "The service the audit answers for (the key's service_ref as a Subject).",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.file-erasable-v1"
          ],
          "subject_kinds": [
            "security.audit"
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
          "path": "claim-types/security.audit/service.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "service_ref",
          "predicate": "security.audit.service_ref",
          "cardinality": "one",
          "type": "string",
          "description": "The service's name; with incident_ref, the audit's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.audit"
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
          "path": "claim-types/security.audit/service_ref.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "window_end",
          "predicate": "security.audit.window_end",
          "cardinality": "one",
          "type": "datetime",
          "description": "When the service's last affected asset was verified patched (the verifying scan's time): the audit's window is [incident.window_start, window_end].",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.audit"
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
          "path": "claim-types/security.audit/window_end.json",
          "live_claims": 0,
          "subjects_with_value": 0
        }
      ],
      "incoming": [
        "security.work.audit"
      ],
      "sample_subject_ids": []
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.audit\", select=[\"incident\", \"incident_ref\", \"log_source\"], limit=10)",
      "cx.query(kind=\"security.audit\", where=[{\"field\": \"result\", \"eq\": \"exploited\"}])",
      "cx.query(kind=\"security.audit\", follow=[{\"field\": \"security.work.audit\", \"as\": \"control\", \"direction\": \"reverse\"}], select=[\"control\"], limit=10)"
    ]
  }
});

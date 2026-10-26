// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 99da2146
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
    "kind": "security.assessment"
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
    "evaluation_time": "2026-10-26T19:05:02.907032Z",
    "kind_detail": {
      "kind": "security.assessment",
      "subjects": 14,
      "identity": "keys: security.assessment.release_id, security.assessment.cve_id (unique)",
      "predicates": [
        {
          "name": "component",
          "predicate": "security.assessment.component",
          "cardinality": "many",
          "type": "string",
          "description": "The release's component that brings the vulnerability in (purl@version): which dependency an affected release needs to change. An observation is a source's word (OSV's answer for the component, or a CVE record whose packageName names it); a normative Claim is an analyst's, citing their own words or a workspace file (security.file-v1, via security.evidence-acquire).",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-v1",
            "security.file-v1"
          ],
          "subject_kinds": [
            "security.assessment"
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
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.assessment/component.json",
          "live_claims": 14,
          "subjects_with_value": 14
        },
        {
          "name": "cve_id",
          "predicate": "security.assessment.cve_id",
          "cardinality": "one",
          "type": "string",
          "description": "The CVE this assessment is about; with release_id, the assessment's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.assessment"
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
          "path": "claim-types/security.assessment/cve_id.json",
          "live_claims": 14,
          "subjects_with_value": 14
        },
        {
          "name": "expected_status",
          "predicate": "security.assessment.expected_status",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "affected",
            "not_affected"
          ],
          "description": "An agent's stated bet on the assessment's status before a source observes it; predictions test it against security.assessment.status.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.assessment"
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
          "path": "claim-types/security.assessment/expected_status.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "justification",
          "predicate": "security.assessment.justification",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "component_not_present",
            "inline_mitigations_already_exist",
            "vulnerable_code_cannot_be_controlled_by_adversary",
            "vulnerable_code_not_in_execute_path",
            "vulnerable_code_not_present"
          ],
          "description": "Why a not_affected release is not affected (the VEX/CSAF justification): an observation from a source, or (normative) an analyst's judgment citing their own words or a workspace file (security.file-v1). Required in practice with every not_affected status; core cannot require it.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-v1",
            "security.file-v1",
            "security.observation-output-v1"
          ],
          "subject_kinds": [
            "security.assessment"
          ],
          "roles": [
            "normative",
            "observation"
          ],
          "default_role": "normative",
          "member_descriptions": [
            {
              "member": "component_not_present",
              "description": "The vulnerable component is not in the release."
            },
            {
              "member": "inline_mitigations_already_exist",
              "description": "Built-in protections prevent exploitation."
            },
            {
              "member": "vulnerable_code_cannot_be_controlled_by_adversary",
              "description": "The vulnerable code cannot be reached with adversary-controlled input."
            },
            {
              "member": "vulnerable_code_not_in_execute_path",
              "description": "The vulnerable code is present but never runs."
            },
            {
              "member": "vulnerable_code_not_present",
              "description": "The component is present but not the vulnerable code (for example, a fixed version)."
            }
          ],
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.assessment/justification.json",
          "live_claims": 1,
          "subjects_with_value": 1
        },
        {
          "name": "release",
          "predicate": "security.assessment.release",
          "cardinality": "one",
          "type": "subject:security.release",
          "description": "The release this applicability assessment is about.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-v1"
          ],
          "subject_kinds": [
            "security.assessment"
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
          "path": "claim-types/security.assessment/release.json",
          "live_claims": 14,
          "subjects_with_value": 14
        },
        {
          "name": "release_id",
          "predicate": "security.assessment.release_id",
          "cardinality": "one",
          "type": "string",
          "description": "The id of the release this assessment is about; with cve_id, the assessment's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.assessment"
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
          "path": "claim-types/security.assessment/release_id.json",
          "live_claims": 14,
          "subjects_with_value": 14
        },
        {
          "name": "status",
          "predicate": "security.assessment.status",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "affected",
            "inconclusive",
            "not_affected"
          ],
          "description": "Whether the release is affected by the vulnerability. An observation is a source's verdict (OSV, a CVE record) citing its Capture; a normative Claim is an analyst's judgment citing their own words or a workspace file (security.file-v1, retained by security.evidence-acquire: a source's Capture is not citable for a judgment), with their reasoning in its because. The kit's Procedures never revise a normative status; retire it to hand the assessment back to them.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-v1",
            "security.file-v1",
            "security.observation-output-v1"
          ],
          "subject_kinds": [
            "security.assessment"
          ],
          "roles": [
            "normative",
            "observation"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.assessment/status.json",
          "live_claims": 15,
          "subjects_with_value": 14
        },
        {
          "name": "vulnerability",
          "predicate": "security.assessment.vulnerability",
          "cardinality": "one",
          "type": "subject:security.vulnerability",
          "description": "The vulnerability this applicability assessment is about.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-v1"
          ],
          "subject_kinds": [
            "security.assessment"
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
          "path": "claim-types/security.assessment/vulnerability.json",
          "live_claims": 14,
          "subjects_with_value": 14
        }
      ],
      "incoming": [
        "security.work.assessment"
      ],
      "sample_subject_ids": [
        "gate-app-1.0.0--cve-2021-44228",
        "gate-app-1.0.0--cve-2021-44832",
        "gate-app-1.0.0--cve-2021-45046",
        "gate-app-1.0.0--cve-2021-45105",
        "gate-app-1.0.0--cve-2024-34064"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.assessment\", select=[\"component\", \"cve_id\", \"expected_status\"], limit=10)",
      "cx.query(kind=\"security.assessment\", where=[{\"field\": \"expected_status\", \"eq\": \"affected\"}])",
      "cx.query(kind=\"security.assessment\", follow=[{\"field\": \"security.work.assessment\", \"as\": \"control\", \"direction\": \"reverse\"}], select=[\"control\"], limit=10)",
      "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\")"
    ]
  }
});

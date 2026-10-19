// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient d957ef29
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
    "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
    "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
    "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
    "surface": "sdk",
    "kind": "security.assessment"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_be4d690f30d64371",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "generation": 58,
    "accepted_at": "2026-10-19T21:49:14.351998Z",
    "evaluation_time": "2026-10-19T22:13:00.880165Z",
    "kind_detail": {
      "kind": "security.assessment",
      "subjects": 31,
      "identity": "keys: security.assessment.release_id, security.assessment.cve_id (unique)",
      "predicates": [
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
          "live_claims": 31
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
          "live_claims": 2
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
          "description": "Why a not_affected release is not affected (the VEX/CSAF justification): an observation from a source, or (normative) an analyst's judgment. Required in practice with every not_affected status; core cannot require it.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.cve-record-http-v1",
            "security.observation-output-v1",
            "security.osv-query-v1",
            "security.workspace-evidence-v1"
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
          "live_claims": 17
        },
        {
          "name": "release",
          "predicate": "security.assessment.release",
          "cardinality": "one",
          "type": "subject:security.release",
          "description": "The release this applicability assessment is about.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.cve-record-http-v1",
            "security.osv-query-v1"
          ],
          "subject_kinds": [
            "security.assessment"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "live_claims": 31
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
          "live_claims": 31
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
          "description": "Whether the release is affected by the vulnerability. An observation is a source's verdict (OSV, a CVE record) citing its Capture; a normative Claim is an analyst's judgment citing their own words or a workspace file, with their reasoning in its because. The kit's Procedures never revise a normative status; retire it to hand the assessment back to them.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.cve-record-http-v1",
            "security.observation-output-v1",
            "security.osv-query-v1",
            "security.workspace-evidence-v1"
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
          "live_claims": 31
        },
        {
          "name": "vulnerability",
          "predicate": "security.assessment.vulnerability",
          "cardinality": "one",
          "type": "subject:security.vulnerability",
          "description": "The vulnerability this applicability assessment is about.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.cve-record-http-v1",
            "security.osv-query-v1"
          ],
          "subject_kinds": [
            "security.assessment"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "live_claims": 31
        }
      ],
      "incoming": [
        "security.work.assessment"
      ],
      "sample_subject_ids": [
        "apache-log4j-1.2.17--cve-2021-44228",
        "apache-log4j2-2.12.2--cve-2021-44228",
        "apache-log4j2-2.14.1--cve-2021-44228",
        "apache-log4j2-2.17.1--cve-2021-44228",
        "gate-app-1.0.0--cve-2021-44228"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.assessment\", select=[\"cve_id\", \"expected_status\", \"justification\"], limit=10)",
      "cx.query(kind=\"security.assessment\", where=[{\"field\": \"expected_status\", \"eq\": \"affected\"}])",
      "cx.query(kind=\"security.assessment\", follow=[{\"field\": \"security.work.assessment\", \"as\": \"control\", \"direction\": \"reverse\"}], select=[\"control\"], limit=10)",
      "cx.get(\"security.assessment/apache-log4j-1.2.17--cve-2021-44228\")"
    ]
  }
});

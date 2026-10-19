// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get f31dd4f5
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.assessment.status",
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "ClaimType:security.assessment.status",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.assessment.status",
      "subject_kinds": [
        "security.assessment"
      ],
      "object": "string",
      "cardinality": "one",
      "members": [
        "affected",
        "inconclusive",
        "not_affected"
      ],
      "description": "Whether the release is affected by the vulnerability. An observation is a source's verdict (OSV, a CVE record) citing its Capture; a normative Claim is an analyst's judgment citing their own words or a workspace file, with their reasoning in its because. The kit's Procedures never revise a normative status; retire it to hand the assessment back to them.",
      "roles": [
        "normative",
        "observation"
      ],
      "default_role": "normative",
      "evidence_requirement": "self",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:playbill.coordinator-self-source-v1",
        "CaptureContract:security.cve-record-http-v1",
        "CaptureContract:security.observation-output-v1",
        "CaptureContract:security.osv-query-v1",
        "CaptureContract:security.workspace-evidence-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "analyst-judgment",
          "roles": [
            "normative"
          ],
          "contracts": [
            "CaptureContract:playbill.coordinator-self-source-v1",
            "CaptureContract:security.workspace-evidence-v1"
          ],
          "admission": "direct"
        },
        {
          "rule_id": "source-verdict",
          "roles": [
            "observation"
          ],
          "contracts": [
            "CaptureContract:security.cve-record-http-v1",
            "CaptureContract:security.observation-output-v1",
            "CaptureContract:security.osv-query-v1"
          ],
          "admission": "direct"
        }
      ],
      "live_claims": 31,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.assessment.status\", detail=\"proof\")",
        "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-19T22:16:32.589984Z"
  }
});

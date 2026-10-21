// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 8492c323
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.job.needs",
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
    "ref": "ClaimType:security.job.needs",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.job.needs",
      "subject_kinds": [
        "security.job"
      ],
      "object": "subject:security.job",
      "cardinality": "many",
      "description": "A job this job waits for.",
      "roles": [
        "observation"
      ],
      "default_role": "observation",
      "evidence_requirement": "captured",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:security.repo-snapshot-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "retained-security-evidence",
          "roles": [
            "observation"
          ],
          "contracts": [
            "CaptureContract:security.repo-snapshot-v1"
          ],
          "admission": "direct"
        }
      ],
      "contention": {
        "selector": "all",
        "on_conflict": "unresolved"
      },
      "format": 8,
      "revision": 1,
      "path": "claim-types/security.job/needs.json",
      "live_claims": 12,
      "subjects_with_value": 10,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.job.needs\", detail=\"proof\")",
        "cx.get(\"CaptureContract:security.repo-snapshot-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-21T19:49:20.486862Z"
  }
});

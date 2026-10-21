// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 83c8d392
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.target.source_repo",
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
    "ref": "ClaimType:security.target.source_repo",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.target.source_repo",
      "subject_kinds": [
        "security.target"
      ],
      "object": "subject:security.repo",
      "cardinality": "one",
      "description": "The repository the target is published from: its provenance's, or the owner's words.",
      "roles": [
        "normative"
      ],
      "default_role": "normative",
      "evidence_requirement": "self",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:playbill.coordinator-self-source-v1",
        "CaptureContract:security.pypi-release-v1",
        "CaptureContract:security.repo-snapshot-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "own-words",
          "roles": [
            "normative"
          ],
          "contracts": [
            "CaptureContract:playbill.coordinator-self-source-v1"
          ],
          "admission": "direct"
        },
        {
          "rule_id": "stated-by-source",
          "roles": [
            "normative"
          ],
          "contracts": [
            "CaptureContract:security.pypi-release-v1",
            "CaptureContract:security.repo-snapshot-v1"
          ],
          "admission": "direct"
        }
      ],
      "contention": {
        "selector": "only_contender",
        "on_conflict": "unresolved"
      },
      "format": 8,
      "revision": 1,
      "path": "claim-types/security.target/source_repo.json",
      "live_claims": 4,
      "subjects_with_value": 4,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.target.source_repo\", detail=\"proof\")",
        "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-21T19:49:20.719682Z"
  }
});

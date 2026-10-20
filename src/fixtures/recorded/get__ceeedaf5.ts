// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 36fd7a6c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.product.supplied_by",
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
    "ref": "ClaimType:security.product.supplied_by",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.product.supplied_by",
      "subject_kinds": [
        "security.product"
      ],
      "object": "subject:security.supplier",
      "cardinality": "one",
      "description": "The supplier of the product.",
      "roles": [
        "normative"
      ],
      "default_role": "normative",
      "evidence_requirement": "self",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:playbill.coordinator-self-source-v1",
        "CaptureContract:security.cyclonedx-sbom-v1"
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
            "CaptureContract:security.cyclonedx-sbom-v1"
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
      "path": "claim-types/security.product/supplied_by.json",
      "live_claims": 3,
      "subjects_with_value": 3,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.product.supplied_by\", detail=\"proof\")",
        "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-20T21:38:22.410500Z"
  }
});

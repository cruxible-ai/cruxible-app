// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 0d38ead5
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.artifact.published_by",
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
    "ref": "ClaimType:security.artifact.published_by",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.artifact.published_by",
      "subject_kinds": [
        "security.artifact"
      ],
      "object": "subject:security.workflow",
      "cardinality": "one",
      "description": "The workflow (at the commit it ran from) that published the artifact, as its provenance states.",
      "roles": [
        "observation"
      ],
      "default_role": "observation",
      "evidence_requirement": "captured",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:security.github-release-v1",
        "CaptureContract:security.pypi-release-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "retained-security-evidence",
          "roles": [
            "observation"
          ],
          "contracts": [
            "CaptureContract:security.github-release-v1",
            "CaptureContract:security.pypi-release-v1"
          ],
          "admission": "direct"
        }
      ],
      "live_claims": 12,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.artifact.published_by\", detail=\"proof\")",
        "cx.get(\"CaptureContract:security.github-release-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-19T22:16:32.481594Z"
  }
});

// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 2cef5088
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.artifact.name",
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
    "ref": "ClaimType:security.artifact.name",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.artifact.name",
      "subject_kinds": [
        "security.artifact"
      ],
      "object": "string",
      "cardinality": "one",
      "description": "The published file's name (a release asset as tag/asset); with target_ref, the artifact's key.",
      "roles": [
        "normative"
      ],
      "default_role": "normative",
      "evidence_requirement": "none",
      "revision_evidence": "replace",
      "evidence": [],
      "evidence_rules": [],
      "live_claims": 19,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.artifact.name\", detail=\"proof\")"
      ]
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-19T22:13:02.913451Z"
  }
});

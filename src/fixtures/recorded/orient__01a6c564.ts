// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient ab1f3c20
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
    "kind": "security.team"
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
    "evaluation_time": "2026-10-21T19:49:19.906653Z",
    "kind_detail": {
      "kind": "security.team",
      "subjects": 1,
      "identity": "keys: security.team.name (hint)",
      "predicates": [
        {
          "name": "name",
          "predicate": "security.team.name",
          "cardinality": "one",
          "type": "string",
          "description": "The team's name; its key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.team"
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
          "path": "claim-types/security.team/name.json",
          "live_claims": 1,
          "subjects_with_value": 1
        }
      ],
      "incoming": [
        "security.service.owned_by",
        "security.work.owner"
      ],
      "sample_subject_ids": [
        "platform"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.team\", select=[\"name\"], limit=10)",
      "cx.query(kind=\"security.team\", follow=[{\"field\": \"security.service.owned_by\", \"as\": \"service\", \"direction\": \"reverse\"}], select=[\"service\"], limit=10)",
      "cx.get(\"security.team/platform\")"
    ]
  }
});

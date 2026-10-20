// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient f3d1b687
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
    "kind": "security.repo"
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
    "evaluation_time": "2026-10-20T21:42:29.268975Z",
    "kind_detail": {
      "kind": "security.repo",
      "subjects": 1,
      "identity": "keys: security.repo.forge_host, security.repo.full_name (unique)",
      "predicates": [
        {
          "name": "forge_host",
          "predicate": "security.repo.forge_host",
          "cardinality": "one",
          "type": "string",
          "description": "The forge host (github.com); with full_name, the repository's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.repo"
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
          "path": "claim-types/security.repo/forge_host.json",
          "live_claims": 1,
          "subjects_with_value": 1
        },
        {
          "name": "full_name",
          "predicate": "security.repo.full_name",
          "cardinality": "one",
          "type": "string",
          "description": "owner/repository; with forge_host, the repository's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.repo"
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
          "path": "claim-types/security.repo/full_name.json",
          "live_claims": 1,
          "subjects_with_value": 1
        }
      ],
      "incoming": [
        "security.coverage.of",
        "security.target.source_repo",
        "security.workflow.repo"
      ],
      "sample_subject_ids": [
        "github.com--cruxible-ai-cruxible"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.repo\", select=[\"forge_host\", \"full_name\"], limit=10)",
      "cx.query(kind=\"security.repo\", follow=[{\"field\": \"security.coverage.of\", \"as\": \"coverage\", \"direction\": \"reverse\"}], select=[\"coverage\"], limit=10)",
      "cx.get(\"security.repo/github.com--cruxible-ai-cruxible\")"
    ]
  }
});

// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch be5d1f32
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:5ab0a3dcfe7fb7ce01a9c91b691e8d3aa49cadf51bdde33ab3df6e9eb18e888c"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Proposal:sha256:5ab0a3dcfe7fb7ce01a9c91b691e8d3aa49cadf51bdde33ab3df6e9eb18e888c",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:5ab0a3dcfe7fb7ce01a9c91b691e8d3aa49cadf51bdde33ab3df6e9eb18e888c",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "gate-owner",
          "admitted_at": "2026-10-19T21:28:41.992232Z",
          "rationale": "Install kit security 1.1.0.",
          "changes": [
            {
              "path": "blueprints/security.asset-fetch.json",
              "change": "create"
            },
            {
              "path": "blueprints/security.cve-record-acquire.json",
              "change": "create"
            },
            {
              "path": "blueprints/security.epss-acquire.json",
              "change": "create"
            },
            {
              "path": "blueprints/security.history-acquire.json",
              "change": "create"
            },
            {
              "path": "blueprints/security.kev-acquire.json",
              "change": "create"
            },
            {
              "path": "blueprints/security.osv-applicability.json",
              "change": "create"
            },
            {
              "path": "blueprints/security.registry-acquire.json",
              "change": "create"
            },
            {
              "path": "blueprints/security.release-acquire.json",
              "change": "create"
            },
            {
              "path": "blueprints/security.repo-acquire.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.cve-record-http-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.cyclonedx-sbom-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.epss-daily-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.github-api-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.github-release-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.kev-http-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.observation-output-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.osv-query-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.pypi-release-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.release-asset-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.repo-snapshot-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.workspace-evidence-v1.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/built_from.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/declared_sha256.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/name.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/publish_environment.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "142 more; see detail=proof"
            }
          ],
          "next": []
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:38:28.813724Z"
      }
    ]
  }
});

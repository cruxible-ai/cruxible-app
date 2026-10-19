// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch d713919b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:4ac9bb641d10ef02d2d1f09785e79c14d96d553a4d2131247ec6670f58c10ef6"
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
        "ref": "Proposal:sha256:4ac9bb641d10ef02d2d1f09785e79c14d96d553a4d2131247ec6670f58c10ef6",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:4ac9bb641d10ef02d2d1f09785e79c14d96d553a4d2131247ec6670f58c10ef6",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "gate-owner",
          "admitted_at": "2026-10-19T21:29:36.386615Z",
          "rationale": "Example consumer automation for the security kit (vulnerability loop and system model); adapt before submitting.",
          "changes": [
            {
              "path": "lines/security.cve-applicability.json",
              "change": "create"
            },
            {
              "path": "lines/security.epss-daily.json",
              "change": "create"
            },
            {
              "path": "lines/security.epss-triage.json",
              "change": "create"
            },
            {
              "path": "lines/security.harden.json",
              "change": "create"
            },
            {
              "path": "lines/security.kev-attention.json",
              "change": "create"
            },
            {
              "path": "lines/security.kev-daily.json",
              "change": "create"
            },
            {
              "path": "lines/security.kev-triage.json",
              "change": "create"
            },
            {
              "path": "lines/security.osv-applicability.json",
              "change": "create"
            },
            {
              "path": "lines/security.registry-parse.cruxible-client.json",
              "change": "create"
            },
            {
              "path": "lines/security.registry-parse.cruxible.json",
              "change": "create"
            },
            {
              "path": "lines/security.registry-pull.cruxible-client.json",
              "change": "create"
            },
            {
              "path": "lines/security.registry-pull.cruxible.json",
              "change": "create"
            },
            {
              "path": "lines/security.repo-parse.cruxible-ci.json",
              "change": "create"
            },
            {
              "path": "lines/security.repo-pull.cruxible-ci.json",
              "change": "create"
            },
            {
              "path": "lines/security.sbom-import.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.cve-applicability-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.epss-triage-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.kev-triage-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.osv-applicability-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.registry-parse-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.repo-parse-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.sbom-import-propose.json",
              "change": "create"
            },
            {
              "path": "triggers/security.cve-landed.json",
              "change": "create"
            },
            {
              "path": "triggers/security.epss-daily.json",
              "change": "create"
            },
            {
              "path": "triggers/security.epss-landed.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "14 more; see detail=proof"
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
        "evaluation_time": "2026-10-19T22:16:33.241224Z"
      }
    ]
  }
});

// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 2bd89855
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-2305c382d9122e1cd851a2b4d377a1d6",
      "CLM-ed9a04bee32a5d93af355e3646dc68bf"
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
        "ref": "CLM-2305c382d9122e1cd851a2b4d377a1d6",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-2305c382d9122e1cd851a2b4d377a1d6",
          "subject": "security.repo/github.com--cruxible-ai-cruxible",
          "predicate": "forge_host",
          "predicate_full": "security.repo.forge_host",
          "value": "github.com",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:43:44.788859Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-2305c382d9122e1cd851a2b4d377a1d6\", detail=\"evidence\")",
            "cx.get(\"security.repo/github.com--cruxible-ai-cruxible\")"
          ]
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
        "evaluation_time": "2026-10-21T19:49:24.076350Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-ed9a04bee32a5d93af355e3646dc68bf",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-ed9a04bee32a5d93af355e3646dc68bf",
          "subject": "security.repo/github.com--cruxible-ai-cruxible",
          "predicate": "full_name",
          "predicate_full": "security.repo.full_name",
          "value": "cruxible-ai/cruxible",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:43:44.788859Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-ed9a04bee32a5d93af355e3646dc68bf\", detail=\"evidence\")",
            "cx.get(\"security.repo/github.com--cruxible-ai-cruxible\")"
          ]
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
        "evaluation_time": "2026-10-21T19:49:24.114853Z"
      }
    ]
  }
});

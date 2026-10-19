// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch eaa7223f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-091ae7da5940fd85d4b8d852f407029e",
      "CLM-92d552d36719072cc59cb34f7f4aa520",
      "CLM-b01afaa7c56208ff1d7265159b576e12",
      "CLM-101f30bf11587e2ccf791fe27f376bbe"
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
        "ref": "CLM-091ae7da5940fd85d4b8d852f407029e",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-091ae7da5940fd85d4b8d852f407029e",
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz",
          "predicate": "declared_sha256",
          "predicate_full": "security.artifact.declared_sha256",
          "value": "sha256:c5167fd102a6497e82d48f6aeac556870f6915a83353e06f11131ed01e3a1b5b",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:45.436923Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-091ae7da5940fd85d4b8d852f407029e\", detail=\"evidence\")",
            "cx.get(\"security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz\")"
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
        "evaluation_time": "2026-10-19T22:16:30.620389Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-92d552d36719072cc59cb34f7f4aa520",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-92d552d36719072cc59cb34f7f4aa520",
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz",
          "predicate": "name",
          "predicate_full": "security.artifact.name",
          "value": "v0.3.2/agent-operation-0.3.2.tar.gz",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:45.436923Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-92d552d36719072cc59cb34f7f4aa520\", detail=\"evidence\")",
            "cx.get(\"security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz\")"
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
        "evaluation_time": "2026-10-19T22:16:30.638456Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-b01afaa7c56208ff1d7265159b576e12",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-b01afaa7c56208ff1d7265159b576e12",
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz",
          "predicate": "target",
          "predicate_full": "security.artifact.target",
          "value": "security.target/github-release--cruxible-ai-cruxible",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:45.436923Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-b01afaa7c56208ff1d7265159b576e12\", detail=\"evidence\")",
            "cx.get(\"security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz\")"
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
        "evaluation_time": "2026-10-19T22:16:30.655730Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-101f30bf11587e2ccf791fe27f376bbe",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-101f30bf11587e2ccf791fe27f376bbe",
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz",
          "predicate": "target_ref",
          "predicate_full": "security.artifact.target_ref",
          "value": "github_release/cruxible-ai/cruxible",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:45.436923Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-101f30bf11587e2ccf791fe27f376bbe\", detail=\"evidence\")",
            "cx.get(\"security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz\")"
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
        "evaluation_time": "2026-10-19T22:16:30.673483Z"
      }
    ]
  }
});

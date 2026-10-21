// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 271a721f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CaptureContract:security.pypi-release-v1"
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
        "ref": "CaptureContract:security.pypi-release-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.pypi-release-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "pypi.release"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.artifact.built_from",
            "security.artifact.publish_environment",
            "security.artifact.published_by",
            "security.artifact.release",
            "security.artifact.sha256",
            "security.artifact.target",
            "security.coverage.of",
            "security.coverage.revision",
            "security.signal.explained_by",
            "security.signal.observed",
            "security.target.source_repo"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.pypi-release-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.artifact.built_from\")"
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
        "evaluation_time": "2026-10-21T19:49:21.153123Z"
      }
    ]
  }
});

// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch da161caa
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.assessment/apache-log4j-1.2.17--cve-2021-44228"
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
        "ref": "security.assessment/apache-log4j-1.2.17--cve-2021-44228",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/apache-log4j-1.2.17--cve-2021-44228",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-cbd32c835b2adaf3209581ada13e4b56",
              "value": "CVE-2021-44228",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-a8f0e5ebe0d59c830dfd78a963da64a8",
              "value": "security.release/apache-log4j--1.2.17",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-8e3979a108f833d3d026632499e534e0",
              "value": "apache-log4j--1.2.17",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-ec55359f4141d7e3a8027003b4ee4f03",
              "value": "inconclusive",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-df5b029f629819e35047abaa5f6644a8",
              "value": "security.vulnerability/cve-2021-44228",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/apache-log4j-1.2.17--cve-2021-44228\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:29.591449Z"
      }
    ]
  }
});

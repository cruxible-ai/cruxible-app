// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 611efa69
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.release/apache-log4j--1.2.17",
      "security.vulnerability/cve-2021-44228"
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
        "ref": "security.release/apache-log4j--1.2.17",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.release/apache-log4j--1.2.17",
          "kind": "security.release",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "product",
              "claim": "CLM-9f61102f3165c2b404fc15701061dfbc",
              "value": "security.product/apache-log4j",
              "flags": []
            },
            {
              "predicate": "product_name",
              "claim": "CLM-17ffa8ce2dbeef92e02e6b3957fdebf3",
              "value": "apache log4j",
              "flags": []
            },
            {
              "predicate": "version",
              "claim": "CLM-5837e18e85c85d052060f32fd3d12319",
              "value": "1.2.17",
              "flags": []
            }
          ],
          "incoming_count": 1,
          "next": [
            "cx.get(\"security.release/apache-log4j--1.2.17\", detail=\"history\")",
            "cx.get(\"security.release/apache-log4j--1.2.17\", detail=\"incoming\")"
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
        "evaluation_time": "2026-10-21T19:49:22.899539Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.vulnerability/cve-2021-44228",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2021-44228",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-2c18a815044dc49c1a48f5fa379093aa",
              "value": "CVE-2021-44228",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-3f075f5df3ed15feb33e2dd3d2d2507e",
              "value": "1.0",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-1fdfc84dc7b5ec04ae82061358a90a5d",
              "value": "0.99999",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-a8b8d8be4b02f2e73bae9c8327ffc856",
              "value": "2021-12-10",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-312c46d635cc4fc265bfb3b198ab9b5c",
              "value": "2021-12-24",
              "flags": []
            },
            {
              "predicate": "kev_listed",
              "claim": "CLM-f55d529c27d7de5198a00d0b689ee96e",
              "value": true,
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-e8b6b0e441b69972f2356e0164919ae9",
              "value": "known",
              "flags": []
            },
            {
              "predicate": "watch_reason",
              "claim": "CLM-1000752c6cbffb7e6b1252495cff0f9a",
              "value": "Tracked by the security team.",
              "flags": []
            }
          ],
          "incoming_count": 6,
          "next": [
            "cx.get(\"security.vulnerability/cve-2021-44228\", detail=\"history\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\", detail=\"incoming\")"
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
        "evaluation_time": "2026-10-21T19:49:22.912496Z"
      }
    ]
  }
});

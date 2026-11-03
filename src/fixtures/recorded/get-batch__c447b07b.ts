// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 5255e7c9
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.vulnerability/cve-2023-44487"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.vulnerability/cve-2023-44487",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2023-44487",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-1096bb2f883d4f839654cba4d9d99d74",
              "value": "CVE-2023-44487",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-5051bb5ab5bdb80237a10647d01da1e8",
              "value": "0.99998",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-923bfe61a7bb723a636a86fe7cc6bdb4",
              "value": "0.99999",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-2c559d9ffa815754e4723c04144f4e90",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-65471ed24f3c502ccbf845d20373af7f",
              "value": "2023-10-10",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-564e79925ecc63bdc6891c631a54855f",
              "value": "2023-10-31",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-dcffe8369cc7211a981764da419d81c7",
              "value": "Unknown",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-07e2523e79d50bba041f0fa492be4ca1"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.vulnerability/cve-2023-44487\", detail=\"history\")"
          ]
        },
        "coordinate": {
          "git_oid": "7f513078c490",
          "generation": 10
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "evaluation_time": "2026-11-03T02:20:50.839676Z"
      }
    ]
  }
});

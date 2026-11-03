// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch d5d8ac6d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.vulnerability/cve-2014-0160"
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
        "ref": "security.vulnerability/cve-2014-0160",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2014-0160",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-671cda403929b9199d624791a43b7a3b",
              "value": "CVE-2014-0160",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-39f4a52b3c2d4f423c663447a6bcaf89",
              "value": "0.99996",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-55252b46e04077d5b9bbd4005b25f76f",
              "value": "0.99999",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-58325fbdd5bff786556a30110917b174",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-3f6b80fb033f0d7166cec0884675bed1",
              "value": "2022-05-04",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-0bee18e34962365ca30ea6da3b0b7277",
              "value": "2022-05-25",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-73f152cd6eb8478d4388a9dd23a95bca",
              "value": "Unknown",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-0a1e056fd6a201a37d010031c94e2c44"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.vulnerability/cve-2014-0160\", detail=\"history\")"
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
        "evaluation_time": "2026-11-03T02:20:49.114243Z"
      }
    ]
  }
});

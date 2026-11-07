// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch dae33484
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.vulnerability/cve-2021-44228"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "results": [
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
              "claim": "CLM-9eff1367310e902cdc436efb18e64336",
              "value": "CVE-2021-44228",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-1817b5bf41dbacad208487b99a2a275d",
              "value": "1",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-df2e21236111d6da62b2da4022a65fdb",
              "value": "0.99999",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-c79e9d236b888bada73738d2f0dc0e1d",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
              "value": "2021-12-10",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-0c497ce6493bc6eea94579dbc0e294fa",
              "value": "2021-12-24",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-7d0e73b0e07c961fb1024d98d258f43a",
              "value": "Known",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-2383f94f7b8c2128e24ea365a8f1e736"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 1,
          "pairs": [
            {
              "kind": "security.exposure",
              "part": "vulnerability",
              "pairs": [
                "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228"
              ]
            }
          ],
          "next": [
            "cx.get(\"security.vulnerability/cve-2021-44228\", detail=\"history\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "30e90cc6ad34",
          "generation": 22
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "evaluation_time": "2026-11-07T22:22:58.329187Z"
      }
    ]
  }
});

// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch c66a7f70
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046"
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
        "ref": "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046",
          "kind": "security.app_exposure",
          "lifecycle": "live",
          "ends": [
            {
              "part": "occurrence",
              "subject": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
              "claim": "CLM-fcfd853d0c1478e3c149ab00d2fc304b"
            },
            {
              "part": "vulnerability",
              "subject": "security.vulnerability/cve-2021-45046",
              "claim": "CLM-ea8fa8387a70ed8887e40f9fe161a192"
            }
          ],
          "claims": [
            {
              "predicate": "justification",
              "claim": [
                "CLM-3da109f05a7fad21f8831270af0299db",
                "CLM-453b457d0b9ce1afd675c2f914ed8a69"
              ],
              "value": [
                "vulnerable_code_not_in_execute_path",
                "inline_mitigations_already_exist"
              ],
              "flags": [
                "contested"
              ]
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046\", detail=\"why\")",
            "cx.get(\"security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046\", detail=\"history\")"
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
        "evaluation_time": "2026-11-07T22:22:58.055958Z"
      }
    ]
  }
});

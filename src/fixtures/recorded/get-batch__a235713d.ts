// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 6aee03b9
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1"
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
        "ref": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
          "kind": "security.component",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "affected_by",
              "claim": [
                "CLM-260724b6a176569d560f4d889ca9e36a"
              ],
              "value": [
                "security.vulnerability/cve-2026-49844"
              ],
              "flags": []
            },
            {
              "predicate": "purl",
              "claim": "CLM-8a2aa0b007172937744ad435748008d3",
              "value": "pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1",
              "flags": []
            }
          ],
          "incoming_count": 1,
          "pairs": [
            {
              "kind": "security.occurrence",
              "part": "component",
              "pairs": [
                "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1"
              ]
            }
          ],
          "next": [
            "cx.get(\"security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1\", detail=\"history\")",
            "cx.get(\"security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1\", detail=\"incoming\")"
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
        "evaluation_time": "2026-11-07T22:22:59.461104Z"
      }
    ]
  }
});

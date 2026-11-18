// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 04212733
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-260724b6a176569d560f4d889ca9e36a",
      "CLM-8a2aa0b007172937744ad435748008d3"
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
        "ref": "CLM-260724b6a176569d560f4d889ca9e36a",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "literal",
          "claim": "CLM-260724b6a176569d560f4d889ca9e36a",
          "subject": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
          "predicate": "affected_by",
          "predicate_full": "security.component.affected_by",
          "value": "security.vulnerability/cve-2026-49844",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "proposed_at": "2026-11-07T18:00:00.000000Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-260724b6a176569d560f4d889ca9e36a\", detail=\"evidence\")",
            "cx.get(\"security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1\")"
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
        "evaluation_time": "2026-11-08T19:47:57.314328Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-8a2aa0b007172937744ad435748008d3",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-8a2aa0b007172937744ad435748008d3",
          "subject": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
          "predicate": "purl",
          "predicate_full": "security.component.purl",
          "value": "pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "proposed_at": "2026-11-07T18:00:00.000000Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-8a2aa0b007172937744ad435748008d3\", detail=\"evidence\")",
            "cx.get(\"security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1\")"
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
        "evaluation_time": "2026-11-08T19:47:57.338410Z"
      }
    ]
  }
});

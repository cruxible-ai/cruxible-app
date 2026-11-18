// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 8d5cbb69
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046",
    "kind": "subject",
    "detail": "history",
    "history": {
      "kind": "subject",
      "revisions": [
        {
          "revision": 1,
          "sequence": 21,
          "git_oid": "9403bd46ead4",
          "proposed_at": "2026-11-07T22:22:25.229631Z",
          "actor": "owner",
          "approved_by": [],
          "lifecycle": "live",
          "digest": "sha256:9ff22e65d443",
          "reason": {
            "kind": "change_set",
            "text": "The demo app never logs attacker-controlled input through log4j-api.",
            "proposal": "sha256:92a7feb20ef2e183138845db4b641919c3bb447bd314169e1986c918d61aa51f"
          }
        }
      ],
      "events": [
        {
          "field": "justification",
          "predicate": "security.app_exposure.justification",
          "claim": "CLM-453b457d0b9ce1afd675c2f914ed8a69",
          "sequence": 22,
          "git_oid": "30e90cc6ad34",
          "proposed_at": "2026-11-07T22:22:25.432116Z",
          "actor": "reviewer",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "The demo app wraps every log call in a sanitizing filter.",
            "proposal": "sha256:bc959b0f82807408680cae8d6bd4be5b55fbcaf2548210f3cb8874e88cd55323"
          },
          "value": "inline_mitigations_already_exist",
          "change": "stated",
          "contended": true
        },
        {
          "field": "justification",
          "predicate": "security.app_exposure.justification",
          "claim": "CLM-3da109f05a7fad21f8831270af0299db",
          "sequence": 21,
          "git_oid": "9403bd46ead4",
          "proposed_at": "2026-11-07T22:22:25.229631Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "The demo app never logs attacker-controlled input through log4j-api.",
            "proposal": "sha256:92a7feb20ef2e183138845db4b641919c3bb447bd314169e1986c918d61aa51f"
          },
          "value": "vulnerable_code_not_in_execute_path",
          "change": "stated"
        },
        {
          "field": "vulnerability",
          "predicate": "security.app_exposure.vulnerability",
          "claim": "CLM-ea8fa8387a70ed8887e40f9fe161a192",
          "sequence": 21,
          "git_oid": "9403bd46ead4",
          "proposed_at": "2026-11-07T22:22:25.229631Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "The demo app never logs attacker-controlled input through log4j-api.",
            "proposal": "sha256:92a7feb20ef2e183138845db4b641919c3bb447bd314169e1986c918d61aa51f"
          },
          "value": "security.vulnerability/cve-2021-45046",
          "change": "stated"
        },
        {
          "field": "occurrence",
          "predicate": "security.app_exposure.occurrence",
          "claim": "CLM-fcfd853d0c1478e3c149ab00d2fc304b",
          "sequence": 21,
          "git_oid": "9403bd46ead4",
          "proposed_at": "2026-11-07T22:22:25.229631Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "The demo app never logs attacker-controlled input through log4j-api.",
            "proposal": "sha256:92a7feb20ef2e183138845db4b641919c3bb447bd314169e1986c918d61aa51f"
          },
          "value": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:47:58.325014Z"
  }
});

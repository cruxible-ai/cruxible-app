// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 910fa54f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
    "detail": "backlinks",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "limit": 50
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
    "kind": "subject",
    "detail": "backlinks",
    "backlinks": {
      "target": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
      "links": [
        {
          "relation": "cites",
          "source_kind": "Claim",
          "source": "CLM-e23f7cd216e8b6e96ff16a3a7daac160",
          "title": null,
          "subject": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
          "field": "security.exposure.justification",
          "role": "copy",
          "file": "triage.notes",
          "section": [
            "Triage notes",
            "log4j-core 2.14.1",
            "CVE-2021-44228"
          ],
          "cited_digest": "sha256:3be6f3f2d2f97b4a2908e9c30c46acaaa3761c5ce01432434a2a39f8079ea113",
          "drift": "unknown"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-07T22:22:58.501981Z"
  }
});

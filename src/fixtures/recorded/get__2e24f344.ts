// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get f1a5112f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-e23f7cd216e8b6e96ff16a3a7daac160",
    "detail": "evidence",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "CLM-e23f7cd216e8b6e96ff16a3a7daac160",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "vulnerable_code_not_present",
      "captures": [
        {
          "capture": "CAP-3ab2f5faae20",
          "contract": "CaptureContract:playbill.coordinator-self-source-v1",
          "version": 1,
          "source": "Principal:owner",
          "observed_at": "2026-11-07T22:22:24.799862Z",
          "role": "copy",
          "origin": "self_source",
          "status": "admitted"
        },
        {
          "capture": "CAP-0b14087acd5c",
          "contract": "CaptureContract:playbill.foreign-source.triage.notes",
          "version": 1,
          "source": "triage.notes",
          "observed_at": "2026-11-07T22:22:24.799862Z",
          "role": "copy",
          "origin": "independent",
          "status": "not_evidence"
        }
      ],
      "attestations": [],
      "rationale": "log4j-core 2.14.1 as shipped here has no JndiLookup class."
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:47:59.096750Z"
  }
});

// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get e98bcaca
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-260724b6a176569d560f4d889ca9e36a",
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
    "ref": "CLM-260724b6a176569d560f4d889ca9e36a",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "security.vulnerability/cve-2026-49844",
      "captures": [
        {
          "capture": "CAP-8e305600ffec",
          "contract": "CaptureContract:security.osv-matches",
          "version": 1,
          "source": "osv.dev.query",
          "observed_at": "2026-11-07T18:00:00Z",
          "role": "evidence",
          "origin": "independent",
          "status": "admitted"
        }
      ],
      "attestations": [
        {
          "stance": "unsure",
          "principal": "owner",
          "at": "2026-11-07T18:40:00Z",
          "current": true,
          "record": "event",
          "basis": "new_capture",
          "counts": false,
          "counts_reason": "not_accepted",
          "event": "sha256:99b3e68375483250af3bbb14b2f3a81bfe895b6a701c169d9a3751fc81c9f040"
        }
      ],
      "rationale": "OSV GHSA-qv9r-c865-cp47 lists CVE-2026-49844 for pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1."
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:47:57.376622Z"
  }
});

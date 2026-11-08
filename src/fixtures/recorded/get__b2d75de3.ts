// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 83571a1d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
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
    "ref": "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "2021-12-10",
      "captures": [
        {
          "capture": "CAP-16c189ac69c6",
          "contract": "CaptureContract:security.kev-catalog",
          "version": 1,
          "source": "cisa.kev.catalog",
          "observed_at": "2026-11-07T22:22:23.910895Z",
          "role": "evidence",
          "origin": "independent",
          "status": "admitted"
        }
      ],
      "attestations": [],
      "rationale": "CISA KEV catalog 2026.10.30: dateAdded 2021-12-10."
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:47:56.515955Z"
  }
});

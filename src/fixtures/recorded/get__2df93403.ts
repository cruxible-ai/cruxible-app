// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get bff10f5d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-1817b5bf41dbacad208487b99a2a275d",
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
    "ref": "CLM-1817b5bf41dbacad208487b99a2a275d",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "1",
      "captures": [
        {
          "capture": "CAP-3e0f61df85dd",
          "contract": "CaptureContract:security.epss-scores",
          "version": 1,
          "source": "first.epss.api",
          "observed_at": "2026-11-07T22:22:24.287450Z",
          "role": "evidence",
          "origin": "independent",
          "status": "admitted"
        }
      ],
      "attestations": [],
      "rationale": "FIRST EPSS on 2026-11-02: percentile 1."
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-07T22:22:56.069133Z"
  }
});

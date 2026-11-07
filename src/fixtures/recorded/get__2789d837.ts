// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 51ffa447
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-453b457d0b9ce1afd675c2f914ed8a69",
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
    "ref": "CLM-453b457d0b9ce1afd675c2f914ed8a69",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "inline_mitigations_already_exist",
      "captures": [
        {
          "capture": "CAP-7ec0c6bd5931",
          "contract": "CaptureContract:playbill.coordinator-self-source-v1",
          "version": 1,
          "source": "Principal:reviewer",
          "observed_at": "2026-11-07T22:22:25.432116Z",
          "role": "copy",
          "origin": "self_source",
          "status": "admitted"
        }
      ],
      "attestations": [],
      "rationale": "The demo app wraps every log call in a sanitizing filter."
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-07T22:22:57.980864Z"
  }
});

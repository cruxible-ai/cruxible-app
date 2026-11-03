// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get c38bb0f6
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-a405b2a08fbc949bac5794292efc9d27",
    "detail": "evidence",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "CLM-a405b2a08fbc949bac5794292efc9d27",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "cisa-kev",
      "captures": [
        {
          "capture": "CAP-669d14caf7fe",
          "contract": "CaptureContract:playbill.coordinator-self-source-v1",
          "version": 1,
          "source": "Principal:pilot-owner",
          "observed_at": "2026-11-03T00:58:38.787504Z",
          "role": "copy",
          "origin": "self_source",
          "status": "admitted"
        }
      ],
      "attestations": [],
      "rationale": "Watch the pilot's CVEs."
    },
    "coordinate": {
      "git_oid": "7f513078c490",
      "generation": 10
    },
    "evaluation_time": "2026-11-03T02:20:49.456871Z"
  }
});

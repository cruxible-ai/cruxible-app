// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 4baacff6
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-07e2523e79d50bba041f0fa492be4ca1",
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
    "ref": "CLM-07e2523e79d50bba041f0fa492be4ca1",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "security.catalog/cisa-kev",
      "captures": [
        {
          "capture": "CAP-aa5996a121bf",
          "contract": "CaptureContract:security.kev-catalog",
          "version": 1,
          "source": "cisa.kev.catalog",
          "observed_at": "2026-11-03T00:58:52.473847Z",
          "role": "evidence",
          "origin": "independent",
          "status": "admitted"
        }
      ],
      "attestations": [],
      "rationale": "CISA KEV catalog 2026.10.30 lists CVE-2023-44487."
    },
    "coordinate": {
      "git_oid": "7f513078c490",
      "generation": 10
    },
    "evaluation_time": "2026-11-03T02:20:50.750041Z"
  }
});

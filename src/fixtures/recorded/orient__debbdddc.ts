// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient dd07fe57
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
    "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
    "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
    "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07",
    "surface": "sdk",
    "section": "capture_contracts",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_d8e6dcb48e6a4d0d",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "generation": 10,
    "accepted_at": "2026-11-03T00:58:54.573196Z",
    "evaluation_time": "2026-11-03T02:20:47.768267Z",
    "section": "capture_contracts",
    "capture_contracts": [
      {
        "contract": "CaptureContract:playbill.coordinator-self-source-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 4
      },
      {
        "contract": "CaptureContract:security.epss-scores",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 3
      },
      {
        "contract": "CaptureContract:security.kev-catalog",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 4
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
    ]
  }
});

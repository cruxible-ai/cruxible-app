// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 80ed35d3
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-21f26c2241a321129da9500c1f536891",
    "detail": "evidence",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "CLM-21f26c2241a321129da9500c1f536891",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "complete: 3 of 3 components answered; set b0388f454ae8d358",
      "captures": [
        {
          "capture": "CAP-c963c7cf6d51",
          "contract": "CaptureContract:security.fetched-v1",
          "version": 1,
          "source": "osv.dev.query",
          "observed_at": "2026-10-26T17:44:40.608733Z",
          "role": "evidence",
          "origin": "independent",
          "status": "admitted"
        }
      ],
      "attestations": [],
      "rationale": "OSV's answer for gate-app--1.0.0's 3 components: complete: 3 of 3 components answered; set b0388f454ae8d358."
    },
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:08.501481Z"
  }
});

// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 747a0ed6
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-af3013cdabfe696e0c094a03c149640b",
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
    "ref": "CLM-af3013cdabfe696e0c094a03c149640b",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "github.com/cruxible-ai/cruxible@main:.github/workflows/ci.yml",
      "captures": [
        {
          "capture": "CAP-c29d52bc7d78",
          "contract": "CaptureContract:security.fetched-v1",
          "version": 1,
          "source": "github.repo.snapshot",
          "observed_at": "2026-10-26T18:55:52.021800Z",
          "role": "evidence",
          "origin": "independent",
          "status": "not_admitted"
        }
      ],
      "attestations": [],
      "rationale": "Proposed by Procedure security.repo-parse run RUN-298f446ec6e0a6a2a857e80179c95a0850155cf6c9c2b64c90c07b84d18c30dc terminal propose\n\n132 items; each item's reason is recorded with the Claim or Subject it explains."
    },
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:07.475131Z"
  }
});

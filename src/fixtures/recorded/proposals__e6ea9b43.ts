// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/proposals b4e922da
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/proposals",
  "query": {
    "limit": 50,
    "status": "open"
  },
  "response": {
    "tag": "playbill-proposal-list-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "status_filter": "open",
    "entries": [
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:4add9d2cb594b38dde43d5b59e1feea01e032d37b8adaee126f4d3339f3a271f",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/procedure-7e385768b2346793b0904b3a4d4c9fc2b0f4b0347cc69b825cb5d3003acc684d",
        "admitted_at": "2026-10-26T17:45:39.755641Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:f560efadcd04050e5a5d41b764eeea1787d94f49395178363344de5676a94c02",
        "status": "open",
        "terminal_reason": null,
        "incomplete_reasons": [],
        "withdrawal_present": false
      }
    ],
    "truncated": false,
    "next_cursor": null
  }
});

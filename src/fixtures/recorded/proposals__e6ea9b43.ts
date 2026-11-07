// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
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
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "status_filter": "open",
    "entries": [
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:9125597f09516aaf61a601a51ff1ec29a21f9636abde30f3dfc36c753f2f0853",
        "actor_id": "owner",
        "target_ref": "refs/proposals/owner/intent-61b9d1d160892d3f3ba9c5751c6574df",
        "admitted_at": "2026-11-07T22:22:25.657003Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:1b545a2eeead03fdf2d25f3da55ad92fd324b8ba3f4d032eee8a22f36116056d",
        "status": "open",
        "terminal_reason": null,
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:6e24aedca9ef02c43a3b4d186ecb3869d7c7b71731ef988e662528ab5f839b73",
        "actor_id": "owner",
        "target_ref": "refs/proposals/owner/intent-4eb135bd6381e0cea986ddaa0246cb14",
        "admitted_at": "2026-11-07T22:22:26.126484Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:03fa0dd2ae61ee090c6172f677482c20963be4fa2391473621ac441fc6762009",
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

// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 458f4585
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 18,
          "git_oid": "031174cb01c3",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "lifecycle": "live",
          "value": "2021-12-10",
          "digest": "sha256:929e4012d89f",
          "change": "stated",
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.30: dateAdded 2021-12-10.",
            "proposal": "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
            "terminal": "write"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-07T22:22:56.251222Z"
  }
});

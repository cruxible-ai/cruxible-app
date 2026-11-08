// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 21077f12
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Proposal:sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "originating_line": {
            "identity": {
              "kind": "Line",
              "name": "security.kev-triage"
            },
            "artifact_digest": "sha256:bfd95a272507803b77568b19c1278f51d9ad9748ae566aeb0205f6001a6d1593"
          },
          "proposal": "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "owner",
          "admitted_at": "2026-11-07T18:00:00.000000Z",
          "rationale": "Proposed by Procedure security.kev-triage run RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3 terminal write\n\n12 items; each item's reason is recorded with the Claim or Subject it explains.",
          "generation": 18,
          "changes": [
            {
              "path": "claims/09/CLM-0955dffd8ac7482b3b2dfb54ebaaf39d.json",
              "change": "create"
            },
            {
              "path": "claims/0c/CLM-0c497ce6493bc6eea94579dbc0e294fa.json",
              "change": "create"
            },
            {
              "path": "claims/19/CLM-192c23be74b94747f2483672df1690f0.json",
              "change": "create"
            },
            {
              "path": "claims/23/CLM-2383f94f7b8c2128e24ea365a8f1e736.json",
              "change": "create"
            },
            {
              "path": "claims/32/CLM-32c458928f64935b2e56d78d29834a69.json",
              "change": "create"
            },
            {
              "path": "claims/35/CLM-35d6991a854e209eb6b1690c901dede0.json",
              "change": "create"
            },
            {
              "path": "claims/45/CLM-451efce0eb50eafd9c199f90f8b74897.json",
              "change": "create"
            },
            {
              "path": "claims/76/CLM-76f60748854f8fe0e4b701d4d9555417.json",
              "change": "create"
            },
            {
              "path": "claims/7d/CLM-7d0e73b0e07c961fb1024d98d258f43a.json",
              "change": "create"
            },
            {
              "path": "claims/b9/CLM-b975b2a8663904b11048323f620948ea.json",
              "change": "create"
            },
            {
              "path": "claims/be/CLM-bed7e93c75f3e67bc9a0431a4d3725b7.json",
              "change": "create"
            },
            {
              "path": "claims/c7/CLM-c72168eed420b1b72725188c23a0b32a.json",
              "change": "create"
            }
          ],
          "next": []
        },
        "coordinate": {
          "git_oid": "30e90cc6ad34",
          "generation": 22
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "evaluation_time": "2026-11-08T19:48:01.037759Z"
      }
    ]
  }
});

// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch c54cb5ba
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Proposal:sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "originating_line": {
            "identity": {
              "kind": "Line",
              "name": "security.kev-triage"
            },
            "artifact_digest": "sha256:2bef163bc5ded6fe191485c209e6415e496f5feb5ddc778ea40ebe1a8f05220d"
          },
          "proposal": "sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "pilot-owner",
          "admitted_at": "2026-11-03T00:58:48.471271Z",
          "rationale": "Proposed by Procedure security.kev-triage run RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514 terminal write\n\n34 items; each item's reason is recorded with the Claim or Subject it explains.",
          "changes": [
            {
              "path": "claims/01/CLM-0173d827b066541d388ec3ee6c909907.json",
              "change": "create"
            },
            {
              "path": "claims/01/CLM-01c64bf0ccf601c73fb5d9e48000da68.json",
              "change": "create"
            },
            {
              "path": "claims/07/CLM-07e2523e79d50bba041f0fa492be4ca1.json",
              "change": "create"
            },
            {
              "path": "claims/0a/CLM-0a1e056fd6a201a37d010031c94e2c44.json",
              "change": "create"
            },
            {
              "path": "claims/0b/CLM-0bee18e34962365ca30ea6da3b0b7277.json",
              "change": "create"
            },
            {
              "path": "claims/12/CLM-12c364b5fbc11638bf6980fef83d7588.json",
              "change": "create"
            },
            {
              "path": "claims/15/CLM-152f2406ffa3a32588dced1cde97b73c.json",
              "change": "create"
            },
            {
              "path": "claims/17/CLM-177af6df24a732c72ed8c7acadd7c55f.json",
              "change": "create"
            },
            {
              "path": "claims/20/CLM-209643542f5a95a150f993a1e3ba2123.json",
              "change": "create"
            },
            {
              "path": "claims/21/CLM-21aba7f86e63c712d490f516c283bd68.json",
              "change": "create"
            },
            {
              "path": "claims/30/CLM-30255eec7ddf7f503364165a9064c0b0.json",
              "change": "create"
            },
            {
              "path": "claims/3f/CLM-3f6b80fb033f0d7166cec0884675bed1.json",
              "change": "create"
            },
            {
              "path": "claims/3f/CLM-3f8684f0274ff24aea88562eeb6325d0.json",
              "change": "create"
            },
            {
              "path": "claims/45/CLM-451fc26cb4344c5253459630a039526b.json",
              "change": "create"
            },
            {
              "path": "claims/54/CLM-54671d178d5d851bc9838e2b28c1aedc.json",
              "change": "create"
            },
            {
              "path": "claims/56/CLM-564e79925ecc63bdc6891c631a54855f.json",
              "change": "create"
            },
            {
              "path": "claims/65/CLM-65471ed24f3c502ccbf845d20373af7f.json",
              "change": "create"
            },
            {
              "path": "claims/65/CLM-65c923eaaea18ff84416d7753c4c8a5a.json",
              "change": "create"
            },
            {
              "path": "claims/73/CLM-73f152cd6eb8478d4388a9dd23a95bca.json",
              "change": "create"
            },
            {
              "path": "claims/86/CLM-860b75b55b2444f9ae5bc16d8a596cf1.json",
              "change": "create"
            },
            {
              "path": "claims/8c/CLM-8c170a81886a7384663c02c35ce7f965.json",
              "change": "create"
            },
            {
              "path": "claims/99/CLM-99f7d94306a1c9859b9159048faa11d2.json",
              "change": "create"
            },
            {
              "path": "claims/9c/CLM-9c9dcad72dd788abd42f0fb68224add9.json",
              "change": "create"
            },
            {
              "path": "claims/a1/CLM-a1241eb46fd7481831f246d6b99b2320.json",
              "change": "create"
            },
            {
              "path": "claims/a4/CLM-a4469c2acfb762a32d395e01fddf7d81.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "9 more; see detail=proof"
            }
          ],
          "next": []
        },
        "coordinate": {
          "git_oid": "7f513078c490",
          "generation": 10
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "evaluation_time": "2026-11-03T02:20:51.350011Z"
      }
    ]
  }
});

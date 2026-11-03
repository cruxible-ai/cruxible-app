// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 2bb74722
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb"
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
        "ref": "Proposal:sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "originating_line": {
            "identity": {
              "kind": "Line",
              "name": "security.epss-triage"
            },
            "artifact_digest": "sha256:f2359364007565e74ba5fee2b404eefa98fd8a321b0412f523fc0663840ab415"
          },
          "proposal": "sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "pilot-owner",
          "admitted_at": "2026-11-03T00:58:54.573196Z",
          "rationale": "Proposed by Procedure security.epss-triage run RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4 terminal write\n\n30 items; each item's reason is recorded with the Claim or Subject it explains.",
          "changes": [
            {
              "path": "claims/06/CLM-0643b623d53bc341e4ce73302509a6d8.json",
              "change": "create"
            },
            {
              "path": "claims/08/CLM-08474610f2820081ba9aba71fd69f05f.json",
              "change": "create"
            },
            {
              "path": "claims/0b/CLM-0b915ccfb90fa143634a556606b3138f.json",
              "change": "create"
            },
            {
              "path": "claims/10/CLM-101186fdb5cf6a0b627f10ece8f2fe20.json",
              "change": "create"
            },
            {
              "path": "claims/25/CLM-2563da5e7c5f4a2880d488a30bc8aeb8.json",
              "change": "create"
            },
            {
              "path": "claims/2c/CLM-2c034ee9dc396f67452410972bb98664.json",
              "change": "create"
            },
            {
              "path": "claims/2c/CLM-2c559d9ffa815754e4723c04144f4e90.json",
              "change": "create"
            },
            {
              "path": "claims/36/CLM-3610bd271ea3f895fd1b4cf529f4e9f7.json",
              "change": "create"
            },
            {
              "path": "claims/39/CLM-39f4a52b3c2d4f423c663447a6bcaf89.json",
              "change": "create"
            },
            {
              "path": "claims/45/CLM-4511b29cdb22b5e7cdfb1dfc0389606b.json",
              "change": "create"
            },
            {
              "path": "claims/4d/CLM-4df58eb72bec4dee52bb30b8e4add839.json",
              "change": "create"
            },
            {
              "path": "claims/50/CLM-5051bb5ab5bdb80237a10647d01da1e8.json",
              "change": "create"
            },
            {
              "path": "claims/55/CLM-55252b46e04077d5b9bbd4005b25f76f.json",
              "change": "create"
            },
            {
              "path": "claims/58/CLM-58325fbdd5bff786556a30110917b174.json",
              "change": "create"
            },
            {
              "path": "claims/61/CLM-610a77949e602c3fef982e0288fe2735.json",
              "change": "create"
            },
            {
              "path": "claims/67/CLM-672ebf5cf0ad4bc0347122365cbe0ca2.json",
              "change": "create"
            },
            {
              "path": "claims/6a/CLM-6a349dfab5a909d105d645defb3ff369.json",
              "change": "create"
            },
            {
              "path": "claims/6d/CLM-6d420817c821fc09e8a191c036374799.json",
              "change": "create"
            },
            {
              "path": "claims/70/CLM-70e677cf193f6f3445d8b2243e1c1bfc.json",
              "change": "create"
            },
            {
              "path": "claims/83/CLM-83343aa00c2daeaaa660aff3c675e79a.json",
              "change": "create"
            },
            {
              "path": "claims/83/CLM-83df7ec10f3dc98f8c7c9dddd97ef4b3.json",
              "change": "create"
            },
            {
              "path": "claims/91/CLM-912147bf8d9528ee51018115082a5a4d.json",
              "change": "create"
            },
            {
              "path": "claims/92/CLM-923bfe61a7bb723a636a86fe7cc6bdb4.json",
              "change": "create"
            },
            {
              "path": "claims/b0/CLM-b06137d17d73d74aa9025958e367c5f3.json",
              "change": "create"
            },
            {
              "path": "claims/b1/CLM-b1852c865047b78ec7df433c70f6cef5.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "5 more; see detail=proof"
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
        "evaluation_time": "2026-11-03T02:20:51.366045Z"
      }
    ]
  }
});

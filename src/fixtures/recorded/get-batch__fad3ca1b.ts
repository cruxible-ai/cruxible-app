// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 801d43fa
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:9125597f09516aaf61a601a51ff1ec29a21f9636abde30f3dfc36c753f2f0853"
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
        "ref": "Proposal:sha256:9125597f09516aaf61a601a51ff1ec29a21f9636abde30f3dfc36c753f2f0853",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:9125597f09516aaf61a601a51ff1ec29a21f9636abde30f3dfc36c753f2f0853",
          "status": "open",
          "verdict": "candidate",
          "actor": "owner",
          "admitted_at": "2026-11-07T22:22:25.657003Z",
          "rationale": "The same stripped jar: no JndiLookup, so the lookup this CVE extends is absent.",
          "changes": [
            {
              "path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "change": "retire"
            },
            {
              "path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "change": "create"
            },
            {
              "path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "change": "create"
            },
            {
              "path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "change": "create"
            },
            {
              "path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "change": "create"
            },
            {
              "path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "change": "create"
            }
          ],
          "next": [
            "cx.proposal(\"sha256:9125597f09516aaf61a601a51ff1ec29a21f9636abde30f3dfc36c753f2f0853\").review()"
          ]
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
        "evaluation_time": "2026-11-07T22:23:00.214892Z"
      }
    ]
  }
});

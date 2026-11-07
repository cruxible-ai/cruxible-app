// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/procedures/security.epss-triage/readings d95dc707
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/procedures/{name}/readings",
  "pathParams": {
    "name": "security.epss-triage"
  },
  "body": {
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "limit": 50
  },
  "response": {
    "tag": "playbill-procedure-readings-result-v1",
    "procedure_identity": {
      "kind": "Procedure",
      "name": "security.epss-triage"
    },
    "procedure_artifact_digest": "sha256:c3fab91633d80ae933a1a2ba9f39e2952f59ae215cfe5bf7bfd0b8cbbc495166",
    "activation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "4281ccf924132d621a5196159f6a2eeb9a3d4168",
      "semantic_root": "sha256:dc2fc7f80d80ae8b6c8d20d4898fdd61305b39acc1c0b398f54c157c9a7ccead",
      "generation_root": "sha256:5dd4375625262a90cbb4037487159ddd16809ed78174314bb86a52da49520654",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "observation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "observation_time": "2026-11-07T22:23:00.606107+00:00",
    "contracts": [],
    "readings": [],
    "truncated": false,
    "cursor": null
  }
});

// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/procedures/security.sbom-import/readings d95dc707
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/procedures/{name}/readings",
  "pathParams": {
    "name": "security.sbom-import"
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
      "name": "security.sbom-import"
    },
    "procedure_artifact_digest": "sha256:a10f9e25ee884f3f9f07e739b7c882ec702fc3779781ca51fe37cf5b1968f3b2",
    "activation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "c00b7b0848882530cc87270e68502e20a00ae46a",
      "semantic_root": "sha256:379d17a94119a10c6e0ba4a25c8b0ccc8b9143d3b4d4f2ab4be83f316a58ef41",
      "generation_root": "sha256:1a03664d543e741a034a6714a6a3d50c4c46c704017934dd057e5291d4c60f4c",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "observation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "observation_time": "2026-11-08T19:48:01.928465+00:00",
    "contracts": [],
    "readings": [],
    "truncated": false,
    "cursor": null
  }
});

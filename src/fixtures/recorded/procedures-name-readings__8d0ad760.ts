// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/procedures/security.osv-query/readings d95dc707
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/procedures/{name}/readings",
  "pathParams": {
    "name": "security.osv-query"
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
      "name": "security.osv-query"
    },
    "procedure_artifact_digest": "sha256:1e0a678683e0b487fb661477e48a5daad716d174c144828946dc95533b3e79e1",
    "activation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "e8b6ab899d62d1280a73a64cae4bdae5b2f86ed5",
      "semantic_root": "sha256:14cdb773d6c01fcf10ec6082b84345ff79e0acb2dc2ab6fba2843801e1870994",
      "generation_root": "sha256:2382fdc095fbb2232effa41b17a0c28a53c6339bb829b8c05a717e270e458a78",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "observation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "observation_time": "2026-11-08T19:48:01.823697+00:00",
    "contracts": [],
    "readings": [],
    "truncated": false,
    "cursor": null
  }
});

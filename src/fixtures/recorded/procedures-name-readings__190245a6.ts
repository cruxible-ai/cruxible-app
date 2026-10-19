// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/procedures/security.cve-applicability/readings 41c4f30c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/procedures/{name}/readings",
  "pathParams": {
    "name": "security.cve-applicability"
  },
  "body": {
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "limit": 50
  },
  "response": {
    "tag": "playbill-procedure-readings-result-v1",
    "procedure_identity": {
      "kind": "Procedure",
      "name": "security.cve-applicability"
    },
    "procedure_artifact_digest": "sha256:96d5e33dd1ca384bb4079624daa7695a54331684c0aded465482789e88c43222",
    "activation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "b7e3795dcddcc00d767946c8df61200d8ab1d2be",
      "semantic_root": "sha256:507b6ba8faea070654b5ecc1c218c1d3467eed326891589bf67a270ee76da527",
      "generation_root": "sha256:ba2e3e0e9d5e7ea25361764803f19a278e06cb18a8866597662b2eaeff54b6bb",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "observation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "observation_time": "2026-10-19T22:16:33.794263+00:00",
    "contracts": [],
    "readings": [],
    "truncated": false,
    "cursor": null
  }
});

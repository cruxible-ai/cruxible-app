// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/procedures/security.epss-acquire/readings 41c4f30c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/procedures/{name}/readings",
  "pathParams": {
    "name": "security.epss-acquire"
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
      "name": "security.epss-acquire"
    },
    "procedure_artifact_digest": "sha256:e1ae5f1f6421b476cc1a6e1626cb62dad3c65ea25509603e5fc7e9be1e03ee7a",
    "activation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "0f20fe353fb0b1825a9bdf3e9a3cec19617436d5",
      "semantic_root": "sha256:b443265825b96cda61faa3824c8a532209c68152c870ed2449bae2f574cd7de8",
      "generation_root": "sha256:270c214b81500965915d7b75e8fb287a0e592f3c5af4ffbb852873a8105cc64a",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "observation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "observation_time": "2026-10-19T22:16:33.858066+00:00",
    "contracts": [],
    "readings": [],
    "truncated": false,
    "cursor": null
  }
});

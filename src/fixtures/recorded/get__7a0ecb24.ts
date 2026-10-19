// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 227e47b6
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-8e3979a108f833d3d026632499e534e0",
    "detail": "evidence",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "CLM-8e3979a108f833d3d026632499e534e0",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "apache-log4j--1.2.17",
      "captures": [
        {
          "capture": "CAP-72e7a0d8035a",
          "contract": "CaptureContract:security.cve-record-http-v1",
          "version": 1,
          "source": "cve.record",
          "observed_at": "2026-10-19T21:31:44.789230Z",
          "role": "evidence",
          "admitted": false
        }
      ],
      "attestations": [],
      "rationale": "Proposed by Procedure security.cve-applicability run RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d terminal propose\n\n12 items; each item's reason is recorded with the Claim or Subject it explains."
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-19T22:13:01.230993Z"
  }
});

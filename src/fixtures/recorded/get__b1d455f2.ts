// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 26e1343c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-a8f0e5ebe0d59c830dfd78a963da64a8",
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
    "ref": "CLM-a8f0e5ebe0d59c830dfd78a963da64a8",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "security.release/apache-log4j--1.2.17",
      "captures": [
        {
          "capture": "CAP-72e7a0d8035a",
          "contract": "CaptureContract:security.cve-record-http-v1",
          "version": 1,
          "source": "cve.record",
          "observed_at": "2026-10-19T21:31:44.789230Z",
          "role": "evidence",
          "admitted": true
        }
      ],
      "attestations": [],
      "rationale": "The assessment is about release apache-log4j--1.2.17."
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-20T21:38:24.048200Z"
  }
});

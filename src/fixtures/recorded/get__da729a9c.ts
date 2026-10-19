// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 8e11a1d2
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-ed9a04bee32a5d93af355e3646dc68bf",
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
    "ref": "CLM-ed9a04bee32a5d93af355e3646dc68bf",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "cruxible-ai/cruxible",
      "captures": [
        {
          "capture": "CAP-348481f1b8ba",
          "contract": "CaptureContract:playbill.coordinator-self-source-v1",
          "version": 1,
          "source": "playbill.coordinator-authoring",
          "observed_at": "2026-10-19T21:43:44.788859Z",
          "role": "copy",
          "admitted": false
        }
      ],
      "attestations": [],
      "rationale": "Ask the hardening questions."
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-19T22:16:31.177302Z"
  }
});

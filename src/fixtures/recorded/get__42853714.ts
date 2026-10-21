// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get d80f365a
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-091ae7da5940fd85d4b8d852f407029e",
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
    "ref": "CLM-091ae7da5940fd85d4b8d852f407029e",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "sha256:c5167fd102a6497e82d48f6aeac556870f6915a83353e06f11131ed01e3a1b5b",
      "captures": [
        {
          "capture": "CAP-8a5a91ecdacb",
          "contract": "CaptureContract:security.repo-snapshot-v1",
          "version": 1,
          "source": "github.repo.snapshot",
          "observed_at": "2026-10-19T21:47:40.693802Z",
          "role": "evidence",
          "origin": "independent",
          "status": "admitted"
        }
      ],
      "attestations": [],
      "rationale": "github.com/cruxible-ai/cruxible@v0.3.2:src/cruxible_core/kit_distribution/manifest.json at d5241395edd4: the manifest declares agent-operation-0.3.2.tar.gz as sha256:c5167fd102a6497e82d48f6aeac556870f6915a83353e06f11131ed01e3a1b5b."
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-21T19:49:23.660808Z"
  }
});

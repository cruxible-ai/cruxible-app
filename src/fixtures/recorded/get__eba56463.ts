// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 2df5a15f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf",
    "detail": "evidence",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "pkg:maven/com.example/log4j-demo-app@1.0.0",
      "captures": [
        {
          "capture": "CAP-64fd45150fea",
          "contract": "CaptureContract:security.sbom-components",
          "version": 1,
          "source": "cyclonedx.sbom.app",
          "observed_at": "2026-11-07T18:00:00Z",
          "role": "evidence",
          "origin": "independent",
          "status": "not_admitted"
        }
      ],
      "attestations": [],
      "rationale": "Proposed by Procedure security.sbom-import run RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5 terminal write\n\n10 items; each item's reason is recorded with the Claim or Subject it explains."
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-07T22:22:58.747447Z"
  }
});

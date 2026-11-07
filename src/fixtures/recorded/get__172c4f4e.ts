// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 8a794361
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.sbom-import.app",
    "detail": "runs",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "Line:security.sbom-import.app",
    "kind": "line",
    "detail": "runs",
    "runs": {
      "kind": "line_runs",
      "line": "Line:security.sbom-import.app",
      "runs": [
        {
          "run": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
          "procedure": "Procedure:security.sbom-import",
          "status": "succeeded",
          "started_at": "2026-11-07T18:00:00Z",
          "line": "Line:security.sbom-import.app",
          "nodes_done": 4
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "30e90cc6ad34",
        "generation": 22
      },
      "fields": [
        "runs"
      ]
    },
    "evaluation_time": "2026-11-07T22:23:00.829051Z"
  }
});

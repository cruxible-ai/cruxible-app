// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 3d238e8f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.epss-daily",
    "detail": "runs",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "Line:security.epss-daily",
    "kind": "line",
    "detail": "runs",
    "runs": {
      "kind": "line_runs",
      "line": "Line:security.epss-daily",
      "runs": [
        {
          "run": "RUN-3ca462badd11b767fa3181307f914922de90898148099580448cd62b6df64464",
          "procedure": "Procedure:security.epss-acquire",
          "status": "succeeded",
          "started_at": "2026-10-19T21:40:32.053647Z",
          "line": "Line:security.epss-daily",
          "nodes_done": 3
        },
        {
          "run": "RUN-3b2159fd41a9d4ccfc9f03341d0e89a3bb3a577544db65da00c40800f8f3f61e",
          "procedure": "Procedure:security.epss-acquire",
          "status": "succeeded",
          "started_at": "2026-10-19T21:36:28.819906Z",
          "line": "Line:security.epss-daily",
          "nodes_done": 3
        },
        {
          "run": "RUN-6ace3e1d5d8024585b4af23d93b10f0e57d1ac4cf3cb8dcbb3a914283f70f81d",
          "procedure": "Procedure:security.epss-acquire",
          "status": "succeeded",
          "started_at": "2026-10-19T21:33:46.070370Z",
          "line": "Line:security.epss-daily",
          "nodes_done": 3
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "97040dbfdd1e",
        "generation": 58
      },
      "fields": [
        "runs"
      ]
    },
    "evaluation_time": "2026-10-21T19:49:26.382019Z"
  }
});

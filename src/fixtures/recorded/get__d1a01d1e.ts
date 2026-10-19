// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 9bc4695a
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.harden",
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
    "ref": "Line:security.harden",
    "kind": "line",
    "detail": "runs",
    "runs": {
      "kind": "line_runs",
      "line": "Line:security.harden",
      "runs": [
        {
          "run": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:48:00.649051Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:47:42.132628Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:47:28.514152Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:47:13.595706Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:47:03.668443Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-d0662dddff9fd90a685e2ec3d26e65f06ae3074a58d99e87b146da8f5af940f2",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:45:59.234209Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-a7f1f0aa97db8550e6c8d154d8ec04dfc36ea7129986ff315db8e5b6cf4aa0d0",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:45:42.923269Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-d7edd0a9e9ab25476a68f6850270cd5319f4a2f39aba7fad558131ce040c3489",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:45:24.569982Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:44:40.568083Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-759c8fc47bf6e6e5526c071493f13d6d610f97b7ba96c3ad979ba62e7d575ec5",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:44:27.682532Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-23415526699a61464e726c8f965af0831948b63d68c3487ad3140ff84b3cf897",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:44:13.315980Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-bd24f832d4b0fdf0df3b24727c7a16e3068f7ef474f4d86dbd92478e190b42f4",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:43:58.363278Z",
          "line": "Line:security.harden",
          "nodes_done": 9
        },
        {
          "run": "RUN-22f36a6dc119f2eede59e6b98ae16b213fbc96caf952ad18ab395dc284d93faf",
          "procedure": "Procedure:security.harden",
          "status": "succeeded",
          "started_at": "2026-10-19T21:43:47.013336Z",
          "line": "Line:security.harden",
          "nodes_done": 9
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
    "evaluation_time": "2026-10-19T22:13:04.246177Z"
  }
});

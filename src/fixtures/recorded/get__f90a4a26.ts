// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 4761386f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.kev-attention",
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
    "ref": "Line:security.kev-attention",
    "kind": "line",
    "detail": "runs",
    "runs": {
      "kind": "line_runs",
      "line": "Line:security.kev-attention",
      "runs": [
        {
          "run": "RUN-b877060acac171eb745a75fbd02deb58c858083b00f802df3b28c7a964cbb192",
          "procedure": "Procedure:security.kev-attention",
          "status": "succeeded",
          "started_at": "2026-10-19T21:40:15.617899Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
        },
        {
          "run": "RUN-2838d0925f769bcd3052f4dff6fe08e9faf99edfd5bdf5598072f2d0049884c7",
          "procedure": "Procedure:security.kev-attention",
          "status": "succeeded",
          "started_at": "2026-10-19T21:39:55.631284Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
        },
        {
          "run": "RUN-3ef16fb914d4d6b4717069e93da171862463ff2aa86cd7bdaa36d8911ed2aaf7",
          "procedure": "Procedure:security.kev-attention",
          "status": "succeeded",
          "started_at": "2026-10-19T21:36:18.947005Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
        },
        {
          "run": "RUN-066ba44a43e32f3fd454ff4d4645c181294e6ed80f8206d1fcd7f05b1ab3d54e",
          "procedure": "Procedure:security.kev-attention",
          "status": "succeeded",
          "started_at": "2026-10-19T21:35:34.886966Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
        },
        {
          "run": "RUN-489b8d4cb1113b30da4af760f893ab64b7afdeb53ee3828588c9f2daba24686e",
          "procedure": "Procedure:security.kev-attention",
          "status": "succeeded",
          "started_at": "2026-10-19T21:35:32.256411Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
        },
        {
          "run": "RUN-eb2f2a6561f0c972d20d01f7a5ea4a14e152e6fb9bee2185c8228b685e436abd",
          "procedure": "Procedure:security.kev-attention",
          "status": "succeeded",
          "started_at": "2026-10-19T21:35:29.544015Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
        },
        {
          "run": "RUN-262bd5a0c4d0c9a30980050a53f5908d5a1f54cf0e9f1eaea8228a22ef06fbf5",
          "procedure": "Procedure:security.kev-attention",
          "status": "succeeded",
          "started_at": "2026-10-19T21:35:29.544015Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
        },
        {
          "run": "RUN-87effbd7528f0465665d426c39185f1f8c4d13c3a52c879208cce8e424fb1786",
          "procedure": "Procedure:security.kev-attention",
          "status": "succeeded",
          "started_at": "2026-10-19T21:33:32.961340Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
        },
        {
          "run": "RUN-7a4065e3499de90bd478d94bd4fa2c10dc3c106a76ff4aa6a31a453e5c9e4743",
          "procedure": "Procedure:security.kev-attention",
          "status": "succeeded",
          "started_at": "2026-10-19T21:32:33.850015Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
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
    "evaluation_time": "2026-10-20T21:38:29.780933Z"
  }
});

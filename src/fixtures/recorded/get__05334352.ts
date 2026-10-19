// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get c325755c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.epss-triage",
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
    "ref": "Line:security.epss-triage",
    "kind": "line",
    "detail": "runs",
    "runs": {
      "kind": "line_runs",
      "line": "Line:security.epss-triage",
      "runs": [
        {
          "run": "RUN-fd36335269ed1aa8234a5b4cae933b3ad75f022c740941dbec80ae49e5ef4b22",
          "procedure": "Procedure:security.epss-triage",
          "status": "succeeded",
          "started_at": "2026-10-19T21:40:33.667031Z",
          "line": "Line:security.epss-triage",
          "nodes_done": 6
        },
        {
          "run": "RUN-c9024e78e0511f51c457f9b82629a7fd1ce158da249b7565ebd274724a3af851",
          "procedure": "Procedure:security.epss-triage",
          "status": "succeeded",
          "started_at": "2026-10-19T21:36:30.340245Z",
          "line": "Line:security.epss-triage",
          "nodes_done": 6
        },
        {
          "run": "RUN-653d9fa615a373030e0a97874792e49b969ae901a2da6ca9386f30858e881fb8",
          "procedure": "Procedure:security.epss-triage",
          "status": "succeeded",
          "started_at": "2026-10-19T21:33:46.882866Z",
          "line": "Line:security.epss-triage",
          "nodes_done": 6
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
    "evaluation_time": "2026-10-19T22:13:04.050851Z"
  }
});

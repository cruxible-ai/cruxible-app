// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 8ce4357d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
    "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
    "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
    "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf",
    "surface": "sdk",
    "section": "procedures",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_console05",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "generation": 22,
    "proposed_at": "2026-11-07T22:22:25.432116Z",
    "evaluation_time": "2026-11-08T19:48:02.188241Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "section": "procedures",
    "procedures": [
      {
        "name": "security.epss-triage",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.kev-triage",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.osv-query",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.sbom-import",
        "lifecycle": "live",
        "runnable": "line"
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"Procedure:security.epss-triage\")"
    ]
  }
});

// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 1b0ca55c
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
    "section": "lines",
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
    "evaluation_time": "2026-11-08T19:47:54.796936Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "section": "lines",
    "lines": [
      {
        "line": "Line:security.epss-triage",
        "lifecycle": "live",
        "procedure": "Procedure:security.epss-triage",
        "authority": "settle",
        "trigger": "cron",
        "triggers_inactive": "not enabled",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.kev-triage",
        "lifecycle": "live",
        "procedure": "Procedure:security.kev-triage",
        "authority": "settle",
        "trigger": "cron",
        "triggers_inactive": "not enabled",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.osv-query",
        "lifecycle": "live",
        "procedure": "Procedure:security.osv-query",
        "authority": "settle",
        "trigger": "cron",
        "triggers_inactive": "not enabled",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.sbom-import.app",
        "lifecycle": "live",
        "procedure": "Procedure:security.sbom-import",
        "authority": "settle",
        "trigger": "manual",
        "due": 0,
        "waiting": 0
      }
    ],
    "truncated": false,
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "30e90cc6ad34",
        "generation": 22
      },
      "fields": [
        "lines.enablement",
        "lines.triggers_inactive",
        "lines.due",
        "lines.waiting"
      ]
    },
    "next": [
      "cx.get(\"Line:security.epss-triage\")"
    ]
  }
});

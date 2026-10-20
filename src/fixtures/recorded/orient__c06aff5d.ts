// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient fcb1bafd
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
    "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
    "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
    "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
    "surface": "sdk",
    "section": "lines",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_be4d690f30d64371",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "generation": 58,
    "accepted_at": "2026-10-19T21:49:14.351998Z",
    "evaluation_time": "2026-10-20T21:42:31.146318Z",
    "section": "lines",
    "lines": [
      {
        "line": "Line:security.cve-applicability",
        "lifecycle": "live",
        "procedure": "Procedure:security.cve-applicability",
        "authority": "propose",
        "trigger": "capture_landing",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.epss-daily",
        "lifecycle": "live",
        "procedure": "Procedure:security.epss-acquire",
        "authority": "observe",
        "trigger": "cron",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.epss-triage",
        "lifecycle": "live",
        "procedure": "Procedure:security.epss-triage",
        "authority": "propose",
        "trigger": "capture_landing",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.harden",
        "lifecycle": "live",
        "procedure": "Procedure:security.harden",
        "authority": "observe",
        "trigger": "capture_landing+cron",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.kev-attention",
        "lifecycle": "live",
        "procedure": "Procedure:security.kev-attention",
        "authority": "observe",
        "trigger": "capture_landing",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.kev-daily",
        "lifecycle": "live",
        "procedure": "Procedure:security.kev-acquire",
        "authority": "observe",
        "trigger": "cadence+cron",
        "enablement": "disabled",
        "triggers_inactive": "not enabled",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.kev-triage",
        "lifecycle": "live",
        "procedure": "Procedure:security.kev-triage",
        "authority": "settle",
        "trigger": "capture_landing",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.osv-applicability",
        "lifecycle": "live",
        "procedure": "Procedure:security.osv-applicability",
        "authority": "propose",
        "trigger": "cron",
        "enablement": "stopped",
        "triggers_inactive": "not enabled",
        "due": 1,
        "waiting": 0
      },
      {
        "line": "Line:security.registry-parse.cruxible",
        "lifecycle": "live",
        "procedure": "Procedure:security.registry-parse",
        "authority": "propose",
        "trigger": "capture_landing",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.registry-parse.cruxible-client",
        "lifecycle": "live",
        "procedure": "Procedure:security.registry-parse",
        "authority": "propose",
        "trigger": "capture_landing",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.registry-pull.cruxible",
        "lifecycle": "live",
        "procedure": "Procedure:security.registry-acquire",
        "authority": "observe",
        "trigger": "cron",
        "triggers_inactive": "not enabled",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.registry-pull.cruxible-client",
        "lifecycle": "live",
        "procedure": "Procedure:security.registry-acquire",
        "authority": "observe",
        "trigger": "cron",
        "triggers_inactive": "not enabled",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.repo-parse.cruxible-ci",
        "lifecycle": "live",
        "procedure": "Procedure:security.repo-parse",
        "authority": "propose",
        "trigger": "capture_landing",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.repo-parse.cruxible-released",
        "lifecycle": "live",
        "procedure": "Procedure:security.repo-parse",
        "authority": "propose",
        "trigger": "capture_landing",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.repo-parse.cruxible-v0.3.2-manifest",
        "lifecycle": "live",
        "procedure": "Procedure:security.repo-parse",
        "authority": "propose",
        "trigger": "capture_landing",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.repo-pull.cruxible-ci",
        "lifecycle": "live",
        "procedure": "Procedure:security.repo-acquire",
        "authority": "observe",
        "trigger": "cron",
        "triggers_inactive": "not enabled",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.sbom-import",
        "lifecycle": "live",
        "procedure": "Procedure:security.sbom-import",
        "authority": "propose",
        "trigger": "capture_landing",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      }
    ],
    "truncated": false,
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "97040dbfdd1e",
        "generation": 58
      },
      "fields": [
        "lines.enablement",
        "lines.triggers_inactive",
        "lines.due",
        "lines.waiting"
      ]
    },
    "next": [
      "cx.get(\"Line:security.cve-applicability\")"
    ]
  }
});

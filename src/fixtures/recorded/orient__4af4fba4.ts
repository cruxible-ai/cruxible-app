// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 22cb2382
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
    "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
    "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
    "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
    "surface": "sdk",
    "section": "lines",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_bff87e924cbb4f7f",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "generation": 12,
    "accepted_at": "2026-10-26T19:00:09.706610Z",
    "evaluation_time": "2026-10-26T19:05:02.656809Z",
    "section": "lines",
    "lines": [
      {
        "line": "Line:security.credential-import",
        "lifecycle": "live",
        "procedure": "Procedure:security.credential-import",
        "authority": "propose",
        "trigger": "capture_landing",
        "triggers_inactive": "not enabled",
        "due": 0,
        "waiting": 0
      },
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
        "line": "Line:security.inventory-import.prod",
        "lifecycle": "live",
        "procedure": "Procedure:security.inventory-import",
        "authority": "propose",
        "trigger": "capture_landing",
        "triggers_inactive": "not enabled",
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
        "procedure": "Procedure:security.fetch-observed",
        "authority": "observe",
        "trigger": "cron",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.kev-triage",
        "lifecycle": "live",
        "procedure": "Procedure:security.kev-triage",
        "authority": "propose",
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
        "enablement": "running",
        "due": 0,
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
        "triggers_inactive": "not enabled",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.registry-pull.cruxible",
        "lifecycle": "live",
        "procedure": "Procedure:security.registry-acquire",
        "authority": "observe",
        "trigger": "cron",
        "enablement": "running",
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
        "line": "Line:security.repo-pull.cruxible-ci",
        "lifecycle": "live",
        "procedure": "Procedure:security.repo-acquire",
        "authority": "observe",
        "trigger": "cron",
        "enablement": "running",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.sarif-attention.cruxible",
        "lifecycle": "live",
        "procedure": "Procedure:security.sarif-attention",
        "authority": "observe",
        "trigger": "capture_landing",
        "triggers_inactive": "not enabled",
        "due": 0,
        "waiting": 0
      },
      {
        "line": "Line:security.sarif-import.cruxible",
        "lifecycle": "live",
        "procedure": "Procedure:security.sarif-import",
        "authority": "propose",
        "trigger": "capture_landing",
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
        "git_oid": "f3765015f78f",
        "generation": 12
      },
      "fields": [
        "lines.enablement",
        "lines.triggers_inactive",
        "lines.due",
        "lines.waiting"
      ]
    },
    "next": [
      "cx.get(\"Line:security.credential-import\")"
    ]
  }
});

// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient b2bdacf1
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
    "section": "procedures",
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
    "evaluation_time": "2026-10-26T19:05:01.375278Z",
    "section": "procedures",
    "procedures": [
      {
        "name": "security.asset-fetch",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.credential-acquire",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.credential-import",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.cve-applicability",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.epss-acquire",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.epss-triage",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.evidence-acquire",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.fetch",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.fetch-observed",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.harden",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.inventory-acquire",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.inventory-import",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.kev-attention",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.kev-triage",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.log-acquire",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.log-import",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.osv-applicability",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.registry-acquire",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.registry-parse",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.repo-acquire",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.repo-parse",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.reproduction-acquire",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.respond",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.sarif-acquire",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.sarif-attention",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.sarif-import",
        "lifecycle": "live",
        "runnable": "line"
      },
      {
        "name": "security.sbom-acquire",
        "lifecycle": "live",
        "runnable": "direct"
      },
      {
        "name": "security.sbom-import",
        "lifecycle": "live",
        "runnable": "line"
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"Procedure:security.asset-fetch\")"
    ]
  }
});

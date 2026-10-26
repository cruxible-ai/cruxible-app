// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 7c52e4ec
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
    "section": "mandates",
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
    "evaluation_time": "2026-10-26T19:05:12.035556Z",
    "section": "mandates",
    "mandates": [
      {
        "mandate": "ProcedureMandate:security.credential-import-propose",
        "procedure": "Procedure:security.credential-import",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      },
      {
        "mandate": "ProcedureMandate:security.cve-applicability-propose",
        "procedure": "Procedure:security.cve-applicability",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      },
      {
        "mandate": "ProcedureMandate:security.epss-triage-propose",
        "procedure": "Procedure:security.epss-triage",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      },
      {
        "mandate": "ProcedureMandate:security.inventory-import-propose",
        "procedure": "Procedure:security.inventory-import",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      },
      {
        "mandate": "ProcedureMandate:security.kev-triage-propose",
        "procedure": "Procedure:security.kev-triage",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      },
      {
        "mandate": "ProcedureMandate:security.log-import-propose",
        "procedure": "Procedure:security.log-import",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      },
      {
        "mandate": "ProcedureMandate:security.osv-applicability-propose",
        "procedure": "Procedure:security.osv-applicability",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      },
      {
        "mandate": "ProcedureMandate:security.registry-parse-propose",
        "procedure": "Procedure:security.registry-parse",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      },
      {
        "mandate": "ProcedureMandate:security.repo-parse-propose",
        "procedure": "Procedure:security.repo-parse",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      },
      {
        "mandate": "ProcedureMandate:security.sarif-import-propose",
        "procedure": "Procedure:security.sarif-import",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      },
      {
        "mandate": "ProcedureMandate:security.sbom-import-propose",
        "procedure": "Procedure:security.sbom-import",
        "grants": "propose",
        "state": "active",
        "expires_at": "2026-11-25T17:42:26Z"
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"Mandate:security.credential-import-propose\")"
    ]
  }
});

// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch cb6f8075
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:94753130d41002b2a6e6f857f935bd204f3e6544fe634b397604bdd19619b653"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Proposal:sha256:94753130d41002b2a6e6f857f935bd204f3e6544fe634b397604bdd19619b653",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:94753130d41002b2a6e6f857f935bd204f3e6544fe634b397604bdd19619b653",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "robertmalone",
          "admitted_at": "2026-10-26T17:42:27.361165Z",
          "rationale": "Example consumer automation for the security kit (vulnerability loop, system model, code findings and incident response); adapt before submitting.",
          "changes": [
            {
              "path": "lines/security.credential-import.json",
              "change": "create"
            },
            {
              "path": "lines/security.cve-applicability.json",
              "change": "create"
            },
            {
              "path": "lines/security.epss-daily.json",
              "change": "create"
            },
            {
              "path": "lines/security.epss-triage.json",
              "change": "create"
            },
            {
              "path": "lines/security.harden.json",
              "change": "create"
            },
            {
              "path": "lines/security.inventory-import.prod.json",
              "change": "create"
            },
            {
              "path": "lines/security.kev-attention.json",
              "change": "create"
            },
            {
              "path": "lines/security.kev-daily.json",
              "change": "create"
            },
            {
              "path": "lines/security.kev-triage.json",
              "change": "create"
            },
            {
              "path": "lines/security.osv-applicability.json",
              "change": "create"
            },
            {
              "path": "lines/security.registry-parse.cruxible-client.json",
              "change": "create"
            },
            {
              "path": "lines/security.registry-parse.cruxible.json",
              "change": "create"
            },
            {
              "path": "lines/security.registry-pull.cruxible-client.json",
              "change": "create"
            },
            {
              "path": "lines/security.registry-pull.cruxible.json",
              "change": "create"
            },
            {
              "path": "lines/security.repo-parse.cruxible-ci.json",
              "change": "create"
            },
            {
              "path": "lines/security.repo-pull.cruxible-ci.json",
              "change": "create"
            },
            {
              "path": "lines/security.sarif-attention.cruxible.json",
              "change": "create"
            },
            {
              "path": "lines/security.sarif-import.cruxible.json",
              "change": "create"
            },
            {
              "path": "lines/security.sbom-import.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.credential-import-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.cve-applicability-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.epss-triage-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.inventory-import-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.kev-triage-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.log-import-propose.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "27 more; see detail=proof"
            }
          ],
          "next": []
        },
        "coordinate": {
          "git_oid": "f3765015f78f",
          "generation": 12
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "evaluation_time": "2026-10-26T19:05:11.499560Z"
      }
    ]
  }
});

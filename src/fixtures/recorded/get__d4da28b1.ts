// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 2a97454b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.release.product_alias",
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "ClaimType:security.release.product_alias",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.release.product_alias",
      "subject_kinds": [
        "security.release"
      ],
      "object": "string",
      "cardinality": "many",
      "description": "Another name the release's product goes by in vulnerability records, as an analyst states it citing evidence (a workspace file retained by security.evidence-acquire: the formula, the project page): vendor/product as a CVE record's affected entry names it (cli/cli for a Homebrew gh release), a package URL without version (pkg:golang/github.com/cli/cli/v2), a repository URL (https://github.com/cli/cli) or a CPE prefix (cpe:2.3:a:github:cli). security.cve-applicability matches a record by it as by the release's own name; re-acquire the record after stating it.",
      "roles": [
        "normative"
      ],
      "default_role": "normative",
      "evidence_requirement": "captured",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:security.file-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "retained-security-evidence",
          "roles": [
            "normative"
          ],
          "contracts": [
            "CaptureContract:security.file-v1"
          ],
          "admission": "direct"
        }
      ],
      "contention": {
        "selector": "all",
        "on_conflict": "unresolved"
      },
      "format": 8,
      "revision": 1,
      "path": "claim-types/security.release/product_alias.json",
      "live_claims": 0,
      "subjects_with_value": 0,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.release.product_alias\", detail=\"proof\")",
        "cx.get(\"CaptureContract:security.file-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:04:59.985722Z"
  }
});

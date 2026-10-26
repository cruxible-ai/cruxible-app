// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get d0061166
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.coverage.looked_for",
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
    "ref": "ClaimType:security.coverage.looked_for",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.coverage.looked_for",
      "subject_kinds": [
        "security.coverage"
      ],
      "object": "string",
      "cardinality": "many",
      "description": "A product a full runtime-inventory scan looked for, named as its releases are (php, debian/php8.2: a purl's namespace and name), or * for everything: the record of the question the scan asked. The scan states each asset's absence as an asset.runs none, only for a product it looked for (under *: a product the asset ran before or declares installing; name any other in looked_for); which versions of a looked-for product an asset runs are its runs, complete while the coverage is current.",
      "roles": [
        "observation"
      ],
      "default_role": "observation",
      "evidence_requirement": "captured",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:security.file-erasable-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "retained-security-evidence",
          "roles": [
            "observation"
          ],
          "contracts": [
            "CaptureContract:security.file-erasable-v1"
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
      "path": "claim-types/security.coverage/looked_for.json",
      "live_claims": 0,
      "subjects_with_value": 0,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.coverage.looked_for\", detail=\"proof\")",
        "cx.get(\"CaptureContract:security.file-erasable-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:04:59.517315Z"
  }
});

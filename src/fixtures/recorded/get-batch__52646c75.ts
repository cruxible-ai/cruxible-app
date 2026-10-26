// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch fde0e33a
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:1e87dfd08395a2375d63db5cdf1ba0046b6eac62e35b3cbaea0a4ac56084bb01"
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
        "ref": "Proposal:sha256:1e87dfd08395a2375d63db5cdf1ba0046b6eac62e35b3cbaea0a4ac56084bb01",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:1e87dfd08395a2375d63db5cdf1ba0046b6eac62e35b3cbaea0a4ac56084bb01",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "robertmalone",
          "admitted_at": "2026-10-26T17:42:07.199408Z",
          "changes": [
            {
              "path": "provider-interfaces/security.credential-state/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.cve-applicability/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.cyclonedx-components/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.epss-scores/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.harden/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.kev-attention/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.kev-catalog/v2.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.log-reads/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.osv-applicability/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.registry-facts/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.respond/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.runtime-inventory/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.sarif-findings/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.workflow-facts/v1.json",
              "change": "create"
            },
            {
              "path": "providers/security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21.json",
              "change": "create"
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
        "evaluation_time": "2026-10-26T19:05:11.445173Z"
      }
    ]
  }
});

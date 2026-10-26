// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 7c945fe7
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:1e3f764915b1acba1e10fb7bfd32448560fe6bd5556079b9371102553e099286"
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
        "ref": "Proposal:sha256:1e3f764915b1acba1e10fb7bfd32448560fe6bd5556079b9371102553e099286",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:1e3f764915b1acba1e10fb7bfd32448560fe6bd5556079b9371102553e099286",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "robertmalone",
          "admitted_at": "2026-10-26T17:42:00.919051Z",
          "rationale": "Install kit security 1.3.0.",
          "changes": [
            {
              "path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.fetched-large-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.fetched-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.file-erasable-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.file-v1.json",
              "change": "create"
            },
            {
              "path": "capture-contracts/security.observation-output-v1.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/built_from.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/declared_sha256.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/name.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/publish_environment.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/published_by.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/release.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/sha256.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/target.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/target_ref.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.artifact/uploaded_by.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.assessment/component.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.assessment/cve_id.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.assessment/expected_status.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.assessment/justification.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.assessment/release.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.assessment/release_id.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.assessment/status.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.assessment/vulnerability.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.asset/environment.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "220 more; see detail=proof"
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
        "evaluation_time": "2026-10-26T19:05:11.403541Z"
      }
    ]
  }
});

// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 6c4f8664
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml"
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
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-33619716784aff34abc1c806f22ab57c",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-098255f6703e41729d5a6c5a4c292160",
              "value": ".github/workflows/ci.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-1e63fbe808f29f420331dfe979cb2ea3",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-011a62d69a9e44856e0e7ff11ae803e2",
              "value": "github.com/cruxible-ai/cruxible@main",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-20f1877164742d5e95891ff9c525f0e8",
                "CLM-daa2f3bd6a1302ad69ba499f093bccfa"
              ],
              "value": [
                "pull_request:branches:main",
                "push:branches:main"
              ],
              "flags": []
            }
          ],
          "incoming_count": 4,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml\", detail=\"incoming\")"
          ]
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
        "evaluation_time": "2026-10-26T19:05:07.738917Z"
      }
    ]
  }
});

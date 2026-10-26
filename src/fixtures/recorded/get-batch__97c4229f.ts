// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 763d2b78
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
      "security.repo/github.com--cruxible-ai-cruxible"
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
        "ref": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
          "kind": "security.coverage",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "of",
              "claim": "CLM-2ffe66e3e83c25207c42078903db692c",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "revision",
              "claim": "CLM-2ad0afb116b683455a3e37d7c44ad55f",
              "value": "4e9b5db950bc66145fc72252be82b40a7826077c",
              "flags": []
            },
            {
              "predicate": "scope",
              "claim": "CLM-1e7d93f56d958c7c1cea07ec737347fc",
              "value": "ci.workflows",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-4ea2273788919658553863db188fdab5",
              "value": "github.com/cruxible-ai/cruxible@main:.github/workflows/",
              "flags": []
            }
          ],
          "incoming_count": 5,
          "next": [
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows\", detail=\"history\")",
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows\", detail=\"incoming\")"
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
        "evaluation_time": "2026-10-26T19:05:07.764171Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.repo/github.com--cruxible-ai-cruxible",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.repo/github.com--cruxible-ai-cruxible",
          "kind": "security.repo",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "forge_host",
              "claim": "CLM-a92c730fd89c50f1745cd87ca704237d",
              "value": "github.com",
              "flags": []
            },
            {
              "predicate": "full_name",
              "claim": "CLM-aec6f0bf65d8cd0a57f4d6928cf3914e",
              "value": "cruxible-ai/cruxible",
              "flags": []
            }
          ],
          "incoming_count": 7,
          "next": [
            "cx.get(\"security.repo/github.com--cruxible-ai-cruxible\", detail=\"history\")",
            "cx.get(\"security.repo/github.com--cruxible-ai-cruxible\", detail=\"incoming\")"
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
        "evaluation_time": "2026-10-26T19:05:07.818677Z"
      }
    ]
  }
});

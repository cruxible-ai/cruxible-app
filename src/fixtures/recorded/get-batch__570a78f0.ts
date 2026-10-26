// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch e58c0f70
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test"
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
        "ref": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "kind": "security.job",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "environment",
              "claim": "CLM-dc7df7e00c8ce96dce6407e0fd7783e4",
              "value": "none",
              "flags": []
            },
            {
              "predicate": "job_key",
              "claim": "CLM-003d31d2f2e06ddcd8785837d7fa719d",
              "value": "docker-image-test",
              "flags": []
            },
            {
              "predicate": "permission",
              "claim": [
                "CLM-e23fb125cf42e285a33b466817c9a9eb"
              ],
              "value": [
                "token:repository-default"
              ],
              "flags": []
            },
            {
              "predicate": "uses",
              "claim": [
                "CLM-43d7d3d84f4e701b4c03352351de26a9",
                "CLM-b0a99f4ab74a4d9809d5073181358066"
              ],
              "value": [
                "pkg:githubactions/astral-sh/setup-uv@v4",
                "pkg:githubactions/actions/checkout@v4"
              ],
              "flags": []
            },
            {
              "predicate": "workflow",
              "claim": "CLM-9deeb00b3d0b61a8df68f3ad666e84e7",
              "value": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
              "flags": []
            },
            {
              "predicate": "workflow_ref",
              "claim": "CLM-af3013cdabfe696e0c094a03c149640b",
              "value": "github.com/cruxible-ai/cruxible@main:.github/workflows/ci.yml",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:07.709742Z"
      }
    ]
  }
});

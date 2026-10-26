// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 7e6f7a26
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-dc7df7e00c8ce96dce6407e0fd7783e4",
      "CLM-003d31d2f2e06ddcd8785837d7fa719d",
      "CLM-e23fb125cf42e285a33b466817c9a9eb",
      "CLM-43d7d3d84f4e701b4c03352351de26a9",
      "CLM-b0a99f4ab74a4d9809d5073181358066",
      "CLM-9deeb00b3d0b61a8df68f3ad666e84e7",
      "CLM-af3013cdabfe696e0c094a03c149640b"
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
        "ref": "CLM-dc7df7e00c8ce96dce6407e0fd7783e4",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-dc7df7e00c8ce96dce6407e0fd7783e4",
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "predicate": "environment",
          "predicate_full": "security.job.environment",
          "value": "none",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T18:55:53.263624Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-dc7df7e00c8ce96dce6407e0fd7783e4\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-26T19:05:06.499398Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-003d31d2f2e06ddcd8785837d7fa719d",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-003d31d2f2e06ddcd8785837d7fa719d",
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "predicate": "job_key",
          "predicate_full": "security.job.job_key",
          "value": "docker-image-test",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T18:55:53.263624Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-003d31d2f2e06ddcd8785837d7fa719d\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-26T19:05:06.536948Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-e23fb125cf42e285a33b466817c9a9eb",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-e23fb125cf42e285a33b466817c9a9eb",
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "predicate": "permission",
          "predicate_full": "security.job.permission",
          "value": "token:repository-default",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T18:55:53.263624Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-e23fb125cf42e285a33b466817c9a9eb\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-26T19:05:06.578145Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-43d7d3d84f4e701b4c03352351de26a9",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-43d7d3d84f4e701b4c03352351de26a9",
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "predicate": "uses",
          "predicate_full": "security.job.uses",
          "value": "pkg:githubactions/astral-sh/setup-uv@v4",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T18:55:53.263624Z",
          "contenders": [
            {
              "claim": "CLM-b0a99f4ab74a4d9809d5073181358066",
              "value": "pkg:githubactions/actions/checkout@v4",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-43d7d3d84f4e701b4c03352351de26a9\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-26T19:05:06.612090Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-b0a99f4ab74a4d9809d5073181358066",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-b0a99f4ab74a4d9809d5073181358066",
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "predicate": "uses",
          "predicate_full": "security.job.uses",
          "value": "pkg:githubactions/actions/checkout@v4",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T18:55:53.263624Z",
          "contenders": [
            {
              "claim": "CLM-43d7d3d84f4e701b4c03352351de26a9",
              "value": "pkg:githubactions/astral-sh/setup-uv@v4",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-b0a99f4ab74a4d9809d5073181358066\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-26T19:05:06.686041Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-9deeb00b3d0b61a8df68f3ad666e84e7",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-9deeb00b3d0b61a8df68f3ad666e84e7",
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "predicate": "workflow",
          "predicate_full": "security.job.workflow",
          "value": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T18:55:53.263624Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-9deeb00b3d0b61a8df68f3ad666e84e7\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-26T19:05:06.726893Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-af3013cdabfe696e0c094a03c149640b",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-af3013cdabfe696e0c094a03c149640b",
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "predicate": "workflow_ref",
          "predicate_full": "security.job.workflow_ref",
          "value": "github.com/cruxible-ai/cruxible@main:.github/workflows/ci.yml",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T18:55:53.263624Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-af3013cdabfe696e0c094a03c149640b\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-26T19:05:06.785832Z"
      }
    ]
  }
});

// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 9439586d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Trigger:security.harden-daily",
      "Trigger:security.harden-on-registry",
      "Trigger:security.harden-on-snapshot"
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
        "ref": "Trigger:security.harden-daily",
        "kind": "trigger",
        "detail": "summary",
        "card": {
          "trigger": "Trigger:security.harden-daily",
          "lifecycle": "live",
          "schedule": {
            "kind": "cron",
            "expression": "40 7 * * *"
          },
          "target": "Line:security.harden",
          "next": [
            "cx.get(\"Trigger:security.harden-daily\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:12.879140Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Trigger:security.harden-on-registry",
        "kind": "trigger",
        "detail": "summary",
        "card": {
          "trigger": "Trigger:security.harden-on-registry",
          "lifecycle": "live",
          "schedule": {
            "kind": "capture_landing",
            "event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.fetched-v1"
              },
              "logical_sources": [
                "pypi.release"
              ]
            }
          },
          "target": "Line:security.harden",
          "next": [
            "cx.get(\"Trigger:security.harden-on-registry\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:12.894190Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Trigger:security.harden-on-snapshot",
        "kind": "trigger",
        "detail": "summary",
        "card": {
          "trigger": "Trigger:security.harden-on-snapshot",
          "lifecycle": "live",
          "schedule": {
            "kind": "capture_landing",
            "event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.fetched-v1"
              },
              "logical_sources": [
                "github.repo.snapshot"
              ]
            }
          },
          "target": "Line:security.harden",
          "next": [
            "cx.get(\"Trigger:security.harden-on-snapshot\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:12.905565Z"
      }
    ]
  }
});

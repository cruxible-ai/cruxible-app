// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 869fa91f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.repo-parse.cruxible-ci",
    "detail": "proof",
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
    "ref": "Line:security.repo-parse.cruxible-ci",
    "kind": "line",
    "detail": "proof",
    "proof": {
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
        "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
        "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
        "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
      },
      "path": "lines/security.repo-parse.cruxible-ci.json",
      "artifact_digest": "sha256:56cfb04fe41988ab455ea5b6717ea6f7f2ccedc6f7db4399aa8d1c9d2dc5a0a7",
      "envelope": {
        "artifact_format": "cruxible-line-v7",
        "identity": {
          "kind": "Line",
          "name": "security.repo-parse.cruxible-ci"
        },
        "occurrence_epoch": 1,
        "procedure": {
          "target": {
            "kind": "Procedure",
            "name": "security.repo-parse"
          }
        },
        "parameters": {
          "forge_host": "github.com",
          "full_name": "cruxible-ai/cruxible",
          "path": ".github/workflows/",
          "ref": "main",
          "repo_source": "github.com/cruxible-ai/cruxible@main",
          "scope": "ci.workflows",
          "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/"
        },
        "acquisition_policy": null,
        "max_authority": "propose",
        "trigger_input": "snapshot",
        "trigger_event": {
          "capture_contract_identity": {
            "kind": "CaptureContract",
            "name": "security.fetched-v1"
          }
        },
        "budgets": {
          "max_capture_bytes": 16777216,
          "max_items": 5000,
          "max_provider_calls": 2,
          "max_wall_clock_microseconds": 300000000
        },
        "epsilon": {
          "$decimal": "0.1"
        },
        "lifecycle": {
          "state": "live",
          "predecessor_digest": null
        }
      }
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
    "evaluation_time": "2026-10-26T19:05:15.882071Z"
  }
});

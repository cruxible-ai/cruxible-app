// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 6eef4577
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.registry-parse.cruxible",
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
    "ref": "Line:security.registry-parse.cruxible",
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
      "path": "lines/security.registry-parse.cruxible.json",
      "artifact_digest": "sha256:a2a20db169057947b59d542bd8f7863a214756b0e309836f43517a2dbafe177e",
      "envelope": {
        "artifact_format": "cruxible-line-v7",
        "identity": {
          "kind": "Line",
          "name": "security.registry-parse.cruxible"
        },
        "occurrence_epoch": 1,
        "procedure": {
          "target": {
            "kind": "Procedure",
            "name": "security.registry-parse"
          }
        },
        "parameters": {
          "project": "cruxible",
          "source": "pypi/cruxible",
          "versions": 3
        },
        "acquisition_policy": null,
        "max_authority": "propose",
        "trigger_input": "registry",
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
    "evaluation_time": "2026-10-26T19:05:14.857877Z"
  }
});

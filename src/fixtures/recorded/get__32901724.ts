// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get ce28eb22
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.epss-triage",
    "detail": "proof",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "Line:security.epss-triage",
    "kind": "line",
    "detail": "proof",
    "proof": {
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
        "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
        "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
        "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
      },
      "path": "lines/security.epss-triage.json",
      "artifact_digest": "sha256:f2359364007565e74ba5fee2b404eefa98fd8a321b0412f523fc0663840ab415",
      "envelope": {
        "artifact_format": "cruxible-line-v8",
        "identity": {
          "kind": "Line",
          "name": "security.epss-triage"
        },
        "occurrence_epoch": 1,
        "procedure": {
          "role": "procedure",
          "target": {
            "kind": "Procedure",
            "name": "security.epss-triage"
          },
          "artifact_digest": "sha256:006d069a6e3943dd18b2d2f4cb3b69ce1a100b1141c1e089ebd533fd0098a722"
        },
        "parameters": {
          "logical_source": "first.epss.api",
          "max_bytes": 4194304,
          "url": "https://api.first.org/data/v1/epss?cve=CVE-2021-44228,CVE-2023-4863,CVE-2014-0160,CVE-2017-0144,CVE-2019-0708,CVE-2023-44487,CVE-2022-22965,CVE-2021-26855,CVE-2024-3094,CVE-2023-38545"
        },
        "bindings": {
          "fetch": {
            "build": {
              "role": "provider",
              "target": {
                "kind": "Provider",
                "name": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
              },
              "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f"
            },
            "operation": "web.fetch"
          }
        },
        "acquisition": {
          "scores_api.capture": {
            "max_age": null,
            "on_unavailable": "refuse",
            "on_stale": "refuse",
            "on_oversized": "refuse",
            "permitted_replayability": null,
            "origins": [
              "https://api.first.org"
            ]
          }
        },
        "findings": {
          "inbox": [
            "extract_refused",
            "duplicate_key",
            "incomplete_source",
            "held_disagrees",
            "slot_contested",
            "claim_not_in_source"
          ]
        },
        "max_authority": "settle",
        "trigger_input": null,
        "trigger_event": null,
        "budgets": {
          "max_wall_clock_microseconds": 300000000,
          "max_provider_calls": 1,
          "max_capture_bytes": 16777216,
          "max_items": 20000
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
      "git_oid": "7f513078c490",
      "generation": 10
    },
    "accepted_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "evaluation_time": "2026-11-03T02:20:51.474318Z"
  }
});

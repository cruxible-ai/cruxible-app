// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get e59b366a
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.epss-triage",
    "detail": "proof",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
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
        "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
        "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
        "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "path": "lines/security.epss-triage.json",
      "artifact_digest": "sha256:dff66cdcfae4daeb94703b92f790bd99683e6b3b3f9e87e7f3df53b2b87505c0",
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
          "artifact_digest": "sha256:c3fab91633d80ae933a1a2ba9f39e2952f59ae215cfe5bf7bfd0b8cbbc495166"
        },
        "parameters": {
          "logical_source": "first.epss.api",
          "max_bytes": 4194304,
          "url": "https://api.first.org/data/v1/epss?cve="
        },
        "bindings": {
          "fetch": {
            "build": {
              "role": "provider",
              "target": {
                "kind": "Provider",
                "name": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688"
              },
              "artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72"
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
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "accepted_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "evaluation_time": "2026-11-08T19:48:01.558587Z"
  }
});

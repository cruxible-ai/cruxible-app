// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get a7659417
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.kev-triage",
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
    "ref": "Line:security.kev-triage",
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
      "path": "lines/security.kev-triage.json",
      "artifact_digest": "sha256:bfd95a272507803b77568b19c1278f51d9ad9748ae566aeb0205f6001a6d1593",
      "envelope": {
        "artifact_format": "cruxible-line-v8",
        "identity": {
          "kind": "Line",
          "name": "security.kev-triage"
        },
        "occurrence_epoch": 1,
        "procedure": {
          "role": "procedure",
          "target": {
            "kind": "Procedure",
            "name": "security.kev-triage"
          },
          "artifact_digest": "sha256:370213f2d63f980a324c1e5e4571e025bd548df87d04c1635be533a4652a6f17"
        },
        "parameters": {
          "logical_source": "cisa.kev.catalog",
          "max_bytes": 4194304,
          "url": "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
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
          "catalog.capture": {
            "max_age": null,
            "on_unavailable": "refuse",
            "on_stale": "refuse",
            "on_oversized": "refuse",
            "permitted_replayability": null,
            "origins": [
              "https://www.cisa.gov"
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
    "evaluation_time": "2026-11-07T22:23:00.659644Z"
  }
});

// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get c0963b41
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.osv-query",
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
    "ref": "Line:security.osv-query",
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
      "path": "lines/security.osv-query.json",
      "artifact_digest": "sha256:9414d065664fd6253f5e65d224da37a34024bb09e45287a7c20f07951bfddb47",
      "envelope": {
        "artifact_format": "cruxible-line-v8",
        "identity": {
          "kind": "Line",
          "name": "security.osv-query"
        },
        "occurrence_epoch": 1,
        "procedure": {
          "role": "procedure",
          "target": {
            "kind": "Procedure",
            "name": "security.osv-query"
          },
          "artifact_digest": "sha256:1e0a678683e0b487fb661477e48a5daad716d174c144828946dc95533b3e79e1"
        },
        "parameters": {
          "logical_source": "osv.dev.query"
        },
        "bindings": {
          "match": {
            "build": {
              "role": "provider",
              "target": {
                "kind": "Provider",
                "name": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
              },
              "artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728"
            },
            "operation": "osv.match"
          },
          "query": {
            "build": {
              "role": "provider",
              "target": {
                "kind": "Provider",
                "name": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
              },
              "artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728"
            },
            "operation": "osv.query"
          }
        },
        "acquisition": {
          "osv.responses": {
            "max_age": null,
            "on_unavailable": "refuse",
            "on_stale": "refuse",
            "on_oversized": "refuse",
            "permitted_replayability": null,
            "origins": [
              "https://api.osv.dev"
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
          "max_provider_calls": 2,
          "max_capture_bytes": 67108864,
          "max_items": 50000
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
    "evaluation_time": "2026-11-07T22:23:00.750113Z"
  }
});

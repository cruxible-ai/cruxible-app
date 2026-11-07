// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch c9602190
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.epss-triage",
      "Line:security.kev-triage",
      "Line:security.osv-query",
      "Line:security.sbom-import.app"
    ],
    "detail": "proof",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "results": [
      {
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
        "evaluation_time": "2026-11-07T22:22:54.981218Z"
      },
      {
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
        "evaluation_time": "2026-11-07T22:22:54.988135Z"
      },
      {
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
        "evaluation_time": "2026-11-07T22:22:54.995448Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.sbom-import.app",
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
          "path": "lines/security.sbom-import.app.json",
          "artifact_digest": "sha256:b616bff7e90c5dab6cc528caf2a940620e2acb2b795feb919c56d426ad0956e9",
          "envelope": {
            "artifact_format": "cruxible-line-v8",
            "identity": {
              "kind": "Line",
              "name": "security.sbom-import.app"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "role": "procedure",
              "target": {
                "kind": "Procedure",
                "name": "security.sbom-import"
              },
              "artifact_digest": "sha256:a10f9e25ee884f3f9f07e739b7c882ec702fc3779781ca51fe37cf5b1968f3b2"
            },
            "parameters": {
              "logical_source": "cyclonedx.sbom.app",
              "relative_path": "sbom.cdx.json"
            },
            "bindings": {
              "derive": {
                "build": {
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
                  },
                  "artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728"
                },
                "operation": "sbom.components"
              },
              "read": {
                "build": {
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-builtin"
                  },
                  "artifact_digest": "sha256:e78137f1a9a3078828a661580dc05b7a91764bff489b34512ef6298202be5bd0"
                },
                "operation": "workspace.file"
              }
            },
            "findings": {
              "inbox": [
                "extract_refused",
                "duplicate_key",
                "incomplete_source",
                "slot_contested"
              ]
            },
            "max_authority": "settle",
            "trigger_input": null,
            "trigger_event": null,
            "budgets": {
              "max_wall_clock_microseconds": 120000000,
              "max_provider_calls": 2,
              "max_capture_bytes": 8388608,
              "max_items": 40000
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
        "evaluation_time": "2026-11-07T22:22:55.002728Z"
      }
    ]
  }
});

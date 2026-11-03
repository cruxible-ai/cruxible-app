// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/next 9b24a667
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/next",
  "body": {
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "evaluation_time": "2026-11-03T02:20:48.167Z",
    "access_profile": {
      "tag": "playbill-coverage-access-profile-v1",
      "profile_id": "console",
      "permitted_access_classes": [
        "instance",
        "public"
      ]
    },
    "caller_surface": "sdk",
    "limit": 100
  },
  "response": {
    "tag": "playbill-next-result-v2",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "evaluation_time": "2026-11-03T02:20:48.167000Z",
    "observed_domains": [
      "accepted_state"
    ],
    "unobserved_domains": [
      "workspace_floor",
      "workspace_sources",
      "workspace_projections"
    ],
    "status": {
      "tag": "playbill-next-status-v1",
      "blocking": false,
      "instance": {
        "tag": "playbill-next-health-v1",
        "state": "active",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "floor": {
        "tag": "playbill-next-health-v1",
        "state": "not_observed",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "ledger_mirror": {
        "tag": "playbill-next-health-v1",
        "state": "not_configured",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "provider_lane": {
        "tag": "playbill-next-health-v1",
        "state": "available",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "procedure_catalog": {
        "tag": "playbill-next-health-v1",
        "state": "not_observed",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "compiler": {
        "tag": "playbill-next-health-v1",
        "state": "current",
        "detail": {
          "accepted_compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07",
          "accepted_compiler_revision": "capture-payload-v1",
          "running_compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07",
          "running_compiler_revision": "capture-payload-v1"
        },
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "line_dispatch": {
        "tag": "playbill-next-health-v1",
        "state": "idle",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "consumers": {
        "tag": "playbill-next-health-v1",
        "state": "current",
        "detail": {
          "workers": [
            {
              "curation": {
                "detected_through_generation": null,
                "detection_pending": false,
                "fire_position": 0,
                "last_error": null,
                "state": "running"
              },
              "evidence": {
                "generation": 10,
                "generations_behind": 0,
                "last_error": null,
                "pending_checks": 0,
                "state": "running",
                "sweep_in_progress": false,
                "sweep_position": 0
              },
              "facts": {
                "attestations_behind": false,
                "format": 13,
                "generation": 10,
                "generations_behind": 0,
                "inputs_changed": false,
                "last_error": null,
                "pending_expiry": false,
                "state": "running",
                "sweep_pending": false
              },
              "kind": "next",
              "line_upgrades": {
                "generation": 10,
                "state": "running"
              },
              "prediction": {
                "anchor_retry_position": 11,
                "capture_position": 148,
                "completed_anchor_retry_position": 11,
                "contract_backfill_in_progress": false,
                "contracts": 0,
                "generation": 10,
                "generations_behind": 0,
                "last_error": null,
                "open_windows": 0,
                "pending_anchor_retries": 0,
                "pending_contracts": 0,
                "resolution_position": 0,
                "resolved_windows": 0,
                "state": "running",
                "unbindable_anchors": 0
              },
              "run_failures": {
                "run_failures_pending": false,
                "state": "running"
              },
              "settled_refusals": {
                "settled_counts_pending": false,
                "state": "running"
              },
              "state": "running"
            },
            {
              "covered": 10,
              "kind": "floor",
              "outcome": {
                "error": null,
                "file_count": 34,
                "generation": 10,
                "status": "written",
                "tag": "playbill-floor-consumer-outcome-v1"
              },
              "state": "running"
            }
          ]
        },
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "triggers": {
        "tag": "playbill-next-health-v1",
        "state": "scheduled",
        "detail": {
          "scheduled": {
            "evidence.sweep": [
              "Trigger:evidence-sweep"
            ],
            "floor.refresh": [
              "Trigger:floor-refresh"
            ],
            "prediction.anchor_retry": [
              "Trigger:prediction-anchor-retry"
            ]
          }
        },
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "held": 0,
      "prior_refusal_coverage": null
    },
    "items": [
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:fe024ad4c9c526dc5915a93c87f5907bd0c5f75108ec1af19db4c0a1a02ce76a",
        "severity": "setup",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.epss-triage",
        "related_identities": [],
        "detail": {
          "detail": "accepted but never enabled; enable it to run on its Triggers"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.line.enable",
          "tool": "cruxible_line_enable",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_d8e6dcb48e6a4d0d; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: pilot-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        },
        "since": "2026-11-03T00:58:40.256215+00:00"
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:8299072944ddbf0e8bda84898e31d1ff86890d880413ef3637538cfbdd174d7b",
        "severity": "setup",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.kev-triage",
        "related_identities": [],
        "detail": {
          "detail": "accepted but never enabled; enable it to run on its Triggers"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.line.enable",
          "tool": "cruxible_line_enable",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_d8e6dcb48e6a4d0d; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: pilot-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        },
        "since": "2026-11-03T00:58:40.256215+00:00"
      }
    ],
    "total_items": 2,
    "next_cursor": null,
    "result_digest": "sha256:05c65d48513b6d145210702695ff8f20569cb49f6969b74963da285b5a8a6e9c",
    "delta_since": null,
    "attestation_head_digest": "sha256:a7ec81883207088795ab97b95fb03be7209fbeb2d9c3cc2558697093dc0183bf"
  }
});

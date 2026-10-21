// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/next 275ec514
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/next",
  "body": {
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "evaluation_time": "2026-10-21T19:49:22.141Z",
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
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "evaluation_time": "2026-10-21T19:49:22.141000Z",
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
          "accepted_compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
          "accepted_compiler_revision": "provider-builds-v1",
          "running_compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
          "running_compiler_revision": "provider-builds-v1"
        },
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "line_dispatch": {
        "tag": "playbill-next-health-v1",
        "state": "due",
        "detail": {
          "due": 3,
          "lines": [
            {
              "due": 1,
              "line_identity_digest": "sha256:24678f9be989053275627387cff7ac3590db5842a3399180fce2a690fcadaed6",
              "oldest_eligible_at": "2026-10-21T07:40:00+00:00",
              "waiting": 0
            },
            {
              "due": 1,
              "line_identity_digest": "sha256:4b3e9d71b33f4edc5a709bd8dd53f89a44dcf9c93f893799bae9cc9e6f39941e",
              "oldest_eligible_at": "2026-10-20T15:30:00+00:00",
              "waiting": 0
            },
            {
              "due": 1,
              "line_identity_digest": "sha256:dca0de9ff0cc644a69cb568dd0ecf8f3dcff93d1264ea9a89310323c034dcc3d",
              "oldest_eligible_at": "2026-10-21T13:45:00+00:00",
              "waiting": 0
            }
          ],
          "waiting": 0
        },
        "repair": null,
        "repair_hidden": true,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.line.dispatch",
          "tool": "cruxible_line_dispatch",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      "consumers": {
        "tag": "playbill-next-health-v1",
        "state": "current",
        "detail": {
          "line_enablements": {
            "running": 10,
            "stalled": 0,
            "stopped": 3
          },
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
                "generation": 58,
                "generations_behind": 0,
                "last_error": null,
                "pending_checks": 0,
                "state": "running",
                "sweep_in_progress": false,
                "sweep_position": 66
              },
              "facts": {
                "attestations_behind": false,
                "format": 11,
                "generation": 58,
                "generations_behind": 0,
                "inputs_changed": false,
                "last_error": null,
                "pending_expiry": false,
                "state": "running",
                "sweep_pending": false
              },
              "kind": "next",
              "line_upgrades": {
                "generation": 58,
                "state": "running"
              },
              "prediction": {
                "anchor_retry_position": 89,
                "capture_position": 1897,
                "completed_anchor_retry_position": 89,
                "contract_backfill_in_progress": false,
                "contracts": 2,
                "generation": 58,
                "generations_behind": 0,
                "last_error": null,
                "open_windows": 0,
                "pending_anchor_retries": 0,
                "pending_contracts": 0,
                "resolution_position": 236,
                "resolved_windows": 2,
                "state": "running",
                "unbindable_anchors": 0
              },
              "settled_refusals": {
                "settled_counts_pending": false,
                "state": "running"
              },
              "state": "running"
            },
            {
              "covered": 58,
              "kind": "floor",
              "outcome": {
                "error": null,
                "file_count": 200,
                "generation": 58,
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
        "item_id": "sha256:19ad5f7b02d2f1c748413c7718d4c181bf0e6840aca88b564de35348d2fda8a1",
        "severity": "repair",
        "reason": "claim_stale_evidence",
        "subject_identity": "Claim:CLM-5958666f8557aa56531b939f7e092e60",
        "related_identities": [
          "subjects/security.coverage/pypi-cruxible-client--registry.files.json"
        ],
        "detail": {
          "expired_capture_digests": [
            "sha256:6566239b3c5810234913fe6f6bbd87127c541b7808d4408c2243dde42e835c85"
          ],
          "last_expired_at": "2026-10-20T09:44:12.310045+00:00",
          "predicate": "security.coverage.revision",
          "verdict": "stale_evidence"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.set",
          "tool": "cruxible_set",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:90e792eb3e2cb5227cda6f14def4af702a429a10aeb01d6ae22c65a0743f4e84",
        "severity": "repair",
        "reason": "claim_stale_evidence",
        "subject_identity": "Claim:CLM-7052ca2a7c9a819389901f9dfa41993b",
        "related_identities": [
          "subjects/security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows.json"
        ],
        "detail": {
          "expired_capture_digests": [
            "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
          ],
          "last_expired_at": "2026-10-20T09:47:00.303570+00:00",
          "predicate": "security.coverage.revision",
          "verdict": "stale_evidence"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.set",
          "tool": "cruxible_set",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:ddaf218e7de9d0282d379779dde5dc7c9926854ad5b9b6313b52c3f428791597",
        "severity": "repair",
        "reason": "claim_stale_evidence",
        "subject_identity": "Claim:CLM-8535bf9214bc303f5c01763e0a47b2e9",
        "related_identities": [
          "subjects/security.coverage/github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest.json"
        ],
        "detail": {
          "expired_capture_digests": [
            "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
          ],
          "last_expired_at": "2026-10-20T09:47:40.693802+00:00",
          "predicate": "security.coverage.revision",
          "verdict": "stale_evidence"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.set",
          "tool": "cruxible_set",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:a23b3727b00789be74ae7e4ed2a2d83a27b5250fbe16d2eec543d6fccd935bab",
        "severity": "repair",
        "reason": "claim_stale_evidence",
        "subject_identity": "Claim:CLM-adf497c8bb094e3cf7caaf9a39e27562",
        "related_identities": [
          "subjects/security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows.json"
        ],
        "detail": {
          "expired_capture_digests": [
            "sha256:67566c180892c4abaf81ea06481c3ae2a595df62da0453558d23fd7009bfd3ce"
          ],
          "last_expired_at": "2026-10-20T09:45:41.972939+00:00",
          "predicate": "security.coverage.revision",
          "verdict": "stale_evidence"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.set",
          "tool": "cruxible_set",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:80f8d3eed2a11b0991aa79c91d12d0e6697a549458205a657438d45a1c85ea26",
        "severity": "repair",
        "reason": "claim_stale_evidence",
        "subject_identity": "Claim:CLM-dfcd9b564d73cd3f7663c10ed694bdee",
        "related_identities": [
          "subjects/security.coverage/pypi-cruxible--registry.files.json"
        ],
        "detail": {
          "expired_capture_digests": [
            "sha256:456472d9f19806228387cf0fdca9e3fd24e9addb2281e631d6604f3095402c61"
          ],
          "last_expired_at": "2026-10-20T09:43:57.664636+00:00",
          "predicate": "security.coverage.revision",
          "verdict": "stale_evidence"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.set",
          "tool": "cruxible_set",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:3d93ca9e01477199122721d06bec4107583e97193b07e287fed530a717ede163",
        "severity": "repair",
        "reason": "consumer_stalled",
        "subject_identity": "Line:security.epss-daily",
        "related_identities": [],
        "detail": {
          "detail": "The daemon's permission mode READ_ONLY no longer permits dispatch.",
          "enablement_id": "f47c17c5b8ce4729a34365b63f14bc3c",
          "enablement_state": "stopped",
          "kind": "line",
          "pending_automatic": 0,
          "pending_explicit": 1,
          "state": "stopped",
          "stop_reason": "permission_insufficient",
          "stopped_at": "2026-10-21T13:44:02.448979+00:00"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.line.enable",
          "tool": "cruxible_line_enable",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:6a7c69828fcaf6d972507887a5a4f9c31cb78dcb098b34174d27cb6c53e038cd",
        "severity": "repair",
        "reason": "consumer_stalled",
        "subject_identity": "Line:security.harden",
        "related_identities": [],
        "detail": {
          "detail": "The daemon's permission mode READ_ONLY no longer permits dispatch.",
          "enablement_id": "58b7eb44a1084b8986088b04afe1d8fa",
          "enablement_state": "stopped",
          "kind": "line",
          "pending_automatic": 0,
          "pending_explicit": 1,
          "state": "stopped",
          "stop_reason": "permission_insufficient",
          "stopped_at": "2026-10-21T07:39:07.206546+00:00"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.line.enable",
          "tool": "cruxible_line_enable",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:13f6adf84d2e1acc587a40a2f16eef6cf9ffa2f5a0dbcf696ee4287b1041c81c",
        "severity": "repair",
        "reason": "line_inbox_unread",
        "subject_identity": "Line:security.harden",
        "related_identities": [],
        "detail": {
          "detail": "23 new inbox items from Line:security.harden.",
          "unread": 23
        },
        "repair": {
          "operation": "cruxible.inbox.list",
          "target": "Line:security.harden",
          "required_change": "judge_the_lines_unread_inbox_items",
          "arguments": {
            "line": "security.harden",
            "status": "unread"
          },
          "command": "cx.inbox().list(line=\"security.harden\", status=\"unread\")"
        },
        "repair_requires": null
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:d95b2f6bbc0f8afa6dc265155cf781bd09739f010e72949a182e2a5ab06750b4",
        "severity": "repair",
        "reason": "consumer_stalled",
        "subject_identity": "Line:security.osv-applicability",
        "related_identities": [],
        "detail": {
          "detail": "The daemon's permission mode READ_ONLY no longer permits dispatch.",
          "enablement_id": "d370090b3143439990b18c9307815ee3",
          "enablement_state": "stopped",
          "kind": "line",
          "pending_automatic": 0,
          "pending_explicit": 1,
          "state": "stopped",
          "stop_reason": "permission_insufficient",
          "stopped_at": "2026-10-20T15:29:48.730540+00:00"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.line.enable",
          "tool": "cruxible_line_enable",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      }
    ],
    "total_items": 9,
    "next_cursor": null,
    "result_digest": "sha256:94dd6672e118984af5c76872a1d007310a14d02c484910dfc254787ceccc6744",
    "delta_since": null,
    "attestation_head_digest": "sha256:e0966becb8965e9dd07b22663a268118df10709dd80ed3ebfd9a673a180fecc5"
  }
});

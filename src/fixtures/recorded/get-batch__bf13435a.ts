// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch e551d8ff
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:939f79ec5240df01443571e30c97aee0e5943a67205321fdbfa767f473775a69"
    ],
    "detail": "summary",
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
        "ref": "Proposal:sha256:939f79ec5240df01443571e30c97aee0e5943a67205321fdbfa767f473775a69",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:939f79ec5240df01443571e30c97aee0e5943a67205321fdbfa767f473775a69",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "owner",
          "admitted_at": "2026-10-09T11:59:00.000000Z",
          "generation": 6,
          "changes": [
            {
              "path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.app_exposure/justification.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.app_exposure/occurrence.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.app_exposure/vulnerability.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.catalog/catalog_id.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.component/affected_by.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.component/purl.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.exposure/component.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.exposure/justification.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.exposure/vulnerability.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.inventory/inventory_id.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.occurrence/component.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.occurrence/inventory.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.occurrence/scope.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/cve_id.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/epss_percentile.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/epss_score.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/epss_score_date.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/kev_date_added.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/kev_due_date.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/kev_ransomware_use.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/listed_in.json",
              "change": "create"
            },
            {
              "path": "contracts/security.app-judgment/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/security.epss-row/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/security.exposure-row/v1.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "23 more; see detail=proof"
            }
          ],
          "next": []
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
        "evaluation_time": "2026-11-08T19:48:01.423842Z"
      }
    ]
  }
});

// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 1485817c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CaptureContract:playbill.coordinator-self-source-v1",
      "CaptureContract:playbill.foreign-source.triage.notes",
      "CaptureContract:security.cyclonedx-sbom",
      "CaptureContract:security.epss-scores",
      "CaptureContract:security.kev-catalog",
      "CaptureContract:security.osv-matches",
      "CaptureContract:security.osv-response",
      "CaptureContract:security.sbom-components"
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
        "ref": "CaptureContract:playbill.coordinator-self-source-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:playbill.coordinator-self-source-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "grade": "observed",
            "source_kinds": [
              "cas"
            ]
          },
          "admitted_by": [
            "security.app_exposure.justification",
            "security.app_exposure.occurrence",
            "security.app_exposure.vulnerability",
            "security.catalog.catalog_id",
            "security.component.affected_by",
            "security.component.purl",
            "security.exposure.component",
            "security.exposure.justification",
            "security.exposure.vulnerability",
            "security.inventory.inventory_id",
            "security.occurrence.component",
            "security.occurrence.inventory",
            "security.vulnerability.cve_id",
            "semantic.alias",
            "semantic.distinct_from"
          ],
          "next": [
            "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.app_exposure.justification\")"
          ]
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
        "evaluation_time": "2026-11-07T22:22:54.648331Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:playbill.foreign-source.triage.notes",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:playbill.foreign-source.triage.notes",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [],
          "next": [
            "cx.get(\"CaptureContract:playbill.foreign-source.triage.notes\", detail=\"history\")"
          ]
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
        "evaluation_time": "2026-11-07T22:22:54.656527Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.cyclonedx-sbom",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.cyclonedx-sbom",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [],
          "next": [
            "cx.get(\"CaptureContract:security.cyclonedx-sbom\", detail=\"history\")"
          ]
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
        "evaluation_time": "2026-11-07T22:22:54.664751Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.epss-scores",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.epss-scores",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.vulnerability.epss_percentile",
            "security.vulnerability.epss_score",
            "security.vulnerability.epss_score_date"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.epss-scores\", detail=\"history\")",
            "cx.get(\"ClaimType:security.vulnerability.epss_percentile\")"
          ]
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
        "evaluation_time": "2026-11-07T22:22:54.673131Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.kev-catalog",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.kev-catalog",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.vulnerability.kev_date_added",
            "security.vulnerability.kev_due_date",
            "security.vulnerability.kev_ransomware_use",
            "security.vulnerability.listed_in"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.kev-catalog\", detail=\"history\")",
            "cx.get(\"ClaimType:security.vulnerability.kev_date_added\")"
          ]
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
        "evaluation_time": "2026-11-07T22:22:54.680583Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.osv-matches",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.osv-matches",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "grade": "derived",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.component.affected_by"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.osv-matches\", detail=\"history\")",
            "cx.get(\"ClaimType:security.component.affected_by\")"
          ]
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
        "evaluation_time": "2026-11-07T22:22:54.688222Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.osv-response",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.osv-response",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [],
          "next": [
            "cx.get(\"CaptureContract:security.osv-response\", detail=\"history\")"
          ]
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
        "evaluation_time": "2026-11-07T22:22:54.696005Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.sbom-components",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.sbom-components",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "grade": "derived",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.occurrence.scope"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.sbom-components\", detail=\"history\")",
            "cx.get(\"ClaimType:security.occurrence.scope\")"
          ]
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
        "evaluation_time": "2026-11-07T22:22:54.703912Z"
      }
    ]
  }
});

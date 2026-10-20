// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch aaa02ba1
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CaptureContract:playbill.coordinator-self-source-v1",
      "CaptureContract:playbill.foreign-source.doc-investigations-84e283f0451cc97a.md",
      "CaptureContract:security.cve-record-http-v1",
      "CaptureContract:security.cyclonedx-sbom-v1",
      "CaptureContract:security.epss-daily-v1",
      "CaptureContract:security.github-api-v1",
      "CaptureContract:security.github-release-v1",
      "CaptureContract:security.kev-http-v1",
      "CaptureContract:security.observation-output-v1",
      "CaptureContract:security.osv-query-v1",
      "CaptureContract:security.pypi-release-v1",
      "CaptureContract:security.release-asset-v1",
      "CaptureContract:security.repo-snapshot-v1",
      "CaptureContract:security.workspace-evidence-v1"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
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
            "sources": [
              "playbill.coordinator-authoring"
            ],
            "evidence_kinds": [
              "self_asserted"
            ],
            "grade": "observed",
            "source_kinds": [
              "cas"
            ]
          },
          "admitted_by": [
            "security.artifact.release",
            "security.assessment.justification",
            "security.assessment.release",
            "security.assessment.status",
            "security.assessment.vulnerability",
            "security.product.supplied_by",
            "security.release.product",
            "security.signal.explained_by",
            "security.signal.observed",
            "security.target.source_repo",
            "semantic.alias",
            "semantic.distinct_from"
          ],
          "next": [
            "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.artifact.release\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.027680Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:playbill.foreign-source.doc-investigations-84e283f0451cc97a.md",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:playbill.foreign-source.doc-investigations-84e283f0451cc97a.md",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "doc-investigations-84e283f0451cc97a.md"
            ],
            "evidence_kinds": [
              "self_asserted"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [],
          "next": [
            "cx.get(\"CaptureContract:playbill.foreign-source.doc-investigations-84e283f0451cc97a.md\", detail=\"history\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.038262Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.cve-record-http-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.cve-record-http-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "cve.record"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.assessment.justification",
            "security.assessment.release",
            "security.assessment.status",
            "security.assessment.vulnerability",
            "security.vulnerability.title",
            "security.vulnerability.vendor_product"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.cve-record-http-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.assessment.justification\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.048622Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.cyclonedx-sbom-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.cyclonedx-sbom-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "cyclonedx.sbom"
            ],
            "evidence_kinds": [
              "sbom_document"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.product.supplied_by",
            "security.release.component",
            "security.release.product"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.cyclonedx-sbom-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.product.supplied_by\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.059601Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.epss-daily-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.epss-daily-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "first.epss.daily"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.vulnerability.epss_percentile",
            "security.vulnerability.epss_score"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.epss-daily-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.vulnerability.epss_percentile\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.071030Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.github-api-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.github-api-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "github.api"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.artifact.built_from",
            "security.signal.explained_by",
            "security.signal.observed"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.github-api-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.artifact.built_from\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.082457Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.github-release-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.github-release-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "github.release"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.artifact.built_from",
            "security.artifact.published_by",
            "security.artifact.release",
            "security.artifact.sha256",
            "security.artifact.target",
            "security.artifact.uploaded_by",
            "security.signal.explained_by",
            "security.signal.observed"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.github-release-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.artifact.built_from\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.095061Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.kev-http-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.kev-http-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "cisa.kev.catalog"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.vulnerability.kev_cwes",
            "security.vulnerability.kev_date_added",
            "security.vulnerability.kev_due_date",
            "security.vulnerability.kev_listed",
            "security.vulnerability.kev_ransomware_use",
            "security.vulnerability.title",
            "security.vulnerability.vendor_product"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.kev-http-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.vulnerability.kev_cwes\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.107693Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.observation-output-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.observation-output-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "security.observation"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "cas"
            ]
          },
          "admitted_by": [
            "security.assessment.justification",
            "security.assessment.status",
            "security.signal.observed",
            "security.vulnerability.kev_cwes",
            "security.vulnerability.kev_date_added",
            "security.vulnerability.kev_due_date",
            "security.vulnerability.kev_listed",
            "security.vulnerability.kev_ransomware_use",
            "security.work.verification"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.observation-output-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.assessment.justification\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.119576Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.osv-query-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.osv-query-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "osv.dev.query"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.assessment.justification",
            "security.assessment.release",
            "security.assessment.status",
            "security.assessment.vulnerability"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.osv-query-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.assessment.justification\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.131237Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.pypi-release-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.pypi-release-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "pypi.release"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.artifact.built_from",
            "security.artifact.publish_environment",
            "security.artifact.published_by",
            "security.artifact.release",
            "security.artifact.sha256",
            "security.artifact.target",
            "security.coverage.of",
            "security.coverage.revision",
            "security.signal.explained_by",
            "security.signal.observed",
            "security.target.source_repo"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.pypi-release-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.artifact.built_from\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.143228Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.release-asset-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.release-asset-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "github.release.asset"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.artifact.sha256",
            "security.signal.explained_by",
            "security.signal.observed"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.release-asset-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.artifact.sha256\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.154749Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.repo-snapshot-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.repo-snapshot-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "github.repo.snapshot"
            ],
            "evidence_kinds": [
              "http_response"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.artifact.declared_sha256",
            "security.artifact.target",
            "security.coverage.of",
            "security.coverage.revision",
            "security.job.environment",
            "security.job.needs",
            "security.job.permission",
            "security.job.publishes_to",
            "security.job.secret",
            "security.job.uses",
            "security.job.workflow",
            "security.signal.explained_by",
            "security.signal.observed",
            "security.target.source_repo",
            "security.workflow.coverage",
            "security.workflow.repo",
            "security.workflow.trigger"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.repo-snapshot-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.artifact.declared_sha256\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.183467Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.workspace-evidence-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.workspace-evidence-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "sources": [
              "security.analysis.evidence"
            ],
            "evidence_kinds": [
              "workspace_file"
            ],
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.assessment.justification",
            "security.assessment.status",
            "security.signal.observed"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.workspace-evidence-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.assessment.justification\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-20T21:51:41.210926Z"
      }
    ]
  }
});

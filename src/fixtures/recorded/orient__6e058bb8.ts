// Recorded from cruxible-core 4b93ac12afc3d8bb8477e96c2062e91b073076e9 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient d11dd4d2
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
    "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
    "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
    "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
    "surface": "sdk",
    "section": "capture_contracts",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_be4d690f30d64371",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "generation": 58,
    "accepted_at": "2026-10-19T21:49:14.351998Z",
    "evaluation_time": "2026-10-20T21:15:29.554757Z",
    "section": "capture_contracts",
    "capture_contracts": [
      {
        "contract": "CaptureContract:playbill.coordinator-self-source-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 12
      },
      {
        "contract": "CaptureContract:playbill.foreign-source.doc-investigations-84e283f0451cc97a.md",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 0
      },
      {
        "contract": "CaptureContract:security.cve-record-http-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 6
      },
      {
        "contract": "CaptureContract:security.cyclonedx-sbom-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 3
      },
      {
        "contract": "CaptureContract:security.epss-daily-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 2
      },
      {
        "contract": "CaptureContract:security.github-api-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 3
      },
      {
        "contract": "CaptureContract:security.github-release-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 8
      },
      {
        "contract": "CaptureContract:security.kev-http-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 7
      },
      {
        "contract": "CaptureContract:security.observation-output-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 9
      },
      {
        "contract": "CaptureContract:security.osv-query-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 4
      },
      {
        "contract": "CaptureContract:security.pypi-release-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 11
      },
      {
        "contract": "CaptureContract:security.release-asset-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 3
      },
      {
        "contract": "CaptureContract:security.repo-snapshot-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 17
      },
      {
        "contract": "CaptureContract:security.workspace-evidence-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 3
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
    ]
  }
});

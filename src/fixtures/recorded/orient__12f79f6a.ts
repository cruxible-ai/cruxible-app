// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 6f53ae17
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
    "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
    "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
    "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf",
    "surface": "sdk",
    "section": "capture_contracts",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_console05",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "generation": 22,
    "accepted_at": "2026-11-07T22:22:25.432116Z",
    "evaluation_time": "2026-11-07T22:22:54.545358Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "section": "capture_contracts",
    "capture_contracts": [
      {
        "contract": "CaptureContract:playbill.coordinator-self-source-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 15
      },
      {
        "contract": "CaptureContract:playbill.foreign-source.triage.notes",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 0
      },
      {
        "contract": "CaptureContract:security.cyclonedx-sbom",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 0
      },
      {
        "contract": "CaptureContract:security.epss-scores",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 3
      },
      {
        "contract": "CaptureContract:security.kev-catalog",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 4
      },
      {
        "contract": "CaptureContract:security.osv-matches",
        "version": 1,
        "lifecycle": "live",
        "grade": "derived",
        "admitted_by": 1
      },
      {
        "contract": "CaptureContract:security.osv-response",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 0
      },
      {
        "contract": "CaptureContract:security.sbom-components",
        "version": 1,
        "lifecycle": "live",
        "grade": "derived",
        "admitted_by": 1
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
    ]
  }
});

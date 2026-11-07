// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch f029a318
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Capture:sha256:0239f03a7356b68e57d96164fa3d28dc00efd37e23481e0ce94ba8f76cf769e5",
      "Capture:sha256:9b75f24c295fd579c649c7d9dd77967fd6948bf9b99ec84f185dd6f5028c4840"
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
        "ref": "Capture:sha256:0239f03a7356b68e57d96164fa3d28dc00efd37e23481e0ce94ba8f76cf769e5",
        "kind": "capture",
        "detail": "summary",
        "card": {
          "capture": "CAP-0239f03a7356",
          "digest": "sha256:0239f03a7356b68e57d96164fa3d28dc00efd37e23481e0ce94ba8f76cf769e5",
          "contract": "CaptureContract:playbill.coordinator-self-source-v1",
          "version": 1,
          "observed_at": "2026-11-07T22:22:26.354876Z",
          "access": "instance",
          "status": "available",
          "subjects": [],
          "citing": [],
          "citing_total": 0,
          "next": [
            "client.read_capture(instance_id, CaptureReadRequest(capture_digest=\"sha256:0239f03a7356b68e57d96164fa3d28dc00efd37e23481e0ce94ba8f76cf769e5\"))"
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
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "30e90cc6ad34",
            "generation": 22
          },
          "fields": [
            "status",
            "status_detail"
          ]
        },
        "evaluation_time": "2026-11-07T22:22:57.048276Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Capture:sha256:9b75f24c295fd579c649c7d9dd77967fd6948bf9b99ec84f185dd6f5028c4840",
        "kind": "capture",
        "detail": "summary",
        "card": {
          "capture": "CAP-9b75f24c295f",
          "digest": "sha256:9b75f24c295fd579c649c7d9dd77967fd6948bf9b99ec84f185dd6f5028c4840",
          "contract": "CaptureContract:playbill.foreign-source.triage.notes",
          "version": 1,
          "source": "triage.notes",
          "observed_at": "2026-11-07T22:22:26.354876Z",
          "access": "instance",
          "status": "available",
          "subjects": [],
          "citing": [],
          "citing_total": 0,
          "next": [
            "client.read_capture(instance_id, CaptureReadRequest(capture_digest=\"sha256:9b75f24c295fd579c649c7d9dd77967fd6948bf9b99ec84f185dd6f5028c4840\"))"
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
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "30e90cc6ad34",
            "generation": 22
          },
          "fields": [
            "status",
            "status_detail"
          ]
        },
        "evaluation_time": "2026-11-07T22:22:57.059304Z"
      }
    ]
  }
});

// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/inbox ce30819c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/inbox",
  "query": {
    "limit": 50,
    "line": "security.harden"
  },
  "response": {
    "tag": "cruxible-inbox-list-v1",
    "line_filter": "Line:security.harden",
    "status_filter": null,
    "entries": [
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-ea5dd9d4958f1c57cefcdb9978559ef84910f3787e89274ef5ef707ea088ad36",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 1,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
            "posted_at": "2026-10-19T21:48:00.649051Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:ea5dd9d4958f1c57cefcdb9978559ef84910f3787e89274ef5ef707ea088ad36",
          "payload_digest": "sha256:9683b972b2db4ce2878437323d2d7209052324a7a6e96a68d226a488ffa7a30e",
          "payload_bytes": 517,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"artifact\":\"v0.3.2/agent-release-0.3.2.tar.gz\",\"declared\":{\"claim\":\"CLM-b2a7493c624d41b477116c2ba565a97f\",\"value\":\"sha256:b24a13d92dd698c0a3f605b2b88d5cedc249d4af48a13a01a0751c309c0acf3a\"},\"disagreement\":\"digest\",\"kind\":\"finding\",\"question\":\"HQ5\",\"served\":{\"claim\":\"CLM-d5158ff13dcd4b5ce6d4ed368119cea0\",\"value\":\"sha256:6f11bc5da817108f7fd4009c25f713ea5d0f0b4696b2b29b677e5b7928a9f627\"},\"subject\":\"github_release/cruxible-ai/cruxible:v0.3.2/agent-release-0.3.2.tar.gz\",\"target\":\"github_release/cruxi",
          "length": 517
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-e4fa4787bf67e9ff2b10a34bea6b0dd0fda4212b761e29252c08624afd65e55f",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 11,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-23415526699a61464e726c8f965af0831948b63d68c3487ad3140ff84b3cf897",
            "posted_at": "2026-10-19T21:44:13.315980Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
              "posted_at": "2026-10-19T21:47:03.668443Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:e4fa4787bf67e9ff2b10a34bea6b0dd0fda4212b761e29252c08624afd65e55f",
          "payload_digest": "sha256:cf226021a4aef3d431688c8737429b2ef0535e33ba7ad074f55e3f7c05392085",
          "payload_bytes": 319,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "input": {
              "forge_host": "github.com",
              "full_name": "cruxible-ai/cruxible",
              "path": ".github/workflows/",
              "ref": "f88f4a6567331c4810c93894efc252db501e876c",
              "scope": "ci.workflows"
            },
            "kind": "gap",
            "pull": "security.repo-acquire",
            "source": "github.com/cruxible-ai/cruxible@f88f4a6567331c4810c93894efc252db501e876c:.github/workflows/"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-dd5554f81e6308feec056ff967047c88ebc50cc9311de3f329054c8a9411c0c1",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 6,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-d0662dddff9fd90a685e2ec3d26e65f06ae3074a58d99e87b146da8f5af940f2",
            "posted_at": "2026-10-19T21:45:59.234209Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
              "posted_at": "2026-10-19T21:47:03.668443Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:dd5554f81e6308feec056ff967047c88ebc50cc9311de3f329054c8a9411c0c1",
          "payload_digest": "sha256:82a3c1eb5d456a3b5fc9351ce31b4531d8cc7b2e456d07c397c91cd0a4c1d054",
          "payload_bytes": 2342,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"jobs\":[{\"credentials\":[\"token:repository-default\"],\"job\":\".github/workflows/ci.yml#docker-image-test\",\"mutable\":[\"pkg:githubactions/actions/checkout@v4\",\"pkg:githubactions/astral-sh/setup-uv@v4\"]},{\"credentials\":[\"token:repository-default\"],\"job\":\".github/workflows/ci.yml#kit-lockfiles\",\"mutable\":[\"pkg:githubactions/actions/checkout@v4\",\"pkg:githubactions/astral-sh/setup-uv@v4\"]},{\"credentials\":[\"token:repository-default\"],\"job\":\".github/workflows/ci.yml#test\",\"mutable\":[\"pkg:githubactions/act",
          "length": 2342
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-c50e0512b460da7952644b068146063fb990b6e815e296b7f59d875c58c9e36d",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 6,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-d0662dddff9fd90a685e2ec3d26e65f06ae3074a58d99e87b146da8f5af940f2",
            "posted_at": "2026-10-19T21:45:59.234209Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
              "posted_at": "2026-10-19T21:47:03.668443Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:c50e0512b460da7952644b068146063fb990b6e815e296b7f59d875c58c9e36d",
          "payload_digest": "sha256:af4b10b8260fa32c8a4a18f17695eb0940527d9a465336cc90c5b1e8b13dca3d",
          "payload_bytes": 427,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "kind": "finding",
            "paths": 2,
            "question": "HQ4",
            "revision": "4e9b5db950bc66145fc72252be82b40a7826077c",
            "shared": [
              "pkg:githubactions/actions/checkout@v4",
              "pkg:githubactions/astral-sh/setup-uv@v4",
              "pkg:githubactions/pypa/gh-action-pypi-publish@release/v1"
            ],
            "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "subject": "pypi/cruxible @ github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "target": "pypi/cruxible"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-a900ac2b6e6ab9c78749aaf9143fa680b8c34710b89bdfc8cd4062f51fdf71f9",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 4,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
            "posted_at": "2026-10-19T21:47:13.595706Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:a900ac2b6e6ab9c78749aaf9143fa680b8c34710b89bdfc8cd4062f51fdf71f9",
          "payload_digest": "sha256:ac0c38d587852711d05da9fe5f1c8975bee62214f62d33a58662fa2fa8fec4d6",
          "payload_bytes": 2414,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"jobs\":[{\"credentials\":[\"token:repository-default\"],\"job\":\".github/workflows/ci.yml#docker-image-test\",\"mutable\":[\"pkg:githubactions/actions/checkout@v4\",\"pkg:githubactions/astral-sh/setup-uv@v4\"]},{\"credentials\":[\"token:repository-default\"],\"job\":\".github/workflows/ci.yml#kit-lockfiles\",\"mutable\":[\"pkg:githubactions/actions/checkout@v4\",\"pkg:githubactions/astral-sh/setup-uv@v4\"]},{\"credentials\":[\"token:repository-default\"],\"job\":\".github/workflows/ci.yml#test\",\"mutable\":[\"pkg:githubactions/act",
          "length": 2414
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-a517c7520f3c4145f996af385e30d212fc0f87291d0c2e9dd132f1b8fa980d67",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 6,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-d0662dddff9fd90a685e2ec3d26e65f06ae3074a58d99e87b146da8f5af940f2",
            "posted_at": "2026-10-19T21:45:59.234209Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
              "posted_at": "2026-10-19T21:47:03.668443Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:a517c7520f3c4145f996af385e30d212fc0f87291d0c2e9dd132f1b8fa980d67",
          "payload_digest": "sha256:da5b8fa305b656628643fbff39647fe25d3e6a44361dc8b61e4786ac178f05aa",
          "payload_bytes": 700,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"jobs\":[{\"credentials\":[\"id-token:write\",\"pages:write\"],\"environment\":\"none\",\"job\":\".github/workflows/docs.yml#build\",\"triggers\":[\"workflow_dispatch\"]},{\"credentials\":[\"packages:write\",\"secret:NVD_API_KEY\"],\"environment\":\"none\",\"job\":\".github/workflows/publish-kev-reference-world.yml#publish\",\"triggers\":[\"workflow_dispatch\"]},{\"credentials\":[\"packages:write\"],\"environment\":\"none\",\"job\":\".github/workflows/publish-runtime-image.yml#build\",\"triggers\":[\"workflow_dispatch\"]}],\"kind\":\"finding\",\"quest",
          "length": 700
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-972150c1bfffa61a5854ac91c86d4d270e24c6ea2fb50c7d77aa9e18c7d5a30d",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 6,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-d0662dddff9fd90a685e2ec3d26e65f06ae3074a58d99e87b146da8f5af940f2",
            "posted_at": "2026-10-19T21:45:59.234209Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
              "posted_at": "2026-10-19T21:47:03.668443Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:972150c1bfffa61a5854ac91c86d4d270e24c6ea2fb50c7d77aa9e18c7d5a30d",
          "payload_digest": "sha256:5809c2a50d8d7ca4bde63cd8438b0a8995c43c67f99d5ef2cb54ee64d62bca01",
          "payload_bytes": 412,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "kind": "finding",
            "paths": 1,
            "question": "HQ4",
            "revision": "4e9b5db950bc66145fc72252be82b40a7826077c",
            "shared": [
              "pkg:githubactions/actions/checkout@v4",
              "pkg:githubactions/astral-sh/setup-uv@v4"
            ],
            "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "subject": "github_release/cruxible-ai/cruxible @ github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "target": "github_release/cruxible-ai/cruxible"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-732ce428136aa24e8d72aae33ce5461e0688fa74ef8e3c0589e0f9578572b24d",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 11,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-23415526699a61464e726c8f965af0831948b63d68c3487ad3140ff84b3cf897",
            "posted_at": "2026-10-19T21:44:13.315980Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
              "posted_at": "2026-10-19T21:47:03.668443Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:732ce428136aa24e8d72aae33ce5461e0688fa74ef8e3c0589e0f9578572b24d",
          "payload_digest": "sha256:ca812731d1b0d16968705b3a8dd1783c230d27910d9ff5ae98eb94d32fcdfc17",
          "payload_bytes": 319,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "input": {
              "forge_host": "github.com",
              "full_name": "cruxible-ai/cruxible",
              "path": ".github/workflows/",
              "ref": "ea6582844b23b81fe0bdeed9303fa975b4faff8c",
              "scope": "ci.workflows"
            },
            "kind": "gap",
            "pull": "security.repo-acquire",
            "source": "github.com/cruxible-ai/cruxible@ea6582844b23b81fe0bdeed9303fa975b4faff8c:.github/workflows/"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-652ca552797936fe94be2a8ff38abe8ce22c0eac61fdb59082ef7182a2cf1e71",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 4,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
            "posted_at": "2026-10-19T21:47:13.595706Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:652ca552797936fe94be2a8ff38abe8ce22c0eac61fdb59082ef7182a2cf1e71",
          "payload_digest": "sha256:bf34aacf946503bec7436d6e360cde19f86f040eb03dbb62fbc3e079c880de2b",
          "payload_bytes": 484,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "kind": "finding",
            "paths": 1,
            "question": "HQ4",
            "revision": "4e9b5db950bc66145fc72252be82b40a7826077c",
            "shared": [
              "pkg:githubactions/actions/checkout@v4",
              "pkg:githubactions/astral-sh/setup-uv@v4"
            ],
            "source": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/",
            "subject": "github_release/cruxible-ai/cruxible @ github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/",
            "target": "github_release/cruxible-ai/cruxible"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-5575d47edee9e2c41b950af4a4cbf8d916e94d1f86f4b31aa509cdaa48ff4314",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 6,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-d0662dddff9fd90a685e2ec3d26e65f06ae3074a58d99e87b146da8f5af940f2",
            "posted_at": "2026-10-19T21:45:59.234209Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
              "posted_at": "2026-10-19T21:47:03.668443Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:5575d47edee9e2c41b950af4a4cbf8d916e94d1f86f4b31aa509cdaa48ff4314",
          "payload_digest": "sha256:3588c4189027b4e699bab97f191c0545dc84ad95ad50535cb41fb539f4025001",
          "payload_bytes": 441,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "kind": "finding",
            "paths": 2,
            "question": "HQ4",
            "revision": "4e9b5db950bc66145fc72252be82b40a7826077c",
            "shared": [
              "pkg:githubactions/actions/checkout@v4",
              "pkg:githubactions/astral-sh/setup-uv@v4",
              "pkg:githubactions/pypa/gh-action-pypi-publish@release/v1"
            ],
            "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "subject": "pypi/cruxible-client @ github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "target": "pypi/cruxible-client"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-48b8c32b108ee2f9507a0b7d4aa9b2f5f9485f7bf684b74aa0d20ee771ee8b9d",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 4,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
            "posted_at": "2026-10-19T21:47:13.595706Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:48b8c32b108ee2f9507a0b7d4aa9b2f5f9485f7bf684b74aa0d20ee771ee8b9d",
          "payload_digest": "sha256:2f823ecb5dab9bd7d215c1cd84acc975578239d915f82b1b31123aa7db68cb77",
          "payload_bytes": 772,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"jobs\":[{\"credentials\":[\"id-token:write\",\"pages:write\"],\"environment\":\"none\",\"job\":\".github/workflows/docs.yml#build\",\"triggers\":[\"workflow_dispatch\"]},{\"credentials\":[\"packages:write\",\"secret:NVD_API_KEY\"],\"environment\":\"none\",\"job\":\".github/workflows/publish-kev-reference-world.yml#publish\",\"triggers\":[\"workflow_dispatch\"]},{\"credentials\":[\"packages:write\"],\"environment\":\"none\",\"job\":\".github/workflows/publish-runtime-image.yml#build\",\"triggers\":[\"workflow_dispatch\"]}],\"kind\":\"finding\",\"quest",
          "length": 772
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-409d0047d5ff268f7dc8252f376bd70ffaa16bcc50b8fd40fb855ba34c6e9e22",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 4,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
            "posted_at": "2026-10-19T21:47:13.595706Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:409d0047d5ff268f7dc8252f376bd70ffaa16bcc50b8fd40fb855ba34c6e9e22",
          "payload_digest": "sha256:74385ec82c15ead002d5a882fb3b01474f64ea04be4447d1778232146628cd45",
          "payload_bytes": 642,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"bypass\":[{\"job\":\".github/workflows/publish-kev-reference-world.yml#publish\",\"triggers\":[\"schedule:cron:0 6 * * *\",\"workflow_dispatch\"]},{\"job\":\".github/workflows/publish-runtime-image.yml#build\",\"triggers\":[\"workflow_dispatch\"]}],\"gate\":[\"push:tags:v*\"],\"kind\":\"finding\",\"paths\":2,\"question\":\"HQ1\",\"revision\":\"4e9b5db950bc66145fc72252be82b40a7826077c\",\"source\":\"github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/\",\"subject\":\"ghcr/cruxible-ai/cruxible-runtim",
          "length": 642
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-3bf1b800bef71ce59c53e5ce2d0f0ec270e524d471a0f0e4989e4074082f9e94",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 6,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-d0662dddff9fd90a685e2ec3d26e65f06ae3074a58d99e87b146da8f5af940f2",
            "posted_at": "2026-10-19T21:45:59.234209Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
              "posted_at": "2026-10-19T21:47:03.668443Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:3bf1b800bef71ce59c53e5ce2d0f0ec270e524d471a0f0e4989e4074082f9e94",
          "payload_digest": "sha256:3a71491f71de91d9857300e8170957ff26947bb363198a24c7c32bd44f1e903b",
          "payload_bytes": 570,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"bypass\":[{\"job\":\".github/workflows/publish-kev-reference-world.yml#publish\",\"triggers\":[\"schedule:cron:0 6 * * *\",\"workflow_dispatch\"]},{\"job\":\".github/workflows/publish-runtime-image.yml#build\",\"triggers\":[\"workflow_dispatch\"]}],\"gate\":[\"push:tags:v*\"],\"kind\":\"finding\",\"paths\":2,\"question\":\"HQ1\",\"revision\":\"4e9b5db950bc66145fc72252be82b40a7826077c\",\"source\":\"github.com/cruxible-ai/cruxible@main:.github/workflows/\",\"subject\":\"ghcr/cruxible-ai/cruxible-runtime @ github.com/cruxible-ai/cruxible@",
          "length": 570
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-1a13946c18ee48788a4dedbc6faffa6e311b047aaf9f645a115d894491a6c337",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 4,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
            "posted_at": "2026-10-19T21:47:13.595706Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:1a13946c18ee48788a4dedbc6faffa6e311b047aaf9f645a115d894491a6c337",
          "payload_digest": "sha256:c5dfabec554dbc991acf12ea562eeaa18f240e4453148654de41ec1b4b559142",
          "payload_bytes": 513,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"kind\":\"finding\",\"paths\":2,\"question\":\"HQ4\",\"revision\":\"4e9b5db950bc66145fc72252be82b40a7826077c\",\"shared\":[\"pkg:githubactions/actions/checkout@v4\",\"pkg:githubactions/astral-sh/setup-uv@v4\",\"pkg:githubactions/pypa/gh-action-pypi-publish@release/v1\"],\"source\":\"github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/\",\"subject\":\"pypi/cruxible-client @ github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/\",\"target\":\"pypi/crux",
          "length": 513
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-182ad6d7cf1f09f1a9336b0180f4dc7a92a47785195e60fcaf8a05c76670b2fe",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 1,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
            "posted_at": "2026-10-19T21:48:00.649051Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:182ad6d7cf1f09f1a9336b0180f4dc7a92a47785195e60fcaf8a05c76670b2fe",
          "payload_digest": "sha256:d42498f83235fab12589b25bd119739113e76e697c56d8a9bf1e9431e62bafa5",
          "payload_bytes": 191,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "input": {
              "url": "https://api.github.com/repos/cruxible-ai/cruxible/releases/tags/v0.3.2"
            },
            "kind": "gap",
            "pull": "security.release-acquire",
            "source": "github_release/cruxible-ai/cruxible@v0.3.2"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-151c4bd50573cf097b3c2f400fb32a9ae6759c1024fa20d40797b48aa8d13bc1",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 4,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
            "posted_at": "2026-10-19T21:47:13.595706Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "posted_at": "2026-10-19T21:48:00.649051Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "posted_at": "2026-10-19T21:47:42.132628Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "posted_at": "2026-10-19T21:47:28.514152Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "posted_at": "2026-10-19T21:47:13.595706Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:151c4bd50573cf097b3c2f400fb32a9ae6759c1024fa20d40797b48aa8d13bc1",
          "payload_digest": "sha256:0dca805fce2f7b4c01ce3dffe169d07bdbcae86d49074a1ecd4402b2edbe8b01",
          "payload_bytes": 499,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "kind": "finding",
            "paths": 2,
            "question": "HQ4",
            "revision": "4e9b5db950bc66145fc72252be82b40a7826077c",
            "shared": [
              "pkg:githubactions/actions/checkout@v4",
              "pkg:githubactions/astral-sh/setup-uv@v4",
              "pkg:githubactions/pypa/gh-action-pypi-publish@release/v1"
            ],
            "source": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/",
            "subject": "pypi/cruxible @ github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/",
            "target": "pypi/cruxible"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-1d55a6e52af11f82c22380c4f17c540dac1c3e44e190dbfdfaf3e2854969569b",
          "status": "acknowledged",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 7,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-23415526699a61464e726c8f965af0831948b63d68c3487ad3140ff84b3cf897",
            "posted_at": "2026-10-19T21:44:13.315980Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
              "posted_at": "2026-10-19T21:47:03.668443Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-d0662dddff9fd90a685e2ec3d26e65f06ae3074a58d99e87b146da8f5af940f2",
              "posted_at": "2026-10-19T21:45:59.234209Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a7f1f0aa97db8550e6c8d154d8ec04dfc36ea7129986ff315db8e5b6cf4aa0d0",
              "posted_at": "2026-10-19T21:45:42.923269Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-d7edd0a9e9ab25476a68f6850270cd5319f4a2f39aba7fad558131ce040c3489",
              "posted_at": "2026-10-19T21:45:24.569982Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
              "posted_at": "2026-10-19T21:44:40.568083Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:1d55a6e52af11f82c22380c4f17c540dac1c3e44e190dbfdfaf3e2854969569b",
          "payload_digest": "sha256:f59eef2957f4f6b7aeeb8a281437b8e20161f3d17f3cc0582c270973f1515440",
          "payload_bytes": 319,
          "disposition": {
            "tag": "cruxible-inbox-acknowledged-v1",
            "disposition": "acknowledged",
            "actor_id": "gate-owner",
            "decided_at": "2026-10-19T21:47:12.045757Z"
          },
          "disposition_count": 1,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "input": {
              "forge_host": "github.com",
              "full_name": "cruxible-ai/cruxible",
              "path": ".github/workflows/",
              "ref": "e848cbb6787262db349912c48d9c008d8068ede8",
              "scope": "ci.workflows"
            },
            "kind": "gap",
            "pull": "security.repo-acquire",
            "source": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-f9579b9ea5b58ffbf53f64731862daf0089707ae1216c28f34d534769d4e7fce",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 3,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
            "posted_at": "2026-10-19T21:44:40.568083Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a7f1f0aa97db8550e6c8d154d8ec04dfc36ea7129986ff315db8e5b6cf4aa0d0",
              "posted_at": "2026-10-19T21:45:42.923269Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-d7edd0a9e9ab25476a68f6850270cd5319f4a2f39aba7fad558131ce040c3489",
              "posted_at": "2026-10-19T21:45:24.569982Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
              "posted_at": "2026-10-19T21:44:40.568083Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:f9579b9ea5b58ffbf53f64731862daf0089707ae1216c28f34d534769d4e7fce",
          "payload_digest": "sha256:6538f6438fb1e173d039cb5f2f896836ab2849b904aeff193e16c443269b8682",
          "payload_bytes": 441,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "kind": "finding",
            "paths": 2,
            "question": "HQ4",
            "revision": "52509a27514eb9b081ede8a91fbd7539026bb322",
            "shared": [
              "pkg:githubactions/actions/checkout@v4",
              "pkg:githubactions/astral-sh/setup-uv@v4",
              "pkg:githubactions/pypa/gh-action-pypi-publish@release/v1"
            ],
            "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "subject": "pypi/cruxible-client @ github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "target": "pypi/cruxible-client"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-d85a93475fedfd2f05d57fbc494b91dce59db8e1531f739c8c0e22402e9f4e29",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 3,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
            "posted_at": "2026-10-19T21:44:40.568083Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a7f1f0aa97db8550e6c8d154d8ec04dfc36ea7129986ff315db8e5b6cf4aa0d0",
              "posted_at": "2026-10-19T21:45:42.923269Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-d7edd0a9e9ab25476a68f6850270cd5319f4a2f39aba7fad558131ce040c3489",
              "posted_at": "2026-10-19T21:45:24.569982Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
              "posted_at": "2026-10-19T21:44:40.568083Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:d85a93475fedfd2f05d57fbc494b91dce59db8e1531f739c8c0e22402e9f4e29",
          "payload_digest": "sha256:b748503722a476fb612b8e6b9d166dfefbe518b9b400d6b662ff05ec8ba4d5ca",
          "payload_bytes": 553,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"jobs\":[{\"credentials\":[\"id-token:write\",\"pages:write\"],\"environment\":\"none\",\"job\":\".github/workflows/docs.yml#build\",\"triggers\":[\"workflow_dispatch\"]},{\"credentials\":[\"packages:write\",\"secret:NVD_API_KEY\"],\"environment\":\"none\",\"job\":\".github/workflows/publish-kev-reference-world.yml#publish\",\"triggers\":[\"workflow_dispatch\"]}],\"kind\":\"finding\",\"question\":\"HQ2\",\"revision\":\"52509a27514eb9b081ede8a91fbd7539026bb322\",\"source\":\"github.com/cruxible-ai/cruxible@main:.github/workflows/\",\"subject\":\"gith",
          "length": 553
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-ccad1ca1dfb53d89df2c8cd6d399838922d367a3c71f011c84a39354c583da6a",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 3,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
            "posted_at": "2026-10-19T21:44:40.568083Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a7f1f0aa97db8550e6c8d154d8ec04dfc36ea7129986ff315db8e5b6cf4aa0d0",
              "posted_at": "2026-10-19T21:45:42.923269Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-d7edd0a9e9ab25476a68f6850270cd5319f4a2f39aba7fad558131ce040c3489",
              "posted_at": "2026-10-19T21:45:24.569982Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
              "posted_at": "2026-10-19T21:44:40.568083Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:ccad1ca1dfb53d89df2c8cd6d399838922d367a3c71f011c84a39354c583da6a",
          "payload_digest": "sha256:9efb96f1b6c0a761b0b084bd6947d62512501bc74516fab089a8a3f21cccabdf",
          "payload_bytes": 2342,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"jobs\":[{\"credentials\":[\"token:repository-default\"],\"job\":\".github/workflows/ci.yml#docker-image-test\",\"mutable\":[\"pkg:githubactions/actions/checkout@v4\",\"pkg:githubactions/astral-sh/setup-uv@v4\"]},{\"credentials\":[\"token:repository-default\"],\"job\":\".github/workflows/ci.yml#kit-lockfiles\",\"mutable\":[\"pkg:githubactions/actions/checkout@v4\",\"pkg:githubactions/astral-sh/setup-uv@v4\"]},{\"credentials\":[\"token:repository-default\"],\"job\":\".github/workflows/ci.yml#test\",\"mutable\":[\"pkg:githubactions/act",
          "length": 2342
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-c60d29391a1f76c585cd32ff602029f40a079c13df9a6200d9de3f2270250e1b",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 3,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
            "posted_at": "2026-10-19T21:44:40.568083Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a7f1f0aa97db8550e6c8d154d8ec04dfc36ea7129986ff315db8e5b6cf4aa0d0",
              "posted_at": "2026-10-19T21:45:42.923269Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-d7edd0a9e9ab25476a68f6850270cd5319f4a2f39aba7fad558131ce040c3489",
              "posted_at": "2026-10-19T21:45:24.569982Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
              "posted_at": "2026-10-19T21:44:40.568083Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:c60d29391a1f76c585cd32ff602029f40a079c13df9a6200d9de3f2270250e1b",
          "payload_digest": "sha256:44fe1a5a70e5075845680297d922c1f94320643b0d52529a24f0895ab3c20d35",
          "payload_bytes": 476,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "kind": "finding",
            "paths": 1,
            "question": "HQ4",
            "revision": "52509a27514eb9b081ede8a91fbd7539026bb322",
            "shared": [
              "pkg:githubactions/actions/checkout@v4",
              "pkg:githubactions/astral-sh/setup-uv@v4",
              "pkg:githubactions/oras-project/setup-oras@v1",
              "secret:NVD_API_KEY"
            ],
            "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "subject": "ghcr/cruxible-ai/cruxible-runtime @ github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "target": "ghcr/cruxible-ai/cruxible-runtime"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-a45067f6da4037869b620e9b1edb111ddf32a2a4bab88cab3d0c0f0fd22e249f",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 3,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
            "posted_at": "2026-10-19T21:44:40.568083Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a7f1f0aa97db8550e6c8d154d8ec04dfc36ea7129986ff315db8e5b6cf4aa0d0",
              "posted_at": "2026-10-19T21:45:42.923269Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-d7edd0a9e9ab25476a68f6850270cd5319f4a2f39aba7fad558131ce040c3489",
              "posted_at": "2026-10-19T21:45:24.569982Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
              "posted_at": "2026-10-19T21:44:40.568083Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:a45067f6da4037869b620e9b1edb111ddf32a2a4bab88cab3d0c0f0fd22e249f",
          "payload_digest": "sha256:4e671cecb193280b3f82a623a922dbdac554efb63b9f51f82e680ed46920e88a",
          "payload_bytes": 427,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "kind": "finding",
            "paths": 2,
            "question": "HQ4",
            "revision": "52509a27514eb9b081ede8a91fbd7539026bb322",
            "shared": [
              "pkg:githubactions/actions/checkout@v4",
              "pkg:githubactions/astral-sh/setup-uv@v4",
              "pkg:githubactions/pypa/gh-action-pypi-publish@release/v1"
            ],
            "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "subject": "pypi/cruxible @ github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "target": "pypi/cruxible"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-3a6882442543ac57af6372ddaefbaeafee6956a7ec9b2e020cf0f95e0789b672",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 3,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
            "posted_at": "2026-10-19T21:44:40.568083Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a7f1f0aa97db8550e6c8d154d8ec04dfc36ea7129986ff315db8e5b6cf4aa0d0",
              "posted_at": "2026-10-19T21:45:42.923269Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-d7edd0a9e9ab25476a68f6850270cd5319f4a2f39aba7fad558131ce040c3489",
              "posted_at": "2026-10-19T21:45:24.569982Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
              "posted_at": "2026-10-19T21:44:40.568083Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:3a6882442543ac57af6372ddaefbaeafee6956a7ec9b2e020cf0f95e0789b672",
          "payload_digest": "sha256:0f0bf7bdc145fd8b028eb6e2a4bf0f7f982698ce01678d573c65fa3298c140ca",
          "payload_bytes": 477,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "bypass": [
              {
                "job": ".github/workflows/publish-kev-reference-world.yml#publish",
                "triggers": [
                  "schedule:cron:0 6 * * *",
                  "workflow_dispatch"
                ]
              }
            ],
            "gate": [
              "push:tags:v*"
            ],
            "kind": "finding",
            "paths": 1,
            "question": "HQ1",
            "revision": "52509a27514eb9b081ede8a91fbd7539026bb322",
            "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "subject": "ghcr/cruxible-ai/cruxible-runtime @ github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "target": "ghcr/cruxible-ai/cruxible-runtime"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-05f67f9a02c186f1dd82135451077e5bbcb91d413ad419b73960ff17768a1dd9",
          "status": "unread",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 3,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
            "posted_at": "2026-10-19T21:44:40.568083Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-a7f1f0aa97db8550e6c8d154d8ec04dfc36ea7129986ff315db8e5b6cf4aa0d0",
              "posted_at": "2026-10-19T21:45:42.923269Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-d7edd0a9e9ab25476a68f6850270cd5319f4a2f39aba7fad558131ce040c3489",
              "posted_at": "2026-10-19T21:45:24.569982Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-2024b7d3a421a2c783cbc17c769f061a58ec5927c1606c816e6d4d7ee996a903",
              "posted_at": "2026-10-19T21:44:40.568083Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:05f67f9a02c186f1dd82135451077e5bbcb91d413ad419b73960ff17768a1dd9",
          "payload_digest": "sha256:7a38f820d8a00254bcb5e7b1531afe25598bbc3305e4042658afed0b03c9ed38",
          "payload_bytes": 412,
          "disposition": null,
          "disposition_count": 0,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "kind": "finding",
            "paths": 1,
            "question": "HQ4",
            "revision": "52509a27514eb9b081ede8a91fbd7539026bb322",
            "shared": [
              "pkg:githubactions/actions/checkout@v4",
              "pkg:githubactions/astral-sh/setup-uv@v4"
            ],
            "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "subject": "github_release/cruxible-ai/cruxible @ github.com/cruxible-ai/cruxible@main:.github/workflows/",
            "target": "github_release/cruxible-ai/cruxible"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-75111a8833245656bcb25ee6e2e6aa1c56f864e35939dd9e3dda6d265343ad00",
          "status": "acknowledged",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 4,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-22f36a6dc119f2eede59e6b98ae16b213fbc96caf952ad18ab395dc284d93faf",
            "posted_at": "2026-10-19T21:43:47.013336Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-759c8fc47bf6e6e5526c071493f13d6d610f97b7ba96c3ad979ba62e7d575ec5",
              "posted_at": "2026-10-19T21:44:27.682532Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-23415526699a61464e726c8f965af0831948b63d68c3487ad3140ff84b3cf897",
              "posted_at": "2026-10-19T21:44:13.315980Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-bd24f832d4b0fdf0df3b24727c7a16e3068f7ef474f4d86dbd92478e190b42f4",
              "posted_at": "2026-10-19T21:43:58.363278Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-22f36a6dc119f2eede59e6b98ae16b213fbc96caf952ad18ab395dc284d93faf",
              "posted_at": "2026-10-19T21:43:47.013336Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:75111a8833245656bcb25ee6e2e6aa1c56f864e35939dd9e3dda6d265343ad00",
          "payload_digest": "sha256:2819ee7e05904e3d031e46d8b00242874cf3849b92802bb3e023b5cab9d6bced",
          "payload_bytes": 247,
          "disposition": {
            "tag": "cruxible-inbox-acknowledged-v1",
            "disposition": "acknowledged",
            "actor_id": "gate-owner",
            "decided_at": "2026-10-19T21:44:38.956015Z"
          },
          "disposition_count": 1,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "input": {
              "forge_host": "github.com",
              "full_name": "cruxible-ai/cruxible",
              "path": ".github/workflows/",
              "ref": "main",
              "scope": "ci.workflows"
            },
            "kind": "gap",
            "pull": "security.repo-acquire",
            "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-85c30c5b484766a38c7ddd173070f4d61f842b794dd46a2de01011511bac5ff7",
          "status": "acknowledged",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 3,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-22f36a6dc119f2eede59e6b98ae16b213fbc96caf952ad18ab395dc284d93faf",
            "posted_at": "2026-10-19T21:43:47.013336Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-23415526699a61464e726c8f965af0831948b63d68c3487ad3140ff84b3cf897",
              "posted_at": "2026-10-19T21:44:13.315980Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-bd24f832d4b0fdf0df3b24727c7a16e3068f7ef474f4d86dbd92478e190b42f4",
              "posted_at": "2026-10-19T21:43:58.363278Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-22f36a6dc119f2eede59e6b98ae16b213fbc96caf952ad18ab395dc284d93faf",
              "posted_at": "2026-10-19T21:43:47.013336Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:85c30c5b484766a38c7ddd173070f4d61f842b794dd46a2de01011511bac5ff7",
          "payload_digest": "sha256:17668f0883a3b3aba2f0521e58c2a4d495d016654183867367afe3a1bef36612",
          "payload_bytes": 132,
          "disposition": {
            "tag": "cruxible-inbox-acknowledged-v1",
            "disposition": "acknowledged",
            "actor_id": "gate-owner",
            "decided_at": "2026-10-19T21:44:23.409887Z"
          },
          "disposition_count": 1,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "input": {
              "project": "cruxible-client",
              "versions": 3
            },
            "kind": "gap",
            "pull": "security.registry-acquire",
            "source": "pypi/cruxible-client"
          }
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-80e9b5d68a5e4d5d133b1358b102375fa8e73d8f1e29073b0d361129d43a6bde",
          "status": "acknowledged",
          "line": "Line:security.harden",
          "procedure": "Procedure:security.harden",
          "procedure_artifact_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
          "node_id": "post",
          "occurrences": 2,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-22f36a6dc119f2eede59e6b98ae16b213fbc96caf952ad18ab395dc284d93faf",
            "posted_at": "2026-10-19T21:43:47.013336Z",
            "source_capture_digests": []
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-bd24f832d4b0fdf0df3b24727c7a16e3068f7ef474f4d86dbd92478e190b42f4",
              "posted_at": "2026-10-19T21:43:58.363278Z",
              "source_capture_digests": []
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-22f36a6dc119f2eede59e6b98ae16b213fbc96caf952ad18ab395dc284d93faf",
              "posted_at": "2026-10-19T21:43:47.013336Z",
              "source_capture_digests": []
            }
          ],
          "dedupe_key": "sha256:80e9b5d68a5e4d5d133b1358b102375fa8e73d8f1e29073b0d361129d43a6bde",
          "payload_digest": "sha256:84f6004e15e4299ea4528d4ef4bbfd169e652ab6e0805741e6a2e001e5d91c04",
          "payload_bytes": 118,
          "disposition": {
            "tag": "cruxible-inbox-acknowledged-v1",
            "disposition": "acknowledged",
            "actor_id": "gate-owner",
            "decided_at": "2026-10-19T21:44:08.820205Z"
          },
          "disposition_count": 1,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "object": {
            "input": {
              "project": "cruxible",
              "versions": 3
            },
            "kind": "gap",
            "pull": "security.registry-acquire",
            "source": "pypi/cruxible"
          }
        }
      }
    ],
    "truncated": false,
    "next_cursor": null
  }
});

// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/inbox/INB-ea5dd9d4958f1c57cefcdb9978559ef84910f3787e89274ef5ef707ea088ad36 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/inbox/{item_id}",
  "pathParams": {
    "item_id": "INB-ea5dd9d4958f1c57cefcdb9978559ef84910f3787e89274ef5ef707ea088ad36"
  },
  "response": {
    "tag": "cruxible-inbox-item-v1",
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
    "payload": {
      "artifact": "v0.3.2/agent-release-0.3.2.tar.gz",
      "declared": {
        "claim": "CLM-b2a7493c624d41b477116c2ba565a97f",
        "value": "sha256:b24a13d92dd698c0a3f605b2b88d5cedc249d4af48a13a01a0751c309c0acf3a"
      },
      "disagreement": "digest",
      "kind": "finding",
      "question": "HQ5",
      "served": {
        "claim": "CLM-d5158ff13dcd4b5ce6d4ed368119cea0",
        "value": "sha256:6f11bc5da817108f7fd4009c25f713ea5d0f0b4696b2b29b677e5b7928a9f627"
      },
      "subject": "github_release/cruxible-ai/cruxible:v0.3.2/agent-release-0.3.2.tar.gz",
      "target": "github_release/cruxible-ai/cruxible"
    },
    "recent_dispositions": []
  }
});

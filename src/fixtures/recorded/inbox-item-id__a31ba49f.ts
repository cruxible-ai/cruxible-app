// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/inbox/INB-4555ab7d185e0617c055ac7027a5e2f49c4f313e10c11b610bce26a740c6eec2 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/inbox/{item_id}",
  "pathParams": {
    "item_id": "INB-4555ab7d185e0617c055ac7027a5e2f49c4f313e10c11b610bce26a740c6eec2"
  },
  "response": {
    "tag": "cruxible-inbox-item-v1",
    "item": {
      "tag": "cruxible-inbox-item-envelope-v1",
      "item_id": "INB-4555ab7d185e0617c055ac7027a5e2f49c4f313e10c11b610bce26a740c6eec2",
      "status": "acknowledged",
      "line": "Line:security.kev-attention",
      "procedure": "Procedure:security.kev-attention",
      "procedure_artifact_digest": "sha256:af001ecbd0140acd8c54f760568c9c398a274fcb886da6963ca23abd742b96b1",
      "node_id": "post",
      "occurrences": 3,
      "first_sighting": {
        "tag": "cruxible-inbox-sighting-v1",
        "run_id": "RUN-3ef16fb914d4d6b4717069e93da171862463ff2aa86cd7bdaa36d8911ed2aaf7",
        "posted_at": "2026-10-19T21:36:18.947005Z",
        "source_capture_digests": [
          "sha256:a46d834dd6208f21d276abc4dc63e75f06bb909efc4f9e9e0496bf6d28f9d867"
        ]
      },
      "recent_sightings": [
        {
          "tag": "cruxible-inbox-sighting-v1",
          "run_id": "RUN-b877060acac171eb745a75fbd02deb58c858083b00f802df3b28c7a964cbb192",
          "posted_at": "2026-10-19T21:40:15.617899Z",
          "source_capture_digests": [
            "sha256:3de025ce82b132117b55f8720ecde6da46daad8775ae73aa3838b6c7881ad379"
          ]
        },
        {
          "tag": "cruxible-inbox-sighting-v1",
          "run_id": "RUN-2838d0925f769bcd3052f4dff6fe08e9faf99edfd5bdf5598072f2d0049884c7",
          "posted_at": "2026-10-19T21:39:55.631284Z",
          "source_capture_digests": [
            "sha256:f3acaf6a294e32c488699c55254ed4b117af06a8a0206c92c274ccd38b29651c"
          ]
        },
        {
          "tag": "cruxible-inbox-sighting-v1",
          "run_id": "RUN-3ef16fb914d4d6b4717069e93da171862463ff2aa86cd7bdaa36d8911ed2aaf7",
          "posted_at": "2026-10-19T21:36:18.947005Z",
          "source_capture_digests": [
            "sha256:a46d834dd6208f21d276abc4dc63e75f06bb909efc4f9e9e0496bf6d28f9d867"
          ]
        }
      ],
      "dedupe_key": "sha256:4555ab7d185e0617c055ac7027a5e2f49c4f313e10c11b610bce26a740c6eec2",
      "payload_digest": "sha256:1a238d46526e1e3ac217aef476b747fc2d51d2e9915b466bbbbf8b756bb9b2d2",
      "payload_bytes": 540,
      "disposition": {
        "tag": "cruxible-inbox-acknowledged-v1",
        "disposition": "acknowledged",
        "actor_id": "gate-owner",
        "decided_at": "2026-10-19T21:41:26.498418Z"
      },
      "disposition_count": 1,
      "recurred_since_disposition": 0
    },
    "payload": {
      "attention": "possibly_exposed",
      "cve_id": "CVE-2026-102490",
      "gap": "no_assessment",
      "kev": {
        "date_added": "2026-10-02",
        "due_date": "2026-10-05",
        "product": "Zammad",
        "vendor_project": "Zammad GmbH",
        "vulnerability_name": "Zammad GmbH Zammad Improper Privilege Management Vulnerability"
      },
      "matched_by": "product name",
      "product_name": "zammad",
      "release": "subjects/security.release/zammad--6.0.0.json",
      "summary": "KEV newly lists CVE-2026-102490 (Zammad GmbH Zammad); inventory has zammad 6.0.0 and nobody has assessed this release for it.",
      "version": "6.0.0"
    },
    "recent_dispositions": [
      {
        "tag": "cruxible-inbox-acknowledged-v1",
        "disposition": "acknowledged",
        "actor_id": "gate-owner",
        "decided_at": "2026-10-19T21:41:26.498418Z"
      }
    ]
  }
});

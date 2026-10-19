// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/inbox e77a4f3d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/inbox",
  "query": {
    "limit": 50,
    "line": "security.kev-attention"
  },
  "response": {
    "tag": "cruxible-inbox-list-v1",
    "line_filter": "Line:security.kev-attention",
    "status_filter": null,
    "entries": [
      {
        "tag": "cruxible-inbox-list-entry-v1",
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
        "payload_preview": {
          "truncated": true,
          "preview": "{\"attention\":\"possibly_exposed\",\"cve_id\":\"CVE-2026-102490\",\"gap\":\"no_assessment\",\"kev\":{\"date_added\":\"2026-10-02\",\"due_date\":\"2026-10-05\",\"product\":\"Zammad\",\"vendor_project\":\"Zammad GmbH\",\"vulnerability_name\":\"Zammad GmbH Zammad Improper Privilege Management Vulnerability\"},\"matched_by\":\"product name\",\"product_name\":\"zammad\",\"release\":\"subjects/security.release/zammad--6.0.0.json\",\"summary\":\"KEV newly lists CVE-2026-102490 (Zammad GmbH Zammad); inventory has zammad 6.0.0 and nobody has assessed ",
          "length": 540
        }
      },
      {
        "tag": "cruxible-inbox-list-entry-v1",
        "item": {
          "tag": "cruxible-inbox-item-envelope-v1",
          "item_id": "INB-d10d0f3f26aebf7f9a99b5c6b9db55598ab86a486a6b8a9276aa1d6e625eb5f0",
          "status": "acknowledged",
          "line": "Line:security.kev-attention",
          "procedure": "Procedure:security.kev-attention",
          "procedure_artifact_digest": "sha256:af001ecbd0140acd8c54f760568c9c398a274fcb886da6963ca23abd742b96b1",
          "node_id": "post",
          "occurrences": 6,
          "first_sighting": {
            "tag": "cruxible-inbox-sighting-v1",
            "run_id": "RUN-7a4065e3499de90bd478d94bd4fa2c10dc3c106a76ff4aa6a31a453e5c9e4743",
            "posted_at": "2026-10-19T21:32:33.850015Z",
            "source_capture_digests": [
              "sha256:959fa040fc652837da49b1d3ec7930b981166b66f75ffe7dc8013fbf651e7397"
            ]
          },
          "recent_sightings": [
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-066ba44a43e32f3fd454ff4d4645c181294e6ed80f8206d1fcd7f05b1ab3d54e",
              "posted_at": "2026-10-19T21:35:34.886966Z",
              "source_capture_digests": [
                "sha256:4f487b1db8b1fca760c9e766461f2a5a7650e3056c64ec43fbaaf56b6a77d734"
              ]
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-489b8d4cb1113b30da4af760f893ab64b7afdeb53ee3828588c9f2daba24686e",
              "posted_at": "2026-10-19T21:35:32.256411Z",
              "source_capture_digests": [
                "sha256:722c2f535347fc0eb2bb3a8ee89d406f0fb8a59515e8245ca62db839fed05626"
              ]
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-eb2f2a6561f0c972d20d01f7a5ea4a14e152e6fb9bee2185c8228b685e436abd",
              "posted_at": "2026-10-19T21:35:29.544015Z",
              "source_capture_digests": [
                "sha256:96f17d7e1fa21dacf991411ece7848d4454d165a24a73c82262b8feb2a912fb8"
              ]
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-262bd5a0c4d0c9a30980050a53f5908d5a1f54cf0e9f1eaea8228a22ef06fbf5",
              "posted_at": "2026-10-19T21:35:29.544015Z",
              "source_capture_digests": [
                "sha256:44e233381814f2f270991e1ef9c82f1980afe52eb023e7a7763a5d5591e5dca3"
              ]
            },
            {
              "tag": "cruxible-inbox-sighting-v1",
              "run_id": "RUN-87effbd7528f0465665d426c39185f1f8c4d13c3a52c879208cce8e424fb1786",
              "posted_at": "2026-10-19T21:33:32.961340Z",
              "source_capture_digests": [
                "sha256:e69624d4f800867c4fcb19cf54da48d527f301e9d754b0440821d2d321db6590"
              ]
            }
          ],
          "dedupe_key": "sha256:d10d0f3f26aebf7f9a99b5c6b9db55598ab86a486a6b8a9276aa1d6e625eb5f0",
          "payload_digest": "sha256:4209516b2dfbb4b80738f64673e9682cd9814a8d978da8f7bb39a5090f5444d9",
          "payload_bytes": 521,
          "disposition": {
            "tag": "cruxible-inbox-acknowledged-v1",
            "disposition": "acknowledged",
            "actor_id": "gate-owner",
            "decided_at": "2026-10-19T21:41:28.084680Z"
          },
          "disposition_count": 2,
          "recurred_since_disposition": 0
        },
        "payload_preview": {
          "truncated": true,
          "preview": "{\"attention\":\"possibly_exposed\",\"cve_id\":\"CVE-2026-102490\",\"gap\":\"not_watched\",\"kev\":{\"date_added\":\"2026-10-02\",\"due_date\":\"2026-10-05\",\"product\":\"Zammad\",\"vendor_project\":\"Zammad GmbH\",\"vulnerability_name\":\"Zammad GmbH Zammad Improper Privilege Management Vulnerability\"},\"matched_by\":\"product name\",\"product_name\":\"zammad\",\"release\":\"subjects/security.release/zammad--6.0.0.json\",\"summary\":\"KEV newly lists CVE-2026-102490 (Zammad GmbH Zammad); inventory has zammad 6.0.0 and nobody watches the CVE",
          "length": 521
        }
      }
    ],
    "truncated": false,
    "next_cursor": null
  }
});

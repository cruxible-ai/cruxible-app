// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 341174a6
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.release/gate-app--1.0.0"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.release/gate-app--1.0.0",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.release/gate-app--1.0.0",
          "kind": "security.release",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-3c7114565fccbe38877d8f3857f865e6",
                "CLM-67780731f7941176d4fc282295b10d75",
                "CLM-d24dc11c9022ce848f5f3492d43ce457"
              ],
              "value": [
                "pkg:pypi/jinja2@3.1.3",
                "pkg:pypi/requests@2.32.3",
                "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              ],
              "flags": []
            },
            {
              "predicate": "osv_coverage",
              "claim": "CLM-21f26c2241a321129da9500c1f536891",
              "value": "complete: 3 of 3 components answered; set b0388f454ae8d358",
              "flags": []
            },
            {
              "predicate": "product",
              "claim": "CLM-026f0ff9aa151a74d05a5a21013218b3",
              "value": "security.product/gate-app",
              "flags": []
            },
            {
              "predicate": "product_name",
              "claim": "CLM-af8c77e54da26f349d472526336e70d1",
              "value": "gate-app",
              "flags": []
            },
            {
              "predicate": "version",
              "claim": "CLM-63717d756e5ffebd62beae615b040327",
              "value": "1.0.0",
              "flags": []
            }
          ],
          "incoming_count": 14,
          "next": [
            "cx.get(\"security.release/gate-app--1.0.0\", detail=\"history\")",
            "cx.get(\"security.release/gate-app--1.0.0\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "f3765015f78f",
          "generation": 12
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "evaluation_time": "2026-10-26T19:05:09.551854Z"
      }
    ]
  }
});

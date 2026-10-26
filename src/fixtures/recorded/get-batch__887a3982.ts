// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 91e9a7d4
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-3c7114565fccbe38877d8f3857f865e6",
      "CLM-67780731f7941176d4fc282295b10d75",
      "CLM-d24dc11c9022ce848f5f3492d43ce457",
      "CLM-21f26c2241a321129da9500c1f536891",
      "CLM-026f0ff9aa151a74d05a5a21013218b3",
      "CLM-af8c77e54da26f349d472526336e70d1",
      "CLM-63717d756e5ffebd62beae615b040327"
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
        "ref": "CLM-3c7114565fccbe38877d8f3857f865e6",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-3c7114565fccbe38877d8f3857f865e6",
          "subject": "security.release/gate-app--1.0.0",
          "predicate": "component",
          "predicate_full": "security.release.component",
          "value": "pkg:pypi/jinja2@3.1.3",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:43:01.517331Z",
          "contenders": [
            {
              "claim": "CLM-67780731f7941176d4fc282295b10d75",
              "value": "pkg:pypi/requests@2.32.3",
              "verdict": "supported"
            },
            {
              "claim": "CLM-d24dc11c9022ce848f5f3492d43ce457",
              "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-3c7114565fccbe38877d8f3857f865e6\", detail=\"evidence\")",
            "cx.get(\"security.release/gate-app--1.0.0\")"
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
        "evaluation_time": "2026-10-26T19:05:08.037414Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-67780731f7941176d4fc282295b10d75",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-67780731f7941176d4fc282295b10d75",
          "subject": "security.release/gate-app--1.0.0",
          "predicate": "component",
          "predicate_full": "security.release.component",
          "value": "pkg:pypi/requests@2.32.3",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:43:01.517331Z",
          "contenders": [
            {
              "claim": "CLM-3c7114565fccbe38877d8f3857f865e6",
              "value": "pkg:pypi/jinja2@3.1.3",
              "verdict": "supported"
            },
            {
              "claim": "CLM-d24dc11c9022ce848f5f3492d43ce457",
              "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-67780731f7941176d4fc282295b10d75\", detail=\"evidence\")",
            "cx.get(\"security.release/gate-app--1.0.0\")"
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
        "evaluation_time": "2026-10-26T19:05:08.082977Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-d24dc11c9022ce848f5f3492d43ce457",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-d24dc11c9022ce848f5f3492d43ce457",
          "subject": "security.release/gate-app--1.0.0",
          "predicate": "component",
          "predicate_full": "security.release.component",
          "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:43:01.517331Z",
          "contenders": [
            {
              "claim": "CLM-3c7114565fccbe38877d8f3857f865e6",
              "value": "pkg:pypi/jinja2@3.1.3",
              "verdict": "supported"
            },
            {
              "claim": "CLM-67780731f7941176d4fc282295b10d75",
              "value": "pkg:pypi/requests@2.32.3",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-d24dc11c9022ce848f5f3492d43ce457\", detail=\"evidence\")",
            "cx.get(\"security.release/gate-app--1.0.0\")"
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
        "evaluation_time": "2026-10-26T19:05:08.118573Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-21f26c2241a321129da9500c1f536891",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-21f26c2241a321129da9500c1f536891",
          "subject": "security.release/gate-app--1.0.0",
          "predicate": "osv_coverage",
          "predicate_full": "security.release.osv_coverage",
          "value": "complete: 3 of 3 components answered; set b0388f454ae8d358",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-21f26c2241a321129da9500c1f536891\", detail=\"evidence\")",
            "cx.get(\"security.release/gate-app--1.0.0\")"
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
        "evaluation_time": "2026-10-26T19:05:08.146770Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-026f0ff9aa151a74d05a5a21013218b3",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-026f0ff9aa151a74d05a5a21013218b3",
          "subject": "security.release/gate-app--1.0.0",
          "predicate": "product",
          "predicate_full": "security.release.product",
          "value": "security.product/gate-app",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:43:01.517331Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-026f0ff9aa151a74d05a5a21013218b3\", detail=\"evidence\")",
            "cx.get(\"security.release/gate-app--1.0.0\")"
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
        "evaluation_time": "2026-10-26T19:05:08.179051Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-af8c77e54da26f349d472526336e70d1",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-af8c77e54da26f349d472526336e70d1",
          "subject": "security.release/gate-app--1.0.0",
          "predicate": "product_name",
          "predicate_full": "security.release.product_name",
          "value": "gate-app",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:43:01.517331Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-af8c77e54da26f349d472526336e70d1\", detail=\"evidence\")",
            "cx.get(\"security.release/gate-app--1.0.0\")"
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
        "evaluation_time": "2026-10-26T19:05:08.214811Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-63717d756e5ffebd62beae615b040327",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-63717d756e5ffebd62beae615b040327",
          "subject": "security.release/gate-app--1.0.0",
          "predicate": "version",
          "predicate_full": "security.release.version",
          "value": "1.0.0",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:43:01.517331Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-63717d756e5ffebd62beae615b040327\", detail=\"evidence\")",
            "cx.get(\"security.release/gate-app--1.0.0\")"
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
        "evaluation_time": "2026-10-26T19:05:08.249802Z"
      }
    ]
  }
});

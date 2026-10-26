// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 716af90e
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-4642cf991ae7141668e684f415235edd",
      "CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c",
      "CLM-0ba682d76516d92976ce066cae115b97",
      "CLM-4c740f542205fd08336df797e00b487b",
      "CLM-89f7cfb21f1f04019960beecae869a62",
      "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
      "CLM-4de94887cc52ea1517d2da2cfdaecdba",
      "CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
      "CLM-94f06e40aea84c55bc21c503376650a8",
      "CLM-f9165ed7c97a78e3d7745c550644fb1e"
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
        "ref": "CLM-4642cf991ae7141668e684f415235edd",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-4642cf991ae7141668e684f415235edd",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "cve_id",
          "predicate_full": "security.vulnerability.cve_id",
          "value": "CVE-2021-44228",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-4642cf991ae7141668e684f415235edd\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:04.494141Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "kev_date_added",
          "predicate_full": "security.vulnerability.kev_date_added",
          "value": "2021-12-10",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:45:00.485705Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:04.521089Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-0ba682d76516d92976ce066cae115b97",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-0ba682d76516d92976ce066cae115b97",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "kev_due_date",
          "predicate_full": "security.vulnerability.kev_due_date",
          "value": "2021-12-24",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:45:00.485705Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-0ba682d76516d92976ce066cae115b97\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:04.547890Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-4c740f542205fd08336df797e00b487b",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-4c740f542205fd08336df797e00b487b",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "kev_listed",
          "predicate_full": "security.vulnerability.kev_listed",
          "value": true,
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:45:00.485705Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-4c740f542205fd08336df797e00b487b\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:04.574494Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-89f7cfb21f1f04019960beecae869a62",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-89f7cfb21f1f04019960beecae869a62",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "kev_ransomware_use",
          "predicate_full": "security.vulnerability.kev_ransomware_use",
          "value": "known",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:45:00.485705Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-89f7cfb21f1f04019960beecae869a62\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:04.626124Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "package",
          "predicate_full": "security.vulnerability.package",
          "value": "pkg:maven/org.apache.logging.log4j/log4j-core",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [
            {
              "claim": "CLM-4de94887cc52ea1517d2da2cfdaecdba",
              "value": "pkg:maven/org.xbib.elasticsearch/log4j",
              "verdict": "supported"
            },
            {
              "claim": "CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
              "value": "pkg:maven/com.guicedee.services/log4j-core",
              "verdict": "supported"
            },
            {
              "claim": "CLM-94f06e40aea84c55bc21c503376650a8",
              "value": "pkg:maven/org.ops4j.pax.logging/pax-logging-log4j2",
              "verdict": "supported"
            },
            {
              "claim": "CLM-f9165ed7c97a78e3d7745c550644fb1e",
              "value": "pkg:maven/uk.co.nichesolutions.logging.log4j/log4j-core",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-0c0cfd1dd4e36ad6aab1593f26883065\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:04.703113Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-4de94887cc52ea1517d2da2cfdaecdba",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-4de94887cc52ea1517d2da2cfdaecdba",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "package",
          "predicate_full": "security.vulnerability.package",
          "value": "pkg:maven/org.xbib.elasticsearch/log4j",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [
            {
              "claim": "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
              "value": "pkg:maven/org.apache.logging.log4j/log4j-core",
              "verdict": "supported"
            },
            {
              "claim": "CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
              "value": "pkg:maven/com.guicedee.services/log4j-core",
              "verdict": "supported"
            },
            {
              "claim": "CLM-94f06e40aea84c55bc21c503376650a8",
              "value": "pkg:maven/org.ops4j.pax.logging/pax-logging-log4j2",
              "verdict": "supported"
            },
            {
              "claim": "CLM-f9165ed7c97a78e3d7745c550644fb1e",
              "value": "pkg:maven/uk.co.nichesolutions.logging.log4j/log4j-core",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-4de94887cc52ea1517d2da2cfdaecdba\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:04.778190Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "package",
          "predicate_full": "security.vulnerability.package",
          "value": "pkg:maven/com.guicedee.services/log4j-core",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [
            {
              "claim": "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
              "value": "pkg:maven/org.apache.logging.log4j/log4j-core",
              "verdict": "supported"
            },
            {
              "claim": "CLM-4de94887cc52ea1517d2da2cfdaecdba",
              "value": "pkg:maven/org.xbib.elasticsearch/log4j",
              "verdict": "supported"
            },
            {
              "claim": "CLM-94f06e40aea84c55bc21c503376650a8",
              "value": "pkg:maven/org.ops4j.pax.logging/pax-logging-log4j2",
              "verdict": "supported"
            },
            {
              "claim": "CLM-f9165ed7c97a78e3d7745c550644fb1e",
              "value": "pkg:maven/uk.co.nichesolutions.logging.log4j/log4j-core",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-7e131bcf8fec6478c4a7e5ec6df506c7\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:04.832947Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-94f06e40aea84c55bc21c503376650a8",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-94f06e40aea84c55bc21c503376650a8",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "package",
          "predicate_full": "security.vulnerability.package",
          "value": "pkg:maven/org.ops4j.pax.logging/pax-logging-log4j2",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [
            {
              "claim": "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
              "value": "pkg:maven/org.apache.logging.log4j/log4j-core",
              "verdict": "supported"
            },
            {
              "claim": "CLM-4de94887cc52ea1517d2da2cfdaecdba",
              "value": "pkg:maven/org.xbib.elasticsearch/log4j",
              "verdict": "supported"
            },
            {
              "claim": "CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
              "value": "pkg:maven/com.guicedee.services/log4j-core",
              "verdict": "supported"
            },
            {
              "claim": "CLM-f9165ed7c97a78e3d7745c550644fb1e",
              "value": "pkg:maven/uk.co.nichesolutions.logging.log4j/log4j-core",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-94f06e40aea84c55bc21c503376650a8\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:04.876014Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-f9165ed7c97a78e3d7745c550644fb1e",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-f9165ed7c97a78e3d7745c550644fb1e",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "package",
          "predicate_full": "security.vulnerability.package",
          "value": "pkg:maven/uk.co.nichesolutions.logging.log4j/log4j-core",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [
            {
              "claim": "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
              "value": "pkg:maven/org.apache.logging.log4j/log4j-core",
              "verdict": "supported"
            },
            {
              "claim": "CLM-4de94887cc52ea1517d2da2cfdaecdba",
              "value": "pkg:maven/org.xbib.elasticsearch/log4j",
              "verdict": "supported"
            },
            {
              "claim": "CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
              "value": "pkg:maven/com.guicedee.services/log4j-core",
              "verdict": "supported"
            },
            {
              "claim": "CLM-94f06e40aea84c55bc21c503376650a8",
              "value": "pkg:maven/org.ops4j.pax.logging/pax-logging-log4j2",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-f9165ed7c97a78e3d7745c550644fb1e\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:04.926245Z"
      }
    ]
  }
});

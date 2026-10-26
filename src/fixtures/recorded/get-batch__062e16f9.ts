// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 32814e5a
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.vulnerability/cve-2021-44228"
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
        "ref": "security.vulnerability/cve-2021-44228",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2021-44228",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-4642cf991ae7141668e684f415235edd",
              "value": "CVE-2021-44228",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c",
              "value": "2021-12-10",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-0ba682d76516d92976ce066cae115b97",
              "value": "2021-12-24",
              "flags": []
            },
            {
              "predicate": "kev_listed",
              "claim": "CLM-4c740f542205fd08336df797e00b487b",
              "value": true,
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-89f7cfb21f1f04019960beecae869a62",
              "value": "known",
              "flags": []
            },
            {
              "predicate": "package",
              "claim": [
                "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
                "CLM-4de94887cc52ea1517d2da2cfdaecdba",
                "CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
                "CLM-94f06e40aea84c55bc21c503376650a8",
                "CLM-f9165ed7c97a78e3d7745c550644fb1e"
              ],
              "value": [
                "pkg:maven/org.apache.logging.log4j/log4j-core",
                "pkg:maven/org.xbib.elasticsearch/log4j",
                "pkg:maven/com.guicedee.services/log4j-core",
                "pkg:maven/org.ops4j.pax.logging/pax-logging-log4j2",
                "pkg:maven/uk.co.nichesolutions.logging.log4j/log4j-core"
              ],
              "flags": []
            }
          ],
          "incoming_count": 1,
          "next": [
            "cx.get(\"security.vulnerability/cve-2021-44228\", detail=\"history\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\", detail=\"incoming\")"
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
        "evaluation_time": "2026-10-26T19:05:06.215695Z"
      }
    ]
  }
});

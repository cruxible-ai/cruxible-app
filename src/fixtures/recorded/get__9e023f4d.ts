// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get e17980c7
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.vulnerability/cve-2021-44228",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.vulnerability/cve-2021-44228",
    "kind": "subject",
    "detail": "history",
    "history": {
      "kind": "subject",
      "revisions": [
        {
          "revision": 1,
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "lifecycle": "live",
          "digest": "sha256:509d9754b9e3",
          "reason": {
            "kind": "procedure_item",
            "reason": "CVE-2021-44228 applies to inventory (gate-app--1.0.0); its assessment tracks it.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          }
        }
      ],
      "events": [
        {
          "field": "kev_due_date",
          "predicate": "security.vulnerability.kev_due_date",
          "claim": "CLM-0ba682d76516d92976ce066cae115b97",
          "sequence": 8,
          "git_oid": "41dc120513a2",
          "accepted": "2026-10-26T17:45:00.485705Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.23 lists CVE-2021-44228 with dueDate = '2021-12-24'.",
            "proposal": "sha256:18511759d6d1276ae4e0d7e028af21a68aa6a744893384261ee91a8048c613b8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d",
            "terminal": "settle"
          },
          "value": "2021-12-24",
          "change": "stated"
        },
        {
          "field": "kev_listed",
          "predicate": "security.vulnerability.kev_listed",
          "claim": "CLM-4c740f542205fd08336df797e00b487b",
          "sequence": 8,
          "git_oid": "41dc120513a2",
          "accepted": "2026-10-26T17:45:00.485705Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.23 lists CVE-2021-44228 with an entry = True.",
            "proposal": "sha256:18511759d6d1276ae4e0d7e028af21a68aa6a744893384261ee91a8048c613b8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d",
            "terminal": "settle"
          },
          "value": true,
          "change": "stated"
        },
        {
          "field": "kev_ransomware_use",
          "predicate": "security.vulnerability.kev_ransomware_use",
          "claim": "CLM-89f7cfb21f1f04019960beecae869a62",
          "sequence": 8,
          "git_oid": "41dc120513a2",
          "accepted": "2026-10-26T17:45:00.485705Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.23 lists CVE-2021-44228 with knownRansomwareCampaignUse = 'known'.",
            "proposal": "sha256:18511759d6d1276ae4e0d7e028af21a68aa6a744893384261ee91a8048c613b8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d",
            "terminal": "settle"
          },
          "value": "known",
          "change": "stated"
        },
        {
          "field": "kev_date_added",
          "predicate": "security.vulnerability.kev_date_added",
          "claim": "CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c",
          "sequence": 8,
          "git_oid": "41dc120513a2",
          "accepted": "2026-10-26T17:45:00.485705Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.23 lists CVE-2021-44228 with dateAdded = '2021-12-10'.",
            "proposal": "sha256:18511759d6d1276ae4e0d7e028af21a68aa6a744893384261ee91a8048c613b8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d",
            "terminal": "settle"
          },
          "value": "2021-12-10",
          "change": "stated"
        },
        {
          "field": "package",
          "predicate": "security.vulnerability.package",
          "claim": "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "OSV's GHSA-jfh8-c2jp-5v3q name pkg:maven/org.apache.logging.log4j/log4j-core as affected by CVE-2021-44228.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          },
          "value": "pkg:maven/org.apache.logging.log4j/log4j-core",
          "change": "stated"
        },
        {
          "field": "cve_id",
          "predicate": "security.vulnerability.cve_id",
          "claim": "CLM-4642cf991ae7141668e684f415235edd",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.osv-applicability run RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8 terminal propose\n\n106 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9"
          },
          "value": "CVE-2021-44228",
          "change": "stated"
        },
        {
          "field": "package",
          "predicate": "security.vulnerability.package",
          "claim": "CLM-4de94887cc52ea1517d2da2cfdaecdba",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "OSV's GHSA-jfh8-c2jp-5v3q name pkg:maven/org.xbib.elasticsearch/log4j as affected by CVE-2021-44228.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          },
          "value": "pkg:maven/org.xbib.elasticsearch/log4j",
          "change": "stated"
        },
        {
          "field": "package",
          "predicate": "security.vulnerability.package",
          "claim": "CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "OSV's GHSA-jfh8-c2jp-5v3q name pkg:maven/com.guicedee.services/log4j-core as affected by CVE-2021-44228.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          },
          "value": "pkg:maven/com.guicedee.services/log4j-core",
          "change": "stated"
        },
        {
          "field": "package",
          "predicate": "security.vulnerability.package",
          "claim": "CLM-94f06e40aea84c55bc21c503376650a8",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "OSV's GHSA-jfh8-c2jp-5v3q name pkg:maven/org.ops4j.pax.logging/pax-logging-log4j2 as affected by CVE-2021-44228.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          },
          "value": "pkg:maven/org.ops4j.pax.logging/pax-logging-log4j2",
          "change": "stated"
        },
        {
          "field": "package",
          "predicate": "security.vulnerability.package",
          "claim": "CLM-f9165ed7c97a78e3d7745c550644fb1e",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "OSV's GHSA-jfh8-c2jp-5v3q name pkg:maven/uk.co.nichesolutions.logging.log4j/log4j-core as affected by CVE-2021-44228.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          },
          "value": "pkg:maven/uk.co.nichesolutions.logging.log4j/log4j-core",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:04.458520Z"
  }
});

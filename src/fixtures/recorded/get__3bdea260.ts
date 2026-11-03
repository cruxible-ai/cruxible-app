// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 92af806e
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.vulnerability/cve-2023-44487",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.vulnerability/cve-2023-44487",
    "kind": "subject",
    "detail": "history",
    "history": {
      "kind": "subject",
      "revisions": [
        {
          "revision": 1,
          "sequence": 7,
          "git_oid": "bd4d2aaab78a",
          "accepted": "2026-11-03T00:58:38.787504Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "lifecycle": "live",
          "digest": "sha256:2cd713b6d1ba",
          "reason": {
            "kind": "change_set",
            "text": "Watch the pilot's CVEs.",
            "proposal": "sha256:38e0aa3c58df7e96d70fcc2849e0cca6cd381757fe417cb7feb7d8298f16e1ed"
          }
        }
      ],
      "events": [
        {
          "field": "epss_score_date",
          "predicate": "security.vulnerability.epss_score_date",
          "claim": "CLM-2c559d9ffa815754e4723c04144f4e90",
          "sequence": 10,
          "git_oid": "7f513078c490",
          "accepted": "2026-11-03T00:58:54.573196Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "FIRST EPSS scored this CVE on 2026-11-02.",
            "proposal": "sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb",
            "procedure": "Procedure:security.epss-triage",
            "run": "RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4",
            "terminal": "write"
          },
          "value": "2026-11-02",
          "change": "stated"
        },
        {
          "field": "epss_percentile",
          "predicate": "security.vulnerability.epss_percentile",
          "claim": "CLM-5051bb5ab5bdb80237a10647d01da1e8",
          "sequence": 10,
          "git_oid": "7f513078c490",
          "accepted": "2026-11-03T00:58:54.573196Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "FIRST EPSS on 2026-11-02: percentile 0.99998.",
            "proposal": "sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb",
            "procedure": "Procedure:security.epss-triage",
            "run": "RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4",
            "terminal": "write"
          },
          "value": "0.99998",
          "change": "stated"
        },
        {
          "field": "epss_score",
          "predicate": "security.vulnerability.epss_score",
          "claim": "CLM-923bfe61a7bb723a636a86fe7cc6bdb4",
          "sequence": 10,
          "git_oid": "7f513078c490",
          "accepted": "2026-11-03T00:58:54.573196Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "FIRST EPSS on 2026-11-02: epss 0.99999.",
            "proposal": "sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb",
            "procedure": "Procedure:security.epss-triage",
            "run": "RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4",
            "terminal": "write"
          },
          "value": "0.99999",
          "change": "stated"
        },
        {
          "field": "listed_in",
          "predicate": "security.vulnerability.listed_in",
          "claim": "CLM-07e2523e79d50bba041f0fa492be4ca1",
          "sequence": 9,
          "git_oid": "677ae9bd9620",
          "accepted": "2026-11-03T00:58:48.471271Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.30 lists CVE-2023-44487.",
            "proposal": "sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514",
            "terminal": "write"
          },
          "value": "security.catalog/cisa-kev",
          "change": "stated"
        },
        {
          "field": "kev_due_date",
          "predicate": "security.vulnerability.kev_due_date",
          "claim": "CLM-564e79925ecc63bdc6891c631a54855f",
          "sequence": 9,
          "git_oid": "677ae9bd9620",
          "accepted": "2026-11-03T00:58:48.471271Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.30: dueDate 2023-10-31.",
            "proposal": "sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514",
            "terminal": "write"
          },
          "value": "2023-10-31",
          "change": "stated"
        },
        {
          "field": "kev_date_added",
          "predicate": "security.vulnerability.kev_date_added",
          "claim": "CLM-65471ed24f3c502ccbf845d20373af7f",
          "sequence": 9,
          "git_oid": "677ae9bd9620",
          "accepted": "2026-11-03T00:58:48.471271Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.30: dateAdded 2023-10-10.",
            "proposal": "sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514",
            "terminal": "write"
          },
          "value": "2023-10-10",
          "change": "stated"
        },
        {
          "field": "kev_ransomware_use",
          "predicate": "security.vulnerability.kev_ransomware_use",
          "claim": "CLM-dcffe8369cc7211a981764da419d81c7",
          "sequence": 9,
          "git_oid": "677ae9bd9620",
          "accepted": "2026-11-03T00:58:48.471271Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.30: knownRansomwareCampaignUse Unknown.",
            "proposal": "sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514",
            "terminal": "write"
          },
          "value": "Unknown",
          "change": "stated"
        },
        {
          "field": "cve_id",
          "predicate": "security.vulnerability.cve_id",
          "claim": "CLM-1096bb2f883d4f839654cba4d9d99d74",
          "sequence": 7,
          "git_oid": "bd4d2aaab78a",
          "accepted": "2026-11-03T00:58:38.787504Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "Watch the pilot's CVEs.",
            "proposal": "sha256:38e0aa3c58df7e96d70fcc2849e0cca6cd381757fe417cb7feb7d8298f16e1ed"
          },
          "value": "CVE-2023-44487",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "7f513078c490",
      "generation": 10
    },
    "evaluation_time": "2026-11-03T02:20:50.063136Z"
  }
});

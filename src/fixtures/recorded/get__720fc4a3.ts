// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get b394d3b1
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.vulnerability/cve-2021-44228",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
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
          "sequence": 17,
          "git_oid": "395f0a9e96f0",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "lifecycle": "live",
          "digest": "sha256:509d9754b9e3",
          "reason": {
            "kind": "procedure_item",
            "reason": "OSV GHSA-jfh8-c2jp-5v3q lists CVE-2021-44228 for pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1.",
            "proposal": "sha256:32612999e10ee8f8882e49d3cc7d5dccfd8f1ccd32f839161e31587d89435ba9",
            "procedure": "Procedure:security.osv-query",
            "run": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
            "terminal": "write"
          }
        }
      ],
      "events": [
        {
          "field": "epss_percentile",
          "predicate": "security.vulnerability.epss_percentile",
          "claim": "CLM-1817b5bf41dbacad208487b99a2a275d",
          "sequence": 19,
          "git_oid": "2d033ee7b7af",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "FIRST EPSS on 2026-11-02: percentile 1.",
            "proposal": "sha256:b466ed8f1bb5284fcd491ee57870f4fea225a9e19bf954a70f07717831942c96",
            "procedure": "Procedure:security.epss-triage",
            "run": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
            "terminal": "write"
          },
          "value": "1",
          "change": "stated"
        },
        {
          "field": "epss_score_date",
          "predicate": "security.vulnerability.epss_score_date",
          "claim": "CLM-c79e9d236b888bada73738d2f0dc0e1d",
          "sequence": 19,
          "git_oid": "2d033ee7b7af",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "FIRST EPSS scored this CVE on 2026-11-02.",
            "proposal": "sha256:b466ed8f1bb5284fcd491ee57870f4fea225a9e19bf954a70f07717831942c96",
            "procedure": "Procedure:security.epss-triage",
            "run": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
            "terminal": "write"
          },
          "value": "2026-11-02",
          "change": "stated"
        },
        {
          "field": "epss_score",
          "predicate": "security.vulnerability.epss_score",
          "claim": "CLM-df2e21236111d6da62b2da4022a65fdb",
          "sequence": 19,
          "git_oid": "2d033ee7b7af",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "FIRST EPSS on 2026-11-02: epss 0.99999.",
            "proposal": "sha256:b466ed8f1bb5284fcd491ee57870f4fea225a9e19bf954a70f07717831942c96",
            "procedure": "Procedure:security.epss-triage",
            "run": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
            "terminal": "write"
          },
          "value": "0.99999",
          "change": "stated"
        },
        {
          "field": "kev_due_date",
          "predicate": "security.vulnerability.kev_due_date",
          "claim": "CLM-0c497ce6493bc6eea94579dbc0e294fa",
          "sequence": 18,
          "git_oid": "031174cb01c3",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.30: dueDate 2021-12-24.",
            "proposal": "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
            "terminal": "write"
          },
          "value": "2021-12-24",
          "change": "stated"
        },
        {
          "field": "listed_in",
          "predicate": "security.vulnerability.listed_in",
          "claim": "CLM-2383f94f7b8c2128e24ea365a8f1e736",
          "sequence": 18,
          "git_oid": "031174cb01c3",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.30 lists CVE-2021-44228.",
            "proposal": "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
            "terminal": "write"
          },
          "value": "security.catalog/cisa-kev",
          "change": "stated"
        },
        {
          "field": "kev_ransomware_use",
          "predicate": "security.vulnerability.kev_ransomware_use",
          "claim": "CLM-7d0e73b0e07c961fb1024d98d258f43a",
          "sequence": 18,
          "git_oid": "031174cb01c3",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.30: knownRansomwareCampaignUse Known.",
            "proposal": "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
            "terminal": "write"
          },
          "value": "Known",
          "change": "stated"
        },
        {
          "field": "kev_date_added",
          "predicate": "security.vulnerability.kev_date_added",
          "claim": "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
          "sequence": 18,
          "git_oid": "031174cb01c3",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.30: dateAdded 2021-12-10.",
            "proposal": "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
            "terminal": "write"
          },
          "value": "2021-12-10",
          "change": "stated"
        },
        {
          "field": "cve_id",
          "predicate": "security.vulnerability.cve_id",
          "claim": "CLM-9eff1367310e902cdc436efb18e64336",
          "sequence": 17,
          "git_oid": "395f0a9e96f0",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.osv-query run RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051 terminal write\n\n18 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:32612999e10ee8f8882e49d3cc7d5dccfd8f1ccd32f839161e31587d89435ba9"
          },
          "value": "CVE-2021-44228",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:47:55.509239Z"
  }
});

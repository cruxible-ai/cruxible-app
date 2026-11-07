// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get bd62d12d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.vulnerability/cve-2026-49844",
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
    "ref": "security.vulnerability/cve-2026-49844",
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
          "digest": "sha256:16cf8602ccd3",
          "reason": {
            "kind": "procedure_item",
            "reason": "OSV GHSA-qv9r-c865-cp47 lists CVE-2026-49844 for pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1.",
            "proposal": "sha256:32612999e10ee8f8882e49d3cc7d5dccfd8f1ccd32f839161e31587d89435ba9",
            "procedure": "Procedure:security.osv-query",
            "run": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
            "terminal": "write"
          }
        }
      ],
      "events": [
        {
          "field": "listed_in",
          "predicate": "security.vulnerability.listed_in",
          "claim": "CLM-451efce0eb50eafd9c199f90f8b74897",
          "sequence": 18,
          "git_oid": "031174cb01c3",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "Complete source establishes the declared inverse.",
            "proposal": "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
            "terminal": "write"
          },
          "value": {
            "object": {
              "none": "security.catalog/cisa-kev"
            }
          },
          "change": "stated"
        },
        {
          "field": "cve_id",
          "predicate": "security.vulnerability.cve_id",
          "claim": "CLM-44ef6ae26ec37a36ef086b3cd329b469",
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
          "value": "CVE-2026-49844",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-07T22:22:59.108574Z"
  }
});

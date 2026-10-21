// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 6ba068e1
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.assessment/apache-log4j-1.2.17--cve-2021-44228",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.assessment/apache-log4j-1.2.17--cve-2021-44228",
    "kind": "subject",
    "detail": "history",
    "history": {
      "kind": "subject",
      "revisions": [
        {
          "revision": 1,
          "sequence": 21,
          "git_oid": "02cb71eab326",
          "accepted": "2026-10-19T21:31:46.272392Z",
          "actor": "gate-owner",
          "approved_by": [],
          "lifecycle": "live",
          "digest": "sha256:836051861953",
          "reason": {
            "kind": "procedure_item",
            "reason": "Assess apache-log4j--1.2.17 for CVE-2021-44228.",
            "proposal": "sha256:3c6bb6ca1e62758386da41c5907b80d71fd3a3ddf7309f351b26a02c8c0a093c",
            "procedure": "Procedure:security.cve-applicability",
            "run": "RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d",
            "terminal": "propose"
          }
        }
      ],
      "events": [
        {
          "field": "release_id",
          "predicate": "security.assessment.release_id",
          "claim": "CLM-8e3979a108f833d3d026632499e534e0",
          "sequence": 21,
          "git_oid": "02cb71eab326",
          "accepted": "2026-10-19T21:31:46.272392Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.cve-applicability run RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d terminal propose\n\n12 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:3c6bb6ca1e62758386da41c5907b80d71fd3a3ddf7309f351b26a02c8c0a093c"
          },
          "value": "apache-log4j--1.2.17",
          "change": "stated"
        },
        {
          "field": "release",
          "predicate": "security.assessment.release",
          "claim": "CLM-a8f0e5ebe0d59c830dfd78a963da64a8",
          "sequence": 21,
          "git_oid": "02cb71eab326",
          "accepted": "2026-10-19T21:31:46.272392Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "The assessment is about release apache-log4j--1.2.17.",
            "proposal": "sha256:3c6bb6ca1e62758386da41c5907b80d71fd3a3ddf7309f351b26a02c8c0a093c",
            "procedure": "Procedure:security.cve-applicability",
            "run": "RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d",
            "terminal": "propose"
          },
          "value": "security.release/apache-log4j--1.2.17",
          "change": "stated"
        },
        {
          "field": "cve_id",
          "predicate": "security.assessment.cve_id",
          "claim": "CLM-cbd32c835b2adaf3209581ada13e4b56",
          "sequence": 21,
          "git_oid": "02cb71eab326",
          "accepted": "2026-10-19T21:31:46.272392Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.cve-applicability run RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d terminal propose\n\n12 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:3c6bb6ca1e62758386da41c5907b80d71fd3a3ddf7309f351b26a02c8c0a093c"
          },
          "value": "CVE-2021-44228",
          "change": "stated"
        },
        {
          "field": "vulnerability",
          "predicate": "security.assessment.vulnerability",
          "claim": "CLM-df5b029f629819e35047abaa5f6644a8",
          "sequence": 21,
          "git_oid": "02cb71eab326",
          "accepted": "2026-10-19T21:31:46.272392Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "The assessment is about CVE-2021-44228.",
            "proposal": "sha256:3c6bb6ca1e62758386da41c5907b80d71fd3a3ddf7309f351b26a02c8c0a093c",
            "procedure": "Procedure:security.cve-applicability",
            "run": "RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d",
            "terminal": "propose"
          },
          "value": "security.vulnerability/cve-2021-44228",
          "change": "stated"
        },
        {
          "field": "status",
          "predicate": "security.assessment.status",
          "claim": "CLM-ec55359f4141d7e3a8027003b4ee4f03",
          "sequence": 21,
          "git_oid": "02cb71eab326",
          "accepted": "2026-10-19T21:31:46.272392Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "CVE-2021-44228's record names Apache Software Foundation Apache Log4j2, which only partly matches the release's product 'apache log4j'.",
            "proposal": "sha256:3c6bb6ca1e62758386da41c5907b80d71fd3a3ddf7309f351b26a02c8c0a093c",
            "procedure": "Procedure:security.cve-applicability",
            "run": "RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d",
            "terminal": "propose"
          },
          "value": "inconclusive",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-21T19:49:22.342311Z"
  }
});

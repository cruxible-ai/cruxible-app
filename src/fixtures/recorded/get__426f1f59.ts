// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get a3d540da
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.assessment/gate-app-1.0.0--cve-2021-44228",
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
    "ref": "security.assessment/gate-app-1.0.0--cve-2021-44228",
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
          "digest": "sha256:fddb3a64f388",
          "reason": {
            "kind": "procedure_item",
            "reason": "Assess gate-app--1.0.0 for CVE-2021-44228.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          }
        }
      ],
      "events": [
        {
          "field": "status",
          "predicate": "security.assessment.status",
          "claim": "CLM-d8674016342604fe9cf0b887fdb4ade5",
          "sequence": 12,
          "git_oid": "f3765015f78f",
          "accepted": "2026-10-26T19:00:09.706610Z",
          "actor": "robertmalone",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "The maintainer reads the launcher flag as a mitigation; OSV says affected.",
            "proposal": "sha256:082cdfbfea18fc362afba30963c4f516a62adecd8c372abe14dcb536405f4db0"
          },
          "value": "not_affected",
          "change": "stated",
          "contended": true
        },
        {
          "field": "justification",
          "predicate": "security.assessment.justification",
          "claim": "CLM-709a88c60fd24902ef8ba3a974e99d7a",
          "sequence": 11,
          "git_oid": "69c4e2897899",
          "accepted": "2026-10-26T19:00:07.921167Z",
          "actor": "robertmalone",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "gate-app launches log4j-core 2.14.1 with formatMsgNoLookups=true, so JNDI lookups in messages are disabled.",
            "proposal": "sha256:0ed594993b3e4bcabbb9609c5f2bf7dbe4ca3d2a44da6cc0007b5a5a71baa8e6"
          },
          "value": "inline_mitigations_already_exist",
          "change": "stated"
        },
        {
          "field": "vulnerability",
          "predicate": "security.assessment.vulnerability",
          "claim": "CLM-40eaf84ec507878cf8bf96ef60469512",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "The assessment is about CVE-2021-44228.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          },
          "value": "security.vulnerability/cve-2021-44228",
          "change": "stated"
        },
        {
          "field": "cve_id",
          "predicate": "security.assessment.cve_id",
          "claim": "CLM-4e1b9e461c6145b7edef755aba170415",
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
          "field": "release",
          "predicate": "security.assessment.release",
          "claim": "CLM-56fd1b8ae5704e251b220c4e289cab4a",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "The assessment is about release gate-app--1.0.0.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          },
          "value": "security.release/gate-app--1.0.0",
          "change": "stated"
        },
        {
          "field": "status",
          "predicate": "security.assessment.status",
          "claim": "CLM-76f9a4e45c6e684f32582bf12b1c690c",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "OSV lists CVE-2021-44228 as affecting pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1 (GHSA-jfh8-c2jp-5v3q, fixed in 2.12.2, 2.15.0, 2.3.1).",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          },
          "value": "affected",
          "change": "stated"
        },
        {
          "field": "release_id",
          "predicate": "security.assessment.release_id",
          "claim": "CLM-98f75f5e4cd545d223ba0b1ce0e0427e",
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
          "value": "gate-app--1.0.0",
          "change": "stated"
        },
        {
          "field": "component",
          "predicate": "security.assessment.component",
          "claim": "CLM-9e4f8791743a16db325166310248d6d2",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "The component pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1 brings CVE-2021-44228 in. OSV lists CVE-2021-44228 as affecting pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1 (GHSA-jfh8-c2jp-5v3q, fixed in 2.12.2, 2.15.0, 2.3.1).",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          },
          "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:03.109137Z"
  }
});

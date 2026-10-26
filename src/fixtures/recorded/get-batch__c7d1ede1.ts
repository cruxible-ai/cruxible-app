// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 99e53c36
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-9e4f8791743a16db325166310248d6d2",
      "CLM-4e1b9e461c6145b7edef755aba170415",
      "CLM-709a88c60fd24902ef8ba3a974e99d7a",
      "CLM-56fd1b8ae5704e251b220c4e289cab4a",
      "CLM-98f75f5e4cd545d223ba0b1ce0e0427e",
      "CLM-76f9a4e45c6e684f32582bf12b1c690c",
      "CLM-d8674016342604fe9cf0b887fdb4ade5",
      "CLM-40eaf84ec507878cf8bf96ef60469512"
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
        "ref": "CLM-9e4f8791743a16db325166310248d6d2",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-9e4f8791743a16db325166310248d6d2",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "component",
          "predicate_full": "security.assessment.component",
          "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-9e4f8791743a16db325166310248d6d2\", detail=\"evidence\")",
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:03.140278Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-4e1b9e461c6145b7edef755aba170415",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-4e1b9e461c6145b7edef755aba170415",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "cve_id",
          "predicate_full": "security.assessment.cve_id",
          "value": "CVE-2021-44228",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-4e1b9e461c6145b7edef755aba170415\", detail=\"evidence\")",
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:03.167334Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-709a88c60fd24902ef8ba3a974e99d7a",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-709a88c60fd24902ef8ba3a974e99d7a",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "justification",
          "predicate_full": "security.assessment.justification",
          "value": "inline_mitigations_already_exist",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T19:00:07.921167Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-709a88c60fd24902ef8ba3a974e99d7a\", detail=\"evidence\")",
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:03.199514Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-56fd1b8ae5704e251b220c4e289cab4a",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-56fd1b8ae5704e251b220c4e289cab4a",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "release",
          "predicate_full": "security.assessment.release",
          "value": "security.release/gate-app--1.0.0",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-56fd1b8ae5704e251b220c4e289cab4a\", detail=\"evidence\")",
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:03.228902Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-98f75f5e4cd545d223ba0b1ce0e0427e",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-98f75f5e4cd545d223ba0b1ce0e0427e",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "release_id",
          "predicate_full": "security.assessment.release_id",
          "value": "gate-app--1.0.0",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-98f75f5e4cd545d223ba0b1ce0e0427e\", detail=\"evidence\")",
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:03.255000Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-76f9a4e45c6e684f32582bf12b1c690c",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-76f9a4e45c6e684f32582bf12b1c690c",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "status",
          "predicate_full": "security.assessment.status",
          "value": "affected",
          "verdict": "supported",
          "status": "conflicted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [
            {
              "claim": "CLM-d8674016342604fe9cf0b887fdb4ade5",
              "value": "not_affected",
              "verdict": "supported"
            }
          ],
          "flags": [
            "contested"
          ],
          "next": [
            "cx.get(\"CLM-76f9a4e45c6e684f32582bf12b1c690c\", detail=\"evidence\")",
            "cx.get(\"CLM-76f9a4e45c6e684f32582bf12b1c690c\", detail=\"why\")",
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:03.286111Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-d8674016342604fe9cf0b887fdb4ade5",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-d8674016342604fe9cf0b887fdb4ade5",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "status",
          "predicate_full": "security.assessment.status",
          "value": "not_affected",
          "verdict": "supported",
          "status": "conflicted",
          "revision": 1,
          "accepted": "2026-10-26T19:00:09.706610Z",
          "contenders": [
            {
              "claim": "CLM-76f9a4e45c6e684f32582bf12b1c690c",
              "value": "affected",
              "verdict": "supported"
            }
          ],
          "flags": [
            "contested"
          ],
          "next": [
            "cx.get(\"CLM-d8674016342604fe9cf0b887fdb4ade5\", detail=\"evidence\")",
            "cx.get(\"CLM-d8674016342604fe9cf0b887fdb4ade5\", detail=\"why\")",
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:03.319139Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-40eaf84ec507878cf8bf96ef60469512",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-40eaf84ec507878cf8bf96ef60469512",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "vulnerability",
          "predicate_full": "security.assessment.vulnerability",
          "value": "security.vulnerability/cve-2021-44228",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-26T17:44:38.124878Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-40eaf84ec507878cf8bf96ef60469512\", detail=\"evidence\")",
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\")"
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
        "evaluation_time": "2026-10-26T19:05:03.352574Z"
      }
    ]
  }
});

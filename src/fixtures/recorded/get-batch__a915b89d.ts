// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch e9d21103
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.assessment/gate-app-1.0.0--cve-2021-44228"
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
        "ref": "security.assessment/gate-app-1.0.0--cve-2021-44228",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-9e4f8791743a16db325166310248d6d2"
              ],
              "value": [
                "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-4e1b9e461c6145b7edef755aba170415",
              "value": "CVE-2021-44228",
              "flags": []
            },
            {
              "predicate": "justification",
              "claim": "CLM-709a88c60fd24902ef8ba3a974e99d7a",
              "value": "inline_mitigations_already_exist",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-56fd1b8ae5704e251b220c4e289cab4a",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-98f75f5e4cd545d223ba0b1ce0e0427e",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": [
                "CLM-76f9a4e45c6e684f32582bf12b1c690c",
                "CLM-d8674016342604fe9cf0b887fdb4ade5"
              ],
              "value": [
                "affected",
                "not_affected"
              ],
              "flags": [
                "contested"
              ]
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-40eaf84ec507878cf8bf96ef60469512",
              "value": "security.vulnerability/cve-2021-44228",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\", detail=\"why\")",
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44228\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:06.291706Z"
      }
    ]
  }
});

// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch d7548bd8
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.assessment/gate-app-1.0.0--cve-2021-45046",
      "security.assessment/gate-app-1.0.0--cve-2021-44228",
      "security.assessment/gate-app-1.0.0--cve-2024-47081",
      "security.assessment/gate-app-1.0.0--cve-2026-34477",
      "security.assessment/gate-app-1.0.0--cve-2021-44832",
      "security.assessment/gate-app-1.0.0--cve-2025-68161",
      "security.assessment/gate-app-1.0.0--cve-2026-25645",
      "security.assessment/gate-app-1.0.0--cve-2025-27516",
      "security.assessment/gate-app-1.0.0--cve-2026-34480",
      "security.assessment/gate-app-1.0.0--cve-2026-34479",
      "security.assessment/gate-app-1.0.0--cve-2024-56201",
      "security.assessment/gate-app-1.0.0--cve-2024-56326",
      "security.assessment/gate-app-1.0.0--cve-2024-34064",
      "security.assessment/gate-app-1.0.0--cve-2021-45105"
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
        "ref": "security.assessment/gate-app-1.0.0--cve-2021-45046",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-45046",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-0fcadd4c99ec5c53767fb797d130d492"
              ],
              "value": [
                "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-fab41dfa8dcaef8ddedcc21f25290f06",
              "value": "CVE-2021-45046",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-4285037ca8e65050fb6cb84bd2a9b131",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-113f3b4e882e2044535320909da563b6",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-f171285b1ad1786c381bc23cf2a5586d",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-d5452d622741fd91e9ad7ba6792c4989",
              "value": "security.vulnerability/cve-2021-45046",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-45046\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.676685Z"
      },
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
        "evaluation_time": "2026-10-26T19:05:09.705256Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2024-47081",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-47081",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-3774571bad96bee2400a20f30661dbff"
              ],
              "value": [
                "pkg:pypi/requests@2.32.3"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-241ebf7694772d4b0d8d02c3ca9f72f9",
              "value": "CVE-2024-47081",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-6649162727db8e81374a28a19181842f",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-7baff77c88acf9b1de5ee2a80bd8b0fe",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-0561b974c2a1c883474ee73892b05737",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-aa23021f59b46dc792f4002cade8c52d",
              "value": "security.vulnerability/cve-2024-47081",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2024-47081\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.737696Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2026-34477",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-34477",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-de19358d19d9be2e6c6bc98c8741f7d6"
              ],
              "value": [
                "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-c42cd28cda0fea78008dda505fce1e62",
              "value": "CVE-2026-34477",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-685b2c65e4af04ede217346425a493a0",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-473afcaf5415aa495cee19a93c74852e",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-c2b6efd6b2645ebfade1447c5f776028",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-485c6ba6092c33e1abb1049f40d2039d",
              "value": "security.vulnerability/cve-2026-34477",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2026-34477\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.766285Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2021-44832",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44832",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-bbdde366e584c74b732b9deeaf41c83e"
              ],
              "value": [
                "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-e39e4e30e17f9333775b7a85721f278d",
              "value": "CVE-2021-44832",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-7273c5bbca09752f8af3b504c370275a",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-bdfe908a62a2175e04c99361faa38fd7",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-517cf7a330f36e7ae4e799385fafa700",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-da52e3c05b8edfc144bf01f63b76737e",
              "value": "security.vulnerability/cve-2021-44832",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-44832\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.796393Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2025-68161",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2025-68161",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-7c935e545f9a5513e06f5d0ebe83e8b3"
              ],
              "value": [
                "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-af64fd903e5eb957beefd36d0e73018d",
              "value": "CVE-2025-68161",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-79556a79f74a70bfa23edc08d11667d2",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-a16846de575338495f650996adabeddc",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-48ca5b2d5eec6962f25a496bc00bb650",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-6db53c7e4340dabaf2ae9a6745b06377",
              "value": "security.vulnerability/cve-2025-68161",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2025-68161\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.821550Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2026-25645",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-25645",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-fa976458a80633d6fda4223cc55b023e"
              ],
              "value": [
                "pkg:pypi/requests@2.32.3"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-a9d8e39ff42fb23602d2ee87f41b1744",
              "value": "CVE-2026-25645",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-8466ab583451270c1d6a2806b25704f8",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-68f0ddbc95e2b4f72abe02a3bb9b073a",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-a21fd98d279bb3ad5deaa443e17a8a4b",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-83c8614102156b8d32b72a804bc62e37",
              "value": "security.vulnerability/cve-2026-25645",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2026-25645\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.846151Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2025-27516",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2025-27516",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-86d31f0634e395a2019e7474a80ca355"
              ],
              "value": [
                "pkg:pypi/jinja2@3.1.3"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-0c0a1aad3b822d706618bbc863259d7c",
              "value": "CVE-2025-27516",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-8d09cdce645c0919c7470e0c4fc42a4e",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-5aae662fab1a7db7022bfe62a2c1d707",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-c47fcf16d538ba535a8afbe8a8e8f98a",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-c32873a7220f6ddcf638dafaf321056e",
              "value": "security.vulnerability/cve-2025-27516",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2025-27516\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.867514Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2026-34480",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-34480",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-ff2d5308c878f0ae38532193597d4fbc"
              ],
              "value": [
                "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-a0a6059c1fdbfe8e1102d1057d3f3127",
              "value": "CVE-2026-34480",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-afa2b686c3615b4ae001f2bb43bba441",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-55560cae73768f416a2a2ba3199395ae",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-0993d5c462e4cb3fcfa796ac81daffaf",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-804a44a4da257302a462728ad07ed5a8",
              "value": "security.vulnerability/cve-2026-34480",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2026-34480\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.891970Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2026-34479",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-34479",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-7c11cd97a2748ea126c5f4284c96e8cf"
              ],
              "value": [
                "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-d48bdbf3779515351f61796fd983b9f3",
              "value": "CVE-2026-34479",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-c88e9ff9d1383e14e52a99efb7777040",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-db745fc17a4fcdc1de67aebca24a1ccb",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-bd1e85c4aaa849448bcc5882df8cb61f",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-4c47ea59e9a0bce17c4f6715fd6b769f",
              "value": "security.vulnerability/cve-2026-34479",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2026-34479\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.929223Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2024-56201",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-56201",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-f2a03c8dd87ee0c4dccf129fd5fcf74f"
              ],
              "value": [
                "pkg:pypi/jinja2@3.1.3"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-f695ecb2a37554f14cc44a4bcb98d2c5",
              "value": "CVE-2024-56201",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-c98b0a58ab4536bf8da8647db45eb870",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-580f735c3db668c9dd912c546573173c",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-d31afae2b977354175c6400d68d55657",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-c449e373deb992726b28a427fe26909f",
              "value": "security.vulnerability/cve-2024-56201",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2024-56201\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.955102Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2024-56326",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-56326",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-da27b9856010e30ee8747c67a563e874"
              ],
              "value": [
                "pkg:pypi/jinja2@3.1.3"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-dec5a80f58e0a298dabbf5838670791c",
              "value": "CVE-2024-56326",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-cfc71d34eaced019c284cefb19e8318f",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-bb545b07087efb7d15d812822ca13b3f",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-8297b2a81314f55fa9ce597a8120eea4",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-0578d8724b2df538b23171e109ff3d37",
              "value": "security.vulnerability/cve-2024-56326",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2024-56326\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:09.980673Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2024-34064",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-34064",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-58a7a5d547b21d595ce974ef7f46e953"
              ],
              "value": [
                "pkg:pypi/jinja2@3.1.3"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-9996a968e7923292a4b65646e23af2a7",
              "value": "CVE-2024-34064",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-d501722b33c2be8cfa0a15f386e99208",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-997573ef563a306c7f4b4904223c6a79",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-101b24fb8d34e6ff99b1de2ff17d685f",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-87100491e2054ecd24447caf18f459ba",
              "value": "security.vulnerability/cve-2024-34064",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2024-34064\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:10.007461Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.assessment/gate-app-1.0.0--cve-2021-45105",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-45105",
          "kind": "security.assessment",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "component",
              "claim": [
                "CLM-4188cd82d2e96bcdf1ae15cdb99cc6d2"
              ],
              "value": [
                "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              ],
              "flags": []
            },
            {
              "predicate": "cve_id",
              "claim": "CLM-840656a169c474756d0f8c946d5df4ea",
              "value": "CVE-2021-45105",
              "flags": []
            },
            {
              "predicate": "release",
              "claim": "CLM-de777e5da46995304c685ca2758f1640",
              "value": "security.release/gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "release_id",
              "claim": "CLM-e35d10dc43b61a6050146245f24f9f24",
              "value": "gate-app--1.0.0",
              "flags": []
            },
            {
              "predicate": "status",
              "claim": "CLM-62e08dd5c4f963f0be2d0df2e832304c",
              "value": "affected",
              "flags": []
            },
            {
              "predicate": "vulnerability",
              "claim": "CLM-6a0d96818f35999444d0fac02755278a",
              "value": "security.vulnerability/cve-2021-45105",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.assessment/gate-app-1.0.0--cve-2021-45105\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:10.036648Z"
      }
    ]
  }
});

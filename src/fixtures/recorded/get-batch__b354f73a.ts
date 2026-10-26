// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch cab538a5
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.credential-import",
      "Line:security.cve-applicability",
      "Line:security.epss-daily",
      "Line:security.epss-triage",
      "Line:security.harden",
      "Line:security.inventory-import.prod",
      "Line:security.kev-attention",
      "Line:security.kev-daily",
      "Line:security.kev-triage",
      "Line:security.osv-applicability",
      "Line:security.registry-parse.cruxible",
      "Line:security.registry-parse.cruxible-client",
      "Line:security.registry-pull.cruxible",
      "Line:security.registry-pull.cruxible-client",
      "Line:security.repo-parse.cruxible-ci",
      "Line:security.repo-pull.cruxible-ci",
      "Line:security.sarif-attention.cruxible",
      "Line:security.sarif-import.cruxible",
      "Line:security.sbom-import"
    ],
    "detail": "proof",
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
        "ref": "Line:security.credential-import",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.credential-import.json",
          "artifact_digest": "sha256:0286a329b3de6059be6474cdb806797448b90e72342c8295951b00fd4075d834",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.credential-import"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.credential-import"
              }
            },
            "parameters": {},
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": "credential",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.file-erasable-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 1048576,
              "max_items": 500,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 120000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:01.945474Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.cve-applicability",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.cve-applicability.json",
          "artifact_digest": "sha256:f185b16622f7f064ea0de25cb6d03ce3a5a9e0a5f9d4939af8e25febfbe6b9ed",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.cve-applicability"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.cve-applicability"
              }
            },
            "parameters": {},
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": "record",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.fetched-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 5000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:01.954239Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.epss-daily",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.epss-daily.json",
          "artifact_digest": "sha256:588bb1d8c9f02eddd6262110e60930b6aa045d0a172b8290f63d1de792b71462",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.epss-daily"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.epss-acquire"
              }
            },
            "parameters": {},
            "acquisition_policy": null,
            "max_authority": "observe",
            "trigger_input": null,
            "trigger_event": null,
            "budgets": {
              "max_capture_bytes": 33554432,
              "max_items": 1,
              "max_provider_calls": 1,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:01.966352Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.epss-triage",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.epss-triage.json",
          "artifact_digest": "sha256:7ae51c543936e4d2b0d28194539b9a99fb7a513fded08b7db0eca82a622c449f",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.epss-triage"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.epss-triage"
              }
            },
            "parameters": {},
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": "epss",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.fetched-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 33554432,
              "max_items": 5000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:01.975209Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.harden",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.harden.json",
          "artifact_digest": "sha256:b07e004fe3e424bd0469806307d2ef1b5d172a6180fbafd05003e19492e0ae8f",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.harden"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.harden"
              }
            },
            "parameters": {
              "default_ref": "main",
              "registry_pull": "security.registry-acquire",
              "release_pull": "security.fetch",
              "repo_pull": "security.repo-acquire",
              "versions": 3
            },
            "acquisition_policy": null,
            "max_authority": "observe",
            "trigger_input": null,
            "trigger_event": null,
            "budgets": {
              "max_capture_bytes": 1048576,
              "max_items": 200,
              "max_provider_calls": 1,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:01.983041Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.inventory-import.prod",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.inventory-import.prod.json",
          "artifact_digest": "sha256:557b57b26372553010be36bc6123ceb5a8732485ed2ac7c5ccfa99f2ae2d1527",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.inventory-import.prod"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.inventory-import"
              }
            },
            "parameters": {
              "scope": "prod"
            },
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": "inventory",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.file-erasable-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 1048576,
              "max_items": 5000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.001821Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.kev-attention",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.kev-attention.json",
          "artifact_digest": "sha256:ecd27ef4b7f50c5477c4583195f26c7e25b059f7e33b3c45b002f5e0025c89b8",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.kev-attention"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.kev-attention"
              }
            },
            "parameters": {},
            "acquisition_policy": null,
            "max_authority": "observe",
            "trigger_input": "catalog",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.fetched-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 1000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.027677Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.kev-daily",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.kev-daily.json",
          "artifact_digest": "sha256:77c0486751f41f1101f358f45c3827f80bd20cdd7253901a3c0a436bf38126c0",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.kev-daily"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.fetch-observed"
              }
            },
            "parameters": {
              "logical_source": "cisa.kev.catalog",
              "max_bytes": 4194304,
              "url": "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
            },
            "acquisition_policy": null,
            "max_authority": "observe",
            "trigger_input": null,
            "trigger_event": null,
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 1,
              "max_provider_calls": 1,
              "max_wall_clock_microseconds": 120000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.045461Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.kev-triage",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.kev-triage.json",
          "artifact_digest": "sha256:088eb15c8e07f681bf97db3edeb31a184495535fc94ba1e7b75ae37f77e02b3d",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.kev-triage"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.kev-triage"
              }
            },
            "parameters": {},
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": "catalog",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.fetched-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 5000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.057764Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.osv-applicability",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.osv-applicability.json",
          "artifact_digest": "sha256:eb856a6793aa03acc8699459abfc9d97ea066a7f11e66111e59a328ac52b281d",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.osv-applicability"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.osv-applicability"
              }
            },
            "parameters": {},
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": null,
            "trigger_event": null,
            "budgets": {
              "max_capture_bytes": 67108864,
              "max_items": 5000,
              "max_provider_calls": 3,
              "max_wall_clock_microseconds": 600000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.077890Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-parse.cruxible",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.registry-parse.cruxible.json",
          "artifact_digest": "sha256:a2a20db169057947b59d542bd8f7863a214756b0e309836f43517a2dbafe177e",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.registry-parse.cruxible"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.registry-parse"
              }
            },
            "parameters": {
              "project": "cruxible",
              "source": "pypi/cruxible",
              "versions": 3
            },
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": "registry",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.fetched-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 5000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.094066Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-parse.cruxible-client",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.registry-parse.cruxible-client.json",
          "artifact_digest": "sha256:96fd4431507ce40909f15b23e63ea0e33e9fc8c3f70f81c01f1489a0b2ebcb50",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.registry-parse.cruxible-client"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.registry-parse"
              }
            },
            "parameters": {
              "project": "cruxible-client",
              "source": "pypi/cruxible-client",
              "versions": 3
            },
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": "registry",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.fetched-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 5000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.113170Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-pull.cruxible",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.registry-pull.cruxible.json",
          "artifact_digest": "sha256:380bd4f80b28b1a7ba73e1dfa1469d8fcb94b2471d2ca78d784c91d627d85375",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.registry-pull.cruxible"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.registry-acquire"
              }
            },
            "parameters": {
              "project": "cruxible",
              "versions": 3
            },
            "acquisition_policy": null,
            "max_authority": "observe",
            "trigger_input": null,
            "trigger_event": null,
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 1,
              "max_provider_calls": 1,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.142184Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-pull.cruxible-client",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.registry-pull.cruxible-client.json",
          "artifact_digest": "sha256:35b186758e1510cab1601d174b64d681d731b347eb1a8d6296b83e68b6e5f6ee",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.registry-pull.cruxible-client"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.registry-acquire"
              }
            },
            "parameters": {
              "project": "cruxible-client",
              "versions": 3
            },
            "acquisition_policy": null,
            "max_authority": "observe",
            "trigger_input": null,
            "trigger_event": null,
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 1,
              "max_provider_calls": 1,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.155730Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.repo-parse.cruxible-ci",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.repo-parse.cruxible-ci.json",
          "artifact_digest": "sha256:56cfb04fe41988ab455ea5b6717ea6f7f2ccedc6f7db4399aa8d1c9d2dc5a0a7",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.repo-parse.cruxible-ci"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.repo-parse"
              }
            },
            "parameters": {
              "forge_host": "github.com",
              "full_name": "cruxible-ai/cruxible",
              "path": ".github/workflows/",
              "ref": "main",
              "repo_source": "github.com/cruxible-ai/cruxible@main",
              "scope": "ci.workflows",
              "source": "github.com/cruxible-ai/cruxible@main:.github/workflows/"
            },
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": "snapshot",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.fetched-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 5000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.171208Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.repo-pull.cruxible-ci",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.repo-pull.cruxible-ci.json",
          "artifact_digest": "sha256:fe8cf5e49faf3dbb6a7722d8dd80c4609f5ea345a18f5fbda9e571aebec39e71",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.repo-pull.cruxible-ci"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.repo-acquire"
              }
            },
            "parameters": {
              "forge_host": "github.com",
              "full_name": "cruxible-ai/cruxible",
              "path": ".github/workflows/",
              "ref": "main",
              "scope": "ci.workflows"
            },
            "acquisition_policy": null,
            "max_authority": "observe",
            "trigger_input": null,
            "trigger_event": null,
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 1,
              "max_provider_calls": 1,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.183865Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.sarif-attention.cruxible",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.sarif-attention.cruxible.json",
          "artifact_digest": "sha256:f57ca8912d809fcd9b043a7d1dadead8b0da369714e85007bfde2c4aed1b46c7",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.sarif-attention.cruxible"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.sarif-attention"
              }
            },
            "parameters": {
              "repo_ref": "github.com/cruxible-ai/cruxible"
            },
            "acquisition_policy": null,
            "max_authority": "observe",
            "trigger_input": "sarif",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.file-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 1000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.207043Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.sarif-import.cruxible",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.sarif-import.cruxible.json",
          "artifact_digest": "sha256:e08e06f8ffe046d411035240b4e53a4242f11525dad11b88f7f3fcddb29d303c",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.sarif-import.cruxible"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.sarif-import"
              }
            },
            "parameters": {
              "repo_ref": "github.com/cruxible-ai/cruxible"
            },
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": "sarif",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.file-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 5000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.233832Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.sbom-import",
        "kind": "line",
        "detail": "proof",
        "proof": {
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "path": "lines/security.sbom-import.json",
          "artifact_digest": "sha256:899eaacadaf6f56021bcfdaa8955836df493456cac34c06da1da7d65f3e69392",
          "envelope": {
            "artifact_format": "cruxible-line-v7",
            "identity": {
              "kind": "Line",
              "name": "security.sbom-import"
            },
            "occurrence_epoch": 1,
            "procedure": {
              "target": {
                "kind": "Procedure",
                "name": "security.sbom-import"
              }
            },
            "parameters": {},
            "acquisition_policy": null,
            "max_authority": "propose",
            "trigger_input": "sbom",
            "trigger_event": {
              "capture_contract_identity": {
                "kind": "CaptureContract",
                "name": "security.file-v1"
              }
            },
            "budgets": {
              "max_capture_bytes": 16777216,
              "max_items": 5000,
              "max_provider_calls": 2,
              "max_wall_clock_microseconds": 300000000
            },
            "epsilon": {
              "$decimal": "0.1"
            },
            "lifecycle": {
              "state": "live",
              "predecessor_digest": null
            }
          }
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
        "evaluation_time": "2026-10-26T19:05:02.259872Z"
      }
    ]
  }
});

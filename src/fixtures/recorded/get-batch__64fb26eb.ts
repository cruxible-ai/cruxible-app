// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch e77a8164
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.sbom-import"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.sbom-import",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.sbom-import",
            "description": "Read one CycloneDX JSON SBOM from the workspace and write each component's occurrence in the inventory it describes, with its scope; a component the SBOM no longer lists has its scope retired.",
            "hard_caps": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 8388608,
              "items": 40000,
              "read_rows": 20000
            },
            "slots": {
              "derive": {
                "in": {
                  "name": "sbom.components.request",
                  "version": 1,
                  "digest": "sha256:5c622fc01dfabd8c7bd71842eeddb10d54255951a2105bab3ca28160fb5811ba"
                },
                "out": {
                  "name": "sbom.components.result",
                  "version": 1,
                  "digest": "sha256:4fa2f7cb4d5f000a30abe573f4026c570558d84a3831410417331b5e7ddc6c60"
                },
                "effect": "pure"
              },
              "read": {
                "in": {
                  "name": "workspace.file.request",
                  "version": 1,
                  "digest": "sha256:d9c33d4ac151700c89f5391b66adf73c6e6cddfc199670cd4cb9dc01651f7240"
                },
                "out": {
                  "name": "workspace.file.result",
                  "version": 1,
                  "digest": "sha256:fe3980a054beed0610045a28a27fbb50c0bad89e91fb5059a76667e34e169dd8"
                },
                "effect": "pure"
              }
            },
            "steps": [
              {
                "call": "sbom",
                "slot": "read",
                "input": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": {
                    "$ref": "param",
                    "path": [
                      "logical_source"
                    ]
                  },
                  "relative_path": {
                    "$ref": "param",
                    "path": [
                      "relative_path"
                    ]
                  },
                  "replayability": "attested_only",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                },
                "captures": {
                  "capture": "security.cyclonedx-sbom"
                }
              },
              {
                "call": "derived",
                "slot": "derive",
                "input": {
                  "logical_source": {
                    "$ref": "param",
                    "path": [
                      "logical_source"
                    ]
                  },
                  "relative_path": {
                    "$ref": "param",
                    "path": [
                      "relative_path"
                    ]
                  },
                  "sbom": {
                    "$ref": "step",
                    "step": "sbom",
                    "path": [
                      "capture"
                    ]
                  }
                },
                "captures": {
                  "document": "security.sbom-components"
                }
              },
              {
                "extract": "listed",
                "capture": {
                  "$ref": "step",
                  "step": "derived",
                  "path": [
                    "document"
                  ]
                },
                "records": "/components/*",
                "row": "security.sbom-component@1",
                "fields": {
                  "name": {
                    "at": "name",
                    "presence": "optional"
                  },
                  "named_by": {
                    "at": "named_by"
                  },
                  "scope": {
                    "at": "scope",
                    "canonicalize": "claim_type"
                  },
                  "warning": {
                    "at": "warning",
                    "presence": "optional"
                  }
                },
                "key": {
                  "purl": {
                    "at": "purl",
                    "type": "key_part<security.component:purl>"
                  }
                },
                "header": {
                  "inventory": {
                    "at": "/inventory",
                    "type": "string{min_len: 1, max_len: 256}"
                  }
                },
                "complete_when": {
                  "count_at": "/count"
                }
              },
              {
                "id": "write",
                "claims": [
                  {
                    "type": "security.occurrence.scope",
                    "value": {
                      "$ref": "item",
                      "path": [
                        "fields",
                        "scope"
                      ]
                    },
                    "rationale": "The SBOM at {$params.relative_path} lists {$item.key.purl} with scope {$item.fields.scope} (inventory {$steps.listed.header.inventory}, named by {$item.fields.named_by}).",
                    "when_absent": "mirror"
                  }
                ],
                "for_each": {
                  "$ref": "step",
                  "step": "listed",
                  "path": [
                    "records"
                  ]
                },
                "subject": {
                  "kind": "security.occurrence",
                  "key": {
                    "component": {
                      "create": "if_absent",
                      "key": {
                        "purl": {
                          "$ref": "item",
                          "path": [
                            "key",
                            "purl"
                          ]
                        }
                      },
                      "kind": "security.component"
                    },
                    "inventory": {
                      "create": "if_absent",
                      "key": {
                        "inventory_id": {
                          "$ref": "step",
                          "step": "listed",
                          "path": [
                            "header",
                            "inventory"
                          ]
                        }
                      },
                      "kind": "security.inventory"
                    }
                  },
                  "create": "if_absent"
                },
                "expect": {
                  "by": "inventory",
                  "ends": [
                    {
                      "$ref": "step",
                      "step": "listed",
                      "path": [
                        "header",
                        "inventory"
                      ]
                    }
                  ]
                }
              }
            ],
            "input_contract": "security.sbom-import.input@1",
            "output_contract": "security.sbom-import.output@1",
            "parameter_contract": "security.sbom-import.params@1"
          },
          "procedure": "security.sbom-import",
          "description": "Read one CycloneDX JSON SBOM from the workspace and write each component's occurrence in the inventory it describes, with its scope; a component the SBOM no longer lists has its scope retired.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.sbom-import.input/v1",
            "parameters": "Contract:security.sbom-import.params/v1"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "write",
              "kind": "claims",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.sbom-import\"}])",
            "cx.get(\"Procedure:security.sbom-import\", detail=\"proof\")"
          ]
        },
        "coordinate": {
          "git_oid": "30e90cc6ad34",
          "generation": 22
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "evaluation_time": "2026-11-08T19:48:01.895819Z"
      }
    ]
  }
});

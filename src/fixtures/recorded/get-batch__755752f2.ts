// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch a8b5481c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.osv-query"
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
        "ref": "Procedure:security.osv-query",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.osv-query",
            "description": "Ask OSV about every inventoried component and write which vulnerabilities OSV lists for its exact purl@version; a vulnerability OSV no longer lists for a component it answered in full retires.",
            "hard_caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 67108864,
              "items": 50000,
              "read_rows": 20000
            },
            "slots": {
              "match": {
                "capability": {
                  "name": "osv.match",
                  "version": 1
                }
              },
              "query": {
                "capability": {
                  "name": "osv.query",
                  "version": 1
                }
              }
            },
            "steps": [
              {
                "read": "components",
                "query": "security.osv_components"
              },
              {
                "call": "osv",
                "slot": "query",
                "input": {
                  "components": {
                    "$ref": "step",
                    "step": "components",
                    "path": [
                      "rows",
                      "[*]",
                      "purl"
                    ]
                  },
                  "logical_source": {
                    "$ref": "param",
                    "path": [
                      "logical_source"
                    ]
                  }
                },
                "captures": {
                  "responses": "security.osv-response"
                }
              },
              {
                "call": "matched",
                "slot": "match",
                "input": {
                  "components": {
                    "$ref": "step",
                    "step": "components",
                    "path": [
                      "rows",
                      "[*]",
                      "purl"
                    ]
                  },
                  "logical_source": {
                    "$ref": "param",
                    "path": [
                      "logical_source"
                    ]
                  },
                  "responses": {
                    "$ref": "step",
                    "step": "osv",
                    "path": [
                      "responses"
                    ]
                  }
                },
                "captures": {
                  "document": "security.osv-matches"
                }
              },
              {
                "extract": "affected",
                "capture": {
                  "$ref": "step",
                  "step": "matched",
                  "path": [
                    "document"
                  ]
                },
                "records": "affected",
                "key": {
                  "cve_id": {
                    "type": "key_part<security.vulnerability:cve_id>"
                  },
                  "purl": {
                    "type": "key_part<security.component:purl>"
                  }
                },
                "header": [
                  "queried"
                ]
              },
              {
                "id": "write",
                "claims": [
                  {
                    "type": "security.component.affected_by",
                    "value": {
                      "create": "if_absent",
                      "key": {
                        "cve_id": {
                          "$ref": "item",
                          "path": [
                            "key",
                            "cve_id"
                          ]
                        }
                      },
                      "kind": "security.vulnerability"
                    },
                    "rationale": "OSV {$item.fields.osv_id} lists {$item.key.cve_id} for {$item.key.purl}.",
                    "when_absent": "mirror"
                  }
                ],
                "for_each": {
                  "$ref": "step",
                  "step": "affected",
                  "path": [
                    "records"
                  ]
                },
                "subject": {
                  "kind": "security.component",
                  "key": {
                    "purl": {
                      "$ref": "item",
                      "path": [
                        "key",
                        "purl"
                      ]
                    }
                  }
                },
                "expect": {
                  "$ref": "step",
                  "step": "affected",
                  "path": [
                    "header",
                    "queried"
                  ]
                }
              }
            ],
            "input_contract": "security.osv-query.input@1",
            "output_contract": "security.osv-query.output@1",
            "parameter_contract": "security.osv-query.params@1"
          },
          "procedure": "security.osv-query",
          "description": "Ask OSV about every inventoried component and write which vulnerabilities OSV lists for its exact purl@version; a vulnerability OSV no longer lists for a component it answered in full retires.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.osv-query.input/v1",
            "parameters": "Contract:security.osv-query.params/v1"
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
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.osv-query\"}])",
            "cx.get(\"Procedure:security.osv-query\", detail=\"proof\")"
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
        "evaluation_time": "2026-11-08T19:48:01.792963Z"
      }
    ]
  }
});

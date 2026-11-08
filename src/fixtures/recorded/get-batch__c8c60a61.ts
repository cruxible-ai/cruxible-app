// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch a1c49719
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.epss-triage"
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
        "ref": "Procedure:security.epss-triage",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.epss-triage",
            "description": "Read FIRST's EPSS API answer for the watched CVEs and write each one's score, percentile and score date.",
            "hard_caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "capture_bytes": 16777216,
              "items": 20000,
              "read_rows": 50000
            },
            "slots": {
              "fetch": {
                "in": {
                  "name": "web.fetch.request",
                  "version": 1,
                  "digest": "sha256:1f4eefbeef292080ab075e22d068a4e45f6b01170802f2ca470daa2329444137"
                },
                "out": {
                  "name": "web.fetch.result",
                  "version": 1,
                  "digest": "sha256:94f256cdc9f9dfb45d8ac2a55e5aaf40bdb64757cbbf21703baeb8bd8d03062f"
                },
                "effect": "external_read"
              }
            },
            "steps": [
              {
                "call": "scores_api",
                "slot": "fetch",
                "input": {
                  "expected_format": "json",
                  "logical_source": {
                    "$ref": "param",
                    "path": [
                      "logical_source"
                    ]
                  },
                  "max_bytes": {
                    "$ref": "param",
                    "path": [
                      "max_bytes"
                    ]
                  },
                  "url": {
                    "$ref": "param",
                    "path": [
                      "url"
                    ]
                  }
                },
                "captures": {
                  "capture": "security.epss-scores"
                }
              },
              {
                "read": "watched",
                "query": "security.watched_vulnerabilities"
              },
              {
                "read": "watch_keys",
                "query": "security.watched_cve_keys"
              },
              {
                "extract": "scores",
                "capture": {
                  "$ref": "step",
                  "step": "scores_api",
                  "path": [
                    "capture"
                  ]
                },
                "records": "/data/*",
                "row": "security.epss-row@1",
                "fields": {
                  "date": {
                    "at": "date",
                    "parse": "date"
                  },
                  "percentile": {
                    "at": "percentile",
                    "parse": "decimal"
                  },
                  "score": {
                    "at": "epss",
                    "parse": "decimal"
                  }
                },
                "key": {
                  "cve_id": {
                    "at": "cve",
                    "type": "key_part<security.vulnerability:cve_id>"
                  }
                },
                "complete_when": {
                  "count_at": "/total"
                },
                "only_keys": {
                  "$ref": "step",
                  "step": "watch_keys",
                  "path": [
                    "rows"
                  ]
                }
              },
              {
                "id": "write",
                "claims": [
                  {
                    "type": "security.vulnerability.epss_score",
                    "value": {
                      "$ref": "item",
                      "path": [
                        "fields",
                        "score"
                      ]
                    },
                    "rationale": "FIRST EPSS on {$item.fields.date}: epss {$item.fields.score}."
                  },
                  {
                    "type": "security.vulnerability.epss_percentile",
                    "value": {
                      "$ref": "item",
                      "path": [
                        "fields",
                        "percentile"
                      ]
                    },
                    "rationale": "FIRST EPSS on {$item.fields.date}: percentile {$item.fields.percentile}."
                  },
                  {
                    "type": "security.vulnerability.epss_score_date",
                    "value": {
                      "$ref": "item",
                      "path": [
                        "fields",
                        "date"
                      ]
                    },
                    "rationale": "FIRST EPSS scored this CVE on {$item.fields.date}."
                  }
                ],
                "for_each": {
                  "$ref": "step",
                  "step": "scores",
                  "path": [
                    "records"
                  ]
                },
                "subject": {
                  "kind": "security.vulnerability",
                  "key": {
                    "cve_id": {
                      "$ref": "item",
                      "path": [
                        "key",
                        "cve_id"
                      ]
                    }
                  },
                  "within": {
                    "$ref": "step",
                    "step": "watched",
                    "path": [
                      "rows"
                    ]
                  }
                }
              }
            ],
            "input_contract": "security.epss-triage.input@1",
            "output_contract": "security.epss-triage.output@1",
            "parameter_contract": "security.epss-triage.params@1"
          },
          "procedure": "security.epss-triage",
          "description": "Read FIRST's EPSS API answer for the watched CVEs and write each one's score, percentile and score date.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.epss-triage.input/v1",
            "parameters": "Contract:security.epss-triage.params/v1"
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
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.epss-triage\"}])",
            "cx.get(\"Procedure:security.epss-triage\", detail=\"proof\")"
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
        "evaluation_time": "2026-11-08T19:48:01.581954Z"
      }
    ]
  }
});

// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 466d2f9c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.kev-triage"
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
        "ref": "Procedure:security.kev-triage",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.kev-triage",
            "description": "Read the CISA KEV catalog and write each watched CVE's catalog membership, dates and ransomware use; a complete read records the unlisted ones.",
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
                "call": "catalog",
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
                  "capture": "security.kev-catalog"
                }
              },
              {
                "read": "watched",
                "query": "security.watched_vulnerabilities"
              },
              {
                "extract": "entries",
                "capture": {
                  "$ref": "step",
                  "step": "catalog",
                  "path": [
                    "capture"
                  ]
                },
                "records": "/vulnerabilities/*",
                "row": "security.kev-record@1",
                "fields": {
                  "date_added": {
                    "at": "dateAdded",
                    "parse": "date"
                  },
                  "due_date": {
                    "at": "dueDate",
                    "parse": "date",
                    "presence": "optional"
                  },
                  "listed_from": {
                    "at": "dateAdded",
                    "project": "utc_start_of_day",
                    "parse": "date"
                  },
                  "ransomware_use": {
                    "at": "knownRansomwareCampaignUse",
                    "canonicalize": "claim_type",
                    "presence": "optional"
                  }
                },
                "key": {
                  "cve_id": {
                    "at": "cveID",
                    "type": "key_part<security.vulnerability:cve_id>"
                  }
                },
                "header": {
                  "catalog_version": {
                    "at": "/catalogVersion",
                    "presence": "required"
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
                    "type": "security.vulnerability.listed_in",
                    "value": {
                      "key": {
                        "catalog_id": "cisa-kev"
                      },
                      "kind": "security.catalog"
                    },
                    "effective_from": {
                      "$ref": "item",
                      "path": [
                        "fields",
                        "listed_from"
                      ]
                    },
                    "rationale": "CISA KEV catalog {$steps.entries.header.catalog_version} lists {$item.key.cve_id}.",
                    "when_absent": "inverse"
                  },
                  {
                    "type": "security.vulnerability.kev_date_added",
                    "value": {
                      "$ref": "item",
                      "path": [
                        "fields",
                        "date_added"
                      ]
                    },
                    "rationale": "CISA KEV catalog {$steps.entries.header.catalog_version}: dateAdded {$item.fields.date_added}.",
                    "when_absent": "mirror"
                  },
                  {
                    "type": "security.vulnerability.kev_due_date",
                    "value": {
                      "$ref": "item",
                      "path": [
                        "fields",
                        "due_date"
                      ]
                    },
                    "rationale": "CISA KEV catalog {$steps.entries.header.catalog_version}: dueDate {$item.fields.due_date}.",
                    "when_absent": "mirror"
                  },
                  {
                    "type": "security.vulnerability.kev_ransomware_use",
                    "value": {
                      "$ref": "item",
                      "path": [
                        "fields",
                        "ransomware_use"
                      ]
                    },
                    "rationale": "CISA KEV catalog {$steps.entries.header.catalog_version}: knownRansomwareCampaignUse {$item.fields.ransomware_use}."
                  }
                ],
                "for_each": {
                  "$ref": "step",
                  "step": "entries",
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
                },
                "expect": {
                  "$ref": "step",
                  "step": "watched",
                  "path": [
                    "rows"
                  ]
                }
              }
            ],
            "input_contract": "security.kev-triage.input@1",
            "output_contract": "security.kev-triage.output@1",
            "parameter_contract": "security.kev-triage.params@1"
          },
          "procedure": "security.kev-triage",
          "description": "Read the CISA KEV catalog and write each watched CVE's catalog membership, dates and ransomware use; a complete read records the unlisted ones.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.kev-triage.input/v1",
            "parameters": "Contract:security.kev-triage.params/v1"
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
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.kev-triage\"}])",
            "cx.get(\"Procedure:security.kev-triage\", detail=\"proof\")"
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
        "evaluation_time": "2026-11-08T19:48:01.688850Z"
      }
    ]
  }
});

// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 5836aae7
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.epss-triage",
      "Procedure:security.kev-triage",
      "Procedure:security.osv-query",
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
        "evaluation_time": "2026-11-07T22:22:54.869876Z"
      },
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
        "evaluation_time": "2026-11-07T22:22:54.900912Z"
      },
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
                "in": {
                  "name": "osv.match.request",
                  "version": 1,
                  "digest": "sha256:af7b4623f7d4681722e0a3764152080ffbeadac82f9b643fefd1dbd76b2df8af"
                },
                "out": {
                  "name": "osv.match.result",
                  "version": 1,
                  "digest": "sha256:8dc8e9b5d54e859ff24e5110ebdb1c3c0327f4e9b13a995aae156c7e9c2858e4"
                },
                "effect": "pure"
              },
              "query": {
                "in": {
                  "name": "osv.query.request",
                  "version": 1,
                  "digest": "sha256:6f410ed449bdf9a724f7daf8df15adbd1ccff56fc45f010e6677ef3f77c0dab5"
                },
                "out": {
                  "name": "osv.query.result",
                  "version": 1,
                  "digest": "sha256:5cba02d44b4ae86b0bfb011df645080051c5399087a3714b15bc8ed240fcec6d"
                },
                "effect": "external_read"
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
                "records": "/affected/*",
                "row": "security.osv-affected@1",
                "fields": {
                  "osv_id": {
                    "at": "osv_id"
                  }
                },
                "key": {
                  "cve_id": {
                    "at": "cve_id",
                    "type": "key_part<security.vulnerability:cve_id>"
                  },
                  "purl": {
                    "at": "purl",
                    "type": "key_part<security.component:purl>"
                  }
                },
                "header": {
                  "queried": {
                    "at": "/queried",
                    "type": "list<string{max_len: 256}>{max_items: 20000}"
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
        "evaluation_time": "2026-11-07T22:22:54.925142Z"
      },
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
        "evaluation_time": "2026-11-07T22:22:54.951020Z"
      }
    ]
  }
});

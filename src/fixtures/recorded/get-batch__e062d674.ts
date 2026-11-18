// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
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
                "capability": {
                  "name": "web.fetch",
                  "version": 1
                }
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
                "records": "data",
                "key": {
                  "cve_id": {
                    "type": "key_part<security.vulnerability:cve_id>"
                  }
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
        "evaluation_time": "2026-11-08T19:47:54.430155Z"
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
                "capability": {
                  "name": "web.fetch",
                  "version": 1
                }
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
                "records": "vulnerabilities",
                "key": {
                  "cve_id": {
                    "type": "key_part<security.vulnerability:cve_id>"
                  }
                },
                "header": [
                  "catalog_version"
                ]
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
        "evaluation_time": "2026-11-08T19:47:54.476450Z"
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
        "evaluation_time": "2026-11-08T19:47:54.538090Z"
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
                "capability": {
                  "name": "sbom.components",
                  "version": 1
                }
              },
              "read": {
                "capability": {
                  "name": "workspace.file",
                  "version": 1
                }
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
                "records": "components",
                "key": {
                  "purl": {
                    "type": "key_part<security.component:purl>"
                  }
                },
                "header": [
                  "inventory"
                ]
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
        "evaluation_time": "2026-11-08T19:47:54.574029Z"
      }
    ]
  }
});

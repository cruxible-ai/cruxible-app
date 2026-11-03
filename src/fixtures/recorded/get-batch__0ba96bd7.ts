// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch c690c8df
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.epss-triage",
      "Procedure:security.kev-triage"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
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
                  "digest": "sha256:6be586f78620d23ddf517317f0d19e920946baf90aa2104a725c0b95b0ffbd30"
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
                "transform": "watch_keys",
                "kind": "shape",
                "spec": {
                  "input": {
                    "$ref": "step",
                    "step": "watched",
                    "path": [
                      "rows"
                    ]
                  },
                  "fields": {
                    "cve_id": {
                      "from": {
                        "$ref": "item",
                        "path": [
                          "fields",
                          "cve_id"
                        ]
                      }
                    }
                  }
                }
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
          "git_oid": "7f513078c490",
          "generation": 10
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "evaluation_time": "2026-11-03T02:20:47.976368Z"
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
                  "digest": "sha256:6be586f78620d23ddf517317f0d19e920946baf90aa2104a725c0b95b0ffbd30"
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
          "git_oid": "7f513078c490",
          "generation": 10
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "evaluation_time": "2026-11-03T02:20:48.004132Z"
      }
    ]
  }
});

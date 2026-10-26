// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch d5a33d07
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.asset-fetch",
      "Procedure:security.credential-acquire",
      "Procedure:security.credential-import",
      "Procedure:security.cve-applicability",
      "Procedure:security.epss-acquire",
      "Procedure:security.epss-triage",
      "Procedure:security.evidence-acquire",
      "Procedure:security.fetch",
      "Procedure:security.fetch-observed",
      "Procedure:security.harden",
      "Procedure:security.inventory-acquire",
      "Procedure:security.inventory-import",
      "Procedure:security.kev-attention",
      "Procedure:security.kev-triage",
      "Procedure:security.log-acquire",
      "Procedure:security.log-import",
      "Procedure:security.osv-applicability",
      "Procedure:security.registry-acquire",
      "Procedure:security.registry-parse",
      "Procedure:security.repo-acquire",
      "Procedure:security.repo-parse",
      "Procedure:security.reproduction-acquire",
      "Procedure:security.respond",
      "Procedure:security.sarif-acquire",
      "Procedure:security.sarif-attention",
      "Procedure:security.sarif-import",
      "Procedure:security.sbom-acquire",
      "Procedure:security.sbom-import"
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
        "ref": "Procedure:security.asset-fetch",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.asset-fetch",
            "description": "Read one GitHub release asset (input.url); retain the bytes under security.fetched-large-v1 with logical source github.release.asset.",
            "input": {
              "url": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "body_digest": "$asset.retrieved.body_sha256",
                "status": "$asset.retrieved.status_code",
                "url": "$asset.retrieved.final_url"
              }
            },
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "capture_bytes": 67108864
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "capture_bytes": 67108864,
              "items": 1
            },
            "slots": {
              "asset": "security.release-asset@1"
            },
            "steps": [
              {
                "id": "asset",
                "source": "asset",
                "contract": "security.fetched-large-v1",
                "interface": "security.release-asset/v1",
                "provider": "asset",
                "request": {
                  "url": "$input.url"
                }
              }
            ],
            "input_contract": "security.asset-fetch-input",
            "output_contract": "security-http-evidence",
            "output": {
              "body_digest": {
                "type": "string"
              },
              "status": {
                "type": "int"
              },
              "url": {
                "type": "string"
              }
            },
            "contracts": {
              "security-http-evidence": {
                "fields": {
                  "body_digest": {
                    "type": "string"
                  },
                  "status": {
                    "type": "int"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              },
              "security.asset-fetch-input": {
                "fields": {
                  "url": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.asset-fetch",
          "description": "Read one GitHub release asset (input.url); retain the bytes under security.fetched-large-v1 with logical source github.release.asset.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.asset-fetch-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.asset-fetch\").run(input=...)",
            "cx.get(\"Procedure:security.asset-fetch\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.421848Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.credential-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.credential-acquire",
            "description": "Read one credential's key state from the attached workspace (input.relative_path): {issuer, name, read: receipt|state_read, keys: [{key_id, state: active|inactive|revoked|deleted, created_at, revoked_at, last_used_at, created_by}]} and nothing else (optionally complete: true when a state_read lists every key, every page): key ids or fp: fingerprints, never a secret. Retained under security.file-erasable-v1; security.credential-import reads it when it lands. A receipt is what the issuer returned to the rotating agent; a state_read is a later, separate listing. Who acquires it is a convention the kit cannot check (the acquiring run's actor is on its ProcedureRun): let someone other than the rotator acquire it.",
            "input": {
              "relative_path": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "byte_length": "$credential.source.byte_length",
                "bytes_digest": "$credential.source.bytes_digest"
              }
            },
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 1
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "items": 1
            },
            "slots": {
              "credential": "workspace.file"
            },
            "steps": [
              {
                "id": "credential",
                "source": "credential",
                "contract": "security.file-erasable-v1",
                "interface": "workspace.file",
                "provider": "credential",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "security.credential-state",
                  "relative_path": "$input.relative_path",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              }
            ],
            "input_contract": "security-path-input",
            "output_contract": "security-file-evidence",
            "output": {
              "byte_length": {
                "type": "integer"
              },
              "bytes_digest": {
                "type": "string"
              }
            },
            "contracts": {
              "security-file-evidence": {
                "fields": {
                  "byte_length": {
                    "type": "integer"
                  },
                  "bytes_digest": {
                    "type": "string"
                  }
                }
              },
              "security-path-input": {
                "fields": {
                  "relative_path": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.credential-acquire",
          "description": "Read one credential's key state from the attached workspace (input.relative_path): {issuer, name, read: receipt|state_read, keys: [{key_id, state: active|inactive|revoked|deleted, created_at, revoked_at, last_used_at, created_by}]} and nothing else (optionally complete: true when a state_read lists every key, every page): key ids or fp: fingerprints, never a secret. Retained under security.file-erasable-v1; security.credential-import reads it when it lands. A receipt is what the issuer returned to the rotating agent; a state_read is a later, separate listing. Who acquires it is a convention the kit cannot check (the acquiring run's actor is on its ProcedureRun): let someone other than the rotator acquire it.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-path-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.credential-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.credential-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.445521Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.credential-import",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.credential-import",
            "description": "Read the credential-state Capture that triggered the Line (security.file-erasable-v1) and propose what changed: the credential's current key_id, issued_at and issued_by from a receipt or a state read; revoked_key and a rotation's verification only from a state read (verified: the rotation's revokes_key is listed revoked or deleted, or absent from a listing that says complete, and an active key was issued after the incident's window_start; failed: claimed completed while revokes_key is still listed). A body outside the allow-list, or a key id, issuer, name or principal shaped like a secret, proposes nothing and is posted (secret_shape, with a fixed message: nothing from the body is echoed). Runs as a Line with trigger_input credential.",
            "input": {},
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "credential": "$parse.credential",
                "failed": "$parse.failed",
                "keys": "$parse.keys",
                "posted": "$parse.posted",
                "read": "$parse.read",
                "revised": "$parse.revised",
                "unproven": "$parse.unproven",
                "verified": "$parse.verified"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 2
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "items": 500
            },
            "slots": {
              "credential": "workspace.file",
              "parse": "security.credential-state@1"
            },
            "steps": [
              {
                "id": "credential",
                "source": "credential",
                "contract": "security.file-erasable-v1",
                "interface": "workspace.file",
                "provider": "credential",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "security.credential-state",
                  "relative_path": "credential.json",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              },
              {
                "id": "held",
                "tap": "held",
                "query": "security.rotation_work"
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.credential-state/v1",
                "provider": "parse",
                "input": {
                  "held": "$held.result.rows",
                  "state_text": "$credential.content.text",
                  "truncated": "$held.truncated"
                }
              },
              {
                "id": "allowed",
                "guard": "parse.posted == 0",
                "refusal_code": "secret_shape",
                "message": "The body is not the credential-state allow-list.",
                "else": "post"
              },
              {
                "id": "changed",
                "guard": "parse.changed > 0",
                "refusal_code": "no_change",
                "message": "The read changes no held key state.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "propose",
                "propose": "$parse.items",
                "result": "$summary"
              },
              {
                "id": "post",
                "inbox": {
                  "items": "$parse.inbox"
                },
                "max_items": 10
              }
            ],
            "input_contract": "security-empty-input",
            "output_contract": "security-credential-state-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "credential": {
                "type": "string"
              },
              "failed": {
                "type": "integer"
              },
              "keys": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              },
              "read": {
                "type": "string"
              },
              "revised": {
                "type": "integer"
              },
              "unproven": {
                "type": "integer"
              },
              "verified": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-credential-state-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "credential": {
                    "type": "string"
                  },
                  "failed": {
                    "type": "integer"
                  },
                  "keys": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  },
                  "read": {
                    "type": "string"
                  },
                  "revised": {
                    "type": "integer"
                  },
                  "unproven": {
                    "type": "integer"
                  },
                  "verified": {
                    "type": "integer"
                  }
                }
              },
              "security-empty-input": {
                "fields": {}
              }
            },
            "halt_order": [
              "nochange"
            ]
          },
          "procedure": "security.credential-import",
          "description": "Read the credential-state Capture that triggered the Line (security.file-erasable-v1) and propose what changed: the credential's current key_id, issued_at and issued_by from a receipt or a state read; revoked_key and a rotation's verification only from a state read (verified: the rotation's revokes_key is listed revoked or deleted, or absent from a listing that says complete, and an active key was issued after the incident's window_start; failed: claimed completed while revokes_key is still listed). A body outside the allow-list, or a key id, issuer, name or principal shaped like a secret, proposes nothing and is posted (secret_shape, with a fixed message: nothing from the body is echoed). Runs as a Line with trigger_input credential.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-empty-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
              "runs_on": "line"
            },
            {
              "node_id": "post",
              "kind": "post_inbox",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.credential-import\"}])",
            "cx.get(\"Procedure:security.credential-import\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.463551Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.cve-applicability",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.cve-applicability",
            "description": "Read the CVE record Capture that triggered the Line (security.fetched-v1) and propose an assessment for every release an affected entry names by data: its collectionURL + packageName (the kit's collectionURL map, carried here) as a component's full namespace and name, its repo as the release's source repository, its CPEs, packageName or vendor/product as a product alias an analyst stated (security.release.product_alias), or its product as the release's product name (with the supplier): affected / not_affected by the record's version ranges, inconclusive when the ranges or the vendor are ambiguous; no partial match. A release OSV answered for, of a CVE OSV knows, is OSV's. States the record's title for the CVE and the products it names as affected (vulnerability.affected_product: a matched release's product, else the entry's product or packageName). Propose-only. Runs as a Line with trigger_input record.",
            "input": {},
            "returns": {
              "fields": {
                "affected": "$decide.affected",
                "changed": "$decide.changed",
                "cve_id": "$decide.cve_id",
                "inconclusive": "$decide.inconclusive",
                "judged": "$decide.judged",
                "not_affected": "$decide.not_affected",
                "unchanged": "$decide.unchanged"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 16777216,
              "items": 5000
            },
            "slots": {
              "decide": "security.cve-applicability@1",
              "record": "web.fetch@3"
            },
            "steps": [
              {
                "id": "record",
                "source": "record",
                "contract": "security.fetched-v1",
                "interface": "web.fetch/v3",
                "provider": "record",
                "request": {
                  "expected_format": "json",
                  "extract": false,
                  "logical_source": "cve.record",
                  "max_bytes": 1048576,
                  "render": false,
                  "url": "https://cveawg.mitre.org/api/cve/"
                }
              },
              {
                "id": "releases",
                "tap": "releases",
                "query": "security.release_inventory"
              },
              {
                "id": "sources",
                "tap": "sources",
                "query": "security.release_sources"
              },
              {
                "id": "watched",
                "tap": "watched",
                "query": "security.watched_vulnerabilities"
              },
              {
                "id": "assessments",
                "tap": "assessments",
                "query": "security.assessment_index"
              },
              {
                "id": "decide",
                "call": "decide",
                "interface": "security.cve-applicability/v1",
                "provider": "decide",
                "input": {
                  "assessments": "$assessments.result.rows",
                  "collections": {
                    "collections": {
                      "https://anaconda.org": {
                        "type": "conda"
                      },
                      "https://bitbucket.org": {
                        "repository": true,
                        "type": "bitbucket"
                      },
                      "https://brew.sh": {
                        "type": "brew"
                      },
                      "https://cocoapods.org": {
                        "type": "cocoapods"
                      },
                      "https://cran.r-project.org/web/packages": {
                        "type": "cran"
                      },
                      "https://crates.io": {
                        "type": "cargo"
                      },
                      "https://formulae.brew.sh": {
                        "type": "brew"
                      },
                      "https://github.com": {
                        "repository": true,
                        "type": "github"
                      },
                      "https://gitlab.com": {
                        "repository": true,
                        "type": "gitlab"
                      },
                      "https://golang.org/pkg": {
                        "type": "golang"
                      },
                      "https://hackage.haskell.org": {
                        "type": "hackage"
                      },
                      "https://hex.pm": {
                        "type": "hex"
                      },
                      "https://hub.docker.com": {
                        "type": "docker"
                      },
                      "https://luarocks.org": {
                        "type": "luarocks"
                      },
                      "https://nuget.org/packages": {
                        "type": "nuget"
                      },
                      "https://packages.debian.org": {
                        "namespace": "debian",
                        "type": "deb"
                      },
                      "https://packages.ubuntu.com": {
                        "namespace": "ubuntu",
                        "type": "deb"
                      },
                      "https://packagist.org": {
                        "type": "composer"
                      },
                      "https://pkg.go.dev": {
                        "type": "golang"
                      },
                      "https://proxy.golang.org": {
                        "type": "golang"
                      },
                      "https://pub.dev/packages": {
                        "type": "pub"
                      },
                      "https://pypi.org": {
                        "type": "pypi"
                      },
                      "https://pypi.python.org": {
                        "type": "pypi"
                      },
                      "https://registry.npmjs.org": {
                        "type": "npm"
                      },
                      "https://repo.maven.apache.org/maven2": {
                        "name_separator": ":",
                        "type": "maven"
                      },
                      "https://repo1.maven.org/maven2": {
                        "name_separator": ":",
                        "type": "maven"
                      },
                      "https://rubygems.org": {
                        "type": "gem"
                      },
                      "https://www.npmjs.com": {
                        "type": "npm"
                      },
                      "https://www.nuget.org/packages": {
                        "type": "nuget"
                      }
                    },
                    "sources": [
                      "https://cveproject.github.io/cve-schema/schema/docs/ (CVE JSON 5.1: affected[].collectionURL, packageName, repo, cpes; the collectionURL examples)",
                      "https://github.com/package-url/purl-spec/blob/main/PURL-TYPES.rst (purl types, their namespaces and name forms)"
                    ]
                  },
                  "record_base64": "$record.retrieved.body_base64",
                  "releases": "$releases.result.rows",
                  "sources": "$sources.result.rows",
                  "watched": "$watched.result.rows"
                }
              },
              {
                "id": "changed",
                "guard": "decide.changed > 0",
                "refusal_code": "no_change",
                "message": "The CVE record changes no assessment.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "propose",
                "propose": "$decide.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-empty-input",
            "output_contract": "security-cve-applicability-summary",
            "output": {
              "affected": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "cve_id": {
                "type": "string"
              },
              "inconclusive": {
                "type": "integer"
              },
              "judged": {
                "type": "integer"
              },
              "not_affected": {
                "type": "integer"
              },
              "unchanged": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-cve-applicability-summary": {
                "fields": {
                  "affected": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "cve_id": {
                    "type": "string"
                  },
                  "inconclusive": {
                    "type": "integer"
                  },
                  "judged": {
                    "type": "integer"
                  },
                  "not_affected": {
                    "type": "integer"
                  },
                  "unchanged": {
                    "type": "integer"
                  }
                }
              },
              "security-empty-input": {
                "fields": {}
              }
            },
            "halt_order": [
              "nochange"
            ]
          },
          "procedure": "security.cve-applicability",
          "description": "Read the CVE record Capture that triggered the Line (security.fetched-v1) and propose an assessment for every release an affected entry names by data: its collectionURL + packageName (the kit's collectionURL map, carried here) as a component's full namespace and name, its repo as the release's source repository, its CPEs, packageName or vendor/product as a product alias an analyst stated (security.release.product_alias), or its product as the release's product name (with the supplier): affected / not_affected by the record's version ranges, inconclusive when the ranges or the vendor are ambiguous; no partial match. A release OSV answered for, of a CVE OSV knows, is OSV's. States the record's title for the CVE and the products it names as affected (vulnerability.affected_product: a matched release's product, else the entry's product or packageName). Propose-only. Runs as a Line with trigger_input record.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-empty-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.cve-applicability\"}])",
            "cx.get(\"Procedure:security.cve-applicability\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.483540Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.epss-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.epss-acquire",
            "description": "Fetch FIRST's current EPSS daily scores and emit their retained summary; security.epss-triage reads the first.epss.daily landing.",
            "input": {},
            "returns": {
              "fields": {
                "body_digest": "$epss.retrieved.body_sha256",
                "status": "$epss.retrieved.status_code",
                "url": "$epss.retrieved.final_url"
              }
            },
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "capture_bytes": 33554432
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "capture_bytes": 33554432,
              "items": 1
            },
            "slots": {
              "epss": "security.epss-daily@1"
            },
            "steps": [
              {
                "id": "epss",
                "source": "epss",
                "contract": "security.fetched-v1",
                "interface": "security.epss-daily/v1",
                "provider": "epss",
                "request": {}
              },
              {
                "id": "step_2",
                "emit": "security.observation-output-v1",
                "input": "$summary",
                "result": "$summary"
              }
            ],
            "input_contract": "security.epss-acquire-input",
            "output_contract": "security-http-evidence",
            "output": {
              "body_digest": {
                "type": "string"
              },
              "status": {
                "type": "int"
              },
              "url": {
                "type": "string"
              }
            },
            "contracts": {
              "security-http-evidence": {
                "fields": {
                  "body_digest": {
                    "type": "string"
                  },
                  "status": {
                    "type": "int"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              },
              "security.epss-acquire-input": {
                "fields": {}
              }
            }
          },
          "procedure": "security.epss-acquire",
          "description": "Fetch FIRST's current EPSS daily scores and emit their retained summary; security.epss-triage reads the first.epss.daily landing.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.epss-acquire-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "step_2",
              "kind": "emit_capture",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.epss-acquire\"}])",
            "cx.get(\"Procedure:security.epss-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.503353Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.epss-triage",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.epss-triage",
            "description": "Read the EPSS daily file Capture that triggered the Line (security.fetched-v1) and the watched vulnerabilities, and settle epss_score and epss_percentile for each watched CVE whose scores changed, exactly as the file states them (or propose them under a propose cap). Halts no_change when nothing changed. Runs as a Line with trigger_input epss.",
            "input": {},
            "returns": {
              "fields": {
                "changed": "$parse.changed",
                "model_version": "$parse.model_version",
                "score_date": "$parse.score_date",
                "scored": "$parse.scored",
                "watched": "$parse.watched"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 33554432
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 33554432,
              "items": 5000
            },
            "slots": {
              "epss": "security.epss-daily@1",
              "parse": "security.epss-scores@1"
            },
            "steps": [
              {
                "id": "epss",
                "source": "epss",
                "contract": "security.fetched-v1",
                "interface": "security.epss-daily/v1",
                "provider": "epss",
                "request": {}
              },
              {
                "id": "watched",
                "tap": "watched",
                "query": "security.watched_vulnerabilities"
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.epss-scores/v1",
                "provider": "parse",
                "input": {
                  "daily_base64": "$epss.retrieved.body_base64",
                  "watched": "$watched.result.rows"
                }
              },
              {
                "id": "changed",
                "guard": "parse.changed > 0",
                "refusal_code": "no_change",
                "message": "The EPSS file changes no watched Claim.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "settle",
                "settle": "$parse.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-empty-input",
            "output_contract": "security-epss-summary",
            "output": {
              "changed": {
                "type": "integer"
              },
              "model_version": {
                "type": "string"
              },
              "score_date": {
                "type": "string"
              },
              "scored": {
                "type": "integer"
              },
              "watched": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-empty-input": {
                "fields": {}
              },
              "security-epss-summary": {
                "fields": {
                  "changed": {
                    "type": "integer"
                  },
                  "model_version": {
                    "type": "string"
                  },
                  "score_date": {
                    "type": "string"
                  },
                  "scored": {
                    "type": "integer"
                  },
                  "watched": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "nochange"
            ]
          },
          "procedure": "security.epss-triage",
          "description": "Read the EPSS daily file Capture that triggered the Line (security.fetched-v1) and the watched vulnerabilities, and settle epss_score and epss_percentile for each watched CVE whose scores changed, exactly as the file states them (or propose them under a propose cap). Halts no_change when nothing changed. Runs as a Line with trigger_input epss.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-empty-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "settle",
              "kind": "settle_change_set",
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
        "evaluation_time": "2026-10-26T19:05:01.518723Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.evidence-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.evidence-acquire",
            "description": "Read one workspace file an analyst cites for a judgment (input.relative_path: code, a config, an analysis note) and retain it under security.file-v1; cite the Capture with `cruxible set ... --capture CAP-...`. At most 1 MiB (the built-in workspace.file's limit).",
            "input": {
              "relative_path": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "byte_length": "$evidence.source.byte_length",
                "bytes_digest": "$evidence.source.bytes_digest"
              }
            },
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 1
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "items": 1
            },
            "slots": {
              "evidence": "workspace.file"
            },
            "steps": [
              {
                "id": "evidence",
                "source": "evidence",
                "contract": "security.file-v1",
                "interface": "workspace.file",
                "provider": "evidence",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "security.analysis.evidence",
                  "relative_path": "$input.relative_path",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              }
            ],
            "input_contract": "security-path-input",
            "output_contract": "security-file-evidence",
            "output": {
              "byte_length": {
                "type": "integer"
              },
              "bytes_digest": {
                "type": "string"
              }
            },
            "contracts": {
              "security-file-evidence": {
                "fields": {
                  "byte_length": {
                    "type": "integer"
                  },
                  "bytes_digest": {
                    "type": "string"
                  }
                }
              },
              "security-path-input": {
                "fields": {
                  "relative_path": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.evidence-acquire",
          "description": "Read one workspace file an analyst cites for a judgment (input.relative_path: code, a config, an analysis note) and retain it under security.file-v1; cite the Capture with `cruxible set ... --capture CAP-...`. At most 1 MiB (the built-in workspace.file's limit).",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-path-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.evidence-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.evidence-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.535304Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.fetch",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.fetch",
            "description": "Fetch one HTTP JSON response with the supplied URL, logical source and byte limit; retain it under security.fetched-v1. Direct runs bind the single fitting web.fetch build.",
            "input": {
              "logical_source": {
                "type": "string",
                "enum": [
                  "cve.record",
                  "github.api",
                  "github.release"
                ]
              },
              "max_bytes": {
                "type": "integer"
              },
              "url": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "body_digest": "$fetch.retrieved.body_sha256",
                "status": "$fetch.retrieved.status_code",
                "url": "$fetch.retrieved.final_url"
              }
            },
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "capture_bytes": 16777216,
              "items": 1
            },
            "slots": {
              "fetch": "web.fetch@3"
            },
            "steps": [
              {
                "id": "fetch",
                "source": "fetch",
                "contract": "security.fetched-v1",
                "interface": "web.fetch/v3",
                "provider": "fetch",
                "request": {
                  "expected_format": "json",
                  "extract": false,
                  "logical_source": "$input.logical_source",
                  "max_bytes": "$input.max_bytes",
                  "render": false,
                  "url": "$input.url"
                }
              }
            ],
            "input_contract": "security.fetch-input",
            "output_contract": "security-http-evidence",
            "output": {
              "body_digest": {
                "type": "string"
              },
              "status": {
                "type": "int"
              },
              "url": {
                "type": "string"
              }
            },
            "contracts": {
              "security-http-evidence": {
                "fields": {
                  "body_digest": {
                    "type": "string"
                  },
                  "status": {
                    "type": "int"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              },
              "security.fetch-input": {
                "fields": {
                  "logical_source": {
                    "type": "string",
                    "enum": [
                      "cve.record",
                      "github.api",
                      "github.release"
                    ]
                  },
                  "max_bytes": {
                    "type": "integer"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.fetch",
          "description": "Fetch one HTTP JSON response with the supplied URL, logical source and byte limit; retain it under security.fetched-v1. Direct runs bind the single fitting web.fetch build.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.fetch-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.fetch\").run(input=...)",
            "cx.get(\"Procedure:security.fetch\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.550537Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.fetch-observed",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.fetch-observed",
            "description": "Fetch one HTTP JSON response with the supplied URL, logical source and byte limit; retain it under security.fetched-v1. Emit the summary as run evidence; runs as a Line.",
            "input": {
              "logical_source": {
                "type": "string"
              },
              "max_bytes": {
                "type": "integer"
              },
              "url": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "body_digest": "$fetch.retrieved.body_sha256",
                "status": "$fetch.retrieved.status_code",
                "url": "$fetch.retrieved.final_url"
              }
            },
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 1,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "capture_bytes": 16777216,
              "items": 1
            },
            "slots": {
              "fetch": "web.fetch@3"
            },
            "steps": [
              {
                "id": "fetch",
                "source": "fetch",
                "contract": "security.fetched-v1",
                "interface": "web.fetch/v3",
                "provider": "fetch",
                "request": {
                  "expected_format": "json",
                  "extract": false,
                  "logical_source": "$input.logical_source",
                  "max_bytes": "$input.max_bytes",
                  "render": false,
                  "url": "$input.url"
                }
              },
              {
                "id": "step_2",
                "emit": "security.observation-output-v1",
                "input": "$summary",
                "result": "$summary"
              }
            ],
            "input_contract": "security.fetch-observed-input",
            "output_contract": "security-http-evidence",
            "output": {
              "body_digest": {
                "type": "string"
              },
              "status": {
                "type": "int"
              },
              "url": {
                "type": "string"
              }
            },
            "contracts": {
              "security-http-evidence": {
                "fields": {
                  "body_digest": {
                    "type": "string"
                  },
                  "status": {
                    "type": "int"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              },
              "security.fetch-observed-input": {
                "fields": {
                  "logical_source": {
                    "type": "string"
                  },
                  "max_bytes": {
                    "type": "integer"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.fetch-observed",
          "description": "Fetch one HTTP JSON response with the supplied URL, logical source and byte limit; retain it under security.fetched-v1. Emit the summary as run evidence; runs as a Line.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.fetch-observed-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "step_2",
              "kind": "emit_capture",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.fetch-observed\"}])",
            "cx.get(\"Procedure:security.fetch-observed\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.566526Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.harden",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.harden",
            "description": "Ask the six hardening questions (HQ1-HQ6) about every gated target (a target with a security.target.publish_gate) and answer each in three states: found (posted as a finding), none (a current coverage answers it; run summary only) or unknown (posted as one gap item per source, naming the pull: {source, pull, input}). HQ6 (an open confirmed code finding in a release the target serves) is found or not recorded, never none. Observe-only. Runs as a Line (parameters: default_ref, repo_pull, registry_pull, release_pull, versions): daily, on a pull landing, or line run.",
            "input": {
              "default_ref": {
                "type": "string"
              },
              "registry_pull": {
                "type": "string"
              },
              "release_pull": {
                "type": "string"
              },
              "repo_pull": {
                "type": "string"
              },
              "versions": {
                "type": "integer"
              }
            },
            "returns": {
              "fields": {
                "answers": "$classify.answers",
                "found": "$classify.found",
                "gaps": "$classify.gaps",
                "none": "$classify.none",
                "posted": "$classify.posted",
                "targets": "$classify.targets",
                "unknown": "$classify.unknown"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 1
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "items": 200
            },
            "slots": {
              "classify": "security.harden@1"
            },
            "steps": [
              {
                "id": "hq1",
                "tap": "hq1",
                "query": "security.publish_paths"
              },
              {
                "id": "hq2",
                "tap": "hq2",
                "query": "security.credentialed_jobs"
              },
              {
                "id": "hq3",
                "tap": "hq3",
                "query": "security.mutable_actions"
              },
              {
                "id": "hq4",
                "tap": "hq4",
                "query": "security.shared_dependencies"
              },
              {
                "id": "hq5",
                "tap": "hq5",
                "query": "security.served_vs_declared"
              },
              {
                "id": "hq6",
                "tap": "hq6",
                "query": "security.published_findings"
              },
              {
                "id": "classify",
                "call": "classify",
                "interface": "security.harden/v1",
                "provider": "classify",
                "input": {
                  "hq1": "$hq1.result.rows",
                  "hq2": "$hq2.result.rows",
                  "hq3": "$hq3.result.rows",
                  "hq4": "$hq4.result.rows",
                  "hq5": "$hq5.result.rows",
                  "hq6": "$hq6.result.rows",
                  "params": "$input",
                  "truncated": {
                    "hq1": "$hq1.truncated",
                    "hq2": "$hq2.truncated",
                    "hq3": "$hq3.truncated",
                    "hq4": "$hq4.truncated",
                    "hq5": "$hq5.truncated",
                    "hq6": "$hq6.truncated"
                  }
                }
              },
              {
                "id": "posted",
                "guard": "classify.posted > 0",
                "refusal_code": "nothing_to_post",
                "message": "Every hardening answer is none: nothing to post.",
                "else_id": "quiet",
                "else": "halt(nothing_to_post)"
              },
              {
                "id": "post",
                "inbox": {
                  "items": "$classify.items"
                },
                "max_items": 200
              }
            ],
            "input_contract": "security-harden-input",
            "output_contract": "security-harden-summary",
            "output": {
              "answers": {
                "type": "json"
              },
              "found": {
                "type": "integer"
              },
              "gaps": {
                "type": "integer"
              },
              "none": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              },
              "targets": {
                "type": "integer"
              },
              "unknown": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-harden-input": {
                "fields": {
                  "default_ref": {
                    "type": "string"
                  },
                  "registry_pull": {
                    "type": "string"
                  },
                  "release_pull": {
                    "type": "string"
                  },
                  "repo_pull": {
                    "type": "string"
                  },
                  "versions": {
                    "type": "integer"
                  }
                }
              },
              "security-harden-summary": {
                "fields": {
                  "answers": {
                    "type": "json"
                  },
                  "found": {
                    "type": "integer"
                  },
                  "gaps": {
                    "type": "integer"
                  },
                  "none": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  },
                  "targets": {
                    "type": "integer"
                  },
                  "unknown": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "quiet"
            ]
          },
          "procedure": "security.harden",
          "description": "Ask the six hardening questions (HQ1-HQ6) about every gated target (a target with a security.target.publish_gate) and answer each in three states: found (posted as a finding), none (a current coverage answers it; run summary only) or unknown (posted as one gap item per source, naming the pull: {source, pull, input}). HQ6 (an open confirmed code finding in a release the target serves) is found or not recorded, never none. Observe-only. Runs as a Line (parameters: default_ref, repo_pull, registry_pull, release_pull, versions): daily, on a pull landing, or line run.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-harden-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "post",
              "kind": "post_inbox",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.harden\"}])",
            "cx.get(\"Procedure:security.harden\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.581464Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.inventory-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.inventory-acquire",
            "description": "Read one runtime-inventory scan from the attached workspace (input.relative_path, at most 1 MiB) and retain it under security.file-erasable-v1; the scope's security.inventory-import Line reads it when it lands. Either the kit's tool-neutral body {scope, looked_for, coverage: full|partial, assets: [{hostname, runs: [purl@version]}]} with no timestamps (an unchanged fleet is the same bytes), or a CycloneDX JSON SBOM of one asset (Syft, Trivy) annotated with metadata properties cruxible.scope and cruxible.asset.",
            "input": {
              "relative_path": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "byte_length": "$inventory.source.byte_length",
                "bytes_digest": "$inventory.source.bytes_digest"
              }
            },
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 1
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "items": 1
            },
            "slots": {
              "inventory": "workspace.file"
            },
            "steps": [
              {
                "id": "inventory",
                "source": "inventory",
                "contract": "security.file-erasable-v1",
                "interface": "workspace.file",
                "provider": "inventory",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "security.inventory",
                  "relative_path": "$input.relative_path",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              }
            ],
            "input_contract": "security-path-input",
            "output_contract": "security-file-evidence",
            "output": {
              "byte_length": {
                "type": "integer"
              },
              "bytes_digest": {
                "type": "string"
              }
            },
            "contracts": {
              "security-file-evidence": {
                "fields": {
                  "byte_length": {
                    "type": "integer"
                  },
                  "bytes_digest": {
                    "type": "string"
                  }
                }
              },
              "security-path-input": {
                "fields": {
                  "relative_path": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.inventory-acquire",
          "description": "Read one runtime-inventory scan from the attached workspace (input.relative_path, at most 1 MiB) and retain it under security.file-erasable-v1; the scope's security.inventory-import Line reads it when it lands. Either the kit's tool-neutral body {scope, looked_for, coverage: full|partial, assets: [{hostname, runs: [purl@version]}]} with no timestamps (an unchanged fleet is the same bytes), or a CycloneDX JSON SBOM of one asset (Syft, Trivy) annotated with metadata properties cruxible.scope and cruxible.asset.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-path-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.inventory-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.inventory-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.598731Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.inventory-import",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.inventory-import",
            "description": "Read the runtime-inventory Capture that triggered the Line (security.file-erasable-v1) for the Line's scope (parameter scope) and propose what changed: each asset by key and asset.scanned_in the scope's coverage, each release it runs (by product name, the purl's whole namespace and name, and version, with its purl as release.component) as asset.runs; a full scan retires runs it no longer sees (of the products it looked for) and restates the coverage revision (an unchanged scan re-observes it: freshness moves, nothing is proposed). A complete read states each asset's nones (asset.runs inverses): every product it named in looked_for that the asset does not run, and under * every product the asset ran before and no longer does (the run retires in the same change: a flip) or declares installing and does not run; a held none is restated (refreshed), retired when the product runs again or the scan no longer looks for it. For each open patch of a scanned asset: verification verified when a full scan shows the affected release no longer running, failed when it is claimed completed and a scan still shows it. A CycloneDX SBOM of one asset (metadata properties cruxible.scope, cruxible.asset) reads as that asset's complete run set, never as the scope's coverage, and only while every component is identified (a purl with a version, an OS component too): one that isn't could be any product, so the SBOM then only adds (unidentified counts them). Two ecosystems' packages of one name and version are one release with both purls as components. Halts other_scope for another scope's scan, no_change when nothing changed. Runs as a Line with trigger_input inventory.",
            "input": {
              "scope": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "added": "$parse.added",
                "assets": "$parse.assets",
                "changed": "$parse.changed",
                "coverage": "$parse.coverage",
                "failed": "$parse.failed",
                "format": "$parse.format",
                "mine": "$parse.mine",
                "nones": "$parse.nones",
                "osv_not_indexed": "$parse.osv_not_indexed",
                "osv_unindexed": "$parse.osv_unindexed",
                "proposes": "$parse.proposes",
                "regressions": "$parse.regressions",
                "restated": "$parse.restated",
                "retired": "$parse.retired",
                "revised": "$parse.revised",
                "revision": "$parse.revision",
                "runs": "$parse.runs",
                "scope": "$parse.scope",
                "unidentified": "$parse.unidentified",
                "verified": "$parse.verified"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "items": 5000
            },
            "slots": {
              "inventory": "workspace.file",
              "parse": "security.runtime-inventory@1"
            },
            "steps": [
              {
                "id": "inventory",
                "source": "inventory",
                "contract": "security.file-erasable-v1",
                "interface": "workspace.file",
                "provider": "inventory",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "security.inventory",
                  "relative_path": "inventory.json",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              },
              {
                "id": "held",
                "tap": "held",
                "query": "security.inventory_index",
                "params": {
                  "scope": "$input.scope"
                }
              },
              {
                "id": "runs",
                "tap": "runs",
                "query": "security.inventory_runs",
                "params": {
                  "scope": "$input.scope"
                }
              },
              {
                "id": "patches",
                "tap": "patches",
                "query": "security.inventory_patches",
                "params": {
                  "scope": "$input.scope"
                }
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.runtime-inventory/v1",
                "provider": "parse",
                "input": {
                  "held": "$held.result.rows",
                  "inventory_text": "$inventory.content.text",
                  "osv_ecosystems": {
                    "apk/alpine": "Alpine",
                    "apk/chainguard": "Chainguard",
                    "apk/wolfi": "Wolfi",
                    "bitnami": "Bitnami",
                    "cargo": "crates.io",
                    "composer": "Packagist",
                    "conan": "ConanCenter",
                    "cran": "CRAN",
                    "deb/debian": "Debian",
                    "deb/ubuntu": "Ubuntu",
                    "gem": "RubyGems",
                    "githubactions": "GitHub Actions",
                    "golang": "Go",
                    "hackage": "Hackage",
                    "hex": "Hex",
                    "maven": "Maven",
                    "npm": "npm",
                    "nuget": "NuGet",
                    "pub": "Pub",
                    "pypi": "PyPI",
                    "rpm/almalinux": "AlmaLinux",
                    "rpm/mageia": "Mageia",
                    "rpm/openeuler": "openEuler",
                    "rpm/opensuse": "openSUSE",
                    "rpm/redhat": "Red Hat",
                    "rpm/rocky-linux": "Rocky Linux",
                    "rpm/suse": "SUSE",
                    "swift": "SwiftURL"
                  },
                  "patches": "$patches.result.rows",
                  "runs": "$runs.result.rows",
                  "scope": "$input.scope",
                  "truncated": {
                    "held": "$held.truncated",
                    "patches": "$patches.truncated",
                    "runs": "$runs.truncated"
                  }
                }
              },
              {
                "id": "mine",
                "guard": "parse.mine > 0",
                "refusal_code": "other_scope",
                "message": "The landed inventory is another scope's.",
                "else_id": "other",
                "else": "halt(other_scope)"
              },
              {
                "id": "changed",
                "guard": "parse.proposes > 0",
                "refusal_code": "no_change",
                "message": "The scan changes nothing inventory holds.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "propose",
                "propose": "$parse.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-inventory-import-input",
            "output_contract": "security-runtime-inventory-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "assets": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "coverage": {
                "type": "string"
              },
              "failed": {
                "type": "integer"
              },
              "format": {
                "type": "string"
              },
              "mine": {
                "type": "integer"
              },
              "nones": {
                "type": "integer"
              },
              "osv_not_indexed": {
                "type": "json"
              },
              "osv_unindexed": {
                "type": "integer"
              },
              "proposes": {
                "type": "integer"
              },
              "regressions": {
                "type": "json"
              },
              "restated": {
                "type": "integer"
              },
              "retired": {
                "type": "integer"
              },
              "revised": {
                "type": "integer"
              },
              "revision": {
                "type": "string"
              },
              "runs": {
                "type": "integer"
              },
              "scope": {
                "type": "string"
              },
              "unidentified": {
                "type": "integer"
              },
              "verified": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-inventory-import-input": {
                "fields": {
                  "scope": {
                    "type": "string"
                  }
                }
              },
              "security-runtime-inventory-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "assets": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "coverage": {
                    "type": "string"
                  },
                  "failed": {
                    "type": "integer"
                  },
                  "format": {
                    "type": "string"
                  },
                  "mine": {
                    "type": "integer"
                  },
                  "nones": {
                    "type": "integer"
                  },
                  "osv_not_indexed": {
                    "type": "json"
                  },
                  "osv_unindexed": {
                    "type": "integer"
                  },
                  "proposes": {
                    "type": "integer"
                  },
                  "regressions": {
                    "type": "json"
                  },
                  "restated": {
                    "type": "integer"
                  },
                  "retired": {
                    "type": "integer"
                  },
                  "revised": {
                    "type": "integer"
                  },
                  "revision": {
                    "type": "string"
                  },
                  "runs": {
                    "type": "integer"
                  },
                  "scope": {
                    "type": "string"
                  },
                  "unidentified": {
                    "type": "integer"
                  },
                  "verified": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "nochange",
              "other"
            ]
          },
          "procedure": "security.inventory-import",
          "description": "Read the runtime-inventory Capture that triggered the Line (security.file-erasable-v1) for the Line's scope (parameter scope) and propose what changed: each asset by key and asset.scanned_in the scope's coverage, each release it runs (by product name, the purl's whole namespace and name, and version, with its purl as release.component) as asset.runs; a full scan retires runs it no longer sees (of the products it looked for) and restates the coverage revision (an unchanged scan re-observes it: freshness moves, nothing is proposed). A complete read states each asset's nones (asset.runs inverses): every product it named in looked_for that the asset does not run, and under * every product the asset ran before and no longer does (the run retires in the same change: a flip) or declares installing and does not run; a held none is restated (refreshed), retired when the product runs again or the scan no longer looks for it. For each open patch of a scanned asset: verification verified when a full scan shows the affected release no longer running, failed when it is claimed completed and a scan still shows it. A CycloneDX SBOM of one asset (metadata properties cruxible.scope, cruxible.asset) reads as that asset's complete run set, never as the scope's coverage, and only while every component is identified (a purl with a version, an OS component too): one that isn't could be any product, so the SBOM then only adds (unidentified counts them). Two ecosystems' packages of one name and version are one release with both purls as components. Halts other_scope for another scope's scan, no_change when nothing changed. Runs as a Line with trigger_input inventory.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-inventory-import-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.inventory-import\"}])",
            "cx.get(\"Procedure:security.inventory-import\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.612907Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.kev-attention",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.kev-attention",
            "description": "Read the KEV catalog Capture that triggered the Line and post one inbox item per CVE added in the catalog's last 7 days whose vendor/product matches a release in inventory that nobody watches the CVE for or nobody has assessed: possibly exposed, nobody has looked. Never changes accepted state. Runs as a Line with trigger_input catalog.",
            "input": {},
            "returns": {
              "fields": {
                "catalog_version": "$match.catalog_version",
                "newly_listed": "$match.newly_listed",
                "posted": "$match.posted"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 16777216,
              "items": 1000
            },
            "slots": {
              "catalog": "web.fetch@3",
              "match": "security.kev-attention@1"
            },
            "steps": [
              {
                "id": "catalog",
                "source": "catalog",
                "contract": "security.fetched-v1",
                "interface": "web.fetch/v3",
                "provider": "catalog",
                "request": {
                  "expected_format": "json",
                  "extract": false,
                  "logical_source": "cisa.kev.catalog",
                  "max_bytes": 4194304,
                  "render": false,
                  "url": "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
                }
              },
              {
                "id": "releases",
                "tap": "releases",
                "query": "security.release_inventory"
              },
              {
                "id": "watched",
                "tap": "watched",
                "query": "security.watched_vulnerabilities"
              },
              {
                "id": "assessments",
                "tap": "assessments",
                "query": "security.assessment_index"
              },
              {
                "id": "match",
                "call": "match",
                "interface": "security.kev-attention/v1",
                "provider": "match",
                "input": {
                  "assessments": "$assessments.result.rows",
                  "catalog_base64": "$catalog.retrieved.body_base64",
                  "releases": "$releases.result.rows",
                  "watched": "$watched.result.rows"
                }
              },
              {
                "id": "posted",
                "guard": "match.posted > 0",
                "refusal_code": "nothing_to_post",
                "message": "No newly listed CVE matches unwatched or unassessed inventory.",
                "else_id": "quiet",
                "else": "halt(nothing_to_post)"
              },
              {
                "id": "post",
                "inbox": {
                  "items": "$match.items"
                },
                "max_items": 1000
              }
            ],
            "input_contract": "security-empty-input",
            "output_contract": "security-kev-attention-summary",
            "output": {
              "catalog_version": {
                "type": "string"
              },
              "newly_listed": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-empty-input": {
                "fields": {}
              },
              "security-kev-attention-summary": {
                "fields": {
                  "catalog_version": {
                    "type": "string"
                  },
                  "newly_listed": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "quiet"
            ]
          },
          "procedure": "security.kev-attention",
          "description": "Read the KEV catalog Capture that triggered the Line and post one inbox item per CVE added in the catalog's last 7 days whose vendor/product matches a release in inventory that nobody watches the CVE for or nobody has assessed: possibly exposed, nobody has looked. Never changes accepted state. Runs as a Line with trigger_input catalog.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-empty-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "post",
              "kind": "post_inbox",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.kev-attention\"}])",
            "cx.get(\"Procedure:security.kev-attention\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.636565Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.kev-triage",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.kev-triage",
            "description": "Read the KEV catalog Capture that triggered the Line (security.fetched-v1) and the watched vulnerabilities, and settle one observation Claim per KEV field that changed (kev_listed, kev_date_added, kev_due_date, kev_ransomware_use) under a settle mandate, or propose it under a propose cap. Halts no_change when nothing changed. Runs as a Line with trigger_input catalog.",
            "input": {},
            "returns": {
              "fields": {
                "catalog_version": "$parse.catalog_version",
                "changed": "$parse.changed",
                "listed": "$parse.listed",
                "watched": "$parse.watched"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 16777216,
              "items": 5000
            },
            "slots": {
              "catalog": "web.fetch@3",
              "parse": "security.kev-catalog@2"
            },
            "steps": [
              {
                "id": "catalog",
                "source": "catalog",
                "contract": "security.fetched-v1",
                "interface": "web.fetch/v3",
                "provider": "catalog",
                "request": {
                  "expected_format": "json",
                  "extract": false,
                  "logical_source": "cisa.kev.catalog",
                  "max_bytes": 4194304,
                  "render": false,
                  "url": "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
                }
              },
              {
                "id": "watched",
                "tap": "watched",
                "query": "security.watched_vulnerabilities"
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.kev-catalog/v2",
                "provider": "parse",
                "input": {
                  "catalog_base64": "$catalog.retrieved.body_base64",
                  "watched": "$watched.result.rows"
                }
              },
              {
                "id": "changed",
                "guard": "parse.changed > 0",
                "refusal_code": "no_change",
                "message": "The catalog changes no watched Claim.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "settle",
                "settle": "$parse.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-empty-input",
            "output_contract": "security-kev-triage-summary",
            "output": {
              "catalog_version": {
                "type": "string"
              },
              "changed": {
                "type": "integer"
              },
              "listed": {
                "type": "integer"
              },
              "watched": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-empty-input": {
                "fields": {}
              },
              "security-kev-triage-summary": {
                "fields": {
                  "catalog_version": {
                    "type": "string"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "listed": {
                    "type": "integer"
                  },
                  "watched": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "nochange"
            ],
            "measurements": [
              {
                "tag": "playbill-procedure-measurement-declaration-v1",
                "name": "kev-backlog-cleared",
                "subject_grain": "procedure_unit",
                "measurement": {
                  "tag": "playbill-procedure-accepted-query-measurement-v1",
                  "kind": "accepted_query",
                  "query": {
                    "role": "query",
                    "target": {
                      "kind": "QueryDefinition",
                      "name": "security.kev_triage_backlog"
                    },
                    "artifact_digest": "sha256:2bb6593d47adbe43240fcb12dc0ba27f1032834f209587a0603150baa04249a5"
                  },
                  "expect": {
                    "tag": "playbill-procedure-measurement-expectation-v1",
                    "max_count": 0
                  }
                },
                "check_after": {
                  "tag": "playbill-duration-v1",
                  "microseconds": 259200000000
                },
                "expires_after": {
                  "tag": "playbill-duration-v1",
                  "microseconds": 864000000000
                },
                "review_when": [
                  {
                    "tag": "playbill-procedure-measurement-review-trigger-v1",
                    "name": "satisfied-rate-low",
                    "metric": "satisfied_rate",
                    "operator": "lt",
                    "threshold": {
                      "$decimal": "0.8"
                    },
                    "min_readings": 5
                  }
                ]
              }
            ]
          },
          "measurement_reviews": [
            {
              "measurement_name": "kev-backlog-cleared",
              "contract_id": "RSC-f238e760f259d752ee66d803b70bb47d",
              "latest_resolution_id": null,
              "standing_resolution_id": null,
              "unavailable": false,
              "last_disposition": null,
              "history": [],
              "history_total": 0,
              "history_truncated": false
            }
          ],
          "procedure": "security.kev-triage",
          "description": "Read the KEV catalog Capture that triggered the Line (security.fetched-v1) and the watched vulnerabilities, and settle one observation Claim per KEV field that changed (kev_listed, kev_date_added, kev_due_date, kev_ransomware_use) under a settle mandate, or propose it under a propose cap. Halts no_change when nothing changed. Runs as a Line with trigger_input catalog.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-empty-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "settle",
              "kind": "settle_change_set",
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
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "f3765015f78f",
            "generation": 12
          },
          "fields": [
            "measurement_reviews"
          ]
        },
        "evaluation_time": "2026-10-26T19:05:01.657308Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.log-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.log-acquire",
            "description": "Read one log read from the attached workspace (input.relative_path, at most 1 MiB): {audit: {incident, service}, source, query, from, to, complete, records_scanned, matches: [{at, summary}]}, written by the agent from its own log tool's answer, match summaries redacted. Retained under security.file-erasable-v1; the incident's security.log-import Line reads it when it lands. complete means every record in [from, to] was searched: no sampling, no result cap, retention reaching from.",
            "input": {
              "relative_path": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "byte_length": "$log.source.byte_length",
                "bytes_digest": "$log.source.bytes_digest"
              }
            },
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 1
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "items": 1
            },
            "slots": {
              "log": "workspace.file"
            },
            "steps": [
              {
                "id": "log",
                "source": "log",
                "contract": "security.file-erasable-v1",
                "interface": "workspace.file",
                "provider": "log",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "security.log-read",
                  "relative_path": "$input.relative_path",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              }
            ],
            "input_contract": "security-path-input",
            "output_contract": "security-file-evidence",
            "output": {
              "byte_length": {
                "type": "integer"
              },
              "bytes_digest": {
                "type": "string"
              }
            },
            "contracts": {
              "security-file-evidence": {
                "fields": {
                  "byte_length": {
                    "type": "integer"
                  },
                  "bytes_digest": {
                    "type": "string"
                  }
                }
              },
              "security-path-input": {
                "fields": {
                  "relative_path": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.log-acquire",
          "description": "Read one log read from the attached workspace (input.relative_path, at most 1 MiB): {audit: {incident, service}, source, query, from, to, complete, records_scanned, matches: [{at, summary}]}, written by the agent from its own log tool's answer, match summaries redacted. Retained under security.file-erasable-v1; the incident's security.log-import Line reads it when it lands. complete means every record in [from, to] was searched: no sampling, no result cap, retention reaching from.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-path-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.log-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.log-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.682967Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.log-import",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.log-import",
            "description": "Read the log-read Capture that triggered the Line (security.file-erasable-v1) for the Line's incident (parameter incident, its name) and propose the audit by key (incident, service) with its twins and one security.audit.read (SOURCE FROM/TO) for a complete read. An incomplete read is posted (read_incomplete) and never becomes a read: it is a finding about the logs, not about the attacker. Never a result. Halts other_incident for another incident's read. Runs as a Line with trigger_input log.",
            "input": {
              "incident": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "incident": "$parse.incident",
                "matches": "$parse.matches",
                "mine": "$parse.mine",
                "posted": "$parse.posted",
                "read": "$parse.read",
                "recordable": "$parse.recordable",
                "service": "$parse.service",
                "source": "$parse.source"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 2
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "items": 100
            },
            "slots": {
              "log": "workspace.file",
              "parse": "security.log-reads@1"
            },
            "steps": [
              {
                "id": "log",
                "source": "log",
                "contract": "security.file-erasable-v1",
                "interface": "workspace.file",
                "provider": "log",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "security.log-read",
                  "relative_path": "log-read.json",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              },
              {
                "id": "held",
                "tap": "held",
                "query": "security.audit_status",
                "params": {
                  "incident": "$input.incident"
                }
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.log-reads/v1",
                "provider": "parse",
                "input": {
                  "held": "$held.result.rows",
                  "incident": "$input.incident",
                  "read_text": "$log.content.text",
                  "truncated": "$held.truncated"
                }
              },
              {
                "id": "mine",
                "guard": "parse.mine > 0",
                "refusal_code": "other_incident",
                "message": "The landed log read is another incident's.",
                "else_id": "other",
                "else": "halt(other_incident)"
              },
              {
                "id": "recordable",
                "guard": "parse.recordable > 0",
                "refusal_code": "read_not_recordable",
                "message": "The read is incomplete, or its audit is not stated: posted.",
                "else": "post"
              },
              {
                "id": "changed",
                "guard": "parse.changed > 0",
                "refusal_code": "no_change",
                "message": "The audit already holds this read.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "propose",
                "propose": "$parse.items",
                "result": "$summary"
              },
              {
                "id": "post",
                "inbox": {
                  "items": "$parse.inbox"
                },
                "max_items": 10
              }
            ],
            "input_contract": "security-log-import-input",
            "output_contract": "security-log-read-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "incident": {
                "type": "string"
              },
              "matches": {
                "type": "integer"
              },
              "mine": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              },
              "read": {
                "type": "string"
              },
              "recordable": {
                "type": "integer"
              },
              "service": {
                "type": "string"
              },
              "source": {
                "type": "string"
              }
            },
            "contracts": {
              "security-log-import-input": {
                "fields": {
                  "incident": {
                    "type": "string"
                  }
                }
              },
              "security-log-read-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "incident": {
                    "type": "string"
                  },
                  "matches": {
                    "type": "integer"
                  },
                  "mine": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  },
                  "read": {
                    "type": "string"
                  },
                  "recordable": {
                    "type": "integer"
                  },
                  "service": {
                    "type": "string"
                  },
                  "source": {
                    "type": "string"
                  }
                }
              }
            },
            "halt_order": [
              "nochange",
              "other"
            ]
          },
          "procedure": "security.log-import",
          "description": "Read the log-read Capture that triggered the Line (security.file-erasable-v1) for the Line's incident (parameter incident, its name) and propose the audit by key (incident, service) with its twins and one security.audit.read (SOURCE FROM/TO) for a complete read. An incomplete read is posted (read_incomplete) and never becomes a read: it is a finding about the logs, not about the attacker. Never a result. Halts other_incident for another incident's read. Runs as a Line with trigger_input log.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-log-import-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
              "runs_on": "line"
            },
            {
              "node_id": "post",
              "kind": "post_inbox",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.log-import\"}])",
            "cx.get(\"Procedure:security.log-import\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.702274Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.osv-applicability",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.osv-applicability",
            "description": "Read OSV's published ecosystem list and query indexed components and watched CVEs; retain both provider answers under security.fetched-v1, sources osv.dev.ecosystems and osv.dev.query. Propose changed coverage and applicability, recording unindexed types without asserting coverage. Runs as a Line; never settles.",
            "input": {},
            "returns": {
              "fields": {
                "affected": "$decide.affected",
                "changed": "$decide.changed",
                "coverage": "$decide.coverage",
                "inconclusive": "$decide.inconclusive",
                "judged": "$decide.judged",
                "not_affected": "$decide.not_affected",
                "packages": "$decide.packages",
                "unchanged": "$decide.unchanged",
                "unkeyed": "$decide.unkeyed"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT300S",
              "provider_calls": 3,
              "capture_bytes": 67108864
            },
            "caps": {
              "wall_clock": "PT600S",
              "provider_calls": 3,
              "capture_bytes": 67108864,
              "items": 5000
            },
            "slots": {
              "decide": "security.osv-applicability@1",
              "ecosystems": "security.osv-ecosystems@1",
              "osv": "security.osv-query@1"
            },
            "steps": [
              {
                "id": "releases",
                "tap": "releases",
                "query": "security.release_inventory"
              },
              {
                "id": "watched",
                "tap": "watched",
                "query": "security.watched_vulnerabilities"
              },
              {
                "id": "assessments",
                "tap": "assessments",
                "query": "security.assessment_index"
              },
              {
                "id": "ecosystems",
                "source": "ecosystems",
                "contract": "security.fetched-v1",
                "interface": "security.osv-ecosystems/v1",
                "provider": "ecosystems",
                "request": {}
              },
              {
                "id": "osv",
                "source": "osv",
                "contract": "security.fetched-v1",
                "interface": "security.osv-query/v1",
                "provider": "osv",
                "request": {
                  "ecosystems": "$ecosystems",
                  "purl_types": {
                    "osv_ecosystems": {
                      "apk/alpine": "Alpine",
                      "apk/chainguard": "Chainguard",
                      "apk/wolfi": "Wolfi",
                      "bitnami": "Bitnami",
                      "cargo": "crates.io",
                      "composer": "Packagist",
                      "conan": "ConanCenter",
                      "cran": "CRAN",
                      "deb/debian": "Debian",
                      "deb/ubuntu": "Ubuntu",
                      "gem": "RubyGems",
                      "githubactions": "GitHub Actions",
                      "golang": "Go",
                      "hackage": "Hackage",
                      "hex": "Hex",
                      "maven": "Maven",
                      "npm": "npm",
                      "nuget": "NuGet",
                      "pub": "Pub",
                      "pypi": "PyPI",
                      "rpm/almalinux": "AlmaLinux",
                      "rpm/mageia": "Mageia",
                      "rpm/openeuler": "openEuler",
                      "rpm/opensuse": "openSUSE",
                      "rpm/redhat": "Red Hat",
                      "rpm/rocky-linux": "Rocky Linux",
                      "rpm/suse": "SUSE",
                      "swift": "SwiftURL"
                    },
                    "sources": [
                      "https://github.com/package-url/purl-spec/blob/main/PURL-TYPES.rst (purl types and their namespaces)",
                      "https://ossf.github.io/osv-schema/#defined-ecosystems (OSV ecosystem names and the purl type each uses)",
                      "https://osv-vulnerabilities.storage.googleapis.com/ecosystems.txt (what OSV indexes now: captured on every run)"
                    ]
                  },
                  "releases": "$releases.result.rows",
                  "watched": "$watched.result.rows"
                }
              },
              {
                "id": "decide",
                "call": "decide",
                "interface": "security.osv-applicability/v1",
                "provider": "decide",
                "input": {
                  "assessments": "$assessments.result.rows",
                  "osv": "$osv",
                  "releases": "$releases.result.rows",
                  "watched": "$watched.result.rows"
                }
              },
              {
                "id": "changed",
                "guard": "decide.changed > 0",
                "refusal_code": "no_change",
                "message": "OSV changes no assessment.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "propose",
                "propose": "$decide.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security.osv-applicability-input",
            "output_contract": "security.osv-applicability-output",
            "output": {
              "affected": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "coverage": {
                "type": "integer"
              },
              "inconclusive": {
                "type": "integer"
              },
              "judged": {
                "type": "integer"
              },
              "not_affected": {
                "type": "integer"
              },
              "packages": {
                "type": "integer"
              },
              "unchanged": {
                "type": "integer"
              },
              "unkeyed": {
                "type": "json"
              }
            },
            "contracts": {
              "security.osv-applicability-input": {
                "fields": {}
              },
              "security.osv-applicability-output": {
                "fields": {
                  "affected": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "coverage": {
                    "type": "integer"
                  },
                  "inconclusive": {
                    "type": "integer"
                  },
                  "judged": {
                    "type": "integer"
                  },
                  "not_affected": {
                    "type": "integer"
                  },
                  "packages": {
                    "type": "integer"
                  },
                  "unchanged": {
                    "type": "integer"
                  },
                  "unkeyed": {
                    "type": "json"
                  }
                }
              }
            },
            "halt_order": [
              "nochange"
            ]
          },
          "procedure": "security.osv-applicability",
          "description": "Read OSV's published ecosystem list and query indexed components and watched CVEs; retain both provider answers under security.fetched-v1, sources osv.dev.ecosystems and osv.dev.query. Propose changed coverage and applicability, recording unindexed types without asserting coverage. Runs as a Line; never settles.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.osv-applicability-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.osv-applicability\"}])",
            "cx.get(\"Procedure:security.osv-applicability\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.722704Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.registry-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.registry-acquire",
            "description": "Read the newest requested PyPI versions and their provenance; retain under security.fetched-v1, logical source pypi.release.",
            "input": {
              "project": {
                "type": "string"
              },
              "versions": {
                "type": "integer"
              }
            },
            "returns": {
              "fields": {
                "project": "$registry.project",
                "versions": "$registry.versions"
              }
            },
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "capture_bytes": 16777216,
              "items": 1
            },
            "slots": {
              "registry": "security.pypi-release@1"
            },
            "steps": [
              {
                "id": "registry",
                "source": "registry",
                "contract": "security.fetched-v1",
                "interface": "security.pypi-release/v1",
                "provider": "registry",
                "request": {
                  "project": "$input.project",
                  "versions": "$input.versions"
                }
              }
            ],
            "input_contract": "security.registry-acquire-input",
            "output_contract": "security.registry-acquire-output",
            "output": {
              "project": {
                "type": "string"
              },
              "versions": {
                "type": "json"
              }
            },
            "contracts": {
              "security.registry-acquire-input": {
                "fields": {
                  "project": {
                    "type": "string"
                  },
                  "versions": {
                    "type": "integer"
                  }
                }
              },
              "security.registry-acquire-output": {
                "fields": {
                  "project": {
                    "type": "string"
                  },
                  "versions": {
                    "type": "json"
                  }
                }
              }
            }
          },
          "procedure": "security.registry-acquire",
          "description": "Read the newest requested PyPI versions and their provenance; retain under security.fetched-v1, logical source pypi.release.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.registry-acquire-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.registry-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.registry-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.741972Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.registry-parse",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.registry-parse",
            "description": "Read the PyPI release Capture that triggered the Line (security.fetched-v1) for the Line's project (parameters: source pypi/PROJECT, project, versions) and propose what changed: each served file as an artifact with its digest, release, and (from provenance) the workflow at the commit that published it, its environment and the commit; the target's source repository; the coverage restated. Halts other_source for another project. Runs as a Line with trigger_input registry.",
            "input": {
              "project": {
                "type": "string"
              },
              "source": {
                "type": "string"
              },
              "versions": {
                "type": "integer"
              }
            },
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "files": "$parse.files",
                "locator": "$parse.locator",
                "restated": "$parse.restated",
                "retired": "$parse.retired",
                "revised": "$parse.revised",
                "revision": "$parse.revision"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 16777216,
              "items": 5000
            },
            "slots": {
              "parse": "security.registry-facts@1",
              "registry": "security.pypi-release@1"
            },
            "steps": [
              {
                "id": "registry",
                "source": "registry",
                "contract": "security.fetched-v1",
                "interface": "security.pypi-release/v1",
                "provider": "registry",
                "request": {
                  "project": "$input.project",
                  "versions": "$input.versions"
                }
              },
              {
                "id": "mine",
                "guard": "registry.project == input.project",
                "refusal_code": "other_source",
                "message": "The landed release is another project's.",
                "else_id": "other",
                "else": "halt(other_source)"
              },
              {
                "id": "coverage",
                "tap": "coverage",
                "query": "security.coverage_index",
                "params": {
                  "scope": "registry.files",
                  "source": "$input.source"
                }
              },
              {
                "id": "held",
                "tap": "held",
                "query": "security.registry_facts",
                "params": {
                  "name": "$input.project",
                  "registry": "pypi"
                }
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.registry-facts/v1",
                "provider": "parse",
                "input": {
                  "coverage": "$coverage.result.rows",
                  "held": "$held.result.rows",
                  "release": "$registry"
                }
              },
              {
                "id": "propose",
                "propose": "$parse.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-registry-parse-input",
            "output_contract": "security-registry-parse-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "files": {
                "type": "integer"
              },
              "locator": {
                "type": "string"
              },
              "restated": {
                "type": "integer"
              },
              "retired": {
                "type": "integer"
              },
              "revised": {
                "type": "integer"
              },
              "revision": {
                "type": "string"
              }
            },
            "contracts": {
              "security-registry-parse-input": {
                "fields": {
                  "project": {
                    "type": "string"
                  },
                  "source": {
                    "type": "string"
                  },
                  "versions": {
                    "type": "integer"
                  }
                }
              },
              "security-registry-parse-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "files": {
                    "type": "integer"
                  },
                  "locator": {
                    "type": "string"
                  },
                  "restated": {
                    "type": "integer"
                  },
                  "retired": {
                    "type": "integer"
                  },
                  "revised": {
                    "type": "integer"
                  },
                  "revision": {
                    "type": "string"
                  }
                }
              }
            },
            "halt_order": [
              "other"
            ]
          },
          "procedure": "security.registry-parse",
          "description": "Read the PyPI release Capture that triggered the Line (security.fetched-v1) for the Line's project (parameters: source pypi/PROJECT, project, versions) and propose what changed: each served file as an artifact with its digest, release, and (from provenance) the workflow at the commit that published it, its environment and the commit; the target's source repository; the coverage restated. Halts other_source for another project. Runs as a Line with trigger_input registry.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-registry-parse-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.registry-parse\"}])",
            "cx.get(\"Procedure:security.registry-parse\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.757195Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.repo-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.repo-acquire",
            "description": "Read one GitHub repository at a ref for a declared scope and path; retain its files under security.fetched-v1, logical source github.repo.snapshot.",
            "input": {
              "forge_host": {
                "type": "string"
              },
              "full_name": {
                "type": "string"
              },
              "path": {
                "type": "string"
              },
              "ref": {
                "type": "string"
              },
              "scope": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "locator": "$snapshot.locator",
                "revision": "$snapshot.revision"
              }
            },
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "capture_bytes": 16777216,
              "items": 1
            },
            "slots": {
              "snapshot": "security.repo-snapshot@1"
            },
            "steps": [
              {
                "id": "snapshot",
                "source": "snapshot",
                "contract": "security.fetched-v1",
                "interface": "security.repo-snapshot/v1",
                "provider": "snapshot",
                "request": {
                  "forge_host": "$input.forge_host",
                  "full_name": "$input.full_name",
                  "path": "$input.path",
                  "ref": "$input.ref",
                  "scope": "$input.scope"
                }
              }
            ],
            "input_contract": "security.repo-acquire-input",
            "output_contract": "security.repo-acquire-output",
            "output": {
              "locator": {
                "type": "string"
              },
              "revision": {
                "type": "string"
              }
            },
            "contracts": {
              "security.repo-acquire-input": {
                "fields": {
                  "forge_host": {
                    "type": "string"
                  },
                  "full_name": {
                    "type": "string"
                  },
                  "path": {
                    "type": "string"
                  },
                  "ref": {
                    "type": "string"
                  },
                  "scope": {
                    "type": "string"
                  }
                }
              },
              "security.repo-acquire-output": {
                "fields": {
                  "locator": {
                    "type": "string"
                  },
                  "revision": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.repo-acquire",
          "description": "Read one GitHub repository at a ref for a declared scope and path; retain its files under security.fetched-v1, logical source github.repo.snapshot.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.repo-acquire-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.repo-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.repo-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.778382Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.repo-parse",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.repo-parse",
            "description": "Read the repository snapshot that triggered the Line (security.fetched-v1) for the Line's source (parameters: source, repo_source, forge_host, full_name, ref, scope, path) and propose what changed: workflows, jobs and their triggers, permissions, secrets, environment, actions and publish targets, or a manifest's declared digests, plus the source's coverage restated (an unchanged snapshot re-observes it; a new revision revises it). Halts other_source for another source's snapshot. Runs as a Line with trigger_input snapshot.",
            "input": {
              "forge_host": {
                "type": "string"
              },
              "full_name": {
                "type": "string"
              },
              "path": {
                "type": "string"
              },
              "ref": {
                "type": "string"
              },
              "repo_source": {
                "type": "string"
              },
              "scope": {
                "type": "string"
              },
              "source": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "jobs": "$parse.jobs",
                "locator": "$parse.locator",
                "restated": "$parse.restated",
                "retired": "$parse.retired",
                "revised": "$parse.revised",
                "revision": "$parse.revision",
                "scope": "$parse.scope",
                "unparsed": "$parse.unparsed",
                "workflows": "$parse.workflows"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 16777216,
              "items": 5000
            },
            "slots": {
              "parse": "security.workflow-facts@1",
              "snapshot": "security.repo-snapshot@1"
            },
            "steps": [
              {
                "id": "snapshot",
                "source": "snapshot",
                "contract": "security.fetched-v1",
                "interface": "security.repo-snapshot/v1",
                "provider": "snapshot",
                "request": {
                  "forge_host": "$input.forge_host",
                  "full_name": "$input.full_name",
                  "path": "$input.path",
                  "ref": "$input.ref",
                  "scope": "$input.scope"
                }
              },
              {
                "id": "mine",
                "guard": "snapshot.locator == input.source",
                "refusal_code": "other_source",
                "message": "The landed snapshot is another source's.",
                "else_id": "other",
                "else": "halt(other_source)"
              },
              {
                "id": "coverage",
                "tap": "coverage",
                "query": "security.coverage_index",
                "params": {
                  "scope": "$input.scope",
                  "source": "$input.source"
                }
              },
              {
                "id": "held",
                "tap": "held",
                "query": "security.source_facts",
                "params": {
                  "source": "$input.repo_source"
                }
              },
              {
                "id": "targets",
                "tap": "targets",
                "query": "security.repo_targets",
                "params": {
                  "forge_host": "$input.forge_host",
                  "full_name": "$input.full_name"
                }
              },
              {
                "id": "releases",
                "tap": "releases",
                "query": "security.registry_facts",
                "params": {
                  "name": "$input.full_name",
                  "registry": "github_release"
                }
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.workflow-facts/v1",
                "provider": "parse",
                "input": {
                  "coverage": "$coverage.result.rows",
                  "held": "$held.result.rows",
                  "releases": "$releases.result.rows",
                  "snapshot": "$snapshot",
                  "targets": "$targets.result.rows"
                }
              },
              {
                "id": "propose",
                "propose": "$parse.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-repo-parse-input",
            "output_contract": "security-repo-parse-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "jobs": {
                "type": "integer"
              },
              "locator": {
                "type": "string"
              },
              "restated": {
                "type": "integer"
              },
              "retired": {
                "type": "integer"
              },
              "revised": {
                "type": "integer"
              },
              "revision": {
                "type": "string"
              },
              "scope": {
                "type": "string"
              },
              "unparsed": {
                "type": "json"
              },
              "workflows": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-repo-parse-input": {
                "fields": {
                  "forge_host": {
                    "type": "string"
                  },
                  "full_name": {
                    "type": "string"
                  },
                  "path": {
                    "type": "string"
                  },
                  "ref": {
                    "type": "string"
                  },
                  "repo_source": {
                    "type": "string"
                  },
                  "scope": {
                    "type": "string"
                  },
                  "source": {
                    "type": "string"
                  }
                }
              },
              "security-repo-parse-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "jobs": {
                    "type": "integer"
                  },
                  "locator": {
                    "type": "string"
                  },
                  "restated": {
                    "type": "integer"
                  },
                  "retired": {
                    "type": "integer"
                  },
                  "revised": {
                    "type": "integer"
                  },
                  "revision": {
                    "type": "string"
                  },
                  "scope": {
                    "type": "string"
                  },
                  "unparsed": {
                    "type": "json"
                  },
                  "workflows": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "other"
            ]
          },
          "procedure": "security.repo-parse",
          "description": "Read the repository snapshot that triggered the Line (security.fetched-v1) for the Line's source (parameters: source, repo_source, forge_host, full_name, ref, scope, path) and propose what changed: workflows, jobs and their triggers, permissions, secrets, environment, actions and publish targets, or a manifest's declared digests, plus the source's coverage restated (an unchanged snapshot re-observes it; a new revision revises it). Halts other_source for another source's snapshot. Runs as a Line with trigger_input snapshot.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-repo-parse-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.repo-parse\"}])",
            "cx.get(\"Procedure:security.repo-parse\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.793584Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.reproduction-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.reproduction-acquire",
            "description": "Read one proof-of-concept run's report from the attached workspace (input.relative_path: a JUnit XML or a test log) and retain it under security.file-v1; cite the Capture for security.finding.verdict (confirmed: the PoC fails while vulnerable) or verification (fixed: it passes).",
            "input": {
              "relative_path": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "byte_length": "$reproduction.source.byte_length",
                "bytes_digest": "$reproduction.source.bytes_digest"
              }
            },
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 1
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "items": 1
            },
            "slots": {
              "reproduction": "workspace.file"
            },
            "steps": [
              {
                "id": "reproduction",
                "source": "reproduction",
                "contract": "security.file-v1",
                "interface": "workspace.file",
                "provider": "reproduction",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "security.reproduction",
                  "relative_path": "$input.relative_path",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              }
            ],
            "input_contract": "security-path-input",
            "output_contract": "security-file-evidence",
            "output": {
              "byte_length": {
                "type": "integer"
              },
              "bytes_digest": {
                "type": "string"
              }
            },
            "contracts": {
              "security-file-evidence": {
                "fields": {
                  "byte_length": {
                    "type": "integer"
                  },
                  "bytes_digest": {
                    "type": "string"
                  }
                }
              },
              "security-path-input": {
                "fields": {
                  "relative_path": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.reproduction-acquire",
          "description": "Read one proof-of-concept run's report from the attached workspace (input.relative_path: a JUnit XML or a test log) and retain it under security.file-v1; cite the Capture for security.finding.verdict (confirmed: the PoC fails while vulnerable) or verification (fixed: it passes).",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-path-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.reproduction-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.reproduction-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.810950Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.respond",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.respond",
            "description": "Ask one incident's five questions (parameter incident, its name) and answer each in three states: found (posted), none (run summary only) or unknown (posted as a gap naming the pull or statement that would answer it). RQ1 which deployments run an affected release: every asset (security.deployments) and every release a scan observed on one or it declares, for each incident CVE. A deployment's none needs a current full scan of the asset that looked for the product, and the release's none: its assessment (a negative that rests on components holds while they are the release's), or OSV's answer for every component of the exact current set with none a package OSV says the CVE affects (citing those Claims). Else unknown naming the next step (the inventory pull for a missing, stale or erased scan, or products a scan didn't look for; the CVE record pull; the purl types OSV does not index; the OSV Line; an analyst's judgment last): never silent. More than 200 items to post refuses (overflow) rather than cut the rest; RQ2 is each exposure patched (missing, overdue, disputed; none only when a full scan verified it; excepted while an approved exception for each of its CVEs has not expired, then missing again); RQ3 were we exploited in the window, per service (none only for not_exploited with complete reads of every stated log source covering the window); RQ4 which credentials warrant rotation (posted with the audit and patch state; rotating after a verified patch is the recommended order, the agent's call), and is each rotation verified by a separate state read; RQ5 can the incident close (ready_to_close, with any unknown audit as accepted residue). A closed incident posts nothing. Observe-only. Runs as a Line (parameters incident, inventory_pull, log_pull, credential_pull, record_pull, optional osv_line): daily, on a landing, after a window closes, or line run.",
            "input": {
              "credential_pull": {
                "type": "string"
              },
              "incident": {
                "type": "string"
              },
              "inventory_pull": {
                "type": "string"
              },
              "log_pull": {
                "type": "string"
              },
              "osv_line": {
                "type": "string",
                "optional": true
              },
              "record_pull": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "answers": "$classify.answers",
                "found": "$classify.found",
                "incident": "$classify.incident",
                "none": "$classify.none",
                "posted": "$classify.posted",
                "ready_to_close": "$classify.ready_to_close",
                "status": "$classify.status",
                "unknown": "$classify.unknown"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 1
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "items": 200
            },
            "slots": {
              "classify": "security.respond@1"
            },
            "steps": [
              {
                "id": "exposure",
                "tap": "exposure",
                "query": "security.incident_exposure",
                "params": {
                  "incident": "$input.incident"
                }
              },
              {
                "id": "hosts",
                "tap": "hosts",
                "query": "security.scanned_runs"
              },
              {
                "id": "deployments",
                "tap": "deployments",
                "query": "security.deployments"
              },
              {
                "id": "patches",
                "tap": "patches",
                "query": "security.incident_patches",
                "params": {
                  "incident": "$input.incident"
                }
              },
              {
                "id": "overdue",
                "tap": "overdue",
                "query": "security.overdue_patches",
                "params": {
                  "incident": "$input.incident"
                }
              },
              {
                "id": "exceptions",
                "tap": "exceptions",
                "query": "security.incident_exceptions",
                "params": {
                  "incident": "$input.incident"
                }
              },
              {
                "id": "audits",
                "tap": "audits",
                "query": "security.audit_status",
                "params": {
                  "incident": "$input.incident"
                }
              },
              {
                "id": "credentials",
                "tap": "credentials",
                "query": "security.incident_credentials",
                "params": {
                  "incident": "$input.incident"
                }
              },
              {
                "id": "classify",
                "call": "classify",
                "interface": "security.respond/v1",
                "provider": "classify",
                "input": {
                  "audits": "$audits.result.rows",
                  "credentials": "$credentials.result.rows",
                  "deployments": "$deployments.result.rows",
                  "exceptions": "$exceptions.result.rows",
                  "exposure": "$exposure.result.rows",
                  "hosts": "$hosts.result.rows",
                  "overdue": "$overdue.result.rows",
                  "params": "$input",
                  "patches": "$patches.result.rows",
                  "truncated": {
                    "audits": "$audits.truncated",
                    "credentials": "$credentials.truncated",
                    "deployments": "$deployments.truncated",
                    "exceptions": "$exceptions.truncated",
                    "exposure": "$exposure.truncated",
                    "hosts": "$hosts.truncated",
                    "overdue": "$overdue.truncated",
                    "patches": "$patches.truncated"
                  }
                }
              },
              {
                "id": "posted",
                "guard": "classify.posted > 0",
                "refusal_code": "nothing_to_post",
                "message": "Nothing to post: no question is found or unknown (every answer rests on evidence of none), or the incident is closed.",
                "else_id": "quiet",
                "else": "halt(nothing_to_post)"
              },
              {
                "id": "post",
                "inbox": {
                  "items": "$classify.items"
                },
                "max_items": 200
              }
            ],
            "input_contract": "security-respond-input",
            "output_contract": "security-respond-summary",
            "output": {
              "answers": {
                "type": "json"
              },
              "found": {
                "type": "integer"
              },
              "incident": {
                "type": "string"
              },
              "none": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              },
              "ready_to_close": {
                "type": "integer"
              },
              "status": {
                "type": "string"
              },
              "unknown": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-respond-input": {
                "fields": {
                  "credential_pull": {
                    "type": "string"
                  },
                  "incident": {
                    "type": "string"
                  },
                  "inventory_pull": {
                    "type": "string"
                  },
                  "log_pull": {
                    "type": "string"
                  },
                  "osv_line": {
                    "type": "string",
                    "optional": true
                  },
                  "record_pull": {
                    "type": "string"
                  }
                }
              },
              "security-respond-summary": {
                "fields": {
                  "answers": {
                    "type": "json"
                  },
                  "found": {
                    "type": "integer"
                  },
                  "incident": {
                    "type": "string"
                  },
                  "none": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  },
                  "ready_to_close": {
                    "type": "integer"
                  },
                  "status": {
                    "type": "string"
                  },
                  "unknown": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "quiet"
            ]
          },
          "procedure": "security.respond",
          "description": "Ask one incident's five questions (parameter incident, its name) and answer each in three states: found (posted), none (run summary only) or unknown (posted as a gap naming the pull or statement that would answer it). RQ1 which deployments run an affected release: every asset (security.deployments) and every release a scan observed on one or it declares, for each incident CVE. A deployment's none needs a current full scan of the asset that looked for the product, and the release's none: its assessment (a negative that rests on components holds while they are the release's), or OSV's answer for every component of the exact current set with none a package OSV says the CVE affects (citing those Claims). Else unknown naming the next step (the inventory pull for a missing, stale or erased scan, or products a scan didn't look for; the CVE record pull; the purl types OSV does not index; the OSV Line; an analyst's judgment last): never silent. More than 200 items to post refuses (overflow) rather than cut the rest; RQ2 is each exposure patched (missing, overdue, disputed; none only when a full scan verified it; excepted while an approved exception for each of its CVEs has not expired, then missing again); RQ3 were we exploited in the window, per service (none only for not_exploited with complete reads of every stated log source covering the window); RQ4 which credentials warrant rotation (posted with the audit and patch state; rotating after a verified patch is the recommended order, the agent's call), and is each rotation verified by a separate state read; RQ5 can the incident close (ready_to_close, with any unknown audit as accepted residue). A closed incident posts nothing. Observe-only. Runs as a Line (parameters incident, inventory_pull, log_pull, credential_pull, record_pull, optional osv_line): daily, on a landing, after a window closes, or line run.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-respond-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "post",
              "kind": "post_inbox",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.respond\"}])",
            "cx.get(\"Procedure:security.respond\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.827139Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.sarif-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.sarif-acquire",
            "description": "Read one SARIF 2.1.0 scan log from the attached workspace (input.relative_path) and retain it under security.file-v1; the repository's security.sarif-import Line reads it when it lands. Annotate each run first: versionControlProvenance (repositoryUri, revisionId) and properties[\"cruxible.coverage\"] (full or partial).",
            "input": {
              "relative_path": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "byte_length": "$sarif.source.byte_length",
                "bytes_digest": "$sarif.source.bytes_digest"
              }
            },
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 1
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "items": 1
            },
            "slots": {
              "sarif": "workspace.file"
            },
            "steps": [
              {
                "id": "sarif",
                "source": "sarif",
                "contract": "security.file-v1",
                "interface": "workspace.file",
                "provider": "sarif",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "sarif.log",
                  "relative_path": "$input.relative_path",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              }
            ],
            "input_contract": "security-path-input",
            "output_contract": "security-file-evidence",
            "output": {
              "byte_length": {
                "type": "integer"
              },
              "bytes_digest": {
                "type": "string"
              }
            },
            "contracts": {
              "security-file-evidence": {
                "fields": {
                  "byte_length": {
                    "type": "integer"
                  },
                  "bytes_digest": {
                    "type": "string"
                  }
                }
              },
              "security-path-input": {
                "fields": {
                  "relative_path": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.sarif-acquire",
          "description": "Read one SARIF 2.1.0 scan log from the attached workspace (input.relative_path) and retain it under security.file-v1; the repository's security.sarif-import Line reads it when it lands. Annotate each run first: versionControlProvenance (repositoryUri, revisionId) and properties[\"cruxible.coverage\"] (full or partial).",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-path-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.sarif-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.sarif-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.845880Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.sarif-attention",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.sarif-attention",
            "description": "Read the SARIF log Capture that triggered the Line for the Line's repository (parameter repo_ref) and post one inbox item per location gap (a result with no repository-relative path or no stable locus: one per tool, rule and path) and per regression (a fixed finding a full scan reports again). Never changes accepted state. Runs as a Line with trigger_input sarif, beside security.sarif-import.",
            "input": {
              "repo_ref": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "findings": "$parse.findings",
                "fixed": "$parse.fixed",
                "full": "$parse.full",
                "gaps": "$parse.gaps",
                "mine": "$parse.mine",
                "new": "$parse.new",
                "posted": "$parse.posted",
                "regressed": "$parse.regressed",
                "repo_ref": "$parse.repo_ref",
                "results": "$parse.results",
                "revisions": "$parse.revisions",
                "routed_to_assessment": "$parse.routed_to_assessment",
                "tools": "$parse.tools"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 16777216,
              "items": 1000
            },
            "slots": {
              "parse": "security.sarif-findings@1",
              "sarif": "workspace.file"
            },
            "steps": [
              {
                "id": "sarif",
                "source": "sarif",
                "contract": "security.file-v1",
                "interface": "workspace.file",
                "provider": "sarif",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "sarif.log",
                  "relative_path": "scan.sarif",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              },
              {
                "id": "held",
                "tap": "held",
                "query": "security.finding_index",
                "params": {
                  "repo_ref": "$input.repo_ref"
                }
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.sarif-findings/v1",
                "provider": "parse",
                "input": {
                  "held": "$held.result.rows",
                  "repo_ref": "$input.repo_ref",
                  "sarif_text": "$sarif.content.text",
                  "truncated": "$held.truncated"
                }
              },
              {
                "id": "mine",
                "guard": "parse.mine > 0",
                "refusal_code": "wrong_repo",
                "message": "The landed SARIF log has no run of the Line's repository.",
                "else_id": "other",
                "else": "halt(wrong_repo)"
              },
              {
                "id": "posted",
                "guard": "parse.posted > 0",
                "refusal_code": "nothing_to_post",
                "message": "The scan has no location gap and no regression.",
                "else_id": "quiet",
                "else": "halt(nothing_to_post)"
              },
              {
                "id": "post",
                "inbox": {
                  "items": "$parse.inbox"
                },
                "max_items": 1000
              }
            ],
            "input_contract": "security-sarif-import-input",
            "output_contract": "security-sarif-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "findings": {
                "type": "integer"
              },
              "fixed": {
                "type": "integer"
              },
              "full": {
                "type": "json"
              },
              "gaps": {
                "type": "integer"
              },
              "mine": {
                "type": "integer"
              },
              "new": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              },
              "regressed": {
                "type": "integer"
              },
              "repo_ref": {
                "type": "string"
              },
              "results": {
                "type": "integer"
              },
              "revisions": {
                "type": "json"
              },
              "routed_to_assessment": {
                "type": "integer"
              },
              "tools": {
                "type": "json"
              }
            },
            "contracts": {
              "security-sarif-import-input": {
                "fields": {
                  "repo_ref": {
                    "type": "string"
                  }
                }
              },
              "security-sarif-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "findings": {
                    "type": "integer"
                  },
                  "fixed": {
                    "type": "integer"
                  },
                  "full": {
                    "type": "json"
                  },
                  "gaps": {
                    "type": "integer"
                  },
                  "mine": {
                    "type": "integer"
                  },
                  "new": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  },
                  "regressed": {
                    "type": "integer"
                  },
                  "repo_ref": {
                    "type": "string"
                  },
                  "results": {
                    "type": "integer"
                  },
                  "revisions": {
                    "type": "json"
                  },
                  "routed_to_assessment": {
                    "type": "integer"
                  },
                  "tools": {
                    "type": "json"
                  }
                }
              }
            },
            "halt_order": [
              "quiet",
              "other"
            ]
          },
          "procedure": "security.sarif-attention",
          "description": "Read the SARIF log Capture that triggered the Line for the Line's repository (parameter repo_ref) and post one inbox item per location gap (a result with no repository-relative path or no stable locus: one per tool, rule and path) and per regression (a fixed finding a full scan reports again). Never changes accepted state. Runs as a Line with trigger_input sarif, beside security.sarif-import.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-sarif-import-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "post",
              "kind": "post_inbox",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.sarif-attention\"}])",
            "cx.get(\"Procedure:security.sarif-attention\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.860698Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.sarif-import",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.sarif-import",
            "description": "Read the SARIF log Capture that triggered the Line (security.file-v1) for the Line's repository (parameter repo_ref, host/owner/repo) and propose what changed: each new finding by key (repository, weakness, locus) with the rules and finders that reported it and its severity; rules and finders a held finding lacks; verification fixed for a held finding a full scan of its rules no longer reports, present for a fixed one it reports again. Never a verdict. Halts wrong_repo for another repository's log, no_change when nothing changed. Propose-only. Runs as a Line with trigger_input sarif.",
            "input": {
              "repo_ref": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "findings": "$parse.findings",
                "fixed": "$parse.fixed",
                "full": "$parse.full",
                "gaps": "$parse.gaps",
                "mine": "$parse.mine",
                "new": "$parse.new",
                "posted": "$parse.posted",
                "regressed": "$parse.regressed",
                "repo_ref": "$parse.repo_ref",
                "results": "$parse.results",
                "revisions": "$parse.revisions",
                "routed_to_assessment": "$parse.routed_to_assessment",
                "tools": "$parse.tools"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 16777216,
              "items": 5000
            },
            "slots": {
              "parse": "security.sarif-findings@1",
              "sarif": "workspace.file"
            },
            "steps": [
              {
                "id": "sarif",
                "source": "sarif",
                "contract": "security.file-v1",
                "interface": "workspace.file",
                "provider": "sarif",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "sarif.log",
                  "relative_path": "scan.sarif",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              },
              {
                "id": "held",
                "tap": "held",
                "query": "security.finding_index",
                "params": {
                  "repo_ref": "$input.repo_ref"
                }
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.sarif-findings/v1",
                "provider": "parse",
                "input": {
                  "held": "$held.result.rows",
                  "repo_ref": "$input.repo_ref",
                  "sarif_text": "$sarif.content.text",
                  "truncated": "$held.truncated"
                }
              },
              {
                "id": "mine",
                "guard": "parse.mine > 0",
                "refusal_code": "wrong_repo",
                "message": "The landed SARIF log has no run of the Line's repository.",
                "else_id": "other",
                "else": "halt(wrong_repo)"
              },
              {
                "id": "changed",
                "guard": "parse.changed > 0",
                "refusal_code": "no_change",
                "message": "The scan reports nothing the held findings lack.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "propose",
                "propose": "$parse.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-sarif-import-input",
            "output_contract": "security-sarif-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "findings": {
                "type": "integer"
              },
              "fixed": {
                "type": "integer"
              },
              "full": {
                "type": "json"
              },
              "gaps": {
                "type": "integer"
              },
              "mine": {
                "type": "integer"
              },
              "new": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              },
              "regressed": {
                "type": "integer"
              },
              "repo_ref": {
                "type": "string"
              },
              "results": {
                "type": "integer"
              },
              "revisions": {
                "type": "json"
              },
              "routed_to_assessment": {
                "type": "integer"
              },
              "tools": {
                "type": "json"
              }
            },
            "contracts": {
              "security-sarif-import-input": {
                "fields": {
                  "repo_ref": {
                    "type": "string"
                  }
                }
              },
              "security-sarif-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "findings": {
                    "type": "integer"
                  },
                  "fixed": {
                    "type": "integer"
                  },
                  "full": {
                    "type": "json"
                  },
                  "gaps": {
                    "type": "integer"
                  },
                  "mine": {
                    "type": "integer"
                  },
                  "new": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  },
                  "regressed": {
                    "type": "integer"
                  },
                  "repo_ref": {
                    "type": "string"
                  },
                  "results": {
                    "type": "integer"
                  },
                  "revisions": {
                    "type": "json"
                  },
                  "routed_to_assessment": {
                    "type": "integer"
                  },
                  "tools": {
                    "type": "json"
                  }
                }
              }
            },
            "halt_order": [
              "nochange",
              "other"
            ]
          },
          "procedure": "security.sarif-import",
          "description": "Read the SARIF log Capture that triggered the Line (security.file-v1) for the Line's repository (parameter repo_ref, host/owner/repo) and propose what changed: each new finding by key (repository, weakness, locus) with the rules and finders that reported it and its severity; rules and finders a held finding lacks; verification fixed for a held finding a full scan of its rules no longer reports, present for a fixed one it reports again. Never a verdict. Halts wrong_repo for another repository's log, no_change when nothing changed. Propose-only. Runs as a Line with trigger_input sarif.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-sarif-import-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.sarif-import\"}])",
            "cx.get(\"Procedure:security.sarif-import\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.878671Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.sbom-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.sbom-acquire",
            "description": "Read one CycloneDX JSON SBOM from the attached workspace (input.relative_path) and retain it under security.file-v1; security.sbom-import reads it when it lands. At most 1 MiB (the built-in workspace.file's limit).",
            "input": {
              "relative_path": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "byte_length": "$sbom.source.byte_length",
                "bytes_digest": "$sbom.source.bytes_digest"
              }
            },
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 1
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "items": 1
            },
            "slots": {
              "sbom": "workspace.file"
            },
            "steps": [
              {
                "id": "sbom",
                "source": "sbom",
                "contract": "security.file-v1",
                "interface": "workspace.file",
                "provider": "sbom",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "cyclonedx.sbom",
                  "relative_path": "$input.relative_path",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              }
            ],
            "input_contract": "security-path-input",
            "output_contract": "security-file-evidence",
            "output": {
              "byte_length": {
                "type": "integer"
              },
              "bytes_digest": {
                "type": "string"
              }
            },
            "contracts": {
              "security-file-evidence": {
                "fields": {
                  "byte_length": {
                    "type": "integer"
                  },
                  "bytes_digest": {
                    "type": "string"
                  }
                }
              },
              "security-path-input": {
                "fields": {
                  "relative_path": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.sbom-acquire",
          "description": "Read one CycloneDX JSON SBOM from the attached workspace (input.relative_path) and retain it under security.file-v1; security.sbom-import reads it when it lands. At most 1 MiB (the built-in workspace.file's limit).",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-path-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.sbom-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.sbom-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:01.897515Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.sbom-import",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.sbom-import",
            "description": "Read the CycloneDX SBOM Capture that triggered the Line (security.file-v1) and propose its product and release (created by key, or the held ones), the release's product link, supplier, and one security.release.component observation per component purl the release does not hold yet. Propose-only. Runs as a Line with trigger_input sbom.",
            "input": {},
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "components": "$parse.components",
                "osv_not_indexed": "$parse.osv_not_indexed",
                "osv_unindexed": "$parse.osv_unindexed",
                "product": "$parse.product",
                "skipped": "$parse.skipped",
                "version": "$parse.version"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 16777216,
              "items": 5000
            },
            "slots": {
              "parse": "security.cyclonedx-components@1",
              "sbom": "workspace.file"
            },
            "steps": [
              {
                "id": "sbom",
                "source": "sbom",
                "contract": "security.file-v1",
                "interface": "workspace.file",
                "provider": "sbom",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "cyclonedx.sbom",
                  "relative_path": "sbom.cdx.json",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              },
              {
                "id": "releases",
                "tap": "releases",
                "query": "security.release_inventory"
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.cyclonedx-components/v1",
                "provider": "parse",
                "input": {
                  "osv_ecosystems": {
                    "apk/alpine": "Alpine",
                    "apk/chainguard": "Chainguard",
                    "apk/wolfi": "Wolfi",
                    "bitnami": "Bitnami",
                    "cargo": "crates.io",
                    "composer": "Packagist",
                    "conan": "ConanCenter",
                    "cran": "CRAN",
                    "deb/debian": "Debian",
                    "deb/ubuntu": "Ubuntu",
                    "gem": "RubyGems",
                    "githubactions": "GitHub Actions",
                    "golang": "Go",
                    "hackage": "Hackage",
                    "hex": "Hex",
                    "maven": "Maven",
                    "npm": "npm",
                    "nuget": "NuGet",
                    "pub": "Pub",
                    "pypi": "PyPI",
                    "rpm/almalinux": "AlmaLinux",
                    "rpm/mageia": "Mageia",
                    "rpm/openeuler": "openEuler",
                    "rpm/opensuse": "openSUSE",
                    "rpm/redhat": "Red Hat",
                    "rpm/rocky-linux": "Rocky Linux",
                    "rpm/suse": "SUSE",
                    "swift": "SwiftURL"
                  },
                  "releases": "$releases.result.rows",
                  "sbom_text": "$sbom.content.text"
                }
              },
              {
                "id": "changed",
                "guard": "parse.changed > 0",
                "refusal_code": "no_change",
                "message": "The SBOM adds nothing inventory lacks.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "propose",
                "propose": "$parse.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-empty-input",
            "output_contract": "security-sbom-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "components": {
                "type": "integer"
              },
              "osv_not_indexed": {
                "type": "json"
              },
              "osv_unindexed": {
                "type": "integer"
              },
              "product": {
                "type": "string"
              },
              "skipped": {
                "type": "integer"
              },
              "version": {
                "type": "string"
              }
            },
            "contracts": {
              "security-empty-input": {
                "fields": {}
              },
              "security-sbom-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "components": {
                    "type": "integer"
                  },
                  "osv_not_indexed": {
                    "type": "json"
                  },
                  "osv_unindexed": {
                    "type": "integer"
                  },
                  "product": {
                    "type": "string"
                  },
                  "skipped": {
                    "type": "integer"
                  },
                  "version": {
                    "type": "string"
                  }
                }
              }
            },
            "halt_order": [
              "nochange"
            ]
          },
          "procedure": "security.sbom-import",
          "description": "Read the CycloneDX SBOM Capture that triggered the Line (security.file-v1) and propose its product and release (created by key, or the held ones), the release's product link, supplier, and one security.release.component observation per component purl the release does not hold yet. Propose-only. Runs as a Line with trigger_input sbom.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-empty-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
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
        "evaluation_time": "2026-10-26T19:05:01.913454Z"
      }
    ]
  }
});

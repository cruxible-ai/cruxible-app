// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch b102f8b9
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.cve-applicability"
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
        "evaluation_time": "2026-10-26T19:05:12.359646Z"
      }
    ]
  }
});

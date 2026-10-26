// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 3c57e9f5
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.osv-applicability"
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
        "evaluation_time": "2026-10-26T19:05:14.639306Z"
      }
    ]
  }
});

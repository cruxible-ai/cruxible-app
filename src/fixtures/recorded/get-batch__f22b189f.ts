// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 6b79bebb
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.inventory-import"
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
        "evaluation_time": "2026-10-26T19:05:12.994906Z"
      }
    ]
  }
});

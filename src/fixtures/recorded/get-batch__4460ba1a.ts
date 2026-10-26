// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch dc679d92
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
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
        "evaluation_time": "2026-10-26T19:05:17.176329Z"
      }
    ]
  }
});

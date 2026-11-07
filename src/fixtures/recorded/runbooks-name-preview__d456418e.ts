// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/runbooks/security.start/preview 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/runbooks/{name}/preview",
  "pathParams": {
    "name": "security.start"
  },
  "response": {
    "tag": "cruxible-runbook-preview-v1",
    "runbook": "security.start",
    "runbook_artifact_digest": "sha256:bae11638b7cff95f703fd8dfa7c9d0d57221803296c567cf2359a02325b47b8b",
    "description": "Seed a fresh instance: import the SBOM, ask OSV what affects it, then read KEV and EPSS for what it found.",
    "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
    "steps": [
      {
        "step": 1,
        "target": {
          "kind": "line",
          "line": {
            "target": {
              "kind": "Line",
              "name": "security.sbom-import.app"
            }
          }
        },
        "procedure": "Procedure:security.sbom-import",
        "reads": [],
        "writes": [
          {
            "node_id": "write",
            "subject_kind": "security.occurrence",
            "creates_subjects": true,
            "claim_types": [
              "security.occurrence.scope"
            ],
            "creates_object_kinds": [],
            "judges_absence": true
          }
        ],
        "calls": [
          {
            "node_id": "sbom",
            "slot": "read",
            "signature_in": "workspace.file.request@1",
            "signature_out": "workspace.file.result@1",
            "effect": "pure",
            "build": "Provider:cruxible-builtin",
            "operation": "workspace.file",
            "captures": [
              "security.cyclonedx-sbom"
            ]
          },
          {
            "node_id": "derived",
            "slot": "derive",
            "signature_in": "sbom.components.request@1",
            "signature_out": "sbom.components.result@1",
            "effect": "pure",
            "build": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
            "operation": "sbom.components",
            "captures": [
              "security.sbom-components"
            ]
          }
        ],
        "authority": {
          "max_authority": "settle",
          "mandates": [
            "ProcedureMandate:security.sbom-import.app-propose",
            "ProcedureMandate:security.sbom-import.app-settle"
          ],
          "grants": "settle",
          "settles": [
            {
              "claim_type": "security.occurrence.scope",
              "changes": [
                {
                  "change": "create",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "revise",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "retire",
                  "basis": [
                    "absence"
                  ]
                }
              ],
              "binding_subject_role": "subject"
            }
          ],
          "settles_creation": [
            "security.component",
            "security.inventory",
            "security.occurrence"
          ],
          "conditional": false,
          "review_gaps": [],
          "proposes": [],
          "proposes_creation": [],
          "may_stop_run": false
        },
        "cascades": [
          {
            "trigger": "Trigger:floor-refresh",
            "schedule": "generation_accepted",
            "target_kind": "action",
            "target": "floor.refresh",
            "in_runbook": false
          }
        ]
      },
      {
        "step": 2,
        "target": {
          "kind": "line",
          "line": {
            "target": {
              "kind": "Line",
              "name": "security.osv-query"
            }
          }
        },
        "procedure": "Procedure:security.osv-query",
        "reads": [
          {
            "node_id": "components",
            "query": "security.osv_components",
            "claim_types": [
              "security.component.purl",
              "security.occurrence.component",
              "security.occurrence.scope"
            ],
            "subject_kinds": [
              "security.component",
              "security.occurrence"
            ],
            "key_claim_types": [
              "security.component.purl",
              "security.occurrence.component",
              "security.occurrence.inventory"
            ],
            "late": false
          }
        ],
        "writes": [
          {
            "node_id": "write",
            "subject_kind": "security.component",
            "creates_subjects": false,
            "claim_types": [
              "security.component.affected_by"
            ],
            "creates_object_kinds": [
              "security.vulnerability"
            ],
            "judges_absence": true
          }
        ],
        "calls": [
          {
            "node_id": "osv",
            "slot": "query",
            "signature_in": "osv.query.request@1",
            "signature_out": "osv.query.result@1",
            "effect": "external_read",
            "build": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
            "operation": "osv.query",
            "captures": [
              "security.osv-response"
            ]
          },
          {
            "node_id": "matched",
            "slot": "match",
            "signature_in": "osv.match.request@1",
            "signature_out": "osv.match.result@1",
            "effect": "pure",
            "build": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
            "operation": "osv.match",
            "captures": [
              "security.osv-matches"
            ]
          }
        ],
        "authority": {
          "max_authority": "settle",
          "mandates": [
            "ProcedureMandate:security.osv-query-propose",
            "ProcedureMandate:security.osv-query-settle"
          ],
          "grants": "settle",
          "settles": [
            {
              "claim_type": "security.component.affected_by",
              "changes": [
                {
                  "change": "create",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "revise",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "retire",
                  "basis": [
                    "absence"
                  ]
                }
              ],
              "binding_subject_role": "subject"
            }
          ],
          "settles_creation": [
            "security.vulnerability"
          ],
          "conditional": false,
          "review_gaps": [],
          "proposes": [],
          "proposes_creation": [],
          "may_stop_run": false
        },
        "cascades": [
          {
            "trigger": "Trigger:floor-refresh",
            "schedule": "generation_accepted",
            "target_kind": "action",
            "target": "floor.refresh",
            "in_runbook": false
          }
        ]
      },
      {
        "step": 3,
        "target": {
          "kind": "line",
          "line": {
            "target": {
              "kind": "Line",
              "name": "security.kev-triage"
            }
          }
        },
        "procedure": "Procedure:security.kev-triage",
        "reads": [
          {
            "node_id": "watched",
            "query": "security.watched_vulnerabilities",
            "claim_types": [
              "security.component.affected_by",
              "security.occurrence.component",
              "security.occurrence.scope",
              "security.vulnerability.cve_id"
            ],
            "subject_kinds": [
              "security.component",
              "security.occurrence",
              "security.vulnerability"
            ],
            "key_claim_types": [
              "security.component.purl",
              "security.occurrence.component",
              "security.occurrence.inventory",
              "security.vulnerability.cve_id"
            ],
            "late": false
          }
        ],
        "writes": [
          {
            "node_id": "write",
            "subject_kind": "security.vulnerability",
            "creates_subjects": false,
            "claim_types": [
              "security.vulnerability.kev_date_added",
              "security.vulnerability.kev_due_date",
              "security.vulnerability.kev_ransomware_use",
              "security.vulnerability.listed_in"
            ],
            "creates_object_kinds": [],
            "judges_absence": true
          }
        ],
        "calls": [
          {
            "node_id": "catalog",
            "slot": "fetch",
            "signature_in": "web.fetch.request@1",
            "signature_out": "web.fetch.result@1",
            "effect": "external_read",
            "build": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
            "operation": "web.fetch",
            "captures": [
              "security.kev-catalog"
            ]
          }
        ],
        "authority": {
          "max_authority": "settle",
          "mandates": [
            "ProcedureMandate:security.kev-triage-propose",
            "ProcedureMandate:security.kev-triage-settle"
          ],
          "grants": "settle",
          "settles": [
            {
              "claim_type": "security.vulnerability.kev_date_added",
              "changes": [
                {
                  "change": "create",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "revise",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "retire",
                  "basis": [
                    "absence"
                  ]
                }
              ],
              "binding_subject_role": "subject"
            },
            {
              "claim_type": "security.vulnerability.kev_due_date",
              "changes": [
                {
                  "change": "create",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "revise",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "retire",
                  "basis": [
                    "absence"
                  ]
                }
              ],
              "binding_subject_role": "subject"
            },
            {
              "claim_type": "security.vulnerability.kev_ransomware_use",
              "changes": [
                {
                  "change": "create",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "revise",
                  "basis": [
                    "extracted"
                  ]
                }
              ],
              "binding_subject_role": "subject"
            },
            {
              "claim_type": "security.vulnerability.listed_in",
              "changes": [
                {
                  "change": "create",
                  "basis": [
                    "extracted",
                    "absence"
                  ]
                },
                {
                  "change": "revise",
                  "basis": [
                    "extracted",
                    "absence"
                  ]
                }
              ],
              "binding_subject_role": "subject"
            }
          ],
          "settles_creation": [],
          "subjects": "expected",
          "conditional": false,
          "review_gaps": [
            {
              "claim_type": "security.vulnerability.listed_in",
              "change": "retire",
              "basis": "absence",
              "term": "change_kind"
            },
            {
              "claim_type": "security.vulnerability.listed_in",
              "change": "create",
              "term": "basis"
            },
            {
              "claim_type": "security.vulnerability.listed_in",
              "change": "revise",
              "term": "basis"
            }
          ],
          "proposes": [
            "security.vulnerability.listed_in"
          ],
          "proposes_creation": [],
          "may_stop_run": true
        },
        "cascades": [
          {
            "trigger": "Trigger:floor-refresh",
            "schedule": "generation_accepted",
            "target_kind": "action",
            "target": "floor.refresh",
            "in_runbook": false
          }
        ]
      },
      {
        "step": 4,
        "target": {
          "kind": "line",
          "line": {
            "target": {
              "kind": "Line",
              "name": "security.epss-triage"
            }
          }
        },
        "procedure": "Procedure:security.epss-triage",
        "reads": [
          {
            "node_id": "watched",
            "query": "security.watched_vulnerabilities",
            "claim_types": [
              "security.component.affected_by",
              "security.occurrence.component",
              "security.occurrence.scope",
              "security.vulnerability.cve_id"
            ],
            "subject_kinds": [
              "security.component",
              "security.occurrence",
              "security.vulnerability"
            ],
            "key_claim_types": [
              "security.component.purl",
              "security.occurrence.component",
              "security.occurrence.inventory",
              "security.vulnerability.cve_id"
            ],
            "late": false
          },
          {
            "node_id": "watch_keys",
            "query": "security.watched_cve_keys",
            "claim_types": [
              "security.component.affected_by",
              "security.occurrence.component",
              "security.occurrence.scope",
              "security.vulnerability.cve_id"
            ],
            "subject_kinds": [
              "security.component",
              "security.occurrence",
              "security.vulnerability"
            ],
            "key_claim_types": [
              "security.component.purl",
              "security.occurrence.component",
              "security.occurrence.inventory",
              "security.vulnerability.cve_id"
            ],
            "late": false
          }
        ],
        "writes": [
          {
            "node_id": "write",
            "subject_kind": "security.vulnerability",
            "creates_subjects": false,
            "claim_types": [
              "security.vulnerability.epss_percentile",
              "security.vulnerability.epss_score",
              "security.vulnerability.epss_score_date"
            ],
            "creates_object_kinds": [],
            "judges_absence": false
          }
        ],
        "calls": [
          {
            "node_id": "scores_api",
            "slot": "fetch",
            "signature_in": "web.fetch.request@1",
            "signature_out": "web.fetch.result@1",
            "effect": "external_read",
            "build": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
            "operation": "web.fetch",
            "captures": [
              "security.epss-scores"
            ]
          }
        ],
        "authority": {
          "max_authority": "settle",
          "mandates": [
            "ProcedureMandate:security.epss-triage-propose",
            "ProcedureMandate:security.epss-triage-settle"
          ],
          "grants": "settle",
          "settles": [
            {
              "claim_type": "security.vulnerability.epss_percentile",
              "changes": [
                {
                  "change": "create",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "revise",
                  "basis": [
                    "extracted"
                  ]
                }
              ],
              "binding_subject_role": "subject"
            },
            {
              "claim_type": "security.vulnerability.epss_score",
              "changes": [
                {
                  "change": "create",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "revise",
                  "basis": [
                    "extracted"
                  ]
                }
              ],
              "binding_subject_role": "subject"
            },
            {
              "claim_type": "security.vulnerability.epss_score_date",
              "changes": [
                {
                  "change": "create",
                  "basis": [
                    "extracted"
                  ]
                },
                {
                  "change": "revise",
                  "basis": [
                    "extracted"
                  ]
                }
              ],
              "binding_subject_role": "subject"
            }
          ],
          "settles_creation": [],
          "subjects": "expected",
          "conditional": false,
          "review_gaps": [],
          "proposes": [],
          "proposes_creation": [],
          "may_stop_run": false
        },
        "cascades": [
          {
            "trigger": "Trigger:floor-refresh",
            "schedule": "generation_accepted",
            "target_kind": "action",
            "target": "floor.refresh",
            "in_runbook": false
          }
        ]
      }
    ],
    "order_problems": []
  }
});

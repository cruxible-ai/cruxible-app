// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query c2b0f669
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/query",
  "body": {
    "kind": "security.vulnerability",
    "select": [
      "security.vulnerability.cve_id",
      "security.vulnerability.epss_percentile",
      "security.vulnerability.epss_score",
      "security.vulnerability.epss_score_date",
      "security.vulnerability.kev_date_added",
      "security.vulnerability.kev_due_date",
      "security.vulnerability.kev_ransomware_use",
      "security.vulnerability.listed_in"
    ],
    "claims": true,
    "limit": 100,
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    }
  },
  "response": {
    "tag": "playbill-query-page-v1",
    "kind": "security.vulnerability",
    "columns": [
      {
        "name": "cve_id",
        "predicate": "security.vulnerability.cve_id",
        "type": "string",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "epss_percentile",
        "predicate": "security.vulnerability.epss_percentile",
        "type": "decimal",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "epss_score",
        "predicate": "security.vulnerability.epss_score",
        "type": "decimal",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "epss_score_date",
        "predicate": "security.vulnerability.epss_score_date",
        "type": "date",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "kev_date_added",
        "predicate": "security.vulnerability.kev_date_added",
        "type": "date",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "kev_due_date",
        "predicate": "security.vulnerability.kev_due_date",
        "type": "date",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "kev_ransomware_use",
        "predicate": "security.vulnerability.kev_ransomware_use",
        "type": "enum",
        "members": [
          "Known",
          "Unknown"
        ],
        "cardinality": "one"
      },
      {
        "name": "listed_in",
        "predicate": "security.vulnerability.listed_in",
        "type": "subject<security.catalog>",
        "members": null,
        "cardinality": "many"
      }
    ],
    "rows": [
      {
        "subject": "security.vulnerability/cve-2021-44228",
        "subject_id": "cve-2021-44228",
        "cve_id": "CVE-2021-44228",
        "epss_percentile": "1",
        "epss_score": "0.99999",
        "epss_score_date": "2026-11-02",
        "kev_date_added": "2021-12-10",
        "kev_due_date": "2021-12-24",
        "kev_ransomware_use": "Known",
        "listed_in": [
          "security.catalog/cisa-kev"
        ],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-9eff1367310e902cdc436efb18e64336",
              "value": "CVE-2021-44228",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-1817b5bf41dbacad208487b99a2a275d",
              "value": "1",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-df2e21236111d6da62b2da4022a65fdb",
              "value": "0.99999",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-c79e9d236b888bada73738d2f0dc0e1d",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_date_added": [
            {
              "claim": "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
              "value": "2021-12-10",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_due_date": [
            {
              "claim": "CLM-0c497ce6493bc6eea94579dbc0e294fa",
              "value": "2021-12-24",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_ransomware_use": [
            {
              "claim": "CLM-7d0e73b0e07c961fb1024d98d258f43a",
              "value": "Known",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "listed_in": [
            {
              "claim": "CLM-2383f94f7b8c2128e24ea365a8f1e736",
              "value": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2021-44832",
        "subject_id": "cve-2021-44832",
        "cve_id": "CVE-2021-44832",
        "epss_percentile": null,
        "epss_score": null,
        "epss_score_date": null,
        "kev_date_added": null,
        "kev_due_date": null,
        "kev_ransomware_use": null,
        "listed_in": [],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-68b8ad23bbe030671b6b79a0cff74ff9",
              "value": "CVE-2021-44832",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ]
        },
        "nones": {
          "listed_in": [
            {
              "claim": "CLM-35d6991a854e209eb6b1690c901dede0",
              "of": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2021-45046",
        "subject_id": "cve-2021-45046",
        "cve_id": "CVE-2021-45046",
        "epss_percentile": null,
        "epss_score": null,
        "epss_score_date": null,
        "kev_date_added": null,
        "kev_due_date": null,
        "kev_ransomware_use": null,
        "listed_in": [],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-6560384e235d3930b9b35de1d980518e",
              "value": "CVE-2021-45046",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ]
        },
        "nones": {
          "listed_in": [
            {
              "claim": "CLM-c72168eed420b1b72725188c23a0b32a",
              "of": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2021-45105",
        "subject_id": "cve-2021-45105",
        "cve_id": "CVE-2021-45105",
        "epss_percentile": null,
        "epss_score": null,
        "epss_score_date": null,
        "kev_date_added": null,
        "kev_due_date": null,
        "kev_ransomware_use": null,
        "listed_in": [],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-ee9fdb042bee8315276c80153e402b49",
              "value": "CVE-2021-45105",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ]
        },
        "nones": {
          "listed_in": [
            {
              "claim": "CLM-0955dffd8ac7482b3b2dfb54ebaaf39d",
              "of": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2025-68161",
        "subject_id": "cve-2025-68161",
        "cve_id": "CVE-2025-68161",
        "epss_percentile": null,
        "epss_score": null,
        "epss_score_date": null,
        "kev_date_added": null,
        "kev_due_date": null,
        "kev_ransomware_use": null,
        "listed_in": [],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-49cde40ee49e69a461b75ed1cf8471c4",
              "value": "CVE-2025-68161",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ]
        },
        "nones": {
          "listed_in": [
            {
              "claim": "CLM-32c458928f64935b2e56d78d29834a69",
              "of": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2026-34477",
        "subject_id": "cve-2026-34477",
        "cve_id": "CVE-2026-34477",
        "epss_percentile": null,
        "epss_score": null,
        "epss_score_date": null,
        "kev_date_added": null,
        "kev_due_date": null,
        "kev_ransomware_use": null,
        "listed_in": [],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-0e6c4d9b01892c8050e62029ae961f1d",
              "value": "CVE-2026-34477",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ]
        },
        "nones": {
          "listed_in": [
            {
              "claim": "CLM-76f60748854f8fe0e4b701d4d9555417",
              "of": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2026-34479",
        "subject_id": "cve-2026-34479",
        "cve_id": "CVE-2026-34479",
        "epss_percentile": null,
        "epss_score": null,
        "epss_score_date": null,
        "kev_date_added": null,
        "kev_due_date": null,
        "kev_ransomware_use": null,
        "listed_in": [],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-075404ffec9775e1fb4928ac66596f62",
              "value": "CVE-2026-34479",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ]
        },
        "nones": {
          "listed_in": [
            {
              "claim": "CLM-b975b2a8663904b11048323f620948ea",
              "of": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2026-34480",
        "subject_id": "cve-2026-34480",
        "cve_id": "CVE-2026-34480",
        "epss_percentile": null,
        "epss_score": null,
        "epss_score_date": null,
        "kev_date_added": null,
        "kev_due_date": null,
        "kev_ransomware_use": null,
        "listed_in": [],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-420ea3f896570211129c42f3b1dfa5df",
              "value": "CVE-2026-34480",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ]
        },
        "nones": {
          "listed_in": [
            {
              "claim": "CLM-192c23be74b94747f2483672df1690f0",
              "of": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2026-49844",
        "subject_id": "cve-2026-49844",
        "cve_id": "CVE-2026-49844",
        "epss_percentile": null,
        "epss_score": null,
        "epss_score_date": null,
        "kev_date_added": null,
        "kev_due_date": null,
        "kev_ransomware_use": null,
        "listed_in": [],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-44ef6ae26ec37a36ef086b3cd329b469",
              "value": "CVE-2026-49844",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ]
        },
        "nones": {
          "listed_in": [
            {
              "claim": "CLM-451efce0eb50eafd9c199f90f8b74897",
              "of": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      }
    ],
    "truncated": false,
    "next_cursor": null,
    "remaining": 0,
    "capped": [],
    "notes": [],
    "receipt": {
      "mode": "inline",
      "spec_digest": "sha256:3012040abab31499f882c9fd663b9324ce9afb76a2e1fa5967127ff41a104a50",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
        "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
        "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "evaluation_time": "2026-11-08T19:47:53.666733Z"
    }
  }
});

// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch e67c8136
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.epss-triage",
      "Line:security.kev-triage",
      "Line:security.osv-query",
      "Line:security.sbom-import.app"
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
        "ref": "Line:security.epss-triage",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.epss-triage",
          "identity_digest": "sha256:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
          "lifecycle": "live",
          "procedure": "Procedure:security.epss-triage",
          "authority": "settle",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.epss-daily",
              "version": 1,
              "fires": "on cron 30 14 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "triggers_inactive": "not enabled",
          "occurrence_epoch": 1,
          "enablements": [],
          "enablements_total": 0,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
              "procedure": "Procedure:security.epss-triage",
              "status": "succeeded",
              "started_at": "2026-11-07T18:00:00Z",
              "line": "Line:security.epss-triage",
              "nodes_done": 5
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.epss-triage\")",
            "cx.get(\"Trigger:security.epss-daily\")",
            "cx.get(\"ProcedureRun:RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165\")",
            "cx.get(\"Line:security.epss-triage\", detail=\"history\")"
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
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "30e90cc6ad34",
            "generation": 22
          },
          "fields": [
            "triggers_inactive",
            "enablements",
            "enablements_total",
            "due",
            "waiting",
            "occurrences",
            "recent_runs",
            "runs_total"
          ]
        },
        "evaluation_time": "2026-11-07T22:23:00.474057Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.kev-triage",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.kev-triage",
          "identity_digest": "sha256:49312bd14c1ec1b55a2c30cf3158b7f6a17180abad247d8c935714fdab9381b9",
          "lifecycle": "live",
          "procedure": "Procedure:security.kev-triage",
          "authority": "settle",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.kev-daily",
              "version": 1,
              "fires": "on cron 15 18 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "triggers_inactive": "not enabled",
          "occurrence_epoch": 1,
          "enablements": [],
          "enablements_total": 0,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-867726d010ecc009ddce0306bfe1d2c23e4162fd9f5ea31ad9862327cfd11cd8",
              "procedure": "Procedure:security.kev-triage",
              "status": "succeeded",
              "started_at": "2026-11-07T18:05:00Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 4
            },
            {
              "run": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
              "procedure": "Procedure:security.kev-triage",
              "status": "succeeded",
              "started_at": "2026-11-07T18:00:00Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 4
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.kev-triage\")",
            "cx.get(\"Trigger:security.kev-daily\")",
            "cx.get(\"ProcedureRun:RUN-867726d010ecc009ddce0306bfe1d2c23e4162fd9f5ea31ad9862327cfd11cd8\")",
            "cx.get(\"Line:security.kev-triage\", detail=\"history\")"
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
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "30e90cc6ad34",
            "generation": 22
          },
          "fields": [
            "triggers_inactive",
            "enablements",
            "enablements_total",
            "due",
            "waiting",
            "occurrences",
            "recent_runs",
            "runs_total"
          ]
        },
        "evaluation_time": "2026-11-07T22:23:00.485154Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.osv-query",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.osv-query",
          "identity_digest": "sha256:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
          "lifecycle": "live",
          "procedure": "Procedure:security.osv-query",
          "authority": "settle",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.osv-daily",
              "version": 1,
              "fires": "on cron 0 14 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "triggers_inactive": "not enabled",
          "occurrence_epoch": 1,
          "enablements": [],
          "enablements_total": 0,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
              "procedure": "Procedure:security.osv-query",
              "status": "succeeded",
              "started_at": "2026-11-07T18:00:00Z",
              "line": "Line:security.osv-query",
              "nodes_done": 5
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.osv-query\")",
            "cx.get(\"Trigger:security.osv-daily\")",
            "cx.get(\"ProcedureRun:RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051\")",
            "cx.get(\"Line:security.osv-query\", detail=\"history\")"
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
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "30e90cc6ad34",
            "generation": 22
          },
          "fields": [
            "triggers_inactive",
            "enablements",
            "enablements_total",
            "due",
            "waiting",
            "occurrences",
            "recent_runs",
            "runs_total"
          ]
        },
        "evaluation_time": "2026-11-07T22:23:00.498674Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.sbom-import.app",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.sbom-import.app",
          "identity_digest": "sha256:805e61032fd79657f0b9d0b1d01df3e795432dec987fd555a098c8f0ff458ec7",
          "lifecycle": "live",
          "procedure": "Procedure:security.sbom-import",
          "authority": "settle",
          "trigger": "manual",
          "triggers": [],
          "triggers_total": 0,
          "occurrence_epoch": 1,
          "enablements": [],
          "enablements_total": 0,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
              "procedure": "Procedure:security.sbom-import",
              "status": "succeeded",
              "started_at": "2026-11-07T18:00:00Z",
              "line": "Line:security.sbom-import.app",
              "nodes_done": 4
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.sbom-import\")",
            "cx.get(\"ProcedureRun:RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5\")",
            "cx.get(\"Line:security.sbom-import.app\", detail=\"history\")"
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
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "30e90cc6ad34",
            "generation": 22
          },
          "fields": [
            "triggers_inactive",
            "enablements",
            "enablements_total",
            "due",
            "waiting",
            "occurrences",
            "recent_runs",
            "runs_total"
          ]
        },
        "evaluation_time": "2026-11-07T22:23:00.509263Z"
      }
    ]
  }
});

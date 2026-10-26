// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 1fdd0ba7
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.credential-import",
      "Line:security.cve-applicability",
      "Line:security.epss-daily",
      "Line:security.epss-triage",
      "Line:security.harden",
      "Line:security.inventory-import.prod",
      "Line:security.kev-attention",
      "Line:security.kev-daily",
      "Line:security.kev-triage",
      "Line:security.osv-applicability",
      "Line:security.registry-parse.cruxible",
      "Line:security.registry-parse.cruxible-client",
      "Line:security.registry-pull.cruxible",
      "Line:security.registry-pull.cruxible-client",
      "Line:security.repo-parse.cruxible-ci",
      "Line:security.repo-pull.cruxible-ci",
      "Line:security.sarif-attention.cruxible",
      "Line:security.sarif-import.cruxible",
      "Line:security.sbom-import"
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
        "ref": "Line:security.credential-import",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.credential-import",
          "identity_digest": "sha256:31f8f43a095582547d314f51cf18432a6d05069ad411af08ac86635bad3fe14e",
          "lifecycle": "live",
          "procedure": "Procedure:security.credential-import",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.credential-landed",
              "version": 1,
              "fires": "when CaptureContract:security.file-erasable-v1 from security.credential-state lands"
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
          "recent_runs": [],
          "runs_total": 0,
          "next": [
            "cx.get(\"Procedure:security.credential-import\")",
            "cx.get(\"Trigger:security.credential-landed\")",
            "cx.get(\"Line:security.credential-import\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.625805Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.cve-applicability",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.cve-applicability",
          "identity_digest": "sha256:f9880a610fa060e85512a2557a96454c13fb0d72b2467f03fc19cbc9cda98e58",
          "lifecycle": "live",
          "procedure": "Procedure:security.cve-applicability",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.cve-landed",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from cve.record lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "de6b21bf5d4d4912b207474aa7eb7ded",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:59.871797Z",
              "line_artifact_digest": "sha256:f185b16622f7f064ea0de25cb6d03ce3a5a9e0a5f9d4939af8e25febfbe6b9ed",
              "triggers": [
                {
                  "trigger": "Trigger:security.cve-landed",
                  "artifact_digest": "sha256:b7ba3b6d5da9b6fc6c9f38628d4cd2d2a0ff5e360854f2ab3d9a724c32fb3c2d"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:25.454444Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [],
          "runs_total": 0,
          "next": [
            "cx.get(\"Procedure:security.cve-applicability\")",
            "cx.get(\"Trigger:security.cve-landed\")",
            "cx.get(\"Line:security.cve-applicability\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.645757Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.epss-daily",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.epss-daily",
          "identity_digest": "sha256:dca0de9ff0cc644a69cb568dd0ecf8f3dcff93d1264ea9a89310323c034dcc3d",
          "lifecycle": "live",
          "procedure": "Procedure:security.epss-acquire",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.epss-daily",
              "version": 1,
              "fires": "on cron 45 13 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "d6263dee05db4d579fae00f97e4f8987",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:54.349376Z",
              "line_artifact_digest": "sha256:588bb1d8c9f02eddd6262110e60930b6aa045d0a172b8290f63d1de792b71462",
              "triggers": [
                {
                  "trigger": "Trigger:security.epss-daily",
                  "artifact_digest": "sha256:ec44e55cbe3de9102d4c2aeda5856170d1d63a6ba39a5f74ab3fc95e7cae2d4b"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:26.912790Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a",
              "procedure": "Procedure:security.epss-acquire",
              "status": "succeeded",
              "started_at": "2026-10-26T17:45:37.203290Z",
              "line": "Line:security.epss-daily",
              "nodes_done": 3
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.epss-acquire\")",
            "cx.get(\"Trigger:security.epss-daily\")",
            "cx.get(\"ProcedureRun:RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a\")",
            "cx.get(\"Line:security.epss-daily\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.681089Z"
      },
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
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.epss-landed",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from first.epss.daily lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "c3b5bc197bcf4ef9a25ba23c2f047dbc",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:55.707001Z",
              "line_artifact_digest": "sha256:7ae51c543936e4d2b0d28194539b9a99fb7a513fded08b7db0eca82a622c449f",
              "triggers": [
                {
                  "trigger": "Trigger:security.epss-landed",
                  "artifact_digest": "sha256:2261d459e36a532e48dcf94cff0b63791bee743c5e891259f9450de0256fbeef"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:25.454444Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-eb4bb9536167f2f537efb359f50cac888bd843b69f452c30e2d6149cb2d564cc",
              "procedure": "Procedure:security.epss-triage",
              "status": "succeeded",
              "started_at": "2026-10-26T17:45:39.755641Z",
              "line": "Line:security.epss-triage",
              "nodes_done": 6
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.epss-triage\")",
            "cx.get(\"Trigger:security.epss-landed\")",
            "cx.get(\"ProcedureRun:RUN-eb4bb9536167f2f537efb359f50cac888bd843b69f452c30e2d6149cb2d564cc\")",
            "cx.get(\"Line:security.epss-triage\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.739178Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.harden",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.harden",
          "identity_digest": "sha256:24678f9be989053275627387cff7ac3590db5842a3399180fce2a690fcadaed6",
          "lifecycle": "live",
          "procedure": "Procedure:security.harden",
          "authority": "observe",
          "trigger": "capture_landing+cron",
          "triggers": [
            {
              "trigger": "Trigger:security.harden-daily",
              "version": 1,
              "fires": "on cron 40 7 * * * (UTC)"
            },
            {
              "trigger": "Trigger:security.harden-on-registry",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from pypi.release lands"
            },
            {
              "trigger": "Trigger:security.harden-on-snapshot",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from github.repo.snapshot lands"
            }
          ],
          "triggers_total": 3,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "485512c620e64750a6b7d4930cbcc65e",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T18:55:49.534529Z",
              "line_artifact_digest": "sha256:b07e004fe3e424bd0469806307d2ef1b5d172a6180fbafd05003e19492e0ae8f",
              "triggers": [
                {
                  "trigger": "Trigger:security.harden-daily",
                  "artifact_digest": "sha256:1ee5316b4f982de5aeeb89ac360e7888a1f04825d4fc178a53e63a47a7c79f50"
                },
                {
                  "trigger": "Trigger:security.harden-on-registry",
                  "artifact_digest": "sha256:38e72aa0ad52d85e3b57cbd08071454e6548dafe5cf08f698641c9d63e5b722d"
                },
                {
                  "trigger": "Trigger:security.harden-on-snapshot",
                  "artifact_digest": "sha256:4fa25697d0e25db6f3aa8077613f88316a00c4162d6af617b4df21f3de261eb1"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:26.912790Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-1306b1ca79c33c1a4d038be97d06f580b3a3017b0716ef8108296081def0bbb5",
              "procedure": "Procedure:security.harden",
              "status": "halted",
              "started_at": "2026-10-26T18:57:16.511427Z",
              "line": "Line:security.harden",
              "nodes_done": 10
            },
            {
              "run": "RUN-5d3534afeb45e572418f799e105df573959b8a29dc19ae4fc253bd5614f858f0",
              "procedure": "Procedure:security.harden",
              "status": "halted",
              "started_at": "2026-10-26T18:56:41.565904Z",
              "line": "Line:security.harden",
              "nodes_done": 10
            },
            {
              "run": "RUN-b31e8911976b988ce1828ad81e2e7b750600845faca6dcd40c68d9f92af91cf7",
              "procedure": "Procedure:security.harden",
              "status": "halted",
              "started_at": "2026-10-26T18:55:56.601192Z",
              "line": "Line:security.harden",
              "nodes_done": 10
            },
            {
              "run": "RUN-1e3a43f6cea942d856a1ca86fe98abd96b6be59d033100560b18a33f54187530",
              "procedure": "Procedure:security.harden",
              "status": "halted",
              "started_at": "2026-10-26T18:55:53.263693Z",
              "line": "Line:security.harden",
              "nodes_done": 10
            }
          ],
          "runs_total": 4,
          "next": [
            "cx.get(\"Procedure:security.harden\")",
            "cx.get(\"Trigger:security.harden-daily\")",
            "cx.get(\"Trigger:security.harden-on-registry\")",
            "cx.get(\"Trigger:security.harden-on-snapshot\")",
            "cx.get(\"ProcedureRun:RUN-1306b1ca79c33c1a4d038be97d06f580b3a3017b0716ef8108296081def0bbb5\")",
            "cx.get(\"Line:security.harden\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.769240Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.inventory-import.prod",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.inventory-import.prod",
          "identity_digest": "sha256:b057578e328307698a20349faa118273295d07961ce388c0c72eaf4c362f7404",
          "lifecycle": "live",
          "procedure": "Procedure:security.inventory-import",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.inventory-landed.prod",
              "version": 1,
              "fires": "when CaptureContract:security.file-erasable-v1 from security.inventory lands"
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
          "recent_runs": [],
          "runs_total": 0,
          "next": [
            "cx.get(\"Procedure:security.inventory-import\")",
            "cx.get(\"Trigger:security.inventory-landed.prod\")",
            "cx.get(\"Line:security.inventory-import.prod\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.808740Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.kev-attention",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.kev-attention",
          "identity_digest": "sha256:3c7df3aece8e44880fd6ea9eb462d871b67f4d5bee0ebf066d240e723d939731",
          "lifecycle": "live",
          "procedure": "Procedure:security.kev-attention",
          "authority": "observe",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.kev-landed-attention",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from cisa.kev.catalog lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "5b1e43df4b54418994ee872c00506a58",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:52.979851Z",
              "line_artifact_digest": "sha256:ecd27ef4b7f50c5477c4583195f26c7e25b059f7e33b3c45b002f5e0025c89b8",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-landed-attention",
                  "artifact_digest": "sha256:aa8026cb0086b6ea8731c440ebcaabcbfafab6a9d90f3c064a65968e4bdd768d"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:25.454444Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-bbd28aacaabf3f368a57f6b656dcb3a3dd33617646ae0a3ef48b678d382ac193",
              "procedure": "Procedure:security.kev-attention",
              "status": "halted",
              "started_at": "2026-10-26T17:45:00.485914Z",
              "line": "Line:security.kev-attention",
              "nodes_done": 8
            },
            {
              "run": "RUN-06f7454fec93c61e4360c6c5765cbd79d19774a8c2446b2b465ba3dafcecc3a2",
              "procedure": "Procedure:security.kev-attention",
              "status": "halted",
              "started_at": "2026-10-26T17:43:16.664200Z",
              "line": "Line:security.kev-attention",
              "nodes_done": 8
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.kev-attention\")",
            "cx.get(\"Trigger:security.kev-landed-attention\")",
            "cx.get(\"ProcedureRun:RUN-bbd28aacaabf3f368a57f6b656dcb3a3dd33617646ae0a3ef48b678d382ac193\")",
            "cx.get(\"Line:security.kev-attention\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.820812Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.kev-daily",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.kev-daily",
          "identity_digest": "sha256:c63120b67657fb95a7398ef08bbc3527b2340d0d795518c4b4c83461cc69d8db",
          "lifecycle": "live",
          "procedure": "Procedure:security.fetch-observed",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.kev-daily",
              "version": 1,
              "fires": "on cron 17 14 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "888862d06b804729984064ec901128fc",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:50.168791Z",
              "line_artifact_digest": "sha256:77c0486751f41f1101f358f45c3827f80bd20cdd7253901a3c0a436bf38126c0",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-daily",
                  "artifact_digest": "sha256:0fe6682d943d02e536d1a394c1e4d2c13219e7350b4670d502c3a0d2f825b737"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:26.912790Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-c01771a062a728f414c8aa1ffdccba6f8baa1c7d478da86a946af2eeb3758bfe",
              "procedure": "Procedure:security.fetch-observed",
              "status": "succeeded",
              "started_at": "2026-10-26T17:44:58.871169Z",
              "line": "Line:security.kev-daily",
              "nodes_done": 3
            },
            {
              "run": "RUN-8174176bf9323d503a6ac8a2b0bde114fc9e21c0fe0d73e8f7d4bc004769c7f6",
              "procedure": "Procedure:security.fetch-observed",
              "status": "succeeded",
              "started_at": "2026-10-26T17:43:14.047494Z",
              "line": "Line:security.kev-daily",
              "nodes_done": 3
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.fetch-observed\")",
            "cx.get(\"Trigger:security.kev-daily\")",
            "cx.get(\"ProcedureRun:RUN-c01771a062a728f414c8aa1ffdccba6f8baa1c7d478da86a946af2eeb3758bfe\")",
            "cx.get(\"Line:security.kev-daily\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.840144Z"
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
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.kev-landed",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from cisa.kev.catalog lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "f286ab36ba9c4c269a48b399ecc028d8",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:51.568609Z",
              "line_artifact_digest": "sha256:088eb15c8e07f681bf97db3edeb31a184495535fc94ba1e7b75ae37f77e02b3d",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-landed",
                  "artifact_digest": "sha256:c4232c07e01b4d75e52f17970a8925e2da682927f933012f51db74ef2635c6e9"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:25.454444Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d",
              "procedure": "Procedure:security.kev-triage",
              "status": "succeeded",
              "started_at": "2026-10-26T17:45:00.485705Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 6
            },
            {
              "run": "RUN-61c63a47a47da7b01898a97644035315560f9dc596e53bcb6ba46925c8bfefb8",
              "procedure": "Procedure:security.kev-triage",
              "status": "halted",
              "started_at": "2026-10-26T17:43:16.664239Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 6
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.kev-triage\")",
            "cx.get(\"Trigger:security.kev-landed\")",
            "cx.get(\"ProcedureRun:RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d\")",
            "cx.get(\"Line:security.kev-triage\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.864967Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.osv-applicability",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.osv-applicability",
          "identity_digest": "sha256:4b3e9d71b33f4edc5a709bd8dd53f89a44dcf9c93f893799bae9cc9e6f39941e",
          "lifecycle": "live",
          "procedure": "Procedure:security.osv-applicability",
          "authority": "propose",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.osv-daily",
              "version": 1,
              "fires": "on cron 30 15 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "f3690c05a1e44564b0b1181bf320d9b3",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:58.484946Z",
              "line_artifact_digest": "sha256:eb856a6793aa03acc8699459abfc9d97ea066a7f11e66111e59a328ac52b281d",
              "triggers": [
                {
                  "trigger": "Trigger:security.osv-daily",
                  "artifact_digest": "sha256:c20629bba48c5c2545b71579083ac216a7ddd57ae37c6ccc0cb933768749a4ae"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:26.912790Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
              "procedure": "Procedure:security.osv-applicability",
              "status": "succeeded",
              "started_at": "2026-10-26T17:44:38.124878Z",
              "line": "Line:security.osv-applicability",
              "nodes_done": 9
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.osv-applicability\")",
            "cx.get(\"Trigger:security.osv-daily\")",
            "cx.get(\"ProcedureRun:RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8\")",
            "cx.get(\"Line:security.osv-applicability\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.884458Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-parse.cruxible",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.registry-parse.cruxible",
          "identity_digest": "sha256:e07e178926fbb86ab50ce200046795b155f0002ed10ad58252f335b475196bed",
          "lifecycle": "live",
          "procedure": "Procedure:security.registry-parse",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.registry-landed.cruxible",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from pypi.release lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "23b29cce56af464f9af3b6c05f2c3f85",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T18:55:48.087373Z",
              "line_artifact_digest": "sha256:a2a20db169057947b59d542bd8f7863a214756b0e309836f43517a2dbafe177e",
              "triggers": [
                {
                  "trigger": "Trigger:security.registry-landed.cruxible",
                  "artifact_digest": "sha256:7fdef53535c5cbadadfac2709c1d9706cfad8f90da3f3e54754f6d32b092d61e"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:25.454444Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-3ad7fb91dc2ab48cb491b6db76afecac4e83926713c4c80e161c9824fa98364a",
              "procedure": "Procedure:security.registry-parse",
              "status": "succeeded",
              "started_at": "2026-10-26T18:55:55.268912Z",
              "line": "Line:security.registry-parse.cruxible",
              "nodes_done": 7
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.registry-parse\")",
            "cx.get(\"Trigger:security.registry-landed.cruxible\")",
            "cx.get(\"ProcedureRun:RUN-3ad7fb91dc2ab48cb491b6db76afecac4e83926713c4c80e161c9824fa98364a\")",
            "cx.get(\"Line:security.registry-parse.cruxible\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.901472Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-parse.cruxible-client",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.registry-parse.cruxible-client",
          "identity_digest": "sha256:86e1fd12c4683a2dd9392792ca0b973be8bce70e2d0361a503e78860df6e2b7a",
          "lifecycle": "live",
          "procedure": "Procedure:security.registry-parse",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.registry-landed.cruxible-client",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from pypi.release lands"
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
          "recent_runs": [],
          "runs_total": 0,
          "next": [
            "cx.get(\"Procedure:security.registry-parse\")",
            "cx.get(\"Trigger:security.registry-landed.cruxible-client\")",
            "cx.get(\"Line:security.registry-parse.cruxible-client\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.914700Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-pull.cruxible",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.registry-pull.cruxible",
          "identity_digest": "sha256:9326934d523db3025df623266076d2279d41e45d3481896083bf71263c9c19f9",
          "lifecycle": "live",
          "procedure": "Procedure:security.registry-acquire",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.registry-pull.cruxible",
              "version": 1,
              "fires": "on cron 20 6 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "a976417c73b14b8793d856f0f856012e",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T18:55:46.471151Z",
              "line_artifact_digest": "sha256:380bd4f80b28b1a7ba73e1dfa1469d8fcb94b2471d2ca78d784c91d627d85375",
              "triggers": [
                {
                  "trigger": "Trigger:security.registry-pull.cruxible",
                  "artifact_digest": "sha256:760ba5a2b346b8ed09967a0de0f8cd5a16a8fbd0b2d5961ab220c572c569deb2"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:26.912790Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-da3a69b8af4e686e90b46090f761e0667ee23e9556667a489366e3f51c8f0842",
              "procedure": "Procedure:security.registry-acquire",
              "status": "succeeded",
              "started_at": "2026-10-26T18:55:53.778567Z",
              "line": "Line:security.registry-pull.cruxible",
              "nodes_done": 2
            },
            {
              "run": "RUN-8230ce4b96cdcbdc1e56fad27c222672c1fb2e50705047904b266c45bbe47f00",
              "procedure": "Procedure:security.registry-acquire",
              "status": "succeeded",
              "started_at": "2026-10-26T18:55:03.130184Z",
              "line": "Line:security.registry-pull.cruxible",
              "nodes_done": 2
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.registry-acquire\")",
            "cx.get(\"Trigger:security.registry-pull.cruxible\")",
            "cx.get(\"ProcedureRun:RUN-da3a69b8af4e686e90b46090f761e0667ee23e9556667a489366e3f51c8f0842\")",
            "cx.get(\"Line:security.registry-pull.cruxible\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.925725Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-pull.cruxible-client",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.registry-pull.cruxible-client",
          "identity_digest": "sha256:542eed13a0c775e99955442a4d2a9c5c327e4674b7de57ff63083440e9b86bbf",
          "lifecycle": "live",
          "procedure": "Procedure:security.registry-acquire",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.registry-pull.cruxible-client",
              "version": 1,
              "fires": "on cron 25 6 * * * (UTC)"
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
          "recent_runs": [],
          "runs_total": 0,
          "next": [
            "cx.get(\"Procedure:security.registry-acquire\")",
            "cx.get(\"Trigger:security.registry-pull.cruxible-client\")",
            "cx.get(\"Line:security.registry-pull.cruxible-client\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.942995Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.repo-parse.cruxible-ci",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.repo-parse.cruxible-ci",
          "identity_digest": "sha256:caba99083d262c808697cf95abfea2e8fac5032aff3a9b23da6d09a05b11df18",
          "lifecycle": "live",
          "procedure": "Procedure:security.repo-parse",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.repo-landed.cruxible-ci",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from github.repo.snapshot lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "55d248f4624d4a9a8a3dbce2389f53d9",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T18:55:44.963262Z",
              "line_artifact_digest": "sha256:56cfb04fe41988ab455ea5b6717ea6f7f2ccedc6f7db4399aa8d1c9d2dc5a0a7",
              "triggers": [
                {
                  "trigger": "Trigger:security.repo-landed.cruxible-ci",
                  "artifact_digest": "sha256:3dbdbc991f6f254f4d1c2fd2dd36c344725d34cf1e6dfabb4b7a9e9cc9d79f8a"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:25.454444Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-298f446ec6e0a6a2a857e80179c95a0850155cf6c9c2b64c90c07b84d18c30dc",
              "procedure": "Procedure:security.repo-parse",
              "status": "succeeded",
              "started_at": "2026-10-26T18:55:53.263624Z",
              "line": "Line:security.repo-parse.cruxible-ci",
              "nodes_done": 9
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.repo-parse\")",
            "cx.get(\"Trigger:security.repo-landed.cruxible-ci\")",
            "cx.get(\"ProcedureRun:RUN-298f446ec6e0a6a2a857e80179c95a0850155cf6c9c2b64c90c07b84d18c30dc\")",
            "cx.get(\"Line:security.repo-parse.cruxible-ci\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.952788Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.repo-pull.cruxible-ci",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.repo-pull.cruxible-ci",
          "identity_digest": "sha256:af6b8cc03795d4d21499fabdd0c64f783338dbf0ce5f0d02adb19ead87654a3c",
          "lifecycle": "live",
          "procedure": "Procedure:security.repo-acquire",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.repo-pull.cruxible-ci",
              "version": 1,
              "fires": "on cron 5 */6 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "39435fcd00b24c0fabd21a9e269a8bb8",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T18:55:43.421308Z",
              "line_artifact_digest": "sha256:fe8cf5e49faf3dbb6a7722d8dd80c4609f5ea345a18f5fbda9e571aebec39e71",
              "triggers": [
                {
                  "trigger": "Trigger:security.repo-pull.cruxible-ci",
                  "artifact_digest": "sha256:71f0b25651468feaae70058f9ffa4fd95a632de47059eba3efb97512b6b4d2fe"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:26.912790Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-015591a2bef054c81e50241813882b780f6543d52c65b80649bdf1e425ae6caf",
              "procedure": "Procedure:security.repo-acquire",
              "status": "succeeded",
              "started_at": "2026-10-26T18:55:50.984771Z",
              "line": "Line:security.repo-pull.cruxible-ci",
              "nodes_done": 2
            },
            {
              "run": "RUN-4e9a5a0432d4ba47d37d6fad3666e415dfb9aa22c1f2676f1fc8fbb3d5d85bd9",
              "procedure": "Procedure:security.repo-acquire",
              "status": "succeeded",
              "started_at": "2026-10-26T18:54:59.686181Z",
              "line": "Line:security.repo-pull.cruxible-ci",
              "nodes_done": 2
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.repo-acquire\")",
            "cx.get(\"Trigger:security.repo-pull.cruxible-ci\")",
            "cx.get(\"ProcedureRun:RUN-015591a2bef054c81e50241813882b780f6543d52c65b80649bdf1e425ae6caf\")",
            "cx.get(\"Line:security.repo-pull.cruxible-ci\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.970136Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.sarif-attention.cruxible",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.sarif-attention.cruxible",
          "identity_digest": "sha256:0003e6bc96cf7491df58721c7bc837c56d0c7c69ac20f52411655f7bba33904f",
          "lifecycle": "live",
          "procedure": "Procedure:security.sarif-attention",
          "authority": "observe",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.sarif-landed-attention.cruxible",
              "version": 1,
              "fires": "when CaptureContract:security.file-v1 from sarif.log lands"
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
          "recent_runs": [],
          "runs_total": 0,
          "next": [
            "cx.get(\"Procedure:security.sarif-attention\")",
            "cx.get(\"Trigger:security.sarif-landed-attention.cruxible\")",
            "cx.get(\"Line:security.sarif-attention.cruxible\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.987450Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.sarif-import.cruxible",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.sarif-import.cruxible",
          "identity_digest": "sha256:7f4254a3fa8d81b7b1b3bc5032132f4cdb4cebb67f1a980ad98c01d88e8d7f5b",
          "lifecycle": "live",
          "procedure": "Procedure:security.sarif-import",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.sarif-landed.cruxible",
              "version": 1,
              "fires": "when CaptureContract:security.file-v1 from sarif.log lands"
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
          "recent_runs": [],
          "runs_total": 0,
          "next": [
            "cx.get(\"Procedure:security.sarif-import\")",
            "cx.get(\"Trigger:security.sarif-landed.cruxible\")",
            "cx.get(\"Line:security.sarif-import.cruxible\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:11.998137Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.sbom-import",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.sbom-import",
          "identity_digest": "sha256:4a7eb19ffccd074be6ff2e6bffe701d397872ac11c239d8baaa953442acaad27",
          "lifecycle": "live",
          "procedure": "Procedure:security.sbom-import",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.sbom-landed",
              "version": 1,
              "fires": "when CaptureContract:security.file-v1 from cyclonedx.sbom lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "48f270d1317b4fbcbb7b8b9b076fa451",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:57.082820Z",
              "line_artifact_digest": "sha256:899eaacadaf6f56021bcfdaa8955836df493456cac34c06da1da7d65f3e69392",
              "triggers": [
                {
                  "trigger": "Trigger:security.sbom-landed",
                  "artifact_digest": "sha256:1e2c1c393021f2d267f02da632ff25a7fdbffc0ad91072d4a082287d509a2852"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:25.454444Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1",
              "procedure": "Procedure:security.sbom-import",
              "status": "succeeded",
              "started_at": "2026-10-26T17:43:01.517331Z",
              "line": "Line:security.sbom-import",
              "nodes_done": 6
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.sbom-import\")",
            "cx.get(\"Trigger:security.sbom-landed\")",
            "cx.get(\"ProcedureRun:RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1\")",
            "cx.get(\"Line:security.sbom-import\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:12.010455Z"
      }
    ]
  }
});

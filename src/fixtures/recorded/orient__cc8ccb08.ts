// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 0a0f2311
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
    "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
    "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
    "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07",
    "surface": "sdk",
    "section": "pins",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_d8e6dcb48e6a4d0d",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "generation": 10,
    "accepted_at": "2026-11-03T00:58:54.573196Z",
    "evaluation_time": "2026-11-03T02:20:47.885357Z",
    "section": "pins",
    "pins": [
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.coordinator-claim-self-source-v1"
      },
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.coordinator-proposer-observed-v1"
      },
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.coordinator-retained-cas-v1"
      },
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "commitment-canonicalizer",
        "target": "Contract:sha256-bytes-v1"
      },
      {
        "source": "CaptureContract:security.epss-scores",
        "role": "coordinate-schema",
        "target": "Contract:http-response-v1"
      },
      {
        "source": "CaptureContract:security.epss-scores",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.epss-scores",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "CaptureContract:security.epss-scores",
        "role": "replay-policy",
        "target": "Contract:playbill.external.retained-selection-replay-v1"
      },
      {
        "source": "CaptureContract:security.epss-scores",
        "role": "commitment-canonicalizer",
        "target": "Contract:sha256-bytes-v1"
      },
      {
        "source": "CaptureContract:security.epss-scores",
        "role": "selector-schema",
        "target": "Contract:whole-response-v1"
      },
      {
        "source": "CaptureContract:security.kev-catalog",
        "role": "coordinate-schema",
        "target": "Contract:http-response-v1"
      },
      {
        "source": "CaptureContract:security.kev-catalog",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.kev-catalog",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "CaptureContract:security.kev-catalog",
        "role": "replay-policy",
        "target": "Contract:playbill.external.retained-selection-replay-v1"
      },
      {
        "source": "CaptureContract:security.kev-catalog",
        "role": "commitment-canonicalizer",
        "target": "Contract:sha256-bytes-v1"
      },
      {
        "source": "CaptureContract:security.kev-catalog",
        "role": "selector-schema",
        "target": "Contract:whole-response-v1"
      },
      {
        "source": "ClaimType:security.catalog.catalog_id",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.cve_id",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.epss_percentile",
        "role": "capture-contract",
        "target": "CaptureContract:security.epss-scores",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.epss_score",
        "role": "capture-contract",
        "target": "CaptureContract:security.epss-scores",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.epss_score_date",
        "role": "capture-contract",
        "target": "CaptureContract:security.epss-scores",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_date_added",
        "role": "capture-contract",
        "target": "CaptureContract:security.kev-catalog",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_due_date",
        "role": "capture-contract",
        "target": "CaptureContract:security.kev-catalog",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_ransomware_use",
        "role": "capture-contract",
        "target": "CaptureContract:security.kev-catalog",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.listed_in",
        "role": "capture-contract",
        "target": "CaptureContract:security.kev-catalog",
        "current": true
      },
      {
        "source": "ClaimType:semantic.alias",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:semantic.distinct_from",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "Line:security.epss-triage",
        "role": "procedure",
        "target": "Procedure:security.epss-triage",
        "current": true
      },
      {
        "source": "Line:security.epss-triage",
        "role": "provider",
        "target": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "current": true
      },
      {
        "source": "Line:security.kev-triage",
        "role": "procedure",
        "target": "Procedure:security.kev-triage",
        "current": true
      },
      {
        "source": "Line:security.kev-triage",
        "role": "provider",
        "target": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "capture-contract",
        "target": "CaptureContract:security.epss-scores",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score_date",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract",
        "target": "Contract:security.epss-row/v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract-in",
        "target": "Contract:security.epss-triage.input/v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract-out",
        "target": "Contract:security.epss-triage.output/v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "parameter-contract",
        "target": "Contract:security.epss-triage.params/v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract",
        "target": "Contract:web.fetch.request/v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract",
        "target": "Contract:web.fetch.result/v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "capture-contract",
        "target": "CaptureContract:security.kev-catalog",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_date_added",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_ransomware_use",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.listed_in",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract",
        "target": "Contract:security.kev-record/v1",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract-in",
        "target": "Contract:security.kev-triage.input/v1",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract-out",
        "target": "Contract:security.kev-triage.output/v1",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "parameter-contract",
        "target": "Contract:security.kev-triage.params/v1",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract",
        "target": "Contract:web.fetch.request/v1",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract",
        "target": "Contract:web.fetch.result/v1",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-propose",
        "role": "line",
        "target": "Line:security.epss-triage",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score_date",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-settle",
        "role": "line",
        "target": "Line:security.epss-triage",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-propose",
        "role": "line",
        "target": "Line:security.kev-triage",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_date_added",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_ransomware_use",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.listed_in",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "line",
        "target": "Line:security.kev-triage",
        "current": true
      },
      {
        "source": "Provider:cruxible-builtin",
        "role": "contract",
        "target": "Contract:workspace.file.refusal.invalid_parameter/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-builtin",
        "role": "contract",
        "target": "Contract:workspace.file.refusal.mismatched_lengths/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-builtin",
        "role": "contract",
        "target": "Contract:workspace.file.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-builtin",
        "role": "contract",
        "target": "Contract:workspace.file.request/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-builtin",
        "role": "contract",
        "target": "Contract:workspace.file.result/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:search.web.refusal.cross_origin_credentialed_redirect/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:search.web.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:search.web.refusal.redirect_limit/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:search.web.refusal.undeclared_instance/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:search.web.refusal.unsupported_redirect_scheme/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:search.web.request/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:search.web.result/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.fetch.refusal.credential_unavailable/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.fetch.refusal.cross_origin_credentialed_redirect/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.fetch.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.fetch.refusal.redirect_limit/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.fetch.refusal.unsupported_redirect_scheme/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.fetch.request/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.fetch.result/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.render.refusal.engine_unavailable/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.render.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.render.request/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c",
        "role": "contract",
        "target": "Contract:web.render.result/v1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "contract",
        "target": "Contract:security.watched-vulnerability/v1",
        "current": true
      },
      {
        "source": "Trigger:security.epss-daily",
        "role": "line",
        "target": "Line:security.epss-triage",
        "current": true
      },
      {
        "source": "Trigger:security.kev-daily",
        "role": "line",
        "target": "Line:security.kev-triage",
        "current": true
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
    ]
  }
});

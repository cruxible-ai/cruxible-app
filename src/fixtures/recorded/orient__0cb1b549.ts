// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient b49ed65b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
    "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
    "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
    "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf",
    "surface": "sdk",
    "section": "pins",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_console05",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "generation": 22,
    "proposed_at": "2026-11-07T22:22:25.432116Z",
    "evaluation_time": "2026-11-08T19:47:54.163866Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
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
        "source": "CaptureContract:playbill.foreign-source.triage.notes",
        "role": "coordinate-schema",
        "target": "Contract:foreign-source-snapshot-v1"
      },
      {
        "source": "CaptureContract:playbill.foreign-source.triage.notes",
        "role": "selector-schema",
        "target": "Contract:foreign-source-span-v1"
      },
      {
        "source": "CaptureContract:playbill.foreign-source.triage.notes",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.claim-statement-span-v1"
      },
      {
        "source": "CaptureContract:playbill.foreign-source.triage.notes",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.proposer-asserted-v1"
      },
      {
        "source": "CaptureContract:playbill.foreign-source.triage.notes",
        "role": "replay-policy",
        "target": "Contract:playbill.external.retained-selection-replay-v1"
      },
      {
        "source": "CaptureContract:playbill.foreign-source.triage.notes",
        "role": "commitment-canonicalizer",
        "target": "Contract:sha256-bytes-v1"
      },
      {
        "source": "CaptureContract:security.cyclonedx-sbom",
        "role": "coordinate-schema",
        "target": "Contract:http-response-v1"
      },
      {
        "source": "CaptureContract:security.cyclonedx-sbom",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.cyclonedx-sbom",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "CaptureContract:security.cyclonedx-sbom",
        "role": "replay-policy",
        "target": "Contract:playbill.external.retained-selection-replay-v1"
      },
      {
        "source": "CaptureContract:security.cyclonedx-sbom",
        "role": "commitment-canonicalizer",
        "target": "Contract:sha256-bytes-v1"
      },
      {
        "source": "CaptureContract:security.cyclonedx-sbom",
        "role": "selector-schema",
        "target": "Contract:whole-response-v1"
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
        "source": "CaptureContract:security.osv-matches",
        "role": "coordinate-schema",
        "target": "Contract:http-response-v1"
      },
      {
        "source": "CaptureContract:security.osv-matches",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.osv-matches",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "CaptureContract:security.osv-matches",
        "role": "replay-policy",
        "target": "Contract:playbill.external.retained-selection-replay-v1"
      },
      {
        "source": "CaptureContract:security.osv-matches",
        "role": "commitment-canonicalizer",
        "target": "Contract:sha256-bytes-v1"
      },
      {
        "source": "CaptureContract:security.osv-matches",
        "role": "selector-schema",
        "target": "Contract:whole-response-v1"
      },
      {
        "source": "CaptureContract:security.osv-response",
        "role": "coordinate-schema",
        "target": "Contract:http-response-v1"
      },
      {
        "source": "CaptureContract:security.osv-response",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.osv-response",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "CaptureContract:security.osv-response",
        "role": "replay-policy",
        "target": "Contract:playbill.external.retained-selection-replay-v1"
      },
      {
        "source": "CaptureContract:security.osv-response",
        "role": "commitment-canonicalizer",
        "target": "Contract:sha256-bytes-v1"
      },
      {
        "source": "CaptureContract:security.osv-response",
        "role": "selector-schema",
        "target": "Contract:whole-response-v1"
      },
      {
        "source": "CaptureContract:security.sbom-components",
        "role": "coordinate-schema",
        "target": "Contract:http-response-v1"
      },
      {
        "source": "CaptureContract:security.sbom-components",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.sbom-components",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "CaptureContract:security.sbom-components",
        "role": "replay-policy",
        "target": "Contract:playbill.external.retained-selection-replay-v1"
      },
      {
        "source": "CaptureContract:security.sbom-components",
        "role": "commitment-canonicalizer",
        "target": "Contract:sha256-bytes-v1"
      },
      {
        "source": "CaptureContract:security.sbom-components",
        "role": "selector-schema",
        "target": "Contract:whole-response-v1"
      },
      {
        "source": "ClaimType:security.app_exposure.justification",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.app_exposure.occurrence",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.app_exposure.vulnerability",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.catalog.catalog_id",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.component.affected_by",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.component.affected_by",
        "role": "capture-contract",
        "target": "CaptureContract:security.osv-matches",
        "current": true
      },
      {
        "source": "ClaimType:security.component.purl",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.exposure.component",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.exposure.justification",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.exposure.vulnerability",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.inventory.inventory_id",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.occurrence.component",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.occurrence.inventory",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.occurrence.scope",
        "role": "capture-contract",
        "target": "CaptureContract:security.sbom-components",
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
        "target": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
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
        "target": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "current": true
      },
      {
        "source": "Line:security.osv-query",
        "role": "procedure",
        "target": "Procedure:security.osv-query",
        "current": true
      },
      {
        "source": "Line:security.osv-query",
        "role": "provider",
        "target": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "current": true
      },
      {
        "source": "Line:security.sbom-import.app",
        "role": "procedure",
        "target": "Procedure:security.sbom-import",
        "current": true
      },
      {
        "source": "Line:security.sbom-import.app",
        "role": "provider",
        "target": "Provider:cruxible-builtin",
        "current": true
      },
      {
        "source": "Line:security.sbom-import.app",
        "role": "provider",
        "target": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
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
        "target": "QueryDefinition:security.watched_cve_keys",
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
        "source": "Procedure:security.osv-query",
        "role": "capture-contract",
        "target": "CaptureContract:security.osv-matches",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "capture-contract",
        "target": "CaptureContract:security.osv-response",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "claim-type",
        "target": "ClaimType:security.component.affected_by",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "contract",
        "target": "Contract:osv.match.request/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "contract",
        "target": "Contract:osv.match.result/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "contract",
        "target": "Contract:osv.query.request/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "contract",
        "target": "Contract:osv.query.result/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "contract",
        "target": "Contract:security.osv-affected/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "contract-in",
        "target": "Contract:security.osv-query.input/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "contract-out",
        "target": "Contract:security.osv-query.output/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "parameter-contract",
        "target": "Contract:security.osv-query.params/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-query",
        "role": "query",
        "target": "QueryDefinition:security.osv_components",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "capture-contract",
        "target": "CaptureContract:security.cyclonedx-sbom",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "capture-contract",
        "target": "CaptureContract:security.sbom-components",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.scope",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract",
        "target": "Contract:sbom.components.request/v1",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract",
        "target": "Contract:sbom.components.result/v1",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract",
        "target": "Contract:security.sbom-component/v1",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract-in",
        "target": "Contract:security.sbom-import.input/v1",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract-out",
        "target": "Contract:security.sbom-import.output/v1",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "parameter-contract",
        "target": "Contract:security.sbom-import.params/v1",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract",
        "target": "Contract:workspace.file.request/v1",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract",
        "target": "Contract:workspace.file.result/v1",
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
        "source": "ProcedureMandate:security.osv-query-propose",
        "role": "line",
        "target": "Line:security.osv-query",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.osv-query-settle",
        "role": "claim-type",
        "target": "ClaimType:security.component.affected_by",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.osv-query-settle",
        "role": "line",
        "target": "Line:security.osv-query",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.sbom-import.app-propose",
        "role": "line",
        "target": "Line:security.sbom-import.app",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.sbom-import.app-settle",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.scope",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.sbom-import.app-settle",
        "role": "line",
        "target": "Line:security.sbom-import.app",
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
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:search.web.refusal.cross_origin_credentialed_redirect/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:search.web.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:search.web.refusal.redirect_limit/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:search.web.refusal.undeclared_instance/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:search.web.refusal.unsupported_redirect_scheme/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:search.web.request/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:search.web.result/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.pages.refusal.credential_unavailable/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.pages.refusal.cross_origin_credentialed_redirect/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.pages.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.pages.refusal.redirect_limit/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.pages.refusal.unsupported_redirect_scheme/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.pages.request/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.pages.result/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.refusal.credential_unavailable/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.refusal.cross_origin_credentialed_redirect/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.refusal.redirect_limit/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.refusal.unsupported_redirect_scheme/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.request/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.fetch.result/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.render.dom.refusal.engine_unavailable/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.render.dom.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.render.dom.request/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.render.dom.result/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.render.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.render.request/v1",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "role": "contract",
        "target": "Contract:web.render.result/v1",
        "current": true
      },
      {
        "source": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "role": "contract",
        "target": "Contract:osv.match.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "role": "contract",
        "target": "Contract:osv.match.request/v1",
        "current": true
      },
      {
        "source": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "role": "contract",
        "target": "Contract:osv.match.result/v1",
        "current": true
      },
      {
        "source": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "role": "contract",
        "target": "Contract:osv.query.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "role": "contract",
        "target": "Contract:osv.query.request/v1",
        "current": true
      },
      {
        "source": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "role": "contract",
        "target": "Contract:osv.query.result/v1",
        "current": true
      },
      {
        "source": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "role": "contract",
        "target": "Contract:sbom.components.refusal.provider_declined/v1",
        "current": true
      },
      {
        "source": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "role": "contract",
        "target": "Contract:sbom.components.request/v1",
        "current": true
      },
      {
        "source": "Provider:security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "role": "contract",
        "target": "Contract:sbom.components.result/v1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.app_not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.app_exposure.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.app_not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.app_exposure.occurrence",
        "current": true
      },
      {
        "source": "QueryDefinition:security.app_not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.app_exposure.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.app_not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.component.purl",
        "current": true
      },
      {
        "source": "QueryDefinition:security.app_not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.inventory.inventory_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.app_not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.app_not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.inventory",
        "current": true
      },
      {
        "source": "QueryDefinition:security.app_not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.app_not_affected_judgments",
        "role": "contract",
        "target": "Contract:security.app-judgment/v1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_components",
        "role": "claim-type",
        "target": "ClaimType:security.component.purl",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_components",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_components",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.inventory",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_components",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_components",
        "role": "contract",
        "target": "Contract:security.inventory-component/v1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.app_exposure.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.app_exposure.occurrence",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.app_exposure.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.component.affected_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.component.purl",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.exposure.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.exposure.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.exposure.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.inventory.inventory_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.inventory",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_date_added",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_ransomware_use",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "contract",
        "target": "Contract:security.exposure-row/v1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.component.purl",
        "current": true
      },
      {
        "source": "QueryDefinition:security.not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.exposure.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.exposure.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.exposure.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.not_affected_judgments",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.not_affected_judgments",
        "role": "contract",
        "target": "Contract:security.judgment/v1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.osv_components",
        "role": "claim-type",
        "target": "ClaimType:security.component.purl",
        "current": true
      },
      {
        "source": "QueryDefinition:security.osv_components",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.osv_components",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.osv_components",
        "role": "contract",
        "target": "Contract:security.osv-component/v1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.app_exposure.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.app_exposure.occurrence",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.app_exposure.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.component.affected_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.component.purl",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.exposure.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.exposure.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.exposure.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.inventory.inventory_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.inventory",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_date_added",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_ransomware_use",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "contract",
        "target": "Contract:security.exposure-row/v1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_cve_keys",
        "role": "claim-type",
        "target": "ClaimType:security.component.affected_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_cve_keys",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_cve_keys",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_cve_keys",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_cve_keys",
        "role": "contract",
        "target": "Contract:security.watched-cve-key/v1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.component.affected_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.occurrence.scope",
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
      },
      {
        "source": "Trigger:security.osv-daily",
        "role": "line",
        "target": "Line:security.osv-query",
        "current": true
      },
      {
        "source": "Trigger:security.start-weekly",
        "role": "runbook",
        "target": "Runbook:security.start",
        "current": true
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
    ]
  }
});

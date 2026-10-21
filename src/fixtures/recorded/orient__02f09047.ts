// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient d84f2588
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
    "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
    "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
    "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
    "surface": "sdk",
    "section": "graph",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_be4d690f30d64371",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "generation": 58,
    "accepted_at": "2026-10-19T21:49:14.351998Z",
    "evaluation_time": "2026-10-21T19:49:18.882587Z",
    "section": "graph",
    "graph": {
      "nodes": [
        {
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-release-0.3.2.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-case-law-monitoring-0.3.2.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-kev-reference-0.3.2.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-kev-triage-0.3.2.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-project-domain-0.3.2.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-supply-chain-blast-radius-0.3.2.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible--cruxible-0.3.0.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible--cruxible-0.3.1-py3-none-any.whl",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible--cruxible-0.3.1.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible--cruxible-0.3.2-py3-none-any.whl",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible--cruxible-0.3.2.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.0-py3-none-any.whl",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.0.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.1-py3-none-any.whl",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.1.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.2-py3-none-any.whl",
          "kind": "security.artifact"
        },
        {
          "subject": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.2.tar.gz",
          "kind": "security.artifact"
        },
        {
          "subject": "security.assessment/apache-log4j-1.2.17--cve-2021-44228",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/apache-log4j2-2.12.2--cve-2021-44228",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/apache-log4j2-2.14.1--cve-2021-44228",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/apache-log4j2-2.17.1--cve-2021-44228",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44832",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-45046",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-45105",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2023-32681",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-34064",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-47081",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-56201",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-56326",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2025-27516",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2025-68161",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-25645",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-34477",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-34480",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2021-44228",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2021-44832",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2021-45046",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2021-45105",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2023-32681",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2024-34064",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2024-47081",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2024-56326",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2025-27516",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2025-68161",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2026-25645",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2026-34477",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.1.0--cve-2026-34480",
          "kind": "security.assessment"
        },
        {
          "subject": "security.asset/web-1.example.com",
          "kind": "security.asset"
        },
        {
          "subject": "security.change/github.com-cruxible-ai-cruxible--6354e15bace2e97efa618a39d955b570ca5a6ee1",
          "kind": "security.change"
        },
        {
          "subject": "security.change/github.com-cruxible-ai-cruxible--e848cbb6787262db349912c48d9c008d8068ede8",
          "kind": "security.change"
        },
        {
          "subject": "security.change/github.com-cruxible-ai-cruxible--ea6582844b23b81fe0bdeed9303fa975b4faff8c",
          "kind": "security.change"
        },
        {
          "subject": "security.change/github.com-cruxible-ai-cruxible--f88f4a6567331c4810c93894efc252db501e876c",
          "kind": "security.change"
        },
        {
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
          "kind": "security.coverage"
        },
        {
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
          "kind": "security.coverage"
        },
        {
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest",
          "kind": "security.coverage"
        },
        {
          "subject": "security.coverage/pypi-cruxible--registry.files",
          "kind": "security.coverage"
        },
        {
          "subject": "security.coverage/pypi-cruxible-client--registry.files",
          "kind": "security.coverage"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--kit-lockfiles",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--test",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--wheel-install-test",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-docs.yml--build",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-docs.yml--deploy",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish-kev-reference-world.yml--publish",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish-runtime-image.yml--build",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish-runtime-image.yml--verify",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-client",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-cruxible",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-kit-bundles",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--verify-versions",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--kit-lockfiles",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--test",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--wheel-install-test",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--build",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--deploy",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-kev-reference-world.yml--publish",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--build",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--verify",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-client",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-cruxible",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-kit-bundles",
          "kind": "security.job"
        },
        {
          "subject": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--verify-versions",
          "kind": "security.job"
        },
        {
          "subject": "security.product/apache-log4j",
          "kind": "security.product"
        },
        {
          "subject": "security.product/apache-log4j2",
          "kind": "security.product"
        },
        {
          "subject": "security.product/gate-app",
          "kind": "security.product"
        },
        {
          "subject": "security.product/zammad",
          "kind": "security.product"
        },
        {
          "subject": "security.release/apache-log4j--1.2.17",
          "kind": "security.release"
        },
        {
          "subject": "security.release/apache-log4j2--2.12.2",
          "kind": "security.release"
        },
        {
          "subject": "security.release/apache-log4j2--2.14.1",
          "kind": "security.release"
        },
        {
          "subject": "security.release/apache-log4j2--2.17.1",
          "kind": "security.release"
        },
        {
          "subject": "security.release/cruxible--0.3.0",
          "kind": "security.release"
        },
        {
          "subject": "security.release/cruxible--0.3.1",
          "kind": "security.release"
        },
        {
          "subject": "security.release/cruxible--0.3.2",
          "kind": "security.release"
        },
        {
          "subject": "security.release/cruxible-client--0.3.0",
          "kind": "security.release"
        },
        {
          "subject": "security.release/cruxible-client--0.3.1",
          "kind": "security.release"
        },
        {
          "subject": "security.release/cruxible-client--0.3.2",
          "kind": "security.release"
        },
        {
          "subject": "security.release/gate-app--1.0.0",
          "kind": "security.release"
        },
        {
          "subject": "security.release/gate-app--1.1.0",
          "kind": "security.release"
        },
        {
          "subject": "security.release/zammad--6.0.0",
          "kind": "security.release"
        },
        {
          "subject": "security.remediation/sub-f8c591a00481d750837951d31d67e89f",
          "kind": "security.remediation"
        },
        {
          "subject": "security.repo/github.com--cruxible-ai-cruxible",
          "kind": "security.repo"
        },
        {
          "subject": "security.service/storefront",
          "kind": "security.service"
        },
        {
          "subject": "security.signal/security.hq5--sha256-84e283f0451cc97a96323fe6c78724eab8bfcde34ff6e2f18c8785a4fbafdc6f",
          "kind": "security.signal"
        },
        {
          "subject": "security.supplier/apache-software-foundation",
          "kind": "security.supplier"
        },
        {
          "subject": "security.supplier/gate-example",
          "kind": "security.supplier"
        },
        {
          "subject": "security.supplier/zammad-gmbh",
          "kind": "security.supplier"
        },
        {
          "subject": "security.target/ghcr--cruxible-ai-cruxible-runtime",
          "kind": "security.target"
        },
        {
          "subject": "security.target/github-release--cruxible-ai-cruxible",
          "kind": "security.target"
        },
        {
          "subject": "security.target/pypi--cruxible-client",
          "kind": "security.target"
        },
        {
          "subject": "security.target/pypi--cruxible",
          "kind": "security.target"
        },
        {
          "subject": "security.team/platform",
          "kind": "security.team"
        },
        {
          "subject": "security.vulnerability/cve-2017-5638",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2021-44228",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2021-44832",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2021-45046",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2021-45105",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2023-32681",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2023-4966",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2024-3400",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2024-34064",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2024-47081",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2024-56201",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2024-56326",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2025-27516",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2025-68161",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-102490",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-25645",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-34477",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-34480",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-ea6582844b23b81fe0bdeed9303fa975b4faff8c--.github-workflows-publish.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-f88f4a6567331c4810c93894efc252db501e876c--.github-workflows-publish.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml",
          "kind": "security.workflow"
        },
        {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml",
          "kind": "security.workflow"
        }
      ],
      "edges": [
        {
          "claim": "CLM-e9585947f0500b021cfa3cae38048e65",
          "source": "security.signal/security.hq5--sha256-84e283f0451cc97a96323fe6c78724eab8bfcde34ff6e2f18c8785a4fbafdc6f",
          "predicate": "security.signal.observed",
          "target": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-release-0.3.2.tar.gz"
        },
        {
          "claim": "CLM-d3f6dcc83ea91123a0f03080dd51bb86",
          "source": "security.signal/security.hq5--sha256-84e283f0451cc97a96323fe6c78724eab8bfcde34ff6e2f18c8785a4fbafdc6f",
          "predicate": "security.signal.explained_by",
          "target": "security.change/github.com-cruxible-ai-cruxible--6354e15bace2e97efa618a39d955b570ca5a6ee1"
        },
        {
          "claim": "CLM-892e8866429ef1a3f77b0bc39f01d53a",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2.tar.gz",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--e848cbb6787262db349912c48d9c008d8068ede8"
        },
        {
          "claim": "CLM-aec1e4e0034e3a2b0fa0e47aa5549268",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--e848cbb6787262db349912c48d9c008d8068ede8"
        },
        {
          "claim": "CLM-df7e771d0eeb53900f7cfacadabd82eb",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--e848cbb6787262db349912c48d9c008d8068ede8"
        },
        {
          "claim": "CLM-f2e683bd3e0ae0c6848a6921e4004f44",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.2.tar.gz",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--e848cbb6787262db349912c48d9c008d8068ede8"
        },
        {
          "claim": "CLM-3c3ed29ee049290516da171d66e0451d",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--ea6582844b23b81fe0bdeed9303fa975b4faff8c"
        },
        {
          "claim": "CLM-44009d6e1262d35584d4b3a0d9f22b7e",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0.tar.gz",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--ea6582844b23b81fe0bdeed9303fa975b4faff8c"
        },
        {
          "claim": "CLM-5527e7249621e300e72443522c896c70",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--ea6582844b23b81fe0bdeed9303fa975b4faff8c"
        },
        {
          "claim": "CLM-ddd354e8b369fa0d5f05920e8b3f67d5",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.0.tar.gz",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--ea6582844b23b81fe0bdeed9303fa975b4faff8c"
        },
        {
          "claim": "CLM-211fd3ee93dda8a57f1e7128dd5fe0b1",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1.tar.gz",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--f88f4a6567331c4810c93894efc252db501e876c"
        },
        {
          "claim": "CLM-5f994cb1bc510d143fa7b25483c3733e",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--f88f4a6567331c4810c93894efc252db501e876c"
        },
        {
          "claim": "CLM-c52930d60d8ba1fd7af72a19b139f5a2",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.1.tar.gz",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--f88f4a6567331c4810c93894efc252db501e876c"
        },
        {
          "claim": "CLM-f03b81f0a9eaf4b4bb94dbe2a03b1c8e",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--f88f4a6567331c4810c93894efc252db501e876c"
        },
        {
          "claim": "CLM-2654d8267ebb753e2fbc2c40e03f8267",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-523ae47cebd6978e9f3e5ed6657702d3",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-7c70d2a36a93c150d202ffc407bca50f",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-9787b90be1245b153d4915b351601c53",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-c2c2032edf0a2e37ed83f1a0d3e7bf9c",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-4fc6c7aa4bdd22e46d4de334b6d3200c",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-6c1f76d77353505a74669d52c49eda92",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-850da06984c025ec07742a012d1b94f1",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-d9d7fac5109c4bb57a1daa055ebbb35d",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-f9961eaaa6110cf3602ab9ade67cb2ce",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-350578919c4b3e65f57c9bf07b84d77f",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-docs.yml--deploy",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-docs.yml--build"
        },
        {
          "claim": "CLM-a38d7760815f1558e7e9d6261fa14678",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish-runtime-image.yml--verify",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish-runtime-image.yml--build"
        },
        {
          "claim": "CLM-f1ac5255f2a3fb0c13f5c2d44ada4b4d",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-client"
        },
        {
          "claim": "CLM-2d42b2fa8f497b0f78e2d78615cc04cc",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-kit-bundles"
        },
        {
          "claim": "CLM-a0016f420c087aa4fa599aed8d8bebd5",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-client",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--verify-versions"
        },
        {
          "claim": "CLM-f500ef9e532851cb504dd6e7267d7c90",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-kit-bundles",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--verify-versions"
        },
        {
          "claim": "CLM-bced9138b65ecec142e894e323b4a141",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--deploy",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--build"
        },
        {
          "claim": "CLM-b4fe6af823edbbac055f46be98f3e1ee",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--verify",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--build"
        },
        {
          "claim": "CLM-4a86dc7d3016961b7c12a78282d98066",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-client"
        },
        {
          "claim": "CLM-a7db58419ff79d4f200ddc121000a95a",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-kit-bundles"
        },
        {
          "claim": "CLM-feaf19cf4b799fb4bc716863796a6066",
          "source": "security.remediation/sub-f8c591a00481d750837951d31d67e89f",
          "predicate": "security.work.job",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-kit-bundles"
        },
        {
          "claim": "CLM-0537c94a6f8d3cb750d9cb21972f6408",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-kit-bundles",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--verify-versions"
        },
        {
          "claim": "CLM-532f7c14cc2c91c025c6a96e86786497",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-client",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--verify-versions"
        },
        {
          "claim": "CLM-9f61102f3165c2b404fc15701061dfbc",
          "source": "security.release/apache-log4j--1.2.17",
          "predicate": "security.release.product",
          "target": "security.product/apache-log4j"
        },
        {
          "claim": "CLM-97322808a67c80c385afa7fbb462fa70",
          "source": "security.release/apache-log4j2--2.14.1",
          "predicate": "security.release.product",
          "target": "security.product/apache-log4j2"
        },
        {
          "claim": "CLM-b6e80e32c787706a347c7fb27383a302",
          "source": "security.release/apache-log4j2--2.12.2",
          "predicate": "security.release.product",
          "target": "security.product/apache-log4j2"
        },
        {
          "claim": "CLM-cf0a68b1961ad4cfbc52d71f55646f89",
          "source": "security.release/apache-log4j2--2.17.1",
          "predicate": "security.release.product",
          "target": "security.product/apache-log4j2"
        },
        {
          "claim": "CLM-5f9c1e251c0f3dcfa98f60aba10663f9",
          "source": "security.release/gate-app--1.0.0",
          "predicate": "security.release.product",
          "target": "security.product/gate-app"
        },
        {
          "claim": "CLM-b6487369cb1e67fb5e020b7e624ddfbe",
          "source": "security.release/gate-app--1.1.0",
          "predicate": "security.release.product",
          "target": "security.product/gate-app"
        },
        {
          "claim": "CLM-529553bf44ffc599838d2ee157dbe246",
          "source": "security.release/zammad--6.0.0",
          "predicate": "security.release.product",
          "target": "security.product/zammad"
        },
        {
          "claim": "CLM-a8f0e5ebe0d59c830dfd78a963da64a8",
          "source": "security.assessment/apache-log4j-1.2.17--cve-2021-44228",
          "predicate": "security.assessment.release",
          "target": "security.release/apache-log4j--1.2.17"
        },
        {
          "claim": "CLM-89070e06d902b1ceaf899774a91e1c30",
          "source": "security.assessment/apache-log4j2-2.12.2--cve-2021-44228",
          "predicate": "security.assessment.release",
          "target": "security.release/apache-log4j2--2.12.2"
        },
        {
          "claim": "CLM-29555ccf065fb44fefed86f945b97771",
          "source": "security.asset/web-1.example.com",
          "predicate": "security.asset.installs",
          "target": "security.release/apache-log4j2--2.14.1"
        },
        {
          "claim": "CLM-c7b1aea2651991ecb606b215a98c9a08",
          "source": "security.assessment/apache-log4j2-2.14.1--cve-2021-44228",
          "predicate": "security.assessment.release",
          "target": "security.release/apache-log4j2--2.14.1"
        },
        {
          "claim": "CLM-fd33f30f688dbbb4a5f5d8f827caac69",
          "source": "security.assessment/apache-log4j2-2.17.1--cve-2021-44228",
          "predicate": "security.assessment.release",
          "target": "security.release/apache-log4j2--2.17.1"
        },
        {
          "claim": "CLM-d94b893f7f76696251eb21ff3d17c7f2",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0.tar.gz",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.0"
        },
        {
          "claim": "CLM-fbd8d4f5cadddfadde61587e22e94040",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.0"
        },
        {
          "claim": "CLM-b6d94eeaf7287e19312413289412e4da",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1.tar.gz",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.1"
        },
        {
          "claim": "CLM-d6d2e962208d8ef95aca3f09604a86c1",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.1"
        },
        {
          "claim": "CLM-693ad70e61d84123f5783dc1b925f3cd",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.2"
        },
        {
          "claim": "CLM-91d1808ebd4561daa0157ed08143bbb3",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2.tar.gz",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.2"
        },
        {
          "claim": "CLM-8155b5877ca3c71f885e03090a7f2f82",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.0.tar.gz",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible-client--0.3.0"
        },
        {
          "claim": "CLM-9044211d190b1bcda6e8ea8c577478cf",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible-client--0.3.0"
        },
        {
          "claim": "CLM-922bc8885f4d1848e70ab4289e1ec1c2",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.1.tar.gz",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible-client--0.3.1"
        },
        {
          "claim": "CLM-c9812dd138d335c3a3931a95b0f01682",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible-client--0.3.1"
        },
        {
          "claim": "CLM-0ae89b8425ce623b37ae5931dbf803c0",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible-client--0.3.2"
        },
        {
          "claim": "CLM-73a936750e9d5af3534b3182f231531f",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.2.tar.gz",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible-client--0.3.2"
        },
        {
          "claim": "CLM-0481abd2b2657f250d2ea58602bfdfaf",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-45046",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-2806533a63f443cd2e6e99f1d72b5f0b",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-56201",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-2cfc7e03615b8c3b2da429cd5c667650",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-34477",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-2ef3656d55fb7a0341a303c229ee6a0d",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-44832",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-4f322d9c222d0114364cde08e7fd5543",
          "source": "security.assessment/gate-app-1.0.0--cve-2025-68161",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-6365bb884ea226f9720f340f56e90876",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-25645",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-8f34a7843220c58e2cedc73938eeed15",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-47081",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-8f514fd09f0f01afefb2a3d08223a73c",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-92e8160b2c0155d96fa82f300a2c6ea1",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-56326",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-a598e9ba1f12e1d719621bfe7196f73f",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-34480",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-b1d0791aea5fd5b3c9dadd5364bd2e10",
          "source": "security.asset/web-1.example.com",
          "predicate": "security.asset.installs",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-c1cf10cac901b48d8dd6e54f182b209e",
          "source": "security.assessment/gate-app-1.0.0--cve-2023-32681",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-c754f16a48579b8f214f107eba860e8f",
          "source": "security.assessment/gate-app-1.0.0--cve-2025-27516",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-d0fd274a34e599be8932e6b2a57759ad",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-45105",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-f8f0498555ec9a65c34f4b0a9a04d417",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-34064",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-1f23610bb64c65f2f854dcde937bddfd",
          "source": "security.assessment/gate-app-1.1.0--cve-2021-45105",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-2fe6467362f439154b9bd03a738adb65",
          "source": "security.assessment/gate-app-1.1.0--cve-2021-45046",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-4da5b0175bb5bc525090090720efe269",
          "source": "security.assessment/gate-app-1.1.0--cve-2026-25645",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-5c1486cc1332f69fbee2c3b9133fcd3e",
          "source": "security.assessment/gate-app-1.1.0--cve-2025-68161",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-79b477ecdc01a794b6a876832d14efb2",
          "source": "security.assessment/gate-app-1.1.0--cve-2024-34064",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-79ca0a327f1b6d5ae4757fee7a134811",
          "source": "security.assessment/gate-app-1.1.0--cve-2026-34477",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-8eb9d093bd326d2fd60d286a3977f2f7",
          "source": "security.assessment/gate-app-1.1.0--cve-2023-32681",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-9441ee3bb6c96c2f000c9c39169d3f50",
          "source": "security.assessment/gate-app-1.1.0--cve-2021-44832",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-9ae09107efb6185e6db876b1c6097702",
          "source": "security.assessment/gate-app-1.1.0--cve-2021-44228",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-9d78a739c7572190f2262bccabe4fed1",
          "source": "security.assessment/gate-app-1.1.0--cve-2024-47081",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-9e7bec933e50bd7cf09d6db5f0c9a1c1",
          "source": "security.assessment/gate-app-1.1.0--cve-2026-34480",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-a01def1621fc90cbbf47c25eb0536fad",
          "source": "security.assessment/gate-app-1.1.0--cve-2025-27516",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-fe941532ae0472a0abe8839881bb2c5b",
          "source": "security.assessment/gate-app-1.1.0--cve-2024-56326",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.1.0"
        },
        {
          "claim": "CLM-1abce41dfdeb6d128853a3ebd2f7a16d",
          "source": "security.asset/web-1.example.com",
          "predicate": "security.asset.installs",
          "target": "security.release/zammad--6.0.0"
        },
        {
          "claim": "CLM-1811d0c2b47fa447bc605ca9c62ac81f",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-2af181b174f67fe5908339c0f4586afa",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-3dfc78b623ddfd3dc261f1a3d985f25d",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-4aa263d658a0926268bea973d969df1d",
          "source": "security.target/ghcr--cruxible-ai-cruxible-runtime",
          "predicate": "security.target.source_repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-549401e7904d6e5cdb3316b1036443e1",
          "source": "security.target/pypi--cruxible",
          "predicate": "security.target.source_repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-558301a773cdcf69eb98318a8b5e7bf2",
          "source": "security.target/github-release--cruxible-ai-cruxible",
          "predicate": "security.target.source_repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-6f5d3fc0bbeedca34ee242dc56013c90",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-7bbc1b515b54aab61f3f1efbee39d13c",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-8fb6d7ed027be22e4e086861407ff0fa",
          "source": "security.target/pypi--cruxible-client",
          "predicate": "security.target.source_repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-8fcb8de5b79195a38b693c342c62755d",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-986a0aa2c4403e4de618bb5dc8520eff",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-9e3d85a822e4fa475b57480e6d8a1c93",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-becfca2dc59582ed6b61169f2d8ca8b7",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-c6a33287e6650f89e21c0e723de601ec",
          "source": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
          "predicate": "security.coverage.of",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-cfc93141e9fc5c2dfc68014f4d6192fc",
          "source": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
          "predicate": "security.coverage.of",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-f248063c5a6ed11a12c486f7587a2b2c",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-f97150fd96896bcc1de8b796f5019376",
          "source": "security.coverage/github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest",
          "predicate": "security.coverage.of",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-f07785caadeddf9fd0ab77d25c545481",
          "source": "security.asset/web-1.example.com",
          "predicate": "security.asset.serves",
          "target": "security.service/storefront"
        },
        {
          "claim": "CLM-b9517b7f14c587e19261e83cf1d53a10",
          "source": "security.product/apache-log4j2",
          "predicate": "security.product.supplied_by",
          "target": "security.supplier/apache-software-foundation"
        },
        {
          "claim": "CLM-0068db213f245e5bf2b68c101cff908f",
          "source": "security.product/gate-app",
          "predicate": "security.product.supplied_by",
          "target": "security.supplier/gate-example"
        },
        {
          "claim": "CLM-91bc782181cfc41d338a79bb1c8043a3",
          "source": "security.product/zammad",
          "predicate": "security.product.supplied_by",
          "target": "security.supplier/zammad-gmbh"
        },
        {
          "claim": "CLM-235544679a5c285aeaf00b172b296b6b",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish-runtime-image.yml--build",
          "predicate": "security.job.publishes_to",
          "target": "security.target/ghcr--cruxible-ai-cruxible-runtime"
        },
        {
          "claim": "CLM-57e7f5641f420c08e385035cd4dc4849",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-kev-reference-world.yml--publish",
          "predicate": "security.job.publishes_to",
          "target": "security.target/ghcr--cruxible-ai-cruxible-runtime"
        },
        {
          "claim": "CLM-9e7d1a56b60f309ec011cde76deb669f",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish-kev-reference-world.yml--publish",
          "predicate": "security.job.publishes_to",
          "target": "security.target/ghcr--cruxible-ai-cruxible-runtime"
        },
        {
          "claim": "CLM-c8dcb657deefc7d85373b4e3c2c8a509",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--build",
          "predicate": "security.job.publishes_to",
          "target": "security.target/ghcr--cruxible-ai-cruxible-runtime"
        },
        {
          "claim": "CLM-05391c28e089396bdf373de0b2e85d19",
          "source": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-kev-triage-0.3.2.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/github-release--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-458c4368e2978e7839ede79a09421aa7",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-kit-bundles",
          "predicate": "security.job.publishes_to",
          "target": "security.target/github-release--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-696aad8a2df2597e5729cc6ac6c6756d",
          "source": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-case-law-monitoring-0.3.2.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/github-release--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-7276ef2f3e515a16ecdc7404fd85a794",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-kit-bundles",
          "predicate": "security.job.publishes_to",
          "target": "security.target/github-release--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-9332aadf7c999a40535f4b5af238278b",
          "source": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-project-domain-0.3.2.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/github-release--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-9cbfe326495d1292ed6fe1b983faa2ad",
          "source": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-kev-reference-0.3.2.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/github-release--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-b01afaa7c56208ff1d7265159b576e12",
          "source": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/github-release--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-cd078fa9a69c34f90ea9514a24058e8b",
          "source": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-supply-chain-blast-radius-0.3.2.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/github-release--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-fd9c44b01f16ef78b0152a10b9001aac",
          "source": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-release-0.3.2.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/github-release--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-0281c6e19e2130963f792af72e61e588",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.1.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-19fe4b9d1a0928098e54b7e7e9df8c2c",
          "source": "security.coverage/pypi-cruxible-client--registry.files",
          "predicate": "security.coverage.of",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-1fb9e55ea17cdb6895b6b216dc38bf2a",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-307bcb407098d0dbaff2bac2dda5f6df",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.publishes_to",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-638150f60143067d505518c52ae44907",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-7ae8411bf61d7be3706f83712eaf6283",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-client",
          "predicate": "security.job.publishes_to",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-823a29c3da391e7edce20ca2793cf9c6",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.2.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-85b8663d171bb1a8a04b23bfac3b0021",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-d2bf99055d563fe08624931fa30700a1",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-client",
          "predicate": "security.job.publishes_to",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-d2d00056aff4d456f1cdfac32ea25472",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.0.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-dee33413b3822af284cdfa2d54489119",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.publishes_to",
          "target": "security.target/pypi--cruxible-client"
        },
        {
          "claim": "CLM-2b856b7a77ac8b0f263582865a2f5eb2",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-client",
          "predicate": "security.job.publishes_to",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-2be21fb58fe16b5b49790f0ab99b5699",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-48bc5c90a618faeb7e95e95a92525bc9",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-7880b7da82b79f279c0a32e08ad82d22",
          "source": "security.coverage/pypi-cruxible--registry.files",
          "predicate": "security.coverage.of",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-969362f1bc8f0c953c34b6a68162cc8c",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.publishes_to",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-aeeaf27423d041e4cdb4a58084b1c69c",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-b2e7abd8c63925a16d8731ea4f3dc35f",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-client",
          "predicate": "security.job.publishes_to",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-cd8419ee2f018d9d45df378bb839ec28",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-d9e01ccb3e1b71e41004f4877845d19e",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.publishes_to",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-db404f26952bf85ff414de3487b9453e",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-f93a7d150b908fe8a66633b10c887d29",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-83a74666a26cd4c474b2466e9b834269",
          "source": "security.service/storefront",
          "predicate": "security.service.owned_by",
          "target": "security.team/platform"
        },
        {
          "claim": "CLM-1d61e8384b7e260719eabe0dfa8f7164",
          "source": "security.assessment/gate-app-1.1.0--cve-2021-44228",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-44228"
        },
        {
          "claim": "CLM-3a959086366f370a47000d9984b68d8b",
          "source": "security.assessment/apache-log4j2-2.17.1--cve-2021-44228",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-44228"
        },
        {
          "claim": "CLM-64936590d31b7429993483b6e89848ac",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-44228"
        },
        {
          "claim": "CLM-668646ecf8b270454450464a53f4212a",
          "source": "security.assessment/apache-log4j2-2.14.1--cve-2021-44228",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-44228"
        },
        {
          "claim": "CLM-a5286e04f0e2a48ff78b4bc92d45db02",
          "source": "security.assessment/apache-log4j2-2.12.2--cve-2021-44228",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-44228"
        },
        {
          "claim": "CLM-df5b029f629819e35047abaa5f6644a8",
          "source": "security.assessment/apache-log4j-1.2.17--cve-2021-44228",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-44228"
        },
        {
          "claim": "CLM-0d24ad7f8734623b73c4d7e5e2229080",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-44832",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-44832"
        },
        {
          "claim": "CLM-9c4c0ecd4644b13aba33c6e1dfb755c7",
          "source": "security.assessment/gate-app-1.1.0--cve-2021-44832",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-44832"
        },
        {
          "claim": "CLM-2dcda1987b24baf933198483d4a259cd",
          "source": "security.assessment/gate-app-1.1.0--cve-2021-45046",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-45046"
        },
        {
          "claim": "CLM-9733a4df0cda6c9d8f68b11cc8d46d2a",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-45046",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-45046"
        },
        {
          "claim": "CLM-7a7a54805a01907ce9633bbc20ac3d91",
          "source": "security.assessment/gate-app-1.1.0--cve-2021-45105",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-45105"
        },
        {
          "claim": "CLM-b012dcc0a435540d7cd1179b82b37104",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-45105",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-45105"
        },
        {
          "claim": "CLM-2682858a07014c413897c1bfb84f6961",
          "source": "security.assessment/gate-app-1.0.0--cve-2023-32681",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2023-32681"
        },
        {
          "claim": "CLM-584752cbee5f12bcdda5568bf4b2d333",
          "source": "security.assessment/gate-app-1.1.0--cve-2023-32681",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2023-32681"
        },
        {
          "claim": "CLM-73561612bf52f3fdc9a068b308dc5ebb",
          "source": "security.assessment/gate-app-1.1.0--cve-2024-34064",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-34064"
        },
        {
          "claim": "CLM-e061e1d5761261e669e321b0d907d4a5",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-34064",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-34064"
        },
        {
          "claim": "CLM-0354f3ad38d48b6e0e7827e9e2e7a21d",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-47081",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-47081"
        },
        {
          "claim": "CLM-c24239e3350146110eb94dea588dd6fe",
          "source": "security.assessment/gate-app-1.1.0--cve-2024-47081",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-47081"
        },
        {
          "claim": "CLM-7091a84a29ba55bb2c29e10292bc55d2",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-56201",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-56201"
        },
        {
          "claim": "CLM-4767306c1e2cf2cf7e2882845b3e08aa",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-56326",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-56326"
        },
        {
          "claim": "CLM-ebc4b6e0d9ae2575945581345ba23a39",
          "source": "security.assessment/gate-app-1.1.0--cve-2024-56326",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-56326"
        },
        {
          "claim": "CLM-09efe64e9a715c6694643d738f741e47",
          "source": "security.assessment/gate-app-1.1.0--cve-2025-27516",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2025-27516"
        },
        {
          "claim": "CLM-0ea34615921270ef0730dd55cb8e40fa",
          "source": "security.assessment/gate-app-1.0.0--cve-2025-27516",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2025-27516"
        },
        {
          "claim": "CLM-5352978215465529fd7c337044f9331c",
          "source": "security.assessment/gate-app-1.1.0--cve-2025-68161",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2025-68161"
        },
        {
          "claim": "CLM-ff0812fb347dfada82898231be751b59",
          "source": "security.assessment/gate-app-1.0.0--cve-2025-68161",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2025-68161"
        },
        {
          "claim": "CLM-9cb7d1d511edaaf897ce8ff19b092441",
          "source": "security.assessment/gate-app-1.1.0--cve-2026-25645",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2026-25645"
        },
        {
          "claim": "CLM-b254529841b347af5eee260a9bfea583",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-25645",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2026-25645"
        },
        {
          "claim": "CLM-4ec27597a7bdb046955681ee88786d93",
          "source": "security.assessment/gate-app-1.1.0--cve-2026-34477",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2026-34477"
        },
        {
          "claim": "CLM-a76e2f86a204f37d75b94d01f5d1bf38",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-34477",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2026-34477"
        },
        {
          "claim": "CLM-67edb2042fb8d5f112cd0e3a37d27c52",
          "source": "security.assessment/gate-app-1.1.0--cve-2026-34480",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2026-34480"
        },
        {
          "claim": "CLM-9fc2fe334f07e2b75f48b80f71fa47b2",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-34480",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2026-34480"
        },
        {
          "claim": "CLM-0d5db348a0a99f1b9c81a3c1e5a1834a",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--wheel-install-test",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-957168adef181792c2aba474d65e65fd",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--kit-lockfiles",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-9d767fcc25f7f544bb7abe2beca7a275",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-b002b9846e8b78c9a1c2b944af42e4a9",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--test",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-3c5c8767b54dfeb641da19ca851943da",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-docs.yml--deploy",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml"
        },
        {
          "claim": "CLM-a5c55292591ab11f94975f87ee3d96a1",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-docs.yml--build",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml"
        },
        {
          "claim": "CLM-05833aa2a46bd699da9ab936e229b961",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish-kev-reference-world.yml--publish",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml"
        },
        {
          "claim": "CLM-86651fd773cf75c0ce772cac5c798183",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish-runtime-image.yml--build",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml"
        },
        {
          "claim": "CLM-e7d423d89d1fb1cb105eafcc8afdb081",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish-runtime-image.yml--verify",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml"
        },
        {
          "claim": "CLM-0bbd93ee20ba3aca99bdabd56545ad5d",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-32d89c889181172cb30c233c622acfc8",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--verify-versions",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-402e71536ae45345af0d6dbe43198648",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2.tar.gz",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-5d851405b7e929446e9aca62cfc3fa64",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-5f4c592da6b8720da7002e631515d430",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-kit-bundles",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-c9e5d9cab06a50282beecfebad264c74",
          "source": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-publish.yml--publish-client",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-de591e3d3334fcc516ab85cd22be2587",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.2.tar.gz",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-ebbd1907ca1252d3d279922be180d6d6",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-69018058ad3dc77ae243448ddf63afce",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-ea6582844b23b81fe0bdeed9303fa975b4faff8c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-7018c05d44f5908385e3f34ea3b84472",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.0.tar.gz",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-ea6582844b23b81fe0bdeed9303fa975b4faff8c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-b312efb64e96d1a84bf7ac25deb3c675",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-ea6582844b23b81fe0bdeed9303fa975b4faff8c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-fa75f38c0d671c1f5a33f8b459ead6df",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0.tar.gz",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-ea6582844b23b81fe0bdeed9303fa975b4faff8c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-088e30c13790bf69aa4aed7b57060827",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.1.tar.gz",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-f88f4a6567331c4810c93894efc252db501e876c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-16fd45cb2c2a5770808639ebc754ccc7",
          "source": "security.artifact/pypi-cruxible-client--cruxible-client-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-f88f4a6567331c4810c93894efc252db501e876c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-d99d3e4ca5949cbf7dca5e4c3a43b3ef",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-f88f4a6567331c4810c93894efc252db501e876c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-e05d002426e5e2686bb36ad364854d91",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1.tar.gz",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-f88f4a6567331c4810c93894efc252db501e876c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-4d8c11a0d49619df68a0bfa73c50c5c5",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--test",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-b345f0bb19c0b404622587535fdeb1f5",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--wheel-install-test",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-c5c47f08e91a216e249d5f2336367599",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-f6ba3cfbaf7c183b951a2593067aa3f7",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--kit-lockfiles",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-23bdd5f7e6ff94bc8921497faf6a4cef",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--deploy",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml"
        },
        {
          "claim": "CLM-729882be42877aba51f40b6b1e17229a",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--build",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml"
        },
        {
          "claim": "CLM-37e0c4b13928c8f40a7bb850e2f1e772",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-kev-reference-world.yml--publish",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml"
        },
        {
          "claim": "CLM-02883c86333933c8fdb704695dc5423e",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--verify",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml"
        },
        {
          "claim": "CLM-db07a291524d44444a117d83164f0996",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--build",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml"
        },
        {
          "claim": "CLM-0f4a5dd4169450f12b34a852d0fa50b8",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-client",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-10a9edbd89f8ee400753cf8e293f53d5",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-2f8f11ce160e5d7d11549c27d7f56795",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--verify-versions",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-9ee8ffc38f533dcbd1dad98e80af1bf7",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-kit-bundles",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml"
        }
      ],
      "totals": {
        "subjects": 145
      }
    },
    "truncated": false,
    "next": [
      "cx.get(\"security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz\")"
    ]
  }
});

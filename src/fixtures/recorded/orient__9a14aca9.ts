// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient dd4653af
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
    "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
    "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
    "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
    "surface": "sdk",
    "section": "graph",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_bff87e924cbb4f7f",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "generation": 12,
    "accepted_at": "2026-10-26T19:00:09.706610Z",
    "evaluation_time": "2026-10-26T19:04:57.409258Z",
    "section": "graph",
    "graph": {
      "nodes": [
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
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-34479",
          "kind": "security.assessment"
        },
        {
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-34480",
          "kind": "security.assessment"
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
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
          "kind": "security.coverage"
        },
        {
          "subject": "security.coverage/pypi-cruxible--registry.files",
          "kind": "security.coverage"
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
          "subject": "security.product/gate-app",
          "kind": "security.product"
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
          "subject": "security.release/gate-app--1.0.0",
          "kind": "security.release"
        },
        {
          "subject": "security.repo/github.com--cruxible-ai-cruxible",
          "kind": "security.repo"
        },
        {
          "subject": "security.supplier/gate-example",
          "kind": "security.supplier"
        },
        {
          "subject": "security.target/pypi--cruxible",
          "kind": "security.target"
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
          "subject": "security.vulnerability/cve-2026-25645",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-34477",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-34479",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-34480",
          "kind": "security.vulnerability"
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
          "claim": "CLM-560e53413eca31d8ed13980436462cd0",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2.tar.gz",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--e848cbb6787262db349912c48d9c008d8068ede8"
        },
        {
          "claim": "CLM-85ae6ef3b2383420cc75b201be5f50e3",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--e848cbb6787262db349912c48d9c008d8068ede8"
        },
        {
          "claim": "CLM-119bc685f181df7ec6cced3fd7c91154",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--ea6582844b23b81fe0bdeed9303fa975b4faff8c"
        },
        {
          "claim": "CLM-349b2a23bc14ec9b26e6ca1cb9b82127",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0.tar.gz",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--ea6582844b23b81fe0bdeed9303fa975b4faff8c"
        },
        {
          "claim": "CLM-0cb902ba301cb9be3257151c2b95678a",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1.tar.gz",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--f88f4a6567331c4810c93894efc252db501e876c"
        },
        {
          "claim": "CLM-bdbdf99ed22f44b75718c9d45189f281",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.built_from",
          "target": "security.change/github.com-cruxible-ai-cruxible--f88f4a6567331c4810c93894efc252db501e876c"
        },
        {
          "claim": "CLM-07c7531276f766e2037233981044dc91",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-33619716784aff34abc1c806f22ab57c",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-47280d61d1338651d25235f6d86c8932",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-60e13525fa0525b5e8e44512160c4cfe",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-8dca2790ab3665013fce744e341f784a",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml",
          "predicate": "security.workflow.coverage",
          "target": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows"
        },
        {
          "claim": "CLM-62a236018fdd335c1c3197fd30e72574",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--deploy",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--build"
        },
        {
          "claim": "CLM-ecdf83a89b166740a6a4251898044528",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--verify",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--build"
        },
        {
          "claim": "CLM-5bd654ce5cd86afa0717153a8cd43bc8",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-client"
        },
        {
          "claim": "CLM-e810d84c19fbd08653feec7b7733633d",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-kit-bundles"
        },
        {
          "claim": "CLM-c84697abe4153a7acadfd01fc6583e7c",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-client",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--verify-versions"
        },
        {
          "claim": "CLM-d15c54911e34e931465a6b64a62e1084",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-kit-bundles",
          "predicate": "security.job.needs",
          "target": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--verify-versions"
        },
        {
          "claim": "CLM-026f0ff9aa151a74d05a5a21013218b3",
          "source": "security.release/gate-app--1.0.0",
          "predicate": "security.release.product",
          "target": "security.product/gate-app"
        },
        {
          "claim": "CLM-6e7d07e782f57776956647130944dd3a",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.0"
        },
        {
          "claim": "CLM-c9252c446979d972c9444c367a2e3cfd",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0.tar.gz",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.0"
        },
        {
          "claim": "CLM-50e71c1f872533dc40504ca91f087e28",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1.tar.gz",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.1"
        },
        {
          "claim": "CLM-82b1009b1074d4c8734f2bfaa663d564",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.1"
        },
        {
          "claim": "CLM-09071762c7b9b8ac09b1f45ba36ae043",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.2"
        },
        {
          "claim": "CLM-33cd16758f3be8f6c5cb6fec2de161f7",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2.tar.gz",
          "predicate": "security.artifact.release",
          "target": "security.release/cruxible--0.3.2"
        },
        {
          "claim": "CLM-4285037ca8e65050fb6cb84bd2a9b131",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-45046",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-56fd1b8ae5704e251b220c4e289cab4a",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-6649162727db8e81374a28a19181842f",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-47081",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-685b2c65e4af04ede217346425a493a0",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-34477",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-7273c5bbca09752f8af3b504c370275a",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-44832",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-79556a79f74a70bfa23edc08d11667d2",
          "source": "security.assessment/gate-app-1.0.0--cve-2025-68161",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-8466ab583451270c1d6a2806b25704f8",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-25645",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-8d09cdce645c0919c7470e0c4fc42a4e",
          "source": "security.assessment/gate-app-1.0.0--cve-2025-27516",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-afa2b686c3615b4ae001f2bb43bba441",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-34480",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-c88e9ff9d1383e14e52a99efb7777040",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-34479",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-c98b0a58ab4536bf8da8647db45eb870",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-56201",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-cfc71d34eaced019c284cefb19e8318f",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-56326",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-d501722b33c2be8cfa0a15f386e99208",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-34064",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-de777e5da46995304c685ca2758f1640",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-45105",
          "predicate": "security.assessment.release",
          "target": "security.release/gate-app--1.0.0"
        },
        {
          "claim": "CLM-1e63fbe808f29f420331dfe979cb2ea3",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-2ffe66e3e83c25207c42078903db692c",
          "source": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
          "predicate": "security.coverage.of",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-4e66f947378485dc0bd3252e3d29da32",
          "source": "security.target/pypi--cruxible",
          "predicate": "security.target.source_repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-55e317426298b7ee48f515d8cdd6d62d",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-5889e25b9cf60fdb6c404f17fcfd32c6",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-6a2aff958626925d45f3e3ea385bb689",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-e32268a09f4f6d4fc2b03fa087cb2573",
          "source": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml",
          "predicate": "security.workflow.repo",
          "target": "security.repo/github.com--cruxible-ai-cruxible"
        },
        {
          "claim": "CLM-4590484ab70197dc0a758aaf360beeda",
          "source": "security.product/gate-app",
          "predicate": "security.product.supplied_by",
          "target": "security.supplier/gate-example"
        },
        {
          "claim": "CLM-31f8eea68b6cf0d7f8a43fe35b224590",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-357e366f17c1175774d6247e654565ea",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-53cdacb93890123f2fdea7fae0a90107",
          "source": "security.coverage/pypi-cruxible--registry.files",
          "predicate": "security.coverage.of",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-96bd6d3fb1eeac00c994059b74c1e865",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-a1f8c948c37f1da2b66e15efc357895b",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-b76c71a89cbba9389e7005d3d6a919c5",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-c4cbb4f0d8d9a76c084f9562e968c92c",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1.tar.gz",
          "predicate": "security.artifact.target",
          "target": "security.target/pypi--cruxible"
        },
        {
          "claim": "CLM-40eaf84ec507878cf8bf96ef60469512",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-44228"
        },
        {
          "claim": "CLM-da52e3c05b8edfc144bf01f63b76737e",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-44832",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-44832"
        },
        {
          "claim": "CLM-d5452d622741fd91e9ad7ba6792c4989",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-45046",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-45046"
        },
        {
          "claim": "CLM-6a0d96818f35999444d0fac02755278a",
          "source": "security.assessment/gate-app-1.0.0--cve-2021-45105",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2021-45105"
        },
        {
          "claim": "CLM-87100491e2054ecd24447caf18f459ba",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-34064",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-34064"
        },
        {
          "claim": "CLM-aa23021f59b46dc792f4002cade8c52d",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-47081",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-47081"
        },
        {
          "claim": "CLM-c449e373deb992726b28a427fe26909f",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-56201",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-56201"
        },
        {
          "claim": "CLM-0578d8724b2df538b23171e109ff3d37",
          "source": "security.assessment/gate-app-1.0.0--cve-2024-56326",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2024-56326"
        },
        {
          "claim": "CLM-c32873a7220f6ddcf638dafaf321056e",
          "source": "security.assessment/gate-app-1.0.0--cve-2025-27516",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2025-27516"
        },
        {
          "claim": "CLM-6db53c7e4340dabaf2ae9a6745b06377",
          "source": "security.assessment/gate-app-1.0.0--cve-2025-68161",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2025-68161"
        },
        {
          "claim": "CLM-83c8614102156b8d32b72a804bc62e37",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-25645",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2026-25645"
        },
        {
          "claim": "CLM-485c6ba6092c33e1abb1049f40d2039d",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-34477",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2026-34477"
        },
        {
          "claim": "CLM-4c47ea59e9a0bce17c4f6715fd6b769f",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-34479",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2026-34479"
        },
        {
          "claim": "CLM-804a44a4da257302a462728ad07ed5a8",
          "source": "security.assessment/gate-app-1.0.0--cve-2026-34480",
          "predicate": "security.assessment.vulnerability",
          "target": "security.vulnerability/cve-2026-34480"
        },
        {
          "claim": "CLM-4cb3fc6ad930f15421ea75a090928dd8",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2-py3-none-any.whl",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-b003144cd0969ca94486b513df8ac6f3",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.2.tar.gz",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-6ba1ce6081bf841f332e1f46ef7c6bc3",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-ea6582844b23b81fe0bdeed9303fa975b4faff8c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-80234bf6cb0e6fc5cf5fb38ae04cdc39",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.0.tar.gz",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-ea6582844b23b81fe0bdeed9303fa975b4faff8c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-aa10652cabe28f0fb626bde8eec18bc6",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1.tar.gz",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-f88f4a6567331c4810c93894efc252db501e876c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-f65c500a53998cfab7a80ca6f05325a8",
          "source": "security.artifact/pypi-cruxible--cruxible-0.3.1-py3-none-any.whl",
          "predicate": "security.artifact.published_by",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-f88f4a6567331c4810c93894efc252db501e876c--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-5fe55f8947b5b27262d436ace15e59a6",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--kit-lockfiles",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-9deeb00b3d0b61a8df68f3ad666e84e7",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-9fd41f3f061aa1759863736de37a7612",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--test",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-bcf45969b6a802e5d51d7936f714d162",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--wheel-install-test",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml"
        },
        {
          "claim": "CLM-5f0bce291857da0ed29e9485c0598625",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--deploy",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml"
        },
        {
          "claim": "CLM-b47b29438d8db95acd314ff7ca4dfdbc",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--build",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml"
        },
        {
          "claim": "CLM-861c6417c196383ce4f54b8f1dc78f7d",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-kev-reference-world.yml--publish",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml"
        },
        {
          "claim": "CLM-9cf63833b1f4f2227a4d22da997f1ef7",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--build",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml"
        },
        {
          "claim": "CLM-a1bac345e9a37dcbb1411db17d415165",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish-runtime-image.yml--verify",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml"
        },
        {
          "claim": "CLM-17c699bd559f38c8877c59ec2d3cecb8",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-kit-bundles",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-2c352360edb105ccf4eda05cd5eb72e4",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-client",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-3114cf4f11a3edceeda99abc4d63d7c4",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--publish-cruxible",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml"
        },
        {
          "claim": "CLM-366683ec1e518bde4e25514c94d95283",
          "source": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-publish.yml--verify-versions",
          "predicate": "security.job.workflow",
          "target": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml"
        }
      ],
      "totals": {
        "subjects": 68
      }
    },
    "truncated": false,
    "next": [
      "cx.get(\"security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl\")"
    ]
  }
});

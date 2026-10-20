// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 682835b2
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.repo/github.com--cruxible-ai-cruxible",
    "detail": "incoming",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk",
    "limit": 50
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.repo/github.com--cruxible-ai-cruxible",
    "kind": "subject",
    "detail": "incoming",
    "incoming": {
      "kind": "incoming",
      "claims": [
        {
          "claim": "CLM-1811d0c2b47fa447bc605ca9c62ac81f",
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml",
          "predicate": "security.workflow.repo"
        },
        {
          "claim": "CLM-2af181b174f67fe5908339c0f4586afa",
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml",
          "predicate": "security.workflow.repo"
        },
        {
          "claim": "CLM-3dfc78b623ddfd3dc261f1a3d985f25d",
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml",
          "predicate": "security.workflow.repo"
        },
        {
          "claim": "CLM-4aa263d658a0926268bea973d969df1d",
          "subject": "security.target/ghcr--cruxible-ai-cruxible-runtime",
          "predicate": "security.target.source_repo"
        },
        {
          "claim": "CLM-549401e7904d6e5cdb3316b1036443e1",
          "subject": "security.target/pypi--cruxible",
          "predicate": "security.target.source_repo"
        },
        {
          "claim": "CLM-558301a773cdcf69eb98318a8b5e7bf2",
          "subject": "security.target/github-release--cruxible-ai-cruxible",
          "predicate": "security.target.source_repo"
        },
        {
          "claim": "CLM-6f5d3fc0bbeedca34ee242dc56013c90",
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
          "predicate": "security.workflow.repo"
        },
        {
          "claim": "CLM-7bbc1b515b54aab61f3f1efbee39d13c",
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml",
          "predicate": "security.workflow.repo"
        },
        {
          "claim": "CLM-8fb6d7ed027be22e4e086861407ff0fa",
          "subject": "security.target/pypi--cruxible-client",
          "predicate": "security.target.source_repo"
        },
        {
          "claim": "CLM-8fcb8de5b79195a38b693c342c62755d",
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml",
          "predicate": "security.workflow.repo"
        },
        {
          "claim": "CLM-986a0aa2c4403e4de618bb5dc8520eff",
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml",
          "predicate": "security.workflow.repo"
        },
        {
          "claim": "CLM-9e3d85a822e4fa475b57480e6d8a1c93",
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml",
          "predicate": "security.workflow.repo"
        },
        {
          "claim": "CLM-becfca2dc59582ed6b61169f2d8ca8b7",
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml",
          "predicate": "security.workflow.repo"
        },
        {
          "claim": "CLM-c6a33287e6650f89e21c0e723de601ec",
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
          "predicate": "security.coverage.of"
        },
        {
          "claim": "CLM-cfc93141e9fc5c2dfc68014f4d6192fc",
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
          "predicate": "security.coverage.of"
        },
        {
          "claim": "CLM-f248063c5a6ed11a12c486f7587a2b2c",
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
          "predicate": "security.workflow.repo"
        },
        {
          "claim": "CLM-f97150fd96896bcc1de8b796f5019376",
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest",
          "predicate": "security.coverage.of"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-20T21:38:27.232447Z"
  }
});

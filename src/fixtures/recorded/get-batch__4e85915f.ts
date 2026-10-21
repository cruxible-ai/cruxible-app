// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 61d97a81
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml",
      "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml",
      "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml",
      "security.target/ghcr--cruxible-ai-cruxible-runtime",
      "security.target/pypi--cruxible",
      "security.target/github-release--cruxible-ai-cruxible",
      "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
      "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml",
      "security.target/pypi--cruxible-client",
      "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml",
      "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml",
      "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml",
      "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml",
      "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
      "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
      "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
      "security.coverage/github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-2654d8267ebb753e2fbc2c40e03f8267",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-8357b5f91020b4874f77b97815a8dba1",
              "value": ".github/workflows/publish-runtime-image.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-1811d0c2b47fa447bc605ca9c62ac81f",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-fac79bdeb1dda9181289a7cd31bc52a2",
              "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-0e0c99d0c13651454ab0e16e882b201d",
                "CLM-6a9e1a7fe4af31eeb8a6221b776436a2"
              ],
              "value": [
                "push:tags:v*",
                "workflow_dispatch"
              ],
              "flags": []
            }
          ],
          "incoming_count": 2,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.659128Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-c2c2032edf0a2e37ed83f1a0d3e7bf9c",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-9380a5b49dbd6a2d8632c80087e18745",
              "value": ".github/workflows/publish-kev-reference-world.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-2af181b174f67fe5908339c0f4586afa",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-1080bb59cf188fcb52c028e7b35516d9",
              "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-4ff095d55bf2b09b0ce23ffc77b6bf17",
                "CLM-57fcbe1b57ba6864c11182bb45ddc449"
              ],
              "value": [
                "workflow_dispatch",
                "schedule:cron:0 6 * * *"
              ],
              "flags": []
            }
          ],
          "incoming_count": 1,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.678608Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-7c70d2a36a93c150d202ffc407bca50f",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-1769c3c91505c98484583a06e089bce6",
              "value": ".github/workflows/docs.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-3dfc78b623ddfd3dc261f1a3d985f25d",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-80e965323d896d068d3a04f1e9b1d771",
              "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-01f78c51f576d54b2f37949609930a0d",
                "CLM-198ef22dee2fa26bb39d0b3b24bc04b5"
              ],
              "value": [
                "workflow_dispatch",
                "push:branches:main"
              ],
              "flags": []
            }
          ],
          "incoming_count": 2,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.697828Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.target/ghcr--cruxible-ai-cruxible-runtime",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.target/ghcr--cruxible-ai-cruxible-runtime",
          "kind": "security.target",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "name",
              "claim": "CLM-159319d6104187f04bf449cae6be234f",
              "value": "cruxible-ai/cruxible-runtime",
              "flags": []
            },
            {
              "predicate": "publish_gate",
              "claim": [
                "CLM-a9d993521fb3806f04be078d3d312ab5"
              ],
              "value": [
                "push:tags:v*"
              ],
              "flags": []
            },
            {
              "predicate": "registry",
              "claim": "CLM-02a86fc677d8217dc15dd6f8c3d80061",
              "value": "ghcr",
              "flags": []
            },
            {
              "predicate": "source_repo",
              "claim": "CLM-4aa263d658a0926268bea973d969df1d",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            }
          ],
          "incoming_count": 4,
          "next": [
            "cx.get(\"security.target/ghcr--cruxible-ai-cruxible-runtime\", detail=\"history\")",
            "cx.get(\"security.target/ghcr--cruxible-ai-cruxible-runtime\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.716750Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.target/pypi--cruxible",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.target/pypi--cruxible",
          "kind": "security.target",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "name",
              "claim": "CLM-6b62e652c077b0b22621b7257c6bcb60",
              "value": "cruxible",
              "flags": []
            },
            {
              "predicate": "publish_gate",
              "claim": [
                "CLM-80ca6c2b746a9140ebca5ceb4a4d9a61"
              ],
              "value": [
                "push:tags:v*"
              ],
              "flags": []
            },
            {
              "predicate": "registry",
              "claim": "CLM-f4fee7ba44083e5b033b7d53aae504b5",
              "value": "pypi",
              "flags": []
            },
            {
              "predicate": "source_repo",
              "claim": "CLM-549401e7904d6e5cdb3316b1036443e1",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            }
          ],
          "incoming_count": 11,
          "next": [
            "cx.get(\"security.target/pypi--cruxible\", detail=\"history\")",
            "cx.get(\"security.target/pypi--cruxible\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.735346Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.target/github-release--cruxible-ai-cruxible",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.target/github-release--cruxible-ai-cruxible",
          "kind": "security.target",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "name",
              "claim": "CLM-9d1b8ba377912f137531f150d257dca5",
              "value": "cruxible-ai/cruxible",
              "flags": []
            },
            {
              "predicate": "publish_gate",
              "claim": [
                "CLM-09e6d952b611db4c127fe6b765a5630e"
              ],
              "value": [
                "push:tags:v*"
              ],
              "flags": []
            },
            {
              "predicate": "registry",
              "claim": "CLM-50dbe3b69c9eea8fd8c5139e07827118",
              "value": "github_release",
              "flags": []
            },
            {
              "predicate": "source_repo",
              "claim": "CLM-558301a773cdcf69eb98318a8b5e7bf2",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            }
          ],
          "incoming_count": 9,
          "next": [
            "cx.get(\"security.target/github-release--cruxible-ai-cruxible\", detail=\"history\")",
            "cx.get(\"security.target/github-release--cruxible-ai-cruxible\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.752463Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-6c1f76d77353505a74669d52c49eda92",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-6afc1ab476cb142cdf0217ec6f86d8d4",
              "value": ".github/workflows/ci.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-6f5d3fc0bbeedca34ee242dc56013c90",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-dd03eab99f27615c09f4732ee345e9c6",
              "value": "github.com/cruxible-ai/cruxible@main",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-035eac0028617af1d04b9381f028786e",
                "CLM-03a5a77c2a39cf1cf019ad461cbca3f8"
              ],
              "value": [
                "push:branches:main",
                "pull_request:branches:main"
              ],
              "flags": []
            }
          ],
          "incoming_count": 4,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.771926Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-d9d7fac5109c4bb57a1daa055ebbb35d",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-17fb15954bf063c5ffa7c1d7e7c03815",
              "value": ".github/workflows/publish.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-7bbc1b515b54aab61f3f1efbee39d13c",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-00bb3595aec3c496339d7badcf55bf8d",
              "value": "github.com/cruxible-ai/cruxible@main",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-5ae2dce177577cacb68316b4eae370f8"
              ],
              "value": [
                "push:tags:v*"
              ],
              "flags": []
            }
          ],
          "incoming_count": 4,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish.yml\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.792359Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.target/pypi--cruxible-client",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.target/pypi--cruxible-client",
          "kind": "security.target",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "name",
              "claim": "CLM-a2c88cedb920347a26739e495e72805f",
              "value": "cruxible-client",
              "flags": []
            },
            {
              "predicate": "publish_gate",
              "claim": [
                "CLM-27473dfda3b68613ade270b588ec5db7"
              ],
              "value": [
                "push:tags:v*"
              ],
              "flags": []
            },
            {
              "predicate": "registry",
              "claim": "CLM-155bb495886febccd3ff9809721413aa",
              "value": "pypi",
              "flags": []
            },
            {
              "predicate": "source_repo",
              "claim": "CLM-8fb6d7ed027be22e4e086861407ff0fa",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            }
          ],
          "incoming_count": 11,
          "next": [
            "cx.get(\"security.target/pypi--cruxible-client\", detail=\"history\")",
            "cx.get(\"security.target/pypi--cruxible-client\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.809974Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-523ae47cebd6978e9f3e5ed6657702d3",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-40bbc16951fec23b6b94c9687de8fa6c",
              "value": ".github/workflows/publish.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-8fcb8de5b79195a38b693c342c62755d",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-1ae4a4b6bfe4b7a8db13e07136cefaea",
              "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-4b42c38a352b3c9e20746dbd4b2b949e"
              ],
              "value": [
                "push:tags:v*"
              ],
              "flags": []
            }
          ],
          "incoming_count": 8,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.826642Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-850da06984c025ec07742a012d1b94f1",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-9c0fc30bfa845bdd0d6056698a73dd15",
              "value": ".github/workflows/publish-kev-reference-world.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-986a0aa2c4403e4de618bb5dc8520eff",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-500b6bb4d28660e5bc8f4ff58116fc2d",
              "value": "github.com/cruxible-ai/cruxible@main",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-0121fc3a17a4dbe98973c49b1fd4ed23",
                "CLM-33233a163ea7a1f7483446300fa69b86"
              ],
              "value": [
                "workflow_dispatch",
                "schedule:cron:0 6 * * *"
              ],
              "flags": []
            }
          ],
          "incoming_count": 1,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-kev-reference-world.yml\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.844803Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-f9961eaaa6110cf3602ab9ade67cb2ce",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-4b3615b5ff3ab7e8b6bd2139772a24ee",
              "value": ".github/workflows/publish-runtime-image.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-9e3d85a822e4fa475b57480e6d8a1c93",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-775450d97c947e84dacf6a4693761a15",
              "value": "github.com/cruxible-ai/cruxible@main",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-0214a1f6801258ac99e196ecd854fcea",
                "CLM-e64e46e6d9ba555fe666f457ad002157"
              ],
              "value": [
                "push:tags:v*",
                "workflow_dispatch"
              ],
              "flags": []
            }
          ],
          "incoming_count": 2,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-publish-runtime-image.yml\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.862762Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-4fc6c7aa4bdd22e46d4de334b6d3200c",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-c062307a72a71bead0a5647e502d116a",
              "value": ".github/workflows/docs.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-becfca2dc59582ed6b61169f2d8ca8b7",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-28711104923ab385004e80c03e51e6a0",
              "value": "github.com/cruxible-ai/cruxible@main",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-a9923c26c134ab4ce748d99b735829e3",
                "CLM-d8b89c0f6bf3759c485678aea0cf82ac"
              ],
              "value": [
                "workflow_dispatch",
                "push:branches:main"
              ],
              "flags": []
            }
          ],
          "incoming_count": 2,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.882786Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
          "kind": "security.coverage",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "of",
              "claim": "CLM-c6a33287e6650f89e21c0e723de601ec",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "revision",
              "claim": "CLM-7052ca2a7c9a819389901f9dfa41993b",
              "value": "4e9b5db950bc66145fc72252be82b40a7826077c",
              "flags": [
                "stale"
              ]
            },
            {
              "predicate": "scope",
              "claim": "CLM-9f999f8ccb020644d586b2362b419f41",
              "value": "ci.workflows",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-2059f0285621559df7b8cb5c5cae6ac0",
              "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/",
              "flags": []
            }
          ],
          "incoming_count": 5,
          "next": [
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows\", detail=\"why\")",
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows\", detail=\"history\")",
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.900499Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
          "kind": "security.coverage",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "of",
              "claim": "CLM-cfc93141e9fc5c2dfc68014f4d6192fc",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "revision",
              "claim": "CLM-adf497c8bb094e3cf7caaf9a39e27562",
              "value": "4e9b5db950bc66145fc72252be82b40a7826077c",
              "flags": [
                "stale"
              ]
            },
            {
              "predicate": "scope",
              "claim": "CLM-7fac055838ff149bfa93b6ca92956b53",
              "value": "ci.workflows",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-e4ef746250f08a8b8feb6e5033e32835",
              "value": "github.com/cruxible-ai/cruxible@main:.github/workflows/",
              "flags": []
            }
          ],
          "incoming_count": 5,
          "next": [
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows\", detail=\"why\")",
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows\", detail=\"history\")",
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.918121Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-9787b90be1245b153d4915b351601c53",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-7e3474185d0cfc9c791099247c035ec7",
              "value": ".github/workflows/ci.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-f248063c5a6ed11a12c486f7587a2b2c",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-4093956e4ef3726a66b5e24235f718b4",
              "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-2bccdfbdf9ea4dcc89a3deec26606c3f",
                "CLM-6bef538dff2ade00cac7314c15f6364b"
              ],
              "value": [
                "pull_request:branches:main",
                "push:branches:main"
              ],
              "flags": []
            }
          ],
          "incoming_count": 4,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml\", detail=\"incoming\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.936048Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.coverage/github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest",
          "kind": "security.coverage",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "of",
              "claim": "CLM-f97150fd96896bcc1de8b796f5019376",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "revision",
              "claim": "CLM-8535bf9214bc303f5c01763e0a47b2e9",
              "value": "d5241395edd42f9d753e48f1cb81f16021d04b20",
              "flags": [
                "stale"
              ]
            },
            {
              "predicate": "scope",
              "claim": "CLM-7e32ef833eaa8dfa620755280d1ed818",
              "value": "release.manifest",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-5f353a65caad3601f6d08e0f97b6a1ff",
              "value": "github.com/cruxible-ai/cruxible@v0.3.2:src/cruxible_core/kit_distribution/manifest.json",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest\", detail=\"why\")",
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest\", detail=\"history\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "evaluation_time": "2026-10-21T19:49:24.953273Z"
      }
    ]
  }
});

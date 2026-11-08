# Pinned daemon contract

`openapi.json` is the inter-repo contract with the cruxible-core daemon. The current pin was read
from a read-only daemon serving a copy of the previous console world under
`coordinator-scratch/console2-scratch`, using the read-only `console-core` checkout.
`pin.json` records the core commit it came from,
and that build's version and SDK contract digest (what `GET /version` answers; the About
page marks a daemon that answers otherwise):
currently **cruxible-core `43155c135`** (taken from a scratch daemon's served `/openapi.json`).
The served version remains **0.5.1**; the SDK digest, OpenAPI schema and regenerated
TypeScript types are unchanged from the previous pin.

TypeScript types (`src/api/generated/`) are generated from this file, never hand-written,
and the fixture responses under `src/fixtures/recorded/` (recorded at this pin) and
`src/fixtures/authored/` are typechecked against them.
To pick up a contract change:

```sh
CRUXIBLE_CORE_DIR=~/path/to/cruxible-core \
PYTHON=~/path/to/cruxible-core/.venv/bin/python \
  scripts/pin-openapi.sh        # writes openapi.json + pin.json, runs pnpm gen:api
```

The script refuses a core checkout with uncommitted changes. Regeneration is
byte-stable: running it twice yields the same file. Re-record the fixtures
(`scripts/record-fixtures.ts`) whenever the pin moves; `pnpm typecheck` fails on any
recorded response that no longer matches the schema. Contract drift is supposed to show
up as a regeneration diff in review, not as a runtime surprise.

# Pinned daemon contract

`openapi.json` is the inter-repo contract with the cruxible-core daemon. It is generated
offline from a core checkout (the FastAPI app is built in-process against a throwaway
HOME and state root; no daemon runs). `pin.json` records the core commit it came from:
currently **cruxible-core `a725d8320`**.

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

# Pinned daemon contract

`openapi.json` is the inter-repo contract with the cruxible-core daemon. The current pin was
generated offline by `scripts/pin-openapi.sh` (the FastAPI app built in-process against a
throwaway HOME and state root; no daemon ran).
`pin.json` records the core commit it came from,
and that build's version and SDK contract digest (what `GET /version` answers; the About
page marks a daemon that answers otherwise):
currently **cruxible-core `e762307a5`** (claude/integ-05b with claude/needed-inputs merged,
built for a walkthrough). The version remains **0.5.1**; the SDK digest moved.
The fixtures under `src/fixtures/recorded/` are still the `43155c135` recording (their
`/version` answers the old digest, so the recorded About page reads Differs until they are
re-recorded at this pin).

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

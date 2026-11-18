# Pinned daemon contract

`openapi.json` is the inter-repo contract with the cruxible-core daemon. The current pin was
generated offline by `scripts/pin-openapi.sh` (the FastAPI app built in-process against a
throwaway HOME and state root; no daemon ran).
`pin.json` records the core commit it came from,
and that build's version and SDK contract digest (what `GET /version` answers; the About
page marks a daemon that answers otherwise):
currently **cruxible-core `af53eb0be`** (the 0.5.0 release line, `rc/0.5.0`): version
**0.5.0**. A release core builds this console into its wheel (core's
`scripts/build_console.py`), and refuses unless this pin's version and SDK contract digest are
the ones that core serves; the core commit here is informational.
The fixtures under `src/fixtures/recorded/` are still the `43155c135` recording, carried to
this contract by hand where it changed shape (capability slots, layout extracts, provider
binding v5, `proposed_at`) and with `/version` answering this pin; re-record them when a
scratch world at this core is at hand.

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

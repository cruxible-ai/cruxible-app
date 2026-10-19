#!/usr/bin/env bash
# Regenerate the pinned daemon contract from a cruxible-core checkout, offline.
#
# Builds the FastAPI app in-process against a throwaway HOME and state root
# (no daemon, nothing under ~/.cruxible*), dumps app.openapi() to
# api/openapi.json, records the core commit in api/pin.json, then regenerates
# the TypeScript types with `pnpm gen:api`.
#
#   CRUXIBLE_CORE_DIR=~/src/cruxible PYTHON=~/src/cruxible/.venv/bin/python \
#     scripts/pin-openapi.sh
set -euo pipefail

core="${CRUXIBLE_CORE_DIR:?set CRUXIBLE_CORE_DIR to a cruxible-core checkout}"
python="${PYTHON:-$core/.venv/bin/python}"
app_root="$(cd "$(dirname "$0")/.." && pwd)"
scratch="$(mktemp -d)"
trap 'rm -rf "$scratch"' EXIT
mkdir -p "$scratch/home" "$scratch/state"

commit="$(git -C "$core" rev-parse HEAD)"
dirty="$(git -C "$core" status --porcelain --untracked-files=no | head -1)"
if [[ -n "$dirty" ]]; then
  echo "refusing: $core has uncommitted changes; pin a clean commit" >&2
  exit 1
fi

env -i PATH="$PATH" HOME="$scratch/home" \
  XDG_CONFIG_HOME="$scratch/home/.config" XDG_DATA_HOME="$scratch/home/.local/share" \
  XDG_STATE_HOME="$scratch/home/.local/state" XDG_CACHE_HOME="$scratch/home/.cache" \
  CRUXIBLE_STATE_ROOT="$scratch/state" \
  PYTHONPATH="$core/src:$core/packages/cruxible-client/src" \
  "$python" - "$app_root/api/openapi.json" <<'PY'
import json
import sys

from cruxible_core.server.app import create_app

with open(sys.argv[1], "w", encoding="utf-8") as handle:
    json.dump(create_app().openapi(), handle, indent=2)
    handle.write("\n")
PY

printf '{\n  "core_commit": "%s"\n}\n' "$commit" > "$app_root/api/pin.json"
(cd "$app_root" && pnpm gen:api)
echo "pinned api/openapi.json to cruxible-core $commit"

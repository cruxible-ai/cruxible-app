import type { NextRepair } from "../api/schemas.ts";

/**
 * The CLI command path and MCP tool that perform each `next` repair operation
 * (core's `_REPAIR_COMMAND_PATHS` and `_REPAIR_TOOLS` in service/discovery/next.py).
 * The served `command` is the runnable CLI line; these name the door when a
 * repair is withheld or carries no command. A hand edit has neither.
 */
export const REPAIR_DOORS: Record<NextRepair["operation"], { cli: string; mcp: string } | null> = {
  "cruxible.authoring.example": { cli: "authoring example", mcp: "cruxible_authoring_compile" },
  "cruxible.authoring.submit": { cli: "authoring submit", mcp: "cruxible_authoring_submit" },
  "cruxible.authoring.bind": { cli: "authoring bind", mcp: "cruxible_authoring_bind" },
  "cruxible.claim.retire": { cli: "retire", mcp: "cruxible_retire" },
  "cruxible.rebind": { cli: "rebind", mcp: "cruxible_write" },
  "cruxible.get": { cli: "get", mcp: "cruxible_get" },
  "cruxible.set": { cli: "set", mcp: "cruxible_set" },
  "cruxible.write": { cli: "write", mcp: "cruxible_write" },
  "cruxible.floor.export": { cli: "floor export", mcp: "cruxible_floor_export" },
  "cruxible.block.depublish": { cli: "block depublish", mcp: "cruxible_block_depublish" },
  "cruxible.block.detach": { cli: "block detach", mcp: "cruxible_block_detach" },
  "cruxible.block.repin": { cli: "block repin", mcp: "cruxible_block_repin" },
  "cruxible.block.sync": { cli: "block sync", mcp: "cruxible_block_sync" },
  "cruxible.files.propose": { cli: "files propose", mcp: "cruxible_files_propose" },
  "cruxible.proposal.readmit": { cli: "proposal readmit", mcp: "cruxible_proposal_readmit" },
  "cruxible.proposal.approve": { cli: "proposal approve", mcp: "cruxible_proposal_approve" },
  "cruxible.proposal.activate": { cli: "proposal activate", mcp: "cruxible_proposal_activate" },
  "cruxible.compiler.upgrade": { cli: "compiler upgrade", mcp: "cruxible_compiler_upgrade" },
  "cruxible.line.enable": { cli: "line enable", mcp: "cruxible_line_enable" },
  "cruxible.line.evaluate": { cli: "line evaluate", mcp: "cruxible_line_evaluate" },
  "cruxible.line.dispatch": { cli: "line dispatch", mcp: "cruxible_line_dispatch" },
  "cruxible.inbox.list": { cli: "inbox list", mcp: "cruxible_inbox_list" },
  "cruxible.prediction.settle": { cli: "prediction settle", mcp: "cruxible_prediction_settle" },
  "cruxible.kit.add": { cli: "kit add", mcp: "cruxible_kit_add" },
  hand_edit: null,
};

/** A served command that is SDK code (`cx.…`), not a CLI line: an older daemon or another surface's rendering. */
export const isSdkCode = (command: string) => /^cx[.(]/.test(command.trim());

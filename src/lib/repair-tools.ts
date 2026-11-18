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
  "cruxible.runbook.run": { cli: "runbook run", mcp: "cruxible_runbook_run" },
  "cruxible.action.run": { cli: "action run", mcp: "cruxible_action_run" },
  "cruxible.inbox.list": { cli: "inbox list", mcp: "cruxible_inbox_list" },
  "cruxible.prediction.settle": { cli: "prediction settle", mcp: "cruxible_prediction_settle" },
  "cruxible.kit.add": { cli: "kit add", mcp: "cruxible_kit_add" },
  "cruxible.vocabulary.export": { cli: "vocabulary export", mcp: "cruxible_vocabulary_export" },
  hand_edit: null,
};

/** A served command that is SDK code (`cx.…`), not a CLI line: an older daemon or another surface's rendering. */
export const isSdkCode = (command: string) => /^cx[.(]/.test(command.trim());

type Repairish = { operation: NextRepair["operation"]; target?: string; arguments?: unknown };

/**
 * Where the console itself shows what a repair reads. Only reads qualify (the
 * console never writes): `inbox.list` opens the Inbox page filtered by the
 * repair's own `line` (else its Line target) and `status` arguments; `get` opens the ref it names.
 * Everything comes from the served operation and arguments; null for every
 * other operation.
 */
export type ConsoleStep = { kind: "inbox"; line: string | null; status: string | null } | { kind: "ref"; ref: string };

export function consoleStep(repair: Repairish | null | undefined): ConsoleStep | null {
  if (!repair) return null;
  const args = typeof repair.arguments === "object" && repair.arguments !== null && !Array.isArray(repair.arguments) ? (repair.arguments as Record<string, unknown>) : {};
  const text = (value: unknown) => (typeof value === "string" && value !== "" ? value : null);
  if (repair.operation === "cruxible.inbox.list") {
    // the Line from the repair's arguments, else its target when that names a Line
    const target = text(repair.target);
    return { kind: "inbox", line: text(args.line) ?? (target?.startsWith("Line:") ? target : null), status: text(args.status) };
  }
  if (repair.operation === "cruxible.get") {
    const ref = text(args.ref) ?? text(repair.target);
    return ref ? { kind: "ref", ref } : null;
  }
  return null;
}

/** The Inbox page's search for an inbox step. */
export function inboxSearch(step: Extract<ConsoleStep, { kind: "inbox" }>): string {
  const params = new URLSearchParams();
  if (step.line) params.set("line", step.line.replace(/^Line:/, ""));
  if (step.status) params.set("status", step.status);
  const query = params.toString();
  return query ? `?${query}` : "";
}

/**
 * A repair's CLI and MCP forms. `cli` is the served command when the queue
 * rendered one (never SDK code), else the command path with the row's Line
 * when the operation acts on one (`served` false: the arguments are the
 * row's); `mcp` the tool. A hand edit has neither.
 */
export function repairForms(
  repair: (Repairish & { command?: string | null }) | null | undefined,
  requirement: { operation: NextRepair["operation"]; tool: string } | null | undefined,
  subject: string,
): { cli: string | null; served: boolean; mcp: string | null } {
  const operation = repair?.operation ?? requirement?.operation;
  if (!operation) return { cli: null, served: false, mcp: null };
  const door = REPAIR_DOORS[operation];
  const served = repair?.command && !isSdkCode(repair.command) ? repair.command : null;
  const line = operation.startsWith("cruxible.line.") && subject.startsWith("Line:") ? ` ${subject.slice(5)}` : "";
  return { cli: served ?? (door ? `cruxible ${door.cli}${line}` : null), served: served !== null, mcp: requirement?.tool ?? door?.mcp ?? null };
}

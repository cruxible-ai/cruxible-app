/**
 * Categorical colors for structure: what a node IS (a step's role, a column of
 * the evidence flow). Status keeps the two signals (amber = waiting on
 * someone, red = wrong or blocked; see vocabulary.ts), so this palette has no
 * amber, orange or red hue. Each color clears 3:1 against the zinc-950/900
 * surfaces, and neighbours differ in lightness as well as hue so they stay
 * apart for common color-vision deficiencies.
 */

export const PALETTE = {
  sky: "#38bdf8",
  indigo: "#818cf8",
  teal: "#2dd4bf",
  violet: "#a78bfa",
  blue: "#60a5fa",
  fuchsia: "#e879f9",
  emerald: "#34d399",
  slate: "#94a3b8",
  stone: "#a8a29e",
} as const;

export type StepRoleColor =
  | "input"
  | "trigger"
  | "source"
  | "tap"
  | "call"
  | "invoke"
  | "guard"
  | "shape"
  | "terminal";

/** A Procedure step's role → its accent, with the word the legend uses. */
export const ROLE_COLOR: Record<StepRoleColor, { color: string; legend: string }> = {
  trigger: { color: PALETTE.sky, legend: "what starts it" },
  input: { color: PALETTE.indigo, legend: "input and parameters" },
  source: { color: PALETTE.teal, legend: "retains evidence" },
  tap: { color: PALETTE.violet, legend: "reads state" },
  call: { color: PALETTE.blue, legend: "calls a Provider" },
  invoke: { color: PALETTE.fuchsia, legend: "runs a Procedure" },
  guard: { color: PALETTE.stone, legend: "checks a condition" },
  shape: { color: PALETTE.slate, legend: "reshapes data" },
  terminal: { color: PALETTE.emerald, legend: "writes or returns" },
};

/** The evidence flow's columns. */
export const FLOW_COLOR = {
  source: PALETTE.teal,
  contract: PALETTE.slate,
  trigger: PALETTE.sky,
  line: PALETTE.blue,
  claimType: PALETTE.violet,
} as const;

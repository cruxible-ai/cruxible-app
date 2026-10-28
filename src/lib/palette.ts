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
  /** Cruxible teal (the brand mark's color). */
  brand: "#00A595",
  violet: "#a78bfa",
  blue: "#60a5fa",
  fuchsia: "#e879f9",
  emerald: "#34d399",
  slate: "#94a3b8",
  stone: "#a8a29e",
  zinc: "#d4d4d8",
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
  trigger: { color: PALETTE.sky, legend: "What starts it" },
  input: { color: PALETTE.indigo, legend: "Input and parameters" },
  source: { color: PALETTE.blue, legend: "Retains evidence" },
  tap: { color: PALETTE.violet, legend: "Reads state" },
  call: { color: PALETTE.stone, legend: "Calls a Provider" },
  invoke: { color: PALETTE.fuchsia, legend: "Runs a Procedure" },
  guard: { color: PALETTE.zinc, legend: "Checks a condition" },
  shape: { color: PALETTE.slate, legend: "Reshapes data" },
  terminal: { color: PALETTE.emerald, legend: "Writes or returns" },
};

/** The evidence flow's columns. */
/**
 * What a Line may do to accepted state, as a color: settle (accepts its own
 * changes under a mandate), propose (submits them for review), observe
 * (writes nothing; posts to its inbox). Settle shares fuchsia with "accepted
 * into state" in the activity feed. Written only by hand: neutral.
 */
export const AUTHORITY_COLOR = {
  settle: PALETTE.fuchsia,
  propose: PALETTE.brand,
  observe: PALETTE.slate,
  none: "#52525b",
} as const;

export const FLOW_COLOR = {
  acquirer: PALETTE.indigo,
  source: PALETTE.blue,
  contract: PALETTE.slate,
  trigger: PALETTE.sky,
  line: PALETTE.blue,
  claimType: PALETTE.violet,
} as const;

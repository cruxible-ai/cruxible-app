import { describe, expect, it } from "vitest";
import { healthTone } from "./vocabulary";

describe("health tones", () => {
  it("greens working checks, hollows unobserved ones, and keeps the two signals", () => {
    expect(healthTone("current")).toBe("ok");
    expect(healthTone("not_observed")).toBe("off");
    expect(healthTone("lagging")).toBe("waiting");
    expect(healthTone("stalled")).toBe("wrong");
    expect(healthTone("claim_type_upgrade_available")).toBe("waiting");
    expect(healthTone("something_new")).toBeUndefined();
  });
});

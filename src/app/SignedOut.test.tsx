import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SignedOut } from "./SignedOut";

describe("SignedOut", () => {
  it("says how to sign this browser in", () => {
    render(<SignedOut />);
    expect(screen.getByText(/signs this browser in for this run/)).toBeInTheDocument();
    expect(screen.getByText("cruxible console")).toBeInTheDocument();
  });
});

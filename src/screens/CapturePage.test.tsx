import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { FETCHED, PRIVATE } from "@/fixtures/authored/captures";

afterEach(cleanup);
beforeAll(() => {
  // jsdom has no object URLs; the download link only needs a string.
  URL.createObjectURL ??= () => "blob:capture";
  URL.revokeObjectURL ??= () => undefined;
});

const page = (digest: string) => `/i/inst_fixture/ref/${encodeURIComponent(`Capture:${digest}`)}`;

describe("Capture page", () => {
  it("leads with the handle, source and time, and shows the fetched body unwrapped with a download", async () => {
    renderApp(page(FETCHED));
    expect(await screen.findByRole("heading", { name: `CAP-${FETCHED.slice(7, 19)}` })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(main.getByText("cisa.kev.catalog")).toBeInTheDocument();
    // the response the server sent, pretty-printed, not core's wrapper
    expect(await main.findByText(/"title": "CISA Catalog of Known Exploited Vulnerabilities"/)).toBeInTheDocument();
    expect(main.queryByText(/body_base64/)).not.toBeInTheDocument();
    expect(main.getByRole("link", { name: "https://www.cisa.gov/kev.json" })).toBeInTheDocument();
    expect(main.getByRole("link", { name: /Download/ })).toHaveAttribute("download", "cisa.kev.catalog.json");
    // the SDK call the card names as next is not shown
    expect(main.queryByText(/client\.read_capture/)).not.toBeInTheDocument();
  });

  it("says when the token can't read bodies and gives the CLI read", async () => {
    renderApp(page(PRIVATE));
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText(/can't read Capture contents: that takes governed_write/)).toBeInTheDocument();
    expect(main.getByText(`cruxible capture read CAP-${PRIVATE.slice(7, 19)}`)).toBeInTheDocument();
  });
});

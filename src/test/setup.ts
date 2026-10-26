import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./msw-server";

// A navigation in the memory router (a table writing its sort to the URL)
// builds a Request with jsdom's AbortSignal, which Node's Request refuses.
// Tests never abort a navigation, so the signal is dropped here.
const NodeRequest = globalThis.Request;
globalThis.Request = class extends NodeRequest {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    if (init?.signal) {
      const { signal, ...rest } = init;
      void signal;
      super(input, rest);
    } else {
      super(input, init);
    }
  }
} as typeof Request;

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// React Flow measures its pane, and the Line page now draws a graph: jsdom has no ResizeObserver.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;

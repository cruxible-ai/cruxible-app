import { setupServer } from "msw/node";

/**
 * MSW node server. Fixtures sit behind the same data-source boundary the app
 * uses — tests build a real ApiClient pointed at an arbitrary base URL and
 * MSW intercepts at the network layer. Rendering code never imports fixtures.
 */
export const server = setupServer();

import { defineConfig } from "@playwright/test";

const port = Number(process.env.UI_SMOKE_PORT ?? "5177");
const baseURL = `http://127.0.0.1:${port}`;
const webServerEnv: Record<string, string> = Object.fromEntries(
  Object.entries(process.env).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  ),
);

export default defineConfig({
  testDir: "./tests/smoke",
  fullyParallel: false,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    command: `pnpm exec vite --host 127.0.0.1 --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...webServerEnv,
      VITE_CRUXIBLE_FIXTURES: process.env.UI_SMOKE_WORLD ?? "authored",
      VITE_CRUXIBLE_INSTANCE_ID: "inst_fixture",
    },
  },
});

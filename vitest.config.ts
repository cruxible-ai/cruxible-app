import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    // A fixed zone with daylight saving, so local-time wording is deterministic.
    env: { TZ: "America/New_York" },
    exclude: [...configDefaults.exclude, "tests/smoke/**"],
  },
});

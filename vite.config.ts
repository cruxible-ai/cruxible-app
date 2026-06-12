import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Dev-only proxy to the local daemon. The daemon has no CORS, so the dev
// server fronts it; the bearer token is injected here from the shell env and
// never reaches client code. Local prod serves the bundle from the daemon
// same-origin, so '/api' works unproxied there.
const DAEMON_URL = process.env.CRUXIBLE_DAEMON_URL ?? "http://127.0.0.1:8119";
const DAEMON_TOKEN = process.env.CRUXIBLE_SERVER_BEARER_TOKEN;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  server: {
    proxy: {
      "/api": {
        target: DAEMON_URL,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            if (DAEMON_TOKEN && !proxyReq.getHeader("authorization")) {
              proxyReq.setHeader("Authorization", `Bearer ${DAEMON_TOKEN}`);
            }
          });
        },
      },
    },
  },
});

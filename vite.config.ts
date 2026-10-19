import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Dev-only proxy to the local daemon. The daemon has no CORS, so the dev
// server fronts it; the bearer token is injected here from the shell env and
// never reaches client code. Local prod serves the bundle from the daemon
// same-origin, so '/api' works unproxied there.
//
// CRUXIBLE_SERVER_SOCKET proxies to a Unix-socket daemon (the default local
// transport, auth off: start it with --capability-ceiling read_only so the
// console cannot mutate even by mistake). Otherwise CRUXIBLE_DAEMON_URL names
// a TCP daemon, which requires --auth and a read-only bearer token.
const DAEMON_SOCKET = process.env.CRUXIBLE_SERVER_SOCKET;
const DAEMON_URL = process.env.CRUXIBLE_DAEMON_URL ?? "http://127.0.0.1:8100";
const DAEMON_TOKEN = process.env.CRUXIBLE_SERVER_BEARER_TOKEN;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  server: {
    proxy: {
      "/api": {
        // http-proxy connects through socketPath; host/port only shape the Host header.
        target: DAEMON_SOCKET ? { socketPath: DAEMON_SOCKET, protocol: "http:", host: "localhost", port: 80 } : DAEMON_URL,
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

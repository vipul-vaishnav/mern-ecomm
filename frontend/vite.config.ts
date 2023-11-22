import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// # (so you can import "path" without error)
// npm i -D @types/node

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});

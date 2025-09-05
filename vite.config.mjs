import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  
  // Base path for GitHub Pages
  base: "/Quiz-App/",

  server: {
    port: 3000,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ["quiz-app-pcp8.onrender.com"], // ✅ Add this line
  },

  build: {
    // Optional: include sourcemap for debugging
    sourcemap: true,
  },
});

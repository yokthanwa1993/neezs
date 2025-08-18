import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dyadComponentTagger from '@dyad-sh/react-vite-component-tagger';

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 32100,
    allowedHosts: ["www.neeiz.com", "neeiz.com"],
    hmr: {
      host: "www.neeiz.com",
      protocol: "ws",
      port: 80,
    },
    proxy: {
      "/api": {
        // Route dev API calls to production by default so local UI sees real data
        target: process.env.VITE_API_URL || "https://neeiz-01.web.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        // Disable hashing to simplify cache management for now
        entryFileNames: `assets/index.js`,
        chunkFileNames: `assets/chunk.js`,
        assetFileNames: `assets/[name].[ext]`,
        manualChunks: undefined,
      },
    },
  },
}));
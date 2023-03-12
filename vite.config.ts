import { defineConfig } from "vite"
import path from "node:path"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "./",
  root: "src/renderer",
  publicDir: "../../public",
  plugins: [react()],
  build: {
    outDir: "../../build/renderer",
    emptyOutDir: true
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src/renderer")
      },
      {
        find: "@cronos",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  }
})

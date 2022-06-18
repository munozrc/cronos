import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { emptyOutDir: true },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    port: 5173,
    strictPort: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:5000' // Si tu utilises un backend Express
    }
  }
})

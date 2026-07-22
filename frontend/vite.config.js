import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      // Dentro de Docker, el backend se llama por su nombre de servicio
      '/api': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
    },
  },
})

import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      ignored: ['**/*.~tmp'],
      usePolling: true,
      interval: 1000,
    },
  },
  base: '/wedding-announcement/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})

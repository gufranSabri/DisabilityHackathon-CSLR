import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Embedded as a static bundle under signworld-web/public/legacy/medical/,
// rendered there via <iframe>. base must match that mount path so built
// asset URLs (JS/CSS/fonts) resolve correctly regardless of host route.
export default defineConfig({
  base: '/legacy/medical/',
  plugins: [react()],
  server: { port: 5302, strictPort: true },
  preview: { port: 5302, strictPort: true },
  build: { outDir: 'dist' },
})

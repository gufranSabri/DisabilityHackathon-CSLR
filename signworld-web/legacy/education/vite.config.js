import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Embedded as a static bundle under signworld-web/public/legacy/education/,
// rendered there via <iframe>. base must match that mount path so built
// asset URLs (JS/CSS/fonts) resolve correctly regardless of host route.
export default defineConfig({
  base: '/legacy/education/',
  plugins: [react()],
  server: { port: 5301, strictPort: true },
  preview: { port: 5301, strictPort: true },
  build: { outDir: 'dist' },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base '/' because the site is served from the custom domain chhotuandco.com
export default defineConfig({ plugins: [react()], base: '/' })

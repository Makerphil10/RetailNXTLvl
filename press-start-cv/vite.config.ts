import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps the build deployable from any path (Netlify, GitHub Pages, subfolder)
export default defineConfig({
  plugins: [react()],
  base: './',
  css: {
    // inline config stops Vite from picking up the parent repo's postcss.config.js
    postcss: { plugins: [] },
  },
});

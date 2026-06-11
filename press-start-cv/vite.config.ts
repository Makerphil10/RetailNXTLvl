import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps the build deployable from any path (Netlify, GitHub Pages, subfolder)
export default defineConfig({
  plugins: [react()],
  base: './',
});

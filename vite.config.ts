import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env for legacy references (nicht mehr nötig nach Umstellung auf import.meta.env)
    'process.env': {}
  },
  // Wichtig für GitHub Pages unter makerphil10.github.io/RetailNXTLvl/
  base: '/RetailNXTLvl/',
});
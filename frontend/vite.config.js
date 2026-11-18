import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { siteBase } from './scripts/lib/base.js';

export default defineConfig({
  // "/" for the live site; e.g. "/v2/" for a test copy in a subfolder (SITE_BASE=/v2/)
  base: siteBase,
  plugins: [reactRouter()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});

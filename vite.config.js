import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://hugomartins.eu',
      exclude: ['/drafts/**'],
      dynamicRoutes: [], // add manual routes if you're using React Router
    })
  ],
  base: '/',
});

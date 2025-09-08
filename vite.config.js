import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import path from 'node:path';
import fs from 'node:fs';

// Ensures dist/robots.txt exists before sitemap's closeBundle
function ensureRobotsTxt() {
  return {
    name: 'ensure-robots',
    apply: 'build',
    generateBundle() {
      // Prefer your public/robots.txt if present; otherwise emit a safe default
      const publicRobots = path.resolve(__dirname, 'public/robots.txt');
      let source = 'User-agent: *\nAllow: /\nSitemap: https://hugomartins.eu/sitemap.xml\n';
      if (fs.existsSync(publicRobots)) {
        source = fs.readFileSync(publicRobots, 'utf8');
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    ensureRobotsTxt(), // <-- add this BEFORE Sitemap
    Sitemap({
      hostname: 'https://hugomartins.eu',
      exclude: ['/drafts/**'],
      dynamicRoutes: [
        '/', '/about', '/archive', '/contact',
        '/tutorials',
        '/tutorials/introduction-to-probability-distribution',
        '/tutorials/introduction-to-probability-distribution/foundations',
        '/tutorials/introduction-to-probability-distribution/discrete',
        '/tutorials/introduction-to-probability-distribution/discrete/bernoulli',
        '/tutorials/introduction-to-probability-distribution/discrete/binomial',
        '/tutorials/introduction-to-probability-distribution/discrete/geometric',
        '/tutorials/introduction-to-probability-distribution/discrete/negative-binomial',
        '/tutorials/introduction-to-probability-distribution/discrete/poisson',
        '/tutorials/introduction-to-probability-distribution/continuous',
        '/tutorials/introduction-to-probability-distribution/continuous/uniform',
        '/tutorials/introduction-to-probability-distribution/continuous/exponential',
        '/tutorials/introduction-to-probability-distribution/continuous/gamma',
        '/tutorials/introduction-to-probability-distribution/continuous/normal',
        '/tutorials/introduction-to-probability-distribution/continuous/clt',
        '/tutorials/introduction-to-probability-distribution/practice'
      ],
      // If your plugin supports it, you can also keep these;
      // they won't conflict because the file already exists now.
      // generateRobotsTxt: true,
      // robots: [{ userAgent: '*', allow: '/' }],
    }),
  ],
  base: '/', // custom domain
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@tutorials': path.resolve(__dirname, 'src/tutorials'),
    },
  },
  build: { sourcemap: true },
});


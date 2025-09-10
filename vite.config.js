import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import path from 'node:path';
import fs from 'node:fs';

const OUT_DIR = 'dist';

// Ensure robots.txt exists on disk before sitemap's closeBundle
function writeRobotsPre() {
  return {
    name: 'write-robots-pre',
    apply: 'build',
    enforce: 'pre',            // run this closeBundle BEFORE others
    closeBundle() {
      const outDir = path.resolve(__dirname, OUT_DIR);
      const file = path.join(outDir, 'robots.txt');
      const fromPublic = path.resolve(__dirname, 'public/robots.txt');
      let source = 'User-agent: *\nAllow: /\nSitemap: https://hugomartins.eu/sitemap.xml\n';
      if (fs.existsSync(fromPublic)) {
        source = fs.readFileSync(fromPublic, 'utf8');
      }
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(file, source, 'utf8');   // <-- ensure file exists
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    writeRobotsPre(),             // must come BEFORE Sitemap in the array
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
        '/tutorials/introduction-to-probability-distribution/continuous/continuous-intro',
        '/tutorials/introduction-to-probability-distribution/continuous/uniform',
        '/tutorials/introduction-to-probability-distribution/continuous/exponential',
        '/tutorials/introduction-to-probability-distribution/continuous/gamma',
        '/tutorials/introduction-to-probability-distribution/continuous/normal',
        '/tutorials/introduction-to-probability-distribution/continuous/clt',
        '/tutorials/introduction-to-probability-distribution/practice'
      ],
      // Keep robots generation OFF, since we’re writing the file ourselves:
      // generateRobotsTxt: false,
    }),
  ],
  base: '/', // custom domain root
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@tutorials': path.resolve(__dirname, 'src/tutorials'),
    },
  },
  build: { sourcemap: true, outDir: OUT_DIR },
});

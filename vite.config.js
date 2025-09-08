// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
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
     // Have the plugin generate dist/robots.txt instead of opening one
     generateRobotsTxt: true,
     robots: [
       { userAgent: '*', allow: '/' },
     ],
    })
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@tutorials': path.resolve(__dirname, 'src/tutorials'),
    },
  },
});

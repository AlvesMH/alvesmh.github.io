import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import path from 'node:path';
import fs from 'node:fs';

const OUT_DIR = 'dist';

const postRoutes = [
  '/post/the-cost-of-making-an-expert',
  '/post/ai_advantage_services',
  '/post/agentic_ai_blog_post',
  '/post/redesigning-undergraduate-education',
  '/post/transformative-education-ai-future',
  '/post/future_of_work_and_worth',
  '/post/why_genai_literacy_new_entry_level_skill',
  '/post/prompting_science',
  '/post/offloading_to_augmentation',
  '/post/flipped_classroom',
  '/post/beyond-the-syllabus',
  '/post/co-thinking-model',
  '/post/slow-thinking-fast-ai',
  '/post/ai-literacy-guiding-principles'
];

function writeRobotsPre() {
  return {
    name: 'write-robots-pre',
    apply: 'build',
    enforce: 'pre',
    closeBundle() {
      const outDir = path.resolve(__dirname, OUT_DIR);
      const fromPublic = path.resolve(__dirname, 'public/robots.txt');
      fs.mkdirSync(outDir, { recursive: true });
      if (fs.existsSync(fromPublic)) fs.copyFileSync(fromPublic, path.join(outDir, 'robots.txt'));
    }
  };
}

export default defineConfig({
  ssr: { noExternal: ['react-helmet-async'] },
  plugins: [
    react(),
    writeRobotsPre(),
    Sitemap({
      hostname: 'https://hugomartins.eu',
      exclude: ['/drafts/**'],
      dynamicRoutes: [
        '/', '/teaching', '/teaching/ai-literacy-ntu', '/work', '/work/ai-in-education', '/work/adaptive-expertise', '/work/human-ai-work', '/ideas', '/profile',
        '/about', '/cv', '/contact', '/tools', ...postRoutes,
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
      ]
    })
  ],
  base: '/',
  resolve: { alias: { '@': path.resolve(__dirname, 'src'), '@tutorials': path.resolve(__dirname, 'src/tutorials') } },
  build: { sourcemap: true, outDir: OUT_DIR }
});

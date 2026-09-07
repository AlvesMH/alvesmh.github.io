import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = resolve('.');
const distRoot = join(projectRoot, 'dist');
const serverEntry = join(projectRoot, 'dist-ssr', 'entry-server.js');
const template = readFileSync(join(distRoot, 'index.html'), 'utf8');
const { render } = await import(pathToFileURL(serverEntry).href);

const postSlugs = [
  'the-cost-of-making-an-expert',
  'ai_advantage_services',
  'agentic_ai_blog_post',
  'redesigning-undergraduate-education',
  'transformative-education-ai-future',
  'future_of_work_and_worth',
  'why_genai_literacy_new_entry_level_skill',
  'prompting_science',
  'offloading_to_augmentation',
  'flipped_classroom',
  'beyond-the-syllabus',
  'co-thinking-model',
  'slow-thinking-fast-ai',
  'ai-literacy-guiding-principles'
];

const routes = [
  '/', '/teaching', '/teaching/ai-literacy-ntu', '/work', '/work/ai-in-education', '/work/adaptive-expertise', '/work/human-ai-work', '/ideas',
  '/profile', '/about', '/cv', '/contact', '/tools',
  ...postSlugs.map(slug => `/post/${slug}`)
];

function pagePath(route) {
  return route === '/' ? join(distRoot, 'index.html') : join(distRoot, route.slice(1), 'index.html');
}

for (const route of routes) {
  const rendered = render(route);
  const document = template
    .replace(/<title>[^<]*<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/i, '')
    .replace('</head>', `${rendered.head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`);
  const output = pagePath(route);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, document);
}

rmSync(join(projectRoot, 'dist-ssr'), { recursive: true, force: true });

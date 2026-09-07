import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const routes = [
  '/',
  '/teaching',
  '/teaching/ai-literacy-ntu',
  '/work',
  '/work/adaptive-expertise',
  '/work/human-ai-work',
  '/ideas',
  '/post/the-cost-of-making-an-expert',
  '/about',
  '/profile',
  '/cv',
  '/contact',
  '/tools'
];

const failures = [];

for (const route of routes) {
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html');
  if (!existsSync(file)) {
    failures.push(`${route}: missing prerendered page`);
    continue;
  }

  const html = readFileSync(file, 'utf8');
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) failures.push(`${route}: expected one h1, found ${h1Count}`);
  if (!/<title\b[^>]*>[^<]+<\/title>/i.test(html)) failures.push(`${route}: missing title`);
  if (!/<meta\b[^>]*name="description"[^>]*content="[^"]+"/i.test(html)) failures.push(`${route}: missing meta description`);
  if (!/<link\b[^>]*rel="canonical"[^>]*href="https:\/\/hugomartins\.eu\//i.test(html)) failures.push(`${route}: missing canonical URL`);
  if (!/<main\b[^>]*id="main-content"/i.test(html)) failures.push(`${route}: missing accessible main landmark`);
}

for (const asset of ['og.png', 'profile.json', 'cv.json', 'feed.xml', 'llms.txt', 'robots.txt', 'sitemap.xml']) {
  if (!existsSync(join(dist, asset))) failures.push(`/${asset}: missing public asset`);
}

const home = readFileSync(join(dist, 'index.html'), 'utf8');
for (const phrase of ['AI Literacy for Higher Education', '1,700+', 'Nanyang Technological University']) {
  if (!home.includes(phrase)) failures.push(`/: missing positioning phrase "${phrase}"`);
}

if (failures.length) {
  console.error(`Site check failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site check passed: ${routes.length} prerendered routes and 7 public assets verified.`);

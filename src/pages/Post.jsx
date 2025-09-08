import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Canonical from '../components/Canonical';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { POSTS as RAW_POSTS } from '../data/posts';
import { ensureSlug, slugify, makePostPath } from '../utils/slugify';

// Try common locations so we don't depend on one directory layout
const mdModules = {
  ...import.meta.glob('./posts/*.md',     { query: '?raw', import: 'default' }),
  ...import.meta.glob('../posts/*.md',    { query: '?raw', import: 'default' }),
  ...import.meta.glob('/src/posts/*.md',  { query: '?raw', import: 'default' }),
};

export default function Post() {
  const navigate = useNavigate();
  const { slug: slugParam } = useParams();
  const posts = useMemo(() => RAW_POSTS.map(ensureSlug), []);

  // Build a map: { 'ai-literacy-guiding-principles': () => Promise<string>, ... }
  const mdMap = useMemo(() => {
    const map = {};
    for (const [path, loader] of Object.entries(mdModules)) {
      const file = path.split('/').pop() || '';
      const base = file.replace(/\.md$/i, '').toLowerCase();
      map[base] = loader;
    }
    return map;
  }, []);

  // Legacy numeric ID redirect -> slug
  useEffect(() => {
    if (/^\d+$/.test(slugParam)) {
      const byId = posts.find((p) => String(p.id) === slugParam);
      if (byId) navigate(makePostPath(byId), { replace: true });
    }
  }, [slugParam, posts, navigate]);

  const post = useMemo(() => {
    const low = (slugParam || '').toLowerCase();
    return (
      posts.find((p) => (p.slug || '').toLowerCase() === low) ||
      posts.find((p) => slugify(p.title) === slugParam)
    );
  }, [slugParam, posts]);

  const [body, setBody] = useState('');

  // Load markdown if we have a file for this slug; otherwise fallback to inline content/excerpt
  useEffect(() => {
    let canceled = false;
    setBody('');

    if (post) {
      const loader = mdMap[(post.slug || '').toLowerCase()];
      if (loader) {
        loader().then((raw) => {
          if (!canceled) setBody(raw || '');
        });
      }
    }
    return () => { canceled = true; };
  }, [post, mdMap]);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">404 – Post not found</h1>
        <Link to="/archive" className="text-blue-600 hover:underline">← Back to archive</Link>
      </main>
    );
  }

  const ordered = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const idx = ordered.findIndex((p) => p.slug === post.slug);
  const prev = ordered[idx - 1];
  const next = ordered[idx + 1];

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <Canonical path={`/post/${post.slug}`} />

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <MarkdownRenderer
        source={body || post.content || post.markdown || post.excerpt || ''}
      />

      <nav className="flex justify-between mt-12 pt-8 border-t" aria-label="Post navigation">
        {prev ? <Link to={makePostPath(prev)} className="text-blue-600 hover:underline">← {prev.title}</Link> : <span />}
        {next ? <Link to={makePostPath(next)} className="text-blue-600 hover:underline">{next.title} →</Link> : <span />}
      </nav>
    </main>
  );
}

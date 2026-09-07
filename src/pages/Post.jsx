import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Canonical from '../components/Canonical';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { POSTS as RAW_POSTS } from '../data/posts';
import { ensureSlug, slugify, makePostPath } from '../utils/slugify';

// Eager raw imports make the complete essay available in the initial HTML for readers and crawlers.
const mdModules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });
const markdownBySlug = Object.fromEntries(
  Object.entries(mdModules).map(([path, source]) => [
    (path.split('/').pop() || '').replace(/\.md$/i, '').toLowerCase(),
    source
  ])
);

export default function Post() {
  const navigate = useNavigate();
  const { slug: slugParam } = useParams();
  const posts = useMemo(() => RAW_POSTS.map(ensureSlug), []);

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

  if (!post) {
    return (
      <main id="main-content" className="article-shell">
        <p className="section-kicker">Not found</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-.035em]">This essay is no longer here</h1>
        <Link to="/ideas" className="text-link mt-7 inline-block">← Back to writing</Link>
      </main>
    );
  }

  const ordered = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const idx = ordered.findIndex((p) => p.slug === post.slug);
  const prev = ordered[idx - 1];
  const next = ordered[idx + 1];
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: post.title, description: post.excerpt, datePublished: post.date,
    author: { '@id': 'https://hugomartins.eu/#hugo-martins' },
    mainEntityOfPage: `https://hugomartins.eu/post/${post.slug}`,
    keywords: post.tags
  };

  return (
    <main id="main-content" className="article-shell">
      <Canonical path={`/post/${post.slug}`} />
      <Helmet>
        <title>{post.title} — Hugo Martins</title>
        <meta name="description" content={post.excerpt.replace(/\s+/g, ' ').trim().slice(0, 158)} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>

      <header className="article-header">
        <p className="section-kicker">Writing · {post.category}</p>
        <h1>{post.title.replace(/^“(?=[^”]+$)/, '')}</h1>
        <div className="article-meta">{post.date} · {post.readTime || 'Essay'} · Hugo Martins</div>
      </header>

      <div className="article-body">
        <MarkdownRenderer source={markdownBySlug[(post.slug || '').toLowerCase()] || post.content || post.markdown || post.excerpt || ''} />
      </div>

      <nav className="mt-16 grid gap-6 border-t border-[#c9cdd3] pt-8 sm:grid-cols-2" aria-label="Essay navigation">
        <div>{prev ? <><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#687181]">Newer essay</p><Link to={makePostPath(prev)} className="text-link mt-2 inline-block">← {prev.title.replace(/^“(?=[^”]+$)/, '')}</Link></> : null}</div>
        <div className="sm:text-right">{next ? <><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#687181]">Older essay</p><Link to={makePostPath(next)} className="text-link mt-2 inline-block">{next.title.replace(/^“(?=[^”]+$)/, '')} →</Link></> : null}</div>
      </nav>
    </main>
  );
}

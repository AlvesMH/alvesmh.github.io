import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { POSTS } from '../data/posts';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Canonical from '../components/Canonical'; // 👈 Import it

const markdownModules = import.meta.glob(
  '../posts/*.md',
  { query: '?raw', import: 'default' }
);

export default function PostPage() {
  const { id } = useParams();
  const numericId = Number(id);

  const index = useMemo(
    () => POSTS.findIndex((p) => p.id === numericId),
    [numericId]
  );
  const post = index >= 0 ? POSTS[index] : null;

  const [md, setMd] = useState(null);
  const [loadingMd, setLoadingMd] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [numericId]);

  useEffect(() => {
    setMd(null);
    if (!post?.slug) return;

    const key = `../posts/${post.slug}.md`;
    const loader = markdownModules[key];

    if (!loader) {
      console.warn(`Markdown not found for: ${key}`);
      return;
    }

    let cancelled = false;
    setLoadingMd(true);

    loader()
      .then((raw) => { if (!cancelled) setMd(raw); })
      .catch((err) => console.error('Failed to load markdown:', err))
      .finally(() => { if (!cancelled) setLoadingMd(false); });

    return () => { cancelled = true; };
  }, [post?.slug]);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">404 – Post not found</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      {/* 👇 Canonical based on post slug */}
      <Canonical path={`/post/${post.slug}`} />

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <PostMeta post={post} />

      {loadingMd && !md ? (
        <p className="text-gray-500">Loading…</p>
      ) : md ? (
        <MarkdownRenderer source={md} />
      ) : (
        <p className="text-gray-700">
          {post.excerpt || 'Content coming soon…'}
        </p>
      )}

      <PostNav prev={POSTS[index - 1]} next={POSTS[index + 1]} />
    </main>
  );
}

/* ---------- helpers ---------- */

const PostMeta = ({ post }) => (
  <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
    <time>{new Date(post.date).toLocaleDateString()}</time>·{post.readTime}
  </div>
);

const PostNav = ({ prev, next }) => (
  <nav className="flex justify-between mt-12 pt-8 border-t" aria-label="Post navigation">
    {prev ? (
      <Link to={`/post/${prev.id}`} className="text-blue-600 hover:underline">
        ← {prev.title}
      </Link>
    ) : <span />}

    {next ? (
      <Link to={`/post/${next.id}`} className="text-blue-600 hover:underline">
        {next.title} →
      </Link>
    ) : <span />}
  </nav>
);

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { POSTS } from '../data/posts';
import MarkdownRenderer from '../components/MarkdownRenderer';

/**
 * Vite ≥ 5: use `query: '?raw', import: 'default'`
 * instead of the deprecated  { as: 'raw' }  flag.
 */
const markdownModules = import.meta.glob(
  '../posts/*.md',
  { query: '?raw', import: 'default' }
);

export default function PostPage() {
  const { id } = useParams();
  const index = POSTS.findIndex(p => p.id === Number(id));
  const post  = POSTS[index];
  const [md, setMd] = useState(null);

  /* Fetch Markdown whenever the slug changes */
  useEffect(() => {
    const key = `../posts/${post?.slug}.md`;
    if (post?.slug && markdownModules[key]) {
      markdownModules[key]().then(setMd);
    }
  }, [post]);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">404 – Post not found</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <PostMeta post={post} />

      {md ? (
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
  <nav className="flex justify-between mt-12 pt-8 border-t">
    {prev ? (
      <Link to={`/post/${prev.id}`} className="text-blue-600 hover:underline">
        ← {prev.title}
      </Link>
    ) : <span />}

    {next ? (
      <Link to={`/post/${next.id}`} className="text-blue-600 hover:underline">
        {next.title} →
      </Link>
    ) : <span />}
  </nav>
);

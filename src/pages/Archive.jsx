import React, { useMemo } from 'react';
import Canonical from '../components/Canonical';
import { Link } from 'react-router-dom';
import { POSTS as RAW_POSTS } from '../data/posts';
import { ensureSlug, makePostPath } from '../utils/slugify';

export default function Archive() {
  const posts = useMemo(() => RAW_POSTS.map(ensureSlug), []);
  const sorted = useMemo(() => [...posts].sort((a,b) => new Date(b.date) - new Date(a.date)), [posts]);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Canonical path="/archive" />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Archive</h1>
      <ul className="divide-y divide-gray-300">
        {sorted.map((p) => (
          <li key={p.slug} className="py-4 flex items-center justify-between">
            <Link to={makePostPath(p)} className="text-blue-600 hover:text-blue-800 hover:underline">
              {p.title}
            </Link>
            <span className="text-sm text-gray-600">
              {p.date ? new Date(p.date).toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' }) : ''}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}



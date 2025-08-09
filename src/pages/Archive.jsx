import React from 'react';
import Canonical from '../components/Canonical';
import { Link } from 'react-router-dom';
import { POSTS } from '../data/posts';

const ArchivePage = () => {
  // Sort posts by date (newest first)
  const sortedPosts = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Canonical path="/archive" />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Archive</h1>
      <ul className="divide-y divide-gray-300">
        {sortedPosts.map((post) => (
          <li key={post.id} className="py-4 flex items-center justify-between">
            <Link to={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
              {post.title}
            </Link>
            <span className="text-sm text-gray-600">
              {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ArchivePage;

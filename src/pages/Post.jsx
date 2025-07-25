import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { POSTS } from '../data/posts';

const PostPage = () => {
  const { id } = useParams();
  const postId = Number(id);
  const post = POSTS.find((p) => p.id === postId);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600">Sorry, the post you're looking for doesn't exist.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>
      {/* If the post has a lazily-loaded component (e.g., Markdown content), render it */}
      {post.component ? (
        <Suspense fallback={<p className="text-gray-500">Loading content...</p>}>
          <post.component />
        </Suspense>
      ) : (
        // Otherwise, display a placeholder or excerpt
        <p className="text-gray-700">{post.excerpt || 'Content coming soon...'}</p>
      )}
    </main>
  );
};

export default PostPage;

import { useMemo } from 'react';
import { POSTS } from '../data/posts';

export const usePosts = ({
  searchTerm,
  selectedCategory,
  currentPage,
  postsPerPage
}) => {
  const filtered = useMemo(() => {
    const term = (searchTerm || '').toLowerCase();
    const selected = (selectedCategory || 'all').toLowerCase();

    return POSTS.filter((post) => {
      const postCategory = (post.category || '').toLowerCase();

      const matchesCategory =
        selected === 'all' || postCategory === selected;

      const matchesSearch =
        (post.title || '').toLowerCase().includes(term) ||
        (post.excerpt || '').toLowerCase().includes(term) ||
        (Array.isArray(post.tags) ? post.tags : []).some((t) =>
          (t || '').toLowerCase().includes(term)
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / postsPerPage));

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filtered.slice(start, start + postsPerPage);
  }, [filtered, currentPage, postsPerPage]);

  return { paginatedPosts, totalPages };
};


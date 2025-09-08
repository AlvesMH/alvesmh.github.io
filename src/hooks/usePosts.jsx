import { useMemo } from 'react';
import { POSTS as RAW_POSTS } from '../data/posts';
import { ensureSlug } from '../utils/slugify';

export function usePosts({
  searchTerm = '',
  selectedCategory = 'all',
  currentPage = 1,
  postsPerPage = 6,
}) {
  // Normalize posts to always include a `slug`
  const posts = useMemo(() => RAW_POSTS.map(ensureSlug), []);

  // Filter + sort
  const filtered = useMemo(() => {
    const q = (searchTerm || '').trim().toLowerCase();
    const cat = (selectedCategory || 'all').toLowerCase();

    return posts
      .filter((p) => {
        // Category
        if (cat !== 'all' && (p.category || '').toLowerCase() !== cat) return false;

        // Search (title, excerpt, tags)
        if (!q) return true;
        const inTitle = (p.title || '').toLowerCase().includes(q);
        const inExcerpt = (p.excerpt || '').toLowerCase().includes(q);
        const inTags = (p.tags || []).some((t) => (t || '').toLowerCase().includes(q));
        return inTitle || inExcerpt || inTags;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [posts, searchTerm, selectedCategory]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / postsPerPage));
  const pageIndex = Math.min(Math.max(1, currentPage), totalPages) - 1;
  const start = pageIndex * postsPerPage;
  const paginatedPosts = filtered.slice(start, start + postsPerPage);

  return { paginatedPosts, totalPages, total: filtered.length };
}


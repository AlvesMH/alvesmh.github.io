import React, { useState, useMemo, useEffect } from 'react';
import Canonical from '../components/Canonical'
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import PostsGrid from '../components/PostsGrid';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import { usePosts } from '../hooks/usePosts';
import { POSTS, CATEGORIES as BASE_CATEGORIES } from '../data/posts';

const POSTS_PER_PAGE = 6;

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset paging when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const { paginatedPosts, totalPages } = usePosts({
    searchTerm,
    selectedCategory,
    currentPage,
    postsPerPage: POSTS_PER_PAGE
  });

  // Case-insensitive category counts
  const categories = useMemo(
    () =>
      BASE_CATEGORIES.map((cat) => {
        const id = (cat.id || '').toLowerCase();
        const count =
          id === 'all'
            ? POSTS.length
            : POSTS.filter((p) => (p.category || '').toLowerCase() === id).length;
        return { ...cat, count };
      }),
    []
  );

  // Popular tags (Top 8) computed from posts
  const popularTags = useMemo(() => {
    const map = new Map();
    for (const p of POSTS) {
      for (const tag of p.tags || []) {
        map.set(tag, (map.get(tag) || 0) + 1);
      }
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, []);

  return (
    <>
      <Canonical path="/" />
      
      <Hero />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex flex-col lg:flex-row gap-8">
        <section id="latest" className="lg:w-2/3">
          <div className="mb-8 space-y-6">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <PostsGrid posts={paginatedPosts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>

        {/* Sidebar: pass popular tags and a click handler that sets the search term */}
        <Sidebar
          popularTags={popularTags}
          onTagClick={(tag) => setSearchTerm(tag)}
        />
      </main>
    </>
  );
};

export default HomePage;


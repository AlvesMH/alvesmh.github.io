import React, { useState, useMemo, useEffect } from 'react';
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
  // State for search and category filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever search term or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Get filtered and paginated posts using the custom hook
  const { paginatedPosts, totalPages } = usePosts({
    searchTerm,
    selectedCategory,
    currentPage,
    postsPerPage: POSTS_PER_PAGE
  });

  // Compute category counts (for display in the filter buttons)
  const categories = useMemo(() => 
    BASE_CATEGORIES.map(cat => ({
      ...cat,
      count: cat.id === 'all'
        ? POSTS.length
        : POSTS.filter(p => p.category === cat.id).length
    })),
    []
  );

  return (
    <>
      {/* Hero section at top of homepage */}
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
        <Sidebar />
      </main>
    </>
  );
};

export default HomePage;

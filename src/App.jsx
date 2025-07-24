// src/App.jsx
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import PostsGrid from './components/PostsGrid';
import Pagination from './components/Pagination';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { usePosts } from './hooks/usePosts';
import { POSTS, CATEGORIES as BASE_CATEGORIES } from './data/posts';

const POSTS_PER_PAGE = 6;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => setCurrentPage(1), [searchTerm, selectedCategory]);

  const { paginatedPosts, totalPages } = usePosts({
    searchTerm,
    selectedCategory,
    currentPage,
    postsPerPage: POSTS_PER_PAGE
  });

  const categories = useMemo(
    () =>
      BASE_CATEGORIES.map((cat) => ({
        ...cat,
        count:
          cat.id === 'all'
            ? POSTS.length
            : POSTS.filter((p) => p.category === cat.id).length
      })),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Hero />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex flex-col lg:flex-row gap-8">
        <section className="lg:w-2/3">
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
      <Footer />
    </div>
  );
};

export default App;

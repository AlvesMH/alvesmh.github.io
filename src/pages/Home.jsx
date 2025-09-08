import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Canonical from '../components/Canonical';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import PostsGrid from '../components/PostsGrid';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import { usePosts } from '../hooks/usePosts';
import { POSTS, CATEGORIES as BASE_CATEGORIES } from '../data/posts';
import { ensureSlug } from '../utils/slugify'; // <- ensure every post has a slug

const POSTS_PER_PAGE = 6;

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Optional: make on-site search sharable & compatible with SearchAction
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q && !searchTerm) setSearchTerm(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (searchTerm) url.searchParams.set('q', searchTerm);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
  }, [searchTerm]);

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

  // Ensure slug-only routing: normalize posts to include a slug
  const postsForGrid = useMemo(
    () => (paginatedPosts || []).map(ensureSlug),
    [paginatedPosts]
  );

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
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, []);

  // --- Structured Data (WebSite) ---
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Augmented Minds",
    "alternateName": "Augmented Minds Blog",
    "url": "https://hugomartins.eu/",
    "inLanguage": "en",
    "sameAs": [
      "https://github.com/alvesmh",
      "https://www.linkedin.com/in/hugoalvesmartins/"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hugomartins.eu/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Canonical path="/" />

      <Helmet>
        <title>Augmented Minds — AI, Economy & Work</title>
        <meta
          name="description"
          content="Augmented Minds Blog explores how AI is reshaping the economy, work and education—covering productivity, policy, HR, taxation, and ethics—with clear, research-driven essays."
        />
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </script>
      </Helmet>

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
          {/* Pass slug-normalized posts to the grid so links use /post/:slug */}
          <PostsGrid posts={postsForGrid} />
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

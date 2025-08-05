import React from 'react';
import AboutCard from './AboutCard';
import PopularTags from './PopularTags';
import NewsletterCard from './NewsletterCard';

/**
 * Sidebar now accepts:
 * - popularTags: string[]  (pre-computed list of tags)
 * - onTagClick: (tag: string) => void
 */
const Sidebar = ({ popularTags = [], onTagClick }) => (
  <aside className="lg:w-1/3 space-y-8">
    <AboutCard />
    <PopularTags tags={popularTags} onClick={onTagClick} />
    <NewsletterCard />
  </aside>
);

export default Sidebar;

import React from 'react';
import AboutCard from './AboutCard';
import PopularTags from './PopularTags';
import NewsletterCard from './NewsletterCard';

const Sidebar = () => (
  <aside className="lg:w-1/3 space-y-8">
    <AboutCard />
    <PopularTags
      tags={[
        'React',
        'JavaScript',
        'CSS',
        'Machine Learning',
        'Web Dev',
        'Academia',
        'Career',
        'Productivity'
      ]}
    />
    <NewsletterCard />
  </aside>
);

export default Sidebar;

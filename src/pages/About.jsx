import React from 'react';
import AboutCard from '../components/Sidebar/AboutCard';

const AboutPage = () => {
  return (
    <main className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Me</h1>
      {/* Reuse the AboutCard component for bio and social links */}
      <AboutCard />
    </main>
  );
};

export default AboutPage;

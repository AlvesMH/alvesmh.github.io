import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Clickable header + blurb linking to About */}
      <Link
        to="/about"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="block text-center mb-6 hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
        aria-label="Open About page"
        title="Open About page"
      >
        {/* Profile Image */}
        <div className="text-center mb-6">
          <img
            src="/profile.jpg"
            alt="Hugo Martins"
            loading="lazy"
            decoding="async"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
          />
          <h3 className="text-xl font-bold text-gray-900">Hugo Martins, PhD.</h3>
          <p className="text-gray-600">
            <strong><em>AI should amplify human potential—not replace it</em></strong>
          </p>
        </div>

        {/* About Text */}
        <p className="text-gray-700 leading-relaxed text-center">
          Tools, frameworks, and reflections at intersection of technology, human behaviour and education.
        </p>
      </Link>

      {/* Socials */}
      <div className="mt-6 flex justify-center gap-4 text-gray-600">
        <a href="https://github.com/alvesmh" aria-label="GitHub" className="hover:text-gray-900"><Github /></a>
        <a href="https://www.linkedin.com/in/hugo-alves-martins" aria-label="LinkedIn" className="hover:text-gray-900"><Linkedin /></a>
        <Link
          to="/contact"
          aria-label="Contact form"
          title="Open contact form"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
        >
          <Mail />
        </Link>
      </div>
    </div>
  );
};

export default AboutCard;


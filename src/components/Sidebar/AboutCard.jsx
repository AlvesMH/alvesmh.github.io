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
        className="block text-center mb-6 hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
        aria-label="Open About page"
        title="Open About page"
      >
        {/* Profile Image */}
        <div className="text-center mb-6">
          <img
            src="/profile.jpg"
            alt="Hugo Martins"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
          />
          <h3 className="text-xl font-bold text-gray-900">Hugo Martins, PhD.</h3>
          <p className="text-gray-600">
            <strong><em>AI should amplify human potential—not replace it</em></strong>
          </p>
        </div>

        {/* About Text */}
        <p className="text-gray-700 leading-relaxed text-center">
          Tools, frameworks, and reflections at the intersection of technology, psychology,
          social behaviour, and education.
        </p>
      </Link>

      {/* Social / Contact Links */}
      <div className="flex justify-center gap-4">
        {/* GitHub */}
        <a
          href="https://github.com/alvesmh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/hugoalvesmartins/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>

        {/* Contact Page (instead of mailto) */}
        <Link
          to="/contact"
          aria-label="Contact"
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
        >
          <Mail className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default AboutCard;

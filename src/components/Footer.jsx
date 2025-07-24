import React from 'react';
import { BookOpen } from 'lucide-react';

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 py-12">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">DevBlog</span>
        </div>
        <p className="text-gray-600 mb-6">
          Sharing knowledge, one post at a time.
        </p>
        <div className="flex justify-center space-x-6 mb-6">
          {['Home', 'About', 'Archive', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} DevBlog. Built with React and hosted on GitHub Pages.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
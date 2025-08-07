import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 py-12">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Augmented Minds</span>
        </div>
        <p className="text-gray-600 mb-6">
          Sharing ideas, one post at a time.
        </p>
        {/* Footer navigation links using React Router */}
        <div className="flex justify-center space-x-6 mb-6">
          {['Home', 'About', 'Archive', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Augmented Minds Blog. Built with React.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

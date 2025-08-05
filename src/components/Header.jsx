import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-white shadow-sm border-b border-slate-200">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-6">
        {/* Logo and title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Augmented Minds</h1>
            <p className="text-sm text-gray-600">Personal & Academic Insights</p>
          </div>
        </div>
        {/* Navigation links using React Router */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'About', 'Archive', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </header>
);

export default Header;

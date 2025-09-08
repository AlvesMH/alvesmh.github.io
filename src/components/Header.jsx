import React, { useState } from 'react';
import { BookOpen, Menu } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const navLinks = ['Home', 'Tutorials', 'About', 'Archive', 'Contact'];
const toPath = (item) => (item === 'Home' ? '/' : `/${item.toLowerCase()}`);
const prefetchTutorials = () => import('../tutorials');

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-blue-600 transition-colors';

  const clearSearchOnHome = (item) => {
    if (item !== 'Home') return;
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    window.history.replaceState({}, '', url.pathname);
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Augmented Minds</h1>
              <p className="text-sm text-gray-600">Personal & Academic Insights</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8" aria-label="Primary">
            {navLinks.map((item) => (
              <NavLink
                key={item}
                to={toPath(item)}
                className={linkClass}
                onMouseEnter={item === 'Tutorials' ? prefetchTutorials : undefined}
                onClick={() => clearSearchOnHome(item)}
              >
                {item}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden flex flex-col space-y-4 pb-4" aria-label="Mobile">
            {navLinks.map((item) => (
              <NavLink
                key={item}
                to={toPath(item)}
                className={linkClass}
                onMouseEnter={item === 'Tutorials' ? prefetchTutorials : undefined}
                onClick={() => { clearSearchOnHome(item); setMenuOpen(false); }}
              >
                {item}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

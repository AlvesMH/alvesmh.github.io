import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';

const nav = [
  ['Teaching', '/teaching'],
  ['Work', '/work'],
  ['Writing', '/ideas'],
  ['About', '/about'],
  ['CV', '/cv'],
  ['Contact', '/contact']
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  const linkClass = ({ isActive }) => `legacy-nav-link ${isActive ? 'is-active' : ''}`;

  return (
    <header className="legacy-header">
      <div className="site-shell legacy-header-inner">
        <Link to="/" className="legacy-brand" aria-label="Hugo Martins — home">
          <span className="legacy-brand-mark" aria-hidden="true"><BookOpen /></span>
          <span>
            <strong>Hugo Martins</strong>
            <small>AI Literacy · Higher Education</small>
          </span>
        </Link>

        <nav className="legacy-desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, to]) => <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>)}
        </nav>

        <button
          type="button"
          className="legacy-menu-button"
          onClick={() => setOpen(value => !value)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="site-shell legacy-mobile-nav" aria-label="Mobile navigation">
          {nav.map(([label, to]) => <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>)}
        </nav>
      )}
    </header>
  );
}

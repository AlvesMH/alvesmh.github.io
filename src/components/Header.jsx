import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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

  const linkClass = ({ isActive }) => [
    'relative py-2 text-[14px] font-medium tracking-[-.005em] transition-colors',
    isActive
      ? 'text-[#153e75] after:absolute after:inset-x-0 after:-bottom-[17px] after:h-[2px] after:bg-[#1d4f91]'
      : 'text-[#4b5360] hover:text-[#111318]'
  ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-[#c9cdd3]/70 bg-[#f7f7f5]/95 backdrop-blur-[14px]">
      <div className="site-shell flex h-[78px] items-center justify-between">
        <Link to="/" className="group leading-none" aria-label="Hugo Martins — home">
          <span className="block text-[17px] font-bold tracking-[-0.02em] text-[#111318] group-hover:text-[#153e75]">Hugo Martins</span>
          <span className="mt-[7px] block text-[12px] font-medium tracking-[0.005em] text-[#687181]">AI Literacy · Higher Education</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {nav.map(([label, to]) => (
            <NavLink key={to} to={to} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[7px] border border-transparent text-[#4b5360] hover:border-[#c9cdd3] hover:text-[#111318] md:hidden"
          onClick={() => setOpen(value => !value)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-[#e1e4e8] bg-[#f7f7f5] md:hidden" aria-label="Mobile navigation">
          <div className="site-shell flex flex-col py-4">
            {nav.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `border-b border-[#e1e4e8] py-3 text-sm font-medium last:border-0 ${isActive ? 'text-[#153e75]' : 'text-[#4b5360]'}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

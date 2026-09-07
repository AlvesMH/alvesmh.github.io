import React from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-[#c9cdd3] bg-[#f2f2ef]">
      <div className="site-shell pb-9 pt-14">
        <div className="grid gap-10 md:grid-cols-[3fr_2fr] md:items-start">
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.015em] text-[#111318]">Hugo Martins, PhD</p>
            <p className="mt-3 max-w-[560px] text-[14px] leading-6 text-[#4b5360]">
              AI literacy, curriculum and assessment for higher education. Based in Singapore; open to selected academic and learning-innovation opportunities internationally.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-medium text-[#4b5360] md:justify-end" aria-label="Footer navigation">
            <Link to="/teaching" className="hover:text-[#153e75]">Teaching</Link>
            <Link to="/cv" className="hover:text-[#153e75]">CV</Link>
            <a href={SITE.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#153e75]">LinkedIn</a>
            <a href={SITE.links.github} target="_blank" rel="noreferrer" className="hover:text-[#153e75]">GitHub</a>
            <Link to="/contact" className="hover:text-[#153e75]">Contact</Link>
          </nav>
        </div>
        <div className="mt-11 border-t border-[#d7d9d5] pt-6 text-[11px] tracking-[0.02em] text-[#687181]">
          © 2026 Hugo Martins · <strong className="font-medium">Augmented Minds</strong> is the writing and applied-work imprint of this site.
        </div>
      </div>
    </footer>
  );
}

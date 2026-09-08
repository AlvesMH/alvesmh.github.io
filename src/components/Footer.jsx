import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="legacy-footer">
      <div className="site-shell legacy-footer-inner">
        <Link to="/" className="legacy-footer-brand">
          <span className="legacy-brand-mark" aria-hidden="true"><BookOpen /></span>
          <strong>Hugo Martins, PhD</strong>
        </Link>
        <p>AI literacy, curriculum and assessment for higher education. Based in Singapore.</p>
        <nav aria-label="Footer navigation">
          <Link to="/teaching">Teaching</Link>
          <Link to="/work">Work</Link>
          <Link to="/ideas">Writing</Link>
          <Link to="/cv">CV</Link>
          <a href={SITE.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={SITE.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <Link to="/contact">Contact</Link>
        </nav>
        <small>© 2026 Hugo Martins · Augmented Minds is the writing and applied-work imprint of this site.</small>
      </div>
    </footer>
  );
}

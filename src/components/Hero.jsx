import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

export default function Hero() {
  return (
    <section className="legacy-hero">
      <div className="legacy-hero-glow" aria-hidden="true" />
      <div className="site-shell legacy-hero-grid">
        <div className="legacy-hero-copy">
          <p className="section-kicker">Hugo Martins, PhD · AI literacy educator</p>
          <h1 className="hero-title">
            <span>AI Literacy</span>
            <strong>for Higher Education</strong>
          </h1>
          <p className="legacy-hero-lede">Applied and interdisciplinary AI-literacy curriculum, assessment and Project-Based Learning (PBL) for an AI-enabled world.</p>
          <p className="legacy-hero-support">My work connects <strong>Project-Based Learning (PBL), interdisciplinary adaptive expertise and responsible human–AI work</strong>.</p>
          <p className="legacy-hero-meta">Nanyang Technological University · CC0007 Science &amp; Technology for Humanity · Singapore</p>
          <div className="legacy-hero-actions">
            <Link to="/teaching" className="button-primary">Explore teaching and curriculum <ArrowRight aria-hidden="true" /></Link>
            <Link to="/cv" className="button-secondary"><FileText aria-hidden="true" /> View CV</Link>
          </div>
        </div>

        <aside className="legacy-profile-card" aria-label="Profile summary">
          <img src="/profile.jpg" alt="Portrait of Hugo Martins" width="180" height="180" loading="eager" decoding="async" />
          <h2>Hugo Martins, PhD</h2>
          <p className="legacy-profile-role">AI literacy educator</p>
          <p>Higher-education curriculum, assessment and responsible human–AI learning.</p>
          <Link to="/about" className="text-link">About my work →</Link>
        </aside>
      </div>
    </section>
  );
}

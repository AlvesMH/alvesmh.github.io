import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';

const capabilities = [
  ['Problem framing', 'Define what matters before optimising a response.'],
  ['Evidence judgement', 'Distinguish plausible output from warranted conclusions.'],
  ['Exception handling', 'Recognise when the model, process or rule no longer fits the situation.'],
  ['Perspective integration', 'Work across disciplines, stakeholders and competing definitions of value.'],
  ['Responsible direction', 'Allocate work across people and AI while retaining oversight and accountability.']
];

export default function AdaptiveExpertise() {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: 'Rethinking Job Readiness: Designing Adaptive Expertise for Human–AI Work',
    author: { '@id': 'https://hugomartins.eu/#hugo-martins' },
    about: ['Adaptive expertise', 'AI literacy', 'Human-AI collaboration', 'Higher education'],
    dateCreated: '2026',
    url: 'https://hugomartins.eu/work/adaptive-expertise'
  };

  return (
    <main id="main-content" className="page-shell framework-page">
      <Canonical path="/work/adaptive-expertise" />
      <Helmet>
        <title>Adaptive Expertise for Human–AI Work — Hugo Martins</title>
        <meta name="description" content="A higher-education framework for problem framing, evidence judgement, exception handling and responsible human–AI work." />
        <script type="application/ld+json">{JSON.stringify(article)}</script>
      </Helmet>

      <header className="page-intro">
        <p className="section-kicker">Framework · NTU Annual Learning and Teaching Conference 2026</p>
        <h1>Rethinking job readiness for human–AI work</h1>
        <p>What does job readiness require when work is increasingly distributed across people, AI agents and tools?</p>
      </header>

      <section className="statement-panel mt-16" aria-labelledby="shift-heading">
        <div>
          <p className="section-kicker">The central shift</p>
          <h2 id="shift-heading">Human contribution moves upward</h2>
        </div>
        <div className="statement-copy">
          <p>As AI moves from answering to acting, routine production becomes less diagnostic of readiness. The more consequential capabilities are deciding what problem to address, what evidence to trust, where exceptions matter and how responsibility should be allocated.</p>
          <blockquote>Readiness is not the ability to produce a plausible answer. It is the ability to direct and defend context-sensitive work.</blockquote>
        </div>
      </section>

      <section className="content-section" aria-labelledby="observation-heading">
        <div className="content-section-heading">
          <p className="section-kicker">Teaching observation</p>
          <h2 id="observation-heading">The difficult work begins before the solution</h2>
        </div>
        <div className="content-section-copy">
          <p>In an interdisciplinary undergraduate assessment, student teams design and present an AI-enabled response to a real societal problem. The recurring weaknesses are rarely a lack of fluent output. They are shallow problem framing, weak evaluation of evidence, limited integration across perspectives and insufficient attention to trade-offs, verification and implementation context.</p>
          <p>These are not merely student shortcomings. They reveal a broader curricular misalignment: many programmes still prepare learners to solve well-structured problems even as professional value shifts toward navigating situations in which the problem, evidence and criteria for success remain contested.</p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="adaptive-capabilities-heading">
        <div className="content-section-heading">
          <p className="section-kicker">Capability framework</p>
          <h2 id="adaptive-capabilities-heading">Five dimensions of adaptive expertise</h2>
        </div>
        <div className="content-section-copy">
          <div className="framework-stack">
            {capabilities.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="curriculum-response-heading">
        <div className="content-section-heading">
          <p className="section-kicker">Curriculum response</p>
          <h2 id="curriculum-response-heading">Design for context-sensitive performance</h2>
        </div>
        <div className="content-section-copy">
          <ul className="professional-list">
            <li><strong>Use ill-structured problems.</strong> Let students determine what the problem is before evaluating their answer.</li>
            <li><strong>Require evidence trails.</strong> Make source selection, uncertainty and verification part of the assessed work.</li>
            <li><strong>Observe reasoning.</strong> Use dialogue, defence, live problem solving and reflection alongside produced artifacts.</li>
            <li><strong>Distribute responsibility explicitly.</strong> Ask what AI should do, what the human must continue to do and how the system should shape that relationship.</li>
            <li><strong>Increase agency gradually.</strong> Move from structured practice to open-ended, authentic performance with feedback at each stage.</li>
          </ul>
        </div>
      </section>

      <section className="framework-conclusion">
        <p className="section-kicker">Implication</p>
        <h2>Universities should prepare students not only to use AI, but to exercise judgement within AI-enabled systems.</h2>
        <div className="mt-8 flex flex-wrap gap-5">
          <Link to="/teaching" className="button-primary">Explore the teaching portfolio</Link>
          <Link to="/post/the-cost-of-making-an-expert" className="button-secondary">Read the expertise essay</Link>
        </div>
        <p className="last-reviewed">Last reviewed September 2026.</p>
      </section>
    </main>
  );
}

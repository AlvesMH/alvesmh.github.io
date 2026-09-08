import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';
import { personJsonLd } from '../data/site';

export default function About() {
  const profile = { '@context': 'https://schema.org', '@type': 'ProfilePage', url: 'https://hugomartins.eu/about', mainEntity: personJsonLd };

  return (
    <main id="main-content" className="page-shell">
      <Canonical path="/about" />
      <Helmet>
        <title>About Hugo Martins — AI Literacy Educator</title>
        <meta name="description" content="About Hugo Martins, PhD: AI literacy educator and Lecturer at NTU specialising in higher-education curriculum, assessment and responsible human–AI work." />
        <script type="application/ld+json">{JSON.stringify(profile)}</script>
      </Helmet>

      <header className="page-intro max-w-[820px]">
        <p className="section-kicker">About</p>
        <h1>An educator’s route into AI literacy</h1>
        <p className="!text-[21px] !leading-[1.55]">I work on a practical question: how should higher education develop knowledge and judgement when AI can search, generate, recommend and increasingly act?</p>
        <p className="mt-5 max-w-[760px] text-[16px] leading-[1.72] text-[#687181]">My answer connects curriculum and assessment design with organisational behaviour, adaptive expertise and hands-on experimentation with AI-supported systems.</p>
      </header>

      <section className="profile-proof-grid" aria-label="Professional profile at a glance">
        <article>
          <p>Higher education</p>
          <h2>Teaching AI literacy at scale</h2>
          <span>Curriculum, assessment and facilitation across a diverse undergraduate population.</span>
        </article>
        <article>
          <p>Research foundation</p>
          <h2>Organisational behaviour</h2>
          <span>A PhD-level lens on judgement, adaptation, incentives and human–AI work.</span>
        </article>
        <article>
          <p>Applied practice</p>
          <h2>Working systems, not abstractions</h2>
          <span>Prototypes that make assumptions about evidence, agency and accountability inspectable.</span>
        </article>
      </section>

      <div className="editorial-sections">
        <section className="editorial-section">
          <h2>Current work</h2>
          <div className="editorial-copy">
            <p>I am an <strong>AI literacy educator and Lecturer at Nanyang Technological University in Singapore</strong>.</p>
            <p>Across 36 CC0007 tutorial classes, I have taught approximately 1,700+ undergraduates. My teaching focuses on <strong>grounded inquiry, problem framing, evidence evaluation, assessment and responsible human–AI collaboration</strong>.</p>
            <p>I am particularly interested in how universities can prepare students to use generative and agentic AI without weakening the deep knowledge, productive practice and accountability through which expertise develops.</p>
            <p>I also build small AI systems because working prototypes make theoretical assumptions concrete. They force a practical question:</p>
            <p className="border-l-2 border-[#1d4f91] pl-5 font-medium text-[#272b33]">What should the AI do, what should the human continue to do, and how should the system shape that relationship?</p>
          </div>
        </section>

        <section className="editorial-section">
          <h2>Intellectual agenda</h2>
          <div className="editorial-copy">
            <p>I think about AI through a simple lens:</p>
            <div className="formula" aria-label="Human capability multiplied by AI capability multiplied by system design">
              <span>Human capability</span><span className="times" aria-hidden="true">×</span><span>AI capability</span><span className="times" aria-hidden="true">×</span><span>system design</span>
            </div>
            <p>The practical effect of AI depends not only on what a model can do. It also depends on how learning and work are structured around it:</p>
            <ul>
              <li>what people delegate;</li>
              <li>what they continue to practise themselves;</li>
              <li>what they verify;</li>
              <li>where judgement remains essential;</li>
              <li>how responsibility is allocated; and</li>
              <li>which capabilities are strengthened or allowed to atrophy.</li>
            </ul>
            <p>That is why I am less interested in AI adoption as an end in itself than in <strong>the design of effective human–AI systems</strong>.</p>
          </div>
        </section>

        <section className="editorial-section">
          <h2>Background</h2>
          <div className="editorial-copy">
            <p>I hold a <strong>PhD in Management (Organisational Behaviour)</strong> from Nanyang Technological University, an <strong>MSc in Leadership and Strategy through the Sloan Fellowship</strong> at London Business School, and a <strong>BSc in Economics</strong> from the University of Porto.</p>
            <p>Before academia, I spent roughly fifteen years in financial markets and later worked on international business and advisory projects.</p>
            <p>That background continues to shape how I think about AI: through <strong>uncertainty, incentives, adaptation, evidence quality, risk and decision-making under pressure</strong> — not through technology in isolation.</p>
            <p>The movement into AI and higher education is therefore less of a break than it might initially appear. Across markets, organisations and learning environments, the underlying problem is similar: people must make good decisions when information is abundant, incomplete, rapidly changing and increasingly mediated by technology.</p>
          </div>
        </section>

        <section className="editorial-section">
          <h2>From possibility to prototype</h2>
          <div className="editorial-copy">
            <p>I treat imagination as an operation on existing reality rather than creation from nothing. New systems begin by recombining available materials, knowledge, constraints and technical capabilities into a possibility that does not yet have a working form.</p>
            <p>That is why prototyping matters to my work. An idea can be intellectually coherent and still fail when it meets evidence, users or institutional constraints. A prototype turns an imagined arrangement into something that can be inspected, tested and revised.</p>
            <p>In both teaching and system design, the movement is the same: <strong>frame a possibility, ground it in what is known, make it concrete, and learn from the encounter with reality.</strong></p>
          </div>
        </section>

        <section className="editorial-section">
          <h2>Augmented Minds</h2>
          <div className="editorial-copy">
            <p><strong>Augmented Minds</strong> is the writing and applied-work imprint of this site.</p>
            <p>It brings together essays, prototypes and teaching experiments around one proposition:</p>
            <blockquote className="border-l-2 border-[#1d4f91] pl-6 font-serif text-[22px] leading-[1.55] text-[#272b33]">Intelligent systems are most valuable when they expand human capability and responsibility rather than simply remove humans from the loop.</blockquote>
            <p>The emphasis is therefore on augmentation rather than automation for its own sake — and on designing environments in which people can think, learn and decide better with AI.</p>
          </div>
        </section>

        <section className="editorial-section">
          <h2>Continue</h2>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <Link className="text-link" to="/teaching">Teaching portfolio →</Link>
            <Link className="text-link" to="/work">Selected work →</Link>
            <Link className="text-link" to="/cv">Full CV →</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

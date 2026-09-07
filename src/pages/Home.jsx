import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';
import Hero from '../components/Hero';
import { POSTS } from '../data/posts';
import { personJsonLd } from '../data/site';
import { ensureSlug, makePostPath } from '../utils/slugify';

const principles = [
  ['Deep knowledge', 'Students need enough substantive understanding to recognise when a confident answer is wrong.'],
  ['Productive friction', 'Attempts, feedback, revision and reflection remain essential even when AI can produce an answer faster.'],
  ['Problem framing', 'When solutions are abundant, defining the right problem and its stakeholders becomes more valuable.'],
  ['Observed performance', 'Dialogue, defence and visible reasoning reveal capability more credibly than unverified artifacts alone.'],
  ['Deliberate apprenticeship', 'Universities must create authentic practice when entry-level work no longer develops expertise automatically.']
];

const selectedWork = [
  {
    eyebrow: 'Teaching case · NTU',
    title: 'AI Literacy in the Core Curriculum',
    text: 'A three-tier learning architecture that moves students from foundational readiness to facilitated inquiry and applied mastery.',
    to: '/teaching/ai-literacy-ntu'
  },
  {
    eyebrow: 'Framework · 2026',
    title: 'Adaptive Expertise for Human–AI Work',
    text: 'A framework for problem framing, evidence judgement, exception handling and responsible direction of human–AI work.',
    to: '/work/adaptive-expertise'
  },
  {
    eyebrow: 'Applied practice',
    title: 'Educational AI Systems',
    text: 'Evidence-grounded and structured-reasoning prototypes that make pedagogical assumptions inspectable.',
    to: '/tools'
  }
];

export default function Home() {
  const writing = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3).map(ensureSlug);
  const profilePage = { '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: { '@id': personJsonLd['@id'] }, url: 'https://hugomartins.eu/' };

  return (
    <>
      <Canonical path="/" />
      <Helmet>
        <title>Hugo Martins, PhD | AI Literacy in Higher Education</title>
        <meta name="description" content="Hugo Martins, PhD is an AI literacy educator and Lecturer at NTU specialising in higher-education curriculum, assessment and responsible human–AI work." />
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(profilePage)}</script>
      </Helmet>

      <Hero />


        <section className="bg-white py-24 md:py-[112px]" aria-labelledby="literacy-thesis-title">
          <div className="site-shell statement-panel">
            <div>
              <p className="section-kicker">A more demanding definition</p>
              <h2 id="literacy-thesis-title">AI literacy is more than tool fluency</h2>
            </div>
            <div className="statement-copy">
              <p>It is the ability to build knowledge, frame consequential problems, evaluate evidence, supervise AI-supported work and remain accountable for the result.</p>
              <p>That is the capability universities must develop when AI can generate plausible answers and participate in increasingly complex workflows.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d9dde1] bg-[#f1f2f0] py-24 md:py-[112px]" aria-labelledby="case-title">
          <div className="site-shell featured-case">
            <div>
              <p className="section-kicker">Featured teaching case</p>
              <h2 id="case-title">AI Literacy in the NTU Core Curriculum</h2>
              <p className="featured-case-lede">Teaching responsible use of generative and agentic AI within CC0007 Science and Technology for Humanity.</p>
            </div>
            <div className="featured-case-copy">
              <p>Students move from curated preparation to facilitated inquiry and applied project work. The design makes source provenance, problem framing, critique and human intervention visible rather than treating the final output as sufficient evidence of learning.</p>
              <dl className="case-facts">
                <div><dt>Context</dt><dd>NTU Interdisciplinary Collaborative Core</dd></div>
                <div><dt>My role</dt><dd>Tutorial design, facilitation, feedback and assessment practice</dd></div>
                <div><dt>Focus</dt><dd>Grounded inquiry, judgement and accountable human–AI collaboration</dd></div>
              </dl>
              <Link to="/teaching/ai-literacy-ntu" className="button-primary mt-8">View the complete case study</Link>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f5] py-24 md:py-[112px]" aria-labelledby="expertise-title">
          <div className="site-shell">
            <p className="section-kicker">Teaching philosophy</p>
            <div className="grid gap-8 md:grid-cols-[7fr_5fr] md:items-end">
              <h2 id="expertise-title" className="section-title max-w-[760px]">How do we make experts when AI removes the first rung?</h2>
              <p className="section-lede !mt-0 md:pb-1">Education must preserve the practice through which knowledge becomes judgement.</p>
            </div>
            <div className="principle-list mt-12">
              {principles.map(([title, text], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <Link to="/post/the-cost-of-making-an-expert" className="text-link mt-8 inline-block">Read the teaching philosophy essay →</Link>
          </div>
        </section>

        <section className="border-y border-[#d9dde1] bg-white py-24 md:py-[112px]" aria-labelledby="work-title">
          <div className="site-shell">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">Selected work</p>
                <h2 id="work-title" className="section-title">Practice, frameworks and applied systems</h2>
              </div>
              <Link to="/work" className="text-link">All work →</Link>
            </div>
            <div className="work-cards mt-12">
              {selectedWork.map(item => (
                <article key={item.title}>
                  <p className="meta">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link to={item.to} className="text-link">Explore →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f5] py-24 md:py-[112px]" aria-labelledby="writing-title">
          <div className="site-shell">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">Selected writing</p>
                <h2 id="writing-title" className="section-title">AI literacy, expertise and human capability</h2>
              </div>
              <Link to="/ideas" className="text-link">All writing →</Link>
            </div>
            <div className="writing-list mt-12">
              {writing.map(post => (
                <article key={post.slug}>
                  <p className="meta">{post.category} · {post.date} · {post.readTime}</p>
                  <h3><Link to={makePostPath(post)}>{post.title.replace(/^“(?=[^”]+$)/, '')}</Link></h3>
                  <p>{post.excerpt.replace(/\s+/g, ' ').trim()}</p>
                  <Link to={makePostPath(post)} className="text-link">Read essay →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="professional-band" aria-labelledby="profile-band-title">
          <div className="site-shell professional-band-grid">
            <div>
              <p className="section-kicker !text-[#9db8dc]">Academic-practitioner profile</p>
              <h2 id="profile-band-title">Higher education, organisational behaviour and applied AI</h2>
            </div>
            <div>
              <p>My work is grounded in a PhD in Organisational Behaviour, higher-education and adult-learning qualifications, and practical experience designing AI-enabled learning at scale.</p>
              <p>I am based in Singapore and open to selected academic and learning-innovation opportunities in Singapore, Saudi Arabia, the UAE and Europe.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/about" className="button-light">About my background</Link>
                <Link to="/contact" className="button-dark-outline">Contact</Link>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}

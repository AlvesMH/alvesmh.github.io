import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';
import { POSTS } from '../data/posts';
import { ensureSlug, makePostPath } from '../utils/slugify';

const themes = {
  all: 'All writing',
  learning: 'AI & Learning',
  work: 'AI & Work',
  foundations: 'Foundations'
};

const refinedExcerpts = {
  'the-cost-of-making-an-expert': 'If AI removes the routine work through which novices once developed judgement, universities must deliberately rebuild the practice, feedback and accountable performance that make expertise possible.',
  ai_advantage_services: 'As access to increasingly capable AI becomes widespread, sustainable advantage depends less on owning better models and more on how organisations redesign work around them.',
  agentic_ai_blog_post: 'Agentic AI moves the challenge beyond prompting. People increasingly need to know what to delegate, how to supervise execution, when to intervene and how to remain accountable.',
  'redesigning-undergraduate-education': 'Higher education must prepare students not simply to use AI, but to perform the forms of cognitive work that become more valuable when routine production can be delegated.',
  'transformative-education-ai-future': 'Knowing how to operate AI is not the same as being prepared to work intelligently with it. Judgement, reasoning and responsibility are becoming the more important educational problem.',
  future_of_work_and_worth: "AI may dramatically expand productive capacity, but its social value will depend on whether education, organisations and policy evolve beyond assumptions built around yesterday's jobs and tasks.",
  why_genai_literacy_new_entry_level_skill: 'AI compresses the value of routine competence while increasing the leverage available to people with specialised knowledge, judgement and adaptive expertise.',
  prompting_science: 'Prompting becomes educationally meaningful when it helps students formulate problems, expose assumptions and iteratively improve reasoning — not merely obtain better outputs.',
  offloading_to_augmentation: 'The important question is not whether AI performs cognitive work for us, but which forms of offloading weaken capability and which forms create genuine cognitive augmentation.',
  flipped_classroom: 'Generative AI can make active learning more responsive through Socratic dialogue, rapid feedback and personalised exploration — if classroom design keeps students cognitively engaged.',
  'beyond-the-syllabus': 'When content production becomes abundant, education must shift from reproducing information toward interpretation, synthesis, judgement and the intelligent application of knowledge.',
  'co-thinking-model': 'The most valuable AI systems may not be those that simply complete tasks, but those that help people examine problems, generate alternatives and think more effectively.',
  'slow-thinking-fast-ai': 'Fluent AI makes rapid answers easier. Education therefore has an even stronger reason to cultivate deliberate analysis, scepticism, evidence evaluation and reflection.',
  'ai-literacy-guiding-principles': 'AI literacy should be built around responsible use, critical evaluation and structured thinking rather than reduced to technical familiarity with current tools.'
};

function themeOf(post) {
  const text = `${post.title} ${(post.tags || []).join(' ')} ${post.category}`.toLowerCase();
  if (/work|management|service|agent|job|organisation|organization|wealth/.test(text)) return 'work';
  if (/education|learning|curriculum|teaching|literacy|classroom|assessment/.test(text)) return 'learning';
  return 'foundations';
}

function displayDate(value) {
  return new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(`${value}T00:00:00`));
}

export default function Ideas() {
  const [theme, setTheme] = useState('all');
  const posts = useMemo(
    () => [...POSTS].map(ensureSlug).sort((a, b) => new Date(b.date) - new Date(a.date)).filter(post => theme === 'all' || themeOf(post) === theme),
    [theme]
  );

  return (
    <main id="main-content" className="page-shell">
      <Canonical path="/ideas" />
      <Helmet>
        <title>Writing on AI Literacy and Higher Education — Hugo Martins</title>
        <meta name="description" content="Essays by Hugo Martins on human-centred AI, AI literacy, higher education, judgement, adaptive expertise, human–AI work and organisational adaptation." />
      </Helmet>

      <header className="page-intro max-w-[760px]">
        <p className="section-kicker">Augmented Minds</p>
        <h1>Writing</h1>
        <p>Essays on <strong className="font-semibold text-[#272b33]">AI literacy, higher education, adaptive expertise and human–AI work</strong>.</p>
        <p className="mt-7 border-l-2 border-[#1d4f91] pl-6 font-serif text-[21px] leading-[1.55] text-[#272b33]">AI makes capable output abundant. The educational question is how people develop the knowledge and judgement to direct it well.</p>
      </header>

      <div className="ideas-filters mt-11" role="group" aria-label="Filter writing by theme">
        {Object.entries(themes).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            aria-pressed={theme === id}
            className="ideas-filter"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10 border-y border-[#c9cdd3]" aria-live="polite">
        {posts.map((post, index) => (
          <article key={post.slug} className="ideas-entry group">
            <div className="text-[11px] font-semibold uppercase leading-6 tracking-[.12em] text-[#687181]">
              <span className="ideas-entry-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <p>{displayDate(post.date)}</p>
              <p className="text-[#1d4f91]">{themes[themeOf(post)]}</p>
              {post.readTime && <p className="normal-case tracking-normal text-[#8b929e]">{post.readTime}</p>}
            </div>
            <div className="max-w-[790px]">
              <h2 className="text-[21px] font-semibold leading-[1.27] tracking-[-.025em] text-[#111318] transition-colors group-hover:text-[#153e75] sm:text-[22px]">
                <Link to={makePostPath(post)}>{post.title.replace(/^“(?=[^”]+$)/, '')}</Link>
              </h2>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-[#4b5360]">{refinedExcerpts[post.slug] || post.excerpt}</p>
              <Link to={makePostPath(post)} className="text-link mt-4 inline-block">Read essay →</Link>
            </div>
            <span className="ideas-entry-arrow" aria-hidden="true">→</span>
          </article>
        ))}
      </div>
    </main>
  );
}

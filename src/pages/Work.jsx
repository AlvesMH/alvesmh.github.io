import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';

const engagements = [
  {
    context: 'NTU Annual Learning and Teaching Conference · 2026',
    title: 'Adaptive Expertise for Human–AI Work',
    description: 'A framework for rethinking job readiness when increasingly capable AI systems can perform routine cognitive work. It places greater emphasis on problem framing, evidence evaluation, exception handling, interdisciplinary judgement and effective human–AI working arrangements.',
    link: 'Explore the framework',
    to: '/work/adaptive-expertise'
  },
  {
    context: 'EHL × NTUitive × SGInnovate · 2026',
    title: 'AI Adoption vs AI Advantage',
    description: 'A human-centred perspective on organisational AI adoption. As advanced AI becomes widely accessible, the harder problem is redesigning work, building complementary human capability and deciding where automation, augmentation and human judgement each create the most value.',
    link: 'Read the perspective',
    to: '/work/human-ai-work'
  }
];

const systems = [
  {
    title: 'Ask-Julia',
    subtitle: 'Evidence-grounded conversational knowledge exploration',
    description: 'A conversational interface designed around retrieval-grounded answers, accessible evidence and structured follow-up.',
    to: '/tools#ask-julia'
  },
  {
    title: 'Critical Thinker',
    subtitle: 'Structured multi-perspective argument analysis',
    description: 'A reasoning environment that makes critique more inspectable and reduces premature acceptance of fluent conclusions.',
    to: '/tools#critical-thinker'
  },
  {
    title: 'Six Thinking Hats',
    subtitle: 'AI-supported parallel thinking for groups',
    description: 'A collaborative workflow separating facts, emotions, risks, benefits, alternatives and process control.',
    to: '/tools#six-thinking-hats'
  },
  {
    title: 'Generative Lesson Planner',
    subtitle: 'AI-supported instructional design',
    description: 'A workflow for creating lesson structures and activities while keeping outcomes, context and educator judgement in control.',
    to: '/tools#lesson-planner'
  }
];

export default function Work() {
  return (
    <main id="main-content" className="page-shell">
      <Canonical path="/work" />
      <Helmet>
        <title>Selected Work in AI Literacy and Higher Education — Hugo Martins</title>
        <meta name="description" content="Teaching cases, frameworks and applied systems by Hugo Martins across AI literacy, higher-education curriculum, assessment and human–AI work." />
      </Helmet>

      <header className="page-intro">
        <p className="section-kicker">Selected work</p>
        <h1>Evidence from teaching and applied practice</h1>
        <p>Selected work across <strong className="font-semibold text-[#272b33]">AI-literacy curriculum, assessment, adaptive expertise and educational AI systems</strong>.</p>
      </header>

      <nav className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-y border-[#c9cdd3] py-4 text-[13px] font-semibold text-[#4b5360]" aria-label="Work sections">
        <a href="#curriculum" className="hover:text-[#153e75]">Curriculum &amp; Teaching</a>
        <a href="#engagement" className="hover:text-[#153e75]">Research &amp; Public Engagement</a>
        <a href="#systems" className="hover:text-[#153e75]">Applied AI Systems</a>
      </nav>

      <section id="curriculum" className="scroll-mt-28 pt-24" aria-labelledby="curriculum-heading">
        <p className="section-kicker">Curriculum &amp; teaching</p>
        <div className="mt-7 grid gap-8 rounded-[10px] border border-[#e1e4e8] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,.03),0_8px_28px_rgba(15,23,42,.035)] sm:p-10 md:grid-cols-[5fr_7fr] md:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.13em] text-[#687181]">Nanyang Technological University</p>
            <h2 id="curriculum-heading" className="mt-4 text-[clamp(1.7rem,3vw,2.25rem)] font-semibold leading-[1.12] tracking-[-.03em] text-[#111318]">AI Literacy in the NTU Core Curriculum</h2>
            <p className="mt-5 text-[13px] text-[#687181]">2024–Present</p>
            <dl className="work-proof" aria-label="Selected case evidence">
              <div><dt>Scale</dt><dd>1,700+ students</dd></div>
              <div><dt>Delivery</dt><dd>36 CC0007 tutorial classes</dd></div>
              <div><dt>Focus</dt><dd>Judgement with AI</dd></div>
            </dl>
          </div>
          <div className="text-[16px] leading-[1.75] text-[#4b5360]">
            <p>A case study in integrating grounded research and agentic AI into interdisciplinary undergraduate learning.</p>
            <p className="mt-4">The design moves students from foundational readiness to facilitated inquiry and applied mastery. Source libraries, agent-building workflows and human-intervention records make evidence, reasoning and responsibility visible throughout the learning process.</p>
            <Link to="/teaching/ai-literacy-ntu" className="text-link mt-7 inline-block">View case study →</Link>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#e1e4e8] pt-5 text-[12px] font-medium text-[#687181]">
              <span>AI literacy</span><span>Inquiry-led learning</span><span>Human judgement</span>
            </div>
          </div>
        </div>
      </section>

      <section id="engagement" className="scroll-mt-28 pt-24" aria-labelledby="engagement-heading">
        <p className="section-kicker">Research &amp; public engagement</p>
        <h2 id="engagement-heading" className="section-title">Ideas tested in public</h2>
        <div className="editorial-rows mt-10">
          {engagements.map(item => (
            <Link key={item.title} to={item.to} className="editorial-row">
              <div>
                <p className="meta">{item.context}</p>
                <h3>{item.title}</h3>
                <span className="text-link mt-4 inline-block">{item.link} →</span>
              </div>
              <p>{item.description}</p>
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="systems" className="scroll-mt-28 pt-24" aria-labelledby="systems-heading">
        <p className="section-kicker">Applied educational AI</p>
        <h2 id="systems-heading" className="section-title">Tools as inspectable teaching practice</h2>
        <p className="section-lede">Each prototype asks a practical question: what should AI do, what should the human continue to do, and how should the interface shape that division of cognitive work?</p>
        <div className="mt-11 grid gap-x-12 md:grid-cols-2">
          {systems.map(system => (
            <article key={system.title} className="border-t border-[#c9cdd3] py-7">
              <p className="text-[11px] font-semibold uppercase tracking-[.13em] text-[#687181]">{system.subtitle}</p>
              <h3 className="mt-3 text-[21px] font-semibold tracking-[-.025em] text-[#111318]">{system.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.67] text-[#4b5360]">{system.description}</p>
              <Link to={system.to} className="text-link mt-5 inline-block">Explore system →</Link>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-[800px] border-l-2 border-[#1d4f91] pl-6 text-[17px] leading-[1.7] text-[#4b5360]">These systems are prototypes rather than validated products. Their purpose is to make assumptions about evidence, reasoning and human responsibility concrete enough to inspect and improve.</p>
      </section>
    </main>
  );
}

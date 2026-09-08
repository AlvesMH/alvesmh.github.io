import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';
import { personJsonLd, SITE } from '../data/site';

const focusAreas = [
  'AI literacy', 'Higher education', 'Curriculum design', 'Assessment design',
  'Adaptive expertise', 'Human–AI collaboration', 'Learning innovation',
  'Responsible AI', 'Applied educational AI'
];

const impact = [
  ['36', 'CC0007 tutorial classes'],
  ['1,700+', 'undergraduates reached'],
  ['3 stages', 'scaffolded learning architecture'],
  ['3 phases', 'assessment pathway'],
  ['2026', 'NTU conference presenter'],
  ['2026', 'invited industry-academic panelist']
];

export default function Profile() {
  const profileJsonLd = { '@context': 'https://schema.org', '@type': 'ProfilePage', url: 'https://hugomartins.eu/profile', mainEntity: personJsonLd };

  return (
    <main id="main-content" className="page-shell">
      <Canonical path="/profile" />
      <Helmet>
        <title>Hugo Martins, PhD — Professional Profile</title>
        <meta name="description" content="Professional profile of Hugo Martins, AI literacy educator and Lecturer at NTU specialising in higher-education curriculum, assessment and human–AI work." />
        <script type="application/ld+json">{JSON.stringify(profileJsonLd)}</script>
      </Helmet>

      <header className="grid gap-12 border-b border-[#c9cdd3] pb-16 md:grid-cols-[8fr_4fr] md:items-end">
        <div>
          <p className="section-kicker">Professional profile</p>
          <h1 className="mt-3 text-[clamp(2.5rem,4vw,3.65rem)] font-semibold leading-[1.04] tracking-[-.038em] text-[#111318]">Hugo Martins, PhD</h1>
          <p className="mt-5 text-[21px] leading-[1.5] text-[#272b33]">AI Literacy · Higher Education Curriculum &amp; Assessment</p>
          <p className="mt-3 text-[14px] text-[#687181]">Lecturer, Nanyang Technological University · Singapore</p>
        </div>
        <div className="relative w-[210px] justify-self-start md:w-[240px] md:justify-self-end">
          <div aria-hidden="true" className="absolute -bottom-3 -left-3 h-full w-full rounded-[14px] border border-[#d9dde1] bg-[#eceeeb]" />
          <img src="/profile.jpg" alt="Portrait of Hugo Martins" width="240" height="275" className="relative h-[265px] w-full rounded-[14px] object-cover object-top" />
        </div>
      </header>

      <section className="grid gap-12 border-b border-[#c9cdd3] py-16 md:grid-cols-[8fr_4fr]" aria-labelledby="overview-heading">
        <div className="max-w-[740px]">
          <p className="section-kicker">Overview</p>
          <h2 id="overview-heading" className="section-title">AI literacy educator and academic-practitioner</h2>
          <div className="mt-7 space-y-5 text-[16px] leading-[1.76] text-[#4b5360]">
            <p>Hugo Martins is an AI literacy educator and Lecturer at <strong className="font-semibold text-[#272b33]">Nanyang Technological University (NTU), Singapore</strong>.</p>
            <p>He designs and teaches curriculum, assessment and hands-on learning that prepares university students to use generative and agentic AI with knowledge, judgement and accountability.</p>
            <p>His work combines higher-education practice with organisational-behaviour research, adaptive expertise and small applied AI systems that make pedagogical assumptions inspectable.</p>
          </div>
        </div>
        <aside className="border-t border-[#c9cdd3] pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0" aria-labelledby="focus-heading">
          <h2 id="focus-heading" className="text-[12px] font-bold uppercase tracking-[.14em] text-[#111318]">Areas of focus</h2>
          <ul className="mt-5 space-y-2 text-[13px] leading-6 text-[#4b5360]">
            {focusAreas.map(area => <li key={area}>{area}</li>)}
          </ul>
          <div className="mt-8 border-t border-[#e1e4e8] pt-5 text-[13px]">
            <Link to="/cv" className="text-link block">Full CV →</Link>
            <a href={SITE.links.linkedin} target="_blank" rel="noreferrer" className="text-link mt-3 block">LinkedIn →</a>
            <a href={SITE.links.github} target="_blank" rel="noreferrer" className="text-link mt-3 block">GitHub →</a>
            <Link to="/contact" className="text-link mt-3 block">Contact →</Link>
          </div>
        </aside>
      </section>

      <section className="py-20" aria-labelledby="impact-heading">
        <p className="section-kicker">Selected impact</p>
        <h2 id="impact-heading" className="section-title">Evidence from implementation</h2>
        <div className="evidence-line mt-10 border-y border-[#c9cdd3] py-6">
          {impact.map(([number, label], index) => (
            <span key={`${number}-${label}`}><strong>{number}</strong> {label}</span>
          ))}
        </div>
      </section>

      <div className="editorial-sections !mt-0">
        <section className="editorial-section">
          <h2>Current academic work</h2>
          <div className="editorial-copy">
            <p>At NTU, Hugo teaches <strong>CC0007 Science &amp; Technology for Humanity</strong>, part of the university's interdisciplinary Core Curriculum.</p>
            <p>His teaching translates inquiry-driven and project-based pedagogy into a three-stage progression: foundational readiness, facilitated application and applied mastery. Students build grounded source libraries, use agentic tools to explore complex questions and document where human judgement redirects or constrains AI.</p>
            <p>Assessment moves from collaborative problem framing and evidence-building, to a stakeholder-focused solution pitch, to individual synthesis and reflection. This makes the quality of the inquiry—not only the fluency of the final output—part of what students must demonstrate.</p>
            <p>He also teaches at the <strong>National Institute of Education</strong>, where his work includes Human Resource Management in Sport and applied organisational behaviour.</p>
          </div>
        </section>
        <section className="editorial-section">
          <h2>Teaching design</h2>
          <div className="editorial-copy">
            <p>Four principles organise Hugo's approach to AI-enabled learning:</p>
            <ul>
              <li><strong>Frame before solving:</strong> students define the problem and its stakeholders before asking AI to propose answers.</li>
              <li><strong>Ground before generating:</strong> source provenance and evidence quality are designed into the workflow.</li>
              <li><strong>Scaffold toward agency:</strong> structured preparation develops into open-ended, project-based inquiry.</li>
              <li><strong>Make judgement visible:</strong> students explain where they verified, challenged or overrode an AI-supported process.</li>
            </ul>
          </div>
        </section>
        <section className="editorial-section">
          <h2>Selected public engagement</h2>
          <div className="editorial-copy">
            <div>
              <h3 className="font-semibold text-[#111318]">Rethinking Job Readiness: Designing Adaptive Expertise for Human–AI Work</h3>
              <p className="mt-2 text-[13px] text-[#687181]">Competitive roundtable presentation · NTU Annual Learning and Teaching Conference 2026</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#111318]">AI Adoption vs AI Advantage in Service Operations</h3>
              <p className="mt-2 text-[13px] text-[#687181]">Invited panelist · EHL × NTUitive × SGInnovate · 2026</p>
            </div>
          </div>
        </section>
        <section className="editorial-section">
          <h2>Professional background</h2>
          <div className="editorial-copy">
            <p>Before academia, Hugo worked in financial markets and business advisory. Fifteen years in trading and subsequent international consulting sharpened a continuing interest in judgement under uncertainty, evidence quality, adaptation and decision-making in complex systems.</p>
          </div>
        </section>
        <section className="editorial-section">
          <h2>Short biography</h2>
          <div className="editorial-copy">
            <p>Hugo Martins, PhD, is an AI literacy educator and Lecturer at Nanyang Technological University in Singapore. He specialises in higher-education curriculum, assessment and responsible human–AI work, combining teaching at scale with organisational-behaviour research and applied educational AI.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

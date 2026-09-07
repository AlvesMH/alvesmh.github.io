import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';
import { SITE } from '../data/site';

const sections = [
  ['profile', 'Professional Profile'], ['impact', 'Impact'], ['appointments', 'Academic Appointments'],
  ['innovation', 'Teaching Innovation'], ['engagement', 'Engagement'], ['education', 'Education'],
  ['training', 'Training'], ['research', 'Research'], ['industry', 'Industry'],
  ['applied-ai', 'Applied AI'], ['languages', 'Languages']
];

function Block({ id, title, children }) {
  return <section id={id} className="cv-block"><h2>{title}</h2>{children}</section>;
}

export default function CV() {
  return (
    <main id="main-content" className="page-shell cv-page">
      <Canonical path="/cv" />
      <Helmet>
        <title>CV — Hugo Martins, PhD</title>
        <meta name="description" content="Curriculum Vitae of Hugo Martins, PhD: AI literacy, higher-education curriculum and assessment, learning innovation and responsible human–AI work." />
      </Helmet>

      <header className="border-b border-[#c9cdd3] pb-11">
        <p className="section-kicker">Curriculum Vitae</p>
        <h1 className="mt-3 text-[clamp(2.65rem,4.5vw,4.05rem)] font-semibold leading-[1.02] tracking-[-.04em] text-[#111318]">Hugo Martins, PhD</h1>
        <p className="mt-4 text-[20px] leading-[1.5] text-[#272b33]">AI Literacy · Higher Education Curriculum &amp; Assessment</p>
        <p className="mt-3 text-[14px] text-[#687181]">Lecturer, Nanyang Technological University · Singapore</p>
        <div className="no-print mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[13px]">
          <a className="text-link" href={SITE.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="text-link" href={SITE.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <Link className="text-link" to="/contact">Contact →</Link>
          <button type="button" className="text-link" onClick={() => window.print()}>Print / save PDF</button>
        </div>
      </header>

      <section className="cv-summary no-print" aria-label="CV highlights">
        <div><span>Primary expertise</span><strong>AI literacy curriculum and assessment</strong></div>
        <div><span>Teaching evidence</span><strong>1,700+ undergraduates across 42 tutorials</strong></div>
        <div><span>Professional lens</span><strong>Organisational behaviour and human–AI work</strong></div>
      </section>

      <div className="cv-layout">
        <aside className="cv-rail no-print" aria-label="CV sections">
          <p>Navigate CV</p>
          <nav>{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        </aside>

        <div>
          <Block id="profile" title="Professional profile">
            <p>AI literacy educator and Lecturer at Nanyang Technological University specialising in higher-education curriculum, assessment and responsible human–AI work. I teach CC0007 Science &amp; Technology for Humanity and contribute to AI-enabled learning within the Core Curriculum. My work combines teaching at scale with organisational-behaviour research and applied AI, helping students build knowledge, frame problems, evaluate evidence, supervise AI-supported work and remain accountable for decisions.</p>
          </Block>

          <Block id="impact" title="Selected impact">
            <div className="cv-impact-grid">
              <div><strong>42</strong><span>CC0007 tutorial classes across four consecutive semesters</span></div>
              <div><strong>1,700+</strong><span>unique undergraduate students reached</span></div>
              <div><strong>≈4.3/5</strong><span>average Student Feedback on Teaching across CC0007 classes</span></div>
              <div><strong>Weekly</strong><span>AI-enabled learning using Gemini, NotebookLM and agent-building approaches</span></div>
            </div>
            <ul>
              <li>Competitive presenter at the NTU Annual Learning and Teaching Conference 2026.</li>
              <li>Invited EHL × NTUitive × SGInnovate industry-academic panelist, 2026.</li>
            </ul>
          </Block>

          <Block id="appointments" title="Academic appointments and teaching impact">
            <h3>Nanyang Technological University — Lecturer, Interdisciplinary Core Curriculum · 2024–Present</h3>
            <p><strong>CC0007 Science &amp; Technology for Humanity</strong></p>
            <ul>
              <li>Led 42 tutorial classes across four consecutive semesters, reaching approximately 1,700+ unique undergraduate students.</li>
              <li>Co-created and delivered AI-literacy curriculum with generative AI and agentic tools embedded into weekly learning activities.</li>
              <li>Structured learning across foundational readiness, facilitated application and project-based mastery, moving students from guided tool use toward active auditing and agentic inquiry.</li>
              <li>Designed and facilitated work involving problem decomposition, information search, evidence review and synthesis, stakeholder analysis, persona-agent construction, simple agent development, and evaluation of AI-supported solutions.</li>
              <li>Integrated curated source libraries, citation-backed synthesis and human-intervention documentation to make data provenance, verification and student judgement visible.</li>
              <li>Supported a three-phase assessment path spanning collaborative research and problem framing, an interdisciplinary solution pitch, and individual synthesis and reflection.</li>
              <li>Designed learning around critical judgement, evidence verification, perspective-taking, responsible delegation and preservation of human agency.</li>
              <li>Student Feedback on Teaching averaged approximately 4.3/5, with recurring strengths around feedback, approachability, participation and analytical thinking.</li>
            </ul>
            <p><strong>CC0002 Navigating the Digital World</strong></p>
            <ul>
              <li>Led 6 tutorial classes reaching approximately 240 undergraduate students.</li>
              <li>Facilitated interdisciplinary digital-literacy teaching, collaborative learning and project feedback.</li>
            </ul>
            <h3>National Institute of Education, NTU — Lecturer / Part-Time Lecturer · 2023–Present</h3>
            <ul>
              <li>Taught Human Resource Management in Sport across five cohorts, reaching approximately 80 students.</li>
              <li>Designed case studies, role plays, assessments and rubrics around recruitment, development, performance, rewards, volunteers and organisational behaviour.</li>
              <li>Detailed NIE teaching evaluation: overall 4.7/5, including 4.8/5 for knowledge.</li>
            </ul>
          </Block>

          <Block id="innovation" title="Teaching innovation and human-centred AI">
            <p>My pedagogical approach treats AI literacy as more than tool proficiency. The objective is to help learners work productively and critically with AI while retaining responsibility for judgement and decisions.</p>
            <ul>
              <li>AI as cognitive augmentation rather than substitution for reasoning.</li>
              <li>Problem framing before solution generation.</li>
              <li>Inquiry-driven, project-based learning that progresses from structured guidance to open-ended application.</li>
              <li>Source provenance and grounded synthesis before fluent generation.</li>
              <li>Evaluation of AI outputs for evidence quality, assumptions, feasibility and limitations.</li>
              <li>Explicit documentation of human intervention, verification and accountability.</li>
              <li>Structured human–AI collaboration in team-based work.</li>
              <li>Ethical, responsible and context-sensitive use of AI.</li>
            </ul>
          </Block>

          <Block id="engagement" title="Selected engagement">
            <h3>NTU Annual Learning and Teaching Conference 2026 — Competitive Roundtable Presenter</h3>
            <p><strong>Rethinking Job Readiness: Designing Adaptive Expertise for Human–AI Work</strong> — examined how education should evolve when work is distributed across humans, agents and digital tools.</p>
            <h3>EHL × NTUitive × SGInnovate — Invited Panelist, 2026</h3>
            <p><strong>AI Adoption vs AI Advantage in Service Operations</strong> — human-centred AI, work redesign, organisational capability and responsible adoption in service systems.</p>
          </Block>

          <Block id="education" title="Education">
            <h3>PhD in Management — Organisational Behaviour</h3><p>Nanyang Business School, Nanyang Technological University</p>
            <h3>MSc in Leadership and Strategy — Sloan Fellowship</h3><p>London Business School</p>
            <h3>BSc in Economics</h3><p>University of Porto</p>
          </Block>

          <Block id="training" title="Professional training">
            <ul>
              <li>Advanced Professional Certificate in Data Science and Artificial Intelligence — NTU PACE · 2025–Present</li>
              <li>Graduate Certificate in Teaching and Learning in Higher Education — NIE · 2024–Present</li>
              <li>Advanced Certificate in Learning for Performance (ACLP 2.0) — Institute for Adult Learning · 2024</li>
              <li>Professional Certificate in Applied Artificial Intelligence — Republic Polytechnic / AI Singapore / Microsoft · 2020</li>
            </ul>
          </Block>

          <Block id="research" title="Research expertise and methods">
            <p><strong>Areas:</strong> human-centred AI; human–AI collaboration; AI literacy; adaptive expertise; organisational behaviour; team performance; decision-making; organisational adaptation; work redesign; responsible AI adoption.</p>
            <p><strong>Methods:</strong> research design; data discovery and integration; statistical modelling; structural equation modelling; social network analysis; mediation; psychological measurement; experience sampling; longitudinal and hierarchical modelling; random-effects ordered probit; graph-theoretic analysis.</p>
            <p><strong>Software:</strong> Python, R, SPSS, SQL.</p>
          </Block>

          <Block id="industry" title="Industry experience">
            <h3>Business Management Consultant · 2017–2023</h3>
            <ul>
              <li>Strategic advisory on internationalisation, market entry, stakeholder engagement and multi-partner execution.</li>
              <li>Projects spanning emerging technologies, digital business models, organisational adaptation, sport, entertainment and service innovation.</li>
            </ul>
            <h3>Trader — Banco Invest S.A., Portugal · 2000–2014</h3>
            <ul>
              <li>Managed equity and derivatives positions, translating macroeconomic, news and market-structure signals into trade construction, sizing and risk controls.</li>
              <li>Developed extensive practical experience in evidence assessment, risk management and rapid judgement under uncertainty.</li>
            </ul>
          </Block>

          <Block id="applied-ai" title="Selected applied AI work">
            <ul>
              <li><strong>Ask-Julia</strong> — evidence-grounded conversational avatar for knowledge exploration.</li>
              <li><strong>Critical Thinker</strong> — structured multi-perspective argument analysis.</li>
              <li><strong>Six Thinking Hats</strong> — AI-supported group reasoning workflow.</li>
              <li><strong>Generative Lesson Planner</strong> — AI-supported instructional-design workflow.</li>
            </ul>
          </Block>

          <Block id="languages" title="Languages"><p>Portuguese — Native · English — Fluent · Spanish — Fluent</p></Block>
        </div>
      </div>
    </main>
  );
}

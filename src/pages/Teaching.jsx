import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';
import { personJsonLd } from '../data/site';

const capabilities = [
  ['01', 'Build knowledge', 'Develop disciplinary understanding and source-grounded knowledge before asking AI to extend it.'],
  ['02', 'Frame problems', 'Define meaningful questions, stakeholders, system boundaries and what a plausible answer may omit.'],
  ['03', 'Evaluate evidence', 'Trace provenance, test credibility, identify contradictions and reason under uncertainty.'],
  ['04', 'Work with AI', 'Delegate deliberately, design prompts and agents, and supervise multi-step work rather than accept output passively.'],
  ['05', 'Exercise judgement', 'Weigh trade-offs, ethics, feasibility and context when several defensible responses remain possible.'],
  ['06', 'Remain accountable', 'Document intervention, defend decisions and retain responsibility for conclusions and consequences.']
];

const architecture = [
  {
    number: '01',
    label: 'Foundational readiness',
    title: 'Knowledge before delegation',
    text: 'Curated pre-learning establishes baseline concepts, tool fluency and the limits of generative systems. Students learn what they need to know before they can evaluate what AI produces.'
  },
  {
    number: '02',
    label: 'Facilitated application',
    title: 'Practice with visible reasoning',
    text: 'In-class inquiry, cases and critique make prompting, source selection, verification and human intervention discussable. Feedback focuses on the quality of the reasoning process.'
  },
  {
    number: '03',
    label: 'Applied mastery',
    title: 'Judgement in authentic work',
    text: 'Project work asks students to address ill-structured societal problems, integrate perspectives and defend an AI-enabled response in terms of evidence, ethics, feasibility and likely impact.'
  }
];

const credentials = [
  'PhD in Management (Organisational Behaviour) — Nanyang Technological University',
  'Certificate in Teaching and Learning in Higher Education — National Institute of Education',
  'Advanced Certificate in Learning and Performance — Institute for Adult Learning Singapore',
  'Advanced Certificate in Data Science and Artificial Intelligence — NTU PACE',
  'Professional Certificate in Applied Artificial Intelligence — Republic Polytechnic / AI Singapore / Microsoft'
];

const practiceAreas = [
  {
    number: '01',
    title: 'Curriculum architecture',
    text: 'Align AI literacy with programme outcomes, disciplinary knowledge and a deliberate progression from guided use to independent judgement.'
  },
  {
    number: '02',
    title: 'Assessment redesign',
    text: 'Assess the quality of inquiry, evidence choices, human intervention and defence—not only the polish of an AI-assisted output.'
  },
  {
    number: '03',
    title: 'Learning innovation',
    text: 'Turn emerging tools into teachable workflows with clear roles for the learner, the educator and the AI system.'
  }
];

export default function Teaching() {
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CC0007 Science and Technology for Humanity — AI literacy teaching portfolio',
    description: 'A public account of Hugo Martins’s teaching practice in AI literacy, inquiry, assessment and responsible human–AI work within NTU’s interdisciplinary Core Curriculum.',
    provider: { '@type': 'CollegeOrUniversity', name: 'Nanyang Technological University', url: 'https://www.ntu.edu.sg/' },
    instructor: { '@id': personJsonLd['@id'] },
    url: 'https://hugomartins.eu/teaching/ai-literacy-ntu'
  };

  return (
    <main id="main-content" className="page-shell teaching-portfolio">
      <Canonical path="/teaching" />
      <Helmet>
        <title>Teaching AI Literacy in Higher Education — Hugo Martins</title>
        <meta name="description" content="AI literacy teaching portfolio of Hugo Martins, Lecturer at NTU: curriculum, assessment, adaptive expertise and responsible human–AI work." />
        <script type="application/ld+json">{JSON.stringify(courseJsonLd)}</script>
      </Helmet>

      <header className="page-intro teaching-intro">
        <p className="section-kicker">Teaching portfolio</p>
        <h1>Teaching AI literacy at university scale</h1>
        <p>I design learning that helps students use generative and agentic AI without outsourcing the knowledge, judgement and responsibility that make their work valuable.</p>
        <div className="evidence-line mt-10" aria-label="Selected teaching evidence">
          <span><strong>42</strong><small>tutorial classes</small></span>
          <span><strong>1,700+</strong><small>undergraduates</small></span>
          <span><strong>4</strong><small>consecutive semesters</small></span>
          <span><strong>≈4.3/5</strong><small>average student feedback</small></span>
        </div>
      </header>

      <section className="statement-panel mt-16" aria-labelledby="teaching-position-heading">
        <div>
          <p className="section-kicker">Teaching position</p>
          <h2 id="teaching-position-heading">AI literacy is a curriculum of judgement</h2>
        </div>
        <div className="statement-copy">
          <p>Tool familiarity is useful, but it is not enough. Students need to understand the domain, formulate consequential questions, evaluate evidence, supervise AI-supported work and remain answerable for the result.</p>
          <blockquote>AI can make performance easier. Education must still make expertise possible.</blockquote>
        </div>
      </section>

      <section className="practice-areas" aria-labelledby="practice-areas-heading">
        <div className="practice-areas-intro">
          <p className="section-kicker">What I design</p>
          <h2 id="practice-areas-heading">From institutional ambition to observable student capability</h2>
        </div>
        <div className="practice-areas-grid">
          {practiceAreas.map(area => (
            <article key={area.number}>
              <span>{area.number}</span>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="context-heading">
        <div className="content-section-heading">
          <p className="section-kicker">Current practice</p>
          <h2 id="context-heading">AI literacy in NTU’s Core Curriculum</h2>
        </div>
        <div className="content-section-copy">
          <p>I teach <strong>CC0007 Science and Technology for Humanity</strong> at Nanyang Technological University. The course sits within the Interdisciplinary Collaborative Core and provides a demanding setting for teaching inquiry, evidence and responsible AI use across a highly diverse undergraduate population.</p>
          <p>Public reporting on NTU’s AI initiative identifies Science and Technology for Humanity as the mandatory course in which responsible AI and AI-agent skills are taught. My role is to translate that institutional context into tutorial design, facilitation, feedback and assessment practice.</p>
          <div className="flex flex-wrap gap-5 pt-2">
            <Link to="/teaching/ai-literacy-ntu" className="button-primary">View the CC0007 case study</Link>
            <a href="https://www.channelnewsasia.com/singapore/nanyang-technological-university-ai-initiative-google-6038731" target="_blank" rel="noreferrer" className="button-secondary">Read the public context</a>
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="capability-heading">
        <div className="content-section-heading">
          <p className="section-kicker">Capability model</p>
          <h2 id="capability-heading">What students must be able to do</h2>
        </div>
        <div className="content-section-copy">
          <p className="section-lede !mt-0">Six connected capabilities turn AI use from a shortcut into a disciplined form of inquiry and work.</p>
          <div className="capability-grid mt-9">
            {capabilities.map(([number, title, text]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="architecture-heading">
        <div className="content-section-heading">
          <p className="section-kicker">Learning architecture</p>
          <h2 id="architecture-heading">Scaffold toward agency</h2>
        </div>
        <div className="content-section-copy">
          <div className="learning-path">
            {architecture.map(step => (
              <article key={step.number}>
                <p className="learning-path-number">{step.number}</p>
                <p className="meta mt-4">{step.label}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="assessment-heading">
        <div className="content-section-heading">
          <p className="section-kicker">Assessment</p>
          <h2 id="assessment-heading">Make the human contribution visible</h2>
        </div>
        <div className="content-section-copy">
          <p>When polished output is cheap, assessment must reveal how the student arrived there. I design for observable problem framing, source decisions, critique, human intervention, trade-offs and individual reflection.</p>
          <ul className="professional-list">
            <li><strong>Grounded inquiry:</strong> students curate a multi-perspective source base and show how claims connect to evidence.</li>
            <li><strong>Authentic project work:</strong> teams develop and communicate an AI-enabled response to a real societal problem.</li>
            <li><strong>Defence and reflection:</strong> students explain their decisions, limitations and intellectual development.</li>
            <li><strong>Accountable AI use:</strong> intervention records make verification, redirection and human judgement inspectable.</li>
          </ul>
        </div>
      </section>

      <section className="content-section" aria-labelledby="credentials-heading">
        <div className="content-section-heading">
          <p className="section-kicker">Preparation</p>
          <h2 id="credentials-heading">Academic and professional foundations</h2>
        </div>
        <div className="content-section-copy">
          <p>My teaching combines organisational-behaviour research, higher-education practice, adult learning and applied AI development.</p>
          <ul className="credential-list">
            {credentials.map(item => <li key={item}>{item}</li>)}
          </ul>
          <Link to="/cv" className="text-link mt-7 inline-block">View the full CV →</Link>
        </div>
      </section>

      <section className="contact-band" aria-labelledby="teaching-contact-heading">
        <div>
          <p className="section-kicker !text-[#9db8dc]">Academic and learning innovation</p>
          <h2 id="teaching-contact-heading">Building serious AI capability in higher education</h2>
        </div>
        <div>
          <p>I welcome conversations about AI-literacy curriculum, assessment redesign and responsible human–AI learning in Singapore, Saudi Arabia, the UAE and Europe.</p>
          <Link to="/contact" className="button-light mt-7">Start a conversation</Link>
        </div>
      </section>
    </main>
  );
}

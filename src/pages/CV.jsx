import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Github, Linkedin, Mail, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';

export default function CVPage() {
  const ulTight = 'mt-2 list-disc list-outside pl-5 text-gray-800 space-y-1';
  const ulNormal = 'mt-2 list-disc list-outside pl-5 text-gray-800 space-y-2';

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Canonical path="/cv" />

      <Helmet>
        <title>CV — Hugo Martins</title>
        <meta
          name="description"
          content="Curriculum Vitae — Hugo Martins, PhD. Lecturer at NTU working on human-centred AI for learning, work, assessment, service systems, and responsible technology adoption."
        />
      </Helmet>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Curriculum Vitae</h1>
          <p className="mt-2 text-xl text-gray-900 font-semibold tracking-tight">Hugo Martins, PhD</p>
          <p className="text-gray-700">
            Lecturer, Nanyang Technological University · Human-centred AI for learning, work, and service systems
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-700">
            <a href="https://github.com/alvesmh" className="inline-flex items-center gap-2 hover:text-blue-700 transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
              github.com/alvesmh
            </a>
            <a href="https://www.linkedin.com/in/hugoalvesmartins/" className="inline-flex items-center gap-2 hover:text-blue-700 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
              linkedin.com/in/hugoalvesmartins
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 hover:text-blue-700 transition-colors" aria-label="Contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Mail className="w-4 h-4" />
              Contact
            </Link>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:border-blue-600 hover:text-blue-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600" aria-label="Print CV">
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        <div className="shrink-0">
          <img src="/profile.jpg" alt="Hugo Martins" className="w-28 h-28 rounded-full object-cover shadow-md border border-slate-200" loading="lazy" decoding="async" />
        </div>
      </div>

      <hr className="my-8 border-slate-200" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Professional profile</h2>
        <p className="text-gray-800 leading-relaxed">
          I work at the intersection of higher education, organisational behaviour, and applied AI. My focus is
          human-centred AI: how intelligent systems can support learning, judgement, assessment, service quality, and
          organisational adaptation without replacing the human capabilities that make these activities valuable.
        </p>
        <p className="text-gray-800 leading-relaxed">
          I design curricula, assessment approaches, and AI-enabled teaching tools that help students and professionals
          think more critically, use evidence more carefully, and collaborate more effectively with intelligent systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Learning and assessment</p>
            <ul className={ulTight}>
              <li>AI literacy, critical thinking, and evidence use</li>
              <li>Competency-based curriculum and project-based learning</li>
              <li>Assessment designs for generative AI contexts</li>
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Work and service systems</p>
            <ul className={ulTight}>
              <li>Human-AI collaboration and work redesign</li>
              <li>Organisational adaptation and responsible adoption</li>
              <li>Human-centred technology in service contexts</li>
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Applied AI prototyping</p>
            <ul className={ulTight}>
              <li>RAG assistants and conversational avatars</li>
              <li>Structured reasoning and feedback tools</li>
              <li>React/FastAPI prototypes and decision-support workflows</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-900">Academic appointments and university teaching</h2>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-gray-900 font-semibold">Nanyang Technological University (NTU), Singapore — Lecturer</p>
          <p className="text-gray-700">Interdisciplinary Core Curriculum / undergraduate interdisciplinary education (2024 – Present)</p>
          <ul className={ulNormal}>
            <li>Teach interdisciplinary undergraduate modules on science, technology, humanity, AI literacy, and the future of work.</li>
            <li>Design learning experiences that connect technical change with organisational, social, ethical, and human implications.</li>
            <li>Develop project-based assessments and structured feedback approaches that build critical thinking, evidence use, and applied problem-solving.</li>
            <li>Build and test AI-enabled teaching tools, including retrieval-augmented assistants, critical thinking scaffolds, lesson-planning workflows, and conversational knowledge avatars.</li>
            <li>Translate research on organisational behaviour, learning, and human-centred AI into practical classroom methods and public-facing tools.</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-gray-900 font-semibold">National Institute of Education (NIE), Singapore — Lecturer</p>
          <p className="text-gray-700">Sport Science &amp; Management Programme (2023 – Present)</p>
          <ul className={ulTight}>
            <li>Teach Human Resource Management in Sport, including recruitment, training, performance appraisal, reward systems, and volunteer management.</li>
            <li>Design case studies and role-play exercises to develop applied HR judgement.</li>
            <li>Develop teaching materials, rubrics, and graded assessments aligned with programme requirements.</li>
          </ul>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-6">
          <div>
            <p className="text-gray-900 font-semibold">PhD in Management — Organisational Behaviour</p>
            <p className="text-gray-700">Nanyang Technological University, Singapore</p>
            <ul className={ulTight}>
              <li>Research focus: team collaboration, human behaviour, and performance.</li>
              <li>Methods: structural equation modelling, social network analysis, mediation analysis, experience sampling, and longitudinal/hierarchical modelling.</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">MSc in Leadership and Strategy — Sloan Fellowship</p>
            <p className="text-gray-700">London Business School, United Kingdom</p>
            <ul className={ulTight}>
              <li>Executive-format programme focused on global business strategy, organisational leadership, and innovation.</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">BSc in Economics</p>
            <p className="text-gray-700">University of Porto, Portugal</p>
            <ul className={ulTight}>
              <li>Foundation in economic reasoning, quantitative analysis, and decision-making under uncertainty.</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Certifications and professional development</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-semibold text-gray-900">Teaching and education</p>
            <ul className={ulNormal}>
              <li>Graduate Certificate in Teaching and Learning in Higher Education — NIE, Singapore</li>
              <li>Advanced Certificate in Learning and Performance — Institute for Adult Learning, Singapore</li>
              <li>Professional Certificate in Educational Technology for Educators — SMU Academy</li>
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-semibold text-gray-900">Data science and AI</p>
            <ul className={ulNormal}>
              <li>Advanced Professional Certificate in Data Science and AI — NTU PaCE</li>
              <li>Professional Certificate in Applied Artificial Intelligence — Republic Polytechnic / IMDA</li>
              <li>Generative AI Engineering with LLMs and Generative AI for Educators — IBM</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      <section className="space-y-3">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="text-xl font-semibold text-gray-900">AI tools and prototypes</h2>
          <p className="text-gray-800 leading-relaxed">
            I build practical AI-enabled tools to support pedagogy, feedback, structured reasoning, and evidence-grounded
            knowledge exploration. These tools are experimental and designed to strengthen—not replace—human judgement.
          </p>
          <ul className={ulNormal}>
            <li><strong>Ask-Julia</strong> — evidence-grounded conversational avatar for knowledge exploration.</li>
            <li><strong>Critical Thinker</strong> — structured multi-perspective argument analysis and reporting.</li>
            <li><strong>Six Thinking Hats</strong> — student group analysis workflow for balanced reasoning.</li>
            <li><strong>Generative Lesson Planner</strong> — AI-supported lesson plans and instructor materials from source documents.</li>
          </ul>
          <p className="mt-4 text-gray-700">
            See detailed pedagogical use cases and assessment alignment on the{' '}
            <Link className="text-blue-700 hover:underline" to="/tools" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Tools
            </Link>{' '}
            page.
          </p>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Industry experience</h2>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="font-semibold text-gray-900">Business Management Consultant — Singapore and international projects</p>
          <p className="text-gray-700">2017 – 2023</p>
          <ul className={ulTight}>
            <li>Strategic advisory on internationalisation, market entry, stakeholder engagement, and multi-partner execution.</li>
            <li>Projects involving emerging technologies, digital business models, sport, entertainment, and organisational adaptation.</li>
          </ul>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="font-semibold text-gray-900">Trader — Banco Invest S.A., Portugal</p>
          <p className="text-gray-700">2000 – 2014</p>
          <ul className={ulTight}>
            <li>Managed equity and derivatives positions, translating macro/news flow and microstructure signals into trade construction, sizing, and risk controls.</li>
            <li>Produced trading commentary and performance attribution, documenting rationale, catalysts, and decision rules.</li>
          </ul>
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Selected skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Learning, work, and organisations</p>
            <ul className={ulTight}>
              <li>Human-centred AI; learning design; assessment design; educational technology</li>
              <li>Organisational behaviour; future of work; service systems; human-AI collaboration</li>
              <li>Critical thinking; evidence-based decision-making; responsible AI adoption</li>
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Applied data and AI</p>
            <ul className={ulTight}>
              <li>Python, R, SQL; analytics and modelling workflows</li>
              <li>Retrieval-augmented generation, prompt design, LLM application evaluation</li>
              <li>FastAPI, React, dashboards, and applied decision-support prototypes</li>
            </ul>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="font-semibold text-gray-900">Languages</p>
          <p className="mt-2 text-gray-800">English, Portuguese, Spanish</p>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AboutCard from '../components/Sidebar/AboutCard';
import Canonical from '../components/Canonical';

export default function AboutPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Canonical path="/about" />

      <Helmet>
        <title>About — Hugo Martins</title>
        <meta
          name="description"
          content="Hugo Martins, PhD — Lecturer at NTU working at the intersection of higher education, organisational behaviour, and applied AI. Human-centred AI for learning, work, assessment, and service systems."
        />
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2 space-y-6">
          <header className="space-y-3">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-blue-700">About</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-950">
              Human-centred AI for learning, work, and service systems
            </h1>
            <p className="text-gray-800 leading-relaxed text-lg">
              I’m <strong>Hugo Martins</strong>, a Lecturer at Nanyang Technological University (NTU), Singapore.
              I work at the intersection of higher education, organisational behaviour, and applied AI.
            </p>
            <p className="text-gray-800 leading-relaxed">
              My focus is human-centred AI: how intelligent systems can support learning, judgement, assessment,
              service quality, and organisational adaptation without replacing the human capabilities that make these
              activities valuable.
            </p>
          </header>

          <section className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-gray-900">What I work on</h2>
            <ul className="mt-3 list-disc list-outside pl-5 text-gray-800 space-y-2">
              <li>
                <strong>AI and learning design:</strong> AI literacy, curriculum design, project-based learning,
                assessment innovation, and critical thinking.
              </li>
              <li>
                <strong>AI and work design:</strong> human-AI collaboration, role redesign, organisational adaptation,
                and service systems.
              </li>
              <li>
                <strong>AI-enabled tools and prototypes:</strong> retrieval-augmented assistants, structured reasoning
                tools, lesson-design workflows, and conversational avatars.
              </li>
              <li>
                <strong>Responsible augmentation:</strong> evidence use, process accountability, human judgement,
                academic integrity, and safeguards against shallow automation.
              </li>
            </ul>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-gray-900">Professional background</h2>
            <p className="mt-3 text-gray-800 leading-relaxed">
              I teach interdisciplinary undergraduate modules on science, technology, humanity, and the future of work.
              My teaching focuses on helping students develop AI literacy, critical thinking, responsible technology use,
              and applied problem-solving.
            </p>
            <p className="mt-3 text-gray-800 leading-relaxed">
              Before academia, I worked in finance and business environments shaped by complex socio-technical systems.
              That experience continues to inform my perspective: the central question is not only what AI can do, but
              how people, teams, and institutions adapt around it.
            </p>
          </section>

          <section className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-gray-900">Start here</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/tools"
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-600 transition-colors"
              >
                <p className="font-semibold text-gray-900">AI tools and prototypes</p>
                <p className="mt-1 text-gray-800">
                  Classroom-ready and public-facing tools for learning, reasoning, and knowledge exploration.
                </p>
                <p className="mt-2 text-sm font-semibold text-blue-700">Explore tools →</p>
              </Link>

              <Link
                to="/archive"
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-600 transition-colors"
              >
                <p className="font-semibold text-gray-900">Writing</p>
                <p className="mt-1 text-gray-800">
                  Notes and essays on AI, education, human judgement, work, and socio-technical change.
                </p>
                <p className="mt-2 text-sm font-semibold text-blue-700">Browse posts →</p>
              </Link>

              <Link
                to="/critical-thinking"
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-600 transition-colors"
              >
                <p className="font-semibold text-gray-900">Critical thinking</p>
                <p className="mt-1 text-gray-800">
                  Practical patterns to embed structured reasoning into higher education and AI-supported work.
                </p>
                <p className="mt-2 text-sm font-semibold text-blue-700">View approach →</p>
              </Link>

              <Link
                to="/cv"
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-600 transition-colors"
              >
                <p className="font-semibold text-gray-900">CV</p>
                <p className="mt-1 text-gray-800">
                  Academic appointments, teaching profile, professional background, and selected credentials.
                </p>
                <p className="mt-2 text-sm font-semibold text-blue-700">Read CV →</p>
              </Link>
            </div>
          </section>

          <section className="text-gray-800 leading-relaxed">
            I believe in <strong>augmented intelligence</strong>: AI that strengthens human judgement, clarity, capability,
            and responsibility rather than substituting for them.
          </section>
        </main>

        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <AboutCard />
          </div>
        </aside>
      </div>
    </div>
  );
}

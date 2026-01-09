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
          content="Hugo Martins, PhD — ICC Lecturer at NTU (Singapore). Portfolio of human-centred AI for undergraduate learning: AI literacy, project-based pedagogy, and assessment design for an AI-enabled future."
        />
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <main className="lg:col-span-2 space-y-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">About</h1>
            <p className="text-gray-800 leading-relaxed">
              I’m <strong>Hugo Martins</strong> - an Interdisciplinary Core Curriculum (ICC) Lecturer at Nanyang
              Technological University (NTU), Singapore. I design learning experiences and practical tools that help
              students build durable competencies for an <strong>AI-enabled future</strong>.
            </p>
          </header>

          {/* What I focus on */}
          <section className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-gray-900">What I work on</h2>
            <ul className="mt-3 list-disc list-outside pl-5 text-gray-800 space-y-2">
              <li>
                <strong>AI literacy (learning about AI):</strong> capabilities, limitations, data reasoning, and societal
                implications.
              </li>
              <li>
                <strong>Augmented learning (learning with AI):</strong> structured, transparent workflows that strengthen
                thinking and maintain academic integrity.
              </li>
              <li>
                <strong>Competency- and project-based pedagogy:</strong> authentic tasks with clear evidence of skills,
                reflection, and feedback cycles.
              </li>
              <li>
                <strong>Assessment design for the GenAI era:</strong> process + outcomes, individual + group components,
                and defensible standards of reasoning.
              </li>
            </ul>
          </section>

          {/* Where to start */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-gray-900">Start here</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/tools"
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-600 transition-colors"
              >
                <p className="font-semibold text-gray-900">AI Teaching Tools</p>
                <p className="mt-1 text-gray-800">
                  Classroom-ready tools with pedagogical use cases and assessment alignment.
                </p>
                <p className="mt-2 text-sm font-semibold text-blue-700">Explore tools →</p>
              </Link>

              <Link
                to="/critical-thinking"
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-600 transition-colors"
              >
                <p className="font-semibold text-gray-900">Critical Thinking</p>
                <p className="mt-1 text-gray-800">
                  Practical patterns to embed structured reasoning across higher education modules.
                </p>
                <p className="mt-2 text-sm font-semibold text-blue-700">View approach →</p>
              </Link>

              <Link
                to="/cv"
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-600 transition-colors"
              >
                <p className="font-semibold text-gray-900">CV</p>
                <p className="mt-1 text-gray-800">
                  Academic appointments, teaching profile, and professional background.
                </p>
                <p className="mt-2 text-sm font-semibold text-blue-700">Read CV →</p>
              </Link>

              <Link
                to="/archive"
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-600 transition-colors"
              >
                <p className="font-semibold text-gray-900">Writing</p>
                <p className="mt-1 text-gray-800">
                  Notes on AI, education, and socio-technical change.
                </p>
                <p className="mt-2 text-sm font-semibold text-blue-700">Browse posts →</p>
              </Link>
            </div>
          </section>

          {/* Close */}
          <section className="text-gray-800 leading-relaxed">
            I believe in <strong>Augmented Intelligence</strong>: AI that empowers humans through judgement, clarity, and
            responsibility, rather than replacing them.
          </section>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <AboutCard />
          </div>
        </aside>
      </div>
    </div>
  );
}


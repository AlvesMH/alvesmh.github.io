import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ClipboardList, FileText, ExternalLink, Github } from 'lucide-react';

const tiles = [
  {
    title: 'Critical Thinker',
    subtitle: (
      <>
        Multi-agent critical thinking analysis (
        <a
          href="https://louisville.edu/ideastoaction/about/criticalthinking/framework/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-700 visited:text-purple-600"
        >
          Paul-Elder Critical Thinking Framework
        </a>
        )
      </>
    ),
    description:
      'A web app that supports rigorous evaluation of arguments, essays, and academic texts through four independent Critical Thinking Agents, producing a consolidated, downloadable report.',
    icon: Brain,
    detailsTo: '/tools#critical-thinker',
    links: [
      { label: 'Live demo', href: 'https://critical-thinker.onrender.com', kind: 'demo' },
      { label: 'GitHub', href: 'https://github.com/AlvesMH/Critical-Thinker', kind: 'github' }
    ]
  },
  {
    title: 'Six Thinking Hats',
    subtitle: 'Parallel thinking for clearer decisions, stronger discussion, and better reflection',
    description:
      'A structured workflow for De Bono’s Six Thinking Hats: separate facts, feelings, risks, benefits, creativity, and process control to improve the quality of group reasoning and decision-making.',
    icon: ClipboardList,
    detailsTo: '/tools#six-thinking-hats',
    links: [
      { label: 'Live demo', href: 'https://six-thinking-hats.onrender.com/', kind: 'demo' },
      { label: 'GitHub', href: 'https://github.com/AlvesMH/six-thinking-hats-app', kind: 'github' }
    ]
  },
  {
    title: 'Generative Lesson Planner',
    subtitle: 'Retrieval Augmented Generation-powered teaching assistant',
    description:
      'Generates professional-grade lesson plans, activity handouts, and instructor pointers from uploaded lesson materials, supporting faster preparation and more consistent learning design.',
    icon: ClipboardList,
    detailsTo: '/tools#lesson-planner',
    links: [
      { label: 'Live demo', href: 'https://lesson-planner-app.onrender.com', kind: 'demo' },
      { label: 'GitHub', href: 'https://github.com/AlvesMH/Lesson-Planner-App', kind: 'github' }
    ]
  },
  {
    title: 'Academic Summariser / Generator',
    subtitle: 'Structured summaries for academic text content, also supports PDFs',
    description:
      'An effective summariser-generator, with Retrieval Augmented Generation, designed to support efficient comprehension, seminar discussion, and evidence-based writing.',
    icon: FileText,
    detailsTo: '/tools#academic-summariser',
    links: [
      { label: 'Live demo', href: 'https://summarizer-generator.onrender.com', kind: 'demo' },
      { label: 'GitHub', href: 'https://github.com/AlvesMH/Article-Summarizer', kind: 'github' }
    ]
  }
];

function LinkButton({ href, label, kind }) {
  const Icon = kind === 'github' ? Github : ExternalLink;
  const base =
    'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600';
  const styles =
    kind === 'github'
      ? 'border border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-700 bg-white'
      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md';

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles}`}
      aria-label={`${label} (opens in a new tab)`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}

function InternalLinkButton({ label, to }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <FileText className="w-4 h-4" />
      {label}
    </Link>
  );
}

export default function ProofTiles() {
  return (
    <section id="proof" aria-label="AI teaching tools" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">AI Teaching Tools</h3>
            <p className="mt-2 text-gray-700 max-w-3xl leading-relaxed">
              Selected classroom tools that operationalise “learning with AI”: structured workflows, clear outputs, and
              artefacts that support competency-based assessment and project-based learning.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <article key={t.title} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{t.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{t.subtitle}</p>
                  </div>
                </div>

                <p className="mt-4 text-gray-700 leading-relaxed">{t.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {t.links.map((l) => (
                    <LinkButton key={l.href} href={l.href} label={l.label} kind={l.kind} />
                  ))}
                  <InternalLinkButton label="Details" to={t.detailsTo} />
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-600">
                  Live demo may take up to 50 seconds to wake up (free hosting).
                </div>
              </article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

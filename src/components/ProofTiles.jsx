import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ClipboardList, FileText, ExternalLink, Github, Lightbulb } from 'lucide-react';

const tiles = [
  {
    title: 'Ask-Julia',
    subtitle: 'Evidence-grounded conversational avatar for higher education knowledge exploration',
    description:
      'A voice-enabled avatar that helps users ask questions about a curated knowledge base and receive spoken answers, concise evidence summaries, and fuller explanations. It demonstrates RAG, avatar UX, evidence cards, and human-centred educational interaction design.',
    icon: FileText,
    detailsTo: '/tools#ask-julia',
    links: [
      { label: 'Live demo', href: 'https://ask-julia.onrender.com', kind: 'demo' },
      { label: 'GitHub', href: 'https://github.com/AlvesMH/AlvesMH/blob/main/img/ask-julia.md', kind: 'github' }
    ]
  },
  {
    title: 'Critical Thinker',
    subtitle: 'Structured argument analysis using the Paul-Elder Critical Thinking Framework',
    description:
      'A web app for evaluating arguments, essays, policy proposals, and academic texts through multiple analytical perspectives. It turns critique into an inspectable workflow: assumptions, evidence quality, reasoning standards, implications, and a downloadable report.',
    icon: Brain,
    detailsTo: '/tools#critical-thinker',
    links: [
      { label: 'Live demo', href: 'https://critical-thinker.onrender.com', kind: 'demo' },
      { label: 'GitHub', href: 'https://github.com/AlvesMH/AlvesMH/blob/main/img/pack/critical-thinker/README.md', kind: 'github' }
    ]
  },
  {
    title: 'Six Thinking Hats',
    subtitle: 'Parallel thinking workflow for group reasoning and decision quality',
    description:
      'A structured classroom workflow based on Edward de Bono’s Six Thinking Hats. It separates facts, feelings, risks, benefits, creativity, and process control so students can move beyond unstructured debate into balanced analysis and synthesis.',
    icon: Lightbulb,
    detailsTo: '/tools#six-thinking-hats',
    links: [
      { label: 'Live demo', href: 'https://six-thinking-hats.onrender.com/', kind: 'demo' },
      { label: 'GitHub', href: 'https://github.com/AlvesMH/AlvesMH/blob/main/img/pack/six-hats/README.md', kind: 'github' }
    ]
  },
  {
    title: 'Generative Lesson Planner',
    subtitle: 'AI-supported lesson design workflow using instructor-provided materials',
    description:
      'A teaching assistant that generates lesson plans, group activity handouts, and instructor pointers from uploaded materials. It supports faster preparation while keeping learning outcomes, local context, and educator judgement in control.',
    icon: ClipboardList,
    detailsTo: '/tools#lesson-planner',
    links: [
      { label: 'Live demo', href: 'https://lesson-planner-app.onrender.com', kind: 'demo' },
      { label: 'GitHub', href: 'https://github.com/AlvesMH/Lesson-Planner-App', kind: 'github' }
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
    <section id="proof" aria-label="Featured AI tools and prototypes" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-blue-700">Proof of work</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-950">
              Featured AI tools and prototypes
            </h2>
            <p className="mt-3 text-gray-700 max-w-4xl leading-relaxed">
              Selected tools that operationalise human-centred AI: structured workflows, evidence-grounded outputs,
              learning artefacts, and interfaces that support judgement rather than replace it.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <article key={t.title} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{t.title}</h3>
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
                  Live demos may take up to 50 seconds to wake up on first use.
                </div>
              </article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

import React from 'react';
import Canonical from '../components/Canonical';
import { Helmet } from 'react-helmet-async';
import { Brain, ClipboardList, FileText, ExternalLink, Github, CheckCircle2, Lightbulb } from 'lucide-react';

const TOOLS = [
  {
    id: 'ask-julia',
    title: 'Ask-Julia',
    subtitle: 'Evidence-grounded conversational avatar for higher education knowledge exploration',
    icon: FileText,
    demo: 'https://ask-julia.onrender.com',
    repo: 'https://github.com/AlvesMH/AlvesMH/blob/main/img/ask-julia.md',
    summary:
      'Ask-Julia is a voice-enabled avatar that helps users explore a curated knowledge base through spoken answers, evidence summaries, and fuller explanations. It demonstrates retrieval-augmented generation, avatar interaction, evidence-card design, and human-centred educational UX.',
    useCases: [
      'Discussion preparation: users ask natural-language questions and receive concise, evidence-grounded explanations.',
      'Knowledge exploration: complex material becomes easier to navigate through a conversational interface.',
      'Public demonstration: shows how AI can make curated knowledge more accessible without removing the need for judgement.'
    ],
    assessment: [
      'Ask students to map each claim to the evidence summary or source material.',
      'Use the avatar as a rehearsal partner, then require students to write their own synthesis and limitations.',
      'Pair with short oral checkpoints to verify understanding beyond the generated answer.'
    ],
    responsibleUse: [
      'Use curated knowledge bases rather than open-ended unsupported claims.',
      'Treat spoken answers as starting points for inquiry, not final authority.',
      'Make uncertainty, evidence boundaries, and source limitations explicit.'
    ]
  },
  {
    id: 'critical-thinker',
    title: 'Critical Thinker',
    subtitle: 'Structured argument analysis aligned to Paul and Elder’s critical thinking framework',
    icon: Brain,
    demo: 'https://critical-thinker.onrender.com',
    repo: 'https://github.com/AlvesMH/AlvesMH/blob/main/img/pack/critical-thinker/README.md',
    summary:
      'Critical Thinker supports rigorous evaluation of arguments, essays, policy proposals, and academic texts. It operationalises critique through multiple analytical perspectives and produces a consolidated report that students can annotate and defend.',
    useCases: [
      'Pre-class: students submit a short argument and receive a critique scaffold.',
      'In-class: groups compare critiques and revise claims using explicit standards of reasoning.',
      'Post-class: students document what changed in their assumptions, evidence, and implications.'
    ],
    assessment: [
      'Use the report as an evidence trail for reasoning quality, not as a final submission by itself.',
      'Map directly to criteria such as clarity, accuracy, relevance, depth, breadth, and fairness.',
      'Require students to justify which critique points they accepted, rejected, or revised.'
    ],
    responsibleUse: [
      'Require a student-authored rationale and reflection section.',
      'Use short viva, mini-defence, or in-class checkpoints for higher-stakes submissions.',
      'Assess citations, data provenance, limitations, and interpretation.'
    ]
  },
  {
    id: 'six-thinking-hats',
    title: 'Six Thinking Hats',
    subtitle: 'Parallel thinking workflow for group reasoning, decision quality, and reflection',
    icon: Lightbulb,
    demo: 'https://six-thinking-hats.onrender.com/',
    repo: 'https://github.com/AlvesMH/AlvesMH/blob/main/img/pack/six-hats/README.md',
    summary:
      'A structured workflow based on Edward de Bono’s Six Thinking Hats: facts, feelings, risks, benefits, creativity, and process control. The tool helps groups separate modes of thinking before integrating them into a final synthesis.',
    useCases: [
      'Seminars: run timed hat rotations so discussion does not collapse into criticism-only debate.',
      'Project work: create a decision record that documents facts, assumptions, risks, benefits, and alternatives.',
      'Case discussions: assign hats to groups and require a final synthesis that reconciles competing perspectives.'
    ],
    assessment: [
      'Assess hat-by-hat contributions as evidence of balanced reasoning and explicit trade-offs.',
      'Evaluate the final Blue Hat synthesis for integration, prioritisation, and judgement.',
      'Use the artefact as a group process record alongside individual reflection.'
    ],
    responsibleUse: [
      'Require students to submit their own hat notes and a short account of how their view changed.',
      'Use in-class synthesis to reduce over-reliance on generated text.',
      'Mark integration quality rather than volume of AI-assisted output.'
    ]
  },
  {
    id: 'lesson-planner',
    title: 'Generative Lesson Planner',
    subtitle: 'AI-assisted lesson design using instructor-provided source materials',
    icon: ClipboardList,
    demo: 'https://lesson-planner-app.onrender.com',
    repo: 'https://github.com/AlvesMH/Lesson-Planner-App',
    summary:
      'A practical assistant for designing lesson plans, group activity handouts, and instructor pointers from uploaded teaching materials. It supports faster preparation while keeping the educator responsible for learning outcomes, sequencing, and contextual fit.',
    useCases: [
      'Rapid prototyping: generate a lesson outline, then adapt it to cohort profile and institutional requirements.',
      'Activity design: convert readings or slides into active learning tasks such as structured debate, jigsaw, or studio briefs.',
      'Instructor support: produce pointers, timing plans, and facilitation prompts for consistent delivery.'
    ],
    assessment: [
      'Link activities to explicit learning outcomes and competency statements.',
      'Generate draft rubric descriptors and performance levels for educator review.',
      'Create consistent feedback language and marking guides for large cohorts.'
    ],
    responsibleUse: [
      'Treat outputs as drafts requiring educator sign-off and local adaptation.',
      'Document what was generated and what was revised for quality assurance.',
      'Avoid uploading student-identifiable or sensitive information.'
    ]
  }
];

export default function ToolsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Canonical path="/tools" />
      <Helmet>
        <title>AI Tools — Human-centred prototypes for learning, judgement, and teaching work</title>
        <meta
          name="description"
          content="A curated portfolio of human-centred AI tools: evidence-grounded avatars, critical thinking workflows, Six Thinking Hats analysis, and lesson planning support for responsible learning with AI."
        />
      </Helmet>

      <header className="mb-8">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-blue-700">Tools</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-950">
          Human-centred AI tools and prototypes
        </h1>
        <p className="mt-3 text-gray-700 max-w-4xl leading-relaxed">
          This portfolio consolidates applied AI tools for learning, assessment, reasoning, and teaching work. The common
          design principle is augmentation: the tools should make reasoning more visible, evidence use more explicit, and
          human judgement more accountable.
        </p>
      </header>

      <section className="space-y-10">
        {TOOLS.map((t) => (
          <article
            key={t.id}
            id={t.id}
            className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden scroll-mt-24"
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <t.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{t.title}</h2>
                    <p className="mt-1 text-gray-700">{t.subtitle}</p>
                    <p className="mt-3 text-sm text-slate-700 max-w-3xl leading-relaxed">{t.summary}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={t.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                    aria-label={`${t.title} live demo (opens in a new tab)`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live demo
                  </a>
                  <a
                    href={t.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                    aria-label={`${t.title} GitHub repository (opens in a new tab)`}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                  <h3 className="font-semibold text-gray-900">Use cases</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 leading-relaxed">
                    {t.useCases.map((u) => (
                      <li key={u} className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                  <h3 className="font-semibold text-gray-900">Assessment alignment</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 leading-relaxed">
                    {t.assessment.map((a) => (
                      <li key={a} className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                  <h3 className="font-semibold text-gray-900">Responsible use</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 leading-relaxed">
                    {t.responsibleUse.map((i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900">The design logic</h2>
          <p className="mt-3 text-gray-700 max-w-4xl leading-relaxed">
            Across tools, the emphasis is on making thinking inspectable: assumptions, evidence, alternatives, synthesis,
            and reflection. In practice, these tools work best when paired with explicit rubrics, short in-class checkpoints,
            and reflective components that keep learners accountable for interpretation and judgement.
          </p>
        </div>
      </section>
    </div>
  );
}

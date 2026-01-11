import React from 'react';
import Canonical from '../components/Canonical';
import { Helmet } from 'react-helmet-async';
import { Brain, ClipboardList, FileText, ExternalLink, Github, CheckCircle2, Lightbulb } from 'lucide-react';

const TOOLS = [
  {
    id: 'critical-thinker',
    title: 'Critical Thinker',
    subtitle: 'Multi-agent critical thinking analysis aligned to Paul & Elder',
    icon: Brain,
    demo: 'https://critical-thinker.onrender.com',
    repo: 'https://github.com/AlvesMH/Critical-Thinker',
    summary:
      'A classroom-ready workflow for structured critique: purpose, assumptions, evidence quality, inferences, implications, and fairness.',
    useCases: [
      'Pre-class: students submit a short argument/position statement; the tool produces a structured critique scaffold.',
      'In-class: small-group comparison of competing critiques; students defend or revise their argument using standards of clarity, depth, and logic.',
      'Post-class: individual reflection on what changed (assumptions, evidence, or implications) and why.'
    ],
    assessment: [
      'Outcome evidence: a structured report students can annotate and append as an evidence trail.',
      'Rubric alignment: map directly to criteria such as clarity, accuracy, relevance, depth, breadth, and fairness.',
      'Process marks: require students to document revisions and justify decisions using explicit standards.'
    ],
    integrity: [
      'Require “student voice” sections: personal rationale, choices, and trade-offs are not delegable to AI.',
      'Use oral or in-class checkpoints (short viva, mini-defence) for high-stakes submissions.',
      'Ask for citations, data provenance, and limitations as assessed components.'
    ]
  },

  // NEW: inserted as second item
  {
    id: 'six-thinking-hats',
    title: 'Six Thinking Hats',
    subtitle: 'Parallel thinking for clearer decisions, stronger discussion, and better reflection',
    icon: Lightbulb,
    demo: 'https://six-thinking-hats.onrender.com/',
    repo: 'https://github.com/AlvesMH/six-thinking-hats-app',
    summary:
      'A structured workflow for De Bono’s Six Thinking Hats: separate facts, feelings, risks, benefits, creativity, and process control to improve the quality of group reasoning and decision-making.',
    useCases: [
      'Seminars and tutorials: run a timed “hat rotation” to ensure balanced participation and prevent debate from collapsing into a single mode (e.g., criticism-only).',
      'Project work: use Blue Hat planning to define the question, then document White/Yellow/Black/Green outputs as a decision record and rationale.',
      'Case discussions: assign hats to groups and require a synthesis step that reconciles conflicting perspectives into an action plan.'
    ],
    assessment: [
      'Assessable artefact: capture hat-by-hat contributions to evidence balanced reasoning and explicit trade-offs.',
      'Communication outcomes: evaluate quality of argumentation (evidence, realism, creativity, and reflection) rather than “winning” a debate.',
      'Decision quality: require a final Blue Hat synthesis that justifies the chosen option with references to risks, benefits, and assumptions.'
    ],
    integrity: [
      'Make thinking visible: require students to submit their own hat notes and a short rationale explaining how their view evolved.',
      'Use in-class checkpoints: brief oral synthesis or timed writing reduces over-reliance on AI-generated text.',
      'Mark the synthesis: prioritise the final integration (Blue Hat) where judgment and interpretation must be demonstrated.'
    ]
  },

  {
    id: 'lesson-planner',
    title: 'Generative Lesson Planner',
    subtitle: 'AI-assisted lesson plan generation with context from your own materials',
    icon: ClipboardList,
    demo: 'https://lesson-planner-app.onrender.com',
    repo: 'https://github.com/AlvesMH/Lesson-Planner-App',
    summary:
      'A practical assistant for designing learning activities, sequencing, and differentiation - while keeping the educator in control of outcomes and standards.',
    useCases: [
      'Rapid prototyping: generate a lesson outline then refine for local context, student profile, and institutional requirements.',
      'Activity design: convert readings/slides into active learning tasks (think-pair-share, structured debate, jigsaw, studio briefs).',
      'Inclusive practice: propose scaffolds and variations for mixed readiness, language proficiency, and confidence levels.'
    ],
    assessment: [
      'Constructive alignment: link activities to explicit learning outcomes and competency statements.',
      'Assessment design support: generate rubric descriptors and performance levels aligned to the intended competencies.',
      'Efficiency: create consistent feedback language and marking guides for large cohorts.'
    ],
    integrity: [
      'Treat outputs as drafts: require educator sign-off and contextual adaptation.',
      'Retain transparency: document what was generated and what was revised (for QA and reflective practice).',
      'Avoid sensitive data: do not upload student-identifiable information.'
    ]
  },
  {
    id: 'academic-summariser',
    title: 'Academic Summariser / Generator',
    subtitle: 'Structured summaries for research, literacy and evidence-based reasoning',
    icon: FileText,
    demo: 'https://summarizer-generator.onrender.com',
    repo: 'https://github.com/AlvesMH/Article-Summarizer',
    summary:
      'A structured reading companion that supports comprehension, synthesis, and critique—useful for research methods, policy, and interdisciplinary modules.',
    useCases: [
      'Reading preparation: generate a structured preview (research question, methods, findings, limitations) before seminar discussions.',
      'Synthesis tasks: compare multiple articles and extract convergences, conflicts, and gaps.',
      'Evidence training: require students to identify what would change their conclusion (robustness and falsifiability).'
    ],
    assessment: [
      'Demonstrate research literacy: assess the quality of the student’s critique, not the existence of a summary.',
      'Require “evidence-to-claim” mapping: students must connect claims to the specific evidence in the paper.',
      'Include limitations and implications: evaluate whether students can articulate scope conditions and practical consequences.'
    ],
    integrity: [
      'Prevent shallow summarisation: require direct quotations with page/section references and a student-written interpretation.',
      'Use comparative prompts (two papers, one question) to discourage generic outputs.',
      'For graded work, use short in-class checks to confirm understanding.'
    ]
  }
];

export default function ToolsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Canonical path="/tools" />
      <Helmet>
        <title>Tools - Classroom-ready AI workflows for critical thinking and learning design</title>
        <meta
          name="description"
          content="A curated set of classroom-ready tools: critical thinking analysis, lesson planning support, and structured academic summarisation—designed for competency-based and project-based undergraduate education."
        />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tools</h1>
        <p className="mt-3 text-gray-700 max-w-3xl">
          This page consolidates teaching tools and workflows that support <strong>learning with AI</strong> - while keeping
          assessment integrity and human judgment at the centre. Each tool includes suggested pedagogical use cases and
          assessment alignment patterns.
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
                    <p className="mt-3 text-sm text-slate-700 max-w-3xl">{t.summary}</p>
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
                  <h3 className="font-semibold text-gray-900">Pedagogical use cases</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 leading-relaxed">
                    {t.useCases.map((u) => (
                      <li key={u} className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-slate-600" />
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
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-slate-600" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                  <h3 className="font-semibold text-gray-900">Integrity and responsible use</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 leading-relaxed">
                    {t.integrity.map((i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-slate-600" />
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
          <h2 className="text-xl font-semibold text-gray-900">How this supports “learning with AI”</h2>
          <p className="mt-3 text-gray-700 max-w-4xl">
            Across tools, the emphasis is on making reasoning visible, producing assessable artefacts, and supporting
            iterative improvement. In practice, these tools work best when paired with explicit rubrics, short in-class
            checkpoints, and reflective components that keep students accountable for judgment and interpretation.
          </p>
        </div>
      </section>
    </div>
  );
}


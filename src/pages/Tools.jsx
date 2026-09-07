import React from 'react';
import Canonical from '../components/Canonical';
import { Helmet } from 'react-helmet-async';
import { Brain, ClipboardList, FileText, Lightbulb } from 'lucide-react';

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
    <main id="main-content" className="page-shell">
      <Canonical path="/tools" />
      <Helmet>
        <title>Applied Educational AI Systems — Hugo Martins</title>
        <meta
          name="description"
          content="A curated portfolio of human-centred AI tools: evidence-grounded avatars, critical thinking workflows, Six Thinking Hats analysis, and lesson planning support for responsible learning with AI."
        />
      </Helmet>

      <header className="page-intro">
        <p className="section-kicker">Applied educational AI</p>
        <h1>Tools as inspectable teaching practice</h1>
        <p>Public prototypes for evidence-grounded inquiry, structured reasoning, collaborative thinking and learning design. Each makes a pedagogical assumption concrete enough to inspect, test and improve.</p>
        <p className="mt-5 text-[14px] leading-6 text-[#687181]">These are working prototypes, not validated products. Their value lies in the design questions they expose and the learning practices they support.</p>
      </header>

      <section className="mt-16">
        {TOOLS.map((t) => (
          <article key={t.id} id={t.id} className="scroll-mt-28 border-t border-[#c9cdd3] py-12 last:border-b">
            <div className="grid gap-8 md:grid-cols-[4fr_8fr] md:gap-14">
              <div>
                <p className="section-kicker">Public prototype</p>
                <h2 className="mt-3 text-[28px] font-semibold tracking-[-.03em] text-[#111318]">{t.title}</h2>
                <p className="mt-3 text-[14px] leading-6 text-[#687181]">{t.subtitle}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={t.demo} target="_blank" rel="noreferrer" className="button-primary" aria-label={`${t.title} live demo (opens in a new tab)`}>Live demo ↗</a>
                  <a href={t.repo} target="_blank" rel="noreferrer" className="button-secondary" aria-label={`${t.title} GitHub repository (opens in a new tab)`}>GitHub ↗</a>
                </div>
              </div>
              <div>
                <p className="max-w-[760px] text-[16px] leading-[1.75] text-[#4b5360]">{t.summary}</p>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[.11em] text-[#687181]">Maturity · Prototype for demonstration and iterative evaluation</p>
                <div className="mt-9 grid gap-7 lg:grid-cols-3">
                  {[
                    ['Use cases', t.useCases],
                    ['Assessment alignment', t.assessment],
                    ['Responsible use', t.responsibleUse]
                  ].map(([heading, items]) => (
                    <section key={heading} className="border-t border-[#e1e4e8] pt-5">
                      <h3 className="text-[14px] font-semibold text-[#111318]">{heading}</h3>
                      <ul className="mt-4 space-y-3 text-[13px] leading-[1.6] text-[#687181]">
                        {items.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-16 bg-[#111827] px-7 py-12 text-white sm:px-10" aria-labelledby="design-logic-heading">
        <p className="text-[11px] font-bold uppercase tracking-[.17em] text-[#8eb7e1]">Design logic</p>
        <h2 id="design-logic-heading" className="mt-3 text-[30px] font-semibold tracking-[-.03em]">Make thinking inspectable</h2>
        <p className="mt-5 max-w-[850px] text-[16px] leading-[1.75] text-[#ccd4e0]">Across systems, the emphasis is on exposing assumptions, evidence, alternatives, synthesis and reflection. They work best when paired with explicit rubrics, short checkpoints and reflective components that keep learners accountable for interpretation and judgement.</p>
        <p className="mt-7 text-[12px] text-[#9caac0]">Last reviewed September 2026.</p>
      </section>
    </main>
  );
}

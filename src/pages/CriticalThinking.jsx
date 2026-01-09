import React from 'react';
import Canonical from '../components/Canonical';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Brain, Scale, Target, ClipboardCheck, MessagesSquare, Layers } from 'lucide-react';

function SectionCard({ icon: Icon, title, children }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Icon className="w-6 h-6 text-slate-700" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</h2>
            <div className="mt-3 text-gray-700 leading-relaxed">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CriticalThinkingPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Canonical path="/critical-thinking" />
      <Helmet>
        <title>Critical Thinking in Higher Education in the Age of Generative AI</title>
        <meta
          name="description"
          content="A practical, assessable approach to embedding critical thinking across higher education modules in the age of Generative AI, with workflow patterns, assessment design, and integrity safeguards."
        />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Critical Thinking in Higher Education in the Age of Generative AI</h1>
        <p className="mt-3 text-gray-700 max-w-4xl">
          Generative AI slashes the intellectual cost of producing plausible content. This makes <strong>judgment</strong>, <strong>evidence evaluation</strong>,
          and <strong>reasoning transparency</strong> more - not less—important. The goal is not to “ban AI”, but to teach students
          how to use it responsibly while demonstrating competencies that remain human-led: defining problems, checking assumptions,
          reasoning from evidence, and evaluating implications.
        </p>
      </header>

      <div className="space-y-6">
        <SectionCard icon={Target} title="What we should assess (competencies) in an AI-enabled classroom">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Problem framing:</strong> clarify purpose, question at issue, and the boundaries of the task.</li>
            <li><strong>Evidence literacy:</strong> distinguish claims from evidence; evaluate reliability, relevance, and uncertainty.</li>
            <li><strong>Reasoning quality:</strong> make assumptions explicit; justify inferences; test alternative interpretations.</li>
            <li><strong>Implications and ethics:</strong> analyse consequences for stakeholders; consider fairness and risk.</li>
            <li><strong>Metacognition:</strong> reflect on how conclusions changed and why; identify what would change your mind.</li>
          </ul>
          <p className="mt-4">
            In practice, these competencies become visible when students produce structured artefacts (briefs, critiques, annotated
            summaries, revision logs) rather than only polished final prose.
          </p>
        </SectionCard>

        <SectionCard icon={Layers} title="A practical teaching model: “structured thinking + visible process”">
          <p>
            A robust design pattern for AI-integrated learning is to separate the work into three layers:
          </p>
          <ol className="mt-3 list-decimal pl-5 space-y-2">
            <li><strong>Structure:</strong> provide a shared framework (e.g., elements of reasoning and intellectual standards).</li>
            <li><strong>Process:</strong> require checkpoints - draft, critique, revision — so reasoning evolves in visible steps.</li>
            <li><strong>Accountability:</strong> assess student judgment through justification, evidence trails, and short defences.</li>
          </ol>
          <p className="mt-4">
            This reduces the risk of <strong>superficial AI-generated outputs</strong>, because assessment targets the student’s reasoning process
            and decision points, not only the final text.
          </p>
        </SectionCard>

        <SectionCard icon={MessagesSquare} title="How to use Generative AI without losing academic integrity">
          <p>
            AI can be a useful partner for brainstorming, outlining, counter-arguments, and language support. The key is to define
            <strong> permissible uses</strong> and then design assessment so students must demonstrate original judgment.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
              <h3 className="font-semibold text-gray-900">Permissible (examples)</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Generate alternative perspectives or objections to stress-test an argument.</li>
                <li>Convert notes into a draft outline (student must refine and justify choices).</li>
                <li>Summarise a reading as a starting point (student verifies against the source).</li>
                <li>Language polishing for clarity (without changing meaning or inventing evidence).</li>
              </ul>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
              <h3 className="font-semibold text-gray-900">Not permissible (examples)</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Submitting AI-generated work as your own reasoning without attribution or verification.</li>
                <li>Inventing citations, data, or “facts” not present in the source materials.</li>
                <li>Using AI to bypass required analysis steps (e.g., skipping evidence evaluation).</li>
                <li>Uploading confidential or identifiable student information to external tools.</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-700">
            A practical approach is to require a brief “AI use statement” in submissions: what was used, for what purpose,
            and what the student changed after verification.
          </p>
        </SectionCard>

        <SectionCard icon={ClipboardCheck} title="Assessment designs that scale (and remain defensible)">
          <p>
            In large cohorts, assessment must be efficient and reliable. The following patterns are practical and align to
            competency-based goals:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li><strong>Process + outcome:</strong> grade revision logs and reasoning checkpoints, not only final submissions.</li>
            <li><strong>Rubric-first design:</strong> assess clarity, relevance, depth, logic, and fairness explicitly.</li>
            <li><strong>Peer calibration:</strong> structured peer review using the same rubric to strengthen standards literacy.</li>
            <li><strong>Short defences:</strong> brief in-class oral checks (1–3 minutes) for higher-stakes artefacts.</li>
            <li><strong>Evidence trails:</strong> require citations, quotes, or dataset provenance; assess verification quality.</li>
          </ul>
          <p className="mt-4">
            These patterns also support learning analytics: the artefacts and checkpoints create interpretable signals about where
            students struggle (e.g., assumptions, evidence quality, or implications).
          </p>
        </SectionCard>

        <SectionCard icon={Scale} title="Embedding critical thinking across modules (not only in one course)">
          <p>
            Critical thinking becomes durable when it is practised repeatedly across contexts. A workable strategy is a “spiral”
            approach across the curriculum:
          </p>
          <ol className="mt-3 list-decimal pl-5 space-y-2">
            <li><strong>Year 1:</strong> foundations — clarity, argument structure, evidence vs opinion.</li>
            <li><strong>Year 2:</strong> application — assumptions, causal reasoning, uncertainty, competing explanations.</li>
            <li><strong>Year 3:</strong> integration — stakeholder implications, ethics, systems thinking, interdisciplinary synthesis.</li>
            <li><strong>Final year:</strong> capstone — authentic projects with defensible reasoning and public-facing communication.</li>
          </ol>
          <p className="mt-4">
            For each level, define a small set of “signature tasks” that produce comparable artefacts (briefs, critiques, memos,
            project reports). This makes competency development observable over time.
          </p>
        </SectionCard>

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Related tools</h2>
            <p className="mt-3 text-gray-700 max-w-4xl">
              If you want to operationalise these patterns, see the tools page for classroom-ready workflows and suggested
              assessment alignment.
            </p>
            <Link
              to="/tools"
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              <Brain className="w-4 h-4" />
              Go to Tools
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

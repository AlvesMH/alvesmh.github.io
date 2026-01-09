import React from 'react';
import { GraduationCap, Sparkles, ClipboardCheck } from 'lucide-react';

export default function AlignmentCallout() {
  return (
    <section
      aria-label="Alignment to Transformative UG Education for an AI-Future"
      className="bg-white border border-slate-200 rounded-2xl shadow-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Alignment to Transformative Education for an AI-Future
            </h3>
            <p className="mt-2 text-gray-700 max-w-3xl">
              The tools and teaching artefacts on this site are designed to support competency-based learning, project-based
              pedagogy, and digital assessment practices that scale responsibly in large undergraduate settings.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-slate-700" />
              <p className="font-semibold text-gray-900">Competency-based curriculum</p>
            </div>
            <ul className="mt-3 space-y-2 text-gray-700 text-sm leading-relaxed">
              <li>Make competencies explicit (critical thinking, AI literacy, evidence use) and map tasks to outcomes.</li>
              <li>Generate assessable artefacts: structured reports, lesson plans, and annotated summaries.</li>
              <li>Support iterative improvement through rubric-aligned prompts and reflection checkpoints.</li>
            </ul>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-slate-700" />
              <p className="font-semibold text-gray-900">Signature pedagogy</p>
            </div>
            <ul className="mt-3 space-y-2 text-gray-700 text-sm leading-relaxed">
              <li>Learning with AI: guided use of AI tools for drafting, critique, and sense-making.</li>
              <li>Project-based learning: less didactic teaching, with authentic briefs and “learning by doing”.</li>
              <li>Human-centred framing: focus on judgment, assumptions, and implications—not tool outputs alone.</li>
            </ul>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-slate-700" />
              <p className="font-semibold text-gray-900">Assessments</p>
            </div>
            <ul className="mt-3 space-y-2 text-gray-700 text-sm leading-relaxed">
              <li>Digital assessment readiness: artefacts are structured for efficient marking and feedback.</li>
              <li>Assess process and outcomes: include reasoning steps, evidence trails, and reflection.</li>
              <li>Enable peer/self elements: prompts and templates can be used for calibrated peer review.</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-600">
          Note: These are generic design patterns intended to support responsible AI use in education. Final assessment design should
          comply with course policies, academic integrity requirements, and institutional guidance.
        </p>
      </div>
    </section>
  );
}

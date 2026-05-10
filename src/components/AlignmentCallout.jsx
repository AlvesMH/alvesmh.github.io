import React from 'react';
import { Brain, ClipboardCheck, GraduationCap, Sparkles } from 'lucide-react';

export default function AlignmentCallout() {
  return (
    <section
      aria-label="Human-centred AI design pillars"
      className="bg-white border border-slate-200 rounded-2xl shadow-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Four design pillars
            </h2>
            <p className="mt-2 text-gray-700 max-w-4xl leading-relaxed">
              The tools and writing on this site are organised around a single question: how can AI strengthen human
              learning, judgement, and work systems rather than simply automate tasks? The answer is not more technology
              alone; it is better design of roles, evidence practices, learning processes, and accountability.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-slate-700" />
              <p className="font-semibold text-gray-900">AI for learning</p>
            </div>
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              Curriculum, assessment, AI literacy, critical thinking, and learning designs that help students use AI
              without outsourcing judgement.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-slate-700" />
              <p className="font-semibold text-gray-900">AI for judgement</p>
            </div>
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              Structured workflows that surface assumptions, evaluate evidence, compare alternatives, and make reasoning
              inspectable.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-slate-700" />
              <p className="font-semibold text-gray-900">AI for work</p>
            </div>
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              Human-AI collaboration, work redesign, and service systems where technology improves capability,
              consistency, and quality of interaction.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-slate-700" />
              <p className="font-semibold text-gray-900">Responsible adoption</p>
            </div>
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              Transparent use, evidence trails, process accountability, and safeguards against over-reliance, shallow
              fluency, and cognitive offloading.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

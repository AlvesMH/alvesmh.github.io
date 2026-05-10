import React from 'react';
import { motion } from 'framer-motion';
import { Brain, GraduationCap, Network, Workflow } from 'lucide-react';

export default function ExecutiveSummary() {
  return (
    <section
      aria-label="60-second summary"
      className="bg-white border border-slate-200 rounded-2xl shadow-sm"
    >
      <div className="p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                60-second summary
              </h2>
              <p className="mt-2 text-gray-700 leading-relaxed max-w-4xl">
                I am a Lecturer at Nanyang Technological University working at the intersection of higher education,
                organisational behaviour, and applied AI. My focus is human-centred AI: how intelligent systems can
                support learning, judgement, assessment, service quality, and organisational adaptation without
                replacing the human capabilities that make these activities valuable.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-slate-700" />
                <p className="font-semibold text-gray-900">Learning and assessment</p>
              </div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>AI literacy, critical thinking, and evidence-based decision-making</li>
                <li>Competency-based curriculum and project-based learning</li>
                <li>Assessment designs that make reasoning, process, and judgement visible</li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-slate-700" />
                <p className="font-semibold text-gray-900">Work and service systems</p>
              </div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>Human-AI work redesign, and AI adoption</li>
                <li>Human services, where AI strengthens the human touch</li>
                <li>AI Adoption for teams, institutions, and service settings</li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-slate-700" />
                <p className="font-semibold text-gray-900">Applied AI prototypes</p>
              </div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>Retrieval-augmented assistants, avatars, and structured reasoning tools</li>
                <li>Workflows and Tools that operationalise augmentation rather than automate judgement away</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

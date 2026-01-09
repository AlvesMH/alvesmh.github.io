import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Compass, LineChart } from 'lucide-react';

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
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                60-second summary
              </h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                I am a Lecturer at Nanyang Technological University (Singapore),
                teaching and designing learning experiences that develop demonstrable competencies in critical thinking,
                responsible technology use, and evidence-based decision-making.
              </p>
              <br />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-slate-700" />
                <p className="font-semibold text-gray-900">Education focus</p>
              </div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>Competency-based outcomes and clear performance standards</li>
                <li>Project-based learning that integrates theory with practice</li>
                <li>Learning with AI through structured, method-driven workflows</li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-slate-700" />
                <p className="font-semibold text-gray-900">Assessment approach</p>
              </div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>Digital assessments that strengthen feedback and reflection</li>
                <li>Process + outcomes, with peer and self-assessment where appropriate</li>
                <li>Portfolio-ready artefacts to support employability signalling</li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-slate-700" />
                <p className="font-semibold text-gray-900">Current priorities</p>
              </div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>Human–AI collaboration and meta-cognitive skill development</li>
                <li>AI-enabled teaching assistants that reduce overhead and raise quality</li>
                <li>Responsible learning analytics for student development pathways</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

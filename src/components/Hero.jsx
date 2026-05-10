import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, PenLine } from 'lucide-react';

const Hero = () => (
  <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(147,51,234,0.12),transparent_32%)]" />

    <div className="max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-4 text-sm font-semibold tracking-[0.22em] uppercase text-blue-700">
          Applied AI · Learning Design · Human-Centred Work
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-950 mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Human-Centred AI
          </span>
          <span className="block mt-3 text-3xl sm:text-4xl md:text-5xl text-gray-950">
            for Learning, Work, and Service Systems
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
          I study, teach, and build practical AI-enabled tools that help people think, learn, decide, and work better.
          My work connects organisational behaviour, curriculum design, assessment innovation, and applied AI
          prototyping.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#proof"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            Explore tools
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#latest"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white text-gray-800 px-8 py-3 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-700 transition-colors text-center"
          >
            <PenLine className="w-4 h-4" />
            Read essays
          </a>

          <a
            href="https://github.com/AlvesMH"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white text-gray-800 px-8 py-3 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-700 transition-colors text-center"
          >
            <Github className="w-4 h-4" />
            View GitHub
          </a>

          <Link
            to="/about"
            className="inline-flex items-center justify-center border border-slate-300 bg-white text-gray-800 px-8 py-3 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-700 transition-colors text-center"
          >
            About
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to My{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Digital Garden
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A space where I share my journey through technology, academia, and
          personal growth. Join me as I explore ideas, solve problems, and
          document my learning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#latest"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            Read Latest Posts
          </a>
          <a
            href="#about"
            className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors text-center"
          >
            About Me
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
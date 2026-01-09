import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Human-Centred AI
          </span>
          <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl text-gray-900">
            for Learning, Work, and Society
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          This site consolidates teaching tools, methodologies, and personal perspectives on how AI is reshaping
           learning, critical thinking, and organisational life - with a focus on augmented intelligence and responsible practice.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Link to portfolio/proof section on Home page */}
          <a
            href="#proof"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            Explore Teaching Tools
          </a>
          {/* Link to latest posts section on Home page (scrolls within home) */}
          <a
            href="#latest"
            className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors text-center"
          >
            Read Latest Posts
          </a>
          {/* Link to About page */}
          <Link
            to="/about"
            className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors text-center"
          >
            About Me
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;

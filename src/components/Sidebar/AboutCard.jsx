import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const AboutCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Profile Image */}
      <div className="text-center mb-6">
        <img
          src="/profile.jpg" // Ensure profile.jpg is inside public/
          alt="Hugo Martins"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
        />
        <h3 className="text-xl font-bold text-gray-900">Hugo Martins, PhD.</h3>
        <p className="text-gray-600">Researcher • Technologist • Writer</p>
      </div>

      {/* About Text */}
      <p className="text-gray-700 mb-6 leading-relaxed text-center">
        Welcome to my digital corner of the internet! I'm passionate about technology,
        academic research, and sharing knowledge through writing.
      </p>

      {/* Social Links */}
      <div className="flex justify-center gap-4">
        {/* GitHub */}
        <a
          href="https://github.com/alvesmh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/hugoalvesmartins/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>

        {/* Email */}
        <a
          href="mailto:your.email@gmail.com"
          aria-label="Email"
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default AboutCard;

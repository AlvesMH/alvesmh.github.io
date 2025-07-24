import React from 'react';
import { User, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const AboutCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="text-center mb-6">
      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
        <User className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900">Alex Developer</h3>
      <p className="text-gray-600">Software Engineer & Researcher</p>
    </div>

    <p className="text-gray-700 mb-6 leading-relaxed">
      Welcome to my digital corner of the internet! I'm passionate about technology,
      academic research, and sharing knowledge through writing.
    </p>

    <div className="flex justify-center gap-4">
      <a href="#" aria-label="GitHub" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
      <a href="#" aria-label="Twitter" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
      <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
      <a href="#" aria-label="Email" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
    </div>
  </div>
);

export default AboutCard;
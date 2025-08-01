import React from 'react';
import AboutCard from '../components/Sidebar/AboutCard';

const AboutPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>

      <p className="mb-4">
        I am <strong>John Smith, PhD</strong>, an economist, strategist, and educator with a unique blend of expertise spanning financial markets, business leadership, and emerging technologies. With over 15 years of hands-on experience in trading and financial markets, I have navigated the complexities of global economics and investment strategies at the highest levels.
      </p>

      <p className="mb-4">
        My academic journey includes an <strong>MSc in Leadership and Strategy</strong> and a <strong>PhD in Organizational Behaviour</strong>, allowing me to bridge the worlds of rigorous research and practical application. Today, I serve as a university lecturer, where I teach the interdisciplinary module <em>"Science and Technology for Humanity."</em> This course explores the transformative forces of Ageing, Artificial Intelligence, and Blockchain through three essential lenses: the Scientific foundations, Business and Economic implications, and the Humanities and Social Sciences perspectives.
      </p>

      <p className="mb-4">
        My goal is to inspire curiosity, critical thinking, and a forward-looking mindset in the next generation of leaders. My professional mission is to analyze how the emergence of advanced artificial intelligence and related technologies will reshape our personal lives, work, and global economy over the next decade.
      </p>

      <p className="mb-4">
        I write and speak about the business strategies, economic policies, and sociological shifts needed to navigate this future with wisdom and resilience. By combining insights from economics, finance, applied coding technologies, and organizational leadership, I aim to decode the opportunities and challenges of an AI-driven era.
      </p>

      <p className="mb-4">
        Beyond academia and writing, I am deeply committed to fostering dialogue on the ethical and psychological dimensions of technological change. How will AI alter human behavior? Can blockchain redefine trust in institutions? How should societies adapt to an aging population in an era of exponential innovation? These are the questions that drive my research and public engagement.
      </p>

      {/* Reuse the AboutCard component for bio and social links */}
      <div className="mt-8">
        <AboutCard />
      </div>
    </div>
  );
};

export default AboutPage;


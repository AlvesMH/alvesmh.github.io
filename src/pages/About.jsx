import React from 'react';
import AboutCard from '../components/Sidebar/AboutCard';

const AboutPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>

      <p className="mb-4">
        Hi, I’m <strong>Hugo Martins</strong>
      </p>

      <p className="mb-4">
        I teach <em>Science and Technology for Humanity</em> at Nanyang Technological University (NTU), a course that examines the societal, economic, and ethical implications of emerging technologies like <strong>Artificial Intelligence</strong>, <strong>Blockchain</strong>, and <strong>Longevity Science</strong>.
      </p>
      <br />

      <hr style={{ border: 'none', height: '2px', backgroundColor: '#ccc' }} />
      <br />
      <p className="mb-4">
        My interests sit at the intersection of <strong>technology</strong>, <strong>education</strong>, and <strong>organizational behaviour</strong>. I explore AI-powered tools, automation scripts, and intelligent dashboards that simplify complex workflows in education and research—freeing up time and attention for what really matters: <strong>critical thinking</strong>, <strong>creativity</strong>, and <strong>sense-making</strong>.
      </p>
      <br />

      <hr style={{ border: 'none', height: '2px', backgroundColor: '#ccc' }} />
      <br />
      <p className="mb-4">
        I believe in <strong>Augmented Intelligence</strong>—that AI should amplify, not replace, human potential. My current projects explore:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li><strong>Retrieval-Augmented Generation (RAG) pipelines for research and learning</strong></li>
        <li><strong>Flipped classroom augmentation using generative AI</strong></li>
        <li><strong>Human–AI interaction design and ethical automation</strong></li>
        <li><strong>Social and psychological impacts of technological change in business and society</strong></li>
      </ul>
      <br />

      <hr style={{ border: 'none', height: '2px', backgroundColor: '#ccc' }} />
      <br />
      <p className="mb-4">
        This blog is where I share what I’m building, thinking, and experimenting with—whether it’s a <strong>prompt framework for educators</strong>, a <strong>LLM-powered avatar</strong>, a <strong>scalable RAG prototype</strong>, or reflections on the future of learning in an AI-saturated world.
      </p>

      <p className="mb-4">
        Thanks for visiting. Let’s imagine better human–machine futures—together.
      </p>
      <br />

      {/* Reuse the AboutCard component for bio and social links */}
      <div className="mt-8">
        <AboutCard />
      </div>
    </div>
  );
};

export default AboutPage;


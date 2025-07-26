import React from "react";
import ReactMarkdown from "react-markdown";
import MarkdownRenderer from "../components/MarkdownRenderer";

export const POSTS = [
  {
    id: 1,
    title: 'The AI Economy: New Rules for a New Game',
    excerpt:
      'How artificial intelligence is rewriting the economic playbook, transforming productivity, investment, and global competitiveness.',
    category: 'economy',
    date: '2025-07-01',
    readTime: '10 min read',
    tags: ['AI', 'Economy', 'Productivity'],
  },
  {
    id: 2,
    title: 'Superintelligence: Promise or Peril?',
    excerpt:
      'Examining the extraordinary economic growth AI could unlock—and the societal challenges of adapting to rapid technological change.',
    category: 'ethics',
    date: '2025-06-20',
    readTime: '12 min read',
    tags: ['AI', 'Superintelligence', 'Society'],
  },
  {
    id: 3,
    title: 'AI and the Great Divide',
    excerpt:
      "Why artificial intelligence could intensify economic disparities, creating a stark divide between AI 'haves' and 'have-nots'.",
    category: 'inequality',
    date: '2025-06-10',
    readTime: '8 min read',
    tags: ['AI', 'Economics', 'Inequality'],
  },
  {
    id: 4,
    title: 'Humanizing Machines: A Conversation with Geoffrey Hinton',
    excerpt:
      'Insights from AI pioneer Geoffrey Hinton on how machine learning mirrors human cognition, reshaping our understanding of intelligence.',
    category: 'interview',
    date: '2025-05-30',
    readTime: '15 min read',
    tags: ['AI', 'Cognition', 'Geoffrey Hinton'],
  },
  {
    id: 5,
    title: "Productivity Renaissance: AI's Next Frontier",
    excerpt:
      "Exploring how generative AI tools are boosting productivity, reshaping labor markets, and redefining economic potential.",
    category: 'productivity',
    date: '2025-05-15',
    readTime: '9 min read',
    tags: ['AI', 'Productivity', 'Labor Markets'],
  },
  {
    id: 6,
    title: "Blockchain's Invisible Revolution",
    excerpt:
      "Beyond cryptocurrencies, blockchain's transformative impact on trust, transparency, and efficiency in global markets.",
    category: 'blockchain',
    date: '2025-05-01',
    readTime: '11 min read',
    tags: ['Blockchain', 'Trust', 'Markets'],
  },
  {
    id: 7,
    title: 'AI, Aging, and the Future of Work',
    excerpt:
      'How automation and intelligent technology can address aging demographics, altering workplace dynamics and retirement.',
    category: 'future-of-work',
    date: '2025-04-20',
    readTime: '10 min read',
    tags: ['AI', 'Aging', 'Workplace'],
  },
  {
    id: 8,
    title: 'Democratizing Intelligence or Accelerating Inequality?',
    excerpt:
      'Assessing whether AI technologies can truly democratize opportunity, or if they inevitably reinforce existing social stratifications.',
    category: 'society',
    date: '2025-04-05',
    readTime: '9 min read',
    tags: ['AI', 'Democratization', 'Inequality'],
  },
  {
    id: 9,
    title: 'Mind Over Machines: Psychological Impacts of AI Integration',
    excerpt:
      'Understanding how increasing AI presence affects human psychology, relationships, and societal values.',
    category: 'psychology',
    date: '2025-03-25',
    readTime: '8 min read',
    tags: ['AI', 'Psychology', 'Society'],
  },
  {
    id: 10,
    title: 'Strategizing for an AI-Driven Future',
    excerpt:
      'Key strategies businesses must adopt today to leverage AI, mitigate disruption, and thrive in a rapidly evolving technological landscape.',
    category: 'strategy',
    date: '2025-03-10',
    readTime: '12 min read',
    tags: ['AI', 'Business Strategy', 'Future'],
  },
];

export const CATEGORIES = [
  { id: 'all', name: 'All Posts' },
  { id: 'economy', name: 'AI & Economy' },
  { id: 'ethics', name: 'AI Ethics & Risks' },
  { id: 'inequality', name: 'Inequality & Society' },
  { id: 'interview', name: 'Interviews & Insights' },
  { id: 'productivity', name: 'Productivity & Work' },
  { id: 'blockchain', name: 'Blockchain & Trust' },
  { id: 'future-of-work', name: 'Future of Work' },
  { id: 'society', name: 'Society & AI' },
  { id: 'psychology', name: 'AI & Psychology' },
  { id: 'strategy', name: 'AI Strategy' }
];

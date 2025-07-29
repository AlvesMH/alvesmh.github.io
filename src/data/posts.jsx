import MarkdownRenderer from "../components/MarkdownRenderer";

export const POSTS = [
  {
    id: 1,
    slug: "ai_economic_playbook",
    title: 'The AI Economy: New Rules for a New Game',
    excerpt:
      'How artificial intelligence is rewriting the economic playbook, transforming productivity, investment, and global competitiveness.',
    category: 'Management',
    date: '2025-07-01',
    readTime: '10 min read',
    tags: ['Management'],
  },
  {
    id: 2,
    slug: "superintelligence_growth_challenges",
    title: 'Superintelligence: Promise or Peril?',
    excerpt:
      'Examining the extraordinary economic growth AI could unlock—and the societal challenges of adapting to rapid technological change.',
    category: 'Future-of-Work',
    date: '2025-06-20',
    readTime: '12 min read',
    tags: ['Future-of-Work'],
  },
  {
    id: 3,
    slug: "What_is_Neuro‑Symbolic_AI_and_Why_We_Badly_Need_It",
    title: 'AI and the Great Divide',
    excerpt:
      "Why artificial intelligence could intensify economic disparities, creating a stark divide between AI 'haves' and 'have-nots'.",
    category: 'Education',
    date: '2025-06-10',
    readTime: '8 min read',
    tags: ['Education'],
  },
  {
    id: 4,
    slug: "hinton_humanizing_ai",
    title: 'Humanizing Machines: A Conversation with Geoffrey Hinton',
    excerpt:
      'Insights from AI pioneer Geoffrey Hinton on how machine learning mirrors human cognition, reshaping our understanding of intelligence.',
    category: 'Society',
    date: '2025-05-30',
    readTime: '15 min read',
    tags: ['Society'],
  },
  {
    id: 5,
    slug: "understanding-react-hooks",
    title: "Productivity Renaissance: AI's Next Frontier",
    excerpt:
      "Exploring how generative AI tools are boosting productivity, reshaping labor markets, and redefining economic potential.",
    category: 'Management',
    date: '2025-05-15',
    readTime: '9 min read',
    tags: ['Management', 'Future-of-Work'],
  },
  {
    id: 6,
    slug: "understanding-react-hooks",
    title: "Blockchain's Invisible Revolution",
    excerpt:
      "Beyond cryptocurrencies, blockchain's transformative impact on trust, transparency, and efficiency in global markets.",
    category: 'Society',
    date: '2025-05-01',
    readTime: '11 min read',
    tags: ['Society'],
  },
  {
    id: 7,
    slug: "understanding-react-hooks",
    title: 'AI, Aging, and the Future of Work',
    excerpt:
      'How automation and intelligent technology can address aging demographics, altering workplace dynamics and retirement.',
    category: 'Future-of-Work',
    date: '2025-04-20',
    readTime: '10 min read',
    tags: ['Management', 'Future-of-Work'],
  },
  {
    id: 8,
    slug: "understanding-react-hooks",
    title: 'Democratizing Intelligence or Accelerating Inequality?',
    excerpt:
      'Assessing whether AI technologies can truly democratize opportunity, or if they inevitably reinforce existing social stratifications.',
    category: 'Education',
    date: '2025-04-05',
    readTime: '9 min read',
    tags: ['Education'],
  },
  {
    id: 9,
    slug: "understanding-react-hooks",
    title: 'Mind Over Machines: Psychological Impacts of AI Integration',
    excerpt:
      'Understanding how increasing AI presence affects human psychology, relationships, and societal values.',
    category: 'Society',
    date: '2025-03-25',
    readTime: '8 min read',
    tags: ['Education', 'Society'],
  },
  {
    id: 10,
    slug: "understanding-react-hooks",
    title: 'Strategizing for an AI-Driven Future',
    excerpt:
      'Key strategies businesses must adopt today to leverage AI, mitigate disruption, and thrive in a rapidly evolving technological landscape.',
    category: 'Management',
    date: '2025-03-10',
    readTime: '12 min read',
    tags: ['Management', 'Future-of-Work'],
  },
];

export const CATEGORIES = [
  { id: 'all', name: 'All Posts' },
  { id: 'management', name: 'Management' },
  { id: 'education', name: 'Education' },
  { id: 'future-of-work', name: 'Future-of-Work' },
  { id: 'society', name: 'Society' },
];

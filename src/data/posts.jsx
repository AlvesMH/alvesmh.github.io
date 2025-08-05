import MarkdownRenderer from "../components/MarkdownRenderer";

export const POSTS = [
  {
    id: 1,
    slug: "pedagogy-of-prompting",
    title: "The Pedagogy of Prompting: Teaching Students to Think with AI",
    excerpt:
      "Prompting is fast becoming a new literacy. In this post, I explore how we can teach students not just to use GenAI tools, but to engage them critically—turning passive consumption into active, reflective learning.",
    category: "Education",
    date: "2025-08-01",
    readTime: "7 min read",
    tags: ["Education", "AI-Literacy"],
  },
  {
    id: 2,
    slug: "from-offloading-to-augmentation",
    title: "From Offloading to Augmentation: Reclaiming Cognitive Work in the Age of AI",
    excerpt:
      "When does using AI become a shortcut—and when does it become a catalyst for deeper thinking? I unpack the psychology of cognitive offloading and share strategies for designing AI workflows that support, rather than supplant, human thought.",
    category: "Education",
    date: "2025-07-11",
    readTime: "8 min read",
    tags: ["Education", "Cognition"],
  },
  {
    id: 3,
    slug: "rag-for-research",
    title: "RAG for Research: A Step-by-Step Guide to Retrieval-Augmented Generation Pipelines",
    excerpt:
      "Retrieval-Augmented Generation (RAG) combines the power of LLMs with trusted sources. This hands-on guide walks through how to build a basic RAG pipeline for academic research, using open-source tools and curated datasets.",
    category: "Management",
    date: "2025-06-25",
    readTime: "10 min read",
    tags: ["RAG", "Research", "Technical"],
  },
  {
    id: 4,
    slug: "flipped-classroom-ai",
    title: "The Flipped Classroom Gets an Upgrade: Using GenAI for Deeper Learning",
    excerpt:
      "How can GenAI transform the flipped classroom model? I share real-world implementations, including Socratic bots, instant feedback loops, and personalized study pathways that enhance active learning and classroom engagement.",
    category: "Education",
    date: "2025-06-03",
    readTime: "9 min read",
    tags: ["Education", "Flipped-Learning"],
  },
  {
    id: 5,
    slug: "beyond-the-syllabus",
    title: "Beyond the Syllabus: How AI is Changing What (and How) We Teach",
    excerpt:
      "As AI reshapes knowledge work, higher education must evolve. This post explores what skills matter most in an AI-infused world—curation, synthesis, judgment—and how educators can respond with agile, adaptive curricula.",
    category: "Education",
    date: "2025-04-25",
    readTime: "8 min read",
    tags: ["Education", "Curriculum"],
  },
  {
    id: 6,
    slug: "coding-with-purpose",
    title: "Coding with Purpose: How I Use Python to Build Intelligent Learning Tools",
    excerpt:
      "A behind-the-scenes look at how I design and build automation scripts, dashboards, and GPT-integrated tools to simplify academic workflows and support deeper student engagement.",
    category: "Management",
    date: "2025-03-05",
    readTime: "7 min read",
    tags: ["Automation", "Dashboards"],
  },
  {
    id: 7,
    slug: "co-thinking-model",
    title: "Co-Thinking with Machines: A New Model for Human–AI Collaboration",
    excerpt:
      "Most AI tools today are task-focused. But what if they could be idea partners? I propose a model for co-thinking with LLMs—one where machines ask better questions, not just give better answers.",
    category: "Society",
    date: "2025-01-30",
    readTime: "7 min read",
    tags: ["AI-Philosophy", "Cognition"],
  },
  {
    id: 8,
    slug: "ethical-genai-framework",
    title: "A Framework for Ethical GenAI in Higher Education",
    excerpt:
      "As universities race to adopt GenAI tools, we must ask: what are our ethical guardrails? I share a practical framework for educators and institutions to deploy GenAI responsibly—balancing innovation, transparency, and student agency.",
    category: "Education",
    date: "2024-12-26",
    readTime: "9 min read",
    tags: ["Ethics", "Policy"],
  },
  {
    id: 9,
    slug: "learning-analytics-genai",
    title: "Learning Analytics + GenAI: Building Dashboards that Actually Help",
    excerpt:
      "Data-rich but insight-poor? I show how intelligent dashboards, powered by GPT and contextual retrieval, can turn learning data into actionable insights—for both students and educators.",
    category: "Education",
    date: "2024-11-20",
    readTime: "8 min read",
    tags: ["Analytics", "Dashboards"],
  },
  {
    id: 10,
    slug: "ai-aging-future-capability",
    title: "AI, Aging, and the Future of Human Capability",
    excerpt:
      "How will AI intersect with demographic trends like aging societies? This essay explores how augmented intelligence can extend human capability later in life—and what it means for education, labor, and social cohesion.",
    category: "Society",
    date: "2024-08-10",
    readTime: "9 min read",
    tags: ["Society", "Aging", "Futures"],
  },
  {
    id: 11,
    slug: "slow-thinking-fast-ai",
    title: "Teaching Slow Thinking in a Fast AI World",
    excerpt:
      "GenAI encourages rapid, polished answers—but education is about learning to think, not just respond. This post explores how we can help students build “System 2” habits of deliberate analysis, skepticism, and reflection in a world increasingly shaped by fluent AI.",
    category: "Education",
    date: "2024-06-19",
    readTime: "8 min read",
    tags: ["Critical-Thinking", "Psychology"],
  },
  {
    id: 12,
    slug: "calculator-problem-genai",
    title: "The Calculator Problem, Revisited: What AI in Education Gets Wrong",
    excerpt:
      "The calculator changed math education. Now GenAI is poised to do the same for writing, reasoning, and creativity. But unless we explicitly teach how and when to think beyond the tool, we risk turning students into prompt engineers rather than independent thinkers.",
    category: "Education",
    date: "2024-05-30",
    readTime: "7 min read",
    tags: ["Pedagogy", "Cognitive-Offloading"],
  },
  {
    id: 13,
    slug: "chatbot-to-cognitive-partner",
    title: "From Chatbot to Cognitive Partner: Reframing GenAI’s Role in the Classroom",
    excerpt:
      "When used well, GenAI can be more than a shortcut—it can challenge, provoke, and co-create with learners. This post outlines principles for transforming LLMs into thinking partners that encourage depth over fluency and inquiry over convenience.",
    category: "Education",
    date: "2024-03-29",
    readTime: "9 min read",
    tags: ["GenAI", "Teaching-Tools"],
  },
  {
    id: 14,
    slug: "deliberate-thinking-genai",
    title: "Deliberate Thinking in the Age of Instant Output",
    excerpt:
      "Fluency is not the same as understanding. Drawing on recent research from the National Institute of Education, this post explores practices that help students refine AI responses, evaluate their reasoning, and incorporate cultural or ethical nuance.",
    category: "Education",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Slow-Thinking", "Education"],
  },
  {
    id: 15,
    slug: "ai-literacy-guiding-principles",
    title: "Guiding Principles for AI Literacy in Universities",
    excerpt:
      "If students are going to use GenAI, we need to teach them how to use it well. This post proposes five guiding principles for responsible AI integration in higher education—rooted in pedagogy, ethics, and the cultivation of slow, structured thinking.",
    category: "Education",
    date: "2023-12-05",
    readTime: "7 min read",
    tags: ["AI-Literacy", "Ethics", "Teaching"],
  },
];

export const CATEGORIES = [
  { id: 'all', name: 'All Posts' },
  { id: 'education', name: 'Education' },
  { id: 'management', name: 'Management' },
  { id: 'society', name: 'Society' },
];


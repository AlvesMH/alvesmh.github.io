import MarkdownRenderer from "../components/MarkdownRenderer";

export const POSTS = [
  {
  id: 1,
    slug: "redesigning-undergraduate-education",
    title: "Redesigning Undergraduate Education for an AI-Augmented World",
    excerpt:
      "Higher education is facing a structural contradiction: faculty report growing concern that generative AI accelerates cheating and weakens critical thinking, while simultaneously acknowledging that many graduates are not prepared to use AI effectively in the workplace. This gap is amplified by “shadow pedagogy,” where students learn AI practices informally through peers and social media rather than through structured curricula. This post proposes a research-aligned redesign of undergraduate learning around four mutually reinforcing pillars—Problem-Based Learning (PBL), trial-and-error exploration and sense-making, AI augmentation, and critical thinking.",
    category: "Education",
    date: "2025-12-30",
    readTime: "8 min read",
    tags: ["AI-Literacy", "Society" , "Curriculum"],
  },
  {
  id: 2,
    slug: "transformative-education-ai-future",
    title: "The False Comfort of “AI Literacy” in Higher Education",
    excerpt:
      "AI literacy alone is insufficient for preparing undergraduates in a generative AI world. As text and content production become cheap, the real educational challenge shifts to cultivating judgement, reasoning, and responsibility.",
    category: "Education",
    date: "2025-12-30",
    readTime: "8 min read",
    tags: ["Management", "Society"],
  },
  {
  id: 3,
    slug: "future_of_work_and_worth",
    title: "“Work, Wealth, and Worth in the Age of AI",
    excerpt:
      "If we want an AI economy that delivers both comfort and fulfillment, we must confront the structural flaws in how we prepare, employ, and reward people. Policy that still taxes yesterday’s value, HR that manages yesterday’s jobs, and education that teaches yesterday’s tasks will waste what AI makes possible.",
    category: "Society",
    date: "2025-08-12",
    readTime: "10 min read",
    tags: ["Education", "Management"],
  },
  {
    id: 4,
    slug: "why_genai_literacy_new_entry_level_skill",
    title: "“Mediocre Expertise” Will Be Automated Away",
    excerpt:
      "Generative AI is reshaping the job market, wiping out many entry-level roles while rewarding specialised expertise. What remains valuable is specialised, adaptive expertise — the kind that can be amplified by generative AI, not replaced by it.",
    category: "Management",
    date: "2025-08-09",
    readTime: "7 min read",
    tags: ["Education"],
  },
  {
    id: 5,
    slug: "prompting_science",
    title: "The Pedagogy of Prompting: Teaching Students to Think with AI",
    excerpt:
      "Prompting is fast becoming a new literacy. In this post, I explore how we can teach students not just to use GenAI tools, but to engage them critically—turning passive consumption into active, reflective learning.",
    category: "Education",
    date: "2025-08-01",
    readTime: "8 min read",
    tags: ["AI-Literacy"],
  },
  {
    id: 6,
    slug: "offloading_to_augmentation",
    title: "From Offloading to Augmentation: Reclaiming Cognitive Work in the Age of AI",
    excerpt:
      "When does using AI become a shortcut—and when does it become a catalyst for deeper thinking? I unpack the psychology of cognitive offloading and share strategies for designing AI workflows that support, rather than supplant, human thought.",
    category: "Education",
    date: "2025-07-11",
    readTime: "8 min read",
    tags: ["Cognition"],
  },
  {
    id: 7,
    slug: "flipped_classroom",
    title: "The Flipped Classroom Gets an Upgrade: Using GenAI for Deeper Learning",
    excerpt:
      "How can GenAI transform the flipped classroom model? I share real-world implementations, including Socratic bots, instant feedback loops, and personalized study pathways that enhance active learning and classroom engagement.",
    category: "Education",
    date: "2025-06-03",
    readTime: "9 min read",
    tags: ["Flipped-Learning"],
  },
  {
    id: 8,
    slug: "beyond-the-syllabus",
    title: "Beyond the Syllabus: How AI is Changing What (and How) We Teach",
    excerpt:
      "As AI reshapes knowledge work, higher education must evolve. This post explores what skills matter most in an AI-infused world—curation, synthesis, judgment—and how educators can respond with agile, adaptive curricula.",
    category: "Education",
    date: "2025-04-25",
    readTime: "8 min read",
    tags: ["Curriculum"],
  },
  {
    id: 9,
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
    id: 10,
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
    id: 11,
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


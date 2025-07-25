import React from "react";
import ReactMarkdown from "react-markdown"; 
import MarkdownRenderer from "../components/MarkdownRenderer";

export const POSTS = [
  {
    id: 1,
    title: 'Understanding React Hooks in Depth',
    excerpt:
      'A comprehensive guide to React Hooks, covering useState, useEffect, and custom hooks with practical examples.',
    category: 'technical',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['React', 'JavaScript', 'Frontend'],
    component: React.lazy(() =>
      import("../posts/understanding-react-hooks.md?raw").then((m) => ({
        default: () => <MarkdownRenderer source={m.default} />,
      }))
    ),
  },
  {
    id: 2,
    title: 'The Future of Web Development',
    excerpt:
      "Exploring emerging trends in web development and how they're shaping the future of the internet.",
    category: 'thoughts',
    date: '2024-01-10',
    readTime: '6 min read',
    tags: ['Web Dev', 'Trends', 'Technology']
  },
  {
    id: 3,
    title: 'Machine Learning Basics for Developers',
    excerpt:
      'An introduction to machine learning concepts tailored for software developers with no prior ML experience.',
    category: 'technical',
    date: '2024-01-05',
    readTime: '12 min read',
    tags: ['ML', 'AI', 'Python']
  },
  {
    id: 4,
    title: 'Building a Personal Brand in Tech',
    excerpt:
      'Strategies for establishing yourself in the tech industry through consistent content creation and networking.',
    category: 'career',
    date: '2023-12-28',
    readTime: '7 min read',
    tags: ['Career', 'Branding', 'Networking']
  },
  {
    id: 5,
    title: 'CSS Grid vs Flexbox: When to Use What',
    excerpt:
      'A practical comparison of CSS Grid and Flexbox with real-world examples and use cases.',
    category: 'technical',
    date: '2023-12-20',
    readTime: '10 min read',
    tags: ['CSS', 'Frontend', 'Design']
  },
  {
    id: 6,
    title: 'The Art of Code Review',
    excerpt:
      'Best practices for conducting effective code reviews that improve code quality and team collaboration.',
    category: 'career',
    date: '2023-12-15',
    readTime: '9 min read',
    tags: ['Code Review', 'Teamwork', 'Quality']
  },
  {
    id: 7,
    title: 'Academic Research in Computer Science',
    excerpt:
      'My journey through academic research and the lessons learned from publishing my first paper.',
    category: 'academic',
    date: '2023-12-10',
    readTime: '15 min read',
    tags: ['Research', 'Academia', 'Publishing']
  },
  {
    id: 8,
    title: 'Balancing Work and Personal Projects',
    excerpt:
      'How to manage your time effectively between professional responsibilities and passion projects.',
    category: 'thoughts',
    date: '2023-12-05',
    readTime: '6 min read',
    tags: ['Productivity', 'Time Management', 'Projects']
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Posts' },
  { id: 'technical', name: 'Technical' },
  { id: 'academic', name: 'Academic' },
  { id: 'career', name: 'Career' },
  { id: 'thoughts', name: 'Thoughts' }
];
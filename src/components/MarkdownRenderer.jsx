import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import 'katex/dist/katex.min.css';
import "highlight.js/styles/github-dark.css";

const MarkdownRenderer = ({ source }) => (
  <div className="prose lg:prose-lg max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
    >
      {source}
    </ReactMarkdown>
  </div>
);

export default MarkdownRenderer;

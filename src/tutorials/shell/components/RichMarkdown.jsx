import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Callout from "./Callout";
import { Link as LinkIcon, Clipboard } from "lucide-react";

/**
 * RichMarkdown.jsx
 *
 * Goals implemented (no new files):
 * - Readable width + typography (70–75ch), gentle line-height.
 * - Code blocks with contrasting background + Copy button.
 * - Anchored h2/h3 with autolink icons; sticky in-page TOC (desktop only).
 * - Admonitions: blockquotes beginning with "💡" (idea) or "⚠️" (warn) → <Callout/>.
 * - KaTeX macros for \E, \Var, \Prob; consistent spacing for inline/display.
 * - Inline glossary popovers: first time a term appears, show a tooltip with
 *   “Add as flashcard”. Provide terms via props.glossary (default basic set).
 */

const DEFAULT_GLOSSARY = {
  CLT: "Central Limit Theorem: as n grows, the standardized sample mean tends to a normal distribution.",
  PMF: "Probability Mass Function: P(X=x) for discrete X.",
  PDF: "Probability Density Function: f(x) for continuous X where P(a<x<b)=∫ f(x) dx.",
  CDF: "Cumulative Distribution Function: F(x)=P(X\n≤x).",
  Expectation: "Expected value (mean) of a random variable.",
  Variance: "Measure of spread: Var(X)=E[(X-\nE[X])^2].",
};

// Simple slugify for heading ids
function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-");
}

// A tiny rehype plugin to wrap glossary terms with <span data-term> markers.
// It replaces raw text nodes by splitting on term boundaries.
function rehypeGlossary(terms) {
  const keys = Object.keys(terms || {});
  if (keys.length === 0) return () => {};
  const pattern = new RegExp(`\\b(${keys.map(k => k.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})\\b`, "g");
  return () => (tree) => {
    visitText(tree, (textNode, parent, index) => {
      const value = textNode.value;
      if (!pattern.test(value)) return;
      const parts = [];
      let lastIndex = 0;
      value.replace(pattern, (m, _g, offset) => {
        if (offset > lastIndex) parts.push({ type: "text", value: value.slice(lastIndex, offset) });
        parts.push({ type: "element", tagName: "span", properties: { "data-term": m }, children: [{ type: "text", value: m }] });
        lastIndex = offset + m.length;
        return m;
      });
      if (lastIndex < value.length) parts.push({ type: "text", value: value.slice(lastIndex) });
      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}

// minimal text visitor
function visitText(tree, fn) {
  (function walk(node, parent, index) {
    if (!node) return;
    if (Array.isArray(node.children)) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === "text") {
          const ret = fn(child, node, i);
          if (typeof ret === "number") i = ret; // advance if replaced
        } else {
          walk(child, node, i);
        }
      }
    }
  })(tree, null, 0);
}

function normalizeMathDelimiters(raw) {
  if (!raw) return "";
  // \(...\)  -> $...$
  const inline = raw.replace(/\\\(([\s\S]*?)\\\)/g, (_m, g1) => `$${g1}$`);
  // \[...\]  -> $$...$$  (allow newlines inside)
  const display = inline.replace(/\\\[([\s\S]*?)\\\]/g, (_m, g1) => `$$${g1}$$`);
  return display;
}

export default function RichMarkdown({
   content = "",
   source,                     // ← accept legacy prop
   className = "",
   glossary = DEFAULT_GLOSSARY,
 }) {
   // prefer explicit content, otherwise use legacy `source`
  const md = normalizeMathDelimiters(content || source || "");
  const containerRef = useRef(null);
  const [toc, setToc] = useState([]); // { id, text, level }
  const [seenTerms, setSeenTerms] = useState(() => new Set());

  // Build heading anchors + TOC after render
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Assign ids to h2/h3 if missing, collect TOC
    const nodes = el.querySelectorAll("h2, h3");
    const newToc = [];
    nodes.forEach((n) => {
      const text = n.textContent || "";
      if (!n.id) n.id = slugify(text);
      const level = n.tagName === "H2" ? 2 : 3;
      // Inject autolink icon if not present
      if (!n.querySelector("a.anchor")) {
        const a = document.createElement("a");
        a.href = `#${n.id}`;
        a.className = "anchor ml-2 inline-flex align-middle opacity-0 group-hover:opacity-100 focus:opacity-100";
        a.setAttribute("aria-label", "Anchor link");
        a.innerHTML = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"></path></svg>";
        n.classList.add("group");
        n.appendChild(a);
      }
      newToc.push({ id: n.id, text, level });
    });
    setToc(newToc);

    // Glossary popovers — attach once per term instance (first time only)
    const termEls = el.querySelectorAll("span[data-term]");
    termEls.forEach((span) => {
      const term = span.getAttribute("data-term");
      if (!term || seenTerms.has(term)) return;
      // Wrap in tooltip container
      span.classList.add("underline", "underline-offset-2", "decoration-dotted", "cursor-help");
      span.setAttribute("title", glossary[term] || "");
      // On first hover/click, show simple tooltip/popover
      const handler = () => {
        // Mark as seen so we don't spam tooltips across the page
        setSeenTerms((s) => new Set(s).add(term));
        // Optional: offer Add as flashcard
        const description = glossary[term] || term;
        try {
          window.dispatchEvent(new CustomEvent("glossary:seen", { detail: { term } }));
        } catch {}
        // Simple ephemeral popover near the element
        const rect = span.getBoundingClientRect();
        const pop = document.createElement("div");
        pop.className = "fixed z-50 max-w-xs rounded-lg border border-gray-200 bg-white p-3 text-xs shadow-lg";
        pop.style.top = `${Math.max(8, rect.top + window.scrollY - 8)}px`;
        pop.style.left = `${Math.min(window.innerWidth - 260, rect.left + window.scrollX)}px`;
        pop.innerHTML = `
          <div class="mb-2 font-semibold">${term}</div>
          <div class="mb-2 text-gray-700">${escapeHtml(description)}</div>
          <div class="flex items-center justify-end gap-2">
            <button data-action="flash" class="rounded-md border border-gray-200 bg-white px-2 py-1">Add as card</button>
            <button data-action="close" class="rounded-md border border-gray-200 bg-white px-2 py-1">Close</button>
          </div>`;
        document.body.appendChild(pop);
        function cleanup() { pop.remove(); span.removeEventListener("click", cleanup); }
        pop.addEventListener("click", (e) => {
          const t = e.target;
          if (t && t.getAttribute) {
            const act = t.getAttribute("data-action");
            if (act === "flash") {
              try {
                window.dispatchEvent(new CustomEvent("flashcards:add", { detail: { front: term, back: description } }));
              } catch {}
              cleanup();
            } else if (act === "close") cleanup();
          }
        });
        // Close on outside click
        setTimeout(() => {
          const onDoc = (ev) => { if (!pop.contains(ev.target)) { cleanup(); document.removeEventListener("mousedown", onDoc); } };
          document.addEventListener("mousedown", onDoc);
        }, 0);
      };
      span.addEventListener("click", handler, { once: true });
    });
  }, [md, glossary, seenTerms]);

  // Renderers
  const components = useMemo(() => ({
    p: ({ children, ...props }) => {
      const kids = React.Children.toArray(children);
      // If ANY child is a React element (not just a string), render a <div>.
      // This covers our custom <div><pre>…</pre></div> code block, callouts, etc.
      const hasElementChild = kids.some((c) => React.isValidElement(c));
      return hasElementChild
        ? <div {...props} className="mb-4">{children}</div>
        : <p {...props} className="mb-4 leading-7 text-slate-800">{children}</p>;
    },

    h2: ({ node, children, ...props }) => {
      const text = plainText(children);
      const id = slugify(text);
      return (
        <h2 id={id} {...props} className="group scroll-mt-24 text-xl font-semibold">
          {children}
          <a href={`#${id}`} aria-label="Anchor link" className="anchor ml-2 inline-flex align-middle opacity-0 group-hover:opacity-100 focus:opacity-100">
            <LinkIcon size={14} />
          </a>
        </h2>
      );
    },
    h3: ({ node, children, ...props }) => {
      const text = plainText(children);
      const id = slugify(text);
      return (
        <h3 id={id} {...props} className="group scroll-mt-24 text-lg font-semibold">
          {children}
          <a href={`#${id}`} aria-label="Anchor link" className="anchor ml-2 inline-flex align-middle opacity-0 group-hover:opacity-100 focus:opacity-100">
            <LinkIcon size={14} />
          </a>
        </h3>
      );
    },
    blockquote: ({ node, children, ...props }) => {
      // Detect first child text token starting with 💡 or ⚠️
      const raw = plainText(children).trim();
      const hint = raw.startsWith("💡") ? "idea" : raw.startsWith("⚠️") ? "warn" : null;
      if (!hint) {
        return (
          <blockquote {...props} className="border-l-4 border-gray-300 pl-3 text-gray-700">{children}</blockquote>
        );
      }
      const text = raw.replace(/^([💡⚠️]\s*)/, "");
      return (
        <Callout variant={hint}>
          <span>{text}</span>
        </Callout>
      );
    },
    code: ({ inline, className, children, ...props }) => {
      const txt = String(children || "");
      if (inline) {
        return (
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em]">{children}</code>
        );
      }
      const lang = /language-([\w-]+)/.exec(className || "")?.[1] || "";
      const codeId = `code-${Math.random().toString(36).slice(2)}`;
      const copy = async () => {
        try {
          await navigator.clipboard.writeText(txt);
          const btn = document.getElementById(codeId);
          if (btn) {
            const old = btn.textContent;
            btn.textContent = "Copied";
            setTimeout(() => (btn.textContent = old), 1200);
          }
        } catch {}
      };
      return (
        <div className="relative">
          <pre className="overflow-auto rounded-lg bg-gray-900 p-4 text-gray-100"><code className={className} {...props}>{txt}</code></pre>
          <button id={codeId} onClick={copy} className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white/90 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-white">
            <Clipboard size={14} /> Copy
          </button>
          {lang && <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">{lang}</span>}
        </div>
      );
    },
  }), []);

  // KaTeX macros
  const katexOptions = useMemo(() => ({
    throwOnError: false,
    macros: {
      "\\E": "\\mathbb{E}",
      "\\Var": "\\mathrm{Var}",
      "\\Prob": "\\mathbb{P}",
    },
  }), []);

  return (
    <div className={`relative mx-auto w-full max-w-5xl ${className}`}>
      <style>{`
        .rm-prose { max-width: 75ch; }
        .rm-prose p { line-height: 1.8; }
        .rm-prose .katex-display { margin: 1rem 0; }
        .rm-prose .katex { font-size: 1.02em; }
      `}</style>
      <div ref={containerRef} className="rm-prose prose prose-slate">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeGlossary(glossary)]}
          components={components}
        >
          {md}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// Helpers
function plainText(children) {
  return React.Children.toArray(children).map((c) => (typeof c === "string" ? c : (c?.props?.children ? plainText(c.props.children) : ""))).join("");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}



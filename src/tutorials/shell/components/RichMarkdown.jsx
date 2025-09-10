// src/tutorials/shell/components/RichMarkdown.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import renderMathInElement from "katex/dist/contrib/auto-render.mjs";
import "katex/dist/katex.min.css";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Link as LinkIcon, Clipboard } from "lucide-react";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

/* -------------------------- Glossary (optional) -------------------------- */
const DEFAULT_GLOSSARY = {
  CLT: "Central Limit Theorem: as n grows, the standardized sample mean tends to a normal distribution.",
  PMF: "Probability Mass Function: P(X=x) for discrete X.",
  PDF: "Probability Density Function: f(x) for continuous X where P(a<x<b)=∫ f(x) dx.",
  CDF: "Cumulative Distribution Function: F(x)=P(X≤x).",
  Expectation: "Expected value (mean) of a random variable.",
  Variance: "Measure of spread: Var(X)=E[(X- E[X])^2].",
};

/* ------------------------------- Utilities ------------------------------- */
function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-");
}

function visitText(tree, fn) {
  (function walk(node) {
    if (!node) return;
    if (Array.isArray(node.children)) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child?.type === "text") {
          const ret = fn(child, node, i);
          if (typeof ret === "number") i = ret;
        } else {
          walk(child);
        }
      }
    }
  })(tree);
}

function rehypeGlossary(terms) {
  const keys = Object.keys(terms || {});
  if (keys.length === 0) return () => {};
  const esc = (s) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const pattern = new RegExp(`\\b(${keys.map(esc).join("|")})\\b`, "g");
  return () => (tree) => {
    visitText(tree, (textNode, parent, index) => {
      const value = textNode.value;
      if (!pattern.test(value)) return;
      const parts = [];
      let lastIndex = 0;
      value.replace(pattern, (m, _g, offset) => {
        if (offset > lastIndex) parts.push({ type: "text", value: value.slice(lastIndex, offset) });
        parts.push({
          type: "element",
          tagName: "span",
          properties: { "data-term": m },
          children: [{ type: "text", value: m }],
        });
        lastIndex = offset + m.length;
        return m;
      });
      if (lastIndex < value.length) parts.push({ type: "text", value: value.slice(lastIndex) });
      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}

// Allow \(...\) and \[...\] to work by mapping to $...$ / $$...$$
function normalizeMathDelimiters(raw) {
  if (!raw) return "";
  const inline = raw.replace(/\\\(([\s\S]*?)\\\)/g, (_m, g1) => `$${g1}$`);
  const display = inline.replace(/\\\[([\s\S]*?)\\\]/g, (_m, g1) => `$$${g1}$$`);
  return display;
}

// Grab plain text from possible nested children (for anchors / detection)
function plainText(children) {
  return React.Children.toArray(children)
    .map((c) => (typeof c === "string" ? c : c?.props?.children ? plainText(c.props.children) : ""))
    .join("");
}

/* ----------------------------- Main component ---------------------------- */
const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "details", "summary"],
  attributes: {
    ...defaultSchema.attributes,
    details: [["open"], ["className"]],
    summary: [["className"]],
  },
};

export default function RichMarkdown({
  children,
  content = "",
  source, // legacy
  className = "",
  glossary = DEFAULT_GLOSSARY,
}) {
  
  // Prefer explicit content/source; otherwise fall back to children (string or flattened text)
  const rawMd =
    (typeof content === "string" && content) ||
    (typeof source === "string" && source) ||
    (typeof children === "string" ? children : plainText(children));
  const md = normalizeMathDelimiters(rawMd);

  const containerRef = useRef(null);
  const [toc, setToc] = useState([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const nodes = el.querySelectorAll("h2, h3");
    const next = [];
    nodes.forEach((n) => {
      const text = n.textContent || "";
      if (!n.id) n.id = slugify(text);
      if (!n.querySelector("a.anchor")) {
        const a = document.createElement("a");
        a.href = `#${n.id}`;
        a.className =
          "anchor ml-2 inline-flex align-middle opacity-0 group-hover:opacity-100 focus:opacity-100";
        a.setAttribute("aria-label", "Anchor link");
        a.innerHTML =
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
        n.classList.add("group");
        n.appendChild(a);
      }
      next.push({ id: n.id, text, level: n.tagName === "H2" ? 2 : 3 });
    });
    setToc(next);
  }, [md]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    try {
      renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$",  right: "$",  display: false },
        ],
        throwOnError: false,
      });
    } catch {
      // ignore render errors so the page never freezes
    }
  }, [md]);

  /* ---------------------------- MD renderers ---------------------------- */
  const components = useMemo(
    () => ({
      p: ({ children, ...props }) => {
        const kids = React.Children.toArray(children);
        const hasElementChild = kids.some((c) => React.isValidElement(c));
        return hasElementChild ? (
          <div {...props} className="my-2 rounded border border-slate-200 p-3 bg-white/50">
            {children}
          </div>
        ) : (
          <p {...props} className="cursor-pointer font-medium select-none">
            {children}
          </p>
        );
      },

      h2: ({ children, ...props }) => {
        const text = plainText(children);
        const id = slugify(text);
        return (
          <h2 id={id} {...props} className="group scroll-mt-24 text-xl font-semibold">
            {children}
            <a
              href={`#${id}`}
              aria-label="Anchor link"
              className="anchor ml-2 inline-flex align-middle opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <LinkIcon size={14} />
            </a>
          </h2>
        );
      },

      h3: ({ children, ...props }) => {
        const text = plainText(children);
        const id = slugify(text);
        return (
          <h3 id={id} {...props} className="group scroll-mt-24 text-lg font-semibold">
            {children}
            <a
              href={`#${id}`}
              aria-label="Anchor link"
              className="anchor ml-2 inline-flex align-middle opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <LinkIcon size={14} />
            </a>
          </h3>
        );
      },

      blockquote: ({ node, children, ...props }) => {
        // Idea/warning shorthand with emojis at the very start
        const raw = (plainText(children) || "").trimStart();
        const isIdea = /^💡/.test(raw);
        const isWarn = /^⚠️/.test(raw);
        if (!isIdea && !isWarn) {
          return (
            <blockquote {...props} className="border-l-4 border-gray-300 pl-3 text-gray-700">
              {children}
            </blockquote>
          );
        }

        // Remove the leading emoji from the first paragraph, keep KaTeX / formatting intact
        const body = (() => {
          const arr = React.Children.toArray(children);
          if (!arr.length) return arr;
          const first = arr[0];
          if (React.isValidElement(first) && first.type === "p") {
            const pk = React.Children.toArray(first.props.children);
            if (typeof pk[0] === "string") {
              pk[0] = pk[0].replace(/^([💡⚠️]\s*)/, "");
              arr[0] = React.cloneElement(first, {}, ...pk);
            }
          }
          return arr;
        })();

        const theme = isIdea
          ? { bg: "bg-violet-50", border: "border-violet-200", title: "Key idea" }
          : { bg: "bg-amber-50", border: "border-amber-200", title: "Warning" };

        return (
          <aside className={`w-full rounded-xl border ${theme.border} ${theme.bg} p-4`}>
            <div className="mb-1 text-sm font-semibold">{theme.title}</div>
            <div className="text-sm leading-6 text-gray-800">{body}</div>
          </aside>
        );
      },

      code: ({ inline, className, children, ...props }) => {
        const txt = String(children || "");
        if (inline) {
          return <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em]">{children}</code>;
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
            <pre className="overflow-auto rounded-lg bg-gray-900 p-4 text-gray-100">
              <code className={className} {...props}>
                {txt}
              </code>
            </pre>
            <button
              id={codeId}
              onClick={copy}
              className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white/90 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-white"
            >
              <Clipboard size={14} /> Copy
            </button>
            {lang && (
              <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                {lang}
              </span>
            )}
          </div>
        );
      },
    }),
    []
  );

  const katexOptions = useMemo(
    () => ({
      throwOnError: false,
      macros: {
        "\\E": "\\mathbb{E}",
        "\\Var": "\\mathrm{Var}",
        "\\Prob": "\\mathbb{P}",
      },
    }),
    []
  );

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
          rehypePlugins={[
            rehypeRaw,                        // allow raw HTML
            [rehypeSanitize, schema],         // keep it safe, but allow details/summary
            [rehypeKatex, katexOptions],      // render math
            rehypeGlossary(glossary),
          ]}

          components={components}
        >
          {md}
        </ReactMarkdown>
      </div>
    </div>
  );
}

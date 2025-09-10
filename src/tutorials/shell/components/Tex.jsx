import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

/** Inline/Block KaTeX for JSX (no markdown needed) */
export default function Tex({ children, block = false, size = "sm", className = "" }) {
  const html = React.useMemo(() => {
    const s = typeof children === "string" ? children : String(children ?? "");
    return katex.renderToString(s, { displayMode: block, throwOnError: false });
  }, [children, block]);

  // size: "xs" ≈0.85em, "sm" ≈0.92em, default 1em
  const sizeClass = size === "xs" ? "text-[0.85em]" : size === "sm" ? "text-[0.92em]" : "";

  const Tag = block ? "div" : "span";
  return (
    <Tag
      className={`${block ? "katex-display" : "katex"} ${sizeClass} align-middle ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

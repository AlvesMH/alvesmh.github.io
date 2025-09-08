import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";

/**
 * Foundations.jsx — sequential lesson page
 *
 * - Loads markdown content from ./foundations.md (co-located with this file)
 * - Builds a sticky "On This Page" TOC from rendered headings
 * - Shows flashcards at the bottom
 * - Provides Next/Previous nav + a dedicated Quiz route CTA
 * - Responsive: two columns (content + TOC) on large screens, single column on mobile
 * - No progress/memory features (static site-friendly)
 */

export default function Foundations() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown (Vite raw import)
  useEffect(() => {
    let mounted = true;
    import("./foundations.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => {
        console.error("Failed to load foundations.md", err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Observe rendered content to extract H2/H3 headings for the TOC (ids are added by RichMarkdown)
  useEffect(() => {
    if (!contentWrapRef.current) return;
    const el = contentWrapRef.current;

    const buildToc = () => {
      const nodes = Array.from(el.querySelectorAll("h2, h3"));
      const items = nodes.map((n) => ({
        id: n.id || "",
        text: n.textContent || "",
        level: n.tagName === "H2" ? 2 : 3,
      }));
      setToc(items);
    };

    buildToc();
    const obs = new MutationObserver(buildToc);
    obs.observe(el, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [md]);

  // Smooth scroll for TOC links
  function handleTocClick(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  }

  // Foundations flashcards (concise essentials)
  const flashcards = useMemo(
    () => [
      { front: "Complement rule", back: "P(A^c) = 1 − P(A)" },
      { front: "Inclusion–exclusion (2 sets)", back: "P(A∪B)=P(A)+P(B)−P(A∩B)" },
      { front: "Conditional probability", back: "P(A|B)=P(A∩B)/P(B), if P(B)>0" },
      { front: "Independence", back: "A ⟂ B iff P(A∩B)=P(A)P(B)" },
      { front: "Law of total probability", back: "P(A)=∑ P(A|B_i)P(B_i) for a partition {B_i}" },
      { front: "Bayes’ theorem", back: "P(B_i|A)= P(A|B_i)P(B_i) / ∑_j P(A|B_j)P(B_j)" },
      { front: "Linearity of expectation", back: "E[aX+bY+c]=aE[X]+bE[Y]+c" },
      { front: "Variance identity", back: "Var(X)=E[X^2]−(E[X])^2" },
      { front: "Discrete vs continuous", back: "pmf p(x) vs pdf f(x); cdf F(x)=P(X≤x)" },
    ],
    []
  );

  return (
    <>
      {/* Top header with breadcrumbs + Back to Blog / All Tutorials */}
      <AppHeaderMini
        tutorialSlug="introduction-to-probability-distribution"
        sectionId="foundations"
        sectionTitle="Foundations"
      />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Title strip (optional; H1 is also in the markdown) */}
        <div className="py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Foundations of Probability
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Axioms and event algebra, conditional probability & independence, Bayes’ theorem, counting,
            and random variables & moments.
          </p>
        </div>

        {/* Responsive content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article
            ref={contentWrapRef}
            className="min-w-0"
          >
            {/* RichMarkdown renders headings with ids; it also supports KaTeX, admonitions, code copy, etc. */}
            <RichMarkdown content={md} />
          </article>

          {/* On This Page (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                On this page
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "ml-3" : ""}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleTocClick(e, item.id)}
                      className="text-slate-700 hover:text-slate-900 hover:underline"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <button
                  onClick={() => window.print()}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  title="Open print dialog (you can save as PDF)"
                >
                  Print / Save as PDF
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Flashcards */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Quick flashcards</h2>
          <Flashcards deck={flashcards} />
        </section>

        {/* Bottom nav + Quiz CTA */}
        <nav className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Link
              to="/tutorials/introduction-to-probability-distribution"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Overview
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/discrete"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Discrete →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/foundations/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Foundations Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

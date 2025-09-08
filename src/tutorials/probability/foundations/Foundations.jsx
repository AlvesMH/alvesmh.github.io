// src/tutorials/probability/foundations/Foundations.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import mdSource from "./foundations.md?raw";

import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";
import OnThisPageAside from "../../shell/components/OnThisPageAside";

export default function Foundations() {
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]
  const md = mdSource;

  // Build the TOC from rendered headings (ids are added inside RichMarkdown)
  useEffect(() => {
    const el = contentWrapRef.current;
    if (!el) return;

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

  // Smooth-scroll when clicking TOC links (optional; OnThisPageAside also handles this)
  const onTocClick = (e, id) => {
    e.preventDefault();
    const t = document.getElementById(id);
    if (t) {
      t.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <AppHeaderMini
        tutorialSlug="introduction-to-probability-distribution"
        sectionTitle="Foundations"
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 lg:pt-14">
        {/* Top breadcrumbs / actions */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <nav className="text-sm text-slate-600">
            <Link to="/tutorials" className="hover:underline">
              All Tutorials
            </Link>{" "}
            /{" "}
            <Link
              to="/tutorials/introduction-to-probability-distribution"
              className="hover:underline"
            >
              Probability
            </Link>{" "}
            / <span className="font-medium text-slate-900">Foundations</span>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/blog"
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Back to Blog
            </Link>
            <button
              onClick={() => window.print()}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
              title="Print or Save as PDF"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>

        {/* Two-column layout (content + sidebar) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <h1 className="mb-2 text-2xl font-bold tracking-tight">Foundations</h1>
            <p className="text-slate-600">
              Start here: probability spaces, events, rules, expectation, variance, and notation.
            </p>

            {/* Markdown */}
            <RichMarkdown
              content={md}
              // If your images are served from public/, set an imgBase (and keep ./images/... in the .md)
              // imgBase="/tutorials/introduction-to-probability-distribution/foundations"
            />

            {/* Flashcards */}
            <section aria-labelledby="flashcards-title" className="mt-8">
              <h2 id="flashcards-title" className="text-xl font-semibold">
                Quick Flashcards
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Drill the essentials from this page.
              </p>
              <div className="mt-4">
                <Flashcards
                  initialCards={[
                    {
                      front: "Sample space (Ω)",
                      back: "Set of all possible outcomes of a random experiment.",
                    },
                    {
                      front: "Event",
                      back: "Subset of Ω. A happens if the outcome lies in that subset.",
                    },
                    {
                      front: "Mutual exclusivity",
                      back: "A ∩ B = ∅ → P(A ∪ B) = P(A) + P(B).",
                    },
                    {
                      front: "Total probability",
                      back: "If {B_i} partitions Ω, then P(A)=∑ P(A|B_i)P(B_i).",
                    },
                    {
                      front: "Bayes’ rule",
                      back: "P(A|B) = P(B|A)P(A)/P(B).",
                    },
                  ]}
                />
              </div>
            </section>

            {/* Bottom navigation */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                <Link
                  to="/tutorials/introduction-to-probability-distribution"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  ← Overview
                </Link>
                <Link
                  to="/tutorials/introduction-to-probability-distribution/discrete/bernoulli"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  Next: Bernoulli →
                </Link>
              </div>
              <Link
                to="/tutorials/introduction-to-probability-distribution/foundations/quiz"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Take the Foundations Quiz
              </Link>
            </div>
          </article>

          {/* Single “On This Page” (with Print) */}
          <OnThisPageAside
            toc={toc}
            onClick={onTocClick}
          />
        </div>
      </main>

      <AppFooterMini />
    </div>
  );
}

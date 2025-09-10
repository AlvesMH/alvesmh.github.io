import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";
import Tex from "../../shell/components/Tex";


/**
 * Bernoulli.jsx — lesson page
 *
 * - Loads ./bernoulli.md (co-located) with Vite ?raw
 * - Builds sticky "On This Page" TOC from rendered headings
 * - Includes a lightweight interactive Bernoulli panel (mean/var/pmf)
 * - Flashcards at bottom, Quiz CTA, and Prev/Next navigation
 * - No progress/memory features
 */

export default function Bernoulli() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown content
  useEffect(() => {
    let mounted = true;
    import("./bernoulli.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load bernoulli.md", err));
    return () => {
      mounted = false;
    };
  }, []);

  // Build TOC from rendered headings (ids are assigned by RichMarkdown)
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

  // Smooth-scroll for TOC links
  function handleTocClick(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  }

  // Flashcards for Bernoulli
  const flashcards = useMemo(
    () => [
      { front: "Support of Bernoulli", back: "X ∈ {0,1}" },
      { front: "pmf", back: "P(X=1)=p, P(X=0)=1−p" },
      { front: "Mean", back: "E[X]=p" },
      { front: "Variance", back: "Var(X)=p(1−p)" },
      { front: "Indicator view", back: "X=1_A ⇒ E[X]=P(A)=p" },
      { front: "MGF (bonus)", back: "M_X(t)= (1−p) + p e^t" },
    ],
    []
  );

  return (
    <>
      <AppHeaderMini
        tutorialSlug="introduction-to-probability-distribution"
        sectionId="discrete"
        sectionTitle="Discrete"
      />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Title */}
        <div className="py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bernoulli Distribution
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            The simplest building block: a single success/failure trial with success probability <em>p</em>.
            Understand the pmf, mean, variance, and how Bernoulli underpins Binomial and many indicator arguments.
          </p>
        </div>

        {/* 2-column responsive layout: content + sticky TOC (desktop) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            {/* Markdown lesson */}
            <RichMarkdown content={md} />

            {/* Lightweight interactive panel */}
            <section aria-labelledby="bernoulli-panel" className="space-y-4">
              <h2 id="bernoulli-panel" className="text-xl font-bold text-slate-900">
                Interactive: Explore Bernoulli(p)
              </h2>
              <BernoulliPanel />
            </section>
          </article>

          {/* On This Page */}
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
              to="/tutorials/introduction-to-probability-distribution/foundations"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Foundations
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/discrete/binomial"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Binomial →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/bernoulli/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Bernoulli Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ------------------------- Small Interactive Panel ------------------------ */
function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="metric-label mb-1 text-[13px] leading-5 text-slate-700">{label}</div>
      <div className="tabular-nums font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function BernoulliPanel() {
  const [p, setP] = useState(0.25);

  const pmf0 = useMemo(() => 1 - p, [p]);
  const pmf1 = useMemo(() => p, [p]);
  const mean = useMemo(() => p, [p]);
  const variance = useMemo(() => p * (1 - p), [p]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      {/* scoped styling so only metric labels get tighter math */}
      <style>{`
        .metric-label .katex { line-height: 1.2; }
      `}</style>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="block text-sm font-medium text-slate-700 w-full sm:w-72">
          Success probability <Tex size="sm">{String.raw`p`}</Tex>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className="mt-2 w-full"
            aria-label="Success probability p"
          />
          <div className="mt-1 text-slate-800 tabular-nums">
            <Tex size="sm">{String.raw`p`}</Tex> = {p.toFixed(2)}
          </div>
        </label>

        <div className="grid grid-cols-2 gap-3 text-sm sm:flex-1 sm:grid-cols-4">
          <Metric
            label={<Tex size="sm">{String.raw`\mathbb{P}(X=0)`}</Tex>}
            value={pmf0.toFixed(4)}
          />
          <Metric
            label={<Tex size="sm">{String.raw`\mathbb{P}(X=1)`}</Tex>}
            value={pmf1.toFixed(4)}
          />
          <Metric
            label={<Tex size="sm">{String.raw`\mathbb{E}[X]`}</Tex>}
            value={mean.toFixed(4)}
          />
          <Metric
            label={<Tex size="sm">{String.raw`\mathrm{Var}(X)`}</Tex>}
            value={variance.toFixed(4)}
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-700">
        Recall: for <Tex size="sm">{String.raw`\mathrm{Bernoulli}(p)`}</Tex>, the pmf is{" "}
        <Tex size="sm">{String.raw`\mathbb{P}(X=1)=p`}</Tex> and{" "}
        <Tex size="sm">{String.raw`\mathbb{P}(X=0)=1-p`}</Tex>, with{" "}
        <Tex size="sm">{String.raw`\mathbb{E}[X]=p`}</Tex> and{" "}
        <Tex size="sm">{String.raw`\mathrm{Var}(X)=p(1-p)`}</Tex>.
      </p>
    </div>
  );
}

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";

/**
 * Geometric.jsx — lesson page
 *
 * Conventions in this chapter:
 * - We use the "trials until first success" parameterisation with support {1,2,...}
 * - pmf: P(X=k) = (1-p)^{k-1} p, k=1,2,...
 * - cdf: P(X≤k) = 1 - (1-p)^k
 * - memoryless: P(X>m+n | X>m) = P(X>n)
 */

export default function Geometric() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown content
  useEffect(() => {
    let mounted = true;
    import("./geometric.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load geometric.md", err));
    return () => {
      mounted = false;
    };
  }, []);

  // Build TOC from rendered headings (ids set by RichMarkdown)
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

  // Smooth-scroll TOC links
  function handleTocClick(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  }

  const flashcards = useMemo(
    () => [
      { front: "Support", back: "X ∈ {1,2,…} (trials until first success)" },
      { front: "pmf", back: "P(X=k)=(1−p)^{k−1} p" },
      { front: "cdf", back: "P(X≤k)=1−(1−p)^k" },
      { front: "Tail", back: "P(X>k)=(1−p)^k" },
      { front: "Mean", back: "E[X]=1/p" },
      { front: "Variance", back: "Var(X)=(1−p)/p^2" },
      { front: "Memoryless", back: "P(X>m+n | X>m)=P(X>n)" },
      { front: "NegBin link", back: "Geometric is NegBin(r=1)" },
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
            Geometric Distribution
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Trials until the <em>first</em> success, with success probability <em>p</em> each trial. Learn the pmf, cdf,
            moments, and the hallmark <strong>memoryless</strong> property.
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* Interactive panel */}
            <section aria-labelledby="geometric-panel" className="space-y-4">
              <h2 id="geometric-panel" className="text-xl font-bold text-slate-900">
                Interactive: Explore Geometric(p)
              </h2>
              <GeometricPanel />
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
              to="/tutorials/introduction-to-probability-distribution/discrete/binomial"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Binomial
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/discrete/negative-binomial"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Negative Binomial →
            </Link>
          </div>

        <Link
          to="/tutorials/introduction-to-probability-distribution/discrete/geometric/quiz"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Start Geometric Quiz
        </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ------------------------- Interactive Geometric Panel ------------------------ */
function GeometricPanel() {
  const [p, setP] = useState(0.3);
  const [k, setK] = useState(4);
  const [m, setM] = useState(2);
  const [n, setN] = useState(3);

  useEffect(() => { if (k < 1) setK(1); }, [k]);

  const pmf = useMemo(() => (k >= 1 ? Math.pow(1 - p, k - 1) * p : 0), [p, k]);
  const cdf = useMemo(() => (k >= 1 ? 1 - Math.pow(1 - p, k) : 0), [p, k]);
  const tail = useMemo(() => (k >= 0 ? Math.pow(1 - p, k) : 1), [p, k]); // P(X>k)
  const mean = useMemo(() => (p > 0 ? 1 / p : Infinity), [p]);
  const variance = useMemo(() => (p > 0 ? (1 - p) / (p * p) : Infinity), [p]);

  // Memoryless check: P(X>m+n | X>m) vs P(X>n)
  const tail_m = useMemo(() => Math.pow(1 - p, Math.max(0, m)), [p, m]);
  const tail_mn = useMemo(() => Math.pow(1 - p, Math.max(0, m + n)), [p, m, n]);
  const cond = useMemo(() => (tail_m > 0 ? tail_mn / tail_m : 0), [tail_m, tail_mn]);
  const tail_n = useMemo(() => Math.pow(1 - p, Math.max(0, n)), [p, n]);
  const delta = useMemo(() => Math.abs(cond - tail_n), [cond, tail_n]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-4">
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Success probability p
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className="mt-2 w-full"
          />
          <div className="mt-1 text-slate-800 tabular-nums">p = {p.toFixed(2)}</div>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Target k (P(X=k), P(X≤k))
          <input
            type="number"
            min={1}
            value={k}
            onChange={(e) => setK(Math.max(1, Number(e.target.value) || 1))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-slate-700">
            m (memoryless)
            <input
              type="number"
              min={0}
              value={m}
              onChange={(e) => setM(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            n (memoryless)
            <input
              type="number"
              min={0}
              value={n}
              onChange={(e) => setN(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 text-sm">
        <Metric label="E[X]" value={Number.isFinite(mean) ? mean.toFixed(4) : "∞"} />
        <Metric label="Var(X)" value={Number.isFinite(variance) ? variance.toFixed(4) : "∞"} />
        <Metric label="P(X=k)" value={pmf.toPrecision(4)} />
        <Metric label="P(X≤k)" value={cdf.toPrecision(4)} />
        <Metric label="P(X>k)" value={tail.toPrecision(4)} />
        <Metric label="Memoryless Δ" value={delta.toExponential(2)} hint="|P(X>m+n|X>m)−P(X>n)|" />
      </div>

      <p className="mt-3 text-sm text-slate-700">
        With support starting at 1, the mean is 1/p and the variance is (1−p)/p². The **memoryless** identity makes
        Geometric unique among discrete distributions.
      </p>
    </div>
  );
}

function Metric({ label, value, hint }) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="text-slate-500">
        {label}
        {hint ? <span className="text-slate-400"> ({hint})</span> : null}
      </div>
      <div className="text-slate-900 font-semibold tabular-nums">{value}</div>
    </div>
  );
}
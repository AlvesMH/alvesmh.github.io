import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";

/**
 * Poisson.jsx — lesson page
 *
 * Convention used here:
 * - X = count of events in a fixed interval/region with rate λ (lambda)
 * - pmf: P(X=k) = e^{-λ} λ^k / k!, k = 0,1,2,...
 * - mean λ, variance λ; superposition & thinning properties
 */

export default function Poisson() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown content
  useEffect(() => {
    let mounted = true;
    import("./poisson.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load poisson.md", err));
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

  // Smooth-scroll for TOC links
  function handleTocClick(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  }

  // Flashcards (essentials)
  const flashcards = useMemo(
    () => [
      { front: "Support", back: "k ∈ {0,1,2,…}" },
      { front: "pmf", back: "P(X=k)=e^{-λ} λ^k / k!" },
      { front: "Mean / Var", back: "E[X]=λ, Var(X)=λ" },
      { front: "Binomial limit", back: "n→∞, p→0, np→λ ⇒ Bin(n,p)→Pois(λ)" },
      { front: "Superposition", back: "If X_i~Pois(λ_i) indep ⇒ ΣX_i ~ Pois(Σλ_i)" },
      { front: "Thinning", back: "Keep each event with q ⇒ Pois(λ)→Pois(qλ)" },
      { front: "Poisson process", back: "Inter-arrivals ~ Exponential(λ)" },
      { front: "PGF/MGF (bonus)", back: "MGF: exp(λ(e^t−1))" },
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
            Poisson Distribution
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Counts of events in a fixed interval with average rate <em>λ</em>. Learn the pmf, moments, modelling
            assumptions, and key properties (superposition, thinning, and the link to Poisson processes).
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* Interactive panel */}
            <section aria-labelledby="poisson-panel" className="space-y-4">
              <h2 id="poisson-panel" className="text-xl font-bold text-slate-900">
                Interactive: Explore Poisson(λ)
              </h2>
              <PoissonPanel />
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
              to="/tutorials/introduction-to-probability-distribution/discrete/negative-binomial"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Negative Binomial
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/continuous"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Continuous & CLT →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/poisson/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Poisson Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ------------------------- Interactive Poisson Panel ------------------------ */
function PoissonPanel() {
  const [lambda, setLambda] = useState(3.0);
  const [k, setK] = useState(2);

  useEffect(() => { if (k < 0) setK(0); }, [k]);

  // Exact pmf/cdf via stable recurrence:
  // p0 = e^{-λ}; p_k = p_{k-1} * λ / k
  const p0 = useMemo(() => Math.exp(-lambda), [lambda]);
  const pmf = useMemo(() => {
    if (k === 0) return p0;
    let pk = p0;
    for (let i = 1; i <= k; i++) pk *= lambda / i;
    return pk;
  }, [p0, lambda, k]);

  const cdf = useMemo(() => {
    let s = p0;
    let pk = p0;
    for (let i = 1; i <= k; i++) {
      pk *= lambda / i;
      s += pk;
    }
    return s;
  }, [p0, lambda, k]);

  // Normal approximation with continuity correction (for λ large)
  function stdNormCDF(x) {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    const t = 1 / (1 + p * Math.abs(x));
    const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-x * x);
    return 0.5 * (1 + sign * y);
  }
  const pmfNormal = useMemo(() => {
    const mu = lambda;
    const sig = Math.sqrt(lambda);
    if (!(sig > 0)) return k === Math.round(mu) ? 1 : 0;
    const z1 = ((k + 0.5) - mu) / sig;
    const z0 = ((k - 0.5) - mu) / sig;
    return Math.max(0, stdNormCDF(z1) - stdNormCDF(z0));
  }, [lambda, k]);

  const mean = useMemo(() => lambda, [lambda]);
  const variance = useMemo(() => lambda, [lambda]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block text-sm font-medium text-slate-700">
          Rate λ
          <input
            type="range"
            min="0"
            max="30"
            step="0.1"
            value={lambda}
            onChange={(e) => setLambda(Number(e.target.value))}
            className="mt-2 w-full"
          />
          <div className="mt-1 text-slate-800 tabular-nums">λ = {lambda.toFixed(1)}</div>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Target count k
          <input
            type="number"
            min={0}
            max={150}
            value={k}
            onChange={(e) => setK(Math.max(0, Math.min(150, Number(e.target.value) || 0)))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <div className="hidden md:block" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 text-sm">
        <Metric label="E[X]" value={mean.toFixed(4)} />
        <Metric label="Var(X)" value={variance.toFixed(4)} />
        <Metric label="P(X=k)" value={pmf.toPrecision(4)} />
        <Metric label="P(X≤k)" value={cdf.toPrecision(4)} />
        <Metric label="Normal approx P(X=k)" value={pmfNormal.toPrecision(4)} hint="with continuity" />
      </div>

      <p className="mt-3 text-sm text-slate-700">
        Exact probabilities use the stable recurrence p<sub>k</sub>=p<sub>k−1</sub>·λ/k with p<sub>0</sub>=e<sup>−λ</sup>.
        The Normal approximation improves as λ grows; use continuity correction for better accuracy.
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

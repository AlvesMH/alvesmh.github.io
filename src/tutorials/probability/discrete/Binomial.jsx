import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";

/**
 * Binomial.jsx — lesson page
 *
 * - Loads ./binomial.md (co-located) via Vite ?raw
 * - Builds sticky "On This Page" TOC by reading rendered headings (ids by RichMarkdown)
 * - Includes a compact BinomialPanel for pmf/cdf & quick approximations
 * - Flashcards, Quiz CTA, and Prev/Next navigation
 * - No progress/memory features (static-friendly)
 */

export default function Binomial() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown
  useEffect(() => {
    let mounted = true;
    import("./binomial.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load binomial.md", err));
    return () => {
      mounted = false;
    };
  }, []);

  // Build TOC from rendered headings
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
      { front: "Support of Bin(n,p)", back: "k ∈ {0,1,…,n}" },
      { front: "pmf", back: "P(X=k)=C(n,k)p^k(1−p)^{n−k}" },
      { front: "Mean", back: "E[X]=np" },
      { front: "Variance", back: "Var(X)=np(1−p)" },
      { front: "Normal approx (when?)", back: "np(1−p) large; use continuity" },
      { front: "Poisson approx (when?)", back: "n large, p small, λ=np fixed" },
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
            Binomial Distribution
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Number of successes in <em>n</em> independent Bernoulli(<em>p</em>) trials.
            Learn the pmf, moments, and when Normal or Poisson approximations make sense.
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* Compact interactive panel */}
            <section aria-labelledby="binomial-panel" className="space-y-4">
              <h2 id="binomial-panel" className="text-xl font-bold text-slate-900">
                Interactive: Explore Binomial(n,p)
              </h2>
              <BinomialPanel />
            </section>
          </article>

          {/* On This Page (desktop sidebar) */}
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
              to="/tutorials/introduction-to-probability-distribution/discrete/bernoulli"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Bernoulli
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/discrete/geometric"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Geometric →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/binomial/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Binomial Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ------------------------- Small Interactive Panel ------------------------ */
/* Self-contained helpers (stable binomial + approximations) */
function BinomialPanel() {
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.3);
  const [k, setK] = useState(3);

  // Guard inputs
  useEffect(() => { if (k > n) setK(n); if (k < 0) setK(0); }, [n]);
  useEffect(() => { if (p < 0) setP(0); if (p > 1) setP(1); }, [p]);

  const mean = useMemo(() => n * p, [n, p]);
  const variance = useMemo(() => n * p * (1 - p), [n, p]);

  // Numerically stable log(n choose k)
  const logChoose = useMemo(() => {
    const MAX = Math.max(10000, n + 10);
    const LOGFACT = new Float64Array(Math.max(MAX + 1, 2));
    LOGFACT[0] = 0;
    for (let i = 1; i <= MAX; i++) LOGFACT[i] = LOGFACT[i - 1] + Math.log(i);
    const stirling = (m) => (m <= MAX ? LOGFACT[m] : m * Math.log(m) - m + 0.5 * Math.log(2 * Math.PI * m));
    return (nn, kk) => {
      if (kk < 0 || kk > nn) return -Infinity;
      return stirling(nn) - stirling(kk) - stirling(nn - kk);
    };
  }, [n]);

  const binomPMF = useMemo(() => {
    return (nn, pp, kk) => {
      if (kk < 0 || kk > nn) return 0;
      if (pp === 0) return kk === 0 ? 1 : 0;
      if (pp === 1) return kk === nn ? 1 : 0;
      const logp = logChoose(nn, kk) + kk * Math.log(pp) + (nn - kk) * Math.log(1 - pp);
      return Math.exp(logp);
    };
  }, [logChoose]);

  const binomCDF_LE = useMemo(() => {
    return (nn, pp, kk) => {
      let s = 0;
      for (let i = 0; i <= Math.min(kk, nn); i++) s += binomPMF(nn, pp, i);
      return s;
    };
  }, [binomPMF]);

  // Normal approximation with continuity correction
  function stdNormCDF(x) {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    const t = 1 / (1 + p * Math.abs(x));
    const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-x * x);
    return 0.5 * (1 + sign * y);
  }
  function normalApproxPMF(nn, pp, kk) {
    const mu = nn * pp, sig = Math.sqrt(nn * pp * (1 - pp));
    if (!(sig > 0)) return kk === Math.round(mu) ? 1 : 0;
    // continuity: P(k-0.5 ≤ X ≤ k+0.5)
    const z1 = ((kk + 0.5) - mu) / sig;
    const z0 = ((kk - 0.5) - mu) / sig;
    return Math.max(0, stdNormCDF(z1) - stdNormCDF(z0));
  }

  // Poisson approximation (rare-events) with λ=np
  function poissonPMF(lambda, kk) {
    if (kk < 0) return 0;
    let p0 = Math.exp(-lambda);
    if (kk === 0) return p0;
    let v = p0;
    for (let i = 1; i <= kk; i++) v *= lambda / i;
    return v;
  }

  const pmf = useMemo(() => binomPMF(n, p, k), [n, p, k, binomPMF]);
  const cdf = useMemo(() => binomCDF_LE(n, p, k), [n, p, k, binomCDF_LE]);
  const pmfNormal = useMemo(() => normalApproxPMF(n, p, k), [n, p, k]);
  const pmfPoisson = useMemo(() => poissonPMF(n * p, k), [n, p, k]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block text-sm font-medium text-slate-700">
          Number of trials n
          <input
            type="number"
            min={1}
            max={1000}
            value={n}
            onChange={(e) => setN(Math.max(1, Math.min(1000, Number(e.target.value) || 0)))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
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
          Target count k
          <input
            type="number"
            min={0}
            max={n}
            value={k}
            onChange={(e) => setK(Math.max(0, Math.min(n, Number(e.target.value) || 0)))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <Metric label="E[X]" value={mean.toFixed(4)} />
        <Metric label="Var(X)" value={variance.toFixed(4)} />
        <Metric label="P(X=k)" value={pmf.toPrecision(4)} />
        <Metric label="P(X≤k)" value={cdf.toPrecision(4)} />
        <Metric label="Normal approx P(X=k)" value={pmfNormal.toPrecision(4)} hint="with continuity" />
        <Metric label="Poisson approx P(X=k)" value={pmfPoisson.toPrecision(4)} hint="λ=np" />
      </div>

      <p className="mt-3 text-sm text-slate-700">
        Approximations are sensible when their conditions hold (see the section below). Use the exact pmf for precise answers.
      </p>
    </div>
  );
}

function Metric({ label, value, hint }) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="text-slate-500">{label}{hint ? <span className="text-slate-400"> ({hint})</span> : null}</div>
      <div className="text-slate-900 font-semibold tabular-nums">{value}</div>
    </div>
  );
}

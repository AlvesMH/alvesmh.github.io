import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";

/**
 * Exponential.jsx — lesson page
 *
 * Convention:
 * - X ~ Exponential(λ) with rate λ>0 (support x≥0)
 * - pdf: f(x)=λ e^{−λx}, cdf: F(x)=1−e^{−λx}, survival S(x)=e^{−λx}
 * - mean 1/λ, variance 1/λ^2, MGF λ/(λ−t) for t<λ
 * - memoryless: P(X>s+t | X>s)=P(X>t)
 */

export default function Exponential() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown content (via Vite ?raw)
  useEffect(() => {
    let mounted = true;
    import("./exponential.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load exponential.md", err));
    return () => {
      mounted = false;
    };
  }, []);

  // Build TOC from rendered headings (ids assigned by RichMarkdown)
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

  // Flashcards
  const flashcards = useMemo(
    () => [
      { front: "Support", back: "x ≥ 0" },
      { front: "pdf", back: "f(x)=λ e^{−λx}" },
      { front: "cdf / survival", back: "F(x)=1−e^{−λx}, S(x)=e^{−λx}" },
      { front: "Mean / Var", back: "E[X]=1/λ, Var(X)=1/λ²" },
      { front: "MGF", back: "M_X(t)=λ/(λ−t), t<λ" },
      { front: "Memoryless", back: "P(X>s+t|X>s)=P(X>t)" },
      { front: "Poisson link", back: "Inter-arrival in Poisson(λ) process" },
      { front: "Min property", back: "min of Exp(λ_i) ~ Exp(Σλ_i)" },
    ],
    []
  );

  return (
    <>
      <AppHeaderMini
        tutorialSlug="introduction-to-probability-distribution"
        sectionId="continuous"
        sectionTitle="Continuous"
      />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Title */}
        <div className="py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Exponential Distribution
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Waiting times with constant hazard. Learn the pdf/cdf, moments, the memoryless property, and connections to
            Poisson processes, minima, and Gamma sums.
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* Interactive panel */}
            <section aria-labelledby="exponential-panel" className="space-y-4">
              <h2 id="exponential-panel" className="text-xl font-bold text-slate-900">
                Interactive: Explore Exponential(λ)
              </h2>
              <ExponentialPanel />
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
              to="/tutorials/introduction-to-probability-distribution/continuous/uniform"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Uniform
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/continuous/gamma"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Gamma →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/exponential/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Exponential Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ------------------------ Interactive Exponential Panel ------------------------ */
function ExponentialPanel() {
  const [lambda, setLambda] = useState(1.2);
  const [x, setX] = useState(1.0);
  const [c, setC] = useState(0.5);
  const [d, setD] = useState(2.0);
  const [s, setS] = useState(1.0); // memoryless: offset
  const [t, setT] = useState(0.7); // memoryless: horizon
  const [m, setM] = useState(5000); // simulation size
  const [stats, setStats] = useState(null); // {empMean, empVar}

  // guards
  useEffect(() => {
    if (lambda <= 0) setLambda(0.1);
    if (x < 0) setX(0);
    if (c < 0) setC(0);
    if (d < 0) setD(0);
    if (c > d) setD(c);
    if (s < 0) setS(0);
    if (t < 0) setT(0);
  }, [lambda, x, c, d, s, t]);

  // closed forms
  const pdfAtX = useMemo(() => (x >= 0 ? lambda * Math.exp(-lambda * x) : 0), [lambda, x]);
  const cdfAtX = useMemo(() => (x <= 0 ? 0 : 1 - Math.exp(-lambda * x)), [lambda, x]);
  const survAtX = useMemo(() => (x <= 0 ? 1 : Math.exp(-lambda * x)), [lambda, x]);
  const mean = useMemo(() => 1 / lambda, [lambda]);
  const variance = useMemo(() => 1 / (lambda * lambda), [lambda]);

  const intervalProb = useMemo(() => {
    const left = Math.max(0, Math.min(c, d));
    const right = Math.max(0, Math.max(c, d));
    if (right < left) return 0;
    return Math.exp(-lambda * left) - Math.exp(-lambda * right); // P(c≤X≤d)=S(c)−S(d)
  }, [lambda, c, d]);

  // Memoryless delta: |P(X>s+t | X>s) − P(X>t)|
  const memDelta = useMemo(() => {
    const num = Math.exp(-lambda * (s + t));
    const den = Math.exp(-lambda * s);
    const cond = den > 0 ? num / den : 0;
    const rhs = Math.exp(-lambda * t);
    return Math.abs(cond - rhs);
  }, [lambda, s, t]);

  function simulate() {
    const N = Math.max(100, Math.min(20000, Math.floor(m)));
    let s1 = 0;
    let s2 = 0;
    for (let i = 0; i < N; i++) {
      // inverse-CDF: X = −ln(1−U)/λ
      const u = Math.random();
      const val = -Math.log(1 - u) / lambda;
      s1 += val;
      s2 += val * val;
    }
    const empMean = s1 / N;
    const empVar = s2 / N - empMean * empMean;
    setStats({ empMean, empVar });
  }

  useEffect(() => {
    simulate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initial run

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-4">
        <label className="block text-sm font-medium text-slate-700">
          Rate λ {"(>0)"}
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={lambda}
            onChange={(e) => setLambda(Math.max(0.1, Number(e.target.value) || 0.1))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          x (for f,F,S)
          <input
            type="number"
            min="0"
            value={x}
            onChange={(e) => setX(Math.max(0, Number(e.target.value) || 0))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-slate-700">
            c (interval)
            <input
              type="number"
              min="0"
              value={c}
              onChange={(e) => setC(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            d (interval)
            <input
              type="number"
              min="0"
              value={d}
              onChange={(e) => setD(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-slate-700">
            s (memoryless)
            <input
              type="number"
              min="0"
              value={s}
              onChange={(e) => setS(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            t (memoryless)
            <input
              type="number"
              min="0"
              value={t}
              onChange={(e) => setT(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 text-sm">
        <Metric label="E[X]" value={mean.toFixed(6)} />
        <Metric label="Var(X)" value={variance.toFixed(6)} />
        <Metric label="f(x)" value={pdfAtX.toPrecision(4)} />
        <Metric label="F(x)" value={cdfAtX.toPrecision(4)} />
        <Metric label="S(x)" value={survAtX.toPrecision(4)} />
        <Metric label="P(c≤X≤d)" value={intervalProb.toPrecision(4)} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <label className="block text-sm font-medium text-slate-700">
          Simulation size m
          <input
            type="number"
            min={100}
            max={20000}
            value={m}
            onChange={(e) => setM(Math.max(100, Math.min(20000, Number(e.target.value) || 100)))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <div className="flex items-end">
          <button
            onClick={simulate}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Resimulate Exp(λ)
          </button>
        </div>

        <div className="text-sm text-slate-700">
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-slate-500">Empirical vs theoretical</div>
            <div className="mt-1 tabular-nums">
              μ̂ = {stats ? stats.empMean.toFixed(6) : "—"} (theory {(1 / lambda).toFixed(6)})
            </div>
            <div className="tabular-nums">
              σ̂² = {stats ? stats.empVar.toFixed(6) : "—"} (theory {(1 / (lambda * lambda)).toFixed(6)})
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
        <Metric label="Hazard h(x)" value={`${lambda.toFixed(3)} (constant)`} />
        <Metric label="Median" value={(Math.log(2) / lambda).toFixed(6)} />
        <Metric label="Memoryless Δ" value={memDelta.toExponential(2)} />
      </div>

      <p className="mt-3 text-sm text-slate-700">
        Simulation uses inverse-CDF: X = −ln(1−U)/λ with U~Uniform(0,1). Interval probability uses the survival
        function: P(c≤X≤d)=S(c)−S(d). Memoryless Δ should be ~0 up to floating error.
      </p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="text-slate-500">{label}</div>
      <div className="text-slate-900 font-semibold tabular-nums">{value}</div>
    </div>
  );
}

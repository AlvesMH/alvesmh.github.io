import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";

/**
 * ContinuousIntro.jsx — section overview (Continuous & CLT)
 *
 * - Loads ./continuous_intro.md (co-located) via Vite ?raw
 * - Builds a sticky "On This Page" TOC from rendered headings (ids added by RichMarkdown)
 * - Includes a lightweight CLT demo panel (no charts; simple simulation + metrics)
 * - Flashcards at the bottom
 * - Bottom navigation + (optional) quiz CTA placeholder
 * - Responsive 2-col on large screens (content + TOC), 1-col on mobile
 * - No progress/memory features
 */

export default function ContinuousIntro() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown once
  useEffect(() => {
    let mounted = true;
    import("./continuous_intro.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load continuous_intro.md", err));
    return () => {
      mounted = false;
    };
  }, []);

  // Build TOC from rendered headings (H2/H3)
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

  // Smooth scroll on TOC click
  function handleTocClick(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  }

  // Quick flashcards for the section
  const flashcards = useMemo(
    () => [
      { front: "pdf f(x)", back: "f(x) ≥ 0 and ∫ f(x) dx = 1; P(a ≤ X ≤ b)=∫_a^b f(x)dx" },
      { front: "cdf F(x)", back: "F(x)=P(X≤x)=∫_{-∞}^x f(t)dt; non-decreasing, right-continuous" },
      { front: "Expectation", back: "E[X]=∫ x f(x) dx; Var(X)=E[X^2]−(E[X])^2" },
      { front: "Change of var.", back: "If Y=g(X) monotone: f_Y(y)=f_X(g^{-1}(y))·|d g^{-1}/dy|" },
      { front: "Independence", back: "f_{X,Y}(x,y)=f_X(x)f_Y(y) ⇒ F(x,y)=F_X(x)F_Y(y)" },
      { front: "LLN (intuition)", back: "Sample mean → true mean as n grows (converges in probability)" },
      { front: "CLT (standardized)", back: "(Ȳ−μ)/(σ/√n) ⇒ N(0,1) under mild conditions" },
      { front: "Exponential link", back: "Poisson process inter-arrivals ~ Exp(λ)" },
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
            Continuous Variables & the Central Limit Theorem
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            PDFs, CDFs, expectations by integration, transformations, and a practical intuition for the Law of Large
            Numbers and the Central Limit Theorem.
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* CLT mini-demo (lightweight) */}
            <section aria-labelledby="clt-demo" className="space-y-4">
              <h2 id="clt-demo" className="text-xl font-bold text-slate-900">
                Interactive: CLT Mini-Demo (Sample Means)
              </h2>
              <CLTDemo />
            </section>
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

        {/* Bottom nav + Quiz CTA (intro quiz is optional; link now, add later if desired) */}
        <nav className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Link
              to="/tutorials/introduction-to-probability-distribution/discrete/poisson"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Poisson
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/continuous/uniform"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Uniform →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/intro/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Intro Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ----------------------------- CLT Mini Demo -------------------------------- */
function CLTDemo() {
  const [dist, setDist] = useState("uniform"); // 'uniform' | 'exponential' | 'bernoulli'
  const [p, setP] = useState(0.2);             // only for bernoulli
  const [n, setN] = useState(10);              // sample size
  const [m, setM] = useState(1000);            // number of replications
  const [stats, setStats] = useState(null);    // {empMean, empSD, theoMean, theoSD}

  // Distribution generators and moments
  const draw = useMemo(() => {
    if (dist === "uniform") {
      return () => Math.random(); // U(0,1)
    } else if (dist === "exponential") {
      // Exp(1): inverse CDF
      return () => -Math.log(1 - Math.random());
    } else {
      // Bernoulli(p)
      return () => (Math.random() < p ? 1 : 0);
    }
  }, [dist, p]);

  const moments = useMemo(() => {
    if (dist === "uniform") {
      return { mean: 0.5, var: 1 / 12 };
    } else if (dist === "exponential") {
      return { mean: 1, var: 1 };
    } else {
      return { mean: p, var: p * (1 - p) };
    }
  }, [dist, p]);

  function simulate() {
    const means = new Float64Array(m);
    for (let j = 0; j < m; j++) {
      let s = 0;
      for (let i = 0; i < n; i++) s += draw();
      means[j] = s / n;
    }
    // empirical mean & sd of sample means
    let mu = 0;
    for (let j = 0; j < m; j++) mu += means[j];
    mu /= m;
    let v = 0;
    for (let j = 0; j < m; j++) {
      const d = means[j] - mu;
      v += d * d;
    }
    v /= (m - 1);
    const empMean = mu;
    const empSD = Math.sqrt(v);

    const theoMean = moments.mean;
    const theoSD = Math.sqrt(moments.var / n);

    setStats({ empMean, empSD, theoMean, theoSD });
  }

  useEffect(() => {
    // quick initial run
    simulate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-4">
        <label className="block text-sm font-medium text-slate-700">
          Parent distribution
          <select
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1 bg-white"
            value={dist}
            onChange={(e) => setDist(e.target.value)}
          >
            <option value="uniform">Uniform(0,1)</option>
            <option value="exponential">Exponential(1)</option>
            <option value="bernoulli">Bernoulli(p)</option>
          </select>
        </label>

        {dist === "bernoulli" && (
          <label className="block text-sm font-medium text-slate-700">
            Bernoulli p
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
        )}

        <label className="block text-sm font-medium text-slate-700">
          Sample size n
          <input
            type="number"
            min={1}
            max={2000}
            value={n}
            onChange={(e) => setN(Math.max(1, Math.min(2000, Number(e.target.value) || 1)))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Replications m
          <input
            type="number"
            min={50}
            max={20000}
            value={m}
            onChange={(e) => setM(Math.max(50, Math.min(20000, Number(e.target.value) || 50)))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={simulate}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Resimulate
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <Metric label="Theoretical mean μ" value={moments.mean.toFixed(4)} />
        <Metric label="Theoretical SD(Ȳ)" value={Math.sqrt(moments.var / n).toFixed(4)} />
        <Metric label="Empirical mean of Ȳ" value={stats ? stats.empMean.toFixed(4) : "—"} />
        <Metric label="Empirical SD(Ȳ)" value={stats ? stats.empSD.toFixed(4) : "—"} />
      </div>

      <p className="mt-3 text-sm text-slate-700">
        As <em>n</em> increases, the distribution of the standardized sample mean approaches Normal(0,1), regardless of
        the parent distribution (provided basic regularity holds). Here we compare empirical and theoretical moments of
        Ȳ. Try larger <em>n</em> and different parents to see stabilization.
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

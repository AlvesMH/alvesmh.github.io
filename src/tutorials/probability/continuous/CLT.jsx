import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";

/**
 * CLT.jsx — Central Limit Theorem page
 *
 * - Loads ./clt.md via Vite ?raw
 * - Builds sticky "On This Page" TOC from rendered headings (ids added by RichMarkdown)
 * - Interactive CLT demo with several parent distributions (incl. heavy-tail counterexamples)
 * - Flashcards and a quiz CTA
 * - Responsive: 2 cols on large screens (content + TOC), stacked on mobile
 * - No progress/memory features
 */

export default function CLT() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id,text,level}]

  // Load markdown
  useEffect(() => {
    let mounted = true;
    import("./clt.md?raw")
      .then((mod) => mounted && setMd(mod.default || ""))
      .catch((err) => console.error("Failed to load clt.md", err));
    return () => { mounted = false; };
  }, []);

  // Build TOC (H2/H3)
  useEffect(() => {
    if (!contentWrapRef.current) return;
    const el = contentWrapRef.current;
    const buildToc = () => {
      const nodes = Array.from(el.querySelectorAll("h2, h3"));
      setToc(
        nodes.map((n) => ({
          id: n.id || "",
          text: n.textContent || "",
          level: n.tagName === "H2" ? 2 : 3,
        }))
      );
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
      { front: "CLT (i.i.d.)", back: "(Ȳ−μ)/(σ/√n) ⇒ N(0,1)" },
      { front: "LLN vs CLT", back: "LLN: Ȳ→μ; CLT: √n(Ȳ−μ) → Normal" },
      { front: "Berry–Esseen", back: "sup|F_n−Φ| ≤ C·ρ₃/(σ³√n)" },
      { front: "When it fails", back: "Infinite variance (e.g., Cauchy), strong dependence, heavy tails α≤2" },
      { front: "Studentized mean", back: "(Ȳ−μ)/(S/√n) ≈ t_{n−1} → N(0,1)" },
      { front: "Lindeberg cond.", back: "For non-i.i.d. arrays ⇒ CLT if Lindeberg holds" },
      { front: "Skewness effect", back: "More skew → slower Normal convergence" },
      { front: "Finite pop. corr.", back: "If sampling w/o replacement, use √((N−n)/(N−1))" },
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
            Central Limit Theorem (CLT)
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Why standardized sample means look Normal. Explore rate of convergence, Berry–Esseen bounds, and failure
            cases (heavy tails, dependence).
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* Interactive CLT demo */}
            <section aria-labelledby="clt-panel" className="space-y-4">
              <h2 id="clt-panel" className="text-xl font-bold text-slate-900">
                Interactive: CLT Demo (Standardized Sample Mean)
              </h2>
              <CLTPanel />
            </section>
          </article>

          {/* On This Page */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</div>
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
              to="/tutorials/introduction-to-probability-distribution/continuous/normal"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Normal
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/continuous"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to Continuous Intro →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/clt/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start CLT Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ---------------------------- Interactive CLT Panel ---------------------------- */
function CLTPanel() {
  const [dist, setDist] = useState("uniform"); // 'uniform' | 'exponential' | 'bernoulli' | 'pareto' | 'cauchy'
  const [p, setP] = useState(0.2);             // Bernoulli p
  const [alpha, setAlpha] = useState(2.5);     // Pareto shape α (xm=1)
  const [n, setN] = useState(20);              // sample size
  const [m, setM] = useState(5000);            // replications
  const [stats, setStats] = useState(null);    // results object

  // Distribution draws + theoretical moments (when defined)
  const draw = useMemo(() => {
    if (dist === "uniform") return () => Math.random(); // U(0,1)
    if (dist === "exponential") return () => -Math.log(1 - Math.random()); // Exp(1)
    if (dist === "bernoulli") return () => (Math.random() < p ? 1 : 0);
    if (dist === "pareto") return () => Math.pow(1 - Math.random(), -1 / alpha); // Pareto(α) with xm=1
    // cauchy(0,1)
    return () => Math.tan(Math.PI * (Math.random() - 0.5));
  }, [dist, p, alpha]);

  const theo = useMemo(() => {
    if (dist === "uniform") return { mean: 0.5, var: 1 / 12, finiteVar: true, label: "Uniform(0,1)" };
    if (dist === "exponential") return { mean: 1, var: 1, finiteVar: true, label: "Exponential(1)" };
    if (dist === "bernoulli") return { mean: p, var: Math.max(0, p * (1 - p)), finiteVar: true, label: `Bernoulli(${p.toFixed(2)})` };
    if (dist === "pareto") {
      const finiteMean = alpha > 1;
      const finiteVar = alpha > 2;
      const mean = finiteMean ? alpha / (alpha - 1) : Infinity;
      const v = finiteVar ? alpha / ((alpha - 1) ** 2 * (alpha - 2)) : Infinity;
      return { mean, var: v, finiteVar, label: `Pareto(α=${alpha.toFixed(2)})` };
    }
    return { mean: NaN, var: NaN, finiteVar: false, label: "Cauchy(0,1)" };
  }, [dist, p, alpha]);

  function simulate() {
    const N = Math.max(200, Math.min(20000, Math.floor(m)));
    const mu = theo.mean;
    const sig = Math.sqrt(theo.var);

    let coverage1 = 0, coverage2 = 0, coverage3 = 0;
    let sumMeans = 0, sumMeansSq = 0;
    let drawsForRho3 = 0;
    let sumAbs3 = 0;

    for (let j = 0; j < N; j++) {
      let s = 0;

      for (let i = 0; i < n; i++) {
        const x = draw();
        s += x;

        // accumulate absolute central 3rd moment if μ finite
        if (Number.isFinite(mu)) {
          sumAbs3 += Math.abs(x - mu) ** 3;
          drawsForRho3++;
        }
      }

      const ybar = s / n;
      sumMeans += ybar;
      sumMeansSq += ybar * ybar;

      if (theo.finiteVar && sig > 0) {
        const z = (ybar - mu) / (sig / Math.sqrt(n));
        if (Math.abs(z) <= 1) coverage1++;
        if (Math.abs(z) <= 2) coverage2++;
        if (Math.abs(z) <= 3) coverage3++;
      }
    }

    const empMean = sumMeans / N;
    const empVar = sumMeansSq / N - empMean * empMean;

    // Coverage proportions
    const prop1 = coverage1 / N;
    const prop2 = coverage2 / N;
    const prop3 = coverage3 / N;

    // Normal targets
    const targ1 = 0.682689492; // P(|Z|≤1)
    const targ2 = 0.954499736; // P(|Z|≤2)
    const targ3 = 0.997300204; // P(|Z|≤3)

    // Simple "normality gap" score (L1 sum of abs deviations)
    const gap =
      (Number.isFinite(prop1) ? Math.abs(prop1 - targ1) : 1) +
      (Number.isFinite(prop2) ? Math.abs(prop2 - targ2) : 1) +
      (Number.isFinite(prop3) ? Math.abs(prop3 - targ3) : 1);

    // Berry–Esseen estimate when moments exist: C * ρ3 / (σ^3 √n)
    let beBound = null;
    if (theo.finiteVar && sig > 0 && drawsForRho3 > 0) {
      const rho3 = sumAbs3 / drawsForRho3; // empirical E|X−μ|^3
      const C = 0.56; // classical non-tight universal constant (illustrative)
      beBound = (C * rho3) / (Math.pow(sig, 3) * Math.sqrt(n));
    }

    setStats({
      parent: theo.label,
      n, N,
      empMean, empVar,
      theoMean: mu, theoSDBar: theo.finiteVar ? (sig / Math.sqrt(n)) : NaN,
      coverage: { prop1, prop2, prop3, targ1, targ2, targ3, gap },
      beBound,
      notes:
        !theo.finiteVar
          ? "Variance is infinite or undefined — classical CLT fails."
          : null,
    });
  }

  useEffect(() => {
    simulate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initial run

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-5">
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
            <option value="pareto">Pareto(α) (xm=1)</option>
            <option value="cauchy">Cauchy(0,1) (CLT counterexample)</option>
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

        {dist === "pareto" && (
          <label className="block text-sm font-medium text-slate-700">
            Pareto shape α
            <input
              type="number"
              step="0.1"
              min="0.5"
              value={alpha}
              onChange={(e) => setAlpha(Math.max(0.5, Number(e.target.value) || 0.5))}
              className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
            />
            <div className="mt-1 text-xs text-slate-600">
              Mean exists if α&gt;1, variance if α&gt;2.
            </div>
          </label>
        )}

        <label className="block text-sm font-medium text-slate-700">
          Sample size n
          <input
            type="number"
            min="1"
            max="5000"
            value={n}
            onChange={(e) => setN(Math.max(1, Math.min(5000, Number(e.target.value) || 1)))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Replications m
          <input
            type="number"
            min="200"
            max="20000"
            value={m}
            onChange={(e) => setM(Math.max(200, Math.min(20000, Number(e.target.value) || 200)))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <div className="flex items-end">
          <button
            onClick={simulate}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Resimulate
          </button>
        </div>
      </div>

      {stats && (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 text-sm">
            <Metric label="Parent" value={stats.parent} />
            <Metric label="n (per mean)" value={String(stats.n)} />
            <Metric label="Replications m" value={String(stats.N)} />
            <Metric label="Ȳ empirical mean" value={stats.empMean.toFixed(6)} />
            <Metric label="Ȳ empirical var" value={stats.empVar.toFixed(6)} />
            <Metric
              label="Theory SD(Ȳ)"
              value={Number.isFinite(stats.theoSDBar) ? stats.theoSDBar.toFixed(6) : "—"}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 text-sm">
            <Metric
              label="P(|Z|≤1)"
              value={
                Number.isFinite(stats.coverage.prop1)
                  ? `${stats.coverage.prop1.toFixed(4)} (target ${stats.coverage.targ1.toFixed(4)})`
                  : "—"
              }
            />
            <Metric
              label="P(|Z|≤2)"
              value={
                Number.isFinite(stats.coverage.prop2)
                  ? `${stats.coverage.prop2.toFixed(4)} (target ${stats.coverage.targ2.toFixed(4)})`
                  : "—"
              }
            />
            <Metric
              label="P(|Z|≤3)"
              value={
                Number.isFinite(stats.coverage.prop3)
                  ? `${stats.coverage.prop3.toFixed(4)} (target ${stats.coverage.targ3.toFixed(4)})`
                  : "—"
              }
            />
            <Metric label="Normality gap (↓ better)" value={stats.coverage.gap.toFixed(4)} />
            <Metric
              label="Berry–Esseen bound"
              value={stats.beBound !== null ? stats.beBound.toFixed(4) : "—"}
            />
            <Metric label="Note" value={stats.notes || "—"} />
          </div>
        </>
      )}

      <p className="mt-3 text-sm text-slate-700">
        Coverage compares the standardized mean to the Normal 68–95–99.7% rule. The Berry–Esseen number is a rough
        bound on the maximum CDF error; it shrinks ≈ 1/√n when the third absolute central moment exists.
      </p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="text-slate-500">{label}</div>
      <div className="text-slate-900 font-semibold tabular-nums break-words">{value}</div>
    </div>
  );
}

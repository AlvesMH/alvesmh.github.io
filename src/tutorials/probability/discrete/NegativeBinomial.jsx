import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";

/**
 * NegativeBinomial.jsx — lesson page
 *
 * Convention used here:
 * - X = number of TRIALS until the r-th success (a.k.a. Pascal), support {r, r+1, ...}
 * - pmf: P(X=k) = C(k-1, r-1) * p^r * (1-p)^(k-r), for k >= r
 * - mean r/p, variance r(1-p)/p^2
 */

export default function NegativeBinomial() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown content
  useEffect(() => {
    let mounted = true;
    import("./negative_binomial.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load negative_binomial.md", err));
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
      { front: "Support", back: "X ∈ {r, r+1, …} (trials until r-th success)" },
      { front: "pmf", back: "P(X=k)=C(k−1,r−1) p^r (1−p)^{k−r}" },
      { front: "Mean", back: "E[X]=r/p" },
      { front: "Variance", back: "Var(X)=r(1−p)/p^2" },
      { front: "Geom link", back: "For r=1, Geometric(p)" },
      { front: "Sum of Geoms", back: "X ≍ sum of r i.i.d. Geom(p)" },
      { front: "Alternative param.", back: "‘Failures until r-th success’ ⇒ support {0,1,…}" },
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
            Negative Binomial (Pascal) Distribution
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Trials needed to achieve the <em>r</em>-th success with success probability <em>p</em> per trial:
            pmf, moments, modelling choices, and quick approximations.
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* Interactive panel */}
            <section aria-labelledby="negbin-panel" className="space-y-4">
              <h2 id="negbin-panel" className="text-xl font-bold text-slate-900">
                Interactive: Explore NegBin(r, p)
              </h2>
              <NegativeBinomialPanel />
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
              to="/tutorials/introduction-to-probability-distribution/discrete/geometric"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Geometric
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/discrete/poisson"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Poisson →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/negative-binomial/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Negative Binomial Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ------------------------- Interactive Negative Binomial Panel ------------------------ */
function NegativeBinomialPanel() {
  const [r, setR] = useState(3);
  const [p, setP] = useState(0.4);
  const [k, setK] = useState(6); // trials (k >= r)

  // Keep inputs sensible
  useEffect(() => {
    if (r < 1) setR(1);
    if (k < r) setK(r);
  }, [r, k]);

  const mean = useMemo(() => (p > 0 ? r / p : Infinity), [r, p]);
  const variance = useMemo(() => (p > 0 ? (r * (1 - p)) / (p * p) : Infinity), [r, p]);

  // Light-weight log-factorial via split rule: small exact, large Stirling (OK for teaching use)
  const logFact = (m) => {
    if (m < 2) return 0;
    if (m <= 200) {
      let s = 0;
      for (let i = 2; i <= m; i++) s += Math.log(i);
      return s;
    }
    // Stirling w/ first correction terms
    return m * Math.log(m) - m + 0.5 * Math.log(2 * Math.PI * m) + 1 / (12 * m) - 1 / (360 * m ** 3);
  };
  const logChoose = (n, k) => {
    if (k < 0 || k > n) return -Infinity;
    return logFact(n) - logFact(k) - logFact(n - k);
  };

  const pmf = useMemo(() => {
    if (!(k >= r)) return 0;
    if (p === 0) return k === Infinity ? 1 : 0;
    if (p === 1) return k === r ? 1 : 0;
    const logp = logChoose(k - 1, r - 1) + r * Math.log(p) + (k - r) * Math.log(1 - p);
    return Math.exp(logp);
  }, [k, r, p]);

  const cdf = useMemo(() => {
    // Sum pmf from r to k (reasonable for k <= ~400; input UI should keep within bounds)
    let s = 0;
    const maxIter = Math.min(k, r + 400); // guard
    for (let t = r; t <= maxIter; t++) {
      const logp = logChoose(t - 1, r - 1) + r * Math.log(p) + (t - r) * Math.log(1 - p);
      s += Math.exp(logp);
    }
    return s;
  }, [k, r, p]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-4">
        <label className="block text-sm font-medium text-slate-700">
          r (successes target)
          <input
            type="number"
            min={1}
            max={20}
            value={r}
            onChange={(e) => setR(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
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

        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Target trials k (≥ r)
          <input
            type="number"
            min={r}
            max={400}
            value={k}
            onChange={(e) =>
              setK(Math.max(r, Math.min(400, Number(e.target.value) || r)))
            }
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 text-sm">
        <Metric label="E[X]" value={Number.isFinite(mean) ? mean.toFixed(4) : "∞"} />
        <Metric label="Var(X)" value={Number.isFinite(variance) ? variance.toFixed(4) : "∞"} />
        <Metric label="P(X=k)" value={pmf.toPrecision(4)} />
        <Metric label="P(X≤k)" value={cdf.toPrecision(4)} />
        <Metric label="Mode (approx.)" value={r > 1 ? String(Math.floor((r - 1) * (1 - p) / p) + r) : "r"} />
      </div>

      <p className="mt-3 text-sm text-slate-700">
        When r=1 this reduces to the Geometric(p) distribution on trials. The pmf shape is right-skewed for small p and
        tightens as p increases or r grows.
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

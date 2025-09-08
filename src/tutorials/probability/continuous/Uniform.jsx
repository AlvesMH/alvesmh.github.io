import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";

/**
 * Uniform.jsx — lesson page
 *
 * Convention:
 * - X ~ Uniform(a,b), with a < b
 * - pdf: f(x) = 1/(b-a) for a ≤ x ≤ b, 0 otherwise
 * - cdf: F(x) = 0 (x<a), (x-a)/(b-a) (a≤x≤b), 1 (x>b)
 * - mean (a+b)/2, variance (b-a)^2/12
 */

export default function Uniform() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown content (via Vite ?raw)
  useEffect(() => {
    let mounted = true;
    import("./uniform.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load uniform.md", err));
    return () => {
      mounted = false;
    };
  }, []);

  // Build "On This Page" TOC from rendered headings (ids assigned by RichMarkdown)
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
      { front: "Support", back: "x ∈ [a,b] with a<b" },
      { front: "pdf", back: "f(x)=1/(b−a) on [a,b], 0 otherwise" },
      { front: "cdf", back: "F(x)=0 (x<a), (x−a)/(b−a) (a≤x≤b), 1 (x>b)" },
      { front: "Mean", back: "E[X]=(a+b)/2" },
      { front: "Variance", back: "Var(X)=(b−a)^2/12" },
      { front: "Transform", back: "If U~U(0,1), then a+(b−a)U ~ U(a,b)" },
      { front: "Interval prob.", back: "P(c≤X≤d)=max(0, min(d,b)−max(c,a))/(b−a)" },
      { front: "Order stats (U(0,1))", back: "max has pdf n x^{n−1}; min has pdf n(1−x)^{n−1}" },
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
            Uniform Distribution
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            A flat density on an interval. Learn the pdf/cdf, moments, interval probabilities, and the key{" "}
            <em>U(0,1) transformation</em> trick for simulation.
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* Interactive panel */}
            <section aria-labelledby="uniform-panel" className="space-y-4">
              <h2 id="uniform-panel" className="text-xl font-bold text-slate-900">
                Interactive: Explore Uniform(a, b)
              </h2>
              <UniformPanel />
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
              to="/tutorials/introduction-to-probability-distribution/continuous"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Continuous Intro
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/continuous/exponential"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Exponential →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/uniform/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Uniform Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* --------------------------- Interactive Uniform Panel --------------------------- */
function UniformPanel() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const [x, setX] = useState(0.3);
  const [c, setC] = useState(0.2);
  const [d, setD] = useState(0.6);
  const [m, setM] = useState(5000); // simulation size
  const [stats, setStats] = useState(null); // {empMean, empVar}

  // keep constraints: a < b, c ≤ d
  useEffect(() => {
    if (a >= b) setB(a + 1e-6);
    if (c > d) setD(c);
    // clamp x inside [a,b]
    if (x < a) setX(a);
    if (x > b) setX(b);
  }, [a, b, c, d, x]);

  const width = useMemo(() => b - a, [a, b]);
  const mean = useMemo(() => (a + b) / 2, [a, b]);
  const variance = useMemo(() => (width * width) / 12, [width]);

  const pdfAtX = useMemo(() => (x >= a && x <= b && width > 0 ? 1 / width : 0), [x, a, b, width]);
  const cdfAtX = useMemo(() => {
    if (x <= a) return 0;
    if (x >= b) return 1;
    return (x - a) / width;
  }, [x, a, b, width]);

  const intervalProb = useMemo(() => {
    if (width <= 0) return 0;
    const left = Math.max(a, c);
    const right = Math.min(b, d);
    return Math.max(0, right - left) / width;
  }, [a, b, c, d, width]);

  function simulate() {
    if (!(width > 0) || m < 1) {
      setStats(null);
      return;
    }
    let s = 0;
    let s2 = 0;
    for (let i = 0; i < m; i++) {
      const u = Math.random(); // U(0,1)
      const val = a + width * u; // transform to U(a,b)
      s += val;
      s2 += val * val;
    }
    const empMean = s / m;
    const empVar = s2 / m - empMean * empMean;
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
          a (left endpoint)
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          b (right endpoint)
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          x (for f(x), F(x))
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-slate-700">
            c (interval)
            <input
              type="number"
              value={c}
              onChange={(e) => setC(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            d (interval)
            <input
              type="number"
              value={d}
              onChange={(e) => setD(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 text-sm">
        <Metric label="Width (b−a)" value={width.toFixed(6)} />
        <Metric label="E[X]" value={mean.toFixed(6)} />
        <Metric label="Var(X)" value={variance.toFixed(6)} />
        <Metric label="f(x)" value={pdfAtX.toPrecision(4)} />
        <Metric label="F(x)" value={cdfAtX.toPrecision(4)} />
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
            Resimulate U(a,b)
          </button>
        </div>

        <div className="text-sm text-slate-700">
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-slate-500">Empirical vs theoretical</div>
            <div className="mt-1 tabular-nums">
              μ̂ = {stats ? stats.empMean.toFixed(6) : "—"} (theory {(mean).toFixed(6)})
            </div>
            <div className="tabular-nums">
              σ̂² = {stats ? stats.empVar.toFixed(6) : "—"} (theory {(variance).toFixed(6)})
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-700">
        Simulation uses the transformation <code>a+(b−a)U</code> with <code>U~Uniform(0,1)</code>. Interval probability
        uses overlap length divided by width.
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

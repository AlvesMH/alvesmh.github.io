import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";
import Tex from "../../shell/components/Tex";


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
function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="metric-label mb-1 text-[13px] leading-5 text-slate-700">{label}</div>
      <div className="tabular-nums font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function UniformPanel() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const [x, setX] = useState(0.3);
  const [c, setC] = useState(0.2);
  const [d, setD] = useState(0.6);
  const [m, setM] = useState(5000); // simulation size
  const [stats, setStats] = useState(null); // {empMean, empVar}

  // keep constraints: a < b, c ≤ d, clamp x ∈ [a,b]
  useEffect(() => {
    if (a >= b) setB(a + 1e-6);
    if (c > d) setD(c);
    if (x < a) setX(a);
    if (x > b) setX(b);
  }, [a, b, c, d, x]);

  const width = useMemo(() => b - a, [a, b]);
  const mean = useMemo(() => (a + b) / 2, [a, b]);
  const variance = useMemo(() => (width * width) / 12, [width]);

  const pdfAtX = useMemo(
    () => (x >= a && x <= b && width > 0 ? 1 / width : 0),
    [x, a, b, width]
  );
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
    let s = 0, s2 = 0;
    for (let i = 0; i < m; i++) {
      const u = Math.random();         // U(0,1)
      const val = a + width * u;       // transform to U(a,b)
      s += val;
      s2 += val * val;
    }
    const empMean = s / m;
    const empVar = s2 / m - empMean * empMean;
    setStats({ empMean, empVar });
  }

  useEffect(() => { simulate(); /* on mount */ }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      {/* Tighten KaTeX just inside metric labels */}
      <style>{`.metric-label .katex{line-height:1.2}`}</style>

      <div className="grid gap-4 md:grid-cols-4">
        <label className="block text-sm font-medium text-slate-700">
          <Tex size="sm">{String.raw`a`}</Tex> (left endpoint)
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
            aria-label="Uniform left endpoint a"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <Tex size="sm">{String.raw`b`}</Tex> (right endpoint)
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
            aria-label="Uniform right endpoint b"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <Tex size="sm">{String.raw`x`}</Tex> (for <Tex size="sm">{String.raw`f(x),\,F(x)`}</Tex>)
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
            aria-label="x value"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-slate-700">
            <Tex size="sm">{String.raw`c`}</Tex> (interval)
            <input
              type="number"
              value={c}
              onChange={(e) => setC(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
              aria-label="interval c"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            <Tex size="sm">{String.raw`d`}</Tex> (interval)
            <input
              type="number"
              value={d}
              onChange={(e) => setD(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
              aria-label="interval d"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 text-sm">
        <Metric label={<><span className="mr-1">Width</span><Tex size="sm">{String.raw`(b-a)`}</Tex></>} value={width.toFixed(6)} />
        <Metric label={<Tex size="sm">{String.raw`\mathbb{E}[X]`}</Tex>} value={mean.toFixed(6)} />
        <Metric label={<Tex size="sm">{String.raw`\mathrm{Var}(X)`}</Tex>} value={variance.toFixed(6)} />
        <Metric label={<Tex size="sm">{String.raw`f(x)`}</Tex>} value={pdfAtX.toPrecision(4)} />
        <Metric label={<Tex size="sm">{String.raw`F(x)`}</Tex>} value={cdfAtX.toPrecision(4)} />
        <Metric label={<Tex size="sm">{String.raw`\mathbb{P}(c\le X\le d)`}</Tex>} value={intervalProb.toPrecision(4)} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <label className="block text-sm font-medium text-slate-700">
          Simulation size <Tex size="sm">{String.raw`m`}</Tex>
          <input
            type="number"
            min={100}
            max={20000}
            value={m}
            onChange={(e) => setM(Math.max(100, Math.min(20000, Number(e.target.value) || 100)))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
            aria-label="simulation size m"
          />
        </label>

        <div className="flex items-end">
          <button
            onClick={simulate}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Resimulate&nbsp;<Tex size="sm">{String.raw`U(a,b)`}</Tex>
          </button>
        </div>

        <div className="text-sm text-slate-700">
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-slate-500">Empirical vs theoretical</div>
            <div className="mt-1 tabular-nums">
              <Tex size="sm">{String.raw`\hat{\mu}`}</Tex> = {stats ? stats.empMean.toFixed(6) : "—"} (theory <Tex size="sm">{String.raw`\mu`}</Tex>={mean.toFixed(6)})
            </div>
            <div className="tabular-nums">
              <Tex size="sm">{String.raw`\hat{\sigma}^{2}`}</Tex> = {stats ? stats.empVar.toFixed(6) : "—"} (theory <Tex size="sm">{String.raw`\sigma^{2}`}</Tex>={variance.toFixed(6)})
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-700">
        Simulation uses the transformation{" "}
        <Tex size="sm">{String.raw`a+(b-a)U`}</Tex> with{" "}
        <Tex size="sm">{String.raw`U\sim \mathrm{Uniform}(0,1)`}</Tex>. Interval probability uses overlap length divided by{" "}
        <Tex size="sm">{String.raw`(b-a)`}</Tex>.
      </p>
    </div>
  );
}

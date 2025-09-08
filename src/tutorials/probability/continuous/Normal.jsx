import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";

/**
 * Normal.jsx — lesson page
 *
 * Conventions:
 * - X ~ Normal(μ, σ²) with σ>0
 * - pdf: f(x) = (1/(σ√(2π))) * exp(-(x-μ)²/(2σ²))
 * - cdf: F(x) = Φ((x-μ)/σ) with Φ standard normal cdf
 * - z-score: z=(x-μ)/σ; 68–95–99.7 rule
 * - linear & sum closures: aX+b and sums of independent Normals remain Normal
 */

export default function Normal() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown content
  useEffect(() => {
    let mounted = true;
    import("./normal.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load normal.md", err));
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

  // Smooth-scroll TOC links
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
      { front: "pdf", back: "f(x)= (1/(σ√(2π))) e^{-(x−μ)²/(2σ²)}" },
      { front: "cdf", back: "F(x)=Φ((x−μ)/σ)" },
      { front: "z-score", back: "z=(x−μ)/σ" },
      { front: "68–95–99.7", back: "±1σ ~68%, ±2σ ~95%, ±3σ ~99.7%" },
      { front: "Linear transform", back: "aX+b ~ Normal(aμ+b, a²σ²)" },
      { front: "Sum closure", back: "Σ indep Normals ⇒ Normal (μ sums, variances add)" },
      { front: "Standard normal", back: "Z~N(0,1); Φ, φ" },
      { front: "CLT link", back: "Means approx Normal for large n" },
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
            Normal (Gaussian) Distribution
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            The bell curve: pdf/cdf, z-scores, the 68–95–99.7 rule, and the Normal family’s powerful closure properties.
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* Interactive panel */}
            <section aria-labelledby="normal-panel" className="space-y-4">
              <h2 id="normal-panel" className="text-xl font-bold text-slate-900">
                Interactive: Explore Normal(μ, σ²)
              </h2>
              <NormalPanel />
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

        {/* Bottom nav + Quiz CTA */}
        <nav className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Link
              to="/tutorials/introduction-to-probability-distribution/continuous/gamma"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Gamma
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/continuous"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to Continuous Intro →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/normal/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Normal Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ------------------------ Interactive Normal Panel ------------------------ */
function NormalPanel() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [x, setX] = useState(0.5);
  const [a, setA] = useState(-1);
  const [b, setB] = useState(1);
  const [m, setM] = useState(5000); // simulation size
  const [stats, setStats] = useState(null); // {empMean, empVar}

  useEffect(() => {
    if (sigma <= 0) setSigma(0.1);
    if (a > b) setB(a);
  }, [sigma, a, b]);

  // Standard normal helpers
  const SQRT2 = Math.SQRT2;
  function erf(z) {
    // Abramowitz & Stegun 7.1.26 approximation (good to ~1e-7)
    const sign = z < 0 ? -1 : 1;
    const t = 1 / (1 + 0.3275911 * Math.abs(z));
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
    const poly = (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t;
    const y = 1 - poly * Math.exp(-z * z);
    return sign * y;
  }
  function phi(z) {
    return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
  }
  function Phi(z) {
    return 0.5 * (1 + erf(z / SQRT2));
  }

  // Transform to standard normal
  const z = useMemo(() => (x - mu) / sigma, [x, mu, sigma]);

  const pdfAtX = useMemo(() => phi(z) / sigma, [z, sigma]);
  const cdfAtX = useMemo(() => Phi(z), [z]);

  const intervalProb = useMemo(() => {
    const za = (a - mu) / sigma;
    const zb = (b - mu) / sigma;
    return Math.max(0, Phi(Math.max(za, zb)) - Phi(Math.min(za, zb)));
  }, [a, b, mu, sigma]);

  const p1 = useMemo(() => Phi(1) - Phi(-1), []);
  const p2 = useMemo(() => Phi(2) - Phi(-2), []);
  const p3 = useMemo(() => Phi(3) - Phi(-3), []);

  // Simulation with Box–Muller
  function boxMuller() {
    const u1 = Math.random();
    const u2 = Math.random();
    const r = Math.sqrt(-2 * Math.log(1 - u1));
    const theta = 2 * Math.PI * u2;
    return r * Math.cos(theta);
  }
  function simulate() {
    const N = Math.max(200, Math.min(20000, Math.floor(m)));
    let s1 = 0, s2 = 0;
    for (let i = 0; i < N; i++) {
      const z0 = boxMuller();
      const val = mu + sigma * z0;
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
          μ (mean)
          <input
            type="number"
            value={mu}
            onChange={(e) => setMu(Number(e.target.value))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          σ (stdev, {">"}0)
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={sigma}
            onChange={(e) => setSigma(Math.max(0.1, Number(e.target.value) || 0.1))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          x (for f and F)
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-slate-700">
            a (interval)
            <input
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            b (interval)
            <input
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-7 text-sm">
        <Metric label="z=(x−μ)/σ" value={z.toFixed(6)} />
        <Metric label="f(x)" value={pdfAtX.toPrecision(4)} />
        <Metric label="F(x)" value={cdfAtX.toPrecision(4)} />
        <Metric label="P(a≤X≤b)" value={intervalProb.toPrecision(4)} />
        <Metric label="P(|X−μ|≤1σ)" value={p1.toPrecision(4)} />
        <Metric label="P(|X−μ|≤2σ)" value={p2.toPrecision(4)} />
        <Metric label="P(|X−μ|≤3σ)" value={p3.toPrecision(4)} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <label className="block text-sm font-medium text-slate-700">
          Simulation size m
          <input
            type="number"
            min={200}
            max={20000}
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
            Resimulate N(μ,σ²)
          </button>
        </div>

        <div className="text-sm text-slate-700">
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-slate-500">Empirical vs theoretical</div>
            <div className="mt-1 tabular-nums">
              μ̂ = {stats ? stats.empMean.toFixed(6) : "—"} (theory {mu.toFixed(6)})
            </div>
            <div className="tabular-nums">
              σ̂² = {stats ? stats.empVar.toFixed(6) : "—"} (theory {(sigma * sigma).toFixed(6)})
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-700">
        We use Φ(z)=½(1+erf(z/√2)) with an accurate erf approximation. Box–Muller sampling checks mean/variance.
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

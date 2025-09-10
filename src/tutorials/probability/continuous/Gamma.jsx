import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";
import Tex from "../../shell/components/Tex";


/**
 * Gamma.jsx — lesson page
 *
 * Convention in this page:
 *  - We use the (shape k, rate λ) parametrisation unless otherwise stated.
 *  - pdf: f(x) = λ^k x^{k-1} e^{-λ x} / Γ(k),  x≥0
 *  - cdf: F(x) = P(k, λ x) (regularized lower incomplete gamma)
 *  - mean k/λ, variance k/λ^2
 *  - For k=1, Gamma reduces to Exponential(λ)
 *  - Waiting time to the k-th Poisson(λ) event ~ Gamma(k, λ)
 */

export default function Gamma() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown content (via Vite ?raw)
  useEffect(() => {
    let mounted = true;
    import("./gamma.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load gamma.md", err));
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
      { front: "Support", back: "x ≥ 0" },
      { front: "pdf", back: "f(x)=λ^k x^{k−1} e^{−λx} / Γ(k)" },
      { front: "Mean / Var", back: "E[X]=k/λ, Var(X)=k/λ²" },
      { front: "MGF", back: "M_X(t)=(λ/(λ−t))^k, t<λ" },
      { front: "Sum of Exp", back: "If k∈ℕ, X ≍ Σ_i^k Exp(λ)" },
      { front: "Poisson link", back: "Waiting time to k-th event of Poisson(λ)" },
      { front: "χ² link", back: "χ²_ν = Gamma(k=ν/2, θ=2) (scale form)" },
      { front: "Hazard", back: "↑ if k>1, ↓ if k<1, const if k=1" },
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
            Gamma Distribution
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Positive, skewed waiting-time models with flexible shapes. Learn the pdf, moments, cdf via the incomplete
            gamma, Poisson-process links, and χ² connections.
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* Interactive panel */}
            <section aria-labelledby="gamma-panel" className="space-y-4">
              <h2 id="gamma-panel" className="text-xl font-bold text-slate-900">
                Interactive: Explore Gamma(k, λ)
              </h2>
              <GammaPanel />
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
              to="/tutorials/introduction-to-probability-distribution/continuous/exponential"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Exponential
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/continuous/normal"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Normal →
            </Link>
          </div>

          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/gamma/quiz"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Gamma Quiz
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ------------------------ Interactive Gamma Panel ------------------------ */
function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="metric-label mb-1 text-[13px] leading-5 text-slate-700">{label}</div>
      <div className="tabular-nums font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function GammaPanel() {
  const [k, setK] = useState(2.5);          // shape > 0
  const [lambda, setLambda] = useState(1.0); // rate > 0
  const [x, setX] = useState(1.2);
  const [c, setC] = useState(0.5);
  const [d, setD] = useState(3.0);
  const [m, setM] = useState(5000);         // simulation size
  const [stats, setStats] = useState(null); // {empMean, empVar}

  useEffect(() => {
    if (k <= 0) setK(0.1);
    if (lambda <= 0) setLambda(0.1);
    if (x < 0) setX(0);
    if (c < 0) setC(0);
    if (d < 0) setD(0);
    if (c > d) setD(c);
  }, [k, lambda, x, c, d]);

  // --- Special functions: Γ, regularized P(a,x) and Q(a,x) ---
  function logGamma(z) {
    const p = [
      676.5203681218851,   -1259.1392167224028,
      771.32342877765313,  -176.61502916214059,
      12.507343278686905,  -0.13857109526572012,
      9.9843695780195716e-6, 1.5056327351493116e-7
    ];
    const g = 7;
    if (z < 0.5) {
      return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
    }
    z -= 1;
    let xg = 0.99999999999980993;
    for (let i = 0; i < p.length; i++) xg += p[i] / (z + i + 1);
    const t = z + g + 0.5;
    return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(xg);
  }

  function gammP(a, x) {
    if (x <= 0) return 0;
    if (x < a + 1) {
      let ap = a, sum = 1 / a, del = sum;
      for (let n = 1; n <= 200; n++) {
        ap += 1; del *= x / ap; sum += del;
        if (Math.abs(del) < Math.abs(sum) * 1e-12) break;
      }
      return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
    } else {
      let b = x + 1 - a;
      let ccf = 1 / 1e-30;
      let dcf = 1 / b;
      let h = dcf;
      for (let i = 1; i <= 200; i++) {
        const an = -i * (i - a);
        b += 2;
        dcf = an * dcf + b; if (Math.abs(dcf) < 1e-30) dcf = 1e-30;
        ccf = b + an / ccf; if (Math.abs(ccf) < 1e-30) ccf = 1e-30;
        dcf = 1 / dcf;
        const del = dcf * ccf;
        h *= del;
        if (Math.abs(del - 1) < 1e-12) break;
      }
      const q = Math.exp(-x + a * Math.log(x) - logGamma(a)) * h;
      return 1 - q;
    }
  }
  function gammQ(a, x) { return 1 - gammP(a, x); }

  // pdf/cdf/survival
  const pdfAtX = useMemo(() => {
    if (x < 0) return 0;
    const lg = logGamma(k);
    const val = (k - 1) * Math.log(Math.max(x, 1e-300)) + k * Math.log(lambda) - lambda * x - lg;
    return Math.exp(val);
  }, [k, lambda, x]);

  const cdfAtX = useMemo(() => {
    if (x <= 0) return 0;
    return gammP(k, lambda * x);
  }, [k, lambda, x]);

  const survAtX = useMemo(() => {
    if (x <= 0) return 1;
    return gammQ(k, lambda * x);
  }, [k, lambda, x]);

  const mean = useMemo(() => k / lambda, [k, lambda]);
  const variance = useMemo(() => k / (lambda * lambda), [k, lambda]);

  const intervalProb = useMemo(() => {
    const left = Math.max(0, Math.min(c, d));
    const right = Math.max(0, Math.max(c, d));
    if (right < left) return 0;
    return Math.max(0, gammP(k, lambda * right) - gammP(k, lambda * left));
  }, [k, lambda, c, d]);

  // For integer k, Poisson equivalence delta
  const poissonEquivDelta = useMemo(() => {
    const ks = Math.round(k);
    if (Math.abs(k - ks) > 1e-9 || x < 0) return null; // only for integer shape
    const lx = lambda * x;
    let sum = 0, term = 1; // (λx)^0/0!
    for (let n = 0; n <= ks - 1; n++) {
      if (n > 0) term *= lx / n;
      sum += term;
    }
    const altCdf = 1 - Math.exp(-lx) * sum;
    return Math.abs(altCdf - cdfAtX);
  }, [k, lambda, x, cdfAtX]);

  function rngGamma(shape, rate) {
    const scale = 1 / rate;
    if (shape < 1) {
      const u = Math.random();
      return rngGamma(shape + 1, 1) * Math.pow(u, 1 / shape) * scale;
    }
    const d = shape - 1 / 3;
    const c = 1 / Math.sqrt(9 * d);
    while (true) {
      let u1 = Math.random(), u2 = Math.random();
      const xNorm = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const v = Math.pow(1 + c * xNorm, 3);
      if (v <= 0) continue;
      const u = Math.random();
      const x2 = xNorm * xNorm;
      if (u < 1 - 0.0331 * x2 * x2) return d * v * scale;
      if (Math.log(u) < 0.5 * x2 + d * (1 - v + Math.log(v))) return d * v * scale;
    }
  }

  function simulate() {
    const N = Math.max(200, Math.min(20000, Math.floor(m)));
    let s1 = 0, s2 = 0;
    for (let i = 0; i < N; i++) {
      const g = rngGamma(k, lambda);
      s1 += g; s2 += g * g;
    }
    const empMean = s1 / N;
    const empVar = s2 / N - empMean * empMean;
    setStats({ empMean, empVar });
  }

  useEffect(() => { simulate(); }, []); // initial run

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      {/* tighten KaTeX inside metric labels only */}
      <style>{`.metric-label .katex{line-height:1.2}`}</style>

      <div className="grid gap-4 md:grid-cols-4">
        <label className="block text-sm font-medium text-slate-700">
          Shape <Tex size="sm">{String.raw`k`}</Tex> {"(> 0)"}
          <input
            type="number" step="0.1" min="0.1" value={k}
            onChange={(e) => setK(Math.max(0.1, Number(e.target.value) || 0.1))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
            aria-label="gamma shape k"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Rate <Tex size="sm">{String.raw`\lambda`}</Tex> {"(> 0)"}
          <input
            type="number" step="0.1" min="0.1" value={lambda}
            onChange={(e) => setLambda(Math.max(0.1, Number(e.target.value) || 0.1))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
            aria-label="gamma rate lambda"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <Tex size="sm">{String.raw`x`}</Tex> (for <Tex size="sm">{String.raw`f,\,F,\,S,\,h`}</Tex>)
          <input
            type="number" min="0" value={x}
            onChange={(e) => setX(Math.max(0, Number(e.target.value) || 0))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
            aria-label="x for f F S h"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-slate-700">
            <Tex size="sm">{String.raw`c`}</Tex> (interval)
            <input
              type="number" min="0" value={c}
              onChange={(e) => setC(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
              aria-label="interval c"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            <Tex size="sm">{String.raw`d`}</Tex> (interval)
            <input
              type="number" min="0" value={d}
              onChange={(e) => setD(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1"
              aria-label="interval d"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-7 text-sm">
        <Metric label={<Tex size="sm">{String.raw`\mathbb{E}[X]`}</Tex>} value={mean.toFixed(6)} />
        <Metric label={<Tex size="sm">{String.raw`\mathrm{Var}(X)`}</Tex>} value={variance.toFixed(6)} />
        <Metric label={<Tex size="sm">{String.raw`f(x)`}</Tex>} value={pdfAtX.toPrecision(4)} />
        <Metric label={<Tex size="sm">{String.raw`F(x)`}</Tex>} value={cdfAtX.toPrecision(4)} />
        <Metric label={<Tex size="sm">{String.raw`S(x)`}</Tex>} value={survAtX.toPrecision(4)} />
        <Metric label={<Tex size="sm">{String.raw`\mathbb{P}(c\le X\le d)`}</Tex>} value={intervalProb.toPrecision(4)} />
        <Metric
          label={<Tex size="sm">{String.raw`h(x)=\frac{f(x)}{S(x)}`}</Tex>}
          value={survAtX > 0 ? (pdfAtX / survAtX).toFixed(6) : "∞"}
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <label className="block text-sm font-medium text-slate-700">
          Simulation size <Tex size="sm">{String.raw`m`}</Tex>
          <input
            type="number" min={200} max={20000} value={m}
            onChange={(e) => setM(Math.max(200, Math.min(20000, Number(e.target.value) || 200)))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
            aria-label="simulation size m"
          />
        </label>

        <div className="flex items-end">
          <button
            onClick={simulate}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Resimulate&nbsp;<Tex size="sm">{String.raw`\mathrm{Gamma}(k,\lambda)`}</Tex>
          </button>
        </div>

        <div className="text-sm text-slate-700">
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-slate-500">Empirical vs theoretical</div>
            <div className="mt-1 tabular-nums">
              <Tex size="sm">{String.raw`\hat{\mu}`}</Tex> = {stats ? stats.empMean.toFixed(6) : "—"} (theory <Tex size="sm">{String.raw`\mu`}</Tex>={(k / lambda).toFixed(6)})
            </div>
            <div className="tabular-nums">
              <Tex size="sm">{String.raw`\hat{\sigma}^{2}`}</Tex> = {stats ? stats.empVar.toFixed(6) : "—"} (theory <Tex size="sm">{String.raw`\sigma^{2}`}</Tex>={(k / (lambda * lambda)).toFixed(6)})
            </div>
          </div>
        </div>
      </div>

      {poissonEquivDelta !== null && (
        <p className="mt-3 text-sm text-slate-700">
          <Tex size="sm">
            {String.raw`\Bigl|\text{Gamma CDF} - \Bigl(1-e^{-\lambda x}\sum_{n=0}^{k-1}\frac{(\lambda x)^n}{n!}\Bigr)\Bigr| =`}
          </Tex>{" "}
          <span className="font-semibold tabular-nums">
            {poissonEquivDelta.toExponential(2)}
          </span>
        </p>
      )}

      <p className="mt-3 text-sm text-slate-700">
        CDF uses the regularized incomplete gamma (series / continued fractions). For integer&nbsp;
        <Tex size="sm">{String.raw`k`}</Tex>, the CDF equals a truncated Poisson tail; we show the small numerical delta above when this holds.
      </p>
    </div>
  );
}

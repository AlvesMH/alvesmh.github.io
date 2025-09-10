import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";
import Tex from "../../shell/components/Tex";

/**
 * Geometric.jsx — lesson page
 *
 * Conventions in this chapter:
 * - We use the "trials until first success" parameterisation with support {1,2,...}
 * - pmf: P(X=k) = (1-p)^{k-1} p, k=1,2,...
 * - cdf: P(X≤k) = 1 - (1-p)^k
 * - memoryless: P(X>m+n | X>m) = P(X>n)
 */

export default function Geometric() {
  const [md, setMd] = useState("");
  const contentWrapRef = useRef(null);
  const [toc, setToc] = useState([]); // [{id, text, level}]

  // Load markdown content
  useEffect(() => {
    let mounted = true;
    import("./geometric.md?raw")
      .then((mod) => {
        if (mounted) setMd(mod.default || "");
      })
      .catch((err) => console.error("Failed to load geometric.md", err));
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

  // Smooth-scroll TOC links
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
      { front: "Support", back: "X ∈ {1,2,…} (trials until first success)" },
      { front: "pmf", back: "P(X=k)=(1−p)^{k−1} p" },
      { front: "cdf", back: "P(X≤k)=1−(1−p)^k" },
      { front: "Tail", back: "P(X>k)=(1−p)^k" },
      { front: "Mean", back: "E[X]=1/p" },
      { front: "Variance", back: "Var(X)=(1−p)/p^2" },
      { front: "Memoryless", back: "P(X>m+n | X>m)=P(X>n)" },
      { front: "NegBin link", back: "Geometric is NegBin(r=1)" },
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
            Geometric Distribution
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Trials until the <em>first</em> success, with success probability <em>p</em> each trial. Learn the pmf, cdf,
            moments, and the hallmark <strong>memoryless</strong> property.
          </p>
        </div>

        {/* Content + sticky TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentWrapRef} className="min-w-0 space-y-8">
            <RichMarkdown content={md} />

            {/* Interactive panel */}
            <section aria-labelledby="geometric-panel" className="space-y-4">
              <h2 id="geometric-panel" className="text-xl font-bold text-slate-900">
                Interactive: Explore Geometric(p)
              </h2>
              <GeometricPanel />
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
              to="/tutorials/introduction-to-probability-distribution/discrete/binomial"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Binomial
            </Link>
            <Link
              to="/tutorials/introduction-to-probability-distribution/discrete/negative-binomial"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next: Negative Binomial →
            </Link>
          </div>

        <Link
          to="/tutorials/introduction-to-probability-distribution/discrete/geometric/quiz"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Start Geometric Quiz
        </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

/* ------------------------- Small Interactive Panel ------------------------ */
function Metric({ label, value, hint }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="metric-label mb-1 text-[13px] leading-5 text-slate-700">
        {label}
        {hint ? <span className="ml-1 text-slate-400">{hint}</span> : null}
      </div>
      <div className="tabular-nums font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function GeometricPanel() {
  // Geometric(p): trials until first success, support k = 1,2,...
  const [p, setP] = React.useState(0.3);
  const [k, setK] = React.useState(3);

  // guards
  React.useEffect(() => {
    if (p < 0) setP(0);
    if (p > 1) setP(1);
  }, [p]);
  React.useEffect(() => {
    if (k < 1) setK(1);
  }, [k]);

  const mean = React.useMemo(() => (p > 0 ? 1 / p : Infinity), [p]);
  const variance = React.useMemo(() => (p > 0 ? (1 - p) / (p * p) : Infinity), [p]);

  const pmf = React.useMemo(() => {
    if (k < 1 || p <= 0 || p > 1) return 0;
    return Math.pow(1 - p, k - 1) * p;
  }, [k, p]);

  const cdf = React.useMemo(() => {
    if (k < 1 || p <= 0 || p > 1) return 0;
    return 1 - Math.pow(1 - p, k);
  }, [k, p]);

  const tail = React.useMemo(() => {
    if (k < 0 || p < 0 || p > 1) return 0;
    return Math.pow(1 - p, k);
  }, [k, p]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      {/* scope: only metric labels get tighter math */}
      <style>{`.metric-label .katex { line-height: 1.2; }`}</style>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block text-sm font-medium text-slate-700">
          Success probability <Tex size="sm">{String.raw`p`}</Tex>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className="mt-2 w-full"
            aria-label="success probability p"
          />
          <div className="mt-1 text-slate-800 tabular-nums">
            <Tex size="sm">{String.raw`p`}</Tex> = {p.toFixed(2)}
          </div>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Target trial <Tex size="sm">{String.raw`k`}</Tex>
          <input
            type="number"
            min={1}
            value={k}
            onChange={(e) => setK(Math.max(1, Number(e.target.value) || 1))}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1"
            aria-label="target trial k"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <Metric label={<Tex size="sm">{String.raw`\mathbb{E}[X]`}</Tex>} value={Number.isFinite(mean) ? mean.toFixed(4) : "—"} />
        <Metric label={<Tex size="sm">{String.raw`\mathrm{Var}(X)`}</Tex>} value={Number.isFinite(variance) ? variance.toFixed(4) : "—"} />
        <Metric label={<Tex size="sm">{String.raw`\mathbb{P}(X=k)`}</Tex>} value={pmf.toPrecision(4)} />
        <Metric label={<Tex size="sm">{String.raw`F(k)=\mathbb{P}(X\le k)`}</Tex>} value={cdf.toPrecision(4)} />
        <Metric label={<Tex size="sm">{String.raw`\mathbb{P}(X>k)`}</Tex>} value={tail.toPrecision(4)} hint={<Tex size="xs">{String.raw`=(1-p)^k`}</Tex>} />
      </div>

      <p className="mt-3 text-sm text-slate-700">
        Trials-until-first-success:{" "}
        <Tex size="sm">{String.raw`\mathbb{P}(X=k)=(1-p)^{k-1}p,\quad k=1,2,\dots`}</Tex>. Memoryless:{" "}
        <Tex size="sm">{String.raw`\mathbb{P}(X>m+n\mid X>m)=\mathbb{P}(X>n)`}</Tex>.
      </p>
    </div>
  );
}

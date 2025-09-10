import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import RichMarkdown from "../../shell/components/RichMarkdown";
import Flashcards from "../../shell/components/Flashcards";
import QuizMCQ from "../../shell/components/QuizMCQ";
import seedrandom from "seedrandom";


/**
 * Practice.jsx — Probability Practice Hub
 *
 * - Mixed practice for the whole Probability tutorial (discrete, continuous, CLT)
 * - Sections:
 *    1) How to use this page (tips + printable)
 *    2) Short exercises (with collapsible solutions) — rendered from inline markdown
 *    3) Exam-length MCQ (40 items) using QuizMCQ
 *    4) Flashcards recap
 * - Sticky "On This Page" sidebar built from headings inside the article
 * - Responsive: 2 columns (content + TOC) on wide screens, stacked on mobile
 * - No progress/memory features (static site)
 */

// Put near the top of Practice.jsx (outside the component or inside, either is fine)
function stripIndent(s) {
  // drop a possible leading blank line
  const lines = s.replace(/^\s*\n/, "").split("\n");
  // compute smallest leading whitespace among non-empty lines
  const indents = lines
    .filter((l) => l.trim().length)
    .map((l) => l.match(/^\s*/)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min)).join("\n").trimEnd();
}


export default function Practice() {
  const [toc, setToc] = useState([]);
  const contentRef = useRef(null);
  const mdRef = useRef(null);

  // ---------- Inline markdown for the Exercises section ----------
  const practiceMd = useMemo(
    () => `
      # Practice & Exam Preparation

      > 💡 **How to use this page**  
      > 1) Warm up with short exercises (open *Solutions* after you commit).  
      > 2) Take the full **40-question MCQ exam** below, or use **Exam Mode** for a quick 30Q subset.  
      > 3) Print or Save as PDF (button in the sidebar) to work offline.  
      > 4) Review with flashcards at the bottom.

      ---

      ## A. Warm-ups & Short Exercises

      Each problem targets the core skills from the tutorial (Bernoulli/Binomial/Geometric/NegBin/Poisson, Uniform/Exponential/Gamma/Normal, CLT, transformations).  
        
      Open the *Solution* only after you’ve tried it.

      ### 1) Bernoulli mean/var
      Let \\(X\\sim \\mathrm{Bernoulli}(p)\\). Compute \\(\\mathbb E[X]\\) and \\(\\mathrm{Var}(X)\\).

      <details><summary>Solution</summary>
      \\(\\mathbb E[X]=p\\), \\(\\mathrm{Var}(X)=p(1-p)\\).
      </details>

      ### 2) Binomial pmf & mean/var
      If \\(Y\\sim\\mathrm{Binomial}(n,p)\\), write \\(P(Y=k)\\) and give mean/variance.

      <details><summary>Solution</summary>
      \\(P(Y=k)=\\binom{n}{k}p^k(1-p)^{n-k}\\), \\(\\mathbb E[Y]=np\\), \\(\\mathrm{Var}(Y)=np(1-p)\\).
      </details>

      ### 3) Geometric tail & mean
      For \\(G\\sim\\mathrm{Geom}(p)\\) (# of trials until first success, support \\(1,2,\\dots\\)), show \\(P(G>k)=(1-p)^k\\) and \\(\\mathbb E[G]=1/p\\).

      <details><summary>Solution</summary>
      No success in first \\(k\\) trials: \\((1-p)^k\\). Mean is \\(1/p\\).
      </details>

      ### 4) NegBin interpretation
      \\(X\\sim\\mathrm{NegBin}(r,p)\\) = # of trials until \\(r\\)th success. What is \\(\\mathbb E[X]\\)?

      <details><summary>Solution</summary>
      \\(\\mathbb E[X]=r/p\\).
      </details>

      ### 5) Poisson mean/var & interval prob
      \\(N\\sim\\mathrm{Pois}(\\lambda)\\). Give mean/variance and \\(P(N=0)\\).

      <details><summary>Solution</summary>
      Mean=Var=\\(\\lambda\\). \\(P(N=0)=e^{-\\lambda}\\).
      </details>

      ### 6) Poisson thinning
      If arrivals ~ Poisson(\\(\\lambda\\)), each kept with prob \\(q\\) independently. Distribution of kept arrivals?

      <details><summary>Solution</summary>
      Thinned process is \\(\\mathrm{Pois}(q\\lambda)\\).
      </details>

      ### 7) Uniform interval probability
      \\(X\\sim\\mathrm{U}(a,b)\\). Compute \\(P(c\\le X\\le d)\\).

      <details><summary>Solution</summary>
      \\(\\dfrac{\\max(0,\\min(d,b)-\\max(c,a))}{b-a}\\).
      </details>

      ### 8) Exponential memoryless
      \\(T\\sim\\mathrm{Exp}(\\lambda)\\). Show \\(P(T>s+t\\mid T>s)=P(T>t)\\).

      <details><summary>Solution</summary>
      \\(\\dfrac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}}=e^{-\\lambda t}\\).
      </details>

      ### 9) Sum of exponentials
      If \\(X_i\\stackrel{iid}{\\sim}\\mathrm{Exp}(\\lambda)\\) for \\(i=1..k\\), distribution of \\(\\sum X_i\\)?

      <details><summary>Solution</summary>
      \\(\\mathrm{Gamma}(k,\\lambda)\\) (rate form).
      </details>

      ### 10) Gamma moments
      For \\(G\\sim\\mathrm{Gamma}(k,\\lambda)\\) (rate), give mean/variance.

      <details><summary>Solution</summary>
      \\(\\mathbb E[G]=k/\\lambda\\), \\(\\mathrm{Var}(G)=k/\\lambda^2\\).
      </details>

      ### 11) Normal standardization
      \\(X\\sim\\mathcal N(\\mu,\\sigma^2)\\). Express \\(P(X\\le x)\\) using \\(\\Phi\\).

      <details><summary>Solution</summary>
      \\(P(X\\le x)=\\Phi\\big((x-\\mu)/\\sigma\\big)\\).
      </details>

      ### 12) CLT statement
      Write the classical i.i.d. CLT for standardized \\(\\overline{X}\\).

      <details><summary>Solution</summary>
      \\((\\overline{X}-\\mu)/(\\sigma/\\sqrt{n}) \\Rightarrow \\mathcal N(0,1)\\).
      </details>

      ### 13) Change of variables (monotone)
      If \\(X\\) has density \\(f_X\\), and \\(Y=g(X)\\) strictly increasing, derive \\(f_Y\\).

      <details><summary>Solution</summary>
      \\(f_Y(y)=f_X(g^{-1}(y))\\left|\\dfrac{d}{dy}g^{-1}(y)\\right|\\).
      </details>

      ### 14) Order stats for U(0,1)
      For \\(U_1,..,U_n\\sim \\mathrm U(0,1)\\), pdf of \\(\\max U_i\\)?

      <details><summary>Solution</summary>
      \\(f(x)=n x^{n-1},\\ 0\\le x\\le 1\\).
      </details>

      ### 15) Bayes (quick numbers)
      Test has sensitivity 0.95, specificity 0.98, prevalence 0.01. Compute \\(P(\\text{disease}|\\text{positive})\\).

      <details><summary>Solution</summary>
      \\(\\frac{0.95\\cdot 0.01}{0.95\\cdot 0.01 + 0.02\\cdot 0.99}\\approx 0.324\\).
      </details>
      `,
    []
  );

  // Convert \( ... \) -> $...$ and \[ ... \] -> $$...$$ for better renderer compatibility
  const mdForRenderer = useMemo(() => {
    // 1) remove leading indentation so markdown isn't a code block
    let s = stripIndent(practiceMd);

    // 2) convert \( \) / \[ \] to $ $ / $$ $$ for KaTeX pipeline
    s = s.replace(/\\\[(.+?)\\\]/gs, (_, inner) => `$$${inner}$$`);
    s = s.replace(/\\\((.+?)\\\)/g,  (_, inner) => `$${inner}$`);

    return s;
  }, [practiceMd]);

  // ---------- Build TOC by scanning headings ----------
  useEffect(() => {
    const container = mdRef.current || contentRef.current;
    if (!container) return;

    let rafId = 0;
    const rebuild = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const nodes = Array.from(container.querySelectorAll("h2, h3"));
        setToc(
          nodes.map((n) => ({
            id: n.id || "",
            text: n.textContent || "",
            level: n.tagName === "H2" ? 2 : 3,
          }))
        );
      });
    };

    // initial build
    rebuild();

    // Only observe the markdown area, not the whole article with the quiz
    const obs = new MutationObserver(rebuild);
    obs.observe(container, { childList: true, subtree: true, attributes: true });

    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []); // <-- IMPORTANT: run once (or use [practiceMd] if it changes at runtime)


  // ---------- MCQ: 40 comprehensive questions ----------
  const fullQuestions = useMemo(
    () => [
      {
        question: "For X ~ Bernoulli(p), which is correct?",
        options: [
          "E[X]=p, Var(X)=p(1−p)",
          "E[X]=1−p, Var(X)=p",
          "E[X]=p, Var(X)=p",
          "E[X]=1, Var(X)=0",
        ],
        correctIndex: 0,
        rationale: "Bernoulli basics.",
      },
      {
        question: "Y ~ Binomial(n,p). P(Y=k) equals",
        options: [
          "C(n,k) p^k (1−p)^{n−k}",
          "p^k (1−p)^{n−k}",
          "λ^k e^{−λ}/k!",
          "1/(b−a)",
        ],
        correctIndex: 0,
        rationale: "Binomial pmf.",
      },
      {
        question: "Geometric(p) (# of trials until first success) has mean",
        options: ["1/p", "p", "1−p", "p/(1−p)"],
        correctIndex: 0,
        rationale: "Standard mean for this parameterization (support 1,2,…).",
      },
      {
        question: "Negative Binomial(r,p) represents",
        options: [
          "Trials until r-th success",
          "Failures until 1st success",
          "Number of successes in n trials",
          "Poisson arrivals in time t",
        ],
        correctIndex: 0,
        rationale: "Trials-to-rth-success convention.",
      },
      {
        question: "If N ~ Poisson(λ), then E[N] and Var(N) are",
        options: ["λ and λ", "λ and √λ", "√λ and λ", "λ and 2λ"],
        correctIndex: 0,
        rationale: "Poisson has equal mean and variance.",
      },
      {
        question: "Poisson superposition: sum of independent Poisson(λi) variables is",
        options: [
          "Poisson(∑λi)",
          "Binomial(∑λi, p)",
          "Normal(∑λi,∑λi²)",
          "Gamma(∑λi,1)",
        ],
        correctIndex: 0,
        rationale: "Rates add.",
      },
      {
        question: "Poisson as a Binomial limit holds when",
        options: [
          "n→∞, p→0, np→λ",
          "n→∞, p fixed",
          "n fixed, p→0",
          "n→∞, p→1",
        ],
        correctIndex: 0,
        rationale: "Classical rare-event limit.",
      },
      {
        question: "Uniform(a,b): P(c≤X≤d) equals",
        options: [
          "max(0, min(d,b)−max(c,a))/(b−a)",
          "(d−c)/(b−a) for any c,d",
          "(c−a)/(b−a)",
          "(b−d)/(b−a)",
        ],
        correctIndex: 0,
        rationale: "Overlap length divided by width.",
      },
      {
        question: "Exponential(λ) has which property?",
        options: [
          "Memoryless",
          "Increasing hazard only",
          "Finite support [0,1]",
          "Two parameters",
        ],
        correctIndex: 0,
        rationale: "h(x)=λ constant; memoryless.",
      },
      {
        question: "If X1,…,Xk i.i.d. Exp(λ), ΣXi ~",
        options: [
          "Gamma(k, λ) (rate form)",
          "Normal(k/λ, 1/λ)",
          "Poisson(kλ)",
          "Uniform(0,k/λ)",
        ],
        correctIndex: 0,
        rationale: "Sum of exponentials is Gamma.",
      },
      {
        question: "Gamma(k, λ) (rate) mean and variance are",
        options: [
          "k/λ and k/λ²",
          "λ/k and λ²/k",
          "kλ and kλ²",
          "1/λ and 1/λ²",
        ],
        correctIndex: 0,
        rationale: "Divide by rate; variance scales with 1/λ².",
      },
      {
        question: "Normal(μ,σ²): P(X≤x) equals",
        options: [
          "Φ((x−μ)/σ)",
          "1−Φ((x−μ)/σ)",
          "φ((x−μ)/σ)",
          "e^{−(x−μ)²/(2σ²)}",
        ],
        correctIndex: 0,
        rationale: "cdf via z-standardization.",
      },
      {
        question: "Which captures the classical i.i.d. CLT?",
        options: [
          "(Ȳ−μ)/(σ/√n) ⇒ N(0,1)",
          "Ȳ ⇒ N(μ,σ²) for all n",
          "ΣXi ⇒ Poisson",
          "(Ȳ−μ) → 0 almost surely only",
        ],
        correctIndex: 0,
        rationale: "Standardized mean tends to Normal.",
      },
      {
        question: "Berry–Esseen says the Kolmogorov distance error is ≲",
        options: ["C·ρ3/(σ³√n)", "1/n", "1/√(log n)", "constant"],
        correctIndex: 0,
        rationale: "Convergence rate ~1/√n with 3rd absolute moment.",
      },
      {
        question: "Uniform(0,1) order stat: pdf of max(Ui) is",
        options: [
          "n x^{n−1} on [0,1]",
          "x^n on [0,1]",
          "n(1−x)^{n−1} on [0,1]",
          "1 on [0,1]",
        ],
        correctIndex: 0,
        rationale: "Differentiate x^n.",
      },
      {
        question: "Independence for continuous X,Y means",
        options: [
          "f_{X,Y}(x,y)=f_X(x)f_Y(y) for all x,y",
          "E[XY]=E[X]E[Y]",
          "Cov(X,Y)=0",
          "F_{X|Y}(x|y)=F_X(x) for some y",
        ],
        correctIndex: 0,
        rationale: "Joint density factorizes.",
      },
      {
        question: "Law of total probability (discrete partition {A_i})",
        options: [
          "P(B)=∑_i P(B|A_i)P(A_i)",
          "P(B)=P(B|A)P(A)",
          "P(B)=∑_i P(A_i|B)",
          "P(B)=P(A∩B)/P(A)",
        ],
        correctIndex: 0,
        rationale: "Decompose over a partition.",
      },
      {
        question: "Bayes with prior P(A) and likelihoods: P(A|B)=",
        options: [
          "P(B|A)P(A)/P(B)",
          "P(A)/P(B)",
          "P(B|A)/P(A)",
          "P(B)/P(A)",
        ],
        correctIndex: 0,
        rationale: "Bayes’ rule.",
      },
      {
        question: "Change of variables for monotone Y=g(X): f_Y(y)=",
        options: [
          "f_X(g^{-1}(y))·|d g^{-1}/dy|",
          "f_X(y)/g'(y)",
          "f_X(g(y))·g'(y)",
          "f_X(y)·g'(y)",
        ],
        correctIndex: 0,
        rationale: "Jacobian for 1D monotone transform.",
      },
      {
        question: "If X~N(μ,σ²), then aX+b ~",
        options: [
          "N(aμ+b, a²σ²)",
          "N(μ, σ²)+b",
          "N(a+b, σ²)",
          "N(aμ, σ²+b²)",
        ],
        correctIndex: 0,
        rationale: "Linear closure of Normal.",
      },
      {
        question: "For independent X,Y, Var(X+Y) equals",
        options: ["Var(X)+Var(Y)", "Var(X)+Var(Y)+2Cov", "Var(X)·Var(Y)", "Var(X)/Var(Y)"],
        correctIndex: 0,
        rationale: "Cov=0 under independence.",
      },
      {
        question: "Poisson process: inter-arrival times are",
        options: [
          "Exponential(λ)",
          "Gamma(k,λ)",
          "Normal",
          "Uniform",
        ],
        correctIndex: 0,
        rationale: "Poisson ⇔ exponential gaps.",
      },
      {
        question: "Exponential hazard h(x) is",
        options: ["Constant λ", "Increasing", "Decreasing", "U-shaped"],
        correctIndex: 0,
        rationale: "h(x)=λ.",
      },
      {
        question: "Gamma(k,λ) hazard is",
        options: [
          "↓ if k<1, const if k=1, ↑ if k>1",
          "Always constant",
          "Always decreasing",
          "Always increasing",
        ],
        correctIndex: 0,
        rationale: "Shape-controlled hazard.",
      },
      {
        question: "Which parent violates classical CLT?",
        options: ["Cauchy(0,1)", "Uniform(0,1)", "Exponential(1)", "Bernoulli(p)"],
        correctIndex: 0,
        rationale: "Infinite variance.",
      },
      {
        question: "Pareto(α) (xm=1): CLT needs",
        options: ["α>2", "α>1", "α>0", "never"],
        correctIndex: 0,
        rationale: "Finite variance requires α>2.",
      },
      {
        question: "CDF-to-pdf relation for continuous X is",
        options: [
          "f(x)=dF/dx",
          "F(x)=df/dx",
          "f(x)=1−F(x)",
          "F(x)=1/f(x)",
        ],
        correctIndex: 0,
        rationale: "Derivative of cdf yields pdf.",
      },
      {
        question: "Binomial mean and variance are",
        options: [
          "np and np(1−p)",
          "p and p(1−p)",
          "np and √{np(1−p)}",
          "n and p",
        ],
        correctIndex: 0,
        rationale: "Standard formulas.",
      },
      {
        question: "Studentized mean (Ȳ−μ)/(S/√n) tends to",
        options: ["N(0,1)", "t_{n−1} always", "Cauchy", "Uniform"],
        correctIndex: 0,
        rationale: "As n→∞, → Normal; exact t only if Normal parent.",
      },
      {
        question: "Finite population correction (SRSWOR) multiplies SE by",
        options: [
          "√((N−n)/(N−1))",
          "√(N/(N−n))",
          "n/N",
          "1/(N−n)",
        ],
        correctIndex: 0,
        rationale: "Classic FPC.",
      },
      {
        question: "Normal 68–95–99.7 rule refers to",
        options: [
          "±1σ, ±2σ, ±3σ coverages",
          "Quartiles",
          "Skewness levels",
          "MGF behavior",
        ],
        correctIndex: 0,
        rationale: "Empirical coverage rule.",
      },
      {
        question: "Binomial proportion \\hat p is approx Normal when",
        options: [
          "np and n(1−p) are both ‘not small’ (≈≥10)",
          "n≥5 regardless of p",
          "p≥0.5",
          "Only if n is even",
        ],
        correctIndex: 0,
        rationale: "Avoid sparse tails.",
      },
      {
        question: "Poisson(λ) probability of k events is",
        options: [
          "e^{−λ} λ^k / k!",
          "C(n,k) p^k(1−p)^{n−k}",
          "(x−a)/(b−a)",
          "λ e^{−λx}",
        ],
        correctIndex: 0,
        rationale: "Poisson pmf.",
      },
      {
        question: "Uniform(a,b) mean/variance are",
        options: [
          "(a+b)/2 and (b−a)^2/12",
          "(a+b)/2 and b−a",
          "a and b−a",
          "0 and 1",
        ],
        correctIndex: 0,
        rationale: "Classical identities.",
      },
      {
        question: "Which is the correct Normal pdf?",
        options: [
          "(1/(σ√(2π))) e^{−(x−μ)^2/(2σ^2)}",
          "λ e^{−λx}, x≥0",
          "1/(b−a), a≤x≤b",
          "(1/√(2π)) e^{−x^2/2}, x≥0",
        ],
        correctIndex: 0,
        rationale: "General Normal; option 4 is standard Normal but over ℝ (not only x≥0).",
      },
      {
        question: "Order stats: for U(0,1), min(Ui) pdf is",
        options: [
          "n(1−x)^{n−1}",
          "n x^{n−1}",
          "1",
          "x^n",
        ],
        correctIndex: 0,
        rationale: "Differentiate 1−(1−x)^n.",
      },
      {
        question: "Gamma scale vs rate: if rate is λ, scale θ equals",
        options: ["1/λ", "λ", "k/λ", "λ/k"],
        correctIndex: 0,
        rationale: "θ=1/λ.",
      },
      {
        question: "For Exponential(λ), median is",
        options: ["(ln 2)/λ", "1/λ", "λ", "√λ"],
        correctIndex: 0,
        rationale: "Solve 1−e^{−λm}=0.5.",
      },
      {
        question: "Sums of independent Normals X+Y is Normal because of",
        options: [
          "Closure of the Normal family",
          "CLT only",
          "Bayes rule",
          "Poisson limit",
        ],
        correctIndex: 0,
        rationale: "Exact closure, not only asymptotic.",
      },
      {
        question: "MGF of Poisson(λ) is",
        options: [
          "exp(λ(e^t−1))",
          "(λ/(λ−t))^k",
          "1/(1−t)",
          "exp(μt+½σ²t²)",
        ],
        correctIndex: 0,
        rationale: "Useful for proving addition of Poissons.",
      },
    ],
    []
  );

  // 30-question randomized subset for “Exam Mode”
  const [examSeed, setExamSeed] = useState(42);
    const examQuestions = useMemo(() => {
    const rng = seedrandom(String(examSeed));
    const a = fullQuestions.slice();
    // Fisher–Yates with seeded RNG
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, 30);
  }, [fullQuestions, examSeed]);

  // Flashcards recap deck (broad coverage)
  const flashcards = useMemo(
    () => [
      { front: "Bernoulli", back: "E=p, Var=p(1−p)" },
      { front: "Binomial pmf", back: "C(n,k)p^k(1−p)^{n−k}" },
      { front: "Geom mean", back: "1/p (trials-to-first-success)" },
      { front: "NegBin mean", back: "r/p (trials-to-rth-success)" },
      { front: "Poisson", back: "E=Var=λ; P(k)=e^{−λ}λ^k/k!" },
      { front: "Uniform", back: "E=(a+b)/2; Var=(b−a)^2/12" },
      { front: "Exp(λ)", back: "E=1/λ; memoryless" },
      { front: "Gamma(k,λ)", back: "E=k/λ; Var=k/λ²; sum of Exp" },
      { front: "Normal", back: "z=(x−μ)/σ; 68–95–99.7" },
      { front: "CLT", back: "(Ȳ−μ)/(σ/√n) ⇒ N(0,1)" },
      { front: "Transform", back: "f_Y(y)=f_X(g^{-1}(y))|d g^{-1}/dy|" },
      { front: "Order stats", back: "max U(0,1): f(x)=n x^{n−1}" },
      { front: "Thinning", back: "Pois(λ)→Pois(qλ)" },
      { front: "Min of Exp", back: "min Exp(λ_i) ~ Exp(∑λ_i)" },
      { front: "Gamma–χ²", back: "χ²_ν = Gamma(ν/2, θ=2)" },
      { front: "FPC", back: "SE × √((N−n)/(N−1))" },
    ],
    []
  );

  const [mode, setMode] = useState("full"); // 'full' | 'exam'

  return (
    <>
      <AppHeaderMini
        tutorialSlug="introduction-to-probability-distribution"
        sectionId="practice"
        sectionTitle="Practice"
      />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Title */}
        <div className="py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Probability — Practice & Exam
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Short exercises with solutions, plus a comprehensive multiple-choice exam that covers the whole tutorial.
          </p>
        </div>

        {/* Content + TOC layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Content */}
          <article ref={contentRef} className="min-w-0 space-y-10">
            {/* A. Exercises (markdown) */}
            <section aria-labelledby="exercises">
              <h2 id="exercises" className="text-xl font-bold text-slate-900">
                A. Exercises (with solutions)
              </h2>
              <div ref={mdRef}>
                <RichMarkdown content={mdForRenderer} />
              </div>
            </section>

            {/* B. Exam MCQ */}
            <section aria-labelledby="exam" className="space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 id="exam" className="text-xl font-bold text-slate-900">
                  B. Exam-Length MCQ
                </h2>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-700">Mode:</label>
                  <div className="inline-flex rounded-md border border-slate-300 overflow-hidden">
                    <button
                      onClick={() => setMode("full")}
                      className={`px-3 py-1.5 text-sm ${mode === "full" ? "bg-slate-100 font-semibold" : "bg-white"}`}
                      title="Use the full 40-question bank"
                    >
                      Full (40Q)
                    </button>
                    <button
                      onClick={() => setMode("exam")}
                      className={`px-3 py-1.5 text-sm ${mode === "exam" ? "bg-slate-100 font-semibold" : "bg-white"}`}
                      title="Random 30-question exam subset"
                    >
                      Exam Mode (30Q)
                    </button>
                  </div>
                  {mode === "exam" && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-slate-700">Seed</label>
                      <input
                        type="number"
                        value={examSeed}
                        onChange={(e) => setExamSeed(Number(e.target.value) || 0)}
                        className="w-24 rounded-md border border-slate-300 px-2 py-1 text-sm"
                        title="Change to reshuffle the 30Q subset"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <QuizMCQ
                  questions={mode === "full" ? fullQuestions : examQuestions}
                  storageNamespace={`quiz:practice:${mode}`}
                />
              </div>
            </section>

            {/* C. Flashcards Recap */}
            <section aria-labelledby="recap" className="space-y-3">
              <h2 id="recap" className="text-xl font-bold text-slate-900">
                C. Flashcards — Rapid Recap
              </h2>
              <p className="text-sm text-slate-700">
                Cycle through these to cement formulas and relationships before (or after) the exam.
              </p>
              <Flashcards deck={flashcards} />
            </section>

            {/* Bottom nav */}
            <nav className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <Link
                  to="/tutorials/introduction-to-probability-distribution/continuous/clt"
                  className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  ← CLT
                </Link>
                <Link
                  to="/tutorials/introduction-to-probability-distribution"
                  className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Probability Home →
                </Link>
              </div>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                title="Open print dialog (you can save as PDF)"
              >
                Print / Save as PDF
              </button>
            </nav>
          </article>

          {/* On This Page sidebar */}
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
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.getElementById(item.id);
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth", block: "start" });
                          history.replaceState(null, "", `#${item.id}`);
                        }
                      }}
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
                >
                  Print / Save as PDF
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <AppFooterMini />
    </>
  );
}

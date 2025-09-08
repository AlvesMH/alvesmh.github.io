import React from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import QuizMCQ from "../../shell/components/QuizMCQ";

/**
 * CLTQuiz.jsx — dedicated quiz page for the Central Limit Theorem
 */

const questions = [
  {
    question: "Classical CLT (i.i.d.) says that",
    options: [
      "(Ȳ−μ)/(σ/√n) ⇒ N(0,1)",
      "Ȳ ⇒ N(μ,σ²)",
      "ΣXi ⇒ N(nμ, nσ²) for any n",
      "Ȳ → μ almost surely only",
    ],
    correctIndex: 0,
    rationale: "Standardized sample mean converges in distribution to N(0,1).",
  },
  {
    question: "Which of the following is NOT required for the classical i.i.d. CLT?",
    options: [
      "Finite variance σ²",
      "Independence",
      "Identically distributed",
      "Parent distribution is Normal",
    ],
    correctIndex: 3,
    rationale: "Parent need not be Normal; finite variance & i.i.d. suffice.",
  },
  {
    question: "Berry–Esseen inequality implies the Normal approximation error typically shrinks like",
    options: ["1/√n", "1/n", "log n / n", "constant"],
    correctIndex: 0,
    rationale: "sup|F_n−Φ| ≤ C·ρ₃/(σ³√n).",
  },
  {
    question: "Which parent would violate the classical CLT assumptions?",
    options: [
      "Uniform(0,1)",
      "Exponential(1)",
      "Bernoulli(p)",
      "Cauchy(0,1)",
    ],
    correctIndex: 3,
    rationale: "Cauchy has undefined mean/variance; classical CLT fails.",
  },
  {
    question: "For Pareto(α) with xm=1, the CLT applies only if",
    options: [
      "α > 2",
      "α > 1",
      "α ≥ 0",
      "Never",
    ],
    correctIndex: 0,
    rationale: "Finite variance requires α>2; CLT needs σ² finite.",
  },
  {
    question: "Studentization replaces σ with S (sample sd). As n increases, the Studentized mean distribution tends to",
    options: [
      "t_{n−1} exactly, regardless of parent",
      "Normal(0,1)",
      "Cauchy(0,1)",
      "Uniform(−1,1)",
    ],
    correctIndex: 1,
    rationale: "In general T_n ⇒ N(0,1); exactly t only for Normal parent.",
  },
  {
    question: "Which statement best contrasts LLN and CLT?",
    options: [
      "LLN gives the limit distribution; CLT gives convergence in probability",
      "LLN gives consistency of Ȳ; CLT gives its approximate distribution for large n",
      "Both say the same thing",
      "LLN requires stronger conditions than CLT",
    ],
    correctIndex: 1,
    rationale: "LLN: Ȳ→μ; CLT: √n(Ȳ−μ) → Normal.",
  },
  {
    question: "A rule-of-thumb for using a Normal approx to a Binomial proportion p is",
    options: [
      "np and n(1−p) are both at least around 10",
      "n≥5 regardless of p",
      "p≥0.5",
      "Only when p is unknown",
    ],
    correctIndex: 0,
    rationale: "Ensures tails not too sparse; improves approximation.",
  },
  {
    question: "If observations are sampled without replacement from a finite population, a variance correction uses",
    options: [
      "√((N−n)/(N−1))",
      "√(N/(N−n))",
      "n/N",
      "No correction is possible",
    ],
    correctIndex: 0,
    rationale: "Finite population correction (FPC).",
  },
  {
    question: "Which factor typically slows CLT convergence (requires larger n)?",
    options: [
      "High skewness or heavy right tails",
      "Symmetry around the mean",
      "Small variance",
      "Independence",
    ],
    correctIndex: 0,
    rationale: "Skew/heavy tails inflate higher moments → larger BE term.",
  },
];

export default function CLTQuiz() {
  return (
    <>
      <AppHeaderMini
        tutorialSlug="introduction-to-probability-distribution"
        sectionId="continuous"
        sectionTitle="Continuous"
      />

      <main className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quiz — Central Limit Theorem
          </h1>
          <p className="mt-2 text-slate-700">
            Test your understanding of the CLT, Berry–Esseen rates, and when Normal approximations are (or aren’t) valid.
          </p>
        </div>

        <section className="space-y-4">
          <QuizMCQ questions={questions} storageNamespace="quiz:clt" />
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/clt"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Back to CLT Lesson
          </Link>
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Continuous Intro →
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

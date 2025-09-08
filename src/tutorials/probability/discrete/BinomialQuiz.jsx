import React from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import QuizMCQ from "../../shell/components/QuizMCQ";

/**
 * BinomialQuiz.jsx — dedicated quiz page
 * Focused MCQs with rationales. No persistence beyond optional local shuffle/ordering in QuizMCQ.
 */

const questions = [
  {
    question: "X ~ Binomial(n,p). Which set of assumptions defines this model?",
    options: [
      "Independent trials, identical success probability p, fixed n",
      "Dependent trials, varying p, fixed n",
      "Independent trials, identical p, random n",
      "Trials with three outcomes, fixed n",
    ],
    correctIndex: 0,
    rationale: "Binomial assumes i.i.d. Bernoulli(p) trials with a fixed number n.",
  },
  {
    question: "For X ~ Binomial(n=10, p=0.3), what is P(X=0)?",
    options: ["(0.7)^10", "(0.3)^10", "10·0.3·(0.7)^9", "1−(0.7)^10"],
    correctIndex: 0,
    rationale: "P(X=0)=C(10,0)·(0.3)^0·(0.7)^10=(0.7)^{10}.",
  },
  {
    question: "Which statements are TRUE for X ~ Binomial(n,p)?",
    options: [
      "E[X]=np and Var(X)=np(1−p)",
      "E[X]=p and Var(X)=p(1−p)",
      "E[X]=np and Var(X)=n^2 p",
      "E[X]=n and Var(X)=p",
    ],
    correctIndex: 0,
    rationale: "Classic moments: mean np, variance np(1−p).",
  },
  {
    question: "When is the Normal approximation to Binomial most appropriate?",
    options: [
      "When np(1−p) is large; use continuity correction",
      "When p is extremely small and n is small",
      "When n=1 (Bernoulli)",
      "Always, for any n and p",
    ],
    correctIndex: 0,
    rationale: "A common rule is np(1−p) ≥ 10–20; continuity correction improves accuracy.",
  },
  {
    question: "For rare events (n large, p small, λ=np fixed), which approximation applies?",
    options: [
      "Cauchy with scale λ",
      "Poisson(λ)",
      "Exponential(λ)",
      "Uniform(0,n)",
    ],
    correctIndex: 1,
    rationale: "Binomial ≈ Poisson when n→∞, p→0 with λ=np.",
  },
  {
    question: "If X ~ Binomial(20, 0.5), which is closest to P(X=10)? (Use symmetry/Normal intuition.)",
    options: [
      "About 0.25",
      "About 0.18",
      "About 0.07",
      "About 0.50",
    ],
    correctIndex: 1,
    rationale:
      "At the center for n=20, p=0.5, the pmf peak near k=10 is ~0.176 (Normal approx with continuity gives ≈0.176).",
  },
  {
    question: "Which statement is FALSE?",
    options: [
      "P(X=n)=p^n",
      "P(X=0)=(1−p)^n",
      "X is defined on {0,1,…,n}",
      "Var(X)=np",
    ],
    correctIndex: 3,
    rationale: "Var(X)=np(1−p), not np.",
  },
];

export default function BinomialQuiz() {
  return (
    <>
      <AppHeaderMini
        tutorialSlug="introduction-to-probability-distribution"
        sectionId="discrete"
        sectionTitle="Discrete"
      />

      <main className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quiz — Binomial
          </h1>
          <p className="mt-2 text-slate-700">
            Check your understanding of the Binomial model and its approximations.
          </p>
        </div>

        <section className="space-y-4">
          <QuizMCQ questions={questions} storageNamespace="quiz:binomial" />
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/binomial"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Back to Lesson
          </Link>
          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/geometric"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue to Geometric →
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

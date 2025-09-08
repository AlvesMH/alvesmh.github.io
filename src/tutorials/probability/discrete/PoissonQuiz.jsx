import React from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import QuizMCQ from "../../shell/components/QuizMCQ";

/**
 * PoissonQuiz.jsx — dedicated quiz page
 * X ~ Poisson(λ), pmf e^{-λ} λ^k / k!, mean/variance λ, superposition & thinning
 */

const questions = [
  {
    question: "For X ~ Poisson(λ), which pmf is correct?",
    options: [
      "P(X=k)=e^{-λ} λ^k / k!,  k=0,1,2,…",
      "P(X=k)=p^k(1−p)^{n−k}",
      "P(X=k)=(1−p)^{k−1}p",
      "P(X=k)=C(k-1,r-1)p^r(1-p)^{k-r}",
    ],
    correctIndex: 0,
    rationale: "Defining pmf for Poisson counts.",
  },
  {
    question: "Which moments are correct for X ~ Poisson(λ)?",
    options: [
      "E[X]=λ and Var(X)=λ",
      "E[X]=λ and Var(X)=2λ",
      "E[X]=λ^2 and Var(X)=λ",
      "E[X]=1/λ and Var(X)=1/λ^2",
    ],
    correctIndex: 0,
    rationale: "Mean equals variance for Poisson.",
  },
  {
    question: "When does Binomial(n,p) ≈ Poisson(λ)?",
    options: [
      "n large, p small, λ=np fixed",
      "n small, p large",
      "n large, p≈0.5",
      "Always",
    ],
    correctIndex: 0,
    rationale: "Classical Poisson limit of Binomial.",
  },
  {
    question: "Superposition property: if X~Pois(λ1) and Y~Pois(λ2) independent, then X+Y is",
    options: [
      "Binomial(λ1+λ2, p)",
      "Poisson(λ1+λ2)",
      "Geometric with p=λ1+λ2",
      "Normal(λ1+λ2, 1)",
    ],
    correctIndex: 1,
    rationale: "Sum of independent Poissons is Poisson with summed rate.",
  },
  {
    question: "Thinning: if X~Pois(λ) and each event is kept with prob q, the kept count is",
    options: [
      "Binomial(λ, q)",
      "Poisson(qλ)",
      "Poisson(λ/q)",
      "Geometric(q)",
    ],
    correctIndex: 1,
    rationale: "Independent thinning preserves Poisson with scaled rate qλ.",
  },
  {
    question: "Which statement is TRUE?",
    options: [
      "Poisson is memoryless",
      "Interarrival times in a Poisson process are Exponential(λ)",
      "Poisson counts are bounded above by n",
      "Mean of Poisson is 1/λ",
    ],
    correctIndex: 1,
    rationale: "The **Exponential** distribution is memoryless; Poisson counts are not.",
  },
  {
    question: "Quick calc: λ=2.5 ⇒ P(X=0) equals",
    options: [
      "e^{−2.5}",
      "2.5·e^{−2.5}",
      "1−e^{−2.5}",
      "e^{−2.5}·2.5^2/2!",
    ],
    correctIndex: 0,
    rationale: "P(0)=e^{−λ}.",
  },
  {
    question: "Which is closest to P(X=5) for λ=5? (Normal approx with continuity)",
    options: [
      "≈ 0.18",
      "≈ 0.08",
      "≈ 0.04",
      "≈ 0.30",
    ],
    correctIndex: 0,
    rationale:
      "Near the mean, pmf peaks around k=λ; Normal-with-continuity gives ~0.175–0.18.",
  },
];

export default function PoissonQuiz() {
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
            Quiz — Poisson
          </h1>
          <p className="mt-2 text-slate-700">
            Test your understanding of Poisson counts, approximations, and Poisson-process links.
          </p>
        </div>

        <section className="space-y-4">
          <QuizMCQ questions={questions} storageNamespace="quiz:poisson" />
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/poisson"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Back to Lesson
          </Link>
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue to Continuous & CLT →
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

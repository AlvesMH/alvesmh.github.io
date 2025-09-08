import React from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import QuizMCQ from "../../shell/components/QuizMCQ";

/**
 * GeometricQuiz.jsx — dedicated quiz page for Geometric
 * Conventions: X is the number of trials until the first success (support {1,2,...})
 */

const questions = [
  {
    question: "For X ~ Geometric(p) with support {1,2,…}, which pmf is correct?",
    options: [
      "P(X=k)=(1−p)^k p, k=0,1,2,…",
      "P(X=k)=(1−p)^{k−1} p, k=1,2,…",
      "P(X=k)=p^k (1−p), k=1,2,…",
      "P(X=k)=p, for any integer k",
    ],
    correctIndex: 1,
    rationale: "Trials-until-first-success: P(X=k)=(1−p)^{k−1}p on {1,2,…}.",
  },
  {
    question: "What is E[X] for X ~ Geometric(p) (support {1,2,…})?",
    options: ["p", "1−p", "1/p", "(1−p)/p^2"],
    correctIndex: 2,
    rationale: "Mean equals 1/p under this parameterisation.",
  },
  {
    question: "Which statement is TRUE about the memoryless property?",
    options: [
      "Only Exponential is memoryless; Geometric is not",
      "P(X>m+n | X>m) = P(X>m+n)",
      "P(X>m+n | X>m) = P(X>n)",
      "P(X>m+n | X>m) = P(X>m)P(X>n)",
    ],
    correctIndex: 2,
    rationale: "Geometric (discrete) and Exponential (continuous) are the canonical memoryless laws.",
  },
  {
    question: "For p=0.2 and X ~ Geometric(p), which is P(X>3)?",
    options: ["0.8^3", "0.2^3", "1−0.8^3", "0.8^4 · 0.2"],
    correctIndex: 0,
    rationale: "Tail for support {1,2,…} is (1−p)^k, so (0.8)^3.",
  },
  {
    question: "Which variance is correct for X ~ Geometric(p) (support {1,2,…})?",
    options: ["p(1−p)", "p/(1−p)", "(1−p)/p^2", "1/p^2"],
    correctIndex: 2,
    rationale: "Var(X)=(1−p)/p^2 for the trials-until-first-success version.",
  },
  {
    question: "Link to Negative Binomial: which statement is correct?",
    options: [
      "Geometric is NegBin with r→∞",
      "Geometric is NegBin with r=1",
      "Geometric is the product of two Bernoulli variables",
      "Geometric is Binomial with n=1",
    ],
    correctIndex: 1,
    rationale: "NegBin(r,p) counts trials until r-th success; for r=1 it reduces to Geometric.",
  },
  {
    question: "Which statement is FALSE (under support {1,2,…})?",
    options: [
      "P(X=1)=p",
      "P(X=2)=(1−p)p",
      "P(X=0)=1−p",
      "P(X>k)=(1−p)^k",
    ],
    correctIndex: 2,
    rationale: "Under this convention, support begins at 1, so P(X=0)=0.",
  },
];

export default function GeometricQuiz() {
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
            Quiz — Geometric
          </h1>
          <p className="mt-2 text-slate-700">
            Confirm your understanding of waiting-time mechanics and the memoryless property.
          </p>
        </div>

        <section className="space-y-4">
          <QuizMCQ questions={questions} storageNamespace="quiz:geometric" />
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/geometric"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Back to Lesson
          </Link>
          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/negative-binomial"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue to Negative Binomial →
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import QuizMCQ from "../../shell/components/QuizMCQ";

/**
 * BernoulliQuiz.jsx — dedicated MCQ quiz page for Bernoulli
 *
 * Uses QuizMCQ with multiple questions, rationales, and a simple layout.
 * Keep this page focused; no persistence or progress.
 */

const questions = [
  {
    question: "For X ~ Bernoulli(p), which is TRUE?",
    options: ["Support is {−1,1}", "E[X]=p and Var(X)=p(1−p)", "P(X=1)=1−p", "Var(X)=p"],
    correctIndex: 1,
    rationale: "Bernoulli has support {0,1}; mean p; variance p(1−p).",
  },
  {
    question: "Which is the pmf for X ~ Bernoulli(p)?",
    options: [
      "p(x)=p^x(1−p)^{1−x}, x∈{0,1}",
      "p(x)=p for all integers x",
      "p(x)=1/2 for x∈{0,1}",
      "p(x)=p^(1−x)(1−p)^x, x∈{0,1}",
    ],
    correctIndex: 0,
    rationale: "By definition: P(X=1)=p, P(X=0)=1−p ⇒ p^x(1−p)^{1−x}.",
  },
  {
    question: "If X=1_A (indicator of event A), what is E[X]?",
    options: ["0", "1", "P(A)", "Cannot be determined"],
    correctIndex: 2,
    rationale: "Indicator expectation equals the probability of its event.",
  },
  {
    question: "Which statement is FALSE for Bernoulli(p)?",
    options: [
      "X^2=X almost surely",
      "Var(X)=p(1−p)",
      "P(X=1)=p^2",
      "E[X]=p",
    ],
    correctIndex: 2,
    rationale: "P(X=1)=p, not p^2.",
  },
  {
    question: "Which construction leads from Bernoulli to Binomial?",
    options: [
      "Product of n Bernoulli(p)",
      "Sum of n i.i.d. Bernoulli(p)",
      "Maximum of n Bernoulli(p)",
      "Difference of two Bernoulli(p)",
    ],
    correctIndex: 1,
    rationale: "Summing n i.i.d. Bernoulli(p) yields Binomial(n,p).",
  },
];

export default function BernoulliQuiz() {
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
            Quiz — Bernoulli
          </h1>
          <p className="mt-2 text-slate-700">
            Test your understanding before moving on to Binomial.
          </p>
        </div>

        <section className="space-y-4">
          <QuizMCQ questions={questions} storageNamespace="quiz:bernoulli" />
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/bernoulli"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Back to Lesson
          </Link>
          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/binomial"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue to Binomial →
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

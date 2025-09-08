import React from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import QuizMCQ from "../../shell/components/QuizMCQ";

/**
 * NegativeBinomialQuiz.jsx — dedicated quiz page
 * Convention: X = number of trials until r-th success (support {r, r+1, ...})
 */

const questions = [
  {
    question: "Which pmf matches X = trials until r-th success (NegBin)?",
    options: [
      "P(X=k)=C(k+r-1,r-1)p^r(1-p)^k, k=0,1,2,…",
      "P(X=k)=C(k-1,r-1)p^r(1-p)^{k-r}, k=r,r+1,…",
      "P(X=k)=C(n,k)p^k(1-p)^{n-k}, k=0,…,n",
      "P(X=k)=(1-p)^{k-1}p, k=1,2,…",
    ],
    correctIndex: 1,
    rationale:
      "For trials-until-r-th-success: P(X=k)=C(k-1,r-1)p^r(1-p)^{k-r}, support {r, r+1, …}.",
  },
  {
    question: "For X ~ NegBin(r,p) (trials version), which moments are correct?",
    options: [
      "E[X]=r/p, Var(X)=r(1-p)/p^2",
      "E[X]=p, Var(X)=p(1-p)",
      "E[X]=np, Var(X)=np(1-p)",
      "E[X]=r(1-p)/p, Var(X)=r/p^2",
    ],
    correctIndex: 0,
    rationale: "Mean r/p and variance r(1-p)/p^2 for the trials parameterisation.",
  },
  {
    question: "Which relationship is TRUE?",
    options: [
      "NegBin(r,p) is the product of r independent Geometric(p)",
      "NegBin(r,p) is the sum of r independent Geometric(p)",
      "NegBin(r,p) equals Binomial(n,p) for n=r",
      "NegBin(r,p) is memoryless",
    ],
    correctIndex: 1,
    rationale: "Waiting time to r-th success equals sum of r i.i.d. geometric waiting times.",
  },
  {
    question: "With r=1, NegBin reduces to:",
    options: ["Poisson", "Binomial", "Geometric", "Uniform"],
    correctIndex: 2,
    rationale: "r=1 gives the geometric distribution on trials {1,2,…}.",
  },
  {
    question: "Which is FALSE (trials parameterisation)?",
    options: [
      "Support is {r, r+1, …}",
      "P(X=r)=p^r",
      "E[X]=r/p",
      "P(X=0)=(1-p)^r",
    ],
    correctIndex: 3,
    rationale: "Support starts at r, so P(X=0)=0 in this parameterisation.",
  },
  {
    question: "Micro-check: r=3, p=0.4 ⇒ P(X=4) equals",
    options: ["C(3,2) p^3 (1-p)", "C(4,3) p^3 (1-p)", "C(3,1) p^2 (1-p)^2", "p^4"],
    correctIndex: 0,
    rationale:
      "k=4 ⇒ C(k-1,r-1)=C(3,2)=3; so 3·p^3·(1-p).",
  },
  {
    question: "Which real-world scenario is best modelled by NegBin(r,p)?",
    options: [
      "Total successes in n fixed trials",
      "Time between two events in a Poisson process",
      "Number of trials needed to see r conversions",
      "Maximum of r geometric variables",
    ],
    correctIndex: 2,
    rationale:
      "Counting trials until r-th success matches the negative binomial waiting-time formulation.",
  },
];

export default function NegativeBinomialQuiz() {
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
            Quiz — Negative Binomial
          </h1>
          <p className="mt-2 text-slate-700">
            Check your grasp of the trials-until-r-th-success model, moments, and modelling assumptions.
          </p>
        </div>

        <section className="space-y-4">
          <QuizMCQ questions={questions} storageNamespace="quiz:negative-binomial" />
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/negative-binomial"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Back to Lesson
          </Link>
          <Link
            to="/tutorials/introduction-to-probability-distribution/discrete/poisson"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue to Poisson →
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}


import React from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import QuizMCQ from "../../shell/components/QuizMCQ";

/**
 * ExponentialQuiz.jsx — dedicated quiz page for Exponential(λ)
 */

const questions = [
  {
    question: "For X ~ Exponential(λ) with λ>0 and support x≥0, the pdf is",
    options: [
      "f(x)=λ e^{−λx}",
      "f(x)=e^{−x/λ}/λ for x∈ℝ",
      "f(x)=1/(b−a) on [a,b]",
      "f(x)=p^x(1−p)^{1−x} on {0,1}",
    ],
    correctIndex: 0,
    rationale: "Rate parametrisation: f(x)=λ e^{−λx} for x≥0.",
  },
  {
    question: "Which cdf/survival pair is correct for Exponential(λ)?",
    options: [
      "F(x)=1−e^{−λx},  S(x)=e^{−λx}",
      "F(x)=e^{−λx},  S(x)=1−e^{−λx}",
      "F(x)=(x−a)/(b−a),  S(x)=1−F(x)",
      "F(x)=x^n,  S(x)=1−x^n",
    ],
    correctIndex: 0,
    rationale: "Classic forms with support x≥0.",
  },
  {
    question: "Mean and variance of X ~ Exponential(λ) are",
    options: [
      "E[X]=1/λ and Var(X)=1/λ^2",
      "E[X]=λ and Var(X)=λ",
      "E[X]=0 and Var(X)=1",
      "E[X]=1/λ and Var(X)=1/λ",
    ],
    correctIndex: 0,
    rationale: "Single-parameter model; both scale with 1/λ.",
  },
  {
    question: "Which statement captures the memoryless property?",
    options: [
      "P(X>t+s | X>t)=P(X>s)",
      "P(X>t+s | X>t)=P(X>t+s)",
      "P(X>t+s | X>t)=P(X>t)P(X>s)",
      "P(X>t+s | X>t)=1",
    ],
    correctIndex: 0,
    rationale: "For all s,t≥0, conditional tail equals fresh tail.",
  },
  {
    question: "Connection to the Poisson process:",
    options: [
      "Inter-arrival times are Exponential(λ)",
      "Counts in [0,t] are Exponential(λt)",
      "Min of exponentials is Normal",
      "Exponential has increasing hazard only",
    ],
    correctIndex: 0,
    rationale: "Arrivals imply exponential waiting with rate λ.",
  },
  {
    question: "If X1,…,Xk i.i.d. Exponential(λ), then ΣXi is",
    options: [
      "Poisson(kλ)",
      "Gamma(k, λ) (rate form)",
      "Normal(k/λ, 1/λ)",
      "Uniform(0,k/λ)",
    ],
    correctIndex: 1,
    rationale: "Sum of k exponentials with same rate is Gamma with shape k and rate λ.",
  },
  {
    question: "If X ~ Exponential(λ), the median m solves F(m)=0.5. What is m?",
    options: [
      "m = ln 2 / λ",
      "m = 1/λ",
      "m = λ / ln 2",
      "m = √(1/λ)",
    ],
    correctIndex: 0,
    rationale: "Set 1−e^{−λm}=0.5 ⇒ m=ln(2)/λ.",
  },
  {
    question: "Min property: If Xi ~ Exponential(λi) indep, then Y=min Xi has",
    options: [
      "Y ~ Exponential(min λi)",
      "Y ~ Exponential(sum λi)",
      "Y ~ Gamma(∏ λi, 1)",
      "No simple distribution",
    ],
    correctIndex: 1,
    rationale: "Competing exponentials: minimum is exponential with rate Σλi.",
  },
];

export default function ExponentialQuiz() {
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
            Quiz — Exponential(λ)
          </h1>
          <p className="mt-2 text-slate-700">
            Check your understanding of exponential waiting times, memorylessness, and key connections.
          </p>
        </div>

        <section className="space-y-4">
          <QuizMCQ questions={questions} storageNamespace="quiz:exponential" />
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/exponential"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Back to Lesson
          </Link>
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/gamma"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue to Gamma →
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "../../shell/components/AppHeaderMini";
import AppFooterMini from "../../shell/components/AppFooterMini";
import QuizMCQ from "../../shell/components/QuizMCQ";

/**
 * GammaQuiz.jsx — dedicated quiz page for Gamma(k, λ)
 * Convention: (shape k, rate λ) with support x≥0.
 */

const questions = [
  {
    question: "For X ~ Gamma(k, λ) (rate form), the pdf is",
    options: [
      "f(x)=λ^k x^{k−1} e^{−λx} / Γ(k), x≥0",
      "f(x)=x^{k−1} e^{−x/θ} / (Γ(k) θ^k), x≥0",
      "f(x)=λ e^{−λx}, x≥0",
      "f(x)=1/(b−a), a≤x≤b",
    ],
    correctIndex: 0,
    rationale:
      "Rate parametrisation; scale form is option 2 (equivalent under θ=1/λ).",
  },
  {
    question: "Mean and variance of X ~ Gamma(k, λ) are",
    options: [
      "E[X]=k/λ, Var(X)=k/λ^2",
      "E[X]=1/λ, Var(X)=1/λ^2",
      "E[X]=kλ, Var(X)=kλ^2",
      "E[X]=k, Var(X)=2k",
    ],
    correctIndex: 0,
    rationale: "Divide shape by rate for the mean; variance scales with 1/λ².",
  },
  {
    question: "Which statement is TRUE?",
    options: [
      "Gamma is memoryless for any k",
      "Gamma reduces to Exponential when k=1",
      "Gamma is defined on ℝ",
      "Gamma has constant hazard for all k",
    ],
    correctIndex: 1,
    rationale: "Only k=1 (Exponential) is memoryless; hazard is constant only at k=1.",
  },
  {
    question: "Poisson-process link: the time to the k-th event in a Poisson(λ) process is",
    options: [
      "Exponential(λ)",
      "Gamma(k, λ)",
      "Normal(k/λ, k/λ^2)",
      "Uniform(0, k/λ)",
    ],
    correctIndex: 1,
    rationale: "Waiting time to the k-th arrival is Gamma with that rate.",
  },
  {
    question: "Which identity is correct for integer k?",
    options: [
      "F(x)=1−e^{−λx} ∑_{n=0}^{k−1} (λx)^n/n!",
      "F(x)=e^{−λx} ∑_{n=0}^{k−1} (λx)^n/n!",
      "F(x)=∑_{n=k}^{∞} (λx)^n/n!",
      "F(x)=Φ((x−k/λ)/√(k/λ^2))",
    ],
    correctIndex: 0,
    rationale: "Gamma CDF equals one minus a truncated Poisson tail when k is an integer.",
  },
  {
    question: "Which relation with χ² is correct?",
    options: [
      "χ²_ν ~ Gamma(k=ν/2, θ=2) (scale form)",
      "χ²_ν ~ Gamma(k=ν, λ=1)",
      "χ²_ν ~ Gamma(k=ν/2, λ=2)",
      "χ²_ν ~ Gamma(k=ν, θ=1/2)",
    ],
    correctIndex: 0,
    rationale: "Standard mapping; equivalently rate form has λ=1/2.",
  },
  {
    question: "Hazard behaviour of Gamma(k, λ) is",
    options: [
      "Decreasing for all k",
      "Increasing for all k",
      "Constant for all k",
      "Decreasing if k<1, constant if k=1, increasing if k>1",
    ],
    correctIndex: 3,
    rationale: "Gamma spans DFR → constant → IFR as k increases.",
  },
  {
    question: "If X1 ~ Gamma(k1, λ) and X2 ~ Gamma(k2, λ) independent, then X1+X2 is",
    options: [
      "Gamma(k1+k2, λ)",
      "Gamma(k1k2, λ)",
      "Gamma(k1+k2, 2λ)",
      "No simple form",
    ],
    correctIndex: 0,
    rationale: "Additivity holds for common rate (or common scale).",
  },
  {
    question: "Mode of Gamma(k, λ) when k>1 is",
    options: [
      "(k−1)/λ",
      "k/λ",
      "1/λ",
      "λ/(k−1)",
    ],
    correctIndex: 0,
    rationale: "Take derivative of log-pdf; set to zero.",
  },
  {
    question: "Convert Gamma(k, λ) (rate) to scale form Gamma(k, θ). What is θ?",
    options: [
      "θ = 1/λ",
      "θ = λ",
      "θ = kλ",
      "θ = k/λ",
    ],
    correctIndex: 0,
    rationale: "Scale is the reciprocal of rate.",
  },
];

export default function GammaQuiz() {
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
            Quiz — Gamma(k, λ)
          </h1>
          <p className="mt-2 text-slate-700">
            Check your understanding of the Gamma family, parametrisations, Poisson-process links, and χ² connections.
          </p>
        </div>

        <section className="space-y-4">
          <QuizMCQ questions={questions} storageNamespace="quiz:gamma" />
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/gamma"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Back to Lesson
          </Link>
          <Link
            to="/tutorials/introduction-to-probability-distribution/continuous/normal"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue to Normal →
          </Link>
        </nav>
      </main>

      <AppFooterMini />
    </>
  );
}
